# Fiche Info Patrimoine — Automatisation

## Contexte

Le service Patrimoine de DAP remplit manuellement des **fiches d'information** pour chaque dossier d'épargne/investissement en assurance-vie. Ce processus est répétitif et chronophage.

## Objectif

Automatiser le pré-remplissage de la fiche d'information à partir de :
- **La carte d'identité** du client (PDF/photo)
- **La projection/offre** de la compagnie d'assurance (PDF)

Le courtier n'a plus qu'à **relire et signer**.

---

## Architecture technique proposée

```
┌─────────────┐    ┌─────────────┐
│  PDF Carte   │    │ PDF Offre /  │
│  d'identité  │    │ Projection   │
└──────┬───────┘    └──────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────────────────────────┐
│         n8n — Workflow           │
│                                  │
│  1. Réception des fichiers       │
│  2. Extraction CI (Claude Vision)│
│  3. Extraction Offre (Claude)    │
│  4. Mapping des champs           │
│  5. Génération fiche remplie     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│   Fiche d'information pré-       │
│   remplie (PDF/Word)             │
│   → prête à signer              │
└──────────────────────────────────┘
```

---

## Stack technique

| Composant | Rôle |
|-----------|------|
| **n8n** | Orchestration du workflow |
| **Claude API (Vision)** | Extraction des données depuis les PDFs (CI + offre) |
| **Template fiche** | Document Word/PDF modifiable avec champs balisés |
| **Génération doc** | Librairie pour injecter les données (docx-templater ou équivalent) |

---

## Données à extraire

### Depuis la carte d'identité
| Champ | Exemple |
|-------|---------|
| Nom | DUPONT |
| Prénom | Jean |
| Date de naissance | 15/03/1975 |
| Numéro national | 75.03.15-XXX.XX |
| Adresse | Rue de la Loi 1, 1000 Bruxelles |
| Nationalité | Belge |
| Date d'expiration CI | 15/03/2030 |

### Depuis la projection/offre
| Champ | Exemple |
|-------|---------|
| Compagnie | AG Insurance / Vivium / Baloise... |
| Type de produit | Branche 21 / Branche 23 / Mixte |
| Prime unique ou périodique | Périodique |
| Montant de la prime | 200 €/mois |
| Durée | 15 ans |
| Rendement garanti / projeté | 1,50% garanti |
| Bénéficiaire | Conjoint / Enfants |
| Avantage fiscal | Épargne à long terme / Épargne-pension |

---

## Workflow détaillé

### Phase 1 — Upload & déclenchement
- **Option A** : Formulaire web simple (upload 2 PDFs)
- **Option B** : Dossier surveillé (Google Drive / SharePoint / email)
- **Option C** : Déclenchement via n8n webhook

### Phase 2 — Extraction des données
1. Convertir les PDFs en images si nécessaire
2. Envoyer à Claude Vision avec un prompt structuré
3. Recevoir les données en JSON structuré
4. Valider les données (format, cohérence)

### Phase 3 — Génération du document
1. Charger le template de la fiche d'information
2. Injecter les données extraites aux bons emplacements
3. Générer le document final (PDF)
4. Notifier le courtier (email avec le document en pièce jointe)

---

## Éléments requis pour avancer

- [ ] **Template vierge** de la fiche d'information (Word de préférence)
- [ ] **Exemple de projection** d'une compagnie (AG, Vivium, Baloise...)
- [ ] **Exemple de carte d'identité** (anonymisé ou fictif)
- [ ] **Liste exacte des champs** à remplir dans la fiche
- [ ] **Compagnies concernées** (chaque compagnie a-t-elle son propre format de projection ?)
- [ ] **Volume estimé** (combien de fiches/semaine ?)

---

## Estimations & Phases

### Phase 1 — POC (Proof of Concept)
- 1 compagnie, 1 template de fiche
- Extraction CI + offre → fiche pré-remplie
- Test avec le service Patrimoine

### Phase 2 — Extension
- Ajout d'autres compagnies/formats de projection
- Gestion des variantes de fiches
- Interface utilisateur simplifiée

### Phase 3 — Production
- Intégration dans le flux de travail quotidien
- Monitoring et gestion des erreurs
- Formation des utilisateurs

---

## Statut : En attente des éléments du service Patrimoine
