

export function sleep(wait) {
  return new Promise((reslove) => {
    setTimeout(reslove, wait)
  })
}