import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "When Did You Last Deworm?",
  description: "I know you haven't since you were a kid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
