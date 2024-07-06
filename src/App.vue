<template>
  <Navbar />
  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>
<script setup>
import Navbar from '@/components/layout/NavBar.vue';
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { authStore } from '@/stores/authStore';
onMounted(() => {
  authStore().init()
})
</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>
