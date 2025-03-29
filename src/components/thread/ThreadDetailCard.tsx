import { Triangle } from "lucide-react";
import defaultImage from "../../assets/default-image.webp";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import Button from "../ui/Button";
import { ThreadDetailsType } from "../../types/thread";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";
import { totalUpVotes } from "../../helpers/vote";
import parse from "html-react-parser";
import { getUserFromStorage } from "../../utils/apis/auths";

interface ThreadDetailCardProps extends ThreadDetailsType {
  upVoteThreadHandler: (threadId: string) => void;
  downVoteThreadHandler: (threadId: string) => void;
}

const ThreadDetailCard = ({
  id,
  title,
  body,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  upVoteThreadHandler,
  downVoteThreadHandler,
}: ThreadDetailCardProps) => {
  const authUser = getUserFromStorage();

  return (
    <Card className="grid grid-cols-[max-content_1fr]">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button
          className={`${upVotesBy.includes(authUser?.id as string) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 items-center justify-center rounded-full border p-0`}
          onClick={() => upVoteThreadHandler(id)}
        >
          <Triangle
            size={14}
            fill={
              upVotesBy.includes(authUser?.id as string) ? "#ffffff" : "none"
            }
          />
        </Button>
        <span className="font-semibold">
          {totalUpVotes(upVotesBy?.length, downVotesBy?.length)}
        </span>
        <Button
          className={`${downVotesBy.includes(authUser?.id as string) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 rotate-180 items-center justify-center rounded-full border p-0`}
          onClick={() => downVoteThreadHandler(id)}
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
              {formatCreatedTime(createdAt!)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="ml-2 py-2">
          <h1 className="mb-2 text-xl font-bold">{title}</h1>
          <div>{parse(body)}</div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ThreadDetailCard;
