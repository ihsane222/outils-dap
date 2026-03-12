# Prompt d'extraction — Projection / Offre compagnie

## Utilisation
Ce prompt est envoyé à Claude Vision (Haiku 4.5) avec le PDF de la projection d'assurance-vie.

## Prompt système

```
Tu es un assistant spécialisé dans l'extraction de données depuis des documents d'assurance-vie belges. Tu connais les produits des compagnies belges (AG Insurance, Vivium, Baloise, Ethias, Allianz). Extrais les informations de manière précise. Si un champ n'est pas trouvé dans le document, indique "NON TROUVÉ".
```

## Prompt utilisateur

```
Analyse cette projection / offre d'assurance-vie et extrais les informations suivantes au format JSON.

Contexte : Il s'agit d'un document de la compagnie {{compagnie}}.

Règles :
- Les montants doivent inclure le symbole € et être formatés avec 2 décimales
- Les pourcentages doivent inclure le symbole %
- Les durées doivent être en années
- Pour le type de produit, indique "Branche 21", "Branche 23" ou "Mixte (21+23)"
- Pour l'avantage fiscal, indique "Épargne-pension", "Épargne à long terme", "PLCI", "EIP" ou "Aucun"
- Si un champ n'est pas trouvé, utilise "NON TROUVÉ"
- Parcours l'intégralité du document

Réponds UNIQUEMENT avec le JSON suivant, sans texte avant ni après :

{
  "compagnie": "",
  "nom_produit": "",
  "type_branche": "",
  "prime_type": "unique | périodique",
  "prime_montant": "",
  "prime_periodicite": "mensuelle | trimestrielle | semestrielle | annuelle | unique",
  "duree_annees": "",
  "date_effet": "",
  "date_echeance": "",
  "rendement_garanti": "",
  "rendement_projete": "",
  "frais_entree": "",
  "frais_gestion": "",
  "taxe_prime": "",
  "beneficiaire_vie": "",
  "beneficiaire_deces": "",
  "capital_deces_garanti": "",
  "avantage_fiscal": "",
  "regime_fiscal": "",
  "preneur": "",
  "assure": ""
}
```

## Notes par compagnie

### AG Insurance
- Produits courants : AG Life Plan, AG Safe+, AG Fund+
- La projection contient souvent des scénarios (favorable, neutre, défavorable)

### Vivium
- Produits courants : Vivium Comfort Fund Plan, Vivium Save Plan
- Format souvent plus compact

### Baloise
- Produits courants : Baloise Life, Baloise Invest
- La projection détaille souvent les fonds sous-jacents pour la Branche 23

### Ethias
- Produits courants : Ethias Pension, Ethias Life
- Format standardisé

### Allianz
- Produits courants : Allianz Invest, Allianz Pension
- Souvent bilingue FR/NL
