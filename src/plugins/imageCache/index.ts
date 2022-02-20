type CachedImage = {
  el: HTMLImageElement
  loaded: boolean
  valid: boolean
}

const cache: Map<string, CachedImage> = new Map()

const toKey = (src: string, id: string) => `${src}:${id}`

export const getCachedImage = (src: string, id: string, classNames: string, onload, onerror): HTMLImageElement => {
  const key = toKey(src, id)
  
  if (cache.has(key)) {
    const cachedImage = cache.get(key)

    if (cachedImage.loaded) onload()
    if (!cachedImage.valid) onerror()
    
    return cache.get(key).el
  }

  const cachedImage = {
    el: new Image(),
    loaded: false,
    valid: true,
  }

  cachedImage.el.src = src
  cachedImage.el.alt = src
  cachedImage.el.className += classNames
  
  cachedImage.el.onload = () => {
    cachedImage.loaded = true
    onload()
  }

  cachedImage.el.onerror = () => {
    cachedImage.valid = false
    onerror()
  }

  cache.set(key, cachedImage)

  return cachedImage.el
}

globalThis.cache = cache