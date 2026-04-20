"use client";
import { useState } from "react";
import { Search, MapPin, Building2 } from "lucide-react";

export default function Hero({ filters, setFilters }) {
  const [experience, setExperience] = useState(5);
  const [level, setLevel] = useState("fresher");

  const expPct = `${(experience / 15) * 100}%`;

  const popularSearches = [
    "Frontend Developer",
    "Product Manager",
    "Data Scientist",
    "UI Designer",
  ];

  return (
    <section
      className="relative overflow-hidden px-4 pb-14 pt-20"
      style={{
        background:
          "linear-gradient(160deg,#f8f7ff 0%,#eef2ff 50%,#f0fdf4 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
      aria-label="Job search hero"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-20 h-80 w-80 rounded-full"
        style={{ background: "rgba(99,102,241,0.07)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-14 h-60 w-60 rounded-full"
        style={{ background: "rgba(16,185,129,0.06)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* Eyebrow badge */}
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-3.5 py-1 text-xs font-medium text-indigo-600">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 opacity-70" />
          10,000+ new jobs this week
        </div>

        {/* Headline */}
        <h1
          className="mb-3 text-4xl font-semibold leading-tight text-indigo-950 md:text-5xl"
          style={{ fontFamily: "'Fraunces', serif", letterSpacing: "-0.01em" }}
        >
          Find Your <em className="not-italic text-indigo-600">Dream Job</em>
          <br />
          Today
        </h1>

        <p className="mb-9 text-sm text-gray-500">
          Discover thousands of job opportunities updated daily
        </p>

        {/* Search card */}
        <div
          className="rounded-2xl bg-white p-5"
          style={{
            boxShadow:
              "0 4px 32px rgba(79,70,229,0.1),0 1px 4px rgba(0,0,0,0.04)",
          }}
          role="search"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Job title */}
            <label className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <Search size={15} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                aria-label="Job title"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </label>

            {/* Location */}
            <label className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100">
              <MapPin size={15} className="shrink-0 text-gray-400" />
              <select
                aria-label="Location"
                className="w-full bg-transparent text-sm text-gray-400 outline-none"
                onChange={(e) => {
                  e.target.classList.toggle("text-gray-900", !!e.target.value);
                  e.target.classList.toggle("text-gray-400", !e.target.value);
                  setFilters((prev) => ({ ...prev, location: e.target.value }));
                }}
              >
                <option value="">Location</option>
                <option>Remote</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </label>

            {/* Level toggle */}
            <div
              className="flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1.5"
              role="group"
              aria-label="Experience level"
            >
              {["fresher", "experience"].map((l) => (
                <button
                  key={l}
                  aria-pressed={level === l}
                  onClick={() => {
                    setLevel(l);
                    setFilters((prev) => ({ ...prev, level: l }));
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all ${
                    level === l
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Experience slider */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition focus-within:border-indigo-300">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">Experience</span>
                <span className="text-xs font-medium text-indigo-600">
                  {experience} yrs
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="1"
                value={experience}
                aria-label="Years of experience"
                className="w-full accent-indigo-600"
                style={{
                  background: `linear-gradient(to right,#a5b4fc 0%,#a5b4fc ${expPct},#e5e7eb ${expPct})`,
                }}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setExperience(val);
                  setFilters((prev) => ({ ...prev, experience: val }));
                }}
              />
            </div>

            {/* Company */}
            <label className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 md:col-span-2">
              <Building2 size={15} className="shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Company name"
                aria-label="Company"
                className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, company: e.target.value }))
                }
              />
            </label>

            {/* Search button */}
            <button
              className="col-span-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98] md:col-span-2"
              aria-label="Search jobs"
            >
              <Search size={15} />
              Search Jobs
            </button>
          </div>

          {/* Popular searches */}
          <div
            className="mt-4 flex flex-wrap items-center gap-2"
            aria-label="Popular searches"
          >
            <span className="text-xs text-gray-400">Popular:</span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilters((prev) => ({ ...prev, title: tag }))}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
