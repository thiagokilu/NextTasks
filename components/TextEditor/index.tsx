import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type TextEditorProps = {
  value?: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
      },
    });

    // 👇 escuta mudanças
    quillRef.current.on("text-change", () => {
      const html =
        editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
      onChange(html);
    });
  }, [onChange]);

  return (
    <div className="editor-dark">
      <div ref={editorRef}></div>
    </div>
  );
}
