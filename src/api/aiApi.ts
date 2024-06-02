const AI_BASEURL = import.meta.env.VITE_API_HOST + "/api/v1/ai";

export type AiType = "KIMI" | "TY";

export type GetAiReplyBody = {
  ai: AiType;
  prompt: string;
  isStream?: boolean;
  isSearch?: boolean;
  conversation_id?: string;
};
export const getAIReply = (model: string, body: GetAiReplyBody) => {
  const cookieToken = useCookie("token");
  return fetch(AI_BASEURL, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookieToken.value,
    },
    body: JSON.stringify({
      model,
      ...body,
    }),
  });
};
