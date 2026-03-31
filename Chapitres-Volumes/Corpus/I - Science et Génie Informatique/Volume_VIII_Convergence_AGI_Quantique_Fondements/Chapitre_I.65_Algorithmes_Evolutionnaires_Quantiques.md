# Chapitre I.65 : Algorithmes Évolutionnaires Améliorés par l'Informatique Quantique pour l'AGI

## 65.1 Introduction : L\'Évolution Darwinienne à l\'Ère Quantique

L\'intersection de la biologie évolutionnaire, de l\'informatique et de la physique quantique constitue l\'une des frontières les plus stimulantes de la science contemporaine. Chacun de ces domaines explore, à sa manière, les principes fondamentaux de l\'information, de la complexité et de l\'optimisation. Le calcul évolutionnaire, en s\'inspirant des mécanismes de la sélection naturelle, a fourni un cadre robuste pour résoudre des problèmes d\'une complexité redoutable. Parallèlement, l\'informatique quantique, en exploitant les lois contre-intuitives du monde subatomique, promet une révolution de la puissance de calcul. Ce chapitre se situe à la confluence de ces deux puissants paradigmes. Il explore comment les principes de l\'informatique quantique peuvent non seulement accélérer, mais aussi fondamentalement réinventer les processus de l\'évolution computationnelle, ouvrant ainsi des perspectives inédites pour la réalisation de l\'un des objectifs les plus ambitieux de l\'intelligence artificielle : l\'intelligence artificielle générale (IAG).

### 65.1.1 Le calcul évolutionnaire : Une métaheuristique d\'optimisation robuste et sans gradient

Le calcul évolutionnaire (CE) appartient à une vaste classe d\'algorithmes d\'optimisation connus sous le nom de métaheuristiques. Ces méthodes se distinguent par leur approche de haut niveau pour guider une recherche de solutions, faisant peu ou pas d\'hypothèses sur la nature du problème à résoudre. Elles sont souvent inspirées par des processus observés dans la nature, tels que le comportement des colonies de fourmis, le vol des essaims d\'oiseaux, ou le refroidissement des métaux dans le recuit simulé. Au cœur de cette famille, les algorithmes évolutionnaires (AE) s\'inspirent directement de la théorie de l\'évolution par sélection naturelle de Charles Darwin, un processus d\'optimisation naturel qui a façonné la complexité de la vie sur Terre pendant des milliards d\'années.

La caractéristique la plus déterminante des AE, et des métaheuristiques en général, est leur nature d\'optimiseurs « sans gradient » (*gradient-free*) ou « boîte noire » (*black-box*). Contrairement aux méthodes d\'optimisation classiques, telles que la descente de gradient, qui requièrent une connaissance analytique de la fonction objectif et de ses dérivées pour naviguer dans l\'espace des solutions, les AE n\'exigent qu\'une seule information : la capacité d\'évaluer la qualité, ou « fitness », d\'une solution candidate. Cette indépendance vis-à-vis du gradient leur confère une robustesse et une applicabilité exceptionnelles face à une large gamme de problèmes d\'optimisation difficiles, notamment ceux dont le paysage de fitness est :

- **Non différentiable ou discontinu :** De nombreux problèmes du monde réel, en particulier en optimisation combinatoire (comme le problème du voyageur de commerce ou la planification), ne possèdent pas de dérivées bien définies.
- **Multimodal :** Le paysage est parsemé de multiples optima locaux, des « pics » de bonne performance qui ne sont pas la meilleure solution globale. Les méthodes basées sur le gradient sont notoirement susceptibles de rester piégées dans le premier optimum local qu\'elles rencontrent. Les AE, en maintenant une population de solutions diverses, sont intrinsèquement mieux équipés pour explorer plusieurs régions du paysage simultanément et ainsi augmenter les chances de découvrir l\'optimum global.
- **Bruité ou stochastique :** Lorsque l\'évaluation de la fitness est sujette à une incertitude ou à un bruit, le calcul d\'un gradient fiable devient problématique. La nature stochastique et basée sur une population des AE leur confère une certaine résilience à ce type de bruit.
- **De grande dimension :** Dans les espaces de recherche à très haute dimension, les méthodes basées sur le gradient peuvent devenir inefficaces. Les AE, bien que également confrontés à la « malédiction de la dimensionnalité », possèdent des mécanismes d\'exploration (comme le croisement et la mutation) conçus pour naviguer dans ces vastes espaces.

En résumé, les algorithmes évolutionnaires constituent une métaheuristique d\'optimisation puissante, flexible et robuste, particulièrement adaptée aux scénarios où les informations sur la structure du problème sont limitées ou inexistantes. C\'est précisément cette capacité à opérer sans gradient qui les rend pertinents pour les défis émergents de l\'optimisation dans le domaine quantique.

### 65.1.2 Transition du Chapitre 3 : Le besoin d\'alternatives aux méthodes basées sur le gradient pour l\'optimisation des paysages quantiques complexes (ex: plateaux stériles)

Le chapitre précédent a exploré en détail les algorithmes quantiques variationnels (VQA), qui représentent l\'une des approches les plus prometteuses pour exploiter la puissance des ordinateurs quantiques de l\'ère NISQ (*Noisy Intermediate-Scale Quantum*). Ces algorithmes hybrides utilisent un ordinateur quantique pour préparer un état paramétré (un *ansatz*) et évaluer une fonction de coût (souvent l\'énergie d\'un système), tandis qu\'un optimiseur classique ajuste les paramètres du circuit pour minimiser cette fonction de coût. La grande majorité de ces optimiseurs classiques reposent sur des techniques de descente de gradient.

Cependant, cette approche se heurte à un obstacle fondamental et redoutable : le phénomène des **plateaux stériles** (*barren plateaus*). Un plateau stérile est une région du paysage des paramètres d\'un circuit quantique où les gradients de la fonction de coût s\'annulent de manière exponentielle avec le nombre de qubits. En d\'autres termes, à mesure que la taille du problème augmente, le paysage de fitness devient presque entièrement plat, dépourvu de toute information directionnelle qui pourrait guider un optimiseur basé sur le gradient. L\'optimiseur se retrouve alors « perdu » dans une vaste plaine sans pente, incapable de déterminer dans quelle direction se déplacer pour améliorer la solution.

Ce problème n\'est pas une simple difficulté technique, mais une limitation intrinsèque de nombreuses architectures de VQA, en particulier celles qui utilisent des *ansätze* profonds ou globaux. Il a été démontré que l\'intrication excessive et le bruit matériel exacerbent ce phénomène, rendant l\'entraînement des VQA pour des problèmes d\'une taille pertinente pratiquement impossible avec les méthodes de gradient standard. La communauté scientifique a reconnu que la compréhension et la mitigation des plateaux stériles sont des clés essentielles pour débloquer le potentiel de l\'apprentissage automatique quantique.

Face à cette impasse, le besoin d\'alternatives aux méthodes basées sur le gradient n\'est plus une simple question de préférence algorithmique, mais une nécessité stratégique. Si les gradients sont exponentiellement nuls, alors les algorithmes qui ne dépendent pas des gradients pour leur navigation deviennent des candidats de premier plan. C\'est ici que les algorithmes évolutionnaires, en tant qu\'optimiseurs sans gradient par excellence, entrent en scène. Des recherches récentes ont commencé à explorer cette voie, suggérant que les algorithmes génétiques pourraient non seulement naviguer sur ces paysages plats, mais aussi potentiellement les « remodeler » pour les rendre plus propices à l\'optimisation. Ce chapitre se propose donc de répondre à ce besoin critique en examinant en profondeur comment le calcul évolutionnaire peut surmonter les limitations des optimiseurs classiques dans le contexte quantique.

### 65.1.3 Thèse centrale : L\'informatique quantique ne se contente pas d\'accélérer l\'évolution ; elle réinvente ses mécanismes fondamentaux de diversité, de variation et de sélection

L\'union du calcul évolutionnaire et de l\'informatique quantique pourrait être envisagée sous un angle purement pragmatique : utiliser un ordinateur quantique pour accélérer une partie coûteuse d\'un algorithme évolutionnaire classique, comme l\'évaluation de la fonction de fitness. Bien que cette approche hybride soit pertinente et sera discutée, elle ne capture qu\'une fraction du potentiel de cette synergie.

La thèse centrale de ce chapitre est bien plus profonde : l\'informatique quantique ne se contente pas d\'accélérer l\'évolution ; elle offre les outils pour réinventer ses mécanismes les plus fondamentaux. Les principes de superposition, d\'intrication et d\'interférence ne sont pas de simples accélérateurs, mais de nouveaux ingrédients qui transforment la nature même du processus évolutionnaire.

1. **La Diversité Réinventée par la Superposition :** Dans un AE classique, la diversité est maintenue par une population de centaines ou de milliers d\'individus distincts, chacun représentant une solution candidate. L\'informatique quantique transcende cette notion. Grâce au principe de superposition, un unique registre de n qubits peut exister simultanément dans une combinaison linéaire de ses 2n états de base. Un seul « chromosome à qubits » peut donc encoder une diversité exponentielle de solutions, représentant une population entière de manière compacte et intrinsèquement parallèle. La population n\'est plus une collection d\'entités discrètes, mais un champ de probabilités unifié.
2. **La Variation Réinventée par les Opérateurs Quantiques :** Les opérateurs classiques de mutation (un basculement de bit aléatoire) et de croisement (un échange de segments de code) sont des outils puissants mais relativement grossiers. La mécanique quantique offre des mécanismes de variation plus subtils et contrôlés. La **mutation quantique** peut être implémentée par des portes de rotation, qui modifient de manière continue les amplitudes de probabilité d\'un qubit, permettant un réglage fin plutôt qu\'un changement binaire abrupt. Le**croisement quantique**, mis en œuvre par des portes à deux qubits, ne se contente pas d\'échanger de l\'information ; il crée et manipule l\'intrication, tissant des corrélations complexes et non locales entre les gènes d\'une manière qui n\'a pas d\'équivalent classique.
3. **La Sélection Réinventée par l\'Interférence :** La sélection naturelle classique opère en éliminant les individus les moins adaptés. Le mécanisme quantique analogue est l\'**interférence**. En concevant l\'évolution comme un processus ondulatoire, les chemins algorithmiques menant à des solutions de faible fitness peuvent être amenés à interférer de manière destructive, s\'annulant mutuellement. Simultanément, les chemins menant à des solutions de haute fitness peuvent interférer de manière constructive, amplifiant leur probabilité d\'être observées. Ce n\'est plus une sélection par élimination, mais une convergence par amplification constructive, un principe au cœur d\'algorithmes quantiques puissants comme celui de Grover.

Ce chapitre défendra l\'idée que les algorithmes évolutionnaires améliorés par l\'informatique quantique (QEEA) ne sont pas une simple hybridation de deux technologies, mais un nouveau paradigme d\'optimisation. Ils promettent non seulement de résoudre les problèmes qui bloquent les VQA, mais aussi d\'explorer des espaces de solutions d\'une manière fondamentalement nouvelle, avec des implications directes pour les défis de créativité, d\'apprentissage structurel et d\'optimisation à grande échelle posés par la quête de l\'IAG.

### 65.1.4 Aperçu de la structure du chapitre

Ce chapitre est structuré en cinq parties distinctes, conçues pour guider le lecteur depuis les fondements du calcul évolutionnaire classique jusqu\'aux frontières de la recherche sur les QEEA et leur application à l\'IAG.

- **Partie I : Rappels Fondamentaux sur le Calcul Évolutionnaire Classique.** Cette première partie établit les bases nécessaires à la compréhension du sujet. Elle présente l\'anatomie d\'un algorithme évolutionnaire typique, de la représentation des individus à la fonction de fitness, en passant par les opérateurs de sélection et de variation. Elle dresse également un panorama des principales familles d\'AE et identifie leurs limites intrinsèques, préparant ainsi le terrain pour l\'introduction des solutions quantiques.
- **Partie II : L\'Intégration des Principes Quantiques dans le Processus Évolutionnaire.** Le cœur conceptuel du chapitre se trouve ici. Cette partie détaille comment les principes fondamentaux de la mécanique quantique --- superposition, intrication et interférence --- sont utilisés pour réinventer chaque composant du cycle évolutionnaire. Elle introduit le chromosome à qubits, les opérateurs de variation quantique, et fait une distinction cruciale entre les algorithmes véritablement quantiques et les algorithmes d\'inspiration quantique qui fonctionnent sur des machines classiques.
- **Partie III : Architectures et Algorithmes Spécifiques.** Passant de la théorie à la pratique, cette partie examine des architectures et des algorithmes concrets. Elle propose une étude approfondie de l\'Algorithme Génétique Quantique (QGA), le pionnier du domaine, et explore la Programmation Génétique Quantique (QGP) pour l\'évolution de programmes quantiques. Elle aborde également les architectures hybrides pragmatiques, conçues pour tirer parti des ordinateurs de l\'ère NISQ malgré leurs limitations.
- **Partie IV : Applications Stratégiques pour l\'Intelligence Artificielle Générale.** Cette partie établit le lien direct entre les capacités des QEEA et les exigences de l\'IAG. Elle explore des domaines d\'application clés tels que la neuroévolution quantique pour la conception de réseaux neuronaux quantiques, la résolution de problèmes d\'optimisation combinatoire à grande échelle essentiels à la planification et à la logique, et le potentiel des QEEA pour l\'apprentissage symbolique et la découverte scientifique automatisée.
- **Partie V : Défis, Limites et Vision à Long Terme.** Enfin, cette dernière partie adopte une perspective critique et prospective. Elle analyse les obstacles techniques et matériels à une implémentation efficace des QEEA, les positionne dans le paysage compétitif des autres méthodes d\'optimisation quantique, et conclut en synthétisant leur rôle en tant que paradigme d\'optimisation puissant. Elle se termine par une vision à long terme de leur potentiel à l\'ère de l\'informatique quantique tolérante aux pannes, assurant la transition vers le chapitre suivant de cette monographie.

## Partie I : Rappels Fondamentaux sur le Calcul Évolutionnaire Classique

Avant de nous aventurer dans le domaine quantique, il est impératif de consolider notre compréhension des fondements classiques sur lesquels les QEEA sont construits. Cette première partie est dédiée à une dissection rigoureuse des algorithmes évolutionnaires (AE) conventionnels. Nous examinerons leurs origines intellectuelles, leur structure algorithmique, la diversité de leurs implémentations et les défis inhérents qui motivent la recherche d\'alternatives plus puissantes. Cette base solide nous permettra non seulement d\'apprécier la nouveauté des approches quantiques, mais aussi de mesurer précisément en quoi elles constituent une rupture paradigmatique plutôt qu\'une simple amélioration incrémentale.

