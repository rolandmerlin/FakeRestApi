import { createStore } from 'vuex'

const store = createStore({
    state:{
        products:[]
    },
    getters:{
        products:(state)=>state.products,
        products_id:(state)=>(id)=>state.products.filter(p => p.id)[0],
    },
    mutations:{
        set_products:(state,p)=>{ state.products = p },
        update_products:(state,p)=>{
            for (const k in state.products) if (state.products[k].id == p.id) state.products[k] = p
        },
        new_products:(state,p)=>{ state.products.push(p) },
        delete_products:(state,id)=>{
            state.products = state.products.filter(p => p.id!=id)
        }
    }
})

export default store