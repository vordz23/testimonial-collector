# Testimonial Collector

A simple tool for small businesses to collect, display, and manage client testimonials.

## Features

- **Public Submission Form** - Easy feedback form with star rating
- **Admin Dashboard** - Approve or reject testimonials
- **Embed Widget** - Carousel widget for your website

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
npm run db:push
npm run db:seed
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Access the app

- **Public Form**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin
- **Default Password**: admin123

## Usage

1. Share the public form URL with your clients
2. Clients submit testimonials with ratings
3. Log in to the admin dashboard to approve/reject
4. Copy the embed code to display testimonials on your website

## Embed Widget

After approving testimonials, get your embed code from `/admin/widget` and paste it on your website. The widget displays testimonials in a rotating carousel.

## Tech Stack

- Next.js 14 (App Router)
- SQLite with Prisma ORM
- Tailwind CSS
- iron-session for authentication
