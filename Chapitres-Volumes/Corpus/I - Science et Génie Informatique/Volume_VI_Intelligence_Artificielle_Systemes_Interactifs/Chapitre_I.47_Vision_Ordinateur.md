# Chapitre I.47 : Vision par Ordinateur

## 47.1 Traitement d\'images : Des pixels aux contours

La vision par ordinateur, en tant que discipline scientifique, ambitionne de doter les machines d\'une capacité d\'interprétation et de compréhension du monde visuel analogue, voire supérieure, à celle de l\'humain. À la base de cette quête se trouve une entité fondamentale : l\'image numérique. Avant de pouvoir reconnaître des objets, suivre des mouvements ou reconstruire des scènes en trois dimensions, il est impératif de maîtriser les opérations les plus élémentaires qui permettent de manipuler, de transformer et d\'analyser cette représentation discrète de notre réalité. Cette section inaugurale pose les fondations mathématiques et algorithmiques sur lesquelles repose l\'ensemble du champ. Nous débuterons par une définition formelle de l\'image numérique, la présentant comme une structure de données --- une matrice ou un tenseur --- sur laquelle des opérations peuvent être appliquées. L\'opération de convolution 2D sera ensuite introduite, non pas comme une simple technique, mais comme le concept unificateur qui relie le traitement d\'images \"classique\" aux architectures d\'apprentissage profond qui dominent aujourd\'hui le domaine. Nous explorerons comment cette unique opération, par le biais de noyaux spécifiquement conçus, permet de réaliser des tâches de filtrage essentielles, telles que le lissage pour la réduction du bruit ou le rehaussement des détails. Enfin, nous culminerons avec l\'étude de l\'algorithme de détection de contours de Canny, un exemple paradigmatique d\'un pipeline multi-étapes intelligent, conçu pour extraire une information sémantique de haut niveau --- les frontières des objets --- à partir des simples valeurs d\'intensité des pixels. Ce parcours, du pixel au contour, illustre une progression fondamentale en vision par ordinateur : la transformation de données brutes en représentations structurées et signifiantes.

### 47.1.1 Fondements de l\'image numérique

Le traitement d\'image (en anglais, *image processing*) consiste à appliquer des transformations mathématiques sur des images numériques dans le but d\'améliorer leur qualité ou d\'en extraire de l\'information. Pour ce faire, il est essentiel de comprendre la nature même de l\'objet que nous manipulons.

**Définition formelle**

Une image numérique est une représentation d\'une image bidimensionnelle sous une forme finie et discrète, accessible à un ordinateur. Formellement, elle peut être définie comme une fonction I(x,y) où (x,y) sont des coordonnées spatiales discrètes, et la valeur de la fonction I à ces coordonnées, I(x,y), est une mesure de l\'intensité ou de la couleur du point correspondant. Ces éléments fondamentaux de l\'image, situés à chaque coordonnée

(x,y), sont appelés **pixels**, une contraction de l\'anglais *picture element*.

**Représentation matricielle et types d\'images**

Dans la pratique, une image numérique est stockée et manipulée comme une matrice (ou un tableau à deux dimensions) où chaque élément correspond à un pixel. La nature des valeurs contenues dans cette matrice définit le type de l\'image :

> **Image binaire :** C\'est la forme la plus simple. Chaque pixel ne peut prendre que deux valeurs, typiquement 0 pour le noir et 1 pour le blanc. Elle est représentée par une matrice de 0 et de 1. Ce type d\'image est souvent le résultat d\'un processus de seuillage.
>
> **Image en niveaux de gris (*grayscale*) :** Chaque pixel représente une intensité lumineuse, sans information de couleur. Les valeurs des pixels sont généralement des entiers quantifiés sur un certain nombre de bits. Le standard le plus courant est l\'encodage sur 8 bits, ce qui permet 256 niveaux d\'intensité distincts, allant de 0 (noir absolu) à 255 (blanc absolu). L\'image est donc une matrice unique de dimensions\
> H×W, où H est la hauteur et W la largeur de l\'image en pixels.
>
> **Image en couleur :** Pour représenter la couleur, plusieurs canaux d\'intensité sont combinés. Le modèle le plus répandu est le modèle **RVB (Rouge, Vert, Bleu)**, ou RGB en anglais. Ce modèle est additif, signifiant que les couleurs sont créées en additionnant différentes intensités de ces trois couleurs primaires. Une image couleur RVB est donc représentée non pas par une seule matrice, mais par trois matrices de dimensions\
> H×W, une pour chaque canal de couleur. On peut ainsi la conceptualiser comme un tenseur de dimensions H×W×3. Chaque pixel\
> (x,y) est défini par un triplet de valeurs (R,V,B), par exemple (255, 0, 0) pour un rouge pur ou (255, 255, 255) pour le blanc. D\'autres espaces colorimétriques existent, comme le modèle\
> **YUV**, qui sépare la luminance (Y, l\'intensité lumineuse) des informations de chrominance (U et V, la couleur). Ce découplage est particulièrement utile en compression vidéo et dans certaines applications de traitement d\'images.

**L\'histogramme d\'image**

Un outil d\'analyse fondamental pour une image en niveaux de gris est son **histogramme**. L\'histogramme est une fonction discrète h(i) qui donne le nombre de pixels ni​ ayant une intensité spécifique i dans l\'image. Il s\'agit donc d\'un graphique représentant la distribution des niveaux de gris.

L\'histogramme fournit une information globale et statistique sur l\'image : une image sombre aura un histogramme concentré vers les faibles intensités, tandis qu\'une image claire aura un histogramme concentré vers les hautes intensités. Une image à faible contraste aura un histogramme resserré sur une petite plage de valeurs. Des techniques comme l\'**égalisation d\'histogramme** visent à étaler cet histogramme sur toute la plage dynamique pour augmenter le contraste global de l\'image.

Cependant, l\'histogramme a une limitation majeure : il perd toute information spatiale. Deux images structurellement très différentes peuvent avoir exactement le même histogramme. Il nous renseigne sur la composition tonale de l\'image, mais pas sur l\'agencement des pixels qui la composent.

### 47.1.2 L\'opération de convolution 2D : Le cœur du traitement spatial

Alors que l\'histogramme offre une vue globale, la plupart des opérations de traitement d\'images de bas niveau sont locales : la nouvelle valeur d\'un pixel est calculée en fonction de sa valeur et de celles de ses voisins. L\'outil mathématique qui formalise cette opération de voisinage est la **convolution**.

La convolution est sans doute l\'opération la plus fondamentale en traitement d\'images et en vision par ordinateur. Elle est au cœur des filtres classiques que nous allons étudier, mais elle constitue également le bloc de construction essentiel des réseaux de neurones convolutifs (CNNs), les architectures qui ont révolutionné le domaine. Comprendre la convolution, c\'est donc jeter un pont entre les fondements classiques et les techniques de pointe.

**Définition mathématique**

La convolution discrète 2D est une opération qui combine une image d\'entrée I avec une petite matrice appelée **noyau** (ou *kernel* en anglais), notée K, pour produire une image de sortie O. Mathématiquement, elle se définit comme suit  :

O(x,y)=(I∗K)(x,y)=i=−∞∑∞​j=−∞∑∞​I(x−i,y−j)K(i,j)

Dans le contexte d\'images et de noyaux de tailles finies, si le noyau K a des dimensions (2a+1)×(2b+1), la formule devient :

O(x,y)=i=−a∑a​j=−b∑b​I(x−i,y−j)K(i,j)

Il est important de noter que la définition mathématique de la convolution implique un retournement du noyau (K(i,j) est appliqué à I(x−i,y−j)). Dans de nombreuses implémentations, notamment en apprentissage profond, on utilise plutôt la **corrélation croisée**, qui n\'effectue pas ce retournement. Si le noyau est symétrique (par exemple, un noyau gaussien), les deux opérations sont équivalentes. Dans le cas contraire, les résultats diffèrent, bien que la distinction soit souvent gommée dans la terminologie des CNNs où l\'opération est systématiquement appelée \"convolution\".

**Intuition visuelle et paramètres clés**

L\'opération de convolution peut être visualisée comme une \"fenêtre glissante\". Le noyau, qui est généralement beaucoup plus petit que l\'image (par exemple, 3x3 ou 5x5 pixels), est superposé à une région de l\'image d\'entrée, en commençant par le coin supérieur gauche. On effectue alors une multiplication élément par élément entre les valeurs du noyau et les valeurs des pixels de l\'image qu\'il recouvre. La somme de tous ces produits donne la valeur d\'un seul pixel dans l\'image de sortie. Le noyau est ensuite décalé sur l\'image d\'entrée, et le processus est répété jusqu\'à ce que toute l\'image ait été parcourue. Le résultat est une nouvelle image, souvent appelée

**carte de caractéristiques** (*feature map*), qui représente la réponse de l\'image au filtre défini par le noyau.

Cette opération est contrôlée par trois hyperparamètres principaux :

