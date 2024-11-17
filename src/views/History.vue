<template>
    <div class="history-container">
      <h1>Historique de navigation</h1>
      <ul>
        <li v-for="(entry, index) in history" :key="index">
          <strong>{{ entry.date }}</strong> - {{ entry.path }}
        </li>
      </ul>
      <button @click="clearHistory">Effacer l'historique</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // On stocke l'historique sous forme de tableau d'objets avec la date et le chemin
        history: []
      };
    },
    methods: {
      // Fonction pour effacer l'historique
      clearHistory() {
        this.history = [];
        localStorage.removeItem('history'); // On vide aussi localStorage
      }
    },
    created() {
      // Vérification si un historique est déjà stocké dans localStorage
      const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
      this.history = storedHistory;
  
      // Enregistrer les changements de route dans l'historique
      this.$router.afterEach((to, from) => {
        const entry = {
          path: to.fullPath,
          date: new Date().toLocaleString() // Date et heure du changement de route
        };
        this.history.push(entry);
        localStorage.setItem('history', JSON.stringify(this.history)); // Sauvegarder dans localStorage
      });
    }
  };
  </script>
  
  <style scoped>
  .history-container {
    padding: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #f44;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #e33;
  }
  </style>
  