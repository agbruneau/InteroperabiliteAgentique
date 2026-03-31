# Chapitre I.42 : Connaissance et Raisonnement

## Introduction

Au cœur de l\'intelligence artificielle (IA) se trouvent deux questions fondamentales et indissociables : comment un agent intelligent peut-il se forger une représentation interne du monde qui l\'entoure, et comment peut-il exploiter cette représentation pour raisonner, prendre des décisions et agir de manière cohérente et efficace? Ce chapitre, intitulé « Connaissance et Raisonnement », se consacre à l\'exploration des formalismes et des algorithmes qui constituent la réponse de l\'informatique à ces questions. Nous y aborderons la dualité essentielle entre la *représentation*, qui est l\'acte de modéliser le monde dans un langage compréhensible par la machine, et le *raisonnement*, qui est le processus computationnel permettant de manipuler ce modèle pour en extraire de nouvelles informations, prédire des conséquences ou élaborer des stratégies.

Le parcours que nous proposons au lecteur est structuré autour de trois grands paradigmes qui ont façonné le domaine. Nous débuterons notre exploration dans le monde de la certitude, avec le **raisonnement symbolique**. Cette approche, historiquement fondatrice de l\'IA, postule que la connaissance peut être capturée de manière précise et non ambiguë à l\'aide des langages de la logique formelle. Nous examinerons comment la logique propositionnelle et, plus puissamment, la logique du premier ordre, permettent de décrire des faits, des objets et des relations, et comment des algorithmes d\'inférence, tels que le chaînage avant et le chaînage arrière, agissent comme des moteurs de déduction pour prouver de nouvelles vérités à partir d\'une base de connaissances. Nous étendrons cette vision à l\'échelle du Web avec l\'étude des ontologies et du Web Sémantique, qui visent à structurer la connaissance de manière partagée et interopérable.

Toutefois, le monde réel est rarement certain. L\'information est souvent incomplète, bruitée ou intrinsèquement stochastique. La seconde partie de ce chapitre effectuera donc une transition cruciale vers le **raisonnement probabiliste**, un cadre mathématique rigoureux pour représenter et gérer l\'incertitude. En partant des fondements de la théorie des probabilités et du théorème de Bayes, nous montrerons comment il est possible de mettre à jour nos croyances à la lumière de nouvelles évidences. Nous nous attarderons ensuite sur deux des modèles graphiques probabilistes les plus influents : les réseaux bayésiens, qui offrent une représentation compacte et intuitive des dépendances entre variables, et les modèles de Markov cachés, qui sont spécialisés dans le raisonnement sur des données séquentielles et temporelles. Pour chacun de ces modèles, nous détaillerons les algorithmes d\'inférence fondamentaux qui permettent de répondre à des questions complexes malgré l\'incertitude inhérente.

Enfin, une fois qu\'un agent est capable de raisonner sur l\'état du monde, qu\'il soit certain ou non, la question ultime demeure : que doit-il faire? La troisième et dernière section de ce chapitre introduira la **planification automatisée**, le domaine de l\'IA qui connecte le raisonnement à l\'action délibérée. Nous définirons formellement un problème de planification et présenterons PDDL, le langage standard pour décrire des mondes, des actions et des objectifs. Nous explorerons ensuite différentes stratégies algorithmiques, de la recherche dans l\'espace des états à des approches plus flexibles comme la planification par ordre partiel, qui permettent à un agent de synthétiser une séquence d\'actions --- un plan --- pour atteindre un but désiré.

Ce chapitre guidera ainsi le lecteur depuis les fondements d\'un monde logique et déterministe jusqu\'aux complexités de l\'incertitude et de l\'action, offrant une vue d\'ensemble des outils théoriques et algorithmiques qui permettent aux systèmes complexes de connaître et de raisonner.

## 42.1 Représentation des Connaissances : L\'Approche Symbolique

L\'un des piliers de l\'intelligence artificielle est la capacité d\'un système à posséder une connaissance du monde et à l\'utiliser pour raisonner. L\'approche symbolique, ou logique, postule que cette connaissance peut être représentée par des symboles et que le raisonnement peut être modélisé comme une manipulation formelle de ces symboles, suivant des règles strictes. Cette section établit les fondements de cette approche, en partant des langages logiques les plus élémentaires pour aboutir aux formalismes structurés et à grande échelle qui animent la vision du Web Sémantique. Nous y découvrirons comment l\'IA a emprunté et adapté les outils de la logique formelle pour construire des agents capables de déductions rigoureuses dans des mondes bien définis.

### 42.1.1 Les Fondements Logiques : De la Proposition au Prédicat

Au cœur de l\'approche symbolique se trouve la logique mathématique, qui fournit un cadre non ambigu pour représenter des énoncés sur le monde et pour définir la notion de raisonnement valide. Nous commençons par le formalisme le plus simple, la logique propositionnelle, avant de passer à la logique du premier ordre, beaucoup plus expressive, qui constitue la base de nombreux systèmes d\'IA.

#### La Logique Propositionnelle : Un Premier Formalisme

La logique propositionnelle, également connue sous le nom de calcul propositionnel, est le langage formel le plus simple pour représenter la connaissance. Elle est de nature déclarative, ce qui signifie qu\'elle sépare clairement la connaissance elle-même des mécanismes d\'inférence qui l\'exploitent. Son principe de base est de considérer le monde comme un ensemble de faits, ou propositions, qui sont soit vrais, soit faux, sans aucune nuance.

**Syntaxe**

La syntaxe de la logique propositionnelle définit les règles pour construire des phrases légales dans le langage. Le vocabulaire de base est constitué de deux types d\'éléments  :

> **Les symboles de proposition (ou variables propositionnelles) :** Ce sont des symboles atomiques, généralement représentés par des lettres majuscules comme P, Q, R, qui représentent des faits élémentaires sur le monde. Par exemple, P pourrait signifier « Il pleut » et Q pourrait signifier « Le sol est mouillé ».
>
> **Les connecteurs logiques :** Ces opérateurs permettent de construire des propositions complexes à partir de propositions plus simples. Les cinq connecteurs standards sont :

La négation (¬) : « non »

La conjonction (∧) : « et »

La disjonction (∨) : « ou »

L\'implication (→) : « si\... alors\... »

La biconditionnelle (↔) : « si et seulement si »

À partir de ce vocabulaire, on définit récursivement l\'ensemble des **formules bien formées (fbf)**. Une fbf est soit un symbole de proposition atomique, soit une combinaison de fbf à l\'aide des connecteurs logiques, comme ¬P, (P∧Q), ou (P→Q). Les parenthèses sont utilisées pour lever toute ambiguïté sur la portée des connecteurs.

**Sémantique**

La sémantique définit la signification des phrases, c\'est-à-dire comment leur attribuer une valeur de vérité (vrai ou faux). En logique propositionnelle, la sémantique est définie par les tables de vérité, qui spécifient la valeur de vérité d\'une formule complexe en fonction des valeurs de vérité de ses composantes. Par exemple, la formule P∧Q est vraie si et seulement si P et Q sont toutes les deux vraies.

Cette approche sémantique nous permet de définir plusieurs concepts cruciaux :

> Un **modèle** est une assignation de valeurs de vérité à tous les symboles de proposition.
>
> Une formule est **satisfaisable** s\'il existe au moins un modèle qui la rend vraie.
>
> Une formule est **valide** (ou une **tautologie**) si elle est vraie dans tous les modèles possibles.
>
> Une formule α est une **conséquence logique** d\'une base de connaissances BC (un ensemble de formules), noté BC⊨α, si et seulement si tout modèle qui rend BC vraie rend également α vraie. C\'est la définition formelle de la déduction.

**Limites**

Malgré son élégance et sa simplicité, la logique propositionnelle a un pouvoir expressif très limité. Son ontologie fondamentale est celle de faits atomiques. Elle ne peut pas parler d\'objets individuels, de leurs propriétés, ou des relations qui les lient. Par exemple, pour exprimer la règle « Les puits entraînent une brise dans les cases adjacentes » dans le monde du Wumpus, il faudrait créer une proposition distincte pour chaque case du jeu, comme

Puits_1,1 \$\\rightarrow\$ Brise_1,2, Puits_1,1 \$\\rightarrow\$ Brise_2,1, etc. Il est impossible de formuler une règle générale qui s\'applique à *toutes* les cases. Cette incapacité à généraliser et à quantifier sur des objets est sa principale faiblesse et motive le passage à un langage plus riche.

#### La Logique du Premier Ordre (LPO) : Un Monde d\'Objets et de Relations

La logique du premier ordre (LPO), ou calcul des prédicats, surmonte les limitations de la logique propositionnelle en enrichissant son ontologie. Alors que la logique propositionnelle ne voit que des faits, la LPO modélise un monde peuplé d\'**objets**, de **relations** entre ces objets et de **fonctions** qui mappent des objets à d\'autres objets.

**Syntaxe**

La syntaxe de la LPO étend celle de la logique propositionnelle avec de nouveaux éléments fondamentaux  :

> **Constantes :** Des symboles qui représentent des objets spécifiques (ex: Jean, Table1).
>
> **Variables :** Des symboles qui peuvent se référer à n\'importe quel objet (ex: x, y).
>
> **Prédicats :** Des symboles qui représentent des relations entre des objets. Un prédicat a une arité qui indique le nombre d\'objets qu\'il met en relation (ex: Frere(Jean, Richard), EstSur(Livre, Table1)). Un prédicat d\'arité 1 représente une propriété (ex: Rouge(Pomme)).
>
> **Fonctions :** Des symboles qui représentent une relation fonctionnelle, c\'est-à-dire qui associent un unique objet de sortie à un tuple d\'objets d\'entrée (ex: PereDe(Jean)).
>
> **Quantificateurs :**

Le **quantificateur universel** (∀) : « pour tout ». Permet d\'exprimer des propriétés sur tous les objets d\'un domaine.

Le **quantificateur existentiel** (∃) : « il existe ». Permet d\'affirmer l\'existence d\'au moins un objet ayant une certaine propriété.

Un **terme** est une expression qui se réfère à un objet. Il peut s\'agir d\'une constante, d\'une variable ou d\'une fonction appliquée à des termes. Une **formule atomique** est un prédicat appliqué à des termes. Les formules complexes sont construites à partir de formules atomiques à l\'aide des connecteurs logiques et des quantificateurs. Par exemple, la phrase « Tout humain est mortel » peut être représentée par la formule close (sans variable libre) : ∀x(Humain(x)→Mortel(x)).

