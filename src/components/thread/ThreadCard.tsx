import Badge from "../ui/Badge";
import Card, { CardContent, CardFooter, CardHeader } from "../ui/Card";
import defaultImage from "../../assets/default-image.webp";
import { truncateText } from "../../helpers/truncateText";
import { Link } from "react-router-dom";
import { ThreadType } from "../../types/thread";
import { formatCreatedTime } from "../../helpers/formatCreatedTime";

interface ThreadCardProps extends ThreadType {
  avatar?: string;
  name: string;
}

const ThreadCard = ({ avatar, name, ...thread }: ThreadCardProps) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between text-slate-400">
        <div className="">
          Category: <Badge className="badge-neutral">{thread.category}</Badge>
        </div>
        <div className="">{formatCreatedTime(thread.createdAt)}</div>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="flex w-full items-center gap-2">
          <div className="size-12 overflow-hidden rounded-full">
            <img src={avatar || defaultImage} alt="profile" />
          </div>
          <div className="text-lg font-bold">{name}</div>
        </div>
        <div className="mt-2 ml-2 w-full">
          <h6 className="font-bold">{thread.title}</h6>
          <p className="text-sm">
            {truncateText(thread.body)}{" "}
            <Link
              to={`/threads/${thread.id}`}
              className="link link-hover link-secondary"
            >
              Read more
            </Link>
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-end gap-3">
        <div className="font-light">
          <span className="font-bold">3</span> votes
        </div>
        <div className="font-light">
          <span className="font-bold">2</span> replies
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
