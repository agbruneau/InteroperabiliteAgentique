# Chapitre I.44 : Apprentissage Profond (Deep Learning)

## Introduction

L\'apprentissage profond (Deep Learning) représente une sous-discipline de l\'apprentissage automatique qui a catalysé une véritable révolution dans le domaine de l\'intelligence artificielle au cours de la dernière décennie. Caractérisé par l\'utilisation de réseaux de neurones artificiels dotés de multiples couches de traitement --- d\'où l\'épithète \"profond\" --- ce champ a permis des avancées spectaculaires et autrefois considérées comme relevant de la science-fiction. Des systèmes de reconnaissance faciale omniprésents dans nos appareils mobiles à la traduction automatique quasi instantanée, en passant par les véhicules autonomes et les diagnostics médicaux assistés par ordinateur, l\'apprentissage profond est devenu le moteur de l\'innovation technologique contemporaine. Son impact s\'étend à des domaines aussi variés que la vision par ordinateur, le traitement du langage naturel, la bio-informatique, la robotique et les systèmes de recommandation.

L\'objectif de ce chapitre est de fournir une introduction à la fois rigoureuse et conceptuelle à l\'apprentissage profond, destinée aux étudiants de cycles supérieurs, aux ingénieurs et aux futurs chercheurs. Notre parcours débutera par les fondements, en retraçant l\'évolution du neurone biologique, source d\'inspiration initiale, vers le neurone formel et le perceptron multicouche, le premier véritable réseau de neurones profond. Nous disséquerons ensuite avec une précision mathématique le cœur mécanique de ces modèles : le processus d\'entraînement. Nous dériverons en détail l\'algorithme de rétropropagation du gradient, pierre angulaire de l\'apprentissage, et analyserons les optimiseurs modernes qui en assurent l\'efficacité.

Le fil conducteur de ce chapitre est l\'idée fondamentale de l\'**apprentissage de représentations hiérarchiques**. La \"profondeur\" d\'un réseau n\'est pas une simple accumulation de couches ; elle confère au modèle la capacité d\'apprendre des caractéristiques de plus en plus abstraites et complexes à chaque niveau de traitement. Une première couche pourra identifier des contours ou des textures simples dans une image, une couche intermédiaire assemblera ces contours pour reconnaître des formes comme des yeux ou des nez, et les couches finales pourront identifier un visage dans son intégralité. Cette capacité à construire une hiérarchie de concepts, du simple au complexe, est ce qui distingue l\'apprentissage profond et sous-tend sa puissance. Nous verrons comment ce principe est exploité de manière explicite dans les architectures spécialisées qui ont révolutionné leurs domaines respectifs : les réseaux de neurones convolutifs (CNN) pour les données à structure de grille comme les images, et les architectures séquentielles comme les réseaux de neurones récurrents (RNN) et les Transformers pour les données ordonnées comme le langage. Enfin, nous conclurons en explorant une nouvelle frontière fascinante : les modèles génératifs, capables non seulement d\'analyser et de classer des données, mais aussi d\'en créer de nouvelles, ouvrant la voie à des applications créatives et innovantes.

## 44.1 Réseaux de Neurones Artificiels (MLP)

Cette première section établit les fondations conceptuelles et mathématiques sur lesquelles repose l\'ensemble de l\'édifice de l\'apprentissage profond. Nous partirons de l\'analogie biologique qui a initialement inspiré le domaine pour construire, étape par étape, un modèle mathématique formel --- le Perceptron Multi-Couches (MLP) --- et démontrer sa capacité théorique à approximer n\'importe quelle fonction complexe.

### 44.1.1 Du Neurone Biologique au Neurone Formel : Le Perceptron

L\'idée de créer une intelligence artificielle en s\'inspirant du cerveau humain est aussi ancienne que le domaine lui-même. Le neurone biologique, unité de base du système nerveux, a servi de premier modèle conceptuel pour les pionniers de l\'informatique.

#### L\'inspiration biologique

Un neurone biologique est une cellule spécialisée dont la fonction est de recevoir, traiter et transmettre des informations. Sa structure se compose de trois parties principales :

> Les **dendrites**, des extensions ramifiées qui agissent comme des antennes, recevant des signaux électrochimiques d\'autres neurones.
>
> Le **soma** (ou corps cellulaire), qui intègre les signaux reçus. Si la somme des signaux entrants dépasse un certain seuil d\'activation, le neurone \"se déclenche\".
>
> L\'**axone**, une longue fibre qui transmet le signal de sortie (le potentiel d\'action) à d\'autres neurones via des jonctions appelées **synapses**.

La force de la connexion synaptique entre deux neurones peut varier, modulant l\'influence qu\'un neurone exerce sur un autre. C\'est ce processus de modulation synaptique qui est considéré comme le substrat de l\'apprentissage et de la mémoire dans le cerveau. Il est crucial de souligner que le neurone artificiel est une

*inspiration* mathématique et une simplification extrême de ce processus biologique complexe, et non une réplication fidèle.

#### Le modèle de McCulloch-Pitts et le Perceptron de Rosenblatt

La première tentative de formalisation mathématique fut le modèle de McCulloch et Pitts en 1943, qui présentait le neurone comme une simple unité logique à seuil binaire, capable de produire une sortie \"1\" (déclenchement) si la somme de ses entrées binaires dépassait un seuil, et \"0\" sinon.

C\'est en 1957 que Frank Rosenblatt, s\'appuyant sur ces idées, inventa le **Perceptron**, un algorithme d\'apprentissage supervisé pour la classification binaire, qui peut être considéré comme le premier neurone artificiel capable d\'apprendre à partir de données. Son fonctionnement est formalisé comme suit :

> **Entrées pondérées :** Le Perceptron reçoit un vecteur d\'entrées x=(x1​,x2​,\...,xn​). Chaque entrée xi​ est multipliée par un poids synaptique associé wi​. Ces poids représentent la force des connexions synaptiques. Le modèle calcule une somme pondérée de ses entrées, à laquelle on ajoute un terme de **biais** b. Le biais est un paramètre supplémentaire qui ne dépend d\'aucune entrée et permet de décaler la frontière de décision, augmentant ainsi la flexibilité du modèle. La somme pondérée, souvent notée\
> z, est donc :\
> \
> z=(i=1∑n​wi​xi​)+b=w⋅x+b
>
> **Fonction d\'activation à seuil :** La sortie du Perceptron est déterminée par une fonction d\'activation, qui dans le cas original est une fonction de Heaviside (ou fonction escalier). Si la somme pondérée z dépasse un certain seuil (qui est effectivement contrôlé par le biais), le neurone produit une sortie de 1 ; sinon, il produit une sortie de 0.\
> y\^​=f(z)={10​si z\>0sinon​

L\'algorithme d\'apprentissage du Perceptron consiste à ajuster itérativement les poids wi​ et le biais b en fonction de l\'erreur de classification sur des exemples d\'entraînement.

#### La limitation fondamentale : la séparabilité linéaire

Géométriquement, l\'équation w⋅x+b=0 définit un hyperplan dans l\'espace des entrées. Le Perceptron classe tous les points d\'un côté de cet hyperplan dans une classe (par exemple, 1) et tous les points de l\'autre côté dans l\'autre classe (0). Par conséquent, un Perceptron ne peut fonctionner que comme un classifieur linéaire, c\'est-à-dire qu\'il ne peut résoudre que des problèmes où les classes sont **linéairement séparables**.

Des fonctions logiques simples comme ET (AND), OU (OR) et NON (NOT) sont linéairement séparables et peuvent être apprises par un unique Perceptron. Cependant, un problème canonique a mis en lumière la limitation fondamentale de ce modèle : la fonction **OU exclusif (XOR)**. La fonction XOR renvoie 1 si ses deux entrées binaires sont différentes, et 0 sinon. Il est impossible de tracer une seule ligne droite pour séparer les points {(0,0),(1,1)} (classe 0) des points {(0,1),(1,0)} (classe 1) dans un plan cartésien.

Cette incapacité à résoudre un problème aussi simple que le XOR, mise en évidence dans le livre \"Perceptrons\" de Marvin Minsky et Seymour Papert en 1969, a eu un effet dévastateur sur le domaine. Elle a conduit à une réduction drastique des financements et de l\'intérêt pour la recherche sur les réseaux de neurones, une période souvent qualifiée de premier \"hiver de l\'IA\". La solution à cette limitation ne viendrait qu\'avec l\'introduction de la profondeur.

### 44.1.2 Le Perceptron Multi-Couches (MLP) et l\'Approximation Universelle

La sortie de \"l\'hiver de l\'IA\" a été rendue possible par la reconnaissance que la puissance des réseaux de neurones ne résidait pas dans un neurone unique, mais dans leur organisation en couches successives. Cette architecture, connue sous le nom de Perceptron Multi-Couches (MLP), a permis de surmonter la contrainte de séparabilité linéaire.

#### Surmonter la linéarité : les couches cachées

