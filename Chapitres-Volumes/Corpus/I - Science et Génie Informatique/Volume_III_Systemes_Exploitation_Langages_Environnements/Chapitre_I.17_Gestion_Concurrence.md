# Chapitre I.17 : Systèmes d\'Exploitation - Gestion de la Concurrence

## Introduction

La concurrence est l\'une des pierres angulaires des systèmes d\'exploitation modernes. Elle représente la capacité d\'un système à gérer l\'exécution de multiples tâches --- qu\'il s\'agisse de processus ou de fils d\'exécution (*threads*) --- de manière quasi simultanée. Sur les architectures monoprocesseurs, cette simultanéité est une illusion savamment orchestrée par le système d\'exploitation, qui commute très rapidement le processeur entre les différentes tâches, créant ce que l\'on nomme le **pseudo-parallélisme**. Sur les architectures multiprocesseurs ou multicœurs, devenues la norme aujourd\'hui, cette illusion se mue en réalité : plusieurs tâches peuvent s\'exécuter en **parallélisme réel**, chacune sur un cœur de processeur distinct.

Cette capacité à exécuter des tâches concurrentes est fondamentale pour l\'efficacité, la réactivité et l\'utilisation optimale des ressources matérielles. Elle permet à un serveur de traiter les requêtes de milliers de clients simultanément, à une interface utilisateur de rester fluide pendant qu\'une tâche de fond complexe s\'exécute, et à un ordinateur personnel de jongler entre un navigateur web, un traitement de texte et un lecteur de musique sans heurt apparent. La concurrence est donc une source immense de puissance et de flexibilité.

Cependant, cette puissance s\'accompagne d\'une complexité redoutable. Lorsque des processus concurrents doivent collaborer ou partager des ressources communes --- une variable en mémoire, une base de données, un fichier sur le disque ou un périphérique matériel ---, le risque d\'interférence mutuelle devient omniprésent. L\'ordonnancement précis des instructions de ces processus, qui dépend de décisions de l\'ordonnanceur du système, de la charge du système et d\'interruptions imprévisibles, peut mener à des résultats incorrects et non déterministes. Ces erreurs, connues sous le nom de **conditions de course** (*race conditions*), comptent parmi les bogues les plus insidieux et les plus difficiles à diagnostiquer en génie logiciel, car ils sont souvent non reproductibles et ne se manifestent que dans des conditions temporelles très spécifiques.

La problématique centrale de ce chapitre est donc la suivante : comment concevoir des mécanismes robustes et efficaces pour maîtriser la concurrence? Comment pouvons-nous permettre aux processus de partager des données et de se coordonner tout en garantissant l\'intégrité de ces données et la prévisibilité du comportement du système?

Pour répondre à cette question, nous adopterons une approche ascendante, en construisant notre compréhension couche par couche. Nous commencerons par disséquer le problème fondamental au cœur de la concurrence : la **section critique** et les conditions de course. Nous verrons ensuite que toute solution fiable doit s\'ancrer dans le matériel, par le biais d\'**instructions atomiques** fournies par le processeur. Sur ces fondations matérielles, nous bâtirons des outils de synchronisation logicielle de plus en plus sophistiqués et abstraits : les **sémaphores**, les **mutex**, et enfin les **moniteurs**, qui offrent des garanties de sécurité de plus haut niveau. Enfin, nous nous confronterons à la pathologie la plus grave et la plus redoutée des systèmes concurrents : l\'**interblocage** (*deadlock*), une situation où un groupe de processus se bloque mutuellement dans une attente sans fin. Nous étudierons les conditions qui mènent à cette paralysie, ainsi que les stratégies pour la prévenir, l\'éviter ou la détecter et s\'en remettre.

Ce chapitre vous fournira les outils théoriques et algorithmiques indispensables pour comprendre, analyser et concevoir des systèmes concurrents corrects, robustes et performants, une compétence essentielle pour tout ingénieur ou architecte de systèmes complexes.

## 17.1 Le Problème de la Section Critique et Conditions de course

L\'étude de la gestion de la concurrence débute inévitablement par la compréhension de son problème le plus fondamental : la protection des ressources partagées contre les accès simultanés non contrôlés. C\'est dans ce contexte qu\'émergent les notions de ressource critique, de condition de course et de section critique, qui forment le vocabulaire de base de la synchronisation.

### Introduction à la Concurrence et à la Notion de Ressource Critique

Comme nous l\'avons vu, un système d\'exploitation moderne exécute de nombreux processus ou fils d\'exécution de manière concurrente. Ces entités d\'exécution ne sont pas toujours indépendantes ; elles ont souvent besoin de communiquer ou de partager des informations. Ce partage se fait par l\'intermédiaire de **ressources partagées**, qui peuvent être de nature variée : une zone de mémoire commune, une variable globale, une table dans une base de données, un fichier, ou même un périphérique matériel comme une imprimante.

Le partage de ressources est un mécanisme de coopération puissant, mais il est également la source de tous les dangers de la concurrence. Certaines ressources, par leur nature, peuvent être accédées simultanément par plusieurs processus sans risque. Un fichier ouvert en lecture seule, par exemple, peut être lu par de multiples processus en même temps sans que cela ne pose de problème de cohérence. Cependant, de nombreuses ressources ne tolèrent pas un tel accès simultané, surtout si au moins un des accès est une modification (écriture). Une variable servant de compteur, le solde d\'un compte bancaire, ou une file d\'attente de tâches sont des exemples de ressources qui perdraient leur intégrité si plusieurs processus tentaient de les modifier en même temps. De telles ressources sont qualifiées de **ressources critiques**. Une ressource critique est donc une ressource qui ne peut être utilisée ou modifiée que par un seul processus à la fois pour garantir sa cohérence. La nécessité de gérer l\'accès à ces ressources critiques est le point de départ du problème de la synchronisation.

### Illustration de la Condition de Course (Race Condition)

Pour comprendre concrètement le danger des accès concurrents à une ressource critique, considérons l\'exemple le plus simple et le plus canonique : l\'incrémentation d\'un compteur partagé. Imaginons une variable globale compteur initialisée à 0, partagée entre deux fils d\'exécution, T1 et T2. Chacun de ces fils doit exécuter l\'opération apparemment simple compteur++. Intuitivement, si T1 et T2 exécutent cette opération une fois chacun, la valeur finale de compteur devrait être 2.

Le problème est que l\'instruction de haut niveau compteur++ n\'est pas **atomique**. Une opération est dite atomique si elle s\'exécute comme un tout indivisible, sans qu\'aucune autre opération ne puisse s\'intercaler pendant son exécution. Au niveau du langage machine, compteur++ est décomposée en une séquence de trois instructions distinctes  :

1.  LOAD R, compteur : Charger la valeur actuelle de la variable compteur depuis la mémoire vers un registre du processeur (noté R).

2.  INC R : Incrémenter la valeur contenue dans le registre R.

3.  STORE R, compteur : Écrire la nouvelle valeur du registre R en mémoire, à l\'emplacement de la variable compteur.

Puisque les deux fils T1 et T2 s\'exécutent de manière concurrente, l\'ordonnanceur du système d\'exploitation peut interrompre l\'un des fils à n\'importe quel moment pour donner la main à l\'autre. Cette commutation de contexte peut survenir entre n\'importe lesquelles de ces trois instructions machine. Considérons le scénario d\'entrelacement suivant :

  ---------- --------------------------- -------------------- ---------------- ---------------- --------------------
  Temps      Action de T1                Action de T2         Registre de T1   Registre de T2   Valeur de compteur

  t1         LOAD R1, compteur                                0                \-               0

  t2         INC R1                                           1                \-               0

  t3         *Commutation de contexte*   LOAD R2, compteur    1                0                0

  t4                                     INC R2               1                1                0

  t5                                     STORE R2, compteur   1                1                1

  t6         *Commutation de contexte*                        1                1                1

  t7         STORE R1, compteur                               1                1                1
  ---------- --------------------------- -------------------- ---------------- ---------------- --------------------

Dans ce scénario, T1 charge la valeur 0 et la porte à 1 dans son registre. Avant qu\'il n\'ait pu sauvegarder ce résultat en mémoire, il est interrompu. T2 prend le relais, charge la valeur de compteur qui est toujours 0, l\'incrémente à 1 et la sauvegarde. La valeur de compteur en mémoire est maintenant 1. Finalement, T1 reprend son exécution et exécute sa dernière instruction, STORE, écrasant la valeur 1 en mémoire avec la valeur 1 qu\'il avait dans son propre registre. Le résultat final est 1, alors que deux incrémentations ont eu lieu. L\'incrémentation effectuée par T2 a été perdue.

Cette situation est une **condition de course** (ou *race condition*). Elle est formellement définie comme une situation où le résultat d\'une opération dépend de l\'ordonnancement temporel, souvent imprévisible et non déterministe, de l\'exécution des instructions de plusieurs processus ou fils concurrents. Le terme \"course\" illustre bien l\'idée que le résultat dépend de quel fil \"gagne la course\" pour accéder et modifier la ressource partagée en dernier. Des analogies du monde réel illustrent ce concept, comme la réservation de la dernière place dans un avion où deux agents de voyage y accèdent simultanément : le système peut vendre la même place deux fois si les opérations ne sont pas correctement synchronisées.

### Formalisation : Le Problème de la Section Critique

Pour résoudre le problème des conditions de course, il faut identifier et protéger les portions de code qui manipulent les ressources partagées. Cette portion de code est appelée la **section critique**. L\'objectif est de concevoir un protocole qui garantit qu\'à tout moment, au plus un seul processus peut se trouver dans sa section critique.

La structure générale d\'un processus qui accède à une ressource partagée peut donc être décomposée comme suit :

> Extrait de code

procedure Processus_i():\
boucle infinie:\
\<protocole_entree\>\
\<section_critique\>\
\<protocole_sortie\>\
\<section_non_critique\> // Reste du code

Le défi consiste à concevoir le code du protocole_entree et du protocole_sortie. Pour qu\'une solution à ce problème soit considérée comme correcte et robuste, elle doit impérativement satisfaire trois conditions fondamentales  :

1.  **Exclusion Mutuelle (Mutual Exclusion)** : C\'est la condition la plus fondamentale. Si un processus P_i est en train d\'exécuter sa section critique, alors aucun autre processus P_j ne peut exécuter la sienne. Cette propriété garantit l\'intégrité de la ressource partagée en empêchant les accès conflictuels. C\'est une propriété de **sûreté** (*safety*), car elle assure que rien de \"mauvais\" (une corruption de données) ne se produira.

