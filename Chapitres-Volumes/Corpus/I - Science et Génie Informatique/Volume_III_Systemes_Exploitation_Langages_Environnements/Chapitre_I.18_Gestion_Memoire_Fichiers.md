# Chapitre I.18 : Systèmes d\'Exploitation - Gestion de la Mémoire et des Fichiers

##

## Partie I : La Gestion de la Mémoire

###

### 1. Introduction à la Gestion de la Mémoire

####

#### 1.1 Rôle et Objectifs du Gestionnaire de Mémoire

Le gestionnaire de mémoire est une composante critique du noyau d\'un système d\'exploitation (SE), agissant comme l\'arbitre principal de la ressource la plus fondamentale après le processeur : la mémoire principale (RAM). Son rôle central est de partager et de coordonner l\'utilisation de cet espace fini entre le système d\'exploitation lui-même et la multitude de processus utilisateur qui se disputent son accès. Pour ce faire, il remplit plusieurs fonctions interdépendantes et essentielles à la stabilité et à l\'efficacité d\'un système multi-programmé.

Ses responsabilités primordiales sont les suivantes :

- **Allocation et Récupération :** Le gestionnaire doit allouer dynamiquement des blocs de mémoire aux processus qui en font la demande, typiquement lors de leur création. Inversement, il doit récupérer et libérer cet espace lorsque les processus se terminent, le rendant disponible pour de nouvelles allocations. Cette gestion dynamique implique de maintenir en permanence une cartographie précise de l\'état de la mémoire, en répertoriant les zones occupées et les zones libres à l\'aide de structures de données dédiées, telles que des tables de bits ou des listes chaînées.

- **Protection :** Dans un environnement où plusieurs processus coexistent, il est impératif d\'isoler leurs espaces mémoire respectifs. Le gestionnaire de mémoire, en collaboration avec le matériel, doit garantir qu\'un processus ne puisse ni lire ni écrire dans la mémoire allouée au noyau ou à un autre processus. Cette protection est la pierre angulaire de la stabilité du système, prévenant les corruptions de données et les pannes généralisées.

- **Partage :** L\'efficacité d\'un système d\'exploitation moderne repose sur sa capacité à optimiser l\'utilisation des ressources. Le gestionnaire de mémoire facilite cela en permettant à plusieurs processus de partager des zones mémoire de manière contrôlée. Un exemple classique est le partage de bibliothèques de code (comme les .dll sous Windows ou les .so sous Linux) ; une seule copie de la bibliothèque est chargée en mémoire et mappée dans l\'espace d\'adressage de tous les processus qui l\'utilisent, économisant ainsi une quantité considérable de RAM.

- **Optimisation :** L\'un des objectifs principaux est de maximiser le taux de multiprogrammation, c\'est-à-dire le nombre de processus actifs résidant simultanément en mémoire. Un taux élevé augmente les chances qu\'il y ait toujours un processus prêt à être exécuté par le processeur, optimisant ainsi son utilisation et le débit global du système.

#### 1.2 La Hiérarchie de la Mémoire : Des Registres au Stockage Secondaire

La gestion de la mémoire ne se limite pas à la seule RAM. Elle s\'inscrit dans une hiérarchie de stockage plus large, où chaque niveau représente un compromis différent entre vitesse, capacité et coût. Le système d\'exploitation doit coordonner l\'utilisation de ces différents niveaux pour offrir une performance optimale.

