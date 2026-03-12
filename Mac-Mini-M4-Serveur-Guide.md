# Mac Mini M4 comme Serveur Local — Guide Complet

*Recherche effectuee le 10 mars 2026*

---

## 1. Mac Mini M4 (2024-2025) — Modeles, Specs et Prix

### Modeles disponibles

| Config | Puce | CPU | GPU | RAM | Stockage | Prix FR (Apple Store) |
|--------|------|-----|-----|-----|----------|-----------------------|
| Base M4 | M4 | 10 coeurs (4P+6E) | 10 coeurs | 16 Go | 256 Go | ~649 EUR |
| M4 milieu | M4 | 10 coeurs | 10 coeurs | 16 Go | 512 Go | ~879 EUR |
| M4 haut | M4 | 10 coeurs | 10 coeurs | 24 Go | 512 Go | ~1 049 EUR |
| M4 Pro base | M4 Pro | 12 coeurs (8P+4E) | 16 coeurs | 24 Go | 512 Go | ~1 649 EUR |
| M4 Pro haut | M4 Pro | 14 coeurs (10P+4E) | 20 coeurs | 24 Go | 1 To | ~1 899 EUR |
| M4 Pro max | M4 Pro | 14 coeurs | 20 coeurs | 48 Go | 1 To | ~2 199 EUR |

> **Recommandation serveur IA** : M4 Pro 24 Go minimum. Pour du LLM serieux (30B+), prendre 48 Go.

### Connectique

**Avant :** 2x USB-C (USB 3, 10 Gb/s) + prise jack 3,5 mm
**Arriere :**
- M4 : 3x Thunderbolt 4 (40 Gb/s) + HDMI 2.1 + Gigabit Ethernet
- M4 Pro : 3x Thunderbolt 5 (120 Gb/s) + HDMI 2.1 + Gigabit Ethernet

Option 10 Gigabit Ethernet disponible en upgrade (+120 EUR).

Wi-Fi 6E (802.11ax), Bluetooth 5.3.

### Dimensions
12,7 cm x 12,7 cm x 5 cm — tres compact pour un serveur.

### macOS Server — Statut

**macOS Server est discontinue depuis avril 2022.** Apple a integre certaines fonctions directement dans macOS (cache de contenu, partage de fichiers). Pour les services serveur, il faut utiliser :
- **Homebrew** pour installer les packages (nginx, PostgreSQL, etc.)
- **Docker / OrbStack** pour containeriser les services
- **ServBay** comme alternative pour le dev web local

---

## 2. Configuration Headless et Acces Distant

### Demarrage automatique apres coupure de courant

```bash
# Activer le redemarrage automatique apres coupure
sudo pmset -a autorestart 1

# Verifier le reglage
pmset -g | grep autorestart
```

Egalement accessible via **Reglages Systeme > General > Demarrage et arret** :
cocher "Demarrer automatiquement apres une panne de courant".

### Auto-login (sans mot de passe au boot)

**Reglages Systeme > Utilisateurs et groupes > Ouverture de session automatique**
Selectionner l'utilisateur. Attention : incompatible avec FileVault actif.

### Activer SSH

```bash
# Activer le service SSH
sudo systemsetup -setremotelogin on

# Verifier
sudo systemsetup -getremotelogin
```

Ou via **Reglages Systeme > General > Partage > Session a distance**.

### Activer VNC (Partage d'ecran)

```bash
# Activer le partage d'ecran via ARDAgent
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart \
  -activate -configure -allowAccessFor -allUsers \
  -configure -clientopts -setvnclegacy -vnclegacy yes \
  -configure -clientopts -setvncpw -vncpw "VOTRE_MOT_DE_PASSE" \
  -restart -agent -privs -all
```

Connexion depuis un autre Mac : `vnc://IP_DU_MAC_MINI:5900`

### Emulateur HDMI (headless)

Sans ecran branche, macOS limite la resolution. Solution :
- **Adaptateur HDMI dummy plug** (~10 EUR sur Amazon) — simule un ecran 4K
- Ou utiliser un adaptateur HDMI-vers-USB pour KVM virtuel

### Empêcher la mise en veille

