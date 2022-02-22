export const randomId = (): string => String(Math.random()).substring(2)

export const parseAsJSON = (content: string): Promise<any> => new Promise((resolve, reject) => {
  try {
    resolve(JSON.parse(content))
  } catch (err) {
    reject(err)
  }
})
