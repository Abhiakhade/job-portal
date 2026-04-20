"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Remote", href: "/remote" },
  { name: "Categories", href: "/categories" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white"
      role="navigation"
      aria-label="Main navigation"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-2.5"
            aria-label="Job-Wallah home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-indigo-600">
              <span
                className="text-lg font-semibold text-white"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                J
              </span>
            </div>
            <span
              className="text-xl font-semibold text-indigo-950"
              style={{
                fontFamily: "'Fraunces', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Job-<span className="text-indigo-600">Wallah</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                role="listitem"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
              Sign in
            </button>
            <button className="rounded-lg bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100">
              Sign up
            </button>
            <button className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Subscribe
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex items-center justify-center rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-nav"
          role="menu"
          aria-label="Mobile navigation"
          className="border-t border-gray-100 bg-white px-4 pb-5 pt-3 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="mb-0.5 block rounded-xl px-3.5 py-3 text-[15px] font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            <button className="w-full rounded-xl border border-gray-200 py-3 text-[15px] font-medium text-gray-500 transition-colors hover:border-indigo-300 hover:text-indigo-600">
              Sign in
            </button>
            <button className="w-full rounded-xl bg-indigo-600 py-3 text-[15px] font-medium text-white transition-colors hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
