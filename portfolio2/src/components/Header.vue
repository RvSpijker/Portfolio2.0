<template>
  <header>
    <a
      href="#"
      @click.prevent="$emit('navigate', 'home')"
      class="header-logo"
      :style="headerLogoStyle"
    >
      <h1 class="headertext"><strong>RVSPIJKER</strong></h1>
    </a>
  </header>
  <nav>
    <div class="nav-flex">
      <a href="#" @click.prevent="$emit('navigate', 'home')" class="nav-logo" :style="navLogoStyle">
        <h1 class="headertext"><strong>RVSPIJKER</strong></h1>
      </a>
      <div class="nav-links" :style="navStyle">
        <a href="#" @click.prevent="$emit('navigate', 'home')"><h2 class="navlink">Home</h2></a>
        <a href="/CV_Robin2025.pdf" target="_blank"><h2 class="navlink1">Curriculum Vitae</h2></a>
        <a href="/CV_Robin2025.pdf" target="_blank"><h2 class="navlink2">CV</h2></a>
        <a href="#" @click.prevent="$emit('navigate', 'projecten')"
          ><h2 class="navlink">Projecten</h2></a
        >
        <a href="#" @click.prevent="$emit('navigate', 'contact')"
          ><h2 class="navlink navlink4">Contact</h2></a
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerLogoStyle = ref({})
const navLogoStyle = ref({})
const navStyle = ref({
  transform: 'translateX(-100px)',
})

onMounted(() => {
  const handleScroll = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      // On mobile, keep everything static
      headerLogoStyle.value = {
        opacity: 1,
        transform: 'none',
      }
      navLogoStyle.value = {
        opacity: 0,
        transform: 'none',
      }
      navStyle.value = {
        transform: 'none',
      }
      return
    }

    const scrollPosition = window.scrollY
    const headerHeight = 350
    const transitionStart = 0
    const transitionEnd = headerHeight

    // Calculate progress (0 to 1)
    const progress = Math.min(
      Math.max((scrollPosition - transitionStart) / (transitionEnd - transitionStart), 0),
      1,
    )

    // Update header logo styles
    headerLogoStyle.value = {
      opacity: 1 - progress,
      transform: `translateY(${-20 * progress}px) scale(${1 - progress * 0.5})`,
    }

    // Update nav logo styles
    navLogoStyle.value = {
      opacity: progress,
      transform: `translateY(${-20 + 20 * progress}px) scale(${0.5 + progress * 0.5})`,
    }

    // Update nav links position
    navStyle.value = {
      transform: `translateX(${-80 + progress * 200}px)`,
    }
  }

  window.addEventListener('scroll', handleScroll)
  // Add resize listener to handle orientation changes
  window.addEventListener('resize', handleScroll)
  // Initial call to set initial state
  handleScroll()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
})
</script>

<style scoped>
@media (max-width: 768px) {
  .nav-logo {
    display: none;
  }

  .nav-links {
    margin-left: 0 !important;
  }

  .navlink2 {
    width: 60px !important;
  }
}
</style>
