# Chapitre I.24 : Techniques de Conception et Analyse Algorithmique

## Introduction

L\'algorithmique, au cœur des sciences et du génie informatiques, est bien plus qu\'un simple catalogue de recettes pour résoudre des problèmes. C\'est une discipline rigoureuse, une science de la résolution de problèmes qui allie la créativité de la conception à la précision de l\'analyse mathématique. Dans un monde où les systèmes complexes, des systèmes d\'exploitation qui animent nos appareils à l\'intelligence artificielle qui façonne notre avenir, reposent sur des milliards d\'opérations par seconde, l\'efficacité n\'est pas une option, mais une nécessité fondamentale. Un algorithme élégant mais inefficace est une curiosité théorique; un algorithme efficace est une technologie transformatrice.

Ce chapitre a pour vocation de vous équiper des outils intellectuels nécessaires pour non seulement comprendre et utiliser les algorithmes existants, mais aussi pour concevoir des solutions nouvelles, performantes et robustes à des problèmes inédits. Notre parcours s\'articulera autour de trois piliers essentiels :

> **L\'Analyse Algorithmique (Section 24.1) :** Nous établirons d\'abord le cadre formel et les outils mathématiques pour mesurer, comparer et prédire la performance d\'un algorithme. Nous irons au-delà des simples mesures de temps pour disséquer les concepts de complexité dans le pire des cas et en cas moyen, maîtriser la résolution des équations de récurrence avec le puissant Théorème Maître, et explorer l\'analyse amortie pour comprendre la performance sur des séquences d\'opérations.
>
> **Les Algorithmes de Tri (Section 24.2) :** Armés de ces outils d\'analyse, nous nous lancerons dans une étude de cas exhaustive sur l\'un des problèmes les plus fondamentaux et les mieux étudiés de l\'informatique : le tri. Cette section ne se contentera pas de présenter des algorithmes comme le tri fusion, le tri rapide ou le tri par tas; elle les utilisera comme un laboratoire pour appliquer nos techniques d\'analyse, pour comprendre les compromis entre la vitesse, la mémoire et la stabilité, et pour illustrer la notion de borne inférieure théorique -- la limite de vitesse infranchissable pour toute une classe d\'algorithmes.
>
> **Les Grands Paradigmes de Conception (Section 24.3) :** Enfin, nous aborderons le cœur de la discipline : la conception. Cette section magistrale explore les grandes stratégies de résolution de problèmes qui constituent la \"boîte à outils\" de tout informaticien théoricien et de tout ingénieur logiciel. Nous disséquerons les paradigmes \"Diviser pour Régner\", la \"Programmation Dynamique\", les \"Algorithmes Gloutons\", ainsi que les techniques d\'exploration de l\'espace des solutions comme le \"Retour sur Trace\" et la \"Séparation et Évaluation\".

Notre approche tout au long de ce chapitre sera résolument méthodologique. Pour chaque concept, chaque algorithme et chaque paradigme, nous ne nous contenterons pas d\'expliquer le \"comment\", mais nous nous attarderons sur le \"quand\" et le \"pourquoi\". Quand reconnaître qu\'un problème se prête à une solution gloutonne? Pourquoi la programmation dynamique est-elle la clé pour une certaine classe de problèmes d\'optimisation? En cultivant cette intuition, vous développerez une maîtrise profonde de l\'art et de la science de l\'algorithmique, vous transformant d\'un simple utilisateur d\'algorithmes en un véritable architecte de solutions efficaces et élégantes.

## 24.1 Analyse Algorithmique

Avant de pouvoir concevoir des algorithmes efficaces, il est impératif de disposer d\'un langage et d\'un cadre formel pour définir ce que \"efficace\" signifie. L\'analyse algorithmique nous fournit précisément cela : une méthode rigoureuse pour quantifier les ressources (principalement le temps de calcul et l\'espace mémoire) qu\'un algorithme consomme en fonction de la taille de ses données d\'entrée. Cette analyse se veut abstraite et mathématique, nous libérant des contingences d\'une machine ou d\'un langage de programmation particulier, pour nous permettre de comparer l\'essence même des différentes approches de résolution.

### 24.1.1 La Mesure de l\'Efficacité : Pire Cas, Cas Moyen et Meilleur Cas

La première étape pour analyser un algorithme est de s\'affranchir des détails d\'implémentation et de l\'environnement matériel. Le temps d\'exécution d\'un programme peut varier drastiquement en fonction du processeur, de la mémoire, du système d\'exploitation ou du compilateur utilisé. Une étude purement expérimentale, bien qu\'utile, ne permet pas d\'établir des vérités générales sur l\'efficacité intrinsèque d\'une méthode.

Pour atteindre cette généralité, nous adoptons une approche théorique. Nous décrivons les algorithmes en pseudo-code, un langage structuré qui capture la logique sans se lier à une syntaxe spécifique. Ensuite, nous mesurons la complexité en comptant le nombre d\'**opérations primitives** -- des instructions de bas niveau comme les affectations, les comparaisons ou les opérations arithmétiques -- que l\'algorithme exécute. Le temps d\'exécution est alors modélisé comme une fonction, notée

T(n), où n est la **taille de l\'entrée** (par exemple, le nombre d\'éléments dans un tableau, le nombre de nœuds dans un graphe).

#### Notations Asymptotiques : Le Langage de la Croissance

Même le nombre exact d\'opérations primitives (par exemple, T(n)=5n2+17n+3) contient des détails qui sont souvent superflus pour comprendre le comportement de l\'algorithme sur de grandes entrées. Ce qui nous intéresse véritablement, c\'est le **taux de croissance** de la fonction T(n) lorsque n devient grand. Les notations asymptotiques, ou notations de Landau, nous fournissent le langage mathématique pour exprimer cet ordre de grandeur.

> Notation Grand-O (O) : Borne Supérieure Asymptotique\
> On dit que f(n) est en O(g(n)) si f(n) ne croît pas plus vite que g(n), à un facteur constant près. Formellement, f(n)=O(g(n)) s\'il existe des constantes positives c et n0​ telles que 0≤f(n)≤c⋅g(n) pour tout n≥n0​.1 C\'est la notation la plus couramment utilisée pour exprimer la complexité dans le pire des cas, car elle donne une garantie : l\'algorithme ne sera jamais \"pire\" que cela.
>
> Notation Grand-Omega (Ω) : Borne Inférieure Asymptotique\
> On dit que f(n) est en Ω(g(n)) si f(n) croît au moins aussi vite que g(n). Formellement, f(n)=Ω(g(n)) s\'il existe des constantes positives c et n0​ telles que 0≤c⋅g(n)≤f(n) pour tout n≥n0​.4 Cette notation est utilisée pour établir des limites théoriques sur la complexité d\'un\
> *problème*, comme nous le verrons pour le tri.
>
> Notation Grand-Thêta (Θ) : Borne Asymptotique Étanche\
> On dit que f(n) est en Θ(g(n)) si f(n) croît au même rythme que g(n). Formellement, f(n)=Θ(g(n)) si f(n)=O(g(n)) et f(n)=Ω(g(n)).4 Cette notation fournit la description la plus précise du comportement asymptotique d\'un algorithme.

En pratique, l\'utilisation de ces notations nous permet de simplifier l\'analyse en ignorant les termes d\'ordre inférieur et les constantes multiplicatives. Par exemple, une fonction de coût T(n)=7n2−3n+10 est en Θ(n2).

#### Définition des Cas d\'Analyse

Le temps d\'exécution d\'un algorithme ne dépend pas seulement de la taille de l\'entrée n, mais aussi de la structure même de cette entrée. Un algorithme de tri peut être très rapide sur un tableau déjà presque trié, et très lent sur un tableau trié en ordre inverse. Pour capturer cette variabilité, nous distinguons trois types d\'analyse.

> Analyse dans le Pire des Cas (Worst-Case Analysis)\
> La complexité dans le pire des cas d\'un algorithme est une fonction Tpire​(n) qui représente la borne supérieure du temps d\'exécution sur toutes les entrées possibles de taille n.5 C\'est le maximum des coûts sur toutes les instances de taille\
> n.

**Exemple : Recherche Linéaire.** Dans un tableau de n éléments, le pire cas pour la recherche d\'un élément x se produit lorsque x n\'est pas dans le tableau (ou se trouve à la dernière position). L\'algorithme doit alors effectuer n comparaisons. La complexité dans le pire des cas est donc Θ(n).

**Pertinence.** C\'est l\'analyse la plus importante et la plus utilisée en pratique. Sa prédominance s\'explique par la\
**garantie** qu\'elle fournit. Pour des applications critiques où la latence ou l\'échec ont des conséquences graves (systèmes de contrôle aérien, logiciels chirurgicaux, gestion de réseaux), connaître la performance maximale garantie est non négociable. Le choix de l\'analyse dans le pire des cas est donc fondamentalement une décision de gestion des risques, dictée par le domaine d\'application. Il s\'agit d\'un arbitrage entre une garantie de performance absolue et une performance attendue.

> Analyse en Cas Moyen (Average-Case Analysis)\
> La complexité en cas moyen, Tmoyen​(n), est l\'espérance mathématique du temps d\'exécution sur toutes les entrées possibles de taille n.3 Pour la calculer, il est indispensable de faire une hypothèse sur la\
> **distribution de probabilité** des entrées. Le plus souvent, on suppose une distribution uniforme, où toutes les entrées de taille n sont équiprobables.

**Exemple : Recherche Linéaire.** En supposant que l\'élément x a une probabilité égale d\'être à n\'importe quelle position i∈\[1,n\] et une probabilité égale de ne pas être présent, le nombre moyen de comparaisons est de l\'ordre de n/2. La complexité en cas moyen reste donc Θ(n).

**Pertinence.** L\'analyse en cas moyen est souvent plus représentative de la performance réelle d\'un algorithme, surtout lorsque le pire cas est un événement pathologique et rare. C\'est notamment le cas pour l\'algorithme de tri rapide, qui a une complexité en cas moyen de Θ(nlogn) mais un pire cas en Θ(n2). Cependant, cette analyse présente une difficulté majeure : la distribution de probabilité des entrées \"réelles\" est souvent inconnue ou très difficile à modéliser, ce qui rend l\'analyse complexe et ses résultats potentiellement non pertinents si l\'hypothèse de distribution est fausse.

> Analyse dans le Meilleur des Cas (Best-Case Analysis)\
> La complexité dans le meilleur des cas, Tmeilleur​(n), est la borne inférieure du temps d\'exécution sur toutes les entrées de taille n.3

**Exemple : Recherche Linéaire.** Le meilleur cas se produit lorsque l\'élément recherché se trouve à la première position du tableau. Une seule comparaison est nécessaire. La complexité dans le meilleur des cas est donc Θ(1).

