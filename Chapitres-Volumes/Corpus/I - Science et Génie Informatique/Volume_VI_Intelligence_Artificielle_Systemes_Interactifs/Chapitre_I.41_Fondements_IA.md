# Chapitre I.41 : Fondements Intelligence Artificielle (IA)

Ce chapitre inaugural du volume consacré à l\'intelligence artificielle (IA) a pour vocation d\'établir les fondations conceptuelles, historiques et algorithmiques de la discipline. Nous débuterons par un survol de l\'histoire et des débats philosophiques qui ont façonné l\'IA, de sa naissance officielle à la conférence de Dartmouth jusqu\'aux questionnements contemporains sur la nature de la pensée et de la conscience. Nous introduirons ensuite le paradigme de l\'agent intelligent, un cadre formel unificateur qui nous permettra de structurer notre exploration du domaine. Le cœur de ce chapitre sera consacré à l\'un des piliers de l\'IA classique : la résolution de problèmes par la recherche. Nous aborderons cette thématique avec une rigueur algorithmique croissante, en commençant par les stratégies de recherche non informées, puis en introduisant la puissance des heuristiques dans les recherches informées comme l\'algorithme A\*. Nous explorerons ensuite des approches alternatives telles que la recherche locale et les algorithmes évolutionnaires. Enfin, nous étendrons notre analyse à des environnements plus complexes : les jeux à deux joueurs, qui nécessitent une recherche adversariale, et les problèmes de satisfaction de contraintes (CSP), qui représentent une classe de problèmes structurés omniprésents en ingénierie et en recherche opérationnelle. À travers ce parcours, l\'objectif est de doter le lecteur d\'une compréhension profonde des mécanismes fondamentaux qui permettent à un agent de raisonner, de planifier et d\'agir de manière intelligente dans un environnement formalisé.

## 41.1 Histoire, Philosophie et Agents Intelligents

Avant de plonger dans la technicité des algorithmes, il est impératif de comprendre le contexte dans lequel l\'intelligence artificielle a émergé. Cette discipline n\'est pas née *ex nihilo* ; elle est l\'aboutissement de siècles de questionnements philosophiques sur la nature de l\'esprit, combinés aux avancées fulgurantes de l\'informatique au milieu du XXe siècle. Cette section retrace cet héritage, de l\'événement fondateur de Dartmouth aux débats philosophiques qui continuent de définir les frontières du domaine, pour enfin introduire le concept d\'agent intelligent, qui servira de fil conducteur à notre étude de l\'IA.

### 41.1.1 L\'acte de naissance d\'une discipline : Le Dartmouth Summer Research Project on Artificial Intelligence

L\'histoire formelle de l\'intelligence artificielle en tant que champ de recherche distinct commence à l\'été 1956, sur le campus du Dartmouth College, dans le New Hampshire. Cependant, pour saisir la portée révolutionnaire de cet événement, il faut d\'abord appréhender le paysage intellectuel et technologique de l\'époque.

**Contexte pré-Dartmouth : des calculateurs aux machines pensantes**

Au début des années 1950, les ordinateurs, ou plutôt les « calculateurs » comme on les appelait alors, étaient perçus comme des machines prodigieuses, mais fondamentalement limitées à l\'exécution de tâches arithmétiques et logiques simples et répétitives. Leur puissance résidait dans leur vitesse d\'exécution, non dans une quelconque capacité d\'analyse ou d\'adaptation. L\'informatique traditionnelle se concentrait sur la résolution de problèmes pour lesquels des algorithmes connus et déterministes existaient déjà.

Néanmoins, l\'idée de machines capables de dépasser ce rôle de simple exécutant et de simuler des facultés cognitives humaines commençait à germer dans l\'esprit de pionniers issus de disciplines variées comme les mathématiques, les sciences cognitives et l\'électronique. La question n\'était plus seulement de savoir comment faire calculer une machine plus vite, mais de savoir si une machine pouvait raisonner, apprendre et trouver ses propres solutions, à l\'image d\'un cerveau humain.

**La proposition de 1955 et la conjecture fondatrice**

C\'est dans ce climat d\'effervescence intellectuelle que John McCarthy, un jeune mathématicien et chercheur en informatique, ressentit le besoin de formaliser et de fédérer ces recherches naissantes. Le 31 août 1955, il s\'associa à trois autres figures majeures de l\'époque --- Marvin Minsky de l\'Université Harvard, Nathaniel Rochester d\'IBM et le père de la théorie de l\'information, Claude Shannon des Bell Telephone Laboratories --- pour rédiger une proposition de financement à la Fondation Rockefeller. L\'objectif était d\'organiser un colloque d\'été de deux mois, l\'année suivante, dédié à un domaine qu\'ils baptisèrent, dans cette même proposition, «

*artificial intelligence* ».

Ce document historique n\'était pas un simple plan de projet technique ; il s\'agissait d\'une déclaration philosophique radicale. Il reposait sur une conjecture audacieuse qui constitue encore aujourd\'hui le postulat fondamental de l\'IA :

> « L\'étude doit procéder sur la base de la conjecture que chaque aspect de l\'apprentissage ou toute autre caractéristique de l\'intelligence peut en principe être décrit avec une telle précision qu\'une machine peut être fabriquée pour le simuler. »

Cette affirmation représente une rupture philosophique majeure avec la vision dominante de l\'ordinateur. Elle postule que l\'intelligence, dans toutes ses manifestations --- apprentissage, raisonnement, créativité, langage --- n\'est pas une propriété métaphysique insaisissable, mais un processus de traitement de l\'information suffisamment complexe pour être formalisé et, par conséquent, calculable. C\'est cet acte de foi en la calculabilité de l\'intelligence qui a véritablement distingué l\'IA naissante de l\'informatique générale, en orientant le nouveau domaine vers l\'exploration des *inconnues* de la cognition, plutôt que vers la simple application d\'algorithmes *connus*.

**L\'événement de 1956 et son héritage**

Grâce au soutien de la fondation Rockefeller, le *Dartmouth Summer Research Project on Artificial Intelligence* eut bien lieu de juin à août 1956. L\'événement prit la forme d\'une session de remue-méninges prolongée, avec une participation fluctuante d\'une dizaine de scientifiques parmi les plus brillants de l\'époque. Seuls McCarthy, Minsky et Ray Solomonoff restèrent pour la durée complète de l\'atelier.

Contrairement à de nombreuses conférences scientifiques, l\'atelier de Dartmouth ne produisit pas de publication conjointe ou de résultat technique unifié. Son héritage fut bien plus profond et diffus. Premièrement, il officialisa la naissance d\'un nouveau champ de recherche et lui donna un nom. Deuxièmement, il initia des directions de recherche qui allaient devenir centrales, notamment les méthodes symboliques. Troisièmement, il fut le creuset où des concepts fondamentaux furent forgés ; c\'est par exemple au cours de cet été qu\'Arthur Samuel, un des participants, inventa le terme « *machine learning* » pour décrire son programme de jeu de dames capable d\'apprendre de ses erreurs.

L\'influence de Dartmouth se fit sentir au cours des deux décennies suivantes, non pas à travers un rapport de conférence, mais à travers les travaux individuels des participants, qui devinrent les pères fondateurs et les leaders des premiers grands laboratoires d\'IA. L\'atelier a marqué une bifurcation dans l\'histoire de l\'informatique, créant une discipline entièrement dédiée à la résolution de problèmes pour lesquels aucun algorithme satisfaisant n\'existait encore, avec l\'ambition ultime de comprendre et de répliquer l\'intelligence elle-même.

### 41.1.2 Les grandes questions philosophiques : La machine peut-elle penser?

La conjecture de Dartmouth, en affirmant que l\'intelligence est simulable, a immédiatement soulevé une question philosophique fondamentale et provocatrice : une machine peut-elle penser? Ce débat, loin d\'être résolu, a donné naissance à certaines des expériences de pensée les plus célèbres de l\'informatique et de la philosophie de l\'esprit.

**Le Test de Turing : une définition opérationnelle de l\'intelligence**

Conscient de l\'ambiguïté des termes « machine » et « penser », le mathématicien britannique Alan Turing, dès 1950, dans son article séminal *Computing Machinery and Intelligence*, proposa de remplacer cette question par une autre, plus pragmatique et mesurable. Pour ce faire, il imagina une expérience qu\'il nomma le « jeu de l\'imitation », aujourd\'hui universellement connue sous le nom de Test de Turing.

Le protocole original est d\'une élégante simplicité. Il met en scène trois participants : un évaluateur humain (C), qui est isolé, et deux interlocuteurs, un homme (A) et une femme (B). L\'évaluateur communique avec A et B uniquement par le biais d\'un terminal textuel et doit déterminer qui est l\'homme et qui est la femme. L\'homme (A) a pour instruction de tromper l\'évaluateur, tandis que la femme (B) doit l\'aider. Turing utilise ce premier jeu pour illustrer la difficulté d\'identifier une identité sur la seule base du langage.

Il propose ensuite de remplacer l\'un des interlocuteurs (par exemple, A) par une machine. La nouvelle question devient : « L\'évaluateur se trompera-t-il aussi souvent dans ce jeu que lorsque le jeu se déroule entre un homme et une femme? ». Dans sa version moderne et simplifiée, le test consiste pour un évaluateur humain à dialoguer à l\'aveugle avec un humain et une machine. Si, après une conversation d\'une durée déterminée, l\'évaluateur n\'est pas capable d\'identifier de manière fiable qui est la machine, alors on considère que la machine a « réussi » le test.