1.  **Registres du CPU :** Situés au sommet de la hiérarchie, les registres sont la forme de mémoire la plus rapide, intégrée directement au processeur. Leur capacité est extrêmement faible (quelques centaines d\'octets), mais leur temps d\'accès est quasi instantané, de l\'ordre d\'un cycle d\'horloge.

2.  **Mémoire Cache (L1, L2, L3) :** Intercalée entre les registres et la RAM, la mémoire cache est une mémoire rapide qui stocke les données et instructions récemment utilisées. Elle est gérée de manière purement matérielle par le processeur pour masquer la latence de la RAM. Bien qu\'essentielle aux performances, elle est transparente pour le système d\'exploitation.

3.  **Mémoire Principale (RAM) :** C\'est la mémoire de travail du système, volatile et directement accessible par le processeur. Tous les programmes et leurs données doivent y être chargés pour pouvoir être exécutés. C\'est la ressource centrale que le gestionnaire de mémoire du SE administre activement.

4.  **Mémoire Secondaire (Disque Dur, SSD) :** En bas de la hiérarchie se trouve la mémoire de masse. Elle est non volatile, offre une grande capacité de stockage à faible coût, mais ses temps d\'accès sont plusieurs ordres de grandeur plus lents que ceux de la RAM. Elle sert au stockage persistant des fichiers et comme espace d\'appoint (ou *backing store*) pour les mécanismes de mémoire virtuelle.

#### 1.3 Adressage Logique vs. Adressage Physique et le Rôle de la MMU

La clé de voûte de la gestion de mémoire moderne est la dissociation entre la perception de la mémoire par un processus et son organisation physique réelle. Cette dissociation est rendue possible par l\'introduction de deux types d\'adresses et d\'un composant matériel dédié.

- **Adresse Logique (ou Virtuelle) :** C\'est l\'adresse générée par le CPU du point de vue d\'un processus. Chaque processus se voit attribuer son propre espace d\'adressage logique, qui apparaît comme un grand tableau contigu de mémoire, commençant généralement à l\'adresse 0. Le programmeur et le compilateur ne manipulent que des adresses logiques.

- **Adresse Physique :** C\'est l\'adresse réelle d\'un emplacement dans les circuits de la mémoire RAM.

Cette distinction est fondamentale car, dans un système multi-programmé, un même programme peut être chargé à des adresses physiques différentes à chaque exécution, en fonction de la disponibilité de la mémoire. Sans un mécanisme de traduction, le code du programme devrait être modifié à chaque chargement, ce qui est impraticable.

- **Memory Management Unit (MMU) :** La traduction entre les adresses logiques et physiques est effectuée à la volée par un composant matériel appelé la *Memory Management Unit* (MMU). Pour chaque accès mémoire initié par le CPU, la MMU intercepte l\'adresse logique et la convertit en adresse physique avant de la transmettre à la RAM. Cette traduction est extrêmement rapide et se produit à chaque lecture ou écriture en mémoire. La MMU est configurée et contrôlée par le noyau du système d\'exploitation, qui lui fournit les tables de correspondance nécessaires (tables de pages ou de segments) pour effectuer son travail.

Cette couche d\'indirection introduite par la MMU est bien plus qu\'un simple mécanisme de traduction. Elle est le fondement qui permet au système d\'exploitation de résoudre simultanément trois défis majeurs de la multiprogrammation. Premièrement, la **relocalisation** : en modifiant simplement les tables de traduction, le SE peut déplacer un processus en mémoire physique sans que celui-ci n\'en ait conscience. Deuxièmement, la **protection** : en définissant des limites dans les tables de traduction, le SE peut confiner un processus à sa propre zone mémoire. Troisièmement, le **partage** : en faisant pointer les entrées des tables de traduction de plusieurs processus vers les mêmes adresses physiques, le SE peut partager efficacement des ressources comme les bibliothèques de code. La MMU n\'est donc pas un simple traducteur, mais l\'outil matériel qui habilite le SE à gérer la mémoire de manière flexible, sécurisée et efficace.

#### 1.4 Protection de la Mémoire et Partage

La protection de la mémoire est une fonction de sécurité non négociable. Elle est implémentée par la MMU qui, lors de chaque traduction d\'adresse, vérifie si l\'accès est légal. Dans les schémas les plus simples, cela se fait à l\'aide de registres de base et de limite. Le registre de base contient l\'adresse physique de départ de la zone allouée au processus, et le registre de limite en spécifie la taille. Toute adresse logique générée par le processus est comparée à la limite ; si elle la dépasse, ou si la tentative d\'accès est invalide (par exemple, écriture dans une zone en lecture seule), la MMU génère une interruption matérielle (un *trap*) qui transfère le contrôle au système d\'exploitation. Le SE peut alors terminer le processus fautif, lui envoyant un signal tel qu\'une \"faute de segmentation\" (*segmentation fault*).

Le partage de ressources, quant à lui, est une optimisation essentielle. Le partage de code est l\'exemple le plus courant. Lorsque plusieurs processus exécutent le même programme (par exemple, un éditeur de texte), il est inutile de charger autant de copies du code en mémoire. Grâce aux mécanismes de traduction d\'adresses, le SE peut charger une seule copie physique du code et faire en sorte que les tables de traduction de chaque processus pointent vers cette même zone physique, tout en maintenant des zones de données séparées et privées pour chacun.

### 2. Stratégies d\'Allocation Contiguë

Les premières approches de gestion de la mémoire reposaient sur le principe de l\'allocation contiguë, où chaque processus devait occuper un seul bloc de mémoire physique d\'un seul tenant.

#### 2.1 Partitions Fixes et Dynamiques

- **Monoprogrammation :** Dans les systèmes les plus simples, la mémoire était divisée en deux partitions : une pour le système d\'exploitation (généralement en mémoire basse) et une pour l\'unique processus utilisateur, qui occupait tout le reste de l\'espace disponible.

- **Multiprogrammation à Partitions Fixes (MFT) :** Pour permettre l\'exécution simultanée de plusieurs processus, la mémoire utilisateur était subdivisée en un nombre fixe de partitions lors du démarrage du système. Ces partitions pouvaient être de tailles égales ou inégales. Chaque partition ne pouvait héberger qu\'un seul processus. Les nouveaux processus étaient placés dans une file d\'attente associée à la plus petite partition capable de les contenir, attendant qu\'elle se libère.

- **Multiprogrammation à Partitions Variables (MVT) :** Pour une utilisation plus flexible de la mémoire, l\'approche des partitions variables a été développée. Dans ce modèle, il n\'y a pas de division prédéfinie. Lorsqu\'un processus arrive, le système d\'exploitation lui alloue un bloc de mémoire de la taille exacte dont il a besoin, créant ainsi une partition dynamique. La mémoire est alors vue comme un ensemble de partitions allouées et de \"trous\" (*holes*), qui sont des blocs de mémoire libre. Le nombre, la taille et l\'emplacement de ces partitions et trous varient constamment au gré des arrivées et des départs de processus.

#### 2.2 Le Problème de la Fragmentation : Interne et Externe

L\'allocation contiguë, bien que simple en principe, se heurte à un problème majeur et inefficace : la fragmentation de la mémoire. On en distingue deux types :

- **Fragmentation Interne :** Ce phénomène est caractéristique des partitions fixes. Il se produit lorsqu\'un processus est chargé dans une partition plus grande que sa taille réelle. L\'espace excédentaire *à l\'intérieur* de la partition est perdu, car il ne peut être alloué à aucun autre processus. Par exemple, si un processus de 18 Ko est placé dans une partition de 32 Ko, 14 Ko de mémoire sont gaspillés.

- **Fragmentation Externe :** Ce type de fragmentation est le fléau des systèmes à partitions variables. Au fur et à mesure que les processus sont chargés et déchargés, la mémoire se parsème de nombreux petits trous non contigus. Il peut arriver qu\'il y ait suffisamment d\'espace libre total pour satisfaire la demande d\'un nouveau processus, mais qu\'aucun trou unique ne soit assez grand pour l\'accueillir. Par exemple, un système pourrait disposer de 50 Ko de mémoire libre, mais répartis en cinq blocs de 10 Ko, rendant impossible le chargement d\'un processus de 20 Ko. Des études statistiques ont montré que dans un système soumis à des allocations et libérations fréquentes, jusqu\'à un tiers de la mémoire peut être rendu inutilisable par la fragmentation externe, une règle empirique connue sous le nom de \"règle des 50 %\" (pour N blocs alloués, environ 0.5N blocs sont perdus).

#### 2.3 Algorithmes de Placement : First-Fit, Best-Fit, et Worst-Fit

Dans un système à partitions dynamiques, lorsque plusieurs trous sont disponibles, le système d\'exploitation doit utiliser un algorithme pour décider lequel allouer à un nouveau processus. Les trois stratégies les plus courantes sont  :

- **First-Fit (Premier ajustement) :** L\'algorithme parcourt la liste des trous et alloue le premier qui est suffisamment grand. C\'est une stratégie simple et rapide, souvent performante en pratique.

- **Best-Fit (Meilleur ajustement) :** L\'algorithme recherche dans toute la liste le plus petit trou qui soit suffisamment grand pour le processus. L\'idée est de laisser un trou résiduel aussi petit que possible. Cependant, cette stratégie a tendance à créer une multitude de très petits trous inutilisables et peut être plus lente car elle nécessite un parcours complet de la liste.

- **Worst-Fit (Pire ajustement) :** À l\'opposé de Best-Fit, cet algorithme alloue le plus grand trou disponible. L\'objectif est de laisser un trou résiduel qui soit le plus grand possible, et donc potentiellement plus utile pour de futurs grands processus. En pratique, cette stratégie est souvent moins performante.

Le choix entre ces algorithmes illustre un dilemme fondamental en gestion des ressources : l\'optimisation d\'une décision locale et immédiate peut avoir des conséquences imprévisibles et négatives sur l\'état global et futur du système. L\'algorithme *Best-Fit*, par exemple, est optimal localement car il minimise le gaspillage pour la requête actuelle. Cependant, à long terme, il pollue la mémoire avec une \"poussière\" de fragments inutilisables, dégradant la performance globale. À l\'inverse, *Worst-Fit* est localement inefficace mais peut, dans certains scénarios, préserver de grands blocs pour l\'avenir. Cette tension démontre qu\'il n\'existe pas d\'algorithme de placement universellement supérieur ; leur efficacité dépend entièrement de la séquence future des demandes, qui est par nature imprévisible. C\'est cette inefficacité inhérente qui a motivé l\'abandon progressif de l\'allocation contiguë au profit de techniques plus sophistiquées.

#### 2.4 Limitations et Solutions : Compactage et Swapping

Pour lutter contre la fragmentation externe, deux techniques peuvent être employées :

- **Compactage :** Cette solution radicale consiste à déplacer tous les processus alloués pour les regrouper dans une partie de la mémoire, fusionnant ainsi tous les petits trous en un seul grand bloc de mémoire libre. Le compactage est cependant une opération extrêmement coûteuse en temps de calcul, car elle nécessite de copier de grandes quantités de données et de mettre à jour les informations de relocalisation de chaque processus déplacé. Pendant cette opération, le système est généralement figé.

- **Swapping (Échange) :** Si la mémoire est pleine et qu\'un nouveau processus doit être chargé, le système peut choisir un processus résident, le suspendre et copier son image mémoire complète sur un espace de stockage secondaire rapide (le *backing store*). L\'espace mémoire ainsi libéré peut être utilisé pour le nouveau processus. Plus tard, le processus \"swappé\" pourra être rechargé en mémoire pour reprendre son exécution. Le principal inconvénient du swapping est le temps de transfert important entre la RAM et le disque, qui est directement proportionnel à la taille du processus.

### 3. Allocation Non Contiguë : La Pagination et la Segmentation

Face aux limitations de l\'allocation contiguë, notamment la fragmentation externe, les systèmes d\'exploitation modernes ont adopté des stratégies d\'allocation non contiguë. Celles-ci permettent de répartir un processus en plusieurs morceaux qui peuvent être placés dans des zones non adjacentes de la mémoire physique. Les deux approches principales sont la pagination et la segmentation.

#### 3.1 La Pagination : Une Vue Physique

La pagination est une technique qui s\'attaque directement au problème de la fragmentation externe en imposant une granularité fixe à l\'allocation mémoire.

- **Principe :** L\'espace d\'adressage logique d\'un processus est divisé en blocs de taille fixe appelés **pages**. De même, la mémoire physique est divisée en blocs de même taille appelés **cadres de page** (*frames*). La taille d\'une page est égale à la taille d\'un cadre, et est typiquement une puissance de 2 (par exemple, 4 Ko, 8 Ko). Lorsqu\'un programme de\
  *n* pages doit être exécuté, le système d\'exploitation doit trouver *n* cadres libres en mémoire physique, qui n\'ont pas besoin d\'être contigus, pour y charger les pages du programme.

- **Mécanismes des Tables de Pages et Traduction d\'Adresse :** Pour chaque processus, le système d\'exploitation maintient une **table des pages**. Cette table est une structure de données qui établit la correspondance entre chaque page logique (virtuelle) et le cadre physique où elle est stockée. Une adresse logique générée par le CPU est interprétée par la MMU comme étant composée de deux parties : un\
  **numéro de page (p)** et un **déplacement (offset, d)** à l\'intérieur de cette page. Le processus de traduction est le suivant :

  1.  La MMU utilise le numéro de page *p* comme index pour accéder à la *p*-ième entrée de la table des pages du processus courant.

  2.  Cette entrée contient le numéro du cadre de page physique *f* où la page est stockée.

  3.  La MMU combine ce numéro de cadre *f* avec le déplacement *d* pour former l\'adresse physique finale. Si la taille de la page est une puissance de 2, cette opération est une simple concaténation de bits.\
      \
      Chaque entrée de la table des pages contient également des bits de contrôle, comme un bit de présence (indiquant si la page est en RAM), des bits de protection (lecture/écriture/exécution), et un bit de modification (dirty bit).5

- **Analyse des Performances et Fragmentation Interne :** L\'avantage majeur de la pagination est l\'élimination complète de la fragmentation externe. N\'importe quel cadre libre peut être utilisé pour n\'importe quelle page, ce qui optimise l\'utilisation de la mémoire. Cependant, la pagination introduit sa propre forme de gaspillage : la\
  **fragmentation interne**. Si la taille d\'un processus n\'est pas un multiple exact de la taille de la page, sa dernière page ne sera que partiellement remplie. L\'espace inutilisé dans ce dernier cadre est perdu. En moyenne, on estime cette perte à une demi-page par processus.

#### 3.2 La Segmentation : Une Vue Logique

La segmentation aborde la gestion de la mémoire d\'un point de vue différent, plus aligné avec la structure logique d\'un programme.

- **Concept :** Plutôt que de diviser la mémoire en blocs physiques arbitraires, la segmentation la divise en unités logiques de tailles variables appelées **segments**. Chaque segment correspond à une partie sémantique du programme, telle que le segment de code, le segment des données globales, la pile (*stack*), ou le tas (*heap*). Cette vue correspond à la manière dont le programmeur et le compilateur perçoivent le programme.

- **Tables de Segments et Protection :** Une adresse logique dans un système segmenté est une paire \<numéro de segment, déplacement\>. Le système d\'exploitation maintient une\
  **table des segments** pour chaque processus. Chaque entrée de cette table contient deux informations principales pour un segment donné : son **adresse de base** en mémoire physique et sa **limite** (sa taille). Lors de la traduction, la MMU vérifie d\'abord que le déplacement est inférieur à la limite du segment (pour éviter les accès hors limites). Si la vérification est réussie, elle additionne le déplacement à l\'adresse de base pour obtenir l\'adresse physique. Ce mécanisme rend la protection et le partage très naturels et granulaires : on peut facilement marquer un segment de code comme étant en lecture seule et exécutable, ou partager un segment de données entre plusieurs processus.

- **Fragmentation Externe et Complexité :** Le principal inconvénient de la segmentation pure est qu\'elle réintroduit le problème de la **fragmentation externe**. Comme les segments ont des tailles variables, leur allocation et leur libération créent des trous dans la mémoire, de la même manière que les partitions dynamiques.

#### 3.3 Approches Hybrides : La Segmentation Paginée

Pour combiner les avantages des deux mondes, de nombreux systèmes (comme les processeurs Intel x86) implémentent une approche hybride : la segmentation paginée. Dans ce modèle, l\'espace d\'adressage est d\'abord divisé logiquement en segments, puis chaque segment est lui-même paginé.

L\'adresse logique est traitée en plusieurs étapes. La partie \"segment\" de l\'adresse est utilisée pour accéder à la table des segments, qui ne pointe plus directement vers une adresse de base en mémoire, mais vers la table des pages de ce segment. Ensuite, la partie \"page\" de l\'adresse est utilisée comme index dans cette table de pages pour trouver le cadre physique, et le déplacement est ajouté pour obtenir l\'adresse finale. Cette architecture combine la vue logique et la protection granulaire de la segmentation avec l\'allocation efficace et l\'absence de fragmentation externe de la pagination.

  --------------------------------------------- ---------------------------------------------- ---------------------------------------- -----------------------------------------
  Critère                                       Allocation Contiguë (Partitions Variables)     Segmentation                             Pagination

  **Unité d\'allocation**                       Processus entier                               Segment de taille variable               Page de taille fixe

  **Fragmentation principale**                  Externe                                        Externe                                  Interne

  **Visibilité pour le programmeur**            Implicite                                      Explicite (vue logique)                  Transparente

  **Complexité de la traduction d\'adresse**    Simple (addition d\'un registre de base)       Modérée (table de segments + addition)   Simple (table de pages + concaténation)

  **Facilité de partage/protection**            Difficile                                      Facile (par segment)                     Possible mais moins naturel (par page)

  **Efficacité d\'utilisation de la mémoire**   Faible (à cause de la fragmentation externe)   Modérée                                  Élevée
  --------------------------------------------- ---------------------------------------------- ---------------------------------------- -----------------------------------------

*Tableau 1 : Tableau Comparatif des Méthodes d\'Allocation Mémoire*

### 4. La Mémoire Virtuelle : Au-delà des Limites Physiques

La mémoire virtuelle est une abstraction puissante qui étend les concepts de pagination et de segmentation pour créer l\'illusion d\'une mémoire principale beaucoup plus grande que la RAM physiquement installée.

#### 4.1 Concept et Avantages de la Mémoire Virtuelle

La mémoire virtuelle est une technique qui dissocie complètement l\'espace d\'adressage logique d\'un processus de la mémoire physique. Elle permet à un processus de manipuler un vaste espace d\'adressage (par exemple, de plusieurs gigaoctets) même si l\'ordinateur ne dispose que d\'une fraction de cette quantité en RAM. Les parties de l\'espace d\'adressage qui ne sont pas actuellement en RAM sont conservées sur un support de stockage secondaire, comme un disque dur ou un SSD.

Les avantages de cette approche sont considérables :

- **Exécution de programmes volumineux :** Un programme n\'a plus besoin de tenir entièrement en mémoire pour s\'exécuter. Seules les parties activement utilisées (les pages de code et de données nécessaires à un instant T) sont chargées en RAM.

- **Augmentation du taux de multiprogrammation :** Comme chaque processus n\'occupe qu\'une fraction de son espace d\'adressage en mémoire physique, il est possible de faire coexister un plus grand nombre de processus en RAM. Cela augmente la probabilité que le CPU ait toujours un processus prêt à exécuter, améliorant ainsi le débit du système.

- **Simplification de la programmation :** Les développeurs peuvent concevoir des applications qui manipulent de grandes quantités de données sans se soucier des contraintes de la mémoire physique. Ils travaillent avec un espace d\'adressage logique vaste et contigu, laissant le système d\'exploitation gérer la complexité du placement des données entre la RAM et le disque.

Cette technique peut être vue comme un système de cache sophistiqué. La RAM agit comme un cache pour le stockage secondaire (le disque). Un accès à une page déjà en RAM est un \"cache hit\", rapide. Un accès à une page qui se trouve sur le disque est un \"cache miss\", qui déclenche un mécanisme de chargement plus lent. Pour gérer ce cache, il faut une structure de données qui mappe les adresses virtuelles aux adresses physiques : la table des pages. Cependant, cette table peut être très grande et est elle-même stockée en RAM. Pour accélérer sa consultation, un autre niveau de cache est introduit : le TLB (Translation Lookaside Buffer), qui est un cache pour les entrées de la table des pages. La performance de la mémoire virtuelle dépend donc de l\'efficacité de ces deux niveaux de cache interdépendants.

#### 4.2 La Pagination à la Demande (Demand Paging)

La pagination à la demande est la méthode la plus courante pour implémenter la mémoire virtuelle. Le principe est simple : une page n\'est chargée du disque vers la mémoire que lorsqu\'elle est référencée pour la première fois. C\'est une stratégie \"paresseuse\" (*lazy loading*) qui évite de charger des parties d\'un programme qui ne seront peut-être jamais utilisées.

#### 4.3 Le Processus de Défaut de Page (Page Fault) : Séquence Complète

Un défaut de page n\'est pas une erreur logicielle, mais une interruption matérielle normale et gérée par le système d\'exploitation pour mettre en œuvre la pagination à la demande. La séquence complète d\'événements est la suivante :

1.  **Référence Mémoire :** Le CPU tente d\'accéder à une adresse mémoire. Il envoie l\'adresse logique à la MMU.

2.  **Trap Matériel :** La MMU consulte la table des pages du processus et constate que le bit de présence pour la page demandée est à 0, indiquant qu\'elle n\'est pas en mémoire. La MMU déclenche alors une interruption matérielle, un *trap* de \"défaut de page\", vers le noyau du SE.

3.  **Sauvegarde du Contexte :** Le SE prend le contrôle. Il sauvegarde immédiatement le contexte du processus interrompu (registres, compteur ordinal) pour pouvoir le reprendre plus tard.

4.  **Vérification de la Validité :** Le SE vérifie si la référence mémoire était légale. Il consulte ses propres structures de données pour déterminer si l\'adresse fait bien partie de l\'espace d\'adressage virtuel du processus. Si l\'accès est invalide, le processus est terminé (par exemple, avec une erreur \"segmentation fault\").

5.  **Localisation sur Disque :** Si l\'accès est valide, le SE doit trouver la page sur le disque. Il utilise une table interne pour localiser l\'emplacement de la page dans l\'espace d\'échange (*swap space*).

6.  **Allocation d\'un Cadre :** Le SE doit trouver un cadre de page libre en RAM.

    - S\'il y a un cadre libre, il est utilisé.

    - S\'il n\'y a pas de cadre libre, le SE doit en libérer un. Il exécute un **algorithme de remplacement de page** pour sélectionner une page \"victime\" actuellement en mémoire.

7.  **Éviction de la Page Victime :** Si la page victime a été modifiée depuis son chargement (son *dirty bit* est à 1), elle doit être réécrite sur le disque pour sauvegarder les changements. Si elle n\'a pas été modifiée, elle peut être simplement écrasée.

8.  **Chargement de la Page Requise :** Le SE lance une opération d\'entrée/sortie pour lire la page requise du disque et la charger dans le cadre de page désormais disponible. Le processus qui a causé le défaut est placé en état d\'attente.

9.  **Ordonnancement :** Pendant que l\'opération d\'E/S, qui est lente, s\'effectue, l\'ordonnanceur du SE alloue le CPU à un autre processus prêt à s\'exécuter.

10. **Mise à Jour des Tables :** Une fois le chargement terminé, une interruption du contrôleur de disque informe le SE. Le SE met alors à jour la table des pages du processus pour indiquer que la page est maintenant en mémoire (le bit de présence passe à 1) et pour y inscrire le numéro du cadre alloué.

11. **Reprise du Processus :** Le SE replace le processus, qui était en attente, dans la file des processus prêts.

12. **Redémarrage de l\'Instruction :** Lorsque le processus est à nouveau élu par l\'ordonnanceur, son contexte est restauré et l\'instruction qui avait initialement causé le défaut de page est redémarrée. Cette fois, l\'accès mémoire réussit car la page est présente en RAM.

#### 4.4 Algorithmes de Remplacement de Pages

Le choix de la page à évincer est crucial pour la performance de la mémoire virtuelle. Un bon algorithme minimise le taux de défauts de page en gardant en mémoire les pages les plus utiles.

- **FIFO (First-In, First-Out) :** L\'algorithme le plus simple. Il remplace la page qui est en mémoire depuis le plus longtemps, en utilisant une simple file d\'attente. Son principal défaut est qu\'il ne tient pas compte de la fréquence ou de la récence d\'utilisation ; il peut ainsi évincer une page très importante qui a été chargée il y a longtemps.

- **Optimal (OPT ou MIN) :** Cet algorithme est théorique et sert de référence. Il remplace la page qui sera utilisée le plus tardivement dans le futur. Il garantit le nombre minimal de défauts de page, mais est irréalisable car il nécessite une connaissance parfaite du futur.

- **LRU (Least Recently Used) :** Cet algorithme remplace la page qui n\'a pas été utilisée depuis le plus longtemps. Il se base sur le principe de localité temporelle : une page utilisée récemment a de fortes chances d\'être réutilisée bientôt. LRU offre d\'excellentes performances, très proches de l\'optimal, mais son implémentation parfaite est coûteuse car elle exigerait de maintenir un horodatage pour chaque accès mémoire.

- **Approximations de LRU (Horloge/Second-Chance) :** Pour obtenir les bénéfices de LRU sans son coût, des algorithmes d\'approximation sont utilisés. Le plus connu est l\'algorithme de l\'Horloge. Il associe à chaque page un **bit de référence**, mis à 1 par le matériel à chaque accès. Les cadres de page sont organisés en une liste circulaire. Un pointeur (\"l\'aiguille de l\'horloge\") parcourt cette liste. Lorsqu\'une page doit être remplacée, l\'aiguille avance :

  - Si elle pointe sur une page avec un bit de référence à 1, cela signifie que la page a été utilisée récemment. L\'algorithme lui donne une \"seconde chance\" : il met son bit à 0 et passe à la page suivante.

  - Si elle pointe sur une page avec un bit de référence à 0, cette page n\'a pas été utilisée depuis le dernier passage de l\'aiguille. Elle est choisie comme victime.\
    \
    Cet algorithme est une approximation efficace et peu coûteuse de LRU.

#### 4.5 L\'Anomalie de Bélády : Quand Plus de Mémoire Nuit à la Performance

Intuitivement, allouer plus de mémoire (plus de cadres de page) à un processus devrait réduire, ou au mieux ne pas changer, son nombre de défauts de page. Cependant, en 1969, László Bélády a démontré un phénomène paradoxal : pour certaines séquences de références et avec certains algorithmes, augmenter le nombre de cadres peut *augmenter* le nombre de défauts de page.

Cette anomalie affecte principalement l\'algorithme FIFO. La raison est que l\'ordre d\'éviction dans FIFO dépend uniquement de l\'heure de chargement. Avec plus de cadres, une page \"utile\" peut rester en mémoire plus longtemps, devenant ainsi \"plus vieille\" et une cible prioritaire pour l\'éviction, juste avant d\'être à nouveau nécessaire. Les algorithmes comme LRU et OPT, qui sont des \"algorithmes de pile\" (

*stack algorithms*), sont immunisés contre cette anomalie. Pour ces algorithmes, l\'ensemble des pages présentes en mémoire avec *N* cadres est toujours un sous-ensemble de l\'ensemble des pages présentes avec *N+1* cadres, ce qui n\'est pas garanti pour FIFO.

  ----------------------- ------- ------- ------- ------- --- ------- --- ------- --- --- ------- --- ------- ------- --- ------- --- ------- --- --- ---------
  Séquence de référence   7       0       1       2       0   3       0   4       2   3   0       3   2       1       2   0       1   7       0   1   Défauts

  **FIFO (3 cadres)**     **7**   **0**   **1**   **2**   2   **3**   3   **4**   4   4   **0**   0   0       **1**   1   1       1   **7**   7   7   **15**

                                  **7**   **0**   **1**   1   **0**   0   **2**   2   2   **3**   3   3       **2**   2   2       2   **0**   0   0

                                          **7**   **0**   0   **2**   2   **3**   3   3   **4**   4   4       **3**   3   3       3   **1**   1   1

  **LRU (3 cadres)**      **7**   **0**   **1**   **2**   2   **3**   3   **4**   4   3   3       3   2       **1**   1   0       0   **7**   7   1   **12**

                                  **7**   **0**   **0**   0   **0**   0   **0**   2   2   0       0   3       **3**   2   1       1   **0**   0   0

                                          **7**   **1**   1   **2**   2   **2**   0   0   2       2   1       **2**   3   2       2   **1**   1   7

  **OPT (3 cadres)**      **7**   **0**   **1**   **2**   0   **3**   0   **4**   2   3   0       3   2       **1**   2   0       1   **7**   0   1   **9**

                                  **7**   **0**   0       2   0       2   2       3   0   3       2   1       2       0   1       7   0       1

                                          **7**   1       1   1       3   3       0   2   2       1   2       0       1   7       0   1

  **FIFO (4 cadres)**     **7**   **0**   **1**   **2**   2   **3**   3   **4**   4   4   4       4   **2**   **1**   1   **0**   0   **7**   7   7   **16**

                                  **7**   **0**   **1**   1   **0**   0   **0**   0   0   0       0   **3**   **2**   2   **1**   1   **0**   0   0

                                          **7**   **0**   0   **2**   2   **2**   2   2   2       2   **4**   **3**   3   **2**   2   **1**   1   1

                                                  **7**   7   **1**   1   **3**   3   3   3       3   **0**   **4**   4   **3**   3   **2**   2   2
  ----------------------- ------- ------- ------- ------- --- ------- --- ------- --- --- ------- --- ------- ------- --- ------- --- ------- --- --- ---------

