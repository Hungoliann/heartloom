import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heartloom.",
  description: "Preserve your words and wisdom.",
  icons: {
    icon: [
      {
        url: "/favicon.svg?v=6",
        type: "image/svg+xml",
        sizes: "64x64",
      },
    ],
    shortcut: "/favicon.svg?v=6",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = clerkPublishableKey
    ? await ClerkProvider({ publishableKey: clerkPublishableKey, children })
    : children;

  return (
    <html lang="en">
      <body>{content}</body>
    </html>
  );
}
