<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { artist } from '../data/site'

const route = useRoute()
const open = ref(false)

const links = [
  { to: '/artwork', label: 'Artwork' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="wordmark">{{ artist.name }}</RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="primary-nav"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>

      <nav id="primary-nav" class="nav" :class="{ open }" aria-label="Main">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/contact" class="btn btn-primary nav-cta">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.5rem;
  gap: 1rem;
}

.wordmark {
  font-family: var(--serif);
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--muted);
  padding-block: 0.25rem;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}
.nav-link:hover {
  color: var(--text);
}
.nav-link.router-link-active {
  color: var(--text);
  border-bottom-color: var(--accent);
}

.nav-cta {
  padding: 0.55rem 1.2rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 999px;
  padding: 0.45rem 1rem;
  font: inherit;
  cursor: pointer;
}

@media (max-width: 760px) {
  .menu-toggle {
    display: inline-block;
  }
  .nav {
    display: none;
    position: absolute;
    inset: 100% 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem var(--gutter) 1.5rem;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .nav.open {
    display: flex;
  }
  .nav-link {
    padding-block: 0.9rem;
    border-bottom: 1px solid var(--line);
    font-size: 1.15rem;
  }
  .nav-cta {
    margin-top: 1rem;
  }
}
</style>
