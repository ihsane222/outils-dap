#!/usr/bin/env python3
"""
DAP — Création automatique des 4 formulaires Google Forms
Assurance Auto, Habitation, Copropriété, RC Professionnelle

Usage:
    pip install google-auth-oauthlib google-api-python-client
    python create_dap_forms.py
"""

import os
import pickle
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = [
    'https://www.googleapis.com/auth/forms.body',
    'https://www.googleapis.com/auth/drive'
]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_FILE = os.path.join(BASE_DIR, 'credentials.json')
TOKEN_FILE = os.path.join(BASE_DIR, 'token.pickle')

# ─────────────────────────────────────────────
# AUTHENTIFICATION
# ─────────────────────────────────────────────

def authenticate():
    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as f:
            creds = pickle.load(f)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, 'wb') as f:
            pickle.dump(creds, f)
    return creds

# ─────────────────────────────────────────────
# BUILDER DE REQUÊTES
# ─────────────────────────────────────────────

def build_item(q, index):
    item = {"title": q["title"]}
    if "description" in q:
        item["description"] = q["description"]

    t = q["type"]

    if t == "section":
        item["pageBreakItem"] = {}

    elif t in ("text_short", "number"):
        item["questionItem"] = {
            "question": {
                "required": q.get("required", False),
                "textQuestion": {"paragraph": False}
            }
        }

    elif t == "text_long":
        item["questionItem"] = {
            "question": {
                "required": q.get("required", False),
                "textQuestion": {"paragraph": True}
            }
        }

    elif t == "date":
        item["questionItem"] = {
            "question": {
                "required": q.get("required", False),
                "dateQuestion": {"includeTime": False, "includeYear": True}
            }
        }

    elif t == "radio":
        item["questionItem"] = {
            "question": {
                "required": q.get("required", False),
                "choiceQuestion": {
                    "type": "RADIO",
                    "options": [{"value": o} for o in q["options"]]
                }
            }
        }

    elif t == "checkbox":
        item["questionItem"] = {
            "question": {
                "required": q.get("required", False),
                "choiceQuestion": {
                    "type": "CHECKBOX",
                    "options": [{"value": o} for o in q["options"]]
                }
            }
        }

    return {"createItem": {"item": item, "location": {"index": index}}}


def create_form(service, title, description, questions):
    # 1. Créer le formulaire vide
    result = service.forms().create(body={"info": {"title": title, "documentTitle": title}}).execute()
    form_id = result['formId']

    # 2. Ajouter la description
    service.forms().batchUpdate(formId=form_id, body={
        "requests": [{"updateFormInfo": {"info": {"description": description}, "updateMask": "description"}}]
    }).execute()

    # 3. Ajouter les questions en lots de 50
    batch_size = 50
    for batch_start in range(0, len(questions), batch_size):
        batch = questions[batch_start:batch_start + batch_size]
        requests = [build_item(q, batch_start + i) for i, q in enumerate(batch)]
        service.forms().batchUpdate(formId=form_id, body={"requests": requests}).execute()

    url = f"https://docs.google.com/forms/d/{form_id}/edit"
    return form_id, url


# ─────────────────────────────────────────────
# FORMULAIRE 1 — AUTO
# ─────────────────────────────────────────────

