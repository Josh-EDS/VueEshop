import { createRouter, createWebHistory } from "vue-router";

import HomeProducts from "../views/HomeProducts.vue";
import ProductsDetails from "../views/ProductsDetails.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Admin from "../views/Admin.vue";
import Main from "../views/Main.vue";
import History from "../views/History.vue";

const routes = [
    {
        path: '/test',
        name: "HOMEPRODUCTS",
        component: HomeProducts,
    },
    {
        path: '/products/:id',
        name: "PRODUCTS",
        component: ProductsDetails,
    },
    {
        path: '/login',
        name: "LOGIN",
        component: Login,
    },
    {
        path: '/register',
        name: "REGISTER",
        component: Register,
    },
    {
        path: '/',
        name: "Main",
        component: Main,
    },
    {
        path: '/admin',
        name: "ADMIN",
        component: Admin,
    },
    {
        path: '/tout',
        name: "tout",
        component: Main,
    },
    {
        path: '/my-searches',
        name: "History",
        component: History,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    setTimeout(() => {
        console.clear();
        console.log(`
            .____                       .__      ___.                  
            |    |    ____   ____  ____ |__| ____\\_ |__   ____   ____  
            |    |  _/ __ \\_/ ___\\/  _ \\|  |/    \\| __ \\ /  _ \\ /    \\ 
            |    |__\\  ___/\\  \\__(  <_> )  |   |  \\ \\_\\ (  <_> )   |  \\
            |_______ \\___  >\\___  >____/|__|___|  /___  /\\____/|___|  /
                    \\/   \\/     \\/              \\/    \\/            \\/
                                                        By Zephir.rf.gd
        `);
    }, 80);

    if (to.name === "ADMIN" && !to.query.redirected) {
        return next({ name: "LOGIN" });
    }

    next();
});

export default router;
