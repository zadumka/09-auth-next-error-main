import css from "./Footer.module.css";

export default function AppFooter() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Anastasiia Ambarnova</p>
          <p>
            Contact us:
            <a href="mailto:ambarnova94@gmail.com">ambarnova94@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
