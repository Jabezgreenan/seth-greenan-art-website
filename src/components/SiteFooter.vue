<script setup lang="ts">
import { artist } from '../data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container inner">
      <p class="copy">&copy; {{ year }} {{ artist.name }}</p>
      <nav class="links" aria-label="Footer">
        <RouterLink to="/artwork">Artwork</RouterLink>
        <RouterLink to="/pricing">Pricing</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <a :href="artist.instagram.url" target="_blank" rel="noopener">Instagram</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 2.5rem;
  color: var(--muted);
  font-size: 0.95rem;
}
.inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.copy {
  margin: 0;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}
.links a {
  text-decoration: none;
}
.links a:hover {
  color: var(--accent);
}
</style>
