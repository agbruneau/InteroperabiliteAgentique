# Chapitre I.23 : Structures de Données Avancées

## Introduction

Au cœur de l\'informatique, les structures de données constituent le fondement sur lequel reposent les algorithmes et les systèmes logiciels complexes. Les structures fondamentales telles que les tableaux, les listes chaînées, les piles et les files d\'attente, bien qu\'essentielles, révèlent leurs limites face à la complexité et au volume des données manipulées dans les applications modernes. La nécessité de gérer efficacement des opérations de recherche, d\'insertion, de suppression et d\'interrogation sur de vastes ensembles de données a conduit au développement d\'un arsenal de solutions plus sophistiquées, conçues pour offrir des performances optimales dans des contextes spécifiques.

Ce chapitre se propose d\'explorer cet arsenal de structures de données avancées. Notre parcours débutera par l\'analyse de l\'arbre binaire de recherche (BST), une structure élégante mais dont la performance peut se dégrader de manière catastrophique dans certains scénarios. Cette limitation intrinsèque servira de tremplin pour introduire la notion cruciale d\'auto-équilibrage, un mécanisme qui garantit des performances logarithmiques robustes. Nous étudierons en profondeur trois archétypes d\'arbres auto-équilibrés : les arbres AVL, rigoureux dans leur maintien de l\'équilibre ; les arbres Rouge-Noir, un compromis pragmatique qui sous-tend de nombreuses bibliothèques standards ; et les arbres déployés (Splay Trees), qui s\'adaptent dynamiquement aux motifs d\'accès aux données.

Nous nous tournerons ensuite vers une contrainte fondamentale des systèmes à grande échelle : le goulet d\'étranglement de la mémoire externe. Les structures de données conçues pour la mémoire vive se révèlent inefficaces lorsque les données résident sur des disques lents. Nous examinerons comment les B-arbres et leurs descendants, notamment les B+ arbres, sont spécifiquement architecturés pour minimiser les accès disque, une conception qui en a fait la pierre angulaire de la quasi-totalité des systèmes de gestion de bases de données et des systèmes de fichiers modernes.

Enfin, le chapitre s\'aventurera dans le monde des structures hautement spécialisées, conçues pour résoudre des problèmes ciblés avec une efficacité inégalée. Nous explorerons les Tries et les arbres de suffixes pour la manipulation de chaînes de caractères, les Quadtrees et k-d trees pour l\'organisation de données spatiales, et les structures probabilistes comme les filtres de Bloom et les Skip Lists, qui échangent une certitude absolue contre des gains spectaculaires en espace ou en simplicité. Nous conclurons avec l\'étude des structures pour ensembles disjoints (Union-Find), un outil d\'une simplicité et d\'une puissance remarquables, essentiel à de nombreux algorithmes de graphes.

Ce chapitre s\'adresse aux étudiants de cycles supérieurs, aux ingénieurs logiciels et aux concepteurs de systèmes qui cherchent non seulement à comprendre le fonctionnement de ces structures, mais aussi à saisir les principes de conception, les compromis et les analyses de complexité qui les sous-tendent, afin de pouvoir choisir et implémenter la solution la plus adaptée aux défis algorithmiques complexes.

## 23.1 Arbres Binaires de Recherche (BST)

L\'arbre binaire de recherche, souvent abrégé en ABR ou BST (de l\'anglais *Binary Search Tree*), est l\'une des structures de données non linéaires les plus fondamentales en informatique. Il combine l\'efficacité de la recherche dichotomique avec la flexibilité dynamique d\'une structure de données chaînée, permettant des insertions et des suppressions efficaces. Sa simplicité conceptuelle en fait un point de départ essentiel pour comprendre des structures arborescentes plus complexes et performantes.

### Définition et Propriétés Fondamentales

Un arbre binaire de recherche est un arbre binaire dont les nœuds stockent des clés issues d\'un ensemble totalement ordonné (par exemple, des nombres entiers, des nombres à virgule flottante ou des chaînes de caractères). Chaque nœud de l\'arbre doit satisfaire la **propriété d\'arbre binaire de recherche**, qui est définie récursivement.

Définition Formelle :

Soit x un nœud dans un arbre binaire de recherche. La propriété d\'ordre s\'énonce comme suit :

> Toutes les clés stockées dans le sous-arbre gauche de x sont inférieures ou égales à la clé de x (clé\[y\] ≤ clé\[x\] pour tout nœud y dans le sous-arbre gauche de x).
>
> Toutes les clés stockées dans le sous-arbre droit de x sont supérieures ou égales à la clé de x (clé\[y\] ≥ clé\[x\] pour tout nœud y dans le sous-arbre droit de x).

