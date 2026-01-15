# in30days.org

Master any skill in 30 days with structured learning paths, 3community-driven content, and interactive progress tracking.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Hugo](https://img.shields.io/badge/hugo-%3E%3D0.112-ff4088)

## Overview

**in30days** is an educational ecosystem designed for mastery through consistency. In30days provides curated **Learning Paths** that sequence specialized **30-day courses** to guide you from absolute beginner to professional competence.

### Core Features
- **Mastery-Based Progression:** Lessons are locked until you pass the previous day's quiz with an **80% score**.
- **Unified Learning Paths:** Group courses into professional roadmaps (e.g., "Mastering Python").
- **Cross-Device Sync:** Optional cloud synchronization via Firebase (Anonymous & Google Auth).
- **Interactive Content:** Localized diagrams (Mermaid.js), code examples, and discussion threads (Giscus).
- **Privacy First:** Granular control over data collection directly from our privacy dashboard.

## Live Site
Visit [in30days.org](https://in30days.org) to start your journey!

## Project Structure

```text
in30days/
├── main-site/              # Primary landing page (in30days.org)
│   ├── data/               # Catalog, Paths, Contributors, Stats
│   ├── content/paths/      # Learning path roadmap pages
│   └── themes/             # Landing site theme
│
├── courses/                # Individual 30-day course repositories
│   └── python/             # Sample course: Python Basics
│
├── shared-theme/           # Centralized theme for all course subsites
│   └── in30days-course/    # Layouts, CSS, and JS components
│
├── scripts/                # Automation and scaffolding scripts
└── .github/workflows/      # CI/CD for deployment and analytics
```

## Quick Start for Contributors

We welcome the community to contribute new courses and learning paths!

### Scaffolding Tools

```bash
# 1. Create your contributor profile
./scripts/new-contributor.sh github_handle "Full Name" "Short Bio"

# 2. Start a new course (linked to your profile)
./scripts/new-course.sh course-id "Course Name" github_handle "#color"

# 3. Create a learning path roadmap
./scripts/new-path.sh path-id "Path Name" github_handle "#color"
```

### Local Development

1. **Install Hugo Extended** (v0.112+) and **Node.js** (for analytics scripts).
2. **Start Servers:**
   - Main Site: `hugo server --source ./main-site --port 1313`
   - Course Site: `hugo server --source ./courses/python --port 1314 --baseURL http://localhost:1314`

## Automation & Analytics

### Daily Learner Statistics
We automatically aggregate unique learner counts per course via a daily GitHub Action.

**Setup Required:**
1. Generate a **Firebase Service Account Key** (JSON) in your Firebase Console.
2. Add the JSON content to your GitHub Repository Secrets as `FIREBASE_SERVICE_ACCOUNT`.
3. The `Daily Analytics Sync` workflow will now update `main-site/data/stats.yaml` every 24 hours.

## Deployment
Deployment is automated via **GitHub Actions**. Every push to the `main` branch triggers the `Build all sites` workflow, which uses `./scripts/build-all.sh` to compile the entire ecosystem into a single `public/` directory for GitHub Pages.

---
Made with ❤️ for learners everywhere.
