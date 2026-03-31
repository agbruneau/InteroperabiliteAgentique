# Chapitre I.6 : Théorie de la Complexité

## Introduction : Le Grand Schisme -- De la Calculabilité à la Complexité

Les chapitres précédents de cet ouvrage ont jeté les fondations de l\'informatique théorique en s\'attaquant à une question d\'une portée philosophique et mathématique immense : quels sont les problèmes qu\'une machine peut, en principe, résoudre? Cette quête, menée par des pionniers tels qu\'Alan Turing, Alonzo Church et Kurt Gödel, a donné naissance à la théorie de la calculabilité. Elle a tracé une ligne de démarcation nette et absolue dans l\'univers des problèmes formels : d\'un côté, les problèmes

*calculables* (ou décidables), pour lesquels il existe un algorithme garanti de s\'arrêter et de fournir une réponse correcte ; de l\'autre, les problèmes *incalculables* (ou indécidables), comme le célèbre problème de l\'arrêt, pour lesquels aucun algorithme de ce type ne peut exister. La théorie de la calculabilité opère dans un monde d\'abstraction pure, où les modèles de calcul, telle la machine de Turing, disposent de ressources illimitées : un ruban infini et un temps infini.

Cependant, l\'avènement des premiers ordinateurs physiques dans les années 1940 et 1950 a confronté cette vision idéalisée à une réalité beaucoup plus contraignante. Ces machines, bien que réalisations concrètes des modèles théoriques, étaient dotées de mémoires finies et de vitesses de calcul limitées. Un problème pouvait être théoriquement calculable, mais son exécution sur une machine réelle pouvait exiger des siècles, voire des millénaires, le rendant insoluble en pratique. Cette prise de conscience a provoqué un schisme conceptuel, déplaçant le centre de gravité de la recherche. La question n\'était plus seulement « Peut-on le résoudre? », mais bien « Peut-on le résoudre

*efficacement*? ».

C\'est de cette interrogation pragmatique qu\'est née la théorie de la complexité computationnelle dans les années 1960. Elle se propose de quantifier la difficulté inhérente des problèmes calculables en mesurant les ressources nécessaires à leur résolution. Les deux ressources fondamentales sont le **temps**, qui correspond au nombre d\'opérations élémentaires effectuées par un algorithme, et l\'**espace**, qui représente la quantité de mémoire requise. La théorie de la complexité est donc la science formelle des contraintes du monde réel, le pont entre ce qui est abstraitement possible et ce qui est concrètement faisable.

Ce chapitre se consacre à l\'exploration de ce domaine fascinant. Nous commencerons par définir formellement les mesures de complexité en temps et en espace, en nous appuyant sur le modèle robuste de la machine de Turing. Nous introduirons ensuite l\'analyse asymptotique, le langage mathématique qui nous permet de raisonner sur l\'efficacité des algorithmes de manière indépendante de la technologie. Armés de ces outils, nous explorerons le \"zoo\" des classes de complexité, en nous concentrant sur les classes fondamentales **P** et **NP**. La classe **P** regroupe les problèmes considérés comme \"faciles\" ou \"traitables\", tandis que la classe **NP** contient des problèmes dont la solution, une fois trouvée, est facile à vérifier.

Cette exploration nous mènera inévitablement au cœur de l\'informatique théorique moderne : le problème **P versus NP**. Cette question, dotée d\'un prix d\'un million de dollars par l\'Institut Clay, demande si ces deux classes sont en réalité une seule et même chose. Nous analyserons les implications profondes qu\'une réponse, qu\'elle soit positive ou négative, aurait sur la science, la technologie, l\'économie et même notre compréhension de la créativité. Enfin, nous étudierons le concept de **NP-complétude**, qui identifie les problèmes les plus difficiles de la classe **NP**, et nous conclurons par un aperçu des classes de complexité plus avancées, au-delà de **NP**, pour donner une idée de l\'étendue et de la richesse de ce champ de recherche toujours en pleine effervescence.

## 6.1 Mesures de la Complexité (Temps et Espace)

Pour quantifier rigoureusement la consommation de ressources d\'un algorithme, il est indispensable de s\'appuyer sur un modèle de calcul formel et universel. Conformément à la thèse de Church-Turing, qui postule que tout ce qui est intuitivement calculable peut l\'être par une machine de Turing, ce modèle constitue le fondement de la théorie de la complexité.

### Le Modèle de Calcul de Référence : La Machine de Turing

Nous rappelons brièvement les définitions des deux variantes principales de la machine de Turing, qui sont essentielles pour distinguer les classes de complexité fondamentales.

#### La Machine de Turing Déterministe (MTD)

Une machine de Turing déterministe est un modèle de calcul abstrait qui manipule des symboles sur un ruban infini. Sa caractéristique principale est que, pour toute configuration donnée, l\'action suivante est unique et entièrement déterminée.

**Définition Formelle :** Une machine de Turing déterministe (MTD) est formellement définie par un 7-uplet M=(Q,Σ,Γ,δ,q0​,B,F), où :

- Q est un ensemble fini d\'**états**.

- Σ est un ensemble fini de symboles appelé l\'**alphabet d\'entrée**.

- Γ est un ensemble fini de symboles appelé l\'**alphabet de ruban**, tel que Σ⊂Γ.

- δ:(Q∖F)×Γ→Q×Γ×{L,R} est la **fonction de transition**. L et R représentent respectivement un déplacement de la tête de lecture/écriture vers la gauche et vers la droite.

- q0​∈Q est l\'**état initial**.

- B∈Γ∖Σ est le **symbole blanc**, qui remplit initialement le ruban à l\'exception de l\'entrée.

- F⊆Q est l\'ensemble des **états finaux** ou **d\'acceptation**.

Une **configuration** de la machine est une description instantanée de son état, du contenu de son ruban et de la position de sa tête. Elle peut être représentée par un triplet (u,q,v), où q∈Q est l\'état courant, et uv est le contenu du ruban, la tête se trouvant sur le premier symbole de v. Un

**calcul** est une séquence de configurations C0​,C1​,C2​,..., où C0​ est la configuration initiale et chaque Ci+1​ est obtenue à partir de Ci​ en appliquant la fonction de transition δ. Le calcul s\'arrête si la machine atteint un état pour lequel aucune transition n\'est définie ou, par convention pour les problèmes de décision, si elle entre dans un état final.

#### La Machine de Turing Non Déterministe (MTND)

La machine de Turing non déterministe se distingue par sa capacité à explorer plusieurs chemins de calcul simultanément. À chaque étape, la machine peut avoir plusieurs choix d\'actions possibles.

**Définition Formelle :** Une machine de Turing non déterministe (MTND) est définie par un 7-uplet similaire à celui de la MTD, M=(Q,Σ,Γ,δ,q0​,B,F), mais avec une fonction de transition différente :

- δ:(Q∖F)×Γ→P(Q×Γ×{L,R}) est la **relation de transition**, où P(⋅) désigne l\'ensemble des parties. Pour un état et un symbole donnés, δ retourne un *ensemble* de transitions possibles.

Le calcul d\'une MTND sur une entrée w n\'est plus une séquence linéaire de configurations, mais un **arbre de calcul**. Chaque nœud de l\'arbre est une configuration, et les enfants d\'un nœud représentent les configurations atteignables en une seule étape. L\'acceptation est définie de manière existentielle : une MTND accepte une entrée w s\'il existe *au moins un* chemin dans l\'arbre de calcul, partant de la configuration initiale, qui mène à un état d\'acceptation. Si aucun chemin ne mène à un état d\'acceptation (soit parce que tous les chemins s\'arrêtent dans un état de rejet, soit parce que certains bouclent indéfiniment sans accepter), l\'entrée est rejetée.

### Définitions Formelles des Mesures de Complexité

Avec ces modèles en place, nous pouvons maintenant définir formellement les ressources de temps et d\'espace.

#### Complexité en Temps (Time Complexity)

La complexité en temps mesure le nombre d\'étapes de calcul nécessaires pour qu\'une machine de Turing résolve un problème.

- **Pour une MTD :** Soit M une MTD qui s\'arrête sur toutes les entrées. Pour une entrée w, le **temps de calcul** de M sur w, noté timeM​(w), est le nombre de transitions (ou d\'étapes) que M effectue avant de s\'arrêter. C\'est la longueur de la séquence de calcul.

