# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# 🧪 Testing Setup Guide

This project uses **Vitest** together with **React Testing Library** to test React components in a browser-like environment.
Follow the steps below to understand and run tests.

---

## 1. Dependencies

We use these testing tools:

- **vitest** → the main testing framework (similar to Jest, but faster).
- **jsdom** → simulates a browser environment so React components can run in tests.
- **@testing-library/react** → lets us render and test React components.
- **@testing-library/jest-dom** → adds helpful matchers like `toBeInTheDocument()`.
- **@testing-library/user-event** → simulates real user interactions (typing, clicking, etc.).

📦 Install them with:

```bash
npm i --save-dev vitest jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

---

## 2. Configuration

We configure Vitest in `vitest.config.ts` (or `.js`):

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // lets us use `describe`, `it`, `expect` globally
    environment: "jsdom", // provides a fake browser environment
    setupFiles: "./tests/setup", // runs the setup script before each test
  },
});
```

---

## 3. Test Setup

The setup file (`tests/setup.ts`) runs **before each test file**.
It ensures that every test starts fresh:

```ts
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Reset test environment after every test
afterEach(() => {
  cleanup(); // removes leftover DOM from previous test
  vi.clearAllMocks(); // clears all mock functions between tests
});
```

---

## 4. Writing Tests

Example test file: `Button.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button component", () => {
  it("renders the button with correct text", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles user click", async () => {
    const onClick = vi.fn();
    render(<Button label="Click me" onClick={onClick} />);

    await userEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 5. Running Tests

Run all tests:

```bash
npm run test
```

Run in watch mode (auto re-runs when files change):

```bash
npm run test -- --watch
```

Run a specific file:

```bash
npx vitest run src/components/Button.test.tsx
```

---

## ✅ Summary

- **Vitest** is the test runner.
- **jsdom** gives us a fake browser.
- **Testing Library** makes it easy to test React components like real users interact with them.
- **Setup file** keeps the test environment clean between runs.

With this setup, your tests are isolated, reliable, and simulate real-world usage. 🚀
