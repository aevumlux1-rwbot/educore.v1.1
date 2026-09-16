# 00 — MASTER HANDOFF

## Produto

**Colégio Deus Connosco — Digital School ERP / Portal**

O produto atual possui uma aplicação React navegável com identidade do Colégio Deus Connosco e sete contextos de acesso. O próximo objetivo é transformar esta experiência de demonstração numa arquitetura de ERP real, sem destruir o frontend existente.

## Estado de verdade

- O frontend existe e é funcional para demonstração.
- A autenticação atual é mock/local; não é autenticação de produção.
- Os dados principais são mocks; ainda não representam persistência real.
- As rotas por perfil e grande parte da UX interna já existem.
- Backend de produção: **NOT IMPLEMENTED**.
- Base de dados de produção: **NOT IMPLEMENTED**.
- Integrações reais: **NOT IMPLEMENTED**.

## Perfis atuais

Aluno, Encarregado, Professor, Pedagogia, Direcção, Secretaria e Finanças.

## Princípio de transformação

```text
FRONTEND EXISTENTE
+ CONTRATOS DE DOMÍNIO
+ API REAL
+ BASE DE DADOS
+ RBAC/PERMISSÕES
+ AUDITORIA
+ WORKFLOWS TRANSACIONAIS
= ERP ESCOLAR
```

Não criar aplicação paralela. Não recomeçar dashboards do zero. Migrar mock → real por domínio, preservando rotas e fluxos úteis.

## Prioridade

### P0 — Fundação
- processos e estados do ERP;
- autenticação real;
- RBAC/permissões;
- instituição/ano letivo/períodos;
- contratos API;
- audit trail;
- erros/loading/empty states;
- migração progressiva de mocks.

### P1 — Núcleo operacional
- alunos/encarregados;
- admissões/matrículas;
- turmas/disciplinas/professores;
- horários;
- presenças;
- avaliações/notas;
- obrigações/facturas/pagamentos/recibos;
- documentos;
- notificações.

### P2 — Gestão avançada
- aprovações;
- risco académico;
- relatórios/analytics;
- tesouraria/devedores/multas;
- chat/comunicação;
- knowledge/content;
- integrações externas.
