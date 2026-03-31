# Chapitre I.2 : Structures Discrètes et Combinatoire

## Introduction

Les sciences et le génie informatiques reposent sur la manipulation d\'informations et l\'exécution de processus qui sont, par leur nature même, fondamentalement discrets. Contrairement aux mathématiques du continu, telles que l\'analyse et le calcul infinitésimal qui décrivent des phénomènes fluides et ininterrompus, les mathématiques discrètes s\'attachent à l\'étude d\'objets distincts et dénombrables. Un programme informatique est une séquence finie d\'instructions ; les données sont stockées dans des structures composées d\'un nombre fini d\'éléments (bits, octets, enregistrements) ; les réseaux de communication sont des ensembles de nœuds interconnectés par des liens. Chacun de ces exemples illustre un système dont les composantes peuvent être comptées, énumérées et traitées comme des unités individuelles.

Ce chapitre se consacre à l\'exploration des structures discrètes et de la combinatoire, qui constituent le langage formel et l\'arsenal d\'outils indispensables à la modélisation et à l\'analyse des systèmes informatiques complexes. Les structures discrètes, telles que les ensembles, les relations et les fonctions, fournissent le cadre conceptuel pour organiser l\'information, tandis que la combinatoire, l\'art du dénombrement, nous permet de quantifier les configurations possibles, d\'évaluer la complexité des algorithmes et de fonder la théorie des probabilités sur des bases solides.

Notre parcours débutera par les fondements les plus élémentaires : la théorie des ensembles. Nous établirons comment ce langage, avec ses opérations et ses propriétés, correspond de manière profonde à la logique propositionnelle qui sous-tend tout calcul. Nous explorerons ensuite comment les relations et les fonctions permettent d\'imposer une structure à ces ensembles, créant des notions aussi fondamentales que l\'équivalence et l\'ordre, essentielles à la classification et à l\'optimisation.

Armés de ces outils structurels, nous nous tournerons vers l\'analyse combinatoire pour apprendre à compter de manière systématique et efficace. Ces techniques de dénombrement nous mèneront naturellement à l\'arithmétique modulaire et à la théorie des nombres, domaines dont l\'élégance théorique se révèle d\'une importance pratique capitale, notamment en cryptographie.

Enfin, le chapitre culminera avec l\'étude de concepts avancés qui illustrent la puissance de l\'approche discrète. Nous aborderons la notion de cardinalité pour comparer la taille des infinis, ce qui nous conduira à l\'une des limitations les plus profondes de l\'informatique : l\'existence de problèmes non calculables. Nous introduirons les relations de récurrence et les fonctions génératrices, des outils puissants pour l\'analyse d\'algorithmes. Une introduction aux probabilités discrètes nous permettra de formaliser l\'analyse en cas moyen et le raisonnement en présence d\'incertitude. Pour synthétiser l\'ensemble de ces connaissances, nous conclurons par une étude de cas détaillée de l\'algorithme de cryptographie RSA, un système complexe dont la conception, la validité et la sécurité reposent entièrement sur les principes des structures discrètes et de la théorie des nombres explorés dans ce chapitre.

## Section 1 : Les Fondements -- La Théorie des Ensembles

La théorie des ensembles est le socle sur lequel reposent les mathématiques modernes et, par extension, une grande partie de l\'informatique théorique. Elle fournit un langage formel pour décrire des collections d\'objets et des opérations logiques sur ces collections. La maîtrise de ce langage est un prérequis essentiel, car il permet de définir avec précision les structures de données, les espaces d\'états d\'un système ou encore les domaines de validité d\'un algorithme.

### 1.1 Ensembles et Éléments

#### Définitions formelles

Un **ensemble** est une collection d\'objets bien définis et distincts, appelés ses **éléments**. La notion d\'ensemble est primitive, c\'est-à-dire qu\'on ne la définit pas à partir de concepts plus simples, mais on l\'appréhende par ses propriétés. Le caractère \"bien défini\" signifie que pour n\'importe quel objet, on doit pouvoir déterminer sans ambiguïté s\'il appartient ou non à l\'ensemble. Le caractère \"distinct\" signifie qu\'un élément ne peut pas apparaître plus d\'une fois dans un ensemble.

Il existe deux manières principales de décrire un ensemble  :

1.  **En extension :** en énumérant tous ses éléments entre accolades. Par exemple, l\'ensemble A des voyelles de l\'alphabet français s\'écrit A={a,e,i,o,u,y}. L\'ordre des éléments n\'a pas d\'importance : {a,e,i}={i,a,e}.

2.  **En compréhension :** en décrivant une propriété commune à tous ses éléments. On utilise la notation {x∣P(x)}, qui se lit \"l\'ensemble des x tels que la propriété P(x) est vraie\". Par exemple, l\'ensemble B des entiers naturels pairs peut s\'écrire B={x∈N∣∃k∈N,x=2k}.

#### Notations et concepts de base

- **Appartenance :** Si un objet x est un élément de l\'ensemble E, on note x∈E. Dans le cas contraire, on note x∈/E.

- **Inclusion :** Un ensemble A est **inclus** dans un ensemble B, ou est un **sous-ensemble** de B, si tous les éléments de A sont aussi des éléments de B. On note A⊆B. Formellement : A⊆B⟺(∀x,x∈A⟹x∈B). La notation\
  A⊂B est souvent utilisée pour signifier la même chose, mais peut parfois désigner une inclusion stricte (A⊆B et A=B).

- **Égalité :** Deux ensembles A et B sont égaux s\'ils ont exactement les mêmes éléments. Cela se démontre par le principe de **double inclusion** : A=B⟺(A⊆B∧B⊆A).

Il est crucial de distinguer l\'appartenance de l\'inclusion. Par exemple, si E={1,2,3}, alors 2∈E, mais {2}⊆E. L\'élément 2 n\'est pas un ensemble, tandis que {2} est un ensemble (un singleton).

#### Ensembles spécifiques

- **L\'ensemble vide :** C\'est l\'ensemble qui ne contient aucun élément. Il est noté ∅ ou {}. Pour tout ensemble\
  A, on a toujours ∅⊆A.

- **Le singleton :** C\'est un ensemble qui ne contient qu\'un seul élément, comme {x}.

- **L\'ensemble des parties :** Pour tout ensemble E, l\'ensemble de tous les sous-ensembles de E est appelé **l\'ensemble des parties** de E, et est noté P(E). Formellement,\
  P(E)={A∣A⊆E}. Par exemple, si E={1,2}, alors P(E)={∅,{1},{2},{1,2}}. Il est important de noter que si\
  x∈E, alors {x}∈P(E). Si un ensemble\
  E est fini et contient n éléments, son ensemble des parties P(E) contient 2n éléments.

### 1.2 Opérations sur les Ensembles

À partir d\'ensembles existants, on peut en construire de nouveaux à l\'aide d\'opérations fondamentales, souvent visualisées à l\'aide de diagrammes de Venn.

- **Union (ou Réunion) :** L\'union de deux ensembles A et B, notée A∪B, est l\'ensemble de tous les éléments qui appartiennent à A, ou à B, ou aux deux.\
  A∪B={x∣x∈A∨x∈B}

- **Intersection :** L\'intersection de deux ensembles A et B, notée A∩B, est l\'ensemble de tous les éléments qui appartiennent à la fois à A et à B.\
  A∩B={x∣x∈A∧x∈B}\
  \
  Si A∩B=∅, on dit que les ensembles A et B sont disjoints.5

- **Complémentaire :** Si A est un sous-ensemble d\'un ensemble universel U, le complémentaire de A dans U, noté Ac ou ∁U​A, est l\'ensemble de tous les éléments de U qui n\'appartiennent pas à A.\
  Ac={x∈U∣x∈/A}

- **Différence :** La différence de A et B, notée A∖B, est l\'ensemble des éléments qui sont dans A mais pas dans B. On a\
  A∖B=A∩Bc.

