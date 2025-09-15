import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNoteParams } from "../api/clientApi";

type NoteStore = {
  draft: CreateNoteParams;
  setDraft: (draft: CreateNoteParams) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteParams = {
  title: "",
  content: "",
  tag: "Todo",
};
