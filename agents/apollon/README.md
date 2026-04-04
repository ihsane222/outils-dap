# Apollon — Chatbot DAP

Chatbot bilingue FR/NL, double interface : site web (clients) + Teams (employés).

## Public (site web)
- Questions sur les contrats et produits d'assurance
- Demande de devis (redirige vers Eros)
- Déclaration de sinistre (redirige vers Midas)
- Horaires, adresses des bureaux DAP
- FAQ assurance générale

## Interne (Teams)
- Questions sur les procédures internes DAP
- Infos compagnies partenaires (contacts, numéros sinistres, portails)
- Aide sur les outils (Brio, Telavox, Outlook)
- Redirection vers l'agent spécialisé si la question dépasse son scope

## Specs
- **Trigger:** Webhook (widget site web) + Teams message
- **LLM:** Claude Haiku 4.5
- **Systèmes:** Base de connaissances (FAQ, procédures, contacts), cache Brio (via `olympe_brio_cache`)
- **Supervision:** Autonome (répond directement, pas de validation humaine)
- **Priorité:** P1
- **Reproductibilité:** Configurable par courtier (FAQ, contacts, branding). Pas de contenu spécifique à reconstruire.
