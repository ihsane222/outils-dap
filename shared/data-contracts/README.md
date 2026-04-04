# Olympe Data Contracts

Schema JSON standard pour la communication entre agents et le logging.

## Message inter-agents

Tout message passé entre agents (via sous-workflow n8n) suit ce format :

```json
{
  "from_agent": "eros",
  "to_agent": "hermes",
  "action": "send_email_draft",
  "client_id": "BRI-12345",
  "payload": { },
  "priority": "normal",
  "requires_approval": true,
  "timestamp": "2026-04-04T15:30:00Z"
}
```

## Champs

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| from_agent | string | oui | Agent émetteur (eros, plutus, raphael, etc.) |
| to_agent | string | oui | Agent destinataire |
| action | string | oui | Action demandée (send_email_draft, create_fiche, generate_report, etc.) |
| client_id | string | non | Identifiant client Brio (si applicable) |
| payload | object | oui | Données spécifiques à l'action |
| priority | string | oui | normal, high, urgent |
| requires_approval | boolean | oui | true si human-in-loop nécessaire |
| timestamp | string | oui | ISO 8601 |

## Exemples

### Eros → Hermès (envoyer offre au client)
```json
{
  "from_agent": "eros",
  "to_agent": "hermes",
  "action": "send_email_draft",
  "client_id": "BRI-12345",
  "payload": {
    "to": "client@example.com",
    "subject": "Votre offre d'assurance auto",
    "body_draft": "...",
    "attachments": ["offre-ag.pdf", "offre-axa.pdf"]
  },
  "priority": "high",
  "requires_approval": true,
  "timestamp": "2026-04-04T15:30:00Z"
}
```

### Midas → Thémis (vérification conformité sinistre)
```json
{
  "from_agent": "midas",
  "to_agent": "themis",
  "action": "check_compliance",
  "client_id": "BRI-67890",
  "payload": {
    "claim_type": "auto",
    "claim_amount": 15000,
    "documents": ["declaration.pdf", "constat.pdf"]
  },
  "priority": "normal",
  "requires_approval": false,
  "timestamp": "2026-04-04T16:00:00Z"
}
```

### Janus → Hermès (campagne cross-sell)
```json
{
  "from_agent": "janus",
  "to_agent": "hermes",
  "action": "send_campaign_batch",
  "payload": {
    "campaign_name": "cross-sell-habitation-q2",
    "recipients": ["BRI-111", "BRI-222", "BRI-333"],
    "email_template": "cross-sell-habitation",
    "personalization_fields": ["prenom", "type_contrat_actuel"]
  },
  "priority": "normal",
  "requires_approval": true,
  "timestamp": "2026-04-07T09:00:00Z"
}
```

## Validation
Le schema JSON est dans `agent-message.schema.json`. Valider avec ajv ou dans n8n via un IF node.
