<template>
  <main>
    <div @click="myFunction" class="titlebox">
      <h1 class="centertext2">Mijn Projecten</h1>
      <i id="uparrow" class="fa-solid fa-sort-up"></i>
      <i id="downarrow" class="downarrow fa-solid fa-sort-down"></i>
    </div>
    <div class="flex2">
      <router-link
        v-for="project in projectsList"
        :key="project.id"
        :to="{ name: 'project', params: { id: project.id } }"
        class="card2"
      >
        <img
          v-if="project.preview_type === 'image'"
          class="card2img"
          :src="getImgUrl(project.project_img)"
          :alt="project.project_name"
        />
        <video v-else-if="project.preview_type === 'video'" class="card2img" muted loop>
          <source :src="getImgUrl(project.project_img)" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 class="card2h1">{{ project.project_name }}</h2>
      </router-link>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { projects } from '../data/projects'

const projectsList = ref(projects)

function getImgUrl(img) {
  return new URL(`../assets/img/${img}`, import.meta.url).href
}

function myFunction() {
  // ...existing code for toggling arrows or other logic...
}
</script>

<!-- ...existing style section... -->
