import dynamic from "next/dynamic";
import { ComponentProps } from "react";

const TextEditor = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <div className="min-h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>,
});

export default function DynamicTextEditor(props: ComponentProps<typeof TextEditor>) {
  return <TextEditor {...props} />;
}
