import { REACTION_TYPES } from "@/lib/types";
import axios from "axios";

const BASE_ENDPOINT = "/api/reaction";
export const reactionSHanlder = async (
  articleId: number,
  type: REACTION_TYPES
) => {
  return await axios.post(`${BASE_ENDPOINT}?articleId=${articleId}`, {
    type,
  });
};