FORM_AUTO = {
    "title": "Demande d'offre — Assurance Auto | DAP",
    "description": "Merci de compléter ce formulaire afin que DAP puisse vous établir une offre personnalisée. Toutes les informations transmises sont traitées de façon confidentielle.",
    "questions": [
        {"type": "section", "title": "1 — Preneur d'assurance"},
        {"type": "text_short", "title": "Nom", "required": True},
        {"type": "text_short", "title": "Prénom", "required": True},
        {"type": "date",       "title": "Date de naissance", "required": True},
        {"type": "text_long",  "title": "Adresse complète (rue, numéro, code postal, commune)", "required": True},
        {"type": "text_short", "title": "Téléphone", "required": True, "description": "Format : 04XX XX XX XX"},
        {"type": "text_short", "title": "Email", "required": True},
        {"type": "radio",      "title": "Profession / Statut", "required": True,
         "options": ["Salarié", "Indépendant", "Fonctionnaire", "Étudiant", "Sans emploi", "Pensionné", "Autre"]},
        {"type": "text_short", "title": "Si indépendant ou société : numéro BCE", "required": False,
         "description": "Format : BE 0XXX.XXX.XXX"},

        {"type": "section", "title": "2 — Conducteur habituel",
         "description": "Si le conducteur habituel est différent du preneur, compléter les champs suivants."},
        {"type": "radio", "title": "Le conducteur habituel est-il le preneur ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short", "title": "Nom du conducteur habituel", "required": False,
         "description": "À compléter si différent du preneur"},
        {"type": "text_short", "title": "Prénom du conducteur habituel", "required": False},
        {"type": "date",       "title": "Date de naissance du conducteur habituel", "required": False},
        {"type": "radio",      "title": "Lien avec le preneur (conducteur habituel)", "required": False,
         "options": ["Conjoint / Cohabitant", "Enfant", "Parent", "Autre"]},
        {"type": "date",       "title": "Date d'obtention du permis (conducteur habituel)", "required": False},
        {"type": "number",     "title": "Nombre de sinistres responsables — 5 dernières années (conducteur habituel)", "required": False,
         "description": "Indiquer 0 si aucun"},
        {"type": "radio",      "title": "Déchéance du droit à conduire dans les 3 dernières années ? (conducteur habituel)", "required": False,
         "options": ["Oui", "Non"]},
        {"type": "text_long",  "title": "Si déchéance : motif et date", "required": False},

        {"type": "section", "title": "3 — Conducteur occasionnel",
         "description": "À compléter uniquement s'il y a un conducteur occasionnel."},
        {"type": "radio", "title": "Y a-t-il un conducteur occasionnel ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short", "title": "Nom du conducteur occasionnel", "required": False,
         "description": "À compléter si Oui"},
        {"type": "text_short", "title": "Prénom du conducteur occasionnel", "required": False},
        {"type": "date",       "title": "Date de naissance du conducteur occasionnel", "required": False},
        {"type": "radio",      "title": "Lien avec le preneur (conducteur occasionnel)", "required": False,
         "options": ["Conjoint / Cohabitant", "Enfant", "Parent", "Autre"]},
        {"type": "date",       "title": "Date d'obtention du permis (conducteur occasionnel)", "required": False},
        {"type": "number",     "title": "Nombre de sinistres responsables — 5 dernières années (conducteur occasionnel)", "required": False,
         "description": "Indiquer 0 si aucun"},
        {"type": "radio",      "title": "Déchéance du droit à conduire dans les 3 dernières années ? (conducteur occasionnel)", "required": False,
         "options": ["Oui", "Non"]},
        {"type": "text_long",  "title": "Si déchéance : motif et date (conducteur occasionnel)", "required": False},

        {"type": "section", "title": "4 — Données du véhicule"},
        {"type": "text_short", "title": "Marque du véhicule", "required": True},
        {"type": "text_short", "title": "Modèle", "required": True},
        {"type": "radio",      "title": "Carburant", "required": True,
         "options": ["Essence", "Diesel", "Hybride", "Hybride rechargeable", "Électrique", "GPL", "Autre"]},
        {"type": "number",     "title": "Puissance fiscale (kW)", "required": True},
        {"type": "date",       "title": "Date de première mise en circulation", "required": True},
        {"type": "number",     "title": "Valeur catalogue HTVA (€)", "required": True,
         "description": "Valeur neuve hors options"},
        {"type": "radio",      "title": "Usage du véhicule", "required": True,
         "options": ["Privé uniquement", "Privé + trajets domicile-travail", "Professionnel occasionnel", "Professionnel intensif"]},
        {"type": "radio",      "title": "Kilométrage annuel estimé", "required": True,
         "options": ["Moins de 10 000 km", "10 000 – 20 000 km", "20 000 – 30 000 km", "Plus de 30 000 km"]},
        {"type": "text_long",  "title": "Options / équipements spéciaux à déclarer", "required": False,
         "description": "Ex. : GPS intégré, jantes alu, toit ouvrant..."},

        {"type": "section", "title": "5 — Antécédents sinistres"},
        {"type": "number",    "title": "Nombre de sinistres déclarés au cours des 5 dernières années", "required": True,
         "description": "Indiquer 0 si aucun"},
        {"type": "text_long", "title": "Date(s) du ou des sinistres", "required": False,
         "description": "À compléter si au moins 1 sinistre — une date par ligne"},
        {"type": "text_long", "title": "Montant(s) total(aux) réglé(s) par l'assureur (€)", "required": False},
        {"type": "radio",     "title": "Votre responsabilité était-elle engagée ?", "required": False,
         "options": ["Entièrement responsable", "Partiellement responsable", "Non responsable"]},
        {"type": "text_long", "title": "Description succincte des sinistres", "required": False},

        {"type": "section", "title": "6 — Assurance actuelle"},
        {"type": "radio",     "title": "Êtes-vous actuellement assuré(e) pour ce véhicule ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short","title": "Nom de la compagnie actuelle", "required": False,
         "description": "À compléter si Oui"},
        {"type": "text_short","title": "Numéro de contrat actuel", "required": False},
        {"type": "number",    "title": "Prime annuelle actuelle (€)", "required": False},
        {"type": "date",      "title": "Date d'échéance du contrat actuel", "required": False},
        {"type": "radio",     "title": "Motif du changement d'assureur", "required": False,
         "options": ["Prix", "Couverture insuffisante", "Service", "Résiliation par l'assureur", "Autre"]},

        {"type": "section", "title": "7 — Couvertures souhaitées"},
        {"type": "radio",    "title": "Formule souhaitée", "required": True,
         "options": ["RC (obligatoire) uniquement", "RC + Mini omnium", "RC + Omnium complète"]},
        {"type": "checkbox", "title": "Options supplémentaires souhaitées", "required": False,
         "options": ["Assistance", "Protection juridique", "Conducteur", "Objets dans le véhicule"]},

        {"type": "section", "title": "8 — Paiement"},
        {"type": "radio",     "title": "Fréquence de paiement souhaitée", "required": True,
         "options": ["Annuel", "Semestriel", "Mensuel"]},
        {"type": "text_short","title": "IBAN pour domiciliation", "required": False,
         "description": "Format : BE XX XXXX XXXX XXXX"},

        {"type": "section", "title": "9 — DAP Solidarity"},
        {"type": "radio", "title": "DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ?",
         "required": True,
         "options": ["Médecins Sans Frontières", "Croix-Rouge de Belgique", "WWF Belgique",
                     "Unicef Belgique", "Greenpeace Belgique", "Oxfam Belgique", "Au choix du courtier"]},

        {"type": "section", "title": "10 — Remarques"},
        {"type": "text_long", "title": "Remarques ou informations complémentaires", "required": False},
    ]
}

