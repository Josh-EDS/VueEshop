<template>
  <header class="site-header">
  <a href="/">
    <div class="logo">
      <span style="color: white;font-size: large;">Lecoinbon | Page D'Administration</span> 
      <link rel="stylesheet" href="http://www.lecoinbon.fr.000.pe/_next/static/css/19842df133a4d6ba.css" data-n-g="">
    </div>
  </a>
  <nav class="header-nav">
    <router-link to="/register" class="login-btn">Register</router-link>
    <router-link to="/login" class="login-btn">Login</router-link>
  </nav>
</header>
<div class="container">
  <p style="padding: 0.5cm"></p>
    <h1>Administration</h1>

    <div class="form-section">
      <div>
        <h2>Créer un nouveau produit</h2>
        <form @submit.prevent="addProduct">
          <input v-model="product.id" type="number" placeholder="ID du produit" required />
          <input v-model="product.name" type="text" placeholder="Nom du produit" required />
          <input v-model="product.description" type="text" placeholder="Description" />
          <input v-model="product.prix" type="number" placeholder="Prix" step="0.01" required />
          <input v-model="product.note" type="number" placeholder="Note" required />
          <input v-model="product.image_url" type="text" placeholder="URL de l'image" required />
          <input v-model="product.category_id" type="number" placeholder="ID de catégorie" required />
          <button type="submit">Ajouter le produit</button>
        </form>
      </div>

      <div>
        <h2>Créer une nouvelle catégorie</h2>
        <form @submit.prevent="addCategory">
          <input v-model="category.id" type="number" placeholder="ID de la catégorie" required />
          <input v-model="category.name" type="text" placeholder="Nom de la catégorie" required />
          <button type="submit">Ajouter la catégorie</button>
        </form>
      </div>

      <div>
        <h2>Créer un nouvel utilisateur</h2>
        <form @submit.prevent="addUser">
          <input v-model="user.firstname" type="text" placeholder="Prénom" required />
          <input v-model="user.lastname" type="text" placeholder="Nom" required />
          <input v-model="user.email" type="email" placeholder="Email" required />
          <input v-model="user.password" type="password" placeholder="Mot de passe" required />
          <select v-model="user.role" required>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <button type="submit">Ajouter l'utilisateur</button>
        </form>
      </div>
    </div>

    <h2>Liste des produits</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Prix</th>
          <th>Note</th>
          <th>Image</th>
          <th>ID de catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.prix }}</td>
          <td>{{ product.note }}</td>
          <td><img :src="product.image_url" alt="product image" width="100" /></td>
          <td>{{ product.category_id }}</td>
          <td><button @click="deleteItem('product', product.id)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>

    <h2>Liste des catégories</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td><button @click="deleteItem('category', category.id)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>

    <h2>Liste des utilisateurs</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td><button @click="deleteUser(user.email)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Admin",
  setup() {
    const products = ref([]);
    const categories = ref([]);
    const users = ref([]);

    const product = ref({
      id: "",
      name: "",
      description: "",
      prix: "",
      note: "",
      image_url: "",
      category_id: "",
    });

    const category = ref({
      id: "",
      name: "",
    });

    const user = ref({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "User",
    });

    const fetchData = async (endpoint, tableRef) => {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        headers: { role: "admin" },
      });
      const data = await response.json();
      tableRef.value = data;
    };

    const deleteItem = async (endpoint, id) => {
      await fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: "DELETE",
        headers: { role: "admin" },
      });
      fetchData(endpoint, endpoint === "product" ? products : endpoint === "category" ? categories : users);
    };

    const deleteUser = async (email) => {
      await fetch(`http://localhost:3000/user/${email}`, {
        method: "DELETE",
        headers: { role: "admin" },
      });
      fetchData("user", users);
    };

    const addProduct = async () => {
      await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "admin",
        },
        body: JSON.stringify(product.value),
      });
      fetchData("product", products);
      Object.assign(product.value, {
        id: "",
        name: "",
        description: "",
        prix: "",
        note: "",
        image_url: "",
        category_id: "",
      });
    };

    const addCategory = async () => {
      await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "admin",
        },
        body: JSON.stringify(category.value),
      });
      fetchData("category", categories);
      Object.assign(category.value, {
        id: "",
        name: "",
      });
    };

    const addUser = async () => {
      await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          role: "admin",
        },
        body: JSON.stringify(user.value),
      });
      fetchData("user", users);
      Object.assign(user.value, {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "User",
      });
    };

    onMounted(() => {
      fetchData("product", products);
      fetchData("category", categories);
      fetchData("user", users);
    });

    return {
      products,
      categories,
      users,
      product,
      category,
      user,
      addProduct,
      addCategory,
      addUser,
      deleteItem,
      deleteUser,
    };
  },
};
</script>

<style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #f4f7fc;
            color: #333;
            padding: 20px;
            font-size: 16px;
        }

        h1, h2 {
            color: #2c3e50;
            margin-bottom: 10px;
        }

        h1 {
            font-size: 2.5em;
            text-align: center;
            margin-bottom: 40px;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
        }

        form input,
        form select,
        form button {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1em;
        }

        form button {
            background-color: #3498db;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        form button:hover {
            background-color: #2980b9;
        }

        table {
            width: 100%;
            margin-bottom: 30px;
            border-collapse: collapse;
        }

        table th,
        table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        table th {
            background-color: #34495e;
            color: white;
            font-weight: bold;
        }

        table td button {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        table td button:hover {
            background-color: #c0392b;
        }

        img {
            max-width: 100px;
            border-radius: 5px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .form-section {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .form-section > div {
            flex: 1;
            min-width: 280px;
        }

        @media (max-width: 768px) {
            .form-section {
                flex-direction: column;
            }
        }
</style>
