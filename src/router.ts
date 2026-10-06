import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ArtworkView from './views/ArtworkView.vue'
import PricingView from './views/PricingView.vue'
import AboutView from './views/AboutView.vue'
import ContactView from './views/ContactView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Artist' } },
    { path: '/artwork', name: 'artwork', component: ArtworkView, meta: { title: 'Artwork' } },
    { path: '/pricing', name: 'pricing', component: PricingView, meta: { title: 'Pricing' } },
    { path: '/about', name: 'about', component: AboutView, meta: { title: 'About' } },
    { path: '/contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 }
  },
})

router.afterEach((to) => {
  const page = to.meta.title
  document.title = page ? `${page} | Seth Greenan` : 'Seth Greenan'
})

export default router
