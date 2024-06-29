<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  tooltip: string
  checked?: boolean
}>(), {
  checked: true
})

const emits = defineEmits(['checking'])

const checked = ref(props.checked)

function checking() {
  emits('checking', checked.value)
  checked.value = !checked.value
}
</script>

<template>
  <div class="tooltip inline-flex cursor-pointer items-center rounded-full" :class="{ 'opacity-50': !checked }" :data-tip="tooltip" @click="checking">
    <slot />
  </div>
</template>