Certaines définitions imposent un ordre strict (c\'est-à-dire, \< et \>), ce qui interdit les clés dupliquées. D\'autres, comme celle que nous adoptons ici, autorisent les clés égales, généralement en les plaçant de manière cohérente soit dans le sous-arbre gauche, soit dans le sous-arbre droit. La propriété doit être vraie pour chaque nœud de l\'arbre, ce qui signifie qu\'elle s\'applique récursivement à tous les sous-arbres.

Cette propriété fondamentale a une conséquence majeure : un parcours in-ordre de l\'arbre visite les nœuds dans l\'ordre croissant de leurs clés, ce qui est l\'une des caractéristiques les plus puissantes et utiles du BST.

#### Représentation d\'un Nœud

Structurellement, un BST est une collection de nœuds interconnectés. Chaque nœud est une structure de données qui contient généralement les champs suivants  :

> clé : La valeur qui ordonne le nœud au sein de l\'arbre.
>
> données (ou valeur) : Des données satellites associées à la clé. Par exemple, dans un dictionnaire, la clé pourrait être un mot et les données sa définition.
>
> gauche : Un pointeur vers le nœud enfant gauche.
>
> droit : Un pointeur vers le nœud enfant droit.
>
> parent (optionnel) : Un pointeur vers le nœud parent. Bien que non strictement nécessaire pour les opérations de base comme la recherche et l\'insertion, ce pointeur simplifie considérablement l\'implémentation de la suppression et d\'autres opérations avancées comme la recherche du successeur ou du prédécesseur.

Un pointeur nul (souvent représenté par NIL) dans les champs gauche ou droit indique l\'absence d\'un enfant, marquant ainsi la fin d\'une branche. La racine de l\'arbre est le seul nœud qui n\'a pas de parent (son pointeur parent est NIL).

La nature récursive de la définition du BST se prête naturellement à des algorithmes récursifs pour sa manipulation. Chaque sous-arbre d\'un BST est lui-même un BST. Cette auto-similarité est la clé de l\'élégance et de l\'efficacité de ses opérations.

### Opérations de Base : Algorithmes et Analyse

Les opérations fondamentales sur un BST sont la recherche, l\'insertion et la suppression. L\'efficacité de ces opérations est directement proportionnelle à la hauteur de l\'arbre, notée h.

#### Recherche (Search)

La recherche d\'une clé k dans un BST est un processus qui exploite directement la propriété d\'ordre de l\'arbre pour éliminer une grande partie de l\'espace de recherche à chaque étape. Le principe est analogue à celui de la recherche dichotomique dans un tableau trié.

L\'algorithme commence à la racine de l\'arbre. À chaque nœud x rencontré, il compare la clé k à clé\[x\].

> Si k == clé\[x\], la clé est trouvée.
>
> Si k \< clé\[x\], la recherche doit se poursuivre dans le sous-arbre gauche, car la propriété du BST garantit que k ne peut pas se trouver dans le sous-arbre droit.
>
> Si k \> clé\[x\], la recherche continue dans le sous-arbre droit.

Ce processus se poursuit jusqu\'à ce que la clé soit trouvée ou qu\'un pointeur NIL soit atteint, indiquant que la clé n\'est pas présente dans l\'arbre.

##### Pseudo-code de la Recherche Itérative

La version itérative est souvent préférée en pratique car elle évite la surcharge liée aux appels de fonction récursifs et utilise un espace constant sur la pile.

> Extrait de code

FONCTION RECHERCHER_ITERATIF(racine, k)\
// Entrée : la racine de l\'arbre et la clé k à rechercher\
// Sortie : le nœud contenant la clé k, ou NIL si non trouvé\
\
courant ← racine\
TANT QUE courant ≠ NIL ET k ≠ courant.clé FAIRE\
SI k \< courant.clé ALORS\
courant ← courant.gauche\
SINON\
courant ← courant.droit\
FIN SI\
FIN TANT QUE\
RETOURNER courant

##### Analyse de Complexité de la Recherche

La complexité de l\'algorithme de recherche est déterminée par le nombre de nœuds visités. Dans le pire des cas, l\'algorithme parcourt le chemin le plus long de la racine à une feuille. La longueur de ce chemin est la hauteur de l\'arbre, h. Par conséquent, la complexité temporelle de la recherche est O(h).

> **Cas moyen :** Pour un arbre construit à partir de n insertions dans un ordre aléatoire, la hauteur attendue est h=O(logn). Dans ce scénario favorable, la recherche est très efficace. Chaque comparaison permet de diviser par deux la taille de l\'espace de recherche restant, ce qui mène à une performance logarithmique.
>
> **Pire cas :** Si l\'arbre est déséquilibré et dégénère en une liste chaînée, sa hauteur devient h=n−1, soit O(n). La complexité de la recherche devient alors linéaire, O(n), ce qui annule l\'avantage de la structure arborescente.

#### Insertion (Insert)

L\'insertion d\'un nouveau nœud z dans un BST doit préserver la propriété d\'ordre. L\'algorithme suit une logique en deux étapes :

> **Recherche de l\'emplacement :** On parcourt l\'arbre comme pour une recherche de la clé z.clé. Ce parcours se termine lorsqu\'on atteint un pointeur NIL. Ce pointeur NIL est l\'emplacement exact où le nouveau nœud doit être inséré. Le dernier nœud non-NIL visité sera le parent du nouveau nœud.
>
> **Attachement du nœud :** Le nouveau nœud z est attaché comme enfant gauche ou droit de son parent, en fonction de la comparaison de sa clé avec celle du parent.

##### Pseudo-code de l\'Insertion

> Extrait de code

PROCÉDURE INSERER(T, z)\
// Entrée : L\'arbre T et le nouveau nœud z à insérer\
// Le nœud z est déjà initialisé avec z.clé, z.gauche = NIL, z.droit = NIL\
\
y ← NIL // y sera le parent du nœud courant x\
x ← T.racine // x est le nœud courant, commence à la racine\
\
// Étape 1: Trouver le parent y pour le nouveau nœud z\
TANT QUE x ≠ NIL FAIRE\
y ← x\
SI z.clé \< x.clé ALORS\
x ← x.gauche\
SINON\
x ← x.droit\
FIN SI\
FIN TANT QUE\
\
z.parent ← y\
\
// Étape 2: Attacher le nœud z\
SI y = NIL ALORS\
T.racine ← z // L\'arbre était vide\
SINON SI z.clé \< y.clé ALORS\
y.gauche ← z\
SINON\
y.droit ← z\
FIN SI

##### Analyse de Complexité de l\'Insertion

Le processus d\'insertion est dominé par la première étape, qui consiste à parcourir un chemin de la racine à une feuille. Comme pour la recherche, la complexité temporelle de l\'insertion est donc proportionnelle à la hauteur de l\'arbre, soit O(h). La complexité est donc de

O(logn) en moyenne et de O(n) dans le pire des cas.

#### Suppression (Delete)

La suppression d\'un nœud d\'un BST est l\'opération la plus complexe, car il faut s\'assurer que la propriété d\'ordre est maintenue après le retrait du nœud. L\'algorithme doit gérer trois cas distincts, basés sur le nombre d\'enfants du nœud z à supprimer.

Pour simplifier la gestion des pointeurs, il est utile d\'introduire une procédure auxiliaire, TRANSPLANTER(T, u, v), qui remplace le sous-arbre enraciné en u par le sous-arbre enraciné en v dans l\'arbre T.

> Extrait de code

PROCÉDURE TRANSPLANTER(T, u, v)\
// Remplace le sous-arbre enraciné en u par celui enraciné en v\
SI u.parent = NIL ALORS\
T.racine ← v\
SINON SI u = u.parent.gauche ALORS\
u.parent.gauche ← v\
SINON\
u.parent.droit ← v\
FIN SI\
SI v ≠ NIL ALORS\
v.parent ← u.parent\
FIN SI

L\'algorithme de suppression gère ensuite les trois cas suivants :

Cas 1 : Le nœud z n\'a pas d\'enfant (c\'est une feuille).

C\'est le cas le plus simple. Pour supprimer z, on le remplace simplement par NIL en utilisant la procédure TRANSPLANTER. Autrement dit, on modifie le pointeur de son parent pour qu\'il pointe vers NIL.4

Cas 2 : Le nœud z a un seul enfant.

Dans ce cas, on \"élève\" l\'unique enfant de z pour qu\'il prenne sa place. On remplace le sous-arbre enraciné en z par le sous-arbre enraciné en son unique enfant. La procédure TRANSPLANTER gère cela élégamment.4

Cas 3 : Le nœud z a deux enfants.

C\'est le cas le plus délicat. On ne peut pas simplement supprimer z, car cela laisserait deux sous-arbres orphelins. La solution consiste à remplacer z par un autre nœud de l\'arbre qui peut prendre sa place tout en préservant la propriété du BST. Ce remplaçant doit être :

> Plus grand que tous les éléments du sous-arbre gauche de z.
>
> Plus petit que tous les éléments du sous-arbre droit de z.

Deux candidats remplissent ces conditions :

> Le **successeur in-ordre** de z : le nœud avec la plus petite clé dans le sous-arbre droit de z.
>
> Le **prédécesseur in-ordre** de z : le nœud avec la plus grande clé dans le sous-arbre gauche de z.

Choisissons d\'utiliser le successeur, noté y. Par définition, y est le nœud le plus à gauche dans le sous-arbre droit de z. Une propriété cruciale est que y n\'a pas d\'enfant gauche (sinon, cet enfant serait le vrai successeur). Il a donc au plus un enfant (droit).

L\'algorithme procède comme suit  :

> Trouver le successeur y de z dans le sous-arbre droit de z.
>
> Si y est l\'enfant droit direct de z, on remplace z par y. Le sous-arbre gauche de z devient le nouveau sous-arbre gauche de y.
>
> Si y n\'est pas l\'enfant droit direct de z, la situation est plus complexe :\
> a. On remplace d\'abord y par son propre enfant droit (qui est son seul enfant possible).\
> b. Ensuite, y prend la place de z. Le sous-arbre droit de z devient le sous-arbre droit de y, et le sous-arbre gauche de z devient le sous-arbre gauche de y.

##### Pseudo-code de la Suppression

> Extrait de code

PROCÉDURE SUPPRIMER(T, z)\
// Entrée : L\'arbre T et le nœud z à supprimer\
\
// Cas 1 et 2 (z a 0 ou 1 enfant gauche)\
SI z.gauche = NIL ALORS\
TRANSPLANTER(T, z, z.droit)\
// Cas 2 (z a 1 enfant droit)\
SINON SI z.droit = NIL ALORS\
TRANSPLANTER(T, z, z.gauche)\
// Cas 3 (z a deux enfants)\
SINON\
y ← MINIMUM(z.droit) // y est le successeur de z\
SI y.parent ≠ z ALORS\
TRANSPLANTER(T, y, y.droit)\
y.droit ← z.droit\
y.droit.parent ← y\
FIN SI\
TRANSPLANTER(T, z, y)\
y.gauche ← z.gauche\
y.gauche.parent ← y\
FIN SI\
\
FONCTION MINIMUM(x)\
// Trouve le nœud avec la clé minimale dans le sous-arbre enraciné en x\
TANT QUE x.gauche ≠ NIL FAIRE\
x ← x.gauche\
FIN TANT QUE\
RETOURNER x

##### Analyse de Complexité de la Suppression

La complexité de la suppression est également en O(h). L\'algorithme effectue un nombre constant d\'opérations de manipulation de pointeurs et, dans le cas le plus complexe, doit descendre dans le sous-arbre droit pour trouver le successeur. Le coût est donc dominé par la recherche du nœud à supprimer et/ou de son successeur, ce qui prend un temps proportionnel à la hauteur de l\'arbre.

### Parcours de l\'Arbre

Parcourir un arbre signifie visiter chacun de ses nœuds de manière systématique. Pour les arbres binaires, il existe trois stratégies de parcours en profondeur fondamentales, définies par l\'ordre dans lequel la racine d\'un sous-arbre est visitée par rapport à ses enfants gauche et droit.

#### Parcours In-ordre (Infixe)

L\'ordre de visite est : Sous-arbre Gauche, Racine, Sous-arbre Droit.

Ce parcours est particulièrement important pour les BST car il visite les nœuds dans l\'ordre croissant de leurs clés.6 Il constitue la base de l\'algorithme de tri par arbre : insérer

n éléments dans un BST puis effectuer un parcours in-ordre les récupère triés.

> Extrait de code

PROCÉDURE PARCOURS_INFIXE(x)\
SI x ≠ NIL ALORS\
PARCOURS_INFIXE(x.gauche)\
TRAITER(x.clé)\
PARCOURS_INFIXE(x.droit)\
FIN SI

#### Parcours Pré-ordre (Préfixe)

L\'ordre de visite est : Racine, Sous-arbre Gauche, Sous-arbre Droit.

Ce parcours est utile pour créer une copie d\'un arbre, car il permet de recréer la structure hiérarchique en insérant d\'abord la racine, puis en construisant récursivement les sous-arbres.9 Il est également utilisé pour représenter des expressions en notation polonaise.

> Extrait de code

PROCÉDURE PARCOURS_PREFIXE(x)\
SI x ≠ NIL ALORS\
TRAITER(x.clé)\
PARCOURS_PREFIXE(x.gauche)\
PARCOURS_PREFIXE(x.droit)\
FIN SI

#### Parcours Post-ordre (Postfixe)

L\'ordre de visite est : Sous-arbre Gauche, Sous-arbre Droit, Racine.

Ce parcours est principalement utilisé pour la suppression d\'un arbre. En traitant un nœud après ses enfants, on s\'assure que les sous-arbres sont libérés de la mémoire avant de libérer le nœud parent lui-même, évitant ainsi les pointeurs pendants.9

> Extrait de code

PROCÉDURE PARCOURS_POSTFIXE(x)\
SI x ≠ NIL ALORS\
PARCOURS_POSTFIXE(x.gauche)\
PARCOURS_POSTFIXE(x.droit)\
TRAITER(x.clé)\
FIN SI

##### Analyse de Complexité des Parcours

Chacun de ces trois parcours visite chaque nœud de l\'arbre exactement une fois. Par conséquent, la complexité temporelle de n\'importe quel parcours en profondeur est de O(n), où n est le nombre de nœuds dans l\'arbre.

### Analyse du Pire Cas et Motivation pour l\'Équilibrage

La performance logarithmique promise par les BST n\'est qu\'une moyenne statistique. La structure réelle d\'un BST, et donc sa hauteur, dépend entièrement de l\'ordre dans lequel les éléments y sont insérés. Cette dépendance à l\'ordre d\'insertion est le talon d\'Achille du BST simple et la principale motivation pour le développement des arbres auto-équilibrés.

#### Dégénérescence en Liste Chaînée

Considérons le scénario où les clés sont insérées dans un ordre déjà trié, que ce soit croissant ou décroissant. Par exemple, si nous insérons la séquence de clés 10, 20, 30, 40, 50 dans un BST initialement vide :

> **Insérer 10 :** L\'arbre contient uniquement la racine 10.
>
> **Insérer 20 :** 20 \> 10, donc 20 devient l\'enfant droit de 10.
>
> **Insérer 30 :** 30 \> 10, on va à droite. 30 \> 20, donc 30 devient l\'enfant droit de 20.
>
> **Insérer 40 :** Devient l\'enfant droit de 30.
>
> **Insérer 50 :** Devient l\'enfant droit de 40.

L\'arbre résultant n\'a aucun enfant gauche. Il a dégénéré en une simple liste chaînée de nœuds connectés par des pointeurs droit. De même, une insertion en ordre décroissant (

50, 40, 30, 20, 10) produirait une liste chaînée de pointeurs gauche.

#### Impact sur la Complexité

Dans un tel arbre dégénéré contenant n nœuds, la hauteur h est n-1, ce qui est en O(n). Par conséquent, toutes les opérations dont la complexité dépend de la hauteur voient leur performance s\'effondrer  :

> **Recherche :** O(n)
>
> **Insertion :** O(n)
>
> **Suppression :** O(n)

Dans ce pire des cas, le BST n\'offre aucun avantage par rapport à une simple liste chaînée non triée pour l\'insertion, et est moins performant qu\'un tableau trié pour la recherche.

#### La Nécessité de l\'Équilibrage

Ce problème de dégénérescence n\'est pas un cas pathologique rare. Il survient fréquemment dans des scénarios réels, par exemple lors du traitement de données déjà triées ou quasi-triées (comme des enregistrements horodatés). L\'algorithme d\'insertion simple du BST est \"gourmand\" : il place un nouvel élément au premier emplacement valide qu\'il trouve, sans jamais reconsidérer la structure globale de l\'arbre.

Pour garantir des performances logarithmiques, il est impératif de maintenir la hauteur de l\'arbre proche de son minimum théorique, soit O(logn). Cela nécessite des mécanismes pour détecter et corriger les déséquilibres structurels au fur et à mesure des insertions et des suppressions. Les structures de données qui incorporent de tels mécanismes sont appelées **arbres binaires de recherche auto-équilibrés**. Elles ajoutent une complexité aux algorithmes d\'insertion et de suppression afin d\'éviter le pire cas en O(n) et de garantir une performance en O(logn) pour toutes les opérations. C\'est l\'objet de la section suivante.

## 23.2 Arbres Équilibrés

La faiblesse fondamentale de l\'arbre binaire de recherche simple réside dans sa vulnérabilité à l\'ordre d\'insertion des données, pouvant mener à une dégénérescence structurelle et à des performances linéaires. Pour surmonter cet écueil, une famille de structures de données plus sophistiquées a été développée : les arbres binaires de recherche auto-équilibrés. Ces structures maintiennent une hauteur garantie de O(logn) en effectuant des ajustements structurels ciblés lors des opérations de modification (insertion et suppression). Ce faisant, elles assurent des performances logarithmiques dans le pire des cas pour toutes les opérations dynamiques.

### Introduction à l\'Auto-Équilibrage

Le concept d\'auto-équilibrage repose sur la détection d\'un déséquilibre dans l\'arbre, suivi de sa correction. Un arbre est considéré comme \"déséquilibré\" si la hauteur d\'un sous-arbre devient significativement plus grande que celle de son sous-arbre frère. Chaque type d\'arbre équilibré définit sa propre mesure de l\'équilibre (un \"invariant\") et ses propres règles pour le restaurer lorsque les opérations de modification le violent.

#### Le Mécanisme Fondamental : Les Rotations

L\'outil principal pour réorganiser la structure d\'un arbre binaire de recherche sans violer sa propriété d\'ordre fondamentale est l\'**opération de rotation**. Une rotation est une transformation locale et constante en temps (O(1)) qui modifie les relations parent-enfant entre deux ou trois nœuds, redistribuant ainsi les sous-arbres pour altérer la hauteur de l\'arbre.

##### Rotation Simple

Il existe deux types de rotations simples : la rotation à droite et la rotation à gauche. Elles sont des opérations inverses l\'une de l\'autre.

