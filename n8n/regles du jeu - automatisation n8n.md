# Règles du Jeu - Automatisation n8n

## Présentation du projet

Ce projet consiste à créer, corriger et améliorer des automatisations sur n8n en exploitant pleinement les capacités avancées de l'IA et des outils spécialisés disponibles.

### Objectifs principaux
- Créer des workflows n8n sur mesure et performants
- Corriger les workflows existants présentant des erreurs ou dysfonctionnements
- Améliorer et optimiser les automatisations en place
- Assurer une qualité maximale des workflows produits

---

## INSTALLATION — STATUT VÉRIFIÉ

| Composant | Statut | Emplacement |
|-----------|--------|-------------|
| n8n MCP Server | ✅ ACTIF | `.mcp.json` — démarrage automatique via `npx` |
| n8n API connectée | ✅ CONNECTÉ | `https://n8n.srv1387885.hstgr.cloud` |
| n8n-skills (repo cloné) | ✅ INSTALLÉ | `n8n-skills/` (ce projet) |
| Skills Claude Code (7) | ✅ ACTIFS | `~/.claude/skills/` |

### Configuration MCP active — [.mcp.json](.mcp.json)

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

### Activation de l'API n8n (optionnel — pour gestion directe des workflows)

Ajouter dans `.mcp.json` :
```json
{
  "mcpServers": {
    "n8n-mcp": {
      "env": {
        "N8N_API_URL": "https://votre-instance.n8n.io",
        "N8N_API_KEY": "votre_api_key_ici",
        "WEBHOOK_SECURITY_MODE": "moderate"
      }
    }
  }
}
```

> Pour n8n local sur Docker : `N8N_API_URL=http://host.docker.internal:5678`

---

## Statistiques n8n MCP Server

- **1 084 nodes n8n** disponibles (537 core + 547 community vérifiés)
- **99% de couverture** des propriétés des nodes avec schémas détaillés
- **87% de documentation** provenant des sources officielles n8n
- **2 646 configurations réelles** pré-extraites
- **2 709 templates de workflows** avec métadonnées complètes
- **265 variantes d'outils** documentées pour l'IA

---

## OUTILS MCP — Référence complète

### Disponibilité des outils

**Toujours disponibles** (sans clé API) :
- `search_nodes`, `get_node`
- `validate_node`, `validate_workflow`
- `search_templates`, `get_template`
- `tools_documentation`, `ai_agents_guide`, `n8n_health_check`

**Requièrent l'API n8n** (`N8N_API_URL` + `N8N_API_KEY`) :
- `n8n_create_workflow`, `n8n_update_partial_workflow`
- `n8n_list_workflows`, `n8n_get_workflow`
- `n8n_validate_workflow` (par ID), `n8n_autofix_workflow`
- `n8n_deploy_template`, `n8n_workflow_versions`
- `n8n_test_workflow`, `n8n_executions`

---

### Outils de Découverte

#### `search_nodes`
Rechercher des nodes par mot-clé — **< 20 ms**

```javascript
search_nodes({ query: "slack" })
// Retourne : nodeType (format court) + workflowNodeType (format long)
```

Options :
- `mode: "OR"` (défaut) — n'importe quel mot correspond
- `mode: "AND"` — tous les mots doivent correspondre
- `limit: 20` — nombre de résultats

---

#### `get_node`
Détails complets d'un node — **< 10 ms**

**Niveaux de détail** (`mode: "info"` par défaut) :

| Niveau | Tokens | Usage |
|--------|--------|-------|
| `minimal` | ~200 | Découverte rapide |
| `standard` | ~1–2K | **RECOMMANDÉ** — 95% des cas |
| `full` | ~3–8K | Debug / analyse complète |

**Modes de consultation** :

| Mode | Retourne | Quand l'utiliser |
|------|----------|-----------------|
| `info` (défaut) | Schéma avec level de détail | Configuration standard |
| `docs` | Documentation markdown lisible | Comprendre les options |
| `search_properties` | Propriétés spécifiques (avec `propertyQuery`) | Trouver un param précis |
| `versions` | Liste des versions avec breaking changes | Compatibilité |
| `compare` | Comparaison entre deux versions | Migration |
| `breaking` | Uniquement les breaking changes | Mise à jour critique |
| `migrations` | Changements auto-migrables | Upgrade automatique |