> **Le Noyau (Kernel) :** C\'est une petite matrice de poids qui définit la transformation à appliquer. La nature du noyau détermine l\'effet du filtre : flou, rehaussement de contours, etc. Sa taille est typiquement impaire (3x3, 5x5) pour qu\'il possède un pixel central, ce qui permet d\'aligner la sortie avec l\'entrée sans décalage spatial.
>
> **La Foulée (Stride) :** Ce paramètre définit le nombre de pixels de décalage du noyau à chaque étape de son glissement sur l\'image. Une foulée de 1 (le cas le plus courant) signifie que le noyau se déplace d\'un pixel à la fois. Une foulée supérieure à 1 a pour effet de sous-échantillonner la sortie, produisant une carte de caractéristiques de dimensions spatiales réduites. Par exemple, avec une foulée de 2, la hauteur et la largeur de la sortie seront environ divisées par deux.
>
> **Le Bourrage (Padding) :** Lorsque le noyau est appliqué aux bords de l\'image, une partie de celui-ci se retrouve en dehors des limites de l\'image. Sans traitement particulier, l\'image de sortie serait plus petite que l\'image d\'entrée. De plus, les pixels sur les bords de l\'image seraient moins pris en compte dans le calcul que les pixels centraux. Pour pallier ces problèmes, on utilise le bourrage, qui consiste à ajouter des pixels (généralement de valeur 0, d\'où le nom de *zero-padding*) autour de l\'image d\'entrée. Un bourrage bien choisi permet de conserver les dimensions spatiales de l\'image après la convolution, ce qui est crucial dans les architectures de réseaux de neurones profonds pour empiler de nombreuses couches. La taille du bourrage\
> P nécessaire pour conserver les dimensions avec un noyau de taille K×K et une foulée de 1 est donnée par P=(K−1)/2.

La convolution est une opération linéaire et invariante par translation, ce qui signifie que le même filtre est appliqué à chaque position de l\'image. C\'est cette propriété qui permet aux CNNs d\'apprendre des motifs (caractéristiques) et de les détecter n\'importe où dans l\'image.

### 47.1.3 Filtrage spatial : Modifier l\'image par son voisinage

Le filtrage spatial est l\'application de la convolution avec des noyaux spécifiquement conçus pour obtenir un effet désiré sur l\'image. En se basant sur la théorie du traitement du signal, on peut classer ces filtres en fonction de leur effet sur les fréquences spatiales de l\'image. Les basses fréquences correspondent aux zones d\'intensité uniforme ou à variation lente, tandis que les hautes fréquences correspondent aux changements brusques d\'intensité, comme les contours, les détails fins et le bruit.

**Filtres passe-bas : Lissage et réduction du bruit**

Un filtre passe-bas a pour objectif d\'atténuer ou de supprimer les hautes fréquences spatiales d\'une image, tout en laissant passer les basses fréquences. L\'effet principal de ce type de filtre est un

**lissage** ou un **flou**. En moyennant les valeurs des pixels dans un voisinage, les variations rapides sont atténuées, ce qui a pour conséquence de réduire l\'impact du bruit et d\'estomper les détails fins.

L\'exemple le plus emblématique de filtre passe-bas est le **filtre gaussien**. Le noyau de ce filtre est généré à partir d\'une fonction gaussienne 2D :

G(x,y)=2πσ21​e−2σ2x2+y2​

où (x,y) sont les distances par rapport au centre du noyau et σ est l\'écart-type de la gaussienne. Un noyau discret est créé en échantillonnant cette fonction sur une grille (par exemple, 5x5) et en normalisant la somme de ses éléments à 1 pour conserver la luminosité globale de l\'image. Le paramètre σ contrôle l\'intensité du flou : un σ plus grand produit un noyau plus étalé et donc un flou plus prononcé.

Par exemple, un noyau gaussien 3x3 avec σ=1 pourrait ressembler à :

KGauss​=161​​121​242​121​​

L\'application de ce filtre par convolution sur une image va remplacer chaque pixel par une moyenne pondérée de son voisinage, où les poids sont plus élevés pour les pixels centraux, conformément à la forme en cloche de la gaussienne. Cette opération est la première étape cruciale de nombreux algorithmes, notamment le détecteur de contours de Canny, car elle permet de stabiliser le calcul des dérivées en présence de bruit.

**Filtres passe-haut : Rehaussement des détails et des contours**

À l\'opposé, un filtre passe-haut accentue les hautes fréquences spatiales. Il a pour effet de rehausser les détails, d\'aiguiser les contours et, par conséquent, d\'amplifier le bruit présent dans l\'image. Les régions uniformes de l\'image sont atténuées ou supprimées par cette procédure.

Ces filtres sont souvent basés sur des approximations de la dérivée seconde de l\'image, comme l\'**opérateur de Laplace**. Un noyau laplacien typique est :

KLaplace​=​010​1−41​010​​ou​111​1−81​111​​

La somme des coefficients de ce noyau est nulle. Lorsqu\'il est appliqué à une région d\'intensité constante, le résultat de la convolution est zéro. En revanche, au niveau d\'un contour (un changement brusque d\'intensité), la réponse sera forte et non nulle. L\'image résultante d\'un filtrage laplacien met en évidence les contours et les détails fins. Pour réaliser un rehaussement de l\'image originale, on peut soustraire l\'image filtrée par le laplacien de l\'image originale, ce qui a pour effet d\'aiguiser les contours.

Ces deux types de filtres, passe-bas et passe-haut, illustrent la puissance de la convolution avec des noyaux \"faits main\". Ils permettent de manipuler le contenu fréquentiel d\'une image pour des tâches spécifiques d\'amélioration ou d\'extraction de caractéristiques.

### 47.1.4 Détection de contours : L\'algorithme de Canny

Les contours, qui correspondent aux frontières des objets dans une scène, sont des caractéristiques sémantiques de première importance. Ils sont caractérisés par une discontinuité, ou un changement rapide, de l\'intensité lumineuse. Mathématiquement, un tel changement correspond à un maximum local de la magnitude du gradient de l\'image.

Les premiers opérateurs de détection de contours, comme les **opérateurs de Prewitt et de Sobel**, sont des filtres de convolution conçus pour approximer la dérivée première de l\'image dans les directions horizontale (Gx​) et verticale (Gy​). Par exemple, les noyaux de Sobel sont :

KSobel,x​=​−1−2−1​000​121​​etKSobel,y​=​−101​−202​−101​​

En convoluant l\'image avec ces deux noyaux, on obtient deux cartes de gradient, Gx​ et Gy​. La magnitude du gradient en chaque pixel est alors G=Gx2​+Gy2​​, et son orientation est θ=arctan(Gy​/Gx​). Une magnitude de gradient élevée indique la présence probable d\'un contour.

Cependant, ces opérateurs simples souffrent de plusieurs défauts : ils sont très sensibles au bruit et produisent des contours épais et mal définis. C\'est dans ce contexte que John Canny a proposé en 1986 un algorithme multi-étapes qui est devenu la référence en matière de détection de contours. L\'approche de Canny est remarquable car elle a été conçue pour être \"optimale\" selon trois critères explicites  :

> **Bonne détection :** Le taux d\'erreur doit être faible, c\'est-à-dire que l\'algorithme doit marquer le plus de vrais contours possible tout en marquant le moins de faux contours possible.
>
> **Bonne localisation :** Les points marqués comme contours doivent être aussi proches que possible du centre du vrai contour.
>
> **Réponse unique :** Un seul contour dans l\'image ne doit pas donner lieu à plusieurs réponses (pas de contours multiples).

Cette démarche illustre une tendance fondamentale en vision par ordinateur : la recherche de la robustesse par la conception de pipelines intelligents où chaque étape résout un problème spécifique. L\'algorithme de Canny n\'est pas une opération unique, mais une cascade de décisions qui raffinent progressivement le résultat.

**Les étapes détaillées de l\'algorithme de Canny**

L\'algorithme se décompose en quatre étapes principales  :

> **Réduction du bruit :** La première étape consiste à lisser l\'image avec un filtre gaussien. Le calcul du gradient est une opération de différenciation, qui est par nature très sensible au bruit. Sans lissage préalable, le bruit dans l\'image créerait de nombreux faux contours. L\'application d\'un flou gaussien atténue ce bruit et prépare l\'image pour un calcul de gradient plus stable. La taille du filtre gaussien (contrôlée par son écart-type σ) est un paramètre important : un filtre plus grand réduit davantage le bruit mais peut aussi estomper et déplacer légèrement les contours les plus fins.
>
> **Calcul de la magnitude et de l\'orientation du gradient :** Une fois l\'image lissée, l\'algorithme calcule l\'intensité (magnitude) et la direction du gradient pour chaque pixel, en utilisant des filtres de type Sobel. On obtient ainsi deux cartes : une carte de magnitude, où les valeurs élevées indiquent des changements d\'intensité importants, et une carte d\'orientation, qui indique la direction de ces changements (perpendiculaire au contour).
>
> **Suppression des non-maxima :** L\'image de magnitude du gradient produit des arêtes larges. Pour satisfaire le critère de réponse unique et obtenir des contours d\'une épaisseur d\'un seul pixel, une étape d\'amincissement est nécessaire. C\'est le rôle de la suppression des non-maxima. Pour chaque pixel, on examine sa magnitude de gradient. On regarde ensuite la direction du gradient en ce point (quantifiée, par exemple, en quatre directions : horizontale, verticale, et les deux diagonales). On compare alors la magnitude du pixel courant avec celle de ses deux voisins situés le long de cette direction de gradient. Si la magnitude du pixel courant n\'est pas un maximum local (c\'est-à-dire, si elle n\'est pas plus grande que celle de ses deux voisins), sa valeur est mise à zéro. Autrement, elle est conservée. Ce processus ne garde que les \"crêtes\" les plus fines de la carte de gradient.
>
> **Seuillage par hystérésis :** La dernière étape consiste à décider quels pixels de la carte des maxima locaux sont de vrais contours et lesquels sont dus au bruit ou à des variations de texture non significatives. Plutôt que d\'utiliser un seuil unique, qui rendrait difficile la distinction entre contours faibles mais réels et bruit, Canny a proposé un seuillage à deux niveaux, ou seuillage par hystérésis. Deux seuils sont définis : un seuil haut (Thigh​) et un seuil bas (Tlow​).

