# Chapitre I.13 : Parallélisme au Niveau de l\'Instruction (ILP) et Architectures Avancées

## Introduction : La Quête de Performance au-delà de la Fréquence

L\'histoire de l\'architecture des ordinateurs est une quête incessante de performance. Pendant plusieurs décennies, cette quête a été largement alimentée par une stratégie simple en apparence mais extraordinairement fructueuse : l\'augmentation de la fréquence d\'horloge des processeurs. Guidée par la loi de Moore, qui prédisait le doublement du nombre de transistors sur une puce tous les deux ans environ, l\'industrie des semi-conducteurs a pu, à chaque nouvelle génération, graver des circuits plus fins, plus rapides et plus efficaces. Cependant, au début des années 2000, cette course effrénée à la fréquence s\'est heurtée à des barrières physiques fondamentales. L\'augmentation de la fréquence d\'horloge s\'accompagne d\'une augmentation de la consommation d\'énergie et, par conséquent, de la chaleur dissipée. Les ingénieurs se sont retrouvés face à ce que l\'on a appelé le \"mur de la puissance\" (

*Power Wall*) : il est devenu thermiquement et économiquement irréalisable de continuer à augmenter les fréquences sans recourir à des solutions de refroidissement exotiques et coûteuses. La performance ne pouvait plus être obtenue en faisant simplement la même chose, mais plus vite.

Face à cette impasse, les architectes de processeurs ont dû explorer une autre dimension de l\'optimisation : le parallélisme. Si l\'on ne peut plus exécuter les instructions plus rapidement, peut-être peut-on en exécuter plusieurs en même temps? Cette question a ouvert l\'ère du parallélisme, qui se manifeste à plusieurs niveaux. Ce chapitre se concentre sur la première et la plus fondamentale de ces approches : le **Parallélisme au Niveau de l\'Instruction** (en anglais, *Instruction-Level Parallelism* ou ILP). L\'ILP désigne l\'ensemble des techniques matérielles et logicielles permettant d\'exécuter simultanément ou de manière superposée plusieurs instructions issues d\'un même flux d\'exécution séquentiel. Il s\'agit d\'une forme de parallélisme implicite, car elle est en grande partie gérée par le processeur et le compilateur, souvent de manière transparente pour le programmeur. Ceci le distingue fondamentalement du

**Parallélisme au Niveau du Thread** (*Thread-Level Parallelism* ou TLP), qui repose sur l\'exécution explicite de plusieurs flux d\'instructions (threads) en parallèle, une approche qui domine l\'ère des processeurs multi-cœurs.

Ce chapitre propose un parcours logique à travers l\'évolution des architectures conçues pour exploiter l\'ILP. Nous commencerons par les fondements avec le pipeline, la première technique ayant permis de superposer l\'exécution des instructions. Nous explorerons ensuite les architectures superscalaires, qui ont multiplié les pipelines pour exécuter plusieurs instructions à chaque cycle d\'horloge. Nous plongerons au cœur des mécanismes d\'exécution dynamique et dans le désordre, qui représentent le summum de la complexité matérielle pour extraire l\'ILP de manière transparente. Nous examinerons une philosophie alternative, les architectures VLIW, qui déplacent cette complexité du matériel vers le compilateur. Nous aborderons également le parallélisme de données via les instructions SIMD, une approche complémentaire qui s\'est avérée extraordinairement efficace pour des domaines d\'application spécifiques. Enfin, nous analyserons les limites qui ont freiné la course à l\'ILP et ont conduit à la transition inévitable vers les architectures multi-cœurs, introduisant ainsi de nouveaux défis complexes tels que la cohérence des caches et la consistance de la mémoire.

Cette exploration n\'est pas seulement une description de mécanismes ; elle vise à révéler une dynamique essentielle en architecture des ordinateurs. L\'ILP n\'est pas une simple \"astuce\" d\'optimisation. Il s\'agit d\'une réponse fondamentale à un découplage historique entre les vitesses d\'évolution de la logique des processeurs et celles de l\'accès à la mémoire. Alors que la loi de Moore accélérait la puissance de calcul, la latence de la mémoire vive (DRAM) s\'améliorait beaucoup plus lentement, créant un \"mur de la mémoire\" (*Memory Wall*). Un processeur ultra-rapide passant la majorité de son temps à attendre les données de la mémoire est un processeur inefficace. Les techniques d\'ILP, en permettant à des instructions indépendantes de s\'exécuter pendant que d\'autres, dépendantes d\'un accès mémoire, sont en attente, sont devenues la stratégie principale pour

*masquer* cette latence et maintenir les unités de calcul productives. L\'ILP est donc autant une technique de tolérance à la latence qu\'une technique d\'accélération pure. Comprendre cette motivation profonde est la clé pour apprécier la complexité et l\'ingéniosité des architectures avancées qui seront détaillées dans les sections suivantes.

## Section 1. Fondements : Le Pipeline, Premier Pas vers l\'ILP

La forme la plus élémentaire et la plus fondamentale de parallélisme au niveau de l\'instruction est le pipeline. Plutôt que de traiter les instructions comme des unités atomiques et indivisibles, le pipelining décompose leur exécution en une séquence d\'étapes plus petites et indépendantes, permettant de superposer le traitement de plusieurs instructions à la fois.

### 1.1. Principes de l\'Exécution Pipelinée

L\'analogie la plus courante pour décrire le principe du pipeline est celle de la chaîne de montage industrielle. Dans une usine automobile, assembler un véhicule complet requiert plusieurs étapes successives : montage du châssis, installation du moteur, pose de la carrosserie, peinture, etc. Si un seul groupe d\'ouvriers effectuait toutes ces tâches sur une voiture avant de commencer la suivante, la production serait très lente. Une chaîne de montage divise le travail en postes spécialisés. Pendant qu\'un véhicule se fait installer son moteur, le véhicule précédent est à l\'étape de la peinture, et le suivant entre au poste de montage du châssis. Bien que le temps total pour assembler une seule voiture (la latence) ne change pas, le rythme de production (le débit) est considérablement augmenté : une nouvelle voiture sort de la chaîne à des intervalles beaucoup plus courts.

L\'exécution d\'une instruction dans un processeur peut être décomposée de manière similaire. L\'exemple canonique, particulièrement pertinent pour les architectures RISC (*Reduced Instruction Set Computer*), est le pipeline à cinq étages  :

1.  **Instruction Fetch (IF)** : Recherche de l\'instruction en mémoire, à l\'adresse indiquée par le compteur de programme (PC).

2.  **Instruction Decode (ID)** : Décodage de l\'instruction pour déterminer l\'opération à effectuer et lecture des opérandes depuis le banc de registres.

3.  **Execute (EX)** : Exécution de l\'opération, généralement au sein de l\'unité arithmétique et logique (ALU).

4.  **Memory Access (MEM)** : Accès à la mémoire pour les instructions de chargement (*load*) ou de stockage (*store*). Pour les autres instructions, cet étage est souvent inactif.

5.  **Write Back (WB)** : Écriture du résultat de l\'opération dans le banc de registres.

Dans un processeur non pipeliné, une instruction doit traverser ces cinq étapes avant que la suivante puisse commencer. Si chaque étape prend un cycle d\'horloge, il faut 5 cycles par instruction. Avec un pipeline, dès que la première instruction passe de l\'étage IF à l\'étage ID, la deuxième instruction peut entrer dans l\'étage IF. Au cinquième cycle, les cinq étages du pipeline sont occupés simultanément, chacun traitant une instruction différente. Une fois le pipeline \"rempli\", une instruction se termine à chaque cycle d\'horloge.

