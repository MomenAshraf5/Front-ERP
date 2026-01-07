# ERP Management System - Frontend

## 📋 Project Overview

Modern ERP Management System built with React 19, featuring employee management, attendance tracking, payroll, and performance monitoring.

**Technology Stack:**

- React 19.2.0 with Vite 7
- React Router 7.11
- TanStack Query 5 (React Query)
- Tailwind CSS 4.1
- shadcn/ui components
- React Hook Form + Zod validation

---

## 🎯 Current Implementation Status

### ✅ Completed Features

#### 1. Authentication UI

- Login form component
- Theme provider (light/dark mode)
- Basic layout structure

## 🚀 Setup Instructions

### Prerequisites

```bash
Node.js 25.2.1 or higher
npm or pnpm
```

### Installation

1. **Clone the repository**

```bash
cd FrontEnd
```

2. **Install dependencies**

```bash
pnpm install
```

4. **Run development server**

```bash
pnpm run dev
```

5. **Build for production**

```bash
pnpm run build
```

6. **Preview production build**

```bash
pnpm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── field.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   └── separator.jsx
│   ├── login-form.jsx  # Login form component
│   ├── mode-toggle.jsx # Theme switcher
│   └── theme-provider.jsx
├── Pages/              # Page components
│   ├── AppLayout.jsx   # Main layout wrapper
│   ├── Dashboard.jsx   # Dashboard (empty)
│   └── Login.jsx       # Login page (empty)
├── lib/                # Utilities
│   └── utils.js        # Helper functions (cn)
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

---

## 🎨 UI Components Available

### shadcn/ui Components

- ✅ Button (with variants: default, destructive, outline, secondary, ghost, link)
- ✅ Card (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- ✅ Field (Field, FieldGroup, FieldLabel, FieldDescription, FieldError)
- ✅ Input
- ✅ Label
- ✅ Separator

### Custom Components

- ✅ LoginForm
- ✅ ModeToggle (Theme switcher)
- ✅ ThemeProvider

---

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start dev server (http://localhost:5173)

# Production
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
```

---

## 📦 Dependencies

### Core

- **react**: 19.2.0 - UI library
- **react-dom**: 19.2.0 - React DOM renderer
- **react-router**: 7.11.0 - Routing

### State & Data

- **@tanstack/react-query**: 5.90.12 - Server state management
- **@tanstack/react-table**: 8.21.3 - Table component

### Forms & Validation

- **react-hook-form**: 7.69.0 - Form management
- **zod**: 4.2.1 - Schema validation
- **@hookform/resolvers**: 5.2.2 - Form validation integration

### UI & Styling

- **tailwindcss**: 4.1.18 - CSS framework
- **@tailwindcss/vite**: 4.1.18 - Vite plugin
- **lucide-react**: 0.562.0 - Icons
- **class-variance-authority**: 0.7.1 - Variant utilities
- **clsx**: 2.1.1 - Class name utility
- **tailwind-merge**: 3.4.0 - Merge Tailwind classes

### Charts & Visualization

- **recharts**: 3.6.0 - Charts library

### Utilities

- **date-fns**: 4.1.0 - Date manipulation
- **react-hot-toast**: 2.6.0 - Toast notifications

### Radix UI (via shadcn/ui)

- @radix-ui/react-accordion
- @radix-ui/react-label
- @radix-ui/react-separator
- @radix-ui/react-slot

---

## 🎨 Theming

The project uses a custom Tailwind CSS configuration with:

- ✅ Light/Dark mode support
- ✅ Custom color system (oklch)
- ✅ Consistent design tokens
- ✅ Responsive utilities

**Theme Toggle:**

```jsx
import { ModeToggle } from "@/components/mode-toggle";

<ModeToggle />;
```

---

## 📚 Development Guidelines

### Code Style

- Use functional components
- Follow React Hooks conventions
- Use Tailwind utility classes
- Leverage shadcn/ui components

### File Naming

- Components: PascalCase (e.g., `LoginForm.jsx`)
- Utilities: camelCase (e.g., `utils.js`)
- Pages: PascalCase (e.g., `Dashboard.jsx`)

---