### 65.2 Les Principes et l\'Anatomie des Algorithmes Évolutionnaires (AE)

Les algorithmes évolutionnaires sont une famille de techniques d\'optimisation stochastique qui simulent le processus de l\'évolution naturelle. Ils opèrent sur une population de solutions candidates, les soumettant à des processus itératifs de sélection, de variation et de reproduction, dans l\'espoir de faire converger la population vers des solutions de plus en plus performantes. Leur conception est un exemple remarquable de bio-inspiration, où les mécanismes qui ont engendré la complexité et l\'adaptation dans le monde biologique sont transposés en une puissante méthodologie de résolution de problèmes.

#### 65.2.1 L\'inspiration : La théorie de l\'évolution de Darwin et la génétique de Mendel

Les fondements intellectuels des algorithmes évolutionnaires reposent sur la synthèse de deux piliers de la biologie moderne : la théorie de l\'évolution de Charles Darwin et les lois de l\'hérédité de Gregor Mendel.

Dans son ouvrage fondateur, *De l\'origine des espèces* (1859), Darwin a postulé que l\'évolution des espèces est le résultat de la **sélection naturelle**. Ce processus repose sur plusieurs observations clés :

1. **Variation :** Les individus au sein d\'une population présentent des variations dans leurs traits.
2. **Hérédité :** Ces traits sont, dans une certaine mesure, héritables et transmis à la descendance.
3. **Compétition :** Les ressources étant limitées, il existe une « lutte pour l\'existence » où tous les individus ne peuvent survivre et se reproduire.
4. **Adaptation différentielle :** Les individus dont les traits héritables sont mieux adaptés à leur environnement (*the fittest*) ont une plus grande probabilité de survivre et de se reproduire, transmettant ainsi ces traits favorables à la génération suivante.

Ce processus itératif, sur de longues périodes, conduit à l\'adaptation des populations à leur environnement et à l\'émergence de nouvelles espèces. Darwin a fourni le \"moteur\" de l\'évolution, mais il ignorait les mécanismes précis de la variation et de l\'hérédité.

C\'est Gregor Mendel qui, à travers ses expériences sur les pois publiées en 1866, a jeté les bases de la **génétique**. Il a postulé l\'existence d\'« unités héritables » discrètes, que nous appelons aujourd\'hui des gènes. Ses lois ont expliqué comment ces traits sont transmis et recombinés d\'une génération à l\'autre, fournissant ainsi le substrat sur lequel la sélection naturelle peut agir. La génétique moderne a ensuite identifié les **mutations** (changements aléatoires dans le matériel génétique) et la **recombinaison** (mélange des gènes des parents lors de la reproduction sexuée) comme les sources primaires de la variation génétique.

La synthèse de ces deux théories, connue sous le nom de synthèse néo-darwinienne, forme le cadre conceptuel des AE. Un AE modélise une population de solutions candidates (les *individus*), dont chacune est encodée par un *chromosome*. Une fonction de *fitness* évalue l\'aptitude de chaque solution par rapport au problème à résoudre (l\'*environnement*). Le processus itératif de l\'AE mime la sélection naturelle en favorisant la reproduction des individus les plus performants. Les opérateurs de *croisement* (recombinaison) et de *mutation* sont appliqués pour créer de nouvelles solutions (la *descendance*), introduisant ainsi de la variation dans la population. De génération en génération, la population évolue vers des solutions de meilleure qualité.

#### 65.2.2 Le cycle de vie d\'un AE

Un algorithme évolutionnaire, quelle que soit sa variante spécifique, suit un cycle de vie itératif bien défini. Ce cycle, illustré dans de nombreuses études, peut être décomposé en une séquence d\'étapes fondamentales qui manipulent une population de solutions.

##### 65.2.2.1 Représentation des individus (génotype vs phénotype)

La première étape, et sans doute la plus cruciale dans la conception d\'un AE, est de définir comment une solution potentielle au problème est représentée. Cette représentation est formalisée par la distinction entre le génotype et le phénotype.

- **Le Génotype :** C\'est l\'encodage de la solution au sein de l\'algorithme. Il s\'agit de la structure de données que les opérateurs évolutionnaires (sélection, croisement, mutation) manipulent directement. Le génotype est souvent appelé le \"chromosome\" de l\'individu. Les représentations génotypiques les plus courantes incluent :

  - **Chaînes de bits :** La représentation la plus classique, où la solution est encodée comme une séquence de 0 et de 1. C\'est la forme canonique utilisée dans les premiers algorithmes génétiques.
  - **Vecteurs de nombres réels :** Pour les problèmes d\'optimisation en variables continues, chaque gène du chromosome est un nombre à virgule flottante.
  - **Permutations :** Pour les problèmes d\'ordonnancement ou de routage (comme le TSP), le chromosome est une permutation d\'un ensemble d\'éléments (par exemple, l\'ordre de visite des villes).
  - **Arbres ou graphes :** En programmation génétique, le génotype est une structure arborescente représentant un programme ou une expression mathématique.
- **Le Phénotype :** C\'est l\'expression de la solution dans l\'espace du problème lui-même. Il s\'agit de la solution décodée, telle qu\'elle peut être évaluée ou appliquée au problème concret. Par exemple, un génotype binaire peut être décodé en un ensemble de paramètres pour un réseau de neurones (le phénotype), qui est ensuite évalué sur une tâche de classification.

La relation entre le génotype et le phénotype est définie par une **fonction de mappage** (ou de décodage). Le choix de la représentation est fondamental car il définit l\'espace de recherche que l\'AE va explorer et influence fortement l\'efficacité des opérateurs de variation. Un bon encodage fait en sorte que de petites modifications dans le génotype correspondent à de petites modifications dans le phénotype (localité), et que les blocs de construction de bonnes solutions (schémas) sont compacts dans le génotype.

##### 65.2.2.2 Fonction d\'évaluation (paysage de fitness)

La fonction d\'évaluation, ou fonction de fitness, est le pont entre l\'algorithme évolutionnaire et le problème à résoudre. Elle attribue un score numérique à chaque individu de la population, quantifiant sa qualité ou son aptitude à résoudre le problème.

Formellement, si S est l\'espace des phénotypes possibles, la fonction de fitness f est une application f:S→R. Cette fonction est le seul retour d\'information que l\'environnement fournit à l\'algorithme. L\'objectif de l\'AE est de trouver un individu s∗∈S tel que f(s∗) soit maximisé (ou minimisé).

L\'ensemble de toutes les solutions possibles et de leurs valeurs de fitness correspondantes forme ce que l\'on appelle le **paysage de fitness** (*fitness landscape*). C\'est une métaphore géographique où l\'espace des solutions est représenté par un plan et le fitness par l\'altitude. L\'AE peut alors être vu comme une population d\'explorateurs cherchant le plus haut sommet (l\'optimum global) sur ce paysage. La topographie de ce paysage (sa rugosité, le nombre de pics locaux, la présence de vastes plateaux) détermine la difficulté du problème d\'optimisation.

##### 65.2.2.3 Initialisation de la population

Le processus évolutionnaire commence par la création d\'une population initiale d\'individus, P(0). La taille de la population,

N, est un paramètre crucial qui influence l\'équilibre entre l\'exploration de l\'espace de recherche et la vitesse de convergence.

La méthode d\'initialisation la plus courante est la génération aléatoire, où les génotypes des N individus sont créés en tirant au hasard des valeurs pour chaque gène à partir d\'une distribution uniforme. Cette approche vise à couvrir l\'espace de recherche de la manière la plus large et la moins biaisée possible au départ.30

Dans certains cas, si des connaissances a priori sur le problème sont disponibles, la population peut être \"ensemencée\" (seeded) avec des solutions connues ou des heuristiques pour démarrer la recherche dans des régions prometteuses de l\'espace des solutions.37

##### 65.2.2.4 Opérateurs de sélection

Une fois la population initiale évaluée, l\'étape de sélection détermine quels individus seront choisis comme parents pour créer la génération suivante. Le principe fondamental est de donner une plus grande probabilité de reproduction aux individus ayant un meilleur fitness, imitant ainsi la sélection naturelle. La force avec laquelle cette préférence est appliquée est appelée la **pression sélective**. Une pression sélective élevée accélère la convergence mais augmente le risque de convergence prématurée vers un optimum local, tandis qu\'une pression faible maintient la diversité mais peut ralentir la recherche.

Plusieurs mécanismes de sélection sont couramment utilisés  :

- **Sélection par roulette (Fitness Proportionate Selection) :** Chaque individu se voit attribuer une part d\'une \"roulette\" proportionnelle à son fitness. La probabilité pi de sélectionner l\'individu i est donnée par pi=fi/∑j=1Nfj, où fi est le fitness de l\'individu i et N est la taille de la population. La roulette est \"tournée\"N fois pour constituer la population de parents. Cette méthode est simple mais peut souffrir de problèmes d\'échelle si quelques individus ont un fitness très supérieur aux autres, ce qui peut conduire à une perte rapide de diversité.
- **Sélection par tournoi :** C\'est l\'une des méthodes les plus populaires et robustes. Pour sélectionner un parent, k individus (où k est la *taille du tournoi*, typiquement 2 ou 3) sont choisis au hasard dans la population. Le meilleur de ces k individus (celui avec la plus haute fitness) est alors sélectionné comme parent. Ce processus est répétéN fois. La taille du tournoi k permet de contrôler directement la pression sélective : un k plus grand augmente la pression.
- **Sélection par rang :** Pour éviter les problèmes d\'échelle de la sélection par roulette, cette méthode ne se base pas sur la valeur de fitness absolue mais sur le rang de l\'individu dans la population triée. Les individus sont classés du meilleur au moins bon, et la probabilité de sélection est une fonction de leur rang (souvent linéaire ou exponentielle). Cela garantit une pression sélective plus constante tout au long de l\'évolution.
- **Sélection par troncature :** Une méthode simple et à haute pression sélective où seuls les T% meilleurs individus de la population sont sélectionnés pour devenir parents.

##### 65.2.2.5 Opérateurs de variation : croisement et mutation

Les opérateurs de variation sont le moteur de l\'exploration dans un AE. Ils créent de nouveaux génotypes (les enfants) à partir des parents sélectionnés. Il en existe deux types principaux : le croisement et la mutation.

- **Le Croisement (Crossover ou Recombinaison) :** Cet opérateur binaire (agissant sur deux parents) combine l\'information génétique de deux individus pour créer un ou deux enfants. L\'idée est que la combinaison de \"blocs de construction\" de bonnes solutions peut conduire à des solutions encore meilleures. Les types de croisement dépendent fortement de la représentation  :

  - **Croisement à un point :** Un point de coupure est choisi au hasard le long des chromosomes parents. Le premier enfant est créé en prenant la première partie du premier parent et la seconde partie du second parent. Le second enfant est créé inversement.
  - **Croisement à K points :** Généralisation du précédent, où K points de coupure sont choisis, et les segments entre les points sont échangés alternativement.
  - **Croisement uniforme :** Pour chaque gène, on tire au sort (par exemple, avec une probabilité de 50%) de quel parent l\'enfant héritera de ce gène. Cela permet un mélange plus fin du matériel génétique.
- **La Mutation :** Cet opérateur unaire (agissant sur un seul individu) introduit des changements petits et aléatoires dans le génotype. Son rôle principal est de maintenir la diversité génétique dans la population et d\'empêcher la convergence prématurée en permettant l\'exploration de nouvelles régions de l\'espace de recherche qui ne seraient pas accessibles par le seul croisement. Les types de mutation dépendent également de la représentation :

  - **Bit-flip (pour les chaînes binaires) :** Chaque bit du chromosome a une faible probabilité (le *taux de mutation*) d\'être inversé (0 devient 1, et 1 devient 0).
  - **Mutation gaussienne (pour les nombres réels) :** Une petite valeur tirée d\'une distribution gaussienne est ajoutée à un ou plusieurs gènes.
  - **Swap (pour les permutations) :** Deux gènes (villes) sont choisis au hasard dans le chromosome et leurs positions sont échangées.

Le croisement est généralement considéré comme un opérateur d\'**exploitation**, car il recombine des solutions existantes et prometteuses, tandis que la mutation est vue comme un opérateur d\'**exploration**, introduisant de la nouveauté. L\'équilibre entre ces deux forces est essentiel au succès de l\'algorithme.

##### 65.2.2.6 Stratégies de survie et élitisme

La dernière étape du cycle consiste à former la nouvelle population pour la génération suivante, P(t+1). Cette étape, parfois appelée remplacement, détermine quels individus survivront. Les stratégies courantes incluent :

- **Remplacement générationnel :** La nouvelle population est entièrement composée des enfants créés par croisement et mutation. Les parents de la génération précédente sont tous écartés.
- **Remplacement à l\'état stationnaire (Steady-State) :** À chaque itération, seuls un ou quelques enfants sont créés, et ils remplacent les individus les moins performants de la population parente.
- **Stratégies (μ,λ) et (μ+λ) :** Courantes dans les Stratégies d\'Évolution, μ parents génèrent λ enfants. Dans une stratégie (μ,λ) (avec λ\>μ), les μ meilleurs individus parmi les λ enfants forment la nouvelle génération. Dans une stratégie (μ+λ), les μ meilleurs sont choisis parmi l\'union des parents et des enfants.

Un mécanisme crucial souvent ajouté est l\'**élitisme**. Il consiste à garantir que le ou les meilleurs individus de la génération actuelle survivent et passent à la génération suivante, même s\'ils ne sont pas sélectionnés comme parents ou si leurs enfants sont moins performants. L\'élitisme assure que la meilleure solution trouvée jusqu\'à présent n\'est jamais perdue, garantissant ainsi une convergence monotone de la performance maximale de la population.

Ce cycle (évaluation, sélection, variation, survie) se répète jusqu\'à ce qu\'un critère d\'arrêt soit atteint, comme un nombre maximum de générations, une stagnation du meilleur fitness pendant un certain temps, ou l\'atteinte d\'une valeur de fitness satisfaisante.

#### 65.2.3 Panorama des principales familles d\'AE

Le terme \"algorithme évolutionnaire\" est un terme générique qui englobe plusieurs courants de recherche développés en grande partie indépendamment dans les années 1960 et 1970. Bien que leurs concepts aient largement convergé, il est utile de distinguer les quatre familles historiques, car leurs philosophies et leurs choix de conception continuent d\'influencer le domaine.

