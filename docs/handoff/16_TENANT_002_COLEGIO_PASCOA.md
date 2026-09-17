# 16 — TENANT 002: COLÉGIO PÁSCOA

## Status

Tenant 002 de apresentação do EduCore.

- Nome: **Colégio Páscoa**
- Slug: `colegio-pascoa`
- Tenant id: `tenant-pascoa-002`
- Branch temporária de onboarding: `tenant/colegio-pascoa`
- Produto: EduCore
- Direcção visual: `modern`

## Princípio

O Colégio Páscoa não é um fork do Colégio Deus Connosco. É outro tenant da mesma plataforma, com identidade, narrativa, composição pública e configuração próprias.

## Direcção visual aprovada

- branco dominante;
- verde institucional como cor principal;
- vermelho como impacto;
- amarelo/dourado como micro-acento;
- curvas e arcos inspirados no símbolo circular do logótipo;
- fotografia real integrada na composição;
- linguagem mais viva, comunitária e juvenil do que o tenant Deus Connosco;
- vídeo como parte da secção de vida escolar;
- `Powered by EduCore` discreto.

## Landing V1

1. Header institucional + portal.
2. Super hero: `Educar para Transformar.` com fotografia integrada e geometria de marca.
3. Sobre a escola: composição fotográfica assimétrica, sem grelha SaaS genérica.
4. Experiência: `Aprender. Explorar. Crescer.` em sequência editorial/timeline, não cards repetitivos.
5. Vida escolar: bloco imersivo com vídeo e fotografia.
6. Portal: ponte visual para o ERP multi-perfil.
7. CTA institucional.
8. Footer com `Powered by EduCore`.

## Conteúdo e actualidade

Os assets fornecidos incluem campanhas de anos diferentes. Não transformar automaticamente texto de campanhas antigas em informação actual.

### Seguro para V1

- nome e logótipo;
- lema `Educar para Transformar` presente na identidade;
- fotografia real fornecida pelo cliente;
- linguagem geral sobre aprendizagem, comunidade e acompanhamento;
- ligação oficial de Instagram fornecida no projecto.

### Requer confirmação antes de ser tratado como facto actual

- campanha de matrículas;
- contactos telefónicos;
- morada;
- transporte;
- oferta extracurricular específica;
- introdução de línguas específicas por classe;
- qualquer preço, horário, vaga ou calendário.

## Assets locais esperados

A landing usa os seguintes paths públicos:

```text
frontend/public/tenants/colegio-pascoa/
  pascoa-logo.jpg
  pascoa-hero.jpg
  pascoa-community.jpg
  pascoa-campus.jpg
  pascoa-learning-preview.mp4
```

Estes assets são originados dos materiais fornecidos para a apresentação e devem posteriormente migrar para object storage/configuração de tenant quando o backend SaaS estiver pronto.

## Fases

### Fase 1 — Tenant foundation
- tenant registry;
- theme;
- modules/roles;
- branding paths.

### Fase 2 — Public landing
- implementar direcção visual aprovada;
- responsive;
- assets reais;
- vídeo lazy/preload metadata.

### Fase 3 — Login / portal continuity
- login tenant-aware;
- logo/cores Páscoa;
- continuar para o mesmo ERP core;
- manter roles e entitlements.

### Fase 4 — QA apresentação
- desktop e mobile;
- navegação;
- ausência de conteúdo antigo apresentado como actual;
- portal/login;
- performance básica.

### Fase 5 — Produção SaaS
- substituir assets/versionamento em Git por object storage;
- tenant resolution por domínio;
- Platform IAM;
- API + PostgreSQL;
- configuração via Super Admin persistida no servidor.
