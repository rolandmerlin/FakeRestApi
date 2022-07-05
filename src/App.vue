<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/product/list">Liste</router-link>
    <router-link to="/product/sell">Vignette</router-link>
    <router-link to="/product/sell2"></router-link>
  </nav>
  <div class="h-10 w-full"></div>
  <br>
  <router-view></router-view>
</template>
<script setup>
import {ref} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const products = ref([])

axios.get('/api/products').then(d => { store.commit('set_products',d.data) })

</script>
<style>
  nav {
    @apply h-10 leading-10 border-b-2 border-solid border-gray-200 bg-gray-50 fixed top-0 w-full;
  }
  nav>* {
    @apply text-center inline-block w-36;
  }
  .router-link-active {
    @apply font-bold;
  }
</style>