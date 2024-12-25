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
  totalLikes: number;
  totalDislikes: number;
}

const ArticleCard: React.FC<Props> = ({
  title,
  description,
  id,
  Reaction,
  totalLikes,
  totalDislikes,
}) => {
  const [reactionState, setReactionState] = useState<{
    type: REACTION_TYPES | null;
    likes: number;
    dislikes: number;
  }>({
    type: Reaction?.type || null,
    likes: totalLikes,
    dislikes: totalDislikes,
  });

  const router = useRouter();

  const reactionHandler = async (type: REACTION_TYPES) => {
    try {
      const response = await reactionSHanlder(id, type);
      const { data } = response.data || {};

      setReactionState((prev) => {
        if (!data) {
          return {
            ...prev,
            likes:
              prev.type === REACTION_TYPES.LIKE ? prev.likes - 1 : prev.likes,
            dislikes:
              prev.type === REACTION_TYPES.DISLIKE
                ? prev.dislikes - 1
                : prev.dislikes,
            type: null,
          };
        }

        const isSameReaction = prev.type === data.type;
        return {
          likes:
            data.type === REACTION_TYPES.LIKE
              ? isSameReaction
                ? prev.likes
                : prev.likes + 1
              : prev.type === REACTION_TYPES.LIKE
              ? prev.likes - 1
              : prev.likes,
          dislikes:
            data.type === REACTION_TYPES.DISLIKE
              ? isSameReaction
                ? prev.dislikes
                : prev.dislikes + 1
              : prev.type === REACTION_TYPES.DISLIKE
              ? prev.dislikes - 1
              : prev.dislikes,
          type: isSameReaction ? null : data.type,
        };
      });
    } catch (error) {
      console.error("Reaction error:", error);
    }
  };

  return (
    <Card className="border rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Updated on Nov 7, 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 transition ${
                reactionState?.type === REACTION_TYPES.LIKE
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-400"
              }`}
              onClick={() => reactionHandler(REACTION_TYPES.LIKE)}
            >
              <ThumbsUp
                className={`w-5 h-5 ${
                  reactionState?.type === REACTION_TYPES.LIKE
                    ? "fill-current"
                    : ""
                }`}
              />
              <span className="text-sm font-medium">{reactionState.likes}</span>
              <span className="hidden sm:inline">
                {reactionState?.type === REACTION_TYPES.LIKE ? "Liked" : "Like"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 transition ${
                reactionState?.type === REACTION_TYPES.DISLIKE
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-400"
              }`}
              onClick={() => reactionHandler(REACTION_TYPES.DISLIKE)}
            >
              <ThumbsDown
                className={`w-5 h-5 ${
                  reactionState?.type === REACTION_TYPES.DISLIKE
                    ? "fill-current"
                    : ""
                }`}
              />
              <span className="text-sm font-medium">
                {reactionState.dislikes}
              </span>
              <span className="hidden sm:inline">
                {reactionState?.type === REACTION_TYPES.DISLIKE
                  ? "Disliked"
                  : "Dislike"}
              </span>
            </Button>
          </div>

          <Button
            onClick={() => router.push("view-article?article_id=" + id)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Comment</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
