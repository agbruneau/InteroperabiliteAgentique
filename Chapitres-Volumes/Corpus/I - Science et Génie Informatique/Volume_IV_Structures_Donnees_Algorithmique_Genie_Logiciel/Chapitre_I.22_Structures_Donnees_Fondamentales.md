# Chapitre I.22 : Structures de Données Fondamentales

## Introduction

L\'organisation efficiente des données constitue la pierre angulaire de l\'informatique, une vérité aussi fondamentale que la conception des algorithmes eux-mêmes. Une structure de données n\'est pas un simple conteneur passif, mais un participant actif au processus de calcul, définissant les frontières du possible et du performant. La manière dont l\'information est structurée dicte intrinsèquement la complexité et l\'efficacité des opérations qui la manipulent. Ainsi, le choix d\'une structure de données appropriée est une décision d\'ingénierie critique, capable de transformer un problème algorithmique insoluble en une solution élégante et rapide. L\'objectif de ce chapitre est de jeter un pont entre l\'abstraction mathématique de l\'organisation des données et les réalités pratiques de son implémentation au sein de systèmes à haute performance, en fournissant les fondements théoriques indispensables à la compréhension et à la conception des systèmes complexes.

Ce chapitre propose un parcours pédagogique rigoureux, débutant par le concept purement théorique du Type Abstrait de Données (TAD) en tant que contrat formel et immuable. Ce contrat spécifie le comportement attendu d\'un type de données sans imposer de contraintes sur sa réalisation concrète. Nous progresserons ensuite vers l\'étude de structures de données fondamentales, qui sont les implémentations physiques de ces contrats abstraits. Ce voyage de l\'abstrait vers le concret servira de thème récurrent, illustrant les compromis critiques entre la complexité temporelle (l\'efficacité en temps d\'exécution), la complexité spatiale (l\'utilisation de la mémoire) et la complexité d\'implémentation. La maîtrise de ces compromis est au cœur du génie logiciel et de la science informatique, car elle permet de justifier les choix de conception qui sous-tendent les logiciels robustes, maintenables et performants.

## Section 1 : Le Type Abstrait de Données (TAD) : Le Contrat Fondamental

Au cœur de la conception logicielle moderne se trouve le principe d\'abstraction, un outil intellectuel permettant de maîtriser la complexité en séparant les idées essentielles des détails d\'implémentation. En science informatique, la forme la plus pure de l\'abstraction des données est incarnée par le Type Abstrait de Données (TAD). Le TAD n\'est pas une structure de données, mais une spécification formelle, un contrat qui définit un type de données uniquement par son comportement observable, indépendamment de toute représentation physique en mémoire.

### 1.1. Définition Formelle d\'un TAD

Un Type Abstrait de Données est un modèle mathématique pour un type de données, défini du point de vue de l\'utilisateur. Cette définition se concentre exclusivement sur le \"quoi\" et non sur le \"comment\" : quelles sont les valeurs possibles que les données de ce type peuvent prendre, quelles sont les opérations autorisées sur ces données, et quel est le comportement de ces opérations. On qualifie ce type d\'abstrait précisément parce qu\'il ne spécifie ni la manière dont les données sont représentées en mémoire, ni la façon dont les opérations sont implémentées.

Pour garantir une spécification non ambiguë, on a recours à une **spécification algébrique**. Cette approche formelle décompose la définition d\'un TAD en plusieurs composantes clés, souvent résumées par l\'acronyme TUOPA  :

> **Type** : Le nom du type que l\'on définit (par exemple, Pile, File).
>
> **Utilise** : La liste des autres TAD que la spécification utilise (par exemple, une Pile peut utiliser le TAD Booléen pour son opération estVide).
>
> **Opérations** : Le prototypage de toutes les opérations, définissant leur nom, leurs arguments (domaine) et leur type de retour (co-domaine). Ces opérations se classent généralement en trois catégories :

**Constructeurs** : Opérations qui créent une instance du type (par exemple, creerPile()).

**Transformateurs** (ou modificateurs) : Opérations qui modifient l\'état d\'une instance (par exemple, empiler(p, e)).

**Observateurs** (ou accesseurs) : Opérations qui retournent une information sur l\'état d\'une instance sans la modifier (par exemple, sommet(p)).

> **Pré-conditions** : Les conditions qui doivent être vraies avant l\'appel d\'une opération pour que son comportement soit défini. Par exemple, la pré-condition pour l\'opération sommet(p) est que la pile p ne soit pas vide.
>
> **Axiomes** : Un ensemble de propositions logiques qui décrivent les relations entre les opérations et définissent leur sémantique. Les axiomes forment un système d\'équations qui gouverne le comportement du TAD. Par exemple, pour une pile p et un élément e, un axiome fondamental est sommet(empiler(p, e)) = e.

Pour illustrer la puissance de cette approche, considérons la définition des entiers naturels selon les axiomes de Peano, qui peut être vue comme la spécification d\'un TAD Naturel.

> **Nom** : Naturel
>
> **Constructeurs** :

0: → Naturel (0 est un naturel)

