import { Triangle } from "lucide-react";
import defaultImage from "../../assets/default-image.webp";
import Card, { CardContent, CardHeader } from "../../components/ui/Card";
import Button from "../ui/Button";

const ThreadDetailCard = () => {
  return (
    <Card className="grid grid-cols-[max-content_1fr] p-4">
      <div className="col-start-1 col-end-auto flex flex-col items-center justify-center gap-2 pr-4">
        <Button className="flex size-8 items-center justify-center rounded-full border border-slate-900 bg-transparent p-0">
          <Triangle size={14} />
        </Button>
        <span className="font-semibold">111</span>
        <Button className="flex size-8 rotate-180 items-center justify-center rounded-full border border-slate-900 bg-transparent p-0">
          <Triangle size={14} />
        </Button>
      </div>

      <div className="col-start-2 col-end-auto pb-3">
        <CardHeader className="flex justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="size-8 overflow-hidden rounded-full">
              <img src={defaultImage} alt="profile" />
            </div>
            <div className="text-base">{"John Doe"}</div>
          </div>
          <div className="">
            posted <span className="font-bold">{2}</span> days ago
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <h1 className="mb-2 text-xl font-bold">Discussion Title?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            nostrum maiores soluta aliquid quas animi repellendus, voluptas
            suscipit sapiente eligendi vero, distinctio sequi officia
            perferendis facere, modi non voluptatum? Eum mollitia, porro ducimus
            obcaecati, deleniti sapiente amet eius repellendus atque, placeat
            quisquam fugiat? Quasi porro deleniti quod magnam, repellendus
            molestiae laboriosam saepe in enim, dolor ipsum perspiciatis
            adipisci est totam tempore numquam omnis architecto! Iure, earum
            numquam unde saepe quisquam voluptas nisi fugiat asperiores quae
            temporibus aperiam officia aut, libero dolor harum at aspernatur
            impedit, dignissimos rem ratione explicabo. Fugiat culpa animi ad
            incidunt? Ullam distinctio mollitia quia odit quam!
          </p>
        </CardContent>
      </div>
      <div className="col-start-1 -col-end-1 border-t border-slate-200 py-3">
        <h2 className="text-lg">Write your comment</h2>
        <div id="editor" className=""></div>
        <div className="flex justify-end">
          <Button className="btn-secondary">Post comment</Button>
        </div>
      </div>
    </Card>
  );
};

export default ThreadDetailCard;
