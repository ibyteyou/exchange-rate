<script setup>
import { ref } from 'vue'
const currencies = ref(['rub', 'eur', 'usd'])
const props = defineProps(['currency'])
const emit = defineEmits(['change'])
</script>

<template>
  <select :value="props.currency" @change="emit('change', $event.target.value)">
    <option v-for="opt in currencies" :key="opt" :value="opt">
      {{ opt.toUpperCase() }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
select {
  border: none;
  padding: 0 6px;

  &:focus {
    outline: none;
  }
}
</style>
