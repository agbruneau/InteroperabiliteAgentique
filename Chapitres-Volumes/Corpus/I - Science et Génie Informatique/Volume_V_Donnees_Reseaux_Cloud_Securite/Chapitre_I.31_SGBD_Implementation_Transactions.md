# Chapitre I.31 : SGBD - Implémentation et Transactions

## Introduction : Sous le Capot du Moteur de Base de Données

Dans les chapitres précédents de cet ouvrage, nous avons abordé les systèmes de gestion de base de données (SGBD) principalement sous l\'angle de l\'utilisateur et du concepteur d\'applications. Nous avons exploré les modèles de données, en particulier le modèle relationnel, et maîtrisé le langage SQL pour définir, manipuler et interroger les données. À ce stade, le SGBD peut encore apparaître comme une \"boîte noire\" sophistiquée : une entité logicielle qui accepte des requêtes déclaratives et retourne des résultats de manière fiable et, espérons-le, rapide. Or, la performance, la robustesse et la fiabilité des applications les plus critiques de notre société numérique --- des systèmes bancaires aux plateformes de commerce électronique, en passant par les infrastructures de réservation mondiales --- reposent entièrement sur les mécanismes complexes et hautement optimisés qui opèrent au cœur de ces moteurs de bases de données.

Ce chapitre a pour ambition de lever le voile sur cette complexité. Nous allons délaisser la perspective de l\'utilisateur pour adopter celle de l\'ingénieur système qui conçoit, implémente et optimise le moteur d\'un SGBD. Notre objectif est de disséquer les algorithmes et les structures de données fondamentaux qui permettent à un SGBD de remplir sa mission. Nous ne nous contenterons plus de savoir *quoi* fait un SGBD, mais nous chercherons à comprendre en détail *comment* il le fait.

La première transition conceptuelle majeure que nous opérerons est celle du modèle logique à la réalité physique. Le modèle relationnel, avec son élégante abstraction de tables, de n-uplets et de relations, est une construction mathématique. L\'implémentation, elle, doit composer avec les contraintes bien réelles du matériel : la lenteur relative des disques durs, la volatilité de la mémoire vive et la nécessité de gérer des volumes de données qui excèdent de plusieurs ordres de grandeur la capacité de la mémoire centrale. Le SGBD agit comme un médiateur essentiel, un traducteur qui masque cette complexité et présente une vue logique et cohérente des données, tout en orchestrant leur stockage physique de la manière la plus performante possible.

Pour ce faire, notre exploration s\'articulera autour de trois piliers fondamentaux qui constituent l\'architecture interne de tout SGBD transactionnel moderne :

> **L\'organisation des données :** Comment les données sont-elles physiquement structurées sur des supports de stockage persistants? Nous verrons que l\'unité de base n\'est pas le n-uplet, mais la *page*, et nous analyserons en profondeur les structures d\'index, notamment les Arbres B+, qui sont spécifiquement conçues pour minimiser les coûteuses opérations d\'entrées/sorties (E/S) disque.
>
> **Le traitement des requêtes :** Comment une requête SQL, qui décrit le résultat désiré de manière déclarative, est-elle transformée en une procédure efficace pour l\'obtenir? Nous suivrons le cycle de vie d\'une requête, de son analyse syntaxique à sa transformation en un plan d\'exécution physique, en nous attardant sur le rôle central de l\'optimiseur de requêtes, le véritable \"cerveau\" du SGBD. Nous disséquerons les algorithmes concrets utilisés pour implémenter les opérations relationnelles, comme les différentes stratégies de jointure.
>
> **La gestion transactionnelle :** Comment le SGBD garantit-il la fiabilité de ses opérations, même en présence de multiples utilisateurs accédant aux mêmes données simultanément (concurrence) et face à des pannes matérielles ou logicielles inévitables? Nous définirons le concept de transaction et ses propriétés fondamentales, connues sous l\'acronyme ACID. Nous étudierons ensuite en détail les deux sous-systèmes qui les mettent en œuvre : le gestionnaire de contrôle de la concurrence, qui assure l\'isolation des transactions, et le gestionnaire de reprise après panne, qui garantit leur atomicité et leur durabilité.

En pénétrant au cœur de ces mécanismes, nous découvrirons que la conception d\'un SGBD est un art de l\'ingénierie système, un exercice permanent d\'arbitrage entre des objectifs souvent contradictoires : performance contre cohérence, concurrence contre simplicité, utilisation de la mémoire contre E/S disque. Comprendre ces compromis est essentiel non seulement pour les concepteurs de SGBD, mais aussi pour les développeurs d\'applications et les administrateurs de bases de données qui cherchent à exploiter au maximum le potentiel de ces systèmes complexes.

## 31.1 Stockage et Indexation : L\'Organisation Physique des Données

La première responsabilité d\'un SGBD est de stocker et de retrouver des données de manière fiable et efficace. Alors que le modèle logique présente les données sous forme de tables et de relations, la réalité physique est celle de milliards d\'octets organisés sur des supports de stockage persistants, typiquement des disques magnétiques ou des disques SSD. La performance de l\'ensemble du système dépend de manière critique de la manière dont cette organisation physique est conçue et gérée. Cette section explore les fondements de la gestion du stockage et les structures de données spécialisées, les index, qui permettent de naviguer dans de vastes ensembles de données sans avoir à les parcourir séquentiellement.

### 31.1.1 La Hiérarchie de la Mémoire et la Gestion du Stockage par Pages

Au cœur de la conception de tout moteur de base de données se trouve une contrainte matérielle fondamentale : l\'existence d\'une hiérarchie de la mémoire. Cette hiérarchie est caractérisée par une opposition entre la vitesse d\'accès et le coût par octet des différents types de stockage. À un extrême, nous avons la mémoire vive (RAM), extrêmement rapide mais volatile et relativement chère. À l\'autre, nous trouvons les mémoires secondaires comme les disques SSD et les disques durs magnétiques (HDD), qui offrent un stockage persistant et bon marché, mais dont les temps d\'accès sont de plusieurs ordres de grandeur plus lents.

#### Le Coût des E/S Disque : Le Goulet d\'Étranglement Dominant

Le facteur de performance le plus critique dans un SGBD traitant de grands volumes de données est le coût des opérations d\'entrées/sorties (E/S) disque. Accéder à une donnée en RAM se mesure en nanosecondes (10−9 s), tandis qu\'un accès aléatoire sur un disque dur se mesure en millisecondes (10−3 s). Cette différence de performance, d\'un facteur de

105 à 106, signifie qu\'une seule E/S disque peut coûter autant de temps CPU que l\'exécution de millions d\'instructions. Par conséquent, l\'objectif premier de l\'architecture de stockage d\'un SGBD est de minimiser le nombre d\'accès au disque. Toute la conception des structures de données, des algorithmes et des stratégies de mise en cache est subordonnée à cet impératif.

Les données sur disque sont stockées et accédées non pas octet par octet, mais par blocs de taille fixe. Le temps d\'accès à un bloc sur un disque dur se décompose en trois parties : le temps de recherche (seek time) pour positionner la tête de lecture/écriture sur la bonne piste, la latence rotationnelle pour attendre que le secteur désiré passe sous la tête, et le temps de transfert pour lire ou écrire les données. Les deux premiers termes, qui constituent l\'essentiel du coût d\'un accès aléatoire, sont indépendants de la quantité de données transférées. Il est donc beaucoup plus efficace de lire un bloc de 4 Ko ou 8 Ko en une seule fois que de lire un seul octet. Cette caractéristique physique motive directement l\'unité de gestion de stockage des SGBD : la page.

#### L\'Abstraction de la Page

Pour gérer efficacement le stockage et s\'aligner sur les caractéristiques du matériel, les SGBD organisent l\'espace disque alloué à la base de données en une collection de blocs de taille fixe, appelés **pages** (ou parfois blocs). La taille d\'une page est un paramètre de configuration du SGBD, typiquement de 4 Ko, 8 Ko ou 16 Ko. La page est l\'unité atomique de transfert d\'information entre la mémoire secondaire (disque) et la mémoire principale (RAM). Lorsqu\'un SGBD a besoin de lire un seul n-uplet, il doit charger en mémoire la page entière qui le contient. De même, lorsqu\'il modifie un n-uplet, c\'est la page entière qui sera éventuellement réécrite sur le disque.

Cette abstraction permet au SGBD de gérer l\'espace disque comme un ensemble de conteneurs de taille fixe, simplifiant l\'allocation et la désallocation d\'espace. Les structures de données internes, comme les tables et les index, sont elles-mêmes organisées en collections de pages. Une table est une séquence de pages, et chaque page contient un ensemble de n-uplets.

#### Le Gestionnaire de Tampons (Buffer Manager)

Puisque les E/S disque sont si coûteuses, il est impensable d\'aller sur le disque pour chaque lecture ou écriture demandée par une requête. Pour pallier ce problème, le SGBD maintient en mémoire vive une zone de cache appelée le **pool de tampons** (*buffer pool*). Ce pool est un ensemble de trames de mémoire (*frames*), chacune capable de contenir une page disque. Le sous-système responsable de la gestion de ce cache est le **gestionnaire de tampons** (*buffer manager*).