```javascript
// Standard (recommandé)
get_node({ nodeType: "nodes-base.httpRequest" })

// Documentation lisible
get_node({ nodeType: "nodes-base.webhook", mode: "docs" })

// Rechercher une propriété précise
get_node({ nodeType: "nodes-base.httpRequest", mode: "search_properties", propertyQuery: "auth" })

// Vérifier les versions disponibles
get_node({ nodeType: "nodes-base.executeWorkflow", mode: "versions" })

// Avec exemples réels issus de templates
get_node({ nodeType: "nodes-base.slack", includeExamples: true })
```

---

### Outils de Validation

#### `validate_node`
Valider la configuration d'un node

**Mode** (portée de la validation) :
- `full` (défaut) — validation complète avec erreurs, warnings, suggestions
- `minimal` — vérifie uniquement les champs requis (rapide)

**Profil** (niveau de rigueur) :

| Profil | Usage | Rigueur |
|--------|-------|---------|
| `minimal` | Check rapide | Champs requis seulement |
| `runtime` | **RECOMMANDÉ** | Valeurs + types |
| `ai-friendly` | Workflows IA | Réduit les faux positifs |
| `strict` | Production | Toutes les vérifications |

```javascript
// Validation complète avec profil recommandé
validate_node({ nodeType: "nodes-base.slack", config: {...}, profile: "runtime" })

// Check rapide des champs obligatoires
validate_node({ nodeType: "nodes-base.webhook", config: {}, mode: "minimal" })
```

#### `validate_workflow`
Valider un workflow complet — **100–500 ms**

---

### Outils de Gestion de Workflows

#### `n8n_create_workflow`
Créer un nouveau workflow — **100–500 ms**

#### `n8n_update_partial_workflow` ⭐ OUTIL LE PLUS UTILISÉ
**38 287 utilisations — 99,0% de taux de succès — 56s moy. entre les edits**

Toujours inclure le paramètre `intent` pour de meilleures réponses :
```javascript
n8n_update_partial_workflow({
  id: "workflow-id",
  intent: "Ajouter la gestion d'erreurs pour les échecs API",
  operations: [...]
})
```

**17 Types d'Opérations :**

| Catégorie | Type | Description |
|-----------|------|-------------|
| **Nodes** | `addNode` | Ajouter un node |
| | `removeNode` | Supprimer par ID ou nom |
| | `updateNode` | Mettre à jour les propriétés (notation pointée) |
| | `moveNode` | Changer la position |
| | `enableNode` | Activer un node désactivé |
| | `disableNode` | Désactiver un node actif |
| **Connexions** | `addConnection` | Connecter des nodes |
| | `removeConnection` | Supprimer une connexion |
| | `rewireConnection` | Changer la cible |
| | `cleanStaleConnections` | Supprimer les connexions cassées |
| | `replaceConnections` | Remplacer toutes les connexions |
| **Métadonnées** | `updateSettings` | Paramètres du workflow |
| | `updateName` | Renommer le workflow |
| | `addTag` | Ajouter un tag |
| | `removeTag` | Supprimer un tag |
| **Activation** | `activateWorkflow` | Activer le workflow |
| | `deactivateWorkflow` | Désactiver le workflow |

**Smart Parameters — Connexions sémantiques :**

```javascript
// IF Node — branches nommées (évite sourceIndex)
{ type: "addConnection", source: "IF", target: "True Handler", branch: "true" }
{ type: "addConnection", source: "IF", target: "False Handler", branch: "false" }

// Switch Node — numéros de cas
{ type: "addConnection", source: "Switch", target: "Handler A", case: 0 }
```

**Types de Connexions IA (8 types) :**
```javascript
// Les 8 types de connexions AI :
// ai_languageModel | ai_tool | ai_memory | ai_outputParser
// ai_embedding | ai_vectorStore | ai_document | ai_textSplitter

{ type: "addConnection", source: "OpenAI Chat Model", target: "AI Agent", sourceOutput: "ai_languageModel" }
```