- **Pour une MTND :** Soit M une MTND qui décide un langage L (c\'est-à-dire que pour toute entrée, tous les chemins de calcul s\'arrêtent). Le **temps de calcul** de M sur w, noté timeM​(w), est défini comme suit :

  - Si w∈L, timeM​(w) est la longueur du **plus court** chemin de calcul acceptant.

  - Si w∈/L, timeM​(w) est la longueur du **plus long** chemin de calcul (tous les chemins menant à un rejet).

Cette définition asymétrique pour la MTND est un choix conceptuel d\'une importance capitale. En définissant le coût d\'une réponse positive par le chemin le plus court, le modèle capture l\'idée d\'une \"divination parfaite\" ou d\'une \"preuve\". La machine non déterministe n\'a pas besoin d\'explorer tout l\'arbre de recherche ; sa complexité est définie par le coût de trouver et de vérifier une seule solution correcte. Une MTD qui simulerait cette MTND devrait potentiellement explorer l\'arbre entier. Cette subtile définition est le germe mathématique d\'où émergera naturellement la définition de la classe NP en termes de vérificateurs.

#### Complexité en Espace (Space Complexity)

La complexité en espace mesure la quantité de mémoire (le nombre de cases du ruban) utilisée pendant un calcul.

- **Pour une MTD ou une MTND :** Soit M une machine de Turing qui s\'arrête sur toutes les entrées. Pour une entrée w, l\'**espace de calcul** de M sur w, noté spaceM​(w), est le nombre de cases distinctes du (ou des) ruban(s) de travail qui sont visitées par la tête de lecture/écriture au cours du calcul.

  - Pour les machines à plusieurs rubans, on ne compte généralement que l\'espace utilisé sur les rubans de travail, en excluant le ruban d\'entrée (lecture seule) et de sortie (écriture seule), afin de permettre l\'étude de classes de complexité en espace sous-linéaire.

  - Pour une MTND, spaceM​(w) est l\'espace maximal utilisé sur n\'importe quel chemin de l\'arbre de calcul pour l\'entrée w.

### Analyse de la Complexité : Pire Cas, Cas Moyen et Meilleur Cas

Une fois le coût (en temps ou en espace) défini pour une instance unique w, il est nécessaire d\'agréger cette mesure pour toutes les entrées d\'une taille donnée n=∣w∣. Cela donne lieu à trois types d\'analyses distinctes, chacune ayant sa propre pertinence.

#### Complexité dans le Pire des Cas (Worst-Case)

La complexité dans le pire des cas est la mesure la plus fondamentale et la plus utilisée en théorie de la complexité. Elle représente une borne supérieure sur les ressources requises par un algorithme pour toute entrée d\'une taille donnée.

Définition Formelle : La complexité en temps dans le pire des cas d\'une machine M est la fonction TM​:N→N définie par :

TM​(n)=max{timeM​(w)∣w∈Σ∗,∣w∣=n}

De même, la complexité en espace dans le pire des cas est la fonction SM​:N→N définie par :

SM​(n)=max{spaceM​(w)∣w∈Σ∗,∣w∣=n}

Cette analyse est cruciale car elle fournit une garantie de performance. Un algorithme avec une complexité dans le pire des cas TM​(n) ne dépassera jamais cette limite, quelles que soient les spécificités de l\'entrée. C\'est essentiel pour les applications critiques où la fiabilité et la prévisibilité sont primordiales, comme dans les systèmes de contrôle aérien ou les dispositifs médicaux.25

#### Complexité en Cas Moyen (Average-Case)

L\'analyse en cas moyen cherche à caractériser la performance \"typique\" d\'un algorithme, en moyennant les coûts sur toutes les entrées possibles d\'une taille donnée.

Définition Formelle : La complexité en temps en cas moyen d\'une machine M est la fonction AM​:N→R+ définie par :

AM​(n)=w∈Σn∑​P(w)⋅timeM​(w)

où Σn est l\'ensemble des mots de longueur n et P(w) est la probabilité de l\'instance w. Une définition analogue existe pour la complexité en espace.27

Cette analyse est souvent plus représentative de la performance en pratique, car les pires cas peuvent être rares ou artificiels. Cependant, sa principale difficulté réside dans la définition d\'une distribution de probabilité P(w) qui modélise fidèlement les données du monde réel. Une hypothèse courante mais parfois irréaliste est la distribution uniforme, où toutes les entrées de taille n sont équiprobables.

#### Complexité dans le Meilleur des Cas (Best-Case)

La complexité dans le meilleur des cas identifie le scénario le plus favorable pour un algorithme.

Définition Formelle : La complexité en temps dans le meilleur des cas d\'une machine M est la fonction BM​:N→N définie par :

BM​(n)=min{timeM​(w)∣w∈Σ∗,∣w∣=n}

Bien qu\'elle puisse être utile pour comprendre les limites inférieures de la performance d\'un algorithme, cette mesure est rarement utilisée seule car elle est souvent peu informative sur le comportement général. Par exemple, un algorithme de recherche peut avoir une complexité dans le meilleur des cas constante (s\'il trouve l\'élément au premier essai), même si sa performance dans le pire des cas est linéaire ou pire.25

Par convention, sauf mention contraire, le terme \"complexité\" dans ce chapitre et dans la littérature se réfère à la **complexité dans le pire des cas**.

## 6.2 Analyse asymptotique (Notations O, Ω, Θ, o, ω)

L\'analyse de la complexité vise à comprendre le comportement d\'un algorithme lorsque la taille de l\'entrée devient très grande. Le nombre exact d\'opérations, par exemple 3n2+10n+5, est moins important que son ordre de croissance, ici quadratique. L\'analyse asymptotique, à l\'aide des notations de Bachmann-Landau, est l\'outil mathématique qui formalise cette abstraction en se concentrant sur le comportement à la limite, ignorant les constantes multiplicatives et les termes d\'ordre inférieur qui dépendent de l\'implémentation et de la machine.

### Définitions Formelles des Notations Asymptotiques

Soient f,g:N→R+ deux fonctions représentant des complexités.

#### Notation **O** (Grand O) : Borne Supérieure Asymptotique

La notation \"Grand O\" est utilisée pour donner une borne supérieure au taux de croissance d\'une fonction. Elle caractérise la complexité dans le pire des cas d\'un algorithme.

Définition : On dit que f(n) est dans O(g(n)), et on note f(n)∈O(g(n)) ou abusivement f(n)=O(g(n)), s\'il existe des constantes positives c∈R+ et n0​∈N telles que pour tout n≥n0​ :

0≤f(n)≤c⋅g(n)

Intuitivement, cela signifie que pour n suffisamment grand, la fonction f(n) est bornée supérieurement par un multiple constant de g(n). La fonction f ne croît pas asymptotiquement plus vite que g.32

Figure 6.1 : Représentation graphique de f(n)=O(g(n)). La fonction f(n) est bornée supérieurement par c⋅g(n) pour tout n≥n0​.

#### Notation **Ω** (Grand Oméga) : Borne Inférieure Asymptotique

La notation \"Grand Oméga\" fournit une borne inférieure au taux de croissance d\'une fonction. Elle est souvent utilisée pour caractériser la complexité dans le meilleur des cas ou pour établir des bornes inférieures sur la complexité d\'un problème.

Définition : On dit que f(n) est dans Ω(g(n)), noté f(n)∈Ω(g(n)), s\'il existe des constantes positives c∈R+ et n0​∈N telles que pour tout n≥n0​ :

0≤c⋅g(n)≤f(n)

Intuitivement, f(n) croît au moins aussi vite que g(n).32

Figure 6.2 : Représentation graphique de f(n)=Ω(g(n)). La fonction f(n) est bornée inférieurement par c⋅g(n) pour tout n≥n0​.

#### Notation **Θ** (Grand Thêta) : Borne Étanche Asymptotique

La notation \"Grand Thêta\" est la plus précise. Elle indique que le taux de croissance d\'une fonction est encadré à la fois par une borne supérieure et une borne inférieure, basées sur la même fonction de référence. Elle décrit un ordre de croissance exact.

Définition : On dit que f(n) est dans Θ(g(n)), noté f(n)∈Θ(g(n)), si f(n)∈O(g(n)) et f(n)∈Ω(g(n)). De manière équivalente, s\'il existe des constantes positives c1​,c2​∈R+ et n0​∈N telles que pour tout n≥n0​ :

0≤c1​⋅g(n)≤f(n)≤c2​⋅g(n)

Intuitivement, f(n) et g(n) ont le même taux de croissance asymptotique.32

!(https://i.imgur.com/5wQ4u3s.png)

Figure 6.3 : Représentation graphique de f(n)=Θ(g(n)). La fonction f(n) est \"prise en sandwich\" entre c1​⋅g(n) et c2​⋅g(n) pour tout n≥n0​.

#### Notations **o** (Petit o) et **ω** (Petit oméga) : Bornes Strictes

Ces notations sont utilisées pour exprimer des relations de croissance strictes, analogues aux inégalités strictes \< et \>.

Définition (Petit o) : On dit que f(n) est dans o(g(n)), noté f(n)∈o(g(n)), si pour toute constante c\>0, il existe une constante n0​∈N telle que pour tout n≥n0​ :

\$\$0 \\le f(n) \< c \\cdot g(n)\$\$Une définition équivalente utilisant les limites est :\$\$\\lim\_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0\$\$

Intuitivement, f(n) devient insignifiante par rapport à g(n) lorsque n grandit ; f croît strictement moins vite que g.33

Définition (Petit oméga) : On dit que f(n) est dans ω(g(n)), noté f(n)∈ω(g(n)), si g(n)∈o(f(n)). De manière équivalente :

n→∞lim​g(n)f(n)​=∞

Intuitivement, f croît strictement plus vite que g.33

### Propriétés des Notations Asymptotiques

Ces notations définissent des relations sur les fonctions qui possèdent des propriétés mathématiques fondamentales, analogues à celles des relations d\'ordre et d\'équivalence sur les nombres. La démonstration rigoureuse de ces propriétés est ce qui confère sa solidité à l\'analyse de complexité.

#### Réflexivité

Toute fonction est une borne asymptotique pour elle-même.

- f(n)∈O(f(n))

- f(n)∈Ω(f(n))

- f(n)∈Θ(f(n))

Preuve pour O(f(n)) :

Nous devons trouver des constantes c\>0 et n0​≥1 telles que f(n)≤c⋅f(n) pour tout n≥n0​. En choisissant c=1 et n0​=1, l\'inégalité f(n)≤1⋅f(n) est trivialement vraie pour toute fonction positive. Les preuves pour Ω et Θ sont similaires (en choisissant c=1 pour Ω, et c1​=c2​=1 pour Θ).38

#### Transitivité

Cette propriété est la plus cruciale pour l\'analyse de complexité, car elle permet de chaîner les relations.

- Si f(n)∈O(g(n)) et g(n)∈O(h(n)), alors f(n)∈O(h(n)).

- La propriété est également valable pour Ω,Θ,o,ω.

**Preuve pour O :**

1.  Par hypothèse, f(n)∈O(g(n)), donc il existe c1​\>0 et n1​ tels que f(n)≤c1​⋅g(n) pour tout n≥n1​.

2.  Par hypothèse, g(n)∈O(h(n)), donc il existe c2​\>0 et n2​ tels que g(n)≤c2​⋅h(n) pour tout n≥n2​.

3.  Posons n0​=max(n1​,n2​). Pour tout n≥n0​, les deux inégalités sont valides.

4.  Nous pouvons donc écrire : f(n)≤c1​⋅g(n)≤c1​⋅(c2​⋅h(n))=(c1​c2​)⋅h(n).

5.  En posant c=c1​c2​, nous avons f(n)≤c⋅h(n) pour tout n≥n0​.

6.  Par définition, f(n)∈O(h(n)).

La transitivité n\'est pas un simple exercice mathématique ; elle est le fondement logique de la théorie de la NP-complétude. C\'est cette propriété qui nous autorisera plus tard à construire des chaînes de réductions (A≤p​B et B≤p​C implique A≤p​C), permettant ainsi de propager la \"difficulté\" d\'un problème à un autre et de bâtir toute la structure hiérarchique des problèmes NP-complets.

#### Symétrie et Symétrie Transposée

- **Symétrie (pour Θ) :** f(n)∈Θ(g(n))⟺g(n)∈Θ(f(n)). Cette propriété fait de Θ une relation d\'équivalence.

- **Symétrie Transposée :** f(n)∈O(g(n))⟺g(n)∈Ω(f(n)). Cette dualité est une conséquence directe des définitions.

Le tableau suivant résume ces propriétés :

  ----------------------- ---------- ---------- ---------- ---------- ----------
  Propriété               O          Ω          Θ          o          ω

  **Réflexivité**         Oui        Oui        Oui        Non        Non

  **Symétrie**            Non        Non        Oui        Non        Non

  **Transitivité**        Oui        Oui        Oui        Oui        Oui

  **Relation Analogue**   ≤          ≥          =          \<         \>
  ----------------------- ---------- ---------- ---------- ---------- ----------

## 6.3 Classes de Complexité Fondamentales

Armés des outils de l\'analyse asymptotique, nous pouvons maintenant commencer à classifier les problèmes en fonction de leurs besoins en ressources. Cette classification donne naissance à un \"bestiaire\" de classes de complexité, dont les deux plus fondamentales sont **P** et **NP**.

### 6.3.1 La classe P

La classe **P** est la première et la plus intuitive des classes de complexité. Elle représente l\'ensemble des problèmes de décision qui peuvent être résolus \"efficacement\".

#### Définition Formelle

La classe **P** (pour Polynomial time) est l\'ensemble de tous les langages (ou problèmes de décision) qui peuvent être décidés par une machine de Turing **déterministe** en un temps polynomial par rapport à la taille de l\'entrée.

P=k∈N⋃​DTIME(nk)

Où DTIME(f(n)) est l\'ensemble des langages décidables par une MTD en temps O(f(n)). Un algorithme dont la complexité en temps est bornée par un polynôme en la taille de l\'entrée est appelé un

**algorithme polynomial**.

#### La Thèse de Cobham-Edmonds : L\'Équation \"Polynomial = Traitable\"

Pourquoi le temps polynomial est-il le critère de l\'efficacité? La **thèse de Cobham-Edmonds**, formulée indépendamment par Alan Cobham et Jack Edmonds au milieu des années 1960, postule que la classe **P** correspond à l\'ensemble des problèmes qui sont \"pratiquement solubles\" ou \"traitables\" (en anglais, *computationally tractable*).

Cette thèse repose sur plusieurs arguments solides :

1.  **Robustesse du modèle :** La classe **P** est remarquablement insensible au modèle de calcul déterministe choisi. Un problème qui est polynomial sur une machine de Turing à un ruban le sera aussi sur une machine à plusieurs rubans ou sur une machine à accès aléatoire (RAM), le modèle qui se rapproche le plus d\'un ordinateur réel. Les surcoûts de simulation entre ces modèles sont polynomiaux.

2.  **Propriétés de clôture :** La classe des algorithmes polynomiaux est fermée par composition. Un algorithme polynomial qui appelle en sous-routine un autre algorithme polynomial reste globalement polynomial. Cela correspond à notre pratique de la programmation modulaire.

3.  **Distinction pratique :** Il existe une différence spectaculaire entre la croissance des fonctions polynomiales (ex: n2,n3) et celle des fonctions exponentielles (ex: 2n,n!). Pour des entrées de taille modeste (par exemple, n=50), un algorithme en n3 est réalisable, tandis qu\'un algorithme en 2n exigerait plus de temps que l\'âge de l\'univers.

Il est important de noter que cette thèse est une abstraction. Un algorithme en O(n100) est polynomial mais totalement impraticable, tandis qu\'un algorithme en O(2n/1000) est exponentiel mais peut être très efficace pour des valeurs de n rencontrées en pratique. Néanmoins, la thèse de Cobham-Edmonds s\'est avérée être une ligne de démarcation extraordinairement utile et prédictive pour séparer les problèmes traitables des problèmes intrinsèquement difficiles.

#### Exemples Détaillés de Problèmes dans P

De nombreux problèmes fondamentaux en informatique appartiennent à la classe **P**.

- **Recherche du plus court chemin dans un graphe :** Étant donné un graphe orienté ou non, avec des poids positifs sur les arêtes, et deux sommets s (source) et t (destination), le problème est de trouver un chemin de s à t de poids total minimal. L\'**algorithme de Dijkstra** résout ce problème. Avec une implémentation utilisant un tas binaire, sa complexité est de O((∣E∣+∣V∣)log∣V∣), où ∣V∣ est le nombre de sommets et ∣E∣ le nombre d\'arêtes. C\'est une complexité polynomiale en la taille de l\'entrée (qui est de l\'ordre de ∣V∣+∣E∣), donc ce problème est dans **P**.

- **Produit de deux matrices :** Le calcul du produit de deux matrices n×n par l\'algorithme standard, basé sur la définition, requiert n3 multiplications et n2(n−1) additions, soit une complexité en Θ(n3). Des algorithmes plus sophistiqués, comme celui de Strassen, réduisent cette complexité à environ O(n2.807), et des algorithmes encore plus avancés existent. Tous sont polynomiaux, plaçant ce problème dans **P**.

- **Test de primalité :** Étant donné un entier N, déterminer s\'il est un nombre premier. Pendant longtemps, on ne connaissait pas d\'algorithme polynomial déterministe pour ce problème. Il était dans **NP**, mais on ne savait pas s\'il était dans **P**. Ce n\'est qu\'en 2002 que Manindra Agrawal, Neeraj Kayal et Nitin Saxena ont publié l\'**algorithme AKS**, qui résout le problème en temps polynomial, prouvant ainsi que le test de primalité est dans **P**.

- **2-SAT :** Le problème de satisfiabilité pour des formules booléennes où chaque clause contient au plus deux littéraux. Contrairement à sa version généralisée (SAT) ou à 3-SAT, 2-SAT peut être résolu en temps linéaire en construisant un graphe d\'implications et en cherchant des composantes fortement connexes. Si une variable et sa négation se trouvent dans la même composante, la formule est insatisfiable ; sinon, elle l\'est.

### 6.3.2 La classe NP et le problème P vs NP

La classe **NP** est sans doute la classe de complexité la plus célèbre et la plus étudiée. Elle capture un grand nombre de problèmes d\'optimisation et de recherche qui apparaissent constamment en pratique, et dont la résolution efficace reste un défi majeur.

#### Définitions Équivalentes de NP

Il existe deux manières formelles et équivalentes de définir la classe **NP**, chacune offrant un éclairage différent sur sa nature.

##### 1. Via le Non-déterminisme (NTIME)

La première définition, qui donne son nom à la classe (**N**ondeterministic **P**olynomial time), est une extension directe de la définition de **P** au modèle non déterministe.

**Définition 1 :** La classe **NP** est l\'ensemble de tous les langages qui peuvent être décidés par une **machine de Turing non déterministe** en un temps polynomial par rapport à la taille de l\'entrée.

NP=k∈N⋃​NTIME(nk)

Cette définition modélise l\'idée d\'une recherche par force brute massivement parallèle. La machine \"devine\" une solution potentielle et la vérifie ensuite. Grâce au non-déterminisme, l\'étape de \"divination\" est considérée comme une seule opération.

##### 2. Via la Vérification (Certificat/Témoin)

La seconde définition est souvent plus intuitive et plus utile en pratique. Elle caractérise les problèmes de **NP** non pas par la difficulté de *trouver* une solution, mais par la facilité de *vérifier* une solution si elle est fournie.

Définition 2 : Un langage L est dans NP s\'il existe un algorithme déterministe en temps polynomial V (appelé vérificateur) et un polynôme p tels que pour toute entrée x :

x∈L⟺∃c,∣c∣≤p(∣x∣) tel que V(x,c)=accepte

La chaîne c est appelée un certificat ou un témoin. Elle sert de \"preuve\" que x appartient au langage L. Le vérificateur V prend l\'instance du problème x et le certificat c et doit confirmer en temps polynomial si le certificat est valide.11

Par exemple, pour le problème du **Circuit Hamiltonien** (existe-t-il un cycle qui visite chaque sommet exactement une fois?), une instance x est un graphe G. Un certificat c serait une permutation des sommets. Le vérificateur V n\'a qu\'à vérifier si cette permutation forme bien un cycle dans G, ce qui est faisable en temps polynomial. Trouver le cycle peut être très difficile, mais le vérifier est facile.

#### Preuve de l\'Équivalence des Définitions

La puissance de ces deux définitions réside dans leur équivalence.

Preuve (Définition 1 ⟹ Définition 2) :

Supposons qu\'un langage L est dans NTIME(p(n)) pour un polynôme p. Il existe donc une MTND M qui décide L en temps p(n). Pour une entrée x∈L, il existe au moins un chemin de calcul acceptant dans l\'arbre de calcul de M. La séquence des choix non déterministes le long de ce chemin constitue un certificat c. La longueur de ce chemin, et donc de c, est au plus p(∣x∣).

On peut construire un vérificateur déterministe V(x,c) qui simule M sur l\'entrée x, en utilisant les choix spécifiés par c à chaque étape non déterministe. Cette simulation est déterministe et s\'exécute en temps polynomial, car la longueur du chemin est polynomiale. Si la simulation aboutit à un état d\'acceptation, V accepte ; sinon, il rejette. Ainsi, L possède un vérificateur polynomial.56

Preuve (Définition 2 ⟹ Définition 1) :

Supposons qu\'un langage L possède un vérificateur déterministe V qui s\'exécute en temps p(n), et que la taille du certificat est bornée par q(n). On peut construire une MTND M pour décider L comme suit :

1.  **Phase de divination (non déterministe) :** Pour une entrée x de taille n, M écrit non déterministement une chaîne c de longueur q(n) sur un ruban de travail. Cela prend q(n) étapes.

2.  Phase de vérification (déterministe) : M simule ensuite le vérificateur déterministe V sur l\'entrée (x,c). Cette simulation prend un temps polynomial p(∣x∣+∣c∣).\
    Si V accepte, M accepte. Si V rejette, cette branche de calcul de M rejette.\
    Si x∈L, il existe un certificat c qui fera accepter V. La MTND M trouvera ce chemin de calcul (par définition de l\'acceptation non déterministe). La complexité totale de M est la somme des complexités des deux phases, ce qui reste polynomial. Donc, L est dans NTIME.56

#### Le Problème P vs NP

L\'inclusion P⊆NP est directe. Si un problème est dans **P**, il est résolu par une MTD polynomiale. Cette MTD peut être vue comme une MTND qui n\'utilise jamais le non-déterminisme. De manière équivalente, si un problème est dans **P**, on peut construire un vérificateur qui ignore simplement le certificat et résout le problème directement en temps polynomial.

La question fondamentale, posée au début des années 1970, est de savoir si cette inclusion est stricte :

Est-ce que P=NP?

C\'est le problème P versus NP. Il demande si tout problème pour lequel une solution peut être vérifiée rapidement peut également être résolu rapidement. Malgré des décennies d\'efforts par les plus grands esprits de l\'informatique et des mathématiques, ce problème reste non résolu. Il est l\'un des sept Problèmes du Prix du Millénaire, chacun doté d\'un prix d\'un million de dollars par l\'Institut de mathématiques Clay.7

#### Implications Profondes de la Résolution

La réponse à cette question aurait des conséquences cataclysmiques, bien au-delà de l\'informatique théorique.

- **Si P = NP :**

  - **Révolution en Optimisation et en Science :** Des milliers de problèmes NP-complets (les plus difficiles de NP, que nous verrons bientôt) deviendraient traitables. Cela inclut des problèmes au cœur de la logistique (problème du voyageur de commerce), de la bio-informatique (repliement des protéines, conception de médicaments), de l\'intelligence artificielle (apprentissage automatique, planification), de l\'économie (allocation optimale des ressources) et de l\'ingénierie (conception de circuits, vérification de programmes). La capacité de résoudre ces problèmes de manière optimale transformerait radicalement l\'industrie et la recherche scientifique.

  - **Effondrement de la Cryptographie Moderne :** La sécurité de la plupart des protocoles cryptographiques à clé publique (comme RSA) repose sur la difficulté supposée de problèmes comme la factorisation d\'entiers ou le calcul du logarithme discret. Ces problèmes sont dans **NP**. Si P=NP, des algorithmes polynomiaux pour les résoudre existeraient probablement, rendant obsolètes la quasi-totalité de l\'infrastructure de sécurité d\'Internet, des transactions bancaires aux communications sécurisées.

  - **Automatisation de la Créativité :** D\'un point de vue philosophique, P=NP signifierait que l\'acte de \"trouver\" une solution (ou une preuve mathématique, une composition musicale, une stratégie économique) n\'est pas fondamentalement plus difficile que de \"vérifier\" sa validité. La créativité, dans de nombreux domaines, pourrait être automatisée. Trouver une preuve mathématique deviendrait une tâche mécanique, changeant à jamais la nature de la recherche.

- **Si P ≠ NP :**

  - **Confirmation des Limites Intrinsèques :** Cela confirmerait l\'intuition de la plupart des chercheurs : il existe une classe de problèmes intrinsèquement \"difficiles\" que nous ne pourrons jamais résoudre de manière optimale et efficace.

  - **Justification des Approches Actuelles :** Cela validerait formellement la nécessité des domaines de recherche actuels qui visent à contourner cette difficulté : les algorithmes d\'approximation (qui cherchent des solutions quasi-optimales), les algorithmes probabilistes, les heuristiques et les solveurs SAT/SMT qui, bien qu\'exponentiels dans le pire des cas, sont remarquablement efficaces sur de nombreuses instances pratiques.

  - **Fondement pour une Cryptographie Sûre :** La preuve que P≠NP renforcerait la confiance dans les fondements de la cryptographie moderne, en garantissant qu\'il existe bien une asymétrie fondamentale entre la difficulté de casser un code et la facilité de l\'utiliser avec la bonne clé.

Cette question est bien plus qu\'une énigme technique ; elle interroge la nature même de la résolution de problèmes et les limites fondamentales de notre capacité à calculer et à créer. L\'asymétrie apparente entre la découverte et la validation est-elle une caractéristique fondamentale de notre univers computationnel, ou simplement le reflet de notre ignorance algorithmique actuelle? C\'est le cœur du problème P vs NP.

## 6.4 NP-Complétude

Face à la difficulté de résoudre la question P vs NP, les chercheurs ont développé un outil puissant pour classifier les problèmes au sein de NP : la théorie de la **NP-complétude**. Cette théorie permet d\'identifier les problèmes qui sont, en un sens, les \"plus difficiles\" de la classe NP. Si un seul de ces problèmes pouvait être résolu en temps polynomial, alors tous les problèmes de NP le pourraient aussi, et on aurait P = NP.

### 6.4.1 Réductions Polynomiales

Le concept central pour comparer la difficulté relative des problèmes est la **réduction polynomiale**.

#### Définition Formelle

Intuitivement, un problème A se réduit à un problème B si l\'on peut utiliser un algorithme pour B comme une sous-routine pour résoudre A. La réduction en temps polynomial, ou réduction de Karp, formalise cette idée en exigeant que la traduction d\'une instance de A en une instance de B soit elle-même efficace.

**Définition :** Soient L1​ et L2​ deux langages (problèmes de décision). On dit que L1​ est **réductible en temps polynomial** à L2​, noté L1​≤p​L2​, s\'il existe une fonction f:Σ∗→Σ∗ qui satisfait les deux conditions suivantes :

1.  f est calculable par une machine de Turing déterministe en temps polynomial.

2.  Pour tout mot w∈Σ∗, on a l\'équivalence : w∈L1​⟺f(w)∈L2​.

La fonction f est appelée la **fonction de réduction**.

#### Importance Cruciale de la Réduction

La relation ≤p​ est une relation de pré-ordre (réflexive et transitive) sur l\'ensemble des problèmes de décision. Son importance découle du théorème suivant :

**Théorème :** Si L1​≤p​L2​ et L2​∈P, alors L1​∈P.

**Preuve :** Pour décider si un mot w est dans L1​, on procède en deux étapes :

1.  Calculer f(w) en utilisant l\'algorithme polynomial pour la réduction. Soit pf​ le polynôme qui borne ce temps.

2.  Utiliser l\'algorithme polynomial pour L2​ pour décider si f(w)∈L2​. Soit pL2​​ le polynôme qui borne ce temps.\
    La taille de f(w) est elle-même polynomiale en la taille de w. Le temps total est donc une composition de polynômes, ce qui reste un polynôme. L\'algorithme global est donc polynomial.71

Ce théorème a un corollaire puissant : si L1​≤p​L2​ et que l\'on sait que L1​∈/P, alors on peut conclure que L2​∈/P. La réduction permet de propager la \"difficulté\".

#### NP-Difficulté et NP-Complétude

Ces définitions permettent de formaliser la notion de \"problème le plus difficile\" dans NP.

Définition (NP-Difficulté) : Un problème H est dit NP-difficile (NP-hard) si tout problème L de la classe NP se réduit polynomialement à H.

∀L∈NP,L≤p​H

Un problème NP-difficile est donc au moins aussi difficile que n\'importe quel problème dans NP. Notons qu\'un problème NP-difficile n\'a pas besoin d\'être lui-même dans NP. Par exemple, le problème de l\'arrêt est NP-difficile (car il est indécidable, donc plus difficile que tout problème dans NP), mais il n\'est pas dans NP.73

**Définition (NP-Complétude) :** Un problème C est dit **NP-complet** (NP-complete) s\'il satisfait deux conditions :

1.  C∈NP (le problème est dans NP).

2.  C est NP-difficile.

Les problèmes NP-complets sont donc les problèmes les plus difficiles *au sein* de la classe NP. Ils capturent l\'essence de la difficulté de toute la classe. La découverte d\'un algorithme polynomial pour un seul problème NP-complet entraînerait l\'effondrement de la hiérarchie : P = NP.

### 6.4.2 Théorème de Cook-Levin (Problème SAT)

La théorie de la NP-complétude serait une coquille vide s\'il n\'existait aucun problème NP-complet. Le **théorème de Cook-Levin** est le résultat fondateur qui a établi l\'existence d\'un tel problème, fournissant le point d\'ancrage pour toutes les preuves de NP-complétude qui ont suivi.

**Problème SAT (Satisfiabilité Booléenne) :**

- **Instance :** Une formule booléenne ϕ en forme normale conjonctive (FNC), c\'est-à-dire une conjonction (ET) de clauses, où chaque clause est une disjonction (OU) de littéraux (une variable ou sa négation).

- **Question :** Existe-t-il une assignation de valeurs de vérité (vrai/faux) aux variables de ϕ qui rend la formule entière vraie?

**Théorème (Cook, 1971 ; Levin, 1973) :** Le problème **SAT** est NP-complet.

#### Esquisse de Preuve Détaillée

La preuve se déroule en deux étapes : montrer que SAT est dans NP, puis montrer qu\'il est NP-difficile.

**1. SAT est dans NP**

Cette partie est relativement simple. Pour une instance donnée (une formule ϕ), un certificat est une assignation de valeurs de vérité à toutes les variables. Le vérificateur est un algorithme qui :

1.  Prend en entrée la formule ϕ et une assignation.

2.  Substitue les valeurs de vérité dans la formule.

3.  Évalue chaque clause, puis la conjonction de toutes les clauses.\
    Ce processus peut être accompli en temps linéaire par rapport à la taille de la formule. Donc, SAT est dans NP.77

**2. SAT est NP-difficile**

C\'est le cœur de la preuve. Nous devons montrer que tout langage L∈NP se réduit polynomialement à SAT. C\'est-à-dire, pour un langage L quelconque dans NP et une entrée w, nous devons construire en temps polynomial une formule booléenne ϕw​ qui est satisfiable si et seulement si w∈L.

La preuve repose sur la simulation du calcul d\'une machine de Turing non déterministe par une formule booléenne.

- Le Tableau de Calcul :\
  Soit L∈NP. Par définition, il existe une MTND M qui décide L en temps polynomial p(n), où n=∣w∣. Un calcul de M sur w peut être visualisé comme un tableau (une \"computation history\") où chaque ligne représente une configuration de la machine à un instant t. Le tableau a une hauteur de p(n) (le nombre d\'étapes) et une largeur de p(n) (le nombre maximal de cases de ruban utilisées).77

- Les Variables Booléennes :\
  Nous créons un ensemble de variables booléennes pour décrire ce tableau. Ces variables vont encoder l\'état de la machine, la position de la tête et le contenu du ruban à chaque instant.

  - Qt,q​ : Vrai si, à l\'étape t, la machine est dans l\'état q.

  - Ht,i​ : Vrai si, à l\'étape t, la tête de lecture est à la position i.

  - St,i,σ​ : Vrai si, à l\'étape t, la case i du ruban contient le symbole σ.\
    Le nombre total de ces variables est polynomial en n, car t et i vont jusqu\'à p(n), et le nombre d\'états et de symboles est constant.78

- Les Clauses de la Formule ϕw​ :\
  La formule ϕw​ est une conjonction de plusieurs sous-formules, chacune imposant une contrainte pour que le tableau représente un calcul valide et acceptant.

  1.  **ϕcell​ :** Assure la cohérence du tableau. Pour chaque cellule (t,i) du tableau, elle doit contenir exactement un symbole. Cela se traduit par des clauses comme (⋁σ∈Γ​St,i,σ​) et (¬St,i,σ1​​∨¬St,i,σ2​​) pour σ1​=σ2​. Des clauses similaires garantissent un seul état et une seule position de tête à chaque instant.

  2.  **ϕstart​ :** Encode la configuration initiale. À t=0, la machine est dans l\'état q0​, la tête est à la position 0, et le ruban contient l\'entrée w suivie de symboles blancs.

  3.  **ϕmove​ :** C\'est la partie la plus complexe. Elle encode la logique de la fonction de transition δ de la MTND M. Pour chaque \"fenêtre\" locale de 2x3 cases dans le tableau (centrée sur la case (t,i)), cette sous-formule garantit que le contenu de la case (t+1,i) est une conséquence légale du contenu des trois cases (t,i−1),(t,i),(t,i+1) et de l\'état de la machine. Si la tête n\'est pas sur la case i à l\'instant t, le symbole ne doit pas changer. Si la tête est sur la case i, le changement d\'état, de symbole et de position de la tête doit correspondre à l\'une des transitions possibles dans δ.

  4.  **ϕaccept​ :** Assure que le calcul est acceptant. Elle stipule qu\'à la dernière étape, t=p(n), la machine doit être dans un état d\'acceptation : ⋁q∈F​Qp(n),q​.

- Conclusion de la Preuve :\
  La formule finale est ϕw​=ϕcell​∧ϕstart​∧ϕmove​∧ϕaccept​.

  - Si w∈L, il existe un calcul acceptant de M sur w. Les valeurs des variables booléennes correspondant à ce calcul (par exemple, Qt,q​ est vrai si la machine est en état q à l\'instant t) satisferont toutes les clauses de ϕw​. Donc, ϕw​ est satisfiable.

  - Réciproquement, si ϕw​ est satisfiable, toute assignation satisfaisante correspond à un tableau de calcul valide qui commence par la configuration initiale et se termine dans un état d\'acceptation. Cela implique qu\'il existe un calcul acceptant pour w, donc w∈L.\
    La construction de la formule ϕw​ est purement mécanique et sa taille est polynomiale en ∣w∣, donc la réduction est polynomiale. SAT est donc NP-difficile. Combiné au fait que SAT est dans NP, le théorème est prouvé.77

### 6.4.3 Exemples de Problèmes NP-Complets

Une fois que l\'on dispose d\'un premier problème NP-complet (SAT), on peut en prouver d\'autres par transitivité. Il suffit de montrer que LNPC​≤p​Lnouveau​ pour un problème LNPC​ déjà connu comme NP-complet, et de prouver que Lnouveau​∈NP.

#### Réduction de SAT à 3-SAT

**Problème 3-SAT :** Une restriction de SAT où chaque clause de la formule FNC doit contenir **exactement** trois littéraux.

**Théorème :** 3-SAT est NP-complet.

**Preuve :**

1.  **3-SAT ∈ NP :** Trivial, pour la même raison que SAT.

2.  **SAT ≤p​ 3-SAT :** Nous devons transformer une formule SAT quelconque ϕ en une formule 3-SAT ϕ′ équisatisfiable. Pour chaque clause C de ϕ :

    - **Si C a 1 littéral (l1​) :** On la remplace par (l1​∨y1​∨y2​)∧(l1​∨¬y1​∨y2​)∧(l1​∨y1​∨¬y2​)∧(l1​∨¬y1​∨¬y2​), où y1​,y2​ sont de nouvelles variables. Cette conjonction est vraie si et seulement si l1​ est vrai.

    - **Si C a 2 littéraux (l1​∨l2​) :** On la remplace par (l1​∨l2​∨y1​)∧(l1​∨l2​∨¬y1​).

    - **Si C a 3 littéraux :** On la garde telle quelle.

    - Si C a k\>3 littéraux (l1​∨⋯∨lk​) : On introduit k−3 nouvelles variables y1​,...,yk−3​ et on remplace C par la conjonction de k−2 clauses :\
      \
      (l1​∨l2​∨y1​)∧(¬y1​∨l3​∨y2​)∧⋯∧(¬yk−3​∨lk−1​∨lk​)\
      \
      On peut prouver que la clause originale est satisfiable si et seulement si cette nouvelle conjonction de clauses l\'est. La transformation est clairement polynomiale.54

#### Réduction de 3-SAT à CLIQUE

**Problème CLIQUE :**

- **Instance :** Un graphe non orienté G=(V,E) et un entier k.

- **Question :** Existe-t-il un sous-ensemble de sommets V′⊆V de taille ∣V′∣=k tel que chaque paire de sommets dans V′ est connectée par une arête (formant une clique)?

**Théorème :** CLIQUE est NP-complet.

**Preuve :**

1.  **CLIQUE ∈ NP :** Le certificat est un ensemble de k sommets. Le vérificateur vérifie en temps polynomial si toutes les paires de sommets de cet ensemble sont bien reliées par une arête.

2.  **3-SAT ≤p​ CLIQUE :** Soit ϕ une formule 3-SAT avec m clauses C1​,...,Cm​. Nous construisons une instance (G,k) de CLIQUE.

    - **Construction de G :** On pose k=m. Pour chaque littéral li,j​ (le j-ème littéral de la i-ème clause), on crée un sommet vi,j​ dans le graphe G.

    - **Ajout des arêtes :** On ajoute une arête entre deux sommets vi,j​ et vi′,j′​ si et seulement si deux conditions sont remplies :

      1.  Ils proviennent de clauses différentes (i=i′).

      2.  Ils ne sont pas contradictoires (on n\'a pas li,j​=¬li′,j′​).

    - **Preuve de la réduction :**

      - (⇒) Si ϕ est satisfiable, il existe une assignation qui rend au moins un littéral vrai dans chaque clause. Choisissons un de ces littéraux vrais dans chaque clause Ci​. L\'ensemble des m sommets correspondants forme une clique de taille m=k dans G. En effet, tous ces sommets proviennent de clauses différentes, et ils ne peuvent pas être contradictoires car ils sont tous vrais dans la même assignation.

      - (⇐) Si G a une clique de taille k=m, cette clique doit contenir exactement un sommet par \"groupe\" de clause (car les sommets d\'un même groupe ne sont pas connectés entre eux). On peut alors construire une assignation satisfaisante : pour chaque sommet vi,j​ dans la clique, on assigne la valeur \"vrai\" au littéral correspondant li,j​. Comme il n\'y a pas d\'arête entre des littéraux contradictoires, cette assignation est cohérente et satisfait donc ϕ.\
        La construction du graphe est polynomiale en la taille de ϕ.85

#### Réduction de CLIQUE à VERTEX-COVER

**Problème VERTEX-COVER (Couverture par sommets) :**

- **Instance :** Un graphe G=(V,E) et un entier k.

- **Question :** Existe-t-il un sous-ensemble de sommets V′⊆V de taille ∣V′∣≤k tel que chaque arête de E a au moins une de ses extrémités dans V′?

**Théorème :** VERTEX-COVER est NP-complet.

**Preuve :**

1.  **VERTEX-COVER ∈ NP :** Le certificat est un ensemble de k sommets. Le vérificateur parcourt toutes les arêtes du graphe et s\'assure que chacune est incidente à au moins un sommet du certificat. C\'est polynomial.

2.  **CLIQUE ≤p​ VERTEX-COVER :** Soit (G=(V,E),k) une instance de CLIQUE. On construit une instance (G′,k′) de VERTEX-COVER.

    - **Construction :** On pose G′=Gˉ, le graphe **complémentaire** de G (mêmes sommets, mais une arête existe dans Gˉ si et seulement si elle n\'existe pas dans G). On pose k′=∣V∣−k.

    - **Preuve de la réduction :** On montre l\'équivalence : G a une clique de taille k⟺Gˉ a une couverture par sommets de taille ∣V∣−k.

      - Soit C une clique de taille k dans G. Par définition, il n\'y a aucune arête entre les sommets de C dans Gˉ. Donc, pour toute arête (u,v) de Gˉ, au moins un des sommets u ou v ne doit pas être dans C. Cela signifie que l\'ensemble V∖C est une couverture par sommets de Gˉ. Sa taille est ∣V∣−k.

      - Réciproquement, soit S une couverture de taille ∣V∣−k dans Gˉ. Alors, pour toute arête (u,v) de Gˉ, on a u∈S ou v∈S. Par contraposée, si u∈/S et v∈/S, alors (u,v) n\'est pas une arête de Gˉ, ce qui signifie que c\'est une arête de G. L\'ensemble V∖S, de taille k, est donc une clique dans G.\
        Le calcul du graphe complémentaire est polynomial.89

#### Réduction de 3-SAT à HAMILTONIAN-PATH

**Problème HAMILTONIAN-PATH (Chemin Hamiltonien) :**

- **Instance :** Un graphe orienté G=(V,E).

- **Question :** Existe-t-il un chemin simple qui visite chaque sommet de V exactement une fois?

**Théorème :** HAMILTONIAN-PATH est NP-complet.

Preuve :

Cette réduction est plus complexe et repose sur la construction de \"gadgets\" dans le graphe pour simuler la logique de la formule 3-SAT.

1.  **HAM-PATH ∈ NP :** Un certificat est une permutation des sommets. Le vérificateur vérifie si les arêtes correspondantes existent dans le graphe.

2.  **3-SAT ≤p​ HAM-PATH :** Soit ϕ une formule 3-SAT avec n variables x1​,...,xn​ et m clauses C1​,...,Cm​.

    - **Gadget de variable :** Pour chaque variable xi​, on crée une structure en \"diamant\" ou une longue chaîne de sommets. Un chemin hamiltonien ne peut traverser cette structure que de deux manières : de \"gauche à droite\" (ce qui correspondra à xi​=vrai) ou de \"droite à gauche\" (xi​=faux).

    - **Gadget de clause :** Pour chaque clause Cj​, on crée un unique sommet cj​.

    - **Connexions :** On relie les gadgets de variables en série. Ensuite, on connecte les gadgets de variables aux gadgets de clauses. Si le littéral xi​ apparaît dans la clause Cj​, on ajoute des arêtes permettant un détour du chemin \"gauche-droite\" du gadget de xi​ pour passer par le sommet cj​. Si ¬xi​ apparaît dans Cj​, on ajoute des arêtes pour un détour depuis le chemin \"droite-gauche\".

    - **Preuve de la réduction :** Un chemin hamiltonien doit visiter tous les sommets, y compris ceux des clauses. Pour visiter un sommet de clause cj​, le chemin doit emprunter l\'un des détours prévus. Ce détour n\'est possible que si le chemin traverse le gadget de variable correspondant dans la \"bonne\" direction (celle qui rend le littéral vrai). Donc, un chemin hamiltonien existe si et seulement si on peut choisir une direction pour chaque gadget de variable (une assignation de vérité) de telle sorte que chaque sommet de clause soit visité (chaque clause est satisfaite).

#### Réduction de HAMILTONIAN-PATH à TSP (décision)

**Problème TSP (Voyageur de Commerce, version décision) :**

- **Instance :** Un ensemble de n villes, une matrice de distances d(vi​,vj​) entre chaque paire de villes, et un budget B.

- **Question :** Existe-t-il un tour (un cycle qui visite chaque ville exactement une fois) de longueur totale inférieure ou égale à B?

**Théorème :** TSP (décision) est NP-complet.

**Preuve :**

1.  **TSP ∈ NP :** Le certificat est une permutation des villes. Le vérificateur calcule la longueur du tour et la compare à B.

2.  **HAMILTONIAN-PATH ≤p​ TSP :** On peut réduire la version **HAMILTONIAN-CYCLE** (qui est aussi NP-complète) à TSP, ce qui est légèrement plus simple. Soit G=(V,E) une instance de HAM-CYCLE. On construit une instance de TSP.

    - Construction : L\'ensemble des villes est V. On définit les distances comme suit pour chaque paire de villes (u,v) :\
      \
      d(u,v)={12​si (u,v)∈Esinon​\
      \
      On pose le budget B=∣V∣.

    - **Preuve de la réduction :**

      - (⇒) Si G a un cycle hamiltonien, ce cycle est un tour dans l\'instance de TSP. Sa longueur est la somme des poids des arêtes, qui sont toutes à 1. La longueur totale est donc ∣V∣, ce qui respecte le budget B.

      - (⇐) Si l\'instance de TSP a un tour de longueur ≤∣V∣, ce tour doit nécessairement n\'emprunter que des arêtes de poids 1 (car s\'il utilisait ne serait-ce qu\'une arête de poids 2, la longueur totale serait \>∣V∣). Un tour de longueur ∣V∣ utilisant uniquement des arêtes de poids 1 correspond exactement à un cycle hamiltonien dans le graphe original G.\
        Cette chaîne de réductions illustre la puissance du concept de NP-complétude. La difficulté inhérente d\'un problème de logique booléenne (3-SAT) se propage à des problèmes de graphes (CLIQUE, VERTEX-COVER, HAM-PATH) et finalement à un problème d\'optimisation numérique fondamental (TSP), révélant une connexion profonde et inattendue entre des domaines apparemment très éloignés.

## 6.5 Au-delà de NP

Si la distinction entre **P** et **NP** est au cœur de la théorie de la complexité, elle n\'est que le point de départ d\'une cartographie bien plus vaste et complexe du paysage computationnel. De nombreuses autres classes de complexité ont été définies pour capturer différentes nuances de difficulté, que ce soit en considérant des ressources autres que le temps déterministe, ou en explorant des modèles de calcul plus exotiques.

### 6.5.1 Classes co-NP et la Hiérarchie Polynomiale

La définition de **NP** est intrinsèquement asymétrique : elle concerne les problèmes pour lesquels une réponse \"OUI\" possède un certificat court et facile à vérifier. Qu\'en est-il des problèmes pour lesquels une réponse \"NON\" est facile à vérifier?

#### La Classe co-NP

Définition : La classe co-NP est l\'ensemble des langages L dont le complément Lˉ=Σ∗∖L est dans NP.

co−NP={L∣Lˉ∈NP}

De manière équivalente, un problème est dans co-NP s\'il existe un vérificateur polynomial V tel que pour toute instance x :

x∈L⟺∀c,∣c∣≤p(∣x∣),V(x,c)=accepte

Cela signifie qu\'une réponse \"NON\" (c\'est-à-dire x∈/L) peut être démontrée par un contre-exemple (un certificat c tel que V(x,c) rejette).45

- Exemple : TAUTOLOGY\
  Le problème TAUTOLOGY demande si une formule booléenne donnée est une tautologie (vraie pour toutes les assignations de variables). Ce problème est dans co-NP. Son complément est le problème de savoir si une formule n\'est pas une tautologie, ce qui est équivalent à demander si elle est satisfiable par au moins une assignation qui la rend fausse. Le complément de TAUTOLOGY est donc équivalent à SAT, qui est dans NP.

#### Le Problème NP vs co-NP

On sait que P⊆NP et P⊆co−NP (car **P** est fermée par complémentation). Cependant, la relation entre **NP** et **co-NP** est une question ouverte majeure.

- On ne sait pas si NP=co−NP.

- On conjecture fortement que NP=co−NP.

- Si l\'on pouvait prouver que NP=co−NP, cela impliquerait immédiatement que P=NP. En effet, si P=NP, alors comme **P** est fermée par complémentation (P=co−P), on aurait NP=P=co−P=co−NP.

#### La Hiérarchie Polynomiale (PH)

La hiérarchie polynomiale est une généralisation des classes **P**, **NP** et **co-NP** qui forme une tour infinie de classes de complexité de plus en plus puissantes. Elle est définie en utilisant des machines de Turing polynomiales avec accès à un **oracle**. Un oracle est une \"boîte noire\" capable de résoudre instantanément un problème d\'une classe de complexité donnée.

**Définition par Oracles :**

- Δ0p​=Σ0p​=Π0p​=P

- Pour k≥0 :

  - Δk+1p​=PΣkp​ (problèmes résolus en temps polynomial avec un oracle pour un problème de Σkp​)

  - Σk+1p​=NPΣkp​ (problèmes résolus par une MTND polynomiale avec un oracle pour Σkp​)

  - Πk+1p​=co−NPΣkp​

On a ainsi :

- Σ1p​=NP

- Π1p​=co−NP

- Σ2p​=NPNP

Une définition équivalente et plus intuitive utilise des quantificateurs alternés. Un langage L est dans Σkp​ s\'il peut être défini par une formule avec k quantificateurs alternés commençant par un quantificateur existentiel, suivi d\'un prédicat polynomial.

L={x∣∃y1​∀y2​...Qk​yk​,V(x,y1​,...,yk​)}

où V est un prédicat vérifiable en temps polynomial et la taille des yi​ est polynomiale en ∣x∣.

La hiérarchie polynomiale est l\'union de toutes ces classes :

PH=k≥0⋃​Σkp​

Si à un certain niveau k, on a Σkp​=Πkp​, alors la hiérarchie \"s\'effondre\" à ce niveau, c\'est-à-dire que PH=Σkp​. La conjecture P=NP est équivalente à l\'affirmation que la hiérarchie ne s\'effondre pas au niveau 0. La conjecture NP=co−NP est équivalente à l\'affirmation qu\'elle ne s\'effondre pas au niveau 1.98

### 6.5.2 Complexité en Espace

La complexité en espace se concentre sur la quantité de mémoire requise pour résoudre un problème, plutôt que sur le temps de calcul.

#### Les Classes de Complexité en Espace

- **L (Logarithmic Space) :** La classe des problèmes de décision résolubles par une MTD en espace O(logn). L\'espace logarithmique est très faible ; il ne permet même pas de stocker l\'entrée en mémoire. On utilise un modèle de machine avec un ruban d\'entrée en lecture seule et un ou plusieurs rubans de travail. Seul l\'espace sur les rubans de travail est compté.

- **NL (Nondeterministic Logarithmic Space) :** La classe des problèmes résolubles par une MTND en espace O(logn).

- PSPACE (Polynomial Space) : La classe des problèmes résolubles par une MTD en espace polynomial, O(nk).\
  \
  PSPACE=k∈N⋃​DSPACE(nk)

- **NPSPACE (Nondeterministic Polynomial Space) :** La classe des problèmes résolubles par une MTND en espace polynomial.

#### Le Théorème de Savitch

Contrairement au temps, où le non-déterminisme est supposé apporter une puissance de calcul supplémentaire (P vs NP), en matière d\'espace, ce n\'est pas le cas pour les bornes polynomiales (et supérieures). C\'est le résultat fondamental du théorème de Savitch.

Théorème (Savitch, 1970) : Pour toute fonction s(n)≥logn,

NSPACE(s(n))⊆DSPACE(s(n)2)

Ce théorème stipule que tout algorithme non déterministe utilisant un espace s(n) peut être simulé par un algorithme déterministe utilisant un espace quadratique, s(n)2.

Conséquence Majeure : Une conséquence directe et profonde de ce théorème est l\'égalité des classes polynomiales en espace :

PSPACE=NPSPACE

La preuve du théorème de Savitch repose sur un algorithme récursif déterministe qui vérifie l\'accessibilité entre deux configurations d\'une MTND. En utilisant une approche de type \"diviser pour régner\", il vérifie s\'il existe une configuration intermédiaire, réduisant ainsi la profondeur de la récursion au détriment d\'un recalcul, ce qui permet de conserver un espace de pile limité.11

#### Relations entre les Classes de Temps et d\'Espace

Nous avons maintenant une hiérarchie plus complète des classes de complexité. Les relations connues sont les suivantes :

\$\$ \\mathbf{L} \\subseteq \\mathbf{NL} \\subseteq \\mathbf{P} \\subseteq \\mathbf{NP} \\subseteq \\mathbf{PSPACE} \\subseteq \\mathbf{EXPTIME} \$\$

- P⊆PSPACE : Un calcul en temps polynomial ne peut explorer qu\'un nombre polynomial de cases mémoire.

- NP⊆PSPACE : On peut simuler une MTND polynomiale en temps en explorant tout son arbre de calcul. L\'espace requis pour cela est polynomial (on peut réutiliser l\'espace pour chaque branche).

- PSPACE⊆EXPTIME : Une machine utilisant un espace polynomial p(n) ne peut avoir qu\'un nombre fini de configurations distinctes (de l\'ordre de 2O(p(n))). Si le calcul dure plus longtemps, il doit boucler. Un algorithme peut donc détecter les boucles et s\'arrêter en temps au plus exponentiel.

Les théorèmes de hiérarchie en temps et en espace prouvent que certaines de ces inclusions sont strictes : L=PSPACE et P=EXPTIME. Cependant, toutes les autres inclusions (NL vs P, P vs NP, NP vs PSPACE) sont conjecturées strictes, mais non prouvées.

### 6.5.3 Classes de Complexité Probabilistes

Les algorithmes déterministes et non déterministes ne sont pas les seuls modèles de calcul. L\'introduction de l\'aléa dans les algorithmes a donné naissance à une famille riche et puissante de classes de complexité.

#### La Machine de Turing Probabiliste

Une machine de Turing probabiliste est une MTND où, à chaque étape, chaque choix possible est assorti d\'une probabilité (typiquement, une machine qui peut \"lancer une pièce\" et prendre une transition ou une autre avec une probabilité de 1/2).

#### Définitions des Classes Probabilistes

Les classes probabilistes sont définies en fonction de la probabilité d\'erreur de l\'algorithme.

- RP (Randomized Polynomial Time) :\
  Cette classe capture les problèmes avec des algorithmes probabilistes à erreur unilatérale.\
  Un langage L est dans RP si il existe un algorithme probabiliste en temps polynomial A tel que :

  - Si x∈L, alors P(A(x) accepte)≥1/2.

  - Si x∈/L, alors P(A(x) accepte)=0.\
    L\'algorithme ne peut se tromper que pour les instances positives (faux négatifs), mais jamais pour les instances négatives (pas de faux positifs). La probabilité de succès peut être amplifiée à une valeur arbitrairement proche de 1 en répétant l\'algorithme.

- BPP (Bounded-error Probabilistic Polynomial Time) :\
  Cette classe est considérée comme la véritable classe des problèmes \"efficacement solubles\" par des moyens probabilistes. Elle autorise une erreur bilatérale, mais bornée.\
  Un langage L est dans BPP si il existe un algorithme probabiliste en temps polynomial A tel que :

  - Si x∈L, alors P(A(x) accepte)≥2/3.

  - Si x∈/L, alors P(A(x) accepte)≤1/3.\
    La \"marge\" entre 2/3 et 1/3 garantit que la probabilité d\'erreur est significativement inférieure à 1/2. Comme pour RP, cette probabilité peut être rendue arbitrairement faible par répétition.

- ZPP (Zero-error Probabilistic Polynomial Time) :\
  Cette classe correspond aux algorithmes de type \"Las Vegas\". Ils ne se trompent jamais, mais leur temps d\'exécution peut varier.\
  Un langage L est dans ZPP si il existe un algorithme probabiliste A qui retourne toujours la bonne réponse (\"OUI\" ou \"NON\") et dont le temps d\'exécution attendu (en moyenne) est polynomial.\
  On peut montrer que ZPP=RP∩co−RP.

#### Relations et Conjectures

Les relations suivantes sont connues :

P⊆ZPP⊆RP⊆BPP

RP⊆NP

La relation entre BPP et NP est inconnue. Cependant, une conjecture majeure en théorie de la complexité est que l\'aléa n\'ajoute pas fondamentalement de puissance de calcul. De nombreux résultats en \"dérandomisation\" suggèrent que les algorithmes probabilistes pourraient être simulés par des algorithmes déterministes sans surcoût exponentiel.

**Conjecture :** P=BPP.

Si cette conjecture était vraie, cela signifierait que tout ce qui peut être calculé efficacement avec des pièces de monnaie peut aussi l\'être sans.

L\'existence de ce riche \"zoo\" de classes de complexité, dont la plupart des questions de séparation restent ouvertes, met en lumière une réalité fondamentale de l\'informatique théorique : nous sommes devenus experts dans la classification des problèmes et la compréhension de leurs relations relatives (via les réductions), mais nous restons profondément ignorants quant à la puissance de calcul absolue requise pour les résoudre. La théorie de la complexité nous a fourni une carte détaillée de notre propre ignorance.

### Tableau Récapitulatif des Classes de Complexité Majeures

  ------------- ----------------------------------- -------------------------------------------------------------------- ----------------------------------------- --------------------------
  Classe        Définition Formelle                 Définition Intuitive                                                 Problème Complet Typique                  Relations Connues

  **P**         ⋃k​DTIME(nk)                         Problèmes résolubles efficacement (déterministe).                    \- (Ex: Plus court chemin)                P⊆NP

  **NP**        ⋃k​NTIME(nk)                         Problèmes dont une solution est vérifiable efficacement.             SAT, 3-SAT, CLIQUE                        P⊆NP⊆PSPACE

  **co-NP**     {L∣Lˉ∈NP}                           Problèmes dont un contre-exemple est vérifiable efficacement.        TAUTOLOGY                                 P⊆co−NP

  **PSPACE**    ⋃k​DSPACE(nk)                        Problèmes résolubles avec une mémoire polynomiale.                   QSAT, Échecs généralisés                  NP⊆PSPACE=NPSPACE

  **EXPTIME**   ⋃k​DTIME(2nk)                        Problèmes résolubles en temps exponentiel.                           Go généralisé                             PSPACE⊆EXPTIME

  **L**         DSPACE(logn)                        Problèmes résolubles avec une mémoire logarithmique.                 \- (Ex: Palindrome)                       L⊆NL⊆P

  **NL**        NSPACE(logn)                        Problèmes résolubles en mémoire log. (non déterministe).             PATH (Accessibilité)                      NL=co−NL

  **BPP**       Prob. bornée, temps poly.           Problèmes résolubles efficacement avec un algorithme probabiliste.   \-                                        P⊆BPP (conjecturé P=BPP)

  **RP**        Erreur unilatérale, temps poly.     Problèmes \"OUI\" détectables rapidement par hasard.                 \- (Ex: Test de primalité Miller-Rabin)   ZPP⊆RP⊆NP

  **ZPP**       Erreur nulle, temps poly. attendu   Problèmes résolubles efficacement et sans erreur par hasard.         \-                                        P⊆ZPP=RP∩co−RP
  ------------- ----------------------------------- -------------------------------------------------------------------- ----------------------------------------- --------------------------
