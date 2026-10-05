<script setup lang="ts">
import { ref } from 'vue'
import { Instagram, Mail, ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-vue-next'
import heroArt from './assets/site-reference.png'

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  closeMenu()
}

const artworks = [
  { title: 'The Gaze', type: 'Portrait', className: 'art-one' },
  { title: 'Wild Within', type: 'Animal Study', className: 'art-two' },
  { title: 'Where Earth Meets Sky', type: 'Landscape', className: 'art-three' },
  { title: 'Stillness', type: 'Portrait', className: 'art-four' },
  { title: 'After Dark', type: 'Original', className: 'art-five' },
  { title: 'Untamed', type: 'Original', className: 'art-six' },
]

const prices = [
  { size: 'Small', detail: 'A4 / A3', price: 'R800 — R2 000' },
  { size: 'Medium', detail: 'A2', price: 'R2 000 — R4 000' },
  { size: 'Large', detail: 'A1+', price: 'R4 000 — R8 000+' },
  { size: 'Custom', detail: 'Commission', price: 'Price on request' },
]
</script>

<template>
  <div class="site-shell">
    <header class="navbar">
      <button class="brand" @click="scrollTo('home')" aria-label="Go to home">
        <span>Seth</span> Greenan
      </button>

      <nav class="desktop-nav" aria-label="Main navigation">
        <button class="active" @click="scrollTo('home')">Home</button>
        <button @click="scrollTo('artwork')">Artwork</button>
        <button @click="scrollTo('about')">About</button>
        <button @click="scrollTo('pricing')">Pricing</button>
        <button @click="scrollTo('contact')">Contact</button>
      </nav>

      <div class="nav-socials">
        <a href="https://instagram.com/sethgreenan" target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram :size="20" />
        </a>
        <a href="mailto:sethgreenan@gmail.com" aria-label="Email Seth">
          <Mail :size="20" />
        </a>
      </div>

      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <X v-if="menuOpen" />
        <Menu v-else />
      </button>
    </header>

    <div v-if="menuOpen" class="mobile-menu">
      <button @click="scrollTo('home')">Home</button>
      <button @click="scrollTo('artwork')">Artwork</button>
      <button @click="scrollTo('about')">About</button>
      <button @click="scrollTo('pricing')">Pricing</button>
      <button @click="scrollTo('contact')">Contact</button>
    </div>

    <main>
      <section id="home" class="hero">
        <div class="hero-image" :style="{ backgroundImage: `url(${heroArt})` }"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="eyebrow">Original artwork by</p>
          <h1>Seth<br /><em>Greenan</em></h1>
          <div class="hero-meta">
            <span>Realism</span><b>/</b><span>Portraits</span><b>/</b><span>Custom Pieces</span>
          </div>
          <div class="accent-line"></div>
          <button class="hero-link" @click="scrollTo('artwork')">
            Explore the work <ArrowDownRight :size="18" />
          </button>
        </div>
        <div class="hero-number">01 / 05</div>
      </section>

      <section id="artwork" class="section artwork-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Selected work</p>
            <h2>Featured <span>Artwork</span></h2>
          </div>
          <button class="text-link" @click="scrollTo('contact')">
            Commission a piece <ArrowUpRight :size="17" />
          </button>
        </div>

        <div class="art-grid">
          <article v-for="(art, index) in artworks" :key="art.title" class="art-card" :class="art.className">
            <div class="art-placeholder">
              <span class="art-number">0{{ index + 1 }}</span>
              <div class="art-mark"></div>
            </div>
            <div class="art-info">
              <div>
                <h3>{{ art.title }}</h3>
                <p>{{ art.type }}</p>
              </div>
              <ArrowUpRight :size="18" />
            </div>
          </article>
        </div>
      </section>

      <section id="about" class="about-section">
        <div class="about-image">
          <div class="portrait-frame">
            <div class="portrait-art"></div>
            <span class="signature">SG</span>
          </div>
        </div>
        <div class="about-copy">
          <p class="eyebrow">The artist</p>
          <h2>About <span>Seth</span></h2>
          <p class="lead">
            I create artwork that sits somewhere between realism and emotion — pieces
            built to make you stop, look closer, and feel something.
          </p>
          <p>
            My work is inspired by people, nature, movement and the stories hidden
            inside ordinary moments. Every piece is created with patience and an
            obsession with detail, texture and character.
          </p>
          <p>
            Whether you're looking for an original artwork or want something made
            specifically for you, I’m always open to creating something personal.
          </p>
          <div class="signature-line">Seth Greenan</div>
        </div>
      </section>

      <section id="pricing" class="section pricing-section">
        <div class="pricing-intro">
          <p class="eyebrow">Commission guide</p>
          <h2>Art that feels<br /><span>personal.</span></h2>
          <p>
            Prices vary depending on size, medium, subject and level of detail.
            Use this as a starting point — custom requests can be quoted directly.
          </p>
          <button class="outline-button" @click="scrollTo('contact')">
            Ask for a quote <ArrowUpRight :size="17" />
          </button>
        </div>

        <div class="price-list">
          <div v-for="item in prices" :key="item.size" class="price-row">
            <div class="price-size">
              <strong>{{ item.size }}</strong>
              <span>{{ item.detail }}</span>
            </div>
            <strong class="price">{{ item.price }}</strong>
          </div>
          <p class="price-note">Final pricing is confirmed before work begins.</p>
        </div>
      </section>

      <section id="contact" class="contact-section">
        <div class="contact-bg"></div>
        <div class="contact-content">
          <p class="eyebrow">Let's make something</p>
          <h2>Have an idea?<br /><span>Let's talk.</span></h2>
          <p class="contact-copy">
            For commissions, original artwork, availability or any questions,
            get in touch directly.
          </p>
          <div class="contact-links">
            <a href="mailto:sethgreenan@gmail.com" class="contact-link">
              <span class="contact-icon"><Mail :size="22" /></span>
              <span><small>Email</small><strong>sethgreenan@gmail.com</strong></span>
              <ArrowUpRight :size="18" />
            </a>
            <a href="https://instagram.com/sethgreenan" target="_blank" rel="noreferrer" class="contact-link">
              <span class="contact-icon"><Instagram :size="22" /></span>
              <span><small>Instagram</small><strong>@sethgreenan</strong></span>
              <ArrowUpRight :size="18" />
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <span>© {{ new Date().getFullYear() }} Seth Greenan</span>
      <span>Original art & commissions</span>
    </footer>
  </div>
</template>