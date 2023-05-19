<template>
  <div :style="customStyle">{{rate}}</div>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  value: Number,
  theme: { 
    type: String,
    default: 'gray1'
  }
})
const rate = computed(() => {
  return '★★★★★☆☆☆☆☆'.slice(5-props.value, 10-props.value)
})
const themeMap = new Map([
  ['gray1', '#333'],
  ['gray2', '#666'],
  ['gray3', '#999'],
  ['pink', 'pink']
])
const customStyle = computed(() => {
  return {
    color: themeMap.get(props.theme) || ''
  }
})
</script>