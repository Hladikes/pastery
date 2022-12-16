<script lang="ts" context="module">
  import { writable, get } from 'svelte/store'

  // This writeable determines whether any popup is visible, or not.
  export const popupVisible = writable(false)

  // Hide currently visible popup on escape key press
  document.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (!get(popupVisible)) return
    if (ev.key !== 'Escape') return

    ev.stopImmediatePropagation()
    popupVisible.set(false)
  })
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let visible: boolean = false

  // Whenever the value of visible changes, it will be automatically 
  // saved to the popupVisible store
  $: popupVisible.set(visible)

  const dismiss = () => {
    visible = false
    dispatch('dismiss')
  }
  
  popupVisible.subscribe(visibility => {
    if (!visibility) dismiss()
  })
</script>

{#if visible}
  <div 
    transition:fade={{ duration: 175 }}
    on:click={ dismiss }
    class="bg-black/70 backdrop-blur-sm fixed inset-0 z-40 pointer-events-all"></div>

  <div 
    transition:fade={{ duration: 175 }}
    class="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <slot></slot>
  </div>
{/if}