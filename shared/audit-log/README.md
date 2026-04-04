# Olympe Audit Log

Sous-workflow n8n réutilisable. Chaque agent l'appelle pour logger ses actions.

## Table `olympe_audit_log`

| Colonne | Type | Description |
|---------|------|-------------|
| timestamp | datetime | Heure de l'action |
| agent_name | string | Nom de l'agent (eros, plutus, etc.) |
| action_type | string | Type d'action (email_sent, fiche_created, tarif_generated, etc.) |
| input_hash | string | SHA-256 du input (données personnelles hashées) |
| output_hash | string | SHA-256 du output |
| decision | string | Décision prise (approved, rejected, auto, error) |
| user_validated | boolean | true si un humain a validé |
| execution_time_ms | integer | Durée d'exécution |

## Rétention
5 ans minimum (exigence FSMA pour les intermédiaires d'assurance).

## Intégration
Appeler en sous-workflow avec le payload du data contract standard.