#### `n8n_list_workflows` / `n8n_get_workflow`
Lister et récupérer les workflows existants

#### `n8n_validate_workflow`
Valider un workflow par ID — **100–500 ms**

#### `n8n_autofix_workflow`
Correction automatique des problèmes courants — **100–300 ms**

#### `n8n_deploy_template`
Déployer un template vers n8n — **200–500 ms**

```javascript
n8n_deploy_template({
  templateId: 2947,
  name: "Mon Slack Notifier",      // Nom personnalisé (optionnel)
  autoFix: true,                    // Corrige les problèmes courants
  autoUpgradeVersions: true         // Met à jour les versions des nodes
})
// Retourne : workflow ID, credentials requis, corrections appliquées
```

#### `n8n_workflow_versions`
Gestion des versions et rollback — **100–300 ms**

#### `n8n_test_workflow`
Tester l'exécution d'un workflow

#### `n8n_executions`
Gérer les exécutions

---

### Outils de Templates

#### `search_templates`
Rechercher parmi 2 700+ templates — **< 50 ms**

```javascript
// Par mot-clé (mode défaut)
search_templates({ query: "webhook slack notification", limit: 20 })

// Par types de nodes utilisés
search_templates({ searchMode: "by_nodes", nodeTypes: ["n8n-nodes-base.httpRequest", "n8n-nodes-base.slack"] })

// Par type de tâche
search_templates({ searchMode: "by_task", task: "webhook_processing" })

// Par métadonnées (complexité, temps de setup)
search_templates({ searchMode: "by_metadata", complexity: "simple", maxSetupMinutes: 15 })
```

#### `get_template`
Récupérer un template spécifique

```javascript
get_template({ templateId: 2947, mode: "structure" }) // nodes+connexions uniquement
get_template({ templateId: 2947, mode: "full" })       // workflow JSON complet
```

---

### Outils d'Aide

#### `tools_documentation`
Meta-documentation de tous les outils

```javascript
tools_documentation()                                              // Vue d'ensemble
tools_documentation({ topic: "search_nodes", depth: "full" })    // Outil spécifique
tools_documentation({ topic: "javascript_code_node_guide", depth: "full" })
tools_documentation({ topic: "python_code_node_guide", depth: "full" })
```

#### `ai_agents_guide`
Guide complet pour les workflows IA (architecture, connexions, validation)

#### `n8n_health_check`
Vérification de santé du serveur

```javascript
n8n_health_check()                       // Check rapide
n8n_health_check({ mode: "diagnostic" }) // Diagnostics complets : status, env vars, connectivité API
```

---

## CRITIQUE — Formats nodeType

**DEUX formats différents selon les outils !**

| Format | Exemple | Utilisé par |
|--------|---------|-------------|
| **Court** | `"nodes-base.slack"` | `search_nodes`, `get_node`, `validate_node`, `validate_workflow` |
| **Long** | `"n8n-nodes-base.slack"` | `n8n_create_workflow`, `n8n_update_partial_workflow` |

```javascript
// search_nodes retourne LES DEUX formats automatiquement
{
  "nodeType": "nodes-base.slack",              // Pour search/validate
  "workflowNodeType": "n8n-nodes-base.slack"   // Pour workflow tools
}
```

Exemples :
```javascript
// Format court
"nodes-base.slack"           "nodes-base.httpRequest"
"nodes-base.webhook"         "nodes-langchain.agent"

// Format long
"n8n-nodes-base.slack"       "n8n-nodes-base.httpRequest"
"n8n-nodes-base.webhook"     "@n8n/n8n-nodes-langchain.agent"
```

---

## Système d'Auto-Sanitization

**S'exécute automatiquement sur TOUTE mise à jour de workflow**

### Ce qu'il corrige automatiquement ✅
- **Opérateurs binaires** (equals, contains, greaterThan...) → supprime `singleValue`
- **Opérateurs unaires** (isEmpty, isNotEmpty, true, false) → ajoute `singleValue: true`
- **IF/Switch Metadata** → ajoute les métadonnées `conditions.options` manquantes

