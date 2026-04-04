#!/bin/bash
# Test Brio Sync webhook — envoie 3 clients mock et verifie la reponse
#
# Usage:
#   ./test-brio-sync.sh [URL_BASE]
#
# Par defaut, utilise l'instance n8n DAP.
# Le workflow doit etre actif ou en mode test pour repondre.

set -euo pipefail

N8N_BASE="${1:-https://n8n.srv1387885.hstgr.cloud}"
WEBHOOK_URL="${N8N_BASE}/webhook/brio-sync"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
MOCK_FILE="${SCRIPT_DIR}/mock-export-brio.json"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "========================================"
echo " Test Brio Sync Webhook"
echo "========================================"
echo ""
echo "URL: ${WEBHOOK_URL}"
echo "Payload: ${MOCK_FILE}"
echo ""

# Verifie que le fichier mock existe
if [ ! -f "$MOCK_FILE" ]; then
  echo -e "${RED}ERREUR: Fichier mock introuvable: ${MOCK_FILE}${NC}"
  exit 1
fi

EXPECTED_COUNT=3

# Envoie le payload
echo "Envoi de ${EXPECTED_COUNT} clients mock..."
echo ""

HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d @"${MOCK_FILE}" \
  "${WEBHOOK_URL}" \
  --max-time 30 \
  2>&1) || {
  echo -e "${RED}ERREUR: curl a echoue. Le workflow est-il actif ?${NC}"
  exit 1
}

# Separe le body et le status code
HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed '$d')
HTTP_CODE=$(echo "$HTTP_RESPONSE" | tail -1)

echo "HTTP Status: ${HTTP_CODE}"
echo "Response body:"
echo "$HTTP_BODY" | python3 -m json.tool 2>/dev/null || echo "$HTTP_BODY"
echo ""

# Test 1: HTTP 200
PASS=0
FAIL=0

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}[PASS]${NC} HTTP 200 OK"
  PASS=$((PASS + 1))
else
  echo -e "${RED}[FAIL]${NC} Attendu HTTP 200, recu ${HTTP_CODE}"
  FAIL=$((FAIL + 1))
fi

# Test 2: success = true
if echo "$HTTP_BODY" | python3 -c "import sys, json; d=json.load(sys.stdin); assert d.get('success') == True" 2>/dev/null; then
  echo -e "${GREEN}[PASS]${NC} success = true"
  PASS=$((PASS + 1))
else
  echo -e "${RED}[FAIL]${NC} success != true"
  FAIL=$((FAIL + 1))
fi

# Test 3: rows_processed = 3
ACTUAL_COUNT=$(echo "$HTTP_BODY" | python3 -c "import sys, json; print(json.load(sys.stdin).get('rows_processed', -1))" 2>/dev/null || echo "-1")
if [ "$ACTUAL_COUNT" = "$EXPECTED_COUNT" ]; then
  echo -e "${GREEN}[PASS]${NC} rows_processed = ${EXPECTED_COUNT}"
  PASS=$((PASS + 1))
else
  echo -e "${RED}[FAIL]${NC} Attendu rows_processed=${EXPECTED_COUNT}, recu ${ACTUAL_COUNT}"
  FAIL=$((FAIL + 1))
fi

# Resume
echo ""
echo "========================================"
echo " Resultats: ${PASS} pass, ${FAIL} fail"
echo "========================================"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

echo ""
echo -e "${GREEN}Tous les tests passent.${NC}"
echo ""
echo -e "${YELLOW}Rappel: verifier manuellement dans n8n que les 3 lignes"
echo -e "sont bien presentes dans la table olympe_brio_cache.${NC}"
