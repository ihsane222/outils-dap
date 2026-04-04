# Olympe Human-in-the-Loop

Sous-workflow n8n réutilisable pour la validation humaine. Utilisé par les 6 agents supervisés.

## Flow

```
Agent prépare action
     │
     ▼
Teams Adaptive Card [Valider / Modifier / Refuser]
     │
     ▼
n8n Wait Node (état persisté)
     │
     ▼ webhook callback (bouton Teams)
     │
     ├── Valider → exécuter l'action
     ├── Modifier → re-process avec modifications
     └── Refuser → archiver + log
     │
Timeout 24h → escalade manager (notification Teams)
```

## Intégration

Appeler en sous-workflow. Input : le message du data contract standard + le draft de l'action à valider.