Un MLP est une architecture de réseau de neurones à propagation avant (feedforward) composée d\'au moins trois couches de nœuds : une couche d\'entrée, une ou plusieurs **couches cachées**, et une couche de sortie. Chaque neurone d\'une couche est généralement connecté à tous les neurones de la couche précédente (on parle de couche \"pleinement connectée\" ou \"dense\"). L\'information circule de manière unidirectionnelle, de l\'entrée vers la sortie, sans boucle.

Les couches cachées sont la clé pour dépasser les limites du Perceptron. Elles permettent au réseau d\'apprendre des représentations internes des données qui ne sont ni les entrées brutes ni les sorties finales. En substance, chaque couche apprend à transformer les représentations de la couche précédente en des représentations de plus en plus abstraites, permettant au réseau de construire des frontières de décision complexes.

#### Le rôle crucial des fonctions d\'activation non linéaires

Cependant, l\'ajout de couches cachées ne suffit pas. Si les neurones de ces couches utilisaient une fonction d\'activation linéaire (c\'est-à-dire f(z)=z), le MLP resterait un classifieur linéaire. En effet, une composition de transformations linéaires est elle-même une transformation linéaire. Un réseau profond de fonctions linéaires peut toujours être réduit à une seule transformation linéaire équivalente, s\'effondrant ainsi en un modèle sans plus de puissance qu\'un Perceptron unique.

C\'est l\'introduction d\'une **fonction d\'activation non linéaire** après la somme pondérée de chaque neurone qui confère au MLP sa puissance. Cette non-linéarité \"tord\" ou \"plie\" l\'espace des caractéristiques à chaque couche, permettant au réseau de séparer des classes qui ne sont pas linéairement séparables dans l\'espace d\'origine. C\'est cette combinaison de profondeur (couches multiples) et de non-linéarité qui permet de résoudre le problème du XOR et, plus généralement, d\'apprendre des fonctions arbitrairement complexes.

#### Analyse des fonctions d\'activation courantes

Le choix de la fonction d\'activation est une décision de conception cruciale qui influence directement la dynamique de l\'entraînement et les performances du réseau. Plusieurs fonctions ont été proposées et utilisées au fil du temps.

> Fonction Sigmoïde (ou Logistique) :\
> \
> σ(z)=1+e−z1​\
> \
> Historiquement, la fonction sigmoïde a été très populaire car sa sortie, comprise entre 0 et 1, pouvait être interprétée comme une probabilité d\'activation. Cependant, elle présente deux inconvénients majeurs. Premièrement, ses sorties ne sont pas centrées sur zéro. Deuxièmement, et plus grave, elle souffre du problème de saturation : pour des valeurs de z très grandes (positives ou négatives), la dérivée de la sigmoïde tend vers zéro. Comme nous le verrons dans la section sur l\'entraînement, des gradients nuls ou très faibles empêchent les poids de se mettre à jour, ce qui peut stopper l\'apprentissage. C\'est l\'une des causes du problème de la \"disparition du gradient\" (vanishing gradient).8
>
> Tangente Hyperbolique (Tanh) :\
> \
> tanh(z)=ez+e−zez−e−z​=2σ(2z)−1\
> \
> La fonction Tanh est mathématiquement une version redimensionnée et décalée de la sigmoïde. Son intervalle de sortie est \[−1,1\], ce qui la rend centrée sur zéro. Cette propriété est avantageuse car elle tend à produire des activations dans les couches suivantes qui ont une moyenne plus proche de zéro, ce qui peut accélérer la convergence de l\'algorithme d\'optimisation. Cependant, comme la sigmoïde, elle sature pour des valeurs d\'entrée extrêmes et souffre donc également du problème de la disparition du gradient.12
>
> Unité Linéaire Rectifiée (ReLU - Rectified Linear Unit) :\
> \
> f(z)=max(0,z)\
> \
> Introduite plus récemment, la fonction ReLU est devenue la fonction d\'activation par défaut dans la plupart des architectures d\'apprentissage profond. Ses avantages sont multiples :

**Efficacité de calcul :** Elle est extrêmement simple à calculer (une simple opération de seuillage).

**Non-saturation (pour les entrées positives) :** Pour z\>0, la dérivée est constante et égale à 1. Cela atténue considérablement le problème de la disparition du gradient et permet d\'entraîner des réseaux beaucoup plus profonds.\
\
Cependant, la ReLU n\'est pas sans défauts. Son principal inconvénient est le problème du \"neurone mourant\" (Dying ReLU). Si un neurone reçoit une entrée qui le fait produire une sortie de 0, sa dérivée devient également 0. Si, à cause d\'une mise à jour de poids importante, un neurone se retrouve dans cet état, il cessera de s\'activer pour n\'importe quelle entrée et ne pourra plus jamais se mettre à jour, car le gradient qui le traverse sera toujours nul. Pour remédier à cela, plusieurs variantes ont été proposées 12 :

**Leaky ReLU :** f(z)=max(αz,z), où α est une petite constante (ex: 0.01). Cela introduit une petite pente négative, empêchant le gradient de devenir nul pour les entrées négatives.

**Parametric ReLU (PReLU) :** Similaire à Leaky ReLU, mais α est un paramètre appris par le réseau.

**Exponential Linear Unit (ELU) :** f(z)=z si z\>0 et f(z)=α(ez−1) si z≤0. Elle a des sorties moyennes plus proches de zéro et peut être plus robuste au bruit.

Le passage des modèles bio-inspirés comme le Perceptron à des abstractions mathématiques comme le MLP avec des fonctions d\'activation non linéaires a été un tournant. La puissance de l\'apprentissage profond moderne ne découle pas de sa fidélité à la biologie, mais de sa solidité en tant que cadre mathématique pour l\'approximation de fonctions. La composition répétée de transformations linéaires et de non-linéarités simples est le mécanisme fondamental qui permet à ces réseaux de construire des représentations hiérarchiques et des frontières de décision d\'une complexité arbitraire.

#### Le Théorème d\'Approximation Universelle

La puissance expressive des MLP est formalisée par un résultat mathématique fondamental : le **théorème d\'approximation universelle**. Dans sa forme la plus courante, due aux travaux de Cybenko (1989) et Hornik (1991), le théorème énonce que :

*Un perceptron multi-couches avec une seule couche cachée contenant un nombre fini de neurones et une fonction d\'activation non linéaire (par exemple, sigmoïdale) peut approximer n\'importe quelle fonction continue sur un sous-ensemble compact de Rn avec n\'importe quel degré de précision souhaité.* 

En d\'autres termes, pour toute fonction continue f(x) et toute précision ϵ\>0, il existe un MLP à une couche cachée, noté g(x), tel que ∣f(x)−g(x)∣\<ϵ pour toutes les entrées x dans le domaine considéré.

Implications et mises en garde :

Ce théorème est d\'une importance capitale car il garantit que, en théorie, un MLP est un outil suffisamment puissant pour représenter une très large classe de fonctions. Il justifie l\'utilisation des réseaux de neurones comme des modèles d\'apprentissage généraux.

Cependant, il est essentiel de comprendre ses limites  :

> **C\'est un théorème d\'existence :** Il prouve que de tels poids *existent*, mais il ne fournit aucune méthode pour les trouver. Le défi pratique de l\'apprentissage, c\'est-à-dire le processus de recherche de ces poids optimaux, reste entier.
>
> **La largeur peut être arbitrairement grande :** Le théorème ne met pas de limite au nombre de neurones nécessaires dans la couche cachée, qui pourrait être exponentiellement grand et donc irréalisable en pratique.
>
> **Profondeur vs. Largeur :** Des versions plus récentes du théorème ont montré que des réseaux plus profonds peuvent être plus efficaces (nécessiter moins de paramètres au total) que des réseaux larges et peu profonds pour approximer certaines classes de fonctions.

En conclusion, le théorème d\'approximation universelle nous assure que les MLP ont la *capacité de représentation* nécessaire. La section suivante se concentrera sur la manière de réaliser ce potentiel par le biais de l\'entraînement et de l\'optimisation.

  -------------- ----------------------- ---------------------- -------------- ---------------------------------------------------------------------- ----------------------------------------------------------------
  Fonction       Équation Mathématique   Intervalle de Sortie   Dérivée        Avantages                                                              Inconvénients

  **Sigmoïde**   σ(z)=1+e−z1​             (0,1)                  σ(z)(1−σ(z))   Sortie interprétable comme une probabilité; Lisse et différentiable.   Sature (disparition du gradient); Sortie non centrée sur zéro.

  **Tanh**       tanh(z)=ez+e−zez−e−z​    (−1,1)                 1−tanh2(z)     Sortie centrée sur zéro, ce qui peut accélérer la convergence.         Sature (disparition du gradient).

  **ReLU**       f(z)=max(0,z)           \$                                                                                                           
  -------------- ----------------------- ---------------------- -------------- ---------------------------------------------------------------------- ----------------------------------------------------------------

## 44.2 Entraînement et Optimisation

