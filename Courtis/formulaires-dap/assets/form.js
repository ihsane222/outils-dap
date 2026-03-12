/* ═══════════════════════════════════════════════════════
   DAP Formulaires — JavaScript partagé
   ═══════════════════════════════════════════════════════ */

// ── CONFIGURATION ────────────────────────────────────────
// Collez ici l'URL de votre Google Apps Script (déployé comme Web App)
// ou l'URL de votre webhook n8n.
// Voir le fichier apps-script.gs pour le code à déployer.
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzN2gPMsGAbZVFGfbZlnn-0HF3iRGkAx976iXPlUhygso_pIvs7HVFgbGYz4AF4iNX6/exec';
// ─────────────────────────────────────────────────────────

// ── MULTI-STEP NAVIGATION ───────────────────────────────

let currentStep = 1;
let totalSteps = 1;

function initSteps() {
  const steps = document.querySelectorAll('.step-content');
  totalSteps = steps.length;
  showStep(1);
}

function showStep(n) {
  currentStep = n;
  document.querySelectorAll('.step-content').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === n);
  });
  updateProgressBar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (validateCurrentStep()) {
    if (currentStep < totalSteps) showStep(currentStep + 1);
  }
}

function prevStep() {
  if (currentStep > 1) showStep(currentStep - 1);
}

function updateProgressBar() {
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'done');
    if (i + 1 === currentStep) dot.classList.add('active');
    else if (i + 1 < currentStep) dot.classList.add('done');
  });
  document.querySelectorAll('.step-label').forEach((label, i) => {
    label.classList.toggle('active', i + 1 === currentStep);
  });
  document.querySelectorAll('.step-line').forEach((line, i) => {
    line.classList.toggle('done', i + 1 < currentStep);
  });
}

// ── VALIDATION ──────────────────────────────────────────

function validateCurrentStep() {
  const activeStep = document.querySelector('.step-content.active');
  if (!activeStep) return true;

  let valid = true;
  clearErrors(activeStep);

  // Required text/number/date/email/tel inputs
  activeStep.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
    if (!el.value.trim()) {
      showError(el);
      valid = false;
    }
  });

  // Required radio groups
  activeStep.querySelectorAll('.radio-group[data-required="true"]').forEach(group => {
    const checked = group.querySelector('.radio-option.selected');
    if (!checked) {
      const errorEl = group.nextElementSibling;
      if (errorEl && errorEl.classList.contains('field-error')) {
        errorEl.classList.add('visible');
      }
      group.style.outline = '2px solid #ef4444';
      group.style.outlineOffset = '2px';
      group.style.borderRadius = '8px';
      valid = false;
    }
  });

  // Required checkbox groups
  activeStep.querySelectorAll('.checkbox-group[data-required="true"]').forEach(group => {
    const checked = group.querySelector('.checkbox-option.selected');
    if (!checked) {
      const errorEl = group.nextElementSibling;
      if (errorEl && errorEl.classList.contains('field-error')) {
        errorEl.classList.add('visible');
      }
      valid = false;
    }
  });

  if (!valid) {
    const firstError = activeStep.querySelector('.error, [style*="outline"]');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function showError(el) {
  el.classList.add('error');
  const errorEl = el.parentElement.querySelector('.field-error');
  if (errorEl) errorEl.classList.add('visible');
}

function clearErrors(container) {
  container.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  container.querySelectorAll('.field-error.visible').forEach(el => el.classList.remove('visible'));
  container.querySelectorAll('[style*="outline"]').forEach(el => {
    el.style.outline = '';
    el.style.outlineOffset = '';
  });
}

// ── RADIO & CHECKBOX ────────────────────────────────────

function initRadioGroups() {
  document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', () => {
      const group = option.closest('.radio-group');
      group.querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
      option.querySelector('input[type="radio"]').checked = true;

      // Clear group error
      group.style.outline = '';
      const errorEl = group.nextElementSibling;
      if (errorEl && errorEl.classList.contains('field-error')) {
        errorEl.classList.remove('visible');
      }

      // Trigger conditionals (supporte plusieurs clés séparées par virgule)
      const triggerAttr = group.dataset.trigger;
      const value = option.dataset.value;
      if (triggerAttr) {
        triggerAttr.split(',').forEach(key => triggerConditional(key.trim(), value));
      }
    });
  });

  document.querySelectorAll('.checkbox-option').forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
      const input = option.querySelector('input[type="checkbox"]');
      input.checked = !input.checked;

      const group = option.closest('.checkbox-group');
      const triggerAttr = group.dataset.trigger;
      if (triggerAttr) {
        const selectedValues = [...group.querySelectorAll('.checkbox-option.selected')]
          .map(o => o.dataset.value);
        const valStr = selectedValues.join(',');
        triggerAttr.split(',').forEach(key => triggerConditional(key.trim(), valStr));
      }
    });
  });
}

