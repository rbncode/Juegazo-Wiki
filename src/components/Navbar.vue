<template>
    <nav class="navbar">
        <div class="buttons">
            <RouterLink to="repositorio">Repositorio</RouterLink>
            <RouterLink to="about">Sobre Juegazo</RouterLink>
            <RouterLink to="mechanics">Mecánicas</RouterLink>
        </div>
        <RouterLink to="login" class="login">
            <img id="svg-perfil" src="/src/assets/SVGs/profile-icon.svg" alt="icono perfil">
            <p>Login</p>
        </RouterLink>
    </nav>
</template>

<script>

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
    }

    a:hover{
        color: var(--color-text-hover);
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