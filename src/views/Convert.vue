<script setup>
import { watch, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/currency'
import { round, currenciesList } from '@/shared'
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
function convert(order) {
  const invertOrder = order === 'from' ? 'to' : 'from'
  const value = values.value[order]
  const convertTo = currency.value[`${currencies.value[order]}-${currencies.value[invertOrder]}`]
  const result = value * convertTo
  values.value[invertOrder] = round(result)
}
function changeCur(newCur, order) {
  const invertOrder = order === 'from' ? 'to' : 'from'
  const oldCur = currencies.value[order]

  if (newCur === currencies.value[invertOrder]) {
    currencies.value[invertOrder] = oldCur
  }
  currencies.value[order] = newCur

  convert(order)
}

onMounted(() => {
  if (loaded.value) {
    convert('from')
  } else {
    watch(loaded, () => convert('from'), { post: true, once: true })
  }
})
</script>

<template>
  <div v-if="loaded">
    <currency-input
      v-model:value="values.from"
      :currency="currencies.from"
      @update:value="convert('from')"
      @update:currency="changeCur($event, 'from')"
    />
    <br />
    <currency-input
      v-model:value="values.to"
      :currency="currencies.to"
      @update:value="convert('to')"
      @update:currency="changeCur($event, 'to')"
    />
  </div>
</template>
