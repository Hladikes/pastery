import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { randomId } from '@/plugins/util'
import { createToast } from '@/plugins/toast/Toast.svelte'

export type Link = {
  url: string
  id: string
  keywords: string
}

// Deserialize data in LocalStorage. In case of no data, the empty array will be deserialized
export const links: Writable<Link[]> = writable(JSON.parse(localStorage.links || '[]'))

// Prepending newly generated link object
export const addLink = (url: string, keywords: string = ''): void => {
  // Check if it's at least valid starting URL
  if (!/^(http[s]?:\/\/)|(data).*/.test(url)) {
    return createToast({
      text: 'Invalid URL',
      icon: 'block',
      type: 'danger',
    })
  }

  links.update((currentLinks) => {
    // Check if link already exists
    const index = currentLinks.findIndex((link) => link.url === url)

    if (index !== -1) {
      createToast({
        text: 'This URL already exists',
        icon: 'block',
        type: 'warning',
      })

      // If it's not at the start, top it
      if (index !== 0) {
        currentLinks.unshift(currentLinks.splice(index, 1)[0])
      }

      return currentLinks
    }

    return [{
      id: randomId(),
      url,
      keywords,
    }, ...currentLinks]
  })

  return null
}

export const deleteLink = (id: string): void => {
  links.update((currentLinks) => currentLinks.filter((link) => link.id !== id))
}

export const deleteAllLinks = (): void => {
  links.set([])
}

// Not the most efficient way to change only one link object
export const updateKeywords = (id: string, keywords: string): void => {
  // links.update((currentLinks) => currentLinks.map((link) => {
  //   if (link.id === id) {
  //     Object.assign(link, { keywords })
  //   }

  //   return link
  // }))

  links.update((currentLinks) => {
    const foundItem = currentLinks.find(item => item.id === id)

    if (foundItem) {
      foundItem.keywords = keywords
    }
    
    return currentLinks
  })
}

// Save all the links to the LocalStorage, whenever some of the links changes
links.subscribe((allLinks) => {
  localStorage.setItem('links', JSON.stringify(allLinks))
})
