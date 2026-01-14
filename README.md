# in30days

Master any skill in 30 days with interactive learning paths. Go from zero to hero!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Hugo](https://img.shields.io/badge/hugo-%3E%3D0.112-ff4088)

## Overview

**in30days** is an open-source learning platform built with Hugo. It provides structured 30-day courses for learning programming languages and technologies, featuring:

- Daily lessons with reading content
- Interactive quizzes (80% pass score to unlock next day)
- Progress tracking with local storage
- Optional cloud sync with Firebase
- Dark mode and focus reading mode
- Community discussions via Giscus

## Live Site

Visit [in30days.org](https://in30days.org) to start learning!

## Available Courses

- **Python in 30 Days** - Master Python programming from beginner to intermediate
- More courses coming soon...

## Project Structure

```
in30days/
├── main-site/              # Landing page (in30days.org)
│   ├── content/
│   ├── data/courses.yaml   # Course catalog
│   └── themes/in30days-landing/
│
├── courses/                # Individual course sites
│   └── python/             # python.in30days.org
│       ├── content/
│       │   ├── _index.md   # Course overview
│       │   ├── day-01/     # Day 1 content + quiz
│       │   └── day-XX/
│       └── hugo.toml
│
├── shared-theme/           # Shared course theme
│   └── in30days-course/
│       ├── layouts/
│       ├── assets/
│       │   ├── css/
│       │   └── js/
│       └── static/
│
├── scripts/                # Build and scaffolding scripts
├── .github/workflows/      # GitHub Actions deployment
└── firebase-config.js      # Firebase configuration (placeholder)
```

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.112+)
- [Git](https://git-scm.com/)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/in30days/in30days.git
   cd in30days
   ```

2. Run the main site:
   ```bash
   hugo server --source ./main-site
   ```

3. Run a course site:
   ```bash
   hugo server --source ./courses/python
   ```

4. Build all sites:
   ```bash
   # Linux/macOS
   ./scripts/build-all.sh
   
   # Windows
   .\scripts\build-all.ps1
   ```

## Creating Content

### Add a New Course

```bash
./scripts/new-course.sh rust "Rust in 30 Days" "#dea584"
```

Then update:
1. `main-site/data/courses.yaml` - Add course to catalog
2. `.github/workflows/deploy.yml` - Add build step
3. Course content in `courses/rust/content/`

### Add a New Day

```bash
./scripts/new-day.sh python 4 "Control Flow - If Statements"
```

This creates:
- `courses/python/content/day-04/index.md` - Lesson content
- `courses/python/content/day-04/quiz.json` - Quiz data

### Content Features

#### Shortcodes

```markdown
{{< video id="VIDEO_ID" title="Video Title" >}}

{{< mermaid >}}
flowchart LR
    A --> B --> C
{{< /mermaid >}}

{{< callout type="tip" title="Pro Tip" >}}
Helpful information here.
{{< /callout >}}

{{< code-file filename="example.py" lang="python" >}}
print("Hello!")
{{< /code-file >}}

{{< interactive-table >}}
| Header | Header |
|--------|--------|
| Data   | Data   |
{{< /interactive-table >}}

{{< progress-check id="unique-id" >}}Check this when done{{< /progress-check >}}
```

#### Quiz Format (quiz.json)

```json
{
  "dayId": 1,
  "passScore": 80,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-select",
      "points": 25,
      "question": "Select all correct answers:",
      "options": [
        { "id": "a", "text": "Option A", "correct": true },
        { "id": "b", "text": "Option B", "correct": false }
      ],
      "explanation": "Explanation shown after answering."
    },
    {
      "id": "q2",
      "type": "drag-order",
      "points": 25,
      "question": "Arrange in correct order:",
      "items": [
        { "id": "a", "text": "First" },
        { "id": "b", "text": "Second" }
      ],
      "correctOrder": ["a", "b"],
      "explanation": "Explanation here."
    }
  ]
}
```

## Configuration

### Firebase Setup (Optional)

For cloud sync, create a Firebase project and update `firebase-config.js`:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable **Anonymous Authentication** (and Google Auth if you want permanent linking)
4. Create a **Firestore Database** in **Test Mode** (or use the rules below)
5. Copy config values to `firebase-config.js` in the theme's static folder

#### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /courses/{courseId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

#### Sync Features
- **Anonymous Sync:** Progress is saved automatically to a temporary cloud profile.
- **Account Linking:** Users can link their Google account via the Settings modal to persist progress across different browsers and devices.
- **Auto-merge:** If a user logs in on a new device, the system intelligently merges their local and cloud progress.

For comments, configure Giscus:

1. Enable [Giscus](https://giscus.app/) on your repository
2. Update `params.giscus` in each course's `hugo.toml`

## Deployment

### GitHub Pages (Recommended)

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Configure custom domain in repository settings

### Manual Deployment

```bash
./scripts/build-all.sh https://your-domain.com
# Upload ./public/ to your hosting provider
```

## Customization

### Theme Colors

Edit `shared-theme/in30days-course/assets/css/variables.css`:

```css
:root {
  --color-primary: #6366f1;
  --course-color: #3b82f6;
  /* ... */
}
```

### Course Colors

Set in each course's `hugo.toml`:

```toml
[params]
  courseColor = "#3b82f6"
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Content Contributions

Help us improve courses by:
- Fixing typos and errors
- Adding examples and explanations
- Creating new quiz questions
- Translating content

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with [Hugo](https://gohugo.io/)
- Comments powered by [Giscus](https://giscus.app/)
- Diagrams by [Mermaid.js](https://mermaid.js.org/)
- Icons from [Heroicons](https://heroicons.com/)

---

Made with ❤️ for learners everywhere