### Ce qu'il NE PEUT PAS corriger ❌
- Connexions cassées vers des nodes inexistants
- Nombre de branches ne correspondant pas aux règles
- États corrompus paradoxaux

**Solution pour les connexions cassées :**
```javascript
n8n_update_partial_workflow({
  id: "workflow-id",
  operations: [{ type: "cleanStaleConnections" }]
})
```

---

## 7 Skills Claude Code — Référence

Les skills s'activent automatiquement selon le contexte. Invocables aussi via commande slash.

**Installation :** `~/.claude/skills/` (installés et actifs)

---

### Skill #1 — n8n-mcp-tools-expert [PRIORITÉ HAUTE]
**Commande :** `/n8n-mcp-tools-expert`

Activer quand :
- Recherche de nodes avec `search_nodes`
- Configuration des paramètres des outils MCP
- Choix du niveau de détail pour `get_node`
- Accès aux templates et validation
- Gestion de workflows avec l'API

Documentation locale :
- [n8n-skills/skills/n8n-mcp-tools-expert/SEARCH_GUIDE.md](n8n-skills/skills/n8n-mcp-tools-expert/SEARCH_GUIDE.md)
- [n8n-skills/skills/n8n-mcp-tools-expert/VALIDATION_GUIDE.md](n8n-skills/skills/n8n-mcp-tools-expert/VALIDATION_GUIDE.md)
- [n8n-skills/skills/n8n-mcp-tools-expert/WORKFLOW_GUIDE.md](n8n-skills/skills/n8n-mcp-tools-expert/WORKFLOW_GUIDE.md)

---

### Skill #2 — n8n-expression-syntax
**Commande :** `/n8n-expression-syntax`

Activer quand :
- Écriture d'expressions `{{ }}`
- Accès aux données entre nodes
- Erreurs "Cannot read property"
- Mapping de données

**POINT CRITIQUE :**
```javascript
// Données webhook = TOUJOURS sous $json.body
{{ $json.body.email }}           // Correct
{{ $json.email }}                // ERREUR pour webhook !

// Accès aux données d'un autre node
{{ $node["HTTP Request"].json.data }}

// Variables core
$json      // Données du node précédent
$input     // Accès programmatique aux inputs
$node      // Accès aux autres nodes
$now       // DateTime actuel (Luxon)
$env       // Variables d'environnement
```

Règles :
1. Toujours `{{ }}` pour le contenu dynamique
2. Données webhook sous `.body`
3. Pas de `{{ }}` dans les Code nodes
4. Guillemets pour les noms de nodes avec espaces
5. Les noms de nodes sont sensibles à la casse

Documentation locale :
- [n8n-skills/skills/n8n-expression-syntax/](n8n-skills/skills/n8n-expression-syntax/)

---

### Skill #3 — n8n-workflow-patterns
**Commande :** `/n8n-workflow-patterns`

Activer quand :
- Création d'un nouveau workflow
- Choix d'architecture
- Questions sur les bonnes pratiques

**5 patterns architecturaux éprouvés** (issus de 2 653+ templates) :

| Pattern | Déclencheur | Cas d'usage |
|---------|-------------|-------------|
| Webhook Processing | Webhook Node | Réception de données externes |
| HTTP API Integration | Schedule/Webhook | Appels d'APIs externes |
| Database Operations | Any trigger | CRUD, synchronisation |
| AI Agent Workflows | Webhook/Chat | Chatbots, agents IA |
| Scheduled Tasks | Schedule Trigger | Tâches périodiques |

Documentation locale :
- [n8n-skills/skills/n8n-workflow-patterns/](n8n-skills/skills/n8n-workflow-patterns/)

---

### Skill #4 — n8n-validation-expert
**Commande :** `/n8n-validation-expert`

Activer quand :
- Erreurs de validation retournées
- Debugging de workflows
- Compréhension des warnings
- Faux positifs de validation

**La validation est ITÉRATIVE :**
```
1. Configurer node
   ↓
2. validate_node → profile: "runtime"
   ↓
3. Lire les erreurs attentivement (23s réflexion moy.)
   ↓
4. Corriger les erreurs (58s correction moy.)
   ↓
5. validate_node à nouveau
   ↓
6. Répéter jusqu'à validation (généralement 2–3 itérations)
```

