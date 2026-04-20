export async function getJobs() {
  try {
    const res = await fetch("/api/jobs");

    if (!res.ok) throw new Error("Failed");

    return await res.json();
  } catch {
    return [];
  }
}
