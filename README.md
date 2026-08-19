# rawmesh

Surface-web mirror of a personal Reticulum mesh node — a raspberry pi in
Beira Baixa, Portugal, reachable off the cloud.

**Live:** [noduscypher.github.io](https://noduscypher.github.io)

## What this is

Not a blog. Not a service. A node. This repo is the source for the
regular-web reflection of that node — same identity, different medium.
Anyone without a Reticulum client can still read it here.

Also mirrored at [rawmesh.neocities.org](https://rawmesh.neocities.org),
and reachable on the mesh itself via NomadNet at
`2f756995d6febcde6b850c1c005774c7`.

## Structure

Single-page React app, one component per route:

- `/` — home
- `/about`, `/contacts`, `/content-policy` — identity, reach, and terms
- `/library` — curated resources, offline mirrors
- `/network` — people and communities on and off the mesh
- `/start-here` — onboarding for people new to Reticulum
- `/rnspt` — hub for the Portuguese Reticulum community
- `/rock-paper-scissors`, `/minesweeper` — small, no-account games

## Stack

React 19, Vite, `react-router-dom` (hash routing, so it works on GitHub
Pages with no server config). Plain inline styles against a shared token
set in `src/styles.js` — no CSS framework in active use.

## Run locally

```
npm install
npm run dev
```

## Deploy

```
npm run deploy
```

Builds and publishes `dist/` to the `gh-pages` branch.

## License

Original content follows the terms on
[/content-policy](https://noduscypher.github.io/#/content-policy) —
Creative Commons BY-SA 4.0 unless stated otherwise. Mirrored material
keeps whatever license it arrived with.
