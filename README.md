# Seth Greenan site

A single-page site built with Vue 3, TypeScript, Vite and plain CSS.
Pages: Home, Artwork, Pricing, About, Contact.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the production build
```

Vite is the tool that runs and builds Vue projects, so you do need it.

## Change the content

Almost everything you will want to edit is in `src/data/site.ts`:
artist details, artworks, the About text, prices, process, terms and FAQ.
All text and prices there are placeholders.

### Use real artwork photos
1. Put the images in `public/art/`.
2. In `src/data/site.ts`, add `image: '/art/your-file.jpg'` to the artwork and set `ratio` to its width divided by height.

Pieces without an `image` show a generated placeholder painting.

### Colours and fonts
Colours and fonts are CSS variables at the top of `src/styles/main.css`.

## The contact form
There is no server, so the form opens the visitor's email app with the message filled in.
To send messages without relying on the visitor's email app, point the form at a service such as Formspree or Netlify Forms and replace the `submit()` function in `src/views/ContactView.vue`.

## Hosting
Run `npm run build` and upload the `dist` folder. Because this is a single-page app with clean URLs,
the host must send every path to `index.html` (on Netlify add a `public/_redirects` file containing
`/* /index.html 200`; on Vercel this works by default for Vite).
