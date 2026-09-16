# CHAT BRIEF — INTERNAL FRONTEND

Missão: elevar o portal autenticado e prepará-lo para API real sem destruir rotas e fluxos úteis.

Fonte principal:
- `frontend/src/app/router/appRouter.tsx`
- `frontend/src/shared/navigation/roleNavigation.ts`
- `frontend/src/pages/role/*`

Prioridades:
1. shell/sidebar/topbar/mobile;
2. design system operacional;
3. loading/error/empty;
4. forms/tables/detail pages;
5. separar mocks;
6. API/service layer;
7. migrar domínio a domínio;
8. accessibility/responsive.

Primeira entrega: audit do portal + mapa `screen → data → action → API contract → permission` para Student Registry, Enrollment e Academic Core.
