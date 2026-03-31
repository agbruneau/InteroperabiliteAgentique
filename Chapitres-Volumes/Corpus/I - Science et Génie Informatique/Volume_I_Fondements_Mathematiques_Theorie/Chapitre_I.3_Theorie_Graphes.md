# Chapitre I.3 : Théorie des Graphes

## 3.1 Introduction : D\'un Problème de Ponts à une Théorie Universelle

La théorie des graphes, aujourd\'hui un pilier des mathématiques discrètes et de l\'informatique théorique, trouve son origine dans une énigme populaire du 18ème siècle. En 1736, la ville de Königsberg en Prusse (aujourd\'hui Kaliningrad, Russie) était divisée en quatre zones terrestres --- deux rives et deux îles --- reliées par sept ponts. Les habitants se demandaient s\'il était possible d\'effectuer une promenade qui traverse chaque pont une et une seule fois. Ce problème, en apparence anecdotique, a résisté à toutes les tentatives de résolution jusqu\'à ce qu\'il attire l\'attention du mathématicien suisse Leonhard Euler.

L\'approche d\'Euler fut révolutionnaire, non pas tant par la réponse qu\'il apporta, mais par la méthode qu\'il employa pour l\'obtenir. Il comprit que les détails géographiques --- la taille des îles, la longueur des ponts, la configuration exacte des rues --- étaient superflus. La seule information pertinente était la manière dont les zones étaient connectées les unes aux autres. Il réalisa alors une abstraction radicale : il représenta chaque zone terrestre par un point (un **sommet**) et chaque pont par une ligne reliant deux points (une **arête**). Ce faisant, il transforma un problème de topographie en un problème de structure pure, donnant naissance au premier graphe de l\'histoire. Cet acte d\'abstraction, qui consiste à modéliser un système complexe en ne conservant que ses relations structurelles, est aujourd\'hui au cœur de la démarche en sciences et en génie informatiques.

Une fois le problème modélisé, la solution d\'Euler devint d\'une clarté limpide. Il remarqua que pour qu\'un tel parcours soit possible, tout sommet servant d\'étape intermédiaire (c\'est-à-dire qui n\'est ni le point de départ ni le point d\'arrivée de la promenade) doit avoir un nombre pair d\'arêtes. En effet, chaque fois que l\'on entre dans une zone par un pont, on doit pouvoir en ressortir par un autre pont. Or, dans le graphe de Königsberg, les quatre sommets avaient un nombre impair de ponts (degrés 5, 3, 3 et 3). Euler put ainsi prouver mathématiquement, sans avoir à tester toutes les promenades possibles, qu\'un tel parcours était impossible. Cette preuve est remarquable car elle s\'applique directement à la réalité physique des ponts et fournit une explication sur la raison de cette impossibilité.

La contribution d\'Euler ne s\'est pas limitée à une simple réponse négative. Il a généralisé son raisonnement pour établir une condition nécessaire et suffisante qui caractérise l\'existence de tels chemins, connus aujourd\'hui sous le nom de chemins eulériens. Il a ainsi transformé la solution d\'un cas particulier en un théorème universel, illustrant une démarche scientifique fondamentale. Ce qui a débuté comme une énigme récréative est devenu un cadre mathématique d\'une portée immense, capable de modéliser des relations et des connexions dans une multitude de systèmes complexes. Aujourd\'hui, la théorie des graphes est omniprésente : elle est le langage des réseaux de communication et des réseaux sociaux, l\'outil de la logistique et de la planification urbaine, le fondement d\'algorithmes en bio-informatique pour le séquençage du génome, en conception de circuits électroniques, et même dans les neurosciences pour modéliser la connectivité du cerveau.

## 3.2 Fondements et Vocabulaire Formel des Graphes

Pour étudier les graphes de manière rigoureuse, il est indispensable d\'établir un vocabulaire formel et précis. Cette section introduit les définitions fondamentales qui constituent le langage de la théorie des graphes.

### 3.2.1 Définitions Formelles

Un graphe est une structure abstraite composée de deux types d\'éléments : des sommets et des liaisons entre ces sommets.

- **Graphe Non Orienté** : Un graphe non orienté G est formellement défini comme un couple G=(S,A), où S est un ensemble fini et non vide dont les éléments sont appelés **sommets** (ou nœuds), et A est un ensemble de paires de sommets {u,v} avec u,v∈S, appelées **arêtes**. L\'\
  **ordre** d\'un graphe est le cardinal de son ensemble de sommets, noté ∣S∣, et sa **taille** est le cardinal de son ensemble d\'arêtes, noté ∣A∣.

- **Graphe Orienté (ou Digraphe)** : Un graphe orienté G est un couple G=(S,A), où S est un ensemble fini de sommets et A est un ensemble de couples ordonnés de sommets (u,v), appelés **arcs**. Pour un arc\
  (u,v), le sommet u est appelé l\'**origine** (ou la queue) et le sommet v est l\'**extrémité** (ou la tête) de l\'arc.

### 3.2.2 Taxonomie des Graphes

La nature des arêtes et la structure globale permettent de classer les graphes en différentes familles.

- **Graphe Simple** : Un graphe est dit simple s\'il ne contient ni **boucle** (une arête ou un arc reliant un sommet à lui-même), ni arêtes multiples entre une même paire de sommets. Sauf indication contraire, les graphes considérés dans ce chapitre seront simples.

- **Multigraphe et Pseudo-graphe** : Un multigraphe autorise l\'existence de plusieurs arêtes (ou arcs) entre deux sommets. Un pseudo-graphe est un multigraphe qui autorise également les boucles. Le graphe modélisant le problème des ponts de Königsberg est un multigraphe.

