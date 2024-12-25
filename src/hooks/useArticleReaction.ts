"use client";
import { IReactionState, REACTION_TYPES } from "@/lib/types";
import { AxiosRequestTransformer, AxiosResponse } from "axios";
import { useState } from "react";

type Reaction = {
  id: number | null;
  type: REACTION_TYPES | null;
};

export const useArticleReaction = ({
  id, // this will be id of article or comment
  likes,
  dislikes,
  reaction_type,
  reactionHandlerService,
}: {
  id: number;
  likes: number;
  dislikes: number;
  reaction_type: REACTION_TYPES | null;
  reactionHandlerService: (id: number, type: REACTION_TYPES) => Promise<any>;
}) => {
  const [reactionState, setReactionState] = useState<IReactionState>({
    type: reaction_type || null,
    likes,
    dislikes,
  });
  const handleReaction = async (type: REACTION_TYPES) => {
    try {
      const response = await reactionHandlerService(id, type);
      const { data } = response.data || {};

      setReactionState((prev: IReactionState) => {
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

  return { handleReaction, reactionState };
};