**Pertinence.** Cette analyse est rarement utilisée car elle est souvent considérée comme trompeuse (\"bogus\"). Une garantie sur le fait qu\'un algorithme peut être très rapide dans une situation idéale ne donne que peu d\'informations sur sa performance générale. Un algorithme peut avoir un excellent meilleur cas mais un pire cas catastrophique, le rendant inutilisable en pratique.

La prédominance de l\'analyse dans le pire des cas a eu un effet structurant sur la conception même des algorithmes. Parce que la performance dans le pire des cas est devenue la référence standard, une part considérable de la recherche en algorithmique est dédiée soit à la conception d\'algorithmes avec d\'excellentes garanties dans le pire des cas (comme le tri fusion ou le tri par tas), soit au développement de stratégies pour atténuer les pires cas connus d\'algorithmes autrement performants (comme l\'utilisation de pivots aléatoires dans le tri rapide). L\'existence d\'algorithmes comme Introsort, un hybride qui utilise le tri rapide en général mais bascule vers le tri par tas pour éviter le comportement quadratique, est une conséquence directe de cette focalisation. La méthode d\'analyse elle-même oriente donc la direction de l\'innovation algorithmique.

### 24.1.2 Résolution des Récurrences : Le Théorème Maître (Master Theorem)

De nombreux algorithmes, en particulier ceux qui suivent le paradigme \"Diviser pour Régner\", sont de nature récursive. Leur complexité temporelle se modélise naturellement par des **relations de récurrence**. Une relation de récurrence définit une fonction en termes de ses propres valeurs sur des entrées plus petites. Pour les algorithmes \"Diviser pour Régner\", cette relation prend souvent une forme très spécifique.

Considérons un algorithme qui résout un problème de taille n en le décomposant en a sous-problèmes, chacun de taille n/b, puis en combinant les résultats. Si le coût de la division du problème et de la combinaison des solutions des sous-problèmes est donné par une fonction f(n), alors la complexité totale T(n) de l\'algorithme est décrite par la récurrence :

T(n)=aT(n/b)+f(n)

où a≥1 est le nombre de sous-problèmes, b\>1 est le facteur de réduction de la taille, et f(n) est le coût du travail non récursif.

Résoudre de telles récurrences par substitution itérative peut être fastidieux. Le **Théorème Maître** (ou *Master Theorem*) fournit une méthode \"clé en main\" pour trouver la solution asymptotique de nombreuses récurrences de cette forme.

#### Énoncé du Théorème Maître

Soit T(n) une fonction définie pour les entiers positifs par la récurrence T(n)=aT(n/b)+f(n), où a≥1 et b\>1 sont des constantes et f(n) est une fonction asymptotiquement positive. La complexité T(n) peut être bornée asymptotiquement comme suit :

> Si f(n)=O(nlogb​a−ϵ) pour une constante ϵ\>0, alors T(n)=Θ(nlogb​a).
>
> Si f(n)=Θ(nlogb​a), alors T(n)=Θ(nlogb​alogn).
>
> Si f(n)=Ω(nlogb​a+ϵ) pour une constante ϵ\>0, et si af(n/b)≤cf(n) pour une constante c\<1 et pour tout n suffisamment grand (cette condition est appelée la **condition de régularité**), alors T(n)=Θ(f(n)).

#### Interprétation et Analyse des Trois Cas

Le Théorème Maître offre une vision puissante du \"centre de gravité\" du travail de calcul au sein d\'un algorithme \"Diviser pour Régner\". Il répond à la question : \"Où la majeure partie du travail est-elle effectuée?\". La comparaison centrale du théorème se fait entre le coût du travail à la racine, f(n), et la quantité nlogb​a. Ce terme critique peut être interprété comme étant proportionnel au nombre de feuilles dans l\'arbre de récursion, qui est une mesure du travail total effectué dans les cas de base de la récursion.

**Cas 1 : Le travail est dominé par les feuilles**

Dans ce cas, la fonction f(n) est polynomialement plus petite que nlogb​a. Cela signifie que le coût de la division et de la combinaison à chaque étape est relativement faible par rapport à la prolifération des appels récursifs. Le \"poids\" du calcul se concentre dans les niveaux inférieurs de l\'arbre de récursion, au niveau des feuilles. Le coût total est donc dominé par le nombre de feuilles, qui est Θ(nlogb​a). L\'algorithme est dit \"leaf-heavy\".

> Exemple : Multiplication de matrices de Strassen\
> L\'algorithme de Strassen multiplie deux matrices n×n en effectuant 7 multiplications récursives sur des matrices de taille n/2×n/2 et un nombre constant d\'additions et de soustractions de matrices, qui coûtent Θ(n2). La récurrence est :\
> \
> T(n)=7T(n/2)+Θ(n2)\
> \
> Ici, a=7, b=2, et f(n)=Θ(n2). Nous calculons nlogb​a=nlog2​7≈n2.81.\
> Puisque f(n)=Θ(n2)=O(nlog2​7−ϵ) avec ϵ≈0.81\>0, nous sommes dans le Cas 1.\
> La complexité est donc T(n)=Θ(nlog2​7).18

**Cas 2 : Le travail est équilibré sur tous les niveaux**

Dans ce cas, le coût du travail non récursif, f(n), est du même ordre de grandeur que nlogb​a. Cela signifie que la quantité de travail effectuée à chaque niveau de l\'arbre de récursion est approximativement la même. Le coût total est alors le coût d\'un niveau (Θ(nlogb​a)) multiplié par le nombre de niveaux, qui est Θ(logn). L\'algorithme est \"équilibré\".

> Exemple : Tri Fusion\
> Le tri fusion divise un tableau de taille n en deux sous-tableaux de taille n/2, les trie récursivement, puis les fusionne en temps Θ(n). La récurrence est :\
> \
> T(n)=2T(n/2)+Θ(n)\
> \
> Ici, a=2, b=2, et f(n)=Θ(n). Nous calculons nlogb​a=nlog2​2=n1=n.\
> Puisque f(n)=Θ(n), nous sommes dans le Cas 2.\
> La complexité est donc T(n)=Θ(nlogn).18
>
> Exemple : Recherche Binaire\
> La recherche binaire sur un tableau trié effectue une comparaison (O(1)) puis se rappelle sur un sous-problème de taille n/2. La récurrence est :\
> \
> T(n)=T(n/2)+Θ(1)\
> \
> Ici, a=1, b=2, et f(n)=Θ(1). Nous calculons nlogb​a=nlog2​1=n0=1.\
> Puisque f(n)=Θ(1), nous sommes dans le Cas 2 (avec k=0 dans la forme généralisée f(n)=Θ(nlogb​alogkn)).\
> La complexité est donc T(n)=Θ(n0logn)=Θ(logn).20

**Cas 3 : Le travail est dominé par la racine**

Dans ce cas, la fonction f(n) est polynomialement plus grande que nlogb​a. Le coût de la division et de la combinaison est si élevé qu\'il domine le coût de tous les appels récursifs combinés. Le \"poids\" du calcul se situe au sommet de l\'arbre de récursion. Le coût total est donc simplement le coût du travail à la racine, Θ(f(n)). L\'algorithme est \"root-heavy\".

La **condition de régularité** (af(n/b)≤cf(n) pour c\<1) est cruciale ici. Elle n\'est pas une simple technicité, mais une garantie que le coût diminue suffisamment rapidement à chaque niveau de récursion. Elle assure que le coût total des nœuds enfants (af(n/b)) est bien une fraction du coût du nœud parent (f(n)). Cela forme une série géométrique décroissante des coûts par niveau, dont la somme est dominée par le premier terme, f(n). Si cette condition n\'est pas remplie, le coût pourrait osciller de manière pathologique, et le coût à la racine ne serait plus une borne fiable pour le coût total.

> Exemple : Algorithme hypothétique\
> Considérons la récurrence :\
> \
> T(n)=3T(n/2)+n2\
> \
> Ici, a=3, b=2, et f(n)=n2. Nous calculons nlogb​a=nlog2​3≈n1.585.\
> Puisque f(n)=n2=Ω(nlog2​3+ϵ) avec ϵ≈0.415\>0, nous vérifions la condition de régularité :\
> af(n/b)=3⋅(n/2)2=3⋅n2/4=(3/4)n2.\
> Nous devons avoir 3/4n2≤cn2 pour un c\<1. En choisissant c=3/4, la condition est satisfaite.\
> Nous sommes donc dans le Cas 3, et la complexité est T(n)=Θ(f(n))=Θ(n2).22

#### Limites du Théorème

Le Théorème Maître est un outil puissant, mais il ne résout pas toutes les récurrences. Il ne s\'applique pas si  :

> a n\'est pas une constante (le nombre de sous-problèmes varie).
>
> f(n) n\'est pas polynomialement comparable à nlogb​a (par exemple, si f(n) contient un logarithme comme dans T(n)=2T(n/2)+n/logn).
>
> La condition de régularité du Cas 3 n\'est pas satisfaite.

Dans ces cas, d\'autres méthodes comme la méthode de substitution ou des théorèmes plus généraux (comme le théorème d\'Akra-Bazzi) sont nécessaires.

### 24.1.3 Au-delà de l\'Opération Unique : L\'Analyse Amortie

L\'analyse dans le pire des cas d\'une seule opération peut parfois donner une vision excessivement pessimiste de la performance d\'un algorithme, en particulier lorsqu\'il est appliqué à une structure de données sur une longue séquence d\'opérations. Certaines opérations peuvent être très coûteuses, mais si elles sont rares et que la majorité des opérations sont très rapides, le coût moyen par opération sur la séquence entière peut être très faible.

L\'**analyse amortie** est une technique qui formalise cette intuition. Elle fournit une borne supérieure sur le coût *moyen* par opération, calculée sur une séquence d\'opérations dans le pire des cas. Il est crucial de la distinguer de l\'analyse en cas moyen : l\'analyse amortie ne fait aucune hypothèse probabiliste sur les données d\'entrée ; elle fournit une

**garantie** sur la performance moyenne dans le pire scénario d\'opérations.

#### L\'Exemple Canonique : Le Tableau Dynamique

Un tableau dynamique (connu sous le nom de vector en C++ ou ArrayList en Java) est une structure de données qui se comporte comme un tableau mais peut grandir dynamiquement. L\'opération d\'ajout d\'un élément (push) est généralement très rapide : si le tableau sous-jacent a de l\'espace libre, l\'opération prend un temps constant, O(1). Cependant, lorsque le tableau est plein, il faut allouer un nouveau tableau plus grand (généralement de taille double), y copier tous les anciens éléments, puis ajouter le nouvel élément. Cette opération de redimensionnement est coûteuse et prend un temps proportionnel à la taille actuelle du tableau, soit O(n).

Une analyse naïve du pire des cas conclurait que l\'opération push a une complexité de O(n), ce qui est vrai mais peu informatif sur la performance globale. L\'analyse amortie nous permet de montrer que le coût de push est en fait de O(1) amorti.

L\'analyse amortie n\'est pas seulement un outil d\'analyse, mais aussi un puissant outil de **conception**. L\'analyse du tableau dynamique révèle un principe de conception essentiel : c\'est l\'**expansion géométrique** (doubler la taille) qui permet d\'obtenir un coût amorti constant. Si l\'on choisissait une stratégie d\'expansion linéaire (par exemple, ajouter 10 cases à chaque fois), le coût amorti ne serait pas constant. En effet, pour n insertions, il y aurait environ n/10 réallocations. La i-ème réallocation coûterait O(10i). Le coût total des réallocations serait de l\'ordre de ∑i=1n/10​10i=O(n2), conduisant à un coût amorti de O(n). La stratégie de doublement, en revanche, assure que le coût total reste en O(n), et donc le coût amorti en O(1).

Il existe trois méthodes principales pour mener une analyse amortie. Ce sont en réalité trois analogies pédagogiques pour la même structure de preuve mathématique, dont le but est de montrer que la somme des coûts amortis sur une séquence est une borne supérieure de la somme des coûts réels : ∑couˆt_amorti≥∑couˆt_reˊel.

#### Méthode de l\'Agrégat

Cette méthode est la plus directe. Elle consiste à calculer une borne supérieure T(n) sur le coût total d\'une séquence de n opérations dans le pire des cas. Le coût amorti par opération est alors simplement T(n)/n.

> Application au tableau dynamique :\
> Considérons une séquence de n opérations push sur un tableau initialement vide. Supposons que la taille du tableau double à chaque fois qu\'il est plein. Les redimensionnements ont lieu lorsque le nombre d\'éléments est une puissance de 2, soit pour les tailles 1,2,4,8,...,2k où 2k\<n.\
> Le coût de la i-ème opération, ci​, est :

ci​=i si i−1 est une puissance de 2 (coût de copie de i−1 éléments + 1 pour l\'insertion).

ci​=1 sinon.\
Le coût total T(n) pour n insertions est la somme des coûts de toutes les insertions. Les insertions \"simples\" coûtent 1 chacune. Les redimensionnements coûtent 1,2,4,...,2k où 2k est la plus grande puissance de 2 inférieure à n.\
\
T(n)=i=1∑n​ci​=n+j=0∑⌊log2​(n−1)⌋​2j\
\
La somme de la série géométrique est ∑j=0k​2j=2k+1−1\<2⋅2k\<2n.\
Le coût total est donc T(n)\<n+2n=3n.\
Le coût total est en O(n). Le coût amorti par opération est donc O(n)/n=O(1).27

#### Méthode Comptable

Cette méthode utilise une analogie financière. On surtaxe certaines opérations peu coûteuses pour accumuler un \"crédit\" ou un \"acompte\". Ce crédit est ensuite utilisé pour payer les opérations qui sont réellement coûteuses, dont le coût réel dépasse leur coût amorti assigné. L\'objectif est de s\'assurer que le crédit total sur la structure de données ne devient jamais négatif.

> Application au tableau dynamique :\
> Nous assignons un coût amorti de 3 \"pièces\" à chaque opération push.

**Quand on insère un élément sans redimensionnement :** Le coût réel est de 1 pièce. On utilise 1 pièce pour payer l\'opération et on stocke les 2 pièces restantes comme crédit \"sur\" le nouvel élément inséré.

**Quand on insère un élément avec redimensionnement :** Supposons que le tableau a m éléments et est plein. Nous devons insérer le (m+1)-ème élément.

Le coût réel est de m+1 : m pour copier les anciens éléments et 1 pour insérer le nouveau.

Le coût amorti de cette opération est de 3.

Pour payer le coût réel de m+1, nous avons besoin de m−2 pièces supplémentaires. D\'où vient ce crédit? Depuis le dernier redimensionnement (ou depuis le début), au moins m/2 éléments ont été ajoutés sans causer de redimensionnement. Chacun de ces éléments a déposé 2 pièces de crédit. Nous avons donc au moins (m/2)×2=m pièces de crédit disponibles.

Ce crédit de m est plus que suffisant pour payer les m−2 pièces nécessaires.\
Le \"compte en banque\" de la structure ne devient jamais négatif, et le coût amorti de chaque opération est constant, O(1).27

#### Méthode du Potentiel

Cette méthode formalise l\'approche comptable en utilisant le concept d\'énergie potentielle de la physique. On définit une **fonction de potentiel**, Φ, qui associe un nombre réel non négatif à chaque état Di​ de la structure de données. Le potentiel représente le crédit prépayé.

Le coût amorti ci​\^​ de la i-ème opération est défini comme :

ci​\^​=ci​+Φ(Di​)−Φ(Di−1​)

où ci​ est le coût réel de l\'opération, Di−1​ est l\'état avant l\'opération, et Di​ est l\'état après. Φ(Di​)−Φ(Di−1​) est la variation de potentiel.

Le coût total amorti pour n opérations est ∑i=1n​ci​\^​=∑i=1n​(ci​+Φ(Di​)−Φ(Di−1​))=(∑i=1n​ci​)+Φ(Dn​)−Φ(D0​).

Si nous nous assurons que Φ(Dn​)≥Φ(D0​) (généralement en choisissant Φ(D0​)=0 et Φ(Di​)≥0 pour tout i), alors le coût total amorti est une borne supérieure du coût total réel.28

> Application au tableau dynamique :\
> Soit size le nombre d\'éléments et capacity la taille du tableau sous-jacent. Nous définissons la fonction de potentiel :\
> \
> Φ(D)=2⋅size−capacity\
> \
> Nous supposons que le tableau est initialement vide (size=0, capacity=0), donc Φ(D0​)=0. Comme on double la capacité quand size \> capacity, on a toujours capacity ≥ size, et après un redimensionnement, capacity = 2×(size−1), ce qui garantit capacity ≤2× size. Donc 0≤Φ(D)≤size. Le potentiel est toujours non négatif.\
> Analysons le coût amorti d\'une opération push :

Cas 1 : Pas de redimensionnement.\
Le coût réel est ci​=1.\
size devient size+1, capacity ne change pas.\
ΔΦ=Φ(Di​)−Φ(Di−1​)=(2(size+1)−capacity)−(2size−capacity)=2.\
Coût amorti ci​\^​=ci​+ΔΦ=1+2=3.

Cas 2 : Redimensionnement.\
Supposons que le tableau passe de size=m et capacity=m à size=m+1 et capacity=2m.\
Le coût réel est ci​=m+1 (copie de m éléments + insertion).\
ΔΦ=Φ(Di​)−Φ(Di−1​)=(2(m+1)−2m)−(2m−m)=(2)−(m).\
Coût amorti ci​\^​=ci​+ΔΦ=(m+1)+(2−m)=3.

Dans les deux cas, le coût amorti est constant, ci​\^​=3. L\'analyse par potentiel confirme que l\'opération push a une complexité amortie de O(1).

## 24.2 Algorithmes de Tri : Une Étude de Cas Fondamentale

Le tri est sans doute le problème le plus fondamental en algorithmique. Il consiste à réarranger une collection d\'éléments selon un ordre défini. Au-delà de son utilité pratique évidente, il sert de terrain d\'expérimentation idéal pour appliquer les concepts d\'analyse, illustrer les compromis de conception et comprendre les limites théoriques de l\'informatique. Cette section utilise le tri comme une lentille à travers laquelle nous pouvons examiner en profondeur les notions de performance et d\'optimalité.

### Borne Inférieure pour les Tris par Comparaison

La plupart des algorithmes de tri intuitifs (tri à bulles, tri par sélection, tri rapide, etc.) fonctionnent en comparant des paires d\'éléments pour déterminer leur ordre relatif. Ces algorithmes forment une vaste classe appelée **tris par comparaison**. Une question fondamentale se pose : existe-t-il une limite à la vitesse à laquelle un algorithme de cette classe peut trier? La réponse est oui, et cette limite est de Ω(nlogn).

Pour prouver cette borne inférieure, nous utilisons un modèle abstrait appelé l\'**arbre de décision**. Un arbre de décision modélise l\'exécution d\'un algorithme de tri par comparaison pour une taille d\'entrée

n donnée.

> Chaque **nœud interne** de l\'arbre représente une comparaison entre deux éléments (par exemple, \"est-ce que A\[i\]\<A\[j\]?\").
>
> Chaque **branche** partant d\'un nœud correspond à l\'un des deux résultats possibles de la comparaison (vrai ou faux).
>
> Chaque **feuille** de l\'arbre correspond à une permutation unique des éléments d\'entrée, qui est le résultat du tri.

Un algorithme de tri par comparaison doit être capable de produire la permutation correcte pour n\'importe quelle des n! permutations initiales possibles des n éléments distincts. Par conséquent, l\'arbre de décision associé doit avoir au moins

n! feuilles.

La preuve formelle se déroule comme suit :

> **Nombre de feuilles :** L\'arbre doit avoir au moins L=n! feuilles pour distinguer toutes les permutations possibles.
>
> **Hauteur de l\'arbre :** Un arbre binaire de hauteur h peut avoir au plus 2h feuilles. La hauteur h de l\'arbre correspond au nombre maximal de comparaisons effectuées par l\'algorithme dans le pire des cas.
>
> **Relation :** Nous avons donc l\'inégalité 2h≥L=n!.
>
> **Logarithme :** En prenant le logarithme en base 2 des deux côtés, nous obtenons h≥log2​(n!).
>
> **Approximation de Stirling :** La formule de Stirling nous donne une approximation pour n!, qui implique que log2​(n!)=Θ(nlog2​n). Une manière plus simple de voir cela est que\
> log(n!)=∑i=1n​log(i). Cette somme peut être bornée par des intégrales, ou plus simplement, on peut remarquer que pour la moitié des termes (i de n/2 à n), log(i)≥log(n/2). La somme est donc au moins (n/2)log(n/2)=(n/2)(logn−1), ce qui est en Ω(nlogn).
>
> **Conclusion :** Puisque la complexité dans le pire des cas est au moins la hauteur de l\'arbre, h, nous concluons que tout algorithme de tri par comparaison doit effectuer au moins Ω(nlogn) comparaisons dans le pire des cas.

Cette borne de Ω(nlogn) n\'est pas une simple curiosité mathématique ; elle représente une limite fondamentale sur la quantité d\'**information** qui doit être acquise pour résoudre le problème du tri. Il y a n! ordres initiaux possibles pour les données. La tâche de l\'algorithme est d\'identifier laquelle de ces n! permutations est la bonne. Chaque comparaison binaire (par exemple, a\<b) fournit au maximum 1 bit d\'information. Pour distinguer

n! possibilités, la théorie de l\'information nous dit qu\'il faut au moins log2​(n!) bits d\'information. Comme log2​(n!)≈nlog2​n, et que chaque comparaison ne fournit qu\'un bit, il faut au minimum ≈nlog2​n comparaisons. Cette perspective relie la complexité algorithmique directement à la théorie de l\'information de Shannon et offre une raison plus profonde à l\'existence de cette borne inférieure.

### Tris par Comparaison Optimaux

Un algorithme de tri par comparaison est dit **asymptotiquement optimal** si sa complexité dans le pire des cas ou en cas moyen est en Θ(nlogn), atteignant ainsi la borne inférieure théorique. Nous allons maintenant analyser en détail trois algorithmes canoniques qui atteignent cette optimalité : le tri fusion, le tri rapide et le tri par tas.

Le choix entre ces trois algorithmes est un exemple classique de compromis en génie logiciel, un arbitrage entre les garanties de performance, l\'utilisation de la mémoire et la vitesse en pratique. Il n\'existe pas d\'algorithme \"meilleur\" dans l\'absolu ; le choix optimal est toujours dépendant du contexte. Le tri rapide est souvent le choix par défaut en raison de son excellente performance en moyenne et de sa nature \"en place\" qui favorise la localité du cache. Cependant, son pire cas en

O(n2) est un risque. Le tri fusion offre une garantie de

Θ(nlogn) dans tous les cas, le rendant idéal pour les applications critiques ou le tri externe, mais son besoin d\'espace mémoire en O(n) est un coût significatif. Le tri par tas, en théorie, offre le meilleur des deux mondes : il est en place et a une complexité garantie de

O(nlogn) dans le pire des cas. En pratique, cependant, ses constantes sont souvent plus grandes que celles du tri rapide en raison d\'une mauvaise localité du cache. Cette situation a mené au développement d\'algorithmes hybrides comme l\'

**Introsort**, qui commence avec un tri rapide et bascule vers un tri par tas si la profondeur de la récursion devient trop grande, obtenant ainsi la vitesse moyenne du tri rapide avec la protection du pire cas du tri par tas.

#### Tri Fusion (Merge Sort)

> **Principe :** Le tri fusion est l\'incarnation du paradigme \"Diviser pour Régner\". Il divise récursivement le tableau en deux moitiés jusqu\'à obtenir des tableaux d\'un seul élément (qui sont trivialement triés). Ensuite, il fusionne progressivement les sous-tableaux triés pour reconstruire un tableau entièrement trié. La complexité de l\'algorithme réside dans l\'étape de fusion.
>
> **Pseudo-code :**\
> FONCTION TriFusion(T, debut, fin)\
> SI debut \< fin ALORS\
> milieu = Plancher((debut + fin) / 2)\
> TriFusion(T, debut, milieu)\
> TriFusion(T, milieu + 1, fin)\
> Fusionner(T, debut, milieu, fin)\
> FIN SI\
> FIN FONCTION\
> \
> FONCTION Fusionner(T, debut, milieu, fin)\
> // Créer des tableaux temporaires G et D\
> n1 = milieu - debut + 1\
> n2 = fin - milieu\
> G\[1..n1\], D\[1..n2\]\
> \
> // Copier les données dans les tableaux temporaires\
> POUR i DE 1 A n1\
> G\[i\] = T\[debut + i - 1\]\
> FIN POUR\
> POUR j DE 1 A n2\
> D\[j\] = T\[milieu + j\]\
> FIN POUR\
> \
> // Fusionner les tableaux temporaires dans T\
> i = 1, j = 1, k = debut\
> TANT QUE i \<= n1 ET j \<= n2\
> SI G\[i\] \<= D\[j\] ALORS\
> T\[k\] = G\[i\]\
> i = i + 1\
> SINON\
> T\[k\] = D\[j\]\
> j = j + 1\
> FIN SI\
> k = k + 1\
> FIN TANT QUE\
> \
> // Copier les éléments restants de G, s\'il y en a\
> TANT QUE i \<= n1\
> T\[k\] = G\[i\]\
> i = i + 1\
> k = k + 1\
> FIN TANT QUE\
> \
> // Copier les éléments restants de D, s\'il y en a\
> TANT QUE j \<= n2\
> T\[k\] = D\[j\]\
> j = j + 1\
> k = k + 1\
> FIN TANT QUE\
> FIN FONCTION
>
> **Analyse de Complexité :**

**Temporelle :** L\'étape de fusion de n éléments prend un temps Θ(n). L\'algorithme effectue deux appels récursifs sur des problèmes de taille n/2. La relation de récurrence est donc T(n)=2T(n/2)+Θ(n). D\'après le Cas 2 du Théorème Maître, la solution est T(n)=Θ(nlogn). Cette complexité est la même dans le meilleur, le moyen et le pire des cas, ce qui rend le tri fusion très prévisible.

**Spatiale :** L\'algorithme n\'est pas \"en place\" car la procédure Fusionner nécessite un espace de stockage auxiliaire de taille Θ(n) pour les tableaux temporaires G et D.

> **Propriétés :**

**Stabilité :** Le tri fusion est un algorithme **stable**. Lors de la fusion, si deux éléments sont égaux, l\'algorithme standard (comme celui présenté ci-dessus) placera l\'élément du tableau de gauche (G) en premier, préservant ainsi l\'ordre relatif initial.

#### Tri Rapide (Quicksort)

> **Principe :** Le tri rapide est également un algorithme \"Diviser pour Régner\", mais son travail se concentre sur l\'étape de \"Diviser\". Il choisit un élément du tableau appelé **pivot**. Il partitionne ensuite le tableau de sorte que tous les éléments plus petits que le pivot se retrouvent avant lui, et tous les éléments plus grands se retrouvent après. Le pivot est alors à sa place définitive. L\'algorithme est ensuite appelé récursivement sur les deux sous-tableaux de part et d\'autre du pivot.
>
> **Pseudo-code (avec partition de Lomuto) :**\
> FONCTION TriRapide(T, debut, fin)\
> SI debut \< fin ALORS\
> p = Partitionner(T, debut, fin)\
> TriRapide(T, debut, p - 1)\
> TriRapide(T, p + 1, fin)\
> FIN SI\
> FIN FONCTION\
> \
> FONCTION Partitionner(T, debut, fin)\
> pivot = T\[fin\]\
> i = debut - 1\
> POUR j DE debut A fin - 1\
> SI T\[j\] \<= pivot ALORS\
> i = i + 1\
> Echanger(T\[i\], T\[j\])\
> FIN SI\
> FIN POUR\
> Echanger(T\[i + 1\], T\[fin\])\
> RETOURNER i + 1\
> FIN FONCTION
>
> **Analyse de Complexité :**

**Temporelle :** La performance du tri rapide dépend entièrement du choix du pivot, qui détermine l\'équilibre des partitions.

**Meilleur et Cas Moyen :** Si le pivot divise le tableau en deux moitiés à peu près égales, la récurrence est T(n)=2T(n/2)+Θ(n) (le Θ(n) venant de la partition), ce qui donne T(n)=Θ(nlogn). Un choix de pivot aléatoire ou la médiane de trois éléments rend ce cas très probable en pratique.

**Pire Cas :** Si le pivot est systématiquement le plus petit ou le plus grand élément (par exemple, si le tableau est déjà trié et que l\'on choisit le dernier élément comme pivot), la partition est déséquilibrée, créant un sous-problème de taille n−1 et un de taille 0. La récurrence devient T(n)=T(n−1)+Θ(n), ce qui se résout en T(n)=Θ(n2).

**Spatiale :** Le tri rapide est considéré comme un tri **en place**, car le partitionnement se fait par des échanges au sein du tableau original. Cependant, il nécessite un espace sur la pile d\'appels pour la récursion. Dans le cas moyen (partitions équilibrées), la profondeur de la récursion est de Θ(logn). Dans le pire des cas, elle est de Θ(n).

> **Propriétés :**

**Stabilité :** Le tri rapide est **non stable**. Les échanges d\'éléments distants lors du partitionnement peuvent modifier l\'ordre relatif des éléments égaux.

#### Tri par Tas (Heapsort)

> **Principe :** Le tri par tas utilise une structure de données astucieuse appelée un **tas binaire**, qui est un arbre binaire presque complet où chaque nœud parent est plus grand (ou égal) à ses enfants (dans un **tas-max**). Un tas peut être stocké efficacement dans un tableau. L\'algorithme se déroule en deux phases :

**Construction du tas :** Le tableau non trié est transformé en un tas-max.

**Extractions successives :** L\'élément le plus grand se trouve à la racine du tas (le premier élément du tableau). On l\'échange avec le dernier élément du tableau, on réduit la taille considérée du tas de 1, et on \"répare\" le tas en faisant descendre la nouvelle racine à sa place (opération heapify ou tamisage). On répète ce processus jusqu\'à ce que le tas soit vide. Le tableau est alors trié.

> **Pseudo-code :**\
> FONCTION TriParTas(T)\
> n = longueur(T)\
> ConstruireTasMax(T)\
> POUR i DE n-1 A 1 PAR PAS DE -1\
> Echanger(T, T\[i\])\
> // La taille effective du tas diminue\
> Entasser(T, i, 0)\
> FIN POUR\
> FIN FONCTION\
> \
> FONCTION ConstruireTasMax(T)\
> n = longueur(T)\
> POUR i DE Plancher(n/2) - 1 A 0 PAR PAS DE -1\
> Entasser(T, n, i)\
> FIN POUR\
> FIN FONCTION\
> \
> FONCTION Entasser(T, taille_tas, i)\
> // Assure que le sous-arbre de racine i est un tas-max\
> max = i\
> gauche = 2\*i + 1\
> droite = 2\*i + 2\
> \
> SI gauche \< taille_tas ET T\[gauche\] \> T\[max\] ALORS\
> max = gauche\
> FIN SI\
> SI droite \< taille_tas ET T\[droite\] \> T\[max\] ALORS\
> max = droite\
> FIN SI\
> \
> SI max!= i ALORS\
> Echanger(T\[i\], T\[max\])\
> Entasser(T, taille_tas, max)\
> FIN SI\
> FIN FONCTION
>
> **Analyse de Complexité :**

**Temporelle :** L\'opération Entasser sur un nœud de hauteur h prend un temps O(h), soit O(logn). L\'opération ConstruireTasMax appelle Entasser sur environ n/2 nœuds. Une analyse plus fine montre que son coût total est en fait linéaire, O(n). La boucle principale du tri effectue\
n−1 échanges suivis d\'une opération Entasser, chacune coûtant O(logn). Le coût total est donc O(n)+(n−1)×O(logn)=O(nlogn). Cette complexité est garantie dans tous les cas.

**Spatiale :** Le tri par tas est un algorithme **en place**. Toutes les opérations se font par échanges au sein du tableau initial, ne nécessitant qu\'un espace constant O(1) pour les variables auxiliaires.

> **Propriétés :**

**Stabilité :** Le tri par tas est **non stable**. Les échanges entre la racine et les feuilles peuvent perturber l\'ordre relatif des éléments égaux.

### Dépasser la Borne : Les Tris en Temps Linéaire

La borne de Ω(nlogn) est infranchissable pour les tris par comparaison. Cependant, si nous pouvons faire des hypothèses supplémentaires sur la nature des données à trier, il devient possible de concevoir des algorithmes qui ne reposent pas sur des comparaisons et qui peuvent atteindre une complexité linéaire.

#### Tri par Comptage (Counting Sort)

> **Principe :** Cet algorithme ne compare pas les éléments entre eux. À la place, pour chaque élément x, il compte le nombre d\'éléments qui lui sont inférieurs. Cette information lui permet de placer directement x à sa position finale dans le tableau de sortie.
>
> **Contraintes :** Le tri par comptage est très efficace mais son application est limitée. Il ne fonctionne que si les n éléments à trier sont des **entiers** appartenant à un intervalle restreint et connu, par exemple \[0,k\]. Si\
> k est beaucoup plus grand que n, l\'algorithme devient inefficace en espace et en temps.
>
> **Pseudo-code (version stable) :**\
> FONCTION TriParComptage(Entree\[1..n\], Sortie\[1..n\], k)\
> // C est un tableau de comptage\
> C\[0..k\]\
> \
> // Initialiser le tableau de comptage à 0\
> POUR i DE 0 A k\
> C\[i\] = 0\
> FIN POUR\
> \
> // Compter les occurrences de chaque élément\
> POUR j DE 1 A n\
> C\[Entree\[j\]\] = C\[Entree\[j\]\] + 1\
> FIN POUR\
> // C\[i\] contient maintenant le nombre d\'éléments égaux à i\
> \
> // Calculer les positions finales\
> POUR i DE 1 A k\
> C\[i\] = C\[i\] + C\[i-1\]\
> FIN POUR\
> // C\[i\] contient maintenant le nombre d\'éléments inférieurs ou égaux à i\
> \
> // Construire le tableau de sortie\
> POUR j DE n A 1 PAR PAS DE -1\
> Sortie\[C\[Entree\[j\]\]\] = Entree\[j\]\
> C\[Entree\[j\]\] = C\[Entree\[j\]\] - 1\
> FIN POUR\
> FIN FONCTION
>
> **Analyse de Complexité :**

**Temporelle :** L\'algorithme se compose de quatre boucles. La première est en Θ(k), la deuxième en Θ(n), la troisième en Θ(k), et la quatrième en Θ(n). La complexité totale est donc Θ(n+k). Si la plage des valeurs k est du même ordre de grandeur que le nombre d\'éléments n (c\'est-à-dire k=O(n)), alors la complexité devient linéaire, Θ(n).

**Spatiale :** L\'algorithme nécessite un tableau de comptage de taille k+1 et un tableau de sortie de taille n, soit une complexité spatiale de Θ(n+k).

#### Tri par Base (Radix Sort)

> **Principe :** Le tri par base est un algorithme astucieux qui trie les nombres en les traitant chiffre par chiffre (ou par groupe de chiffres, appelés \"digits\"). La version la plus courante (LSD Radix Sort) commence par trier les nombres en fonction de leur chiffre le moins significatif, puis le deuxième moins significatif, et ainsi de suite jusqu\'au chiffre le plus significatif. Pour que cela fonctionne, le tri utilisé à chaque étape sur les chiffres doit être **stable**. Le tri par comptage est un candidat idéal pour cette tâche.
>
> **Contraintes :** S\'applique aux entiers (ou aux chaînes de caractères) dont le nombre de chiffres (ou de caractères) est borné.
>
> **Pseudo-code :**\
> FONCTION TriParBase(T, d)\
> // T est un tableau de n nombres, d est le nombre de chiffres maximum\
> POUR i DE 1 A d\
> // Utiliser un tri stable pour trier le tableau T\
> // en fonction du i-ème chiffre (en partant du moins significatif)\
> TriStable(T, i)\
> FIN POUR\
> FIN FONCTION
>
> **Analyse de Complexité :**

**Temporelle :** Soit d le nombre de chiffres des nombres, n le nombre d\'éléments, et b la base de numération (par exemple, b=10 pour les nombres décimaux). Chaque passe de tri stable (avec le tri par comptage) prend un temps Θ(n+b). Comme il y a d passes, la complexité totale est Θ(d(n+b)). Si d est une constante et que b n\'est pas trop grand par rapport à n (par exemple, b=O(n)), la complexité est linéaire en n, soit Θ(n).

**Spatiale :** La complexité spatiale est déterminée par celle du tri stable utilisé. Avec le tri par comptage, elle est de Θ(n+b).

### Tableau Comparatif des Algorithmes de Tri

Pour synthétiser les caractéristiques des algorithmes étudiés, le tableau suivant offre une vue d\'ensemble des compromis qu\'ils représentent.

  ----------------------- ------------------------------- ---------------------------------- -------------------------------- -------- ---------- ----------------------
  Algorithme              Complexité Temporelle (Moyen)   Complexité Temporelle (Pire Cas)   Complexité Spatiale (Pire Cas)   Stable   En Place   Paradigme

  **Tri par Sélection**   Θ(n2)                           Θ(n2)                              Θ(1)                             Non      Oui        Incrémental

  **Tri par Insertion**   Θ(n2)                           Θ(n2)                              Θ(1)                             Oui      Oui        Incrémental

  **Tri à Bulles**        Θ(n2)                           Θ(n2)                              Θ(1)                             Oui      Oui        Incrémental

  **Tri Fusion**          Θ(nlogn)                        Θ(nlogn)                           Θ(n)                             Oui      Non        Diviser pour Régner

  **Tri Rapide**          Θ(nlogn)                        Θ(n2)                              Θ(logn) (moyen)                  Non      Oui        Diviser pour Régner

  **Tri par Tas**         Θ(nlogn)                        Θ(nlogn)                           Θ(1)                             Non      Oui        Structure de Données

  **Tri par Comptage**    Θ(n+k)                          Θ(n+k)                             Θ(n+k)                           Oui      Non        Non-Comparaison

  **Tri par Base**        Θ(d(n+b))                       Θ(d(n+b))                          Θ(n+b)                           Oui      Non        Non-Comparaison
  ----------------------- ------------------------------- ---------------------------------- -------------------------------- -------- ---------- ----------------------

*Note : Pour le Tri Rapide, la complexité spatiale dans le pire des cas est Θ(n). Pour le Tri par Comptage, k est la plage des valeurs. Pour le Tri par Base, d est le nombre de chiffres et b est la base.*

## 24.3 Les Grands Paradigmes de Conception Algorithmique

Si l\'analyse nous donne les outils pour mesurer l\'efficacité, la conception est l\'art de créer des solutions. Plutôt que de réinventer la roue pour chaque nouveau problème, les informaticiens s\'appuient sur un ensemble de stratégies éprouvées, de schémas de pensée appelés **paradigmes de conception**. Ces paradigmes sont des approches de haut niveau pour structurer une solution algorithmique. Les maîtriser, c\'est acquérir une \"boîte à outils\" intellectuelle qui permet de transformer un problème complexe et inédit en une série d\'étapes plus familières et gérables. Cette section est le cœur de notre étude, car elle vise à vous faire passer du statut d\'utilisateur d\'algorithmes à celui de concepteur.

### 24.3.1 Diviser pour Régner (Divide and Conquer)

Le paradigme \"Diviser pour Régner\" est l\'une des stratégies les plus puissantes et les plus intuitives de l\'arsenal de l\'algorithmicien. Il aborde un problème en le décomposant systématiquement en morceaux plus petits et plus faciles à gérer.

#### Formalisation du Paradigme

La méthode \"Diviser pour Régner\" se déroule en trois étapes récursives  :

> **Diviser :** Le problème initial de taille n est décomposé en a sous-problèmes du même type, mais de taille plus petite (typiquement n/b). Il est crucial que ces sous-problèmes soient **indépendants** les uns des autres.
>
> **Régner :** Les sous-problèmes sont résolus récursivement. Si la taille d\'un sous-problème devient suffisamment petite, il est résolu directement (cas de base de la récursion).
>
> **Combiner :** Les solutions des sous-problèmes sont combinées pour former la solution du problème initial.

La complexité d\'un tel algorithme est naturellement décrite par la récurrence T(n)=aT(n/b)+f(n), où f(n) représente le coût des étapes de division et de combinaison. Le Théorème Maître est donc l\'outil d\'analyse privilégié pour ce paradigme.

#### Exemple 1 : Tri Fusion Revisité

Le tri fusion, que nous avons étudié à la section 24.2, est l\'exemple archétypal de ce paradigme.

> **Diviser :** Le tableau de n éléments est divisé en deux sous-tableaux de taille n/2. Cette étape est triviale et coûte O(1).
>
> **Régner :** Les deux sous-tableaux sont triés récursivement en appelant TriFusion sur chacun d\'eux.
>
> **Combiner :** Les deux sous-tableaux triés sont fusionnés en un seul tableau trié. C\'est ici que réside le travail principal, avec un coût de Θ(n).

#### Exemple 2 : Multiplication Rapide d\'Entiers (Algorithme de Karatsuba)

La multiplication de grands entiers est un problème classique où \"Diviser pour Régner\" offre une amélioration spectaculaire par rapport à la méthode scolaire.

> L\'Approche Scolaire et sa Complexité\
> La méthode de multiplication que nous apprenons à l\'école, qui consiste à multiplier chaque chiffre d\'un nombre par chaque chiffre de l\'autre, requiert environ n2 multiplications de chiffres pour deux nombres de n chiffres. Sa complexité est donc Θ(n2).64
>
> Une Première Tentative \"Diviser pour Régner\"\
> Soient deux grands entiers X et Y de n chiffres (supposons n une puissance de 2 pour simplifier). On peut les diviser en deux moitiés de n/2 chiffres :\
> X=X1​⋅10n/2+X0​\
> Y=Y1​⋅10n/2+Y0​\
> Le produit XY devient :\
> XY=(X1​Y1​)⋅10n+(X1​Y0​+X0​Y1​)⋅10n/2+(X0​Y0​)\
> Cette formule décompose la multiplication de deux nombres de n chiffres en quatre multiplications de nombres de n/2 chiffres (X1​Y1​, X1​Y0​, X0​Y1​, X0​Y0​), plus quelques additions et décalages (multiplications par des puissances de 10) qui coûtent Θ(n).\
> La récurrence pour cette approche est T(n)=4T(n/2)+Θ(n). En utilisant le Théorème Maître (a=4,b=2,nlogb​a=nlog2​4=n2), nous tombons dans le Cas 1, et la complexité est Θ(n2). Nous n\'avons rien gagné.66
>
> L\'Astuce de Karatsuba\
> L\'innovation de l\'algorithme de Karatsuba, découvert en 1960 par Anatoly Karatsuba, réside dans une astuce algébrique qui permet de calculer le terme du milieu, (X1​Y0​+X0​Y1​), avec une seule multiplication supplémentaire, au lieu de deux.64\
> \
> On calcule trois produits de nombres de taille n/2 :

P1​=X1​Y1​

P2​=X0​Y0​

P3​=(X1​+X0​)(Y1​+Y0​)\
L\'astuce vient de l\'observation que P3​=X1​Y1​+X1​Y0​+X0​Y1​+X0​Y0​=P1​+(X1​Y0​+X0​Y1​)+P2​.\
On peut donc isoler le terme du milieu :\
X1​Y0​+X0​Y1​=P3​−P1​−P2​.\
Le produit final XY s\'écrit alors :\
XY=P1​⋅10n+(P3​−P1​−P2​)⋅10n/2+P2​.\
Cette formulation ne requiert que trois multiplications de taille n/2 (P1​,P2​,P3​), au prix de quelques additions et soustractions supplémentaires qui restent en Θ(n).

Ce qui est remarquable dans cet exemple, c\'est que la véritable innovation ne se situe pas dans l\'étape de \"Diviser\", mais dans une étape de \"Combiner\" particulièrement astucieuse. Une application directe du paradigme n\'apporte aucune amélioration. C\'est la réorganisation algébrique qui réduit le nombre d\'appels récursifs, modifiant le paramètre a de la récurrence de 4 à 3. C\'est cette réduction qui fait passer l\'algorithme d\'une complexité quadratique à une complexité sous-quadratique, illustrant une leçon fondamentale : la partie la plus complexe et la plus innovante d\'un algorithme \"Diviser pour Régner\" réside souvent dans la logique de recombinaison.

> **Pseudo-code de Karatsuba :**\
> FONCTION Karatsuba(X, Y)\
> // X et Y sont des entiers de n chiffres\
> n = max(nombre_chiffres(X), nombre_chiffres(Y))\
> \
> // Cas de base\
> SI n \< seuil_minimal ALORS\
> RETOURNER X \* Y // Multiplication standard\
> FIN SI\
> \
> // Diviser\
> m = Plafond(n / 2)\
> puissance_dix_m = 10\^m\
> X1 = Plancher(X / puissance_dix_m)\
> X0 = X % puissance_dix_m\
> Y1 = Plancher(Y / puissance_dix_m)\
> Y0 = Y % puissance_dix_m\
> \
> // Régner (appels récursifs)\
> P1 = Karatsuba(X1, Y1)\
> P2 = Karatsuba(X0, Y0)\
> P3 = Karatsuba(X1 + X0, Y1 + Y0)\
> \
> // Combiner\
> terme_milieu = P3 - P1 - P2\
> RETOURNER (P1 \* 10\^(2\*m)) + (terme_milieu \* 10\^m) + P2\
> FIN FONCTION
>
> Analyse de Complexité :\
> La nouvelle relation de récurrence est T(n)=3T(n/2)+Θ(n).\
> Ici, a=3,b=2, et f(n)=Θ(n). Nous calculons nlogb​a=nlog2​3≈n1.585.\
> Puisque f(n)=Θ(n)=O(nlog2​3−ϵ) avec ϵ≈0.585\>0, nous sommes dans le Cas 1 du Théorème Maître.\
> La complexité est donc T(n)=Θ(nlog2​3), une amélioration significative par rapport à Θ(n2).65

### 24.3.2 Programmation Dynamique

La programmation dynamique est un paradigme puissant, souvent utilisé pour résoudre des problèmes d\'optimisation. Comme \"Diviser pour Régner\", elle résout un problème en le décomposant en sous-problèmes. Cependant, elle s\'applique lorsque ces sous-problèmes ne sont pas indépendants, mais se chevauchent.

#### Principes Fondamentaux

Un problème peut être résolu par programmation dynamique s\'il présente deux propriétés essentielles :

> **Sous-structure Optimale :** Une solution optimale au problème global peut être construite à partir de solutions optimales à ses sous-problèmes. Si un chemin de A à Z est le plus court, et que B est une ville sur ce chemin, alors le segment de chemin de A à B doit être le plus court chemin entre A et B.
>
> **Sous-problèmes Superposés (ou Chevauchants) :** Une approche récursive naïve résoudrait les mêmes sous-problèmes encore et encore, conduisant à une complexité exponentielle. La programmation dynamique tire son efficacité du fait qu\'elle calcule la solution de chaque sous-problème une seule fois et stocke le résultat.

L\'art de la programmation dynamique réside dans le choix de la définition de l\'**état** d\'un sous-problème. Cet état doit être suffisamment concis pour être utilisé comme indice dans une table de mémoïsation, tout en capturant toutes les informations nécessaires pour appliquer le principe d\'optimalité. Pour la Plus Longue Sous-Séquence Commune, l\'état est simplement une paire d\'indices (i,j) représentant les préfixes des deux chaînes. Pour le problème du sac à dos, l\'état doit capturer non seulement les objets considérés (indice

i), mais aussi la capacité restante du sac (w). Une tentative naïve de définir l\'état uniquement par l\'indice

i échouerait, car il est impossible de prendre une décision sur l\'objet i sans connaître la capacité restante. L\'identification de cet ensemble minimal de paramètres qui définit l\'état d\'un sous-problème est l\'étape de conception la plus critique.

Il existe deux approches principales pour implémenter une solution de programmation dynamique :

> **Mémoïsation (Approche descendante ou Top-Down) :** On écrit une fonction récursive qui résout le problème de manière naturelle. On ajoute ensuite un mécanisme de cache (souvent un tableau ou une table de hachage) pour stocker les résultats des sous-problèmes. Avant de calculer la solution d\'un sous-problème, on vérifie si elle est déjà dans le cache. Si oui, on la retourne directement ; sinon, on la calcule, on la stocke dans le cache, et on la retourne. Cette approche est souvent plus intuitive à écrire à partir d\'une relation de récurrence.
>
> **Tabulation (Approche ascendante ou Bottom-Up) :** On résout les sous-problèmes de manière itérative, en commençant par les plus petits. On remplit un tableau (ou une matrice) avec les solutions des sous-problèmes, en utilisant les résultats déjà calculés pour résoudre des sous-problèmes de plus en plus grands, jusqu\'à atteindre la solution du problème initial. Cette approche évite la surcharge des appels récursifs et peut parfois être optimisée en termes d\'espace.

#### Étude de Cas 1 : Plus Longue Sous-Séquence Commune (LCS)

> Définition du Problème\
> Étant donné deux séquences (par exemple, des chaînes de caractères) X=(x1​,x2​,...,xm​) et Y=(y1​,y2​,...,yn​), trouver une sous-séquence commune de longueur maximale. Une sous-séquence est obtenue en supprimant zéro ou plusieurs éléments d\'une séquence (les éléments restants conservent leur ordre relatif).81 Par exemple, pour\
> X=\"ABCBDAB\" et Y=\"BDCABA\", \"BCBA\" est une LCS de longueur 4.
>
> Caractérisation et Relation de Récurrence\
> Le problème présente une sous-structure optimale. Soit c\[i,j\] la longueur de la LCS des préfixes Xi​=(x1​,...,xi​) et Yj​=(y1​,...,yj​).

Si i=0 ou j=0, les préfixes sont vides, donc c\[i,j\]=0.

Si xi​=yj​, alors cet élément commun fait partie de la LCS. La longueur est 1 plus la longueur de la LCS de Xi−1​ et Yj−1​.

Si xi​=yj​, alors l\'élément commun final (s\'il existe) ne peut pas impliquer à la fois xi​ et yj​. La LCS est donc la plus longue des LCS de (Xi​,Yj−1​) et (Xi−1​,Yj​).\
Cela nous donne la relation de récurrence suivante 74 :

> c\[i,j\]=⎩⎨⎧​0c\[i−1,j−1\]+1max(c\[i,j−1\],c\[i−1,j\])​si i=0 ou j=0si i,j\>0 et xi​=yj​si i,j\>0 et xi​=yj​​
>
> Pseudo-code (Tabulation)\
> Nous pouvons calculer les valeurs de c\[i,j\] de manière ascendante en remplissant une table de taille (m+1)×(n+1).\
> FONCTION Longueur_LCS(X, Y)\
> m = longueur(X)\
> n = longueur(Y)\
> c\[0..m, 0..n\] // Table pour stocker les longueurs\
> \
> POUR i DE 0 A m\
> c\[i, 0\] = 0\
> FIN POUR\
> POUR j DE 0 A n\
> c\[0, j\] = 0\
> FIN POUR\
> \
> POUR i DE 1 A m\
> POUR j DE 1 A n\
> SI X\[i\] == Y\[j\] ALORS\
> c\[i, j\] = c\[i-1, j-1\] + 1\
> SINON SI c\[i-1, j\] \>= c\[i, j-1\] ALORS\
> c\[i, j\] = c\[i-1, j\]\
> SINON\
> c\[i, j\] = c\[i, j-1\]\
> FIN SI\
> FIN POUR\
> FIN POUR\
> \
> RETOURNER c\[m, n\]\
> FIN FONCTION
>
> **Analyse et Construction de la Solution**

**Complexité :** Le remplissage de la table nécessite deux boucles imbriquées, l\'une jusqu\'à m et l\'autre jusqu\'à n. Chaque cellule est calculée en temps constant. La complexité temporelle et spatiale est donc Θ(mn).

**Construction :** Pour retrouver la LCS elle-même (et pas seulement sa longueur), on peut soit stocker dans une table auxiliaire la décision prise à chaque cellule (provenance diagonale, haut, ou gauche), soit la ré-inférer en partant de c\[m,n\] et en remontant vers c. Si xi​=yj​, on ajoute ce caractère à la LCS et on se déplace en diagonale vers c\[i−1,j−1\]. Sinon, on se déplace vers la cellule qui a fourni le maximum (c\[i−1,j\] ou c\[i,j−1\]).

#### Étude de Cas 2 : Problème du Sac à Dos 0/1 (0/1 Knapsack)

> Définition du Problème\
> Un voleur dispose d\'un sac à dos avec une capacité de poids maximale W. Il a le choix parmi n objets, chaque objet i ayant un poids pi​ et une valeur vi​. Il doit choisir quels objets emporter pour maximiser la valeur totale, sans dépasser la capacité W. Chaque objet ne peut être pris qu\'une seule fois (d\'où le nom \"0/1\" : soit on le prend, soit on ne le prend pas).75
>
> Relation de Récurrence\
> Ce problème présente également une sous-structure optimale. Soit K\[i,w\] la valeur maximale que l\'on peut obtenir en utilisant un sous-ensemble des i premiers objets (de 1 à i) avec une capacité de sac de w. Pour décider de la valeur de K\[i,w\], nous avons deux choix concernant l\'objet i :

**Ne pas prendre l\'objet i :** La valeur maximale est alors la même que celle que l\'on pouvait obtenir avec les i−1 premiers objets et la même capacité w, soit K\[i−1,w\].

Prendre l\'objet i (seulement si pi​≤w) : La valeur est alors vi​ plus la valeur maximale que l\'on pouvait obtenir avec les i−1 premiers objets et la capacité restante w−pi​, soit vi​+K\[i−1,w−pi​\].\
La solution optimale est le maximum de ces deux options.75

> K\[i,w\]={K\[i−1,w\]max(K\[i−1,w\],vi​+K\[i−1,w−pi​\])​si pi​\>wsi pi​≤w​Les cas de base sont K\[0,w\]=0 pour tout w (aucun objet, valeur nulle) et K\[i,0\]=0 pour tout i (capacité nulle, valeur nulle).
>
> Pseudo-code (Tabulation)\
> On remplit une table de taille (n+1)×(W+1).\
> FONCTION SacADos(poids, valeurs, n, W)\
> // K est une table de (n+1) x (W+1)\
> K\
> \
> POUR w DE 0 A W\
> K\[0, w\] = 0\
> FIN POUR\
> \
> POUR i DE 1 A n\
> POUR w DE 0 A W\
> SI poids\[i\] \<= w ALORS\
> K\[i, w\] = max(valeurs\[i\] + K\[i-1, w - poids\[i\]\], K\[i-1, w\])\
> SINON\
> K\[i, w\] = K\[i-1, w\]\
> FIN SI\
> FIN POUR\
> FIN POUR\
> \
> RETOURNER K\
> FIN FONCTION
>
> Analyse de Complexité\
> Le remplissage de la table de taille (n+1)×(W+1) avec des opérations en temps constant pour chaque cellule donne une complexité temporelle de Θ(nW). La complexité spatiale est également de Θ(nW).\
> Cette complexité est intéressante car elle révèle une dépendance fondamentale non seulement au nombre d\'objets n, mais aussi à la valeur numérique de la capacité W. Si W est un nombre très grand (par exemple, de l\'ordre de 2n), la complexité devient exponentielle par rapport à la taille de l\'entrée (qui est mesurée en nombre de bits, soit logW). On parle alors de complexité pseudo-polynomiale. Cela met en évidence une vulnérabilité clé de la programmation dynamique : elle n\'est efficace que si les paramètres numériques du problème sont de taille raisonnable. C\'est la raison pour laquelle le problème du sac à dos est classé NP-difficile malgré l\'existence de cet algorithme.

### 24.3.3 Algorithmes Gloutons (Greedy Algorithms)

Les algorithmes gloutons constituent une autre approche puissante pour les problèmes d\'optimisation. Leur philosophie est simple et séduisante : construire une solution étape par étape en faisant à chaque fois le choix qui semble localement le meilleur, dans l\'espoir que cette série de choix locaux optimaux mènera à une solution globalement optimale. Un algorithme glouton ne revient jamais sur ses décisions ; une fois qu\'un choix est fait, il est définitif.

Cette simplicité est à la fois sa force et sa faiblesse. La stratégie gloutonne est souvent facile à concevoir et à implémenter, et peut être très rapide. Cependant, contrairement à la programmation dynamique qui explore toutes les options pour garantir l\'optimalité, un algorithme glouton peut facilement se laisser piéger par un optimum local et manquer la solution globale optimale.

#### La Preuve d\'Optimalité : L\'Étape Cruciale

Un algorithme qui fait des choix locaux optimaux sans garantie de résultat global est une **heuristique**. Pour qu\'un algorithme glouton soit considéré comme **correct**, il doit impérativement être accompagné d\'une **preuve d\'optimalité**. Cette preuve est la caractéristique qui distingue un algorithme correct d\'une simple approximation. La structure de preuve standard repose sur deux propriétés clés :

> **Propriété du Choix Glouton (Greedy-Choice Property) :** Il faut démontrer qu\'un choix localement optimal peut toujours mener à une solution globalement optimale. Plus formellement, on montre qu\'il existe une solution optimale qui contient le premier choix fait par l\'algorithme glouton.
>
> **Sous-structure Optimale :** Après avoir fait le choix glouton, le problème qui reste à résoudre est un sous-problème du même type. Il faut montrer que si l\'on combine le choix glouton avec une solution optimale du sous-problème restant, on obtient une solution optimale pour le problème original.

La technique de preuve la plus courante pour la propriété du choix glouton est l\'argument d\'échange (exchange argument). La démarche est la suivante :

a\) Soit g le premier choix fait par l\'algorithme glouton.

b\) Soit Sopt​ une solution optimale quelconque.

c\) Si Sopt​ contient g, la propriété est démontrée.

d\) Sinon, on montre qu\'on peut modifier Sopt​ en \"échangeant\" un de ses éléments contre g pour créer une nouvelle solution Sopt′​ qui est au moins aussi bonne que Sopt​ (c\'est-à-dire, valeur(Sopt′​)≥valeur(Sopt​)).