*Tableau 2 : Simulation des Algorithmes de Remplacement de Pages (Les défauts de page sont en gras)*

#### 4.6 Optimisation des Performances : Le Translation Lookaside Buffer (TLB)

- **Rôle et Fonctionnement du TLB :** Comme mentionné précédemment, la table des pages est stockée en RAM. Par conséquent, chaque accès mémoire d\'un programme (par exemple, pour lire une variable) nécessiterait en réalité deux accès à la RAM : un premier pour lire l\'entrée correspondante dans la table des pages, et un second pour accéder à la donnée elle-même. Cela doublerait effectivement le temps d\'accès à la mémoire, ce qui serait une pénalité de performance inacceptable.\
  \
  Pour résoudre ce problème, les MMU intègrent un cache matériel spécialisé, très rapide et de petite taille, appelé le Translation Lookaside Buffer (TLB). Le TLB stocke les traductions d\'adresses les plus récentes, c\'est-à-dire les paires \<numéro de page, numéro de cadre\> fréquemment utilisées.37\
  \
  Le processus de traduction est alors le suivant :

  1.  La MMU reçoit une adresse logique et cherche d\'abord le numéro de page dans le TLB.

  2.  Si la page est trouvée (**TLB hit**), le numéro de cadre est obtenu instantanément (en 0.5 à 1 cycle d\'horloge) et l\'adresse physique est formée. L\'accès à la table des pages en RAM est évité.

  3.  Si la page n\'est pas trouvée (**TLB miss**), la MMU doit alors effectuer un accès à la RAM pour consulter la table des pages (un *page walk*). Cette opération est beaucoup plus lente (10 à 100 cycles d\'horloge). Une fois la traduction obtenue, elle est stockée dans le TLB, remplaçant une entrée existante, en espérant qu\'elle sera réutilisée bientôt.

- Calcul du Temps d\'Accès Effectif à la Mémoire (EAT) : La performance globale du système de mémoire virtuelle dépend fortement du taux de succès du TLB (hit ratio). Le Temps d\'Accès Effectif (EAT) est une moyenne pondérée qui prend en compte les cas de hit et de miss.\
  Pour une pagination à un seul niveau, la formule est 36 :\
  \
  EAT=h×(t+m)+(1−h)×(t+m+m)\
  Où :

- h est le taux de succès du TLB (*hit ratio*).

- (1−h) est le taux d\'échec du TLB (*miss ratio*).

- t est le temps d\'accès au TLB.

- m est le temps d\'accès à la mémoire principale (RAM).

En cas de *hit*, le temps total est t+m (recherche TLB + accès à la donnée). En cas de *miss*, le temps total est t+m+m (recherche TLB + accès à la table des pages en RAM + accès à la donnée). Étant donné que t est très petit par rapport à m, et que les taux de succès du TLB sont souvent supérieurs à 99%, l\'EAT est très proche de m, et la pénalité de la double consultation mémoire est presque entièrement masquée.

## Partie II : La Gestion des Fichiers

### 5. Introduction aux Systèmes de Fichiers

La gestion des fichiers est la deuxième grande responsabilité d\'un système d\'exploitation, complémentaire à la gestion de la mémoire. Elle s\'occupe de l\'organisation, du stockage, de la récupération et de la protection des données sur les supports de stockage non volatils.

#### 5.1 Le Fichier comme Abstraction pour l\'Utilisateur

Le concept le plus fondamental fourni par un système de gestion de fichiers (SGF) est celui du **fichier**. Pour l\'utilisateur et les applications, un fichier est une collection logique d\'informations apparentées, identifiée par un nom. C\'est une abstraction de la mémoire permanente. Cette abstraction masque complètement les détails physiques complexes du dispositif de stockage, tels que la géométrie du disque (pistes, cylindres, secteurs), la nature du support (magnétique, flash) ou l\'emplacement physique des données. L\'utilisateur manipule des entités logiques (par exemple,

rapport.pdf) sans avoir à se soucier de la manière dont les octets qui le composent sont réellement organisés sur le disque.

