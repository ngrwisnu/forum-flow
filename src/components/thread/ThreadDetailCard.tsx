import { Triangle } from "lucide-react";
import defaultImage from "../../assets/default-image.webp";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import Button from "../ui/Button";
import { DetailThreadType } from "../../types/thread";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";
import { totalUpVotes } from "../../helpers/vote";
import parse from "html-react-parser";

const ThreadDetailCard = ({
  title,
  body,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
}: DetailThreadType) => {
  return (
    <Card className="grid grid-cols-[max-content_1fr]">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button className="flex size-8 items-center justify-center rounded-full border border-slate-400 bg-transparent p-0 text-slate-400">
          <Triangle size={14} />
        </Button>
        <span className="font-semibold">
          {totalUpVotes(upVotesBy?.length, downVotesBy?.length)}
        </span>
        <Button className="flex size-8 rotate-180 items-center justify-center rounded-full border border-slate-400 bg-transparent p-0 text-slate-400">
          <Triangle size={14} />
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
          <p>{parse(body)}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default ThreadDetailCard;