// ── CONDITIONAL BLOCKS ──────────────────────────────────

function triggerConditional(triggerKey, value) {
  const rules = window.CONDITIONALS || {};
  const rule = rules[triggerKey];
  if (!rule) return;

  rule.forEach(({ condition, target }) => {
    const block = document.getElementById(target);
    if (!block) return;

    let show = false;

    if (condition.type === 'equals') {
      show = value === condition.value;
    } else if (condition.type === 'not_equals') {
      show = value !== condition.value;
    } else if (condition.type === 'gte') {
      show = parseFloat(value) >= condition.value;
    } else if (condition.type === 'contains') {
      show = value.split(',').includes(condition.value);
    } else if (condition.type === 'not_empty') {
      show = value !== '' && value !== '0';
    }

    block.classList.toggle('visible', show);

    // Clear required status on hidden fields
    block.querySelectorAll('input, select, textarea').forEach(el => {
      if (!show) {
        el.removeAttribute('required');
        el.dataset.wasRequired = el.dataset.wasRequired || el.hasAttribute('required') ? 'true' : '';
        el.classList.remove('error');
      }
    });
  });
}

// ── NUMBER INPUT → TRIGGER ─────────────────────────────

function initNumberTriggers() {
  document.querySelectorAll('input[type="number"][data-trigger]').forEach(input => {
    input.addEventListener('input', () => {
      triggerConditional(input.dataset.trigger, input.value);
    });
  });
}

// ── FORM SUBMISSION ─────────────────────────────────────

async function submitForm(formType) {
  if (!validateCurrentStep()) return;

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span>Envoi en cours...</span>';

  // Lire le paramètre ?ag= dans l'URL (référence gestionnaire, invisible pour le client)
  const agentRef = new URLSearchParams(window.location.search).get('ag') || 'general';

  const formData = {
    form_type: formType,
    timestamp: new Date().toISOString(),
    agent_ref: agentRef
  };

  // Collect all text/number/date inputs
  document.querySelectorAll('input, select, textarea').forEach(el => {
    if (!el.name) return;
    if (el.type === 'checkbox') {
      if (!formData[el.name]) formData[el.name] = [];
      if (el.checked) formData[el.name].push(el.value);
    } else if (el.type === 'radio') {
      if (el.checked) formData[el.name] = el.value;
    } else {
      formData[el.name] = el.value;
    }
  });

  // Collect radio selections from custom UI
  document.querySelectorAll('.radio-option.selected').forEach(opt => {
    const group = opt.closest('.radio-group');
    const name = group.dataset.name;
    if (name) formData[name] = opt.dataset.value;
  });

  // Collect checkbox selections from custom UI
  document.querySelectorAll('.checkbox-group').forEach(group => {
    const name = group.dataset.name;
    if (!name) return;
    const selected = [...group.querySelectorAll('.checkbox-option.selected')]
      .map(o => o.dataset.value);
    formData[name] = selected;
  });

  // Détecter si l'URL est un Google Apps Script (mode no-cors nécessaire)
  const isGAS = WEBHOOK_URL.includes('script.google.com');

  try {
    if (isGAS) {
      // Google Apps Script : no-cors (on ne peut pas lire la réponse, mais les données arrivent)
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData)
      });
      // Afficher le succès immédiatement (les données sont envoyées)
      showSuccess();
    } else {
      // n8n ou autre webhook standard
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok || res.status === 0) {
        showSuccess();
      } else {
        throw new Error('Erreur serveur ' + res.status);
      }
    }
  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = 'Envoyer ma demande';
    showToast('Une erreur est survenue. Veuillez réessayer ou contacter DAP directement.', 'error');
  }
}

// ── SUCCESS SCREEN ───────────────────────────────────────

function showSuccess() {
  document.querySelector('.form-steps-wrapper').style.display = 'none';
  const nav = document.querySelector('.step-content.active .nav-buttons');
  if (nav) nav.remove();
  document.querySelector('.success-screen').classList.add('visible');
}

// ── TOAST NOTIFICATION ──────────────────────────────────

function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:${type === 'error' ? '#ef4444' : '#1a1a2e'}; color:white;
    padding:12px 24px; border-radius:10px; font-size:14px; font-weight:600;
    box-shadow:0 8px 24px rgba(0,0,0,0.2); z-index:9999;
    animation:fadeIn 0.2s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── INIT ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initSteps();
  initRadioGroups();
  initNumberTriggers();
});
