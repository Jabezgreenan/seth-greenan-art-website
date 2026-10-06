# Seth Greenan — Artist Website

A modern single-page portfolio website designed for artist **Seth Greenan** to showcase his artwork, provide information about his work, display pricing, and give visitors a way to get in contact.

The site is built as a responsive Vue application with a clean, minimal design that puts the artwork and artist information at the centre of the experience.

## 🌐 Live Website

**[View the live website](https://seth-greenan-art-website.vercel.app/)**

## ✨ Features

* **Home** — Introduction to Seth and his artwork
* **Artwork Gallery** — Showcase of available artwork
* **Pricing** — Artwork pricing, process information, terms and FAQs
* **About** — Information about the artist
* **Contact** — Contact form for enquiries
* **Responsive Design** — Optimised for desktop and mobile devices
* **Custom Artwork Images** — Artwork can be added through the `public/art/` directory
* **Centralised Content** — Artist information, artwork, pricing and other content can be easily updated from one data file

## 🛠️ Built With

* **Vue 3**
* **TypeScript**
* **Vite**
* **CSS**
* **HTML**

## 📁 Project Structure

```text
seth-greenan-art-website/
├── public/
│   └── art/                  # Artwork images
│
├── src/
│   ├── data/
│   │   └── site.ts           # Site content and artwork data
│   │
│   ├── views/
│   │   └── ContactView.vue   # Contact page
│   │
│   └── styles/
│       └── main.css          # Global styles and CSS variables
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jabezgreenan/seth-greenan-art-website.git
```

### 2. Navigate into the project

```bash
cd seth-greenan-art-website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The website will be available at:

```text
http://localhost:5173
```

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The production files are generated in the `dist/` directory.

## 🎨 Adding Artwork

Artwork images can be added without modifying the CSS.

1. Place the image inside:

```text
public/art/
```

2. Add the image to the artwork data in:

```text
src/data/site.ts
```

For example:

```ts
{
  title: "Artwork Name",
  image: "/art/artwork-name.jpg",
  ratio: 1.5
}
```

The `ratio` should represent the image's width divided by its height.

This makes it easy to replace placeholder artwork with real artwork photographs.

## ✏️ Updating Website Content

Most of the site's content can be updated from:

```text
src/data/site.ts
```

This includes:

* Artist information
* Artwork
* Artwork descriptions
* Prices
* About section
* Process information
* Terms
* Frequently asked questions

This keeps the site's content separate from the components and makes future updates easier.

## 📧 Contact Form

The contact form currently works without a backend.

When a visitor submits the form, their email application is opened with the message automatically prepared.

For a fully serverless contact solution, the form could later be connected to a service such as Formspree or Netlify Forms.

## 🚀 Deployment

The project can be deployed to services such as **Vercel** or **Netlify**.

For Vercel, the project can be connected directly to the GitHub repository and automatically redeployed whenever changes are pushed.

For a manual deployment, build the project with:

```bash
npm run build
```

and deploy the resulting `dist/` directory.

## 📌 Project Purpose

This project was created as a dedicated online presence for an artist, with a focus on:

* Presenting artwork professionally
* Making artwork pricing easy to find
* Providing information about the artist
* Giving potential clients a simple way to enquire
* Creating a responsive and visually focused user experience

## 👨‍💻 Developer

Built by **Jabez Greenan**.

* GitHub: [Jabezgreenan](https://github.com/Jabezgreenan)
* LinkedIn: [Jabez Greenan](https://linkedin.com/in/jabez-greenan-60b434271/)

---

**Seth Greenan Art Website** — A simple, modern online portfolio for showcasing artwork.