- **Algorithmes Génétiques (AG) :** Développés par John Holland aux États-Unis, les AG sont sans doute la famille la plus connue. Historiquement, ils se caractérisent par :

  - **Représentation :** L\'utilisation de chaînes de bits (codage binaire) comme génotype.
  - **Opérateur principal :** Un fort accent sur l\'opérateur de croisement comme principal moteur de la recherche, la mutation jouant un rôle secondaire pour maintenir la diversité.
  - **Sélection :** Souvent, une sélection proportionnelle à la fitness (type roulette).

    Le cadre théorique des AG, notamment le Théorème des Schémas, postule que les AG fonctionnent en propageant de manière exponentielle des \"blocs de construction\" de solutions de haute qualité (schémas courts et performants).36
- **Programmation Génétique (PG) :** Introduite par John Koza, la PG peut être vue comme une extension des AG où les individus ne sont pas des chaînes de données, mais des programmes informatiques.

  - **Représentation :** Les programmes sont généralement représentés sous forme d\'arbres syntaxiques (comme des expressions LISP), où les nœuds internes sont des fonctions et les feuilles sont des terminaux (variables ou constantes).
  - **Opérateurs :** Le croisement consiste à échanger des sous-arbres entre deux programmes parents. La mutation peut consister à remplacer un sous-arbre par un nouveau sous-arbre généré aléatoirement.
  - **Application :** La PG est utilisée pour des tâches de régression symbolique, de conception de circuits, ou pour faire évoluer des stratégies de contrôle, relevant le défi \"d\'apprendre à la machine à exécuter des tâches sans qu\'elle ait été explicitement programmée pour cela\".
- **Stratégies d\'Évolution (SE) :** Nées en Allemagne avec les travaux d\'Ingo Rechenberg et Hans-Paul Schwefel, les SE ont été initialement conçues pour l\'optimisation de paramètres en ingénierie.

  - **Représentation :** Elles privilégient le codage en nombres réels.
  - **Opérateur principal :** La mutation est l\'opérateur de variation dominant. La forme la plus courante est la mutation gaussienne, où un vecteur de bruit aléatoire est ajouté à l\'individu.
  - **Auto-adaptation :** Une caractéristique clé des SE modernes est l\'auto-adaptation des paramètres de la stratégie. Par exemple, l\'écart-type de la mutation gaussienne est lui-même encodé dans le chromosome et co-évolue avec la solution, permettant à l\'algorithme d\'apprendre dynamiquement la bonne échelle de variation.
  - **Sélection :** La sélection est typiquement déterministe et basée sur le rang, comme les stratégies (μ+λ) ou (μ,λ).
- **Programmation Évolutionnaire (PE) :** Développée par Lawrence J. Fogel aux États-Unis, la PE partage de nombreuses similitudes avec les SE, notamment l\'accent sur la mutation et la représentation phénotypique. La principale différence historique réside dans le mécanisme de sélection : la PE utilise classiquement une sélection par tournoi stochastique plutôt qu\'une sélection déterministe par rang.

**\**

**Table 4.1 : Comparaison des Principales Familles d\'Algorithmes Évolutionnaires Classiques**

---

  Caractéristique                        Algorithmes Génétiques (AG)             Programmation Génétique (PG)              Stratégies d\'Évolution (SE)     Programmation Évolutionnaire (PE)

  **Pionnier(s)**                        J. Holland                              J. Koza                                   I. Rechenberg, H.-P. Schwefel    L. J. Fogel

  **Représentation Typique**             Chaîne de bits                          Arbre syntaxique (programme)              Vecteur de nombres réels         Vecteur de nombres réels

  **Opérateur de Variation Principal**   Croisement                              Crossover d\'arbre                        Mutation (souvent gaussienne)    Mutation (souvent gaussienne)

  **Mécanisme de Sélection Typique**     Proportionnelle à la fitness, Tournoi   Tournoi                                   Déterministe : (μ+λ) ou (μ,λ)    Tournoi stochastique

  **Concept Clé**                        Théorème des Schémas                    Évolution de la structure et du contenu   Auto-adaptation des paramètres   Évolution au niveau phénotypique

---

Aujourd\'hui, les frontières entre ces familles sont devenues poreuses. Les AG modernes utilisent fréquemment des codages réels, et les SE peuvent inclure des formes de recombinaison. Cependant, cette taxonomie historique reste un guide précieux pour comprendre la diversité des approches au sein du calcul évolutionnaire.

#### 65.2.4 Limites des AE classiques face aux défis de l\'IAG

Malgré leur puissance et leur flexibilité, les algorithmes évolutionnaires classiques ne sont pas une panacée. Ils présentent des limitations inhérentes qui deviennent particulièrement critiques lorsqu\'on les confronte aux problèmes d\'une échelle et d\'une complexité associées à la recherche sur l\'intelligence artificielle générale (IAG). L\'IAG requiert des capacités d\'optimisation sur des espaces de recherche vastes et mal structurés, d\'apprentissage de structures complexes et de créativité computationnelle, des domaines où les AE classiques peuvent atteindre leurs limites.

1. **Convergence Prématurée :** C\'est sans doute le problème le plus connu des AE. La convergence prématurée se produit lorsque la population perd sa diversité génétique trop rapidement. Sous une pression sélective trop forte, un individu moyennement bon mais supérieur à ses contemporains peut rapidement dominer la population. Ses gènes se répandent, et la population entière converge vers un optimum local. Une fois que la diversité est perdue, les opérateurs de croisement ne font que recombiner du matériel génétique quasi identique, et la mutation, opérant à un faible taux, a peu de chances de permettre à la population de s\'échapper de ce pic local pour explorer d\'autres régions du paysage de fitness. Dans le contexte de l\'IAG, où les paysages de solutions sont probablement extrêmement multimodaux, la tendance à se satisfaire du \"suffisamment bon\" plutôt que de l\'optimal est un obstacle majeur.
2. **Stagnation :** La stagnation est un phénomène distinct de la convergence prématurée, bien que souvent confondu avec elle. Un algorithme stagne lorsque le fitness de la meilleure solution cesse de s\'améliorer pendant de nombreuses générations, même si une diversité génétique significative est encore présente dans la population. Cela indique que les opérateurs de variation (croisement et mutation) sont devenus inefficaces : ils ne parviennent plus à générer des descendants qui surpassent leurs parents à partir du matériel génétique disponible. La recherche se poursuit, mais sans progrès. Ce phénomène est particulièrement préoccupant pour les problèmes complexes où les améliorations requièrent des combinaisons de gènes précises et non linéaires (forte épistasie), que les opérateurs standards ont du mal à assembler. Il est important de noter que la convergence, au sens mathématique, n\'implique pas l\'optimalité. Un algorithme peut très bien converger vers un point non optimal, et la stagnation est une manifestation de cet échec.
3. **Coût de l\'Évaluation de la Fitness :** Le goulot d\'étranglement computationnel de la plupart des applications d\'AE est l\'évaluation de la fonction de fitness. Pour chaque individu de chaque génération, une évaluation doit être effectuée. Si cette évaluation implique une simulation complexe, l\'entraînement d\'un réseau de neurones, ou une expérience physique, le coût total peut devenir prohibitif. Les problèmes liés à l\'IAG, comme l\'optimisation d\'architectures de réseaux de neurones profonds ou la découverte de stratégies dans des environnements complexes, impliquent des évaluations de fitness extrêmement coûteuses. Les AE classiques, qui requièrent des milliers, voire des millions d\'évaluations, peuvent s\'avérer impraticables pour ces tâches.

Ces trois limites --- la tendance à se laisser piéger par des solutions sous-optimales, l\'incapacité à progresser même en présence de diversité, et le coût exorbitant de l\'exploration --- constituent une motivation puissante pour chercher à augmenter les algorithmes évolutionnaires. C\'est en s\'attaquant à ces faiblesses fondamentales que l\'informatique quantique promet de transformer le domaine.

## Partie II : L\'Intégration des Principes Quantiques dans le Processus Évolutionnaire

Après avoir établi les fondements et les limites du calcul évolutionnaire classique, nous abordons maintenant le cœur de ce chapitre : la fusion de ce paradigme avec les principes de la mécanique quantique. Cette intégration n\'est pas une simple adaptation, mais une refonte conceptuelle profonde. En remplaçant les bits par des qubits, les populations discrètes par des superpositions continues, et les opérateurs stochastiques par des transformations unitaires, nous entrons dans un nouveau régime d\'optimisation. Cette partie explorera comment les phénomènes quantiques de superposition, d\'intrication et d\'interférence permettent de réinventer les concepts de population, de variation et de sélection, jetant ainsi les bases des algorithmes évolutionnaires améliorés par l\'informatique quantique (QEEA). Nous ferons également une distinction essentielle entre les algorithmes qui nécessitent un matériel quantique et ceux, d\'inspiration quantique, qui peuvent être mis en œuvre sur des ordinateurs classiques.

### 65.3 Réinventer la Population : La Représentation Quantique

Le changement le plus fondamental introduit par l\'informatique quantique dans le calcul évolutionnaire réside dans la représentation même des individus et de la population. L\'unité d\'information classique, le bit, est remplacée par son analogue quantique, le qubit. Cette substitution a des conséquences profondes, transformant la nature discrète et finie d\'une population classique en un continuum de possibilités encodé dans un seul état quantique.

#### 65.3.1 Le chromosome à qubits : Représenter un individu par un état quantique

Dans un AE classique, un gène est typiquement une valeur discrète (par exemple, un bit 0 ou 1). Un chromosome est une collection de ces gènes. En revanche, dans un QEEA, l\'unité fondamentale d\'information génétique est le **qubit**.

Un qubit n\'est pas simplement un bit qui peut être 0 ou 1. C\'est un système quantique à deux niveaux dont l\'état, noté ∣ψ⟩ en notation de Dirac, peut-être une superposition linéaire de ses deux états de base, ∣0⟩ et ∣1⟩. Formellement, l\'état d\'un qubit s\'écrit : ∣ψ⟩=α∣0⟩+β∣1⟩, où α et β sont des nombres complexes appelés amplitudes de probabilité.21 Ces amplitudes ne sont pas arbitraires ; elles doivent satisfaire la condition de normalisation :

∣α∣2+∣β∣2=1

Cette condition a une interprétation physique directe : lors d\'une mesure du qubit dans la base {∣0⟩,∣1⟩}, la probabilité d\'obtenir le résultat 0 est de ∣α∣2, et la probabilité d\'obtenir le résultat 1 est de ∣β∣2.74

Un **chromosome à qubits** est alors défini comme un registre quantique composé de m qubits, représentant un individu avec m gènes. L\'état de ce chromosome est le produit tensoriel des états de ses qubits individuels : ∣Ψ⟩=∣ψ1⟩⊗∣ψ2⟩⊗⋯⊗∣ψm⟩. Chaque qubit ∣ψi⟩=αi∣0⟩+βi∣1⟩ représente un \"gène probabiliste\". Contrairement à un gène classique qui a une valeur fixe, un gène quantique contient l\'information sur la probabilité de prendre la valeur 0 ou 1 lors de la mesure. Cette représentation est intrinsèquement plus riche, car elle capture non seulement une valeur, mais une distribution de probabilité sur toutes les valeurs possibles. Un seul chromosome à qubits ne représente donc pas une unique solution, mais une superposition de toutes les solutions possibles qu\'il peut encoder.

#### 65.3.2 La population en superposition : Un registre quantique unique pour encoder une diversité exponentielle

L\'implication la plus spectaculaire de la représentation par qubits concerne la notion de population. Dans un AE classique, la diversité génétique est maintenue en stockant explicitement une population de N individus distincts. L\'informatique quantique offre une approche radicalement plus efficace.

Un registre de m qubits ne se limite pas à être dans un état produit de qubits individuels. Son état général est une superposition de tous les 2m états de base de son espace de Hilbert. Un état de chromosome quantique s\'écrit donc de la manière la plus générale : ∣Ψ⟩=i=0∑2m−1ci∣i⟩, où ∣i⟩ représente le i-ème état de la base de calcul (par exemple, ∣0⟩≡∣00...0⟩, ∣1⟩≡∣00...1⟩, etc.), et les ci sont les amplitudes de probabilité complexes satisfaisant ∑i=02m−1∣ci∣2=1.

Cette équation révèle une propriété extraordinaire : un unique registre quantique de m qubits peut encoder simultanément 2m solutions classiques distinctes, chacune pondérée par son amplitude de probabilité. Ce phénomène, souvent appelé **parallélisme quantique**, signifie qu\'un seul \"individu quantique\" peut représenter une population entière d\'une taille exponentielle. Par exemple, un registre de 20 qubits peut représenter une superposition de plus d\'un million de solutions classiques.

Cette capacité à représenter une diversité exponentielle dans un espace polynomial en ressources (le nombre de qubits) est un avantage conceptuel majeur sur les AE classiques. Elle offre une solution naturelle et puissante au problème de la convergence prématurée. Alors qu\'une population classique peut perdre sa diversité lorsque ses individus deviennent trop similaires, un état quantique en superposition uniforme (où tous les ∣ci∣2 sont égaux) représente la diversité maximale possible. Le processus évolutionnaire quantique peut être vu comme une manipulation de cette distribution de probabilités, la faisant évoluer d\'un état de diversité maximale vers un état où les amplitudes des solutions les plus performantes sont amplifiées.

#### 65.3.3 L\'intrication comme moyen de coder des corrélations complexes entre les gènes

La superposition n\'est pas le seul phénomène quantique qui enrichit la représentation. L\'**intrication** (*entanglement*) est une forme de corrélation purement quantique sans équivalent classique. Deux qubits (ou plus) sont dits intriqués si l\'état du système global ne peut pas être décrit comme une simple combinaison des états individuels de chaque qubit.

L\'exemple canonique est l\'état de Bell à deux qubits : ∣Φ+⟩=21(∣00⟩+∣11⟩)

Cet état ne peut pas être écrit sous la forme ∣ψ1⟩⊗∣ψ2⟩. Les deux qubits ont perdu leur individualité. Si l\'on mesure le premier qubit et que l\'on obtient 0, on sait instantanément que le second qubit donnera également 0, et vice versa, quelle que soit la distance qui les sépare.18 Leurs destins sont liés. Dans le contexte des chromosomes quantiques, l\'intrication offre un mécanisme puissant pour modéliser des dépendances complexes entre les gènes. En biologie génétique, ce phénomène de dépendance entre gènes est appelé **épistasie**. Dans les AE classiques, la gestion de l\'épistasie est un défi majeur. Les opérateurs de croisement, en échangeant des segments de chromosomes, risquent de briser des combinaisons de gènes (des \"blocs de construction\") qui sont performantes uniquement lorsqu\'elles sont présentes ensemble. L\'intrication permet de coder ces corrélations de manière native et robuste. En intriquant deux gènes (qubits) dans un chromosome, on établit une relation non locale entre eux. Les opérateurs quantiques (comme les portes à deux qubits) peuvent alors manipuler ces paires intriquées comme un tout, préservant et faisant évoluer ces corrélations complexes au fil des générations. Cela ouvre la voie à une exploration de l\'espace des solutions qui tient compte de la structure de dépendance du problème, une capacité qui fait largement défaut aux AE classiques et qui est essentielle pour résoudre des problèmes complexes où les variables sont fortement interdépendantes, une caractéristique attendue des défis liés à l\'IAG.