#### 5.2 Attributs, Opérations et Types de Fichiers

Chaque fichier est associé à un ensemble d\'informations, appelées **attributs** ou **métadonnées**, qui le décrivent. Le SGF stocke et gère ces attributs, qui incluent généralement  :

- **Nom :** Le nom symbolique du fichier, lisible par l\'homme.

- **Identifiant :** Un numéro unique qui identifie le fichier au sein du système de fichiers.

- **Type :** Information utilisée par le système pour différencier les fichiers (ex: exécutable, répertoire, lien symbolique).

- **Taille :** La taille actuelle du fichier, en octets.

- **Emplacement :** Un pointeur vers l\'emplacement des données du fichier sur le périphérique.

- **Protection :** Des informations de contrôle d\'accès qui spécifient qui peut lire, écrire ou exécuter le fichier (par exemple, les permissions rwx sous Unix).

- **Horodatages :** Dates et heures de création, de dernier accès et de dernière modification.

- **Propriétaire et Groupe :** Identifiants de l\'utilisateur et du groupe auxquels le fichier appartient.

Le système d\'exploitation fournit un ensemble d\'**appels système** qui constituent les opérations de base pour manipuler les fichiers  :

- **Créer (Create) :** Crée un nouveau fichier vide.

- **Écrire (Write) :** Ajoute des données à un fichier.

