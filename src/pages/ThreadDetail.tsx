import { ChangeEvent, useEffect, useState } from "react";
import CommentFilter from "../components/comment/CommentFilter";
import ThreadDetailCard from "../components/thread/ThreadDetailCard";
import CommentCard from "../components/comment/CommentCard";
import { itemsSorter } from "../helpers/itemsSorter";
import { totalUpVotes } from "../helpers/vote";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useParams } from "react-router-dom";
import { asyncGetThreadDetails } from "../store/thread/action";

const ThreadDetail = () => {
  const [sortCommentBy, setSortCommentBy] = useState<
    "newest" | "highest_votes"
  >("highest_votes");

  const { threadId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const threadDetails = useSelector(
    (state: RootState) => state.thread.threadDetails,
  );

  useEffect(() => {
    dispatch(asyncGetThreadDetails(threadId as string));
  }, [dispatch, threadId]);

  const commentSorterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCommentBy(e.target.value as "newest" | "highest_votes");
  };

  const sortedComments = itemsSorter(
    threadDetails?.comments || [],
    sortCommentBy,
    totalUpVotes,
  );

  if (!threadDetails) {
    return <p className="mt-5 text-center">Details not found</p>;
  }

  return (
    <div className="w-full p-4">
      <ThreadDetailCard {...threadDetails} />
      <div className="ml-8 border-l border-slate-300 pt-8">
        <div className="flex items-center justify-between py-3 pl-4">
          <h2 className="text-lg font-normal">
            <span className="font-bold">{threadDetails.comments.length}</span>{" "}
            {threadDetails.comments.length > 1 ? "comments" : "comment"}
          </h2>
          <CommentFilter
            value={sortCommentBy}
            sorterHandler={commentSorterHandler}
          />
        </div>

        <div className="py-3">
          {!threadDetails.comments.length && (
            <p className="text-center">No comments found</p>
          )}
          {sortedComments.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;
