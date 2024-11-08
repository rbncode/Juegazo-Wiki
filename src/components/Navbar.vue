<template>
    <nav class="navbar">
        <div class="buttons">
            <RouterLink to="repositorio">Repositorio</RouterLink>
            <RouterLink to="about">Sobre Juegazo</RouterLink>
            <RouterLink to="mechanics">Mecánicas</RouterLink>
            <!-- Mostrar el botón "Jugar" solo si el usuario ha iniciado sesión -->
            <RouterLink v-if="isLoggedIn" to="selector">Jugar</RouterLink>
        </div>
        <RouterLink v-if="!isLoggedIn" to="login" class="login">
            <img id="svg-perfil" src="/src/assets/SVGs/profile-icon.svg" alt="icono perfil">
            <p>Login</p>
        </RouterLink>
        <a v-if="isLoggedIn" @click="logOut">Cerrar Sesión</a>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            isLoggedIn: false
        };
    },
    mounted() {
        // Verificar si el usuario está logueado
        this.isLoggedIn = !!localStorage.getItem('user');
    },
    methods: {
        logOut() {
            localStorage.removeItem('user'); // Eliminar el usuario del localStorage
            this.isLoggedIn = false; // Actualizar el estado de inicio de sesión
            this.$router.push('/'); // Redirigir al inicio
        }
    }
};
</script>

<style scoped>
    .navbar {
        padding: 5px 15px 5px 15px;
        width: 100% - 30px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 20px;
        background-color: var(--color-secondary);
    }

    .buttons{
        height: 100%;
        width: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }

    a{
        padding: 4px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--color-text);
        transition: 0.25s;
    }

    a:hover{
        color: var(--color-text-hover);
        transition: 0.25s;
    }

    .login{
        height: 100%;
        width: max-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }
</style>