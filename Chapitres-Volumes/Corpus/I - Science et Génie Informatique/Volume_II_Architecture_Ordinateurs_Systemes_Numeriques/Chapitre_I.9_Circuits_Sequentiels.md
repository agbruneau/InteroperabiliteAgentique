# Chapitre I.9 : Conception de Circuits Séquentiels

## 9.1 Introduction à la Logique Séquentielle

### 9.1.1 Au-delà de la Logique Combinatoire : Le Concept d\'État

L\'univers des circuits logiques se divise en deux grandes familles : les circuits combinatoires et les circuits séquentiels. Un circuit combinatoire, tel qu\'un additionneur ou un multiplexeur, possède une caractéristique fondamentale : ses sorties à un instant donné dépendent *uniquement* des valeurs de ses entrées à ce même instant. Il est sans mémoire ; une même combinaison d\'entrées produira toujours la même sortie, indépendamment de ce qui a pu se passer auparavant.

La logique séquentielle transcende cette limitation en introduisant la notion de **mémoire**. Dans un circuit séquentiel, les sorties ne dépendent pas seulement des entrées actuelles, mais également de la séquence des entrées passées. Cette capacité à \"se souvenir\" de l\'historique est encapsulée dans le concept d\'

**état interne** du circuit. L\'état représente une synthèse de toutes les informations passées pertinentes nécessaires pour déterminer le comportement futur du circuit.

Structurellement, cette capacité de mémorisation émerge de l\'introduction d\'une **boucle de rétroaction** (*feedback loop*), où une ou plusieurs sorties du circuit sont réinjectées en entrée. Cette dépendance cyclique est l\'essence même de la logique séquentielle. Un exemple simple est une porte OU dont la sortie est rebouclée sur l\'une de ses entrées : une fois que la sortie passe à 1, elle se maintient à 1 indéfiniment, mémorisant ainsi l\'événement \"une entrée a été à 1 au moins une fois\". L\'état du circuit est matérialisé par des

**variables internes**, aussi appelées variables secondaires, qui sont les signaux portés par ces boucles de rétroaction.

Cette rétroaction est à la fois la source de la puissance des circuits séquentiels --- leur permettant de mémoriser des données, de compter des événements, et d\'exécuter des algorithmes complexes --- et la source de leur complexité de conception. Sans un mécanisme de contrôle rigoureux, une rétroaction peut engendrer des oscillations incontrôlées ou des comportements imprévisibles dus aux délais de propagation des signaux, un phénomène connu sous le nom de condition de course (*race condition*). La logique séquentielle n\'est donc pas simplement une \"logique combinatoire avec de la mémoire\", mais plutôt une \"logique combinatoire avec une rétroaction contrôlée\".

Le tableau suivant synthétise les distinctions fondamentales entre ces deux paradigmes.

**Table 9.1 : Comparaison des Logiques Combinatoire et Séquentielle**

  ---------------------------- ------------------------------------------ -----------------------------------------------
  Caractéristique              Logique Combinatoire                       Logique Séquentielle

  **Dépendance des sorties**   Uniquement des entrées actuelles           Entrées actuelles ET état(s) antérieur(s)

  **Présence de mémoire**      Aucune                                     Oui, matérialisée par l\'état interne

  **Structure**                Acyclique (pas de boucle de rétroaction)   Cyclique (présence de boucles de rétroaction)

  **Sensibilité au temps**     Insensible à l\'ordre des entrées          Sensible à la séquence temporelle des entrées

  **Exemples de circuits**     Additionneur, décodeur, multiplexeur       Compteur, registre, mémoire, processeur
  ---------------------------- ------------------------------------------ -----------------------------------------------

### 9.1.2 Systèmes Synchrones et Asynchrones : Le Rôle de l\'Horloge

Le défi posé par la rétroaction est la gestion du temps. Les circuits séquentiels se classent en deux catégories selon la manière dont ils abordent ce défi : les systèmes asynchrones et les systèmes synchrones.

- **Systèmes Asynchrones** : Dans un circuit asynchrone, l\'état du système peut changer à n\'importe quel moment, en réponse directe et immédiate à un changement sur ses entrées. La mémorisation est réalisée par de simples boucles de rétroaction, comme des verrous. Bien que potentiellement plus rapides pour traiter des événements apériodiques et sporadiques, ces circuits sont notoirement difficiles à concevoir et à vérifier. Chaque changement d\'entrée se propage à travers le circuit à une vitesse qui dépend des délais physiques des portes logiques, créant des risques d\'aléas (\
  *hazards*) et de conditions de course qui peuvent mener à des états incorrects.

- **Systèmes Synchrones** : Pour maîtriser cette complexité, la quasi-totalité des systèmes numériques modernes adopte une approche synchrone. Dans un circuit synchrone, l\'évolution de l\'état est rigoureusement contrôlée et ne peut se produire qu\'à des instants précis, dictés par un signal global appelé **horloge** (*clock*). Ce signal est typiquement une onde carrée périodique. Les éléments de mémorisation utilisés sont des bascules synchrones, qui ne sont sensibles qu\'aux transitions du signal d\'horloge (les fronts montants ou descendants).

