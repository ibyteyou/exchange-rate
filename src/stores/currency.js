import { ref } from 'vue'
import { defineStore } from 'pinia'
import { currenciesList } from '@/shared'

export const useCurrencyStore = defineStore('currency', () => {
  const defaultCurrency = ref(currenciesList[0])
  const loaded = ref(false)
  const currency = ref({})
  function setDefaultCurrency(value) {
    defaultCurrency.value = value
  }
  function setCurrency(value) {
    currency.value = value
    if (!loaded.value) {
      loaded.value = true
    }
  }

  return { defaultCurrency, loaded, currency, setDefaultCurrency, setCurrency }
})
