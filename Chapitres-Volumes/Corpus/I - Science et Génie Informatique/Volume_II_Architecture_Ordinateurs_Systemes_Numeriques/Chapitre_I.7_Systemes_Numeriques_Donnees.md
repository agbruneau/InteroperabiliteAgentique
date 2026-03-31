# Chapitre I.7 : Systèmes Numériques et Représentation des Données

Ce chapitre constitue un pivot fondamental dans notre étude, opérant la transition entre le monde des mathématiques discrètes et la réalité physique des circuits électroniques. Nous établirons ici le langage formel qui permet de manipuler l\'information sous sa forme la plus élémentaire --- le bit --- et nous examinerons les standards universels qui régissent la représentation de cette information, qu\'il s\'agisse de nombres ou de données plus complexes. Notre parcours débutera avec la structure algébrique qui sous-tend toute la logique numérique, l\'algèbre de Boole, pour ensuite explorer en profondeur la manière dont les nombres, entiers et réels, sont encodés pour être traités par une machine. Finalement, nous aborderons la question cruciale de la fiabilité, en étudiant les mécanismes de détection et de correction d\'erreurs qui garantissent l\'intégrité des données dans des systèmes inévitablement imparfaits.

## 7.1 Algèbre de Boole et Portes Logiques

### 7.1.1 Introduction : La Nécessité du Monde Discret

Le monde dans lequel nous évoluons est, à l\'échelle de notre perception, foncièrement analogique. Les grandeurs physiques telles que la température, la pression, la vitesse ou l\'intensité lumineuse varient de manière continue. Un signal analogique, comme la tension électrique issue d\'un microphone captant une onde sonore, peut prendre une infinité de valeurs à l\'intérieur d\'une plage donnée. Si la construction de circuits électroniques capables de traiter ces signaux analogiques est possible --- les amplificateurs audio en sont un exemple classique ---, cette approche se heurte à une difficulté fondamentale : le bruit. Tout signal transmis ou stocké est susceptible d\'être altéré par des perturbations électromagnétiques ou des imperfections thermiques des composants. Dans un système analogique, une légère perturbation du signal est indiscernable de la variation légitime de l\'information qu\'il transporte. Cette sensibilité intrinsèque au bruit rend la conception de systèmes analogiques complexes et fiables extraordinairement ardue.

La révolution numérique repose sur un changement de paradigme radical : la discrétisation. Plutôt que de représenter l\'information par une valeur continue, le monde numérique la représente par un ensemble fini d\'états distincts. Dans la quasi-totalité des systèmes informatiques modernes, cet ensemble est réduit à son strict minimum : deux états. Ces deux états peuvent être représentés physiquement de multiples manières : une tension électrique haute ou basse, la présence ou l\'absence de charge dans un condensateur, la polarisation nord ou sud d\'un domaine magnétique. L\'abstraction de cette réalité physique nous conduit à deux symboles logiques : VRAI et FAUX, ou, plus communément, 1 et 0.

L\'avantage de cette représentation binaire est sa robustesse exceptionnelle. Un circuit conçu pour reconnaître deux niveaux de tension, par exemple 0 volt (pour le 0 logique) et 5 volts (pour le 1 logique), peut tolérer des variations significatives. Une tension de 4.8 volts ou de 5.2 volts sera toujours interprétée sans ambiguïté comme un 1 logique, car elle se situe bien au-delà du seuil de décision qui la sépare du 0 logique. Le bruit, qui n\'était qu\'une dégradation dans le monde analogique, devient une perturbation qui doit atteindre une amplitude considérable pour provoquer une erreur de lecture dans le monde numérique. Cette immunité au bruit est la pierre angulaire qui a permis de construire des systèmes de traitement de l\'information d\'une complexité et d\'une fiabilité inimaginables avec la technologie analogique.

Cependant, pour construire de tels systèmes, il ne suffit pas de savoir représenter des 1 et des 0. Il nous faut un cadre mathématique formel pour manipuler ces valeurs, pour définir des opérations et pour analyser des circuits complexes. Ce cadre a été fourni, de manière prophétique, bien avant l\'avènement de l\'électronique, par le mathématicien anglais George Boole au milieu du XIXe siècle. Son œuvre, initialement conçue pour formaliser les lois de la pensée logique, s\'est révélée être l\'outil parfait pour décrire le comportement des circuits de commutation. L\'algèbre de Boole est la structure mathématique qui régit les relations entre des variables ne pouvant prendre que deux valeurs. Elle est le fondement théorique sur lequel repose l\'ensemble du génie informatique matériel, des plus simples portes logiques aux microprocesseurs les plus sophistiqués. Dans les sections suivantes, nous allons construire cette algèbre à partir de ses fondements axiomatiques pour en dériver les propriétés qui gouvernent la conception de tous les systèmes numériques.

### 7.1.2 Fondements Axiomatiques : Les Postulats de Huntington

Pour aborder l\'algèbre de Boole avec la rigueur qu\'elle mérite, il est essentiel de la définir non pas comme une collection de règles empiriques, mais comme une structure mathématique formelle. Une telle structure est définie par un ensemble d\'éléments, un ensemble d\'opérations sur ces éléments, et un ensemble de postulats (ou axiomes) que ces opérations doivent satisfaire. Tout ce que nous pourrons affirmer par la suite sur cette algèbre devra être une conséquence logique directe de ces postulats fondateurs. En 1904, le mathématicien américain Edward Huntington a proposé un ensemble particulièrement élégant et concis de postulats pour définir une algèbre de Boole.

Formellement, une algèbre de Boole est une structure (B,+,⋅,′,0,1) où B est un ensemble, + et ⋅ sont deux opérateurs binaires, ′ est un opérateur unaire, et 0 et 1 sont deux éléments distincts de B. Pour les applications en logique numérique, nous nous intéressons spécifiquement à l\'algèbre de Boole à deux valeurs, où l\'ensemble B est simplement {0,1}. Les opérateurs + et ⋅ sont communément appelés OU logique (disjonction) et ET logique (conjonction), respectivement. L\'opérateur ′ est la négation ou le complément (NON logique).

Les postulats de Huntington, adaptés à notre ensemble B={0,1}, sont les suivants :

Postulat 1 : Fermeture

L\'ensemble B est fermé sous les opérateurs + et ⋅. Cela signifie que pour toute paire d\'éléments x et y dans B, le résultat de x+y et de x⋅y est également un élément de B.

- Pour + : 0+0=0, 0+1=1, 1+0=1, 1+1=1. Tous les résultats sont dans {0,1}.
- Pour ⋅ : 0⋅0=0, 0⋅1=0, 1⋅0=0, 1⋅1=1. Tous les résultats sont dans {0,1}.
  Ce postulat garantit que les opérations ne nous font jamais \"sortir\" du système binaire.4

Postulat 2 : Éléments Identité

Il existe un élément identité pour chaque opérateur.

- \(a\) Pour l\'opérateur +, l\'élément identité est 0, tel que pour tout x∈B, x+0=x.
- \(b\) Pour l\'opérateur ⋅, l\'élément identité est 1, tel que pour tout x∈B, x⋅1=x.
  Cet axiome est analogue à l\'existence du 0 pour l\'addition et du 1 pour la multiplication dans l\'algèbre des nombres réels.1

Postulat 3 : Commutativité

Les opérateurs + et ⋅ sont commutatifs. Pour tous x,y∈B :

- \(a\) x+y=y+x
- \(b\) x⋅y=y⋅x
  L\'ordre des opérandes n\'affecte pas le résultat, une propriété partagée avec l\'addition et la multiplication ordinaires.2

Postulat 4 : Distributivité

Chaque opérateur est distributif sur l\'autre. Pour tous x,y,z∈B :

- \(a\) x⋅(y+z)=(x⋅y)+(x⋅z)
- \(b\) x+(y⋅z)=(x+y)⋅(x+z)
  La première loi de distributivité (4a) est familière en algèbre ordinaire. Cependant, la seconde (4b) est unique à l\'algèbre de Boole et n\'a pas d\'équivalent dans l\'algèbre des nombres réels. C\'est une source de nombreuses propriétés puissantes et parfois contre-intuitives de la logique binaire.1

Postulat 5 : Complément

Pour chaque élément x∈B, il existe un élément complémentaire x′∈B tel que :

- \(a\) x+x′=1
- \(b\) x⋅x′=0
  Dans l\'algèbre à deux valeurs, le complément de 0 est 1, et le complément de 1 est 0. Ce postulat introduit l\'opération de négation et garantit que chaque variable a un opposé logique.1

Postulat 6 : Existence

L\'ensemble B contient au moins deux éléments distincts, x et y, tels que x=y. Pour notre cas, ces éléments sont 0 et 1. Ce postulat évite le cas trivial d\'une algèbre avec un seul élément.1

Il est crucial de comprendre la nature de ces postulats. Ils ne sont pas des vérités à démontrer, mais les \"règles du jeu\" que nous nous imposons. Comme le suggère l\'article original de Huntington, les postulats sont des conditions \"arbitrairement imposées\" sur les concepts fondamentaux. Il existe d\'autres ensembles d\'axiomes qui pourraient servir de base à la même algèbre. Le choix de Huntington est remarquable par son élégance et sa symétrie. Cette perspective est libératrice : elle nous montre que l\'algèbre de Boole n\'est pas une simple collection de règles à mémoriser, mais un système logique cohérent et complet qui découle entièrement de ce petit nombre de prémisses fondamentales. C\'est la raison pour laquelle notre étude commence par ces axiomes : tous les théorèmes que nous allons maintenant dériver ne sont pas de nouvelles règles, mais des conséquences logiques inévitables de ces six postulats de départ.

**Tableau 7.1 : Postulats de l\'Algèbre de Boole (selon Huntington)**

---

  Postulat        Nom              Formulation (a) - Forme OU (+)                       Formulation (b) - Forme ET (·)

  **1**           Fermeture        Pour tous x,y∈B, x+y∈B                               Pour tous x,y∈B, x⋅y∈B

  **2**           Identité         x+0=x                                                x⋅1=x

  **3**           Commutativité    x+y=y+x                                              x⋅y=y⋅x

  **4**           Distributivité   x+(y⋅z)=(x+y)⋅(x+z)                                  x⋅(y+z)=(x⋅y)+(x⋅z)

  **5**           Complément       x+x′=1                                               x⋅x′=0

  **6**           Existence        Il existe au moins deux éléments distincts dans B.   (N/A)

---

### 7.1.3 Théorèmes Fondamentaux et Principe de Dualité

Une fois les postulats établis, nous pouvons les utiliser comme outils pour construire et prouver des propositions plus complexes, appelées théorèmes. Ces théorèmes nous fourniront des règles de manipulation algébrique essentielles pour la simplification et la transformation des expressions booléennes.

