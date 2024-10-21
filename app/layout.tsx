"use client";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import ModalProvider from "@/providers/modal-provider";

import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn></SignedIn>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