Rotation à Droite (Right Rotate)

Une rotation à droite sur un nœud y est effectuée lorsque son sous-arbre gauche, enraciné en x, est devenu trop \"haut\". L\'opération fait \"monter\" x pour prendre la place de y, tandis que y \"descend\" pour devenir l\'enfant droit de x. Le sous-arbre droit de x (contenant des clés entre x et y) devient le nouveau sous-arbre gauche de y.

Visuellement, la transformation est la suivante :

y x\
/ \\ / \\\
x C ==\> A y\
/ \\ / \\\
A B B C

Ici, A, B, et C représentent des sous-arbres. La propriété du BST est préservée car l\'ordre infixe des nœuds (A, x, B, y, C) reste inchangé après la rotation.

**Pseudo-code de la Rotation à Droite :**

> Extrait de code

FONCTION ROTATION_DROITE(y)\
// Entrée : le nœud y, racine du sous-arbre à faire pivoter\
// Sortie : la nouvelle racine du sous-arbre, x\
\
x ← y.gauche\
T2 ← x.droit\
\
// Effectuer la rotation\
x.droit ← y\
y.gauche ← T2\
\
// Mettre à jour les pointeurs parents (si utilisés)\
SI T2 ≠ NIL ALORS T2.parent ← y\
x.parent ← y.parent\
SI y.parent = NIL ALORS\
// y était la racine de l\'arbre entier\
racine_globale ← x\
SINON SI y = y.parent.droit ALORS\
y.parent.droit ← x\
SINON\
y.parent.gauche ← x\
FIN SI\
y.parent ← x\
\
// Mettre à jour les hauteurs/facteurs d\'équilibre de y, puis de x\
//\... (dépend de l\'implémentation spécifique, ex: AVL)\
\
RETOURNER x

Rotation à Gauche (Left Rotate)

La rotation à gauche est l\'opération miroir de la rotation à droite. Elle est utilisée quand le sous-arbre droit d\'un nœud x est trop haut.

x y\
/ \\ / \\\
A y ==\> x C\
/ \\ / \\\
B C A B

Le pseudo-code est symétrique à celui de la rotation à droite.

##### Rotation Double

Dans certains cas de déséquilibre, une seule rotation simple n\'est pas suffisante pour restaurer l\'équilibre. C\'est notamment le cas lorsque le déséquilibre est causé par un sous-arbre \"interne\" (par exemple, le sous-arbre *droit* du fils *gauche*). Ces situations, souvent appelées cas \"en coude\" ou \"zigzag\", nécessitent une **rotation double**.

Rotation Gauche-Droite (Left-Right Rotate)

Cette opération corrige un déséquilibre \"Gauche-Droite\". Elle est nécessaire lorsqu\'un nœud z est déséquilibré à cause de son fils gauche y, qui est lui-même \"penché\" vers la droite. Elle consiste en deux étapes :

> Une **rotation à gauche** sur le fils y.
>
> Une **rotation à droite** sur le nœud initial z.

Visuellement :

z z x\
/ \\ / \\ / \\\
y D ==\> (Gauche sur y) x D ==\> (Droite sur z) y z\
/ \\ / \\ / \\ / \\\
A x y C A B C D\
/ \\ / \\\
B C A B

Rotation Droite-Gauche (Right-Left Rotate)

C\'est l\'opération miroir, corrigeant un déséquilibre \"Droite-Gauche\". Elle consiste en une rotation à droite sur le fils droit, suivie d\'une rotation à gauche sur le nœud initial.

Ces quatre opérations de rotation (droite, gauche, gauche-droite, droite-gauche) forment la boîte à outils fondamentale utilisée par la plupart des arbres auto-équilibrés pour maintenir leur structure et garantir des performances logarithmiques.

### Arbres AVL

Nommés d\'après leurs inventeurs, Georgy Adelson-Velsky et Evgenii Landis (1962), les arbres AVL furent les premiers arbres binaires de recherche auto-équilibrés découverts. Ils sont définis par une condition d\'équilibre très stricte, ce qui les rend particulièrement bien balancés mais peut entraîner des coûts de rééquilibrage plus élevés que d\'autres structures.

#### Définition et Propriété AVL

Un arbre binaire de recherche est un arbre AVL si, pour chaque nœud de l\'arbre, la propriété suivante est respectée :

**Propriété AVL :** Les hauteurs des deux sous-arbres enfants d\'un nœud ne peuvent différer de plus de 1.

Pour vérifier cette propriété, on définit le facteur d\'équilibre (ou balance factor) d\'un nœud n comme suit :

facteur_equilibre(n)=hauteur(n.gauche)−hauteur(n.droit)

Pour qu\'un arbre soit un arbre AVL, le facteur d\'équilibre de chaque nœud doit appartenir à l\'ensemble {−1,0,1}.

> Un facteur de -1 indique que le sous-arbre droit est plus haut d\'un niveau.
>
> Un facteur de 0 indique que les deux sous-arbres ont la même hauteur.
>
> Un facteur de +1 indique que le sous-arbre gauche est plus haut d\'un niveau.

Un nœud dont le facteur d\'équilibre devient +2 ou -2 est considéré comme déséquilibré et nécessite une opération de rééquilibrage. Pour implémenter un arbre AVL, chaque nœud doit stocker soit sa hauteur, soit directement son facteur d\'équilibre.

#### Opérations et Rééquilibrage

La recherche dans un arbre AVL est identique à celle d\'un BST standard et bénéficie de la hauteur garantie en O(logn). Les opérations d\'insertion et de suppression sont plus complexes car elles peuvent violer la propriété AVL et nécessiter un rééquilibrage.

##### Insertion dans un Arbre AVL

L\'algorithme d\'insertion se déroule en trois phases :

> **Insertion standard :** Le nouveau nœud est inséré comme une feuille, en suivant la procédure standard d\'un BST.
>
> **Mise à jour et détection :** En remontant le chemin depuis le nouveau nœud jusqu\'à la racine, on met à jour les hauteurs (ou facteurs d\'équilibre) de chaque ancêtre.
>
> **Rééquilibrage :** Le premier ancêtre rencontré dont le facteur d\'équilibre devient +2 ou -2 est identifié. Une ou plusieurs rotations sont effectuées sur ce nœud pour restaurer la propriété AVL pour l\'ensemble de l\'arbre.

Une propriété remarquable de l\'insertion dans un arbre AVL est qu\'**une seule opération de rééquilibrage (une rotation simple ou double) suffit** pour restaurer l\'équilibre de tout l\'arbre. En effet, une rotation effectuée sur le premier nœud déséquilibré restaure la hauteur du sous-arbre à sa valeur d\'avant l\'insertion, empêchant ainsi la propagation du déséquilibre vers la racine.

##### Analyse des Cas de Rotation pour l\'Insertion

Soit z le premier nœud déséquilibré sur le chemin de remontée. Le déséquilibre est causé par une insertion dans l\'un de ses sous-arbres. Il y a quatre cas possibles, symétriques deux à deux.

> **Cas Gauche-Gauche (Left-Left) :**

**Configuration :** z a un facteur d\'équilibre de +2. L\'insertion a eu lieu dans le sous-arbre *gauche* de l\'enfant *gauche* de z.

**Solution :** Une seule **rotation à droite** sur z est nécessaire.

> **Cas Droite-Droite (Right-Right) :**

**Configuration :** z a un facteur d\'équilibre de -2. L\'insertion a eu lieu dans le sous-arbre *droit* de l\'enfant *droit* de z.

**Solution :** Une seule **rotation à gauche** sur z est nécessaire.

> **Cas Gauche-Droite (Left-Right) :**

**Configuration :** z a un facteur d\'équilibre de +2. L\'insertion a eu lieu dans le sous-arbre *droit* de l\'enfant *gauche* de z.

**Solution :** Une **rotation double Gauche-Droite** est nécessaire : d\'abord une rotation à gauche sur l\'enfant gauche de z, puis une rotation à droite sur z lui-même.

> **Cas Droite-Gauche (Right-Left) :**

**Configuration :** z a un facteur d\'équilibre de -2. L\'insertion a eu lieu dans le sous-arbre *gauche* de l\'enfant *droit* de z.

**Solution :** Une **rotation double Droite-Gauche** est nécessaire : d\'abord une rotation à droite sur l\'enfant droit de z, puis une rotation à gauche sur z.

##### Pseudo-code de l\'Insertion AVL (conceptuel)

> Extrait de code

FONCTION INSERER_AVL(nœud, clé)\
// Insertion récursive\
SI nœud = NIL ALORS\
RETOURNER NOUVEAU_NŒUD(clé)\
FIN SI\
\
SI clé \< nœud.clé ALORS\
nœud.gauche ← INSERER_AVL(nœud.gauche, clé)\
SINON SI clé \> nœud.clé ALORS\
nœud.droit ← INSERER_AVL(nœud.droit, clé)\
SINON\
// Clé déjà présente, ne rien faire ou mettre à jour la valeur\
RETOURNER nœud\
FIN SI\
\
// Mettre à jour la hauteur du nœud courant\
nœud.hauteur ← 1 + MAX(hauteur(nœud.gauche), hauteur(nœud.droit))\
\
// Obtenir le facteur d\'équilibre\
balance ← facteur_equilibre(nœud)\
\
// Si le nœud est déséquilibré, il y a 4 cas\
// Cas Gauche-Gauche\
SI balance \> 1 ET clé \< nœud.gauche.clé ALORS\
RETOURNER ROTATION_DROITE(nœud)\
FIN SI\
\
// Cas Droite-Droite\
SI balance \< -1 ET clé \> nœud.droit.clé ALORS\
RETOURNER ROTATION_GAUCHE(nœud)\
FIN SI\
\
// Cas Gauche-Droite\
SI balance \> 1 ET clé \> nœud.gauche.clé ALORS\
nœud.gauche ← ROTATION_GAUCHE(nœud.gauche)\
RETOURNER ROTATION_DROITE(nœud)\
FIN SI\
\
// Cas Droite-Gauche\
SI balance \< -1 ET clé \< nœud.droit.clé ALORS\
nœud.droit ← ROTATION_DROITE(nœud.droit)\
RETOURNER ROTATION_GAUCHE(nœud)\
FIN SI\
\
// Si le nœud est équilibré, le retourner sans changement\
RETOURNER nœud

##### Suppression dans un Arbre AVL

La suppression dans un arbre AVL est plus complexe que l\'insertion. Le processus commence par une suppression standard de type BST. Ensuite, comme pour l\'insertion, on remonte le chemin de la suppression vers la racine pour mettre à jour les facteurs d\'équilibre et effectuer des rotations si nécessaire.

La différence fondamentale est que la suppression d\'un nœud peut diminuer la hauteur d\'un sous-arbre. Une rotation qui corrige un déséquilibre à un certain niveau peut ne pas restaurer la hauteur originale du sous-arbre. Par conséquent, le déséquilibre peut se propager vers le haut, et dans le pire des cas, **il peut être nécessaire d\'effectuer des rotations à chaque niveau du chemin de remontée**, soit O(logn) rotations.

#### Analyse de Complexité

La propriété AVL garantit que la hauteur h d\'un arbre de n nœuds est strictement bornée. La taille minimale N(h) d\'un arbre AVL de hauteur h suit une récurrence similaire à celle des nombres de Fibonacci : N(h)=1+N(h−1)+N(h−2). Cette relation mène à une borne supérieure stricte pour la hauteur :

h\<1.44log2​(n+2).

Puisque h=O(logn), et que les rotations sont des opérations en O(1), les complexités des opérations sont les suivantes :

> **Recherche :** O(logn)
>
> **Insertion :** O(logn) (une recherche + au plus une rotation double)
>
> **Suppression :** O(logn) (une recherche + au plus O(logn) rotations)

