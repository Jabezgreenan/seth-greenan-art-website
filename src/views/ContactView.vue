<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { artist } from '../data/site'

const route = useRoute()
const topics = ['Commission request', 'Buy an original', 'Prints', 'Something else']

function fromQuery(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

const form = reactive({
  name: '',
  email: '',
  topic: topics.includes(fromQuery(route.query.topic)) ? fromQuery(route.query.topic) : topics[0]!,
  message: fromQuery(route.query.message),
})

const sent = ref(false)

function submit() {
  // There is no server behind this site, so the form opens the visitor's email app
  // with the message filled in. See README.md for how to swap in a form service.
  const subject = encodeURIComponent(`${form.topic} from ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
  window.location.href = `mailto:${artist.email}?subject=${subject}&body=${body}`
  sent.value = true
}
</script>

<template>
  <section class="container page-head">
    <h1>Contact</h1>
    <p>Tell Seth what you have in mind. He replies within two working days.</p>
  </section>

  <section class="container layout">
    <form class="form" @submit.prevent="submit">
      <div class="field">
        <label for="name">Your name</label>
        <input id="name" v-model.trim="form.name" type="text" autocomplete="name" required />
      </div>

      <div class="field">
        <label for="email">Your email</label>
        <input id="email" v-model.trim="form.email" type="email" autocomplete="email" required />
      </div>

      <div class="field">
        <label for="topic">What is this about?</label>
        <select id="topic" v-model="form.topic">
          <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <div class="field">
        <label for="message">Message</label>
        <textarea id="message" v-model="form.message" rows="7" required placeholder="What would you like painted, and roughly what size?"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Send message</button>

      <p v-if="sent" class="sent" role="status">
        Your email app should open with the message ready to send. If it does not, write to
        <a class="text-link" :href="`mailto:${artist.email}`">{{ artist.email }}</a>.
      </p>
    </form>

    <aside class="direct">
      <h2>Prefer to write directly?</h2>
      <dl>
        <div>
          <dt>Email</dt>
          <dd><a class="text-link" :href="`mailto:${artist.email}`">{{ artist.email }}</a></dd>
        </div>
        <div>
          <dt>Instagram</dt>
          <dd><a class="text-link" :href="artist.instagram.url" target="_blank" rel="noopener">{{ artist.instagram.handle }}</a></dd>
        </div>
        <div>
          <dt>Commissions</dt>
          <dd>{{ artist.commissionsOpen ? 'Open' : 'Closed for now' }}</dd>
        </div>
      </dl>
      <p class="muted">
        Not sure what a piece would cost? See the <RouterLink to="/pricing" class="text-link">pricing page</RouterLink>.
      </p>
    </aside>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.8fr);
  gap: clamp(2rem, 6vw, 5rem);
  padding-bottom: var(--section);
  align-items: start;
}

.field {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
}
input,
select,
textarea {
  width: 100%;
  font: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 0.8rem 1rem;
  transition: border-color 0.2s;
}
input:hover,
select:hover,
textarea:hover {
  border-color: var(--muted);
}
input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent);
}
textarea {
  resize: vertical;
}

.sent {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border-left: 3px solid var(--accent);
}

.direct h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}
dl {
  margin: 0 0 1.5rem;
}
dl div {
  padding-block: 0.9rem;
  border-top: 1px solid var(--line);
}
dl div:last-child {
  border-bottom: 1px solid var(--line);
}
dt {
  color: var(--muted);
  font-size: 0.95rem;
}
dd {
  margin: 0.15rem 0 0;
  font-size: 1.1rem;
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