Le signal d\'horloge agit comme un mécanisme de discrétisation du temps. Il transforme le flux temporel continu en une séquence d\'instants discrets, les \"cycles d\'horloge\". En forçant tous les changements d\'état à se produire simultanément sur un front d\'horloge, on garantit que les entrées des blocs de logique combinatoire sont stables pendant qu\'ils calculent les nouvelles sorties et le prochain état. Cette **abstraction synchrone** élimine les problèmes de synchronisation liés aux délais de propagation variables et permet aux concepteurs de raisonner sur le comportement du circuit cycle par cycle, simplifiant radicalement le processus de conception. Ce chapitre se concentrera exclusivement sur la conception des circuits séquentiels synchrones.

### 9.1.3 Modèle Général d\'un Circuit Séquentiel

Tout circuit séquentiel synchrone peut être représenté par un modèle canonique, illustré ci-dessous. Ce modèle décompose le circuit en deux parties fonctionnelles distinctes.

Figure 9.1 : Modèle Général d\'un Circuit Séquentiel Synchrone

1.  **Un bloc de logique combinatoire** : Ce bloc est responsable du calcul. Il reçoit en entrée les **entrées externes** du circuit (vecteur E) et l\'**état présent** (vecteur Q) fourni par les éléments de mémorisation. À partir de ces informations, il génère deux ensembles de signaux : les **sorties externes** du circuit (vecteur S) et l\'**état suivant** (vecteur Q+), qui représente l\'état que le circuit devra adopter au prochain cycle d\'horloge.

2.  **Un ensemble d\'éléments de mémorisation** : Généralement un **registre d\'état** composé de bascules (typiquement des bascules D). Ce registre a pour rôle de stocker l\'état présent Q. Au front actif de l\'horloge (CLK), il capture la valeur de l\'état suivant Q+ calculée par le bloc combinatoire et la met à disposition sur sa sortie Q, la maintenant stable jusqu\'au prochain front d\'horloge.

Le fonctionnement se déroule en deux phases par cycle d\'horloge :

- **Phase d\'évaluation** : Entre deux fronts d\'horloge, le registre d\'état maintient Q stable. Le bloc combinatoire dispose de ce temps pour calculer les nouvelles valeurs de S et Q+ à partir de E et Q.

- **Phase de mise à jour** : Sur le front actif de l\'horloge, le registre d\'état se met à jour, Q prenant la valeur de Q+. Ce nouvel état Q est alors présenté au bloc combinatoire, et un nouveau cycle d\'évaluation commence.

## 9.2 Éléments de Mémorisation : Verrous et Bascules

Les briques de base de la mémorisation dans les circuits séquentiels sont les verrous (*latches*) et les bascules (*flip-flops*). Bien que les termes soient parfois utilisés de manière interchangeable, ils désignent des composants au comportement temporel distinct.

### 9.2.1 Le Verrou (Latch) : Mémorisation Sensible au Niveau

Le verrou est un élément de mémoire dont l\'état de la sortie peut changer pendant toute la durée où son entrée de validation est active. On dit qu\'il est sensible au niveau (*level-sensitive*).

#### Le Verrou SR (Set-Reset)

Le verrou SR est l\'élément de mémorisation le plus fondamental, construit à partir de deux portes logiques interconnectées en boucle. Il existe en deux versions principales :

- **Verrou SR à portes NOR** : Il possède deux entrées, S (Set) et R (Reset), et deux sorties complémentaires, Q et Qˉ​.

  - **Mémorisation (S=0,R=0)** : Les sorties conservent leur état précédent.

  - **Mise à 1 (Set, S=1,R=0)** : La sortie Q est forcée à 1.

  - **Mise à 0 (Reset, S=0,R=1)** : La sortie Q est forcée à 0.

  - **État interdit (S=1,R=1)** : Les deux sorties Q et Qˉ​ sont forcées à 0, ce qui contredit leur complémentarité. Si S et R retournent à 0 simultanément, l\'état futur du verrou est imprévisible. Cette combinaison est donc à proscrire.

- **Verrou SˉRˉ à portes NAND** : Le fonctionnement est similaire, mais les entrées sont actives à l\'état bas. L\'état de mémorisation est Sˉ=1,Rˉ=1, et l\'état interdit est Sˉ=0,Rˉ=0.

#### Le Verrou D (Data)

Pour pallier le problème de l\'état interdit du verrou SR, le verrou D a été conçu. Il possède une entrée de donnée

D et une entrée de validation E (Enable). Sa structure interne garantit que les conditions Set et Reset ne sont jamais activées simultanément.

Son fonctionnement est le suivant :

- **Mode transparent (E=1)** : Le verrou est dit \"transparent\". La sortie Q recopie en permanence la valeur de l\'entrée D. Tout changement sur D est immédiatement répercuté sur Q.

- **Mode maintien (E=0)** : Le verrou mémorise la dernière valeur que D avait juste avant que E ne passe à 0. La sortie Q reste stable, insensible à tout changement sur D.

La transparence des verrous est une caractéristique à double tranchant. Si elle est utile pour capturer des données de manière asynchrone, elle est problématique dans les grands circuits synchrones. Si la sortie d\'un verrou est connectée, via un bloc combinatoire, à l\'entrée d\'un autre verrou validé par le même signal d\'horloge, un changement sur la première entrée peut se propager à travers plusieurs étages de logique et de verrous au sein d\'un même cycle d\'horloge. Ce phénomène de \"ruissellement\" recrée les difficultés de synchronisation des circuits asynchrones. C\'est pour briser cette transparence et imposer une discrétisation temporelle stricte que les bascules déclenchées par front ont été développées.