La contrainte d\'équilibre stricte des arbres AVL en fait des structures très prévisibles et efficaces pour les applications où les recherches sont très fréquentes. Cependant, la complexité potentielle du rééquilibrage, surtout à la suppression, a conduit au développement d\'arbres avec des contraintes d\'équilibre plus relâchées, comme les arbres Rouge-Noir.

### Arbres Rouge-Noir

Les arbres Rouge-Noir (ou arbres bicolores) sont une autre forme d\'arbres binaires de recherche auto-équilibrés qui garantissent des performances en O(logn) dans le pire des cas. Ils offrent un compromis différent de celui des arbres AVL : leur contrainte d\'équilibre est moins stricte, ce qui peut résulter en une hauteur légèrement supérieure, mais les opérations de rééquilibrage sont généralement plus rapides, nécessitant un nombre constant de rotations au maximum. Cette efficacité pragmatique en a fait la structure de choix pour l\'implémentation de nombreuses structures de données associatives dans les bibliothèques standards (par exemple,

std::map en C++, TreeMap en Java).

#### Définition et Invariants

Un arbre Rouge-Noir est un arbre binaire de recherche où chaque nœud possède un attribut supplémentaire : une couleur, qui est soit **ROUGE**, soit **NOIR**. Pour être un arbre Rouge-Noir valide, l\'arbre doit respecter les cinq invariants suivants en tout temps  :

