export async function GET() {
  const fetchSafe = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("API failed");
      return await res.json();
    } catch (err) {
      console.log("Skipped:", url);
      return null;
    }
  };

  try {
    // Remote + Global
    const [remotiveData, arbeitData] = await Promise.all([
      fetchSafe("https://remotive.com/api/remote-jobs"),
      fetchSafe("https://www.arbeitnow.com/api/job-board-api"),
    ]);

    // India - Adzuna
    let adzunaJobs = [];
    if (process.env.ADZUNA_ID && process.env.ADZUNA_KEY) {
      const adzunaData = await fetchSafe(
        `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_ID}&app_key=${process.env.ADZUNA_KEY}&what=developer`,
      );

      adzunaJobs =
        adzunaData?.results?.map((job) => ({
          id: "z-" + job.id,
          title: job.title,
          company_name: job.company?.display_name,
          location: job.location?.display_name || "India",
          tags: [],
          url: job.redirect_url,
        })) || [];
    }

    // India - JSearch
    let jsearchJobs = [];
    if (process.env.RAPIDAPI_KEY) {
      const jsearchData = await fetchSafe(
        "https://jsearch.p.rapidapi.com/search?query=developer&location=India",
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        },
      );

      jsearchJobs =
        jsearchData?.data?.map((job) => ({
          id: "j-" + job.job_id,
          title: job.job_title,
          company_name: job.employer_name,
          location: job.job_city || "India",
          tags: [],
          url: job.job_apply_link,
        })) || [];
    }

    // Normalize others
    const remotiveJobs =
      remotiveData?.jobs?.map((job) => ({
        id: "r-" + job.id,
        title: job.title,
        company_name: job.company_name,
        location: job.candidate_required_location || "Remote",
        tags: job.tags || [],
        url: job.url,
      })) || [];

    const arbeitJobs =
      arbeitData?.data?.map((job) => ({
        id: "a-" + job.slug,
        title: job.title,
        company_name: job.company_name,
        location: job.location || "Global",
        tags: job.tags || [],
        url: job.url,
      })) || [];

    // Merge + dedupe
    let allJobs = [
      ...remotiveJobs,
      ...arbeitJobs,
      ...adzunaJobs,
      ...jsearchJobs,
    ];

    const uniqueJobs = Array.from(
      new Map(allJobs.map((j) => [j.title + j.company_name, j])).values(),
    );

    return Response.json(uniqueJobs);
  } catch (error) {
    return Response.json([]);
  }
}
