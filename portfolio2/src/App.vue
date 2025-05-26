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

// Update document title based on current view
watch(currentView, (newView) => {
  let title = ''
  switch (newView) {
    case 'home':
      title = 'Home'
      break
    case 'contact':
      title = 'Contact'
      break
    case 'projecten':
      title = 'Projecten'
      break
    case 'project':
      title = 'Project'
      break
  }
  document.title = `${title} | RvSpijker`
})

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
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let trailPositions: { x: number; y: number }[] = [];
  const trailLength = 15;

  // Create multiple trail elements
  const trails: HTMLElement[] = [];
  for (let i = 0; i < trailLength; i++) {
    const trailElement = document.createElement('div');
    trailElement.id = `cursor-trail-${i}`;
    trailElement.className = 'cursor-trail';
    document.body.appendChild(trailElement);
    trails.push(trailElement);
  }

  const moveCursor = (e: MouseEvent) => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }

    // Update trail positions
    trailPositions.unshift({ x: e.clientX, y: e.clientY });
    if (trailPositions.length > trailLength) {
      trailPositions.pop();
    }

    // Update all trail elements with decreasing opacity
    trails.forEach((trail, index) => {
      if (trailPositions[index]) {
        const pos = trailPositions[index];
        trail.style.left = `${pos.x}px`;
        trail.style.top = `${pos.y}px`;
        trail.style.opacity = `${0.3 - (index * 0.02)}`; // Decreasing opacity
      }
    });
  };

  // Add click effect
  const handleClick = () => {
    if (cursor) {
      cursor.style.width = '15px';
      cursor.style.height = '15px';
      setTimeout(() => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
      }, 100);
    }
  };

  window.addEventListener('mousemove', moveCursor);
  window.addEventListener('click', handleClick);

  // Spacebar random monochromatic color change
  function randomMonochromeHex() {
    // Pick a random hue
    const hue = Math.floor(Math.random() * 360);
    // Use HSL to generate three monochromatic shades
    const primary = `hsl(${hue}, 100%, 60%)`;
    const secondary = `hsl(${hue}, 100%, 10%)`;
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
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('click', handleClick);
    window.removeEventListener('keydown', handleSpace);
    // Remove all trail elements
    trails.forEach(trail => trail.remove());
  });
});
</script>

<template>
  <Header @navigate="handleNav" />
  <component
    :is="currentView === 'home' ? Home : currentView === 'contact' ? Contact : currentView === 'projecten' ? Projects : Project"
    v-bind="currentView === 'project' ? { id: currentProjectId } : {}"
  />
  <div id="cursor"></div>
</template>

<style scoped>
body {
  background: #000;
}
</style>
