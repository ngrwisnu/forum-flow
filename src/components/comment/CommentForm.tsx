import { ChangeEvent, useRef, useState } from "react";
import Button from "../ui/Button";
import Editor from "../ui/Editor";

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const editorBlurHandler = (e: ChangeEvent<HTMLDivElement>) => {
    setContent(e.target.innerHTML);
  };

  const postCommentHandler = () => {
    onSubmit(content);

    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setContent("");
  };

  return (
    <form>
      <Editor
        editorRef={editorRef}
        placeholder="Write your comment here..."
        editorHandler={editorBlurHandler}
      />
      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          className="btn-secondary"
          onClick={postCommentHandler}
        >
          Post comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
