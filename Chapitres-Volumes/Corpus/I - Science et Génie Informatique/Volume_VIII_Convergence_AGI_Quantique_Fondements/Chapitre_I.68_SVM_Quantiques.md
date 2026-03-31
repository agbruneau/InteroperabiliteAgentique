# Chapitre I.68 : Machines à Vecteurs de Support Quantiques pour les Tâches d'Intelligence Artificielle Polyvalentes

## 68.1 Introduction : Convergence de l\'Apprentissage Automatique et de l\'Informatique Quantique

L\'intersection de l\'apprentissage automatique et de l\'informatique quantique a donné naissance à un domaine de recherche interdisciplinaire d\'une immense promesse : l\'apprentissage automatique quantique (QML, de l\'anglais *Quantum Machine Learning*). Ce champ émergent explore comment les principes de la mécanique quantique, tels que la superposition et l\'intrication, peuvent être exploités pour concevoir des algorithmes d\'apprentissage potentiellement plus puissants que leurs homologues classiques. Inversement, il examine également comment les techniques d\'apprentissage automatique peuvent aider à caractériser et à contrôler des systèmes quantiques complexes. Au sein de ce vaste paysage, les machines à vecteurs de support quantiques (QSVM) se sont imposées comme l\'un des paradigmes les plus étudiés et les plus prometteurs, en particulier dans le contexte des ordinateurs quantiques bruités à échelle intermédiaire (NISQ, de l\'anglais *Noisy Intermediate-Scale Quantum*).

La motivation fondamentale derrière les QSVM réside dans une analogie conceptuelle profonde entre les machines à vecteurs de support (SVM) classiques et le calcul quantique. Les SVM classiques, en particulier lorsqu\'ils sont utilisés avec l\'astuce du noyau (*kernel trick*), opèrent en projetant implicitement les données dans un espace de caractéristiques de très grande dimension, où des relations non linéaires complexes peuvent être résolues par des séparateurs linéaires. De manière analogue, les ordinateurs quantiques effectuent des calculs dans un espace de Hilbert dont la dimension croît exponentiellement avec le nombre de bits quantiques (qubits). L\'hypothèse centrale du QML basé sur les noyaux est que cet espace de Hilbert peut servir d\'espace de caractéristiques ultime, permettant la découverte de motifs dans les données qui sont inaccessibles à toute méthode classique efficace. Ce chapitre se consacre à l\'exploration rigoureuse de cette hypothèse, en présentant la théorie, la conception et l\'application des QSVM comme des outils polyvalents pour des tâches d\'intelligence artificielle avancées.

Le développement des SVM classiques dans les années 1990 par Vladimir Vapnik et ses collaborateurs a constitué une révolution dans le domaine de l\'apprentissage supervisé. Fondés sur les principes rigoureux de la théorie de l\'apprentissage statistique (SLT, de l\'anglais *Statistical Learning Theory*), notamment le principe de minimisation du risque structurel et la dimension de Vapnik-Tchervonenkis (VC), les SVM ont offert une solution élégante et robuste aux problèmes de classification et de régression, particulièrement efficace en haute dimension et avec des ensembles de données de taille limitée. Leur succès repose sur la recherche d\'un hyperplan à marge maximale, une approche qui non seulement fournit d\'excellentes performances de généralisation, mais qui est également formulée comme un problème d\'optimisation convexe, garantissant ainsi l\'existence d\'une solution optimale unique. L\'introduction de l\'astuce du noyau a ensuite étendu leur applicabilité à des problèmes non linéaires complexes, consolidant leur statut d\'outil fondamental en apprentissage automatique.

La transition vers le domaine quantique a été initiée par les travaux de Rebentrost, Mohseni et Lloyd en 2014, qui ont proposé un algorithme QSVM promettant une accélération exponentielle par rapport aux méthodes classiques pour certaines tâches. L\'idée était d\'utiliser un ordinateur quantique pour calculer efficacement les entrées d\'une matrice de noyau, une tâche qui peut être computationnellement coûteuse classiquement, et de résoudre ensuite le problème d\'optimisation associé. Cette proposition a catalysé une intense activité de recherche, positionnant les QSVM comme un candidat de premier plan pour démontrer un avantage quantique pratique.

Ce chapitre a pour objectif de fournir une monographie technique complète sur les machines à vecteurs de support quantiques, destinée à un public d\'experts. Nous commencerons par une revue approfondie et mathématiquement rigoureuse des fondements des SVM classiques. Cette base est indispensable, car la structure des QSVM est une généralisation directe du formalisme dual classique. Nous établirons ensuite le pont conceptuel et mathématique vers le monde quantique, en montrant comment l\'espace de Hilbert d\'un système quantique peut être interprété comme un espace de caractéristiques. Nous détaillerons les mécanismes d\'encodage des données classiques dans des états quantiques et les algorithmes quantiques pour l\'estimation du noyau. Par la suite, nous aborderons la conception d\'architectures hybrides quantique-classique, une approche pragmatique pour l\'ère NISQ. Une analyse critique des défis actuels, notamment l\'impact du bruit matériel, la complexité de l\'estimation du noyau et le phénomène des plateaux stériles, sera menée pour offrir une perspective équilibrée sur le potentiel réel d\'avantage quantique. Enfin, nous explorerons la polyvalence des QSVM en les étendant à des tâches de régression et de détection d\'anomalies, et nous illustrerons leur applicabilité à travers des études de cas dans des domaines de pointe tels que la bio-informatique, la science des matériaux et la finance. Le chapitre se conclura par une synthèse des connaissances actuelles et une discussion sur les perspectives et les défis ouverts qui façonneront la prochaine génération d\'algorithmes d\'IA quantiques.

## 68.2 Fondements Mathématiques des Machines à Vecteurs de Support Classiques

Avant d\'explorer l\'univers quantique, une maîtrise approfondie des fondements mathématiques des machines à vecteurs de support classiques est impérative. Les QSVM ne sont pas une réinvention *ex nihilo*, mais plutôt une extension ingénieuse des principes établis par la théorie de l\'apprentissage statistique. Le formalisme quantique s\'appuie directement sur la formulation duale du problème d\'optimisation des SVM, et la notion de noyau quantique est une généralisation directe de l\'astuce du noyau classique. Cette section a donc pour but de construire, avec une rigueur mathématique, le socle théorique sur lequel repose l\'intégralité de ce chapitre.

### 68.2.1 Le Classifieur à Vaste Marge : Cas Linéairement Séparable (Marge Dure)

Le cas le plus simple et le plus fondamental pour comprendre l\'essence des SVM est celui où les données d\'entraînement sont linéairement séparables. Dans ce scénario, il existe au moins un hyperplan capable de séparer parfaitement les données appartenant à deux classes distinctes. L\'objectif des SVM est de sélectionner, parmi l\'infinité d\'hyperplans séparateurs possibles, celui qui est le plus \"optimal\".

#### Intuition Géométrique

L\'intuition géométrique derrière les SVM est à la fois simple et puissante. Plutôt que de choisir n\'importe quel hyperplan qui sépare les données, l\'algorithme recherche l\'hyperplan qui maximise la distance qui le sépare des points de données les plus proches de chaque classe. Cette distance est appelée la \"marge\". L\'hyperplan qui maximise cette marge est appelé l\'hyperplan à marge maximale ou optimale. Géométriquement, on peut visualiser cette marge comme une \"rue\" ou un \"canal\" entre les deux classes, et l\'objectif est de rendre cette rue la plus large possible.

Les points de données qui se trouvent exactement sur les bords de cette rue sont appelés les **vecteurs de support** (*support vectors*). Ces points sont les plus critiques de l\'ensemble de données, car ils sont les seuls à définir la position et l\'orientation de l\'hyperplan optimal. Si l\'un de ces vecteurs de support était déplacé ou supprimé, l\'hyperplan optimal changerait. En revanche, les points de données qui se trouvent loin de la marge n\'ont aucune influence sur la solution finale. Cette propriété de dépendre uniquement d\'un petit sous-ensemble de données est l\'une des caractéristiques les plus élégantes et efficaces des SVM.

