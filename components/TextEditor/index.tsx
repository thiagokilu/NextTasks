import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type TextEditorProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ value = "", onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  // 🔹 Inicializa o Quill apenas uma vez
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
      },
    });

    quillRef.current = quill;

    // 🔹 Define valor inicial
    quill.root.innerHTML = value;

    // 🔹 Escuta mudanças
    quill.on("text-change", () => {
      const html = quill.root.innerHTML;
      onChange(html);
    });
  }, []);

  // 🔹 Atualiza o conteúdo se o value mudar externamente
  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    if (value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="editor-dark">
      <div ref={editorRef} />
    </div>
  );
}
