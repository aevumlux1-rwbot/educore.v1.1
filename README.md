# Colégio Deus Connosco — Presentation Demo

This branch is organized for local presentation use.

## Structure

- `frontend/` — complete React/Vite presentation application

## Run locally

Requirements: Node.js 22+ and npm.

```bash
git clone https://github.com/rightware-corporations/eudcore.git
cd eudcore
git checkout presentation/colegio-deus-connosco
cd frontend
npm install
npm run dev
```

Vite will print the local address, normally `http://localhost:8080/`.

## Validate before presenting

From `frontend/`:

```bash
npm run build
npm run test
```

`npm install` will generate a fresh `package-lock.json` locally for this cleaned presentation branch.

## Demo profiles

The login screen includes seven presentation profiles:

- Aluno
- Encarregado
- Professor
- Pedagogia
- Direcção
- Secretaria
- Finanças

Authentication, payments, approvals, messages and other data-changing actions are simulated locally for demonstration. No production backend is connected.

Canonical institution name in the interface: **Colégio Deus Connosco**.
