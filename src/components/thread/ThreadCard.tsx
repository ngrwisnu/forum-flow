import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Badge from '../ui/Badge';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import defaultImage from '../../assets/default-image.webp';
import { truncateText } from '../../helpers/truncateText';
import { ThreadType } from '../../types/thread';
import { formatCreatedTime } from '../../helpers/formatCreatedTime';
import { totalVotes } from '../../helpers/vote';

interface ThreadCardProps extends ThreadType {
  avatar?: string;
  name: string;
}

const ThreadCard = ({ avatar, name, ...thread }: ThreadCardProps) => {
  const totalVotesValue = totalVotes(
    thread.upVotesBy.length,
    thread.downVotesBy.length,
  );

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between text-slate-400">
        <div>
          Category: <Badge className="badge-neutral">{thread.category}</Badge>
        </div>
        <div>{formatCreatedTime(thread.createdAt)}</div>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="flex w-full items-center gap-2">
          <div className="size-8 overflow-hidden rounded-full">
            <img src={avatar || defaultImage} alt="profile" />
          </div>
          <div className="text-base font-medium">{name}</div>
        </div>
        <div className="mt-2 ml-2 w-full">
          <Link
            to={`/threads/${thread.id}`}
            className="text-lg font-bold hover:opacity-80"
          >
            {thread.title}
          </Link>
          <div className="text-sm">
            {parse(truncateText(thread.body))}{' '}
            {thread.body.length >= 250 && (
              <Link
                to={`/threads/${thread.id}`}
                className="link link-hover link-secondary"
              >
                Read more
              </Link>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-end gap-3">
        <div className="font-light">
          <span className="font-bold">{totalVotesValue}</span>{' '}
          {totalVotesValue > 1 ? 'votes' : 'vote'}
        </div>
        <div className="font-light">
          <span className="font-bold">{thread.totalComments}</span>{' '}
          {thread.totalComments > 1 ? 'comments' : 'comment'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ThreadCard;
