/**
 * All the editable content for the site lives in this file.
 * Everything here is placeholder text and prices: replace it with Seth's real details.
 *
 * To use a real photo of a piece, drop the image in /public/art/ and set
 * `image: '/art/your-file.jpg'` on that artwork. Without `image`, a generated
 * placeholder painting is shown instead.
 */

export const artist = {
  name: 'Seth Greenan',
  email: 'sethgreenan6@gmail.com',
  instagram: { handle: '@_seth_art25_', url: 'https://www.instagram.com/_seth_art25_?stkn=MTE4cjQ0dGs1cDd5bg%3D%3D&utm_source=qr' },
  commissionsOpen: true,
}

export const currency = '$'

export type ArtCategory = 'Originals' | 'Commissions' | 'Studies'
export type ArtStatus = 'Available' | 'Sold' | 'Commissioned'

export interface Artwork {
  id: string
  title: string
  year: number
  medium: string
  size: string
  category: ArtCategory
  status: ArtStatus
  blurb: string
  featured?: boolean
  /** Path to a real image, e.g. '/art/low-tide.jpg'. Optional. */
  image?: string
  /** Width divided by height. Used for layout and the placeholder painting. */
  ratio: number
  /** Seed and palette only drive the generated placeholder. */
  seed: number
  palette: string[]
}

const dusk = ['#1b3a2f', '#e0b878', '#f2d9a0', '#2c5a45', '#234a39', '#183a2c', '#0e2a20']
const moss = ['#a9c9a0', '#e9efd9', '#fff4cf', '#7aa57d', '#4f8061', '#2e5c47', '#16382b']
const night = ['#0a1a2a', '#26485a', '#e8e2c4', '#1d3b4d', '#17313f', '#10242f', '#0a1a22']
const ember = ['#3b1f1a', '#d78a5a', '#ffd9a0', '#7a3a2a', '#5c2b22', '#3d1c18', '#24100e']
const mist = ['#cfd8d0', '#f2efe6', '#ffffff', '#9db4a6', '#7b9a8a', '#587a6b', '#3a5a4c']
const teal = ['#0f3a3f', '#4aa39a', '#f4e9b8', '#1f6a68', '#175457', '#0f3e42', '#082a2d']

export const artworks: Artwork[] = [
  {
    id: 'low-tide-at-dusk',
    title: 'Low Tide at Dusk',
    year: 2025,
    medium: 'Oil on canvas',
    size: '60 × 75 cm',
    category: 'Originals',
    status: 'Available',
    blurb: 'The last light sitting on wet sand, just before the tide turns.',
    featured: true,
    ratio: 0.8,
    seed: 11,
    palette: dusk,
  },
  {
    id: 'the-long-field',
    title: 'The Long Field',
    year: 2025,
    medium: 'Acrylic on board',
    size: '90 × 60 cm',
    category: 'Originals',
    status: 'Available',
    blurb: 'A wide, quiet field painted in layers of green.',
    featured: true,
    ratio: 1.5,
    seed: 27,
    palette: moss,
  },
  {
    id: 'night-crossing',
    title: 'Night Crossing',
    year: 2024,
    medium: 'Oil on canvas',
    size: '50 × 70 cm',
    category: 'Originals',
    status: 'Sold',
    blurb: 'A river road after dark, lit only by the moon.',
    featured: true,
    ratio: 0.72,
    seed: 43,
    palette: night,
  },
  {
    id: 'ember-ridge',
    title: 'Ember Ridge',
    year: 2024,
    medium: 'Gouache on paper',
    size: '30 × 40 cm',
    category: 'Commissions',
    status: 'Commissioned',
    blurb: 'Made for a client who wanted the hills near her family home.',
    ratio: 0.75,
    seed: 58,
    palette: ember,
  },
  {
    id: 'moss-light',
    title: 'Moss Light',
    year: 2024,
    medium: 'Watercolour',
    size: '25 × 25 cm',
    category: 'Studies',
    status: 'Available',
    blurb: 'A small study of morning light through wet trees.',
    ratio: 1,
    seed: 64,
    palette: mist,
  },
  {
    id: 'quiet-harbour',
    title: 'Quiet Harbour',
    year: 2023,
    medium: 'Oil on canvas',
    size: '80 × 50 cm',
    category: 'Commissions',
    status: 'Commissioned',
    blurb: 'A harbour at slack water, painted for a retiring sailor.',
    ratio: 1.6,
    seed: 79,
    palette: teal,
  },
  {
    id: 'study-in-green',
    title: 'Study in Green',
    year: 2023,
    medium: 'Ink and wash',
    size: '21 × 30 cm',
    category: 'Studies',
    status: 'Available',
    blurb: 'Quick ink and wash notes, kept from a sketchbook.',
    ratio: 0.7,
    seed: 91,
    palette: moss,
  },
  {
    id: 'heron-hour',
    title: 'Heron Hour',
    year: 2023,
    medium: 'Acrylic on canvas',
    size: '60 × 60 cm',
    category: 'Originals',
    status: 'Sold',
    blurb: 'A heron waiting at the edge of the reeds.',
    ratio: 1,
    seed: 102,
    palette: teal,
  },
  {
    id: 'paper-moon',
    title: 'Paper Moon',
    year: 2022,
    medium: 'Gouache on paper',
    size: '30 × 42 cm',
    category: 'Studies',
    status: 'Available',
    blurb: 'A pale moon over a dark ridge, painted flat and simple.',
    ratio: 0.71,
    seed: 117,
    palette: night,
  },
]

