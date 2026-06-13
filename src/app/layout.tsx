import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import "./globals.css";
import { AccessibilityProvider } from "@/lib/accessibility/AccessibilityProvider";
import { NO_FLASH_SCRIPT } from "@/lib/accessibility/no-flash-script";
import { AccessibilityWidget } from "@/components/accessibility/AccessibilityWidget";

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

  const content = (
    <AccessibilityProvider>
      {children}
      <AccessibilityWidget />
    </AccessibilityProvider>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        {clerkPublishableKey ? (
          <ClerkProvider publishableKey={clerkPublishableKey}>
            {content}
          </ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  );
}