#### Formalisation Mathématique

Considérons un ensemble de données d\'entraînement de n points, D={(xi,yi)}i=1n, où xi∈Rp est un vecteur de caractéristiques de dimension p et yi∈{−1,1} est l\'étiquette de classe correspondante. Un hyperplan dans l\'espace Rp peut être défini comme l\'ensemble des points x satisfaisant l\'équation : wTx+b=0, où w∈Rp est un vecteur normal (non nécessairement unitaire) à l\'hyperplan et b∈R est le terme de biais (bias), qui détermine le décalage de l\'hyperplan par rapport à l\'origine.14

La fonction de décision pour un nouveau point x est donnée par f(x)=sign(wTx+b). Pour que cet hyperplan sépare correctement les données, nous exigeons que wTxi+b\>0 pour les points de la classe yi=1 et wTxi+b\<0 pour les points de la classe yi=−1. Ces deux conditions peuvent être combinées en une seule inéquation : yi(wTxi+b)\>0,∀i=1,...,n. Le couple (w,b) n\'est pas unique ; si (w,b) définit un hyperplan, alors (kw,kb) pour tout scalaire k\>0 définit le même hyperplan. Nous pouvons utiliser cette liberté pour imposer une contrainte de normalisation. Pour les SVM, nous choisissons une normalisation canonique telle que les points les plus proches de l\'hyperplan (les futurs vecteurs de support) satisfont ∣wTxi+b∣=1. Cela nous amène à définir les deux hyperplans de marge :

- H1:wTx+b=1 (pour la classe positive)
- H−1:wTx+b=−1 (pour la classe négative)

La distance perpendiculaire entre un point x0 et l\'hyperplan wTx+b=0 est donnée par ∥w∥∣wTx0+b∣. Par conséquent, la distance entre l\'hyperplan de décision et chacun des hyperplans de marge est ∥w∥1. La marge géométrique totale, qui est la distance entre H1 et H−1, est donc ∥w∥2.

Maximiser cette marge est équivalent à minimiser ∥w∥, ou de manière plus pratique pour l\'optimisation, minimiser 21∥w∥2. Le problème de trouver l\'hyperplan à marge maximale peut donc être formulé comme le problème d\'optimisation suivant, connu sous le nom de formulation primale à marge dure : w,bmin21∥w∥2, sous les contraintes : yi(wTxi+b)≥1,∀i=1,...,n. Ce problème est un problème de programmation quadratique (QP), car la fonction objectif est quadratique en w et les contraintes sont linéaires en w et b. De plus, la fonction objectif est strictement convexe, et l\'ensemble des contraintes définit une région réalisable convexe. Pour des données linéairement séparables, cette région est non vide. Par conséquent, ce problème d\'optimisation admet une solution globale unique, ce qui est un avantage majeur par rapport à d\'autres algorithmes comme les réseaux de neurones qui peuvent être sujets à des minima locaux.14

### 68.2.2 Le Cas Non Séparable : Marge Souple, Variables d\'Ajustement et Régularisation

Le modèle à marge dure est une idéalisation. Dans la plupart des applications pratiques, les ensembles de données ne sont pas parfaitement séparables linéairement. Cela peut être dû à la nature intrinsèque des données (chevauchement des classes) ou à la présence de bruit et de valeurs aberrantes (*outliers*). Dans de tels cas, le problème d\'optimisation à marge dure n\'a pas de solution réalisable, car il est impossible de satisfaire toutes les contraintes

yi(wTxi+b)≥1.

Pour surmonter cette limitation, le concept de **marge souple** (*soft margin*) a été introduit. L\'idée est d\'autoriser certaines violations des contraintes de marge, c\'est-à-dire de permettre à certains points de données de se trouver à l\'intérieur de la marge ou même du mauvais côté de l\'hyperplan de décision, mais en pénalisant ces violations.

#### Introduction des Variables d\'Ajustement (**Slack Variables**)

Pour permettre des violations de marge, nous introduisons des **variables d\'ajustement** (ou variables d\'écart) non négatives, ξi≥0, pour chaque point de données xi. Ces variables mesurent le degré de violation de la marge pour chaque point. Les contraintes de classification sont alors relâchées comme suit :

yi(wTxi+b)≥1−ξi,∀i=1,...,n

- Si ξi=0, le point xi est correctement classé et se trouve sur ou à l\'extérieur de la marge, comme dans le cas de la marge dure.
- Si 0\<ξi≤1, le point xi est correctement classé mais se trouve à l\'intérieur de la marge.
- Si ξi\>1, le point xi est mal classé.

#### Fonction de Perte Charnière et Régularisation

L\'objectif est maintenant double : maximiser la marge (minimiser ∥w∥2) et minimiser le nombre et l\'ampleur des violations de marge. Nous ajoutons donc un terme de pénalité à la fonction objectif qui est proportionnel à la somme des variables d\'ajustement. La somme ∑i=1nξi sert de borne supérieure sur le nombre d\'erreurs d\'entraînement. En fait, la variable ξi peut être exprimée en utilisant la fonction de perte charnière (hinge loss) : ξi=max(0,1−yi(wTxi+b)).

Cette fonction de perte est nulle pour les points correctement classés en dehors de la marge et augmente linéairement pour les points qui violent la marge.18

