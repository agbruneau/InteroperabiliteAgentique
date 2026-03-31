# Chapitre I.12 : Conception du Processeur Central (CPU)

## Introduction du Chapitre

L\'unité centrale de traitement, ou processeur (CPU), constitue le cœur de tout système informatique moderne. Elle est le moteur qui exécute les instructions des programmes, manipule les données et orchestre l\'ensemble des opérations du système. Comprendre le fonctionnement interne d\'un processeur est une étape fondamentale pour quiconque aspire à maîtriser les sciences et le génie informatiques, que ce soit pour concevoir du matériel plus performant, développer des logiciels optimisés ou architecturer des systèmes complexes.

Ce chapitre se distingue d\'une simple description anatomique du processeur. Il ne se contente pas de répondre à la question « *De quoi est fait un CPU?* », mais s\'attache à guider le lecteur à travers le processus de conception pour répondre à la question bien plus fondamentale : « *Comment un CPU fonctionne-t-il?* ». Notre démarche adoptera la perspective d\'un architecte système partant d\'une feuille blanche. En nous appuyant sur les exigences d\'un jeu d\'instructions (ISA) simple et représentatif, nous assemblerons, brique par brique, les composants matériels qui lui donnent vie.

L\'approche sera délibérément constructive et progressive, reflétant un véritable processus d\'ingénierie. Nous débuterons par la construction du « squelette » du processeur : le **chemin de données** (ou *datapath*), qui regroupe l\'ensemble des unités fonctionnelles chargées de stocker, manipuler et acheminer les données. Ensuite, nous doterons ce squelette d\'un « cerveau » : l\'**unité de contrôle**, qui interprète les instructions et commande le chemin de données pour qu\'il exécute les opérations appropriées. Nous explorerons deux philosophies de conception pour cette unité de contrôle, l\'une câblée et l\'autre microprogrammée, mettant en lumière un compromis fondamental entre vitesse et flexibilité.

Enfin, une fois notre processeur fonctionnel mais simple assemblé, nous nous tournerons vers l\'optimisation de sa performance. Nous introduirons le concept de **pipelining**, une technique inspirée des chaînes de montage industrielles qui permet de paralléliser l\'exécution de plusieurs instructions. Si le pipelining est la clé des hautes performances des processeurs modernes, il introduit également une nouvelle classe de défis de conception appelés « aléas ». Une part substantielle de ce chapitre sera consacrée à l\'analyse approfondie de ces aléas --- structurels, de données et de contrôle --- et à l\'élaboration des mécanismes sophistiqués, tels que la transmission de données (*forwarding*) et la prédiction de branchement, qui permettent de les résoudre.

À chaque étape de ce parcours, nous mettrons en exergue les décisions de conception et les compromis inhérents à l\'ingénierie matérielle. Le lecteur sera ainsi invité non seulement à comprendre la structure finale d\'un processeur, mais aussi à apprécier la logique, les défis et l\'élégance des solutions qui sous-tendent sa conception.

## 12.1 Le Chemin de Données (Datapath) : L\'ossature matérielle de l\'exécution

### 12.1.1 Introduction : Définition et principes de conception d\'un chemin de données

Au cœur de tout processeur se trouve le chemin de données, ou *datapath*. Il s\'agit de la collection de toutes les unités fonctionnelles matérielles qui participent au stockage, à la manipulation et au transfert des données au sein du CPU. Si l\'unité de contrôle est le cerveau qui donne les ordres, le chemin de données constitue les muscles et le système circulatoire qui exécutent ces ordres. Il comprend des éléments de mémorisation, tels que le compteur ordinal et le banc de registres, et des éléments de calcul, comme l\'unité arithmétique et logique (UAL). Ces composants sont interconnectés par des bus, qui sont des ensembles de fils servant de voies de communication pour les données.

La conception d\'un chemin de données n\'est pas un exercice abstrait ; elle est entièrement dictée par les exigences du jeu d\'instructions (ISA) que le processeur doit implémenter. Chaque instruction, qu\'il s\'agisse d\'une addition, d\'un accès mémoire ou d\'un saut, impose des contraintes spécifiques sur le matériel. Le chemin de données doit fournir les ressources et les interconnexions nécessaires pour réaliser les opérations sémantiques de chaque instruction de l\'ISA.

Pour notre étude, nous baserons notre conception sur un sous-ensemble simplifié mais représentatif d\'un ISA de type RISC (Reduced Instruction Set Computer), inspiré d\'architectures comme MIPS ou RISC-V. Les architectures RISC se caractérisent par un jeu d\'instructions simple, régulier et de taille fixe, ce qui simplifie considérablement la conception matérielle et se prête particulièrement bien à des techniques d\'optimisation comme le pipelining. Notre sous-ensemble d\'instructions cibles inclura :

1.  **Les instructions arithmétiques et logiques de type-R** (pour \"Registre\") : Ces instructions, telles que add, sub, and, or, lisent leurs opérandes depuis deux registres sources et écrivent le résultat dans un registre destination.

2.  **Les instructions d\'accès à la mémoire** : lw (load word) pour lire une donnée de la mémoire vers un registre, et sw (store word) pour écrire une donnée d\'un registre vers la mémoire.

3.  **L\'instruction de branchement conditionnel** : beq (branch on equal), qui compare le contenu de deux registres et, s\'ils sont égaux, modifie le flux d\'exécution du programme en sautant à une nouvelle adresse.

Notre approche sera incrémentale. Nous commencerons par concevoir le matériel minimal nécessaire à la tâche la plus fondamentale --- le chargement d\'une instruction --- puis nous enrichirons progressivement notre chemin de données pour prendre en charge, tour à tour, les instructions de type-R, les accès mémoire et les branchements. Cette méthode nous permettra de comprendre la raison d\'être de chaque composant et de chaque connexion, en construisant une architecture complexe à partir de briques logiques simples.

### 12.1.2 Étape 1 : Le chargement de l\'instruction (Instruction Fetch)

L\'exécution de n\'importe quelle instruction commence invariablement par la même étape fondamentale : son chargement (ou *fetch*) depuis la mémoire où le programme est stocké. Le chemin de données doit donc, avant toute chose, être capable de réaliser cette opération. Cela requiert trois composants matériels essentiels.

#### Le Compteur Ordinal (PC)

Le Compteur Ordinal (PC, pour *Program Counter*) est un registre 32 bits dont le seul rôle est de contenir l\'adresse mémoire de l\'instruction en cours d\'exécution. Il est l\'un des éléments d\'état les plus critiques du processeur, car il dicte le flux de contrôle du programme. À chaque cycle, l\'adresse qu\'il contient est envoyée à la mémoire d\'instructions pour en extraire l\'instruction à exécuter. Une fois l\'instruction en cours traitée, le PC doit être mis à jour pour pointer vers la prochaine instruction.

#### La Mémoire d\'Instructions

La mémoire d\'instructions est une unité de stockage qui contient le code binaire du programme à exécuter. D\'un point de vue fonctionnel, elle se comporte comme une grande table de consultation : elle reçoit une adresse 32 bits en entrée (provenant du PC) et fournit en sortie l\'instruction de 32 bits stockée à cette adresse.

Une décision de conception cruciale doit être prise ici. Dans une architecture de **von Neumann** traditionnelle, une seule mémoire est partagée pour les instructions et les données. Cela crée un goulot d\'étranglement potentiel, car le processeur ne peut pas charger une instruction et accéder à une donnée simultanément. Pour notre processeur, et en prévision du pipelining, nous adopterons une architecture de type

**Harvard**, qui utilise des mémoires physiquement séparées pour les instructions et les données. Cela permet de charger la prochaine instruction (étape

*Fetch*) en même temps qu\'une instruction précédente accède aux données (étape *Memory*), évitant ainsi un conflit de ressource, ou aléa structurel. Dans notre modèle simple, nous pouvons considérer la mémoire d\'instructions comme une mémoire en lecture seule, car le programme est chargé avant l\'exécution et n\'est pas modifié par la suite.

#### L\'Additionneur PC+4

Dans un ISA RISC, les instructions ont une taille fixe. Pour notre architecture 32 bits, chaque instruction occupe 4 octets. Par conséquent, après avoir exécuté une instruction à l\'adresse PC, l\'instruction suivante dans le flux séquentiel se trouvera à l\'adresse PC+4. Pour calculer cette adresse, nous avons besoin d\'un additionneur dédié. Cet additionneur prend la valeur actuelle du PC comme une de ses entrées et une constante câblée (la valeur 4) comme seconde entrée. Sa sortie,

PC+4, représente l\'adresse de la prochaine instruction à exécuter si aucun saut ou branchement n\'a lieu. Ce calcul s\'effectue en parallèle du chargement de l\'instruction depuis la mémoire, anticipant ainsi la mise à jour du PC pour le cycle suivant.

En combinant ces trois éléments, nous obtenons le premier fragment de notre chemin de données. Le PC envoie son adresse à la mémoire d\'instructions. Simultanément, il envoie son adresse à l\'additionneur qui calcule PC+4. La mémoire d\'instructions renvoie l\'instruction de 32 bits correspondante. À la fin du cycle, la valeur PC+4 sera utilisée pour mettre à jour le PC, préparant le chargement de l\'instruction suivante.

### 12.1.3 Étape 2 : L\'exécution des instructions arithmétiques et logiques (Type-R)

Les instructions de type-R, telles que add rd, rs1, rs2, forment le cœur des opérations de calcul d\'un processeur RISC. Leur sémantique est simple : lire les valeurs contenues dans deux registres sources (rs1 et rs2), effectuer une opération sur ces valeurs, et écrire le résultat dans un registre destination (rd). Pour implémenter ce type d\'instruction, nous devons ajouter deux composants majeurs à notre chemin de données : le banc de registres et l\'unité arithmétique et logique.

#### Le Banc de Registres (Register File)

Le banc de registres est une petite mémoire très rapide, intégrée au processeur, qui contient l\'état du programme : les valeurs des variables, les pointeurs, etc. Pour notre architecture 32 bits, il s\'agit d\'un ensemble de 32 registres, chacun large de 32 bits. Une caractéristique essentielle du banc de registres, dictée par le format des instructions de type-R, est sa capacité à effectuer plusieurs accès simultanément. Pour exécuter une instruction comme

add en un seul cycle, il doit être capable de lire deux registres sources et d\'écrire dans un registre destination en même temps. Cela se traduit par une conception matérielle dotée de plusieurs ports d\'accès  :

- **Deux ports de lecture** : Chaque port de lecture possède une entrée d\'adresse de 5 bits (suffisant pour sélectionner l\'un des 32 registres, car 25=32) et une sortie de données de 32 bits. Les champs rs1 et rs2 de l\'instruction (chacun sur 5 bits) sont directement connectés à ces entrées d\'adresse. Les données lues sont alors disponibles sur les ports de sortie correspondants. La lecture est une opération combinatoire : dès que les adresses sont stables en entrée, les données sont disponibles en sortie après un court délai de propagation.

- **Un port d\'écriture** : Ce port est composé d\'une entrée d\'adresse de 5 bits (connectée au champ rd de l\'instruction), d\'une entrée de données de 32 bits (qui recevra le résultat du calcul), et d\'un signal de contrôle d\'écriture nommé RegWrite. L\'écriture dans un registre est une opération séquentielle, synchronisée par l\'horloge du processeur. L\'écriture n\'a lieu que si le signal\
  RegWrite est activé (mis à 1) au moment du front montant de l\'horloge. Cela empêche une modification accidentelle des registres par des instructions qui ne sont pas censées le faire (comme sw ou beq).

#### L\'Unité Arithmétique et Logique (UAL/ALU)

L\'Unité Arithmétique et Logique (UAL, ou ALU en anglais) est le centre de calcul du processeur. C\'est un circuit combinatoire qui prend deux opérandes de 32 bits en entrée et produit un résultat de 32 bits en sortie. L\'opération spécifique à effectuer (addition, soustraction, ET logique, OU logique, etc.) est déterminée par un signal de contrôle de plusieurs bits, souvent appelé

ALUControl ou ALUOperation. Pour les instructions de type-R, les deux entrées de l\'UAL sont directement connectées aux deux ports de sortie de données du banc de registres. Le résultat de 32 bits produit par l\'UAL est ensuite acheminé vers le port d\'entrée de données du banc de registres, prêt à être écrit dans le registre de destination rd si RegWrite est activé.

En assemblant ces pièces, le chemin de données pour une instruction de type-R se dessine. L\'instruction est chargée et ses champs rs1, rs2 et rd sont extraits. rs1 et rs2 sont envoyés aux ports d\'adresse de lecture du banc de registres. Les données lues sont acheminées vers les entrées de l\'UAL. L\'UAL effectue l\'opération spécifiée par l\'unité de contrôle. Le résultat est renvoyé au port d\'écriture du banc de registres, dont l\'adresse est spécifiée par rd. L\'unité de contrôle active RegWrite pour que le résultat soit mémorisé à la fin du cycle.

### 12.1.4 Étape 3 : L\'accès à la mémoire (Instructions Load/Store)

Les instructions de type load (lw) et store (sw) sont essentielles car elles constituent le pont entre le processeur et la mémoire principale. Elles permettent de charger des données depuis la mémoire vers les registres et, inversement, de sauvegarder le contenu des registres en mémoire. La sémantique de ces instructions implique le calcul d\'une adresse mémoire. Cette adresse est obtenue en additionnant le contenu d\'un registre de base (spécifié par

rs1) à une valeur de décalage (offset) de 16 bits, contenue directement dans l\'instruction. L\'implémentation de ces instructions nécessite d\'ajouter trois nouveaux éléments à notre chemin de données.

