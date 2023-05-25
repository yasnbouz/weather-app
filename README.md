# Weather App

The Weather App is a web application that displays weather information for a user's selected location. The application utilizes Vue.js, Weather API, routes for searching and viewing weather by location, and Vuex for keeping track of saved cities. The user can search for a location by entering the city and state, and the application will display the current weather information for that location. The user can also
save a location to their list of saved cities, and the list will persist even after the user closes the application.

See [Production URL](https://weather-app-nu-jet.vercel.app//).

## Features

- ⚡️ Vue 3
- ⛑ TypeScript
- 👀 Vuex next time I'll use 🍍 pinia
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- 👷 PR Workflow — Run Build & E2E & Deploy on Pull Requests

## Requirement

- Node: >=16

- Pnpm: 8.1.1

## Directory Structure

- .github — GitHub configuration including the CI workflow.
- .husky — Husky configuration and hooks.
- public — Static assets such as robots.txt, images, and favicon.
- src — Application source code, including pages, components, styles.

## Project Setup

```sh
pnpm install
```

### Starts the App in Development Environment

```sh
pnpm dev
```

### Starts the App in Prodution Environment

```sh
pnpm build && pnpm preview
```

## Brief Report

Well, I've enjoyed building this app using Vue.js and Typescript, I really like how Reactivity works on Vue.js which makes handling state easy and clean by Isolating state outside of components.
The hard thing I struggled with was when I started using "vuex" which used the wrong package.json export field, which break my building app.
So I overcame this bug by patching the "vuex" package.

- Note: The Patched vuex will be installed immediately after `pnpm i`

```
diff --git a/package.json b/package.json
index 3aae30a8815a65e70a6718ebfe8e8a6245ce35b4..fa113413f00a7243346856522caa2499de4b5d55 100644
--- a/package.json
+++ b/package.json
@@ -5,6 +5,7 @@
   "main": "dist/vuex.cjs.js",
   "exports": {
     ".": {
+      "types": "./types/index.d.ts",
       "module": "./dist/vuex.esm-bundler.js",
       "require": "./dist/vuex.cjs.js",
       "import": "./dist/vuex.mjs"
@@ -15,6 +16,7 @@
   "browser": "dist/vuex.esm-browser.js",
   "unpkg": "dist/vuex.global.js",
   "jsdelivr": "dist/vuex.global.js",
+  "types": "./types/index.d.ts",
   "typings": "types/index.d.ts",
   "sideEffects": false,
   "files": [
```