**Types d'erreurs :**

| Type | Priorité | Auto-fix |
|------|----------|----------|
| `missing_required` | Haute | ❌ |
| `invalid_value` | Haute | ❌ |
| `type_mismatch` | Moyenne | ❌ |
| `invalid_expression` | Moyenne | ❌ |
| `invalid_reference` | Basse | ❌ |
| `operator_structure` | Basse | ✅ |

Documentation locale :
- [n8n-skills/skills/n8n-validation-expert/SKILL.md](n8n-skills/skills/n8n-validation-expert/SKILL.md)
- [n8n-skills/skills/n8n-validation-expert/ERROR_CATALOG.md](n8n-skills/skills/n8n-validation-expert/ERROR_CATALOG.md)
- [n8n-skills/skills/n8n-validation-expert/FALSE_POSITIVES.md](n8n-skills/skills/n8n-validation-expert/FALSE_POSITIVES.md)

---

### Skill #5 — n8n-node-configuration
**Commande :** `/n8n-node-configuration`

Activer quand :
- Configuration de nodes complexes
- Propriétés avec dépendances
- Nodes AI/LangChain
- Choix du niveau de détail `get_node`

**Dépendances entre propriétés :**
```
HTTP Request:
  - method: GET  → pas de body
  - method: POST → body requis
  - authentication: OAuth2 → credentials spécifiques

AI Agent:
  - connectionType: "ai_agent" → memory optionnelle
  - connectionType: "ai_tool"  → pas de memory
```

Documentation locale :
- [n8n-skills/skills/n8n-node-configuration/SKILL.md](n8n-skills/skills/n8n-node-configuration/SKILL.md)
- [n8n-skills/skills/n8n-node-configuration/DEPENDENCIES.md](n8n-skills/skills/n8n-node-configuration/DEPENDENCIES.md)
- [n8n-skills/skills/n8n-node-configuration/OPERATION_PATTERNS.md](n8n-skills/skills/n8n-node-configuration/OPERATION_PATTERNS.md)

---

### Skill #6 — n8n-code-javascript
**Commande :** `/n8n-code-javascript`

Activer quand :
- Écriture de code dans Code nodes
- Transformation de données complexes
- Logique conditionnelle avancée
- Requêtes HTTP dans le code

**Patterns essentiels :**

```javascript
// Accès aux données
const allItems = $input.all();               // Tous les items
const firstItem = $input.first();            // Premier item
const itemData = $json;                      // Item courant

// CRITIQUE : Données webhook
const webhookData = $input.first().json.body; // Correct !

// Format de retour OBLIGATOIRE
return [{ json: { key: "value" } }];          // Toujours tableau d'objets avec .json

// Accès aux autres nodes
const httpResult = $node["HTTP Request"].json;

// Requêtes HTTP avec helpers
const response = await $helpers.httpRequest({
  method: 'POST',
  url: 'https://api.example.com/data',
  body: { key: 'value' },
  headers: { 'Content-Type': 'application/json' }
});

// DateTime avec Luxon (built-in)
const now = DateTime.now();
const formatted = now.toFormat('yyyy-MM-dd');
```

**Top 5 erreurs à éviter :**
1. Oublier `return [{ json: ... }]`
2. Accéder à `$json` directement pour webhook (utiliser `$json.body`)
3. Modifier les items originaux au lieu de créer des copies
4. Oublier `await` pour les opérations async
5. Retourner un objet au lieu d'un tableau

Documentation locale :
- [n8n-skills/skills/n8n-code-javascript/DATA_ACCESS.md](n8n-skills/skills/n8n-code-javascript/DATA_ACCESS.md)
- [n8n-skills/skills/n8n-code-javascript/BUILTIN_FUNCTIONS.md](n8n-skills/skills/n8n-code-javascript/BUILTIN_FUNCTIONS.md)
- [n8n-skills/skills/n8n-code-javascript/COMMON_PATTERNS.md](n8n-skills/skills/n8n-code-javascript/COMMON_PATTERNS.md)
- [n8n-skills/skills/n8n-code-javascript/ERROR_PATTERNS.md](n8n-skills/skills/n8n-code-javascript/ERROR_PATTERNS.md)

