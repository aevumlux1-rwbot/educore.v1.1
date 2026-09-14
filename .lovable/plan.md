# Controlled Colégio Deus Connosco rebrand

## Scope
Migrate only the visible institutional identity of the existing EDUCORE application. Preserve all routes, modules, layouts, data behavior, navigation, and component architecture.

## Implementation
1. **Prepare the official brand asset**
   - Extract the exact Colégio Deus Connosco logo/lockup from the highest-priority 2027 supplied reference without redrawing or AI alteration.
   - Store it through the project asset flow and derive a padded 64px favicon from the same mark.
   - Add a small reusable `SchoolBrand` component with expanded and compact presentations for existing constrained placements.

2. **Update centralized identity tokens**
   - Replace sage/olive brand tokens in `src/index.css` with the supplied navy, orange, warm canvas, white, and warm-border system.
   - Preserve green success, amber warning, red destructive, and blue informational meanings.
   - Adapt dark mode to deep navy surfaces with restrained orange accents.
   - Configure the supplied digital typography direction: Manrope for product UI and Libre Baskerville only for the existing public display headline.

3. **Migrate visible brand surfaces with minimum diffs**
   - Replace the generic institutional icons and EDUCORE wordmarks in the sidebar, landing header, login, redirect screen, dashboard subtitle, settings account text, and footer.
   - Keep academic `GraduationCap` icons where they describe academic actions rather than serving as the institutional logo.
   - Preserve EDUOS/COREOS names where they remain module architecture, while removing EDUCORE as the visible institution name.
   - Neutralize only the minimum landing copy needed to avoid presenting the school as a software product.

4. **Correct document identity**
   - Replace generic Lovable title, description, author, Open Graph, and Twitter metadata.
   - Remove generic Lovable social imagery and wire the favicon to the official extracted mark.

5. **Validate without unrelated refactors**
   - Audit again for visible EDUCORE/Lovable branding and logo misuse.
   - Verify landing, login, app shell, expanded/collapsed sidebar, and mobile navigation at desktop and mobile sizes.
   - Run the existing build, lint, and test commands; repair only rebrand regressions.

## Expected touched files
- `src/index.css`
- `tailwind.config.ts`
- `index.html`
- `src/components/brand/SchoolBrand.tsx` (new)
- `src/components/layout/AppSidebar.tsx`
- `src/pages/public/LandingPage.tsx`
- `src/pages/auth/LoginPage.tsx`
- `src/pages/Index.tsx`
- `src/pages/app/DashboardPage.tsx`
- `src/pages/app/SettingsPage.tsx`
- brand asset pointer under `src/assets/brand/`
- favicon under `public/`

No routes, modules, business logic, mock records, or unrelated components will be redesigned.
