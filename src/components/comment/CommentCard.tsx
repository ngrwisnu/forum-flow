import defaultImage from "../../assets/default-image.webp";
import { Triangle } from "lucide-react";
import Button from "../ui/Button";
import Card, { CardContent, CardHeader } from "../ui/Card";
import { CommentType } from "../../types/comment";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";
import { totalUpVotes } from "../../helpers/vote";

const CommentCard = ({
  content,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
}: CommentType) => {
  const upVotesValue = totalUpVotes(upVotesBy.length, downVotesBy.length);

  return (
    <Card className="grid grid-cols-[max-content_1fr] rounded-none border-b border-slate-300 bg-transparent p-4">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button className="flex size-8 items-center justify-center rounded-full border border-slate-900 bg-transparent p-0">
          <Triangle size={14} />
        </Button>
        <span className="font-semibold">{upVotesValue}</span>
        <Button className="flex size-8 rotate-180 items-center justify-center rounded-full border border-slate-900 bg-transparent p-0">
          <Triangle size={14} />
        </Button>
      </div>

      <div className="col-start-2 col-end-auto pb-3">
        <CardHeader className="flex justify-between border-b border-slate-200 pb-2">
          <div className="flex items-start gap-2">
            <div className="size-8 overflow-hidden rounded-full">
              <img src={owner.avatar || defaultImage} alt="profile" />
            </div>
            <div className="text-base">{owner.name}</div>
          </div>
          <div className="text-slate-400">
            posted{" "}
            <span className="font-medium text-slate-900">
              {formatCreatedTime(createdAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="ml-2 py-2">
          <p>{content}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default CommentCard;
