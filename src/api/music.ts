type getmMusicType = {
  type: string;
  id: string;
  server?: string;
};

/**
 * 获取音乐数据
 * @param data
 * @returns
 */
export const getMusic = (data: getmMusicType) => {
  return useFetch(
    `https://api.injahow.cn/meting/?type=${data.type}&id=${data.id}&server=${data.server}`,
    {
      method: "GET",
    }
  );
};
