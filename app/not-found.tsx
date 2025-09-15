import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, something went wrong.",
  openGraph: {
    title: "404 - Page not found",
    description: "Sorry, something went wrong.",
    url: "https://08-zustand-theta-blue.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, something went wrong.</p>
    </div>
  );
};

export default NotFound;