- **Différence symétrique :** La différence symétrique de A et B, notée AΔB, est l\'ensemble des éléments qui appartiennent à A ou à B, mais pas aux deux. On a\
  AΔB=(A∖B)∪(B∖A)=(A∪B)∖(A∩B).

- **Produit cartésien :** Le produit cartésien de deux ensembles A et B, noté A×B, est l\'ensemble de tous les **couples ordonnés** (a,b) où a∈A et b∈B.\
  A×B={(a,b)∣a∈A∧b∈B}\
  \
  L\'ordre dans un couple est primordial : si a=b, alors (a,b)=(b,a), contrairement à la paire {a,b}={b,a}.3 Le plan cartésien\
  R×R=R2 est l\'exemple le plus connu de produit cartésien.

### 1.3 Propriétés des Opérations Ensemblistes

Les opérations ensemblistes obéissent à un ensemble de règles algébriques qui structurent leur manipulation et sont essentielles pour les démonstrations formelles. Ces règles sont analogues à celles de l\'algèbre des nombres, mais avec des spécificités propres.

- **Commutativité :** L\'ordre des opérandes ne change pas le résultat.

  - A∪B=B∪A

  - A∩B=B∩A

- **Associativité :** Le groupement des opérations ne change pas le résultat, ce qui permet d\'omettre les parenthèses dans des expressions comme A∪B∪C.

  - (A∪B)∪C=A∪(B∪C)

  - (A∩B)∩C=A∩(B∩C)

- **Idempotence :** Opérer un ensemble avec lui-même ne le change pas.

  - A∪A=A

  - A∩A=A

- **Absorption :** Une opération peut \"absorber\" l\'autre dans certaines conditions.

  - A∪(A∩B)=A

  - A∩(A∪B)=A

- **Éléments neutres :** L\'ensemble vide est l\'élément neutre de l\'union, et l\'ensemble universel U est celui de l\'intersection.

  - A∪∅=A

  - A∩U=A

Deux propriétés particulièrement importantes sont la distributivité et les lois de De Morgan. Elles établissent un pont direct entre la théorie des ensembles et la logique propositionnelle, révélant que ces deux formalismes sont deux facettes d\'une même structure sous-jacente : une algèbre de Boole. Chaque opération ensembliste (∪, ∩, \^c) correspond à un connecteur logique (∨ pour OU, ∧ pour ET, ¬ pour NON). Ainsi, une preuve d\'identité ensembliste peut être directement traduite en une preuve d\'équivalence logique, et vice-versa. Cette correspondance est fondamentale en informatique, où la manipulation de données (ensembles) et l\'exécution de conditions logiques sont omniprésentes.

#### Distributivité

L\'intersection est distributive par rapport à l\'union, et l\'union est distributive par rapport à l\'intersection.

1.  **Distributivité de l\'intersection sur l\'union :** A∩(B∪C)=(A∩B)∪(A∩C)

2.  **Distributivité de l\'union sur l\'intersection :** A∪(B∩C)=(A∪B)∩(A∪C)

Démonstration de la première loi de distributivité :

Pour prouver l\'égalité A∩(B∪C)=(A∩B)∪(A∩C), nous utilisons le principe de double inclusion.9

- Première inclusion : Montrons que A∩(B∪C)⊆(A∩B)∪(A∩C).\
  Soit x∈A∩(B∪C). Par définition de l\'intersection, cela signifie que (x∈A)∧(x∈B∪C).\
  Par définition de l\'union, x∈B∪C signifie (x∈B)∨(x∈C).\
  Donc, nous avons x∈A∧(x∈B∨x∈C).\
  En logique, l\'opérateur ET (∧) est distributif sur l\'opérateur OU (∨), donc cette proposition est équivalente à (x∈A∧x∈B)∨(x∈A∧x∈C).\
  La première partie, (x∈A∧x∈B), signifie x∈A∩B.\
  La seconde partie, (x∈A∧x∈C), signifie x∈A∩C.\
  La proposition complète devient donc (x∈A∩B)∨(x∈A∩C), ce qui, par définition de l\'union, signifie x∈(A∩B)∪(A∩C).\
  Ainsi, tout élément du premier ensemble est aussi dans le second, ce qui prouve l\'inclusion.15

- Seconde inclusion : Montrons que (A∩B)∪(A∩C)⊆A∩(B∪C).\
  Soit x∈(A∩B)∪(A∩C). Par définition de l\'union, cela signifie que (x∈A∩B)∨(x∈A∩C).

  - **Cas 1 :** x∈A∩B. Alors x∈A et x∈B. Si x∈B, alors il est aussi dans B∪C. Comme x est aussi dans A, on a x∈A∩(B∪C).

  - Cas 2 : x∈A∩C. Alors x∈A et x∈C. Si x∈C, alors il est aussi dans B∪C. Comme x est aussi dans A, on a x∈A∩(B∪C).\
    Dans les deux cas, x appartient à A∩(B∪C). L\'inclusion est donc prouvée.15

Les deux inclusions étant vérifiées, l\'égalité est démontrée. La preuve de la distributivité de l\'union sur l\'intersection suit un raisonnement analogue.

#### Lois de De Morgan

Les lois de De Morgan décrivent comment le complémentaire interagit avec l\'union et l\'intersection.

1.  ∁(A∪B)=∁A∩∁B

2.  ∁(A∩B)=∁A∪∁B

Démonstration de la première loi de De Morgan :

Nous allons prouver l\'égalité par équivalences logiques successives, ce qui est plus direct que la double inclusion.17

Un élément x appartient au complémentaire de A∪B si et seulement s\'il n\'appartient pas à A∪B.

