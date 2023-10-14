import { MessageParams } from "element-plus";

export const useCatch = <T>(fn: Promise<T>) => {
  return fn
    .then((res: T) => {
      return [null, res];
    })
    .catch((err) => {
      return [err, null];
    });
};

/**
 * 图片懒加载
 * @param imgs
 */
export const useLazyLoadImage = (imgs: NodeListOf<HTMLImageElement>) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.isIntersecting) {
        const imgElement = item.target as HTMLImageElement;
        imgElement.src = imgElement.dataset.src;
        io.unobserve(imgElement);
      }
    });
  });
  imgs.forEach((img) => {
    io.observe(img);
  });
};

let currentMessage = null;
/**
 * 自定义消息提示
 * @param options
 */
export const useMessage = (options: MessageParams) => {
  if (currentMessage) {
    currentMessage.close();
  }
  const message = ElMessage(Object.assign({ offset: 80 }, options));

  currentMessage = message;
};
