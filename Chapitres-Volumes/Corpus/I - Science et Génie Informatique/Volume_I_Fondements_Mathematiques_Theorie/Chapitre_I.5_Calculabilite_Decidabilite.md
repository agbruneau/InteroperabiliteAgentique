# Chapitre I.5 : Calculabilité et Décidabilité

## Introduction : La Quête d\'une Définition Formelle de l\'Algorithme

Au cœur des sciences et du génie informatiques se trouve une notion à la fois intuitive et profondément énigmatique : celle d\'**algorithme**. Depuis l\'Antiquité, avec les procédures d\'Euclide pour trouver le plus grand commun diviseur, jusqu\'aux complexes algorithmes d\'apprentissage machine qui façonnent aujourd\'hui notre monde numérique, l\'humanité a toujours cherché à formaliser des « procédures effectives » --- des séquences d\'étapes finies, non ambiguës et mécaniques permettant de résoudre une classe de problèmes. Pendant des siècles, cette notion est demeurée informelle, reposant sur une compréhension partagée de ce que signifie « calculer ».

Cependant, au début du XXe siècle, cette fondation intuitive s\'est avérée insuffisante. Des mathématiciens comme David Hilbert ont posé des questions fondamentales sur la nature même des mathématiques. L\'une de ces questions, connue sous le nom d\'***Entscheidungsproblem*** (le problème de la décision), demandait s\'il existait une procédure mécanique capable de déterminer, pour n\'importe quel énoncé logique, si cet énoncé est universellement valide. Pour répondre à une telle question, il ne suffisait plus de savoir

*comment* calculer ; il devenait impératif de définir rigoureusement ce qu\'un calcul *est*, et par extension, de tracer les frontières de ce qui est, en principe, *calculable*.

Cette quête d\'une formalisation a conduit, dans les années 1930, à une explosion d\'activité intellectuelle qui allait jeter les bases de l\'informatique théorique. Des esprits brillants, travaillant indépendamment et depuis des perspectives radicalement différentes, ont proposé leurs propres modèles mathématiques du calcul. Alan Turing, un mathématicien britannique, a imaginé une machine abstraite, un automate d\'une simplicité désarmante doté d\'un ruban et d\'une tête de lecture/écriture, capable d\'exécuter des instructions élémentaires. Alonzo Church, un logicien américain, a développé le calcul lambda, un système formel de réécriture de fonctions anonymes. Kurt Gödel, en collaboration avec Jacques Herbrand et Stephen Kleene, a exploré la classe des fonctions récursives, définies sur les entiers naturels par des schémas de composition et de récursion.

Ce chapitre se consacre à l\'exploration de ces idées fondatrices. Dans un premier temps, nous nous attacherons à définir avec une rigueur mathématique la notion de calculabilité. Nous débuterons par le modèle le plus influent et le plus intuitif, la **machine de Turing**, en disséquant sa structure formelle et en démontrant sa puissance à travers la conception d\'automates pour des problèmes non triviaux. Nous explorerons ensuite ses variantes, comme les machines multibandes et non déterministes, pour établir un résultat remarquable : ces extensions, bien que pratiques, n\'ajoutent aucune puissance de calcul fondamentale. Nous nous tournerons ensuite vers les modèles alternatifs des **fonctions récursives** et du **calcul lambda**, pour aboutir à la **thèse de Church-Turing**, une pierre angulaire de notre discipline, qui postule que tous ces modèles, et de fait tout modèle de calcul « raisonnable », sont équivalents.

Dans un second temps, armés d\'une définition robuste de ce qui est calculable, nous nous aventurerons dans le territoire opposé : celui de l\'**incalculable**. Nous poserons la question qui a motivé Turing : existe-t-il des problèmes bien définis pour lesquels aucun algorithme ne pourra jamais exister? La réponse, un « oui » retentissant, constitue l\'une des plus grandes découvertes intellectuelles du XXe siècle. Nous fournirons une preuve complète et détaillée de l\'indécidabilité du **problème de l\'arrêt**, le résultat emblématique qui démontre une limite intrinsèque et infranchissable à la computation. À partir de ce point d\'ancrage, nous introduirons la technique de la **réduction** pour propager cette indécidabilité à une vaste classe d\'autres problèmes. Finalement, nous couronnerons cette exploration avec le **théorème de Rice**, un méta-théorème d\'une puissance stupéfiante qui affirme que toute propriété non triviale du *comportement* d\'un programme est indécidable.

Ce chapitre navigue donc entre la définition du pouvoir et la démonstration des limites. Il établit le cadre formel qui permet non seulement de concevoir des systèmes complexes, mais aussi de comprendre, avec une certitude mathématique, ce qu\'ils ne pourront jamais accomplir.

## 5.1 Modèles de Calcul

L\'objectif de cette section est de répondre de manière formelle et exhaustive à la question : « Qu\'est-ce qu\'une fonction calculable? » ou, de manière équivalente, « Qu\'est-ce qu\'un langage décidable? ». Pour ce faire, nous allons construire, brique par brique, les fondations de la théorie de la calculabilité. Nous présenterons trois formalismes majeurs qui, bien qu\'issus de traditions intellectuelles distinctes --- le modèle mécanique des machines de Turing, le modèle arithmétique des fonctions récursives et le modèle fonctionnel du calcul lambda ---, convergent de manière spectaculaire vers une unique et robuste notion de calculabilité. Cette convergence n\'est pas une coïncidence ; elle est l\'argument le plus puissant en faveur de la thèse de Church-Turing, qui postule que nous avons bien capturé l\'essence même de ce qu\'est un algorithme.

### 5.1.1 Machines de Turing : Le Paradigme Impératif

Le modèle de la machine de Turing, proposé par Alan Turing en 1936, reste à ce jour le modèle de calcul le plus central et le plus intuitif. Sa force réside dans sa simplicité conceptuelle : il s\'agit d\'une idéalisation mathématique d\'un calculateur humain qui manipule des symboles sur une feuille de papier. En dépit de son minimalisme, ce modèle est suffisamment puissant pour simuler n\'importe quel algorithme exécutable sur un ordinateur moderne.

#### La Machine de Turing Standard : Définition Formelle et Mécanique du Calcul

Une machine de Turing est un automate qui opère sur un ruban infini. Ce ruban sert à la fois de mémoire, de support pour l\'entrée et de support pour la sortie. Une tête de lecture/écriture peut se déplacer le long de ce ruban, case par case, pour lire et écrire des symboles. Le comportement de la machine à chaque instant est déterminé par son état interne, tiré d\'un ensemble fini d\'états, et le symbole qu\'elle lit actuellement.

**Définition Formelle**

La machine de Turing standard est un automate déterministe doté d\'un unique ruban, infini dans les deux directions. Formellement, une machine de Turing (MT) est définie par un 7-uplet M=(Q,Σ,Γ,δ,q0​,qaccept​,qreject​), où chaque composant a un rôle précis, comme détaillé dans la Table 5.1.

**Table 5.1: Définition Formelle d\'une Machine de Turing Déterministe Standard**

  -------------------- --------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Symbole              Description Formelle                                      Rôle et Explications

  Q                    Un ensemble fini d\'**états**.                            Représente la mémoire interne finie de la machine. À tout instant, la machine est dans un et un seul de ces états.

  Σ                    Un alphabet fini appelé **alphabet d\'entrée**.           L\'ensemble des symboles qui peuvent constituer le mot d\'entrée initial. Cet alphabet ne contient pas le symbole blanc.

  Γ                    Un alphabet fini appelé **alphabet de ruban**.            L\'ensemble de tous les symboles que la machine peut écrire sur le ruban. On a toujours Σ⊆Γ. Il contient un symbole spécial, le **symbole blanc** (noté ⊔ ou B), qui remplit initialement toutes les cases du ruban à l\'exception de celles contenant l\'entrée.

  δ                    La **fonction de transition**. δ:Q×Γ→Q×Γ×{L,R}            C\'est le \"programme\" de la machine. Pour un état courant q∈Q et un symbole lu a∈Γ, δ(q,a)=(q′,b,D) signifie que la machine passe à l\'état q′, écrit le symbole b à la place de a, et déplace sa tête d\'une case dans la direction D (L pour gauche, R pour droite).

  q0​                   L\'**état initial**. q0​∈Q.                                L\'état dans lequel la machine commence son calcul.

  qaccept​              L\'**état d\'acceptation**. qaccept​∈Q.                    Un état terminal unique. Si la machine entre dans cet état, le calcul s\'arrête immédiatement et l\'entrée est considérée comme **acceptée**.

  qreject​              L\'**état de rejet**. qreject​∈Q, avec qreject​=qaccept​.   Un état terminal unique. Si la machine entre dans cet état, le calcul s\'arrête immédiatement et l\'entrée est considérée comme **rejetée**.
  -------------------- --------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Sources:

**Mécanique du Calcul : Configurations et Transitions**

