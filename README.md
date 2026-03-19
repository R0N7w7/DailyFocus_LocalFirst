# Daily Focus

Daily Focus is a local-first task management app built with React, TypeScript, Dexie, and TanStack Query.  
It helps you capture, complete, and review daily tasks with a clean UI and instant data updates.

## Why this project is different

The app uses **TanStack Query as the data orchestration layer across the entire UI**.

Even though persistence is local (IndexedDB via Dexie), TanStack Query gives the app:

- a centralized cache for tasks
- consistent loading and mutation states
- automatic UI refresh through query invalidation
- reusable data hooks (`useTasks`, `useAddTask`, `useUpdateTask`, `useDeleteTask`)

This architecture keeps components simple and makes it easy to switch from local DB to remote APIs later.

## Tech stack

- React 19 + TypeScript
- Vite
- React Router
- TanStack Query
- Dexie (IndexedDB)
- Tailwind CSS + Radix-style UI primitives
- ESLint

## Architecture overview

The project follows a layered frontend architecture:

1. **UI Layer** (`components`, `pages`)  
	Renders views, handles user interactions, and consumes query hooks.
2. **Query Layer** (`queries/task.queries.ts`)  
	Encapsulates read/write operations with `useQuery` and `useMutation`.
3. **Service Layer** (`services/taskService.ts`)  
	Defines data access methods (`getAllTasks`, `addTask`, `updateTask`, etc.).
4. **Persistence Layer** (`data/db.ts`)  
	Dexie schema and IndexedDB setup.
5. **Domain Layer** (`types/task.ts`)  
	Shared task types used across app layers.

### Data flow

```text
HomePage/TaskItem -> TanStack Query hooks -> taskService -> Dexie -> IndexedDB
										^
										|
						  Query cache + invalidation
```

## TanStack Query usage in this app

TanStack Query is initialized at application bootstrap with `QueryClientProvider`.

### Queries

- `useTasks()`
  - `queryKey: ['tasks']`
  - Returns all tasks for the main list and summary cards.
- `useTask(id)`
  - `queryKey: ['task', id]`
  - Returns a single task by id.

### Mutations

- `useAddTask()`
  - Adds a task through the service layer.
  - Invalidates `['tasks']` on success.
- `useUpdateTask()`
  - Updates a task (for completion toggle).
  - Invalidates `['tasks']` and `['task', id]`.
- `useDeleteTask()`
  - Deletes a task.
  - Invalidates `['tasks']` and `['task', id]`.

### Why invalidation matters here

Instead of manually synchronizing component state after every write, mutations trigger invalidation and TanStack Query refetches fresh data. This keeps UI state trustworthy and reduces bugs caused by stale local state.

## Project tree

```text
.
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
├─ dev-dist/
├─ public/
│  └─ vite.svg
└─ src/
	├─ App.css
	├─ App.tsx
	├─ index.css
	├─ main.tsx
	├─ components/
	│  ├─ Layout.tsx
	│  ├─ TaskItem.tsx
	│  └─ ui/
	│     ├─ badge.tsx
	│     ├─ button.tsx
	│     ├─ card.tsx
	│     ├─ input.tsx
	│     ├─ tabs.tsx
	│     └─ textarea.tsx
	├─ data/
	│  └─ db.ts
	├─ lib/
	│  └─ utils.ts
	├─ pages/
	│  └─ HomePage.tsx
	├─ queries/
	│  └─ task.queries.ts
	├─ routes/
	│  ├─ AppRoutes.tsx
	│  └─ index.tsx
	├─ services/
	│  └─ taskService.ts
	└─ types/
		└─ task.ts
```

## Getting started

### Requirements

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## NPM scripts

- `npm run dev`: starts Vite dev server
- `npm run build`: TypeScript build + Vite production build
- `npm run preview`: serves production bundle locally
- `npm run lint`: runs ESLint

## Domain model

`Task` fields:

- `id?: number`
- `title: string`
- `description?: string`
- `completed: boolean`
- `createdAt: number`
- `category?: string`

## Current features

- Add tasks with title and optional description
- Toggle task completion
- Delete tasks
- Filter tasks by all/completed/pending
- Dashboard counters (total/completed/pending)
- Local persistence with IndexedDB
- Automatic UI synchronization through TanStack Query cache invalidation

## Scaling notes

If you later move from Dexie to a backend API, most UI code can remain unchanged. You mainly replace service methods while keeping query keys and mutation patterns.

## License

Private project.