```bash
# Desactiver toute mise en veille
sudo pmset -a sleep 0
sudo pmset -a disksleep 0
sudo pmset -a displaysleep 0

# Verifier
pmset -g
```

---

## 3. Docker sur Apple Silicon (M4)

### Options disponibles

| Solution | Type | Prix | Performance | Notes |
|----------|------|------|-------------|-------|
| **OrbStack** | App native | Gratuit (perso) / 8$/mois (pro) | Excellente | Recommande. Demarrage 2s, CPU idle ~0.1% |
| **Docker Desktop** | App + VM | Gratuit (perso) / 11$/mois (pro) | Bonne | Plus lourd, VM HyperKit |
| **Colima** | CLI open-source | Gratuit | Bonne | Backend Lima, leger |
| **Apple Container** | Natif Apple | Gratuit | Experimentale | Nouveau (macOS 26 Tahoe), pas de docker-compose |

### Installation recommandee : OrbStack

```bash
# Installation via Homebrew
brew install orbstack

# Lancer OrbStack
open -a OrbStack

# Les commandes docker et docker-compose fonctionnent directement
docker version
docker compose version
```

OrbStack utilise Rosetta pour les images x86 sur Apple Silicon, avec des performances bien superieures a QEMU.

### Apple Container (nouveau, 2025)

Solution native Apple ecrite en Swift. Chaque conteneur tourne dans sa propre micro-VM isolee. Disponible sur macOS 15 Sequoia (limité) et macOS 26 Tahoe (complet). Pas encore de docker-compose equivalent — a surveiller mais pas pret pour la production.

---

## 4. Ollama sur Mac Mini M4 — Performances LLM

### Installation

```bash
# Installer Ollama
brew install ollama

# Demarrer le service
ollama serve

# Telecharger et lancer un modele
ollama pull llama3.1:8b
ollama run llama3.1:8b
```

### Performances par configuration

#### Mac Mini M4 — 16 Go RAM

| Modele | Taille | Quantification | Tokens/s | Utilisable ? |
|--------|--------|----------------|----------|--------------|
| Phi-3 Mini | 3.8B | Q4_K_M | 50-60 t/s | Excellent |
| Llama 3.1 | 8B | Q4_K_M | 25-40 t/s | Tres bien |
| Mistral 7B | 7B | Q4_K_M | 25-40 t/s | Tres bien |
| Qwen2 7B | 7B | Q4_K_M | 25-35 t/s | Bien |
| Llama 3.1 | 13B | Q4_K_M | 10-15 t/s | Limite (memoire tendue) |
| Modele 30B+ | 30B | - | Inutilisable | Swap massif |

> **16 Go = confortable pour 7-8B, limite pour 13B, impossible pour 30B+**

#### Mac Mini M4 Pro — 24 Go RAM

| Modele | Taille | Quantification | Tokens/s | Utilisable ? |
|--------|--------|----------------|----------|--------------|
| Llama 3.1 | 8B | Q4_K_M | 35-50 t/s | Excellent |
| Mistral 7B | 7B | Q4_K_M | 35-50 t/s | Excellent |
| Llama 3.1 | 13B | Q4_K_M | 20-30 t/s | Bien |
| Qwen2 14B | 14B | Q4_K_M | 18-25 t/s | Bien |
| DeepSeek R1 | 32B | Q4_K_M | 8-12 t/s | Limite |

#### Mac Mini M4 Pro — 48 Go RAM

| Modele | Taille | Quantification | Tokens/s | Utilisable ? |
|--------|--------|----------------|----------|--------------|
| Llama 3.1 | 8B | Q4_K_M | 40-55 t/s | Excellent |
| DeepSeek R1 | 32B | Q4_K_M | 11-14 t/s | Bon (chat interactif) |
| Llama 3.1 | 70B | Q4_K_M | 5-8 t/s | Utilisable (lent) |
| Mixtral 8x7B | 47B | Q4_K_M | 8-12 t/s | Correct |

> **Facteur cle : la bande passante memoire** (M4 : 120 Go/s, M4 Pro : 273 Go/s). Le M4 Pro est significativement plus rapide pour la generation de tokens.

### Ollama comme API

```bash
# L'API REST est disponible par defaut sur le port 11434
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1:8b",
  "prompt": "Bonjour, comment ca va ?"
}'
```