- **Lire (Read) :** Lit des données depuis un fichier.

- **Repositionner (Seek) :** Déplace le pointeur de fichier à un emplacement spécifique pour l\'accès direct.

- **Supprimer (Delete) :** Efface un fichier et libère l\'espace disque qu\'il occupait.

- **Ouvrir (Open) / Fermer (Close) :** Avant d\'effectuer des opérations de lecture ou d\'écriture, un processus doit \"ouvrir\" le fichier. Cette opération permet au SE de charger les métadonnées en mémoire et de vérifier les droits d\'accès. L\'opération \"fermer\" libère les structures internes associées.

#### 5.3 Structure des Répertoires : Arborescences et Graphes

Pour organiser les milliers de fichiers présents sur un disque, les SGF utilisent le concept de **répertoire** (ou dossier). Un répertoire est un type de fichier spécial dont le contenu est une liste d\'entrées, chaque entrée associant un nom de fichier aux informations nécessaires pour le localiser (comme son numéro d\'identifiant unique).

La plupart des systèmes de fichiers modernes organisent les répertoires selon une **structure en arborescence**. Il existe un répertoire racine unique (noté / sous Unix/Linux ou C:\\ sous Windows) à partir duquel tous les autres fichiers et répertoires sont accessibles. Certains systèmes permettent également des structures en