### 65.4 Opérateurs de Variation Quantique : Au-delà du Croisement et de la Mutation

Si la représentation quantique réinvente la population, les opérateurs quantiques réinventent la variation. Dans un ordinateur quantique, l\'évolution d\'un état est régie par l\'application de transformations unitaires, appelées **portes quantiques**. Ces portes sont les analogues quantiques des portes logiques classiques, mais avec une différence fondamentale : elles sont réversibles et opèrent sur des superpositions d\'états. En les utilisant comme opérateurs de variation, on remplace les mécanismes stochastiques et discrets de la mutation et du croisement classiques par des transformations continues et cohérentes qui exploitent la richesse de l\'espace de Hilbert.

#### 65.4.1 La mutation quantique : Les portes de rotation comme mécanisme de variation contrôlée et continue

La mutation dans un AG classique est une opération binaire et disruptive : un bit est inversé ou non. La **mutation quantique** offre un mécanisme beaucoup plus fin et contrôlé. Elle est typiquement implémentée à l\'aide de **portes de rotation** à un seul qubit.

Une porte de rotation fait pivoter le vecteur d\'état d\'un qubit sur la sphère de Bloch autour d\'un axe donné (X, Y ou Z) d\'un angle θ spécifié. Par exemple, la porte de rotation autour de l\'axe Y, notée Ry(θ), a la représentation matricielle suivante  : Ry(θ)=(cos(θ/2)sin(θ/2)−sin(θ/2)cos(θ/2)) Lorsqu\'elle est appliquée à un qubit dans l\'état ∣ψ⟩=α∣0⟩+β∣1⟩, elle le transforme en un nouvel état ∣ψ′⟩=α′∣0⟩+β′∣1⟩ où : (α′β′)=(cos(θ/2)sin(θ/2)−sin(θ/2)cos(θ/2))(αβ)

Cette transformation modifie de manière continue les amplitudes α et β en fonction de l\'angle θ. Contrairement à la mutation classique qui est un saut discret (de 0 à 1), la mutation quantique est un déplacement graduel sur la sphère de Bloch. L\'angle de rotation θ devient un paramètre de l\'algorithme qui peut être ajusté, voire auto-adapté, pour contrôler l\'amplitude de la variation. Un petit angle θ correspond à une mutation fine, explorant le voisinage immédiat de la solution, tandis qu\'un angle plus grand permet des sauts plus importants dans l\'espace de recherche.

Cette nature continue et contrôlée de la mutation quantique est un avantage conceptuel majeur. Elle permet un équilibre plus subtil entre l\'exploration et l\'exploitation, en autorisant des ajustements précis des probabilités des gènes plutôt que des changements aléatoires et binaires. Cela peut s\'avérer crucial pour l\'optimisation de paysages de fitness complexes et rugueux, où un réglage fin est nécessaire pour atteindre l\'optimum.

#### 65.4.2 Le croisement quantique : Conception de circuits à deux qubits pour l\'échange d\'information génétique

Le croisement classique échange des segments de code entre deux chromosomes parents. Son objectif est de combiner des blocs de construction performants. Le **croisement quantique** vise un objectif similaire, mais en utilisant des outils fondamentalement différents : les portes à deux qubits. Ces portes sont la source de l\'intrication et permettent de créer des corrélations complexes entre les gènes. Il n\'existe pas un seul opérateur de \"croisement quantique\", mais plutôt une famille de circuits qui peuvent être conçus pour remplir cette fonction. Un exemple simple et puissant est l\'utilisation de portes contrôlées, comme la porte **Controlled-NOT (CNOT)** ou des portes de **rotation contrôlée (par exemple, CRx(θ))**.

Une porte CNOT agit sur deux qubits : un qubit de contrôle et un qubit cible. Elle inverse l\'état du qubit cible si, et seulement si, le qubit de contrôle est dans l\'état ∣1⟩. Appliquée à des qubits en superposition, elle peut générer de l\'intrication. Un circuit de croisement quantique peut être conçu en appliquant une séquence de ces portes à deux qubits sélectionnés du chromosome. Par exemple, un analogue du croisement à un point pourrait être implémenté de la manière suivante :

1. On sélectionne deux chromosomes quantiques parents, ∣ΨA⟩ et ∣ΨB⟩.
2. On choisit un point de croisement k.
3. On utilise un qubit auxiliaire et une série de portes contrôlées (comme des portes de Fredkin ou des CNOT contrôlés) pour échanger les états des qubits d\'indice j\>k entre les deux chromosomes.

Cependant, une approche plus fondamentalement quantique ne cherche pas à imiter directement le croisement classique. Elle utilise plutôt les portes à deux qubits pour modifier la structure d\'intrication du chromosome. Par exemple, un opérateur de croisement pourrait appliquer une porte de rotation contrôlée entre deux gènes, conditionnant la variation de l\'un à l\'état de l\'autre. Cela n\'échange pas simplement de l\'information, mais crée une nouvelle relation de dépendance entre les gènes. Cette approche est beaucoup plus puissante car elle permet à l\'algorithme de faire évoluer non seulement les valeurs des gènes (via leurs probabilités), mais aussi les corrélations entre eux, adaptant ainsi la structure de la solution à la structure du problème.

#### 65.4.3 L\'interférence quantique comme moteur de la recherche : Amplification des solutions prometteuses

Le mécanisme le plus contre-intuitif et peut-être le plus puissant que l\'informatique quantique apporte à l\'évolution est l\'**interférence quantique**. Dans la physique classique des ondes, deux ondes peuvent s\'additionner (interférence constructive) ou s\'annuler (interférence destructive). Dans le monde quantique, ce sont les amplitudes de probabilité qui se comportent comme des ondes et peuvent interférer. Dans le contexte d\'un QEEA, l\'état du chromosome est une superposition de tous les états possibles, ∣Ψ⟩=∑ci∣i⟩. Chaque application d\'un opérateur de variation quantique (une transformation unitaire U) modifie toutes les amplitudes ci simultanément. L\'objectif est de concevoir l\'opérateur U de telle sorte qu\'il exploite l\'interférence pour guider la recherche.

Le principe est le suivant :

- **Interférence destructive :** Les amplitudes associées aux solutions de faible fitness (∣i⟩ avec un petit f(i)) sont manipulées de manière à s\'annuler entre elles. Leurs chemins de calcul interfèrent destructivement, réduisant leur probabilité d\'être mesurées.
- **Interférence constructive :** Inversement, les amplitudes associées aux solutions de haut fitness sont amenées à s\'additionner, s\'amplifiant mutuellement. Leurs chemins de calcul interfèrent constructivement, augmentant leur probabilité d\'être la solution finale.

Ce mécanisme remplace la sélection explicite des AE classiques. Au lieu de créer une population d\'enfants puis de supprimer les moins performants, l\'évolution quantique est un processus unitaire unique où les mauvaises solutions \"s\'effacent\" d\'elles-mêmes par interférence destructive, tandis que les bonnes solutions \"émergent\" par amplification constructive.

L\'exemple le plus célèbre de ce principe est l\'**amplification d\'amplitude**, qui est le cœur de l\'algorithme de recherche de Grover. L\'algorithme de Grover peut être interprété comme un processus itératif qui \"amplifie\" l\'amplitude de l\'état recherché tout en diminuant celle de tous les autres. Un QEEA peut intégrer un opérateur de type Grover dans son cycle. Après avoir identifié les solutions les plus prometteuses (par exemple, via une évaluation de fitness partielle), un opérateur d\'amplification peut être appliqué pour augmenter de manière ciblée les amplitudes de ces solutions, orientant ainsi la recherche de manière beaucoup plus efficace qu\'une simple sélection stochastique. L\'interférence n\'est donc pas seulement un opérateur de variation, mais un véritable moteur de recherche dirigée.

### 65.5 Algorithmes Évolutionnaires d\'Inspiration Quantique (QIEA) : Le Meilleur des Deux Mondes pour la Technologie Actuelle

Alors que les algorithmes évolutionnaires véritablement quantiques (QEEA) nécessitent un matériel quantique fonctionnel, une branche de recherche parallèle et très active a émergé : les **algorithmes évolutionnaires d\'inspiration quantique** (*Quantum-Inspired Evolutionary Algorithms*, ou QIEA). Ces algorithmes, bien qu\'utilisant le langage et les concepts de la mécanique quantique, sont conçus pour s\'exécuter entièrement sur des ordinateurs classiques. Ils représentent une approche pragmatique qui cherche à tirer parti de la puissance conceptuelle du formalisme quantique sans dépendre de la disponibilité d\'un matériel quantique, souvent inaccessible ou encore trop bruité.

#### 65.5.1 Définition et distinction : Des algorithmes classiques qui empruntent la mécanique quantique

Il est fondamental de bien distinguer les QEEA des QIEA.

- Un **QEEA** est un algorithme qui s\'exécute, au moins en partie, sur un processeur quantique. Il manipule de véritables qubits physiques et exploite des phénomènes quantiques réels comme la superposition, l\'intrication et l\'interférence pour son fonctionnement.
- Un **QIEA** est un algorithme purement classique. Il utilise les concepts de la mécanique quantique comme une **métaphore** pour concevoir de nouvelles stratégies de recherche. Il ne bénéficie ni du parallélisme quantique, ni de l\'intrication, ni de l\'interférence. Son avantage, s\'il existe, provient de la manière dont cette métaphore conduit à une meilleure gestion de la dynamique de recherche, notamment l\'équilibre entre l\'exploration et l\'exploitation.

Les QIEA peuvent être classés comme une sous-famille des Algorithmes à Estimation de Distribution (*Estimation of Distribution Algorithms*, EDA). Dans un EDA, au lieu de manipuler directement une population d\'individus, l\'algorithme maintient un modèle probabiliste de l\'espace des solutions. À chaque génération, de nouvelles solutions sont échantillonnées à partir de ce modèle, et les meilleures d\'entre elles sont utilisées pour mettre à jour le modèle. Dans un QIEA, ce modèle probabiliste est inspiré par l\'état d\'un registre de qubits.

#### 65.5.2 Le rôle central de la représentation probabiliste du chromosome à qubits

Le cœur d\'un QIEA est sa représentation des individus. Un \"chromosome à qubits\" dans un QIEA n\'est pas un état quantique, mais une structure de données classique qui le simule. Pour un chromosome de m gènes, il est représenté par un vecteur de m \"Q-bits\". Chaque Q-bit i est une paire de nombres réels ou complexes (αi,βi) qui respectent la condition de normalisation ∣αi∣2+∣βi∣2=1.

Cette paire ne représente pas une superposition physique, mais encode la **probabilité** que le gène i prenne la valeur 0 (∣αi∣2) ou la valeur 1 (∣βi∣2). Le chromosome entier est donc un modèle de probabilité factorisé, où chaque gène est traité indépendamment.

Le cycle de vie d\'un QIEA typique est le suivant  :

1. **Initialisation :** Un ou plusieurs chromosomes à Q-bits sont initialisés. Souvent, tous les αi et βi sont initialisés à 1/2, ce qui correspond à une probabilité de 50% pour chaque gène d\'être 0 ou 1, représentant une exploration uniforme de l\'espace de recherche.
2. **Génération de la population classique :** Une population de solutions classiques (chaînes de bits) est générée en \"observant\" le chromosome à Q-bits. Pour chaque gène i de chaque individu à créer, un nombre aléatoire \$r \\in \$ est généré. Si r\>∣αi∣2, le bit correspondant est mis à 1, sinon à 0. Ce processus est une forme d\'échantillonnage de Monte Carlo à partir de la distribution de probabilité encodée dans le chromosome à Q-bits.
3. **Évaluation :** La population classique est évaluée à l\'aide de la fonction de fitness, et le meilleur individu est identifié.
4. **Mise à jour du chromosome à Q-bits :** C\'est l\'étape clé. Les paires (αi,βi) du chromosome à Q-bits sont mises à jour pour se rapprocher de la structure du meilleur individu trouvé. C\'est ici que les \"portes quantiques\" sont simulées.

#### 65.5.3 L\'opérateur de porte de rotation quantique comme principal mécanisme de mise à jour

Le principal, et souvent le seul, opérateur de variation dans un QIEA est la simulation d\'une porte de rotation quantique. Après avoir identifié le meilleur individu classique de la génération, b=(b1,b2,...,bm), le chromosome à Q-bits est mis à jour en appliquant une transformation de rotation à chaque Q-bit (αi,βi).

La mise à jour se fait via une multiplication matricielle : (αi′βi′)=(cos(Δθi)sin(Δθi)−sin(Δθi)cos(Δθi))(αiβi)

L\'angle de rotation Δθi est choisi stratégiquement pour déplacer la probabilité dans la direction du meilleur bit bi. Par exemple, si le bit bi du meilleur individu est 1 et que la probabilité actuelle ∣βi∣2 est faible, l\'angle de rotation sera choisi pour augmenter βi (et diminuer αi). La magnitude et le signe de Δθi sont déterminés par une stratégie de rotation, souvent définie dans une table de consultation (look-up table) qui dépend de l\'état actuel (αi,βi) et du bit cible bi.73

Ce mécanisme de mise à jour permet un excellent équilibre entre l\'exploration et l\'exploitation  :

- **Exploitation :** En déplaçant systématiquement les probabilités vers celles du meilleur individu, l\'algorithme exploite l\'information acquise pour converger vers des régions prometteuses.
- **Exploration :** Tant que les probabilités ∣αi∣2 et ∣βi∣2 ne sont pas 0 ou 1, il y a toujours une chance de générer n\'importe quelle solution binaire. La nature probabiliste de la représentation maintient une diversité implicite, ce qui aide à éviter une convergence prématurée trop rapide, un problème courant dans les AG classiques.

#### 65.5.4 Analyse de la performance et des applications des QIEA sur des ordinateurs classiques

