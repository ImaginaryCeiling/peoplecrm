import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, SignUpButton } from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeopleCRM",
  description: "A human-first CRM to keep track of people you care about",
  openGraph: {
    title: "PeopleCRM",
    description: "A human-first CRM to keep track of people you care about",
    images: [
      { url: "/og-image.png" },
    ],
    siteName: "PeopleCRM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeopleCRM",
    description: "A human-first CRM to keep track of people you care about",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <header className="flex justify-between items-center p-4 gap-4 h-16">
              <SignedOut>
                <SignInButton />
                <h1 className="text-2xl font-bold">
                <Link href="/">PeopleCRM</Link>
              </h1>
                <SignUpButton />
              </SignedOut>
              
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
