const AI_BASEURL = import.meta.env.VITE_API_HOST + "/api/v1/ai";

export const getAIReply = (prompt: string, model: string) => {
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
      prompt,
    }),
  });
};
