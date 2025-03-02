<template>
    <div class="access-denied-container">
        <div class="diagonal-line left"></div>
        <div class="diagonal-line right"></div>
        <div class="content">
            <img src="public/Akantorm/sry.png" alt="Access Denied Image" class="access-image" />
            <h1>Access Denied</h1>
            <p>You don't have permission to access this page.</p>
            <NuxtLink to="/" class="button">Return to Home</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.access-image {
    mix-blend-mode: multiply;
    width: 150px;
    height: auto;
}

.access-denied-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    color: #333;
    background-color: #fff;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    position: relative;
    overflow: hidden;
}

.content {
    position: relative;
    z-index: 1;
}

.diagonal-line {
    position: absolute;
    background-color: #ff6600;
    width: 120px;
    height: 200%;
    z-index: 0;
}

.diagonal-line.left {
    left: 5%;
    top: -50%;
    transform: rotate(45deg);
    transform-origin: center;
    animation: slideIn 1.2s ease-out forwards;
    opacity: 0;
}

.diagonal-line.right {
    right: 5%;
    top: -50%;
    transform: rotate(45deg);
    transform-origin: center;
    animation: slideIn 1.2s ease-out 0.3s forwards;
    opacity: 0;
}

@keyframes slideIn {
    0% {
        opacity: 0;
        transform: rotate(45deg) translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: rotate(45deg) translateY(0);
    }
}

h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #ff6600;
}

p {
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
    color: #555;
}

.button {
    padding: 12px 28px;
    background-color: #ff6600;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(255, 102, 0, 0.2);
}

.button:hover {
    background-color: #ff7d2d;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(255, 102, 0, 0.3);
}
</style>
