import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchServerNoteById } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
