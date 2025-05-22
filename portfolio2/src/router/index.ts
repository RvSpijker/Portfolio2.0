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
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true,
    },
  ],
})

export default router
