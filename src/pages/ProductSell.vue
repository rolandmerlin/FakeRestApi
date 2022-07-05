<template>
    <div class="border-l-2 border-r-2 border-solid border-gray-200 p-2 w-[75%] mx-auto">
        <template v-for="(p,i) in products" :key="'p'+i">
            <div class="grid grid-cols-[1fr_1fr] mx-auto h-[250px] w-[750px] m-4 bg-gray-200 p-4">
                <img :src="p.image+'?t='+Math.floor(Math.random()*Math.pow(10,8))" class="product--image h-full" alt="">
                <span class="p-4 relative h-full">
                    <b class="text-xl">{{p.nom}}</b><br>
                    <hr>
                    <br>
                    <p>{{p?.description}}</p>
                    <br>
                    <strong class="absolute bottom-4 right-4 text-red-800 text-2xl">{{p?.prix}} €</strong>
                </span>
            </div>
        </template>
    </div>
</template>
<script setup>
import {computed} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const products = computed(()=>store.getters.products)
</script>
<style>
    .product--image {
        @apply object-cover h-full;
    }
</style>