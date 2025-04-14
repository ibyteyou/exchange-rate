<script setup>
import { watch, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/currency'
import { round, isNumeric, currenciesList } from '@/shared'
import CurrencyInput from '@/components/CurrencyInput.vue'

const currencyStore = useCurrencyStore()
const { defaultCurrency, currency, loaded } = storeToRefs(currencyStore)
const currencies = ref({
  from: currenciesList.filter((c) => c !== defaultCurrency.value)[0],
  to: defaultCurrency.value,
})
const values = ref({
  from: 1,
  to: 0,
})
function convert(value, order) {
  const invertOrder = order === 'from' ? 'to' : 'from'
  const convertTo = currency.value[`${currencies.value[order]}-${currencies.value[invertOrder]}`]
  const result = round(value * convertTo)

  values.value[order] = value

  if (isNumeric(result)) {
    values.value[invertOrder] = result
  }
}
function changeCur(newCur, order) {
  const invertOrder = order === 'from' ? 'to' : 'from'
  const oldCur = currencies.value[order]

  if (newCur === currencies.value[invertOrder]) {
    currencies.value[invertOrder] = oldCur
  }
  currencies.value[order] = newCur

  convert(values.value[invertOrder], order)
}

onMounted(() => {
  if (loaded.value) {
    convert(values.value.from, 'from')
  } else {
    watch(loaded, () => convert(values.value.from, 'from'), { once: true })
  }
})
</script>

<template>
  <div v-if="loaded">
    <currency-input
      :value="values.from"
      :currency="currencies.from"
      @update:value="convert($event, 'from')"
      @update:currency="changeCur($event, 'from')"
    />
    <br />
    <currency-input
      :value="values.to"
      :currency="currencies.to"
      @update:value="convert($event, 'to')"
      @update:currency="changeCur($event, 'to')"
    />
  </div>
</template>
