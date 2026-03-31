# Chapitre I.25 : Algorithmes de Graphes et Algorithmes Avancés

## Introduction

Ce chapitre représente le point culminant de notre exploration de l\'algorithmique, un domaine où la théorie rencontre la pratique pour résoudre des problèmes d\'une complexité et d\'une portée considérables. Après avoir établi les fondements des structures de données et des principes d\'analyse dans les chapitres précédents, nous nous tournons maintenant vers les graphes, sans doute la structure la plus universelle et la plus puissante pour modéliser les systèmes complexes du monde réel. Des réseaux de communication aux réseaux sociaux, des circuits logiques aux dépendances de projets, des systèmes logistiques aux interactions protéiques, les graphes fournissent un langage commun pour décrire des entités et leurs relations.

La maîtrise des algorithmes de graphes est donc une compétence non négociable pour tout informaticien, ingénieur ou chercheur. Ce chapitre a pour ambition de fournir un traitement à la fois rigoureux et approfondi des algorithmes les plus fondamentaux et les plus influents de ce domaine. Notre parcours sera structuré de manière progressive, partant des opérations les plus élémentaires pour aboutir à des problèmes d\'optimisation sophistiqués et à des techniques de résolution avancées.

Nous commencerons par revisiter les deux piliers de l\'exploration des graphes : le parcours en largeur (BFS) et le parcours en profondeur (DFS). Au-delà de leur mécanique, nous nous attacherons à leurs propriétés structurelles profondes, qui sont le fondement de nombreux algorithmes plus complexes, comme nous le verrons avec le tri topologique, un outil essentiel pour l\'ordonnancement de tâches avec dépendances.

Ensuite, nous aborderons une première grande classe de problèmes d\'optimisation : la recherche d\'arbres couvrants de poids minimum (ACM). À travers les algorithmes de Prim et de Kruskal, nous illustrerons la puissance de la stratégie gloutonne et nous analyserons en détail comment le choix de structures de données performantes, telles que les files de priorité et les structures Union-Find, est indissociable de l\'efficacité algorithmique.

Le chapitre se poursuivra avec l\'étude exhaustive des problèmes de plus courts chemins, un domaine aux applications omniprésentes. Nous disséquerons l\'élégance gloutonne de l\'algorithme de Dijkstra pour les graphes à poids non-négatifs, puis nous nous armerons de la robustesse de la programmation dynamique avec les algorithmes de Bellman-Ford, capable de gérer les poids négatifs et de détecter les cycles anormaux, et de Floyd-Warshall pour résoudre le problème entre toutes les paires de sommets.

Nous explorerons ensuite le domaine fascinant des flux réseaux, un modèle puissant pour les problèmes de transport et d\'allocation de ressources. La méthode de Ford-Fulkerson nous introduira aux concepts de graphe résiduel et de chemin augmentant. Le point d\'orgue de cette section sera la démonstration complète du théorème flot maximum/coupe minimum, un résultat d\'une grande beauté théorique qui incarne le principe de dualité en optimisation combinatoire.

Enfin, ce chapitre servira de passerelle vers des horizons plus avancés de l\'algorithmique. Conscient que de nombreux problèmes du monde réel sont NP-difficiles et probablement insolubles de manière exacte en temps polynomial, nous introduirons les algorithmes d\'approximation, qui sacrifient une optimalité parfaite au profit d\'une solution garantie proche de l\'optimum et calculable efficacement. Nous aborderons également les algorithmes probabilistes, qui exploitent le hasard pour gagner en efficacité ou pour résoudre des problèmes autrement inaccessibles. Pour conclure, nous nous pencherons sur un domaine d\'application spécifique mais crucial : les algorithmes sur les chaînes de caractères, en présentant les ingénieuses techniques de hachage roulant de Rabin-Karp et l\'automate de recherche de Knuth-Morris-Pratt.

Tout au long de ce chapitre, notre fil conducteur sera une exigence de rigueur. Chaque algorithme sera présenté avec son pseudo-code, une preuve de correction formelle, une analyse de complexité fine et un exemple d\'exécution détaillé. L\'objectif n\'est pas seulement de présenter un catalogue de solutions, mais de forger une compréhension profonde des principes qui les sous-tendent, afin de vous équiper pour analyser, concevoir et résoudre les défis algorithmiques des systèmes complexes de demain.

## 25.1 Parcours de Graphes (BFS, DFS) et Tri Topologique

Les parcours de graphes constituent l\'ensemble des opérations les plus fondamentales en algorithmique des graphes. Pratiquement tous les algorithmes que nous étudierons dans ce chapitre, aussi sophistiqués soient-ils, reposent d\'une manière ou d\'une autre sur une exploration systématique des sommets et des arêtes d\'un graphe. Le parcours en largeur (BFS) et le parcours en profondeur (DFS) sont les deux stratégies primordiales pour cette exploration. Bien qu\'ils partagent la même complexité temporelle, leurs approches distinctes leur confèrent des propriétés structurelles uniques, les rendant adaptés à des classes de problèmes différentes. Leur maîtrise est une condition préalable essentielle à toute étude plus avancée.

### 25.1.1 Fondements des Parcours : Le Parcours en Largeur (BFS) et le Parcours en Profondeur (DFS)

Le problème de base du parcours de graphe est le suivant : étant donné un graphe G=(V,E) et un sommet source s∈V, visiter systématiquement chaque sommet accessible depuis s. Une visite systématique implique que chaque sommet est visité une et une seule fois. Pour suivre les sommets déjà visités, les algorithmes de parcours utilisent un système de marquage, souvent représenté par des couleurs :

> **BLANC** : Le sommet n\'a pas encore été découvert.
>
> **GRIS** : Le sommet a été découvert, mais tous ses voisins n\'ont pas encore été explorés.
>
> **NOIR** : Le sommet et tous ses voisins ont été explorés.

La différence fondamentale entre BFS et DFS réside dans la structure de données utilisée pour gérer l\'ensemble des sommets gris, c\'est-à-dire la \"frontière\" entre les territoires découverts et inconnus du graphe.

#### Le Parcours en Largeur (Breadth-First Search - BFS)

Le parcours en largeur explore le graphe de manière expansive, par niveaux successifs de distance par rapport à la source. Il visite d\'abord la source, puis tous les voisins directs de la source (niveau 1), puis tous les voisins de ces voisins qui n\'ont pas encore été visités (niveau 2), et ainsi de suite. Cette stratégie d\'exploration \"en éventail\" est naturellement implémentée à l\'aide d\'une file (structure de type Premier Entré, Premier Sorti ou FIFO).

Principe de l\'algorithme

L\'algorithme maintient une file contenant les sommets découverts (gris) dont les voisins n\'ont pas encore été tous explorés. Initialement, seule la source s est dans la file. L\'algorithme défile un sommet u, explore toutes ses arêtes (u, v), et pour chaque voisin v non encore découvert (blanc), il le marque comme découvert (gris), met à jour ses informations (distance, prédécesseur) et l\'enfile. Une fois tous les voisins de u explorés, u est marqué comme entièrement traité (noir).

**Pseudo-code de BFS**

BFS(G, s)\
1. Pour chaque sommet u dans V\[G\] \\ {s}\
2. couleur\[u\] ← BLANC\
3. d\[u\] ← ∞\
4. π\[u\] ← NIL\
5. couleur\[s\] ← GRIS\
6. d\[s\] ← 0\
7. π\[s\] ← NIL\
8. Q ← FileVide()\
9. Enfiler(Q, s)\
10. Tant que Q n\'est pas vide\
11. u ← Défiler(Q)\
12. Pour chaque v dans Adj\[u\]\
13. Si couleur\[v\] == BLANC\
14. couleur\[v\] ← GRIS\
15. d\[v\] ← d\[u\] + 1\
16. π\[v\] ← u\
17. Enfiler(Q, v)\
18. couleur\[u\] ← NOIR

Propriété Fondamentale : Calcul des Plus Courts Chemins

La propriété la plus importante du BFS est qu\'il calcule la distance (en nombre d\'arêtes) de la source s à tous les autres sommets accessibles dans un graphe non pondéré. À la fin de l\'algorithme, pour tout sommet v accessible depuis s, d\[v\] contient la longueur du plus court chemin de s à v. L\'arbre des prédécesseurs π forme un arbre des plus courts chemins.

Preuve de Correction (pour la distance)

Nous devons prouver que pour tout sommet v, la valeur d\[v\] calculée par BFS est égale à δ(s,v), la véritable distance du plus court chemin de s à v. La preuve se fait par récurrence sur la distance des sommets.

Soit Vk​={v∈V∣δ(s,v)=k}. Nous voulons montrer que pour tout k≥0, l\'algorithme découvre et enfile tous les sommets de Vk​ durant l\'exploration des sommets de Vk−1​.

> **Base (k=0) :** V0​={s}. L\'algorithme initialise correctement d\[s\]=0.
>
> **Hypothèse de récurrence :** Supposons que pour tout v∈Vk−1​, l\'algorithme a calculé d\[v\]=k−1 et a enfilé v.
>
> Étape de récurrence : La file étant une structure FIFO, tous les sommets de Vk−1​ seront défilés avant tout sommet de Vk​. Lorsque l\'algorithme défile un sommet u∈Vk−1​, il examine ses voisins. Soit v∈Vk​ un voisin de u. Par définition de Vk​, il existe un plus court chemin de s à v de longueur k, et le prédécesseur de v sur ce chemin, disons u\', doit être dans Vk−1​.\
> Lorsque u\' est défilé, v sera découvert (s\'il ne l\'était pas déjà par un autre sommet de Vk−1​) et on lui assignera la distance d\[u′\]+1=(k−1)+1=k. De plus, aucun sommet de Vk​ ne peut être découvert avec une distance inférieure à k, car ses prédécesseurs sont au minimum à distance k-1. De même, aucun sommet w avec δ(s,w)\>k ne sera enfilé avec une distance k, car ses prédécesseurs sont au minimum à distance k.\
> Ainsi, l\'algorithme assigne correctement la distance k à tous les sommets de Vk​. Par induction, la propriété est vraie pour toutes les distances.

Analyse de Complexité

En supposant que le graphe est représenté par des listes d\'adjacence, la complexité de BFS est O(V+E).

> L\'initialisation (lignes 1-8) prend un temps de O(V).
>
> Chaque sommet est enfilé et défilé au plus une fois. Ces opérations coûtent O(1) chacune, pour un total de O(V).
>
> La boucle Pour chaque v dans Adj\[u\] (ligne 12) est exécutée pour chaque sommet u une fois qu\'il est défilé. La somme des longueurs des listes d\'adjacence est ∑u∈V​∣Adj\[u\]∣=E pour un graphe orienté, ou 2E pour un graphe non orienté. Chaque arête est donc examinée au plus une fois (ou deux fois pour un graphe non orienté). Le coût total de ces boucles est donc O(E).
>
> La complexité totale est donc O(V)+O(E)=O(V+E).

#### Le Parcours en Profondeur (Depth-First Search - DFS)

Le parcours en profondeur explore le graphe en s\'enfonçant le plus loin possible le long d\'une branche avant de revenir sur ses pas (processus de *backtracking*) pour explorer d\'autres branches. Cette stratégie \"en profondeur d\'abord\" est naturellement implémentée à l\'aide d\'une pile (structure de type Dernier Entré, Premier Sorti ou LIFO), qui est souvent la pile d\'appels système dans une implémentation récursive.

Principe de l\'algorithme

L\'algorithme DFS maintient une trace de sa progression à l\'aide de la pile d\'appels récursifs. Lorsqu\'il visite un sommet u pour la première fois, il le marque comme découvert (gris) et enregistre son temps de découverte. Ensuite, il explore récursivement chaque voisin v de u qui n\'a pas encore été découvert. Une fois que tous les descendants de u dans la forêt de parcours ont été visités, l\'algorithme revient à u, le marque comme entièrement traité (noir) et enregistre son temps de fin de visite.

**Pseudo-code de DFS**

DFS(G)\
1. Pour chaque sommet u dans V\[G\]\
2. couleur\[u\] ← BLANC\
3. π\[u\] ← NIL\
4. temps ← 0\
5. Pour chaque sommet u dans V\[G\]\
6. Si couleur\[u\] == BLANC\
7. DFS-Visite(G, u)\
\
DFS-Visite(G, u)\
1. temps ← temps + 1\
2. d\[u\] ← temps // Temps de découverte\
3. couleur\[u\] ← GRIS\
4. Pour chaque v dans Adj\[u\]\
5. Si couleur\[v\] == BLANC\
6. π\[v\] ← u\
7. DFS-Visite(G, v)\
8. couleur\[u\] ← NOIR\
9. temps ← temps + 1\
10. f\[u\] ← temps // Temps de fin de visite

Propriétés Fondamentales : Structure des temps de visite et détection de cycles

