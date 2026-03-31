# Chapitre I.4 : Langages Formels et Automates

## 4.1 Introduction : La Structure du Langage et de la Computation

La théorie des langages formels et des automates constitue le socle mathématique sur lequel repose une grande partie de l\'informatique, de la conception des compilateurs à l\'intelligence artificielle, en passant par la vérification de systèmes complexes. Elle offre un cadre rigoureux pour étudier les notions fondamentales de description, de reconnaissance et de calcul. Ce chapitre explore la relation intime entre les langages, définis par des règles de génération (les grammaires), et les machines abstraites conçues pour les reconnaître (les automates). Cette dualité est au cœur de la hiérarchie de Chomsky, une classification élégante qui organise les langages selon leur complexité structurelle et la puissance de calcul nécessaire pour les manipuler.

### 4.1.1 Définitions Préliminaires : Alphabets, Mots, Langages

Avant de construire des structures complexes, il est essentiel de définir leurs composants les plus élémentaires.

- **Alphabet** : Un alphabet, noté Σ, est un ensemble fini et non vide de symboles, aussi appelés lettres. Par exemple, l\'alphabet binaire est\
  Σ={0,1}, et l\'alphabet des lettres latines minuscules est Σ={a,b,c,\...,z}.

- **Mot** : Un mot (ou une chaîne de caractères) sur un alphabet Σ est une suite finie de symboles de Σ. La\
  **longueur** d\'un mot w, notée ∣w∣, est le nombre de symboles qui le composent. Le **mot vide**, noté ε, est l\'unique mot de longueur zéro. L\'ensemble de tous les mots possibles sur un alphabet\
  Σ est noté Σ∗.

- **Concaténation** : L\'opération fondamentale sur les mots est la concaténation, qui consiste à juxtaposer deux mots. Si u=a1​\...an​ et v=b1​\...bm​, alors leur concaténation est uv=a1​\...an​b1​\...bm​. Cette opération est associative et possède le mot vide ε comme élément neutre (wε=εw=w). L\'ensemble Σ∗ muni de la concaténation forme une structure algébrique appelée **monoïde libre**.

- **Langage Formel** : Un langage formel L sur un alphabet Σ est simplement un sous-ensemble de Σ∗, c\'est-à-dire un ensemble de mots. Ce peut être un ensemble fini, comme\
  L={chat,chien,souris}, ou un ensemble infini, comme l\'ensemble de tous les programmes C++ valides.

### 4.1.2 Le concept de Grammaire Formelle : Un Mécanisme Génératif

Comment définir rigoureusement un langage, surtout s\'il est infini? Une approche consiste à utiliser un mécanisme génératif : une grammaire formelle. Intuitivement, une grammaire est un ensemble de règles de réécriture qui permettent de construire toutes les \"phrases\" correctes d\'un langage, et uniquement celles-ci.

Formellement, une grammaire est un quadruplet G=(V,T,P,S).

- V (ou VN​) est un ensemble fini de **symboles non terminaux** ou **variables**. Ces symboles représentent des concepts syntaxiques abstraits, comme \<phrase\>, \<nom\> ou \<verbe\>.

- T (ou Σ, VT​) est un alphabet fini de **symboles terminaux**, disjoint de V. Ce sont les symboles qui composent les mots finaux du langage.

- P est un ensemble fini de **règles de production** (ou de réécriture). Chaque règle est de la forme u→v, où u et v sont des chaînes de symboles de (V∪T)∗, et u doit contenir au moins un symbole non terminal.

- S∈V est un non-terminal particulier appelé l\'**axiome** ou le **symbole de départ**. C\'est le point de départ de toute construction.

### 4.1.3 Le Processus de Dérivation

Une grammaire engendre un langage par un processus appelé dérivation.

- **Dérivation directe** : On dit qu\'une chaîne x dérive directement en une chaîne y, noté x⇒y, s\'il existe une règle u→v dans P et des chaînes α,β telles que x=αuβ et y=αvβ. L\'application d\'une règle consiste à remplacer une occurrence de sa partie gauche par sa partie droite. Il est crucial de distinguer le symbole\
  →, qui définit une règle, du symbole ⇒, qui dénote son application.

- **Dérivation** : La relation ⇒∗ est la fermeture réflexive et transitive de ⇒. On écrit x⇒∗y si y peut être obtenue à partir de x en zéro ou plusieurs étapes de dérivation directe.

- **Langage engendré** : Le langage engendré par une grammaire G, noté L(G), est l\'ensemble de tous les mots composés uniquement de symboles terminaux qui peuvent être dérivés à partir de l\'axiome S. Formellement : L(G)={w∈T∗∣S⇒∗w}.

### 4.1.4 Présentation de la Hiérarchie de Chomsky : Une feuille de route pour la complexité

