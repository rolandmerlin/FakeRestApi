import { createRouter, createWebHistory } from "vue-router"

import PageIndex from './pages/index.vue'
import PageProductList from './pages/ProductList.vue'
import PageProductSell from './pages/ProductSell.vue'
import PageProductSell2 from './pages/ProductSell2.vue'

const routes = [
    {
        path:'/',
        component:PageIndex
    },
    {
        path:'/product/list',
        component:PageProductList
    },
    {
        path:'/product/sell',
        component:PageProductSell
    },
    {
        path:'/product/sell2',
        component:PageProductSell2
    }
]

const router = createRouter({
    routes,
    history:createWebHistory()
})


export default router