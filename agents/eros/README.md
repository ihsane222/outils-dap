# Eros — Souscription

Agent de nouvelle affaire (bout en bout). Lead entrant → extraction formulaire → tarification multi-compagnies (AG, AXA, Ethias) via RPA → comparaison + scoring → notification gestionnaire → création fiche Brio.

- **Trigger:** Webhook formulaire demande / lead entrant
- **LLM:** Claude Sonnet (extraction Vision) + Haiku (scoring)
- **Systèmes:** Portails AG/AXA/Ethias (RPA Playwright), Brio (RPA écriture), Outlook
- **Supervision:** Supervisé (validation gestionnaire avant création Brio)
- **Priorité:** P1
