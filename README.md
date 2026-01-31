# Interopérabilité en Écosystème d'Entreprise

Convergence des Architectures d'Intégration — Du Couplage Fort au Découplage Maximal

## Structure du projet

```
├── Chapitres/          # Fichiers sources Markdown (12 chapitres + annexes)
├── public/             # Assets statiques (Poster, Présentation PDF, Podcast, MindMap)
├── templates/          # Templates HTML (accueil et chapitres)
├── build.js            # Script de génération des pages HTML
├── chapters.json       # Métadonnées des chapitres (titres, slugs, catégories)
├── package.json        # Dépendances Node.js
└── docs/               # Pages HTML générées (output du build)
```

## Prérequis

- [Node.js](https://nodejs.org/) version 18 ou supérieure

## Installation

```bash
git clone https://github.com/agbruneau/Interoperabilite.git
cd Interoperabilite
npm install
```

## Générer le site

```bash
npm run build
```

Les pages HTML sont générées dans le dossier `docs/`.

## Consulter le site localement

Après avoir exécuté le build, ouvrir le fichier suivant dans un navigateur :

```
docs/index.html
```

Sous Windows, depuis le terminal :

```bash
start docs/index.html
```

Sous macOS :

```bash
open docs/index.html
```

Sous Linux :

```bash
xdg-open docs/index.html
```

Toutes les pages sont des fichiers HTML statiques autonomes. Aucun serveur Web n'est requis — la navigation fonctionne directement depuis le système de fichiers.

## Déploiement GitHub Pages

Le site se déploie automatiquement via GitHub Actions à chaque push sur la branche `master`. Le workflow (`.github/workflows/deploy.yml`) exécute le build puis publie le contenu de `docs/` sur GitHub Pages.

## Contenu

| Chapitre | Sujet |
|----------|-------|
| I | Introduction et Problématique |
| II | Fondements Théoriques |
| III | Intégration des Applications |
| IV | Intégration des Données |
| V | Intégration des Événements |
| VI | Standards et Contrats d'Interface |
| VII | Résilience et Observabilité |
| VIII | Collaboration et Automatisation |
| IX | Architecture de Référence |
| X | Étude de Cas : Order-to-Cash |
| XI | L'Entreprise Agentique |
| — | Annexes |

## Ajouter ou modifier un chapitre

1. Modifier le fichier Markdown correspondant dans `Chapitres/`
2. Si un nouveau chapitre est ajouté, mettre à jour `chapters.json`
3. Relancer `npm run build`
