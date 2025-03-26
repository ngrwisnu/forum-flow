import { ChangeEvent, useState } from "react";
import Button from "../ui/Button";
import Editor from "../ui/Editor";

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState("");

  const editorBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    setContent(e.target.innerHTML);
  };

  return (
    <form>
      <Editor
        placeholder="Write your comment here..."
        editorHandler={editorBlurHandler}
      />
      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          className="btn-secondary"
          onClick={() => onSubmit(content)}
        >
          Post comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
