# PH Film Media

A small business website for showcasing upcoming projects and general information about the business owner. Built with Next.js, Sanity CMS, and Tailwind CSS.

## Features

- Dynamic pages for business information and upcoming projects
- Content management via Sanity Studio (accessible at `/studio`)
- SEO fields for better search engine visibility
- Responsive design with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Sanity CMS](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Yarn, npm, pnpm, or bun

### Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ph-film-media
   ```
2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   # or
   pnpm install
   # or
   bun install
   ```
3. **Configure environment variables:**

   - Copy `.env.example` to `.env.local` and fill in the required values:
     - `NEXT_PUBLIC_SANITY_API_VERSION`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL`

4. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) to view the site.
   - Visit [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio (content management).

## Usage

- Edit content and manage projects via Sanity Studio.
- The site auto-updates as you edit content in the CMS.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