Turing lui-même avait prédit qu\'aux alentours de l\'an 2000, des machines dotées d\'environ 128 Mo de mémoire seraient capables de tromper 30 % des juges humains après cinq minutes de conversation. Il est crucial de noter que Turing ne prétendait pas qu\'une machine réussissant le test serait consciente ou posséderait une compréhension humaine. Le test est un critère pragmatique et

*comportemental* : il évalue la capacité d\'une machine à *simuler* une conversation humaine de manière indiscernable, et non sa capacité à *comprendre* réellement le sens de cette conversation. C\'est une évaluation de la performance extérieure, pas de la réalité intérieure.

**Le débat sur l\'IA Forte contre l\'IA Faible et l\'argument de la Chambre Chinoise**

Le Test de Turing, en se concentrant exclusivement sur le comportement observable, a laissé un vide philosophique béant concernant la nature de l\'état mental interne de la machine. C\'est précisément ce vide que le philosophe John Searle a cherché à combler en 1980 avec sa célèbre expérience de pensée de la « Chambre Chinoise », qui a popularisé la distinction cruciale entre IA faible et IA forte.

> **IA Faible (ou Étroite)** : Cette hypothèse postule que les machines peuvent être programmées pour *agir comme si* elles étaient intelligentes. Les systèmes d\'IA faible sont des outils puissants, spécialisés dans des tâches précises : jouer aux échecs, reconnaître la parole, conduire une voiture, ou même générer du texte de manière cohérente comme le font les grands modèles de langage (LLM) actuels. Ces systèmes simulent l\'intelligence, mais ne possèdent ni conscience, ni intentionnalité, ni compréhension sémantique. L\'IA faible est la seule forme d\'intelligence artificielle qui existe aujourd\'hui.
>
> **IA Forte (ou Générale, AGI)** : Cette hypothèse, beaucoup plus ambitieuse, affirme qu\'un ordinateur correctement programmé n\'est pas seulement une simulation d\'un esprit, mais est *littéralement* un esprit. Un tel système posséderait une conscience, une compréhension et une intelligence générale équivalentes à celles d\'un être humain, lui permettant d\'accomplir n\'importe quelle tâche intellectuelle. L\'IA forte reste, à ce jour, purement hypothétique.

Pour réfuter la possibilité même de l\'IA forte, Searle a conçu l\'argument de la Chambre Chinoise. Le scénario est le suivant :

> **La configuration :** Un homme qui ne comprend pas un seul mot de chinois est enfermé dans une pièce.
>
> **Les entrées :** Par une fente, on lui passe des feuilles de papier couvertes de symboles chinois, qui sont en réalité des questions.
>
> **Le processus :** L\'homme dispose d\'un manuel d\'instructions extrêmement détaillé, écrit dans sa langue maternelle (par exemple, l\'anglais), qui lui indique comment manipuler les symboles. Les règles sont purement formelles et syntaxiques, du type : « Si vous voyez cette séquence de symboles, écrivez en réponse cette autre séquence de symboles ».
>
> **Les sorties :** L\'homme suit les instructions, manipule les symboles et produit des réponses en chinois qu\'il passe à l\'extérieur par une autre fente.

Du point de vue d\'un observateur extérieur parlant chinois, la chambre répond aux questions de manière parfaitement intelligente et cohérente. La chambre, en tant que système, passe avec succès le Test de Turing en chinois. Pourtant, l\'homme à l\'intérieur n\'a aucune compréhension du chinois. Il ne fait que manipuler des symboles sans en connaître le sens (la sémantique). Pour lui, les symboles chinois pourraient être de simples dessins sans signification.

La conclusion de Searle est puissante : un programme informatique, aussi complexe soit-il, n\'est rien de plus que le manuel d\'instructions de la chambre chinoise. Il exécute des opérations formelles et syntaxiques sur des données. La syntaxe, soutient Searle, n\'est ni suffisante ni constitutive de la sémantique. Par conséquent, même un programme qui passerait le Test de Turing ne « comprendrait » rien, pas plus que l\'homme dans la chambre ne comprend le chinois. L\'IA forte est donc impossible par principe, car la computation est définie par la manipulation de symboles, et non par la compréhension de leur signification.

Loin d\'être invalidé par les progrès récents, l\'argument de Searle trouve une résonance particulière aujourd\'hui. Les grands modèles de langage comme GPT-4, qui excellent à des tests de type Turing , sont en fait la manifestation la plus parfaite de la Chambre Chinoise jamais réalisée. Ils fonctionnent en manipulant des motifs statistiques dans des quantités astronomiques de données textuelles pour produire des séquences de symboles syntaxiquement plausibles. Leur succès ne démontre pas l\'émergence de la conscience, mais illustre plutôt la puissance d\'une manipulation syntaxique à grande échelle, exactement le scénario que Searle décrivait il y a plus de quarante ans. Le succès des LLM au Test de Turing ne réfute pas la Chambre Chinoise ; il la construit.

### 41.1.3 Le paradigme de l\'agent intelligent : un cadre unificateur pour l\'IA

Face à la diversité des problèmes abordés en IA --- de la reconnaissance d\'images à la planification logistique, en passant par le jeu d\'échecs --- les chercheurs ont eu besoin d\'un cadre conceptuel unificateur. Ce cadre est celui de l\'**agent intelligent**. L\'idée est de considérer l\'IA non pas comme la construction d\'un \"cerveau\" désincarné, mais comme l\'étude et la conception d\'agents, c\'est-à-dire d\'entités qui agissent dans un environnement.

**Définition formelle et rationalité**

Un **agent** est défini comme toute entité capable de percevoir son environnement par le biais de **capteurs** (*sensors*) et d\'agir sur cet environnement par le biais d\'**effecteurs** (*actuators*).

