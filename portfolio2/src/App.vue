<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
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

// Cursor light effect
onMounted(() => {
  const light = document.getElementById('cursor-light');
  const moveLight = (e: MouseEvent) => {
    if (light) {
      light.style.left = `${e.clientX}px`;
      light.style.top = `${e.clientY}px`;
    }
  };
  window.addEventListener('mousemove', moveLight);

  // Spacebar random monochromatic color change
  function randomMonochromeHex() {
    // Pick a random hue
    const hue = Math.floor(Math.random() * 360);
    // Use HSL to generate three monochromatic shades
    const primary = `hsl(${hue}, 100%, 60%)`;
    const secondary = `hsl(${hue}, 100%, 20%)`;
    const accent = `hsl(${hue}, 100%, 80%)`;
    return { primary, secondary, accent };
  }
  const handleSpace = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      const { primary, secondary, accent } = randomMonochromeHex();
      document.documentElement.style.setProperty('--primary-button', primary);
      document.documentElement.style.setProperty('--secondary-button', secondary);
      document.documentElement.style.setProperty('--accent', accent);
    }
  };
  window.addEventListener('keydown', handleSpace);

  // Clean up
  onUnmounted(() => {
    window.removeEventListener('mousemove', moveLight);
    window.removeEventListener('keydown', handleSpace);
  });
});
</script>

<template>
  <Header @navigate="handleNav" />
  <component
    :is="currentView === 'home' ? Home : currentView === 'contact' ? Contact : currentView === 'projecten' ? Projects : Project"
    v-bind="currentView === 'project' ? { id: currentProjectId } : {}"
  />
  <div id="cursor-light"></div>
</template>

<style scoped>
#cursor-light {
  position: fixed;
  pointer-events: none;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(128,0,255,0.4) 0%, rgba(128,0,255,0.1) 100%, transparent 100%);
  filter: blur(40px);
  z-index: 1;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s;
  opacity: 0.7;
}

body {
  background: #000;
}
</style>