Le gestionnaire de tampons est le seul composant du SGBD autorisé à lire et écrire des pages sur le disque. Les autres composants du système (le moteur d\'exécution des requêtes, le gestionnaire de transactions, etc.) interagissent avec lui pour accéder aux données. Lorsqu\'un composant a besoin d\'accéder à une page, il en fait la demande au gestionnaire de tampons. Le déroulement est le suivant :

> **Demande de page :** Le moteur d\'exécution demande la page P.
>
> **Vérification du cache :** Le gestionnaire de tampons vérifie si P est déjà présente dans une trame du buffer pool.
>
> **Cache Hit :** Si P est en mémoire, on parle de *cache hit*. Le gestionnaire de tampons retourne simplement un pointeur vers la trame mémoire contenant P. C\'est le cas le plus rapide.
>
> Cache Miss : Si P n\'est pas en mémoire (cache miss), le gestionnaire de tampons doit la charger depuis le disque.\
> a. Il doit d\'abord trouver une trame libre dans le buffer pool.\
> b. S\'il n\'y a pas de trame libre, il doit choisir une page \"victime\" à évincer du cache en utilisant une politique de remplacement. La politique la plus courante est LRU (Least Recently Used), qui évince la page qui n\'a pas été accédée depuis le plus longtemps.\
> c. Si la page victime a été modifiée en mémoire depuis son chargement (elle est dite \"sale\" ou dirty), elle doit être réécrite sur le disque avant que sa trame puisse être réutilisée. C\'est une opération d\'écriture.\
> d. Une fois une trame libre disponible, le gestionnaire de tampons effectue une E/S de lecture pour charger la page P du disque dans cette trame.\
> e. Il retourne ensuite le pointeur vers la trame mémoire.

Le gestionnaire de tampons joue donc un rôle absolument central dans la performance. Une bonne gestion du cache, qui maximise le taux de *cache hits*, permet de satisfaire la majorité des demandes de données directement depuis la RAM, évitant ainsi le goulet d\'étranglement du disque. La taille du buffer pool est l\'un des paramètres de configuration les plus importants pour un SGBD, car elle détermine directement la capacité du système à éviter les E/S.

### 31.1.2 Indexation par Arbres B+ : La Structure Optimale pour les E/S Disque

Avoir un mécanisme de cache efficace est nécessaire, mais pas suffisant. Si une requête demande de trouver un client par son nom dans une table contenant des millions d\'enregistrements, et que le SGBD ne sait pas où se trouve ce client, il n\'a d\'autre choix que de lire séquentiellement toutes les pages de la table une par une. C\'est ce qu\'on appelle un **balayage de table complet** (*full table scan*). Même avec un bon buffer manager, cette opération est prohibitivement coûteuse pour les grandes tables.

Pour résoudre ce problème, les SGBD utilisent des structures de données auxiliaires appelées **index**. Un index sur un ou plusieurs attributs d\'une table est une structure qui permet de localiser rapidement les n-uplets ayant une valeur donnée pour ces attributs, sans avoir à examiner toute la table. C\'est l\'équivalent de l\'index à la fin d\'un livre, qui permet de trouver rapidement les pages où un mot spécifique est mentionné. Parmi les nombreuses structures d\'index possibles, une s\'est imposée comme la norme dans la quasi-totalité des SGBD relationnels pour l\'indexation générale : l\'

**Arbre B+** (*B+ Tree*).

La conception des Arbres B et de leur variante, les Arbres B+, n\'est pas un hasard. Elle est une réponse directe et élégante aux contraintes imposées par la hiérarchie de la mémoire. Chaque aspect de leur structure est optimisé pour minimiser le nombre d\'E/S disque nécessaires pour les opérations de recherche, d\'insertion et de suppression.

#### Structure de l\'Arbre B+

Un Arbre B+ est un arbre de recherche équilibré. Ses propriétés fondamentales sont les suivantes :

> **Alignement sur les Pages Disque et Facteur de Branchement Élevé :** La caractéristique la plus importante est que chaque nœud de l\'arbre (qu\'il soit interne ou une feuille) est conçu pour occuper exactement la taille d\'une page disque. Puisqu\'une page peut stocker plusieurs milliers d\'octets, un nœud peut contenir un très grand nombre de paires (clé, pointeur). Le nombre maximum de pointeurs sortant d\'un nœud est appelé l\'\
> **ordre** ou le **facteur de branchement** (*fan-out*) de l\'arbre. Un facteur de branchement élevé, souvent de l\'ordre de plusieurs centaines, est la clé de l\'efficacité de l\'Arbre B+.
>
> **Arbre Équilibré et Peu Profond :** Les algorithmes d\'insertion et de suppression garantissent que l\'arbre reste toujours équilibré, c\'est-à-dire que toutes les feuilles se trouvent à la même profondeur. Combiné à un facteur de branchement très élevé, cela signifie que l\'arbre est extrêmement peu profond. Par exemple, un Arbre B+ d\'ordre 100 et de hauteur 3 peut indexer plus de\
> 1003=1 million d\'enregistrements. Une hauteur 4 peut en indexer 100 millions. La recherche d\'une clé implique de traverser un chemin de la racine à une feuille, ce qui requiert un nombre d\'E/S disque égal à la hauteur de l\'arbre. Une faible hauteur minimise donc directement le nombre d\'accès disque. Pour une base de données contenant des milliards de lignes, une recherche par index B+ ne nécessite généralement que 3 ou 4 E/S disque, contre des millions pour un balayage de table.
>
> **Nœuds Internes vs Nœuds Feuilles :** Une distinction clé entre un Arbre B et un Arbre B+ réside dans le contenu de ses nœuds.

Dans un **Arbre B+**, les **nœuds internes** contiennent uniquement des clés de séparation et des pointeurs vers des nœuds enfants. Leur rôle est purement de guider la recherche. Par exemple, une entrée (K, P) dans un nœud interne signifie que pour trouver une clé de recherche V où V\<K, il faut suivre le pointeur à gauche de K, et pour V≥K, il faut suivre le pointeur P.

Les **nœuds feuilles**, en revanche, stockent les clés de recherche ainsi que les données associées. Ces \"données\" peuvent être soit les n-uplets complets (dans le cas d\'un *index clusterisé*), soit des pointeurs (comme des identifiants de ligne, ou RID) vers les n-uplets stockés ailleurs (dans le cas d\'un *index secondaire*). Le fait de ne stocker que des clés de navigation dans les nœuds internes permet de maximiser leur facteur de branchement.

> **Chaînage des Feuilles :** C\'est la caractéristique la plus distinctive de l\'Arbre B+. Tous les nœuds feuilles sont liés entre eux par des pointeurs pour former une liste doublement chaînée, triée par ordre de clé. Cette structure est extraordinairement efficace pour les\
> **requêtes par intervalle** (par exemple, SELECT \* FROM Employes WHERE salaire BETWEEN 50000 AND 60000). Une fois que la recherche a localisé la première clé de l\'intervalle dans un nœud feuille (en quelques E/S), le SGBD peut simplement suivre les pointeurs de la liste chaînée pour parcourir séquentiellement toutes les clés de l\'intervalle, sans jamais avoir à remonter dans l\'arbre. Cela transforme des E/S aléatoires potentiellement coûteuses en un balayage séquentiel très rapide au niveau des feuilles.

L\'alignement des structures de données sur les contraintes matérielles est le principe directeur de la performance du stockage. Les Arbres B+ ne sont pas choisis au hasard ; leur conception est une réponse directe au goulet d\'étranglement que représentent les E/S disque. L\'idée de faire correspondre la taille d\'un nœud à celle d\'une page disque est fondamentale. Cela signifie qu\'une seule E/S disque charge une unité de travail maximale pour l\'algorithme. Le facteur de branchement élevé, conséquence directe de cette correspondance, minimise la hauteur de l\'arbre et donc le nombre total d\'E/S pour une recherche. C\'est une illustration parfaite de la co-conception matériel-logiciel au niveau des algorithmes.

#### Opérations sur les Arbres B+

Les opérations sur un Arbre B+ sont conçues pour maintenir ses propriétés d\'équilibre et d\'occupation des nœuds.

> **Recherche :** La recherche d\'une clé k commence à la racine. À chaque nœud interne, on compare k avec les clés du nœud pour déterminer quel pointeur enfant suivre. Ce processus est répété jusqu\'à atteindre un nœud feuille. Une fois dans le nœud feuille, on recherche k parmi les clés présentes.
>
> **Insertion :** Pour insérer une paire (clé, valeur), on commence par rechercher le nœud feuille approprié où la clé devrait être insérée.

Si le nœud feuille a de la place, on insère la paire en maintenant l\'ordre des clés.

Si le nœud feuille est plein, une opération de **division** (*split*) est nécessaire. Le nœud est divisé en deux nouveaux nœuds feuilles. La moitié des entrées reste dans le nœud d\'origine, l\'autre moitié est déplacée dans le nouveau nœud. La première clé du nouveau nœud est ensuite \"promue\" : une copie de cette clé est insérée dans le nœud parent, avec un pointeur vers le nouveau nœud feuille.

Cette insertion dans le parent peut elle-même provoquer une division si le parent est plein. Le processus de division peut donc se propager vers le haut, jusqu\'à la racine. Si la racine elle-même est divisée, un nouveau nœud racine est créé, et la hauteur de l\'arbre augmente de un. C\'est la seule façon pour l\'arbre de grandir en hauteur.

> **Suppression :** Pour supprimer une entrée, on la localise d\'abord dans un nœud feuille.

On la supprime du nœud feuille.

Si, après la suppression, le nombre de clés dans le nœud tombe en dessous du seuil minimum d\'occupation (généralement la moitié de la capacité maximale), le nœud est en sous-occupation.

Pour corriger cela, on tente d\'abord une **redistribution** avec un nœud frère adjacent. Si le frère a des clés en surplus, on \"emprunte\" une clé en la faisant passer par le parent.

Si la redistribution est impossible (le frère est également au minimum), on procède à une **fusion** (*merge*). Le nœud en sous-occupation est fusionné avec un frère adjacent. Cela implique de retirer une clé de séparation du nœud parent.

Cette suppression dans le parent peut le mettre en sous-occupation, propageant potentiellement le processus de fusion vers la racine. Si la racine devient vide (avec un seul enfant), cet enfant devient la nouvelle racine, et la hauteur de l\'arbre diminue de un.

### 31.1.3 Indexation par Hachage : Accès Direct et Adaptabilité

Alors que les Arbres B+ sont optimisés pour les recherches par clé et par intervalle, une autre famille de structures d\'index, basée sur le **hachage**, excelle dans un domaine : l\'accès direct pour les recherches d\'égalité parfaite (par exemple, SELECT \* FROM Produits WHERE id_produit = \'X123\').

Le principe du hachage est simple : une **fonction de hachage** h est appliquée à la clé de recherche k. Le résultat, h(k), est interprété comme l\'adresse d\'un **seau** (*bucket*), qui est typiquement une ou plusieurs pages disque, où l\'enregistrement correspondant est stocké. En théorie, cela permet de retrouver un enregistrement en une seule E/S disque, quel que soit le nombre total d\'enregistrements. Cependant, cette simplicité cache des défis, notamment la gestion des collisions (lorsque deux clés différentes sont hachées vers le même seau) et l\'adaptation de la structure à mesure que le volume de données change.

#### Hachage Statique

Le schéma de hachage le plus simple est le hachage statique. Lors de la création de l\'index, un nombre fixe N de seaux est alloué. La fonction de hachage h(k) retourne une valeur entre 0 et N-1. Tous les enregistrements dont la clé est hachée à la même valeur i sont placés dans le seau i.

Le principal inconvénient du hachage statique est son manque de flexibilité. Si le nombre d\'enregistrements augmente de manière significative, les seaux deviendront pleins. Les nouveaux enregistrements devront être placés dans des **pages de débordement** (*overflow pages*), créant des chaînes de pages liées. La recherche d\'un enregistrement peut alors dégénérer en un parcours séquentiel de ces chaînes, annulant l\'avantage de l\'accès en une seule E/S. Inversement, si le nombre d\'enregistrements diminue, de nombreux seaux seront presque vides, gaspillant de l\'espace disque. Toute modification du nombre de seaux nécessite une réorganisation complète et coûteuse de l\'ensemble du fichier.

#### Hachage Dynamique

Pour surmonter les limitations du hachage statique, des techniques de hachage dynamique ont été développées. Elles permettent à la structure de l\'index de croître et de se réduire gracieusement en fonction du volume de données, sans nécessiter de réorganisation globale. Les deux schémas les plus connus sont le hachage extensible et le hachage linéaire.

##### Hachage Extensible (Extendible Hashing)

Le hachage extensible résout le problème du débordement en utilisant une couche d\'indirection : un **répertoire** (*directory*). Le répertoire est un tableau de pointeurs vers les seaux. La taille du répertoire est une puissance de 2, déterminée par une valeur appelée la

**profondeur globale** d. Si la profondeur globale est d, le répertoire a 2d entrées.

La fonction de hachage h(k) produit une chaîne de bits. Pour trouver le seau d\'une clé k, on utilise les d premiers bits de h(k) comme index dans le répertoire. Le pointeur à cet index nous donne l\'adresse du seau.

Chaque seau est associé à une **profondeur locale** d\'. La profondeur locale d\' indique le nombre de bits de préfixe partagés par toutes les clés présentes dans ce seau. Plusieurs entrées du répertoire peuvent pointer vers le même seau. Plus précisément, 2(d−d′) entrées du répertoire pointeront vers un seau de profondeur locale d\'.

Le mécanisme de croissance est le suivant  :

> **Insertion :** On insère un enregistrement dans son seau approprié.
>
> **Débordement :** Si le seau est plein, il doit être divisé.
>
> **Division du seau :** Un nouveau seau est alloué. La profondeur locale d\' des deux seaux (l\'ancien et le nouveau) est incrémentée (d\' = d\' + 1). Les enregistrements de l\'ancien seau sont redistribués entre les deux seaux en fonction du nouveau d\'-ième bit de leur clé hachée.
>
> **Mise à jour du répertoire :**

**Cas 1 : d\' \<= d (la nouvelle profondeur locale est inférieure ou égale à la profondeur globale).** Aucune modification de la taille du répertoire n\'est nécessaire. On met simplement à jour la moitié des pointeurs du répertoire qui pointaient vers l\'ancien seau pour qu\'ils pointent maintenant vers le nouveau seau.

**Cas 2 : d\' \> d (la nouvelle profondeur locale dépasse la profondeur globale).** C\'est le cas où le seau qui a débordé était le seul à être pointé par son entrée de répertoire. Avant de mettre à jour les pointeurs, il faut **doubler la taille du répertoire**. La profondeur globale d est incrémentée (d = d + 1). Chaque ancienne entrée i du répertoire est dupliquée dans les nouvelles entrées i et i + 2\^{d-1}. Ensuite, on procède à la mise à jour des pointeurs comme dans le cas 1.

L\'avantage principal du hachage extensible est qu\'il ne génère jamais de chaînes de débordement. Une recherche nécessite au plus deux E/S : une pour lire l\'entrée du répertoire (si le répertoire ne tient pas en mémoire) et une pour lire le seau de données. Son principal inconvénient est la taille potentiellement grande du répertoire, qui peut doubler à chaque fois qu\'un seau \"critique\" déborde, surtout si la distribution des clés est très inégale.

##### Hachage Linéaire (Linear Hashing)

Le hachage linéaire est une alternative ingénieuse qui évite l\'utilisation d\'un répertoire centralisé. Il permet une croissance graduelle, un seau à la fois. La structure maintient deux informations d\'état : un

**niveau d\'éclatement** P (initialement 0) et un **pointeur de division** (*split pointer*) next (initialement pointant vers le seau 0). Le nombre de seaux au début est N_0. À tout moment, il y a N_0 \* 2\^P + next seaux dans le fichier.

Deux fonctions de hachage sont utilisées : hP​(k)=h(k)(modN0​⋅2P) et hP+1​(k)=h(k)(modN0​⋅2P+1).

Le mécanisme de croissance est le suivant  :

> **Insertion :** Pour insérer une clé k, on calcule son adresse. Si hP​(k) est supérieur ou égal à next, le seau est hP​(k). Sinon (si le seau a déjà été divisé dans ce round), l\'adresse est hP+1​(k).
>
> **Débordement :** Lorsqu\'une insertion provoque un débordement dans *n\'importe quel* seau (pas nécessairement celui pointé par next), une page de débordement est ajoutée à ce seau. De plus, une opération de division est déclenchée.
>
> **Division :** Le seau pointé par next est divisé, qu\'il soit plein ou non. Un nouveau seau est alloué à la fin du fichier. Les enregistrements du seau next (et de ses éventuelles pages de débordement) sont redistribués entre le seau next et le nouveau seau en utilisant la fonction hP+1​.
>
> **Avancement du pointeur :** Le pointeur next est incrémenté.
>
> **Nouveau round :** Lorsque next atteint N0​⋅2P, tous les seaux du niveau P ont été divisés. Le pointeur next est réinitialisé à 0, et le niveau P est incrémenté.

L\'avantage du hachage linéaire est sa croissance graduelle et l\'absence de répertoire. Son inconvénient est qu\'il nécessite la gestion de chaînes de débordement, car le seau qui déborde n\'est généralement pas celui qui est divisé immédiatement. Cependant, ces chaînes sont temporaires et sont résorbées au fur et à mesure que le pointeur de division progresse.

Le choix entre l\'indexation par arbre et par hachage est un arbitrage fondamental entre l\'accès par intervalle et l\'accès direct. Les Arbres B+ excellent pour les recherches par intervalle (WHERE age BETWEEN 20 AND 30) grâce au chaînage des feuilles, qui permet un balayage séquentiel efficace. Les méthodes de hachage sont, par nature, inefficaces pour ce type de requête car les clés proches ne sont pas nécessairement stockées dans des seaux adjacents. En revanche, pour une recherche d\'égalité parfaite (

WHERE id = 123), le hachage offre potentiellement un accès en une seule E/S, ce qui est imbattable. Un SGBD doit donc souvent maintenir les deux types d\'index sur une même table pour optimiser différents types de requêtes, illustrant qu\'il n\'y a pas de solution unique, mais un ensemble d\'outils spécialisés à la disposition de l\'optimiseur.

  --------------------------------- -------------------------------------------------------------- ---------------------------------------------------------- ------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------
  Caractéristique                   Arbre B+                                                       Hachage Statique                                           Hachage Extensible                                                                                     Hachage Linéaire

  **Coût Recherche (Égalité)**      O(logF​N) E/S                                                   O(1) E/S (idéal), peut se dégrader avec les débordements   O(1) ou O(2) E/S                                                                                       O(1) E/S (amorti), peut se dégrader temporairement

  **Coût Recherche (Intervalle)**   Très efficace (balayage des feuilles)                          Très inefficace (balayage de tout le fichier)              Très inefficace                                                                                        Très inefficace

  **Coût Insertion/Suppression**    O(logF​N) E/S                                                   O(1) E/S (sans débordement)                                O(1) ou O(2) E/S (amorti, sans doublement du répertoire)                                               O(1) E/S (amorti)

  **Gestion de la Croissance**      Naturelle (divisions/fusions)                                  Aucune (nécessite réorganisation complète)                 Adaptative (doublement du répertoire)                                                                  Graduelle (division d\'un seau à la fois)

  **Utilisation de l\'Espace**      Bonne (occupation minimale garantie)                           Peut être faible ou nécessiter beaucoup de débordements    Bonne, mais le répertoire peut être grand                                                              Bonne, avec des débordements temporaires

  **Cas d\'Usage Idéal**            Indexation générale, requêtes par égalité et par intervalle.   Fichiers de taille fixe et connue à l\'avance.             Fichiers dynamiques avec accès par clé unique, où la taille du répertoire n\'est pas une contrainte.   Fichiers dynamiques où une croissance graduelle et prédictible est souhaitée.
  --------------------------------- -------------------------------------------------------------- ---------------------------------------------------------- ------------------------------------------------------------------------------------------------------ -------------------------------------------------------------------------------

## 31.2 Traitement et Optimisation des Requêtes : De la Déclaration à l\'Exécution

Une fois les données physiquement organisées sur disque et dotées d\'index pour un accès rapide, le défi suivant pour un SGBD est de répondre efficacement aux requêtes des utilisateurs. Le langage SQL est *déclaratif* : l\'utilisateur spécifie *quel* résultat il souhaite obtenir, mais pas *comment* l\'obtenir. Par exemple, pour joindre trois tables A, B et C, il existe de multiples ordres d\'exécution possibles ((A ⋈ B) ⋈ C, A ⋈ (B ⋈ C), etc.) et pour chaque jointure, plusieurs algorithmes peuvent être utilisés. L\'ensemble de ces choix constitue un

**plan d\'exécution**. La différence de performance entre un bon et un mauvais plan peut être de plusieurs ordres de grandeur. Le sous-système chargé de cette tâche monumentale --- traduire une requête déclarative en un plan d\'exécution physique optimal --- est le **processeur de requêtes**. Il est souvent considéré comme le composant le plus complexe et le plus important d\'un SGBD relationnel moderne.

### 31.2.1 Le Cycle de Vie d\'une Requête SQL

Le parcours d\'une requête SQL, depuis sa soumission par un client jusqu\'à l\'exécution de son plan, se décompose en plusieurs phases distinctes.

> **Analyse Syntaxique (Parsing) :** La première étape consiste à traiter la requête, qui n\'est initialement qu\'une simple chaîne de caractères. L\'**analyseur syntaxique** (ou *parser*) vérifie que la requête respecte la grammaire du langage SQL. Si la syntaxe est valide, l\'analyseur transforme la chaîne de caractères en une représentation interne structurée, généralement un **arbre de syntaxe abstraite** (*abstract syntax tree* ou AST). Cet arbre représente la structure logique de la requête, identifiant les clauses (\
> SELECT, FROM, WHERE), les opérateurs, les expressions et les littéraux.
>
> **Validation Sémantique :** L\'arbre de syntaxe est ensuite soumis à une phase de validation. Le SGBD consulte son **catalogue système** (aussi appelé dictionnaire de données) pour effectuer des vérifications sémantiques. Le catalogue contient les méta-données de la base : les schémas, les noms des tables et des vues, les colonnes de chaque table avec leur type de données, les contraintes d\'intégrité, les informations sur les index, etc. Les vérifications incluent :

L\'existence des tables et des vues référencées dans la clause FROM.

L\'existence des colonnes référencées dans les clauses SELECT, WHERE, GROUP BY, etc., et leur appartenance aux bonnes tables.

La compatibilité des types de données dans les comparaisons et les opérations (par exemple, on ne peut pas comparer une chaîne de caractères à une date sans conversion explicite ou implicite).

La vérification des droits d\'accès de l\'utilisateur sur les objets concernés.

> **Transformation en Algèbre Relationnelle :** Si la requête est sémantiquement valide, elle est transformée en une représentation interne basée sur l\'algèbre relationnelle. Cette représentation est souvent un arbre où les nœuds sont des opérateurs de l\'algèbre relationnelle (sélection σ, projection π, jointure ⋈, etc.) et les feuilles sont les tables de la base de données. Cet arbre représente un\
> **plan d\'exécution logique** initial. Il décrit les opérations à effectuer, mais pas encore la manière concrète de les exécuter. Par exemple, il spécifie une jointure, mais pas si elle doit être réalisée par un algorithme de boucles imbriquées ou de hachage. C\'est le point de départ du processus d\'optimisation.

### 31.2.2 L\'Optimiseur de Requêtes : Le Cerveau du SGBD

Le plan d\'exécution logique initial, directement issu de la traduction de la requête SQL, est rarement le plus efficace. Le rôle de l\'**optimiseur de requêtes** est d\'explorer l\'espace des plans d\'exécution logiquement équivalents pour trouver un plan d\'exécution physique qui minimise une fonction de coût, généralement une estimation du temps d\'exécution total. L\'espace de recherche étant exponentiel, l\'optimiseur ne peut pas se permettre d\'explorer tous les plans possibles. Il utilise une combinaison de techniques heuristiques et d\'estimations basées sur les coûts pour converger rapidement vers un bon plan.

#### Optimisation Algébrique (Heuristique)

La première phase de l\'optimisation consiste souvent à appliquer des **règles de réécriture algébrique**. Ces règles transforment un arbre de requête en un autre arbre logiquement équivalent, c\'est-à-dire qui produit exactement le même résultat. L\'objectif est d\'appliquer des transformations qui sont presque toujours bénéfiques.

L\'heuristique la plus fondamentale et la plus puissante est de **\"pousser les sélections et les projections le plus bas possible dans l\'arbre de requête\"**. L\'idée est de réduire la taille des données intermédiaires le plus tôt possible dans le pipeline d\'exécution.

> **Pousser les sélections :** Une sélection (clause WHERE) est l\'opérateur le plus réducteur. La réaliser avant une jointure, qui est une opération très coûteuse, signifie que la jointure manipulera beaucoup moins de n-uplets. Par exemple, l\'expression σcond​(R⋈S) est beaucoup plus coûteuse que (σcond​(R))⋈S si la condition cond ne porte que sur des attributs de R.
>
> **Pousser les projections :** De même, une projection (clause SELECT) qui élimine des colonnes doit être effectuée le plus tôt possible. Cela réduit la largeur des n-uplets intermédiaires, ce qui diminue la quantité de données à stocker en mémoire ou dans des fichiers temporaires, et réduit la bande passante nécessaire pour les transférer entre opérateurs.

Ces transformations heuristiques permettent de \"nettoyer\" le plan logique initial et de le préparer pour la phase d\'optimisation basée sur les coûts.

#### Optimisation Basée sur les Coûts (Cost-Based Optimization - CBO)

L\'approche dominante dans les SGBD modernes est l\'optimisation basée sur les coûts (CBO). Après l\'optimisation heuristique, il reste souvent de nombreux choix à faire : quel est le meilleur ordre pour joindre trois tables ou plus? Pour une jointure donnée, quel algorithme (Nested-Loop, Sort-Merge, Hash) utiliser? Pour une sélection, faut-il utiliser un index ou faire un balayage de table?

Pour répondre à ces questions, l\'optimiseur énumère un sous-ensemble de plans d\'exécution candidats, estime le **coût** de chacun, et choisit celui dont le coût estimé est le plus faible.

> **Le Modèle de Coût :** Le \"coût\" n\'est pas un temps d\'exécution réel, mais une valeur numérique calculée par un modèle mathématique. Ce modèle vise à prédire la consommation de ressources. Il est généralement une fonction pondérée de deux composantes principales :

**Coût des E/S :** Le nombre de pages disque qui devront être lues ou écrites. C\'est souvent le facteur dominant.

Coût CPU : Le nombre d\'instructions CPU estimé, par exemple pour comparer des clés, hacher des valeurs, etc.\
D\'autres facteurs, comme le coût de la communication réseau dans un système distribué, peuvent également être inclus.

> **Le Rôle Crucial des Statistiques :** Pour que le modèle de coût puisse produire des estimations réalistes, il doit connaître les caractéristiques des données. L\'optimiseur s\'appuie donc sur des **statistiques** détaillées sur la base de données, que le SGBD collecte et stocke dans son catalogue système. Ces statistiques incluent :

Pour chaque table : le nombre de n-uplets (N) et le nombre de pages (P).

Pour chaque colonne de chaque table : la **cardinalité** (le nombre de valeurs distinctes), les valeurs minimale et maximale.

Des informations plus détaillées sur la distribution des données, comme des **histogrammes**, qui divisent l\'intervalle des valeurs d\'une colonne en plusieurs \"paniers\" et comptent le nombre de n-uplets dans chaque panier.

À l\'aide de ces statistiques, l\'optimiseur peut estimer la **sélectivité** d\'un prédicat. La sélectivité est la fraction de n-uplets qui satisfont une condition (par exemple, WHERE age = 30). Une sélectivité de 0.01 signifie que la condition filtre 99% des données. En multipliant le nombre de n-uplets d\'une table par la sélectivité estimée de ses prédicats, l\'optimiseur peut estimer la taille des résultats intermédiaires à chaque étape d\'un plan d\'exécution. Ces estimations de taille sont ensuite injectées dans les formules de coût de chaque opérateur pour calculer le coût total du plan.

L\'optimisation des requêtes peut être vue comme un exercice de modélisation économique sous contrainte. L\'optimiseur ne cherche pas le plan *parfait*, car l\'exploration de tout l\'espace des plans serait un problème NP-difficile. Il cherche plutôt un plan *suffisamment bon* dans un temps raisonnable, en faisant un arbitrage entre le temps passé à optimiser et la qualité du plan final. Les statistiques sont les \"données de marché\" de ce modèle économique. Des statistiques obsolètes ou manquantes conduisent à de mauvaises estimations de coût et, par conséquent, à des choix de plans sous-optimaux. La performance d\'une base de données dépend donc de manière critique de la qualité de son modèle économique interne et de la fraîcheur de ses données.

### 31.2.3 Algorithmes d\'Implémentation des Opérateurs de Jointure

La jointure est l\'une des opérations les plus fondamentales et les plus coûteuses du modèle relationnel. Le choix de l\'algorithme de jointure a un impact considérable sur la performance d\'une requête. L\'optimiseur doit choisir parmi plusieurs implémentations possibles, chacune ayant ses propres caractéristiques de coût, de prérequis en mémoire et de cas d\'usage optimaux. Nous allons analyser en détail les trois principaux algorithmes de jointure.

#### Nested-Loop Join (Jointure par Boucles Imbriquées)

C\'est l\'algorithme le plus simple et le plus général, car il peut implémenter n\'importe quel type de prédicat de jointure (pas seulement l\'égalité). Son principe est, comme son nom l\'indique, basé sur deux boucles imbriquées.

> **Algorithme Simple (Tuple-based) :**\
> Pour chaque n-uplet r dans la table externe R\
> Pour chaque n-uplet s dans la table interne S\
> Si r et s satisfont le prédicat de jointure\
> Ajouter (r, s) au résultat\
> \
> Cet algorithme est extrêmement inefficace en termes d\'E/S. Si la table R a NR​ n-uplets et occupe PR​ pages, et la table S a NS​ n-uplets et PS​ pages, le coût en E/S est approximativement PR​+(NR​×PS​). Pour chaque n-uplet de R, nous devons balayer entièrement la table S. Ce coût est prohibitif pour des tables de taille conséquente.
>
> Block Nested-Loop Join (Page-based) :\
> Une amélioration significative consiste à raisonner en termes de pages (ou de blocs de pages) plutôt que de n-uplets.\
> Pour chaque bloc de pages b_r de la table externe R\
> Pour chaque bloc de pages b_s de la table interne S\
> Pour chaque n-uplet r dans b_r\
> Pour chaque n-uplet s dans b_s\
> Si r et s satisfont le prédicat de jointure\
> Ajouter (r, s) au résultat\
> \
> Le coût en E/S devient PR​+(PR​×PS​). C\'est mieux, mais reste très élevé. L\'optimisation consiste à allouer le plus de mémoire possible pour charger un maximum de pages de la table externe R, afin de réduire le nombre de fois où la table interne S doit être balayée. Si la plus petite des deux tables (disons R) peut tenir entièrement en mémoire, le coût devient PR​+PS​, car chaque table n\'est lue qu\'une seule fois.
>
> Index Nested-Loop Join :\
> C\'est la variante la plus puissante. Si un index existe sur l\'attribut de jointure de la table interne S, l\'algorithme change radicalement.30\
> Pour chaque n-uplet r dans la table externe R\
> Utiliser la valeur de l\'attribut de jointure de r pour sonder l\'index sur S\
> Pour chaque n-uplet s correspondant trouvé via l\'index\
> Ajouter (r, s) au résultat\
> \
> Au lieu d\'un balayage complet de S pour chaque n-uplet de R, on effectue une recherche rapide via l\'index. Le coût est approximativement PR​+(NR​×couˆt de la recherche par index). Si l\'index est très sélectif (chaque recherche retourne peu de n-uplets), cet algorithme est extrêmement efficace. Il est souvent choisi par l\'optimiseur pour les jointures où l\'une des tables est petite et l\'autre a un index efficace sur la colonne de jointure.

#### Sort-Merge Join (Jointure par Tri-Fusion)

Cet algorithme est très efficace pour les équi-jointures, en particulier lorsque les tables à joindre sont déjà triées sur les attributs de jointure. Il se déroule en deux phases.

> **Phase de Tri (Sort) :** Si les tables R et S ne sont pas déjà triées sur leurs attributs de jointure, elles sont triées. Pour des tables qui ne tiennent pas en mémoire, cela implique un algorithme de tri externe, qui est lui-même une opération coûteuse en E/S.
>
> **Phase de Fusion (Merge) :** Une fois les deux tables triées, la jointure peut être calculée en un seul passage. On utilise deux pointeurs, un pour chaque table, initialisés au début.\
> ptr_R = premier n-uplet de R triée\
> ptr_S = premier n-uplet de S triée\
> Tant que ptr_R et ptr_S ne sont pas à la fin :\
> Si clé(ptr_R) \< clé(ptr_S) : avancer ptr_R\
> Sinon si clé(ptr_R) \> clé(ptr_S) : avancer ptr_S\
> Sinon (les clés sont égales) :\
> // Un groupe de correspondances a été trouvé\
> Pour chaque n-uplet r\' à partir de ptr_R avec la même clé\
> Pour chaque n-uplet s\' à partir de ptr_S avec la même clé\
> Ajouter (r\', s\') au résultat\
> Avancer ptr_R et ptr_S au-delà du groupe de correspondances

Le coût de la phase de fusion est linéaire : PR​+PS​. Le coût total de l\'algorithme est donc dominé par le coût du tri externe, s\'il est nécessaire. L\'optimiseur choisit souvent cet algorithme si une ou les deux tables sont déjà triées (par exemple, via un index clusterisé) ou si le résultat de la requête doit être trié sur les attributs de jointure de toute façon (clause ORDER BY), car le coût du tri peut être amorti.

#### Hash Join (Jointure par Hachage)

La jointure par hachage est souvent l\'algorithme le plus performant pour les équi-jointures de grandes tables, à condition qu\'il y ait suffisamment de mémoire vive disponible. Comme la jointure par tri-fusion, elle se déroule en deux phases.

> **Phase de Construction (Build) :** L\'optimiseur choisit la plus petite des deux tables (disons R) comme table de construction. Le SGBD lit entièrement la table R et construit une **table de hachage** en mémoire, en utilisant l\'attribut de jointure comme clé de hachage.
>
> **Phase de Sondage (Probe) :** Le SGBD lit ensuite la seconde table (la plus grande, S), n-uplet par n-uplet. Pour chaque n-uplet s de S, il applique la même fonction de hachage à son attribut de jointure et sonde la table de hachage construite à l\'étape 1 pour trouver les n-uplets de R correspondants. Si une correspondance est trouvée, les n-uplets sont joints et ajoutés au résultat.

Si la table de hachage de la table R peut tenir entièrement en mémoire, le coût en E/S est simplement le coût de lecture des deux tables, soit PR​+PS​. C\'est le cas le plus efficace. Si la table de construction est trop grande pour la mémoire, des variantes plus complexes (comme le *Grace Hash Join* ou le *Hybrid Hash Join*) sont utilisées. Elles partitionnent les deux tables sur disque en utilisant une fonction de hachage, puis effectuent la jointure par hachage en mémoire sur chaque paire de partitions correspondantes.

La structure d\'un plan d\'exécution physique peut être comprise comme un pipeline de données. Les opérations à la base de l\'arbre (les feuilles) sont les accès aux tables (balayages, recherches par index). Chaque opérateur parent consomme les n-uplets produits par ses enfants, les transforme (filtre, joint, agrège) et produit un nouveau flux de n-uplets pour l\'opérateur suivant, jusqu\'à la racine qui produit le résultat final. L\'objectif de l\'optimiseur est de minimiser le volume total de données qui transitent dans ce pipeline, en appliquant les opérations les plus réductrices (sélectives) le plus tôt possible dans le processus.

  --------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------
  Caractéristique             Nested-Loop Join (Indexé)                                                                                                                                                        Sort-Merge Join                                                                                            Hash Join

  **Principe**                Pour chaque n-uplet externe, recherche les correspondances dans la table interne via un index.                                                                                   Trie les deux tables sur la clé de jointure, puis les fusionne en un seul passage.                         Construit une table de hachage en mémoire sur la plus petite table, puis sonde cette table avec la plus grande.

  **Coût en E/S (Typique)**   \$P_R + (N_R \\times \\text{coût_index})\$                                                                                                                                       O(PR​logPR​+PS​logPS​) si tri nécessaire ; O(PR​+PS​) si déjà trié.                                              O(PR​+PS​) si la table de hachage tient en mémoire.

  **Prérequis Mémoire**       Très faible.                                                                                                                                                                     Modéré (pour les tampons de tri externe).                                                                  Élevé (doit contenir la table de hachage de la plus petite table).

  **Condition de Jointure**   N\'importe quelle condition (=,\<,\>,LIKE, etc.).                                                                                                                                Équi-jointure (=), mais peut être adapté pour d\'autres inégalités.                                        Équi-jointure (=) uniquement.

  **Avantages**               Très efficace pour les jointures très sélectives (jointure d\'une table principale avec une petite table de recherche). Très faible latence pour obtenir les premières lignes.   Efficace si les entrées sont déjà triées. Produit un résultat trié, ce qui peut éviter un tri ultérieur.   L\'algorithme le plus rapide pour les grosses équi-jointures lorsque la mémoire est suffisante. Se parallélise très bien.

  **Inconvénients**           Très inefficace si l\'index n\'est pas sélectif ou si la table externe est grande.                                                                                               Le coût du tri externe peut être très élevé s\'il est nécessaire.                                          Nécessite une quantité de mémoire significative. Moins efficace si la table de hachage ne tient pas en mémoire (débordement sur disque).
  --------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------

## 31.3 Gestion des Transactions et Propriétés ACID : Le Contrat de Fiabilité

Au-delà du stockage et du traitement efficace des requêtes, la mission la plus fondamentale d\'un SGBD est de garantir l\'intégrité et la fiabilité des données qu\'il gère. Dans un environnement multi-utilisateurs où de nombreuses applications peuvent tenter de lire et de modifier les mêmes données simultanément, et où les pannes matérielles ou logicielles sont une réalité inévitable, le SGBD doit fournir un mécanisme robuste pour s\'assurer que la base de données reste dans un état cohérent et que les modifications validées ne sont jamais perdues. Ce mécanisme est la **transaction**. Le concept de transaction et les garanties qu\'il offre, connues sous l\'acronyme **ACID**, sont la pierre angulaire de la fiabilité dans le monde des bases de données.

### 31.3.1 La Transaction : Une Unité de Travail Logique

Dans le contexte d\'un SGBD, une **transaction** est une séquence d\'opérations de base de données (lectures, insertions, mises à jour, suppressions) qui sont regroupées pour former une seule **unité de travail logique et atomique**. Du point de vue du SGBD et de l\'utilisateur, cette séquence d\'opérations doit être traitée comme un tout indivisible. L\'objectif d\'une transaction est de faire passer la base de données d\'un état cohérent à un autre état, lui aussi cohérent.

Prenons un exemple classique : un virement bancaire de 100 \$ du compte A au compte B. Cette opération logique se décompose en au moins deux opérations de base de données :

> UPDATE Comptes SET solde = solde - 100 WHERE id_compte = \'A\';
>
> UPDATE Comptes SET solde = solde + 100 WHERE id_compte = \'B\';

Il est impératif que ces deux opérations soient exécutées ensemble. Si le système subissait une panne après la première opération mais avant la seconde, 100 \$ auraient \"disparu\" du système, laissant la base de données dans un état incohérent. La transaction encapsule ces deux mises à jour en une seule unité. Soit les deux réussissent, soit aucune des deux n\'a d\'effet permanent.

Pour permettre aux applications de contrôler ces unités de travail, le langage SQL fournit des primitives de contrôle de transaction  :

> BEGIN TRANSACTION (ou START TRANSACTION) : Marque le début d\'une nouvelle transaction. Toutes les opérations suivantes feront partie de cette transaction.
>
> COMMIT : Termine la transaction avec succès. Toutes les modifications effectuées au sein de la transaction sont rendues permanentes dans la base de données et deviennent visibles pour les autres utilisateurs.
>
> ROLLBACK : Termine la transaction en annulant toutes ses modifications. La base de données est restaurée à l\'état exact où elle se trouvait avant le début de la transaction.

En l\'absence de BEGIN TRANSACTION explicite, de nombreux SGBD fonctionnent en mode \"autocommit\", où chaque instruction SQL est traitée comme une transaction implicite d\'une seule opération, immédiatement suivie d\'un COMMIT. Pour regrouper plusieurs opérations, il est nécessaire de désactiver ce mode ou de commencer explicitement une transaction.

### 31.3.2 Les Piliers de la Fiabilité : Les Propriétés ACID

Pour qu\'une transaction soit considérée comme fiable, elle doit respecter quatre propriétés fondamentales, dont les initiales forment l\'acronyme **ACID**. Ces propriétés constituent le \"contrat de fiabilité\" qu\'un SGBD transactionnel offre à ses utilisateurs.

#### A - Atomicité (Atomicity)

> **Principe du \"Tout ou Rien\" :** L\'atomicité garantit qu\'une transaction est une unité indivisible. Soit toutes les opérations de la transaction sont exécutées avec succès et validées, soit, en cas d\'échec (erreur, panne, ROLLBACK explicite), aucune de ses modifications n\'est conservée dans la base de données. Il ne peut y avoir d\'état intermédiaire persistant où seulement une partie de la transaction a été appliquée. Dans notre exemple de virement bancaire, l\'atomicité assure qu\'il est impossible que le débit soit effectué sans que le crédit ne le soit également.
>
> **Implémentation :** L\'atomicité est principalement la responsabilité du **gestionnaire de reprise après panne** du SGBD. Pour ce faire, le système maintient un **journal des transactions** (log). Avant de modifier une donnée, le SGBD enregistre dans le journal l\'ancienne valeur de la donnée (l\'image \"avant\"). Si la transaction doit être annulée, le SGBD peut utiliser ces informations pour défaire (UNDO) toutes les modifications effectuées. Ce mécanisme, que nous détaillerons dans la section 31.5, garantit que même en cas de crash brutal, le système peut, au redémarrage, annuler les transactions qui n\'avaient pas été complétées.

#### C - Cohérence (Consistency)

> **Principe de Validité :** La propriété de cohérence stipule qu\'une transaction doit faire passer la base de données d\'un état valide à un autre état valide. Un \"état valide\" est un état où toutes les règles d\'intégrité définies sur les données sont respectées. Ces règles incluent les contraintes définies dans le schéma :

Contraintes de domaine (types de données).

Contraintes d\'unicité (clés primaires, UNIQUE).

Contraintes d\'intégrité référentielle (clés étrangères).

Contraintes de vérification (CHECK).

Assertions et déclencheurs (*triggers*).

> **Implémentation :** La cohérence est une responsabilité partagée entre le SGBD et l\'application.

**Cohérence au niveau du SGBD :** Le SGBD est responsable de garantir que toute transaction qui viole une contrainte d\'intégrité explicite est automatiquement annulée. Si une transaction tente d\'insérer une clé primaire en double ou de supprimer une ligne référencée par une clé étrangère, le SGBD lèvera une erreur et effectuera un ROLLBACK.

**Cohérence au niveau de l\'application :** Le SGBD ne peut pas garantir la cohérence sémantique ou métier, qui dépend de la logique de l\'application. Dans l\'exemple du virement, la contrainte métier implicite est que la somme totale des soldes des comptes A et B doit rester constante. Le SGBD ne peut pas vérifier cette règle de lui-même. C\'est au développeur de s\'assurer que le code de la transaction est correct et préserve cette cohérence. La propriété de cohérence ACID signifie donc que le SGBD fournit un environnement fiable (grâce à A, I et D) dans lequel une transaction correctement écrite peut maintenir la cohérence sémantique des données.

#### I - Isolation (Isolation)

> **Principe d\'Indépendance :** L\'isolation garantit que l\'exécution concurrente de plusieurs transactions produit le même résultat que si ces transactions avaient été exécutées les unes après les autres, dans un certain ordre sériel. Chaque transaction doit s\'exécuter comme si elle était seule sur le système. Les états intermédiaires et les modifications non encore validées d\'une transaction en cours doivent être invisibles aux autres transactions. L\'isolation prévient les interférences entre transactions concurrentes, qui peuvent mener à des anomalies comme les lectures sales ou les mises à jour perdues.
>
> **Implémentation :** L\'isolation est la responsabilité du **gestionnaire de contrôle de la concurrence**. Les deux principales techniques utilisées pour implémenter l\'isolation sont :

**Le verrouillage (Locking) :** Les transactions doivent acquérir des verrous sur les données qu\'elles souhaitent lire ou modifier. Ces verrous empêchent les autres transactions d\'accéder aux données de manière conflictuelle. Le protocole le plus courant est le **verrouillage à deux phases (2PL)**.

Le contrôle de concurrence multi-version (MVCC) : Au lieu de verrouiller, le système maintient plusieurs versions des données. Chaque transaction lit un \"instantané\" cohérent de la base de données tel qu\'il existait au moment de son démarrage.\
Ces mécanismes seront étudiés en détail dans la section 31.4.

#### D - Durabilité (Durability)

> **Principe de Persistance :** La durabilité garantit qu\'une fois qu\'une transaction a été validée avec succès (COMMIT), ses modifications sont permanentes et survivront à toute panne ultérieure, qu\'il s\'agisse d\'une panne de courant, d\'un crash du système d\'exploitation ou du SGBD lui-même. Une fois que l\'application a reçu la confirmation du\
> COMMIT, elle peut être certaine que les données sont en sécurité.
>
> **Implémentation :** Comme l\'atomicité, la durabilité est assurée par le **gestionnaire de reprise après panne** et son journal de transactions. La technique fondamentale est la **journalisation en écriture anticipée** (*Write-Ahead Logging* ou WAL). Le protocole WAL stipule qu\'une transaction ne peut être considérée comme validée que lorsque l\'enregistrement de journal décrivant son COMMIT (ainsi que tous les enregistrements de ses modifications) a été écrit de manière persistante sur un support stable (disque). Ainsi, même si les pages de données modifiées elles-mêmes ne sont encore qu\'en mémoire vive au moment d\'une panne, le journal contient toutes les informations nécessaires pour les rejouer (\
> REDO) lors du redémarrage du système et garantir que les effets de la transaction validée sont bien appliqués.

Les propriétés ACID ne sont pas des fonctionnalités indépendantes, mais un système de garanties interdépendantes. Elles sont profondément liées et implémentées par des sous-systèmes qui collaborent étroitement. L\'**Atomicité** (la capacité de faire un ROLLBACK) et la **Durabilité** (la capacité de survivre à un crash après un COMMIT) sont les deux faces d\'une même pièce, toutes deux gérées par le système de reprise sur panne (journalisation + algorithmes de reprise comme ARIES). L\'**Isolation** est le domaine exclusif du contrôle de concurrence. La **Cohérence**, quant à elle, est la propriété la plus abstraite : elle repose sur le fait que l\'atomicité, l\'isolation et la durabilité fonctionnent correctement, permettant ainsi à une transaction sémantiquement correcte écrite par un développeur de maintenir l\'intégrité de la base. ACID n\'est pas une simple liste de fonctionnalités ; c\'est un contrat de fiabilité holistique qui fait la force des SGBD transactionnels.

## 31.4 Contrôle de la Concurrence : Orchestrer les Accès Simultanés

L\'un des principaux avantages d\'un SGBD est de permettre à de multiples utilisateurs et applications d\'accéder et de modifier les données simultanément. Cette capacité, appelée

**concurrence**, est essentielle pour la performance et la réactivité des systèmes modernes. Cependant, autoriser des accès concurrents non contrôlés aux mêmes données peut conduire à des résultats incorrects et à une corruption de la base de données. Le **gestionnaire de contrôle de la concurrence** est le composant du SGBD chargé d\'orchestrer l\'entrelacement des opérations des différentes transactions de manière à garantir la propriété d\'**Isolation** du modèle ACID. Son objectif est de préserver la cohérence de la base de données tout en maximisant le degré de parallélisme possible entre les transactions.

### 31.4.1 Le Problème de la Concurrence et la Sérialisabilité

Lorsque plusieurs transactions s\'exécutent en parallèle, leurs opérations (lectures et écritures) peuvent s\'entrelacer dans le temps. Si cet entrelacement n\'est pas correctement géré, plusieurs types d\'**anomalies de concurrence** peuvent survenir, violant l\'isolation et compromettant l\'intégrité des données.

#### Anomalies de Concurrence

Illustrons les anomalies les plus courantes avec un exemple. Soient deux transactions, T1 et T2, opérant sur deux comptes bancaires, A et B, dont les soldes initiaux sont Solde(A) = 1000 et Solde(B) = 2000.

> Mise à jour perdue (Lost Update) :\
> T1 et T2 veulent toutes deux ajouter 100 au solde de A.

T1 lit Solde(A) (valeur 1000).

T2 lit Solde(A) (valeur 1000).

T1 calcule 1000 + 100 = 1100 et écrit Solde(A) = 1100.

T2 calcule 1000 + 100 = 1100 et écrit Solde(A) = 1100.\
Le résultat final est 1100, alors qu\'il devrait être 1200. La mise à jour de T1 a été \"perdue\", écrasée par celle de T2.35

> Lecture sale (Dirty Read) :\
> T1 transfère 100 de A à B. T2 calcule la somme des soldes.

T1 écrit Solde(A) = 900.

T2 lit Solde(A) (valeur 900).

T2 lit Solde(B) (valeur 2000) et calcule la somme 900 + 2000 = 2900.

T1 échoue pour une raison quelconque et effectue un ROLLBACK, restaurant Solde(A) à 1000.\
T2 a basé son calcul sur une donnée (le solde de 900) qui a été annulée et n\'a donc \"jamais existé\" de manière permanente. C\'est une lecture d\'une donnée non encore validée (\"sale\").50

> Lecture non reproductible (Non-Repeatable Read) :\
> T1 lit le solde de A deux fois. Entre-temps, T2 effectue un retrait.

T1 lit Solde(A) (valeur 1000).

T2 écrit Solde(A) = 900 et effectue un COMMIT.

T1 relit Solde(A) et obtient maintenant 900.\
Au sein de la même transaction T1, la même lecture a produit deux résultats différents, ce qui peut être problématique pour des calculs complexes. La lecture n\'est pas \"reproductible\".50

> Lecture fantôme (Phantom Read) :\
> T1 veut compter le nombre d\'employés dans le département \'Ventes\'. T2 embauche un nouvel employé.

T1 exécute SELECT COUNT(\*) FROM Employes WHERE dept = \'Ventes\' et obtient, disons, 10.

T2 insère un nouvel employé dans le département \'Ventes\' et effectue un COMMIT.

T1 ré-exécute la même requête SELECT COUNT(\*) et obtient maintenant 11.\
Une nouvelle ligne, un \"fantôme\", est apparue dans l\'ensemble de résultats de T1. C\'est une forme plus subtile de lecture non reproductible qui concerne des ensembles de lignes plutôt qu\'une seule ligne.37

#### La Sérialisabilité comme Critère de Correction

Pour éviter ces anomalies, le contrôle de concurrence doit garantir une propriété appelée **sérialisabilité**. Une exécution (ou *historique*) de plusieurs transactions concurrentes est dite **sérialisable** si son résultat final et son effet sur la base de données sont équivalents à ceux d\'une *certaine* exécution sérielle (non entrelacée) de ces mêmes transactions.

Par exemple, si T1 et T2 s\'exécutent en concurrence, l\'historique est sérialisable s\'il est équivalent soit à l\'exécution de T1 suivie de T2, soit à l\'exécution de T2 suivie de T1. La sérialisabilité est le plus haut niveau d\'isolation ; elle garantit l\'absence totale d\'anomalies. L\'objectif de l\'ordonnanceur du SGBD est donc de ne permettre que des exécutions sérialisables.

#### Sérialisabilité par Conflit et Graphe de Précédence

Comment déterminer si une exécution est sérialisable sans avoir à tester toutes les exécutions sérielles possibles? La notion de **sérialisabilité par conflit** fournit un critère pratique.

Deux opérations, opi​(X) de la transaction Ti​ et opj​(Y) de la transaction Tj​ (i=j), sont dites en **conflit** si elles accèdent à la même donnée (X=Y) et si au moins l\'une d\'entre elles est une opération d\'écriture (WRITE). Les trois types de conflits sont :

> READ-WRITE : Ti​ lit X, puis Tj​ écrit X.
>
> WRITE-READ : Ti​ écrit X, puis Tj​ lit X (c\'est le conflit qui cause les lectures sales).
>
> WRITE-WRITE : Ti​ écrit X, puis Tj​ écrit X (c\'est le conflit qui cause les mises à jour perdues).

Un historique est **sérialisable par conflit** s\'il peut être transformé en un historique sériel en inversant l\'ordre d\'opérations adjacentes non conflictuelles.

Un outil formel pour tester la sérialisabilité par conflit est le **graphe de précédence** (ou graphe de conflit). Pour un historique donné, on construit un graphe orienté où les nœuds sont les transactions. On ajoute un arc de Ti​ vers Tj​ si une opération de Ti​ précède et est en conflit avec une opération de Tj​.

**Théorème :** Un historique est sérialisable par conflit si et seulement si son graphe de précédence est acyclique.

Si le graphe est acyclique, un tri topologique des nœuds donne un ordre d\'exécution sériel équivalent. Si le graphe contient un cycle (par exemple, Ti​→Tj​→Ti​), cela signifie qu\'il existe une dépendance circulaire qui ne peut être résolue dans aucun ordre sériel. L\'historique n\'est donc pas sérialisable.

### 31.4.2 Verrouillage à Deux Phases (Two-Phase Locking - 2PL)

Le **verrouillage à deux phases (2PL)** est le mécanisme de contrôle de concurrence le plus classique et le plus répandu pour garantir la sérialisabilité. C\'est une approche **pessimiste** : elle part du principe que des conflits sont probables et oblige les transactions à acquérir des verrous sur les données *avant* de pouvoir y accéder, afin de prévenir les conflits.

#### Le Protocole

Le protocole 2PL stipule que chaque transaction doit gérer ses verrous en deux phases distinctes et non chevauchantes  :

> **Phase de Croissance (Growing/Expanding Phase) :** Durant cette phase, la transaction peut acquérir de nouveaux verrous (par exemple, demander un verrou sur une ligne avant de la lire). Elle peut également \"promouvoir\" un verrou, par exemple passer d\'un verrou de lecture à un verrou d\'écriture. Cependant, elle n\'a pas le droit de relâcher le moindre verrou.
>
> **Phase de Décroissance (Shrinking Phase) :** Une fois que la transaction a relâché son premier verrou, elle entre dans la phase de décroissance. Durant cette phase, elle peut relâcher des verrous, mais il lui est strictement interdit d\'en acquérir de nouveaux.

Le moment où la transaction acquiert son dernier verrou et s\'apprête à n\'effectuer que des relâchements est appelé le **point de verrouillage** (*lock point*) de la transaction. C\'est à ce point que la transaction est \"sérialisée\" par rapport aux autres. Il a été prouvé que si toutes les transactions respectent le protocole 2PL, alors tout historique autorisé par l\'ordonnanceur est sérialisable.

#### Types de Verrous

Le protocole 2PL de base utilise deux types de verrous  :

> **Verrou Partagé (Shared Lock, S-lock) :** Une transaction doit détenir un S-lock sur un objet pour pouvoir le lire. Plusieurs transactions peuvent détenir un S-lock sur le même objet simultanément. Un S-lock est donc un \"verrou de lecture\".
>
> **Verrou Exclusif (Exclusive Lock, X-lock) :** Une transaction doit détenir un X-lock sur un objet pour pouvoir l\'écrire (modifier, insérer, supprimer). Une seule transaction peut détenir un X-lock sur un objet à un instant donné. Un X-lock est donc un \"verrou d\'écriture\".

La gestion de ces verrous est régie par une **matrice de compatibilité** :

  ---------------- ------------------------------------------- --------------- ---------------
  Verrou Demandé   Verrou Détenu (par une autre transaction)   S-lock          X-lock

  **S-lock**                                                   Compatible      Incompatible

  **X-lock**                                                   Incompatible    Incompatible
  ---------------- ------------------------------------------- --------------- ---------------

Lorsqu\'une transaction demande un verrou incompatible avec un verrou déjà détenu, elle est mise en attente jusqu\'à ce que le verrou soit relâché.

#### Variantes du 2PL

Le protocole 2PL de base garantit la sérialisabilité, mais il n\'empêche pas certains problèmes comme les **annulations en cascade** (*cascading rollbacks*). Si une transaction T1 lit une donnée modifiée par T2 avant que T2 ne valide, et que T2 finit par faire un ROLLBACK, alors T1 doit aussi être annulée car elle a lu une donnée \"sale\". Pour éviter cela, des variantes plus strictes sont utilisées en pratique :

> **Strict 2PL :** C\'est la variante la plus courante. Elle suit la règle du 2PL, mais avec une contrainte supplémentaire : une transaction ne doit relâcher ses verrous **exclusifs (X-locks)** qu\'après avoir terminé, c\'est-à-dire après son COMMIT ou son ROLLBACK. Cela empêche toute autre transaction de lire ou d\'écrire une donnée modifiée avant que la décision finale (commit/rollback) ne soit prise, éliminant ainsi les lectures sales et les annulations en cascade.
>
> **Rigorous 2PL (ou Strong Strict 2PL) :** C\'est une version encore plus stricte qui exige que **tous** les verrous (S-locks et X-locks) soient détenus jusqu\'à la fin de la transaction. Cela simplifie l\'implémentation et offre les mêmes garanties que le Strict 2PL.

#### Interblocages (Deadlocks)

Le principal inconvénient du verrouillage est le risque d\'**interblocage** (ou *deadlock*). Un interblocage est une situation de blocage mutuel où deux ou plusieurs transactions s\'attendent cycliquement les unes les autres pour relâcher des verrous.

Exemple :

> T1 acquiert un X-lock sur l\'objet A.
>
> T2 acquiert un X-lock sur l\'objet B.
>
> T1 demande un X-lock sur B. Elle est mise en attente, car T2 détient le verrou.
>
> T2 demande un X-lock sur A. Elle est mise en attente, car T1 détient le verrou.

À ce stade, T1 attend T2 et T2 attend T1. Aucune des deux ne peut progresser. Pour gérer les interblocages, les SGBD utilisent une stratégie de détection et de résolution.

> **Détection par Graphe d\'Attente (Wait-for Graph) :** Le SGBD maintient dynamiquement un **graphe d\'attente**, une structure de données où les nœuds représentent les transactions actives et un arc orienté de Ti​ vers Tj​ signifie que Ti​ est en attente d\'un verrou détenu par Tj​. Le SGBD vérifie périodiquement ce graphe à la recherche de cycles. Un cycle dans le graphe d\'attente est la signature d\'un interblocage.
>
> **Résolution :** Lorsqu\'un cycle est détecté, le SGBD doit le briser. Pour ce faire, il choisit une des transactions du cycle comme **victime**. La transaction victime est annulée (ROLLBACK), ce qui libère tous ses verrous et permet aux autres transactions du cycle de continuer. Le choix de la victime est basé sur des heuristiques, comme choisir la transaction la plus jeune, celle qui a effectué le moins de travail, ou celle qui détient le moins de verrous, afin de minimiser le coût de l\'annulation.

### 31.4.3 Contrôle de Concurrence Multi-Version (MVCC)

Le **contrôle de concurrence multi-version (MVCC)** est une approche alternative au verrouillage, de nature **optimiste**. L\'idée fondamentale du MVCC est de ne jamais écraser les données. Au lieu de cela, chaque opération d\'écriture crée une nouvelle **version** de l\'objet de donnée, tout en conservant l\'ancienne. Cette approche vise à augmenter la concurrence en permettant aux opérations de lecture de se dérouler sans jamais être bloquées par des opérations d\'écriture, et vice-versa. Des SGBD comme PostgreSQL, Oracle et InnoDB (le moteur de MySQL) sont basés sur le MVCC.

#### Principe de Fonctionnement

> **Versionnement des Données :** Chaque n-uplet dans la base de données n\'est pas simplement une valeur, mais un objet versionné. Chaque version est typiquement estampillée avec des informations transactionnelles, comme l\'identifiant de la transaction qui l\'a créée (xmin) et l\'identifiant de la transaction qui l\'a \"supprimée\" ou rendue obsolète (xmax). Une mise à jour (UPDATE) est traitée comme une suppression (DELETE) de l\'ancienne version suivie d\'une insertion (INSERT) de la nouvelle version.
>
> **Instantanés (Snapshots) :** Le cœur du MVCC est le concept d\'**instantané**. Lorsqu\'une transaction démarre, le SGBD lui fournit une \"photographie\" de la base de données à cet instant précis. Cette photographie est définie par l\'ensemble des transactions qui étaient déjà validées au moment où la transaction a commencé. Une transaction ne peut voir que les versions de n-uplets créées par des transactions validées avant son démarrage. Elle ne verra jamais les modifications (même validées) de transactions qui ont commencé après elle, ni les modifications non validées de transactions concurrentes.

#### Gestion des Opérations

> **Lectures :** Une opération de lecture par une transaction T ne nécessite aucun verrou. Le SGBD parcourt les versions des n-uplets et retourne celle qui est \"visible\" pour l\'instantané de T. Une version est visible si elle a été créée par une transaction validée avant le début de T et n\'a pas été supprimée par une transaction validée avant le début de T. Les lectures ne bloquent donc jamais les écritures.
>
> **Écritures :** Une opération d\'écriture (par exemple, UPDATE) par une transaction T crée une nouvelle version du n-uplet, estampillée avec l\'ID de T. L\'ancienne version est marquée comme obsolète par l\'ID de T. Les écritures ne bloquent pas les lectures, car les autres transactions continueront de voir l\'ancienne version jusqu\'à ce que T valide.
>
> **Gestion des Conflits Écriture-Écriture :** Le MVCC est optimiste, mais il doit quand même gérer les conflits entre deux transactions qui tentent de modifier le même n-uplet. Si T1 modifie un n-uplet, puis T2 tente de modifier le *même* n-uplet avant que T1 n\'ait validé, T2 sera généralement bloquée (via un verrou léger) en attendant le sort de T1. Si T1 et T2 modifient le même n-uplet et tentent de valider, le conflit est détecté. Typiquement, la première transaction qui tente de valider réussit, tandis que la seconde est annulée avec une erreur de \"conflit de sérialisation\" et doit être réessayée par l\'application.

#### Avantages et Inconvénients

> **Avantages :**

**Haute Concurrence :** \"Les lecteurs ne bloquent pas les écrivains, et les écrivains ne bloquent pas les lecteurs.\" C\'est un avantage majeur pour les charges de travail mixtes (OLTP) avec beaucoup de lectures.

**Moins d\'Interblocages :** Les interblocages liés aux conflits lecture-écriture sont éliminés.

> **Inconvénients :**

**Surcharge de Stockage :** Le maintien de multiples versions des n-uplets consomme plus d\'espace disque.

**Nettoyage (Garbage Collection) :** Le SGBD doit périodiquement exécuter un processus de \"nettoyage\" (souvent appelé VACUUM dans PostgreSQL) pour identifier et supprimer les versions de n-uplets qui ne sont plus visibles par aucune transaction active. Ce processus a son propre coût en termes de performance.

**Complexité de la gestion des conflits :** La détection des conflits de sérialisation (write-write) peut être plus complexe que dans un système à verrouillage pur.

Le contrôle de la concurrence illustre un arbitrage fondamental en ingénierie de bases de données : celui entre le pessimisme et l\'optimisme. Le 2PL est intrinsèquement pessimiste, supposant que les conflits sont fréquents et verrouillant les données préventivement. Le coût de cette prudence est la latence due à l\'attente et le risque d\'interblocages. Le MVCC est optimiste, supposant que les conflits sont rares. Il maximise le parallélisme en laissant les transactions travailler sur leurs propres versions et ne vérifie les conflits qu\'à la fin. Le coût de cet optimisme est la complexité de la gestion des versions et l\'annulation de transactions en cas de conflit tardif. Le choix d\'implémentation d\'un SGBD reflète une philosophie sur les charges de travail qu\'il vise à servir.

## 31.5 Reprise après Panne : Assurer la Persistance Face à l\'Adversité

Un SGBD transactionnel doit être un bastion de fiabilité. Il doit garantir que les données confiées par les utilisateurs sont en sécurité, même face à des événements imprévus et potentiellement catastrophiques comme une panne de courant, un crash du système d\'exploitation ou une défaillance logicielle du SGBD lui-même. Le sous-système responsable de cette garantie est le **gestionnaire de reprise après panne** (*recovery manager*). Sa mission est de mettre en œuvre les propriétés d\'**Atomicité** et de **Durabilité** du modèle ACID. Après un redémarrage suite à une panne, le gestionnaire de reprise doit s\'assurer que la base de données est restaurée dans un état cohérent, où les effets de toutes les transactions validées sont présents, et les effets de toutes les transactions non terminées sont complètement absents.

### 31.5.1 Introduction à la Reprise après Panne

Le défi principal de la reprise après panne provient de la dichotomie entre la mémoire vive (RAM) et le stockage sur disque. La RAM est rapide mais volatile : son contenu est perdu en cas de panne de courant. Le disque est lent mais persistant. Pour des raisons de performance, un SGBD effectue toutes ses modifications sur des copies de pages disque qui résident dans le buffer pool en RAM. Ces pages \"sales\" (modifiées) ne sont pas nécessairement écrites sur le disque immédiatement.

La plupart des SGBD performants utilisent des politiques de gestion de buffer dites **\"Steal\"** et **\"No-Force\"**  :

> **Steal (Voler) :** La politique \"Steal\" autorise le gestionnaire de tampons à écrire une page sale sur le disque à tout moment, même si la transaction qui l\'a modifiée n\'a pas encore été validée. C\'est nécessaire pour libérer de l\'espace dans le buffer pool.
>
> **No-Force (Ne pas forcer) :** La politique \"No-Force\" n\'oblige pas le SGBD à écrire toutes les pages modifiées par une transaction sur le disque au moment du COMMIT. Attendre ces écritures serait un énorme goulot d\'étranglement.

Ces politiques optimisent la performance, mais créent un état potentiellement incohérent sur le disque. Au moment d\'une panne, le disque peut contenir des modifications de transactions non validées (à cause de \"Steal\") et peut ne pas contenir des modifications de transactions déjà validées (à cause de \"No-Force\"). La tâche du gestionnaire de reprise est de \"nettoyer\" ce désordre au redémarrage. La technique fondamentale qui rend cela possible est la journalisation en écriture anticipée.

### 31.5.2 Journalisation en Écriture Anticipée (Write-Ahead Logging - WAL)

La **journalisation en écriture anticipée (WAL)** est le protocole sur lequel repose la quasi-totalité des mécanismes de reprise modernes. C\'est un principe simple mais d\'une importance capitale. Le protocole WAL impose deux règles fondamentales :

> Pour toute modification d\'une page de données, l\'**enregistrement de journal** (*log record*) qui décrit cette modification doit être écrit sur un support de stockage stable (le fichier journal sur disque) **AVANT** que la page de données modifiée elle-même ne soit écrite sur le disque.
>
> Une transaction n\'est considérée comme validée (COMMIT) que lorsque son enregistrement de journal COMMIT a été écrit de manière persistante sur le support stable.

Le **journal** est un fichier séquentiel, généralement en mode \"ajout seulement\" (*append-only*), qui enregistre l\'historique de toutes les modifications apportées à la base de données. Chaque enregistrement de journal se voit attribuer un **Numéro de Séquence de Journal (Log Sequence Number - LSN)**, qui est un identifiant unique et strictement croissant. Le LSN sert de \"temps logique\" pour le SGBD, ordonnant tous les événements de modification.

Un enregistrement de journal d\'une mise à jour (UPDATE) contient typiquement les informations suivantes  :

> Le LSN de l\'enregistrement.
>
> L\'identifiant de la transaction (XID).
>
> L\'identifiant de la page modifiée.
>
> Des informations pour **refaire (REDO)** la modification (l\'image \"après\" de la donnée).
>
> Des informations pour **défaire (UNDO)** la modification (l\'image \"avant\" de la donnée).

Grâce au protocole WAL, le journal sur disque contient toujours une description complète et ordonnée de ce qui s\'est passé, même si les pages de données sur disque sont dans un état incohérent. Le journal devient la \"source de vérité\" pour la reprise.

### 31.5.3 L\'Algorithme ARIES (Algorithms for Recovery and Isolation Exploiting Semantics)

ARIES est un algorithme de reprise influent et robuste, développé chez IBM, qui est devenu la référence pour de nombreux SGBD commerciaux et open-source. Il s\'appuie sur le protocole WAL et introduit plusieurs concepts clés pour une reprise efficace et correcte, même en cas de pannes survenant pendant le processus de reprise lui-même.

ARIES repose sur trois principes majeurs  :

> **Répéter l\'histoire (Repeating History) :** Pendant la reprise, ARIES rejoue les opérations du journal pour ramener la base de données à l\'état exact où elle se trouvait au moment de la panne, y compris les effets des transactions non terminées.
>
> **Journaliser les annulations (Logging UNDO actions) :** Lorsqu\'ARIES annule une opération, il écrit un enregistrement de journal spécial, appelé **Compensation Log Record (CLR)**, pour décrire cette annulation. Cela garantit que les actions d\'annulation ne seront pas elles-mêmes annulées en cas de nouvelle panne.
>
> **Utiliser les LSN sur les pages de données :** Chaque page de données sur disque stocke le LSN de la dernière modification qui lui a été appliquée (pageLSN). Cette information permet à ARIES de déterminer si une modification décrite dans le journal a déjà été écrite sur la page ou non, évitant ainsi de ré-appliquer des changements inutilement.

Le processus de reprise ARIES se déroule en trois phases après un redémarrage.

#### Phase 1 : Analyse (Analysis)

L\'objectif de cette première phase est de déterminer l\'état exact du système juste avant la panne : quelles transactions étaient en cours et quelles pages en mémoire étaient \"sales\".

> **Processus :** L\'algorithme commence par localiser le dernier **point de contrôle** (*checkpoint*) dans le journal. Un checkpoint est un enregistrement qui contient un instantané de l\'état du système (la liste des transactions actives et des pages sales à ce moment-là) pour accélérer la reprise. À partir de ce checkpoint, ARIES parcourt le journal **vers l\'avant** jusqu\'à la fin.
>
> **Résultat :** Au cours de ce balayage, il construit deux structures de données :

La **Table des Transactions (Transaction Table)** : Elle contient la liste de toutes les transactions qui étaient actives (c\'est-à-dire qui ont commencé mais n\'ont pas d\'enregistrement COMMIT ou ABORT dans le journal) au moment de la panne. Ce sont les transactions \"perdantes\" (*losers*).

La Table des Pages Sales (Dirty Page Table) : Elle contient la liste de toutes les pages qui ont été modifiées en mémoire et qui n\'avaient peut-être pas encore été écrites sur disque au moment de la panne.\
À la fin de la phase d\'Analyse, le SGBD sait exactement quelles transactions doivent être annulées et à partir de quel point dans le journal il doit commencer à ré-appliquer les modifications.

#### Phase 2 : REDO (Refaire)

L\'objectif de la phase REDO est de garantir la **Durabilité**. Elle restaure la base de données à l\'état précis où elle se trouvait au moment de la panne, en s\'assurant que les modifications de *toutes* les transactions (validées ou non) qui ont été journalisées sont bien appliquées aux pages de données. C\'est le principe de \"répéter l\'histoire\".

> **Processus :** ARIES parcourt le journal **vers l\'avant**, en commençant par le plus ancien enregistrement de modification d\'une page qui était dans la Dirty Page Table. Pour chaque enregistrement de mise à jour rencontré dans le journal (LSN L), il effectue la vérification suivante :

La page P affectée par L est-elle dans la Dirty Page Table? Si non, on ignore L.

Si oui, on lit le pageLSN de la page P sur le disque.

Si pageLSN \>= L, cela signifie que la modification L (ou une plus récente) est déjà sur le disque. On ignore L.

Si pageLSN \< L, la modification L n\'est pas sur le disque. L\'opération REDO de l\'enregistrement de journal est alors appliquée à la page P, et le pageLSN de la page est mis à jour à L.

> **Résultat :** À la fin de la phase REDO, l\'état des pages sur le disque est exactement celui qu\'il était en mémoire juste avant la panne. Les modifications des transactions validées sont maintenant garanties d\'être sur le disque. Cependant, les modifications des transactions \"perdantes\" y sont aussi.

#### Phase 3 : UNDO (Défaire)

L\'objectif de la phase UNDO est de garantir l\'**Atomicité**. Elle consiste à annuler toutes les modifications apportées par les transactions \"perdantes\" identifiées lors de la phase d\'Analyse.

> **Processus :** ARIES traite la liste des transactions \"perdantes\". Pour chaque transaction perdante, il parcourt sa chaîne d\'enregistrements de journal **à l\'envers**, en suivant les pointeurs prevLSN de chaque enregistrement. Pour chaque enregistrement de mise à jour, il applique l\'opération d\'annulation (UNDO) correspondante à la page de données.
>
> **Compensation Log Records (CLR) :** C\'est un point crucial d\'ARIES. Pour chaque opération UNDO effectuée, ARIES n\'effectue pas seulement la modification, il écrit aussi un **Compensation Log Record (CLR)** dans le journal. Un CLR est un enregistrement de journal qui décrit l\'action d\'annulation qui vient d\'être faite. Il est de type \"REDO-only\", c\'est-à-dire qu\'il n\'a pas de partie UNDO. Cela garantit que si une nouvelle panne survient au milieu de la phase UNDO, lors du redémarrage suivant, la phase REDO rejouera simplement les annulations déjà effectuées (via les CLR) sans tenter de les annuler une seconde fois.
>
> **Résultat :** Une fois que toutes les opérations de toutes les transactions perdantes ont été annulées (et que des CLR ont été écrits), un enregistrement ABORT est écrit dans le journal pour chaque transaction perdante. La base de données est maintenant dans un état cohérent et prête à accepter de nouvelles transactions.

La performance des SGBD modernes est rendue possible par un découplage audacieux entre la validation des transactions et l\'écriture des données, un découplage que seul un algorithme de reprise sophistiqué comme ARIES peut sécuriser. Les politiques de gestion de buffer \"No-Force\" et \"Steal\" sont contre-intuitives mais essentielles pour la performance. \"No-Force\" signifie qu\'un COMMIT peut retourner rapidement sans attendre des E/S disque coûteuses sur les pages de données. \"Steal\" signifie que le buffer manager a la liberté d\'écrire des pages sales sur disque quand il le juge optimal, sans se soucier de l\'état des transactions. ARIES n\'est pas juste un algorithme de \"reprise\" ; c\'est l\'algorithme qui *permet* ce découplage performant. La phase REDO est la contrepartie de \"No-Force\" : elle garantit que les modifications validées (mais non écrites) finissent sur le disque. La phase UNDO est la contrepartie de \"Steal\" : elle garantit que les modifications non validées (mais potentiellement écrites) sont effacées. ARIES est donc le garant qui permet au reste du système de fonctionner à haute performance.

De plus, le LSN (Log Sequence Number) est le \"temps logique\" du SGBD, unifiant le journal, les pages de données et la mémoire pour orchestrer la reprise. C\'est plus qu\'un simple identifiant ; c\'est une horloge monotone qui ordonne tous les événements modifiant l\'état de la base. En estampillant chaque enregistrement du journal avec un LSN et chaque page de données avec le pageLSN de sa dernière modification, ARIES crée un lien indélébile entre l\'historique des changements (le journal) et l\'état actuel des données (les pages). Lors de la phase REDO, la comparaison pageLSN \< LSN est le mécanisme fondamental qui permet de décider si une modification journalisée doit être ré-appliquée. C\'est ce qui rend la phase REDO idempotente (on peut la relancer sans danger). Le LSN est le fil conducteur qui permet à ARIES de naviguer dans le temps et de reconstruire un état cohérent à partir du chaos d\'une panne.

## Conclusion : Synthèse des Mécanismes d\'un SGBD Robuste

Au terme de ce chapitre, nous avons déconstruit la \"boîte noire\" du SGBD pour en révéler les rouages internes. Nous avons vu qu\'un système de gestion de base de données transactionnel n\'est pas un simple logiciel de stockage, mais un système complexe et finement orchestré, dont chaque composant est conçu pour répondre à des exigences strictes de performance, de fiabilité et de concurrence.

L\'interaction de ces composants forme un tout cohérent. Le voyage d\'une requête commence par l\'**optimiseur**, qui, tel un stratège, analyse le terrain (les statistiques des données) pour élaborer le plan d\'attaque le plus efficace. Ce plan est ensuite confié au **moteur d\'exécution**, qui agit comme le bras armé, demandant les données nécessaires au **gestionnaire de tampons**. Ce dernier, véritable logisticien, gère le flux vital d\'informations entre le disque lent et la mémoire rapide, cherchant à anticiper les besoins pour minimiser les coûteux allers-retours. Pendant toute l\'opération, le **gestionnaire de contrôle de la concurrence** joue le rôle de police de la circulation, utilisant des verrous ou des versions multiples pour s\'assurer que les transactions concurrentes ne se télescopent pas et ne corrompent pas les données. Enfin, veillant sur l\'ensemble du processus, le **gestionnaire de reprise après panne** agit comme un scribe infatigable, enregistrant chaque modification dans son journal. C\'est lui qui garantit que, même si une catastrophe survient, l\'intégrité de l\'univers des données sera préservée : les promesses tenues (COMMIT) seront honorées, et les actions inachevées seront effacées sans laisser de trace.

Ce qui ressort de cette analyse approfondie, c\'est que la conception d\'un moteur de base de données est une science de l\'**arbitrage**. Il n\'existe pas de solution parfaite, mais une série de compromis complexes et calculés. Le choix entre un index Arbre B+ et un index de hachage est un arbitrage entre l\'efficacité des recherches par intervalle et celle des accès directs. Le choix d\'un algorithme de jointure est un compromis entre l\'utilisation de la mémoire, les prérequis de tri et la nature du prédicat. Le choix entre le verrouillage pessimiste (2PL) et le contrôle optimiste (MVCC) est un pari sur la probabilité des conflits dans la charge de travail applicative. Même la décision de ne pas écrire immédiatement les données sur le disque lors d\'un COMMIT (politique \"No-Force\") est un arbitrage audacieux qui sacrifie la simplicité au profit de la performance, en se reposant entièrement sur la robustesse de l\'algorithme de reprise ARIES pour garantir la durabilité.

Comprendre ces mécanismes internes et les compromis qui les sous-tendent est fondamental. Pour l\'ingénieur système, c\'est le cœur de son métier. Pour l\'administrateur de base de données, c\'est la clé pour diagnostiquer les goulots d\'étranglement et ajuster les centaines de paramètres qui gouvernent le comportement du moteur. Pour le développeur d\'applications, c\'est la connaissance qui permet d\'écrire des requêtes et des transactions qui ne se contentent pas d\'être correctes, mais qui sont également performantes, car elles sont écrites en harmonie avec le fonctionnement interne du système.

Enfin, les principes que nous avons étudiés ici, bien que nés dans le contexte des SGBD relationnels centralisés, restent d\'une pertinence aiguë. L\'évolution vers les systèmes distribués et le cloud a complexifié ces défis : comment assurer la cohérence transactionnelle sur des centaines de machines? Comment optimiser une requête dont les données sont réparties sur plusieurs continents? L\'émergence des bases de données NoSQL a également remis en question certains dogmes, en proposant de relâcher certaines garanties ACID (notamment la cohérence forte) au profit d\'une scalabilité et d\'une disponibilité extrêmes, donnant naissance au modèle BASE (*Basically Available, Soft state, Eventually consistent*). Pourtant, même dans ces nouveaux paradigmes, les concepts fondamentaux de gestion du stockage, d\'optimisation, de concurrence et de reprise restent les piliers sur lesquels se construisent les systèmes de données de demain. La maîtrise de ces fondements est, et restera, une compétence essentielle pour tout ingénieur informatique confronté à la complexité des systèmes à grande échelle.

