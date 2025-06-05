<template>
  <main>
    <h1 class="centertext">Over Mij</h1>

    <div class="flex">
      <div
        class="card"
        v-for="(card, idx) in cards"
        :key="idx"
        ref="cardRefs"
        @mousemove="(e) => handleTilt(e, idx)"
        @mouseleave="() => resetTilt(idx)"
        :style="cardStyles[idx]"
      >
        <div v-html="card.svg.template" class="center"></div>
        <h2 class="cardh1">{{ card.title }}</h2>
        <p class="cardp" v-html="card.content"></p>
      </div>
    </div>

    <h1 class="cardh1">GitHub Contributions</h1>
    <div class="github-section">
      <GitHubContributionGraph username="rvspijker" :token="githubToken" class="card-stat" />
      <div class="github-stats">
        <div
          class="card-stat"
          v-for="(stat, idx) in ['repos', 'followers', 'following']"
          :key="stat"
          ref="statRefs"
          @mousemove="(e) => handleTilt(e, idx + 4)"
          @mouseleave="() => resetTilt(idx + 4)"
          :style="cardStyles[idx + 4]"
        >
          <h3>{{ stat.charAt(0).toUpperCase() + stat.slice(1) }}</h3>
          <p class="stat-number">
            {{
              stat === 'repos'
                ? githubStats.public_repos
                : stat === 'followers'
                  ? githubStats.followers
                  : githubStats.following
            }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import GitHubContributionGraph from './GitHubContributionGraph.vue'

const githubToken = import.meta.env.VITE_GITHUB_TOKEN
const githubStats = reactive({
  followers: 0,
  following: 0,
  public_repos: 0,
})

function calculateAge(date: string): number {
  const formattedDate = date.split('/')
  const day = parseInt(formattedDate[0], 10)
  const month = parseInt(formattedDate[1], 10) - 1 // Month is 0-indexed
  const year = parseInt(formattedDate[2], 10)

  const birthdateTimeStamp = new Date(year, month, day).getTime()
  const currentDate = new Date().getTime()
  const difference = currentDate - birthdateTimeStamp

  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25 // considering leap years
  const currentAge = Math.floor(difference / millisecondsInYear)

  return currentAge
}

const age = ref(calculateAge('23/06/2006'))

const cards = [
  {
    svg: {
      template: `<svg width="150" height="151" viewBox="0 0 150 151" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8e43fe"/>
            <stop offset="100%" style="stop-color:#eb43fe"/>
          </linearGradient>
        </defs>
        <path d="M28.875 113.75C35.25 108.875 42.375 105.031 50.25 102.219C58.125 99.4062 66.375 98 75 98C83.625 98 91.875 99.4062 99.75 102.219C107.625 105.031 114.75 108.875 121.125 113.75C125.5 108.625 128.906 102.813 131.344 96.3125C133.781 89.8125 135 82.875 135 75.5C135 58.875 129.156 44.7188 117.469 33.0313C105.781 21.3438 91.625 15.5 75 15.5C58.375 15.5 44.2188 21.3438 32.5313 33.0313C20.8438 44.7188 15 58.875 15 75.5C15 82.875 16.2187 89.8125 18.6562 96.3125C21.0937 102.813 24.5 108.625 28.875 113.75ZM75 83C67.625 83 61.4063 80.4688 56.3438 75.4063C51.2813 70.3438 48.75 64.125 48.75 56.75C48.75 49.375 51.2813 43.1563 56.3438 38.0938C61.4063 33.0313 67.625 30.5 75 30.5C82.375 30.5 88.5938 33.0313 93.6563 38.0938C98.7188 43.1563 101.25 49.375 101.25 56.75C101.25 64.125 98.7188 70.3438 93.6563 75.4063C88.5938 80.4688 82.375 83 75 83ZM75 150.5C64.625 150.5 54.875 148.531 45.75 144.594C36.625 140.656 28.6875 135.313 21.9375 128.563C15.1875 121.813 9.84375 113.875 5.90625 104.75C1.96875 95.625 0 85.875 0 75.5C0 65.125 1.96875 55.375 5.90625 46.25C9.84375 37.125 15.1875 29.1875 21.9375 22.4375C28.6875 15.6875 36.625 10.3438 45.75 6.40625C54.875 2.46875 64.625 0.5 75 0.5C85.375 0.5 95.125 2.46875 104.25 6.40625C113.375 10.3438 121.313 15.6875 128.063 22.4375C134.813 29.1875 140.156 37.125 144.094 46.25C148.031 55.375 150 65.125 150 75.5C150 85.875 148.031 95.625 144.094 104.75C140.156 113.875 134.813 121.813 128.063 128.563C121.313 135.313 113.375 140.656 104.25 144.594C95.125 148.531 85.375 150.5 75 150.5ZM75 135.5C81.625 135.5 87.875 134.531 93.75 132.594C99.625 130.656 105 127.875 109.875 124.25C105 120.625 99.625 117.844 93.75 115.906C87.875 113.969 81.625 113 75 113C68.375 113 62.125 113.969 56.25 115.906C50.375 117.844 45 120.625 40.125 124.25C45 127.875 50.375 130.656 56.25 132.594C62.125 134.531 68.375 135.5 75 135.5ZM75 68C78.25 68 80.9375 66.9375 83.0625 64.8125C85.1875 62.6875 86.25 60 86.25 56.75C86.25 53.5 85.1875 50.8125 83.0625 48.6875C80.9375 46.5625 78.25 45.5 75 45.5C71.75 45.5 69.0625 46.5625 66.9375 48.6875C64.8125 50.8125 63.75 53.5 63.75 56.75C63.75 60 64.8125 62.6875 66.9375 64.8125C69.0625 66.9375 71.75 68 75 68Z" fill="url(#gradient1)"/></svg>`,
    },
    title: 'Wie ik ben',
    content: `Ik ben Robin van Spijker en ik ben <span>${age.value}</span> jaar.`,
  },
  {
    svg: {
      template: `<svg width="138" height="100" viewBox="0 0 138 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8e43fe"/>
            <stop offset="100%" style="stop-color:#eb43fe"/>
          </linearGradient>
        </defs>
        <path d="M23.5313 100C17.2813 100 11.9427 97.7604 7.51562 93.2813C3.08854 88.8021 0.770833 83.3854 0.5625 77.0312C0.5625 76.0937 0.614583 75.1563 0.71875 74.2188C0.822917 73.2812 0.979167 72.3438 1.1875 71.4063L14.3125 18.9063C15.7708 13.2813 18.7396 8.72396 23.2187 5.23438C27.6979 1.74479 32.8021 0 38.5313 0H99.4688C105.198 0 110.302 1.74479 114.781 5.23438C119.26 8.72396 122.229 13.2813 123.688 18.9063L136.812 71.4063C137.021 72.3438 137.203 73.3073 137.359 74.2969C137.516 75.2865 137.594 76.25 137.594 77.1875C137.594 83.5417 135.328 88.9323 130.797 93.3594C126.266 97.7865 120.823 100 114.469 100C110.094 100 106.031 98.8542 102.281 96.5625C98.5313 94.2708 95.7187 91.1458 93.8438 87.1875L89.4688 78.125C88.9479 77.0833 88.1667 76.3021 87.125 75.7812C86.0833 75.2604 84.9896 75 83.8437 75H54.1563C53.0104 75 51.9167 75.2604 50.875 75.7812C49.8333 76.3021 49.0521 77.0833 48.5313 78.125L44.1563 87.1875C42.2813 91.1458 39.4688 94.2708 35.7188 96.5625C31.9688 98.8542 27.9063 100 23.5313 100ZM24 87.5C25.9792 87.5 27.776 86.9792 29.3906 85.9375C31.0052 84.8958 32.2292 83.4896 33.0625 81.7187L37.4375 72.8125C39 69.5833 41.2917 67.0573 44.3125 65.2344C47.3333 63.4115 50.6146 62.5 54.1563 62.5H83.8437C87.3854 62.5 90.6667 63.4375 93.6875 65.3125C96.7083 67.1875 99.0521 69.6875 100.719 72.8125L105.094 81.7187C105.927 83.4896 107.151 84.8958 108.766 85.9375C110.38 86.9792 112.177 87.5 114.156 87.5C117.073 87.5 119.573 86.5365 121.656 84.6094C123.74 82.6823 124.833 80.2604 124.938 77.3438C124.938 77.4479 124.833 76.4583 124.625 74.375L111.5 22.0313C110.771 19.2188 109.312 16.9271 107.125 15.1562C104.937 13.3854 102.385 12.5 99.4688 12.5H38.5313C35.6146 12.5 33.0365 13.3854 30.7969 15.1562C28.5573 16.9271 27.125 19.2188 26.5 22.0313L13.375 74.375C13.1667 75 13.0625 75.9375 13.0625 77.1875C13.0625 80.1042 14.1302 82.5521 16.2656 84.5313C18.401 86.5104 20.9792 87.5 24 87.5ZM78.375 43.75C80.1458 43.75 81.6302 43.151 82.8281 41.9531C84.026 40.7552 84.625 39.2708 84.625 37.5C84.625 35.7292 84.026 34.2448 82.8281 33.0469C81.6302 31.849 80.1458 31.25 78.375 31.25C76.6042 31.25 75.1198 31.849 73.9219 33.0469C72.724 34.2448 72.125 35.7292 72.125 37.5C72.125 39.2708 72.724 40.7552 73.9219 41.9531C75.1198 43.151 76.6042 43.75 78.375 43.75ZM90.875 31.25C92.6458 31.25 94.1302 30.651 95.3281 29.4531C96.526 28.2552 97.125 26.7708 97.125 25C97.125 23.2292 96.526 21.7448 95.3281 20.5469C94.1302 19.349 92.6458 18.75 90.875 18.75C89.1042 18.75 87.6198 19.349 86.4219 20.5469C85.224 21.7448 84.625 23.2292 84.625 25C84.625 26.7708 85.224 28.2552 86.4219 29.4531C87.6198 30.651 89.1042 31.25 90.875 31.25ZM90.875 56.25C92.6458 56.25 94.1302 55.651 95.3281 54.4531C96.526 53.2552 97.125 51.7708 97.125 50C97.125 48.2292 96.526 46.7448 95.3281 45.5469C94.1302 44.349 92.6458 43.75 90.875 43.75C89.1042 43.75 87.6198 44.349 86.4219 45.5469C85.224 46.7448 84.625 48.2292 84.625 50C84.625 51.7708 85.224 53.2552 86.4219 54.4531C87.6198 55.651 89.1042 56.25 90.875 56.25ZM103.375 43.75C105.146 43.75 106.63 43.151 107.828 41.9531C109.026 40.7552 109.625 39.2708 109.625 37.5C109.625 35.7292 109.026 34.2448 107.828 33.0469C106.63 31.849 105.146 31.25 103.375 31.25C101.604 31.25 100.12 31.849 98.9219 33.0469C97.724 34.2448 97.125 35.7292 97.125 37.5C97.125 39.2708 97.724 40.7552 98.9219 41.9531C100.12 43.151 101.604 43.75 103.375 43.75ZM47.125 53.125C48.4792 53.125 49.599 52.6823 50.4844 51.7969C51.3698 50.9115 51.8125 49.7917 51.8125 48.4375V42.1875H58.0625C59.4167 42.1875 60.5365 41.7448 61.4219 40.8594C62.3073 39.974 62.75 38.8542 62.75 37.5C62.75 36.1458 62.3073 35.026 61.4219 34.1406C60.5365 33.2552 59.4167 32.8125 58.0625 32.8125H51.8125V26.5625C51.8125 25.2083 51.3698 24.0885 50.4844 23.2031C49.599 22.3177 48.4792 21.875 47.125 21.875C45.7708 21.875 44.651 22.3177 43.7656 23.2031C42.8802 24.0885 42.4375 25.2083 42.4375 26.5625V32.8125H36.1875C34.8333 32.8125 33.7135 33.2552 32.8281 34.1406C31.9427 35.026 31.5 36.1458 31.5 37.5C31.5 38.8542 31.9427 39.974 32.8281 40.8594C33.7135 41.7448 34.8333 42.1875 36.1875 42.1875H42.4375V48.4375C42.4375 49.7917 42.8802 50.9115 43.7656 51.7969C44.651 52.6823 45.7708 53.125 47.125 53.125Z" fill="url(#gradient2)"/></svg>`,
    },
    title: `Hobby's`,
    content: `In mijn vrije tijd hou ik van gamen, programmeren en mountainbiken.`,
  },
  {
    svg: {
      template: `<svg width="138" height="114" viewBox="0 0 138 114" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8e43fe"/>
            <stop offset="100%" style="stop-color:#eb43fe"/>
          </linearGradient>
        </defs>
        <path d="M6.5 113.25C4.72917 113.25 3.24479 112.651 2.04687 111.453C0.848958 110.255 0.25 108.771 0.25 107C0.25 105.229 0.848958 103.745 2.04687 102.547C3.24479 101.349 4.72917 100.75 6.5 100.75H131.5C133.271 100.75 134.755 101.349 135.953 102.547C137.151 103.745 137.75 105.229 137.75 107C137.75 108.771 137.151 110.255 135.953 111.453C134.755 112.651 133.271 113.25 131.5 113.25H6.5ZM19 94.5C15.5625 94.5 12.6198 93.276 10.1719 90.8281C7.72396 88.3802 6.5 85.4375 6.5 82V13.25C6.5 9.8125 7.72396 6.86979 10.1719 4.42188C12.6198 1.97396 15.5625 0.75 19 0.75H119C122.438 0.75 125.38 1.97396 127.828 4.42188C130.276 6.86979 131.5 9.8125 131.5 13.25V82C131.5 85.4375 130.276 88.3802 127.828 90.8281C125.38 93.276 122.438 94.5 119 94.5H19ZM19 82H119V13.25H19V82Z" fill="url(#gradient3)"/></svg>`,
    },
    title: 'Programmeren',
    content: `Ik doe de opleiding software developer op het <a class="href" href="https://www.alfa-college.nl/groningen/boumaboulevard-573">Alfa-college</a>.`,
  },
]

const cardRefs = ref<HTMLElement[]>([])
const statRefs = ref<HTMLElement[]>([])
const cardStyles = reactive([{}, {}, {}, {}, {}, {}])

function handleTilt(e: MouseEvent, idx: number) {
  const card = idx < 3 ? cardRefs.value[idx] : statRefs.value[idx - 4]
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * 15
  const rotateY = ((x - centerX) / centerX) * 15
  cardStyles[idx] = {
    transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    transition: 'transform 0.1s',
    zIndex: 2,
  }
}

function resetTilt(idx: number) {
  cardStyles[idx] = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.3s',
    zIndex: 1,
  }
}

async function fetchGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/users/rvspijker', {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })
    if (!response.ok) throw new Error('Failed to fetch GitHub stats')
    const data = await response.json()
    Object.assign(githubStats, {
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
    })
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
  }
}

onMounted(() => {
  fetchGitHubStats()
})
</script>
<style scoped>
.card {
  transition:
    transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99),
    box-shadow 0.3s;
  will-change: transform;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 12px 0px;
}
.card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.github-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
}

.github-stats {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.stat-number {
  background: linear-gradient(1deg, #8e43fe, #eb43fe);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: bold;
}

.card-stat {
  transition:
    transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99),
    box-shadow 0.3s;
  will-change: transform;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
}

.card-stat:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}
</style>
