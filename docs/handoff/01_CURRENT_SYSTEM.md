# 01 — CURRENT SYSTEM BASELINE

## Stack confirmada

React 18, TypeScript, Vite 5, Tailwind CSS 3, Radix/shadcn-style components, React Router, TanStack Query, Framer Motion, Vitest e Recharts.

## Estrutura

```text
frontend/src/
  app/guards/
  app/router/
  assets/
  components/
  contexts/
  data/
  hooks/
  pages/auth/
  pages/public/
  pages/role/
  shared/navigation/
  types/
```

## Segurança atual

Existem `AuthGuard`, `RoleGuard` e `PermissionGuard`, mas `AuthContext` cria utilizadores mock e persiste opcionalmente a sessão em `localStorage`. Isto é adequado para demo, não para produção.

## Superfícies atuais por perfil

### Aluno
Painel, disciplinas, notas, avaliações, assiduidade, horário, conteúdos, finanças, feed, chat e notificações.

### Encarregado
Painel, educandos, desempenho, avaliações, assiduidade, horário, finanças, pagamentos, documentos, chat e notificações.

### Professor
Painel, horário, turmas, presenças, avaliações, lançamento de notas, conteúdos, chat e notificações.

### Pedagogia
Painel, aprovações, calendário, analítica, turmas, professores, assiduidade, horário, risco, relatórios e notificações.

### Direcção
Painel, aprovações, finanças, académico, matrículas, relatórios, auditoria e notificações.

### Secretaria
Painel, admissões, matrículas, alunos, documentos, turmas, horário, regularidade e notificações.

### Finanças
Painel, pagamentos, validação, facturas, devedores, obrigações, contas, recibos, multas, tesouraria, relatórios e notificações.

## Fragilidades

- role pages ainda grandes e orientadas a mock data;
- auth não real;
- autorização essencialmente client-side;
- sem fonte transacional única;
- sem schema de produção aprovado;
- sem contrato API versionado;
- sem política formal de auditoria/retenção;
- estados de negócio ainda não formalizados.

## Não fazer

- não duplicar o frontend;
- não refatorar tudo antes de ligar a API;
- não ligar componentes diretamente à DB;
- não manter regras críticas só no browser;
- não converter mocks automaticamente em schema de produção.
