import { ChangeEvent, useState } from "react";
import CommentFilter from "../components/comment/CommentFilter";
import ThreadDetailCard from "../components/thread/ThreadDetailCard";
import { detailThread } from "../data/dummy";
import CommentCard from "../components/comment/CommentCard";

const ThreadDetail = () => {
  const [sortCommentBy, setSortCommentBy] = useState("highest_votes");

  const commentSorterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCommentBy(e.target.value);
  };

  const detailsData = detailThread;

  return (
    <div className="w-full p-4">
      <ThreadDetailCard {...detailsData} />
      <div className="ml-8 border-l border-slate-400 pt-8">
        <div className="flex items-center justify-between py-3 pl-4">
          <h2 className="text-lg font-normal">
            <span className="font-bold">{detailsData.comments.length}</span>{" "}
            {detailsData.comments.length > 1 ? "comments" : "comment"}
          </h2>
          <CommentFilter
            value={sortCommentBy}
            sorterHandler={commentSorterHandler}
          />
        </div>

        <div className="py-3">
          {!detailsData.comments.length && (
            <p className="text-center">No comments found</p>
          )}
          {detailsData.comments.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
