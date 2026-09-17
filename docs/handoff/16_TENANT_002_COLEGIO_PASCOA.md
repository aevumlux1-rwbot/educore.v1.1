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

## Media da apresentação

Para garantir que um simples `git pull` produz a experiência de apresentação sem uma etapa manual de copiar binários, esta branch contém uma versão comprimida dos media fornecidos como módulos TypeScript com data URIs:

```text
frontend/src/tenants/colegio-pascoa/media/
  pascoa_logo.ts
  pascoa_hero.ts
  pascoa_community.ts
  pascoa_campus.ts
  pascoa_video.ts
```

A landing e o login importam estes módulos directamente. O vídeo inline é um preview comprimido para a apresentação, não o master original.

**Isto é packaging de apresentação, não a arquitectura de media de produção.** Na versão SaaS, logótipos, fotografia, vídeo e outros assets devem migrar para object storage tenant-aware, com metadados/configuração persistidos no servidor e entrega via CDN/URLs versionadas.

Os ficheiros master fornecidos pelo cliente devem ser preservados fora desta optimização de apresentação.

## Fases

### Fase 1 — Tenant foundation
- tenant registry;
- theme;
- modules/roles;
- branding tenant-aware.

### Fase 2 — Public landing
- direcção visual aprovada implementada;
- hero integrado;
- composição editorial;
- media reais;
- preview de vídeo;
- responsive via breakpoints existentes.

### Fase 3 — Login / portal continuity
- login dedicado Páscoa;
- logo/cores Páscoa;
- routing tenant-aware;
- continuar para o mesmo ERP core;
- manter roles e entitlements.

### Fase 4 — QA apresentação
- CI: install/build/test/tenant guard;
- validação local/browser em desktop e mobile;
- navegação;
- ausência de conteúdo antigo apresentado como actual;
- portal/login;
- performance básica.

### Fase 5 — Produção SaaS
- substituir media inline/versionamento em Git por object storage;
- tenant resolution por domínio;
- Platform IAM;
- API + PostgreSQL;
- configuração via Super Admin persistida no servidor.
