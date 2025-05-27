<template>
  <main>
    <h1 class="centertext">{{ project?.project_name }}</h1>
    <h2 class="centertext">{{ project?.project_desc }}</h2>
    <div class="btndiv">
      <a :href="project?.github_link" target="_blank"
        ><button class="contactsubmit projectbutton"><h1>Code</h1></button></a
      >
      <a :href="project?.project_link" target="_blank"
        ><button class="contactsubmit projectbutton"><h1>Naar Website</h1></button></a
      >
    </div>
    <h4>Preview website:</h4>
    <img class="projectimg" :src="imgUrl" :alt="project?.project_name" />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects'

const route = useRoute()

const project = computed(() => {
  const id = Number(route.params.id)
  return projects.find((p) => p.id === id)
})

const imgUrl = computed(() => {
  if (!project.value) return ''
  return new URL(`../assets/img/${project.value.project_img}`, import.meta.url).href
})
</script>