Pour équilibrer les deux objectifs (maximisation de la marge et minimisation de l\'erreur), nous introduisons un hyperparamètre de régularisation C\>0. Ce paramètre contrôle le compromis entre la complexité du modèle (liée à la largeur de la marge) et l\'erreur d\'entraînement.

- Un **grand C** impose une forte pénalité aux violations de marge. L\'optimiseur s\'efforcera de minimiser le nombre d\'erreurs, ce qui peut conduire à un hyperplan avec une marge plus étroite et un risque de surajustement (*overfitting*) aux données d\'entraînement.
- Un **petit C** impose une pénalité plus faible. L\'optimiseur tolérera davantage d\'erreurs de classification afin d\'obtenir une marge plus large. Cela favorise un modèle plus simple et peut conduire à une meilleure généralisation sur des données non vues.

Le problème d\'optimisation pour la SVM à marge souple est donc formulé comme suit : w,b,ξmin21∥w∥2+Ci=1∑nξi sous les contraintes : yi(wTxi+b)≥1−ξi,etξi≥0,∀i=1,...,n. Cette formulation est également un problème de programmation quadratique convexe et possède donc une solution globale unique.16 Elle représente la forme la plus couramment utilisée des SVM linéaires.

### 68.2.3 Formulation Duale et Optimisation Convexe : Le Rôle des Conditions KKT

Bien que la formulation primale des SVM soit intuitive, sa résolution directe peut être complexe, en particulier lorsque le nombre de caractéristiques p est grand. De plus, la formulation primale ne permet pas d\'utiliser l\'astuce du noyau. Pour ces raisons, on résout généralement le problème dual, qui est souvent plus facile à optimiser et qui révèle des propriétés structurelles profondes du modèle. La transition du problème primal au problème dual se fait via la théorie de l\'optimisation lagrangienne et les conditions de Karush-Kuhn-Tucker (KKT).

#### Le Lagrangien et les Conditions d\'Optimalité

Pour résoudre le problème d\'optimisation avec contraintes d\'inégalité, nous construisons la fonction **Lagrangien** en introduisant des multiplicateurs de Lagrange non négatifs, αi≥0 et μi≥0, pour chaque contrainte. Pour le problème à marge souple, le Lagrangien est : \$\$ L(w, b, \\xi, \\alpha, \\mu) = \\frac{1}{2} \|w\|\^2 + C \\sum\_{i=1}\^n \\xi_i - \\sum\_{i=1}\^n \\alpha_i - \\sum\_{i=1}\^n \\mu_i \\xi_i \$\$. La solution du problème primal est un point selle du Lagrangien, c\'est-à-dire un point qui minimise L par rapport aux variables primales (w,b,ξ) et le maximise par rapport aux variables duales (α,μ).

Les **conditions de Karush-Kuhn-Tucker (KKT)** sont les conditions nécessaires (et suffisantes pour un problème convexe) pour qu\'un point soit une solution optimale. Elles sont les suivantes :

1. Stationnarité : Les dérivées partielles du Lagrangien par rapport aux variables primales doivent être nulles à l\'optimum.\$\$ \\frac{\\partial L}{\\partial w} = w - \\sum\_{i=1}\^n \\alpha_i y_i x_i = 0 \\implies w = \\sum\_{i=1}\^n \\alpha_i y_i x_i \$\$ \$\$ \\frac{\\partial L}{\\partial b} = -\\sum\_{i=1}\^n \\alpha_i y_i = 0 \\implies \\sum\_{i=1}\^n \\alpha_i y_i = 0 \$\$ \$\$ \\frac{\\partial L}{\\partial \\xi_i} = C - \\alpha_i - \\mu_i = 0 \\implies C = \\alpha_i + \\mu_i \$\$
2. Faisabilité primale : Les contraintes originales doivent être satisfaites.yi(wTxi+b)−1+ξi≥0ξi≥0
3. Faisabilité duale : Les multiplicateurs de Lagrange doivent être non négatifs.αi≥0μi≥0
4. Complémentarité (Complementary Slackness) : Le produit de chaque multiplicateur de Lagrange et de sa contrainte associée doit être nul.
   αi=0
   μiξi=0

#### Le Problème d\'Optimisation Dual

En substituant les conditions de stationnarité dans l\'expression du Lagrangien, nous pouvons éliminer les variables primales w,b,ξ pour obtenir le **problème dual**, qui ne dépend que des multiplicateurs αi. Le problème devient un problème de maximisation : \$\$ \\max\_{\\alpha} W(\\alpha) = \\sum\_{i=1}\^n \\alpha_i - \\frac{1}{2} \\sum\_{i=1}\^n \\sum\_{j=1}\^n \\alpha_i \\alpha_j y_i y_j (x_i\^T x_j) souslescontraintes: \\sum\_{i=1}\^n \\alpha_i y_i = 0 \$\$\$\$ 0 \\leq \\alpha_i \\leq C, \\quad \\forall i=1, \\dots, n\$\$. La contrainte αi≤C découle des conditions de stationnarité et de faisabilité duale : puisque μi≥0 et C=αi+μi, il s\'ensuit que αi≤C. Ce problème dual est également un problème de programmation quadratique convexe, souvent plus simple à résoudre que le primal, surtout si le nombre de points d\'entraînement n est inférieur au nombre de caractéristiques p.

#### La Sparsité de la Solution comme Conséquence des Conditions KKT

Les conditions KKT ne sont pas seulement un outil pour dériver le problème dual ; elles révèlent une propriété fondamentale des SVM : la **sparsité de la solution**. Cette propriété découle directement de la condition de complémentarité. Examinons les implications de ces conditions pour un point de données xi donné à la solution optimale :

- **Cas 1 : αi=0.** La condition C=αi+μi implique que μi=C\>0. La condition de complémentarité μiξi=0 implique alors que ξi=0. La contrainte primale yi(wTxi+b)≥1−ξi devient yi(wTxi+b)≥1. Ces points sont correctement classés et se trouvent à l\'extérieur ou sur la marge. Puisque leur αi est nul, ils ne participent pas à la construction du vecteur w=∑jαjyjxj.
- **Cas 2 : 0\<αi\<C.** La condition C=αi+μi implique que μi\>0. La condition de complémentarité μiξi=0 implique donc que ξi=0. Puisque αi\>0, la condition de complémentarité αi=0 implique que yi(wTxi+b)−1=0. Ces points se trouvent exactement sur la marge. Ce sont les **vecteurs de support** qui définissent la marge.
- **Cas 3 : αi=C.** La condition C=αi+μi implique que μi=0. La condition de complémentarité μiξi=0 est toujours satisfaite, et ξi peut être non nul. La condition de complémentarité αi=0 implique que yi(wTxi+b)=1−ξi. Ces points sont soit sur la marge (si ξi=0), soit à l\'intérieur de la marge ou mal classés (si ξi\>0). Ce sont également des vecteurs de support, souvent appelés **vecteurs de support bornés**.

La conséquence la plus importante est que le vecteur normal de l\'hyperplan, w=∑iαiyixi, est une combinaison linéaire uniquement des vecteurs de support (les points pour lesquels αi\>0). La grande majorité des points d\'entraînement, qui sont correctement classés et loin de la marge, auront des αi nuls et n\'auront aucune influence sur le modèle final. Cette **sparsité** rend les SVM particulièrement efficaces en termes de mémoire et de temps de calcul lors de la prédiction, car la fonction de décision f(x)=sign(∑i∈SVαiyi(xiTx)+b) ne nécessite que les vecteurs de support (SV).

### 68.2.4 L\'Astuce du Noyau : Extension aux Problèmes Non Linéaires et Espaces de Hilbert à Noyau Reproduisant (EHNR)

La véritable puissance des SVM réside dans leur capacité à gérer des problèmes de classification non linéaires avec une élégance remarquable. L\'approche ne consiste pas à abandonner le concept d\'hyperplan séparateur, mais plutôt à transformer l\'espace dans lequel cet hyperplan est recherché.

#### Motivation et Principe de l\'Astuce du Noyau

Pour de nombreux ensembles de données, une frontière de décision linéaire est insuffisante. L\'idée fondamentale est de projeter les données de l\'espace d\'entrée original Rp dans un espace de caractéristiques de plus grande dimension, potentiellement de dimension infinie, où les données deviennent linéairement séparables (ou presque). Soit Φ:Rp→F une carte de caractéristiques qui réalise cette transformation. Dans l\'espace de caractéristiques F, nous pouvons appliquer l\'algorithme SVM linéaire standard pour trouver un hyperplan séparateur. Le défi est que la dimension de F peut être très grande, rendant le calcul explicite de la transformation Φ(x) et des produits scalaires dans cet espace prohibitif. C\'est ici qu\'intervient l\'**astuce du noyau** (*kernel trick*). En examinant la formulation duale des SVM, on constate que les vecteurs de données xi n\'apparaissent que sous la forme de produits scalaires xiTxj. L\'astuce consiste à remplacer ce produit scalaire par une fonction noyau K(xi,xj) qui calcule directement le produit scalaire dans l\'espace de caractéristiques, sans jamais avoir à calculer explicitement les coordonnées des vecteurs transformés : K(xi,xj)=⟨Φ(xi),Φ(xj)⟩F=Φ(xi)TΦ(xj). Cette substitution permet de travailler implicitement dans un espace de caractéristiques de très grande dimension tout en effectuant tous les calculs dans l\'espace d\'entrée original, ce qui est beaucoup plus efficace.6

Le problème d\'optimisation dual avec noyau devient : \$\$ \\max\_{\\alpha} \\sum\_{i=1}\^n \\alpha_i - \\frac{1}{2} \\sum\_{i=1}\^n \\sum\_{j=1}\^n \\alpha_i \\alpha_j y_i y_j K(x_i, x_j) \$\$, sous les contraintes ∑iαiyi=0 et 0≤αi≤C. La fonction de décision pour un nouveau point x devient : f(x)=sign(i∈SV∑αiyiK(xi,x)+b).

#### Cadre Théorique : Théorème de Mercer et EHNR

La question cruciale est de savoir quelles fonctions peuvent être utilisées comme noyaux. Le **théorème de Mercer** fournit la condition nécessaire et suffisante. Une fonction K:Rp×Rp→R peut être un noyau si et seulement si elle est continue, symétrique (K(xi,xj)=K(xj,xi)), et si la matrice de Gram (ou matrice du noyau) G, avec les éléments Gij=K(xi,xj), est semi-définie positive pour tout ensemble de points {x1,...,xn}.

Le cadre mathématique formel pour les méthodes à noyau est celui des **Espaces de Hilbert à Noyau Reproduisant (EHNR)**. Un EHNR est un espace de Hilbert de fonctions H sur un ensemble X tel que, pour tout x∈X, la fonctionnelle d\'évaluation δx:f↦f(x) est un opérateur linéaire continu sur H. Le théorème de Riesz-Fréchet garantit alors l\'existence d\'un élément unique Kx∈H tel que f(x)=⟨f,Kx⟩H pour tout f∈H. La fonction K(x,z)=⟨Kz,Kx⟩H est appelée le noyau reproduisant de l\'espace. Le théorème de Moore-Aronszajn établit une correspondance bijective entre les fonctions de noyau (symétriques, définies positives) et les EHNR. Choisir un noyau revient donc à choisir un espace de fonctions dans lequel rechercher la solution.

#### Exemples de Noyaux Courants

Le choix du noyau est une étape cruciale dans l\'application des SVM, car il définit implicitement l\'espace de caractéristiques et donc la forme de la frontière de décision. Le tableau suivant résume les noyaux les plus couramment utilisés. Cette synthèse des outils fondamentaux qui permettent aux SVM de gérer la non-linéarité sert de pont conceptuel vers la section suivante, où le \"noyau quantique\" sera introduit comme une généralisation de ces concepts. En présentant les formules, les hyperparamètres et les cas d\'usage, ce tableau fournit un référentiel concis qui prépare le terrain pour comprendre pourquoi et comment on cherche à concevoir des noyaux via des circuits quantiques.

## 68.3 Théorie des Machines à Vecteurs de Support Quantiques

La transition des SVM classiques vers leurs homologues quantiques s\'opère en exploitant une analogie profonde et mathématiquement rigoureuse. L\'astuce du noyau, qui est au cœur de la puissance des SVM non linéaires, trouve un partenaire naturel dans la mécanique quantique. L\'espace d\'états d\'un système quantique, l\'espace de Hilbert, est intrinsèquement un espace de caractéristiques de très grande dimension. Cette section établit les fondements théoriques des QSVM, en montrant comment les principes du calcul quantique permettent de redéfinir la notion de carte de caractéristiques et de noyau.

### 68.3.1 L\'Espace de Hilbert Quantique comme Espace de Caractéristiques

Le principe fondamental qui sous-tend les QSVM est l\'interprétation de l\'espace de Hilbert d\'un système quantique comme un espace de caractéristiques pour un algorithme d\'apprentissage automatique. Un système de N qubits est décrit par des vecteurs d\'état dans un espace de Hilbert H de dimension 2N. Cette croissance exponentielle de la dimension avec le nombre de qubits est la source de la puissance potentielle du calcul quantique.

Dans le contexte des méthodes à noyau, cette propriété est particulièrement attrayante. Alors qu\'un SVM classique utilise une fonction noyau K(xi,xj) pour calculer implicitement des produits scalaires dans un espace de caractéristiques F de grande dimension, un QSVM propose d\'utiliser l\'espace de Hilbert H lui-même comme cet espace de caractéristiques. L\'idée est d\'encoder les données classiques dans des états quantiques, puis d\'utiliser les opérations quantiques pour analyser les relations entre ces données dans cet espace exponentiellement vaste.

Une **carte de caractéristiques quantique** (*quantum feature map*) est une procédure qui associe un vecteur de données classique x∈Rp à un état quantique ∣Φ(x)⟩ dans l\'espace de Hilbert H. Formellement, il s\'agit d\'une application Φ:x↦∣Φ(x)⟩. L\'état ∣Φ(x)⟩ est alors considéré comme le vecteur de caractéristiques de x.

L\'avantage potentiel de cette approche est que les phénomènes quantiques tels que la superposition et l\'intrication peuvent être utilisés pour créer des cartes de caractéristiques extrêmement complexes et non linéaires, qui pourraient être difficiles, voire impossibles, à simuler efficacement sur un ordinateur classique. Si une telle carte de caractéristiques permet une meilleure séparation des données pour un problème donné, le QSVM pourrait potentiellement surpasser son homologue classique.

### 68.3.2 Encodage des Données et Cartes de Caractéristiques Quantiques (***Quantum Feature Maps***)

L\'implémentation d\'une carte de caractéristiques quantique se fait via un circuit quantique. Un circuit unitaire UΦ(x), dont les portes sont paramétrées par les composantes du vecteur de données classique x, est appliqué à un état initial simple, généralement l\'état de base ∣0⟩⊗N (où N est le nombre de qubits). L\'état de caractéristiques résultant est alors : ∣Φ(x)⟩=UΦ(x)∣0⟩⊗N. Le choix de l\'architecture du circuit UΦ(x) est une étape de conception cruciale qui détermine entièrement les propriétés de la carte de caractéristiques et, par conséquent, les performances du QSVM. Plusieurs stratégies d\'encodage ont été développées, chacune présentant des compromis en termes de ressources requises (nombre de qubits, profondeur du circuit) et de puissance expressive.

Les stratégies d\'encodage les plus courantes sont les suivantes :

- **Encodage de Base (*Basis Encoding*) :** Cette méthode simple associe directement une chaîne de bits classique à un état de base computationnel. Par exemple, la chaîne de bits 101 est encodée dans l\'état de 3 qubits ∣101⟩. Cette méthode est efficace en termes de profondeur de circuit, mais elle n\'exploite ni la superposition ni l\'intrication, ce qui limite son expressivité.
- **Encodage d\'Amplitude (*Amplitude Encoding*) :** Cette technique très efficace en termes de qubits encode un vecteur de données normalisé de M=2N caractéristiques dans les amplitudes d\'un état de N qubits. Par exemple, un vecteur x∈RM avec ∥x∥=1 est encodé comme ∣Φ(x)⟩=∑i=0M−1xi∣i⟩. Bien qu\'elle permette une représentation très compacte des données, la préparation d\'un état arbitraire via l\'encodage d\'amplitude peut nécessiter un circuit de profondeur exponentielle, ce qui constitue un goulot d\'étranglement majeur.
- **Encodage Angulaire (*Angle Encoding*) :** Cette approche, bien adaptée aux dispositifs NISQ, encode les caractéristiques des données dans les paramètres de portes quantiques, généralement des rotations à un seul qubit. Par exemple, une caractéristique xi peut être encodée comme l\'angle de rotation d\'une porte RY(θi) ou RZ(θi), où θi est une fonction de xi. Pour encoder un vecteur x∈Rp, on utilise typiquement p qubits, chacun encodant une caractéristique. Des couches de portes intriquantes (comme des portes CNOT) sont souvent ajoutées entre les couches de rotations pour créer des corrélations complexes entre les caractéristiques encodées, augmentant ainsi l\'expressivité de la carte. Des bibliothèques comme Qiskit proposent des cartes de caractéristiques prédéfinies basées sur ce principe, telles que
  ZFeatureMap (rotations Z), ZZFeatureMap (rotations Z et portes ZZ intriquantes), et PauliFeatureMap (combinaisons plus générales de rotations de Pauli et d\'intrication).

Le tableau suivant synthétise les compromis entre ces différentes stratégies d\'encodage.

Le choix de la méthode d\'encodage est une décision de conception fondamentale. Il reflète un compromis entre l\'efficacité des ressources (nombre de qubits et profondeur du circuit, critiques pour les dispositifs NISQ) et la puissance de calcul (l\'expressivité de la carte de caractéristiques). Pour un expert, ce tableau résume les options et leurs implications directes sur la faisabilité et la performance potentielle d\'un modèle QSVM.

### 68.3.3 Définition et Estimation du Noyau Quantique

Une fois les données encodées dans l\'espace de Hilbert, le QSVM fonctionne de manière analogue à un SVM classique utilisant l\'astuce du noyau. La fonction noyau est simplement le produit scalaire entre les états quantiques de caractéristiques.

#### Définition Formelle

Le **noyau quantique** K(xi,xj) est une mesure de similarité entre deux points de données classiques xi et xj, définie par le produit scalaire de leurs états de caractéristiques quantiques correspondants, ∣Φ(xi)⟩ et ∣Φ(xj)⟩. La définition la plus courante est la fidélité de l\'état de transition, donnée par la magnitude au carré du produit scalaire  : K(xi,xj)=∣⟨Φ(xi)∣Φ(xj)⟩∣2. En utilisant la définition de l\'état de caractéristiques via le circuit d\'encodage, cela s\'écrit : K(xi,xj)=∣⟨0∣UΦ(xi)†UΦ(xj)∣0⟩∣2. Cette quantité est une valeur réelle comprise entre 0 (pour des états orthogonaux) et 1 (pour des états identiques). Elle remplace directement le noyau classique K(xi,xj) dans le problème d\'optimisation dual des SVM.

#### Algorithmes d\'Estimation

Contrairement à un noyau classique, le noyau quantique ne peut généralement pas être calculé analytiquement. Il doit être estimé en exécutant des circuits sur un ordinateur quantique et en effectuant des mesures statistiques. Deux méthodes principales sont utilisées à cette fin.

1. **Méthode de l\'Inversion du Circuit (*Inversion Test*) :** Cette méthode est la plus directe pour estimer la quantité ∣⟨0∣UΦ(xi)†UΦ(xj)∣0⟩∣2. Le circuit quantique est construit comme suit :

   - On part de l\'état initial ∣0⟩⊗N.
   - On applique le circuit d\'encodage pour xj, soit UΦ(xj).
   - On applique l\'inverse (l\'adjoint hermitien) du circuit d\'encodage pour xi, soit UΦ(xi)†.
   - On mesure tous les qubits dans la base computationnelle.
     La probabilité de mesurer l\'état tout-zéro, ∣0⟩⊗N, est exactement égale à la valeur du noyau K(xi,xj).60 En répétant cette procédure un grand nombre de fois (
     *shots*) et en comptant la fréquence de l\'issue ∣0⟩⊗N, on obtient une estimation statistique du noyau.
2. **Swap Test :** Cette méthode est plus générale et permet d\'estimer le produit scalaire entre deux états quantiques arbitraires ∣ψ⟩ et ∣ϕ⟩. Pour estimer K(xi,xj)=∣⟨Φ(xi)∣Φ(xj)⟩∣2, le circuit nécessite deux registres de N qubits pour préparer les états ∣Φ(xi)⟩ et ∣Φ(xj)⟩, ainsi qu\'un qubit auxiliaire (ancilla).

   - L\'ancilla est initialisée dans l\'état ∣0⟩ et mise en superposition avec une porte de Hadamard.
   - Une porte SWAP contrôlée par l\'ancilla est appliquée aux deux registres de données.
   - Une autre porte de Hadamard est appliquée à l\'ancilla.
   - On mesure l\'ancilla.
     La probabilité de mesurer l\'ancilla dans l\'état ∣0⟩ est donnée par P(∣0⟩)=21+21∣⟨Φ(xi)∣Φ(xj)⟩∣2. En estimant cette probabilité, on peut en déduire la valeur du noyau K(xi,xj).65 Bien que plus gourmande en ressources (elle nécessite
     2N+1 qubits), cette méthode est fondamentale en QML.