Pour décrire formellement l\'état global d\'un calcul à un instant donné, nous utilisons la notion de **configuration** (parfois appelée description instantanée). Une configuration capture tout ce qui est nécessaire pour poursuivre le calcul : l\'état courant de l\'automate, le contenu complet du ruban, et la position de la tête de lecture/écriture.

Une configuration est typiquement représentée par une chaîne de la forme uqv, où :

- q∈Q est l\'état courant de la machine.

- La chaîne uv représente la portion non blanche du ruban.

- La tête de lecture est positionnée sur le premier symbole de v. La chaîne u représente la partie du ruban à gauche de la tête.

Par exemple, la configuration a1​a2​q3​a4​a5​ signifie que la machine est dans l\'état q3​, que le ruban contient la chaîne a1​a2​a4​a5​ (entourée de symboles blancs), et que la tête de lecture pointe sur le symbole a4​.

Le calcul d\'une machine de Turing est une séquence de configurations. Le passage d\'une configuration à la suivante est dicté par la fonction de transition δ. Nous disons qu\'une configuration C1​ **conduit en une étape** à une configuration C2​, noté C1​⊢C2​, si C2​ peut être obtenue à partir de C1​ par une seule application de la fonction δ.

Par exemple, si δ(q,b)=(p,c,R) et que la configuration actuelle est uaqbu′, alors la configuration suivante sera uacpu′. Des règles spécifiques gèrent les cas où la tête se déplace sur une case blanche, étendant potentiellement la partie non blanche du ruban.

**Calcul et Terminaison**

Un **calcul** sur une entrée w est une séquence de configurations C0​,C1​,C2​,... où C0​ est la configuration initiale q0​w (avec la tête sur le premier symbole de w), et Ci​⊢Ci+1​ pour tout i≥0.

Il y a trois issues possibles pour un calcul :

1.  **Acceptation :** Le calcul atteint une configuration contenant l\'état qaccept​. La machine s\'arrête et le mot d\'entrée w est accepté.

2.  **Rejet :** Le calcul atteint une configuration contenant l\'état qreject​. La machine s\'arrête et le mot d\'entrée w est rejeté.

3.  **Boucle :** Le calcul ne s\'arrête jamais. La machine n\'atteint ni qaccept​ ni qreject​. Dans ce cas, le mot d\'entrée w est également considéré comme rejeté.

Cette distinction entre le rejet par arrêt et le rejet par boucle est fondamentale et sera au cœur de la distinction entre les langages récursifs et récursivement énumérables.

#### Conception de Machines de Turing : Un Exemple Exhaustif pour le Langage **{anbncn∣n≥1}**

Pour illustrer la puissance et le fonctionnement concret des machines de Turing, nous allons concevoir une machine qui décide le langage L={anbncn∣n≥1}. Ce langage est un exemple canonique de langage qui n\'est pas hors-contexte (non \"context-free\"), ce qui signifie qu\'il ne peut pas être reconnu par un automate à pile. La nécessité de faire correspondre trois ensembles de symboles en nombre égal dépasse les capacités d\'une pile unique. Une machine de Turing, avec sa capacité à se déplacer librement sur le ruban et à modifier son contenu, est nécessaire pour résoudre ce problème.

**Stratégie de Conception**

L\'algorithme que notre machine mettra en œuvre est une stratégie de balayage et de marquage, souvent qualifiée de \"zigzag\". L\'idée est la suivante :

1.  Balayer le ruban de gauche à droite pour vérifier que l\'entrée est de la forme a\...ab\...bc\...c.

2.  Retourner au début du ruban.

3.  Dans une boucle :\
    a. Trouver le premier \'a\' non marqué et le remplacer par un symbole de marquage (par exemple, X).\
    b. Avancer pour trouver le premier \'b\' non marqué et le remplacer par un autre marqueur (par exemple, Y).\
    c. Avancer encore pour trouver le premier \'c\' non marqué et le remplacer par un troisième marqueur (par exemple, Z).\
    d. Retourner au début du ruban (juste après le dernier X marqué) pour recommencer le processus.

4.  Si, à un moment, un \'b\' ou un \'c\' correspondant ne peut être trouvé, le mot est mal formé, et la machine doit rejeter.

5.  Lorsque tous les \'a\' ont été marqués, la machine doit effectuer une dernière vérification : s\'assurer qu\'il ne reste plus de \'b\' ou de \'c\' non marqués sur le ruban. Si c\'est le cas, la machine accepte. Sinon, elle rejette.

**Implémentation Détaillée**

Construisons formellement la machine Manbncn​ qui met en œuvre cette stratégie.

- Q={q0​,q1​,q2​,q3​,q4​,qaccept​,qreject​}

  - q0​: État initial. Cherche le premier \'a\' à gauche.

  - q1​: A marqué un \'a\'. Cherche un \'b\' correspondant en se déplaçant vers la droite.

  - q2​: A marqué un \'b\'. Cherche un \'c\' correspondant en se déplaçant vers la droite.

  - q3​: A marqué un \'c\'. Revient au début pour le prochain cycle.

  - q4​: Tous les \'a\' ont été marqués. Vérifie qu\'il ne reste plus de \'b\' ni de \'c\'.

- Σ={a,b,c}

- Γ={a,b,c,X,Y,Z,⊔}

- q0​ est l\'état initial.

- qaccept​ et qreject​ sont les états d\'acceptation et de rejet.

La fonction de transition δ est le cœur de la machine. Elle peut être représentée par un graphe d\'états ou une table.

**Graphe d\'états de Manbncn​**

