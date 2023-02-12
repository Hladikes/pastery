<script lang="ts">
  import { copy } from '@/plugins/clipboard';
  import { getCachedImage } from '@/plugins/imageCache'
  import Popup from '@/plugins/popup/Popup.svelte'
  import { createToast } from '@/plugins/toast/Toast.svelte';
  import type { Link } from '@/store/links'
  import { isSelectionModeOn, toggleSelection } from '@/store/selection'
  import { onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import Actions from './Actions.svelte'
  import KeywordsEditor from './KeywordsEditor.svelte'
  import Preview from './Preview.svelte'
  import Selector from './Selector.svelte'

  export let link: Link = null

  let imageContainer: HTMLElement = null
  let isPreviewVisible: boolean = false
  let isEditorVisible: boolean = false
  let isImageValid: boolean = true
  let isImageLoaded: boolean = false

  onMount(() => {
    const cachedImage = getCachedImage(
      link.url,
      link.id,
      'h-full w-full object-cover select-none',
      () => {
        isImageLoaded = true
      },
      () => {
        isImageValid = false
      },
    )
    
    imageContainer?.appendChild(cachedImage)
  })

  // Friendly reminder: same function is located in Actions.svelte, but
  // I found it worthless to make it reusable. Ctrl+C, Ctrl+V ftw!
  const copyLink = async () => {
    copy(link.url)
    createToast({ 
      delay: 1500, 
      text: 'Link copied successfuly', 
      icon: 'link', 
      type: 'success',
    })
  }
</script>

<button 
  on:click={() => {
    if ($isSelectionModeOn) {
      toggleSelection(link)
    } else {
      copyLink()
    }
  }}
  in:scale={{ duration: 175 }} 
  class="group bg-primary-dark shadow-lg rounded-lg h-48 relative overflow-hidden cursor-pointer focus:outline-none focus:ring-8 focus:ring-accent focus:shadow-accent focus:shadow-2xl focus:-translate-y-3 transition-transform">
  
  {#if isImageValid}
    <div 
      bind:this={imageContainer}
      class="{isImageLoaded ? 'opacity-1' : 'opacity-0'} inset-0 absolute transition-opacity">
    </div>
  {:else}
    <p class="m-4 text-red-500 text-xl font-medium">Could not load the image :(</p>
  {/if}

  <div class="transition-opacity inset-0 absolute {$isSelectionModeOn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
    <Selector {link} />
  </div>

  <div class="transition-opacity {$isSelectionModeOn ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}">
    <Actions 
      {isImageValid}
      {link} 
      on:edit={ () => isEditorVisible = true }
      on:expand={ () => isPreviewVisible = true } />
  </div>

  <div class="pointer-events-none absolute inset-0 opacity-0 group-focus:opacity-100"></div>
</button>
  

<Popup bind:visible={ isPreviewVisible }>
  <Preview {link} />
</Popup>

<Popup bind:visible={ isEditorVisible }>
  <KeywordsEditor {link} />
</Popup>