Avoir établi qu\'un Perceptron Multi-Couches possède la capacité théorique d\'approximer des fonctions complexes est une première étape cruciale. Cependant, la question fondamentale demeure : comment trouver les valeurs spécifiques des millions de poids et de biais qui permettent au réseau de réaliser une tâche donnée? Cette section constitue le cœur mécanique de l\'apprentissage profond. Elle détaille le processus par lequel un réseau de neurones \"apprend\" à partir des données, en partant du principe de la minimisation d\'une fonction d\'erreur, en passant par la dérivation rigoureuse de l\'algorithme de rétropropagation qui en est le moteur, jusqu\'à l\'analyse des techniques d\'optimisation et de régularisation qui assurent son efficacité et sa robustesse.

### 44.2.1 La Descente de Gradient et la Fonction de Coût

L\'entraînement d\'un réseau de neurones dans un cadre d\'apprentissage supervisé est fondamentalement un problème d\'optimisation. L\'objectif est d\'ajuster les paramètres du modèle pour qu\'il produise des prédictions aussi précises que possible.

#### Le paradigme de l\'apprentissage supervisé

Le contexte est le suivant : nous disposons d\'un ensemble de données d\'entraînement, constitué de m paires d\'exemples {(x(1),y(1)),(x(2),y(2)),\...,(x(m),y(m))}. Pour chaque exemple,

x(i) est le vecteur d\'entrée (par exemple, les pixels d\'une image) et y(i) est la sortie désirée ou l\'étiquette correcte (par exemple, la classe de l\'image). Notre réseau de neurones, que nous pouvons voir comme une fonction paramétrique complexe f, prend x(i) en entrée et produit une prédiction y\^​(i)=f(x(i);θ), où θ représente l\'ensemble de tous les poids W et biais b du réseau. L\'objectif de l\'apprentissage est de trouver l\'ensemble de paramètres θ∗ qui rend les prédictions y\^​ les plus proches possible des véritables étiquettes y.

#### Quantifier l\'erreur : la fonction de coût

Pour guider ce processus d\'ajustement, nous devons d\'abord quantifier l\'erreur du réseau. C\'est le rôle de la **fonction de coût** (ou fonction de perte, *loss function*), notée J(θ). Cette fonction prend en entrée les paramètres du modèle et calcule un score scalaire qui mesure l\'inadéquation entre les prédictions du réseau et les valeurs réelles sur l\'ensemble des données. Plus l\'erreur est grande, plus la valeur de J(θ) est élevée. Le choix de la fonction de coût dépend de la nature de la tâche :

> **Erreur Quadratique Moyenne (Mean Squared Error - MSE) :** Utilisée principalement pour les tâches de **régression**, où la sortie est une valeur continue. Elle est définie comme la moyenne des carrés des différences entre les prédictions et les valeurs réelles.\
> J(θ)=m1​i=1∑m​(y\^​(i)−y(i))2
>
> **Entropie Croisée (Cross-Entropy Loss) :** C\'est la fonction de coût standard pour les tâches de **classification**. Elle mesure la dissimilarité entre la distribution de probabilité prédite par le modèle (généralement via une fonction d\'activation Softmax en sortie) et la distribution de probabilité réelle (qui est une distribution \"one-hot\", où la probabilité est de 1 pour la classe correcte et 0 pour les autres). Pour la classification binaire, elle se simplifie en  :\
> \
> \$\$ J(\\theta) = -\\frac{1}{m} \\sum\_{i=1}\^{m} \\left\[ y\^{(i)} \\log(\\hat{y}\^{(i)}) + (1-y\^{(i)}) \\log(1-\\hat{y}\^{(i)}) \\right\] \$\$

#### L\'optimisation comme minimisation et l\'algorithme de Descente de Gradient

L\'apprentissage est ainsi reformulé comme un problème d\'optimisation : trouver l\'ensemble de paramètres θ∗ qui minimise la fonction de coût J(θ).

θ∗=argθmin​J(θ)

Étant donné la complexité et la non-convexité de la fonction de coût pour les réseaux de neurones profonds, il est impossible de trouver ce minimum analytiquement. Nous devons recourir à une méthode itérative. L\'algorithme le plus fondamental pour cette tâche est la descente de gradient.

L\'intuition est simple : imaginons la fonction de coût comme un paysage montagneux, où l\'altitude en chaque point représente la valeur de la perte pour un ensemble de paramètres donné. Notre objectif est de trouver le point le plus bas de ce paysage. La descente de gradient propose de partir d\'un point aléatoire (initialisation aléatoire des poids) et de faire de petits pas dans la direction de la pente la plus forte vers le bas. Mathématiquement, la direction de la pente la plus forte est donnée par le **gradient** de la fonction de coût, noté ∇θ​J(θ). Le gradient est un vecteur qui contient les dérivées partielles de la fonction de coût par rapport à chaque paramètre du modèle (∂wij​∂J​, ∂bj​∂J​). Pour descendre, nous nous déplaçons donc dans la direction opposée au gradient.

La règle de mise à jour pour un paramètre générique θj​ (un poids ou un biais) à chaque itération est donc :

θj​←θj​−η∂θj​∂J​

où η est un hyperparamètre appelé taux d\'apprentissage (learning rate). Il contrôle la taille des pas que nous effectuons. Un η trop petit rendra la convergence très lente, tandis qu\'un η trop grand risque de nous faire \"sauter\" par-dessus le minimum et de diverger.19 La question centrale devient alors : comment calculer efficacement le gradient

∇θ​J(θ) pour un réseau contenant potentiellement des millions de paramètres?

### 44.2.2 Dérivation Formelle de l\'Algorithme de Rétropropagation (Backpropagation)

Calculer la dérivée partielle de la fonction de coût par rapport à chaque poids individuellement serait un processus d\'une complexité computationnelle prohibitive. L\'algorithme de **rétropropagation du gradient** (souvent abrégé en *backpropagation* ou *backprop*) est la solution élégante et efficace à ce problème. Il s\'agit d\'un algorithme qui exploite la structure en couches du réseau et la règle de dérivation en chaîne pour calculer tous les gradients en un seul passage vers l\'arrière, après un passage vers l\'avant.

L\'erreur est initialement calculée uniquement à la sortie du réseau, là où la prédiction est comparée à la vérité terrain. La rétropropagation peut être vue comme un mécanisme de distribution de la \"responsabilité\" de cette erreur finale à chaque poids et biais à travers le réseau. Un poids qui a fortement contribué à une grande erreur se verra attribuer une part plus importante de cette erreur et subira une correction plus importante. Cette distribution de la responsabilité est précisément ce que la règle de dérivation en chaîne permet de calculer de manière formelle.

#### Le fondement mathématique : la Règle de Dérivation en Chaîne

La pierre angulaire de la rétropropagation est la règle de dérivation en chaîne du calcul différentiel. Pour une composition de fonctions, si y=f(u) et u=g(x), alors la dérivée de y par rapport à x est donnée par :

∂x∂y​=∂u∂y​∂x∂u​

Dans un réseau de neurones, la fonction de coût est une longue chaîne de fonctions composées (chaque couche est une fonction de la précédente). La rétropropagation applique cette règle de manière itérative, de la dernière couche à la première.26

#### Dérivation pas à pas

Pour dériver l\'algorithme, nous allons établir des notations claires pour un MLP à L couches :

> wjk(l)​ : le poids de la connexion entre le k-ième neurone de la couche l−1 et le j-ième neurone de la couche l.
>
> bj(l)​ : le biais du j-ième neurone de la couche l.
>
> zj(l)​=∑k​wjk(l)​ak(l−1)​+bj(l)​ : la somme pondérée (entrée) du j-ième neurone de la couche l.
>
> aj(l)​=σ(zj(l)​) : l\'activation (sortie) du j-ième neurone de la couche l, où σ est la fonction d\'activation.
>
> J : la fonction de coût.

Notre objectif est de calculer ∂wjk(l)​∂J​ et ∂bj(l)​∂J​ pour tous les l,j,k.

**1. L\'erreur à la couche de sortie (l=L)**

Nous commençons par la fin. Nous définissons un terme d\'erreur δj(l)​ pour chaque neurone j de chaque couche l comme étant la dérivée partielle de la fonction de coût par rapport à la somme pondérée zj(l)​ de ce neurone :

δj(l)​≡∂zj(l)​∂J​

Pour la couche de sortie L, nous pouvons calculer ce terme directement en utilisant la règle en chaîne :

δj(L)​=∂aj(L)​∂J​∂zj(L)​∂aj(L)​​

Les deux termes de ce produit sont faciles à calculer :

> ∂aj(L)​∂J​ est simplement la dérivée de la fonction de coût par rapport à l\'activation de sortie. Pour une erreur quadratique moyenne et un seul exemple, J=21​∑j​(aj(L)​−yj​)2, donc ∂aj(L)​∂J​=(aj(L)​−yj​).
>
> ∂zj(L)​∂aj(L)​​ est la dérivée de la fonction d\'activation, σ′(zj(L)​).

Ainsi, l\'équation pour l\'erreur à la couche de sortie est  :

δj(L)​=∂aj(L)​∂J​σ′(zj(L)​)

En notation vectorielle : δ(L)=∇a​J⊙σ′(z(L)), où ⊙ est le produit d\'Hadamard (multiplication élément par élément).

**2. Propagation de l\'erreur vers l\'arrière (l\<L)**

