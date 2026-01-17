/**
 * Portfolio Site JavaScript
 * Handles content loading and rendering
 */

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
// Projects Rendering (US1)
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
        <p>Projects coming soon!</p>
      </div>
    `;
    return;
  }

  // Sort projects by order
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

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
        <p class="project-description">${escapeHtml(project.description)}</p>
        ${project.tags && project.tags.length > 0 ? `
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
        ` : ''}
        <div class="project-links">
          ${project.sourceUrl ? `
            <a href="${escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">
              GitHub
            </a>
          ` : ''}
          ${project.demoUrl ? `
            <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link project-link--primary">
              Visit
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');
}

// ============================================
// Project Details Modal (US3)
// ============================================

// Store projects data for modal access
let projectsData = [];

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
      ${project.fullDescription
        ? `<p class="modal-description">${escapeHtml(project.fullDescription)}</p>`
        : `<p class="modal-description">${escapeHtml(project.description)}</p>`
      }
      ${project.tags && project.tags.length > 0 ? `
        <div class="project-tags modal-tags">
          ${project.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      ` : ''}
      <div class="modal-links">
        ${project.sourceUrl ? `
          <a href="${escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">
            GitHub
          </a>
        ` : ''}
        ${project.demoUrl ? `
          <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link project-link--primary">
            Visit
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
// Profile Rendering (US2)
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
        <p>Profile information coming soon!</p>
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
        ${profile.headline ? `<p class="profile-headline">${escapeHtml(profile.headline)}</p>` : ''}
        ${profile.bio ? `<p class="profile-bio">${escapeHtml(profile.bio)}</p>` : ''}
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
  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Setup keyboard listeners for modal
  setupKeyboardListeners();

  try {
    const content = await fetchContent();

    // Store projects for modal access
    projectsData = content.projects || [];

    renderProjects(content.projects);
    renderProfile(content.profile);

    // Setup click handlers after rendering
    setupProjectCardListeners();
  } catch (error) {
    // Show error state
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = `
        <div class="error-state">
          <p>Unable to load content. Please try again later.</p>
        </div>
      `;
    }
  }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
