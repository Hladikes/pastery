<script lang="ts">
  import { toggleSelection, selections } from '@/store/selection'
  import type { Link } from '@/store/links'

  export let link: Link = null

  $: selected = $selections.has(link)
</script>

<div 
  on:click={() => toggleSelection(link)}
  class="inset-0 absolute border-4 rounded-xl {selected ? 'border-accent bg-accent bg-opacity-50' : 'border-transparent'}">

  <div class="class-too-long-to-handle {selected ? 'border-accent' : 'border-transparent'}">
    <i class="material-icons-round mt-3 ml-3 {selected ? 'text-accent' : 'text-gray-200 text-opacity-50'}">
      {selected ? 'check_box' : 'check_box_outline_blank'}
    </i>
  </div>

</div>

<style lang="postcss">
  .class-too-long-to-handle {
    @apply w-16 h-16 bg-primary-dark absolute -top-1 -left-1 rounded-br-full shadow-xl border-b-4 border-r-4;
  }
</style>