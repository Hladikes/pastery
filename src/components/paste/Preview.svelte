<script lang="ts">
  import type { Link } from '@/store/links'

  export let link: Link = null
</script>

<img 
  src={link.url} 
  alt={link.url} 
  style="max-height: 80vh; min-height: 30vh;"
  class="pointer-events-auto select-none">