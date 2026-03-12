# Guide de déploiement — DAP Telavox Suivi

## Ce qu'on va faire
1. Créer le Google Sheet (base de données)
2. Déployer le Apps Script (serveur)
3. Configurer les webhooks Telavox (par courtier)
4. Brancher l'outil HTML sur le script

Durée totale : ~1 heure

---

## ÉTAPE 1 — Créer le Google Sheet

1. Aller sur [sheets.google.com](https://sheets.google.com)
2. Créer un nouveau fichier → le nommer **"DAP Telavox — Suivi des appels"**
3. **Copier l'ID du Sheet** depuis l'URL :
   ```
   https://docs.google.com/spreadsheets/d/CECI_EST_L_ID/edit
   ```
4. L'onglet par défaut s'appelle "Feuille 1" — on le renommera via le script

---

## ÉTAPE 2 — Créer et déployer le Apps Script

1. Depuis le Sheet : **Extensions → Apps Script**
2. Supprimer le code par défaut
3. **Coller tout le contenu de `dap-telavox-script.gs`**
4. Remplacer `REMPLACER_PAR_ID_DU_SHEET` par l'ID copié à l'étape 1
5. Changer le `SECRET` si souhaité (garder une trace quelque part)
6. Remplir les **numéros de postes Telavox** dans `COURTIERS` :
   ```javascript
   const COURTIERS = {
     '101': 'Julie Maes',      // ← remplacer par les vrais postes DAP
     '102': 'Maxime Dubois',
     ...
   };
   ```

### Initialiser le Sheet
7. Dans Apps Script, sélectionner la fonction `initSheet` dans le menu déroulant
8. Cliquer **Exécuter** → autoriser les permissions Google
9. Vérifier dans le Sheet que les onglets `calls` et `suivis` ont été créés

### Déployer le script
10. Cliquer **Déployer → Nouveau déploiement**
11. Type : **Application Web**
12. Exécuter en tant que : **Moi**
13. Qui a accès : **Tout le monde**
14. Cliquer **Déployer** → copier **l'URL de déploiement**
    ```
    https://script.google.com/macros/s/XXXXX.../exec
    ```

---

## ÉTAPE 3 — Brancher l'outil HTML

Dans le fichier `dap-telavox-suivi.html`, ligne ~738 :

```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/SCRIPT_ID/exec';
```

Remplacer `SCRIPT_ID` par l'ID de l'URL de déploiement (la partie entre `/s/` et `/exec`).

---

## ÉTAPE 4 — Configurer les webhooks Telavox

À faire pour chaque courtier (5 min/personne) :

1. Se connecter à Telavox (interface web ou desktop)
2. **Paramètres → Mon compte → Webhooks personnels**
3. Ajouter un nouveau webhook avec cette URL (remplacer SCRIPT_ID et SECRET) :

```
https://script.google.com/macros/s/SCRIPT_ID/exec?secret=dap_telavox_2024&event={event}&caller={system.caller}&extension={system.extension}&callid={system.callid}
```

4. Activer les 3 événements : **Ringing**, **Answer**, **Hangup**
5. Sauvegarder

→ Répéter pour chaque poste de l'équipe DAP

---

## ÉTAPE 5 — Tester

1. Faire appeler un numéro de test sur un poste configuré → ne pas décrocher → raccrocher
2. Vérifier dans le Sheet onglet `calls` qu'une ligne apparaît avec `event = missed`
3. Ouvrir l'outil → cliquer **● DÉMO** pour passer en **● LIVE**
4. L'appel manqué doit apparaître dans "Sans prise en charge"
5. Cliquer "👤 Je prends" → vérifier le Sheet onglet `suivis`
6. Clôturer → vérifier que `cloture = true` dans le Sheet

---

## En cas de problème

| Symptôme | Cause probable | Solution |
|---|---|---|
| Mode live → erreur immédiate | SCRIPT_ID incorrect dans le HTML | Vérifier l'URL de déploiement |
| Webhook configuré mais rien dans le Sheet | SECRET incorrect dans l'URL webhook | Vérifier que le secret correspond |
| Pas de numéros de courtier dans les données | Extension non mappée dans COURTIERS | Ajouter le numéro de poste dans le script |
| "Unauthorized" dans le Sheet | Secret manquant ou erroné | Vérifier l'URL webhook Telavox |

---

## Notes importantes

- Le webhook Telavox utilise les variables `{system.caller}`, `{system.extension}`, `{system.callid}` — à vérifier que Telavox les supporte bien (à tester sur un poste avant de déployer partout)
- Si Telavox n'envoie pas `{system.callid}`, le script génère un UUID automatiquement — ça fonctionne mais la détection ringing/hangup devient moins précise
- Le Apps Script a un quota de 20 000 appels/jour en version gratuite — largement suffisant pour une équipe DAP