## 68.4 Conception et Implémentation des Algorithmes QSVM

La transition de la théorie des QSVM à leur implémentation pratique soulève une série de défis et de considérations de conception, particulièrement dans le contexte des dispositifs quantiques actuels, caractérisés par un nombre limité de qubits et des niveaux de bruit non négligeables. Cette section aborde l\'architecture des algorithmes QSVM, la conception des circuits d\'encodage, les stratégies pour atténuer l\'impact du bruit, et analyse la complexité et le potentiel d\'avantage quantique de ces modèles.

### 68.4.1 Architectures Hybrides Quantique-Classique pour les QSVM

Étant donné les limitations du matériel quantique de l\'ère NISQ, les implémentations de QSVM reposent quasi exclusivement sur des architectures hybrides quantique-classique. Dans ce paradigme, chaque composant (quantique et classique) est assigné à la tâche pour laquelle il est le plus performant.

Le flux de travail typique d\'un QSVM hybride se décompose comme suit :

1. **Pré-traitement des données (Classique) :** L\'ensemble de données classique est d\'abord préparé. Cette étape peut inclure la normalisation, la mise à l\'échelle des caractéristiques, ou la réduction de dimensionnalité (par exemple, via une analyse en composantes principales, ACP) pour adapter la taille des données au nombre de qubits disponibles.
2. **Estimation de la Matrice du Noyau (Quantique) :** C\'est le cœur de la contribution quantique. Pour chaque paire de points de données d\'entraînement (xi,xj), un ordinateur quantique exécute un circuit pour estimer la valeur du noyau Kij=K(xi,xj). Ce processus est répété pour toutes les paires, construisant ainsi la matrice de Gram de l\'ensemble d\'entraînement.
3. **Entraînement du Modèle SVM (Classique) :** La matrice du noyau, une fois entièrement calculée, est transmise à un ordinateur classique. Un solveur SVM classique est alors utilisé pour résoudre le problème d\'optimisation dual (un programme quadratique), ce qui permet de déterminer les multiplicateurs de Lagrange optimaux αi et le biais b.
4. **Prédiction sur de Nouvelles Données (Hybride) :** Pour classifier un nouveau point de données xnew, l\'ordinateur quantique est à nouveau sollicité pour calculer les valeurs du noyau entre xnew et chacun des vecteurs de support identifiés lors de la phase d\'entraînement, K(xnew,xi) pour i∈SV. Ensuite, un ordinateur classique utilise ces valeurs, les αi et le biais b pour calculer la fonction de décision et prédire l\'étiquette de xnew.

