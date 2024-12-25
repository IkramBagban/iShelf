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
import { IReactionState, REACTION_TYPES } from "@/lib/types";
import { articleReactionSHanlder } from "@/services/reaction";
import { useRouter } from "next/navigation";
import ReactionButtons from "./ReactionButtons";
import { useArticleReaction } from "@/hooks/useArticleReaction";

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
  const router = useRouter();

  const { handleReaction, reactionState } = useArticleReaction({
    id: id,
    likes: totalLikes,
    dislikes: totalDislikes,
    reaction_type: Reaction?.type,
    reactionHandlerService: articleReactionSHanlder,
  });

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
          <ReactionButtons
            reactionState={reactionState}
            reactionHandler={handleReaction}
          />

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