---

## 5. Cloudflare Tunnel — Exposer le Mac Mini en Toute Securite

### Cout

**Gratuit.** Cloudflare Tunnel est inclus dans le plan gratuit de Cloudflare. Il faut juste un nom de domaine enregistre sur Cloudflare (ou y transferer le DNS).

### Pre-requis

- Un compte Cloudflare (gratuit)
- Un nom de domaine dont le DNS pointe vers Cloudflare

### Installation et configuration

```bash
# 1. Installer cloudflared
brew install cloudflare/cloudflare/cloudflared

# 2. Se connecter a Cloudflare
cloudflared tunnel login
# -> Ouvre un navigateur pour autoriser le domaine

# 3. Creer un tunnel
cloudflared tunnel create mac-mini-dap

# 4. Noter le Tunnel ID affiche (ex: abc123-def456-...)

# 5. Configurer le routage DNS
cloudflared tunnel route dns mac-mini-dap n8n.votre-domaine.com
```

### Fichier de configuration

```yaml
# ~/.cloudflared/config.yml
tunnel: <TUNNEL_ID>
credentials-file: /Users/<user>/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: n8n.votre-domaine.com
    service: http://localhost:5678
  - hostname: ollama.votre-domaine.com
    service: http://localhost:11434
  - service: http_status:404
```

### Lancer comme service macOS (demarrage automatique)

```bash
# Installer comme service LaunchAgent
sudo cloudflared service install

# Le service demarre automatiquement au login
# Verifier le statut
cloudflared tunnel info mac-mini-dap
```

Le fichier LaunchDaemon est cree dans `/Library/LaunchDaemons/com.cloudflare.cloudflared.plist`.

### Avantages

- Pas besoin d'IP statique ni de port forwarding
- Le Mac Mini reste invisible sur Internet (pas de port ouvert)
- HTTPS automatique via Cloudflare
- Protection DDoS incluse
- Zero Trust possible (authentification avant acces)

---

## 6. n8n Self-Hosted sur Mac — Docker Compose + PostgreSQL

### Structure du projet

```
n8n-local/
├── docker-compose.yml
├── .env
├── backup.sh
└── data/
    └── n8n/
```

### Fichier docker-compose.yml

```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=${POSTGRES_DB}
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - N8N_HOST=${N8N_HOST}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://${N8N_HOST}/
      - GENERIC_TIMEZONE=Europe/Brussels
      - TZ=Europe/Brussels
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  n8n_data:
  postgres_data:
```

### Fichier .env

```env
POSTGRES_USER=n8n
POSTGRES_PASSWORD=un_mot_de_passe_fort_ici
POSTGRES_DB=n8n
N8N_ENCRYPTION_KEY=une_cle_aleatoire_de_32_caracteres
N8N_HOST=n8n.votre-domaine.com
```

> **CRITIQUE : Sauvegarder N8N_ENCRYPTION_KEY separement !** Sans cette cle, les credentials stockes dans la base deviennent illisibles.

### Demarrage

```bash
cd n8n-local
docker compose up -d
```

### Strategie de backup

#### Script de backup automatise (backup.sh)

```bash
#!/bin/bash
BACKUP_DIR="/Users/<user>/backups/n8n"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

# 1. Backup PostgreSQL
docker compose exec -T postgres pg_dump -U n8n n8n | gzip > "$BACKUP_DIR/n8n_db_$DATE.sql.gz"

# 2. Backup volume n8n_data
docker run --rm -v n8n-local_n8n_data:/data -v "$BACKUP_DIR":/backup \
  alpine tar czf "/backup/n8n_data_$DATE.tar.gz" -C /data .

# 3. Backup du fichier .env (contient N8N_ENCRYPTION_KEY)
cp .env "$BACKUP_DIR/env_$DATE.bak"

# 4. Supprimer les backups de plus de 30 jours
find "$BACKUP_DIR" -name "*.gz" -mtime +30 -delete
find "$BACKUP_DIR" -name "*.bak" -mtime +30 -delete

echo "Backup termine : $DATE"
```

#### Crontab

