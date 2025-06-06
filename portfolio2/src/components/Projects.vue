<template>
  <main>
    <div @click="myFunction" class="titlebox">
      <h1 class="centertext2">Mijn Projecten</h1>
      <div class="sort-icons">
        <v-icon
          name="bi-caret-up-fill"
          class="sort-icon"
          :class="{ 'rotate-180': sortDirection === 'desc' }"
          :style="{ color: sortDirection === 'asc' ? 'var(--text)' : 'var(--text)' }"
        />
      </div>
    </div>
    <TransitionGroup name="list" tag="div" class="flex2 skibidi">
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
    </TransitionGroup>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { projects } from '../data/projects'

const sortDirection = ref('desc') // 'asc' or 'desc'
const projectsList = computed(() => {
  return [...projects].sort((a, b) => {
    if (sortDirection.value === 'asc') {
      return a.id - b.id
    } else {
      return b.id - a.id
    }
  })
})

function getImgUrl(img) {
  return new URL(`../assets/img/${img}`, import.meta.url).href
}

function myFunction() {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}
</script>

<style scoped>

.card2 {
  margin-bottom: -24px;
}

.titlebox {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}

.sort-icons {
  display: flex;
  align-items: center;
}

.sort-icon {
  width: 24px;
  height: 24px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.sort-icon:hover {
  opacity: 1;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* List transition animations */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Ensure items are removed from the flow during animation */
.list-leave-active {
  position: absolute;
}

/* Ensure the container maintains its layout during animations */
.flex2 {
  position: relative;
}
</style>
