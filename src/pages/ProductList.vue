<template>
  <div class="overlay" v-if="editI">
    <div class="overlay_wrap">
      <div class="text-2xl text-center">Edition de l'article</div>
      <br />
      <form>
        <label for="name">Nom</label>
        <input type="text" name="name" v-model="editI.nom" />
        <label for="prix">Prix</label>
        <input type="text" name="prix" v-model="editI.prix" />
        <label for="description">Description</label>
        <input type="text" name="description" v-model="editI.description" />
        <label for="image">URL de l'image</label>
        <input type="text" name="image" v-model="editI.image" />
      </form>
      <br />
      <div class="text-center">
        <button v-on:click="EditSaveItem()">Sauvegarder</button>
        &nbsp; &nbsp;
        <button v-on:click="editI=false">Annuler</button>
      </div>
    </div>
  </div>
  <div class="border-2 border-solid border-gray-200 p-2 w-[75%] mx-auto">
    <div class="grid grid-cols-[100px_100px_1fr_1fr_1fr] w-full mx-auto">
      <b class="p-2">Nom</b>
      <b class="p-2">Prix</b>
      <b class="p-2">Description</b>
      <b class="p-2">Image</b>
      <u v-on:click="newItem()" class="text-center cursor-pointer">Créer un objet</u>
    </div>
    <div
      v-for="(p, i) in products" :key="'p' + i" class="grid grid-cols-[100px_100px_1fr_1fr_1fr] w-full mx-auto even:bg-gray-200">
      <span class="p-2">{{ p?.nom }}</span>
      <span class="p-2">{{ p?.prix }} €</span>
      <span class="p-2">{{ p?.description }}</span>
      <span class="p-2">{{ p?.image }}</span>
      <span class="text-center p-2">
        <u v-on:click="EditItem(p)" class="cursor-pointer">Editer</u>
        &nbsp; &nbsp;
        <u v-on:click="SupprItem(p.id)" class="cursor-pointer">Supprimer</u>
      </span>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters.products);

/** Création de nouveau produit */
const newI = ref(false);
function newItem() {
  newI.value = {
    nom: "",
    prix: "",
    description: "",
    image: "",
  };
}
function newSaveItem() {
  axios.post("/api/products", newI.value).then((d) => {
    store.commit("new_products", d.data);
  }).catch(e=>{ alert(e) })
}

/** Edition de produit existant */
const editI = ref(false);
function EditItem(item) {
  editI.value = item;
}
function EditSaveItem() {
  axios.put("/api/products", editI.value).then((d) => {
    store.commit("update_products", d.data);
    editI.value = false;
  }).catch(e=>{ alert(e) })
}

/** Supprimer un produit */
function SupprItem(id) {
  let product = store.getters.products_id(id)
  if (window.confirm('Voulez-vous supprimer l\'article "'+product.nom+'"'))
    axios.delete("/api/products/" + id).then((d) => {
      store.commit('delete_products',product.id)
    }).catch(e=>{ alert(e) })
}
</script>
<style>
.overlay {
  @apply fixed left-0 right-0 top-0 bottom-0 bg-gray-900/50;
}
.overlay_wrap {
  @apply fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-100 p-10 min-w-fit;
}
form {
  @apply grid grid-cols-[150px_1fr] gap-2;
  width: 480px;
}
</style>