Le DFS génère des informations structurelles riches sur le graphe, encapsulées dans les temps de découverte d\[u\] et de fin de visite f\[u\].

> **Propriété des Parenthèses :** Pour deux sommets quelconques u et v, l\'un des trois cas suivants est vrai :

Les intervalles \[d\[u\],f\[u\]\] et \[d\[v\],f\[v\]\] sont disjoints.

L\'intervalle \[d\[u\],f\[u\]\] est entièrement contenu dans \[d\[v\],f\[v\]\], et u est un descendant de v dans la forêt de parcours.

L\'intervalle \[d\[v\],f\[v\]\] est entièrement contenu dans \[d\[u\],f\[u\]\], et v est un descendant de u dans la forêt de parcours.\
Cette structure d\'emboîtement est une conséquence directe de la nature récursive du parcours. La visite d\'un descendant v d\'un sommet u commence après celle de u et se termine avant, d\'où d\[u\]\<d\[v\]\<f\[v\]\<f\[u\].

> **Classification des Arêtes :** Les temps de visite permettent de classifier les arêtes (u, v) explorées :

**Arête d\'arbre (Tree edge) :** v est blanc quand (u, v) est explorée. v devient un enfant de u.

**Arête arrière (Back edge) :** v est gris quand (u, v) est explorée. v est un ancêtre de u. La présence d\'une arête arrière indique un **cycle** dans le graphe.

**Arête avant (Forward edge) :** v est noir et v est un descendant de u.

**Arête transversale (Cross edge) :** v est noir et v n\'est ni un ancêtre ni un descendant de u.

Analyse de Complexité

La complexité du DFS est également de O(V+E) pour une représentation par listes d\'adjacence.

