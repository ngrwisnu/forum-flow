import { ChangeEvent, useEffect, useState } from "react";
import CommentFilter from "../components/comment/CommentFilter";
import ThreadDetailCard from "../components/thread/ThreadDetailCard";
import CommentCard from "../components/comment/CommentCard";
import { itemsSorter } from "../helpers/itemsSorter";
import { totalUpVotes } from "../helpers/vote";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Link, useParams } from "react-router-dom";
import { asyncGetThreadDetails } from "../store/thread/action";
import CommentForm from "../components/comment/CommentForm";
import { createComment } from "../utils/apis/comment";

const ThreadDetail = () => {
  const [refresh, setRefresh] = useState(false);
  const [sortCommentBy, setSortCommentBy] = useState<
    "newest" | "highest_votes"
  >("highest_votes");

  const { threadId } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { auth, thread } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(asyncGetThreadDetails(threadId as string));
  }, [dispatch, threadId, refresh]);

  const commentSorterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCommentBy(e.target.value as "newest" | "highest_votes");
  };

  const submitCommentHandler = async (content: string) => {
    const response = await createComment(threadId!, { content });

    if (response.isError) {
      alert(response.message);
    }

    setRefresh((prevState) => !prevState);
  };

  const sortedComments = itemsSorter(
    thread.threadDetails?.comments || [],
    sortCommentBy,
    totalUpVotes,
  );

  if (!thread.threadDetails) {
    return <p className="mt-5 text-center">Details not found</p>;
  }

  return (
    <div className="w-full p-4">
      <div className="rounded-lg bg-white p-4">
        <ThreadDetailCard {...thread.threadDetails} />
        <div className="col-start-1 -col-end-1 border-t border-slate-200 py-3">
          <h2 className="my-3 text-lg">Write your comment</h2>
          {!auth.isAuthenticated && (
            <div className="flex justify-between">
              <p>Please log in first before commenting this thread.</p>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          )}
          {auth.isAuthenticated && (
            <CommentForm onSubmit={submitCommentHandler} />
          )}
        </div>
      </div>
      <div className="ml-8 border-l border-slate-300 pt-8">
        <div className="flex items-center justify-between py-3 pl-4">
          <h2 className="text-lg font-normal">
            <span className="font-bold">
              {thread.threadDetails.comments.length}
            </span>{" "}
            {thread.threadDetails.comments.length > 1 ? "comments" : "comment"}
          </h2>
          <CommentFilter
            value={sortCommentBy}
            sorterHandler={commentSorterHandler}
          />
        </div>

        <div className="py-3">
          {!thread.threadDetails.comments.length && (
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
