import defaultImage from "../../assets/default-image.webp";
import { Triangle } from "lucide-react";
import Button from "../ui/Button";
import Card, { CardContent, CardHeader } from "../ui/Card";
import { CommentType } from "../../types/comment";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";
import { totalUpVotes } from "../../helpers/vote";
import parse from "html-react-parser";
import { getUserFromStorage } from "../../utils/apis/auths";

interface CommentCardProps extends CommentType {
  threadId: string;
  upVoteCommentHandler: (threadId: string, commentId: string) => void;
  downVoteCommentHandler: (threadId: string, commentId: string) => void;
}

const CommentCard = ({
  threadId,
  id,
  content,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  upVoteCommentHandler,
  downVoteCommentHandler,
}: CommentCardProps) => {
  const authUser = getUserFromStorage();
  const upVotesValue = totalUpVotes(upVotesBy.length, downVotesBy.length);

  return (
    <Card className="grid grid-cols-[max-content_1fr] rounded-none border-b border-slate-300 bg-transparent p-4">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button
          className={`${upVotesBy.includes(authUser?.id as string) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 items-center justify-center rounded-full border p-0`}
          onClick={() => upVoteCommentHandler(threadId, id)}
        >
          <Triangle
            size={14}
            fill={
              upVotesBy.includes(authUser?.id as string) ? "#ffffff" : "none"
            }
          />
        </Button>
        <span className="font-semibold">{upVotesValue}</span>
        <Button
          className={`${downVotesBy.includes(authUser?.id as string) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 rotate-180 items-center justify-center rounded-full border p-0`}
          onClick={() => downVoteCommentHandler(threadId, id)}
        >
          <Triangle
            size={14}
            fill={
              downVotesBy.includes(authUser?.id as string) ? "#ffffff" : "none"
            }
          />
        </Button>
      </div>

      <div className="col-start-2 col-end-auto pb-3">
        <CardHeader className="flex justify-between border-b border-slate-200 pb-2">
          <div className="flex items-start gap-2">
            <div className="size-8 overflow-hidden rounded-full">
              <img src={owner.avatar || defaultImage} alt="profile" />
            </div>
            <div className="text-sm">{owner.name}</div>
          </div>
          <div className="text-sm text-slate-400">
            posted{" "}
            <span className="font-medium text-slate-900">
              {formatCreatedTime(createdAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="ml-2 py-2">
          <p>{parse(content)}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default CommentCard;
