"use client";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

import css from "./NotesPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useDebounce } from "use-debounce";
import type { NoteResponse } from "@/lib/api/clientApi";

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [debouncedQuery] = useDebounce(query, 300);

  const handleChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const { data } = useQuery<NoteResponse>({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => fetchNotes(page, debouncedQuery, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>

      {data?.notes && <NoteList notes={data?.notes} />}
    </div>
  );
}
