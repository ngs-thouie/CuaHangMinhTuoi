# AGENTS.md — CuaHangMinhTuoi

## What this is

Two-package repo: `frontend/` (React + Vite) and `backend/` (Express + MongoDB). No monorepo tooling — just a root `package.json` with `concurrently`.

## Commands

```bash
# Both (from root)
npm run dev

# Frontend only
cd frontend && npm run dev    # http://localhost:5173

# Backend only
cd backend && npm run dev     # http://localhost:5000

# Build
npm run build                # builds frontend then backend
```

**No lint, test, or format commands exist.** The frontend build step runs `tsc && vite build` (TypeScript strict mode catches type errors). Backend build is just `tsc`.

## API routing gotcha

Frontend axios services hardcode `baseURL: 'http://localhost:5000/api'` — they hit the backend **directly**, bypassing the Vite dev server. The Vite proxy in `vite.config.ts` rewrites `/api` → strips the prefix, which would conflict with backend routes mounted at `/api/*`. This proxy is effectively dead config. Do not rely on it.

## Backend

- ESM (`"type": "module"` in package.json). Dev runner: `tsx watch src/index.ts`.
- Requires MongoDB at `mongodb://localhost:27017/cuahangminhttuoi`. Copy `backend/.env.example` → `backend/.env`.
- Routes: `/api/auth`, `/api/products`, `/api/orders`.
- Auth middleware attaches `req.userId` and `req.userRole` from JWT. Admin routes chain `adminMiddleware`.

## Frontend

- TailwindCSS with custom theme colors: `primary` (#16a34a green), `secondary` (#ea580c orange). Use these in `className` strings.
- TypeScript strict with `noUnusedLocals` and `noUnusedParameters` — unused imports/vars will fail the build.
- Cart state lives in `CartContext` (React Context, not Redux).
- Routes are in `App.tsx`: `/`, `/menu`, `/cart`, `/checkout`, `/payment/:orderId`, `/login`, `/register`, `/admin`.

## Key files

- `frontend/src/services/` — API client layer (axios instances with JWT interceptor)
- `backend/src/controllers/` — request handlers
- `backend/src/models/` — Mongoose schemas (Product, Order, User)
- `backend/src/middleware/auth.ts` — JWT + admin guard
- `.github/copilot-instructions.md` — existing dev guidelines (overlaps with this file)
