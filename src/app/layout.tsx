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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html lang="en">
      <body>
        {clerkPublishableKey ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
