# Chapitre I.1 — Fondements Logiques et Raisonnement Formel

---

## Introduction : De l'Histoire à la Logique — Genèse Intellectuelle de l'Informatique

---

L'informatique, terme forgé en 1962 par Philippe Dreyfus par contraction d'« information » et d'« automatique », représente bien plus que l'histoire matérielle des machines à calculer. Elle constitue l'aboutissement d'une longue marche intellectuelle visant à externaliser, mécaniser puis automatiser les processus de la pensée rationnelle — une convergence singulière entre la logique mathématique, la physique des matériaux, la théorie de l'information et l'ingénierie des systèmes complexes.

Placer cette genèse au seuil d'un volume consacré aux *Fondements Logiques et au Raisonnement Formel* impose de dépasser la chronique événementielle des inventions pour explorer la généalogie profonde des concepts. Des premières abstractions algorithmiques de la Mésopotamie aux travaux fondateurs de Turing et Church, l'informatique s'est construite sur des ruptures paradigmatiques où des abstractions purement mathématiques ont précédé l'existence physique des ordinateurs, définissant *a priori* les limites de ce qui est calculable.

### L'Aube Algorithmique : De l'Antiquité à la Mécanisation (Antiquité — XVIIe siècle)

Les racines de l'algorithmique plongent dans le sol mésopotamien. Dès 1800 av. J.-C., les scribes babyloniens développaient des procédures de calcul sophistiquées dans un système sexagésimal positionnel — la tablette YBC 7289 témoigne d'une approximation de √2 à six décimales. L'apport grec formalise cette tradition : l'algorithme d'Euclide pour le PGCD (vers 300 av. J.-C.) constitue la première description formelle d'une méthode itérative finie garantissant un résultat, définition même de l'algorithme moderne. Le mécanisme d'Anticythère (IIe siècle av. J.-C.), calculateur analogique à engrenages différentiels, préfigure l'automatisation des calculs complexes.

L'adoption du système décimal positionnel et du zéro opératoire, formalisés en Inde puis transmis à l'Occident via les traités d'Al-Khwarizmi — dont le nom latinisé donna « algorithme » —, constitue une étape décisive. **Gerbert d'Aurillac** (Xe siècle), futur pape Sylvestre II, réintroduit l'abaque en Europe au contact des savants arabes, préfigurant conceptuellement les registres à décalage des processeurs modernes.

Le XVIIe siècle marque le passage de l'outil d'aide au calcul à la machine autonome : la **Pascaline** de Blaise Pascal (1642) introduit le report automatique de la retenue. Mais la figure tutélaire demeure **Gottfried Wilhelm Leibniz** : inventeur du cylindre cannelé pour la multiplication mécanique, promoteur du système binaire, et visionnaire d'un *Calculus Ratiocinator* — un langage formel capable de réduire tout raisonnement à un calcul algébrique, anticipant de trois siècles la logique symbolique et l'intelligence artificielle.

### L'Architecture et la Logique Formelle (XIXe siècle)

Le XIXe siècle voit émerger les deux piliers de l'ordinateur moderne. **Charles Babbage** conçoit la **Machine Analytique** (1837), dont l'architecture intègre les quatre composants essentiels d'un ordinateur : une unité de traitement (*Mill*), une mémoire (*Store*), une entrée par cartes perforées et la capacité de branchement conditionnel. **Ada Lovelace**, dans ses « Notes » de 1843, rédige le premier programme informatique et, plus fondamentalement, anticipe l'informatique symbolique universelle : la machine pourrait « agir sur d'autres choses que le nombre », préfigurant la manipulation de symboles au-delà du calcul numérique.

En 1854, **George Boole** publie *The Laws of Thought*, démontrant que la logique aristotélicienne peut être codifiée sous forme d'équations algébriques à deux états (Vrai/Faux, 1/0). Cette **algèbre booléenne** restera une curiosité abstraite pendant près d'un siècle — jusqu'à sa jonction décisive avec l'électronique.

### La Crise des Fondements et la Naissance de l'Informatique Théorique (1900–1940)

Au tournant du XXe siècle, une crise secoue les mathématiques et engendre paradoxalement l'informatique théorique. **David Hilbert** pose l'*Entscheidungsproblem* : existe-t-il une procédure mécanique pour déterminer la vérité de tout énoncé mathématique ? En 1931, **Kurt Gödel** anéantit cet espoir : ses théorèmes d'incomplétude prouvent que tout système formel suffisamment puissant contient des propositions vraies mais indémontrables, traçant une limite absolue au calcul.

La réponse définitive vient dans les années 1930 avec deux modèles concurrents mais équivalents. **Alonzo Church** développe le **lambda-calcul** (1936), système formel de réécriture fonctionnelle qui deviendra la base théorique des langages fonctionnels (Lisp, Haskell, OCaml). Simultanément, **Alan Turing** propose sa **Machine de Turing** — bande infinie, tête de lecture/écriture, registre d'état — et démontre qu'elle peut effectuer tout calcul concevable par un humain suivant des règles fixes. Sa **Machine de Turing Universelle**, capable de simuler toute autre machine à partir de sa description encodée, est l'invention conceptuelle du **logiciel** : un matériel fixe dont la fonction change selon le programme ingéré. La **thèse de Church-Turing** unifie ces travaux : toute fonction « naturellement calculable » est calculable par une Machine de Turing.

En 1937, **Claude Shannon** réalise la jonction entre logique et électronique en démontrant que l'algèbre de Boole s'implémente physiquement par des relais et commutateurs. Plus tard (1948), sa **Théorie de l'Information** définit le **bit** comme unité fondamentale et introduit l'entropie informationnelle, fondement des télécommunications modernes.