- **Sous-graphe et Graphe Partiel** : Un graphe H=(S′,A′) est un **sous-graphe** de G=(S,A) si S′⊆S et A′⊆A. Si\
  S′=S, H est un **graphe partiel** de G.

- **Graphe Pondéré (ou Valué)** : Un graphe pondéré est un triplet G=(S,A,w), où (S,A) est un graphe et w:A→R est une fonction qui associe un **poids** (ou coût, ou valeur) à chaque arête ou arc.

### 3.2.3 Propriétés des Sommets et Arêtes

- **Adjacence et Incidence** : Dans un graphe (orienté ou non), deux sommets u et v sont dits **adjacents** s\'il existe une arête ou un arc les reliant. Une arête a={u,v} est dite **incidente** aux sommets u et v.

- **Degré d\'un Sommet** :

  - Dans un graphe non orienté, le **degré** d\'un sommet v, noté d(v) ou deg(v), est le nombre d\'arêtes qui lui sont incidentes. Une boucle est conventionnellement comptée pour 2 dans le calcul du degré. Un sommet de degré 0 est dit\
    **isolé** ; un sommet de degré 1 est dit **pendant**.

  - Dans un graphe orienté, on distingue le **degré sortant** d+(v), qui est le nombre d\'arcs ayant v pour origine, et le **degré entrant** d−(v), qui est le nombre d\'arcs ayant v pour extrémité.

- Lemme des Poignées de Main : Dans tout graphe non orienté G=(S,A), la somme des degrés des sommets est égale au double du nombre d\'arêtes :\
  \
  v∈S∑​d(v)=2∣A∣\
  \
  Ce lemme, également connu sous le nom de formule de la somme des degrés, est un premier exemple d\'un invariant structurel simple mais puissant. Il impose une contrainte fondamentale sur la structure de n\'importe quel graphe. La preuve repose sur un argument de double dénombrement : chaque arête {u,v} contribue exactement pour une unité au degré de u et pour une unité au degré de v. Ainsi, en sommant les degrés de tous les sommets, chaque arête est comptée précisément deux fois.4

  - **Corollaire** : Dans tout graphe non orienté, le nombre de sommets de degré impair est nécessairement pair. En effet, la somme des degrés étant un nombre pair (\
    2∣A∣), la somme des degrés des sommets de degré impair doit elle-même être paire, ce qui n\'est possible que si le nombre de termes de cette somme est pair.

### 3.2.4 Familles de Graphes Remarquables

La classification des graphes en familles aux propriétés bien définies n\'est pas un simple exercice de catalogage. Elle constitue une grille d\'analyse essentielle pour l\'étude de la complexité algorithmique. De nombreux problèmes, intraitables dans le cas général, deviennent résolubles en temps polynomial lorsqu\'ils sont restreints à l\'une de ces familles.

- **Graphe Complet (Kn​)** : Un graphe simple non orienté d\'ordre n est complet si chaque paire de sommets distincts est reliée par une arête. Un graphe Kn​ possède n(n−1)/2 arêtes et est (n−1)-régulier.