Une approche alternative est celle des **modèles variationnels (QV-SVM)**. Dans ce cas, le circuit de la carte de caractéristiques UΦ(x,θ) contient des paramètres entraînables θ. Une boucle d\'optimisation hybride est utilisée pour ajuster simultanément les paramètres du circuit θ et les poids du classifieur, afin d\'optimiser une fonction de coût globale. Cette approche offre plus de flexibilité mais sacrifie la garantie de convexité de l\'entraînement SVM standard.

### 68.4.2 Conception des Circuits d\'Encodage : Expressivité, Intrication et Profondeur

La performance d\'un QSVM dépend de manière critique de la qualité de sa carte de caractéristiques quantique, qui est entièrement déterminée par l\'architecture du circuit d\'encodage UΦ(x). Trois propriétés interdépendantes du circuit sont particulièrement importantes : son expressivité, sa capacité d\'intrication et sa profondeur.

L\'**expressivité** d\'un circuit paramétré fait référence à sa capacité à générer des états qui couvrent uniformément l\'espace de Hilbert. Une plus grande expressivité signifie que la carte de caractéristiques peut potentiellement capturer des relations plus complexes et non linéaires dans les données. Des circuits plus profonds et plus intriqués ont tendance à être plus expressifs. Cependant, une expressivité excessive peut être une épée à double tranchant, car elle peut rendre le modèle plus sujet au surajustement et, comme nous le verrons, conduire à des problèmes d\'entraînabilite.

L\'**intrication** est une ressource quantique clé qui permet de créer des corrélations non classiques entre les qubits. Dans le contexte des cartes de caractéristiques, les portes intriquantes (comme les CNOT ou les CZ) sont essentielles pour modéliser les dépendances et les interactions entre les différentes caractéristiques des données d\'entrée. Une carte de caractéristiques sans intrication (comme une simple superposition de rotations à un seul qubit) ne peut capturer que des relations additives et est donc limitée dans sa puissance. Des cartes comme la

