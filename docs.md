# Manthan Project Documentation

This document provides a comprehensive overview of the Manthan application, detailing the technology stack, architecture, file structure, and implementation details for both frontend and backend components.

## 1. Technology Stack

### Core Framework
*   **Next.js 14 (App Router)**: The main framework used for both frontend UI and backend API routes.
*   **React 18**: The JavaScript library for building the user interface.
*   **Node.js**: Even though not explicitly running a separate server, Next.js runs on Node.js to handle server-side rendering and API routes.

### Dependencies & Libraries
*   **@google/generative-ai**: Used to integrate Google's Gemini AI models for the document wizard.
*   **lucide-react**: A lightweight icon library used throughout the dashboard and landing page.
*   **html2pdf.js**: A client-side library to convert HTML elements (like the generated invoice) into downloadable PDF files.

### Styling
*   **CSS Modules**: Component-level styling (e.g., `dashboard.module.css`, `create-trade.module.css`) to keep styles scoped and maintainable.
*   **Global CSS**: `globals.css` defines the core color palette (Neon/Dark theme), typography (Outfit/Inter fonts), and reset rules.

---

## 2. Project Architecture

### Frontend (User Interface)
The frontend is built using React components organized within the Next.js App Router structure.

*   **Global State (`/context/GlobalContext.js`)**:
    *   Acts as the application's client-side "database".
    *   Stores `user` profile, `trades` list, and `notifications`.
    *   Provides functions like `addTrade` to update state from anywhere in the app.
    *   Wraps the entire application in `layout.js` to ensure data persistence across page navigations.

*   **Layouts**:
    *   **Root Layout (`/app/layout.js`)**: Imports fonts and the GlobalProvider.
    *   **Dashboard Layout (`/components/DashboardShell.js`)**: Provides the persistent sidebar navigation and top bar for all dashboard pages.

*   **Key Pages**:
    *   **Landing Page (`/app/page.js`)**: The public-facing marketing page.
    *   **Dashboard Overview (`/app/dashboard/page.js`)**: Displays summary stats and active shipments table.
    *   **Create Trade (`/app/dashboard/create-trade/page.js`)**: A form to capture new trade details.
    *   **AI Wizard (`/app/dashboard/documents/ai-wizard/page.js`)**: Interactive chat interface for generating documents.

### Backend (API Routes)
Next.js allows creating serverless API endpoints within the same project.

*   **AI Chat Route (`/app/api/chat/route.js`)**:
    *   This is the backend for the AI Wizard.
    *   **Logic**: It accepts a POST request containing the user's message and current document data.
    *   **Integration**: It initializes the Google Gemini client (`gemini-flash-latest`), creates a chat session with a specific system instruction ("You are an expert global trade assistant..."), and returns the AI's response + any extracted structured data (JSON).

---

## 3. Directory Structure & Key Files

```plaintext
f:\manthan\
├── app\                            # Next.js App Router root
│   ├── api\
│   │   └── chat\
│   │       └── route.js            # [BACKEND] Gemini API Handler
│   ├── dashboard\
│   │   ├── create-trade\
│   │   │   └── page.js             # [FRONTEND] Form to create new trades
│   │   ├── documents\
│   │   │   ├── ai-wizard\
│   │   │   │   └── page.js         # [FRONTEND] AI Chart & Preview Interface
│   │   │   └── page.js             # Documents List View
│   │   ├── trades\
│   │   │   └── page.js             # All Trades List View
│   │   └── page.js                 # [FRONTEND] Main Command Center (Stats/Charts)
│   ├── layout.js                   # Root layout with GlobalContext provider
│   ├── page.js                     # Public Landing Page
│   └── globals.css                 # Global styles and variables
├── components\
│   ├── DashboardShell.js           # Reusable Sidebar & Header wrapper
│   └── Navbar.js                   # Public Navbar
├── context\
│   └── GlobalContext.js            # [STATE] Central data store (Trades, User, Alerts)
├── public\
│   ├── logo.jpg                    # Project Logo
│   └── images\                     # Static assets (hero-bg, etc.)
├── package.json                    # Project dependencies list
└── jsconfig.json                   # Path aliases configuration
```

## 4. How It Works Together

1.  **Starting the App**: Running `npm run dev` starts the Next.js development server.
2.  **User Navigation**:
    *   The user lands on `page.js`.
    *   Clicking "Launch App" navigates to `/dashboard`.
3.  **Data Flow**:
    *   The `Dashboard` component subscribes to `GlobalContext` to get the `trades` array.
    *   Any `addTrade` action in `/create-trade` updates this array in the Context.
    *   The Dashboard automatically re-renders to show the new count.
4.  **AI Workflow**:
    *   User types in `ai-wizard/page.js`.
    *   Frontend sends payload to `/api/chat`.
    *   Server calls Gemini API.
    *   Gemini returns text + JSON.
    *   Frontend extracts JSON to update the live document preview state.

## 5. Storage
*   **Current State**: Data is currently stored in **Client-Side Memory** via React Context. This means if you refresh the page completely (Ctrl+R), the new trades you created will reset to the mocks.
*   **Future Upgrade**: To persist data permanently, we would need to connect a database like MongoDB or PostgreSQL and move the `GlobalContext` logic to genuine backend API hooks.