C\'est ici que la \"rétropropagation\" prend tout son sens. Nous voulons exprimer l\'erreur δ(l) d\'une couche l en fonction de l\'erreur δ(l+1) de la couche suivante l+1. En appliquant à nouveau la règle en chaîne, nous voyons que l\'erreur J est influencée par zj(l)​ à travers toutes les sommes pondérées de la couche suivante, zk(l+1)​ :

\$\$ \\delta\^{(l)}\_j = \\frac{\\partial J}{\\partial z\^{(l)}\_j} = \\sum_k \\frac{\\partial J}{\\partial z\^{(l+1)}\_k} \\frac{\\partial z\^{(l+1)}\_k}{\\partial z\^{(l)}\_j}

\$\$Le premier terme dans la somme est simplement \$\\delta\^{(l+1)}\_k\$. Le second terme se décompose :\$\$

\\frac{\\partial z\^{(l+1)}\_k}{\\partial z\^{(l)}\_j} = \\frac{\\partial z\^{(l+1)}\_k}{\\partial a\^{(l)}\_j} \\frac{\\partial a\^{(l)}\_j}{\\partial z\^{(l)}\_j} \$\$

Sachant que zk(l+1)​=∑j​wkj(l+1)​aj(l)​+bk(l+1)​, on a ∂aj(l)​∂zk(l+1)​​=wkj(l+1)​. Et ∂zj(l)​∂aj(l)​​=σ′(zj(l)​). En substituant, on obtient la relation de récurrence fondamentale de la rétropropagation 19 :

δj(l)​=(k∑​wkj(l+1)​δk(l+1)​)σ′(zj(l)​)

En notation vectorielle : δ(l)=((W(l+1))Tδ(l+1))⊙σ′(z(l)). Cette équation montre que l\'erreur d\'un neurone dans une couche cachée est la somme des erreurs des neurones de la couche suivante, pondérée par les poids des connexions qui les relient, le tout multiplié par la dérivée de sa propre fonction d\'activation.

**3. Calcul des gradients**

Une fois que nous avons calculé les termes d\'erreur δ(l) pour toutes les couches, le calcul des gradients pour les poids et les biais devient trivial. En utilisant une dernière fois la règle en chaîne :

\$\$ \\frac{\\partial J}{\\partial w\^{(l)}\_{jk}} = \\frac{\\partial J}{\\partial z\^{(l)}\_j} \\frac{\\partial z\^{(l)}j}{\\partial w\^{(l)}{jk}} = \\delta\^{(l)}\_j a\^{(l-1)}\_k \$\$

\$\$ \\frac{\\partial J}{\\partial b\^{(l)}\_j} = \\frac{\\partial J}{\\partial z\^{(l)}\_j} \\frac{\\partial z\^{(l)}\_j}{\\partial b\^{(l)}\_j} = \\delta\^{(l)}\_j \\cdot 1 = \\delta\^{(l)}j \$\$

Ces deux équations sont remarquablement simples. Le gradient d\'un poids \$w\^{(l)}{jk}\$ est simplement le produit de l\'activation du neurone d\'origine (ak(l−1)​) et de l\'erreur du neurone de destination (δj(l)​).19

#### Synthèse de l\'algorithme

L\'algorithme de rétropropagation pour un exemple d\'entraînement donné se déroule comme suit :

> **Propagation avant (Forward Pass) :**

Prendre l\'entrée x et la définir comme a(0).

Pour chaque couche l=1,2,\...,L, calculer z(l)=W(l)a(l−1)+b(l) et a(l)=σ(z(l)). Stocker tous les z(l) et a(l).

> **Calcul de l\'erreur de sortie :**

Calculer le vecteur d\'erreur pour la couche de sortie L : δ(L)=∇a​J⊙σ′(z(L)).

> **Rétropropagation de l\'erreur (Backward Pass) :**

Pour chaque couche l=L−1,L−2,\...,2, calculer le vecteur d\'erreur : δ(l)=((W(l+1))Tδ(l+1))⊙σ′(z(l)).

> **Calcul des gradients :**

Pour chaque couche l=1,2,\...,L, les gradients sont : ∂wjk(l)​∂J​=ak(l−1)​δj(l)​ et ∂bj(l)​∂J​=δj(l)​.

Ces gradients sont ensuite utilisés dans un algorithme d\'optimisation, comme la descente de gradient, pour mettre à jour les poids et les biais.

### 44.2.3 Analyse Comparative des Optimiseurs : SGD et Adam

L\'algorithme de descente de gradient de base, qui calcule le gradient sur l\'ensemble du jeu de données avant chaque mise à jour (appelé **Batch Gradient Descent**), est rarement utilisé en pratique pour les grands ensembles de données. Des variantes plus efficaces ont été développées.

#### Descente de Gradient Stochastique (SGD)

La **Descente de Gradient Stochastique (SGD)** va à l\'extrême opposé : elle estime le gradient et met à jour les paramètres en utilisant un seul exemple d\'entraînement à la fois. Entre les deux se trouve la **Mini-batch Gradient Descent**, qui est la méthode la plus couramment utilisée. Elle calcule le gradient sur un petit sous-ensemble aléatoire de données (un \"mini-lot\" ou *mini-batch*) à chaque étape.

> **Avantages :** La SGD et ses variantes par mini-lots sont beaucoup plus rapides en termes de calcul par mise à jour. La nature \"bruitée\" des mises à jour (car le gradient n\'est qu\'une estimation) peut aider l\'algorithme à échapper aux minima locaux peu profonds et à trouver de meilleures solutions.
>
> **Inconvénients :** La trajectoire de la descente est très oscillante, ce qui peut ralentir la convergence globale vers le minimum.

#### Améliorations de la SGD : le Moment

Pour atténuer les oscillations de la SGD, la technique du moment a été introduite. L\'idée est d\'ajouter une \"inertie\" à la mise à jour. Au lieu de se baser uniquement sur le gradient actuel, la mise à jour est une combinaison du gradient actuel et de la direction de mise à jour précédente. On maintient une \"vitesse\" v, qui est une moyenne mobile exponentielle des gradients passés :

vt​=βvt−1​+(1−β)∇θ​J(θt​)

θt+1​=θt​−ηvt​

où β est un hyperparamètre (généralement autour de 0.9). Le moment aide à accélérer la convergence dans les directions où le gradient est constant et à amortir les oscillations dans les directions où il change rapidement.19

#### Optimiseurs Adaptatifs : Adam

Une autre classe d\'optimiseurs, dits **adaptatifs**, a été développée pour ajuster automatiquement le taux d\'apprentissage pour chaque paramètre individuellement. L\'optimiseur **Adam (Adaptive Moment Estimation)** est le plus populaire et souvent le choix par défaut pour de nombreuses applications. Adam combine deux idées principales :

