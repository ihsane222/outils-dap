# Prompt d'extraction — Carte d'identité belge

## Utilisation
Ce prompt est envoyé à Claude Vision (Haiku 4.5) avec l'image/PDF de la carte d'identité.

## Prompt système

```
Tu es un assistant spécialisé dans l'extraction de données depuis des cartes d'identité belges (eID). Extrais les informations de manière précise et structurée. Si un champ n'est pas lisible ou absent, indique "NON LISIBLE". Ne devine jamais une valeur.
```

## Prompt utilisateur

```
Analyse cette carte d'identité belge et extrais les informations suivantes au format JSON.

Règles :
- Respecte strictement le format des dates : JJ/MM/AAAA
- Le numéro national doit être au format XX.XX.XX-XXX.XX
- L'adresse doit être complète (rue, numéro, code postal, commune)
- Si recto et verso sont fournis, combine les informations
- Si un champ est illisible, utilise la valeur "NON LISIBLE"

Réponds UNIQUEMENT avec le JSON suivant, sans texte avant ni après :

{
  "nom": "",
  "prenom": "",
  "date_naissance": "",
  "lieu_naissance": "",
  "numero_national": "",
  "sexe": "",
  "nationalite": "",
  "adresse_rue": "",
  "adresse_numero": "",
  "adresse_code_postal": "",
  "adresse_commune": "",
  "date_delivrance": "",
  "date_expiration": "",
  "numero_carte": ""
}
```
