# Chapitre I.64 : Architecture des Réseaux Neuronaux Quantiques : Conception et Mise en Œuvre

## 64.1 Introduction : Vers une Neuro-informatique Quantique

### 64.1.1 Contexte : Le RNQ comme incarnation architecturale de la convergence IA-Quantique

L\'aube du XXIe siècle est témoin de la convergence de deux des domaines technologiques les plus transformateurs : l\'intelligence artificielle (IA) et l\'informatique quantique. Cette confluence, loin d\'être une simple juxtaposition de disciplines, engendre un nouveau paradigme computationnel, l\'IA quantique, qui promet de redéfinir les frontières du calculable. Au cœur de cette révolution se trouve le Réseau Neuronal Quantique (RNQ), une architecture qui incarne la synergie profonde et bidirectionnelle entre ces deux champs. D\'une part, l\'IA quantique exploite les principes fondamentaux de la mécanique quantique --- superposition et intrication --- pour concevoir des modèles d\'apprentissage capables d\'effectuer des calculs sur des espaces de données d\'une dimensionnalité inaccessible aux ordinateurs classiques. D\'autre part, les techniques d\'IA classique, et plus particulièrement l\'apprentissage automatique, se révèlent indispensables pour relever les défis inhérents à la construction, à la calibration et à l\'optimisation des processeurs quantiques eux-mêmes.

Cette fusion technologique n\'est pas une quête purement académique ; elle est motivée par la promesse de résoudre des problèmes d\'une complexité aujourd\'hui prohibitive dans des secteurs critiques. En finance, les RNQ pourraient permettre une optimisation de portefeuille en analysant simultanément un nombre de variables et de scénarios bien plus grand que ne le permettent les supercalculateurs actuels. Dans l\'industrie pharmaceutique, ils offrent la perspective de simuler avec une précision inégalée les interactions moléculaires, accélérant ainsi de manière spectaculaire la découverte de nouveaux médicaments.

Cependant, la puissance de cette convergence s\'accompagne de responsabilités et de défis considérables. L\'émergence de l\'IA quantique impose le développement de cadres éthiques robustes pour garantir une « IA digne de confiance ». Les questions de transparence, de biais et d\'impact sociétal, déjà prégnantes dans l\'IA classique, sont amplifiées par la complexité des systèmes quantiques. De plus, la capacité des ordinateurs quantiques à factoriser de grands nombres menace de rendre obsolète une grande partie de la cryptographie à clé publique qui sécurise nos communications numériques, créant un impératif urgent pour le développement de nouvelles infrastructures de cybersécurité post-quantique. Le RNQ, en tant que technologie habilitante, se trouve au centre de ces promesses et de ces périls.

### 64.1.2 Problématique : Pourquoi les réseaux neuronaux classiques atteignent-ils leurs limites et comment le quantique offre-t-il une nouvelle voie?

Depuis plusieurs décennies, les réseaux de neurones artificiels classiques, et en particulier les modèles d\'apprentissage profond (deep learning), ont été le moteur d\'avancées spectaculaires en IA. Néanmoins, leur succès s\'accompagne d\'une prise de conscience de leurs limites fondamentales, qui se manifestent sur plusieurs fronts.

Premièrement, la complexité de calcul devient un obstacle majeur pour certaines classes de problèmes. Les problèmes d\'optimisation combinatoire, omniprésents en logistique, en finance et en ingénierie, impliquent de trouver la meilleure solution parmi un nombre de possibilités qui croît de manière exponentielle avec la taille du problème. Les approches classiques, même sur les plus puissants supercalculateurs, se heurtent à ce \"mur exponentiel\".

Deuxièmement, les modèles classiques sont fondamentalement inadaptés à la simulation de systèmes quantiques. La description complète de l\'état d\'un système de N particules quantiques intriquées requiert un nombre de paramètres qui croît exponentiellement avec N. Tenter de simuler de tels systèmes avec des bits classiques est une tâche vouée à l\'échec au-delà de quelques dizaines de particules, ce qui freine la recherche en science des matériaux et en chimie quantique.

Troisièmement, la course à la performance des grands modèles de langage (LLM) et autres modèles d\'apprentissage profond a entraîné une croissance exponentielle de leur taille et de leur consommation de ressources, posant des défis économiques et environnementaux significatifs.

Face à ces limites, l\'informatique quantique propose une voie alternative radicale. Elle ne se contente pas d\'offrir plus de puissance de calcul brute, mais introduit une nouvelle forme de traitement de l\'information. Le principe de superposition permet à un registre de N qubits d\'exister simultanément dans une combinaison de 2N états, offrant un parallélisme de calcul massif. Le phénomène d\'intrication crée des corrélations non-locales entre les qubits, permettant d\'explorer des espaces de solutions vastes et complexes d\'une manière qui n\'a pas d\'équivalent classique.

Il est crucial de comprendre que le calcul quantique n\'est pas destiné à remplacer le calcul classique dans son ensemble. Il s\'agit plutôt d\'un co-processeur hautement spécialisé, conçu pour exceller sur des tâches spécifiques où les modèles classiques sont inefficaces. La véritable puissance réside dans l\'architecture hybride, où un ordinateur classique orchestre le calcul, déléguant au processeur quantique les sous-problèmes pour lesquels il offre un avantage potentiel. C\'est précisément cette architecture hybride qui est au cœur du modèle dominant des réseaux neuronaux quantiques.

### 64.1.3 Définition d\'un Réseau Neuronal Quantique (RNQ) : Un modèle hybride variationnel

Un Réseau Neuronal Quantique (RNQ) peut être défini formellement comme un modèle d\'apprentissage automatique hybride qui intègre un processeur quantique (QPU) et un processeur classique (CPU ou GPU) dans une boucle d\'optimisation collaborative. Ce modèle est qualifié de \"variationnel\" car il s\'appuie sur le principe variationnel de la mécanique quantique pour trouver des solutions approximatives à des problèmes complexes.

L\'architecture d\'un RNQ typique se décompose en deux composantes principales :

