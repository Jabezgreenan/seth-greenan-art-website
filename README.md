# Seth Greenan — Artist Portfolio

A dark, premium single-page artist portfolio built with Vue 3, TypeScript, Vite and plain CSS.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Main sections

- Home / hero
- Featured artwork
- About Seth
- Pricing / commission guide
- Contact
- Instagram + email only

## Add your images

All site images live in:

```text
public/images/
```

Use these filenames:

```text
hero.jpg
seth.jpg
artwork-01.jpg
artwork-02.jpg
artwork-03.jpg
artwork-04.jpg
artwork-05.jpg
artwork-06.jpg
```

You can simply replace those files with Seth's real images.

The artwork gallery is driven from the `artworks` array in `src/App.vue`, so changing an image is as simple as changing:

```ts
image: '/images/artwork-01.jpg'
```

No artwork placeholder CSS is used anymore.
