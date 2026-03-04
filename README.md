***Ce github repo est un projet académique de recherche en informatique***

# Interopérabilité et Agentique

**Architectures d'Intégration — Du Couplage Fort au Découplage Maximal**

> Consulter le site : [agbruneau.github.io/InteroperabiliteAgentique](https://agbruneau.github.io/InteroperabiliteAgentique/)

Publication professionnelle couvrant l'ensemble du spectre de l'interopérabilité des systèmes d'entreprise : des intégrations traditionnelles point-à-point jusqu'aux architectures agentiques pilotées par l'IA. Le contenu est structuré en 12 chapitres, publié sous forme de site statique HTML.

## Thèse centrale

L'interopérabilité se situe sur un continuum allant du couplage fort au découplage maximal. Ce continuum s'articule autour de trois domaines d'intégration :

- **Le Verbe** — Intégration des applications (action synchrone, orchestration)
- **Le Nom** — Intégration des données (cohérence d'état, accessibilité)
- **Le Signal** — Intégration des événements (communication asynchrone, découplage maximal)

## Architecture de Domaine

La page d'accueil présente les six piliers de l'architecture de domaine :

| Pilier                 | Objectif                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **Orienter**     | Définir la vision à 2-3 ans et les principes directeurs (Cloud First, API First)        |
| **Standardiser** | Réduire la complexité par des normes, patterns et architectures de référence          |
| **Gouverner**    | Assurer la cohérence via les revues d'architecture, décisions et gestion des exceptions |
| **Accompagner**  | Cadrage, co-conception et coaching des équipes de livraison                              |
| **Fiabiliser**   | Garantir la sécurité, la résilience et l'exploitabilité en production                 |
| **Optimiser**    | Approche FinOps, gestion du cycle de vie et évaluation des fournisseurs                  |

## Sujets couverts

- **Fondements théoriques** — Théorème CAP, modèle PACELC, couplage spatio-temporel, System of Record
- **Patrons d'architecture applicative** — API Gateway, BFF, Circuit Breaker, Service Mesh, Strangler Fig, Saga, orchestration vs chorégraphie
- **Patrons d'intégration de données** — CDC, CQRS, Event Sourcing, Data Mesh, MDM, Data Virtualization, Medallion Architecture
- **Patrons événementiels** — Pub/Sub, Event Streaming, Transactional Outbox, Dead Letter Queue, vues matérialisées
- **Standards et contrats** — OpenAPI, gRPC, AsyncAPI, CloudEvents, JSON-LD, Protocol Buffers, Apache Avro
- **Résilience et observabilité** — OpenTelemetry, traçage distribué, tolérance aux pannes
- **Étude de cas** — Processus Order-to-Cash de bout en bout
- **Entreprise agentique** — Agents IA comme orchestrateurs d'intégration
- **FINOPS — TBM & CSDM** — Classification financière des services d'intégration, modèle CSDM, allocation des coûts, gouvernance FinOps

## Technologies référencées

Apache Kafka, RabbitMQ, Apache Pulsar, Apache Iceberg, PostgreSQL, MongoDB, ClickHouse, Kubernetes, Docker, Prometheus, Jaeger, OAuth 2.0, mTLS

## Structure du projet

```
├── Chapitres-Volumes/      # Fichiers sources Markdown (11 chapitres + annexes)
├── templates/              # Templates HTML (accueil et chapitres)
├── chapters.json           # Métadonnées des chapitres (titres, slugs, catégories)
├── build.js                # Script de génération des pages HTML (Node.js)
├── build.py                # Script de génération alternatif (Python)
├── package.json            # Dépendances Node.js
├── .gitignore              # Exclusions Git (node_modules)
└── docs/                   # Pages HTML générées (servies par GitHub Pages)
    └── public/             # Assets statiques (PDF, posters, podcast)
```

## Consulter le site localement

Les pages HTML sont des fichiers statiques autonomes. Aucun serveur Web n'est requis — la navigation fonctionne directement depuis le système de fichiers.

Ouvrir `docs/index.html` dans un navigateur :

```bash
# Windows
start docs/index.html

# macOS
open docs/index.html

# Linux
xdg-open docs/index.html
```

Optionnellement, pour servir le site via HTTP (utile pour éviter les restrictions CORS sur certains navigateurs) :

```bash
npx serve docs
```

Puis ouvrir http://localhost:3000 dans le navigateur.

## Contenu

### Chapitres — Intégration

| Chapitre | Sujet                             |
| -------- | --------------------------------- |
| I        | Introduction et Problématique    |
| II       | Fondements Théoriques            |
| III      | Intégration des Applications     |
| IV       | Intégration des Données         |
| V        | Intégration des Événements     |
| VI       | Standards et Contrats d'Interface |
| VII      | Résilience et Observabilité     |
| VIII     | Collaboration et Automatisation   |
| IX       | Architecture de Référence       |
| X        | Étude de Cas : Order-to-Cash     |
| XI       | L'Entreprise Agentique            |
| XII      | FINOPS — TBM & CSDM              |

## Architecte assisté des outils IA

La page d'accueil inclut un document de référence sur la stratégie d'outillage IA, structuré autour de six rôles spécialisés et un processus en six phases.

### Rôles (Casting)

| Rôle         | Outil             | Fonction                                                                |
| ------------- | ----------------- | ----------------------------------------------------------------------- |
| Explorateur   | Perplexity Pro    | Validation factuelle, veille technologique, ancrage dans le réel       |
| Stratège     | Gemini Pro        | Synthèse systémique, raisonnement First Principles, Red Teaming       |
| Expert        | Claude Code       | Conception structurelle, codage de précision, artefacts visuels        |
| Collaborateur | Claude CoWork     | Collaboration interactive, développement en binôme, co-création       |
| Synthétiseur | NotebookLM        | Synthèse documentaire, assimilation de sources, podcasts synthétiques |
| Penseur       | Gemini Deep Think | Raisonnement profond, vérification formelle, résolution de dilemmes   |

### Processus

Cycle de développement assisté par agents IA — de l'intention à la livraison.

1. **Idéation et Recherche** — Intention claire (app, feature, bugfix, refactor). Veille et validation externe (Perplexity), synthèse du corpus existant (NotebookLM). Artefact : `research.md`
2. **Prototype** — Exploration de variantes quand le jugement humain est important (Claude Code). Brainstorming collaboratif humain-IA (Claude CoWork). Artefact : prototype committé
3. **PRD (Document de Destination)** — Spécification de l'état final attendu. Red Teaming systématique (Gemini), raisonnement profond sur les compromis (Gemini Deep Think). Artefact : spec validée
4. **Plan d'Implémentation (Kanban)** — Décomposition en tickets avec dépendances (Claude Code), validation stratégique et détection de goulots (Gemini). Artefact : board de tickets
5. **Exécution (Boucle d'Agent)** — Boucle de codage sur les tickets (Claude Code), pair programming sur les tickets complexes (Claude CoWork). Phase pouvant tourner en AFK
6. **QA (Itérative)** — Vérification de cohérence PRD/code (Gemini Deep Think), capitalisation documentaire (NotebookLM). Boucle : planification → exécution → QA → convergence

## Ressources complémentaires

La page d'accueil donne accès aux ressources suivantes :

- **[Interopérabilité (PDF)](https://agbruneau.github.io/InteroperabiliteAgentique/public/Integration.pdf)** — Présentation sur l'intégration
- **[Agentique (PDF)](https://agbruneau.github.io/InteroperabiliteAgentique/public/Agentique.pdf)** — Présentation sur l'entreprise agentique
- **[Monographie — L&#39;Entreprise Agentique (PDF)](https://agbruneau.github.io/InteroperabiliteAgentique/public/Monographie%20-%20Entreprise%20Agentique.pdf)** — Monographie complète sur l'entreprise agentique
- **[Podcast (M4A)](https://agbruneau.github.io/InteroperabiliteAgentique/public/PodCast.m4a)** — Version audio de la présentation
- **Posters** — Blueprints de l'Entreprise Moderne (Poster 1 à 6)

## Projets connexes

- **[Auto Claude — Pilotage Agentique](https://github.com/AndyMik90/Auto-Claude)** — Cadre de pilotage agentique avec Claude
- **[Anthropic Skills](https://github.com/anthropics/skills)** — Collection de skills pour Claude Code

## Modifier le contenu

1. Modifier le fichier Markdown correspondant dans `Chapitres-Volumes/`
2. Si un nouveau chapitre est ajouté, mettre à jour `chapters.json`
3. Régénérer les pages HTML : `npm run build` (ou `python build.py` si Node.js n'est pas disponible)
4. Commiter les fichiers sources et le répertoire `docs/`, puis pousser sur `master`

## Public cible

Architectes d'entreprise, architectes de solutions, spécialistes en intégration, leaders technologiques et développeurs souhaitant approfondir les patrons d'intégration modernes et la transition vers l'entreprise agentique.
