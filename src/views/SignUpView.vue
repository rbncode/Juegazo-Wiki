<template>
<main>
    <section class="login">
        <h1>Registro</h1>
        <div class="form">
            <p>Nombre:</p>
            <input placeholder="Nombre de usuario" type="text" class="text" v-model="textUser">
            <p>Correo:</p>
            <input placeholder="correo@ejemplo.com" type="text" class="text" v-model="textMail">
            <p>Contraseña:</p>
            <input placeholder="Contraseña" type="text" class="text" v-model="textPass">
        </div>
        <h4>Ya tienes una cuenta?, <RouterLink to="login">Inicia Sesión</RouterLink></h4>
    </section>
</main>
</template>

<script>

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
}
a:hover{
    color: var(--color-accent);
}
</style>