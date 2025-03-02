<template>
    <AccessDenied />
</template>

<script setup>
import AccessDenied from '~/layouts/access-denied.vue';
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: sans-serif;
}

h1 {
    color: #41b883;
    text-align: center;
    margin-bottom: 2rem;
}

.card {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #35495e;
    margin-top: 0;
}

.counter {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
}

.button-group {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

button {
    background-color: #41b883;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #35495e;
}

.info {
    margin-top: 2rem;
    color: #666;
    font-size: 0.9rem;
}
</style>
