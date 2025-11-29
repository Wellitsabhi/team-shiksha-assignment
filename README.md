# Team Shiksha Assignemt

This project uses Next.js (App Router), MongoDB with Mongoose, JWT authentication, Tailwind CSS, and a full testing setup using Vitest and React Testing Library. This document explains how to set up the project locally, run the development server, run tests, and troubleshoot common issues.

## Requirements

- Node.js 18 or later
- npm 9 or later
- Git
- MongoDB (local or Atlas) for development API testing

## Local Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment config

Create a `.env.local` file at the root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/teams-assign-dev
JWT_SECRET=a_long_random_secret_value
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

> **Note:** If MongoDB is not running, you can still run the UI. API routes will fail until DB is available.

### 4. Start the development server

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## File Structure Overview

```
app/
  api/
    auth/
      login/route.ts
      register/route.ts
    logout/route.ts
    user/route.ts
  dashboard/
  not-found.tsx
components/
  Auth/SignUpForm.tsx
lib/
  jwt.ts
  mongoose.ts
middleware.ts
tests/
  jwt.util.test.ts
  signup.test.tsx
  api.test.ts
  vitest.setup.ts
```

## Testing

This project uses Vitest with React Testing Library and jsdom.

### Test setup file

`tests/vitest.setup.ts`:

```typescript
import "@testing-library/jest-dom";

process.env.JWT_SECRET = "test_secret";
process.env.JWT_EXPIRES_IN = "7d";
```

### Run all tests

```bash
npm run test
```

### Run in watch mode

```bash
npm run test:watch
```

### Run test UI

```bash
npm run test:ui
```

### Run a specific test file

```bash
npm run test -- tests/signup.test.tsx
```

## Features

- ✅ Next.js 14+ with App Router
- ✅ MongoDB with Mongoose
- ✅ JWT authentication with httpOnly cookies
- ✅ Tailwind CSS + shadcn/ui components
- ✅ Sonner toast notifications
- ✅ Zod validation
- ✅ Full test coverage with Vitest
- ✅ TypeScript support
- ✅ Dark mode support

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/teams-assign-dev` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_here` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL for client-side requests | `http://localhost:3000/api` |

## Troubleshooting

### MongoDB Connection Issues

If you see MongoDB connection errors:
1. Ensure MongoDB is running locally: `mongod`
2. Or use MongoDB Atlas and update `MONGODB_URI`

### JWT Token Issues

If authentication fails:
1. Check that `JWT_SECRET` is set in `.env.local`
2. Clear browser cookies and try again

### Test Failures

If tests fail:
1. Ensure `JWT_SECRET` is set in `tests/vitest.setup.ts`
2. Run `npm run test:watch` to see detailed errors

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

