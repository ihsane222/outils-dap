# RAG DAP — Analyse & Inspiration pour Courtis

---

## 1 — Ce que c'était

**RAG DAP** était une application web développée par **Isidore Mikorey-Nilsson** (Prismia) pour DAP.
Site : `rag-dap.com` (hors ligne depuis fin 2025)
Dernier snapshot Wayback Machine : **13 juillet 2025**

### Concept

Un **assistant IA spécialisé en assurance** qui permet de :
- Interroger les conditions générales d'assurance en langage naturel
- Obtenir des réponses sourcées avec extraits de documents
- Générer des emails de réponse client à partir du contexte trouvé

Slogan : *"75 ans d'expertise à votre service !"*

---

## 2 — Architecture technique

### Stack

| Couche | Techno |
|---|---|
| Frontend | **React** (Vite) · Tailwind CSS · Lucide icons · Framer Motion |
| Backend | **n8n** (hébergé sur `n8n.prismia.be`) — tout le backend est exposé via webhooks |
| IA | RAG (Retrieval Augmented Generation) — probablement OpenAI embeddings + vector DB |
| Hébergement | Prismia (infra propre) |

### Les 5 webhooks n8n qui constituent le backend

```
1. GET  /webhook/rag-dap-get-distinct-insurances
   → Retourne la liste des assurances disponibles dans la base

2. GET  /webhook/rag-dap-find-sources?query=...&insuranceName=...
   → Recherche vectorielle dans les documents
   → Retourne les extraits pertinents (chunks) avec métadonnées

3. GET  /webhook/dap-rag-summary?query=...&insuranceName=...
   → Génère une réponse IA synthétique basée sur les sources trouvées
   → Retourne un texte structuré (markdown avec support LaTeX/KaTeX)

4. POST /webhook/generateEmail
   → Body : { clientEmail, aiSummary }
   → Génère un email professionnel à partir de la réponse IA

5. POST /webhook/updateEmail
   → Body : { clientEmail, aiSummary, email, updatePrompt }
   → Permet de modifier l'email généré avec des instructions en langage naturel
```

**Point clé** : Le frontend est 100% statique (SPA React). Toute l'intelligence est dans n8n.

---

## 3 — Fonctionnalités détaillées

### A — Recherche documentaire (RAG)

**Flow utilisateur :**
1. L'utilisateur sélectionne une assurance dans un dropdown (ou "Toutes")
2. Il pose une question en langage naturel
3. Le système retourne :
   - Une **réponse synthétique** générée par l'IA
   - Les **extraits source** avec titre, contenu, date de mise à jour, et lien vers le document original

**Questions préconfigurées (suggestions) :**
- Comment déclarer un sinistre auto ?
- Procédure de résiliation d'un contrat auto
- Les documents nécessaires pour assurer un véhicule
- Différence entre tiers et tous risques
- Que faire en cas de vol de véhicule ?
- Comment calculer la valeur à neuf d'un véhicule ?
- Comment gérer un changement de véhicule ?
- Procédure de remboursement des franchises

### B — Carte source (résultat de recherche)

Chaque extrait affiché contient :
- **Titre** du document (nom du fichier sans extension)
- **Nom de l'assurance** (affiché en face du titre)
- **Contenu** de l'extrait (markdown rendu, avec support KaTeX)
- **Date de mise à jour** (format `dd-MM-yyyy à HH:mm`)
- **Lien** vers le document source original (cliquable)

### C — Générateur d'emails

**Flow :**
1. Le courtier fait une recherche RAG → obtient une réponse IA
2. Il entre l'**email du client** dans un champ dédié
3. Clique "Générer une réponse email"
4. L'IA génère un **email professionnel** basé sur la réponse

**Fonctionnalité de mise à jour :**
- Le courtier peut demander des modifications en langage naturel
- Champ : *"Décrivez comment améliorer l'email..."*
- Le système regénère l'email avec les instructions

### D — UX / Interface

- **Design** : Carte centrée (max 512px), fond sombre, style moderne
- **Loading states** : "Préparation de votre expérience personnalisée..." / "Besoin d'une pause café ? On est là pour vous !"
- **Avertissement** : "Veuillez toujours vérifier les informations et la date de mise à jour des documents."
- **Dark/Light mode** supporté (via next-themes)
- **Toast notifications** pour succès/erreurs (sonner)
- **Animations** : Framer Motion (fade-in sur les cartes)

---

## 4 — Ce qui manquait / Limites probables

| Limite | Détail |
|---|---|
| **Pas de mémoire conversationnelle** | Chaque question est indépendante — pas de suivi de contexte |
| **Pas de CRM intégré** | L'email est généré mais pas tracé dans un système |
| **Pas d'automatisation proactive** | Le courtier doit aller chercher l'info — pas de push |
| **Pas de conformité automatique** | Pas de scan des dossiers, pas de détection d'anomalies |
| **Pas d'upsell** | Pas d'analyse du portefeuille client |
| **Source unique** | Uniquement les conditions générales — pas les données client |
| **Pas de suivi** | Pas d'historique des recherches ou des emails envoyés |

