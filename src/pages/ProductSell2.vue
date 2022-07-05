<template>
  <div class="border-2 border-solid border-gray-200 p-2 w-[75%] mx-auto">
    <div v-for="(p,i) in products" :key="'p'+i" class="grid grid-cols-[100px_100px_1fr_1fr] w-full mx-auto even:bg-gray-200">
        <img :src="p.image" alt="">
        <span class="p-2">{{p?.nom}}</span>
        <span class="p-2">{{p?.prix}}</span>
        <span class="p-2">{{p?.description}}</span>
        <span class="p-2">{{p?.image}}</span>
    </div>    
  </div>
</template>
<script setup>
import {computed} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const products = computed(()=>store.getters.products)
</script>
<style>

</style>