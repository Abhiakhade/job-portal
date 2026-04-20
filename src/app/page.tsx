"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import JobCard from "./components/JobCard";
import { getJobs } from "./lib/api";
import { Briefcase, Wifi, Building2, Sparkles } from "lucide-react";

type Job = {
  id: string | number;
  title?: string;
  company_name?: string;
  location?: string;
  tags?: string[];
  url?: string;
  job_type?: string;
  is_new?: boolean;
};

type Filters = {
  title: string;
  location: string;
  level: string;
  experience: number;
  company: string;
};

const STATS = [
  { label: "Live jobs", value: "12,480", icon: Briefcase },
  { label: "Remote roles", value: "3,200", icon: Wifi },
  { label: "Companies hiring", value: "840", icon: Building2 },
  { label: "New today", value: "98", icon: Sparkles },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-[10px] bg-gray-100" />
        <div className="h-3 w-24 rounded bg-gray-100" />
      </div>
      <div className="mb-2 h-4 w-full rounded bg-gray-100" />
      <div className="mb-4 h-4 w-3/4 rounded bg-gray-100" />
      <div className="mb-3 flex gap-2">
        <div className="h-3 w-16 rounded bg-gray-100" />
        <div className="h-3 w-20 rounded bg-gray-100" />
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-14 rounded-md bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const [filters, setFilters] = useState<Filters>({
    title: "",
    location: "",
    level: "",
    experience: 0,
    company: "",
  });

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(() => setError("Failed to load jobs. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job?.title?.toLowerCase().includes(filters.title.toLowerCase()) &&
      job?.company_name
        ?.toLowerCase()
        .includes(filters.company.toLowerCase()) &&
      job?.location?.toLowerCase().includes(filters.location.toLowerCase()),
  );

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: subEmail }),
        });
        setSubState("success");
        setSubEmail("");
        setTimeout(() => setSubState("idle"), 5000);
      } catch {
        setSubState("error");
      }
    },
    [subEmail],
  );

  return (
    <div
      className="min-h-screen bg-[#f8f7ff]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />
      
      <Hero filters={filters} setFilters={setFilters} />

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Stats bar */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-gray-100 bg-white p-4"
            >
              <p className="font-['Fraunces'] text-xl font-semibold text-indigo-600">
                {value}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className="mb-5 flex items-baseline justify-between">
          <h2
            className="text-xl font-semibold text-indigo-950"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Latest opportunities
          </h2>
          {!loading && (
            <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-700">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-100 bg-white px-6 py-10 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              No jobs match your filters
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Skeleton loaders */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Job grid */}
        {!loading && filteredJobs.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      {/* Subscribe section */}
      <section className="mt-6 border-t border-gray-100 bg-white py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          <h2
            className="mb-2 text-2xl font-semibold text-indigo-950"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Get job alerts
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            New roles delivered to your inbox — no spam, unsubscribe anytime.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-wrap justify-center gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              className="w-60 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.97]"
            >
              Subscribe
            </button>
          </form>

          {subState === "success" && (
            <p className="mt-3 text-xs font-medium text-emerald-600">
              You're subscribed! Check your inbox.
            </p>
          )}
          {subState === "error" && (
            <p className="mt-3 text-xs text-red-500">
              Something went wrong. Try again.
            </p>
          )}

          <p className="mt-4 text-xs text-gray-400">
            Join 14,000+ job seekers already subscribed
          </p>
        </div>
      </section>
    </div>
  );
}
