<template>
<main>
    <section class="login">
        <h1>Registro</h1>
        <div class="form">
            <p>Nombre:</p>
            <input placeholder="Nombre de usuario" type="text" class="text" v-model="textUser">
            <p>Contraseña:</p>
            <input placeholder="Contraseña" type="text" class="text" v-model="textPass">
        </div>
        <button @click="registerUser">Registrar</button>
        <h4>Ya tienes una cuenta?, <RouterLink to="login">Inicia Sesión</RouterLink></h4>
    </section>
</main>
</template>

<script>
export default {
  data() {
    return {
      textUser: '',
      textPass: ''
    };
  },
  methods: {
    async registerUser() {
      // Verifica que los campos no estén vacíos
      if (this.textUser && this.textPass) {
        try {
          // Hacer una petición POST para registrar el usuario
          const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.textUser,
              password: this.textPass
            })
          });
          if (response.ok) {
            alert('Usuario registrado con éxito');
            // Redirigir a la página de login después de registrar
            this.$router.push('/login');
          } else {
            alert('Error al registrar el usuario');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('No se pudo conectar al servidor');
        }
      } else {
        alert('Por favor, rellena todos los campos');
      }
    }
  }
};
</script>

<style scoped>
main{
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
}

.login{
    width: 100%;
    max-width: 400px;
    display: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 50px;
}

.form{
    width: inherit;
    display: inherit;
    flex-direction: column;
    row-gap: 10px;

    .text{
        width: inherit - 14px;
        height: 25px;
        padding: 0px 7px 0px 7px;
        font-size: 14px;
    }
}

a{
    padding: 4px;
    border-radius: 8px;
    color: var(--color-primary);
    text-decoration: none;
    transition: 0.25s;
}
a:hover{
    color: var(--color-accent);
    transition: 0.25s;
}

button{
    padding: 10px 15px 10px 15px;
    background-color: var(--color-primary);
    border-radius: 10px;
    border: 0px;
    transition: 0.25s;
}
button:hover{
    background-color: var(--color-accent);
    transition: 0.25s;
}
</style>