# ─────────────────────────────────────────────
# FORMULAIRE 2 — HABITATION
# ─────────────────────────────────────────────

FORM_HABITATION = {
    "title": "Demande d'offre — Assurance Habitation / Incendie | DAP",
    "description": "Merci de compléter ce formulaire pour votre demande d'assurance habitation. Toutes les informations transmises sont traitées de façon confidentielle par DAP.",
    "questions": [
        {"type": "section", "title": "1 — Identité du preneur"},
        {"type": "text_short", "title": "Nom", "required": True},
        {"type": "text_short", "title": "Prénom", "required": True},
        {"type": "date",       "title": "Date de naissance", "required": True},
        {"type": "text_long",  "title": "Adresse personnelle (rue, numéro, code postal, commune)", "required": True},
        {"type": "text_short", "title": "Téléphone", "required": True, "description": "Format : 04XX XX XX XX"},
        {"type": "text_short", "title": "Email", "required": True},

        {"type": "section", "title": "2 — Qualité par rapport au bien"},
        {"type": "radio", "title": "Votre qualité par rapport au bien à assurer", "required": True,
         "options": ["Propriétaire occupant", "Locataire", "Propriétaire non-occupant", "Co-locataire", "Usufruitier", "Nu-propriétaire"]},
        {"type": "number", "title": "Loyer mensuel hors charges (€)", "required": False,
         "description": "À compléter si Locataire ou Co-locataire"},

        {"type": "section", "title": "3 — Adresse du bien à assurer"},
        {"type": "radio",     "title": "L'adresse du bien est-elle différente de votre adresse personnelle ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_long", "title": "Adresse complète du bien à assurer", "required": False,
         "description": "À compléter si différente de l'adresse personnelle"},

        {"type": "section", "title": "4 — Description du bien"},
        {"type": "radio",  "title": "Type de bien", "required": True,
         "options": ["Appartement", "Maison unifamiliale", "Villa", "Kot / Studio", "Autre"]},
        {"type": "number", "title": "Superficie habitable totale (m²)", "required": True},
        {"type": "number", "title": "Année de construction", "required": True, "description": "Format : AAAA"},
        {"type": "radio",  "title": "Type de chauffage principal", "required": True,
         "options": ["Mazout", "Gaz naturel", "Pompe à chaleur", "Électrique", "Pellets / Bois", "Autre"]},
        {"type": "radio",  "title": "La façade est-elle classée (patrimoine) ?", "required": True, "options": ["Oui", "Non"]},
        {"type": "radio",  "title": "Hauteur sous plafond supérieure à 3 m ?", "required": True, "options": ["Oui", "Non"]},
        {"type": "radio",  "title": "Type de toiture", "required": True,
         "options": ["Ardoises naturelles", "Ardoises artificielles", "Tuiles", "Toiture plate", "Chaume", "Autre"]},
        {"type": "radio",  "title": "Matériaux nobles présents (marbre, parquet massif, plafonds sculptés...) ?", "required": True,
         "options": ["Oui", "Non"]},

        {"type": "section", "title": "5 — Composition du bien (nombre de pièces)",
         "description": "Indiquer le nombre de pièces par type. Mettre 0 si inexistant."},
        {"type": "number", "title": "Cuisine(s)", "required": True},
        {"type": "number", "title": "Living(s) / Salon(s)", "required": True},
        {"type": "number", "title": "Chambre(s)", "required": True},
        {"type": "number", "title": "Salle(s) de bain", "required": True},
        {"type": "number", "title": "Salle(s) de bien-être (sauna, hammam...)", "required": False},
        {"type": "number", "title": "Salle(s) de jeux", "required": False},
        {"type": "number", "title": "Bureau(x)", "required": False},
        {"type": "number", "title": "Dressing(s)", "required": False},
        {"type": "number", "title": "Bibliothèque(s)", "required": False},
        {"type": "number", "title": "Cave(s)", "required": False},
        {"type": "number", "title": "Grenier(s)", "required": False},

        {"type": "section", "title": "6 — Spécificités appartement",
         "description": "À compléter si le bien est un appartement ou un kot/studio."},
        {"type": "number", "title": "Étage de l'appartement", "required": False, "description": "0 = rez-de-chaussée"},
        {"type": "number", "title": "Nombre total d'étages de l'immeuble", "required": False},
        {"type": "radio",  "title": "Hébergement touristique (Airbnb...) ?", "required": False, "options": ["Oui", "Non"]},
        {"type": "radio",  "title": "Exercice d'une activité professionnelle dans le bien ?", "required": False,
         "options": ["Oui", "Non"]},

        {"type": "section", "title": "7 — Dépendances et équipements"},
        {"type": "radio",    "title": "Cave aménagée ?", "required": False,
         "options": ["Oui", "Non", "Pas de cave"]},
        {"type": "radio",    "title": "Grenier aménagé ?", "required": False,
         "options": ["Oui", "Non", "Pas de grenier"]},
        {"type": "checkbox", "title": "Équipements présents sur le bien", "required": False,
         "options": ["Chaufferie", "Buanderie", "Balcon", "Terrasse", "Jardin", "Piscine",
                     "Panneaux solaires (photovoltaïques)", "Éolienne", "Feu ouvert / Cheminée",
                     "Toiture terrasse", "Ossature bois"]},
        {"type": "number",   "title": "Superficie de la piscine (m²)", "required": False,
         "description": "À compléter si piscine cochée ci-dessus"},

        {"type": "section", "title": "8 — État du bâtiment"},
        {"type": "radio", "title": "État général du bâtiment", "required": True,
         "options": ["Standard", "Rénové il y a moins de 10 ans", "En cours de construction",
                     "En rénovation lourde", "Éco-construction", "Bâtiment passif"]},
        {"type": "radio", "title": "Des travaux importants (> 25 000 €) sont-ils prévus dans les 12 prochains mois ?",
         "required": True, "options": ["Oui", "Non"]},

        {"type": "section", "title": "9 — Antécédents sinistres"},
        {"type": "number",   "title": "Nombre de sinistres habitation déclarés au cours des 5 dernières années",
         "required": True, "description": "Indiquer 0 si aucun"},
        {"type": "checkbox", "title": "Nature du ou des sinistres", "required": False,
         "description": "À compléter si au moins 1 sinistre",
         "options": ["Incendie", "Dégât des eaux", "Tempête", "Vol / Vandalisme", "Bris de vitre", "Autre"]},
        {"type": "text_long","title": "Montant(s) total(aux) réglé(s) (€)", "required": False,
         "description": "Un montant par sinistre si plusieurs"},
        {"type": "radio",    "title": "Refoulement d'égout, inondation ou fissures structurelles dans les 10 dernières années ?",
         "required": True, "options": ["Oui", "Non"]},

        {"type": "section", "title": "10 — Assurance actuelle"},
        {"type": "radio",     "title": "Êtes-vous actuellement assuré(e) pour ce bien ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short","title": "Nom de la compagnie actuelle", "required": False,
         "description": "À compléter si Oui"},
        {"type": "text_short","title": "Numéro de contrat actuel", "required": False},
        {"type": "number",    "title": "Prime annuelle actuelle (€)", "required": False},
        {"type": "date",      "title": "Date d'échéance du contrat actuel", "required": False},
        {"type": "radio",     "title": "Créance hypothécaire (prêt immobilier) sur ce bien ?", "required": False,
         "options": ["Oui", "Non"]},
        {"type": "text_short","title": "Si oui : nom de la banque créancière", "required": False},

        {"type": "section", "title": "11 — Couvertures souhaitées"},
        {"type": "checkbox", "title": "Couvertures souhaitées", "required": True,
         "options": ["Incendie & périls connexes (obligatoire)", "Dégât des eaux", "Tempête / Grêle / Neige",
                     "Vol & Vandalisme", "Bris de vitre", "RC Vie privée", "Protection juridique"]},
        {"type": "radio",  "title": "Souhaitez-vous couvrir le contenu (mobilier, effets personnels) ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "number", "title": "Valeur estimée du contenu (€)", "required": False,
         "description": "À compléter si oui"},

        {"type": "section", "title": "12 — Paiement"},
        {"type": "radio",     "title": "Fréquence de paiement souhaitée", "required": True,
         "options": ["Annuel", "Semestriel", "Trimestriel", "Mensuel"]},
        {"type": "text_short","title": "IBAN pour domiciliation", "required": False,
         "description": "Format : BE XX XXXX XXXX XXXX"},

        {"type": "section", "title": "13 — DAP Solidarity"},
        {"type": "radio", "title": "DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ?",
         "required": True,
         "options": ["Médecins Sans Frontières", "Croix-Rouge de Belgique", "WWF Belgique",
                     "Unicef Belgique", "Greenpeace Belgique", "Oxfam Belgique", "Au choix du courtier"]},

        {"type": "section", "title": "14 — Remarques"},
        {"type": "text_long", "title": "Remarques ou informations complémentaires", "required": False},
    ]
}