**Sémantique**

La sémantique de la LPO est plus complexe que celle de la logique propositionnelle. Une **interprétation** (ou **modèle**) d\'une formule de la LPO est définie par  :

> Un **domaine** non vide d\'objets, D.
>
> Une fonction qui associe chaque symbole de constante à un objet de D.
>
> Une fonction qui associe chaque symbole de prédicat à une relation sur D.
>
> Une fonction qui associe chaque symbole de fonction à une fonction sur D.

Une formule est satisfaite dans un modèle pour une assignation de variables donnée si la relation qu\'elle exprime est vraie dans ce modèle. Par exemple, la formule ∃xFrere(x,Richard) est vraie dans un modèle si l\'objet désigné par Richard est dans la relation Frere avec au moins un autre objet du domaine.

**Expressivité**

Le pouvoir d\'expression de la LPO est considérablement plus grand que celui de la logique propositionnelle. Elle permet de représenter de manière compacte et naturelle des connaissances générales sur le monde, ce qui est essentiel pour de nombreuses applications d\'IA, notamment les systèmes experts dits \"d\'ordre 1\". La capacité à quantifier sur des variables est au cœur de cette expressivité accrue.

Cependant, cette richesse a un coût computationnel. Alors que le problème de la satisfiabilité en logique propositionnelle est décidable (bien que NP-complet), le problème de la validité en logique du premier ordre est seulement **semi-décidable**. Le théorème de complétude de Gödel nous assure que si une formule est une conséquence logique d\'une théorie, alors il existe une preuve formelle de cette formule. En revanche, le théorème d\'indécidabilité de Church-Turing montre qu\'il n\'existe pas d\'algorithme général qui puisse déterminer en un temps fini si une formule quelconque de la LPO n\'est *pas* une conséquence logique. Ce compromis fondamental entre expressivité et complexité computationnelle est un thème central en IA. Il explique pourquoi, en pratique, de nombreux systèmes utilisent des sous-ensembles décidables de la LPO, comme nous le verrons dans la section sur les ontologies.

Le tableau suivant synthétise les différences fondamentales entre ces deux formalismes logiques.

**Tableau 42.1 : Comparaison des Logiques Propositionnelle et du Premier Ordre**

  ------------------------------- ------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------
  Caractéristique                 Logique Propositionnelle                                            Logique du Premier Ordre (LPO)

  **Unité sémantique de base**    Fait (proposition atomique)                                         Objets, Relations (prédicats), Fonctions

  **Ontologie du monde**          Le monde est un ensemble de faits qui sont vrais ou faux.           Le monde est un ensemble d\'objets avec des propriétés et des relations entre eux.

  **Pouvoir expressif**           Limité. Ne peut pas généraliser sur les objets.                     Élevé. Permet la quantification universelle et existentielle sur des ensembles d\'objets.

  **Exemple canonique**           Pluie → SolMouillé                                                  ∀x (Chat(x) → Mammifere(x))

  **Complexité (Décidabilité)**   Décidable. Le problème de la satisfiabilité (SAT) est NP-complet.   Semi-décidable. Valide si prouvable (complétude), mais pas d\'algorithme pour la non-validité (indécidabilité).
  ------------------------------- ------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------

### 42.1.2 Inférence en Logique du Premier Ordre : Les Moteurs de Règles

Avoir un langage formel pour représenter la connaissance n\'est que la première étape. La seconde, tout aussi cruciale, est de disposer de mécanismes pour raisonner à partir de cette connaissance, c\'est-à-dire pour dériver de nouvelles conclusions qui ne sont pas explicitement énoncées dans la base de connaissances initiale. Ce processus est appelé **inférence**. En LPO, l\'inférence est mise en œuvre par des algorithmes qui appliquent systématiquement des règles d\'inférence valides.

#### Le Processus d\'Inférence

Une règle d\'inférence est un schéma qui permet de dériver une nouvelle formule (la conclusion) à partir d\'un ensemble de formules existantes (les prémisses). Pour être valide, une règle doit être **correcte** (sound), c\'est-à-dire qu\'elle ne doit jamais dériver une conclusion fausse à partir de prémisses vraies. Les règles d\'inférence fondamentales pour la LPO incluent :

> **Modus Ponens :** Si nous avons une implication A→B et que nous savons que A est vrai, nous pouvons conclure que B est vrai.
>
> **Instanciation Universelle (UI) :** D\'une phrase universellement quantifiée ∀v,α, on peut inférer n\'importe quelle instanciation de α où la variable v est remplacée par un terme clos (sans variable) g. Par exemple, de ∀xRoi(x)→Mechant(x), on peut inférer Roi(Jean)→Mechant(Jean).
>
> **Instanciation Existentielle (EI) :** D\'une phrase existentiellement quantifiée ∃v,α, on peut inférer une phrase où v est remplacé par un nouveau symbole de constante qui n\'apparaît nulle part ailleurs dans la base de connaissances. Ce nouveau symbole est appelé une **constante de Skolem**. Par exemple, de ∃xCouronne(x)∧SurTete(x,Jean), on peut inférer Couronne(C1​)∧SurTete(C1​,Jean), où C1​ est un identifiant unique pour la couronne en question.

Les algorithmes d\'inférence, souvent appelés **moteurs d\'inférence** dans le contexte des systèmes experts, sont des procédures qui automatisent l\'application de ces règles pour répondre à des requêtes ou pour enrichir une base de connaissances. Les deux stratégies les plus répandues sont le chaînage avant et le chaînage arrière.

#### Le Chaînage Avant (Forward Chaining) : Un Raisonnement Guidé par les Données

Le chaînage avant est une stratégie d\'inférence qui fonctionne de manière \"bottom-up\", c\'est-à-dire des faits vers les conclusions. Il part des faits connus dans la base de connaissances et applique itérativement les règles d\'inférence pour ajouter de nouveaux faits. Ce processus se poursuit jusqu\'à ce qu\'aucun nouveau fait ne puisse être dérivé (on dit que la base de faits est

**saturée**) ou que le but recherché soit atteint.

Le chaînage avant est particulièrement bien adapté aux systèmes où de nouvelles données arrivent continuellement et où l\'on souhaite déduire toutes les conséquences possibles de ces nouvelles informations. C\'est une forme de raisonnement déductif guidé par les données.

**Algorithme Détaillé**

Pour les bases de connaissances en LPO utilisant des règles de la forme Prémisse₁ ∧\... ∧ Prémisseₙ → Conclusion (clauses de Horn définies), l\'algorithme de chaînage avant doit gérer les variables. Le cœur de l\'algorithme repose sur l\'**unification**, qui est le processus de trouver une substitution de variables qui rend deux expressions logiques identiques.

Le cycle de base d\'un moteur d\'inférence en chaînage avant se déroule en trois phases  :

> **Filtrage (Matching) :** Identifier l\'ensemble de toutes les règles dont les prémisses peuvent être satisfaites par les faits actuellement dans la base de connaissances. Cela implique de trouver des substitutions pour les variables des règles.
>
> **Résolution de conflits :** S\'il y a plusieurs règles applicables, choisir laquelle déclencher. Les stratégies peuvent être simples (ex: la première trouvée) ou complexes (ex: la plus spécifique, la plus récente, ou basée sur des méta-règles).
>
> **Exécution (Action) :** Appliquer la substitution trouvée à la conclusion de la règle choisie et ajouter le nouveau fait instancié à la base de connaissances.

Voici une description formelle de l\'algorithme :

fonction FOL-FC-ASK(BC, α) retourne une substitution ou faux\
entrées: BC, une base de connaissances de clauses de Horn\
α, la requête (un atome)\
\
répéter indéfiniment\
nouveaux ← {}\
pour chaque règle dans BC faire\
p₁,\..., pₙ → q est une standardisation de la règle\
pour chaque θ tel que SUBST(θ, p₁ ∧\... ∧ pₙ) = SUBST(θ, f₁ ∧\... ∧ fₙ)\
pour des faits f₁,\..., fₙ dans BC\
q\' ← SUBST(θ, q)\
si q\' ne unifie pas avec un fait déjà dans BC ou dans nouveaux alors\
ajouter q\' à nouveaux\
φ ← UNIFY(q\', α)\
si φ n\'est pas échec alors retourner φ\
si nouveaux est vide alors retourner faux\
ajouter nouveaux à BC

**Exemple Illustratif**

Considérons la base de connaissances suivante  :

> **Base de Faits (BF) :** {Bénédicte, Coralie}
>
> **Base de Règles (BR) :**

R4: Bénédicte → Xavier

R6: Coralie → Denis

R7: Xavier ∧ Coralie → Amélie

R5: Xavier ∧ Amélie → Herman

Si nous cherchons à savoir si Herman est un fait déductible :

> **Cycle 1 :**

R4 est applicable avec le fait Bénédicte. On ajoute Xavier à la BF. BF = {Bénédicte, Coralie, Xavier}.

R6 est applicable avec le fait Coralie. On ajoute Denis à la BF. BF = {Bénédicte, Coralie, Xavier, Denis}.

> **Cycle 2 :**

Maintenant que Xavier et Coralie sont dans la BF, R7 devient applicable. On ajoute Amélie à la BF. BF = {Bénédicte, Coralie, Xavier, Denis, Amélie}.

> **Cycle 3 :**

Maintenant que Xavier et Amélie sont dans la BF, R5 devient applicable. On ajoute Herman à la BF.\
Le but Herman est atteint.

#### Le Chaînage Arrière (Backward Chaining) : Un Raisonnement Guidé par les Buts

Le chaînage arrière adopte une approche \"top-down\", radicalement différente. Il part d\'un but (une requête que l\'on souhaite prouver) et travaille à rebours. Si le but est déjà un fait connu, la preuve est triviale. Sinon, le système recherche des règles dont la conclusion peut s\'unifier avec le but. Les prémisses de ces règles deviennent alors de nouveaux sous-buts à prouver, et le processus est appliqué récursivement.

Cette stratégie est beaucoup plus ciblée que le chaînage avant, car elle n\'explore que les branches du raisonnement qui sont pertinentes pour la question posée. C\'est le mécanisme d\'inférence qui sous-tend des langages de programmation logique comme Prolog.

