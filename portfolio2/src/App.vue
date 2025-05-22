<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import Projects from './components/Projects.vue';
import Project from './components/Project.vue';

const currentView = ref<'home' | 'contact' | 'projecten' | 'project'>('home')
const currentProjectId = ref<string | null>(null)
const router = useRouter()

function handleNav(view: string, projectId?: string) {
  if (view === 'projecten') {
    currentView.value = 'projecten';
    router.push('/projects')
    return;
  }
  if (view === 'contact') {
    currentView.value = 'contact';
    router.push('/contact')
    return;
  }
  if (view === 'project' && projectId) {
    currentView.value = 'project';
    currentProjectId.value = projectId;
    router.push(`/project/${projectId}`)
    return;
  }
  currentView.value = 'home';
  router.push('/')
}

// Keep currentView in sync with route
watch(
  () => router.currentRoute.value,
  (route) => {
    if (route.path === '/projects') {
      currentView.value = 'projecten';
      currentProjectId.value = null;
    } else if (route.path === '/contact') {
      currentView.value = 'contact';
      currentProjectId.value = null;
    } else if (route.name === 'project' && route.params.id) {
      currentView.value = 'project';
      currentProjectId.value = route.params.id as string;
    } else {
      currentView.value = 'home';
      currentProjectId.value = null;
    }
  },
  { immediate: true }
)
</script>

<template>
  <Header @navigate="handleNav" />
  <component
    :is="currentView === 'home' ? Home : currentView === 'contact' ? Contact : currentView === 'projecten' ? Projects : Project"
    v-bind="currentView === 'project' ? { id: currentProjectId } : {}"
  />
</template>

<style scoped>

</style>
