<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    seed: number
    palette: string[]
    ratio?: number
    image?: string
  }>(),
  { ratio: 0.8 },
)

const W = 400
const H = computed(() => Math.round(W / props.ratio))
const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

// Small seeded random generator so each placeholder painting is stable.
function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const col = (i: number) => props.palette[i] ?? '#16251d'

const scene = computed(() => {
  const r = rng(props.seed)
  const h = H.value
  const orb = {
    cx: W * (0.25 + r() * 0.5),
    cy: h * (0.2 + r() * 0.18),
    r: W * (0.09 + r() * 0.09),
  }
  const ridges = [0, 1, 2, 3].map((i) => {
    const base = h * (0.42 + i * 0.14)
    const amp = h * (0.05 + r() * 0.07)
    const steps = 6
    const pts: Array<[number, number]> = []
    for (let s = 0; s <= steps; s++) {
      pts.push([(W / steps) * s, base + (r() - 0.5) * 2 * amp])
    }
    let d = `M0 ${h} L0 ${pts[0]![1].toFixed(1)}`
    for (let s = 1; s < pts.length; s++) {
      const [px, py] = pts[s - 1]!
      const [x, y] = pts[s]!
      d += ` Q${px.toFixed(1)} ${py.toFixed(1)} ${((px + x) / 2).toFixed(1)} ${((py + y) / 2).toFixed(1)}`
    }
    const last = pts[pts.length - 1]!
    d += ` L${W} ${last[1].toFixed(1)} L${W} ${h} Z`
    return { d, fill: col(3 + i) }
  })
  return { orb, ridges }
})
</script>

<template>
  <img
    v-if="image"
    :src="image"
    :alt="title"
    loading="lazy"
    class="art"
    :style="{ aspectRatio: String(ratio) }"
  />
  <svg
    v-else
    class="art"
    :viewBox="`0 0 ${W} ${H}`"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    :aria-label="title"
  >
    <defs>
      <linearGradient :id="`${uid}-sky`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="col(0)" />
        <stop offset="1" :stop-color="col(1)" />
      </linearGradient>
      <filter :id="`${uid}-grain`" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" :seed="seed" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
    <rect :width="W" :height="H" :fill="`url(#${uid}-sky)`" />
    <circle :cx="scene.orb.cx" :cy="scene.orb.cy" :r="scene.orb.r" :fill="col(2)" opacity="0.92" />
    <path v-for="(ridge, i) in scene.ridges" :key="i" :d="ridge.d" :fill="ridge.fill" />
    <rect :width="W" :height="H" :filter="`url(#${uid}-grain)`" opacity="0.18" style="mix-blend-mode: soft-light" />
  </svg>
</template>

<style>
.art {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
