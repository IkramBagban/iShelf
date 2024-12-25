"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { REACTION_TYPES, IReactionState } from "@/lib/types";

const ReactionButtons: React.FC<{
  reactionState: IReactionState;
  reactionHandler: (reaction_type: REACTION_TYPES) => void;
}> = ({ reactionState, reactionHandler }) => {
  return (
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
            reactionState?.type === REACTION_TYPES.LIKE ? "fill-current" : ""
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
            reactionState?.type === REACTION_TYPES.DISLIKE ? "fill-current" : ""
          }`}
        />
        <span className="text-sm font-medium">{reactionState.dislikes}</span>
        <span className="hidden sm:inline">
          {reactionState?.type === REACTION_TYPES.DISLIKE
            ? "Disliked"
            : "Dislike"}
        </span>
      </Button>
    </div>
  );
};

export default ReactionButtons;