Tout pixel dont la magnitude de gradient est supérieure à Thigh​ est immédiatement considéré comme un pixel de contour \"fort\" et est inclus dans le résultat final.

Tout pixel dont la magnitude est inférieure à Tlow​ est immédiatement rejeté.

Un pixel dont la magnitude se situe entre Tlow​ et Thigh​ est considéré comme un pixel de contour \"faible\". Il n\'est inclus dans le résultat final que s\'il est connecté (directement ou indirectement, via d\'autres pixels faibles) à un pixel de contour fort.

Cette technique permet de \"suivre\" les contours. Les segments de contours forts agissent comme des points d\'ancrage, et l\'algorithme connecte les segments plus faibles qui leur sont adjacents, tout en ignorant les pixels de bruit isolés qui, même s\'ils ont un gradient modéré, ne sont connectés à rien de significatif. Le résultat final est une image binaire de contours fins et bien connectés.

L\'algorithme de Canny, par sa conception rigoureuse, reste un outil de détection de contours extrêmement performant et largement utilisé, même à l\'ère de l\'apprentissage profond, souvent comme une étape de prétraitement ou pour l\'évaluation de méthodes plus modernes.

## 47.2 Extraction de caractéristiques : L\'ère des descripteurs \"faits main\"

Avec la capacité d\'extraire des informations fondamentales comme les contours, la vision par ordinateur s\'est ensuite attaquée à des tâches de plus haut niveau, telles que la reconnaissance d\'objets, la mise en correspondance d\'images pour la stéréovision ou la création de panoramas. Pour ces applications, comparer des images entières pixel par pixel est à la fois inefficace du point de vue calculatoire et extrêmement fragile face aux transformations les plus simples. Une photographie du même objet prise sous un angle différent, à une autre échelle ou sous un éclairage changeant, produira des matrices de pixels radicalement différentes. La solution à ce problème a défini une ère entière de la vision par ordinateur, celle de l\'ingénierie manuelle de caractéristiques (*hand-crafted features*). L\'idée centrale est de ne plus travailler sur l\'image brute, mais d\'en extraire un ensemble de \"points d\'intérêt\" saillants et de les décrire d\'une manière qui soit robuste --- ou invariante --- à ces transformations. Cette section explore ce paradigme, qui a culminé avec le développement de l\'algorithme SIFT (Scale-Invariant Feature Transform). SIFT n\'est pas seulement un algorithme ; il représente l\'apogée d\'une philosophie où l\'intuition humaine et une expertise profonde en géométrie et en traitement du signal sont méticuleusement employées pour encoder, étape par étape, les propriétés d\'invariance souhaitées dans un descripteur numérique. Nous disséquerons en détail ce monument algorithmique, puis nous présenterons son successeur, SURF (Speeded Up Robust Features), qui illustre une autre vérité fondamentale en ingénierie : l\'importance cruciale de la vitesse de calcul pour l\'applicabilité pratique.

### 47.2.1 La quête de l\'invariance : Pourquoi des points d\'intérêt?

Pour des tâches comme la reconnaissance d\'un objet spécifique dans une scène encombrée ou l\'assemblage de plusieurs photos en un panorama, l\'approche globale consistant à analyser l\'image entière est vouée à l\'échec. L\'objet peut être partiellement occulté, vu sous un angle différent, ou apparaître plus petit ou plus grand. La solution consiste à adopter une approche locale : identifier des points d\'intérêt distinctifs sur l\'objet (par exemple, des coins, des \"blobs\" de texture) et les utiliser comme points d\'ancrage pour la reconnaissance et la mise en correspondance.

Ces points d\'intérêt, ou **keypoints**, doivent être détectables de manière répétée sur différentes images du même objet malgré les variations de prise de vue. Une fois un point d\'intérêt détecté, une région locale autour de ce point est analysée pour créer une signature numérique, appelée **descripteur**. Ce descripteur doit posséder des propriétés d\'invariance spécifiques pour être utile  :

> **Invariance à la translation :** Le descripteur est calculé localement autour du point d\'intérêt, donc sa position globale dans l\'image n\'a pas d\'importance.
>
> **Invariance à l\'échelle :** L\'objet peut apparaître plus grand ou plus petit. Le détecteur de points d\'intérêt doit être capable de trouver les mêmes points à différentes échelles, et le descripteur doit être calculé sur une région de taille proportionnelle à l\'échelle de détection.
>
> **Invariance à la rotation :** L\'objet peut être tourné dans le plan de l\'image. L\'algorithme doit assigner une orientation canonique au point d\'intérêt et calculer le descripteur par rapport à cette orientation.
>
> **Robustesse aux changements d\'illumination :** Le descripteur doit être insensible aux changements de luminosité et de contraste globaux (par exemple, passer d\'un éclairage intérieur à la lumière du jour).
>
> **Robustesse aux déformations affines :** Idéalement, le descripteur devrait également tolérer des changements de point de vue plus complexes (déformations perspectives).

La conception d\'un algorithme capable de satisfaire toutes ces exigences a été un défi majeur, brillamment relevé par David Lowe avec SIFT.

### 47.2.2 SIFT (Scale-Invariant Feature Transform) : L\'algorithme de référence

Proposé par David Lowe en 1999 et finalisé en 2004, l\'algorithme SIFT est une solution complète et intégrée qui a dominé le domaine de l\'extraction de caractéristiques locales pendant plus d\'une décennie. Sa robustesse et sa performance en ont fait la méthode de référence pour une multitude d\'applications, de la reconnaissance d\'objets à la reconstruction 3D. Le succès de SIFT repose sur un pipeline en quatre étapes majeures, chacune conçue pour conférer une propriété d\'invariance spécifique.

**1. Détection des extrema dans l\'espace des échelles**

La première étape vise à identifier des points d\'intérêt candidats qui sont stables à travers les changements d\'échelle. Pour ce faire, SIFT construit une représentation de l\'image à plusieurs échelles, appelée **espace des échelles** (*scale space*).

> **Construction de l\'espace des échelles :** L\'espace des échelles est généré en convoluant de manière répétée l\'image d\'entrée avec des filtres gaussiens dont l\'écart-type σ augmente progressivement. Cela produit une série d\'images de plus en plus floues. L\'image est ensuite sous-échantillonnée (sa taille est réduite de moitié), et le processus de floutage est répété. Chaque niveau de sous-échantillonnage est appelé une **octave**. Cette pyramide d\'images simule l\'observation de la scène à différentes distances.
>
> **Différence de Gaussiennes (DoG) :** Calculer les réponses à des filtres à différentes échelles est coûteux. Lowe a montré qu\'une approximation efficace du **Laplacien de Gaussienne (LoG)** normalisé, un excellent détecteur de \"blobs\" (régions de forme circulaire), pouvait être obtenue en calculant simplement la différence entre deux images gaussiennes voisines dans l\'espace des échelles : D(x,y,σ)=L(x,y,kσ)−L(x,y,σ), où L est l\'image convoluée avec un gaussien et k est un facteur constant. Cette opération, la\
> **Différence de Gaussiennes (DoG)**, est très rapide à calculer.
>
> **Détection des extrema locaux :** Les points d\'intérêt candidats sont identifiés comme étant les extrema (maxima ou minima) locaux dans l\'espace des échelles DoG. Pour ce faire, chaque pixel d\'une image DoG est comparé à ses 26 voisins : ses 8 voisins dans la même image, et les 9 voisins correspondants dans l\'image DoG de l\'échelle supérieure et de l\'échelle inférieure au sein de la même octave. Si un pixel est le plus grand ou le plus petit de tous ses 26 voisins, il est marqué comme un point d\'intérêt candidat. Le fait que la détection se fasse dans un volume 3D (deux dimensions spatiales + l\'échelle) garantit que les points détectés sont stables à la fois spatialement et à travers les échelles.

**2. Localisation précise des points clés**

La détection d\'extrema sur une grille discrète de pixels et d\'échelles produit des localisations imprécises. De plus, tous les extrema ne sont pas de bons points d\'intérêt. Cette deuxième étape a donc pour but de raffiner la position des candidats et d\'éliminer les points instables.

