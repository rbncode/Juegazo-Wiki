<script>

</script>

<template>
    <nav class="navbar">
        <RouterLink to="repositorio">Repositorio</RouterLink>
        <RouterLink to="about">Sobre Juegazo</RouterLink>
        <RouterLink to="mechanics">Mecánicas</RouterLink>
        <a class="login" href="#">Login</a>
    </nav>
</template>

<style scoped>
    .navbar {
        padding: 5px;
        width: 100% - 10px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 20px;
        background-color: var(--color-secondary);
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

    }
</style>