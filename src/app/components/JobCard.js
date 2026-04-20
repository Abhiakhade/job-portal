"use client";

import { MapPin, Briefcase } from "lucide-react";

export default function JobCard({ job }) {
  if (!job) return null;

  const {
    title = "No Title",
    company_name = "Unknown Company",
    location = "Remote",
    tags = [],
    url = "#",
  } = job;
  console.log(process.env.ADZUNA_ID);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition line-clamp-2">
          {title}
        </h2>

        {/* Company */}
        <p className="text-sm text-gray-600 mt-1 font-medium">{company_name}</p>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <MapPin size={14} />
          <span>{location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="bg-indigo-50 text-indigo-600 px-2 py-1 text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-5">
        {/* Type */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Briefcase size={14} />
          <span>Job</span>
          
        </div>

        {/* Apply Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition"
        >
          Apply →
        </a>
      </div>
    </div>
  );
}
