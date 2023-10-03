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