Le gain de performance est tangible. Pour exécuter *N* instructions, un processeur non pipeliné à 5 étapes par instruction nécessiterait 5×N cycles. Un processeur pipeliné à 5 étages, quant à lui, nécessite 5 cycles pour terminer la première instruction, puis un cycle supplémentaire pour chaque instruction suivante, soit un total de 4+N cycles. Pour un grand nombre d\'instructions, le temps d\'exécution tend vers *N* cycles. La mesure de performance clé ici est le nombre de **Cycles Par Instruction (CPI)**. Pour un pipeline idéal, le CPI tend vers 1, une amélioration drastique par rapport aux processeurs multi-cycles où le CPI était de 5 ou plus. C\'est cette focalisation sur l\'augmentation du

**débit** (instructions terminées par unité de temps) plutôt que sur la réduction de la **latence** (temps pour terminer une seule instruction) qui constitue le changement de paradigme fondamental introduit par le pipeline.

### 1.2. Les Aléas du Pipeline : Les Obstacles à la Performance Idéale

Le fonctionnement idéal d\'un pipeline, où une instruction se termine à chaque cycle, est rarement atteint en pratique. Des situations appelées **aléas** (*hazards*) peuvent perturber le flux continu d\'instructions et forcer le pipeline à s\'arrêter ou à être purgé, dégradant ainsi les performances. On distingue trois types d\'aléas.

#### 1.2.1. Aléas de Structure

Un aléa de structure se produit lorsque deux instructions différentes dans le pipeline tentent d\'utiliser la même ressource matérielle au même cycle d\'horloge. Par exemple, si l\'architecture ne dispose que d\'un seul port d\'accès à la mémoire de données, une instruction à l\'étage MEM (effectuant un

*load*) entrerait en conflit avec une instruction à l\'étage IF (cherchant la prochaine instruction), si les instructions et les données partagent le même chemin mémoire. La solution à ce type d\'aléa est généralement architecturale : dupliquer les ressources. C\'est pourquoi les architectures modernes utilisent des caches d\'instructions et des caches de données séparés (architecture Harvard au niveau des caches) pour permettre des accès simultanés.

#### 1.2.2. Aléas de Données

Les aléas de données surviennent lorsque l\'exécution d\'une instruction dépend du résultat d\'une instruction précédente qui n\'est pas encore terminée. Ces dépendances brisent l\'hypothèse d\'indépendance entre instructions et sont la principale source de dégradation des performances dans les pipelines simples. Il existe trois types de dépendances de données  :

- **Read-After-Write (RAW) - Dépendance Vraie** : C\'est la dépendance la plus fondamentale et la plus fréquente. Une instruction tente de lire un opérande avant que l\'instruction précédente ne l\'ait écrit.

  - *Exemple* :\
    Extrait de code\
    ADD R1, R2, R3 ; R1 \<- R2 + R3\
    SUB R4, R1, R5 ; R4 \<- R1 - R5

> L\'instruction SUB a besoin de la nouvelle valeur de R1 calculée par ADD. Dans un pipeline à 5 étages, ADD écrit le résultat dans R1 à l\'étage WB (cycle 5), mais SUB a besoin de lire R1 à l\'étage ID (cycle 3). Sans précaution, SUB lirait l\'ancienne valeur de R1.

- *Solutions* : La solution la plus simple est d\'insérer des **bulles** (*stalls* ou NOPs) dans le pipeline, gelant les étages en amont jusqu\'à ce que la donnée soit disponible. Une solution beaucoup plus efficace est le\
  **court-circuitage** (*forwarding* ou *bypassing*). Le résultat de l\'ALU de l\'instruction ADD (disponible à la fin de l\'étage EX) est directement redirigé vers l\'entrée de l\'ALU pour l\'instruction SUB au cycle suivant, sans attendre l\'écriture dans le banc de registres.

<!-- -->

- **Write-After-Read (WAR) - Anti-dépendance** : Une instruction tente d\'écrire dans un registre avant qu\'une instruction précédente n\'ait eu le temps de le lire. Ce type de dépendance est impossible dans un pipeline simple comme le RISC à 5 étages où les lectures se font tôt (ID) et les écritures tard (WB), mais il devient un problème majeur dans les architectures plus complexes avec exécution dans le désordre.

- **Write-After-Write (WAW) - Dépendance de Sortie** : Deux instructions écrivent dans le même registre de destination. Dans un pipeline simple, l\'ordre des écritures est préservé, mais dans des pipelines plus complexes (par exemple, avec des unités flottantes à latence variable), une instruction ultérieure pourrait terminer son exécution et écrire son résultat avant une instruction antérieure, violant ainsi la sémantique du programme.

#### 1.2.3. Aléas de Contrôle

Les aléas de contrôle sont causés par les instructions de branchement (conditionnels ou inconditionnels). Lorsqu\'une instruction de branchement est à l\'étage de décodage (ID) ou d\'exécution (EX), le processeur ne sait pas encore si le branchement sera pris ou non, ni quelle sera l\'adresse de la prochaine instruction à exécuter. Pendant ce temps, le pipeline continue de chercher les instructions qui suivent séquentiellement le branchement. Si le branchement est finalement pris, les instructions déjà chargées dans le pipeline sont incorrectes et doivent être annulées (

*flushed*), ce qui introduit des cycles de pénalité.

Plusieurs techniques ont été développées pour atténuer l\'impact des aléas de contrôle :

- **Gel du pipeline** : La solution la plus simple consiste à arrêter de chercher de nouvelles instructions jusqu\'à ce que l\'issue du branchement soit connue. C\'est simple mais coûteux.

- **Prédiction de branchement** : Le processeur fait une supposition sur l\'issue du branchement et commence à chercher et exécuter des instructions de manière spéculative à partir du chemin prédit.

  - **Prédiction statique** : La prédiction est basée sur des règles simples, comme \"toujours prédire qu\'un branchement arrière (fin de boucle) est pris\" ou \"toujours prédire qu\'un branchement avant n\'est pas pris\".

  - **Prédiction dynamique** : Le matériel conserve un historique des issues des branchements récents dans une table (Branch History Table, BHT) et utilise cet historique pour prédire le comportement futur. Les prédicteurs modernes sont extrêmement sophistiqués et atteignent des taux de précision supérieurs à 95%.

- **Branchement retardé (*Delayed Branch*)** : Une technique plus ancienne où l\'instruction qui suit immédiatement un branchement est toujours exécutée, quelle que soit l\'issue du branchement. Le compilateur doit alors tenter de placer une instruction utile dans cet \"emplacement de retard\" (*delay slot*).

En conclusion, le pipeline est la pierre angulaire de l\'ILP, mais sa performance est intrinsèquement limitée par les dépendances entre instructions. La gestion efficace des aléas, en particulier via des mécanismes matériels comme le *forwarding* et la prédiction de branchement, est devenue un aspect central de la conception des processeurs modernes.

## Section 2. Architectures Superscalaires : Multiplier les Pipelines

Le pipeline scalaire, même optimisé, est confronté à une limite théorique : il ne peut, au mieux, terminer qu\'une seule instruction par cycle d\'horloge, atteignant un CPI (Cycles Per Instruction) de 1. Pour dépasser cette barrière et obtenir un débit supérieur à une instruction par cycle (un IPC,

*Instructions Per Cycle*, supérieur à 1), il est nécessaire de pouvoir initier l\'exécution de plusieurs instructions simultanément. C\'est le principe fondamental des architectures superscalaires.

### 2.1. Du Scalaire au Superscalaire : Le Principe de l\'Émission Multiple

Une architecture superscalaire est une évolution naturelle du pipeline qui exploite le parallélisme spatial en plus du parallélisme temporel. Au lieu d\'un seul pipeline, un processeur superscalaire en contient plusieurs en parallèle. Un processeur superscalaire de

**degré N** est capable de chercher, décoder, émettre et exécuter jusqu\'à *N* instructions à chaque cycle d\'horloge. Par exemple, un processeur superscalaire de degré 2 peut potentiellement doubler le débit de pointe par rapport à un processeur scalaire, atteignant un IPC idéal de 2.

