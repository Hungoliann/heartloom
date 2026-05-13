import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heartloom",
  description: "Preserve your words and wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>{children}</ClerkProvider>
  ) : (
    children
  );

  return (
    <html lang="en">
      <body>{content}</body>
    </html>
  );
}
