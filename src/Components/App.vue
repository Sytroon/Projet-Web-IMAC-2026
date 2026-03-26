<template>
    <Header />
    <RouterView />
    <Footer />
</template>

<script setup>
    import { RouterView } from "vue-router";
    import Header from "./Header.vue";
    import Footer from "./Footer.vue";
</script>

<style>
    * {
    font-family: 'Press Start 2P', system-ui;
    font-size: 10px; 
    line-height: 1.6;
    }

    h1 { font-size: 18px; }
    h2 { font-size: 16px; }
    h3 { font-size: 14px; }

    body {
    margin: 0;
    padding: 0;
    background-color: #3b4cca;
    min-height: 100vh;
    }
</style>