Le fonctionnement repose sur la capacité du processeur à examiner un groupe d\'instructions consécutives dans le flux du programme et à déterminer, dynamiquement au moment de l\'exécution, lesquelles sont indépendantes et peuvent être envoyées simultanément aux unités d\'exécution disponibles. Ce processus est orchestré par plusieurs composants clés  :

- Une **unité d\'extraction** capable de lire plusieurs instructions de la mémoire ou du cache d\'instructions en un seul cycle.

- Une **unité de décodage** capable de traiter plusieurs instructions en parallèle.

- Plusieurs **unités d\'exécution** (ou unités fonctionnelles) pour effectuer les calculs.

- Une **logique d\'émission** complexe pour allouer les instructions aux unités d\'exécution.

### 2.2. Modifications Architecturales Requises

La transition d\'une architecture scalaire à une architecture superscalaire n\'est pas une simple duplication de pipelines ; elle impose des modifications profondes et complexes à la microarchitecture du processeur.

- **Fetch et Decode \"larges\"** : Pour alimenter une machine de degré *N*, l\'étage de recherche (Fetch) doit être capable de charger *N* instructions par cycle. La solution la plus directe consiste à élargir le bus entre le processeur et le cache d\'instructions. Si une instruction a une taille fixe de 32 bits (4 octets), un processeur de degré 4 nécessitera un bus de 128 bits (16 octets) pour charger quatre instructions en une seule fois. De même, l\'étage de décodage doit être équipé de\
  *N* décodeurs distincts pour analyser les instructions en parallèle.

- **Unités d\'Exécution Multiples** : Le cœur de l\'exécution parallèle réside dans la duplication des unités fonctionnelles. Un processeur superscalaire ne duplique pas nécessairement toutes les unités à l\'identique. Une approche courante est d\'implémenter un ensemble hétérogène d\'unités pour correspondre au mix d\'instructions typique des programmes. Par exemple, un processeur peut disposer de plusieurs unités de calcul sur les entiers (ALU), qui sont très courantes, une ou deux unités pour les opérations en virgule flottante (FPU), et une ou deux unités dédiées aux accès mémoire (Load/Store Units). Cette spécialisation permet d\'exécuter en parallèle un mélange d\'opérations, comme un calcul entier, un calcul flottant et un accès mémoire.

- **Le Goulot d\'Étranglement du Banc de Registres** : L\'une des contraintes les plus critiques dans la conception superscalaire est le banc de registres. Considérons un processeur de degré *N* où chaque instruction peut lire jusqu\'à deux registres sources et écrire dans un registre de destination. Pour soutenir l\'exécution parallèle de *N* telles instructions en un seul cycle, le banc de registres doit fournir jusqu\'à 2×N ports de lecture et *N* ports d\'écriture simultanés. La complexité, la surface de silicium, le temps d\'accès et la consommation d\'énergie d\'un banc de registres augmentent de manière spectaculaire avec le nombre de ports. Ce composant devient rapidement un goulot d\'étranglement majeur, limitant le degré de parallélisme qu\'il est pratique d\'implémenter.

### 2.3. Le Défi Central : Détection Dynamique des Dépendances

La véritable complexité d\'un processeur superscalaire ne réside pas seulement dans la duplication des ressources, mais dans la logique de contrôle nécessaire pour les utiliser efficacement et correctement. À chaque cycle, l\'unité d\'émission doit analyser un groupe d\'instructions candidates et résoudre les dépendances entre elles pour déterminer un sous-ensemble d\'instructions indépendantes pouvant être lancées en parallèle.

Cette logique de détection doit vérifier toutes les paires d\'instructions possibles. Pour un processeur de degré *N*, le nombre de vérifications de dépendances à effectuer entre les instructions candidates croît de manière quadratique, en O(N2). Par exemple, pour émettre 4 instructions, il faut effectuer 6 vérifications de dépendances entre elles. Cette complexité croissante de la logique de détection et de la circuiterie de

*forwarding* associée constitue une limite fondamentale à l\'élargissement des processeurs superscalaires. Au-delà d\'un certain degré (typiquement 4 à 8 dans les processeurs modernes), le coût en surface de silicium, en consommation d\'énergie et en délai de cycle pour cette logique devient prohibitif, et les gains de performance marginaux ne justifient plus l\'augmentation de la complexité.

Cette complexité matérielle est le prix à payer pour une caractéristique essentielle des architectures superscalaires : la gestion dynamique du parallélisme. Contrairement à d\'autres approches (comme VLIW, que nous verrons plus tard) qui délèguent cette tâche au compilateur, le processeur superscalaire prend lui-même la décision d\'ordonnancement au moment de l\'exécution. Ce choix a une implication majeure : la compatibilité binaire. Un programme compilé pour un ancien processeur scalaire peut s\'exécuter, sans modification, sur un nouveau processeur superscalaire et bénéficier automatiquement d\'une accélération, car c\'est le matériel qui se charge de découvrir et d\'exploiter le parallélisme latent dans le code binaire. Cette capacité à préserver l\'immense écosystème logiciel existant a été un facteur décisif dans la domination commerciale de l\'approche superscalaire pour les processeurs d\'usage général.

## Section 3. L\'Exécution Dynamique : Tolérance à la Latence et Exécution dans le Désordre (OoO)

L\'architecture superscalaire, en permettant l\'émission de plusieurs instructions par cycle, constitue un progrès significatif. Cependant, si elle se contente d\'émettre les instructions dans l\'ordre strict du programme (*in-order*), sa performance reste sévèrement limitée par les dépendances de données. Un seul obstacle peut paralyser l\'ensemble du front d\'exécution. Pour surmonter cette limitation, les processeurs modernes ont adopté une technique radicalement plus puissante et complexe : l\'exécution dans le désordre (*out-of-order execution*, ou OoO).

### 3.1. Motivation pour l\'Exécution dans le Désordre

Le principal problème d\'une exécution superscalaire *in-order* est le **blocage en tête de file** (*head-of-line blocking*). Imaginez une file d\'attente d\'instructions prêtes à être émises. Si la première instruction de la file est bloquée parce qu\'elle attend une donnée (par exemple, le résultat d\'un long calcul ou, plus fréquemment, une donnée venant de la mémoire suite à un cache miss), aucune des instructions suivantes ne peut être émise, même si elles sont totalement indépendantes de l\'instruction bloquée et que les ressources pour les exécuter sont disponibles. Le processeur passe alors de précieux cycles à ne rien faire, gaspillant son potentiel de parallélisme.

L\'exécution dans le désordre résout ce problème en découplant l\'ordre de recherche des instructions (qui reste l\'ordre du programme) de leur ordre d\'exécution. Le principe est simple : permettre aux instructions indépendantes et prêtes à s\'exécuter de \"dépasser\" les instructions plus anciennes qui sont bloquées. L\'ordonnancement des instructions n\'est plus dicté par leur position dans le programme, mais par la

**disponibilité de leurs opérandes et des unités fonctionnelles**. Cette approche permet de masquer efficacement la latence, en particulier celle des accès mémoire, en maintenant les unités de calcul occupées avec du travail utile pendant qu\'une instruction de chargement attend sa donnée.

### 3.2. L\'Algorithme de Tomasulo : Un Mécanisme Distribué pour l\'OoO

L\'un des premiers et des plus influents algorithmes pour implémenter l\'exécution dans le désordre a été développé par Robert Tomasulo pour l\'unité de calcul en virgule flottante de l\'IBM System/360 Model 91 dans les années 1960. Sa conception élégante et distribuée a jeté les bases de tous les processeurs OoO modernes. L\'algorithme repose sur trois composants clés.

- **Stations de Réservation (Reservation Stations - RS)** : Au lieu d\'une file d\'attente centralisée, chaque unité fonctionnelle (additionneur, multiplicateur, etc.) dispose d\'un ensemble de tampons appelés stations de réservation. Lorsqu\'une instruction est décodée, elle est placée dans une RS libre de l\'unité fonctionnelle appropriée. La RS conserve l\'opération à effectuer et attend que tous ses opérandes soient disponibles. Une fois que c\'est le cas, et que l\'unité fonctionnelle est libre, l\'instruction peut être exécutée, indépendamment de sa position dans l\'ordre du programme.