**Algorithme Détaillé**

L\'algorithme de chaînage arrière est naturellement récursif. Il maintient une liste de buts à prouver. Pour chaque but, il tente de l\'unifier avec des faits ou des conclusions de règles.

fonction FOL-BC-ASK(BC, buts, θ) retourne un générateur de substitutions\
entrées: BC, une base de connaissances\
buts, une liste de buts à prouver\
θ, la substitution courante\
\
si buts est vide alors\
produire θ\
sinon\
premier ← PREMIER(buts)\
reste ← RESTE(buts)\
q\' ← SUBST(θ, premier)\
pour chaque phrase s dans BC telle que\
s = (p₁ ∧\... ∧ pₙ → q) et θ\' ← UNIFY(q, q\') réussit\
nouveaux_buts ← \[p₁,\..., pₙ \| reste\]\
pour chaque θ\'\' dans FOL-BC-ASK(BC, nouveaux_buts, COMPOSE(θ, θ\')) faire\
produire θ\'\'\
pour chaque fait f dans BC telle que θ\' ← UNIFY(f, q\') réussit\
pour chaque θ\'\' dans FOL-BC-ASK(BC, reste, COMPOSE(θ, θ\')) faire\
produire θ\'\'

**Exemple Illustratif**

Reprenons le même exemple, avec la requête Herman.

> **But initial :** Herman.
>
> Le système cherche une règle dont la conclusion est Herman. Il trouve R5: Xavier ∧ Amélie → Herman.
>
> **Nouveaux sous-buts :** Xavier et Amélie.
>
> Le système tente de prouver le premier sous-but, Xavier. Il trouve R4: Bénédicte → Xavier.
>
> **Nouveau sous-but :** Bénédicte.
>
> Le système cherche Bénédicte dans la BF. Il le trouve. Le sous-but Bénédicte est prouvé, donc Xavier est prouvé.
>
> Le système passe au second sous-but initial, Amélie. Il trouve R7: Xavier ∧ Coralie → Amélie.
>
> **Nouveaux sous-buts :** Xavier et Coralie.
>
> Le système tente de prouver Xavier. Comme il vient de le faire, il sait que c\'est un fait prouvable (ou le trouve dans la BF si on utilise la mémorisation).
>
> Le système tente de prouver Coralie. Il le trouve dans la BF.
>
> Les deux sous-buts Xavier et Coralie sont prouvés, donc Amélie est prouvé.
>
> Les deux sous-buts Xavier et Amélie sont maintenant prouvés, donc le but initial Herman est prouvé.

Le choix entre ces deux stratégies d\'inférence n\'est pas anodin ; il reflète une dualité fondamentale dans la manière de résoudre un problème. Le chaînage avant, guidé par les données, est exhaustif et réactif. Il est idéal pour des tâches de surveillance, de classification ou de configuration où l\'on veut explorer toutes les conséquences d\'un état initial. En revanche, le chaînage arrière, guidé par le but, est ciblé et efficace. Il excelle dans les tâches de diagnostic, de consultation ou de preuve de théorème, où une question précise est posée et où il est inutile de dériver des faits non pertinents. La nature de l\'application dicte donc le choix du moteur de raisonnement.

### 42.1.3 Ontologies et le Web Sémantique : La Connaissance Structurée et Partagée

Les formalismes logiques fournissent les outils pour représenter la connaissance et raisonner dessus au sein d\'un agent unique. Cependant, une grande partie de la valeur de la connaissance réside dans sa capacité à être partagée, comprise et réutilisée par différents agents, qu\'ils soient humains ou logiciels. La vision du **Web Sémantique** est née de cette ambition : transformer le Web d\'une collection de documents destinés aux humains en une base de connaissances globale et interconnectée, lisible et exploitable par les machines. Au cœur de cette vision se trouvent les

**ontologies**, des formalismes pour structurer et définir la signification de la connaissance.

#### La Vision du Web Sémantique

Le Web actuel est principalement un web de documents. Les pages HTML contiennent de l\'information, mais le balisage se concentre sur la présentation (\<h1\>, \<p\>) plutôt que sur la signification du contenu. Un ordinateur peut afficher une page listant des événements, mais il ne \"comprend\" pas ce qu\'est un événement, un lieu ou une date. Le Web Sémantique vise à remédier à cela en ajoutant une couche de métadonnées sémantiques qui décrivent explicitement les données et les relations entre elles. L\'objectif est de permettre des tâches plus intelligentes, comme des recherches qui comprennent le sens des mots, une intégration de données transparente entre différentes sources et une automatisation plus poussée des services.

Pour réaliser cette vision, une représentation formelle et partagée de la connaissance est nécessaire. C\'est le rôle des ontologies. Une ontologie, dans ce contexte, est une spécification explicite et formelle d\'une conceptualisation partagée d\'un domaine. En d\'autres termes, elle définit un vocabulaire de termes (classes, propriétés) et spécifie les relations logiques qui les lient, créant un modèle de connaissance commun.

#### Resource Description Framework (RDF) : L\'Échafaudage des Données

La brique de base du Web Sémantique est le **Resource Description Framework (RDF)**. RDF n\'est pas un langage d\'ontologie en soi, mais un modèle de données générique pour faire des déclarations sur des ressources. Le modèle RDF est basé sur une structure simple et puissante : le

**triplet**.

Chaque déclaration RDF est un triplet de la forme (sujet, prédicat, objet) :

> Le **sujet** est la ressource que l\'on décrit.
>
> Le **prédicat** (ou propriété) est une ressource qui décrit une caractéristique ou une relation du sujet.
>
> L\'**objet** est la valeur de cette caractéristique, qui peut être une autre ressource ou une valeur littérale (une chaîne de caractères, un nombre, etc.).

Crucialement, les sujets et les prédicats (et souvent les objets) sont identifiés par des **Uniform Resource Identifiers (URIs)**, les mêmes identifiants uniques utilisés pour les adresses web. Cela permet de créer un graphe de connaissances global et décentralisé : n\'importe qui peut faire des déclarations sur n\'importe quelle ressource, et ces déclarations peuvent être liées entre elles à travers le Web. L\'ensemble de tous les triplets RDF forme un immense graphe orienté et étiqueté. RDF peut être écrit dans différentes syntaxes, les plus courantes étant RDF/XML et Turtle.

#### Web Ontology Language (OWL) : Ajouter la Richesse Sémantique

RDF fournit la structure de base pour énoncer des faits, mais il est sémantiquement très limité. Il ne permet pas de dire, par exemple, qu\'une Personne est une sous-classe d\'un Mammifere, ou que la propriété aPourEnfant ne peut s\'appliquer qu\'à des mammifères et a pour valeur un mammifère. C\'est là qu\'intervient le **Web Ontology Language (OWL)**.

OWL est un langage de modélisation de connaissances, recommandé par le W3C, qui est construit par-dessus RDF. Il fournit un vocabulaire riche pour définir des ontologies et exprimer des axiomes logiques complexes sur les concepts d\'un domaine. OWL permet de passer de simples déclarations de faits à une véritable modélisation de la connaissance.

Les composants clés d\'une ontologie OWL incluent  :

> **Classes (owl:Class) :** Représentent des ensembles ou des catégories d\'individus. Par exemple, Livre, Auteur.
>
> **Hiérarchies de classes (rdfs:subClassOf) :** Permettent d\'organiser les classes dans une taxonomie. Par exemple, on peut déclarer que Roman est une sous-classe de Livre. Un raisonneur peut alors déduire que si un individu est un Roman, il est aussi un Livre.
>
> **Propriétés (owl:ObjectProperty, owl:DatatypeProperty) :** Définissent les relations. Les ObjectProperty lient des individus entre eux (ex: aPourAuteur), tandis que les DatatypeProperty lient un individu à une valeur littérale (ex: dateDePublication).
>
> **Domaine et Portée (rdfs:domain, rdfs:range) :** Permettent de spécifier des contraintes sur les propriétés. Par exemple, le domaine de aPourAuteur pourrait être Livre et sa portée Auteur. Si un raisonneur voit x aPourAuteur y, il peut déduire que x est un Livre et y un Auteur.
>
> **Axiomes complexes :** OWL permet d\'exprimer des contraintes beaucoup plus riches, comme des restrictions de cardinalité (ex: \"un livre a au moins un auteur\"), des classes disjointes (ex: \"rien ne peut être à la fois un Livre et un Auteur\"), des équivalences de classes, etc.

Cette expressivité logique permet à des programmes informatiques, appelés **raisonneurs sémantiques**, de vérifier la cohérence d\'une ontologie et de déduire des connaissances implicites. Par exemple, si on définit un Parent comme une Personne qui aPourEnfant une autre Personne, et qu\'on déclare que Jean aPourEnfant Marie, un raisonneur peut automatiquement inférer que Jean est un Parent.

Pour gérer le compromis entre expressivité et décidabilité, OWL est proposé en trois \"espèces\" ou variantes  :

