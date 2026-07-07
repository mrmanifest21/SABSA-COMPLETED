# SABSA — SA Brain Sensory Activation Center

A React + TypeScript + Vite marketing/landing site for SABSA (SA Brain Sensory Activation Center | NPO).

## Stack

- **React 19** + **TypeScript**
- **Vite 7** (dev server on port 5000)
- **Tailwind CSS v3** with shadcn/ui components
- **GSAP** for scroll animations
- **Three.js** for the 3D NeuralRibbon background (degrades gracefully when WebGL is unavailable)
- **EmailJS** for the contact form
- **Lenis** for smooth scrolling

## Running the project

```bash
npm run dev      # start dev server on port 5000
npm run build    # production build
npm run preview  # preview production build
```

The "Start application" workflow runs `npm run dev` automatically.

## Project structure

```
src/
  components/     Shared components (Navigation, NeuralRibbon, etc.)
  sections/       Page sections (Hero, About, Programs, Testimonials, Contact, …)
  pages/          Route-level pages (Home)
  hooks/          Custom React hooks
  lib/            Utilities
public/
  images/         Static images
  videos/         Static video assets
```

## Notes

- The Three.js NeuralRibbon background silently skips rendering if WebGL is unavailable (e.g. Replit dev server has no GPU). The rest of the site renders normally.
- `vite.config.ts` sets `allowedHosts: true` so Replit's proxied preview works. This is a dev-only setting and does not affect production builds.
- EmailJS credentials (public key, service ID, template ID) need to be configured in the Contact section for the contact form to send emails.

## User preferences

- Keep the existing project structure and stack.