ZZFeatureMap sont spécifiquement conçues pour introduire des termes d\'interaction de type Ising (ZiZj), ce qui est crucial pour de nombreux problèmes physiques et de reconnaissance de formes.

La **profondeur du circuit**, c\'est-à-dire le nombre de couches de portes séquentielles, est directement liée à la complexité de la carte de caractéristiques qui peut être implémentée. Des circuits plus profonds peuvent, en principe, approcher des fonctions plus complexes. Cependant, dans l\'ère NISQ, la profondeur est une ressource extrêmement limitée. Chaque porte supplémentaire augmente la probabilité qu\'une erreur (due à la décohérence ou à une calibration imparfaite) se produise, dégradant ainsi la fidélité du calcul. Par conséquent, la conception de cartes de caractéristiques pour les dispositifs actuels implique un compromis délicat : maximiser l\'expressivité et l\'intrication nécessaires pour la tâche tout en maintenant la profondeur du circuit aussi faible que possible.

### 68.4.3 Défis de l\'Ère NISQ : Bruit Matériel et Mitigation d\'Erreurs

Les ordinateurs quantiques actuels sont intrinsèquement bruités. Les erreurs dans les calculs quantiques sont inévitables et constituent le principal obstacle à la réalisation d\'un avantage quantique pratique. Ces erreurs dégradent la qualité des états de caractéristiques quantiques et, par conséquent, faussent l\'estimation de la matrice du noyau, ce qui peut anéantir la performance du classifieur.

Les principales sources de bruit dans les dispositifs supraconducteurs et à ions piégés incluent :

- La **décohérence**, qui est la perte d\'informations quantiques due à l\'interaction inévitable du système de qubits avec son environnement. Elle se manifeste par des processus de relaxation (perte d\'énergie, T1) et de déphasage (perte de cohérence de phase, T2).
- Les **erreurs de portes**, qui sont des imperfections dans l\'application des opérations quantiques. Elles peuvent être **incohérentes** (stochastiques, comme un bit-flip aléatoire) ou **cohérentes** (systématiques, comme une sur-rotation constante).
- Les **erreurs de mesure** (SPAM - *State Preparation and Measurement errors*), qui se produisent lors de l\'initialisation des qubits ou de la lecture du résultat final.

Pour lutter contre ces effets sans recourir à la correction d\'erreurs quantiques à part entière (qui nécessite une surcharge massive de qubits), un ensemble de techniques appelées **Mitigation d\'Erreurs Quantiques (QEM)** a été développé. Ces techniques visent à estimer et à soustraire l\'impact du bruit des résultats de mesure par le biais d\'un post-traitement classique. Le tableau suivant résume les stratégies de QEM les plus pertinentes.

L\'implémentation d\'un QSVM sur du matériel réel n\'est donc pas simplement une question de programmation du circuit idéal. Elle nécessite l\'intégration d\'une ou plusieurs de ces techniques de mitigation dans le flux de travail pour obtenir des résultats fiables. Le choix des techniques dépend de la nature dominante du bruit dans le dispositif matériel utilisé.

### 68.4.4 Complexité, Entraînabilité et Potentiel d\'Avantage Quantique

La promesse d\'une accélération exponentielle des QSVM doit être examinée avec un regard critique, en tenant compte de la complexité réelle de l\'algorithme et des défis liés à l\'entraînabilite.

#### Complexité de l\'Estimation du Noyau

Le goulot d\'étranglement computationnel de l\'approche QSVM hybride est la construction de la matrice du noyau d\'entraînement de taille M×M. Cela nécessite O(M2) évaluations de paires de noyaux. Chaque évaluation de noyau K(xi,xj) requiert l\'exécution d\'un circuit quantique un certain nombre de fois (appelé nombre de *shots*) pour estimer une probabilité avec une précision statistique ϵ. La variance de l\'estimateur de la moyenne de Bernoulli étant p(1−p), le nombre de shots requis pour atteindre une variance ϵ2 est O(1/ϵ2). La complexité totale de la construction de la matrice du noyau est donc de l\'ordre de O(M2/ϵ2) exécutions de circuits. Cette dépendance quadratique en M peut devenir prohibitive pour de très grands ensembles de données.

#### Le Problème de la Concentration Exponentielle et des Plateaux Stériles

Un défi encore plus fondamental pour l\'entraînabilite des modèles QML est le phénomène de **concentration exponentielle**, qui est l\'analogue pour les noyaux des **plateaux stériles** (*barren plateaus*) observés dans les algorithmes quantiques variationnels.

Ce phénomène peut être compris comme un \"trilemme de l\'entraînabilite\" entre l\'expressivité, la robustesse au bruit et la capacité à entraîner le modèle.

1. Pour qu\'un noyau quantique offre un avantage potentiel, sa carte de caractéristiques sous-jacente doit être suffisamment complexe et non classique, ce qui est souvent associé à une grande expressivité et à une intrication globale sur de nombreux qubits.
2. Cependant, il a été démontré théoriquement et numériquement que les circuits qui sont trop expressifs (formant des 2-designs approximatifs) ou qui utilisent des mesures globales conduisent à une concentration exponentielle des valeurs du noyau. À mesure que le nombre de qubits N augmente, les produits scalaires ⟨Φ(xi)∣Φ(xj)⟩ pour i=j convergent exponentiellement vers zéro. Par conséquent, la matrice du noyau K converge exponentiellement vers la matrice identité (K→I).
3. Une matrice de noyau triviale, proche de l\'identité, signifie que tous les points de données sont perçus comme étant orthogonaux (et donc équidistants) les uns des autres dans l\'espace de caractéristiques. Un tel noyau ne contient aucune information utile sur la structure des données, et le classifieur SVM qui en résulte aura des performances médiocres, équivalentes à une supposition aléatoire.
4. Pour distinguer des valeurs de noyau qui sont exponentiellement proches de zéro, il est nécessaire d\'estimer chaque entrée du noyau avec une précision exponentielle. Cela exige un nombre de *shots* qui croît exponentiellement avec le nombre de qubits, O(eN), annulant ainsi tout avantage de vitesse potentiel.

La conclusion de cette analyse est que la recherche d\'un avantage quantique ne consiste pas à maximiser aveuglément l\'expressivité du circuit. Au contraire, elle exige la conception de cartes de caractéristiques sur mesure, \"juste assez\" complexes pour le problème à résoudre, tout en évitant les architectures (comme les circuits profonds et aléatoires ou les mesures globales) qui sont connues pour provoquer des plateaux stériles. Cela motive la recherche de cartes de caractéristiques locales, inspirées de la structure du problème (par exemple, des cartes de type convolutionnel pour les données d\'image), ou des approches qui garantissent l\'absence de plateaux stériles.

#### Conditions pour un Avantage Quantique Prouvable

Un avantage quantique rigoureusement prouvé pour les QSVM n\'est pas une conséquence automatique de l\'utilisation d\'un ordinateur quantique. Il nécessite la satisfaction de deux conditions strictes :

1. Le noyau quantique K(xi,xj) doit être **efficacement calculable** sur un ordinateur quantique.
2. Le même noyau doit être **prouvablement difficile à estimer** pour tout algorithme classique en temps polynomial.

Des exemples de tels noyaux ont été construits pour des problèmes artificiels basés sur des primitives cryptographiques ou des problèmes mathématiques considérés comme difficiles pour les ordinateurs classiques, tels que le problème du logarithme discret. Par exemple, Liu et al. ont montré qu\'en encodant des données de manière que leur noyau soit lié au problème du logarithme discret, un QSVM peut résoudre un problème de classification qui est difficile pour les algorithmes classiques, sous l\'hypothèse de la difficulté de ce problème.

