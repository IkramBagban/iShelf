import { REACTION_TYPES } from "@/lib/types";
import axios from "axios";

const BASE_ENDPOINT = "/api/reaction";
export const articleReactionSHanlder = async (
  id: number,
  type: REACTION_TYPES
) => {
  return await axios.post(`${BASE_ENDPOINT}?articleId=${id}`, {
    type,
  });
};