s: Naturel → Naturel (le successeur d\'un naturel est un naturel)

> **Opérateurs** :

plus: Naturel × Naturel → Naturel

> **Axiomes** :

plus(x, 0) = x

plus(x, s(y)) = s(plus(x, y))

Cette spécification définit l\'addition de manière purement axiomatique, sans aucune référence à une représentation binaire ou décimale. C\'est l\'essence même d\'un TAD : une définition comportementale complète et rigoureuse.

### 1.2. La Dichotomie Spécification vs. Implémentation

La distinction entre un TAD et une structure de données est l\'une des séparations conceptuelles les plus importantes en science informatique.

> **Le Type Abstrait de Données (le \"quoi\")** est une entité conceptuelle, une spécification. Il définit une interface et un comportement. C\'est une vue de haut niveau qui se concentre sur la sémantique des opérations.
>
> **La Structure de Données (le \"comment\")** est une entité concrète, une implémentation. C\'est une manière spécifique d\'organiser les données en mémoire pour satisfaire à la spécification du TAD.

Par exemple, le TAD Liste peut être implémenté par plusieurs structures de données distinctes : un tableau, une liste chaînée, etc. Chaque implémentation offre des compromis différents en termes de performance, mais toutes doivent respecter le contrat défini par le TAD Liste.

Cette dichotomie est au cœur du cycle de développement logiciel  :

> **Phase de Conception/Spécification** : Le concepteur définit le TAD de manière formelle, en se concentrant sur les besoins fonctionnels sans se préoccuper des contraintes techniques. C\'est à ce niveau que l\'on raisonne sur les algorithmes de manière abstraite.
>
> **Phase de Développement/Implémentation** : Le programmeur choisit une structure de données concrète (par exemple, une classe en programmation orientée objet) et écrit le code des fonctions (ou méthodes) pour donner corps aux opérations du TAD, en respectant scrupuleusement les axiomes et pré-conditions.
>
> **Phase d\'Utilisation** : Un autre programmeur (l\'utilisateur du TAD) utilise l\'implémentation via son interface publique (l\'API), sans avoir besoin de connaître les détails de la structure de données sous-jacente.

Cette séparation des préoccupations est fondamentale. Elle permet de repousser les décisions de représentation physique aux étapes ultérieures du développement, de ne pas être encombré de détails techniques lors de la conception, et de raisonner formellement sur la correction des algorithmes.

### 1.3. Principes de Génie Logiciel : Abstraction, Encapsulation et Modularité

L\'utilisation des TAD est l\'application directe de principes fondamentaux du génie logiciel, visant à produire du code efficace, maintenable et réutilisable.

> **Abstraction** : Comme nous l\'avons vu, l\'abstraction consiste à masquer les détails complexes et à ne présenter qu\'une interface simplifiée. Le TAD est l\'outil par excellence de l\'abstraction de données. Il permet aux programmeurs de manipuler des concepts de haut niveau (une Pile, un Dictionnaire) sans se soucier de la gestion des pointeurs, de l\'allocation mémoire ou des algorithmes de bas niveau qui les font fonctionner.
>
> **Encapsulation** : Ce principe consiste à regrouper les données et les méthodes qui les manipulent au sein d\'une seule unité (un objet ou un module), et à restreindre l\'accès direct à l\'état interne de cette unité. L\'encapsulation est le mécanisme par lequel le contrat du TAD est appliqué. En rendant les données internes\
> privées et en n\'exposant que les opérations du TAD comme des méthodes publiques, on garantit que l\'état de l\'objet ne peut être modifié que de manière contrôlée, conformément aux axiomes définis. Cela protège l\'intégrité des données contre des modifications inattendues ou inappropriées et assure la robustesse du système.
>
> **Modularité** : L\'encapsulation favorise la modularité. Un TAD bien encapsulé devient un module logiciel autonome et cohérent. Ce module peut être développé, testé et maintenu indépendamment du reste du système. Plus important encore, son implémentation interne peut être modifiée ou optimisée (par exemple, remplacer une liste chaînée par un tableau dynamique) sans impacter le code qui l\'utilise, tant que l\'interface publique (le contrat du TAD) reste inchangée. Cette interchangeabilité des implémentations est un pilier de la réutilisabilité et de la maintenabilité des grands systèmes logiciels.

La relation entre la spécification, l\'implémentation et l\'utilisation d\'un TAD peut être comprise de manière plus approfondie à travers l\'analogie d\'un contrat formel tripartite. Dans ce modèle, trois rôles distincts interagissent : le **Concepteur**, l\'**Implémenteur** et l\'**Utilisateur**. Le Concepteur, agissant comme un architecte juridique, rédige les termes du contrat : la spécification formelle du TAD, incluant les signatures des opérations, les pré-conditions et les axiomes. Ce document se doit d\'être rigoureux et non ambigu. L\'Implémenteur est l\'entrepreneur, légalement lié par ce document. Sa tâche consiste à fournir une réalisation concrète --- la structure de données --- qui respecte chaque clause du contrat. Enfin, l\'Utilisateur est le client qui se fie aux garanties du contrat. Il peut utiliser n\'importe quelle implémentation conforme avec l\'assurance qu\'elle se comportera comme spécifié. Ce découplage permet à l\'utilisateur de construire des systèmes plus vastes sans dépendre d\'une implémentation spécifique, ce qui facilite la réutilisation du code, la maintenance et l\'évolution future du logiciel. Ce modèle contractuel constitue le fondement théorique des bénéfices pratiques de l\'abstraction et de l\'encapsulation dans l\'ingénierie des systèmes logiciels à grande échelle.

## Section 2 : Structures de Données Linéaires Séquentielles : Le Tableau Dynamique

Après avoir établi le cadre conceptuel du Type Abstrait de Données, nous nous tournons vers la première et la plus fondamentale des structures de données séquentielles : la liste. Intuitivement, une liste est une collection ordonnée d\'éléments. L\'implémentation la plus directe de ce concept repose sur le tableau, une structure de données où les éléments sont stockés de manière contiguë en mémoire, permettant un accès direct et efficace via un indice. Cependant, la nature statique des tableaux traditionnels pose un défi majeur : leur taille est fixe. Le tableau dynamique émerge comme une solution élégante à ce problème, en encapsulant la gestion de la mémoire pour fournir l\'illusion d\'un tableau de taille variable.

### 2.1. Le TAD Liste : Interface Formelle

Le Type Abstrait de Données Liste formalise notre intuition d\'une collection séquentielle d\'éléments. Une liste est une séquence finie d\'éléments ⟨a0​,a1​,\...,an−1​⟩, où n est la longueur de la liste. Le premier élément, a0​, est appelé la tête de la liste, et le dernier, an−1​, la queue. La position de chaque élément est donnée par son indice, de 0 à n−1.

L\'interface du TAD Liste spécifie un ensemble d\'opérations fondamentales, indépendantes du type des éléments qu\'elle contient  :

> creerListe() → Liste : Crée et retourne une liste vide ⟨ ⟩.
>
> inserer(L: Liste, e: Element, pos: Entier) → Liste : Insère l\'élément e à la position pos dans la liste L. Les éléments de la position pos jusqu\'à la fin sont décalés d\'une position vers la droite.
>
> supprimer(L: Liste, pos: Entier) → Liste : Supprime l\'élément à la position pos de la liste L. Les éléments suivants sont décalés d\'une position vers la gauche.
>
> obtenir(L: Liste, pos: Entier) → Element : Retourne la valeur de l\'élément situé à la position pos.
>
> taille(L: Liste) → Entier : Retourne le nombre d\'éléments dans la liste.
>
> estVide(L: Liste) → Booléen : Retourne vrai si la liste ne contient aucun élément, faux sinon.

### 2.2. Implémentation par Tableau Dynamique

L\'implémentation la plus courante du TAD Liste est le tableau dynamique (parfois appelé ArrayList ou Vector). Cette structure de données utilise un tableau standard en interne mais gère dynamiquement sa taille pour s\'adapter au nombre d\'éléments stockés. Elle encapsule la complexité de l\'allocation et de la réallocation de la mémoire, offrant à l\'utilisateur une interface de liste flexible.

Une structure de tableau dynamique est typiquement composée de trois champs  :

> Un pointeur vers un bloc de mémoire alloué sur le tas, où les éléments sont stockés (ad pour adresse).
>
> Un entier représentant la capacité actuelle du tableau alloué (capacite).
>
> Un entier représentant le nombre d\'éléments actuellement stockés dans la liste (taille_utilisee).

Le principe de fonctionnement est le suivant : les éléments de la liste sont stockés dans les taille_utilisee premières cases du tableau. Tant que taille_utilisee \< capacite, l\'ajout de nouveaux éléments est une opération simple et rapide. Cependant, lorsque le tableau est plein (taille_utilisee == capacite), un mécanisme de redimensionnement est déclenché. Ce processus, bien que coûteux, est la clé de la flexibilité du tableau dynamique. Il se déroule en plusieurs étapes  :

> **Allocation** : Un nouveau bloc de mémoire, plus grand que l\'actuel, est alloué.
>
> **Copie** : Tous les éléments de l\'ancien tableau sont copiés dans le nouveau tableau.
>
> **Libération** : La mémoire occupée par l\'ancien tableau est libérée.
>
> **Mise à jour** : Les pointeurs et la variable de capacité de la structure sont mis à jour pour référencer le nouveau bloc de mémoire.

### 2.3. Algorithmes et Pseudo-code

Examinons le pseudo-code des opérations clés, en mettant en évidence le mécanisme de redimensionnement.

#### ajouterElement(T, element) (Ajout en fin de liste)

Cette opération ajoute un élément à la fin de la liste. C\'est ici que la gestion de la capacité est cruciale.

> Extrait de code

FONCTION ajouterElement(T: TableauDynamique, element: Element)\
// Vérifier si le tableau est plein\
SI T.taille_utilisee == T.capacite ALORS\
// Étape de redimensionnement\
nouvelle_capacite = T.capacite \* 2 // Stratégie de doublement\
nouveau_tableau = allouer_memoire(nouvelle_capacite)\
\
// Copier les anciens éléments dans le nouveau tableau\
POUR i DE 0 À T.taille_utilisee - 1 FAIRE\
nouveau_tableau\[i\] = T.ad\[i\]\
FIN POUR\
\
liberer_memoire(T.ad)\
T.ad = nouveau_tableau\
T.capacite = nouvelle_capacite\
FIN SI\
\
// Ajouter le nouvel élément\
T.ad = element\
T.taille_utilisee = T.taille_utilisee + 1\
FIN FONCTION

#### supprimerElement(T, indice)

La suppression d\'un élément à un indice arbitraire nécessite de décaler tous les éléments suivants pour combler le vide.

> Extrait de code

FONCTION supprimerElement(T: TableauDynamique, indice: Entier)\
// Vérifier la validité de l\'indice\
ASSERT(indice \>= 0 ET indice \< T.taille_utilisee)\
\
// Décaler les éléments vers la gauche\
POUR i DE indice À T.taille_utilisee - 2 FAIRE\
T.ad\[i\] = T.ad\[i + 1\]\
FIN POUR\
\
T.taille_utilisee = T.taille_utilisee - 1\
FIN FONCTION

#### accesElement(T, indice)

L\'accès à un élément est direct grâce à l\'arithmétique des pointeurs, une caractéristique fondamentale des tableaux.

> Extrait de code

FONCTION accesElement(T: TableauDynamique, indice: Entier) → Element\
// Vérifier la validité de l\'indice\
ASSERT(indice \>= 0 ET indice \< T.taille_utilisee)\
\
RETOURNER T.ad\[indice\]\
FIN FONCTION

### 2.4. Analyse de Complexité Approfondie : L\'Analyse Amortie

L\'analyse de complexité du tableau dynamique révèle une dualité intéressante. L\'accès (accesElement) est trivialement en temps constant, O(1). La suppression (supprimerElement) est en temps linéaire dans le pire des cas, O(n), en raison du décalage des éléments. L\'opération la plus fascinante est l\'ajout (ajouterElement).

Dans le cas le plus fréquent, où il reste de la place dans le tableau, l\'ajout se fait en O(1). Cependant, dans le cas rare où le tableau est plein, l\'opération de redimensionnement nécessite de copier n éléments, ce qui lui confère une complexité dans le pire des cas de O(n). Une analyse qui se contenterait de ce pire cas serait à la fois correcte et profondément trompeuse sur la performance réelle de la structure.

Pour obtenir une vision plus juste, on utilise l\'**analyse amortie**. Cette technique ne s\'intéresse pas au coût d\'une seule opération isolée, mais au coût moyen d\'une opération sur une longue séquence d\'opérations. Elle permet de \"lisser\" le coût des opérations rares et coûteuses sur l\'ensemble des opérations peu coûteuses.

Appliquons la **méthode par agrégation** pour analyser une séquence de n opérations ajouterElement sur un tableau initialement vide de capacité 1. Le choix de la stratégie de croissance est ici fondamental. Le doublement de la capacité n\'est pas un choix arbitraire ; il est la clé mathématique qui garantit une complexité temporelle amortie constante. Une stratégie de croissance arithmétique (par exemple, ajouter un nombre fixe de cases) conduirait à une complexité amortie linéaire, rendant la structure beaucoup moins efficace.

Démontrons ce point crucial. Considérons une séquence de N insertions.

> **Analyse de la croissance géométrique (doublement)** :

Les redimensionnements (opérations coûteuses) se produisent lorsque la taille atteint une puissance de 2, soit pour n=1,2,4,8,\...,2k éléments.

Le coût de l\'insertion i est ci​. Si i−1 n\'est pas une puissance de 2, ci​=1 (simple ajout). Si i−1 est une puissance de 2, soit i−1=2j, le coût est ci​=i=1+2j (copie des i−1 éléments existants plus l\'ajout du nouvel élément).

Le coût total pour N insertions est la somme des coûts de toutes les insertions : T(N)=∑i=1N​ci​.

Ce coût total est la somme des coûts non liés à la copie (N opérations à coût 1) et des coûts de copie. Les copies se produisent pour les tailles 1,2,4,\...,2k où 2k\<N.

Coût total des copies = 1+2+4+\...+2⌊log2​(N−1)⌋=2⌊log2​(N−1)⌋+1−1\<2N.

Le coût total T(N) est donc N (pour les ajouts) + (coût des copies) \<N+2N=3N.

Le coût amorti par opération est T(N)/N\<3N/N=3. Ce coût est donc constant, soit O(1).

> **Analyse de la croissance arithmétique (ajout de c cases)** :

Les redimensionnements se produisent lorsque la taille est un multiple de c, soit pour n=c,2c,3c,\...,k⋅c où k⋅c\<N.

Le nombre de redimensionnements est approximativement N/c.

Le coût total des copies est la somme des tailles lors de chaque redimensionnement : c+2c+3c+\...+(N/c)⋅c=c⋅(1+2+\...+N/c).

La somme des k premiers entiers est k(k+1)/2. Ici, k=N/c. Le coût des copies est donc proportionnel à c⋅(N/c)2, soit O(N2).

Le coût total T(N) est dominé par le coût des copies, soit O(N2).

Le coût amorti par opération est T(N)/N=O(N2)/N=O(N).

Cette analyse démontre formellement que la progression géométrique est essentielle. Elle assure que le coût élevé d\'un redimensionnement est \"amorti\" par un nombre suffisamment grand d\'insertions précédentes peu coûteuses. Cette propriété fait du tableau dynamique une implémentation extrêmement efficace du TAD Liste pour les opérations d\'ajout en fin de liste, malgré un coût dans le pire des cas qui pourrait sembler prohibitif.

## Section 3 : Structures de Données Linéaires Chaînées : La Liste Chaînée

Alors que le tableau dynamique offre une excellente performance pour l\'accès indexé et l\'ajout en fin de liste grâce à la contiguïté de la mémoire, il souffre d\'une faiblesse majeure : l\'insertion et la suppression d\'éléments en début ou au milieu de la structure sont des opérations coûteuses, nécessitant le décalage de nombreux éléments. La liste chaînée propose une approche alternative radicale. Au lieu de stocker les éléments dans un bloc mémoire contigu, elle les disperse en mémoire et les relie explicitement les uns aux autres à l\'aide de pointeurs. Cette flexibilité structurelle modifie fondamentalement les compromis de performance.

### 3.1. La Liste Simplement Chaînée

La forme la plus simple de liste chaînée est la **liste simplement chaînée**. Elle est définie comme une collection de nœuds (ou maillons), où chaque nœud est une structure contenant deux champs : la donnée elle-même (valeur) et un pointeur (suivant) vers le nœud suivant dans la séquence. La liste entière est accessible via un unique pointeur, appelé

tete (head), qui pointe vers le premier nœud. Le pointeur suivant du dernier nœud de la liste a une valeur spéciale, NULL (ou None), pour marquer la fin de la séquence.

#### Algorithmes et Analyse de Complexité

Les opérations sur une liste simplement chaînée impliquent principalement la manipulation de pointeurs. Analysons leur complexité.

> **ajouter_debut(L, valeur)** : L\'ajout en tête de liste est l\'opération la plus efficace.

Allouer un nouveau nœud.

Assigner valeur au champ de données du nouveau nœud.

Faire pointer le champ suivant du nouveau nœud vers l\'ancienne tête de la liste (L.tete).

Mettre à jour la tête de la liste pour qu\'elle pointe vers le nouveau nœud.\
Cette opération ne nécessite qu\'un nombre constant de manipulations de pointeurs, sa complexité est donc en O(1).25

> **ajouter_fin(L, valeur)** : L\'ajout en fin de liste est moins direct.

Allouer un nouveau nœud et initialiser sa valeur et son pointeur suivant à NULL.

Si la liste est vide, la tête pointe vers ce nouveau nœud.

Sinon, il faut parcourir la liste depuis la tête jusqu\'à trouver le dernier nœud (celui dont le champ suivant est NULL).

Mettre à jour le champ suivant de ce dernier nœud pour qu\'il pointe vers le nouveau nœud.\
Le parcours de la liste rend cette opération dépendante de sa longueur n. Sa complexité est donc en O(n).25

> **supprimer_debut(L)** : La suppression en tête est également très efficace.

Vérifier que la liste n\'est pas vide.

Stocker l\'adresse du deuxième nœud (L.tete.suivant).

Libérer la mémoire de l\'ancien nœud de tête.

Mettre à jour la tête de la liste pour qu\'elle pointe vers le deuxième nœud.\
La complexité est en O(1).28

> **supprimer(L, valeur)** : La suppression d\'un nœud arbitraire est l\'opération la plus complexe.

Parcourir la liste pour trouver le nœud contenant valeur.

Pendant le parcours, il est crucial de conserver un pointeur sur le nœud **précédent** celui à supprimer.

Une fois le nœud à supprimer (courant) et son prédécesseur (precedent) trouvés, on modifie le pointeur suivant du prédécesseur pour qu\'il \"saute\" par-dessus le nœud courant : precedent.suivant = courant.suivant.

Libérer la mémoire du nœud courant.\
La nécessité de trouver à la fois le nœud et son prédécesseur implique un parcours linéaire. La complexité est en O(n).29

> **rechercher(L, valeur)** et **accesParIndice(L, indice)** : Ces deux opérations nécessitent de parcourir la liste depuis la tête jusqu\'à trouver l\'élément ou atteindre l\'indice désiré. Leur complexité est donc en O(n).

### 3.2. La Liste Doublement Chaînée

La principale difficulté de la liste simplement chaînée réside dans l\'impossibilité de remonter la chaîne. La suppression d\'un nœud, par exemple, requiert une connaissance de son prédécesseur, ce qui oblige à un parcours depuis le début. La **liste doublement chaînée** résout ce problème en ajoutant un second pointeur dans chaque nœud.

Chaque nœud d\'une liste doublement chaînée contient trois champs : la donnée (valeur), un pointeur vers le nœud suivant (suivant), et un pointeur vers le nœud précédent (precedent). La structure globale est généralement gérée par deux pointeurs :

tete et queue, pointant respectivement sur le premier et le dernier élément.

#### Avantages et Analyse de Complexité

Le coût additionnel en mémoire (un pointeur par nœud) est compensé par des gains de performance significatifs pour certaines opérations.

> **Parcours Bidirectionnel** : Il est désormais possible de traverser la liste dans les deux sens, ce qui peut être un avantage algorithmique majeur.
>
> **ajouter_fin(L, valeur)** : Grâce au pointeur queue, l\'accès au dernier élément est direct. L\'ajout en fin de liste devient une opération en O(1), symétrique à l\'ajout en début.
>
> **supprimer(L, noeud)** : C\'est ici que la liste doublement chaînée révèle son principal avantage. Si l\'on dispose déjà d\'un pointeur sur le nœud à supprimer, la suppression peut se faire en temps constant. Le pointeur precedent donne un accès immédiat au prédécesseur, éliminant le besoin d\'un parcours.

noeud.precedent.suivant = noeud.suivant

noeud.suivant.precedent = noeud.precedent

Libérer la mémoire de noeud.\
La complexité de cette opération est en O(1).32

L\'ajout d\'un pointeur precedent dans la liste doublement chaînée transforme fondamentalement la nature de certaines opérations, notamment la suppression. Dans une liste simplement chaînée, la suppression d\'un nœud N est une opération qui requiert un contexte global : il est indispensable de connaître son prédécesseur, P, pour pouvoir mettre à jour le lien P.suivant. La recherche de ce prédécesseur impose un parcours potentiellement long, une opération en O(n). En revanche, dans une liste doublement chaînée, la suppression devient une opération purement locale. Un pointeur vers le nœud

N est suffisant, car le champ N.precedent fournit un accès immédiat, en O(1), à son prédécesseur. L\'algorithme de suppression ne manipule que les pointeurs du nœud lui-même et de ses voisins immédiats (N.precedent.suivant = N.suivant et N.next.prev = N.prev), sans aucune connaissance du reste de la liste. Cette localité de l\'information rend les listes doublement chaînées nettement supérieures pour les algorithmes où des éléments doivent être retirés efficacement à partir d\'une simple référence, comme dans la gestion des listes libres d\'un allocateur mémoire ou dans l\'implémentation de politiques d\'éviction de cache (par exemple, LRU -

*Least Recently Used*). Le prix à payer est une augmentation constante de l\'espace mémoire par nœud, un exemple classique du compromis espace-temps en informatique.

### 3.3. Synthèse Comparative : Tableau Dynamique vs. Listes Chaînées

Le choix entre un tableau dynamique et une liste chaînée dépend entièrement des opérations qui domineront l\'utilisation de la structure. Aucune n\'est universellement supérieure ; elles représentent des points différents sur le spectre des compromis performance-mémoire.

  -------------------------------------------------------- ------------------- -------------------------- --------------------------
  Opération                                                Tableau Dynamique   Liste Simplement Chaînée   Liste Doublement Chaînée

  **Accès par indice (get(i))**                            O(1)                O(n)                       O(n)

  **Recherche (search(val))**                              O(n)                O(n)                       O(n)

  **Insertion/Suppression en tête**                        O(n)                O(1)                       O(1)

  **Insertion/Suppression en queue**                       O(1) (amorti)       O(n)                       O(1)

  **Insertion/Suppression au milieu (ptr/indice connu)**   O(n)                O(n)                       O(1) (si ptr connu)

  **Utilisation Mémoire (Overhead)**                       Faible (contigu)    Modéré (1 ptr/élément)     Élevé (2 ptrs/élément)

  **Localité du Cache**                                    Excellente          Faible                     Faible
  -------------------------------------------------------- ------------------- -------------------------- --------------------------

Ce tableau synthétise les forces et faiblesses de chaque structure. Le tableau dynamique excelle pour l\'accès aléatoire rapide, tandis que les listes chaînées excellent pour les insertions et suppressions rapides aux extrémités (ou au milieu pour la liste doublement chaînée, si un pointeur est disponible). Le coût de cette flexibilité est la perte de l\'accès en temps constant et une moins bonne localité du cache, un facteur de performance non négligeable sur les architectures modernes.

## Section 4 : Structures Linéaires à Accès Restreint : Piles et Files

Les piles et les files sont des types abstraits de données fondamentaux qui, contrairement à la liste générale, imposent des restrictions strictes sur la manière dont les éléments peuvent être ajoutés et retirés. Ces contraintes ne sont pas des limitations mais des caractéristiques de conception qui modélisent des processus séquentiels courants en informatique. En se spécialisant, elles permettent des implémentations souvent plus simples et plus efficaces que celles d\'une liste complète.

### 4.1. Le TAD Pile (LIFO)

Une **pile** (en anglais, *stack*) est une structure de données linéaire qui suit le principe **LIFO (Last-In, First-Out)** : le dernier élément ajouté est le premier à être retiré. L\'analogie la plus courante est une pile d\'assiettes : on ne peut ajouter ou retirer une assiette que par le haut.

L\'interface du TAD Pile est définie par les opérations suivantes  :

> creerPile() → Pile : Crée une pile vide.
>
> empiler(P: Pile, e: Element) (ou push) : Ajoute l\'élément e au sommet de la pile P.
>
> depiler(P: Pile) → Element (ou pop) : Retire et retourne l\'élément situé au sommet de la pile P. Cette opération est indéfinie si la pile est vide.
>
> sommet(P: Pile) → Element (ou peek, top) : Retourne l\'élément au sommet de la pile P sans le retirer. Indéfinie si la pile est vide.
>
> estVide(P: Pile) → Booléen : Retourne vrai si la pile est vide, faux sinon.

Les piles sont omniprésentes en informatique. Leurs cas d\'usage classiques incluent la **pile d\'appels de fonctions** qui gère les contextes d\'exécution des sous-programmes, l\'**évaluation d\'expressions arithmétiques** (notamment en notation polonaise inversée), les algorithmes de **backtracking** (comme la recherche en profondeur dans un graphe) et la gestion de l\'historique \"annuler/rétablir\" (Undo/Redo) dans les applications.

### 4.2. Implémentations de la Pile et Analyse

L\'implémentation d\'une pile est simple et peut se faire efficacement avec les structures déjà étudiées.

> **Implémentation par Tableau Dynamique** : Une pile peut être implémentée à l\'aide d\'un tableau dynamique où le \"sommet\" de la pile correspond à la fin du tableau.

empiler équivaut à ajouter un élément à la fin du tableau (ajouterElement).

depiler équivaut à retirer le dernier élément.

sommet consiste à lire le dernier élément.\
Toutes ces opérations ont une complexité en O(1). Cependant, en raison du redimensionnement potentiel du tableau dynamique lors de l\'empilement, la complexité de empiler est plus précisément en O(1) amorti.38

> **Implémentation par Liste Chaînée** : Une liste simplement chaînée est une structure naturelle pour implémenter une pile. Le sommet de la pile correspond à la tête de la liste.

empiler équivaut à une insertion en tête de liste (ajouter_debut).

depiler équivaut à une suppression en tête de liste (supprimer_debut).

sommet consiste à lire la valeur du nœud de tête.\
Avec une liste chaînée, ces trois opérations ont une complexité garantie dans le pire des cas de O(1).35

### 4.3. Le TAD File (FIFO)

Une **file** (en anglais, *queue*) est une structure de données linéaire qui suit le principe **FIFO (First-In, First-Out)** : le premier élément ajouté est le premier à être retiré. L\'analogie est celle d\'une file d\'attente : la première personne arrivée est la première servie.

L\'interface du TAD File est définie par les opérations suivantes  :

> creerFile() → File : Crée une file vide.
>
> enfiler(F: File, e: Element) (ou enqueue) : Ajoute l\'élément e à la fin (queue) de la file F.
>
> defiler(F: File) → Element (ou dequeue) : Retire et retourne l\'élément situé au début (tête) de la file F. Indéfinie si la file est vide.
>
> tete(F: File) → Element (ou peek, front) : Retourne l\'élément en tête de file sans le retirer. Indéfinie si la file est vide.
>
> estVide(F: File) → Booléen : Retourne vrai si la file est vide, faux sinon.

Les files sont essentielles pour la gestion de ressources partagées et le traitement séquentiel. On les retrouve dans les **tampons (buffers)** pour les communications réseau ou les flux de données, les **files d\'impression**, les algorithmes de **parcours en largeur** dans les graphes, et les systèmes d\'**ordonnancement** de tâches dans les systèmes d\'exploitation.

### 4.4. Implémentations de la File et Analyse

L\'implémentation d\'une file est plus subtile que celle d\'une pile, car les opérations se font à deux extrémités distinctes.

> **Implémentation par Tableau (naïve)** : Si l\'on utilise un tableau simple où la tête de la file est toujours à l\'indice 0, l\'opération enfiler (ajout à la fin) est en O(1) (amorti), mais defiler devient une opération en O(n), car il faut décaler tous les éléments restants d\'une case vers la gauche. Cette implémentation est donc inefficace.
>
> **Implémentation par Tableau Circulaire (Tampon Circulaire)** : C\'est la solution efficace basée sur un tableau. On utilise un tableau de taille fixe et deux indices, tete et queue, qui parcourent le tableau de manière \"circulaire\".

L\'indice queue marque l\'emplacement où le prochain élément sera inséré.

L\'indice tete marque l\'emplacement du premier élément de la file.

Lorsque l\'un des indices atteint la fin du tableau, il revient au début (en utilisant l\'opérateur modulo : indice = (indice + 1) % capacite).\
Grâce à ce mécanisme, les éléments ne sont jamais décalés. enfiler et defiler se contentent de manipuler les indices et d\'accéder au tableau, ce qui leur confère une complexité en O(1).38 L\'inconvénient est la capacité fixe du tableau.

> **Implémentation par Liste Chaînée** : Pour obtenir des opérations en O(1) avec une capacité dynamique, on utilise une liste simplement chaînée avec un pointeur supplémentaire vers le dernier nœud (queue).

La structure de la file maintient deux pointeurs : tete et queue.

enfiler se fait en O(1) en utilisant le pointeur queue pour ajouter un nouveau nœud à la fin.

defiler se fait en O(1) en utilisant le pointeur tete pour supprimer le premier nœud.\
Cette implémentation est la plus flexible et offre d\'excellentes garanties de performance dans le pire des cas.41

Les choix d\'implémentation pour des TAD aussi simples que les piles et les files servent de microcosme pour illustrer les compromis fondamentaux entre les tableaux et les listes chaînées. Ce choix ne relève pas de la simple commodité, mais de la nature des garanties de performance requises par une application. Une pile implémentée avec un tableau dynamique bénéficie d\'une excellente localité du cache et d\'un faible surcoût mémoire par élément, mais son opération empiler a une complexité dans le pire des cas de O(n) et une complexité amortie de O(1). À l\'inverse, une pile implémentée avec une liste chaînée a un surcoût mémoire plus élevé (dû aux pointeurs) et une localité du cache potentiellement moins bonne, mais elle offre une garantie stricte de complexité en

O(1) dans le pire des cas pour empiler. Cette distinction est cruciale dans les systèmes temps réel, où une seule opération

empiler lente pourrait entraîner le non-respect d\'une échéance critique. Dans un tel contexte, l\'implémentation par liste chaînée est supérieure malgré son surcoût moyen plus élevé. Si seul le débit moyen est une préoccupation, l\'implémentation par tableau est souvent plus rapide en pratique. De même, pour les files, le tampon circulaire est une astuce algorithmique astucieuse pour atteindre O(1) mais avec une capacité fixe , tandis que la liste chaînée avec un pointeur de queue offre

O(1) avec une capacité dynamique au prix d\'un surcoût lié aux pointeurs. L\'étude de ces implémentations est donc une leçon fondamentale en ingénierie de la performance : il faut analyser non seulement le cas moyen, mais aussi la variance de la performance et les garanties exigées par le contexte du système.

## Section 5 : Structures Associatives : Le Dictionnaire et la Table de Hachage

Nous quittons maintenant le domaine des structures de données séquentielles pour aborder les structures associatives. Alors que les listes, piles et files organisent les données selon leur ordre d\'insertion ou leur position, les structures associatives les organisent selon une relation entre une **clé** unique et une **valeur**. Le type abstrait fondamental de cette catégorie est le dictionnaire, et son implémentation la plus emblématique et performante est la table de hachage.

### 5.1. Le TAD Dictionnaire

Le **Type Abstrait de Données Dictionnaire** (également appelé *map*, *tableau associatif* ou *table de symboles*) est une collection non ordonnée de paires (clé, valeur). La contrainte fondamentale est que chaque clé au sein d\'un dictionnaire doit être unique. Les clés servent d\'identifiants pour accéder aux valeurs associées.

L\'interface du TAD Dictionnaire définit les opérations de base suivantes  :

> creerDictionnaire() → Dictionnaire : Crée un dictionnaire vide.
>
> inserer(D: Dictionnaire, k: Cle, v: Valeur) (ou put) : Associe la valeur v à la clé k dans le dictionnaire D. Si la clé k existe déjà, son ancienne valeur est remplacée par v.
>
> obtenir(D: Dictionnaire, k: Cle) → Valeur (ou get) : Retourne la valeur associée à la clé k. Si la clé n\'existe pas, une valeur spéciale (par exemple NULL) ou une exception est retournée.
>
> supprimer(D: Dictionnaire, k: Cle) (ou remove) : Supprime la paire (clé, valeur) associée à la clé k du dictionnaire.
>
> contient(D: Dictionnaire, k: Cle) → Booléen : Retourne vrai si la clé k est présente dans le dictionnaire, faux sinon.

L\'objectif principal d\'un dictionnaire est de fournir un accès, une insertion et une suppression très rapides, idéalement en temps constant.

### 5.2. Principe de la Table de Hachage

La **table de hachage** est la structure de données la plus couramment utilisée pour implémenter le TAD Dictionnaire. Son idée centrale est d\'une simplicité et d\'une puissance remarquables : utiliser une fonction, appelée **fonction de hachage**, pour transformer une clé (de type potentiellement complexe, comme une chaîne de caractères) en un indice de tableau.

Soit un tableau de taille m. Une fonction de hachage h prend une clé k en entrée et retourne un entier h(k) tel que 0≤h(k)\<m. Cet entier est utilisé comme indice pour stocker la valeur associée à la clé k directement dans le tableau, à la position tableau\[h(k)\]. Si la fonction de hachage est bien conçue, cette opération de calcul d\'indice est en temps constant, permettant ainsi un accès, une insertion et une suppression en O(1) en moyenne.

Cependant, ce modèle idéal se heurte à un problème inévitable : les **collisions**. Une collision se produit lorsque deux clés distinctes, k1​ et k2​, produisent la même valeur de hachage, c\'est-à-dire h(k1​)=h(k2​). Puisqu\'une seule valeur peut être stockée à un indice donné du tableau, une stratégie de résolution des collisions est indispensable. La performance d\'une table de hachage dépend donc de deux facteurs clés : la qualité de sa fonction de hachage et l\'efficacité de sa stratégie de résolution des collisions.

### 5.3. Conception des Fonctions de Hachage

Une bonne fonction de hachage est la première ligne de défense contre les collisions. Elle doit posséder plusieurs propriétés  :

> **Déterministe** : Pour une même clé en entrée, elle doit toujours produire la même sortie.
>
> **Rapide à calculer** : Le calcul du hachage doit être une opération très rapide, idéalement en temps proportionnel à la taille de la clé.
>
> **Distribution Uniforme** : Elle doit distribuer les clés de manière aussi uniforme que possible sur l\'ensemble des indices du tableau. C\'est l\'hypothèse du **hachage uniforme simple**, où chaque clé a une probabilité égale d\'être hachée dans n\'importe laquelle des m alvéoles, indépendamment des autres clés.

Pour des applications cryptographiques, des propriétés plus fortes comme la résistance à la préimage (il est difficile de retrouver la clé à partir du hachage) et la résistance aux collisions (il est difficile de trouver deux clés qui ont le même hachage) sont nécessaires.

#### Hachage de Chaînes de Caractères

Une technique standard pour hacher des chaînes de caractères est la fonction de hachage polynomiale par roulement (polynomial rolling hash). Pour une chaîne s=s0​s1​\...sL−1​, le hachage est calculé comme suit :

h(s)=(∑i=0L−1​si​⋅pi)modm

où si​ est la valeur numérique du caractère à la position i, p est un nombre premier (souvent choisi proche de la taille de l\'alphabet), et m est la taille de la table (idéalement un grand nombre premier).56

#### Méthodes de Hachage Courantes

> **Méthode de la Division** : C\'est la méthode la plus simple : h(k)=kmodm. Pour qu\'elle soit efficace, le choix de m est crucial. Il est fortement recommandé de choisir pour m un nombre premier qui n\'est pas proche d\'une puissance de 2, afin d\'éviter que des motifs réguliers dans les données d\'entrée ne créent des accumulations de collisions.
>
> **Méthode de la Multiplication** : Cette méthode est moins sensible au choix de m. La formule est : h(k)=⌊m⋅(k⋅Amod1)⌋, où A est une constante telle que 0\<A\<1. (k⋅Amod1) correspond à la partie fractionnaire de k⋅A. Une valeur souvent recommandée pour A est (5​−1)/2≈0.618033 (le nombre d\'or).

### 5.4. Gestion des Collisions 1 : Le Chaînage Séparé

La stratégie de **chaînage séparé** (ou chaînage externe) est une méthode intuitive et robuste pour gérer les collisions. Le principe est de transformer le tableau de hachage en un tableau de listes chaînées. Chaque alvéole du tableau (appelée *bucket* ou seau) ne contient pas directement une valeur, mais un pointeur vers la tête d\'une liste chaînée. Cette liste regroupe toutes les paires (clé, valeur) dont la clé a été hachée à cet indice.

> **Insertion (inserer(k, v))** : On calcule l\'indice i=h(k). On parcourt la liste chaînée à la position tableau\[i\]. Si la clé k est trouvée, on met à jour sa valeur. Sinon, on ajoute une nouvelle paire (k, v) en tête de cette liste.
>
> **Recherche (obtenir(k))** : On calcule i=h(k) et on parcourt la liste chaînée à tableau\[i\] jusqu\'à trouver la clé k.
>
> **Suppression (supprimer(k))** : On calcule i=h(k) et on effectue une suppression standard dans la liste chaînée à tableau\[i\].

La performance de cette méthode dépend du **facteur de charge** (ou taux de remplissage) α=n/m, où n est le nombre d\'éléments et m est la taille du tableau. La longueur moyenne d\'une chaîne est α. Le temps moyen pour une recherche (ou une insertion/suppression) est donc le temps de calcul du hachage plus le temps de parcours de la liste, soit O(1+α). Si l\'on maintient

α comme une constante petite (par exemple en redimensionnant la table lorsque α dépasse un certain seuil), la performance moyenne est effectivement en O(1).

### 5.5. Gestion des Collisions 2 : L\'Adressage Ouvert

L\'**adressage ouvert** est une famille de techniques qui stockent toutes les paires (clé, valeur) directement dans le tableau principal. Lorsqu\'une collision se produit à l\'indice i=h(k), au lieu de créer une liste, on \"sonde\" le tableau à la recherche d\'une autre alvéole libre selon une séquence de sondage déterministe. La fonction de hachage est modifiée pour prendre en compte le numéro de la tentative de sondage

j (avec j=0,1,2,\...) : h(k,j).

> **Sondage Linéaire** : C\'est la méthode la plus simple. La séquence de sondage est h(k,j)=(h′(k)+j)modm. On examine séquentiellement les cases i, i+1, i+2,\... (en revenant au début si nécessaire) jusqu\'à trouver une case vide. Cette méthode est facile à implémenter mais souffre d\'un phénomène appelé **regroupement primaire** (*primary clustering*), où de longs blocs de cases occupées se forment, dégradant considérablement les performances de recherche.
>
> **Sondage Quadratique** : Pour éviter le regroupement primaire, le sondage quadratique utilise une séquence de la forme h(k,j)=(h′(k)+c1​j+c2​j2)modm. Les sauts sont de plus en plus grands, ce qui disperse mieux les clés. Cependant, cela peut créer un **regroupement secondaire**, où les clés qui ont le même hachage initial suivent la même séquence de sondage.
>
> **Double Hachage** : C\'est la méthode la plus performante en pratique. Elle utilise deux fonctions de hachage, h1​ et h2​. La séquence de sondage est h(k,j)=(h1​(k)+j⋅h2​(k))modm. L\'intervalle de sondage h2​(k) dépend de la clé elle-même. Ainsi, des clés différentes avec le même hachage initial h1​(k) auront des séquences de sondage différentes, ce qui élimine efficacement les problèmes de regroupement et se rapproche du comportement idéal du hachage uniforme.

Un défi de l\'adressage ouvert est la suppression. On ne peut pas simplement vider une case, car cela pourrait interrompre une chaîne de sondage et rendre des éléments inaccessibles. La solution consiste à utiliser un marqueur spécial, une **\"pierre tombale\"** (*tombstone*), pour marquer les cases comme supprimées mais faisant partie d\'une chaîne.

Le choix entre le chaînage séparé et l\'adressage ouvert illustre un compromis fondamental entre la simplicité algorithmique et la performance matérielle, en particulier en ce qui concerne la localité du cache du processeur. Le chaînage séparé utilise des listes chaînées, où chaque nouveau nœud est généralement alloué sur le tas. Par conséquent, les éléments qui se hachent dans le même seau peuvent être dispersés dans des emplacements mémoire éloignés. Lors du parcours d\'une longue chaîne, chaque accès à un nœud peut entraîner un défaut de cache, une opération lente où le CPU doit récupérer des données de la mémoire principale. En revanche, l\'adressage ouvert stocke tous les éléments dans un seul tableau contigu. Lors du sondage, les accès mémoire successifs se font souvent à des emplacements proches dans le tableau. Ce modèle d\'accès est très favorable au cache. Le pré-chargeur du CPU peut charger une ligne de cache entière contenant plusieurs alvéoles potentielles, rendant la séquence de sondage beaucoup plus rapide en pratique qu\'une série d\'opérations de suivi de pointeurs. Il s\'agit d\'un effet de second ordre, invisible dans l\'analyse standard en notation Grand O, mais qui peut avoir un impact considérable dans les applications à haute performance. Par conséquent, pour les systèmes critiques en performance, l\'adressage ouvert (en particulier avec le double hachage pour atténuer le regroupement) est souvent préféré malgré sa plus grande complexité d\'implémentation (par exemple, la gestion des \"pierres tombales\"). Le chaînage séparé est plus simple à coder et à raisonner, et reste adéquat lorsque les longueurs de chaîne sont maintenues courtes. Ce choix incarne un principe fondamental de l\'ingénierie des systèmes : les algorithmes doivent être conçus en tenant compte de l\'architecture matérielle sous-jacente.

  --------------------------------- ----------------------- ----------------------------- -----------------------------
  Critère                           Chaînage Séparé         Sondage Linéaire              Double Hachage

  **Complexité (moyenne)**          O(1+α)                  O(1/(1−α))                    Proche de O(1/(1−α))

  **Utilisation Mémoire**           Surcoût des pointeurs   Optimale (pas de pointeurs)   Optimale (pas de pointeurs)

  **Sensibilité au Regroupement**   Nulle                   Très élevée (primaire)        Faible

  **Localité du Cache**             Faible                  Excellente                    Bonne

  **Complexité de Suppression**     Simple                  Complexe (pierres tombales)   Complexe (pierres tombales)
  --------------------------------- ----------------------- ----------------------------- -----------------------------

## Section 6 : Structures de Priorité : La File de Priorité et le Tas Binaire

La dernière catégorie de structures de données fondamentales que nous aborderons est celle des structures de priorité. Alors qu\'une file standard traite les éléments selon leur ordre d\'arrivée, une file de priorité les traite selon une mesure de leur \"importance\" ou \"urgence\". Le type abstrait qui formalise ce concept est la file de priorité, et son implémentation la plus classique et efficace est le tas binaire.

### 6.1. Le TAD File de Priorité

Une **File de Priorité** est un type abstrait de données qui stocke une collection d\'éléments, chacun associé à une priorité. Les opérations fondamentales sont conçues pour gérer efficacement ces éléments sur la base de leur priorité. Contrairement à une file FIFO, l\'opération d\'extraction retire toujours l\'élément ayant la plus haute priorité.

L\'interface du TAD FileDePriorite comprend les opérations suivantes :

> creerFilePriorite() → FileDePriorite : Crée une file de priorité vide.
>
> inserer(FP: FileDePriorite, e: Element, p: Priorite) : Insère l\'élément e avec la priorité p dans la file.
>
> extraireMax(FP: FileDePriorite) → Element : Retire et retourne l\'élément ayant la plus haute priorité.
>
> voirMax(FP: FileDePriorite) → Element : Retourne l\'élément de plus haute priorité sans le retirer.
>
> augmenterPriorite(FP: FileDePriorite, e: Element, p_nouv: Priorite) : Augmente la priorité de l\'élément e à la nouvelle valeur p_nouv.

Des implémentations simples utilisant des tableaux non triés, des tableaux triés ou des listes chaînées sont possibles, mais elles entraînent une complexité linéaire (O(n)) pour au moins une des opérations critiques (inserer ou extraireMax). Le tas binaire offre une solution bien plus performante.

### 6.2. Le Tas Binaire comme Implémentation

Un **tas binaire** (*binary heap*) est une structure de données arborescente qui est une implémentation idéale pour une file de priorité. Il s\'agit d\'un arbre binaire qui satisfait deux propriétés fondamentales.

> Propriété Structurelle : Arbre Binaire Quasi-Complet\
> Un tas est un arbre binaire où tous les niveaux sont entièrement remplis, à l\'exception possible du dernier niveau, qui est rempli de gauche à droite. Cette structure garantit que l\'arbre est toujours bien équilibré, et que sa hauteur h est toujours O(logn), où n est le nombre de nœuds.70
>
> Propriété d\'Ordre (Propriété de Tas)\
> La clé de chaque nœud doit être supérieure ou égale (pour un tas-max) ou inférieure ou égale (pour un tas-min) aux clés de ses enfants. Dans ce chapitre, nous nous concentrerons sur le tas-max. Cette propriété implique que l\'élément ayant la plus grande clé (la plus haute priorité) se trouve toujours à la racine de l\'arbre, ce qui rend l\'opération voirMax triviale, en O(1).69

### 6.3. Représentation par Tableau

L\'une des caractéristiques les plus élégantes du tas binaire est qu\'en raison de sa structure quasi-complète, il peut être représenté de manière très compacte et efficace dans un simple tableau, sans avoir besoin de stocker des pointeurs explicites. La relation parent-enfant est entièrement déterminée par l\'arithmétique des indices. En utilisant une indexation à partir de 1 pour simplifier les formules :

> La racine de l\'arbre est stockée à l\'indice 1.
>
> Pour un nœud à l\'indice i :

Son fils gauche se trouve à l\'indice 2i.

Son fils droit se trouve à l\'indice 2i+1.

Son parent se trouve à l\'indice ⌊i/2⌋.

Cette représentation garantit une excellente localité de la mémoire et élimine le surcoût des pointeurs.

### 6.4. Opérations Fondamentales du Tas

Les opérations d\'insertion et de suppression doivent préserver les deux propriétés du tas. Elles le font via deux procédures de base : la percolation vers le haut et la percolation vers le bas.

> **inserer(element)**

**Préserver la structure** : Ajouter le nouvel élément à la première position libre du tableau, ce qui correspond à la prochaine feuille disponible de gauche à droite sur le dernier niveau.

Rétablir l\'ordre : Le nouvel élément peut avoir une clé plus grande que son parent, violant la propriété de tas. On effectue alors une opération de percolation vers le haut (percolate-up ou sift-up). On compare l\'élément avec son parent et on les échange s\'ils sont dans le mauvais ordre. On répète ce processus en remontant vers la racine jusqu\'à ce que l\'élément soit plus petit que son parent ou qu\'il devienne la nouvelle racine.\
La complexité de cette opération est bornée par la hauteur de l\'arbre, soit O(logn).69

> **extraire-max()**

**Accéder au max** : L\'élément maximal est à la racine (indice 1). On le sauvegarde pour le retourner.

**Préserver la structure** : Pour combler le vide à la racine, on prend le dernier élément du tas (la dernière feuille) et on le place à la racine. On décrémente ensuite la taille du tas.

Rétablir l\'ordre : Le nouvel élément à la racine a probablement une clé plus petite que ses enfants. On effectue une opération de percolation vers le bas (percolate-down ou sift-down). On compare le nœud avec ses enfants, on l\'échange avec le plus grand des deux (s\'il est plus petit que celui-ci), et on répète ce processus en descendant dans l\'arbre jusqu\'à ce que le nœud soit plus grand que ses deux enfants ou qu\'il devienne une feuille.\
La complexité est également bornée par la hauteur de l\'arbre, soit O(logn).69

### 6.5. Analyse Approfondie : L\'algorithme construire-tas

Pour construire un tas à partir d\'un ensemble de n éléments, l\'approche naïve consistant à effectuer n insertions successives aboutit à une complexité totale de O(nlogn). Cependant, un algorithme plus astucieux, souvent appelé buildHeap ou construire-tas, permet d\'accomplir cette tâche en temps linéaire, soit **O(n)**.

L\'algorithme buildHeap fonctionne de manière contre-intuitive, de bas en haut  :

> On place les n éléments dans un tableau, formant un arbre binaire quasi-complet qui ne respecte pas encore la propriété de tas.
>
> On observe que tous les nœuds de la seconde moitié du tableau (indices de ⌊n/2⌋+1 à n) sont des feuilles, et sont donc des tas triviaux d\'un seul élément.
>
> On parcourt les nœuds internes de l\'arbre en ordre inverse, de l\'indice ⌊n/2⌋ jusqu\'à la racine (indice 1).
>
> Pour chaque nœud, on applique la procédure de percolation vers le bas (percolate-down).

La raison pour laquelle cet algorithme est en O(n) est un résultat élégant et non trivial. L\'intuition initiale suggère une complexité de O(nlogn), car on effectue environ n/2 appels à percolate-down, une opération en O(logn). Cependant, cette analyse est trop pessimiste. La clé est de réaliser que la majorité des nœuds se trouvent près du bas de l\'arbre, où percolate-down est une opération très peu coûteuse.

Une analyse plus fine révèle la complexité linéaire. La propriété cruciale d\'un arbre binaire quasi-complet est qu\'environ la moitié de ses nœuds sont des feuilles. Pour ces

n/2 nœuds, le coût de percolate-down est nul. Environ n/4 nœuds se trouvent un niveau au-dessus des feuilles, et pour eux, percolate-down effectue au plus un échange. Environ n/8 nœuds sont deux niveaux au-dessus, avec un coût proportionnel à 2, et ainsi de suite.

Le coût total du travail peut être exprimé par la sommation suivante, où h est la hauteur d\'un nœud (distance à la feuille la plus basse) :

C=∑h=0⌊logn⌋​(nombre de nœuds aˋ la hauteur h)×O(h)

Le nombre de nœuds à la hauteur h est au plus ⌈n/2h+1⌉. Le coût total est donc borné par :

C≤∑h=0⌊logn⌋​⌈2h+1n​⌉⋅c⋅h≈2cn​∑h=0∞​2hh​

La somme ∑h=0∞​h/2h est une série arithmético-géométrique qui converge vers une constante (spécifiquement, 2). Par conséquent, le coût total C est proportionnel à n⋅(constante), ce qui démontre que la complexité de buildHeap est bien O(n).69 Cette analyse formelle explique pourquoi l\'intuition initiale est erronée : le travail n\'est pas

n×logn, mais plutôt une somme où les termes à coût élevé (proche de logn) sont multipliés par un très petit nombre de nœuds (la racine), tandis que les termes à faible coût sont multipliés par un grand nombre de nœuds.

## Conclusion

Ce chapitre a entrepris un voyage depuis les fondements théoriques des types de données jusqu\'à l\'analyse détaillée de leurs implémentations concrètes. Nous avons commencé par établir le Type Abstrait de Données comme un contrat formel, un outil d\'abstraction essentiel qui sépare le comportement spécifié (\"quoi\") de la structure de données sous-jacente (\"comment\"). Cette dichotomie, soutenue par les principes d\'encapsulation et de modularité, est la pierre angulaire de l\'ingénierie logicielle robuste et évolutive. Nous avons ensuite exploré les structures de données fondamentales, en examinant systématiquement les compromis inhérents à leur conception. Le tableau dynamique a illustré l\'efficacité de l\'accès contigu et la puissance de l\'analyse amortie. Les listes chaînées, simples et doubles, ont mis en évidence la flexibilité offerte par les pointeurs au détriment de la localité du cache. Les piles et les files ont démontré comment la restriction de l\'accès peut simplifier la sémantique et optimiser les implémentations pour des cas d\'usage spécifiques. Enfin, la table de hachage et le tas binaire ont révélé des solutions hautement performantes pour les problèmes d\'accès associatif et de gestion de priorités, en s\'appuyant sur des concepts algorithmiques sophistiqués comme les fonctions de hachage et la propriété de tas. Le choix d\'une structure de données n\'est jamais une décision triviale ; il s\'agit d\'une décision d\'ingénierie éclairée, fondée sur une compréhension nuancée des exigences opérationnelles, des modèles d\'accès aux données et des caractéristiques de performance asymptotique et pratique.

Les structures présentées ici ne sont que le point de départ. Elles constituent les briques élémentaires à partir desquelles des structures plus complexes et spécialisées sont construites. Les graphes, les arbres B, les tas de Fibonacci et d\'autres structures avancées s\'appuient toutes sur les principes et les composants que nous avons étudiés. Une maîtrise solide de ces fondements est donc indispensable pour aborder la conception d\'algorithmes et de systèmes complexes, qu\'il s\'agisse de systèmes d\'exploitation, de bases de données, de compilateurs ou de réseaux. La capacité à choisir, adapter et même inventer des structures de données appropriées reste l\'une des compétences les plus précieuses et les plus déterminantes de l\'informaticien et de l\'ingénieur.

  ------------------------------------ -------------------------------------- ----------------------- ------------------------------
  Structure de Données                 Opération Clé                          Complexité (Pire Cas)   Complexité (Amortie/Moyenne)

  **Tableau Dynamique**                Accès (par indice)                     O(1)                    O(1)

                                       Insertion/Suppression (fin)            O(n)                    O(1)

                                       Insertion/Suppression (début/milieu)   O(n)                    O(n)

  **Liste Simplement Chaînée**         Accès / Recherche                      O(n)                    O(n)

                                       Insertion/Suppression (tête)           O(1)                    O(1)

                                       Insertion/Suppression (queue)          O(n)                    O(n)

  **Liste Doublement Chaînée**         Accès / Recherche                      O(n)                    O(n)

                                       Insertion/Suppression (tête/queue)     O(1)                    O(1)

                                       Suppression (nœud connu)               O(1)                    O(1)

  **Pile (impl. Tableau Dyn.)**        empiler, depiler                       O(n)                    O(1)

  **Pile (impl. Liste Chaînée)**       empiler, depiler                       O(1)                    O(1)

  **File (impl. Tableau Circ.)**       enfiler, defiler                       O(1)                    O(1)

  **File (impl. Liste Chaînée)**       enfiler, defiler                       O(1)                    O(1)

  **Table de Hachage**                 Recherche, Insertion, Suppression      O(n)                    O(1) (si hachage uniforme)

  **File de Priorité (Tas Binaire)**   inserer                                O(logn)                 O(logn)

                                       extraire-max                           O(logn)                 O(logn)

                                       voir-max                               O(1)                    O(1)

                                       construire-tas                         O(n)                    O(n)
  ------------------------------------ -------------------------------------- ----------------------- ------------------------------

