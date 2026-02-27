import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PurpleAir HVAC | Fast & Reliable Heating & Cooling Service",
  description:
    "Professional HVAC repairs, installations, maintenance, and duct cleaning. Same-day service available. Licensed & insured technicians. Book online in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
