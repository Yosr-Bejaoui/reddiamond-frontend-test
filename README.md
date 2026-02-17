# UserBase

A React 19 application that fetches and displays users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com), featuring search, pagination, and detailed profile views.

## Getting Started

**Prerequisites:** Node.js ≥ 18

```bash
npm install
npm start
```

Opens [http://localhost:3000](http://localhost:3000) automatically.

## Project Structure

```
src/
├── components/     Reusable UI (Navbar, UserCard, Loader, ErrorMessage, InfoRow)
├── pages/          UsersPage, UserDetailPage, NotFoundPage
├── services/       api.js — all fetch calls in one place
├── hooks/          useFetch.js — generic async data hook
├── context/        SearchContext.js — global search state
└── styles/         global.css — design tokens, animations
```

## Key Technical Decisions

- **`useFetch` custom hook** — encapsulates loading/error/data state, with a cancellation guard to prevent setting state on unmounted components
- **Context API** for search — the Navbar search bar feeds the list page without prop drilling
- **Parallel fetching** on the detail page — user info and posts are fetched simultaneously
- **CSS Modules** — scoped styles per component, no class name collisions

## Routes

| Path | Description |
|---|---|
| `/` | User list with search and pagination |
| `/details/:id` | Full user profile + their posts |
| `*` | 404 Not Found |

## Tech Stack

| | |
|---|---|
| React 19 | UI |
| React Router v6 | Client-side routing |
| Context API | Global search state |
| CSS Modules | Scoped component styles |

## Author

Yosr BEJAOUI