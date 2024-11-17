<template>
  <div class="product-page">
    <header class="site-header">
      <a href="/">
        <div class="logo">
          <img src="../lecoinbon.png" alt="Logo de l'E-shop" class="logo-image" />
        </div>
      </a>
      <nav class="header-nav">
        <button @click="goToCart" class="cart-btn">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">Panier ({{ cartItemCount }})</span>
        </button>
        <router-link to="/login" class="login-btn">Login</router-link>
      </nav>
    </header>

    <h1 class="page-title">Nos Produits</h1>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id">
        <img :src="product.image_url" alt="Image du produit" class="product-image" />
        <div class="product-details">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-prix">
            <p class="prix">{{ product.prix }} €</p>
            <span class="rating">Note: {{ product.note }}/5</span>
            <span class="id">ID: {{ product.id }}</span>
          </div>
          <button @click="addToCart(product)" class="add-to-cart-btn">Ajouter au panier</button>
        </div>
      </div>
    </div>

    <div v-if="showCart" class="cart-modal">
      <div class="cart-modal-content">
        <h2>Votre Panier</h2>
        <div v-if="cartItems.length > 0">
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              <div class="cart-item">
                <img :src="item.image_url" alt="Produit" class="cart-item-image" />
                <span class="cart-item-name">{{ item.name }}</span>
                <span class="cart-item-quantity">Quantité : {{ item.quantity }}</span>
                <span class="cart-item-prix">{{ (item.prix * item.quantity).toFixed(2) }} €</span>
                <button @click="removeFromCart(item.id)" class="remove-item-btn">Supprimer</button>
              </div>
            </li>
          </ul>
          <div class="cart-total">
            <p>Total : {{ totalprix }} €</p>
          </div>
        </div>
        <div v-else>
          <p>Votre panier est vide.</p>
        </div>
        <button @click="closeCart" class="close-cart-btn">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      cartItems: [],
      showCart: false
    };
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalprix() {
      return this.cartItems.reduce((total, item) => total + item.prix * item.quantity, 0).toFixed(2);
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/product', {
          headers: {
            'role': 'client'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur de récupération des produits');
        }

        this.products = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    },
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity += 1;
        } else {
          alert('La quantité maximale pour cet article est de 5');
        }
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    },
    goToCart() {
      this.showCart = true;
    },
    closeCart() {
      this.showCart = false;
    }
  }
};
</script>
