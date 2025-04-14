<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ApiCurrency } from '@/shared'
import { useCurrencyStore } from '@/stores/currency'
import CurrencyDropdown from '@/components/CurrencyDropdown.vue'

const currencyStore = useCurrencyStore()
const { defaultCurrency } = storeToRefs(currencyStore)

fetch(ApiCurrency).then(async (response) => {
  const result = await response.json()
  currencyStore.setCurrency(result)
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/convert">Конвертация</RouterLink>
        <CurrencyDropdown :currency="defaultCurrency" @change="currencyStore.setDefaultCurrency" />
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  text-align: center;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-bottom: 1em;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
