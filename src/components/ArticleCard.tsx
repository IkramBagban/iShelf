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
  const [reaction, setReaction] = useState<Props["Reaction"]>(Reaction);
  const router = useRouter();

  const reactionHandler = async (type: REACTION_TYPES) => {
    try {
      const response = await reactionSHanlder(id, type);

      const { data } = response.data || {};
      if (!data) {
        setReaction({ type: null, id: null });
        return;
      }

      setReaction({ type: data.type, id: data.id });
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
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 transition ${
                reaction?.type === REACTION_TYPES.LIKE
                  ? "text-blue-500"
                  : "text-gray-700 hover:text-blue-400"
              }`}
              onClick={() => reactionHandler(REACTION_TYPES.LIKE)}
            >
              <ThumbsUp
                className={`w-5 h-5 ${
                  reaction?.type === REACTION_TYPES.LIKE ? "fill-current" : ""
                }`}
              />
              <span className="text-sm font-medium">{totalLikes}</span>
              <span className="hidden sm:inline">
                {reaction?.type === REACTION_TYPES.LIKE ? "Liked" : "Like"}
              </span>
            </Button>

            {/* Dislike Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 transition ${
                reaction?.type === REACTION_TYPES.DISLIKE
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-400"
              }`}
              onClick={() => reactionHandler(REACTION_TYPES.DISLIKE)}
            >
              <ThumbsDown
                className={`w-5 h-5 ${
                  reaction?.type === REACTION_TYPES.DISLIKE
                    ? "fill-current"
                    : ""
                }`}
              />
              <span className="text-sm font-medium">{totalDislikes}</span>
              <span className="hidden sm:inline">
                {reaction?.type === REACTION_TYPES.DISLIKE
                  ? "Disliked"
                  : "Dislike"}
              </span>
            </Button>
          </div>

          {/* Comment Button */}
          <Button
            onClick={() => router.push("view-article")}
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
