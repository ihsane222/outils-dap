# Olympe Brio Sync

Workflow n8n qui reçoit les exports Excel automatiques de Brio ("Sélection et Rapport") et les stocke dans une table n8n `olympe_brio_cache`.

## Architecture

```
Brio "Sélection et Rapport" (config auto)
     │
     ▼ email automatique avec Excel attaché
n8n Email Trigger
     │
     ▼ parse Excel (xlsx)
Table n8n `olympe_brio_cache`
     │
     ▼ lecture par les agents (6/10 agents lisent Brio)
```

## Config Brio
Configurer dans Brio : Sélection et Rapport → envoi automatique par email à l'adresse captée par n8n Email Trigger. Fréquence : 1x/jour à 6h.

## Pas de RPA pour la lecture
Le RPA n'est utilisé que pour l'ÉCRITURE dans Brio (Eros uniquement). La lecture passe par ces exports Excel.
