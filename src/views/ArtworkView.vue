<script setup lang="ts">
import { computed, ref } from 'vue'
import ArtPiece from '../components/ArtPiece.vue'
import { artworks, categories, type Artwork } from '../data/site'

const filter = ref<(typeof categories)[number]>('All')
const active = ref<Artwork | null>(null)
const dialog = ref<HTMLDialogElement | null>(null)

const visible = computed(() =>
  filter.value === 'All' ? artworks : artworks.filter((a) => a.category === filter.value),
)

function openPiece(piece: Artwork) {
  active.value = piece
  dialog.value?.showModal()
}

function closePiece() {
  dialog.value?.close()
}

function onDialogClick(e: MouseEvent) {
  // Clicking the dark backdrop (the dialog element itself) closes it.
  if (e.target === dialog.value) closePiece()
}
</script>

<template>
  <section class="container page-head">
    <h1>Artwork</h1>
    <p>Originals, commissions and small studies. Select a piece to see the details.</p>
  </section>

  <section class="container gallery-wrap">
    <div class="filters" role="group" aria-label="Filter artwork">
      <button
        v-for="c in categories"
        :key="c"
        type="button"
        class="filter"
        :aria-pressed="filter === c"
        @click="filter = c"
      >
        {{ c }}
      </button>
    </div>

    <div class="gallery">
      <figure v-for="piece in visible" :key="piece.id" class="item">
        <button type="button" class="open" :aria-label="`View ${piece.title}`" @click="openPiece(piece)">
          <ArtPiece v-bind="piece" />
        </button>
        <figcaption>
          <span class="cap-title">{{ piece.title }}</span>
          <span class="muted">{{ piece.medium }}, {{ piece.year }}</span>
          <span class="status" :class="piece.status.toLowerCase()">{{ piece.status }}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <dialog ref="dialog" class="lightbox" aria-labelledby="lb-title" @click="onDialogClick" @close="active = null">
    <div v-if="active" class="lb-body">
      <div class="lb-art">
        <ArtPiece v-bind="active" />
      </div>
      <div class="lb-info">
        <h2 id="lb-title">{{ active.title }}</h2>
        <p class="muted">{{ active.blurb }}</p>
        <dl>
          <div><dt>Medium</dt><dd>{{ active.medium }}</dd></div>
          <div><dt>Size</dt><dd>{{ active.size }}</dd></div>
          <div><dt>Year</dt><dd>{{ active.year }}</dd></div>
          <div><dt>Status</dt><dd>{{ active.status }}</dd></div>
        </dl>
        <div class="lb-actions">
          <RouterLink
            v-if="active.status === 'Available'"
            class="btn btn-primary"
            :to="{ path: '/contact', query: { topic: 'Buy an original', message: `I am interested in \u201C${active.title}\u201D.` } }"
          >
            Ask about this piece
          </RouterLink>
          <RouterLink
            v-else
            class="btn btn-primary"
            :to="{ path: '/contact', query: { topic: 'Commission request', message: `I would like something similar to \u201C${active.title}\u201D.` } }"
          >
            Commission something similar
          </RouterLink>
          <button type="button" class="btn btn-ghost" @click="closePiece">Close</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.gallery-wrap {
  padding-bottom: var(--section);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}
.filter {
  font: inherit;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.45rem 1.1rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;
}
.filter:hover {
  color: var(--text);
  border-color: var(--muted);
}
.filter[aria-pressed='true'] {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
}

.gallery {
  columns: 3 260px;
  column-gap: clamp(1rem, 3vw, 2rem);
}
.item {
  margin: 0 0 clamp(1.5rem, 3vw, 2.25rem);
  break-inside: avoid;
}
.open {
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid var(--line);
  background: none;
  cursor: zoom-in;
  transition: border-color 0.2s;
}
.open:hover {
  border-color: var(--accent);
}

figcaption {
  display: flex;
  flex-direction: column;
  margin-top: 0.6rem;
  font-size: 0.95rem;
}
.cap-title {
  font-family: var(--serif);
  font-size: 1.15rem;
}
.status {
  color: var(--accent);
  font-size: 0.9rem;
}
.status.sold,
.status.commissioned {
  color: var(--muted);
}

/* Lightbox */
.lightbox {
  width: min(1000px, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  padding: 0;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--text);
  overflow: auto;
}
.lightbox::backdrop {
  background: rgb(5 10 7 / 0.82);
}
.lb-body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
}
.lb-art {
  background: var(--bg);
  padding: clamp(1rem, 3vw, 2rem);
  display: flex;
  align-items: center;
}
.lb-info {
  padding: clamp(1.5rem, 3vw, 2.5rem);
}
.lb-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
dl {
  margin: 1.5rem 0;
}
dl div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.6rem;
  border-bottom: 1px solid var(--line);
}
dt {
  color: var(--muted);
}
dd {
  margin: 0;
  text-align: right;
}
.lb-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 760px) {
  .lb-body {
    grid-template-columns: 1fr;
  }
}
</style>
