<template>
  <div class="github-contribution-graph">
    <!-- <h2>GitHub Contributions for {{ username }}</h2> -->
    <svg ref="graph" class="contribution-graph">
      <defs>
        <linearGradient id="contributionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #8e43fe" />
          <stop offset="100%" style="stop-color: #eb43fe" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  username: string
  token: string
}>()

const graph = ref<SVGElement | null>(null)

const colors = {
  level0: '#ffffff30',
  level1: 'url(#contributionGradient)',
  level2: 'url(#contributionGradient)',
  level3: 'url(#contributionGradient)',
  level4: 'url(#contributionGradient)',
}

const cellSize = 12
const cellGap = 2

async function fetchGitHubData() {
  const query = `    query {
      user(login: "${props.username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${props.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })

  const data = await response.json()
  return data.data.user.contributionsCollection.contributionCalendar.weeks
}

function drawGraph(weeks: any[]) {
  if (!graph.value) return

  // Remove all rect elements but keep the defs
  const defs = graph.value.querySelector('defs')
  graph.value.innerHTML = ''
  if (defs) {
    graph.value.appendChild(defs)
  }

  const totalWidth = weeks.length * (cellSize + cellGap)
  const totalHeight = 7 * (cellSize + cellGap)

  // Set viewBox for responsive scaling
  graph.value.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
  graph.value.setAttribute('preserveAspectRatio', 'xMidYMid meet')

  weeks.forEach((week, wIndex) => {
    week.contributionDays.forEach((day: any, dIndex: number) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', String(wIndex * (cellSize + cellGap)))
      rect.setAttribute('y', String(day.weekday * (cellSize + cellGap)))
      rect.setAttribute('width', String(cellSize))
      rect.setAttribute('height', String(cellSize))

      // Convert contribution count to opacity level
      let opacity = 0.3
      if (day.contributionCount > 0) {
        opacity = Math.min(0.3 + day.contributionCount * 0.2, 1)
      }

      rect.setAttribute('fill', day.contributionCount === 0 ? colors.level0 : colors.level1)
      rect.setAttribute('opacity', String(opacity))
      rect.setAttribute('rx', '2')
      rect.setAttribute('title', `${day.date}: ${day.contributionCount} contributions`)
      graph.value?.appendChild(rect)
    })
  })
}

onMounted(async () => {
  try {
    const weeks = await fetchGitHubData()
    drawGraph(weeks)
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
  }
})
</script>

<style scoped>
.github-contribution-graph {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contribution-graph {
  display: block;
  width: 100%;
  max-width: 800px;
  height: auto;
}
</style>
