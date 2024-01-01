const AI_BASEURL = "/ai";

const API_KEY = import.meta.env.VITE_TY_API_KEY;

export const getAIReply = (prompt: string) => {
  return fetch(AI_BASEURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + API_KEY,
      "Content-Type": "application/json",
      "X-DashScope-SSE": "enable",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      model: "qwen-max-1201",
      input: {
        prompt: prompt,
      },
    }),
  });
};
