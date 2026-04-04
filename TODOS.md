# TODOS — Olympe Platform

## Dependency Graph — P0 + P1

```
  1. Restructuration repo ─────────────────┐
                                           │
  2. Data contracts (schema JSON) ─────────┤
                                           │
  3. Audit log (shared/) ──────────────────┤
                                           │
  4. Human-in-loop (shared/) ──────────────┤
                                           │
  5. Workflow template n8n ────────────────┤
                                           │
       ┌───────────────────────────────────┘
       │
       ├──► 6. Brio Sync ──► 7. Tests Brio Sync
       │
       ├──► 8. Plutus prompt ──► 9. Plutus workflow ──► 10. Plutus tests
       │
       ├──► 11. Apollon prompt ──► 12. Apollon workflow ──► 13. Apollon tests
       │
       └──► 14. Eros prompt ──► 15. Eros workflow (RPA) ──► 16. Eros tests
                                       │
  17. Session RPA Lenovo ──────────────┘ (bloque 15)
```

## Execution Plan

```
Lane A (infra):      1 → 2 → 3 → 4 → 5          DONE ✓
Lane B (Plutus):     8 → 9 → 10                  ~45min CC
Lane C (Apollon):    11 → 12 → 13                ~45min CC — À REFAIRE
Lane D (Eros):       14 → 15 → 16                ~1h30 CC    (bloqué par 17)
Lane E (Brio Sync):  6 → 7                        ~30min CC
Lane F (Lenovo):     17                            physique

Lancement : B + C + E en parallèle. D quand Lenovo prêt (17).
```

## IDs n8n (référence)

| Ressource | ID n8n |
|-----------|--------|
| Table `olympe_audit_log` | `suNpD6TWTxkJTbe7` |
| Table `olympe_brio_cache` | `ccnTkO8tQzxhhT30` |
| Workflow `Olympe - Audit Log` | `wiiN3qg8U47Gaycs` |
| Workflow `Olympe - Human Approval` | `GbUBotmqWTThGFjF` |
| Workflow `Olympe - Template Agent` | `AbrT4D75H3ahhWOP` |
| Workflow `Plutus - Finance Reporting` | `saXpTdbwHYNdnUsB` |
| Workflow `Raphael - Assistant Production` | `i589zgoFoM5CPyKZ` | ⚠️ OBSOLÈTE — remplacé par Apollon |
| Workflow `Olympe - Brio Sync` | `0QUMvJXKW8p47Xay` |

---

## Lane A — Infrastructure — DONE ✓

### [x] 1. Restructuration repo
### [x] 2. Data contracts (schema JSON inter-agents)
### [x] 3. Audit log → workflow n8n `wiiN3qg8U47Gaycs`
### [x] 4. Human-in-loop → workflow n8n `GbUBotmqWTThGFjF`
### [x] 5. Workflow template → workflow n8n `AbrT4D75H3ahhWOP`

---

## Lane B — Plutus (Finance & Reporting) — DONE ✓

### [x] 8. Plutus prompt système
**Scope:** Écrire le prompt système de Plutus. Rôle : analyser les données financières Winbooks (DBF/Excel), générer un dashboard, répondre aux questions comptables d'Anne et Arnaud. Ton : précis, chiffré, pas de blabla.
**Fichiers:** `agents/plutus/prompt-systeme.md`
**Done when:** Le prompt couvre : import DBF, calcul KPI (CA, charges, marge, trésorerie), export Excel, drill-down par période.
**Effort:** S — ~15min CC

### [x] 9. Plutus workflow n8n → `saXpTdbwHYNdnUsB`
**Scope:** Créer le workflow n8n `Plutus - Finance & Reporting`. Cloner le template `AbrT4D75H3ahhWOP`. Trigger cron quotidien 7h + webhook on-demand. Import fichiers DBF Winbooks depuis le Lenovo. Parse → Claude Haiku pour analyse → dashboard JSON → audit log `wiiN3qg8U47Gaycs`.
**Fichiers:** `agents/plutus/workflow-plutus.json`, `agents/plutus/config.json`
**Done when:** Le workflow s'exécute sur des données DBF de test. Dashboard JSON correct. Audit log écrit.
**Effort:** M — ~20min CC

### [x] 10. Plutus tests
**Scope:** Scripts de test webhook. Payload : fichier DBF mock. Vérification : réponse JSON valide, KPI calculés, audit log écrit.
**Fichiers:** `agents/plutus/tests/test-plutus.sh`, `agents/plutus/tests/mock-data/`, `agents/plutus/tests/expected-output.json`
**Done when:** `bash agents/plutus/tests/test-plutus.sh` retourne 0.
**Effort:** S — ~15min CC

---

## Lane C — Apollon (Chatbot DAP) — À REFAIRE

### [x] 11. Apollon prompt système
**Scope:** Prompt système chatbot double face : public (site web, clients DAP) + interne (Teams, employés). Bilingue FR/NL. Redirections vers agents spécialisés. Base de connaissances.
**Fichiers:** `agents/apollon/prompt-systeme.md`
**Done when:** Prompt couvre mode public + mode interne + redirections + règles sécurité données.
**Effort:** S — ~15min CC — ✓ FAIT