> Un agent humain a pour capteurs ses yeux, ses oreilles, etc., et pour effecteurs ses mains, ses jambes, sa bouche.
>
> Un agent robotique a pour capteurs des caméras, des sonars, et pour effecteurs des moteurs, des pinces.
>
> Un agent logiciel (comme un robot d\'indexation web) a pour capteurs les paquets réseau et le contenu des fichiers, et pour effecteurs l\'envoi de paquets et l\'écriture de fichiers.

Le comportement d\'un agent est décrit par sa **fonction d\'agent**, qui met en correspondance n\'importe quelle séquence de perceptions passées avec une action. L\'objectif de l\'IA est de concevoir des **agents rationnels**. Un agent rationnel est celui qui, pour chaque séquence de perceptions possible, sélectionne une action qui est censée maximiser sa **mesure de performance**, compte tenu des informations fournies par la séquence de perceptions et de toutes les connaissances que l\'agent a intégrées. La rationalité dépend donc de quatre éléments : la mesure de performance qui définit le succès, les connaissances préalables de l\'agent sur l\'environnement, la séquence de perceptions de l\'agent jusqu\'à présent, et les actions que l\'agent peut effectuer.

Pour spécifier formellement la tâche d\'un agent, on utilise le cadre **PEAS** (Performance, Environment, Actuators, Sensors). Par exemple, pour un taxi autonome :

> **Performance:** Sécurité, rapidité, confort du passager, respect du code de la route, maximisation des profits.
>
> **Environnement:** Routes, autres véhicules, piétons, panneaux de signalisation, météo.
>
> **Actuateurs:** Volant, accélérateur, frein, clignotants, klaxon, affichage pour le passager.
>
> **Capteurs:** Caméras, GPS, sonar, lidar, accéléromètre, odomètre, capteurs moteur.

**Architectures d\'agents : une hiérarchie de complexité**

La manière dont la fonction d\'agent est implémentée définit son architecture. Russell et Norvig proposent une classification des agents en une hiérarchie de complexité croissante, qui fournit une feuille de route pour les grands thèmes de l\'IA.

> **Agent réactif simple (Simple reflex agent) :** C\'est l\'architecture la plus simple. L\'agent sélectionne ses actions uniquement sur la base de la perception *actuelle*, en ignorant l\'historique des perceptions. Il fonctionne grâce à un ensemble de règles de type **condition-action** (« si telle condition est perçue, alors effectuer telle action »). Par exemple, pour un véhicule autonome, une règle pourrait être « si le véhicule de devant freine, alors freiner ». Ces agents sont très rapides mais ne peuvent fonctionner que dans des environnements entièrement observables, où la perception actuelle suffit pour prendre la bonne décision.
>
> **Agent à base de modèle (Model-based reflex agent) :** Pour gérer des environnements partiellement observables, l\'agent doit maintenir un **état interne** qui représente sa croyance sur l\'état actuel du monde. Cet état est mis à jour en utilisant deux types de connaissances : un **modèle de transition** (comment le monde évolue indépendamment de l\'agent) et un **modèle des capteurs** (comment les actions de l\'agent affectent le monde). Avoir un modèle du monde permet à l\'agent de raisonner sur les aspects non perçus de l\'environnement. Cette nécessité de représenter et de raisonner sur l\'état du monde mène directement aux domaines de la représentation des connaissances et de l\'inférence logique.
>
> **Agent à base de but (Goal-based agent) :** Connaître l\'état du monde n\'est pas toujours suffisant pour décider quoi faire. L\'agent a besoin d\'informations sur ses **buts**, c\'est-à-dire des descriptions de situations désirables. En combinant ses buts avec son modèle du monde, l\'agent peut choisir des actions qui le mèneront à ces buts. La prise de décision devient alors un processus de **recherche** ou de **planification** : l\'agent explore les conséquences de séquences d\'actions pour trouver celle qui atteint le but. Cette architecture est plus flexible que l\'architecture réactive, car les buts peuvent être modifiés facilement. C\'est précisément cette architecture qui motive l\'étude de la résolution de problèmes par la recherche, qui constitue le reste de ce chapitre.
>
> **Agent à base d\'utilité (Utility-based agent) :** Les buts seuls ne permettent pas toujours de distinguer les solutions. Un état but peut être atteint plus rapidement, plus sûrement ou à moindre coût qu\'un autre. Une **fonction d\'utilité** associe un nombre réel à chaque état, représentant un degré de satisfaction ou de \"bonheur\". Un agent à base d\'utilité choisit l\'action qui mène à l\'**utilité attendue** la plus élevée. L\'utilité permet de gérer des buts multiples et contradictoires (par exemple, rapidité contre sécurité) et de prendre des décisions rationnelles en situation d\'incertitude, lorsque les résultats des actions ne sont pas déterministes. Cette architecture est une généralisation de l\'agent à base de but et ouvre la voie à l\'étude de la théorie de la décision, de la théorie des probabilités et de l\'apprentissage par renforcement.

Cette hiérarchie des architectures d\'agents n\'est donc pas une simple taxonomie. Elle constitue une feuille de route conceptuelle pour l\'ensemble du domaine de l\'IA. Chaque niveau de complexité introduit un nouveau type de problème computationnel que les différentes branches de l\'IA s\'efforcent de résoudre. En commençant par l\'agent à base de but, nous allons maintenant nous attaquer au premier de ces grands problèmes : comment un agent peut-il trouver une séquence d\'actions pour atteindre un objectif?

## 41.2 Résolution de Problèmes par la Recherche

Le concept de résolution de problèmes par la recherche est au cœur de l\'intelligence artificielle classique. Il fournit un cadre formel et puissant pour les agents à base de but, leur permettant de trouver des solutions à une vaste gamme de problèmes, de la planification d\'itinéraires à la résolution de casse-têtes logiques. L\'idée centrale est de formuler un problème comme une recherche dans un espace d\'états, où la solution est un chemin menant d\'un état initial à un état but. Cette section est consacrée à une exploration approfondie de ce paradigme, en commençant par la définition rigoureuse d\'un problème de recherche, puis en examinant systématiquement les différentes stratégies algorithmiques pour l\'explorer.

### 41.2.1 Formalisme des problèmes de recherche

Avant de pouvoir résoudre un problème, un agent doit le formuler de manière précise. Un problème de recherche peut être défini formellement par les six composantes suivantes  :

> **L\'espace d\'états (S) :** C\'est l\'ensemble de toutes les configurations possibles que l\'environnement peut occuper. Chaque état est une représentation complète de la situation à un instant donné. Par exemple, dans un problème de navigation routière, un état pourrait être défini par la ville où se trouve l\'agent. Dans le jeu du taquin, un état est une configuration spécifique des tuiles sur le plateau. L\'espace d\'états peut être fini ou infini.
>
> **L\'état initial (s0) :** C\'est l\'état dans lequel l\'agent commence sa recherche. Il est un élément de l\'espace d\'états S.
>
> **Les actions (ou opérateurs) :** Il s\'agit d\'une description des actions possibles pour l\'agent. On définit souvent une fonction ACTIONS(s) qui retourne l\'ensemble des actions applicables dans un état s∈S. Par exemple, depuis une ville donnée, les actions possibles sont les routes menant aux villes voisines.
>
> **La fonction de transition (ou modèle de transition) :** Elle décrit le résultat de l\'exécution d\'une action. Elle est généralement formalisée par une fonction RESULTAT(s,a) qui retourne l\'état s′ atteint après avoir exécuté l\'action a dans l\'état s. L\'ensemble des états, l\'état initial, les actions et la fonction de transition définissent implicitement le **graphe de l\'espace d\'états**.
>
> **Le test de but :** C\'est une fonction qui détermine si un état donné est un état but. Il peut s\'agir d\'un test d\'égalité avec un état but explicite (par exemple, « être à Bucarest ») ou d\'une propriété abstraite (par exemple, « être en situation d\'échec et mat »). L\'ensemble des états buts est noté F⊆S.
>
> **Le coût du chemin :** Une fonction qui assigne un coût numérique à un chemin. Un chemin est une séquence d\'états connectés par une séquence d\'actions. Le coût d\'un chemin est souvent défini comme la somme des coûts de chaque action le long du chemin. Le coût d\'une action a pour passer de l\'état s à l\'état s′ est noté c(s,a,s′).

Une **solution** à un problème de recherche est un chemin de l\'état initial à un état but. Une **solution optimale** est une solution qui a le coût de chemin le plus bas parmi toutes les solutions possibles.

Le processus de recherche consiste à explorer le graphe de l\'espace d\'états pour trouver un tel chemin. Cette exploration peut être visualisée comme la construction progressive d\'un **arbre de recherche**. La racine de cet arbre est l\'état initial. Les nœuds de l\'arbre correspondent à des états de l\'espace d\'états, et les branches correspondent aux actions. L\'expansion d\'un nœud dans l\'arbre de recherche consiste à appliquer la fonction de transition pour générer tous ses successeurs. Les algorithmes de recherche diffèrent par la manière dont ils choisissent le prochain nœud à explorer.

### 41.2.2 Stratégies de recherche non informée (aveugle)

Les stratégies de recherche non informées, également appelées recherches aveugles, sont des algorithmes qui explorent l\'espace d\'états de manière systématique sans disposer d\'informations supplémentaires sur la localisation du but. L\'ordre d\'expansion des nœuds est uniquement déterminé par leur position dans l\'arbre de recherche. Nous allons étudier les deux stratégies les plus fondamentales : la recherche en largeur d\'abord et la recherche en profondeur d\'abord.

Pour analyser et comparer les algorithmes de recherche, nous utilisons quatre critères principaux  :

> **Complétude :** L\'algorithme garantit-il de trouver une solution si elle existe?
>
> **Optimalité :** L\'algorithme garantit-il de trouver la solution optimale (celle avec le coût le plus bas)?
>
> **Complexité temporelle :** Combien de temps faut-il pour trouver une solution? Généralement mesurée par le nombre de nœuds générés.
>
> **Complexité spatiale :** Quelle quantité de mémoire est nécessaire? Généralement mesurée par le nombre maximal de nœuds stockés en mémoire.

Dans notre analyse, nous utiliserons les notations suivantes :

> b : le **facteur de branchement**, c\'est-à-dire le nombre maximal de successeurs d\'un nœud.
>
> d : la **profondeur** de la solution la moins profonde.
>
> m : la **profondeur maximale** de l\'espace d\'états (peut être infinie).

#### Recherche en largeur d\'abord (Breadth-First Search - BFS)

**Principe**

La recherche en largeur d\'abord (BFS) explore l\'arbre de recherche niveau par niveau. Elle commence par l\'état initial (niveau 0), puis explore tous ses successeurs (niveau 1), puis les successeurs de ces derniers (niveau 2), et ainsi de suite. Pour ce faire, l\'algorithme maintient une structure de données appelée la

**frontière** (ou *open list*), qui contient les nœuds qui ont été générés mais pas encore explorés. Pour BFS, cette frontière est implémentée comme une file de type **premier entré, premier sorti (FIFO)**. Le nœud le moins profond de la frontière est toujours le prochain à être exploré.

**Pseudo-code**

L\'algorithme BFS utilise également un ensemble de nœuds **explorés** (ou *closed list*) pour éviter de traiter plusieurs fois le même état, ce qui est crucial dans les graphes contenant des cycles.

fonction RECHERCHE-EN-LARGEUR(problème) retourne une solution ou un échec
nœud ← NŒUD(ÉTAT=problème.ÉTAT-INITIAL, CHEMIN-COÛT=0)
si problème.TEST-BUT(nœud.ÉTAT) alors retourner SOLUTION(nœud)

frontière ← une file FIFO avec nœud comme seul élément
explorés ← un ensemble vide

boucle infinie :
si FRONTIÈRE-EST-VIDE?(frontière) alors retourner échec

nœud ← POP(frontière) // Retire le premier élément de la file
ajouter nœud.ÉTAT à explorés

pour chaque action dans problème.ACTIONS(nœud.ÉTAT) :
enfant ← NŒUD-ENFANT(problème, nœud, action)

si enfant.ÉTAT n\'est pas dans explorés et n\'est pas dans frontière :
si problème.TEST-BUT(enfant.ÉTAT) alors retourner SOLUTION(enfant)
ajouter enfant à la fin de la frontière

**Analyse des propriétés**

> **Complétude :** La recherche en largeur d\'abord est complète. Si une solution existe, BFS la trouvera. En effet, comme l\'algorithme explore niveau par niveau, il finira par atteindre la profondeur d de la solution la moins profonde, à condition que le facteur de branchement b soit fini.
>
> **Optimalité :** BFS est optimale si le coût de toutes les actions est identique (par exemple, coût unitaire). Dans ce cas, la première solution trouvée sera nécessairement celle à la profondeur la plus faible, qui est donc la solution optimale en termes de nombre d\'actions. Si les coûts des actions varient, ce n\'est plus garanti.
>
> **Complexité temporelle :** Dans le pire des cas, BFS doit explorer tous les nœuds jusqu\'à la profondeur d. Le nombre de nœuds est 1+b+b2+\...+bd. La complexité temporelle est donc de l\'ordre de O(bd). C\'est une croissance exponentielle qui rend l\'algorithme impraticable pour des problèmes de grande taille.
>
> **Complexité spatiale :** Le principal problème de BFS est sa consommation de mémoire. La frontière doit stocker tous les nœuds d\'un niveau avant de passer au suivant. Dans le pire des cas, la file contiendra tous les nœuds au niveau d, soit bd nœuds. La complexité spatiale est donc également de O(bd). La mémoire est souvent une contrainte plus limitante que le temps pour BFS.

#### Recherche en profondeur d\'abord (Depth-First Search - DFS)

**Principe**

La recherche en profondeur d\'abord (DFS) explore l\'arbre de recherche en suivant une branche aussi profondément que possible. Lorsqu\'elle atteint un nœud sans successeur ou une profondeur limite, elle revient en arrière (*backtracking*) pour explorer la branche suivante non visitée. Pour implémenter cette stratégie, la frontière est gérée comme une pile de type

**dernier entré, premier sorti (LIFO)**. Le nœud le plus profond de la frontière est toujours le prochain à être exploré. L\'implémentation est souvent plus simple en utilisant la récursivité, où la pile du système gère implicitement la frontière.

**Pseudo-code (version récursive)**

fonction RECHERCHE-EN-PROFONDEUR-RÉCURSIVE(nœud, problème, explorés) retourne une solution ou un échec
si problème.TEST-BUT(nœud.ÉTAT) alors retourner SOLUTION(nœud)

ajouter nœud.ÉTAT à explorés

pour chaque action dans problème.ACTIONS(nœud.ÉTAT) :
enfant ← NŒUD-ENFANT(problème, nœud, action)

si enfant.ÉTAT n\'est pas dans explorés :
résultat ← RECHERCHE-EN-PROFONDEUR-RÉCURSIVE(enfant, problème, explorés)
si résultat n\'est pas un échec alors retourner résultat

retourner échec

**Analyse des propriétés**

> **Complétude :** La recherche en profondeur d\'abord n\'est pas complète en général. Si l\'arbre de recherche contient des branches de profondeur infinie (ce qui peut arriver même dans des espaces d\'états finis s\'il y a des cycles et qu\'on ne gère pas les états visités), DFS peut s\'y perdre et ne jamais trouver de solution, même si elle existe sur une autre branche. L\'algorithme est complet uniquement pour les espaces d\'états finis et sans cycles (ou si l\'on mémorise tous les états visités).
>
> **Optimalité :** DFS n\'est pas optimale. Elle retourne la première solution qu\'elle trouve, qui peut se trouver très profondément dans l\'arbre et être beaucoup plus coûteuse qu\'une autre solution située sur une branche explorée plus tard.
>
> **Complexité temporelle :** Dans le pire des cas, DFS peut explorer l\'intégralité de l\'arbre de recherche jusqu\'à sa profondeur maximale m. La complexité temporelle est donc de O(bm). Si
> m est beaucoup plus grand que d, DFS peut être beaucoup plus lente que BFS.
>
> **Complexité spatiale :** C\'est le principal avantage de DFS. L\'algorithme n\'a besoin de stocker en mémoire que le chemin actuel depuis la racine jusqu\'au nœud courant, ainsi que les frères non explorés des nœuds de ce chemin. La taille de la frontière est donc de l\'ordre de b×m. La complexité spatiale est de O(bm), ce qui est linéaire en la profondeur maximale et bien meilleur que la complexité exponentielle de BFS.

#### Le compromis fondamental de la recherche non informée

La comparaison des propriétés de BFS et DFS met en lumière un compromis fondamental et inévitable dans le domaine de la recherche non informée : celui entre la **qualité de la solution et la consommation de mémoire**.

> BFS garantit de trouver la solution la moins profonde (et donc optimale pour des coûts unitaires), mais son besoin en mémoire, qui croît exponentiellement avec la profondeur, le rend inutilisable pour la plupart des problèmes non triviaux.
>
> DFS, à l\'inverse, possède une empreinte mémoire remarquablement faible, linéaire en la profondeur, ce qui lui permet d\'aborder des problèmes beaucoup plus vastes. Cependant, ce gain en mémoire se fait au prix du sacrifice de la complétude (dans les graphes infinis ou avec cycles) et de l\'optimalité.

Ce dilemme --- vouloir la bonne réponse mais risquer de manquer de mémoire (BFS), ou vouloir une réponse qui tient en mémoire mais qui pourrait être mauvaise ou jamais trouvée (DFS) --- n\'est pas un simple détail d\'implémentation. C\'est un défi conceptuel central qui motive directement le développement de tous les algorithmes de recherche plus sophistiqués. Des algorithmes comme la *recherche en profondeur itérative* (qui exécute des DFS successifs avec une profondeur limite croissante) tentent de combiner l\'efficacité spatiale de DFS avec la complétude et l\'optimalité de BFS. Plus fondamentalement, ce compromis justifie la nécessité de s\'éloigner des stratégies \"aveugles\" pour se tourner vers des stratégies \"informées\", capables de guider la recherche plus intelligemment afin de réduire la taille de l\'espace à explorer et de rendre les complexités temporelle et spatiale gérables.

### 41.2.3 Stratégies de recherche informée (heuristique)

Les stratégies de recherche non informées sont souvent trop inefficaces car elles explorent l\'espace d\'états sans tenir compte de la direction du but. L\'idée de la recherche informée, ou recherche heuristique, est d\'utiliser une connaissance spécifique au problème pour guider la recherche vers les régions les plus prometteuses de l\'espace d\'états. Cette connaissance est encapsulée dans une **fonction heuristique**.

Une fonction heuristique, notée h(n), est une fonction qui estime le coût du chemin le moins cher depuis l\'état du nœud n jusqu\'à un état but. L\'heuristique est une \"estimation éclairée\" ; elle n\'est pas nécessairement exacte, mais elle doit être rapide à calculer. Par exemple, pour un problème de navigation entre deux villes, une bonne heuristique est la distance à vol d\'oiseau (distance euclidienne) entre la ville actuelle et la ville de destination.

#### Heuristiques admissibles et cohérentes

La qualité d\'une heuristique est cruciale. Deux propriétés sont particulièrement importantes pour garantir l\'optimalité de certains algorithmes de recherche.

> **Admissibilité :** Une fonction heuristique h est dite **admissible** si, pour chaque nœud n, elle ne surestime jamais le coût réel pour atteindre le but. Formellement, h(n)≤h∗(n), où h∗(n) est le coût réel du chemin optimal de n à un état but. Une heuristique admissible est une heuristique \"optimiste\". La distance à vol d\'oiseau est admissible car le chemin le plus court entre deux points est la ligne droite.
>
> Cohérence (ou Monotonicité) : Une heuristique h est dite cohérente (ou monotone) si, pour chaque nœud n et chaque successeur n′ de n généré par une action a de coût c(n,a,n′), le coût estimé depuis n n\'est pas supérieur au coût de l\'action pour aller de n à n′ plus le coût estimé depuis n′. Formellement, l\'inégalité du triangle doit être respectée :
>
> h(n)≤c(n,a,n′)+h(n′)
>
> Une conséquence de la cohérence est que les valeurs de f(n) (que nous définirons ci-dessous) le long de n\'importe quel chemin sont non décroissantes. Il est possible de prouver que toute heuristique cohérente est également admissible.43

#### L\'algorithme A\*

L\'algorithme A\* (prononcé \"A étoile\") est l\'algorithme de recherche informée le plus connu. Il combine les avantages de la recherche à coût uniforme (une variante de BFS qui explore en priorité les chemins de plus faible coût) et de la recherche gloutonne (qui explore en priorité les nœuds semblant les plus proches du but). A\* évalue les nœuds de la frontière en combinant ces deux approches.

**Principe**

A\* sélectionne le nœud à explorer en se basant sur la minimisation d\'une fonction d\'évaluation f(n) pour chaque nœud n  :

f(n)=g(n)+h(n)

où :

> g(n) est le coût du chemin depuis l\'état initial jusqu\'au nœud n. C\'est le coût réel du chemin parcouru jusqu\'à présent.
>
> h(n) est la valeur de la fonction heuristique, qui estime le coût du chemin le moins cher de n au but.

Ainsi, f(n) représente une estimation du coût total du chemin le moins cher passant par le nœud n. A\* est un algorithme de recherche *best-first*, car il explore toujours le nœud qui semble être sur le chemin le plus prometteur, c\'est-à-dire celui avec la plus faible valeur de f.

**Pseudo-code**

Pour implémenter cette stratégie, A\* maintient la frontière comme une **file de priorité**, ordonnée par les valeurs de f(n).

fonction RECHERCHE-A-ETOILE(problème) retourne une solution ou un échec
nœud ← NŒUD(ÉTAT=problème.ÉTAT-INITIAL, CHEMIN-COÛT=0)
frontière ← une file de priorité ordonnée par CHEMIN-COÛT + h(n), avec nœud comme seul élément
explorés ← un ensemble vide

boucle infinie :
si FRONTIÈRE-EST-VIDE?(frontière) alors retourner échec

nœud ← POP(frontière) // Retire le nœud avec le plus petit f(n)

si problème.TEST-BUT(nœud.ÉTAT) alors retourner SOLUTION(nœud)

ajouter nœud.ÉTAT à explorés

pour chaque action dans problème.ACTIONS(nœud.ÉTAT) :
enfant ← NŒUD-ENFANT(problème, nœud, action)

si enfant.ÉTAT n\'est pas dans explorés et n\'est pas dans frontière :
ajouter enfant à la frontière
sinon si enfant.ÉTAT est dans frontière avec un CHEMIN-COÛT plus élevé :
remplacer ce nœud de la frontière par enfant

**Analyse des propriétés et preuve d\'optimalité**

> **Complétude :** A\* est complet dans les mêmes conditions que la recherche à coût uniforme : tant que le facteur de branchement est fini et que les coûts des actions sont supérieurs à une constante positive, A\* trouvera une solution si elle existe.
>
> **Optimalité :** C\'est la propriété la plus importante de A\*. *A est optimal si l\'heuristique h(n) est admissible*\* (et pour les graphes, si h(n) est cohérente, bien que l\'admissibilité suffise si on prend quelques précautions). Cela signifie que le premier chemin vers un but trouvé par A\* est garanti d\'être un chemin optimal.

*Preuve formelle de l\'optimalité de A avec une heuristique admissible*\*

La preuve de cette propriété fondamentale se fait par contradiction.

> **Hypothèse :** Supposons que A\* ne soit pas optimal. Cela signifie qu\'il termine sa recherche en retournant un chemin vers un état but sous-optimal G2, alors qu\'il existe un chemin vers un état but optimal G1. Notons C∗ le coût du chemin optimal (vers G1) et C2 le coût du chemin sous-optimal trouvé (vers G2). Par hypothèse, nous avons C2\>C∗.
>
> **État de la frontière :** Puisque C2\>C∗, et que A\* a exploré les chemins par ordre croissant de f(n), il doit exister au moins un nœud n sur le chemin optimal vers G1 qui n\'a pas encore été exploré au moment où G2 est sélectionné dans la frontière pour être \"expandu\".
>
> Condition de sélection : A\* a choisi d\'explorer G2 plutôt que n. Cela signifie que la valeur f de G2 était inférieure ou égale à la valeur f de n :
>
> f(G2)≤f(n)
>
> Analyse de f(G2) : Pour un nœud but, l\'heuristique est nulle par définition (h(G2)=0). Par conséquent, sa valeur f est égale à son coût de chemin g :
>
> f(G2)=g(G2)+h(G2)=g(G2)=C2
>
> **Analyse de f(n) :** Pour le nœud n qui se trouve sur le chemin optimal vers G1, sa valeur f est f(n)=g(n)+h(n).

Le coût g(n) est le coût du chemin de l\'état initial à n. Puisque n est sur le chemin optimal, ce coût est optimal.

L\'heuristique h(n) est admissible, ce qui signifie qu\'elle est inférieure ou égale au coût réel optimal pour aller de n à G1, noté h∗(n): h(n)≤h∗(n).

La somme du coût optimal pour atteindre n et du coût optimal pour aller de n à G1 est, par définition, le coût optimal total C∗. Donc, g(n)+h∗(n)=C∗.

En combinant ces éléments, nous obtenons :f(n)=g(n)+h(n)≤g(n)+h∗(n)=C∗

> La contradiction : En rassemblant les inégalités des étapes 3, 4 et 5, nous avons :
>
> C2=f(G2)≤f(n)≤C∗
>
> Cela implique que C2≤C∗. Or, notre hypothèse de départ était que C2\>C∗. Nous avons atteint une contradiction.
>
> **Conclusion :** L\'hypothèse initiale est donc fausse. A\* ne peut pas retourner un chemin sous-optimal si son heuristique est admissible. L\'algorithme est donc optimal.
>
> **Complexité temporelle et spatiale :** La complexité de A\* dépend fortement de la qualité de l\'heuristique. Dans le pire des cas (avec une heuristique très mauvaise, par exemple h(n)=0), A\* se comporte comme la recherche à coût uniforme et sa complexité reste exponentielle. Cependant, une bonne heuristique, qui est proche du coût réel sans jamais le surestimer, peut réduire l\'espace de recherche de manière drastique, ramenant la complexité à un niveau polynomial dans de nombreux cas pratiques. La complexité spatiale reste le principal défaut de A\*, car il doit stocker tous les nœuds générés dans la frontière et l\'ensemble des explorés.

### 41.2.4 Stratégies de recherche locale et optimisation

Pour une large classe de problèmes, notamment les problèmes d\'optimisation, le chemin vers la solution n\'a aucune importance ; seul l\'état final compte. Pour ces problèmes, les algorithmes de recherche systématique qui stockent des chemins en mémoire sont souvent inefficaces. Les algorithmes de **recherche locale** offrent une alternative. Ils opèrent sur un état complet unique (la solution courante) et tentent de l\'améliorer de manière itérative en effectuant des modifications locales. Leur principal avantage est une consommation de mémoire très faible, souvent constante (O(1)), car ils n\'ont pas besoin de maintenir un arbre de recherche. Cependant, ils ne sont généralement ni complets ni optimaux.

#### Recuit Simulé (Simulated Annealing)

Le recuit simulé est une métaheuristique de recherche locale inspirée d\'un processus physique en métallurgie. Le recuit est une technique où un métal est chauffé à haute température puis refroidi très lentement. Ce processus permet aux atomes de s\'organiser dans une configuration d\'énergie minimale, formant une structure cristalline stable et solide.

**Principe et analogie**

L\'algorithme de recuit simulé transpose cette idée au monde de l\'optimisation.

> L\'**état** du système correspond à une solution candidate au problème.
>
> L\'**énergie** de l\'état correspond à la valeur de la fonction de coût (ou objectif) que l\'on cherche à minimiser.
>
> La **température** (T) est un paramètre de contrôle de l\'algorithme.

L\'algorithme commence avec une solution aléatoire et une température T élevée. À chaque itération, il génère une solution voisine en appliquant une petite modification à la solution actuelle.

> Si la nouvelle solution est meilleure (coût plus faible), elle est toujours acceptée.
>
> Si la nouvelle solution est moins bonne (coût plus élevé), elle peut quand même être acceptée. C\'est la caractéristique clé du recuit simulé qui lui permet d\'échapper aux optima locaux.

La probabilité d\'accepter un \"mauvais\" mouvement est donnée par le critère de Metropolis :

P(accepter)=e−TΔE

où ΔE est l\'augmentation du coût (Enouveau−Eactuel) et T est la température actuelle.51

> Lorsque T est élevée, la probabilité d\'accepter un mauvais mouvement est grande, ce qui permet à l\'algorithme d\'explorer largement l\'espace des solutions (phase d\'exploration).
>
> À mesure que T diminue, la probabilité d\'accepter des mouvements qui dégradent la solution diminue. L\'algorithme devient plus \"sélectif\" et se concentre sur l\'amélioration de la solution actuelle (phase d\'exploitation).

**Schéma de refroidissement et pseudo-code**

La manière dont la température T diminue au fil du temps est appelée le **schéma de refroidissement**. Un schéma courant est la décroissance géométrique : Tk+1=αTk, où α est un facteur proche de 1 (par exemple, 0.99).

fonction RECUIT-SIMULÉ(problème, schéma_refroidissement) retourne une solution
courant ← NŒUD(ÉTAT=problème.ÉTAT-INITIAL)
pour t de 1 à ∞ :
T ← schéma_refroidissement(t)
si T = 0 alors retourner courant.ÉTAT

prochain ← un successeur choisi aléatoirement de courant
ΔE ← VALEUR(prochain.ÉTAT) - VALEUR(courant.ÉTAT)

si ΔE \< 0 : // Pour la minimisation, une valeur plus faible est meilleure
courant ← prochain
sinon :
courant ← prochain avec une probabilité e\^(-ΔE / T)

Le recuit simulé est un algorithme puissant qui, avec un schéma de refroidissement suffisamment lent, converge en probabilité vers l\'optimum global. En pratique, on utilise des schémas plus rapides qui trouvent de très bonnes solutions, bien que non garanties d\'être optimales.

#### Algorithmes Génétiques (Genetic Algorithms)

Les algorithmes génétiques (AG) sont une autre classe de métaheuristiques inspirées, cette fois, de la théorie de l\'évolution de Darwin. Au lieu de travailler sur une seule solution, un AG maintient une **population** de solutions candidates qui évoluent sur plusieurs **générations**.

**Principe et représentation**

Chaque solution candidate est représentée par un **chromosome**, qui est typiquement une chaîne de bits, de nombres ou d\'autres symboles. La qualité de chaque chromosome est évaluée par une

**fonction d\'adaptation** (*fitness function*), qui joue le rôle de l\'environnement : les individus les mieux adaptés ont plus de chances de survivre et de se reproduire.

L\'algorithme procède par itérations, appelées générations. À chaque génération, une nouvelle population est créée en appliquant des opérateurs génétiques inspirés de la biologie.

**Opérateurs génétiques fondamentaux**

> **Sélection :** Cette étape consiste à choisir les individus de la population actuelle qui serviront de parents pour la prochaine génération. La sélection est stochastique, mais biaisée en faveur des individus ayant une meilleure fitness. Une méthode classique est la **sélection par roulette** (*roulette-wheel selection*), où chaque individu se voit attribuer une part d\'une \"roulette\" proportionnelle à sa fitness. Un tirage sur cette roulette sélectionne un parent.
>
> **Croisement (Crossover) :** Cet opérateur imite la reproduction sexuée. Deux parents sélectionnés sont combinés pour créer un ou deux nouveaux individus (les enfants). L\'idée est que les enfants hériteront des bonnes caractéristiques de leurs deux parents. Dans le **croisement à un point**, un point de coupure est choisi au hasard sur les chromosomes des parents. Les segments après ce point sont échangés pour former deux nouveaux chromosomes.
>
> **Mutation :** C\'est une modification aléatoire et ponctuelle d\'un chromosome. Par exemple, dans un codage binaire, un bit peut être inversé (0 devient 1 ou vice-versa). La mutation se produit avec une très faible probabilité. Son rôle est crucial : elle introduit de la diversité génétique dans la population, empêchant l\'algorithme de converger prématurément vers un optimum local et permettant l\'exploration de nouvelles régions de l\'espace de recherche.

**Pseudo-code**

fonction ALGORITHME-GÉNÉTIQUE(population, fonction_fitness) retourne un individu
répéter :
nouvelle_population ← ensemble vide
pour i de 1 à TAILLE(population) :
parent1 ← SÉLECTION-ALÉATOIRE(population, fonction_fitness)
parent2 ← SÉLECTION-ALÉATOIRE(population, fonction_fitness)
enfant ← CROISEMENT(parent1, parent2)
si (petite probabilité) alors enfant ← MUTATION(enfant)
ajouter enfant à nouvelle_population
population ← nouvelle_population
jusqu\'à ce qu\'un critère d\'arrêt soit satisfait (ex: nombre de générations, convergence)

retourner le meilleur individu de la population

Les algorithmes génétiques sont particulièrement efficaces pour les problèmes d\'optimisation complexes et de grande dimension où l\'espace de recherche est vaste et mal compris.

---

  Algorithme                                                                                                                                                                                                                                                                                                                                      Complétude   Optimalité   Complexité Temporelle      Complexité Spatiale

  **Recherche en largeur (BFS)**                                                                                                                                                                                                                                                                                                                  Oui¹         Oui²         O(bd)                      O(bd)

  **Recherche en profondeur (DFS)**                                                                                                                                                                                                                                                                                                               Non³         Non          O(bm)                      O(bm)

  **Recherche à coût uniforme (UCS)**                                                                                                                                                                                                                                                                                                             Oui¹         Oui          O(b1+⌊C∗/ϵ⌋)               O(b1+⌊C∗/ϵ⌋)

  **A\***                                                                                                                                                                                                                                                                                                                                         Oui¹         Oui⁴         Dépend de l\'heuristique   O(bd)

  *Tableau 41.1 : Comparaison des propriétés des principaux algorithmes de recherche systématique. Les complexités sont exprimées en fonction du facteur de branchement b, de la profondeur de la solution optimale d, de la profondeur maximale de l\'arbre m, du coût de la solution optimale \$C\^*\$, et du coût minimal d\'une action ϵ.\*

  ¹ Si le facteur de branchement b est fini.

  ² Si tous les coûts d\'action sont identiques.

  ³ Complète dans les espaces d\'états finis si la détection de cycles est implémentée.

  ⁴ Si l\'heuristique est admissible (ou cohérente pour les graphes).

---

## 41.3 Recherche Adversariale et Théorie des Jeux

Jusqu\'à présent, nous avons considéré des problèmes où l\'agent est le seul acteur dans un environnement qui peut être passif ou stochastique. Cependant, de nombreux scénarios intéressants, comme les jeux de société (échecs, dames, Go) ou les négociations économiques, impliquent plusieurs agents dont les buts sont en conflit. Ces environnements sont qualifiés d\'**adversariaux**. Dans de tels contextes, l\'agent doit planifier ses actions en anticipant les réponses d\'un ou plusieurs adversaires qui, eux aussi, agissent de manière rationnelle pour atteindre leurs propres objectifs. Cette section introduit les fondements de la recherche adversariale pour les jeux à deux joueurs, à information parfaite et à somme nulle.

### 41.3.1 Le principe Minimax pour les jeux à deux joueurs à somme nulle

La formalisation la plus simple d\'un jeu adversarial est celle d\'un jeu à deux joueurs, que nous appellerons **MAX** et **MIN**. MAX cherche à maximiser son score, tandis que MIN cherche à le minimiser. Il s\'agit d\'un **jeu à somme nulle**, ce qui signifie que le gain d\'un joueur est exactement la perte de l\'autre. Les échecs, les dames ou le morpion sont des exemples de tels jeux.

Comme pour la recherche classique, nous pouvons modéliser le jeu par un **arbre de jeu**  :

> Les **nœuds** représentent les états du jeu (par exemple, la configuration de l\'échiquier).
>
> Les **arêtes** représentent les coups possibles.
>
> La **racine** est l\'état initial du jeu.
>
> Les **nœuds terminaux** (feuilles) sont les états où la partie est terminée (victoire, défaite ou nul).

Pour déterminer le meilleur coup à jouer, MAX a besoin d\'une stratégie qui tienne compte des réponses optimales de MIN. C\'est le rôle de l\'**algorithme Minimax**.

**Algorithme Minimax**

L\'algorithme Minimax calcule la valeur optimale d\'un état (nœud) en supposant que les deux joueurs jouent de manière optimale. Pour ce faire, il effectue une recherche en profondeur sur l\'arbre de jeu.

> **Génération de l\'arbre :** L\'algorithme génère l\'arbre de jeu jusqu\'à une certaine profondeur de coupe (car l\'arbre complet est souvent trop grand).
>
> **Fonction d\'évaluation :** Une fonction d\'évaluation heuristique est appliquée aux nœuds feuilles de l\'arbre tronqué. Cette fonction estime la désirabilité de la position pour le joueur MAX. Une valeur positive élevée indique une position favorable à MAX, tandis qu\'une valeur négative élevée indique une position favorable à MIN.
>
> **Propagation des valeurs :** Les valeurs des feuilles sont propagées vers la racine en suivant une règle simple :

À un niveau où c\'est à **MAX** de jouer (un nœud MAX), la valeur du nœud est le **maximum** des valeurs de ses enfants.

À un niveau où c\'est à **MIN** de jouer (un nœud MIN), la valeur du nœud est le **minimum** des valeurs de ses enfants.

> **Décision :** À la racine de l\'arbre, MAX choisit le coup qui mène au nœud successeur ayant la valeur maximale.

La valeur Minimax d\'un nœud est donc la valeur de la position si les deux joueurs continuent à jouer de manière optimale à partir de ce point.

### 41.3.2 Optimisation par élagage Alpha-Bêta

L\'algorithme Minimax est correct, mais il doit explorer l\'intégralité de l\'arbre de jeu jusqu\'à la profondeur de coupe, ce qui est coûteux. L\'**élagage Alpha-Bêta** est une optimisation spectaculaire qui permet d\'obtenir exactement le même résultat que Minimax, mais en explorant une fraction potentiellement beaucoup plus petite de l\'arbre. L\'idée est d\'arrêter l\'évaluation d\'une branche dès que l\'on a la certitude qu\'elle ne pourra pas influencer la décision finale à la racine.

**Mécanisme**

L\'algorithme maintient deux valeurs tout au long de sa descente dans l\'arbre :

> **Alpha (α) :** La meilleure valeur (la plus élevée) trouvée jusqu\'à présent pour **MAX** sur le chemin de la racine au nœud courant. C\'est la valeur minimale que MAX est assuré d\'obtenir. Initialement, α=−∞.
>
> **Bêta (β) :** La meilleure valeur (la plus basse) trouvée jusqu\'à présent pour **MIN** sur le chemin de la racine au nœud courant. C\'est la valeur maximale que MIN est assuré de concéder. Initialement, β=+∞.

La recherche se poursuit tant que α\<β. L\'élagage se produit lorsque cette condition n\'est plus respectée.

> **Coupure Bêta (au niveau d\'un nœud MIN) :** Supposons que nous soyons en train d\'évaluer les enfants d\'un nœud MIN. Si la valeur d\'un de ses enfants est v, la valeur du nœud MIN sera au plus v. Si cette valeur v est inférieure ou égale à α (la meilleure option déjà garantie pour MAX à un niveau supérieur), alors MAX ne choisira jamais cette branche. MIN essaiera d\'obtenir v (ou moins), mais MAX a déjà une alternative qui lui garantit au moins α. Il est donc inutile d\'explorer les autres enfants de ce nœud MIN. On peut \"couper\" la recherche. La condition de coupure est v≤α.
>
> **Coupure Alpha (au niveau d\'un nœud MAX) :** Symétriquement, si nous évaluons les enfants d\'un nœud MAX et que nous trouvons une valeur v supérieure ou égale à β (la meilleure option déjà garantie pour MIN), MIN ne laissera jamais le jeu atteindre cette branche. MAX chercherait à obtenir v (ou plus), mais MIN a déjà une alternative qui lui garantit de ne pas concéder plus que β. Il est donc inutile d\'explorer les autres enfants de ce nœud MAX. La condition de coupure est v≥β.

**Exemple pas-à-pas**

Considérons l\'arbre de jeu suivant, où les valeurs aux feuilles sont les scores du point de vue de MAX.

> La recherche commence à la racine (nœud A, un nœud MAX) avec (α=−∞,β=+∞).
>
> On explore le premier enfant, B (MIN). La recherche récursive est appelée pour B avec (α=−∞,β=+∞).
>
> On explore le premier enfant de B, D (MAX). Appel pour D avec (α=−∞,β=+∞).
>
> On explore les enfants de D. Le premier, H, a la valeur 3. La valeur de D est maintenant max(−∞,3)=3. α pour D devient 3. Le second, I, a la valeur 5. La valeur de D est max(3,5)=5. α pour D devient 5.
>
> D a été entièrement exploré, il retourne la valeur 5.
>
> De retour en B (MIN), on a traité le premier enfant (D). La valeur de B est maintenant min(+∞,5)=5. β pour B devient 5.
>
> On explore le second enfant de B, E (MAX). Appel pour E avec (α=−∞,β=5). Notez que la valeur α est locale, mais β a été propagée.
>
> On explore le premier enfant de E, J, qui a la valeur 6. La valeur de E devient max(−∞,6)=6.
>
> **Coupure!** La valeur courante de E (6) est supérieure ou égale à la valeur β (5) passée en paramètre. 6≥5. Cela signifie que MIN (en B) ne choisira jamais la branche E, car il a déjà une option (D) qui lui garantit un score de 5. Quoi que MAX puisse trouver d\'autre sous E (par exemple, un score de 9 en K), cela n\'a pas d\'importance. La branche K est élaguée. E retourne 6.
>
> De retour en B, sa valeur est min(5,6)=5. B a été entièrement exploré et retourne 5.
>
> De retour à la racine A (MAX), la valeur de A est maintenant max(−∞,5)=5. α pour A devient 5.
>
> On explore le second enfant de A, C (MIN). Appel pour C avec (α=5,β=+∞).
> \... et ainsi de suite.

L\'efficacité de l\'élagage alpha-bêta n\'est pas constante ; elle est extraordinairement dépendante de l\'ordre dans lequel les coups sont explorés. Si, par un heureux hasard ou une bonne heuristique, l\'algorithme explore toujours le meilleur coup en premier pour chaque nœud, alors l\'élagage est maximal. Dans ce cas idéal, la complexité temporelle passe de O(bd) à environ O(bd/2). Cela signifie que, pour le même temps de calcul, on peut explorer deux fois plus profondément l\'arbre de jeu, un gain exponentiel. À l\'inverse, si les pires coups sont explorés en premier, aucune coupure ne se produit, et l\'algorithme se dégrade pour retrouver la performance de Minimax. Cette sensibilité à l\'ordre des coups explique pourquoi les moteurs de jeu réels investissent des efforts considérables dans des heuristiques d\'ordonnancement des coups (telles que la *killer heuristic* ou l\'utilisation de tables de transposition) pour présenter les coups les plus prometteurs en premier à l\'algorithme alpha-bêta, transformant ainsi une simple optimisation en un outil pratique et puissant pour la recherche profonde dans les arbres de jeu.

### 41.3.3 Au-delà de Minimax : Introduction à la Recherche Arborescente Monte-Carlo (MCTS)

Malgré l\'optimisation apportée par l\'élagage alpha-bêta, cette approche reste limitée aux jeux ayant un facteur de branchement modéré. Pour des jeux comme le Go, où le nombre de coups possibles à chaque tour peut dépasser 200, la construction d\'un arbre de recherche, même tronqué, est calculatoirement impossible. Pour de tels problèmes, une approche radicalement différente a été développée : la Recherche Arborescente Monte-Carlo (MCTS).

**Principe de MCTS**

Au lieu d\'explorer l\'arbre de jeu de manière exhaustive jusqu\'à une certaine profondeur, MCTS estime la valeur de chaque coup possible en effectuant un grand nombre de simulations de parties aléatoires, appelées *playouts* ou *rollouts*. L\'algorithme construit progressivement un arbre de recherche asymétrique, en se concentrant sur les régions les plus prometteuses de l\'espace de jeu.

**Les quatre étapes de MCTS**

Chaque itération de l\'algorithme MCTS se compose de quatre étapes  :

> **Sélection :** En partant de la racine (l\'état actuel du jeu), l\'algorithme descend dans l\'arbre déjà construit. À chaque niveau, il choisit un nœud enfant en utilisant une politique de sélection qui doit équilibrer l\'**exploitation** (choisir le coup qui a le meilleur taux de victoire jusqu\'à présent) et l\'**exploration** (essayer des coups moins explorés qui pourraient se révéler meilleurs). La formule la plus courante pour cet arbitrage est UCT (*Upper Confidence bounds applied to Trees*).
>
> **Expansion :** La phase de sélection se poursuit jusqu\'à ce qu\'un nœud soit atteint qui n\'a pas encore été entièrement exploré (c\'est-à-dire qu\'il a des coups possibles qui n\'ont pas encore été ajoutés à l\'arbre). L\'algorithme choisit alors l\'un de ces coups et crée un nouveau nœud enfant dans l\'arbre.
>
> **Simulation :** À partir de ce nouveau nœud, une partie complète est simulée jusqu\'à son terme. Pour que cette phase soit rapide, les coups sont généralement choisis en utilisant une politique très simple, souvent des coups aléatoires uniformes.
>
> **Rétropropagation (Backpropagation) :** Le résultat de la simulation (victoire ou défaite) est utilisé pour mettre à jour les statistiques de tous les nœuds sur le chemin parcouru depuis le nouveau nœud jusqu\'à la racine. Chaque nœud sur ce chemin voit son compteur de visites incrémenté, ainsi que son compteur de victoires si la simulation a abouti à une victoire.

Après avoir exécuté des milliers, voire des millions, de ces itérations, l\'algorithme dispose de statistiques robustes sur les coups possibles depuis l\'état initial. Le coup finalement joué est celui qui correspond au nœud enfant de la racine le plus visité ou celui ayant le meilleur taux de victoire.

MCTS a été la technologie clé derrière les succès spectaculaires des programmes de jeu de Go, notamment AlphaGo, qui a combiné MCTS avec des réseaux de neurones profonds pour guider les phases de sélection et d\'évaluation, atteignant un niveau de jeu surhumain.

## 41.4 Problèmes de Satisfaction de Contraintes (CSP)

De nombreux problèmes en intelligence artificielle et en ingénierie ne consistent pas à trouver un chemin, mais à trouver un état qui respecte un ensemble de conditions ou de contraintes. Ces problèmes forment une classe spéciale de problèmes de recherche appelés **Problèmes de Satisfaction de Contraintes (CSP)**. Le formalisme des CSP permet de représenter ces problèmes de manière standardisée, ce qui ouvre la voie à des algorithmes de résolution généraux et efficaces.

### 41.4.1 Formalisation des CSP

Un problème de satisfaction de contraintes est défini formellement par un triplet (X,D,C)  :

> **Variables (X) :** Un ensemble fini de variables, X={X1,X2,\...,Xn}.
>
> **Domaines (D) :** Un ensemble de domaines, D={D1,D2,\...,Dn}, où chaque domaine Di est l\'ensemble fini des valeurs possibles pour la variable Xi.
>
> **Contraintes (C) :** Un ensemble fini de contraintes, C={C1,C2,\...,Cm}. Chaque contrainte Cj est définie sur un sous-ensemble de variables (son *scope*) et spécifie les combinaisons de valeurs autorisées pour ces variables.

Une **assignation** est une attribution de valeur à une ou plusieurs variables. Une assignation est **consistante** (ou légale) si elle ne viole aucune contrainte. Une assignation est **complète** si toutes les variables ont reçu une valeur. Une **solution** à un CSP est une assignation qui est à la fois complète et consistante.

**Exemples classiques de CSP :**

> **Coloration de carte :** Les variables sont les régions, les domaines sont les couleurs disponibles, et les contraintes stipulent que deux régions adjacentes ne peuvent pas avoir la même couleur.
>
> **Problème des N-Reines :** Les variables sont les colonnes de l\'échiquier (de 1 à N), les domaines sont les lignes (de 1 à N), et les contraintes interdisent que deux reines soient sur la même ligne ou la même diagonale.
>
> **Sudoku :** Les variables sont les 81 cases de la grille, les domaines sont les chiffres de 1 à 9, et les contraintes sont que les chiffres doivent être uniques dans chaque ligne, chaque colonne et chaque bloc de 3x3.
>
> **Ordonnancement :** Les variables peuvent être des tâches, les domaines des plages horaires, et les contraintes peuvent imposer des précédences ou des limitations de ressources.

### 41.4.2 Algorithme de base : Recherche par retour sur trace (Backtracking)

La méthode la plus fondamentale pour résoudre les CSP est la **recherche par retour sur trace** (*backtracking*). Il s\'agit d\'une forme de recherche en profondeur (DFS) qui construit une solution de manière incrémentale, en assignant une valeur à une variable à la fois.

**Principe**

L\'algorithme parcourt les variables une par une. Pour chaque variable, il essaie d\'assigner une valeur de son domaine. Après chaque assignation, il vérifie si l\'assignation partielle est consistante avec toutes les contraintes impliquant les variables déjà assignées.

> Si l\'assignation est consistante, il passe à la variable suivante.
>
> Si l\'assignation viole une contrainte, ou si aucune valeur ne peut être trouvée pour la variable courante, l\'algorithme **revient en arrière** (*backtracks*) : il annule l\'assignation de la variable précédente et essaie la valeur suivante pour celle-ci.

Ce processus se poursuit jusqu\'à ce qu\'une assignation complète et consistante soit trouvée, ou jusqu\'à ce que toutes les possibilités aient été explorées, prouvant qu\'aucune solution n\'existe.

**Pseudo-code**

L\'algorithme est naturellement implémenté de manière récursive.

fonction RECHERCHE-BACKTRACKING(assignation, csp) retourne une solution ou un échec
si assignation est complète alors retourner assignation

var ← SÉLECTIONNER-VARIABLE-NON-ASSIGNÉE(csp)

pour chaque valeur dans ORDONNER-VALEURS-DOMAINE(var, assignation, csp) :
si valeur est consistante avec assignation selon les contraintes de csp :
ajouter {var = valeur} à assignation
résultat ← RECHERCHE-BACKTRACKING(assignation, csp)
si résultat n\'est pas un échec alors retourner résultat
retirer {var = valeur} de assignation // Backtrack

retourner échec

### 41.4.3 Amélioration de l\'efficacité : Heuristiques et Inférence

Le backtracking naïf peut être très inefficace. Il souffre d\'un phénomène appelé *thrashing*, où il explore de manière répétée des branches de l\'arbre de recherche qui échouent pour la même raison. L\'efficacité de la résolution de CSP repose sur des techniques qui permettent d\'élaguer l\'arbre de recherche plus intelligemment, en anticipant les échecs. Ces techniques se répartissent en deux catégories : les heuristiques pour guider la recherche et l\'inférence pour propager les contraintes.

#### Heuristiques d\'ordonnancement

L\'ordre dans lequel les variables sont choisies et les valeurs sont testées a un impact considérable sur la taille de l\'arbre de recherche exploré.

> **Minimum Remaining Values (MRV) :** Cette heuristique, également appelée \"variable la plus contrainte\" ou \"fail-first\", consiste à choisir la prochaine variable à assigner comme étant celle qui a le plus petit nombre de valeurs légales restantes dans son domaine. L\'intuition est que si une variable est difficile à satisfaire, il vaut mieux le savoir le plus tôt possible pour couper la branche de recherche rapidement en cas d\'échec.
>
> **Degree Heuristic :** En cas d\'égalité avec l\'heuristique MRV, la *degree heuristic* peut être utilisée pour départager. Elle consiste à choisir la variable qui est impliquée dans le plus grand nombre de contraintes avec d\'autres variables non encore assignées. Cela permet de réduire le facteur de branchement pour les choix futurs.
>
> **Least Constraining Value (LCV) :** Une fois qu\'une variable a été sélectionnée, cette heuristique suggère d\'essayer les valeurs de son domaine dans un ordre qui laisse le plus de flexibilité possible pour les variables voisines. On choisit la valeur qui élimine le moins de choix pour les variables non assignées connectées par des contraintes. Cela augmente les chances de trouver une solution sans avoir à revenir en arrière.

#### Inférence par propagation de contraintes

L\'inférence, ou propagation de contraintes, consiste à utiliser les contraintes pour déduire des restrictions sur les domaines des variables non encore assignées.

> **Vérification anticipée (Forward Checking) :** C\'est une forme simple d\'inférence. Chaque fois qu\'une valeur est assignée à une variable X, l\'algorithme examine toutes les variables non assignées Y qui sont connectées à X par une contrainte. Pour chacune de ces variables Y, il supprime de son domaine DY toutes les valeurs qui sont inconsistantes avec la valeur choisie pour X. Si le domaine d\'une variable Y devient vide, l\'algorithme sait immédiatement que l\'assignation actuelle de X mène à un échec et peut donc revenir en arrière sans explorer plus loin.
>
> **Consistance d\'arc et l\'algorithme AC-3 :** La vérification anticipée ne détecte pas toutes les inconsistances. Une forme d\'inférence plus puissante est la **consistance d\'arc**. Un arc (Xi,Xj) dans le graphe de contraintes est dit consistant si, pour chaque valeur x dans le domaine de Xi, il existe au moins une valeur y dans le domaine de Xj telle que l\'assignation (Xi=x,Xj=y) est autorisée par la contrainte.
> L\'**algorithme AC-3** est la méthode la plus courante pour appliquer la consistance d\'arc à un CSP. Il fonctionne comme suit :

Initialiser une file avec tous les arcs du graphe de contraintes.

Tant que la file n\'est pas vide, retirer un arc (Xi,Xj).

Pour chaque valeur x dans le domaine de Xi, vérifier s\'il existe une valeur compatible y dans le domaine de Xj.

Si aucune valeur compatible n\'est trouvée pour x, supprimer x du domaine de Xi.

Si le domaine de Xi a été modifié, ajouter à la file tous les arcs (Xk,Xi) où Xk est un voisin de Xi.

L\'algorithme se termine lorsque la file est vide. Si, à un moment donné, un domaine devient vide, cela signifie que le CSP n\'a pas de solution.

La véritable puissance des solveurs de CSP modernes ne réside ni dans la recherche seule, ni dans l\'inférence seule, mais dans leur **interaction synergique**. L\'approche la plus efficace consiste à **entrelacer** la recherche et l\'inférence. L\'algorithme de backtracking, guidé par des heuristiques comme MRV, fait un choix d\'assignation. Immédiatement après, un algorithme d\'inférence (comme la vérification anticipée ou même AC-3) propage les conséquences de ce choix, en élaguant les domaines des futures variables. Le problème, ainsi simplifié, est ensuite passé à l\'appel récursif suivant de la recherche. Cela crée une boucle de rétroaction puissante : la recherche fait une hypothèse, l\'inférence élague l\'espace des possibilités en fonction de cette hypothèse, ce qui conduit à un espace de recherche plus petit et plus simple pour l\'hypothèse suivante. Cette synergie, bien plus efficace que l\'une ou l\'autre technique appliquée isolément, est la pierre angulaire de la résolution de contraintes moderne.

### Conclusion du Chapitre

Ce chapitre a jeté les bases de l\'intelligence artificielle en tant que discipline scientifique. Partant de ses origines historiques à Dartmouth et des débats philosophiques fondateurs sur la nature de la pensée, nous avons établi le paradigme de l\'agent intelligent comme un cadre conceptuel robuste. C\'est à travers la lentille de l\'agent à base de but que nous avons entrepris une exploration rigoureuse et systématique de la résolution de problèmes par la recherche.

Nous avons vu que la formalisation d\'un problème en termes d\'espace d\'états, d\'actions et de buts permet d\'appliquer une panoplie d\'algorithmes de recherche. Les stratégies non informées comme BFS et DFS illustrent un compromis fondamental entre optimalité et efficacité des ressources, un dilemme qui motive la quête de méthodes plus intelligentes. L\'introduction des fonctions heuristiques avec l\'algorithme A\* a démontré comment une connaissance, même approximative, du problème peut guider la recherche de manière spectaculaire, avec la garantie d\'optimalité sous la condition d\'admissibilité.

Nous avons ensuite élargi notre perspective au-delà des problèmes de recherche de chemin classiques. Les techniques de recherche locale, telles que le recuit simulé et les algorithmes génétiques, ont offert une approche efficace pour les problèmes d\'optimisation où seule la qualité de la solution finale importe. La recherche adversariale, avec les algorithmes Minimax et l\'élagage Alpha-Bêta, a fourni les outils pour raisonner stratégiquement dans des environnements compétitifs. Enfin, les problèmes de satisfaction de contraintes ont présenté un formalisme structuré pour une vaste classe de problèmes d\'assignation, où la synergie entre la recherche par retour sur trace, les heuristiques intelligentes et l\'inférence par propagation de contraintes se révèle être la clé de l\'efficacité.

Les concepts et algorithmes présentés dans ce chapitre --- de la formalisation d\'un problème à l\'analyse des propriétés des algorithmes de recherche --- constituent le socle de l\'IA classique. Ils sont non seulement des outils puissants en eux-mêmes, mais aussi les fondations sur lesquelles reposent des domaines plus avancés de l\'IA, tels que la planification automatisée, l\'apprentissage par renforcement et la représentation des connaissances, qui seront explorés dans les chapitres suivants.

---

### Références croisées

- **IA comme moteur d'interoperabilite** : voir aussi [Chapitre I.11 -- L'IA comme Moteur de l'Interoperabilite](../../III - Entreprise Agentique/Volume_I_Fondations_Entreprise_Agentique/Chapitre_I.11_IA_Moteur_Interoperabilite.md)
- **Ere de l'IA agentique** : voir aussi [Chapitre I.13 -- L'Ere de l'IA Agentique](../../III - Entreprise Agentique/Volume_I_Fondations_Entreprise_Agentique/Chapitre_I.13_Ere_IA_Agentique_Modele_Travailleur_Numerique.md)
- **Google Cloud Vertex AI** : voir aussi [Chapitre II.6 -- Google Cloud Vertex AI](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.6_Google_Cloud_Vertex_AI.md)
