# 🌿 Khushi Bhavsar — Personal Portfolio

A modern, nature-inspired personal portfolio website built with React.js.
Features floating leaf animations, smooth scroll interactions, and a clean botanical design.

---

## 📁 Folder Structure

```
khushi-portfolio/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── components/
│   │   ├── LeafCanvas.jsx      # Animated floating leaves (canvas-based)
│   │   ├── Navbar.jsx          # Fixed nav with mobile hamburger
│   │   ├── Hero.jsx            # Hero section with parallax leaves
│   │   ├── About.jsx           # About Me section
│   │   ├── Projects.jsx        # Project cards with hover animations
│   │   ├── Skills.jsx          # Skill groups
│   │   ├── Experience.jsx      # Timeline with leaf bullets
│   │   ├── Contact.jsx         # Contact links on dark background
│   │   └── Footer.jsx          # Footer
│   ├── styles/
│   │   ├── globals.css         # CSS variables, reset, utilities
│   │   ├── LeafCanvas.css      # Leaf canvas overlay
│   │   ├── Navbar.css          # Navigation styles
│   │   ├── Hero.css            # Hero section styles
│   │   └── sections.css        # About, Projects, Skills, Experience, Contact, Footer
│   ├── App.jsx                 # Root component
│   └── index.js                # React entry point
├── package.json                # Dependencies + deploy scripts
└── README.md                   # This file
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

Your site will open at [http://localhost:3000](http://localhost:3000) and auto-reloads on file changes.

### 3. Build for production

```bash
npm run build
```

Creates an optimised production build in the `build/` folder.

---

## 🌐 Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it `khushi-portfolio` (or anything you like).
4. Leave it **Public**, then click **Create repository**.

### Step 2 — Update the homepage URL

Open `package.json` and replace the placeholder with your real GitHub username:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/khushi-portfolio"
```

For example:
```json
"homepage": "https://khushibhavsar.github.io/khushi-portfolio"
```

### Step 3 — Push your code to GitHub

In your project folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/khushi-portfolio.git
git push -u origin main
```

### Step 4 — Install the gh-pages package (if not already)

```bash
npm install --save-dev gh-pages
```

### Step 5 — Deploy!

```bash
npm run deploy
```

This command:
1. Runs `npm run build` to create the production build
2. Pushes the `build/` folder to a `gh-pages` branch on GitHub

### Step 6 — Enable GitHub Pages in repository settings

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to `gh-pages` and folder to `/ (root)`.
5. Click **Save**.

### Step 7 — Visit your live site 🎉

After 1–2 minutes, your portfolio will be live at:

```
https://YOUR_GITHUB_USERNAME.github.io/khushi-portfolio
```

---

## 🔄 Updating Your Portfolio

After making changes locally, redeploy with:

```bash
npm run deploy
```

That's it — changes go live in about a minute.

---

## ✏️ Customisation Guide

### Update your contact links
Open `src/components/Contact.jsx` and replace the placeholder URLs:

```jsx
const LINKS = [
  { href: 'mailto:your@email.com', ... },
  { href: 'https://github.com/yourusername', ... },
  { href: 'https://linkedin.com/in/yourprofile', ... },
];
```

### Add a new project
Open `src/components/Projects.jsx` and add an entry to the `PROJECTS` array:

```jsx
{
  id: 'myproject',
  title: 'My Project',
  subtitle: 'Short description',
  icon: '🚀',
  bandClass: 'project-card__band--inspira', // reuse or add a new CSS class
  description: 'What it does...',
  tags: ['React', 'CSS'],
  link: 'https://github.com/...',
  linkLabel: 'View Project',
}
```

### Change the colour palette
All colours are CSS variables in `src/styles/globals.css`:

```css
:root {
  --clr-forest-deep: #2d5a27;   /* dark green */
  --clr-sage:        #8fb878;   /* medium green */
  --clr-cream:       #faf7f0;   /* background */
  /* ... etc */
}
```

### Adjust the number of floating leaves
In `src/components/LeafCanvas.jsx`, change:
```js
const LEAF_COUNT = 28; // increase or decrease
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18   | Component architecture |
| CSS3 (custom properties) | Design tokens & theming |
| Canvas API | Animated leaf background |
| IntersectionObserver | Scroll-triggered animations |
| gh-pages   | GitHub Pages deployment |

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
