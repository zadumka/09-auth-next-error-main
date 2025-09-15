import type { Metadata } from "next";
import AppHeader from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";
import AppFooter from "@/components/Footer/Footer";
import { Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "All your notes in one app",
  openGraph: {
    title: "NoteHub",
    description: "All your notes in one app",
    url: "https://08-zustand-theta-blue.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "logo NoteHub",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} `}>
        <TanStackProvider>
          <AuthProvider>
            <AppHeader />
            {children}
            {modal}
            <AppFooter />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
