# Fiche Microsoft Forms — Assurance Habitation / Incendie DAP
> Prêt à copier dans [forms.microsoft.com](https://forms.microsoft.com)
> Durée de remplissage estimée : 10–15 min
> Dernière mise à jour : février 2026

---

## Instructions d'import dans Microsoft Forms

1. Aller sur **forms.microsoft.com** → « Nouveau formulaire »
2. Titre : **Demande d'offre — Assurance Habitation / Incendie**
3. Description : *Merci de compléter ce formulaire pour votre demande d'assurance habitation. Toutes les informations transmises sont traitées de façon confidentielle par DAP.*
4. Créer chaque question dans l'ordre indiqué ci-dessous
5. Pour les **sections conditionnelles** : utiliser l'option « Ajouter une branche » dans MS Forms
6. Activer « Obligatoire » (toggle) pour chaque question marquée ✅

---

## Section 1 — Identité du preneur

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 1 | Nom | Texte court | — | ✅ |
| 2 | Prénom | Texte court | — | ✅ |
| 3 | Date de naissance | Date | — | ✅ |
| 4 | Adresse personnelle (rue, numéro, code postal, commune) | Texte long | Si différente de l'adresse du bien à assurer | ✅ |
| 5 | Téléphone | Texte court | Format : 04XX XX XX XX ou 0X XX XX XX XX | ✅ |
| 6 | Email | Texte court | — | ✅ |

---

## Section 2 — Qualité du preneur par rapport au bien

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 7 | Votre qualité par rapport au bien à assurer | Choix (radio) | Propriétaire occupant · Locataire · Propriétaire non-occupant · Co-locataire · Usufruitier · Nu-propriétaire | ✅ |

> **Branchement conditionnel** : Si **Locataire** ou **Co-locataire** → afficher la question 8

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 8 | Loyer mensuel hors charges (€) | Nombre | — | ✅ |

---

## Section 3 — Adresse du bien à assurer

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 9 | L'adresse du bien à assurer est-elle différente de votre adresse personnelle ? | Choix (radio) | Oui · Non | ✅ |

> **Branchement conditionnel** : Si **Oui** → afficher la question 10

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 10 | Adresse complète du bien à assurer | Texte long | Rue, numéro, code postal, commune | ✅ |

---

## Section 4 — Description du bien

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 11 | Type de bien | Choix (radio) | Appartement · Maison unifamiliale · Villa · Kot/Studio · Autre | ✅ |
| 12 | Superficie habitable totale (m²) | Nombre | — | ✅ |
| 13 | Année de construction | Nombre | Format : AAAA | ✅ |
| 14 | Type de chauffage principal | Choix (radio) | Mazout · Gaz naturel · Pompe à chaleur · Électrique · Pellets/Bois · Autre | ✅ |
| 15 | La façade est-elle classée (patrimoine) ? | Choix (radio) | Oui · Non | ✅ |
| 16 | Hauteur sous plafond supérieure à 3 m ? | Choix (radio) | Oui · Non | ✅ |
| 17 | Type de toiture | Choix (radio) | Ardoises naturelles · Ardoises artificielles · Tuiles · Toiture plate · Chaume · Autre | ✅ |
| 18 | Matériaux nobles présents (marbre, parquet massif, plafonds sculptés...) | Choix (radio) | Oui · Non | ✅ |

---

## Section 5 — Composition du bien (nombre de pièces)

*Indiquer le nombre de pièces par type (mettre 0 si inexistant)*

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 19 | Cuisine(s) | Nombre | Min : 0 | ✅ |
| 20 | Living(s) / Salon(s) | Nombre | Min : 0 | ✅ |
| 21 | Chambre(s) | Nombre | Min : 0 | ✅ |
| 22 | Salle(s) de bain | Nombre | Min : 0 | ✅ |
| 23 | Salle(s) de bien-être (sauna, hammam...) | Nombre | Min : 0 | ❌ |
| 24 | Salle(s) de jeux | Nombre | Min : 0 | ❌ |
| 25 | Bureau(x) | Nombre | Min : 0 | ❌ |
| 26 | Dressing(s) | Nombre | Min : 0 | ❌ |
| 27 | Bibliothèque(s) | Nombre | Min : 0 | ❌ |
| 28 | Cave(s) | Nombre | Min : 0 | ❌ |
| 29 | Grenier(s) | Nombre | Min : 0 | ❌ |

---

## Section 6 — Spécificités appartement

> **Branchement conditionnel** : Afficher si le bien est de type **Appartement** ou **Kot/Studio** (Q11)

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 30 | Étage de l'appartement | Nombre | 0 = rez-de-chaussée | ✅ |
| 31 | Nombre total d'étages de l'immeuble | Nombre | — | ✅ |
| 32 | L'appartement est-il utilisé pour de l'hébergement touristique (Airbnb...) ? | Choix (radio) | Oui · Non | ✅ |
| 33 | Exercice d'une activité professionnelle dans le bien ? | Choix (radio) | Oui · Non | ✅ |

---

## Section 7 — Dépendances et équipements

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 34 | Cave aménagée ? | Choix (radio) | Oui · Non · Pas de cave | ❌ |
| 35 | Grenier aménagé ? | Choix (radio) | Oui · Non · Pas de grenier | ❌ |
| 36 | Équipements présents sur le bien | Cases à cocher | Chaufferie · Buanderie · Balcon · Terrasse · Jardin · Piscine · Panneaux solaires (photovoltaïques) · Éolienne · Feu ouvert / Cheminée · Toiture terrasse · Ossature bois | ❌ |
| 37 | Superficie de la piscine (m²) | Nombre | — | ❌ |

> *(Q37 visible uniquement si « Piscine » cochée en Q36)*

---

## Section 8 — État du bâtiment

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 38 | État général du bâtiment | Choix (radio) | Standard · Rénové il y a moins de 10 ans · En cours de construction · En rénovation lourde · Éco-construction · Bâtiment passif | ✅ |
| 39 | Des travaux importants (> 25 000 €) sont-ils prévus dans les 12 prochains mois ? | Choix (radio) | Oui · Non | ✅ |

---

## Section 9 — Antécédents sinistres

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 40 | Nombre de sinistres habitation déclarés au cours des 5 dernières années | Nombre | Min : 0 | ✅ |

> **Branchement conditionnel** : Si ≥ 1 → afficher les questions 41 à 43

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 41 | Nature du ou des sinistres | Cases à cocher | Incendie · Dégât des eaux · Tempête · Vol/Vandalisme · Bris de vitre · Autre | ✅ |
| 42 | Montant(s) total(aux) réglé(s) (€) | Texte long | Un montant par sinistre | ✅ |
| 43 | Le bien a-t-il subi un refoulement d'égout, inondation ou fissures structurelles dans les 10 dernières années ? | Choix (radio) | Oui · Non | ✅ |

---

## Section 10 — Assurance actuelle

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 44 | Êtes-vous actuellement assuré(e) pour ce bien ? | Choix (radio) | Oui · Non | ✅ |

> **Branchement conditionnel** : Si **Oui** → afficher les questions 45 à 50

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 45 | Nom de la compagnie actuelle | Texte court | — | ✅ |
| 46 | Numéro de contrat | Texte court | — | ❌ |
| 47 | Prime annuelle actuelle (€) | Nombre | — | ❌ |
| 48 | Date d'échéance du contrat actuel | Date | — | ✅ |
| 49 | Y a-t-il une créance hypothécaire (prêt immobilier) sur ce bien ? | Choix (radio) | Oui · Non | ✅ |
| 50 | Si oui : nom de la banque créancière | Texte court | — | ❌ |

---

## Section 11 — Couvertures souhaitées

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 51 | Couvertures souhaitées | Cases à cocher | Incendie & périls connexes (obligatoire) · Dégât des eaux · Tempête/Grêle/Neige · Vol & Vandalisme · Bris de vitre · RC Vie privée · Protection juridique | ✅ |
| 52 | Souhaitez-vous couvrir le contenu (mobilier, effets personnels) ? | Choix (radio) | Oui · Non | ✅ |
| 53 | Valeur estimée du contenu (€) | Nombre | — | ❌ |

> *(Q53 visible si Q52 = Oui)*

---

## Section 12 — Paiement

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 54 | Fréquence de paiement souhaitée | Choix (radio) | Annuel · Semestriel · Trimestriel · Mensuel | ✅ |
| 55 | IBAN pour domiciliation | Texte court | Format : BE XX XXXX XXXX XXXX | ❌ |

---

## Section 13 — DAP Solidarity

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 56 | DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ? | Choix (radio) | Médecins Sans Frontières · Croix-Rouge de Belgique · WWF Belgique · Unicef Belgique · Greenpeace Belgique · Oxfam Belgique · Au choix du courtier | ✅ |

---

## Section 14 — Remarques

| # | Question | Type MS Forms | Options / Précisions | Obligatoire |
|---|----------|---------------|----------------------|-------------|
| 57 | Remarques ou informations complémentaires | Texte long | — | ❌ |

---

## Récapitulatif technique

| Indicateur | Valeur |
|---|---|
| Nombre total de questions | 57 |
| Questions obligatoires | 38 |
| Sections conditionnelles | 6 (locataire → loyer / adresse différente / appartement / piscine → superficie / sinistres / assurance actuelle) |
| Types MS Forms utilisés | Texte court, Texte long, Date, Nombre, Choix (radio), Cases à cocher |
