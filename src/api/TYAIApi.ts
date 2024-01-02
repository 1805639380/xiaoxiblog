const AI_BASEURL = import.meta.env.VITE_API_HOST + "/api/v1/ai";

export const getAIReply = (prompt: string, model: string) => {
  return fetch(AI_BASEURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
    }),
  });
};
