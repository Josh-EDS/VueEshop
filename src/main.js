import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

window.onload = function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const sortedId = urlParams.get('sorted');
        
        if (sortedId !== null && sortedId < 11) {
            for (let i = 1; i <= 10; i++) {
                if (i == sortedId) {
                    continue;
                }
                const element = document.getElementById(i);
                if (element) element.remove();
            }
            const articlenull = document.getElementById("Articlenull");
            if (articlenull) articlenull.remove();

            document.querySelectorAll('[style="--open-delay: 300ms;"]').forEach((element, i) => {
                if (i < 10) {
                    element.style.cursor = 'pointer';
                    element.addEventListener('click', () => {
                        window.location.href = `./?sorted=${i + 1}`;
                    });
                }
            });
        } else {
            const articlenull = document.getElementById("Articlenull");
            if (articlenull) articlenull.remove();

            document.querySelectorAll('a[href="./tout"]').forEach((link, i) => {
                if (i < 10) link.href = `./?sorted=${i + 1}`;
            });

            document.querySelectorAll('[style="--open-delay: 300ms;"]').forEach((element, i) => {
                if (i < 10) {
                    element.style.cursor = 'pointer';
                    element.addEventListener('click', () => {
                        window.location.href = `./?sorted=${i + 1}`;
                    });
                }
            });
        }
        
        const searchInput = document.getElementById('b7eebb03-6895-4d59-9803-7c3ce66ed6b0-input');
        const products = document.querySelectorAll('.product-card');

        function filterProducts() {
            if (searchInput.value.trim() === '') return location.reload();
            const term = searchInput.value.toLowerCase();
            products.forEach(product => product.style.display = (product.querySelector('.product-name').innerText.toLowerCase().includes(term) || product.querySelector('.product-description').innerText.toLowerCase().includes(term)) ? '' : 'none');
            document.querySelectorAll('.product-grid').forEach(grid => grid.parentElement.style.display = Array.from(grid.children).some(product => product.style.display !== 'none') ? '' : 'none');
        }

        searchInput.addEventListener('input', filterProducts);
        searchInput.addEventListener('keydown', e => e.key === 'Enter' && filterProducts());
        document.querySelector('button[aria-label="Rechercher"]').addEventListener('click', filterProducts);
        
    } catch { console.log("__ ")}

};
