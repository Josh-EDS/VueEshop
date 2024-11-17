<template>
  
  <div class="product-detail" v-if="product">
    <div class="product-image">
      <img :src="product.image_url" alt="Image du produit" />
    </div>
    <div class="product-info">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ product.prix }} €</p>
      <p class="product-note">Note: {{ product.note }} / 5</p>
    </div>
    <button @click="addToCart(product)" class="add-to-cart-btn">
      Ajouter au panier
    </button>
  </div>
  <div v-else class="loading">Chargement...</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      isLoading: true,
      error: null,
    };
  },
  created() {
    this.fetchProductDetail();
  },
  methods: {
    fetchProductDetail() {
      const productId = this.$route.params.id;
      axios
        .get(`http://localhost:3000/product/${productId}`, {
          headers: {
            role: "client",
          },
        })
        .then((response) => {
          this.product = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du produit:", error);
          this.error = "Erreur lors du chargement des détails du produit";
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
img {
  margin-left: 100px;
  margin-top: 100px;
  height: 500px;
}

.product-info {
  margin-left: 500px;
}

button {
  margin-left: 500px;
}
</style>