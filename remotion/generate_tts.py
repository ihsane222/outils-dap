"""
Génération voix off Module 01 — DAP Academy
Utilise OpenAI TTS (voix: alloy, nova, shimmer, echo, fable, onyx)
"""
import os
from pathlib import Path

# ── Colle ta clé OpenAI ici ──────────────────────────────────────────────────
OPENAI_API_KEY = "sk-..."  # remplace par ta vraie clé
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_MODULE_01 = """
Bienvenue dans le Module 1 de la DAP Academy.
Copropriétés et Responsabilité Civile Syndic.

Dans ce module, tu vas maîtriser cinq compétences essentielles.

Premièrement : comprendre les risques spécifiques aux immeubles en copropriété.

Deuxièmement : connaître le rôle et la responsabilité civile du syndic face aux assurances.

Troisièmement : maîtriser les produits Vivium et Axa dédiés à ce marché.

Quatrièmement : appliquer la loi du 18 juin 2018 sur la copropriété.

Et cinquièmement : utiliser BeStronger comme argument commercial différenciant.

Durée estimée : quatre heures, en présentiel.

Bonne formation !
"""

def generate_audio(text: str, output_path: str, voice: str = "nova"):
    from openai import OpenAI
    client = OpenAI(api_key=OPENAI_API_KEY)

    response = client.audio.speech.create(
        model="tts-1",
        voice=voice,   # nova = voix féminine naturelle
        input=text.strip(),
        speed=0.92,    # légèrement plus lent pour la formation
    )

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    response.stream_to_file(output_path)
    print(f"✅ Audio généré : {output_path}")

if __name__ == "__main__":
    output = "public/tts/module_01_voix.mp3"
    generate_audio(SCRIPT_MODULE_01, output)
    print(f"📁 Fichier prêt : {output}")
    print(f"📊 Taille : {Path(output).stat().st_size / 1024:.1f} Ko")