Cependant, la pertinence de ces constructions pour des problèmes d\'apprentissage automatique du monde réel reste une question ouverte. De plus, la découverte d\'algorithmes classiques \"d\'inspiration quantique\" ou \"déquantisés\" a montré que, sous certaines hypothèses structurelles sur les données (par exemple, si la matrice de données est de faible rang), des techniques d\'échantillonnage classiques peuvent parfois simuler efficacement le calcul du noyau quantique, remettant en question l\'unicité de l\'avantage quantique. La recherche d\'un avantage quantique pratique et robuste reste donc un domaine de recherche actif et stimulant.

## 68.5 Applications Polyvalentes et Analyse Comparative

La flexibilité du cadre des SVM, héritée de sa formulation basée sur les noyaux, se transpose naturellement au domaine quantique. Les QSVM ne se limitent pas à la classification binaire ; ils peuvent être adaptés pour aborder un large éventail de tâches d\'apprentissage supervisé et non supervisé. Cette section explore ces extensions, présente des études de cas dans des domaines scientifiques et industriels de premier plan, et positionne les QSVM par rapport à un autre paradigme majeur du QML, les réseaux de neurones quantiques.

### 68.5.1 Au-delà de la Classification Binaire : Régression (QSVR) et Détection d\'Anomalies (***One-Class QSVM***)

#### Régression à Vecteurs de Support Quantique (QSVR)

La régression à vecteurs de support (SVR) est l\'analogue des SVM pour les tâches de régression, où l\'objectif est de prédire une valeur continue plutôt qu\'une étiquette de classe. L\'idée centrale de la SVR est de trouver une fonction (un hyperplan dans l\'espace de caractéristiques) qui s\'écarte au maximum de ϵ des cibles d\'entraînement réelles yi pour autant de points que possible, tout en étant aussi \"plate\" que possible. La \"platitude\" est assurée en minimisant la norme du vecteur de poids ∥w∥2. Les points se trouvant en dehors de ce \"tube\" de tolérance ϵ sont pénalisés.

La formulation mathématique de la SVR est très similaire à celle de la SVM, et surtout, sa formulation duale dépend également uniquement des produits scalaires entre les points de données. Par conséquent, l\'astuce du noyau s\'applique directement, permettant des régressions non linéaires.

L\'extension à la **régression à vecteurs de support quantique (QSVR)** est donc naturelle. L\'algorithme suit la même architecture hybride que le QSVM :

1. Un ordinateur quantique est utilisé pour estimer la matrice du noyau quantique Kij=∣⟨Φ(xi)∣Φ(xj)⟩∣2.
2. Un solveur SVR classique utilise cette matrice pour résoudre le problème d\'optimisation dual et trouver les coefficients du modèle de régression.

La QSVR a été explorée pour des applications telles que la prévision de prix, la détection de points de repère faciaux et l\'analyse de données financières et de matériaux. Le noyau quantique offre la possibilité de modéliser des relations de régression très complexes qui pourraient être difficiles à capturer avec les noyaux classiques.

#### QSVM à Une Classe pour la Détection d\'Anomalies

La détection d\'anomalies est une tâche d\'apprentissage non supervisé (ou semi-supervisé) qui vise à identifier les points de données qui sont significativement différents du reste de l\'ensemble de données. La **SVM à une classe** (*One-Class SVM*) est une adaptation des SVM à ce problème. L\'algorithme apprend une frontière (une hypersphère ou un hyperplan) dans l\'espace de caractéristiques qui englobe la majorité des données d\'entraînement, considérées comme \"normales\". Tout nouveau point qui tombe en dehors de cette frontière est classé comme une anomalie.

Encore une fois, comme la formulation de la SVM à une classe repose sur l\'astuce du noyau, elle peut être étendue à une **QSVM à une classe**. Le noyau quantique permet de définir des frontières de normalité de formes très complexes dans l\'espace de Hilbert, ce qui est potentiellement très puissant pour détecter des anomalies subtiles dans des données de grande dimension. Cette approche a suscité un intérêt considérable pour des applications critiques en matière de sécurité, telles que la détection de fraudes financières, la détection d\'intrusions dans les systèmes de contrôle industriels (ICS) et la cybersécurité.

### 68.5.2 Études de Cas : Bio-informatique, Science des Matériaux et Finance

La capacité potentielle des QSVM à traiter des données de grande dimension et à capturer des corrélations complexes les rend particulièrement attrayants pour des domaines où les données sont riches et les relations sous-jacentes non triviales.

- **Bio-informatique et Découverte de Médicaments :** L\'analyse de données génomiques est un défi majeur en raison de leur très grande dimensionnalité. Les QSVM sont étudiés pour la classification des séquences d\'ADN, l\'identification de mutations génétiques, la prédiction de la structure des protéines et la classification des profils d\'expression génique. Dans le domaine de la conception de vaccins, les QSVM ont été appliqués à la prédiction d\'épitopes de lymphocytes B, une étape cruciale pour identifier les parties d\'un antigène qui déclenchent une réponse immunitaire. En découverte de médicaments, les QSVM pourraient accélérer le criblage virtuel en modélisant les interactions entre de petites molécules et des cibles biologiques.
- **Science des Matériaux et Chimie Quantique :** La prédiction des propriétés des matériaux à partir de leur structure est un problème fondamental. Les QSVM sont appliqués pour prédire les propriétés mécaniques et thermiques des polymères  ou pour classer les phases de la matière dans des systèmes quantiques complexes. La nature intrinsèquement quantique de ces problèmes suggère que les noyaux dérivés de simulations quantiques pourraient offrir un avantage naturel.
- **Finance et Autres Domaines :** Dans le secteur financier, les QSVM sont explorés pour la détection de fraudes par carte de crédit, où des modèles subtils peuvent indiquer une activité illégitime. Dans le domaine de la sécurité des infrastructures critiques, les QSVM sont utilisés pour la détection d\'anomalies dans les données des systèmes de contrôle industriels (ICS), où une détection rapide des défaillances ou des cyberattaques est essentielle.

### 68.5.3 Analyse Comparative : QSVM face aux Réseaux de Neurones Quantiques (QNN)

Les QSVM ne sont pas le seul paradigme en QML. Les réseaux de neurones quantiques (QNN), souvent implémentés sous forme de circuits quantiques variationnels, représentent une autre approche majeure. Une comparaison de ces deux modèles révèle des compromis fondamentaux en matière de conception et d\'entraînabilite.

#### Paradigmes d\'Apprentissage et Garanties d\'Entraînement

- **QSVM (Approche Implicite/Noyau) :** Dans un QSVM, le circuit quantique a un rôle fixe : il agit comme une carte de caractéristiques non linéaire pour calculer un noyau. L\'entraînement lui-même est un processus classique d\'optimisation convexe appliqué à la matrice du noyau. Pour une carte de caractéristiques et un noyau donnés, l\'entraînement est garanti de converger vers la solution optimale globale du problème SVM. La performance du modèle dépend donc entièrement de la qualité de la carte de caractéristiques choisie a priori.
- **QNN (Approche Explicite/Variationnel) :** Dans un QNN, le circuit quantique est le modèle lui-même. Il contient des paramètres (angles de rotation) qui sont optimisés de manière itérative via une boucle hybride quantique-classique, généralement à l\'aide de méthodes basées sur le gradient. Le paysage de la fonction de coût est généralement non convexe, ce qui signifie que l\'optimisation est sujette aux minima locaux et n\'a pas de garantie de convergence vers l\'optimum global. De plus, les QNN sont notoirement sensibles au problème des plateaux stériles, où les gradients s\'annulent exponentiellement, rendant l\'entraînement impossible pour des problèmes de grande taille.

#### Performance, Robustesse et Convergence des Modèles

