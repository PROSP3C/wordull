<script lang="ts" setup>
  import type { KeyState } from '@/enums'

  const props = defineProps<{
    letter: string
    keyState: KeyState
  }>()
</script>

<template>
  <div
    class="KeyboardKey"
    :class="props.keyState.toLowerCase()"
  >
    <template v-if="props.letter === 'Backspace'">
      <q-icon name="backspace" />
    </template>

    <template v-else>
      {{ props.letter }}
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .KeyboardKey {
    width: auto;
    height: 3.5rem;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #333;
    border-radius: 4px;
    user-select: none;

    &.default {
      background-color: #888;
    }
    &.absent {
      background-color: #333;
    }
    &.correct {
      background-color: #15b815;
    }
  }
</style>