- **Renommage de Registres (Register Renaming)** : C\'est l\'innovation la plus profonde de l\'algorithme de Tomasulo. Elle permet d\'éliminer les fausses dépendances (WAR et WAW) qui entravent le parallélisme. Le principe est le suivant : lorsqu\'une instruction est émise dans une RS, si ses opérandes sources sont déjà disponibles dans le banc de registres, leurs valeurs sont copiées dans la RS. Si un opérande n\'est pas encore disponible (car il est le résultat d\'une instruction précédente encore en cours d\'exécution), la RS ne stocke pas le nom du registre (ex: F2), mais un\
  **tag** qui identifie de manière unique la station de réservation qui produira ce résultat. Ainsi, plusieurs instructions successives écrivant dans le même registre architectural (ex: F2) se verront allouer des destinations physiques distinctes (différentes entrées de RS), éliminant les conflits WAW et WAR et permettant leur exécution en parallèle. Le matériel crée dynamiquement des dépendances de données vraies (RAW) sur les tags, reflétant le véritable flux de données du programme.

- **Bus de Données Commun (Common Data Bus - CDB)** : Le CDB est un bus de diffusion qui connecte les sorties de toutes les unités fonctionnelles aux entrées de toutes les stations de réservation et au banc de registres. Lorsqu\'une unité fonctionnelle termine un calcul, elle diffuse le résultat accompagné de son tag (celui de la RS qui a initié l\'opération) sur le CDB. Toutes les stations de réservation en attente \"écoutent\" (\
  *snoop*) le CDB. Si le tag diffusé correspond à un tag qu\'une RS attend pour l\'un de ses opérandes, elle capture la valeur. Une fois que la RS a capturé tous ses opérandes, son instruction devient prête à être exécutée. Ce mécanisme de diffusion et de capture implémente le *forwarding* de manière élégante et distribuée, permettant aux résultats d\'être consommés dès qu\'ils sont produits, sans même attendre qu\'ils soient écrits dans le banc de registres.

### 3.3. Le Reorder Buffer (ROB) : Assurer la Cohérence Architecturale

L\'algorithme de Tomasulo résout brillamment le problème de l\'ordonnancement dynamique et de l\'élimination des fausses dépendances. Cependant, il crée un nouveau défi majeur : les instructions se terminent dans le désordre. Cela rend la gestion des **exceptions précises** quasi impossible. Si une instruction

i lève une exception (ex: division par zéro), mais qu\'une instruction i+1 a déjà terminé et écrit son résultat dans un registre, l\'état de la machine est devenu incohérent par rapport à un modèle d\'exécution séquentiel. Il est impossible de sauvegarder un état \"propre\" où toutes les instructions avant i sont terminées et toutes celles après i n\'ont pas encore commencé. Le même problème se pose pour les erreurs de prédiction de branchement.

La solution à ce problème est le **Reorder Buffer (ROB)**, un mécanisme qui dissocie l\'exécution de la validation. Le principe fondamental est le suivant : l\'exécution peut se faire dans le désordre, mais la

**validation** (*commit* ou *retirement*), c\'est-à-dire la mise à jour de l\'état architectural final (le banc de registres et la mémoire visible par le programmeur), doit se faire **strictement dans l\'ordre du programme initial**.

Le ROB fonctionne comme une file d\'attente circulaire qui suit toutes les instructions en cours de vol (*in-flight*) dans leur ordre de programme. Son fonctionnement s\'articule ainsi :

1.  **Dispatch** : Lorsqu\'une instruction est décodée, une entrée lui est allouée à la queue du ROB, en plus de sa station de réservation. Cette entrée ROB devient le nouveau \"nom\" physique pour le résultat de l\'instruction.

2.  **Write Result** : Lorsqu\'une instruction termine son exécution, son résultat n\'est pas écrit directement dans le registre de destination, mais dans son entrée correspondante dans le ROB. Le CDB diffuse ce résultat vers les stations de réservation qui l\'attendent, mais l\'état architectural reste inchangé.

3.  **Commit** : L\'instruction à la tête du ROB est examinée à chaque cycle. Si son résultat est présent dans son entrée ROB et qu\'elle n\'a levé aucune exception, l\'instruction est validée : son résultat est copié du ROB vers le banc de registres architectural ou la mémoire. L\'entrée est alors libérée de la tête du ROB. Ce processus se répète pour les instructions suivantes, garantissant un commit en ordre.

Ce mécanisme de commit en ordre résout élégamment la gestion des exceptions et de la spéculation  :

- **Exceptions Précises** : Si l\'instruction en tête du ROB a levé une exception, le processeur peut arrêter le commit. L\'état architectural est alors précis : toutes les instructions précédentes sont validées, et aucune des instructions suivantes (y compris celle qui a fauté) ne l\'est.

- **Gestion de la Spéculation** : Si une erreur de prédiction de branchement est détectée, le processeur n\'a qu\'à vider (*flush*) le ROB de toutes les instructions qui suivent le branchement fautif. Comme leurs résultats n\'ont jamais été écrits dans l\'état architectural, leurs effets sont simplement annulés, et le processeur peut redémarrer l\'extraction depuis le bon chemin d\'exécution.

La combinaison de l\'ordonnancement dynamique de type Tomasulo et du commit en ordre via un ROB représente une dissociation fondamentale entre l\'état de la microarchitecture (interne, complexe, désordonné, spéculatif) et l\'état de l\'architecture (externe, simple, séquentiel, tel que défini par le jeu d\'instructions). C\'est cette abstraction puissante qui permet aux processeurs haute performance modernes d\'atteindre des niveaux élevés d\'ILP de manière transparente, tout en présentant au programmeur et au système d\'exploitation le modèle d\'exécution séquentiel et prédictible dont ils ont besoin pour garantir la correction des programmes.

## Section 4. Une Approche Alternative : Les Architectures VLIW et le Parallélisme Statique

Alors que l\'approche superscalaire et l\'exécution dans le désordre ont misé sur une complexité matérielle croissante pour extraire dynamiquement l\'ILP, une philosophie de conception radicalement différente a émergé en parallèle : l\'architecture **VLIW (Very Long Instruction Word)**. L\'idée centrale du VLIW est de déplacer le fardeau de l\'ordonnancement des instructions du matériel vers le compilateur, en adoptant une approche statique du parallélisme.

### 4.1. Principe du \"Very Long Instruction Word\"

Dans une architecture VLIW, le parallélisme n\'est pas découvert par le processeur au moment de l\'exécution, mais il est explicitement encodé dans le format même des instructions. Le compilateur analyse le code source, identifie les opérations qui peuvent être exécutées en parallèle et les regroupe dans un unique et très long \"mot d\'instruction\" ou \"paquet\" (

*bundle*). Par exemple, une instruction VLIW de 256 bits pourrait contenir des champs pour spécifier simultanément deux opérations sur entiers, deux opérations en virgule flottante, deux accès mémoire et une opération de branchement.

À chaque cycle d\'horloge, le processeur extrait, décode et exécute l\'intégralité de ce paquet. Chaque opération du paquet est directement acheminée vers une unité fonctionnelle dédiée correspondante. Toutes les opérations d\'un même paquet sont exécutées en \"lockstep\", c\'est-à-dire qu\'elles démarrent en même temps. Cette approche conduit à une simplification drastique du matériel  :

- Il n\'y a pas de logique complexe de détection de dépendances entre les opérations d\'un même paquet, car le compilateur garantit leur indépendance.

- La logique d\'émission est triviale : chaque champ de l\'instruction contrôle directement une unité fonctionnelle.

- Il n\'y a pas de mécanisme de réordonnancement dynamique. L\'ordre d\'exécution est entièrement déterminé de manière statique par le compilateur.

