<template>
  <header data-v-08aaad4e="" class="site-header">
  <a data-v-08aaad4e="" href="/"
    ><div data-v-08aaad4e="" class="logo">
      <img
        data-v-08aaad4e=""
        src="/src/lecoinbon.png"
        alt="Logo de l'E-shop"
        class="logo-image"
      /><link
        data-v-08aaad4e=""
        rel="stylesheet"
        href="http://www.lecoinbon.fr.000.pe/_next/static/css/19842df133a4d6ba.css"
        data-n-g=""
      /></div
  ></a>
  <nav data-v-08aaad4e="" class="header-nav">
    <a data-v-08aaad4e="" href="/register" class="login-btn">Register</a
    ><a
      data-v-08aaad4e=""
      aria-current="page"
      href="/login"
      class="router-link-active router-link-exact-active login-btn"
      >Login</a
    >
  </nav>
  </header>
  <p style="padding: 0 0cm 2cm 0; border-width: 0px"></p>
  <div class="form" style="width:400px; margin:0 auto;">
    <h2 class="mb-3xl text-display-3 font-bold text-on-surface">
      Créez votre compte lecoinbon 
    </h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-container ic2">
        <label class="placeholder">First name</label><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
        <input v-model="formData.firstname" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="text" placeholder=" " required />
        <div class="cut"></div><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
      </div>

      <div class="input-container ic2">
        <label class="placeholder">Last name</label><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
        <input v-model="formData.lastname" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="text" placeholder=" " required />
        <div class="cut"></div><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
      </div>

      <div class="input-container ic2">
        <label class="placeholder">Email</label><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
        <input v-model="formData.email" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="email" placeholder=" " required />
        <div class="cut"></div><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
      </div>

      <div class="input-container ic2">
        <label class="placeholder">Password</label><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
        <input v-model="formData.password" class="relative border-sm peer w-full appearance-none outline-none bg-surface text-ellipsis text-body-1 text-on-surface caret-neutral autofill:shadow-surface autofill:shadow-[inset_0_0_0px_1000px] disabled:cursor-not-allowed disabled:border-outline disabled:bg-on-surface/dim-5 disabled:text-on-surface/dim-3 read-only:cursor-default read-only:bg-on-surface/dim-5 focus:ring-1 focus:ring-inset h-sz-44 border-outline hover:border-outline-high focus:ring-outline-high focus:border-outline-high rounded-l-lg rounded-r-lg pl-lg pr-lg" type="password" placeholder=" " required />
        <div class="cut"></div><p style="padding: 0 0cm 0.3cm 0; border-width: 0px"></p>
      </div><p style="padding: 0 0cm 0.7cm 0; border-width: 0px"></p>

      <button type="submit" class="u-shadow-border-transition box-border inline-flex items-center justify-center gap-md whitespace-nowrap px-lg text-body-1 font-bold focus-visible:outline-none focus-visible:u-ring [&:not(:focus-visible)]:ring-inset min-w-sz-44 h-sz-44 rounded-lg bg-main text-on-main hover:bg-main-hovered enabled:active:bg-main-pressed focus-visible:bg-main-focused w-full"> Continuer </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <div data-v-08aaad4e="" data-orientation="horizontal" role="separator" data-spark-component="divider" class="overflow-hidden inline-flex items-center after:border-solid before:border-solid w-full flex-row my-sm grow-0 before:border-t-sm after:border-t-sm [&amp;>*]:px-lg justify-center before:grow after:grow before:border-outline after:border-outline"><span data-v-08aaad4e="" class="my-2xl">Ou</span></div>
    <router-link to="/login">
      <button type="button" class="u-shadow-border-transition box-border inline-flex items-center justify-center gap-md whitespace-nowrap px-lg text-body-1 font-bold focus-visible:outline-none focus-visible:u-ring [&:not(:focus-visible)]:ring-inset bg-transparent border-sm border-current min-w-sz-44 h-sz-44 rounded-lg hover:bg-basic/dim-5 enabled:active:bg-basic/dim-5 focus-visible:bg-basic/dim-5 text-basic text-current">Login</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
  validateForm() {
    const nameRegex = /^[A-Za-z-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!this.formData.firstname) return 'First name must not be empty';
    if (!this.formData.lastname) return 'Last name must not be empty';
    if (!nameRegex.test(this.formData.firstname)) return 'First name can only contain letters or hyphens';
    if (!nameRegex.test(this.formData.lastname)) return 'Last name can only contain letters or hyphens';
    if (!emailRegex.test(this.formData.email)) return 'Email is badly formatted';
    if (!passwordRegex.test(this.formData.password))
      return 'Password must be at least 8 characters long and contain at least a letter and a number';

    return null;
  },
  handleSubmit() {
    this.error = this.validateForm();
    if (this.error) return;

    fetch('http://localhost:3000/validateForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ form: this.formData })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          if (data.error === 'Email already in use') {
            this.error = 'Cet email est déjà utilisé';
          } else {
            this.error = data.error;
          }
        } else {
          this.error = '';
          alert('Account created successfully');
          this.$router.push('/login');
        }
      })
      .catch(err => {
        this.error = 'Erreur: ' + err.message;
      });
  }
}
};
</script>

