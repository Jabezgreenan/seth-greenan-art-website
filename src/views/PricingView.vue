<script setup lang="ts">
import { computed, ref } from 'vue'
import { addOns, currency, faq, process, sizes, terms, tiers, artist } from '../data/site'

const tierId = ref(tiers[0]!.id)
const sizeId = ref(sizes[0]!.id)
const chosenAddOns = ref<string[]>([])

const tier = computed(() => tiers.find((t) => t.id === tierId.value) ?? tiers[0]!)
const size = computed(() => sizes.find((s) => s.id === sizeId.value) ?? sizes[0]!)
const extras = computed(() => addOns.filter((a) => chosenAddOns.value.includes(a.id)))

const total = computed(
  () => tier.value.from + size.value.amount + extras.value.reduce((sum, a) => sum + a.amount, 0),
)

const money = (n: number) => `${currency}${n.toLocaleString('en-US')}`

const enquiry = computed(() => {
  const parts = [`${tier.value.name}`, `${size.value.label} (${size.value.note})`, ...extras.value.map((a) => a.label)]
  return {
    path: '/contact',
    query: {
      topic: 'Commission request',
      message: `I would like a quote for: ${parts.join(', ')}. Estimated at ${money(total.value)}.\n\nWhat I have in mind: `,
    },
  }
})
</script>

<template>
  <section class="container page-head">
    <h1>Pricing</h1>
    <p>
      Every piece is made to order. These are starting prices, and you get a fixed quote before any
      work begins.
      <span v-if="!artist.commissionsOpen"> Commissions are currently closed.</span>
    </p>
  </section>

  <section class="container block">
    <h2 class="visually-lead">What you can commission</h2>
    <ul class="tiers">
      <li v-for="t in tiers" :key="t.id" class="tier">
        <div class="tier-main">
          <h3>{{ t.name }}</h3>
          <p class="muted">{{ t.blurb }}</p>
          <ul class="includes">
            <li v-for="item in t.includes" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="tier-price">
          <span class="from muted">from</span>
          <span class="amount">{{ money(t.from) }}</span>
          <span class="muted time">{{ t.turnaround }}</span>
        </div>
      </li>
    </ul>
  </section>

  <section class="container block">
    <h2>Work out a price</h2>
    <p class="muted">Choose what you want and see an estimate. Seth confirms the final price in your quote.</p>

    <div class="estimator">
      <div class="controls">
        <fieldset>
          <legend>Type of piece</legend>
          <label v-for="t in tiers" :key="t.id" class="choice">
            <input v-model="tierId" type="radio" name="tier" :value="t.id" />
            <span>{{ t.name }}</span>
            <span class="muted">{{ money(t.from) }}</span>
          </label>
        </fieldset>

        <fieldset>
          <legend>Size</legend>
          <label v-for="s in sizes" :key="s.id" class="choice">
            <input v-model="sizeId" type="radio" name="size" :value="s.id" />
            <span>{{ s.label }} <span class="muted">{{ s.note }}</span></span>
            <span class="muted">{{ s.amount ? `+${money(s.amount)}` : 'Included' }}</span>
          </label>
        </fieldset>

        <fieldset>
          <legend>Extras</legend>
          <label v-for="a in addOns" :key="a.id" class="choice">
            <input v-model="chosenAddOns" type="checkbox" :value="a.id" />
            <span>{{ a.label }} <span class="muted">{{ a.note }}</span></span>
            <span class="muted">+{{ money(a.amount) }}</span>
          </label>
        </fieldset>
      </div>

      <aside class="summary" aria-live="polite">
        <p class="muted">Estimated price</p>
        <p class="total">{{ money(total) }}</p>
        <p class="muted small">
          {{ tier.name }}, {{ size.label.toLowerCase() }}<template v-if="extras.length">, {{ extras.map((a) => a.label.toLowerCase()).join(', ') }}</template>.
          Shipping is quoted separately.
        </p>
        <RouterLink :to="enquiry" class="btn btn-primary">Request this quote</RouterLink>
      </aside>
    </div>
  </section>

  <section class="container block">
    <h2>How it works</h2>
    <ol class="steps">
      <li v-for="step in process" :key="step.title">
        <h3>{{ step.title }}</h3>
        <p class="muted">{{ step.detail }}</p>
      </li>
    </ol>
  </section>

  <section class="container block two-col">
    <div>
      <h2>Terms</h2>
      <ul class="terms">
        <li v-for="term in terms" :key="term">{{ term }}</li>
      </ul>
    </div>
    <div>
      <h2>Questions</h2>
      <details v-for="item in faq" :key="item.q" class="faq">
        <summary>{{ item.q }}</summary>
        <p class="muted">{{ item.a }}</p>
      </details>
    </div>
  </section>

  <section class="container end">
    <h2>Ready to start?</h2>
    <p class="muted">Tell Seth what you have in mind. There is no charge for a quote.</p>
    <RouterLink to="/contact" class="btn btn-primary">Contact Seth</RouterLink>
  </section>