e\) On conclut qu\'il existe bien une solution optimale contenant le choix glouton.91

#### Étude de Cas 1 : Problème de Sélection d\'Activités

> Définition du Problème\
> On dispose d\'un ensemble de n activités, chacune avec une heure de début di​ et une heure de fin fi​. Deux activités sont compatibles si leurs intervalles de temps ne se chevauchent pas. Le but est de sélectionner un sous-ensemble d\'activités compatibles de cardinalité maximale.92
>
> L\'Algorithme Glouton\
> Plusieurs stratégies gloutonnes intuitives pourraient être envisagées : choisir l\'activité la plus courte, ou celle qui commence le plus tôt. Ces stratégies échouent sur certains cas. La stratégie gloutonne qui fonctionne est la suivante :

Trier les activités par ordre croissant de leur **heure de fin**.

Sélectionner la première activité de la liste triée.

Parcourir le reste de la liste et sélectionner la prochaine activité qui commence après (ou en même temps que) la fin de la dernière activité sélectionnée.

**Pseudo-code :**\
FONCTION SelectionActivites(debuts, fins)\
// On suppose que les activités sont déjà triées par heure de fin\
n = longueur(debuts)\
Solution = {activité 1}\
derniere_fin = fins\
\
POUR i DE 2 A n\
SI debuts\[i\] \>= derniere_fin ALORS\
Ajouter activité i à Solution\
derniere_fin = fins\[i\]\
FIN SI\
FIN POUR\
\
RETOURNER Solution\
FIN FONCTION

