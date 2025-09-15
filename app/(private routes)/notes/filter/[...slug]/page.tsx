import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import css from "./NotesPage.module.css";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const filterNote = slug[0];
  return {
    title: `Notes with ${filterNote} filter`,
    description: `All your notes in one app`,
    openGraph: {
      title: `Notes with ${filterNote} filter`,
      description: `All your notes in one app`,
      url: `https://08-zustand-theta-blue.vercel.app/notes/filter/${filterNote}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag: tag }],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <div className={css.app}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </div>
  );
}
