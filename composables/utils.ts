
export const useCatch = <T>(fn: Promise<T>) => {
  return fn.then((res: T) => {
    return ([null, res])
  })
    .catch(err => {
      return [err, null]
    })

}