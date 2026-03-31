# Corpus Informatique

Corpus encyclopédique francophone couvrant les fondements de l'informatique, l'interopérabilité des systèmes d'entreprise et l'émergence de l'entreprise agentique. L'ouvrage est structuré en trois collections totalisant 176 fichiers Markdown, enrichi de diagrammes Mermaid, de blocs de code pratiques et de références croisées inter-sections.

---

## Structure du corpus

### I — Cursus : Science et Génie Informatique

Programme complet en sept volumes (80 chapitres) couvrant l'ensemble du génie informatique, des fondements théoriques aux architectures cognitivo-quantiques.

| Volume | Titre | Chapitres |
|--------|-------|-----------|
| I | Fondations Théoriques de l'Informatique | I.1 – I.6 |
| II | Architecture et Ingénierie Matérielle | I.7 – I.15 |
| III | Systèmes Logiciels et Méthodologies | I.16 – I.29 |
| IV | Données, Réseaux et Sécurité | I.30 – I.40 |
| V | Intelligence Artificielle et Domaines Spécialisés | I.41 – I.50 |
| VI | Technologies Avant-Garde | I.51 – I.60 |
| VII | Architecture Cognitivo-Quantique | I.61 – I.80 |

### II — Interopérabilité

Traité sur l'intégration des systèmes d'information en contexte d'entreprise (11 chapitres + annexes = 12 fichiers). Défend la thèse de l'interopérabilité comme un **continuum** allant du couplage fort au découplage maximal, à travers trois domaines complémentaires : applications, données et événements.

| Chapitre | Sujet |
|----------|-------|
| II.1 | Introduction et Problématique |
| II.2 | Fondements Théoriques |
| II.3 | Intégration des Applications |
| II.4 | Intégration des Données |
| II.5 | Intégration des Événements |
| II.6 | Standards et Contrats |
| II.7 | Résilience et Observabilité |
| II.8 | Collaboration et Automatisation |
| II.9 | Architecture de Référence |
| II.10 | Order-to-Cash (étude de cas) |
| II.11 | Entreprise Agentique |
| II.A | Annexes |

### III — Entreprise Agentique

Monographie en cinq volumes (84 fichiers) explorant la transition vers des systèmes d'information fondés sur des agents intelligents distribués.

#### Volume I — Fondations de l'Entreprise Agentique (28 chapitres)

De la crise de l'intégration systémique à l'architecture intentionnelle : interopérabilité cognitive, maillage agentique, gouvernance constitutionnelle, AgentOps et prospective vers l'AGI d'entreprise.

- **Partie 1** — Crise et fondations architecturales
- **Partie 2** — Infrastructure et écosystème technique
- **Partie 3** — Interopérabilité cognitive et paradigme agentique
- **Partie 4** — Opérationnalisation et transformation
- **Partie 5** — Industrialisation, prospective et synthèse

#### Volume II — Infrastructure Agentique (15 chapitres)

Ingénierie de la plateforme agentique : Apache Kafka, Confluent, Google Vertex AI, RAG, pipelines CI/CD, observabilité comportementale, sécurité et conformité réglementaire.

#### Volume III — Apache Kafka : Guide de l'Architecte (12 chapitres)

Guide complet couvrant l'architecture du cluster, les clients producteurs et consommateurs, les contrats de données, les patrons d'interaction, le stream processing et les opérations en production.

#### Volume IV — Apache Iceberg Lakehouse (16 chapitres + 2 annexes)

De l'anatomie technique d'Apache Iceberg à l'implémentation d'un lakehouse en production : ingestion, catalogue, fédération, streaming lakehouse (Kafka → Iceberg), sécurité, intégration Microsoft Fabric/Power BI et études de cas en contexte canadien.

#### Volume V — Le Développeur Renaissance (11 chapitres : V.0 – V.10)

Réflexion humaniste sur la pratique du génie logiciel : convergence des âges d'or, curiosité appliquée, pensée systémique, communication, qualité, capital humain, Spec-Driven Development et le profil du développeur polymathe.

---

## Contenu enrichi

- **23 diagrammes Mermaid** répartis dans les trois sections (architecture ISA, pipeline de compilation, EDA, Kafka, CQRS, Iceberg, Agentic Mesh, SDD, etc.)
- **~1 069 blocs de code** dans 64 fichiers couvrant 11+ langages (Python, SQL, Java, YAML, JSON, Bash, Markdown, Avro, HCL, XML, Go, etc.)
- **196 références croisées** reliant 43 chapitres à travers les trois sections

## Format et conventions

- **Langue** : français
- **Format** : Markdown avec infrastructure MkDocs Material
- **Nommage des fichiers** : `Chapitre_[Section/Volume].[N]_[Sujet].md` (préfixes en chiffres romains)
- Les diagrammes utilisent la syntaxe Mermaid (rendu natif sur GitHub)
- **Déploiement** : GitHub Actions → GitHub Pages via `mkdocs gh-deploy`

## Licence

Tous droits réservés.