export const categories: Array<'All' | ArtCategory> = ['All', 'Originals', 'Commissions', 'Studies']

/* ------------------------------ About ------------------------------ */

export const about = {
  lead: 'Seth paints quiet places: fields, harbours, and the hour when the light changes.',
  body: [
    'Seth Greenan is an artist who works mostly in oil, acrylic and gouache. His work is about slowing down and noticing the small shifts in a landscape that most people walk past.',
    'He takes a limited number of commissions each season so that every piece gets proper time. Clients are usually people who want a place, a pet, or a person painted in a way that feels like how they remember it.',
    'Replace this text with Seth\u2019s own story: where he studied, what he paints, what inspires him and where he has shown his work.',
  ],
  working: [
    { term: 'Communication', detail: 'You will hear back within two working days, and get progress photos while the piece is underway.' },
    { term: 'Materials', detail: 'Archival paints and acid-free surfaces, so the finished piece lasts.' },
    { term: 'Delivery', detail: 'Originals are packed flat and shipped insured. Digital files are sent by link.' },
  ],
}

/* ------------------------------ Pricing ------------------------------ */

export interface Tier {
  id: string
  name: string
  from: number
  blurb: string
  includes: string[]
  turnaround: string
}

export const tiers: Tier[] = [
  {
    id: 'sketch',
    name: 'Sketch',
    from: 60,
    blurb: 'A loose, expressive study of one subject on a plain background. A good first commission or gift.',
    includes: ['One subject', 'Plain background', 'One round of changes'],
    turnaround: 'About 1 week',
  },
  {
    id: 'finished',
    name: 'Finished piece',
    from: 180,
    blurb: 'A fully worked painting of one subject, with a simple background in the colours you choose.',
    includes: ['One subject', 'Simple background', 'Two rounds of changes', 'Signed original'],
    turnaround: '2 to 3 weeks',
  },
  {
    id: 'scene',
    name: 'Detailed scene',
    from: 450,
    blurb: 'A full landscape or scene with several elements and a fully developed background.',
    includes: ['Up to three subjects', 'Full background', 'Two rounds of changes', 'Signed original'],
    turnaround: '4 to 6 weeks',
  },
]

export interface Option {
  id: string
  label: string
  note: string
  /** Fixed amount added to the price. */
  amount: number
}

export const sizes: Option[] = [
  { id: 'small', label: 'Small', note: 'A5, 15 × 21 cm', amount: 0 },
  { id: 'medium', label: 'Medium', note: 'A4, 21 × 30 cm', amount: 40 },
  { id: 'large', label: 'Large', note: 'A3, 30 × 42 cm', amount: 110 },
]

export const addOns: Option[] = [
  { id: 'subject', label: 'Extra subject', note: 'Per person, pet or object', amount: 70 },
  { id: 'background', label: 'Detailed background', note: 'Instead of the simple one', amount: 90 },
  { id: 'rush', label: 'Rush delivery', note: 'Finished in under 7 days', amount: 120 },
]

export const process = [
  { title: 'Send a request', detail: 'Tell Seth what you have in mind, the size you want, and any reference photos.' },
  { title: 'Get a quote and sketch', detail: 'You receive a fixed price and a rough sketch to approve before any paint is used.' },
  { title: 'Pay a deposit', detail: 'A 50% deposit secures your place in the queue.' },
  { title: 'Follow the progress', detail: 'You get photos at key stages and can ask for changes within your included rounds.' },
  { title: 'Receive your piece', detail: 'Pay the balance and your piece is packed and shipped, or sent as a digital file.' },
]

export const terms = [
  'A 50% deposit is needed to start. It is non-refundable once the sketch is approved.',
  'The balance is due before the finished piece is shipped.',
  'Commissions are for personal use. Ask for a quote if you want to use a piece commercially.',
  'Seth keeps the right to share photos of the finished work as part of his portfolio.',
]

export const faq = [
  { q: 'How long does a commission take?', a: 'It depends on the piece. The estimate is listed on each option above, and Seth will confirm a date when he sends your quote.' },
  { q: 'Can I ask for changes?', a: 'Yes. Every option includes at least one round of changes. More rounds can be added if you need them.' },
  { q: 'Do you ship internationally?', a: 'Yes. Shipping is quoted separately once the size and destination are known.' },
  { q: 'What if I am not sure what I want?', a: 'Send a message anyway. Seth can suggest a size and style based on what you tell him.' },
]