> **Estimation du premier moment (Momentum) :** Il maintient une moyenne mobile exponentielle des gradients passés (la \"vitesse\" mt​), similaire au moment classique.
>
> **Estimation du second moment (Variance) :** Il maintient également une moyenne mobile exponentielle des *carrés* des gradients passés (la \"variance non centrée\" vt​).

La règle de mise à jour pour un paramètre θ est approximativement :

θt+1​=θt​−ηv\^t​​+ϵm\^t​​

où m\^t​ et v\^t​ sont les estimations des moments corrigées du biais d\'initialisation, et ϵ est une petite constante pour éviter la division par zéro. Essentiellement, Adam divise le taux d\'apprentissage par la racine carrée de la variance des gradients passés pour ce paramètre. Si un paramètre a reçu des gradients de grande magnitude par le passé, son taux d\'apprentissage effectif sera réduit. Inversement, s\'il a reçu des gradients faibles, son taux d\'apprentissage sera augmenté. Cela conduit souvent à une convergence beaucoup plus rapide que la SGD.31

#### Le \"Generalization Gap\"

L\'introduction d\'optimiseurs comme Adam a été perçue comme une avancée majeure, simplifiant le réglage du taux d\'apprentissage et accélérant l\'entraînement. Cependant, un corpus croissant de recherches a mis en évidence un phénomène connu sous le nom de **\"generalization gap\"** : bien qu\'Adam converge plus rapidement en termes de perte d\'entraînement, les modèles entraînés avec la SGD (avec moment) atteignent souvent une meilleure performance sur l\'ensemble de test, en particulier dans des domaines comme la vision par ordinateur.

Cela suggère que l\'objectif de l\'optimisation dans les espaces non-convexes n\'est pas simplement de trouver n\'importe quel minimum, mais de trouver un \"bon\" minimum. L\'hypothèse dominante est que la nature plus bruitée de la SGD et son taux d\'apprentissage global l\'aident à s\'installer dans des minima \"larges et plats\" du paysage de la perte. Ces minima plats sont plus robustes : de petites variations dans les données d\'entrée (comme celles entre l\'ensemble d\'entraînement et de test) ne modifient que légèrement la valeur de la perte. En revanche, l\'optimisation plus agressive et par paramètre d\'Adam pourrait le conduire plus rapidement vers des minima \"étroits et profonds\", qui sont moins robustes et généralisent moins bien. Ce compromis entre vitesse de convergence et qualité de la généralisation est un domaine de recherche actif et crucial pour la pratique de l\'apprentissage profond.

### 44.2.4 Stratégies de Régularisation pour la Généralisation

Un modèle avec un grand nombre de paramètres, comme un réseau de neurones profond, a une grande capacité à s\'adapter aux données. S\'il est entraîné trop longtemps sur un ensemble de données limité, il peut commencer à \"mémoriser\" les exemples d\'entraînement, y compris leur bruit et leurs particularités, au lieu d\'apprendre la structure sous-jacente des données. Ce phénomène, appelé **surapprentissage (overfitting)**, se manifeste par une faible erreur sur l\'ensemble d\'entraînement mais une erreur élevée sur des données nouvelles et non vues. Les techniques de

**régularisation** sont essentielles pour combattre le surapprentissage et améliorer la capacité de généralisation du modèle.

#### Régularisation L2 (Weight Decay)

La régularisation L2 est l\'une des formes de régularisation les plus courantes. Elle consiste à ajouter un terme de pénalité à la fonction de coût qui est proportionnel à la somme des carrés de tous les poids du réseau :

Jreg​(θ)=J(θ)+2mλ​w∑​w2

où λ est l\'hyperparamètre de régularisation qui contrôle la force de la pénalité. En minimisant cette nouvelle fonction de coût, l\'algorithme d\'optimisation est incité non seulement à réduire l\'erreur de prédiction, mais aussi à maintenir les poids à de faibles valeurs. Des poids plus petits conduisent à un modèle plus \"simple\", où la sortie change moins radicalement en réponse à de petites variations de l\'entrée. Cela rend le modèle moins sensible au bruit dans les données d\'entraînement et moins susceptible de surapprendre.37

#### Dropout

Le **Dropout** est une technique de régularisation puissante et radicalement différente, proposée par Hinton et ses collaborateurs. L\'idée est simple : pendant l\'entraînement, à chaque itération et pour chaque couche, on \"désactive\" (met à zéro) aléatoirement un certain nombre de neurones avec une probabilité p (une valeur typique est p=0.5). Les neurones désactivés ne participent ni à la propagation avant ni à la rétropropagation lors de cette itération.

L\'intuition est que cette procédure empêche les neurones de développer une co-adaptation complexe. Si un neurone ne peut pas se fier à la présence de ses voisins, il est forcé d\'apprendre des caractéristiques qui sont utiles en elles-mêmes. Une autre interprétation est que le Dropout entraîne implicitement un très grand ensemble de réseaux de neurones \"clairsemés\" (avec différentes architectures) et fait la moyenne de leurs prédictions au moment du test. Cette approche d\'ensemble est un moyen très efficace de réduire le surapprentissage.

  ------------------ ----------------------------------- ---------------------- ------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------
  Optimiseur         Règle de Mise à Jour (simplifiée)   Hyperparamètres Clés   Avantages                                                                                                                       Inconvénients

  **SGD**            θ←θ−η∇J                             η                      Simple; Peut trouver des minima plus larges qui généralisent mieux.                                                             Convergence lente; Sensible au choix de η; Peut osciller fortement.

  **SGD+Momentum**   v←βv+∇J; θ←θ−ηv                     η,β                    Accélère la convergence par rapport à la SGD; Amortit les oscillations.                                                         Nécessite le réglage de β.

  **Adam**           θ←θ−ηv\^​+ϵm\^​                       η,β1​,β2​,ϵ              Convergence très rapide; Taux d\'apprentissage adaptatif par paramètre; Souvent efficace avec les hyperparamètres par défaut.   Peut converger vers des minima plus \"pointus\" et moins bien généraliser (generalization gap); Plus gourmand en mémoire.
  ------------------ ----------------------------------- ---------------------- ------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------

**Tableau 44.2: Synthèse des Algorithmes d\'Optimisation** 

## 44.3 Architectures Spécialisées

Les Perceptrons Multi-Couches (MLP) sont des approximateurs universels, mais leur structure générique, pleinement connectée, ne tire pas parti des structures inhérentes à certains types de données. Pour des données comme les images, qui possèdent une forte structure spatiale, ou le texte, qui a une structure séquentielle, des architectures spécialisées ont été développées. Ces architectures incorporent des \"priors\" ou des hypothèses sur la nature des données directement dans leur conception, ce qui les rend beaucoup plus efficaces en termes de nombre de paramètres et de performance. Cette section explore les trois architectures qui ont défini l\'ère moderne de l\'apprentissage profond : les Réseaux de Neurones Convolutifs (CNN), les Réseaux de Neurones Récurrents (RNN) et leurs variantes, et les Transformers.

### 44.3.1 Réseaux de Neurones Convolutifs (CNN)

Les Réseaux de Neurones Convolutifs sont la pierre angulaire de la vision par ordinateur moderne. Leur conception est directement inspirée par l\'organisation du cortex visuel humain et est spécifiquement conçue pour traiter des données qui ont une topologie de grille, comme les images.

#### Motivation et Intuition

Appliquer un MLP standard à une image, même de taille modeste, présente deux problèmes majeurs :

> **Explosion du nombre de paramètres :** Une image en couleur de 224x224 pixels a 224×224×3≈150,000 valeurs d\'entrée. Si la première couche cachée d\'un MLP contenait 1000 neurones, cela nécessiterait plus de 150 millions de poids juste pour cette première couche. Un tel modèle serait impossible à entraîner sans une quantité astronomique de données et serait extrêmement sujet au surapprentissage.
>
> **Perte de la structure spatiale :** En aplatissant l\'image en un long vecteur, le MLP ignore la topologie 2D. L\'information que les pixels voisins sont fortement corrélés est perdue. De plus, le modèle n\'est pas **invariant à la translation** : si un objet (par exemple, un chat) est appris dans le coin supérieur gauche de l\'image, le modèle ne le reconnaîtra pas automatiquement s\'il apparaît dans le coin inférieur droit. Il devrait réapprendre le motif à chaque nouvel emplacement.

Les CNNs résolvent ces problèmes en intégrant deux idées fondamentales : la localité des connexions et le partage de poids.

#### L\'Opération de Convolution et le Partage de Poids

L\'élément central d\'un CNN est la **couche convolutive**, qui remplace les couches denses des MLP.

> **Champs Récepteurs Locaux :** Au lieu d\'être connecté à chaque pixel de l\'image d\'entrée, un neurone dans une couche convolutive n\'est connecté qu\'à une petite région locale de la couche précédente, appelée son **champ récepteur** (*receptive field*). Cette idée s\'inspire du fait que les neurones du cortex visuel ne répondent qu\'à des stimuli dans une zone restreinte du champ de vision.
>
> **Noyaux (Filtres) :** La connexion locale est implémentée via un **noyau** (*kernel*) ou **filtre**. Un noyau est une petite matrice de poids (par exemple, 3x3 ou 5x5) qui est apprise. Ce noyau agit comme un détecteur de caractéristiques : il est conçu pour s\'activer lorsqu\'il rencontre un motif spécifique dans son champ récepteur, comme un contour vertical, un coin, une couleur particulière, ou une texture.
>
> **L\'Opération de Convolution :** L\'opération de convolution consiste à faire \"glisser\" ce noyau sur toute l\'image d\'entrée, de gauche à droite et de haut en bas. À chaque position, on calcule le produit scalaire entre les poids du noyau et les valeurs des pixels de l\'image sous-jacente. Le résultat de ce calcul pour une position donnée est une seule valeur dans la sortie. En effectuant cette opération sur toute l\'image, on produit une nouvelle matrice 2D appelée **carte de caractéristiques** (*feature map*). Cette carte indique les emplacements où la caractéristique détectée par le noyau est présente dans l\'image. Mathématiquement, pour une image d\'entrée\
> I et un noyau K, la valeur de la carte de caractéristiques en position (i,j) est  :\
> (I∗K)(i,j)=m∑​n∑​I(i−m,j−n)K(m,n)
>
> **Partage de Poids (Weight Sharing) :** C\'est le concept le plus important. Le *même* ensemble de poids (le même noyau) est utilisé pour balayer toute l\'image. Cette idée, radicalement différente des MLP où chaque connexion a son propre poids, a deux conséquences transformatrices  :

**Réduction drastique des paramètres :** Au lieu d\'apprendre des millions de poids, on n\'apprend que les quelques poids du noyau (par exemple, 9 poids pour un noyau 3x3).

**Invariance à la translation :** Puisque le même détecteur de caractéristiques est appliqué partout, le réseau peut reconnaître un motif quel que soit son emplacement dans l\'image.

Une couche convolutive typique apprend plusieurs noyaux en parallèle, chacun spécialisé dans la détection d\'une caractéristique différente. Si une couche a 64 noyaux, elle produira 64 cartes de caractéristiques en sortie, formant un \"volume\" de caractéristiques.

#### Le Sous-Échantillonnage : Couches de Pooling

Après une couche de convolution (et généralement une fonction d\'activation non linéaire comme ReLU), il est courant d\'insérer une **couche de pooling** (ou sous-échantillonnage). Son rôle est de réduire progressivement la dimension spatiale (largeur et hauteur) des cartes de caractéristiques, ce qui a plusieurs avantages :

> **Réduction de la charge de calcul :** Moins de données à traiter dans les couches suivantes.
>
> **Robustesse aux petites variations :** Elle rend la représentation plus robuste aux petites translations et distorsions de la caractéristique dans l\'image.
>
> **Agrandissement du champ récepteur effectif :** En agrégeant l\'information, les neurones des couches plus profondes \"voient\" une plus grande partie de l\'image d\'origine.

L\'opération de pooling la plus courante est le **Max Pooling**. Elle consiste à faire glisser une petite fenêtre (par exemple, 2x2) sur la carte de caractéristiques et à ne conserver que la valeur maximale dans cette fenêtre. Si une caractéristique est détectée n\'importe où dans la fenêtre, le max pooling s\'assure que cette information est transmise, tout en ignorant la position exacte.

#### Architecture Typique d\'un CNN

Une architecture de CNN classique est un empilement de plusieurs blocs, chacun composé d\'une ou plusieurs couches de convolution, suivies d\'une fonction d\'activation (généralement ReLU) et d\'une couche de pooling. Cette partie convolutive du réseau agit comme un extracteur de caractéristiques hiérarchique : les premières couches apprennent des caractéristiques simples (contours, couleurs), et les couches plus profondes combinent ces caractéristiques pour en former de plus complexes (formes, parties d\'objets).

À la fin de cette pile convolutive, les cartes de caractéristiques finales (qui sont de petite taille spatiale mais de grande profondeur) sont aplaties en un seul vecteur. Ce vecteur est ensuite passé à un ou plusieurs couches pleinement connectées (un MLP standard) qui effectuent la tâche de classification finale.

### 44.3.2 Réseaux de Neurones Récurrents (RNN, LSTM, GRU)

Alors que les CNNs exploitent la structure spatiale, les **Réseaux de Neurones Récurrents (RNN)** sont conçus pour modéliser des données où l\'ordre est fondamental : les **séquences**. Le langage naturel, les séries temporelles financières, les signaux audio ou les données génomiques sont des exemples de données séquentielles où la signification d\'un élément dépend des éléments qui le précèdent.

#### Motivation et Intuition

Les MLP et les CNNs traitent chaque entrée de manière indépendante. Ils n\'ont pas de \"mémoire\" inhérente pour se souvenir des entrées précédentes. Les RNNs résolvent ce problème en introduisant une **boucle de récurrence**. L\'idée est de traiter les éléments d\'une séquence un par un, et à chaque étape, de conserver une \"mémoire\" ou un \"état\" qui résume les informations vues jusqu\'à présent.

#### L\'Architecture du RNN Simple

Un RNN simple peut être vu comme un neurone ou une couche de neurones qui, en plus de recevoir l\'entrée actuelle, reçoit également sa propre sortie de l\'étape de temps précédente. Cette boucle permet à l\'information de persister. La relation de récurrence qui définit un RNN est la suivante :

ht​=fW​(ht−1​,xt​)

où :

> xt​ est le vecteur d\'entrée à l\'instant t.
>
> ht−1​ est l\'**état caché** (*hidden state*) à l\'instant t−1. Il sert de mémoire de la séquence passée.
>
> ht​ est le nouvel état caché à l\'instant t.
>
> fW​ est la fonction de transition, généralement une transformation affine suivie d\'une non-linéarité (comme Tanh), paramétrée par un ensemble de poids W (qui inclut les poids pour l\'entrée et les poids récurrents pour l\'état caché précédent).

Crucialement, les **mêmes poids W sont utilisés à chaque pas de temps**. C\'est l\'équivalent du partage de poids des CNNs, mais dans le domaine temporel. Le réseau apprend une seule règle de transition qui est appliquée de manière répétée. La sortie du réseau à l\'instant t, notée y\^​t​, est généralement calculée à partir de l\'état caché ht​.

#### Le Problème de la Mémoire à Long Terme : Disparition et Explosion du Gradient

Pour entraîner un RNN, on utilise une version de la rétropropagation appelée **Backpropagation Through Time (BPTT)**. Elle consiste à \"dérouler\" le réseau dans le temps, créant une longue chaîne de calculs, puis à appliquer l\'algorithme de rétropropagation standard.

C\'est là qu\'apparaît un problème fondamental. Pour calculer le gradient de la perte à l\'instant t par rapport à un état caché lointain hk​ (avec k≪t), la règle en chaîne implique de multiplier de manière répétée la matrice de poids récurrente Whh​ (la partie de W qui multiplie ht−1​) :

\$\$ \\frac{\\partial h_t}{\\partial h_k} = \\prod\_{i=k+1}\^{t} \\frac{\\partial h_i}{\\partial h\_{i-1}} \\propto (W\_{hh})\^{t-k} \$\$

Si les valeurs singulières dominantes de la matrice Whh​ sont inférieures à 1, ce produit tendra exponentiellement vers zéro à mesure que l\'intervalle t−k augmente. C\'est le problème de la disparition du gradient (vanishing gradient). Le signal d\'erreur provenant du futur s\'évanouit avant d\'atteindre le passé lointain, rendant impossible pour le réseau d\'apprendre des dépendances à long terme.48 Inversement, si ces valeurs sont supérieures à 1, le produit explose, menant au problème de l\'

**explosion du gradient** (*exploding gradient*), qui rend l\'entraînement instable.

#### Architectures à Portes : LSTM et GRU

Pour surmonter le problème de la disparition du gradient, des architectures de RNN plus sophistiquées ont été développées. Elles reposent sur l\'idée de **portes** (*gates*), des mécanismes neuronaux qui apprennent à réguler le flux d\'information.

> Long Short-Term Memory (LSTM) :\
> Introduit par Hochreiter et Schmidhuber en 1997, le LSTM est une architecture qui a révolutionné le traitement des séquences. Sa conception vise explicitement à permettre à l\'information de circuler sans être altérée sur de longues périodes, tout en permettant des mises à jour ciblées.55 L\'innovation clé est l\'introduction d\'un\
> **état de la cellule** (Ct​) en plus de l\'état caché (ht​).

**État de la cellule (Ct​) :** C\'est le cœur de la mémoire à long terme. On peut l\'imaginer comme un \"tapis roulant\" d\'information. Il traverse toute la chaîne séquentielle avec seulement des transformations linéaires mineures, ce qui permet au gradient de fluer facilement.\
\
L\'information est ajoutée ou retirée de l\'état de la cellule via trois portes :

**Porte d\'oubli (Forget Gate) :** Une couche sigmoïde qui regarde ht−1​ et xt​ et décide quelle proportion de l\'information de l\'état de la cellule précédent (Ct−1​) doit être oubliée (une sortie de 0 signifie \"oublier complètement\", une sortie de 1 signifie \"garder complètement\").

**Porte d\'entrée (Input Gate) :** Elle décide quelle nouvelle information stocker dans l\'état de la cellule. Elle est composée de deux parties : une couche sigmoïde qui décide quelles valeurs mettre à jour, et une couche Tanh qui crée un vecteur de nouvelles valeurs candidates. Le produit de ces deux éléments est ensuite ajouté à l\'état de la cellule.

**Porte de sortie (Output Gate) :** Elle détermine la sortie de la cellule, ht​. Elle prend l\'état de la cellule Ct​, le passe à travers une Tanh, puis le filtre avec une couche sigmoïde (basée sur ht−1​ et xt​) pour ne produire que les parties pertinentes de l\'information mémorisée.

> Gated Recurrent Unit (GRU) :\
> Introduit plus récemment par Cho et al. (2014), le GRU est une simplification du LSTM qui a souvent des performances comparables mais avec moins de paramètres, ce qui le rend plus rapide à entraîner.59 Le GRU fusionne l\'état de la cellule et l\'état caché et n\'utilise que deux portes :

**Porte de mise à jour (Update Gate) :** Elle joue un rôle similaire à celui des portes d\'oubli et d\'entrée du LSTM. Elle décide quelle proportion de l\'état caché précédent conserver et quelle proportion de la nouvelle information candidate intégrer.

**Porte de réinitialisation (Reset Gate) :** Elle détermine quelle partie de la mémoire passée (ht−1​) doit être oubliée avant de calculer les nouvelles informations candidates.

Ces architectures à portes ont permis aux RNNs de modéliser avec succès des dépendances sur des centaines de pas de temps, débloquant des applications complexes en traduction automatique, reconnaissance de la parole et génération de texte.

### 44.3.3 Transformers et Mécanismes d\'Attention

Malgré le succès des LSTMs et des GRUs, deux limitations fondamentales persistaient :

> **Traitement séquentiel :** La nature récurrente de ces modèles impose un traitement séquentiel des données. Il faut calculer ht−1​ pour pouvoir calculer ht​, ce qui empêche une parallélisation massive sur les GPU modernes et rend l\'entraînement sur de très longues séquences lent.
>
> **Goulot d\'étranglement informationnel :** Bien que les portes aident, le chemin que l\'information doit parcourir entre deux points éloignés dans une séquence reste long. Dans les architectures encodeur-décodeur pour la traduction, toute la phrase source était compressée en un seul vecteur de contexte de taille fixe, un goulot d\'étranglement évident.

Le **mécanisme d\'attention**, initialement proposé pour améliorer ces modèles encodeur-décodeur, a fourni la clé pour surmonter ces limites. L\'idée de l\'attention est de permettre au modèle, à chaque étape, de \"regarder\" directement et de se concentrer sur les parties les plus pertinentes de la séquence d\'entrée, plutôt que de se fier à un résumé compressé. L\'architecture

**Transformer**, introduite dans l\'article \"Attention Is All You Need\" de Vaswani et al. (2017), a poussé cette idée à son paroxysme en se débarrassant entièrement de la récurrence et en ne s\'appuyant que sur l\'attention.

#### Le Mécanisme d\'Auto-Attention (Self-Attention)

Le cœur du Transformer est l\'**auto-attention**. C\'est un mécanisme qui permet à chaque élément d\'une séquence d\'interagir directement avec tous les autres éléments de cette même séquence pour calculer sa propre représentation. Il pèse l\'importance de chaque autre mot par rapport au mot courant. Le calcul se fait via trois vecteurs appris pour chaque mot d\'entrée :

> **Requête (Query, Q) :** Un vecteur représentant le mot courant, qui \"interroge\" les autres mots.
>
> **Clé (Key, K) :** Un vecteur représentant un autre mot dans la séquence, qui sert d\'étiquette pour sa valeur.
>
> **Valeur (Value, V) :** Un vecteur représentant le contenu informationnel d\'un autre mot.

Le processus pour un mot donné est le suivant :

> **Calcul des scores :** Le vecteur Requête du mot courant est comparé à chaque vecteur Clé de tous les mots de la séquence (y compris lui-même) via un produit scalaire. Un score élevé signifie une forte pertinence.
>
> **Mise à l\'échelle et Normalisation (Softmax) :** Les scores sont divisés par la racine carrée de la dimension des vecteurs Clé, dk​​, pour stabiliser les gradients. Ils sont ensuite passés à travers une fonction softmax, qui les transforme en un ensemble de poids (les \"poids d\'attention\") qui somment à 1.
>
> **Sortie :** La nouvelle représentation du mot courant est calculée comme la somme pondérée de tous les vecteurs Valeur de la séquence, où les poids sont les poids d\'attention calculés à l\'étape précédente.

La formule complète est  :

Attention(Q,K,V)=softmax(dk​​QKT​)V

Ce mécanisme a un avantage majeur : le chemin entre deux mots quelconques dans la séquence est de longueur 1. L\'information peut circuler directement, résolvant le problème des dépendances à long terme. De plus, tous ces calculs peuvent être effectués en parallèle pour tous les mots de la séquence, car il n\'y a pas de dépendance temporelle.

#### L\'Architecture du Transformer

Le modèle Transformer utilise ce mécanisme d\'auto-attention comme brique de base pour construire une architecture encodeur-décodeur puissante.

> **Attention Multi-Têtes (Multi-Head Attention) :** Au lieu d\'effectuer une seule fonction d\'attention, le Transformer l\'exécute plusieurs fois en parallèle. Chaque \"tête\" d\'attention apprend des projections linéaires différentes pour les vecteurs Q, K et V, ce qui lui permet de se concentrer sur différents aspects de la relation entre les mots (par exemple, une tête pourrait se concentrer sur les relations syntaxiques, une autre sur les relations sémantiques). Les sorties de toutes les têtes sont ensuite concaténées et projetées pour produire la sortie finale.
>
> **Encodage Positionnel (Positional Encoding) :** Puisque le mécanisme d\'auto-attention est invariant à l\'ordre des mots (c\'est un traitement d\'ensemble), l\'information sur la position des mots dans la séquence est perdue. Pour réinjecter cette information cruciale, des vecteurs d\'**encodage positionnel**, qui dépendent de la position du mot, sont ajoutés aux vecteurs d\'entrée avant la première couche.
>
> **Structure de l\'Encodeur et du Décodeur :** Le Transformer est composé d\'une pile de N encodeurs identiques et d\'une pile de N décodeurs identiques.

Chaque **bloc encodeur** est composé de deux sous-couches : une couche d\'attention multi-têtes (auto-attention), suivie d\'un réseau de neurones à propagation avant (un MLP simple). Des connexions résiduelles et une normalisation de couche sont appliquées autour de chaque sous-couche.

Chaque **bloc décodeur** est similaire mais insère une troisième sous-couche. Il possède une couche d\'auto-attention multi-têtes (avec un \"masque\" pour empêcher de prêter attention aux positions futures lors de la génération), une couche d\'**attention croisée** multi-têtes (où les Requêtes viennent du décodeur et les Clés et Valeurs viennent de la sortie de l\'encodeur), et enfin un réseau de neurones à propagation avant.

Cette architecture, en abandonnant la récurrence au profit d\'un accès global et parallèle via l\'attention, a établi de nouveaux records de performance dans presque toutes les tâches de traitement du langage naturel et est devenue le fondement des grands modèles de langage modernes.

  ----------------- --------------------------- ------------------------------------------------------------ --------------------------------------------------------- ---------------------------------------------------
  Modèle            Traitement de la Séquence   Mécanisme de Mémoire                                         Gestion des Dépendances Longues                           Complexité par Couche

  **RNN Simple**    Séquentiel                  État caché simple (ht​)                                       Mauvaise (disparition/explosion du gradient)              Faible

  **LSTM**          Séquentiel                  État de la cellule (Ct​) + 3 portes (oubli, entrée, sortie)   Bonne (grâce aux portes et à l\'état de la cellule)       Élevée

  **GRU**           Séquentiel                  État caché + 2 portes (mise à jour, réinitialisation)        Bonne (grâce aux portes)                                  Moyenne

  **Transformer**   Parallèle                   Accès global via auto-attention (Q, K, V)                    Excellente (chemin de longueur 1 entre tous les tokens)   Très élevée (quadratique en longueur de séquence)
  ----------------- --------------------------- ------------------------------------------------------------ --------------------------------------------------------- ---------------------------------------------------

**Tableau 44.3: Comparaison Architecturale des Modèles Séquentiels** 

## 44.4 Modèles Génératifs

Jusqu\'à présent, nous avons exploré des architectures conçues pour des tâches **discriminatives** : étant donné une entrée X, prédire une sortie Y. Ces modèles apprennent à discriminer entre différentes classes ou à prédire une valeur continue. Cette dernière section du chapitre aborde une classe de modèles fondamentalement différente : les **modèles génératifs**. Leur objectif n\'est pas de classifier des données existantes, mais d\'apprendre la distribution sous-jacente des données d\'entraînement afin de pouvoir en **générer** de nouvelles instances, plausibles et inédites.

### 44.4.1 Modèles Discriminatifs vs Génératifs : Une Distinction Fondamentale

La distinction entre ces deux familles de modèles peut être formalisée en termes de probabilités :

> **Modèles Discriminatifs :** Ils apprennent la probabilité conditionnelle P(Y∣X). Étant donné une entrée X, quelle est la probabilité de la sortie Y? Ils se concentrent sur l\'apprentissage de la **frontière de décision** entre les classes. La plupart des modèles d\'apprentissage supervisé que nous avons vus (MLP pour la classification, CNNs, RNNs) sont de nature discriminative.
>
> **Modèles Génératifs :** Ils apprennent la probabilité conjointe P(X,Y) ou, dans le cas non supervisé, la distribution des données elles-mêmes, P(X). Ils cherchent à modéliser la manière dont les données sont générées. Une fois que P(X) est apprise, on peut en tirer des échantillons pour créer de nouvelles données.

Les modèles génératifs sont souvent plus complexes et nécessitent plus de données, mais ils sont aussi plus puissants. Leurs applications vont bien au-delà de la simple génération de contenu (images, texte, musique) ; ils sont également utilisés pour la détection d\'anomalies (un point de données avec une très faible probabilité sous P(X) est probablement une anomalie), l\'imputation de données manquantes, et même dans des cadres d\'apprentissage semi-supervisé. Nous allons nous concentrer sur deux des architectures génératives profondes les plus influentes : les Auto-encodeurs Variationnels (VAE) et les Réseaux Antagonistes Génératifs (GAN).

### 44.4.2 Les Auto-encodeurs Variationnels (VAE)

Les Auto-encodeurs Variationnels (VAE) sont des modèles génératifs qui s\'appuient sur l\'architecture des auto-encodeurs standards, mais en y ajoutant une couche de rigueur probabiliste inspirée de l\'inférence bayésienne variationnelle.

#### L\'Intuition : Un Auto-encodeur Probabiliste

Un auto-encodeur standard est un réseau de neurones non supervisé composé de deux parties : un **encodeur** qui comprime les données d\'entrée x en une représentation de faible dimension dans un **espace latent** z, et un **décodeur** qui tente de reconstruire l\'entrée originale x\^ à partir de cette représentation latente z. Il est entraîné à minimiser l\'erreur de reconstruction entre

x et x\^.

Cependant, l\'espace latent d\'un auto-encodeur standard n\'est généralement pas structuré de manière à permettre une génération de données cohérente. Il peut y avoir des \"trous\" ; des points dans l\'espace latent qui, une fois décodés, ne produisent rien de significatif. Le VAE résout ce problème en forçant l\'espace latent à être continu et bien organisé. Il ne mappe pas l\'entrée à un unique point dans l\'espace latent, mais à une **distribution de probabilité** sur cet espace.

#### Architecture et Approche Probabiliste

L\'architecture d\'un VAE est la suivante :

> L\'**encodeur** (aussi appelé réseau d\'inférence ou de reconnaissance) prend une entrée x et produit les paramètres d\'une distribution de probabilité dans l\'espace latent. Typiquement, on suppose que cette distribution est une Gaussienne, donc l\'encodeur produit un vecteur de moyennes μ et un vecteur de log-variances log(σ2).
>
> Un point latent z est ensuite **échantillonné** de cette distribution, c\'est-à-dire z∼N(μ,σ2I).
>
> Le **décodeur** (aussi appelé réseau génératif) prend ce point latent z en entrée et reconstruit l\'échantillon de données x\^.

#### La Fonction de Coût ELBO (Evidence Lower Bound)

L\'entraînement du VAE se fait en optimisant une fonction de coût spécifique dérivée de la théorie de l\'information, appelée **Evidence Lower Bound (ELBO)**. La minimisation de la perte (qui est l\'opposé de l\'ELBO) accomplit deux objectifs simultanément  :

> **Perte de reconstruction :** Ce terme mesure la différence entre l\'entrée originale x et la sortie reconstruite x\^. Il s\'agit généralement de l\'erreur quadratique moyenne pour des données réelles ou de l\'entropie croisée pour des données binaires. Ce terme pousse le VAE à encoder suffisamment d\'informations dans z pour pouvoir reconstruire fidèlement x.
>
> **Divergence de Kullback-Leibler (KL) :** Ce terme agit comme un régularisateur. Il mesure la \"distance\" entre la distribution apprise par l\'encodeur pour une entrée donnée, q(z∣x)=N(μ,σ2I), et une distribution a priori simple, généralement une Gaussienne centrée réduite, p(z)=N(0,I). En minimisant cette divergence KL, on force l\'encodeur à produire des distributions qui sont proches de la distribution a priori. Cela a pour effet d\'organiser l\'espace latent : les encodages des différentes entrées sont regroupés autour de l\'origine, créant un espace continu et dense qui est propice à la génération.

#### L\'Astuce de Reparamétrisation (Reparameterization Trick)

Un défi majeur dans l\'entraînement du VAE est que le gradient ne peut pas être rétropropagé à travers l\'étape d\'échantillonnage aléatoire. L\'astuce de reparamétrisation est une solution ingénieuse à ce problème. Au lieu d\'échantillonner directement z à partir de la distribution N(μ,σ2I), on externalise l\'aléa. On échantillonne un bruit ϵ à partir d\'une distribution standard fixe N(0,I), puis on calcule z de manière déterministe :

z=μ+σ⊙ϵ

où ⊙ est la multiplication élément par élément. Le résultat z suit toujours la distribution désirée, mais le chemin de calcul de z à partir de μ et σ est maintenant déterministe et différentiable. Le gradient peut donc circuler de la perte de reconstruction, à travers le décodeur, à travers z, jusqu\'aux paramètres μ et σ de l\'encodeur, permettant l\'entraînement de l\'ensemble du modèle de bout en bout.75

Les VAE représentent une approche d\'inférence élégante pour la modélisation générative. Ils apprennent un espace latent structuré et interprétable. Cependant, ils ont tendance à produire des résultats (en particulier des images) qui sont un peu flous, car la perte de reconstruction moyennée sur la distribution latente favorise des solutions conservatrices.

### 44.4.3 Les Réseaux Antagonistes Génératifs (GAN)

Introduits par Ian Goodfellow et ses collaborateurs en 2014, les **Réseaux Antagonistes Génératifs (GAN)** proposent une approche radicalement différente et puissante pour la modélisation générative, basée sur la théorie des jeux.

#### L\'Intuition : Un Jeu à Deux Joueurs

Un GAN est composé de deux réseaux de neurones qui sont entraînés en compétition l\'un contre l\'autre  :

> **Le Générateur (G) :** Son rôle est celui d\'un \"faussaire\". Il prend en entrée un vecteur de bruit aléatoire z (provenant d\'un espace latent simple) et sa tâche est de le transformer en une donnée synthétique x\^=G(z) qui ressemble le plus possible aux vraies données.
>
> **Le Discriminateur (D) :** Son rôle est celui d\'un \"expert\" ou d\'un \"policier\". Il reçoit en entrée soit une vraie donnée x de l\'ensemble d\'entraînement, soit une fausse donnée x\^ du générateur. Sa tâche est de déterminer si la donnée qu\'il voit est réelle ou synthétique.

L\'entraînement est un processus dynamique. Le discriminateur s\'améliore en apprenant à mieux distinguer le vrai du faux. Le générateur, en retour, reçoit le signal du discriminateur (le gradient de la perte) et s\'améliore en apprenant à produire des données de plus en plus réalistes pour tromper le discriminateur.

#### Le Jeu Minimax

Ce processus est formalisé comme un jeu minimax à deux joueurs. Le discriminateur D veut maximiser la probabilité de classer correctement les vraies et les fausses données, tandis que le générateur G veut minimiser la probabilité que le discriminateur détecte ses créations. La fonction de valeur V(D,G) du jeu est :

Gmin​Dmax​V(D,G)=Ex∼pdata​(x)​+Ez∼pz​(z)​

> Le terme maxD​ signifie que le discriminateur veut maximiser cette valeur. Pour une entrée réelle x, il veut que D(x) soit proche de 1. Pour une entrée fausse G(z), il veut que D(G(z)) soit proche de 0, ce qui maximise log(1−D(G(z))).
>
> Le terme minG​ signifie que le générateur veut minimiser cette valeur. Il ne peut influencer que le second terme. Pour minimiser log(1−D(G(z))), il doit faire en sorte que D(G(z)) soit le plus proche possible de 1, c\'est-à-dire qu\'il doit tromper le discriminateur en lui faisant croire que ses données sont réelles.

L\'entraînement se fait de manière alternée : on fixe le générateur et on entraîne le discriminateur pour quelques étapes (montée de gradient), puis on fixe le discriminateur et on entraîne le générateur pour une étape (descente de gradient).

#### Convergence et Défis

En théorie, ce jeu atteint un **équilibre de Nash** où le générateur a appris à reproduire parfaitement la distribution des données réelles. À ce point, ses sorties sont indiscernables des vraies données, et le discriminateur est complètement confus, produisant une probabilité de 0.5 pour n\'importe quelle entrée.

En pratique, l\'entraînement des GANs est notoirement instable et difficile. Les principaux défis incluent :

> **Non-convergence :** Les paramètres des deux réseaux peuvent osciller sans jamais atteindre un équilibre stable.
>
> **Effondrement de mode (Mode Collapse) :** C\'est un problème courant où le générateur découvre une ou quelques sorties qui trompent particulièrement bien le discriminateur et se met à ne produire que cette faible variété d\'échantillons, au lieu d\'apprendre toute la diversité de la distribution des données.
>
> **Disparition du gradient :** Si le discriminateur devient trop fort trop rapidement, il peut rejeter les sorties du générateur avec une très grande confiance. Le gradient renvoyé au générateur devient alors très faible, et ce dernier cesse d\'apprendre.

Malgré ces défis, les GANs et leurs nombreuses variantes (DCGAN, StyleGAN, CycleGAN) ont produit des résultats d\'un réalisme saisissant, en particulier dans la génération d\'images, et ont redéfini l\'état de l\'art dans le domaine des modèles génératifs.

Les VAE et les GAN incarnent deux philosophies distinctes de la génération. Le VAE adopte une approche basée sur l\'inférence probabiliste, cherchant à modéliser explicitement une distribution via l\'optimisation de la vraisemblance. Le GAN, quant à lui, utilise une approche basée sur la théorie des jeux, où la notion de \"réalisme\" n\'est pas définie par une fonction de perte fixe comme la MSE, mais est apprise dynamiquement par le discriminateur. C\'est cette fonction de perte adaptative qui permet aux GANs de capturer les textures et les structures complexes du monde réel avec une fidélité que les fonctions de perte basées sur les pixels peinent à atteindre.



---

### Références croisées

- **Modeles fondateurs et IA a grande echelle** : voir aussi [Chapitre 1.55 -- Modeles Fondateurs et Ingenierie de l'IA a Grande Echelle](../Volume_VII_Technologies_Emergentes_Frontieres/Chapitre_I.55_Modeles_Fondateurs_IA.md)
- **Google Cloud Vertex AI** : voir aussi [Chapitre II.6 -- Google Cloud Vertex AI](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.6_Google_Cloud_Vertex_AI.md)
