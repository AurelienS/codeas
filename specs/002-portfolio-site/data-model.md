# Data Model: Personal Portfolio Website

**Feature**: 002-portfolio-site
**Date**: 2026-01-17

## Overview

All data is stored in a single JSON file (`src/data/content.json`). No database required.

## Entities

### Profile

The portfolio owner's information displayed in the About section.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name of the portfolio owner |
| `headline` | string | No | Short tagline or title (e.g., "Full Stack Developer") |
| `bio` | string | Yes | Personal description/biography (supports line breaks) |
| `image` | string | No | Path to profile image (relative to assets/) |
| `socialLinks` | SocialLink[] | Yes | Array of social/contact links (min 1) |

**Validation Rules**:
- `name`: 1-100 characters
- `bio`: 1-1000 characters
- `socialLinks`: At least one link required (GitHub per FR-004)

### Project

A side project to showcase.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (slug format, e.g., "my-project") |
| `name` | string | Yes | Project display name |
| `description` | string | Yes | Brief description (shown in list view) |
| `fullDescription` | string | No | Detailed description (shown in expanded view) |
| `image` | string | No | Path to screenshot/thumbnail (relative to assets/) |
| `sourceUrl` | string | No* | URL to source code repository |
| `demoUrl` | string | No* | URL to live demo |
| `tags` | string[] | No | Technology tags (e.g., ["JavaScript", "React"]) |
| `order` | number | Yes | Display order (lower = first) |

**Validation Rules**:
- `id`: Lowercase alphanumeric with hyphens, 1-50 characters
- `name`: 1-100 characters
- `description`: 1-300 characters
- `fullDescription`: 0-2000 characters
- `sourceUrl` or `demoUrl`: At least one required (per FR-002)
- `order`: Integer, unique per project
- `tags`: 0-10 items, each 1-30 characters

### SocialLink

An external link to a profile or contact method.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `platform` | string | Yes | Platform name (e.g., "GitHub", "LinkedIn", "Email") |
| `url` | string | Yes | Full URL (or mailto: for email) |
| `icon` | string | No | Icon identifier (for future use) |

**Validation Rules**:
- `platform`: 1-50 characters
- `url`: Valid URL or mailto: format

## Relationships

```
┌─────────────┐
│   Content   │  (root object in content.json)
├─────────────┤
│ profile     │──────► Profile (1)
│ projects    │──────► Project[] (0..n)
└─────────────┘

┌─────────────┐
│   Profile   │
├─────────────┤
│ socialLinks │──────► SocialLink[] (1..n)
└─────────────┘
```

## State Transitions

Not applicable - all data is static. Content changes require file edit and redeploy.

## Example Data Structure

```json
{
  "profile": {
    "name": "Jane Doe",
    "headline": "Full Stack Developer",
    "bio": "I build things for the web...",
    "image": "images/profile.jpg",
    "socialLinks": [
      { "platform": "GitHub", "url": "https://github.com/janedoe" },
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/janedoe" },
      { "platform": "Email", "url": "mailto:jane@example.com" }
    ]
  },
  "projects": [
    {
      "id": "awesome-project",
      "name": "Awesome Project",
      "description": "A brief description of the project.",
      "fullDescription": "A longer description with more details...",
      "image": "images/awesome-project.png",
      "sourceUrl": "https://github.com/janedoe/awesome-project",
      "demoUrl": "https://awesome-project.example.com",
      "tags": ["JavaScript", "Node.js"],
      "order": 1
    }
  ]
}
```

## Data Volume Assumptions

- Profile: 1 (single owner)
- Projects: 5-20 typical, max ~50
- Social Links: 2-5 typical, max ~10

Total JSON file size: < 50KB expected
