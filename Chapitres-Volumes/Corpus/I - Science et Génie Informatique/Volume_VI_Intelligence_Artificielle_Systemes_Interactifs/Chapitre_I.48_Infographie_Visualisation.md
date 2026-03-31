# Chapitre I.48 : Infographie et Visualisation

## Introduction

L\'infographie, ou la synthèse d\'images par ordinateur, est une discipline qui se situe à la confluence de l\'informatique, des mathématiques, de la physique et de l\'art. Son objectif fondamental est de créer une représentation visuelle, généralement une image bidimensionnelle, à partir d\'une description numérique et abstraite d\'une scène tridimensionnelle. Loin d\'être un simple processus de production d\'images, elle représente une quête pour simuler la réalité visuelle, ou pour créer des mondes stylisés, en modélisant l\'interaction complexe de la lumière avec la matière. Ce chapitre a pour ambition de démystifier l\'ensemble de ce processus, en disséquant la séquence d\'opérations logiques et mathématiques qui transforment un ensemble de données géométriques et de propriétés de surface en une image photoréaliste ou stylisée.

Notre exploration suivra un parcours thématique qui reflète la progression logique de la synthèse d\'images. Nous débuterons par l\'architecture globale de ce processus, le **pipeline de rendu graphique**. Cette \"chaîne de montage\" conceptuelle, implémentée au cœur des processeurs graphiques (GPU), décompose la tâche colossale de la création d\'une image en une série d\'étapes gérables, allant de la description de la scène à la couleur finale de chaque pixel.

Ensuite, nous nous pencherons sur la matière première de tout monde virtuel : sa représentation. La section sur la **modélisation géométrique et les textures** explorera comment les objets sont construits numériquement, le plus souvent sous forme de maillages de polygones, et comment leur apparence de surface est enrichie de détails et de couleurs grâce à l\'application d\'images 2D appelées textures.

Le cœur de ce chapitre sera consacré à l\'étude des deux grandes philosophies qui gouvernent l\'étape cruciale du rendu. D\'une part, la **rastérisation**, un paradigme optimisé pour la vitesse et l\'interactivité, qui projette la géométrie 3D sur un écran 2D avant de déterminer la couleur de chaque pixel. Cette approche, qui domine le domaine du temps réel comme les jeux vidéo, sera analysée en profondeur, avec un accent particulier sur les transformations géométriques et les modèles d\'illumination locaux tels que le modèle de Phong. D\'autre part, nous explorerons le

**lancer de rayons (ray tracing)**, une approche radicalement différente qui simule le trajet physique des rayons lumineux à travers la scène. Bien que plus coûteuse en calculs, cette méthode permet d\'atteindre un niveau de réalisme inégalé en modélisant nativement des phénomènes complexes comme les réflexions, les réfractions et les ombres douces, jetant ainsi les bases de l\'illumination globale.

Enfin, nous introduirons la dimension temporelle en abordant les principes fondamentaux de l\'**animation et de la simulation physique**. Nous verrons comment le mouvement est créé, que ce soit par le contrôle direct de l\'artiste via l\'animation par images clés ou par l\'émergence de comportements réalistes grâce à la simulation des lois de la dynamique newtonienne.

À travers ce parcours, nous verrons que l\'infographie est une discipline d\'abstractions et de compromis, où la rigueur mathématique et la simulation physique sont constamment mises en balance avec l\'efficacité algorithmique et les contraintes matérielles.

## 48.1 Le Pipeline de Rendu Graphique : De la Scène à l\'Image

Le processus de transformation d\'une description de scène 3D en une image 2D est une tâche d\'une complexité considérable. Pour la rendre gérable et, surtout, pour l\'exécuter à des vitesses permettant l\'interactivité, l\'infographie moderne s\'appuie sur une abstraction puissante : le pipeline de rendu graphique. Ce modèle conceptuel décompose le problème en une série d\'étapes séquentielles, chacune spécialisée dans une tâche précise.

### 48.1.1 La Chaîne de Montage Conceptuelle

Le pipeline de rendu peut être visualisé comme une chaîne de montage industrielle. En entrée, on fournit les matières premières : des données décrivant la géométrie des objets (listes de sommets), les matériaux qui les recouvrent (textures, couleurs), la position et les caractéristiques des sources lumineuses, et le point de vue de l\'observateur (la caméra). En sortie, on obtient le produit fini : une image 2D, c\'est-à-dire un tableau de pixels colorés.

Cette abstraction n\'est pas purement théorique; elle est directement incarnée dans l\'architecture matérielle des unités de traitement graphique (GPU). Chaque étape du pipeline correspond à des unités de calcul spécialisées sur la puce du GPU, conçues pour exécuter leur tâche spécifique avec une efficacité maximale. Cette spécialisation matérielle est la clé des performances phénoménales des systèmes graphiques modernes, capables de traiter des milliards de sommets et de pixels par seconde.

Conceptuellement, le pipeline se divise en deux grandes phases :

> **La Phase Géométrique :** Cette phase opère sur les primitives géométriques de la scène (principalement des triangles) et leurs sommets. Son rôle est de déterminer où et comment ces primitives apparaîtront à l\'écran. Elle implique des transformations mathématiques, des projections et le découpage de la géométrie qui n\'est pas visible.
>
> **La Phase de Rastérisation et des Pixels :** Une fois la géométrie projetée en 2D, cette phase prend le relais. Elle convertit les primitives 2D en un ensemble de \"fragments\" (des pixels potentiels), puis exécute des calculs complexes pour déterminer la couleur finale de chaque pixel visible à l\'écran.

Au fil des deux dernières décennies, ce pipeline a connu une évolution fondamentale. Initialement rigide et configurable uniquement par des états prédéfinis (un pipeline à \"fonction fixe\"), il est devenu de plus en plus programmable. L\'introduction des \"nuanceurs\" (shaders) --- de petits programmes exécutés directement sur le GPU à des étapes clés --- a transformé le rendu graphique. Ce passage d\'un modèle de configuration matérielle à un modèle de programmation logicielle a transféré un immense pouvoir créatif et algorithmique aux développeurs, permettant une explosion de l\'innovation dans les techniques de rendu, les effets visuels et le réalisme.

### 48.1.2 L\'Étape d\'Application (Application Stage)

La toute première étape du pipeline se déroule en dehors du GPU, sur le processeur central (CPU) de l\'ordinateur. C\'est l\'étape d\'application, où réside la logique du programme qui utilise les graphismes : un jeu vidéo, un logiciel de conception assistée par ordinateur (CAO), un visualiseur de données, etc.

Les responsabilités de cette étape sont vastes et variées :

> **Gestion de la Scène :** C\'est ici que la scène 3D est assemblée. Cela peut impliquer le chargement de modèles 3D à partir de fichiers, la gestion d\'une structure de données de scène (comme un graphe de scène) et la détermination des objets qui sont potentiellement visibles.
>
> **Logique et Simulation :** L\'étape d\'application gère les interactions de l\'utilisateur, met à jour l\'état du monde virtuel, exécute des simulations physiques (comme la trajectoire d\'un projectile ou le comportement d\'un tissu), détecte les collisions entre objets et gère l\'intelligence artificielle des personnages non-joueurs.
>
> **Préparation des Données pour le Rendu :** La tâche cruciale de cette étape est de préparer et d\'envoyer au GPU toutes les données nécessaires pour le rendu de l\'image suivante. Cela inclut les maillages géométriques (sous forme de tampons de sommets ou *vertex buffers*), les textures, les paramètres des matériaux, les positions et propriétés des lumières, et la position et l\'orientation de la caméra.

L\'étape d\'application est la plus flexible de tout le pipeline, car elle est entièrement contrôlée par le logiciel. Cependant, la communication entre le CPU et le GPU peut devenir un goulot d\'étranglement. Une application performante doit minimiser le nombre de commandes envoyées au GPU et transférer les données de manière efficace, souvent en téléversant de grandes quantités de données à l\'avance et en ne mettant à jour que ce qui change d\'une image à l\'autre.

### 48.1.3 L\'Étape de Géométrie (Geometry Stage)

Une fois que les données de la scène sont transférées au GPU, l\'étape de géométrie commence. Cette phase est entièrement prise en charge par le matériel du GPU et a pour objectif de traiter les informations de sommets pour préparer les primitives au rendu.

#### Le Nuanceur de Sommets (Vertex Shader)

Le cœur de l\'étape de géométrie est le **nuanceur de sommets** (*vertex shader*). C\'est un programme qui est exécuté une fois pour chaque sommet de chaque objet à rendre. Sa responsabilité principale et obligatoire est d\'effectuer les transformations géométriques. Il prend en entrée les attributs d\'un sommet (au minimum, sa position dans l\'espace local de l\'objet) et doit produire en sortie la position de ce même sommet dans un espace de coordonnées spécial appelé \"espace de découpage\" (

*clip space*). Ce processus, détaillé mathématiquement dans la section 48.3.1, implique typiquement une série de multiplications par des matrices de transformation (Modèle, Vue, Projection).