> **Affinage de la localisation :** Pour chaque point candidat, une expansion de Taylor du second ordre de la fonction DoG est utilisée pour interpoler la position de l\'extremum avec une précision sous-pixel et sous-échelle. Cela permet de trouver la localisation beaucoup plus précise du véritable maximum ou minimum.
>
> **Rejet des points de faible contraste :** Les points dont la valeur de la fonction DoG à l\'extremum interpolé est inférieure à un certain seuil sont rejetés. Ces points sont considérés comme peu distinctifs et instables, probablement dus au bruit.
>
> **Élimination des réponses sur les arêtes :** Les extrema de la DoG ont une forte réponse le long des arêtes, mais ces points sont mal localisés perpendiculairement à l\'arête. Pour éliminer ces points instables, SIFT utilise la **matrice Hessienne** 2x2 calculée au niveau du point d\'intérêt. Le ratio des valeurs propres de cette matrice donne une mesure de la courbure principale. Si ce ratio est supérieur à un certain seuil, cela signifie qu\'il y a une courbure principale beaucoup plus grande que l\'autre (caractéristique d\'une arête), et le point est rejeté. Seuls les points bien localisés dans toutes les directions (comme les coins) sont conservés.

**3. Assignation d\'une orientation**

À ce stade, nous avons des points d\'intérêt stables en position et en échelle. Pour atteindre l\'invariance à la rotation, il faut leur assigner une orientation canonique.

> **Calcul des gradients :** Pour chaque point clé, on considère une région voisine à l\'échelle correspondante. Dans cette région, on calcule la magnitude et l\'orientation du gradient pour chaque pixel.
>
> **Histogramme des orientations :** Un histogramme des orientations est créé, avec typiquement 36 classes (bins) couvrant les 360 degrés. Chaque pixel de la région voisine vote pour une classe d\'orientation, et son vote est pondéré par la magnitude de son gradient et par un poids gaussien qui décroît avec la distance au point clé.
>
> **Assignation de l\'orientation principale :** Le pic le plus élevé de cet histogramme lissé définit l\'orientation principale du point clé. Pour plus de robustesse, toute orientation dont le pic atteint au moins 80% du pic principal est également conservée, créant ainsi plusieurs points clés au même endroit et à la même échelle, mais avec des orientations différentes. Toutes les étapes suivantes seront effectuées par rapport à cette (ou ces) orientation(s), ce qui garantit l\'invariance à la rotation de l\'image.

**4. Création du descripteur de point clé**

La dernière étape consiste à générer une description unique et robuste pour chaque point clé (avec sa position, son échelle et son orientation).

> **Fenêtre de description :** Une fenêtre de 16x16 pixels est définie autour du point clé. Cette fenêtre est tournée pour s\'aligner avec l\'orientation principale assignée à l\'étape précédente. Les calculs de gradient à l\'intérieur de cette fenêtre sont donc effectués dans un système de coordonnées relatif, ce qui assure l\'invariance à la rotation.
>
> **Grille d\'histogrammes :** La fenêtre de 16x16 est divisée en une grille de 4x4 sous-régions (de 4x4 pixels chacune).
>
> **Calcul des histogrammes locaux :** Dans chaque sous-région, un histogramme de 8 orientations de gradient est calculé. Comme précédemment, les contributions sont pondérées par la magnitude du gradient. Cette division en sous-régions permet de capturer la structure spatiale de la distribution des gradients tout en tolérant de légères déformations.
>
> **Formation du vecteur SIFT :** Les 16 histogrammes de 8 classes sont concaténés pour former un unique vecteur de caractéristiques de 16×8=128 dimensions.
>
> **Normalisation :** Enfin, ce vecteur de 128 dimensions est normalisé à une longueur unitaire. Cette étape le rend robuste aux changements d\'illumination affines (changements de luminosité et de contraste). Une étape de seuillage est également appliquée pour réduire l\'influence des gradients très forts, par exemple dus à des changements d\'illumination non uniformes.

Le vecteur SIFT de 128 flottants qui en résulte est une signature très distinctive et robuste du voisinage du point d\'intérêt, prête à être utilisée pour la mise en correspondance avec les descripteurs d\'autres images.

### 47.2.3 SURF (Speeded Up Robust Features) : L\'alternative rapide

Bien que SIFT ait établi une norme de performance et de robustesse, son coût de calcul, principalement dû aux nombreuses convolutions gaussiennes, le rendait difficile à utiliser dans des applications en temps réel. C\'est ce besoin de vitesse qui a motivé le développement de SURF en 2006 par Herbert Bay et ses collègues. SURF n\'est pas une réinvention complète, mais plutôt une réingénierie astucieuse de SIFT, visant à approximer ses étapes clés avec des opérations beaucoup plus rapides. Cette démarche est un exemple classique en ingénierie et en informatique : lorsqu\'un algorithme performant mais lent existe, l\'innovation consiste souvent à trouver des approximations intelligentes qui préservent l\'essentiel de la performance tout en réduisant drastiquement la complexité de calcul.

Les deux innovations majeures de SURF sont l\'utilisation des images intégrales et l\'approximation des opérateurs gaussiens par des filtres en boîte.

**Images intégrales pour une convolution ultra-rapide**

L\'**image intégrale**, aussi connue sous le nom de *summed-area table*, est une structure de données qui permet de calculer la somme des intensités de pixels à l\'intérieur de n\'importe quel rectangle de l\'image en un temps constant, indépendamment de la taille du rectangle. La valeur de l\'image intégrale Iint​ au point (x,y) est la somme de tous les pixels situés dans le rectangle défini par l\'origine et le point (x,y). Une fois cette table pré-calculée (ce qui se fait en une seule passe sur l\'image), la somme des pixels dans un rectangle quelconque peut être obtenue avec seulement quatre accès à la table et trois opérations arithmétiques. Cette astuce est au cœur de l\'accélération de SURF.

**Détecteur \"Fast-Hessian\"**

Au lieu d\'utiliser la DoG pour approximer le LoG, SURF se base sur le **déterminant de la matrice Hessienne** pour détecter les points d\'intérêt de type \"blob\". La matrice Hessienne, qui utilise les dérivées secondes de l\'image, est également sensible aux blobs. L\'innovation de SURF est d\'approximer ces dérivées secondes non pas avec des filtres gaussiens, mais avec des **filtres en boîte** (*box filters*). Ces filtres sont composés de régions rectangulaires simples, et leurs réponses peuvent être calculées de manière extrêmement efficace en utilisant l\'image intégrale.

De plus, pour construire l\'espace des échelles, SURF adopte une approche différente de SIFT. Au lieu de réduire la taille de l\'image à chaque octave, SURF garde l\'image à sa taille originale et applique des filtres en boîte de tailles croissantes. Grâce aux images intégrales, l\'application d\'un grand filtre en boîte n\'est pas plus coûteuse que celle d\'un petit filtre, ce qui constitue un gain de vitesse considérable. Les maxima du déterminant de la Hessienne à travers les différentes échelles de filtres donnent les points d\'intérêt SURF.

**Descripteur basé sur les ondelettes de Haar**

Pour la description des points d\'intérêt, SURF s\'écarte également de l\'histogramme de gradients de SIFT.

