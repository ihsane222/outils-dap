# Note interne — Intégration IA & Conformité RGPD
**À :** Christophe
**Objet :** Infrastructure IA locale — enjeux légaux et recommandation matérielle
**Date :** Février 2026

---

## Contexte

DAP souhaite intégrer l'intelligence artificielle dans ses processus internes. Avant de déployer des outils IA, il est essentiel de cadrer la question de la conformité RGPD, qui conditionne directement le choix de l'infrastructure.

---

## Le problème légal avec les IA cloud (ChatGPT, Claude, Gemini…)

Lorsqu'un collaborateur utilise une IA en ligne et y colle des données clients (noms, contrats, sinistres, emails…), ces données sont **envoyées vers des serveurs situés aux États-Unis**.

Cela pose trois problèmes RGPD concrets :

1. **Transfert hors UE non encadré** (Art. 44 RGPD) — sans accord de traitement signé avec le fournisseur IA, le transfert est illégal.
2. **Absence d'information aux clients** — les clients de DAP n'ont pas consenti à ce que leurs données soient traitées par une IA tierce.
3. **Risque APD** — l'Autorité de Protection des Données belge peut sanctionner jusqu'à **4 % du chiffre d'affaires annuel**.

**Ce n'est pas une question théorique** : plusieurs cabinets de courtage et d'avocats en Belgique ont déjà reçu des mises en demeure pour l'usage de ChatGPT avec des données clients.

---

## La solution : un serveur IA en local

La réponse technique et juridique la plus propre est d'héberger un **modèle d'IA directement dans les locaux de DAP**.

**Principe :** les données ne quittent jamais les bureaux. L'IA tourne sur une machine interne, accessible uniquement par les collaborateurs DAP.

| Aspect | IA cloud (ChatGPT, Claude…) | IA locale (serveur DAP) |
|---|---|---|
| Données clients | Envoyées aux USA | Restent dans les bureaux DAP |
| Conformité RGPD | Problématique sans cadre | Conforme par défaut |
| Accord de traitement | Obligatoire | Non nécessaire |
| Coût récurrent | Abonnement mensuel (~$20–200/mois) | Coût unique matériel |
| Qualité IA | Excellente | Très bonne (modèles open-source récents) |

---

## Recommandation matérielle

Pour faire tourner un serveur IA performant en interne, le **Mac mini M4 Pro** est aujourd'hui la solution la plus adaptée pour une PME :

- Compact (taille d'un livre), silencieux, faible consommation (~30W)
- Puce M4 Pro : architecture optimisée pour les modèles d'IA
- Peut faire tourner des modèles équivalents à GPT-3.5 / GPT-4 en local

### Configuration recommandée

| Configuration | RAM | Capacité | Prix indicatif |
|---|---|---|---|
| **Minimum viable** | 24 GB | Résumés, extraction, analyse documents | ~1 700 € |
| **Recommandée** | 48 GB | Tâches complexes, multi-utilisateurs | ~2 500 € |

La configuration **48 GB** est conseillée pour un usage multi-collaborateurs simultané.

### Logiciel (gratuit et open-source)

- **Ollama** : interface simple pour faire tourner des modèles IA en local
- **Modèles recommandés** : Mistral, LLaMA 3, Qwen — tous gratuits, performants, utilisables sans abonnement
- **n8n** (optionnel) : outil d'automatisation de workflows, peut s'installer en local pour connecter l'IA aux processus internes

---

## Ce que cela permettrait à DAP

Avec ce setup, DAP pourrait légalement utiliser l'IA pour :

- Analyser et résumer des documents internes (CG assureurs, contrats)
- Assister les collaborateurs dans la rédaction (emails, rapports)
- Automatiser des tâches répétitives à partir de données clients
- Former les équipes via des outils IA internes (type DAP Academy)

Le tout **sans risque RGPD**, sans abonnement mensuel, et avec une maîtrise totale des données.

---

## Conclusion

L'achat d'un **Mac mini M4 Pro 48 GB (~2 500 €)** représente un investissement ponctuel qui :
- Sécurise DAP sur le plan RGPD pour tous les usages IA présents et futurs
- Supprime les coûts d'abonnement récurrents aux IA cloud
- Offre une infrastructure réutilisable pour plusieurs années

C'est la condition préalable à toute intégration IA sérieuse et conforme dans la boîte.

---

*Document préparé pour discussion interne — Février 2026*