```bash
# Backup quotidien a 3h du matin
crontab -e
0 3 * * * /Users/<user>/n8n-local/backup.sh >> /Users/<user>/backups/n8n/backup.log 2>&1
```

---

## 7. Onduleur (UPS) — Recommandations Europe

### Modeles recommandes (80-150 EUR)

| Modele | Capacite | Prix approx. | Prises | Compatibilite Mac |
|--------|----------|--------------|--------|-------------------|
| **APC Back-UPS BX950MI-FR** | 950 VA / 520 W | ~100 EUR | 6 prises FR | Oui (USB, detecte par macOS) |
| **APC Back-UPS BX1200MI-FR** | 1200 VA / 650 W | ~130 EUR | 6 prises FR | Oui (USB, detecte par macOS) |
| **APC Back-UPS Essential BE850G2-FR** | 850 VA | ~110 EUR | 8 prises FR + USB-A/C | Oui |
| **CyberPower CP1500EPFCLCD** | 1500 VA / 900 W | ~150 EUR | 6 prises Schuko | Oui (avec PowerPanel) |
| **Eaton 5E 1200i USB FR** | 1200 VA / 660 W | ~120 EUR | 4 prises FR | Oui |

> **Recommandation** : APC BX950MI-FR ou BX1200MI-FR — detection native par macOS sans logiciel supplementaire.

### Configuration macOS pour arret automatique sur batterie faible

1. Brancher l'UPS au Mac Mini via USB
2. macOS detecte automatiquement l'UPS dans **Reglages Systeme > Batterie**
3. Configurer l'arret automatique :

```bash
# Voir les parametres UPS actuels
pmset -g

# Configurer l'arret automatique quand la batterie UPS atteint 20%
sudo pmset -a haltlevel 20

# Ou configurer un delai avant arret (en minutes)
sudo pmset -a haltafter 5
```

Via l'interface graphique : **Reglages Systeme > Batterie > Options UPS** :
- Cocher "Eteindre quand la batterie atteint X%"
- Cocher "Eteindre apres X minutes sur batterie"

Le Mac Mini consomme environ **5-15W** en fonctionnement normal, donc un UPS 950VA donne largement **30-60 minutes d'autonomie** pour un arret propre.

---

## 8. Securisation macOS comme Serveur

### 8.1 FileVault (chiffrement disque)

```bash
# Activer FileVault
sudo fdesetup enable

# Verifier le statut
sudo fdesetup status
```

> **Attention** : FileVault est incompatible avec l'auto-login. Pour un serveur headless, c'est un compromis : soit FileVault + saisie du mot de passe au boot (via ecran ou Apple Remote Desktop), soit auto-login sans chiffrement.

### 8.2 Firewall macOS

```bash
# Activer le firewall applicatif
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Activer le mode furtif (ne repond pas aux pings)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on

# Bloquer toutes les connexions entrantes sauf les services essentiels
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on
```

### 8.3 Firewall PF (Packet Filter) — Protection avancee

```bash
# Editer /etc/pf.conf (ajouter a la fin)
sudo nano /etc/pf.conf
```

Ajouter :
```
# Table pour les IPs bannies (brute force SSH)
table <bruteforce> persist

# Bloquer les IPs dans la table bruteforce
block quick from <bruteforce>

# Limiter les connexions SSH : max 3 tentatives en 30 secondes
pass in on en0 proto tcp to port 22 flags S/SA \
  keep state (max-src-conn 5, max-src-conn-rate 3/30, \
  overload <bruteforce> flush global)
```

```bash
# Activer les nouvelles regles
sudo pfctl -f /etc/pf.conf
sudo pfctl -e
```

### 8.4 SSH Hardening

Editer `/etc/ssh/sshd_config` :

```
# Desactiver l'authentification par mot de passe
PasswordAuthentication no
ChallengeResponseAuthentication no

# Desactiver le login root
PermitRootLogin no

# Utiliser uniquement SSH protocol 2
Protocol 2

# Changer le port (optionnel mais recommande)
Port 2222

# Limiter les utilisateurs autorises
AllowUsers votre_utilisateur

# Timeout pour les sessions inactives
ClientAliveInterval 300
ClientAliveCountMax 2
```

