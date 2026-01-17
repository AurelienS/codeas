/**
 * Portfolio Site JavaScript
 * Handles content loading, i18n, and theme switching
 */

// ============================================
// State
// ============================================

let currentLang = 'en';
let contentData = null;
let projectsData = [];

// ============================================
// i18n Helper
// ============================================

/**
 * Get translated text
 * @param {string|Object} text - Text or object with translations
 * @returns {string} Translated text
 */
function t(text) {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[currentLang] || text.en || '';
}

/**
 * Get UI translation
 * @param {string} key - UI translation key
 * @returns {string} Translated text
 */
function ui(key) {
  if (!contentData?.ui?.[key]) return key;
  return t(contentData.ui[key]);
}

/**
 * Update all i18n elements on the page
 */
function updateI18nElements() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = ui(key);
  });
}

// ============================================
// Theme
// ============================================

/**
 * Set theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/**
 * Toggle theme
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// ============================================
// Language
// ============================================

/**
 * Set language
 * @param {string} lang - 'en' or 'fr'
 */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);

  // Update UI elements
  updateI18nElements();

  // Re-render content
  if (contentData) {
    renderProjects(contentData.projects);
    renderProfile(contentData.profile);
  }
}

/**
 * Initialize language from localStorage or browser preference
 */
function initLang() {
  const saved = localStorage.getItem('lang');
  if (saved) {
    currentLang = saved;
  } else {
    const browserLang = navigator.language.slice(0, 2);
    currentLang = browserLang === 'fr' ? 'fr' : 'en';
  }

  // Set select value
  const select = document.getElementById('lang-select');
  if (select) select.value = currentLang;

  document.documentElement.setAttribute('lang', currentLang);
}

// ============================================
// Content Fetching
// ============================================

/**
 * Fetch content from JSON file
 * @returns {Promise<Object>} Content data
 */
async function fetchContent() {
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load content:', error);
    throw error;
  }
}

// ============================================
// Projects Rendering
// ============================================

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Render project cards
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // Handle empty state
  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${escapeHtml(ui('projectsComing'))}</p>
      </div>
    `;
    return;
  }

  // Sort projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
  projectsData = sortedProjects;

  // Render project cards
  container.innerHTML = sortedProjects.map(project => `
    <article class="project-card" data-project-id="${escapeHtml(project.id)}">
      ${project.image ? `
        <div class="project-image">
          <img src="assets/${escapeHtml(project.image)}" alt="${escapeHtml(project.name)}" loading="lazy">
        </div>
      ` : ''}
      <div class="project-content">
        <h3 class="project-title">${escapeHtml(project.name)}</h3>
        <p class="project-description">${escapeHtml(t(project.description))}</p>
        <div class="project-links">
          ${project.sourceUrl ? `
            <a href="${escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">
              ${escapeHtml(ui('github'))}
            </a>
          ` : ''}
          ${project.demoUrl ? `
            <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link project-link--primary">
              ${escapeHtml(ui('visit'))}
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

// ============================================
// Project Details Modal
// ============================================

/**
 * Open project details modal
 * @param {string} projectId - ID of the project to show
 */
function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  // Create modal if it doesn't exist
  let modal = document.getElementById('project-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    document.body.appendChild(modal);
  }

  // Render modal content
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="closeProjectModal()"></div>
    <div class="modal-content" role="document">
      <button class="modal-close" onclick="closeProjectModal()" aria-label="Close modal">&times;</button>
      <h2 class="modal-title">${escapeHtml(project.name)}</h2>
      <p class="modal-description">${escapeHtml(t(project.fullDescription) || t(project.description))}</p>
      ${project.tags && project.tags.length > 0 ? `
        <div class="project-tags modal-tags">
          ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}
      <div class="modal-links">
        ${project.sourceUrl ? `
          <a href="${escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">
            ${escapeHtml(ui('github'))}
          </a>
        ` : ''}
        ${project.demoUrl ? `
          <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link project-link--primary">
            ${escapeHtml(ui('visit'))}
          </a>
        ` : ''}
      </div>
    </div>
  `;

  // Show modal
  modal.classList.add('modal--open');
  document.body.style.overflow = 'hidden';

  // Focus modal for accessibility
  modal.querySelector('.modal-close').focus();
}

/**
 * Close project details modal
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }
}

/**
 * Setup project card click handlers
 */
function setupProjectCardListeners() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    // Don't open modal if clicking on links
    if (e.target.closest('a')) return;

    const card = e.target.closest('.project-card');
    if (card) {
      const projectId = card.dataset.projectId;
      openProjectModal(projectId);
    }
  });
}

/**
 * Setup keyboard accessibility (Escape to close modal)
 */
function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
}

// ============================================
// Profile Rendering
// ============================================

/**
 * Render profile/about section
 * @param {Object} profile - Profile object
 */
function renderProfile(profile) {
  const container = document.getElementById('about-container');
  if (!container) return;

  // Handle missing profile
  if (!profile) {
    container.innerHTML = `
      <div class="empty-state">
        <p>${escapeHtml(ui('profileComing'))}</p>
      </div>
    `;
    return;
  }

  // Build social links HTML
  const socialLinksHtml = profile.socialLinks && profile.socialLinks.length > 0
    ? `<div class="social-links">
        ${profile.socialLinks.map(link => `
          <a href="${escapeHtml(link.url)}"
             target="_blank"
             rel="noopener noreferrer"
             class="social-link"
             aria-label="${escapeHtml(link.platform)}">
            ${escapeHtml(link.platform)}
          </a>
        `).join('')}
      </div>`
    : '';

  // Render profile
  container.innerHTML = `
    <div class="profile">
      ${profile.image ? `
        <div class="profile-image">
          <img src="assets/${escapeHtml(profile.image)}" alt="${escapeHtml(profile.name)}">
        </div>
      ` : ''}
      <div class="profile-info">
        <h3 class="profile-name">${escapeHtml(profile.name)}</h3>
        ${profile.headline ? `<p class="profile-headline">${escapeHtml(t(profile.headline))}</p>` : ''}
        ${profile.bio ? `<p class="profile-bio">${escapeHtml(t(profile.bio))}</p>` : ''}
        ${socialLinksHtml}
      </div>
    </div>
  `;
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the site
 */
async function init() {
  // Initialize theme and language
  initTheme();
  initLang();

  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Setup event listeners
  setupKeyboardListeners();

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Language select
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => setLang(e.target.value));
  }

  try {
    contentData = await fetchContent();

    // Update i18n elements
    updateI18nElements();

    // Render content
    renderProjects(contentData.projects);
    renderProfile(contentData.profile);

    // Setup click handlers after rendering
    setupProjectCardListeners();
  } catch (error) {
    // Show error state
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = `
        <div class="error-state">
          <p>${escapeHtml(ui('loadError'))}</p>
        </div>
      `;
    }
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