Des études empiriques comparant les deux approches ont montré que les QSVM peuvent souvent être plus robustes et plus performants que les QNN, en particulier dans des scénarios avec des ensembles de données de taille limitée ou fortement déséquilibrés. Les QNN, en raison de leur plus grand nombre de paramètres entraînables et de la nature non convexe de leur entraînement, sont plus enclins au surajustement, surtout sans un réglage minutieux des hyperparamètres. Les QSVM, en s\'appuyant sur le principe de maximisation de la marge, possèdent une régularisation intrinsèque qui favorise une meilleure généralisation.

Cependant, il est essentiel de reconnaître que les QSVM et les QNN ne sont pas des paradigmes entièrement disjoints. Une perspective plus profonde révèle une convergence fascinante entre les deux. La fonction de décision calculée par un QNN peut être mathématiquement reformulée comme un produit scalaire dans l\'espace de Hilbert, ce qui est formellement équivalent à une méthode à noyau. La différence fondamentale est que, dans un QNN, les paramètres du circuit sont optimisés, ce qui peut être interprété comme l\'**apprentissage du noyau lui-même** pour l\'adapter aux données spécifiques. Un QSVM utilise un noyau fixe, tandis qu\'un QNN utilise un noyau adaptatif.

Cette vision unificatrice ouvre la voie à des architectures hybrides sophistiquées, telles que le modèle \"QSVM-QNN\" proposé dans la littérature. De tels modèles cherchent à combiner la robustesse de l\'optimisation convexe des SVM avec l\'expressivité et l\'adaptabilité des modèles variationnels. Par exemple, on pourrait utiliser un QNN pour apprendre une carte de caractéristiques optimale, puis utiliser le noyau résultant dans un classifieur SVM classique. Ces approches hybrides représentent une frontière de recherche prometteuse, visant à exploiter le meilleur des deux mondes.

## 68.6 Conclusion et Perspectives d\'Avenir

Ce chapitre a entrepris une exploration exhaustive des machines à vecteurs de support quantiques, depuis leurs fondements mathématiques ancrés dans la théorie classique des SVM jusqu\'aux frontières de la recherche en apprentissage automatique quantique. Nous avons établi que les QSVM représentent une généralisation élégante et naturelle des SVM au domaine quantique, où l\'espace de Hilbert d\'un système de qubits sert d\'espace de caractéristiques ultime. L\'architecture hybride quantique-classique, où l\'ordinateur quantique agit comme un co-processeur pour estimer une matrice de noyau potentiellement non classique, se présente comme un paradigme pragmatique et bien adapté aux capacités des dispositifs de l\'ère NISQ.

#### Synthèse des Acquis

Le parcours à travers la théorie et la conception des QSVM a mis en lumière plusieurs points fondamentaux. Premièrement, la puissance des QSVM réside entièrement dans la carte de caractéristiques quantique, implémentée par un circuit d\'encodage. Le choix de ce circuit --- sa stratégie d\'encodage, sa profondeur, et son niveau d\'intrication --- est l\'acte de conception le plus critique, déterminant la capacité du modèle à capturer des motifs complexes dans les données. Deuxièmement, l\'implémentation pratique sur du matériel réel est indissociable des défis posés par le bruit quantique. La décohérence et les erreurs de portes dégradent la fidélité de l\'estimation du noyau, rendant l\'utilisation de techniques de mitigation d\'erreurs quantiques non pas une option, mais une nécessité pour obtenir des résultats significatifs.

Troisièmement, et c\'est peut-être le point le plus crucial, la promesse d\'un avantage quantique n\'est pas garantie. Nous avons analysé en détail le phénomène de la concentration exponentielle des valeurs du noyau, un analogue des plateaux stériles dans les circuits variationnels. Ce phénomène impose une contrainte fondamentale : les cartes de caractéristiques trop expressives ou globales, bien que théoriquement puissantes, conduisent à des noyaux triviaux qui nécessitent une précision de mesure exponentielle, annulant de fait tout avantage computationnel. La quête d\'un avantage quantique pratique est donc une recherche subtile d\'un équilibre entre expressivité et entraînabilite.

Enfin, nous avons démontré la polyvalence du cadre QSVM, qui s\'étend naturellement à des tâches de régression (QSVR) et de détection d\'anomalies (QSVM à une classe), et montré son potentiel dans des domaines d\'application variés, de la bio-informatique à la science des matériaux. La comparaison avec les réseaux de neurones quantiques a révélé des compromis intéressants entre les modèles à noyau fixe et les modèles variationnels, suggérant des voies prometteuses pour des architectures hybrides futures.

#### Défis Ouverts et Axes de Recherche Futurs

Malgré les progrès significatifs, le domaine des QSVM est encore à ses débuts, et de nombreux défis passionnants restent à relever. Les axes de recherche futurs les plus importants incluent :

1. **Conception de Noyaux Avantageux :** Le défi principal reste la conception de cartes de caractéristiques quantiques qui offrent un avantage prouvable pour des problèmes d\'intérêt pratique. Plutôt que des approches heuristiques, des méthodologies systématiques sont nécessaires. Des pistes prometteuses incluent l\'utilisation de circuits inspirés de la physique du problème (par exemple, pour la classification de phases quantiques), ou même l\'utilisation d\'algorithmes d\'apprentissage automatique, y compris les grands modèles de langage, pour explorer l\'immense espace des architectures de circuits possibles et découvrir de nouvelles cartes de caractéristiques adaptées aux données.
2. **Amélioration de la Tolérance au Bruit :** Alors que les techniques de mitigation d\'erreurs évoluent, une direction de recherche complémentaire consiste à concevoir des noyaux et des cartes de caractéristiques qui sont intrinsèquement plus robustes au bruit matériel. Cela pourrait impliquer des circuits avec des structures spécifiques ou des techniques d\'encodage qui sont moins sensibles à certains types d\'erreurs.
3. **Scalabilité :** Le goulot d\'étranglement de la construction de la matrice du noyau, avec sa complexité quadratique en fonction de la taille de l\'ensemble de données, limite l\'applicabilité des QSVM à des problèmes de \"big data\". Des recherches sont nécessaires pour développer des approches qui contournent cette limitation. Des algorithmes d\'inspiration quantique comme les généralisations de Pegasos, qui fonctionnent de manière itérative et ne nécessitent qu\'un sous-ensemble du noyau à chaque étape, sont une voie prometteuse. D\'autres approches pourraient inclure des techniques d\'approximation de la matrice du noyau ou des méthodes de sous-échantillonnage intelligentes.
4. **Intégration Matérielle et Co-conception :** Pour exploiter pleinement le potentiel des QSVM, une collaboration plus étroite entre le développement d\'algorithmes et la conception de matériel est nécessaire. Des processeurs quantiques co-conçus pour des tâches QML spécifiques, par exemple avec une connectivité optimisée pour des cartes de caractéristiques particulières ou avec des portes natives plus rapides pour l\'estimation de noyaux, pourraient accélérer considérablement les progrès.

#### Vision à Long Terme

En conclusion, les machines à vecteurs de support quantiques représentent une confluence remarquable de l\'élégance mathématique de la théorie de l\'apprentissage statistique et de la puissance computationnelle brute de la mécanique quantique. Il est peu probable qu\'elles remplacent universellement les modèles d\'apprentissage automatique classiques. Leur avenir réside plutôt dans leur déploiement en tant qu\'outils spécialisés et extrêmement puissants pour des classes de problèmes spécifiques. Il s\'agira probablement de problèmes où la structure intrinsèque des données possède une \"quantité\" naturelle, où les corrélations complexes et les relations de haute dimension se prêtent à une représentation dans l\'espace de Hilbert. Alors que le matériel quantique continue de mûrir et que notre compréhension théorique de l\'avantage quantique s\'affine, les QSVM sont bien positionnés pour devenir l\'un des premiers exemples tangibles où le calcul quantique offre une solution véritablement transformatrice aux défis de l\'intelligence artificielle.