> **Du Matériel aux Enjeux Contemporains — Vue d'ensemble**
>
> Les sections qui suivent résument les grandes étapes de la matérialisation et de l'industrialisation de l'informatique, traitées en détail dans les volumes ultérieurs du corpus.
>
> **La Révolution Matérielle (1930–1950).** Sous la pression de la Seconde Guerre mondiale, les concepts théoriques se matérialisent : le **Z3** de Konrad Zuse (1941, premier ordinateur programmable opérationnel), le **Colossus** britannique (1943, premier ordinateur électronique numérique programmable), puis l'**ENIAC** (1945, premier ordinateur électronique généraliste Turing-complet). L'**architecture de Von Neumann** (1945) — programme et données dans la même mémoire — devient le standard universel.
>
> **L'Industrialisation et la Crise du Logiciel (1950–1970).** Le **LEO I** (1951) inaugure l'informatique de gestion commerciale. Le **transistor** (1947) puis le **circuit intégré** (1958–1959) ouvrent la voie à la Loi de Moore. L'**IBM System/360** (1964) impose la compatibilité logicielle ascendante. La conférence de **Garmisch** (1968) diagnostique la « Crise du Logiciel » et fonde le **Génie Logiciel**.
>
> **L'Exception Française.** Le **Plan Calcul** (1966) structure l'écosystème de recherche (création de l'IRIA/Inria). Le **Micral N** de François Gernelle (1973) est le premier micro-ordinateur commercial. L'école théorique française excelle : Schützenberger et Nivat en automates et langages, **Patrick Cousot** en interprétation abstraite (1977), **Gérard Berry** en systèmes réactifs, **Alain Colmerauer** en programmation logique (Prolog, 1972).
>
> **Réseaux et Internet.** **Louis Pouzin** introduit le concept de **datagramme** avec le réseau CYCLADES (1970s), inspirant directement TCP/IP. Le **Minitel** (1982) éduque la France aux services en ligne une décennie avant le Web. **Tim Berners-Lee** invente le World Wide Web au CERN (1989).
>
> **Paradigmes Logiciels et IA.** L'histoire des langages est celle d'une montée en abstraction : Fortran (1957), Lisp (1958), Simula 67, Prolog (1972). L'IA traverse des cycles d'euphorie et d'« hivers » avant le renouveau du **Deep Learning** dans les années 2010. Le mouvement **Open Source** (GNU, 1983 ; Linux, 1991) fournit l'infrastructure invisible de l'Internet et du Cloud.
>
> **Enjeux Contemporains.** Le modèle relationnel de Codd (1970) structure la gestion des données. La cybersécurité émerge comme discipline après le Ver Morris (1988). L'**informatique quantique**, exploitant superposition et intrication, se profile comme le prochain paradigme — l'algorithme de Shor (1994) menace les chiffrements actuels.

### Tableaux de Synthèse

**Tableau 1 : Chronologie des Ères Informatiques**

| **Période**           | **Paradigme Dominant**   | **Innovation Clé**                   | **Figures Emblématiques**          | **Impact Principal**                          |
| ---------------------------- | ------------------------------ | ------------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| **Antiquité — 1600** | Algorithmique manuelle         | Numération de position, Zéro              | Euclide, Al-Khwarizmi, Gerbert d'Aurillac | Formalisation des procédures de calcul             |
| **1600 — 1900**       | Mécanisation du calcul        | Pascaline, Machine Analytique               | Pascal, Leibniz, Babbage, Lovelace        | Preuve de concept du calcul machine et du programme |
| **1900 — 1945**       | Fondations Théoriques         | Incomplétude, Machine de Turing            | Gödel, Turing, Church, Shannon           | Définition mathématique des limites du calcul     |
| **1945 — 1970**       | Mainframes et Transistors      | Architecture Von Neumann, Circuit Intégré | Von Neumann, Kilby, Noyce, IBM            | Industrialisation du calcul, standardisation        |
| **1970 — 1990**       | Micro-informatique et Réseaux | Microprocesseur, TCP/IP, Ethernet           | Intel, Pouzin, Cerf, Jobs, Gates          | Démocratisation de l'accès, mise en réseau       |
| **1990 — 2010**       | Web et Mobilité               | HTTP, Smartphone, Cloud                     | Berners-Lee, Torvalds, Google             | Accès universel à l'information, ubiquité        |
| **2010 — Présent**   | IA et Big Data                 | Deep Learning, GPU, Quantique               | Hinton, LeCun, OpenAI                     | Automatisation cognitive, limites physiques         |

**Tableau 2 : Concepts Théoriques et Leurs Applications**

| **Concept Théorique**        | **Origine (Auteur/Date)** | **Application Pratique Moderne**                              |
| ----------------------------------- | ------------------------------- | ------------------------------------------------------------------- |
| **Algèbre Booléenne**       | George Boole (1854)             | Conception de tous les circuits électroniques numériques          |
| **Machine de Turing**         | Alan Turing (1936)              | Modèle de référence pour la puissance de calcul (Turing-complet) |
| **Lambda-calcul**             | Alonzo Church (1936)            | Langages fonctionnels (Haskell, OCaml), Lisp                        |
| **Architecture Von Neumann**  | John von Neumann (1945)         | Structure de 99% des ordinateurs (CPU + RAM unifiée)               |
| **Datagramme**                | Louis Pouzin (1972)             | Base du protocole IP (Internet Protocol)                            |
| **Interprétation Abstraite** | Patrick Cousot (1977)           | Vérification formelle de logiciels critiques (Ariane 5, Airbus)    |
| **Algorithme de Shor**        | Peter Shor (1994)               | Menace quantique sur la cryptographie RSA actuelle                  |

### Transition vers l'Étude Formelle

Cette genèse intellectuelle révèle un fil conducteur : chaque avancée décisive de l'informatique — de l'algorithme d'Euclide à la Machine de Turing, de l'algèbre de Boole aux circuits de Shannon — procède d'une formalisation logique rigoureuse. Les machines n'ont pu exister que parce que le raisonnement avait d'abord été réduit à un calcul, et le calcul à une mécanique symbolique.

C'est précisément cette architecture logique fondamentale que la **Partie I** de ce chapitre se propose d'explorer systématiquement. Nous y étudierons les outils formels qui sous-tendent toute la science informatique : la logique propositionnelle et ses méthodes de preuve, la logique des prédicats et sa puissance expressive, les structures mathématiques discrètes (ensembles, relations, fonctions, graphes) qui modélisent les objets computationnels, et les techniques de démonstration (induction, récurrence) qui garantissent la correction des algorithmes. Le lecteur disposera ainsi du vocabulaire et de l'arsenal déductif nécessaires pour aborder, dans les parties suivantes, la théorie de la computation et la complexité algorithmique.

---

## Partie I : La Logique Propositionnelle — L'Algèbre du Raisonnement

La logique propositionnelle, également connue sous le nom de calcul des propositions, constitue le premier échelon de la formalisation du raisonnement. Son pouvoir expressif est limité, car elle traite les propositions comme des entités atomiques indivisibles, sans analyser leur structure interne. Cependant, sa simplicité est précisément ce qui en fait un outil d'une puissance et d'une importance fondamentales en informatique. Elle modélise parfaitement le monde binaire des circuits électroniques, où les signaux sont soit hauts (vrai), soit bas (faux), et constitue la base de l'algèbre de Boole qui régit le fonctionnement de chaque porte logique au sein d'un processeur. De plus, elle sert de fondement à des logiques plus complexes et introduit les concepts essentiels de syntaxe, de sémantique, de validité et de prouvabilité qui seront généralisés par la suite.

### 1.1. Syntaxe et Sémantique : Le Langage des Propositions

L'étude de tout langage formel, y compris la logique propositionnelle, commence par la distinction cruciale entre sa syntaxe et sa sémantique. Cette dualité est le principe organisateur central de la logique.

- La **syntaxe** définit l'ensemble des règles qui permettent de construire des énoncés correctement formés, appelés formules. Elle s'intéresse à la structure et à la forme des expressions, indépendamment de leur signification. C'est la grammaire du langage logique.
- La **sémantique** attribue un sens, une signification, aux formules syntaxiquement correctes. En logique propositionnelle, ce sens est une valeur de vérité : vrai ou faux. C'est la théorie de l'interprétation du langage.

#### 1.1.1. Syntaxe Formelle

La syntaxe de la logique propositionnelle définit comment construire des formules valides à partir d'un ensemble de symboles de base.

##### Alphabet

Le langage est construit sur un alphabet Σ, qui est l'union de trois ensembles de symboles disjoints  :

1. Un ensemble infini dénombrable P={p,q,r,p1,p2,...} de **variables propositionnelles** (ou atomes). Chaque variable représente une proposition élémentaire, un énoncé simple qui peut être vrai ou faux, comme "il pleut" ou "n\>2".
2. Un ensemble de **connecteurs logiques** :

   - ¬ (négation, "non")
   - ∧ (conjonction, "et")
   - ∨ (disjonction, "ou")
   - → (implication, "si\... alors\...")
   - ↔ (équivalence ou bi-implication, "si et seulement si")
3. Des symboles de ponctuation : les **parenthèses** ( et ).

##### Formules Bien Formées (EBF)

Toutes les chaînes de caractères construites avec l'alphabet Σ ne sont pas des formules valides. L'ensemble des **Expressions Bien Formées** (EBF), noté F, est le plus petit ensemble de mots sur Σ qui satisfait les règles de construction suivantes, définies de manière inductive  :

- **(Règle de base)** Toute variable propositionnelle p∈P est une EBF.
- **(Règles inductives)** Si F et G sont des EBF, alors les expressions suivantes sont aussi des EBF :

  - (¬F)
  - (F∧G)
  - (F∨G)
  - (F→G)
  - (F↔G)

Cette définition récursive est fondamentale. Elle garantit que toute formule est construite en un nombre fini d'étapes à partir des atomes. Par exemple, la chaîne (p→(¬q)) est une EBF car p et q sont des EBF (règle de base), donc (¬q) est une EBF (règle inductive), et enfin (p→(¬q)) est une EBF (règle inductive). En revanche, la chaîne p∧q) n'est pas une EBF car la parenthèse ouvrante est mal placée.

##### Arbres de Décomposition

La nature inductive de la définition des EBF garantit une propriété essentielle : la **lecture unique**. Chaque EBF peut être décomposée de manière unique en ses sous-formules immédiates. Cette structure de décomposition peut être visualisée sous la forme d'un **arbre de décomposition** (ou arbre syntaxique). La racine de l'arbre est le connecteur principal de la formule, et ses enfants sont les racines des arbres de décomposition de ses sous-formules immédiates. Les feuilles de l'arbre sont les variables propositionnelles.

Par exemple, l'arbre de décomposition de la formule ((p∧(¬q))→r) est :

→
/ \\
∧ r
/ \\
p ¬
\|
q

Cet arbre montre que le connecteur principal est →, qui relie la sous-formule (p∧(¬q)) à la sous-formule r. Cette structure arborescente est non seulement une aide visuelle, mais elle est aussi au cœur de nombreux algorithmes qui opèrent sur les formules logiques, comme les algorithmes d'évaluation sémantique.

##### Conventions et Abréviations

Pour améliorer la lisibilité et éviter une prolifération de parenthèses, on adopte des conventions de précédence entre les connecteurs. L'ordre de priorité décroissante est généralement le suivant  :

1. ¬
2. ∧
3. ∨
4. →
5. ↔

Ainsi, la formule ¬p∧q→r est interprétée comme (((¬p)∧q)→r). Les parenthèses restent nécessaires pour outrepasser ces priorités, comme dans ¬(p∧q).

De plus, il est courant de définir certains symboles comme des abréviations. Par exemple, les constantes logiques "vrai" (⊤) et "faux" (⊥) peuvent être introduites. On peut également définir l'équivalence comme une abréviation de la double implication  :

- (F↔G) est une abréviation pour ((F→G)∧(G→F)).

Ces conventions permettent de simplifier l'écriture sans altérer la rigueur formelle du langage.

#### 1.1.2. Sémantique Formelle

La sémantique donne un sens aux formules bien formées. En logique propositionnelle, ce sens est une valeur de vérité, déterminée par l'interprétation des variables propositionnelles de base.

##### Domaine de Vérité et Valuation

Le domaine sémantique est l'ensemble des valeurs de vérité, B={Vrai,Faux}, que l'on représente souvent par l'ensemble binaire {1,0} pour des raisons de commodité algébrique.

Le point de départ de l'interprétation sémantique est la **valuation** (parfois appelée interprétation ou assignation). Une valuation est une fonction v:P→{1,0} qui assigne une valeur de vérité à chaque variable propositionnelle. Une valuation représente un "état du monde" possible, où chaque proposition atomique est soit vraie, soit fausse.

##### Extension aux Formules Complexes et Tables de Vérité

Le cœur de la sémantique propositionnelle est la définition inductive de la valeur de vérité d'une formule complexe, qui étend la fonction de valuation v de P à l'ensemble de toutes les EBF, F. Cette extension, notée vˉ:F→{1,0}, est définie comme suit  :

- **Base :** Si F est une variable propositionnelle p, alors vˉ(p)=v(p).
- **Induction :** Si F et G sont des EBF, alors :

  - vˉ((¬F))=1 si et seulement si vˉ(F)=0.
  - vˉ((F∧G))=1 si et seulement si vˉ(F)=1 et vˉ(G)=1.
  - vˉ((F∨G))=1 si et seulement si vˉ(F)=1 ou vˉ(G)=1.
  - vˉ((F→G))=1 si et seulement si vˉ(F)=0 ou vˉ(G)=1. (Équivalent à : vˉ((F→G))=0 ssi vˉ(F)=1 et vˉ(G)=0).
  - vˉ((F↔G))=1 si et seulement si vˉ(F)=vˉ(G).

Ces règles définissent formellement la signification de chaque connecteur. Elles peuvent être visualisées et calculées systématiquement à l'aide de **tables de vérité**. Une table de vérité énumère toutes les valuations possibles pour les variables d'une formule et donne la valeur de vérité de la formule pour chaque valuation. S'il y a

n variables propositionnelles, il y a 2n valuations possibles.

La table suivante présente les définitions sémantiques formelles des connecteurs logiques. Elle n'est pas seulement un outil de calcul, mais l'incarnation même de la sémantique en logique propositionnelle.

**Table 1.1 : Tables de Vérité des Connecteurs Logiques**

---

  p        q        ¬p       p∧q      p∨q      p→q      p↔q

  1        1        0        1        1        1        1

  1        0        0        0        1        0        0

  0        1        1        0        1        1        0

  0        0        1        0        0        1        1

---

Une attention particulière doit être portée à la sémantique de l'implication (p→q). Elle est fausse uniquement dans le cas où l'antécédent (p) est vrai et le conséquent (q) est faux. Elle est donc vraie chaque fois que l'antécédent est faux, un principe connu sous le nom de *ex falso sequitur quodlibet* ("du faux découle n'importe quoi"). Cette définition, bien que parfois contre-intuitive par rapport à l'usage causal du "si\... alors\..." dans le langage naturel, est absolument cruciale pour la rigueur du raisonnement mathématique. Elle capture l'idée que d'une prémisse fausse, on peut déduire n'importe quelle conclusion sans invalider le raisonnement lui-même.

### 1.2. Analyse Sémantique des Formules

Une fois la sémantique établie, nous pouvons classer les formules en fonction de leurs propriétés de vérité et définir les relations fondamentales qui existent entre elles. Ces concepts sont au cœur du raisonnement automatisé.

#### 1.2.1. Classification des Formules

En fonction de leur comportement sur l'ensemble de toutes les valuations possibles, les formules se répartissent en trois catégories mutuellement exclusives.

- **Tautologie :** Une formule F est une **tautologie** (ou est **valide**) si elle est vraie pour *toute* valuation v. On note ce fait ⊨F. Une tautologie représente une vérité logique universelle, indépendante de l'état du monde. L'exemple paradigmatique est la *loi du tiers exclu*, p∨¬p, qui est toujours vraie, que p soit vrai ou faux.
- **Contradiction :** Une formule F est une **contradiction** (ou une **antilogie**, ou est **insatisfaisable**) si elle est fausse pour *toute* valuation v. Une contradiction représente une fausseté logique universelle. L'exemple le plus simple est la *loi de non-contradiction*, p∧¬p.
- **Formule Contingente :** Une formule F est **contingente** si elle n'est ni une tautologie ni une contradiction. Sa valeur de vérité dépend de la valuation choisie. Il existe au moins une valuation qui la rend vraie et au moins une qui la rend fausse. Les variables propositionnelles elles-mêmes sont les formules contingentes les plus simples.

#### 1.2.2. Concepts Centraux pour le Raisonnement Automatique

Ces classifications mènent à des notions plus fines, essentielles pour les applications informatiques.

- **Modèle :** Une valuation v est un **modèle** pour une formule F si v rend F vraie, c'est-à-dire vˉ(F)=1. On note alors v⊨F et on dit que "v satisfait F".
- **Satisfiabilité (SAT) :** Une formule F est **satisfiable** si elle admet au moins un modèle, c'est-à-dire s'il existe au moins une valuation qui la rend vraie. Une formule est donc satisfiable si et seulement si elle n'est pas une contradiction. Le problème de déterminer si une formule donnée est satisfiable, connu sous le nom de problème
  **SAT**, est l'un des problèmes les plus étudiés en informatique théorique.

#### 1.2.3. Relations entre Formules

La sémantique nous permet également de formaliser les relations de déduction et d'équivalence entre différentes formules.

- **Conséquence Logique :** Une formule G est une **conséquence logique** d'un ensemble de formules Γ={F1,...,Fn} (noté Γ⊨G) si tout modèle qui satisfait simultanément toutes les formules de Γ est aussi un modèle de G. Cela formalise l'idée d'un argument valide : si les prémisses (Fi) sont vraies, alors la conclusion (G) doit nécessairement être vraie.
- **Équivalence Logique :** Deux formules F et G sont **logiquement équivalentes** (noté F≡G) si elles ont la même table de vérité, c'est-à-dire si pour toute valuation v, vˉ(F)=vˉ(G). Des formules équivalentes sont interchangeables dans n'importe quel contexte logique sans en altérer la valeur de vérité.

#### 1.2.4. L'Interconnexion des Concepts Sémantiques

Ces différentes notions sémantiques ne sont pas isolées ; elles forment un réseau de concepts étroitement liés, où la résolution d'un type de problème peut être ramenée à la résolution d'un autre. Cette interdépendance est fondamentale, car elle démontre qu'un algorithme capable de résoudre un seul de ces problèmes fondamentaux peut, en principe, les résoudre tous.

1. **Équivalence et Tautologie :** Deux formules F et G sont logiquement équivalentes si et seulement si la formule (F↔G) est une tautologie. Vérifier l'équivalence de deux formules revient donc à vérifier la validité d'une seule formule.
2. **Conséquence et Tautologie :** Une formule G est une conséquence logique d'un ensemble de prémisses {F1,...,Fn} si et seulement si la formule (F1∧⋯∧Fn)→G est une tautologie. La notion de déduction valide est ainsi ramenée à la vérification d'une tautologie.
3. **Tautologie et Contradiction :** Une formule F est une tautologie si et seulement si sa négation, ¬F, est une contradiction (insatisfaisable).

Ces réductions convergent vers un point central : le problème de la **satisfiabilité (SAT)**. Si nous disposons d'un algorithme capable de déterminer si une formule est satisfiable, nous pouvons résoudre tous les autres problèmes sémantiques :

- Pour vérifier si F est une **tautologie**, on vérifie si ¬F est insatisfiable.
- Pour vérifier si F est une **contradiction**, on vérifie si F est insatisfiable.
- Pour vérifier si F≡G, on vérifie si ¬(F↔G) est insatisfiable.
- Pour vérifier si F⊨G, on vérifie si F∧¬G est insatisfiable.

Cette convergence explique pourquoi le problème SAT est considéré comme le problème prototypique de la NP-complétude et pourquoi des décennies de recherche ont été consacrées au développement de **solveurs SAT** efficaces. Un solveur SAT n'est pas seulement un outil pour un problème de niche ; c'est un moteur de raisonnement universel pour toute la logique propositionnelle.

### 1.3. Équivalences Notables et Formes Normales

Si les tables de vérité fournissent une méthode sémantique pour analyser les formules, elles deviennent rapidement impraticables à mesure que le nombre de variables augmente (2n lignes). Une approche alternative, plus algébrique et syntaxique, consiste à transformer les formules en utilisant des règles de réécriture qui préservent l'équivalence logique.

#### 1.3.1. L'Algèbre des Propositions

Les lois d'équivalence logique forment une véritable algèbre sur l'ensemble des formules. Elles permettent de manipuler, simplifier et canoniser les expressions logiques. Le tableau suivant recense les lois les plus fondamentales.

**Table 1.2 : Principales Lois d'Équivalence Logique**

---

  Nom de la Loi                Forme avec ∧          Forme avec ∨          Source(s)

  **Commutativité**            F∧G≡G∧F               F∨G≡G∨F

  **Associativité**            (F∧G)∧H≡F∧(G∧H)       (F∨G)∨H≡F∨(G∨H)

  **Idempotence**              F∧F≡F                 F∨F≡F

  **Distributivité**           F∧(G∨H)≡(F∧G)∨(F∧H)   F∨(G∧H)≡(F∨G)∧(F∨H)

  **Lois de De Morgan**        ¬(F∧G)≡¬F∨¬G          ¬(F∨G)≡¬F∧¬G

  **Absorption**               F∧(F∨G)≡F             F∨(F∧G)≡F

  **Éléments Neutres**         F∧⊤≡F                 F∨⊥≡F

  **Éléments Absorbants**      F∧⊥≡⊥                 F∨⊤≡⊤

  **Double Négation**          \multicolumn{2}{c    }{¬¬F≡F}

  **Tiers Exclu**              \multicolumn{2}{c    }{F∨¬F≡⊤}

  **Non-Contradiction**        \multicolumn{2}{c    }{F∧¬F≡⊥}

  **Définition Implication**   \multicolumn{2}{c    }{F→G≡¬F∨G}

  **Définition Équivalence**   \multicolumn{2}{c    }{F↔G≡(F→G)∧(G→F)}

---

Ces lois peuvent être prouvées formellement, soit en construisant les tables de vérité pour les deux côtés de l'équivalence et en vérifiant qu'elles sont identiques , soit par des preuves algébriques qui utilisent des lois déjà établies pour en dériver de nouvelles.

#### 1.3.2. Formes Normales

Pour de nombreuses applications algorithmiques, il est avantageux de travailler avec des formules qui ont une structure syntaxique standardisée, ou canonique. Les formes normales les plus importantes sont la Forme Normale Conjonctive (FNC) et la Forme Normale Disjonctive (FND).

- **Définitions Préliminaires**  :

  - Un **littéral** est une variable propositionnelle (p) ou sa négation (¬p).
  - Une **clause** (ou somme élémentaire) est une disjonction de littéraux (ex: p∨¬q∨r).
  - Un **terme** (ou produit élémentaire) est une conjonction de littéraux (ex: p∧¬q∧r).
- **Forme Normale Conjonctive (FNC)** : Une formule est en FNC si elle est une conjonction de clauses. Exemple : (p∨¬q)∧(¬p∨r)∧q.
- **Forme Normale Disjonctive (FND)** : Une formule est en FND si elle est une disjonction de termes. Exemple : (p∧¬q)∨(¬p∧r)∨q.

Un théorème fondamental de la logique propositionnelle stipule que **toute formule possède une FNC et une FND qui lui sont logiquement équivalentes**. Cette propriété garantit que nous pouvons toujours transformer une formule quelconque en une de ces formes standards.

#### 1.3.3. Algorithmes de Conversion en Formes Normales

Il existe deux approches principales pour convertir une formule en forme normale.

**Table 1.3: Algorithmes de Conversion en FNC/FND**

---

  Méthode          Description                                                    Procédure pour la FND                                                                                                                                                                                                                                                                                                                                                                                      Procédure pour la FNC                                                                                                                                                                                               Source(s)

  **Sémantique**   Basée sur la table de vérité de la formule.                    Pour chaque ligne de la table où la formule est **vraie** (valeur 1), construire un terme (conjonction) qui correspond à cette valuation (le minterme). La FND est la disjonction de tous ces termes.                                                                                                                                                                                                      Pour chaque ligne de la table où la formule est **fausse** (valeur 0), construire une clause (disjonction) qui est la négation de cette valuation (le maxterme). La FNC est la conjonction de toutes ces clauses.

  **Syntaxique**   Basée sur l'application successive des lois d'équivalence.   1\. **Éliminer ↔ et →** en utilisant leurs définitions (A↔B≡..., A→B≡¬A∨B). 2. **Pousser les négations** vers l'intérieur en utilisant les lois de De Morgan et la double négation, jusqu'à ce qu'elles ne portent que sur des variables (mise en forme normale négative). 3. **Appliquer la distributivité** de ∧ sur ∨ pour "sortir" les conjonctions et obtenir une disjonction de conjonctions.   1\. **Éliminer ↔ et →**. 2. **Pousser les négations** vers l'intérieur. 3. **Appliquer la distributivité** de ∨ sur ∧ pour "sortir" les disjonctions et obtenir une conjonction de disjonctions.

---

#### 1.3.4. Le Compromis entre Équivalence et Satisfiabilité

Bien que les méthodes ci-dessus garantissent la conversion en une forme normale *équivalente*, elles présentent un inconvénient majeur : la taille de la formule résultante peut croître de manière exponentielle par rapport à la taille de la formule originale. Par exemple, la conversion de la formule

(p1∧q1)∨(p2∧q2)∨⋯∨(pn∧qn) en FNC par distributivité génère 2n clauses. Cette explosion combinatoire rend l'approche syntaxique directe impraticable pour des applications réelles comme la vérification de circuits ou la résolution de problèmes de planification.

C'est ici qu'intervient une distinction subtile mais cruciale : la différence entre **l'équivalence logique** et **l'équisatisfiabilité**. Deux formules sont équisatisfiables si elles sont soit toutes les deux satisfiables, soit toutes les deux insatisfiables. L'équisatisfiabilité est une relation plus faible que l'équivalence (deux formules équivalentes sont toujours équisatisfiables, mais la réciproque est fausse).

Pour de nombreuses applications, notamment la résolution SAT, il n'est pas nécessaire de préserver l'équivalence exacte de la formule originale. Il suffit de générer une nouvelle formule en FNC qui est satisfiable si et seulement si l'originale l'est. La **transformation de Tseitin** est une technique algorithmique ingénieuse qui accomplit précisément cela, en temps linéaire.

Le principe de la transformation de Tseitin est d'introduire de nouvelles variables propositionnelles pour représenter les sous-formules. Pour chaque sous-formule S de la formule originale F, on introduit une nouvelle variable xS et on ajoute un ensemble de clauses qui forcent l'équivalence xS↔S. Par exemple, pour une sous-formule A∧B, on introduit une nouvelle variable xA∧B et on ajoute les clauses équivalentes à xA∧B↔(xA∧xB), qui sont (¬xA∧B∨xA), (¬xA∧B∨xB), et (¬xA∨¬xB∨xA∧B). En appliquant ce processus à toutes les sous-formules, on obtient une grande conjonction de petites clauses, à laquelle on ajoute la clause finale \[xF\] (pour forcer la formule entière à être vraie). La FNC résultante est équisatisfiable à la formule originale et sa taille est linéaire par rapport à celle-ci. Ce compromis est au cœur de l'efficacité des solveurs SAT modernes.

#### 1.3.5. Minimisation des Formes Normales

Dans des domaines comme la conception de circuits logiques, l'objectif n'est pas seulement de trouver une forme normale, mais de trouver la forme normale *la plus simple* (avec le moins de littéraux ou de termes/clauses), car cela se traduit directement par un circuit moins coûteux et plus rapide. Le problème de la minimisation de fonctions booléennes est un problème d'optimisation complexe.

L'**algorithme de Quine-McCluskey** est une méthode tabulaire systématique pour trouver une FND minimale pour une fonction booléenne donnée. Il est plus systématique que les tableaux de Karnaugh et peut être programmé pour un plus grand nombre de variables. L'algorithme se déroule en deux étapes majeures.

1. **Identification des Implicants Premiers :**

   - On liste tous les mintermes (les valuations qui rendent la fonction vraie) de la fonction.
   - On groupe les mintermes par nombre de '1' dans leur représentation binaire.
   - On compare itérativement les termes de groupes adjacents. Si deux termes ne diffèrent que par un seul bit, ils sont fusionnés en un nouveau terme où le bit différent est remplacé par un tiret - (qui signifie "indifférent"). Les deux termes originaux sont marqués comme "couverts".
   - On répète ce processus de fusion avec les nouveaux termes jusqu'à ce qu'aucune fusion ne soit plus possible.
   - Les termes qui n'ont pas été couverts à l'issue de ce processus sont les **implicants premiers** de la fonction. Un implicant premier est un terme qui ne peut être simplifié davantage tout en continuant à n'impliquer que des mintermes de la fonction originale.
2. **Construction de la Table des Implicants Premiers :**

   - On construit une table avec les implicants premiers en lignes et les mintermes originaux en colonnes.
   - On coche une case (i,j) si l'implicant premier i "couvre" (implique) le minterme j.
   - On identifie les **implicants premiers essentiels** : ce sont ceux qui sont les seuls à couvrir un certain minterme. Ces implicants doivent obligatoirement faire partie de la solution minimale.
   - On sélectionne les implicants premiers essentiels et on retire de la table tous les mintermes qu'ils couvrent.
   - S'il reste des mintermes non couverts, on choisit un sous-ensemble minimal d'implicants premiers restants pour couvrir les mintermes restants. Cette dernière étape est un problème de couverture d'ensemble (set cover), qui est NP-difficile, mais souvent gérable en pratique pour des tailles raisonnables.

La disjonction des implicants premiers essentiels et des implicants choisis à la dernière étape forme la FND minimale de la fonction.

## Partie II : La Logique des Prédicats — Un Langage pour les Objets et leurs Relations

Si la logique propositionnelle fournit l'algèbre fondamentale du raisonnement, son pouvoir expressif reste sévèrement limité. Elle ne peut pas pénétrer la structure interne des propositions. Pour elle, "Tous les hommes sont mortels" et "Socrate est un homme" sont simplement deux atomes distincts, p et q, sans aucun lien logique apparent. Il est donc impossible, dans ce cadre, de déduire formellement que "Socrate est mortel". Pour capturer la richesse du raisonnement mathématique et du langage naturel, il nous faut un langage plus puissant, capable de parler d'objets, de leurs propriétés, des relations qui les unissent, et de faire des affirmations générales sur eux. C'est le rôle de la logique du premier ordre, ou calcul des prédicats.

### 2.1. Des Propositions aux Prédicats : Limites et Extensions

La transition vers la logique des prédicats est motivée par la nécessité de surmonter les limitations inhérentes au calcul propositionnel.

#### 2.1.1. Limites de la Logique Propositionnelle

La principale limitation est l'incapacité à analyser la structure sujet-prédicat des énoncés. Des affirmations comme :

1. Tous les informaticiens aiment la logique.
2. Alice est une informaticienne.

Ne peuvent être formalisées qu'en tant que deux variables, p et q. La conclusion évidente, "Alice aime la logique", ne peut être dérivée. La logique propositionnelle manque des outils pour exprimer la notion de "tous", pour appliquer une propriété générale ("aimer la logique") à un individu spécifique ("Alice"), et pour relier les concepts ("informaticien") entre les phrases.

#### 2.1.2. Introduction Intuitive des Nouveaux Concepts

La logique des prédicats enrichit notre langage formel avec trois nouveaux types d'éléments  :

- **Termes :** Des expressions qui désignent des **objets** ou des **individus** dans un univers de discours. Les termes peuvent être des **constantes** (comme Socrate, 0) ou des **variables** (x, y,\...) qui représentent des objets non spécifiés. Ils peuvent aussi être construits à l'aide de **fonctions** (comme père_de(x) ou successeur(n)).
- **Prédicats :** Des expressions qui dénotent des **propriétés** d'objets ou des **relations** entre objets. Un prédicat appliqué à des termes forme une proposition atomique qui est soit vraie, soit fausse. Par exemple, Homme(x) est un prédicat à un argument (unaire) qui exprime la propriété "être un homme". Père(x, y) est un prédicat à deux arguments (binaire) qui exprime la relation "x est le père de y". L'arité d'un prédicat est le nombre d'arguments qu'il requiert.
- **Quantificateurs :** Des symboles qui permettent de faire des affirmations générales sur les variables.

  - Le **quantificateur universel** ∀ ("pour tout") permet d'affirmer qu'une propriété est vraie pour tous les objets du domaine. ∀x,Homme(x)→Mortel(x) se lit "Pour tout x, si x est un homme, alors x est mortel".
  - Le **quantificateur existentiel** ∃ ("il existe") permet d'affirmer qu'il existe au moins un objet dans le domaine qui possède une certaine propriété. ∃x,Informaticien(x)∧AimeLaLogique(x) se lit "Il existe au moins un x tel que x est un informaticien et x aime la logique".

**Table 2.1 : Comparaison Logique Propositionnelle vs. Logique des Prédicats**

---

  Caractéristique         Logique Propositionnelle                         Logique des Prédicats (Premier Ordre)

  **Unité de base**       Proposition atomique (p,q)                       Termes (objets) et prédicats (propriétés/relations)

  **Structure interne**   Aucune                                           Les propositions sont structurées (ex: P(f(c),x))

  **Sémantique**          Valeurs de vérité assignées aux atomes           Interprétation dans un domaine d'objets

  **Généralisation**      Impossible                                       Possible via les quantificateurs (∀,∃)

  **Expressivité**        Limitée à des combinaisons booléennes de faits   Riche, capable de formaliser les mathématiques et le langage naturel

---

### 2.2. Syntaxe de la Logique du Premier Ordre

La syntaxe de la logique du premier ordre est une extension de celle de la logique propositionnelle, définissant un vocabulaire plus riche et des règles de formation plus complexes.

#### 2.2.1. Alphabet Étendu

Un langage du premier ordre est défini par sa **signature**, qui spécifie les symboles non logiques. L'alphabet complet comprend  :

- **Symboles logiques (communs à tous les langages du premier ordre) :**

  - Connecteurs logiques : ¬,∧,∨,→,↔
  - Quantificateurs : ∀,∃
  - Parenthèses : (, )
  - Un ensemble infini de variables : x,y,z,x1,...
- **Symboles non logiques (spécifiques à une signature) :**

  - Un ensemble de symboles de **constantes** : c1,c2,...
  - Un ensemble de symboles de **fonctions**, chacun avec une arité n≥1 : f1,f2,...
  - Un ensemble de symboles de **prédicats** (ou relations), chacun avec une arité n≥0 : P1,P2,... (les prédicats d'arité 0 sont équivalents aux variables propositionnelles).

#### 2.2.2. Définition Inductive des Termes et Formules

À partir de cet alphabet, on construit deux types d'expressions syntaxiques : les termes et les formules.

##### Termes

Un **terme** est une expression qui a pour but de nommer un objet du domaine. L'ensemble des termes est défini inductivement  :

- **(Base)** Toute variable est un terme.
- **(Base)** Toute constante est un terme.
- **(Induction)** Si f est un symbole de fonction d'arité n et si t1,...,tn sont des termes, alors f(t1,...,tn) est un terme.

Par exemple, si c est une constante, x une variable, et f une fonction binaire, alors c, x, f(x,c), et f(c,f(x,x)) sont des termes.

##### Formules

Une **formule** est une expression qui a pour but de faire une affirmation (vraie ou fausse) sur les objets. L'ensemble des formules est également défini inductivement  :

1. **Formules Atomiques :**

   - Si P est un symbole de prédicat d'arité n et si t1,...,tn sont des termes, alors P(t1,...,tn) est une formule (appelée formule atomique).
   - Si t1 et t2 sont des termes, t1=t2 est une formule atomique (si le langage inclut l'égalité).
2. **Formules Complexes :**

   - Si F et G sont des formules, alors (¬F), (F∧G), (F∨G), (F→G), et (F↔G) sont des formules.
   - Si F est une formule et x est une variable, alors (∀xF) et (∃xF) sont des formules.

#### 2.2.3. Quantification et Variables

La distinction entre variables libres et liées est l'un des aspects les plus subtils et les plus importants de la syntaxe du premier ordre.

- **Portée (Scope) :** Dans une formule (∀xF) ou (∃xF), la formule F est appelée la **portée** du quantificateur. Le quantificateur "agit" sur toutes les occurrences dex à l'intérieur de cette portée.
- **Variables Libres et Liées :** Une occurrence d'une variable x dans une formule est dite **liée** si elle se trouve dans la portée d'un quantificateur ∀x ou ∃x. Sinon, elle est dite **libre**.

  - Dans la formule ∀x(P(x)→Q(y)), l'occurrence de x dans P(x) est liée. L'occurrence de y dans Q(y) est libre.
  - Dans la formule (∃xP(x))∧Q(x), la première occurrence de x est liée, mais la seconde est libre. Pour éviter cette ambiguïté, il est de bonne pratique de renommer les variables liées pour qu'elles soient distinctes des variables libres.
- **Formules Closes (Énoncés) :** Une formule qui ne contient aucune variable libre est appelée une **formule close** ou un **énoncé**. Seules les formules closes ont une valeur de vérité qui peut être déterminée indépendamment d'une assignation de valeurs aux variables. Elles font des affirmations générales sur un domaine. Par exemple,
  ∀x∃y(y\>x) est un énoncé sur les nombres, tandis que y\>x n'est pas un énoncé car sa vérité dépend des valeurs assignées à x et y.

### 2.3. Sémantique de la Logique du Premier Ordre

La sémantique de la logique du premier ordre est considérablement plus riche que celle de la logique propositionnelle. Une formule n'a plus une valeur de vérité absolue ; sa vérité est toujours relative à une **interprétation** dans un **modèle** donné. C'est le domaine d'étude de la **théorie des modèles**. Une formule comme

∀x∃yP(x,y) n'est ni vraie ni fausse en soi. Elle est vraie dans le modèle des entiers naturels où P(x,y) signifie "y\>x", mais elle est fausse dans le même modèle si P(x,y) signifie "y\<x". La sémantique formelle a donc pour but de définir précisément les conditions sous lesquelles une formule est vraie *dans une structure donnée*.

#### 2.3.1. Structure d'Interprétation (Modèle)

Une **structure d'interprétation** (ou **modèle**) M pour un langage du premier ordre donné est un couple M=(D,I) où  :

1. D est un ensemble non vide appelé le **domaine** ou l'univers du discours. C'est l'ensemble des objets sur lesquels les variables et les quantificateurs portent.
2. I est une **fonction d'interprétation** qui associe chaque symbole non logique du langage à un élément, une fonction ou une relation sur le domaine D :

   - Pour chaque symbole de constante c, I(c) est un élément de D.
   - Pour chaque symbole de fonction f d'arité n, I(f) est une fonction de Dn dans D.
   - Pour chaque symbole de prédicat P d'arité n, I(P) est une relation sur Dn (c'est-à-dire un sous-ensemble de Dn).

#### 2.3.2. Satisfaction d'une Formule

Pour évaluer la vérité d'une formule contenant des variables libres, nous avons besoin d'une **assignation** (ou valuation de variables) σ, qui est une fonction associant chaque variable à un élément du domaine D.

On définit alors la notion de **satisfaction**, notée M,σ⊨F ("le modèle M satisfait la formule F sous l'assignation σ"), par induction sur la structure de la formule F.

D'abord, on étend l'interprétation I et l'assignation σ à tous les termes :

- \[c\]σM=I(c)
- \[x\]σM=σ(x)
- \[f(t1,...,tn)\]σM=I(f)(\[t1\]σM,...,\[tn\]σM)

Ensuite, on définit la satisfaction pour les formules :

- **Formules atomiques :**

  - M,σ⊨P(t1,...,tn) si et seulement si le n-uplet (\[t1\]σM,...,\[tn\]σM) appartient à la relation I(P).
- **Connecteurs logiques :**

  - M,σ⊨¬F ssi il n'est pas le cas que M,σ⊨F.
  - M,σ⊨F∧G ssi M,σ⊨F et M,σ⊨G.
  - (Les autres connecteurs suivent les règles propositionnelles).
- **Quantificateurs :**

  - M,σ⊨∀xF si et seulement si pour **tout** élément d∈D, on a M,σ\[x↦d\]⊨F, où σ\[x↦d\] est l'assignation identique à σ sauf qu'elle assigne d à x.
  - M,σ⊨∃xF si et seulement s'il **existe** un élément d∈D tel que M,σ\[x↦d\]⊨F.

Si une formule F est close (sans variable libre), sa satisfaction ne dépend pas de l'assignation σ. On peut alors simplement écrire M⊨F et dire que "F est vraie dans le modèle M" ou que "M est un modèle de F".

#### 2.3.3. Validité et Satisfiabilité

Les notions de validité et de satisfiabilité sont généralisées à partir de la logique propositionnelle  :

- Une formule F est **satisfiable** s'il existe au moins un modèle M et une assignation σ tels que M,σ⊨F.
- Une formule F est **valide** (ou une **tautologie du premier ordre**) si elle est vraie dans **tous** les modèles possibles pour **toutes** les assignations possibles. On note alors ⊨F.

Des exemples de formules valides incluent ∀xP(x)→∃xP(x) (à condition que le domaine soit non vide) ou encore ¬(∃xP(x))↔∀x¬P(x) (loi de De Morgan pour les quantificateurs).

## Partie III : Systèmes de Preuve et Méthodes de Raisonnement

Les parties précédentes ont établi les fondements sémantiques de la logique : la notion de vérité, de modèle et de conséquence logique (⊨). Cependant, vérifier qu'une formule est une conséquence logique d'un ensemble de prémisses exigerait en théorie d'examiner tous les modèles possibles, ce qui est infini et donc infaisable. Cette troisième partie unifie deux dimensions complémentaires du raisonnement formel. D'une part, les **systèmes de preuve formelle** offrent une approche purement syntaxique, fournissant des règles d'inférence qui permettent de dériver des théorèmes par manipulation de symboles — la déduction naturelle, qui modélise le raisonnement humain, et le principe de résolution, optimisé pour l'automatisation. D'autre part, les **méthodes de raisonnement fondamentales** — preuve directe, contraposée, absurde, principe des tiroirs, et surtout le raisonnement par induction — constituent les schémas de haut niveau que le mathématicien et l'informaticien emploient quotidiennement pour construire des preuves rigoureuses et démontrer la correction des algorithmes.

### 3.1. La Déduction Naturelle

La déduction naturelle, développée par Gerhard Gentzen, est un système de preuve conçu pour refléter aussi fidèlement que possible la structure du raisonnement logique humain. Son principe central est le raisonnement à partir d'**hypothèses** qui peuvent être introduites temporairement puis "déchargées" ou "annulées". Par exemple, pour prouver une implication

A→B, la méthode naturelle consiste à supposer A, à en déduire B, puis à conclure que A→B est vrai, déchargeant ainsi l'hypothèse initiale A.

Le système est organisé autour de paires de règles pour chaque connecteur et quantificateur : une **règle d'introduction** qui explique comment construire une formule contenant ce symbole, et une **règle d'élimination** qui explique comment utiliser une formule contenant ce symbole pour en déduire autre chose.

#### 3.1.1. Règles d'Introduction et d'Élimination

Le tableau suivant présente les règles de la déduction naturelle pour la logique classique. Une déduction est représentée par un arbre de preuve, où les feuilles sont des axiomes ou des hypothèses, les nœuds internes sont des applications de règles, et la racine est la conclusion. La notation \[A\] au-dessus d'une prémisse indique que l'hypothèse A est déchargée par l'application de la règle.

**Table 3.1 : Système de Règles de la Déduction Naturelle**

---

  Connecteur                        Règle d'Introduction        Règle d'Élimination

  **Axiome**                        A⊢A (ax)

  **Conjonction** (∧)               Γ,Δ⊢A∧BΓ⊢AΔ⊢B(∧I)            Γ⊢AΓ⊢A∧B(∧Eg)Γ⊢BΓ⊢A∧B(∧Ed)

  **Implication** (→)               Γ⊢A→BΓ,\[A\]⊢B(→I)           Γ,Δ⊢BΓ⊢AΔ⊢A→B(→E,Modus Ponens)

  **Disjonction** (∨)               Γ⊢A∨BΓ⊢A(∨Ig)Γ⊢A∨BΓ⊢B(∨Id)   Γ,Δ,Θ⊢CΓ⊢A∨BΔ,\[A\]⊢CΘ,⊢C(∨E,Raisonnement par cas)

  **Négation** (¬)                  Γ⊢¬AΓ,\[A\]⊢⊥(¬I)            Γ,Δ⊢⊥Γ⊢AΔ⊢¬A(¬E)

  **Absurde** (⊥)                                                Γ⊢AΓ⊢⊥(⊥E,Ex falso quodlibet)

  **Raisonnement par l'absurde**                                Γ⊢AΓ,\[¬A\]⊢⊥(RAA)

  **Quant. Universel** (∀)          Γ⊢∀xAΓ⊢A\[x↦y\](∀I)∗         Γ⊢A\[x↦t\]Γ⊢∀xA(∀E)

  **Quant. Existentiel** (∃)        Γ⊢∃xAΓ⊢A\[x↦t\](∃I)          Γ,Δ⊢BΓ⊢∃xAΔ,\[A\[x↦y\]\]⊢B(∃E)∗∗

---

\* Condition pour (∀I) : La variable y ne doit pas apparaître libre dans Γ ou dans ∀xA. Cela garantit que la preuve de A\[x↦y\] est générique et ne dépend pas d'une propriété spécifique de y.

\*\* Condition pour (∃E) : La variable y ne doit pas apparaître libre dans Γ,Δ,B ou ∃xA. Cela garantit que y agit comme un témoin arbitraire pour l'existence.

#### 3.1.2. Construction de Preuves Formelles

Illustrons le système avec la preuve de la transitivité de l'implication : (A→B),(B→C)⊢(A→C).

1. (A→B)⊢(A→B) (Axiome)
2. (B→C)⊢(B→C) (Axiome)
3. A⊢A (Axiome, hypothèse temporaire)
4. (A→B),A⊢B (Modus Ponens sur 1 et 3)
5. (A→B),(B→C),A⊢C (Modus Ponens sur 2 et 4)
6. (A→B),(B→C)⊢(A→C) (Intro → sur 5, décharge l'hypothèse A)

La dernière ligne est la conclusion souhaitée. Chaque étape est une application rigoureuse d'une règle d'inférence.

#### 3.1.3. Logique Constructive et Correspondance de Curry-Howard

Le choix des règles n'est pas anodin. La règle du raisonnement par l'absurde (RAA), ou de manière équivalente l'axiome du tiers exclu (A∨¬A), est la marque de la **logique classique**. Si l'on retire cette règle, on obtient un système plus faible mais aux propriétés remarquables : la **logique intuitionniste** ou **constructive**.

Dans une preuve constructive, pour démontrer A∨B, il faut soit fournir une preuve de A, soit fournir une preuve de B. Pour démontrer ∃xP(x), il faut exhiber un témoin t et fournir une preuve de P(t). Les preuves d'existence non constructives (par exemple, "supposons qu'un tel x n'existe pas et dérivons une contradiction") ne sont pas valides.

Cette distinction a des implications profondes en informatique. La **correspondance de Curry-Howard** établit un isomorphisme entre les preuves en logique intuitionniste et les programmes dans certains langages de programmation typés (comme le lambda-calcul simplement typé). Dans cette correspondance :

- Une proposition est un type.
- Une preuve d'une proposition est un programme (un terme) de ce type.
- La simplification d'une preuve (élimination des détours) correspond à l'exécution (réduction) du programme.

Ainsi, prouver une formule de manière constructive, c'est écrire un programme qui la réalise. Cette connexion profonde entre logique et calcul est à la base des assistants de preuve comme Coq et Agda, où l'on peut écrire des programmes et prouver leur correction dans un cadre unifié.

### 3.2. Le Principe de Résolution

Contrairement à la déduction naturelle avec sa panoplie de règles, le **principe de résolution** est un système de preuve qui n'utilise qu'une seule règle d'inférence. Cette simplicité en fait un candidat idéal pour l'automatisation du raisonnement, et il est au cœur de la plupart des démonstrateurs de théorèmes modernes et des solveurs logiques.

La méthode de résolution opère sur des formules qui ont été préalablement converties en une forme standard appelée **forme clausale**. La stratégie de preuve est une preuve par réfutation : pour démontrer qu'une conclusion F découle d'un ensemble de prémisses Γ, on montre que l'ensemble Γ∪{¬F} est insatisfaisable (contradictoire).

#### 3.2.1. Mise en Forme Clausale

La forme clausale est une généralisation de la FNC. Un ensemble de clauses est interprété comme la conjonction de ses clauses, et chaque clause est une disjonction de littéraux.

- **Logique Propositionnelle :** La conversion se fait en appliquant l'algorithme de mise en FNC vu précédemment. Il est crucial, pour l'efficacité, d'utiliser une transformation qui préserve la satisfiabilité (comme la transformation de Tseitin) plutôt que l'équivalence, afin d'éviter l'explosion de la taille de la formule.
- **Logique du Premier Ordre :** La conversion est plus complexe et requiert plusieurs étapes :

  1. **Mise en Forme Normale Prénexe :** La formule est transformée en une formule équivalente où tous les quantificateurs apparaissent au début. Ceci est réalisé en utilisant des équivalences logiques pour "remonter" les quantificateurs (ex: (∀xA)∧B≡∀x(A∧B) si x n'est pas libre dans B).
  2. **Skolémisation :** Les quantificateurs existentiels sont éliminés. Chaque variable quantifiée existentiellement est remplacée par un **terme de Skolem**. Si le ∃x est dans la portée de quantificateurs universels ∀y1,...,∀yn, alors x est remplacé par f(y1,...,yn), où f est un nouveau symbole de fonction (une **fonction de Skolem**). Si ∃x n'est dans la portée d'aucun quantificateur universel, x est remplacé par une nouvelle constante (une **constante de Skolem**). La skolémisation ne préserve pas l'équivalence, mais elle préserve la satisfiabilité.
  3. **Mise en FNC de la Matrice :** La partie sans quantificateur de la formule (la matrice) est convertie en FNC en utilisant les méthodes propositionnelles.
  4. **Suppression des Quantificateurs Universels :** Les ∀ restants sont implicites ; toutes les variables sont considérées comme universellement quantifiées.

Le résultat est un ensemble de clauses du premier ordre.

#### 3.2.2. La Règle de Résolution

**Table 3.2: La Règle de Résolution et ses Applications**

---

  Cas                  Règle d'Inférence    Description                                                                                                                                                                                                                                      Source(s)

  **Propositionnel**   C1∨C2C1∨pC2∨¬p        À partir de deux clauses contenant un littéral et sa négation, on déduit une nouvelle clause (le **résolvant**) contenant tous les autres littéraux des deux clauses parentes.

  **Premier Ordre**    (C1∨C2)σC1∨L1C2∨¬L2   L1 et L2 sont des littéraux atomiques. S'il existe une substitution σ (l'**unificateur le plus général**, ou MGU) telle que L1σ=L2σ, alors on peut déduire le résolvant. L'unification est l'algorithme qui trouve une telle substitution.

---

L'**unification** est le processus qui consiste à trouver une substitution de termes pour des variables qui rend deux expressions identiques. Par exemple, pour unifier P(x,f(a)) et P(g(y),f(z)), l'unificateur le plus général est la substitution σ={x↦g(y),z↦a}. L'unification est l'opération clé qui permet d'appliquer la résolution en logique du premier ordre.

#### 3.2.3. La Preuve par Réfutation : Exemple Détaillé

Montrons que l'argument "Tous les hommes sont mortels. Socrate est un homme. Donc, Socrate est mortel." est valide.

1. **Formalisation :**

   - Prémisse 1 : ∀x(H(x)→M(x))
   - Prémisse 2 : H(s)
   - Conclusion à prouver : M(s)
2. **Négation de la Conclusion :** ¬M(s)
3. **Mise en Forme Clausale :**

   - Prémisse 1 : ∀x(¬H(x)∨M(x)). La forme clausale est {¬H(x)∨M(x)}.
   - Prémisse 2 : H(s). La forme clausale est {H(s)}.
   - Négation de la conclusion : ¬M(s). La forme clausale est {¬M(s)}.
   - Ensemble de clauses initial S={{¬H(x)∨M(x)},{H(s)},{¬M(s)}}.
4. **Dérivation par Résolution :**

   - \(1\) {¬H(x)∨M(x)} (de S)
   - \(2\) {H(s)} (de S)
   - \(3\) {¬M(s)} (de S)
   - \(4\) {M(s)} (Résolvant de (1) et (2) avec l'unificateur σ={x↦s})
   - \(5\) {} (la clause vide, ⊥) (Résolvant de (3) et (4))

Puisque nous avons dérivé la clause vide, l'ensemble de clauses initial est insatisfaisable. Par conséquent, la conclusion originale est une conséquence logique des prémisses.

### 3.3. Méthodes de Raisonnement Fondamentales

Les systèmes de preuve formels comme la déduction naturelle et la résolution fournissent les fondations rigoureuses de la logique. Cependant, dans la pratique quotidienne des mathématiques et de l'informatique, les preuves sont rarement écrites avec ce niveau de détail formel. Elles suivent plutôt des schémas de raisonnement de plus haut niveau. Les méthodes de preuve les plus courantes peuvent être comprises comme des stratégies pour construire une déduction formelle.

#### 3.3.1. Techniques de Démonstration

**Table 3.3: Structure des Méthodes de Preuve**

---

  Méthode                      Objectif      Structure Logique                                            Justification Formelle                                                                               Source(s)

  **Preuve Directe**           Prouver P→Q   Supposer P. En déduire Q par une suite d'étapes logiques.   Application directe de la règle d'introduction de l'implication (→I) en déduction naturelle.

  **Preuve par Contraposée**   Prouver P→Q   Supposer ¬Q. En déduire ¬P.                                  Basée sur l'équivalence logique (P→Q)≡(¬Q→¬P). On construit une preuve directe de la contraposée.

  **Preuve par l'Absurde**    Prouver P     Supposer ¬P. En déduire une contradiction (⊥).               Application directe de la règle du raisonnement par l'absurde (RAA) en déduction naturelle.

---

#### 3.3.2. Le Principe des Tiroirs (Pigeonhole Principle)

Le principe des tiroirs est une technique de comptage simple mais d'une puissance surprenante pour prouver l'existence de certaines propriétés dans des ensembles finis.

- **Forme Simple :** Si n+1 objets (pigeons) sont placés dans n boîtes (tiroirs), alors au moins une boîte doit contenir plus d'un objet.
- **Forme Généralisée :** Si n objets sont placés dans m boîtes, alors au moins une boîte doit contenir au moins ⌈n/m⌉ objets, où ⌈⋅⌉ est la fonction plafond.

La preuve de ce principe est un exemple classique de raisonnement par l'absurde. Pour la forme simple : supposons que chaque boîte contienne au plus un objet. Comme il y a n boîtes, il y a au total au plus n×1=n objets. Ceci contredit le fait qu'il y a n+1 objets. Donc, l'hypothèse initiale est fausse, et au moins une boîte doit contenir plus d'un objet.

La caractéristique la plus importante du principe des tiroirs est qu'il s'agit d'une **preuve d'existence non constructive**. Il garantit l'existence d'une boîte surpeuplée, mais ne donne aucune information sur laquelle c'est, ni comment la trouver. Cette propriété en fait un outil puissant pour établir des bornes et des limitations fondamentales.

Une application classique et fondamentale en informatique concerne les **tables de hachage**. Une table de hachage est une structure de données qui mappe des clés d'un grand univers U à des indices dans un tableau de taille m, où m est généralement beaucoup plus petit que la taille de U. Ce mappage est réalisé par une fonction de hachage h:U→{0,...,m−1}. Puisque l'ensemble des clés possibles (les "pigeons") est plus grand que le nombre d'indices de tableau (les "tiroirs"), le principe des tiroirs garantit que les **collisions** --- deux clés distinctes k1=k2 telles que h(k1)=h(k2) --- sont inévitables. Toute la théorie des tables de hachage est donc construite non pas sur l'évitement des collisions, mais sur leur gestion efficace. Ce principe est également utilisé en cryptographie pour prouver l'existence de collisions dans les fonctions de hachage cryptographiques.

### 3.4. Le Principe d'Induction : Raisonner sur les Structures Récursives

Le fil conducteur de ce chapitre a été la notion de définition inductive : nous avons défini les formules bien formées de manière inductive, puis les fonctions sur ces formules de manière récursive. Il est donc naturel qu'il existe une méthode de preuve spécifiquement adaptée à ces structures : le **raisonnement par induction**. L'induction et la récursion sont les deux faces d'une même médaille : la récursion est une méthode pour construire ou calculer, tandis que l'induction est une méthode pour raisonner sur ces constructions. C'est sans doute le principe de preuve le plus important en informatique théorique, car il permet de prouver des propriétés sur des objets de taille potentiellement infinie (comme tous les entiers naturels) ou des structures de données récursives (comme les listes et les arbres).

#### 3.4.1. Induction Simple et Forte sur **N**

- **Induction Simple (ou Faible) :** Pour prouver qu'une propriété P(n) est vraie pour tous les entiers naturels n≥n0, on procède en deux étapes  :

  1. **Cas de Base :** On prouve que P(n0) est vraie.
  2. **Étape Inductive :** On suppose que P(k) est vraie pour un entier arbitraire k≥n0 (c'est l'**hypothèse de récurrence**), et on utilise cette hypothèse pour prouver que P(k+1) est vraie.
- **Induction Forte (ou Complète) :** L'induction forte est une variante où l'hypothèse de récurrence est plus puissante  :

  1. **Cas de Base :** On prouve P(n0).
  2. **Étape Inductive :** On suppose que P(i) est vraie pour **tous** les entiers i tels que n0≤i≤k, et on utilise cette hypothèse pour prouver que P(k+1) est vraie.

Bien que l'induction forte semble plus puissante, les deux principes sont logiquement équivalents. Cependant, l'induction forte est souvent plus naturelle pour les problèmes où la propriété de k+1 dépend de plusieurs prédécesseurs, comme dans la preuve du théorème fondamental de l'arithmétique (tout entier supérieur à 1 est un produit de nombres premiers).

#### 3.4.2. Induction Structurelle

L'induction structurelle généralise le principe d'induction à tout ensemble défini inductivement, comme l'ensemble des formules, des listes, ou des arbres binaires. La structure de la preuve par induction structurelle suit directement la structure de la définition inductive de l'ensemble. Pour prouver qu'une propriété

P(x) est vraie pour tous les éléments x d'un ensemble inductif X :

1. **Cas de Base :** On prouve que P(b) est vraie pour chaque élément de base b de X.
2. **Étape Inductive :** Pour chaque règle de construction inductive r de X (par exemple, si x1,...,xn sont dans X, alors r(x1,...,xn) est dans X), on suppose que la propriété est vraie pour les composants (P(x1),...,P(xn) sont vraies) et on prouve qu'elle est alors vraie pour l'élément construit P(r(x1,...,xn)).

Par exemple, pour prouver une propriété sur tous les arbres binaires, on la prouverait pour l'arbre vide (cas de base), puis on supposerait qu'elle est vraie pour un sous-arbre gauche G et un sous-arbre droit D pour prouver qu'elle est vraie pour un nœud ayant G et D comme enfants.

#### 3.4.3. Applications à la Preuve de Correction d'Algorithmes

L'induction est l'outil principal pour prouver formellement qu'un algorithme est correct. La correction totale d'un algorithme se compose de deux propriétés distinctes  :

1. **Correction Partielle :** *Si* l'algorithme termine, alors il produit le résultat attendu.

   - Pour les **algorithmes récursifs**, la correction partielle se prouve naturellement par induction (simple, forte ou structurelle) sur la structure des entrées. On suppose que les appels récursifs sur des entrées "plus petites" retournent le bon résultat (hypothèse de récurrence) et on montre que la combinaison de ces résultats produit le bon résultat pour l'entrée actuelle.
   - Pour les **algorithmes itératifs** (avec des boucles), la correction partielle est prouvée à l'aide d'un **invariant de boucle**. Un invariant de boucle est une propriété qui est vraie avant la première itération et qui, si elle est vraie avant une itération, reste vraie après cette itération. On prouve par induction sur le nombre d'itérations que l'invariant est vrai à chaque étape. En combinant l'invariant avec la condition d'arrêt de la boucle, on peut alors démontrer que le résultat final est correct.
2. **Terminaison :** L'algorithme s'arrête en un temps fini pour toute entrée valide.

   - La terminaison est également prouvée par induction. On doit trouver une quantité (un "variant") qui est associée à l'état de l'algorithme, qui prend ses valeurs dans un ensemble bien fondé (comme les entiers naturels avec l'ordre ≥), et qui **décroît strictement** à chaque appel récursif ou à chaque itération de boucle. Comme il ne peut y avoir de séquence infinie strictement décroissante dans un ensemble bien fondé, l'algorithme doit nécessairement terminer.

---

Les trois premières parties de ce chapitre ont construit l'édifice complet de la logique déductive : depuis les fondements du calcul propositionnel, en passant par la puissance expressive de la logique des prédicats, jusqu'aux systèmes de preuve formels qui garantissent la correction et la complétude du raisonnement certain. Cependant, le raisonnement déductif, aussi rigoureux soit-il, ne couvre qu'une fraction du spectre intellectuel. De nombreux domaines de l'informatique --- notamment l'intelligence artificielle, la science des données et l'apprentissage automatique --- reposent fondamentalement sur le *raisonnement plausible*, c'est-à-dire la capacité à tirer des conclusions rationnelles en présence d'incertitude. Cette quatrième partie franchit le seuil de la certitude vers la plausibilité : elle présente la **logique inductive formelle**, un système rigoureux qui généralise la logique déductive, unifie la logique formelle avec la théorie moderne des probabilités (théorie de la mesure), et fournit ainsi les fondations mathématiques du raisonnement sous incertitude.

## Partie IV : La Logique Inductive — Formalisation du Raisonnement Probabiliste

### 4.1. Introduction au Raisonnement Inductif

#### 4.1.1. Dualité : Raisonnement Déductif vs Inductif (Plausibilité)

La logique, dans son acception la plus classique, est l'art du raisonnement certain. Le raisonnement déductif, tel qu'il est formalisé en mathématiques et en logique formelle, opère sur un principe de garantie : si les prémisses d'un argument sont vraies, alors la conclusion est nécessairement vraie. Une preuve mathématique est l'archétype de ce processus ; elle établit une certitude absolue ou elle échoue complètement. Cependant, la grande majorité des raisonnements humains et scientifiques se déploient en dehors de cette sphère de certitude. Les lois de la physique, les diagnostics médicaux, les verdicts juridiques ou les prévisions économiques ne sont pas des certitudes, mais des conjectures dotées d'un certain degré de plausibilité. Chaque expérience qui confirme la théorie de la relativité la rend plus plausible, mais ne la prouve jamais de manière absolue. Ce type de raisonnement, qui vise à évaluer la plausibilité d'une conclusion à la lumière d'un ensemble de preuves, est le raisonnement inductif.

L'objectif de la logique inductive est de formaliser les règles de ce "raisonnement plausible" avec la même rigueur que celle appliquée à la logique déductive. Il ne s'agit pas de concevoir une logique "plus faible", mais au contraire une logique *plus générale*. Dans le cadre que nous allons développer, la logique déductive apparaît comme un cas particulier de la logique inductive. Les certitudes de la déduction (vérité et fausseté absolues) correspondent aux cas limites de la plausibilité inductive, où les probabilités prennent les valeurs extrêmes de 1 et 0. Les règles de l'inférence déductive, comme nous le verrons, sont parfaitement encapsulées dans les règles de l'inférence inductive pour ces cas extrêmes. Le passage de la déduction à l'induction ne constitue donc pas une perte de rigueur, mais une extension du domaine d'application du raisonnement formel à l'immense champ de l'incertitude.

#### 4.1.2. La Nature de la Probabilité : Une Perspective Logique

Quelle est la nature fondamentale de la probabilité? La réponse conventionnelle, issue des travaux fondateurs d'Andrei Kolmogorov, identifie la probabilité à sa formalisation mathématique : la théorie de la mesure. Dans cette perspective, un probabiliste est un mathématicien qui étudie les espaces de probabilité, c'est-à-dire les structures satisfaisant les axiomes de Kolmogorov. Cependant, cette vision, bien que puissante, est restrictive. Les espaces de probabilité ne sont pas les concepts probabilistes eux-mêmes, mais des modèles mathématiques utilisés pour les représenter.

Ce chapitre adopte une perspective différente, d'inspiration logique, qui remonte à Leibniz et Boole : la probabilité *est* la logique du raisonnement inductif. Elle est un mode de raisonnement abstrait qui se manifeste à travers deux systèmes parallèles et équivalents : un calcul syntaxique d'inférence et un système sémantique d'interprétation. La théorie de la mesure de Kolmogorov trouve sa place naturelle au sein de ce système sémantique, mais ne l'épuise pas.

Cette perspective logique permet de recadrer le débat philosophique sur les "interprétations" de la probabilité. Le cadre formel présenté ici est agnostique quant à la source ultime de la plausibilité (qu'elle soit interprétée comme un degré de croyance subjective, une relation logique objective, ou une mesure de l'évidence). Cependant, il pose une contrainte fondamentale : les probabilités sont des relations entre des ensembles d'énoncés (les prémisses ou l'évidence) et un énoncé cible (la conclusion ou l'hypothèse). Cette nature relationnelle et propositionnelle rend le cadre incompatible avec les interprétations purement physiques de la probabilité, telles que les approches fréquentistes ou propensionnistes, qui voient la probabilité comme une propriété intrinsèque du monde physique. En revanche, il offre un méta-cadre unificateur pour toutes les interprétations qui conçoivent la probabilité comme une mesure de l'implication partielle ou du soutien évidentiel.

#### 4.1.3. Structure de la Logique Inductive : Syntaxe et Sémantique

À l'instar de la logique du premier ordre, la logique inductive est construite sur une dualité fondamentale entre la syntaxe et la sémantique. Cette structure duale garantit que le système n'est pas un simple ensemble de conventions arbitraires, mais qu'il capture fidèlement une réalité conceptuelle.

1. La Syntaxe : Le Calcul et la Dérivabilité (⊢)Le versant syntaxique est un calcul formel. Il se compose d'un langage permettant de formuler des énoncés et d'un ensemble de règles d'inférence qui dictent comment manipuler ces énoncés pour en dériver de nouveaux. L'objet central de ce calcul est la "preuve" ou la "dérivation". L'expression Q⊢(X,φ,p) signifie qu'il existe une dérivation formelle de l'énoncé inductif (X,φ,p) à partir de l'ensemble d'hypothèses Q, en utilisant uniquement les règles du calcul.1
2. La Sémantique : Les Modèles et la Conséquence (⊨)
   Le versant sémantique concerne l'interprétation et la signification. Il définit ce que les énoncés sont censés représenter. En logique déductive, le concept sémantique central est la "structure" (ou "modèle"), un univers mathématique dans lequel les énoncés sont soit vrais, soit faux. La logique inductive généralise cette notion : un "modèle inductif" est un espace de probabilité défini sur un ensemble de structures déductives. La relation de conséquence, notée Q⊨(X,φ,p), signifie que dans tout modèle inductif où les hypothèses de Q sont satisfaites, l'énoncé (X,φ,p) l'est également.1

L'alignement parfait entre ces deux versants est garanti par un **théorème de complétude**, qui stipule que Q⊢(X,φ,p) si et seulement si Q⊨(X,φ,p). Ce théorème est la pierre angulaire de la logique inductive, car il prouve que le calcul syntaxique que nous allons définir capture de manière exacte et complète la sémantique de la théorie des probabilités moderne.

### 4.2. Préliminaires Logiques et Mathématiques

#### 4.2.1. Introduction aux Langages Infinitaires (**Lω1,ω**)

La logique propositionnelle et la logique des prédicats classiques sont des langages *finitaires* : toute formule est de longueur finie et ne peut contenir que des conjonctions (∧) et des disjonctions (∨) portant sur un nombre fini de sous-formules. Cette restriction constitue un obstacle fondamental à l'unification de la logique et de la théorie des probabilités. La théorie des probabilités, dans sa formulation moderne par Kolmogorov, repose sur l'axiome de σ-additivité, qui concerne des unions *dénombrables* d'événements. Pour capturer cette propriété au niveau syntaxique, il est nécessaire d'étendre le langage logique.

Nous utilisons pour cela le langage infinitaire Lω1,ω. Ce langage est une extension de la logique du premier ordre qui autorise la formation de conjonctions et de disjonctions sur des ensembles dénombrables (finis ou infinis) de formules. Formellement, si

Φ={φn}n∈N est un ensemble dénombrable de formules bien formées, alors ⋀n∈Nφn (la conjonction de toutes les φn) et ⋁n∈Nφn (leur disjonction) sont également des formules bien formées. L'indice

ω1 fait référence à la cardinalité des conjonctions/disjonctions autorisées (inférieures à ω1, c'est-à-dire au plus dénombrables), tandis que l'indice ω indique que les séquences de quantificateurs restent finies.

Ce choix n'est pas une simple commodité technique ; il est la clé de voûte de l'édifice. Le langage Lω1,ω fournit l'isomorphe syntaxique de la σ-algèbre en théorie de la mesure. De la même manière qu'une σ-algèbre est close sous les unions dénombrables, l'ensemble des formules de Lω1,ω est clos sous les disjonctions dénombrables. C'est cette correspondance structurelle qui permet d'établir une sémantique probabiliste complète pour la logique et de prouver le théorème de complétude.

#### 4.2.2. Rappels sur la Théorie de la Mesure et les **σ**-Algèbres

La sémantique de la logique inductive repose sur les fondements de la théorie moderne des probabilités. Il est donc essentiel de rappeler les définitions de base de la théorie de la mesure.

Un **espace mesurable** est un couple (Ω,Σ) où Ω est un ensemble non vide (appelé l'univers ou l'espace des échantillons) et Σ est une **σ-algèbre** (ou tribu) sur Ω. Une σ-algèbre est une collection de sous-ensembles de Ω qui contient l'ensemble vide, est close par complémentation et est close par union dénombrable. Les éléments de Σ sont appelés les ensembles mesurables (ou événements).

Une **mesure** sur (Ω,Σ) est une fonction μ:Σ→[0,∞] qui assigne une "taille" non négative à chaque ensemble mesurable, telle que μ(∅)=0 et qui satisfait la propriété de σ-additivité : pour toute suite {An}n=1∞ d'ensembles mesurables deux à deux disjoints, μ(∪n=1∞An)=∑n=1∞μ(An). Un **espace de mesure** est un triplet (Ω,Σ,μ).

Un **espace de probabilité** est un espace de mesure (Ω,Σ,P) où la mesure P est une mesure de probabilité, c'est-à-dire qu'elle satisfait P(Ω)=1. Dans ce contexte, les éléments de Ω sont appelés les issues, et les éléments de Σ sont les événements. Enfin, un espace de mesure est dit **complet** si tout sous-ensemble d'un ensemble de mesure nulle est lui-même mesurable. Tout espace de mesure peut être étendu en un espace complet via une procédure de **complétion**.

#### 4.2.3. Structures et Théorie des Modèles

La sémantique de la logique déductive classique est définie par rapport à des objets mathématiques appelés structures. Une **signature extra-logique** L est un ensemble de symboles de constantes, de fonctions et de relations, chacun doté d'une arité spécifique.

Une **L-structure** ω est un couple (A,Lω) où A est un ensemble non vide appelé le **domaine** (ou l'univers) de la structure, et Lω est un ensemble d'interprétations pour les symboles de L sur ce domaine. Chaque symbole de constante c∈L est associé à un élément cω∈A, chaque symbole de fonction n-aire f∈L est associé à une fonction fω:An→A, et chaque symbole de relation n-aire r∈L est associé à une relation rω⊆An.

Par exemple, l'arithmétique standard peut être vue comme une structure N=(N0,{0,S,+,⋅,<}) où le domaine est l'ensemble des entiers naturels et les symboles sont interprétés de manière usuelle. Les structures sont les mondes possibles dans lesquels les formules logiques peuvent être évaluées comme vraies ou fausses. Le concept central de la sémantique inductive, que nous aborderons en section 4.4, sera de ne plus considérer une unique structure, mais un espace de probabilité défini sur un ensemble de telles structures. Ce passage d'une structure unique à une distribution de probabilité sur les structures est la généralisation fondamentale qui connecte la logique à la probabilité.

### 4.3. Le Calcul Inductif : Syntaxe et Inférence

#### 4.3.1. Énoncés Inductifs : Le Triplet **(X,φ,p)**

Le calcul déductif manipule des formules (ou énoncés). Le calcul inductif, quant à lui, manipule des objets plus complexes qui capturent la notion de plausibilité conditionnelle. L'objet fondamental de notre calcul est l'**énoncé inductif**, un triplet ordonné (X,φ,p).

- X est un ensemble de formules du langage Lω1,ω, appelé l'**antécédent**. Il représente l'ensemble des prémisses, des connaissances de base ou de l'évidence.
- φ est une formule unique du langage Lω1,ω, appelée le **conséquent**. Elle représente l'hypothèse ou la conclusion dont on évalue la plausibilité.
- p est un nombre réel dans l'intervalle $$, appelé la **probabilité**. Il représente le degré de soutien que l'antécédent X confère au conséquent φ.

Intuitivement, l'énoncé (X,φ,p) asserte que "la probabilité de φ, étant donné X, est p". Pour alléger la notation, lorsque nous manipulons des ensembles d'énoncés inductifs, nous adoptons une notation fonctionnelle. Un ensemble P d'énoncés inductifs est traité comme une fonction partielle, et nous écrivons P(φ∣X)=p pour signifier que le triplet (X,φ,p) appartient à P.

#### 4.3.2. Les Règles de l'Inférence Inductive (R1-R9)

Le cœur du calcul inductif est un ensemble de neuf règles d'inférence, notées de (R1) à (R9). Ces règles définissent comment de nouveaux énoncés inductifs peuvent être légitimement dérivés à partir d'un ensemble existant. Elles constituent l'équivalent, pour le raisonnement plausible, des règles comme le *modus ponens* pour le raisonnement déductif. Ces règles peuvent être regroupées en trois catégories fonctionnelles, comme résumé dans le tableau 4.1.

---

  Règle                                                           Nom                       Formulation Concise (Informelle)                                                                        Rôle

  **R1**                                                          Équivalence Logique       Si X≡X′ et φ≡Xφ′, alors $P(\varphi                                                                    X) = P(\varphi'

  **R2**                                                          Implication Logique       Si X⊢φ, alors $P(\varphi                                                                              X) = 1$.

  **R3**                                                          Implication Matérielle    Si $P(\psi                                                                                            X, \varphi) = 1$, alors $P(\varphi \to \psi

  **R4**                                                          Transitivité Déductive    Si $P(\varphi                                                                                         X) = 1$ et φ⊢ψ, alors $P(\psi

  **R5**                                                          Règle d'Addition         Si X⊢¬(φ∧ψ), alors $P(\varphi \vee \psi                                                             X) = P(\varphi

  **R6**                                                          Règle de Multiplication   $P(\varphi \wedge \psi                                                                              X) = P(\varphi

  **R7**                                                          Règle de Continuité       Pour une suite croissante d'événements φn, $P(\bigvee_n \varphi_n                                   X) = \lim_n P(\varphi_n

  **R8**                                                          Extension Inductive       Si une valeur de probabilité est déterminée de manière unique par les règles R1-R7, elle est inférée.   Règle de clôture qui empêche de laisser indéterminées des probabilités qui sont logiquement contraintes.

  **R9**                                                          Extension Déductive       On peut ajouter des énoncés de probabilité 1 à un antécédent sans changer les autres probabilités.      Permet de simplifier les contextes en intégrant les certitudes acquises.

  *Tableau 4.1 : Les Règles de l'Inférence Inductive (R1-R9).*

---

##### 4.3.2.1. Connexion avec l'Inférence Déductive (R1-R4)

Les quatre premières règles garantissent que la logique inductive est une extension propre et cohérente de la logique déductive. La règle

**(R1)**, la règle d'équivalence logique, stipule que si deux antécédents X et X′ sont logiquement équivalents, et si deux conséquents φ et φ′ sont logiquement équivalents *dans le contexte de* X, alors la probabilité doit être la même. Cela assure que la probabilité est attachée au contenu sémantique des propositions, pas à leur formulation accidentelle. La règle **(R2)**, la règle de l'implication logique, est le pont le plus direct entre les deux logiques : tout ce qui est déductivement prouvable à partir de X doit se voir assigner une probabilité de 1 étant donné X. Les règles **(R3)** et **(R4)** renforcent cette connexion en assurant que la certitude (probabilité 1) se comporte de manière attendue par rapport à l'implication et à la transitivité déductive.

##### 4.3.2.2. Règles Probabilistes Fondamentales : Addition, Multiplication, Continuité (R5-R7)

Ces trois règles sont les analogues syntaxiques des axiomes fondamentaux de la probabilité de Kolmogorov. La règle

**(R5)**, la règle d'addition, s'applique à des conséquents mutuellement exclusifs (prouvablement incompatibles étant donné l'antécédent) et stipule que la probabilité de leur disjonction est la somme de leurs probabilités. La règle **(R6)**, la règle de multiplication, est la définition formelle de la probabilité conditionnelle, reliant la probabilité d'une conjonction aux probabilités conditionnelles et marginales. Enfin, la règle **(R7)**, la règle de continuité, est l'innovation la plus significative, rendue possible par le langage infinitaire Lω1,ω. Elle stipule que pour une suite croissante d'énoncés (où chaque énoncé implique le précédent), la probabilité de leur disjonction infinie est la limite de leurs probabilités. C'est l'expression syntaxique directe de la σ-additivité des mesures de probabilité.

##### 4.3.2.3. Règles d'Extension (R8-R9)

Les règles (R8) et (R9) sont des règles de clôture plus subtiles, qui garantissent que le système de déduction est complet et bien élevé. La règle

**(R8)**, la règle d'extension inductive, est une sorte de principe de raison suffisante. Si, à partir d'un ensemble d'énoncés, il n'existe qu'une seule valeur possible pour une probabilité non encore spécifiée qui soit compatible avec les règles (R1)-(R7), alors cette valeur doit être inférée. Cela empêche le système de rester silencieux sur des probabilités qui sont en fait logiquement déterminées. La règle **(R9)**, la règle d'extension déductive, stipule que si certains énoncés ont une probabilité de 1 étant donné X, on peut les ajouter à l'antécédent X sans affecter les autres probabilités. Cela permet de simplifier le raisonnement en absorbant les certitudes acquises dans le contexte.

#### 4.3.3. Théories Inductives, Connectivité et Cohérence

En logique déductive, une théorie est simplement un ensemble d'énoncés clos sous la relation de dérivabilité (⊢). En logique inductive, cette définition doit être affinée. Une **théorie inductive** est un ensemble d'énoncés inductifs qui est non seulement *clos* sous les neuf règles d'inférence, mais qui est également *connecté*.

La notion de **connectivité** est une caractéristique essentielle et nouvelle de la logique inductive. Elle est introduite pour garantir la cohérence globale d'un cadre de raisonnement. L'ensemble des énoncés inductifs est si vaste qu'il est possible de construire des ensembles d'énoncés qui sont clos sous les règles (R1)-(R9) mais qui contiennent des "îlots" de raisonnement sans aucun lien logique entre eux. Par exemple, un tel ensemble pourrait contenir des énoncés sur la physique des particules et d'autres sur les résultats d'élections, sans qu'aucun chemin d'inférence ne relie les deux domaines. La connectivité exige qu'il existe un antécédent de base (la "racine" de la théorie) à partir duquel tous les autres antécédents de la théorie peuvent être construits par l'ajout d'un nombre dénombrable d'axiomes. Cette condition garantit que tous les énoncés au sein d'une même théorie inductive appartiennent à un seul et même "fil de discussion" logique et cohérent.

#### 4.3.4. Dérivabilité Inductive (**⊢**)

Avec la définition d'une théorie inductive en place, nous pouvons maintenant définir formellement la **dérivabilité inductive**. Soit Q un ensemble d'énoncés inductifs servant d'hypothèses. Nous disons que l'énoncé (X,φ,p) est **dérivable** de Q, et nous notons Q⊢(X,φ,p), si et seulement si (X,φ,p) appartient à la plus petite théorie inductive qui contient Q.

Cette définition est l'analogue direct de la définition de la dérivabilité en logique déductive, où X⊢φ signifie que φ appartient à la plus petite théorie déductive contenant X. Le processus de dérivation inductive consiste donc à générer la clôture d'un ensemble d'hypothèses initiales sous les neuf règles d'inférence, tout en s'assurant que le résultat final forme un tout connecté et cohérent.

### 4.4. Sémantique de la Logique Inductive : Les Modèles

#### 4.4.1. Définition d'un Modèle Inductif (Espace Probabilisé de Structures)

La sémantique fournit une interprétation, une signification, aux formules syntaxiques. En logique déductive, un modèle est une unique structure mathématique qui représente un "état du monde" possible. Dans ce monde, chaque énoncé est soit vrai, soit faux. Pour donner un sens à des énoncés de probabilité, nous devons généraliser cette notion pour représenter l'incertitude sur l'état du monde.

Un **modèle inductif** P est formellement défini comme un espace de probabilité (Ω,Σ,P) où l'espace des issues Ω n'est pas un ensemble abstrait, mais un ensemble de L-structures, c'est-à-dire un ensemble de mondes possibles.

- Ω est un ensemble de L-structures. Chaque structure ω∈Ω est un modèle déductif classique, avec un domaine et une interprétation pour chaque symbole de la signature L.
- Σ est une σ-algèbre sur Ω.
- P est une mesure de probabilité sur (Ω,Σ).

Un modèle inductif peut donc être vu comme une collection de mondes possibles, pondérée par une distribution de probabilité qui représente notre degré de croyance ou la vraisemblance relative de chaque monde.

#### 4.4.2. Relation de Conséquence Inductive (**⊨**)

À partir de la définition d'un modèle inductif, nous pouvons définir la notion de satisfaction, qui relie la sémantique à la syntaxe. Pour un énoncé déductif φ, nous disons qu'une structure ω satisfait φ, noté ω⊨φ, si φ est vrai dans ω. Pour un énoncé inductif (X,φ,p), la satisfaction par un modèle inductif P=(Ω,Σ,P), notée P⊨(X,φ,p), est définie de manière plus complexe.

Intuitivement, P⊨(X,φ,p) signifie que la probabilité conditionnelle de l'ensemble des mondes où φ est vrai, étant donné l'ensemble des mondes où X est vrai, est égale à p. Formellement, cela est défini en utilisant une version de la formule de la probabilité conditionnelle sur les sous-ensembles de Ω définis par les formules. Soit φΩ={ω∈Ω∣ω⊨φ} l'ensemble des structures dans Ω qui satisfont φ. Alors P⊨(X,φ,p) s'il existe une décomposition de l'antécédent X en un ensemble de certitudes Y (telles que P(YΩ)=1) et une hypothèse contingente ψ, de sorte que X≡Y∪{ψ} et P(φΩ∩ψΩ)/P(ψΩ)=p.

La **relation de conséquence inductive** est alors définie naturellement : Q⊨(X,φ,p) signifie que pour tout modèle inductif P, si P satisfait tous les énoncés de l'ensemble d'hypothèses Q, alors P doit également satisfaire (X,φ,p).

#### 4.4.3. Théorème de Complétude : Équivalence entre **⊢** et **⊨**

Le résultat central de la logique inductive, qui en assure la cohérence et la puissance, est le **théorème de complétude**. Il établit une équivalence parfaite entre le calcul syntaxique et la sémantique probabiliste.

Théorème (Complétude Inductive) : Soit Q un ensemble d'énoncés inductifs et (X,φ,p) un énoncé inductif. Alors :

Q⊢(X,φ,p)si et seulement siQ⊨(X,φ,p)

Ce théorème est d'une importance capitale. Il démontre que les neuf règles d'inférence (le système ⊢) ne sont pas un ensemble arbitraire de règles, mais qu'elles capturent de manière *exacte et complète* la notion de conséquence logique dans les espaces de probabilité de structures (le système ⊨). Cela signifie que tout ce qui est sémantiquement valide est syntaxiquement prouvable, et vice-versa. Le raisonnement probabiliste peut donc être entièrement formalisé comme un système de déduction logique, unifiant ainsi les deux piliers du raisonnement formel et réalisant la vision de pionniers comme Leibniz et Boole.

#### 4.4.4. Extension à la Logique des Prédicats

L'extension du cadre de la logique propositionnelle à la logique des prédicats (qui inclut les quantificateurs ∀,∃) enrichit considérablement son pouvoir expressif, notamment en permettant une modélisation naturelle des variables aléatoires et en révélant une propriété profonde de l'aléatoire.

##### 4.4.4.1. Variables Aléatoires comme Symboles Extra-logiques

En théorie des probabilités, une variable aléatoire est une fonction qui associe une valeur numérique à chaque issue d'un espace d'échantillonnage. Dans le cadre de la logique inductive, ce concept est capturé de manière élégante et directe. Un symbole extra-logique s (une constante, une fonction ou une relation) n'a pas une interprétation fixe et unique, mais une interprétation sω qui dépend de la structure (le "monde") ω∈Ω considérée.

L'application ω↦sω est donc une fonction définie sur l'espace des structures Ω. C'est l'analogue formel exact d'une variable aléatoire. Par exemple, si c est un symbole de constante et que le domaine des structures est l'ensemble des nombres réels, l'application ω↦cω est une variable aléatoire à valeur réelle.

##### 4.4.4.2. La Relativité de l'Aléatoire et les Cadres de Référence

L'extension à la logique des prédicats révèle une subtilité conceptuelle majeure. Considérons un énoncé probabiliste comme P{X>0}. En théorie des probabilités classique, il est implicite que X est une variable aléatoire, tandis que la relation > et la constante 0 sont des entités mathématiques fixes et non aléatoires. Dans le formalisme de la logique inductive, l'énoncé correspondant s'interprète dans un modèle inductif comme la probabilité de l'ensemble des structures ω où Xω>ω0ω.

Dans ce cadre, il n'y a *a priori* aucune raison pour que l'interprétation de la relation > ou de la constante 0 soit la même dans toutes les structures ω. Elles peuvent elles-mêmes être "aléatoires". Ce qui est considéré comme fixe (déterministe) et ce qui est considéré comme variable (aléatoire) n'est pas une propriété intrinsèque du monde, mais dépend d'un **cadre de référence** choisi par le modélisateur. Un cadre de référence est un ensemble de contraintes qui forcent certains symboles à avoir la même interprétation dans toutes les structures considérées.

Cette "relativité de l'aléatoire" a des implications profondes. Elle suggère que l'aléatoire n'est pas une propriété ontologique, mais une propriété épistémique relative à un cadre de connaissance. Pour l'intelligence artificielle, cela signifie qu'un agent rationnel doit explicitement définir son cadre de référence --- quelles sont les constantes de son univers et quelles sont les variables? --- pour pouvoir raisonner de manière cohérente sur l'incertitude.

### 4.5. Théories Avancées et Principe d'Indifférence

#### 4.5.1. Théories Inductives Réelles et Intégration dans ZFC

La puissance expressive de la logique inductive est telle qu'elle peut englober l'ensemble des mathématiques modernes. En adoptant une théorie axiomatique des ensembles, telle que la théorie de Zermelo-Fraenkel avec l'axiome du choix (ZFC), comme partie de l'antécédent d'une théorie inductive, il devient possible de construire formellement les nombres réels, les espaces fonctionnels, et toute autre structure mathématique. Le cadre permet alors de formuler des énoncés inductifs (probabilistes) rigoureux sur n'importe quel objet mathématique, des nombres réels aux fonctions et aux espaces topologiques.

#### 4.5.2. Reformulation des Théorèmes Limites (LGN, TCL)

Pour illustrer cette puissance, les théorèmes fondamentaux de la théorie des probabilités peuvent être reformulés et prouvés comme des théorèmes au sein de la logique inductive. La **Loi des Grands Nombres (LGN)**, qui stipule que la moyenne d'un grand nombre de variables aléatoires i.i.d. converge vers leur espérance, et le **Théorème Central Limite (TCL)**, qui décrit la convergence de cette moyenne vers une distribution normale, peuvent être énoncés comme des énoncés inductifs dérivés des axiomes de ZFC et des définitions appropriées de l'indépendance et de l'espérance. Cela démontre que le cadre logique ne se contente pas de reproduire les axiomes de base, mais qu'il est suffisamment riche pour recapturer les résultats les plus profonds de la discipline.

#### 4.5.3. Le Principe d'Indifférence : Historique et Problématique

Le **Principe d'Indifférence**, dont l'origine remonte à Pierre-Simon Laplace, est une heuristique intuitivement très puissante pour l'assignation des probabilités a priori. Il stipule que si, en l'absence de toute information pertinente, nous n'avons aucune raison de privilégier une possibilité par rapport à une autre, nous devrions leur assigner des probabilités égales. C'est le principe qui sous-tend l'assignation d'une probabilité de 1/2 à chaque face d'une pièce de monnaie présumée non biaisée.

Cependant, l'application naïve de ce principe a une histoire notoire de production de paradoxes. Comme l'a souligné John Maynard Keynes, des manières apparemment équivalentes de décrire un même problème peuvent conduire à des partitions différentes des possibilités, et l'application du principe à chaque partition peut donner des résultats contradictoires. Le plus célèbre de ces paradoxes est celui de Bertrand, concernant la probabilité qu'une corde "choisie au hasard" dans un cercle soit plus longue que le côté du triangle équilatéral inscrit.

#### 4.5.4. Formulation Rigoureuse en Logique Inductive

La logique inductive offre, pour la première fois, une formulation mathématiquement rigoureuse du Principe d'Indifférence, résolvant ainsi ses ambiguïtés historiques. Cette formalisation est impossible dans le cadre standard de Kolmogorov car elle dépend de la structure syntaxique du langage logique.

##### 4.5.4.1. Permutations de Signature et Invariance

L'idée clé est de capturer la notion d'"ignorance symétrique" par une invariance syntaxique. Une **permutation de signature** π est un renommage bijectif et cohérent des symboles extra-logiques de la signature L qui préserve leur type et leur arité (par exemple, un symbole de relation binaire est remplacé par un autre symbole de relation binaire). Une telle permutation peut être appliquée à n'importe quelle formule

φ pour obtenir une nouvelle formule φπ. Un ensemble de formules X est dit **invariant** sous π si X et Xπ sont logiquement équivalents.

##### 4.5.4.2. Indifférence Déductive et Inductive

Le raisonnement déductif obéit déjà à une forme d'indifférence : si X⊢φ, alors il est trivial de montrer que Xπ⊢φπ. La preuve est insensible au nom des symboles. Le Principe d'Indifférence est l'extension naturelle de cette propriété à l'inférence inductive. Une théorie inductive P satisfait le principe si, pour toute permutation de signature π, on a :

P(φ∣X)=P(φπ∣Xπ)

En particulier, si la connaissance de base X est invariante sous π (X≡Xπ), alors le principe exige que P(φ∣X)=P(φπ∣X). La "symétrie de l'ignorance" est ainsi formellement identifiée à l'invariance de la théorie de base sous une transformation syntaxique.1 Cette formulation est une avancée conceptuelle majeure, car elle démontre que la logique inductive est strictement plus expressive que la théorie des probabilités de Kolmogorov, qui ne dispose pas des outils syntaxiques nécessaires pour exprimer une telle condition d'invariance.1

#### 4.5.5. Application : Résolution du Paradoxe de Bertrand

La puissance de cette formulation rigoureuse est spectaculairement démontrée par son application au **paradoxe de Bertrand**. Le paradoxe naît de l'ambiguïté de l'expression "choisir une corde au hasard". Différentes méthodes de sélection (par les extrémités, par le milieu, etc.) conduisent à des probabilités différentes (1/3, 1/2, 1/4).

La logique inductive résout le paradoxe en forçant le modélisateur à être explicite. Pour poser le problème, il faut définir une signature logique et une théorie de base T0 décrivant la géométrie du cercle. Chaque méthode de "choix au hasard" correspond à une hypothèse différente sur les symétries (les permutations de signature) sous lesquelles la théorie T0 est supposée être invariante. La logique inductive montre que les trois solutions classiques du paradoxe ne sont pas contradictoires ; elles sont les réponses correctes à trois problèmes distincts, chacun caractérisé par un groupe de symétrie différent. Le paradoxe se dissout : il n'y a pas de contradiction, seulement une spécification initiale incomplète du problème.

### 4.6. Implications pour l'Informatique et l'IA

#### 4.6.1. Fondations Logiques pour le Raisonnement Probabiliste en IA

L'intelligence artificielle est de plus en plus confrontée à la nécessité de raisonner et d'agir dans des environnements incertains. Pour ce faire, une multitude de formalismes probabilistes ont été développés, tels que les réseaux bayésiens, les modèles de Markov cachés, et les logiques probabilistes. Bien qu'efficaces, ces outils sont souvent perçus comme des constructions ad-hoc, chacune avec sa propre sémantique et ses propres algorithmes.

La logique inductive, telle que présentée ici, offre une fondation unificatrice pour l'ensemble de ces approches. Elle fournit un langage commun et une sémantique rigoureuse dans lesquels ces différents modèles peuvent être exprimés et compris comme des théories inductives spécifiques. Un réseau bayésien, par exemple, peut être vu comme une spécification compacte d'une théorie inductive qui postule un ensemble d'indépendances conditionnelles. Cette perspective unifiée permet non seulement de clarifier les hypothèses sous-jacentes à chaque modèle, mais aussi de comparer leur pouvoir expressif et d'étudier leurs relations sur une base formelle solide.

#### 4.6.2. Analyse des Méthodes Probabilistes

En plaçant le raisonnement probabiliste sur des fondations logiques, ce cadre ouvre la voie à l'analyse formelle et à la vérification des systèmes d'IA probabilistes. De la même manière que la logique formelle est utilisée pour vérifier la correction des logiciels et des circuits matériels, la logique inductive peut être utilisée pour analyser la cohérence et la robustesse des algorithmes d'apprentissage et de raisonnement.

Par exemple, la **Programmation Logique Inductive (ILP)**, un sous-domaine de l'IA qui vise à apprendre des programmes logiques à partir d'exemples, peut être naturellement intégrée dans ce cadre. L'apprentissage d'une règle en ILP peut être vu comme la recherche d'une hypothèse

φ qui, ajoutée à la connaissance de base B, maximise la probabilité des exemples positifs tout en minimisant celle des exemples négatifs. Le formalisme de la logique inductive permet d'analyser la validité de ces inférences et de garantir qu'un système d'IA ne tirera jamais de conclusions probabilistes incohérentes avec ses connaissances de base.

#### 4.6.3. Gestion de l'Indécidabilité et de l'Incertitude

Un des défis les plus profonds en IA est de construire des agents capables de raisonner avec des connaissances incomplètes, dans des mondes ouverts où tout n'est pas connu à l'avance. La logique déductive classique est fragile face à cette réalité : un énoncé indécidable (qui ne peut être ni prouvé ni réfuté à partir de la base de connaissances) paralyse le raisonnement. Le système ne peut rien conclure.

La logique inductive offre une solution élégante et puissante à ce problème. Face à un énoncé indécidable

ψ, un agent n'est plus contraint au silence. Il peut utiliser la logique inductive pour postuler une probabilité pour cet énoncé, par exemple en posant P(ψ∣X)=0.5 via le Principe d'Indifférence si aucune information ne favorise ψ ou ¬ψ. À partir de cette hypothèse, l'agent peut explorer de manière cohérente les conséquences probabilistes qui en découlent, raisonner sur ses actions possibles, et mettre à jour sa croyance en ψ à la lumière de nouvelles preuves via la règle de Bayes (qui est un théorème de la logique inductive).

Cette capacité à assigner des probabilités à des hypothèses indécidables et à raisonner rigoureusement à partir d'elles est une avancée fondamentale. Elle connecte la logique formelle à la théorie de la décision bayésienne et fournit une base normative pour la construction d'agents rationnels capables d'agir de manière intelligente dans des conditions d'incertitude radicale, ce qui est l'un des objectifs ultimes de l'intelligence artificielle.

---

## Conclusion

Ce chapitre a entrepris une traversée exhaustive des fondements logiques et formels du raisonnement, depuis les certitudes cristallines de la déduction jusqu'aux subtilités du raisonnement plausible sous incertitude. L'arc narratif qui le structure --- de la logique déductive à la logique inductive --- n'est pas une simple juxtaposition de deux disciplines distinctes, mais la révélation d'un continuum conceptuel profond où la certitude et la plausibilité s'inscrivent dans un même cadre formel unifié.

**La genèse historique** (Partie I) a montré que la logique formelle, loin d'être une invention abstraite détachée de l'histoire, est le fruit d'une quête millénaire de formalisation du raisonnement, depuis le syllogisme aristotélicien jusqu'à l'algèbre booléenne et aux travaux fondateurs de Frege, en passant par les contributions décisives de Leibniz. Cette généalogie intellectuelle éclaire les choix conceptuels qui structurent l'ensemble de l'édifice.

**La logique propositionnelle** (Partie II) a établi le premier étage de cet édifice : un système complet de manipulation de propositions atomiques reliées par des connecteurs logiques. La dualité entre syntaxe (formules, règles de dérivation) et sémantique (tables de vérité, valuations) y est apparue pour la première fois, culminant dans les théorèmes de correction et de complétude qui garantissent l'alignement parfait entre calcul et signification.

**La logique des prédicats** (Partie III) a considérablement enrichi ce cadre en introduisant les quantificateurs, les variables et les structures relationnelles, permettant d'exprimer des propriétés portant sur des domaines d'objets. Les systèmes de preuve formels --- déduction naturelle, calcul des séquents, résolution --- ont fourni les outils opérationnels du raisonnement déductif mécanisable, avec des implications directes pour la vérification formelle et les fondements de l'informatique théorique.

**La logique inductive** (Partie IV) a franchi le seuil décisif de la certitude vers la plausibilité. En construisant un calcul inductif doté de neuf règles d'inférence et une sémantique fondée sur les espaces de probabilité de structures, cette partie a démontré que le raisonnement probabiliste peut être entièrement formalisé comme un système logique. Le théorème de complétude inductive, qui établit l'équivalence exacte entre dérivabilité syntaxique et conséquence sémantique, unifie la logique formelle et la théorie de la mesure de Kolmogorov, réalisant ainsi la vision de Leibniz et de Boole. La formalisation rigoureuse du Principe d'Indifférence et la résolution du paradoxe de Bertrand illustrent la puissance expressive de ce cadre, qui dépasse celle de la théorie des probabilités standard.

Ces fondements logiques constituent le socle sur lequel reposent de nombreuses disciplines de l'informatique moderne. La logique propositionnelle sous-tend la conception des circuits numériques et les solveurs SAT ; la logique des prédicats fonde la vérification formelle des logiciels, les bases de données relationnelles et la programmation logique ; la logique inductive fournit les assises théoriques de l'intelligence artificielle probabiliste, de l'apprentissage automatique bayésien et de la théorie de la décision rationnelle. Les chapitres suivants de cet ouvrage poursuivront cette exploration en abordant les structures discrètes et combinatoires, les fondements de la calculabilité, les architectures matérielles, et les paradigmes de l'intelligence artificielle --- autant de domaines qui s'appuient, directement ou indirectement, sur l'appareil logique présenté ici.

*Chapitre suivant : Chapitre 1.2 --- Structures Discrètes et Combinatoire*