### [ ] 12. Apollon workflow n8n
**Scope:** Créer le workflow `Apollon - Chatbot DAP`. Deux triggers : webhook POST `/webhook/apollon-public` (site web) + webhook POST `/webhook/apollon-interne` (Teams). AI Agent Claude Haiku 4.5. Tool : lecture `olympe_brio_cache` (recherche client pour mode interne). Audit log `wiiN3qg8U47Gaycs`. Pas de Microsoft Graph (pas d'email/calendrier, c'est un chatbot Q&A).
**Fichiers:** `agents/apollon/workflow-apollon.json`
**Done when:** Question public "quels sont vos horaires ?" → réponse. Question interne "numéro sinistres AG ?" → réponse. Audit log écrit.
**Effort:** M — ~20min CC

### [ ] 13. Apollon tests
**Scope:** Tests webhook : question publique, question interne, question hors scope (→ redirection), question en NL.
**Fichiers:** `agents/apollon/tests/test-apollon.sh`, `agents/apollon/tests/mock-question-public.json`, `agents/apollon/tests/mock-question-interne.json`
**Done when:** 4 cas de test passent.
**Effort:** S — ~10min CC

---

## Lane D — Eros (Souscription) — bloqué par tâche 17

### [x] 14. Eros prompt + mappings portails
**Scope:** Prompt système Eros + mappings CSS portails AG/AXA/Ethias. Flux : formulaire → extraction Vision → tarification multi-compagnies → comparaison → scoring → notification gestionnaire. Inspiration mapping AG : `Commercial-DAP/tarification-auto/mappings/ag-insurance.json`.
**Fichiers:**
- `agents/eros/prompt-systeme.md`
- `agents/eros/prompt-extraction-formulaire.md`
- `agents/eros/mappings/ag-insurance.json`
- `agents/eros/mappings/axa.json` (stub)
- `agents/eros/mappings/ethias.json` (stub)
**Done when:** Prompt couvre le flux complet. Mapping AG complet. AXA/Ethias stubs documentés.
**Effort:** M — ~30min CC

### [ ] 15. Eros workflow n8n (RPA)
**Scope:** Workflow `Eros - Souscription`. Cloner template `AbrT4D75H3ahhWOP`. Trigger webhook formulaire. Extraction Claude Vision → tarification séquentielle AG/AXA/Ethias via Playwright RPA Lenovo → comparaison + scoring → human-in-loop `GbUBotmqWTThGFjF` → création fiche Brio (RPA). Mode dégradé : RPA down → export CSV.
**Fichiers:**
- `agents/eros/workflow-eros.json`
- `agents/eros/config.json`
- `agents/eros/rpa/tarification-ag.js`
- `agents/eros/rpa/tarification-axa.js`
- `agents/eros/rpa/tarification-ethias.js`
- `agents/eros/rpa/create-fiche-brio.js`
**Done when:** Formulaire test → extraction → tarification AG → notification Teams → validation → fiche Brio. Audit log complet.
**Effort:** L — ~1h CC
**Blocked by:** 17 (session RPA Lenovo)

### [ ] 16. Eros tests
**Scope:** Tests webhook : formulaire auto + habitation + invalide + RPA timeout + mode dégradé CSV.
**Fichiers:** `agents/eros/tests/test-eros.sh`, `agents/eros/tests/mock-formulaire-auto.json`, `agents/eros/tests/mock-formulaire-habitation.json`
**Done when:** 5 cas de test passent dont mode dégradé.
**Effort:** M — ~20min CC

---

## Lane E — Brio Sync — DONE ✓

### [x] 6. Brio Sync → `0QUMvJXKW8p47Xay`
**Scope:** Workflow `Olympe - Brio Sync`. Trigger : Email Trigger (reçoit exports Excel auto de Brio "Sélection et Rapport"). Parse Excel (xlsx) → stocke dans table `olympe_brio_cache` (`ccnTkO8tQzxhhT30`). Les agents lisent cette table au lieu du RPA.
**Fichiers:** `shared/brio-sync/workflow-brio-sync.json`
**Done when:** Email avec Excel Brio attaché → parsé → stocké dans `olympe_brio_cache`. Données lisibles par les autres workflows.
**Effort:** M — ~20min CC

### [x] 7. Brio Sync tests
**Scope:** Test avec fichier Excel mock format Brio. Vérification parsing + stockage table.
**Fichiers:** `shared/brio-sync/tests/test-brio-sync.sh`, `shared/brio-sync/tests/mock-export-brio.xlsx`
**Done when:** `bash shared/brio-sync/tests/test-brio-sync.sh` retourne 0.
**Effort:** S — ~10min CC

---

## Lane F — Physique (Lenovo)

### [ ] 17. Session dédiée 'olympe-rpa' sur Lenovo
**Scope:** Compte Windows `olympe-rpa` sur Lenovo DAP. Installer Node.js + Playwright. Task Scheduler pour serveur RPA au boot. Tester accès Portima Connect.
**Done when:** Compte existe. Playwright ouvre un navigateur. Portima Connect accessible. Serveur RPA démarre au boot.
**Effort:** Physique — ~1h humain
**Blocked by:** Accès admin Lenovo.

---

## Déféré

### [ ] Dashboard multi-courtier BeStronger
**Blocked by:** 2+ courtiers utilisant Olympe.

### [ ] Migration n8n → orchestration SaaS
**Blocked by:** Premier client externe confirmé.

### [ ] Design RGPD détaillé
**Blocked by:** Premier client externe confirmé.

### [ ] Agents P2 (Janus, Hermès) — breakdown quand P1 livré
### [ ] Agents P3 (Midas, Aphrodite, Iris) — breakdown quand P2 livré
### [ ] Agents P4 (Thémis, Hestia) — breakdown quand P3 livré
### [ ] Portail web Olympe (Next.js + Azure AD) — breakdown Q4 2026
### [ ] Onboarding 150 DAPiens — breakdown avec le portail
