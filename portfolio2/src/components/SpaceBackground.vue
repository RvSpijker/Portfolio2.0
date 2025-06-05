<template>
  <div class="space-background" ref="container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const container = ref<HTMLElement | null>(null)
let animationFrameId: number
let mouseX = 0
let mouseY = 0

interface Dot {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

const dots: Dot[] = []
const numDots = 100
const maxSpeed = 2

function initCanvas() {
  if (!canvas.value || !container.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Set canvas size to match container
  canvas.value.width = container.value.offsetWidth
  canvas.value.height = container.value.offsetHeight

  // Initialize dots
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      size: Math.random() * 2 + 1,
      speedX: 0,
      speedY: 0,
    })
  }
}

function updateDots() {
  if (!canvas.value) return

  const canvasWidth = canvas.value.width
  const canvasHeight = canvas.value.height

  dots.forEach((dot) => {
    // Calculate distance from mouse
    const dx = mouseX - dot.x
    const dy = mouseY - dot.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Update speed based on mouse position
    if (distance < 200) {
      const force = (200 - distance) / 200
      dot.speedX -= (dx / distance) * force * maxSpeed
      dot.speedY -= (dy / distance) * force * maxSpeed
    }

    // Apply friction
    dot.speedX *= 0.95
    dot.speedY *= 0.95

    // Update position
    dot.x += dot.speedX
    dot.y += dot.speedY

    // Wrap around edges
    if (dot.x < 0) dot.x = canvasWidth
    if (dot.x > canvasWidth) dot.x = 0
    if (dot.y < 0) dot.y = canvasHeight
    if (dot.y > canvasHeight) dot.y = 0
  })
}

function draw() {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  // Draw dots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  dots.forEach((dot) => {
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
    ctx.fill()
  })

  // Draw connections
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  dots.forEach((dot1, i) => {
    dots.slice(i + 1).forEach((dot2) => {
      const dx = dot1.x - dot2.x
      const dy = dot1.y - dot2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.moveTo(dot1.x, dot1.y)
        ctx.lineTo(dot2.x, dot2.y)
        ctx.stroke()
      }
    })
  })
}

function animate() {
  updateDots()
  draw()
  animationFrameId = requestAnimationFrame(animate)
}

function handleMouseMove(event: MouseEvent) {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  mouseX = event.clientX - rect.left
  mouseY = event.clientY - rect.top
}

function handleResize() {
  if (!canvas.value || !container.value) return

  canvas.value.width = container.value.offsetWidth
  canvas.value.height = container.value.offsetHeight
}

onMounted(() => {
  initCanvas()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.space-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
  background: #000;
  pointer-events: none;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