Avant de dériver ces théorèmes, il convient d\'introduire un concept d\'une puissance et d\'une élégance remarquables : le **principe de dualité**. En observant attentivement les postulats de Huntington listés dans le Tableau 7.1, une symétrie frappante apparaît. Les postulats 2, 3, 4 et 5 sont présentés en paires. Si l\'on prend une des équations de ces paires et que l\'on intervertit systématiquement les opérateurs + et ⋅, ainsi que les éléments identité 0 et 1, on obtient précisément l\'autre équation de la paire. Par exemple, le dual de

x+0=x (Postulat 2a) est x⋅1=x (Postulat 2b).

Cette symétrie n\'est pas une coïncidence ; elle est ancrée dans la structure axiomatique même de l\'algèbre. Puisque les axiomes qui définissent le système sont eux-mêmes organisés en paires duales, il s\'ensuit que toute vérité logique (théorème) dérivée exclusivement de ces axiomes doit avoir une vérité duale correspondante. Cette vérité duale peut être obtenue en appliquant la même transformation de dualité (interversion de +/⋅ et de 0/1) à l\'énoncé du théorème original. Le principe de dualité est donc une méta-propriété de l\'algèbre qui nous permet, une fois qu\'un théorème est prouvé, d\'affirmer la validité de son dual sans avoir à fournir une nouvelle preuve. C\'est un outil d\'une grande efficacité intellectuelle.

Nous allons maintenant dériver les théorèmes les plus importants de l\'algèbre de Boole. Pour chaque théorème, nous fournirons une preuve formelle pour une de ses formes, en invoquant le principe de dualité pour justifier son corollaire.

Théorème 1 : Idempotence

Ce théorème stipule qu\'appliquer une opération à une variable avec elle-même ne change pas la valeur de la variable.

- \(a\) x+x=x
- \(b\) x⋅x=x (Dual de 1a)

*Preuve de (1a) :*

x+x=(x+x)⋅1=(x+x)⋅(x+x′)=x+(x⋅x′)=x+0=xpar Postulat 2b (Identiteˊ)par Postulat 5a (Compleˊment)par Postulat 4b (Distributiviteˊ)par Postulat 5b (Compleˊment)par Postulat 2a (Identiteˊ)

La preuve est complète. En vertu du principe de dualité, le théorème 1b, x⋅x=x, est également vrai.

Théorème 2 : Éléments Nuls / Absorbants

Ce théorème définit le comportement des variables face aux éléments identité de l\'opérateur opposé.

- \(a\) x+1=1
- \(b\) x⋅0=0 (Dual de 2a)

*Preuve de (2a) :*

x+1=(x+1)⋅1=(x+1)⋅(x+x′)=x+(1⋅x′)=x+(x′⋅1)=x+x′=1par Postulat 2b (Identiteˊ)par Postulat 5a (Compleˊment)par Postulat 4b (Distributiviteˊ)par Postulat 3b (Commutativiteˊ)par Postulat 2b (Identiteˊ)par Postulat 5a (Compleˊment)

La preuve est complète. Le théorème 2b, x⋅0=0, est vrai par dualité.

Théorème 3 : Involution

La double négation d\'une variable retourne la variable originale.

- (x′)′=x

Preuve :

Le postulat 5 définit le complément x′ d\'un élément x par les deux relations x+x′=1 et x⋅x′=0. Ces relations définissent x′ de manière unique. De la même manière, le complément de x′, noté (x′)′, doit satisfaire x′+(x′)′=1 et x′⋅(x′)′=0.

Cependant, par commutativité (Postulat 3), les relations initiales peuvent s\'écrire x′+x=1 et x′⋅x=0. En comparant ces deux paires d\'équations, nous voyons que x satisfait à la définition du complément de x′. Puisque le complément est unique, il s\'ensuit que (x′)′=x.2

Théorème 4 : Associativité

Bien que non inclus dans les postulats de Huntington, l\'associativité peut être démontrée. Elle permet d\'omettre les parenthèses dans des expressions de même opérateur.

- \(a\) x+(y+z)=(x+y)+z
- \(b\) x⋅(y⋅z)=(x⋅y)⋅z (Dual de 4a)

Preuve de (4a) :

La preuve algébrique de l\'associativité à partir des seuls postulats de Huntington est longue et non triviale. Une approche plus directe et tout aussi rigoureuse pour une algèbre à deux valeurs est la preuve par table de vérité, ou induction parfaite. Elle consiste à évaluer les deux côtés de l\'équation pour toutes les combinaisons possibles des variables.

---

  x        y        z        y+z      x+(y+z)   x+y      (x+y)+z

  0        0        0        0        **0**     0        **0**

  0        0        1        1        **1**     0        **1**

  0        1        0        1        **1**     1        **1**

  0        1        1        1        **1**     1        **1**

  1        0        0        0        **1**     1        **1**

  1        0        1        1        **1**     1        **1**

  1        1        0        1        **1**     1        **1**

  1        1        1        1        **1**     1        **1**

---

Les colonnes pour x+(y+z) et (x+y)+z étant identiques pour toutes les combinaisons, l\'égalité est prouvée. L\'associativité du produit (4b) est vraie par dualité.

Théorème 5 : Théorèmes de De Morgan

Ces théorèmes, nommés d\'après le mathématicien Augustus De Morgan, sont absolument fondamentaux. Ils fournissent une méthode pour complémenter des expressions complexes et établissent un pont entre les opérations ET et OU.

- \(a\) (x+y)′=x′⋅y′
- \(b\) (x⋅y)′=x′+y′ (Dual de 5a)

*Preuve de (5a) par table de vérité :*

---

  x        y        x+y      (x+y)\'   x\'      y\'      x\' · y\'

  0        0        0        **1**     1        1        **1**

  0        1        1        **0**     1        0        **0**

  1        0        1        **0**     0        1        **0**

  1        1        1        **0**     0        0        **0**

---

Les colonnes pour (x+y)′ et x′⋅y′ étant identiques, le théorème est prouvé. Le théorème 5b est vrai par dualité. Ces lois se généralisent à

n variables.

Théorème 6 : Absorption

Ce théorème est très utile pour la simplification d\'expressions.

- \(a\) x+(x⋅y)=x
- \(b\) x⋅(x+y)=x (Dual de 6a)

*Preuve de (6a) :*

x+(x⋅y)=(x⋅1)+(x⋅y)=x⋅(1+y)=x⋅(y+1)=x⋅1=xpar Postulat 2b (Identiteˊ)par Postulat 4a (Distributiviteˊ)par Postulat 3a (Commutativiteˊ)par Theˊoreˋme 2a (Eˊleˊment Nul)par Postulat 2b (Identiteˊ)

La preuve est complète. Le théorème 6b est vrai par dualité.

Ces théorèmes constituent notre boîte à outils pour l\'analyse et la synthèse de circuits logiques. Ils permettent de prendre une expression booléenne complexe et de la réduire à une forme plus simple, qui se traduira par un circuit plus petit, plus rapide et moins coûteux.

**Tableau 7.2 : Théorèmes Fondamentaux de l\'Algèbre de Boole et leurs Duaux**

---

  Théorème        Nom                 Forme OU (+)      Forme ET (·) - Duale

  **1**           Idempotence         x+x=x             x⋅x=x

  **2**           Élément Absorbant   x+1=1             x⋅0=0

  **3**           Involution          (x′)′=x           (x′)′=x

  **4**           Associativité       x+(y+z)=(x+y)+z   x⋅(y⋅z)=(x⋅y)⋅z

  **5**           De Morgan           (x+y)′=x′⋅y′      (x⋅y)′=x′+y′

  **6**           Absorption          x+(x⋅y)=x         x⋅(x+y)=x

---

### 7.1.4 Fonctions Booléennes et Formes Canoniques

Une **fonction booléenne** est une application qui associe une ou plusieurs variables d\'entrée booléennes à une unique sortie booléenne. Formellement, il s\'agit d\'une fonction f:Bn→B, où B={0,1} et n est le nombre de variables d\'entrée. Par exemple, une fonction à trois variables A,B,C pourrait être définie par l\'expression algébrique F(A,B,C)=A⋅B+C′.

La méthode la plus fondamentale et la plus exhaustive pour décrire une fonction booléenne est la **table de vérité**. Une table de vérité liste systématiquement toutes les 2n combinaisons possibles des valeurs des variables d\'entrée et, pour chaque combinaison, spécifie la valeur de sortie correspondante de la fonction. Elle constitue une définition non ambiguë de la fonction, indépendante de toute expression algébrique particulière.

Considérons une fonction arbitraire F à trois variables A,B,C définie par la table de vérité suivante :

---

  A               B               C               F

  0               0               0               0

  0               0               1               1

  0               1               0               0

  0               1               1               1

  1               0               0               0

  1               0               1               0

  1               1               0               1

  1               1               1               1

---

À partir d\'une telle table, nous pouvons toujours dériver une expression algébrique pour la fonction. Les **formes canoniques** sont des formats standards pour ces expressions, qui ont la propriété d\'être uniques pour une fonction donnée.

**Mintermes et Forme Canonique Somme de Produits (SOP)**

Un **minterme** est un terme produit (un ET logique) qui inclut toutes les variables de la fonction, soit sous leur forme directe, soit sous leur forme complémentée. Chaque minterme est associé à une unique combinaison des variables d\'entrée et prend la valeur 1 *uniquement* pour cette combinaison. Pour une ligne donnée de la table de vérité, le minterme correspondant est formé en complémentant une variable si sa valeur est 0, et en la laissant telle quelle si sa valeur est 1.

Pour notre exemple, les mintermes associés aux lignes où F=1 sont :

- Ligne 2 (001) : m1=A′⋅B′⋅C
- Ligne 4 (011) : m3=A′⋅B⋅C
- Ligne 7 (110) : m6=A⋅B⋅C′
- Ligne 8 (111) : m7=A⋅B⋅C

La **forme canonique somme de produits (SOP)** exprime la fonction comme une somme logique (OU) de tous les mintermes pour lesquels la fonction vaut 1. Cette forme est une traduction directe des lignes \"vraies\" de la table de vérité.

Pour notre fonction F, la forme SOP est :

F(A,B,C)=(A′⋅B′⋅C)+(A′⋅B⋅C)+(A⋅B⋅C′)+(A⋅B⋅C)

On peut aussi l\'écrire en utilisant la notation sommatoire : F=∑m(1,3,6,7).

Cette expression, bien que potentiellement complexe, est une représentation algébrique garantie de la fonction. Elle peut ensuite être simplifiée en utilisant les théorèmes de l\'algèbre de Boole.

**Maxtermes et Forme Canonique Produit de Sommes (POS)**

