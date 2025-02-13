# Instructions

- Make sure you have git installed: https://git-scm.com/
- Download repository from: [https://github.com/brunomiguelbarrospinto/frontend-engineer-challange](https://github.com/brunomiguelbarrospinto/frontend-engineer-challange) or clone with **`git clone https://github.com/brunomiguelbarrospinto/frontend-engineer-challange.git`**
- Make sure you have the updated node version, such as v20, v22, the project was developed under version v22, you can manage node versions with these 2 options:
  - https://github.com/nvm-sh/nvm
  - https://github.com/tj/n
- Go to the repository folder and run **`npm install`** to install the dependencies
- Before start project you have to up the server, To run the server, you need [Golang](https://go.dev/) runtime installed in your workspace. Then run the following: **`npm run server`** or can do it manually **`cd ./server && go run server.go`** (If server is mounted in a port different than **`:8080`** you must change it in **`.env`** file)
- Then execute npm **`npm run dev`** to initialize the Frontend App (Termina should show url server)

# Project Scripts

- **`dev`** → `vite`
  Starts the development server using Vite, enabling hot module replacement (HMR) for a fast development experience.

- **`build`** → `tsc && vite build`

  - Runs the TypeScript compiler (`tsc`) to check and compile TypeScript files.
  - Builds the project using Vite, optimizing assets for production.

- **`preview`** → `vite preview`
  Serves the built project locally, allowing you to preview the production build before deployment.

- **`test`** → `vitest`
  Runs the test suite using Vitest, a fast test runner optimized for Vite.

- **`coverage`** → `vitest run --coverage` Run command to see coverage code tests (The coverage folder normally is not included in git changes, but in this case i added it.) You can run command whatever you want. (100% coverage in all files.)

## Libreries used

These are development-only dependencies, typically used for testing, compiling, and tooling.

- [@vitest/coverage-v8](https://www.npmjs.com/package/@vitest/coverage-v8)
  Provides test coverage reporting using V8.
  _Alternative:_ `c8`, `nyc`

- [jsdom](https://www.npmjs.com/package/jsdom)
  A JavaScript implementation of the DOM for testing purposes.
  _Alternative:_ `happy-dom`, `puppeteer`

- [msw](https://www.npmjs.com/package/msw)
  Mock Service Worker for API mocking in tests.
  _Alternative:_ `nock`, `miragejs`

- [typescript](https://www.npmjs.com/package/typescript)
  TypeScript compiler for type safety and development.

- [vite](https://www.npmjs.com/package/vite)
  Fast and modern frontend build tool.
  _Alternative:_ `webpack`, `parcel`, `esbuild`

- [vitest](https://www.npmjs.com/package/vitest)
  A fast testing framework optimized for Vite.
  _Alternative:_ `jest`, `mocha`

- [@anatine/zod-mock](https://www.npmjs.com/package/@anatine/zod-mock)
  Generates mock data based on Zod schemas.
  \*Alternative:\* `faker`, `mock-data-generator`

- [compare-versions](https://www.npmjs.com/package/compare-versions)
  Utility to compare version strings forDocuments versions.

- [dayjs](https://www.npmjs.com/package/dayjs)
  Lightweight date library similar to Moment.js. TO show relative dates for Documents.

- [mock-socket](https://www.npmjs.com/package/mock-socket)
  A WebSocket mock library for testing.

- [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  A utility-first CSS framework.
  _Alternative:_ `Bootstrap`, `Bulma`

- [uuid](https://www.npmjs.com/package/uuid)
  Generates unique identifiers (UUIDs). When create a new Document.

- [zod](https://www.npmjs.com/package/zod)
  A TypeScript-first schema validation library.

## Missing implementations that I would like to have implemented (No time)

- Better css (with sass) definitions, implementing custom properties, variables, media queries, etc. Used a fast tailwind implementations.

- A client "fetch" reusable service, axios or something else where can manage constants like API HOST URL, or headers, or method requests.

- A better implementation about ui, components, and module.

- Tests E2D (Cypress or Playwright)

- Better implementation compiling files, spliting chinks, minify, uglify, etc.

- Some implementations maybe

- Handling errors like check if server is mounted, catch responses, etc.

- Better reusabilty for mock test implementation (msw).