(Une description textuelle du graphe est fournie ici, car la génération d\'images n\'est pas possible. Chaque ligne représente une ou plusieurs transitions.)

- **De q0​ :**

  - Sur un \'a\' : Écrit X, va à droite, passe à q1​. (Début d\'un cycle de marquage).

  - Sur un \'Y\' : Écrit Y, va à droite, passe à q4​. (Tous les \'a\' ont été traités, passe à la vérification finale).

  - Sur tout autre symbole (⊔,b,c,X,Z): Va à qreject​.

- **De q1​ :**

  - Sur un \'a\' : Écrit \'a\', va à droite, reste en q1​. (Saute les \'a\' déjà vus).

  - Sur un \'Y\' : Écrit \'Y\', va à droite, reste en q1​. (Saute les \'b\' déjà marqués).

  - Sur un \'b\' : Écrit Y, va à droite, passe à q2​. (Marque le \'b\' correspondant).

  - Sur tout autre symbole : Va à qreject​.

- **De q2​ :**

  - Sur un \'b\' : Écrit \'b\', va à droite, reste en q2​. (Saute les \'b\').

  - Sur un \'Z\' : Écrit \'Z\', va à droite, reste en q2​. (Saute les \'c\' déjà marqués).

  - Sur un \'c\' : Écrit Z, va à gauche, passe à q3​. (Marque le \'c\' correspondant et commence le retour).

  - Sur tout autre symbole : Va à qreject​.

- **De q3​ :**

  - Sur \'a\', \'b\', \'Y\', \'Z\' : Écrit le même symbole, va à gauche, reste en q3​. (Revient vers la gauche).

  - Sur un \'X\' : Écrit X, va à droite, passe à q0​. (A trouvé le début du cycle, se repositionne pour le suivant).

- **De q4​ :**

  - Sur \'Y\', \'Z\' : Écrit le même symbole, va à droite, reste en q4​. (Vérifie qu\'il n\'y a que des Y et des Z).

  - Sur un ⊔ : Écrit ⊔, va à droite, passe à qaccept​. (A atteint la fin du ruban sans trouver de \'b\' ou \'c\' non marqués, accepte).

  - Sur tout autre symbole (\'a\', \'b\', \'c\') : Va à qreject​.

**Exemple d\'Exécution sur l\'Entrée \"aabbcc\"**

Traçons les configurations clés du calcul de Manbncn​ sur l\'entrée w=aabbcc.

1.  q0​aabbcc⊢Xq1​abbcc (Marque le premier \'a\').

2.  ⊢Xaq1​bbcc⊢XaYq2​bcc (Trouve et marque le premier \'b\').

3.  ⊢XaYbq2​cc⊢XaYbZq3​c (Trouve et marque le premier \'c\', commence le retour).

4.  ⊢XaYq3​bZc⊢⋯⊢Xq0​aYbZc (Retourne jusqu\'au X et se repositionne).

5.  ⊢XXq1​YbZc (Commence le deuxième cycle, marque le deuxième \'a\').

6.  ⊢XXYq1​bZc⊢XXYYq2​Zc (Trouve et marque le deuxième \'b\').

7.  ⊢XXYYZq2​c⊢XXYYZZq3​ (Trouve et marque le deuxième \'c\', retourne).

8.  ⊢⋯⊢XXq0​YYZZ (Retourne et se repositionne).

9.  ⊢XXYq4​YZZ (Ne trouve plus de \'a\', passe à l\'état de vérification q4​).

10. ⊢XXYYq4​ZZ⊢XXYYZq4​Z⊢XXYYZZq4​⊔ (Traverse les Y et les Z).

11. ⊢XXYYZZ⊔qaccept​ (Trouve un blanc, le mot est accepté).

Ce processus détaillé illustre comment la machine utilise ses états et les symboles du ruban pour mémoriser sa progression dans l\'algorithme de vérification. Tout écart par rapport à la structure anbncn (par exemple, \"abcc\") conduirait la machine à une configuration où aucune transition n\'est définie depuis un état autre que qaccept​, menant implicitement à qreject​.

#### Variantes et Équivalence de Puissance : Machines Multibandes et Non Déterministes

Le modèle standard de la machine de Turing, bien que suffisant pour définir la calculabilité, peut être fastidieux à programmer. Plusieurs variantes ont été proposées pour faciliter la conception d\'algorithmes. Il est crucial de se demander si ces variantes sont plus \"puissantes\", c\'est-à-dire si elles peuvent résoudre des problèmes que la machine standard ne peut pas résoudre. La réponse, étonnamment, est non. Toutes les variantes \"raisonnables\" se sont avérées équivalentes en puissance de calcul au modèle standard. Cette robustesse est un argument majeur en faveur de la thèse de Church-Turing.

Nous allons prouver cette équivalence pour deux des variantes les plus importantes : les machines multibandes et les machines non déterministes. Ces preuves ne sont pas de simples affirmations d\'existence ; ce sont des **algorithmes de simulation** constructifs. Elles montrent explicitement comment un modèle apparemment plus simple peut simuler un modèle plus complexe, jetant ainsi les bases de concepts comme la compilation et la virtualisation.

**Machines de Turing Multibandes**

Une machine de Turing à k rubans (ou MT multibande) est une généralisation naturelle du modèle standard. Elle possède k rubans infinis, chacun avec sa propre tête de lecture/écriture qui se déplace indépendamment.

Formellement, la seule différence réside dans la fonction de transition, qui prend en compte les symboles lus sur les k rubans pour décider de l\'action à effectuer sur chacun d\'eux :

δ:Q×Γk→Q×Γk×{L,R,S}k

où S signifie \"rester sur place\" (Stationary). Une transition δ(q,(a1​,...,ak​))=(p,(b1​,...,bk​),(D1​,...,Dk​)) signifie que si la machine est dans l\'état q et que la tête i lit le symbole ai​ pour chaque i, alors elle passe à l\'état p, écrit le symbole bi​ sur le ruban i, et déplace la tête i dans la direction Di​.

**Théorème :** Toute machine de Turing multibande a une machine de Turing à un seul ruban équivalente.

**Preuve (par simulation constructive) :**

Nous allons montrer comment une MT standard à un seul ruban, que nous appellerons S, peut simuler une MT à k rubans, que nous appellerons M.

1.  Encodage du contenu des rubans : Le ruban unique de S va stocker le contenu des k rubans de M. Pour ce faire, nous utilisons un symbole spécial, #, qui n\'appartient pas à l\'alphabet de ruban de M, comme séparateur. Le contenu du ruban de S aura la forme :\
    \
    #contenu1​#contenu2​#...#contenuk​#\
    \
    où contenui​ est le contenu du i-ème ruban de M.23

2.  **Marquage des positions des têtes :** Pour simuler les k têtes de M, S doit savoir où chaque tête virtuelle est positionnée. Pour cela, nous étendons l\'alphabet de ruban de S. Pour chaque symbole a∈Γ, nous ajoutons un symbole \"pointé\" a˙. Ce symbole a˙ sur le ruban de S signifiera que la tête virtuelle correspondante de M pointe sur une case contenant le symbole a. Il n\'y aura donc à tout moment que\
    k symboles pointés sur le ruban de S.

3.  Simulation d\'une étape de calcul de M : Pour simuler une seule transition de M, la machine S effectue la séquence d\'opérations suivante :\
    a. Lecture des symboles : S balaye son ruban de gauche à droite, du premier \# au dernier, pour trouver les k symboles pointés. Elle mémorise ces k symboles dans ses états finis.\
    b. Détermination de la transition : Une fois les k symboles lus, S connaît l\'état courant de M (qu\'elle mémorise aussi) et les symboles sous chaque tête. Elle peut donc consulter la fonction de transition δ de M pour déterminer le nouvel état, les k symboles à écrire, et les k directions de déplacement.\
    c. Mise à jour du ruban : S effectue un second balayage de son ruban. Pour chaque symbole pointé a˙ qu\'elle rencontre, elle le remplace par le nouveau symbole b et déplace le \"point\" vers la gauche ou la droite, comme dicté par la transition de M. Par exemple, si la tête doit se déplacer à droite et que la case voisine contient un symbole c, S remplace a˙ par b et c par c˙.\
    d. Gestion du dépassement de ruban : Si un déplacement de tête virtuelle nécessite de dépasser un séparateur \# (ce qui signifie que le ruban de M s\'agrandit), S doit décaler tout le contenu à droite du \# d\'une case pour faire de la place, en y insérant un symbole blanc pointé. C\'est une opération fastidieuse mais purement mécanique.

Après ces étapes, le ruban de S représente la configuration des k rubans de M après la transition. S a ainsi simulé une étape de M. Elle peut alors répéter ce processus. Si M entre dans un état d\'acceptation ou de rejet, S fait de même. Ce processus montre que S accepte un mot si et seulement si M l\'accepte. La puissance de calcul est donc la même.

**Machines de Turing Non Déterministes**

Le non-déterminisme est un concept puissant en informatique théorique. Une machine de Turing non déterministe (MTN) est une MT qui, à une étape donnée, peut avoir plusieurs choix de transitions possibles.

La fonction de transition d\'une MTN n\'est plus une fonction mais une relation. Pour un état et un symbole donnés, elle retourne un ensemble de triplets (nouvel état, symbole à écrire, direction) :

δ:Q×Γ→P(Q×Γ×{L,R})

Le calcul d\'une MTN n\'est plus une séquence unique de configurations, mais un arbre de calcul. La racine de l\'arbre est la configuration initiale. Chaque nœud a pour enfants les configurations accessibles en une étape.30

Une MTN **accepte** une entrée w s\'il existe **au moins une** branche dans l\'arbre de calcul qui mène à une configuration acceptante. Si toutes les branches s\'arrêtent dans des états de rejet ou bouclent, l\'entrée est rejetée. Le non-déterminisme peut être vu comme une forme de \"devinette chanceuse\" : la machine explore en parallèle toutes les possibilités et si l\'une d\'elles réussit, la réponse est \"oui\".

**Théorème :** Toute machine de Turing non déterministe a une machine de Turing déterministe équivalente.

**Preuve (par simulation constructive) :**

Nous allons montrer qu\'une MTD D peut simuler une MTN N. La stratégie consiste pour

D à explorer l\'arbre de calcul de N de manière systématique jusqu\'à trouver une branche acceptante. Une recherche en largeur (Breadth-First Search) est idéale car elle garantit de trouver la branche acceptante la plus courte, si elle existe.

Pour implémenter cette recherche, nous utilisons une MTD à 3 rubans, D, qui, comme nous l\'avons vu, est équivalente à une MTD standard.

1.  **Ruban 1 (Ruban d\'entrée) :** Ce ruban contient le mot d\'entrée initial w et n\'est jamais modifié. Il sert de référence.

2.  **Ruban 2 (Ruban de simulation) :** Ce ruban est utilisé pour simuler l\'exécution de N sur une branche particulière de son arbre de calcul.

3.  **Ruban 3 (Ruban d\'adresse) :** Ce ruban guide la simulation. Il contient une chaîne de caractères qui représente un chemin depuis la racine de l\'arbre de calcul de N. Soit b le nombre maximal de choix pour n\'importe quelle transition de N. Le ruban d\'adresse contiendra une chaîne de l\'alphabet {1,2,...,b}∗. Par exemple, la chaîne \"213\" signifie : \"au premier pas, prendre le deuxième choix ; au deuxième pas, prendre le premier choix ; au troisième pas, prendre le troisième choix\".

L\'algorithme de simulation de D est le suivant :

1.  Initialement, le ruban 1 contient w. Les rubans 2 et 3 sont vides.

2.  Copier w sur le ruban 2. Placer la chaîne \"1\" sur le ruban 3.

3.  Boucle de simulation :\
    a. Simuler N sur le ruban 2, en utilisant la chaîne sur le ruban 3 pour résoudre les choix non déterministes. À chaque étape de la simulation de N, D consulte le prochain symbole sur le ruban 3 pour savoir quelle transition choisir.\
    b. Si la simulation atteint un état d\'acceptation de N, alors D s\'arrête et accepte.\
    c. Si la chaîne d\'adresse sur le ruban 3 est invalide (par exemple, elle demande un choix qui n\'existe pas) ou si la branche de calcul correspondante s\'arrête dans un état de rejet, ou si la chaîne d\'adresse a été entièrement consommée, la simulation de cette branche est terminée.\
    d. Remplacer la chaîne sur le ruban 3 par la chaîne lexicographiquement suivante (par exemple, \"1\", \"2\",\..., \"b\", \"11\", \"12\",\...).\
    e. Réinitialiser le ruban 2 avec le contenu du ruban 1 (le mot d\'entrée w).\
    f. Retourner à l\'étape 3a pour simuler la nouvelle branche.

Si N accepte w, il existe une branche acceptante dans son arbre de calcul. La recherche en largeur de D finira par explorer cette branche, et D acceptera. Si N n\'accepte pas w, aucune branche n\'est acceptante, et D continuera sa recherche indéfiniment (elle bouclera). Ainsi, D accepte un mot si et seulement si N l\'accepte.

Cette preuve a une implication profonde qui anticipe la théorie de la complexité. La simulation d\'une MTN par une MTD peut entraîner une explosion exponentielle du temps de calcul. Si une MTN résout un problème en temps polynomial, la MTD simulatrice pourrait nécessiter un temps exponentiel. La question de savoir si cette explosion est inévitable est au cœur du célèbre problème P = NP.

#### Langages Récursifs et Récursivement Énumérables : La Hiérarchie de la Calculabilité

L\'existence de machines de Turing qui peuvent boucler sur certaines entrées nous amène à définir deux classes de langages distinctes, qui forment la première strate de la hiérarchie de la calculabilité.

**Définition Formelle**

- Un langage L est dit **récursivement énumérable (RE)**, ou **Turing-reconnaissable**, s\'il existe une machine de Turing M telle que L(M)=L. Cela signifie que pour tout mot w∈L, la machine M s\'arrête et accepte. Pour un mot w∈/L, la machine M peut soit s\'arrêter et rejeter, soit boucler indéfiniment. Une telle machine est appelée un\
  **reconnaisseur**.

- Un langage L est dit **récursif**, ou **Turing-décidable** (ou simplement **décidable**), s\'il existe une machine de Turing M qui s\'arrête sur *toutes* les entrées et telle que L(M)=L. Pour tout mot w, le calcul de M sur w s\'arrête, soit en acceptant (si w∈L), soit en rejetant (si w∈/L). Une telle machine est appelée un\
  **décideur**.

**Relation et Propriétés**

De par ces définitions, il est clair que la classe des langages récursifs est un sous-ensemble de la classe des langages récursivement énumérables. Tout décideur est un reconnaisseur, mais la réciproque n\'est pas vraie, comme nous le prouverons de manière spectaculaire dans la section 5.2.

Une propriété fondamentale relie ces deux classes au concept de complémentation de langage.

**Théorème :** Un langage L est récursif si et seulement si L et son complément L sont tous deux récursivement énumérables.

**Preuve :**

(⇒) Si L est récursif, il est décidé par une MT M qui s\'arrête toujours. L est donc trivialement RE. Pour décider L, il suffit de construire une machine M′ qui simule M et inverse ses états d\'acceptation et de rejet. Puisque M s\'arrête toujours, M′ s\'arrête aussi toujours, donc L est récursif, et par conséquent RE.

(⇐) Supposons que L soit reconnu par une MT M1​ et que L soit reconnu par une MT M2​. Nous pouvons construire un décideur M pour L comme suit :

M, sur une entrée w, utilise deux rubans pour simuler M1​ sur w et M2​ sur w en parallèle. À chaque étape, M exécute une transition de M1​ puis une transition de M2​.

Puisque tout mot w appartient soit à L soit à L, l\'une des deux machines M1​ ou M2​ doit nécessairement s\'arrêter et accepter.

- Si M1​ accepte, M s\'arrête et accepte.

- Si M2​ accepte, M s\'arrête et rejette.\
  Comme l\'une de ces deux situations doit se produire, la machine M s\'arrête sur toutes les entrées. Elle décide donc le langage L, qui est par conséquent récursif.13

### 5.1.2 Modèles Alternatifs : Une Convergence Fondamentale

La machine de Turing, avec son approche mécanique et impérative, n\'est qu\'une des manières de formaliser le calcul. D\'autres modèles, issus de traditions mathématiques différentes, offrent des perspectives complémentaires. Leur étude révèle un fait remarquable : malgré leurs différences apparentes, les modèles de calcul les plus puissants convergent tous vers la même classe de fonctions calculables.

#### Les Fonctions μ-Récursives : Le Calcul comme Arithmétique

Cette approche, développée par Gödel, Herbrand et Kleene, définit la calculabilité non pas en termes de machine, mais en termes de fonctions sur les nombres naturels (N). L\'idée est de partir d\'un ensemble de fonctions de base, incontestablement calculables, et de définir des opérateurs qui permettent de construire des fonctions plus complexes.

**Fonctions Primitives Récursives**

La classe des fonctions primitives récursives constitue une première étape importante. Elle capture une vaste classe de fonctions calculables qui terminent toujours.

- **Fonctions de base :**

  1.  **Fonction Zéro :** Z(x)=0.

  2.  **Fonction Successeur :** S(x)=x+1.

  3.  **Fonctions de Projection :** Pik​(x1​,...,xk​)=xi​ (permet de sélectionner un argument).

- **Opérateurs de construction :**

  1.  **Composition :** Si g1​,...,gm​ sont des fonctions à k variables et h est une fonction à m variables, alors leur composition f(x1​,...,xk​)=h(g1​(x1​,...,xk​),...,gm​(x1​,...,xk​)) est également une fonction constructible.

  2.  Récursion Primitive : Cet opérateur formalise la récurrence. Si g est une fonction à k variables et h une fonction à k+2 variables, on peut définir une nouvelle fonction f à k+1 variables comme suit :\
      \
      f(x1​,...,xk​,0)=g(x1​,...,xk​)\
      f(x1​,...,xk​,y+1)=h(x1​,...,xk​,y,f(x1​,...,xk​,y))\
      \
      Le cas de base est donné par g, et le cas récursif par h, qui utilise la valeur de la fonction à l\'étape précédente.35

À l\'aide de ces outils, on peut construire la plupart des fonctions arithmétiques usuelles. Par exemple, l\'addition peut être définie par récursion primitive sur le second argument :

- add(x,0)=x=P11​(x)

- add(x,y+1)=S(add(x,y))=S(P33​(x,y,add(x,y)))

De même, la multiplication se définit par récursion sur l\'addition, la factorielle sur la multiplication, etc.. Les fonctions primitives récursives sont toutes des fonctions

**totales**, c\'est-à-dire qu\'elles sont définies pour tous les entiers en entrée.

**Limites de la Récursion Primitive : La Fonction d\'Ackermann**

Pendant un temps, on a pu croire que les fonctions primitives récursives capturaient toutes les fonctions calculables. Cependant, en 1928, Wilhelm Ackermann a construit une fonction qui, bien qu\'intuitivement calculable, ne peut pas être définie par récursion primitive. La version la plus courante est la fonction d\'Ackermann-Péter :

\$\$ A(m, n) = \\begin{cases} n+1 & \\text{si } m=0 \\ A(m-1, 1) & \\text{si } m \> 0 \\text{ et } n=0 \\ A(m-1, A(m, n-1)) & \\text{si } m \> 0 \\text{ et } n \> 0 \\end{cases} \$\$

Cette fonction croît à une vitesse phénoménale. Par exemple, A(4,2) est un nombre de 19 729 chiffres. Il peut être prouvé que la fonction d\'Ackermann croît plus vite que n\'importe quelle fonction primitive récursive. Par conséquent, elle ne peut pas être elle-même primitive récursive.35 Cela démontre que la classe des fonctions primitives récursives est un sous-ensemble strict de l\'ensemble des fonctions calculables.

**Fonctions μ-Récursives**

Pour capturer toutes les fonctions calculables, y compris la fonction d\'Ackermann, il faut ajouter un opérateur plus puissant, capable de simuler des boucles non bornées (l\'équivalent d\'une boucle while). C\'est le rôle de l\'opérateur de **minimisation non bornée (μ)**.

- **Opérateur de Minimisation (μ) :** Soit g(x1​,...,xk​,z) une fonction totale. La fonction f(x1​,...,xk​)=μz\[g(x1​,...,xk​,z)=0\] est définie comme \"le plus petit entier z≥0 tel que g(x1​,...,xk​,z)=0\".

Pour trouver ce z, un algorithme calcule successivement g(...,0), g(...,1), g(...,2), etc., jusqu\'à trouver une valeur qui s\'annule. Si une telle valeur n\'existe pas, le calcul ne s\'arrête jamais. Cet opérateur introduit donc la possibilité de définir des **fonctions partielles**, c\'est-à-dire des fonctions qui ne sont pas définies pour toutes les entrées.

La classe des **fonctions μ-récursives** (ou simplement **fonctions récursives**) est le plus petit ensemble de fonctions contenant les fonctions de base et fermé sous la composition, la récursion primitive et la minimisation non bornée. Il s\'avère que cette classe correspond exactement à la classe des fonctions calculables par une machine de Turing.

#### Le Calcul Lambda : Le Calcul comme Réécriture de Fonctions

Le calcul lambda (ou λ-calcul), introduit par Alonzo Church, offre une perspective radicalement différente. Il s\'agit d\'un formalisme minimaliste qui ne contient qu\'une seule entité : la fonction. Tout --- les nombres, les booléens, les structures de données --- est encodé comme une fonction. Le calcul n\'est pas une exécution sur une machine, mais un processus de réécriture symbolique d\'expressions.

**Fondements**

Le langage du λ-calcul est constitué de **λ-termes**, définis inductivement :

- **Variable :** Une variable, comme x, est un λ-terme.

- **Abstraction :** Si M est un λ-terme et x est une variable, alors (λx.M) est un λ-terme. Il représente la fonction anonyme qui prend un argument x et retourne M.

- **Application :** Si M et N sont des λ-termes, alors (MN) est un λ-terme. Il représente l\'application de la fonction M à l\'argument N.

Dans une abstraction λx.M, la variable x est dite **liée**. Une variable qui n\'est pas liée est dite **libre**. Cette distinction est cruciale pour définir correctement le mécanisme de calcul.

**Règles de Conversion**

Le calcul dans le λ-calcul est gouverné par un ensemble de règles de réécriture, appelées conversions.

- **α-conversion (renommage) :** Cette règle stipule que le nom d\'une variable liée n\'a pas d\'importance. On peut le changer, à condition de ne pas créer de conflit avec d\'autres variables. Par exemple, la fonction identité λx.x est équivalente à λy.y. Formellement : λx.M→α​λy.M\[x:=y\], où M\[x:=y\] est la substitution de x par y dans M.

- **β-réduction (application) :** C\'est le moteur du calcul. Elle formalise l\'application d\'une fonction à un argument. L\'expression (λx.M)N se réduit en remplaçant toutes les occurrences libres de x dans le corps M par l\'argument N. Formellement : (λx.M)N→β​M\[x:=N\]. Par exemple,\
  (λx.x+1)3→β​3+1.

- **η-conversion (extensionnalité) :** Cette règle exprime le principe d\'extensionnalité : deux fonctions sont égales si elles produisent le même résultat pour tous les arguments. Elle permet de simplifier une expression de la forme λx.(Mx) en M, à condition que x ne soit pas une variable libre de M.

**Encodage de Données (Entiers de Church)**

La puissance du λ-calcul réside dans sa capacité à tout représenter en tant que fonction. L\'encodage des nombres naturels, connu sous le nom d\'**entiers de Church**, en est l\'exemple le plus célèbre. L\'idée est de représenter un nombre

n par une fonction qui prend deux arguments, une fonction f et une valeur x, et qui applique n fois la fonction f à la valeur x.

- 0:=λf.λx.x (applique f zéro fois)

- 1:=λf.λx.fx (applique f une fois)

- 2:=λf.λx.f(fx) (applique f deux fois)

- En général, nˉ:=λf.λx.fn(x).

Avec cet encodage, les opérations arithmétiques deviennent des opérations sur des fonctions de haut niveau :

- Successeur : La fonction SUCC prend un entier de Church nˉ et retourne n+1​. Elle le fait en ajoutant une application de f :\
  \
  SUCC:=λn.λf.λx.f(nfx)

- Addition : L\'addition de m et n consiste à appliquer m fois le successeur à n.\
  \
  PLUS:=λm.λn.m SUCC n

- Multiplication : La multiplication de m et n consiste à composer les fonctions \"appliquer f m fois\" et \"appliquer f n fois\".\
  \
  MULT:=λm.λn.λf.m(nf)

Le fait que des concepts aussi fondamentaux que les nombres et l\'arithmétique puissent être construits à partir d\'un système aussi simple démontre l\'extraordinaire expressivité du λ-calcul. Church a prouvé que les fonctions calculables dans le λ-calcul sont précisément les fonctions μ-récursives, et donc équivalentes aux fonctions calculables par machine de Turing.

### 5.1.3 La Thèse de Church-Turing : Un Fondement pour les Sciences Informatiques

Nous avons exploré trois formalismes de calcul distincts :

1.  Les **machines de Turing**, un modèle mécanique.

2.  Les **fonctions μ-récursives**, un modèle arithmétique.

3.  Le **calcul lambda**, un modèle de réécriture fonctionnelle.

Le résultat le plus remarquable de cette exploration est que ces trois approches, développées indépendamment pour capturer la notion de \"procédure effective\", définissent *exactement la même classe de fonctions calculables*. Cette convergence n\'est pas une simple coïncidence ; elle est l\'évidence la plus forte en faveur d\'une hypothèse fondamentale qui sous-tend toute l\'informatique : la thèse de Church-Turing.

**Énoncé de la Thèse**

La **thèse de Church-Turing** peut être formulée comme suit :

> La notion intuitive de fonction calculable par un algorithme (ou une procédure effective) coïncide avec la notion formelle de fonction calculable par une machine de Turing.

Puisque les machines de Turing, les fonctions μ-récursives et le λ-calcul sont formellement équivalents, la thèse affirme que n\'importe lequel de ces modèles capture précisément et complètement notre concept intuitif de calcul.

**Arguments en Faveur de la Thèse**

1.  **Convergence et Robustesse :** Comme mentionné, le fait que des modèles si différents aboutissent au même résultat est un argument puissant. Si un nouveau modèle de calcul est proposé, il s\'avère presque toujours être soit moins puissant (comme les automates finis), soit exactement équivalent aux machines de Turing. Cette robustesse suggère qu\'une classe naturelle et fondamentale de problèmes a été identifiée.

2.  **Analyse de Turing du Calcul Humain :** L\'argument de Turing en faveur de son modèle n\'était pas seulement sa simplicité, mais une analyse philosophique des étapes élémentaires qu\'un être humain (un \"computer\", à l\'époque) effectue lors d\'un calcul avec un crayon et du papier. Turing a argumenté que toute procédure mécanique peut être décomposée en un ensemble fini d\'opérations atomiques (lire un symbole, écrire un symbole, changer d\'état de concentration, déplacer son attention) que sa machine peut simuler.

**Statut de \"Thèse\" et Non de \"Théorème\"**

Il est crucial de comprendre pourquoi il s\'agit d\'une thèse et non d\'un théorème mathématique. Un théorème relie des objets formels au sein d\'un système axiomatique. La thèse de Church-Turing, elle, cherche à établir un pont entre un concept intuitif et informel (la \"procédure effective\") et un objet mathématique formel (la \"machine de Turing\"). On ne peut pas prouver mathématiquement qu\'une définition formelle capture parfaitement une idée intuitive. La thèse est donc une affirmation que l\'on accepte sur la base de l\'évidence accumulée, un peu comme un axiome qui fonde une théorie physique en reliant les mathématiques au monde observable.

**Implications et Défis Modernes**

L\'acceptation de la thèse de Church-Turing est ce qui nous donne le droit de faire des déclarations universelles sur la calculabilité. Lorsque nous prouverons dans la section suivante que le problème de l\'arrêt est \"indécidable\", nous ne voudrons pas dire seulement \"indécidable par une machine de Turing\", mais bien \"indécidable par *n\'importe quel algorithme imaginable*\". La thèse est le fondement qui justifie cette généralisation.

Cependant, il est important de noter que la thèse concerne la **calculabilité** (ce qui peut être calculé en principe, avec des ressources de temps et d\'espace illimitées) et non l\'**efficacité**. L\'avènement de modèles comme l\'**ordinateur quantique** a remis en question la *version efficace* de la thèse de Church-Turing (parfois appelée principe de Church-Turing-Deutsch). Des algorithmes quantiques comme celui de Shor peuvent résoudre certains problèmes, comme la factorisation d\'entiers, de manière exponentiellement plus rapide qu\'on ne le pense possible sur un ordinateur classique. Cela ne viole pas la thèse originale --- une machine de Turing classique peut toujours simuler un ordinateur quantique, bien que de manière extrêmement lente --- mais cela suggère que notre compréhension de ce qui est \"calculable efficacement\" pourrait dépendre des lois de la physique.

## 5.2 Indécidabilité : Les Limites Infranchissables du Calcul

Après avoir établi une définition formelle et robuste de ce qui est calculable, nous abordons maintenant une question plus profonde et, à bien des égards, plus surprenante : tout est-il calculable? Existe-t-il des problèmes formulés avec une parfaite précision mathématique, pour lesquels aucun algorithme, aussi ingénieux soit-il, ne pourra jamais fournir de solution?

La réponse, découverte par Church et Turing, est un oui catégorique. Il existe des abîmes d\'incalculabilité, des problèmes dont l\'insolubilité n\'est pas une question de technologie ou d\'efficacité, mais une limitation fondamentale et permanente de la logique et de la computation. Cette section est consacrée à la cartographie de ce territoire de l\'impossible. Nous commencerons par prouver l\'existence d\'un premier problème indécidable, le célèbre **problème de l\'arrêt**. Ce résultat servira de pierre de Rosette, un point de référence de l\'indécidabilité à partir duquel nous utiliserons la puissante technique de la **réduction** pour démontrer l\'insolubilité de nombreux autres problèmes. Enfin, nous atteindrons le sommet de cette exploration avec le **théorème de Rice**, un résultat d\'une généralité saisissante qui trace une ligne de démarcation claire entre les questions syntaxiques (faciles) et les questions sémantiques (impossibles) que l\'on peut poser sur les programmes.

### 5.2.1 Le problème de l\'arrêt (Halting Problem)

Le problème de l\'arrêt est sans doute le résultat le plus célèbre de l\'informatique théorique. Intuitivement, il pose la question suivante : peut-on écrire un programme qui, étant donné un autre programme et une entrée, peut déterminer si ce programme finira par s\'arrêter ou s\'il bouclera à l\'infini? Turing a prouvé que la réponse est non. Un tel analyseur de programmes universel et infaillible ne peut exister.

#### Définition Formelle du Langage de l\'Acceptation **ATM​**

Pour prouver ce résultat formellement, il est plus commode de travailler avec une variante légèrement différente mais équivalente, appelée le **problème de l\'acceptation**. Au lieu de demander si une machine s\'arrête, nous demandons si elle accepte son entrée.

Nous formalisons ce problème à travers la notion de langage. Pour cela, nous avons besoin d\'un moyen de représenter une machine de Turing M et une entrée w comme une seule chaîne de caractères. Nous utilisons la notation ⟨M,w⟩ pour désigner un encodage raisonnable de la paire (M,w) en une chaîne unique sur un alphabet fixe (par exemple, binaire).

Définition : Le langage de l\'acceptation, noté ATM​, est l\'ensemble des paires ⟨M,w⟩ où M est une machine de Turing et w est une chaîne que M accepte.

ATM​={⟨M,w⟩∣M est une MT qui accepte w}

Sources: 13

Avant de prouver que ATM​ est indécidable, montrons d\'abord qu\'il est au moins Turing-reconnaissable.

**Théorème :** Le langage ATM​ est récursivement énumérable (Turing-reconnaissable).

Preuve :

Pour reconnaître ATM​, nous pouvons construire une machine de Turing spéciale, souvent appelée Machine de Turing Universelle (UTM), notée U. Cette machine U prend en entrée l\'encodage ⟨M,w⟩. Son fonctionnement est le suivant :

1.  U vérifie que l\'entrée est un encodage valide d\'une MT M et d\'une chaîne w.

2.  U simule l\'exécution de M sur l\'entrée w. Elle utilise une partie de son ruban pour stocker la configuration courante de M (son état, le contenu de son ruban, la position de sa tête) et une autre partie pour stocker la description de M (sa fonction de transition).

3.  À chaque étape, U consulte la description de M pour déterminer la prochaine transition à effectuer et met à jour la configuration simulée.

4.  Si la simulation de M atteint l\'état d\'acceptation, U s\'arrête et accepte.

5.  Si la simulation de M atteint l\'état de rejet, U s\'arrête et rejette.

Si M accepte w, la simulation sur U finira par atteindre l\'état d\'acceptation, et U acceptera ⟨M,w⟩. Si M rejette w en s\'arrêtant, U rejettera. Cependant, si M boucle sur w, la simulation sur U bouclera également. Par conséquent, U accepte précisément les chaînes de ATM​ mais peut boucler sur les autres. U est donc un reconnaisseur pour ATM​, ce qui prouve que ATM​ est récursivement énumérable.

#### Preuve Détaillée de l\'Indécidabilité par l\'Argument de la Diagonalisation

Nous allons maintenant prouver le résultat principal : ATM​ n\'est pas décidable. La preuve est un chef-d\'œuvre de logique, une preuve par l\'absurde qui utilise l\'**argument de la diagonalisation** de Cantor. L\'idée est de supposer qu\'un décideur pour ATM​ existe, puis d\'utiliser ce décideur pour construire une nouvelle machine \"paradoxale\" dont l\'existence même mène à une contradiction logique inéluctable.

**Étape 1 : Hypothèse par l\'Absurde**

Supposons, pour les besoins de la contradiction, que le langage ATM​ est décidable. Cela signifie qu\'il existe une machine de Turing H (pour \"Hypothétique\") qui est un décideur pour ATM​. Par définition d\'un décideur, H s\'arrête sur toutes les entrées. Son comportement est le suivant :

\$\$ H(\\langle M, w \\rangle) = \\begin{cases} \\text{accepte} & \\text{si } M \\text{ accepte } w \\ \\text{rejette} & \\text{si } M \\text{ n\'accepte pas } w \\text{ (c.-à-d. rejette ou boucle)} \\end{cases} \$\$

Sources: 32

**Étape 2 : Construction de la Machine Contradictoire D**

En utilisant notre décideur hypothétique H comme une \"boîte noire\" ou une sous-routine, nous construisons une nouvelle machine de Turing, que nous nommerons D (pour \"Diagonale\" ou \"Démoniaque\"). La machine D est conçue pour se comporter de manière perverse.

- **Entrée de D :** D prend en entrée l\'encodage d\'une seule machine de Turing, ⟨M⟩.

- **Fonctionnement de D :**

  1.  Sur l\'entrée ⟨M⟩, D construit la chaîne ⟨M,⟨M⟩⟩. Elle utilise donc la description de M comme sa propre entrée.

  2.  D exécute ensuite le décideur H sur cette entrée construite, ⟨M,⟨M⟩⟩.

  3.  D observe le résultat de H et fait délibérément le contraire :

      - Si H accepte ⟨M,⟨M⟩⟩ (ce qui signifie que M accepterait sa propre description en entrée), alors D **rejette** ⟨M⟩.

      - Si H rejette ⟨M,⟨M⟩⟩ (ce qui signifie que M n\'accepterait pas sa propre description), alors D **accepte** ⟨M⟩.

Puisque H est un décideur et s\'arrête toujours, et que les autres étapes de D sont de simples manipulations de chaînes, D est également un décideur. Elle s\'arrête sur toutes les entrées ⟨M⟩ et retourne soit \"accepte\", soit \"rejette\".

**Étape 3 : L\'Argument de la Diagonalisation -- Le Paradoxe**

Le piège se referme lorsque nous posons la question fatidique : que se passe-t-il si nous donnons à la machine D sa propre description, ⟨D⟩, comme entrée? Puisque D est une machine de Turing et un décideur, elle doit avoir un comportement bien défini sur cette entrée. Examinons les deux seules possibilités logiques.

- **Cas 1 : Supposons que D accepte son entrée ⟨D⟩.**

  - Regardons la définition de D. Pour que D accepte son entrée ⟨M⟩=⟨D⟩, il faut que la simulation de H sur l\'entrée ⟨D,⟨D⟩⟩ ait retourné \"rejette\".

  - Mais que signifie le fait que H rejette ⟨D,⟨D⟩⟩? Par définition de H, cela signifie que la machine D n\'accepte *pas* l\'entrée ⟨D⟩.

  - Nous avons donc atteint une contradiction : D accepte ⟨D⟩⟹D n\'accepte pas ⟨D⟩.

- **Cas 2 : Supposons que D rejette son entrée ⟨D⟩.**

  - Regardons à nouveau la définition de D. Pour que D rejette son entrée ⟨M⟩=⟨D⟩, il faut que la simulation de H sur l\'entrée ⟨D,⟨D⟩⟩ ait retourné \"accepte\".

  - Mais que signifie le fait que H accepte ⟨D,⟨D⟩⟩? Par définition de H, cela signifie que la machine D *accepte* l\'entrée ⟨D⟩.

  - Nous avons de nouveau atteint une contradiction : D rejette ⟨D⟩⟹D accepte ⟨D⟩.

Sources:

Pour mieux visualiser, imaginons un tableau infini où les lignes sont indexées par toutes les machines de Turing (M1​,M2​,...) et les colonnes par tous les encodages de machines de Turing (⟨M1​⟩,⟨M2​⟩,...). La case (i,j) contient \"accepte\" si Mi​ accepte ⟨Mj​⟩ et \"rejette\" sinon. Notre machine hypothétique H peut calculer n\'importe quelle case de ce tableau. La machine D est construite pour regarder la **diagonale** de ce tableau (les cases (i,i)) et pour avoir le comportement inverse. Le paradoxe survient lorsque nous essayons de situer D elle-même dans ce tableau. Si D est la k-ième machine, Mk​, alors son comportement sur l\'entrée ⟨D⟩=⟨Mk​⟩ doit être, par construction, l\'inverse de ce qui se trouve dans la case (k,k), ce qui est logiquement impossible.

**Étape 4 : Conclusion**

Les deux cas possibles mènent à une absurdité logique. La seule conclusion possible est que notre prémisse initiale était fausse. La machine D ne peut pas exister. Mais la construction de D était parfaitement légitime, à une seule condition : l\'existence de la sous-routine H. Par conséquent, c\'est l\'hypothèse de l\'existence du décideur H qui doit être rejetée.

**Conclusion :** Le langage ATM​ n\'est pas décidable. Il n\'existe aucun algorithme capable de résoudre le problème de l\'acceptation pour toutes les machines de Turing et toutes les entrées.

Ce résultat est d\'une portée immense. Il ne s\'agit pas d\'un échec temporaire de notre ingéniosité, mais d\'une barrière fondamentale. Il existera toujours des programmes dont le comportement est impossible à prédire de manière algorithmique.

### 5.2.2 Réductions et preuves d\'indécidabilité

L\'argument de la diagonalisation est puissant mais complexe à manier directement pour chaque nouveau problème. Heureusement, une fois que nous avons établi un premier problème indécidable comme ATM​, nous pouvons l\'utiliser comme un \"levier\" pour prouver l\'indécidabilité d\'une multitude d\'autres problèmes. La technique qui permet cette propagation de l\'indécidabilité est la **réduction**.

#### Le Concept de Réductibilité par Mappage (**≤m​**)

L\'idée intuitive d\'une réduction est de montrer qu\'un problème A peut être \"transformé\" en un problème B de telle sorte qu\'une solution pour B nous donnerait directement une solution pour A. Si une telle transformation existe, cela implique que le problème A n\'est \"pas plus difficile\" que le problème B. Par contraposée, si A est connu pour être difficile (c\'est-à-dire indécidable), alors B doit l\'être aussi.

Nous formalisons cette idée avec la **réductibilité par mappage** (ou réduction \"many-one\").

Définition : Un langage A est réductible par mappage au langage B, noté A≤m​B, s\'il existe une fonction calculable f (c\'est-à-dire, calculable par une machine de Turing qui s\'arrête toujours) qui transforme une chaîne w en une chaîne f(w), telle que :

w∈A⟺f(w)∈B

La fonction f est appelée la réduction de A à B.69

Le théorème suivant est l\'outil principal que nous utiliserons.

**Théorème :** Si A≤m​B et A est indécidable, alors B est indécidable.

Preuve :

Nous raisonnons par l\'absurde. Supposons que A≤m​B, que A est indécidable, mais que B est décidable.

Puisque B est décidable, il existe un décideur pour B, appelons-le MB​. Nous pouvons alors construire un décideur pour A, que nous nommerons MA​, comme suit :

MA​ = \"Sur une entrée w :

1.  Calculer f(w) en utilisant la machine de Turing qui calcule la fonction de réduction f. Puisque f est calculable, cette étape s\'arrête toujours.

2.  Exécuter le décideur MB​ sur le résultat f(w). Puisque MB​ est un décideur, cette étape s\'arrête toujours.

3.  Si MB​ accepte f(w), alors MA​ accepte w.

4.  Si MB​ rejette f(w), alors MA​ rejette w.\"

Cette machine MA​ s\'arrête sur toutes les entrées. De plus, par la définition de la réduction, w∈A⟺f(w)∈B. Et par la définition de MB​, MB​ accepte f(w)⟺f(w)∈B. Donc, MA​ accepte w⟺w∈A.

Nous avons construit un décideur pour A. Mais ceci contredit notre hypothèse que A est indécidable. Par conséquent, notre supposition que B est décidable doit être fausse. B est donc indécidable.69

#### Preuves d\'Indécidabilité par Réduction : **HALTTM​**, **ETM​**, et **EQTM​**

Armés de la réductibilité, nous pouvons maintenant établir une \"carte de l\'indécidabilité\", montrant comment l\'insolubilité de ATM​ se propage à d\'autres problèmes fondamentaux.

**Le Problème de l\'Arrêt (HALTTM​)**

Définissons formellement le langage du problème de l\'arrêt :

HALTTM​={⟨M,w⟩∣M est une MT qui s'arreˆte sur l'entreˊe w}

**Théorème :** HALTTM​ est indécidable.

**Preuve :** Nous allons montrer que ATM​≤m​HALTTM​. Pour ce faire, nous devons construire une fonction calculable f qui transforme une instance ⟨M,w⟩ de ATM​ en une instance ⟨M′,w′⟩ de HALTTM​ de telle sorte que M accepte w si et seulement si M′ s\'arrête sur w′.

Voici la construction de la fonction de réduction f(⟨M,w⟩)=⟨M′,w⟩ :

1.  f prend en entrée la description ⟨M,w⟩.

2.  f produit en sortie la description d\'une nouvelle machine M′.

3.  La machine M′ est conçue comme suit :\
    M′ = \"Sur une entrée x (que M′ ignorera) :\
    a. Simuler l\'exécution de M sur l\'entrée w.\
    b. Si M entre dans son état d\'acceptation, alors M′ s\'arrête et accepte.\
    c. Si M entre dans son état de rejet, alors M′ entre dans une boucle infinie.\"

Analysons le comportement de M′ :

- Si M accepte w, la simulation à l\'étape 3a se terminera, et M′ s\'arrêtera (étape 3b).

- Si M rejette w, la simulation se terminera, mais M′ entrera dans une boucle infinie (étape 3c).

- Si M boucle sur w, la simulation à l\'étape 3a ne se terminera jamais, et donc M′ bouclera aussi.

Par conséquent, M′ s\'arrête si et seulement si M accepte w. Nous avons donc bien :

⟨M,w⟩∈ATM​⟺⟨M′,w⟩∈HALTTM​

La fonction f qui transforme ⟨M,w⟩ en ⟨M′,w⟩ est calculable (elle consiste à prendre le code de M et à y ajouter quelques états et transitions pour implémenter la boucle). Nous avons donc établi que ATM​≤m​HALTTM​. Puisque ATM​ est indécidable, HALTTM​ doit également être indécidable.71

**Le Problème du Langage Vide (ETM​)**

Ce problème demande si le langage accepté par une machine de Turing est vide.

ETM​={⟨M⟩∣M est une MT et L(M)=∅}

**Théorème :** ETM​ est indécidable.

**Preuve :** Nous allons réduire ATM​ au complément de ETM​, noté ETM​​={⟨M⟩∣L(M)=∅}. Prouver que ETM​​ est indécidable implique que ETM​ l\'est aussi. La réduction f transforme une instance ⟨M,w⟩ de ATM​ en une instance ⟨M′⟩ de ETM​​.

Construction de la réduction f(⟨M,w⟩)=⟨M′⟩ :

1.  f prend en entrée la description ⟨M,w⟩.

2.  f produit en sortie la description d\'une nouvelle machine M′.

3.  La machine M′ est conçue comme suit :\
    M′ = \"Sur une entrée x :\
    a. Ignorer l\'entrée x.\
    b. Simuler l\'exécution de M sur l\'entrée w.\
    c. Si la simulation de M accepte w, alors M′ accepte x.\"

Analysons le langage de M′ :

- Si M accepte w, alors pour n\'importe quelle entrée x, la simulation à l\'étape 3b réussira, et M′ acceptera x. Dans ce cas, L(M′)=Σ∗, qui est non vide.

- Si M n\'accepte pas w (rejette ou boucle), la simulation à l\'étape 3b ne mènera jamais à l\'acceptation. Par conséquent, M′ n\'acceptera jamais aucune entrée x. Dans ce cas, L(M′)=∅.

Nous avons donc la correspondance parfaite :

\$\$ \\langle M, w \\rangle \\in A\_{TM} \\iff L(M\') \\neq \\emptyset \\iff \\langle M\' \\rangle \\in \\overline{E\_{TM}} \$\$

La fonction f est calculable. Nous avons donc montré que ATM​≤m​ETM​​. Puisque ATM​ est indécidable, ETM​​ est indécidable, et par conséquent, ETM​ est également indécidable.71

**Le Problème de l\'Équivalence (EQTM​)**

Ce problème demande si deux machines de Turing acceptent le même langage.

EQTM​={⟨M1​,M2​⟩∣M1​,M2​ sont des MT et L(M1​)=L(M2​)}

**Théorème :** EQTM​ est indécidable.

**Preuve :** Nous allons montrer que ETM​≤m​EQTM​. La réduction est particulièrement élégante.

Construction de la réduction f(⟨M⟩)=⟨M,M∅​⟩ :

1.  f prend en entrée la description ⟨M⟩ d\'une machine de Turing.

2.  f construit une machine M∅​ qui rejette systématiquement toutes ses entrées. Le langage de cette machine est L(M∅​)=∅. Cette machine est fixe et simple à décrire.

3.  f produit en sortie la paire ⟨M,M∅​⟩.

Analysons la condition d\'équivalence :

- La condition L(M)=L(M∅​) est vraie si et seulement si L(M)=∅.

Nous avons donc la correspondance :

\$\$ \\langle M \\rangle \\in E\_{TM} \\iff L(M) = \\emptyset \\iff L(M) = L(M\_{\\emptyset}) \\iff \\langle M, M\_{\\emptyset} \\rangle \\in EQ\_{TM} \$\$

La fonction f est clairement calculable. Nous avons donc montré que ETM​≤m​EQTM​. Puisque nous venons de prouver que ETM​ est indécidable, il s\'ensuit que EQTM​ est également indécidable.70

### 5.2.3 Théorème de Rice : Un Méta-théorème d\'Indécidabilité

Les preuves précédentes montrent que de nombreuses questions spécifiques sur le comportement des machines de Turing sont indécidables. Le théorème de Rice généralise ces résultats de manière spectaculaire. Il affirme que *toute* question non triviale sur le *langage* accepté par une machine de Turing est indécidable. C\'est un \"méta-théorème\" car il ne prouve pas l\'indécidabilité d\'un seul problème, mais d\'une classe infinie de problèmes en une seule fois.

#### Énoncé Formel du Théorème

Pour énoncer le théorème rigoureusement, nous devons définir ce que nous entendons par \"propriété d\'un langage\".

- Une **propriété des langages récursivement énumérables** est un ensemble de langages récursivement énumérables. Par exemple, la propriété \"être un langage fini\" est l\'ensemble de tous les langages RE qui sont finis.

- Une propriété P est dite **non triviale** si elle n\'est ni toujours vraie, ni toujours fausse. C\'est-à-dire qu\'il existe au moins un langage RE qui possède la propriété P, et au moins un langage RE qui ne la possède pas.

Le théorème de Rice concerne la décidabilité du problème suivant : étant donné une machine de Turing M, le langage qu\'elle accepte, L(M), possède-t-il une certaine propriété P?

**Théorème de Rice :** Soit P une propriété non triviale des langages récursivement énumérables. Le langage LP​={⟨M⟩∣L(M) posseˋde la proprieˊteˊ P} est indécidable.

Il est crucial de noter que la propriété doit porter sur le langage L(M) (la sémantique, le comportement) et non sur la machine M elle-même (la syntaxe, le code). Par exemple, \"la machine M a plus de 10 états\" est une propriété syntaxique et est parfaitement décidable. En revanche, \"le langage L(M) est régulier\" est une propriété sémantique, et comme nous le verrons, elle est indécidable.

#### Preuve Complète et Commentée du Théorème

La preuve du théorème de Rice est une généralisation élégante de la preuve d\'indécidabilité de ETM​. Elle utilise une réduction de ATM​ au problème de la décision de LP​ pour une propriété P non triviale quelconque.

Preuve :

Soit P une propriété non triviale des langages RE. Nous voulons montrer que LP​ est indécidable.

1.  **Mise en place :**

    - Sans perte de généralité, supposons que le langage vide, ∅, ne possède pas la propriété P (c\'est-à-dire ∅∈/P). Si ce n\'est pas le cas, nous pouvons simplement mener la preuve avec la propriété complémentaire P, car si P est non triviale, P l\'est aussi, et l\'indécidabilité de LP​ implique celle de LP​.

    - Puisque P est non triviale, il doit exister au moins un langage qui possède cette propriété. Soit Loui​ un tel langage, avec Loui​∈P. Puisque Loui​ est RE, il existe une machine de Turing, appelons-la Moui​, qui le reconnaît (L(Moui​)=Loui​).

2.  Construction de la Réduction : Nous allons réduire ATM​ à LP​. Nous construisons une fonction calculable f qui prend une instance ⟨M,w⟩ de ATM​ et produit une instance ⟨M′⟩ de LP​.\
    f(⟨M,w⟩)=⟨M′⟩, où M′ est la machine de Turing suivante :\
    M′ = \"Sur une entrée x :\
    a. Simuler l\'exécution de la machine M sur l\'entrée w.\
    b. Si la simulation de M sur w accepte, alors exécuter la machine Moui​ sur l\'entrée x. Accepter x si et seulement si Moui​ accepte x.\
    c. Si la simulation de M sur w rejette ou boucle, alors rejeter immédiatement x.\"

3.  **Analyse de la Correction de la Réduction :** Nous devons vérifier que ⟨M,w⟩∈ATM​⟺⟨M′⟩∈LP​.

    - Cas 1 : Supposons que ⟨M,w⟩∈ATM​ (c\'est-à-dire, M accepte w).\
      Dans ce cas, lorsque M′ est exécutée sur une entrée x, la simulation de l\'étape (a) se termine avec succès. L\'exécution passe à l\'étape (b). M′ se comporte alors exactement comme Moui​ sur l\'entrée x. Par conséquent, le langage accepté par M′ est le même que celui accepté par Moui​.\
      \
      L(M′)=L(Moui​)=Loui​\
      \
      Or, nous avons choisi Loui​ spécifiquement parce qu\'il possède la propriété P. Donc, L(M′) possède la propriété P, ce qui signifie que ⟨M′⟩∈LP​.

    - Cas 2 : Supposons que ⟨M,w⟩∈/ATM​ (c\'est-à-dire, M n\'accepte pas w).\
      Dans ce cas, lorsque M′ est exécutée sur une entrée x, la simulation de l\'étape (a) ne se termine jamais par une acceptation (elle rejette ou boucle). L\'exécution passe donc toujours à l\'étape (c), où M′ rejette x. M′ ne peut donc accepter aucune chaîne.\
      \
      L(M′)=∅\
      \
      Par notre supposition initiale, le langage vide ∅ ne possède pas la propriété P. Donc, L(M′) ne possède pas la propriété P, ce qui signifie que ⟨M′⟩∈/LP​.

4.  Conclusion :\
    Nous avons établi une équivalence parfaite : M accepte w si et seulement si L(M′) possède la propriété P. La fonction f qui construit ⟨M′⟩ à partir de ⟨M,w⟩ est calculable. Nous avons donc une réduction valide : ATM​≤m​LP​.\
    Puisque ATM​ est indécidable, nous concluons que LP​ doit être indécidable. Ceci achève la preuve du théorème de Rice.

#### La Puissance du Théorème : Applications et Implications Générales

Le théorème de Rice est un outil d\'une puissance extraordinaire pour classer rapidement des problèmes comme étant indécidables. Pour prouver qu\'un problème de décision sur les programmes est indécidable, il suffit de vérifier trois conditions :

1.  Le problème concerne une propriété du **langage** accepté par le programme, et non les détails de son implémentation.

2.  La propriété est **non triviale** (il existe au moins un programme qui la satisfait et un qui ne la satisfait pas).

3.  Le modèle de programmation est **Turing-complet**.

Appliquons ce théorème pour démontrer instantanément l\'indécidabilité de plusieurs problèmes d\'intérêt pratique en génie logiciel et en informatique théorique  :

- **Problème : Le langage d\'une MT est-il vide?**

  - Propriété du langage? Oui.

  - Non triviale? Oui. Il existe des MT qui acceptent le langage vide (par exemple, une machine qui rejette tout), et des MT qui acceptent des langages non vides (par exemple, une machine qui accepte tout).

  - **Conclusion (par le théorème de Rice) :** Indécidable. (Ceci confirme notre preuve par réduction pour ETM​).

- **Problème : Le langage d\'une MT est-il régulier?**

  - Propriété du langage? Oui. La régularité est une propriété d\'un ensemble de chaînes.

  - Non triviale? Oui. Le langage {0n1n∣n≥0} n\'est pas régulier mais est décidable par une MT. Le langage {0,1}∗ est régulier et décidable par une MT.

  - **Conclusion :** Indécidable. Il est impossible d\'écrire un programme qui détermine si un autre programme donné reconnaît un langage régulier.

- **Problème : Le langage d\'une MT contient-il la chaîne \"abc\"?**

  - Propriété du langage? Oui.

  - Non triviale? Oui. La MT qui accepte uniquement \"abc\" a cette propriété. La MT qui n\'accepte rien ne l\'a pas.

  - **Conclusion :** Indécidable.

- **Problème : Le langage d\'une MT est-il fini?**

  - Propriété du langage? Oui.

  - Non triviale? Oui. Le langage {\"abc\"} est fini. Le langage {0,1}∗ est infini. Les deux sont reconnaissables par des MT.

  - **Conclusion :** Indécidable.

Le théorème de Rice formalise une intuition profonde sur la difficulté de l\'analyse de programmes. Il établit une barrière fondamentale : alors que nous pouvons facilement analyser les propriétés **statiques** ou **syntaxiques** d\'un programme (son nombre de lignes, les variables qu\'il utilise), il est en général impossible de prédire de manière algorithmique ses propriétés **dynamiques** ou **sémantiques** (ce qu\'il fera à l\'exécution). Toute tentative de créer un outil d\'analyse de code universel et complet pour de telles propriétés est vouée à l\'échec. Cette limitation n\'est pas une faiblesse de nos outils actuels, mais une caractéristique intrinsèque de la nature même du calcul.

