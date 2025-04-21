# KitchenMatchMaker

## Overview

KitchenMatchMaker is a React-based web application designed to help users manage and explore recipes. It leverages modern libraries like `wouter` for routing and `@tanstack/react-query` for efficient data fetching and caching. The application is built with a modular architecture, making it easy to extend and maintain.

---

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Setup Guide](#setup-guide)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Start the Development Server](#start-the-development-server)
   - [Build for Production](#build-for-production)
   - [Run Tests](#run-tests)
4. [Folder Structure](#folder-structure)
5. [Key Commands](#key-commands)
6. [Working with the Project](#working-with-the-project)
7. [Troubleshooting](#troubleshooting)

---

## Features

- Lightweight routing using `wouter`.
- Global state management for recipes with `RecipeProvider`.
- Recipe detail modal for enhanced user interaction.
- Notifications using a `Toaster` component.
- Efficient data fetching and caching with `@tanstack/react-query`.

---

## Requirements

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** (for package management)

---

## Setup Guide

### Clone the Repository

```bash
git clone <repository-url>
cd KitchenMatchMaker/KitchenMatchMaker/client
```

### Install Dependencies

Install the required packages using `npm` or `yarn`:

```bash
npm install
# or
yarn install
```

### Start the Development Server

Run the following command to start the development server:

```bash
npm start
# or
yarn start
```

### Build for Production

To create a production build, use:

```bash
npm run build
# or
yarn build
```

### Run Tests

If the project includes tests, you can run them using:

```bash
npm test
# or
yarn test
```

---

## Folder Structure

- **`src/components`**: Reusable UI components like `Toaster` and `RecipeDetailModal`.
- **`src/context`**: Context providers like `RecipeProvider` for managing global state.
- **`src/pages`**: Page components like `Home` and `NotFound`.
- **`src/lib`**: Utility files like `queryClient` for managing API queries.

---

## Key Commands

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm start`     | Start the development server.     |
| `npm run build` | Build the project for production. |
| `npm test`      | Run tests (if configured).        |
| `npm install`   | Install dependencies.             |

---

## Working with the Project

- **Routing**: Add new routes in the `Router` component inside `App.tsx`.
- **State Management**: Use the `RecipeProvider` context to manage recipe-related state.
- **API Integration**: Use `@tanstack/react-query` for API calls and caching.

---

## Troubleshooting

- **Missing Dependencies**: Run `npm install` to ensure all dependencies are installed.
- **Environment Variables**: Ensure the `.env` file is correctly configured.
- **Port Conflicts**: If the default port is in use, specify a new port when starting the server:
  ```bash
  PORT=3001 npm start
  ```
