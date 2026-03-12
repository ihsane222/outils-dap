# Fiche Microsoft Forms — Assurance Auto DAP
> Prêt à copier dans [forms.microsoft.com](https://forms.microsoft.com)
> Durée de remplissage estimée : 8–12 min
> Dernière mise à jour : février 2026

---

## Instructions d'import dans Microsoft Forms

1. Aller sur **forms.microsoft.com** → « Nouveau formulaire »
2. Titre : **Demande d'offre — Assurance Auto**
3. Description : *Merci de compléter ce formulaire afin que DAP puisse vous établir une offre personnalisée. Toutes les informations transmises sont traitées de façon confidentielle.*
4. Créer chaque question dans l'ordre indiqué ci-dessous
5. Pour les **sections conditionnelles** : utiliser l'option « Ajouter une branche » dans MS Forms
6. Activer « Obligatoire » (toggle) pour chaque question marquée ✅

---

## Section 1 — Preneur d'assurance

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 1 | Nom | Texte court | — | ✅ |
| 2 | Prénom | Texte court | — | ✅ |
| 3 | Date de naissance | Date | — | ✅ |
| 4 | Adresse complète (rue, numéro, code postal, commune) | Texte long | — | ✅ |
| 5 | Téléphone | Texte court | Format : 04XX XX XX XX ou 0X XX XX XX XX | ✅ |
| 6 | Email | Texte court | — | ✅ |
| 7 | Profession / Statut | Choix (radio) | Salarié · Indépendant · Fonctionnaire · Étudiant · Sans emploi · Pensionné · Autre | ✅ |
| 8 | Si indépendant ou société : numéro BCE | Texte court | Format : BE 0XXX.XXX.XXX | ❌ |

---

## Section 2 — Conducteur habituel

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 9 | Le conducteur habituel est-il le preneur ? | Choix (radio) | Oui · Non | ✅ |

> **Branchement conditionnel** : Si **Non** → afficher les questions 10 à 17

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 10 | Nom du conducteur habituel | Texte court | — | ✅ |
| 11 | Prénom du conducteur habituel | Texte court | — | ✅ |
| 12 | Date de naissance du conducteur habituel | Date | — | ✅ |
| 13 | Lien avec le preneur | Choix (radio) | Conjoint/Cohabitant · Enfant · Parent · Autre | ✅ |
| 14 | Date d'obtention du permis de conduire | Date | — | ✅ |
| 15 | Nombre de sinistres responsables au cours des 5 dernières années | Nombre | Min : 0 | ✅ |
| 16 | Déchéance du droit à conduire dans les 3 dernières années ? | Choix (radio) | Oui · Non | ✅ |
| 17 | Si oui : motif et date de la déchéance | Texte long | — | ❌ |

---

## Section 3 — Conducteur occasionnel

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 18 | Y a-t-il un conducteur occasionnel ? | Choix (radio) | Oui · Non | ✅ |

> **Branchement conditionnel** : Si **Oui** → afficher les questions 19 à 26

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 19 | Nom du conducteur occasionnel | Texte court | — | ✅ |
| 20 | Prénom du conducteur occasionnel | Texte court | — | ✅ |
| 21 | Date de naissance | Date | — | ✅ |
| 22 | Lien avec le preneur | Choix (radio) | Conjoint/Cohabitant · Enfant · Parent · Autre | ✅ |
| 23 | Date d'obtention du permis de conduire | Date | — | ✅ |
| 24 | Nombre de sinistres responsables au cours des 5 dernières années | Nombre | Min : 0 | ✅ |
| 25 | Déchéance du droit à conduire dans les 3 dernières années ? | Choix (radio) | Oui · Non | ✅ |
| 26 | Si oui : motif et date de la déchéance | Texte long | — | ❌ |

---

## Section 4 — Données du véhicule

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 27 | Marque du véhicule | Texte court | Ex. : Volkswagen, Renault, BMW... | ✅ |
| 28 | Modèle | Texte court | Ex. : Golf, Clio, Série 3... | ✅ |
| 29 | Carburant | Choix (radio) | Essence · Diesel · Hybride · Hybride rechargeable · Électrique · GPL · Autre | ✅ |
| 30 | Puissance fiscale (kW) | Nombre | — | ✅ |
| 31 | Date de première mise en circulation | Date | — | ✅ |
| 32 | Valeur catalogue HTVA (€) | Nombre | Valeur neuve hors options | ✅ |
| 33 | Usage du véhicule | Choix (radio) | Privé uniquement · Privé + trajets domicile-travail · Professionnel occasionnel · Professionnel intensif | ✅ |
| 34 | Kilométrage annuel estimé | Choix (radio) | Moins de 10 000 km · 10 000–20 000 km · 20 000–30 000 km · Plus de 30 000 km | ✅ |
| 35 | Kilométrage limité contractuellement souhaité ? | Choix (radio) | Oui · Non | ❌ |
| 36 | Options / équipements spéciaux à déclarer | Texte long | Ex. : GPS intégré, jantes alu, toit ouvrant... | ❌ |

---

## Section 5 — Antécédents sinistres

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 37 | Nombre de sinistres déclarés au cours des 5 dernières années | Nombre | Min : 0 | ✅ |

> **Branchement conditionnel** : Si ≥ 1 → afficher les questions 38 à 41

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 38 | Date(s) du ou des sinistres | Texte long | Une date par ligne si plusieurs sinistres | ✅ |
| 39 | Montant(s) total(aux) réglé(s) par l'assureur (€) | Texte long | Un montant par sinistre | ✅ |
| 40 | Votre responsabilité était-elle engagée ? | Choix (radio) | Entièrement responsable · Partiellement responsable · Non responsable | ✅ |
| 41 | Description succincte des sinistres | Texte long | — | ❌ |

---

## Section 6 — Assurance actuelle

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 42 | Êtes-vous actuellement assuré(e) pour ce véhicule ? | Choix (radio) | Oui · Non | ✅ |

> **Branchement conditionnel** : Si **Oui** → afficher les questions 43 à 47

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 43 | Nom de la compagnie actuelle | Texte court | — | ✅ |
| 44 | Numéro de contrat | Texte court | — | ❌ |
| 45 | Prime annuelle actuelle (€) | Nombre | — | ❌ |
| 46 | Date d'échéance du contrat actuel | Date | — | ✅ |
| 47 | Motif du changement d'assureur | Choix (radio) | Prix · Couverture insuffisante · Service · Résiliation par l'assureur · Autre | ❌ |

---

## Section 7 — Couvertures souhaitées

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 48 | Formule souhaitée | Choix (radio) | RC (obligatoire) uniquement · RC + Mini omnium · RC + Omnium complète | ✅ |
| 49 | Options supplémentaires souhaitées | Cases à cocher | Assistance · Protection juridique · Conducteur · Objets dans le véhicule | ❌ |

---

## Section 8 — Paiement

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 50 | Fréquence de paiement souhaitée | Choix (radio) | Annuel · Semestriel · Mensuel | ✅ |
| 51 | IBAN pour domiciliation | Texte court | Format : BE XX XXXX XXXX XXXX | ❌ |

---

## Section 9 — DAP Solidarity

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 52 | DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ? | Choix (radio) | Médecins Sans Frontières · Croix-Rouge de Belgique · WWF Belgique · Unicef Belgique · Greenpeace Belgique · Oxfam Belgique · Au choix du courtier | ✅ |

---

## Section 10 — Remarques

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 53 | Remarques ou informations complémentaires | Texte long | — | ❌ |

---

## Récapitulatif technique

| Indicateur | Valeur |
|---|---|
| Nombre total de questions | 53 |
| Questions obligatoires | 35 |
| Sections conditionnelles | 4 (conducteur habituel ≠ preneur / conducteur occasionnel / sinistres / assurance actuelle) |
| Types MS Forms utilisés | Texte court, Texte long, Date, Nombre, Choix (radio), Cases à cocher |
