# Terrible Board Game 2.0

## Getting Started

This project is split into two main components:

- A frontend, powered by Vue
- A backend, powered by Express + Socket.io

Both of these use [Yarn](https://yarnpkg.com/getting-started/install) for dependency management.

## Development

For development purposes, the Vue application & the Express server can be started as two seperate instances.

Start the Express server:

```bash
cd server
yarn serve
```

In a seperate terminal, start the Vue application:

```bash
cd vue
yarn serve
```

The application should now be accessible from localhost:3000. Any changes to either the server or the Vue frontend should automatically reload.

## Production

Build the Vue application for production:

```bash
cd vue
yarn build
```

Build the Typescript server:

```bash
cd server
yarn build-server
```

The server/ directory can then be deployed as required.
