<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
  h1 {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>