- **Graphe Biparti** : Un graphe est biparti si son ensemble de sommets S peut être partitionné en deux sous-ensembles disjoints U et V (c\'est-à-dire S=U∪V et U∩V=∅) de telle sorte que chaque arête du graphe relie un sommet de U à un sommet de V.

- **Graphe Régulier** : Un graphe est k-régulier si tous ses sommets ont le même degré k.

- **Arbre** : Un graphe connexe et acyclique. Cette famille fondamentale sera étudiée en détail dans la section 3.5.

- **Graphe Planaire** : Un graphe qui peut être dessiné sur un plan sans qu\'aucune de ses arêtes ne se croise. Cette famille sera étudiée en détail dans la section 3.7.

## 3.3 Représentation Informatique des Graphes

Pour qu\'un graphe puisse être traité par un algorithme, sa structure topologique doit être encodée dans une structure de données informatique. Le choix de cette représentation est une décision de conception fondamentale qui a des implications profondes sur l\'efficacité en temps et en espace des algorithmes. Ce choix dépend principalement des propriétés du graphe, notamment sa densité (le rapport entre son nombre d\'arêtes et le nombre maximal d\'arêtes possibles), et des opérations qui seront effectuées le plus fréquemment.

### 3.3.1 La Matrice d\'Adjacence

La matrice d\'adjacence est une représentation directe et intuitive des relations d\'adjacence dans un graphe.

- **Définition** : Pour un graphe G=(S,A) d\'ordre n, dont les sommets sont numérotés de 0 à n−1, la matrice d\'adjacence est une matrice carrée M de taille n×n.

  - Pour un **graphe non valué**, le coefficient M\[i\]\[j\] est égal à 1 s\'il existe une arête (ou un arc) entre le sommet i et le sommet j, et 0 sinon.

  - Pour un **graphe pondéré**, M\[i\]\[j\] contient le poids de l\'arête (i,j). Si l\'arête n\'existe pas, une valeur sentinelle, telle que l\'infini (∞) ou NIL, est utilisée.

- **Propriétés** : Dans le cas d\'un graphe non orienté, la matrice d\'adjacence est symétrique par rapport à sa diagonale principale (M\[i\]\[j\]=M\[j\]\[i\]). Une propriété combinatoire remarquable est que le coefficient\
  (i,j) de la matrice Mk (la k-ième puissance de M) correspond au nombre de chemins de longueur exactement k allant du sommet i au sommet j.

### 3.3.2 Les Listes d\'Adjacence

Les listes d\'adjacence offrent une représentation plus compacte, particulièrement adaptée aux graphes peu denses.

- **Définition** : Cette structure consiste en un tableau (ou une structure associative comme un dictionnaire) de n listes. La liste associée au sommet i contient l\'ensemble de ses voisins (ou successeurs dans un graphe orienté).

  - Pour un **graphe pondéré**, chaque élément de la liste peut être une paire (voisin, poids) pour stocker le coût de l\'arête correspondante.

- **Implémentation** : En pratique, un dictionnaire (ou une table de hachage) est souvent utilisé, où les clés sont les identifiants des sommets et les valeurs sont les listes de leurs voisins. Cette approche est flexible car elle permet de représenter des sommets par des objets arbitraires (hachables) et pas seulement par des entiers.

### 3.3.3 Analyse Comparative

Le choix entre une matrice et des listes d\'adjacence illustre un compromis fondamental en informatique : celui entre l\'utilisation de la mémoire et la vitesse d\'exécution de certaines opérations. La matrice d\'adjacence investit massivement en mémoire (O(∣S∣2)) pour pré-calculer et stocker l\'information de connectivité de toutes les paires de sommets possibles, ce qui garantit un accès en temps constant (O(1)) à cette information. À l\'inverse, les listes d\'adjacence sont économes en mémoire (O(∣S∣+∣A∣)) mais requièrent un parcours de liste, et donc un temps proportionnel au degré du sommet, pour vérifier l\'existence d\'une arête.

Ce choix structurel n\'est pas une simple question d\'implémentation ; il est intrinsèquement lié à l\'efficacité asymptotique des algorithmes qui manipuleront le graphe. Par exemple, la complexité canonique des algorithmes de parcours comme BFS et DFS, O(∣S∣+∣A∣), n\'est atteignable qu\'avec une représentation par listes d\'adjacence. Avec une matrice, l\'itération des voisins de chaque sommet prendrait un temps O(∣S∣), menant à une complexité globale de O(∣S∣2), indépendamment de la densité du graphe. Le tableau suivant synthétise ce compromis.

**Tableau 3.1 : Comparaison des Représentations de Graphes**

  ------------------------------------- ---------------------- --------------------- --------------------------------------------------------------------------------------------------------------------
  Opération                             Matrice d\'Adjacence   Listes d\'Adjacence   Analyse et Cas d\'Usage

  **Complexité Spatiale**               \$O(                   S                     \^2)\$

  **Ajouter une arête {u,v}**           O(1)                   O(1)                  Efficace dans les deux cas, en supposant qu\'on n\'a pas besoin de vérifier au préalable l\'existence de l\'arête.

  **Vérifier si {u,v} est une arête**   O(1)                   O(min(d(u),d(v)))     Avantage net pour la matrice. Avec les listes, il faut parcourir la liste des voisins de u (ou de v).

  **Lister les voisins de u**           \$O(                   S                     )\$

  **Supprimer une arête {u,v}**         O(1)                   O(d(u))               Similaire à la vérification d\'arête.
  ------------------------------------- ---------------------- --------------------- --------------------------------------------------------------------------------------------------------------------

## 3.4 Parcours, Chemins et Connectivité

L\'exploration systématique des sommets et des arêtes d\'un graphe est une opération fondamentale qui sous-tend de nombreux algorithmes. Cette section définit formellement les notions de parcours et de connectivité, et présente les deux stratégies d\'exploration canoniques : le parcours en largeur et le parcours en profondeur.

### 3.4.1 Terminologie des Parcours

- **Chaînes et Chemins** : Dans un graphe non orienté, une **chaîne** est une séquence de sommets (s0​,s1​,...,sk​) telle que {si−1​,si​} est une arête pour tout i∈{1,...,k}. Dans un graphe orienté, un\
  **chemin** est une séquence similaire où (si−1​,si​) est un arc. La\
  **longueur** du parcours est le nombre d\'arêtes ou d\'arcs, k. Un parcours est dit **simple** s\'il n\'emprunte jamais deux fois la même arête/arc, et **élémentaire** s\'il ne visite jamais deux fois le même sommet (à l\'exception possible des extrémités pour un cycle).

- **Cycles et Circuits** : Une chaîne fermée (s0​=sk​) et simple dans un graphe non orienté est un **cycle**. Un chemin fermé et simple dans un graphe orienté est un\
  **circuit**. Un graphe ne contenant aucun cycle (ou circuit) est dit\
  **acyclique**.

### 3.4.2 Algorithmes de Parcours Fondamentaux

Les algorithmes de parcours en largeur (BFS) et en profondeur (DFS) représentent deux stratégies d\'exploration duales, dont les propriétés structurelles distinctes les rendent adaptés à différentes classes de problèmes.

- **Parcours en Largeur (BFS - Breadth-First Search)**

  - **Principe** : Le BFS explore un graphe en \"front d\'onde\" à partir d\'un sommet source. Il visite d\'abord la source, puis tous ses voisins directs (niveau 1), puis les voisins de ces voisins (niveau 2), et ainsi de suite. Cette stratégie est naturellement implémentée à l\'aide d\'une structure de données de type **file (FIFO - First-In, First-Out)**.

  - **Pseudo-code** :\
    BFS(Graphe G, Sommet s_depart):\
    file = CreerFile()\
    marques = CreerEnsemble()\
    \
    file.enfiler(s_depart)\
    marques.ajouter(s_depart)\
    \
    tant que la file n\'est pas vide:\
    s_actuel = file.defiler()\
    // Traiter s_actuel (ex: l\'afficher)\
    \
    pour chaque voisin v de s_actuel:\
    si v n\'est pas dans marques:\
    marques.ajouter(v)\
    file.enfiler(v)\
    \

  - **Analyse et Propriétés** : La complexité en temps est de O(∣S∣+∣A∣) avec une représentation par listes d\'adjacence, car chaque sommet est enfilé et défilé une seule fois, et chaque arête est examinée une seule fois. La complexité en espace est de\
    O(∣S∣) dans le pire des cas (pour stocker la file). La propriété la plus importante du BFS est qu\'il découvre les sommets par ordre de distance croissante (en nombre d\'arêtes) depuis la source. Il est donc l\'algorithme de choix pour calculer les\
    **plus courts chemins dans les graphes non pondérés**.

- **Parcours en Profondeur (DFS - Depth-First Search)**

  - **Principe** : Le DFS explore une branche du graphe aussi loin que possible avant de revenir sur ses pas (backtracking) pour explorer une autre branche. Cette stratégie \"plongeante\" est naturellement implémentée à l\'aide d\'une **pile (LIFO - Last-In, First-Out)**, qui est souvent gérée implicitement par la pile d\'appels d\'une fonction récursive.

  - **Pseudo-code (version récursive)** :\
    DFS(Graphe G):\
    marques = CreerEnsemble()\
    pour chaque sommet s de G:\
    si s n\'est pas dans marques:\
    explorer(G, s, marques)\
    \
    explorer(Graphe G, Sommet s, Ensemble marques):\
    marques.ajouter(s)\
    // Traiter s (ex: l\'afficher)\
    \
    pour chaque voisin v de s:\
    si v n\'est pas dans marques:\
    explorer(G, v, marques)\
    \

  - **Analyse et Applications** : La complexité du DFS est également de O(∣S∣+∣A∣) en temps et O(∣S∣) en espace (pour la pile de récursion dans le pire cas). Le DFS est un outil puissant pour la\
    **détection de cycles**, le **tri topologique** des graphes orientés acycliques (DAGs), et sert de brique de base à des algorithmes plus sophistiqués, notamment pour l\'analyse de la connectivité.

### 3.4.3 Connectivité

La notion de connectivité décrit si et comment les sommets d\'un graphe sont reliés entre eux.

- **Graphes Non Orientés** : Un graphe non orienté est dit **connexe** si, pour toute paire de sommets {u,v}, il existe une chaîne les reliant. Un graphe qui n\'est pas connexe est composé de plusieurs\
  **composantes connexes**, qui sont des sous-graphes connexes maximaux.

- **Graphes Orientés** : La notion de connectivité est plus nuancée en raison de la directionnalité des arcs.

  - Un graphe orienté est **faiblement connexe** si son graphe non orienté sous-jacent (obtenu en ignorant la direction des arcs) est connexe.

  - Un graphe orienté est **fortement connexe** si, pour toute paire ordonnée de sommets (u,v), il existe un chemin de u à v *et* un chemin de v à u.

  - Les **composantes fortement connexes (CFC)** d\'un graphe orienté sont ses sous-graphes fortement connexes maximaux. Tout graphe orienté admet une partition unique de ses sommets en CFC. La structure d\'un graphe peut être comprise comme une \"factorisation\" en ses \"atomes cycliques\" (les CFC) et la structure acyclique qui les relie. En effet, si l\'on contracte chaque CFC en un unique super-sommet, le graphe résultant, appelé graphe des composantes, est toujours un graphe orienté acyclique (DAG).

- **Algorithmes de Décomposition en CFC** : Deux algorithmes classiques, tous deux en temps linéaire O(∣S∣+∣A∣), permettent de trouver les CFC.

  - **Algorithme de Kosaraju** : Conceptuellement simple, il s\'effectue en deux passes de DFS. La première passe sur le graphe G calcule les temps de fin de visite de chaque sommet. La seconde passe s\'effectue sur le graphe transposé GT (où tous les arcs sont inversés), en explorant les sommets dans l\'ordre décroissant de leur temps de fin. Chaque arbre de la forêt DFS générée lors de cette seconde passe correspond à une CFC.

  - **Algorithme de Tarjan** : Plus subtil mais plus efficace en pratique, il n\'effectue qu\'une seule passe de DFS sur le graphe G. Il maintient une pile des sommets en cours d\'exploration et associe à chaque sommet v un indice de découverte (v.num) et une valeur \"low-link\" (v.numAccessible). Cette dernière valeur correspond au plus petit indice de découverte accessible depuis v (y compris par un seul arc de retour). Un sommet v est la \"racine\" d\'une CFC si et seulement si v.num == v.numAccessible. Lorsque la visite de la sous-arborescence d\'une telle racine se termine, tous les sommets de sa CFC se trouvent au sommet de la pile et peuvent être extraits. Cette approche illustre comment une logique plus complexe et un état plus riche peuvent permettre de réduire le nombre de passes sur les données.

## 3.5 Les Arbres : Structure Acyclique Fondamentale

Au sein de la théorie des graphes, les arbres occupent une place centrale. Leur simplicité structurelle --- l\'absence de cycles --- leur confère des propriétés combinatoires et algorithmiques remarquables. Ils représentent la forme la plus épurée de la connectivité.

### 3.5.1 Définition et Caractérisations Équivalentes

- **Définition** : Un **arbre** est un graphe non orienté qui est à la fois **connexe** et **acyclique**. Une\
  **forêt** est un graphe acyclique, dont chaque composante connexe est un arbre.

- **Théorème des Caractérisations Équivalentes** : Les multiples facettes de la structure d\'un arbre sont capturées par une série de propriétés équivalentes. Pour un graphe G d\'ordre n, les affirmations suivantes sont équivalentes :

  1.  G est un arbre (connexe et acyclique).

  2.  G est connexe et possède exactement n−1 arêtes.

  3.  G est acyclique et possède exactement n−1 arêtes.

  4.  Pour toute paire de sommets {u,v}, il existe une et une seule chaîne élémentaire les reliant.

  5.  G est connexe, et toute arête est un **pont** (c\'est-à-dire que sa suppression déconnecte le graphe).

  6.  G est acyclique, et l\'ajout de n\'importe quelle arête entre deux sommets non adjacents crée un unique cycle.\
      \

Ces équivalences révèlent la nature profonde de l\'arbre comme \"squelette\" minimal de la connectivité. Un graphe connexe à n sommets doit avoir au moins n−1 arêtes, tandis qu\'un graphe acyclique à n sommets peut en avoir au plus n−1. L\'arbre se situe précisément à cette intersection critique : il contient le nombre exact d\'arêtes nécessaires pour assurer la connectivité, sans aucune redondance qui se manifesterait par un cycle.

- **Preuve de l\'équivalence (esquisse)** : La preuve complète établit un cycle d\'implications. Par exemple, pour montrer (1)⇔(2)⇔(3) :

  - (1)⇒(2) : On montre par récurrence sur n qu\'un arbre à n sommets a n−1 arêtes. Un arbre a toujours au moins une feuille (sommet de degré 1). En retirant une feuille et son arête incidente, on obtient un arbre plus petit, ce qui permet d\'appliquer l\'hypothèse de récurrence.

  - (2)⇒(3) : Si G est connexe avec n−1 arêtes, il doit être acyclique. Sinon, la suppression d\'une arête d\'un cycle préserverait la connexité, et on obtiendrait un graphe connexe avec n sommets et n−2 arêtes, ce qui est impossible car un graphe connexe a au moins n−1 arêtes.

  - (3)⇒(1) : Si G est acyclique avec n−1 arêtes, il doit être connexe. S\'il ne l\'était pas, il serait une forêt de k\>1 arbres. Chaque composante i (un arbre) aurait ni​ sommets et ni​−1 arêtes. Le nombre total d\'arêtes serait ∑(ni​−1)=(∑ni​)−k=n−k. Or, on a n−1 arêtes, donc n−1=n−k, ce qui implique k=1. Le graphe est donc connexe.

### 3.5.2 Arbres Couvrants de Poids Minimum (MST)

- **Problématique** : Étant donné un graphe G connexe et pondéré, un **arbre couvrant de poids minimum** (ou MST, de l\'anglais *Minimum Spanning Tree*) est un sous-graphe partiel de G qui est un arbre, qui connecte tous les sommets de G, et dont la somme des poids des arêtes est la plus faible possible. Ce problème est fondamental dans la conception de réseaux (télécommunications, électricité, transport) où l\'objectif est de connecter un ensemble de points avec un coût minimal.

- **Propriétés d\'Optimalité** : La raison pour laquelle des algorithmes gloutons peuvent résoudre ce problème de manière optimale repose sur deux propriétés fondamentales :

  - **Propriété des Coupes** : Soit une partition quelconque des sommets de G en deux ensembles disjoints. Si une arête a un poids strictement inférieur à celui de toutes les autres arêtes reliant ces deux ensembles, alors cette arête appartient à *tout* MST de G.

  - **Propriété des Cycles** : Pour tout cycle dans G, si une arête a un poids strictement supérieur à celui de toutes les autres arêtes du cycle, alors cette arête n\'appartient à *aucun* MST de G.

- **Algorithme de Prim**

  - **Principe** : Cet algorithme glouton construit l\'MST en faisant croître un arbre à partir d\'un sommet de départ arbitraire. À chaque étape, il ajoute à l\'arbre l\'arête de poids minimum qui relie un sommet déjà dans l\'arbre à un sommet qui n\'y est pas encore. Cette stratégie est une application directe de la propriété des coupes.

  - **Implémentation et Complexité** : L\'efficacité de l\'algorithme de Prim dépend de la manière dont on trouve l\'arête de poids minimum à chaque étape. Une implémentation utilisant une **file de priorité** (comme un tas binaire ou un tas de Fibonacci) pour stocker les sommets non encore dans l\'arbre, avec pour clé leur distance minimale à l\'arbre, est la plus performante. Avec un tas binaire, la complexité est de O(∣A∣log∣S∣). Avec un tas de Fibonacci, elle atteint O(∣A∣+∣S∣log∣S∣).

  - **Preuve de Correction** : La preuve formelle montre par récurrence que l\'arbre construit à chaque étape est un sous-arbre d\'au moins un MST.

- **Algorithme de Kruskal**

  - **Principe** : Cet autre algorithme glouton adopte une approche différente. Il examine toutes les arêtes du graphe par ordre de poids croissant. Une arête est ajoutée à la solution si et seulement si elle ne crée pas de cycle avec les arêtes déjà sélectionnées. Cette stratégie est une application directe de la propriété des cycles.

  - **Implémentation et Complexité** : L\'algorithme requiert deux composantes clés : un tri initial des arêtes par poids, et une structure de données **Union-Find** (ou structure d\'ensembles disjoints) pour détecter efficacement si l\'ajout d\'une arête connecterait deux sommets déjà dans la même composante connexe, et donc créerait un cycle. La complexité totale est dominée par l\'étape de tri, soit\
    O(∣A∣log∣A∣) ou O(∣A∣log∣S∣).

  - **Preuve de Correction** : La preuve montre que l\'algorithme maintient l\'invariant selon lequel l\'ensemble d\'arêtes sélectionné est toujours un sous-ensemble d\'un certain MST.

Le fait que ces stratégies gloutonnes, qui font des choix optimaux locaux, aboutissent à un optimum global n\'est pas anodin. Cela est dû à la structure mathématique sous-jacente du problème (celle d\'un matroïde), qui garantit que les solutions partielles peuvent toujours être étendues en une solution globale optimale.

## 3.6 Cycles et Chemins Spécifiques : Problèmes Eulériens et Hamiltoniens

Cette section explore deux problèmes fondamentaux de parcours de graphes qui, bien que formulés de manière similaire --- \"visiter chaque élément une et une seule fois\" ---, révèlent une dichotomie spectaculaire en termes de complexité computationnelle. Cette différence illustre de manière frappante la distinction entre les problèmes traitables (classe P) et les problèmes vraisemblablement intraitables (classe NP-complet).

### 3.6.1 Graphes Eulériens

Revenant au problème fondateur des ponts de Königsberg, nous formalisons ici les concepts introduits par Euler.

- **Définitions** : Un **parcours eulérien** est une chaîne qui passe par chaque arête du graphe exactement une fois. Si ce parcours est un cycle, il est appelé **cycle eulérien**. Un graphe qui admet un cycle eulérien est dit\
  **eulérien**, et s\'il admet un parcours eulérien (non fermé), il est dit **semi-eulérien**.

- **Théorème d\'Euler (1736)** : Ce théorème fournit une caractérisation complète et simple des graphes eulériens, basée uniquement sur une propriété locale des sommets.

  - Un graphe connexe est **eulérien si et seulement si tous ses sommets sont de degré pair**.

  - Un graphe connexe est **semi-eulérien si et seulement si il possède exactement deux sommets de degré impair**. Le parcours doit alors commencer à l\'un de ces sommets et se terminer à l\'autre.

- **Preuve du Théorème** :

  - **Condition Nécessaire** : La preuve est intuitive. Pour tout cycle eulérien, chaque fois qu\'on entre dans un sommet intermédiaire par une arête, on doit en sortir par une autre arête non encore utilisée. Chaque passage consomme donc deux arêtes incidentes à ce sommet. Le sommet de départ est également le sommet d\'arrivée, donc chaque départ et chaque arrivée consomment également les arêtes par paires. Par conséquent, chaque sommet doit avoir un degré pair.

  - **Condition Suffisante** : La preuve est constructive. On part d\'un sommet arbitraire et on suit un chemin d\'arêtes non utilisées jusqu\'à revenir au point de départ, ce qui est toujours possible car chaque sommet a un degré pair. On obtient un premier cycle. S\'il reste des arêtes non utilisées dans le graphe, la connexité garantit qu\'au moins un sommet du cycle a une arête incidente non utilisée. On repart de ce sommet pour former un nouveau cycle, que l\'on \"fusionne\" ensuite avec le premier. On répète ce processus jusqu\'à ce que toutes les arêtes soient épuisées.

- **Algorithme de Hierholzer** : Cet algorithme formalise la preuve constructive de la condition suffisante. Il trouve un cycle eulérien en temps linéaire, O(∣A∣), en construisant et en fusionnant des cycles. La facilité de ce problème, décidable par une simple vérification des degrés, le place fermement dans la classe de complexité\
  **P**.

### 3.6.2 Graphes Hamiltoniens

En changeant simplement l\'objet à visiter --- les sommets au lieu des arêtes --- on bascule dans un tout autre univers de complexité.

- **Définitions** : Un **chemin hamiltonien** est un chemin simple qui visite chaque sommet du graphe exactement une fois. Un **cycle hamiltonien** est un cycle qui visite chaque sommet exactement une fois (sauf le sommet de départ/arrivée).

- **Complexité du Problème** : Déterminer si un graphe donné possède un cycle hamiltonien est l\'un des problèmes les plus célèbres de la classe **NP-complet**. Il figure parmi les 21 problèmes originaux de Karp, dont la NP-complétude a été démontrée en 1972. Contrairement au problème eulérien, il n\'existe aucune caractérisation simple connue. La difficulté réside dans le fait que la propriété est globale et combinatoire, sans indicateur local évident.

- **Conditions Suffisantes d\'Existence** : Bien qu\'il n\'existe pas de condition nécessaire et suffisante simple, plusieurs théorèmes fournissent des conditions suffisantes qui garantissent l\'existence d\'un cycle hamiltonien, généralement en imposant une forte densité d\'arêtes.

  - **Théorème de Dirac (1952)** : Un graphe simple à n≥3 sommets est hamiltonien si le degré de chaque sommet est au moins n/2.

  - **Théorème d\'Ore (1960)** : Un graphe simple à n≥3 sommets est hamiltonien si, pour toute paire de sommets non adjacents {u,v}, la somme de leurs degrés vérifie d(u)+d(v)≥n. Le théorème de Dirac est un corollaire direct de celui d\'Ore. Ces théorèmes montrent qu\'une densité d\'arêtes suffisamment élevée \"force\" l\'existence d\'un cycle hamiltonien.

### 3.6.3 Le Problème du Voyageur de Commerce (TSP)

Le problème du voyageur de commerce (TSP) est une généralisation du problème du cycle hamiltonien et constitue l\'archétype des problèmes d\'optimisation combinatoire NP-difficiles.

- **Définition** : Étant donné un graphe complet pondéré (où les poids représentent des distances, des coûts ou des temps), le TSP consiste à trouver le cycle hamiltonien de poids total minimum.

- **Complexité et lien avec P vs. NP** : Le problème de décision associé (\"existe-t-il un tour de poids inférieur ou égal à k?\") est **NP-complet**. Le problème du cycle hamiltonien se réduit trivialement au TSP : un graphe G a un cycle hamiltonien si et seulement si le graphe complet construit sur les mêmes sommets, avec un poids de 1 pour les arêtes de G et un poids infini (ou très grand) pour les autres, a un tour de poids minimal égal à n. Cela établit que le TSP est\
  **NP-difficile**.

L\'absence d\'algorithme connu résolvant ces problèmes en temps polynomial (c\'est-à-dire en un temps borné par un polynôme en la taille de l\'entrée) est au cœur de la conjecture **P vs. NP**, l\'un des sept problèmes du prix du millénaire. Si un tel algorithme était découvert pour le TSP ou le cycle hamiltonien, cela prouverait que P = NP, avec des conséquences révolutionnaires pour l\'informatique, la cryptographie et de nombreux autres domaines scientifiques et industriels.

## 3.7 Graphes Planaires et Coloration

Les graphes planaires sont ceux qui peuvent être représentés sur une surface bidimensionnelle sans croisement d\'arêtes. Cette contrainte topologique simple a des conséquences combinatoires profondes, notamment en ce qui concerne la coloration des sommets.

### 3.7.1 Planarité et Formule d\'Euler

- **Définition** : Un graphe est dit **planaire** s\'il admet une représentation dans le plan où les sommets sont des points et les arêtes des courbes qui ne se croisent qu\'à leurs extrémités communes. Un tel dessin est appelé une\
  **représentation planaire** (ou plongement).

- Formule d\'Euler (1758) : Pour tout graphe planaire connexe, la relation entre le nombre de sommets (s), le nombre d\'arêtes (a) et le nombre de faces (f) (y compris la face infinie extérieure) est un invariant topologique donné par :\
  \
  s−a+f=2\
  \
  \
  Cette formule est un pont remarquable entre la topologie et la combinatoire, car elle relie une propriété géométrique (le dessin dans le plan) à des quantités numériques.

  - **Preuve par récurrence sur le nombre d\'arêtes (a)** :

    1.  **Initialisation** : Si le graphe est un arbre, il est planaire. Il a a=s−1 arêtes et ne délimite qu\'une seule face (f=1). La formule est vérifiée : s−(s−1)+1=2.

    2.  **Hérédité** : Supposons la formule vraie pour tout graphe planaire connexe avec a−1 arêtes. Soit G un graphe avec a arêtes. Si G n\'est pas un arbre, il contient un cycle. Choisissons une arête e appartenant à un cycle. Le graphe G′=G−e est toujours connexe, a s sommets et a−1 arêtes. En retirant e, deux faces de G fusionnent en une seule dans G′, donc G′ a f−1 faces. Par hypothèse de récurrence, pour G′, on a s−(a−1)+(f−1)=2, ce qui se simplifie en s−a+f=2. La formule est donc vraie pour G.

- **Corollaires et Graphes Non Planaires** : La formule d\'Euler impose de fortes contraintes sur le nombre d\'arêtes qu\'un graphe planaire peut avoir. Pour un graphe planaire simple et connexe avec s≥3 sommets, on peut déduire que a≤3s−6. Si de plus le graphe n\'a pas de cycle de longueur 3 (comme un graphe biparti), alors a≤2s−4. Ces inégalités fournissent un moyen simple de prouver que certains graphes ne sont pas planaires. Par exemple, pour le graphe complet\
  K5​, on a s=5 et a=10. L\'inégalité a≤3s−6 donne 10≤3(5)−6=9, ce qui est faux. Donc, K5​ n\'est pas planaire. De même, pour le graphe biparti complet K3,3​, on a s=6, a=9, et pas de cycle de longueur 3. L\'inégalité a≤2s−4 donne 9≤2(6)−4=8, ce qui est faux. Donc, K3,3​ n\'est pas planaire.

- **Théorème de Kuratowski (1930)** : Ce théorème fondamental offre une caractérisation complète de la planarité. Un graphe est planaire si et seulement s\'il ne contient pas de sous-graphe qui soit une **subdivision** de K5​ ou de K3,3​. Une subdivision d\'un graphe est obtenue en insérant des sommets de degré 2 sur ses arêtes.

### 3.7.2 Coloration de Graphes

- **Définition** : Une **k-coloration** d\'un graphe est une attribution à chaque sommet d\'une couleur parmi un ensemble de k couleurs, de telle sorte que deux sommets adjacents reçoivent toujours des couleurs différentes. Le **nombre chromatique** χ(G) d\'un graphe G est le plus petit entier k pour lequel une k-coloration existe.

- **Théorème des Cinq Couleurs** : Tout graphe planaire est 5-coloriable (χ(G)≤5). La preuve est élégante et constructive. Elle procède par récurrence sur le nombre de sommets, en utilisant le fait qu\'un graphe planaire a toujours un sommet de degré au plus 5. Si les voisins de ce sommet utilisent moins de 5 couleurs, on peut le colorier. Dans le cas contraire, un argument ingénieux utilisant les **chaînes de Kempe** (chemins bicolores) permet de modifier localement la coloration pour libérer une couleur.

- **Théorème des Quatre Couleurs** : Tout graphe planaire est 4-coloriable (χ(G)≤4).

  - **Histoire** : Conjecturé en 1852, ce problème a résisté aux mathématiciens pendant plus d\'un siècle. Une célèbre tentative de preuve par Alfred Kempe en 1879 s\'est avérée défectueuse, bien que ses idées (notamment les chaînes de Kempe) aient été cruciales pour la suite.

  - **La Preuve d\'Appel et Haken (1976)** : La première preuve acceptée a marqué un tournant dans l\'histoire des mathématiques, car elle était assistée par ordinateur. La stratégie consistait à montrer qu\'un ensemble fini de 1 936 **configurations réductibles** était **inévitable** (tout graphe planaire doit en contenir au moins une). Un programme informatique a ensuite vérifié que chaque configuration de cet ensemble était bien 4-coloriable. Cette dépendance à l\'ordinateur pour une partie exhaustive et non vérifiable par l\'homme a déclenché un débat épistémologique sur la nature même d\'une preuve mathématique.

- **Algorithme de Coloration Glouton** : C\'est une heuristique simple et rapide pour colorier un graphe. Les sommets sont parcourus dans un ordre prédéfini, et chacun se voit attribuer la plus petite couleur (le plus petit entier positif) non utilisée par ses voisins déjà colorés. Bien qu\'il ne garantisse pas de trouver le nombre chromatique optimal, il est efficace en pratique et garantit une coloration avec au plus\
  Δ(G)+1 couleurs, où Δ(G) est le degré maximum du graphe.

## 3.8 Isomorphisme et Complexité

Le concept d\'isomorphisme permet de définir formellement quand deux graphes sont \"les mêmes\" d\'un point de vue structurel, indépendamment de leur représentation graphique. Le problème algorithmique associé à la détection de l\'isomorphisme occupe une place unique et fascinante dans le paysage de la théorie de la complexité.

### 3.8.1 Le Problème de l\'Isomorphisme de Graphes (GI)

- **Définition Formelle** : Deux graphes G1​=(S1​,A1​) et G2​=(S2​,A2​) sont dits **isomorphes** s\'il existe une bijection f:S1​→S2​ qui préserve la structure d\'adjacence. Autrement dit, pour toute paire de sommets u,v∈S1​, l\'arête {u,v} existe dans A1​ si et seulement si l\'arête {f(u),f(v)} existe dans A2​. L\'isomorphisme est une relation d\'équivalence qui partitionne l\'ensemble de tous les graphes en classes de graphes structurellement identiques.

- **Applications** : La capacité à déterminer si deux graphes sont isomorphes est fondamentale dans de nombreux domaines. En chimie, elle permet d\'identifier des composés moléculaires en comparant leurs graphes structurels. En conception de circuits, elle est utilisée pour vérifier que le schéma logique d\'un circuit correspond à sa disposition physique (Layout Versus Schematic). En analyse de réseaux, elle permet de détecter des motifs structurels récurrents.

### 3.8.2 Un Statut Unique en Théorie de la Complexité

Le problème de décision de l\'isomorphisme de graphes (GI) est l\'un des problèmes les plus étudiés en informatique théorique en raison de son statut ambigu par rapport aux grandes classes de complexité.

- **GI est dans NP** : Le problème appartient à la classe **NP**. Pour prouver que deux graphes sont isomorphes, il suffit de fournir la bijection f comme \"certificat\". Il est possible de vérifier en temps polynomial que f est bien une bijection et qu\'elle préserve les arêtes.

- **Ni en P, ni NP-complet (conjecture)** : GI est l\'un des très rares problèmes naturels de la classe NP pour lequel on ne connaît ni d\'algorithme en temps polynomial (ce qui le placerait dans **P**), ni de preuve qu\'il est **NP-complet**. Cette situation suggère que la vision binaire \"P ou NP-complet\" pourrait être une simplification de la structure réelle de la classe NP.

- **La Classe NP-Intermédiaire** : Si P = NP, alors il existe des problèmes dans NP qui ne sont ni dans P ni NP-complets. Cette classe hypothétique est appelée **NP-intermédiaire**, et GI est le principal candidat pour en faire partie, avec le problème de la factorisation des entiers. L\'existence de tels problèmes impliquerait un spectre de difficultés plus riche et plus fin au sein de NP.

- **Implications Théoriques** : Le statut de GI a des implications profondes. Il a été démontré que si GI était NP-complet, alors la hiérarchie polynomiale s\'effondrerait à son deuxième niveau, un résultat considéré comme très improbable par la plupart des experts en complexité.

### 3.8.3 L\'Avancée de Babai

Pendant des décennies, la meilleure borne supérieure connue pour la complexité de GI était de nature exponentielle. En 2015, László Babai a annoncé une avancée spectaculaire en présentant un algorithme résolvant le problème GI en temps **quasi-polynomial**, c\'est-à-dire en O(2(logn)c) pour une constante c. Un temps quasi-polynomial est une fonction qui croît plus vite que n\'importe quel polynôme, mais de manière significativement plus lente que n\'importe quelle fonction exponentielle. Ce résultat, salué comme une percée majeure, place GI beaucoup plus près de P que ce que l\'on pensait auparavant, le distinguant encore davantage des problèmes NP-complets et renforçant la conjecture qu\'il n\'est pas NP-complet. Cela suggère que la structure de symétrie des graphes, bien que complexe, pourrait posséder une régularité exploitable qui la rendrait plus facile à analyser que les problèmes combinatoires \"chaotiques\" typiques de la NP-complétude.

