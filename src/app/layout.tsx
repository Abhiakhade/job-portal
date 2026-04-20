import "./globals.css";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// ✅ SEO Metadata
export const metadata = {
  title: "JobBoard - Find Jobs in India & Remote",
  description:
    "Find the latest jobs in India, remote jobs, and global opportunities. Updated daily with top companies hiring now.",
  keywords: [
    "jobs in India",
    "remote jobs",
    "developer jobs",
    "IT jobs India",
    "job portal",
  ],
  authors: [{ name: "Your Name" }],

  // Open Graph (for WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "JobBoard - Find Jobs Fast",
    description:
      "Explore thousands of job opportunities in India and worldwide.",
    url: "https://yourdomain.com",
    siteName: "JobBoard",
    images: [
      {
        url: "/og-image.png", // add this image in public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter SEO
  twitter: {
    card: "summary_large_image",
    title: "JobBoard - Latest Jobs",
    description:
      "Discover top jobs in India, remote work, and global companies.",
    images: ["/og-image.png"],
  },

  // Robots (SEO indexing)
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#f8f7ff]`}>{children}</body>
    </html>
  );
}