2.  **Progrès (Progress)** : Si aucun processus n\'est actuellement dans sa section critique et qu\'un ou plusieurs processus souhaitent y entrer, alors la décision de savoir lequel y entrera le prochain doit être prise en un temps fini. De plus, seuls les processus qui ne sont pas dans leur section non critique (c\'est-à-dire ceux qui attendent d\'entrer ou qui sont en train de décider) peuvent participer à cette décision. Cette condition empêche une situation où la ressource serait libre, des processus voudraient l\'utiliser, mais aucun ne pourrait y accéder. C\'est une propriété de **vivacité** (*liveness*), car elle garantit que quelque chose de \"bon\" (l\'entrée dans la section critique) finira par se produire. Une violation de la condition de progrès peut mener à un interblocage, où des processus s\'attendent mutuellement sans qu\'aucun ne puisse avancer.

3.  **Attente Bornée (Bounded Waiting)** : Une fois qu\'un processus a formulé une demande pour entrer dans sa section critique, il doit y avoir une limite (une borne) sur le nombre de fois que les autres processus sont autorisés à y entrer avant que la demande du premier processus ne soit satisfaite. Sans cette condition, un processus pourrait être constamment \"dépassé\" par d\'autres et attendre indéfiniment. Cette situation est appelée la **famine** (*starvation*). L\'attente bornée est donc une propriété d\'**équité** (*fairness*), une forme plus forte de vivacité qui garantit non seulement que le système progresse, mais que chaque processus individuel a une chance équitable de progresser.

Ces trois conditions ne sont pas indépendantes mais forment une hiérarchie de robustesse. Une solution qui garantit l\'exclusion mutuelle résout le problème de corruption des données. En y ajoutant la garantie de progrès, on s\'assure que le système ne se fige pas. Enfin, en y ajoutant l\'attente bornée, on garantit que le système est équitable envers tous les processus. Toute solution algorithmique que nous étudierons dans ce chapitre sera évaluée à l\'aune de ces trois critères stricts.

## 17.2 Synchronisation Matérielle (Instructions atomiques)

Après avoir défini le problème de la section critique et les propriétés requises pour une solution correcte, la question naturelle qui se pose est : comment implémenter les protocoles d\'entrée et de sortie? Les premières tentatives historiques reposaient sur des algorithmes purement logiciels (comme l\'algorithme de Peterson). Cependant, ces solutions se sont avérées complexes et, plus important encore, peu fiables sur les architectures matérielles modernes. Les processeurs et les compilateurs effectuent de nombreuses optimisations, notamment en réordonnant les instructions de lecture et d\'écriture en mémoire (*memory reordering*), ce qui peut briser les hypothèses subtiles sur lesquelles ces algorithmes reposent.

Pour construire des mécanismes de synchronisation robustes, il est nécessaire de s\'appuyer sur une garantie fondamentale fournie directement par le matériel : l\'**atomicité**.

### La Nécessité d\'un Support Matériel

Comme l\'a montré notre exemple compteur++, le problème fondamental vient de la divisibilité des opérations qui devraient être indivisibles. Pour construire des primitives de synchronisation fiables, nous avons besoin d\'opérations qui s\'exécutent en une seule étape, sans interruption possible. C\'est ce qu\'on appelle une **opération atomique**.

Une approche simple pour garantir l\'atomicité sur un système monoprocesseur serait de désactiver les interruptions avant d\'entrer dans la section critique et de les réactiver en sortant. Si les interruptions sont désactivées, l\'ordonnanceur ne peut pas être invoqué (par exemple, par l\'interruption de l\'horloge), et donc aucune commutation de contexte ne peut se produire. Le processus en cours a alors un contrôle exclusif du processeur. Cependant, cette approche présente des inconvénients majeurs :

- Elle est extrêmement dangereuse si elle est exposée aux programmes utilisateurs. Un programme qui oublierait de réactiver les interruptions paralyserait tout le système.

- Elle est inefficace, car elle bloque toutes les activités du système, y compris les opérations d\'entrée/sortie qui dépendent des interruptions.

- Plus fondamentalement, elle **ne fonctionne pas sur les systèmes multiprocesseurs**. Désactiver les interruptions sur un cœur de processeur n\'empêche pas un autre processus de s\'exécuter sur un autre cœur et d\'accéder à la même ressource mémoire.

Puisque les systèmes modernes sont presque tous multiprocesseurs, une solution plus générale est indispensable. Cette solution est fournie par les fabricants de processeurs sous la forme d\'**instructions machine spéciales** qui sont garanties comme étant atomiques, même en présence de plusieurs cœurs accédant à la même mémoire. Ces instructions sont les briques de base sur lesquelles tous les mécanismes de synchronisation de plus haut niveau sont construits.

### Analyse Détaillée des Instructions Atomiques Clés

Il existe plusieurs types d\'instructions atomiques. Nous allons nous concentrer sur les deux plus importantes et les plus répandues : TestAndSet et CompareAndSwap.

#### TestAndSet (TAS)

L\'instruction TestAndSet (parfois abrégée en TAS) est l\'une des primitives atomiques les plus simples. Son fonctionnement est le suivant : elle lit la valeur actuelle d\'un bit ou d\'un octet en mémoire, retourne cette ancienne valeur, et écrit une nouvelle valeur (généralement 1 ou vrai) à cet emplacement. Le point crucial est que cette séquence de lecture, retour et écriture est effectuée en une seule opération matérielle indivisible. Le bus mémoire est verrouillé pendant l\'exécution de l\'instruction, empêchant tout autre processeur d\'accéder à cet emplacement mémoire.

La sémantique de l\'instruction peut être décrite par le pseudo-code suivant :

> Extrait de code

fonction TestAndSet(booleen \*cible) -\> booleen:\
// Cette fonction est exécutée de manière atomique par le matériel.\
// Aucune interruption ou accès concurrent à \'cible\' n\'est possible\
// entre la lecture et l\'écriture.\
booleen valeur_precedente = \*cible\
\*cible = VRAI\
retourner valeur_precedente

L\'idée est d\'utiliser une variable partagée, que nous appellerons verrou, initialisée à FAUX. Pour entrer dans la section critique, un processus appelle TestAndSet(&verrou).

- Si TestAndSet retourne FAUX, cela signifie que le verrou était libre. L\'instruction l\'a simultanément positionné à VRAI, et le processus peut donc entrer dans sa section critique.

- Si TestAndSet retourne VRAI, cela signifie que le verrou était déjà pris par un autre processus. Le processus doit alors attendre.

#### CompareAndSwap (CAS)

L\'instruction CompareAndSwap (CAS) est une primitive atomique plus puissante et plus flexible que TestAndSet. Elle prend trois arguments : une adresse mémoire (ptr), une valeur attendue (attendu), et une nouvelle valeur (nouveau). L\'instruction effectue atomiquement la logique suivante : elle compare la valeur actuellement en mémoire à l\'adresse ptr avec la valeur attendu.

- Si elles sont identiques, cela signifie que la valeur n\'a pas été modifiée depuis la dernière lecture. L\'instruction met alors à jour la mémoire avec la nouvelle valeur et signale son succès (par exemple, en retournant vrai).

- Si elles sont différentes, cela signifie qu\'un autre processus a modifié la valeur entre-temps. L\'instruction ne fait rien (la mémoire reste inchangée) et signale son échec (par exemple, en retournant faux).

La sémantique de l\'instruction peut être décrite par le pseudo-code suivant :

> Extrait de code

fonction CompareAndSwap(entier \*ptr, entier attendu, entier nouveau) -\> booleen:\
// Cette fonction est exécutée de manière atomique par le matériel.\
si \*ptr == attendu:\
\*ptr = nouveau\
retourner VRAI\
sinon:\
retourner FAUX

La puissance de CAS réside dans sa capacité à effectuer une mise à jour conditionnelle. Alors que TAS modifie toujours la mémoire, CAS ne le fait que si l\'état du système est celui que le processus attendait. Cette capacité est le fondement de nombreux algorithmes de synchronisation avancés, dits \"non bloquants\" (*lock-free*), qui permettent de construire des structures de données concurrentes (comme des listes chaînées ou des files) sans utiliser de verrous traditionnels.

Cette puissance accrue n\'est pas sans subtilités. L\'un des problèmes classiques associés à CAS est le **problème ABA**. Imaginez un processus qui lit une valeur A, effectue un calcul, puis tente d\'utiliser CAS pour la remplacer par C, en s\'attendant à ce que la valeur soit toujours A. Il est possible qu\'entre-temps, un autre processus ait changé la valeur de A à B, puis l\'ait ramenée à A. Le CAS du premier processus réussira, car la valeur est bien A, mais l\'état sous-jacent du système a changé d\'une manière que le processus n\'a pas détectée, ce qui peut conduire à des corruptions de données subtiles (par exemple, si la valeur est un pointeur qui a été libéré puis réalloué). Des solutions existent, comme l\'utilisation d\'un compteur de version associé à la valeur (une technique appelée \"double-CAS\" ou \"DCAS\").

Le passage de TAS à CAS représente une augmentation significative de la puissance expressive des primitives matérielles. TAS ne peut que signaler un état binaire (verrouillé/déverrouillé). CAS, en revanche, permet une transition d\'état conditionnelle. Cette différence est fondamentale : il a été démontré que CAS peut résoudre le **problème du consensus** pour un nombre arbitraire de processus, alors que TAS ne le peut pas. Le problème du consensus consiste pour un groupe de processus à se mettre d\'accord sur une valeur unique, et sa solvabilité est une mesure de la puissance d\'une primitive de synchronisation. Cela fait de CAS une brique de base fondamentalement plus puissante pour la programmation concurrente moderne.

  --------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------- ------------------------------------------------- ---------------------------------------------------------------------------------------- -----------------------------
  Instruction                                                           Sémantique de l\'opération                                                                                             Valeur de retour typique                          Problèmes et limitations                                                                 Puissance (N° de consensus)

  **Test-And-Set (TAS)**                                                Lit atomiquement une valeur, la remplace toujours par VRAI, et retourne l\'ancienne valeur.                            L\'ancienne valeur (VRAI ou FAUX).                Simple, mais moins flexible. Ne permet pas les mises à jour conditionnelles complexes.   2

  **Compare-And-Swap (CAS)**                                            Compare atomiquement une valeur avec une valeur attendue. Si elles sont égales, la remplace par une nouvelle valeur.   Un booléen indiquant le succès de l\'opération.   Plus puissant, mais susceptible au problème ABA dans certains scénarios.                 ∞ (infini)

  *Table 17.1 : Comparaison des Instructions Atomiques Fondamentales*
  --------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------- ------------------------------------------------- ---------------------------------------------------------------------------------------- -----------------------------

