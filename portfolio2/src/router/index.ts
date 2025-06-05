import { createRouter, createWebHistory } from 'vue-router'
import Projects from '../components/Projects.vue'
import Project from '../components/Project.vue'
import Contact from '../components/Contact.vue'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { transition: 'fade' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { transition: 'fade' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: { transition: 'fade' },
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true,
      meta: { transition: 'fade' },
    },
  ],
})

export default router