> **Assignation de l\'orientation :** Une orientation est d\'abord assignée au point d\'intérêt en calculant les réponses à des **ondelettes de Haar** en x et y dans un voisinage circulaire. La direction dominante de ces réponses détermine l\'orientation du point.
>
> **Création du descripteur :** Une région carrée de 20s x 20s (où s est l\'échelle du point) est définie autour du point et orientée selon l\'orientation principale. Cette région est divisée en une grille de 4x4 sous-régions. Pour chaque sous-région, les réponses aux ondelettes de Haar en x et y sont calculées et sommées. Pour chaque sous-région, on stocke quatre valeurs : la somme des réponses en x, la somme des réponses en y, la somme de leurs valeurs absolues. Cela donne un descripteur de 4×4×4=64 dimensions, soit deux fois plus compact que celui de SIFT. Une version étendue à 128 dimensions existe également pour une plus grande distinctivité.

Grâce à ces approximations et à l\'utilisation intensive des images intégrales, SURF est plusieurs fois plus rapide que SIFT, tout en conservant une bonne robustesse, ce qui l\'a rendu très populaire pour les applications nécessitant une analyse en temps réel.

### Tableau comparatif : SIFT vs. SURF

Le tableau suivant synthétise les différences fondamentales entre SIFT et SURF, mettant en lumière le compromis entre la rigueur mathématique et la vitesse de calcul qui les distingue. Ce choix entre SIFT et SURF est emblématique des décisions que les ingénieurs en vision doivent souvent prendre : privilégier la précision maximale ou la performance en temps réel.

  ------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------
  Caractéristique                SIFT (Scale-Invariant Feature Transform)                                                                                                                                         SURF (Speeded-Up Robust Features)

  **Détecteur de points**        Différence de Gaussiennes (DoG), approximation du Laplacien de Gaussienne (LoG).                                                                                             Déterminant de la matrice Hessienne, approximé par des filtres en boîte.

  **Descripteur**                Histogrammes de gradients orientés (16 sous-régions x 8 orientations).                                                                                                       Sommes des réponses d\'ondelettes de Haar.

  **Dimension du descripteur**   128.                                                                                                                                                                         64 (ou 128 en version étendue).

  **Vitesse**                    Lente, en raison des convolutions gaussiennes itératives.                                                                                                                    Rapide, grâce à l\'utilisation des images intégrales.

  **Robustesse**                 Très robuste aux changements d\'échelle et de rotation. Souvent considéré comme plus précis et robuste, notamment face aux changements de point de vue et d\'illumination.   Robuste, mais généralement un peu moins performant que SIFT dans des conditions de transformation extrêmes. Très performant face au flou.

  **Innovation clé**             Construction rigoureuse de l\'espace des échelles pour une invariance théoriquement fondée.                                                                                      Utilisation des images intégrales pour une accélération massive des calculs de convolution avec des filtres en boîte.
  ------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------

En conclusion, SIFT reste la référence en termes de robustesse et de précision, ce qui en fait un excellent choix pour les applications hors ligne où la qualité des correspondances est primordiale. SURF, quant à lui, offre un compromis exceptionnel entre vitesse et performance, le rendant idéal pour les systèmes embarqués et les applications en temps réel où la latence est un facteur critique.

## 47.3 Détection d\'objets : Des propositions de régions à la prédiction unique

L\'avènement de l\'apprentissage profond, et en particulier des réseaux de neurones convolutifs (CNNs), a provoqué un changement de paradigme radical en vision par ordinateur. Alors que l\'ère précédente, incarnée par SIFT et SURF, reposait sur l\'ingénierie manuelle de caractéristiques, les CNNs ont introduit la capacité d\'**apprendre** automatiquement les caractéristiques pertinentes directement à partir des données. Cette capacité a transformé toutes les tâches de la vision, mais son impact a été particulièrement spectaculaire dans le domaine de la détection d\'objets.

Cette section retrace l\'évolution fulgurante des détecteurs d\'objets basés sur l\'apprentissage profond. Nous commencerons par les approches pionnières à deux étapes, comme la famille des R-CNN, qui suivaient une logique intuitive : d\'abord générer des propositions de régions potentiellement intéressantes, puis classifier le contenu de ces régions. Bien que très précises, leur complexité et leur lenteur ont ouvert la voie à une véritable révolution : les détecteurs à une étape (*single-shot detectors*). Des architectures comme YOLO (You Only Look Once) et SSD (Single Shot MultiBox Detector) ont repensé le problème fondamentalement. Plutôt que de suivre un pipeline séquentiel, elles traitent la détection comme un problème de régression unique et massivement parallèle, prédisant toutes les boîtes englobantes et les classes en une seule passe du réseau. Ce passage d\'un processus délibératif en deux temps à une prédiction instantanée a non seulement permis d\'atteindre des vitesses en temps réel, mais il a aussi illustré la puissance des réseaux profonds pour apprendre des tâches complexes de bout en bout. Nous verrons que, une fois ce paradigme établi, la principale innovation a consisté à mieux gérer la détection d\'objets à différentes échelles, un défi au cœur des différences architecturales entre YOLO et SSD.

### 47.3.1 Définition de la tâche et métriques

La détection d\'objets est une tâche plus complexe que la classification d\'images. Alors que la classification répond à la question \"Quel objet se trouve dans cette image?\", la détection d\'objets doit répondre à deux questions simultanément : \"Quels objets se trouvent dans cette image?\" et \"Où se trouvent-ils?\". La réponse à la seconde question est fournie sous la forme d\'une **boîte englobante** (*bounding box*), généralement définie par les coordonnées de son coin supérieur gauche et ses dimensions (largeur et hauteur), ou par les coordonnées de deux coins opposés.

Pour évaluer la performance d\'un détecteur d\'objets, deux métriques principales sont utilisées :

> **Intersection sur Union (IoU) :** Pour une prédiction donnée, l\'IoU mesure le degré de chevauchement entre la boîte englobante prédite (Bp​) et la boîte englobante de vérité terrain (Bgt​). Elle est définie comme le rapport de l\'aire de leur intersection sur l\'aire de leur union :\
> IoU(Bp​,Bgt​)=Area(Bp​∪Bgt​)Area(Bp​∩Bgt​)​\
> Une prédiction est généralement considérée comme correcte (un \"Vrai Positif\", TP) si son IoU avec la vérité terrain dépasse un certain seuil (souvent 0.5).
>
> **Précision Moyenne (mAP - mean Average Precision) :** C\'est la métrique standard pour évaluer la performance globale d\'un détecteur. Pour chaque classe d\'objet, on calcule la **Précision Moyenne (AP)**, qui est l\'aire sous la courbe Précision-Rappel. La Précision mesure la proportion de détections correctes parmi toutes les détections, tandis que le Rappel mesure la proportion de détections correctes parmi tous les objets qui auraient dû être détectés. La mAP est ensuite calculée en faisant la moyenne des AP sur toutes les classes d\'objets.

### 47.3.2 Les approches à deux étapes : La famille R-CNN

Les premières approches de détection d\'objets par apprentissage profond qui ont connu un grand succès suivaient un pipeline en deux étapes, souvent résumé par \"proposer puis classifier\" (*proposals then classification*).

L\'idée initiale, introduite par R-CNN (Regions with CNN features), consistait à utiliser un algorithme externe (comme Selective Search) pour générer environ 2000 propositions de régions dans l\'image. Chaque proposition était ensuite redimensionnée et passée indépendamment dans un CNN pour en extraire des caractéristiques, qui étaient finalement utilisées pour classifier la région et affiner les coordonnées de la boîte. Cette méthode, bien que révolutionnaire en termes de précision, était extrêmement lente.

Des améliorations successives, Fast R-CNN puis **Faster R-CNN**, ont cherché à accélérer ce pipeline. L\'innovation majeure de Faster R-CNN a été d\'intégrer la génération de propositions de régions directement dans le réseau de neurones. Pour ce faire, il introduit un sous-réseau appelé **Region Proposal Network (RPN)**. Le RPN est un petit réseau entièrement convolutif qui glisse sur la carte de caractéristiques principale générée par le CNN de base. À chaque position, il prédit si la région correspond à un objet ou à un fond, et propose des boîtes englobantes de différentes échelles et rapports d\'aspect (appelées

*anchor boxes*).

Le pipeline de Faster R-CNN est donc le suivant :

> L\'image entière est passée une seule fois dans un CNN de base pour générer une carte de caractéristiques globale.
>
> Le RPN utilise cette carte de caractéristiques pour générer des propositions de régions d\'intérêt.
>
> Pour chaque proposition, les caractéristiques correspondantes sont extraites de la carte globale (via une opération appelée RoI Pooling).
>
> Ces caractéristiques sont ensuite passées dans des couches entièrement connectées pour la classification finale de l\'objet et la régression précise de la boîte englobante.

En partageant les calculs de convolution entre le RPN et le réseau de détection, Faster R-CNN est devenu beaucoup plus rapide que ses prédécesseurs. Il a établi une nouvelle norme en matière de précision et reste une référence importante, en particulier pour les applications où la précision, notamment sur les petits objets, prime sur la vitesse. Cependant, avec une vitesse d\'environ 7 images par seconde (FPS), il restait trop lent pour de nombreuses applications en temps réel.

### 47.3.3 Les détecteurs à une étape (Single-Shot) : La révolution du temps réel

La lenteur inhérente aux modèles à deux étapes a motivé la recherche d\'une approche radicalement différente. L\'idée des détecteurs à une étape est d\'éliminer complètement l\'étape de proposition de régions et de prédire simultanément les classes et les localisations des boîtes englobantes en une seule passe à travers le réseau. Deux architectures, YOLO et SSD, sont devenues les figures de proue de cette révolution.

**YOLO (You Only Look Once)**

L\'approche de YOLO, comme son nom l\'indique, est de regarder l\'image une seule fois pour effectuer toutes les prédictions. Il reformule la détection d\'objets non pas comme un problème de classification sur de multiples régions, mais comme un unique problème de régression.

> **Philosophie et architecture (YOLOv1) :**

**Division en grille :** L\'image d\'entrée est redimensionnée (par exemple, en 448x448) et divisée en une grille de S×S cellules (par exemple, 7x7).

**Prédiction par cellule :** Chaque cellule de la grille est responsable de la détection des objets dont le centre tombe à l\'intérieur de cette cellule. Chaque cellule prédit :

B boîtes englobantes (dans YOLOv1, B=2). Pour chaque boîte, elle prédit 5 valeurs : les coordonnées du centre (x,y) relatives à la cellule, la largeur w et la hauteur h relatives à l\'image entière, et un **score de confiance**.

C probabilités de classe conditionnelles, P(Classei​∣Objet), où C est le nombre total de classes.

**Score de confiance :** Ce score est défini comme P(Objet)×IoUpredtruth​. Il reflète à la fois la probabilité que la boîte contienne un objet et la qualité de la prédiction de la boîte.

**Sortie du réseau :** Le réseau produit un tenseur de sortie de dimensions S×S×(B×5+C). Pour une grille 7x7, 2 boîtes par cellule et 20 classes (PASCAL VOC), cela donne un tenseur de 7x7x30.

L\'avantage de YOLO est sa vitesse fulgurante, car il ne nécessite qu\'une seule évaluation du réseau. De plus, comme il voit l\'image entière, il fait moins d\'erreurs de fond que les méthodes basées sur des régions. Cependant, YOLOv1 avait des limitations, notamment des difficultés à détecter les petits objets et les objets très proches les uns des autres, car chaque cellule ne pouvait prédire qu\'un nombre limité de boîtes et un seul ensemble de classes.

> **Évolution (YOLOv2/9000 et au-delà) :** Pour surmonter ces limitations, les versions ultérieures ont introduit des améliorations clés. **YOLOv2** a notamment incorporé les **boîtes d\'ancrage** (*anchor boxes*) popularisées par Faster R-CNN. Au lieu de prédire directement les coordonnées des boîtes, le réseau prédit des décalages par rapport à un ensemble de boîtes de priors de différentes formes et tailles, ce qui facilite l\'apprentissage. D\'autres améliorations comme la normalisation par lots (*batch normalization*), l\'utilisation d\'un classifieur à plus haute résolution et l\'entraînement multi-échelles ont considérablement amélioré sa précision tout en conservant sa vitesse.

