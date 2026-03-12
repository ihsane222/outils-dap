// ─── Palette DAP Academy — inspirée de dap.be ────────────────────────────────

export const DAP_COLORS = {
  // Charte DAP (dap.be)
  navy:    '#2A4B62',   // bleu marine principal
  sky:     '#37A1D7',   // bleu ciel CTA
  white:   '#FFFFFF',
  offWhite:'#F4F7FA',
  gray:    '#DEDEDE',
  text:    '#242425',
  textMuted: '#7A7A7A',

  // Alias pratiques
  bg:      '#F4F7FA',
  surface: '#FFFFFF',
} as const;

// Couleurs par domaine — déclinées sur la base de la charte DAP
export const DOMAIN_COLORS = {
  assurances:     { bg: '#EFF6FB', primary: '#2A4B62', accent: '#37A1D7', light: '#D6EAF5', dark: '#1B3344' },
  digital:        { bg: '#EFF8F0', primary: '#1D6B2F', accent: '#34A853', light: '#C8EDCF', dark: '#145221' },
  reglementation: { bg: '#FFF7ED', primary: '#C2410C', accent: '#F97316', light: '#FFEDD5', dark: '#9A3408' },
  it:             { bg: '#FFF1F2', primary: '#9B1C1C', accent: '#EF4444', light: '#FECACA', dark: '#7F1D1D' },
  produits:       { bg: '#F5F0FF', primary: '#5B21B6', accent: '#8B5CF6', light: '#DDD6FE', dark: '#4C1D95' },
} as const;

export const getDomainColors = (domaine: string) => {
  const d = domaine.toLowerCase();
  if (d.includes('digital') || d.includes('outil')) return DOMAIN_COLORS.digital;
  if (d.includes('règle') || d.includes('regle') || d.includes('rgpd') || d.includes('aml')) return DOMAIN_COLORS.reglementation;
  if (d.includes('produit')) return DOMAIN_COLORS.produits;            // ← AVANT 'it' !
  if (d === 'it' || d.startsWith('it ') || d.includes(' it') || d.includes('cyber')) return DOMAIN_COLORS.it;
  return DOMAIN_COLORS.assurances;
};

// Polices du site DAP
export const DAP_FONT   = '"Lato", "Poppins", "Segoe UI", system-ui, sans-serif';
export const TITLE_FONT = '"Poppins", "Lato", system-ui, sans-serif';
