<script lang="ts">
  import { fly, scale } from 'svelte/transition'
  import { isSelectionModeOn, selectAllLinks, selections, toggleSelection, unselectAllLinks } from '@/store/selection'
  import { links, deleteAllLinks, deleteLink } from '@/store/links'
  import { createToast } from '@/plugins/toast/Toast.svelte'
  import { copy } from '@/plugins/clipboard'
  import { createConfirm } from '@/plugins/confirm/Confirm.svelte'

  $: areAllLinksSelected = $links.length === $selections.size

  const manageAllSelections = () => {
    if (areAllLinksSelected) {
      unselectAllLinks()
    } else {
      selectAllLinks()
    }
  }
  
  const exportLinks = () => {
    createToast({ 
      text: 'Links exported to the clipboard', 
      type: 'success', 
      icon: 'content_copy',
    })

    const linksToExport = $links
      .filter(link => $selections.has(link))
      .map(({ url, keywords }) => ({
        url, 
        keywords,
      }))

    copy(JSON.stringify(linksToExport))
  }
  
  const deleteLinks = async () => {
    const yes = await createConfirm({
      cancelLabel: 'No',
      confirmLabel: 'Yes',
      title: 'Delete selected links',
      text: 'Are you sure you want to delete all these links ? This process is irreversible.'
    })
    
    if (!yes) return

    if (areAllLinksSelected) {
      unselectAllLinks()
      deleteAllLinks()
      isSelectionModeOn.set(false)
    } else {
      $selections.forEach(link => {
        toggleSelection(link)
        deleteLink(link.id)
      })
    }
  }

  const cancel = () => {
    unselectAllLinks()
    isSelectionModeOn.set(false)
  }
</script>

{#if $isSelectionModeOn}
  <div 
    in:fly={{ x: 200 }}
    out:fly={{ y: -200 }}
    class="fixed top-5 right-5 p-4 flex flex-col bg-primary-dark shadow-xl w-96 rounded-xl">
    <h1 class="text-white text-opacity-90 text-2xl font-semibold select-none">
      Selected <span class="text-accent">{$selections.size}</span> items
    </h1>
    <div class="flex-1 flex flex-col my-2">
      <button 
        on:click={ manageAllSelections }
        class="p-2 flex items-center space-x-2 select-none rounded-lg text-white text-opacity-90 hover:text-accent hover:bg-accent hover:bg-opacity-10">
        <i class="material-icons-round">
          {areAllLinksSelected ? 'check_box' : 'check_box_outline_blank'}
        </i>
        <span class="font-bold">
          {areAllLinksSelected ? 'Unselect all' : 'Select all'}
        </span>
      </button>

      {#if $selections.size !== 0}
        <button 
          on:click={exportLinks}
          class="p-2 flex items-center space-x-2 select-none rounded-lg text-white text-opacity-90 hover:text-accent hover:bg-accent hover:bg-opacity-10">
          <i class="material-icons-round">file_upload</i>
          <span class="font-bold">Export selected</span>
        </button>
        <button 
          on:click={deleteLinks}
          class="p-2 flex items-center space-x-2 select-none rounded-lg text-white text-opacity-90 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10">
          <i class="material-icons-round">delete</i>
          <span class="font-bold">Delete selected</span>
        </button>
      {/if}
    </div>
    <button 
      on:click={cancel}
      class="py-1 px-3 select-none rounded-lg ml-auto text-lg font-bold text-red-400 hover:bg-red-500 hover:bg-opacity-20">Cancel</button>
  </div>
{:else}
  {#if $links.length > 0}
    <button 
      transition:scale
      on:click={() => isSelectionModeOn.set(true)}
      class="fixed top-5 right-5 select-none py-3 px-4 text-gray-300 bg-primary rounded-lg shadow-sm shadow-primary flex items-center space-x-2  hover:text-accent">
      <i class="material-icons-round">format_list_bulleted</i>
      <span class="font-bold text-xl">Edit</span>
    </button>
  {/if}
{/if}