**graphe acyclique dirigé**, où un fichier ou un répertoire peut avoir plusieurs noms ou apparaître dans plusieurs répertoires. Ceci est réalisé grâce aux liens (*links*), qu\'ils soient symboliques ou durs.

#### 5.4 L\'Interface du Système de Fichiers : Vue Applicative

Le système d\'exploitation expose son SGF aux applications via une interface de programmation (API). Pour offrir une flexibilité maximale, les SE modernes implémentent une couche d\'abstraction supplémentaire appelée

**Système de Fichiers Virtuel** (VFS) ou Commutateur de Système de Fichiers.

Le VFS définit une interface générique et unifiée pour toutes les opérations sur les fichiers (open, read, write, etc.). Lorsqu\'une application effectue un appel système, celui-ci est d\'abord traité par la couche VFS. Le VFS redirige ensuite l\'appel vers l\'implémentation du système de fichiers physique spécifique sur lequel le fichier réside (par exemple, ext4, NTFS, FAT32, ou même un système de fichiers réseau comme NFS). Cette architecture permet au système d\'exploitation de gérer de manière transparente plusieurs types de systèmes de fichiers simultanément et permet aux applications de fonctionner sans connaître les détails du SGF sous-jacent.

Le SGF remplit ainsi une double fonction critique. Pour l\'utilisateur, il fournit une **abstraction** qui transforme la complexité brute du stockage physique en une organisation logique et maniable de fichiers et de répertoires. Pour le système, il agit comme un **multiplexeur**, orchestrant l\'accès concurrent de multiples processus aux ressources de stockage partagées, en assurant la cohérence et la protection des données. Le VFS est l\'incarnation de cette dualité, présentant une interface d\'abstraction unifiée vers le haut tout en gérant la diversité des implémentations spécifiques vers le bas.

### 6. Implémentation des Systèmes de Fichiers

Derrière l\'abstraction simple présentée à l\'utilisateur se cache une machinerie logicielle complexe. L\'implémentation d\'un système de fichiers implique une architecture en couches et des choix de conception fondamentaux concernant l\'allocation de l\'espace disque.

#### 6.1 Architecture en Couches d\'un Système de Fichiers

Un SGF est généralement structuré en plusieurs couches, chacune ayant une responsabilité distincte :

1.  **Interface Applicative :** La couche la plus haute, qui fournit l\'API (les appels système comme open, read) aux programmes.

2.  **Système de Fichiers Logique :** Gère les métadonnées, la structure des répertoires, les noms de fichiers et la protection. C\'est à ce niveau que les permissions sont vérifiées.

3.  **Module d\'Organisation des Fichiers :** Traduit les adresses logiques de blocs au sein d\'un fichier en adresses de blocs physiques sur le disque. Il est responsable de la gestion de l\'espace libre.