Depuis leur introduction, les QIEA ont été appliqués avec succès à une vaste gamme de problèmes d\'optimisation, démontrant souvent des performances supérieures à celles des algorithmes génétiques traditionnels, en particulier pour les problèmes d\'optimisation combinatoire. Des études comparatives sur des problèmes de référence comme le problème du sac à dos (*knapsack problem*) ont montré que les QIEA peuvent obtenir de meilleurs résultats avec une taille de population beaucoup plus petite que les AG classiques. Cette efficacité est attribuée à la capacité de la représentation probabiliste à maintenir une meilleure diversité et à équilibrer de manière plus robuste l\'exploration et l\'exploitation.

Les applications des QIEA sont nombreuses et variées  :

- **Optimisation combinatoire :** Problème du voyageur de commerce (TSP), problème du sac à dos, problèmes d\'ordonnancement.
- **Optimisation continue :** En adaptant la représentation pour encoder des variables réelles.
- **Apprentissage automatique :** Sélection de caractéristiques (*feature selection*), optimisation des hyperparamètres de modèles.
- **Ingénierie :** Optimisation de la répartition de puissance dans les réseaux électriques, conception de systèmes de contrôle.

En conclusion, les QIEA représentent une avancée significative dans le domaine des métaheuristiques. En empruntant le formalisme puissant de la mécanique quantique, ils ont abouti à une nouvelle classe d\'algorithmes d\'estimation de distribution qui se sont avérés robustes, efficaces et largement applicables, le tout sur du matériel informatique classique. La table suivante résume les distinctions fondamentales entre les approches purement quantiques et celles d\'inspiration quantique.

**Table 4.2 : Distinction entre Algorithmes Quantiques et d\'Inspiration Quantique**

---

  Caractéristique                       QEEA (sur matériel quantique)                     QIEA (sur matériel classique)

  **Support d\'Exécution**              Ordinateur quantique                              Ordinateur classique

  **Unité d\'Information de Base**      Qubit physique (état quantique)                   Paire de nombres (α,β) simulant un qubit

  **Représentation de la Population**   Superposition dans un registre quantique unique   Ensemble de chromosomes probabilistes

  **Opérateurs de Variation**           Portes quantiques unitaires (physiques)           Matrices de rotation (appliquées classiquement)

  **Phénomènes Exploités**              Superposition, Intrication, Interférence          Aucun (simulation probabiliste)

  **Source de l\'Avantage**             Parallélisme quantique, calcul cohérent           Meilleur équilibre exploration/exploitation

---

## Partie III : Architectures et Algorithmes Spécifiques

Après avoir exploré les fondements conceptuels de l\'intégration des principes quantiques dans le calcul évolutionnaire, cette troisième partie se concentre sur des architectures et des algorithmes concrets qui incarnent ces idées. Nous passerons de la théorie à l\'implémentation en examinant en détail les modèles les plus influents et les plus prometteurs du domaine. Nous commencerons par une analyse approfondie de l\'Algorithme Génétique Quantique (QGA), le premier et le plus célèbre des QIEA, pour comprendre sa dynamique et ses variantes. Ensuite, nous nous tournerons vers la Programmation Génétique Quantique (QGP), qui étend ces idées à l\'évolution de programmes quantiques, une tâche d\'une importance capitale pour la découverte de nouveaux algorithmes. Enfin, nous aborderons les architectures hybrides, des approches pragmatiques conçues pour tirer le meilleur parti des capacités limitées des ordinateurs quantiques de l\'ère NISQ, en combinant la robustesse des optimiseurs évolutionnaires classiques avec la puissance de calcul spécifique des circuits quantiques.

### 65.6 L\'Algorithme Génétique Quantique (QGA) : Une Étude Approfondie

L\'Algorithme Génétique Quantique (QGA), plus précisément l\'algorithme évolutionnaire d\'inspiration quantique (QIEA) introduit par Han et Kim, est l\'algorithme fondateur qui a lancé ce champ de recherche. Bien qu\'il s\'agisse d\'un algorithme classique, son utilisation novatrice d\'une représentation probabiliste inspirée des qubits a démontré une efficacité remarquable et a jeté les bases de nombreuses recherches ultérieures. Une compréhension approfondie de sa structure et de sa dynamique est essentielle pour saisir l\'essence des approches d\'inspiration quantique.

#### 65.6.1 Description détaillée du premier et plus célèbre QGA

Le QGA de Han et Kim est un algorithme évolutionnaire basé sur une population qui utilise la représentation par Q-bits et un opérateur de mise à jour basé sur une porte de rotation quantique. Il est conçu pour résoudre des problèmes d\'optimisation combinatoire, comme le problème du sac à dos, où il a initialement démontré sa supériorité par rapport aux algorithmes génétiques conventionnels.

Le pseudo-code de l\'algorithme peut être résumé comme suit  :

1. **Initialisation t = 0**

   - Initialiser le chromosome à Q-bits Q(t). Il s\'agit d\'une matrice où chaque colonne i représente un Q-bit avec ses amplitudes \[αi,βi\]T. Pour tous les m Q-bits, initialiser αi=βi=1/2. Cela correspond à une superposition uniforme, où chaque solution binaire a une probabilité égale d\'être générée.
   - Générer une population binaire initiale P(t) de n individus en \"observant\" (échantillonnant) Q(t). Pour chaque individu et chaque gène, un bit est généré selon les probabilités ∣αi∣2 et ∣βi∣2.
   - Évaluer la population binaire P(t) et identifier le meilleur individu b(t).
