# Employee Polls

Employee Polls is a React + Redux application for voting on "Would You Rather" style questions. It includes authentication, protected routes, poll creation, voting, and leaderboard ranking.

## Tech Stack

- Vite + React + TypeScript
- Redux Toolkit + React Redux
- React Router
- shadcn-style component primitives + BaseUI
- Jest + React Testing Library

## Install

```bash
npm install
```

## Run

Reviewer-compatible launch command:

```bash
npm start
```

Equivalent Vite command:

```bash
npm run dev
```

## Test

Reviewer-compatible test command:

```bash
npm start test
```

Equivalent direct command:

```bash
npm test
```

## Build

```bash
npm run build
```

## Routes

- `/login` Login
- `/` Dashboard (answered/unanswered polls)
- `/questions/:question_id` Poll details
- `/add` Create poll
- `/leaderboard` Leaderboard
- `*` 404 page
