<template>
      <header class="site-header">
      <a href="/">
        <div class="logo">
          <img src="../lecoinbon.png" alt="Logo de l'E-shop" class="logo-image" />
          <link rel="stylesheet" href="http://www.lecoinbon.fr.000.pe/_next/static/css/19842df133a4d6ba.css" data-n-g="">
        </div>
      </a>
      <nav class="header-nav">
        <router-link to="/register" class="login-btn">Register</router-link>
        <router-link to="/login" class="login-btn">Login</router-link>
      </nav>
    </header>
  <div data-v-08aaad4e="" class="login-form">
  <p style="padding: 0 0cm 2cm 0; border-width: 0px"></p>
  <form class="flex w-full flex-col text-body-1 md:w-3/4" id="loginForm"  @submit.prevent="handleLogin(event)">
    <h2 class="mb-3xl text-display-3 font-bold text-on-surface">
      Connectez-vous à compte lecoinbon
    </h2>
    <div class="input-container ic2">
            <label for="email" class="placeholder">Email</label><p style="padding: 0 0cm 0.2cm 0; border-width: 0px"></p>
            <input id="email" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="email" placeholder=" " required />
            <div class="cut"></div><p style="padding: 0 0cm 0.5cm 0; border-width: 0px"></p>
        </div>
        <div class="input-container ic2">
            <label for="password" class="placeholder">Password</label><p style="padding: 0 0cm 0.2cm 0; border-width: 0px"></p>
            <input id="password" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="password" placeholder=" " required />
            <div class="cut"></div><p style="padding: 0 0cm 1cm 0; border-width: 0px"></p>
        </div>
    <button
      data-spark-component="button"
      type="submit"
      class="u-shadow-border-transition box-border inline-flex items-center justify-center gap-md whitespace-nowrap px-lg text-body-1 font-bold focus-visible:outline-none focus-visible:u-ring [&amp;:not(:focus-visible)]:ring-inset min-w-sz-44 h-sz-44 rounded-lg bg-main text-on-main hover:bg-main-hovered enabled:active:bg-main-pressed focus-visible:bg-main-focused w-full"
      aria-busy="false"
      aria-live="off"
      data-testid="login-continue-button"
    >
      Continuer
    </button>
    <p id="error"></p>
    <div
      data-orientation="horizontal"
      role="separator"
      data-spark-component="divider"
      class="overflow-hidden inline-flex items-center after:border-solid before:border-solid w-full flex-row my-sm grow-0 before:border-t-sm after:border-t-sm [&amp;>*]:px-lg justify-center before:grow after:grow before:border-outline after:border-outline"
    >
      <span class="my-2xl">Ou</span>
    </div>
    <router-link to="/register"
      class="u-shadow-border-transition box-border inline-flex items-center justify-center gap-md whitespace-nowrap px-lg text-body-1 font-bold focus-visible:outline-none focus-visible:u-ring [&amp;:not(:focus-visible)]:ring-inset bg-transparent border-sm border-current min-w-sz-44 h-sz-44 rounded-lg hover:bg-basic/dim-5 enabled:active:bg-basic/dim-5 focus-visible:bg-basic/dim-5 text-basic text-current"
      data-testid="social-button-google"
      data-spark-component="button"
      aria-busy="false"
      aria-live="off"
      >Créer un compte</router-link
    >
  </form>
</div>
</template>

<script>
export default {
methods:{
handleLogin(event) {

    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        if (data.error) {
            document.getElementById('error').textContent = data.error;
        } else {
            window.location.href = './admin';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred during login.';
    });
    
},
},
}
</script>

<style scoped>

.login-form {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0 auto;
}

</style>