2. **Boucle Principale (tant que le critère d\'arrêt n\'est pas atteint)**

   - Incrémenter la génération : t=t+1.
   - Générer une nouvelle population binaire P(t) en observant l\'état du chromosome à Q-bits de la génération précédente, Q(t−1).
   - Évaluer la nouvelle population P(t).
   - Mettre à jour le meilleur individu global b(t) en comparant le meilleur individu de P(t) avec le meilleur individu des générations précédentes.
   - Mettre à jour le chromosome à Q-bits Q(t) en utilisant l\'opérateur de porte de rotation quantique. Pour chaque Q-bit i de Q(t−1), appliquer la transformation :
     \$\$ \\begin{pmatrix} \\alpha_i(t) \\ \\beta_i(t) \\end{pmatrix} = \\begin{pmatrix} \\cos(\\Delta\\theta_i) & -\\sin(\\Delta\\theta_i) \\ \\sin(\\Delta\\theta_i) & \\cos(\\Delta\\theta_i) \\end{pmatrix} \\begin{pmatrix} \\alpha_i(t-1) \\ \\beta_i(t-1) \\end{pmatrix} \$\$
     L\'angle de rotation Δθi est déterminé par une table de consultation qui compare le bit bi(t) du meilleur individu actuel avec l\'état du Q-bit, afin de faire converger les probabilités vers la meilleure solution connue.
3. **Fin de la boucle**

   - Retourner le meilleur individu trouvé, b(t).

Une caractéristique notable de cet algorithme est qu\'il n\'utilise pas d\'opérateurs de croisement ou de mutation classiques. La variation est entièrement générée par l\'échantillonnage probabiliste à partir du chromosome à Q-bits, et la direction de la recherche est fournie par la mise à jour progressive de ce chromosome via la porte de rotation. Le QGA maintient un seul chromosome à Q-bits qui représente la distribution de probabilité de la population, et une population binaire qui sert d\'instance de cette distribution à chaque génération pour l\'évaluation.

#### 65.6.2 Analyse de sa dynamique : L\'équilibre entre l\'exploration et l\'exploitation

Le succès du QGA réside dans sa capacité à maintenir un équilibre dynamique et efficace entre l\'exploration et l\'exploitation, un dilemme fondamental en optimisation.

- **Exploration :** La phase d\'exploration consiste à sonder de nouvelles régions de l\'espace de recherche pour découvrir des zones prometteuses. Dans le QGA, l\'exploration est intrinsèquement assurée par la nature probabiliste de la représentation par Q-bits.

  - Au début de l\'algorithme, lorsque les amplitudes (αi,βi) sont proches de (1/2,1/2), les probabilités ∣αi∣2 et ∣βi∣2 sont proches de 0.5. L\'observation du chromosome à Q-bits génère alors des solutions binaires de manière quasi uniforme sur tout l\'espace de recherche. Cela correspond à une phase d\'exploration globale très large.
  - Même lorsque l\'algorithme converge, tant que les probabilités ne sont pas exactement 0 ou 1, il existe toujours une possibilité non nulle de générer n\'importe quelle solution binaire. Cette diversité implicite agit comme une protection naturelle contre la convergence prématurée.
- **Exploitation :** La phase d\'exploitation consiste à affiner la recherche dans les régions déjà identifiées comme prometteuses pour trouver la meilleure solution locale. Dans le QGA, l\'exploitation est dirigée par l\'opérateur de porte de rotation.

  - À chaque génération, le meilleur individu trouvé sert de guide. La stratégie de rotation ajuste les amplitudes (αi,βi) pour augmenter la probabilité de générer des bits qui correspondent à ceux du meilleur individu.
  - Ce processus fait progressivement converger le chromosome à Q-bits vers un état où il génère principalement des solutions dans le voisinage de la meilleure solution trouvée jusqu\'à présent. La recherche passe ainsi d\'une exploration globale à une recherche locale plus ciblée.

Le QGA réalise donc une transition douce de l\'exploration à l\'exploitation. Il commence par une recherche large et diversifiée, puis, à mesure que de meilleures solutions sont découvertes, il concentre progressivement ses efforts de recherche autour de ces solutions prometteuses, sans jamais perdre complètement sa capacité à explorer d\'autres régions. C\'est cette dynamique qui lui confère sa robustesse et son efficacité.

#### 65.6.3 Variantes et améliorations du QGA de base

Le QGA original de Han et Kim a inspiré une multitude de variantes et d\'améliorations visant à en perfectionner la performance ou à l\'adapter à des types de problèmes spécifiques.

- **Stratégies de rotation adaptatives :** La table de consultation fixe pour les angles de rotation est un point critique de l\'algorithme original. De nombreuses recherches ont proposé des stratégies adaptatives où la magnitude de l\'angle de rotation Δθ change dynamiquement au cours de l\'évolution. Par exemple, l\'angle peut être plus grand au début pour une exploration rapide et diminuer au fil des générations pour permettre un réglage fin, ou il peut dépendre du fitness de l\'individu.
- **QGA multi-population ou parallèles :** Pour améliorer l\'exploration et éviter les optima locaux, des variantes utilisant plusieurs sous-populations de chromosomes à Q-bits ont été développées. Ces populations peuvent évoluer en parallèle et échanger périodiquement leurs meilleurs individus (migration), imitant les modèles en îles des algorithmes génétiques classiques.
- **QGA hybrides :** Certains algorithmes combinent le QGA avec d\'autres techniques. Par exemple, un opérateur de mutation classique peut être ajouté pour injecter de la diversité supplémentaire, ou un algorithme de recherche locale peut être utilisé pour affiner les solutions générées par le QGA. On trouve aussi des **Hybrid Genetic Algorithms (HGA)** qui intègrent des opérateurs de croisement classiques aux côtés des opérateurs quantiques.
- **QGA pour l\'optimisation continue :** Bien que le QGA original ait été conçu pour des problèmes binaires, des extensions pour l\'optimisation en variables continues ont été proposées. Celles-ci impliquent des schémas d\'encodage plus complexes où chaque Q-bit encode une partie d\'un nombre réel.
- **QGA d\'ordre supérieur :** Une amélioration conceptuelle intéressante consiste à utiliser des registres de plusieurs qubits pour représenter des groupes de gènes corrélés, exploitant ainsi une simulation de l\'intrication. Un **QGA d\'ordre 2**, par exemple, utiliserait des paires de Q-bits intriqués, représentées par 4 amplitudes, pour modéliser les dépendances entre deux gènes.

Ces nombreuses variantes témoignent de la flexibilité et de la richesse du cadre conceptuel du QGA. Elles montrent comment l\'inspiration quantique, même implémentée sur du matériel classique, a fourni un terrain fertile pour l\'innovation dans le domaine des algorithmes évolutionnaires.

### 65.7 Programmation Génétique Quantique (QGP) : L\'Évolution de Programmes Quantiques

Alors que les Algorithmes Génétiques Quantiques se concentrent sur l\'optimisation de chaînes de paramètres ou de solutions binaires, la Programmation Génétique Quantique (QGP) s\'attaque à un défi d\'un ordre de complexité supérieur : l\'évolution de programmes quantiques entiers. La QGP est l\'intersection de la programmation génétique classique, qui fait évoluer des programmes sous forme d\'arbres, et de l\'informatique quantique. Son objectif ultime n\'est pas seulement de résoudre un problème d\'optimisation, mais de découvrir automatiquement de nouveaux algorithmes ou circuits quantiques pour accomplir une tâche donnée. Cette capacité est d\'une importance capitale pour l\'IAG, car elle pourrait permettre à une IA de concevoir ses propres sous-routines de calcul quantique.

#### 65.7.1 Le défi : Représenter, évaluer et faire varier des circuits quantiques

La transition de la PG classique à la QGP présente des défis uniques et fondamentaux à chaque étape du cycle évolutionnaire.

- **Représentation :** Comment représenter un circuit quantique variable sous une forme qui puisse être manipulée par des opérateurs génétiques? Un circuit quantique est une séquence d\'opérations (portes quantiques) appliquées à un ensemble de qubits. Une approche naturelle, inspirée de la PG classique, consiste à utiliser une**représentation arborescente** ou une **liste linéaire** de portes.

  - Dans une représentation arborescente, les nœuds peuvent représenter des portes quantiques (ex: H, CNOT, Rz(θ)) et les feuilles des qubits ou des paramètres. La structure de l\'arbre dicte la séquence et l\'application des portes. Une approche plus récente et puissante utilise la représentation en**Arbre Syntaxique Abstrait (AST)** du code qui génère le circuit (par exemple, en Qiskit), permettant d\'évoluer des structures de programme plus complexes incluant des boucles et des dépendances paramétriques.
  - La représentation doit être capable de gérer des portes à un ou plusieurs qubits, des paramètres continus (angles de rotation) et la topologie des connexions entre qubits.
- **Évaluation (Fitness) :** Comment évaluer la performance d\'un circuit quantique candidat? La fonction de fitness est au cœur du processus et dépend entièrement de la tâche visée.

  - **Synthèse de circuit :** Si l\'objectif est de trouver un circuit qui implémente une transformation unitaire cible Ucible, le fitness peut être calculée en fonction de la fidélité entre l\'unitaire Ucircuit générée par le circuit évolué et Ucible. Une mesure courante est F=1−2n1∣Tr(Ucible†Ucircuit)∣.
  - **Résolution de problème :** Si le circuit doit résoudre un problème d\'optimisation (comme dans un VQA), le fitness est simplement la valeur de la fonction de coût (par exemple, l\'énergie de l\'Hamiltonien) évaluée avec l\'état préparé par le circuit.
  - Apprentissage automatique : Pour une tâche de classification, le fitness serait la précision de la classification sur un ensemble de données de validation.
    L\'évaluation peut être extrêmement coûteuse, car elle nécessite soit une simulation classique du circuit (qui est exponentiellement coûteuse) soit son exécution sur un véritable ordinateur quantique (qui est lente et bruitée).
- **Opérateurs de variation :** Comment croiser et muter des circuits quantiques de manière significative?

  - **Mutation :** Les opérateurs de mutation peuvent inclure des actions comme : changer le type d\'une porte (par exemple, un H en un X), modifier le qubit sur lequel une porte agit, ajouter ou supprimer une porte aléatoirement, ou encore perturber la valeur d\'un paramètre d\'angle de rotation.
  - **Croisement :** Le croisement est plus complexe. Pour les représentations linéaires, un croisement à un point peut être utilisé, échangeant des séquences de portes entre deux circuits parents. Pour les représentations arborescentes, le croisement consiste à échanger des sous-arbres, comme en PG classique. Cependant, ces opérations doivent être conçues avec soin pour éviter de créer des circuits syntaxiquement incorrects ou de détruire complètement la fonctionnalité des parents.

#### 65.7.2 Applications à la synthèse automatique de circuits quantiques

L\'une des applications les plus directes et les plus étudiées de la QGP est la **synthèse de circuits quantiques**. L\'objectif est de trouver la séquence de portes élémentaires la plus courte ou la moins coûteuse (en termes de nombre de portes CNOT, par exemple) qui réalise une fonction logique ou une transformation unitaire donnée.

La QGP s\'est avérée être une approche prometteuse pour ce problème NP-difficile. En définissant une bibliothèque de portes quantiques de base (par exemple, {H, S, CNOT, T}) et une fonction de fitness basée sur la fidélité à l\'unitaire cible, un algorithme de QGP peut explorer l\'espace des circuits possibles pour découvrir des implémentations.

Les avantages de la QGP dans ce domaine sont multiples :

- **Optimisation multi-objectifs :** Le cadre de la PG permet de définir facilement des fonctions de fitness multi-objectifs. Par exemple, on peut chercher à optimiser simultanément la fidélité du circuit, son nombre total de portes, et sa profondeur, ce qui est crucial pour l\'exécution sur du matériel NISQ bruité.
- **Découverte de motifs non-intuitifs :** Les compilateurs quantiques classiques utilisent des règles de réécriture et des modèles prédéfinis. La QGP, étant une recherche stochastique, a le potentiel de découvrir des séquences de portes non-intuitives mais très efficaces que les méthodes humaines ou basées sur des règles pourraient manquer.
- **Adaptation au matériel :** La QGP peut être adaptée pour tenir compte des contraintes spécifiques d\'un matériel quantique particulier. En pénalisant les circuits qui utilisent des connexions non disponibles entre les qubits ou des portes particulièrement bruitées, l\'algorithme peut évoluer des circuits qui sont optimisés non seulement en théorie, mais aussi pour une exécution pratique sur un dispositif donné.

#### 65.7.3 Le potentiel pour la découverte de nouveaux algorithmes quantiques

Au-delà de l\'optimisation de circuits connus, la vision à plus long terme de la QGP est la **découverte d\'algorithmes quantiques entièrement nouveaux**. Le développement d\'algorithmes quantiques, comme ceux de Shor ou de Grover, a nécessité des intuitions profondes et des avancées théoriques majeures. La QGP offre une voie pour automatiser, au moins en partie, ce processus de découverte.

Imaginez un scénario où l\'on ne spécifie pas l\'unitaire cible, mais plutôt une tâche de plus haut niveau. Par exemple, on pourrait définir une fonction de fitness qui récompense un circuit pour sa capacité à trouver le facteur d\'un nombre ou à rechercher un élément dans une base de données non triée. L\'algorithme de QGP explorerait alors l\'espace des programmes quantiques pour trouver celui qui résout le mieux cette tâche.

Cette approche a été explorée dans des contextes plus simples, comme l\'évolution de circuits pour des problèmes de type oracle (par exemple, le problème de Deutsch-Jozsa) ou pour préparer des états quantiques spécifiques. Bien que l\'évolution d\'un algorithme de la complexité de celui de Shor soit encore hors de portée, la QGP représente une forme de **créativité computationnelle**. Elle pourrait découvrir des \"briques\" algorithmiques utiles, des sous-routines quantiques optimisées, ou des approches complètement nouvelles pour des classes de problèmes où aucun algorithme quantique efficace n\'est encore connu. Pour une IAG, la capacité de générer ses propres outils de calcul, y compris des algorithmes quantiques, serait une étape transformative. La QGP est l\'un des cadres les plus prometteurs pour réaliser cette vision.

### 65.8 Architectures Hybrides : Le Pragmatisme à l\'Ère NISQ

L\'ère actuelle de l\'informatique quantique est dominée par les dispositifs NISQ (*Noisy Intermediate-Scale Quantum*). Ces machines sont \"intermédiaires\" en termes de nombre de qubits (généralement de 50 à quelques milliers) et, surtout, \"bruyantes\", ce qui signifie que leurs opérations sont sujettes à des erreurs dues à la décohérence et à des imperfections de contrôle. La profondeur des circuits qui peuvent être exécutés de manière fiable est sévèrement limitée, et les algorithmes quantiques tolérants aux pannes à grande échelle restent un objectif à long terme.

Dans ce contexte, les algorithmes purement quantiques, y compris les QEEA entièrement quantiques, sont difficiles à mettre en œuvre. Une approche plus pragmatique et de plus en plus populaire consiste à concevoir des **architectures hybrides quantique-classique**. Ces architectures cherchent à tirer parti des forces respectives des deux paradigmes : elles délèguent à l\'ordinateur quantique les tâches pour lesquelles il pourrait avoir un avantage, comme la préparation d\'états complexes ou l\'évaluation de certaines fonctions, tout en confiant la majeure partie de la logique de contrôle et d\'optimisation à un ordinateur classique robuste et fiable. Les algorithmes évolutionnaires classiques, avec leur robustesse et leur nature sans gradient, sont des candidats idéaux pour orchestrer la partie classique de ces architectures.

#### 65.8.1 Modèle 1 : L\'AE classique comme optimiseur externe pour un circuit quantique variationnel

Ce modèle est l\'application la plus directe et la plus étudiée des AE dans le contexte des VQA. Comme nous l\'avons vu, le principal obstacle à l\'entraînement des VQA est le phénomène des plateaux stériles, qui paralyse les optimiseurs basés sur le gradient. Le modèle 1 propose une solution simple et élégante : remplacer l\'optimiseur par gradient par un algorithme évolutionnaire classique.

Le flux de travail de cette architecture est le suivant :

1. **Population de paramètres :** L\'AE classique maintient une population d\'individus. Chaque individu n\'est pas une solution directe au problème, mais un **vecteur de paramètres** θ pour le circuit quantique variationnel.
2. **Évaluation de la fitness (sur QPU) :** Pour chaque individu θ de la population, l\'ordinateur classique envoie ces paramètres à l\'ordinateur quantique (QPU). Le QPU prépare l\'état quantique correspondant ∣ψ(θ)⟩ et mesure l\'espérance d\'un Hamiltonien ou d\'une autre fonction de coût, ⟨H⟩θ.
3. **Calcul du fitness :** La valeur de l\'espérance mesurée, ⟨H⟩θ, est renvoyée à l\'ordinateur classique et utilisée comme valeur de fitness (ou son inverse, selon que l\'on minimise ou maximise).
4. **Cycle évolutionnaire classique :** L\'AE applique ensuite ses opérateurs standards (sélection, croisement, mutation) sur la population de vecteurs de paramètres θ pour créer une nouvelle génération.
5. **Itération :** Le processus est répété jusqu\'à la convergence.

L\'avantage principal de cette approche est sa **résilience aux plateaux stériles**. Comme l\'AE n\'utilise pas de gradients, il n\'est pas affecté par leur disparition. Il explore l\'espace des paramètres de manière globale, en s\'appuyant sur la performance des solutions plutôt que sur la géométrie locale du paysage. Des études ont montré que des optimiseurs évolutionnaires comme l\'Évolution Différentielle (DE) peuvent surpasser de manière significative les optimiseurs locaux basés sur le gradient, en particulier dans les scénarios sujets aux minima locaux et aux plateaux stériles. Cette approche transforme le VQA en une optimisation de type \"boîte noire\", un domaine où les AE excellent.

#### 65.8.2 Modèle 2 : L\'AE classique intégrant un sous-programme quantique pour accélérer une tâche spécifique

Dans ce second modèle, le rôle est inversé. L\'algorithme principal est un AE classique qui résout un problème complexe (par exemple, un problème de logistique ou de conception de matériaux). Cependant, une partie de l\'algorithme, typiquement l\'**évaluation de la fonction de fitness**, est si complexe qu\'elle pourrait être accélérée par un sous-programme quantique.

Le flux de travail est le suivant :

1. **Population de solutions classiques :** L\'AE maintient une population de solutions classiques au problème (par exemple, des plans de logistique, des configurations moléculaires).
2. **Évaluation de la fitness (assistée par le quantique) :** Pour évaluer le fitness d\'un individu classique, l\'ordinateur classique le traduit en une entrée pour un sous-programme quantique.
3. **Exécution du sous-programme quantique :** L\'ordinateur quantique exécute un algorithme spécifique pour calculer une propriété clé nécessaire au fitness. Par exemple :

   - Pour un problème de chimie quantique, l\'AE pourrait faire évoluer des géométries moléculaires, et un VQE pourrait être utilisé comme sous-programme pour calculer l\'énergie de chaque géométrie.
   - Pour un problème d\'optimisation financière, l\'AE pourrait faire évoluer des stratégies de portefeuille, et un algorithme quantique pourrait être utilisé pour évaluer rapidement le risque ou le rendement attendu d\'un portefeuille donné.
   - Pour un problème de machine learning, un circuit quantique pourrait être utilisé pour calculer une fonction noyau complexe ou évaluer une fonction de perte sur un grand ensemble de données en superposition.
4. **Retour du fitness :** Le résultat du calcul quantique est renvoyé à l\'ordinateur classique, qui l\'utilise pour attribuer une valeur de fitness à l\'individu.
5. **Cycle évolutionnaire classique :** L\'AE procède ensuite à son cycle normal de sélection et de variation.

Ce modèle vise à exploiter un **avantage quantique** potentiel pour une tâche de calcul spécifique, tout en utilisant la robustesse et la généralité d\'un cadre évolutionnaire pour la recherche globale.

#### 65.8.3 Analyse des avantages de ces approches pour contourner le bruit et les limites matérielles

Les architectures hybrides sont particulièrement bien adaptées aux contraintes du matériel NISQ pour plusieurs raisons.

- **Réduction de la charge de calcul quantique :** Dans les deux modèles, la quantité de calcul effectuée sur le QPU est minimisée. Dans le modèle 1, le QPU n\'est utilisé que comme une \"oracle\" d\'évaluation de la fonction de coût. Dans le modèle 2, il n\'exécute qu\'un sous-programme bien défini. Toute la logique complexe de l\'optimisation évolutionnaire (gestion de la population, sélection, variation) est gérée par l\'ordinateur classique, qui n\'est pas sujet au bruit quantique.
- **Tolérance au bruit stochastique :** L\'évaluation du fitness sur un dispositif NISQ est intrinsèquement stochastique, en raison du bruit des portes et des erreurs de mesure. Les algorithmes évolutionnaires, étant eux-mêmes des algorithmes stochastiques basés sur une population, sont naturellement plus robustes à une fonction de fitness bruitée que les optimiseurs déterministes basés sur le gradient, qui peuvent être facilement déviés par des estimations de gradient erronées. Certaines études suggèrent même que, dans certains régimes, le bruit peut être bénéfique en aidant l\'algorithme à échapper aux minima locaux, un phénomène parfois observé dans l\'optimisation stochastique.
- **Circuits peu profonds :** Les VQA, qui sont au cœur de ces architectures hybrides, sont conçus pour utiliser des circuits quantiques peu profonds afin de minimiser l\'accumulation d\'erreurs dues à la décohérence. En combinant ces circuits courts avec un optimiseur évolutionnaire robuste, on maximise les chances d\'obtenir des résultats significatifs malgré les limitations de cohérence des qubits.

En somme, les architectures hybrides représentent une voie pragmatique et puissante pour l\'optimisation quantique à court terme. Elles contournent les problèmes les plus épineux des VQA (plateaux stériles) et du matériel NISQ (bruit, profondeur de circuit limitée) en allouant intelligemment les tâches entre les ressources classiques et quantiques. L\'algorithme évolutionnaire classique agit comme un \"cerveau\" robuste qui dirige l\'exploration, tandis que le circuit quantique agit comme un \"coprocesseur\" spécialisé pour les tâches où la mécanique quantique offre un avantage potentiel.

## Partie IV : Applications Stratégiques pour l\'Intelligence Artificielle Générale

L\'objectif ultime de l\'intelligence artificielle est la création d\'une intelligence générale (IAG), un agent capable de comprendre, d\'apprendre et de s\'adapter à une gamme de tâches aussi large que celle d\'un être humain. La réalisation d\'une telle intelligence pose des défis computationnels monumentaux dans les domaines de l\'optimisation, de l\'apprentissage structurel et de la créativité. Cette quatrième partie explore comment les algorithmes évolutionnaires améliorés par l\'informatique quantique (QEEA) pourraient fournir des outils radicalement nouveaux pour relever ces défis. Nous examinerons trois domaines d\'application stratégiques où la synergie entre l\'évolution et le quantique pourrait s\'avérer décisive : la conception automatisée de \"cerveaux\" quantiques par neuroévolution, la résolution de problèmes d\'optimisation combinatoire à une échelle inaccessible aux machines classiques, et l\'accélération de la découverte scientifique par l\'apprentissage symbolique.

### 65.9 Neuroévolution Quantique : La Conception Automatisée de Cerveaux Quantiques

La neuroévolution, qui utilise des algorithmes évolutionnaires pour concevoir des réseaux de neurones artificiels, est une alternative puissante à l\'apprentissage par descente de gradient. Elle permet d\'optimiser non seulement les poids (paramètres) du réseau, mais aussi son architecture (topologie), ses fonctions d\'activation et d\'autres hyperparamètres. L\'extension de ce paradigme au domaine quantique --- la **neuroévolution quantique** --- ouvre une voie prometteuse pour la conception automatisée de Réseaux Neuronaux Quantiques (RNQ), les analogues quantiques des réseaux de neurones classiques, qui ont été introduits au chapitre 3.

#### 65.9.1 Utiliser les QEEA pour optimiser les architectures des Réseaux Neuronaux Quantiques (Chapitre 3)

Un Réseau Neuronal Quantique est essentiellement un circuit quantique variationnel (VQA) conçu pour des tâches d\'apprentissage automatique. Comme tout VQA, son efficacité dépend de manière cruciale de son *ansatz*, c\'est-à-dire de la structure de son circuit paramétré. Le choix d\'un bon *ansatz* est un art difficile, et un mauvais choix peut conduire à une faible expressivité ou, pire, à des paysages d\'optimisation entravés par des plateaux stériles.

La neuroévolution quantique, propulsée par des QEEA, aborde ce problème comme une tâche de recherche. L\'algorithme évolutionnaire explore un vaste espace d\'architectures de circuits possibles pour découvrir celle qui est la mieux adaptée à une tâche d\'apprentissage donnée. Dans ce cadre, un individu de la population de l\'AE n\'est pas un ensemble de poids, mais un **encodage de l\'architecture d\'un RNQ**. La fonction de fitness de cet individu est la performance (par exemple, la précision de classification) du RNQ correspondant après un entraînement (ou une évaluation rapide).

Cette approche permet d\'automatiser le processus de \"Quantum Architecture Search\" (QAS). Un QEEA est particulièrement bien adapté à cette tâche car l\'espace des architectures de circuits est discret, combinatoire et extrêmement vaste, un terrain de jeu idéal pour les méthodes d\'exploration évolutionnaires.

#### 65.9.2 Évolution des paramètres, de la topologie et des stratégies d\'encodage

La puissance de la neuroévolution quantique réside dans sa capacité à optimiser simultanément plusieurs aspects fondamentaux d\'un RNQ :

- **Évolution de la topologie :** L\'AE peut faire évoluer la structure même du circuit quantique. Cela inclut le nombre de couches, les types de portes quantiques utilisées (par exemple, des rotations Rx,Ry,Rz), et la manière dont les portes à deux qubits (comme les CNOT) connectent les qubits. L\'algorithme peut commencer avec des circuits très simples et ajouter progressivement des portes et des connexions, à l\'instar de l\'algorithme classique NEAT (NeuroEvolution of Augmenting Topologies).
- **Évolution des paramètres :** En plus de la topologie, l\'AE peut optimiser directement les paramètres (angles de rotation) du circuit. C\'est le modèle hybride (Modèle 1, section 4.8.1) appliqué à la neuroévolution, où l\'AE remplace l\'optimiseur par gradient pour l\'entraînement du RNQ.
- **Évolution des stratégies d\'encodage :** Une étape cruciale dans l\'application des RNQ à des données classiques est l\'encodage de ces données dans un état quantique. La manière dont cela est fait (l\'encodage d\'amplitude, l\'encodage d\'angle, etc.) a un impact majeur sur la performance. Un QEEA peut faire évoluer la structure du circuit d\'encodage lui-même, découvrant ainsi la manière la plus efficace de représenter les données pour une tâche donnée.

En combinant ces trois niveaux d\'optimisation, la neuroévolution quantique offre une approche holistique pour la conception de RNQ, capable de découvrir des architectures entièrement nouvelles et adaptées au problème, sans intervention humaine.

#### 65.9.3 Une voie pour surmonter les plateaux stériles et découvrir des RNQ plus performants

L\'application de la neuroévolution aux RNQ offre une solution directe et puissante au problème des plateaux stériles. Comme l\'algorithme évolutionnaire est une méthode d\'optimisation sans gradient, il n\'est pas directement affecté par la disparition des gradients dans le paysage des paramètres. Il peut continuer à explorer l\'espace des solutions, même lorsque les méthodes de descente de gradient sont complètement paralysées.

De plus, la neuroévolution peut indirectement **éviter** les régions de l\'espace des architectures qui sont sujettes aux plateaux stériles. Les architectures de circuits très profondes ou avec des motifs d\'intrication globaux sont connues pour être particulièrement sensibles aux plateaux stériles. Un algorithme évolutionnaire, en sélectionnant des architectures sur la base de leur performance finale, favorisera implicitement les circuits qui sont non seulement expressifs mais aussi **entraînables**. Il peut découvrir des architectures peu profondes mais efficaces, qui sont plus robustes au bruit et moins susceptibles de présenter des plateaux stériles, ce qui est essentiel pour une mise en œuvre sur les dispositifs NISQ.

En résumé, la neuroévolution quantique représente une application stratégique des QEEA. Elle transforme la conception de RNQ d\'un processus manuel et sujet aux erreurs en une recherche automatisée et optimisée. En surmontant le goulot d\'étranglement de l\'entraînement posé par les plateaux stériles, elle pourrait permettre de libérer le véritable potentiel de l\'apprentissage automatique quantique et de construire les \"cerveaux\" quantiques qui pourraient un jour former un composant d\'une IAG.

### 65.10 Résolution de Problèmes d\'Optimisation Combinatoire à Grande Échelle

L\'intelligence, qu\'elle soit humaine ou artificielle, est fondamentalement liée à la capacité de prendre des décisions optimales dans des situations complexes. De nombreuses fonctions cognitives de haut niveau, comme la planification, la logistique, l\'allocation de ressources ou la conception de systèmes, peuvent être formulées comme des problèmes d\'optimisation combinatoire. Ces problèmes sont notoirement difficiles pour les ordinateurs classiques car leur espace de recherche --- l\'ensemble de toutes les solutions possibles --- croît de manière exponentielle ou factorielle avec la taille du problème. Pour une IAG, la capacité à résoudre efficacement ces problèmes est une condition sine qua non.

#### 65.10.1 Problèmes fondamentaux pour l\'IAG : Planification, logistique, allocation de ressources

Considérons quelques problèmes emblématiques qui sont au cœur des défis de l\'IAG :

- **Le Problème du Voyageur de Commerce (TSP) :** Trouver le plus court chemin qui visite un ensemble de villes une seule fois avant de revenir au point de départ. C\'est un prototype pour tous les problèmes de routage et de séquençage, de la logistique des chaînes d\'approvisionnement à la planification des mouvements d\'un bras robotique.
- **Le Problème d\'Affectation Quadratique (QAP) :** Affecter n installations à n emplacements de manière à minimiser un coût qui dépend à la fois des distances entre les emplacements et des flux entre les installations. Ce problème modélise des tâches de conception de circuits intégrés, de disposition d\'usines ou d\'allocation de tâches dans des systèmes informatiques distribués.
- **Le Problème d\'Ordonnancement d\'Atelier (Job Shop Scheduling) :** Planifier l\'exécution d\'un ensemble de tâches sur un ensemble de machines, en respectant des contraintes de précédence et de ressources, afin de minimiser le temps total d\'exécution. C\'est un problème central en production industrielle, en gestion de projet et en allocation de ressources de calcul.
- **Le Problème de Satisfaisabilité Booléenne (SAT) :** Déterminer s\'il existe une assignation de valeurs de vérité (vrai/faux) à des variables qui satisfait une formule logique donnée. C\'est un problème fondamental en informatique théorique avec des applications en vérification de matériel et de logiciel, et en planification.

Pour tous ces problèmes, l\'espace des solutions est si vaste qu\'une recherche exhaustive est impossible. Les méthodes classiques reposent sur des heuristiques qui trouvent de bonnes solutions, mais sans garantie d\'optimalité.

#### 65.10.2 Comment les QEEA peuvent explorer des espaces de recherche vastes et complexes inaccessibles aux méthodes classiques

Les QEEA offrent une nouvelle approche pour aborder ces problèmes d\'optimisation combinatoire à grande échelle, en exploitant les principes quantiques pour explorer l\'espace de recherche d\'une manière fondamentalement différente.

- **Exploration Parallèle grâce à la Superposition :** Comme nous l\'avons vu, un chromosome à qubits de m gènes peut représenter une superposition de 2m solutions classiques. Un QEEA opérant sur un tel chromosome explore donc implicitement et simultanément une partie exponentiellement grande de l\'espace de recherche. Alors qu\'un AE classique ne teste qu\'un petit échantillon de l\'espace à chaque génération, un QEEA manipule une distribution de probabilité sur l\'ensemble de l\'espace. Cette capacité d\'exploration massive pourrait permettre de découvrir des régions prometteuses du paysage de fitness qui seraient manquées par les échantillonnages plus clairsemés des méthodes classiques.
- **Corrélations Complexes via l\'Intrication :** Les solutions optimales aux problèmes combinatoires complexes présentent souvent des structures et des corrélations non triviales entre les variables de décision. Par exemple, dans un problème de planification, la décision d\'affecter une tâche à une machine à un certain moment peut avoir des répercussions complexes sur de nombreuses autres décisions. L\'intrication quantique fournit un mécanisme naturel pour représenter et manipuler ces corrélations. Un QEEA peut faire évoluer non seulement les solutions elles-mêmes, mais aussi la structure d\'intrication entre les gènes, adaptant ainsi sa recherche à la structure de dépendance intrinsèque du problème.
- **Convergence Accélérée par l\'Interférence :** L\'interférence quantique agit comme un puissant mécanisme de sélection qui peut potentiellement accélérer la convergence vers l\'optimum global. En amplifiant de manière constructive les amplitudes des solutions de haute qualité et en annulant de manière destructive celles des solutions de faible qualité, un QEEA peut se concentrer sur les régions les plus prometteuses de l\'espace de recherche de manière beaucoup plus directe et efficace qu\'un processus de sélection stochastique classique.

Des algorithmes comme le Quantum Approximate Optimization Algorithm (QAOA), qui partage des similitudes conceptuelles avec les QEEA, ont déjà montré un potentiel pour résoudre des problèmes comme le Max-Cut. Les QEEA, en particulier les QIEA qui peuvent déjà être implémentés, ont été appliqués avec succès à des instances de TSP et d\'autres problèmes d\'ordonnancement, démontrant souvent une meilleure performance que leurs homologues classiques.

Pour une IAG, la capacité de résoudre ces problèmes d\'optimisation à une échelle et avec une qualité qui dépassent les méthodes classiques serait une avancée majeure. Cela se traduirait par une meilleure planification à long terme, une allocation de ressources plus efficace et une capacité accrue à concevoir des systèmes complexes. Les QEEA représentent une voie prometteuse pour doter les futures IAG de ces capacités de raisonnement combinatoire avancées.

### 65.11 Apprentissage Automatisé et Découverte Scientifique

Au-delà de l\'optimisation pure, une caractéristique essentielle d\'une intelligence générale est la capacité à apprendre des modèles à partir de données et, idéalement, à découvrir de nouvelles connaissances --- de nouvelles lois ou de nouvelles structures --- de manière autonome. Ce processus s\'apparente à la découverte scientifique. Les algorithmes évolutionnaires, en particulier la programmation génétique, ont déjà été utilisés dans ce but. L\'ajout de la puissance de calcul quantique pourrait considérablement étendre ces capacités, dotant une potentielle IAG d\'une forme de \"créativité\" computationnelle.

#### 65.11.1 Utiliser les QEEA pour l\'apprentissage symbolique : la découverte de lois physiques ou de modèles complexes à partir de données

L\'**apprentissage symbolique**, et plus spécifiquement la **régression symbolique**, est une branche de l\'apprentissage automatique qui vise à trouver non seulement un modèle prédictif, mais aussi une expression mathématique interprétable qui décrit la relation sous-jacente dans les données. Par exemple, à partir des données de position des planètes de Tycho Brahe, un algorithme de régression symbolique pourrait redécouvrir les lois de Kepler.

La programmation génétique (PG) est l\'outil de choix pour la régression symbolique. Elle fait évoluer une population d\'expressions mathématiques (représentées sous forme d\'arbres) pour trouver celle qui correspond le mieux aux données observées. Cependant, l\'espace des expressions mathématiques possibles est infini et sa recherche est extrêmement difficile.

La Programmation Génétique Quantique (QGP) offre de nouvelles perspectives pour cette tâche  :

- **Représentation enrichie :** Un programme quantique, représenté par un circuit, peut encoder une superposition de plusieurs expressions symboliques classiques. L\'évolution pourrait opérer sur cette superposition, explorant simultanément plusieurs hypothèses mathématiques.
- **Espace d\'opérateurs étendu :** La bibliothèque de fonctions de base que la QGP peut utiliser ne se limite pas aux opérations arithmétiques classiques. Elle peut inclure des opérateurs inspirés des transformations quantiques, permettant potentiellement de découvrir des modèles qui ne sont pas facilement exprimables dans le langage mathématique standard.
- **Recherche plus efficace :** L\'exploration parallèle et l\'interférence constructive pourraient permettre à la QGP de naviguer plus efficacement dans le vaste espace des modèles possibles, en se concentrant plus rapidement sur les structures mathématiques qui capturent la véritable physique ou la dynamique du système étudié.

Une IAG dotée de capacités de QGP pourrait analyser des ensembles de données complexes provenant d\'expériences scientifiques ou de simulations et proposer des lois ou des équations concises et interprétables, accélérant ainsi le cycle de la découverte scientifique.

#### 65.11.2 Potentiel pour une IAG dotée de capacités de \"créativité\" computationnelle

La créativité est souvent associée à la capacité de générer des solutions nouvelles, surprenantes et utiles. D\'un point de vue computationnel, cela peut être interprété comme la capacité à explorer efficacement des espaces de recherche vastes et de grande dimension pour y trouver des solutions de haute qualité qui ne sont pas des extrapolations triviales de solutions existantes.

Les QEEA sont intrinsèquement créatifs en ce sens :

- **Génération de nouveauté :** La superposition permet de maintenir une vaste réserve de diversité. L\'observation d\'un chromosome en superposition peut générer des solutions radicalement différentes de celles vues dans les générations précédentes, favorisant ainsi les sauts innovants dans l\'espace de recherche.
- **Combinaison non-locale :** L\'intrication permet de combiner des \"idées\" (gènes) de manière non-locale et corrélée. Cela pourrait être l\'analogue computationnel de l\'association d\'idées distantes qui est souvent à l\'origine des percées créatives.
- **Découverte de structures :** En faisant évoluer non seulement les solutions mais aussi les relations entre leurs composantes (via l\'intrication), les QEEA peuvent découvrir des structures organisationnelles ou des principes de conception optimaux.

Appliquée à des domaines comme la conception de matériaux, la découverte de médicaments, ou même la composition artistique, une IAG basée sur les QEEA pourrait générer des artefacts d\'une complexité et d\'une nouveauté qui dépassent les capacités humaines. Elle ne se contenterait pas d\'optimiser des conceptions existantes, mais pourrait inventer des paradigmes de conception entièrement nouveaux. Cette capacité à générer de la nouveauté structurée est l\'une des promesses les plus profondes de la synergie entre l\'évolution et le calcul quantique pour la réalisation d\'une IAG véritablement intelligente et créative.

## Partie V : Défis, Limites et Vision à Long Terme

Malgré le potentiel transformateur des algorithmes évolutionnaires améliorés par l\'informatique quantique, leur réalisation pratique et leur déploiement à grande échelle sont confrontés à des défis théoriques et technologiques considérables. Cette dernière partie adopte une perspective critique pour évaluer les obstacles qui se dressent sur la voie d\'une implémentation efficace, positionner les QEEA dans le paysage concurrentiel des autres méthodes d\'optimisation quantique, et esquisser une vision à long terme de leur rôle dans l\'avènement de l\'informatique quantique tolérante aux pannes et de l\'intelligence artificielle générale. Une évaluation honnête de ces limites est essentielle pour guider les efforts de recherche futurs et tempérer les attentes à court terme.

### 65.12 Les Obstacles à une Implémentation Efficace

La mise en œuvre de QEEA sur du matériel quantique réel, en particulier sur les dispositifs NISQ actuels, se heurte à trois obstacles majeurs : le coût en ressources quantiques, la sensibilité au bruit et le défi de l\'évaluation du fitness.

#### 65.12.1 Le coût en ressources quantiques (cohérence, nombre de portes) des opérateurs évolutionnaires

Les opérateurs de variation quantique, bien que conceptuellement puissants, ont un coût en termes de ressources quantiques.

- **Profondeur de circuit :** La mise en œuvre d\'opérateurs de croisement basés sur des portes contrôlées à deux qubits ou d\'opérateurs d\'amplification d\'amplitude de type Grover nécessite des circuits d\'une certaine profondeur. Chaque porte ajoutée augmente la durée totale de l\'exécution.
- **Temps de cohérence :** Les qubits ne peuvent maintenir leur état quantique fragile que pendant une durée limitée, appelée temps de cohérence. Si la profondeur du circuit nécessaire pour implémenter un cycle d\'évolution quantique dépasse le temps de cohérence des qubits, les informations quantiques sont perdues à cause de la décohérence, et le calcul échoue. Les dispositifs NISQ actuels ont des temps de cohérence très courts, ce qui limite sévèrement la complexité des opérateurs évolutionnaires qui peuvent être implémentés.
- **Nombre de portes :** Chaque porte quantique, en particulier les portes à deux qubits, n\'est pas parfaite et a une certaine probabilité d\'erreur (fidélité de porte). L\'accumulation de ces erreurs sur un grand nombre de portes peut rendre le résultat du calcul complètement aléatoire et inutilisable.

Le défi consiste donc à concevoir des opérateurs évolutionnaires quantiques qui sont à la fois puissants sur le plan algorithmique et \"économes\" en ressources quantiques, c\'est-à-dire qui peuvent être implémentés avec des circuits de faible profondeur et un nombre minimal de portes.

#### 65.12.2 La sensibilité au bruit du matériel NISQ

Le bruit est l\'ennemi juré de l\'informatique quantique à l\'ère NISQ. Les QEEA, comme tous les algorithmes quantiques, sont sensibles à ses effets délétères.

- **Distorsion du paysage de fitness :** Le bruit dans l\'évaluation de la fitness (que ce soit dans un modèle hybride ou un QEEA entièrement quantique) peut déformer le paysage d\'optimisation. Il peut masquer les gradients (même pour un AE qui ne les utilise pas, cela signifie que la différence de fitness entre deux solutions peut être noyée dans le bruit), créer de faux optima locaux, et rendre la convergence plus difficile.
- **Dégradation des opérateurs :** Le bruit affecte également l\'exécution des opérateurs de variation eux-mêmes. Une porte de rotation bruitée n\'appliquera pas l\'angle de rotation exact, et une porte CNOT bruitée peut échouer à créer l\'intrication souhaitée. Cela dégrade l\'efficacité du processus d\'exploration et d\'exploitation.
- **Nécessité de la mitigation d\'erreurs :** Pour obtenir des résultats fiables sur le matériel NISQ, des techniques de mitigation d\'erreurs quantiques (QEM) sont nécessaires. Ces techniques, comme l\'extrapolation à zéro bruit ou la correction d\'erreurs de lecture, ajoutent une surcharge de calcul significative (plus de mesures sont nécessaires) et ne corrigent que partiellement les erreurs.

Bien que les architectures hybrides et la nature stochastique des AE offrent une certaine résilience au bruit, des niveaux de bruit élevés peuvent néanmoins rendre l\'optimisation inefficace.

#### 65.12.3 Le défi de la mesure et de l\'évaluation du fitness sur un ordinateur quantique

L\'un des défis les plus fondamentaux et souvent sous-estimés est le problème de la mesure. En mécanique quantique, la mesure est un processus projectif et irréversible qui détruit la superposition de l\'état quantique pour ne donner qu\'un seul résultat classique.

- **Effondrement de la fonction d\'onde :** Pour évaluer le fitness d\'un chromosome en superposition, il faut le mesurer. Cette mesure le fait s\'effondrer en une seule chaîne de bits classique. Pour obtenir une information statistique sur l\'état de superposition, il faut préparer et mesurer l\'état à de très nombreuses reprises, ce qui est coûteux en temps.
- **Extraction du fitness :** Dans un QEEA entièrement quantique, où la population entière est dans un seul état de superposition, comment évaluer le fitness de toutes les solutions \"en parallèle\" sans détruire l\'état? C\'est le \"problème de la mesure\" appliqué au calcul évolutionnaire. Des approches théoriques existent, comme l\'utilisation d\'une \"porte de fitness\" quantique qui encode la valeur du fitness dans l\'amplitude ou la phase d\'un qubit auxiliaire, suivie d\'une amplification d\'amplitude pour trouver les états de haut fitness. Cependant, la construction de telles portes de fitness pour des problèmes complexes est un défi majeur en soi et requiert des ressources quantiques importantes.

Ce goulot d\'étranglement de la mesure est une raison majeure pour laquelle les architectures hybrides, où l\'évaluation du fitness est gérée de manière plus simple (mesure de l\'espérance d\'un observable), sont actuellement la voie la plus pratique.

### 65.13 Le Paysage Compétitif des Méthodes d\'Optimisation Quantique

Les QEEA ne sont pas la seule approche proposée pour l\'optimisation sur des ordinateurs quantiques. Ils s\'inscrivent dans un paysage de méthodes concurrentes, chacune avec ses propres forces, ses faiblesses et son domaine d\'application privilégié. Pour un praticien, il est crucial de comprendre où se situent les QEEA par rapport à ces alternatives.

#### 65.13.1 Positionnement des QEEA par rapport au Recuit Quantique et aux Algorithmes Variationnels (VQA)

Trois grandes classes de métaheuristiques quantiques dominent actuellement le paysage de l\'optimisation :

- **Le Recuit Quantique (Quantum Annealing - QA) :** C\'est une approche d\'optimisation qui utilise un phénomène quantique appelé \"tunneling\" pour trouver le minimum global d\'une fonction de coût. L\'algorithme commence avec un système dans l\'état fondamental simple d\'un Hamiltonien initial, puis fait évoluer lentement le système vers un Hamiltonien final dont l\'état fondamental encode la solution du problème d\'optimisation. Le théorème adiabatique garantit que si l\'évolution est suffisamment lente, le système restera dans son état fondamental et aboutira à la solution optimale. Les dispositifs de recuit quantique (comme ceux de D-Wave) sont des matériels spécialisés conçus spécifiquement pour cette tâche.
- **Les Algorithmes Quantiques Variationnels (VQA) :** Comme discuté précédemment, les VQA (incluant le VQE et le QAOA) utilisent un circuit quantique paramétré et un optimiseur classique pour trouver de manière itérative la solution à un problème d\'optimisation. Ils sont conçus pour les ordinateurs quantiques universels à portes logiques et sont au cœur de la stratégie pour l\'ère NISQ.
- **Les Algorithmes Évolutionnaires Améliorés par le Quantique (QEEA) :** Comme ce chapitre l\'a détaillé, les QEEA utilisent les principes de l\'évolution pour guider la recherche. Dans leur forme hybride, ils agissent comme des optimiseurs externes pour les VQA, tandis que dans leur forme entièrement quantique, ils représentent un paradigme d\'optimisation distinct.

#### 65.13.2 Analyse comparative : Quand utiliser une approche évolutionnaire plutôt qu\'une autre?

Le choix de la méthode dépend fortement de la nature du problème, des ressources matérielles disponibles et des caractéristiques du paysage d\'optimisation.

- **Recuit Quantique vs QEEA :**

  - **Matériel :** Le QA nécessite un recuit quantique spécialisé, tandis que les QEEA sont conçus pour des ordinateurs quantiques universels à portes (ou, dans le cas des QIEA, des ordinateurs classiques).
  - **Type de problème :** Le QA est naturellement adapté aux problèmes qui peuvent être facilement mappés sur un Hamiltonien d\'Ising (problèmes QUBO - Quadratic Unconstrained Binary Optimization). Les QEEA sont plus flexibles et peuvent être appliqués à une plus grande variété de représentations et de fonctions de coût.
  - **Mécanisme de recherche :** Le QA repose sur le tunneling quantique pour traverser les barrières d\'énergie dans le paysage de fitness. Les QEEA reposent sur la recombinaison et la variation au sein d\'une population (réelle ou en superposition). Le QA est une sorte de recherche globale guidée par l\'adiabacité, tandis que les QEEA sont une recherche stochastique basée sur une population. Des études comparatives ont montré que le QA peut être plus rapide pour trouver de bonnes solutions, mais que les QEEA (notamment les QAGA,
    *Quantum-Assisted Genetic Algorithms*) peuvent être plus efficaces pour trouver l\'optimum global précis pour certains types de problèmes de type verre de spin.
- **VQA (avec optimiseur à gradient) vs QEEA (comme optimiseur) :**

  - **Paysage de fitness :** C\'est le critère de différenciation clé. Si le paysage des paramètres du VQA est bien structuré, avec des gradients informatifs et peu de minima locaux, un optimiseur basé sur le gradient sera probablement plus rapide et plus efficace.
  - **Plateaux stériles et minima locaux :** Si le paysage est suspecté de contenir des plateaux stériles ou de nombreux minima locaux profonds, un QEEA (agissant comme optimiseur externe) est un choix bien plus robuste. Il ne sera pas paralysé par les gradients nuls et sa nature d\'exploration globale lui donnera une meilleure chance d\'éviter les pièges des optima locaux. Le coût est généralement un plus grand nombre d\'évaluations de la fonction de coût par rapport à une descente de gradient réussie.

En résumé, on peut établir l'heuristique suivante :

- Utiliser le **Recuit Quantique** si le problème est un QUBO et si l\'on a accès à un recuit quantique.
- Utiliser un **VQA avec un optimiseur à gradient** pour des problèmes de petite taille ou lorsque le paysage de fitness est supposé être simple.
- Utiliser un **QEEA (comme optimiseur pour un VQA)** lorsque le problème est de grande taille, que le paysage est complexe, bruité, ou que l\'on soupçonne la présence de plateaux stériles. C\'est le choix de la robustesse par rapport à la vitesse potentielle.

Les QEEA se positionnent donc comme une métaheuristique d\'optimisation quantique générale et robuste, particulièrement adaptée aux scénarios difficiles où les autres méthodes, plus spécialisées ou plus sensibles à la topologie du paysage, risquent d\'échouer.

### 65.14 Conclusion : L\'Évolution, une Force Fondamentale pour l\'Optimisation Quantique et l\'AGI

Au terme de cette exploration approfondie des algorithmes évolutionnaires améliorés par l\'informatique quantique, une conclusion claire émerge : la fusion de ces deux paradigmes représente bien plus qu\'une simple amélioration incrémentale. Elle constitue une refonte fondamentale de notre approche de l\'optimisation, avec des implications profondes pour les défis les plus ardus de l\'intelligence artificielle, et notamment la quête de l\'IAG.

#### 65.14.1 Synthèse : Les QEEA comme paradigme d\'optimisation puissant, robuste et flexible

Nous avons commencé par établir les algorithmes évolutionnaires classiques comme des métaheuristiques sans gradient, dont la robustesse les rend particulièrement aptes à naviguer dans des paysages d\'optimisation complexes et mal définis. Nous avons ensuite montré comment cette caractéristique même répondait à un besoin critique dans le domaine de l\'informatique quantique : surmonter le phénomène des plateaux stériles qui paralyse les algorithmes variationnels basés sur le gradient.

Le cœur de notre analyse a démontré que l\'apport du quantique transcende cette simple solution. En réinventant les concepts de population, de variation et de sélection à travers les prismes de la superposition, de l\'intrication et de l\'interférence, les QEEA offrent un nouveau mode d\'exploration des espaces de solutions. La capacité à représenter une diversité exponentielle dans un seul état, à manipuler des corrélations complexes via l\'intrication, et à amplifier les bonnes solutions par interférence constructive, confère à ces algorithmes une puissance conceptuelle sans précédent.

Nous avons distingué les approches pragmatiques et immédiatement applicables des QIEA sur machines classiques, qui ont déjà prouvé leur valeur, des QEEA véritables, qui représentent la vision à plus long terme. Les architectures spécifiques, du QGA au QGP, en passant par les modèles hybrides pour l\'ère NISQ, illustrent la flexibilité de ce paradigme, capable de s\'adapter aux contraintes matérielles actuelles tout en visant les capacités des machines futures. Enfin, en reliant ces capacités aux exigences de l\'IAG --- de la conception de réseaux neuronaux quantiques à la résolution de problèmes combinatoires et à la découverte scientifique automatisée --- nous avons positionné les QEEA comme une technologie habilitante clé pour la prochaine génération d\'IA.

#### 65.14.2 Vision future : Le rôle des QEEA à l\'ère de l\'informatique quantique tolérante aux pannes

L\'ère NISQ actuelle, avec ses contraintes de bruit et de cohérence, ne nous permet d\'entrevoir qu\'une fraction du potentiel des QEEA. La véritable révolution se produira avec l\'avènement de l\'**informatique quantique tolérante aux pannes** (*Fault-Tolerant Quantum Computing*, FTQC). Dans cette ère future, les ordinateurs quantiques seront capables d\'exécuter des circuits de profondeur arbitraire avec une très grande fidélité, grâce à la correction d\'erreurs quantiques.