1. **La composante quantique :** Il s\'agit d\'un circuit quantique paramétré, également appelé *ansatz* ou circuit variationnel. Ce circuit est exécuté sur un QPU. Il peut être vu comme l\'analogue d\'un réseau de neurones classique  :

   - Les **qubits** agissent comme des neurones, portant l\'information sous forme d\'états quantiques.
   - Les **portes quantiques paramétrées** (par exemple, des rotations dont l\'angle est un paramètre ajustable) jouent le rôle des poids synaptiques, appliquant des transformations à l\'état des qubits.
   - La **mesure** quantique, effectuée à la fin du circuit, projette l\'état quantique final sur une base classique, produisant la sortie du modèle (par exemple, une prédiction de classe).
2. **La composante classique :** Il s\'agit d\'un algorithme d\'optimisation classique (par exemple, une descente de gradient) qui s\'exécute sur un CPU. Son rôle est d\'ajuster itérativement les paramètres du circuit quantique (les angles des portes de rotation) afin de minimiser une fonction de coût (ou fonction de perte). Cette fonction de coût quantifie l\'écart entre les prédictions du RNQ et les valeurs cibles des données d\'entraînement.

Le fonctionnement est une boucle itérative : l\'ordinateur classique propose un ensemble de paramètres, le QPU exécute le circuit avec ces paramètres et renvoie le résultat de la mesure, le classique calcule le coût, puis met à jour les paramètres pour la prochaine itération. Ce paradigme, connu sous le nom d\'Algorithme Quantique Variationnel (VQA), est le modèle dominant pour les RNQ à l\'ère des ordinateurs quantiques bruités à échelle intermédiaire (NISQ - Noisy Intermediate-Scale Quantum).

La prévalence de cette architecture hybride n\'est pas un choix arbitraire, mais une réponse directe et pragmatique aux contraintes fondamentales des processeurs quantiques actuels. Les dispositifs NISQ sont caractérisés par un nombre limité de qubits, des temps de cohérence courts et des taux d\'erreur non négligeables. Une approche purement quantique nécessitant des circuits très profonds et une correction d\'erreurs robuste est actuellement hors de portée. Le modèle variationnel hybride contourne habilement ces obstacles en déchargeant la tâche d\'optimisation, qui peut être très longue et complexe, sur des processeurs classiques fiables et matures. Le QPU n\'est sollicité que pour la tâche où il est présumé offrir un avantage : la préparation efficace d\'états quantiques complexes et l\'évaluation de valeurs d\'espérance, qui sont des opérations potentiellement difficiles à simuler classiquement. Cette répartition des tâches minimise la charge sur le composant quantique, le plus fragile, rendant l\'algorithme global plus robuste au bruit et réalisable avec la technologie actuelle. Ainsi, l\'architecture même des RNQ modernes est une illustration des principes de co-conception dictés par l\'état actuel du matériel quantique.

### 64.1.4 Objectifs et feuille de route du chapitre

Ce chapitre a pour ambition de servir de traité de référence exhaustif sur l\'architecture, la conception et la mise en œuvre pratique des réseaux neuronaux quantiques. L\'objectif est de fournir au lecteur, qu\'il soit chercheur en informatique quantique, ingénieur en apprentissage automatique ou physicien, les fondements théoriques et les outils pratiques nécessaires pour naviguer dans ce domaine en pleine effervescence. Nous chercherons à équiper le lecteur d\'une compréhension profonde, non seulement du \"comment\", mais aussi du \"pourquoi\" derrière les choix de conception architecturale.

Pour atteindre cet objectif, le chapitre est structuré en quatre parties logiques, progressant des concepts les plus fondamentaux aux considérations d\'implémentation les plus avancées :

- **Partie I : Principes Fondamentaux de la Calculabilité Neuronale Quantique.** Cette partie établira les bases. Nous déconstruirons le RNQ en ses briques élémentaires : le qubit comme neurone, l\'espace de Hilbert comme espace de caractéristiques, les transformations unitaires comme couches de poids, et la mesure comme fonction d\'activation.
- **Partie II : Paradigmes Architecturaux des Réseaux Neuronaux Quantiques.** Nous explorerons ici le paysage des architectures de RNQ. Nous commencerons par une analyse détaillée du modèle dominant, le Circuit Quantique Variationnel (CQV), avant de présenter une taxonomie complète incluant les RNQ convolutionnels (QCNN), récurrents (QRNN), antagonistes génératifs (QGAN) et d\'autres modèles émergents.
- **Partie III : L\'Ingénierie de la Conception d\'un RNQ.** Cette section se concentrera sur les décisions critiques de conception. Nous aborderons les stratégies d\'encodage des données, la conception de l\'ansatz variationnel en équilibrant expressivité et entraînabilité, et nous nous attaquerons à l\'un des plus grands défis du domaine : le problème des plateaux stériles.
- **Partie IV : De la Conception à la Mise en Œuvre sur Matériel Quantique.** Enfin, nous ferons le pont entre la théorie et la pratique. Nous discuterons des contraintes imposées par le matériel de l\'ère NISQ, des processus de compilation et de transpilation, du rôle crucial de l\'atténuation d\'erreurs, et de l\'écosystème logiciel qui rend tout cela possible. Un cas d\'étude détaillé guidera le lecteur à travers la construction complète d\'un classifieur RNQ.

À la fin de ce chapitre, le lecteur possédera une vision holistique du cycle de vie d\'un RNQ, des axiomes de la mécanique quantique qui le sous-tendent jusqu\'aux lignes de code qui l\'exécutent sur un processeur quantique via le nuage.

## Partie I : Principes Fondamentaux de la Calculabilité Neuronale Quantique

### 64.2 Blocs de Construction Quantiques pour l\'Apprentissage

Pour appréhender l\'architecture des réseaux neuronaux quantiques, il est impératif de commencer par leurs constituants les plus élémentaires. Ces blocs de construction ne sont pas de simples transpositions des concepts classiques (neurones, poids, fonctions d\'activation) ; ils sont ancrés dans les principes de la mécanique quantique et confèrent aux RNQ leurs propriétés uniques et leur potentiel computationnel. Cette section décompose le RNQ en ses quatre piliers conceptuels : le qubit, l\'espace de Hilbert, les transformations unitaires et la mesure quantique.

#### 64.2.1 Le Qubit comme Unité Neuronale : Au-delà du bit, la richesse de l\'espace de Hilbert

L\'unité fondamentale d\'information en informatique classique est le bit, une entité binaire ne pouvant prendre que l\'une de deux valeurs discrètes : 0 ou 1. En informatique quantique, son analogue est le qubit (bit quantique). Cependant, cette analogie est superficielle, car le qubit possède une richesse de représentation bien supérieure, qui constitue la première source de puissance du calcul quantique.

Formellement, un qubit n\'est pas une simple variable binaire, mais un vecteur d\'état ∣ψ⟩ dans un espace de Hilbert complexe à deux dimensions, noté H≅C2. Les états classiques ∣0⟩ et ∣1⟩ forment une base orthonormée de cet espace, appelée base de calcul. Ils peuvent être représentés par les vecteurs colonnes : ∣0⟩=(10),∣1⟩=(01). La propriété la plus distinctive du qubit est la superposition. Un qubit peut exister non seulement dans l\'état ∣0⟩ ou ∣1⟩, mais aussi dans n\'importe quelle combinaison linéaire (superposition) de ces deux états.6 L\'état général d\'un qubit s\'écrit donc :

∣ψ⟩=α∣0⟩+β∣1⟩, où α et β sont des nombres complexes appelés amplitudes de probabilité. Ces amplitudes ne sont pas arbitraires ; elles doivent satisfaire la condition de normalisation ∣α∣2+∣β∣2=1. Cette condition garantit que la somme des probabilités de mesurer l\'état ∣0⟩ (qui est ∣α∣2) et l\'état ∣1⟩ (qui est ∣β∣2) est égale à 1.

Si le bit classique peut être visualisé comme un interrupteur (ouvert ou fermé), le qubit est souvent représenté comme un vecteur pointant vers la surface d\'une sphère de rayon 1, appelée la sphère de Bloch. Les pôles Nord et Sud de la sphère correspondent aux états classiques ∣0⟩ et ∣1⟩, respectivement. Tous les autres points sur la surface représentent des états de superposition. Cette représentation géométrique illustre l\'espace continu d\'états qu\'un seul qubit peut occuper, contrastant avec la nature discrète du bit.

Pour un système de n qubits, l\'espace des états est l\'espace de Hilbert produit tensoriel des espaces individuels, Hn=(C2)⊗n, dont la dimension est 2n. Un état dans cet espace est une superposition de 2n états de base. C\'est cette croissance exponentielle de la dimension de l\'espace des états qui sous-tend le parallélisme quantique.

Au-delà de la superposition, deux autres phénomènes quantiques sont cruciaux pour la calculabilité neuronale :

- **L\'intrication (ou enchevêtrement) :** C\'est une forme de corrélation quantique sans équivalent classique. Deux qubits ou plus peuvent être intriqués de telle sorte que leurs destins sont liés, quelle que soit la distance qui les sépare. L\'état d\'un qubit ne peut être décrit indépendamment de l\'autre. Mathématiquement, un état intriqué est un état de l\'espace produit tensoriel qui ne peut pas être écrit comme un produit d\'états individuels. Par exemple, l\'état de Bell ∣Φ+⟩=21(∣00⟩+∣11⟩) est un état intriqué. Si l\'on mesure le premier qubit et que l\'on obtient 0, on sait instantanément que le second qubit sera également dans l\'état 0. Dans un RNQ, l\'intrication permet de créer des corrélations complexes et non-locales entre les \"neurones\" quantiques, bien au-delà des connexions pondérées d\'un réseau classique.
- **L\'interférence :** Les amplitudes de probabilité étant des nombres complexes, elles peuvent interférer de manière constructive ou destructive, à l\'instar des ondes. Les algorithmes quantiques sont conçus pour orchestrer ces interférences de manière que les amplitudes des chemins menant aux mauvaises réponses s\'annulent, tandis que celles menant à la bonne réponse se renforcent mutuellement.

En résumé, le qubit, en tant qu\'unité neuronale, est bien plus qu\'un simple bit. Sa capacité à exister dans un continuum d\'états de superposition et à former des corrélations intriquées avec d\'autres qubits lui confère une puissance de représentation et de traitement de l\'information intrinsèquement supérieure pour certaines tâches.

#### 64.2.2 L\'Espace de Hilbert comme Espace de Caractéristiques : Le \"kernel trick\" quantique implicite

En apprentissage automatique classique, une technique puissante pour traiter des données non-linéairement séparables est l\'**astuce du noyau** (kernel trick). L\'idée centrale est de projeter les données d\'entrée, qui vivent dans un espace de caractéristiques de faible dimension

X, vers un espace de caractéristiques de plus grande dimension F via une cartographie non-linéaire Φ:X→F. Dans cet espace de plus grande dimension, les données peuvent devenir linéairement séparables, ce qui permet d\'utiliser des algorithmes linéaires simples comme les machines à vecteurs de support (SVM).

Le \"truc\" réside dans le fait qu\'il n\'est pas nécessaire de calculer explicitement les coordonnées des données dans l\'espace F, qui peut être de dimension très élevée, voire infinie. De nombreux algorithmes linéaires ne dépendent que du produit scalaire entre les vecteurs de caractéristiques, ⟨Φ(x),Φ(y)⟩. L\'astuce consiste à définir une **fonction noyau** K(x,y) qui calcule ce produit scalaire directement à partir des données originales x et y dans l\'espace X, sans jamais effectuer la projection explicite : K(x,y)=⟨Φ(x),Φ(y)⟩.

L\'informatique quantique offre un cadre naturel et puissant pour réaliser cette projection de caractéristiques. L\'**espace de Hilbert**, qui est l\'espace vectoriel complexe (potentiellement de dimension infinie) où vivent les états quantiques, peut être interprété comme un vaste espace de caractéristiques. Le processus d\'encodage de données classiques x dans un état quantique ∣ψ(x)⟩ est précisément une cartographie de caractéristiques, Φ:x→∣ψ(x)⟩, qui projette les données de Rd vers l\'espace de Hilbert H de dimension 2n (pour n qubits).

La beauté de cette approche réside dans le fait que l\'ordinateur quantique effectue un \"kernel trick\" de manière implicite et native. Supposons que nous utilisions un algorithme d\'apprentissage basé sur un noyau, comme un SVM quantique. La matrice du noyau, dont les éléments sont Kij=K(xi,xj), est nécessaire pour l\'entraînement. Dans le contexte quantique, la fonction noyau est naturellement définie par la similarité entre les états quantiques encodés, souvent mesurée par la probabilité de transition ou la fidélité au carré : κ(xi,xj)=∣⟨ψ(xi)∣ψ(xj)⟩∣2. Cette quantité, qui est une fonction noyau valide (symétrique et semi-définie positive) en vertu du théorème de Mercer, peut être estimée efficacement sur un ordinateur quantique.23 Par exemple, en utilisant un circuit connu sous le nom de test SWAP, on peut mesurer directement le chevauchement ∣⟨ψ(xi)∣ψ(xj)⟩∣2 sans jamais avoir besoin de connaître les 2n amplitudes complexes qui définissent les états ∣ψ(xi)⟩ et ∣ψ(xj)⟩. L\'ordinateur quantique agit donc comme un co-processeur spécialisé dans le calcul de cette fonction noyau. Il réalise la projection implicite dans un espace de caractéristiques exponentiellement grand et calcule le produit scalaire dans cet espace, le tout en manipulant seulement un nombre polynomial de qubits. C\'est l\'essence du \"kernel trick\" quantique implicite. La puissance de ce noyau quantique dépend de manière cruciale de la complexité de la cartographie d\'encodage Φ. Si l\'encodage produit des états produits simples (non-intriqués), le noyau résultant peut souvent être simulé efficacement classiquement. Cependant, si l\'encodage utilise l\'intrication pour créer des états quantiques complexes, le noyau résultant peut être difficile, voire impossible, à calculer classiquement, ouvrant la voie à un avantage quantique potentiel. Ainsi, l\'encodage des données n\'est pas une simple étape de pré-traitement ; c\'est l\'étape qui définit la puissance de l\'espace de caractéristiques dans lequel le RNQ va opérer.

#### 64.2.3 Les Transformations Unitaires Paramétrées : L\'analogue quantique des couches de poids synaptiques

Dans un réseau de neurones classique, le traitement de l\'information s\'effectue par une succession de couches. Chaque couche applique une transformation affine (une multiplication par une matrice de poids W suivie de l\'ajout d\'un vecteur de biais b) à son entrée. L\'ensemble de ces poids et biais constitue les paramètres entraînables du modèle.

En informatique quantique, l\'évolution d\'un système fermé est décrite par des **transformations unitaires**. Une transformation U est dite unitaire si elle préserve la norme des vecteurs d\'état, ce qui est équivalent à dire que son adjointe (conjuguée transposée) est son inverse : U†U=UU†=I, où I est l\'opérateur identité. Cette condition garantit que la probabilité totale reste conservée au cours de l\'évolution. Dans le modèle de circuit, ces transformations unitaires sont implémentées par des **portes quantiques**.

L\'analogue quantique des couches de poids synaptiques est une séquence de **transformations unitaires paramétrées**, U(θ). Il s\'agit de portes quantiques dont l\'action dépend d\'un ou plusieurs paramètres classiques continus θ=(θ1,θ2,...,θp). L\'exemple le plus courant est la porte de rotation à un qubit. Par exemple, la rotation autour de l\'axe Y de la sphère de Bloch est donnée par l\'opérateur : Ry(θ)=e−i2θY=(cos(2θ)sin(2θ)−sin(2θ)cos(2θ)), où Y est la matrice de Pauli Y=(0i−i0), et θ est l\'angle de rotation, un paramètre classique ajustable. Un circuit quantique variationnel, ou *ansatz*, est construit en assemblant une séquence de ces portes paramétrées, ainsi que des portes fixes (non-paramétrées) comme la porte CNOT qui génère de l\'intrication. L\'opérateur unitaire global du circuit, U(θ), est le produit des opérateurs de chaque porte. L\'action du circuit sur un état d\'entrée ∣ψin⟩ produit un état de sortie ∣ψout⟩=U(θ)∣ψin⟩.

L\'analogie avec les réseaux classiques est directe :

- Une **couche de RNQ** est une sous-séquence de portes dans le circuit, par exemple une couche de rotations sur tous les qubits suivie d\'une couche de portes CNOT intriquantes.
- Les **paramètres θ** du circuit sont les équivalents des poids et des biais.
- L\'**apprentissage** consiste à trouver les valeurs optimales de θ qui minimisent une fonction de coût, en utilisant une boucle d\'optimisation hybride où un ordinateur classique ajuste les paramètres.

La puissance expressive d\'un RNQ dépend de la capacité de son ansatz U(θ) à générer des états quantiques pertinents pour le problème à résoudre. Un ansatz bien conçu peut, avec un nombre raisonnable de paramètres, approximer des transformations complexes dans l\'espace de Hilbert, agissant ainsi comme un puissant processeur de caractéristiques.

#### 64.2.4 La Mesure Quantique : La fonction d\'activation non linéaire et probabiliste

Toutes les étapes précédentes d\'un RNQ --- encodage des données et application de l\'ansatz unitaire --- sont des opérations linéaires. Si le modèle se terminait là, il serait un simple transformateur linéaire, incapable d\'apprendre des relations complexes, tout comme un réseau de neurones classique sans fonctions d\'activation non linéaires. La non-linéarité, essentielle pour la puissance de calcul universelle des réseaux de neurones, est introduite dans les RNQ par l\'acte de **mesure quantique**.

La mesure est un processus fondamentalement différent de l\'évolution unitaire. C\'est une projection irréversible de l\'état quantique, qui est un vecteur dans un espace continu, sur un ensemble discret de résultats classiques. Selon le postulat de la mesure en mécanique quantique, si l\'on mesure un état ∣ψ⟩=∑ici∣i⟩ dans la base de calcul {∣i⟩}, le résultat obtenu sera l\'un des états de base ∣i⟩ avec une probabilité donnée par le carré de l\'amplitude correspondante (la règle de Born) : P(i)=∣ci∣2=∣⟨i∣ψ⟩∣2. Après la mesure, l\'état du système \"s\'effondre\" sur l\'état mesuré ∣i⟩. Ce processus présente deux caractéristiques clés :

1. **Probabiliste :** Le résultat d\'une seule mesure est fondamentalement aléatoire. Pour obtenir une information fiable, on doit exécuter le circuit plusieurs fois (prendre plusieurs \"shots\") et construire une distribution de probabilité à partir des résultats. La sortie d\'un RNQ est donc souvent une valeur d\'espérance, calculée comme une moyenne pondérée sur de nombreuses exécutions.
2. **Non-linéaire :** La relation entre les amplitudes de l\'état quantique (ci) et les probabilités de sortie (∣ci∣2) est non-linéaire. C\'est cette opération quadratique qui agit comme une fonction d\'activation. Elle transforme les amplitudes complexes, qui ont évolué linéairement sous l\'effet des portes unitaires, en probabilités réelles, introduisant la non-linéarité nécessaire pour que le modèle puisse apprendre des frontières de décision complexes et approximer des fonctions arbitraires.

La mesure est donc le pont crucial entre le traitement de l\'information quantique, qui se déroule dans l\'espace de Hilbert, et le monde classique, où la fonction de coût est évaluée et les paramètres sont mis à jour. Sans la mesure, il serait impossible d\'extraire une information classique du QPU pour alimenter la boucle d\'optimisation.

La puissance expressive des RNQ ne découle donc pas d\'un seul de ces blocs de construction, mais de leur interaction synergique. L\'encodage projette les données dans l\'immense espace de caractéristiques de Hilbert, où le \"kernel trick\" quantique peut rendre le problème plus simple. Les transformations unitaires de l\'ansatz explorent cet espace en appliquant des rotations et des intrications complexes, agissant comme des couches linéaires. Finalement, la mesure agit comme une fonction d\'activation non-linéaire, permettant de lire le résultat du calcul et de donner au modèle la capacité de capturer des motifs complexes. C\'est cette combinaison unique de linéarité à grande échelle (évolution unitaire) et de non-linéarité ciblée (mesure) qui définit la calculabilité neuronale quantique.

## Partie II : Paradigmes Architecturaux des Réseaux Neuronaux Quantiques

Après avoir établi les briques de construction fondamentales, nous nous tournons maintenant vers la manière dont elles sont assemblées pour former des architectures de calcul complètes. Le domaine des réseaux neuronaux quantiques, bien que jeune, a déjà vu l\'émergence de plusieurs paradigmes architecturaux distincts, souvent inspirés par les succès de leurs homologues classiques. Cette partie explore ces paradigmes, en commençant par le modèle dominant des Circuits Quantiques Variationnels (CQV), qui sous-tend la plupart des applications actuelles. Nous présenterons ensuite une taxonomie des architectures plus spécialisées, telles que les RNQ convolutionnels, récurrents et génératifs, en analysant comment les concepts classiques sont traduits dans le langage des circuits quantiques et quels nouveaux défis et opportunités cette traduction engendre.

### 64.3 Les Circuits Quantiques Variationnels (CQV) comme Modèle Dominant

Le paradigme du Circuit Quantique Variationnel (CQV), souvent utilisé de manière interchangeable avec le terme plus large d\'Algorithme Quantique Variationnel (VQA), constitue l\'épine dorsale de la plupart des recherches et applications actuelles en apprentissage automatique quantique pour les dispositifs de l\'ère NISQ. Sa popularité découle de sa structure hybride qui tire parti des forces respectives des processeurs classiques et quantiques, tout en étant relativement résiliente au bruit grâce à l\'utilisation de circuits de faible profondeur.

#### 64.3.1 Anatomie d\'un CQV : Encodage (feature map), Ansatz (circuit modèle), et Mesure (observable)

Un Circuit Quantique Variationnel est une architecture modulaire composée de trois blocs fonctionnels distincts, exécutés séquentiellement sur un processeur quantique.

1. **L\'Encodage des Données (Quantum Feature Map) :** La première étape consiste à charger les données classiques dans le circuit quantique. Un circuit unitaire fixe, noté UΦ(x), est appliqué à un état initial de référence, typiquement l\'état ∣0⟩⊗n. Ce circuit encode le vecteur de caractéristiques classique x dans les amplitudes ou les phases d\'un état quantique de n qubits, ∣ψ(x)⟩=UΦ(x)∣0⟩⊗n. Le choix de cette cartographie de caractéristiques est crucial car il définit l\'espace dans lequel le modèle va opérer et, comme nous l\'avons vu, le noyau quantique implicite. Des stratégies d\'encodage complexes peuvent déjà introduire des corrélations non-triviales et de l\'intrication dans l\'état initial.
2. **L\'Ansatz Variationnel (Circuit Modèle) :** C\'est le cœur apprenant du CQV. Il s\'agit d\'un circuit unitaire U(θ) dont la structure est fixe mais qui dépend d\'un ensemble de paramètres classiques ajustables θ=(θ1,...,θp). L\'ansatz est appliqué à l\'état encodé ∣ψ(x)⟩ pour le transformer en un état final ∣ψfinal(x,θ)⟩=U(θ)∣ψ(x)⟩. La conception de l\'ansatz est un art qui cherche à équilibrer la capacité à représenter des états complexes (expressivité) avec la facilité d\'optimisation des paramètres (entraînabilité). Les ansatz sont souvent construits à partir de couches répétées de portes de rotation à un qubit et de portes d\'intrication à deux qubits.
3. La Mesure (Observable) : La dernière étape consiste à extraire une information classique de l\'état quantique final. Cela se fait en mesurant la valeur d\'espérance d\'un opérateur Hermitien, appelé observable O\^. La sortie du CQV est alors une valeur réelle donnée par la règle de Born : f(x,θ)=⟨ψfinal(x,θ)∣O\^∣ψfinal(x,θ)⟩=⟨0∣UΦ†(x)U†(θ)O\^U(θ)UΦ(x)∣0⟩. Le choix de l\'observable O\^ dépend de la tâche. Pour une classification binaire, on pourrait mesurer l\'opérateur de Pauli Z sur un seul qubit de sortie, O\^=Z0. La valeur d\'espérance, comprise entre -1 et 1, peut alors être mappée à une prédiction de classe.30 L\'estimation de cette valeur d\'espérance sur un véritable matériel quantique nécessite d\'exécuter le circuit un grand nombre de fois (shots) et de calculer la moyenne des résultats de mesure.

Cette structure en trois parties offre une grande flexibilité, permettant aux chercheurs de concevoir et de combiner différents modules d\'encodage, d\'ansatz et de mesure pour s\'adapter à des problèmes spécifiques.

#### 64.3.2 La Boucle d\'Optimisation Hybride Classique-Quantique : Le moteur de l\'apprentissage

Le CQV seul ne fait que transformer des données. Pour qu\'il apprenne, il doit être intégré dans une boucle d\'optimisation hybride qui met en jeu un dialogue constant entre un ordinateur classique et un ordinateur quantique. Ce processus itératif est le moteur qui ajuste les paramètres θ de l\'ansatz pour que le CQV accomplisse la tâche désirée. Le déroulement de la boucle d\'apprentissage peut être formalisé par le pseudo-code suivant :

Algorithme : Boucle d\'entraînement d\'un CQV HybrideInitialiser les paramètres de l\'ansatz θ_0 (ex: aléatoirement)Pour chaque époque d\'entraînement de 1 à N_epochs :Pour chaque batch de données (X_batch, Y_batch) :\

1. // Étape Classique : Calcul du gradientInitialiser le vecteur de gradient ∇C à zéroPour chaque paramètre θ_i dans θ :// Utiliser la règle du décalage de paramètre (Parameter-Shift Rule)θ_plus = θ avec θ_i ← θ_i + π/2θ_moins = θ avec θ_i ← θ_i - π/2// Étape Quantique : Exécution des circuits décaléspredictions_plus = \[Exécuter_CQV(x, θ_plus) pour x dans X_batch\]predictions_moins = \[Exécuter_CQV(x, θ_moins) pour x dans X_batch\]// Étape Classique : Calcul de la dérivée partiellecoût_plus = Calculer_Coût(predictions_plus, Y_batch)coût_moins = Calculer_Coût(predictions_moins, Y_batch)∂C/∂θ_i = 0.5 \* (coût_plus - coût_moins)Stocker ∂C/∂θ_i dans ∇C\
2. // Étape Classique : Mise à jour des paramètres
   θ ← Mettre_à_jour_paramètres(θ, ∇C, optimiseur_classique)

   Retourner les paramètres optimisés θ

Ce flux de travail illustre la répartition claire des tâches  :

- **L\'ordinateur quantique (QPU)** est utilisé comme un oracle ou un co-processeur. Sa seule fonction est d\'exécuter le circuit U(θ)UΦ(x) et d\'estimer la valeur d\'espérance ⟨O\^⟩. Il ne réalise aucune logique de contrôle ou d\'optimisation.
- **L\'ordinateur classique (CPU/GPU)** gère l\'ensemble du processus d\'apprentissage. Il stocke les données, prépare les paramètres θ, calcule les gradients (souvent en demandant des évaluations supplémentaires au QPU, comme dans la règle du décalage de paramètre), et applique un algorithme d\'optimisation (comme Adam ou SGD) pour déterminer la prochaine série de paramètres.

Cette architecture hybride est la clé de la viabilité des VQA sur les dispositifs NISQ. Elle minimise le temps de calcul sur le QPU, qui est une ressource précieuse et bruyante, et déporte la charge de travail la plus lourde (l\'optimisation sur de nombreuses itérations) vers des machines classiques robustes et rapides.

#### 64.3.3 Analyse des Optimiseurs Classiques pour les Paysages Quantiques (SPSA, Adam, etc.)

Le choix de l\'optimiseur classique est une décision de conception critique, car les paysages de coût des problèmes quantiques présentent des caractéristiques qui les distinguent de ceux rencontrés en apprentissage automatique classique. Ces paysages sont souvent non-convexes, remplis de minima locaux, et, comme nous le verrons en détail dans la section 3.7, peuvent être affectés par des \"plateaux stériles\" où les gradients deviennent exponentiellement petits.

Deux grandes familles d\'optimiseurs sont couramment utilisées :

1. **Optimiseurs basés sur le gradient :** Ces méthodes, telles que la Descente de Gradient Stochastique (SGD), Adam (Adaptive Moment Estimation), et RMSProp, nécessitent le calcul explicite ou l\'estimation du vecteur de gradient de la fonction de coût par rapport aux paramètres θ.

   - **Calcul du gradient :** Sur un ordinateur quantique, les gradients peuvent être calculés exactement à l\'aide de la **règle du décalage de paramètre (parameter-shift rule)**. Pour une porte de la forme e−i2θP où P est un opérateur de Pauli, la dérivée de la valeur d\'espérance peut être calculée comme la différence de deux évaluations du circuit avec des paramètres décalés : ∂θ∂⟨O\^⟩=21(⟨O\^⟩θ+π/2−⟨O\^⟩θ−π/2).
   - **Avantages :** Fournissent une information directionnelle précise pour la descente. Des optimiseurs sophistiqués comme Adam adaptent le taux d\'apprentissage pour chaque paramètre, ce qui peut accélérer considérablement la convergence.
   - **Inconvénients :** Le calcul du gradient complet via la règle du décalage de paramètre nécessite 2p exécutions du circuit pour p paramètres, ce qui peut devenir prohibitif pour les ansatz avec un grand nombre de paramètres.
2. **Optimiseurs sans gradient (ou à gradient stochastique) :** Ces méthodes évitent le calcul direct du gradient.

   - **SPSA (Simultaneous Perturbation Stochastic Approximation) :** C\'est l\'un des optimiseurs sans gradient les plus populaires en apprentissage automatique quantique. SPSA estime la direction du gradient en ne faisant que **deux** mesures de la fonction de coût, quelle que soit la dimension de l\'espace des paramètres. Il le fait en perturbant simultanément tous les paramètres dans une direction aléatoire.
   - **Avantages :** Le coût par itération est constant (2 exécutions), ce qui le rend beaucoup plus scalable en termes de nombre de paramètres que les méthodes basées sur la règle du décalage. Il est également souvent plus robuste au bruit de tir (le bruit statistique inhérent à l\'estimation des valeurs d\'espérance).
   - **Inconvénients :** L\'estimation du gradient est stochastique et donc moins précise, ce qui peut conduire à une convergence plus lente en termes de nombre d\'itérations.

Des études empiriques ont montré qu\'une approche combinée, utilisant SPSA pour estimer le gradient et l\'injectant ensuite dans un optimiseur avancé comme Adam ou AMSGrad, peut surpasser à la fois les approches basées sur la règle du décalage et le SPSA standard, en offrant un bon compromis entre le coût de calcul par itération et la vitesse de convergence.

Le tableau suivant résume les caractéristiques clés de ces optimiseurs dans le contexte des RNQ.

---

  **Optimiseur**                    **Basé sur le Gradient?**       **Coût par Itération (exécutions de circuit)**   **Robustesse au Bruit**   **Comportement sur Paysages Complexes**       **Cas d\'Usage Recommandé**

  **SGD (avec Parameter-Shift)**    Oui                             2p                                               Moyenne                   Sensible aux minima locaux                    Ansatz avec peu de paramètres (p petit), paysages simples.

  **Adam (avec Parameter-Shift)**   Oui                             2p                                               Moyenne                   Meilleure évasion des minima locaux que SGD   Prototypage et ansatz avec un nombre modéré de paramètres.

  **SPSA**                          Non (estimation stochastique)   2                                                Élevée                    Peut naviguer dans des paysages bruités       Ansatz avec un grand nombre de paramètres (p grand), présence de bruit.

  **Adam/AMSGrad (avec SPSA)**      Oui (gradient estimé)           2                                                Élevée                    Bon compromis, convergence rapide             Approche de pointe pour la plupart des problèmes NISQ.

---

*Analyse Comparative des Optimiseurs Classiques pour les Paysages de Coût Quantiques. p désigne le nombre de paramètres de l\'ansatz.*

### 64.4 Taxonomie des Architectures de RNQ

Si le CQV constitue un cadre général, le domaine a développé des architectures plus spécialisées, souvent en s\'inspirant des succès des réseaux de neurones classiques. La traduction de concepts comme la convolution ou la récurrence dans le formalisme de la mécanique quantique n\'est cependant pas triviale. Elle impose de repenser ces idées à la lumière des contraintes et des opportunités offertes par le calcul quantique, telles que la linéarité de l\'évolution unitaire, la réversibilité et le théorème de non-clonage. Ce processus de \"traduction\" s\'avère être une source d\'innovation, où les contraintes quantiques peuvent parfois se transformer en avantages inattendus.

#### 64.4.1 RNQ à Propagation Avant (Quantum Feedforward Neural Networks)

Le modèle le plus simple, directement inspiré du perceptron multicouche classique, est le réseau neuronal quantique à propagation avant (Quantum Feedforward Neural Network). Dans sa forme la plus basique, il s\'agit d\'une séquence de couches, où chaque couche est un circuit unitaire paramétré Ul(θl). L\'information se propage à travers le réseau de manière séquentielle : ∣ψout⟩=UL(θL)...U2(θ2)U1(θ1)∣ψin⟩ L\'état d\'entrée ∣ψin⟩ est typiquement l\'état encodé à partir des données classiques.43

Cependant, cette analogie directe se heurte à plusieurs défis fondamentaux :

- **Non-linéarité :** Comme mentionné précédemment, l\'évolution unitaire est linéaire. Pour introduire la non-linéarité nécessaire à l\'apprentissage de fonctions complexes, les architectures à propagation avant doivent intégrer des mesures. Une approche consiste à utiliser des mesures intermédiaires entre les couches, où le résultat de la mesure sur un qubit auxiliaire contrôle l\'application des portes dans la couche suivante. Cette approche, bien que puissante, peut être complexe à mettre en œuvre et à entraîner.
- **Non-clonage :** Dans un réseau classique, la sortie d\'un neurone est copiée et envoyée comme entrée à plusieurs neurones de la couche suivante. Le théorème de non-clonage en mécanique quantique interdit la copie d\'un état quantique inconnu. Il est donc impossible de simplement \"diffuser\" la sortie d\'un qubit vers plusieurs autres. Les architectures doivent être conçues pour contourner cette limitation, par exemple en utilisant des portes contrôlées pour propager l\'information sans copie explicite.

Malgré ces défis, le modèle à propagation avant sert de base conceptuelle à de nombreuses architectures plus complexes.

#### 64.4.2 Réseaux de Neurones Quantiques Convolutionnels (QCNN)

Inspirés par l\'efficacité remarquable des réseaux de neurones convolutifs (CNN) classiques en vision par ordinateur, les QCNN cherchent à appliquer les principes de convolution et de mise en commun (pooling) aux données quantiques ou classiques encodées dans des états quantiques.

##### 64.4.2.1 Traduction des concepts de convolution et de pooling en opérations quantiques

La traduction de ces concepts est une excellente illustration de la manière dont les idées classiques sont adaptées au cadre quantique :

- **Couche de Convolution Quantique :** L\'idée maîtresse de la convolution classique est l\'application d\'un même filtre (noyau) à différentes parties de l\'entrée pour détecter des motifs locaux, ce qui confère au modèle une **invariance par translation**. En quantique, cela est réalisé en appliquant une même porte unitaire paramétrée à deux ou quelques qubits, UC(θC), de manière glissante sur le registre de qubits. Par exemple, sur un registre 1D de n qubits, on applique UC aux paires (q1,q2), puis (q2,q3), etc., ou à des paires alternées pour éviter la superposition des portes. Tous ces \"filtres\" partagent les mêmes paramètres θC, ce qui réduit considérablement le nombre total de paramètres à entraîner et intègre l\'invariance par translation dans la structure du circuit.
- **Couche de Pooling Quantique :** Le pooling classique réduit la dimensionnalité des cartes de caractéristiques. La version quantique vise un objectif similaire : réduire le nombre de qubits actifs. Une approche courante consiste à mesurer un sous-ensemble de qubits (par exemple, un qubit sur deux). Le résultat classique de cette mesure (0 ou 1) contrôle alors l\'application d\'une porte unitaire (par exemple, une rotation) sur un qubit voisin. Le qubit mesuré est ensuite écarté (tracé) du reste du calcul, réduisant ainsi la taille du système de moitié. Cette opération est intrinsèquement non-linéaire et dissipative.

L\'architecture typique d\'un QCNN alterne ces couches de convolution et de pooling, créant une structure hiérarchique qui distille progressivement l\'information pertinente dans un nombre de plus en plus restreint de qubits, jusqu\'à ce qu\'un seul qubit final soit mesuré pour la classification.

##### 64.4.2.2 Applications à l\'analyse de données quantiques et classiques structurées

Les QCNN sont particulièrement prometteurs pour deux types de tâches :

- **Analyse de données quantiques :** Ils sont naturellement adaptés à l\'analyse d\'états quantiques issus de simulations ou d\'expériences de physique. Une application phare est la **classification des phases de la matière**. Un QCNN peut être entraîné à reconnaître si un état quantique appartient à une phase ordonnée (par exemple, ferromagnétique) ou désordonnée, en apprenant à identifier les corrélations et les symétries caractéristiques de chaque phase.
- **Analyse de données classiques :** Les QCNN peuvent également être appliqués à des données classiques structurées, comme des images, après une étape d\'encodage. Par exemple, les pixels d\'une image peuvent être encodés dans les états d\'un registre de qubits, et le QCNN peut alors apprendre à extraire des caractéristiques hiérarchiques pour la classification, de manière analogue à un CNN classique.

#### 64.4.3 Réseaux de Neurones Quantiques Récurrents (QRNN)

Les réseaux de neurones récurrents (RNN) classiques sont conçus pour traiter des données séquentielles, comme le langage naturel ou les séries temporelles. Ils y parviennent en maintenant un \"état caché\" ou une \"mémoire\" qui est mise à jour à chaque pas de temps.

##### 64.4.3.1 Le défi de la mémoire et du traitement de séquences dans un cadre quantique

La création d\'un QRNN se heurte à un défi conceptuel majeur. La mémoire dans un RNN classique est un processus dissipatif : l\'information ancienne est progressivement \"oubliée\" au profit de la nouvelle. Or, l\'évolution d\'un système quantique fermé est **unitaire** et donc **réversible**. Une transformation unitaire peut toujours être inversée en appliquant son adjointe, ce qui semble incompatible avec la nature unidirectionnelle du temps et de la mémoire.

##### 64.4.3.2 Modèles et architectures proposées

Plusieurs architectures ont été proposées pour relever ce défi :

- **Modèle à état caché quantique :** Une approche consiste à diviser le registre de qubits en deux : un sous-registre pour l\'entrée du pas de temps actuel, et un sous-registre pour l\'état caché. Une porte unitaire globale U(θ) est appliquée à l\'ensemble des deux registres. Ensuite, le registre d\'entrée est mesuré et réinitialisé pour accueillir la donnée suivante, tandis que le registre de l\'état caché est conservé pour le pas de temps suivant. L\'information est ainsi propagée à travers le temps via l\'état quantique du registre mémoire.
- **Avantage inattendu de l\'unitarité :** Bien que la réversibilité soit une contrainte, elle offre un avantage potentiel significatif. L\'un des problèmes les plus connus des RNN classiques est celui du **gradient évanescent (ou explosif)**, où les gradients se multiplient à travers le temps et tendent à disparaître ou à devenir excessivement grands, rendant l\'entraînement sur de longues séquences difficile. Dans un QRNN basé sur une évolution unitaire, les transformations préservent la norme. Cela signifie que les gradients ne peuvent ni s\'évanouir ni exploser de la même manière, ce qui pourrait rendre les QRNN intrinsèquement plus stables à l\'entraînement sur de longues séquences. Ici, une contrainte fondamentale du quantique (l\'unitarité) se transforme en une solution potentielle à un problème majeur du classique.
- **Calcul par réservoir quantique (Quantum Reservoir Computing) :** Une autre approche, inspirée du calcul par réservoir classique, consiste à utiliser un système quantique fixe et complexe (le \"réservoir\") dont la dynamique n\'est pas entraînée. Les données séquentielles sont injectées dans ce réservoir, qui les projette dans un espace d\'états de haute dimension. Seule une couche de lecture classique, en sortie, est entraînée pour interpréter la dynamique complexe du réservoir. Cette méthode simplifie considérablement l\'entraînement, car le coûteux processus d\'optimisation du circuit quantique est évité.

#### 64.4.4 Réseaux Antagonistes Génératifs Quantiques (QGAN)

Les Réseaux Antagonistes Génératifs (GAN) sont une classe de modèles génératifs qui apprennent à créer de nouvelles données ressemblant à un ensemble de données d\'entraînement. Ils reposent sur un jeu à deux joueurs entre un **générateur** et un **discriminateur**.

##### 64.4.4.1 Le jeu du discriminateur et du générateur dans l\'espace de Hilbert

Dans un QGAN, ce jeu se déroule, au moins en partie, dans l\'espace de Hilbert. L\'architecture la plus courante est hybride  :

- **Le Générateur Quantique (G) :** C\'est un Circuit Quantique Variationnel (CQV). Il prend en entrée un vecteur de bruit aléatoire (souvent encodé dans les paramètres du circuit) et sa tâche est de produire un état quantique ∣ψG⟩ dont la distribution de probabilité, lors de la mesure, ressemble à la distribution des \"vraies\" données.
- **Le Discriminateur (D) :** Il peut être soit un autre circuit quantique, soit, plus communément, un réseau de neurones classique. Sa tâche est de recevoir un échantillon (soit une \"vraie\" donnée de l\'ensemble d\'entraînement, soit une \"fausse\" donnée produite par le générateur) et de prédire s\'il est vrai ou faux.

Le processus d\'entraînement est un jeu à somme nulle. Le discriminateur est entraîné à maximiser sa capacité à distinguer le vrai du faux. Le générateur, quant à lui, est entraîné à minimiser cette même quantité, c\'est-à-dire à \"tromper\" le discriminateur en produisant des échantillons de plus en plus réalistes. Les gradients de la fonction de coût du discriminateur sont utilisés pour mettre à jour les paramètres du générateur.

##### 64.4.4.2 Applications à l\'apprentissage de distributions quantiques et classiques

Les QGAN ont deux grandes catégories d\'applications :

- **Apprentissage de distributions classiques :** Ils peuvent être utilisés pour apprendre des distributions de probabilité complexes à partir de données classiques. Une application très étudiée est la modélisation financière, où les QGAN pourraient apprendre à générer des séries temporelles de prix d\'actifs ou des distributions de risque qui capturent les corrélations subtiles du marché, potentiellement mieux que les modèles classiques.
- **Apprentissage de distributions quantiques :** Une application plus fondamentale est la **préparation d\'états quantiques**. Si l\'ensemble de données d\'entraînement est constitué d\'échantillons d\'un état quantique cible (obtenus par tomographie, par exemple), un QGAN peut être entraîné pour que son générateur apprenne à produire cet état à la demande. Cela pourrait être une méthode efficace pour charger des états complexes dans un ordinateur quantique, une étape souvent coûteuse.

#### 64.4.5 Autres architectures émergentes (ex. : RNQ dissipatifs, modèles basés sur le recuit)

e domaine étant en constante évolution, de nouvelles architectures continuent d\'apparaître. Deux exemples notables incluent :

- **Réseaux Neuronaux Quantiques Dissipatifs (DQNN) :** La plupart des modèles de RNQ traitent le bruit et la décohérence (la dissipation) comme des ennemis à combattre. Les DQNN adoptent une perspective radicalement différente : ils intègrent la dissipation comme une partie intégrante et utile du calcul. Dans ces modèles, qui sont des analogues des systèmes quantiques ouverts, les qubits d\'une couche peuvent être délibérément \"oubliés\" ou tracés, ce qui constitue une opération non-unitaire. Cette approche est inspirée de la manière dont les réseaux de neurones classiques sont intrinsèquement dissipatifs. Les DQNN pourraient être plus robustes au bruit inhérent au matériel et offrir de nouvelles voies pour le traitement de l\'information quantique.
- **Modèles basés sur le recuit quantique :** Cette approche utilise un type différent de matériel quantique, les **recuits quantiques**, pour l\'apprentissage. Au lieu d\'utiliser un circuit de portes, le problème d\'entraînement d\'un réseau de neurones (souvent un réseau binaire où les poids sont +1 ou -1) est formulé comme un problème d\'optimisation. La fonction de coût de l\'entraînement est mappée sur l\'Hamiltonien d\'un système de spins (un modèle d\'Ising). Le recuit quantique est ensuite utilisé pour trouver l\'état d\'énergie minimale (l\'état fondamental) de cet Hamiltonien, ce qui correspond à l\'ensemble optimal de poids pour le réseau neuronal. Cette méthode transforme le problème d\'entraînement itératif en un problème de minimisation d\'énergie en une seule étape, ce qui pourrait offrir des avantages en termes de vitesse et de capacité à éviter les minima locaux.

## Partie III : L\'Ingénierie de la Conception d\'un RNQ

La construction d\'un réseau neuronal quantique performant est un exercice d\'ingénierie de précision qui va bien au-delà de la simple sélection d\'une architecture. Elle implique une série de décisions de conception critiques qui déterminent la capacité du modèle à apprendre, sa robustesse au bruit et, en fin de compte, son potentiel à surpasser les approches classiques. Cette partie se penche sur les trois piliers de cette ingénierie : la stratégie d\'encodage des données, qui définit la manière dont le RNQ \"perçoit\" le monde ; la conception de l\'ansatz, qui est le moteur de l\'apprentissage ; et la gestion du problème omniprésent des plateaux stériles, qui menace de paralyser le processus d\'optimisation. Nous verrons que ces trois piliers ne sont pas indépendants, mais forment un système de conception intrinsèquement lié, où chaque choix a des répercussions profondes sur les autres.

### 64.5 Stratégies d\'Encodage des Données (Quantum Feature Maps)

L\'encodage des données, ou la création d\'une *quantum feature map*, est la première et peut-être la plus fondamentale des décisions de conception. C\'est le processus par lequel l\'information classique est traduite dans le langage des qubits.

#### 64.5.1 L\'importance cruciale de la représentation des données classiques

L\'étape d\'encodage n\'est pas un simple pré-traitement ; elle définit l\'espace de caractéristiques de très haute dimension dans lequel le RNQ opérera. Comme nous l\'avons vu (section 3.2.2), elle détermine le noyau quantique implicite que le modèle utilise pour évaluer la similarité entre les points de données. Un encodage qui ne parvient pas à capturer la structure pertinente des données ou à l\'amplifier d\'une manière utile pour le calcul quantique peut rendre un avantage quantique impossible, même avec l\'ansatz le plus puissant. À l\'inverse, un encodage bien choisi peut transformer un problème non-linéaire complexe en un problème plus simple dans l\'espace de Hilbert. La performance globale du RNQ est donc inextricablement liée à la qualité de sa représentation des données.

#### 64.5.2 Analyse des techniques : Encodage de base, d\'amplitude, angulaire (dense et épars)

Il existe une variété de stratégies d\'encodage, chacune présentant un ensemble unique de compromis. Les trois familles principales sont :

- **Encodage de base (Basis Encoding) :** C\'est la méthode la plus directe. Une chaîne de bits classique b1b2...bn est mappée directement à l\'état de base computationnel d\'un registre de n qubits : ∣b1b2...bn⟩. Par exemple, le nombre classique 5, qui est 101 en binaire, serait encodé comme l\'état ∣101⟩ sur trois qubits.

  - **Analyse :** Cette méthode est simple à conceptualiser mais est généralement inefficace en termes de ressources, nécessitant un nombre de qubits proportionnel à la représentation binaire des données. Elle ne tire pas parti de la superposition de manière inhérente.
- Encodage d\'amplitude (Amplitude Encoding) : Cette technique est exponentiellement plus efficace en termes de nombre de qubits. Un vecteur de données classique normalisé de N=2n caractéristiques, x=(x1,...,xN), est encodé dans les amplitudes d\'un état de seulement n=log2(N) qubits : ∣ψx⟩=i=1∑Nxi∣i⟩, où ∣i⟩ représente l\'état de base correspondant à la représentation binaire de l\'entier i−1.76

  - **Analyse :** L\'avantage est une compression de données spectaculaire. Cependant, la préparation d\'un état quantique arbitraire avec des amplitudes spécifiques est une tâche difficile. Les circuits connus pour réaliser un encodage d\'amplitude générique ont une profondeur qui peut croître de manière exponentielle avec le nombre de qubits, ce qui les rend impraticables sur les dispositifs NISQ.
- Encodage angulaire (Angle Encoding) ou de phase : Cette approche est l\'une des plus populaires pour les dispositifs à court terme en raison de sa faible profondeur de circuit. Ici, chaque caractéristique classique xi est utilisée pour paramétrer une porte de rotation sur un qubit. Par exemple, pour un vecteur x=(x1,...,xn), on peut appliquer une porte de rotation Ry(xi) sur chaque qubit i : ∣ψx⟩=i=1⨂nRy(xi)∣0⟩=i=1⨂n(cos(2xi)∣0⟩+sin(2xi)∣1⟩)

  - **Analyse :** Cette méthode nécessite n qubits pour n caractéristiques. Sa profondeur de circuit est constante (typiquement de 1 ou 2), ce qui la rend très robuste au bruit. La cartographie est intrinsèquement non-linéaire en raison des fonctions trigonométriques. Une variante, l\'**encodage angulaire dense**, utilise plusieurs rotations sur chaque qubit (par exemple, Rz(ϕi)Ry(θi)) pour encoder deux caractéristiques par qubit, réduisant de moitié le nombre de qubits requis.

#### 64.5.3 Compromis : Coût en qubits, profondeur du circuit, et non-linéarité de la cartographie

Le choix d\'une stratégie d\'encodage est un exercice d\'équilibrage entre trois contraintes souvent contradictoires, particulièrement à l\'ère NISQ.

Le tableau suivant synthétise ces compromis pour les principales stratégies d\'encodage, en incluant des cartes de caractéristiques plus complexes qui combinent ces idées de base, comme la ZZFeatureMap qui ajoute de l\'intrication à l\'encodage angulaire.

---

  **Stratégie d\'Encodage**   **Coût en Qubits (pour N carac.)**   **Profondeur de Circuit (typique)**   **Expressivité/Non-linéarité**    **Avantages Clés**                                         **Inconvénients/Défis NISQ**

  **Encodage de Base**        O(N) (si carac. binaires)            Variable, potentiellement élevée      Faible (linéaire)                 Simple à conceptualiser.                                   Inefficace en qubits, ne tire pas parti de la superposition.

  **Encodage d\'Amplitude**   O(logN)                              Élevée, potentiellement O(poly(N))    Très élevée (intrication)         Compression exponentielle des données.                     Profondeur de circuit prohibitive pour les dispositifs NISQ.

  **Encodage Angulaire**      O(N)                                 Faible, O(1)                          Modérée (non-linéarité cos/sin)   Très faible profondeur, robuste au bruit.                  Coûteux en qubits.

  **ZZFeatureMap**            O(N)                                 Modérée, O(L⋅N) (L couches)           Élevée (intrication paramétrée)   Noyau potentiellement difficile à simuler classiquement.   Profondeur plus élevée, plus sensible au bruit de portes à 2 qubits.

---

*Table 3.1: Comparaison des Stratégies d\'Encodage de Données. Les complexités sont données à titre indicatif et peuvent varier selon l\'implémentation spécifique.*

Ce tableau met en évidence un dilemme central pour le concepteur de RNQ : les méthodes les plus puissantes en théorie (comme l\'encodage d\'amplitude ou les cartes de caractéristiques fortement intriquées) sont souvent les plus difficiles à mettre en œuvre sur le matériel actuel en raison de leur profondeur de circuit. À l\'inverse, les méthodes les plus pratiques (comme l\'encodage angulaire) offrent une expressivité plus limitée. Le choix optimal dépend donc d\'une analyse fine du problème à résoudre et des ressources quantiques disponibles.

### 64.6 Conception de l\'Ansatz : le Cœur Apprenant du RNQ

Une fois les données encodées, l\'ansatz variationnel U(θ) entre en jeu. C\'est le composant paramétré du circuit, dont la tâche est de transformer l\'état d\'entrée en un état final qui, une fois mesuré, résout le problème. La conception de l\'ansatz est sans doute l\'aspect le plus créatif de la construction d\'un RNQ. Un bon ansatz doit naviguer entre deux exigences souvent opposées : être suffisamment puissant pour représenter la solution (l\'expressivité) tout en étant suffisamment simple pour que ses paramètres puissent être optimisés efficacement (l\'entraînabilité).

#### 64.6.1 Ansaetze spécifiques à un problème vs Ansaetze agnostiques au matériel (Hardware-Efficient)

Les architectures d\'ansatz peuvent être classées en deux grandes catégories :

- **Ansaetze Spécifiques à un Problème (Problem-Specific) :** Ces ansatz sont conçus en exploitant la connaissance du domaine du problème cible. Un exemple canonique est l\'ansatz **Unitary Coupled Cluster Singles and Doubles (UCCSD)**, utilisé en chimie quantique pour le problème du VQE. Cet ansatz est inspiré de la théorie Coupled Cluster, une méthode classique très performante pour calculer l\'énergie des molécules. Il est construit pour explorer la partie de l\'espace de Hilbert pertinente pour les états moléculaires, ce qui le rend très efficace en termes de nombre de paramètres pour ces problèmes spécifiques. Cependant, il est complexe à mettre en œuvre et peu adapté à d\'autres types de problèmes.
- **Ansaetze Agnostiques au Matériel (Hardware-Efficient) :** Ces ansatz ne font aucune hypothèse sur la nature du problème. Leur structure est plutôt dictée par les capacités et les contraintes du matériel quantique sur lequel ils seront exécutés. Ils sont typiquement composés de couches alternées de portes de rotation à un qubit et de portes d\'intrication à deux qubits (par exemple, des CNOT). La disposition des portes d\'intrication est choisie pour correspondre à la topologie de connectivité native du processeur quantique, minimisant ainsi le besoin de portes SWAP coûteuses. Ces ansatz sont universels (ils peuvent, avec suffisamment de couches, approximer n\'importe quelle transformation unitaire) et faciles à mettre en œuvre, mais ils peuvent nécessiter beaucoup plus de paramètres et de couches qu\'un ansatz spécifique pour atteindre la même précision.

#### 64.6.2 Le concept d\'Expressivité : La capacité de l\'ansatz à explorer l\'espace de Hilbert

L\'expressivité d\'un ansatz quantifie sa capacité à générer une large gamme d\'états quantiques à travers l\'espace de Hilbert. Un ansatz très expressif peut, en faisant varier ses paramètres, approximer une grande variété de transformations unitaires.

Formellement, l\'expressivité est souvent mesurée par la proximité de la distribution des unitaires générés par l\'ansatz (en échantillonnant aléatoirement ses paramètres) à la **distribution de Haar**, qui est la distribution uniforme sur le groupe des matrices unitaires U(d). Un ansatz qui peut reproduire les moments statistiques de la distribution de Haar jusqu\'à l\'ordre t est appelé un **t-design unitaire**. Un ansatz qui est un 2-design, par exemple, est considéré comme très expressif car il se comporte, d\'un point de vue statistique jusqu\'au second ordre, comme un circuit complètement aléatoire.

Une plus grande expressivité est souvent considérée comme souhaitable, car elle augmente la probabilité que l\'espace des états accessibles par l\'ansatz contienne l\'état solution du problème. Cependant, comme nous allons le voir, une expressivité maximale n\'est pas toujours une bonne chose.

#### 64.6.3 Le concept d\'Entrainabilité (Trainability) : La facilité à optimiser les paramètres

L\'entraînabilité (ou \"trainability\") d\'un ansatz fait référence à la facilité avec laquelle un algorithme d\'optimisation classique peut trouver les valeurs optimales de ses paramètres. Un paysage de coût \"entraînable\" est un paysage qui présente des gradients suffisamment grands et informatifs pour guider efficacement l\'optimiseur vers un minimum.

Formellement, l\'entraînabilité est souvent quantifiée par la **variance des dérivées partielles** de la fonction de coût par rapport aux paramètres, moyennée sur toutes les initialisations possibles des paramètres. Si cette variance, Var\[∂C/∂θk\], est très faible (par exemple, si elle décroît exponentiellement avec le nombre de qubits), cela signifie que le gradient est presque toujours proche de zéro sur l\'ensemble du paysage. Le paysage est \"plat\", et l\'optimiseur n\'a aucune direction à suivre. C\'est la définition formelle d\'un plateau stérile.

#### 64.6.4 La relation critique entre l\'expressivité et le risque de plateaux stériles (Barren Plateaus)

L\'une des découvertes les plus importantes et les plus contre-intuitives de ces dernières années en apprentissage automatique quantique est la relation directe et conflictuelle entre l\'expressivité et l\'entraînabilité.

Il a été démontré de manière rigoureuse qu\'**une expressivité trop élevée conduit à une faible entraînabilité**. Plus précisément, si un ansatz est suffisamment expressif pour former un 2-design, alors la variance de ses gradients de coût s\'annule exponentiellement avec le nombre de qubits n. Var\[∂C/∂θk\]∈O(1/d)≈O(1/2n) Cela signifie que les ansatz très expressifs, comme les ansatz agnostiques au matériel avec une profondeur suffisante, sont garantis de souffrir du phénomène des plateaux stériles.88

Cette découverte a profondément modifié la philosophie de la conception d\'ansatz. L\'objectif n\'est plus de concevoir l\'ansatz le plus expressif possible. Au contraire, il s\'agit de trouver un **compromis** : l\'ansatz doit être \"juste assez\" expressif pour inclure la solution du problème dans son espace accessible, tout en étant suffisamment structuré et contraint pour ne pas être un 2-design et ainsi éviter les plateaux stériles. C\'est pourquoi les ansatz spécifiques à un problème ou les architectures structurées comme les QCNN, qui explorent des sous-espaces plus restreints de l\'espace de Hilbert, sont des pistes de recherche si actives. Ils sacrifient l\'universalité au profit de l\'entraînabilité.

### 64.7 Le Problème des Plateaux Stériles (Barren Plateaus) : Un Obstacle Majeur

Le phénomène des plateaux stériles (barren plateaus) représente l\'un des défis les plus importants pour l\'évolutivité des algorithmes quantiques variationnels et des RNQ. Il menace de rendre l\'entraînement de modèles sur des processeurs quantiques de taille moyenne à grande pratiquement impossible avec les méthodes d\'optimisation basées sur le gradient.

#### 64.7.1 Définition et origine du phénomène : Disparition des gradients dans les circuits profonds

Un plateau stérile est une région du paysage de la fonction de coût où les gradients de la fonction de coût par rapport aux paramètres du circuit sont, avec une très forte probabilité, exponentiellement petits par rapport au nombre de qubits du système. Mathématiquement, pour un paramètre θk, la variance de sa dérivée partielle s\'annule de manière exponentielle : Var\[∂C/∂θk\]∝2cn1, où n est le nombre de qubits et c est une constante positive.92

Comme la moyenne du gradient est nulle pour des ansatz aléatoires, une variance exponentiellement faible implique, via l\'inégalité de Chebyshev, que la probabilité de mesurer un gradient supérieur à une petite constante est elle-même exponentiellement faible. En d\'autres termes, le paysage de la fonction de coût est presque entièrement plat, à l\'exception potentielle de quelques \"gorges\" étroites menant aux minima. Un optimiseur basé sur le gradient, initialisé au hasard, se retrouvera presque certainement sur ce plateau et sera incapable de trouver une direction de descente, rendant l\'entraînement inefficace.

L\'origine profonde de ce phénomène réside dans la **concentration de la mesure** dans les espaces de Hilbert de haute dimension. À mesure que la dimension de l\'espace (d=2n) augmente, le volume de cet espace se concentre de plus en plus près de son \"équateur\". Pour les circuits quantiques qui explorent cet espace de manière suffisamment uniforme (c\'est-à-dire, les circuits qui forment des 2-designs), la valeur d\'espérance de n\'importe quel observable se concentrera très fortement autour de sa valeur moyenne sur l\'ensemble de l\'espace de Hilbert, qui est Tr(O\^)/d. Comme cette valeur est indépendante des paramètres θ, la fonction de coût devient plate.

#### 64.7.2 Causes identifiées : Bruit, enchevêtrement excessif, coût global

Plusieurs facteurs ont été identifiés comme étant des causes directes ou des amplificateurs du phénomène des plateaux stériles :

1. **Profondeur du circuit et expressivité :** C\'est la cause la plus étudiée. Comme discuté précédemment, les ansatz qui sont trop profonds ou trop intriquants tendent à se comporter comme des circuits aléatoires, formant des 2-designs et conduisant ainsi à des plateaux stériles. C\'est ce qu\'on appelle le plateau stérile induit par l\'ansatz.
2. **Fonctions de coût globales :** Le type d\'observable mesuré joue un rôle crucial. Si l\'observable O\^ est **global**, c\'est-à-dire qu\'il agit de manière non-triviale sur tous ou un grand nombre de qubits (par exemple, un projecteur sur l\'état ∣00...0⟩), alors des plateaux stériles peuvent apparaître même pour des circuits de faible profondeur. En revanche, si l\'observable est **local**, agissant seulement sur un petit nombre de qubits (par exemple, O\^=Z1⊗I2⊗⋯⊗In), les gradients peuvent rester polynomiaux en n.
3. **Bruit matériel :** Le bruit, en particulier le bruit dépolarisant qui tend à ramener l\'état vers l\'état maximalement mixte, peut également induire des plateaux stériles, même pour des circuits qui en seraient exempts en l\'absence de bruit. Le bruit agit comme un agent \"randomisant\" qui augmente l\'expressivité effective du circuit vers un 2-design, aplatissant le paysage de coût.
4. **Enchevêtrement :** L\'enchevêtrement à grande échelle, que ce soit dans l\'ansatz ou même dans les données d\'entrée elles-mêmes, a été identifié comme une cause fondamentale des plateaux stériles. Un enchevêtrement excessif entre différentes parties du circuit peut conduire à une perte d\'information locale et à la disparition des gradients.

#### 64.7.3 Stratégies d\'atténuation : Initialisation des paramètres, coût local, co-design ansatz-coût

Face à ce défi majeur, la communauté de recherche a développé plusieurs stratégies pour atténuer ou éviter les plateaux stériles. Ces stratégies reflètent une compréhension plus profonde de la trinité de conception \"Encodage-Ansatz-Coût\". La performance et l\'entraînabilité d\'un RNQ ne sont pas des propriétés isolées de l\'ansatz, mais des propriétés émergentes de l\'interaction entre la manière dont les données sont représentées (encodage), comment elles sont traitées (ansatz), et comment le succès est mesuré (fonction de coût).

Par exemple, un encodage qui génère beaucoup d\'intrication (haute expressivité) peut nécessiter un ansatz peu profond et une fonction de coût locale pour rester entraînable. À l\'inverse, un encodage simple (comme l\'encodage angulaire) peut permettre l\'utilisation d\'un ansatz plus complexe. La conception d\'un RNQ n\'est donc pas une séquence d\'étapes indépendantes, mais un processus de **co-design holistique**.

Le tableau suivant résume les principales stratégies d\'atténuation.

---

  **Stratégie**                     **Principe de Fonctionnement**                                                                                                                                              **Cause du Plateau Ciblée**   **Avantages**                                                                                        **Inconvénients/Coût**

  **Fonctions de Coût Locales**     Mesurer des observables qui n\'agissent que sur un petit sous-ensemble de qubits (indépendant de n).                                                                        Coût Global                   Efficacité prouvée pour éviter les plateaux dans de nombreux cas. Facile à mettre en œuvre.          Peut ne pas capturer les corrélations globales nécessaires à la résolution du problème.

  **Initialisation Intelligente**   Initialiser les paramètres θ de manière à ce que le circuit soit proche de l\'identité ou d\'une autre transformation simple, évitant de commencer dans une région plate.   Expressivité                  Simple à implémenter. Peut réduire considérablement le nombre d\'itérations nécessaires.             L\'efficacité dépend du problème ; une bonne initialisation n\'est pas toujours évidente.

  **Ansatz Structurés**             Utiliser des ansatz avec une structure récurrente ou hiérarchique (QCNN, réseaux tensoriels) qui ne forment pas de 2-designs.                                               Expressivité                  Prouvé pour éviter les plateaux pour certaines architectures. Souvent plus efficace en paramètres.   Moins universel qu\'un ansatz agnostique au matériel. La conception nécessite une expertise.

  **Entraînement par Couches**      Entraîner le circuit couche par couche, en gelant les paramètres des couches précédentes, pour construire progressivement la solution.                                      Profondeur du circuit         Décompose un problème d\'optimisation difficile en une série de problèmes plus simples.              Peut conduire à des solutions sous-optimales. Augmente la complexité du protocole d\'entraînement.

  **Pré-entraînement**              Utiliser une tâche de pré-entraînement non supervisée pour trouver une bonne région de l\'espace des paramètres avant de commencer l\'optimisation supervisée.              Expressivité                  Peut contourner les plateaux en trouvant une initialisation pertinente pour le problème.             Double le coût de l\'entraînement. La conception d\'une bonne tâche de pré-entraînement est un défi.

---

*Table 3.3: Stratégies d\'Atténuation des Plateaux Stériles. Ces stratégies peuvent souvent être combinées pour une efficacité accrue.*

En conclusion, bien que les plateaux stériles représentent une contrainte fondamentale, ils ont également stimulé une recherche intense qui a conduit à une compréhension beaucoup plus nuancée de ce qui rend un RNQ efficace. L\'avenir de la conception des RNQ réside probablement dans des approches de co-conception intelligentes qui équilibrent soigneusement les ressources, l\'expressivité et l\'entraînabilité pour s\'adapter à la fois au problème à résoudre et au matériel disponible.

## Partie IV : De la Conception à la Mise en Œuvre sur Matériel Quantique

Après avoir exploré les fondements théoriques, les paradigmes architecturaux et les principes d\'ingénierie de la conception des RNQ, cette dernière partie aborde le défi ultime : la transition du modèle abstrait à son exécution sur un véritable processeur quantique. Cette étape confronte l\'élégance des mathématiques à la réalité désordonnée du matériel de l\'ère NISQ. Nous examinerons les contraintes imposées par le matériel actuel, les processus de compilation et d\'atténuation d\'erreurs nécessaires pour combler le fossé entre l\'idéal et le réel, et l\'écosystème logiciel qui orchestre cette transition complexe. Enfin, une étude de cas détaillée illustrera l\'ensemble du flux de travail, de la définition du problème à l\'analyse des résultats sur un QPU.

### 64.8 Implémentation dans le Contexte de l\'Ère NISQ

L\'ère NISQ (Noisy Intermediate-Scale Quantum) décrit l\'état actuel de la technologie quantique : des processeurs avec un nombre de qubits intermédiaire (50 à quelques centaines) qui sont trop bruités pour exécuter des algorithmes de correction d\'erreurs quantiques complets. L\'implémentation de RNQ dans ce contexte est un exercice de gestion des imperfections.

#### 64.8.1 Les contraintes du matériel actuel : Bruit, topologie de connectivité, temps de cohérence

Trois contraintes matérielles principales dominent la conception des algorithmes NISQ :

1. **Le Bruit :** C\'est l\'obstacle le plus important. Les qubits sont extrêmement sensibles à leur environnement, ce qui entraîne des erreurs. Les principales sources de bruit incluent  :

   - **Décohérence :** Perte progressive de l\'information quantique (superposition et intrication) due aux interactions avec l\'environnement. Elle se manifeste par des temps de relaxation (T1) et de déphasage (T2) finis.
   - **Erreurs de portes :** Les opérations quantiques (portes) ne sont pas parfaites. Chaque porte a une fidélité inférieure à 100%, et les erreurs s\'accumulent à mesure que la profondeur du circuit augmente. Les portes à deux qubits (comme CNOT) sont généralement beaucoup plus bruyantes que les portes à un qubit.
   - **Erreurs de lecture (SPAM - State Preparation and Measurement) :** Des erreurs peuvent se produire lors de l\'initialisation des qubits dans l\'état ∣0⟩ et lors de la mesure finale de leur état.
   - **Diaphonie (Crosstalk) :** L\'opération sur un qubit peut affecter involontairement l\'état de ses voisins.
2. **Topologie de Connectivité Limitée :** Dans un circuit quantique idéal, on suppose que l\'on peut appliquer une porte à deux qubits entre n\'importe quelle paire de qubits. En réalité, sur une puce quantique, chaque qubit n\'est physiquement connecté qu\'à un petit nombre de voisins. Appliquer une porte CNOT entre deux qubits non-adjacents nécessite une série de portes SWAP pour rapprocher leurs états, ce qui augmente considérablement la profondeur et le bruit du circuit.
3. **Temps de Cohérence Courts :** Les temps de cohérence (T1 et T2) définissent la fenêtre temporelle pendant laquelle un calcul quantique peut être effectué avant que l\'état ne se dégrade de manière irréversible. La durée totale d\'exécution du circuit doit être nettement inférieure à ces temps de cohérence, ce qui limite la profondeur maximale des circuits réalisables.

Ces contraintes imposent une philosophie de conception : les algorithmes pour les dispositifs NISQ, y compris les RNQ, doivent utiliser des **circuits de faible profondeur** et minimiser le nombre de portes à deux qubits.

#### 64.8.2 Compilation et Transpilation de Circuits : Adapter le circuit idéal au matériel réel

Le circuit qu\'un développeur conçoit est un circuit logique abstrait. Pour qu\'il puisse être exécuté sur un QPU spécifique, il doit subir un processus de compilation et de **transpilation**. La transpilation est la tâche de réécrire le circuit abstrait en une séquence d\'instructions physiques natives du matériel, tout en l\'optimisant pour minimiser les effets du bruit.

Ce processus, géré par des outils comme le transpileur de Qiskit, comporte plusieurs étapes clés :

1. **Décomposition (Unrolling) :** Le circuit initial est décomposé en un ensemble de portes de base, ou **portes natives**, qui sont les seules opérations que le matériel peut exécuter physiquement (par exemple, des rotations à un qubit et une porte CNOT).
2. **Mappage des Qubits (Layout) :** Les qubits \"virtuels\" du circuit abstrait sont assignés aux qubits \"physiques\" sur la puce. Cette étape est cruciale et cherche à trouver un mappage qui minimise le nombre d\'interactions requises entre des qubits non-adjacents, en tenant compte de la topologie de connectivité du matériel.
3. **Routage (Routing) :** Une fois le mappage choisi, le transpileur insère des portes **SWAP** dans le circuit pour permettre les portes à deux qubits entre des qubits qui ne sont pas directement connectés physiquement. Le routage est un problème d\'optimisation complexe (NP-difficile), et des heuristiques sont utilisées pour trouver une solution approchée.
4. **Optimisation :** Des passes d\'optimisation supplémentaires sont appliquées pour réduire la complexité du circuit. Cela peut inclure la fusion de portes consécutives, l\'annulation de paires de portes inverses (UU†), et d\'autres techniques de simplification de circuit.

Le résultat de la transpilation est souvent un circuit beaucoup plus profond et complexe que le circuit logique original, en raison de l\'ajout des portes SWAP et de la décomposition en portes natives. Une bonne transpilation est donc essentielle pour obtenir des résultats significatifs sur le matériel NISQ.

#### 64.8.3 Le rôle fondamental de l\'atténuation d\'erreurs (Error Mitigation)

Étant donné qu\'il est impossible d\'éliminer complètement le bruit sur les dispositifs NISQ, des techniques d\'**atténuation d\'erreurs** ont été développées. Contrairement à la correction d\'erreurs, qui vise à corriger les erreurs au fur et à mesure qu\'elles se produisent, l\'atténuation d\'erreurs est une technique de post-traitement. Elle consiste à exécuter plusieurs versions d\'un circuit pour déduire une estimation de ce que serait le résultat sans bruit.

##### 64.8.3.1 Extrapolation à zéro bruit (ZNE)

Le principe de la ZNE est simple et puissant. Il repose sur l\'hypothèse que l\'on peut contrôler le niveau de bruit dans le système. La procédure est la suivante :

1. **Amplification du Bruit :** On exécute le circuit d\'intérêt non seulement à son niveau de bruit natif (λ=1), mais aussi à des niveaux de bruit artificiellement amplifiés (λ\>1). Une méthode courante pour amplifier le bruit est le **pliage de portes (gate folding)**, où chaque porte U est remplacée par la séquence U(U†U)k. Dans un monde sans bruit, U†U=I, donc cette séquence est équivalente à U. Mais en présence de bruit, chaque porte ajoutée contribue à l\'erreur globale, amplifiant ainsi le bruit d\'un facteur proportionnel à k.
2. **Mesure :** On mesure la valeur d\'espérance de l\'observable pour chaque niveau de bruit amplifié.
3. **Extrapolation :** On trace les valeurs d\'espérance mesurées en fonction du facteur d\'amplification du bruit λ. On ajuste ensuite une courbe (par exemple, linéaire ou exponentielle) à ces points de données et on l\'extrapole jusqu\'à λ=0 pour obtenir une estimation du résultat sans bruit.

##### 64.8.3.2 Annulation probabiliste d\'erreurs (PEC)

La PEC est une technique plus sophistiquée qui vise à inverser l\'effet moyen du bruit. Elle nécessite une caractérisation précise du bruit affectant chaque porte native du système (un processus appelé tomographie de portes).

1. **Modélisation du Bruit :** On modélise l\'action de chaque porte bruyante Ei comme une combinaison linéaire de portes idéales (sans bruit) {Uj}.
2. **Décomposition Inverse :** On calcule une décomposition quasi-probabiliste de la porte idéale inverse Ui−1 en termes d\'opérations bruyantes physiquement réalisables Ej.
3. **Échantillonnage Stochastique :** Pour simuler l\'exécution d\'un circuit idéal, on exécute de manière stochastique de nombreux circuits différents. À chaque étape du circuit, au lieu d\'appliquer la porte idéale, on échantillonne l\'une des opérations bruyantes de la décomposition inverse avec une certaine probabilité. En moyenne, cette procédure simule l\'application de la porte idéale.

La PEC peut fournir une estimation non biaisée du résultat sans bruit, mais elle a un coût d\'échantillonnage (overhead) qui augmente de manière exponentielle avec le nombre de portes dans le circuit, ce qui la limite aux circuits de faible profondeur.

### 64.9 Écosystème Logiciel et Plateformes de Développement

La mise en œuvre de RNQ sur du matériel réel serait une tâche herculéenne sans l\'existence d\'écosystèmes logiciels sophistiqués. Ces frameworks fournissent les outils nécessaires pour concevoir, compiler, exécuter et analyser des algorithmes quantiques, en faisant le pont entre les concepts de haut niveau et le matériel de bas niveau.

#### 64.9.1 Présentation des principaux frameworks : Pennylane, Qiskit, Cirq, etc.

Trois frameworks open-source dominent actuellement le paysage :

- **Qiskit (développé par IBM) :** C\'est un écosystème complet qui couvre l\'ensemble du spectre, de l\'éducation à la recherche de pointe. Il offre des outils pour la construction de circuits, des simulateurs performants, un transpileur très avancé, et une intégration transparente avec les ordinateurs quantiques d\'IBM via le cloud.
- **PennyLane (développé par Xanadu) :** PennyLane est spécifiquement conçu pour l\'apprentissage automatique quantique et le calcul différentiable. Sa principale force est de traiter les circuits quantiques comme des nœuds différentiables qui peuvent être intégrés nativement dans des frameworks d\'IA classiques.
- **Cirq (développé par Google) :** Cirq est axé sur les algorithmes de l\'ère NISQ. Il offre un contrôle très fin sur la définition des circuits, le mappage des qubits et la modélisation du bruit, ce qui le rend particulièrement adapté aux chercheurs qui souhaitent étudier l\'interaction entre les algorithmes et le matériel.

#### 64.9.2 Leurs forces respectives : Différenciation automatique, intégration avec les frameworks d\'IA classiques (PyTorch, TensorFlow)

La principale distinction entre ces frameworks réside dans leur philosophie et leur domaine d\'application privilégié :

- **Différenciation automatique (PennyLane) :** La caractéristique phare de PennyLane est sa capacité à calculer automatiquement les gradients des circuits quantiques (en utilisant des méthodes comme la règle du décalage de paramètre en arrière-plan). Cela permet à un utilisateur de définir un modèle hybride en utilisant la syntaxe de PyTorch ou TensorFlow, et la rétropropagation du gradient se chargera de manière transparente de l\'optimisation des paramètres classiques et quantiques. C\'est un avantage considérable pour le prototypage rapide de RNQ.
- **Intégration matérielle et contrôle de la compilation (Qiskit) :** La force de Qiskit réside dans son intégration profonde avec le matériel d\'IBM et son transpileur modulaire. Il offre aux utilisateurs un contrôle granulaire sur chaque étape de la compilation, du layout au routage et à l\'optimisation, ce qui est essentiel pour extraire les meilleures performances du matériel NISQ. Qiskit Machine Learning fournit également des modules de haut niveau pour construire des RNQ.

Le choix du framework dépend donc souvent de l\'objectif : PennyLane est idéal pour les chercheurs en IA qui veulent explorer les modèles quantiques sans se plonger dans les détails de la compilation, tandis que Qiskit est privilégié par ceux qui cherchent à optimiser l\'exécution sur du matériel spécifique.

#### 64.9.3 L\'abstraction matérielle : Comment ces logiciels facilitent l\'exécution sur divers QPU

Une fonction essentielle de ces frameworks est de fournir une **couche d\'abstraction matérielle**. Le chercheur écrit son code en utilisant une interface de haut niveau pour définir son circuit. Au moment de l\'exécution, il spécifie simplement le \"backend\" sur lequel il souhaite l\'exécuter. Ce backend peut être un simulateur local, un simulateur haute performance dans le cloud, ou un véritable QPU de différents fournisseurs (IBM, Rigetti, IonQ, etc.).

Le framework se charge alors de toutes les étapes de bas niveau : il envoie le circuit au service cloud approprié, le met en file d\'attente, récupère les résultats bruts (les \"counts\" de mesure), et les restitue à l\'utilisateur dans un format standardisé. Cette abstraction permet de tester et de comparer les performances d\'un même algorithme sur différentes plateformes matérielles avec des modifications de code minimes, ce qui accélère considérablement le cycle de recherche et développement.

### 64.10 Étude de Cas Détaillée : Construction d\'un Classifieur RNQ de A à Z

Pour consolider les concepts abordés dans ce chapitre, nous allons maintenant construire un classifieur basé sur un RNQ de bout en bout. Ce cas d\'étude nous guidera à travers chaque étape pratique, de la préparation des données à l\'analyse des résultats obtenus sur un simulateur et, conceptuellement, sur un véritable processeur quantique. Nous utiliserons le framework PennyLane pour sa simplicité d\'intégration avec les outils d\'apprentissage automatique classiques comme PyTorch.

#### 64.10.1 Définition du problème : Un cas de classification simple mais non trivial

Nous nous attaquerons à un problème de classification binaire classique : la classification de l\'ensemble de données \"cercles\" (circles). Il s\'agit de générer des points de données en deux dimensions, (x1,x2), et de les classer en deux catégories (par exemple, 0 et 1) selon qu\'ils se trouvent à l\'intérieur ou à l\'extérieur d\'un cercle centré à l\'origine. Ce problème est non trivial car les deux classes ne sont pas linéairement séparables, ce qui nécessite un classifieur doté d\'une capacité non linéaire.

#### 64.10.2 Étape 1 : Préparation et encodage des données

La première étape consiste à générer les données et à les préparer pour le circuit quantique.

1. **Génération des données :** Nous créons un ensemble d\'entraînement et un ensemble de test de points 2D, chacun avec une étiquette binaire.
2. **Encodage des données :** Nous devons choisir une stratégie pour encoder chaque point de données 2D (x1,x2) dans un état quantique. Étant donné les contraintes du matériel NISQ, une stratégie d\'**encodage angulaire** est un choix judicieux car elle conduit à des circuits de faible profondeur. Nous utiliserons un circuit à 2 qubits, où la première caractéristique x1 sera encodée dans le premier qubit et la seconde, x2, dans le second.

Le pseudo-code pour cette étape est le suivant : Python

\# Pseudo-code pour la préparation des données
def creer_donnees_cercle(nombre_points):
\# Générer des points aléatoires et leur assigner une étiquette
\# 0 (extérieur) ou 1 (intérieur) en fonction de leur distance à l\'origine.
\...
return points, etiquettes

\# Création des ensembles
X_train, Y_train = creer_donnees_cercle(200)
X_test, Y_test = creer_donnees_cercle(100)

\# La fonction d\'encodage sera une partie du circuit quantique.
\# Par exemple, pour un point x = (x1, x2), on appliquera
\# qml.RY(x1, wires=0) et qml.RY(x2, wires=1).
3.10.3 Étape 2 : Conception de l\'ansatz et de la mesure

Nous concevons maintenant le circuit quantique variationnel qui traitera les données encodées.

1. **Ansatz :** Nous utilisons un **ansatz agnostique au matériel** simple mais efficace, composé de plusieurs couches. Chaque couche comprendra des portes de rotation RY paramétrées sur chaque qubit, suivies de portes CNOT pour créer de l\'intrication. Le nombre de couches est un hyperparamètre que l\'on peut ajuster.
2. **Mesure :** Pour la classification binaire, une mesure simple et efficace consiste à mesurer l\'observable **Pauli-Z sur le premier qubit** (Z0). La valeur d\'espérance de cet observable, ⟨Z0⟩, sera un nombre réel entre -1 et 1. Nous pouvons interpréter une valeur positive comme une prédiction pour la classe 1 et une valeur négative pour la classe 0.

#### 64.10.4 Étape 3 : Implémentation du code via un framework (ex: Pennylane)

Nous implémentons maintenant le classifieur en utilisant PennyLane et PyTorch. Python

\# Pseudo-code de l\'implémentation avec PennyLane

import pennylane as qml
import torch

\# 1. Définir le dispositif quantique (simulateur)
n_qubits = 2
dev = qml.device(\"default.qubit\", wires=n_qubits)

\# 2. Définir le circuit quantique comme un QNode
\@qml.qnode(dev, interface=\"torch\")
def circuit_quantique(inputs, weights):
\# Encodage angulaire
qml.RY(inputs, wires=0)
qml.RY(inputs, wires=1)

\# Ansatz variationnel (2 couches)
\# Couche 1
qml.RY(weights, wires=0)
qml.RY(weights, wires=1)
qml.CNOT(wires=)
\# Couche 2
qml.RY(weights, wires=0)
qml.RY(weights, wires=1)
qml.CNOT(wires=)

\# Mesure
return qml.expval(qml.PauliZ(0))

\# 3. Créer le modèle hybride avec PyTorch
class ClassifieurRNQ(torch.nn.Module):
def \_\_init\_\_(self):
super().\_\_init\_\_()
\# Initialiser les poids du circuit quantique
self.weights = torch.nn.Parameter(torch.rand(4) \* 2 \* 3.1415)

def forward(self, x):
\# Le circuit quantique est appelé comme une fonction
return circuit_quantique(x, self.weights)

\# 4. Définir la fonction de coût et l\'optimiseur
modele = ClassifieurRNQ()
optimiseur = torch.optim.Adam(modele.parameters(), lr=0.1)
\# Fonction de coût : Erreur quadratique moyenne
\# On mappe les étiquettes {0, 1} à {-1, 1} pour correspondre à la sortie de la mesure
def cout(predictions, cibles):
cibles_mappees = 2 \* cibles - 1
return torch.mean((predictions - cibles_mappees)\*\*2)

#### 64.10.5 Étape 4 : Entraînement sur simulateur et analyse de la convergence

Nous exécutons la boucle d\'entraînement sur le simulateur default.qubit. Python

\# Pseudo-code de la boucle d\'entraînement
epochs = 50
for epoch in range(epochs):
for x, y in zip(X_train, Y_train):
optimiseur.zero_grad()
prediction = modele(torch.tensor(x))
perte = cout(prediction, torch.tensor(y))
perte.backward()
optimiseur.step()

\# Évaluer la précision à la fin de chaque époque
#\...
print(f\"Époque {epoch+1}, Perte: {perte.item()}\")

L\'analyse de la convergence se fait en traçant la valeur de la fonction de coût et la précision de la classification sur l\'ensemble d\'entraînement et de test au fil des époques. On s\'attend à voir la perte diminuer et la précision augmenter, indiquant que le modèle apprend la frontière de décision non-linéaire du problème des cercles.

#### 64.10.6 Étape 5 : Exécution sur un véritable processeur quantique (via le cloud) et analyse de l\'impact du bruit et de l\'atténuation d\'erreurs

Pour passer du simulateur au matériel réel, plusieurs étapes supplémentaires sont nécessaires.

1. **Changement de Backend :** On modifie la définition du dispositif pour cibler un QPU réel, par exemple via le plugin qiskit.ibmq de PennyLane. Cela nécessite une authentification auprès du fournisseur de cloud (par exemple, IBM Quantum Experience).Python\# Exemple conceptuel \# dev = qml.device(\"qiskit.ibmq\", wires=n_qubits, backend=\"ibmq_lima\",\...)
2. **Exécution et Analyse du Bruit :** On exécute la boucle d\'inférence (pas l\'entraînement, qui serait trop long et coûteux) sur l\'ensemble de test en utilisant le QPU. On compare la précision obtenue avec celle du simulateur. On s\'attend à une dégradation des performances due au bruit matériel (décohérence, erreurs de portes, etc.).
3. **Application de l\'Atténuation d\'Erreurs :** On intègre une technique d\'atténuation d\'erreurs. Par exemple, en utilisant la ZNE, on exécuterait le circuit à différents niveaux de bruit (en utilisant le pliage de portes) et on extrapolerait les prédictions pour obtenir un résultat corrigé. On comparerait ensuite la précision atténuée à la précision bruitée et à celle du simulateur.

Cette dernière étape met en évidence le fossé qui existe encore entre la simulation idéale et l\'exécution pratique. Elle souligne l\'importance capitale des techniques de compilation, d\'optimisation et d\'atténuation d\'erreurs, qui ne sont pas de simples détails techniques mais des composantes essentielles de l\'algorithme lui-même dans l\'ère NISQ.

### 64.11 Conclusion : L\'Architecture des RNQ, un Domaine en Pleine Effervescence

Ce chapitre a entrepris un voyage complet à travers le paysage de l\'architecture des réseaux neuronaux quantiques, des principes premiers de la mécanique quantique jusqu\'aux subtilités de leur mise en œuvre sur le matériel bruyant de l\'ère NISQ. Nous avons vu que la conception d\'un RNQ est un exercice d\'ingénierie holistique, un art du compromis qui cherche à équilibrer la puissance expressive avec la faisabilité pratique.

#### 64.11.1 Synthèse des paradigmes, des défis de conception et des solutions d\'implémentation

Notre exploration a révélé plusieurs points clés :

- **Une fondation hybride :** Le paradigme dominant du Circuit Quantique Variationnel (CQV) est une architecture hybride par nécessité, une réponse pragmatique aux limitations du matériel actuel. Il délègue l\'optimisation à des processeurs classiques robustes, n\'utilisant le QPU que pour sa capacité potentiellement supérieure à explorer de vastes espaces de Hilbert.
- **Une taxonomie inspirée mais distincte :** Les architectures de RNQ (QCNN, QRNN, QGAN) s\'inspirent de leurs homologues classiques, mais leur traduction dans le langage quantique est loin d\'être directe. Les contraintes fondamentales comme l\'unitarité et le non-clonage forcent des réinventions qui peuvent, de manière surprenante, offrir des solutions à des problèmes classiques, comme la stabilité des gradients dans les QRNN.
- **La trinité de la conception :** La performance d\'un RNQ ne peut être comprise en analysant ses composants de manière isolée. L\'**encodage des données**, l\'**ansatz variationnel** et la **fonction de coût** forment un système interdépendant. Le succès repose sur leur co-conception, en naviguant le compromis fondamental entre l\'expressivité (la capacité à représenter la solution) et l\'entraînabilité (la capacité à la trouver), un compromis rendu particulièrement saillant par le défi des plateaux stériles.
- **Le pont entre l\'idéal et le réel :** La mise en œuvre pratique sur le matériel NISQ nécessite une chaîne d\'outils sophistiquée. La **transpilation** adapte les circuits aux contraintes de connectivité et de portes natives, tandis que l\'**atténuation d\'erreurs** tente de compenser l\'impact omniprésent du bruit. La pile logicielle (Qiskit, PennyLane) n\'est pas un simple outil, mais une partie active de l\'algorithme, dont les choix de configuration peuvent influencer le résultat de manière aussi significative que la conception de l\'ansatz.

#### 64.11.2 Perspective : L\'évolution future des architectures de RNQ à mesure que la technologie matérielle progresse vers la tolérance aux pannes

Le domaine des RNQ est intrinsèquement lié à l\'évolution du matériel quantique. Les architectures que nous avons décrites sont, pour la plupart, des créations de l\'ère NISQ, conçues pour fonctionner avec des circuits de faible profondeur et un nombre limité de qubits. À mesure que la technologie progresse vers des ordinateurs quantiques tolérants aux pannes (fault-tolerant), avec des milliers, voire des millions de qubits logiques corrigés en erreur, nous pouvons nous attendre à une transformation radicale des architectures de RNQ.

- **Des circuits plus profonds et plus complexes :** La correction d\'erreurs permettra d\'exécuter des circuits beaucoup plus profonds, libérant le potentiel d\'ansatz plus expressifs sans être immédiatement paralysés par le bruit. Des algorithmes quantiques qui sont aujourd\'hui théoriques, comme les versions quantiques de la rétropropagation, pourraient devenir réalisables.
- **Moins de dépendance à l\'optimisation classique :** Avec des QPU plus puissants et cohérents, une plus grande partie de la boucle d\'apprentissage pourrait être transférée du côté quantique. On pourrait voir émerger des architectures moins \"variationnelles\" et plus \"purement quantiques\".
- **Nouvelles stratégies d\'encodage :** Des méthodes d\'encodage de données plus puissantes mais actuellement coûteuses, comme l\'encodage d\'amplitude, pourraient devenir la norme, permettant de traiter des ensembles de données beaucoup plus grands.

L\'architecture des RNQ est un domaine en pleine effervescence, non pas malgré les limitations du matériel actuel, mais en grande partie grâce à elles. Les contraintes de l\'ère NISQ ont forcé la communauté à être extraordinairement créative, donnant naissance à des modèles hybrides ingénieux et à une compréhension profonde des compromis entre la puissance théorique et la mise en œuvre pratique.

#### 64.11.3 Transition vers le chapitre 4 : Exploration d\'autres classes d\'algorithmes, comme les approches évolutionnaires, enrichies par ces nouvelles capacités computationnelles

Alors que ce chapitre s\'est concentré sur les architectures inspirées des réseaux de neurones et des méthodes d\'optimisation basées sur le gradient, le paysage de l\'IA quantique est bien plus vaste. Les capacités de calcul explorées ici --- la préparation d\'états complexes, l\'exploration de vastes espaces de recherche et l\'évaluation de fonctions de coût complexes --- ne sont pas exclusives aux RNQ. Le chapitre suivant explorera comment ces mêmes capacités peuvent enrichir d\'autres classes d\'algorithmes d\'IA, notamment les approches évolutionnaires et les algorithmes génétiques quantiques. Nous verrons comment les principes de superposition et d\'intrication peuvent être exploités pour maintenir la diversité des populations, explorer des paysages de solutions de manière plus efficace et potentiellement accélérer la recherche de solutions optimales pour des problèmes où les gradients sont inexistants ou inutiles.