### Implémentation d\'un Verrou par Attente Active (Spinlock)

Avec une instruction atomique comme TestAndSet, nous pouvons maintenant construire notre premier mécanisme de synchronisation : le **verrou par attente active**, ou **spinlock**. Le principe est simple : un processus qui souhaite acquérir le verrou entre dans une boucle où il teste continuellement le verrou à l\'aide de l\'instruction atomique jusqu\'à ce qu\'il réussisse à l\'acquérir. Il \"tourne sur place\" (*spins*) en attendant, d\'où le nom de spinlock.

Voici une implémentation simple utilisant TestAndSet :

> Extrait de code

// Variable partagée globale, initialisée pour indiquer que le verrou est libre.\
booleen verrou_global = FAUX;\
\
// Protocole d\'entrée pour la section critique\
procedure verrouiller():\
// Boucle tant que TestAndSet retourne VRAI, ce qui signifie que le verrou était déjà pris.\
// L\'appel à TestAndSet tente d\'acquérir le verrou à chaque itération.\
tant que TestAndSet(&verrou_global) == VRAI:\
// Attente active : ne rien faire, juste boucler.\
passer;\
// Quand TestAndSet retourne FAUX, le verrou a été acquis avec succès.\
// Le processus peut maintenant entrer dans sa section critique.\
\
// Protocole de sortie de la section critique\
procedure deverrouiller():\
// Libérer le verrou en le remettant simplement à FAUX.\
// Cette opération n\'a pas besoin d\'être atomique car seul le détenteur\
// du verrou est censé appeler cette procédure.\
verrou_global = FAUX;

Cette implémentation garantit l\'**exclusion mutuelle**. Grâce à l\'atomicité de TestAndSet, il est impossible que deux processus voient le verrou comme étant libre (FAUX) au même moment et entrent tous les deux dans la section critique. Le premier qui exécute TestAndSet verra FAUX et mettra le verrou à VRAI, tandis que le second verra VRAI et sera forcé d\'attendre. La condition de **progrès** est également satisfaite : si le verrou est libre, le premier processus qui appelle TestAndSet l\'obtiendra sans délai. Cependant, cette implémentation simple ne garantit pas l\'**attente bornée**. Il n\'y a aucune garantie sur l\'ordre dans lequel les processus en attente acquerront le verrou ; un processus pourrait théoriquement être malchanceux et attendre indéfiniment, menant à la famine.

#### Analyse des Avantages et Inconvénients de l\'Attente Active

L\'attente active, bien que simple à implémenter, est une stratégie à double tranchant.

**Avantages :**

- **Faible latence en cas de faible contention :** Si la section critique est très courte et que la probabilité que le verrou soit déjà pris est faible, un spinlock est extrêmement efficace. Le processus acquiert le verrou en quelques cycles d\'horloge, sans le coût élevé d\'un changement de contexte (qui implique de sauvegarder l\'état du processus, d\'invoquer l\'ordonnanceur, et de restaurer l\'état d\'un autre processus). C\'est pourquoi les spinlocks sont souvent utilisés à l\'intérieur du noyau du système d\'exploitation pour protéger des structures de données pendant des durées très brèves.

**Inconvénients :**

- **Gaspillage de ressources CPU :** Le principal inconvénient est le gaspillage de temps processeur. Un processus qui \"spinne\" occupe un cœur de processeur à 100 % de sa capacité sans effectuer de travail productif. C\'est particulièrement désastreux sur un système\
  **monoprocesseur** : si un processus T1 entre dans une boucle d\'attente active, il ne rendra jamais le processeur. Le processus T2, qui détient le verrou et qui est le seul à pouvoir le libérer, ne pourra jamais être ordonnancé pour le faire. Le système est alors dans une forme de livelock. Les spinlocks ne sont donc viables que sur les systèmes multiprocesseurs.

- **Problèmes de cohérence de cache :** Sur un système multiprocesseur, l\'attente active pose un autre problème, plus subtil. Chaque cœur de processeur possède son propre cache mémoire. Lorsqu\'un processus exécute TestAndSet, qui est une opération d\'écriture, cela force une invalidation des copies de cette ligne de cache dans tous les autres cœurs, conformément aux protocoles de cohérence de cache (comme MESI). Si de nombreux processus tournent sur le même verrou, ils génèrent un trafic incessant sur le bus mémoire, car chaque tentative d\'acquisition invalide les caches des autres. Ce phénomène, parfois appelé \"thundering herd problem\", peut ralentir considérablement l\'ensemble du système, y compris les processus qui ne sont pas impliqués dans la contention du verrou.

Pour atténuer ce dernier problème, une optimisation courante est le **Test-and-Test-and-Set (TTAS)**. L\'idée est de ne pas appeler l\'instruction atomique coûteuse (TestAndSet) à chaque itération de la boucle. À la place, le processus boucle d\'abord sur une simple lecture de la variable de verrou. Une lecture est une opération \"légère\" qui peut être satisfaite par le cache local sans générer de trafic sur le bus. Ce n\'est que lorsque la lecture indique que le verrou est potentiellement libre (FAUX) que le processus tente de l\'acquérir avec le TestAndSet.

> Extrait de code

procedure verrouiller_TTAS():\
boucle infinie:\
// Phase 1: Boucler sur une simple lecture (Test)\
tant que verrou_global == VRAI:\
passer; // Attendre que le verrou semble libre\
\
// Phase 2: Tenter d\'acquérir le verrou (Test-and-Set)\
si TestAndSet(&verrou_global) == FAUX:\
retourner; // Verrou acquis avec succès\
// Sinon, le verrou a été pris par un autre processus entre-temps.\
// Retourner à la boucle de lecture.

Cette optimisation réduit considérablement la contention sur le bus mémoire pendant la phase d\'attente, améliorant ainsi la scalabilité des spinlocks. Cependant, elle ne résout pas le problème fondamental du gaspillage de cycles CPU. Pour les situations où le temps d\'attente peut être long, une approche radicalement différente est nécessaire : l\'attente passive.

## 17.3 Outils de Synchronisation Logicielle

Les spinlocks, basés sur des instructions matérielles atomiques, fournissent une solution fonctionnelle au problème de la section critique, mais au prix d\'une attente active qui gaspille les ressources du processeur. Cette approche n\'est justifiable que si la durée d\'attente prévue est extrêmement courte, typiquement inférieure au temps nécessaire pour effectuer deux changements de contexte (un pour endormir le processus, un autre pour le réveiller). Pour la grande majorité des applications, où la durée de la section critique ou la contention peuvent être non négligeables, il est impératif de disposer de mécanismes de synchronisation qui permettent à un processus en attente de céder le processeur.

C\'est le rôle des outils de synchronisation logicielle, qui implémentent une stratégie d\'**attente passive** ou de **blocage**. Au lieu de tourner en boucle, un processus qui ne peut pas procéder est placé par le système d\'exploitation dans un état \"bloqué\" ou \"endormi\". Il est retiré de la file des processus prêts à être exécutés et ne consomme plus de cycles CPU. Il ne sera réintégré à la file des processus prêts (c\'est-à-dire \"réveillé\") que lorsqu\'un autre processus signalera que la condition d\'attente est levée. Cette transition de l\'attente active à l\'attente passive est une étape conceptuelle majeure, qui nous mène des primitives de bas niveau aux abstractions de synchronisation de haut niveau. Nous allons maintenant explorer les trois outils les plus importants : les sémaphores, les mutex et les moniteurs.

### 17.3.1 Sémaphores

Le sémaphore, inventé par le pionnier de l\'informatique Edsger W. Dijkstra à la fin des années 1960, est l\'une des premières et des plus fondamentales abstractions pour la synchronisation. Il s\'agit d\'un outil remarquablement puissant et polyvalent, capable de résoudre non seulement le problème de l\'exclusion mutuelle, mais aussi des problèmes de coordination plus complexes.

#### Définition et Sémantique du Sémaphore de Dijkstra

Un sémaphore est essentiellement un compteur entier protégé, accessible uniquement à travers deux opérations atomiques et indivisibles : wait() et signal(). Historiquement, Dijkstra a nommé ces opérations

