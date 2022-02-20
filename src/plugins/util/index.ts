export const randomId = (): string => String(Math.random()).substring(2)

export const parseAsJSON = (content: string): Promise<any> => new Promise((res, rej) => {
  try {
    res(JSON.parse(content))
  } catch (err) {
    rej(null)
  }
})