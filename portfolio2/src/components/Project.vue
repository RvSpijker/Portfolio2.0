<template>
  <main>
      <h1 class="centertext">{{ project?.project_name }}</h1>
      <h2 class="centertext">{{ project?.project_desc }}</h2>
      <div class="btndiv">
          <a :href="project?.github_link" target="_blank"><button class="contactsubmit projectbutton"><h1>Code</h1></button></a>
          <a :href="project?.project_link" target="_blank"><button class="contactsubmit projectbutton"><h1>Naar Website</h1></button></a>
      </div>
      <h4>Preview website:</h4>
      <img class="projectimg" :src="imgUrl" :alt="project?.project_name">
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projects = [
  {
    id: 1,
    project_name: 'irritante pagina',
    project_img: 'irritantepagina.png',
    project_link: 'https://rvspijker.nl/irritantepagina/',
    github_link: 'https://github.com/RvSpijker/Irritante-pagina/',
    project_desc: 'Dit project bestaat uit drie belangrijke aspecten. Dit project draait namelijk om het zo goed mogelijk nabouwen van een bestaande OnePager en van deze nagebouwde heb OnePager ik een echt irritante OnePage-site gemaakt. Dit heb ik gedaan in een duo.',
  },
  {
    id: 2,
    project_name: 'Steen Papier Schaar',
    project_img: 'rps.png',
    project_link: 'https://rvspijker.nl/rps/',
    github_link: 'https://github.com/RvSpijker/SteenPapierSchaar',
    project_desc: 'In dit project heb ik mijn vaardigheden in HTML5, CSS3 en JavaScript toegepast tot een groter geheel. ik heb een webgame ontwikkelt in dit project.',
  },
  {
    id: 3,
    project_name: 'Webshop',
    project_img: 'gaminggoods.png',
    project_link: 'https://shop.rvspijker.nl/',
    github_link: 'https://github.com/RvSpijker/webshop-gaminggoods',
    project_desc: 'In dit project heb ik me in gericht op het leren van de programmeertaal PHP en het gebruiken ervan om een eenvoudige webshop te maken.',
  },
  {
    id: 4,
    project_name: 'Blog',
    project_img: 'blog.png',
    project_link: 'https://rvspijker.nl/blog/',
    github_link: 'https://github.com/RvSpijker/Blog',
    project_desc: 'In dit project heb ik geleerd een eenvoudige webbased applicatie te ontwikkelen. Hierdoor heb ik ook geleerd hoe je vanilla PHP toepast in een web applicatie.',
  },
  {
    id: 5,
    project_name: 'Todo',
    project_img: 'todo.png',
    project_link: 'https://rvspijker.nl/todo/',
    github_link: 'https://github.com/RvSpijker/todo-api',
    project_desc: 'In dit project heb ik geleerd een eenvoudige api te ontwikkelen.',
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
]

const project = computed(() => {
  const id = Number(route.params.id)
  return projects.find(p => p.id === id)
})

const imgUrl = computed(() => {
  if (!project.value) return ''
  return new URL(`../assets/img/${project.value.project_img}`, import.meta.url).href
})
</script>