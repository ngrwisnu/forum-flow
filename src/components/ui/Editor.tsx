import { ChangeEvent, HTMLAttributes } from "react";

interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  editorHandler: (e: ChangeEvent<HTMLDivElement>) => void;
}

const Editor = ({
  placeholder = "Enter the text here...",
  editorHandler,
  ...props
}: EditorProps) => {
  return (
    <div
      className="rich-editor min-h-60 rounded-lg border border-slate-200 p-4"
      data-placeholder={placeholder}
      onBlur={editorHandler}
      contentEditable
      {...props}
    ></div>
  );
};

export default Editor;
