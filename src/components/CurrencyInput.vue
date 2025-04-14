<script setup>
import CurrencyDropdown from '@/components/CurrencyDropdown.vue'

const value = defineModel('value')
const props = defineProps(['currency'])
const emit = defineEmits(['update:currency'])
</script>

<template>
  <div class="currency-input">
    <input v-model="value" type="number" @input="emit('update:value', $event.target.value)" />
    <div class="delimiter"></div>
    <CurrencyDropdown :currency="props.currency" @change="emit('update:currency', $event)" />
  </div>
</template>

<style lang="scss" scoped>
$border-color: #dadce0;

.currency-input {
  display: inline-flex;
  border: 1px solid $border-color;
  border-radius: 6px;
  padding: 3px 6px;

  input {
    border: none;
    border-radius: inherit;
    &:focus {
      outline: none;
    }
  }

  .delimiter {
    position: relative;
    top: 2px;
    width: 1px;
    height: 1em;
    background-color: $border-color;
  }
}
</style>