**SSD (Single Shot MultiBox Detector)**

Proposé à peu près en même temps que YOLOv2, SSD offre un autre point de vue sur la détection en une étape, en s\'attaquant de front au problème de la détection d\'objets à différentes échelles, une faiblesse des premières versions de YOLO.

> **Philosophie et architecture :** L\'innovation centrale de SSD est d\'effectuer des prédictions à partir de **plusieurs cartes de caractéristiques** à différentes résolutions le long du réseau.

**Réseau de base et couches auxiliaires :** SSD utilise un réseau de classification standard pré-entraîné (comme VGG16) comme \"colonne vertébrale\" (*backbone*) pour extraire des caractéristiques. À la fin de ce réseau de base, une série de couches convolutives supplémentaires sont ajoutées, dont la taille spatiale diminue progressivement.

**Prédictions multi-échelles :** Les prédictions de détection ne sont pas faites uniquement à la fin du réseau, mais à partir de plusieurs cartes de caractéristiques sélectionnées à différentes profondeurs. Les cartes de caractéristiques des couches plus profondes ont une faible résolution spatiale et un grand champ réceptif ; elles sont donc utilisées pour détecter les grands objets. Les cartes des couches moins profondes ont une haute résolution et sont utilisées pour détecter les petits objets.

**Boîtes par défaut (*Default Boxes*) :** Similairement aux boîtes d\'ancrage, SSD associe à chaque emplacement de chaque carte de caractéristiques un ensemble de boîtes par défaut avec différentes échelles et rapports d\'aspect. Pour chaque boîte par défaut, le réseau prédit un ensemble de décalages pour mieux l\'ajuster à l\'objet, ainsi que les scores de confiance pour chaque classe.

En combinant les prédictions de plusieurs échelles, SSD atteint un excellent équilibre entre vitesse et précision. Il est généralement plus précis que les premières versions de YOLO, en particulier pour les petits objets, tout en étant nettement plus rapide que Faster R-CNN.

### 47.3.4 Post-traitement : La suppression des non-maxima (NMS)

Un effet secondaire des détecteurs à une étape (et dans une moindre mesure, des RPN) est qu\'ils produisent un très grand nombre de détections candidates pour un même objet. Par exemple, plusieurs cellules de la grille de YOLO ou plusieurs boîtes par défaut de SSD peuvent détecter le même objet avec des scores de confiance élevés et des boîtes légèrement différentes. Il est donc nécessaire d\'appliquer une étape de post-traitement pour filtrer ces détections redondantes et ne conserver que la meilleure boîte pour chaque objet. Cette technique est appelée **suppression des non-maxima (NMS)**.

L\'algorithme NMS est une procédure de regroupement avide (*greedy*) qui fonctionne comme suit :

> Prendre la liste de toutes les boîtes prédites pour une classe donnée, avec leurs scores de confiance.
>
> Écarter toutes les boîtes dont le score est inférieur à un certain seuil de confiance.
>
> Trier les boîtes restantes par score de confiance, du plus élevé au plus bas.
>
> Sélectionner la boîte avec le score le plus élevé et l\'ajouter à la liste des prédictions finales.
>
> Calculer l\'IoU de cette boîte avec toutes les autres boîtes restantes dans la liste.
>
> Supprimer de la liste toutes les boîtes qui ont un IoU avec la boîte sélectionnée supérieur à un seuil NMS (par exemple, 0.5).
>
> Répéter les étapes 4 à 6 jusqu\'à ce que la liste des boîtes à traiter soit vide.

Ce processus est répété pour chaque classe d\'objet, garantissant qu\'un seul objet ne génère qu\'une seule détection finale.

### Tableau comparatif : Architectures de détection d\'objets

Le choix d\'une architecture de détection d\'objets dépend fortement des contraintes de l\'application. Le tableau ci-dessous résume les caractéristiques, forces et faiblesses des trois principales familles de détecteurs, illustrant le compromis fondamental entre vitesse et précision.

  -------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------
  Caractéristique            Faster R-CNN (Deux Étapes)                                          YOLO (Une Étape)                                                                             SSD (Une Étape)

  **Principe**               Propositions de régions (RPN) + Classification.                     Régression directe sur une grille.                                                           Prédictions sur des cartes de caractéristiques multi-échelles.

  **Vitesse (FPS)**          Lente (\~5-7 FPS)                                                   Très rapide (les versions modernes dépassent 100 FPS)                                        Rapide (\~22-59 FPS)

  **Précision (mAP)**        Très élevée (souvent la référence en termes de précision).          Bonne à très bonne (les versions modernes sont très compétitives).                           Très bonne, souvent un excellent compromis vitesse/précision.

  **Force principale**       Précision maximale, excellente performance sur les petits objets.   Vitesse temps réel, utilise le contexte global de l\'image.                                  Bon équilibre vitesse/précision, bonne gestion native des objets de tailles variées.

  **Faiblesse principale**   Lenteur, architecture complexe à entraîner et à déployer.           Les premières versions étaient moins précises sur les petits objets ou les objets groupés.   Moins performant que Faster R-CNN sur les très petits objets.
  -------------------------- ------------------------------------------------------------------- -------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------

Ce tableau met en évidence la dynamique du domaine : alors que Faster R-CNN a longtemps été le roi de la précision, les architectures à une étape comme YOLO et SSD ont continuellement amélioré leur précision au fil des versions, réduisant l\'écart tout en conservant leur avantage de vitesse, ce qui les rend de plus en plus dominantes pour une large gamme d\'applications pratiques.

## 47.4 Segmentation d\'images : Comprendre la scène au niveau du pixel

Alors que la détection d\'objets se contente de localiser des objets à l\'aide de boîtes englobantes rectangulaires, de nombreuses applications exigent une compréhension beaucoup plus fine et détaillée de la scène. La **segmentation d\'images** répond à ce besoin en allant au-delà des boîtes pour assigner une étiquette à **chaque pixel** de l\'image. Cette tâche, aussi appelée prédiction dense, représente l\'un des niveaux de compréhension de scène les plus élevés en vision par ordinateur. Elle est cruciale pour des domaines comme la conduite autonome (où il faut délimiter précisément la route, les trottoirs, les piétons), l\'imagerie médicale (pour délimiter les tumeurs ou les organes) et l\'édition d\'images.

Cette section explore les architectures de réseaux de neurones profonds qui ont permis de résoudre ce problème complexe. Nous commencerons par distinguer les deux principales variantes de la tâche : la segmentation **sémantique** et la segmentation d\'**instance**. Nous étudierons ensuite l\'architecture pionnière, le **Réseau Entièrement Convolutif (FCN)**, qui a démontré comment transformer un réseau de classification en un puissant outil de segmentation. Enfin, nous nous concentrerons sur l\'architecture **U-Net**, une conception élégante et symétrique qui est devenue la norme de facto dans de nombreux domaines, en particulier en imagerie biomédicale. L\'analyse de U-Net révélera l\'importance capitale des **connexions résiduelles (*skip connections*)**, un mécanisme architectural qui résout une tension fondamentale dans les réseaux profonds : la nécessité de combiner l\'information sémantique de haut niveau (\"ce qu\'est l\'objet\") avec l\'information spatiale de bas niveau (\"où il se trouve précisément\").

### 47.4.1 Au-delà des boîtes : Définitions

La segmentation d\'images se décline en plusieurs variantes, chacune avec un objectif légèrement différent. Les deux plus importantes sont la segmentation sémantique et la segmentation d\'instance.

> **Segmentation Sémantique :** L\'objectif de la segmentation sémantique est d\'assigner à chaque pixel de l\'image une étiquette de classe correspondante. Par exemple, dans une scène de rue, tous les pixels appartenant à une voiture seront étiquetés comme \"voiture\", tous les pixels de la route comme \"route\", et tous les pixels du ciel comme \"ciel\". La caractéristique principale de la segmentation sémantique est qu\'elle ne distingue pas les différentes instances d\'une même classe. S\'il y a trois voitures dans la scène, tous leurs pixels seront regroupés sous la même étiquette \"voiture\". C\'est une tâche de classification au niveau du pixel.
>
> **Segmentation d\'Instance :** La segmentation d\'instance est une tâche plus complexe qui combine les objectifs de la détection d\'objets et de la segmentation sémantique. Elle vise non seulement à classifier chaque pixel, mais aussi à identifier et à séparer chaque instance d\'objet. Dans notre scène de rue, chaque voiture serait non seulement segmentée, mais aussi identifiée de manière unique : \"voiture_1\", \"voiture_2\", \"voiture_3\". Cela permet de compter les objets et de les analyser individuellement.
>
> **Segmentation Panoptique :** Plus récemment, le concept de segmentation panoptique a été introduit pour unifier les deux tâches précédentes. L\'objectif est de produire une segmentation complète et cohérente de l\'image où chaque pixel se voit attribuer à la fois une étiquette sémantique et un identifiant d\'instance. Cette approche fait la distinction entre les \"choses\" (*things*), qui sont des objets comptables (comme les voitures, les piétons) et qui nécessitent une segmentation d\'instance, et le \"fourbi\" (*stuff*), qui sont des régions amorphes de fond (comme le ciel, l\'herbe, la route) et qui nécessitent une segmentation sémantique.

