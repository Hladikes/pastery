<script lang="ts">
  import type { Link } from '@/store/links'
  import { selections, toggleSelection } from '@/store/selection'

  export let link: Link = null

  $: selected = $selections.has(link)
</script>

<!-- TODO: change to button -->
<div 
  on:click|stopPropagation={() => toggleSelection(link)}
  class="inset-0 absolute border-4 rounded-lg {selected ? 'border-accent bg-accent bg-opacity-60' : 'border-transparent'}">

  <div class="class-too-long-to-handle {selected ? 'border-accent' : 'border-transparent'}">
    <i class="material-icons-round p-3 {selected ? 'text-accent' : 'text-gray-100/70'}">
      {selected ? 'check_box' : 'check_box_outline_blank'}
    </i>
  </div>

</div>

<style lang="postcss">
  .class-too-long-to-handle {
    @apply flex items-start w-16 h-16 bg-primary-dark absolute -top-1 -left-1 rounded-br-full shadow-xl border-b-4 border-r-4;
  }
</style>