<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  import type { Writable } from 'svelte/store'
  import type { ConfirmOptions } from './types'

  const confirmVisible: Writable<boolean> = writable(false)

  let title: string = ''
  let text: string = ''
  let confirmLabel: string = ''
  let cancelLabel: string = ''

  let resolve = null
  let promise = null

  export function createConfirm(options: ConfirmOptions): Promise<boolean> {
    title = options.title
    text = options.text
    confirmLabel = options.confirmLabel
    cancelLabel = options.cancelLabel

    confirmVisible.set(true)

    // Ugly trick which by exposing resolve function of this promise,
    // allows us to hook on confirmation (yes, no and away click)
    promise = new Promise((res) => {
      resolve = res
    })

    return promise
  }
</script>

<script lang="ts">
  import Popup from '@/plugins/popup/Popup.svelte'
  import { onMount } from 'svelte'
  
  let visible: boolean = false

  // We need to update internal visible state, based on 
  // confirmVisible state
  onMount(() => {
    confirmVisible.subscribe((v: boolean) => {
      visible = v
    })
  })

  const resolveConfirmationState = (state: boolean) => {
    if (resolve?.constructor === Function) {
      resolve(state)
    }

    confirmVisible.set(false)
  }
</script>

<Popup 
  bind:visible
  on:dismiss={ () => resolveConfirmationState(false) }>
  <div class="bg-primary px-6 py-6 w-96 rounded-2xl shadow-lg space-y-4 pointer-events-auto">
    {#if title}
      <h1 class="text-white text-4xl font-medium">{title}</h1>
    {/if}

    {#if text}
      <p class="text-white text-xl">{text}</p>
    {/if}
    
    <div class="flex justify-end gap-2">
      {#if cancelLabel}
        <button 
          on:click={ () => resolveConfirmationState(false) }
          class="btn  text-white hover:bg-white focus:ring-white hover:text-primary-dark">{cancelLabel}</button>
      {/if}
      
      <!-- svelte-ignore a11y-autofocus -->
      <button 
        autofocus
        on:click={ () => resolveConfirmationState(true) }
        class="btn  text-accent hover:bg-accent focus:ring-accent hover:text-primary">{confirmLabel}</button>
    </div>
  </div>
</Popup>

<style lang="postcss">
  .btn {
    @apply text-xl font-bold py-2 px-6 rounded-lg transition-all focus:outline-none focus:ring-4
  }
</style>