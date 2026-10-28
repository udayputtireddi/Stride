# Stride

Modern sports equipment storefront with a bold, editorial UI and fast browsing experience.

## Screenshots

**Desktop**

<img width="1709" height="881" alt="Screenshot 2025-12-18 at 10 09 32 PM" src="https://github.com/user-attachments/assets/216572a3-1c39-418c-8a0e-bb57885a8ba2" />

<img width="1708" height="983" alt="Screenshot 2025-12-18 at 10 09 53 PM" src="https://github.com/user-attachments/assets/68ac2315-3ab6-4cff-8f5c-63f761a70cf8" />

**Mobile**

<img width="603" height="1311" alt="IMG_7906" src="https://github.com/user-attachments/assets/2469b188-7899-4cb9-80c4-1ddd345a0053" />

<img width="603" height="1311" alt="IMG_7907" src="https://github.com/user-attachments/assets/7a5e86d2-2a5c-4bfd-bbea-0fa70bf1250d" />

## Features

- Curated product catalog with category and activity filters.
- Editorial hero carousel and merchandising sections.
- Mobile-first navigation with sleek bottom bar.
- Static product imagery for reliable loading.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase Hosting

## Getting Started

1. Install dependencies:
   `npm install`
2. Start the dev server:
   `npm run dev`

## Build

`npm run build`

## Deploy (Firebase Hosting)

Deployment requires the approved backend, server secrets, quota database and hosting rewrite. Follow [the staged rollout instructions](docs/ai-backend-security.md); do not run a bare `firebase deploy`.



## AI backend security

AI now uses an authenticated server endpoint; never put Gemini credentials in Vite
environment variables. Backend deployment and secret rotation remain pending.
See [setup, limits, compatibility and validation](docs/ai-backend-security.md).
Next steps: review CI, configure the backend and approve a staged rollout.
