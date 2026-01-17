# Manual Test Checklist - Portfolio Site

## Environment Setup
- [ ] Build Docker container: `docker compose build`
- [ ] Start container: `docker compose up -d`
- [ ] Verify site accessible at https://codeas.me

## User Story 1: Browse Projects List
- [ ] Projects section displays all 6 projects from content.json
- [ ] Projects are sorted by order (Meteo Score first, Airtime last)
- [ ] Each project card shows: name, description, tags
- [ ] "Source Code" link opens GitHub in new tab (for projects with public repos)
- [ ] "Live Demo" link opens demo URL in new tab (when available)
- [ ] Links have `rel="noopener noreferrer"` attribute
- [ ] Empty state displays when projects array is empty

## User Story 2: View About Me Section
- [ ] About section displays profile name: "Aurélien Sberro"
- [ ] Headline shows "Developer"
- [ ] Bio text is displayed
- [ ] GitHub social link points to https://github.com/AurelienS
- [ ] Email link opens mailto:aurelien.sberro@gmail.com
- [ ] Social links open in new tab with proper rel attributes

## User Story 3: View Project Details
- [ ] Clicking a project card opens modal
- [ ] Modal shows full description (fullDescription field)
- [ ] Modal shows all tags
- [ ] Modal shows Source Code and Live Demo links
- [ ] Clicking backdrop closes modal
- [ ] Clicking X button closes modal
- [ ] Pressing Escape key closes modal
- [ ] Clicking links inside card does NOT open modal

## Navigation
- [ ] "Projects" nav link scrolls to projects section
- [ ] "About" nav link scrolls to about section
- [ ] Smooth scrolling works
- [ ] Logo links to top of page
- [ ] Navigation is sticky on scroll

## Responsive Design
### Desktop (> 768px)
- [ ] Projects display in grid (multiple columns)
- [ ] Profile image and text side by side
- [ ] Navigation horizontal

### Tablet (481px - 768px)
- [ ] Projects display in single column
- [ ] Profile stacks vertically, centered
- [ ] Font sizes adjusted

### Mobile (< 480px)
- [ ] Navigation stacks vertically
- [ ] All content readable
- [ ] No horizontal scroll
- [ ] Modal fits screen

## Error Handling
- [ ] Error state shows when content.json fails to load
- [ ] 404 page displays for invalid URLs
- [ ] 404 page has working navigation back to home

## Performance
- [ ] Page loads within 2 seconds
- [ ] Images lazy load
- [ ] Gzip compression active
- [ ] Static assets cached

## Cross-Browser Testing
- [ ] Chrome - all features work
- [ ] Firefox - all features work
- [ ] Safari - all features work
- [ ] Edge - all features work

## Accessibility
- [ ] Modal has role="dialog" and aria-modal="true"
- [ ] Close button has aria-label
- [ ] Social links have aria-label
- [ ] Images have alt text
- [ ] Color contrast sufficient

## Security
- [ ] No XSS vulnerabilities (HTML is escaped)
- [ ] External links have rel="noopener noreferrer"
- [ ] No sensitive data in content.json
