"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { REACTION_TYPES } from "@/lib/types";
import { reactionSHanlder } from "@/services/reaction";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  id: number;
  Reaction: {
    id: number | null;
    type: REACTION_TYPES | null;
  };
}

const ArticleCard: React.FC<Props> = ({ title, description, id, Reaction }) => {
  const [reaction, setReaction] = useState<Props["Reaction"]>(Reaction);
  const router = useRouter()
  const reactionHandler = async (type: REACTION_TYPES) => {
    try {
      const response = await reactionSHanlder(id, type);

      const { data } = response.data || {};
      if (!data) {
        setReaction({ type: null, id: null });
        return;
      }

      return setReaction({ type: data.type, id: data.id });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Updated on Nov 7, 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => reactionHandler(REACTION_TYPES.LIKE)}
            >
              {reaction?.type === REACTION_TYPES.LIKE ? (
                <ThumbsUp className="w-4 h-4 text-blue-500 fill-current" />
              ) : (
                <ThumbsUp className="w-4 h-4" />
              )}
              {reaction?.type === REACTION_TYPES.LIKE ? "Liked" : "Like"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => reactionHandler(REACTION_TYPES.DISLIKE)}
            >
              {reaction?.type === REACTION_TYPES.DISLIKE ? (
                <ThumbsDown className="w-4 h-4 text-red-500 fill-current" />
              ) : (
                <ThumbsDown className="w-4 h-4" />
              )}
              {reaction?.type === REACTION_TYPES.DISLIKE
                ? "Disliked"
                : "Dislike"}
            </Button>
          </div>

          <Button onClick={()=> router.push('view-article')} variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
