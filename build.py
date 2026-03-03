"""build.py — Generates docs/*.html from Chapitres-Volumes/*.md + templates + chapters.json
   Python equivalent of build.js for environments without Node.js.
"""
import json
import os
import re
import shutil
import unicodedata

import markdown

ROOT = os.path.dirname(os.path.abspath(__file__))
CHAPTERS_DIR = os.path.join(ROOT, "Chapitres-Volumes")
TEMPLATES_DIR = os.path.join(ROOT, "templates")
DOCS_DIR = os.path.join(ROOT, "docs")
PUBLIC_SRC = os.path.join(ROOT, "public")
PUBLIC_DEST = os.path.join(DOCS_DIR, "public")

# Load metadata
with open(os.path.join(ROOT, "chapters.json"), encoding="utf-8") as f:
    chapters = json.load(f)

# Load templates
with open(os.path.join(TEMPLATES_DIR, "index.html"), encoding="utf-8") as f:
    index_template = f.read()

with open(os.path.join(TEMPLATES_DIR, "chapter.html"), encoding="utf-8") as f:
    chapter_template = f.read()

# Ensure docs/ exists
os.makedirs(DOCS_DIR, exist_ok=True)

# Copy public/ assets (sync individual files to avoid OneDrive permission issues with rmtree)
if os.path.exists(PUBLIC_SRC):
    os.makedirs(PUBLIC_DEST, exist_ok=True)
    for entry in os.listdir(PUBLIC_SRC):
        src = os.path.join(PUBLIC_SRC, entry)
        dst = os.path.join(PUBLIC_DEST, entry)
        if os.path.isfile(src):
            shutil.copy2(src, dst)
    print("Assets public/ synchronisés")


def slugify(text: str) -> str:
    """Generate an anchor id from heading text (mirrors build.js logic)."""
    text = text.lower()
    text = text.replace("\u2019", "-39-")  # right single quote
    text = text.replace("'", "-39-")
    # French accent normalization
    replacements = {
        "à": "a", "â": "a", "ä": "a",
        "é": "e", "è": "e", "ê": "e", "ë": "e",
        "î": "i", "ï": "i",
        "ô": "o", "ö": "o",
        "ù": "u", "û": "u", "ü": "u",
        "ç": "c",
    }
    for fr_char, replacement in replacements.items():
        text = text.replace(fr_char, replacement)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    text = text.strip("-")
    return text


# --- Build index page ---

def build_card_html(ch):
    badge_html = (
        f'<span class="tag" style="background:{ch["color"]};">{ch["badge"]}</span>'
        if ch.get("badge") else ""
    )
    roman_html = (
        f'<span class="numeral">{ch["roman"]}</span>'
        if ch.get("roman") else ""
    )
    return (
        f'      <a href="{ch["slug"]}.html" class="card" style="--card-accent:{ch["color"]};">\n'
        f'        <div class="card-badge">\n'
        f'          {roman_html}{badge_html}\n'
        f'        </div>\n'
        f'        <h3>{ch["title"]}</h3>\n'
        f'      </a>'
    )

chapters_grid_html = "\n\n".join(build_card_html(ch) for ch in chapters)
index_html = index_template.replace("{{CHAPTERS_GRID}}", chapters_grid_html)
with open(os.path.join(DOCS_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)
print("index.html généré")

# --- Build chapter pages ---

md_converter = markdown.Markdown(extensions=["tables", "fenced_code", "codehilite"])

for ch in chapters:
    md_path = os.path.join(CHAPTERS_DIR, ch["source"])
    if not os.path.exists(md_path):
        print(f"ATTENTION: {ch['source']} introuvable, ignoré")
        continue

    with open(md_path, encoding="utf-8") as f:
        md_text = f.read()

    md_converter.reset()
    html_content = md_converter.convert(md_text)

    # Extract h2 headings and add anchor ids
    headings = []
    def replace_h2(match):
        inner = match.group(1)
        text = re.sub(r"<[^>]+>", "", inner)  # strip inner HTML
        anchor_id = slugify(text)
        headings.append({"id": anchor_id, "text": text})
        return f'<h2 id="{anchor_id}">{inner}</h2>'

    content_with_anchors = re.sub(r"<h2>(.*?)</h2>", replace_h2, html_content, flags=re.IGNORECASE)

    # Build sidebar
    sidebar_html = "\n".join(
        f'        <li><a href="#{h["id"]}">{h["text"]}</a></li>'
        for h in headings
    )

    # Prev/next navigation
    idx = chapters.index(ch)
    prev_html = ""
    next_html = ""

    if idx > 0:
        prev_ch = chapters[idx - 1]
        label = f'Ch. {prev_ch["roman"]}' if prev_ch.get("roman") else prev_ch["shortTitle"]
        prev_html = f'        <a href="{prev_ch["slug"]}.html" class="nav-link">&larr; {label}</a>'

    if idx < len(chapters) - 1:
        next_ch = chapters[idx + 1]
        label = f'Ch. {next_ch["roman"]}' if next_ch.get("roman") else next_ch["shortTitle"]
        next_html = f'        <a href="{next_ch["slug"]}.html" class="nav-link">{label} &rarr;</a>'

    # Assemble page
    page_html = (
        chapter_template
        .replace("{{TITLE}}", ch["title"])
        .replace("{{SIDEBAR}}", sidebar_html)
        .replace("{{CONTENT}}", content_with_anchors)
        .replace("{{PREV_LINK}}", prev_html)
        .replace("{{NEXT_LINK}}", next_html)
    )

    with open(os.path.join(DOCS_DIR, f'{ch["slug"]}.html'), "w", encoding="utf-8") as f:
        f.write(page_html)
    print(f'{ch["slug"]}.html généré')

print("\nBuild terminé avec succès.")