> **Invariant de Couleur :** Chaque nœud est soit rouge, soit noir.
>
> **Invariant de Racine :** La racine de l\'arbre est toujours noire.
>
> **Invariant des Feuilles :** Toutes les feuilles (les pointeurs NIL) sont considérées comme noires. (Ceci est une convention de conception importante qui simplifie les algorithmes).
>
> **Invariant Rouge :** Si un nœud est rouge, alors ses deux enfants doivent être noirs. (Cela implique qu\'il ne peut y avoir deux nœuds rouges consécutifs sur un chemin de la racine à une feuille).
>
> **Invariant Noir (ou de Hauteur Noire) :** Pour chaque nœud, tous les chemins simples de ce nœud à ses feuilles descendantes contiennent le même nombre de nœuds noirs. Ce nombre est appelé la **hauteur noire** du nœud, notée hn(x).

Ces invariants, pris ensemble, garantissent que l\'arbre reste approximativement équilibré. L\'invariant 5 est le plus crucial pour l\'équilibre. Il force l\'arbre à avoir une structure uniforme en termes de \"profondeur noire\". L\'invariant 4, en empêchant les séquences de nœuds rouges, assure que le chemin le plus long d\'une racine à une feuille n\'est pas plus de deux fois plus long que le chemin le plus court. C\'est de là que découle la garantie de hauteur logarithmique : la hauteur h d\'un arbre Rouge-Noir de n nœuds est bornée par h≤2log2​(n+1).

Une intuition puissante pour comprendre les arbres Rouge-Noir est de les voir comme une représentation binaire d\'arbres 2-3-4 (un type de B-arbre). Un nœud noir avec un ou deux enfants rouges peut être interprété comme un seul \"super-nœud\" contenant 2 ou 3 clés. Les opérations de recoloration et de rotation dans un arbre Rouge-Noir miment alors les opérations de fractionnement et de fusion des nœuds dans un arbre 2-3-4.

#### Opérations et Maintien des Invariants

Comme pour les arbres AVL, la recherche est identique à celle d\'un BST standard. Les opérations d\'insertion et de suppression, cependant, doivent être suivies d\'une phase de \"réparation\" (fixup) pour restaurer les invariants qui auraient pu être violés.

##### Insertion dans un Arbre Rouge-Noir

L\'insertion se déroule en deux phases :

> **Insertion standard :** On insère le nouveau nœud z en utilisant la procédure standard du BST. Le nouveau nœud est **toujours coloré en ROUGE**.

Colorer le nouveau nœud en rouge est stratégique. Cela ne viole jamais l\'invariant de hauteur noire (Invariant 5), car le nombre de nœuds noirs sur tous les chemins reste inchangé. Cela peut cependant violer l\'invariant de Racine (si l\'arbre était vide) ou l\'invariant Rouge (si le parent du nouveau nœud est également rouge).

> **Réparation (RB-INSERT-FIXUP) :** Une procédure est appelée pour corriger les violations potentielles. La procédure itère en remontant l\'arbre, en résolvant les conflits \"Rouge-Rouge\" par des recolorations et des rotations.

La logique de réparation se concentre sur le cas où le nœud inséré z et son parent père(z) sont tous deux rouges. L\'algorithme examine la couleur de l\'**oncle** de z (le frère de père(z)).

Il y a trois cas principaux (plus leurs cas miroirs) :

> **Cas 1 : L\'oncle de z est ROUGE.**

**Action :** On recolore le père de z et l\'oncle de z en NOIR. On recolore le grand-père de z en ROUGE. On déplace ensuite le pointeur du \"problème\" sur le grand-père et on continue la boucle vers le haut. C\'est l\'équivalent de la promotion d\'une clé dans un B-arbre.

> **Cas 2 : L\'oncle de z est NOIR et z est un enfant \"interne\" (forme un coude).**

Par exemple, z est un enfant droit et son père est un enfant gauche.

**Action :** On effectue une rotation à gauche sur le père de z. Cela transforme la situation en Cas 3.

> **Cas 3 : L\'oncle de z est NOIR et z est un enfant \"externe\" (forme une ligne droite).**

Par exemple, z et son père sont tous deux des enfants gauches.

**Action :** On recolore le père de z en NOIR et le grand-père en ROUGE. Ensuite, on effectue une rotation à droite sur le grand-père. Cela résout le conflit et la boucle se termine.

Le processus de réparation nécessite au plus deux rotations et se termine en temps O(logn).

**Pseudo-code de la Réparation d\'Insertion :**

> Extrait de code

PROCÉDURE RB_INSERT_FIXUP(T, z)\
TANT QUE z.parent.couleur = ROUGE FAIRE\
SI z.parent = z.parent.parent.gauche ALORS\
y ← z.parent.parent.droit // y est l\'oncle\
// Cas 1: L\'oncle est ROUGE\
SI y.couleur = ROUGE ALORS\
z.parent.couleur ← NOIR\
y.couleur ← NOIR\
z.parent.parent.couleur ← ROUGE\
z ← z.parent.parent\
SINON\
// Cas 2: L\'oncle est NOIR et z est un enfant droit\
SI z = z.parent.droit ALORS\
z ← z.parent\
ROTATION_GAUCHE(T, z)\
FIN SI\
// Cas 3: L\'oncle est NOIR et z est un enfant gauche\
z.parent.couleur ← NOIR\
z.parent.parent.couleur ← ROUGE\
ROTATION_DROITE(T, z.parent.parent)\
FIN SI\
SINON\
// Cas symétriques (miroirs)\
\...\
FIN SI\
FIN TANT QUE\
T.racine.couleur ← NOIR

##### Suppression dans un Arbre Rouge-Noir

La suppression est notoirement plus complexe. Le problème principal survient lorsqu\'on supprime un nœud **NOIR**. Cela viole l\'invariant de hauteur noire (Invariant 5), car tous les chemins qui passaient par ce nœud ont maintenant un nœud noir de moins. Pour compenser, on imagine que le nœud qui remplace le nœud supprimé hérite d\'un \"supplément de noirceur\". Si ce nœud remplaçant était rouge, on le colore simplement en noir. S\'il était déjà noir, il devient \"doublement noir\".

La procédure de réparation (RB-DELETE-FIXUP) a pour but d\'éliminer ce \"double noir\" en le faisant remonter dans l\'arbre par des rotations et des recolorations, jusqu\'à ce que :

> Il atteigne la racine (auquel cas il est simplement retiré).
>
> Il soit \"absorbé\" par un nœud rouge (qui devient noir).
>
> La structure soit transformée de telle sorte que les invariants soient restaurés.

La logique de réparation dépend de la couleur du **frère** du nœud doublement noir et des couleurs des enfants de ce frère. Il y a quatre cas principaux (et leurs miroirs) à considérer. La procédure de réparation pour la suppression nécessite au plus trois rotations et s\'exécute également en temps

O(logn).

#### Analyse de Complexité

Grâce à la hauteur garantie en O(logn) et aux opérations de réparation qui sont également en O(logn) (avec un nombre constant de rotations), toutes les opérations fondamentales sur un arbre Rouge-Noir ont une complexité dans le pire des cas de O(logn).

> **Recherche :** O(logn)
>
> **Insertion :** O(logn)
>
> **Suppression :** O(logn)

Les arbres Rouge-Noir représentent un excellent équilibre entre la garantie de performance et la complexité de l\'implémentation. Ils sont moins strictement équilibrés que les arbres AVL, ce qui signifie qu\'ils peuvent être légèrement plus hauts en pratique, mais les coûts de rééquilibrage (le nombre de rotations) sont plus faibles, en particulier pour les insertions fréquentes.

### Arbres Déployés (Splay Trees)

Les arbres déployés, ou *Splay Trees*, introduits par Daniel Sleator et Robert Tarjan, adoptent une approche radicalement différente de l\'équilibrage. Au lieu de maintenir un invariant d\'équilibre strict (comme la hauteur dans les AVL ou la couleur dans les arbres Rouge-Noir), ils se réorganisent de manière agressive après chaque opération d\'accès. L\'objectif n\'est pas de maintenir l\'arbre équilibré à tout moment, mais d\'optimiser la structure pour les accès futurs, en se basant sur le principe de **localité temporelle** : un élément récemment accédé a de fortes chances d\'être accédé à nouveau prochainement.

#### Concept d\'Auto-Ajustement et Opération de Déploiement (Splaying)

La pierre angulaire du Splay Tree est l\'opération de **déploiement** (*splaying*). Chaque fois qu\'un nœud x est accédé (pour une recherche, une insertion ou une suppression), une série de rotations est effectuée pour amener ce nœud x jusqu\'à la racine de l\'arbre.

Ce processus a deux effets bénéfiques :

> **Accès rapide futur :** Le nœud x est maintenant à la racine, donc un accès ultérieur à x sera en O(1).
>
> **Effet d\'équilibrage secondaire :** Le processus de déploiement a tendance à réduire la profondeur des autres nœuds sur le chemin d\'accès, améliorant ainsi la structure globale de l\'arbre et raccourcissant les chemins vers les nœuds récemment accédés.

Le déploiement d\'un nœud x se fait en appliquant répétitivement une des trois opérations de rotation suivantes jusqu\'à ce que x soit la racine  :

> **Étape Zig :**

**Condition :** Le parent de x, noté p, est la racine de l\'arbre.

**Action :** Une rotation simple (gauche ou droite) est effectuée entre x et p. C\'est toujours la dernière étape d\'une opération de déploiement.

> **Étape Zig-Zig :**

**Condition :** Le parent p de x n\'est pas la racine, et x et p sont tous deux des enfants gauches (ou tous deux des enfants droits) de leurs parents respectifs. Ils forment une \"ligne droite\".

**Action :** Une rotation est d\'abord effectuée sur le grand-parent g, puis une autre sur le parent p. Cette double rotation \"redresse\" le chemin et réduit considérablement la profondeur de x. C\'est cette étape qui différencie fondamentalement le splaying de la méthode naïve \"rotate-to-root\" et qui est la clé de ses performances amorties.

> **Étape Zig-Zag :**

**Condition :** Le parent p de x n\'est pas la racine, et x est un enfant gauche tandis que p est un enfant droit (ou vice-versa). Ils forment un \"coude\".

**Action :** Une rotation est d\'abord effectuée sur p, puis une autre sur le nouveau parent de x (g). Cette opération est structurellement similaire à une rotation double dans un arbre AVL.

#### Analyse de Complexité Amortie

Un Splay Tree ne fournit aucune garantie sur sa hauteur dans le pire des cas. En fait, une seule opération peut potentiellement rendre l\'arbre complètement déséquilibré, avec une hauteur de O(n). Par conséquent, le coût d\'une opération unique dans le pire des cas est de O(n).

Cependant, la puissance des Splay Trees réside dans leur performance sur une **séquence** d\'opérations. L\'analyse de cette performance se fait à l\'aide de l\'**analyse amortie**, qui permet de moyenner le coût des opérations coûteuses avec celui des opérations peu coûteuses sur une longue série.

##### La Méthode du Potentiel

L\'analyse amortie des Splay Trees utilise la méthode du potentiel. On définit une fonction de potentiel Φ qui associe un nombre réel non négatif à chaque état de la structure de données. Le potentiel peut être vu comme un \"crédit\" prépayé. Le coût amorti ci​\^​ de la i-ème opération est défini comme :

ci​\^​=ci​+Φ(Di​)−Φ(Di−1​)

où ci​ est le coût réel de l\'opération, et Di​ et Di−1​ sont les états de la structure après et avant l\'opération.

Pour une séquence de m opérations, le coût total réel est :

∑i=1m​ci​=∑i=1m​(ci​\^​−Φ(Di​)+Φ(Di−1​))=∑i=1m​ci​\^​−(Φ(Dm​)−Φ(D0​))

Si l\'on s\'assure que Φ(Dm​)≥Φ(D0​), alors le coût total réel est borné par le coût total amorti.

##### Analyse du Splay Tree

Pour un Splay Tree, la fonction de potentiel est définie en fonction de la taille des sous-arbres. Pour chaque nœud x dans l\'arbre T, soit taille(x) le nombre de nœuds dans le sous-arbre enraciné en x. On définit le **rang** de x comme r(x)=⌊log2​(taille(x))⌋. La fonction de potentiel de l\'arbre T est la somme des rangs de tous ses nœuds  :

Φ(T)=∑x∈T​r(x)

L\'analyse (complexe et non détaillée ici) montre que le coût amorti de chaque étape de déploiement (Zig, Zig-Zig, Zig-Zag) est borné. Notamment, le **Théorème d\'Accès** (Access Lemma) stipule que le coût amorti d\'une opération de déploiement sur un nœud x est O(r(racine)−r(x)), ce qui se simplifie en O(logn).

##### Résultat Final

Le résultat de cette analyse est que toute séquence de m opérations sur un Splay Tree de n nœuds prend un temps total de O(mlogn). Le **coût amorti** de chaque opération est donc de O(logn).

Cela signifie que bien qu\'une opération puisse être très lente (O(n)), elle doit nécessairement réorganiser l\'arbre d\'une manière qui \"paie d\'avance\" pour de futures opérations, en réduisant suffisamment le potentiel global de l\'arbre. Les Splay Trees sont donc particulièrement efficaces lorsque les motifs d\'accès ne sont pas uniformes, car ils s\'adaptent pour rendre les accès fréquents très rapides, souvent plus que les arbres AVL ou Rouge-Noir dans ces scénarios.

### Tableau Comparatif des Arbres de Recherche

Le choix entre un BST simple, un arbre AVL, un arbre Rouge-Noir ou un Splay Tree dépend des exigences spécifiques de l\'application. Le tableau suivant résume leurs caractéristiques et compromis.

  ------------------------------ ---------------------------------- ------------------------------------------- ---------------------------------------------- ------------------------------------------
  Caractéristique                Arbre Binaire de Recherche (BST)   Arbre AVL                                   Arbre Rouge-Noir                               Splay Tree

  **Complexité Recherche**       O(logn) moyen, O(n) pire cas       O(logn) pire cas                            O(logn) pire cas                               O(logn) amorti, O(n) pire cas

  **Complexité Insertion**       O(logn) moyen, O(n) pire cas       O(logn) pire cas                            O(logn) pire cas                               O(logn) amorti, O(n) pire cas

  **Complexité Suppression**     O(logn) moyen, O(n) pire cas       O(logn) pire cas                            O(logn) pire cas                               O(logn) amorti, O(n) pire cas

  **Garantie d\'Équilibre**      Aucune                             Stricte (hauteur)                           Modérée (hauteur noire)                        Aucune (auto-ajustement)

  **Rotations (Insertion)**      0                                  Au plus 1 (double)                          Au plus 2                                      O(logn) amorti

  **Rotations (Suppression)**    0                                  O(logn)                                     Au plus 3                                      O(logn) amorti

  **Espace Supplémentaire**      Aucun                              Entier (hauteur/balance)                    1 bit (couleur)                                Aucun

  **Cas d\'utilisation idéal**   Données aléatoires, simplicité     Recherches très fréquentes, peu de modifs   Usage général, bon équilibre perf/complexité   Accès non uniformes, localité temporelle
  ------------------------------ ---------------------------------- ------------------------------------------- ---------------------------------------------- ------------------------------------------

Ce tableau met en évidence le spectre des compromis : le BST simple est le plus facile à implémenter mais n\'offre aucune garantie de performance. L\'arbre AVL offre les garanties les plus fortes et est souvent le plus rapide pour les recherches pures en raison de sa structure très équilibrée. L\'arbre Rouge-Noir est un excellent compromis pour un usage général, avec des garanties solides et des coûts de modification raisonnables. Enfin, le Splay Tree excelle dans les scénarios où les motifs d\'accès sont non uniformes, s\'adaptant dynamiquement pour offrir des performances exceptionnelles sur les données fréquemment utilisées.

## 23.3 Arbres pour le Stockage Externe

Les structures de données étudiées jusqu\'à présent, telles que les arbres binaires de recherche équilibrés, sont conçues et optimisées pour un fonctionnement en mémoire vive (RAM). Elles supposent que l\'accès à n\'importe quel nœud de l\'arbre est une opération extrêmement rapide, avec un coût uniforme. Cependant, cette hypothèse s\'effondre lorsque les ensembles de données deviennent si volumineux qu\'ils ne peuvent plus être contenus en mémoire principale et doivent résider sur un support de stockage externe, comme un disque dur (HDD) ou un disque à état solide (SSD). Dans ce contexte, le coût des opérations n\'est plus dominé par le nombre de comparaisons de clés, mais par le nombre d\'accès au dispositif de stockage.

### Motivation : Le Goulet d\'Étranglement des E/S Disque

La différence de performance entre la mémoire vive et le stockage sur disque est astronomique. Un accès à la RAM se mesure en nanosecondes, tandis qu\'un accès à un disque dur se mesure en millisecondes, soit un facteur de différence de l\'ordre de 105 à 106. Un seul accès disque peut donc correspondre au temps d\'exécution de centaines de milliers, voire de millions d\'instructions CPU. Ce décalage massif est connu sous le nom de

**goulet d\'étranglement des entrées/sorties (E/S)**.

Lorsqu\'un programme a besoin de données stockées sur disque, il ne lit pas un seul octet à la fois. Le système d\'exploitation lit un bloc contigu de données, appelé une **page** ou un **bloc disque**, dont la taille est généralement de 4 Ko, 8 Ko ou plus. Toute structure de données destinée au stockage externe doit être conçue pour exploiter ce mécanisme. L\'objectif n\'est plus de minimiser le nombre de comparaisons, mais de **minimiser le nombre de pages disque lues ou écrites**.

Appliquer directement un arbre binaire de recherche, même équilibré, au stockage sur disque serait catastrophique. Chaque nœud est petit et serait probablement stocké dans une page disque différente. Pour parcourir un chemin de hauteur h=log2​n, il faudrait effectuer h accès disque distincts. Pour un milliard de clés (n=109), cela représenterait environ 30 accès disque, ce qui serait beaucoup trop lent pour des opérations fréquentes.

La solution consiste à concevoir une structure arborescente dont le facteur de branchement est très élevé. En stockant un grand nombre de clés et de pointeurs enfants dans un seul nœud, on peut faire en sorte que la taille d\'un nœud corresponde à la taille d\'une page disque. Un facteur de branchement élevé réduit considérablement la hauteur de l\'arbre. Si un nœud peut avoir m enfants, la hauteur de l\'arbre devient O(logm​n). Si m est de l\'ordre de plusieurs centaines, la hauteur d\'un arbre contenant des milliards d\'éléments peut être réduite à seulement 3 ou 4 niveaux. Une recherche ne nécessiterait alors que 3 ou 4 accès disque, une amélioration spectaculaire. C\'est précisément le principe qui sous-tend les B-arbres.

### B-Arbres

Le B-arbre (ou *B-tree* en anglais, où \'B\' peut signifier *Balanced*, *Bayer*, ou *Boeing*) est une structure de données en arbre conçue spécifiquement pour les systèmes de stockage où les données sont lues et écrites par blocs. C\'est une généralisation de l\'arbre binaire de recherche où un nœud peut avoir de nombreux enfants.

#### Définition et Propriétés

Un B-arbre est défini par un entier t ≥ 2 appelé le **degré minimal**. Chaque nœud d\'un B-arbre (sauf la racine) doit contenir entre t-1 et 2t-1 clés. L\'ordre m de l\'arbre est souvent défini comme m = 2t, représentant le nombre maximal d\'enfants qu\'un nœud peut avoir. Un B-arbre d\'ordre m ou de degré minimal t doit satisfaire les propriétés suivantes  :

> **Contenu des Nœuds :** Chaque nœud x contient x.n clés, stockées dans un ordre croissant : x.cleˊ1​≤x.cleˊ2​≤⋯≤x.cleˊx.n​. Chaque nœud interne contient également x.n + 1 pointeurs vers ses enfants : x.c1​,x.c2​,...,x.cx.n+1​.
>
> **Propriété de Recherche :** Les clés dans un nœud interne agissent comme des points de séparation. Pour toute clé k stockée dans le sous-arbre enraciné en x.ci​, on a x.cleˊi−1​≤k≤x.cleˊi​.
>
> **Nombre de Clés :** Chaque nœud, à l\'exception de la racine, doit avoir au moins t-1 clés. Il est donc au moins à moitié plein. Chaque nœud peut avoir au plus 2t-1 clés. Un nœud est dit **plein** s\'il contient 2t-1 clés. La racine est une exception : elle peut avoir moins de t-1 clés (de 1 à 2t-1).
>
> **Nombre d\'Enfants :** Chaque nœud interne avec k clés a k+1 enfants.
>
> **Équilibre en Hauteur :** Toutes les feuilles de l\'arbre se trouvent au même niveau. C\'est une condition d\'équilibre très forte qui garantit que l\'arbre ne dégénère jamais.

#### Opérations

##### Recherche

La recherche d\'une clé k dans un B-arbre est une généralisation de la recherche dans un BST.

> On commence à la racine. À chaque nœud x, on effectue une recherche (linéaire ou binaire) parmi les x.n clés du nœud.
>
> Si la clé k est trouvée dans le nœud x, la recherche est terminée.
>
> Sinon, on détermine l\'indice i tel que k se situerait entre x.cleˊi−1​ et x.cleˊi​. On suit alors le pointeur enfant x.ci​ pour descendre au niveau suivant.
>
> Si on atteint une feuille et que la clé n\'y est pas, alors elle n\'est pas dans l\'arbre.

La complexité en termes d\'accès disque est O(h)=O(logt​n), où h est la hauteur de l\'arbre.

##### Insertion

L\'insertion dans un B-arbre se fait toujours dans un nœud feuille. Cependant, pour maintenir les propriétés de l\'arbre, on ne peut pas simplement ajouter une clé à une feuille si celle-ci est déjà pleine. L\'opération clé de l\'insertion est le **fractionnement de nœud** (*node splitting*).

Une approche efficace consiste à utiliser un fractionnement préventif : en descendant l\'arbre pour trouver l\'emplacement d\'insertion, si on rencontre un nœud plein, on le fractionne immédiatement avant de continuer la descente. Cela garantit qu\'au moment d\'insérer la clé dans une feuille, il y aura toujours de la place.

Algorithme de Fractionnement d\'un Nœud Plein :

Soit y un nœud plein (2t-1 clés) qui est l\'enfant i d\'un nœud parent x (qui n\'est pas plein).

> La clé médiane de y (la t-ième clé) est promue et insérée dans le parent x.
>
> Le nœud y est divisé en deux nouveaux nœuds. Le premier contient les t-1 clés plus petites que la médiane, et le second contient les t-1 clés plus grandes.
>
> Ces deux nouveaux nœuds deviennent des enfants adjacents de x.

Ce processus garantit que toutes les propriétés du B-arbre sont maintenues. Si la racine elle-même devient pleine et doit être fractionnée, une nouvelle racine est créée au-dessus de l\'ancienne. C\'est la **seule façon pour un B-arbre de grandir en hauteur**.

**Pseudo-code de l\'Insertion :**

> Extrait de code

PROCÉDURE INSERER_B_ARBRE(T, k)\
r ← T.racine\
SI r.n = 2\*t - 1 ALORS // La racine est pleine\
s ← ALLOUER_NŒUD()\
T.racine ← s\
s.feuille ← FAUX\
s.n ← 0\
s.c ← r\
FRACTIONNER_ENFANT_B_ARBRE(s, 1)\
INSERER_NON_PLEIN_B_ARBRE(s, k)\
SINON\
INSERER_NON_PLEIN_B_ARBRE(r, k)\
FIN SI\
\
PROCÉDURE INSERER_NON_PLEIN_B_ARBRE(x, k)\
i ← x.n\
SI x.feuille ALORS\
TANT QUE i ≥ 1 ET k \< x.clé\[i\] FAIRE\
x.clé\[i+1\] ← x.clé\[i\]\
i ← i - 1\
FIN TANT QUE\
x.clé\[i+1\] ← k\
x.n ← x.n + 1\
ECRIRE_DISQUE(x)\
SINON\
TANT QUE i ≥ 1 ET k \< x.clé\[i\] FAIRE\
i ← i - 1\
FIN TANT QUE\
i ← i + 1\
LIRE_DISQUE(x.c\[i\])\
SI x.c\[i\].n = 2\*t - 1 ALORS\
FRACTIONNER_ENFANT_B_ARBRE(x, i)\
SI k \> x.clé\[i\] ALORS\
i ← i + 1\
FIN SI\
FIN SI\
INSERER_NON_PLEIN_B_ARBRE(x.c\[i\], k)\
FIN SI

##### Suppression

La suppression dans un B-arbre est plus complexe. Elle doit garantir qu\'aucun nœud ne devient sous-peuplé (c\'est-à-dire avec moins de t-1 clés). Si la suppression d\'une clé rend un nœud sous-peuplé, un rééquilibrage est nécessaire. Deux stratégies sont possibles  :

> **Redistribution :** Si un frère adjacent (gauche ou droit) a plus que le minimum de clés requis, on peut \"emprunter\" une clé de ce frère. La clé est déplacée du frère vers le parent, et une clé du parent est déplacée vers le nœud sous-peuplé.
>
> **Fusion :** Si les deux frères adjacents n\'ont que le minimum de clés (t-1), on ne peut pas emprunter. Dans ce cas, on fusionne le nœud sous-peuplé avec l\'un de ses frères. Cette fusion implique de faire descendre une clé du nœud parent pour qu\'elle devienne la clé médiane du nouveau nœud fusionné.

Cette opération de fusion peut rendre le nœud parent sous-peuplé, propageant potentiellement le processus de rééquilibrage jusqu\'à la racine. Si la racine devient vide (avec 0 clé) après une fusion, elle est supprimée et son unique enfant devient la nouvelle racine, réduisant ainsi la hauteur de l\'arbre.

### B+ Arbres

Le B+ arbre est une variante du B-arbre qui est devenue la structure de données de facto pour l\'implémentation d\'index dans les systèmes de gestion de bases de données (SGBD) modernes comme MySQL, PostgreSQL et Oracle. Il optimise la structure du B-arbre pour les types de requêtes les plus courants dans les bases de données, notamment les recherches par plage et les parcours séquentiels.

#### Structure et Différences Clés

Le B+ arbre modifie la structure du B-arbre de deux manières fondamentales  :

> **Stockage des Données Uniquement dans les Feuilles :** Contrairement aux B-arbres où les clés et les données associées peuvent être stockées dans n\'importe quel nœud (interne ou feuille), dans un B+ arbre, **toutes les données sont stockées exclusivement dans les nœuds feuilles**. Les nœuds internes ne contiennent que des copies des clés, qui agissent comme des \"panneaux indicateurs\" pour guider la recherche vers la bonne feuille. Ces clés dans les nœuds internes sont des séparateurs.
>
> **Chaînage des Nœuds Feuilles :** Tous les nœuds feuilles sont liés séquentiellement les uns aux autres, formant une **liste doublement chaînée**. Ce chaînage se fait via des pointeurs \"frère suivant\" et \"frère précédent\".

Ces deux modifications structurelles ont des implications profondes sur les performances et l\'utilisation de la structure.

#### Avantages pour les Index de Bases de Données

La conception du B+ arbre est une réponse directe aux besoins des SGBD, où les opérations ne se limitent pas à des recherches de points uniques.

> **Efficacité des Recherches par Plage (Range Queries) :** C\'est l\'avantage le plus significatif. Supposons qu\'une requête demande tous les enregistrements dont la clé est comprise entre k1 et k2 (par exemple, SELECT \* FROM employes WHERE salaire BETWEEN 50000 AND 60000). Avec un B+ arbre, l\'algorithme effectue une recherche standard pour trouver la feuille contenant la clé k1. Une fois cette feuille atteinte, il n\'est plus nécessaire de remonter dans l\'arbre. On peut simplement **parcourir la liste chaînée des feuilles** en suivant les pointeurs \"frère suivant\" jusqu\'à ce que l\'on rencontre une clé supérieure à k2. Cette opération est extrêmement efficace car elle implique des lectures disque séquentielles, qui sont beaucoup plus rapides que des lectures aléatoires. Dans un B-arbre standard, une telle requête nécessiterait un parcours complexe de plusieurs sous-arbres.
>
> **Facteur de Branchement Plus Élevé :** Puisque les nœuds internes ne stockent que des clés (qui sont généralement de petite taille) et des pointeurs, et non des enregistrements de données potentiellement volumineux, ils peuvent contenir beaucoup plus de clés pour une même taille de page disque. Un nombre plus élevé de clés par nœud signifie un **facteur de branchement (fanout) plus élevé**. Un fanout plus élevé conduit à un arbre de plus faible hauteur, ce qui se traduit directement par moins d\'accès disque pour atteindre les données.
>
> **Uniformité et Prévisibilité des Recherches :** Dans un B+ arbre, toutes les recherches, qu\'elles soient fructueuses ou non, se terminent dans un nœud feuille. Cela signifie que tous les chemins de recherche ont la même longueur (la hauteur de l\'arbre), ce qui rend les performances des opérations de recherche plus uniformes et prévisibles.
>
> **Simplification des Opérations d\'Insertion et de Suppression :** Comme les données ne se trouvent que dans les feuilles, les opérations de fractionnement et de fusion sont légèrement plus simples à gérer. Les clés dans les nœuds internes sont des copies et peuvent être gérées plus facilement lors des réorganisations.

Le B+ arbre est un exemple paradigmatique de co-conception entre une structure de données et les contraintes matérielles et applicatives de son environnement. Il ne se contente pas de résoudre le problème abstrait de la recherche sur disque ; il est finement réglé pour les motifs d\'accès qui dominent les charges de travail des bases de données, ce qui explique sa domination quasi totale dans ce domaine.

### Tableau Comparatif : B-Arbre vs. B+ Arbre

  ------------------------------- ----------------------------------------------------------------- -------------------------------------------------------------------
  Caractéristique                 B-Arbre                                                           B+ Arbre

  **Stockage des données**        Nœuds internes et feuilles                                        Nœuds feuilles uniquement

  **Redondance des clés**         Aucune (chaque clé est unique)                                    Oui (les clés des nœuds internes sont répétées dans les feuilles)

  **Structure des feuilles**      Identique aux nœuds internes                                      Nœuds de données, chaînés en liste

  **Recherche par point**         Potentiellement plus rapide (peut s\'arrêter à un nœud interne)   Toujours jusqu\'à une feuille (plus prévisible)

  **Recherche par plage**         Inefficace (nécessite un parcours en profondeur)                  Très efficace (parcours de la liste chaînée des feuilles)

  **Complexité (accès disque)**   O(logt​n)                                                          O(logt​n) (avec un t potentiellement plus grand)

  **Utilisation typique**         Systèmes de fichiers                                              Index de bases de données
  ------------------------------- ----------------------------------------------------------------- -------------------------------------------------------------------

## 23.4 Structures Spécialisées

Alors que les arbres équilibrés et les B-arbres fournissent des solutions robustes pour les opérations de dictionnaire générales, de nombreux problèmes en informatique nécessitent des structures de données optimisées pour des types de données ou des motifs de requêtes spécifiques. Cette section explore un éventail de structures spécialisées conçues pour exceller dans des domaines tels que le traitement de chaînes de caractères, l\'indexation de données spatiales et les scénarios où la probabilité peut être exploitée pour gagner en efficacité.

### 23.4.1 Tries et Arbres de suffixes

Les Tries et les arbres de suffixes sont des structures arborescentes optimisées pour la manipulation et la recherche de chaînes de caractères. Elles exploitent la structure préfixale ou suffixale des chaînes pour offrir des performances inégalées pour certaines opérations.

#### Tries (Arbres de Préfixes)

Un **trie**, également appelé arbre de préfixes ou arbre digital, est une structure de données arborescente utilisée pour stocker un ensemble dynamique de chaînes de caractères. Contrairement aux arbres binaires de recherche, un nœud dans un trie ne stocke pas la clé qui lui est associée. Au lieu de cela, la position d\'un nœud dans l\'arbre définit la clé avec laquelle il est associé. Chaque chemin de la racine à un nœud représente un préfixe commun à toutes les chaînes stockées dans le sous-arbre de ce nœud.

##### Structure

> La racine représente la chaîne vide.
>
> Chaque nœud interne a un nombre variable d\'enfants, un pour chaque caractère possible de l\'alphabet. Les arêtes menant aux enfants sont étiquetées par ces caractères.
>
> Les chemins de la racine à un nœud correspondent à des préfixes.
>
> Les nœuds qui correspondent à la fin d\'une chaîne complète dans l\'ensemble sont marqués, par exemple avec un drapeau booléen, car un mot peut être le préfixe d\'un autre (par exemple, \"car\" et \"carton\").

##### Opérations et Complexité

L\'efficacité des tries découle du fait que la complexité des opérations dépend de la longueur de la chaîne L et non du nombre de chaînes n stockées dans la structure.

> **Insertion :** Pour insérer une chaîne, on parcourt le trie depuis la racine, en suivant les arêtes correspondant aux caractères de la chaîne. Si un chemin n\'existe pas, de nouveaux nœuds sont créés. Le dernier nœud est marqué comme terminal. Complexité : O(L).
>
> **Recherche :** La recherche d\'une chaîne suit le même parcours. Si le chemin existe et que le nœud final est marqué comme terminal, la chaîne est dans l\'ensemble. Complexité : O(L).
>
> **Recherche de préfixe :** Pour trouver toutes les chaînes commençant par un préfixe P, on parcourt le trie jusqu\'au nœud correspondant à P. Ensuite, un parcours en profondeur du sous-arbre enraciné en ce nœud permet de récupérer toutes les chaînes complètes.

##### Applications

Les tries sont particulièrement adaptés pour :

> **Dictionnaires et vérificateurs d\'orthographe :** Recherche rapide de mots.
>
> **Autocomplétion et suggestion de recherche :** C\'est leur application la plus connue. En tapant un préfixe, le système peut rapidement proposer toutes les complétions possibles en explorant le sous-arbre correspondant.
>
> **Routage IP :** Les routeurs utilisent des tries pour trouver la plus longue correspondance de préfixe pour les adresses IP.

L\'inconvénient principal des tries est leur consommation mémoire, qui peut être importante si l\'alphabet est grand et que les préfixes sont peu partagés.

#### Arbres de Suffixes

Un **arbre de suffixes** est une structure de données beaucoup plus puissante, conçue pour l\'indexation et la recherche rapide de sous-chaînes au sein d\'un seul texte ou d\'un ensemble de textes.

##### Concept et Structure

Pour un texte T de longueur n, l\'arbre de suffixes de T est un **trie compressé** qui contient **tous les suffixes** de T.

> **Trie de tous les suffixes :** Imaginez un trie standard où l\'on insère chaque suffixe de T (de T\[1..n\], T\[2..n\],\..., T\[n..n\]).
>
> **Compression :** Un trie de suffixes naïf aurait O(n2) nœuds. Pour le rendre pratique, on le compresse : toute chaîne de nœuds où chaque nœud n\'a qu\'un seul enfant est fusionnée en une seule arête étiquetée par la sous-chaîne correspondante. Le résultat est un arbre avec seulement O(n) nœuds.
>
> **Symbole terminal :** Pour s\'assurer qu\'aucun suffixe n\'est un préfixe d\'un autre, on ajoute un caractère terminal unique (souvent noté \$) qui n\'apparaît nulle part ailleurs dans le texte T.

La propriété la plus importante qui découle de cette construction est la suivante : **toute sous-chaîne de T est un préfixe d\'au moins un suffixe de T**.

##### Opérations et Applications

Grâce à cette propriété, l\'arbre de suffixes permet de résoudre de nombreux problèmes de chaînes de caractères de manière extraordinairement efficace. Une fois l\'arbre construit (ce qui peut être fait en temps O(n) avec des algorithmes avancés comme celui d\'Ukkonen ), les requêtes sont très rapides.

> **Recherche de sous-chaîne :** Pour rechercher un motif P de longueur m dans T, il suffit de voir si P correspond à un chemin depuis la racine de l\'arbre des suffixes. Cela se fait en temps O(m), indépendamment de la taille de T. C\'est une amélioration spectaculaire par rapport aux algorithmes classiques comme KMP qui sont en\
> O(n+m).
>
> **Comptage d\'occurrences :** Une fois le chemin pour P trouvé, le nombre de feuilles dans le sous-arbre à la fin de ce chemin correspond au nombre d\'occurrences de P dans T.
>
> **Plus longue sous-chaîne commune (LCS) :** En construisant un **arbre de suffixes généralisé** pour deux textes T1 et T2, la plus longue sous-chaîne commune correspond au chemin le plus profond menant à un nœud interne qui a des feuilles issues à la fois de T1 et de T2 dans son sous-arbre.
>
> **Bio-informatique :** Les arbres de suffixes sont fondamentaux en génomique pour l\'alignement de séquences, la recherche de gènes, et l\'identification de motifs répétés dans les séquences d\'ADN.

Le lien conceptuel entre les tries et les arbres de suffixes est crucial : un trie organise un *ensemble de chaînes distinctes* en fonction de leurs préfixes partagés. Un arbre de suffixes organise un *ensemble de chaînes liées* (tous les suffixes d\'une même chaîne) de la même manière. Cette simple idée de traiter tous les suffixes comme un ensemble à indexer débloque un outil puissant pour interroger la structure interne (c\'est-à-dire les sous-chaînes) du texte original. La compression est l\'astuce qui rend cette idée non seulement théoriquement élégante, mais aussi pratiquement réalisable en termes d\'espace mémoire.

### 23.4.2 Structures de données spatiales

La gestion de données géographiques ou géométriques, telles que des points, des lignes ou des polygones, nécessite des structures de données capables de répondre efficacement à des requêtes basées sur la position spatiale. Les structures de données spatiales partitionnent l\'espace pour regrouper les objets proches et accélérer les recherches.

#### Quadtrees

Le **Quadtree** est une structure de données arborescente utilisée pour partitionner un espace bidimensionnel en le subdivisant récursivement en quatre quadrants ou régions. C\'est l\'analogue bidimensionnel de l\'Octree (pour la 3D).

##### Structure et Types

Chaque nœud interne d\'un quadtree a exactement quatre enfants, correspondant aux quadrants Nord-Ouest, Nord-Est, Sud-Ouest et Sud-Est. La subdivision s\'arrête lorsqu\'un critère est atteint, par exemple lorsqu\'un quadrant ne contient plus qu\'un nombre maximal d\'objets ou devient homogène.

On distingue plusieurs types de quadtrees, dont les deux principaux sont :

> **Point Quadtree :** La subdivision de l\'espace est centrée sur les points de données eux-mêmes. Chaque nœud de l\'arbre stocke un point, et les quatre sous-arbres correspondent aux quadrants définis par les lignes horizontale et verticale passant par ce point. La structure de l\'arbre dépend fortement de l\'ordre d\'insertion des points.
>
> **Region Quadtree (PR Quadtree) :** La subdivision de l\'espace est fixe et régulière. Un carré est divisé en quatre carrés de taille égale. Un nœud est subdivisé si le nombre de points qu\'il contient dépasse un certain seuil. Les points de données ne sont stockés que dans les feuilles. C\'est une approche de décomposition de l\'espace (*space-driven*).

##### Applications

Les quadtrees sont utilisés dans de nombreux domaines :

> **Systèmes d\'Information Géographique (SIG) :** Pour indexer des objets géographiques et effectuer des recherches de proximité ou de fenêtre (trouver tous les objets dans un rectangle donné).
>
> **Détection de collisions dans les jeux vidéo et simulations physiques :** En partitionnant l\'espace de jeu, on peut rapidement éliminer les paires d\'objets qui sont trop éloignés pour entrer en collision, ne testant que ceux qui se trouvent dans les mêmes quadrants ou des quadrants voisins.
>
> **Compression d\'images :** Une image peut être représentée par un quadtree où chaque feuille correspond à un bloc de pixels de couleur uniforme. Les grandes zones de couleur unie peuvent être représentées par une seule feuille de haut niveau, ce qui permet une compression significative.

#### k-d Trees

Le **k-d tree** (arbre k-dimensionnel) est une généralisation de l\'arbre binaire de recherche à un espace de k dimensions. C\'est une structure de partitionnement de l\'espace qui divise récursivement l\'espace en deux demi-espaces.

##### Structure

Le k-d tree est un arbre binaire. À chaque niveau de l\'arbre, le partitionnement se fait le long d\'une dimension différente, en alternant cycliquement.

> Au niveau 0 (la racine), l\'espace est divisé par un hyperplan perpendiculaire à la première dimension (par exemple, l\'axe x).
>
> Au niveau 1, les deux sous-espaces sont divisés par des hyperplans perpendiculaires à la deuxième dimension (axe y).
>
> Au niveau 2, on divise selon la troisième dimension (axe z), et ainsi de suite, en revenant à la première dimension après la k-ième.

Le point de division est souvent choisi comme la **médiane** des points de données le long de l\'axe de coupe, ce qui tend à produire des arbres équilibrés. Contrairement au quadtree, la partition n\'est pas régulière mais s\'adapte à la distribution des données (*data-driven*).

##### Applications

Les k-d trees sont particulièrement efficaces pour :

> **Recherche de voisins les plus proches (Nearest Neighbor Search) :** L\'algorithme peut rapidement élaguer de grandes parties de l\'espace de recherche en comparant les distances au plan de coupe.
>
> **Recherches par plage (Range Searches) :** Trouver tous les points à l\'intérieur d\'une hyper-sphère ou d\'un hyper-rectangle.

##### Comparaison : Quadtree vs. k-d Tree

La différence fondamentale entre ces deux structures réside dans leur stratégie de partitionnement. Le quadtree utilise une décomposition pilotée par l\'espace (régulière), tandis que le k-d tree utilise une décomposition pilotée par les données (adaptative).

> Le **Quadtree** est plus simple à implémenter pour des dimensions fixes et basses (typiquement 2D ou 3D). Cependant, il peut devenir très inefficace si les données sont fortement regroupées (*clustered*), car il peut générer des branches très profondes et de nombreux nœuds vides dans les zones denses. Son facteur de branchement (\
> 2d) le rend également impraticable pour de hautes dimensions.
>
> Le **k-d Tree**, en s\'adaptant à la distribution des données, est souvent plus équilibré et plus efficace en espace. Étant un arbre binaire, sa structure est plus simple en termes de nombre d\'enfants. Cependant, il souffre également de la \"malédiction de la dimensionnalité\" (*curse of dimensionality*), et ses performances se dégradent rapidement lorsque le nombre de dimensions k devient grand.

### 23.4.3 Structures de données probabilistes

Les structures de données probabilistes sacrifient une petite et contrôlable marge d\'erreur ou une garantie de performance dans le pire des cas en échange d\'une efficacité spectaculaire en termes d\'espace mémoire ou de temps d\'exécution moyen. Elles sont devenues indispensables dans les systèmes traitant des données à très grande échelle (Big Data).

#### Filtre de Bloom

Un **filtre de Bloom** est une structure de données probabiliste, remarquablement efficace en espace, utilisée pour tester si un élément est membre d\'un ensemble.

##### Fonctionnement

La structure se compose de deux éléments :

> Un **tableau de m bits**, initialement tous à 0.
>
> **k fonctions de hachage indépendantes**, chacune produisant un entier entre 1 et m.
>
> **Ajout d\'un élément x :** On calcule les k hachages de x, h1​(x),h2​(x),...,hk​(x). Pour chaque résultat, on met le bit correspondant dans le tableau à 1.
>
> **Test d\'appartenance de y :** On calcule les k hachages de y. On vérifie les bits aux positions correspondantes dans le tableau.

Si **au moins un** de ces bits est à 0, alors y n\'est **certainement pas** dans l\'ensemble (c\'est un **vrai négatif**).

Si **tous** ces bits sont à 1, alors y est **probablement** dans l\'ensemble. Il peut s\'agir d\'un **vrai positif** ou d\'un **faux positif** (les bits ont pu être mis à 1 par d\'autres éléments).

La caractéristique clé est qu\'un filtre de Bloom **n\'a jamais de faux négatifs**.

##### Analyse de la Probabilité de Faux Positifs

La probabilité d\'un faux positif p dépend de la taille du tableau m, du nombre d\'éléments insérés n, et du nombre de fonctions de hachage k. En supposant des fonctions de hachage parfaitement aléatoires, la probabilité qu\'un bit spécifique soit encore à 0 après n insertions est (1−m1​)kn. La probabilité qu\'il soit à 1 est donc 1−(1−m1​)kn.

La probabilité de faux positif est la probabilité que les k bits testés pour un nouvel élément soient tous à 1, soit :

p≈(1−e−kn/m)k.84

Pour un m et un n donnés, le nombre optimal de fonctions de hachage k qui minimise cette probabilité est :

k=nm​ln(2).87

Avec moins de 10 bits par élément, on peut atteindre une probabilité de faux positifs de 1%.

##### Applications

Les filtres de Bloom sont utilisés lorsque les conséquences d\'un faux positif sont acceptables et que les économies d\'espace sont critiques :

> **Bases de données distribuées (ex: Google BigTable, Apache Cassandra) :** Pour éviter des accès disque coûteux pour des clés qui n\'existent pas. Le filtre en mémoire peut rapidement dire \"non\", et ne fait un accès disque que pour les \"probablement oui\".
>
> **Mise en cache Web :** Pour déterminer si une URL a déjà été visitée et doit être mise en cache.
>
> **Réseaux :** Pour filtrer les paquets malveillants ou redondants.

#### Skip Lists

Une **Skip List** (ou liste à sauts) est une structure de données probabiliste qui offre une alternative aux arbres binaires de recherche équilibrés. Elle maintient une collection d\'éléments triés et permet des opérations de recherche, d\'insertion et de suppression avec une complexité temporelle **attendue** de O(logn).

##### Structure

Une skip list est une hiérarchie de listes chaînées triées.

> Le niveau 0 est une liste chaînée ordinaire contenant tous les éléments.
>
> Le niveau 1 est une sous-liste du niveau 0, agissant comme une \"voie express\". Chaque élément du niveau 0 a une certaine probabilité p (typiquement 1/2 ou 1/4) d\'être également promu au niveau 1.
>
> Le niveau i+1 est construit de la même manière à partir du niveau i.
>
> Le processus se poursuit jusqu\'à ce qu\'un niveau soit vide. Chaque nœud a donc une \"hauteur\" déterminée de manière aléatoire lors de son insertion.

##### Opérations

> **Recherche :** La recherche d\'un élément x commence au niveau le plus élevé de la liste. On parcourt la liste de ce niveau jusqu\'à trouver un nœud dont le successeur a une clé plus grande que x. À ce point, on descend d\'un niveau et on répète le processus. Cette approche permet de \"sauter\" de grandes portions de la liste.
>
> **Insertion et Suppression :** Ces opérations suivent une logique similaire à la recherche pour trouver l\'emplacement de la modification. Pour l\'insertion, la hauteur du nouveau nœud est déterminée de manière aléatoire, et le nœud est inséré dans toutes les listes jusqu\'à cette hauteur.

##### Performance et Avantages

Bien que le pire cas pour une skip list soit O(n) (si, par malchance, aucun nœud n\'est promu aux niveaux supérieurs), la probabilité d\'un tel événement est extrêmement faible. L\'analyse probabiliste montre que la complexité attendue pour les opérations est de O(logn).

Les skip lists sont souvent préférées aux arbres équilibrés dans certains contextes (notamment pour les implémentations concurrentes) car leurs algorithmes sont conceptuellement plus simples, ne nécessitent pas de rotations complexes, et peuvent offrir de meilleures performances en pratique en raison de facteurs constants plus faibles et d\'une meilleure localité de cache.

## 23.5 Structures pour les ensembles disjoints (Union-Find)

La structure de données pour ensembles disjoints, plus connue sous le nom d\'**Union-Find** ou *Disjoint-Set Union (DSU)*, est une structure conçue pour gérer une partition d\'un ensemble d\'éléments en un certain nombre de sous-ensembles disjoints. Elle est remarquablement efficace pour répondre à deux types de requêtes : déterminer si deux éléments appartiennent au même sous-ensemble, et fusionner deux sous-ensembles.

### Définition de l\'ADT

Le type de données abstrait (ADT) Union-Find maintient une collection d\'ensembles disjoints et supporte trois opérations fondamentales  :

> **makeSet(x) :** Crée un nouvel ensemble contenant uniquement l\'élément x. Cet élément x est initialement le seul membre et le **représentant** de son ensemble.
>
> **find(x) :** Retourne le représentant de l\'ensemble auquel x appartient. Ce représentant est un élément unique de l\'ensemble qui sert d\'identifiant pour l\'ensemble tout entier. Cette opération permet de vérifier si deux éléments x et y sont dans le même ensemble en comparant find(x) et find(y).
>
> **union(x, y) :** Fusionne les deux ensembles qui contiennent x et y en un seul nouvel ensemble. L\'un des anciens représentants devient le représentant du nouvel ensemble fusionné.

Cette structure est particulièrement utile dans les algorithmes de graphes, comme l\'algorithme de Kruskal pour trouver un arbre couvrant de poids minimal, où elle sert à détecter efficacement les cycles, ou encore pour calculer les composantes connexes d\'un graphe.

### Implémentation et Optimisations

Bien qu\'une implémentation simple avec des listes chaînées soit possible, elle se révèle inefficace. L\'implémentation la plus performante et la plus courante utilise une collection d\'arbres, appelée une **forêt**, pour représenter les ensembles disjoints.

#### Implémentation par Forêt d\'Arbres

Dans cette approche, chaque ensemble est représenté par un arbre. Les nœuds de l\'arbre sont les éléments de l\'ensemble.

> Chaque nœud ne conserve qu\'un pointeur vers son **parent**.
>
> La **racine** de chaque arbre est le représentant de l\'ensemble. Une racine est un nœud dont le pointeur parent pointe vers lui-même.
>
> **makeSet(x) :** Crée un nouvel arbre avec un seul nœud x, qui est sa propre racine.
>
> **find(x) :** Pour trouver le représentant de x, on suit la chaîne de pointeurs parents depuis x jusqu\'à atteindre la racine.
>
> **union(x, y) :** On trouve d\'abord les racines des arbres contenant x et y (soit racine_x et racine_y). Ensuite, on fusionne les deux arbres en faisant de l\'une des racines le parent de l\'autre.

Cette implémentation simple peut, tout comme les BST, dégénérer en arbres qui sont essentiellement de longues listes chaînées, menant à une complexité de find en O(n). Pour éviter cela, deux optimisations cruciales sont appliquées simultanément.

#### Optimisation 1 : Union par Rang ou par Taille

Pour éviter de créer des arbres profonds lors de l\'opération union, on utilise une heuristique pour décider quel arbre attacher à l\'autre. Au lieu de faire un choix arbitraire, on attache toujours l\'arbre le plus \"petit\" sous la racine de l\'arbre le plus \"grand\".

> **Union par Taille :** On stocke la taille (nombre de nœuds) de chaque ensemble. Lors d\'une fusion, l\'ensemble avec le moins de nœuds est attaché à celui qui en a le plus.
>
> **Union par Rang :** On stocke pour chaque racine une borne supérieure sur la hauteur de son arbre, appelée **rang**. Lors d\'une fusion, l\'arbre de plus petit rang est attaché à la racine de l\'arbre de plus grand rang. Si les rangs sont égaux, on attache arbitrairement et on incrémente le rang de la nouvelle racine de 1.

L\'union par rang est généralement préférée. À elle seule, elle garantit que la hauteur des arbres est au plus O(logn), ce qui ramène la complexité de find à O(logn).

#### Optimisation 2 : Compression de Chemin

Cette optimisation accélère considérablement l\'opération find. L\'idée est d\'aplatir la structure de l\'arbre chaque fois qu\'une recherche est effectuée.

Lors d\'un appel à find(x), après avoir suivi le chemin jusqu\'à la racine r, on reparcourt ce même chemin une seconde fois pour faire en sorte que chaque nœud sur le chemin (y compris x) pointe **directement** vers la racine r. Les futurs appels à find pour n\'importe lequel de ces nœuds se feront alors en temps quasi constant.

##### Pseudo-code avec les deux Optimisations

On utilise un tableau parent pour stocker le parent de chaque élément et un tableau rang pour le rang.

> Extrait de code

PROCÉDURE MAKE_SET(x)\
parent\[x\] ← x\
rang\[x\] ← 0\
\
FONCTION FIND(x)\
SI parent\[x\] ≠ x ALORS\
parent\[x\] ← FIND(parent\[x\]) // Appel récursif et compression de chemin\
FIN SI\
RETOURNER parent\[x\]\
\
PROCÉDURE UNION(x, y)\
racine_x ← FIND(x)\
racine_y ← FIND(y)\
\
SI racine_x ≠ racine_y ALORS\
// Union par rang\
SI rang\[racine_x\] \> rang\[racine_y\] ALORS\
parent\[racine_y\] ← racine_x\
SINON SI rang\[racine_x\] \< rang\[racine_y\] ALORS\
parent\[racine_x\] ← racine_y\
SINON\
parent\[racine_y\] ← racine_x\
rang\[racine_x\] ← rang\[racine_x\] + 1\
FIN SI\
FIN SI

### Analyse de Complexité

Lorsqu\'elles sont utilisées ensemble, l\'union par rang et la compression de chemin ont un effet synergique spectaculaire sur la performance de la structure de données. L\'analyse de la complexité d\'une séquence d\'opérations n\'est pas triviale et requiert une analyse amortie avancée.

Le résultat, prouvé par Robert Tarjan, est que la complexité temporelle pour une séquence de m opérations makeSet, union, ou find sur n éléments est de O(m⋅α(n)), où α(n) est la **fonction inverse d\'Ackermann**.

#### La Fonction Inverse d\'Ackermann

La fonction d\'Ackermann, A(m,n), est un exemple canonique de fonction calculable mais non récursive primitive. Sa croissance est extraordinairement rapide, bien plus que toute fonction exponentielle, factorielle ou tour d\'exponentielles.

La fonction inverse d\'Ackermann, α(n), croît de manière extraordinairement lente. Elle est définie comme le plus petit k tel que A(k,k)≥n. Pour donner une idée de sa lenteur, pour toute valeur de n que l\'on peut raisonnablement écrire ou stocker dans l\'univers connu, α(n) est inférieur à 5.

Par conséquent, pour toutes les applications pratiques, la complexité amortie d\'une opération Union-Find est considérée comme étant **quasi constante**, souvent notée O(α(n)) par opération. Ce résultat remarquable fait de la structure Union-Find l\'une des structures de données les plus efficaces connues pour son domaine d\'application. L\'apparition de la fonction inverse d\'Ackermann dans cette analyse n\'est pas une simple curiosité mathématique ; elle révèle que la combinaison de ces deux heuristiques simples pousse la complexité de l\'algorithme jusqu\'à une limite fondamentale, définie par l\'une des fonctions à la croissance la plus lente que l\'on puisse imaginer.

## Conclusion

Ce chapitre a parcouru un large éventail de structures de données avancées, illustrant une progression fondamentale en science informatique : l\'identification des limites d\'une structure simple mène à la conception de solutions plus complexes et spécialisées. En partant de l\'arbre binaire de recherche, nous avons vu comment sa vulnérabilité à l\'ordre des données a nécessité l\'invention des mécanismes d\'auto-équilibrage des arbres AVL et Rouge-Noir, qui garantissent des performances logarithmiques robustes au prix d\'une complexité algorithmique accrue. Les Splay Trees ont offert une perspective différente, privilégiant l\'adaptation aux motifs d\'accès plutôt qu\'un équilibre structurel strict, démontrant la puissance de l\'analyse amortie.

Le passage aux B-arbres et B+ arbres a marqué un changement de paradigme, déplaçant l\'optimisation du CPU vers les E/S disque. Leur conception, caractérisée par un facteur de branchement élevé, est une réponse directe aux contraintes physiques du stockage externe et constitue le fondement des bases de données modernes.

Enfin, l\'exploration des structures spécialisées a révélé comment des conceptions sur mesure peuvent offrir des performances exceptionnelles pour des domaines de problèmes spécifiques. Les Tries et les arbres de suffixes ont transformé la recherche dans les chaînes de caractères en une opération linéaire en la longueur du motif. Les Quadtrees et k-d trees ont fourni des outils essentiels pour organiser et interroger les données spatiales. Les structures probabilistes, comme les filtres de Bloom et les Skip Lists, ont illustré un compromis moderne et puissant : l\'échange d\'une certitude absolue contre des gains massifs en espace et en simplicité. La structure Union-Find, avec sa complexité amortie quasi constante, a démontré qu\'une conception algorithmique élégante peut aboutir à une efficacité presque inégalée.

En définitive, le choix d\'une structure de données n\'est jamais une décision unique. Il s\'agit d\'un exercice d\'ingénierie qui nécessite une compréhension profonde des données, des opérations requises, des contraintes de performance et des compromis inhérents à chaque solution. L\'arsenal présenté dans ce chapitre fournit aux concepteurs de systèmes et aux ingénieurs logiciels les outils intellectuels nécessaires pour analyser ces compromis et pour construire des systèmes logiciels performants, évolutifs et robustes.

