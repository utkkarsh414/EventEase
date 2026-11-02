# EventEase – College Event Registration Portal

A modern, responsive ReactJS web application for browsing upcoming college events and registering with personal and academic details.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

- **Browse Events** – View upcoming events like TechFest, CodeSprint, Cultural Night, and InnovateX.
- **Register** – Submit a form with full name, email, mobile, department, year, and event selection.
- **Client-Side Validation** – Real-time field-level validation with meaningful error messages.
- **Duplicate Prevention** – Same email cannot register for the same event twice.
- **Persistent Data** – Registrations are stored in `localStorage` and survive browser refreshes.
- **Delete Registrations** – Remove any registration from the participants list.
- **Responsive Design** – Works on mobile (375px), tablet (768px), and desktop (1440px).

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library (functional components, hooks) |
| Vite 6 | Development server and build tool |
| CSS3 | Styling with custom properties |
| localStorage | Client-side data persistence |

---

## Project Structure

```
eventease/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx            # Entry point
    ├── App.jsx             # Root component & state management
    ├── index.css           # Global styles
    └── components/
        ├── Navbar.jsx       # Navigation bar
        ├── Hero.jsx         # Hero/banner section
        ├── EventCard.jsx    # Reusable event card
        ├── EventsSection.jsx# Events grid section
        ├── RegistrationForm.jsx # Registration form with validation
        ├── RegistrationList.jsx # Registered participants list
        └── Footer.jsx       # Footer
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

```bash
# Clone or navigate to the project folder
cd eventease

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The optimized output is in the `dist/` folder.

### Preview Build Locally

```bash
npm run preview
```

---

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Vite — no configuration needed.
4. Click **Deploy**.

Alternatively, using the Vercel CLI:

```bash
npm i -g vercel
vercel
```

---

## React Concepts Used

| Concept | Where |
|---|---|
| **Functional Components** | All components (`Navbar`, `Hero`, `EventCard`, etc.) |
| **useState** | Form values, validation errors, registrations, mobile menu toggle |
| **useEffect** | localStorage sync, pre-selecting event on card click |
| **Props** | Event data → `EventCard`, registrations → `RegistrationList`, callbacks → child components |
| **Controlled Inputs** | All form fields use `value` + `onChange` |
| **Event Handling** | `onSubmit`, `onChange`, `onClick` across form and buttons |
| **Conditional Rendering** | Error messages, success banner, empty state, mobile menu |
| **List Rendering** | `map()` with unique `key` for events and registrations |
| **Lifting State Up** | Form calls `onRegister` prop; list calls `onDelete` prop |

---

## License

MIT