> **OWL Lite :** La variante la plus simple, avec une expressivité limitée (par ex., cardinalités de 0 ou 1 seulement), mais qui garantit une faible complexité computationnelle.
>
> **OWL DL (Description Logic) :** Offre un très bon équilibre entre une grande expressivité et la garantie que le raisonnement est **décidable** (c\'est-à-dire que tout algorithme d\'inférence terminera). Elle est basée sur une famille de logiques formelles appelées Logiques de Description.
>
> **OWL Full :** La variante la plus expressive, qui ne pose aucune contrainte. Elle offre une flexibilité maximale mais perd la garantie de décidabilité du raisonnement.

L\'émergence de OWL, et en particulier de OWL DL, n\'est pas un accident historique. Elle représente la concrétisation, à l\'échelle du Web, d\'une solution mûrement réfléchie par la communauté de la recherche en logique formelle au dilemme fondamental entre expressivité et complexité. Comme nous l\'avons vu, la LPO complète, bien que très expressive, est semi-décidable, ce qui la rend impropre aux applications web qui exigent des réponses en temps fini. Les Logiques de Description (DL), sur lesquelles OWL DL est fondé, sont des fragments de la LPO soigneusement conçus pour être décidables tout en conservant une expressivité suffisante pour modéliser des domaines complexes. Ainsi, le Web Sémantique ne réinvente pas la roue ; il applique de manière pragmatique des décennies de recherche théorique pour construire une base de connaissances mondiale qui soit à la fois riche et calculable.

## 42.2 Raisonnement en Contexte d\'Incertitude : L\'Approche Probabiliste

Le monde que nous avons exploré jusqu\'à présent, celui de la logique symbolique, est un monde de certitudes. Une proposition est soit vraie, soit fausse ; un fait est soit dans la base de connaissances, soit il ne l\'est pas. Si cette abstraction est puissante pour des domaines formels comme les mathématiques ou des environnements de jeu bien définis, elle se heurte rapidement à la nature fondamentalement incertaine du monde réel. L\'information dont dispose un agent est presque toujours incomplète, ambiguë, ou bruitée. Les actions qu\'il entreprend peuvent avoir des résultats non déterministes. Pour qu\'un agent puisse agir intelligemment dans un tel monde, il doit être capable de gérer et de quantifier cette incertitude.

Cette section marque un changement de paradigme fondamental, passant de la logique à la **théorie des probabilités**. Nous allons établir comment les probabilités fournissent un cadre mathématique rigoureux pour représenter des degrés de croyance et pour les mettre à jour de manière cohérente à la lumière de nouvelles observations. Nous commencerons par le fondement de tout le raisonnement probabiliste moderne, le théorème de Bayes, avant d\'explorer deux des formalismes les plus influents qui le mettent en pratique : les réseaux bayésiens, pour modéliser des systèmes complexes de variables interdépendantes, et les modèles de Markov cachés, pour raisonner sur des séquences temporelles.

### 42.2.1 La Gestion de l\'Incertitude et le Théorème de Bayes

La première étape pour raisonner sous incertitude est d\'adopter un langage capable de l\'exprimer. La logique classique, avec ses valeurs de vérité binaires, est mal équipée pour cette tâche.

#### Pourquoi la Logique ne Suffit Pas

Considérons un agent médical de diagnostic. Un patient présente de la fièvre. La logique classique pourrait nous permettre d\'utiliser une règle comme Fièvre → Grippe. Cependant, cette règle est trop forte ; la fièvre peut avoir de nombreuses autres causes. Une règle plus faible comme Grippe → Fièvre est plus correcte, mais elle ne nous permet pas de conclure quoi que ce soit sur la présence de la grippe à partir de l\'observation de la fièvre (c\'est l\'erreur de raisonnement connue sous le nom d\'affirmation du conséquent).

La logique est confrontée à trois problèmes majeurs dans les domaines réels :

> **L\'ignorance :** L\'agent ne connaît pas tous les facteurs qui influencent le résultat. Il peut y avoir des exceptions non modélisées à chaque règle.
>
> **Le caractère stochastique :** Certains domaines sont intrinsèquement aléatoires. Même en connaissant toutes les conditions, le résultat d\'un lancer de dé ne peut être prédit avec certitude.
>
> **L\'ambiguïté et la complexité :** L\'utilisation de règles logiques pour couvrir toutes les éventualités mènerait à une base de connaissances d\'une taille et d\'une complexité ingérables.

La modélisation probabiliste offre une solution en remplaçant la notion de vérité par celle de **degré de croyance**. Au lieu d\'affirmer qu\'un patient a la grippe, l\'agent peut assigner une probabilité, par exemple 0.1, à cette proposition. Cette approche permet de quantifier l\'incertitude et de la manipuler de manière formelle.

#### Les Fondements de la Théorie des Probabilités

La théorie des probabilités fournit le cadre axiomatique pour le raisonnement sous incertitude. Elle commence par assigner une probabilité numérique P(A) à chaque proposition (ou événement) A, représentant le degré de croyance en sa vérité. Ces probabilités doivent respecter les **axiomes de Kolmogorov** :

> Pour tout événement A, 0≤P(A)≤1.
>
> P(Vrai)=1 et P(Faux)=0.
>
> P(A∨B)=P(A)+P(B)−P(A∧B).

À partir de ces axiomes, on peut définir la probabilité conditionnelle, P(A∣B), qui représente la probabilité de l\'événement A sachant que l\'événement B s\'est produit. Elle est définie comme :

P(A∣B)=P(B)P(A∧B)​,pour P(B)\>0

où P(A∧B) est la probabilité conjointe que A et B se produisent simultanément. Cette équation peut être réarrangée pour donner la règle du produit :

P(A∧B)=P(A∣B)P(B)

Cette règle est l\'une des plus importantes de la théorie des probabilités et constitue la base pour la dérivation du théorème de Bayes.

#### Le Théorème de Bayes : La Pierre Angulaire de l\'Inférence

Le théorème de Bayes est une conséquence directe et simple de la règle du produit, mais son importance pour l\'IA et les statistiques est immense. Il fournit une méthode pour mettre à jour la probabilité d\'une hypothèse à la lumière de nouvelles données.

**Dérivation**

Puisque la conjonction est commutative (A∧B est identique à B∧A), nous pouvons écrire la règle du produit de deux manières :

> P(A∧B)=P(A∣B)P(B)
>
> P(B∧A)=P(B∣A)P(A)

En égalisant les deux côtés droits, nous obtenons :

P(A∣B)P(B)=P(B∣A)P(A)

En divisant par P(B) (en supposant que P(B)=0), nous obtenons la forme standard du théorème de Bayes :

P(A∣B)=P(B)P(B∣A)P(A)​

**Sémantique des Termes**

Chaque terme de cette équation a une interprétation intuitive dans le contexte de l\'inférence, où A est souvent une hypothèse et B une observation (ou évidence) :

> P(A) est la **probabilité a priori** (prior). C\'est notre croyance initiale en l\'hypothèse A *avant* d\'avoir observé l\'évidence B.
>
> P(A∣B) est la **probabilité a posteriori** (posterior). C\'est notre croyance mise à jour en l\'hypothèse A *après* avoir pris en compte l\'observation B. Le but de l\'inférence bayésienne est de calculer cette valeur.
>
> P(B∣A) est la **vraisemblance** (likelihood). C\'est la probabilité d\'observer B si notre hypothèse A est vraie. Ce terme est souvent issu d\'un modèle génératif du monde (comment les causes produisent des effets).
>
> P(B) est l\'**évidence** (evidence ou marginal likelihood). C\'est la probabilité totale d\'observer B, quelle que soit l\'hypothèse. Elle agit comme une constante de normalisation pour s\'assurer que la probabilité a posteriori est une distribution de probabilité valide. On la calcule en marginalisant sur toutes les hypothèses possibles Ai​ : P(B)=∑i​P(B∣Ai​)P(Ai​).

Le théorème de Bayes peut donc être lu comme :

Posterior=EvidenceLikelihood×Prior​

Il formalise le processus d\'apprentissage : on part d\'une croyance a priori, on observe des données, et on utilise la vraisemblance de ces données sous différentes hypothèses pour calculer une croyance a posteriori révisée.21

**Exemple Illustratif : Le Paradoxe des Faux Positifs**

L\'un des exemples les plus éclairants de l\'application du théorème de Bayes est le diagnostic médical, qui met en lumière l\'importance cruciale de la probabilité a priori.

Supposons une maladie rare qui affecte 1% de la population. Il existe un test de dépistage très fiable :

> Si une personne est malade, le test est positif dans 99% des cas (sensibilité de 0.99).
>
> Si une personne est saine, le test est négatif dans 99% des cas (spécificité de 0.99), ce qui signifie qu\'il y a 1% de faux positifs.

Une personne passe le test et le résultat est positif. Quelle est la probabilité qu\'elle soit réellement malade?

Définissons nos événements :

> M : La personne est malade.
>
> ¬M : La personne est saine.
>
> Pos : Le test est positif.

Nous voulons calculer P(M∣Pos). Les informations que nous avons sont :

> P(M)=0.01 (prior)
>
> P(¬M)=1−0.01=0.99
>
> P(Pos∣M)=0.99 (likelihood du test positif pour une personne malade)
>
> P(Pos∣¬M)=0.01 (likelihood du test positif pour une personne saine - le faux positif)

Appliquons le théorème de Bayes :

P(M∣Pos)=P(Pos)P(Pos∣M)P(M)​

Nous devons d\'abord calculer le dénominateur, P(Pos), en utilisant la loi des probabilités totales :

P(Pos)=P(Pos∣M)P(M)+P(Pos∣¬M)P(¬M)

P(Pos)=(0.99×0.01)+(0.01×0.99)

P(Pos)=0.0099+0.0099=0.0198

Maintenant, nous pouvons calculer la probabilité a posteriori :

P(M∣Pos)=0.01980.99×0.01​=0.01980.0099​=0.5

Le résultat est surprenant : malgré un test positif et une fiabilité de 99%, la probabilité que la personne soit réellement malade n\'est que de 50%. L\'intuition nous trompe car elle néglige l\'extrême rareté de la maladie (le faible prior). Dans ce cas, le nombre de personnes saines qui obtiennent un faux positif (0.01×9900=99 sur 10000 personnes) est égal au nombre de personnes malades qui obtiennent un vrai positif (0.99×100=99 sur 10000 personnes).

Cet exemple illustre une propriété fondamentale du raisonnement bayésien : il permet de remonter des effets (un symptôme, un résultat de test) aux causes probables (la maladie). Les modèles du monde sont souvent construits de manière causale, ce qui nous donne facilement accès au terme de vraisemblance

P(effet∣cause). Cependant, pour le diagnostic, nous avons besoin de l\'inverse, P(cause∣effet). Le théorème de Bayes est précisément le mécanisme mathématique qui permet cette inversion, ce qui en fait un outil indispensable pour le diagnostic, l\'apprentissage machine et toutes les formes de raisonnement abductif.

### 42.2.2 Les Réseaux Bayésiens : Structure et Inférence

Le théorème de Bayes nous fournit la règle de base pour mettre à jour une croyance sur une seule variable. Cependant, les problèmes du monde réel impliquent des dizaines, voire des milliers de variables interdépendantes. Représenter la distribution de probabilité jointe sur toutes ces variables devient rapidement impossible. Par exemple, pour n variables binaires, la table de probabilité jointe complète nécessiterait 2n−1 entrées, un nombre qui explose de manière exponentielle. Les **réseaux bayésiens** sont une solution élégante et puissante à ce problème. Ils offrent une représentation graphique compacte de la distribution jointe en exploitant les relations d\'indépendance conditionnelle entre les variables.

#### Structure et Sémantique des Réseaux Bayésiens

Un réseau bayésien est un modèle graphique probabiliste qui combine la théorie des graphes et la théorie des probabilités.

**Définition Formelle**

Un réseau bayésien est défini par un couple (G,Θ) où :

> **G est un graphe orienté acyclique (DAG)**. Les **nœuds** du graphe représentent les variables aléatoires du domaine (ex: Maladie, Symptôme, Test). Les **arcs** orientés représentent des dépendances directes ou des influences causales. Si un arc va de A à B, on dit que A est un **parent** de B.
>
> **Θ est un ensemble de paramètres** qui quantifient les relations dans le graphe. Pour chaque nœud Xi​, il y a une **table de probabilités conditionnelles (CPT)**, P(Xi​∣Parents(Xi​)), qui spécifie la distribution de probabilité de Xi​ pour chaque combinaison de valeurs de ses parents. Les nœuds sans parents ont une CPT qui correspond à leur probabilité a priori.

**La Règle de la Chaîne Bayésienne**

La sémantique d\'un réseau bayésien repose sur une hypothèse fondamentale d\'indépendance conditionnelle : chaque variable est conditionnellement indépendante de ses non-descendants dans le graphe, étant donné ses parents directs. Cette **propriété de Markov locale** est ce qui permet la simplification. Grâce à elle, la distribution de probabilité jointe complète de toutes les variables du réseau peut être factorisée en un produit des probabilités conditionnelles locales définies dans les CPTs :

P(X1​,\...,Xn​)=i=1∏n​P(Xi​∣Parents(Xi​))

Cette factorisation est la clé de la compacité des réseaux bayésiens. Au lieu d\'une table exponentielle, nous n\'avons besoin que de stocker une petite CPT pour chaque variable. Par exemple, dans un réseau où chaque variable a au plus k parents, et où les variables sont binaires, la taille totale des CPTs sera de l\'ordre de n×2k, ce qui est beaucoup plus gérable que 2n si k est petit.

#### Inférence dans les Réseaux Bayésiens

Une fois le réseau construit, il peut être utilisé pour raisonner, c\'est-à-dire pour répondre à des requêtes probabilistes. La tâche d\'**inférence** consiste à calculer la distribution de probabilité a posteriori d\'un ensemble de **variables de requête** (Q), étant donné des observations sur un ensemble de **variables d\'évidence** (E=e). Toutes les autres variables du réseau sont des

**variables cachées** (Z). La requête générale est donc de calculer P(Q∣E=e).

Le problème de l\'inférence exacte dans un réseau bayésien général est NP-difficile. Nous allons explorer deux approches : une méthode exacte, l\'élimination de variables, qui est efficace pour certains réseaux, et une méthode approximative, l\'échantillonnage de Gibbs, utilisée lorsque l\'inférence exacte est infaisable.

#### Inférence Exacte : L\'Algorithme d\'Élimination de Variables

L\'algorithme d\'élimination de variables est une méthode d\'inférence exacte qui évite la construction explicite de la distribution jointe complète. L\'idée est de calculer la somme marginale sur les variables cachées une par une, en \"poussant\" les sommes aussi loin que possible à l\'intérieur du produit des CPTs.

**Facteurs**

L\'algorithme opère sur des entités appelées **facteurs**. Un facteur est une table, similaire à une CPT, qui représente une fonction sur un sous-ensemble de variables. Initialement, les facteurs sont les CPTs du réseau. Au cours de l\'algorithme, de nouveaux facteurs sont créés par multiplication et sommation.

**Algorithme Détaillé**

Pour calculer P(Q∣e), on calcule d\'abord la probabilité jointe P(Q,e) et on normalise à la fin. Le calcul de P(Q,e) se fait en sommant sur toutes les variables cachées Zj​ :

P(Q,e)=z1​∑​\...zm​∑​P(Q,e,z1​,\...,zm​)

L\'algorithme d\'élimination de variables réorganise ce calcul :

> **Initialisation :** Créer une liste de facteurs, un pour chaque CPT du réseau.
>
> **Prise en compte de l\'évidence :** Pour chaque variable d\'évidence Ei​=ei​, modifier tous les facteurs qui contiennent Ei​. Cela se fait en sélectionnant uniquement les lignes de la table du facteur qui sont cohérentes avec l\'observation ei​. Le facteur résultant ne contient plus la variable Ei​.
>
> Élimination des variables cachées : Pour chaque variable cachée Zj​ (selon un ordre d\'élimination prédéfini) :\
> a. Collecter : Rassembler tous les facteurs de la liste qui mentionnent la variable Zj​.\
> b. Multiplier : Calculer le produit ponctuel de tous ces facteurs pour créer un nouveau grand facteur.\
> c. Sommer (Marginaliser) : Sommer la variable Zj​ hors de ce nouveau facteur. Cela crée un facteur plus petit qui ne dépend plus de Zj​.\
> d. Mettre à jour : Remplacer les facteurs collectés dans la liste par ce nouveau facteur marginalisé.
>
> **Finalisation :** À la fin, il ne reste que des facteurs qui ne dépendent que des variables de requête Q. Multiplier tous les facteurs restants pour obtenir un facteur final représentant P(Q,e).
>
> **Normalisation :** Normaliser le facteur final pour obtenir P(Q∣e).

Le pseudo-code suivant formalise ce processus  :

fonction ELIMINATION-ASK(X, e, bn) retourne une distribution sur X\
entrées: X, la variable de requête\
e, l\'évidence observée\
bn, le réseau bayésien\
\
facteurs ←\
pour chaque var dans ORDONNER(bn.VARS) faire\
facteurs.ajouter(CREER-FACTEUR(var, e))\
\
pour chaque var dans ORDRE-ELIMINATION faire\
facteurs ← SOMMER(var, facteurs)\
\
résultat ← PRODUIT-PONCTUEL(facteurs)\
retourner NORMALIZE(résultat)\
\
fonction SOMMER(var, facteurs) retourne une liste de facteurs\
facteurs_avec_var ←\
facteurs_sans_var ←\
\
nouveau_facteur ← PRODUIT-PONCTUEL(facteurs_avec_var)\
nouveau_facteur ← SOMMER-SUR(var, nouveau_facteur)\
\
retourner facteurs_sans_var + \[nouveau_facteur\]

La complexité de cet algorithme dépend de manière cruciale de l\'**ordre d\'élimination**. Un bon ordre peut mener à des calculs rapides, tandis qu\'un mauvais ordre peut générer des facteurs intermédiaires de taille exponentielle. La complexité est exponentielle en la **largeur arborescente (treewidth)** du graphe induit par l\'ordre d\'élimination. Trouver l\'ordre optimal est un problème NP-difficile en soi.

#### Inférence Approximative : L\'Échantillonnage de Gibbs

Lorsque l\'inférence exacte est trop coûteuse, ce qui est le cas pour la plupart des grands réseaux complexes, on se tourne vers des méthodes d\'inférence approximative. Les méthodes de **Monte Carlo par Chaînes de Markov (MCMC)**, comme l\'échantillonnage de Gibbs, sont une classe populaire de ces algorithmes. L\'idée est de générer un grand nombre d\'échantillons aléatoires qui, à la longue, suivent la distribution de probabilité a posteriori, puis d\'estimer les probabilités en comptant les fréquences dans ces échantillons.

**Principe**

L\'échantillonnage de Gibbs est un algorithme MCMC qui construit une chaîne de Markov dont la distribution stationnaire est la distribution a posteriori P(Q,Z∣e) que nous cherchons. Il fonctionne en initialisant un état complet du réseau (une assignation de valeurs à toutes les variables cachées) et en le modifiant itérativement, une variable à la fois.

**Algorithme Détaillé**

> Initialisation :\
> a. Fixer les variables d\'évidence E à leurs valeurs observées e.\
> b. Assigner des valeurs aléatoires à toutes les variables cachées Z. Cela constitue le premier échantillon, ou état, x(0).
>
> Itération : Pour t=1,2,\...,N (pour un grand nombre d\'échantillons N) :\
> a. Pour chaque variable cachée Zi​ dans Z :\
> i. Échantillonner une nouvelle valeur zi(t)​ pour Zi​ à partir de sa distribution conditionnelle, étant donné les valeurs actuelles de toutes les autres variables dans l\'échantillon courant x(t−1). Cette distribution est P(Zi​∣x−i(t−1)​), où x−i​ représente toutes les variables sauf Zi​.
>
> **Estimation :** Après une période de \"rodage\" (burn-in) où les premiers milliers d\'échantillons sont jetés pour laisser la chaîne converger vers sa distribution stationnaire, les échantillons restants sont utilisés pour estimer les probabilités. Par exemple, pour estimer P(Q=q∣e), on compte la proportion d\'échantillons où la variable Q prend la valeur q.

**La Couverture de Markov**

L\'étape clé de l\'échantillonnage de Gibbs est de pouvoir échantillonner efficacement à partir de P(Zi​∣x−i(t−1)​). Grâce à la structure du réseau bayésien, cette distribution conditionnelle ne dépend que d\'un petit sous-ensemble des autres variables, appelé la **couverture de Markov** de Zi​. La couverture de Markov d\'un nœud est constituée de :

> Ses parents
>
> Ses enfants
>
> Les autres parents de ses enfants

Cette propriété rend chaque étape d\'échantillonnage local et computationnellement efficace. La probabilité nécessaire est proportionnelle au produit de la CPT de Zi​ et des CPTs de ses enfants.

La puissance des réseaux bayésiens réside dans leur capacité à représenter élégamment des connaissances complexes et incertaines. Cependant, la tâche de raisonner avec ces modèles, c\'est-à-dire l\'inférence, constitue un défi computationnel majeur. Cette difficulté n\'est pas un simple obstacle technique ; elle est une force motrice fondamentale de la recherche en IA. La complexité exponentielle de l\'inférence exacte a directement conduit au développement d\'un vaste champ de recherche sur les algorithmes d\'inférence approximative, comme l\'échantillonnage de Gibbs ou l\'inférence variationnelle. Le choix d\'un algorithme d\'inférence est donc un compromis central dans la conception de systèmes d\'IA, un arbitrage entre la précision de la réponse et la faisabilité du calcul. Pour les modèles à grande échelle utilisés en vision, en génomique ou en traitement du langage, la capacité à concevoir des approximateurs rapides et fiables est souvent ce qui sépare une théorie élégante d\'une application fonctionnelle.

### 42.2.3 Les Modèles Temporels : Modèles de Markov Cachés (HMM)

Jusqu\'à présent, nous avons considéré des variables dont l\'état ne dépend pas explicitement du temps. Cependant, de nombreux problèmes en IA impliquent le traitement de **séquences**, où l\'ordre des données est crucial. La reconnaissance vocale, le traitement du langage naturel, l\'analyse de séries temporelles financières ou la bio-informatique sont autant de domaines où l\'on doit modéliser des processus qui évoluent dans le temps. Les **Modèles de Markov Cachés (HMM)** sont une classe de modèles probabilistes spécifiquement conçus pour cette tâche. Ils peuvent être vus comme une spécialisation des réseaux bayésiens, \"déroulés\" dans le temps pour modéliser des séquences d\'observations générées par une séquence d\'états sous-jacents qui ne sont pas directement visibles.

#### Raisonnement sur des Séquences

Un HMM modélise un système qui passe par une séquence d\'**états cachés**. À chaque pas de temps, le système se trouve dans un état particulier et génère une **observation** visible. L\'état du système est \"caché\" car nous ne pouvons pas l\'observer directement ; nous n\'avons accès qu\'à la séquence d\'observations qu\'il produit.

**Définition Formelle**

Un Modèle de Markov Caché λ est défini par les paramètres suivants  :

> **Un ensemble de N états cachés**, Q={q1​,q2​,\...,qN​}.
>
> **Un vocabulaire de M symboles d\'observation possibles**, V={v1​,v2​,\...,vM​}.
>
> **Une matrice de probabilités de transition d\'états**, A={aij​}, de taille N×N. Chaque élément aij​=P(st​=qj​∣st−1​=qi​) représente la probabilité de passer de l\'état qi​ à l\'état qj​.
>
> **Une matrice de probabilités d\'émission (ou d\'observation)**, B={bj​(k)}, de taille N×M. Chaque élément bj​(k)=P(ot​=vk​∣st​=qj​) représente la probabilité d\'émettre l\'observation vk​ lorsque le système est dans l\'état qj​.
>
> **Une distribution de probabilité initiale**, π={πi​}, de taille N. Chaque élément πi​=P(s1​=qi​) est la probabilité que le système commence dans l\'état qi​.

**Les Hypothèses de Markov**

La simplicité et la puissance des HMM reposent sur deux hypothèses fondamentales qui limitent les dépendances dans le modèle :

> **Hypothèse de Markov (dépendance d\'état) :** La probabilité de l\'état actuel st​ ne dépend que de l\'état précédent st−1​. Le passé n\'a aucune influence sur le futur, si ce n\'est à travers l\'état présent. Formellement : P(st​∣st−1​,\...,s1​)=P(st​∣st−1​).
>
> **Hypothèse d\'indépendance des observations :** La probabilité de l\'observation actuelle ot​ ne dépend que de l\'état actuel st​. Elle est indépendante des états et observations précédents. Formellement : P(ot​∣st​,st−1​,\...,s1​,ot−1​,\...,o1​)=P(ot​∣st​).

Ces hypothèses permettent de représenter le HMM comme un réseau bayésien dynamique simple, où chaque état st​ a pour unique parent st−1​ et pour unique enfant l\'observation ot​.

#### Les Trois Tâches Fondamentales et leurs Algorithmes

Étant donné un HMM, il y a trois problèmes fondamentaux que l\'on cherche à résoudre. Tous ces problèmes peuvent être résolus efficacement grâce à des algorithmes de **programmation dynamique** qui opèrent sur une structure appelée **treillis (trellis)**. Un treillis est un graphe qui représente tous les chemins possibles à travers les états cachés au fil du temps pour une séquence d\'observations donnée.

#### 1. Évaluation (Filtrage) : Calculer la probabilité d\'une séquence

**Problème :** Étant donné un HMM λ=(A,B,π) et une séquence d\'observations O=(o1​,o2​,\...,oT​), quelle est la probabilité que ce modèle ait généré cette séquence, c\'est-à-dire, comment calculer P(O∣λ)? Cette tâche est cruciale pour comparer différents modèles et choisir celui qui explique le mieux les données.

Une approche naïve consisterait à énumérer tous les chemins d\'états possibles de longueur T, à calculer la probabilité de la séquence d\'observations pour chaque chemin, et à sommer ces probabilités. Cependant, le nombre de chemins est NT, ce qui rend cette approche exponentielle et impraticable.

**Algorithme Forward**

L\'algorithme Forward est un algorithme de programmation dynamique qui résout ce problème en un temps polynomial O(N2T). Il calcule récursivement la probabilité des observations partielles jusqu\'à un certain temps t, en se terminant dans un état spécifique j. Pour ce faire, on définit la variable forward αt​(j) :

αt​(j)=P(o1​,o2​,\...,ot​,st​=qj​∣λ)

C\'est la probabilité jointe d\'avoir observé la séquence jusqu\'à l\'instant t ET de se trouver dans l\'état qj​ à cet instant.

L\'algorithme se déroule en trois étapes  :

> Initialisation (t=1) : Pour chaque état j∈{1,\...,N}, on calcule la probabilité d\'être dans l\'état j au début et d\'observer o1​.\
> \
> α1​(j)=πj​bj​(o1​)
>
> Récursion (t=2,\...,T) : Pour chaque état j, αt​(j) est calculé en se basant sur les valeurs de αt−1​ de tous les états possibles à l\'instant précédent. On somme les probabilités de tous les chemins qui mènent à l\'état j à l\'instant t.\
> \
> αt​(j)=\[i=1∑N​αt−1​(i)aij​\]bj​(ot​)\
> \
> Le terme entre crochets est la probabilité totale d\'arriver à l\'état j à l\'instant t en ayant observé la séquence jusqu\'à ot−1​. On multiplie ensuite par la probabilité d\'émettre l\'observation ot​ depuis l\'état j.
>
> Terminaison : La probabilité totale de la séquence d\'observations est la somme des probabilités de tous les chemins, qui se termine dans n\'importe quel état à l\'instant final T.\
> \
> P(O∣λ)=j=1∑N​αT​(j)

#### 2. Décodage : Trouver la séquence d\'états la plus probable

**Problème :** Étant donné un HMM λ et une séquence d\'observations O, quelle est la séquence d\'états cachés S∗=(s1∗​,\...,sT∗​) la plus probable qui a pu générer ces observations? Cette tâche est essentielle en reconnaissance vocale (trouver la séquence de mots la plus probable pour un signal audio) ou en bio-informatique (trouver les régions codantes les plus probables dans une séquence d\'ADN).

**Algorithme de Viterbi**

L\'algorithme de Viterbi est structurellement très similaire à l\'algorithme Forward, mais avec une différence cruciale : au lieu de sommer les probabilités des chemins entrants, il prend le **maximum**. Il trouve le chemin unique le plus probable plutôt que la probabilité totale de tous les chemins. On définit la

variable de Viterbi δt​(j) :

δt​(j)=s1​,\...,st−1​max​P(s1​,\...,st−1​,st​=qj​,o1​,\...,ot​∣λ)

C\'est la probabilité du chemin le plus probable qui se termine dans l\'état qj​ à l\'instant t en ayant généré les observations jusqu\'à cet instant.

L\'algorithme se déroule en quatre étapes  :

> Initialisation (t=1) :\
> \
> δ1​(j)=πj​bj​(o1​)\
> \
> On initialise également une matrice de pointeurs ψ1​(j)=0 pour garder une trace du chemin.
>
> Récursion (t=2,\...,T) : Pour chaque état j, on calcule la probabilité du meilleur chemin y menant en prenant le maximum sur les états précédents.\
> \
> δt​(j)=\[i=1maxN​(δt−1​(i)aij​)\]bj​(ot​)\
> \
> Simultanément, on stocke l\'état précédent qui a réalisé ce maximum :\
> \
> ψt​(j)=argi=1maxN​(δt−1​(i)aij​)
>
> Terminaison : La probabilité du chemin le plus probable sur toute la séquence est le maximum des valeurs δ à l\'instant final.\
> \
> P∗=j=1maxN​δT​(j)\
> \
> L\'état final du chemin le plus probable est :\
> \
> sT∗​=argj=1maxN​δT​(j)
>
> Retraçage (Backtracking) : Pour retrouver le chemin complet, on suit les pointeurs ψ à rebours depuis l\'état final.\
> \
> st∗​=ψt+1​(st+1∗​)pour t=T−1,\...,1

#### 3. Apprentissage et Lissage : Calculer la probabilité d\'un état passé

**Problème :** Souvent, nous ne connaissons pas les paramètres (A,B,π) d\'un HMM à l\'avance. La tâche d\'**apprentissage** consiste à les estimer à partir d\'un ensemble de séquences d\'observations. L\'algorithme le plus courant pour cela est l\'algorithme de Baum-Welch (une instance de l\'algorithme Espérance-Maximisation), qui nécessite de calculer des probabilités sur les états à n\'importe quel instant t, étant donné la *totalité* de la séquence d\'observations. Cette tâche est appelée **lissage (smoothing)**.

**Algorithme Forward-Backward**

L\'algorithme Forward-Backward permet de calculer efficacement P(st​=qi​∣O,λ), la probabilité d\'être dans l\'état qi​ à l\'instant t en connaissant toutes les observations passées et futures. Il combine les résultats de l\'algorithme Forward avec ceux d\'un algorithme symétrique, l\'

**algorithme Backward**.

On définit d\'abord la variable backward βt​(i) :

βt​(i)=P(ot+1​,ot+2​,\...,oT​∣st​=qi​,λ)

C\'est la probabilité d\'observer la fin de la séquence (de t+1 à T) sachant qu\'on se trouve dans l\'état qi​ à l\'instant t.

L\'algorithme Backward se déroule à rebours dans le temps  :

> Initialisation (t=T) : Par convention, la probabilité d\'une séquence future vide est 1.\
> \
> βT​(i)=1,pour tout i
>
> Récursion (t=T−1,\...,1) : Pour chaque état i, on calcule βt​(i) en considérant toutes les transitions possibles vers un état j à t+1.\
> \
> βt​(i)=j=1∑N​aij​bj​(ot+1​)βt+1​(j)

Une fois que les valeurs α et β sont calculées pour toute la séquence, on peut les combiner pour obtenir la probabilité lissée, notée γt​(i) :

γt​(i)=P(st​=qi​∣O,λ)=P(O∣λ)P(O,st​=qi​∣λ)​

Le numérateur, P(O,st​=qi​∣λ), est la probabilité de la séquence entière et de passer par l\'état qi​ à l\'instant t. On peut le décomposer en utilisant les variables forward et backward :

\$\$ P(O, s_t=q_i \| \\lambda) = P(o_1,\..., o_t, s_t=q_i \| \\lambda) \\times P(o\_{t+1},\..., o_T \| s_t=q_i, \\lambda) = \\alpha_t(i) \\beta_t(i) \$\$

Le dénominateur est simplement P(O∣λ), que l\'on peut calculer avec l\'algorithme Forward. Donc :

\$\$ \\gamma_t(i) = \\frac{\\alpha_t(i) \\beta_t(i)}{\\sum\_{j=1}\^{N} \\alpha_T(j)} = \\frac{\\alpha_t(i) \\beta_t(i)}{\\sum\_{k=1}\^{N} \\alpha_t(k) \\beta_t(k)} \$\$

Le tableau suivant résume les trois problèmes fondamentaux des HMM et met en évidence la similitude structurelle de leurs solutions algorithmiques, toutes basées sur la programmation dynamique à travers un treillis.

**Tableau 42.2 : Synthèse des Algorithmes Fondamentaux pour les HMM**

  ---------------- ---------------------------------------------------------- --------------------------------- ---------------------------------------------------------------------- ------------------------ -------------------------
  Problème         Objectif                                                   Algorithme                        Variable Clé                                                           Opérateur de Récursion   Résultat Final

  **Évaluation**   Calculer la probabilité de la séquence d\'observations.    Algorithme **Forward**            αt​(i) : Probabilité de la séquence partielle se terminant en état i.   **Sommation** (∑)        \$P(O

  **Décodage**     Trouver la séquence d\'états la plus probable.             Algorithme de **Viterbi**         δt​(i) : Probabilité du *meilleur* chemin se terminant en état i.       **Maximum** (max)        La séquence d\'états S∗

  **Lissage**      Calculer la probabilité d\'un état à un instant t donné.   Algorithme **Forward-Backward**   γt​(i)=f(αt​(i),βt​(i)) : Probabilité d\'être en état i à l\'instant t.   **Sommation** (∑)        \$P(s_t=i
  ---------------- ---------------------------------------------------------- --------------------------------- ---------------------------------------------------------------------- ------------------------ -------------------------

Ce tableau met en lumière un point conceptuel essentiel : bien que les trois problèmes semblent distincts, leurs solutions partagent une structure de calcul récursive quasi identique. La différence fondamentale entre l\'évaluation (Forward) et le décodage (Viterbi) se résume au remplacement de l\'opérateur de sommation par l\'opérateur de maximum. Cette élégante dualité, connue sous le nom de semi-anneau (sum-product vs. max-product), est un exemple puissant de la manière dont des problèmes apparemment différents peuvent être résolus par un cadre algorithmique unifié.

## 42.3 Planification Automatisée : De la Connaissance à l\'Action

Après avoir exploré comment un agent peut représenter le monde (section 42.1) et raisonner sur son état, même en présence d\'incertitude (section 42.2), une question fondamentale demeure : comment un agent décide-t-il quoi faire? La **planification automatisée** est la branche de l\'intelligence artificielle qui s\'attaque à ce problème. Elle vise à développer des algorithmes qui permettent à un système autonome de synthétiser une séquence d\'actions --- un **plan** --- pour atteindre un objectif désiré à partir d\'un état initial donné. Cette section fait le pont entre le raisonnement et l\'action, en introduisant les formalismes et les algorithmes qui permettent à un agent de passer de la délibération à l\'exécution.

### 42.3.1 Le Problème de la Planification

La planification peut être vue comme une forme de résolution de problèmes où l\'agent doit trouver un chemin d\'un point de départ à un point d\'arrivée dans un espace abstrait défini par les actions possibles.

#### Définition Formelle

Un problème de planification classique est formellement défini par un tuple contenant les éléments suivants  :

> **Une représentation des états du monde :** Un état est un instantané du monde à un moment donné. Dans la planification classique, un état est souvent représenté par une conjonction de littéraux logiques positifs et clos (sans variable). C\'est l\'hypothèse du **monde clos** : tout littéral qui n\'est pas explicitement mentionné dans l\'état est considéré comme faux.
>
> **Un état initial :** La description complète de l\'état de départ du monde.
>
> **Une description de l\'état but :** Un ensemble de conditions (une conjonction de littéraux positifs) à satisfaire. Un état est un état but s\'il satisfait toutes ces conditions. Il peut y avoir de nombreux états du monde qui sont des états but.
>
> **Un ensemble d\'actions (ou opérateurs) :** Les actions décrivent comment l\'agent peut modifier l\'état du monde. Chaque action est définie par :

**Préconditions :** Une conjonction de littéraux qui doivent être vrais dans l\'état courant pour que l\'action soit applicable.

**Effets :** Une description des changements que l\'action apporte à l\'état. Les effets sont généralement une conjonction de littéraux, certains positifs (qui sont ajoutés à l\'état) et d\'autres négatifs (qui sont retirés de l\'état).

La **solution** à un problème de planification est une séquence d\'actions qui, lorsqu\'elle est exécutée à partir de l\'état initial, mène à un état qui satisfait la description de l\'état but.

#### Hypothèses de la Planification Classique

Pour rendre le problème de planification traitable, le cadre classique repose sur un ensemble d\'hypothèses simplificatrices sur l\'environnement  :

> **Fini :** Le nombre d\'états, d\'objets et d\'actions est fini.
>
> **Entièrement observable :** L\'agent connaît toujours l\'état complet et exact du monde.
>
> **Déterministe :** Les effets d\'une action sont connus avec certitude. L\'exécution d\'une action dans un état donné mène toujours au même état successeur.
>
> **Statique :** Le monde ne change que sous l\'effet des actions de l\'agent. Il n\'y a pas d\'événements externes ou de processus continus.

Ces hypothèses définissent le cadre de la planification classique. Des extensions plus complexes existent pour gérer l\'incertitude (planification probabiliste), l\'observabilité partielle (POMDP), ou le temps (planification temporelle), mais la planification classique reste le fondement du domaine.

### 42.3.2 Langages de Planification : PDDL

Pour que les algorithmes de planification puissent être génériques et indépendants du domaine d\'application, il est nécessaire de disposer d\'un langage standardisé pour décrire les problèmes de planification. Le **Planning Domain Definition Language (PDDL)** est devenu le langage de facto pour cette tâche. Un problème de planification en PDDL est spécifié en deux parties : un fichier de domaine et un fichier de problème.

#### Structure de PDDL

**1. Fichier de Domaine (domain.pddl)**

Ce fichier définit la physique du monde : les types d\'objets, les relations possibles et les actions disponibles. Ses principales sections sont  :

> (:requirements) : Spécifie les fonctionnalités de PDDL utilisées (ex: :strips pour la planification de base, :typing pour les objets typés).
>
> (:types) : Définit une hiérarchie de types pour les objets (ex: block, location).
>
> (:predicates) : Déclare les prédicats (propriétés et relations) avec leurs arguments typés. Par exemple, dans le monde des blocs :\
> Extrait de code\
> (on?b1 - block?b2 - block) ; le bloc?b1 est sur le bloc?b2\
> (clear?b - block) ; le dessus du bloc?b est libre\
> (on-table?b - block) ; le bloc?b est sur la table
>
> (:action) : Définit une action. Chaque action a :

:parameters : Les variables de l\'action avec leurs types.

:precondition : Une formule logique (souvent une conjonction de prédicats) qui doit être vraie pour que l\'action soit exécutable.

:effect : Une formule logique décrivant comment l\'état change. Elle est composée de littéraux positifs (ajouts) et négatifs (suppressions, via le connecteur not).\
Par exemple, l\'action de déplacer un bloc d\'un autre bloc vers la table :

Extrait de code\
(:action move-to-table\
:parameters (?b1 - block?b2 - block)\
:precondition (and (on?b1?b2) (clear?b1))\
:effect (and (on-table?b1) (clear?b2)\
(not (on?b1?b2)))\
)

**2. Fichier de Problème (problem.pddl)**

Ce fichier définit une instance spécifique du problème à résoudre dans le domaine défini précédemment  :

> (:domain) : Fait référence au nom du domaine correspondant.
>
> (:objects) : Liste les objets concrets qui existent dans cette instance du problème (ex: blockA, blockB, blockC).
>
> (:init) : Décrit l\'état initial en listant tous les prédicats qui sont vrais au départ.
>
> (:goal) : Décrit l\'état but comme une conjonction de prédicats qui doivent être rendus vrais.

L\'utilisation de PDDL permet de séparer la définition du domaine de la définition du problème, rendant les planificateurs **indépendants du domaine**. Un même planificateur peut résoudre un problème de logistique, de manipulation de blocs ou de synthèse chimique, tant que ces problèmes sont décrits en PDDL.

### 42.3.3 Algorithmes de Planification Classique

Une fois qu\'un problème est formalisé, un planificateur doit rechercher une solution. Il existe plusieurs approches pour organiser cette recherche, qui diffèrent par l\'espace dans lequel elles opèrent et la manière dont elles gèrent l\'ordre des actions.

#### Planification dans l\'Espace des États (State-Space Planning)

L\'approche la plus intuitive consiste à voir la planification comme un problème de recherche dans un graphe. Les **nœuds** de ce graphe sont les états complets du monde, et les **arcs** sont les actions qui permettent de passer d\'un état à un autre. Le but est de trouver un chemin de l\'état initial à un état qui satisfait les conditions du but. Cette recherche peut se faire dans deux directions.

**Recherche Progressive (Forward Search / Progression Planning)**

La recherche progressive explore l\'espace d\'états en partant de l\'état initial et en avançant vers le but.

> **Principe :** On commence avec l\'état initial. À chaque étape, on génère tous les états successeurs en appliquant toutes les actions dont les préconditions sont satisfaites dans l\'état courant. Le processus se poursuit jusqu\'à ce qu\'un état but soit atteint.
>
> **Avantages :** Cette approche est conceptuellement simple et permet d\'utiliser des algorithmes de recherche heuristique très puissants (comme A\* ou Greedy Best-First Search). Les heuristiques estiment la \"distance\" de l\'état courant au but, guidant la recherche de manière très efficace. Le planificateur Fast Forward (FF) est un exemple célèbre basé sur cette approche.
>
> **Inconvénients :** Le facteur de branchement peut être énorme, car de nombreuses actions peuvent être applicables dans un état donné, même si elles ne sont pas pertinentes pour atteindre le but. La recherche peut se perdre en explorant des séquences d\'actions inutiles.

**Recherche Régressive (Backward Search / Regression Planning)**

La recherche régressive travaille à l\'envers, en partant de la description du but et en remontant vers l\'état initial.

> **Principe :** On commence avec l\'ensemble des conditions du but. À chaque étape, on choisit une action qui est **pertinente** (c\'est-à-dire une action qui a pour effet de réaliser une des conditions du but non encore satisfaites). On calcule ensuite le **prédécesseur** de l\'état, qui est l\'ensemble des conditions qui devaient être vraies avant l\'action pour que, après son exécution, on se retrouve dans l\'état désiré. Ce prédécesseur devient le nouveau sous-but. La recherche se termine lorsqu\'on atteint un sous-but qui est satisfait par l\'état initial.
>
> **Avantages :** Le principal avantage est que l\'on ne considère que les actions pertinentes pour le but. Cela peut réduire considérablement le facteur de branchement et rendre la recherche beaucoup plus ciblée.
>
> **Inconvénients :** Le calcul de la régression d\'un but à travers une action est plus complexe que l\'application d\'une action en avant. De plus, la conception d\'heuristiques informatives est plus difficile.

#### Planification par Ordre Partiel (Partial-Order Planning / Plan-Space Planning)

Les approches de planification dans l\'espace des états s\'engagent sur un **ordre total** des actions à chaque étape de la recherche. Cependant, dans de nombreux problèmes, certaines actions sont indépendantes et peuvent être exécutées dans n\'importe quel ordre. Forcer un ordre prématurément peut conduire à des choix arbitraires qui bloquent la solution et nécessitent un backtracking coûteux. Ce problème, lié à l\'entrelacement d\'actions concurrentes, est une cause majeure de l\'**explosion combinatoire**.

La planification par ordre partiel (POP) aborde ce problème en adoptant le **principe du moindre engagement (Least Commitment)** : ne jamais imposer une contrainte (comme l\'ordre entre deux actions) à moins que cela ne soit absolument nécessaire.

**Recherche dans l\'Espace des Plans**

Au lieu de rechercher dans l\'espace des états du monde, la POP recherche dans l\'**espace des plans**. Un nœud dans cet espace n\'est pas un état, mais un **plan partiel**. Un plan partiel est une structure qui contient  :

> **Un ensemble d\'actions (étapes) :** Les actions qui composent le plan jusqu\'à présent.
>
> **Un ensemble de contraintes d\'ordre :** Des relations de précédence de la forme A≺B, signifiant que l\'action A doit être exécutée avant l\'action B. Ces contraintes définissent un ordre partiel sur les actions.
>
> **Un ensemble de liens causals :** Des relations de la forme Ap​B, indiquant que l\'action A est utilisée pour satisfaire la précondition p de l\'action B. Ce lien protège la condition p : aucune action ne doit venir s\'intercaler entre A et B si elle a pour effet ¬p.

**Algorithme POP**

L\'algorithme POP fonctionne en raffinant itérativement un plan partiel jusqu\'à ce qu\'il soit une solution complète. Il commence avec un plan minimal contenant deux pseudo-actions, Start (dont les effets sont l\'état initial) et Finish (dont les préconditions sont le but). L\'algorithme cherche ensuite à corriger les **défauts (flaws)** du plan jusqu\'à ce qu\'il n\'y en ait plus. Les deux principaux types de défauts sont :

> **Précondition ouverte :** Une précondition p d\'une action B dans le plan n\'est pas encore satisfaite (aucun lien causal ne pointe vers elle).

**Résolution (Établissement) :** On trouve une action A (soit déjà dans le plan, soit une nouvelle action à ajouter) qui a p comme effet. On ajoute alors le lien causal Ap​B et la contrainte d\'ordre A≺B.

> **Menace :** Une action C dans le plan a un effet ¬p qui pourrait annuler la condition protégée par un lien causal Ap​B. Cela se produit si C peut s\'exécuter entre A et B.

**Résolution (Déclobbering) :** On résout la menace en ajoutant une contrainte d\'ordre pour forcer C à s\'exécuter en dehors de l\'intervalle protégé.

**Promotion :** On ajoute la contrainte B≺C, forçant C à s\'exécuter après.

**Démotion :** On ajoute la contrainte C≺A, forçant C à s\'exécuter avant.

L\'algorithme est complet et correct : s\'il existe une solution, il la trouvera. En ne s\'engageant sur un ordre que pour résoudre des menaces, la POP évite une grande partie de la recherche inutile effectuée par les planificateurs à ordre total, surtout dans les problèmes où de nombreux sous-plans peuvent être entrelacés de manière flexible.

Le tableau suivant compare les caractéristiques clés de ces trois approches de planification.

**Tableau 42.3 : Comparaison des Approches de Planification**

  ------------------- ---------------------------------------------- --------------------------------------------- ------------------------------------ -----------------------------------------------------------------------------------------------
  Approche            Espace de Recherche                            Direction de la Recherche                     Gestion de l\'Ordre                  Avantage Principal

  **Progressive**     Espace des états (états du monde)              De l\'état initial vers le but                Ordre total                          Permet l\'utilisation d\'heuristiques d\'état très efficaces.

  **Régressive**      Espace des états (descriptions de sous-buts)   Du but vers l\'état initial                   Ordre total                          Ne considère que les actions pertinentes pour le but, réduisant le branchement.

  **Ordre Partiel**   Espace des plans (plans partiels)              Raffinement de plan (correction de défauts)   Ordre partiel (Moindre engagement)   Flexibilité maximale, évite le backtracking inutile lié à l\'ordre des actions indépendantes.
  ------------------- ---------------------------------------------- --------------------------------------------- ------------------------------------ -----------------------------------------------------------------------------------------------

En y regardant de plus près, le principe du moindre engagement qui sous-tend la planification par ordre partiel n\'est pas une idée isolée. Il s\'agit en fait d\'une méta-heuristique puissante et récurrente pour gérer la complexité dans de nombreux domaines de l\'IA. En recherche avec contraintes (CSP), par exemple, les stratégies de choix de variables consistent souvent à retarder les décisions dans les parties les moins contraintes de l\'espace de recherche. En apprentissage automatique, les méthodes bayésiennes, au lieu de s\'engager sur une seule valeur pour un paramètre, maintiennent une distribution de probabilité sur toutes les valeurs possibles, ne s\'engageant qu\'au moment de la prédiction. Dans tous ces cas, l\'idée est la même : éviter de prendre des décisions arbitraires et prématurées qui pourraient se révéler sous-optimales ou incorrectes, réduisant ainsi la nécessité d\'un backtracking coûteux. La planification par ordre partiel est donc une illustration particulièrement claire d\'un principe de conception de systèmes intelligents beaucoup plus général.

## Conclusion

Ce chapitre a traversé trois territoires fondamentaux du paysage de l\'intelligence artificielle : la représentation logique, le raisonnement probabiliste et la planification automatisée. Notre parcours a débuté dans le domaine ordonné et certain de la logique symbolique, où la connaissance est exprimée avec une précision mathématique et où le raisonnement s\'apparente à une preuve formelle. Nous avons vu comment la logique du premier ordre offre un langage riche pour décrire des mondes complexes d\'objets et de relations, et comment les moteurs d\'inférence, tels que ceux basés sur le chaînage avant et arrière, permettent d\'exploiter cette connaissance de manière systématique. L\'aboutissement de cette approche, le Web Sémantique, étend cette ambition de structuration de la connaissance à l\'échelle planétaire, en s\'appuyant sur les ontologies pour créer un Web de données sémantiquement riches et interopérables.

Nous avons ensuite pivoté vers le défi central de l\'IA : la gestion de l\'incertitude. En adoptant le cadre de la théorie des probabilités, nous avons montré comment le théorème de Bayes fournit un mécanisme rationnel pour mettre à jour nos croyances face à de nouvelles évidences. Cette idée simple est à la base de modèles extraordinairement puissants. Les réseaux bayésiens nous ont offert une méthode pour représenter et raisonner sur les dépendances complexes entre un grand nombre de variables, tandis que les modèles de Markov cachés nous ont fourni les outils pour analyser et décoder des séquences temporelles. À travers l\'étude des algorithmes d\'inférence, qu\'ils soient exacts comme l\'élimination de variables ou approximatifs comme l\'échantillonnage de Gibbs, nous avons touché au cœur du défi computationnel de l\'IA : la complexité de l\'inférence est souvent le principal goulot d\'étranglement, et le développement de méthodes d\'approximation efficaces est un moteur constant d\'innovation.

Enfin, nous avons relié la connaissance et le raisonnement à l\'action par le biais de la planification automatisée. En formalisant les problèmes en termes d\'états, d\'actions et d\'objectifs à l\'aide de langages comme PDDL, nous avons transformé la synthèse de plans en un problème de recherche algorithmique. Que ce soit par l\'exploration systématique de l\'espace des états ou par l\'approche plus flexible de la planification par ordre partiel, ces algorithmes incarnent la capacité d\'un agent à délibérer sur l\'avenir et à construire une séquence d\'opérations pour atteindre ses buts.

En conclusion, la capacité d\'un système à connaître et à raisonner n\'est pas monolithique. Elle repose sur une boîte à outils de formalismes et d\'algorithmes, chacun adapté à des facettes différentes du monde. La logique offre la rigueur pour les domaines structurés ; les probabilités fournissent la flexibilité pour naviguer dans l\'incertitude ; et la planification apporte le cadre pour l\'action intentionnelle. La maîtrise de ces trois paradigmes et de leurs interactions est essentielle pour comprendre les fondements théoriques de l\'intelligence artificielle et pour construire les systèmes complexes de demain.