# ─────────────────────────────────────────────
# FORMULAIRE 3 — COPROPRIÉTÉ
# ─────────────────────────────────────────────

FORM_COPROPRIETE = {
    "title": "Demande d'offre — Assurance Copropriété | DAP",
    "description": "Ce formulaire est à compléter par le syndic ou le conseil de copropriété. Il permet à DAP d'établir une offre personnalisée pour l'assurance de votre immeuble.",
    "questions": [
        {"type": "section", "title": "1 — Syndic / Gestionnaire"},
        {"type": "text_short", "title": "Nom de la société de syndic", "required": True},
        {"type": "text_short", "title": "Nom du contact référent", "required": True},
        {"type": "text_short", "title": "Téléphone", "required": True},
        {"type": "text_short", "title": "Email", "required": True},
        {"type": "text_short", "title": "Numéro BCE de la société de syndic", "required": False,
         "description": "Format : BE 0XXX.XXX.XXX"},
        {"type": "radio", "title": "Le syndic est-il professionnel (agréé IPI) ?", "required": True,
         "options": ["Oui", "Non (syndic bénévole)"]},

        {"type": "section", "title": "2 — Identification de l'immeuble"},
        {"type": "text_long",  "title": "Adresse complète de l'immeuble", "required": True,
         "description": "Rue, numéro, code postal, commune"},
        {"type": "text_short", "title": "Nom de la copropriété (si applicable)", "required": False,
         "description": "Ex. : Résidence Les Érables"},
        {"type": "text_short", "title": "Numéro BCE de l'ACP", "required": False,
         "description": "Association des Copropriétaires — Format : BE 0XXX.XXX.XXX"},
        {"type": "number", "title": "Année de construction de l'immeuble", "required": True, "description": "Format : AAAA"},
        {"type": "number", "title": "Nombre total de lots (appartements + autres)", "required": True},
        {"type": "number", "title": "Dont : nombre de lots résidentiels (appartements)", "required": True},
        {"type": "number", "title": "Dont : nombre de lots commerciaux / professionnels", "required": True},
        {"type": "number", "title": "Nombre total d'étages (hors cave et grenier)", "required": True},
        {"type": "radio",  "title": "Type d'immeuble", "required": True,
         "options": ["100 % résidentiel", "Mixte résidentiel / commercial", "Majoritairement commercial", "Usage spécifique (bureaux, clinique...)"]},

        {"type": "section", "title": "3 — Caractéristiques de l'immeuble"},
        {"type": "radio",    "title": "Type de toiture", "required": True,
         "options": ["Ardoises naturelles", "Ardoises artificielles", "Tuiles", "Toiture plate", "Chaume", "Mixte"]},
        {"type": "radio",    "title": "La façade est-elle classée (patrimoine) ?", "required": True, "options": ["Oui", "Non"]},
        {"type": "radio",    "title": "Type de chauffage des parties communes", "required": True,
         "options": ["Chauffage central collectif (mazout)", "Chauffage central collectif (gaz)",
                     "Pas de chauffage central commun", "Autre"]},
        {"type": "checkbox", "title": "Équipements présents dans l'immeuble", "required": False,
         "options": ["Ascenseur(s)", "Parking souterrain", "Local vélos sécurisé", "Conciergerie / gardiennage",
                     "Borne de recharge électrique", "Local poubelles", "Citerne à mazout collective",
                     "Panneaux solaires (toiture commune)", "Toiture terrasse"]},
        {"type": "radio", "title": "Hauteur sous plafond parties communes supérieure à 3 m ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "radio", "title": "Matériaux nobles dans les parties communes (marbre, parquet, stucs...) ?",
         "required": True, "options": ["Oui", "Non"]},

        {"type": "section", "title": "4 — Surfaces"},
        {"type": "number", "title": "Surface totale des parties communes (m²)", "required": True,
         "description": "Couloirs, cages d'escalier, locaux communs..."},
        {"type": "number", "title": "Surface totale des parties privatives (m²)", "required": True,
         "description": "Somme des surfaces de tous les lots"},
        {"type": "number", "title": "Valeur de reconstruction estimée de l'immeuble (€)", "required": False,
         "description": "Si disponible (ex. : expertise, PV d'AG)"},

        {"type": "section", "title": "5 — Espaces communs et aménagements"},
        {"type": "checkbox", "title": "Espaces communs présents", "required": False,
         "options": ["Piscine commune", "Sauna / Hammam commun", "Salle de réunion / fêtes",
                     "Terrasse commune", "Jardin commun", "Terrain de sport", "Local technique", "Autre"]},
        {"type": "radio", "title": "Y a-t-il des caves ?", "required": False,
         "options": ["Oui, aménagées", "Oui, non aménagées", "Non"]},
        {"type": "radio", "title": "Y a-t-il des garages ou boxs privatifs ?", "required": False,
         "options": ["Oui", "Non"]},

        {"type": "section", "title": "6 — Travaux et état du bâtiment"},
        {"type": "radio", "title": "État général de l'immeuble", "required": True,
         "options": ["Excellent (< 10 ans ou rénové récemment)", "Bon", "Moyen (entretien courant nécessaire)", "À rénover"]},
        {"type": "radio", "title": "Travaux importants (> 50 000 €) prévus ou votés en AG dans les 12 prochains mois ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "text_long", "title": "Nature et montant estimé des travaux prévus", "required": False,
         "description": "À compléter si Oui — Ex. : Réfection toiture (80 000 €)"},

        {"type": "section", "title": "7 — Antécédents sinistres"},
        {"type": "number",   "title": "Nombre de sinistres sur les parties communes — 5 dernières années",
         "required": True, "description": "Indiquer 0 si aucun"},
        {"type": "checkbox", "title": "Nature du ou des sinistres", "required": False,
         "description": "À compléter si au moins 1 sinistre",
         "options": ["Incendie", "Dégât des eaux", "Tempête", "Vol / Vandalisme", "Bris de vitre", "Dommages ascenseur", "Autre"]},
        {"type": "text_long","title": "Montant total réglé par l'assureur (€)", "required": False},
        {"type": "radio",    "title": "Refoulement d'égout, inondation ou fissures structurelles dans les 10 dernières années ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "radio",    "title": "Résiliation du contrat par un assureur au cours des 3 dernières années ?",
         "required": True, "options": ["Oui", "Non"]},

        {"type": "section", "title": "8 — Assurance actuelle"},
        {"type": "radio",     "title": "L'immeuble est-il actuellement assuré ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short","title": "Nom de la compagnie actuelle", "required": False,
         "description": "À compléter si Oui"},
        {"type": "text_short","title": "Numéro de contrat actuel", "required": False},
        {"type": "number",    "title": "Prime annuelle actuelle (€)", "required": False},
        {"type": "date",      "title": "Date d'échéance du contrat actuel", "required": False},
        {"type": "checkbox",  "title": "Couvertures actuellement en vigueur", "required": False,
         "options": ["Incendie / RC Immeuble", "Dégât des eaux", "Tempête", "Vol",
                     "Bris de vitre", "RC Syndic", "Protection juridique"]},

        {"type": "section", "title": "9 — Couvertures souhaitées"},
        {"type": "checkbox", "title": "Couvertures souhaitées", "required": True,
         "options": ["Incendie & périls connexes (obligatoire)", "Dégât des eaux", "Tempête / Grêle / Neige",
                     "Vol & Vandalisme parties communes", "Bris de vitre parties communes",
                     "RC Immeuble & Syndic", "Protection juridique", "Ascenseur (maintenance et bris)"]},
        {"type": "radio", "title": "Souhaitez-vous une garantie pertes de loyers pour les lots résidentiels ?",
         "required": False, "options": ["Oui", "Non"]},

        {"type": "section", "title": "10 — Paiement"},
        {"type": "radio",     "title": "Fréquence de paiement souhaitée", "required": True,
         "options": ["Annuel", "Semestriel", "Mensuel"]},
        {"type": "text_short","title": "IBAN du compte de l'ACP pour domiciliation", "required": False,
         "description": "Format : BE XX XXXX XXXX XXXX"},

        {"type": "section", "title": "11 — DAP Solidarity"},
        {"type": "radio", "title": "DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ?",
         "required": True,
         "options": ["Médecins Sans Frontières", "Croix-Rouge de Belgique", "WWF Belgique",
                     "Unicef Belgique", "Greenpeace Belgique", "Oxfam Belgique", "Au choix du courtier"]},

        {"type": "section", "title": "12 — Documents et remarques"},
        {"type": "text_long", "title": "Remarques ou informations complémentaires", "required": False},
        {"type": "text_long", "title": "Documents disponibles à transmettre", "required": False,
         "description": "Ex. : Dernier PV d'AG, plan de l'immeuble, attestation valeur reconstruction, police actuelle"},
    ]
}

