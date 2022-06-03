<script lang="ts" context="module">
  import type { ToastOptions } from './types'
  import { writable } from 'svelte/store'
  import type { Writable } from 'svelte/store'

  const toastOptions: Writable<ToastOptions> = writable({})
  const toastVisible = writable(false)

  let intervalId: any = -1

  export const createToast = (options: ToastOptions): void => {
    toastVisible.set(true)
    toastOptions.set({
      type: options.type || 'info',
      icon: options.icon || 'info',
      text: options.text || 'No text',
    })

    clearTimeout(intervalId)
    
    intervalId = setTimeout(() => {
      toastVisible.set(false)
    }, options.delay || 1000)
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'

  let type = ''
  let icon = ''
  let text = ''

  onMount(() => {
    return toastOptions.subscribe((options: ToastOptions) => {
      type = options.type
      icon = options.icon
      text = options.text
    })
  })

  const backgroundColors = {
    info: 'bg-blue-400',
    danger: 'bg-red-500',
    warning: 'bg-yellow-400',
    success: 'bg-green-400',
  }

  const textColors = {
    info: 'text-blue-900',
    danger: 'text-black text-opacity-70',
    warning: 'text-yellow-900',
    success: 'text-green-900',
  }

  $: backgroundColor = backgroundColors[type] || backgroundColors['info']
  $: textColor = textColors[type] || textColors['info']  
</script>

<div class="fixed top-10 left-10 z-50">
  {#if $toastVisible}
    <div 
      transition:fly={{ y: -200, duration: 300 }}
      class="{backgroundColor} {textColor} w-96 mx-auto py-4 px-5 flex items-center space-x-4 rounded-2xl shadow-xl">
      <i class="material-icons-round !m-0 white select-none">{icon}</i>
      <span class="font-bold text-xl select-none">{text}</span>
    </div>
  {/if}
</div>