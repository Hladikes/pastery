<script lang="ts">
  import { onMount } from 'svelte'
  import { links, addLink } from '@/store/links'
  import Card from '@/components/paste/Card.svelte'
  import Footer from '@/components/Footer.svelte'
  import PastesManager from '@/components/PastesManager.svelte'
  import Toast, { createToast } from '@/plugins/toast/Toast.svelte'
  import Confirm from '@/plugins/confirm/Confirm.svelte'
  import { popupVisible } from '@/plugins/popup/Popup.svelte'
  import { parseAsJSON } from './plugins/util'

  import '@/styles.css'
  import '@/plugins/icons/import.css'

  let input: HTMLElement = null
  let searchKeywords: string = ''
  
  // Dynamic search results array, which value depends on search query.
  // If search query is empty, the default links list will be returned, otherwise
  // only relevant results will be shown
  $: searchResults = (
    (searchKeywords === '')
      ? $links 
      : $links.filter((link) => link.keywords.includes(searchKeywords))
  )

  onMount(() => {
    document.addEventListener('paste', (ev: ClipboardEvent) => {
      ev.preventDefault()
      // We assume that the data in the clipboard is valid URL. We don't
      // have to check it here, because card component will quickly check
      // whether the given data is valid or not
      const data = ev.clipboardData.getData('text/plain')

      // Check if the given data is exported JSON of links
      parseAsJSON(data)
        .then((arrayOfLinks: Array<{ url: string, keywords: string }>) => {
          const isDataValid = (
            Array.isArray(arrayOfLinks) &&
            arrayOfLinks.every((item) => {
              return (
                item?.url?.constructor === String &&
                item?.keywords?.constructor === String
              )
            })
          )

          if (!isDataValid) {
            return createToast({
              type: 'danger', 
              icon: 'error', 
              text: 'Invalid data :(', 
              delay: 1500,
            })
          }

          arrayOfLinks.reverse().forEach(({ url, keywords }) => {
            addLink(url, keywords)
          })
        })
        .catch(() => {
          addLink(data)
        })
    })

    // Listen to every keydown event, to achieve fast searching without
    // needing to click on a search bar.
    // If the escape key is pressed, the current search query will be erased
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
      if ($popupVisible || ev.ctrlKey) return

      input?.focus()

      if (ev.key === 'Escape') {
        searchKeywords = ''
      }
    })
  })
</script>

<main class="flex flex-col items-center  min-h-screen bg-primary select-none space-y-5">
  <div class="mt-8 sm:p-4 p-4 pb-0 w-full sm:w-3/5 xl:w-2/5">
    <h1 class="md:text-7xl text-5xl text-white font-medium select-none">
      <span class="text-accent">Paste</span>ry
    </h1>
    <h4 class="text-white text-opacity-30 my-2 ml-1 select-none">Shitreacting was never this quick</h4>
    <input 
      bind:this={input} 
      bind:value={searchKeywords}
      type="text" 
      placeholder="Search"
      class="bg-secondary/10 text-white border-2 border-transparent md:text-3xl text-2xl font-medium placeholder-gray-300  p-3 sm:p-5 w-full  rounded-xl transition-colors focus:outline-none focus:placeholder-white focus:bg-accent/20 focus:border-accent/40">
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 w-full sm:p-4 p-4 pt-0">
    {#each searchResults as link (link.id)}
      <Card {link} />  
    {/each}
  </div>

  {#if searchResults.length === 0}
    <h1 class="text-secondary font-medium select-none opacity-70 text-2xl my-10">Pretty empty here, innit</h1>
    {#if searchKeywords === ''}
      <h1 class="text-white font-medium text-3xl select-none leading-10 mb-10 px-4 w-full sm:w-3/5 xl:w-2/5">
        <span>To start, just paste the URL link of your mostly used image, with</span>
        <span class="font-mono text-2xl text-accent p-1.5 bg-accent bg-opacity-10 rounded-lg">Ctrl+V</span>
        <span>or</span>
        <span class="font-mono text-2xl text-accent p-1.5 bg-accent bg-opacity-10 rounded-lg">Cmd+V</span>
        <span>on a Mac</span>
      </h1>
    {/if}
  {/if}
</main>

<PastesManager />
<Footer />

<Toast />
<Confirm />