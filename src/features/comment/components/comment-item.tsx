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
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card key={comment.id}>
      <CardHeader>
        <CardTitle>{comment.user?.name ?? "Anonymous"}</CardTitle>
        <CardDescription>{comment.createdAt.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>{comment.content}</CardContent>
    </Card>
  );
};

export { CommentItem };
