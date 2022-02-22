import { writable, get } from 'svelte/store'
import type { Writable } from 'svelte/store'
import { links } from '@/store/links'
import type { Link } from './links'

export const selections: Writable<Set<Link>> = writable(new Set())

export const isSelectionModeOn: Writable<boolean> = writable(false)

export const toggleSelection = (link: Link) => {
  selections.update((s) => {
    if (s.has(link)) {
      s.delete(link)
    } else {
      s.add(link)
    }

    return s
  })
}

export const selectAllLinks = () => {
  selections.update((s) => {
    get(links).forEach((link) => {
      s.add(link)
    })

    return s
  })
}

export const unselectAllLinks = () => {
  selections.update((s) => {
    s.clear()
    return s
  })
}