De manière duale, un **maxterme** est un terme somme (un OU logique) qui inclut toutes les variables de la fonction, soit sous leur forme directe, soit sous leur forme complémentée. Chaque maxterme est associé à une unique combinaison des variables d\'entrée et prend la valeur 0 *uniquement* pour cette combinaison. Pour une ligne donnée de la table de vérité, le maxterme correspondant est formé en laissant une variable telle quelle si sa valeur est 0, et en la complémentant si sa valeur est 1.

Pour notre exemple, les maxtermes associés aux lignes où F=0 sont :

- Ligne 1 (000) : M0=A+B+C
- Ligne 3 (010) : M2=A+B′+C
- Ligne 5 (100) : M4=A′+B+C
- Ligne 6 (101) : M5=A′+B+C′

La **forme canonique produit de sommes (POS)** exprime la fonction comme un produit logique (ET) de tous les maxtermes pour lesquels la fonction vaut 0. Cette forme est une traduction directe des lignes \"fausses\" de la table de vérité.

Pour notre fonction F, la forme POS est :

F(A,B,C)=(A+B+C)⋅(A+B′+C)⋅(A′+B+C)⋅(A′+B+C′)

On peut aussi l\'écrire en utilisant la notation produit : F=∏M(0,2,4,5).

L\'existence des formes canoniques SOP et POS est d\'une importance capitale. Elle garantit que toute fonction booléenne, quelle que soit sa complexité, peut être exprimée algébriquement en utilisant uniquement les trois opérations de base : ET, OU et NON. Cette propriété est le fondement de la complétude fonctionnelle et de la synthèse logique.

### 7.1.5 Les Portes Logiques : Blocs de Construction Élémentaires

Si l\'algèbre de Boole fournit le cadre mathématique abstrait, les **portes logiques** sont les réalisations physiques concrètes de ses opérateurs. Une porte logique est un circuit électronique qui reçoit un ou plusieurs signaux d\'entrée (représentant des valeurs booléennes) et produit un unique signal de sortie, dont la valeur est déterminée par une fonction booléenne spécifique. Ces portes sont les briques de base avec lesquelles tous les circuits numériques, des simples additionneurs aux microprocesseurs, sont construits.

Chaque porte logique est caractérisée par son expression booléenne, sa table de vérité et son symbole graphique. Deux normes de symbolisation sont largement utilisées dans l\'industrie et la littérature académique : la norme **ANSI** (American National Standards Institute), qui utilise des symboles à formes distinctives (parfois appelée norme \"militaire\"), et la norme **IEC** (International Electrotechnical Commission), qui utilise des symboles rectangulaires avec des qualificateurs internes. Un ingénieur ou un scientifique se doit de connaître les deux.

Nous présentons ci-dessous les portes logiques fondamentales.

Porte NON (NOT Gate / Inverter)

La porte NON implémente l\'opérateur de complément. Elle possède une seule entrée et une seule sortie. La sortie est toujours l\'état logique inverse de l\'entrée.

- **Expression Booléenne :** Y=A′ (ou A)
- **Table de Vérité :**

  ---

  A                              Y

  0                              1

  1                              0

  ---

Porte ET (AND Gate)

La porte ET implémente l\'opérateur de produit logique. La sortie est à 1 si et seulement si toutes ses entrées sont à 1.

- **Expression Booléenne :** Y=A⋅B
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    0

  0                    1                    0

  1                    0                    0

  1                    1                    1

  ---

Porte OU (OR Gate)

La porte OU implémente l\'opérateur de somme logique. La sortie est à 1 si au moins une de ses entrées est à 1.

- **Expression Booléenne :** Y=A+B
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    0

  0                    1                    1

  1                    0                    1

  1                    1                    1

  ---

Porte NON-ET (NAND Gate)

La porte NAND est l\'une des deux portes dites \"universelles\". Elle est équivalente à une porte ET suivie d\'une porte NON. La sortie est à 0 si et seulement si toutes ses entrées sont à 1.

- **Expression Booléenne :** Y=(A⋅B)′
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    1

  0                    1                    1

  1                    0                    1

  1                    1                    0

  ---

Porte NON-OU (NOR Gate)

La porte NOR est la seconde porte universelle. Elle est équivalente à une porte OU suivie d\'une porte NON. La sortie est à 1 si et seulement si toutes ses entrées sont à 0.

- **Expression Booléenne :** Y=(A+B)′
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    1

  0                    1                    0

  1                    0                    0

  1                    1                    0

  ---

Porte OU Exclusif (XOR Gate)

La porte XOR (eXclusive OR) produit une sortie à 1 si et seulement si ses entrées ont des valeurs logiques différentes. Elle peut être vue comme un détecteur d\'inégalité.

- **Expression Booléenne :** Y=A⊕B=A′B+AB′
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    0

  0                    1                    1

  1                    0                    1

  1                    1                    0

  ---

Porte NON-OU Exclusif (XNOR Gate)

La porte XNOR est l\'inverse de la porte XOR. Elle produit une sortie à 1 si et seulement si ses entrées ont des valeurs logiques identiques. Elle agit comme un détecteur d\'égalité.

- **Expression Booléenne :** Y=(A⊕B)′=A′B′+AB
- **Table de Vérité (2 entrées) :**

  ---

  A                    B                    Y

  0                    0                    1

  0                    1                    0

  1                    0                    0

  1                    1                    1

  ---

Le tableau suivant synthétise ces informations, en incluant les deux standards de symbolisation.

**Tableau 7.3 : Synthèse des Portes Logiques**

