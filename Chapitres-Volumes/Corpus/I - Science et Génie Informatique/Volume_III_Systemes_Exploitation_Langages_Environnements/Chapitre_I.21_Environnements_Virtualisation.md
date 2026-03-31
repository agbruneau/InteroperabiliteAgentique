# Chapitre I.21 : Environnements d\'Exécution et Virtualisation

### **Introduction**

Ce chapitre se propose d\'explorer les couches d\'abstraction logicielles qui constituent le fondement des systèmes informatiques modernes. Dans l\'ingénierie des systèmes complexes, la distance conceptuelle entre le code applicatif écrit par un développeur et les circuits électroniques du processeur qui l\'exécutent est immense. Cette distance est comblée par une hiérarchie de services et d\'environnements, chacun résolvant des problèmes spécifiques à son niveau d\'abstraction. Notre parcours débutera au niveau le plus fondamental de l\'exécution d\'un programme : la manière dont les instructions sont interprétées et optimisées dynamiquement. Nous examinerons ensuite la gestion de la mémoire au sein d\'un unique processus, en disséquant les mécanismes de la pile et du tas, pour ensuite plonger dans la complexité et l\'élégance des systèmes de récupération de mémoire automatique, ou *garbage collectors*, qui sont devenus la pierre angulaire des langages de programmation contemporains.

Forts de cette compréhension de l\'environnement d\'exécution d\'un processus unique, encapsulé dans des machines virtuelles applicatives comme la JVM et le CLR, nous élargirons notre perspective. Nous nous élèverons d\'un niveau d\'abstraction pour aborder la virtualisation au niveau du système. Ici, l\'objectif n\'est plus de gérer une seule application, mais de faire coexister plusieurs systèmes d\'exploitation complets et isolés sur une unique machine physique. Nous analyserons l\'architecture des hyperviseurs, la technologie qui rend cette coexistence possible, en distinguant les approches natives (*bare-metal*) des approches hébergées, et en soulignant le rôle transformateur des extensions matérielles des processeurs.

Enfin, nous atteindrons le sommet de cette hiérarchie d\'abstraction avec l\'étude de la conteneurisation et de son orchestration. Cette dernière révolution dans la gestion des infrastructures logicielles propose une forme de virtualisation plus légère, au niveau du système d\'exploitation, qui a radicalement transformé la manière dont les applications sont conçues, déployées et mises à l\'échelle. En disséquant des technologies comme Docker et Kubernetes, nous comprendrons comment les principes d\'isolation et de gestion des ressources sont appliqués non plus à des machines, mais à des applications distribuées, permettant de gérer des milliers de microservices dans de vastes centres de données.

Pour l\'architecte de systèmes, l\'ingénieur en fiabilité de site (SRE) ou le développeur d\'applications performantes, une maîtrise de ces couches est non plus une option, mais une nécessité. Comprendre les compromis entre l\'interprétation et la compilation juste-à-temps, les subtilités d\'un collecteur de mémoire générationnel, la différence fondamentale entre une machine virtuelle et un conteneur, ou encore les abstractions d\'un orchestrateur comme Kubernetes, est ce qui permet de concevoir des systèmes non seulement fonctionnels, mais aussi robustes, performants, évolutifs et résilients. Ce chapitre a pour ambition de fournir les fondements théoriques et architecturaux nécessaires pour naviguer avec expertise dans cet univers complexe de couches logicielles.

## 21.1 Interpréteurs et Compilation Juste-à-Temps (JIT)

L\'exécution d\'un programme informatique représente un compromis fondamental entre la portabilité du code source et la performance du code machine. Historiquement, deux approches distinctes ont dominé : la compilation anticipée (Ahead-Of-Time, AOT), où le code source est traduit en code machine spécifique à une architecture avant l\'exécution, et l\'interprétation, où le code source est lu et exécuté instruction par instruction par un programme tiers. Ce premier segment du chapitre explore une troisième voie, une synthèse puissante qui domine l\'écosystème des langages modernes : l\'exécution par une machine virtuelle de processus, optimisée dynamiquement par une compilation juste-à-temps.

### 21.1.1 Le paradigme de l\'exécution par machine virtuelle de processus

La décision de compiler un programme en code natif ou de l\'exécuter via une couche d\'abstraction logicielle est l\'une des plus structurantes dans la conception d\'un langage de programmation. La compilation AOT, typique de langages comme le C ou le C++, offre des performances maximales en produisant un exécutable directement compréhensible par le processeur. Cependant, cette performance se paie au prix de la portabilité : un programme compilé pour une architecture x86-64 sous Windows ne fonctionnera pas sur une architecture ARM sous Linux. Chaque couple plateforme-système d\'exploitation requiert une compilation distincte.

Face à ce défi, le paradigme de la machine virtuelle de processus (ou machine virtuelle applicative) propose une solution élégante. L\'idée est d\'introduire une couche d\'abstraction, la machine virtuelle (VM), qui expose un environnement d\'exécution standardisé, quel que soit le matériel ou le système d\'exploitation sous-jacent. Le programme n\'est plus compilé pour une machine physique, mais pour cette machine virtuelle. Cette approche est au cœur de la célèbre promesse de Java : « Write Once, Run Anywhere » (Écrire une fois, exécuter partout). Pour que ce paradigme fonctionne, il faut un format de code intermédiaire, un langage que cette machine virtuelle peut comprendre. Ce format est le

**bytecode**.

#### Le concept de Bytecode

Le bytecode est un jeu d\'instructions de bas niveau, conçu pour être compact et efficace à exécuter par un interpréteur ou une machine virtuelle, tout en restant indépendant de toute architecture matérielle spécifique. Il se situe à mi-chemin entre le code source de haut niveau, lisible par l\'humain, et le code machine, directement exécutable par le processeur. Par exemple, lorsqu\'un programme Java est compilé (

javac), le résultat n\'est pas un fichier .exe mais un fichier .class contenant du bytecode Java. De même, le code Python est compilé en bytecode (.pyc) avant d\'être exécuté par l\'interpréteur Python.

Cette représentation intermédiaire offre plusieurs avantages. Premièrement, elle est beaucoup plus rapide à interpréter que le code source brut. L\'analyse lexicale, l\'analyse syntaxique et l\'analyse sémantique ont déjà été effectuées par le compilateur initial. L\'interpréteur de bytecode travaille sur une structure déjà validée et optimisée pour l\'exécution. Deuxièmement, le bytecode peut intégrer des informations de plus haut niveau que le code machine, comme des métadonnées sur les types, ce qui facilite la vérification de la sécurité et l\'exécution dynamique.

#### Architecture d\'un interpréteur de bytecode pur

Le cœur d\'un interpréteur de bytecode est une boucle d\'évaluation, souvent appelée le cycle fetch-decode-execute. Ce cycle se répète continuellement jusqu\'à la fin du programme.

1.  **Fetch (Récupération) :** L\'interpréteur lit la prochaine instruction de bytecode à partir du flux de code. Un pointeur d\'instruction, analogue au *program counter* d\'un processeur physique, maintient la position actuelle dans le code.

2.  **Decode (Décodage) :** L\'interpréteur identifie l\'opération à effectuer à partir de l\'opcode (le code de l\'opération) de l\'instruction. Il récupère également les éventuels opérandes qui suivent l\'opcode.

3.  **Execute (Exécution) :** L\'interpréteur exécute l\'opération correspondante. Cela implique de traduire l\'instruction de bytecode en une ou plusieurs instructions machine natives que le processeur hôte peut exécuter.

De nombreuses machines virtuelles, dont la JVM de Java et l\'interpréteur CPython, sont des **machines virtuelles à pile** (*stack-based virtual machines*). Dans ce modèle, la plupart des opérations ne manipulent pas directement des registres ou des adresses mémoire, mais opèrent sur une structure de données LIFO (Last-In, First-Out) appelée la pile d\'opérandes.

Considérons un exemple simple de bytecode pour l\'addition de deux nombres, 4 et 5 :

ICONST_4 // Pousse la constante entière 4 sur la pile d\'opérandes\
ICONST_5 // Pousse la constante entière 5 sur la pile d\'opérandes\
IADD // Dépile les deux valeurs du sommet (5 et 4), les additionne, et pousse le résultat (9) sur la pile

L\'interpréteur exécute ces instructions séquentiellement :

- ICONST_4 : L\'interpréteur lit l\'opcode, le décode comme \"pousser une constante entière\", et place la valeur 4 au sommet de la pile. La pile contient \`\`.

- ICONST_5 : L\'interpréteur fait de même pour la valeur 5. La pile contient \`\`.

- IADD : L\'interpréteur lit l\'opcode, le décode comme \"addition entière\". Il dépile les deux valeurs du sommet (5 puis 4), les additionne (5+4=9), et pousse le résultat sur la pile. La pile contient maintenant \`\`.

Ce modèle à pile est simple à implémenter et produit un bytecode très compact, car les opérandes sont implicites (ils sont toujours au sommet de la pile). Cependant, l\'interprétation pure, instruction par instruction, a une faiblesse majeure : sa performance.

### 21.1.2 La compilation Juste-à-Temps (JIT) : l\'optimisation dynamique

L\'interprétation pure est intrinsèquement lente, car pour chaque instruction de bytecode, l\'interpréteur doit effectuer le travail de décodage et de traduction en code machine, même si cette instruction est exécutée des millions de fois à l\'intérieur d\'une boucle. C\'est ce surcoût répétitif qui limite la performance des systèmes purement interprétés.

La compilation Juste-à-Temps (JIT) a été introduite pour surmonter cette limitation. Le JIT est une technique hybride qui combine la portabilité de l\'interprétation avec la vitesse du code natif. L\'idée fondamentale est de ne pas interpréter indéfiniment le code, mais de le compiler en code machine natif *à la volée*, pendant que l\'application est en cours d\'exécution.

#### Principe fondamental du JIT

Lorsqu\'une application démarre dans un environnement JIT, son code est d\'abord exécuté par l\'interpréteur. L\'interpréteur a l\'avantage de démarrer l\'exécution immédiatement, sans délai de compilation. Cependant, en parallèle, le moteur d\'exécution (le *runtime*) surveille l\'application pour identifier les parties du code qui sont exécutées le plus fréquemment. Une fois ces parties identifiées, le compilateur JIT entre en jeu. Il prend le bytecode de ces sections de code \"chaudes\" et le compile en code machine optimisé, spécifique au processeur et au système d\'exploitation de l\'hôte.

#### Le rôle du cache de code (Code Cache)

Ce code natif fraîchement généré n\'est pas jeté. Il est stocké dans une zone de mémoire spéciale et dédiée, appelée le **cache de code** (*code cache*). Le moteur d\'exécution met alors à jour ses structures internes pour que les futurs appels à cette portion de code ne passent plus par l\'interpréteur, mais exécutent directement le code natif stocké dans le cache de code.

Ce processus est transparent pour l\'application. Le résultat est un système qui \"s\'échauffe\" avec le temps : il démarre en mode interprété (plus lent) et devient progressivement plus rapide à mesure que de plus en plus de parties du code sont compilées en natif et optimisées. Le JIT permet donc d\'obtenir des performances qui, à l\'état stable, peuvent rivaliser avec, voire dépasser, celles du code compilé en AOT. En effet, le compilateur JIT a un avantage majeur sur un compilateur AOT : il opère au moment de l\'exécution et a donc accès à des informations dynamiques sur la manière dont le code est réellement utilisé (par exemple, quelles branches d\'un if sont les plus souvent prises), ce qui lui permet de réaliser des optimisations contextuelles impossibles pour un compilateur statique.

