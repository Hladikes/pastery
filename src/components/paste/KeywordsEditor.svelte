<script lang="ts">
  import { onMount } from 'svelte'
  import { updateKeywords } from '@/store/links'
  import { createToast } from '@/plugins/toast/Toast.svelte'
  import type { Link } from '@/store/links'

  export let link: Link = null

  let keywordsTextarea: HTMLElement = null
  let editTimeoutId: any = -1

  onMount(() => {
    keywordsTextarea?.focus()
  })

  // Debounced keywords edit
  const editKeywords = (ev) => {
    clearInterval(editTimeoutId)
    editTimeoutId = setTimeout(() => {
      updateKeywords(link.id, ev.target.value)
      createToast({
        text: 'Keywords were updated',
      })
    }, 500)
  }
</script>

<div class="bg-primary flex flex-col shadow-xl p-6 h-2/3 w-2/3 lg:w-1/3  rounded-lg pointer-events pointer-events-auto">
  <h1 class="text-white text-4xl font-semibold mb-5 select-none">Keywords</h1>
  <h3 class="text-white text-opacity-70 text-lg mb-5 select-none">
    These keywords will help you later with finding the perfect reaction for your conversation
  </h3>
  <textarea 
    bind:this={keywordsTextarea}
    value={link.keywords}
    on:input={editKeywords}
    placeholder="angery danger magic duck ..."
    class="bg-secondary rounded-lg bg-opacity-10 text-white shadow-lg border border-black border-opacity-20 resize-none focus:outline-none p-3 text-3xl flex-1"></textarea>
</div>