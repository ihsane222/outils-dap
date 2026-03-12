# Voice Bot DAP — Prototype Demo

Voice bot téléphonique pour DAP (courtier en assurances), actif hors horaires d'ouverture.
Bilingue français / néerlandais.

## Stack

| Composant | Outil |
|-----------|-------|
| Téléphonie + STT | Twilio Voice |
| Orchestration | n8n (instance existante) |
| LLM | Claude API (Haiku 4.5) |
| TTS | ElevenLabs (eleven_multilingual_v2) |
| RDV | Outlook Calendar (Microsoft Graph) |
| Logs | Google Sheets |
| Notifications | Microsoft Outlook (email) |

## Architecture

```
Appel → Twilio → n8n Webhook → Claude API → ElevenLabs TTS → Twilio <Play>
                                    ↓
                         Actions : Email / Outlook RDV / Log Sheets
```

## Workflow n8n

**ID** : `OH4d5LQTjl5H3lfA`
**Nom** : "Voice Bot DAP — Accueil Hors Horaires"
**Statut** : Inactif (à activer après configuration)

### Nodes (13)

1. **Twilio Webhook** — reçoit les POST Twilio (path: `/webhook/voicebot-dap`)
2. **Parse Twilio Data** — extrait CallSid, numéro, transcription STT
3. **Premier appel ?** — switch : accueil vs conversation
4. **TwiML Accueil** — message bilingue FR/NL + `<Gather>`
5. **Claude API** — envoie la transcription, reçoit JSON structuré
6. **Parse Claude Response** — parse le JSON Claude + fusion données Twilio
7. **ElevenLabs TTS** — convertit texte → audio MP3 (voix FR ou NL)
8. **Route Action** — switch selon action Claude (faq/message/rdv/cloture)
9. **Email Message DAP** — envoie email récap via Outlook
10. **Outlook RDV Rappel** — crée événement calendar
11. **TwiML Réponse** — retourne audio + `<Gather>` pour continuer
12. **TwiML Clôture** — retourne audio + `<Hangup/>`
13. **Log Google Sheets** — log chaque interaction

## Setup — Étapes

### 1. Twilio
1. Créer un compte sur [twilio.com](https://www.twilio.com) (15$ crédits gratuits)
2. Acheter un numéro belge (+32)
3. Dans Phone Numbers → Configurer le numéro :
   - **A CALL COMES IN** → Webhook → `https://n8n.srv1387885.hstgr.cloud/webhook/voicebot-dap`
   - Méthode : POST

### 2. n8n — Variables d'environnement
Configurer dans n8n Settings → Variables :
- `ANTHROPIC_API_KEY` — clé API Anthropic
- `ELEVENLABS_API_KEY` — clé API ElevenLabs

### 3. n8n — Credentials à configurer
- **Microsoft Outlook OAuth2** — pour les nodes Email et Calendar
- **Google Sheets OAuth2** — pour le node de logs

### 4. ElevenLabs — Voix
1. Créer un compte sur [elevenlabs.io](https://elevenlabs.io)
2. Choisir 2 voix dans la bibliothèque (1 FR, 1 NL)
3. Copier les Voice IDs
4. Dans le node "ElevenLabs TTS", remplacer `VOIX_FR_ID` et `VOIX_NL_ID`

### 5. Google Sheets
1. Créer un Google Sheet avec une feuille "Logs"
2. Colonnes : Date, CallSid, Appelant, Nom, Langue, Action, Resume, Motif, Urgence
3. Dans le node "Log Google Sheets", remplacer `REMPLACER_PAR_URL_GOOGLE_SHEET`

### 6. Outlook Email
- L'adresse email est configurée sur `ihsanefettache2@gmail.com` dans le node "Email Message DAP"

### 7. Activer le workflow
Une fois tout configuré, activer le workflow dans n8n.

## Test

1. Appeler le numéro Twilio depuis un téléphone
2. Vérifier l'accueil bilingue
3. Parler en français → vérifier la réponse du bot
4. Demander un RDV → vérifier l'événement Outlook
5. Laisser un message → vérifier l'email reçu
6. Vérifier les logs dans Google Sheets

## Fichiers du projet

| Fichier | Description |
|---------|-------------|
| `prompt-systeme.md` | Prompt système bilingue complet pour Claude |
| `faq-dap.md` | Base de connaissances FAQ (à intégrer dans le prompt) |
| `twiml-accueil.xml` | TwiML de référence pour l'accueil |
| `README.md` | Ce fichier |

## Coût estimé

~5€/mois pour le prototype (hors volume d'appels réels)