### 4.2. Le Rôle Central du Compilateur VLIW

Dans une architecture VLIW, le compilateur n\'est plus un simple traducteur de code de haut niveau en instructions machine ; il devient un partenaire essentiel de la microarchitecture, responsable de l\'ordonnancement fin des opérations. Pour générer un code performant, le compilateur doit posséder une connaissance intime et précise du matériel sous-jacent : le nombre et le type d\'unités fonctionnelles, la latence de chaque opération, l\'organisation du banc de registres, etc..

Le parallélisme disponible au sein d\'un seul bloc de base (une séquence d\'instructions sans branchement) est souvent très limité. Pour remplir efficacement de longues instructions VLIW, le compilateur doit employer des techniques d\'optimisation globales sophistiquées pour extraire l\'ILP au-delà des frontières des blocs de base  :

- **Déroulage de boucle (*Loop Unrolling*)** : Cette technique consiste à répliquer le corps d\'une boucle plusieurs fois, réduisant ainsi la surcharge des instructions de branchement et d\'incrémentation du compteur. Le bloc de base résultant est beaucoup plus grand, offrant au compilateur un plus grand nombre d\'instructions à ordonnancer pour remplir les paquets VLIW. L\'inconvénient principal est une augmentation significative de la taille du code.

- **Pipeline Logiciel (*Software Pipelining*)** : Plutôt que de dérouler la boucle, le pipeline logiciel la réorganise de manière à ce que des instructions de différentes itérations s\'exécutent en parallèle. Le corps de la boucle est transformé en un noyau (*kernel*) où des parties de plusieurs itérations consécutives sont superposées, créant un pipeline au niveau logiciel qui maintient les unités fonctionnelles constamment alimentées.

- **Ordonnancement par Traces (*Trace Scheduling*)** : Cette technique se concentre sur les chemins d\'exécution les plus probables à travers le code, appelés \"traces\". Le compilateur traite une trace entière comme un unique et très grand bloc de base, déplaçant librement les instructions le long de la trace pour optimiser le remplissage des paquets VLIW. Pour garantir la correction du programme lorsque l\'exécution dévie de la trace prédite (par exemple, via un branchement non pris), le compilateur insère du **code de compensation** sur les bords \"hors-trace\" pour annuler ou corriger les effets des mouvements d\'instructions spéculatifs.

### 4.3. Comparaison Fondamentale : VLIW vs. Superscalaire

Les architectures VLIW et superscalaires représentent deux philosophies opposées pour atteindre le même objectif : un IPC supérieur à 1. Leurs différences illustrent un compromis fondamental en architecture des ordinateurs entre la complexité matérielle et la complexité logicielle.

Le **talon d\'Achille** de l\'approche VLIW est sa faible **compatibilité binaire**. Un programme compilé pour une machine VLIW avec une certaine configuration d\'unités fonctionnelles et de latences ne s\'exécutera pas de manière optimale, voire pas correctement du tout, sur une autre machine VLIW avec une configuration différente. Chaque changement matériel significatif nécessite une recompilation de l\'ensemble de l\'écosystème logiciel pour en tirer parti. En revanche, la nature dynamique des processeurs superscalaires leur permet d\'exécuter du code binaire hérité sur de nouvelles générations de matériel, en trouvant dynamiquement le parallélisme disponible. Cette flexibilité a été un avantage décisif sur le marché des ordinateurs personnels et des serveurs, où la préservation des investissements logiciels est primordiale.

Cependant, la simplicité matérielle du VLIW lui confère des avantages en termes de **consommation d\'énergie** et de coût de conception. C\'est pourquoi l\'approche VLIW a trouvé un succès durable dans des marchés de niche tels que les processeurs de signal numérique (DSP) et les systèmes embarqués, où le matériel et le logiciel sont souvent co-développés pour une application spécifique et où la compatibilité binaire à long terme est une préoccupation secondaire par rapport à la performance par watt.