---

### Skill #7 — n8n-code-python
**Commande :** `/n8n-code-python`

**RÈGLE D'OR : Utilisez JavaScript pour 95% des cas**

Utiliser Python uniquement pour : calculs mathématiques avancés, parsing de formats spécifiques, manipulation de dates complexes.

**Limitations Python dans n8n :**
- Pas de librairies externes (pas de requests, pandas, numpy)
- Bibliothèque standard Python uniquement
- Performance légèrement inférieure

```python
# Accès aux données
items = _input.all()
first_item = _input.first()
data = _json

# Données webhook
webhook_data = _input.first()['json']['body']

# Format de retour
return [{"json": {"key": "value"}}]
```

Documentation locale :
- [n8n-skills/skills/n8n-code-python/DATA_ACCESS.md](n8n-skills/skills/n8n-code-python/DATA_ACCESS.md)
- [n8n-skills/skills/n8n-code-python/STANDARD_LIBRARY.md](n8n-skills/skills/n8n-code-python/STANDARD_LIBRARY.md)
- [n8n-skills/skills/n8n-code-python/COMMON_PATTERNS.md](n8n-skills/skills/n8n-code-python/COMMON_PATTERNS.md)

---

## Méthodologie de travail

### Phase 1 — Analyse
1. Comprendre le besoin, clarifier les points ambigus
2. Analyser l'existant si correction/amélioration (`n8n_get_workflow` + `n8n_validate_workflow`)

### Phase 2 — Conception
1. Choisir le pattern architectural (`/n8n-workflow-patterns`)
2. Identifier les nodes (`search_nodes` + `get_node`)
3. Valider l'approche avec l'utilisateur si choix majeur

### Phase 3 — Implémentation
1. Créer (`n8n_create_workflow`) ou modifier (`n8n_update_partial_workflow`) — **itératif !**
2. Valider après chaque changement significatif (`validate_node` → `n8n_validate_workflow`)
3. Utiliser `n8n_autofix_workflow` pour les corrections automatiques
4. Activer (`{ type: "activateWorkflow" }`)

### Phase 4 — Livraison
1. Documenter les choix techniques
2. Présenter le workflow finalisé avec recommandations

---

## Workflows de création / correction / amélioration

### CRÉATION
```
1. Analyse du besoin
2. Choix du pattern (n8n-workflow-patterns)
3. Sélection des nodes (search_nodes → get_node)
4. Création (n8n_create_workflow)
5. Configuration itérative (n8n_update_partial_workflow × plusieurs)
6. Validation (n8n_validate_workflow) — 2-3 cycles
7. Tests et ajustements
8. Activation (activateWorkflow)
9. Documentation et livraison
```

### CORRECTION
```
1. Récupération du workflow (n8n_get_workflow)
2. Identification des erreurs (n8n_validate_workflow)
3. Correction auto (n8n_autofix_workflow) → puis manuelle si nécessaire
4. Validation de la correction
5. Tests de non-régression
6. Documentation des corrections
```

### AMÉLIORATION
```
1. Analyse du workflow existant
2. Identification des points d'amélioration
3. Proposition d'optimisations
4. Validation de l'approche avec l'utilisateur
5. Implémentation des améliorations
6. Tests fonctionnels / performance
7. Documentation des changements
```

---

## RÈGLE D'OR DE SÉCURITÉ

