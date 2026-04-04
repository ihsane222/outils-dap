# Mappings portails compagnies

Chaque fichier JSON dans ce dossier decrit les selecteurs CSS et la structure d'un formulaire de tarification d'une compagnie d'assurance, tel qu'accessible via Portima Connect.

## Structure d'un mapping

```json
{
  "company": "Nom exact de la compagnie",
  "portal_url": "URL du formulaire de tarification",
  "type_assurance": "auto | habitation | rc_pro | incendie",
  "technologie": "ASP.NET | React | Angular | autre",
  "notes": "Particularites techniques du portail",
  "status": "complete | stub",

  "flow": ["Etapes du flux de tarification dans l'ordre"],

  "page_principale": {
    "nom_du_champ": {
      "selector": "selecteur CSS (#id, .class, [attr])",
      "type": "input | select | radio | checkbox | submit",
      "description": "Ce que le champ represente",
      "valueMap": { "Label lisible": "valeur_technique" },
      "default": "valeur par defaut si applicable",
      "notes": "Comportement particulier (postback, iframe, etc.)"
    }
  }
}
```

## Types de champs

| Type | Interaction Playwright |
|------|----------------------|
| `input` | `page.fill(selector, value)` |
| `select` | `page.selectOption(selector, value)` |
| `radio` | `page.click(selector)` — toujours `.click()`, jamais `.check()` pour les radios ASP.NET |
| `checkbox` | `page.check(selector)` ou `page.uncheck(selector)` |
| `submit` | `page.click(selector)` puis attendre la navigation/postback |

## Fichiers actuels

| Fichier | Compagnie | Statut |
|---------|-----------|--------|
| `ag-insurance.json` | AG Insurance | Complet (auto) |
| `axa.json` | AXA Belgium | Stub — en attente acces portail |
| `ethias.json` | Ethias | Stub — en attente acces portail |

## Ajouter un nouveau mapping

1. Ouvrir le portail de tarification via Portima Connect sur le Lenovo
2. Inspecter le formulaire avec les DevTools (F12)
3. Creer un fichier `{compagnie}.json` en suivant la structure ci-dessus
4. Pour chaque champ du formulaire :
   - Trouver le selecteur CSS le plus stable (preferer `#id` > `[name]` > `.class`)
   - Identifier le type d'interaction (input, select, radio...)
   - Documenter le `valueMap` pour les selects et radios
   - Noter les comportements speciaux (postbacks, iframes, chargements dynamiques)
5. Documenter le `flow` complet (ordre des etapes, popups, pages intermediaires)
6. Tester le mapping avec le script RPA en mode debug (`headful: true`)
7. Mettre a jour le tableau ci-dessus

## Pieges courants

- **ASP.NET postbacks** : les radios et certains selects declenchent des postbacks. Toujours utiliser `.click()` et attendre `networkidle` apres
- **Iframes** : certains portails ouvrent des popups dans des iframes. Utiliser `page.frameLocator()` pour y acceder
- **Valeurs dynamiques** : les options de certains dropdowns se chargent apres un postback precedent (ex: modele apres marque). Attendre le chargement avant de remplir
- **Sessions** : les portails Portima ont des sessions courtes. Prevoir une re-authentification automatique si la session expire en cours de tarification