#### La Mémoire de Données

Conformément à notre choix d\'une architecture de type Harvard, nous introduisons une mémoire de données distincte de la mémoire d\'instructions. Cette unité de mémoire est à la fois lisible et inscriptible. Elle possède les interfaces suivantes :

- **Une entrée d\'adresse (Address)** de 32 bits, qui reçoit l\'adresse mémoire à laquelle accéder.

- **Une entrée de données (Write Data)** de 32 bits, qui fournit la valeur à écrire en mémoire lors d\'une opération store.

- **Une sortie de données (Read Data)** de 32 bits, qui fournit la valeur lue en mémoire lors d\'une opération load.

- **Deux signaux de contrôle** : MemRead et MemWrite. MemRead est activé (mis à 1) pour une instruction lw, autorisant la lecture de la mémoire. MemWrite est activé pour une instruction sw, autorisant l\'écriture en mémoire.

#### L\'Unité d\'Extension de Signe (Sign Extension Unit)

Le format des instructions d\'accès mémoire (type-I) inclut un champ de décalage de 16 bits. Or, l\'UAL, qui sera utilisée pour calculer l\'adresse mémoire, opère sur des données de 32 bits. Il est donc impératif de convertir ce décalage de 16 bits en une valeur de 32 bits avant de l\'additionner au registre de base. Cette conversion doit préserver la valeur arithmétique du décalage, qui peut être positif ou négatif (représenté en complément à deux). L\'opération requise est une

**extension de signe** : le bit de poids fort (le bit de signe) du nombre de 16 bits est répliqué pour remplir les 16 bits de poids fort de la nouvelle valeur de 32 bits. Une unité d\'extension de signe est donc un simple circuit combinatoire qui prend en entrée les 16 bits du décalage de l\'instruction et produit en sortie une valeur de 32 bits.

#### Multiplexeur pour la seconde entrée de l\'UAL (ALUSrc)

Nous avons maintenant un conflit sur la seconde entrée de l\'UAL. Pour les instructions de type-R, cette entrée doit provenir du second port de lecture du banc de registres (la valeur de rs2). Pour les instructions lw et sw, elle doit provenir de la sortie de l\'unité d\'extension de signe. Pour résoudre ce conflit et permettre le partage de l\'UAL, nous devons introduire un **multiplexeur** (MUX). Un multiplexeur est un commutateur commandé : il sélectionne l\'une de ses multiples entrées de données pour la diriger vers sa unique sortie, en fonction de la valeur d\'un signal de contrôle.

Nous ajoutons donc un MUX 2-vers-1 à la seconde entrée de l\'UAL. L\'entrée \'0\' du MUX est connectée à la sortie du second port de lecture du banc de registres. L\'entrée \'1\' est connectée à la sortie de l\'unité d\'extension de signe. Un nouveau signal de contrôle, que nous nommerons ALUSrc, pilotera ce MUX. Si ALUSrc est à 0, l\'UAL reçoit une donnée du banc de registres (cas type-R). Si ALUSrc est à 1, elle reçoit la valeur immédiate étendue (cas lw/sw).

Le flux de données pour lw est alors le suivant : l\'UAL additionne le contenu de rs1 et le décalage étendu pour former l\'adresse. Cette adresse est envoyée à la mémoire de données. L\'unité de contrôle active MemRead. La donnée lue est renvoyée vers le banc de registres pour être écrite dans rt. Pour sw, le flux est similaire, mais la valeur de rs2 est lue du banc de registres et envoyée à l\'entrée \"Write Data\" de la mémoire de données, et MemWrite est activé.

### 12.1.5 Étape 4 : La gestion des sauts conditionnels (Instructions de branchement)

L\'instruction beq rs1, rs2, label (Branch on Equal) introduit une rupture dans le flux séquentiel d\'exécution. Elle compare les valeurs des registres rs1 et rs2 et, si elles sont égales, le programme \"saute\" à une instruction cible identifiée par une étiquette (label). L\'adresse de cette instruction cible est calculée par rapport à la position actuelle du PC. L\'implémentation de cette instruction requiert l\'ajout de matériel pour deux tâches distinctes : la vérification de la condition et le calcul de l\'adresse cible.

#### Calcul de la condition de branchement

La condition est l\'égalité entre les contenus de rs1 et rs2. Nous pouvons réutiliser l\'UAL pour cette tâche. En effectuant la soustraction des deux valeurs (rs1 - rs2), le résultat sera zéro si et seulement si les deux valeurs sont égales. L\'UAL est donc conçue pour fournir une sortie supplémentaire d\'un bit, appelée Zero, qui est mise à 1 lorsque le résultat de l\'opération est zéro, et à 0 dans le cas contraire. Pour une instruction

beq, l\'unité de contrôle commandera à l\'UAL d\'effectuer une soustraction, et la valeur du signal Zero déterminera si le branchement doit être pris ou non.

#### Calcul de l\'adresse cible du branchement

L\'adresse de l\'instruction cible n\'est pas une adresse absolue, mais une adresse relative au PC. Elle est calculée en additionnant l\'adresse de l\'instruction *suivant* le branchement (soit PC+4) avec une valeur de décalage (offset). Ce décalage est encodé sur 16 bits dans l\'instruction. Cependant, les adresses étant alignées sur 4 octets, ce décalage ne représente pas un nombre d\'octets, mais un nombre de

