import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentWithMeta } from "../types";

type CommentItemProps = {
  comment: CommentWithMeta;
  buttons: React.ReactNode;
};

const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <>
      <div className="flex gap-2">
        <Card key={comment.id} className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{comment.user?.name ?? "Anonymous"}</span>
            </CardTitle>
            <CardDescription>
              {comment.createdAt.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>{comment.content}</CardContent>
        </Card>

        <div className="flex flex-col gap-1">{buttons}</div>
      </div>
    </>
  );
};

export { CommentItem };
