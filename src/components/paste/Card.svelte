<script lang="ts">
  import { onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import { getCachedImage } from '@/plugins/imageCache'
  import { isSelectionModeOn } from '@/store/selection'
  import Popup from '@/plugins/popup/Popup.svelte'
  import Actions from './Actions.svelte'
  import Preview from './Preview.svelte'
  import KeywordsEditor from './KeywordsEditor.svelte'
  import Selector from './Selector.svelte'
  import type { Link } from '@/store/links'

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
</script>

<div 
  in:scale={{ duration: 175 }} 
  class="bg-primary-dark shadow-lg rounded-lg h-48 relative overflow-hidden cursor-pointer">
  
  {#if isImageValid}
    <div 
      bind:this={imageContainer}
      class="{isImageLoaded ? 'opacity-1' : 'opacity-0'} h-full w-full absolute transition-opacity">
    </div>
  {:else}
    <p class="m-4 text-red-500 text-xl font-medium">Could not load the image :(</p>
  {/if}

  <div 
    class="transition-opacity {$isSelectionModeOn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}">
    <Selector {link} />
  </div>

  <div 
    class="transition-opacity {$isSelectionModeOn ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}">
    <Actions 
      {isImageValid}
      {link} 
      on:edit={ () => isEditorVisible = true }
      on:expand={ () => isPreviewVisible = true } />
  </div>
</div>
  

<Popup bind:visible={ isPreviewVisible }>
  <Preview {link} />
</Popup>

<Popup bind:visible={ isEditorVisible }>
  <KeywordsEditor {link} />
</Popup>