En 1956, le linguiste Noam Chomsky a proposé une classification des grammaires formelles qui est devenue un pilier de l\'informatique théorique. Cette classification, connue sous le nom de

**hiérarchie de Chomsky**, organise les grammaires (et donc les langages qu\'elles engendrent) en quatre types, numérotés de 0 à 3, en fonction de restrictions croissantes sur la forme de leurs règles de production.

Le principe fondamental est celui d\'une **hiérarchie de confinement** : tout langage de type i est aussi un langage de type i−1. Ainsi, les langages de Type-3 sont un sous-ensemble des langages de Type-2, qui sont eux-mêmes un sous-ensemble des langages de Type-1, et ainsi de suite.

La beauté de cette hiérarchie réside dans sa dualité : à chaque type de grammaire, qui est un modèle *génératif*, correspond une classe de machines abstraites, les **automates**, qui agissent comme des modèles de *reconnaissance* de puissance équivalente.

Cette structure n\'est pas une simple taxonomie. Elle incarne un principe fondamental de l\'informatique : un compromis constant entre la **puissance expressive** d\'un formalisme et la **décidabilité** des problèmes qui lui sont associés. Plus une classe de grammaires est restrictive (plus on descend dans la hiérarchie, de 0 vers 3), moins elle peut décrire de langages complexes. En contrepartie, les questions fondamentales comme \"ce mot appartient-il au langage?\" deviennent algorithmiquement plus simples à résoudre. Le Type-0, au sommet, peut décrire tout ce qui est calculable, mais au prix de l\'indécidabilité de presque toutes les questions intéressantes, comme le fameux problème de l\'arrêt. À l\'inverse, le Type-3 est très limité dans son expressivité, mais le problème de l\'appartenance y est résoluble de manière très efficace. La hiérarchie de Chomsky est donc une cartographie de ce compromis fondamental.

Le tableau suivant synthétise cette organisation, qui servira de fil conducteur pour le reste de ce chapitre.

**Tableau 4.1 : La Hiérarchie de Chomsky - Synthèse**

  ------------ ----------------------------------- ------------------------------------------------------------------ ---------------------------- ----------------------------------------- ---------------------------------
  Type         Nom du Langage                      Forme des Règles de Grammaire (A,B∈V, a∈T, w∈(V∪T)∗, u,v∈(V∪T)+)   Automate de Reconnaissance   Décidabilité de l\'Appartenance           Exemple Canonique

  **Type-3**   Régulier                            A→aB ou A→a (linéaire à droite)                                    Automate Fini (AF)           Décidable (temps linéaire)                a∗b

  **Type-2**   Hors-Contexte (Algébrique)          A→w                                                                Automate à Pile (AP)         Décidable (temps polynomial, ex: O(n3))   \$\\{a\^nb\^n \\\| n \\ge 0\\\$

  **Type-1**   Contextuel (Sensible au contexte)   \$                                                                 u                            \\le                                      v

  **Type-0**   Récursivement Énumérable            u→v (aucune restriction)                                           Machine de Turing (MT)       Semi-décidable                            Langage de l\'arrêt
  ------------ ----------------------------------- ------------------------------------------------------------------ ---------------------------- ----------------------------------------- ---------------------------------

Sources pour le tableau :

## 4.2 Type-3 : Langages Réguliers et Automates à États Finis

La classe la plus simple et la plus fondamentale de la hiérarchie est celle des langages réguliers. Bien que limités en expressivité, ils sont omniprésents en informatique pratique, notamment pour la reconnaissance de motifs et l\'analyse lexicale. Ils sont caractérisés par des machines à mémoire finie : les automates finis.

### 4.2.1 Le Modèle de l\'Automate Fini Déterministe (AFD)

Un automate fini déterministe (AFD) est une machine abstraite qui lit un mot d\'entrée, symbole par symbole, et change d\'état en fonction du symbole lu. Il ne dispose d\'aucune mémoire supplémentaire au-delà de son état courant.

Un AFD est formellement défini comme un quintuplet A=(Q,Σ,δ,q0​,F) où  :

- Q est un ensemble fini d\'**états**.

- Σ est l\'**alphabet** d\'entrée.

- δ:Q×Σ→Q est la **fonction de transition**. Le caractère \"déterministe\" vient du fait que pour chaque couple (état, symbole), il existe une et une seule transition possible.

- q0​∈Q est l\'**état initial** unique.

- F⊆Q est l\'ensemble des **états finaux** ou acceptants.

Le fonctionnement de l\'automate est formalisé par la **fonction de transition étendue**, δ∗:Q×Σ∗→Q, qui calcule l\'état final après la lecture d\'un mot entier. Le **langage reconnu** par l\'AFD A est l\'ensemble des mots qui mènent l\'automate d\'un état initial à un état final : L(A)={w∈Σ∗∣δ∗(q0​,w)∈F}. Un AFD peut être représenté visuellement par un

**diagramme d\'états** (un graphe orienté) ou par une **table de transitions**.

### 4.2.2 Le Non-déterminisme : L\'Automate Fini Non-déterministe (AFN)

Un automate fini non-déterministe (AFN) est une généralisation de l\'AFD qui autorise l\'ambiguïté dans ses transitions. À une étape donnée, plusieurs chemins de calcul peuvent être possibles.

Un AFN est formellement défini comme un quintuplet A=(Q,Σ,δ,I,F). Les différences clés avec l\'AFD sont :

- La fonction de transition δ est de la forme Q×(Σ∪{ε})→P(Q) (où P(Q) est l\'ensemble des parties de Q). Cela signifie que pour un état et un symbole donnés, l\'automate peut transiter vers un *ensemble* d\'états. De plus, il peut effectuer des **ε-transitions**, c\'est-à-dire des changements d\'état spontanés sans consommer de symbole d\'entrée.

- I⊆Q est un *ensemble* d\'états initiaux (bien que souvent, par convention, on utilise un seul état initial).

Un mot w est accepté par un AFN s\'il existe **au moins un** chemin de calcul possible, partant d\'un état initial, qui consomme w et se termine dans un état final.

### 4.2.3 Théorème d\'Équivalence : La Construction par Sous-Ensembles

Le non-déterminisme semble intuitivement plus puissant, car il permet à la machine d\'\"explorer\" plusieurs possibilités en parallèle. Cependant, pour les automates finis, cette puissance apparente est une illusion. Le **théorème de Rabin-Scott** stipule que pour tout AFN, il existe un AFD qui reconnaît exactement le même langage.

La preuve de ce théorème est constructive et repose sur l\'**algorithme de construction par sous-ensembles** (ou déterminisation). L\'idée centrale est de construire un AFD où chaque état correspond à un

*ensemble d\'états* de l\'AFN. Un état {q1​,\...,qk​} dans l\'AFD signifie que l\'AFN, après avoir lu une certaine partie du mot, pourrait se trouver dans n\'importe lequel des états q1​,\...,qk​. L\'état initial de l\'AFD est l\'ensemble des états de l\'AFN atteignables depuis les états initiaux par des ε-transitions (la **ε-clôture**). Les états finaux de l\'AFD sont tous les ensembles d\'états qui contiennent au moins un état final de l\'AFN.

Puisque l\'ensemble des états de l\'AFN est fini (Q), le nombre de sous-ensembles possibles est également fini (2∣Q∣), bien que potentiellement beaucoup plus grand. L\'AFD simule donc l\'exploration parallèle de tous les chemins de l\'AFN en maintenant à chaque étape l\'ensemble des \"fronts d\'onde\" du calcul. Cette simulation prouve que la puissance de reconnaissance est identique.

Enfin, pour un langage régulier donné, il existe un AFD unique ayant un nombre minimal d\'états. Cet automate minimal peut être obtenu à partir de n\'importe quel AFD reconnaissant le langage en fusionnant les états \"indiscernables\" (qui se comportent de la même manière pour le reste de n\'importe quel mot).

### 4.2.4 Expressions Régulières : Un Formalisme Déclaratif

Les expressions régulières (ER), ou expressions rationnelles, offrent une manière algébrique et déclarative de décrire les langages réguliers. Elles sont à la base des outils de recherche de motifs (comme grep).

Une expression régulière sur un alphabet Σ est définie inductivement  :

- **Cas de base** : ∅ (dénote le langage vide), ε (dénote le langage {ε}), et a pour tout a∈Σ (dénote le langage {a}) sont des expressions régulières.

- **Cas inductifs** : Si R et S sont des expressions régulières, alors :

  - (R∣S) ou (R+S) (l\'**union**) est une ER dénotant L(R)∪L(S).

  - (RS) (la **concaténation**) est une ER dénotant L(R)L(S).

  - (R∗) (l\'**étoile de Kleene**) est une ER dénotant L(R)∗.

### 4.2.5 Le Théorème de Kleene : L\'Unification des Langages Réguliers

Le **théorème de Kleene** est un résultat majeur qui établit l\'unité de la classe des langages réguliers. Il affirme qu\'un langage est régulier (reconnaissable par un automate fini) si et seulement s\'il peut être décrit par une expression régulière.

La preuve est constructive et fournit des algorithmes pour passer d\'une représentation à l\'autre :

1.  **ER → AFN (Algorithme de Thompson)** : Cet algorithme construit un AFN avec ε-transitions à partir d\'une ER, en suivant la structure inductive de l\'expression. Il existe des constructions simples pour les cas de base (∅,ε,a) et pour combiner des automates existants pour les opérations d\'union, de concaténation et d\'étoile.

2.  **AF → ER (Méthode d\'élimination d\'états)** : Cet algorithme transforme un automate en une expression régulière en éliminant progressivement ses états. À chaque élimination, les transitions sont ré-étiquetées avec des expressions régulières qui décrivent les chemins qui passaient par l\'état supprimé. Le processus se termine lorsqu\'il ne reste que les états initial et final, reliés par une transition dont l\'étiquette est l\'ER recherchée.

### 4.2.6 Grammaires Régulières

Les grammaires de Type-3, dites **régulières**, sont les grammaires les plus restrictives de la hiérarchie. Leurs règles de production doivent être de la forme A→aB ou A→a (grammaire **linéaire à droite**), ou bien de la forme A→Ba ou A→a (grammaire **linéaire à gauche**). Il est crucial de ne pas mélanger les deux formes dans une même grammaire.

Il existe une équivalence directe entre ces grammaires et les automates finis : les langages qu\'elles engendrent sont précisément les langages réguliers. On peut construire un AFN à partir d\'une grammaire régulière (les non-terminaux deviennent des états) et inversement (les états deviennent des non-terminaux).

### 4.2.7 Propriétés des Langages Réguliers

- **Propriétés de fermeture** : La classe des langages réguliers est fermée pour un grand nombre d\'opérations : union, concaténation, étoile (par définition), mais aussi **intersection**, **complémentation** et **image miroir**. La fermeture par intersection et complémentation se démontre élégamment en utilisant les AFD (pour le complément, il suffit d\'inverser les états finaux et non-finaux d\'un AFD complet ; pour l\'intersection, on utilise une construction appelée produit d\'automates).

- **Le Lemme de l\'Étoile (Pumping Lemma)** : C\'est un outil puissant pour prouver qu\'un langage n\'est *pas* régulier. Il formalise la limitation fondamentale des automates finis : leur mémoire finie.\
  **Théorème** : Pour tout langage régulier L, il existe une constante p≥1 (la longueur de pompage) telle que tout mot w∈L de longueur ∣w∣≥p peut être décomposé en trois parties, w=xyz, satisfaisant les conditions suivantes :

  1.  ∣y∣\>0 (la partie à \"pomper\" n\'est pas vide).

  2.  ∣xy∣≤p (la boucle apparaît au début du mot).

  3.  Pour tout entier i≥0, le mot xyiz est aussi dans L.\
      \

La preuve de ce lemme repose sur le **principe des tiroirs** : si un AFD à p états lit un mot de longueur p ou plus, il doit nécessairement visiter au moins un état deux fois. Le chemin entre les deux occurrences de cet état forme une boucle, dont l\'étiquette est le mot y. Cette boucle peut alors être parcourue zéro fois (i=0), une fois (i=1), ou plusieurs fois, générant une famille infinie de mots qui doivent tous être dans le langage. Le lemme capture donc l\'idée que la mémoire finie de l\'automate l\'empêche de \"compter\" au-delà dep.Pour montrer qu\'un langage n\'est pas régulier, on suppose par l\'absurde qu\'il l\'est, on applique le lemme, et on montre qu\'en \"pompant\" un mot bien choisi, on génère un mot qui n\'est pas dans le langage, ce qui est une contradiction. L\'exemple canonique est de prouver que L={anbn∣n≥0} n\'est pas régulier.

### 4.2.8 Applications Pratiques

Les langages réguliers et leurs formalismes sont fondamentaux dans de nombreux domaines pratiques :

- **Analyse lexicale** : La première étape d\'un compilateur, la \"tokenization\", consiste à découper le code source en unités lexicales (identifiants, mots-clés, opérateurs) à l\'aide d\'expressions régulières.

- **Recherche de motifs** : Les outils comme grep et les fonctions de recherche dans les éditeurs de texte utilisent des moteurs d\'expressions régulières pour localiser des motifs dans de grands volumes de texte.

- **Validation de données** : Vérification que des entrées utilisateur respectent un format précis (adresses e-mail, numéros de téléphone, URLs).

## 4.3 Type-2 : Langages Hors-Contexte et Automates à Pile

Les langages réguliers, malgré leur utilité, ne peuvent pas modéliser des structures imbriquées ou récursives, comme les paires de parenthèses bien formées ou la structure des blocs dans les langages de programmation. Pour cela, il faut monter d\'un cran dans la hiérarchie de Chomsky vers les langages de Type-2.

### 4.3.1 Au-delà de la Régularité : Introduction aux Grammaires Hors-Contexte

La limitation des langages réguliers est illustrée par le langage L={anbn∣n≥0}, qui n\'est pas régulier car un automate fini ne peut pas \"se souvenir\" du nombre de a lus pour le comparer au nombre de b. Les grammaires hors-contexte (GHC), aussi appelées grammaires algébriques, surmontent cette limitation.

Une grammaire est dite **hors-contexte** (ou de Type-2) si toutes ses règles de production sont de la forme A→w, où A est un unique symbole non terminal et w est une chaîne quelconque de terminaux et/ou de non-terminaux (w∈(V∪T)∗). Le terme \"hors-contexte\" signifie que la règle de remplacement pour

A peut être appliquée indépendamment des symboles qui l\'entourent (son contexte).

Par exemple, la grammaire G=({S},{a,b},{S→aSb,S→ε},S) est hors-contexte et engendre précisément le langage {anbn∣n≥0}.

### 4.3.2 Arbres de Dérivation et le Problème de l\'Ambiguïté

Une dérivation dans une GHC peut être représentée visuellement par un **arbre de dérivation** (ou arbre d\'analyse syntaxique), dont les nœuds internes sont des non-terminaux, les feuilles sont des terminaux, et la descendance d\'un nœud correspond à l\'application d\'une règle de production. Cet arbre révèle la structure syntaxique sous-jacente du mot engendré.

Une grammaire est dite **ambiguë** si au moins un mot de son langage peut être engendré par plusieurs arbres de dérivation distincts. L\'ambiguïté est un problème majeur en compilation, car elle implique qu\'un même programme pourrait avoir plusieurs interprétations sémantiques. Des exemples classiques incluent les grammaires pour les expressions arithmétiques (l\'expression

3+4\*5 peut être interprétée comme (3+4)\*5 ou 3+(4\*5))  et le problème du \"dangling else\" dans les instructions conditionnelles.

Certains langages, dits **inhéremment ambigus**, ne peuvent être décrits par aucune grammaire non ambiguë. C\'est le cas, par exemple, du langage {aibjck∣i=j ou j=k}.

### 4.3.3 Simplification et Formes Normales : La Forme Normale de Chomsky (FNC)

Pour faciliter l\'analyse algorithmique des GHC, il est souvent utile de les convertir en une forme standardisée. La **Forme Normale de Chomsky (FNC)** est l\'une des plus importantes. Une grammaire est en FNC si toutes ses règles sont de l\'une des deux formes suivantes :

- A→BC (un non-terminal se réécrit en deux non-terminaux)

- A→a (un non-terminal se réécrit en un terminal)\
  où A,B,C sont des non-terminaux et a est un terminal.14 La règle\
  S→ε est autorisée si l\'axiome S n\'apparaît jamais en partie droite d\'une règle.

Il est prouvé que tout langage hors-contexte ne contenant pas le mot vide peut être engendré par une grammaire en FNC. Un algorithme systématique permet de convertir n\'importe quelle GHC en FNC en éliminant d\'abord les ε-productions et les règles unitaires (A→B), puis en restructurant les règles restantes.

### 4.3.4 Le Modèle de l\'Automate à Pile (AP) : Une Mémoire LIFO

L\'automate capable de reconnaître les langages hors-contexte est l\'**automate à pile** (AP). Il s\'agit d\'un automate fini non-déterministe auquel on a ajouté une mémoire auxiliaire : une **pile**, qui fonctionne selon le principe LIFO (Last-In, First-Out).

Un automate à pile est formellement un 7-uplet A=(Q,Σ,Γ,δ,q0​,Z0​,F)  :

- Q,Σ,q0​,F sont définis comme pour un AFN.

- Γ est l\'**alphabet de pile**, l\'ensemble des symboles pouvant être stockés dans la pile.

- Z0​∈Γ est le **symbole initial de pile**.

- δ:Q×(Σ∪{ε})×Γ→P(Q×Γ∗) est la fonction de transition. Une transition dépend non seulement de l\'état courant et du symbole d\'entrée, mais aussi du symbole au sommet de la pile. L\'action consiste à changer d\'état et à remplacer le symbole au sommet de la pile par une chaîne de symboles de pile (empiler, dépiler ou laisser inchangé).

La pile est la matérialisation de la capacité récursive des GHC. Pour reconnaître {anbn}, l\'automate peut empiler un symbole pour chaque a lu, puis dépiler un symbole pour chaque b lu. La pile sert de compteur non borné, ce qui était impossible pour un automate fini.

### 4.3.5 Équivalence des Grammaires Hors-Contexte et des Automates à Pile

Un théorème fondamental établit que les GHC et les AP ont la même puissance expressive : un langage est hors-contexte si et seulement s\'il est reconnu par un automate à pile.

- **GHC → AP** : On peut construire un AP qui simule une dérivation (gauche, par exemple) d\'une grammaire. L\'automate utilise sa pile pour mémoriser la séquence de terminaux et de non-terminaux à engendrer. Si le sommet de la pile est un non-terminal, l\'automate choisit (de manière non déterministe) une règle pour le remplacer. Si c\'est un terminal, il le compare avec le symbole d\'entrée courant.

- **AP → GHC** : La construction inverse est plus complexe. L\'idée est de créer des non-terminaux de la forme \[p,X,q\] qui représentent la capacité de l\'automate à passer de l\'état p à l\'état q en consommant une partie de l\'entrée et en dépilant le symbole X. Les règles de la grammaire simulent alors les transitions de l\'automate.

### 4.3.6 Le Déterminisme dans les Automates à Pile et ses Limites

Un automate à pile est **déterministe** (APD) si, pour toute configuration (état, symbole d\'entrée, symbole de pile), il existe au plus une transition possible.

Ici, une différence fondamentale apparaît avec les automates finis : les automates à pile déterministes sont **strictement moins puissants** que leurs homologues non déterministes. Le non-déterminisme devient une source de puissance expressive. Par exemple, le langage des palindromes sur

{a,b} n\'est pas reconnaissable par un APD. L\'automate doit \"deviner\" où se trouve le milieu du mot pour inverser son comportement (passer de l\'empilement au dépilement). Un APN peut faire cette \"divination\" en explorant les deux possibilités (continuer à empiler ou commencer à dépiler) via une ε-transition. Un APD, ne pouvant faire de choix, est incapable de reconnaître ce langage.

### 4.3.7 Propriétés des Langages Hors-Contexte

- **Propriétés de fermeture** : Les langages hors-contexte sont fermés par union, concaténation et étoile de Kleene. Cependant, ils ne sont **pas fermés par intersection ni par complémentation**.

- **Lemme d\'itération pour les langages hors-contexte** (parfois appelé lemme de Bar-Hillel, Perles et Shamir, ou lemme d\'Ogden) : C\'est une généralisation du lemme de l\'étoile. Il stipule que pour tout mot suffisamment long w d\'un langage hors-contexte, on peut le décomposer en w=uvxyz de telle sorte que les deux sous-chaînes v et y (non toutes deux vides) peuvent être \"pompées\" simultanément : uvixyiz appartient au langage pour tout i≥0. Ce lemme est utilisé pour prouver que des langages comme\
  {anbncn∣n≥0} ne sont pas hors-contexte.

### 4.3.8 Applications Pratiques

- **Analyse syntaxique (Parsing)** : Les GHC sont le fondement de l\'analyse syntaxique dans les compilateurs. Un analyseur syntaxique (parser) prend une séquence de tokens (produite par l\'analyseur lexical) et tente de construire un arbre de dérivation selon les règles de la grammaire du langage de programmation.

- **Définition de formats structurés** : Des formats comme XML ou JSON peuvent être décrits par des grammaires hors-contexte.

- **Linguistique computationnelle** : Modélisation de la structure syntaxique des langues naturelles.

## 4.4 Type-1 : Langages Contextuels et Automates Linéairement Bornés

Les langages de Type-1, ou contextuels, ajoutent une couche de complexité par rapport aux langages hors-contexte. Ils permettent de modéliser des dépendances qui ne sont pas purement imbriquées, comme celles requises par le langage de référence {anbncn∣n≥1}, qui n\'est pas hors-contexte.

### 4.4.1 La Notion de Contexte : Grammaires Contextuelles et Croissantes

Une grammaire est dite **contextuelle** (ou sensible au contexte, Type-1) si ses règles de production sont de la forme αAβ→αγβ, où A est un non-terminal, α et β sont des chaînes quelconques (le \"contexte\"), et γ est une chaîne non vide. Cette forme stipule que

A ne peut être remplacé par γ que s\'il est entouré par α et β.

Une définition équivalente et plus simple à manipuler est celle de **grammaire croissante** (ou non contractante). Dans une telle grammaire, pour chaque règle u→v, la longueur de la partie gauche est inférieure ou égale à celle de la partie droite : ∣u∣≤∣v∣. Ces grammaires engendrent la même classe de langages que les grammaires contextuelles (à l\'exception possible du mot vide).

### 4.4.2 Le Modèle de l\'Automate Linéairement Borné (ALB)

L\'automate correspondant aux langages contextuels est l\'**automate linéairement borné** (ALB, ou LBA en anglais). Il s\'agit d\'une machine de Turing non déterministe dont la capacité de mémoire est restreinte : la tête de lecture/écriture ne peut pas se déplacer au-delà des cases du ruban qui contenaient initialement le mot d\'entrée. La mémoire de travail est donc bornée par une fonction linéaire de la taille de l\'entrée.

### 4.4.3 Équivalence des Grammaires Contextuelles et des ALB

Le **théorème de Kuroda (1964)** établit l\'équivalence entre ces deux formalismes : un langage est contextuel si et seulement s\'il est reconnu par un ALB.

- **GCS → ALB** : La preuve de cette direction est intuitive. Pour vérifier si un mot w appartient à L(G), un ALB peut simuler la dérivation à l\'envers, en partant de w et en essayant de le réduire à l\'axiome S. Comme les règles de la grammaire sont non contractantes, chaque étape de cette réduction inverse ne peut pas allonger la chaîne. Par conséquent, tout le processus de calcul peut s\'effectuer dans l\'espace initialement occupé par w.

- **ALB → GCS** : La construction inverse est plus technique. Elle consiste à construire une grammaire dont les règles simulent les transitions de l\'ALB. Les non-terminaux encodent les configurations complètes de l\'ALB (état, position de la tête, contenu du ruban).

### 4.4.4 Propriétés et Complexité de la Reconnaissance

La contrainte de non-contraction a une conséquence majeure : elle rend le problème de l\'appartenance décidable. Pour un mot w donné, une dérivation ne peut pas passer par des chaînes intermédiaires de longueur infinie. Le nombre de chaînes de longueur au plus ∣w∣ est fini. On peut donc, en théorie, énumérer toutes les dérivations possibles sans entrer dans une boucle infinie de chaînes de plus en plus courtes, ce qui garantit la terminaison de l\'algorithme de reconnaissance.

Cette décidabilité est la conséquence directe de la borne sur la mémoire de l\'automate. Un ALB travaillant sur un mot de longueur n possède un nombre de configurations total qui, bien qu\'exponentiel en n (∣Q∣×n×∣Γ∣n), est fini. Un calcul qui dure plus longtemps que ce nombre doit nécessairement répéter une configuration, entrant dans une boucle détectable. C\'est la suppression de cette borne qui mène à l\'indécidabilité pour les machines de Turing.

Cependant, \"décidable\" ne signifie pas \"efficace\". Le problème de l\'appartenance pour les langages contextuels est **PSPACE-complet**, ce qui le place parmi les problèmes considérés comme très difficiles et intraitables en pratique. De plus, contrairement au problème de l\'appartenance, le

**problème du vide** (savoir si L(G) est vide) est indécidable pour les grammaires contextuelles.

Une question longtemps ouverte était de savoir si les langages contextuels étaient fermés par complémentation. La réponse est affirmative, un résultat profond connu sous le nom de **théorème d\'Immerman-Szelepcsényi** (1987). Une autre question majeure reste ouverte : les ALB déterministes sont-ils aussi puissants que les non-déterministes? En termes de classes de complexité, cela revient à se demander si NSPACE(O(n)) = DSPACE(O(n)).

## 4.5 Type-0 : Langages Récursivement Énumérables et la Machine de Turing

Au sommet de la hiérarchie se trouvent les grammaires de Type-0 et leur automate équivalent, la machine de Turing. Cette classe représente la limite de ce qui peut être décrit par un formalisme de réécriture et de ce qui peut être calculé par un algorithme.

### 4.5.1 Grammaires Générales : Le Pouvoir de Réécriture Illimité

Les grammaires de Type-0, aussi appelées **non contraintes** ou **générales**, sont les plus permissives. Leurs règles de production sont de la forme u→v, avec pour seule contrainte que u ne soit pas le mot vide et contienne au moins un non-terminal. La possibilité d\'avoir des règles \"raccourcissantes\" (

∣u∣\>∣v∣) est ce qui leur confère leur pleine puissance et est la source de l\'indécidabilité des problèmes les concernant.

### 4.5.2 La Machine de Turing : Le Modèle Universel de Calcul

La **machine de Turing (MT)** est le modèle d\'automate équivalent aux grammaires de Type-0. Conçue par Alan Turing, elle est constituée d\'un automate fini (l\'unité de contrôle) et d\'un

**ruban infini** qui sert à la fois d\'entrée, de sortie et de mémoire de travail. À chaque étape, en fonction de son état et du symbole lu sur le ruban, la machine peut changer d\'état, écrire un nouveau symbole sur le ruban et déplacer sa tête de lecture/écriture d\'une case vers la gauche ou la droite.

Le passage de l\'ALB à la MT consiste à lever la restriction sur la mémoire. Ce simple changement fait passer d\'une machine puissante mais décidable à un modèle de calcul universel, capable de simuler n\'importe quel autre processus algorithmique, y compris d\'autres machines de Turing (via le concept de machine de Turing universelle).

Les langages reconnus par les machines de Turing sont appelés **langages récursivement énumérables**.

### 4.5.3 La Thèse de Church-Turing

La machine de Turing n\'est pas juste un modèle parmi d\'autres. La **thèse de Church-Turing** (une thèse et non un théorème, car elle relie un concept formel à une notion intuitive) postule que toute fonction calculable par un algorithme peut être calculée par une machine de Turing. Autrement dit, la MT capture formellement la notion même de \"calculabilité effective\".

### 4.5.4 Les Limites du Calcul : Décidabilité et le Problème de l\'Arrêt

La puissance universelle de la machine de Turing a un prix : l\'existence de problèmes fondamentalement insolubles par un algorithme.

- **Langages récursifs vs. récursivement énumérables** :

  - Un langage est **récursivement énumérable** si une MT existe qui s\'arrête et accepte tout mot du langage. Si un mot n\'est pas dans le langage, la machine peut soit s\'arrêter et le rejeter, soit boucler indéfiniment. On parle de **semi-décideur**.

  - Un langage est **récursif** (ou décidable) si une MT existe qui s\'arrête *pour toute entrée*, en acceptant ou en rejetant le mot. On parle de **décideur**. La classe des langages récursifs est un sous-ensemble strict de celle des langages récursivement énumérables.

- **Le problème de l\'arrêt** : C\'est le problème indécidable le plus célèbre. Il n\'existe aucun algorithme (aucune MT) capable de déterminer, pour une MT M et une entrée w arbitraires, si le calcul de M sur w finira par s\'arrêter. Le langage correspondant à ce problème est récursivement énumérable (on peut simuler M sur w et s\'arrêter si la simulation s\'arrête), mais il n\'est pas récursif.

- **Théorème de Rice** : Ce théorème généralise l\'indécidabilité du problème de l\'arrêt. Il affirme que toute propriété *non triviale* (c\'est-à-dire qui n\'est pas vraie pour tous les langages RE ou pour aucun) des langages récursivement énumérables est indécidable. Par exemple, il est indécidable de savoir si le langage reconnu par une MT est vide, fini, régulier, ou contextuel.

## 4.6 Synthèse : La Hiérarchie en Perspective

### 4.6.1 Récapitulatif des Classes de Langages et de leurs Propriétés

La hiérarchie de Chomsky offre une vision structurée et profonde de la relation entre la description des langages et la complexité de leur reconnaissance. Chaque niveau, du Type-3 au Type-0, représente une classe de langages aux propriétés bien définies, caractérisée par une forme de grammaire et un modèle d\'automate équivalent. Les inclusions entre ces classes sont strictes, signifiant qu\'à chaque niveau, on gagne en puissance expressive, capable de décrire des structures linguistiques que le niveau inférieur ne pouvait pas capturer.

### 4.6.2 L\'Interaction entre Expressivité, Puissance de Reconnaissance et Décidabilité

Le fil conducteur de ce chapitre a été le compromis fondamental entre la capacité d\'un formalisme à décrire des motifs complexes et la possibilité de répondre algorithmiquement à des questions simples à son sujet.

- Les **langages réguliers (Type-3)**, avec leur mémoire finie, sont simples, efficaces à analyser et leurs propriétés sont toutes décidables.

- Les **langages hors-contexte (Type-2)**, en ajoutant une pile (mémoire LIFO), permettent de modéliser la récursivité et les structures imbriquées, au prix d\'une complexité d\'analyse plus élevée et de la perte de certaines propriétés de fermeture.

- Les **langages contextuels (Type-1)**, avec une mémoire linéairement bornée, capturent des dépendances croisées plus complexes tout en conservant la décidabilité du problème de l\'appartenance, bien que ce dernier devienne intraitable en pratique.

- Les **langages récursivement énumérables (Type-0)**, avec une mémoire infinie, atteignent la limite de la calculabilité, capables de décrire tout ce qu\'un algorithme peut générer, mais au détriment de la décidabilité de la plupart des problèmes, y compris le plus fondamental : celui de l\'arrêt.

### 4.6.3 L\'Héritage de la Hiérarchie de Chomsky en Informatique Fondamentale et Appliquée

Loin d\'être une simple curiosité théorique, la hiérarchie de Chomsky est un cadre conceptuel qui a profondément influencé l\'informatique.

- Elle fournit les fondements théoriques de la **théorie de la compilation**, où l\'analyse lexicale est basée sur les automates finis (Type-3) et l\'analyse syntaxique sur les automates à pile et les grammaires hors-contexte (Type-2).

- Elle a guidé la **conception des langages de programmation**, en définissant ce qui peut être analysé efficacement.

- Elle établit un lien direct avec la **théorie de la complexité**, où les classes de complexité basées sur les ressources (temps, espace) trouvent des équivalents dans les modèles d\'automates (par exemple, les langages contextuels correspondent à la classe d\'espace non déterministe NSPACE(O(n))).

- Ses concepts ont été adaptés à de nombreux autres domaines, de la **linguistique computationnelle** à la **bio-informatique**, pour modéliser et analyser des séquences et des structures complexes.

En somme, la hiérarchie de Chomsky n\'est pas seulement une classification des langages, mais une carte des frontières de la computation elle-même, délimitant ce qui est simple, ce qui est complexe, ce qui est calculable, et ce qui est hors de portée de tout algorithme.