\\begin{align\*} x \\in \\complement(A \\cup B) & \\iff x \\notin (A \\cup B) \\ & \\iff \\neg(x \\in A \\cup B) \\ & \\iff \\neg(x \\in A \\lor x \\in B) \\quad \\text{(par définition de l\'union)} \\ & \\iff (\\neg(x \\in A)) \\land (\\neg(x \\in B)) \\quad \\text{(par la loi de De Morgan en logique)} \\ & \\iff (x \\notin A) \\land (x \\notin B) \\ & \\iff (x \\in \\complement A) \\land (x \\in \\complement B) \\quad \\text{(par définition du complémentaire)} \\ & \\iff x \\in (\\complement A \\cap \\complement B) \\quad \\text{(par définition de l\'intersection)} \\end{align\*}

Comme l\'appartenance à l\'ensemble de gauche est logiquement équivalente à l\'appartenance à l\'ensemble de droite pour n\'importe quel élément x, les deux ensembles sont égaux.17 La démonstration de la seconde loi est similaire.

## Section 2 : Relations et Fonctions -- Structurer l\'Information

Si les ensembles permettent de regrouper des objets, les **relations** et les **fonctions** permettent d\'établir des liens et des correspondances entre ces objets. Elles sont le fondement de la modélisation de presque toutes les structures en informatique, des bases de données relationnelles aux graphes de dépendances, en passant par les hiérarchies de classes en programmation orientée objet.

### 2.1 Relations Binaires

Une **relation binaire** R d\'un ensemble A vers un ensemble B est formellement définie comme un sous-ensemble du produit cartésien A×B. Si (a,b)∈R, on dit que \"a est en relation avec b\" et on note aRb. Lorsque

A=B, on parle de relation binaire sur l\'ensemble A.

#### Propriétés des relations binaires

Les relations binaires peuvent posséder plusieurs propriétés fondamentales qui déterminent leur nature et leurs applications. Soit R une relation sur un ensemble E.

- Réflexivité : R est réflexive si chaque élément est en relation avec lui-même.\
  \
  ∀x∈E,xRx

  - **Exemple :** La relation \"inférieur ou égal à\" (≤) sur R est réflexive car x≤x pour tout réel x. L\'inclusion (\
    ⊆) sur P(E) est aussi réflexive car A⊆A pour toute partie A.

  - **Contre-exemple :** La relation \"strictement inférieur à\" (\<) sur R n\'est pas réflexive car x\<x est faux.

- Symétrie : R est symétrique si, lorsque x est en relation avec y, alors y est aussi en relation avec x.\
  \
  ∀x,y∈E,(xRy⟹yRx)

  - **Exemple :** La relation d\'égalité (=) sur N est symétrique car si m=n, alors n=m. La relation \"est marié(e) à\" sur un ensemble de personnes est symétrique.

  - **Contre-exemple :** La relation ≤ sur R n\'est pas symétrique. Par exemple, 3≤5 mais 5≤3.

- Antisymétrie : R est antisymétrique si les seuls éléments qui sont mutuellement en relation sont les éléments égaux à eux-mêmes.\
  \
  ∀x,y∈E,((xRy∧yRx)⟹x=y)

  - **Exemple :** La relation de divisibilité sur N∗ est antisymétrique. Si a divise b et b divise a, alors a=b. La relation ≤ sur R est également antisymétrique, car si x≤y et y≤x, alors x=y.

  - **Contre-exemple :** La relation \"différent de\" (=) sur N n\'est pas antisymétrique. On a 0=1 et 1=0, mais 0=1.

- Transitivité : R est transitive si un lien entre x et y et un lien entre y et z impliquent un lien direct entre x et z.\
  \
  ∀x,y,z∈E,((xRy∧yRz)⟹xRz)

  - **Exemple :** La relation de divisibilité sur N est transitive. Si a divise b et b divise c, alors a divise c. L\'inclusion est aussi transitive.

  - **Contre-exemple :** La relation \"est l\'ami(e) de\" n\'est pas transitive. La relation = sur N n\'est pas transitive : 0=1 et 1=0, mais 0=0 est faux.

Ces propriétés ne sont pas de simples classifications ; elles agissent comme des axiomes qui, une fois combinés, définissent des structures mathématiques de première importance. La symétrie et l\'antisymétrie, par exemple, sont des propriétés presque mutuellement exclusives (une relation peut être les deux seulement si son graphe est un sous-ensemble de la diagonale ). Cette distinction crée une bifurcation fondamentale dans la nature des relations : celles qui modélisent une forme de \"similitude\" ou d\' \"interchangeabilité\" (les relations d\'équivalence) et celles qui modélisent une \"précedence\" ou une \"hiérarchie\" (les relations d\'ordre). Cette dualité est au cœur de nombreux paradigmes algorithmiques : les algorithmes de regroupement (clustering) cherchent à identifier des classes d\'équivalence, tandis que les algorithmes de tri ou de planification topologique cherchent à établir une relation d\'ordre.

  ----------------------- ----------------- ----------- --------------------- ---------------------------------------- ----------------------------
  Relation                Ensemble          Réflexive   Symétrique            Antisymétrique                           Transitive

  Égalité (=)             Z                 Oui         Oui                   Oui                                      Oui

  Inférieur ou égal (≤)   R                 Oui         Non (3≤5 mais 5≤3)   Oui                                      Oui

  Divisibilité (\$        \$)               N∗          Oui                   Non (\$2                                 4\$ mais 4∤2)

  Congruence (≡(modn))    Z                 Oui         Oui                   Non (2≡5(mod3) et 5≡2(mod3) mais 2=5)   Oui

  Inclusion (⊆)           P(E)              Oui         Non                   Oui                                      Oui

  Perpendicularité (⊥)    Droites du plan   Non         Oui                   Non                                      Non (d1​⊥d2​ et d2​⊥d3​⟹d1​∥d3​)
  ----------------------- ----------------- ----------- --------------------- ---------------------------------------- ----------------------------

### 2.2 Relations d\'Équivalence

Une **relation d\'équivalence** est une relation binaire qui est à la fois **réflexive, symétrique et transitive** (RST). Elle généralise la notion d\'égalité et permet de regrouper des éléments qui partagent une propriété commune.

- **Exemples :**

  - L\'égalité sur n\'importe quel ensemble.

  - La congruence modulo n sur Z : a≡b(modn) si n divise a−b.

  - La relation \"avoir la même parité\" sur N.

  - La relation \"être parallèle à\" sur l\'ensemble des droites du plan.

#### Classes d\'équivalence et Partition

Le concept central associé à une relation d\'équivalence ∼ sur un ensemble E est celui de **classe d\'équivalence**. Pour tout élément x∈E, sa classe d\'équivalence, notée \[x\] ou xˉ, est l\'ensemble de tous les éléments de E qui sont équivalents à x.

\[x\]={y∈E∣x∼y}

Les classes d\'équivalence possèdent une propriété fondamentale : pour deux éléments quelconques x et y de E, leurs classes \[x\] et \[y\] sont soit strictement identiques, soit totalement disjointes.26

∀x,y∈E,(\[x\]=\[y\])∨(\[x\]∩\[y\]=∅)

Cette propriété découle directement des axiomes RST. Si deux classes \[x\] et \[y\] ont un élément commun z, alors x∼z et y∼z. Par symétrie, z∼y. Par transitivité, x∼y. On peut alors montrer que tout élément de \[x\] est dans \[y\] et vice-versa, prouvant que \[x\]=\[y\].29

Il en résulte qu\'une relation d\'équivalence induit une **partition** de l\'ensemble E, c\'est-à-dire une décomposition de E en une collection de sous-ensembles non vides, deux à deux disjoints, dont l\'union est E tout entier. Chaque sous-ensemble de la partition est une classe d\'équivalence.

L\'ensemble de toutes les classes d\'équivalence est appelé l\'**ensemble quotient** de E par ∼, noté E/∼. Par exemple, pour la congruence modulo 3 sur Z, il y a trois classes d\'équivalence : \$ = {\\dots, -3, 0, 3, 6, \\dots}\$, \$ = \\{\\dots, -2, 1, 4, 7, \\dots\\}\$, et \$ = {\\dots, -1, 2, 5, 8, \\dots}\$. L\'ensemble quotient est Z/3Z={,,}.

### 2.3 Relations d\'Ordre

Une **relation d\'ordre** est une relation binaire qui est **réflexive, antisymétrique et transitive** (RAT). Elle formalise la notion intuitive de comparaison ou de hiérarchie. Un ensemble muni d\'une relation d\'ordre est appelé un

**ensemble partiellement ordonné** (en anglais, *partially ordered set* ou **poset**).

- **Ordre partiel et ordre total :**

  - Un ordre est dit **partiel** si certains éléments peuvent être incomparables. C\'est-à-dire, il peut exister x,y∈E tels que x≤y et y≤x.

    - **Exemple :** La relation de divisibilité sur N∗. Les entiers 2 et 3 sont incomparables car 2 ne divise pas 3 et 3 ne divise pas 2. L\'inclusion sur\
      P({a,b,c}) est un ordre partiel : {a} et {b} sont incomparables.

  - Un ordre est dit **total** (ou linéaire) si tous les éléments sont comparables. Un ensemble muni d\'un ordre total est appelé une **chaîne**.

    - **Exemple :** La relation ≤ sur R est un ordre total.

- **Éléments remarquables dans un poset (E,≤) :**

  - Un élément m∈E est **minimal** si aucun autre élément n\'est strictement plus petit que lui (∀x∈E,x≤m⟹x=m).

  - Un élément M∈E est **maximal** si aucun autre élément n\'est strictement plus grand que lui (∀x∈E,m≤x⟹x=m).

  - Un élément m0​∈E est le **plus petit élément** (ou minimum) s\'il est plus petit que tous les autres éléments (∀x∈E,m0​≤x). S\'il existe, il est unique et est le seul élément minimal.

  - Un élément M0​∈E est le **plus grand élément** (ou maximum) s\'il est plus grand que tous les autres éléments (∀x∈E,x≤M0​). S\'il existe, il est unique et est le seul élément maximal.

#### Diagrammes de Hasse

Pour visualiser la structure d\'un ensemble ordonné **fini**, on utilise un **diagramme de Hasse**. C\'est une représentation graphique simplifiée de la relation d\'ordre qui élimine les informations redondantes. La construction suit trois règles  :

1.  Les éléments de l\'ensemble sont représentés par des points (ou sommets).

2.  Si x\<y, le point représentant y est placé plus haut que celui représentant x.

3.  Un segment de droite relie x à y si et seulement si y **recouvre** x, c\'est-à-dire x\<y et il n\'existe aucun z tel que x\<z\<y.

Grâce à ces conventions, les arêtes dues à la réflexivité (boucles sur chaque sommet) et à la transitivité (raccourcis) sont omises, et l\'orientation des arêtes est implicite (toujours de bas en haut).

**Exemple :** Le diagramme de Hasse pour la relation de divisibilité sur l\'ensemble des diviseurs de 12, D12​={1,2,3,4,6,12}, est le suivant  :

> Extrait de code

graph TD\
1 \--\> 2;\
1 \--\> 3;\
2 \--\> 4;\
2 \--\> 6;\
3 \--\> 6;\
4 \--\> 12;\
6 \--\> 12;

Ce diagramme montre que 1 est le plus petit élément, 12 est le plus grand. Les éléments 4 et 6 sont maximaux dans le sous-ensemble {1,2,3,4,6}, mais ne sont pas comparables entre eux.

### 2.4 Fonctions

Une **fonction** (ou application) f d\'un ensemble de départ E (le **domaine**) vers un ensemble d\'arrivée F (le **codomaine**) est une relation binaire de E vers F telle que chaque élément de E est associé à **un et un seul** élément de F. On note

f:E→F.

#### Injection, Surjection, Bijection

- **Injection :** Une fonction f:E→F est **injective** (ou une injection) si des éléments distincts du domaine ont toujours des images distinctes dans le codomaine.\
  ∀x1​,x2​∈E,(f(x1​)=f(x2​)⟹x1​=x2​)\
  \
  Cela signifie que tout élément de F a au plus un antécédent.16 Si\
  E et F sont finis, une injection n\'est possible que si ∣E∣≤∣F∣.

- **Surjection :** Une fonction f:E→F est **surjective** (ou une surjection) si chaque élément du codomaine est l\'image d\'au moins un élément du domaine.\
  ∀y∈F,∃x∈E,f(x)=y\
  \
  Cela signifie que l\'image de la fonction est égale à son codomaine, f(E)=F.16 Si\
  E et F sont finis, une surjection n\'est possible que si ∣E∣≥∣F∣.

- **Bijection :** Une fonction f:E→F est **bijective** (ou une bijection) si elle est à la fois injective et surjective.\
  ∀y∈F,∃!x∈E,f(x)=y\
  \
  Cela signifie que chaque élément de F a un unique antécédent. Une bijection établit une correspondance un-à-un entre les éléments de E et de F. Si E et F sont finis, une bijection n\'existe que si ∣E∣=∣F∣.45

#### Composition et Fonction Inverse

- **Composition :** Étant données deux fonctions f:E→F et g:F→G, leur **composée** est la fonction g∘f:E→G définie par (g∘f)(x)=g(f(x)) pour tout x∈E.

  - **Propriété :** La composition préserve l\'injectivité et la surjectivité.

    - Si f et g sont injectives, alors g∘f est injective.

    - Si f et g sont surjectives, alors g∘f est surjective.

    - Par conséquent, si f et g sont bijectives, g∘f est bijective.

> Démonstration (Injectivité) :Supposons f et g injectives. Soient x1​,x2​∈E tels que (g∘f)(x1​)=(g∘f)(x2​).Cela signifie g(f(x1​))=g(f(x2​)).Comme g est injective, on en déduit f(x1​)=f(x2​).Comme f est injective, on en déduit x1​=x2​.Donc, g∘f est injective.48

- **Fonction Inverse :** Une fonction f:E→F est dite **inversible** s\'il existe une fonction g:F→E telle que g∘f=idE​ et f∘g=idF​, où idE​ est la fonction identité sur E.

  - **Théorème :** Une fonction f est inversible si et seulement si elle est bijective.

  - Si elle existe, cette fonction g est unique, est appelée la **fonction inverse** (ou réciproque) de f, et est notée f−1.

Démonstration (esquisse) :(⟹) Supposons f bijective. Pour tout y∈F, il existe un unique x∈E tel que f(x)=y. On peut donc définir une fonction g:F→E par g(y)=x. Par construction, g(f(x))=x et f(g(y))=y, ce qui prouve que g est l\'inverse de f.(⟸) Supposons qu\'il existe un inverse g. Pour montrer que f est injective, si f(x1​)=f(x2​), alors g(f(x1​))=g(f(x2​)), ce qui donne x1​=x2​. Pour montrer que f est surjective, pour tout y∈F, posons x=g(y). Alors f(x)=f(g(y))=y, donc y a un antécédent.16

## Section 3 : L\'Art du Dénombrement -- Analyse Combinatoire

L\'analyse combinatoire est la branche des mathématiques qui étudie les configurations d\'objets. Elle cherche à répondre à des questions du type \"Combien y a-t-il de\...?\". En informatique, ces questions sont omniprésentes : combien de mots de passe de 8 caractères peut-on former? Combien de chemins existent entre deux nœuds dans un réseau? Combien de comparaisons un algorithme de tri effectue-t-il dans le pire des cas? Le dénombrement est donc essentiel pour l\'analyse de la complexité, la conception de structures de données et le calcul des probabilités.

### 3.1 Principes Fondamentaux

Toutes les techniques de dénombrement, même les plus complexes, reposent sur deux principes de base qui relient les opérations sur les ensembles à des opérations arithmétiques.

- **Principe de la Somme (ou de l\'Addition) :** Si une tâche peut être accomplie de n1​ manières et une seconde tâche de n2​ manières, et que ces deux tâches ne peuvent pas être accomplies simultanément (elles sont mutuellement exclusives), alors il y a n1​+n2​ manières d\'accomplir l\'une ou l\'autre de ces tâches. En termes d\'ensembles, si A et B sont deux ensembles finis **disjoints**, alors ∣A∪B∣=∣A∣+∣B∣.

- **Principe du Produit (ou de la Multiplication) :** Si une procédure peut être décomposée en une séquence de deux tâches, où il y a n1​ manières d\'accomplir la première tâche et, pour chacune de ces manières, n2​ manières d\'accomplir la seconde, alors il y a n1​×n2​ manières d\'accomplir la procédure complète. En termes d\'ensembles, pour deux ensembles finis A et B, le cardinal de leur produit cartésien est ∣A×B∣=∣A∣×∣B∣.

### 3.2 Permutations et Arrangements

Les arrangements et permutations concernent les problèmes de dénombrement où **l\'ordre des éléments est important**. La distinction cruciale entre les différentes formules de dénombrement réside dans deux questions : l\'ordre importe-t-il et les répétitions sont-elles permises?

- Arrangements avec répétition (k-uplets) :\
  Il s\'agit du nombre de manières de choisir k éléments parmi n éléments distincts, avec remise et en tenant compte de l\'ordre. Pour chacun des k choix, il y a n possibilités. Par le principe du produit, le nombre total d\'arrangements est n×n×⋯×n (k fois).\
  \
  AR​(n,k)=nk

  - **Exemple :** Le nombre de mots de 3 lettres que l\'on peut former avec l\'alphabet {A, B} est 23=8 (AAA, AAB, ABA, BAA, ABB, BAB, BBA, BBB).

- Arrangements sans répétition (k-permutations) :\
  Il s\'agit du nombre de manières de choisir et d\'ordonner k éléments parmi n éléments distincts, sans remise. Le premier élément peut être choisi de n manières, le deuxième de n−1 manières,\..., et le k-ième de n−k+1 manières. Par le principe du produit, on obtient 54 :\
  P(n,k)=n×(n−1)×⋯×(n−k+1)\
  \
  En utilisant la notation factorielle (n!=n×(n−1)×⋯×1), cette formule se réécrit de manière compacte :\
  \
  P(n,k)=(n−k)!n!​

  - **Exemple :** Le nombre de podiums possibles (or, argent, bronze) dans une course de 8 athlètes est P(8,3)=8×7×6=336.

- Permutations :\
  Une permutation est un arrangement de tous les éléments d\'un ensemble. C\'est un cas particulier d\'arrangement sans répétition où k=n. Le nombre de permutations d\'un ensemble de n éléments est 12 :\
  P(n,n)=n!

  - **Exemple :** Le nombre de manières d\'ordonner les lettres du mot \"MATH\" est 4!=24.

### 3.3 Combinaisons

Les combinaisons concernent les problèmes de dénombrement où **l\'ordre des éléments n\'est pas important**. Il s\'agit de choisir un sous-ensemble d\'éléments.

- Combinaisons sans répétition :\
  Il s\'agit du nombre de manières de choisir k éléments parmi n éléments distincts, sans remise et sans tenir compte de l\'ordre. On note ce nombre C(n,k) ou (kn​), et on le lit \"k parmi n\".55\
  Pour dériver la formule, on peut partir d\'un raisonnement unificateur qui relie arrangements et combinaisons. Un arrangement de k éléments peut être formé en deux étapes :

  1.  Choisir un sous-ensemble de k éléments (une combinaison). Il y a (kn​) manières de le faire.

  2.  Ordonner ces k éléments. Il y a k! manières de le faire (une permutation).

> Par le principe du produit, le nombre d\'arrangements est le produit du nombre de combinaisons par le nombre de permutations de ces dernières : P(n,k)=(kn​)×k!. En isolant le terme qui nous intéresse, on obtient la formule fondamentale des combinaisons  :(kn​)=k!P(n,k)​=k!(n−k)!n!​Cette approche révèle que la distinction entre arrangements et combinaisons est une question de \"division par les symétries\" : on compte d\'abord les objets ordonnés, puis on divise par le nombre de redondances créées par l\'ordre (k!) pour obtenir le nombre d\'objets non ordonnés.

- **Exemple :** Le nombre de manières de choisir un comité de 3 personnes dans un groupe de 10 est (310​)=3!7!10!​=3×2×110×9×8​=120.

  --------------------- --------------------------------------------- --------------------------------------
                        **Ordre important**                           **Ordre non important**

  **Sans répétition**   Arrangement (k-permutation) P(n,k)=(n−k)!n!​   Combinaison (kn​)=k!(n−k)!n!​

  **Avec répétition**   k-uplet nk                                    Combinaison avec répétition (kn+k−1​)
  --------------------- --------------------------------------------- --------------------------------------

### 3.4 Le Binôme de Newton

La formule du binôme de Newton est une généralisation des identités remarquables comme (a+b)2=a2+2ab+b2. Elle fournit une expression pour (a+b)n en utilisant les coefficients binomiaux.

#### Identité et Triangle de Pascal

Les coefficients binomiaux peuvent être calculés de manière récursive grâce à l\'**identité de Pascal**  :

(kn+1​)=(k−1n​)+(kn​)

Démonstration combinatoire :

Considérons un ensemble E de n+1 éléments. On souhaite compter le nombre de sous-ensembles de E de taille k. On distingue un élément particulier, disons x0​∈E. Un sous-ensemble de E de taille k peut soit contenir x0​, soit ne pas le contenir.

- **Cas 1 : Le sous-ensemble contient x0​.** Il faut alors choisir les k−1 autres éléments parmi les n éléments restants de E∖{x0​}. Il y a (k−1n​) manières de le faire.

- **Cas 2 : Le sous-ensemble ne contient pas x0​.** Il faut alors choisir les k éléments parmi les n éléments restants de E∖{x0​}. Il y a (kn​) manières de le faire.

Comme ces deux cas sont disjoints, par le principe de la somme, le nombre total de sous-ensembles est (k−1n​)+(kn​), ce qui prouve l\'identité.

Cette relation est à la base de la construction du **triangle de Pascal**, où chaque nombre est la somme des deux nombres situés juste au-dessus de lui.

#### Formule du binôme

Pour tous nombres a,b (réels ou complexes) et tout entier naturel n, on a :

(a+b)n=k=0∑n​(kn​)akbn−k

Le coefficient (kn​) correspond au nombre de fois où le terme akbn−k apparaît lorsqu\'on développe le produit (a+b)(a+b)...(a+b) (n fois). Choisir le terme akbn−k revient à choisir k parenthèses parmi les n desquelles on prendra le terme a (et donc on prendra b dans les n−k autres).61

Démonstration par récurrence :

Soit P(n) la proposition (a+b)n=∑k=0n​(kn​)akbn−k.

- **Initialisation (n=0) :** (a+b)0=1. La somme se réduit à (00​)a0b0=1. P(0) est vraie.

- Hérédité : Supposons P(n) vraie pour un certain n≥0. Montrons P(n+1).\
  \\begin{align\*} (a+b)\^{n+1} &= (a+b)(a+b)\^n \\ &= (a+b) \\sum\_{k=0}\^{n} \\binom{n}{k} a\^k b\^{n-k} \\quad \\text{(par hypothèse de récurrence)} \\ &= a \\sum\_{k=0}\^{n} \\binom{n}{k} a\^k b\^{n-k} + b \\sum\_{k=0}\^{n} \\binom{n}{k} a\^k b\^{n-k} \\ &= \\sum\_{k=0}\^{n} \\binom{n}{k} a\^{k+1} b\^{n-k} + \\sum\_{k=0}\^{n} \\binom{n}{k} a\^k b\^{n+1-k} \\end{align\*}\
  On effectue un changement d\'indice j=k+1 dans la première somme :\
  \$\$ (a+b)\^{n+1} = \\sum\_{j=1}\^{n+1} \\binom{n}{j-1} a\^j b\^{n-(j-1)} + \\sum\_{k=0}\^{n} \\binom{n}{k} a\^k b\^{n+1-k} \$\$\
  En renommant j par k et en isolant les termes extrêmes (k=n+1 dans la première somme et k=0 dans la seconde), on obtient :\
  \$\$ (a+b)\^{n+1} = \\binom{n}{n}a\^{n+1}b\^0 + \\sum\_{k=1}\^{n} \\binom{n}{k-1} a\^k b\^{n+1-k} + \\binom{n}{0}a\^0b\^{n+1} + \\sum\_{k=1}\^{n} \\binom{n}{k} a\^k b\^{n+1-k} \$\$\
  En regroupant les sommes et en utilisant (nn​)=1=(n+1n+1​) et (0n​)=1=(0n+1​) :\
  \$\$ (a+b)\^{n+1} = \\binom{n+1}{n+1}a\^{n+1} + \\binom{n+1}{0}b\^{n+1} + \\sum\_{k=1}\^{n} \\left( \\binom{n}{k-1} + \\binom{n}{k} \\right) a\^k b\^{n+1-k} \$\$\
  Grâce à l\'identité de Pascal, le terme entre crochets devient (kn+1​). On peut alors réintégrer les termes extrêmes dans la somme :\
  \
  (a+b)n+1=k=0∑n+1​(kn+1​)akbn+1−k\
  \
  La proposition P(n+1) est donc vraie. Par le principe de récurrence, la formule est vraie pour tout n∈N.58

## Section 4 : Arithmétique et Algorithmique -- Les Nombres au Cœur du Calcul

L\'arithmétique, l\'étude des propriétés des nombres entiers, est l\'une des plus anciennes branches des mathématiques. En informatique, elle transcende son statut de discipline théorique pour devenir un outil algorithmique fondamental. Les propriétés de la divisibilité, des nombres premiers et des congruences ne sont pas seulement des curiosités abstraites ; elles sont au cœur d\'algorithmes efficaces pour des tâches allant de la génération de nombres pseudo-aléatoires à la sécurisation des communications mondiales.

### 4.1 Divisibilité et Nombres Premiers

- **Division Euclidienne :** Pour deux entiers a (dividende) et b=0 (diviseur), il existe un unique couple d\'entiers (q,r) (quotient et reste) tel que a=bq+r et 0≤r\<∣b∣. Cet algorithme simple est la base de nombreuses opérations en arithmétique.

- **Plus Grand Commun Diviseur (PGCD) :** Le PGCD de deux entiers non nuls a et b, noté pgcd(a,b), est le plus grand entier positif qui divise à la fois a et b. Deux nombres sont dits **premiers entre eux** si leur PGCD est 1.

- **Nombres Premiers :** Un entier p\>1 est dit **premier** s\'il n\'admet que deux diviseurs positifs : 1 et lui-même. Les nombres premiers sont les \"atomes\" de l\'arithmétique.

- **Théorème Fondamental de l\'Arithmétique :** Tout entier n\>1 peut être écrit de manière **unique** (à l\'ordre des facteurs près) comme un produit de nombres premiers.\
  n=p1a1​​p2a2​​...pkak​​\
  \
  Démonstration (par induction forte) :

  - **Cas de base :** n=2 est premier, sa décomposition est unique.

  - **Hypothèse d\'induction :** Supposons que tout entier m tel que 2≤m\<n admette une décomposition unique en facteurs premiers.

  - **Étape d\'induction :** Considérons l\'entier n.

    - **Existence :** Si n est premier, il est sa propre décomposition. S\'il est composé, n=ab avec 1\<a,b\<n. Par hypothèse d\'induction, a et b ont des décompositions en facteurs premiers. Le produit de ces décompositions donne une décomposition pour n.

    - **Unicité :** Supposons que n ait deux décompositions : n=p1​...pr​=q1​...qs​. Le nombre premier p1​ divise le produit q1​...qs​. Par le lemme d\'Euclide (si un premier divise un produit, il divise l\'un des facteurs), p1​ doit diviser l\'un des qj​. Comme les qj​ sont premiers, p1​ doit être égal à ce qj​. En réordonnant les facteurs, on peut supposer p1​=q1​. On peut alors simplifier par p1​ pour obtenir p2​...pr​=q2​...qs​. Ce nombre est strictement inférieur à n. Par hypothèse d\'induction, sa décomposition est unique. Donc, les listes (p2​,...,pr​) et (q2​,...,qs​) sont les mêmes à permutation près. Il en va de même pour les décompositions initiales de n.

### 4.2 Arithmétique Modulaire

L\'arithmétique modulaire est un système d\'arithmétique pour les entiers où les nombres \"s\'enroulent\" après avoir atteint une certaine valeur, le **module**.

- **Relation de Congruence :** Deux entiers a et b sont dits **congrus modulo n** si leur différence a−b est un multiple de n. On note a≡b(modn). Cela revient à dire que\
  a et b ont le même reste dans la division euclidienne par n.\
  Il s\'agit d\'une relation d\'équivalence : elle est réflexive (a≡a), symétrique (a≡b⟹b≡a) et transitive (a≡b et b≡c⟹a≡c).69 Les classes d\'équivalence sont les ensembles de nombres ayant le même reste, formant l\'ensemble quotient\
  Z/nZ.

- **Opérations Modulaires :** La congruence est compatible avec l\'addition et la multiplication. Si a≡b(modn) et c≡d(modn), alors :

  - a+c≡b+d(modn)

  - ac≡bd(modn)\
    Ces propriétés permettent de définir une arithmétique cohérente sur l\'ensemble des restes {0,1,...,n−1}.70

- **Équations de Congruence Linéaire :** Il s\'agit d\'équations de la forme ax≡b(modn).

  - **Théorème :** Une solution existe si et seulement si pgcd(a,n) divise b.

  - **Cas particulier important :** Si pgcd(a,n)=1, alors a admet un **inverse modulaire** unique modulo n, noté a−1. C\'est un entier tel que a⋅a−1≡1(modn). L\'existence de cet inverse transforme la résolution de l\'équation en une simple multiplication : x≡a−1b(modn).

### 4.3 L\'Algorithme d\'Euclide Étendu

La question cruciale pour la résolution des congruences linéaires et pour la cryptographie est de savoir comment calculer efficacement le PGCD et l\'inverse modulaire. La réponse est fournie par l\'algorithme d\'Euclide et sa version étendue. C\'est ici que la théorie des nombres passe d\'une collection de théorèmes d\'existence à une boîte à outils algorithmique puissante.

- **Algorithme d\'Euclide :** Pour calculer pgcd(a,b), on utilise la propriété pgcd(a,b)=pgcd(b,a(modb)). On applique cette réduction de manière itérative jusqu\'à obtenir un reste nul. Le dernier reste non nul est le PGCD. Cet algorithme est extrêmement efficace, son temps d\'exécution est logarithmique en la taille des entrées.

- **Identité de Bézout :** Pour tous entiers a et b, il existe des entiers u et v (appelés coefficients de Bézout) tels que au+bv=pgcd(a,b). Ce théorème garantit, par exemple, l\'existence d\'un inverse modulaire pour\
  a modulo n si pgcd(a,n)=1, car l\'identité devient au+nv=1, ce qui implique au≡1(modn).

- **Algorithme d\'Euclide Étendu :** Il s\'agit d\'une modification de l\'algorithme d\'Euclide qui, en plus de calculer le PGCD, calcule également les coefficients de Bézout u et v. La méthode la plus courante consiste à maintenir à chaque étape de la division euclidienne une expression du reste comme une combinaison linéaire de\
  a et b. En partant des égalités triviales\
  a=1⋅a+0⋅b et b=0⋅a+1⋅b, on peut calculer les coefficients pour chaque reste successif.

**Exemple :** Calculer l\'inverse de 8 modulo 35. On cherche u tel que 8u≡1(mod35). On applique l\'algorithme d\'Euclide étendu à 35 et 8.

1.  35=4⋅8+3⟹3=35−4⋅8

2.  8=2⋅3+2⟹2=8−2⋅3=8−2(35−4⋅8)=9⋅8−2⋅35

3.  3=1⋅2+1⟹1=3−1⋅2=(35−4⋅8)−(9⋅8−2⋅35)=3⋅35−13⋅8\
    L\'identité de Bézout est 1=3⋅35−13⋅8. En regardant cette équation modulo 35, on obtient −13⋅8≡1(mod35). L\'inverse est donc −13, qui est congruent à 22(mod35).71

### 4.4 Théorèmes de Fermat et d\'Euler

Ces théorèmes sont des résultats fondamentaux de l\'arithmétique modulaire concernant l\'exponentiation.

- Petit Théorème de Fermat : Si p est un nombre premier, alors pour tout entier a non divisible par p, on a :\
  \
  ap−1≡1(modp)\
  \
  Une forme équivalente, valide pour tout entier a, est ap≡a(modp).78

- **Indicatrice d\'Euler :** La fonction indicatrice d\'Euler ϕ(n) (ou totient) compte le nombre d\'entiers positifs inférieurs ou égaux à n qui sont premiers avec n.

  - Si p est premier, ϕ(p)=p−1.

  - Si p et q sont deux premiers distincts, ϕ(pq)=(p−1)(q−1).

- Théorème d\'Euler : Ce théorème généralise celui de Fermat à un module non premier. Si a et n sont des entiers premiers entre eux, alors :\
  \
  aϕ(n)≡1(modn)\
  \
  Démonstration :\
  Soit Un​=(Z/nZ)∗ l\'ensemble des classes d\'équivalence modulo n qui sont inversibles. Cet ensemble forme un groupe multiplicatif d\'ordre ϕ(n). Soit aˉ la classe de a dans Un​. D\'après le théorème de Lagrange, l\'ordre d\'un élément d\'un groupe fini divise l\'ordre du groupe. Donc, l\'ordre de aˉ divise ϕ(n). Cela signifie que aˉϕ(n)=1ˉ, ce qui est équivalent à aϕ(n)≡1(modn).80

Ce théorème est la clé de voûte de l\'algorithme RSA, car il garantit que l\'opération de déchiffrement annule bien celle du chiffrement.

## Section 5 : Concepts Avancés et Applications aux Systèmes Complexes

Cette dernière section explore des concepts qui illustrent la puissance et la portée des mathématiques discrètes, en montrant comment les outils fondamentaux développés précédemment s\'assemblent pour analyser des questions profondes sur la nature du calcul, modéliser des processus dynamiques et construire des systèmes sécurisés. Les idées présentées ici, de la hiérarchie des infinis à l\'analyse probabiliste des algorithmes, forment un pont entre la théorie pure et les défis concrets du génie informatique.

### 5.1 Cardinalité et Calculabilité

#### Cardinalité des ensembles

La notion de **cardinalité** généralise la notion de \"nombre d\'éléments\" aux ensembles infinis. Deux ensembles A et B ont la même cardinalité, noté ∣A∣=∣B∣, s\'il existe une bijection entre eux.

- **Ensembles finis et dénombrables :** Un ensemble est **fini** s\'il est en bijection avec {1,2,...,n} pour un certain n∈N. Un ensemble est **dénombrable** s\'il est en bijection avec l\'ensemble des entiers naturels N. Les ensembles\
  Z (entiers relatifs) et Q (nombres rationnels) sont dénombrables. Le cardinal de\
  N est noté ℵ0​ (aleph-zéro).

- **Ensembles indénombrables :** Un ensemble infini qui n\'est pas dénombrable est dit **indénombrable**.

#### L\'argument de la diagonale de Cantor

En 1891, Georg Cantor a démontré de manière révolutionnaire qu\'il existe différentes \"tailles\" d\'infini. Plus précisément, il a prouvé que l\'ensemble des nombres réels R n\'est pas dénombrable. Sa preuve, connue sous le nom d\'**argument de la diagonale**, est une magnifique illustration du raisonnement par l\'absurde.

Théorème : L\'intervalle \$

2\. Construction : Écrivons chaque nombre de cette liste avec son développement décimal (propre, c\'est-à-dire sans suite infinie de 9) :

\\begin{align\*} r_1 &= 0,d\_{11}d\_{12}d\_{13}\\dots \\ r_2 &= 0,d\_{21}d\_{22}d\_{23}\\dots \\ r_3 &= 0,d\_{31}d\_{32}d\_{33}\\dots \\ & \\vdots \\end{align\*}

Nous allons construire un nouveau nombre x∈\[ qui ne peut pas figurer dans cette liste. Pour chaque i≥1, définissons la i-ème décimale de x, notée xi​, de la manière suivante :

xi​={12​si dii​=1si dii​=1​

Ce nombre x=0,x1​x2​x3​... est bien un réel dans \[.

3\. Contradiction : Par construction, le nombre x diffère de chaque nombre rn​ de la liste au moins à la n-ième décimale (xn​=dnn​). Par conséquent, x ne peut être égal à aucun rn​ de la liste.

4\. Conclusion : Nous avons construit un nombre x∈\[ qui n\'est pas dans la liste supposée exhaustive de tous les nombres de cet intervalle. C\'est une contradiction. L\'hypothèse initiale est donc fausse : \[ n\'est pas dénombrable.86

Un argument similaire montre que pour tout ensemble S, son ensemble des parties P(S) a une cardinalité strictement supérieure à celle de S (∣S∣\<∣P(S)∣). Cela implique une hiérarchie infinie de cardinalités :

∣N∣\<∣P(N)∣\<∣P(P(N))∣\<....

#### Implications pour la calculabilité

Cette distinction entre le dénombrable et l\'indénombrable a une conséquence profonde en informatique.

- L\'ensemble de tous les programmes informatiques possibles (dans un langage donné) est **dénombrable**. On peut en effet lister tous les programmes par taille croissante, puis par ordre lexicographique.

- Cependant, l\'ensemble de toutes les fonctions possibles de N dans N est **indénombrable**, car il est en bijection avec P(N×N), qui a la même cardinalité que R.

Puisqu\'il y a \"plus\" de fonctions que de programmes, il doit nécessairement exister des fonctions qui ne peuvent être calculées par aucun programme. Ces fonctions sont dites **non-calculables**.

L\'exemple le plus célèbre de problème non-calculable (ou indécidable) est le **problème de l\'arrêt** : il n\'existe aucun programme universel capable de déterminer, pour n\'importe quel autre programme et n\'importe quelle entrée, si ce programme finira par s\'arrêter ou s\'il bouclera indéfiniment. La preuve de ce résultat utilise également un argument diagonal.

### 5.2 Suites Récurrentes et Fonctions Génératrices

Les relations de récurrence sont un outil puissant pour modéliser des problèmes dont la solution pour une taille n dépend des solutions pour des tailles plus petites. Elles sont omniprésentes dans l\'analyse d\'algorithmes récursifs.

- Relations de Récurrence Linéaires Homogènes à Coefficients Constants :\
  Une suite (un​) est définie par une telle relation si chaque terme est une combinaison linéaire des termes précédents :\
  \
  un​=c1​un−1​+c2​un−2​+⋯+ck​un−k​\
  \
  La méthode de résolution consiste à former l\'équation caractéristique associée :\
  \
  rk−c1​rk−1−c2​rk−2−⋯−ck​=0\
  \
  La solution générale de la récurrence est une combinaison linéaire de termes basés sur les racines de cette équation.94

  - **Racines réelles distinctes r1​,...,rk​ :** La solution est de la forme un​=λ1​r1n​+⋯+λk​rkn​.

  - **Racine réelle r1​ de multiplicité m :** La solution contient les termes (λ0​+λ1​n+⋯+λm−1​nm−1)r1n​.

  - **Racines complexes conjuguées ρe±iθ :** La solution contient des termes de la forme ρn(λ1​cos(nθ)+λ2​sin(nθ)).\
    \
    Les constantes λi​ sont déterminées par les conditions initiales de la suite.

- Fonctions Génératrices :\
  Une fonction génératrice est un moyen d\'encoder une suite infinie de nombres (an​)n≥0​ comme les coefficients d\'une série formelle.96 La fonction génératrice ordinaire est définie par :\
  G(x)=n=0∑∞​an​xn\
  \
  Cette approche transforme un problème discret (une relation de récurrence sur une suite) en un problème d\'analyse ou d\'algèbre (une équation sur une fonction). Pour résoudre une récurrence, on suit généralement ces étapes 97 :

  1.  Traduire la relation de récurrence en une équation algébrique pour sa fonction génératrice G(x).

  2.  Résoudre cette équation pour obtenir une forme close pour G(x).

  3.  Développer G(x) en série de Taylor pour extraire le coefficient de xn, qui est le terme an​ recherché.\
      Cette méthode est particulièrement puissante pour des récurrences plus complexes, y compris non homogènes.98

### 5.3 Introduction aux Probabilités Discrètes

La théorie des probabilités fournit un cadre formel pour raisonner sur l\'incertitude. Dans le contexte discret, elle est essentielle pour l\'analyse en cas moyen des algorithmes, la modélisation de systèmes stochastiques et les fondements de l\'apprentissage automatique.

- **Espace Probabilisé Discret :** Un espace probabilisé est un triplet (Ω,F,P) où :

  - Ω est l\'**univers**, l\'ensemble (fini ou dénombrable) de tous les résultats possibles d\'une expérience.

  - F est la **tribu** des événements, qui dans le cas discret est généralement l\'ensemble des parties P(Ω).

  - P est une **mesure de probabilité**, une fonction \$P: \\mathcal{F} \\to \$ qui assigne une probabilité à chaque événement, telle que P(Ω)=1 et pour toute collection d\'événements disjoints (Ai​), P(∪Ai​)=∑P(Ai​).

- **Probabilité Conditionnelle et Indépendance :**

  - La probabilité conditionnelle de l\'événement A sachant que l\'événement B s\'est produit (avec P(B)\>0) est définie par :\
    \
    P(A∣B)=P(B)P(A∩B)​

  - Deux événements A et B sont **indépendants** si la réalisation de l\'un n\'influence pas la probabilité de l\'autre, c\'est-à-dire P(A∩B)=P(A)P(B). Si P(B)\>0, cela équivaut à P(A∣B)=P(A).

- Théorème de Bayes : Ce théorème fondamental permet d\' \"inverser\" les probabilités conditionnelles et de mettre à jour nos croyances à la lumière de nouvelles données.\
  \
  P(A∣B)=P(B)P(B∣A)P(A)​\
  \
  En utilisant la formule des probabilités totales pour décomposer P(B), on obtient la forme étendue :\
  \
  P(A∣B)=P(B∣A)P(A)+P(B∣¬A)P(¬A)P(B∣A)P(A)​\
  \
  Ce théorème est la pierre angulaire de l\'inférence bayésienne.106

- Variables Aléatoires Discrètes :\
  Une variable aléatoire X est une fonction de Ω vers R. Elle est discrète si son image X(Ω) est un ensemble fini ou dénombrable.109

  - Espérance : L\'espérance E\[X\] est la valeur moyenne de X, pondérée par les probabilités.\
    \
    E\[X\]=x∈X(Ω)∑​x⋅P(X=x)\
    \
    L\'espérance est linéaire : E=aE\[X\]+bE.110

  - Variance : La variance V(X) mesure la dispersion de X autour de son espérance.\
    \
    V(X)=E\[(X−E\[X\])2\]\
    \
    La formule de Koenig-Huygens fournit un moyen de calcul pratique : V(X)=E\[X2\]−(E\[X\])2.110

- **Analyse en Cas Moyen :** L\'espérance est l\'outil central pour l\'analyse en cas moyen d\'un algorithme. Si C(i) est le coût de l\'algorithme sur une entrée i et que les entrées sont tirées selon une certaine distribution de probabilité, alors le coût moyen est l\'espérance de la variable aléatoire C.

### 5.4 Étude de Cas -- Cryptographie à Clé Publique (RSA)

L\'algorithme de chiffrement RSA est une application spectaculaire qui synthétise de nombreux concepts abordés dans ce chapitre. Il illustre comment des propriétés profondes de la théorie des nombres peuvent être exploitées pour construire un système informatique complexe dont la sécurité est cruciale dans notre monde numérique.

- **Contexte :** La cryptographie asymétrique (ou à clé publique) utilise une paire de clés : une **clé publique** pour chiffrer les messages, et une **clé privée** pour les déchiffrer. La clé publique peut être partagée librement, tandis que la clé privée doit rester secrète. La sécurité repose sur le fait qu\'il est \"calculatoirement infaisable\" de déduire la clé privée à partir de la clé publique.

- **Génération des Clés :**

  1.  Choisir deux très grands nombres premiers distincts, p et q.

  2.  Calculer le module n=pq.

  3.  Calculer l\'indicatrice d\'Euler ϕ(n)=(p−1)(q−1).

  4.  Choisir un exposant de chiffrement e tel que 1\<e\<ϕ(n) et pgcd(e,ϕ(n))=1.

  5.  Calculer l\'exposant de déchiffrement d comme l\'inverse modulaire de e modulo ϕ(n), c\'est-à-dire d≡e−1(modϕ(n)). Ce calcul est réalisé efficacement grâce à l\'**algorithme d\'Euclide étendu**.

  - **Clé publique :** (n,e).

  - **Clé privée :** (n,d).

- Chiffrement et Déchiffrement :\
  Un message, représenté par un entier M\<n, est chiffré en calculant :\
  \
  C≡Me(modn)\
  \
  Le message chiffré C est déchiffré en calculant :\
  \
  M′≡Cd(modn)

- Justification de la Correction : Nous devons montrer que M′=M.\
  \
  M′≡Cd≡(Me)d≡Med(modn)\
  \
  Par construction de d, on a ed≡1(modϕ(n)), donc il existe un entier k tel que ed=1+kϕ(n).\
  \
  Med=M1+kϕ(n)=M⋅(Mϕ(n))k\
  \
  D\'après le théorème d\'Euler, si pgcd(M,n)=1, alors Mϕ(n)≡1(modn).\
  Donc, Med≡M⋅1k≡M(modn).\
  Le cas où pgcd(M,n)=1 se traite séparément mais mène à la même conclusion.116 Le déchiffrement fonctionne donc correctement.

- **Sécurité :** La sécurité de RSA repose sur l\'hypothèse que la **factorisation** de grands nombres est un problème calculatoirement difficile. Un attaquant qui connaît la clé publique (n,e) pourrait trouver la clé privée d s\'il pouvait calculer ϕ(n)=(p−1)(q−1). Pour cela, il lui faudrait connaître p et q, c\'est-à-dire factoriser n. À ce jour, aucun algorithme classique efficace n\'est connu pour factoriser de très grands nombres.

RSA est ainsi un exemple paradigmatique de la manière dont les structures discrètes (l\'arithmétique modulaire sur Z/nZ), la théorie des nombres (théorème d\'Euler, nombres premiers) et l\'algorithmique (algorithme d\'Euclide étendu, exponentiation modulaire) s\'unissent pour créer un système complexe dont les propriétés (correction, sécurité) peuvent être analysées et prouvées formellement.

## Conclusion

Ce chapitre a parcouru les paysages fondamentaux des mathématiques discrètes, depuis les notions élémentaires d\'ensembles jusqu\'aux applications sophistiquées en cryptographie. Nous avons établi que les structures discrètes ne sont pas une simple collection de sujets disparates, mais un système conceptuel cohérent et profondément interconnecté, formant le socle théorique sur lequel repose l\'informatique moderne.

La théorie des ensembles nous a fourni un langage universel pour décrire les collections d\'objets, dont les opérations se sont révélées être le reflet direct des opérateurs de la logique booléenne. En structurant ces ensembles avec des relations, nous avons vu émerger des concepts puissants comme l\'équivalence, qui permet de classifier, et l\'ordre, qui permet de hiérarchiser. L\'analyse combinatoire, fondée sur les principes simples de la somme et du produit, nous a donné les moyens de dénombrer des configurations complexes, une compétence essentielle pour évaluer l\'efficacité des algorithmes.

L\'exploration de l\'arithmétique a démontré que les propriétés des entiers, loin d\'être purement abstraites, sont au cœur d\'algorithmes concrets et efficaces, comme l\'algorithme d\'Euclide étendu, qui transforme des théorèmes d\'existence en outils de calcul pratiques. Enfin, l\'introduction à la cardinalité, à la calculabilité, aux récurrences et aux probabilités discrètes a ouvert la voie à l\'analyse de systèmes complexes, où il ne s\'agit plus seulement de construire des algorithmes, mais de prouver leur correction, d\'analyser leur performance moyenne et de garantir leur sécurité face à des adversaires. L\'étude de cas de l\'algorithme RSA a cristallisé cette synergie, montrant comment un système de sécurité mondial repose sur l\'interaction subtile entre ces différentes briques fondamentales.

Les concepts développés dans ce chapitre sont des prérequis essentiels pour la suite de cet ouvrage. La théorie des graphes, qui sera abordée prochainement, peut être vue comme l\'étude de relations binaires sur des ensembles finis. La logique formelle et la théorie de la calculabilité approfondiront les liens entre les ensembles, la logique et les limites intrinsèques du calcul. La théorie de l\'information et l\'apprentissage automatique s\'appuieront massivement sur les fondements des probabilités discrètes ici esquissés. Ainsi, les structures discrètes et la combinatoire ne sont pas seulement un chapitre des mathématiques pour l\'informatique ; elles en sont le système d\'exploitation.