> **Preuve de Correction (par argument d\'échange)**

**Propriété du choix glouton :** Soit l\'activité a1​ celle qui a l\'heure de fin la plus précoce. C\'est le premier choix de notre algorithme. Soit Sopt​ une solution optimale. Si Sopt​ contient a1​, c\'est terminé. Sinon, soit aj​ la première activité dans Sopt​ (triée par heure de fin). Par définition de a1​, on a f1​≤fj​. On peut alors créer une nouvelle solution Sopt′​=(Sopt​∖{aj​})∪{a1​}. Toutes les activités dans Sopt​ qui étaient compatibles avec aj​ sont aussi compatibles avec a1​ (puisque a1​ se termine plus tôt). Donc Sopt′​ est une solution valide de même taille que Sopt​, et donc optimale. Elle contient le choix glouton a1​.

**Sous-structure optimale :** Une fois le choix glouton a1​ fait, le problème se réduit à trouver une solution optimale pour le sous-ensemble d\'activités qui commencent après la fin de a1​. Si on trouve une solution optimale pour ce sous-problème, la solution globale sera optimale.

#### Étude de Cas 2 : Arbres Couvrants Minimaux (ACM / MST)

> Définition du Problème\
> Étant donné un graphe connexe, non orienté et pondéré G=(V,E), un arbre couvrant est un sous-graphe qui est un arbre et qui connecte tous les sommets de V. Un arbre couvrant minimal (ACM) est un arbre couvrant dont la somme des poids des arêtes est minimale.95 Ce problème a des applications directes dans la conception de réseaux (électriques, de communication, etc.).

Deux algorithmes gloutons classiques permettent de résoudre ce problème. Leur optimalité repose sur une propriété fondamentale des graphes appelée la **propriété de la coupe** : pour toute partition (ou coupe) des sommets du graphe en deux ensembles disjoints, si on considère l\'arête de poids minimal qui traverse cette coupe, alors cette arête appartient à au moins un ACM du graphe.

> **Algorithme de Kruskal**

**Principe :** L\'approche de Kruskal est de construire une forêt d\'arbres qui fusionnent progressivement. L\'algorithme considère toutes les arêtes du graphe par ordre de poids croissant. Pour chaque arête, il l\'ajoute à la solution si et seulement si elle ne forme pas de cycle avec les arêtes déjà sélectionnées.

**Structure de données :** Pour vérifier efficacement la formation de cycles, on utilise une structure de données **Union-Find** (ou ensembles disjoints). Chaque ensemble représente un arbre dans la forêt. Ajouter une arête revient à unir les ensembles de ses deux extrémités. Si les deux extrémités sont déjà dans le même ensemble, l\'arête formerait un cycle.

**Pseudo-code :**\
FONCTION Kruskal(G = (V, E, w))\
ACM = {}\
POUR chaque sommet v DANS V\
CreerEnsemble(v)\
FIN POUR\
\
Trier les arêtes E par poids w croissant\
\
POUR chaque arête (u, v) DANS E, par ordre de poids\
SI TrouverEnsemble(u)!= TrouverEnsemble(v) ALORS\
Ajouter (u, v) à ACM\
Union(u, v)\
FIN SI\
FIN POUR\
\
RETOURNER ACM\
FIN FONCTION

**Analyse de Complexité :** Le coût est dominé par le tri des arêtes, soit O(∣E∣log∣E∣). Les opérations sur la structure Union-Find (avec les optimisations d\'union par rang et de compression de chemin) ont un coût quasi-constant, rendant le coût total des ∣V∣ créations et 2∣E∣ recherches O(∣E∣α(∣V∣)), où α est la fonction inverse d\'Ackermann, qui est extrêmement lente à croître. La complexité est donc O(∣E∣log∣E∣), ou O(∣E∣log∣V∣) car ∣E∣ est au plus O(∣V∣2).

> **Algorithme de Prim**

**Principe :** L\'approche de Prim est de faire croître un seul arbre à partir d\'un sommet de départ arbitraire. À chaque étape, l\'algorithme ajoute à l\'arbre l\'arête de poids minimal qui connecte un sommet déjà dans l\'arbre à un sommet qui n\'y est pas encore.

**Structure de données :** Pour trouver efficacement l\'arête de poids minimal à chaque étape, on utilise une **file de priorité** (souvent un tas binaire ou un tas de Fibonacci) qui stocke les sommets non encore dans l\'arbre, avec comme priorité le poids de l\'arête la moins chère les reliant à l\'arbre en construction.

**Pseudo-code :**\
FONCTION Prim(G = (V, E, w), s)\
POUR chaque sommet u DANS V\
cout\[u\] = INFINI\
pred\[u\] = NUL\
FIN POUR\
cout\[s\] = 0\
\
FilePriorite Q = V // Initialisée avec les coûts\
\
TANT QUE Q n\'est pas vide\
u = ExtraireMin(Q)\
POUR chaque voisin v de u\
SI v est dans Q ET w(u, v) \< cout\[v\] ALORS\
pred\[v\] = u\
cout\[v\] = w(u, v)\
MettreAJourPriorite(Q, v, cout\[v\])\
FIN SI\
FIN POUR\
FIN TANT QUE\
\
// L\'ACM est formé par les arêtes (pred\[v\], v) pour v!= s\
FIN FONCTION

**Analyse de Complexité :** La complexité dépend de l\'implémentation de la file de priorité. Avec un tas binaire, l\'initialisation prend O(∣V∣), chaque extraction du minimum prend O(log∣V∣) (il y en a ∣V∣), et chaque mise à jour de priorité prend O(log∣V∣) (il y en a au plus ∣E∣). La complexité totale est O(∣V∣log∣V∣+∣E∣log∣V∣), qui se simplifie en O(∣E∣log∣V∣) pour un graphe connexe.

### 24.3.4 Exploration de l\'Espace des Solutions : Retour sur Trace et Séparation et Évaluation

Pour de nombreux problèmes (souvent NP-complets), aucune solution polynomiale efficace (comme celles issues de la programmation dynamique ou des algorithmes gloutons) n\'est connue. Face à de tels défis, il faut souvent recourir à une exploration de l\'immense espace des solutions candidates. Le retour sur trace et la séparation et évaluation sont des techniques qui organisent cette exploration de manière intelligente, en évitant de parcourir des pans entiers de l\'espace de recherche qui ne peuvent pas mener à une solution valide ou optimale.

#### Retour sur Trace (Backtracking)

> Principe\
> Le retour sur trace (ou backtracking) peut être vu comme une recherche en profondeur (DFS) optimisée dans l\'arbre de l\'espace d\'état du problème.99 L\'algorithme construit une solution candidate de manière incrémentale, une pièce à la fois. À chaque étape, il vérifie si le candidat partiel peut être étendu en une solution complète.

Si oui, il continue à construire la solution.

Si non, il abandonne cette voie, revient en arrière sur le dernier choix effectué (backtrack), et essaie une autre option.\
Cette \"élagage\" (pruning) de l\'arbre de recherche est la clé de son efficacité par rapport à une recherche par force brute.

> **Étude de Cas : Problème des N Reines**

**Définition du Problème :** Placer N reines sur un échiquier de taille N×N de sorte qu\'aucune reine ne puisse en attaquer une autre. Cela signifie qu\'il ne doit y avoir qu\'une seule reine par ligne, par colonne et par diagonale.

**Solution par Retour sur Trace :** Une approche naturelle consiste à placer une reine par colonne, de la colonne 0 à la colonne N−1.

On commence par la colonne 0. On essaie de placer une reine dans la rangée 0.

Si cette position est \"sûre\" (non attaquée par les reines déjà placées dans les colonnes précédentes), on passe récursivement à la colonne 1.

Dans la colonne 1, on essaie toutes les rangées (0 à N−1). Pour chaque position sûre, on passe à la colonne 2.

Si, dans une colonne donnée, aucune rangée n\'est sûre, cela signifie que le placement des reines précédentes mène à une impasse. L\'appel récursif se termine, et l\'on **revient en arrière** à la colonne précédente pour essayer une autre rangée pour la reine qui s\'y trouve.

Si l\'on parvient à placer une reine dans la colonne N−1, on a trouvé une solution complète.

**Pseudo-code :**\
FONCTION ResoudreNReines(echiquier, colonne)\
// Cas de base : toutes les reines sont placées\
SI colonne \>= N ALORS\
RETOURNER VRAI // Une solution a été trouvée\
FIN SI\
\
// Essayer de placer une reine dans chaque rangée de cette colonne\
POUR rangee DE 0 A N-1\
// Vérifier si la position (rangee, colonne) est sûre\
SI estSure(echiquier, rangee, colonne) ALORS\
// Placer la reine\
echiquier\[rangee\]\[colonne\] = 1\
\
// Appeler récursivement pour la colonne suivante\
SI ResoudreNReines(echiquier, colonne + 1) == VRAI ALORS\
RETOURNER VRAI\
FIN SI\
\
// Si le placement ne mène pas à une solution,\
// retirer la reine (RETOUR SUR TRACE)\
echiquier\[rangee\]\[colonne\] = 0\
FIN SI\
FIN POUR\
\
// Si aucune reine ne peut être placée dans cette colonne\
RETOURNER FAUX\
FIN FONCTION\
\
FONCTION estSure(echiquier, rangee, colonne)\
// Vérifier la ligne à gauche\
POUR i DE 0 A colonne-1\
SI echiquier\[rangee\]\[i\] == 1 ALORS RETOURNER FAUX\
FIN POUR\
\
// Vérifier la diagonale supérieure gauche\
POUR i=rangee, j=colonne TANT QUE i\>=0 ET j\>=0\
SI echiquier\[i\]\[j\] == 1 ALORS RETOURNER FAUX\
i = i - 1, j = j - 1\
FIN POUR\
\
// Vérifier la diagonale inférieure gauche\
POUR i=rangee, j=colonne TANT QUE j\>=0 ET i\<N\
SI echiquier\[i\]\[j\] == 1 ALORS RETOURNER FAUX\
i = i + 1, j = j - 1\
FIN POUR\
\
RETOURNER VRAI\
FIN FONCTION

#### Séparation et Évaluation (Branch and Bound)

> Principe\
> La méthode de séparation et évaluation (Branch and Bound, B&B) est une amélioration du retour sur trace spécifiquement conçue pour les problèmes d\'optimisation (trouver la meilleure solution, pas seulement une solution valide).99 Comme le retour sur trace, elle explore l\'arbre de l\'espace des solutions. Sa puissance réside dans une stratégie d\'élagage plus agressive.\
> \
> L\'algorithme maintient une borne sur la meilleure solution trouvée jusqu\'à présent (par exemple, meilleur_cout_trouve). Pour chaque nœud de l\'arbre de recherche (qui représente une solution partielle), il calcule une évaluation (ou bound) qui estime le meilleur coût possible pour toute solution complète pouvant être obtenue à partir de ce nœud.

Pour un problème de **minimisation**, cette évaluation est une **borne inférieure**. Si la borne inférieure d\'un nœud est déjà supérieure à meilleur_cout_trouve, alors aucune solution dans la sous-arborescence de ce nœud ne pourra améliorer la meilleure solution connue. L\'algorithme peut donc **élaguer** (ignorer) toute cette branche de l\'arbre de recherche.

La distinction fondamentale entre ces deux techniques réside dans leur logique d\'élagage, qui reflète la nature des problèmes qu\'elles résolvent. Le retour sur trace élague sur la base de la **faisabilité** : une branche est coupée dès qu\'elle viole une contrainte du problème. La séparation et évaluation élague sur la base de l\'**optimalité** : une branche est coupée si l\'on peut prouver qu\'elle ne mènera jamais à une solution meilleure que celle déjà trouvée.

> **Étude de Cas : Problème du Voyageur de Commerce (TSP)**

**Définition du Problème :** Étant donné un ensemble de villes et les distances entre chaque paire de villes, trouver le circuit le plus court possible qui visite chaque ville exactement une fois et retourne à la ville de départ.

**Solution par Séparation et Évaluation :**

**Espace de Recherche :** L\'arbre de recherche représente les chemins partiels. La racine est la ville de départ. Un nœud au niveau k représente un chemin visitant k villes.

**Borne Supérieure Initiale :** On commence par trouver une solution réalisable (un tour complet) à l\'aide d\'une heuristique rapide (par exemple, l\'algorithme du plus proche voisin). Le coût de ce tour sert de première borne supérieure meilleur_cout_trouve.

Fonction d\'Évaluation (Borne Inférieure) : C\'est l\'élément le plus critique. Pour un nœud représentant un chemin partiel, il faut calculer une borne inférieure sur le coût de tout tour complet qui commence par ce chemin. Une borne simple mais efficace est :\
borne_inf = (coût du chemin partiel actuel) + (estimation optimiste du coût pour compléter le tour)\
L\'estimation optimiste peut être, par exemple, la somme des poids des arêtes les moins chères incidentes à chaque ville non encore visitée (en s\'assurant de pouvoir former un chemin).108 Une relaxation plus complexe, comme le coût d\'un arbre couvrant minimal sur les villes restantes, fournit une borne plus serrée et donc un élagage plus efficace.109

**Processus d\'Élagage :**

On explore l\'arbre (par exemple en profondeur ou en meilleur d\'abord).

À chaque nœud (chemin partiel), on calcule sa borne inférieure.

Si borne_inf \>= meilleur_cout_trouve, on élague cette branche.

Si on atteint une feuille (un tour complet) dont le coût est inférieur à meilleur_cout_trouve, on met à jour meilleur_cout_trouve avec ce nouveau coût, ce qui rend l\'élagage futur potentiellement plus efficace.

L\'efficacité d\'un algorithme de séparation et évaluation dépend presque entièrement de la qualité de sa fonction d\'évaluation. Une borne lâche (trop optimiste) n\'élaguera que peu de branches, et l\'algorithme se rapprochera d\'une recherche exhaustive. Une borne serrée (plus réaliste) mais très coûteuse à calculer peut ralentir l\'exploration de chaque nœud. La conception d\'un bon algorithme B&B est donc un exercice délicat d\'équilibre entre la qualité de la borne et son coût de calcul.

