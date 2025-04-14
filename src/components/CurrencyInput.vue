<script setup>
import { watch, ref } from 'vue'
import { isNumeric } from '@/shared'
import CurrencyDropdown from '@/components/CurrencyDropdown.vue'

const props = defineProps(['value', 'currency'])
const emit = defineEmits(['update:value', 'update:currency'])
const error = ref(null)

watch(
  () => props.value,
  (val) => {
    if (error.value && isNumeric(val)) {
      error.value = null
    }
  },
)

function verify(value) {
  error.value = null
  if (value.includes(',')) {
    value = value.replaceAll(',', '.')
  }
  if (!isNumeric(value)) {
    error.value = 'Неправильное число!'
  }

  emit('update:value', value)
}
</script>

<template>
  <div class="currency-input">
    <input :value="props.value" @input="verify($event.target.value)" />
    <div class="delimiter"></div>
    <CurrencyDropdown :currency="props.currency" @change="emit('update:currency', $event)" />
  </div>
  <p class="error">{{ error }}</p>
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
.error {
  color: red;
}
</style>