</template>

<style scoped>
.block {
  padding-bottom: var(--section);
}
.block > h2 {
  margin-bottom: 1rem;
}
.visually-lead {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

/* Tier list: a menu-style list, not cards */
.tiers {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}
.tier {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  padding-block: 2rem;
  border-bottom: 1px solid var(--line);
}
.tier h3 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  margin-bottom: 0.5rem;
}
.includes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  font-size: 0.95rem;
}
.includes li::before {
  content: '';
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: middle;
}
.tier-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}
.amount {
  font-family: var(--serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1;
  color: var(--brass);
}
.time {
  margin-top: 0.5rem;
  font-size: 0.95rem;
}

/* Estimator */
.estimator {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: 2rem;
  align-items: start;
}
fieldset {
  border: 0;
  padding: 0;
  margin: 0 0 2rem;
}
legend {
  font-family: var(--serif);
  font-size: 1.35rem;
  padding: 0;
  margin-bottom: 0.5rem;
}
.choice {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.9rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
}
.choice input {
  width: 1.15rem;
  height: 1.15rem;
  accent-color: var(--accent);
}
.summary {
  position: sticky;
  top: 6.5rem;
  padding: clamp(1.5rem, 3vw, 2rem);
  background: var(--surface);
  border: 1px solid var(--line);
}
.summary p {
  margin-bottom: 0.5rem;
}
.total {
  font-family: var(--serif);
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 1;
  color: var(--brass);
  margin: 0.25rem 0 1rem !important;
}
.small {
  font-size: 0.9rem;
  margin-bottom: 1.5rem !important;
}

/* Steps: a real sequence, so numbering is meaningful here */
.steps {
  list-style: none;
  counter-reset: step;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  gap: 0;
}
.steps li {
  counter-increment: step;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  column-gap: 1rem;
  padding-block: 1.25rem;
  border-top: 1px solid var(--line);
}
.steps li::before {
  content: counter(step);
  grid-row: span 2;
  font-family: var(--serif);
  font-size: 2rem;
  color: var(--accent);
  line-height: 1.1;
}
.steps h3 {
  font-size: 1.35rem;
}
.steps p {
  margin: 0.25rem 0 0;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 5vw, 4rem);
}
.terms {
  margin: 1.5rem 0 0;
  padding-left: 1.2rem;
}
.terms li {
  margin-bottom: 0.9rem;
  padding-left: 0.3rem;
}
.terms li::marker {
  color: var(--accent);
}

.faq {
  border-top: 1px solid var(--line);
  padding-block: 1rem;
}
.faq:last-of-type {
  border-bottom: 1px solid var(--line);
}
.faq summary {
  cursor: pointer;
  font-weight: 500;
}
.faq p {
  margin: 0.75rem 0 0;
}

.end {
  text-align: center;
  padding-block: var(--section);
  border-top: 1px solid var(--line);
}
.end p {
  margin-inline: auto;
  margin-block: 1rem 2rem;
}

@media (max-width: 860px) {
  .tier {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .tier-price {
    align-items: flex-start;
    text-align: left;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 0.75rem;
  }
  .time {
    margin-top: 0;
  }
  .estimator,
  .two-col {
    grid-template-columns: 1fr;
  }
  .summary {
    position: static;
  }
}
</style>