Le nuanceur de sommets peut également effectuer d\'autres opérations par sommet, comme :

> Transformer les normales de surface pour les calculs d\'éclairage.
>
> Générer ou transformer les coordonnées de texture.
>
> Effectuer des calculs d\'éclairage par sommet (comme dans l\'ombrage de Gouraud).
>
> Réaliser des déformations animées de la géométrie (morphing, animation de squelette).

Il est important de noter qu\'un nuanceur de sommets opère dans l\'isolement : il traite un sommet à la fois et n\'a aucune information sur les autres sommets de la primitive ou de l\'objet.

#### Étapes Optionnelles : Tessellation et Nuanceurs de Géométrie

Les pipelines graphiques modernes (comme ceux définis par DirectX 11+ et OpenGL 4+) incluent des étapes optionnelles entre le nuanceur de sommets et la rastérisation, offrant une flexibilité accrue pour manipuler la géométrie à la volée.

> **Tessellation :** Cette étape permet de subdiviser dynamiquement des primitives de bas niveau (souvent des patchs) en une géométrie plus fine, composée de nombreux triangles. Elle est contrôlée par deux types de nuanceurs : le **nuanceur de coque** (*hull shader*), qui détermine le niveau de subdivision, et le **nuanceur de domaine** (*domain shader*), qui calcule la position des nouveaux sommets générés. La tessellation est extrêmement utile pour implémenter des systèmes de niveau de détail (LOD) adaptatifs, où les objets proches de la caméra sont rendus avec une haute résolution polygonale, qui diminue à mesure qu\'ils s\'éloignent.
>
> **Nuanceur de Géométrie (Geometry Shader) :** Exécuté après le nuanceur de sommets (ou la tessellation), le nuanceur de géométrie est unique car il opère sur une primitive entière (par exemple, les trois sommets d\'un triangle). Il a la capacité de modifier, de supprimer ou même de générer de nouvelles primitives. Par exemple, un nuanceur de géométrie pourrait prendre un point en entrée et générer un quad orienté vers la caméra (\
> *billboard*), ou prendre un triangle et en extruder les arêtes pour créer des \"nageoires\" de volume pour des techniques d\'ombrage avancées.

#### Le Découpage (Clipping)

Après que les sommets ont été transformés en espace de découpage, le matériel effectue une opération à fonction fixe appelée **découpage** (*clipping*). L\'espace de découpage définit un volume de vue canonique (souvent un cube ou un prisme rectangulaire). Toute primitive qui se trouve entièrement en dehors de ce volume est simplement rejetée. Les primitives qui traversent les frontières du volume sont découpées, c\'est-à-dire que de nouveaux sommets sont créés le long des plans de découpage pour former de nouvelles primitives qui se trouvent entièrement à l\'intérieur du volume de vue. Ce processus garantit que seules les géométries potentiellement visibles poursuivent leur chemin dans le pipeline, économisant ainsi des ressources de calcul précieuses.

### 48.1.4 L\'Étape de Rastérisation (Rasterization Stage)

L\'étape de rastérisation marque une transition fondamentale : on passe du monde continu de la géométrie (points, lignes, triangles) au monde discret de l\'image (une grille de pixels). La rastérisation, aussi appelée conversion de balayage (*scan conversion*), est le processus qui prend une primitive 2D projetée (après les transformations et le découpage) et détermine quels pixels de l\'écran sont \"couverts\" par cette primitive.

Pour chaque primitive, la rastérisation génère un ensemble de **fragments**. Un fragment peut être considéré comme un \"pixel potentiel\". Il correspond à un pixel spécifique sur l\'écran et contient toutes les informations nécessaires pour déterminer la couleur finale de ce pixel. Ces informations sont obtenues en interpolant les attributs des sommets de la primitive (comme la couleur, la profondeur, les coordonnées de texture) sur toute sa surface. Par exemple, si un sommet d\'un triangle est rouge et un autre est bleu, un fragment situé à mi-chemin entre eux aura une couleur interpolée violette.

Cette étape est l\'une des plus optimisées du GPU. Elle est implémentée comme un circuit matériel à fonction fixe, non programmable, capable de traiter des milliards de triangles par seconde. Les algorithmes précis utilisés, comme ceux basés sur les fonctions de bord, sont conçus pour être massivement parallèles et efficaces.

### 48.1.5 L\'Étape des Pixels (Pixel Stage)

Une fois que la rastérisation a produit un flux de fragments pour chaque primitive, l\'étape des pixels (parfois appelée étape des opérations sur les fragments) prend le relais pour traiter ces fragments et, finalement, les écrire dans le tampon d\'image (*framebuffer*).

#### Le Nuanceur de Pixels (Pixel Shader)

Similaire au nuanceur de sommets, le **nuanceur de pixels** (ou **nuanceur de fragments**, *fragment shader*) est une autre étape entièrement programmable. Ce programme est exécuté pour chaque fragment généré par la rastérisation. Son rôle principal est de calculer la couleur finale du fragment.

En entrée, le nuanceur de pixels reçoit les attributs interpolés du fragment (coordonnées de texture, normale, couleur de sommet, etc.). Il a également accès aux textures et à d\'autres données globales de la scène (comme les propriétés des lumières). À partir de ces informations, il exécute un code qui peut être arbitrairement complexe pour produire une couleur de sortie (généralement une valeur RGBA). C\'est ici que la magie visuelle opère :

> **Application de textures :** Le nuanceur utilise les coordonnées de texture interpolées pour lire la couleur correspondante dans une image de texture.
>
> **Éclairage par pixel :** Il effectue des calculs d\'éclairage complexes (comme le modèle de Phong) en utilisant la normale interpolée, ce qui permet d\'obtenir des reflets spéculaires lisses et précis.
>
> **Effets spéciaux :** Brouillard, lueur, distorsions, et une myriade d\'autres effets sont implémentés dans le nuanceur de pixels.

Un nuanceur de pixels peut également décider d\'ignorer un fragment (par exemple, pour créer des découpes dans une texture), l\'empêchant ainsi de passer aux étapes suivantes.

#### Opérations par Fragment (Per-Fragment Operations)

Après l\'exécution du nuanceur de pixels, chaque fragment passe par une dernière série d\'opérations à fonction fixe avant de pouvoir potentiellement modifier un pixel dans le tampon d\'image. Ces tests sont cruciaux pour gérer correctement l\'occlusion et la transparence.

> **Test de Profondeur (Depth Test / Z-buffering) :** C\'est le mécanisme principal pour la détermination des surfaces cachées. Le GPU maintient un tampon de profondeur (*Z-buffer*), un tableau 2D qui stocke la valeur de profondeur du pixel le plus proche de la caméra dessiné jusqu\'à présent. Pour chaque fragment, sa profondeur interpolée est comparée à la valeur dans le Z-buffer. Si le fragment est plus proche, sa couleur est écrite dans le tampon d\'image et le Z-buffer est mis à jour avec la nouvelle profondeur. Sinon, le fragment est plus loin qu\'un autre déjà dessiné à cet emplacement, il est donc caché et simplement ignoré. Ce test est fondamental pour un rendu 3D correct.
>
> **Test de Stencil (Stencil Test) :** Un test similaire au test de profondeur, mais qui opère sur un tampon de \"pochoir\" (*stencil buffer*). Il permet des opérations plus complexes comme le masquage, la création de portails ou le rendu de volumes d\'ombre.
>
> **Mélange (Blending) :** Si un fragment passe tous les tests, il doit être combiné avec la couleur déjà présente dans le tampon d\'image. Pour les objets opaques, la nouvelle couleur remplace simplement l\'ancienne. Pour les objets transparents ou translucides, le **mélange alpha** est utilisé. La couleur du fragment est combinée avec la couleur existante en fonction de la valeur alpha (opacité) du fragment, créant ainsi des effets de transparence.

Ce n\'est qu\'après avoir réussi cette séquence finale de tests et d\'opérations qu\'un fragment devient enfin un pixel coloré dans l\'image finale, qui est ensuite affichée à l\'écran.

## 48.2 La Représentation du Monde Virtuel : Modélisation Géométrique et Textures

Avant de pouvoir rendre une scène, il faut d\'abord la décrire. La modélisation géométrique est le processus de définition de la forme des objets dans un espace tridimensionnel. Si la géométrie fournit le \"squelette\" d\'un objet, les textures fournissent sa \"peau\", ajoutant couleur, motif et détails de surface. Cette section explore les techniques fondamentales utilisées pour représenter la forme et l\'apparence des objets dans le monde virtuel.

### 48.2.1 La Fondation Polygonale : Le Maillage (Mesh)

La méthode la plus répandue et la plus universelle pour représenter la surface d\'un objet 3D est le **maillage polygonal** (*polygon mesh*). Un maillage est une collection d\'éléments géométriques simples qui, ensemble, approximant la forme d\'une surface, qu\'elle soit simple comme un cube ou complexe comme un personnage.

#### Les Composants d\'un Maillage

Un maillage est défini par trois types d\'éléments interconnectés  :

> **Sommets (Vertices) :** Ce sont les briques de base du maillage. Un sommet est un point dans l\'espace 3D, défini par ses coordonnées cartésiennes (x,y,z). Au-delà de sa position, un sommet est un conteneur pour divers **attributs** qui seront utilisés plus tard dans le pipeline de rendu. Ces attributs incluent typiquement :

**La normale de surface :** Un vecteur unitaire (N) perpendiculaire à la surface au niveau du sommet, essentiel pour les calculs d\'éclairage.

**Les coordonnées de texture :** Une paire de coordonnées (U,V) qui lie le sommet à un point sur une image de texture 2D.

**La couleur de sommet :** Une couleur (par exemple, RGBA) directement associée au sommet, utilisée pour des effets comme l\'ombrage de Gouraud.

> **Arêtes (Edges) :** Une arête est un segment de ligne qui relie deux sommets. Les arêtes définissent la structure filaire (*wireframe*) de l\'objet.
>
> **Faces (Polygons) :** Une face est une surface plane définie par une séquence ordonnée de sommets. L\'ensemble des faces constitue la surface visible de l\'objet. Bien que des polygones avec un nombre arbitraire de côtés (n-gones) soient possibles dans les logiciels de modélisation, pour le rendu, ils sont presque universellement décomposés en primitives plus simples :

**Triangles :** Le triangle est la primitive fondamentale en infographie temps réel. Sa propriété la plus importante est qu\'il est **garanti d\'être coplanaire** : ses trois sommets définissent toujours un plan unique. Cette simplicité rend les algorithmes de rastérisation et d\'interpolation beaucoup plus rapides et robustes.

**Quadrilatères (Quads) :** Les quads sont souvent préférés par les artistes 3D car ils permettent de créer des maillages avec une topologie plus propre et plus facile à manipuler, notamment pour l\'animation et la subdivision de surface. Cependant, avant d\'être envoyés au GPU, les quads sont systématiquement **triangulés** (divisés en deux triangles).

#### Topologie et Densité du Maillage

La qualité d\'un modèle 3D ne dépend pas seulement de sa forme, mais aussi de la manière dont ses polygones sont organisés. La **topologie** d\'un maillage décrit la connectivité de ses sommets, arêtes et faces. Une \"bonne topologie\" est cruciale pour un ombrage correct et des déformations prévisibles en animation. Un maillage \"propre\" évite les problèmes tels que les arêtes non-manifold (partagées par plus de deux faces) ou les faces qui s\'auto-intersectent.

La **densité** du maillage, c\'est-à-dire le nombre de polygones utilisés pour décrire une surface, est un facteur clé dans le compromis entre qualité visuelle et performance  :

> **Modèles Low-Poly (faible densité polygonale) :** Ces modèles utilisent un nombre minimal de polygones pour définir la forme générale d\'un objet. Ils sont optimisés pour la performance et sont la norme dans les applications en temps réel comme les jeux vidéo et la réalité virtuelle. Les détails fins sont ajoutés via des textures, notamment des *normal maps*.
>
> **Modèles High-Poly (haute densité polygonale) :** Ces modèles utilisent un très grand nombre de polygones pour capturer des détails géométriques fins. Ils sont typiques des films d\'animation, des effets spéciaux et des rendus architecturaux où la qualité prime sur la vitesse de rendu. Ils sont souvent créés à l\'aide de techniques de sculpture numérique ou de subdivision de surface.

#### Formats de Fichiers

La géométrie et les attributs d\'un maillage sont stockés dans divers formats de fichiers. L\'un des plus simples et des plus courants est le format **OBJ** de Wavefront. C\'est un format texte qui liste explicitement les positions des sommets (v), les coordonnées de texture (vt), les normales (vn), puis définit chaque face (f) en référençant les indices de ses sommets, coordonnées de texture et normales correspondants. D\'autres formats plus complexes comme FBX ou glTF peuvent stocker des informations supplémentaires, telles que des animations, des squelettes et des descriptions complètes de matériaux.

### 48.2.2 Habiller la Géométrie : Le Mappage de Texture (Texture Mapping)

Un maillage polygonal définit la forme d\'un objet, mais il ne dit rien sur l\'apparence de sa surface. Le **mappage de texture** est une technique fondamentale et extraordinairement puissante qui consiste à appliquer une image 2D, appelée **texture**, sur la surface d\'un modèle 3D pour lui conférer des détails visuels complexes sans avoir à augmenter sa complexité géométrique. C\'est l\'équivalent numérique de l\'application de papier peint sur un mur ou d\'un autocollant sur une boîte.

Une **texture** est une image matricielle (un tableau de pixels) où chaque pixel, appelé **texel**, contient des données. Si l\'utilisation la plus évidente est de stocker des informations de couleur, le concept a été étendu pour représenter une vaste gamme de propriétés de surface, permettant des matériaux beaucoup plus réalistes.

#### Au-delà de la Couleur : Les Différents Types de Cartes de Texture

Dans les pipelines de rendu modernes, en particulier ceux basés sur le rendu physique réaliste (Physically Based Rendering, PBR), un matériau est souvent décrit par un ensemble de cartes de texture, chacune contrôlant un aspect spécifique de l\'interaction de la lumière avec la surface  :

> **Carte de Diffusion / Albedo (Diffuse/Albedo Map) :** C\'est la carte de texture la plus fondamentale. Elle définit la couleur de base de la surface, c\'est-à-dire la couleur de la lumière qu\'elle réfléchit de manière diffuse. Dans les workflows PBR, on parle de carte d\'albédo, qui représente la couleur pure du matériau sans aucune information d\'éclairage ou d\'ombre.
>
> **Carte de Normales (Normal Map) :** C\'est une technique d\'illusion d\'optique puissante. Au lieu de stocker des couleurs, cette texture stocke des vecteurs. Chaque texel contient un vecteur (encodé dans les canaux R, G, B) qui représente la direction de la normale de surface à cet endroit. Lors du rendu, le nuanceur de pixels utilise cette normale \"truquée\" issue de la texture au lieu de la normale réelle du polygone pour les calculs d\'éclairage. Cela permet de simuler des détails de surface très fins (bosses, fissures, pores de la peau) sur un modèle low-poly, donnant l\'illusion d\'une géométrie beaucoup plus complexe.
>
> **Cartes de Réflectivité (Specular, Roughness, Metallic Maps) :** Ces cartes contrôlent les reflets spéculaires.

Une **carte spéculaire** (*specular map*) traditionnelle définit la couleur et l\'intensité des reflets.

Dans les workflows PBR, on utilise plutôt une **carte de rugosité** (*roughness map*) qui indique à quel point la surface est microscopiquement rugueuse (une valeur faible pour un miroir, une valeur élevée pour du béton), et une **carte métallique** (*metallic map*) qui définit si la surface est un métal ou un diélectrique (isolant), deux types de matériaux qui réfléchissent la lumière très différemment.

> **Carte d\'Occlusion Ambiante (Ambient Occlusion Map) :** C\'est une carte en niveaux de gris qui simule les ombres douces dans les cavités et les crevasses d\'un objet, là où la lumière ambiante a du mal à pénétrer. Elle ajoute un réalisme subtil en assombrissant les zones de contact et les recoins, améliorant la perception de la forme.

La dissociation entre la géométrie de bas niveau et l\'apparence de surface de haut niveau est l\'une des optimisations les plus fondamentales de l\'infographie. Elle permet d\'atteindre une fidélité visuelle immense avec un coût de calcul géométrique relativement faible. Le *normal mapping* est l\'exemple par excellence de cette philosophie, où une information complexe d\'éclairage est encodée dans une simple texture pour créer une illusion de relief convaincante, contournant ainsi les limitations matérielles.

### 48.2.3 Le Pont entre 2D et 3D : Coordonnées UV

Pour appliquer correctement une texture 2D sur un maillage 3D, il est nécessaire d\'établir une correspondance précise entre chaque point de la surface du modèle et un point de l\'image de texture. C\'est le rôle du **mappage UV**.

#### Définition des Coordonnées UV

Les lettres **U** et **V** sont utilisées pour désigner les axes horizontal et vertical de l\'espace de la texture 2D, afin de les distinguer des axes X, Y et Z de l\'espace 3D du modèle. L\'espace UV est généralement normalisé, de sorte que les coordonnées

(U,V) varient de (0,0) dans un coin de la texture à (1,1) dans le coin opposé.

Le processus de mappage UV consiste à assigner à chaque sommet du maillage 3D une coordonnée UV 2D. Cette coordonnée \"épingle\" ce sommet à un emplacement spécifique sur l\'image de texture.

#### Le Processus de Dépliage (UV Unwrapping)

La création de ces coordonnées UV est un processus appelé **dépliage UV** (*UV unwrapping*). L\'analogie la plus courante est celle d\'un patron de couture ou du dépliage d\'une boîte en carton. L\'artiste 3D doit conceptuellement \"découper\" le maillage 3D le long de certaines arêtes, appelées **coutures** (*seams*), puis l\'aplatir pour créer une représentation 2D sans chevauchement, appelée la **carte UV** (*UV map*).

Le choix de l\'emplacement des coutures est un art en soi. Elles doivent être placées dans des zones peu visibles du modèle (par exemple, sous les bras d\'un personnage, à l\'arrière d\'un objet) pour minimiser les discontinuités visibles dans la texture appliquée. Un bon dépliage UV cherche également à minimiser la distorsion : les polygones sur la carte UV doivent avoir des proportions aussi proches que possible de leurs homologues sur le maillage 3D pour que la texture ne paraisse pas étirée ou compressée.

Les logiciels de modélisation 3D offrent divers outils pour faciliter ce processus, notamment des méthodes de projection automatiques  :

> **Projection Planaire :** Projette les UV comme si on utilisait un projecteur. Idéal pour les surfaces planes.
>
> **Projection Cylindrique/Sphérique :** Enveloppe les UV autour d\'une forme cylindrique ou sphérique. Utile pour les objets comme les bouteilles, les bras ou les planètes.

#### Utilisation dans le Pipeline de Rendu

Une fois que chaque sommet possède une coordonnée UV, ces dernières deviennent un attribut de sommet, tout comme la position et la normale. Lors de l\'étape de rastérisation, pour chaque fragment généré à l\'intérieur d\'un triangle, le GPU interpole les coordonnées UV des trois sommets du triangle pour calculer la coordonnée UV précise de ce fragment. Cette coordonnée UV interpolée est ensuite utilisée par le nuanceur de pixels pour effectuer une **recherche de texture** (*texture lookup* ou *texture sampling*), c\'est-à-dire pour lire la couleur du texel correspondant dans la carte de texture. C\'est ainsi que l\'image 2D est \"peinte\" sur la surface 3D, pixel par pixel.

## 48.3 Le Paradigme Dominant : Rendu par Rastérisation et Modèles d\'Illumination

La rastérisation est le paradigme de rendu qui domine l\'infographie en temps réel. Sa popularité et son efficacité découlent de son approche directe : au lieu de simuler le trajet complexe de la lumière, elle projette la géométrie de la scène sur l\'écran et se concentre ensuite sur la coloration des pixels. Cette section plonge au cœur de ce processus, en détaillant le parcours mathématique d\'un sommet depuis l\'espace de l\'objet jusqu\'à l\'écran, les algorithmes de conversion de la géométrie en pixels, et les modèles utilisés pour simuler l\'interaction de la lumière avec les surfaces.

### 48.3.1 Le Voyage d\'un Sommet : Le Pipeline de Transformation Géométrique

Le voyage d\'un sommet, de sa définition locale à sa position finale sur un écran 2D, est une séquence de transformations mathématiques. Chaque transformation déplace le sommet d\'un système de coordonnées (ou \"espace\") à un autre. Pour unifier ces opérations, l\'infographie utilise les **coordonnées homogènes**. En ajoutant une quatrième composante, w, à un vecteur 3D (x,y,z), on obtient un vecteur 4D (x,y,z,w). Pour un point, w=1, et pour une direction, w=0. Cette représentation permet d\'exprimer toutes les transformations géométriques affines (translation, rotation, mise à l\'échelle) sous la forme d\'une unique multiplication par une matrice 4x4.

Le pipeline de transformation standard se compose des étapes suivantes  :

> Espace Local (ou Modèle) → Espace Monde :\
> Chaque objet d\'une scène est modélisé dans son propre système de coordonnées, appelé espace local (object space ou model space). C\'est un repère pratique où l\'origine (0,0,0) est souvent le centre de l\'objet. Pour placer cet objet dans la scène globale, on applique une matrice de modèle (Mmodeˋle​). Cette matrice encode la position, l\'orientation (rotation) et la taille (mise à l\'échelle) de l\'objet dans l\'espace monde (world space), qui est le système de coordonnées commun à tous les objets de la scène.\
> \
> Pmonde​=Mmodeˋle​⋅Plocal​
>
> Espace Monde → Espace Vue (ou Caméra) :\
> Ensuite, il faut positionner la caméra virtuelle. Plutôt que de déplacer la caméra, il est mathématiquement plus simple de transformer la scène entière pour que la caméra se retrouve à l\'origine, regardant dans une direction standard (généralement le long de l\'axe -Z). C\'est le rôle de la matrice de vue (Mvue​). Elle est en fait l\'inverse de la transformation qui placerait la caméra dans l\'espace monde. Le résultat est que tous les sommets sont maintenant exprimés dans l\'espace vue (view space ou camera space).\
> \
> Pvue​=Mvue​⋅Pmonde​
>
> Espace Vue → Espace de Découpage (Clip Space) :\
> Cette étape est cruciale car elle simule la perspective. La matrice de projection (Mprojection​) transforme le volume de vue 3D, appelé tronc de visualisation (view frustum), en un volume canonique, généralement un cube unitaire dont les coordonnées varient de -1 à 1 sur chaque axe. Ce cube est appelé l\'espace des coordonnées normalisées de l\'appareil (Normalized Device Coordinates, NDC).

**Projection en perspective :** C\'est la projection la plus courante. Elle modifie la coordonnée w des sommets. Les objets plus éloignés de la caméra (avec une plus grande valeur de Z dans l\'espace vue) auront une plus grande valeur de w après transformation, ce qui les fera paraître plus petits après la division perspective.

Projection orthographique : Utilisée pour les vues 2D ou techniques, cette projection ne modifie pas la perspective. Les objets conservent la même taille quelle que soit leur distance à la caméra.\
La sortie de cette étape est un sommet dans l\'espace de découpage (clip space).\
\
Pclip​=Mprojection​⋅Pvue​

> Division Perspective et Transformation Viewport :\
> Après le découpage (clipping), qui élimine tout ce qui est en dehors du volume NDC, la division perspective est effectuée. Les coordonnées x,y,z de chaque sommet en clip space sont divisées par sa coordonnée w.\
> \
> PNDC​=(Pclip​.x/Pclip​.w,Pclip​.y/Pclip​.w,Pclip​.z/Pclip​.w)\
> \
> Les coordonnées résultantes (xNDC​,yNDC​) sont maintenant dans un carré 2D allant de -1 à 1. La dernière étape, la transformation viewport, mappe ces coordonnées aux coordonnées finales de la fenêtre d\'affichage, c\'est-à-dire les coordonnées en pixels de l\'image (par exemple, de (0,0) à (1920,1080)).11 La coordonnée\
> zNDC​ est conservée pour le test de profondeur.

### 48.3.2 De la Géométrie aux Pixels : L\'Algorithme de Rastérisation

Une fois les sommets d\'un triangle transformés en coordonnées d\'écran, la rastérisation prend le relais. Son but est de déterminer l\'ensemble des centres de pixels qui se trouvent à l\'intérieur de ce triangle 2D.

#### L\'Algorithme des Fonctions de Bord

Une méthode de rastérisation très efficace et couramment implémentée en matériel est basée sur les fonctions de bord (edge functions). Le principe est le suivant : chaque arête d\'un triangle peut être vue comme une ligne qui sépare le plan 2D en deux demi-plans. Pour une arête définie par deux sommets V0​(x0​,y0​) et V1​(x1​,y1​), on peut définir une fonction de bord E(x,y) pour n\'importe quel point P(x,y) :

E(P)=(x−x0​)(y1​−y0​)−(y−y0​)(x1​−x0​)

Le signe du résultat de cette fonction indique de quel côté de la ligne (définie par l\'arête) se trouve le point P.15 En définissant les sommets du triangle dans un ordre cohérent (par exemple, dans le sens antihoraire), un point

P est considéré comme étant à l\'intérieur du triangle si et seulement si il se trouve du même côté (par exemple, le côté \"droit\") des trois arêtes simultanément. L\'algorithme de rastérisation parcourt donc tous les pixels dans un rectangle englobant le triangle et évalue les trois fonctions de bord pour le centre de chaque pixel. Si les trois résultats ont le signe positif (ou sont nuls), le pixel est couvert par le triangle et un fragment est généré.

#### Coordonnées Barycentriques et Interpolation

Les fonctions de bord fournissent un bénéfice supplémentaire : leurs résultats peuvent être utilisés pour calculer les **coordonnées barycentriques** (λ0​,λ1​,λ2​) de n\'importe quel point P à l\'intérieur du triangle. Ces trois nombres représentent les poids respectifs des trois sommets

V0​,V1​,V2​ pour définir la position de P. Ils ont deux propriétés clés :

> P=λ0​V0​+λ1​V1​+λ2​V2​
>
> λ0​+λ1​+λ2​=1

L\'utilité principale des coordonnées barycentriques est l\'interpolation. N\'importe quel attribut défini aux sommets (couleur, normale, coordonnée de texture, profondeur) peut être interpolé sur toute la surface du triangle. Si un attribut A a les valeurs A0​,A1​,A2​ aux sommets, sa valeur interpolée AP​ au point P est simplement :

AP​=λ0​A0​+λ1​A1​+λ2​A2​

Cette interpolation est le mécanisme par lequel les fragments générés par la rastérisation obtiennent leurs attributs, qui seront ensuite utilisés par le nuanceur de pixels.

Il est crucial de noter que, pour obtenir des résultats visuellement corrects en présence de perspective, l\'interpolation doit être **corrigée pour la perspective**. Une interpolation linéaire simple dans l\'espace écran entraînerait des distorsions, notamment pour les textures. La méthode correcte consiste à interpoler les attributs divisés par la coordonnée w de chaque sommet, puis à diviser le résultat par la valeur de 1/w interpolée.

### 48.3.3 La Physique de la Lumière Locale : Le Modèle d\'Illumination de Phong

Une fois qu\'un fragment est généré, le nuanceur de pixels doit déterminer sa couleur. Pour cela, il utilise un **modèle d\'illumination** (ou *modèle de réflexion*). Un modèle d\'**illumination locale** calcule la couleur d\'un point sur une surface en ne considérant que les propriétés de ce point, les propriétés des sources lumineuses et la position de la caméra, ignorant les interactions avec les autres objets de la scène (comme la lumière réfléchie par un mur voisin).

Le modèle de réflexion de Phong, développé par Bui Tuong Phong, est un modèle empirique simple mais efficace qui est devenu un standard en infographie temps réel. Il décompose la lumière réfléchie en trois composantes  :

> Composante Ambiante (Iambiante​):\
> Cette composante simule l\'illumination indirecte de manière très approximative. Elle représente la lumière qui a rebondi tellement de fois dans la scène qu\'elle semble provenir de toutes les directions de manière uniforme. C\'est une couleur constante ajoutée à tous les objets pour éviter que les parties non directement éclairées ne soient complètement noires.\
> \
> Iambiante​=ka​⋅Ia​\
> \
> où ka​ est le coefficient de réflexion ambiante du matériau (sa \"couleur ambiante\") et Ia​ est l\'intensité de la lumière ambiante de la scène.
>
> Composante Diffuse (Idiffuse​):\
> Cette composante modélise la réflexion sur les surfaces mates ou rugueuses (dites Lambertiennes). Ces surfaces diffusent la lumière incidente de manière égale dans toutes les directions. L\'intensité de la lumière réfléchie dépend de l\'angle d\'incidence de la lumière. Conformément à la loi de Lambert, elle est maximale lorsque la lumière frappe la surface perpendiculairement et nulle lorsqu\'elle est rasante.\
> \
> Idiffuse​=kd​⋅Il​⋅max(0,N⋅L)\
> \
> où kd​ est le coefficient de réflexion diffuse du matériau (sa \"couleur de base\"), Il​ est l\'intensité de la source lumineuse, N est le vecteur normal unitaire à la surface, et L est le vecteur unitaire pointant de la surface vers la source lumineuse. Le produit scalaire N⋅L est égal au cosinus de l\'angle entre les deux vecteurs.
>
> Composante Spéculaire (Ispeˊculaire​):\
> Cette composante simule les reflets brillants et concentrés que l\'on observe sur les surfaces lisses et polies, comme le plastique ou le métal. Contrairement à la lumière diffuse, la lumière spéculaire est réfléchie principalement dans une direction spécifique : la direction de réflexion miroir. Le reflet n\'est visible que si la caméra se trouve près de cette direction.\
> \
> Ispeˊculaire​=ks​⋅Il​⋅(max(0,R⋅V))α\
> \
> où ks​ est le coefficient de réflexion spéculaire du matériau, V est le vecteur unitaire pointant de la surface vers la caméra, et R est le vecteur unitaire de la direction de réflexion parfaite de L par rapport à N (calculé comme R=2(N⋅L)N−L). L\'exposant de brillance α (ou shininess) contrôle la taille et l\'intensité du reflet : une valeur élevée produit un petit reflet très intense (surface très lisse), tandis qu\'une valeur faible produit un reflet large et diffus (surface moins lisse).

L\'intensité lumineuse totale pour une source de lumière est la somme de ces trois composantes. S\'il y a plusieurs sources lumineuses, leurs contributions diffuse et spéculaire sont additionnées :

Itotale​=Iambiante​+i∈lumieˋres∑​(Idiffuse,i​+Ispeˊculaire,i​)

### 48.3.4 L\'Art de l\'Ombrage (Shading) : Comparaison des Techniques

Il est essentiel de distinguer le *modèle d\'illumination* (la formule mathématique, comme celle de Phong) de la *technique d\'ombrage* (*shading*), qui définit où et à quelle fréquence ce modèle est appliqué. La progression des techniques d\'ombrage peut être vue comme une application directe des principes de la théorie de l\'échantillonnage. Chaque étape augmente la fréquence d\'échantillonnage du modèle d\'illumination sur la surface de l\'objet, permettant de reconstruire plus fidèlement le signal lumineux final. Ce compromis entre la fréquence d\'échantillonnage (qualité) et le coût de calcul (performance) est l\'un des arbitrages les plus fondamentaux en infographie temps réel.

> **Ombrage Plat (Flat Shading) :** C\'est la technique la plus simple et la plus rapide. Le modèle d\'illumination est évalué une seule et unique fois pour chaque polygone (triangle). On utilise la normale géométrique de la face du triangle, et la couleur calculée est appliquée uniformément à tous les pixels du triangle. Le résultat est un aspect facetté et anguleux, où chaque polygone est clairement visible. C\'est un sous-échantillonnage extrême du signal lumineux.
>
> **Ombrage de Gouraud (Gouraud Shading) :** Développée par Henri Gouraud, cette technique améliore considérablement la qualité visuelle. Le modèle d\'illumination est calculé à chaque sommet du polygone, en utilisant une normale de sommet (souvent la moyenne des normales des faces adjacentes). Les couleurs résultantes aux sommets sont ensuite interpolées linéairement sur toute la surface du polygone lors de la rastérisation. Cela produit des transitions de couleur douces entre les faces, donnant une illusion de courbure. Cependant, l\'ombrage de Gouraud a une faiblesse majeure : les reflets spéculaires qui se trouvent au milieu d\'un polygone (et non près d\'un sommet) seront manqués ou mal rendus. Si la fréquence du signal lumineux (le reflet) est plus élevée que la fréquence d\'échantillonnage (la densité des sommets), des artefacts d\'aliasing apparaissent.
>
> **Ombrage de Phong (Phong Shading) :** À ne pas confondre avec le *modèle* de Phong, cette technique d\'interpolation offre la meilleure qualité. Au lieu d\'interpoler les couleurs finales, l\'ombrage de Phong interpole les vecteurs normaux des sommets sur toute la surface du polygone. Ensuite, pour chaque fragment (pixel) généré par la rastérisation, le modèle d\'illumination de Phong est calculé en utilisant cette normale interpolée. Comme le calcul est effectué par pixel, cette méthode peut reproduire correctement les reflets spéculaires, même au milieu de grands polygones, produisant des surfaces lisses et des reflets précis. C\'est la technique la plus coûteuse car elle exige un calcul d\'illumination complet pour chaque pixel, mais elle est la norme pour le rendu de haute qualité en temps réel.

Le tableau suivant synthétise les caractéristiques de ces trois techniques.

  ------------------------- ----------------------------------------------------- ---------------------------------------- ----------------------------------------
  Critère                   Ombrage Plat (Flat Shading)                           Ombrage de Gouraud                       Ombrage de Phong

  **Point de Calcul**       Une fois par polygone                                 À chaque sommet                          À chaque pixel (fragment)

  **Valeur Interpolée**     Aucune (couleur constante)                            Couleur                                  Vecteur Normal

  **Coût de Calcul**        Très faible                                           Faible à moyen                           Élevé

  **Qualité Visuelle**      Facetté, anguleux                                     Lisse (transitions de couleur)           Très lisse, réaliste

  **Reflets Spéculaires**   Inexistants (sauf si la face entière est un reflet)   Médiocre (souvent manqués ou déformés)   Précis et lisses

  **Artefacts Typiques**    Apparence \"low-poly\" évidente                       Bandes de Mach, reflets instables        Aucun (si la géométrie est suffisante)
  ------------------------- ----------------------------------------------------- ---------------------------------------- ----------------------------------------

### 48.3.5 La Gestion de l\'Occlusion : L\'Algorithme du Z-Buffer

Dans une scène 3D, certains objets en cachent d\'autres. La rastérisation traite les polygones dans un ordre qui n\'est pas nécessairement du plus éloigné au plus proche. Il faut donc un mécanisme pour résoudre le problème de la détermination des surfaces cachées (*Hidden Surface Removal*). L\'algorithme le plus utilisé est le

**Z-buffering** (ou *depth buffering*).

Le principe est simple mais efficace. En plus du **tampon de couleur** (*color buffer*) qui stocke les valeurs de couleur de l\'image finale, le GPU gère un **tampon de profondeur** (*Z-buffer*). C\'est un tableau 2D de la même résolution que l\'image, où chaque cellule stocke une valeur de profondeur (généralement la coordonnée Z après la transformation de projection, normalisée entre 0 et 1).

L\'algorithme fonctionne comme suit  :

> **Initialisation :** Avant de rendre une nouvelle image, le tampon de couleur est effacé avec la couleur de fond, et chaque valeur du Z-buffer est initialisée à la valeur de profondeur maximale possible (par exemple, 1.0, représentant l\'infini ou le plan de découpage lointain).
>
> **Rastérisation :** Pour chaque triangle de la scène, la rastérisation génère des fragments. Pour chaque fragment à la position d\'écran (x,y), sa profondeur zfrag​ est calculée par interpolation des valeurs de profondeur de ses sommets.
>
> **Test de Profondeur :** La valeur zfrag​ est comparée à la valeur actuellement stockée dans le Z-buffer à la même position, zbuffer​(x,y).
>
> **Mise à Jour :**

Si zfrag​\<zbuffer​(x,y), cela signifie que le nouveau fragment est plus proche de la caméra que tout ce qui a été dessiné jusqu\'à présent à ce pixel. Le fragment est donc visible. Deux mises à jour sont effectuées : le Z-buffer est mis à jour avec la nouvelle profondeur (zbuffer​(x,y)=zfrag​), et la couleur du fragment est écrite dans le tampon de couleur à la position (x,y).

Si zfrag​≥zbuffer​(x,y), le fragment est caché par une surface déjà dessinée. Il est donc simplement ignoré, et aucune mise à jour n\'est effectuée.

Le Z-buffer est extrêmement efficace car il est simple à implémenter en matériel et ne dépend pas de l\'ordre dans lequel les polygones sont rendus. Ses principales limitations sont sa précision finie, qui peut conduire à des artefacts de \"Z-fighting\" (scintillement) lorsque deux surfaces sont très proches l\'une de l\'autre, et sa difficulté à gérer nativement la transparence, qui nécessite généralement de trier les objets transparents et de les rendre après les objets opaques.

## 48.4 La Quête du Photoréalisme : Lancer de Rayons et Illumination Globale

Si la rastérisation excelle dans la production d\'images à haute vitesse, elle peine à simuler de manière naturelle des phénomènes optiques complexes comme les réflexions fidèles, les réfractions à travers des matériaux transparents ou les ombres douces. Ces effets nécessitent de connaître les interactions entre les objets, une information que l\'approche \"objet par objet\" de la rastérisation ignore. Pour atteindre un niveau de réalisme supérieur, un paradigme de rendu fondamentalement différent est nécessaire : le lancer de rayons (*ray tracing*). Cette section explore cette approche, qui simule le trajet de la lumière pour modéliser la physique de la formation d\'une image.

Le tableau suivant met en opposition les deux grandes philosophies du rendu 3D, servant de prélude à notre exploration du lancer de rayons. Il met en évidence les forces et les faiblesses inhérentes de la rastérisation que le lancer de rayons vient combler.

  ---------------------------- ------------------------------------------------- -----------------------------------------------------------
  Critère                      Rastérisation                                     Lancer de Rayons (Ray Tracing)

  **Principe de base**         Projection de la géométrie 3D sur l\'écran 2D     Simulation du trajet inverse des rayons lumineux

  **Boucle principale**        Par primitive (triangle)                          Par pixel de l\'image

  **Ordre de traitement**      Centré sur l\'objet (*Object-order*)              Centré sur l\'image (*Image-order*)

  **Performance**              Très rapide, optimisé pour le temps réel          Coûteux en calculs, traditionnellement pour le hors-ligne

  **Gestion des ombres**       Techniques additionnelles (ex: *shadow maps*)     Naturelle (via les rayons d\'ombre)

  **Réflexions/Réfractions**   Approximations (ex: *environment maps*)           Naturelles et précises (via les rayons récursifs)

  **Illumination globale**     Non gérée nativement (approximations complexes)   Fondement des algorithmes d\'illumination globale
  ---------------------------- ------------------------------------------------- -----------------------------------------------------------

### 48.4.1 Un Paradigme Alternatif : L\'Algorithme Fondamental du Lancer de Rayons

Contrairement à la rastérisation qui est un processus *object-order* (la boucle principale parcourt les objets), le lancer de rayons est un processus *image-order*. La boucle principale parcourt chaque pixel de l\'image finale et se demande : \"Quelle est la couleur de la lumière qui atteint la caméra à travers ce pixel?\". Pour répondre à cette question, on simule le trajet d\'un rayon lumineux en sens inverse, de la caméra vers la scène.

L\'algorithme de base, souvent appelé **Ray Casting**, fonctionne comme suit  :

> **Génération des Rayons Primaires :** Pour chaque pixel de l\'image, un **rayon primaire** est généré. Ce rayon a pour origine la position de la caméra et sa direction est calculée pour passer à travers le centre (ou un point d\'échantillonnage) du pixel sur le plan de l\'image virtuel.
>
> **Calcul d\'Intersection :** Ce rayon est ensuite testé pour une intersection avec chaque objet de la scène. Le cœur mathématique du lancer de rayons réside dans ces tests d\'intersection géométrique. Pour des primitives simples, les solutions sont analytiques :

**Rayon-Sphère :** En substituant l\'équation paramétrique du rayon dans l\'équation implicite de la sphère, on obtient une équation du second degré. Le discriminant de cette équation révèle s\'il y a zéro, une (tangence) ou deux intersections.

**Rayon-Triangle :** Des algorithmes efficaces comme celui de Möller-Trumbore permettent de calculer le point d\'intersection et ses coordonnées barycentriques directement.\
\
Parmi toutes les intersections trouvées pour un rayon donné, seule la plus proche de l\'origine du rayon (la caméra) est conservée. C\'est le point de la surface qui est visible à travers ce pixel.

> **Calcul de l\'Ombrage :** Si une intersection est trouvée en un point P sur un objet :

**Rayons d\'Ombre :** Pour chaque source lumineuse de la scène, un **rayon d\'ombre** (*shadow ray*) est lancé depuis le point P en direction de la source lumineuse.

**Test d\'Occlusion :** On teste si ce rayon d\'ombre intersecte un autre objet *entre* le point P et la source lumineuse. Si c\'est le cas, le point P est à l\'ombre par rapport à cette source. Sinon, il est directement éclairé.

**Calcul de la Couleur :** La couleur finale du pixel est calculée en appliquant un modèle d\'illumination locale (comme le modèle de Phong) au point P, en ne tenant compte que des sources lumineuses qui ne sont pas bloquées.

Si le rayon primaire n\'intersecte aucun objet, le pixel prend la couleur de fond de la scène. Cet algorithme résout de manière intrinsèque le problème des surfaces cachées et produit des ombres portées nettes et précises.

### 48.4.2 Simuler les Réflexions et Réfractions : Le Lancer de Rayons Récursif

Le *Ray Casting* ne modélise que l\'illumination directe. Pour atteindre un véritable photoréalisme, il est essentiel de simuler les rebonds de la lumière sur les surfaces. C\'est l\'apport fondamental de l\'algorithme de **lancer de rayons récursif** proposé par Turner Whitted en 1980.

L\'idée est d\'étendre l\'algorithme de base en traitant la lumière réfléchie et réfractée comme de nouvelles sources de lumière pour le point d\'intersection. Le processus devient récursif  :

> La couleur d\'un point P est la somme de son illumination locale (calculée comme dans le Ray Casting) ET des contributions des rayons secondaires.
>
> **Rayon de Réflexion :** Si la surface au point P est réfléchissante (comme un miroir), un nouveau **rayon de réflexion** est généré. Sa direction est calculée selon la loi de la réflexion (l\'angle de réflexion est égal à l\'angle d\'incidence). L\'algorithme de lancer de rayons est alors appelé **récursivement** avec ce nouveau rayon. La couleur retournée par cet appel récursif (pondérée par le coefficient de réflexion du matériau) est ajoutée à la couleur du point P.
>
> **Rayon de Réfraction :** Si la surface est transparente (comme du verre ou de l\'eau), un **rayon de réfraction** (ou transmis) est généré. Sa direction est calculée en utilisant la **loi de Snell-Descartes**, qui dépend des indices de réfraction des deux milieux. De même, un appel récursif est fait avec ce rayon réfracté, et la couleur retournée (pondérée par le coefficient de transparence du matériau) est ajoutée au résultat final.

Pour éviter une récursion infinie (par exemple, entre deux miroirs se faisant face), une profondeur de récursion maximale est définie. Lorsqu\'un rayon atteint cette profondeur, aucun nouveau rayon secondaire n\'est lancé. L\'algorithme de Whitted a été une révolution, car il a permis de générer pour la première fois des images avec des réflexions et des réfractions multiples et physiquement correctes.

### 48.4.3 La Lumière dans son Ensemble : L\'Illumination Globale et l\'Équation de Rendu

Le lancer de rayons de style Whitted est puissant, mais il ne simule que les rebonds sur des surfaces parfaitement spéculaires (miroirs) ou diélectriques (verre). Il ignore un aspect fondamental de la lumière dans le monde réel : les rebonds sur les surfaces diffuses. La lumière qui frappe un mur rouge ne disparaît pas ; une partie est absorbée, et une partie est réfléchie sous forme de lumière rouge, qui va à son tour éclairer subtilement les objets voisins (un phénomène appelé **saignement de couleur** ou *color bleeding*).

L\'**Illumination Globale (GI)** est le terme générique pour les algorithmes qui cherchent à simuler *tous* les trajets possibles de la lumière dans une scène, incluant non seulement la lumière directe des sources, mais aussi la lumière indirecte qui a rebondi une ou plusieurs fois sur des surfaces diffuses ou spéculaires.

La base théorique de toute l\'illumination globale est l\'**Équation de Rendu**, formulée indépendamment par David Immel et James Kajiya en 1986. Cette équation est une formulation mathématique, basée sur la physique de l\'optique géométrique, de l\'équilibre de l\'énergie lumineuse en un point d\'une surface. Elle stipule que la lumière sortant (

Lo​) d\'un point x dans une direction ωo​ est la somme de la lumière que ce point émet de lui-même (Le​) et de toute la lumière incidente (Li​) provenant de toutes les directions possibles de l\'hémisphère Ω au-dessus de ce point, réfléchie dans la direction ωo​.

Sa forme intégrale est la suivante :

\$\$ L_o(x, \\omega_o) = L_e(x, \\omega_o) + \\int\_{\\Omega} f_r(x, \\omega_i, \\omega_o) L_i(x, \\omega_i) (\\omega_i \\cdot \\vec{n}) d\\omega_i \$\$

Décortiquons ses termes :

> Lo​(x,ωo​) : La **luminance** (énergie lumineuse par unité de surface, par unité d\'angle solide) sortant du point x dans la direction ωo​. C\'est la valeur que nous cherchons à calculer.
>
> Le​(x,ωo​) : La luminance émise par le point x (uniquement non nulle si x est sur une source lumineuse).
>
> ∫Ω​\...dωi​ : Une intégrale sur toutes les directions entrantes ωi​ de l\'hémisphère Ω centrée sur le point x.
>
> fr​(x,ωi​,ωo​) : La **Fonction de Distribution de Réflectance Bidirectionnelle** (BRDF). C\'est une fonction qui décrit les propriétés de réflectivité du matériau au point x. Elle définit quelle proportion de la lumière arrivant de la direction ωi​ est réfléchie dans la direction ωo​.
>
> Li​(x,ωi​) : La luminance incidente arrivant au point x depuis la direction ωi​.
>
> (ωi​⋅n) : Le produit scalaire entre la direction de la lumière incidente et la normale n à la surface. Ce terme cosinus (loi de Lambert) module l\'énergie incidente en fonction de l\'angle.

La nature profondément récursive de l\'équation est cachée dans le terme Li​. La lumière incidente arrivant en x depuis une direction ωi​ n\'est autre que la lumière sortante Lo​ d\'un autre point y de la scène, visible depuis x dans cette direction. Cette interdépendance rend la résolution de l\'équation extrêmement difficile. L\'équation de rendu a transformé l\'infographie d\'un domaine d\'astuces algorithmiques en une discipline basée sur la simulation physique, fournissant un \"étalon-or\" théorique.

### 48.4.4 Une Solution par Monte-Carlo : Le Path Tracing

Puisqu\'il n\'existe pas de solution analytique générale à l\'équation de rendu, elle doit être résolue numériquement. Le **Path Tracing** (traçage de chemin) est un algorithme qui applique les **méthodes de Monte-Carlo** pour estimer la valeur de l\'intégrale de l\'équation de rendu.

L\'intégration de Monte-Carlo est une technique statistique qui permet d\'approximer la valeur d\'une intégrale complexe en calculant la moyenne d\'un grand nombre d\'échantillons évalués en des points choisis aléatoirement dans le domaine d\'intégration.

L\'algorithme de Path Tracing applique ce principe de manière élégante  :

> **Échantillonnage par Pixel :** Pour chaque pixel, on lance non pas un, mais N rayons primaires (souvent avec de légères variations de position pour l\'anticrénelage). Chaque rayon deviendra un \"chemin\" lumineux.
>
> **Construction d\'un Chemin :** Un rayon est lancé dans la scène. Lorsqu\'il intersecte une surface au point P :

On évalue la contribution de l\'éclairage direct en ce point (en lançant un rayon d\'ombre vers les sources lumineuses).

Pour simuler la lumière indirecte (l\'intégrale), au lieu de lancer des rayons dans toutes les directions, on choisit **une seule direction de rebond aléatoire** ωrebond​ dans l\'hémisphère au-dessus de P. Ce choix est souvent pondéré par la BRDF du matériau pour privilégier les directions qui réfléchissent le plus de lumière (une technique appelée *importance sampling*).

Un nouveau rayon est lancé depuis P dans la direction ωrebond​.

> **Récursion du Chemin :** Ce processus est répété. Le nouveau rayon intersecte une autre surface, on choisit une nouvelle direction de rebond aléatoire, et ainsi de suite. Le rayon forme un \"chemin\" à travers la scène.
>
> **Condition d\'Arrêt :** Le chemin est terminé lorsqu\'il atteint une profondeur de récursion maximale ou, plus couramment, en utilisant une technique statistique appelée \"roulette russe\", où le chemin a une probabilité de s\'arrêter à chaque rebond, probabilité qui augmente à mesure que sa contribution énergétique diminue. Si un chemin atteint une source lumineuse, la contribution de cette source est ajoutée.
>
> **Moyennage :** La lumière accumulée le long d\'un chemin complet constitue un seul échantillon de la luminance pour le pixel de départ. La couleur finale du pixel est simplement la **moyenne** des couleurs de tous les N chemins tracés pour ce pixel.

Le Path Tracing est un algorithme d\'une grande puissance et simplicité conceptuelle. Il est **impartial**, ce qui signifie qu\'en augmentant le nombre d\'échantillons N, le résultat converge mathématiquement vers la solution correcte de l\'équation de rendu. Son principal inconvénient est sa lente convergence : avec un faible nombre d\'échantillons, l\'image résultante est très \"bruitée\" (pleine de grain), car l\'estimation statistique est de mauvaise qualité. Obtenir une image propre nécessite de calculer des centaines, voire des milliers de chemins par pixel, ce qui explique son coût de calcul historiquement élevé.

## 48.5 Donner Vie au Virtuel : Animation et Simulation Physique

Jusqu\'à présent, nous avons considéré la création d\'images statiques. L\'animation introduit la dimension du temps, transformant les scènes en mondes dynamiques. Le mouvement en infographie peut être créé de deux manières fondamentalement différentes : soit il est dicté par la main de l\'artiste, soit il émerge des lois de la physique. Cette section explore ces deux approches, de la technique traditionnelle de l\'animation par images clés à la complexité de la simulation physique.

### 48.5.1 L\'Animation Dirigée par l\'Artiste : Le Keyframing

L\'**animation par images clés** (*keyframing*) est la technique la plus fondamentale et la plus utilisée en animation 3D. Elle est l\'héritière directe des méthodes de l\'animation traditionnelle sur celluloïd, où les animateurs principaux dessinaient les poses les plus importantes d\'un mouvement, laissant aux assistants le soin de dessiner les images intermédiaires.

#### Le Principe des Images Clés

Le principe est simple et puissant :

> **Définition des Poses Clés :** L\'animateur travaille avec une **ligne de temps** (*timeline*). Pour un objet ou un personnage, il définit ses propriétés (position, rotation, échelle) à des moments spécifiques et cruciaux du temps. Chaque ensemble de propriétés à un instant T est une **image clé** (*keyframe*). Par exemple, pour faire sauter une balle, l\'animateur pourrait définir une clé pour la position de la balle au sol au temps\
> t=0, une autre pour sa position au sommet de sa trajectoire au temps t=0.5, et une dernière pour son retour au sol au temps t=1.
>
> **Interpolation des Images Intermédiaires :** Le logiciel se charge ensuite de calculer automatiquement les images intermédiaires (*in-betweens* ou *tweening*). Il **interpole** les valeurs des propriétés entre les images clés pour créer une transition fluide.

Cette approche offre un contrôle total à l\'artiste, qui peut sculpter le mouvement avec précision en ajustant la position et le moment de chaque clé.

#### Le Rôle Crucial de l\'Interpolation

La manière dont le logiciel calcule les \"in-betweens\" a un impact énorme sur la qualité et la nature du mouvement.

> **Interpolation Linéaire :** La méthode la plus simple consiste à interpoler linéairement les valeurs entre deux clés. Si un objet se déplace de la position P0​ à P1​, sa position à mi-chemin dans le temps sera exactement au milieu du segment \[P0​,P1​\]. Cela produit un mouvement à vitesse constante, qui est souvent perçu comme mécanique et peu naturel.
>
> **Interpolation par Splines :** Pour obtenir des mouvements organiques et crédibles, avec des accélérations et des décélérations douces (*ease-in* et *ease-out*), on utilise des courbes mathématiques plus sophistiquées appelées **splines**. Un spline est une courbe polynomiale par morceaux qui assure une certaine continuité à ses points de jonction.

Les propriétés de l\'objet (par exemple, sa coordonnée X) ne sont plus interpolées le long d\'une droite, mais suivent une courbe de spline au fil du temps. Les animateurs peuvent manipuler directement ces courbes (souvent appelées *animation curves* ou *f-curves*) et leurs tangentes pour affiner le *timing* (la durée d\'une action) et le *spacing* (la distance parcourue entre chaque image), qui sont les principes fondamentaux de l\'animation.

Différents types de splines sont utilisés, comme les **splines de Bézier**, les **B-splines**, ou les **splines de Hermite**. Une variante particulièrement intuitive pour l\'animation est la **spline de Catmull-Rom**, qui a la propriété pratique de passer directement par tous ses points de contrôle (les images clés), ce qui la rend très prévisible pour l\'animateur.

### 48.5.2 L\'Animation Dirigée par les Lois de la Physique

Une approche alternative au keyframing est l\'**animation basée sur la physique**, où le mouvement n\'est pas spécifié manuellement mais est calculé en simulant les lois de la dynamique newtonienne. Au lieu de définir des positions, l\'animateur définit des propriétés physiques (masse, friction, élasticité) et des forces (gravité, vent, explosions), et le mouvement émerge comme une conséquence de ces interactions.

Cette approche offre un réalisme inégalé pour certains types de phénomènes. Il serait extrêmement fastidieux, voire impossible, d\'animer à la main l\'effondrement d\'un bâtiment ou les milliers de débris d\'une explosion. La simulation physique génère ces mouvements complexes de manière procédurale.

Cependant, cette méthode a aussi des inconvénients. Elle est souvent moins contrôlable : il peut être difficile d\'obtenir un résultat artistique précis en manipulant uniquement des forces et des paramètres physiques. De plus, les simulations peuvent être très coûteuses en temps de calcul, en particulier lorsqu\'elles impliquent de nombreuses interactions et collisions.

Le futur de l\'animation de personnages ne réside pas dans un choix binaire entre le contrôle artistique du keyframing et le réalisme de la simulation, mais dans leur synthèse intelligente. Les outils modernes tendent de plus en plus vers une hybridation. Des logiciels comme Cascadeur permettent à un animateur de définir des poses clés, puis utilisent des solveurs physiques pour ajuster les trajectoires, garantir la plausibilité du centre de masse, et ajouter des effets secondaires réalistes comme l\'inertie et le moment cinétique. Ce passage d\'une animation entièrement

*spécifiée* par l\'artiste à une animation *assistée* par la physique représente une évolution majeure du domaine, combinant le meilleur des deux mondes pour produire des mouvements à la fois dirigeables et crédibles.

### 48.5.3 Systèmes de Particules et Dynamique des Corps Rigides

Deux des techniques les plus importantes de l\'animation basée sur la physique sont les systèmes de particules et la dynamique des corps rigides.

#### Systèmes de Particules

Un **système de particules** est une technique utilisée pour modéliser des phénomènes \"flous\" ou chaotiques qui sont difficiles à représenter avec des maillages polygonaux traditionnels. Cela inclut le feu, la fumée, la pluie, la neige, les étincelles, les cascades ou la poussière.

Le principe est de simuler le comportement d\'un grand nombre de points individuels, les **particules**. Chaque particule est un objet simple avec un ensemble d\'attributs :

> Position et vélocité
>
> Couleur et opacité
>
> Taille et orientation
>
> Âge et durée de vie

Un \"émetteur\" génère continuellement de nouvelles particules. Le mouvement de chaque particule est ensuite mis à jour à chaque pas de temps, gouverné par un ensemble de règles ou de forces simples, comme la gravité, la force du vent, ou des forces de turbulence. Les particules meurent lorsqu\'elles atteignent la fin de leur durée de vie. Le comportement complexe et organique du phénomène global (par exemple, le tourbillonnement d\'une fumée) n\'est pas programmé explicitement ; il émerge de l\'interaction de ces milliers de particules suivant des règles simples.

#### Dynamique des Corps Rigides

La **dynamique des corps rigides** (*rigid body dynamics*) simule le mouvement d\'objets solides qui ne se déforment pas sous l\'effet des forces. C\'est la base de la simulation de la chute d\'objets, des collisions, des empilements, etc.

La simulation est fondée sur les lois du mouvement de Newton  :

> **Mouvement de Translation :** Le mouvement du centre de masse de l\'objet est gouverné par l\'équation F=ma, où F est la somme de toutes les forces externes (gravité, forces de contact), m est la masse de l\'objet, et a est l\'accélération de son centre de masse.
>
> **Mouvement de Rotation :** La rotation de l\'objet autour de son centre de masse est gouvernée par une équation similaire pour le moment angulaire : τ=Iα, où τ est la somme des couples (moments de force), I est le moment d\'inertie (qui décrit la résistance de l\'objet à la rotation), et α est l\'accélération angulaire.

Les deux plus grands défis dans la simulation de corps rigides sont :

> **La Détection de Collision :** Déterminer de manière robuste et efficace si et quand deux objets de formes complexes se touchent.
>
> **La Réponse à la Collision :** Calculer les forces d\'impulsion et de friction qui résultent d\'une collision pour modifier correctement les vitesses linéaires et angulaires des objets, en respectant les principes de conservation de la quantité de mouvement et du moment cinétique.

Ces simulations sont au cœur de la plupart des moteurs de jeu modernes et des systèmes d\'effets spéciaux, fournissant une base pour un monde virtuel interactif et physiquement crédible.

## Conclusion

Ce chapitre a parcouru le vaste paysage de l\'infographie, depuis les fondations conceptuelles du pipeline de rendu jusqu\'aux frontières du photoréalisme et de l\'animation dynamique. Nous avons vu que la création d\'une image de synthèse est un processus remarquablement structuré, une \"chaîne de montage\" qui transforme des données abstraites en une expérience visuelle.

Nous avons établi que le **pipeline de rendu**, avec sa séquence d\'étapes (Application, Géométrie, Rastérisation, Pixel), constitue le cadre organisationnel de la quasi-totalité du rendu en temps réel. L\'évolution de ce pipeline, passant d\'une structure matérielle fixe à une architecture hautement programmable via les **nuanceurs**, a été le principal moteur de l\'innovation visuelle au cours des dernières décennies, permettant une flexibilité et une sophistication sans précédent.

La représentation du monde virtuel repose sur une dichotomie fondamentale et efficace : la **géométrie**, définie par des **maillages polygonaux**, et l\'**apparence**, conférée par des **textures**. Le **mappage UV** sert de pont ingénieux entre ces deux domaines, permettant de créer des mondes visuellement riches avec une complexité géométrique gérable.

Le cœur du rendu se divise en deux paradigmes. La **rastérisation**, rapide et efficace, projette la géométrie sur l\'écran et détermine la couleur des pixels en se basant sur des modèles d\'illumination locale comme celui de Phong. Sa progression, de l\'ombrage plat à l\'ombrage de Gouraud puis de Phong, illustre un principe fondamental : l\'amélioration de la qualité visuelle est souvent une question d\'augmentation de la fréquence d\'échantillonnage du modèle d\'illumination. En parallèle, le **lancer de rayons** offre une approche basée sur la simulation physique du trajet de la lumière. Bien que plus coûteux, il résout nativement des problèmes complexes comme les ombres, les réflexions et les réfractions. L\'avènement de l\'**équation de rendu** a fourni un cadre mathématique unificateur pour tout le transport de la lumière, transformant l\'infographie en une discipline de simulation. Le **Path Tracing**, en tant que méthode de Monte-Carlo pour résoudre cette équation, représente l\'état de l\'art pour la génération d\'images photoréalistes.

Enfin, l\'introduction de la dimension temporelle nous a menés à l\'**animation**. Nous avons contrasté le contrôle artistique direct de l\'**animation par images clés**, rendue fluide par l\'interpolation via des splines, avec le réalisme émergent de la **simulation physique**. La tendance actuelle est à la convergence de ces deux mondes, où des outils intelligents assistent l\'intention de l\'artiste avec des contraintes physiques pour produire des mouvements à la fois expressifs et crédibles.

En somme, l\'infographie est un domaine de dualités : géométrie et apparence, rastérisation et lancer de rayons, contrôle artistique et simulation physique. La maîtrise de cette discipline réside dans la compréhension de ces compromis et dans l\'art de les combiner pour repousser sans cesse les limites du possible, que ce soit pour créer des jeux vidéo interactifs, des films d\'animation saisissants ou des visualisations scientifiques éclairantes.

