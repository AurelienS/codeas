# Quickstart: Personal Portfolio Website

**Feature**: 002-portfolio-site
**Date**: 2026-01-17

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor (VS Code, Sublime, or any editor)
- Docker (for local testing with production config)
- Git (for deployment)

## Quick Start

### 1. Clone and Navigate

```bash
cd codeas
```

### 2. Edit Your Content

Open `src/data/content.json` and update with your information:

```json
{
  "profile": {
    "name": "Your Name",
    "headline": "Your Title",
    "bio": "Write a brief bio about yourself...",
    "socialLinks": [
      { "platform": "GitHub", "url": "https://github.com/yourusername" },
      { "platform": "Email", "url": "mailto:you@example.com" }
    ]
  },
  "projects": [
    {
      "id": "project-1",
      "name": "My First Project",
      "description": "A brief description of what this project does.",
      "sourceUrl": "https://github.com/yourusername/project-1",
      "order": 1
    }
  ]
}
```

### 3. Preview Locally

**Option A: Direct file opening**
- Open `src/index.html` directly in your browser
- Note: Some browsers may block local JSON fetching

**Option B: Local server (recommended)**
```bash
# Using Python 3
cd src
python -m http.server 8000

# Using Node.js (npx)
npx serve src

# Using PHP
cd src
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### 4. Test with Docker Locally

```bash
# Build and run locally
docker compose build
docker compose up

# Open http://localhost:80
```

### 5. Deploy to Production

Deployment is automated via GitHub Actions when you push to the `prod` branch.

**First-time setup on VPS**:
```bash
# On your VPS
cd /mnt/data
git clone git@github.com:yourusername/codeas.git
cd codeas
git checkout prod
docker compose up -d
```

**Deploy updates**:
```bash
# From your local machine
git checkout prod
git merge main
git push origin prod
# GitHub Actions will automatically deploy
```

**GitHub Secrets Required**:
- `VPS_HOST`: Your VPS IP address
- `VPS_SSH_KEY`: SSH private key for deployment

**Live URL**: https://codeas.me

## File Structure

```
src/
├── index.html       # Main page (edit sections structure)
├── 404.html         # Custom 404 error page
├── css/
│   └── styles.css   # Styles (edit colors, fonts, layout)
├── js/
│   └── main.js      # Logic (renders projects from JSON)
├── data/
│   └── content.json # YOUR CONTENT (edit this!)
└── assets/
    └── images/      # Add profile photo, project screenshots

# Deployment (don't edit unless needed)
Dockerfile           # nginx container config
docker-compose.yml   # Service config with Traefik
nginx.conf           # nginx routing rules
.github/workflows/   # CI/CD automation
```

## Common Tasks

### Add a New Project

1. Open `src/data/content.json`
2. Add a new object to the `projects` array:
   ```json
   {
     "id": "new-project",
     "name": "New Project Name",
     "description": "Brief description.",
     "sourceUrl": "https://github.com/you/new-project",
     "order": 2
   }
   ```
3. Save and refresh browser

### Change Project Order

Update the `order` field in each project. Lower numbers appear first.

### Add Profile Image

1. Add image to `src/assets/images/`
2. Update `content.json`:
   ```json
   "profile": {
     "image": "images/profile.jpg",
     ...
   }
   ```

### Add Project Screenshot

1. Add image to `src/assets/images/`
2. Update project in `content.json`:
   ```json
   {
     "id": "my-project",
     "image": "images/my-project.png",
     ...
   }
   ```

## Validation

Before deploying, verify:

- [ ] All links work (open in new tab)
- [ ] Site looks good on mobile (use browser dev tools)
- [ ] No console errors in browser dev tools
- [ ] Profile has at least one social link
- [ ] Each project has at least one link (source or demo)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Projects don't load | Check browser console for errors; ensure `content.json` is valid JSON |
| Styles not applying | Hard refresh (Ctrl+Shift+R / Cmd+Shift+R) |
| Images not showing | Check file paths are relative to `assets/` folder |
| Docker build fails | Check `docker compose logs` for errors |
| Site not accessible after deploy | Verify Traefik is running and DNS points to VPS |
| GitHub Actions fails | Check secrets are set (VPS_HOST, VPS_SSH_KEY) |
