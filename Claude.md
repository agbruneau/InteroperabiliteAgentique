# CLAUDE.md — InteroperabiliteAgentique

Publication académique sur l'interopérabilité des systèmes d'entreprise et les architectures agentiques. Site statique généré depuis Markdown vers HTML, publié sur GitHub Pages.

## Projet

- **URL** : https://agbruneau.github.io/InteroperabiliteAgentique/
- **Auteur** : André-Guy Bruneau
- **Langue** : Français
- **Contenu** : 12 chapitres + annexes (~11 000 lignes Markdown)

## Thèse centrale

L'interopérabilité existe sur un continuum organisé autour de trois domaines d'intégration :
- **Le Verbe** — Intégration applicative (actions synchrones, orchestration)
- **Le Nom** — Intégration des données (cohérence d'état, accessibilité)
- **Le Signal** — Intégration événementielle (communication asynchrone, découplage maximal)

## Structure

```
Chapitres-Volumes/        # 12 chapitres Markdown + Annexes.md (source)
templates/
  index.html              # Template homepage (grille de chapitres)
  chapter.html            # Template chapitre (sidebar + navigation)
chapters.json             # Métadonnées : titres, slugs, catégories, couleurs
build.js                  # Script Node.js de génération statique (149 lignes)
docs/                     # HTML généré (sortie) — NE PAS ÉDITER
  public/                 # Assets statiques (PDFs, images, audio)
public/                   # Assets source
```

## Chapitres

| # | Sujet | Catégorie |
|---|-------|-----------|
| I | Introduction et Problématique | Transversal |
| II | Fondements Théoriques (CAP, PACELC) | Transversal |
| III | Intégration des Applications | Applications |
| IV | Intégration des Données (CDC, CQRS, Event Sourcing) | Données |
| V | Intégration des Événements (Pub/Sub, Streaming) | Événements |
| VI | Standards et Contrats d'Interface | Transversal |
| VII | Résilience et Observabilité | Transversal |
| VIII | Collaboration et Automatisation | Transversal |
| IX | Architecture de Référence | Transversal |
| X | Étude de Cas : Order-to-Cash | Transversal |
| XI | L'Entreprise Agentique | Émergent |
| XII | Sécurité, Identité et Conformité | Transversal |

## Stack technique

- **Node.js** + **marked** (v15.0.0) pour la conversion Markdown → HTML
- **GitHub Pages** depuis le répertoire `docs/`
- **Design** : Thème blueprint sombre, Google Fonts (Instrument Serif, Outfit)
- Aucune dépendance runtime — HTML statique pur

## Build

```bash
npm run build    # Génère docs/ depuis Chapitres-Volumes/ + templates/
npx serve docs   # Servir localement pour vérification
```

Le build : charge `chapters.json` → parse chaque .md avec `marked` → extrait les h2 pour la sidebar → injecte dans les templates → copie les assets.

## Conventions

- **Nommage chapitres** : `NN_Titre_Avec_Underscores.md` (ex: `01_Introduction_Problematique.md`)
- **Métadonnées** : Tout ajout/modification de chapitre nécessite une mise à jour de `chapters.json`
- **Templates** : HTML avec placeholders (`{{CONTENT}}`, `{{TITLE}}`, etc.)
- **Slugification** : Gère les accents français (à→a, é→e, etc.)

## Directives pour Claude

1. **Langue** : Français exclusivement pour le contenu. Terminologie technique anglaise acceptée (API, Pub/Sub, etc.).
2. **Ne pas éditer `docs/`** : C'est un répertoire généré. Modifier les sources dans `Chapitres-Volumes/` et `templates/`.
3. **Cohérence chapters.json** : Toute modification structurelle (ajout/suppression de chapitre) doit synchroniser `chapters.json`.
4. **Style académique** : Prose structurée, ton professionnel, références aux standards (OpenAPI, AsyncAPI, CloudEvents, etc.).
5. **Régénération** : Après modification de contenu, rappeler que `npm run build` doit être relancé.
6. **Assets** : Les PDFs, images et audio dans `public/` ne doivent pas être modifiés par code.
