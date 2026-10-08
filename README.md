# Loophaus

A landing page for **Loophaus**, a (fictional) sharing platform for music producers, sound designers and labels. Built with React 18 and Vite as a portfolio piece.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the build
```

## What's in it

- **Rotating hero headline** and an **animated canvas waveform** with a moving playhead.
- **Giant split-word tabs** (Producers / Sound designers / Labels) that swap the feature grid. Keyboard accessible with arrow keys (ARIA tabs pattern).
- **Interactive track card** showing tempo, key, loudness (LUFS) and stem level meters, with a "spin" reaction counter.
- **Build timeline** with done / in-progress / up-next states.
- **Early-access form** with client-side validation and a success state.
- Honors `prefers-reduced-motion`; responsive down to ~360px.

## Structure

```
src/
  App.jsx              page composition
  data.js              all copy and content
  styles.css           design tokens + styles
  components/
    Nav.jsx  Hero.jsx  Waveform.jsx  Audiences.jsx
    About.jsx  Timeline.jsx  Join.jsx  Footer.jsx
```

## Ideas to extend

- Wire the join form to a real endpoint (Formspree, Supabase, a serverless function).
- Swap the canvas waveform for real audio with the Web Audio API.
- Add page transitions with Framer Motion.
