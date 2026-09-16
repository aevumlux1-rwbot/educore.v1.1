# 06 — QA, SECURITY & RELEASE

## Gates mínimos por PR
- build;
- unit tests;
- lint do alterado;
- testes do domínio;
- permission tests;
- migration review quando DB muda;
- sem secrets no repo;
- visual QA quando UI muda.

## Segurança P0
- auth real;
- autorização server-side;
- cookies/tokens protegidos;
- rate limit em login/endpoints sensíveis;
- password hashing adequado;
- recuperação segura;
- logs sem tokens/passwords;
- validação server-side;
- segregação por instituição;
- audit trail para finanças, notas, matrículas e permissões.

## Dados escolares
Aplicar minimização, least privilege, controlo de acesso e política de retenção. Requisitos legais específicos devem ser validados antes de produção.

## Observabilidade
Structured logs, request IDs, error tracking, audit events, health checks, backups/restore drills e métricas de workflows críticos.

## Release
`local → CI → staging → acceptance → production`.
