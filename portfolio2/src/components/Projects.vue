<template>
  <main>
    <div @click="myFunction" class="titlebox">
      <h1 class="centertext2">Mijn Projecten</h1>
      <i id="uparrow" class="fa-solid fa-sort-up"></i>
      <i id="downarrow" class="downarrow fa-solid fa-sort-down"></i>
    </div>
    <div class="flex2">
      <router-link
        v-for="project in projects"
        :key="project.id"
        :to="{ name: 'project', params: { id: project.id } }"
        class="card2"
      >
        <img class="card2img" :src="getImgUrl(project.project_img)" :alt="project.project_name" />
        <h2 class="card2h1">{{ project.project_name }}</h2>
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    project_name: 'irritante pagina',
    project_img: 'irritantepagina.png',
    project_link: 'https://rvspijker.nl/irritantepagina/',
    github_link: 'https://github.com/RvSpijker/Irritante-pagina/',
    project_desc: 'Dit project bestaat uit drie belangrijke aspecten....',
  },
  {
    id: 2,
    project_name: 'Steen Papier Schaar',
    project_img: 'rps.png',
    project_link: 'https://rvspijker.nl/rps/',
    github_link: 'https://github.com/RvSpijker/SteenPapierSchaar',
    project_desc: 'In dit project heb ik mijn vaardigheden in HTML5, ...',
  },
  {
    id: 3,
    project_name: 'Webshop',
    project_img: 'gaminggoods.png',
    project_link: 'https://shop.rvspijker.nl/',
    github_link: 'https://github.com/RvSpijker/webshop-gaminggoods',
    project_desc: 'In dit project heb ik me in gericht op het leren v...',
  },
  {
    id: 4,
    project_name: 'Blog',
    project_img: 'blog.png',
    project_link: 'https://rvspijker.nl/blog/',
    github_link: 'https://github.com/RvSpijker/Blog',
    project_desc: 'In dit project heb ik geleerd een eenvoudige webba...',
  },
  {
    id: 5,
    project_name: 'Todo',
    project_img: 'todo.png',
    project_link: 'https://rvspijker.nl/todo/',
    github_link: 'https://github.com/RvSpijker/todo-api',
    project_desc: 'In dit project heb ik geleerd een eenvoudige api t...',
  },
  {
    id: 6,
    project_name: 'Portfolio',
    project_img: 'portfolio.png',
    project_link: 'https://rvspijker.nl/',
    github_link: 'https://github.com/RvSpijker/Portfolio',
    project_desc: 'Dit is de website waar je nu op zit :D',
  },
  {
    id: 7,
    project_name: 'New Tab',
    project_img: 'newtab.png',
    project_link: 'https://rvspijker.nl/newtab/',
    github_link: 'https://github.com/RvSpijker/homescreen',
    project_desc: '[Beschrijving komt eraan]',
  },
])

function getImgUrl(img) {
  return new URL(`../assets/img/${img}`, import.meta.url).href
}

function myFunction() {
  // ...existing code for toggling arrows or other logic...
}
</script>

<!-- ...existing style section... -->