Generer et deployer une cle SSH :
```bash
# Sur le client (votre machine de travail)
ssh-keygen -t ed25519 -C "admin@dap"

# Copier la cle publique sur le serveur
ssh-copy-id -p 2222 user@ip_mac_mini
```

### 8.5 Fail2ban sur macOS

```bash
# Installer fail2ban
brew install fail2ban

# Creer la config locale
sudo cp /opt/homebrew/etc/fail2ban/jail.conf /opt/homebrew/etc/fail2ban/jail.local
```

Editer `/opt/homebrew/etc/fail2ban/jail.local` :
```ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/system.log
maxretry = 3
bantime = 3600
findtime = 600
```

```bash
# Demarrer fail2ban
sudo brew services start fail2ban
```

> **Note** : sur macOS recent, les logs SSH ne sont plus dans `/var/log/auth.log` mais dans le systeme de logging unifie. Fail2ban peut avoir des difficultes. Alternative : utiliser les regles PF avec `overload` (section 8.3) qui font le meme travail nativement.

### 8.6 Mises a jour automatiques

```bash
# Activer les mises a jour automatiques de securite (recommande)
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticallyInstallMacOSUpdates -bool false
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate CriticalUpdateInstall -bool true
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticCheckEnabled -bool true
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticDownload -bool true
```

> **Strategie recommandee** : Activer les mises a jour de securite automatiques, mais **desactiver les mises a jour majeures macOS** (qui peuvent casser Docker/OrbStack). Appliquer les mises a jour majeures manuellement apres avoir verifie la compatibilite.

---

## 9. Maintenance et Monitoring

### 9.1 Backup

| Solution | Type | Prix | Avantages | Inconvenients |
|----------|------|------|-----------|---------------|
| **Time Machine** | Incremental local | Gratuit | Natif, simple | Pas de backup hors-site |
| **Restic** | Incremental chiffre | Gratuit (OSS) | Cloud-compatible, dedup | CLI uniquement |
| **Carbon Copy Cloner** | Clone bootable | 40 EUR | Clone complet, bootable | Licence payante |
| **Backblaze B2 + Restic** | Cloud | ~5 EUR/mois | Hors-site, chiffre | Config manuelle |

**Recommandation** : Time Machine sur disque externe USB pour le systeme + script backup.sh pour n8n/PostgreSQL + Restic vers Backblaze B2 pour le hors-site.

### 9.2 Monitoring

| Outil | Type | Prix | Usage |
|-------|------|------|-------|
| **Glances** | CLI/Web | Gratuit (OSS) | CPU, RAM, disque, reseau en temps reel |
| **Stats** (exelban/stats) | Menu bar | Gratuit (OSS) | Monitoring visuel macOS |
| **iStat Menus** | Menu bar | 12 EUR | Monitoring pro complet |
| **Uptime Kuma** | Web dashboard | Gratuit (OSS) | Monitoring uptime services |

```bash
# Installer Glances
brew install glances

# Lancer en mode web (accessible a distance)
glances -w
# -> Accessible sur http://IP:61208

# Installer Stats (menu bar)
brew install --cask stats

# Installer Uptime Kuma via Docker
docker run -d --restart=always -p 3001:3001 \
  -v uptime-kuma:/app/data \
  --name uptime-kuma \
  louislam/uptime-kuma:1
```

### 9.3 Gerer les mises a jour macOS sans casser Docker

**Procedure recommandee :**

1. **Avant la mise a jour** :
   ```bash
   # Sauvegarder les volumes Docker
   docker compose -f ~/n8n-local/docker-compose.yml down
   # Faire un backup complet (Time Machine ou script)
   ```

2. **Verifier la compatibilite** :
   - Consulter les release notes Docker Desktop / OrbStack
   - Attendre 1-2 semaines apres une mise a jour macOS majeure
   - Verifier sur GitHub issues les problemes rapportes

3. **Apres la mise a jour** :
   ```bash
   # Mettre a jour OrbStack/Docker
   brew upgrade orbstack
   # Redemarrer les services
   docker compose -f ~/n8n-local/docker-compose.yml up -d
   # Verifier que tout fonctionne
   docker ps
   curl http://localhost:5678/healthz
   ```

