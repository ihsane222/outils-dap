```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        ██████╗ ██████╗ ██╗   ██╗██████╗ ████████╗██╗███████╗ ║
║       ██╔════╝██╔═══██╗██║   ██║██╔══██╗╚══██╔══╝██║██╔════╝ ║
║       ██║     ██║   ██║██║   ██║██████╔╝   ██║   ██║███████╗ ║
║       ██║     ██║   ██║██║   ██║██╔══██╗   ██║   ██║╚════██║ ║
║       ╚██████╗╚██████╔╝╚██████╔╝██║  ██║   ██║   ██║███████║ ║
║        ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝ ║
║                                                               ║
║          Système de contrôle et supervision documentaire      ║
║                   pour cabinets de courtage                   ║
╚═══════════════════════════════════════════════════════════════╝
```

> **Document de Présentation Conceptuelle** — Usage interne
> Version 1.0

---

<br>

## 🏢  1. Contexte Métier

Un cabinet de courtage en assurance opère dans un environnement soumis à des contraintes réglementaires strictes et à une gestion documentaire dense.

Au quotidien, les gestionnaires traitent simultanément un volume important de dossiers clients, chacun comportant des éléments hétérogènes :

| Élément | Nature |
|---------|--------|
| 📄 Contrats en cours | Documents contractuels actifs |
| 🪪 Pièces justificatives | Identité, situation patrimoniale |
| 🔍 Obligations LCB-FT / PPE | Vigilance réglementaire |
| ✍️ Documents à signer | Validité juridique |
| ⏰ Dates d'échéance | Expiration, renouvellement |
| 🏛️ Exigences FSMA | Conformité réglementaire |

Chaque dossier suit un cycle de vie propre. Les pièces ont des dates de validité. Les règles de conformité évoluent. Les volumes traités rendent la surveillance exhaustive difficile à maintenir dans la durée.

---

<br>

## ⚠️  2. Problématique

Le fonctionnement actuel des cabinets de courtage repose sur la **vigilance humaine** comme premier mécanisme de contrôle.

Ce modèle présente des fragilités structurelles :

> 📁 **Documents manquants**
> Une pièce justificative absente peut passer inaperçue si elle n'est pas activement vérifiée au bon moment.

> ✍️ **Signatures absentes**
> Un document non signé reste bloquant pour la validité juridique d'un dossier.

> ⏳ **Pièces expirées**
> Une carte d'identité ou une attestation peut arriver à expiration sans qu'aucune alerte ne soit générée.

> 🚨 **Non-conformité involontaire**
> Le non-respect d'une obligation réglementaire ne résulte pas toujours d'un manque de rigueur, mais d'une surcharge de traitement.

> 🔔 **Oublis de relance**
> Sans système de suivi actif, les actions en attente de réponse d'un client ou d'un tiers peuvent rester sans suite.

Ces risques ne sont pas théoriques. Ils se manifestent lors de contrôles réglementaires, lors de sinistres, ou lors d'audits internes. Leur occurrence est proportionnelle au volume traité et à la pression opérationnelle exercée sur les équipes.

**La problématique centrale :** comment garantir la conformité et l'exhaustivité d'un portefeuille de dossiers lorsque cette garantie ne peut plus reposer exclusivement sur la mémoire et la vigilance des gestionnaires ?

---

<br>

## 🛡️  3. Définition de Courtis

Courtis est un **système de contrôle automatisé et de supervision intelligente** appliqué aux dossiers d'un cabinet de courtage.

Il peut être défini selon trois angles complémentaires :

```
┌─────────────────────────────────────────────────────────────┐
│  ⚙️  MOTEUR DE CONTRÔLE AUTOMATISÉ                          │
│                                                             │
│  Applique en continu un ensemble de règles métier aux       │
│  dossiers clients. Vérifie présence, validité, conformité   │
│  et avancement — sans intervention humaine systématique.    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🔭  SYSTÈME DE SUPERVISION INTELLIGENTE                     │
│                                                             │
│  Fournit une vue consolidée et actualisée de l'état de      │
│  conformité. Signale les anomalies et les actions à         │
│  entreprendre au moment où elles deviennent pertinentes.    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🪢  FILET DE SÉCURITÉ AUTOUR DES DOSSIERS                  │
│                                                             │
│  Fonctionne en couche de contrôle secondaire. Détecte et    │
│  signale les écarts laissés par les vérifications humaines  │
│  incomplètes. Réduit la surface d'exposition aux omissions. │
└─────────────────────────────────────────────────────────────┘
```

---

<br>

## ⚙️  4. Fonctionnement Conceptuel

Le fonctionnement de Courtis repose sur un enchaînement logique en cinq étapes :

```mermaid
flowchart LR
    A["👁️ OBSERVATION\nLecture de l'état\ndes dossiers"]
    --> B["📖 LECTURE\nInterprétation\ndes données"]
    --> C["📋 APPLICATION\nDE RÈGLES\nRéférentiel métier"]
    --> D["🚨 SIGNALEMENT\nAlertes &\nnotifications"]
    --> E["📜 TRAÇABILITÉ\nHistorique\nconsultable"]

    style A fill:#1e3a5f,color:#fff,stroke:#4a90d9
    style B fill:#1e3a5f,color:#fff,stroke:#4a90d9
    style C fill:#1e3a5f,color:#fff,stroke:#4a90d9
    style D fill:#c0392b,color:#fff,stroke:#e74c3c
    style E fill:#1a5c38,color:#fff,stroke:#27ae60
```