### 21.1.3 Le profilage et l\'identification des \"points chauds\" (Hotspots)

La compilation de l\'intégralité d\'une application au démarrage serait contre-productive : cela retarderait considérablement le lancement et gaspillerait des ressources à compiler du code qui ne sera peut-être jamais exécuté. Le succès des compilateurs JIT modernes repose sur leur capacité à être sélectifs, en concentrant leurs efforts d\'optimisation là où ils auront le plus d\'impact. C\'est le rôle du profilage.

#### Le concept de \"Hotspot\"

Le terme \"HotSpot\", qui donne son nom à la machine virtuelle Java la plus répandue, est au cœur de cette stratégie. Il est basé sur l\'observation empirique, souvent assimilée au principe de Pareto, qu\'une très petite fraction du code d\'une application (par exemple, 10-20%) est responsable de la grande majorité de son temps d\'exécution (80-90%). Ces portions de code exécutées de manière intensive sont appelées des **points chauds** ou *hotspots*. Il s\'agit typiquement de boucles critiques ou de méthodes fréquemment invoquées. L\'objectif du moteur d\'exécution est donc d\'identifier précisément ces

*hotspots* pour ne compiler que ceux-ci, maximisant ainsi le retour sur investissement de l\'effort de compilation.

#### Mécanismes de profilage

Pour détecter les *hotspots*, le moteur d\'exécution doit collecter des données sur le comportement de l\'application. Ce processus est appelé le **profilage** (*profiling*). La JVM HotSpot utilise principalement deux types de compteurs qui sont incrémentés par l\'interpréteur à chaque exécution de code  :

1.  **Compteur d\'invocation de méthode :** Chaque fois qu\'une méthode est appelée, son compteur d\'invocation est incrémenté.

2.  **Compteur de sauts arrière (*back-edge counter*) :** Ce compteur est incrémenté à chaque fois qu\'une boucle effectue un saut en arrière (c\'est-à-dire qu\'elle exécute une nouvelle itération). Cela permet de détecter les boucles intensives même si la méthode qui les contient n\'est appelée qu\'une seule fois.

#### Le seuil de compilation (Compile Threshold)

Le moteur d\'exécution ne déclenche pas la compilation immédiatement. Il attend que la \"chaleur\" d\'une méthode, une combinaison de ses invocations et de l\'activité de ses boucles, dépasse un certain **seuil de compilation** (*compile threshold*). Par exemple, dans la configuration \"serveur\" par défaut de la JVM HotSpot, ce seuil est de 10 000. Lorsqu\'une méthode franchit ce seuil, elle est considérée comme \"chaude\" et est ajoutée à une file d\'attente pour être traitée par un des fils d\'exécution (

*threads*) du compilateur JIT. Ce mécanisme de seuil garantit que seules les méthodes qui ont prouvé leur importance pour la performance de l\'application sont soumises au processus de compilation, qui est lui-même coûteux en ressources.

### 21.1.4 Étude de cas : La compilation à plusieurs niveaux (Tiered Compilation) de la JVM HotSpot

Les premières implémentations de JIT faisaient face à un dilemme : fallait-il utiliser un compilateur rapide qui produit un code moyennement optimisé, ou un compilateur lent qui génère un code très performant? Le premier favorise un temps de démarrage rapide et est idéal pour les applications interactives (mode \"client\"), tandis que le second maximise la performance à long terme, ce qui est crucial pour les applications serveur (mode \"serveur\"). La JVM HotSpot moderne résout ce dilemme avec une approche sophistiquée appelée la

**compilation à plusieurs niveaux** (*tiered compilation*), qui combine le meilleur des deux mondes.

Cette architecture définit une hiérarchie de niveaux d\'exécution, allant de l\'interprétation pure à la compilation hautement optimisée. Une méthode peut être promue d\'un niveau à l\'autre au fur et à mesure que le runtime accumule des certitudes sur son importance.

#### Niveau 0 : Interprétation

Toute méthode commence son exécution au niveau 0, en mode interprété. Ce mode, bien que le plus lent, offre deux avantages cruciaux : il permet un démarrage instantané de l\'application et il est instrumenté pour collecter les données de profilage (les compteurs d\'invocation et de sauts arrière) qui alimenteront les décisions de compilation futures.

#### Niveaux 1, 2 et 3 : Le compilateur client (C1)

Après avoir atteint un premier seuil de \"chaleur\", une méthode est éligible pour la compilation par le compilateur **C1**, également connu sous le nom de compilateur \"client\". Le C1 est conçu pour être très rapide. Il effectue des optimisations de base, comme l\'élimination de certaines indirections et l\'inlining (intégration du corps d\'une méthode appelée directement dans le code de l\'appelant) de petites méthodes. Son objectif principal n\'est pas de produire le code le plus rapide possible, mais de fournir une amélioration significative de la performance par rapport à l\'interpréteur avec une latence de compilation minimale. Cela permet à l\'application de \"s\'échauffer\" rapidement. Le code compilé par C1 peut lui-même être instrumenté pour continuer à collecter des données de profilage plus fines.

#### Niveau 4 : Le compilateur serveur (C2)

Si une méthode, déjà compilée par C1, continue d\'être exécutée de manière très intensive et franchit un second seuil, beaucoup plus élevé, elle devient candidate à la recompilation par le compilateur **C2**, ou compilateur \"serveur\". C2 est un monstre d\'optimisation. Il prend beaucoup plus de temps et consomme plus de mémoire que C1, mais il met en œuvre un large éventail d\'optimisations avancées et agressives, basées sur les données de profilage détaillées collectées aux niveaux précédents. Parmi ces optimisations, on trouve :

- **Analyse d\'échappement (*Escape Analysis*) :** Détermine si un objet créé dans une méthode \"s\'échappe\" de son contexte. Si ce n\'est pas le cas, l\'objet peut être alloué sur la pile au lieu du tas, ce qui est beaucoup plus rapide et évite la pression sur le *garbage collector*.

- **Optimisations de boucles :** Déroulage de boucles, fusion de boucles, et déplacement de code invariant hors des boucles.

- **Inlining agressif :** Intégration de méthodes plus grandes, y compris des appels virtuels qui peuvent être \"dévirtualisés\" si le profilage montre qu\'un type concret est toujours utilisé à un site d\'appel particulier.

- **Élimination de code mort et de vérifications redondantes.**

Le code produit par C2 est un code machine de très haute performance, conçu pour l\'exécution à long terme des *hotspots* les plus critiques de l\'application.

#### La déoptimisation : le filet de sécurité pour les optimisations spéculatives

L\'un des aspects les plus puissants du compilateur C2 est sa capacité à effectuer des **optimisations spéculatives**. En se basant sur les données de profilage, le compilateur peut faire des hypothèses sur le comportement futur du code. Par exemple, si une instruction if (condition) a toujours vu condition être true des milliers de fois, le compilateur peut générer du code qui suppose que condition sera toujours true, éliminant ainsi la branche else et optimisant agressivement le chemin true.

Mais que se passe-t-il si, après des millions d\'exécutions, la condition devient soudainement false? C\'est là qu\'intervient la **déoptimisation**. Le code optimisé contient des gardes qui vérifient la validité des hypothèses. Si une garde échoue, le moteur d\'exécution déclenche un \"piège\" (*trap*). L\'exécution du code natif optimisé est immédiatement interrompue, l\'état du programme est reconstruit pour correspondre à ce qu\'il aurait été dans l\'interpréteur, et l\'exécution reprend au niveau 0, en mode interprété, à l\'endroit exact où l\'hypothèse a échoué. La méthode pourra être recompilée plus tard, cette fois-ci sans l\'hypothèse erronée. La déoptimisation est un mécanisme crucial qui agit comme un filet de sécurité, permettant au compilateur JIT de réaliser des optimisations très agressives tout en garantissant la correction sémantique du programme.

En conclusion, la compilation JIT à plusieurs niveaux représente une solution d\'ingénierie remarquable au conflit historique entre performance et portabilité. En traitant l\'exécution du code non pas comme un événement statique mais comme un processus dynamique à optimiser, des systèmes comme la JVM HotSpot parviennent à offrir un démarrage rapide, une montée en puissance progressive, et une performance de pointe exceptionnelle pour les charges de travail de longue durée. Cette architecture adaptative est l\'une des raisons fondamentales du succès des langages gérés dans la construction de systèmes logiciels complexes et performants.

## 21.2 Gestion de la Mémoire d\'Exécution (Pile, Tas)

Après avoir exploré la manière dont les instructions d\'un programme sont transformées en opérations machine, il est essentiel de se pencher sur la gestion de l\'espace où ces opérations manipulent leurs données : la mémoire. Du point de vue d\'un programme en cours d\'exécution, la mémoire n\'est pas une entité monolithique. Le système d\'exploitation et l\'environnement d\'exécution collaborent pour structurer l\'espace d\'adressage du processus en plusieurs régions distinctes, chacune ayant un rôle, une structure et un cycle de vie spécifiques. Les deux régions les plus importantes pour le stockage des données d\'une application sont la pile (*stack*) et le tas (*heap*). Comprendre leur fonctionnement et leurs différences est fondamental pour saisir les enjeux de la gestion de la mémoire, qu\'elle soit manuelle ou automatique.

### 21.2.1 L\'espace d\'adressage d\'un processus : une vue d\'ensemble

Lorsqu\'un système d\'exploitation lance un programme, il ne lui donne pas un accès direct à la mémoire physique de la machine. Il crée plutôt une abstraction : un **espace d\'adressage virtuel**. Cet espace est une vue linéaire et contiguë de la mémoire, privée et isolée de tous les autres processus s\'exécutant sur le système. C\'est à l\'intérieur de cet espace virtuel que le programme organise ses données et son code.

Cet espace est traditionnellement divisé en plusieurs segments principaux  :

- **Segment de texte (.text) :** Contient les instructions machine exécutables du programme. Cette zone est généralement en lecture seule pour empêcher le programme de se modifier lui-même accidentellement.

- **Segments de données (.data et .bss) :** Contiennent les variables globales et statiques. Le segment .data stocke celles qui sont initialisées avec une valeur non nulle dans le code source, tandis que le segment .bss stocke celles qui sont non initialisées ou initialisées à zéro (le système d\'exploitation se charge de les mettre à zéro au démarrage).

- **Le Tas (*Heap*) :** Une région de mémoire qui croît généralement des adresses basses vers les adresses hautes. Elle est utilisée pour l\'allocation dynamique de mémoire.

- **La Pile (*Stack*) :** Une région de mémoire qui croît en sens inverse, des adresses hautes vers les adresses basses. Elle est utilisée pour gérer les appels de fonction.

L\'organisation avec le tas et la pile croissant l\'un vers l\'autre permet à l\'espace libre entre eux d\'être utilisé de manière flexible par l\'une ou l\'autre des régions, en fonction des besoins du programme.

### 21.2.2 La Pile (The Stack) : Gestion structurée et automatique

La pile d\'exécution, ou *call stack*, est une composante essentielle de l\'exécution de presque tous les langages de programmation procéduraux et orientés objet. Son fonctionnement est intrinsèquement lié à la sémantique des appels de fonction.

#### Rôle et structure LIFO

La pile est une structure de données de type **\"Dernier Entré, Premier Sorti\" (LIFO)**, à l\'image d\'une pile d\'assiettes : on ne peut ajouter ou retirer une assiette qu\'au sommet. Cette structure est parfaitement adaptée à la nature imbriquée des appels de fonction. Quand une fonction

main() appelle une fonction f1(), et que f1() appelle f2(), l\'ordre de retour sera f2(), puis f1(), puis main(). La dernière fonction appelée est la première à se terminer. La taille de la pile est généralement fixée au démarrage du fil d\'exécution (

*thread*) et est relativement limitée (quelques mégaoctets), ce qui la rend impropre au stockage de très grandes structures de données.

#### Les Cadres de Pile (Stack Frames)

À chaque fois qu\'une fonction est appelée, un bloc de mémoire est alloué au sommet de la pile. Ce bloc est appelé un **cadre de pile** (*stack frame*) ou un enregistrement d\'activation (*activation record*). Ce cadre contient toutes les informations nécessaires à l\'exécution de cette instance spécifique de la fonction. Lorsque la fonction se termine, son cadre de pile est \"dépilé\" (

*popped*), libérant ainsi l\'espace qu\'il occupait.

