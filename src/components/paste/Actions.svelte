<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { copy } from '@/plugins/clipboard'
  import { createToast } from '@/plugins/toast/Toast.svelte'
  import { handlePressStateChanges } from '@/plugins/touchable'
  import { deleteLink } from '@/store/links'
  import { createConfirm } from '@/plugins/confirm/Confirm.svelte'
  import type { Link } from '@/store/links'
  
  export let link: Link = null
  export let isImageValid: boolean = true

  let actionsEl: HTMLElement = null
  let areActionsVisible: boolean = false

  const dispatch = createEventDispatcher()

  $: gridClassNames = isImageValid ? 'grid-cols-2 grid-rows-2' : 'grid-cols-1 grid-rows-1'

  onMount(() => {
    return handlePressStateChanges(actionsEl, (state) => {
      areActionsVisible = state
    })
  })

  // Copy link to the clipboard
  const copyLink = async () => {
    copy(link.url)
    createToast({ 
      delay: 1500, 
      text: 'Link copied successfuly', 
      icon: 'link', 
      type: 'success',
    })
  }

  // Here is an example, of how can we hook to any confirmation
  const removeLink = () => {
    if (!isImageValid) {
      return deleteLink(link.id)
    }

    createConfirm({ title: 'Delete link', text: 'Are you sure you want to delete this paste ?', confirmLabel: 'Yes', cancelLabel: 'No' })
      .then((yes) => {
        if (!yes) return

        deleteLink(link.id)
        createToast({
          text: 'Paste was deleted', 
          icon: 'delete', 
          type: 'success',
        })
      })
  }
</script>

<div 
  bind:this={actionsEl}
  class="grid {gridClassNames} inset-0 absolute {!areActionsVisible ? 'opacity-[0.0001]' : ''} bg-black bg-opacity-60 transition-all">
  {#if areActionsVisible}
    {#if isImageValid}
      <button 
        class="select-none text-white hover:text-yellow-400 focus:outline-none"
        on:click|stopPropagation={copyLink}>
        <i class="material-icons-round !text-5xl">link</i>
      </button>
      <button 
        class="select-none text-white hover:text-green-500 focus:outline-none"
        on:click|stopPropagation={() => dispatch('edit')}>
        <i class="material-icons-round !text-5xl">edit</i>
      </button>
      <button 
        class="select-none text-white hover:text-blue-400 focus:outline-none"
        on:click|stopPropagation={() => dispatch('expand')}>
        <i class="material-icons-round !text-5xl">launch</i>
      </button>
    {/if}
    <button 
      class="select-none text-white hover:text-red-500 focus:outline-none"
      on:click|stopPropagation={removeLink}>
      <i class="material-icons-round !text-5xl">delete</i>
    </button>
  {/if}
</div>