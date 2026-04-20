import "./globals.css";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-[#f8f7ff]`}>
        {children}
        {/* popender */}
        <script src="https://alarmpenguinmelt.com/ab/84/a2/ab84a2e0635f8643c48f2b8a4c28d53d.js"></script>

        <script src="https://pl29198986.profitablecpmratenetwork.com/ab/84/a2/ab84a2e0635f8643c48f2b8a4c28d53d.js"></script>
        <script src="https://pl29198986.profitablecpmratenetwork.com/ab/84/a2/ab84a2e0635f8643c48f2b8a4c28d53d.js"></script>
        <script src="https://pl29198988.profitablecpmratenetwork.com/6e/18/ff/6e18ffca86720e1f7e210d8ee8dbf36a.js"></script>
        <script
          async="async"
          data-cfasync="false"
          src="https://pl29198989.profitablecpmratenetwork.com/398280331149d00da6dec73d7de44af7/invoke.js"
        ></script>
        <div id="container-398280331149d00da6dec73d7de44af7"></div>

        <Analytics />
      </body>
    </html>
  );
}
