<script setup lang="ts">
import ArtPiece from '../components/ArtPiece.vue'
import { artist, artworks, tiers, currency, about } from '../data/site'

const hero = artworks.find((a) => a.featured) ?? artworks[0]!
const selected = artworks.filter((a) => a.featured && a.id !== hero.id)
const startingPrice = Math.min(...tiers.map((t) => t.from))
</script>

<template>
  <section class="hero container">
    <div class="hero-text">
      <h1>Seth<br />Greenan</h1>
      <p class="lede">{{ about.lead }}</p>
      <div class="actions">
        <RouterLink to="/artwork" class="btn btn-primary">View artwork</RouterLink>
        <RouterLink to="/pricing" class="btn btn-ghost">See pricing</RouterLink>
      </div>
    </div>

    <figure class="hero-art">
      <div class="frame">
        <ArtPiece v-bind="hero" />
      </div>
      <figcaption>
        <span class="cap-title">{{ hero.title }}</span>
        <span class="muted">{{ hero.medium }}, {{ hero.year }}</span>
      </figcaption>
    </figure>
  </section>

  <section class="section container">
    <div class="head">
      <h2>Recent work</h2>
      <RouterLink to="/artwork" class="text-link">All artwork</RouterLink>
    </div>

    <div class="selected">
      <figure v-for="piece in selected" :key="piece.id" :style="{ flexGrow: piece.ratio }">
        <RouterLink to="/artwork" class="piece-link" :aria-label="`${piece.title}, view artwork`">
          <ArtPiece v-bind="piece" />
        </RouterLink>
        <figcaption>
          <span class="cap-title">{{ piece.title }}</span>
          <span class="muted">{{ piece.medium }}, {{ piece.year }}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="strip">
    <div class="container strip-inner">
      <div>
        <h2>{{ artist.commissionsOpen ? 'Commissions are open' : 'Commissions are closed for now' }}</h2>
        <p class="muted">
          Have a place, pet or person you would like painted? Prices start at {{ currency }}{{ startingPrice }}.
        </p>
      </div>
      <div class="actions">
        <RouterLink to="/pricing" class="btn btn-ghost">How much it costs</RouterLink>
        <RouterLink to="/contact" class="btn btn-primary">Start a commission</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
  padding-block: clamp(3rem, 8vw, 6rem);
}

.hero-text .lede {
  margin-top: 2rem;
  max-width: 24ch;
  color: var(--muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.hero-art {
  margin: 0;
}

.frame {
  padding: clamp(0.5rem, 1.2vw, 0.9rem);
  background: var(--surface);
  border: 1px solid var(--line);
  /* The one moment of motion on the site: the painting is revealed on load. */
  animation: reveal 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes reveal {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

figcaption {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  font-size: 0.95rem;
}
.cap-title {
  font-family: var(--serif);
  font-size: 1.15rem;
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.selected {
  display: flex;
  gap: clamp(1rem, 3vw, 2.5rem);
  align-items: flex-end;
}
.selected figure {
  margin: 0;
  flex-basis: 0;
  min-width: 0;
}
.piece-link {
  display: block;
  border: 1px solid var(--line);
  transition: border-color 0.2s;
}
.piece-link:hover {
  border-color: var(--accent);
}

.strip {
  background: var(--surface);
  border-block: 1px solid var(--line);
}
.strip-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-block: clamp(3rem, 6vw, 4.5rem);
}
.strip-inner p {
  margin: 0.75rem 0 0;
}
.strip .actions {
  margin: 0;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .selected {
    flex-direction: column;
    align-items: stretch;
  }
  .selected figure {
    flex-basis: auto;
  }
}
</style>
