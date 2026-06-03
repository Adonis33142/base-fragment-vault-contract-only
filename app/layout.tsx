import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { FragmentHeader } from "@/components/FragmentHeader";

export const metadata: Metadata = {
  title: "base-split-vault-fragment-collection",
  description: "A fragment collection vault for claiming slots and tracking ownership progress on Base.",
  metadataBase: new URL("https://base-split-vault-fragment-collection.vercel.app"),
  openGraph: {
    title: "base-split-vault-fragment-collection",
    description: "A fragment collection vault for claiming slots and tracking ownership progress on Base.",
    url: "https://base-split-vault-fragment-collection.vercel.app",
    siteName: "base-split-vault-fragment-collection",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="6a1fd1aada55a4530d335320" />
        <meta
          name="talentapp:project_verification"
          content="c72e1997b2a5f7c751001aaf5fe9122349136a041df6c64c06cd757abb94722c9ac31eeb56c47c32b9d1df209346c1e29836d4403d9167139361adee2266fc4e"
        />
      </head>
      <body>
        <AppProviders>
          <FragmentHeader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