**mots** (instructions de 4 octets). Pour obtenir le décalage en octets, il faut donc le multiplier par 4. En binaire, cela équivaut à un décalage de 2 bits vers la gauche (shift left 2).

Le calcul complet de l\'adresse cible se fait donc en trois étapes :

1.  Prendre le décalage de 16 bits de l\'instruction.

2.  L\'étendre en signe pour obtenir une valeur de 32 bits.

3.  Le décaler de 2 bits vers la gauche.

4.  L\'additionner à la valeur de PC+4 (que nous calculons déjà).

Pour effectuer cette addition, nous ajoutons un second additionneur dédié au chemin de données, spécifiquement pour le calcul de l\'adresse cible du branchement.

#### Mise à jour du Compteur Ordinal (PC)

Nous avons maintenant deux candidats possibles pour la prochaine valeur du PC : PC+4 (si le branchement n\'est pas pris ou si l\'instruction n\'est pas un branchement) et l\'adresse cible du branchement (si le branchement est pris). Un nouveau multiplexeur 2-vers-1 est donc nécessaire en amont du PC pour sélectionner la bonne adresse.

Le signal de contrôle de ce MUX, que nous appellerons PCSrc, doit être activé uniquement si deux conditions sont réunies : l\'instruction est un branchement (Branch = 1, un signal de l\'unité de contrôle) ET la condition du branchement est vraie (Zero = 1, le signal de l\'UAL). Par conséquent, le signal PCSrc est le résultat d\'une porte ET logique entre les signaux Branch et Zero.

### 12.1.6 Synthèse : Construction du chemin de données monocycle unifié

Après avoir conçu les chemins de données partiels pour chaque classe d\'instructions, l\'étape finale consiste à les fusionner en une architecture unique et cohérente, capable d\'exécuter l\'ensemble de notre sous-ensemble d\'instructions. Cette unification est rendue possible par l\'utilisation stratégique de multiplexeurs, qui agissent comme des aiguillages pour diriger les flux de données en fonction de l\'instruction en cours d\'exécution.

Nous avons déjà introduit deux multiplexeurs critiques : ALUSrc, qui choisit le second opérande de l\'UAL, et PCSrc, qui sélectionne la prochaine valeur du PC. Pour compléter l\'unification, deux autres multiplexeurs sont nécessaires pour gérer les écritures dans le banc de registres.

1.  **Multiplexeur RegDst (Register Destination)** : Ce MUX résout un conflit sur l\'adresse du registre de destination. Pour les instructions de type-R (add, sub,\...), le registre destination est spécifié par le champ rd (bits 15-11 de l\'instruction). Pour l\'instruction de chargement lw, le registre destination est spécifié par le champ rt (bits 20-16). Un MUX 2-vers-1, contrôlé par le signal\
    RegDst, est placé sur l\'entrée d\'adresse d\'écriture du banc de registres. Si RegDst=0, l\'adresse provient du champ rt (cas lw). Si RegDst=1, elle provient du champ rd (cas type-R).

2.  **Multiplexeur MemtoReg (Memory to Register)** : Ce MUX résout un conflit sur la *donnée* à écrire dans le banc de registres. Pour une instruction de type-R, cette donnée est le résultat calculé par l\'UAL. Pour une instruction lw, il s\'agit de la valeur lue depuis la mémoire de données. Un MUX 2-vers-1, contrôlé par le signal\
    MemtoReg, est placé sur l\'entrée de données d\'écriture du banc de registres. Si MemtoReg=0, la donnée provient de la sortie de l\'UAL. Si MemtoReg=1, elle provient de la sortie de la mémoire de données.

Avec l\'ajout de ces deux multiplexeurs, notre chemin de données monocycle est complet. Il intègre de manière cohérente tous les composants nécessaires :

- **Éléments de l\'étape Fetch** : PC, Mémoire d\'Instructions, Additionneur PC+4.

- **Éléments de l\'étape Decode/Execute** : Banc de Registres, Unité d\'Extension de Signe, UAL.

- **Éléments de l\'étape Memory** : Mémoire de Données.

- **Matériel de branchement** : Unité de décalage à gauche de 2, Additionneur pour l\'adresse cible.

- **Logique de multiplexage** : MUX pour ALUSrc, MUX pour RegDst, MUX pour MemtoReg, et MUX pour PCSrc.

Le chemin de données unifié est une pièce d\'ingénierie élégante où des ressources matérielles partagées sont orchestrées par un ensemble de signaux de contrôle pour exécuter une variété d\'opérations. Le flux de données pour chaque instruction suit un chemin spécifique à travers ce matériel partagé, activé par la configuration appropriée des multiplexeurs.

### 12.1.7 Analyse de performance et limitations fondamentales du modèle monocycle

L\'architecture monocycle que nous venons de construire possède une vertu cardinale : sa simplicité. Chaque instruction s\'exécute en exactement un cycle d\'horloge, ce qui signifie que le nombre de cycles par instruction (CPI) est de 1. Cette simplicité facilite la conception de l\'unité de contrôle. Cependant, cette élégance conceptuelle cache une inefficacité fondamentale qui limite sévèrement ses performances.

Le principe de fonctionnement d\'un circuit synchrone comme notre processeur est que toutes les opérations d\'un cycle doivent se terminer avant le prochain front d\'horloge. Par conséquent, la durée du cycle d\'horloge (Tc​) ne peut pas être plus courte que le temps de propagation du signal le plus long à travers le chemin de données. Ce chemin le plus long est appelé le **chemin critique**.

Pour déterminer la performance de notre processeur, nous devons analyser le chemin critique pour chaque type d\'instruction, en additionnant les délais de propagation de chaque composant traversé  :

- Instruction de type-R (add, sub,\...) : Le chemin passe par la mémoire d\'instructions, la lecture du banc de registres, l\'UAL, et l\'écriture dans le banc de registres (via le MUX MemtoReg).\
  TR−type​=TIMEMread​​+TRegFileread​​+TALU​+TMUX​+TRegFilewrite​​

- Instruction de chargement (lw) : C\'est l\'instruction la plus exigeante. Elle traverse la mémoire d\'instructions, la lecture du banc de registres (pour l\'adresse de base), l\'UAL (pour le calcul d\'adresse), la mémoire de données, et enfin l\'écriture dans le banc de registres. Elle utilise séquentiellement les cinq unités fonctionnelles principales.\
  Tlw​=TIMEMread​​+TRegFileread​​+TALU​+TDMEMread​​+TMUX​+TRegFilewrite​​

- Instruction de stockage (sw) : Le chemin est similaire à lw, mais s\'arrête après l\'écriture en mémoire de données. La phase d\'écriture dans le banc de registres n\'a pas lieu.\
  Tsw​=TIMEMread​​+TRegFileread​​+TALU​+TDMEMwrite​​

- Instruction de branchement (beq) : Le chemin critique pour le branchement implique la lecture des registres et leur comparaison dans l\'UAL pour déterminer la valeur du signal Zero. Ce signal, combiné avec le signal Branch, contrôle le MUX du PC.\
  Tbeq​=TIMEMread​​+TRegFileread​​+TALU​+TANDgate​​+TMUX​

En comparant ces chemins, il est évident que l\'instruction lw est celle qui présente le plus long délai de propagation, car elle enchaîne le plus grand nombre d\'unités fonctionnelles en série. Par conséquent, la durée minimale du cycle d\'horloge pour l\'ensemble du processeur est dictée par le temps d\'exécution de l\'instruction

lw :

Tc​=Tlw​

C\'est ici que réside la faiblesse fondamentale du modèle monocycle. Une instruction très rapide, comme une addition (type-R), qui n\'a pas besoin d\'accéder à la mémoire de données, est tout de même contrainte de s\'exécuter dans un cycle d\'horloge dimensionné pour l\'instruction la plus lente (lw). Cela conduit à un gaspillage considérable de temps et à une sous-utilisation des ressources matérielles. L\'UAL, par exemple, termine son calcul pour une instruction

add bien avant la fin du cycle, mais doit rester inactive en attendant le prochain front d\'horloge.

Cette inefficacité n\'est pas une simple imperfection ; elle est la motivation directe et inévitable pour les architectures plus complexes. Le goulot d\'étranglement n\'est pas la vitesse des composants individuels, mais l\'organisation séquentielle rigide qui force toutes les opérations à se conformer au rythme du maillon le plus faible. La solution logique pour surmonter cette limitation est de décomposer l\'exécution d\'une instruction en plusieurs étapes plus courtes et de permettre à différentes instructions de se trouver à différentes étapes simultanément. C\'est le principe même du pipelining, que nous explorerons en détail dans la section 12.3.

## 12.2 Unité de Contrôle (Câblé vs Microprogrammé)

### 12.2.1 Introduction : Le rôle de l\'unité de contrôle dans l\'orchestration du chemin de données

Si le chemin de données que nous avons méticuleusement assemblé constitue la musculature du processeur, capable d\'exécuter des opérations, il reste une structure inerte sans un système nerveux pour la commander. Ce système nerveux est l\'**unité de contrôle** (UC). Elle est le véritable \"cerveau\" du processeur, dont la fonction est d\'interpréter chaque instruction et de générer la séquence précise de signaux de contrôle nécessaires pour orchestrer les actions des différents composants du chemin de données.

À chaque cycle d\'horloge, l\'unité de contrôle reçoit en entrée le code opération (opcode) de l\'instruction extraite de la mémoire. En se basant sur cet opcode, elle produit en sortie un ensemble de signaux binaires qui pilotent les multiplexeurs, activent les lectures et écritures des mémoires et du banc de registres, et spécifient l\'opération à effectuer par l\'UAL. Par exemple, pour une instruction

lw, l\'UC doit générer les signaux suivants : ALUSrc=1 pour sélectionner l\'offset comme second opérande de l\'UAL, MemRead=1 pour activer la lecture de la mémoire de données, MemtoReg=1 pour acheminer la donnée lue vers le banc de registres, et RegWrite=1 pour autoriser l\'écriture de cette donnée.

La conception de cette logique de contrôle est une étape cruciale qui détermine non seulement la fonctionnalité mais aussi la performance et la flexibilité du processeur. Historiquement, deux approches philosophiquement distinctes se sont imposées pour la conception de l\'unité de contrôle : l\'approche **câblée** (*hardwired*) et l\'approche **microprogrammée**. La première assimile l\'unité de contrôle à un circuit logique combinatoire pur, optimisé pour la vitesse. La seconde la conçoit comme un petit processeur spécialisé qui exécute un programme (le microprogramme) pour générer les signaux de contrôle, privilégiant la flexibilité. Dans les sections suivantes, nous allons concevoir et analyser en détail ces deux types d\'unités de contrôle pour notre chemin de données monocycle, afin de comprendre en profondeur leurs caractéristiques, leurs avantages et leurs inconvénients respectifs.

### 12.2.2 Conception d\'une unité de contrôle câblée (Hardwired)

Une unité de contrôle câblée est, dans son essence, une implémentation directe de la logique de contrôle sous forme de circuit. Elle est conçue comme un circuit logique combinatoire qui prend en entrée l\'opcode de l\'instruction et produit en sortie l\'ensemble des signaux de contrôle nécessaires pour piloter le chemin de données. Le terme \"câblé\" vient du fait que la logique est physiquement figée dans la structure des portes logiques (ET, OU, NON) et de leurs interconnexions.

Le processus de conception d\'une telle unité est systématique et découle directement de l\'analyse du chemin de données que nous avons effectuée.

**1. Identification des signaux de contrôle**

La première étape consiste à lister exhaustivement tous les signaux de contrôle requis par notre chemin de données monocycle unifié. En examinant notre conception, nous identifions les signaux suivants :

- **Signaux des multiplexeurs :**

  - RegDst (1 bit) : Sélectionne entre rt (0) et rd (1) comme registre de destination.

  - ALUSrc (1 bit) : Sélectionne le second opérande de l\'UAL entre une lecture de registre (0) et l\'immédiat étendu (1).

  - MemtoReg (1 bit) : Sélectionne la donnée à écrire dans le registre entre le résultat de l\'UAL (0) et la donnée lue en mémoire (1).

  - PCSrc (1 bit, dérivé) : Bien que ce soit un signal de contrôle pour le MUX du PC, il est généré par la combinaison du signal Branch et du drapeau Zero. Le signal principal généré par l\'UC est donc Branch.

- **Signaux d\'écriture des mémoires et registres :**

  - RegWrite (1 bit) : Active l\'écriture dans le banc de registres.

  - MemRead (1 bit) : Active la lecture de la mémoire de données.

  - MemWrite (1 bit) : Active l\'écriture dans la mémoire de données.

- **Signaux de commande de l\'UAL :**

  - ALUOp (2 bits) : Ce signal indique à une petite unité de contrôle locale à l\'UAL (l\'ALU Control) le type d\'opération à effectuer. Par exemple, 00 pour une addition (utilisée par lw et sw), 01 pour une soustraction (utilisée par beq), et 10 pour une opération de type-R (où l\'opération exacte sera déterminée par le champ funct de l\'instruction).

- **Signal de branchement :**

  - Branch (1 bit) : Indique que l\'instruction est un branchement (beq).

**2. Établissement de la table de vérité**

La deuxième étape consiste à déterminer la valeur de chacun de ces signaux pour chaque instruction que notre processeur doit exécuter. Cette relation peut être formalisée dans une table de vérité, qui constitue la spécification complète de notre unité de contrôle. L\'entrée principale de cette table est l\'opcode de l\'instruction (généralement les bits 31-26).

  ------------- -------- -------- ---------- ---------- --------- ---------- -------- -------- --------
  Instruction   RegDst   ALUSrc   MemtoReg   RegWrite   MemRead   MemWrite   Branch   ALUOp1   ALUOp0

  **Type-R**    1        0        0          1          0         0          0        1        0

  **lw**        0        1        1          1          1         0          0        0        0

  **sw**        X        1        X          0          0         1          0        0        0

  **beq**       X        0        X          0          0         0          1        0        1
  ------------- -------- -------- ---------- ---------- --------- ---------- -------- -------- --------

*Tableau 12.1 : Table de vérité pour l\'unité de contrôle principale.*

Dans ce tableau, \'X\' signifie \"indifférent\" (*don\'t care*), car la valeur du signal n\'a pas d\'importance pour l\'exécution correcte de l\'instruction. Par exemple, pour sw, comme RegWrite est à 0, la valeur des signaux RegDst et MemtoReg n\'a aucun impact.

**3. Dérivation des équations booléennes et implémentation**

La dernière étape consiste à transformer cette table de vérité en un circuit logique. Pour chaque signal de contrôle en sortie, nous pouvons dériver une équation booléenne en fonction de l\'opcode en entrée. Supposons que nous ayons un décodeur qui prend l\'opcode de 6 bits et active une seule ligne de sortie pour chaque type d\'instruction (par exemple, une ligne isR_type, une ligne isLW, etc.). Les équations deviennent alors très simples :

- RegWrite=isR_type∨isLW

- ALUSrc=isLW∨isSW

- MemRead=isLW

- MemWrite=isSW

- Branch=isBEQ

- RegDst=isR_type

- MemtoReg=isLW

- ALUOp1=isR_type

- ALUOp0=isBEQ

Ces équations peuvent être implémentées directement avec des portes logiques. Par exemple, RegWrite est la sortie d\'une porte OU dont les entrées sont les signaux indiquant une instruction de type-R ou une instruction lw.

**Avantages et Inconvénients**

L\'avantage principal de l\'approche câblée est la **vitesse**. Les signaux de contrôle sont générés à la vitesse de propagation des électrons à travers les portes logiques, ce qui est extrêmement rapide. C\'est pourquoi cette approche est privilégiée pour les processeurs RISC, où l\'objectif est d\'exécuter des instructions simples le plus rapidement possible, idéalement en un seul cycle d\'horloge court.

Cependant, son principal inconvénient est sa **rigidité**. La logique est gravée dans le silicium. Si l\'on souhaite ajouter une nouvelle instruction à l\'ISA ou modifier le comportement d\'une instruction existante, il faut redessiner, revérifier et refabriquer entièrement le circuit de l\'unité de contrôle. De plus, pour des jeux d\'instructions très complexes (CISC), la logique de décodage peut devenir extrêmement grande et complexe, rendant la conception, la vérification et le débogage très difficiles.

### 12.2.3 Conception d\'une unité de contrôle microprogrammée

Face à la rigidité et à la complexité croissante des unités de contrôle câblées pour les ISA complexes, les architectes ont développé une approche alternative : la microprogrammation. L\'idée fondamentale est de remplacer la logique combinatoire complexe par un programme. Au lieu de concevoir un circuit qui *calcule* les signaux de contrôle, on conçoit un petit processeur très simple qui *exécute* une séquence d\'instructions (des micro-instructions) pour *générer* ces signaux. L\'unité de contrôle devient elle-même un petit ordinateur dont le programme est appelé le

**microprogramme**.

#### Architecture d\'une unité de contrôle microprogrammée

Une unité de contrôle microprogrammée est organisée autour de quelques composants clés  :

1.  **La Mémoire de Contrôle (Control Store ou Control Memory)** : C\'est le cœur du système. Il s\'agit d\'une mémoire, généralement une ROM (Read-Only Memory) pour des raisons de vitesse et de sécurité, qui stocke le microprogramme. Chaque ligne de cette mémoire contient une\
    **micro-instruction**. Le microprogramme est l\'ensemble des séquences de micro-instructions nécessaires pour implémenter toutes les instructions de l\'ISA de la machine.

2.  **La Micro-instruction** : Chaque micro-instruction est un mot binaire qui spécifie deux choses :

    - **Les signaux de contrôle à activer** : Une partie de la micro-instruction (le *champ de contrôle*) contient les bits qui correspondent directement aux signaux de contrôle du chemin de données (RegWrite, ALUSrc, etc.).

    - **Comment déterminer la prochaine micro-instruction** : Une autre partie (le *champ de séquencement*) contient des informations pour le séquenceur afin de déterminer l\'adresse de la prochaine micro-instruction à exécuter.

3.  **Le Séquenceur de Microcode (Microsequencer)** : C\'est le matériel qui calcule l\'adresse de la prochaine micro-instruction à charger depuis la mémoire de contrôle. Il est analogue au compteur ordinal (PC) d\'un processeur classique, mais en plus sophistiqué. Ses fonctions typiques incluent  :

    - Incrémenter l\'adresse courante pour passer à la micro-instruction suivante.

    - Effectuer un branchement inconditionnel vers une adresse spécifiée dans la micro-instruction actuelle.

    - Effectuer un branchement conditionnel basé sur des drapeaux d\'état du processeur (comme le signal Zero de l\'UAL).

    - Mapper l\'opcode de l\'instruction machine à une adresse de départ dans la mémoire de contrôle.

#### Fonctionnement

Le processus d\'exécution d\'une instruction machine se déroule comme suit :

1.  **Mapping de l\'Opcode** : L\'opcode de l\'instruction machine chargée est utilisé comme entrée pour une logique de mapping (souvent une simple table de consultation ou une ROM de mapping). Cette logique traduit l\'opcode en une adresse de départ dans la mémoire de contrôle. Cette adresse correspond au début de la micro-routine qui implémente cette instruction machine spécifique.

2.  **Chargement de la première micro-instruction** : L\'adresse de départ est chargée dans le registre d\'adresse de la mémoire de contrôle (parfois appelé CAR - Control Address Register).

3.  Exécution de la micro-routine : Le séquenceur prend le contrôle. À chaque cycle de son horloge (qui peut être plus rapide que l\'horloge principale du processeur), il :\
    a. Lit la micro-instruction à l\'adresse courante dans la mémoire de contrôle.\
    b. Les bits du champ de contrôle de cette micro-instruction sont envoyés directement au chemin de données pour activer les opérations requises (par exemple, activer ALUSrc, MemRead, etc.).\
    c. Le séquenceur utilise les bits du champ de séquencement et les drapeaux d\'état pour calculer l\'adresse de la prochaine micro-instruction.\
    d. Ce processus se répète jusqu\'à ce que la dernière micro-instruction de la routine soit exécutée, laquelle contient généralement une commande pour le séquenceur de retourner à une routine de fetch de la prochaine instruction machine.

Pour notre processeur monocycle, l\'implémentation serait triviale : chaque instruction machine correspondrait à une seule micro-instruction dans la mémoire de contrôle. L\'opcode serait mappé à l\'adresse de cette micro-instruction, qui contiendrait simplement la ligne correspondante de notre table de vérité (Tableau 12.1). La véritable puissance de la microprogrammation se révèle dans les processeurs multicycles, où une seule instruction machine est décomposée en une séquence de plusieurs micro-instructions.

#### Avantages et Inconvénients

Le principal avantage de la microprogrammation est sa **flexibilité**. Ajouter une nouvelle instruction ou corriger un bug dans la logique de contrôle ne nécessite pas de refaire le matériel ; il suffit de mettre à jour le contenu de la mémoire de contrôle. Cette approche rend la conception de processeurs avec des jeux d\'instructions complexes (CISC) beaucoup plus gérable, car une instruction complexe peut être décomposée en une série de micro-opérations simples et systématiques.

Le principal inconvénient est la **performance**. L\'accès à la mémoire de contrôle à chaque étape pour récupérer la micro-instruction ajoute un délai significatif par rapport à la propagation directe à travers des portes logiques dans une unité câblée. Les unités de contrôle microprogrammées sont donc intrinsèquement plus lentes.

### 12.2.4 Analyse comparative et compromis de conception : Vitesse contre flexibilité

Le choix entre une unité de contrôle câblée et une unité microprogrammée est l\'une des décisions d\'architecture les plus fondamentales dans la conception d\'un processeur. Il ne s\'agit pas simplement d\'un choix technique, mais d\'un compromis qui reflète la philosophie même de l\'architecture du processeur. Cette décision repose sur un arbitrage classique en ingénierie : celui de la vitesse contre la flexibilité.

  ------------------------------- ------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------
  Critère                         Unité de Contrôle Câblée                                                                         Unité de Contrôle Microprogrammée

  **Vitesse**                     Très élevée. Le délai est limité par la propagation à travers les portes logiques.               Plus faible. Le délai inclut un cycle d\'accès à la mémoire de contrôle.

  **Flexibilité**                 Faible. La logique est figée dans le matériel. Toute modification est coûteuse.                  Élevée. La logique peut être modifiée en reprogrammant la mémoire de contrôle.

  **Complexité de Conception**    Simple pour les ISA simples (RISC). Devient exponentiellement complexe pour les ISA complexes.   Gérable même pour les ISA très complexes (CISC). La conception est plus systématique.

  **Coût de Modification**        Très élevé (redesign matériel).                                                                  Faible (mise à jour du microcode).

  **Facilité de Débogage**        Difficile. Les erreurs sont des bugs de circuit logique.                                         Plus simple. Le débogage s\'apparente à celui d\'un logiciel (microprogramme).

  **Adéquation Architecturale**   Idéale pour les architectures RISC (Reduced Instruction Set Computer).                           Idéale pour les architectures CISC (Complex Instruction Set Computer).

  **Consommation d\'Énergie**     Généralement plus faible.                                                                        Peut être plus élevée en raison des accès constants à la mémoire de contrôle.

  **Surface sur la Puce**         Compacte pour les ISA simples.                                                                   Nécessite une surface pour la mémoire de contrôle, mais la logique du séquenceur est régulière.
  ------------------------------- ------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------------------------

*Tableau 12.2 : Comparaison des approches de conception pour l\'unité de contrôle.*

Cette comparaison met en lumière une dichotomie profonde. L\'approche câblée est une solution spécialisée et optimisée. Elle est conçue pour exécuter un ensemble fixe d\'instructions le plus rapidement possible, ce qui est parfaitement aligné avec la philosophie RISC, où la simplicité de l\'ISA permet une logique de contrôle rapide et efficace. La complexité est alors déportée vers le compilateur, qui doit combiner ces instructions simples pour réaliser des tâches complexes.

À l\'opposé, l\'approche microprogrammée est une solution généraliste et adaptable. Elle introduit une couche d\'abstraction entre l\'ISA visible par le programmeur et la microarchitecture matérielle sous-jacente. Cette abstraction, bien que pénalisante en termes de vitesse pure à cause de l\'accès mémoire supplémentaire , offre une flexibilité immense. Elle est la clé qui a permis le développement des architectures CISC, où des instructions très complexes (par exemple, une instruction qui effectue une lecture mémoire, une opération arithmétique et une écriture mémoire) peuvent être implémentées comme une simple routine dans le microprogramme. Cette flexibilité permet également l\'émulation : un processeur peut être programmé pour exécuter le jeu d\'instructions d\'une autre machine, une capacité qui a été historiquement cruciale pour assurer la compatibilité ascendante.

Dans la pratique moderne, la frontière n\'est plus aussi nette. De nombreux processeurs, y compris les processeurs x86 qui sont de nature CISC, utilisent une approche hybride. Les instructions simples et les plus fréquemment utilisées sont décodées et exécutées par une unité de contrôle câblée, rapide et optimisée. Les instructions plus complexes, plus rares, ou celles incluses pour des raisons de compatibilité, sont quant à elles gérées par un séquenceur de microcode. Cette approche hybride cherche à obtenir le meilleur des deux mondes : la vitesse pour le cas commun et la flexibilité pour les cas exceptionnels.

En conclusion, le choix de la conception de l\'unité de contrôle n\'est pas isolé. Il est intrinsèquement lié à la complexité de l\'ISA, aux objectifs de performance du processeur et à la flexibilité souhaitée pour son évolution future. C\'est un exemple parfait des compromis qui façonnent l\'architecture des ordinateurs.

## 12.3 Amélioration des Performances : Pipelining

L\'architecture monocycle, bien que fonctionnelle et simple à comprendre, souffre d\'une inefficacité majeure : sa performance est bridée par son instruction la plus lente. Chaque instruction, quelle que soit sa complexité, occupe l\'ensemble du chemin de données pendant un cycle d\'horloge complet, dont la durée est dictée par le chemin critique de l\'instruction la plus longue (typiquement lw). Durant ce cycle, de nombreuses unités fonctionnelles restent inactives. Par exemple, lors d\'une instruction add, la mémoire de données est inutilisée. Cette sous-utilisation des ressources matérielles représente une opportunité d\'optimisation considérable. Le **pipelining** est la technique la plus fondamentale et la plus répandue pour exploiter cette opportunité en introduisant une forme de parallélisme temporel dans l\'exécution des instructions.

### 12.3.1 Principes fondamentaux du pipeline : La chaîne de montage des instructions

Le concept de pipelining est directement inspiré des chaînes de montage industrielles. Plutôt que d\'attendre qu\'une voiture soit entièrement assemblée avant de commencer la suivante, une chaîne de montage permet de travailler sur plusieurs voitures simultanément, chacune à une station de travail différente (châssis, moteur, peinture, etc.). Le

*débit* (le nombre de voitures produites par heure) est considérablement augmenté, même si le temps total pour assembler une seule voiture (la *latence*) reste le même, voire légèrement plus long en raison du transfert entre les stations.

En architecture des processeurs, les instructions sont les \"voitures\" et les unités fonctionnelles du chemin de données sont les \"stations de travail\". Le pipelining consiste à décomposer l\'exécution d\'une instruction en plusieurs étapes indépendantes, appelées **étages de pipeline**, et à faire en sorte que chaque étage travaille sur une instruction différente à chaque cycle d\'horloge.

#### Segmentation du chemin de données en cinq étages

Notre chemin de données monocycle se prête naturellement à une décomposition en cinq étages classiques, qui correspondent aux principales phases d\'exécution d\'une instruction  :

1.  **IF (Instruction Fetch - Chargement de l\'instruction)** : Cet étage est responsable du chargement de l\'instruction depuis la mémoire d\'instructions à l\'adresse indiquée par le PC, et du calcul de l\'adresse de la prochaine instruction séquentielle (PC+4).

2.  **ID (Instruction Decode and Register Fetch - Décodage et lecture des registres)** : Cet étage décode l\'instruction chargée pour déterminer l\'opération à effectuer et générer les signaux de contrôle. Simultanément, il lit les valeurs des registres sources (rs1 et rs2) depuis le banc de registres.

3.  **EX (Execute - Exécution)** : C\'est l\'étage où les calculs sont effectués. L\'UAL exécute l\'opération arithmétique ou logique pour les instructions de type-R, calcule l\'adresse mémoire effective pour les instructions lw et sw, ou compare les registres et calcule l\'adresse cible pour les instructions de branchement.

4.  **MEM (Memory Access - Accès mémoire)** : Cet étage effectue les opérations de lecture ou d\'écriture dans la mémoire de données pour les instructions lw et sw. Pour les autres instructions, cet étage est généralement inactif.

5.  **WB (Write Back - Écriture du résultat)** : C\'est le dernier étage, où le résultat de l\'opération (provenant soit de l\'UAL, soit de la mémoire de données) est écrit dans le banc de registres. Seules les instructions de type-R et lw effectuent une opération d\'écriture.

Avec cette segmentation, un processeur peut avoir jusqu\'à cinq instructions en cours d\'exécution simultanément, chacune dans un étage différent du pipeline. Idéalement, à chaque cycle d\'horloge, une nouvelle instruction entre dans l\'étage IF et une instruction terminée quitte l\'étage WB, atteignant un débit théorique d\'une instruction par cycle (CPI=1), mais avec une fréquence d\'horloge beaucoup plus élevée que celle du processeur monocycle.

#### Les registres de pipeline

Pour que les étages puissent fonctionner de manière indépendante et en parallèle, il est essentiel de les isoler les uns des autres. Si la sortie de l\'étage IF était directement connectée à l\'entrée de l\'étage ID, un changement dans l\'étage IF se propagerait immédiatement, perturbant le travail de l\'étage ID.

La solution consiste à insérer des **registres de pipeline** (ou registres tampons) entre chaque paire d\'étages consécutifs. Ces registres, invisibles pour le programmeur, sont mis à jour à chaque front d\'horloge et servent à stocker toutes les informations (données et signaux de contrôle) produites par un étage pour qu\'elles soient utilisées par l\'étage suivant au cycle d\'après. Nous aurons donc quatre registres de pipeline :

- **IF/ID** : Stocke l\'instruction chargée et la valeur de PC+4.

- **ID/EX** : Stocke la valeur de PC+4, les valeurs lues des registres rs1 et rs2, l\'immédiat étendu, les numéros des registres (rs1, rs2, rd), et les signaux de contrôle générés à l\'étage ID.

- **EX/MEM** : Stocke le résultat de l\'UAL, le signal Zero, la valeur de rs2 (pour sw), et les signaux de contrôle pertinents pour les étages MEM et WB.

- **MEM/WB** : Stocke la donnée lue de la mémoire (pour lw), le résultat de l\'UAL, et les signaux de contrôle pour l\'étage WB.

Ces registres garantissent que les données associées à une instruction particulière avancent de concert à travers le pipeline, cycle après cycle, préservant la cohérence de l\'exécution. La durée du cycle d\'horloge dans un processeur pipeliné n\'est plus dictée par l\'instruction la plus lente, mais par l\'étage le plus lent, ce qui permet une augmentation significative de la fréquence d\'horloge.

### 12.3.2 Les aléas du pipeline : Les défis de l\'exécution parallèle

L\'exécution simultanée de plusieurs instructions, bien que performante, crée des situations de conflit qui n\'existaient pas dans le modèle séquentiel monocycle. Ces situations, appelées **aléas** (*hazards*), se produisent lorsqu\'une instruction ne peut pas s\'exécuter dans le cycle d\'horloge prévu parce qu\'une condition nécessaire n\'est pas remplie, ce qui risque de produire un résultat incorrect si l\'on ne prend aucune précaution. La gestion des aléas est le défi central de la conception des processeurs pipelinés. On distingue trois types d\'aléas.

#### 12.3.2.1 Les aléas structurels : Conflits de ressources

Un **aléa structurel** survient lorsque deux instructions différentes, à des étages différents du pipeline, tentent d\'accéder à la même ressource matérielle au même cycle d\'horloge, et que cette ressource ne peut pas gérer les deux requêtes simultanément.

L\'exemple le plus classique serait un processeur conçu avec une mémoire unifiée pour les instructions et les données (architecture de von Neumann). Considérons la séquence d\'exécution suivante :

  --------- -------- -------- -------- --------- -------- --------
  Cycle     1        2        3        4         5        6

  lw        IF       ID       EX       **MEM**   WB       

  Instr 2            IF       ID       EX        MEM      WB

  Instr 3                     IF       ID        EX       MEM

  Instr 4                              **IF**    ID       EX
  --------- -------- -------- -------- --------- -------- --------

Au cycle d\'horloge 4, l\'instruction lw est dans son étage MEM et doit accéder à la mémoire pour lire une donnée. Au même moment, l\'instruction 4 entre dans son étage IF et doit accéder à la mémoire pour être chargée. Si une seule unité de mémoire existe, ces deux accès entrent en conflit.

La solution la plus directe à un aléa structurel est de **dupliquer la ressource** en conflit. C\'est précisément pour cette raison que les architectures RISC pipelinées adoptent quasi systématiquement une architecture de type Harvard, avec des caches ou des mémoires séparés pour les instructions et les données. Dans notre conception, en ayant postulé dès le départ une mémoire d\'instructions et une mémoire de données distinctes, nous avons prévenu cet aléa par construction. Un autre aléa structurel pourrait survenir si le banc de registres ne permettait pas une lecture (à l\'étage ID) et une écriture (à l\'étage WB) dans le même cycle. Les bancs de registres modernes sont conçus avec des ports de lecture et d\'écriture indépendants et une astuce de synchronisation (écriture sur le front montant de l\'horloge, lecture sur le front descendant ou de manière asynchrone) pour éviter ce conflit.

Si la duplication de la ressource est impossible ou trop coûteuse, la seule alternative est de **geler le pipeline** (*stall*), en forçant l\'une des instructions en conflit à attendre un cycle, ce qui dégrade la performance.

#### 12.3.2.2 Les aléas de données : Analyse des dépendances RAW, WAR et WAW

Un **aléa de données** se produit lorsqu\'une instruction dépend du résultat d\'une instruction précédente qui est encore en cours d\'exécution dans le pipeline. Le chevauchement des instructions peut violer l\'ordre de dépendance logique du programme. Il existe trois types de dépendances de données :

1.  **RAW (Read-After-Write) - Vraie dépendance** : C\'est le type d\'aléa le plus fréquent et le plus critique. Il se produit lorsqu\'une instruction (J) tente de lire un opérande avant qu\'une instruction précédente (I) ait fini d\'y écrire sa nouvelle valeur.\
    Extrait de code\
    I: add \$s0, \$t0, \$t1 ; Écrit dans \$s0\
    J: sub \$t2, \$s0, \$t3 ; Lit \$s0\
    \
    Dans un pipeline à 5 étages, l\'instruction add n\'écrit son résultat dans le registre \$s0 qu\'à l\'étage WB (cycle 5). Cependant, l\'instruction sub a besoin de cette valeur dès son étage ID pour la lecture des registres (cycle 3). Si rien n\'est fait, sub lira l\'ancienne valeur de \$s0, produisant un résultat erroné.

2.  **WAR (Write-After-Read) - Anti-dépendance** : Cet aléa survient lorsqu\'une instruction (J) tente d\'écrire dans un registre de destination avant qu\'une instruction précédente (I) ait eu le temps de lire ce même registre comme source.\
    Extrait de code\
    I: sub \$t2, \$s0, \$t3 ; Lit \$s0\
    J: add \$s0, \$t0, \$t1 ; Écrit dans \$s0\
    \
    Dans notre pipeline simple à 5 étages avec exécution dans l\'ordre, cet aléa ne peut pas se produire. L\'instruction I lit ses opérandes à l\'étage ID (cycle 2), tandis que l\'instruction J écrit son résultat à l\'étage WB (cycle 6). La lecture a donc toujours lieu bien avant l\'écriture. Les aléas WAR deviennent un problème dans des architectures plus complexes avec exécution dans le désordre (*out-of-order execution*) ou des latences d\'instructions variables.

3.  **WAW (Write-After-Write) - Dépendance de sortie** : Cet aléa se produit lorsque deux instructions (I et J) écrivent dans le même registre de destination, et que J risque de terminer avant I, laissant une valeur incorrecte dans le registre.\
    Extrait de code\
    I: mul \$s0, \$t0, \$t1 ; Instruction longue, écrit dans \$s0\
    J: add \$s0, \$t2, \$t3 ; Instruction courte, écrit dans \$s0\
    \
    Dans notre pipeline simple où toutes les instructions ont la même durée, l\'ordre d\'écriture est préservé (l\'instruction I atteint l\'étage WB avant l\'instruction J). Cet aléa ne se manifeste donc pas. Il devient pertinent lorsque des instructions ont des latences différentes (par exemple, une multiplication longue suivie d\'une addition courte) ou dans le cas de l\'exécution dans le désordre.

Pour notre étude, nous nous concentrerons sur la résolution de l\'aléa RAW, qui est le seul véritablement problématique pour notre pipeline simple.

#### 12.3.2.3 Les aléas de contrôle : L\'incertitude des branchements

Un **aléa de contrôle** (ou aléa de branchement) est causé par les instructions qui modifient le compteur ordinal (PC), telles que les branchements conditionnels (beq) et les sauts inconditionnels. Le problème fondamental est que l\'issue d\'un branchement (s\'il est pris ou non) et son adresse cible ne sont déterminées que tard dans le pipeline, typiquement à l\'étage EX.

Considérons une instruction beq :

  ------------------- ---------- ---------- ---------- ---------- ----------
  Cycle               1          2          3          4          5

  beq                 IF         ID         **EX**     MEM        WB

  Instr. suivante                IF         ID         \...       

  Instr. suivante+1                         IF         \...       
  ------------------- ---------- ---------- ---------- ---------- ----------

À la fin du cycle 3, l\'UAL a comparé les registres et l\'issue du branchement est connue. Cependant, pendant les cycles 2 et 3, le processeur, ne connaissant pas l\'avenir, a continué à fonctionner comme si de rien n\'était : il a chargé les instructions qui suivent séquentiellement le branchement (à PC+4 et PC+8).

Si le branchement n\'est pas pris, tout va bien. Mais si le branchement est pris, les instructions qui ont été chargées dans les étages IF et ID sont incorrectes. Elles ne auraient jamais dû être exécutées. Le processeur doit alors les annuler, une opération appelée **vidage du pipeline** (*pipeline flush*), et recommencer le chargement à partir de l\'adresse cible du branchement.

Chaque instruction annulée représente un cycle d\'horloge perdu. Le nombre de cycles perdus à cause d\'un branchement pris est appelé la **pénalité de branchement** (*branch penalty*). Dans notre pipeline à 5 étages où la décision est prise à l\'étage EX, les deux instructions dans les étages IF et ID doivent être vidées, entraînant une pénalité de 2 cycles. Étant donné que les branchements représentent une part significative des instructions exécutées (typiquement 15-25%), cette pénalité peut dégrader considérablement la performance globale du pipeline. La réduction de cette pénalité est donc un objectif de conception majeur.

### 12.3.3 Techniques de résolution des aléas de données

La gestion efficace des aléas de données, en particulier des dépendances RAW, est cruciale pour que le pipeline tienne ses promesses de performance. Une approche naïve qui attendrait systématiquement que les données soient disponibles anéantirait les gains du parallélisme. Heureusement, des techniques matérielles sophistiquées permettent de résoudre la majorité de ces conflits.

#### 12.3.3.1 Le gel du pipeline (Stalling) : L\'insertion de bulles

La solution la plus simple et la plus directe pour résoudre un aléa de données RAW est de forcer l\'instruction dépendante à attendre. C\'est ce qu\'on appelle un **gel de pipeline** (*pipeline stall*).

Le mécanisme fonctionne comme suit : une **unité de détection d\'aléas**, située dans l\'étage ID, compare les registres sources de l\'instruction en cours de décodage (IF/ID.Instruction) avec le registre de destination de l\'instruction qui la précède (se trouvant dans le registre de pipeline ID/EX). Si une dépendance est détectée (par exemple, ID/EX.RegisterRd == IF/ID.RegisterRs), l\'unité de détection prend deux actions simultanées pour un cycle d\'horloge  :

1.  Elle **désactive les signaux d\'écriture** du PC et du registre de pipeline IF/ID. Cela a pour effet de \"geler\" l\'instruction en cours de chargement et l\'instruction dépendante dans leurs étages respectifs (IF et ID). Elles seront re-traitées au cycle suivant.

2.  Elle **force l\'insertion d\'une \"bulle\"** dans le pipeline en neutralisant les signaux de contrôle qui sont passés à l\'étage EX. Cela équivaut à injecter une instruction NOP (No-Operation) qui traverse les étages EX, MEM et WB sans rien faire.

Ce processus est répété jusqu\'à ce que l\'instruction productrice de la donnée ait suffisamment avancé dans le pipeline pour que le conflit soit résolu (c\'est-à-dire, qu\'elle ait écrit son résultat dans le banc de registres).

  --------------------- ------- ------- ------- --------- --------- ------- -------
  Cycle                 1       2       3       4         5         6       7

  add \$s0,\...         IF      ID      EX      MEM       WB                

  sub \$t2, \$s0,\...           IF      ID      *stall*   *stall*   EX      MEM

  and\...                               IF      *stall*   *stall*   ID      EX
  --------------------- ------- ------- ------- --------- --------- ------- -------

Dans cet exemple, l\'instruction sub est gelée à l\'étage ID pendant deux cycles (cycles 4 et 5), attendant que add complète son étage WB au cycle 5. Bien que cette méthode garantisse la correction du programme, elle est très coûteuse en performance, car chaque gel ajoute des cycles au temps d\'exécution total, augmentant ainsi le CPI effectif.

#### 12.3.3.2 La transmission de données (Forwarding/Bypassing) et la conception de l\'unité de transmission

L\'observation fondamentale qui permet de dépasser le simple gel est que le résultat d\'une instruction est souvent disponible bien avant d\'être formellement écrit dans le banc de registres à l\'étage WB. Par exemple, le résultat d\'une instruction

add est disponible à la sortie de l\'UAL à la fin de l\'étage EX. Il est stocké dans le registre de pipeline EX/MEM. Pourquoi attendre que ce résultat traverse les étages MEM et WB pour être utilisé?

La **transmission de données** (*data forwarding*), également appelée **contournement** (*bypassing*), est une technique matérielle qui consiste à créer des chemins de données supplémentaires pour acheminer ce résultat directement depuis les registres de pipeline (EX/MEM et MEM/WB) vers les entrées de l\'UAL à l\'étage EX, court-circuitant ainsi le banc de registres.

Pour implémenter cela, nous devons modifier le chemin de données :

- Deux multiplexeurs 3-vers-1 sont ajoutés en amont des deux entrées de l\'UAL.

- Pour chaque entrée, le MUX peut maintenant sélectionner sa donnée depuis trois sources :

  1.  La sortie du banc de registres (le chemin original).

  2.  La sortie de l\'UAL du cycle précédent (stockée dans le registre EX/MEM).

  3.  La donnée destinée à l\'écriture du cycle encore précédent (stockée dans le registre MEM/WB).

La sélection de la bonne source est gérée par une **unité de transmission** (*forwarding unit*). C\'est un bloc de logique combinatoire situé à l\'étage EX qui prend en entrée les numéros des registres sources de l\'instruction courante (dans

ID/EX) et les numéros des registres de destination des deux instructions précédentes (dans EX/MEM et MEM/WB). Sa logique est la suivante (pour la première entrée de l\'UAL, ForwardA) :

1.  **Aléa EX/MEM** : Si l\'instruction à l\'étage MEM écrit dans un registre (EX/MEM.RegWrite=1) et que ce registre est le même que le premier registre source de l\'instruction à l\'étage EX (EX/MEM.RegisterRd == ID/EX.RegisterRs), alors il faut transmettre le résultat de l\'UAL de l\'instruction précédente. ForwardA sélectionne la sortie de l\'étage EX.

2.  **Aléa MEM/WB** : Sinon, si l\'instruction à l\'étage WB écrit dans un registre (MEM/WB.RegWrite=1) et que ce registre est le même que le premier registre source de l\'instruction à l\'étage EX (MEM/WB.RegisterRd == ID/EX.RegisterRs), alors il faut transmettre la valeur venant de l\'étage MEM. ForwardA sélectionne la sortie de l\'étage MEM.

3.  **Aucun aléa** : Sinon, la donnée provient du banc de registres.

Une logique similaire s\'applique à la seconde entrée de l\'UAL (ForwardB). Avec cette technique, la plupart des dépendances RAW entre instructions arithmétiques peuvent être résolues sans aucun gel, préservant un CPI idéal de 1.

#### 12.3.3.3 Le cas particulier de l\'aléa \"load-use\" : Quand la transmission ne suffit pas

La transmission de données, bien que très efficace, ne peut pas résoudre tous les aléas de données. Il existe une situation critique connue sous le nom d\'**aléa de chargement-utilisation** (*load-use hazard*). Elle se produit lorsqu\'une instruction utilise le résultat d\'une instruction

lw qui la précède immédiatement.

> Extrait de code

lw \$s0, 0(\$t1)\
add \$t2, \$s0, \$t3

Analysons le timing dans le pipeline :

  --------------------- ---------- ---------- ---------- ---------- ----------
  Cycle                 1          2          3          4          5

  lw \$s0,\...          IF         ID         EX         **MEM**    WB

  add \$t2, \$s0,\...              IF         ID         **EX**     MEM
  --------------------- ---------- ---------- ---------- ---------- ----------

L\'instruction lw lit la donnée depuis la mémoire à l\'étage MEM, au cycle 4. Cette donnée n\'est donc disponible qu\'à la fin du cycle 4, où elle est stockée dans le registre de pipeline MEM/WB. Cependant, l\'instruction add a besoin de cette donnée pour son calcul dans l\'UAL au début de son étage EX, qui se déroule également au cycle 4. Il est physiquement impossible de transmettre une donnée \"en arrière dans le temps\", de la fin d\'un étage au début de ce même étage pour une autre instruction.

La transmission seule est insuffisante. La solution est une **combinaison de gel et de transmission**. L\'unité de détection d\'aléas doit être enrichie pour identifier spécifiquement ce cas : une instruction

lw est dans l\'étage EX (ID/EX.MemRead=1) et son registre de destination (ID/EX.RegisterRt) est l\'un des registres sources de l\'instruction à l\'étage ID.

Lorsque cette condition est détectée, l\'unité de détection d\'aléas insère **un seul cycle de gel (une bulle)**.

  --------------------- -------- -------- -------- --------- -------- --------
  Cycle                 1        2        3        4         5        6

  lw \$s0,\...          IF       ID       EX       **MEM**   WB       

  add \$t2, \$s0,\...            IF       ID       *stall*   **EX**   MEM
  --------------------- -------- -------- -------- --------- -------- --------

Ce gel décale l\'instruction add d\'un cycle. Maintenant, son étage EX se déroule au cycle 5. À ce moment, l\'instruction lw a terminé son étage MEM et sa donnée est disponible dans le registre MEM/WB. L\'unité de transmission peut alors faire son travail et acheminer cette donnée directement à l\'entrée de l\'UAL pour l\'instruction add. Cet unique cycle de gel est la pénalité incompressible pour une dépendance de type chargement-utilisation.

### 12.3.4 Techniques de résolution des aléas de contrôle : La prédiction de branchement

Les aléas de contrôle, causés par les branchements, représentent une source majeure de dégradation des performances car ils peuvent vider une partie significative du pipeline. Les techniques pour les atténuer vont de solutions simples mais coûteuses à des mécanismes de prédiction sophistiqués qui tentent de deviner l\'avenir du programme.

#### 12.3.4.1 Stratégies statiques et le concept de \"branch delay slot\"

Les stratégies statiques prennent une décision de prédiction fixe, soit à la conception du processeur, soit à la compilation, sans tenir compte du comportement du programme à l\'exécution.

- **Geler le pipeline** : La méthode la plus simple est d\'arrêter le chargement de nouvelles instructions dès qu\'un branchement est détecté à l\'étage ID, et d\'attendre que son issue soit résolue à l\'étage EX. C\'est sûr, mais cela introduit une pénalité fixe de plusieurs cycles pour chaque branchement, ce qui est très inefficace.

- **Prédire \"non pris\" (Predict Not Taken)** : C\'est une stratégie statique très courante. Le processeur parie que le branchement ne sera pas pris et continue de charger les instructions séquentiellement (PC+4, PC+8, etc.). Si la prédiction est correcte (le branchement n\'est pas pris), il n\'y a aucune pénalité, le pipeline continue de fonctionner à plein régime. Si la prédiction est fausse (le branchement est pris), les instructions incorrectement chargées doivent être vidées, et la pénalité de branchement est encourue. Cette stratégie est efficace car, dans de nombreux cas (comme les structures\
  if-then sans else), les branchements sont plus souvent non pris que pris.

- **Prédire \"pris\" (Predict Taken)** : Le processeur parie que le branchement sera toujours pris. Cette approche est moins simple car elle exige de calculer l\'adresse cible du branchement plus tôt dans le pipeline (idéalement à l\'étage ID) pour pouvoir commencer à charger depuis cette nouvelle adresse.

- **Le Slot de Délai de Branchement (Branch Delay Slot)** : Il s\'agit d\'une solution architecturale, visible par le logiciel. L\'ISA est défini de telle sorte que l\'instruction qui suit *immédiatement* un branchement est **toujours** exécutée, que le branchement soit pris ou non. La responsabilité incombe alors au compilateur de remplir ce \"slot\" avec une instruction utile. Le compilateur peut tenter d\'y placer :

  1.  Une instruction du bloc de code avant le branchement, si elle n\'affecte pas la condition du branchement.

  2.  Une instruction du bloc cible (si le branchement est pris).

  3.  Une instruction du chemin séquentiel (si le branchement n\'est pas pris).

  4.  Si aucune instruction utile ne peut être trouvée, il insère une instruction NOP.\
      Cette technique était populaire dans les premières architectures RISC comme MIPS, car elle permettait de masquer un cycle de pénalité de branchement. Cependant, elle expose les détails du pipeline au logiciel, ce qui complique la conception des compilateurs et rend difficile l\'évolution des microarchitectures avec des pipelines plus profonds.

#### 12.3.4.2 Prédiction dynamique : Prédicteurs à 1 et 2 bits avec hystérésis

Les stratégies dynamiques sont beaucoup plus performantes car elles s\'adaptent au comportement réel du programme. Elles utilisent l\'historique des branchements passés pour prédire leur comportement futur.

- **Prédicteur à 1 bit** : C\'est la forme la plus simple de prédiction dynamique. Le processeur maintient une table, appelée BHT (Branch History Table), indexée par les bits de poids faible de l\'adresse de l\'instruction de branchement. Chaque entrée de cette table contient un seul bit qui mémorise le dernier résultat du branchement : 1 pour \"pris\" (*taken*), 0 pour \"non pris\" (*not taken*). La prédiction est simplement la valeur de ce bit.\
  \
  Le problème de ce prédicteur simple apparaît avec les boucles. Une boucle se termine par un branchement qui est pris à chaque itération, sauf la dernière. Le prédicteur à 1 bit prédira correctement toutes les itérations sauf la dernière. Mais après cette dernière itération (non prise), le bit de prédiction passe à 0. Lors de la prochaine exécution de la boucle, la première itération sera mal prédite (prédite \"non prise\" alors qu\'elle est \"prise\"). Le prédicteur se trompe donc deux fois pour chaque exécution complète de la boucle.106

- **Prédicteur à 2 bits avec hystérésis** : Pour améliorer la précision, notamment pour les boucles, on utilise un compteur à saturation de 2 bits pour chaque entrée de la BHT. Ce compteur peut être modélisé comme une machine à quatre états  :

  ------------ --------------------- ------------ ------------ -------------
  Valeur       État                  Prédiction   Si Pris      Si Non Pris

  11           Fortement Pris        Pris         Reste à 11   Passe à 10

  10           Faiblement Pris       Pris         Passe à 11   Passe à 01

  01           Faiblement Non Pris   Non Pris     Passe à 10   Passe à 00

  00           Fortement Non Pris    Non Pris     Passe à 01   Reste à 00
  ------------ --------------------- ------------ ------------ -------------

*Tableau 12.3 : Transitions d\'état pour un prédicteur de branchement à 2 bits.*

La prédiction est basée sur le bit de poids fort du compteur (1x -\> Pris, 0x -\> Non Pris). L\'avantage crucial de ce schéma est l\'**hystérésis** : il faut deux prédictions incorrectes consécutives pour faire basculer la prédiction d\'un état \"fort\" à l\'autre. Dans le cas d\'une boucle, le compteur se stabilise rapidement à l\'état \"Fortement Pris\" (11). Lors de la dernière itération (non prise), il passe à \"Faiblement Pris\" (10). La prédiction est fausse, mais une seule erreur est commise. Lors de la prochaine exécution de la boucle, le compteur est à 10, donc la première itération est correctement prédite comme \"prise\", et le compteur retourne à 11. Le prédicteur à 2 bits ne commet qu\'une seule erreur par exécution de boucle, ce qui améliore significativement la précision.

#### 12.3.4.3 La table d\'historique de branchement (BHT) et son fonctionnement

La **Table d\'Historique de Branchement** (BHT, *Branch History Table*) est la structure matérielle qui met en œuvre la prédiction dynamique. Il s\'agit d\'une petite mémoire cache dédiée, située dans l\'étage IF du processeur.

- **Structure** : La BHT est une table dont chaque entrée correspond à un prédicteur (par exemple, un compteur à 2 bits). La table est indexée en utilisant les bits de poids faible de l\'adresse de l\'instruction (le PC) qui est en cours de chargement. On utilise une partie du PC car cela permet de distinguer les différents branchements dans le code. Comme pour un cache, il est possible que deux adresses de branchement différentes mappent sur la même entrée de la BHT, créant un conflit, mais la taille de la table est généralement choisie pour minimiser ces occurrences.

- **Fonctionnement** :

  1.  **Prédiction (Étage IF)** : À chaque cycle, l\'adresse du PC est utilisée pour indexer la BHT. La valeur du compteur à 2 bits est lue. Le bit de poids fort de ce compteur est utilisé comme prédiction (Pris/Non Pris). Si la prédiction est \"Pris\", le processeur doit également prédire l\'adresse cible. Une structure complémentaire, le **Tampon de Cible de Branchement** (BTB, *Branch Target Buffer*), stocke les adresses cibles des branchements récemment pris pour les fournir rapidement. Si la prédiction est \"Non Pris\", le processeur continue simplement à charger à l\'adresse PC+4.

  2.  **Mise à jour (Étage EX/MEM)** : Lorsque l\'instruction de branchement atteint l\'étage EX, son issue réelle et son adresse cible sont calculées. Cette information est utilisée pour vérifier la prédiction. Si la prédiction était correcte, l\'exécution continue. Si elle était incorrecte (*misprediction*), les instructions chargées spéculativement sont vidées du pipeline, et le chargement reprend au bon endroit. Dans tous les cas, l\'information sur l\'issue réelle est utilisée pour mettre à jour le compteur à 2 bits dans la BHT, afin d\'améliorer les prédictions futures pour ce même branchement.

La prédiction de branchement dynamique est une technique extraordinairement efficace, avec des taux de réussite dépassant souvent les 95% pour les prédicteurs modernes, ce qui est essentiel pour maintenir le remplissage des pipelines profonds des processeurs haute performance actuels.

