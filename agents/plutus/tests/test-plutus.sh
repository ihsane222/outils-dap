#!/usr/bin/env bash
# Test Plutus - Finance Reporting Agent
# Usage: ./test-plutus.sh [webhook_base_url]
#
# Envoie les donnees mock au webhook Plutus et verifie la structure de reponse.

set -euo pipefail

BASE_URL="${1:-https://n8n.srv1387885.hstgr.cloud}"
WEBHOOK_PATH="/webhook/plutus"
URL="${BASE_URL}${WEBHOOK_PATH}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MOCK_DATA="${SCRIPT_DIR}/mock-data/sample-financial-data.json"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

check() {
  local label="$1"
  local condition="$2"
  if eval "$condition"; then
    echo -e "  ${GREEN}[OK]${NC} $label"
    ((PASS++))
  else
    echo -e "  ${RED}[FAIL]${NC} $label"
    ((FAIL++))
  fi
}

echo "========================================"
echo " Test Plutus - Finance Reporting"
echo " URL: ${URL}"
echo " Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "========================================"
echo ""

# --- Test 1: Payload valide ---
echo "Test 1: Envoi payload financier valide"

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d @"${MOCK_DATA}" \
  --max-time 60)

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

check "HTTP 200" "[[ '${HTTP_CODE}' == '200' ]]"
check "Reponse non vide" "[[ -n '${BODY}' ]]"

# Verification JSON valide
if echo "$BODY" | python3 -m json.tool > /dev/null 2>&1; then
  check "JSON valide" "true"

  # Champs obligatoires
  check "Champ 'success'" "echo '$BODY' | python3 -c \"import sys,json; d=json.load(sys.stdin); assert d.get('success') == True\""
  check "Champ 'agent' = plutus" "echo '$BODY' | python3 -c \"import sys,json; d=json.load(sys.stdin); assert d.get('agent') == 'plutus'\""
  check "Champ 'data' present" "echo '$BODY' | python3 -c \"import sys,json; d=json.load(sys.stdin); assert 'data' in d\""

  # KPI dans la reponse (recherche recursive dans le JSON stringify)
  BODY_LOWER=$(echo "$BODY" | tr '[:upper:]' '[:lower:]')
  check "Contient 'ca' ou 'chiffre'" "echo '${BODY_LOWER}' | grep -qE '\"ca\"|chiffre'"
  check "Contient 'charges'" "echo '${BODY_LOWER}' | grep -q 'charges'"
  check "Contient 'marge'" "echo '${BODY_LOWER}' | grep -q 'marge'"
  check "Contient 'tresorerie'" "echo '${BODY_LOWER}' | grep -qE 'tresorerie|trésorerie'"
  check "Contient 'commissions'" "echo '${BODY_LOWER}' | grep -q 'commission'"
  check "Contient des chiffres" "echo '${BODY}' | grep -qE '[0-9]{3,}'"
else
  check "JSON valide" "false"
fi

echo ""

# --- Test 2: Payload vide (doit retourner 400) ---
echo "Test 2: Envoi payload vide"

RESPONSE_EMPTY=$(curl -s -w "\n%{http_code}" \
  -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d '{}' \
  --max-time 30)

HTTP_EMPTY=$(echo "$RESPONSE_EMPTY" | tail -1)

check "HTTP 400 sur payload vide" "[[ '${HTTP_EMPTY}' == '400' ]]"

echo ""

# --- Test 3: Question simple sans data ---
echo "Test 3: Question textuelle sans donnees"

RESPONSE_Q=$(curl -s -w "\n%{http_code}" \
  -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d '{"question": "Quels KPI suis-tu pour DAP ?"}' \
  --max-time 60)

HTTP_Q=$(echo "$RESPONSE_Q" | tail -1)
BODY_Q=$(echo "$RESPONSE_Q" | sed '$d')

check "HTTP 200 sur question simple" "[[ '${HTTP_Q}' == '200' ]]"
check "Reponse contient du contenu" "[[ ${#BODY_Q} -gt 10 ]]"

echo ""

# --- Resume ---
echo "========================================"
TOTAL=$((PASS + FAIL))
echo -e " Resultats: ${GREEN}${PASS}/${TOTAL} OK${NC}"
if [[ $FAIL -gt 0 ]]; then
  echo -e " ${RED}${FAIL} echec(s)${NC}"
  exit 1
else
  echo -e " ${GREEN}Tous les tests passent${NC}"
  exit 0
fi