> La procédure principale DFS parcourt tous les sommets en O(V).
>
> La procédure récursive DFS-Visite est appelée exactement une fois pour chaque sommet (lorsqu\'il est blanc).
>
> À l\'intérieur de DFS-Visite(u), la boucle sur les voisins parcourt Adj\[u\]. Sur l\'ensemble de tous les appels, la somme des longueurs des listes d\'adjacence est O(E).
>
> La complexité totale est donc O(V+E).

L\'opposition entre la file du BFS et la pile du DFS n\'est pas anecdotique ; elle révèle deux perspectives duales sur l\'exploration. La file maintient une frontière d\'exploration qui s\'élargit uniformément, garantissant la découverte des chemins les plus courts en nombre d\'arêtes. La pile, qu\'elle soit explicite ou implicite via la récursivité, force l\'exploration le long d\'un seul chemin jusqu\'à son terme. Cette exploration en profondeur crée une hiérarchie, une arborescence de visite, dont la structure est capturée par la propriété des parenthèses des temps de visite. Cette propriété, absente du BFS, est une mine d\'informations structurelles que nous allons maintenant exploiter pour le tri topologique.

### 25.1.2 Le Tri Topologique : Ordonnancement dans les Graphes Acycliques Dirigés (DAG)

De nombreux problèmes du monde réel peuvent être modélisés comme un ensemble de tâches avec des contraintes de précédence : la tâche A doit être terminée avant que la tâche B ne puisse commencer. Par exemple, lors de la compilation d\'un projet logiciel, les bibliothèques doivent être compilées avant les programmes qui en dépendent. Ces relations de dépendance peuvent être représentées par un graphe orienté, où une arête (u,v) signifie que la tâche u doit précéder la tâche v. Pour que l\'ensemble des tâches soit réalisable, ce graphe ne doit pas contenir de cycle (une situation de dépendance circulaire, ou *deadlock*). Un tel graphe est appelé un Graphe Orienté Acyclique (DAG, de l\'anglais *Directed Acyclic Graph*).

Définition du Problème

Un tri topologique d\'un DAG G=(V,E) est un ordonnancement linéaire de tous ses sommets tel que pour toute arête (u,v)∈E, le sommet u apparaît avant le sommet v dans l\'ordonnancement. 7 S\'il existe un cycle dans le graphe, un tel ordonnancement est impossible. Il est important de noter qu\'un tri topologique n\'est généralement pas unique.

Il existe deux approches classiques pour réaliser un tri topologique, l\'une basée sur le BFS et l\'autre sur le DFS. Ces deux méthodes ne sont pas de simples recettes ; elles exploitent des propriétés fondamentales et distinctes des DAG.

#### Approche Basée sur BFS (Algorithme de Kahn)

L\'algorithme de Kahn repose sur une propriété itérative simple et intuitive des DAG : à tout moment, il doit exister au moins une tâche qui n\'a aucune dépendance non satisfaite. Dans le langage des graphes, cela signifie qu\'un DAG doit toujours posséder au moins un sommet de degré entrant nul.

Principe de l\'algorithme

L\'algorithme de Kahn construit l\'ordre topologique de manière constructive. Il commence par identifier tous les sommets qui n\'ont aucune arête entrante (degré entrant de 0). Ces sommets peuvent être placés en premier dans l\'ordre. On les ajoute à une file. Ensuite, l\'algorithme entre dans une boucle : il défile un sommet u, l\'ajoute à la liste triée, et considère que la \"tâche\" u est accomplie. Par conséquent, toutes les dépendances pointant depuis u sont satisfaites. Il parcourt donc les voisins v de u et décrémente leur degré entrant. Si le degré entrant d\'un voisin v devient 0, cela signifie que toutes ses dépendances sont maintenant satisfaites, et v peut à son tour être ajouté à la file. Le processus continue jusqu\'à ce que la file soit vide. 8

**Pseudo-code de l\'algorithme de Kahn**

Kahn-Topological-Sort(G)\
1. L ← Liste vide qui contiendra les sommets triés\
2. Q ← FileVide()\
3. in_degree ← Tableau de taille \|V\| initialisé à 0\
4.\
5. Pour chaque sommet u dans V\[G\]\
6. Pour chaque v dans Adj\[u\]\
7. in_degree\[v\] ← in_degree\[v\] + 1\
8.\
9. Pour i de 1 à \|V\|\
10. Si in_degree\[i\] == 0\
11. Enfiler(Q, i)\
12.\
13. Tant que Q n\'est pas vide\
14. u ← Défiler(Q)\
15. Ajouter u à la fin de L\
16. Pour chaque v dans Adj\[u\]\
17. in_degree\[v\] ← in_degree\[v\] - 1\
18. Si in_degree\[v\] == 0\
19. Enfiler(Q, v)\
20.\
21. Si la taille de L est égale à \|V\|\
22. Retourner L\
23. Sinon\
24. Retourner \"Erreur: le graphe contient un cycle\"

Preuve de Correction

La correction de l\'algorithme repose sur un lemme fondamental : un graphe orienté G est un DAG si et seulement si il possède au moins un sommet de degré entrant nul.

> (⇒) Si G est un DAG, supposons par l\'absurde que tous les sommets ont un degré entrant ≥1. En partant d\'un sommet arbitraire v0​ et en remontant une arête entrante vers v1​, puis de v1​ vers v2​, etc., on construit un chemin \...→v2​→v1​→v0​. Comme le nombre de sommets est fini, on doit finir par revisiter un sommet, ce qui forme un cycle. Contradiction.
>
> (⇐) Si G a un cycle, aucun sommet du cycle ne peut avoir un degré entrant nul (dans le sous-graphe induit par le cycle).

L\'algorithme de Kahn maintient l\'invariant suivant : les sommets sont ajoutés à la file Q uniquement lorsque toutes leurs dépendances ont été traitées (c\'est-à-dire que leurs prédécesseurs sont déjà dans la liste L). Si, à la fin de l\'algorithme, la taille de L est inférieure à ∣V∣, cela signifie que la file est devenue vide alors qu\'il restait des sommets avec un degré entrant non nul. Ces sommets restants doivent nécessairement former un ou plusieurs cycles, car le sous-graphe qu\'ils induisent n\'a aucun sommet de degré entrant nul.

Analyse de Complexité

La complexité de l\'algorithme de Kahn est de O(V+E).

> Le calcul des degrés entrants (lignes 5-7) parcourt toutes les arêtes une fois, ce qui prend O(V+E).
>
> L\'initialisation de la file (lignes 9-11) parcourt tous les sommets, en O(V).
>
> La boucle principale (lignes 13-19) s\'exécute tant que la file n\'est pas vide. Chaque sommet est enfilé et défilé exactement une fois.
>
> Lorsque le sommet u est défilé, la boucle interne sur ses voisins v est exécutée. Sur l\'ensemble de l\'algorithme, cette boucle examinera chaque arête (u,v) exactement une fois. Le coût total de ces mises à jour est donc O(E).
>
> La complexité totale est donc O(V+E)+O(V)+O(E)=O(V+E).

#### Approche Basée sur DFS

L\'approche basée sur le DFS est moins intuitive mais remarquablement élégante. Elle exploite la structure globale et récursive de l\'exploration en profondeur, capturée par les temps de fin de visite.

Principe de l\'algorithme

L\'idée est que pour toute arête (u,v), la tâche u doit se \"terminer\" après la tâche v. Dans le contexte du DFS, cela signifie que le temps de fin de visite de u doit être supérieur à celui de v. Par conséquent, un tri topologique des sommets est simplement la liste des sommets triés dans l\'ordre décroissant de leurs temps de fin de visite. 6

Pseudo-code (modification du DFS)

L\'algorithme consiste à exécuter un DFS sur le graphe. La seule modification est d\'ajouter le sommet u en tête d\'une liste chaînée L juste avant la fin de l\'appel DFS-Visite(G, u).

Topological-Sort-DFS(G)\
1. L ← Liste chaînée vide\
2. //\... Initialisation des couleurs et prédécesseurs comme dans DFS\...\
3. Pour chaque sommet u dans V\[G\]\
4. Si couleur\[u\] == BLANC\
5. DFS-Visite-Topo(G, u, L)\
6. Retourner L\
\
DFS-Visite-Topo(G, u, L)\
1. //\... Début de la visite, temps de découverte, couleur GRIS\...\
2. Pour chaque v dans Adj\[u\]\
3. Si couleur\[v\] == BLANC\
4. //\... π\[v\] ← u\...\
5. DFS-Visite-Topo(G, v, L)\
6. //\... couleur\[u\] ← NOIR, temps de fin\...\
7. Ajouter u en tête de L

Preuve de Correction

La preuve repose sur la démonstration que pour toute arête (u,v) dans un DAG, un parcours DFS produira toujours f\[v\]\<f\[u\].

Considérons l\'exploration de l\'arête (u,v) par le DFS.

> **Cas 1 : v est gris.** Si v est gris lorsque l\'arête (u,v) est explorée, cela signifie que v est un ancêtre de u dans l\'arbre de parcours. L\'arête (u,v) est donc une arête arrière. Mais la présence d\'une arête arrière implique un cycle, ce qui contredit l\'hypothèse que le graphe est un DAG. Ce cas est donc impossible.
>
> **Cas 2 : v est blanc.** Si v est blanc, v devient un descendant de u dans la forêt de parcours. L\'appel DFS-Visite-Topo(G, v, L) sera effectué et devra se terminer avant que l\'appel DFS-Visite-Topo(G, u, L) ne puisse se terminer. Par conséquent, f\[v\]\<f\[u\].
>
> **Cas 3 : v est noir.** Si v est noir, cela signifie que la visite de v est déjà terminée. Son temps de fin f\[v\] a donc déjà été fixé. Comme u est encore gris, son temps de fin f\[u\] sera fixé plus tard. On a donc nécessairement f\[v\]\<f\[u\].

Dans tous les cas possibles pour un DAG, si une arête (u,v) existe, alors f\[v\]\<f\[u\]. En triant les sommets par ordre décroissant de leurs temps de fin, u apparaîtra donc toujours avant v, ce qui satisfait la définition du tri topologique.

Analyse de Complexité

La complexité de cette approche est simplement celle du DFS, soit O(V+E). L\'algorithme effectue un parcours DFS standard, et la seule opération ajoutée est l\'insertion en tête d\'une liste chaînée, qui prend un temps de O(1). La complexité globale reste donc dominée par le parcours lui-même.

Exemple d\'exécution (DFS)

Considérons un graphe de dépendances de vêtements : (chaussettes -\> chaussures), (pantalon -\> chaussures), (pantalon -\> ceinture), (chemise -\> ceinture), (chemise -\> cravate), (cravate -\> veste), (ceinture -\> veste).

Un DFS pourrait explorer le graphe et produire les temps de fin suivants (l\'ordre exact dépend de l\'ordre d\'exploration des voisins) :

chaussettes (f=2), chaussures (f=4), pantalon (f=6), chemise (f=12), cravate (f=10), ceinture (f=8), veste (f=14).

En triant les sommets par temps de fin décroissant, on obtient l\'ordre topologique :

veste, chemise, cravate, ceinture, pantalon, chaussures, chaussettes.

Cet ordre est valide. Cependant, si l\'on inverse l\'ordre d\'ajout à la liste (en tête), on obtient directement un ordre valide sans tri explicite.

En conclusion, les deux algorithmes de tri topologique illustrent comment des propriétés fondamentales des graphes peuvent être exploitées. L\'algorithme de Kahn utilise une propriété locale et itérative (l\'existence d\'un sommet sans prérequis), tandis que l\'algorithme basé sur le DFS utilise une propriété globale et récursive (la structure des temps de fin de visite). Les deux atteignent la même complexité optimale de O(V+E) et sont des outils essentiels pour la résolution de problèmes d\'ordonnancement.

## 25.2 Arbres Couvrants Minimums (Prim, Kruskal)

Après avoir maîtrisé les techniques de parcours, nous nous tournons vers une classe fondamentale de problèmes d\'optimisation sur les graphes : la construction de réseaux optimaux. Le problème de l\'arbre couvrant de poids minimum (ACM, ou MST en anglais pour *Minimum Spanning Tree*) est un problème canonique dans ce domaine. Il consiste à connecter un ensemble de points (sommets) avec un coût total minimal, une question qui se pose dans de nombreuses applications pratiques, telles que la conception de réseaux de communication, de réseaux électriques, de circuits intégrés ou de systèmes de distribution.

Les algorithmes qui résolvent ce problème, notamment ceux de Kruskal et de Prim, sont des exemples parfaits de la **stratégie gloutonne** (*greedy strategy*). Cette approche consiste à faire une série de choix localement optimaux dans l\'espoir d\'atteindre un optimum global. La raison pour laquelle cette stratégie fonctionne pour le problème de l\'ACM, alors qu\'elle échoue pour de nombreux autres problèmes d\'optimisation, réside dans une propriété structurelle profonde des graphes pondérés que nous allons d\'abord établir.

### 25.2.1 Le Problème de l\'Arbre Couvrant de Poids Minimum (ACM)

Définition Formelle

Étant donné un graphe non orienté, connexe et pondéré G=(V,E,w), où V est l\'ensemble des sommets, E l\'ensemble des arêtes, et w:E→R une fonction qui assigne un poids (ou coût) à chaque arête, un arbre couvrant de G est un sous-graphe acyclique T=(V,E′) qui connecte tous les sommets de V. Le poids d\'un arbre couvrant T est la somme des poids de ses arêtes, w(T)=∑e∈E′​w(e). Un arbre couvrant de poids minimum (ACM) est un arbre couvrant dont le poids est minimal parmi tous les arbres couvrants possibles de G. 14

#### La Stratégie Gloutonne et la Propriété de la Coupe

La correction des algorithmes de Prim et de Kruskal repose sur une propriété générique qui justifie la validité de leurs choix gloutons. Cette propriété est liée au concept de \"coupe\" dans un graphe.

Définition d\'une Coupe

Une coupe (S,V−S) d\'un graphe G=(V,E) est une partition de l\'ensemble des sommets V en deux sous-ensembles disjoints non vides, S et V−S. Une arête (u,v) traverse la coupe si l\'une de ses extrémités est dans S et l\'autre dans V−S.

Propriété Fondamentale de la Coupe (Cut Property)

Soit G=(V,E,w) un graphe non orienté et connexe. Pour toute coupe (S,V−S) de G, si (u,v) est une arête de poids minimal parmi toutes les arêtes qui traversent la coupe (une \"arête légère\"), alors il existe un arbre couvrant de poids minimum de G qui contient l\'arête (u,v).

Cette propriété est le lemme central qui garantit qu\'un choix glouton consistant à ajouter une telle arête \"légère\" et \"sûre\" ne nous éloigne pas d\'une solution optimale.

Preuve de la Propriété de la Coupe

La preuve se fait par l\'absurde, en utilisant une technique d\'échange d\'arêtes (exchange argument).

> Soit (S,V−S) une coupe quelconque et soit e=(u,v) une arête de poids minimal traversant cette coupe.
>
> Supposons, pour arriver à une contradiction, qu\'aucun ACM de G ne contienne l\'arête e. Soit T un ACM quelconque de G. Par hypothèse, e∈/T.
>
> Ajoutons l\'arête e à T. Le graphe T∪{e} contient maintenant un cycle. Puisque u∈S et v∈V−S, ce cycle doit nécessairement traverser la coupe au moins une autre fois. Il existe donc une autre arête e′=(x,y) dans ce cycle qui traverse également la coupe (S,V−S), avec x∈S et y∈V−S.
>
> Par définition de e comme étant une arête de poids minimal traversant la coupe, nous avons w(e)≤w(e′).
>
> Considérons le graphe T′=(T∪{e})∖{e′}. T′ est un graphe couvrant (il connecte toujours tous les sommets) et acyclique (nous avons cassé le seul cycle en retirant e′), c\'est donc un arbre couvrant.
>
> Calculons le poids de T′ : w(T′)=w(T)−w(e′)+w(e). Puisque w(e)≤w(e′), on a w(T′)≤w(T).
>
> Comme T était un ACM, son poids était minimal. Donc, T′ doit aussi être un ACM. Or, T′ contient l\'arête e.
>
> Ceci contredit notre hypothèse initiale selon laquelle aucun ACM ne contient e. L\'hypothèse est donc fausse, et il doit exister un ACM contenant e.

Les algorithmes de Prim et de Kruskal sont deux instanciations différentes de cette méta-stratégie gloutonne. Ils diffèrent dans la manière dont ils définissent la coupe à chaque étape pour sélectionner la prochaine arête sûre.

### 25.2.2 Algorithme de Kruskal

L\'algorithme de Kruskal adopte une approche \"centrée sur les arêtes\". Il considère les arêtes du graphe dans un ordre global, des plus légères aux plus lourdes, et construit progressivement une forêt d\'arbres qui finira par fusionner en un unique ACM.

**Principe de l\'algorithme**

> Créer une forêt F où chaque sommet du graphe est un arbre distinct (une composante connexe).
>
> Créer un ensemble contenant toutes les arêtes du graphe.
>
> Trier cet ensemble d\'arêtes par poids non décroissant.
>
> Pour chaque arête (u,v) de l\'ensemble trié :
>
> Si les sommets u et v appartiennent à des arbres différents dans la forêt F (c\'est-à-dire que l\'ajout de l\'arête ne forme pas de cycle) :
>
> Ajouter l\'arête (u,v) à l\'ACM en construction.
>
> Fusionner les deux arbres contenant u et v.

Pour implémenter efficacement les étapes 1, 5 et 7, on utilise une structure de données spécialisée appelée **Union-Find** (ou *Disjoint-Set Union*, DSU). Cette structure maintient une collection d\'ensembles disjoints et supporte trois opérations :

> Make-Set(u): Crée un nouvel ensemble contenant uniquement l\'élément u.
>
> Find-Set(u): Renvoie le représentant (la racine) de l\'ensemble contenant u.
>
> Union(u, v): Fusionne les deux ensembles contenant u et v.

**Pseudo-code de l\'algorithme de Kruskal**

Kruskal(G, w)\
1. A ← ∅\
2. Pour chaque sommet v dans V\[G\]\
3. Make-Set(v)\
4. Trier les arêtes de E par poids w non décroissant\
5. Pour chaque arête (u, v) dans E, prise dans l\'ordre trié\
6. Si Find-Set(u) ≠ Find-Set(v)\
7. A ← A ∪ {(u, v)}\
8. Union(u, v)\
9. Retourner A

Preuve de Correction

La correction de l\'algorithme de Kruskal découle directement de la propriété de la coupe. À chaque étape, l\'algorithme considère une arête (u,v). Si Find-Set(u) ≠ Find-Set(v), cela signifie que u et v appartiennent à deux composantes connexes distinctes dans la forêt courante. Soit S la composante connexe contenant u. La partition (S,V−S) est une coupe du graphe. L\'arête (u,v) est l\'arête de poids le plus faible parmi toutes les arêtes non encore considérées qui pourraient connecter deux composantes distinctes. Par conséquent, c\'est une arête légère pour la coupe (S,V−S) (parmi les arêtes restantes), et son ajout est un choix \"sûr\" selon la propriété de la coupe. L\'algorithme ne fait qu\'une série de choix sûrs, construisant ainsi un ACM. 14

Analyse de Complexité Détaillée

La performance de l\'algorithme de Kruskal dépend de deux opérations principales : le tri des arêtes et les opérations sur la structure Union-Find.

> **Tri des arêtes (ligne 4) :** C\'est généralement l\'opération la plus coûteuse. Avec un algorithme de tri par comparaison efficace (comme le tri fusion ou le tri rapide), cela prend un temps de O(ElogE).
>
> **Initialisation (lignes 2-3) :** L\'exécution de ∣V∣ opérations Make-Set prend O(V).
>
> **Boucle principale (lignes 5-8) :** La boucle s\'exécute ∣E∣ fois. À l\'intérieur, nous avons deux appels à Find-Set et au plus un appel à Union. La complexité de ces opérations dépend de l\'implémentation de la structure Union-Find.

**Implémentation naïve :** La complexité peut être médiocre.

**Implémentation optimisée :** En utilisant les deux heuristiques d\'**union par rang (ou par taille)** et de **compression de chemin**, la complexité amortie d\'une séquence de m opérations Union ou Find-Set sur n éléments est O(mα(n)), où α(n) est la fonction inverse d\'Ackermann. Cette fonction croît si lentement qu\'elle est inférieure à 5 pour toute valeur de n imaginable dans l\'univers physique. On peut donc la considérer comme quasi-constante.  Le coût total des\
2∣E∣ appels à Find-Set et ∣V∣−1 appels à Union est donc en pratique quasi-linéaire, soit O(Eα(V)).

La complexité totale de l\'algorithme est donc O(ElogE+Eα(V)). Comme logE est en O(logV) (puisque E≤V2), et que α(V) est quasi-constant, le terme dominant est le tri. La complexité finale de Kruskal est donc O(ElogE) ou, de manière équivalente, O(ElogV).

Exemple d\'Exécution

Considérons un graphe avec 7 sommets (A-G) et les arêtes suivantes triées par poids : (A,D,5), (C,E,5), (D,F,6), (A,B,7), (B,E,7), (B,C,8), (B,D,9), (E,G,9), (C,F,10), (E,F,10), (F,G,11).

> Initialisation : Chaque sommet est dans son propre ensemble : {A}, {B}, {C}, {D}, {E}, {F}, {G}.
>
> Arête (A,D,5) : Find(A) ≠ Find(D). Ajouter (A,D). Union(A,D). Ensembles : {A,D}, {B}, {C}, {E}, {F}, {G}.
>
> Arête (C,E,5) : Find(C) ≠ Find(E). Ajouter (C,E). Union(C,E). Ensembles : {A,D}, {B}, {C,E}, {F}, {G}.
>
> Arête (D,F,6) : Find(D) ≠ Find(F). Ajouter (D,F). Union(D,F). Ensembles : {A,D,F}, {B}, {C,E}, {G}.
>
> Arête (A,B,7) : Find(A) ≠ Find(B). Ajouter (A,B). Union(A,B). Ensembles : {A,B,D,F}, {C,E}, {G}.
>
> Arête (B,E,7) : Find(B) ≠ Find(E). Ajouter (B,E). Union(B,E). Ensembles : {A,B,C,D,E,F}, {G}.
>
> Arête (B,C,8) : Find(B) = Find(C) (ils sont dans le même grand ensemble). Rejeter, car cela créerait un cycle.
>
> Arête (B,D,9) : Find(B) = Find(D). Rejeter.
>
> Arête (E,G,9) : Find(E) ≠ Find(G). Ajouter (E,G). Union(E,G). Ensembles : {A,B,C,D,E,F,G}.\
> L\'algorithme s\'arrête car nous avons ∣V∣−1=6 arêtes. L\'ACM est {(A,D), (C,E), (D,F), (A,B), (B,E), (E,G)} avec un poids total de 39.

### 25.2.3 Algorithme de Prim

L\'algorithme de Prim adopte une approche \"centrée sur les sommets\". Au lieu de considérer les arêtes globalement, il fait croître un unique arbre à partir d\'un sommet de départ arbitraire. À chaque étape, il connecte à cet arbre le sommet le plus \"proche\" qui n\'en fait pas encore partie.

**Principe de l\'algorithme**

> Initialiser un arbre T contenant un seul sommet de départ arbitraire s.
>
> Maintenir un ensemble de sommets S déjà dans l\'arbre. Initialement, S={s}.
>
> Tant que S=V :
>
> Trouver l\'arête (u,v) de poids minimal telle que u∈S et v∈V−S.
>
> Ajouter l\'arête (u,v) à T et le sommet v à S.

Pour implémenter efficacement l\'étape 4, on utilise une **file de priorité**. Cette file contient tous les sommets qui ne sont pas encore dans l\'arbre (V−S). La \"clé\" ou \"priorité\" de chaque sommet v dans la file est le poids de l\'arête la plus légère le connectant à un sommet déjà dans l\'arbre S.

**Pseudo-code de l\'algorithme de Prim**

Prim(G, w, r)\
1. Pour chaque sommet u dans V\[G\]\
2. clé\[u\] ← ∞\
3. π\[u\] ← NIL\
4. clé\[r\] ← 0\
5. Q ← V\[G\] // File de priorité contenant tous les sommets\
6. Tant que Q n\'est pas vide\
7. u ← Extraire-Min(Q)\
8. Pour chaque v dans Adj\[u\]\
9. Si v est dans Q et w(u, v) \< clé\[v\]\
10. π\[v\] ← u\
11. clé\[v\] ← w(u, v) // Opération Decrease-Key implicite

Preuve de Correction

L\'algorithme de Prim est une application encore plus directe de la propriété de la coupe. À chaque étape de la boucle Tant que, l\'ensemble des sommets S pour lesquels on a déjà extrait le minimum de la file Q forme un côté de la coupe, et Q (les sommets restants) forme l\'autre côté, V−S. L\'opération Extraire-Min(Q) sélectionne un sommet u qui est connecté à S par une arête de poids minimal (la valeur clé\[u\]). Cette arête est donc, par définition, une arête légère traversant la coupe (S,V−S). Son ajout à l\'arbre est donc un choix \"sûr\". L\'algorithme ne fait qu\'une série de choix sûrs, construisant ainsi un ACM. 20

Analyse de Complexité Fine

La complexité de l\'algorithme de Prim dépend de manière cruciale de l\'implémentation de la file de priorité Q et de ses opérations Extraire-Min et Decrease-Key (mise à jour de la clé). 20

> L\'algorithme effectue ∣V∣ opérations Extraire-Min et, dans le pire des cas, O(E) opérations Decrease-Key.
>
> **Avec un tableau non trié :**

Extraire-Min : Il faut parcourir tout le tableau pour trouver le minimum, coût O(V).

Decrease-Key : Mise à jour directe d\'une valeur, coût O(1).

Complexité totale : O(V⋅V+E⋅1)=O(V2). Cette implémentation est simple et efficace pour les **graphes denses**, où E est de l\'ordre de V2.

> **Avec un tas binaire :**

Extraire-Min : Coût O(logV).

Decrease-Key : Coût O(logV).

Complexité totale : O(VlogV+ElogV)=O(ElogV). C\'est l\'implémentation la plus courante et elle est particulièrement efficace pour les **graphes clairsemés**.

> **Avec un tas de Fibonacci :**

Extraire-Min : Coût O(logV) (amorti).

Decrease-Key : Coût O(1) (amorti).

Complexité totale : O(VlogV+E). C\'est la meilleure complexité théorique connue. Elle surpasse le tas binaire sur les **graphes denses** où E est significativement plus grand que VlogV.

Exemple d\'Exécution

Reprenons le même graphe, en partant du sommet A.

La file de priorité Q contient les paires (clé, sommet).

> Initialisation : Q = {(0,A), (∞,B), (∞,C), (∞,D), (∞,E), (∞,F), (∞,G)}.
>
> Extraire (0,A). Voisins de A : B, D. Mettre à jour Q : Q = {(7,B), (∞,C), (5,D), (∞,E), (∞,F), (∞,G)}. Arbre : {}.
>
> Extraire (5,D). Voisins de D : A, B, F. A n\'est plus dans Q. clé est 7, w(D,B)=9\>7, pas de màj. clé\[F\] est ∞, w(D,F)=6\<∞, màj. Q devient {(7,B), (∞,C), (∞,E), (6,F), (∞,G)}. Arbre : {(A,D)}.
>
> Extraire (6,F). Voisins de F : C, D, E, G. clé\[C\] est ∞, w(F,C)=10, màj. clé\[E\] est ∞, w(F,E)=10, màj. clé\[G\] est ∞, w(F,G)=11, màj. Q devient {(7,B), (10,C), (10,E), (11,G)}. Arbre : {(A,D), (D,F)}.
>
> Extraire (7,B). Voisins de B : A, D, C, E. clé\[C\] est 10, w(B,C)=8\<10, màj. clé\[E\] est 10, w(B,E)=7\<10, màj. Q devient {(8,C), (7,E), (11,G)}. Arbre : {(A,D), (D,F), (A,B)}.
>
> Extraire (7,E). Voisins de E : B, C, F, G. clé\[C\] est 8, w(E,C)=5\<8, màj. clé\[G\] est 11, w(E,G)=9\<11, màj. Q devient {(5,C), (9,G)}. Arbre : {(A,D), (D,F), (A,B), (B,E)}.
>
> Extraire (5,C). Voisins de C : B, E, F. Tous déjà traités. Arbre : {(A,D), (D,F), (A,B), (B,E), (E,C)}.
>
> Extraire (9,G). Q est vide. Arbre : {(A,D), (D,F), (A,B), (B,E), (E,C), (E,G)}.\
> L\'ACM trouvé est {(A,D), (D,F), (A,B), (B,E), (E,C), (E,G)}, de poids 39. C\'est un arbre différent de celui de Kruskal, mais de même poids total, ce qui est attendu car l\'ACM n\'est pas toujours unique.

Le choix entre Prim et Kruskal illustre un principe fondamental de la conception d\'algorithmes : il n\'y a pas de \"meilleur\" algorithme dans l\'absolu. La performance dépend de l\'interaction entre la stratégie de l\'algorithme, la structure du problème (ici, la densité du graphe) et l\'efficacité des structures de données sous-jacentes.

  ---------------------------------------- ------------------------------------------ ------------------------------------------
  Critère                                  Algorithme de Kruskal                      Algorithme de Prim

  **Principe Fondamental**                 Centré sur les arêtes (approche globale)   Centré sur les sommets (approche locale)

  **Structure de Données Clé**             Union-Find (DSU)                           File de Priorité

  **Complexité (Graphe Clairsemé, E≈V)**   O(ElogE)                                   O(ElogV)

  **Complexité (Graphe Dense, E≈V2)**      O(V2logV)                                  O(V2) (avec tableau)

  **Graphe en Construction**               Une forêt de composantes qui fusionnent    Un seul arbre qui grandit

  **Adapté pour**                          Graphes clairsemés                     Graphes denses
  ---------------------------------------- ------------------------------------------ ------------------------------------------

## 25.3 Plus Courts Chemins

Le problème de la recherche des plus courts chemins est sans doute l\'un des problèmes les plus étudiés et les plus appliqués de la théorie des graphes. De la planification d\'itinéraires dans un GPS à la commutation de paquets dans les réseaux informatiques, en passant par l\'analyse de dépendances en bio-informatique, la capacité à trouver un chemin de coût minimal entre des points est une brique fondamentale de nombreux systèmes complexes.

Cette section explore en profondeur les algorithmes classiques pour résoudre ce problème, en distinguant les cas selon les contraintes sur les poids des arêtes et selon l\'objectif (depuis une source unique ou entre toutes les paires de sommets). Nous verrons comment la stratégie gloutonne de Dijkstra offre une solution d\'une efficacité redoutable pour les poids non-négatifs, et comment la programmation dynamique, avec Bellman-Ford et Floyd-Warshall, fournit des solutions plus robustes et générales, capables de gérer les poids négatifs et de détecter des anomalies structurelles comme les cycles de poids négatif.

### 25.3.1 Formalisation des Problèmes et Propriétés Fondamentales

Avant de présenter les algorithmes, il est essentiel de définir formellement les concepts et les propriétés qui les sous-tendent.

Définitions

Soit un graphe orienté et pondéré G=(V,E,w), où w:E→R est une fonction de poids.

> Le **poids d\'un chemin** p=⟨v0​,v1​,...,vk​⟩ est la somme des poids de ses arêtes : w(p)=∑i=1k​w(vi−1​,vi​).
>
> La **distance du plus court chemin** de u à v, notée δ(u,v), est le poids minimal de tous les chemins de u à v. S\'il n\'existe aucun chemin de u à v, alors δ(u,v)=∞.

On distingue principalement deux types de problèmes :

> **Plus courts chemins depuis une source unique (Single-Source Shortest Paths - SSSP) :** Étant donné un sommet source s, trouver δ(s,v) pour tous les sommets v∈V.
>
> **Plus courts chemins entre toutes les paires (All-Pairs Shortest Paths - APSP) :** Trouver δ(u,v) pour toutes les paires de sommets (u,v)∈V×V.

Propriété de la Sous-Structure Optimale

Les algorithmes de plus courts chemins reposent sur une propriété fondamentale qui permet d\'utiliser des approches gloutonnes ou de programmation dynamique.

**Lemme (Sous-chemins d\'un plus court chemin) :** Soit p=⟨v0​,v1​,...,vk​⟩ un plus court chemin de v0​ à vk​. Alors, pour toute paire d\'indices 0≤i≤j≤k, le sous-chemin pij​=⟨vi​,vi+1​,...,vj​⟩ est un plus court chemin de vi​ à vj​.

**Preuve :** Par l\'absurde. Si un chemin plus court pij′​ existait de vi​ à vj​, on pourrait remplacer pij​ par pij′​ dans le chemin original p pour obtenir un chemin de v0​ à vk​ de poids w(p)−w(pij​)+w(pij′​)\<w(p). Ceci contredit le fait que p est un plus court chemin.

Impact des Poids Négatifs et des Cycles

La présence de poids négatifs introduit une complexité significative.

> **Poids négatifs :** Si un graphe contient des arêtes de poids négatif mais aucun cycle de poids négatif, les plus courts chemins sont toujours bien définis. Cependant, une stratégie gloutonne simple comme celle de Dijkstra peut échouer. Un choix localement optimal (emprunter l\'arête la plus légère) peut conduire à un chemin globalement sous-optimal si une arête de poids négatif plus loin sur un autre chemin aurait permis de \"compenser\" un coût initial plus élevé.
>
> **Cycles de poids négatif :** Si un graphe contient un cycle de poids négatif accessible depuis la source s et depuis lequel on peut atteindre un sommet v, alors la notion de plus court chemin de s à v n\'est plus bien définie. On peut parcourir le cycle négatif un nombre infini de fois, diminuant le poids total du chemin à chaque passage, rendant ainsi δ(s,v)=−∞.  Les algorithmes robustes doivent être capables de détecter et de signaler la présence de tels cycles.

Tous les algorithmes que nous allons voir utilisent une technique centrale appelée **relaxation**. Pour une arête (u,v), la relaxation consiste à tester si l\'on peut améliorer le plus court chemin vers v trouvé jusqu\'à présent en passant par u. On maintient pour chaque sommet v une estimation de distance d\[v\], qui est une borne supérieure de δ(s,v). L\'opération de relaxation est la suivante :

Relax(u, v, w)\
1. Si d\[v\] \> d\[u\] + w(u, v)\
2. d\[v\] ← d\[u\] + w(u, v)\
3. π\[v\] ← u

Les algorithmes de Dijkstra et Bellman-Ford peuvent être vus comme des stratégies différentes pour appliquer cette opération de relaxation de manière répétée jusqu\'à ce que les estimations de distance convergent vers les distances réelles des plus courts chemins.

### 25.3.2 Algorithme de Dijkstra (SSSP, Poids Non-Négatifs)

L\'algorithme de Dijkstra est l\'archétype de l\'algorithme glouton efficace et élégant. Il résout le problème SSSP pour les graphes dont les poids d\'arêtes sont non-négatifs. Son fonctionnement est conceptuellement très similaire à celui de l\'algorithme de Prim pour les ACM.

Principe de l\'algorithme

L\'algorithme maintient un ensemble S de sommets dont la distance finale depuis la source s a été déterminée de manière définitive. Initialement, S=∅. Il utilise une file de priorité Q contenant les sommets de V−S, où la priorité de chaque sommet est son estimation de distance actuelle d\[v\].

À chaque étape, l\'algorithme extrait de Q le sommet u ayant la plus petite estimation de distance (le choix glouton). Ce sommet u est alors ajouté à l\'ensemble S. Ensuite, pour chaque voisin v de u, l\'algorithme effectue une opération de relaxation sur l\'arête (u,v), mettant potentiellement à jour d\[v\] si un chemin plus court via u a été trouvé. 28

**Pseudo-code de l\'algorithme de Dijkstra**

Dijkstra(G, w, s)\
1. // Initialisation\
2. Pour chaque sommet v dans V\[G\]\
3. d\[v\] ← ∞\
4. π\[v\] ← NIL\
5. d\[s\] ← 0\
6.\
7. S ← ∅\
8. Q ← V\[G\] // File de priorité\
9.\
10. Tant que Q n\'est pas vide\
11. u ← Extraire-Min(Q)\
12. S ← S ∪ {u}\
13. Pour chaque v dans Adj\[u\]\
14. Relax(u, v, w)

Preuve de Correction

La correction de l\'algorithme de Dijkstra repose sur la preuve que, pour un graphe à poids non-négatifs, le choix glouton est toujours sûr. Nous prouvons par récurrence sur la taille de S que l\'invariant de boucle suivant est maintenu : \"À chaque début d\'itération de la boucle Tant que, pour tout sommet v∈S, on a d\[v\]=δ(s,v).\"

> **Initialisation :** Avant la première itération, S=∅, l\'invariant est trivialement vrai.
>
> Maintenance : Supposons que l\'invariant soit vrai pour ∣S∣=k. L\'algorithme sélectionne un sommet u∈V−S avec la plus petite estimation de distance d\[u\] et l\'ajoute à S. Nous devons montrer que d\[u\]=δ(s,u).\
> Supposons, pour arriver à une contradiction, que d\[u\]\>δ(s,u). Cela signifie qu\'il existe un chemin plus court de s à u. Soit p un tel plus court chemin. Comme s∈S et u∈/S, le chemin p doit quitter S à un certain point. Soit (x,y) la première arête de p avec x∈S et y∈V−S.\
> Le chemin de s à u peut être décomposé en s⇝x→y⇝u.

Puisque x∈S, par l\'hypothèse de récurrence, d\[x\]=δ(s,x).

Lorsque x a été ajouté à S, l\'arête (x,y) a été relâchée, donc d\[y\]≤d\[x\]+w(x,y)=δ(s,x)+w(x,y).

Par la propriété de sous-structure optimale, le sous-chemin s⇝y de p est un plus court chemin vers y, donc δ(s,y)=δ(s,x)+w(x,y). On a donc d\[y\]≤δ(s,y). Comme d\[y\] est une borne supérieure, on doit avoir d\[y\]=δ(s,y).

Puisque tous les poids d\'arêtes sont non-négatifs, le poids du chemin de y à u est non-négatif. Donc, δ(s,y)≤δ(s,u).

En combinant, on obtient d\[y\]=δ(s,y)≤δ(s,u)\<d\[u\].

Ceci est une contradiction. L\'algorithme a choisi u car il avait la plus petite estimation de distance dans V−S. Or, nous avons trouvé un autre sommet y∈V−S tel que d\[y\]\<d\[u\].\
L\'hypothèse d\[u\]\>δ(s,u) est donc fausse. On a bien d\[u\]=δ(s,u), et l\'invariant est maintenu.

> Terminaison : À la fin, S=V, donc pour tous les sommets v∈V, d\[v\]=δ(s,v).\
> \
>

Analyse de Complexité

L\'analyse est identique à celle de l\'algorithme de Prim, car la structure des opérations ( ∣V∣ appels à Extraire-Min et O(E) appels à Relax, qui peuvent déclencher une Decrease-Key) est la même.

> **Avec un tableau non trié :** O(V2).
>
> **Avec un tas binaire :** O(ElogV).
>
> Avec un tas de Fibonacci : O(E+VlogV).\
> \
>

Exemple d\'Exécution

Considérons un graphe avec les sommets {s, u, v, x, y} et les arêtes (s,u,10), (s,x,5), (u,v,1), (u,x,2), (v,y,4), (x,u,3), (x,v,9), (x,y,2), (y,s,7), (y,v,6).

> Initialisation : d = {s:0, u:∞, v:∞, x:∞, y:∞}, Q = {s,u,v,x,y}.
>
> Extraire s. S={s}. Relaxer (s,u) et (s,x). d devient {s:0, u:10, v:∞, x:5, y:∞}.
>
> Extraire x (clé 5). S={s,x}. Relaxer (x,u), (x,v), (x,y).

d\[u\] est 10, d\[x\]+w(x,u)=5+3=8\<10. d\[u\] devient 8.

d\[v\] est ∞, d\[x\]+w(x,v)=5+9=14. d\[v\] devient 14.

d\[y\] est ∞, d\[x\]+w(x,y)=5+2=7. d\[y\] devient 7.\
d est maintenant {s:0, u:8, v:14, x:5, y:7}.

> Extraire y (clé 7). S={s,x,y}. Relaxer (y,s), (y,v).

s est dans S, on l\'ignore.

d\[v\] est 14, d\[y\]+w(y,v)=7+6=13\<14. d\[v\] devient 13.\
d est maintenant {s:0, u:8, v:13, x:5, y:7}.

> Extraire u (clé 8). S={s,x,y,u}. Relaxer (u,v), (u,x).

d\[v\] est 13, d\[u\]+w(u,v)=8+1=9\<13. d\[v\] devient 9.

x est dans S, on l\'ignore.\
d est maintenant {s:0, u:8, v:9, x:5, y:7}.

> Extraire v (clé 9). S={s,x,y,u,v}. Relaxer (v,y). y est dans S.
>
> Q est vide. L\'algorithme se termine. Les distances finales sont : d(s)=0,d(x)=5,d(y)=7,d(u)=8,d(v)=9.

### 25.3.3 Algorithme de Bellman-Ford (SSSP, Poids Négatifs Autorisés)

Lorsque les poids négatifs sont autorisés, l\'approche gloutonne de Dijkstra n\'est plus valide. L\'algorithme de Bellman-Ford fournit une solution plus générale basée sur la programmation dynamique. Il est plus lent que Dijkstra, mais sa capacité à gérer les poids négatifs et à détecter les cycles de poids négatif le rend indispensable.

Principe de l\'algorithme

L\'algorithme de Bellman-Ford repose sur une idée simple : un plus court chemin simple peut contenir au plus ∣V∣−1 arêtes. L\'algorithme procède en trouvant itérativement les plus courts chemins de longueurs (en nombre d\'arêtes) croissantes. Il effectue ∣V∣−1 passes. À la fin de la passe i, il garantit d\'avoir trouvé la distance de tous les plus courts chemins de la source s à n\'importe quel autre sommet v qui utilisent au plus i arêtes.

Pour ce faire, à chaque passe, l\'algorithme relâche toutes les arêtes du graphe. Cette approche systématique, bien que paraissant \"brute force\", assure que l\'information de distance se propage correctement à travers le graphe, même en présence de poids négatifs. 25

**Pseudo-code de l\'algorithme de Bellman-Ford**

Bellman-Ford(G, w, s)\
1. // Initialisation\
2. Pour chaque sommet v dans V\[G\]\
3. d\[v\] ← ∞\
4. π\[v\] ← NIL\
5. d\[s\] ← 0\
6.\
7. // Boucle principale de relaxation\
8. Pour i de 1 à \|V\| - 1\
9. Pour chaque arête (u, v) dans E\[G\]\
10. Relax(u, v, w)\
11.\
12. // Détection des cycles de poids négatif\
13. Pour chaque arête (u, v) dans E\[G\]\
14. Si d\[v\] \> d\[u\] + w(u, v)\
15. Retourner FAUX // Cycle négatif détecté\
16.\
17. Retourner VRAI

Preuve de Correction

La preuve se fait par récurrence sur le nombre de passes, i. Soit di​\[v\] la valeur de d\[v\] après i passes complètes de la boucle principale.

Lemme : Après i passes, pour tout sommet v, di​\[v\]≤δi​(s,v), où δi​(s,v) est le poids du plus court chemin de s à v utilisant au plus i arêtes.

> **Base (i=0) :** Après l\'initialisation, d0​\[s\]=0 et d0​\[v\]=∞ pour v=s. Ceci est correct, car le seul chemin de 0 arête est de s à s.
>
> Maintenance : Supposons que le lemme soit vrai pour i−1. Considérons un plus court chemin p de s à v avec au plus i arêtes. Soit u le prédécesseur de v sur ce chemin. Le sous-chemin de s à u est un plus court chemin avec au plus i−1 arêtes. Par l\'hypothèse de récurrence, après i−1 passes, on avait di−1​\[u\]≤δi−1​(s,u).\
> Lors de la i-ème passe, l\'arête (u,v) est relâchée. La nouvelle distance di​\[v\] sera au plus di−1​\[u\]+w(u,v).\
> Donc, di​\[v\]≤di−1​\[u\]+w(u,v)≤δi−1​(s,u)+w(u,v)=δi​(s,v).\
> L\'invariant est maintenu.

Comme un plus court chemin simple ne peut avoir plus de ∣V∣−1 arêtes, après ∣V∣−1 passes, d\[v\]≤δ(s,v). Puisque d\[v\] est toujours une borne supérieure, on a d\[v\]=δ(s,v).

Détection des Cycles de Poids Négatif

Si le graphe ne contient pas de cycle de poids négatif, les distances ont convergé après ∣V∣−1 passes. Si, lors d\'une passe supplémentaire (lignes 13-15), une distance peut encore être diminuée, cela signifie qu\'un chemin de la forme s⇝u→v a un poids d\[u\]+w(u,v) qui est inférieur à d\[v\]. Or, d\[v\] était censé être la distance finale. La seule façon pour que cela se produise est que le chemin de s à u contienne un cycle de poids négatif, ou que u lui-même soit dans un tel cycle. La relaxation supplémentaire propage cet effet de \"distance infiniment petite\". 24

Analyse de Complexité

L\'algorithme est dominé par les deux boucles imbriquées.

> La boucle externe (ligne 8) s\'exécute ∣V∣−1 fois.
>
> La boucle interne (ligne 9) s\'exécute ∣E∣ fois.
>
> La complexité de la partie relaxation est donc (∣V∣−1)×O(E)=O(VE).
>
> La partie détection de cycle prend O(E).
>
> La complexité totale est de O(VE).

### 25.3.4 Algorithme de Floyd-Warshall (APSP, Poids Négatifs Autorisés)

Pour résoudre le problème des plus courts chemins entre toutes les paires, on pourrait exécuter Bellman-Ford ∣V∣ fois, une fois depuis chaque sommet, pour une complexité totale de O(V2E). Pour les graphes denses où E=O(V2), cela donne O(V4). L\'algorithme de Floyd-Warshall offre une solution de programmation dynamique plus directe et plus efficace pour les graphes denses, avec une complexité de O(V3).

Principe de l\'algorithme

L\'algorithme de Floyd-Warshall adopte une perspective différente sur la sous-structure du problème. Au lieu de construire les chemins en augmentant leur nombre d\'arêtes, il les construit en augmentant l\'ensemble des sommets \"intermédiaires\" autorisés.

Soient les sommets numérotés de 1 à ∣V∣. Soit dij(k)​ la longueur du plus court chemin du sommet i au sommet j en n\'utilisant que des sommets intermédiaires de l\'ensemble {1,2,...,k}.

L\'algorithme calcule itérativement une séquence de matrices D(0),D(1),...,D(∣V∣), où Dij(k)​=dij(k)​.

La relation de récurrence est au cœur de l\'algorithme : pour calculer dij(k)​, on considère un plus court chemin de i à j avec des sommets intermédiaires dans {1,...,k}.

> Soit ce chemin **n\'utilise pas** le sommet k. Dans ce cas, son poids est dij(k−1)​.
>
> Soit ce chemin **utilise** le sommet k. Dans ce cas, il peut être décomposé en un chemin de i à k et un chemin de k à j, tous deux n\'utilisant que des sommets intermédiaires dans {1,...,k−1}. Son poids est dik(k−1)​+dkj(k−1)​.

On prend donc le minimum de ces deux possibilités :

dij(k)​=min(dij(k−1)​,dik(k−1)​+dkj(k−1)​)

La matrice de base, D(0), est simplement la matrice d\'adjacence du graphe. 34

**Pseudo-code de l\'algorithme de Floyd-Warshall**

Floyd-Warshall(W) // W est la matrice d\'adjacence\
1. n ← nombre de lignes de W\
2. D(0) ← W\
3. Pour k de 1 à n\
4. Pour i de 1 à n\
5. Pour j de 1 à n\
6. D(k)\[i, j\] ← min(D(k-1)\[i, j\], D(k-1)\[i, k\] + D(k-1)\[k, j\])\
7. Retourner D(n)

(En pratique, on peut utiliser une seule matrice et la mettre à jour sur place, car les valeurs de l\'itération k−1 ne sont pas écrasées avant d\'être utilisées pour l\'itération k).

Preuve de Correction

La preuve suit directement la logique de la relation de récurrence. On prouve par récurrence sur k que la matrice D(k) contient bien les valeurs dij(k)​.

> **Base (k=0) :** D(0) est la matrice d\'adjacence, qui représente les chemins sans sommet intermédiaire (c\'est-à-dire les arêtes directes). C\'est correct.
>
> **Maintenance :** Supposons que D(k−1) soit correcte. L\'itération k calcule D(k) en appliquant la relation de récurrence. Comme nous l\'avons vu, cette relation couvre exhaustivement les deux seuls cas possibles pour un plus court chemin utilisant des intermédiaires dans {1,...,k}. La matrice D(k) est donc correcte.
>
> **Terminaison :** Après n itérations, la matrice finale D(n) contient les distances des plus courts chemins pouvant utiliser n\'importe quel sommet de {1,...,n} comme intermédiaire, ce qui correspond à la définition de δ(i,j).

Analyse de Complexité

L\'algorithme est constitué de trois boucles Pour imbriquées, chacune s\'exécutant n fois, où n=∣V∣. L\'instruction à l\'intérieur de la boucle la plus profonde prend un temps constant. La complexité totale est donc O(n3)=O(V3). 34

Le tableau suivant synthétise les caractéristiques des algorithmes de plus courts chemins, offrant un guide pour choisir l\'outil approprié en fonction des contraintes du problème.

  ---------------------------------- ---------------------------------------- --------------------------------------- ------------------------------
  Critère                            Algorithme de Dijkstra                   Algorithme de Bellman-Ford              Algorithme de Floyd-Warshall

  **Problème Résolu**                Source Unique (SSSP)                     Source Unique (SSSP)                    Toutes Paires (APSP)

  **Contraintes sur les Poids**      Non-négatifs                             Négatifs autorisés                      Négatifs autorisés

  **Détection de Cycles Négatifs**   Non                                      Oui                                     Oui (avec dii​\<0)

  **Principe Algorithmique**         Glouton                                  Programmation Dynamique                 Programmation Dynamique

  **Complexité Temporelle**          O(E+VlogV)                               O(VE)                                   O(V3)

  **Idéal pour**                     Graphes clairsemés sans poids négatifs   Cas général SSSP, détection de cycles   Graphes denses, APSP
  ---------------------------------- ---------------------------------------- --------------------------------------- ------------------------------

## 25.4 Flux Réseaux

Les algorithmes de flux réseaux modélisent des problèmes de transport de marchandises, de données ou de toute autre commodité à travers un réseau de capacités limitées. Le problème central, celui du **flot maximum**, cherche à déterminer la quantité maximale de \"matière\" pouvant être acheminée d\'un point source à un point puits. Ce problème a des applications directes en logistique, en télécommunications, en planification de production, et sert également de sous-routine pour résoudre d\'autres problèmes combinatoires, comme le couplage dans les graphes bipartis.

L\'étude des flux est dominée par un résultat d\'une importance capitale : le **théorème flot maximum/coupe minimum**. Ce théorème établit une relation de dualité profonde entre le problème de maximisation du flot et un problème de minimisation structurelle, la recherche d\'un \"goulot d\'étranglement\" de capacité minimale dans le réseau. La méthode de Ford-Fulkerson, qui est en réalité un cadre algorithmique général, exploite cette relation pour trouver itérativement le flot maximum.

### 25.4.1 Le Problème du Flot Maximum

Pour aborder ce problème, nous devons d\'abord définir formellement ses composantes.

**Définitions Formelles**

> Un **réseau de flot** est un graphe orienté G=(V,E) dans lequel chaque arête (u,v)∈E possède une **capacité** c(u,v)≥0. On distingue deux sommets particuliers : une **source** s (qui n\'a pas d\'arêtes entrantes) et un **puits** t (qui n\'a pas d\'arêtes sortantes).
>
> Un **flot** dans G est une fonction f:V×V→R qui satisfait les trois propriétés suivantes :

**Contrainte de capacité :** Pour tous u,v∈V, f(u,v)≤c(u,v). Le flot sur une arête ne peut excéder sa capacité.

**Antisymétrie :** Pour tous u,v∈V, f(u,v)=−f(v,u). Un flot de u vers v est équivalent à un flot \"négatif\" de v vers u.

**Conservation du flot :** Pour tout u∈V∖{s,t}, ∑v∈V​f(u,v)=0. Le flot total entrant dans un sommet intermédiaire est égal au flot total sortant.

> La **valeur du flot**, notée ∣f∣, est le flot total net sortant de la source : ∣f∣=∑v∈V​f(s,v). Par la propriété de conservation, on peut montrer que c\'est aussi le flot total net entrant dans le puits.

Le **problème du flot maximum** consiste à trouver un flot f qui maximise la valeur ∣f∣.

#### Concepts Clés : Graphe Résiduel et Chemin Augmentant

La clé pour résoudre le problème du flot maximum est de comprendre comment améliorer un flot existant. La méthode de Ford-Fulkerson repose sur deux concepts centraux.

> Graphe Résiduel (Gf​) : Étant donné un réseau G et un flot f, le graphe résiduel Gf​ représente la capacité \"restante\" sur chaque arête. Pour chaque paire de sommets (u,v), la capacité résiduelle cf​(u,v) est définie par cf​(u,v)=c(u,v)−f(u,v). Les arêtes de Gf​ sont les paires (u,v) pour lesquelles cf​(u,v)\>0.\
> Le graphe résiduel est une innovation conceptuelle majeure. Il ne modélise pas seulement la capacité disponible dans le sens de l\'arête originale (si f(u,v)\<c(u,v), on peut encore envoyer c(u,v)−f(u,v) unités de flot), mais il introduit aussi des arêtes inverses. Si un flot f(u,v)\>0 existe, cela crée une capacité résiduelle cf​(v,u)=f(u,v) sur l\'arête inverse (v,u) dans Gf​. Cette arête inverse représente la possibilité d\'annuler ou de \"pousser en arrière\" le flot existant sur (u,v) pour le rediriger potentiellement sur un chemin plus efficace. Le graphe résiduel transforme ainsi un problème d\'optimisation en une série de simples problèmes d\'atteignabilité. 43
>
> **Chemin Augmentant :** Un chemin augmentant est un chemin simple de la source s au puits t dans le graphe résiduel Gf​. La présence d\'un tel chemin signifie que le flot actuel n\'est pas maximal. On peut en effet augmenter le flot le long de ce chemin. La quantité maximale de flot supplémentaire que l\'on peut envoyer est la **capacité résiduelle du chemin**, définie comme le minimum des capacités résiduelles de ses arêtes : cf​(p)=min{cf​(u,v)∣(u,v)∈p}.

### 25.4.2 La Méthode de Ford-Fulkerson

La méthode de Ford-Fulkerson n\'est pas un algorithme spécifique, mais plutôt un cadre général (une méta-méthode) qui applique itérativement l\'idée des chemins augmentants.

**Principe Général**

> Initialiser le flot f à zéro sur toutes les arêtes.
>
> Tant qu\'il existe un chemin augmentant p de s à t dans le graphe résiduel Gf​ :\
> a. Trouver la capacité résiduelle du chemin, Δf​=cf​(p).\
> b. Augmenter le flot : pour chaque arête (u,v) sur le chemin p, mettre à jour f(u,v)←f(u,v)+Δf​ et f(v,u)←f(v,u)−Δf​.
>
> Retourner le flot f.\
> \
>

La performance et même la terminaison de cette méthode dépendent de la manière dont le chemin augmentant est choisi à l\'étape 2. Si les capacités sont des nombres irrationnels, la méthode pourrait ne jamais se terminer. Si les capacités sont entières, chaque augmentation augmente la valeur du flot d\'au moins 1, garantissant la terminaison.  L\'algorithme d\'Edmonds-Karp, que nous verrons plus loin, propose une stratégie spécifique de choix de chemin qui garantit une complexité polynomiale.

### 25.4.3 Le Théorème Flot Maximum / Coupe Minimum

Ce théorème est l\'un des résultats les plus importants de l\'optimisation combinatoire. Il établit une égalité remarquable entre la valeur du flot maximum et la capacité d\'une coupe minimum, révélant une dualité profonde entre ces deux problèmes.

Définition de la Coupe

Une coupe s-t est une partition des sommets V en deux ensembles S et T=V−S, telle que la source s∈S et le puits t∈T. La capacité de la coupe (S,T), notée C(S,T), est la somme des capacités de toutes les arêtes qui vont de S à T :

C(S,T)=∑u∈S,v∈T​c(u,v)

Le problème de la coupe minimum consiste à trouver une coupe s-t de capacité minimale. 39

Énoncé du Théorème

Pour tout réseau de flot, les trois affirmations suivantes sont équivalentes :

> f est un flot de valeur maximale.
>
> Le graphe résiduel Gf​ ne contient aucun chemin augmentant de s à t.
>
> Il existe une coupe s-t (S,T) telle que ∣f∣=C(S,T).

De plus, la valeur d\'un flot maximum est égale à la capacité d\'une coupe minimum.

∣fmax​∣=Cmin​

Preuve Détaillée du Théorème

La preuve consiste à démontrer le cycle d\'implications 1⇒2⇒3⇒1.

> **Lemme préliminaire :** Pour tout flot f et toute coupe s-t (S,T), on a ∣f∣≤C(S,T).

Preuve : La valeur du flot ∣f∣ est le flot net sortant de la source. On peut montrer par la propriété de conservation que le flot net traversant n\'importe quelle coupe (S,T) est égal à ∣f∣.\
∣f∣=∑u∈S,v∈T​f(u,v)−∑v∈T,u∈S​f(v,u).\
Puisque f(u,v)≤c(u,v) et f(v,u)≥0 (car c(v,u) est généralement 0 si l\'arête n\'existe pas, et le flot est antisymétrique, donc f(v,u)=−f(u,v)≤0 n\'est pas vrai en général, on utilise f(v,u)≥−c(u,v)), on a :\
∣f∣≤∑u∈S,v∈T​c(u,v)−∑v∈T,u∈S​0=C(S,T).\
Ce lemme montre que la valeur de n\'importe quel flot est bornée par la capacité de n\'importe quelle coupe.

> (1⇒2) : f est maximum ⇒ pas de chemin augmentant.\
> C\'est la contraposée du lemme d\'augmentation : si un chemin augmentant p existe dans Gf​, on peut construire un nouveau flot f′ de valeur ∣f′∣=∣f∣+cf​(p)\>∣f∣. Donc, si un chemin augmentant existe, le flot f n\'est pas maximum. Par conséquent, si f est maximum, aucun chemin augmentant ne peut exister.
>
> (2⇒3) : Pas de chemin augmentant ⇒ il existe une coupe (S,T) telle que ∣f∣=C(S,T).\
> C\'est le cœur de la preuve. Supposons qu\'il n\'y ait aucun chemin augmentant de s à t dans Gf​.

Définissons l\'ensemble S comme l\'ensemble de tous les sommets accessibles depuis s dans le graphe résiduel Gf​.

Définissons T=V−S.

Cette partition (S,T) est une coupe s-t valide, car s∈S (accessible par un chemin de longueur 0) et t∈/S (par hypothèse, t n\'est pas accessible depuis s dans Gf​).

Considérons une arête quelconque (u,v) du graphe original G avec u∈S et v∈T. Par définition de S, v n\'est pas accessible depuis s dans Gf​. Cela implique qu\'il n\'y a pas d\'arête de u à v dans Gf​, donc la capacité résiduelle cf​(u,v) doit être nulle. Or, cf​(u,v)=c(u,v)−f(u,v). Donc, f(u,v)=c(u,v). Le flot sature l\'arête.

Considérons une arête quelconque (v,u) de G avec u∈S et v∈T. Si f(v,u)\>0, alors il y aurait une arête inverse (u,v) dans Gf​ avec une capacité résiduelle cf​(u,v)=f(v,u)\>0. Comme u∈S, v serait aussi accessible, ce qui contredit v∈T. Donc, on doit avoir f(v,u)≤0. Avec l\'antisymétrie, cela veut dire f(u,v)≥0.

Utilisons maintenant la formule du flot net à travers la coupe :\
∣f∣=∑u∈S,v∈T​f(u,v)−∑v∈T,u∈S​f(v,u)\
D\'après (4), le premier terme est ∑u∈S,v∈T​c(u,v)=C(S,T).\
D\'après (5), le second terme est ∑v∈T,u∈S​f(v,u)≤0. Comme f(v,u)≤c(v,u), on a f(u,v)=−f(v,u)≥−c(v,u). La somme est donc ∑f(v,u)≤0.\
En fait, on a f(v,u)=0 pour (v,u) avec v∈T,u∈S. Sinon cf​(u,v)=f(v,u)\>0 et v serait dans S.\
Donc ∣f∣=C(S,T)−0=C(S,T).\
Nous avons construit une coupe dont la capacité est égale à la valeur du flot. 47

> (3⇒1) : ∣f∣=C(S,T) pour une coupe ⇒ f est maximum.\
> D\'après notre lemme préliminaire, pour n\'importe quel flot f′, ∣f′∣≤C(S,T). Si nous avons trouvé un flot f tel que ∣f∣=C(S,T), alors pour tout autre flot f′, ∣f′∣≤C(S,T)=∣f∣. Donc, f est un flot de valeur maximale. 46

### 25.4.4 Implémentation d\'Edmonds-Karp

L\'algorithme d\'Edmonds-Karp est une implémentation spécifique de la méthode de Ford-Fulkerson. Sa contribution est de spécifier *comment* trouver le chemin augmentant : il faut choisir le chemin qui est le **plus court** en termes de nombre d\'arêtes dans le graphe résiduel. Cette simple règle suffit à garantir une complexité polynomiale. La recherche d\'un tel chemin se fait naturellement à l\'aide d\'un parcours en largeur (BFS).

**Analyse de Complexité**

> **Coût d\'une itération :** La recherche d\'un chemin augmentant le plus court avec BFS dans le graphe résiduel prend un temps de O(E), car le graphe résiduel a ∣V∣ sommets et au plus 2∣E∣ arêtes.
>
> **Nombre d\'augmentations :** C\'est la partie la plus subtile de l\'analyse. On peut prouver que la distance du plus court chemin de la source s à n\'importe quel sommet v dans le graphe résiduel, notée δf​(s,v), est une fonction non-décroissante du nombre d\'augmentations.

Une arête (u,v) est dite **critique** sur un chemin augmentant p si sa capacité résiduelle est égale à la capacité du chemin (cf​(u,v)=cf​(p)). Après l\'augmentation, cette arête disparaît du graphe résiduel.

On peut montrer qu\'une arête (u,v) peut devenir critique au plus ∣V∣/2 fois. L\'idée est que lorsque (u,v) redevient critique, la distance δf​(s,v) doit avoir augmenté d\'au moins 2 par rapport à la fois précédente.

Comme il y a au plus 2∣E∣ arêtes potentielles dans le graphe résiduel, le nombre total d\'événements \"une arête devient critique\" est borné par O(VE).

Puisque chaque augmentation a au moins une arête critique, le nombre total d\'augmentations est borné par O(VE).

> **Complexité totale :** Le coût total est le produit du nombre d\'augmentations par le coût de chaque augmentation : O(VE)×O(E)=O(VE2).

Exemple d\'Exécution

Considérons le réseau de la figure ci-dessous.

Source : Wikimedia Commons, domaine public

> **Flot initial :** f=0. Gf​=G.
>
> **Itération 1 :**

BFS dans Gf​ trouve le chemin p1​=A→B→D.

Capacité résiduelle : cf​(p1​)=min(c(A,B),c(B,D))=min(1000,1000)=1000.

Augmenter le flot de 1000 sur p1​. ∣f∣=1000.

Le graphe résiduel est mis à jour. Les arêtes (A,B) et (B,D) sont saturées. Des arêtes inverses (B,A) et (D,B) apparaissent avec une capacité de 1000.

> **Itération 2 :**

BFS dans le nouveau Gf​ trouve le chemin p2​=A→C→D.

Capacité résiduelle : cf​(p2​)=min(c(A,C),c(C,D))=min(1000,1000)=1000.

Augmenter le flot de 1000 sur p2​. ∣f∣=2000.

Le graphe résiduel est mis à jour. (A,C) et (C,D) sont saturées.

> **Itération 3 :**

BFS dans le nouveau Gf​ trouve le chemin p3​=A→B→C→D. Ce chemin est plus long mais existe.

Capacité résiduelle : cf​(p3​)=min(cf​(A,B),cf​(B,C),cf​(C,D)). Supposons une capacité de 1 sur (B,C). cf​(p3​)=1.

Augmenter le flot de 1. ∣f∣=2001.

> Le processus continue jusqu\'à ce que BFS ne puisse plus trouver de chemin de A à D dans le graphe résiduel. À ce moment, le flot est maximal. La coupe minimale est alors donnée par l\'ensemble des sommets accessibles depuis A dans le dernier graphe résiduel.

## 25.5 Algorithmes d\'approximation et Algorithmes probabilistes

Jusqu\'à présent, nous nous sommes concentrés sur des algorithmes qui trouvent des solutions exactes et optimales en temps polynomial. Cependant, une vaste classe de problèmes d\'optimisation d\'une importance pratique considérable, les problèmes **NP-difficiles**, résiste à de telles solutions. Sous l\'hypothèse largement acceptée que P=NP, il est très improbable qu\'il existe des algorithmes en temps polynomial pour résoudre ces problèmes de manière exacte.

Face à cette \"dureté\" computationnelle, les informaticiens ont développé des stratégies alternatives. Ce chapitre introduit deux de ces paradigmes avancés : les **algorithmes d\'approximation**, qui sacrifient l\'optimalité pour garantir une solution \"suffisamment bonne\" en temps polynomial, et les **algorithmes probabilistes**, qui utilisent le hasard comme un outil pour gagner en efficacité ou en simplicité.

### 25.5.1 Introduction aux Algorithmes d\'Approximation

Lorsqu\'un problème d\'optimisation est NP-difficile, chercher une solution exacte peut prendre un temps exponentiel, ce qui est infaisable pour des instances de taille non triviale. Un algorithme d\'approximation est un algorithme qui s\'exécute en temps polynomial et renvoie une solution dont la qualité est garantie d\'être à une certaine distance de la solution optimale.

Définition du Ratio d\'Approximation

La qualité d\'un algorithme d\'approximation est mesurée par son ratio d\'approximation (ou facteur d\'approximation), noté ρ. Soit Copt​ le coût de la solution optimale et Calgo​ le coût de la solution renvoyée par l\'algorithme.

> Pour un **problème de minimisation**, un algorithme est une ρ-approximation si, pour toute instance du problème, Calgo​≤ρ⋅Copt​, avec ρ≥1. Un ratio de 2 signifie que la solution trouvée n\'est jamais plus de deux fois pire que l\'optimum.
>
> Pour un problème de maximisation, un algorithme est une ρ-approximation si, pour toute instance du problème, Calgo​≥ρ⋅Copt​, avec 0\<ρ≤1. Un ratio de 0.5 signifie que la solution trouvée vaut au moins la moitié de l\'optimum.\
> \
>

La conception d\'un algorithme d\'approximation ne réside pas seulement dans l\'élaboration d\'une heuristique, mais surtout dans la capacité à **prouver** mathématiquement ce ratio de garantie dans le pire des cas. La difficulté majeure est souvent de trouver une bonne borne inférieure sur Copt​ (pour la minimisation) ou une borne supérieure (pour la maximisation), puisque la valeur optimale elle-même est inconnue.

### 25.5.2 Étude de Cas : 2-Approximation pour la Couverture de Sommets (Vertex Cover)

Le problème de la couverture de sommets est un exemple classique de problème NP-complet pour lequel il existe un algorithme d\'approximation simple et élégant.

Définition du Problème

Étant donné un graphe non orienté G=(V,E), une couverture de sommets est un sous-ensemble de sommets C⊆V tel que chaque arête de E ait au moins une de ses extrémités dans C. Le problème d\'optimisation consiste à trouver une couverture de sommets de cardinalité minimale. 57

Description de l\'Algorithme d\'Approximation

L\'algorithme suivant fournit une 2-approximation pour ce problème. Il est basé sur le concept de couplage. Un couplage est un ensemble d\'arêtes sans sommet commun. Un couplage est maximal s\'il ne peut pas être étendu en y ajoutant une autre arête.

Approx-Vertex-Cover(G)\
1. C ← ∅\
2. E\' ← E\[G\]\
3. Tant que E\' n\'est pas vide\
4. Choisir une arête arbitraire (u, v) dans E\'\
5. C ← C ∪ {u, v}\
6. Retirer de E\' toutes les arêtes incidentes à u ou à v\
7. Retourner C

Cet algorithme est équivalent à trouver un couplage maximal M (l\'ensemble des arêtes choisies à l\'étape 4) et à retourner l\'ensemble de tous les sommets qui sont des extrémités des arêtes de M.

Preuve du Ratio d\'Approximation de 2

La preuve se déroule en deux temps : montrer que la solution est valide, puis borner son coût par rapport à l\'optimum.

> **Validité de la solution :** La solution C retournée est bien une couverture de sommets. En effet, si une arête (u,v) n\'était pas couverte, cela signifierait que ni u ni v ne sont dans C. Mais si cette arête existait, elle aurait dû être sélectionnée à une étape de la boucle (si elle n\'avait pas déjà été couverte par une autre arête), ce qui est une contradiction.
>
> Borne sur le ratio :\
> a. Soit C∗ une couverture de sommets optimale. Par définition, ∣C∗∣=Copt​.\
> b. Soit M l\'ensemble des arêtes choisies par l\'algorithme à l\'étape 4. M est un couplage, car à chaque fois qu\'on choisit une arête (u,v), on retire toutes les arêtes incidentes à u et v, donc aucune autre arête choisie ne partagera de sommet avec (u,v).\
> c. Pour couvrir les arêtes du couplage M, toute couverture de sommets (y compris la couverture optimale C∗) doit contenir au moins un sommet pour chaque arête de M. Puisque les arêtes de M n\'ont pas de sommets en commun, ces sommets choisis dans C∗ doivent tous être distincts.\
> d. Par conséquent, la taille de la couverture optimale est au moins aussi grande que le nombre d\'arêtes dans notre couplage : ∣C∗∣≥∣M∣. C\'est ici que nous trouvons la borne inférieure cruciale sur la solution optimale.\
> e. L\'algorithme retourne une couverture C dont la taille est exactement deux fois le nombre d\'arêtes dans M, car il ajoute les deux extrémités de chaque arête de M : ∣C∣=2∣M∣.\
> f. En combinant ces inégalités, nous obtenons :\
> ∣C∣=2∣M∣≤2∣C∗∣=2⋅Copt​\
> La solution trouvée a donc une taille au plus double de celle de la solution optimale, ce qui prouve que c\'est une 2-approximation. 55

### 25.5.3 Introduction aux Algorithmes Probabilistes

Les algorithmes probabilistes (ou randomisés) intègrent le hasard dans leur logique. Un tel algorithme utilise des nombres aléatoires pour prendre des décisions. L\'objectif est souvent d\'obtenir de bonnes performances en moyenne, en évitant les pires cas qui peuvent affecter les algorithmes déterministes. On distingue deux grandes familles d\'algorithmes probabilistes.

> **Algorithmes de type Las Vegas :** Ces algorithmes garantissent de toujours renvoyer un résultat **correct**. Cependant, leur temps d\'exécution n\'est pas déterministe ; c\'est une variable aléatoire. L\'analyse de performance se concentre sur le **temps d\'exécution attendu**. Un exemple classique est l\'algorithme Quicksort où le pivot est choisi aléatoirement. Le pire cas (quadratique) devient extrêmement improbable, et le temps d\'exécution attendu est de O(nlogn).
>
> **Algorithmes de type Monte Carlo :** Ces algorithmes ont un temps d\'exécution déterministe (généralement polynomial), mais ils peuvent renvoyer un résultat **incorrect** avec une certaine probabilité. L\'objectif est de s\'assurer que cette probabilité d\'erreur est très faible et peut être réduite en répétant l\'algorithme plusieurs fois.

La randomisation est une stratégie puissante pour transformer une complexité de pire cas en une complexité attendue bien meilleure, en rendant les instances pathologiques très peu probables.

### 25.5.4 Étude de Cas : Test de Primalité de Miller-Rabin

Le test de primalité est un problème fondamental en théorie des nombres et en cryptographie (par exemple, pour la génération de clés RSA). Étant donné un grand entier n, on veut déterminer s\'il est premier ou composé. Les méthodes déterministes comme la division par essai sont trop lentes. Le test de Miller-Rabin est un algorithme de type Monte Carlo qui résout ce problème de manière efficace et fiable.

Principe de l\'algorithme

Le test de Miller-Rabin est une amélioration du test de primalité de Fermat. Il est basé sur les deux propriétés suivantes des nombres premiers :

> **Petit Théorème de Fermat :** Si p est un nombre premier, alors pour tout entier a non divisible par p, on a ap−1≡1(modp).
>
> **Racines carrées de l\'unité :** Si p est un nombre premier, les seules solutions à l\'équation x2≡1(modp) sont x≡1(modp) et x≡−1(modp).

Un nombre composé n qui satisfait an−1≡1(modn) pour une base a est appelé un pseudo-premier de Fermat. Le test de Miller-Rabin renforce cette condition en utilisant la deuxième propriété.

L\'algorithme fonctionne comme suit :

> Soit n le nombre impair à tester. On écrit n−1=2s⋅d, où d est impair.
>
> On choisit une base a aléatoirement dans l\'intervalle \[2,n−2\].
>
> On calcule x=ad(modn).
>
> Si x=1 ou x=n−1, alors n passe le test pour cette base et est déclaré \"probablement premier\".
>
> Sinon, on calcule x2,x4,...,x2s−1 modulo n (en mettant x au carré s−1 fois).

Si, à une étape, on obtient n−1 (c\'est-à-dire -1 mod n), alors n passe le test et est déclaré \"probablement premier\".

Si, à une étape, on obtient 1, cela signifie que le terme précédent était une racine carrée de 1 différente de 1 et de -1. Dans ce cas, n est **certainement composé**, et a est un **témoin** de sa non-primalité.

> Si la boucle se termine sans que n−1 n\'ait été trouvé, alors n est certainement composé.\
> \
>

Analyse de la Probabilité d\'Erreur

La force du test de Miller-Rabin réside dans le fait que si n est un nombre composé, il y a très peu de \"menteurs\" (des bases a pour lesquelles n passe le test).

> **Théorème :** Si n est un nombre impair composé, le nombre de bases a dans \[1,n−1\] qui ne sont pas des témoins (c\'est-à-dire les \"menteurs forts\") est au plus (n−1)/4.
>
> Cela signifie que si n est composé, la probabilité de choisir une base a au hasard qui ne révèle pas sa non-primalité est inférieure à 1/4.
>
> En répétant le test k fois avec k bases choisies indépendamment, la probabilité que n (s\'il est composé) soit déclaré \"probablement premier\" à chaque fois est inférieure à (1/4)k.
>
> Pour des valeurs de k modérées (par exemple, k=40), cette probabilité d\'erreur devient astronomiquement faible, rendant le test extrêmement fiable en pratique.

Un adversaire ne peut pas construire un nombre composé qui trompera l\'algorithme à coup sûr, car le choix de la base a est aléatoire et la grande majorité des bases révéleront la non-primalité. C\'est un exemple parfait de la puissance de la randomisation pour surmonter l\'incertitude et la complexité.

## 25.6 Algorithmes sur les chaînes de caractères

La recherche de motifs dans des textes est un problème fondamental en informatique, avec des applications allant de la simple fonction \"Rechercher\" dans un éditeur de texte à des tâches complexes comme l\'analyse de séquences génomiques, la détection de plagiat ou le filtrage de paquets réseau. Le problème est simple à énoncer, mais les solutions efficaces requièrent des idées algorithmiques ingénieuses pour éviter des comparaisons redondantes et coûteuses.

Cette section explore deux algorithmes avancés pour la recherche de motifs qui améliorent drastiquement la performance par rapport à l\'approche naïve. L\'algorithme de Rabin-Karp utilise une technique de hachage astucieuse pour comparer rapidement des sous-chaînes, tandis que l\'algorithme de Knuth-Morris-Pratt (KMP) exploite la structure interne du motif lui-même pour éviter de revenir en arrière dans le texte après une non-concordance.

### 25.6.1 Le Problème de la Recherche de Motif (Pattern Matching)

Définition

Étant donné un texte T de longueur n et un motif P de longueur m, le problème de la recherche de motif consiste à trouver toutes les occurrences de P comme sous-chaîne de T. Une occurrence est un indice de décalage s tel que T\[s+1...s+m\]=P\[1...m\].

L\'Algorithme Naïf

L\'approche la plus directe consiste à essayer tous les décalages possibles de 0 à n−m. Pour chaque décalage s, on compare le motif P avec la sous-chaîne T\[s+1...s+m\] caractère par caractère.

Naive-String-Matcher(T, P)\
1. n ← longueur(T)\
2. m ← longueur(P)\
3. Pour s de 0 à n - m\
4. Si P\[1..m\] == T\[s+1.. s+m\]\
5. Le motif apparaît avec le décalage s

Dans le pire des cas, la comparaison à la ligne 4 prend O(m). Comme il y a n−m+1 décalages possibles, la complexité totale de l\'algorithme naïf est de O((n−m+1)m), soit O(nm).  Pour des textes et des motifs longs, cette complexité quadratique est prohibitive.

### 25.6.2 Algorithme de Rabin-Karp

L\'algorithme de Rabin-Karp propose une idée simple pour accélérer la comparaison entre le motif et les sous-chaînes du texte : au lieu de comparer les chaînes elles-mêmes, on compare leurs **empreintes numériques** (ou *hash*). Si les empreintes sont différentes, les chaînes le sont certainement aussi. Si les empreintes sont identiques, il y a une forte probabilité que les chaînes le soient, mais une vérification caractère par caractère est nécessaire pour écarter les **collisions de hachage** (deux chaînes différentes ayant la même empreinte).

Le Hachage Roulant (\"Rolling Hash\")

La véritable innovation de l\'algorithme de Rabin-Karp est l\'utilisation d\'une fonction de hachage qui peut être mise à jour en temps constant O(1) lorsqu\'on décale la fenêtre de la sous-chaîne d\'une position. C\'est le concept de hachage roulant.

Une méthode efficace consiste à interpréter une chaîne de caractères de longueur m comme un nombre en base d, où d est la taille de l\'alphabet (par exemple, 256). L\'empreinte de la chaîne P\[1...m\] est :

h(P)=(P⋅dm−1+P⋅dm−2+⋯+P\[m\]⋅d0)(modq)

où q est un grand nombre premier choisi pour éviter les débordements et minimiser les collisions.

Soit hs​ l\'empreinte de la sous-chaîne du texte T\[s+1...s+m\]. Pour calculer l\'empreinte de la sous-chaîne suivante, hs+1​=h(T\[s+2...s+m+1\]), au lieu de tout recalculer, on peut le faire en O(1) :

> On soustrait la contribution du premier caractère sortant, T\[s+1\]⋅dm−1.
>
> On multiplie le résultat par la base d.
>
> On ajoute la contribution du nouveau caractère entrant, T\[s+m+1\].

La formule de mise à jour est donc :

hs+1​=(d⋅(hs​−T\[s+1\]⋅dm−1)+T\[s+m+1\])(modq)

**Pseudo-code de l\'algorithme de Rabin-Karp**

Rabin-Karp-Matcher(T, P, d, q)\
1. n ← longueur(T), m ← longueur(P)\
2. h ← d\^(m-1) mod q // h est la puissance de d pour le caractère de poids fort\
3. p ← 0 // Empreinte du motif\
4. t_0 ← 0 // Empreinte de la première sous-chaîne de T\
5.\
6. // Prétraitement\
7. Pour i de 1 à m\
8. p ← (d \* p + P\[i\]) mod q\
9. t_0 ← (d \* t_0 + T\[i\]) mod q\
10.\
11. // Recherche\
12. Pour s de 0 à n - m\
13. Si p == t_s\
14. Si P\[1..m\] == T\[s+1.. s+m\] // Vérification explicite\
15. Le motif apparaît avec le décalage s\
16. Si s \< n - m\
17. t\_{s+1} ← (d \* (t_s - T\[s+1\] \* h) + T\[s+m+1\]) mod q

**Analyse de Complexité**

> **Temps de prétraitement :** Le calcul de l\'empreinte initiale du motif et de la première sous-chaîne du texte prend un temps de O(m).
>
> **Temps de recherche (cas moyen) :** La boucle principale s\'exécute n−m+1 fois. À chaque itération, la mise à jour du hachage et la comparaison des empreintes prennent un temps de O(1). Si le nombre de correspondances valides et de collisions (correspondances \"fallacieuses\") est faible, la vérification caractère par caractère (qui coûte O(m)) est rare. Le temps moyen est donc O(n−m+1)+O(m)=O(n+m).
>
> **Temps de recherche (pire cas) :** Dans le pire des cas, une collision de hachage peut se produire à chaque décalage. Par exemple, si l\'on cherche le motif \"aaa\" dans le texte \"aaaaaaaa\" avec une fonction de hachage qui donne la même valeur pour toutes les sous-chaînes. Dans ce cas, la vérification en O(m) est effectuée à chaque décalage, menant à une complexité de O(nm), la même que l\'algorithme naïf.

L\'avantage principal de Rabin-Karp est sa flexibilité. Le mécanisme de hachage se généralise facilement à la recherche de **multiples motifs** de même longueur en un seul passage. Il suffit de précalculer les empreintes de tous les motifs et de les stocker dans une table de hachage. À chaque décalage, on vérifie si l\'empreinte de la sous-chaîne du texte appartient à cet ensemble.

### 25.6.3 Algorithme de Knuth-Morris-Pratt (KMP)

L\'algorithme KMP atteint une complexité de O(n+m) dans le pire des cas en évitant complètement le retour en arrière dans le texte. L\'idée est d\'utiliser les informations acquises lors d\'une non-concordance pour effectuer un décalage \"intelligent\" du motif. Ce décalage est précalculé en analysant la structure interne du motif lui-même, en particulier ses préfixes qui sont aussi des suffixes.

La Table des Préfixes (Fonction π ou tableau LPS)

Le cœur de l\'algorithme KMP est une table auxiliaire, souvent appelée tableau LPS (Longest Proper Prefix which is also a Suffix) ou fonction de préfixe π. Pour chaque position q dans le motif P, π\[q\] stocke la longueur du plus long préfixe propre de P\[1...q\] qui est également un suffixe de P\[1...q\]. 77

> **Exemple :** Pour le motif P=\"ababaca\"

π=π(\"a\")=0

π=π(\"ab\")=0

π=π(\"aba\")=1 (le préfixe \"a\" est aussi un suffixe)

π=π(\"abab\")=2 (le préfixe \"ab\" est aussi un suffixe)

π=π(\"ababa\")=3 (le préfixe \"aba\" est aussi un suffixe)

π=π(\"ababac\")=0

π=π(\"ababaca\")=1 (le préfixe \"a\" est aussi un suffixe)\
Le tableau π pour \"ababaca\" est donc \$\$.

Construction de la Table des Préfixes

Cette table peut être construite efficacement en temps O(m) en utilisant une approche de programmation dynamique. L\'algorithme se compare lui-même à lui-même pour trouver les correspondances préfixe-suffixe.

Compute-Prefix-Function(P)\
1. m ← longueur(P)\
2. π ← tableau de taille m\
3. π ← 0\
4. k ← 0\
5. Pour q de 2 à m\
6. Tant que k \> 0 et P\[k+1\] ≠ P\[q\]\
7. k ← π\[k\]\
8. Si P\[k+1\] == P\[q\]\
9. k ← k + 1\
10. π\[q\] ← k\
11. Retourner π

Algorithme de Recherche KMP

L\'algorithme de recherche parcourt le texte de gauche à droite avec un pointeur i et le motif avec un pointeur q.

> Si T\[i\]==P\[q+1\], on avance les deux pointeurs.
>
> Si une non-concordance se produit (T\[i\]=P\[q+1\]), au lieu de réinitialiser q à 0 et de faire reculer i, on consulte la table des préfixes. Le nouveau q devient π\[q\]. Cela correspond à décaler le motif vers la droite de manière à ce que le plus long préfixe du motif qui correspondait à un suffixe du texte soit maintenant aligné avec ce suffixe. Le pointeur i dans le texte, lui, **ne recule jamais**.

KMP-Matcher(T, P)\
1. n ← longueur(T), m ← longueur(P)\
2. π ← Compute-Prefix-Function(P)\
3. q ← 0 // Nombre de caractères correspondants\
4. Pour i de 1 à n\
5. Tant que q \> 0 et P\[q+1\] ≠ T\[i\]\
6. q ← π\[q\]\
7. Si P\[q+1\] == T\[i\]\
8. q ← q + 1\
9. Si q == m\
10. Le motif apparaît avec le décalage i - m\
11. q ← π\[q\] // Chercher la prochaine correspondance

**Analyse de Complexité**

> **Temps de prétraitement :** La construction de la table π prend O(m).
>
> **Temps de recherche :** L\'analyse amortie de la boucle Pour (lignes 4-11) montre qu\'elle prend un temps de O(n). Le pointeur i avance toujours. Le pointeur q peut reculer (ligne 6), mais le nombre total de reculs est borné par le nombre total d\'avancées (ligne 8), qui est au plus n. Le nombre total d\'opérations est donc en O(n).
>
> **Complexité totale :** La complexité de l\'algorithme KMP est donc O(n+m), et cette performance est garantie même dans le pire des cas.

KMP représente un saut conceptuel par rapport aux approches précédentes. Là où l\'algorithme naïf et Rabin-Karp effectuent un décalage \"aveugle\" de 1 position, le décalage de KMP est *informatif*. La table des préfixes encode la connaissance de la structure interne du motif, permettant de sauter en toute sécurité un grand nombre de positions inutiles. C\'est cette exploitation de l\'information déjà acquise qui lui confère son efficacité et sa performance garantie.

  ---------------------------- -------------------------- ------------------------------------- --------------------------------------------------------------
  Critère                      Algorithme Naïf            Algorithme de Rabin-Karp              Algorithme de KMP

  **Principe de Base**         Comparaison systématique   Comparaison de hachages               Sauts informés basés sur les préfixes

  **Complexité (Cas Moyen)**   O(nm)                      O(n+m)                                O(n+m)

  **Complexité (Pire Cas)**    O(nm)                      O(nm)                                 O(n+m)

  **Espace Auxiliaire**        O(1)                       O(1) (pour 1 motif)                   O(m)

  **Prétraitement**            Aucun                      O(m)                                  O(m)

  **Avantages**                Simplicité extrême         Idéal pour multiples motifs, simple   Performance garantie, pas de retour en arrière dans le texte

  **Inconvénients**            Très inefficace            Pire cas pathologique, collisions     Plus complexe
  ---------------------------- -------------------------- ------------------------------------- --------------------------------------------------------------