4.  **Système de Fichiers de Base :** Émet des commandes génériques (par exemple, \"lire le bloc X\") vers le pilote de périphérique approprié.

5.  **Pilotes de Périphériques :** La couche la plus basse, qui traduit les commandes génériques en instructions spécifiques pour le contrôleur matériel du disque (par exemple, des commandes SCSI ou NVMe).

#### 6.2 Méthodes d\'Allocation de l\'Espace Disque

L\'une des décisions de conception les plus importantes pour un SGF est la méthode utilisée pour allouer les blocs de disque aux fichiers.

- **Allocation Contiguë :** Chaque fichier occupe un ensemble de blocs consécutifs sur le disque. L\'entrée de répertoire ne doit stocker que l\'adresse du premier bloc et la longueur du fichier en blocs.

  - **Avantages :** Très performant pour l\'accès séquentiel et direct. Une seule opération de recherche (*seek*) est nécessaire pour positionner la tête de lecture au début du fichier, après quoi les données peuvent être lues à la vitesse maximale du disque.

  - **Inconvénients :** Souffre gravement de la fragmentation externe. Il est également très difficile de faire grandir un fichier une fois créé, car l\'espace contigu suivant peut déjà être occupé.

- **Allocation Chaînée :** Les blocs d\'un fichier sont liés entre eux comme une liste chaînée. Chaque bloc contient, en plus des données, un pointeur vers le bloc suivant du fichier. L\'entrée de répertoire ne stocke que l\'adresse du premier bloc.

  - **Variante - FAT (File Allocation Table) :** Pour améliorer la performance et la robustesse, le chaînage n\'est pas stocké dans les blocs de données eux-mêmes, mais dans une table centralisée en mémoire, la FAT. Chaque entrée de la FAT correspond à un bloc sur le disque et contient le numéro du bloc suivant dans le fichier. Cette méthode est l\'apanage des systèmes de fichiers FAT12, FAT16 et FAT32.

  - **Avantages :** Élimine la fragmentation externe et permet aux fichiers de grandir facilement.

  - **Inconvénients :** L\'accès direct est très inefficace, car il faut parcourir la chaîne depuis le début pour atteindre un bloc donné. La fiabilité est moindre, car la corruption d\'un seul pointeur peut entraîner la perte de tout le reste du fichier. De plus, la FAT elle-même peut devenir très grande et consommer une quantité significative de mémoire.

- **Allocation Indexée :** Cette méthode résout les problèmes de l\'allocation chaînée. Toutes les adresses des blocs de données d\'un fichier sont regroupées dans une structure de données dédiée, appelée **bloc d\'index** ou **inode**. L\'entrée de répertoire pointe simplement vers cet inode.

  - **Avantages :** Supporte efficacement l\'accès direct (il suffit de lire l\'inode pour trouver l\'adresse de n\'importe quel bloc), ne souffre pas de fragmentation externe et permet aux fichiers de grandir.

  - **Inconvénients :** Nécessite un espace de stockage supplémentaire pour les inodes. Pour les fichiers très volumineux, un seul inode peut ne pas être suffisant pour contenir tous les pointeurs, ce qui conduit à des schémas d\'indexation à plusieurs niveaux, comme nous le verrons dans la section suivante.

  ------------------------------------------ --------------------------- ---------------------------- ----------------------------
  Critère                                    Allocation Contiguë         Allocation Chaînée (FAT)     Allocation Indexée (Inode)

  **Performance en Accès Séquentiel**        Excellente                  Bonne                        Très bonne

  **Performance en Accès Direct**            Excellente                  Faible                       Excellente

  **Fragmentation Externe**                  Problème majeur             Absente                      Absente

  **Possibilité de Croissance du Fichier**   Difficile                   Facile                       Facile

  **Surcharge de Stockage (Métadonnées)**    Minimale (début/longueur)   Modérée (taille de la FAT)   Modérée (inodes)

  **Fiabilité**                              Élevée                      Faible (chaînage)            Élevée
  ------------------------------------------ --------------------------- ---------------------------- ----------------------------

*Tableau 3 : Tableau Comparatif des Méthodes d\'Allocation d\'Espace Disque*

#### 6.3 Gestion de l\'Espace Libre

Pour allouer de nouveaux blocs, le SGF doit savoir lesquels sont disponibles. Deux méthodes principales sont utilisées :

- **Table de Bits (Bitmap) :** Une structure de données simple où chaque bit correspond à un bloc sur le disque. Un bit à 0 peut signifier que le bloc est libre, et un bit à 1 qu\'il est occupé. Cette méthode est efficace car elle permet de trouver rapidement des blocs libres, y compris des séquences de blocs contigus.

- **Liste Chaînée :** Tous les blocs libres sont chaînés les uns aux autres. Un pointeur dans le \"superbloc\" du système de fichiers pointe vers le premier bloc libre, qui contient un pointeur vers le suivant, et ainsi de suite. Cette méthode est simple à gérer mais rend la recherche de blocs contigus très inefficace.

### 7. Étude de Cas : La Structure des Inodes (Allocation Indexée)

Les systèmes de fichiers de la famille Unix (comme ext2, ext3, ext4, UFS) ont popularisé et perfectionné l\'allocation indexée grâce à une structure de données centrale : l\'**inode**.

#### 7.1 Anatomie d\'un Inode : Métadonnées et Pointeurs

Un inode (abréviation de *index node*) est une structure de données sur le disque qui stocke toutes les informations sur un fichier ou un répertoire, *à l\'exception de son nom*. Les métadonnées contenues dans un inode incluent le type de fichier, les permissions d\'accès, les identifiants du propriétaire et du groupe, la taille du fichier, les horodatages, et surtout, les pointeurs vers les blocs de données qui constituent le contenu du fichier.

Le nom du fichier, quant à lui, est stocké dans la structure de données du répertoire parent. L\'entrée de répertoire est une simple association \<nom du fichier, numéro d\'inode\>. Cette séparation entre le nom et les métadonnées est une caractéristique puissante, car elle permet à plusieurs noms (dans le même répertoire ou dans des répertoires différents) de pointer vers le même inode. C\'est le mécanisme des

**liens durs** (*hard links*).

#### 7.2 Pointeurs Directs et Indirects (Simples, Doubles, Triples)

La structure de pointeurs de l\'inode est une conception ingénieuse, optimisée pour la distribution statistique typique des tailles de fichiers dans un système : la grande majorité des fichiers sont petits. L\'inode contient un ensemble de pointeurs de blocs (typiquement 15) qui ne sont pas tous traités de la même manière  :

- **Pointeurs Directs :** Les premiers pointeurs (généralement 12) pointent directement vers des blocs de données. Cela permet un accès extrêmement rapide aux petits fichiers. Pour lire un tel fichier, le système n\'a besoin que de deux accès disque : un pour lire l\'inode, et un pour lire le bloc de données.

- **Pointeur Simple Indirect :** Le pointeur suivant (le 13ème) n\'est pas un pointeur de données. Il pointe vers un bloc intermédiaire, appelé bloc d\'indirection, qui contient lui-même une liste de pointeurs vers des blocs de données. Cela permet d\'adresser des fichiers de taille moyenne, au prix d\'un accès disque supplémentaire.

- **Pointeur Double Indirect :** Le 14ème pointeur introduit un deuxième niveau d\'indirection. Il pointe vers un bloc qui contient une liste de pointeurs vers des blocs d\'indirection simple. Ce mécanisme est utilisé pour les fichiers volumineux.

- **Pointeur Triple Indirect :** Le dernier pointeur (le 15ème) ajoute un troisième niveau d\'indirection, permettant d\'adresser des fichiers de très grande taille.

Cette structure hiérarchique est une optimisation remarquable. Elle offre des performances maximales pour le cas le plus courant (les petits fichiers) en minimisant le nombre d\'accès disque, tout en conservant la capacité de gérer des fichiers de taille gigantesque. La pénalité de performance due aux accès indirects n\'est payée que par les fichiers suffisamment grands pour en avoir besoin.

#### 7.3 Calcul de la Taille Maximale d\'un Fichier

La taille maximale d\'un fichier est déterminée par ce schéma. Prenons un exemple typique avec des blocs de 4 Ko et des adresses de bloc de 4 octets. Un bloc d\'indirection peut donc contenir 4096/4=1024 pointeurs.

- 12 pointeurs directs : 12×4 Ko=48 Ko

- 1 pointeur simple indirect : 1024×4 Ko=4 Mo

- 1 pointeur double indirect : 1024×1024×4 Ko=4 Go

- 1 pointeur triple indirect : 1024×1024×1024×4 Ko=4 To

La taille maximale théorique du fichier est la somme de ces capacités, soit un peu plus de 4 To.

### 8. Résilience et Fiabilité des Données

Un système de fichiers doit être robuste face aux pannes, qu\'elles soient logicielles (crash du SE) ou matérielles (panne de courant). Sans mécanismes de protection, de telles pannes peuvent laisser la structure du disque dans un état corrompu et incohérent.

#### 8.1 Le Problème de l\'Incohérence des Données suite à une Panne

Une opération de haut niveau, comme la création d\'un fichier, se traduit par une séquence de plusieurs écritures disque de bas niveau : allouer un inode depuis la liste des inodes libres, écrire les données dans un bloc de données, marquer ce bloc comme utilisé dans le bitmap d\'espace libre, et ajouter une entrée \<nom, inode\> dans le répertoire. Si une panne survient au milieu de cette séquence, le système de fichiers se retrouve dans un état incohérent. Par exemple, un bloc peut être marqué comme utilisé mais n\'appartenir à aucun fichier (une fuite d\'espace), ou un inode peut être alloué mais non référencé par un répertoire (un fichier orphelin). Après un redémarrage, la vérification et la réparation de ces incohérences à l\'aide d\'outils comme

fsck (sous Unix) ou CHKDSK (sous Windows) peuvent être extrêmement longues sur des disques de grande capacité.

#### 8.2 La Journalisation : Principe du Write-Ahead Logging (WAL)

Pour résoudre ce problème, les systèmes de fichiers modernes ont emprunté une technique aux bases de données : la journalisation, basée sur le principe du **Write-Ahead Logging (WAL)**. L\'idée est de transformer les opérations complexes en transactions atomiques.

Le principe est le suivant : avant d\'effectuer les modifications sur les structures principales du système de fichiers, le SGF écrit une description de toutes les modifications qu\'il s\'apprête à faire dans un fichier spécial, séquentiel et optimisé pour l\'ajout : le journal.62

Une fois que l\'enregistrement de la transaction est écrit de manière sécurisée dans le journal, la transaction est considérée comme \"validée\" (committed). Le système peut alors, à son rythme, appliquer ces changements aux structures de données réelles du disque.

En cas de crash, au redémarrage, le système n\'a pas besoin d\'analyser l\'intégralité du disque. Il lui suffit de lire la fin du journal. Les transactions qui ont été entièrement écrites dans le journal mais peut-être pas encore appliquées au système de fichiers sont simplement rejouées (*redo*). Les transactions qui étaient en cours d\'écriture dans le journal au moment de la panne sont incomplètes et sont simplement ignorées (*undo*). Ce processus de récupération est beaucoup plus rapide, ramenant le système de fichiers à un état cohérent en quelques secondes, quelle que soit sa taille. La journalisation transforme ainsi une opération potentiellement interruptible en une opération \"tout ou rien\", garantissant l\'atomicité.

#### 8.3 Modes de Journalisation (Exemple : ext3/ext4)

Les systèmes de fichiers journalisés offrent souvent des compromis entre la robustesse et la performance, à travers différents modes de journalisation  :

- **Mode Journal :** C\'est le mode le plus sûr. Les métadonnées et les données du fichier sont écrites dans le journal avant d\'être écrites à leur emplacement final. Cela garantit une cohérence totale, mais au prix d\'une performance réduite, car toutes les données sont écrites deux fois.

- **Mode Ordered :** C\'est le mode par défaut dans de nombreuses implémentations, comme ext3. Seules les modifications des métadonnées sont écrites dans le journal. Cependant, le système garantit que les blocs de données correspondants sont écrits sur le disque *avant* que la transaction de métadonnées ne soit validée dans le journal. C\'est un excellent compromis, prévenant les incohérences majeures sans la surcharge de la double écriture des données.

- **Mode Writeback :** C\'est le mode le plus rapide. Seules les métadonnées sont journalisées, et il n\'y a aucune garantie sur l\'ordre d\'écriture des données et des métadonnées. Après un crash, la structure du système de fichiers sera cohérente, mais il est possible que des fichiers que l\'on pensait sauvegardés contiennent d\'anciennes données, ou des données aléatoires.

#### 8.4 Approches Alternatives : Le Copy-on-Write (CoW)

Une autre approche pour garantir la cohérence est le **Copy-on-Write (CoW)**, utilisée par des systèmes de fichiers avancés comme ZFS et Btrfs. Au lieu de modifier les données et les métadonnées en place, toute modification entraîne l\'écriture des nouvelles données dans de nouveaux blocs libres sur le disque. Une fois toutes les nouvelles données écrites, les métadonnées de plus haut niveau sont mises à jour de manière atomique pour pointer vers ces nouveaux blocs. L\'ancienne version des données reste intacte jusqu\'à ce que la mise à jour soit complète. Ce mécanisme rend le système de fichiers intrinsèquement résistant aux pannes : en cas de crash, le système de fichiers redémarre simplement sur la dernière version cohérente. Le CoW facilite également la création d\'instantanés (*snapshots*) du système de fichiers, qui sont quasi instantanés.

#### 8.5 Vérification et Réparation du Système de Fichiers

Même avec des mécanismes de protection robustes, des erreurs peuvent survenir (par exemple, à cause de secteurs défectueux sur le disque). Des utilitaires comme fsck (sous Linux/Unix) et CHKDSK (sous Windows) sont conçus pour parcourir l\'ensemble des structures de métadonnées d\'un système de fichiers, vérifier leur cohérence (par exemple, s\'assurer que chaque bloc alloué appartient à un seul fichier, que les compteurs de liens des inodes sont corrects) et tenter de réparer les erreurs détectées.