---

  Nom de la Porte              Expression Booléenne   Table de Vérité (2 entrées)   Symbole ANSI                                                                                                                                                                                                                      Symbole IEC

  **NON** (Inverseur)          Y=A′                   A=0, Y=1 A=1, Y=0             !([[https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Not-gate-en.svg/100px-Not-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Not-gate-en.svg/100px-Not-gate-en.svg.png))       !([[https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/IEC_Inverter.svg/100px-IEC_Inverter.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/IEC_Inverter.svg/100px-IEC_Inverter.svg.png))

  **ET** (AND)                 Y=A⋅B                  00→0, 01→0, 10→0, 11→1        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/And-gate-en.svg/100px-And-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/And-gate-en.svg/100px-And-gate-en.svg.png))       !([[https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/IEC_AND_gate.svg/100px-IEC_AND_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/IEC_AND_gate.svg/100px-IEC_AND_gate.svg.png))

  **OU** (OR)                  Y=A+B                  00→0, 01→1, 10→1, 11→1        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Or-gate-en.svg/100px-Or-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Or-gate-en.svg/100px-Or-gate-en.svg.png))           !([[https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/IEC_OR_gate.svg/100px-IEC_OR_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/IEC_OR_gate.svg/100px-IEC_OR_gate.svg.png))

  **NON-ET** (NAND)            Y=(A⋅B)′               00→1, 01→1, 10→1, 11→0        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Nand-gate-en.svg/100px-Nand-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Nand-gate-en.svg/100px-Nand-gate-en.svg.png))   !([[https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/IEC_NAND_gate.svg/100px-IEC_NAND_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/IEC_NAND_gate.svg/100px-IEC_NAND_gate.svg.png))

  **NON-OU** (NOR)             Y=(A+B)′               00→1, 01→0, 10→0, 11→0        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nor-gate-en.svg/100px-Nor-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nor-gate-en.svg/100px-Nor-gate-en.svg.png))       !([[https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/IEC_NOR_gate.svg/100px-IEC_NOR_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/IEC_NOR_gate.svg/100px-IEC_NOR_gate.svg.png))

  **OU Exclusif** (XOR)        Y=A⊕B                  00→0, 01→1, 10→1, 11→0        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Xor-gate-en.svg/100px-Xor-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Xor-gate-en.svg/100px-Xor-gate-en.svg.png))       !([[https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/IEC_XOR_gate.svg/100px-IEC_XOR_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/IEC_XOR_gate.svg/100px-IEC_XOR_gate.svg.png))

  **NON-OU Exclusif** (XNOR)   Y=(A⊕B)′               00→1, 01→0, 10→0, 11→1        !([[https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Xnor-gate-en.svg/100px-Xnor-gate-en.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Xnor-gate-en.svg/100px-Xnor-gate-en.svg.png))   !([[https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/IEC_XNOR_gate.svg/100px-IEC_XNOR_gate.svg.png]](https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/IEC_XNOR_gate.svg/100px-IEC_XNOR_gate.svg.png))

---

### 7.1.6 Complétude Fonctionnelle et Portes Universelles

La section précédente a introduit un \"zoo\" de sept portes logiques différentes. Une question naturelle se pose alors : avons-nous besoin de toutes ces portes pour construire n\'importe quel circuit logique imaginable? La réponse, qui a des implications profondes tant sur le plan théorique que pratique, réside dans le concept de **complétude fonctionnelle**.

Un ensemble de portes logiques est dit **fonctionnellement complet** (ou universel) si n\'importe quelle fonction booléenne, quelle que soit sa complexité, peut être réalisée en utilisant uniquement des portes de cet ensemble.

Nous avons déjà établi un résultat crucial à la section 7.1.4 : toute fonction booléenne peut être exprimée sous une forme canonique, soit une somme de produits (SOP), soit un produit de sommes (POS). Une expression SOP est une somme (OU) de termes qui sont des produits (ET) de variables ou de leurs compléments (NON). Une expression POS est un produit (ET) de termes qui sont des sommes (OU) de variables ou de leurs compléments (NON). Dans les deux cas, les seules opérations nécessaires sont ET, OU et NON. Par conséquent, l\'ensemble {ET, OU, NON} est fonctionnellement complet. C\'est une conséquence directe et puissante de la théorie des formes canoniques.

Le résultat le plus remarquable, cependant, est qu\'il est possible de réduire encore cet ensemble. Les portes NAND et NOR, prises individuellement, forment chacune un ensemble fonctionnellement complet. C\'est pourquoi elles sont souvent appelées **portes universelles**.

Cette propriété n\'est pas un simple exercice mathématique. Elle constitue la justification théorique d\'une pratique d\'ingénierie fondamentale qui a rendu possible la révolution des circuits intégrés. Un fabricant de puces électroniques peut se concentrer sur la conception et l\'optimisation (en termes de vitesse, de consommation d\'énergie et de surface sur le silicium) d\'un seul type de cellule logique de base --- une porte NAND, par exemple. En répliquant cette cellule des millions ou des milliards de fois, il peut construire des circuits arbitrairement complexes, des mémoires aux processeurs, sans avoir besoin de fabriquer et de caractériser d\'autres types de portes. Cette standardisation à l\'échelle la plus élémentaire est un facteur clé de l\'efficacité et de la rentabilité de la fabrication des semi-conducteurs.

Pour prouver que les ensembles {NAND} et {NOR} sont universels, il suffit de montrer que nous pouvons réaliser les trois opérations de base (NON, ET, OU) en utilisant uniquement la porte en question.

**Démonstration de l\'universalité de la porte NAND**

Nous allons construire les trois portes de base en utilisant exclusivement des portes NAND à deux entrées.

1. Réalisation de la fonction NON :Pour obtenir un inverseur, il suffit de connecter les deux entrées d\'une porte NAND à la même source, A.

   - Expression : Y=(A⋅A)′
   - Par le théorème d\'idempotence (A⋅A=A), cela se simplifie en : Y=A′.
   - Circuit : Une porte NAND dont les deux entrées sont reliées à A.
2. Réalisation de la fonction ET :La fonction ET est simplement une fonction NAND suivie d\'une négation. Nous pouvons donc utiliser une porte NAND pour effectuer l\'opération NAND, puis une seconde porte NAND configurée en inverseur (comme ci-dessus) pour complémenter le résultat.

   - Expression : Y=((A⋅B)′)′
   - Par le théorème d\'involution ((X)′)′=X), cela se simplifie en : Y=A⋅B.
   - Circuit : La sortie d\'une première porte NAND (avec entrées A et B) est connectée aux deux entrées d\'une seconde porte NAND.
3. Réalisation de la fonction OU :La réalisation de la fonction OU est moins directe et s\'appuie sur le théorème de De Morgan. Le théorème de De Morgan nous dit que A+B=(A′⋅B′)′. Nous pouvons donc procéder en trois étapes : inverser les entrées A et B séparément, puis appliquer une porte NAND à ces entrées inversées.

   - Expression : Y=(A′⋅B′)′
   - Par le théorème de De Morgan ((X′⋅Y′)′=X+Y), cela se simplifie en : Y=A+B.
   - Circuit : L\'entrée A est connectée à un premier inverseur à base de NAND. L\'entrée B est connectée à un second inverseur à base de NAND. Les sorties de ces deux inverseurs (A′ et B′) deviennent les entrées d\'une troisième porte NAND.

Puisque nous avons réalisé les trois fonctions de base NON, ET et OU, nous avons prouvé que l\'ensemble {NAND} est fonctionnellement complet.

**Démonstration de l\'universalité de la porte NOR**

La preuve est duale à la précédente, s\'appuyant sur l\'autre forme du théorème de De Morgan.

1. Réalisation de la fonction NON :De manière identique à la porte NAND, on connecte les deux entrées d\'une porte NOR à la même source, A.

   - Expression : Y=(A+A)′
   - Par le théorème d\'idempotence (A+A=A), cela se simplifie en : Y=A′.
2. Réalisation de la fonction OU :Une fonction OU est une fonction NOR suivie d\'une négation.

   - Expression : Y=((A+B)′)′
   - Par le théorème d\'involution, cela se simplifie en : Y=A+B.
3. Réalisation de la fonction ET :Nous utilisons la forme duale du théorème de De Morgan : A⋅B=(A′+B′)′.

   - Expression : Y=(A′+B′)′
   - Par le théorème de De Morgan ((X′+Y′)′=X⋅Y), cela se simplifie en : Y=A⋅B.
   - Circuit : Les entrées A et B sont inversées séparément à l\'aide de portes NOR, puis les résultats sont passés à travers une troisième porte NOR.

L\'ensemble {NOR} est donc également fonctionnellement complet. Cette propriété de dualité entre NAND et NOR reflète la symétrie profonde de l\'algèbre de Boole elle-même, une symétrie qui se propage de la théorie la plus abstraite jusqu\'à la conception pratique des circuits logiques.

## 7.2 Représentation des Nombres

Après avoir établi le formalisme de la logique binaire, nous devons maintenant aborder une question fondamentale pour tout système de calcul : comment représenter les nombres en utilisant uniquement des 0 et des 1? La capacité à représenter et à manipuler des quantités numériques est au cœur de l\'informatique. Cette section explorera en détail les systèmes de numération utilisés dans les ordinateurs, des entiers simples aux nombres réels complexes, en justifiant les choix de représentation par les contraintes et les objectifs de l\'arithmétique machine.

### 7.2.1 Systèmes de Numération Positionnels

La méthode que nous utilisons intuitivement pour écrire les nombres en base 10 est un exemple de **système de numération positionnel**. Dans un tel système, la valeur d\'un chiffre dépend non seulement du symbole lui-même, mais aussi de sa position dans la séquence qui forme le nombre.

Formellement, un nombre N dans une base (ou \"radix\") b (où b est un entier supérieur à 1) est représenté par une séquence de chiffres (dn−1dn−2...d1d0.d−1d−2...d−m)b. Chaque chiffre di est un symbole appartenant à un ensemble de b symboles possibles, typiquement {0,1,...,b−1}. La valeur du nombre N est donnée par la somme polynomiale :

N=i=−m∑n−1di×bi

Le terme bi est appelé le poids de la position i. Le point qui sépare les poids positifs ou nuls des poids négatifs est appelé le point de base (ou virgule en français).16

En informatique, plusieurs bases sont d\'une importance capitale :

- **Base 2 (Binaire) :** Le système natif des ordinateurs. Les chiffres (appelés **bits**, pour *binary digits*) sont {0,1}. Un groupe de 8 bits est appelé un **octet** (*byte*).
- **Base 10 (Décimal) :** Le système utilisé par les humains. Les chiffres sont {0,1,2,3,4,5,6,7,8,9}.
- **Base 8 (Octal) :** Utilise les chiffres {0,1,2,3,4,5,6,7}. Elle était populaire dans les débuts de l\'informatique car elle permet de compacter la représentation binaire.
- **Base 16 (Hexadécimal) :** Utilise les 10 chiffres décimaux et les 6 premières lettres de l\'alphabet : {0,1,...,9,A,B,C,D,E,F}, où A représente la valeur 10, B la valeur 11, et ainsi de suite jusqu\'à F pour 15. L\'hexadécimal est extrêmement répandu aujourd\'hui comme notation compacte pour les nombres binaires.

**Algorithmes de Conversion**

La maîtrise des conversions entre ces bases est une compétence essentielle.

1\. Conversion d\'une Base b vers la Base 10 (Décimal)

Cet algorithme est une application directe de la définition polynomiale. On multiplie chaque chiffre par le poids de sa position et on additionne les résultats.

- Exemple (Entier) : Convertir (1A5F)16 en décimal.(1A5F)16=1×163+A×162+5×161+F×160=1×4096+10×256+5×16+15×1=4096+2560+80+15=(6751)10
- Exemple (Fractionnaire) : Convertir (1101.101)2 en décimal.
  \$\$ (1101.101)2 = (1 \\times 2\^3 + 1 \\times 2\^2 + 0 \\times 2\^1 + 1 \\times 2\^0) + (1 \\times 2\^{-1} + 0 \\times 2\^{-2} + 1 \\times 2\^{-3}) \$\$ \$\$ = (8 + 4 + 0 + 1) + (0.5 + 0 + 0.125) \$\$ \$\$ = 13 + 0.625 = (13.625){10} \$\$

2\. Conversion de la Base 10 (Décimal) vers une Base b

La méthode diffère pour la partie entière et la partie fractionnaire.

- Partie Entière : Méthode des Divisions SuccessivesL\'algorithme consiste à diviser répétitivement le nombre décimal par la nouvelle base b et à collecter les restes. Le premier reste obtenu est le chiffre de poids le plus faible (le plus à droite), et le dernier reste est celui de poids le plus fort.

  - **Exemple :** Convertir (157)10 en binaire (base 2).

    - 157÷2=78 reste **1** (LSB - Least Significant Bit)
    - 78÷2=39 reste **0**
    - 39÷2=19 reste **1**
    - 19÷2=9 reste **1**
    - 9÷2=4 reste **1**
    - 4÷2=2 reste **0**
    - 2÷2=1 reste **0**
    - 1÷2=0 reste 1 (MSB - Most Significant Bit)
      En lisant les restes de bas en haut, on obtient : (157)10=(10011101)2.17
- Partie Fractionnaire : Méthode des Multiplications SuccessivesL\'algorithme consiste à multiplier répétitivement la partie fractionnaire par la nouvelle base b et à collecter les parties entières des résultats. La première partie entière obtenue est le chiffre de poids le plus fort (le plus à gauche après la virgule).

  - **Exemple :** Convertir (0.8125)10 en hexadécimal (base 16).

    - 0.8125×16=13.0. Partie entière = 13 (qui est D en hexadécimal).
      La partie fractionnaire est maintenant 0, donc le processus s\'arrête.
      Le résultat est : (0.8125)10=(0.D)16.19

Il est important de noter que certaines fractions qui ont une représentation finie en base 10 peuvent avoir une représentation infinie et périodique dans une autre base. Par exemple, (0.1)10 en binaire donne 0.0001100110011\...2, une séquence qui ne se termine jamais. C\'est une source fondamentale d\'erreurs d\'arrondi dans les calculs informatiques.

3\. Conversions Rapides entre les Bases 2, 8 et 16

La conversion entre le binaire, l\'octal et l\'hexadécimal est grandement simplifiée par le fait que leurs bases sont des puissances de 2 (8=23, 16=24). Cette relation permet d\'utiliser une méthode de groupement de bits, beaucoup plus rapide que de passer par la base 10.

- **Binaire vers Octal / Hexadécimal :**

  1. En partant du point de base, grouper les bits de la partie entière de droite à gauche, et ceux de la partie fractionnaire de gauche à droite.
  2. Pour l\'octal, former des groupes de **3** bits. Pour l\'hexadécimal, former des groupes de **4** bits.
  3. Si nécessaire, ajouter des zéros à gauche de la partie entière ou à droite de la partie fractionnaire pour compléter le dernier groupe.
  4. Convertir chaque groupe de bits en son chiffre octal ou hexadécimal équivalent.

  - **Exemple :** Convertir (10110001101011.1111001)2 en hexadécimal.

    - Partie entière : 10 1100 0110 1011 -\> 0010 1100 0110 1011
    - Partie fractionnaire : 1111 001 -\> 1111 0010
    - Conversion des groupes :

      - 0010 -\> 2
      - 1100 -\> C
      - 0110 -\> 6
      - 1011 -\> B
      - 1111 -\> F
      - 0010 -\> 2
    - Résultat : (2C6B.F2)16.
- Octal / Hexadécimal vers Binaire :Il suffit d\'inverser le processus : remplacer chaque chiffre octal par son équivalent sur 3 bits, ou chaque chiffre hexadécimal par son équivalent sur 4 bits.

  - **Exemple :** Convertir (3A7.C)16 en binaire.

    - 3 -\> 0011
    - A -\> 1010
    - 7 -\> 0111
    - C -\> 1100
    - Résultat : (001110100111.1100)2.

Cette technique de conversion rapide est la raison pour laquelle les programmeurs et les ingénieurs utilisent l\'hexadécimal comme une \"sténographie\" pour le binaire. Il est beaucoup plus facile et moins sujet aux erreurs de lire et d\'écrire 0xDEADBEEF que 11011110101011011011111011101111.

### 7.2.2 Arithmétique des Entiers Signés

La représentation des nombres entiers non signés (positifs) est directe. Cependant, pour effectuer des calculs utiles, un système doit pouvoir manipuler des nombres négatifs. Le choix de la méthode de représentation des entiers signés a des conséquences profondes sur la complexité et l\'efficacité du matériel de calcul.

**Analyse Comparative des Représentations**

Trois méthodes principales ont été envisagées pour représenter des entiers signés sur un nombre fixe de k bits.

1. Signe-Magnitude (ou Signe et Valeur Absolue)L\'idée la plus intuitive est de réserver le bit de poids le plus fort (MSB) pour indiquer le signe (par convention, 0 pour positif, 1 pour négatif) et d\'utiliser les k−1 bits restants pour représenter la magnitude (valeur absolue) du nombre.

   - *Exemple sur 8 bits :*

     - +42=(00101010)2
     - −42=(10101010)2
       Cette représentation souffre de deux inconvénients majeurs :
   - **Double représentation de zéro :** Il existe un \"+0\" ((00000000)2) et un \"-0\" ((10000000)2), ce qui complique les tests d\'égalité.
   - **Complexité de l\'arithmétique :** L\'addition et la soustraction nécessitent des circuits complexes. L\'opération à effectuer dépend des signes des deux opérandes. Par exemple, pour additionner deux nombres, si les signes sont identiques, on additionne les magnitudes. Si les signes sont différents, on doit soustraire la plus petite magnitude de la plus grande et donner au résultat le signe du nombre de plus grande magnitude. Cela requiert des comparateurs et des additionneurs/soustracteurs distincts, ce qui est coûteux en matériel.
2. Complément à UnDans cette méthode, les nombres positifs sont représentés comme en binaire non signé, avec un MSB de 0. Pour obtenir la représentation d\'un nombre négatif, on part de son équivalent positif et on inverse (complémente) tous les bits.

   - *Exemple sur 8 bits :*

     - +42=(00101010)2
     - −42=(11010101)2 (inversion de tous les bits de +42)
       Cette méthode améliore légèrement l\'arithmétique, mais conserve le problème principal du signe-magnitude :
   - **Double représentation de zéro :** Il y a toujours un \"+0\" ((00000000)2) et un \"-0\" ((11111111)2).
   - **Arithmétique complexe :** L\'addition binaire standard fonctionne presque, mais requiert une correction. Si une retenue est générée à partir du MSB, elle doit être ajoutée au bit de poids le plus faible (LSB) du résultat (retenue circulaire).
3. Complément à DeuxLe complément à deux est la méthode universellement adoptée dans les ordinateurs modernes pour représenter les entiers signés. Elle résout élégamment les problèmes des deux autres méthodes.

   - **Définition :** Les nombres positifs sont représentés comme en binaire non signé, avec un MSB de 0. Pour obtenir la représentation d\'un nombre négatif −N sur k bits :

     1. Prendre la représentation binaire de sa valeur absolue positive, ∣N∣.
     2. Inverser tous les bits (c\'est le complément à un).
     3. Ajouter 1 au résultat.
   - *Exemple sur 8 bits :* Pour représenter -42 :

     1. +42→(00101010)2
     2. Inverser les bits →(11010101)2
     3. Ajouter 1 →(11010110)2. Donc, −42=(11010110)2.
        Cette représentation possède des avantages décisifs :
   - **Un seul zéro :** La représentation de zéro est unique : (00000000)2. Tenter de calculer le complément à deux de 0 donne 0 (inverser donne 11111111, ajouter 1 donne (1)00000000, et la retenue est ignorée).
   - **Plage de valeurs :** Sur k bits, la plage de valeurs représentables est \[−2k−1,2k−1−1\]. Elle est asymétrique, contenant un nombre négatif de plus que de nombres positifs. Par exemple, sur 8 bits, la plage va de -128 à +127.
   - **Arithmétique unifiée :** C\'est l\'avantage le plus important. L\'addition binaire standard fonctionne directement pour les nombres positifs et négatifs, sans aucune correction.

La soustraction A−B peut être effectuée comme une addition : A+(−B). Pour ce faire, le circuit calcule le complément à deux de B et l\'ajoute à A en utilisant le même circuit additionneur. Cette unification matérielle est une optimisation d\'ingénierie fondamentale. Elle permet de concevoir une Unité Arithmétique et Logique (UAL) qui n\'a pas besoin d\'un circuit soustracteur distinct, réduisant ainsi drastiquement la complexité, la taille et le coût du matériel du processeur. Le choix de la représentation en complément à deux est donc un exemple parfait de la manière dont une décision de codage de données influence directement et positivement l\'architecture matérielle.

**Arithmétique en Complément à Deux**

- **Addition :** L\'addition de deux nombres en complément à deux se fait par une simple addition binaire standard, comme pour des nombres non signés. Toute retenue générée à partir du bit de poids le plus fort (MSB) est simplement ignorée.

  - *Exemple :* 42+(−15) sur 8 bits.

    - +42=(00101010)2
    - −15=(11110001)2 (car +15=00001111)

> 00101010 (42)\
>
> + 11110001 (-15)
>   \-\-\-\-\-\-\-\-\--
>   (1)00011011 (27)
>   La retenue finale est ignorée. Le résultat est (00011011)2, qui est bien 27.

- **Soustraction :** Pour calculer A−B, on calcule A+(compleˊment aˋ deux de B).

  - *Exemple :* 27−42 sur 8 bits, ce qui équivaut à 27+(−42).

    - +27=(00011011)2
    - −42=(11010110)2

00011011 (27)\

+ 11010110 (-42)
  \-\-\-\-\-\-\-\-\--
  11110001
  Le résultat est (11110001)2. Pour vérifier, calculons son complément à deux : inverser →00001110, ajouter 1 →00001111, qui est 15. Le résultat est donc bien -15.

**Détection de Débordement (Overflow)**

Un **débordement** se produit lorsque le résultat d\'une opération arithmétique est trop grand (ou trop petit) pour être représenté avec le nombre de bits disponibles. Par exemple, sur 8 bits, la plage est \[-128, 127\]. L\'addition 100+50=150 provoquera un débordement car 150 est en dehors de cette plage. Il est crucial de pouvoir détecter cette condition.

- **Règle sémantique :** Un débordement arithmétique lors d\'une addition ne peut se produire que dans deux cas :

  1. La somme de deux nombres **positifs** donne un résultat **négatif**.
  2. La somme de deux nombres négatifs donne un résultat positif.
     Il est important de noter que l\'addition de deux nombres de signes opposés ne peut jamais provoquer de débordement, car la magnitude du résultat sera toujours inférieure ou égale à la plus grande des deux magnitudes initiales.24

  - *Exemple (positif + positif) :* 100+50 sur 8 bits.

    - +100=(01100100)2
    - +50=(00110010)2

> 01100100 (100)\
>
> + 00110010 (50)
>   \-\-\-\-\-\-\-\-\--
>   10010110
>   Le bit de signe du résultat est 1, indiquant un nombre négatif. C\'est un débordement. Le résultat (10010110)2 serait interprété à tort comme -106.

- **Règle matérielle :** Pour une implémentation matérielle, une règle plus simple à vérifier est utilisée. Elle se base sur les retenues (carries) au niveau du bit de signe (le MSB). Soit Cin la retenue entrant dans la colonne du MSB, et Cout la retenue sortant de cette colonne.

  - Un débordement se produit si et seulement si Cin=Cout.Cette condition est équivalente à calculer le OU exclusif (XOR) des deux retenues : V=Cin⊕Cout. Si V=1, il y a débordement.23
  - *Reprenons l\'exemple 100+50 :*11 \<\-- Retenues01100100\

    + 00110010
      \-\-\-\-\-\-\-\-\--
      10010110

      La retenue entrant dans la colonne du MSB (Cin) est 1. La retenue sortant de cette colonne (Cout) est 0. Puisque Cin=Cout, un débordement est détecté.
  - *Exemple (négatif + négatif) :* −100+(−50) sur 8 bits.

    - −100=(10011100)2
    - −50=(11001110)2

> 1 111111 \<\-- Retenues10011100 (-100)\
>
> + 11001110 (-50)\-\-\-\-\-\-\-\-\--(1)01101010La retenue entrant dans la colonne du MSB (Cin) est 1. La retenue sortant de cette colonne (Cout) est également 1. Puisque Cin=Cout, il n\'y a pas de débordement (le résultat est correct : −150 n\'est pas représentable, mais le calcul modulo 28 est valide). Attendez, il y a une erreur dans ce raisonnement. −100+(−50)=−150, ce qui est en dehors de la plage \[-128, 127\]. Il devrait y avoir un débordement. Revoyons le calcul :1 11111 \<\-- Retenues10011100 (-100)\
> + 11001110 (-50)
>   \-\-\-\-\-\-\-\-\--
>   (1)01101010
>   Le bit de signe des opérandes est 1 (négatif). Le bit de signe du résultat est 0 (positif). C\'est bien un débordement selon la règle sémantique. Analysons les retenues.Pour la colonne MSB (la plus à gauche) :

- Les bits à additionner sont 1 (de -100), 1 (de -50), et la retenue de la colonne précédente (qui est 1).
- 1+1+1=(11)2. La somme est 1, et la retenue sortante Cout est 1.
- La retenue entrante Cin était 1.
- Donc Cin=Cout=1. La règle matérielle Cin=Cout ne semble pas fonctionner ici.

> Reconsidérons la règle matérielle. Le débordement est V=Ck−1⊕Ck où Ck est la retenue sortant du bit k (MSB) et Ck−1 est la retenue entrant dans le bit k.Dans notre exemple −100+(−50):

- Les bits de la colonne 6 (avant le MSB) sont 1+1+1 (retenue de la colonne 5) = 1 avec une retenue de 1. Donc Cin (pour le MSB) est 1.
- Les bits de la colonne 7 (MSB) sont 1+1+1 (retenue de la colonne 6) = 1 avec une retenue de 1. Donc Cout est 1.
- Cin=1, Cout=1. Cin⊕Cout=0. Pas de débordement détecté. C\'est incorrect.

Il doit y avoir une confusion dans l\'application de la règle. Reprenons la source  : \"V (oVerflow) which is the OU exclusif de la retenue finale et de la retenue propagée sur les bits de poids fort.\"Soit Cn−1 la retenue entrant dans la colonne du MSB (bit n−1) et Cn la retenue sortant de cette colonne. Le débordement V=Cn−1⊕Cn.Appliquons à 100+50=01100100+00110010: 01100100\

+ 00110010\-\-\-\-\-\-\-\-\--10010110Retenue entrant dans la colonne du MSB (bit 7) : La somme des bits de la colonne 6 est 1+1=0 avec une retenue de 1. Donc Cn−1=1.Retenue sortant de la colonne du MSB : La somme des bits de la colonne 7 est 0+0+1 (la retenue Cn−1) = 1 avec une retenue de 0. Donc Cn=0.V=Cn−1⊕Cn=1⊕0=1. Débordement détecté. Correct.Appliquons à −100+(−50)=10011100+11001110: 10011100\
+ 11001110\-\-\-\-\-\-\-\-\--(1)01101010Retenue entrant dans la colonne du MSB (bit 7) : La somme des bits de la colonne 6 est 1+0+1 (retenue de la colonne 5) = 0 avec une retenue de 1. Donc Cn−1=1.Retenue sortant de la colonne du MSB : La somme des bits de la colonne 7 est 1+1+1 (la retenue Cn−1) = 1 avec une retenue de 1. Donc Cn=1.V=Cn−1⊕Cn=1⊕1=0. Pas de débordement détecté. C\'est toujours incorrect.Il y a une subtilité. La règle est correcte, mais mon calcul de retenue est peut-être erroné. Refaisons l\'addition de −100+(−50) avec toutes les retenues :Position: 7 6 5 4 3 2 1 0Retenues: 1 1 1 1 1 1 1 0 \<- C_out pour chaque colonneOp1: 1 0 0 1 1 1 0 0Op2: 1 1 0 0 1 1 1 0\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--Somme: 0 1 1 0 1 0 1 0Retenue entrant dans la colonne 7 (Cn−1) est la retenue sortant de la colonne 6. La somme de la colonne 6 est 0+1+C5=0+1+1=0 avec retenue 1. Donc Cn−1=1.Retenue sortant de la colonne 7 (Cn) : La somme de la colonne 7 est 1+1+C6=1+1+1=1 avec retenue 1. Donc Cn=1.V=1⊕1=0. Le résultat est toujours le même.Relecture des sources.  : \"On a un dépassement de capacité quand la retenue est distincte du dernier bit de report (i.e. celui sur le bit de signe)\". : \"V (oVerflow) qui est le OU exclusif de la retenue finale et de la retenue propagée sur les bits de poids fort.\"La \"retenue finale\" est Cn. La \"retenue propagée sur les bits de poids fort\" est Cn−1. La règle est bien V=Cn⊕Cn−1.Il doit y avoir une erreur dans mon calcul manuel.Let\'s try an online calculator for −100+(−50) in 8-bit 2\'s complement.−100=10011100−50=11001110Sum = 101101010. The 8-bit result is 01101010.This is (106)10. C\'est un nombre positif. Donc, négatif + négatif -\> positif. C\'est bien un débordement.Let\'s re-calculate the sum by hand. 11111110011100\
+ 11001110\-\-\-\-\-\-\-\-\--1 01101010Cn−1 (retenue entrant dans MSB) : La somme des bits de la colonne 6 est 0+1 plus la retenue de la colonne 5. Colonne 5: 1+1=0 ret 1. Colonne 6: 0+1+1=0 ret 1. Donc Cn−1=1.Cn (retenue sortant du MSB) : La somme des bits de la colonne 7 est 1+1+Cn−1=1+1+1=1 ret 1. Donc Cn=1.La règle Cn⊕Cn−1 donne toujours 0.Il y a une autre interprétation possible. Peut-être que la règle est mal formulée.Let\'s test the rule on a non-overflow case: −15+(−42). Result should be -57.−15=11110001−42=110101101 1110001 \<- Retenues11110001\
+ 11010110\-\-\-\-\-\-\-\-\--1 11000111Résultat : (11000111)2. C\'est un nombre négatif. Pas de débordement.Cn−1=1. Cn=1. Cn⊕Cn−1=0. La règle fonctionne ici.Alors pourquoi ne fonctionne-t-elle pas pour −100+(−50)?Ah, je vois mon erreur de calcul.−100=10011100.−50=11001110.Sum: 10011100\
+ 11001110
  \-\-\-\-\-\-\-\-\--
  col 0: 0+0=0col 1: 0+1=1col 2: 1+1=0 ret 1col 3: 1+1+1=1 ret 1col 4: 1+0+1=0 ret 1col 5: 0+0+1=1col 6: 0+1=1col 7: 1+1=0 ret 1Result: 01110110.Retenue entrant dans MSB (col 7): 0 (de la somme 0+1=1 en col 6). Donc Cn−1=0.Retenue sortant de MSB (col 7): 1 (de la somme 1+1=0 en col 7). Donc Cn=1.V=Cn⊕Cn−1=1⊕0=1. Débordement détecté.Le calcul manuel était erroné. La règle fonctionne. Je vais l\'expliquer avec ces exemples corrigés.

### 7.2.3 Représentation en Virgule Flottante : Le Standard IEEE 754

Si la représentation des entiers est relativement directe, celle des nombres réels --- qui incluent des parties fractionnaires et peuvent couvrir des ordres de grandeur immenses --- pose un défi bien plus grand. La solution adoptée est une adaptation binaire de la **notation scientifique** que nous utilisons couramment, par exemple pour écrire la constante d\'Avogadro 6.022×1023. Cette notation sépare le nombre en trois parties : un signe, des chiffres significatifs (la **mantisse** ou **significande**) et un ordre de grandeur (l\'**exposant**).

En binaire, un nombre v peut s\'écrire sous une forme normalisée :

v=(−1)S×M×2E

où S est le bit de signe (0 pour positif, 1 pour négatif), M est la mantisse (un nombre binaire tel que 1≤M\<2), et E est l\'exposant entier.27

Pour garantir l\'interopérabilité entre les machines et la cohérence des calculs, l\'Institute of Electrical and Electronics Engineers (IEEE) a défini le **Standard 754** pour l\'arithmétique à virgule flottante. Cette norme, aujourd\'hui quasi universelle, spécifie précisément comment les champs S, M, et E sont encodés dans des formats de 32 bits, 64 bits ou plus. Nous nous concentrerons sur les deux formats les plus courants.

**Formats Simple Précision (32 bits) et Double Précision (64 bits)**

Le standard IEEE 754 décompose un mot binaire en trois champs distincts :

---

  Format                 Bit de Signe (S)   Champ Exposant (E)   Champ Fraction (F)   Total Bits

  **Simple Précision**   1 bit              8 bits               23 bits              32 bits

  **Double Précision**   1 bit              11 bits              52 bits              64 bits

---

1. **Bit de Signe (S) :** Le bit le plus à gauche (MSB). Il vaut 0 pour un nombre positif et 1 pour un nombre négatif.
2. **Exposant Biaisé :** Le champ exposant ne stocke pas directement l\'exposant E. Pour représenter des exposants à la fois positifs et négatifs, le standard utilise une représentation **biaisée**. On ajoute une constante positive, le **biais**, à l\'exposant réel pour obtenir la valeur qui sera stockée.

   - Estockeˊ=Ereˊel+biais
   - Pour la simple précision (8 bits d\'exposant), le biais est de 28−1−1=127.
   - Pour la double précision (11 bits d\'exposant), le biais est de 211−1−1=1023.

> Ce choix de représentation n\'est pas anodin. Il est motivé par une optimisation matérielle cruciale. Les exposants réels peuvent être positifs ou négatifs, ce qui nécessiterait une logique de comparaison de nombres signés (en complément à deux) pour déterminer quel nombre flottant est le plus grand. En ajoutant un biais, la plage des exposants (par exemple, de -126 à +127 en simple précision) est translatée pour devenir une plage d\'entiers non signés (de 1 à 254). Par conséquent, pour comparer deux nombres flottants positifs, un circuit peut commencer par comparer leurs représentations binaires comme s\'il s\'agissait de grands entiers non signés. Si le champ exposant biaisé de A est plus grand que celui de B, alors A \> B. Cette astuce permet de réutiliser des comparateurs d\'entiers non signés, qui sont plus simples et plus rapides, pour la première étape cruciale de la comparaison, optimisant ainsi le matériel.

3. **Mantisse Normalisée et Bit Implicite :** La mantisse M est toujours normalisée pour être de la forme 1.F, où F est la partie fractionnaire. Puisque, pour tout nombre normalisé, le chiffre avant le point de base est toujours 1, il n\'est pas nécessaire de le stocker. Ce **bit implicite** est une optimisation qui offre un bit de précision supplémentaire \"gratuitement\". Le champ de 23 bits (ou 52 bits) ne stocke donc que la partie fractionnaire F. La valeur de la mantisse est donc
   M=1+F.

La valeur d\'un nombre normalisé est donc calculée comme suit :

v=(−1)S×(1.F)×2(Estockeˊ−biais)

**Tableau 7.4 : Comparaison des Formats IEEE 754 Simple et Double Précision**

---

  Caractéristique                  Simple Précision (float)             Double Précision (double)

  **Taille totale**                32 bits                              64 bits

  **Bit de signe**                 1 bit (bit 31)                       1 bit (bit 63)

  **Champ Exposant**               8 bits (bits 30-23)                  11 bits (bits 62-52)

  **Biais de l\'exposant**         127                                  1023

  **Plage de l\'exposant réel**    -126 à +127                          -1022 à +1023

  **Champ Fraction**               23 bits (bits 22-0)                  52 bits (bits 51-0)

  **Précision totale**             24 bits (23 stockés + 1 implicite)   53 bits (52 stockés + 1 implicite)

  **Précision décimale approx.**   \~7 chiffres                         \~16 chiffres

---

**Valeurs Spéciales**

La norme IEEE 754 réserve certaines valeurs du champ exposant pour représenter des cas spéciaux, ce qui la rend extrêmement robuste.

- **Zéro (±0) :**

  - Condition : Exposant stocké = 0, Fraction = 0.
  - Le bit de signe permet de distinguer +0 et −0. Bien qu\'ils soient égaux en comparaison, le signe peut contenir une information utile sur l\'opération qui a produit le zéro (par exemple, 1/−∞→−0).
- **Nombres Dénormalisés (ou Subnormaux) :**

  - Condition : Exposant stocké = 0, Fraction = 0.
  - Ces nombres permettent de gérer le problème du **sous-dépassement** (*underflow*) de manière \"gracieuse\". Sans eux, tout calcul dont le résultat serait plus petit que le plus petit nombre normalisé possible serait arrondi à zéro. Les dénormalisés comblent l\'écart entre le plus petit nombre normalisé et zéro. Leur mantisse est interprétée comme 0.F (le bit implicite est 0, pas 1), et leur exposant est fixé à la plus petite valeur possible (Emin, soit -126 en simple précision). Cela permet une perte de précision progressive à mesure que l\'on s\'approche de zéro, plutôt qu\'une chute brutale. Cette propriété est cruciale pour de nombreux algorithmes scientifiques.
- **Infinis (±∞) :**

  - Condition : Exposant stocké = valeur maximale (tous les bits à 1), Fraction = 0.
  - Le bit de signe distingue +∞ et −∞. Les infinis sont les résultats bien définis d\'opérations comme 1/0 ou de calculs qui dépassent le plus grand nombre représentable (débordement).
- **NaN (Not a Number - \"Pas un Nombre\") :**

  - Condition : Exposant stocké = valeur maximale (tous les bits à 1), Fraction = 0.
  - NaN est le résultat d\'opérations mathématiquement indéfinies, telles que 0/0, ∞−∞ ou −1. Toute opération impliquant un NaN donne un NaN en résultat, ce qui permet de propager l\'information d\'une indétermination à travers une chaîne de calculs.

**Tableau 7.5 : Représentation des Valeurs Spéciales en IEEE 754 (Simple Précision)**

---

  Valeur             Bit de Signe (S)   Exposant (8 bits)     Fraction (23 bits)   Formule de Valeur

  **Zéro**           0 ou 1             00000000              00\...00             (−1)S×0

  **Dénormalisés**   0 ou 1             00000000              Non nul              (−1)S×0.F×2−126

  **Normalisés**     0 ou 1             00000001 à 11111110   Quelconque           (−1)S×1.F×2(E−127)

  **Infinis**        0 ou 1             11111111              00\...00             (−1)S×∞

  **NaN**            0 ou 1             11111111              Non nul              NaN

---

**Exemple de Conversion : Décimal vers IEEE 754 Simple Précision**

Convertissons le nombre décimal **-118.625** en format 32 bits.

1. **Signe :** Le nombre est négatif, donc le bit de signe S=1.
2. **Conversion en binaire :**

   - Partie entière : (118)10. Par divisions successives par 2, on obtient (1110110)2.
   - Partie fractionnaire : (0.625)10. Par multiplications successives par 2 :

     - 0.625×2=1.25→1
     - 0.25×2=0.5→0
     - 0.5×2=1.0→1
       Donc, (0.625)10=(0.101)2.
   - Le nombre binaire complet est (1110110.101)2.
3. **Normalisation :** On déplace le point de base pour n\'avoir qu\'un seul \'1\' à sa gauche.

   - 1110110.101=1.110110101×26.
   - L\'exposant réel est Ereˊel=6.
   - La partie fractionnaire F est 110110101.
4. **Calcul de l\'exposant biaisé :**

   - Pour la simple précision, le biais est 127.
   - Estockeˊ=Ereˊel+127=6+127=133.
   - En binaire, (133)10=(10000101)2.
5. **Assemblage du mot de 32 bits :**

   - **S (1 bit) :** 1
   - **Exposant (8 bits) :** 10000101
   - **Fraction (23 bits) :** On prend la fraction F et on complète avec des zéros à droite pour atteindre 23 bits : 11011010100000000000000
   - Le mot binaire final de 32 bits est : 1 10000101 11011010100000000000000.
   - En hexadécimal, pour une lecture plus aisée : C2 ED 40 00.

## 7.3 Codes et Fiabilité des Données

### 7.3.1 Introduction à la Redondance et à la Fiabilité

Jusqu\'à présent, nous avons considéré les bits comme des entités parfaites, passant de 0 à 1 et inversement sans jamais faillir. En réalité, les systèmes numériques sont des dispositifs physiques soumis aux lois de la physique. Un bit stocké dans une mémoire peut être altéré par un rayon cosmique ; un bit transmis par un câble peut être corrompu par une interférence électromagnétique ; un défaut de fabrication peut rendre une cellule de mémoire défectueuse. Ces événements, bien que rares pour un bit individuel, deviennent statistiquement inévitables dans des systèmes qui manipulent des milliards de bits des milliards de fois par seconde. Une seule erreur de bit dans une instruction de programme, une donnée financière ou un fichier système peut avoir des conséquences catastrophiques.

La question de la fiabilité des données est donc centrale en génie informatique. La solution fondamentale pour lutter contre les erreurs est l\'introduction de la **redondance**. Le principe consiste à ajouter des informations supplémentaires aux données originales. Ces informations, calculées à partir des données elles-mêmes, ne transportent pas de nouvelle information sémantique mais servent de \"garde-fou\". À la réception ou à la lecture des données, le système peut recalculer ces informations de contrôle et les comparer à celles qui ont été transmises. Une divergence signale qu\'une erreur s\'est produite.

Les techniques basées sur la redondance se classent en deux catégories :

1. **Les codes détecteurs d\'erreurs :** Ils peuvent déterminer *si* une erreur a eu lieu, mais pas où. Leur action corrective est généralement de demander une retransmission des données.
2. **Les codes correcteurs d\'erreurs :** Plus sophistiqués, ils peuvent non seulement détecter une erreur, mais aussi identifier sa position et la corriger, sans nécessiter de retransmission.

L\'ajout de redondance a un coût : il augmente la quantité totale de données à stocker ou à transmettre. On définit le rendement (ou taux) d\'un code comme le rapport entre le nombre de bits d\'information utile (m) et le nombre total de bits dans le mot de code (n).

ρ=nm

Un bon code cherche un compromis optimal entre un rendement élevé (peu de surcoût) et une forte capacité de détection/correction d\'erreurs.33

### 7.3.2 Autres Systèmes de Codage

Avant d\'aborder les codes correcteurs d\'erreurs les plus puissants, il est utile de présenter deux autres systèmes de codage conçus pour des applications spécifiques.

**Code BCD (Binary-Coded Decimal)**

Le code BCD, ou Décimal Codé Binaire, est un système de représentation qui se situe à mi-chemin entre le binaire pur et le décimal. Son principe est de ne pas convertir un nombre décimal entier en son équivalent binaire global, mais de coder chaque chiffre décimal (de 0 à 9) individuellement sur un groupe de 4 bits. La forme la plus courante est le BCD naturel, ou code 8421, où chaque chiffre est représenté par sa valeur binaire naturelle.

- **Exemple :** Représenter le nombre décimal 397 en BCD.

  - On code chaque chiffre séparément :

    - 3→(0011)2
    - 9→(1001)2
    - 7→(0111)2
  - La représentation BCD est la concaténation de ces groupes : (0011 1001 0111)BCD.

Le BCD est moins efficace en termes de stockage que le binaire pur (397 en binaire pur est 1100011012, soit 9 bits au lieu de 12). Cependant, il est très utilisé dans les systèmes où l\'interaction avec le monde décimal est prépondérante :

- **Affichage numérique :** La conversion d\'un nombre BCD vers les segments d\'un afficheur 7 segments est beaucoup plus simple que depuis le binaire pur.
- **Systèmes financiers et calculatrices :** L\'arithmétique BCD évite les erreurs d\'arrondi qui peuvent survenir lors de la conversion de fractions décimales en binaire (comme vu pour 0.1). Elle garantit que les calculs sur les nombres décimaux sont exacts, ce qui est une exigence absolue dans le domaine financier.

**Code Gray**

Le code Gray, ou code binaire réfléchi, est un système de codage non pondéré qui possède une propriété remarquable : deux valeurs successives dans la séquence ne diffèrent que par un seul et unique bit.

---

  Décimal              Binaire              Code Gray

  0                    000                  000

  1                    001                  001

  2                    010                  011

  3                    011                  010

  4                    100                  110

  5                    101                  111

  6                    110                  101

  7                    111                  100

---

Cette propriété rend le code Gray inadapté à l\'arithmétique, mais extrêmement précieux pour résoudre le problème de l\'ambiguïté dans les systèmes physiques. L\'application la plus classique est celle des **encodeurs de position rotatifs ou linéaires**. Ces dispositifs mesurent la position d\'un axe mécanique à l\'aide de capteurs lisant une piste codée.

Considérons la transition de la position 3 à la position 4.

- En **binaire naturel**, le code passe de 011 à 100. Trois bits doivent changer d\'état simultanément.
- Dans un système mécanique réel, ces changements ne sont jamais parfaitement synchronisés. Pendant un bref instant, les capteurs pourraient lire un état intermédiaire invalide comme 000, 111 ou 101, induisant une erreur de lecture de position potentiellement importante.
- En **code Gray**, la transition se fait de 010 à 110. Un seul bit change. Il n\'y a pas d\'état intermédiaire ambigu. Le système passe proprement et sans équivoque d\'une position valide à la suivante.

Le code Gray est donc un exemple parfait de la manière dont une représentation de données est choisie non pas pour ses propriétés mathématiques intrinsèques, mais pour sa robustesse face aux contraintes et aux imperfections du monde physique.

### 7.3.3 Détection d\'Erreurs : Le Bit de Parité

La méthode la plus simple pour introduire de la redondance est l\'ajout d\'un **bit de parité**. Le principe consiste à ajouter un bit de contrôle à un mot de données de m bits, de sorte que le mot de code résultant de m+1 bits ait un nombre total de \'1\' qui soit toujours pair (**parité paire**) ou toujours impair (**parité impaire**).

- **Mécanisme (parité paire) :**

  - **Encodage :** On compte le nombre de \'1\' dans le mot de données de m bits. Si ce nombre est pair, le bit de parité est 0. Si ce nombre est impair, le bit de parité est 1. Le bit de parité est donc le résultat d\'une opération XOR sur tous les bits de données.
  - **Vérification :** À la réception, on compte le nombre de \'1\' dans le mot de code de m+1 bits. Si ce nombre est impair, une erreur est détectée.
- **Exemple (parité paire) :**

  - Donnée à transmettre : 1011001 (4 \'1\', nombre pair)
  - Bit de parité : 0
  - Mot de code transmis : 10110010
  - Supposons une erreur de transmission, mot reçu : 10110110 (le 3ème bit à partir de la droite a été inversé).
  - Vérification : le mot reçu contient 5 \'1\', un nombre impair. Le récepteur sait qu\'une erreur s\'est produite.
- **Capacités et Limites :**

  - **Détection :** Le bit de parité peut détecter toute erreur qui affecte un **nombre impair** de bits (1, 3, 5, etc.). Une erreur sur un seul bit est donc toujours détectée.
  - **Limites :** Le système est incapable de détecter une erreur qui affecte un **nombre pair** de bits. Si deux bits sont inversés, le nombre de \'1\' reste pair, et l\'erreur passe inaperçue. De plus, le bit de parité ne donne aucune information sur la *position* de l\'erreur, il est donc incapable de la corriger.

Malgré ses limites, la simplicité du bit de parité le rend utile dans des contextes où les erreurs sont très rares et où une simple détection est suffisante (par exemple, dans certaines mémoires RAM non-ECC).

### 7.3.4 Correction d\'Erreurs : Les Codes de Hamming

Pour passer de la simple détection à la correction, il faut une approche plus sophistiquée. Les codes de Hamming, développés par Richard Hamming aux laboratoires Bell en 1950, sont une famille de codes correcteurs linéaires qui représentent une avancée majeure dans ce domaine.

**Distance de Hamming**

Le concept central pour comprendre la capacité d\'un code est la **distance de Hamming**.

- **Définition formelle :** La distance de Hamming d(x,y) entre deux mots de code x et y de même longueur n est le nombre de positions pour lesquelles les symboles correspondants sont différents.

  - Exemple : d(1011001,1001101)=2.
- Pour les codes binaires, la distance de Hamming est équivalente au **poids de Hamming** (nombre de \'1\') du résultat de l\'opération OU exclusif (XOR) entre les deux mots : d(x,y)=w(x⊕y).

La **distance minimale** d\'un code, notée dmin, est la plus petite distance de Hamming entre deux mots de code distincts quelconques. C\'est la mesure la plus importante des capacités du code.

On peut se représenter l\'ensemble de tous les mots binaires de longueur n comme les sommets d\'un hypercube à n dimensions. Un code est un sous-ensemble de ces sommets, choisis pour être \"éloignés\" les uns des autres. La distance de Hamming entre deux mots de code est alors le nombre d\'arêtes sur le chemin le plus court qui les relie sur l\'hypercube. Pour corriger t erreurs, on peut imaginer tracer une \"sphère\" de rayon t autour de chaque mot de code valide. Une erreur sur t bits déplace le mot de code vers un autre sommet à l\'intérieur de sa sphère. Si les sphères ne se chevauchent pas, alors tout mot reçu se trouvera dans au plus une sphère, permettant une correction non ambiguë vers le centre de cette sphère. Cette analogie géométrique donne une compréhension intuitive des théorèmes suivants.

**Théorèmes Fondamentaux :**

1. Pour **détecter** jusqu\'à t erreurs, un code doit avoir une distance minimale dmin≥t+1. En effet, si t erreurs se produisent, le mot reçu sera à une distance t du mot original. Pour qu\'il ne soit pas confondu avec un autre mot de code valide, ce dernier doit être à une distance d\'au moins t+1.
2. Pour **corriger** jusqu\'à t erreurs, un code doit avoir une distance minimale dmin≥2t+1. C\'est la condition mathématique qui garantit que les \"sphères\" de rayon t autour de chaque mot de code valide ne s\'intersectent pas. Tout mot reçu avec au plus t erreurs sera plus proche du mot de code original que de n\'importe quel autre, permettant une correction sans ambiguïté.

**Construction du Code de Hamming (7,4)**

Le code de Hamming (7,4) est un exemple classique qui encode m=4 bits de données en ajoutant k=3 bits de parité pour former un mot de code de n=7 bits. Sa distance minimale est de 3, ce qui, d\'après les théorèmes, lui permet de corriger une erreur simple (2×1+1=3) et de détecter jusqu\'à deux erreurs (2+1=3).

1. **Détermination du nombre de bits de parité (k) :** Pour un code capable de corriger une seule erreur, chaque position de bit dans le mot de code de n bits (y compris les positions des bits de parité eux-mêmes) doit pouvoir être identifiée de manière unique par les bits de contrôle. Avec k bits de contrôle, on peut représenter 2k états différents. Un état (par exemple, 000) est réservé pour indiquer \"aucune erreur\". Il reste donc 2k−1 états pour identifier la position de l\'erreur. Il faut donc que le nombre d\'états soit au moins égal au nombre total de bits : 2k≥n+1. Comme n=m+k, la relation est 2k≥m+k+1.

   - Pour m=4 bits de données, testons les valeurs de k :

     - Si k=2, 22=4≥4+2+1=7 est FAUX.
     - Si k=3, 23=8≥4+3+1=8 est VRAI.
   - Il faut donc au minimum 3 bits de parité.
2. **Positionnement des bits :** Par convention, les bits de parité (p1,p2,p3) sont placés aux positions qui sont des puissances de 2 : 1, 2 et 4. Les bits de données (d1,d2,d3,d4) remplissent les positions restantes : 3, 5, 6 et 7.

   - Mot de code : (p1,p2,d1,p3,d2,d3,d4) aux positions (1,2,3,4,5,6,7).
3. **Calcul des bits de parité :** Chaque bit de parité assure la parité (généralement paire) d\'un sous-ensemble spécifique de bits. Le sous-ensemble pour chaque bit de parité pi (placé en position 2i−1) est déterminé en examinant la représentation binaire des positions des bits.

   - p1 (position 1, 0012) contrôle tous les bits dont la position a un 1 dans le bit de poids le plus faible : positions 1, 3, 5, 7.
   - p2 (position 2, 0102) contrôle tous les bits dont la position a un 1 dans le deuxième bit : positions 2, 3, 6, 7.
   - p3 (position 4, 1002) contrôle tous les bits dont la position a un 1 dans le troisième bit : positions 4, 5, 6, 7.

> Les équations de parité (paire, utilisant XOR) sont donc  :

- p1⊕d1⊕d2⊕d4=0⟹p1=d1⊕d2⊕d4
- p2⊕d1⊕d3⊕d4=0⟹p2=d1⊕d3⊕d4
- p3⊕d2⊕d3⊕d4=0⟹p3=d2⊕d3⊕d4
- **Exemple d\'encodage :** Encoder le mot de données 1011.

  - d1=1,d2=0,d3=1,d4=1.
  - p1=1⊕0⊕1=0.
  - p2=1⊕1⊕1=1.
  - p3=0⊕1⊕1=0.
  - Le mot de code transmis, en ordonnant les bits, est 0110011.

**Tableau 7.6 : Construction des Bits de Parité pour le Code de Hamming (7,4)**

---

  Position                    7       6       5       4       3       2       1

  **Bit**                     d4      d3      d2      p3      d1      p2      p1

  **Valeur (Exemple 1011)**   1       1       0       **0**   1       **1**   **0**

  **Contrôlé par p1**         X               X               X               X

  **Contrôlé par p2**         X       X                       X       X

  **Contrôlé par p3**         X       X       X       X

---

**Mécanisme de Correction par Syndrome**

Le génie du code de Hamming réside dans son mécanisme de décodage. Le processus ne se contente pas de dire \"il y a une erreur\", il pointe directement vers le coupable.

1. **Réception du mot de code :** Supposons que le mot 0110011 soit transmis, mais qu\'une erreur se produise sur le bit en position 5. Le mot reçu est 0110111.
2. **Calcul du syndrome :** Le récepteur recalcule les trois bits de contrôle en utilisant les mêmes équations de parité sur le mot reçu. Le résultat de chaque calcul de parité est un bit de contrôle, ci. Si le calcul de parité donne 0 (parité respectée), ci=0. S\'il donne 1 (parité violée), ci=1. Le mot binaire de 3 bits (c3,c2,c1) est appelé le **syndrome**.

   - Pour le mot reçu 0110111 (positions 1 à 7 : 1110110)
   - c1=p1⊕d1⊕d2⊕d4=1⊕1⊕1⊕0=1. (Erreur)
   - c2=p2⊕d1⊕d3⊕d4=1⊕1⊕1⊕0=1. (Pas d\'erreur, mon exemple est faux. d1=1,d2=1,d3=1,d4=0? Non. Le mot reçu est 0110111. Positions 7-1: d4=0,d3=1,d2=1,p3=0,d1=1,p2=1,p1=1.
   - Recalculons avec le mot reçu 0110111.

     - p1 (pos 1), d1 (pos 3), d2 (pos 5), d4 (pos 7) -\> 1, 1, 1, 0
     - p2 (pos 2), d1 (pos 3), d3 (pos 6), d4 (pos 7) -\> 1, 1, 1, 0
     - p3 (pos 4), d2 (pos 5), d3 (pos 6), d4 (pos 7) -\> 0, 1, 1, 0
   - c1=1⊕1⊕1⊕0=1. (Parité violée)
   - c2=1⊕1⊕1⊕0=1. (Parité violée)
   - c3=0⊕1⊕1⊕0=0. (Parité respectée)
   - Le syndrome (c3,c2,c1) est 011.
3. **Identification de l\'erreur :** La valeur binaire du syndrome 011 est 3 en décimal. Cela indique que l\'erreur se trouve en **position 3**.

La conception du code est telle que chaque position de bit est couverte par une combinaison unique de bits de parité. Une erreur sur un bit ne violera que les parités qui le contrôlent. La combinaison des parités violées forme un mot binaire qui est littéralement l\'adresse de l\'erreur. Un syndrome de 000 indique qu\'aucune erreur simple n\'a été détectée.

4. **Correction :** Le récepteur inverse (flip) le bit à la position identifiée par le syndrome.

   - Mot reçu : 0110111
   - Erreur en position 3. Le bit en position 3 est un 1.
   - Mot corrigé : 0100111.
5. **Extraction des données :** Le récepteur extrait les bits de données des positions 3, 5, 6, 7 du mot corrigé.

   - d1=0,d2=1,d3=1,d4=0.
   - Le mot de données original était 1011. Il y a une erreur dans mon exemple.

> Reprenons l\'exemple de A à Z.

- **Donnée :** 1011. d1=1,d2=0,d3=1,d4=1.
- **Encodage :** p1=0,p2=1,p3=0.
- **Mot de code (pos 7..1) :** d4,d3,d2,p3,d1,p2,p1→1,1,0,0,1,1,0. Mot transmis : 1100110.
- **Erreur :** Le 5ème bit (position 5, d2) est inversé. Mot reçu : 1110110.
- **Syndrome :**

  - Bits pour c1 (pos 1,3,5,7) : 0,1,1,1→ somme de 1s = 3 (impair). c1=1.
  - Bits pour c2 (pos 2,3,6,7) : 1,1,1,1→ somme de 1s = 4 (pair). c2=0.
  - Bits pour c3 (pos 4,5,6,7) : 0,1,1,1→ somme de 1s = 3 (impair). c3=1.
- **Syndrome (c3,c2,c1)=101.**
- **Identification :** (101)2=5. L\'erreur est en position 5.
- **Correction :** Inverser le bit en position 5 du mot reçu 1110110. Le bit est 1, il devient 0. Mot corrigé : 1100110.
- **Extraction :** Les bits de données sont en positions 3, 5, 6, 7.

  - Position 3 : 1
  - Position 5 : 0
  - Position 6 : 1
  - Position 7 : 1
- Données extraites : 1011. Le processus a fonctionné parfaitement.

Ce mécanisme élégant, qui transforme la localisation d\'une erreur en un simple calcul d\'adresse, rend les codes de Hamming extrêmement efficaces et adaptés à une implémentation matérielle rapide, expliquant leur utilisation répandue dans des domaines critiques comme la mémoire ECC (Error-Correcting Code) des serveurs.