# ─────────────────────────────────────────────
# FORMULAIRE 4 — RC PROFESSIONNELLE
# ─────────────────────────────────────────────

FORM_RCPRO = {
    "title": "Demande d'offre — RC Professionnelle | DAP",
    "description": "Ce formulaire permet à DAP d'analyser les risques de votre activité professionnelle et de vous proposer une couverture RC Pro adaptée au marché belge. Toutes les informations sont traitées de façon confidentielle.",
    "questions": [
        {"type": "section", "title": "1 — Identification de l'entreprise"},
        {"type": "text_short", "title": "Raison sociale", "required": True},
        {"type": "radio",      "title": "Forme juridique", "required": True,
         "options": ["SRL", "SA", "SNC", "SCS", "ASBL", "Indépendant personne physique", "Autre"]},
        {"type": "text_short", "title": "Numéro BCE", "required": True,
         "description": "Format : BE 0XXX.XXX.XXX"},
        {"type": "text_long",  "title": "Adresse du siège social", "required": True,
         "description": "Rue, numéro, code postal, commune"},
        {"type": "text_short", "title": "Téléphone", "required": True},
        {"type": "text_short", "title": "Email", "required": True},
        {"type": "text_short", "title": "Nom et prénom du contact référent", "required": True,
         "description": "Gérant, CEO, associé principal..."},
        {"type": "number",     "title": "Année de création de l'entreprise", "required": True,
         "description": "Format : AAAA"},

        {"type": "section", "title": "2 — Activité professionnelle"},
        {"type": "text_long", "title": "Description précise de l'activité principale", "required": True,
         "description": "Ex. : Conseil en stratégie digitale pour PME, développement de logiciels sur mesure..."},
        {"type": "radio",     "title": "Secteur d'activité principal", "required": True,
         "options": ["IT / Numérique", "Conseil / Management", "Ingénierie / Technique", "Formation / Coaching",
                     "Architecture / Urbanisme", "Comptabilité / Audit", "Juridique",
                     "Communication / Marketing", "Santé / Para-médical", "Immobilier", "Autre"]},
        {"type": "text_short","title": "Code NACE principal", "required": False,
         "description": "Ex. : 6201 (développement logiciels) — consultable sur economie.fgov.be"},
        {"type": "radio",     "title": "Y a-t-il des activités secondaires à déclarer ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_long", "title": "Description des activités secondaires", "required": False,
         "description": "À compléter si Oui"},

        {"type": "section", "title": "3 — Chiffre d'affaires et effectif"},
        {"type": "number", "title": "CA total HT — dernier exercice clôturé (€)", "required": True},
        {"type": "number", "title": "Dont : CA réalisé en Belgique (€)", "required": True},
        {"type": "number", "title": "Dont : CA réalisé dans l'UE hors Belgique (€)", "required": True},
        {"type": "number", "title": "Dont : CA réalisé hors UE (€)", "required": True},
        {"type": "number", "title": "CA prévisionnel — exercice en cours (€)", "required": False,
         "description": "Estimation"},
        {"type": "number", "title": "Nombre d'ETP (équivalents temps plein)", "required": True,
         "description": "Indépendants compris"},
        {"type": "number", "title": "Dont : nombre d'indépendants / sous-traitants permanents", "required": True},

        {"type": "section", "title": "4 — Territoire d'activité"},
        {"type": "radio", "title": "Zone géographique d'activité", "required": True,
         "description": "⚠️ La couverture USA/Canada implique une surprime significative.",
         "options": ["Belgique uniquement", "Belgique + Union européenne",
                     "Monde entier (hors USA et Canada)", "Monde entier (USA et Canada inclus)"]},

        {"type": "section", "title": "5 — Nature des prestations"},
        {"type": "checkbox", "title": "Nature principale des prestations fournies", "required": True,
         "options": ["Conseil / Recommandation", "Développement informatique (code, logiciel)",
                     "Ingénierie / Études techniques", "Formation / Transfert de compétences",
                     "Audit / Diagnostic", "Certification / Contrôle", "Design / Création",
                     "Gestion de projet", "Médiation / Arbitrage", "Autre"]},
        {"type": "radio", "title": "Vos prestations impliquent-elles la manipulation de données personnelles (RGPD) ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "radio", "title": "Vos prestations impliquent-elles la gestion de fonds ou d'actifs de tiers ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "radio", "title": "Vos prestations peuvent-elles avoir un impact sur la santé ou sécurité physique de personnes ?",
         "required": True, "options": ["Oui", "Non"]},

        {"type": "section", "title": "6 — Cadre contractuel"},
        {"type": "radio", "title": "Vos missions sont-elles formalisées par des contrats écrits signés ?",
         "required": True, "options": ["Toujours", "En général", "Rarement", "Jamais"]},
        {"type": "radio", "title": "Vos contrats comportent-ils des clauses de limitation de responsabilité ?",
         "required": True, "options": ["Oui, systématiquement", "Parfois", "Non"]},
        {"type": "radio", "title": "Livrez-vous des livrables (rapports, codes, plans, études...) à vos clients ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "radio", "title": "Vos clients vous imposent-ils des engagements de résultat (vs obligation de moyens) ?",
         "required": True, "options": ["Souvent", "Parfois", "Jamais"]},

        {"type": "section", "title": "7 — Sous-traitance"},
        {"type": "radio", "title": "Faites-vous appel à de la sous-traitance ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "number", "title": "Part de la sous-traitance dans le CA total (%)", "required": False,
         "description": "À compléter si Oui — entre 0 et 100"},
        {"type": "radio",  "title": "Vérifiez-vous que vos sous-traitants sont eux-mêmes assurés en RC Pro ?",
         "required": False,
         "options": ["Oui, systématiquement", "Parfois", "Non"]},
        {"type": "radio",  "title": "Vous portez-vous garant des erreurs de vos sous-traitants vis-à-vis de vos clients ?",
         "required": False,
         "options": ["Oui", "Non", "Cela dépend du contrat"]},

        {"type": "section", "title": "8 — Garanties souhaitées"},
        {"type": "checkbox", "title": "Couvertures souhaitées", "required": True,
         "options": ["RC Exploitation (dommages matériels/corporels causés à des tiers)",
                     "RC Professionnelle (erreur, omission, conseil défectueux)",
                     "Cyber-responsabilité (violation de données, cyberattaque)",
                     "Protection juridique professionnelle",
                     "RC Dirigeant (D&O)"]},
        {"type": "radio", "title": "Capital garanti souhaité par sinistre", "required": True,
         "options": ["250 000 €", "500 000 €", "1 000 000 €", "1 500 000 €", "2 500 000 €",
                     "À définir avec le courtier"]},
        {"type": "radio", "title": "Franchise souhaitée", "required": False,
         "options": ["Pas de franchise", "500 €", "1 000 €", "2 500 €", "À définir avec le courtier"]},

        {"type": "section", "title": "9 — Antécédents sinistres et résiliations"},
        {"type": "number",    "title": "Nombre de sinistres RC Pro déclarés au cours des 5 dernières années",
         "required": True, "description": "Indiquer 0 si aucun"},
        {"type": "text_long", "title": "Nature des sinistres déclarés", "required": False,
         "description": "À compléter si au moins 1 sinistre"},
        {"type": "text_long", "title": "Montant total réglé par l'assureur (€)", "required": False},
        {"type": "radio",     "title": "Y a-t-il des réclamations en cours ou annoncées ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "text_long", "title": "Description de la réclamation en cours", "required": False,
         "description": "À compléter si Oui"},
        {"type": "radio",     "title": "Votre contrat RC Pro a-t-il été résilié par un assureur au cours des 3 dernières années ?",
         "required": True, "options": ["Oui", "Non"]},
        {"type": "text_long", "title": "Motif de la résiliation par l'assureur", "required": False,
         "description": "À compléter si Oui"},

        {"type": "section", "title": "10 — Affiliations et agréments"},
        {"type": "checkbox", "title": "Obligations réglementaires ou affiliations professionnelles", "required": True,
         "options": ["FSMA (services financiers)", "Ordre des Architectes", "Barreau (avocat)",
                     "ITAA (comptable / conseiller fiscal)", "Ordre des Médecins",
                     "IRE (réviseur d'entreprises)", "Aucune"]},
        {"type": "radio", "title": "Disposez-vous d'une assurance RC Pro spécifique imposée par votre ordre ?",
         "required": True,
         "options": ["Oui, déjà souscrite", "Oui, mais pas encore souscrite", "Non"]},

        {"type": "section", "title": "11 — Assurance actuelle"},
        {"type": "radio",     "title": "Êtes-vous actuellement assuré(e) en RC Pro ?", "required": True,
         "options": ["Oui", "Non"]},
        {"type": "text_short","title": "Nom de la compagnie actuelle", "required": False,
         "description": "À compléter si Oui"},
        {"type": "text_short","title": "Numéro de contrat actuel", "required": False},
        {"type": "number",    "title": "Prime annuelle actuelle (€)", "required": False},
        {"type": "number",    "title": "Capital garanti actuel (€)", "required": False},
        {"type": "date",      "title": "Date d'échéance du contrat actuel", "required": False},

        {"type": "section", "title": "12 — Paiement"},
        {"type": "radio",     "title": "Fréquence de paiement souhaitée", "required": True,
         "options": ["Annuel", "Semestriel", "Mensuel"]},
        {"type": "text_short","title": "IBAN de l'entreprise pour domiciliation", "required": False,
         "description": "Format : BE XX XXXX XXXX XXXX"},

        {"type": "section", "title": "13 — DAP Solidarity"},
        {"type": "radio", "title": "DAP reverse 10 % de sa commission à une association. Laquelle choisissez-vous ?",
         "required": True,
         "options": ["Médecins Sans Frontières", "Croix-Rouge de Belgique", "WWF Belgique",
                     "Unicef Belgique", "Greenpeace Belgique", "Oxfam Belgique", "Au choix du courtier"]},

        {"type": "section", "title": "14 — Remarques"},
        {"type": "text_long", "title": "Remarques, contexte particulier ou informations complémentaires",
         "required": False,
         "description": "Ex. : projet en cours, contrat spécifique à couvrir, export prévu..."},
    ]
}

# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

def main():
    print("🔐 Authentification Google...")
    creds = authenticate()
    service = build('forms', 'v1', credentials=creds)
    print("✅ Authentifié\n")

    forms = [
        ("Auto",          FORM_AUTO),
        ("Habitation",    FORM_HABITATION),
        ("Copropriété",   FORM_COPROPRIETE),
        ("RC Pro",        FORM_RCPRO),
    ]

    results = []
    for name, data in forms:
        print(f"⏳ Création du formulaire {name}...")
        form_id, url = create_form(
            service,
            data["title"],
            data["description"],
            data["questions"]
        )
        results.append((name, form_id, url))
        print(f"✅ {name} créé — {len(data['questions'])} éléments")
        print(f"   🔗 {url}\n")

    print("\n" + "="*60)
    print("📋 RÉCAPITULATIF — LIENS DES FORMULAIRES DAP")
    print("="*60)
    for name, form_id, url in results:
        print(f"\n{name}")
        print(f"  Édition  : {url}")
        print(f"  Partage  : https://docs.google.com/forms/d/{form_id}/viewform")
    print("\n✅ Tous les formulaires ont été créés avec succès.")


if __name__ == "__main__":
    main()
