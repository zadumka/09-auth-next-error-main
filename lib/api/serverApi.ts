import { cookies } from "next/headers";
import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { NoteResponse } from "./clientApi";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async () => {
  const cookieStore = cookies();

  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchServerNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> => {
  const cookieStore = cookies();
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      page: page,
      perPage: 12,
      search: query,
      tag: tag,
    },
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
