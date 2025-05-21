<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';

const currentView = ref<'home' | 'contact'>('home')

function handleNav(view: 'home' | 'contact') {
  currentView.value = view
}
</script>

<template>
  <Header @navigate="handleNav" />
  <component :is="currentView === 'home' ? Home : Contact" />
</template>

<style scoped>

</style>
