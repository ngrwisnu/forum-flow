import { Triangle } from "lucide-react";
import defaultImage from "../../assets/default-image.webp";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import Button from "../ui/Button";
import { ThreadDetailsType } from "../../types/thread";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";
import { totalUpVotes } from "../../helpers/vote";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/apis/auths";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  asyncDownVoteThread,
  asyncUpVoteThread,
} from "../../store/thread/action";

const ThreadDetailCard = ({
  id,
  title,
  body,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
}: ThreadDetailsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const token = getAccessToken();

  const upVoteHandler = (threadId: string) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!upVotesBy.includes(owner.id!)) {
      dispatch(asyncUpVoteThread({ threadId, userId: owner.id! }));
    }
  };

  const downVoteHandler = (threadId: string) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!downVotesBy.includes(owner.id!)) {
      dispatch(asyncDownVoteThread({ threadId, userId: owner.id! }));
    }
  };

  return (
    <Card className="grid grid-cols-[max-content_1fr]">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button
          className={`${upVotesBy.includes(owner.id!) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 items-center justify-center rounded-full border p-0`}
          onClick={() => upVoteHandler(id)}
        >
          <Triangle
            size={14}
            fill={upVotesBy.includes(owner.id!) ? "#ffffff" : "none"}
          />
        </Button>
        <span className="font-semibold">
          {totalUpVotes(upVotesBy?.length, downVotesBy?.length)}
        </span>
        <Button
          className={`${downVotesBy.includes(owner.id!) ? "bg-primary/80 border-primary text-white" : "border-slate-400 bg-transparent text-slate-400"} flex size-8 rotate-180 items-center justify-center rounded-full border border-slate-400 bg-transparent p-0 text-slate-400`}
          onClick={() => downVoteHandler(id)}
        >
          <Triangle
            size={14}
            fill={upVotesBy.includes(owner.id!) ? "#ffffff" : "none"}
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