<br>

**👁️ Observation**
Courtis observe en permanence l'état des dossiers. Il accède aux informations disponibles : présence ou absence de documents, statuts, dates, champs renseignés ou manquants.

**📖 Lecture**
À partir des données observées, Courtis interprète l'état de chaque dossier au regard des règles qui lui sont applicables. Il évalue la complétude documentaire, la validité des pièces, et le niveau de conformité aux obligations en vigueur.

**📋 Application de règles**
Courtis applique un référentiel de règles métier définies en amont. Ces règles traduisent les obligations réglementaires, les standards internes du cabinet, et les critères de complétude propres à chaque type de dossier. L'application est systématique et non sélective.

**🚨 Signalement**
Lorsqu'un écart est détecté, Courtis génère un signal. Ce signal prend la forme d'une alerte, d'une notification ou d'une tâche assignée, adressée au gestionnaire concerné ou à la hiérarchie selon la criticité de l'anomalie.

**📜 Traçabilité**
Chaque vérification effectuée, chaque anomalie détectée, chaque signal émis est enregistré. Cette traçabilité constitue un historique consultable, utile en cas de contrôle réglementaire, d'audit interne, ou de litige.

---

<br>

## 🚫  5. Ce que Courtis n'est pas

```
  ❌  Un CRM          →  Ne gère pas la relation commerciale client
  ❌  Un remplacement →  Ne prend pas de décisions à la place des gestionnaires
  ❌  Un outil vente  →  N'intervient pas dans le processus commercial
  ❌  Un outil mktg   →  Ne produit pas de communications client
  ❌  Un logiciel GED →  Ne remplace pas le système de gestion existant
```

| Ce que Courtis N'EST PAS | Ce qu'il fait réellement |
|--------------------------|--------------------------|
| ❌ Un CRM | ✅ Un contrôleur de conformité documentaire |
| ❌ Un remplacement humain | ✅ Un filet de sécurité pour les gestionnaires |
| ❌ Un outil de vente | ✅ Un système de supervision opérationnelle |
| ❌ Un outil marketing | ✅ Un moteur de règles métier automatisé |
| ❌ Un logiciel de gestion | ✅ Une couche de contrôle articulée sur l'existant |

---

<br>

## 📊  6. Valeur Opérationnelle

```
┌──────────────────────────────────────────────────────────────┐
│  👤  POUR LE GESTIONNAIRE                                    │
├──────────────────────────────────────────────────────────────┤
│  Réduction de la charge cognitive liée à la surveillance.    │
│  Les informations arrivent au bon moment, sur les seuls      │
│  dossiers qui nécessitent une attention.                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  🧠  SUR LA CHARGE MENTALE                                   │
├──────────────────────────────────────────────────────────────┤
│  Gestion par exception : traiter ce qui est signalé plutôt   │
│  que vérifier l'ensemble. La vigilance est orientée là       │
│  où elle est nécessaire.                                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  🏛️  SUR LA CONFORMITÉ                                       │
├──────────────────────────────────────────────────────────────┤
│  Le taux de conformité documentaire augmente mécaniquement.  │
│  Les obligations LCB-FT et FSMA sont tracées en continu.     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  📉  SUR LA RÉDUCTION DES ERREURS                            │
├──────────────────────────────────────────────────────────────┤
│  Les erreurs par omission diminuent : documents non          │
│  relancés, pièces expirées, signatures manquantes.           │
│  Détection automatique, non dépendante de la mémoire.        │
└──────────────────────────────────────────────────────────────┘
```

---

<br>

## 🎯  7. Valeur Stratégique

```
┌──────────────────────────────────────────────────────────────┐
│  🏢  POUR LA DIRECTION                                       │
├──────────────────────────────────────────────────────────────┤
│  Visibilité consolidée sur l'état de conformité du           │
│  portefeuille global. Indépendante des remontées manuelles.  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  ⚖️  MAÎTRISE DU RISQUE                                      │
├──────────────────────────────────────────────────────────────┤
│  Le risque opérationnel est objectivé et rendu visible.      │
│  Suivi dans le temps, mesurable, adressé de manière          │
│  structurée plutôt que réactive.                             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  🔭  VISIBILITÉ GLOBALE                                      │
├──────────────────────────────────────────────────────────────┤
│  Lecture transversale du portefeuille. Identification        │
│  des tendances, zones de fragilité, catégories de dossiers   │
│  structurellement sous-conformes.                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  ✅  SÉRÉNITÉ EN CAS DE CONTRÔLE                             │
├──────────────────────────────────────────────────────────────┤
│  La traçabilité produite par Courtis documente le processus  │
│  de vigilance du cabinet. Démontre que les contrôles ont     │
│  été effectués et les anomalies traitées.                    │
└──────────────────────────────────────────────────────────────┘
```

---

<br>

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COURTIS  ·  Document conceptuel  ·  Usage interne  ·  v1.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
