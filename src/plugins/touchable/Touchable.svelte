<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { handlePressStateChanges } from '.'

  export let classNames: string = ''
  export let baseClassNames: string = ''
  export let activeClassNames: string = ''

  let element: HTMLElement = null
  let pressed: boolean = false

  const dispatch = createEventDispatcher()
  const handleClick = () => dispatch('click')

  onMount(() => handlePressStateChanges(element, (state: boolean) => {
    pressed = state
  })
</script>

<div 
  bind:this={element}
  on:click={handleClick}
  class={ classNames + ' ' + (pressed ? activeClassNames : baseClassNames) }>
  <slot></slot>
</div>

<style>
  div {
    -webkit-tap-highlight-color: transparent !important;
  }
</style>