<script lang="ts" setup>
  import KeyboardKey from '@/components/KeyboardKey.vue'
  import type { KeyState } from '@/enums'

  const props = defineProps<{
    keys: { letter: string; keyState: KeyState }[][]
  }>()
</script>

<template>
  <div class="KeyboardWrapper">
    <div
      class="KeyboardWrapper-row"
      v-for="(row, rowIndex) in props.keys"
      :key="rowIndex"
    >
      <KeyboardKey
        v-for="key in row"
        :key="key.letter"
        :letter="key.letter"
        :key-state="key.keyState"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .KeyboardWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    &-row {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
</style>