#### Contenu d\'un cadre de pile

Un cadre de pile est une structure de données bien définie qui contient typiquement les éléments suivants  :

1.  **L\'adresse de retour :** C\'est l\'adresse de l\'instruction dans la fonction appelante où l\'exécution doit reprendre une fois la fonction actuelle terminée. C\'est le mécanisme qui permet au programme de \"revenir en arrière\" après un appel de fonction.

2.  **Les paramètres de la fonction :** Les valeurs passées en argument à la fonction sont copiées dans son cadre de pile, les rendant accessibles comme des variables locales.

3.  **Les variables locales :** Tout l\'espace nécessaire pour les variables déclarées à l\'intérieur de la fonction est alloué au sein de son cadre de pile. C\'est pourquoi leur durée de vie est limitée à celle de la fonction : lorsque le cadre est détruit, les variables locales disparaissent avec lui.

4.  **Pointeur vers le cadre de pile précédent :** Un pointeur (souvent stocké dans un registre dédié comme EBP sur l\'architecture x86) pointe vers le début du cadre de pile de la fonction appelante. Cela permet de chaîner les cadres de pile et de remonter la séquence d\'appels, ce qui est crucial pour le débogage (les *stack traces*).

5.  **Sauvegarde des registres :** L\'état des registres du processeur de la fonction appelante peut être sauvegardé dans le cadre de pile pour être restauré au retour, garantissant que l\'appel de fonction n\'a pas d\'effets de bord sur le contexte de l\'appelant.

#### Allocation et désallocation : rapidité et automatisme

La gestion de la mémoire sur la pile est extrêmement efficace. L\'allocation d\'un nouveau cadre de pile se résume à une seule opération : décrémenter la valeur d\'un registre spécial du processeur, le **pointeur de pile** (*stack pointer*, ESP sur x86), de la taille du cadre requis. De même, la désallocation consiste simplement à incrémenter ce même pointeur. Il n\'y a pas d\'algorithme de recherche complexe pour trouver un bloc de mémoire libre. Cette simplicité mécanique fait de l\'allocation sur la pile une opération à coût quasi nul. C\'est en raison de ce mécanisme que les variables locales sont souvent qualifiées de \"variables automatiques\" : leur allocation et leur libération sont gérées automatiquement et implicitement par le compilateur et le matériel, sans intervention du programmeur.

### 21.2.3 Le Tas (The Heap) : L\'allocation dynamique

Si la pile est parfaite pour les données dont la durée de vie est liée à celle d\'une fonction, elle est inadéquate pour les objets qui doivent survivre à la fonction qui les a créés. Par exemple, une fonction qui lit des données depuis un fichier et retourne une structure de données complexe ne peut pas allouer cette structure sur sa propre pile, car elle serait détruite dès le retour de la fonction.

C\'est là qu\'intervient le **tas** (*heap*). Le tas est une grande région de mémoire, beaucoup moins structurée que la pile, dédiée à l\'**allocation dynamique**. Contrairement à la pile, la taille et la durée de vie des objets alloués sur le tas ne sont pas déterminées à la compilation. Le programme peut demander des blocs de mémoire de taille variable à n\'importe quel moment de son exécution. La taille totale des objets alloués sur le tas n\'est limitée que par la quantité de mémoire virtuelle disponible pour le processus.

Dans des langages comme le C ou le C++, cette gestion est explicite et manuelle. Le programmeur utilise des fonctions comme malloc() ou des opérateurs comme new pour demander un bloc de mémoire sur le tas. Ces fonctions retournent un pointeur (une adresse) vers le début du bloc alloué. Il est ensuite de la responsabilité du programmeur de libérer explicitement cette mémoire en utilisant free() ou delete lorsque l\'objet n\'est plus nécessaire.

### 21.2.4 Les périls de la gestion manuelle de la mémoire

Cette flexibilité offerte par le tas a un coût élevé en termes de complexité et de risque d\'erreurs. La gestion manuelle de la mémoire est notoirement difficile et constitue l\'une des sources de bogues les plus insidieuses et les plus graves en programmation système.

#### Fuites de mémoire (Memory Leaks)

Une fuite de mémoire se produit lorsqu\'un programme alloue de la mémoire sur le tas mais oublie de la libérer. Si un objet alloué dynamiquement devient inaccessible (par exemple, le seul pointeur qui y faisait référence sort de sa portée ou est réassigné), mais que free() ou delete n\'est pas appelé, la mémoire occupée par cet objet reste marquée comme \"utilisée\" et ne peut pas être réallouée. Dans les applications de longue durée comme les serveurs, l\'accumulation de ces fuites peut progressivement consommer toute la mémoire disponible, conduisant à un ralentissement des performances et, finalement, à un crash du programme par épuisement de la mémoire (*Out Of Memory*).

#### Pointeurs fous (Dangling Pointers) et Double libération (Double Free)

Le problème inverse est tout aussi dangereux. Un **pointeur fou** (*dangling pointer*) est un pointeur qui continue de faire référence à une zone de mémoire qui a déjà été libérée. Si le programme tente d\'accéder à la mémoire via ce pointeur, le comportement est indéfini : il peut lire des données invalides, corrompre une nouvelle structure de données qui a été allouée au même endroit, ou provoquer un crash. Un cas particulier est la **double libération**, où le programme tente de libérer deux fois la même zone de mémoire, ce qui peut corrompre les structures de données internes de l\'allocateur de mémoire et mener à des failles de sécurité exploitables.

#### Fragmentation de la mémoire

Même avec une gestion parfaite (pas de fuites ni de pointeurs fous), l\'allocation dynamique sur le tas fait face à un problème inhérent : la fragmentation. La fragmentation se produit lorsque l\'espace mémoire libre est divisé en de nombreux petits morceaux non contigus, rendant difficile l\'allocation de blocs plus grands. On distingue deux types de fragmentation :

- **Fragmentation interne :** Elle se produit lorsque l\'allocateur de mémoire réserve un bloc légèrement plus grand que la taille demandée par le programme. Cela peut être dû à des contraintes d\'alignement ou à la stratégie de l\'allocateur qui gère des blocs de tailles prédéfinies. L\'espace inutilisé *à l\'intérieur* du bloc alloué est perdu et constitue la fragmentation interne. Par exemple, si une application demande 1 octet et que l\'allocateur, pour des raisons de gestion interne, alloue un bloc de 16 octets, il y a 15 octets de fragmentation interne.

- **Fragmentation externe :** C\'est le problème le plus sérieux. Au fur et à mesure que le programme alloue et libère des blocs de tailles diverses, le tas se parsème de \"trous\" de mémoire libre. Il peut arriver un moment où la somme totale de la mémoire libre est importante, mais où aucun trou unique n\'est suffisamment grand pour satisfaire une nouvelle demande d\'allocation. L\'espace est disponible, mais pas de manière contiguë, ce qui peut provoquer un échec d\'allocation prématuré.

En somme, la dichotomie entre la pile et le tas reflète un compromis architectural fondamental. La pile offre une gestion de la mémoire à la fois extrêmement rapide, déterministe et sûre, mais elle est limitée par sa taille et par le fait que la durée de vie des données est strictement liée à la portée lexicale des fonctions. Le tas, quant à lui, fournit la flexibilité indispensable pour les structures de données dynamiques dont la durée de vie est imprévisible. Cependant, en mode de gestion manuelle, cette flexibilité se paie par une complexité accrue et un risque omniprésent d\'erreurs graves. C\'est précisément pour pallier ces difficultés que les environnements d\'exécution modernes ont intégré des mécanismes de gestion automatique de la mémoire, un sujet que nous aborderons en profondeur dans la section suivante.

## 21.3 Récupération de mémoire automatique (Garbage Collection)

Les défis et les dangers inhérents à la gestion manuelle de la mémoire, décrits dans la section précédente, ont motivé la recherche et le développement de techniques pour automatiser ce processus. La récupération de mémoire automatique, plus connue sous le nom de *garbage collection* (GC), est une composante essentielle des environnements d\'exécution modernes, tels que la JVM et le CLR. En déchargeant le programmeur de la responsabilité de libérer explicitement la mémoire, le GC améliore considérablement la robustesse et la sécurité des applications, tout en augmentant la productivité des développeurs. Ce segment explore les principes fondamentaux du GC et dissèque les algorithmes classiques qui en constituent la base.

### 21.3.1 Introduction au Garbage Collection (GC)

Un *garbage collector* est un sous-système de l\'environnement d\'exécution qui a pour mission d\'identifier et de récupérer la mémoire occupée par des objets qui ne sont plus utilisés par le programme, afin de la rendre disponible pour de nouvelles allocations.

#### Principe de base et notion d\'accessibilité (Reachability)

La question centrale pour tout GC est de déterminer si un objet est \"encore utilisé\". La plupart des algorithmes de GC modernes ne tentent pas de répondre à cette question sémantique complexe, mais à une question plus simple et plus sûre : un objet est-il \"accessible\"?

Un objet est considéré comme **accessible** (*reachable*) s\'il existe un chemin de références (de pointeurs) menant à lui à partir d\'un ensemble bien défini de points de départ, appelés les **racines** (*roots*). Les racines sont des références qui se trouvent en dehors du tas et qui sont, par définition, directement accessibles par le programme. Cet ensemble de racines inclut typiquement :

- Les références contenues dans les variables locales sur les piles de tous les fils d\'exécution (*threads*).

- Les références dans les variables statiques (globales) des classes.

- Les références détenues depuis du code natif via des interfaces comme le JNI (Java Native Interface).

Tout objet qui n\'est pas accessible depuis cet ensemble de racines est considéré comme du \"déchet\" (*garbage*) et peut être collecté en toute sécurité, car le programme n\'a plus aucun moyen de l\'atteindre. Cette approche est conservatrice : un objet inaccessible est définitivement inutilisé, mais un objet accessible n\'est pas nécessairement encore utile (il pourrait ne plus jamais être accédé par le programme, même s\'il existe une référence vers lui). Cependant, cette approximation garantit la correction du programme : le GC ne libérera jamais un objet que le programme pourrait encore utiliser.

#### Métriques de performance du GC

L\'efficacité d\'un algorithme de GC n\'est pas une mesure unique, mais un équilibre entre trois métriques souvent contradictoires  :

1.  **Débit (*Throughput*) :** Représente la proportion du temps total que l\'application passe à exécuter son propre code, par opposition au temps passé dans le GC. Un GC à haut débit minimise le surcoût global, ce qui est crucial pour les applications de type *batch* ou de calcul intensif.

2.  **Latence (*Latency*) :** Fait référence à la durée des pauses imposées à l\'application par le GC. De nombreux algorithmes nécessitent d\'arrêter l\'application (une pause \"Stop-The-World\") pour effectuer leur travail en toute sécurité. Une faible latence (des pauses courtes et prévisibles) est essentielle pour les applications interactives, les interfaces utilisateur et les systèmes temps réel.

3.  **Empreinte mémoire (*Memory Footprint*) :** Désigne la quantité de mémoire supplémentaire que le GC lui-même requiert pour fonctionner (pour ses structures de données, etc.), ainsi que la taille totale du tas nécessaire pour que l\'application fonctionne à un niveau de performance acceptable.

La conception d\'un GC est un art du compromis. Un algorithme qui optimise agressivement le débit peut le faire au prix de pauses longues et imprévisibles. Inversement, un algorithme conçu pour une latence minimale peut sacrifier une partie du débit ou nécessiter une plus grande empreinte mémoire.

### 21.3.2 Algorithme 1 : Le Comptage de Références (Reference Counting)

Le comptage de références est l\'une des plus anciennes et des plus simples stratégies de récupération de mémoire automatique.

#### Mécanisme

Le principe est simple : chaque objet alloué sur le tas est doté d\'un champ supplémentaire, un **compteur de références**. Ce compteur conserve le nombre de références (pointeurs) qui pointent actuellement vers cet objet. Le moteur d\'exécution doit intercepter toutes les opérations d\'assignation de pointeurs pour maintenir ces compteurs à jour :

- Lorsqu\'une nouvelle référence est créée vers un objet (par exemple, p2 = p1;), le compteur de l\'objet pointé est **incrémenté**.

- Lorsqu\'une référence est détruite (par exemple, un pointeur sort de sa portée ou est réassigné à null ou à un autre objet), le compteur de l\'objet précédemment pointé est **décrémenté**.

- Si la décrémentation d\'un compteur le fait tomber à **zéro**, cela signifie que l\'objet n\'est plus accessible. Sa mémoire est alors immédiatement récupérée. De plus, si cet objet contenait des références vers d\'autres objets, leurs compteurs respectifs sont à leur tour décrémentés, ce qui peut déclencher une cascade de récupérations.

#### Avantages et Inconvénients

Le principal avantage du comptage de références est que la récupération de la mémoire est **immédiate et déterministe**. Un objet est libéré dès que sa dernière référence disparaît. Le travail de récupération est ainsi distribué tout au long de l\'exécution de l\'application, ce qui permet d\'éviter les longues pauses caractéristiques d\'autres algorithmes.

Cependant, cette approche présente des inconvénients significatifs. Premièrement, le surcoût d\'exécution est constant : chaque opération d\'assignation de pointeur est ralentie par la nécessité de mettre à jour les compteurs, ce qui peut être coûteux pour les programmes qui manipulent intensivement les pointeurs. Deuxièmement, la gestion des compteurs dans un environnement multithreadé requiert des opérations atomiques, ce qui ajoute une complexité et un surcoût supplémentaires.

Mais l\'inconvénient le plus fondamental et le plus célèbre du comptage de références est son incapacité à gérer les **références cycliques**. Considérons deux objets, A et B, où A contient une référence vers B, et B contient une référence vers A. Leurs compteurs de références sont au moins à 1. Si toutes les références externes vers A et B sont détruites, le groupe {A, B} devient inaccessible depuis le reste du programme. Cependant, leurs compteurs de références resteront à 1 à cause de leurs références mutuelles. L\'algorithme de comptage de références ne les identifiera donc jamais comme des déchets, et leur mémoire ne sera jamais récupérée, créant ainsi une fuite de mémoire.

En raison de ce défaut majeur, le comptage de références pur est rarement utilisé dans les systèmes industriels modernes. Cependant, des systèmes comme CPython (l\'interpréteur de référence pour Python) l\'utilisent comme mécanisme principal, car il est efficace pour la majorité des objets. Pour résoudre le problème des cycles, il est complété par un algorithme de traçage distinct (un collecteur de cycles) qui est exécuté périodiquement pour détecter et récupérer ces structures cycliques.

### 21.3.3 Algorithme 2 : Marquage et Balayage (Mark-and-Sweep)

L\'algorithme de marquage et balayage est l\'archétype des **collecteurs traçants** (*tracing garbage collectors*). Contrairement au comptage de références, il ne suit pas les références en continu, mais détermine l\'accessibilité de manière périodique en parcourant activement le graphe des objets. Il fonctionne en deux phases distinctes.

#### Phase 1 : Marquage (Mark)

Cette phase a pour but d\'identifier tous les objets accessibles (vivants). Le processus commence à partir de l\'ensemble des **racines** (variables locales, statiques, etc.). Le collecteur effectue un parcours du graphe d\'objets (typiquement une recherche en profondeur ou en largeur) en suivant chaque référence. Chaque objet qu\'il atteint est \"marqué\" comme étant vivant. Pour ce faire, un bit est généralement réservé dans l\'en-tête de chaque objet (le *mark bit*). Si le parcours atteint un objet qui est déjà marqué, il n\'explore pas ses enfants une seconde fois, ce qui garantit la terminaison de l\'algorithme même en présence de cycles. À la fin de cette phase, tous les objets accessibles depuis les racines ont leur bit de marquage positionné à 1.

Voici un pseudo-code pour la phase de marquage récursive :

function Mark(object):\
if not object.is_marked():\
object.mark() // Positionne le bit de marquage à 1\
for each reference in object:\
Mark(reference.points_to)\
\
// Point d\'entrée de la phase de marquage\
function MarkPhase():\
for each root in Roots:\
Mark(root.points_to)

#### Phase 2 : Balayage (Sweep)

Une fois la phase de marquage terminée, la phase de balayage commence. Le collecteur parcourt linéairement l\'intégralité du tas, en examinant chaque objet l\'un après l\'autre. Pour chaque objet rencontré, il inspecte son bit de marquage :

- Si l\'objet est **marqué** (bit à 1), cela signifie qu\'il est vivant. Le collecteur le laisse en place et réinitialise simplement son bit de marquage à 0 en préparation du prochain cycle de GC.

- Si l\'objet n\'est **pas marqué** (bit à 0), cela signifie qu\'il est inaccessible. Sa mémoire est alors considérée comme libre et est ajoutée à une structure de données, généralement une **liste chaînée de blocs libres** (*free list*), pour pouvoir être réutilisée par l\'allocateur.

Le pseudo-code pour la phase de balayage est le suivant :

function SweepPhase():\
for each object in Heap:\
if object.is_marked():\
object.unmark() // Réinitialise le bit pour le prochain cycle\
else:\
Heap.release(object) // Ajoute la mémoire de l\'objet à la free list

#### Analyse de la performance

L\'algorithme Mark-and-Sweep présente des avantages et des inconvénients qui ont profondément influencé la conception des GC ultérieurs.

Son principal avantage est qu\'il gère correctement les **références cycliques**. Puisqu\'il détermine l\'accessibilité par un parcours depuis les racines, un groupe d\'objets cyclique qui n\'est pas atteignable depuis l\'extérieur ne sera jamais marqué et sera donc correctement collecté lors de la phase de balayage.

Cependant, ses inconvénients sont significatifs :

1.  **Pauses \"Stop-the-World\" (STW) :** L\'implémentation la plus simple de Mark-and-Sweep nécessite que l\'application soit complètement suspendue pendant toute la durée des deux phases. C\'est ce qu\'on appelle une pause \"Stop-The-World\" (STW). Si l\'application (le *mutator*) était autorisée à modifier le graphe d\'objets pendant que le collecteur le parcourt, le GC pourrait manquer de marquer un objet devenu accessible, conduisant à la libération erronée d\'un objet vivant (une violation de la correction). Pour des tas de grande taille, ces pauses peuvent durer de plusieurs centaines de millisecondes à plusieurs secondes, ce qui est inacceptable pour de nombreuses applications.

2.  **Fragmentation de la mémoire :** L\'algorithme Mark-and-Sweep ne déplace pas les objets. Il se contente de récupérer l\'espace des objets morts. Au fil du temps, le tas peut devenir très **fragmenté**, avec de nombreux petits blocs de mémoire libre dispersés entre les objets vivants. Cela peut conduire à des échecs d\'allocation même lorsqu\'il y a suffisamment de mémoire libre au total, car aucun bloc contigu n\'est assez grand. Pour contrer ce problème, certaines implémentations ajoutent une troisième phase optionnelle de\
    **compactage** (*compaction*), où tous les objets vivants sont déplacés pour être contigus au début du tas. Cependant, le compactage est une opération coûteuse qui allonge encore plus la pause STW.

### 21.3.4 Collectionneurs par Copie (Copying Collectors)

Les collecteurs par copie ont été conçus pour résoudre directement le problème de la fragmentation laissé par l\'algorithme Mark-and-Sweep.

#### Principe des semi-espaces

L\'approche la plus classique, connue sous le nom d\'algorithme de Cheney, divise le tas en deux régions de taille égale, appelées **semi-espaces** (*semi-spaces*). À un instant T, un seul des deux espaces est actif. Toutes les nouvelles allocations d\'objets se font dans cet espace actif, que nous appellerons l\'

**espace \"From\"**. L\'autre espace, l\'**espace \"To\"**, reste vide.

#### Déroulement de la collecte

L\'allocation se poursuit dans l\'espace \"From\" de manière très efficace, simplement en incrémentant un pointeur, jusqu\'à ce que l\'espace soit plein. À ce moment, un cycle de GC est déclenché :

1.  Le collecteur commence par parcourir les racines.

2.  Pour chaque objet accessible trouvé dans l\'espace \"From\", il le **copie** dans l\'espace \"To\".

3.  Après avoir copié un objet, il laisse à son ancien emplacement dans l\'espace \"From\" un **pointeur de redirection** (*forwarding pointer*) qui pointe vers sa nouvelle adresse dans l\'espace \"To\".

4.  Si, lors du parcours, le collecteur rencontre une référence vers un objet qui a déjà été copié (ce qu\'il peut vérifier en examinant l\'emplacement d\'origine de l\'objet), il met simplement à jour la référence avec la nouvelle adresse indiquée par le pointeur de redirection.

5.  Une fois que tous les objets accessibles ont été copiés dans l\'espace \"To\", tout ce qui reste dans l\'espace \"From\" est du déchet. L\'intégralité de l\'espace \"From\" peut être considérée comme libre sans avoir besoin de la parcourir.

6.  Enfin, les rôles des deux espaces sont **inversés** : l\'espace \"To\" (qui contient maintenant tous les objets vivants) devient le nouvel espace \"From\", et l\'ancien espace \"From\" (maintenant vide) devient le nouvel espace \"To\", prêt pour le prochain cycle de collecte.

#### Avantages et Inconvénients

Les collecteurs par copie offrent deux avantages majeurs :

- **Élimination totale de la fragmentation :** En copiant tous les objets vivants de manière contiguë, l\'algorithme compacte naturellement la mémoire à chaque cycle. Il n\'y a jamais de fragmentation externe.

- **Allocation extrêmement rapide :** Comme la mémoire libre est toujours un seul bloc contigu, l\'allocation d\'un nouvel objet se réduit à une simple incrémentation d\'un pointeur, une opération aussi rapide que l\'allocation sur la pile.

Le coût de la collecte est proportionnel au nombre d\'objets *vivants*, et non à la taille totale du tas (contrairement à la phase de balayage de Mark-and-Sweep). Cela le rend très efficace lorsque la proportion d\'objets survivants est faible.

Cependant, l\'inconvénient principal est rédhibitoire pour une utilisation généralisée : l\'**empreinte mémoire**. L\'algorithme nécessite de réserver en permanence le double de la mémoire réellement utilisée par les objets vivants, puisque l\'un des deux semi-espaces est toujours vide. Ce gaspillage de 50% de la mémoire est inacceptable pour la plupart des applications. De plus, le coût de la copie des objets et de la mise à jour de toutes les références peut être significatif si la proportion d\'objets vivants est élevée.

### 21.3.5 L\'approche hybride : Le Garbage Collection Générationnel

Aucun des algorithmes de base n\'est parfait. Le comptage de références échoue sur les cycles. Mark-and-Sweep crée des pauses et de la fragmentation. La copie gaspille la moitié de la mémoire. La solution adoptée par la quasi-totalité des environnements d\'exécution modernes (JVM, CLR, V8 pour JavaScript) est une approche hybride, basée sur une observation empirique puissante : l\'**hypothèse générationnelle**.

#### L\'hypothèse générationnelle faible (Weak Generational Hypothesis)

Cette hypothèse, validée par de nombreuses études sur des programmes réels, stipule deux choses  :

1.  **La plupart des objets meurent jeunes.** Une grande majorité des objets alloués deviennent des déchets très peu de temps après leur création (par exemple, des variables temporaires dans une méthode).

2.  **Peu de références pointent des objets anciens vers des objets plus récents.**

Cette observation est fondamentale. Si la plupart des objets meurent jeunes, il est inefficace de scanner et de traiter l\'ensemble du tas à chaque fois, car la majorité du travail consisterait à réexaminer sans cesse les mêmes objets à longue durée de vie.

#### Architecture à générations

L\'idée du GC générationnel est de \"diviser pour mieux régner\". Le tas est partitionné en plusieurs régions, appelées **générations**, en fonction de l\'âge des objets. L\'architecture la plus courante utilise deux (ou trois) générations :

- **La Jeune Génération (*Young Generation* ou *Nursery*) :** C\'est ici que tous les nouveaux objets sont alloués. Cet espace est maintenu relativement petit. Comme on s\'attend à ce que la plupart de ces objets meurent rapidement, cette génération est collectée très fréquemment.

- **La Vieille Génération (*Old Generation* ou *Tenured Space*) :** Cet espace, beaucoup plus grand, contient les objets qui ont survécu à un certain nombre de cycles de collecte dans la jeune génération. Ils sont considérés comme ayant une longue durée de vie et sont donc collectés beaucoup moins fréquemment.

#### Mécanisme de collecte

Cette architecture permet d\'utiliser des stratégies de collecte différentes et optimisées pour chaque génération :

- **Collecte Mineure (*Minor GC*) :** Il s\'agit d\'une collecte qui ne s\'applique **qu\'à la jeune génération**. Comme la plupart des objets y sont des déchets, la proportion d\'objets survivants est faible. C\'est le scénario idéal pour un **algorithme par copie**. La jeune génération est souvent elle-même subdivisée en une région \"Eden\" (où ont lieu les allocations) et deux \"espaces survivants\" (S0 et S1). Lors d\'une collecte mineure, les objets vivants de l\'Eden et d\'un des espaces survivants sont copiés dans l\'autre espace survivant. Les objets qui survivent à un certain nombre de collectes mineures (leur \"âge\" augmente) sont finalement **promus** dans la vieille génération. Ces collectes sont très rapides et fréquentes.

- **Collecte Majeure (*Major GC* ou *Full GC*) :** Lorsque la vieille génération commence à se remplir, une collecte majeure est déclenchée. Cette collecte s\'applique à l\'ensemble du tas (y compris la jeune génération). Comme la vieille génération contient principalement des objets à longue durée de vie, un algorithme par copie serait inefficace (il faudrait copier presque tout). On utilise donc généralement un algorithme de type **Mark-and-Sweep** (souvent avec une phase de compactage pour éviter la fragmentation). Ces collectes sont beaucoup plus lentes et donc beaucoup plus rares.

#### Le problème des pointeurs inter-générationnels et les barrières en écriture

La deuxième partie de l\'hypothèse générationnelle (peu de pointeurs vieux -\> jeune) est cruciale. Pour pouvoir collecter la jeune génération de manière isolée, le GC doit connaître toutes les références qui pointent vers elle. Celles provenant de la pile ou d\'autres objets de la jeune génération sont faciles à trouver. Mais qu\'en est-il des références provenant de la vieille génération? Scanner toute la vieille génération à chaque collecte mineure annulerait tout le bénéfice de l\'approche générationnelle.

La solution est la **barrière en écriture** (*write barrier*). C\'est un petit morceau de code, inséré par le compilateur JIT, qui s\'exécute à chaque fois que le programme tente de modifier une référence dans un objet (par exemple, objet.champ = autre_objet;). Cette barrière vérifie si l\'opération crée une référence d\'un objet de la vieille génération vers un objet de la jeune génération. Si c\'est le cas, la référence vers l\'objet ancien est enregistrée dans une structure de données spéciale appelée le *remembered set*. Lors d\'une collecte mineure, le GC n\'a plus besoin de scanner toute la vieille génération ; il lui suffit d\'ajouter les objets listés dans le

*remembered set* à son ensemble de racines initial.

Le GC générationnel n\'est donc pas un algorithme en soi, mais une méta-stratégie, une architecture qui combine intelligemment les algorithmes de base pour exploiter les propriétés statistiques du cycle de vie des objets. C\'est cette approche hybride et pragmatique qui permet aux environnements d\'exécution modernes d\'atteindre un équilibre performant entre débit élevé et pauses de latence gérables.

## 21.4 Machines Virtuelles de Processus (JVM, CLR)

Après avoir analysé les mécanismes fondamentaux de l\'exécution du code et de la gestion de la mémoire, nous pouvons maintenant assembler ces concepts pour comprendre l\'architecture d\'un environnement d\'exécution complet. Les machines virtuelles de processus, telles que la Java Virtual Machine (JVM) et le Common Language Runtime (CLR) de.NET, sont des exemples paradigmatiques de tels environnements. Elles encapsulent l\'interpréteur, le compilateur JIT et le garbage collector au sein d\'une architecture cohérente qui fournit une plateforme d\'exécution abstraite, portable et gérée pour les applications.

### 21.4.1 Définition et rôle d\'une machine virtuelle de processus

Une **machine virtuelle de processus**, également appelée machine virtuelle applicative, est un environnement d\'exécution qui s\'exécute comme un processus unique et standard au sein d\'un système d\'exploitation hôte. Son objectif n\'est pas de simuler une machine physique entière, mais de fournir une plateforme d\'exécution abstraite et standardisée pour un seul programme ou une seule application.

Il est crucial de la distinguer de la **machine virtuelle système** (abordée dans la section 21.5), qui est gérée par un hyperviseur et a pour but d\'exécuter un système d\'exploitation invité complet. La VM de processus virtualise une \"machine conceptuelle\" adaptée à un langage ou à une plateforme, tandis que la VM système virtualise du matériel physique. La JVM, par exemple, ne fait pas tourner une version de Windows ou de Linux ; elle exécute du bytecode Java.

Le rôle principal d\'une VM de processus est de faire abstraction des détails du matériel et du système d\'exploitation sous-jacents, offrant ainsi plusieurs avantages clés :

- **Portabilité :** Le même code intermédiaire (bytecode) peut s\'exécuter sans modification sur n\'importe quelle plateforme pour laquelle une implémentation de la VM existe.

- **Gestion de la mémoire :** Elle automatise l\'allocation et la désallocation de la mémoire via un garbage collector, prévenant ainsi les erreurs courantes de gestion manuelle.

- **Sécurité :** La VM peut imposer un modèle de sécurité, en vérifiant le bytecode avant son exécution et en contrôlant l\'accès aux ressources système via un bac à sable (*sandbox*).

- **Optimisation :** Elle peut optimiser dynamiquement les performances du code via un compilateur JIT, comme nous l\'avons vu précédemment.

### 21.4.2 Étude de cas approfondie : l\'architecture de la Java Virtual Machine (JVM)

La JVM est sans doute l\'exemple le plus connu et le plus influent de machine virtuelle de processus. Elle est le cœur de la plateforme Java et est responsable de l\'exécution de tout code compilé en bytecode Java. Son architecture est définie par une spécification rigoureuse, ce qui garantit que toute implémentation conforme se comportera de la même manière. L\'architecture de la JVM peut être décomposée en trois sous-systèmes principaux.

#### Composant 1 : Le sous-système de chargement de classes (Class Loader Subsystem)

Ce composant est la porte d\'entrée du code dans la JVM. Il est responsable de la localisation dynamique des fichiers .class (sur le disque, sur le réseau, etc.) et de leur chargement en mémoire. Ce processus se déroule en trois étapes distinctes  :

1.  **Chargement (*Loading*) :** Le chargeur de classes lit le fichier .class, en extrait le bytecode et les métadonnées, et crée une représentation interne de la classe dans la *Method Area* de la JVM. Il crée également une instance de java.lang.Class dans le tas pour représenter cette classe au niveau de l\'application.

2.  **Liaison (*Linking*) :** Cette étape prépare la classe pour l\'exécution et se subdivise en trois phases :

    - **Vérification (*Verification*) :** Le vérificateur de bytecode s\'assure que le code est valide, sûr et conforme aux spécifications de la JVM. Il prévient les violations de mémoire, les débordements de pile et autres comportements malveillants.

    - **Préparation (*Preparation*) :** La JVM alloue de la mémoire pour les variables statiques (champs de classe) et les initialise avec leurs valeurs par défaut (zéro, null, etc.).

    - **Résolution (*Resolution*) :** Les références symboliques utilisées dans le bytecode (par exemple, le nom d\'une classe ou d\'une méthode) sont remplacées par des références directes (des pointeurs ou des offsets en mémoire). Cette étape peut être effectuée à ce moment (résolution statique) ou plus tard, lors de la première utilisation de la référence (résolution dynamique).

3.  **Initialisation (*Initialization*) :** C\'est la dernière étape, où le code d\'initialisation de la classe est exécuté. Cela inclut l\'assignation des valeurs initiales aux variables statiques (telles que définies dans le code source) et l\'exécution des blocs d\'initialisation statiques.

La JVM utilise une **hiérarchie de chargeurs de classes** basée sur un modèle de délégation. Les trois chargeurs principaux sont  :

- **Bootstrap Class Loader :** Le chargeur racine, souvent implémenté en code natif. Il charge les classes fondamentales de l\'API Java (comme java.lang.Object) depuis le fichier rt.jar ou les modules système.

- **Extension Class Loader :** Charge les classes depuis le répertoire des extensions du JDK.

- **Application/System Class Loader :** Charge les classes depuis le *classpath* de l\'application.

Lorsqu\'on lui demande de charger une classe, un chargeur délègue d\'abord la requête à son parent. Ce n\'est que si le parent (et tous ses ancêtres) ne parvient pas à trouver la classe qu\'il tente de la charger lui-même. Ce mécanisme garantit la cohérence et empêche le rechargement accidentel des classes de base.

#### Composant 2 : Les zones de données d\'exécution (Runtime Data Areas)

La spécification de la JVM définit plusieurs zones de mémoire que le moteur d\'exécution utilise pour stocker les données du programme. Ces zones sont créées au démarrage de la JVM et détruites à son arrêt.

- **Zones partagées entre tous les threads :**

  - **Tas (*Heap*) :** C\'est ici que toutes les instances d\'objets et les tableaux sont alloués. Cette zone est gérée par le garbage collector.

  - **Zone de méthode (*Method Area*) :** Elle stocke les données par classe, telles que le bytecode des méthodes, les tables de constantes, les informations sur les champs et les méthodes, et les variables statiques.

- **Zones de données par thread :** Chaque thread d\'exécution possède ses propres zones de données privées, ce qui garantit l\'isolation entre les threads.

  - **Pile JVM (*JVM Stack*) :** Comme décrit dans la section 21.2, chaque thread a sa propre pile pour stocker les cadres de pile des méthodes Java.

  - **Registre PC (*Program Counter Register*) :** Un petit registre qui contient l\'adresse de l\'instruction de bytecode en cours d\'exécution.

  - **Pile de méthodes natives (*Native Method Stack*) :** Utilisée pour les appels à des méthodes natives (non-Java, généralement écrites en C/C++).

#### Composant 3 : Le moteur d\'exécution (Execution Engine)

C\'est le cœur actif de la JVM, responsable de l\'exécution du bytecode chargé dans la zone de méthode. Il est lui-même composé des éléments que nous avons déjà étudiés :

- **L\'interpréteur :** Lit, interprète et exécute le bytecode instruction par instruction.

- **Le compilateur Juste-à-Temps (JIT) :** Identifie les *hotspots* via un profileur et les compile en code natif pour améliorer les performances.

- **Le Garbage Collector (GC) :** Gère et récupère automatiquement la mémoire dans le tas.

Enfin, l\'**Interface Native Java (JNI)** est une composante cruciale qui agit comme un pont, permettant au code Java s\'exécutant dans la JVM d\'interagir avec des applications et des bibliothèques écrites dans d\'autres langages, comme le C ou le C++.

### 21.4.3 Le Common Language Runtime (CLR) de.NET

Le Common Language Runtime est la machine virtuelle de l\'écosystème.NET de Microsoft. Il remplit un rôle très similaire à celui de la JVM : il gère l\'exécution de programmes et fournit des services tels que la gestion de la mémoire, la sécurité et la gestion des exceptions.

#### Le Common Intermediate Language (CIL)

Lorsqu\'un programme écrit dans un langage.NET (comme C#, F# ou VB.NET) est compilé, le résultat n\'est pas du code machine, mais un code intermédiaire appelé **Common Intermediate Language (CIL)**, anciennement connu sous le nom de Microsoft Intermediate Language (MSIL). Le CIL est l\'équivalent conceptuel du bytecode Java : un jeu d\'instructions indépendant de l\'architecture, basé sur une pile, qui sera ensuite traité par le CLR.

#### Architecture du CLR

L\'architecture du CLR est remarquablement parallèle à celle de la JVM, reflétant une convergence dans la conception des machines virtuelles modernes. Ses composants clés incluent  :

- **Base Class Library (BCL) Support :** Fournit l\'accès à la bibliothèque de classes standard de.NET.

- **Class Loader :** Charge les *assemblies* (l\'équivalent.NET des fichiers JAR ou des paquets), qui contiennent le CIL et les métadonnées.

- **JIT Compiler :** Compile le CIL en code machine natif au moment de l\'exécution.

- **Garbage Collector (GC) :** Gère automatiquement la mémoire du tas managé.

- **Security Engine :** Met en œuvre la politique de sécurité, notamment via le *Code Access Security* (CAS).

- **Type Checker :** Assure la sécurité des types en se basant sur les informations contenues dans les métadonnées.

#### Les piliers de l\'interopérabilité : CTS et CLS

Une différence philosophique majeure entre le CLR et la JVM est que le CLR a été conçu dès le départ pour être une plateforme **multilingue**. Pour permettre à des langages aux sémantiques potentiellement différentes de coexister et d\'interopérer de manière transparente,.NET a introduit deux spécifications fondamentales  :

1.  **Common Type System (CTS) :** Le CTS est un ensemble de règles riches qui définit comment les types (classes, structures, entiers, etc.) sont déclarés, utilisés et gérés dans le runtime. Il établit un modèle de types commun que tous les langages.NET doivent respecter. Par exemple, il spécifie qu\'il existe des types valeur (qui contiennent directement leurs données) et des types référence (qui contiennent une référence à leurs données). Grâce au CTS, un objet créé en C# peut être hérité par une classe en VB.NET, ou une exception levée en F# peut être capturée en C#.

2.  **Common Language Specification (CLS) :** Tous les langages n\'implémentent pas toutes les fonctionnalités permises par le riche CTS. Le CLS définit un sous-ensemble de règles du CTS, représentant un \"plus petit dénominateur commun\" de fonctionnalités de langage. Un composant qui n\'expose publiquement que des fonctionnalités conformes au CLS est dit \"conforme CLS\" et est garanti d\'être utilisable par n\'importe quel autre langage.NET conforme CLS. Le CLS est la clé de l\'interopérabilité linguistique à grande échelle sur la plateforme.NET.

### 21.4.4 Analyse comparative : JVM vs. CLR

Bien que leurs architectures soient similaires, la JVM et le CLR présentent des différences de conception qui reflètent leurs origines et leurs philosophies distinctes.

- **Support linguistique :** C\'est la différence la plus fondamentale. Le CLR a été conçu dès le départ comme une cible pour de multiples langages, avec le CTS et le CLS comme fondations. La JVM, bien qu\'elle exécute aujourd\'hui de nombreux langages (Kotlin, Scala, Clojure), a été initialement conçue et optimisée pour Java. Cela a des conséquences sur la manière dont certaines fonctionnalités sont implémentées.

- **Gestion des types :** Le CLR, via le CTS, offre un support de première classe pour les **types valeur** définis par l\'utilisateur (les structs en C#). Ces types sont généralement alloués sur la pile et sont manipulés par valeur, offrant des avantages de performance pour les petites structures de données. Historiquement, la JVM ne disposait que de types primitifs (valeur) et de types objet (référence), tous les objets étant alloués sur le tas. Des projets comme Valhalla visent à introduire des types valeur définis par l\'utilisateur dans la JVM, mais il s\'agit d\'une évolution plus tardive.

- **Implémentation des génériques :** Cette différence est très technique mais révélatrice.

  - Dans la **JVM**, les génériques sont implémentés par **effacement de type** (*type erasure*). Le compilateur Java vérifie la correction des types à la compilation, mais le bytecode généré ne contient plus d\'informations sur les types génériques (un List\<String\> devient un simple List). Cela a été fait pour assurer la rétrocompatibilité avec le code non générique.

  - Dans le **CLR**, les génériques sont **réifiés** (*reified*). Les informations de type sont conservées dans le CIL et sont disponibles au moment de l\'exécution. Un List\<int\> et un List\<string\> sont deux types distincts pour le runtime. Cette approche offre plus de flexibilité et de performance pour les opérations impliquant les types génériques au moment de l\'exécution.

- **Écosystème et plateforme :** La JVM a été conçue dès le départ pour être indépendante du système d\'exploitation. Le CLR, à l\'origine, était étroitement lié à l\'écosystème Windows. Cependant, avec l\'avènement de.NET Core (maintenant simplement.NET), Microsoft a réécrit le runtime (CoreCLR) pour en faire une plateforme entièrement open-source et multiplateforme, fonctionnant sur Windows, Linux et macOS. Aujourd\'hui, les deux plateformes sont véritablement multiplateformes.

En définitive, la JVM et le CLR représentent deux parcours évolutifs qui ont convergé vers des solutions architecturales très similaires pour résoudre les mêmes problèmes fondamentaux de l\'exécution de code géré. Leurs différences illustrent des compromis de conception fascinants, souvent dictés par l\'histoire et les objectifs initiaux de chaque plateforme. L\'étude de leur architecture parallèle ne révèle pas seulement le fonctionnement interne de Java ou de.NET, mais offre une leçon plus profonde sur les principes universels qui régissent la conception de systèmes d\'exécution robustes et performants.

## 21.5 Virtualisation au niveau système (Hyperviseurs)

Après avoir exploré en détail l\'univers des machines virtuelles de processus, qui fournissent une abstraction au niveau de l\'application, nous nous élevons maintenant d\'un cran dans la hiérarchie des couches d\'abstraction pour aborder la **virtualisation au niveau du système**. Ici, l\'objectif n\'est plus d\'isoler un seul programme, mais de faire fonctionner plusieurs systèmes d\'exploitation complets et indépendants sur une seule et même machine physique. La technologie qui rend cela possible est l\'**hyperviseur**. Cette section dissèque le concept de virtualisation de système, compare les deux grandes familles d\'hyperviseurs et met en lumière le rôle crucial du support matériel qui a permis sa démocratisation.

### 21.5.1 Introduction à la virtualisation de système

La virtualisation de système est une technologie qui permet de créer et d\'exécuter une ou plusieurs **machines virtuelles (VM)** sur un unique ordinateur physique, appelé l\'**hôte** (*host*). Chaque machine virtuelle, appelée **invitée** (*guest*), se comporte comme un ordinateur complet et autonome, avec ses propres ressources virtuelles : processeur (CPU), mémoire (RAM), stockage (disque dur) et interfaces réseau. À l\'intérieur de chaque VM, on peut installer et exécuter un système d\'exploitation (par exemple, une VM peut faire tourner Linux tandis qu\'une autre fait tourner Windows sur le même serveur physique).

#### L\'hyperviseur (ou Virtual Machine Monitor - VMM)

La pièce maîtresse de cette technologie est l\'**hyperviseur**, également connu sous le nom de *Virtual Machine Monitor* (VMM). L\'hyperviseur est la couche logicielle (ou parfois micrologicielle) qui se situe entre le matériel physique et les machines virtuelles. Ses responsabilités principales sont  :

- **Création et gestion des VM :** Il gère le cycle de vie des VM (création, démarrage, arrêt, suppression).

- **Abstraction du matériel :** Il présente à chaque VM un ensemble de périphériques matériels virtuels standardisés.

- **Allocation des ressources :** Il arbitre l\'accès au matériel physique, en partageant et en allouant les ressources du processeur, de la mémoire et des E/S entre les différentes VM.

- **Isolation :** Il assure une isolation stricte entre les VM. Une défaillance, un crash ou une faille de sécurité dans une VM n\'affecte pas les autres VM s\'exécutant sur le même hôte.

#### Avantages de la virtualisation de système

La virtualisation a révolutionné l\'informatique d\'entreprise en offrant des avantages considérables  :

- **Consolidation de serveurs :** Avant la virtualisation, il était courant de dédier un serveur physique à une seule application pour des raisons d\'isolation et de compatibilité. Cela menait à un sous-emploi massif des ressources, avec des serveurs fonctionnant souvent à moins de 15% de leur capacité. La virtualisation permet de consolider de nombreuses charges de travail sur un seul serveur physique, augmentant drastiquement le taux d\'utilisation du matériel et réduisant les coûts d\'achat, d\'électricité et de refroidissement.

- **Isolation et sécurité :** L\'isolation forte entre les VM permet de faire cohabiter des applications avec des exigences de sécurité ou des dépendances logicielles différentes sur le même matériel sans risque d\'interférence.

- **Flexibilité et portabilité :** Une VM est essentiellement un ensemble de fichiers (un fichier de configuration et un ou plusieurs fichiers de disque virtuel). Elle peut être facilement sauvegardée, clonée, ou déplacée d\'un serveur physique à un autre, ce qui simplifie la maintenance et la migration.

- **Reprise après sinistre :** La capacité de sauvegarder et de restaurer rapidement une VM entière facilite grandement la mise en place de plans de reprise après sinistre.

Il existe deux approches architecturales fondamentales pour les hyperviseurs, connues sous les noms de Type 1 et Type 2.

### 21.5.2 Hyperviseurs de Type 1 (Natif / \"Bare-Metal\")

Un hyperviseur de Type 1, également qualifié de **natif** ou **\"bare-metal\"**, est un système qui s\'installe et s\'exécute **directement sur le matériel physique** de la machine hôte. Il n\'y a pas de système d\'exploitation sous-jacent entre l\'hyperviseur et le matériel. L\'hyperviseur lui-même agit comme un système d\'exploitation minimaliste, dont la seule fonction est de gérer efficacement les machines virtuelles.

#### Architecture et performance

Dans cette configuration, l\'hyperviseur a un contrôle total et direct sur les ressources matérielles. Il intègre ses propres pilotes de périphériques et son propre planificateur pour allouer les cycles CPU et la mémoire aux VM. Cette absence d\'intermédiaire se traduit par une latence très faible et des performances élevées, très proches de celles d\'une machine physique. C\'est pourquoi les hyperviseurs de Type 1 sont le standard absolu pour les environnements de production, les centres de données et l\'infrastructure de

*cloud computing* (IaaS - Infrastructure as a Service).

#### Sécurité et isolation

L\'architecture *bare-metal* offre un niveau de sécurité et d\'isolation supérieur. La surface d\'attaque est considérablement réduite car il n\'y a pas de système d\'exploitation hôte complet (avec ses services, ses applications et ses potentielles vulnérabilités) qui pourrait être compromis. L\'isolation entre les VM est appliquée au plus près du matériel, ce qui la rend plus robuste.

#### Exemples d\'hyperviseurs de Type 1

Les principaux acteurs du marché dans cette catégorie sont  :

- **VMware ESXi :** Composant central de la suite de virtualisation VMware vSphere, c\'est la solution dominante dans les entreprises.

- **Microsoft Hyper-V :** L\'hyperviseur de Microsoft, qui peut être installé en tant que rôle sur Windows Server ou en tant que produit autonome (Hyper-V Server), ce qui en fait un hyperviseur de Type 1.

- **KVM (Kernel-based Virtual Machine) :** Une solution de virtualisation open-source intégrée directement dans le noyau Linux. KVM transforme le noyau Linux lui-même en un hyperviseur de Type 1. C\'est la base de nombreuses plateformes de cloud, y compris OpenStack et de nombreuses offres sur AWS et Google Cloud.

- **Xen :** Un autre hyperviseur open-source très populaire, qui a été le pionnier de nombreuses techniques de virtualisation. Il est utilisé par des fournisseurs de cloud majeurs comme Amazon Web Services (historiquement).

- **Nutanix AHV (Acropolis Hypervisor) :** Un hyperviseur basé sur KVM, au cœur des solutions d\'infrastructure hyperconvergée de Nutanix.

### 21.5.3 Hyperviseurs de Type 2 (Hébergé / \"Hosted\")

À l\'opposé, un hyperviseur de Type 2, ou **hébergé**, s\'installe et s\'exécute comme une application logicielle standard **au-dessus d\'un système d\'exploitation hôte** conventionnel (comme Windows, macOS ou une distribution Linux de bureau).

#### Architecture et fonctionnement

Dans cette architecture, il y a trois couches logicielles au-dessus du matériel : le système d\'exploitation hôte, l\'application hyperviseur, et enfin les systèmes d\'exploitation invités dans les VM. L\'hyperviseur de Type 2 ne communique pas directement avec le matériel. Il doit passer des requêtes au système d\'exploitation hôte pour obtenir l\'accès au CPU, à la mémoire et aux périphériques. L\'OS hôte reste le maître de la machine, gérant les pilotes et arbitrant les ressources, ce qui introduit une couche d\'indirection et une latence significatives.

#### Performance et cas d\'usage

En raison de ce surcoût de performance, les hyperviseurs de Type 2 ne sont pas adaptés aux charges de travail de production exigeantes. Leur principal avantage est la **simplicité d\'installation et d\'utilisation**. Ils ne requièrent pas de matériel dédié et peuvent être utilisés par des développeurs, des testeurs ou des utilisateurs finaux sur leurs postes de travail personnels pour  :

- Exécuter un système d\'exploitation différent (par exemple, tester une application sur Linux depuis un Mac).

- Créer des environnements de développement et de test isolés.

- Utiliser des logiciels anciens qui ne sont compatibles qu\'avec une version plus ancienne d\'un OS.

#### Exemples d\'hyperviseurs de Type 2

Les produits les plus connus dans cette catégorie sont  :

- **Oracle VM VirtualBox :** Une solution open-source et multiplateforme très populaire.

- **VMware Workstation (pour Windows/Linux) et VMware Fusion (pour macOS) :** Des produits commerciaux robustes destinés aux professionnels de l\'informatique et aux développeurs.

- **Parallels Desktop :** Une solution commerciale très performante, particulièrement populaire sur macOS pour exécuter Windows.

- **QEMU :** Un émulateur et virtualiseur open-source très polyvalent, qui peut fonctionner comme un hyperviseur de Type 2.

### 21.5.4 Le rôle fondamental du support matériel à la virtualisation

L\'essor et les performances de la virtualisation moderne, en particulier sur l\'architecture x86, n\'auraient pas été possibles sans l\'introduction d\'extensions spécifiques dans les processeurs.

#### Le défi historique de la virtualisation x86

L\'architecture x86, avec ses différents niveaux de privilège (les \"anneaux\" ou *rings*), n\'a pas été conçue à l\'origine pour être virtualisée. Un des problèmes fondamentaux était que certaines instructions sensibles (qui interagissent avec le matériel) ne provoquaient pas de \"piège\" (*trap*) lorsqu\'elles étaient exécutées par un programme en mode utilisateur (anneau 3), mais échouaient silencieusement ou se comportaient différemment. Cela rendait l\'approche classique de la virtualisation (le *trap-and-emulate*) impossible pour un système d\'exploitation invité, qui s\'attend à s\'exécuter en anneau 0. Les premières solutions de virtualisation pour x86 (comme celles de VMware) ont dû recourir à des techniques logicielles très complexes et coûteuses en performance, comme la **traduction binaire dynamique**, où le code de l\'OS invité était analysé et réécrit à la volée pour remplacer les instructions problématiques.

#### Intel VT-x et AMD-V : la révolution matérielle

Au milieu des années 2000, Intel et AMD ont introduit des extensions à leurs jeux d\'instructions pour faciliter la virtualisation. Ces technologies sont connues sous les noms de **Intel VT-x** (nom de code \"Vanderpool\") et **AMD-V** (nom de code \"Pacifica\", aussi appelé SVM - Secure Virtual Machine).

#### Mécanisme de fonctionnement

Le principe de base de ces extensions est d\'introduire une nouvelle distinction dans les modes d\'exécution du processeur  :

- Un **mode racine** (*root mode*), dans lequel l\'hyperviseur s\'exécute avec un contrôle total sur le matériel.

- Un **mode non-racine** (*non-root mode*), dans lequel les systèmes d\'exploitation invités s\'exécutent.

Un OS invité en mode non-racine peut s\'exécuter au niveau de privilège le plus élevé (anneau 0) de son point de vue, mais il reste sous le contrôle de l\'hyperviseur. Lorsque l\'OS invité tente d\'exécuter une instruction sensible ou d\'accéder à une ressource contrôlée, le matériel du processeur ne l\'exécute pas directement. Au lieu de cela, il déclenche automatiquement et de manière transparente une transition, appelée **sortie de VM** (*VM exit*), qui suspend l\'exécution de la VM et transfère le contrôle à l\'hyperviseur en mode racine.

L\'hyperviseur peut alors inspecter l\'état de la VM, décider comment gérer l\'opération sensible (par exemple, en émulant le comportement du matériel), puis reprendre l\'exécution de la VM via une instruction spéciale de **rentrée en VM** (*VM entry*).

#### Impact sur la performance et la simplicité

Ce support matériel a eu un impact transformateur. Il a éliminé le besoin de la coûteuse traduction binaire pour la grande majorité du code de l\'OS invité, permettant à celui-ci de s\'exécuter directement sur le processeur à une vitesse quasi native. Les transitions

*VM exit* et *VM entry* ont un coût, mais celui-ci est bien inférieur au surcoût de la virtualisation purement logicielle. Ces extensions ont non seulement considérablement amélioré les performances, mais elles ont aussi simplifié radicalement la conception des hyperviseurs, les rendant plus robustes et plus faciles à développer. D\'autres extensions ont suivi, comme la virtualisation de la MMU (Intel EPT, AMD RVI/NPT) pour accélérer la gestion de la mémoire virtuelle, et la virtualisation des E/S (Intel VT-d, AMD-Vi) pour permettre un accès direct et sécurisé des VM aux périphériques physiques.

En conclusion, la distinction entre les hyperviseurs de Type 1 et de Type 2 illustre un compromis architectural clé entre la performance optimisée pour les centres de données et la commodité pour l\'utilisateur final. C\'est cependant l\'avènement des extensions de virtualisation matérielle qui a été le véritable catalyseur, transformant la virtualisation d\'une niche technologique complexe en la fondation omniprésente sur laquelle repose l\'informatique en nuage moderne et l\'Infrastructure en tant que Service (IaaS).

## 21.6 Conteneurisation et Orchestration

La virtualisation de système, bien que révolutionnaire, introduit une abstraction au niveau du matériel. Chaque machine virtuelle embarque un système d\'exploitation complet, ce qui, pour de nombreuses applications modernes, représente un surcoût en ressources et en complexité. La dernière décennie a vu l\'émergence d\'un nouveau paradigme d\'abstraction, plus léger et plus agile : la **conteneurisation**. Cette approche ne virtualise plus la machine, mais le système d\'exploitation lui-même. Cette section explore le concept de conteneur, le compare à la machine virtuelle, présente l\'écosystème de référence Docker, et explique pourquoi la gestion à grande échelle de conteneurs a rendu indispensable l\'utilisation d\'orchestrateurs comme Kubernetes.

### 21.6.1 La conteneurisation : une virtualisation au niveau de l\'OS

La conteneurisation est une méthode de virtualisation au niveau du système d\'exploitation qui permet d\'exécuter une application et ses dépendances dans des environnements isolés appelés **conteneurs**. La caractéristique fondamentale des conteneurs est qu\'ils s\'exécutent tous sur un **unique noyau de système d\'exploitation hôte**. Du point de vue de l\'OS hôte, un conteneur n\'est rien de plus qu\'un groupe de processus isolés.

#### Mécanismes sous-jacents (Linux)

Cette isolation est rendue possible par des fonctionnalités intégrées au noyau Linux depuis de nombreuses années  :

1.  **Namespaces (Espaces de noms) :** Les *namespaces* sont la clé de l\'**isolation**. Ils permettent de partitionner les ressources globales du noyau de sorte que chaque groupe de processus (chaque conteneur) ait sa propre vue isolée de ces ressources. Il existe différents types de *namespaces* :

    - PID (Process ID) : Chaque conteneur a son propre arbre de processus, avec son propre processus init (PID 1). Les processus à l\'intérieur d\'un conteneur ne peuvent pas voir ou affecter les processus des autres conteneurs ou de l\'hôte.

    - NET (Network) : Chaque conteneur dispose de sa propre pile réseau, avec ses propres interfaces réseau, adresses IP, tables de routage et ports.

    - MNT (Mount) : Chaque conteneur a son propre système de fichiers racine et sa propre vue des points de montage.

    - UTS (Hostname), IPC (Inter-Process Communication), User (User IDs).

2.  **Control Groups (cgroups) :** Les *cgroups* sont le mécanisme de **limitation des ressources**. Ils permettent de restreindre et de mesurer la quantité de ressources système (CPU, mémoire, bande passante disque, bande passante réseau) qu\'un groupe de processus (un conteneur) peut consommer. Cela empêche un conteneur gourmand de monopoliser les ressources de l\'hôte et d\'affecter les autres conteneurs.

En combinant les *namespaces* pour l\'isolation et les *cgroups* pour la limitation, on obtient un environnement qui, du point de vue de l\'application, ressemble à une machine dédiée, mais qui est en réalité un simple processus s\'exécutant de manière sécurisée et contrôlée sur le noyau de l\'hôte.

### 21.6.2 Comparaison fondamentale : Conteneurs vs. Machines Virtuelles

La distinction entre conteneurs et machines virtuelles est souvent source de confusion, mais elle est fondamentale sur le plan architectural.

#### La différence clé : le partage du noyau

Le point de divergence essentiel est la couche qui est virtualisée  :

- Une **Machine Virtuelle** virtualise le **matériel**. Elle utilise un hyperviseur pour créer une machine complète sur laquelle un système d\'exploitation invité (avec son propre noyau) est installé.

- Un **Conteneur** virtualise le **système d\'exploitation**. Il s\'exécute directement sur le noyau de l\'OS hôte et partage ce noyau avec d\'autres conteneurs.

Cette différence unique a des conséquences profondes sur la performance, la taille, la vitesse et le modèle de sécurité des deux technologies.

#### Tableau comparatif détaillé

  -------------------------------- -------------------------------------------------------------------------------------- -----------------------------------------------------------
  Critère                          Machine Virtuelle (VM)                                                                 Conteneur

  **Niveau d\'abstraction**        Matériel physique                                                                      Système d\'exploitation

  **Isolation**                    Très forte (limite matérielle virtualisée)                                             Forte (limite au niveau du noyau)

  **Taille**                       Lourde (plusieurs Go)                                                                  Légère (quelques Mo)

  **Temps de démarrage**           Lent (minutes)                                                                         Rapide (secondes ou millisecondes)

  **Consommation de ressources**   Élevée (surcoût d\'un OS invité complet)                                               Très faible (surcoût d\'un processus)

  **Densité**                      Faible (quelques VM par hôte)                                                          Élevée (des dizaines ou centaines de conteneurs par hôte)

  **Portabilité**                  Portable (en tant qu\'image de VM), mais lourde                                        Très portable (en tant qu\'image de conteneur)

  **Cas d\'usage typique**         Exécuter un OS différent, applications monolithiques, isolation de sécurité maximale   Microservices, applications cloud-natives, CI/CD
  -------------------------------- -------------------------------------------------------------------------------------- -----------------------------------------------------------

Les **VM** sont idéales lorsqu\'une isolation de sécurité maximale est requise, ou lorsqu\'il est nécessaire d\'exécuter un système d\'exploitation complètement différent de celui de l\'hôte (par exemple, exécuter Windows sur un serveur Linux). Elles sont bien adaptées aux applications monolithiques traditionnelles (*legacy*).

Les **conteneurs**, en revanche, brillent par leur légèreté, leur rapidité et leur efficacité en ressources. Ils sont devenus le standard de facto pour le déploiement d\'**architectures microservices**, où une application est décomposée en de nombreux petits services indépendants. Leur démarrage quasi instantané et leur faible surcoût permettent de mettre à l\'échelle chaque microservice de manière indépendante et rentable. Ils sont également au cœur des pratiques **DevOps** et des pipelines d\'intégration et de déploiement continus (CI/CD) en raison de la rapidité avec laquelle les environnements peuvent être créés et détruits.

### 21.6.3 Docker : L\'écosystème de référence

Bien que la technologie des conteneurs Linux existe depuis longtemps (avec des précurseurs comme les *chroots* et les *jails*), c\'est la société **Docker** qui l\'a popularisée et standardisée au début des années 2010, en fournissant un écosystème d\'outils simples et puissants.

#### Docker Engine

Le cœur de la plateforme est le **Docker Engine**, qui repose sur une architecture client-serveur  :

- Un **démon serveur** (dockerd) qui s\'exécute en arrière-plan et gère le cycle de vie des objets Docker (images, conteneurs, volumes, réseaux).

- Une **API REST** que le démon expose pour permettre aux programmes de communiquer avec lui.

- Un **client en ligne de commande (CLI)** (docker) que l\'utilisateur emploie pour envoyer des commandes (comme docker run ou docker build) à l\'API du démon.

#### Images Docker

Une **image Docker** est un modèle immuable (en lecture seule) qui contient tout ce qui est nécessaire pour exécuter une application : le code, un environnement d\'exécution, les bibliothèques, les variables d\'environnement et les fichiers de configuration.

La caractéristique la plus importante des images Docker est leur structure en **couches** (*layers*). Une image est construite à partir d\'un fichier texte appelé

Dockerfile, qui contient une série d\'instructions (FROM, COPY, RUN, etc.). Chaque instruction du Dockerfile crée une nouvelle couche dans l\'image. Ces couches sont empilées les unes sur les autres et sont mises en cache. Si vous modifiez une instruction dans le Dockerfile et reconstruisez l\'image, Docker ne reconstruit que la couche modifiée et celles qui la suivent, réutilisant les couches précédentes depuis le cache. Ce système de couches rend la construction et la distribution des images extrêmement efficaces.

#### Conteneurs Docker

Un **conteneur Docker** est une instance exécutable et isolée d\'une image Docker. Lorsque vous lancez un conteneur à partir d\'une image, Docker ajoute une

**couche inscriptible** supplémentaire au-dessus des couches immuables de l\'image. Toutes les modifications effectuées pendant l\'exécution du conteneur (écriture de fichiers, modification de la configuration) sont écrites dans cette couche supérieure. Cela signifie que plusieurs conteneurs peuvent être lancés à partir de la même image de base, partageant les couches en lecture seule, mais chacun ayant son propre état isolé et modifiable.

### 21.6.4 La nécessité de l\'orchestration de conteneurs

La simplicité de Docker a rendu trivial le fait de lancer un conteneur sur une machine. Cependant, le passage à la production d\'une application complexe, composée de dizaines ou de centaines de microservices conteneurisés et répartis sur un parc de serveurs, a révélé un nouvel ensemble de défis  :

- **Déploiement :** Comment déployer et mettre à jour ces conteneurs sur plusieurs machines de manière fiable?

- **Mise à l\'échelle (*Scaling*) :** Comment augmenter ou diminuer automatiquement le nombre d\'instances d\'un service en fonction de la charge?

- **Découverte de services (*Service Discovery*) :** Comment un conteneur peut-il trouver et communiquer avec un autre, sachant que les conteneurs sont éphémères et que leurs adresses IP changent?

- **Répartition de charge (*Load Balancing*) :** Comment distribuer le trafic entrant entre plusieurs instances d\'un même service?

- **Tolérance aux pannes (*Fault Tolerance*) :** Comment détecter qu\'un conteneur ou une machine a planté et redémarrer automatiquement les services affectés ailleurs?

Gérer ces problèmes manuellement est une tâche herculéenne et source d\'erreurs. C\'est là qu\'intervient l\'**orchestration de conteneurs**. Un orchestrateur est un système qui automatise l\'ensemble du cycle de vie des applications conteneurisées à grande échelle.

### 21.6.5 Kubernetes : Le standard de l\'industrie

Parmi les nombreux orchestrateurs qui ont émergé, **Kubernetes** (souvent abrégé en **K8s**) est devenu le standard de facto de l\'industrie. Créé à l\'origine par Google et maintenant maintenu par la Cloud Native Computing Foundation (CNCF), Kubernetes fournit une plateforme robuste et extensible pour l\'automatisation du déploiement, de la mise à l\'échelle et de la gestion des applications conteneurisées.

#### Architecture d\'un cluster Kubernetes

Un environnement Kubernetes est appelé un **cluster**. Un cluster est composé de plusieurs machines, ou **nœuds** (*nodes*), qui sont organisées selon une architecture maître-esclave.

- **Le Plan de Contrôle (*Control Plane*) :** C\'est le \"cerveau\" du cluster, généralement composé d\'un ou plusieurs nœuds maîtres. Il prend les décisions globales sur le cluster (par exemple, la planification des applications) et détecte et répond aux événements du cluster. Ses composants principaux sont  :

  - kube-apiserver : Expose l\'API de Kubernetes. C\'est le point d\'entrée pour toutes les opérations de gestion du cluster.

  - etcd : Une base de données clé-valeur distribuée et cohérente qui stocke l\'état complet du cluster (la \"source de vérité\").

  - kube-scheduler : Surveille les nouveaux conteneurs à créer et leur assigne un nœud sur lequel s\'exécuter, en fonction des ressources disponibles et des contraintes.

  - kube-controller-manager : Exécute les contrôleurs, qui sont des boucles de contrôle qui observent l\'état du cluster et s\'efforcent de le faire correspondre à l\'état désiré.

- **Les Nœuds de Travail (*Worker Nodes*) :** Ce sont les machines (physiques ou virtuelles) qui exécutent les charges de travail applicatives. Chaque nœud de travail exécute plusieurs composants  :

  - kubelet : L\'agent principal du nœud. Il communique avec le plan de contrôle et s\'assure que les conteneurs décrits dans les spécifications sont en cours d\'exécution et en bonne santé sur son nœud.

  - kube-proxy : Un proxy réseau qui maintient les règles de réseau sur le nœud et permet la communication réseau vers les conteneurs depuis l\'intérieur ou l\'extérieur du cluster.

  - Container Runtime : Le logiciel responsable de l\'exécution des conteneurs (par exemple, containerd, CRI-O).

#### Les abstractions fondamentales de Kubernetes

Kubernetes atteint sa puissance en fournissant un ensemble d\'abstractions (ou d\'objets) qui permettent de décrire l\'état désiré d\'une application de manière déclarative, généralement via des fichiers de configuration YAML. Les plus fondamentales sont :

- **Pod :** C\'est l\'unité de déploiement la plus petite et la plus simple dans Kubernetes. Un Pod représente un groupe d\'un ou plusieurs conteneurs qui sont déployés ensemble sur le même nœud, partagent la même pile réseau (même adresse IP) et peuvent partager du stockage. Le Pod est le modèle pour une instance d\'application.

- **Service :** Les Pods sont éphémères : ils peuvent être détruits et recréés à tout moment, changeant d\'adresse IP. Un **Service** est une abstraction qui définit un ensemble logique de Pods et une politique pour y accéder. Il fournit un point d\'accès stable (une adresse IP virtuelle et un nom DNS) pour un groupe de Pods. Le Service agit comme un répartiteur de charge intégré, distribuant le trafic réseau aux Pods sains qui correspondent à un certain sélecteur.

- **Déploiement (*Deployment*) :** Un **Déploiement** est un objet de plus haut niveau qui permet de gérer de manière déclarative un ensemble de Pods répliqués. Vous décrivez un état désiré dans un Déploiement (par exemple, \"je veux 3 répliques de mon application web utilisant l\'image X\"), et le contrôleur de Déploiement travaille en continu pour que l\'état actuel corresponde à cet état désiré. Il gère la création des Pods, leur mise à l\'échelle, et facilite les stratégies de mise à jour comme les *rolling updates* (mise à jour progressive sans interruption de service) et les *rollbacks*.

La conteneurisation, propulsée par l\'écosystème Docker et orchestrée par la puissance de Kubernetes, représente un changement de paradigme. Elle déplace l\'unité d\'abstraction du matériel (la VM) vers l\'application elle-même. Kubernetes peut être vu comme un \"système d\'exploitation pour le centre de données\", qui abstrait un parc de machines hétérogènes en une seule et vaste ressource de calcul. Cette dernière couche d\'abstraction complète notre parcours, nous menant de l\'exécution d\'une seule instruction à la gestion d\'applications distribuées complexes, résilientes et évolutives à l\'échelle mondiale.