Cette section se concentrera principalement sur les architectures fondamentales de la segmentation sémantique, FCN et U-Net, car elles constituent la base de nombreuses autres méthodes.

### 47.4.2 FCN (Fully Convolutional Network) : Le pionnier de la segmentation de bout en bout

Avant 2015, la segmentation sémantique était souvent abordée avec des pipelines complexes impliquant l\'extraction de caractéristiques au niveau de patchs d\'image, suivie d\'une classification. Le travail de Long, Shelhamer et Darrell sur les **Réseaux Entièrement Convolutifs (FCN)** a constitué une percée majeure en proposant une approche de bout en bout.

**L\'idée clé**

Les réseaux de neurones convolutifs (CNNs) utilisés pour la classification d\'images, comme AlexNet ou VGG, sont excellents pour apprendre des hiérarchies de caractéristiques. Cependant, leurs dernières couches sont généralement des couches entièrement connectées (*fully connected layers*), qui traitent le vecteur de caractéristiques aplati et produisent une seule prédiction pour toute l\'image. Ce faisant, elles perdent toute l\'information spatiale qui est cruciale pour la segmentation.

L\'idée fondamentale du FCN est de prendre un réseau de classification éprouvé et de le transformer en un réseau entièrement convolutif, capable de produire une carte de prédictions denses (une carte de segmentation) plutôt qu\'un seul vecteur de probabilités. Pour ce faire, les couches entièrement connectées sont remplacées par des couches de convolution 1x1. Une couche de convolution 1x1 est mathématiquement équivalente à une couche entièrement connectée lorsqu\'elle est appliquée à une carte de caractéristiques, mais elle a l\'avantage de préserver la structure spatiale et de pouvoir fonctionner sur des entrées de taille arbitraire.

**Architecture**

L\'architecture d\'un FCN peut être comprise comme une structure encodeur-décodeur :

> **Encodeur (Chemin de sous-échantillonnage) :** La première partie du réseau est un CNN de classification standard (par exemple, VGG16) sans ses couches entièrement connectées. Cette partie agit comme un encodeur. À travers une série de couches de convolution et de pooling (ou de convolutions à foulée), la résolution spatiale de l\'image est progressivement réduite, tandis que le nombre de canaux de caractéristiques augmente. Les couches profondes de l\'encodeur capturent des informations sémantiques de haut niveau et contextuelles (\"quoi\"), mais au détriment de la résolution spatiale (\"où\").
>
> **Décodeur (Chemin de sur-échantillonnage) :** La carte de caractéristiques finale de l\'encodeur est de petite taille spatiale mais sémantiquement riche. Pour obtenir une carte de segmentation de la même taille que l\'image d\'entrée, il faut la sur-échantillonner. FCN utilise une technique de sur-échantillonnage appris appelée **convolution transposée** (parfois appelée à tort déconvolution). La convolution transposée effectue l\'opération inverse d\'une convolution normale, en projetant chaque caractéristique de la carte de basse résolution vers une région plus grande dans la carte de haute résolution, avec des poids qui sont appris pendant l\'entraînement.

**Amélioration avec les connexions résiduelles (*Skip Connections*)**