> **"Ne modifiez JAMAIS vos workflows de production directement avec l'IA"**
>
> Processus obligatoire :
> 1. Copiez le workflow (`n8n_list_workflows` → copier l'ID)
> 2. Testez en environnement de développement
> 3. Exportez des backups (`n8n_workflow_versions`)
> 4. Validez avant déploiement en production

---

## QUICK REFERENCE

### Patterns de données critiques
```javascript
// WEBHOOK : données sous body
$json.body.field               // Expression
$input.first().json.body       // JavaScript

// NODE PRÉCÉDENT : données directes
$json.field                    // Expression
$input.first().json            // JavaScript

// AUTRE NODE : accès par nom
$node["HTTP Request"].json     // Expression et JavaScript

// RETOUR DE CODE NODE : toujours un tableau
return [{ json: { key: "value" } }];
```

### Format nodeType — CRITIQUE
```javascript
// search/validate tools  →  format court
"nodes-base.slack"    "nodes-base.httpRequest"

// workflow tools  →  format long
"n8n-nodes-base.slack"    "n8n-nodes-base.httpRequest"
```

### Outils MCP les plus utilisés
| Outil | Usage | Succès |
|-------|-------|--------|
| `n8n_update_partial_workflow` | Éditer workflows | 99,0% |
| `search_nodes` | Trouver nodes | 99,9% |
| `get_node` | Détails nodes | 99,9% |
| `validate_workflow` | Valider | 98,5% |

### Invoquer un skill
```
/n8n-mcp-tools-expert     # Guide d'utilisation des outils MCP
/n8n-expression-syntax    # Aide sur les expressions {{ }}
/n8n-workflow-patterns    # Patterns architecturaux
/n8n-validation-expert    # Interpréter les erreurs de validation
/n8n-node-configuration   # Configuration avancée des nodes
/n8n-code-javascript      # Code JavaScript dans Code nodes
/n8n-code-python          # Code Python dans Code nodes
```

---

## Standards de qualité

### Architecture
- Structure logique et claire, séparation des responsabilités
- Gestion des cas d'erreur, retry logic appropriée
- Performance optimisée, composants réutilisables

### Sécurité
- Credentials via le système n8n (jamais en dur dans le workflow)
- Validation des données entrantes à chaque boundary
- Respect des bonnes pratiques OWASP

### Code
- Lisible, variables nommées explicitement
- Commentaires sur les parties complexes
- Gestion des erreurs async

---

## Fichiers du projet

| Fichier/Dossier | Description |
|-----------------|-------------|
| [.mcp.json](.mcp.json) | Configuration MCP n8n (ACTIF) |
| [n8n-skills/](n8n-skills/) | Repo n8n-skills cloné localement |
| [n8n-skills/skills/](n8n-skills/skills/) | 7 skills avec documentation complète |
| [n8n-skills/docs/](n8n-skills/docs/) | Docs techniques (CODE_NODE_BEST_PRACTICES, USAGE...) |
| Ce document | Règles du jeu et méthodologie |

## Skills installés — documentation détaillée

| Skill | Path local |
|-------|-----------|
| n8n-mcp-tools-expert | [n8n-skills/skills/n8n-mcp-tools-expert/](n8n-skills/skills/n8n-mcp-tools-expert/) |
| n8n-expression-syntax | [n8n-skills/skills/n8n-expression-syntax/](n8n-skills/skills/n8n-expression-syntax/) |
| n8n-workflow-patterns | [n8n-skills/skills/n8n-workflow-patterns/](n8n-skills/skills/n8n-workflow-patterns/) |
| n8n-validation-expert | [n8n-skills/skills/n8n-validation-expert/](n8n-skills/skills/n8n-validation-expert/) |
| n8n-node-configuration | [n8n-skills/skills/n8n-node-configuration/](n8n-skills/skills/n8n-node-configuration/) |
| n8n-code-javascript | [n8n-skills/skills/n8n-code-javascript/](n8n-skills/skills/n8n-code-javascript/) |
| n8n-code-python | [n8n-skills/skills/n8n-code-python/](n8n-skills/skills/n8n-code-python/) |

## Liens externes

| Ressource | URL |
|-----------|-----|
| n8n MCP Server | https://github.com/czlonkowski/n8n-mcp |
| n8n Skills | https://github.com/czlonkowski/n8n-skills |
| Documentation n8n | https://docs.n8n.io |
| Model Context Protocol | https://spec.modelcontextprotocol.io |
| Communauté n8n | https://community.n8n.io |

---

**Version :** 5.0 — Installation complète MCP + Skills actifs (`~/.claude/skills/`) + documentation exhaustive
**Dernière mise à jour :** 2026-02-16
**Sources :** https://github.com/czlonkowski/n8n-mcp · https://github.com/czlonkowski/n8n-skills
