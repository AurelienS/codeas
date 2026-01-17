# Research: Personal Portfolio Website

**Feature**: 002-portfolio-site
**Date**: 2026-01-17

## Research Questions

### 1. Static Site Architecture

**Decision**: Vanilla HTML/CSS/JS with JSON data file

**Rationale**:
- Simplest approach that meets all requirements (Constitution: Simplicity First)
- No build step = faster development, easier deployment
- JSON data file separates content from presentation
- Works on any static hosting (GitHub Pages, Netlify, Vercel, etc.)

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| React/Vue SPA | Component reuse, rich ecosystem | Build step, bundle size, overkill for static content | Violates YAGNI - no dynamic features needed |
| Static Site Generator (11ty, Hugo) | Templating, markdown support | Learning curve, build step, extra tooling | Added complexity for ~1 page site |
| Plain HTML (no JS) | Maximum simplicity | Harder to maintain project list | Slight JS for rendering data is acceptable |

### 2. Responsive Design Approach

**Decision**: CSS Flexbox/Grid with mobile-first media queries

**Rationale**:
- Native CSS, no framework dependencies
- Mobile-first ensures good experience on smallest screens
- Flexbox/Grid have excellent browser support (>98%)
- Single CSS file keeps things simple

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| Tailwind CSS | Utility classes, rapid styling | Build step, large utility file, learning curve | Overkill for small site, adds complexity |
| Bootstrap | Pre-built components, grid system | Large file size, opinionated styling | Dependency bloat for simple layout needs |
| CSS-in-JS | Scoped styles | Requires JS framework | No framework in use |

### 3. Data Storage Format

**Decision**: Single JSON file (`content.json`)

**Rationale**:
- Human-readable and editable
- No parsing library needed (native `fetch` + `JSON.parse`)
- Easy to validate structure
- Version controllable with git

**Alternatives Considered**:
| Option | Pros | Cons | Rejected Because |
|--------|------|------|------------------|
| YAML | More readable for humans | Requires parser library | Adds dependency |
| Markdown files | Good for long content | Requires parser, more complex structure | Overkill for structured data |
| Hardcoded in HTML | No fetch needed | Mixing content and presentation | Harder to maintain |

### 4. Smooth Scrolling Navigation

**Decision**: CSS `scroll-behavior: smooth` with JS fallback

**Rationale**:
- CSS-only solution works in modern browsers
- Minimal JS for anchor click handling
- Progressive enhancement - works without JS

**Implementation**:
```css
html {
  scroll-behavior: smooth;
}
```

### 5. External Links Handling

**Decision**: `target="_blank"` with `rel="noopener noreferrer"`

**Rationale**:
- `target="_blank"` opens in new tab (FR-005)
- `rel="noopener"` prevents security vulnerability (tabnabbing)
- `rel="noreferrer"` adds privacy (no referrer header)

### 6. 404 Page Handling

**Decision**: Custom `404.html` page

**Rationale**:
- Most static hosts (GitHub Pages, Netlify) automatically serve `404.html`
- Simple HTML page with navigation back to main site
- No server configuration needed

### 7. Deployment Strategy

**Decision**: VPS with Docker Compose + Traefik + GitHub Actions

**Rationale**:
- Consistent with existing infrastructure (meteo-score, sarouels-mocassins)
- Traefik provides automatic SSL via Let's Encrypt
- GitHub Actions enables CI/CD on push to `prod` branch
- Full control over hosting environment

**Infrastructure**:
- **Domain**: `codeas.me` (root domain)
- **Container**: nginx:alpine serving static files
- **Reverse Proxy**: Traefik (existing `traefik_default` network)
- **SSL**: Let's Encrypt via Traefik certresolver
- **CI/CD**: GitHub Actions SSH deploy on `prod` branch push

**Deployment Pattern** (from reference projects):
```yaml
# docker-compose.yml pattern
services:
  app:
    build: .
    networks:
      - traefik_default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portfolio.rule=Host(`codeas.me`)"
      - "traefik.http.routers.portfolio.entrypoints=websecure"
      - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"
```

**GitHub Secrets Required**:
- `VPS_HOST`: VPS IP address
- `VPS_SSH_KEY`: SSH private key for deployment

## Performance Considerations

| Concern | Approach |
|---------|----------|
| Page load < 3s | Minimal assets, no framework, optimize images |
| No layout shift | Define image dimensions, reserve space |
| Fast paint | Inline critical CSS or keep CSS small |

## Browser Support

Target: Last 2 versions of major browsers
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

All features used (Flexbox, Grid, `fetch`, ES6) have >98% support.

## Accessibility Baseline

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Proper heading hierarchy (single `<h1>`, logical `<h2>`-`<h4>`)
- Alt text for images
- Sufficient color contrast
- Keyboard navigable links
- Focus indicators

## Security Considerations

| Concern | Mitigation |
|---------|------------|
| XSS via project data | Sanitize when rendering (escape HTML in descriptions) |
| Tabnabbing | Use `rel="noopener noreferrer"` on external links |
| No sensitive data | Public site, no auth, no user input forms |

## Conclusion

All technical decisions align with the Constitution's Simplicity First principle. The vanilla HTML/CSS/JS approach requires:
- Zero build tools
- Zero runtime dependencies
- Zero backend infrastructure

This is the minimum viable technical stack for the requirements.