### 9.2.2 La Bascule (Flip-Flop) : Mémorisation Déclenchée par Front

La bascule est l\'élément de mémorisation fondamental des systèmes synchrones. Contrairement au verrou, la bascule ne met à jour sa sortie qu\'à un instant précis et très bref : une transition du signal d\'horloge, appelée

**front**. On parle de **front montant** (*rising edge*) pour une transition de 0 à 1, et de **front descendant** (*falling edge*) pour une transition de 1 à 0. On dit qu\'elle est sensible au front (

*edge-triggered*).

Une méthode classique pour construire une bascule est la structure **maître-esclave**, qui consiste à mettre en cascade deux verrous (le maître et l\'esclave) commandés par des signaux d\'horloge inversés. Lorsque l\'horloge est basse, le verrou maître est transparent et capture la donnée d\'entrée, tandis que l\'esclave est en mode maintien et conserve la sortie stable. Lorsque l\'horloge passe à l\'état haut, le maître se verrouille et l\'esclave devient transparent, propageant la valeur capturée par le maître vers la sortie. La sortie ne change donc qu\'au moment de la transition de l\'horloge.

Il existe plusieurs types de bascules, se distinguant par leurs entrées de commande.

- **La Bascule D (Data)** : C\'est la plus simple et la plus utilisée dans les conceptions modernes. Elle possède une seule entrée de donnée, D. Sa fonction est de recopier la valeur de D sur sa sortie Q au front actif de l\'horloge, et de la maintenir jusqu\'au front suivant. Son comportement est résumé par l\'équation Q(t+1)=D.

- **La Bascule JK** : C\'est historiquement la bascule la plus polyvalente. Elle possède deux entrées,\
  J (analogue à Set) et K (analogue à Reset).

  - J=0,K=0 : Mémorisation (l\'état ne change pas).

  - J=0,K=1 : Remise à 0 (Reset).

  - J=1,K=0 : Mise à 1 (Set).

  - J=1,K=1 : **Basculement (Toggle)**. La sortie s\'inverse : Q(t+1)=Q(t)​.

- **La Bascule T (Toggle)** : C\'est une version simplifiée de la bascule JK où les entrées J et K sont reliées ensemble pour former une seule entrée T.

  - T=0 : Mémorisation.

  - T=1 : Basculement (Toggle).\
    Elle est particulièrement adaptée à la construction de compteurs.

La bascule JK est souvent qualifiée d\'universelle car elle peut être configurée pour émuler les autres types de bascules. Par exemple, en reliant J et K, on obtient une bascule T. En connectant l\'entrée K à l\'inverse de l\'entrée J, on obtient une bascule D. Bien que cette flexibilité l\'ait rendue très populaire dans les conceptions à base de circuits intégrés discrets, les outils de synthèse modernes pour les circuits logiques programmables (FPGA) et les circuits intégrés à application spécifique (ASIC) utilisent quasi exclusivement la bascule D comme brique de base. Les comportements JK ou T sont alors implémentés par la logique combinatoire qui précède l\'entrée D de la bascule.

### 9.2.3 Tables Caractéristiques et Tables d\'Excitation

Pour analyser et concevoir des circuits séquentiels, deux types de tables sont indispensables pour décrire le comportement des bascules.

- **La table caractéristique** décrit le fonctionnement de la bascule. Elle exprime l\'état futur, Q(t+1), en fonction de l\'état présent, Q(t), et des entrées de commande. Elle répond à la question : \"Étant donné l\'état actuel et les entrées, quel sera le prochain état?\". C\'est l\'outil privilégié pour l\'**analyse** d\'un circuit.

- **La table d\'excitation** est la réciproque de la table caractéristique. Elle indique les valeurs que les entrées de commande doivent prendre pour provoquer une transition d\'un état présent Q(t) vers un état futur désiré Q(t+1). Elle répond à la question : \"Pour passer de l\'état A à l\'état B, quelles entrées dois-je appliquer?\". C\'est l\'outil fondamental pour la **synthèse** d\'un circuit.

Les tables ci-dessous présentent ces deux vues pour les principaux types de bascules.

**Table 9.2 : Bascule D**

  --------------------------- -------------------- -------------------------
  **Table Caractéristique**                        **Table d\'Excitation**

  **D**                       **Q(t+1)**           **Q(t)**

  0                           0                    0

  1                           1                    0

                                                   1

                                                   1
  --------------------------- -------------------- -------------------------

**Table 9.3 : Bascule T**

  --------------------------- --------------- --------------- -------------------------
  **Table Caractéristique**                                   **Table d\'Excitation**

  **T**                       **Q(t)**        **Q(t+1)**      **Q(t)**

  0                           0               0               0

  0                           1               1               0

  1                           0               1               1

  1                           1               0               1
  --------------------------- --------------- --------------- -------------------------

**Table 9.4 : Bascule JK**

  --------------------------- ------------ ------------ ------------ -------------------------
  **Table Caractéristique**                                          **Table d\'Excitation**

  **J**                       **K**        **Q(t)**     **Q(t+1)**   **Q(t)**

  0                           0            0            0            0

  0                           0            1            1            0

  0                           1            0            0            1

  0                           1            1            0            1

  1                           0            0            1            

  1                           0            1            1            

  1                           1            0            1            

  1                           1            1            0            
  --------------------------- ------------ ------------ ------------ -------------------------

La présence de conditions indifférentes (*Don\'t Care*, notées X) dans la table d\'excitation de la bascule JK est particulièrement importante. Elles représentent une flexibilité pour le concepteur : pour une transition donnée, l\'une des entrées peut être à 0 ou à 1 sans affecter le résultat. Par exemple, pour maintenir un état 0 (Q(t)=0→Q(t+1)=0), il faut que J=0, mais la valeur de K n\'a pas d\'importance (si K=0, on est en mode mémorisation ; si K=1, on est en mode Reset, ce qui force aussi la sortie à 0). Cette flexibilité peut être exploitée lors de la phase de simplification des équations logiques (par exemple, avec des tables de Karnaugh) pour obtenir un circuit combinatoire plus simple.

## 9.3 Modélisation par Machines à États Finis (FSM)

Les machines à états finis (*Finite State Machines*, FSM), ou automates finis, sont un modèle mathématique abstrait qui permet de décrire le comportement de n\'importe quel circuit séquentiel. Une FSM est définie par un ensemble d\'états, des transitions entre ces états déclenchées par des entrées, et des sorties générées par le système. Il existe deux modèles principaux pour les FSM, qui se distinguent par la manière dont les sorties sont générées : le modèle de Moore et le modèle de Mealy.

### 9.3.1 La Machine de Moore : Sorties Associées aux États

Une machine de Moore est formellement définie comme un 6-uplet (Q,Σ,Δ,δ,λ,q0​) où  :

- Q est un ensemble fini d\'états.

- Σ est l\'alphabet d\'entrée.

- Δ est l\'alphabet de sortie.

- δ:Q×Σ→Q est la fonction de transition, qui détermine l\'état suivant à partir de l\'état présent et de l\'entrée.

- λ:Q→Δ est la fonction de sortie.

- q0​ est l\'état initial.

La caractéristique fondamentale de la machine de Moore est que **la sortie dépend uniquement de l\'état présent**. Les sorties sont donc stables pendant toute la durée d\'un état et ne changent qu\'au moment d\'une transition d\'état, de manière synchrone avec l\'horloge.

Dans un **diagramme d\'états** de Moore, les états sont représentés par des cercles. À l\'intérieur de chaque cercle, on indique le nom de l\'état et la valeur de la sortie associée à cet état (ex: EtatA / SortieX). Les transitions sont représentées par des flèches entre les états, étiquetées avec la condition d\'entrée qui les provoque.

### 9.3.2 La Machine de Mealy : Sorties Associées aux Transitions

Une machine de Mealy est également définie par un 6-uplet, mais sa fonction de sortie est différente  :

- λ:Q×Σ→Δ est la fonction de sortie.

Ici, **la sortie dépend à la fois de l\'état présent et de l\'entrée actuelle**. Cela signifie que les sorties sont générées

*pendant* les transitions. Une conséquence majeure est qu\'un changement sur une entrée peut se propager immédiatement à la sortie (à travers le bloc de logique combinatoire) sans attendre le prochain front d\'horloge. La sortie est donc potentiellement asynchrone par rapport à l\'horloge.

Dans un **diagramme d\'états** de Mealy, les sorties sont écrites sur les flèches de transition, à côté de l\'entrée qui les génère, sous le format entrée / sortie.

### 9.3.3 Comparaison et Équivalence des Modèles

Sur le plan de la puissance de calcul, les deux modèles sont équivalents : toute fonction réalisable par une machine de Moore peut l\'être par une machine de Mealy, et vice-versa. Le choix entre les deux modèles est donc une question de conception qui implique des compromis.

Une machine de Mealy réagit plus rapidement aux entrées, car la sortie peut changer au cours du même cycle d\'horloge que l\'entrée, sans attendre le front suivant. Elle peut également nécessiter moins d\'états pour implémenter une même fonction. Cependant, cette réactivité a un coût : si les entrées du circuit sont bruitées ou ne sont pas parfaitement synchronisées avec l\'horloge du système, ces \"glitches\" peuvent se propager directement aux sorties. La machine de Moore, en revanche, a une sortie qui est par nature \"enregistrée\" et synchronisée avec l\'état. Elle est donc insensible aux aléas sur les entrées qui se produisent entre les fronts d\'horloge. Sa sortie est plus \"propre\", mais elle présente une latence d\'un cycle d\'horloge par rapport à une machine de Mealy équivalente.

**Table 9.5 : Comparaison des Modèles de Moore et de Mealy**

  ------------------------------------ --------------------------------------------------------- ----------------------------------------------------
  Critère                              Machine de Moore                                          Machine de Mealy

  **Dépendance de la sortie**          Uniquement de l\'état présent                             État présent ET entrée actuelle

  **Synchronisation de la sortie**     Synchrone avec l\'horloge (enregistrée)                   Potentiellement asynchrone (combinatoire)

  **Vitesse de réaction**              Réagit au cycle d\'horloge suivant (latence de 1 cycle)   Réagit dans le même cycle d\'horloge

  **Nombre d\'états typique**          Potentiellement plus élevé                                Potentiellement plus faible

  **Robustesse aux aléas d\'entrée**   Élevée (les aléas sont filtrés par les bascules)          Faible (les aléas peuvent se propager aux sorties)

  **Représentation**                   Sortie dans l\'état (cercle)                              Sortie sur la transition (flèche)
  ------------------------------------ --------------------------------------------------------- ----------------------------------------------------

### 9.3.4 Conversion entre Machines de Mealy et de Moore

Il est toujours possible de convertir un modèle en l\'autre de manière algorithmique.

- **Conversion de Moore vers Mealy** : Cette conversion est directe. Le nombre d\'états ne change pas. Pour chaque transition de l\'état Qi​ vers l\'état Qj​ sur une entrée Ek​, la sortie associée à cette transition dans la machine de Mealy est simplement la sortie qui était associée à l\'état de destination Qj​ dans la machine de Moore.

- **Conversion de Mealy vers Moore** : Cette conversion est plus complexe et peut entraîner une augmentation du nombre d\'états. Si plusieurs transitions arrivant à un même état Qi​ dans la machine de Mealy ont des sorties différentes, cet état Qi​ doit être dupliqué dans la machine de Moore. On crée un nouvel état pour chaque sortie unique associée aux transitions entrantes. Par exemple, si des transitions vers Qi​ produisent les sorties S1​ et S2​, on créera deux états Qi1​ et Qi2​ dans la machine de Moore, avec les sorties respectives S1​ et S2​. Toutes les transitions qui arrivaient en Qi​ avec la sortie S1​ sont redirigées vers Qi1​, et celles avec la sortie S2​ vers Qi2​. Toutes les transitions qui partaient de Qi​ doivent être dupliquées pour partir de Qi1​ et Qi2​.

## 9.4 Analyse des Circuits Séquentiels Synchrones

L\'analyse d\'un circuit séquentiel est la démarche qui consiste, à partir de son schéma logique, à déterminer son comportement fonctionnel. L\'objectif final est d\'obtenir une description de haut niveau de sa fonction, généralement sous la forme d\'un diagramme d\'états.

### 9.4.1 Procédure d\'Analyse Systématique

La procédure d\'analyse d\'un circuit séquentiel synchrone est une méthode rigoureuse qui se décompose en plusieurs étapes  :

1.  **Identification** : Identifier les entrées externes, les sorties externes et les variables d\'état (les sorties Q de chaque bascule).

2.  **Équations d\'excitation et de sortie** : Établir les expressions logiques pour les entrées de commande de chaque bascule (par exemple, DA​,JB​,KB​, etc.) en fonction des entrées externes et des variables d\'état. Établir également les expressions pour chaque sortie externe.

3.  **Équations d\'état** : Pour chaque bascule, utiliser son équation d\'excitation et sa table caractéristique pour dériver l\'équation d\'état, qui exprime l\'état futur de la bascule (Q+) en fonction de son état présent (Q) et des entrées externes. Pour une bascule D, c\'est direct : Q+=D. Pour une bascule JK, l\'équation est Q+=JQˉ​+KˉQ.

4.  **Table d\'états** : Construire une table de transition (ou table d\'états) qui répertorie, pour chaque état présent possible et chaque combinaison d\'entrées externes, l\'état suivant et les sorties correspondantes.

5.  **Diagramme d\'états** : Traduire la table d\'états en une représentation graphique, le diagramme d\'états, qui illustre de manière intuitive les transitions et le comportement global du circuit.

### 9.4.2 Dérivation des Équations

Cette étape consiste à traiter le circuit comme un ensemble de blocs combinatoires. Le premier bloc calcule les entrées des bascules. Par exemple, pour un circuit avec deux bascules A et B de type D, et une entrée externe X, on écrira les équations :

DA​=fA​(A,B,X)

DB​=fB​(A,B,X)

Le second bloc calcule les sorties. Pour une sortie Y :

Y=g(A,B,X)

### 9.4.3 Construction de la Table et du Diagramme d\'États

La table d\'états est le cœur de l\'analyse. Elle possède des lignes pour chaque état binaire possible (pour n bascules, il y a 2n états) et des colonnes pour chaque combinaison d\'entrées. Chaque cellule de la table indique l\'état suivant et la sortie, calculés à partir des équations d\'état et de sortie.

Une fois la table complète, le diagramme d\'états est dessiné. Chaque ligne de la table correspond à un état (un cercle dans le diagramme). Pour chaque état, on trace des flèches vers les états suivants indiqués dans la table, en étiquetant chaque flèche avec la combinaison d\'entrées/sorties correspondante (modèle de Mealy) ou simplement les entrées (modèle de Moore).

### 9.4.4 Exemple d\'Analyse d\'un Circuit Inconnu

Considérons un circuit simple avec deux bascules JK, A et B, une entrée X et une sortie Y. Supposons que l\'analyse des schémas nous donne les équations suivantes :

JA​=B⋅X

KA​=B⋅Xˉ

JB​=Aˉ⋅X

KB​=A+Xˉ

Y=A⋅B

En appliquant les équations d\'état Q+=JQˉ​+KˉQ, nous pouvons construire la table d\'états, puis le diagramme, et finalement interpréter la fonction du circuit (par exemple, un détecteur d\'une séquence particulière).

## 9.5 Synthèse des Circuits Séquentiels Synchrones

La synthèse est le processus de conception qui, partant d\'une description fonctionnelle (un cahier des charges), aboutit à un schéma logique complet. C\'est la démarche inverse de l\'analyse.

### 9.5.1 La Démarche de Conception : du Cahier des Charges au Circuit

La conception d\'un circuit séquentiel suit une méthodologie structurée pour garantir que le circuit final implémente correctement le comportement désiré.

1.  **Modélisation** : Traduire la description textuelle du problème en un diagramme d\'états formel (FSM).

2.  **Minimisation** : Réduire le nombre d\'états du diagramme pour simplifier le circuit final.

3.  **Codage** : Assigner un code binaire unique à chaque état.

4.  Implémentation :\
    a. Choisir le type de bascules à utiliser.\
    b. Construire la table d\'excitation du circuit.\
    c. Dériver les équations logiques simplifiées pour les entrées des bascules et les sorties.\
    d. Dessiner le schéma logique final.

### 9.5.2 Étape 1 : Création du Diagramme d\'États

C\'est l\'étape la plus créative et la moins formalisée. Elle requiert une compréhension profonde du problème pour définir un ensemble d\'états qui capturent l\'historique nécessaire. Chaque état doit correspondre à une situation unique dans la séquence de fonctionnement. Par exemple, pour un détecteur de la séquence \"101\", on aura besoin d\'un état initial (\"rien détecté\"), d\'un état \"1 détecté\", et d\'un état \"10 détecté\".

### 9.5.3 Étape 2 : Minimisation du Nombre d\'États (Méthode de la Table d\'Implication)

Un diagramme d\'états initial peut contenir des états redondants. Deux états sont dits **équivalents** s\'il est impossible de les distinguer de l\'extérieur en observant les sorties produites en réponse à n\'importe quelle séquence d\'entrées. La minimisation consiste à fusionner les états équivalents pour obtenir le plus petit automate réalisant la même fonction. La

**table d\'implication** est un algorithme systématique pour trouver ces équivalences.

La procédure est la suivante :

1.  **Construire la table** : Créer une grille triangulaire avec une case pour chaque paire d\'états distincts (Qi​,Qj​).

2.  **Passe 1 (Sorties)** : Pour chaque case (Qi​,Qj​), comparer les sorties des états Qi​ et Qj​ pour chaque entrée. Si les sorties diffèrent pour au moins une entrée, les états ne sont pas équivalents. Marquer la case d\'une croix (×).

3.  **Passe 1 (Implications)** : Si les sorties sont identiques pour toutes les entrées, les états Qi​ et Qj​ sont potentiellement équivalents. Pour qu\'ils le soient, leurs états suivants doivent aussi être équivalents pour chaque entrée. Inscrire dans la case (Qi​,Qj​) les paires d\'états suivants impliquées. Si les états suivants sont identiques (Qk​,Qk​), l\'implication est triviale et n\'est pas notée.

4.  **Passes suivantes (Propagation)** : Parcourir la table. Si une case (Qi​,Qj​) contient une paire impliquée (Qk​,Ql​) et que la case (Qk​,Ql​) est déjà marquée d\'une croix, alors l\'implication est fausse. Marquer la case (Qi​,Qj​) d\'une croix. Répéter cette passe jusqu\'à ce qu\'aucune nouvelle croix ne puisse être ajoutée.

5.  **Conclusion** : Les cases qui ne sont pas marquées d\'une croix à la fin du processus représentent des paires d\'états équivalents. On peut alors fusionner ces états.

### 9.5.4 Étape 3 : Codage des États

Après minimisation, chaque état symbolique (ex: EtatA, EtatB) doit se voir assigner un code binaire unique. Le nombre de bascules n nécessaires pour N états est tel que 2n≥N. Les deux stratégies de codage les plus courantes sont  :

- **Codage binaire naturel** : Assignation séquentielle des nombres binaires (00, 01, 10,\...). C\'est le plus économique en nombre de bascules (n=⌈log2​N⌉).

- **Codage \"One-Hot\"** : Utilise N bascules pour N états. Chaque état est codé par un mot binaire où un seul bit est à \'1\'. Par exemple, pour 4 états : 0001, 0010, 0100, 1000. Ce codage peut considérablement simplifier la logique combinatoire, au prix d\'un plus grand nombre de bascules.

### 9.5.5 et 9.5.6 : Choix des Bascules, Dérivation des Équations et Implémentation

Une fois la table d\'états codée obtenue, on choisit un type de bascule. On construit alors la table d\'excitation du circuit en utilisant la table d\'excitation de la bascule choisie. Cette table liste, pour chaque transition d\'état, les entrées requises pour les bascules. À partir de cette table, on utilise des outils de simplification (comme les tables de Karnaugh) pour dériver les équations logiques minimales pour les entrées de chaque bascule et pour les sorties externes. La dernière étape consiste à dessiner le schéma logique correspondant à ces équations.

### 9.5.7 Étude de Cas Complète : Conception d\'un Détecteur de Séquence \"1011\"

Appliquons cette méthodologie à un problème classique : la conception d\'un circuit qui détecte la séquence \"1011\" dans un flux de bits en série. Une sortie Z doit passer à 1 lorsque la séquence est reconnue. Nous considérerons le cas avec chevauchement (*overlapping*), où le dernier bit d\'une séquence peut être le premier d\'une nouvelle séquence.

1.  **Diagramme d\'états (Modèle de Mealy)** :

    - S0 (état initial) : Rien de la séquence n\'a été vu. Si l\'entrée est 0, on reste en S0. Si c\'est 1, on a le début de la séquence, on va en S1. Sortie Z=0.

    - S1 (\"1\" vu) : Si l\'entrée est 1, on a \"11\", ce n\'est pas le début de \"1011\" mais le dernier \'1\' peut être un nouveau début. On reste en S1. Si l\'entrée est 0, on a \"10\", on progresse vers S2. Sortie Z=0.

    - S2 (\"10\" vu) : Si l\'entrée est 0, on a \"100\", la séquence est rompue, on retourne en S0. Si l\'entrée est 1, on a \"101\", on progresse vers S3. Sortie Z=0.

    - S3 (\"101\" vu) : Si l\'entrée est 0, on a \"1010\", la séquence est rompue mais se termine par \"10\", on retourne donc en S2. Si l\'entrée est 1, on a \"1011\", la séquence est détectée! La sortie Z passe à 1. Le dernier \'1\' étant un début de séquence, on retourne en S1.

2.  **Minimisation** : Le diagramme a 4 états. Une analyse montrerait qu\'aucun état n\'est équivalent.

3.  **Codage** : 4 états nécessitent 2 bascules (Q1​,Q0​). Codage binaire : S0=00, S1=01, S2=10, S3=11.

4.  Implémentation (avec des bascules D) :\
    On construit la table d\'excitation. Les entrées des bascules (D1​,D0​) sont simplement les bits de l\'état suivant.

  -------------- ------------ -------------- ------------ ------------------
  État Présent   Entrée       État Suivant   Sortie       Entrées Bascules

  Q1​Q0​           X            Q1+​Q0+​         Z            D1​D0​

  00             0            00             0            00

  00             1            01             0            01

  01             0            10             0            10

  01             1            01             0            01

  10             0            00             0            00

  10             1            11             0            11

  11             0            10             0            10

  11             1            01             1            01
  -------------- ------------ -------------- ------------ ------------------

À partir de cette table, on peut utiliser des tables de Karnaugh pour trouver les équations simplifiées pour \$D_1\$, \$D_0\$ et \$Z\$ en fonction de \$Q_1, Q_0\$ et \$X\$, puis dessiner le circuit.

## 9.6 Conception de Modules Séquentiels Standards

La méthodologie de synthèse des FSM permet de concevoir n\'importe quel circuit séquentiel. Cependant, certains modules sont si courants qu\'ils existent sous forme de composants standards. Les registres et les compteurs en sont les principaux exemples.

### 9.6.1 Les Registres

Un registre est un ensemble de bascules, généralement de type D, partageant une horloge commune, conçu pour mémoriser un mot binaire de n bits. Les registres à décalage ajoutent la capacité de déplacer les bits stockés d\'une position à une autre à chaque coup d\'horloge.

- **Types de Registres à Décalage**  :

  - **SISO (Serial-In, Serial-Out)** : Les données entrent et sortent bit par bit. Ils sont utilisés comme lignes à retard numériques.

  - **SIPO (Serial-In, Parallel-Out)** : Les données entrent en série et sont disponibles simultanément sur toutes les sorties. Ils servent à la conversion de données série en parallèle, par exemple dans les récepteurs de communication.

  - **PISO (Parallel-In, Serial-Out)** : Les données sont chargées simultanément sur toutes les entrées et sont lues en série, bit par bit. Ils réalisent la conversion parallèle-série, utile pour la transmission de données.

  - **PIPO (Parallel-In, Parallel-Out)** : Les données sont chargées et lues en parallèle. Ils servent principalement à la mémorisation temporaire (buffer).

- **Conception d\'un Registre Universel** : Un registre universel est un circuit flexible qui combine toutes les fonctionnalités précédentes. Des entrées de commande permettent de sélectionner le mode de fonctionnement : maintien, décalage à gauche, décalage à droite ou chargement parallèle. Sa conception repose sur l\'utilisation de multiplexeurs à l\'entrée de chaque bascule. Chaque multiplexeur sélectionne la source de la donnée pour l\'entrée Di​ de la bascule i : la sortie de la bascule voisine de gauche (Qi+1​ pour un décalage à gauche), la sortie de la bascule voisine de droite (Qi−1​ pour un décalage à droite), l\'entrée parallèle correspondante (Ei​), ou sa propre sortie (Qi​ pour le maintien).

### 9.6.2 Les Compteurs

Un compteur est un circuit séquentiel qui parcourt une séquence prédéfinie d\'états à chaque impulsion d\'horloge.

- Compteurs Asynchrones (à Propagation) :\
  Dans cette structure, seule la première bascule est connectée à l\'horloge externe. La sortie de chaque bascule sert d\'horloge pour la bascule suivante.69

  - **Avantages** : Conception extrêmement simple.

  - **Inconvénients** : Le principal défaut est le délai de propagation qui s\'accumule à travers les étages. Le changement d\'état de la dernière bascule est décalé par rapport à la première, ce qui limite la fréquence maximale de comptage et peut générer des états transitoires erronés (glitches) lors du décodage des sorties.

- Compteurs Synchrones :\
  Toutes les bascules sont connectées à la même horloge et commutent donc simultanément.72 Une logique combinatoire est nécessaire pour calculer les entrées de chaque bascule afin de produire la séquence de comptage correcte.

  - **Avantages** : Absence de délai de propagation cumulé, fonctionnement beaucoup plus rapide et fiable, pas de glitches de sortie.

  - **Inconvénients** : La logique de commande est plus complexe que pour un compteur asynchrone.

- Synthèse de Compteurs sur Mesure :\
  La méthode de synthèse FSM est idéale pour concevoir des compteurs dont la séquence n\'est pas binaire naturelle.

  - **Compteur BCD (Binary-Coded Decimal)** : C\'est un compteur modulo 10 qui parcourt les états de 0000 à 1001, puis retourne à 0000. Sa synthèse implique de définir ce cycle dans un diagramme d\'états, puis de dériver la logique qui force la transition de l\'état 9 (1001) à l\'état 0 (0000) au lieu de l\'état 10 (1010).

  - **Compteur en Code Gray** : Ce code a la particularité qu\'un seul bit change entre deux valeurs consécutives. Un compteur en code Gray est très utile dans les systèmes d\'interface avec le monde physique (ex: capteurs de position) pour éviter les lectures erronées pendant les transitions. Sa conception suit la démarche FSM : on définit la séquence d\'états désirée (000, 001, 011, 010, 110,\...) et on synthétise la logique de transition correspondante.

## 9.7 Contraintes Temporelles dans les Circuits Synchrones

Le modèle synchrone idéal suppose que les changements d\'état sont instantanés et que les signaux se propagent sans délai. En réalité, les circuits physiques ont des contraintes temporelles qui doivent être scrupuleusement respectées pour garantir un fonctionnement fiable.

### 9.7.1 Temps de Pré-positionnement (Setup) et de Maintien (Hold)

Ces deux paramètres sont des caractéristiques fondamentales de toute bascule et définissent une \"fenêtre temporelle\" autour du front actif de l\'horloge pendant laquelle l\'entrée de donnée doit être stable.

- **Temps de pré-positionnement (tsetup​)** : C\'est la durée minimale pendant laquelle l\'entrée de donnée doit être stable et valide *avant* l\'arrivée du front actif de l\'horloge. Si la donnée change pendant cet intervalle, la bascule risque de ne pas la capturer correctement.

- **Temps de maintien (thold​)** : C\'est la durée minimale pendant laquelle l\'entrée de donnée doit rester stable et valide *après* le front actif de l\'horloge. Si la donnée change trop tôt après le front, la bascule pourrait ne pas avoir eu le temps de mémoriser de manière fiable l\'ancienne valeur.

Ces contraintes proviennent du fonctionnement physique interne de la bascule, qui a besoin d\'un certain temps pour capturer et isoler la nouvelle donnée.

### 9.7.2 Temps de Propagation et Fréquence Maximale d\'Horloge

Une fois qu\'un front d\'horloge actif se produit, la sortie de la bascule ne change pas instantanément. Le **temps de propagation (tpcq​)** est le délai entre le front d\'horloge et le moment où la sortie Q devient stable à sa nouvelle valeur.

Dans un circuit séquentiel synchrone, le signal doit avoir le temps de se propager de la sortie d\'un registre, à travers le bloc de logique combinatoire, et d\'arriver à l\'entrée du registre suivant en respectant son temps de pré-positionnement. Cela impose une contrainte sur la période minimale de l\'horloge, Tclk​. Le chemin qui prend le plus de temps entre deux registres est appelé le **chemin critique**. La période de l\'horloge doit être au moins aussi longue que ce délai maximal :

Tclk​≥tpcq​+tpd(max)​+tsetup​

où tpd(max)​ est le délai de propagation maximal du bloc de logique combinatoire.

Cette équation fondamentale dicte la performance d\'un système synchrone. La fréquence maximale de fonctionnement, fmax​, est l\'inverse de cette période minimale (fmax​=1/Tclk(min)​). La vitesse du circuit est donc limitée par son chemin le plus lent. L\'optimisation des circuits séquentiels vise souvent à réduire le délai du chemin critique pour augmenter la fréquence d\'horloge.

### 9.7.3 Le Phénomène de Métastabilité

Violer les contraintes de temps de pré-positionnement ou de maintien peut plonger une bascule dans un état **métastable**. Dans cet état, la sortie de la bascule est indéfinie : elle peut osciller ou se stabiliser à une tension intermédiaire, ni un 0 logique, ni un 1 logique. Bien que la bascule finisse par se résoudre à un état stable (0 ou 1), le temps nécessaire pour cette résolution est non borné et imprévisible.

Dans un système synchrone, où des milliers de bascules lisent cette sortie, un état métastable peut conduire à une défaillance catastrophique, car différentes parties du circuit peuvent interpréter la tension ambiguë différemment. Le respect strict de la discipline de synchronisation, et en particulier des temps de pré-positionnement et de maintien, est donc une condition non négociable pour la conception de systèmes numériques fiables.

