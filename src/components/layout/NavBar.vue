<template>
    <nav class="container navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Home
                </router-link>
            </div>
            <div class="navbar-end">
                <button v-if="authStore().isLoggedIn" @click="handleLogoutClick" class="button is-light ml-3 my-2">
                    <strong>Logout</strong>
                </button>
                <RouterLink v-if="!authStore().isLoggedIn" @click="showMobileNav = !showMobileNav" to="/auth"
                    class="navbar-item" active-class="is-active">
                    Login | Register
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { authStore } from '@/stores/authStore';
function handleLogoutClick() {
    authStore().logoutUser()
}
</script>

<style>
@media (max-width:1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>