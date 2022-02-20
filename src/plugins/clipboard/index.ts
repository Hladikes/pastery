export const copy = (text) => {
  return navigator.clipboard?.writeText(text)
    .then(_ => console.log('Link copied successfuly'))
    .catch(err => console.error('Link copy error', err))
}