---

## 5 — Ce qu'on peut reprendre pour Courtis

### A — Reprendre tel quel

| Feature RAG DAP | Intégration Courtis |
|---|---|
| **Recherche RAG sur les docs assurance** | Module "Assistant Documentation" dans Courtis V3 — les courtiers DAP posent des questions sur les CG et obtiennent des réponses sourcées |
| **Filtre par assurance** | Dropdown dans l'interface : AG, Allianz, Axa, Ethias, etc. |
| **Questions suggérées** | Adapter au contexte DAP : sinistres, résiliations, souscriptions |
| **Backend 100% n8n** | On a déjà l'infra — ajouter les webhooks RAG à notre instance |

### B — Améliorer par rapport à RAG DAP

| Feature RAG DAP | Amélioration Courtis |
|---|---|
| Email généré manuellement | **Email automatique** déclenché par les workflows existants (conformité, upsell) |
| Pas de mémoire | **Historique des conversations** par client (stocké dans Airtable/Sheets) |
| Pas de CRM | **Lien direct** avec la base clients Courtis — le contexte du client est automatiquement injecté dans le prompt |
| Questions indépendantes | **Mode conversation** avec suivi de contexte (chat multi-tours) |
| Avertissement passif | **Devoir de conseil tracé** — chaque réponse IA = trace dans le dossier client |

### C — Ajouter ce que RAG DAP n'avait pas

| Nouvelle feature | Description |
|---|---|
| **Scan conformité automatique** | Courtis V1 — déjà implémenté |
| **Enrichissement contacts** | Courtis V2A — déjà implémenté |
| **Upsell portefeuille** | Courtis V2B — déjà implémenté |
| **Détection proactive** | Alertes push quand un document change ou qu'une CG est mise à jour |
| **Formation intégrée** | Le RAG peut aussi servir de base pour le PCP (questions/réponses sur la réglementation) |

---

## 6 — Plan d'implémentation Courtis V3 : Module RAG

### Phase 1 — Ingestion des documents (1-2 jours)

```
1. Collecter les CG de chaque assureur (PDF/Word)
2. Chunker les documents (500-1000 tokens par chunk)
3. Générer les embeddings (OpenAI text-embedding-3-small)
4. Stocker dans une vector DB (Supabase pgvector ou Pinecone)
5. Indexer les métadonnées (assureur, type de doc, date MAJ)
```

### Phase 2 — Webhooks n8n (1 jour)

```
Reproduire les 5 endpoints de RAG DAP :
1. Liste des assurances  → Google Sheets ou Airtable
2. Recherche sources     → Query vector DB + retour chunks
3. Résumé IA             → Claude/GPT sur les chunks trouvés
4. Génération email      → Prompt spécialisé courtier belge
5. Mise à jour email     → Re-prompt avec instructions
```

### Phase 3 — Interface (2-3 jours)

```
Option A : Frontend React standalone (comme RAG DAP)
Option B : Intégré dans un chat n8n (n8n Chat widget)
Option C : Interface Airtable + extension custom

Recommandation : Option B pour le MVP, Option A pour la V3 finale
```

### Phase 4 — Intégration Courtis (1 jour)

```
- Connecter le RAG aux workflows existants
- Quand Courtis V1 détecte une anomalie → le RAG prépare l'email de correction
- Quand Courtis V2B identifie un upsell → le RAG génère la proposition basée sur les CG
- Chaque interaction RAG → log dans la base client (devoir de conseil)
```

---

## 7 — Résumé comparatif

```
                    RAG DAP          Courtis (actuel)     Courtis V3 (cible)
                    ───────          ────────────────     ──────────────────
Recherche docs      ✅ RAG           ❌                   ✅ RAG amélioré
Filtre assureur     ✅               ❌                   ✅
Email IA            ✅ manuel        ✅ automatique        ✅ auto + manuel
Conformité          ❌               ✅ V1                 ✅ V1 + RAG
Enrichissement      ❌               ✅ V2A                ✅ V2A
Upsell              ❌               ✅ V2B                ✅ V2B + RAG
Mémoire/historique  ❌               ❌                   ✅
Lien CRM            ❌               ⚠️ Airtable          ✅ Airtable
Proactivité         ❌               ✅ Schedules          ✅ Schedules + alertes
Devoir de conseil   ❌               ❌                   ✅ Tracé automatique
Backend             n8n (Prismia)    n8n (Hostinger)      n8n (Hostinger)
```

---

## 8 — Infos techniques récupérées

**Domaine backend** : `n8n.prismia.be` (instance n8n dédiée chez Prismia)
**Auteur** : Isidore Mikorey-Nilsson
**Libs frontend** : React 18, Tailwind, Framer Motion, Lucide React v0.462, date-fns (locale FR), marked (markdown), KaTeX (formules), Sonner (toasts)
**Archivé** : 13 juillet 2025 sur Wayback Machine

---

*Document généré le 25 février 2026 — Analyse du code source archivé de rag-dap.com*