Le tableau suivant synthétise les compromis entre ces deux approches.

  ------------------------------------------------------------------------------ ----------------------------------------------------------- --------------------------------------------------------------
  Caractéristique                                                                Architecture Superscalaire                                  Architecture VLIW

  **Ordonnancement**                                                             Dynamique, par le matériel au moment de l\'exécution    Statique, par le compilateur avant l\'exécution 

  **Détection des dépendances**                                                  Matérielle, logique complexe (O(N2))                    Logicielle, par le compilateur 

  **Complexité matérielle**                                                      Très élevée (logique d\'émission, renommage, ROB)       Faible (contrôle direct des unités fonctionnelles) 

  **Complexité du compilateur**                                                  Modérée (optimisations standards)                           Très élevée (analyse globale, connaissance du matériel) 

  **Taille du code**                                                             Compacte                                                    Large (NOPs pour le remplissage, déroulage de boucle) 

  **Compatibilité binaire**                                                      Élevée (le matériel s\'adapte au code)                      Faible (le code est lié au matériel) 

  **Consommation énergétique**                                                   Élevée                                                      Faible 

  **Domaines d\'application**                                                    Processeurs d\'usage général (PC, serveurs)                 Systèmes embarqués, DSP, accélérateurs 

  *Tableau 1 : Comparaison Détaillée des Architectures Superscalaires et VLIW*                                                               
  ------------------------------------------------------------------------------ ----------------------------------------------------------- --------------------------------------------------------------

En définitive, le choix entre superscalaire et VLIW n\'est pas une question de supériorité technique absolue, mais un arbitrage dicté par les contraintes de l\'écosystème. Le VLIW incarne une co-conception matériel/logiciel idéale mais rigide, tandis que le superscalaire offre une solution plus pragmatique et évolutive pour un marché où la compatibilité logicielle est un impératif non négociable.

## Section 5. Exploiter le Parallélisme des Données : Le Modèle SIMD

Jusqu\'à présent, nous avons exploré des techniques visant à exécuter différentes instructions en parallèle (ILP). Cependant, une autre forme de parallélisme, souvent plus abondante et plus structurée, existe dans de nombreuses applications : le parallélisme au niveau des données (DLP). Cette section introduit le DLP et son implémentation matérielle la plus courante, l\'architecture SIMD, qui est devenue un pilier de la performance des processeurs modernes.

### 5.1. Introduction au Parallélisme au Niveau des Données (DLP)

Le **parallélisme au niveau des données (Data-Level Parallelism - DLP)** consiste à appliquer la même opération à de multiples éléments de données indépendants simultanément. Il est fondamentalement différent de l\'ILP :

- L\'**ILP** exécute des instructions *différentes* en parallèle (par exemple, une addition, un chargement mémoire et une multiplication).

- Le **DLP** exécute la *même* instruction sur des données *différentes* en parallèle (par exemple, additionner simultanément quatre paires de nombres).

Le DLP est particulièrement répandu dans les domaines du calcul scientifique, du traitement d\'images et de vidéos, de l\'infographie 3D et de l\'intelligence artificielle. Des tâches comme ajuster la luminosité de chaque pixel d\'une image, additionner deux vecteurs en algèbre linéaire ou appliquer une fonction d\'activation à une couche de neurones sont des exemples parfaits de DLP.

### 5.2. Le Principe SIMD (Single Instruction, Multiple Data)

L\'architecture **SIMD (Single Instruction, Multiple Data)** est l\'implémentation matérielle directe du DLP. Son principe repose sur deux éléments clés :

1.  **Registres Vectoriels (ou larges)** : Les processeurs SIMD disposent de registres beaucoup plus larges que les registres scalaires traditionnels (par exemple, 128, 256 ou 512 bits). Ces registres sont traités comme des conteneurs (ou vecteurs) pouvant stocker plusieurs éléments de données plus petits, appelés \"lanes\". Par exemple, un registre de 128 bits peut contenir :

    - Quatre nombres à virgule flottante simple précision (32 bits chacun).

    - Deux nombres à virgule flottante double précision (64 bits chacun).

    - Huit entiers courts (16 bits chacun).

    - Seize octets ou caractères (8 bits chacun).

2.  **Instructions Vectorielles** : Le jeu d\'instructions est enrichi avec des instructions qui opèrent sur l\'intégralité de ces registres vectoriels en une seule fois. Par exemple, une instruction d\'addition vectorielle (VADDPS sur x86 AVX) prend deux registres de 256 bits, chacun contenant huit flottants, et produit un troisième registre de 256 bits contenant les huit sommes correspondantes, le tout en une seule opération. Théoriquement, cela permet d\'obtenir une accélération de 8x pour cette opération par rapport à une exécution scalaire qui nécessiterait huit additions distinctes.

### 5.3. Évolution des Extensions SIMD

L\'intégration d\'unités SIMD a été un moteur de performance crucial pour les processeurs d\'usage général, leur permettant de gérer efficacement les charges de travail multimédia et scientifiques de plus en plus exigeantes.

- **Architecture x86** : L\'évolution sur la plateforme x86 illustre une tendance claire à l\'élargissement des vecteurs et à l\'enrichissement des fonctionnalités.

  - **MMX (MultiMedia eXtensions)** : La première incursion d\'Intel, utilisant des registres 64 bits (réutilisant les registres FPU, ce qui causait des pénalités de performance).

  - **SSE (Streaming SIMD Extensions)** : Introduit avec le Pentium III, SSE a apporté des registres dédiés de 128 bits (XMM0-XMM7) et un jeu d\'instructions pour les flottants simple précision, marquant le véritable début du SIMD moderne sur x86.

  - **AVX (Advanced Vector Extensions)** : Une avancée majeure, élargissant les registres à 256 bits (YMM0-YMM15) et introduisant un format d\'instruction à trois opérandes non destructif (c ← a + b), ce qui simplifie la programmation et améliore l\'efficacité.

  - **AVX-512** : Pousse la largeur des vecteurs à 512 bits (registres ZMM) et ajoute des fonctionnalités sophistiquées comme les masques d\'opération (pour appliquer une opération uniquement à certains éléments du vecteur) et des instructions spécialisées pour des domaines comme la cryptographie ou l\'IA.

- **Architecture ARM** : L\'écosystème ARM a également adopté le SIMD de manière extensive.

  - **NEON** : L\'extension SIMD avancée d\'ARM, fournissant des registres de 128 bits et un jeu d\'instructions riche, similaire en capacité à SSE. NEON est un standard sur la plupart des processeurs d\'application Cortex-A.

  - **SVE (Scalable Vector Extension)** : Une approche innovante introduite avec ARMv9. Au lieu de définir une taille de vecteur fixe (128, 256 bits, etc.), SVE permet aux implémentations matérielles de choisir une taille de vecteur (de 128 à 2048 bits, par multiples de 128). Le code écrit pour SVE est agnostique à la taille du vecteur, ce qui signifie qu\'un même binaire peut s\'exécuter efficacement sur différentes implémentations matérielles sans recompilation, améliorant considérablement la portabilité du code vectoriel.

### 5.4. Vectorisation : Le Rôle du Compilateur et du Programmeur

Exploiter la puissance du SIMD nécessite de transformer le code, un processus appelé **vectorisation**. Cela peut se faire de deux manières principales :

- **Vectorisation Automatique** : Les compilateurs modernes sont de plus en plus capables de détecter des boucles dans le code source qui peuvent être transformées en instructions SIMD. En analysant les dépendances de données et les motifs d\'accès mémoire, le compilateur peut automatiquement remplacer une boucle scalaire par une séquence d\'instructions vectorielles équivalentes. Cette approche est la plus simple pour le développeur mais peut ne pas toujours réussir à vectoriser du code complexe.

- **Intrinsèques SIMD** : Pour un contrôle maximal, les programmeurs peuvent utiliser des **intrinsèques**. Ce sont des fonctions spéciales (généralement définies dans des en-têtes comme \<xmmintrin.h\> pour SSE) qui correspondent directement à une instruction SIMD spécifique. Par exemple, appeler la fonction\
  \_mm_add_ps(a, b) en C++ se traduira directement par l\'instruction assembleur addps. L\'utilisation d\'intrinsèques donne un contrôle total sur la génération de code mais requiert une connaissance approfondie de l\'architecture SIMD sous-jacente.

L\'ascension du SIMD est révélatrice d\'une réalité architecturale : pour de nombreuses charges de travail critiques, le parallélisme de données est bien plus abondant, structuré et facile à exploiter que l\'ILP complexe et erratique que l\'on trouve dans le code de contrôle généraliste. Alors que l\'extraction d\'ILP se heurte rapidement à des dépendances de données et de contrôle, limitant le parallélisme pratique à quelques instructions par cycle , le DLP dans les applications multimédia ou scientifiques est souvent massif et explicite. L\'architecture SIMD offre un moyen matériel direct et très efficace (en termes de surface de silicium et de puissance par opération) pour exploiter ce type de parallélisme. C\'est pourquoi la largeur des unités SIMD a continué de croître de manière spectaculaire, bien après que l\'élargissement des machines superscalaires ait atteint un plateau.

## Section 6. Les Murs de la Performance : Limites de l\'ILP et Avènement du Multi-cœur

Pendant près de deux décennies, la quête de l\'ILP a été le principal moteur de l\'innovation dans la conception des microprocesseurs. Des techniques de plus en plus sophistiquées, de l\'exécution superscalaire à l\'exécution dans le désordre et à la spéculation agressive, ont été développées pour extraire chaque once de parallélisme d\'un flux d\'instructions séquentiel. Cependant, vers le milieu des années 2000, cette trajectoire a commencé à s\'essouffler, se heurtant à des limites à la fois logiques et physiques. Ce point d\'inflexion a forcé un changement de paradigme fondamental dans l\'industrie, abandonnant la course à l\'ILP au profit du parallélisme multi-cœur.

### 6.1. Les Rendements Décroissants de l\'ILP

La première limite rencontrée fut celle des **rendements décroissants**. L\'ajout de complexité matérielle pour extraire plus d\'ILP a commencé à produire des gains de performance de plus en plus faibles. L\'augmentation du degré d\'un processeur superscalaire, par exemple, se heurte à la complexité quadratique de la logique de détection des dépendances et au goulot d\'étranglement du banc de registres. Doubler le nombre d\'unités d\'exécution ne double pas la performance réelle, loin de là.

La raison fondamentale de ce phénomène est que le **parallélisme intrinsèque** dans les programmes séquentiels d\'usage général est limité. Des études approfondies, comme celles menées par David Wall, ont montré que même avec un processeur idéalisé doté de ressources infinies (renommage de registres parfait, prédiction de branchement parfaite, etc.), l\'ILP moyen pour des programmes entiers typiques se situe souvent entre 2 et 5. Les dépendances de données vraies (RAW) et les branchements imprévisibles créent des barrières séquentielles inhérentes que même le matériel le plus sophistiqué ne peut franchir. La complexité matérielle nécessaire pour s\'approcher de cette limite théorique devient alors exponentielle pour des gains de plus en plus marginaux.

### 6.2. Le \"Mur de la Puissance\" (Power Wall)

La limite la plus infranchissable fut cependant d\'ordre physique. Comme mentionné en introduction, la fin de la **mise à l\'échelle de Dennard** a signifié que, bien que la loi de Moore continue de fournir plus de transistors à chaque génération, il n\'était plus possible de les faire fonctionner plus vite sans augmenter drastiquement la densité de puissance (watts par millimètre carré). L\'augmentation de la fréquence d\'horloge et l\'ajout de circuits complexes pour l\'ILP (comme les grands ROBs et les larges fenêtres d\'instruction) ont conduit à une dissipation thermique qui a atteint les limites des technologies de refroidissement à air conventionnelles.

Ce \"mur de la puissance\" a rendu intenable le modèle de conception qui prévalait jusqu\'alors. Il n\'était plus viable de consacrer un budget de transistors et de puissance toujours croissant à la construction d\'un seul cœur monolithique et ultra-complexe. La consommation énergétique est devenue une contrainte de premier ordre, non seulement pour les appareils mobiles fonctionnant sur batterie, mais aussi pour les serveurs dans les centres de données, où les coûts d\'électricité et de refroidissement sont devenus une part majeure du coût total de possession.

### 6.3. La Transition vers le Parallélisme au Niveau des Threads (TLP)

Face à l\'impossibilité de continuer à améliorer de manière significative la performance d\'un seul cœur, l\'industrie s\'est tournée vers la seule voie restante pour utiliser le budget de transistors toujours croissant offert par la loi de Moore : la **réplication**. Au lieu de construire un seul cœur plus complexe, les concepteurs ont commencé à intégrer plusieurs cœurs de processeur, souvent plus simples et plus économes en énergie, sur une seule puce de silicium. C\'est la naissance des processeurs

**multi-cœurs**.

Cette transition a marqué un passage du parallélisme au niveau de l\'instruction (ILP) au **parallélisme au niveau du thread (TLP)**. Le TLP consiste à exécuter plusieurs flux d\'instructions (threads ou processus) complètement indépendants en parallèle, chacun sur son propre cœur. Alors que l\'ILP exploite le parallélisme à grain fin

*à l\'intérieur* d\'un seul thread, le TLP exploite le parallélisme à gros grain *entre* plusieurs threads.

Ce changement de paradigme a eu une conséquence profonde et durable sur l\'ensemble de l\'industrie informatique. Il a déplacé le fardeau de la parallélisation du matériel vers le logiciel. Pendant l\'ère de l\'ILP, les développeurs de logiciels bénéficiaient d\'une \"aubaine\" (

*free lunch*) : leurs programmes séquentiels devenaient plus rapides à chaque nouvelle génération de processeurs, sans qu\'ils aient à modifier une seule ligne de code. Le matériel se chargeait de manière transparente de trouver et d\'exploiter l\'ILP.

Avec l\'avènement du multi-cœur, cette ère a pris fin. Pour exploiter la puissance d\'un processeur à quatre, huit ou plusieurs cœurs, un logiciel doit être explicitement conçu pour être parallèle, c\'est-à-dire décomposé en plusieurs threads pouvant s\'exécuter simultanément. La programmation concurrente et parallèle, autrefois un domaine de niche réservé au calcul haute performance, est devenue une compétence essentielle pour tous les développeurs de logiciels. La transition de l\'ILP vers le TLP n\'a donc pas été un choix motivé par la recherche d\'une forme de parallélisme intrinsèquement \"meilleure\", mais une nécessité imposée par les lois de la physique et de l\'économie des semi-conducteurs. C\'était une solution de contournement au mur de la puissance, qui a fondamentalement et irréversiblement changé la nature du développement logiciel.

## Section 7. Nouveaux Défis : Cohérence et Consistance en Environnement Multi-cœur

La transition vers les architectures multi-cœurs a résolu le problème du mur de la puissance en permettant d\'augmenter la performance globale sans augmenter la fréquence d\'un cœur unique. Cependant, elle a introduit une nouvelle classe de défis, bien plus complexes, liés à la gestion de la mémoire partagée. Lorsque plusieurs cœurs indépendants opèrent sur un même espace d\'adressage mémoire, deux problèmes fondamentaux émergent : la **cohérence des caches** et la **consistance de la mémoire**.

### 7.1. Le Problème de la Cohérence des Caches

Pour minimiser la latence d\'accès à la mémoire, chaque cœur d\'un processeur multi-cœurs est typiquement équipé de son propre cache privé, au moins pour le premier niveau (L1), et souvent pour le deuxième (L2). Ces caches stockent des copies locales des données récemment utilisées.

Le problème de la cohérence des caches apparaît lorsque plusieurs cœurs mettent en cache la même ligne de mémoire. Supposons que le Cœur A et le Cœur B ont tous deux une copie d\'une variable X dans leur cache L1. Si le Cœur A modifie la valeur de X, sa copie locale est mise à jour. Cependant, la copie dans le cache du Cœur B devient alors obsolète (*stale*). Si le Cœur B lit X depuis son cache, il lira une ancienne valeur, ce qui viole la sémantique du programme. Le système est dit **incohérent**.

La **cohérence des caches** est l\'ensemble des mécanismes, implémentés au niveau *matériel*, qui garantissent que tous les cœurs ont une vue unifiée et correcte de l\'état de chaque ligne de mémoire. Le système doit s\'assurer que toute lecture d\'une adresse mémoire retourne la valeur de la plus récente écriture à cette même adresse, quel que soit le cœur qui a effectué l\'écriture ou la lecture.

### 7.2. Le Protocole MESI : Une Solution par Espionnage (***Snooping***)

Il existe deux grandes familles de protocoles de cohérence : les protocoles basés sur un répertoire (*directory-based*), utilisés dans les grands systèmes à plusieurs processeurs, et les protocoles par espionnage (*snooping-based*), dominants dans les processeurs multi-cœurs.

Les protocoles par espionnage reposent sur un bus de communication partagé reliant les cœurs. Chaque contrôleur de cache \"espionne\" (*snoops*) en permanence les transactions sur ce bus. Lorsqu\'un cœur effectue une opération de lecture ou d\'écriture qui affecte une ligne de cache partagée, il diffuse cette transaction sur le bus. Les autres caches détectent cette transaction et mettent à jour l\'état de leurs propres copies en conséquence.

Le protocole **MESI** est l\'un des protocoles de cohérence par espionnage les plus répandus. Il doit son nom aux quatre états dans lesquels peut se trouver une ligne de cache  :

- **Modified (M)** : La ligne de cache est présente *uniquement* dans ce cache, elle a été modifiée (*dirty*), et la copie en mémoire principale est donc obsolète. Ce cache est le \"propriétaire\" de la ligne et est responsable de fournir la donnée à jour si un autre cœur la demande, et de l\'écrire en mémoire avant d\'être évincée.

- **Exclusive (E)** : La ligne de cache est présente *uniquement* dans ce cache, et elle est \"propre\" (*clean*), c\'est-à-dire identique à la mémoire principale. L\'avantage de cet état est que le cœur peut écrire sur cette ligne sans avoir à notifier les autres cœurs (puisqu\'il est le seul à la posséder), passant simplement à l\'état Modified.

- **Shared (S)** : La ligne de cache est potentiellement présente dans plusieurs caches, et elle est \"propre\". Les cœurs peuvent lire cette donnée librement. Cependant, si un cœur souhaite écrire sur une ligne partagée, il doit d\'abord envoyer une transaction d\'invalidation sur le bus pour forcer tous les autres caches à passer leur copie à l\'état Invalid.

- **Invalid (I)** : La ligne de cache ne contient pas de donnée valide. Toute tentative de lecture ou d\'écriture sur cette ligne provoquera un défaut de cache (*cache miss*).

Le comportement du protocole est défini par une machine à états qui régit les transitions en fonction des opérations initiées par le processeur local (PrRd : lecture, PrWr : écriture) et des transactions observées sur le bus (BusRd : lecture par un autre, BusRdX : lecture pour écriture par un autre, etc.). Le tableau suivant résume ces transitions.

  ----------------------------------------------------------------------------- ------------------------- ------------------------ ------------------------------------------------- --------------------
  État Actuel                                                                   Opération du Processeur   Transaction sur le Bus   Action                                            Nouvel État

  **Invalid (I)**                                                               PrRd                      BusRd                    Lecture depuis la mémoire/autre cache             Shared / Exclusive

                                                                                PrWr                      BusRdX                   Lecture pour écriture                             Modified

  **Shared (S)**                                                                PrRd                      \-                       Lecture depuis le cache                           Shared

                                                                                PrWr                      BusUpgr (Invalidate)     Écriture dans le cache                            Modified

                                                                                \-                        BusRd                    \-                                                Shared

                                                                                \-                        BusUpgr / BusRdX         Invalider la ligne                                Invalid

  **Exclusive (E)**                                                             PrRd                      \-                       Lecture depuis le cache                           Exclusive

                                                                                PrWr                      \-                       Écriture dans le cache (pas de bus)               Modified

                                                                                \-                        BusRd                    Fournir la donnée sur le bus                      Shared

                                                                                \-                        BusRdX                   Fournir la donnée et invalider                    Invalid

  **Modified (M)**                                                              PrRd / PrWr               \-                       Lecture/Écriture dans le cache                    Modified

                                                                                \-                        BusRd                    Écrire en mémoire, fournir la donnée              Shared

                                                                                \-                        BusRdX                   Écrire en mémoire, fournir la donnée, invalider   Invalid

  *Tableau 2 : Matrice simplifiée des États et Transitions du Protocole MESI*                                                                                                        
  ----------------------------------------------------------------------------- ------------------------- ------------------------ ------------------------------------------------- --------------------

### 7.3. Modèles de Consistance Mémoire : Le Contrat avec le Programmeur

La cohérence des caches garantit que tous les cœurs s\'accordent sur la valeur d\'une *unique* adresse mémoire. Cependant, elle ne dit rien sur l\'ordre dans lequel les écritures sur des adresses *différentes* deviennent visibles aux autres cœurs. C\'est le rôle du **modèle de consistance mémoire**. Il s\'agit d\'un contrat entre l\'architecture matérielle et le programmeur qui spécifie les ordres autorisés pour les opérations de lecture et d\'écriture.

- **Consistance Séquentielle (Sequential Consistency - SC)** : C\'est le modèle le plus strict et le plus intuitif pour le programmeur. Il garantit que \"le résultat de toute exécution est le même que si les opérations de tous les processeurs étaient exécutées dans un certain ordre séquentiel, et que les opérations de chaque processeur apparaissent dans cette séquence dans l\'ordre spécifié par son programme\" (Lamport, 1979). En d\'autres termes, il existe un unique ordre global de toutes les opérations mémoire, et cet ordre respecte l\'ordre du programme de chaque cœur. Bien que simple à comprendre, la consistance séquentielle est très coûteuse en performance, car elle interdit la plupart des optimisations de réordonnancement des accès mémoire que les processeurs OoO et les compilateurs effectuent pour masquer la latence.

- **Modèles de Consistance Relâchée (Relaxed Consistency)** : Pour cette raison, la quasi-totalité des architectures modernes implémentent des modèles de consistance relâchée. Ces modèles permettent au matériel et au compilateur de réordonner les accès mémoire pour optimiser la performance. Par exemple, une écriture peut être mise en tampon et devenir visible aux autres cœurs bien après qu\'une lecture ultérieure dans le même thread ait été effectuée. Cela peut conduire à des résultats contre-intuitifs si le programmeur n\'en est pas conscient.

- **Barrières Mémoire (Memory Fences)** : Pour permettre au programmeur d\'écrire des programmes parallèles corrects sur des architectures à consistance relâchée, le matériel fournit des instructions spéciales appelées **barrières mémoire** ou **clôtures mémoire** (*memory fences*). Une barrière mémoire est une instruction qui impose une contrainte d\'ordre. Par exemple, une barrière complète garantit que toutes les opérations mémoire (lectures et écritures) qui la précèdent dans le code sont terminées et visibles par tous les autres cœurs avant que toute opération mémoire qui la suit ne soit autorisée à commencer. Des instructions comme\
  mfence sur x86 ou DMB (Data Memory Barrier) sur ARM permettent aux programmeurs de forcer l\'ordre uniquement là où c\'est sémantiquement crucial, par exemple lors de l\'implémentation de verrous (*locks*) ou d\'autres primitives de synchronisation.

L\'avènement du TLP et des architectures multi-cœurs a donc transformé la nature du défi de la performance. Il ne s\'agit plus seulement d\'un problème matériel interne au processeur (comment extraire plus d\'ILP?), mais d\'un problème de co-conception matériel-logiciel complexe. Le modèle de consistance mémoire est le contrat qui régit cette interaction. Il donne au matériel la liberté d\'optimiser agressivement par défaut, tout en fournissant au programmeur les outils (barrières, opérations atomiques) pour imposer l\'ordre lorsque la correction du programme l\'exige. La programmation parallèle performante et correcte sur les systèmes modernes requiert donc une compréhension profonde de ce contrat.

## Conclusion : Synthèse de l\'Évolution Architecturale

Le parcours à travers les architectures visant à exploiter le parallélisme au niveau de l\'instruction révèle une histoire fascinante d\'innovation, de complexité croissante et, finalement, de confrontation avec les limites fondamentales de la physique. La quête de performance, initialement propulsée par l\'augmentation de la fréquence d\'horloge, a trouvé dans l\'ILP une nouvelle dimension d\'optimisation.

Le **pipeline** a été le premier pas, transformant l\'exécution séquentielle en une chaîne de montage temporelle, augmentant le débit au-delà de ce que la latence d\'une seule instruction laissait présager. Les **architectures superscalaires** ont ensuite multiplié ces chaînes de montage, introduisant un parallélisme spatial et franchissant la barrière symbolique d\'une instruction par cycle. Pour surmonter les blocages inhérents à l\'ordre strict du programme, les processeurs ont évolué vers des mécanismes d\'**exécution dans le désordre (OoO)** d\'une complexité extraordinaire. Des concepts comme l\'algorithme de Tomasulo et le Reorder Buffer ont permis de dissocier l\'exécution microarchitecturale de l\'état architectural, masquant les latences mémoire et gérant la spéculation de manière transparente pour le programmeur. Parallèlement, l\'approche **VLIW** a exploré une voie alternative, déplaçant cette complexité de l\'ordonnancement vers le compilateur, une solution élégante mais rigide qui a trouvé sa place dans des marchés spécialisés. Enfin, le **parallélisme de données (SIMD)** a offert une voie d\'accélération très efficace pour des charges de travail spécifiques, en appliquant une seule instruction à de multiples données.

Cependant, cette course effrénée à l\'ILP a fini par se heurter à un double mur : celui des **rendements décroissants**, où chaque gain de performance exigeait une augmentation exponentielle de la complexité, et surtout, le **mur de la puissance**, qui a rendu la dissipation thermique des cœurs monolithiques et ultra-complexes ingérable. Cette contrainte physique a forcé un pivotement stratégique majeur de l\'industrie : l\'abandon de la focalisation sur un ILP toujours plus grand au profit du **parallélisme au niveau du thread (TLP)** et de l\'avènement des **processeurs multi-cœurs**.

Cette transition, bien que nécessaire, n\'a pas été une solution miracle. Elle a résolu le problème de la dissipation de puissance mais a ouvert une boîte de Pandore de nouveaux défis. La gestion de la mémoire partagée dans un environnement multi-cœur a introduit les problèmes complexes de **cohérence des caches** et de **consistance de la mémoire**. La responsabilité de la performance a été transférée du matériel, qui gérait l\'ILP de manière implicite, au logiciel, qui doit désormais être explicitement parallélisé pour tirer parti des multiples cœurs.

Aujourd\'hui, l\'évolution continue. Les architectures modernes sont de plus en plus hétérogènes, combinant des cœurs haute performance (P-cores) et des cœurs à haute efficacité énergétique (E-cores) , et intégrant une myriade d\'accélérateurs spécialisés (GPU pour le graphisme, NPU pour l\'IA, etc.). Le parallélisme est désormais exploité à tous les niveaux, de l\'ILP et du SIMD au sein de chaque cœur, au TLP entre les cœurs, jusqu\'au parallélisme à l\'échelle du système. La quête de performance se poursuit, non plus sur un front unique, mais à travers une co-optimisation complexe de l\'architecture, du logiciel et des algorithmes, dans un paysage défini par les contraintes de l\'énergie et de la communication des données.

