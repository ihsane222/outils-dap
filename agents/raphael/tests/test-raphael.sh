#!/usr/bin/env bash
# Test basique de l'agent Raphael via webhook n8n
# Usage : ./test-raphael.sh [URL_BASE]

set -euo pipefail

N8N_BASE="${1:-https://n8n.srv1387885.hstgr.cloud}"
WEBHOOK_URL="${N8N_BASE}/webhook/raphael"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Test Agent Raphael ==="
echo "Webhook : ${WEBHOOK_URL}"
echo ""

# --- Test 1 : Message valide ---
echo "[Test 1] Message valide — resume emails"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d @"${SCRIPT_DIR}/mock-teams-message.json" \
  --max-time 60)

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "  HTTP 200 OK"
else
  echo "  ECHEC — HTTP ${HTTP_CODE}"
  echo "  Body : ${BODY}"
  exit 1
fi

# Verifier que la reponse contient du JSON valide avec un champ response
if echo "$BODY" | python3 -c "import sys,json; d=json.load(sys.stdin); assert d.get('success') == True; assert len(str(d.get('response',''))) > 5" 2>/dev/null; then
  echo "  Reponse valide — contient success=true et une reponse non-vide"
else
  echo "  ATTENTION — La reponse ne correspond pas au format attendu"
  echo "  Body : ${BODY}"
  exit 1
fi

echo ""

# --- Test 2 : Message vide (doit retourner 400) ---
echo "[Test 2] Message vide — doit retourner 400"
RESPONSE2=$(curl -s -w "\n%{http_code}" -X POST "${WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d '{"sessionId": "test"}' \
  --max-time 15)

HTTP_CODE2=$(echo "$RESPONSE2" | tail -1)

if [ "$HTTP_CODE2" -eq 400 ]; then
  echo "  HTTP 400 OK — input invalide correctement rejete"
else
  echo "  ATTENTION — Attendu 400, recu ${HTTP_CODE2}"
fi

echo ""

# --- Test 3 : Message en neerlandais ---
echo "[Test 3] Message NL — detection langue"
RESPONSE3=$(curl -s -w "\n%{http_code}" -X POST "${WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d '{"message": "Wat staat er op mijn agenda vandaag?", "sessionId": "raphael-test-nl"}' \
  --max-time 60)

HTTP_CODE3=$(echo "$RESPONSE3" | tail -1)
BODY3=$(echo "$RESPONSE3" | sed '$d')

if [ "$HTTP_CODE3" -eq 200 ]; then
  echo "  HTTP 200 OK"
  # Verifier que la reponse contient des mots neerlandais courants
  if echo "$BODY3" | grep -qiE "(vandaag|agenda|geen|kalender|afspraak|evenement)"; then
    echo "  Reponse en neerlandais detectee"
  else
    echo "  INFO — Reponse recue mais langue NL non verifiee"
    echo "  Body : $(echo "$BODY3" | head -c 200)"
  fi
else
  echo "  ATTENTION — HTTP ${HTTP_CODE3}"
fi

echo ""
echo "=== Tests termines ==="
