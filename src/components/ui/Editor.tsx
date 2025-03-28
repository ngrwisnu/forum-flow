import { ChangeEvent, HTMLAttributes, Ref } from "react";

interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  editorRef?: Ref<HTMLDivElement>;
  placeholder?: string;
  editorHandler: (e: ChangeEvent<HTMLDivElement>) => void;
}

const Editor = ({
  placeholder = "Enter the text here...",
  editorRef,
  editorHandler,
  ...props
}: EditorProps) => {
  return (
    <div
      ref={editorRef}
      className="rich-editor min-h-60 rounded-lg border border-slate-200 p-4"
      data-placeholder={placeholder}
      onBlur={editorHandler}
      contentEditable
      {...props}
    ></div>
  );
};

export default Editor;
