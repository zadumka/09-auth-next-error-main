"use client";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { CreateNoteParams } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

// interface NoteFormProps {
//   onClose: () => void;
// }

// const NoteSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Required"),
//   content: Yup.string().max(500, "Too Long!"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
//     .required("Required"),
// });

// interface FormValues {
//   title: string;
//   content: string;
//   tag: string;
// }

// const initialValues: FormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const createNewNote = (formData: FormData) => {
    const newNote: CreateNoteParams = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: String(formData.get("tag")) as CreateNoteParams["tag"],
    };

    createNoteMutation.mutate(newNote);
  };

  return (
    <form className={css.form} action={createNewNote}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft?.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft?.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          value={draft?.tag}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
