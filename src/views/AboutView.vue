<script setup lang="ts">
import ArtPiece from '../components/ArtPiece.vue'
import { about, artworks } from '../data/site'

// Replace this with a real photo of Seth by setting `portrait` to an image path, e.g. '/art/seth.jpg'.
const portrait = undefined as string | undefined
const stand = artworks.find((a) => a.id === 'night-crossing') ?? artworks[0]!
</script>

<template>
  <section class="container page-head">
    <h1>About</h1>
  </section>

  <section class="container layout">
    <div class="copy">
      <p class="lede">{{ about.lead }}</p>
      <p v-for="(para, i) in about.body" :key="i">{{ para }}</p>

      <h2 class="sub">Working with Seth</h2>
      <dl>
        <div v-for="item in about.working" :key="item.term">
          <dt>{{ item.term }}</dt>
          <dd>{{ item.detail }}</dd>
        </div>
      </dl>

      <div class="actions">
        <RouterLink to="/contact" class="btn btn-primary">Get in touch</RouterLink>
        <RouterLink to="/pricing" class="btn btn-ghost">See pricing</RouterLink>
      </div>
    </div>

    <figure class="portrait">
      <div class="frame">
        <img v-if="portrait" :src="portrait" alt="Seth Greenan in his studio" />
        <ArtPiece v-else v-bind="stand" :ratio="0.8" />
      </div>
      <figcaption class="muted">Add a photo of Seth here.</figcaption>
    </figure>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: clamp(2rem, 6vw, 5rem);
  padding-bottom: var(--section);
  align-items: start;
}

.lede {
  margin-bottom: 1.5rem;
}

.sub {
  font-size: 1.75rem;
  margin: 3rem 0 1rem;
}

dl {
  margin: 0;
}
dl div {
  padding-block: 1.1rem;
  border-top: 1px solid var(--line);
}
dl div:last-child {
  border-bottom: 1px solid var(--line);
}
dt {
  font-family: var(--serif);
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}
dd {
  margin: 0;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

.portrait {
  margin: 0;
  position: sticky;
  top: 6.5rem;
}
.frame {
  padding: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--line);
}
.frame img {
  width: 100%;
}
figcaption {
  margin-top: 0.6rem;
  font-size: 0.9rem;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .portrait {
    position: static;
    order: -1;
    max-width: 22rem;
  }
}
</style>
