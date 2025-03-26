import { HTMLAttributes } from "react";

interface EditorProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}

const Editor = ({
  placeholder = "Enter the text here...",
  ...props
}: EditorProps) => {
  return (
    <div
      className="rich-editor min-h-60 rounded-lg border border-slate-200 p-4"
      data-placeholder={placeholder}
      contentEditable
      {...props}
    ></div>
  );
};

export default Editor;
