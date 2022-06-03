<button 
  on:click={ exportLinks }
  class="fixed top-5 right-5 select-none py-3 px-4 text-gray-300 bg-primary rounded-lg shadow-sm shadow-primary flex items-center space-x-2  hover:text-accent">
  <span class="font-bold text-xl">Export</span>
  <i class="material-icons-round">file_upload</i>
</button>

<script lang="ts">
  import { createToast } from '@/plugins/toast/Toast.svelte'
  import { links } from '@/store/links'
  import { copy } from '@/plugins/clipboard'

  const exportLinks = () => {
    createToast({ 
      text: 'Links exported to the clipboard', 
      type: 'success', 
      icon: 'content_copy',
    })

    const linksToExport = $links.map(({ url, keywords }) => ({
      url, 
      keywords,
    }))

    copy(JSON.stringify(linksToExport))
  }
</script>