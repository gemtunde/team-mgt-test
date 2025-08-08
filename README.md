This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash

npm install to install dependencies

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Complete Implementation Summary

✅ Architecture & Setup

Next.js 14 with App Router and TypeScript (strict mode)
Zustand for state management (chosen over Context for better performance)
shadcn/ui + Tailwind CSS for modern, accessible UI
Proper folder structure with clear separation of concerns
No use of any - fully type-safe implementation

✅ Core Features

500+ Mock Teams with realistic data in src/data/teams.ts
Complete CRUD Operations with 500ms simulated delays
Advanced Table Features:

Sortable columns (click headers)
Text search (name/code)
Client-side pagination (10/20 rows)
Responsive design down to tablet (768px+)

✅ Forms & Validation

React Hook Form + Zod for robust validation
Side modals for Create/Edit operations
Real-time validation with proper error handling
All fields required with validation rules

✅ Accessibility (A11y)

Semantic HTML with proper ARIA roles
Keyboard navigation support
Screen reader compatibility
Color contrast compliance
Focus management in modals

✅ Performance Optimizations

Efficient state management with selective re-renders
Memoization where appropriate
Optimized table rendering
Proper error boundaries

#Architecture Decisions

##State Management: Zustand over React Context
Rationale: I used Zustand because it provides superior performance for frequent CRUD operations through selective subscriptions, avoiding unnecessary re-renders that plague Context-based solutions.

##Client-Side Pagination vs Virtualization
Decision: I Implemented client-side pagination for better UX and simpler state management. With 500+ items, pagination provides better performance than rendering all items, while being simpler than virtualization for this case.