P() (du néerlandais *proberen*, \"essayer de diminuer\") et V() (de *verhogen*, \"augmenter\"). Dans la littérature moderne, les termes

wait/signal, acquire/release, ou down/up sont plus courants.

Un sémaphore est une structure de données qui contient deux éléments :

1.  Une **valeur entière** (le compteur).

2.  Une **file d\'attente** pour les processus qui sont bloqués sur ce sémaphore.

Les deux opérations sont définies comme suit :

- **wait(S)** :

  1.  Décrémente la valeur du sémaphore S (S.valeur\--).

  2.  Si la nouvelle valeur est inférieure à zéro, le processus qui a appelé wait est bloqué. Il est ajouté à la file d\'attente du sémaphore (S.file) et son état est changé en \"bloqué\". L\'ordonnanceur du système choisit alors un autre processus à exécuter.

  3.  Si la nouvelle valeur est supérieure ou égale à zéro, le processus continue son exécution sans interruption.

- **signal(S)** :

  1.  Incrémente la valeur du sémaphore S (S.valeur++).

  2.  Si la valeur après incrémentation est inférieure ou égale à zéro, cela signifie qu\'un ou plusieurs processus sont en attente dans la file du sémaphore. L\'opération signal en choisit un (souvent selon une politique FIFO), le retire de la file d\'attente et le réveille (c\'est-à-dire, change son état en \"prêt\" et le place dans la file des processus prêts à être exécutés).

  3.  Si la valeur est positive, cela signifie qu\'aucun processus n\'attendait, et l\'opération se termine simplement.

Il est crucial de comprendre que ces deux opérations doivent être **atomiques**. Le système d\'exploitation garantit que le test de la valeur, sa modification, et la décision de bloquer ou de réveiller un processus se font comme une seule étape indivisible. En interne, le noyau peut implémenter cette atomicité en utilisant un spinlock ou en masquant les interruptions pendant la très courte durée de l\'opération sur le sémaphore.

Le pseudo-code suivant illustre l\'implémentation conceptuelle de ces opérations :

> Extrait de code

structure semaphore:\
entier valeur\
file_de_processus file\
\
// Initialise le sémaphore avec une valeur initiale\
procedure initialiser_semaphore(semaphore S, entier valeur_initiale):\
S.valeur = valeur_initiale\
S.file = file_vide\
\
// Opération P (ou wait)\
procedure wait(semaphore S):\
// Début de la section critique interne au sémaphore\
S.valeur = S.valeur - 1\
si S.valeur \< 0:\
// Le processus doit attendre\
ajouter ce processus à S.file\
bloquer() // Appel système pour suspendre le processus\
// Fin de la section critique interne\
\
// Opération V (ou signal)\
procedure signal(semaphore S):\
// Début de la section critique interne au sémaphore\
S.valeur = S.valeur + 1\
si S.valeur \<= 0:\
// Un processus attendait, il faut le réveiller\
retirer un processus P de S.file\
reveiller(P) // Appel système pour rendre le processus P \"prêt\"\
// Fin de la section critique interne

Dans cette implémentation, la valeur du sémaphore, lorsqu\'elle est négative, a une signification précise : sa valeur absolue correspond au nombre de processus actuellement bloqués dans sa file d\'attente.

#### Types de Sémaphores

On distingue deux principaux types de sémaphores en fonction du domaine de leur compteur :

- **Sémaphore de comptage (Counting Semaphore)** : La valeur du sémaphore peut prendre n\'importe quelle valeur entière non négative (dans sa définition classique, bien que l\'implémentation interne puisse la rendre négative). Ce type de sémaphore est idéal pour gérer l\'accès à un ensemble de **R** ressources identiques. Le sémaphore est initialisé à **R**. Chaque fois qu\'un processus veut utiliser une ressource, il exécute wait(), décrémentant le nombre de ressources disponibles. Lorsqu\'il a terminé, il exécute signal(), libérant la ressource. Si la valeur du sémaphore atteint 0, tous les processus suivants qui appellent wait() seront bloqués jusqu\'à ce qu\'une ressource soit libérée.

- **Sémaphore binaire (Binary Semaphore)** : C\'est un cas particulier où la valeur du sémaphore ne peut être que 0 ou 1. Il est initialisé à 1. Un sémaphore binaire fonctionne comme un verrou (lock) et est principalement utilisé pour garantir l\'**exclusion mutuelle**. L\'opération wait() acquiert le verrou (si disponible) et signal() le libère. En raison de cette fonctionnalité, il est souvent appelé **mutex lock**, bien qu\'il existe une distinction sémantique importante avec les objets mutex que nous verrons plus tard.

#### Résolution des Problèmes Classiques de Synchronisation

La véritable puissance des sémaphores se révèle dans leur capacité à modéliser des scénarios de coordination complexes. Étudions leur application à trois problèmes canoniques de la synchronisation.

##### Le Problème du Producteur-Consommateur (Tampon Limité)

Ce problème, également connu sous le nom de *Bounded-Buffer Problem*, est un modèle pour de nombreuses situations réelles, comme les pipelines de traitement de données, les spools d\'impression, ou les files de requêtes dans un serveur web.

- **Énoncé du problème** : Un ou plusieurs processus **producteurs** génèrent des données (des \"items\") et les placent dans un **tampon partagé** de taille finie N. Un ou plusieurs processus **consommateurs** retirent ces items du tampon pour les traiter. Les contraintes de synchronisation sont triples  :

  1.  Un producteur doit attendre si le tampon est plein.

  2.  Un consommateur doit attendre si le tampon est vide.

  3.  L\'accès au tampon (pour ajouter ou retirer un item) est une section critique et doit être mutuellement exclusif pour éviter les conditions de course sur les pointeurs ou les données du tampon.

- **Solution avec Sémaphores** : La solution classique et élégante utilise trois sémaphores  :

  - mutex : Un sémaphore binaire initialisé à 1. Il garantit l\'exclusion mutuelle pour l\'accès physique au tampon.

  - empty : Un sémaphore de comptage initialisé à N (la taille du tampon). Il compte le nombre d\'emplacements **vides** disponibles. Les producteurs attendront sur ce sémaphore.

  - full : Un sémaphore de comptage initialisé à 0. Il compte le nombre d\'emplacements **pleins** (contenant des items). Les consommateurs attendront sur ce sémaphore.

Le pseudo-code pour le producteur et le consommateur est le suivant :

> Extrait de code

// Initialisation globale\
#define N 10 // Taille du tampon\
item tampon\[N\];\
semaphore mutex = 1;\
semaphore empty = N;\
semaphore full = 0;\
\
// Code du processus Producteur\
procedure Producteur():\
boucle infinie:\
item = produire_item(); // Produire un nouvel item\
\
wait(empty); // Attendre qu\'un emplacement soit vide. Décrémente le compteur de places vides.\
wait(mutex); // Acquérir le verrou pour accéder au tampon.\
\
// \-\-- Section Critique \-\--\
ajouter_item_au_tampon(item);\
// \-\-- Fin de la Section Critique \-\--\
\
signal(mutex); // Libérer le verrou du tampon.\
signal(full); // Signaler qu\'un nouvel emplacement est plein. Incrémente le compteur de places pleines.\
\
// Code du processus Consommateur\
procedure Consommateur():\
boucle infinie:\
wait(full); // Attendre qu\'un emplacement soit plein. Décrémente le compteur de places pleines.\
wait(mutex); // Acquérir le verrou pour accéder au tampon.\
\
// \-\-- Section Critique \-\--\
item = retirer_item_du_tampon();\
// \-\-- Fin de la Section Critique \-\--\
\
signal(mutex); // Libérer le verrou du tampon.\
signal(empty); // Signaler qu\'un nouvel emplacement est vide. Incrémente le compteur de places vides.\
\
consommer_item(item); // Consommer l\'item retiré

**Analyse de la solution** :

- Le sémaphore empty bloque le producteur lorsque le tampon est plein (empty vaut 0). Chaque fois qu\'un consommateur retire un item, il fait un signal(empty), permettant potentiellement à un producteur bloqué de continuer.

- Le sémaphore full bloque le consommateur lorsque le tampon est vide (full vaut 0). Chaque fois qu\'un producteur ajoute un item, il fait un signal(full), réveillant un consommateur en attente.

- Le sémaphore mutex assure que les opérations sur le tampon lui-même (comme la mise à jour des pointeurs d\'entrée/sortie) sont atomiques.

- L\'ordre des opérations wait est crucial. Un producteur doit d\'abord appeler wait(empty) puis wait(mutex). S\'il inversait l\'ordre et que le tampon était plein, il prendrait le mutex puis se bloquerait sur empty. Le consommateur, qui est le seul à pouvoir vider le tampon, serait alors incapable d\'acquérir le mutex pour le faire, créant un **interblocage**.

##### Le Problème des Lecteurs-Rédacteurs

Ce problème modélise l\'accès à une ressource partagée, comme une base de données, où les accès peuvent être de deux types : lecture ou écriture.

- **Énoncé du problème** : Plusieurs processus concurrents veulent accéder à une ressource.

  - Les **lecteurs** ne font que lire la ressource et ne la modifient pas.

  - Les **rédacteurs** peuvent lire et modifier la ressource.

  - Les contraintes sont les suivantes : plusieurs lecteurs peuvent accéder à la ressource simultanément, mais un rédacteur doit avoir un accès exclusif. C\'est-à-dire que si un rédacteur écrit, aucun autre processus (ni lecteur, ni rédacteur) ne peut accéder à la ressource.

Il existe plusieurs variantes de ce problème, principalement en fonction de la politique de priorité : doit-on donner la priorité aux lecteurs ou aux rédacteurs lorsqu\'ils sont en compétition? Nous allons présenter ici la première variante, qui donne la **priorité aux lecteurs**.

- **Solution avec priorité aux lecteurs** : Cette solution utilise une variable partagée readcount pour compter le nombre de lecteurs actuellement actifs, et deux sémaphores binaires  :

  - mutex : Initialisé à 1, il protège la variable readcount pour garantir que sa mise à jour est une section critique.

  - wrt (pour *write*) : Initialisé à 1, il est utilisé par les rédacteurs pour garantir l\'exclusion mutuelle entre eux. Il est également utilisé par le *premier* lecteur qui entre pour bloquer tout rédacteur potentiel, et par le *dernier* lecteur qui sort pour permettre à un rédacteur en attente de procéder.

> Extrait de code

// Initialisation globale\
semaphore mutex = 1;\
semaphore wrt = 1;\
entier readcount = 0;\
\
// Code du processus Rédacteur\
procedure Rédacteur():\
boucle infinie:\
wait(wrt); // Demander l\'accès exclusif en écriture\
\
// \-\-- Section Critique (Écriture) \-\--\
effectuer_ecriture();\
// \-\-- Fin de la Section Critique \-\--\
\
signal(wrt); // Libérer l\'accès exclusif\
\
// Code du processus Lecteur\
procedure Lecteur():\
boucle infinie:\
wait(mutex); // Verrouiller pour modifier readcount\
readcount = readcount + 1;\
si readcount == 1:\
// Si je suis le premier lecteur, je dois bloquer les rédacteurs\
wait(wrt);\
signal(mutex); // Libérer le verrou sur readcount\
\
// \-\-- Section Critique (Lecture) \-\--\
effectuer_lecture();\
// \-\-- Fin de la Section Critique \-\--\
\
wait(mutex); // Verrouiller pour modifier readcount\
readcount = readcount - 1;\
si readcount == 0:\
// Si je suis le dernier lecteur, je dois libérer les rédacteurs\
signal(wrt);\
signal(mutex); // Libérer le verrou sur readcount

**Analyse de la solution** :

- Le sémaphore wrt agit comme un verrou simple pour les rédacteurs.

- Pour les lecteurs, la logique est plus subtile. Le premier lecteur qui arrive (readcount passe de 0 à 1) est responsable de prendre le verrou wrt. Tant qu\'il y a au moins un lecteur, ce verrou restera pris, empêchant tout rédacteur d\'entrer. Les lecteurs suivants incrémentent simplement readcount mais n\'interagissent pas avec wrt.

- Le dernier lecteur à partir (readcount passe de 1 à 0) est responsable de libérer le verrou wrt, permettant ainsi à un rédacteur en attente de pouvoir enfin accéder à la ressource.

- Cette solution donne la priorité aux lecteurs. Si un flux continu de lecteurs arrive, un rédacteur pourrait attendre indéfiniment. C\'est un cas de **famine** pour les rédacteurs. D\'autres solutions plus complexes existent pour garantir l\'équité.

##### Le Problème des Philosophes à Table

Ce problème, également formulé par Dijkstra, est une métaphore classique pour illustrer le problème de l\'allocation de ressources limitées entre plusieurs processus, et met en évidence le risque d\'interblocage.

- **Énoncé du problème** : Cinq philosophes sont assis autour d\'une table ronde. Entre chaque paire de philosophes se trouve une baguette (ou une fourchette). Chaque philosophe passe son temps à alterner entre deux activités : penser et manger. Pour manger, un philosophe a besoin de saisir les deux baguettes qui se trouvent immédiatement à sa gauche et à sa droite. Un philosophe ne peut prendre qu\'une baguette à la fois. Le défi est de concevoir un protocole qui permette aux philosophes de manger sans qu\'il y ait d\'interblocage (où tous les philosophes tiennent une baguette et attendent l\'autre) ni de famine (où un philosophe ne parvient jamais à manger).

- **Solution naïve et l\'interblocage** : Une première approche, simple et intuitive, serait que chaque philosophe suive l\'algorithme suivant :

  1.  Penser.

  2.  Prendre la baguette de gauche.

  3.  Prendre la baguette de droite.

  4.  Manger.

  5.  Poser la baguette de gauche.

  6.  Poser la baguette de droite.

Si nous modélisons chaque baguette par un sémaphore binaire, le code ressemblerait à ceci :

> Extrait de code

// Initialisation globale\
#define N 5 // Nombre de philosophes\
semaphore baguette\[N\] = {1, 1, 1, 1, 1};\
\
// Code pour le philosophe i\
procedure Philosophe(i):\
boucle infinie:\
penser();\
\
wait(baguette\[i\]); // Prendre la baguette de gauche\
wait(baguette\[(i + 1) % N\]); // Prendre la baguette de droite\
\
manger();\
\
signal(baguette\[i\]); // Poser la baguette de gauche\
signal(baguette\[(i + 1) % N\]); // Poser la baguette de droite

Cette solution est défectueuse. Imaginons que les cinq philosophes décident de manger à peu près au même moment. Si l\'ordonnancement est tel que chaque philosophe exécute wait(baguette\[i\]) et prend sa baguette de gauche, puis est interrompu avant de prendre celle de droite. À ce stade, chaque philosophe tient une baguette et attend la baguette de droite, qui est tenue par son voisin de droite. C\'est une situation d\'**attente circulaire**, et donc un **interblocage**. Aucun philosophe ne pourra jamais manger.

- **Solutions viables** : Plusieurs solutions existent pour briser le cycle d\'attente et prévenir l\'interblocage.

  1.  **Limiter le nombre de philosophes** : N\'autoriser que N-1 (ici, 4) philosophes à s\'asseoir à table en même temps. Il y aura alors toujours au moins un philosophe qui pourra acquérir ses deux baguettes. On peut implémenter cela avec un sémaphore de comptage supplémentaire table initialisé à 4.

  2.  **Prise conditionnelle** : Un philosophe ne prend les baguettes que si les deux sont disponibles. Cette prise doit être une opération atomique, ce qui peut être réalisé en protégeant la prise des deux baguettes dans une section critique (avec un autre mutex).

  3.  **Solution asymétrique** : C\'est une solution simple et élégante. On brise la symétrie en faisant en sorte qu\'un des philosophes (par exemple, le dernier) prenne les baguettes dans l\'ordre inverse : d\'abord celle de droite, puis celle de gauche. Tous les autres suivent l\'ordre normal (gauche, puis droite). Cela empêche la formation d\'un cycle d\'attente.

Voici le pseudo-code pour la solution asymétrique :

> Extrait de code

// Initialisation globale\
#define N 5\
semaphore baguette\[N\] = {1, 1, 1, 1, 1};\
\
// Code pour le philosophe i\
procedure Philosophe(i):\
boucle infinie:\
penser();\
\
si i == N - 1: // Le dernier philosophe est asymétrique\
wait(baguette\[(i + 1) % N\]); // Prendre la baguette de droite d\'abord\
wait(baguette\[i\]); // Puis celle de gauche\
sinon: // Les autres philosophes\
wait(baguette\[i\]); // Prendre la baguette de gauche d\'abord\
wait(baguette\[(i + 1) % N\]); // Puis celle de droite\
\
manger();\
\
// L\'ordre de libération n\'a pas d\'importance\
signal(baguette\[i\]);\
signal(baguette\[(i + 1) % N\]);

Cette solution prévient l\'interblocage de manière efficace. Cependant, elle ne prévient pas nécessairement la famine, bien que le risque soit faible dans la pratique.

### 17.3.2 Mutex et Verrous

Bien que les sémaphores binaires puissent être utilisés pour implémenter l\'exclusion mutuelle, la pratique a montré qu\'il est bénéfique d\'avoir un outil spécifiquement conçu pour cette tâche : le **mutex**. Le terme *mutex* est une contraction de *MUTual EXclusion*.

#### Le Mutex comme Sémaphore Binaire Spécialisé

À première vue, un mutex ressemble beaucoup à un sémaphore binaire. Il fournit deux opérations de base : lock() (verrouiller) et unlock() (déverrouiller). Un fil d\'exécution appelle lock() avant d\'entrer dans une section critique. Si le mutex est déjà verrouillé par un autre fil, l\'appelant est bloqué jusqu\'à ce que le mutex soit libéré. Le fil qui quitte la section critique appelle unlock() pour libérer le mutex.

Cependant, il existe une différence sémantique fondamentale et cruciale entre un mutex et un sémaphore binaire : la **notion de propriété** (*ownership*).

- Un **mutex** est conçu pour être \"possédé\". Seul le fil d\'exécution qui a réussi à verrouiller le mutex (qui en est devenu le \"propriétaire\") est autorisé à le déverrouiller. Si un autre fil tente de déverrouiller un mutex qu\'il ne possède pas, une erreur est généralement levée.

- Un **sémaphore binaire**, en revanche, n\'a pas de notion de propriété. Il s\'agit d\'un mécanisme de signalisation plus général. N\'importe quel fil peut appeler wait() (diminuer le compteur) et n\'importe quel autre fil peut appeler signal() (augmenter le compteur).

Cette contrainte de propriété sur les mutex rend le code plus structuré, plus sûr et plus facile à raisonner. Elle empêche des erreurs de programmation où un fil libérerait par inadvertance un verrou qu\'il n\'a pas pris, ce qui pourrait briser l\'exclusion mutuelle pour un autre fil.

Le mutex est un mécanisme de **verrouillage** destiné à protéger une ressource partagée. Le sémaphore est un mécanisme de **signalisation** destiné à la coordination entre processus (par exemple, un processus signalant à un autre qu\'une tâche est terminée). Utiliser un sémaphore binaire pour l\'exclusion mutuelle est possible, mais c\'est sémantiquement moins clair et potentiellement moins sûr que d\'utiliser un mutex.

De plus, la notion de propriété permet d\'implémenter des fonctionnalités avancées sur les mutex :

- **Mutex récursifs** : Un même fil peut verrouiller plusieurs fois un mutex récursif sans se bloquer lui-même. Il doit ensuite le déverrouiller le même nombre de fois. C\'est utile dans les fonctions récursives qui ont besoin de protéger une ressource partagée.

- **Héritage de priorité** : Pour résoudre le problème de l\'inversion de priorité (où un fil de haute priorité est bloqué en attendant un mutex détenu par un fil de basse priorité, qui est lui-même préempté par des fils de priorité intermédiaire), le système peut temporairement élever la priorité du fil de basse priorité détenant le mutex à celle du fil de haute priorité en attente. Cela n\'est possible que parce que le système sait quel fil \"possède\" le mutex.

Le pseudo-code d\'une implémentation de mutex pourrait ressembler à ceci, en incluant la gestion du propriétaire :

> Extrait de code

structure mutex:\
booleen est_verrouille = FAUX\
processus proprietaire = NULL\
file_de_processus file_attente\
\
procedure lock(mutex m):\
// Opération atomique\
si m.est_verrouille:\
ajouter ce processus à m.file_attente\
bloquer()\
sinon:\
m.est_verrouille = VRAI\
m.proprietaire = processus_courant\
\
procedure unlock(mutex m):\
// Opération atomique\
si m.proprietaire!= processus_courant:\
// Erreur : tentative de déverrouillage par un non-propriétaire\
lever_exception()\
\
si m.file_attente n\'est pas vide:\
retirer un processus P de m.file_attente\
m.proprietaire = P\
reveiller(P) // Le nouveau propriétaire est réveillé\
sinon:\
m.est_verrouille = FAUX\
m.proprietaire = NULL

  --------------------------------------------------------------------- ----------------------------------------------- --------------------------------------------------------------------------------
  Caractéristique                                                       Mutex                                           Sémaphore Binaire

  **Objectif principal**                                                Verrouillage pour exclusion mutuelle            Signalisation et synchronisation

  **Notion de propriété**                                               Oui, le fil qui verrouille doit déverrouiller   Non, n\'importe quel fil peut faire wait ou signal

  **Qui peut déverrouiller/signaler?**                                  Uniquement le fil propriétaire                  N\'importe quel fil

  **Cas d\'usage typique**                                              Protéger une section critique                   Notifier qu\'un événement s\'est produit, synchroniser producteur/consommateur

  *Table 17.2 : Comparaison Sémantique : Mutex vs. Sémaphore Binaire*
  --------------------------------------------------------------------- ----------------------------------------------- --------------------------------------------------------------------------------

### 17.3.3 Moniteurs et Variables de Condition

Les sémaphores sont des outils puissants, mais leur utilisation correcte repose entièrement sur la discipline du programmeur. Une simple erreur, comme inverser un wait et un signal, oublier un wait, ou oublier un signal, peut conduire à des violations de l\'exclusion mutuelle ou à des interblocages difficiles à déboguer. La logique de synchronisation est souvent dispersée dans le code des différents processus, ce qui rend les programmes concurrents complexes, difficiles à comprendre et à maintenir.

Pour répondre à ces critiques, des abstractions de plus haut niveau ont été proposées, dont la plus influente est le **moniteur**.

#### Le Moniteur : une Abstraction de Haut Niveau

Un moniteur, proposé par C.A.R. Hoare et Per Brinch Hansen, est une construction de langage de programmation (plutôt qu\'un simple appel système) qui encapsule des données partagées, les procédures qui opèrent sur ces données, et la synchronisation nécessaire, le tout dans une seule et même entité, à la manière d\'une classe en programmation orientée objet.

La caractéristique fondamentale et la plus importante d\'un moniteur est qu\'il garantit l\'**exclusion mutuelle de manière implicite et automatique**. Le compilateur génère le code nécessaire pour s\'assurer qu\'à tout moment, **au plus un seul fil d\'exécution peut être actif à l\'intérieur du moniteur** (c\'est-à-dire en train d\'exécuter l\'une de ses procédures publiques). Le programmeur n\'a plus besoin de manipuler explicitement des verrous ou des mutex ; il lui suffit de déclarer que les données et les procédures font partie d\'un moniteur pour que l\'exclusion mutuelle soit garantie.

Un moniteur est donc composé de :

- Variables locales partagées, qui ne sont accessibles que depuis l\'intérieur du moniteur.

- Un ensemble de procédures publiques qui peuvent être appelées de l\'extérieur pour manipuler ces variables.

- Un code d\'initialisation (optionnel).

Cette approche représente un changement de paradigme majeur, passant d\'un contrôle procédural de la synchronisation (avec les sémaphores) à une encapsulation orientée objet. Le moniteur lie directement la logique de synchronisation aux données qu\'elle protège, ce qui est un principe fondamental de conception logicielle robuste.

#### Les Variables de Condition pour la Coordination

L\'exclusion mutuelle automatique est une grande avancée, mais elle ne suffit pas à résoudre tous les problèmes de synchronisation. Imaginons un consommateur qui entre dans un moniteur gérant un tampon partagé. Il acquiert le verrou du moniteur, mais constate que le tampon est vide. Que doit-il faire? Il ne peut pas simplement attendre dans une boucle active, car il détient le verrou du moniteur et empêcherait ainsi tout producteur d\'entrer pour remplir le tampon. Il doit pouvoir se mettre en attente **à l\'intérieur** du moniteur, tout en **libérant temporairement le verrou** pour permettre à d\'autres processus de progresser.

C\'est précisément le rôle des **variables de condition**. Une variable de condition n\'est pas une variable au sens traditionnel du terme (elle ne contient pas de valeur) ; c\'est une file d\'attente sur laquelle un fil peut se suspendre en attendant qu\'une certaine condition devienne vraie. Elles sont toujours associées à un moniteur et ne peuvent être utilisées qu\'à l\'intérieur de celui-ci.

Deux opérations principales sont définies sur une variable de condition c :

- **c.wait()** : Cette opération est appelée par un fil qui est déjà à l\'intérieur du moniteur. Elle provoque les trois actions suivantes, de manière **atomique** :

  1.  Le fil est ajouté à la file d\'attente de la variable de condition c.

  2.  Le verrou du moniteur est libéré.

  3.  L\'état du fil est changé en \"bloqué\".\
      L\'atomicité de ces actions est cruciale pour éviter une condition de course où un signal pourrait être envoyé entre la libération du verrou et la mise en sommeil du fil.49

- **c.signal()** : Cette opération est également appelée par un fil à l\'intérieur du moniteur. Si la file d\'attente de la variable de condition c n\'est pas vide, elle réveille **un** des fils qui y attendent. Si la file est vide, l\'opération n\'a aucun effet (le signal est \"perdu\", contrairement à un signal sur un sémaphore qui incrémente le compteur).

Il est important de noter le comportement du fil réveillé. Dans la sémantique la plus courante (dite de **Mesa**, utilisée par Java et les pthreads), le fil réveillé ne reprend pas immédiatement le contrôle du moniteur. Il est simplement déplacé de la file d\'attente de la condition vers la file des processus prêts. Il devra alors entrer en compétition avec d\'autres fils pour ré-acquérir le verrou du moniteur dès qu\'il sera disponible.

Cette sémantique a une implication très importante : entre le moment où un fil est signalé et le moment où il se réveille et ré-acquiert le verrou, un autre fil a pu entrer dans le moniteur et modifier l\'état, rendant la condition attendue à nouveau fausse. Pour cette raison, la règle d\'or de l\'utilisation des variables de condition est la suivante : **un appel à wait() doit toujours être placé à l\'intérieur d\'une boucle while qui re-teste la condition**.

> Extrait de code

// Mauvaise pratique (avec un \'if\')\
si (condition == FAUX):\
c.wait()\
\
// Bonne pratique (avec un \'while\')\
tant que (condition == FAUX):\
c.wait()

La boucle while protège contre les changements d\'état intermédiaires ainsi que contre les \"réveils fallacieux\" (*spurious wakeups*), un phénomène où un fil peut sortir de wait() sans avoir été explicitement signalé.

#### Réimplémentation du Problème Producteur-Consommateur avec un Moniteur

Pour illustrer la clarté et la sécurité apportées par les moniteurs, réimplémentons le problème du producteur-consommateur. Le moniteur encapsulera le tampon et toute la logique de synchronisation.

> Extrait de code

moniteur ProducteurConsommateur:\
// Données partagées encapsulées et privées\
item tampon\[N\]\
entier compteur = 0\
entier ptr_entree = 0, ptr_sortie = 0\
\
// Variables de condition pour la coordination\
condition nonPlein\
condition nonVide\
\
// Procédure d\'initialisation\
procedure initialiser():\
compteur = 0\
ptr_entree = 0\
ptr_sortie = 0\
\
// Procédure publique pour les producteurs\
procedure deposer(item nouvel_item):\
// Le verrou du moniteur est implicitement acquis à l\'entrée\
tant que (compteur == N):\
// Le tampon est plein, attendre le signal d\'un consommateur\
nonPlein.wait()\
\
// Le tampon n\'est pas plein, on peut ajouter l\'item\
tampon\[ptr_entree\] = nouvel_item\
ptr_entree = (ptr_entree + 1) % N\
compteur = compteur + 1\
\
// Signaler à un consommateur en attente que le tampon n\'est plus vide\
nonVide.signal()\
// Le verrou du moniteur est implicitement libéré à la sortie\
\
// Procédure publique pour les consommateurs\
procedure retirer() -\> item:\
// Le verrou du moniteur est implicitement acquis à l\'entrée\
tant que (compteur == 0):\
// Le tampon est vide, attendre le signal d\'un producteur\
nonVide.wait()\
\
// Le tampon n\'est pas vide, on peut retirer l\'item\
item item_retire = tampon\[ptr_sortie\]\
ptr_sortie = (ptr_sortie + 1) % N\
compteur = compteur - 1\
\
// Signaler à un producteur en attente que le tampon n\'est plus plein\
nonPlein.signal()\
\
// Le verrou du moniteur est implicitement libéré à la sortie\
retourner item_retire

Comparée à la solution à base de sémaphores, cette version est nettement plus claire et plus sûre. La logique de synchronisation n\'est plus dispersée. Les données partagées (tampon, compteur, etc.) sont protégées par construction. Le programmeur qui utilise ce moniteur n\'a qu\'à appeler deposer() et retirer(), sans se soucier des détails de l\'exclusion mutuelle ou de la signalisation. Le risque d\'erreur est considérablement réduit. L\'évolution des sémaphores vers les moniteurs illustre une tendance fondamentale en génie logiciel : la gestion de la complexité par l\'encapsulation et l\'abstraction.

## 17.4 Interblocages (Deadlocks)

Après avoir exploré les outils permettant de garantir une coopération correcte entre les processus, nous devons maintenant nous pencher sur la pathologie la plus grave qui puisse affecter un système concurrent : l\'**interblocage**, aussi appelé **étreinte fatale** (*deadlock*). Un interblocage est une situation de blocage permanent et irrémédiable, où un ensemble de processus s\'attendent mutuellement, chacun détenant des ressources que les autres convoitent, sans qu\'aucun ne puisse jamais progresser. C\'est l\'équivalent d\'une paralysie totale pour les processus impliqués, et si ces processus gèrent des ressources critiques du système, cela peut mener à un gel complet du système d\'exploitation.

### Définition et Analogie

Formellement, un interblocage est une situation dans laquelle un ensemble de processus est bloqué parce que chaque processus de l\'ensemble détient une ou plusieurs ressources et attend d\'en acquérir une autre, qui est détenue par un autre processus de ce même ensemble.

L\'analogie la plus parlante pour visualiser un interblocage est celle du carrefour routier. Imaginez une intersection à quatre voies, sans feux de signalisation. Quatre voitures arrivent simultanément, une de chaque direction. Chaque voiture avance jusqu\'au centre de l\'intersection, occupant ainsi une \"ressource\" (sa portion de l\'intersection). Pour continuer, chaque voiture a besoin de la portion de l\'intersection qui se trouve devant elle, mais cette portion est déjà occupée par la voiture à sa droite. La voiture du nord attend celle de l\'est, qui attend celle du sud, qui attend celle de l\'ouest, qui attend celle du nord. Un cycle d\'attente s\'est formé. Aucune voiture ne peut avancer, et aucune ne peut reculer. Elles sont en interblocage.

### 17.4.1 Conditions nécessaires

L\'étude des interblocages a été formalisée par E. G. Coffman, Jr. et ses collaborateurs, qui ont identifié quatre conditions qui doivent être réunies **simultanément** pour qu\'un interblocage puisse se produire. Si l\'une de ces quatre conditions n\'est pas remplie, un interblocage est impossible.

1.  **Exclusion Mutuelle (Mutual Exclusion)** : Au moins une ressource impliquée doit être non partageable, c\'est-à-dire qu\'elle ne peut être allouée qu\'à un seul processus à la fois. Si toutes les ressources étaient partageables, les processus n\'auraient jamais besoin d\'attendre et l\'interblocage ne pourrait pas se produire. C\'est le cas pour des ressources comme une imprimante, un processeur, ou une variable protégée par un mutex.

2.  **Possession et Attente (Hold and Wait)** : Un processus doit détenir au moins une ressource tout en attendant d\'en acquérir d\'autres qui sont actuellement détenues par d\'autres processus. Dans notre analogie du carrefour, chaque voiture \"détient\" sa position dans l\'intersection tout en \"attendant\" la position suivante.

3.  **Non-Préemption (No Preemption)** : Les ressources ne peuvent pas être retirées de force à un processus qui les détient. Une ressource ne peut être libérée que volontairement par le processus lui-même, une fois qu\'il a terminé son utilisation. On ne peut pas \"pousser\" une voiture hors de l\'intersection pour débloquer la situation.

4.  **Attente Circulaire (Circular Wait)** : Il doit exister une chaîne de processus en attente, P0​,P1​,...,Pn​, telle que P0​ attend une ressource détenue par P1​, P1​ attend une ressource détenue par P2​,\..., et Pn​ attend une ressource détenue par P0​. C\'est cette circularité qui ferme la boucle de dépendance et paralyse le système.

### Modélisation avec les Graphes d\'Allocation de Ressources

Pour analyser et détecter les interblocages de manière formelle, on utilise un outil visuel et mathématique appelé le **graphe d\'allocation de ressources** (*Resource-Allocation Graph*). Il s\'agit d\'un graphe orienté biparti composé de deux types de nœuds et de deux types d\'arcs :

- **Nœuds** :

  - Un ensemble de **nœuds Processus**, P={P1​,P2​,...,Pn​}, généralement représentés par des cercles.

  - Un ensemble de **nœuds Ressources**, R={R1​,R2​,...,Rm​}, généralement représentés par des rectangles. Si un type de ressource Rj​ a plusieurs instances (par exemple, 3 imprimantes identiques), on dessine des points à l\'intérieur du rectangle pour représenter chaque instance.

- **Arcs** :

  - Un **arc de requête** (ou arc de demande), de Pi​ vers Rj​, signifie que le processus Pi​ a demandé une instance de la ressource Rj​ et est actuellement en attente.

  - Un **arc d\'assignation** (ou arc d\'allocation), de Rj​ vers Pi​, signifie qu\'une instance de la ressource Rj​ a été allouée au processus Pi​.

L\'analyse de ce graphe permet de déterminer l\'état du système en matière d\'interblocage :

- **Si le graphe ne contient aucun cycle**, alors il n\'y a **aucun interblocage** dans le système. L\'absence de cycle est une condition suffisante pour garantir l\'absence d\'interblocage.

- **Si le graphe contient un cycle**, alors un interblocage **peut** exister. La présence d\'un cycle est une condition nécessaire à l\'interblocage.

  - Si chaque type de ressource dans le cycle n\'a qu\'**une seule instance**, alors la présence d\'un cycle **implique nécessairement un interblocage**.

  - Si les types de ressources dans le cycle ont **plusieurs instances**, un cycle n\'implique pas forcément un interblocage. Il est possible qu\'un processus en dehors du cycle libère une instance d\'une ressource convoitée, ce qui permettrait de briser la chaîne d\'attente.

Par exemple, si P1​ détient une instance de R2​ et attend R1​, tandis que P2​ détient R1​ et attend R2​, le graphe contiendra le cycle P1​→R1​→P2​→R2​→P1​. Si R1​ et R2​ n\'ont qu\'une seule instance, c\'est un interblocage. Mais si R1​ avait deux instances et que l\'une était libre, P1​ pourrait l\'obtenir, se terminer, libérer R2​, et ainsi permettre à P2​ de progresser.

### 17.4.2 Stratégies de Traitement des Interblocages

Face au problème de l\'interblocage, les concepteurs de systèmes d\'exploitation peuvent adopter plusieurs stratégies, qui se situent sur un spectre allant de la plus restrictive à la plus permissive. On peut les classer en trois grandes catégories : la prévention, l\'évitement, et la détection suivie d\'une récupération. Une quatrième approche, pragmatique mais souvent utilisée, consiste simplement à ignorer le problème, en supposant qu\'il est suffisamment rare pour ne pas justifier le coût des autres stratégies.

#### Prévention des Interblocages

La prévention consiste à concevoir le système de telle sorte que l\'une des quatre conditions de Coffman ne puisse jamais se réaliser. En invalidant une des conditions nécessaires, on garantit par construction que les interblocages sont impossibles.

- **Invalider l\'Exclusion Mutuelle** : Cette approche consiste à rendre toutes les ressources partageables. C\'est rarement possible. Des ressources comme une imprimante ou une opération d\'écriture dans un fichier sont intrinsèquement non partageables. Pour les ressources qui peuvent être virtualisées (comme un spouleur d\'impression qui met en file d\'attente les travaux), cette technique peut être appliquée, mais elle ne résout pas le problème général.

- **Invalider la Possession et Attente** : On peut imposer l\'une des deux règles suivantes :

  1.  Un processus doit demander **toutes** les ressources dont il aura besoin avant de commencer son exécution. Le système ne le démarre que si toutes peuvent être allouées simultanément.

  2.  Un processus qui détient des ressources et en demande une nouvelle doit d\'abord libérer toutes celles qu\'il possède.\
      Ces protocoles sont très inefficaces. Ils mènent à une sous-utilisation drastique des ressources (une ressource peut être allouée à un processus pendant des heures avant qu\'il n\'en ait réellement besoin) et augmentent le risque de famine pour les processus qui nécessitent de nombreuses ressources populaires.

- **Invalider la Non-Préemption** : Si un processus demande une ressource qui ne peut lui être allouée, le système pourrait lui retirer de force (*préempter*) les ressources qu\'il détient déjà. Ces ressources préemptées seraient alors disponibles pour d\'autres processus. Cette stratégie n\'est applicable qu\'à certaines ressources dont l\'état peut être facilement sauvegardé et restauré, comme le processeur ou la mémoire. Pour des ressources comme une imprimante en cours d\'utilisation, la préemption est problématique.

- **Invalider l\'Attente Circulaire** : C\'est la technique de prévention la plus viable et la plus utilisée en pratique. Elle consiste à imposer un **ordre total** sur tous les types de ressources du système (par exemple, en leur assignant un numéro unique : R1​,R2​,...,Rm​). La règle est simple : un processus peut demander des ressources dans n\'importe quel ordre, mais il ne peut demander une ressource Rj​ que s\'il ne détient aucune ressource Ri​ telle que i≥j. Autrement dit, les processus doivent demander les ressources dans un ordre numérique croissant. Cela rend la formation d\'un cycle d\'attente impossible. Par exemple, si un processus détient R3​, il peut demander R5​, mais pas R2​.

#### Évitement des Interblocages

L\'évitement est une approche moins restrictive que la prévention. Au lieu d\'interdire des situations par des règles strictes, le système d\'exploitation analyse chaque demande de ressource et ne l\'accorde que si l\'état résultant reste \"sûr\". Cette approche nécessite que le système dispose d\'informations *a priori* sur les besoins futurs des processus, notamment le nombre maximal d\'instances de chaque ressource qu\'un processus pourrait demander.

- **Concept d\'État Sûr (Safe State)** : Un état du système est dit **sûr** s\'il existe une séquence d\'exécution de tous les processus actuellement dans le système, \<P1​,P2​,...,Pn​\>, telle que pour chaque processus Pi​, les ressources dont il pourrait encore avoir besoin (son besoin maximal moins ce qu\'il a déjà) peuvent être satisfaites par les ressources actuellement disponibles plus les ressources détenues par tous les processus précédents dans la séquence (Pj​ avec j\<i). Si une telle séquence existe, le système peut garantir qu\'il peut faire terminer tous les processus sans tomber dans un interblocage, en les exécutant dans cet ordre. Un état qui n\'est pas sûr est dit\
  **non sûr**. Un état non sûr ne mène pas forcément à un interblocage, mais il en a le potentiel. L\'évitement consiste à ne jamais entrer dans un état non sûr.

- **L\'Algorithme du Banquier** : Proposé par Dijkstra, c\'est l\'algorithme classique d\'évitement d\'interblocage. L\'analogie est celle d\'un banquier qui accorde des lignes de crédit à ses clients. Le banquier sait que tous les clients n\'auront pas besoin de leur crédit maximal en même temps et gère sa trésorerie pour s\'assurer qu\'il peut toujours honorer les demandes, en maintenant la banque dans un état \"sûr\".\
  L\'algorithme utilise les structures de données suivantes (pour *n* processus et *m* types de ressources) :

  - Disponible\[m\] : Un vecteur indiquant le nombre d\'instances disponibles pour chaque type de ressource.

  - Max\[n\]\[m\] : Une matrice spécifiant la demande maximale de chaque processus pour chaque type de ressource.

  - Allocation\[n\]\[m\] : Une matrice indiquant le nombre d\'instances de chaque ressource actuellement allouées à chaque processus.

  - Besoin\[n\]\[m\] : Une matrice indiquant les ressources restantes nécessaires pour chaque processus. On a Besoin\[i\]\[j\] = Max\[i\]\[j\] - Allocation\[i\]\[j\].

> L\'algorithme de gestion d\'une requête Requête_i du processus Pi​ se déroule en plusieurs étapes :

1.  Vérifier si Requête_i \<= Besoin\[i\]. Si non, c\'est une erreur (le processus dépasse sa demande maximale).

2.  Vérifier si Requête_i \<= Disponible. Si non, Pi​ doit attendre car les ressources ne sont pas disponibles.

3.  Si les deux tests réussissent, le système **simule** l\'allocation :

    - Disponible = Disponible - Requête_i

    - Allocation\[i\] = Allocation\[i\] + Requête_i

    - Besoin\[i\] = Besoin\[i\] - Requête_i

4.  Le système exécute ensuite l\'**algorithme de vérification de l\'état sûr** sur cet état hypothétique. Si l\'état est sûr, l\'allocation est réellement effectuée. Sinon, la simulation est annulée et Pi​ est mis en attente.

Exemple Numérique Complet :Considérons un système avec 5 processus (P0​ à P4​) et 3 types de ressources (A, B, C) avec respectivement 10, 5 et 7 instances. À l\'instant t0​, l\'état du système est le suivant :

  --------------- ---------------------- --------------- ------------------
  Processus       Allocation (A, B, C)   Max (A, B, C)   Besoin (A, B, C)

  P0​              0 1 0                  7 5 3           7 4 3

  P1​              2 0 0                  3 2 2           1 2 2

  P2​              3 0 2                  9 0 2           6 0 0

  P3​              2 1 1                  2 2 2           0 1 1

  P4​              0 0 2                  4 3 3           4 3 1
  --------------- ---------------------- --------------- ------------------

Le vecteur \`Disponible\` est calculé comme \`Total - Somme(Allocation)\` = \`(10, 5, 7) - (7, 2, 5)\` = \`(3, 3, 2)\`.\
\
L\'algorithme de vérification de l\'état sûr cherche une séquence sûre :\
1. \*\*Étape 1\*\* : On cherche un processus \$P_i\$ tel que \`Besoin\[i\] \<= Disponible\`.\
\* \$P_0\$ : \`(7,4,3) \> (3,3,2)\` -\> Non\
\* \$P_1\$ : \`(1,2,2) \<= (3,3,2)\` -\> \*\*Oui\*\*. On peut choisir \$P_1\$.\
2. \*\*Étape 2\*\* : On suppose que \$P_1\$ s\'exécute et se termine. Il libère ses ressources. Nouveau \`Disponible\` = \`Disponible\` + \`Allocation\` = \`(3,3,2) + (2,0,0)\` = \`(5,3,2)\`.\
3. \*\*Étape 3\*\* : On cherche un autre processus.\
\* \$P_3\$ : \`(0,1,1) \<= (5,3,2)\` -\> \*\*Oui\*\*. On peut choisir \$P_3\$.\
4. \*\*Étape 4\*\* : \$P_3\$ se termine. Nouveau \`Disponible\` = \`(5,3,2) + (2,1,1)\` = \`(7,4,3)\`.\
5. \*\*Étape 5\*\* : On continue.\
\* \$P_0\$ : \`(7,4,3) \<= (7,4,3)\` -\> \*\*Oui\*\*. On peut choisir \$P_0\$.\
6. \*\*Étape 6\*\* : \$P_0\$ se termine. Nouveau \`Disponible\` = \`(7,4,3) + (0,1,0)\` = \`(7,5,3)\`.\
7. \*\*Étape 7\*\* :\
\* \$P_2\$ : \`(6,0,0) \<= (7,5,3)\` -\> \*\*Oui\*\*. On peut choisir \$P_2\$.\
8. \*\*Étape 8\*\* : \$P_2\$ se termine. Nouveau \`Disponible\` = \`(7,5,3) + (3,0,2)\` = \`(10,5,5)\`.\
9. \*\*Étape 9\*\* :\
\* \$P_4\$ : \`(4,3,1) \<= (10,5,5)\` -\> \*\*Oui\*\*. On peut choisir \$P_4\$.\
10. \*\*Étape 10\*\* : \$P_4\$ se termine. Nouveau \`Disponible\` = \`(10,5,5) + (0,0,2)\` = \`(10,5,7)\`.\
\
Nous avons trouvé une séquence sûre (\$\<P_1, P_3, P_0, P_2, P_4\>\$). L\'état initial était donc sûr.\
\
L\'algorithme du banquier est puissant mais a des limitations pratiques : il est rare de connaître à l\'avance les besoins maximaux d\'un processus, et le nombre de processus et de ressources peut varier dynamiquement.\[53, 65\]

#### Détection et Récupération

Cette approche est la plus \"optimiste\" : on laisse les interblocages se produire, on les détecte périodiquement, et on met en place une stratégie pour s\'en remettre.

- **Algorithme de Détection** :

  - **Pour les ressources à instance unique** : La détection se résume à chercher un cycle dans le graphe d\'allocation de ressources. Un algorithme de parcours en profondeur (DFS) peut être utilisé à cette fin. La complexité est de l\'ordre de O(n2) où n est le nombre de processus.

  - **Pour les ressources à instances multiples** : On utilise un algorithme très similaire à celui de la vérification de l\'état sûr du banquier. On ne suppose aucune demande future, on regarde simplement si, avec les ressources disponibles, il existe un ordre dans lequel les processus peuvent terminer. Les processus qui ne peuvent pas terminer à la fin de l\'algorithme sont considérés comme étant en interblocage.

- **Stratégies de Récupération** : Une fois un interblocage détecté, le système doit le briser.

  1.  **Terminaison de Processus** : C\'est la méthode la plus radicale et la plus simple.

      - **Tuer tous les processus impliqués** : Brutal mais efficace pour briser le cycle.

      - **Tuer les processus un par un** : On choisit une \"victime\" à terminer, on récupère ses ressources, et on ré-exécute l\'algorithme de détection. On répète jusqu\'à ce que le cycle soit brisé. Le choix de la victime est crucial et peut se baser sur des critères comme la priorité du processus, son temps d\'exécution, le nombre de ressources qu\'il détient, etc..

  2.  **Préemption de Ressources** : Le système peut choisir une victime et lui retirer une ressource pour la donner à un autre processus. Cela pose trois problèmes majeurs :

      - **Sélection de la victime** : Minimiser le coût de la préemption.

      - **Retour en arrière (*rollback*)** : Un processus auquel on retire une ressource ne peut généralement pas continuer son exécution comme si de rien n\'était. Il faut le ramener à un état sûr antérieur, ce qui nécessite de sauvegarder régulièrement des points de contrôle (*checkpoints*), une opération coûteuse.

      - **Famine** : Il faut s\'assurer qu\'un même processus n\'est pas constamment choisi comme victime.

Le choix entre prévention, évitement et détection est un compromis fondamental en conception de systèmes. La prévention est stricte mais peut nuire aux performances. L\'évitement est plus flexible mais repose sur des hypothèses fortes. La détection est la plus permissive mais le coût de la récupération peut être élevé. La plupart des systèmes d\'exploitation généralistes (comme Windows ou Linux) n\'implémentent pas d\'algorithmes complexes de prévention ou d\'évitement, considérant que les interblocages sont suffisamment rares et que le coût de ces mécanismes serait trop élevé en permanence. Ils laissent la responsabilité de la prévention au programmeur (par exemple, en respectant un ordre de verrouillage) et fournissent des outils pour tuer les processus bloqués si nécessaire.

  -------------------------------------------------------- ------------------------------------------------------------------------------------------------------- ----------------------------------------------------- ----------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------
  Stratégie                                                Principe de base                                                                                        Connaissances requises                                Coût d\'exécution                                                       Inconvénients

  **Prévention**                                           Invalider une des 4 conditions de Coffman pour rendre les interblocages impossibles par construction.   Aucun (règles statiques).                             Faible (les règles sont appliquées à la conception).                    Très restrictif, faible utilisation des ressources, peut imposer des contraintes de programmation.

  **Évitement**                                            Allouer les ressources dynamiquement en s\'assurant que le système reste toujours dans un état sûr.     Besoins maximaux en ressources de chaque processus.   Élevé (l\'algorithme du banquier doit être exécuté à chaque demande).   Besoins futurs rarement connus, peu pratique pour les systèmes généralistes.

  **Détection et Récupération**                            Laisser les interblocages se produire, les détecter, puis les briser.                                   État actuel des allocations et des requêtes.          Modéré (l\'algorithme de détection est exécuté périodiquement).         Latence dans la détection, coût potentiellement élevé de la récupération (perte de travail).

  *Table 17.3 : Stratégies de Gestion des Interblocages*
  -------------------------------------------------------- ------------------------------------------------------------------------------------------------------- ----------------------------------------------------- ----------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------

## Conclusion

La gestion de la concurrence est un domaine à la fois fondamental et d\'une richesse conceptuelle profonde en informatique. Ce chapitre a tracé un cheminement progressif, partant du chaos potentiel des conditions de course pour arriver aux structures de contrôle les plus sophistiquées. Nous avons vu que la simple opération compteur++ cache une complexité qui ne peut être maîtrisée que par une discipline rigoureuse, ancrée dans des garanties matérielles. Les instructions atomiques comme TestAndSet et CompareAndSwap constituent le socle indispensable sur lequel repose tout l\'édifice de la synchronisation.

À partir de ce socle, nous avons construit des abstractions logicielles. Le spinlock nous a montré la solution la plus directe mais aussi la plus inefficace en termes de ressources. L\'introduction des sémaphores de Dijkstra a marqué un tournant décisif, en substituant l\'attente active par une attente passive gérée par le système, libérant ainsi le processeur pour d\'autres tâches. Les sémaphores se sont révélés être un outil d\'une polyvalence remarquable, capable de résoudre avec élégance des problèmes de coordination aussi variés que le producteur-consommateur, les lecteurs-rédacteurs ou les philosophes à table.

Cependant, la puissance des sémaphores est aussi leur faiblesse : leur nature \"primitive\" et non structurée place un fardeau considérable sur le programmeur, où la moindre erreur peut avoir des conséquences catastrophiques. C\'est pour répondre à ce besoin de sécurité et de structuration que le moniteur a été conçu. En encapsulant les données partagées et la synchronisation au sein d\'une même entité, et en garantissant l\'exclusion mutuelle par construction, le moniteur représente une avancée majeure vers une programmation concurrente plus sûre, plus lisible et plus maintenable. Les variables de condition complètent ce tableau en offrant un mécanisme de coordination élégant à l\'intérieur même du moniteur.

Enfin, nous avons abordé l\'interblocage, non pas comme une simple erreur de programmation, mais comme une pathologie systémique inhérente à la compétition pour des ressources non préemptibles. L\'analyse des quatre conditions de Coffman nous a fourni un cadre formel pour comprendre, modéliser et, finalement, traiter ce problème. Les stratégies de prévention, d\'évitement et de détection ne sont pas de simples algorithmes, mais des philosophies de conception qui reflètent des compromis fondamentaux entre la sécurité, la performance et la flexibilité. Le choix de l\'une ou l\'autre de ces stratégies dépend intimement de la nature du système à construire, qu\'il s\'agisse d\'un système embarqué critique où la sûreté est primordiale, ou d\'un système d\'exploitation généraliste où la flexibilité et la performance moyenne priment.

En définitive, la maîtrise de la concurrence ne se résume pas à l\'apprentissage d\'une collection de primitives. Elle exige une compréhension profonde des interactions subtiles entre le matériel, le système d\'exploitation et le logiciel d\'application. Elle nous enseigne que le passage à l\'échelle et la construction de systèmes complexes et fiables reposent sur des abstractions bien conçues, qui permettent de dompter la complexité du non-déterminisme et de transformer le chaos potentiel du parallélisme en une coopération ordonnée et efficace.

