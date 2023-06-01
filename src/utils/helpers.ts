export const debounce = (callback: () => void, timer: number) => {
  let timeoutID: any
  return () => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      callback()
    }, timer)
  }
}
