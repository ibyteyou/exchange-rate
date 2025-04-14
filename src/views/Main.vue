<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/currency'
import { round, currenciesList } from '@/shared'

const currencyStore = useCurrencyStore()
const { defaultCurrency, currency, loaded } = storeToRefs(currencyStore)
const allowedCurrencies = computed(() => currenciesList.filter((c) => c !== defaultCurrency.value))
</script>

<template>
  <div v-if="loaded">
    <p v-for="c in allowedCurrencies" :key="c">
      1 {{ c.toUpperCase() }} = {{ round(currency[`${c}-${defaultCurrency}`]) }}
      {{ defaultCurrency.toUpperCase() }}
    </p>
  </div>
</template>