Un sur-échantillonnage direct de la carte de caractéristiques finale (qui peut avoir une résolution 32 fois plus petite que l\'entrée) produit des cartes de segmentation très grossières et floues, car une grande partie de l\'information de localisation fine a été perdue dans l\'encodeur.

Pour remédier à cela, FCN a introduit le concept de **connexions résiduelles**. L\'idée est de combiner les informations des couches profondes (sémantiques mais grossières) avec celles des couches moins profondes (détaillées mais moins sémantiques).

> **FCN-32s :** C\'est le modèle de base qui sur-échantillonne la dernière couche par un facteur de 32.
>
> **FCN-16s :** Ce modèle prend la sortie de la dernière couche, la sur-échantillonne par un facteur de 2, puis la fusionne (par addition élément par élément) avec la carte de caractéristiques de l\'avant-dernière couche de pooling (pool4). Le résultat est ensuite sur-échantillonné par un facteur de 16.
>
> **FCN-8s :** Le processus est répété une fois de plus, en fusionnant la sortie de FCN-16s (avant son dernier sur-échantillonnage) avec la carte de caractéristiques de la couche de pooling précédente (pool3).

Ces connexions résiduelles permettent de raffiner progressivement les prédictions en réintégrant des détails de localisation plus fins, conduisant à des segmentations beaucoup plus précises au niveau des frontières des objets.

### 47.4.3 U-Net : L\'architecture symétrique pour la précision

Développée en 2015 par Ronneberger, Fischer et Brox, l\'architecture U-Net a été initialement conçue pour la segmentation d\'images biomédicales, un domaine où les données d\'entraînement sont souvent rares et où la précision des contours des structures (comme les cellules) est d\'une importance capitale. U-Net a repris et systématisé l\'idée des connexions résiduelles de FCN en proposant une architecture élégante, symétrique et extrêmement efficace.

L\'architecture U-Net n\'est pas simplement une amélioration de FCN ; elle incarne un principe de conception puissant. Si un réseau apprend à compresser l\'information spatiale en une représentation sémantique de manière hiérarchique (l\'encodage), alors la reconstruction de l\'information spatiale (le décodage) devrait suivre un chemin symétrique et tout aussi hiérarchique. Cette symétrie est la clé de sa capacité à reconstruire des segmentations précises.

**Architecture**

Comme son nom l\'indique, l\'architecture a une forme de \"U\". Elle se compose de deux chemins principaux :

> **Chemin de Contraction (Encodeur) :** La partie gauche du \"U\" est un chemin de contraction typique. Il est constitué de blocs répétés, chaque bloc contenant deux convolutions 3x3 (avec activation ReLU), suivies d\'une opération de max pooling 2x2 avec une foulée de 2 pour le sous-échantillonnage. À chaque étape de sous-échantillonnage, la résolution spatiale est divisée par deux et le nombre de canaux de caractéristiques est doublé. Ce chemin permet de capturer le contexte global de l\'image.
>
> **Chemin d\'Expansion (Décodeur) :** La partie droite du \"U\" est un chemin d\'expansion symétrique. Il vise à reconstruire une carte de segmentation à la pleine résolution. Chaque étape du décodeur comprend :

Une opération de **sur-échantillonnage** (par exemple, une convolution transposée 2x2) qui divise par deux le nombre de canaux de caractéristiques et double la résolution spatiale.

Une **concaténation** avec la carte de caractéristiques correspondante du chemin de contraction. C\'est l\'élément central de U-Net.

Deux convolutions 3x3 (avec activation ReLU) pour affiner les caractéristiques.

> **Le rôle central des connexions résiduelles (*Skip Connections*) :** La caractéristique la plus distinctive et la plus importante de U-Net est la manière dont elle met en œuvre les connexions résiduelles. À chaque niveau du chemin d\'expansion, la carte de caractéristiques sur-échantillonnée est **concaténée** avec la carte de caractéristiques de même résolution provenant du chemin de contraction. Ces connexions (représentées par les flèches grises horizontales dans les diagrammes de U-Net) sont massives et permettent au réseau de propager directement l\'information contextuelle de haut niveau vers les couches de résolution supérieure.

Le succès de U-Net est presque entièrement attribuable à ces connexions. Elles résolvent une tension fondamentale dans les réseaux convolutifs. En descendant dans l\'encodeur, le réseau apprend **\"ce qui\"** se trouve dans l\'image (les caractéristiques sémantiques) mais perd l\'information précise de **\"où\"** cela se trouve (la localisation spatiale). Le chemin du décodeur, partant de la représentation la plus sémantique et compressée, sait \"quoi\" reconstruire, mais peine à le localiser avec précision. Les connexions résiduelles agissent comme des ponts, transportant l\'information de \"où\" (les cartes de caractéristiques à haute résolution des premières couches de l\'encodeur, riches en détails de contours) directement aux étapes correspondantes du décodeur. Le décodeur peut alors utiliser cette information de localisation précise pour affiner les frontières de la représentation sémantique qu\'il est en train de reconstruire. C\'est cette fusion du \"quoi\" et du \"où\" à de multiples échelles qui confère à U-Net sa puissance et sa capacité à produire des segmentations très précises, même avec peu de données d\'entraînement.

La couche finale du réseau est généralement une convolution 1x1 qui mappe le nombre de canaux de caractéristiques au nombre de classes de segmentation désirées, suivie d\'une fonction d\'activation (par exemple, softmax) pour produire les probabilités de classe pour chaque pixel.

## 47.5 Reconstruction 3D : De la 2D à la perception de la profondeur

Jusqu\'à présent, notre exploration de la vision par ordinateur s\'est principalement concentrée sur l\'interprétation d\'images bidimensionnelles. Cependant, le monde qui nous entoure est tridimensionnel. La projection de cette réalité 3D sur un capteur d\'image 2D est un processus qui, par nature, perd une information cruciale : la **profondeur**. L\'un des objectifs les plus ambitieux et les plus fondamentaux de la vision par ordinateur est d\'inverser ce processus, c\'est-à-dire d\'inférer la structure tridimensionnelle d\'une scène à partir d\'une ou plusieurs de ses projections bidimensionnelles. Cette tâche est connue sous le nom de **reconstruction 3D**.

Cette section finale introduit les principes de base de la reconstruction 3D en se concentrant sur le cas le plus fondamental et le plus intuitif : la **vision stéréoscopique**. Nous nous inspirerons de la vision humaine, où nos deux yeux, capturant des images légèrement différentes de la même scène, permettent à notre cerveau de percevoir le relief et la profondeur. Nous verrons comment ce principe peut être formalisé mathématiquement par la

**géométrie épipolaire**, un cadre élégant qui impose des contraintes géométriques puissantes sur le problème. Cette géométrie transforme le défi apparemment insurmontable de la mise en correspondance de pixels entre deux images en un problème de recherche beaucoup plus simple. Enfin, nous définirons le concept de **disparité** et montrerons comment sa mesure permet de calculer directement une carte de profondeur de la scène. Cette section illustre parfaitement comment des principes géométriques purs, combinés aux techniques d\'extraction de caractéristiques et de mise en correspondance, permettent de résoudre un problème de perception fondamental et de faire un pas de plus vers une vision artificielle véritablement complète.

### 47.5.1 Le défi de la troisième dimension

Lorsqu\'une caméra capture une image, elle effectue une projection en perspective : tous les points 3D situés sur une même droite passant par le centre optique de la caméra sont projetés sur le même pixel 2D dans l\'image. L\'information de la distance de ces points par rapport à la caméra est donc perdue. Pour récupérer cette information de profondeur, une seule image ne suffit pas. Il faut au moins deux vues de la même scène, prises depuis des points de vue différents.

C\'est précisément le principe de la **vision stéréoscopique humaine**. L\'écartement moyen d\'environ 6.5 cm entre nos deux yeux fait que chacun perçoit une image légèrement différente de l\'autre. Cette petite différence, appelée **disparité binoculaire**, est exploitée par notre cerveau pour fusionner les deux images et créer une sensation de relief et de profondeur, un processus connu sous le nom de **stéréopsie**.

En vision par ordinateur, on cherche à imiter ce processus en utilisant deux caméras (ou une seule caméra qui se déplace) pour capturer une paire d\'images stéréo. Le défi principal consiste alors à résoudre le **problème de la correspondance** : pour un pixel donné dans l\'image gauche, il faut trouver le pixel correspondant dans l\'image droite, c\'est-à-dire le pixel qui est la projection du même point 3D dans la scène. Une fois cette correspondance établie, la profondeur du point 3D peut être calculée par triangulation.

### 47.5.2 Fondements de la vision stéréoscopique

Le problème de la correspondance est difficile. Un patch de pixels dans l\'image gauche peut avoir de nombreux patchs similaires dans l\'image droite, ce qui peut conduire à des appariements erronés. Heureusement, la géométrie de la configuration à deux caméras impose une contrainte très forte qui simplifie considérablement la recherche. Cette contrainte est décrite par la **géométrie épipolaire**.

**La géométrie épipolaire : Le cadre mathématique**

La géométrie épipolaire décrit la relation géométrique projective entre deux vues d\'une même scène 3D. Elle ne dépend que des paramètres intrinsèques des caméras et de leur position et orientation relatives, mais pas de la structure de la scène elle-même.

Considérons une configuration stéréo avec deux caméras, une gauche et une droite, dont les centres optiques sont OL​ et OR​.

> **Ligne de base :** La droite qui passe par les deux centres optiques OL​ et OR​ est appelée la ligne de base.
>
> **Épipôles :** L\'**épipôle** gauche, eL​, est la projection du centre optique de la caméra droite, OR​, sur le plan image de la caméra gauche. Symétriquement, l\'épipôle droit, eR​, est la projection de OL​ sur le plan image de la caméra droite. Les épipôles sont donc les points d\'intersection de la ligne de base avec les plans images.
>
> **Plan épipolaire :** Soit P un point quelconque dans la scène 3D. Le plan défini par les trois points P, OL​ et OR​ est appelé le **plan épipolaire**. Il existe une famille de plans épipolaires, tous pivotant autour de la ligne de base.
>
> **Lignes épipolaires :** L\'intersection d\'un plan épipolaire avec le plan image de la caméra gauche est une droite appelée **ligne épipolaire** gauche. De même, son intersection avec le plan image droit est la ligne épipolaire droite. Toutes les lignes épipolaires d\'une image passent par l\'épipôle de cette image.

**La contrainte épipolaire**

L\'importance de cette géométrie réside dans la **contrainte épipolaire**. Considérons un point 3D P qui se projette en pL​ sur l\'image gauche et en pR​ sur l\'image droite. Par construction, le point P, les centres optiques OL​ et OR​, et les projections pL​ et pR​ se trouvent tous sur le même plan épipolaire.

Cela a une conséquence fondamentale : si nous connaissons la position de pL​ dans l\'image gauche, nous savons que son point correspondant pR​ dans l\'image droite doit se trouver sur la ligne épipolaire associée au plan (P,OL​,OR​). Autrement dit, la recherche du point correspondant pR​ n\'a pas besoin de se faire sur toute l\'image 2D droite, mais seulement le long de cette ligne 1D. Cette contrainte réduit considérablement la complexité et l\'ambiguïté du problème de correspondance.

**La Matrice Fondamentale**

La relation géométrique décrite ci-dessus peut être capturée algébriquement par une matrice 3x3 appelée la **matrice fondamentale**, notée F. Si les coordonnées homogènes des points correspondants sont pL​ et pR​, alors la contrainte épipolaire s\'exprime par l\'équation  :

pRT​FpL​=0

Cette matrice F encapsule toute la géométrie épipolaire du système stéréo. Elle peut être calculée à partir d\'un ensemble d\'au moins 7 ou 8 paires de points correspondants entre les deux images, sans qu\'il soit nécessaire de connaître les paramètres des caméras. Une fois F connue, pour n\'importe quel point pL​ de l\'image gauche, la ligne épipolaire correspondante lR​ dans l\'image droite est donnée par lR​=FpL​.

### 47.5.3 Calcul de la carte de disparité

Dans de nombreuses applications pratiques, les caméras stéréo sont montées de telle sorte que leurs plans images sont coplanaires et leurs axes optiques sont parallèles. C\'est ce qu\'on appelle une **configuration stéréo rectifiée**. Dans ce cas particulier, la géométrie épipolaire se simplifie énormément : toutes les lignes épipolaires sont des droites horizontales et alignées entre les deux images. La recherche du point correspondant à pL​=(xL​,yL​) se fait donc simplement le long de la même ligne yR​=yL​ dans l\'image droite.

**Définition de la disparité**

Dans une configuration rectifiée, la **disparité** d pour un point est simplement la différence de coordonnées horizontales entre sa position dans l\'image gauche et sa position dans l\'image droite  :

d=xL​−xR​

**Relation entre disparité et profondeur**

La disparité est directement et inversement proportionnelle à la profondeur Z du point 3D par rapport au plan des caméras. La relation est donnée par la formule de triangulation simple :

Z=df⋅B​

où f est la distance focale des caméras (supposées identiques) et B est la longueur de la ligne de base (la distance entre les deux centres optiques).

Cette relation est intuitive :

> Un objet très éloigné (Z→∞) aura des projections presque identiques dans les deux yeux, donc une disparité très faible (d→0).
>
> Un objet très proche (Z→0) aura des projections très différentes, donc une disparité élevée.

**La carte de disparité**

L\'objectif d\'un algorithme de stéréovision est de calculer la disparité pour chaque pixel de l\'image (ou du moins, pour une grande partie d\'entre eux). Le résultat est une **carte de disparité**, qui est une image en niveaux de gris où l\'intensité de chaque pixel est proportionnelle à la disparité calculée à cet endroit. Les objets proches apparaissent brillants (disparité élevée) et les objets lointains apparaissent sombres (disparité faible). Cette carte est une représentation dense de la structure 3D de la scène, équivalente à une carte de profondeur.

Le calcul de la carte de disparité implique généralement trois étapes :

> **Calcul du coût de correspondance :** Pour chaque pixel de l\'image gauche et pour chaque disparité possible le long de la ligne épipolaire, on calcule un coût de correspondance (par exemple, la somme des différences au carré ou la corrélation croisée normalisée sur une petite fenêtre autour des pixels).
>
> **Agrégation du coût :** Le coût est agrégé dans un voisinage pour obtenir une mesure plus robuste.
>
> **Optimisation/Sélection de la disparité :** Pour chaque pixel, on sélectionne la disparité qui minimise le coût agrégé. Des algorithmes plus avancés utilisent des techniques d\'optimisation globale (comme les coupes de graphe ou la programmation dynamique) pour trouver une carte de disparité lisse et cohérente.

La reconstruction 3D à partir de la stéréovision est un domaine actif de recherche, avec des méthodes modernes basées sur l\'apprentissage profond qui apprennent à prédire directement les cartes de disparité à partir de paires d\'images stéréo, souvent en utilisant des architectures de type encodeur-décodeur similaires à celles vues pour la segmentation. Elle représente une convergence de nombreuses techniques de vision, de l\'extraction de caractéristiques locales pour la mise en correspondance à l\'apprentissage de modèles denses, pour atteindre l\'un des objectifs ultimes de la discipline : percevoir le monde en trois dimensions.

