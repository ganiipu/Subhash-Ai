# Subhash Pokhriyal — AI Project Portfolio

A premium, animated AI automation portfolio showcasing 6 production-grade n8n-powered intelligence systems.

## Live Demo
Deploy to Vercel in one click (see below) or run locally.

## Features
- 🎯 **Cursor glow** follower effect
- ⌨️ **Typewriter animation** on hero heading
- 📊 **Animated counters** (scroll-triggered)
- 🌐 **Neural network canvas** background
- 🃏 **Stagger scroll reveals** on all cards
- 🖼 **Realistic n8n workflow images** per project
- 📂 **Immersive case study modals** with pipeline steps & impact data
- 🌗 **Dark / Light mode** toggle (saved to localStorage)

## Tech Stack
- **HTML5** — semantic structure, SEO meta tags
- **CSS3** — custom design system, CSS Variables, responsive grid
- **Vanilla JavaScript** — zero dependencies (GSAP via CDN for scroll triggers)
- **GSAP + ScrollTrigger** — cinematic scroll animations

## Project Structure
```
project portfolio/
├── index.html          # Main HTML — all sections
├── style.css           # Full design system + animations
├── script.js           # Canvas, typewriter, reveals, modals
├── vercel.json         # Vercel static deployment config
├── assets/
│   ├── workflow1.png   # Talent Scout workflow
│   ├── workflow2.png   # Digital Oracle workflow
│   ├── workflow3.png   # Support Agent workflow
│   ├── workflow4.png   # Finance Engine workflow
│   ├── workflow5.png   # Intelligence Hub workflow
│   └── workflow6.png   # Security Sentinel workflow
└── README.md
```

## Running Locally
```bash
# Option 1 — Python (no install needed)
python -m http.server 8000
# Open http://localhost:8000

# Option 2 — Node.js
npx serve .
```

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
cd "project portfolio"
vercel
```

### Option B — Vercel Dashboard (drag & drop)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from GitHub **or** drag the project folder
3. Framework Preset: **Other** (static)
4. Click **Deploy** ✅

### Option C — GitHub + Auto Deploy
1. Push this folder to a GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. Every `git push` auto-deploys

## Contact
- **Email:** pokhriyal.ccet@gmail.com
- **LinkedIn:** [Subhash Pokhriyal](https://www.linkedin.com/in/subhash-pokhrial)