4. **Desactiver les mises a jour automatiques macOS majeures** :
   ```bash
   sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate AutomaticallyInstallMacOSUpdates -bool false
   ```

---

## 10. Recapitulatif Budget Estimatif

| Element | Option economique | Option recommandee |
|---------|-------------------|--------------------|
| Mac Mini M4 (16 Go) | ~649 EUR | — |
| Mac Mini M4 Pro (24 Go) | — | ~1 649 EUR |
| Mac Mini M4 Pro (48 Go) | — | ~2 199 EUR |
| UPS (APC BX950MI-FR) | ~100 EUR | ~130 EUR (BX1200MI) |
| Disque externe Time Machine 1 To | ~60 EUR | ~60 EUR |
| Adaptateur HDMI dummy | ~10 EUR | ~10 EUR |
| Cloudflare Tunnel | Gratuit | Gratuit |
| OrbStack | Gratuit (perso) | Gratuit |
| Domaine .com/.fr | ~10-15 EUR/an | ~10-15 EUR/an |
| **Total** | **~830 EUR** | **~2 050 EUR** |

---

## Sources

- [Apple Mac mini Tech Specs](https://support.apple.com/en-us/121555)
- [Acheter Mac mini — Apple France](https://www.apple.com/fr/shop/buy-mac/mac-mini)
- [Mac mini M4 Review — Macworld](https://www.macworld.com/article/2109165/m3-mac-mini-design-processor-specs-release-rumors.html)
- [OrbStack — Docker pour Mac](https://orbstack.dev/)
- [OrbStack vs Docker Desktop](https://orbstack.dev/docs/compare/docker-desktop)
- [Apple Containers vs Docker vs OrbStack](https://www.repoflow.io/blog/apple-containers-vs-docker-desktop-vs-orbstack)
- [Docker Desktop Alternatives 2025](https://fsck.sh/en/blog/docker-desktop-alternatives-2025/)
- [Benchmarks LLM M4 Pro — LinkedIn](https://www.linkedin.com/pulse/benchmarking-local-ollama-llms-apple-m4-pro-vs-rtx-3060-dmitry-markov-6vlce)
- [Mac Mini M4 DeepSeek Benchmarks](https://like2byte.com/mac-mini-m4-deepseek-r1-ai-benchmarks/)
- [Mac Mini M4 Pro 64GB 30B LLM Benchmarks](https://like2byte.com/mac-mini-m4-pro-64gb-30b-llm-benchmarks/)
- [llama.cpp Apple Silicon Performance](https://github.com/ggml-org/llama.cpp/discussions/4167)
- [Ollama Mac Setup Guide](https://insiderllm.com/guides/ollama-mac-setup-optimization/)
- [Cloudflare Tunnel — macOS Service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/macos/)
- [Cloudflare Tunnel — Create Local Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/)
- [n8n Docker Compose PostgreSQL](https://github.com/n8n-io/n8n-hosting/blob/main/docker-compose/withPostgres/README.md)
- [n8n Backup Strategy](https://massivegrid.com/blog/n8n-backup-disaster-recovery/)
- [n8n Docker Installation](https://docs.n8n.io/hosting/installation/docker/)
- [APC Back-UPS BX1200MI-FR — Amazon.fr](https://www.amazon.fr/Onduleur-APC-Back-UPS-1200VA/dp/B08GM3LWYM)
- [APC Back-UPS BX950MI-FR — Amazon.fr](https://www.amazon.fr/Onduleur-APC-Back-UPS-950VA/dp/B08GM5HYFY)
- [UPS Auto-Shutdown macOS — Apple Support](https://support.apple.com/guide/mac-help/set-mac-shuts-a-ups-mchlp2987/mac)
- [macOS Security Guide — drduh](https://github.com/drduh/macOS-Security-and-Privacy-Guide)
- [Fail2ban — Homebrew](https://formulae.brew.sh/formula/fail2ban)
- [pmset Reference](https://ss64.com/mac/pmset.html)
- [Glances — GitHub](https://github.com/nicolargo/glances)
- [Stats — macOS Menu Bar Monitor](https://github.com/exelban/stats)
- [iStat Menus](https://bjango.com/mac/istatmenus/)
- [macOS Server Discontinuation](https://support.apple.com/en-us/101601)
