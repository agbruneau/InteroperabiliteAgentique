# Chapitre I.49 : Interaction Homme-Machine (IHM/HCI)

L\'Interaction Homme-Machine (IHM), ou *Human-Computer Interaction* (HCI) en anglais, est une discipline scientifique, technologique et conceptuelle qui se situe au carrefour de l\'informatique, de la psychologie cognitive, du design et des sciences sociales. Son objectif fondamental est d\'étudier et d\'optimiser la relation entre les êtres humains et les systèmes informatiques. Loin de se limiter à la simple conception d\'interfaces graphiques esthétiques, l\'IHM s\'attache à rendre la technologie non seulement utilisable et efficace, mais également utile, accessible et agréable. La prémisse centrale de cette discipline est que les systèmes doivent être conçus pour l\'humain, en tenant compte de ses capacités, de ses limites et de ses objectifs. Cette approche place l\'utilisateur au cœur absolu du processus de conception, transformant la création de technologies d\'un exercice purement technique en une quête pour augmenter les capacités humaines et enrichir l\'expérience vécue.

Ce chapitre propose une exploration exhaustive de l\'Interaction Homme-Machine, en guidant le lecteur depuis les fondements psychologiques qui régissent la perception et la cognition humaines jusqu\'aux frontières les plus avancées de la discipline, telles que les interfaces immersives en réalité virtuelle et augmentée. La première section établira le socle théorique en examinant comment l\'architecture cognitive humaine contraint et informe la conception. La deuxième section fera le pont vers la pratique en présentant les principes directeurs et les heuristiques qui guident la création d\'interfaces utilisateur (UI) et la conception d\'une expérience utilisateur (UX) de qualité. La troisième section détaillera les méthodologies et les processus, notamment la conception centrée sur l\'utilisateur (UCD), qui permettent de mettre en œuvre ces principes de manière structurée et itérative. Enfin, les deux dernières sections aborderont des domaines spécialisés mais cruciaux : l\'accessibilité et la conception inclusive, qui visent à rendre la technologie équitable pour tous, et les défis uniques posés par les réalités étendues (XR), qui redéfinissent la nature même de l\'interaction.

## **49.1 Fondements Psychologiques et Cognitifs**

Pour concevoir des systèmes interactifs efficaces, il est impératif de comprendre l\'acteur principal de cette interaction : l\'être humain. La conception d\'interfaces n\'est pas un art subjectif, mais une science appliquée qui puise ses racines dans la psychologie cognitive. Comprendre comment les humains perçoivent, traitent, mémorisent l\'information et prennent des décisions est la clé pour créer des technologies qui semblent intuitives et naturelles. Cette section explore les modèles et les lois fondamentaux qui décrivent le fonctionnement du système cognitif humain et qui constituent le socle théorique sur lequel repose toute la discipline de l\'IHM.

### **49.1.1 Le Modèle du Processeur Humain (MPH) de Card, Moran et Newell**

Au début des années 1980, Stuart Card, Thomas Moran et Allen Newell ont proposé un modèle séminal qui a jeté les bases d\'une approche d\'ingénierie de l\'IHM : le Modèle du Processeur Humain (*Model Human Processor*, MPH). Ce modèle, décrit dans leur ouvrage de 1983,

*The Psychology of Human-Computer Interaction*, établit une analogie puissante entre l\'humain et un système de traitement de l\'information. Bien qu\'il s\'agisse d\'une simplification de la complexité de la cognition humaine, le MPH fournit un cadre quantitatif pour analyser et prédire la performance humaine dans des tâches d\'interaction de bas niveau.

Le modèle décompose le système humain en trois sous-systèmes interdépendants : le système perceptif, le système moteur et le système cognitif. Chacun de ces sous-systèmes est caractérisé par un processeur et des mémoires associées. Les paramètres clés qui décrivent ces composantes sont :

> Le temps de cycle du processeur (τ), qui représente le temps nécessaire pour un cycle de traitement élémentaire.
>
> La capacité de la mémoire (µ), soit la quantité d\'information pouvant être stockée.
>
> La persistance de l\'information en mémoire (δ), souvent exprimée comme la demi-vie d\'un élément d\'information.

#### **Le Système Perceptif et les Mémoires Sensorielles**

Le système perceptif est la porte d\'entrée de l\'information provenant de l\'environnement. Il est responsable de la transformation des stimuli physiques (lumière, son) en représentations internes. Le MPH postule un processeur perceptif avec un temps de cycle moyen τp​≈100 ms (avec une plage de 50 à 200 ms). Ce paramètre a des implications directes et concrètes pour la conception d\'interfaces. Par exemple, pour qu\'une séquence d\'images fixes soit perçue comme une animation fluide, chaque image doit être affichée pendant une durée inférieure à ce cycle. De même, deux événements se produisant à moins de 100 ms d\'intervalle sont souvent perçus comme simultanés, ce qui est crucial pour maintenir un sentiment de causalité directe dans l\'interface (par exemple, un retour visuel immédiat après un clic).

Associées au système perceptif, les mémoires sensorielles agissent comme des tampons de très courte durée qui retiennent une image fidèle du stimulus sensoriel juste assez longtemps pour qu\'il soit traité. On distingue principalement :

> **La mémoire iconique (visuelle) :** Elle a une capacité relativement grande (µ ≈ 17 \"lettres\") mais une persistance très faible (δ ≈ 200 ms). Elle permet au système cognitif d\'intégrer des informations visuelles qui arrivent séquentiellement, comme les saccades oculaires lors de la lecture.
>
> **La mémoire échoïque (auditive) :** Sa capacité est plus faible (µ ≈ 5 \"lettres\") mais sa persistance est nettement plus longue (δ ≈ 1500 ms). Cette persistance plus longue explique pourquoi nous pouvons parfois \"ré-entendre\" quelque chose qui vient d\'être dit, même si nous n\'y prêtions pas attention initialement.

#### **Le Système Cognitif et la Mémoire**

Le système cognitif est le cœur du traitement de l\'information. C\'est là que les décisions sont prises, que les problèmes sont résolus et que les souvenirs sont formés. Son processeur a un temps de cycle moyen τc​≈70 ms (avec une plage de 25 à 170 ms). Il opère selon un cycle fondamental de \"reconnaissance-action\" : à chaque cycle, le contenu de la mémoire de travail active des actions associées en mémoire à long terme, qui à leur tour modifient le contenu de la mémoire de travail. Le système cognitif s\'appuie sur deux systèmes de mémoire distincts mais interconnectés : la mémoire de travail et la mémoire à long terme.

La Mémoire de Travail (MDT)

La mémoire de travail (MDT), anciennement appelée mémoire à court terme, est l\'espace mental actif où l\'information est consciemment manipulée et traitée.6 Elle est le goulot d\'étranglement de la cognition humaine, car elle est sévèrement limitée sur deux dimensions cruciales :

> **Capacité limitée :** La MDT ne peut contenir qu\'un très petit nombre d\'éléments d\'information simultanément. George Miller, dans son article de 1956, a estimé cette capacité à \"sept, plus ou moins deux\" chunks (ou mnèmes). Un \"chunk\" est une unité d\'information significative (une lettre, un mot, un concept). Des recherches plus récentes suggèrent que la capacité réelle pourrait être encore plus faible, de l\'ordre de 3 à 4 chunks.
>
> **Persistance faible :** Sans effort de répétition ou de rafraîchissement, l\'information en MDT s\'estompe rapidement, en quelques secondes seulement (δ ≈ 7 s pour 3 chunks).

Cette double limitation de la mémoire de travail est le concept le plus important de la psychologie cognitive pour un concepteur d\'IHM. Toute tâche qui exige de l\'utilisateur qu\'il retienne et manipule trop d\'informations simultanément est vouée à provoquer des erreurs et de la frustration. C\'est la source fondamentale de ce que l\'on appelle la charge cognitive.

La Mémoire à Long Terme (MLT)

En contraste frappant avec la MDT, la mémoire à long terme (MLT) est un vaste réservoir de connaissances, de compétences et d\'expériences. Sa capacité et sa durée de stockage sont considérées comme quasi illimitées.1 L\'information y est stockée sous forme de réseaux sémantiques complexes, ou

**schémas**. Un schéma est une structure cognitive qui organise des connaissances sur un concept ou une procédure (par exemple, le schéma de \"conduire une voiture\" ou de \"commander dans un restaurant\").

L\'apprentissage est le processus par lequel l\'information est transférée de la MDT vers la MLT, par la construction et le renforcement de ces schémas. L\'expertise dans un domaine se caractérise par la possession de nombreux schémas riches et automatisés. Lorsqu\'un expert est confronté à une situation familière, il peut charger un schéma entier en mémoire de travail comme un seul \"chunk\", contournant ainsi les limites de la MDT et libérant des ressources cognitives pour des tâches de plus haut niveau.

#### **La Théorie de la Charge Cognitive (TCC)**

Développée par le psychologue de l\'éducation John Sweller dans les années 1980, la Théorie de la Charge Cognitive (TCC) s\'appuie directement sur les limitations de la mémoire de travail pour expliquer comment la charge mentale imposée par une tâche affecte l\'apprentissage et la performance. La TCC postule que la charge cognitive totale imposée à un utilisateur est la somme de trois types de charges distinctes  :

> **La Charge Cognitive Intrinsèque :** C\'est la complexité inhérente à la tâche elle-même, déterminée par le nombre d\'éléments d\'information à traiter simultanément et leurs interconnexions. Par exemple, apprendre une simple addition a une charge intrinsèque faible, tandis que comprendre la dérivation en calcul en a une élevée. Cette charge dépend aussi de l\'expertise de l\'utilisateur : ce qui est complexe pour un novice peut être simple pour un expert qui possède déjà les schémas pertinents en MLT.
>
> **La Charge Cognitive Extrinsèque (ou Inutile) :** C\'est la charge mentale imposée par la manière dont l\'information est présentée, et non par la tâche elle-même. Une interface mal conçue --- avec une navigation confuse, des informations superflues, une terminologie obscure ou une mise en page incohérente --- augmente la charge extrinsèque. L\'utilisateur doit dépenser de précieuses ressources cognitives pour \"comprendre l\'interface\" au lieu de \"réaliser sa tâche\".
>
> **La Charge Cognitive Essentielle (Germane) :** C\'est l\'effort mental que l\'utilisateur consacre activement à la construction de schémas et à l\'apprentissage, c\'est-à-dire au transfert d\'informations de la MDT vers la MLT. C\'est la \"bonne\" charge cognitive, celle qui mène à la compréhension et à la maîtrise.

L\'objectif principal de la conception d\'interface, du point de vue de la TCC, est de **minimiser la charge extrinsèque** afin de libérer le plus de ressources possible en mémoire de travail. Ces ressources peuvent alors être allouées soit à la gestion de la charge intrinsèque (pour les tâches complexes), soit à la promotion de la charge essentielle (pour l\'apprentissage). Une interface qui surcharge la mémoire de travail de l\'utilisateur avec des éléments inutiles (charge extrinsèque) entrave sa capacité à accomplir sa tâche et à apprendre à utiliser le système.

### **49.1.2 Lois Fondamentales et Modèles Prédictifs en IHM**

Au-delà du cadre général du MPH, la psychologie expérimentale a produit des lois quantitatives qui modélisent des aspects spécifiques de la performance humaine. Deux de ces lois sont particulièrement fondamentales en IHM car elles permettent de prédire le temps nécessaire pour effectuer des actions élémentaires : pointer et choisir.

#### **La Loi de Fitts : Modélisation du temps de pointage**

En 1954, le psychologue Paul Fitts a mené des expériences pour modéliser la vitesse et la précision du mouvement humain. Il a découvert une relation mathématique robuste qui prédit le temps nécessaire pour se déplacer vers une cible. La loi de Fitts est l\'un des modèles prédictifs les plus réussis et les plus durables en IHM.

La loi est généralement exprimée par la formule suivante :

T=a+blog2​(WD​+1)

Où :

> T est le temps moyen pour atteindre la cible.
>
> a et b sont des constantes empiriques qui dépendent du dispositif de pointage (souris, doigt, etc.).
>
> D est la distance entre le point de départ et le centre de la cible.
>
> W est la largeur de la cible, mesurée sur l\'axe du mouvement.

Le terme log2​(WD​+1) est appelé l\'**indice de difficulté (ID)** de la tâche. Il capture l\'essence de la loi : le temps de pointage augmente avec la distance à parcourir (D) et diminue avec la taille de la cible (W). Cette loi modélise le compromis fondamental entre vitesse et précision du système moteur humain : pour atteindre rapidement une cible lointaine ou petite, il faut une plus grande précision, ce qui demande plus de temps.

Bien que formulée bien avant l\'avènement des interfaces graphiques, la loi de Fitts a des implications profondes et directes pour leur conception :

> **Taille et espacement des cibles :** Les éléments interactifs (boutons, icônes, liens hypertextes) doivent être suffisamment grands pour être facilement et rapidement sélectionnés. C\'est particulièrement critique pour les interfaces tactiles, où le doigt est moins précis qu\'un curseur de souris. De plus, un espacement adéquat entre les cibles réduit le risque d\'erreurs de sélection.
>
> **La magie des coins et des bords de l\'écran :** Pour un curseur de souris, les bords et les coins d\'un écran agissent comme des barrières physiques. Le curseur ne peut pas aller plus loin. Du point de vue de la loi de Fitts, cela signifie que la largeur effective (W) de la cible dans la direction du bord est infinie. Par conséquent, l\'indice de difficulté est très faible, et ces zones sont les plus rapides à atteindre sur l\'écran. C\'est la raison pour laquelle les systèmes d\'exploitation placent stratégiquement des éléments d\'interaction importants aux bords de l\'écran, comme la barre de menus de macOS en haut ou la barre des tâches de Windows en bas.
>
> **Proximité des éléments liés :** Pour minimiser le temps de déplacement, les contrôles qui sont susceptibles d\'être utilisés en séquence doivent être placés à proximité les uns des autres. Par exemple, dans un formulaire, le bouton \"Soumettre\" devrait être placé juste après le dernier champ de saisie pour minimiser la distance D à parcourir. De même, les menus contextuels (clic droit) sont efficaces car ils apparaissent directement sous le curseur, rendant la distance\
> D quasi nulle.

#### **La Loi de Hick (ou Hick-Hyman) : Modélisation du temps de décision**

Alors que la loi de Fitts modélise le temps d\'une action physique, la loi de Hick modélise le temps d\'une action cognitive : la prise de décision. Formulée par William Hick et Ray Hyman dans les années 1950, elle stipule que le temps nécessaire pour prendre une décision augmente de manière logarithmique avec le nombre de choix disponibles.

La loi est exprimée par la formule :

T=blog2​(n+1)

Où :

> T est le temps de décision.
>
> b est une constante empirique.
>
> n est le nombre de choix possibles.

La relation logarithmique est cruciale : doubler le nombre de choix n\'entraîne pas un doublement du temps de décision, mais une augmentation constante. Néanmoins, chaque choix supplémentaire ajoute une charge cognitive et augmente le temps de réaction.

Les implications de la loi de Hick pour la conception d\'interfaces sont omniprésentes :

> **Simplification des menus et de la navigation :** Des listes de navigation longues et non structurées peuvent submerger l\'utilisateur et ralentir sa recherche d\'information. Il est préférable de regrouper les options en catégories logiques et de présenter une hiérarchie claire. Cela réduit le nombre effectif de choix (n) à chaque étape de la navigation.
>
> **Décomposition des tâches complexes :** Les processus qui impliquent de nombreuses décisions, comme un formulaire d\'inscription ou un processus de paiement en ligne, doivent être décomposés en plusieurs étapes plus petites. Chaque écran présente alors un nombre limité de choix, ce qui réduit la charge cognitive et le temps de décision à chaque étape, rendant le processus global moins intimidant et plus rapide à compléter.
>
> **Mise en évidence des options recommandées :** Lorsqu\'une interface présente de nombreux choix, mettre en évidence les options les plus courantes ou recommandées peut considérablement accélérer la décision pour la majorité des utilisateurs. Cela réduit l\'effort de recherche et de comparaison en guidant l\'attention de l\'utilisateur.
>
> **Intégration progressive (*Progressive Onboarding*) :** Pour les nouveaux utilisateurs, présenter d\'emblée toutes les fonctionnalités d\'une application complexe est une recette pour la surcharge cognitive. Une meilleure approche consiste à introduire les fonctionnalités progressivement, en ne montrant au début que l\'essentiel, puis en dévoilant des options plus avancées au fur et à mesure que l\'utilisateur se familiarise avec le système. L\'intégration de Slack est un excellent exemple de cette approche.

Le Modèle du Processeur Humain, bien que formulé il y a plusieurs décennies et parfois critiqué pour sa vision séquentielle qui ne capture pas entièrement le traitement parallèle du cerveau humain , demeure la pierre angulaire conceptuelle de l\'IHM. Sa valeur durable ne réside pas tant dans sa capacité à prédire avec une précision d\'ingénieur les temps de réaction, mais dans le fait qu\'il offre un

**modèle mental** puissant aux concepteurs. Il fournit la justification causale des principes de conception qui seront abordés plus loin. La capacité limitée de la mémoire de travail  est la raison fondamentale pour laquelle il faut privilégier la \"reconnaissance plutôt que le rappel\". Le compromis vitesse-précision du système moteur  est la raison d\'être de la loi de Fitts. Le cycle \"reconnaissance-action\" du processeur cognitif  explique pourquoi un retour d\'information immédiat est si vital. Ainsi, le MPH transforme les règles de design de simples directives en nécessités cognitives.

De même, les lois de Fitts et Hick ont vu leur rôle évoluer. Dans les interfaces modernes, qui incluent des interactions tactiles, gestuelles et en trois dimensions, l\'application littérale de leurs formules mathématiques devient complexe et parfois inadéquate. Par exemple, la notion de \"largeur\" d\'une cible gestuelle dans un espace 3D est ambiguë. La loi de Hick, quant à elle, suppose des choix discrets, alors que dans une interface riche, le contexte visuel et sémantique influence fortement la décision. Cependant, leur pertinence demeure intacte car elles se sont transformées de lois prédictives en

**heuristiques de conception** fondamentales. Le principe de Fitts (\"rendre les cibles importantes grandes et proches\") et celui de Hick (\"réduire et organiser les choix\") restent des guides extraordinairement puissants pour minimiser l\'effort physique et mental de l\'utilisateur. Elles ont évolué d\'outils d\'ingénierie pour des tâches simples à des principes directeurs pour la gestion de la complexité dans les systèmes interactifs modernes.

## **49.2 Principes de conception d\'interfaces (UI) et Expérience Utilisateur (UX)**

Après avoir établi les fondations cognitives qui régissent la manière dont les humains interagissent avec l\'information, il est temps de faire le pont vers la pratique du design. Comment traduire cette compréhension théorique en interfaces concrètes qui soient à la fois fonctionnelles et agréables à utiliser? Cette section présente les cadres de pensée, les principes et les règles empiriques qui guident la création de systèmes interactifs de haute qualité. Elle commence par clarifier une distinction fondamentale mais souvent mal comprise : celle entre l\'Interface Utilisateur (UI) et l\'Expérience Utilisateur (UX).

### **49.2.1 Distinction Fondamentale : Interface Utilisateur (UI) vs. Expérience Utilisateur (UX)**

Dans le domaine de la conception numérique, les termes \"UI\" et \"UX\" sont fréquemment utilisés, parfois de manière interchangeable, ce qui peut prêter à confusion. Pourtant, ils désignent deux aspects distincts mais interdépendants du processus de conception. Comprendre leur différence est essentiel pour appréhender la portée de l\'IHM moderne.

#### **Définition de l\'Interface Utilisateur (UI)**

L\'Interface Utilisateur (UI) représente le **point de contact tangible et visible** entre un utilisateur et un produit numérique. Elle concerne l\'ensemble des éléments visuels et interactifs qu\'un utilisateur voit et avec lesquels il interagit sur un écran. L\'UI est une discipline strictement numérique. Ses composantes incluent :

> **Les éléments visuels :** La typographie, les palettes de couleurs, les icônes, les images, l\'espacement et la mise en page générale des écrans.
>
> **Les éléments interactifs :** Les boutons, les champs de formulaire, les menus déroulants, les barres de navigation, les interrupteurs (toggles) et tout autre contrôle permettant à l\'utilisateur de manipuler le système.

Le travail d\'un designer UI est de traduire la structure et la logique d\'un produit (souvent définies par le designer UX) en une interface graphique polie, esthétiquement plaisante et fonctionnelle. Une bonne UI est claire, cohérente et efficace. Elle guide l\'œil de l\'utilisateur, rend les actions évidentes et crée une identité visuelle forte pour le produit. Quand elle est bien faite, l\'UI devient presque invisible : l\'utilisateur n\'a pas à réfléchir à la manière d\'utiliser l\'interface, il l\'utilise simplement.

#### **Définition de l\'Expérience Utilisateur (UX)**

L\'Expérience Utilisateur (UX) est un concept beaucoup plus large et holistique. Elle englobe le **ressenti global et l\'ensemble des perceptions** d\'une personne lorsqu\'elle interagit avec un produit, un service ou une entreprise. Contrairement à l\'UI, l\'UX n\'est pas limitée au monde numérique ; on peut parler de l\'UX d\'une cafetière, d\'un service de transport en commun ou d\'une visite dans un magasin.

L\'UX design se concentre sur la totalité du parcours de l\'utilisateur pour résoudre un problème ou atteindre un objectif. Il s\'intéresse à des questions telles que :

> **L\'utilité :** Le produit répond-il à un besoin réel?
>
> **L\'utilisabilité :** Le produit est-il facile et efficace à utiliser? 
>
> **L\'accessibilité :** Le produit peut-il être utilisé par des personnes ayant des capacités diverses?
>
> **La désirabilité :** L\'expérience est-elle agréable, engageante et émotionnellement satisfaisante?
>
> **La crédibilité :** L\'utilisateur a-t-il confiance dans le produit et l\'entreprise qui le propose?

Le designer UX travaille en amont et tout au long du projet. Ses tâches incluent la recherche utilisateur pour comprendre les besoins et les frustrations, la création de personas, la définition de l\'architecture de l\'information, la conception des parcours utilisateurs et la création de prototypes pour tester les concepts.

#### **La Relation entre UI et UX : Une Synergie Essentielle**

La meilleure façon de comprendre la relation entre UI et UX est de reconnaître que **l\'UI est une composante cruciale de l\'UX, mais qu\'elle ne la définit pas entièrement**. Une bonne UX est le résultat d\'une orchestration réussie de nombreux facteurs, dont l\'UI.

Une analogie couramment utilisée est celle de la construction d\'une maison :

> **L\'UX est l\'architecte.** Il conçoit les fondations, la structure, l\'agencement des pièces et la circulation pour s\'assurer que la maison est fonctionnelle, sûre et répond aux besoins de ses habitants.
>
> **L\'UI est le décorateur d\'intérieur.** Il choisit la couleur des murs, le mobilier, l\'éclairage et les finitions pour rendre la maison esthétiquement plaisante et agréable à vivre.

Une maison avec une architecture brillante (bonne UX) mais une décoration laide et peu pratique (mauvaise UI) ne sera pas une expérience agréable. Inversement, une maison magnifiquement décorée (bonne UI) mais avec des couloirs trop étroits et une cuisine non fonctionnelle (mauvaise UX) sera une source de frustration quotidienne.

Dans le monde numérique, cela se traduit par des exemples concrets :

> Un site de commerce électronique peut avoir une apparence magnifique avec de belles images et une typographie élégante (bonne UI), mais si le processus de paiement est long, confus et demande des informations redondantes, l\'expérience utilisateur globale (UX) sera mauvaise, et les ventes en souffriront.
>
> À l\'inverse, un site web peut être très fonctionnel et permettre de trouver rapidement l\'information (bonne UX), mais s\'il a une apparence datée et peu professionnelle (mauvaise UI), il risque de ne pas inspirer confiance et de faire fuir les utilisateurs.

La distinction entre UI et UX marque une étape importante dans la maturité de la discipline de l\'IHM. Les débuts du domaine étaient fortement axés sur l\'ergonomie de l\'artefact technique et graphique (l\'UI), avec des questions comme \"Ce bouton est-il assez grand?\" ou \"Ce menu est-il lisible?\". L\'émergence du terme UX, popularisé par Don Norman alors qu\'il travaillait chez Apple , a élargi le champ de vision pour englober l\'ensemble du parcours de l\'utilisateur, y compris ses émotions, ses objectifs et son contexte. Ce passage d\'une perspective d\'ingénierie centrée sur le produit à une perspective holistique centrée sur l\'humain est l\'essence même de l\'IHM moderne.

### **49.2.2 Les 10 Heuristiques d\'Utilisabilité de Jakob Nielsen**

Pour guider la conception et l\'évaluation d\'interfaces, des ensembles de principes directeurs ont été développés. Parmi les plus influents et les plus utilisés figurent les **10 heuristiques d\'utilisabilité** proposées par Jakob Nielsen et Rolf Molich au début des années 1990. Une \"heuristique\" est une règle empirique, un principe général qui sert de guide pour la résolution de problèmes ou la prise de décision. Ce ne sont pas des règles spécifiques et rigides, mais plutôt des points de repère qui aident les concepteurs à créer des interfaces plus utilisables et les évaluateurs à identifier rapidement les problèmes potentiels lors d\'une

**évaluation heuristique**.

Ces heuristiques ne sont pas des inventions arbitraires ; elles sont des traductions pratiques des limitations et des capacités du processeur humain décrites dans la section précédente. Chaque heuristique peut être vue comme un \"symptôme\" observable d\'un principe cognitif sous-jacent.

#### **1. Visibilité de l\'état du système**

> **Principe :** Le système doit toujours tenir les utilisateurs informés de ce qui se passe, en fournissant un retour d\'information approprié dans un délai raisonnable.
>
> **Lien cognitif :** Cette heuristique répond au besoin humain de contrôle et de prévisibilité. Sans retour d\'information, l\'utilisateur est dans l\'incertitude, ce qui augmente la charge cognitive et l\'anxiété. Un feedback immédiat confirme que l\'action a été prise en compte et permet à l\'utilisateur de planifier sa prochaine action.
>
> **Bonne conception :** Une barre de progression claire lors du téléchargement d\'un fichier, l\'icône \"en cours de frappe\...\" dans une messagerie instantanée, ou un message de confirmation \"Article ajouté au panier\" sur un site de commerce électronique.
>
> **Mauvaise conception :** Cliquer sur un bouton \"Envoyer\" et ne voir aucune indication que le système traite la demande. L\'utilisateur ne sait pas s\'il doit attendre, cliquer à nouveau ou si l\'action a échoué.

#### **2. Correspondance entre le système et le monde réel**

> **Principe :** Le système doit parler le langage de l\'utilisateur, avec des mots, des phrases et des concepts familiers, plutôt qu\'un jargon technique. Les informations doivent apparaître dans un ordre naturel et logique.
>
> **Lien cognitif :** Cette heuristique tire parti des schémas mentaux existants de l\'utilisateur, stockés dans sa mémoire à long terme. En utilisant des métaphores et des conventions du monde réel, on réduit la charge cognitive nécessaire pour apprendre et comprendre l\'interface.
>
> **Bonne conception :** L\'utilisation d\'une icône de corbeille pour la suppression de fichiers, le concept de \"panier\" pour les achats en ligne, ou des interrupteurs virtuels qui ressemblent et se comportent comme des interrupteurs physiques.
>
> **Mauvaise conception :** Afficher un message d\'erreur cryptique comme \"Erreur d\'exécution 0x80070057\" au lieu d\'expliquer le problème en termes simples.

#### **3. Contrôle et liberté de l\'utilisateur**

> **Principe :** Les utilisateurs font souvent des erreurs. Ils ont besoin d\'une \"sortie de secours\" clairement marquée pour quitter un état non désiré sans avoir à suivre un long processus. Les fonctions \"Annuler\" et \"Refaire\" sont essentielles.
>
> **Lien cognitif :** La possibilité d\'annuler une action réduit l\'anxiété et la peur de l\'erreur. Cela encourage l\'exploration et l\'apprentissage, car l\'utilisateur sait qu\'il peut revenir en arrière s\'il se trompe. Cela soutient un sentiment de contrôle et d\'agentivité.
>
> **Bonne conception :** Le bouton \"Annuler\" dans la fenêtre d\'envoi d\'un courriel sur Gmail, qui apparaît brièvement après l\'envoi, ou la fonction \"Annuler la frappe\" (Ctrl+Z) omniprésente dans les éditeurs de texte.
>
> **Mauvaise conception :** Une fenêtre modale qui ne peut être fermée qu\'en faisant un choix, sans option d\'annulation, piégeant ainsi l\'utilisateur. Ou encore, un processus en plusieurs étapes qui ne permet pas de revenir à l\'étape précédente pour corriger une information.

#### **4. Cohérence et standards**

> **Principe :** Les utilisateurs ne devraient pas avoir à se demander si des mots, des situations ou des actions différents signifient la même chose. Il faut suivre les conventions de la plateforme et maintenir une cohérence interne.
>
> **Lien cognitif :** La cohérence permet aux utilisateurs de transférer leurs connaissances d\'une partie d\'un site à une autre, et d\'un site à un autre (c\'est la **Loi de Jakob** : les utilisateurs passent la plupart de leur temps sur *d\'autres* sites). Cela réduit la charge d\'apprentissage et rend l\'interface prévisible.
>
> **Bonne conception :** Utiliser une icône de loupe pour la recherche, placer le logo de l\'entreprise en haut à gauche comme lien vers la page d\'accueil, et maintenir une structure de navigation et un style visuel constants sur toutes les pages d\'un site web.
>
> **Mauvaise conception :** Changer l\'emplacement du menu de navigation principal d\'une page à l\'autre, ou utiliser le même mot pour désigner deux actions différentes dans l\'interface.

#### **5. Prévention des erreurs**

> **Principe :** Une conception soignée qui prévient les problèmes est préférable à de bons messages d\'erreur.
>
> **Lien cognitif :** La détection et la correction d\'erreurs sont des processus cognitivement coûteux qui interrompent le flux de la tâche de l\'utilisateur. Prévenir l\'erreur en amont minimise cette charge.
>
> **Bonne conception :** Griser le bouton \"Soumettre\" d\'un formulaire tant que tous les champs obligatoires ne sont pas remplis. Proposer une boîte de dialogue de confirmation avant une action destructive comme \"Voulez-vous vraiment supprimer ce fichier?\". Utiliser des sélecteurs de date au lieu de champs de texte libre pour éviter les formats incorrects.
>
> **Mauvaise conception :** Un formulaire qui permet à l\'utilisateur de soumettre des données incorrectes (par exemple, des lettres dans un champ de numéro de carte de crédit) pour ensuite afficher une page d\'erreur.

#### **6. Reconnaître plutôt que se rappeler**

> **Principe :** Minimiser la charge mémorielle de l\'utilisateur en rendant les objets, les actions et les options visibles. L\'utilisateur ne devrait pas avoir à se souvenir d\'informations d\'une partie de l\'interface à une autre.
>
> **Lien cognitif :** C\'est une application directe de la limitation de la mémoire de travail. La reconnaissance (identifier quelque chose de familier) est cognitivement beaucoup moins exigeante que le rappel (récupérer une information de la mémoire sans indice).
>
> **Bonne conception :** Afficher les \"articles récemment consultés\" sur un site de commerce électronique. Les menus des éditeurs de texte qui montrent toutes les options disponibles au lieu d\'exiger de l\'utilisateur qu\'il se souvienne des commandes.
>
> **Mauvaise conception :** Un site de voyage qui demande à l\'utilisateur de se souvenir et de retaper les informations de son vol sur la page de location de voiture, au lieu de les pré-remplir automatiquement.

#### **7. Flexibilité et efficacité d\'utilisation**

> **Principe :** Le système doit être efficace à la fois pour les utilisateurs novices et experts. Des accélérateurs, invisibles pour les novices, peuvent souvent accélérer l\'interaction pour les experts.
>
> **Lien cognitif :** L\'apprentissage modifie les schémas mentaux. Une interface flexible permet aux utilisateurs de passer de stratégies d\'exploration (novices) à des stratégies d\'exécution optimisées (experts) à mesure qu\'ils se familiarisent avec le système.
>
> **Bonne conception :** Les raccourcis clavier (par exemple, Ctrl+C pour copier) dans les logiciels de bureau. La possibilité de personnaliser une barre d\'outils pour y placer les fonctions les plus utilisées.
>
> **Mauvaise conception :** Un système qui force tous les utilisateurs, même les plus expérimentés, à passer par un assistant en plusieurs étapes pour accomplir une tâche simple et répétitive.

#### **8. Esthétique et design minimaliste**

> **Principe :** Les dialogues ne doivent contenir que des informations pertinentes et nécessaires. Chaque unité d\'information supplémentaire dans une interface rivalise avec les unités pertinentes et diminue leur visibilité relative.
>
> **Lien cognitif :** Cette heuristique vise à maximiser le \"ratio signal/bruit\". En éliminant le bruit (éléments visuels ou textuels non pertinents), on réduit la charge cognitive extrinsèque et on permet à l\'utilisateur de se concentrer plus facilement sur le signal (l\'information et les actions importantes).
>
> **Bonne conception :** La page d\'accueil de Google, qui est presque entièrement dédiée à sa fonction principale : la recherche.
>
> **Mauvaise conception :** Une page d\'actualités surchargée de publicités clignotantes, de pop-ups, de vidéos en lecture automatique et de multiples colonnes de texte, rendant difficile la lecture de l\'article principal.

#### **9. Aider les utilisateurs à reconnaître, diagnostiquer et corriger les erreurs**

> **Principe :** Les messages d\'erreur doivent être exprimés en langage clair (sans codes), indiquer précisément le problème et suggérer de manière constructive une solution.
>
> **Lien cognitif :** Un bon message d\'erreur transforme une situation de blocage en une opportunité d\'apprentissage. Il guide l\'utilisateur vers la solution, réduit la frustration et lui permet de conserver son sentiment de contrôle sur le système.
>
> **Bonne conception :** Lorsqu\'un utilisateur crée un mot de passe, un message comme : \"Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre\" avec une indication visuelle des critères respectés.
>
> **Mauvaise conception :** Un message laconique comme \"Mot de passe invalide\" ou, pire, un code d\'erreur comme \"Erreur #5051\".

#### **10. Aide et documentation**

> **Principe :** Même s\'il est préférable que le système puisse être utilisé sans documentation, il peut être nécessaire de fournir une aide. Cette information doit être facile à rechercher, axée sur la tâche de l\'utilisateur, présenter des étapes concrètes et ne pas être trop volumineuse.
>
> **Lien cognitif :** L\'aide doit être conçue pour minimiser la charge cognitive. Une aide contextuelle, qui apparaît au moment et à l\'endroit où elle est nécessaire, est beaucoup plus efficace qu\'un manuel d\'utilisation massif que l\'utilisateur doit lire et mémoriser.
>
> **Bonne conception :** Une petite icône \"?\" à côté d\'un champ de formulaire complexe qui, au survol, affiche une infobulle expliquant ce qui est attendu. Une barre de recherche bien visible dans une section FAQ.
>
> **Mauvaise conception :** Un unique lien \"Aide\" dans le pied de page du site qui mène à un document PDF de 200 pages, non interrogeable et mal structuré.

### **49.2.3 Les 8 Règles d\'Or de la Conception d\'Interfaces de Ben Shneiderman**

Contemporain des travaux de Nielsen, Ben Shneiderman, un autre pionnier de l\'IHM, a proposé son propre ensemble de principes, connus sous le nom des **8 Règles d\'Or de la Conception d\'Interfaces**. Bien qu\'il y ait des chevauchements significatifs avec les heuristiques de Nielsen, les règles de Shneiderman mettent un accent particulier sur l\'autonomisation de l\'utilisateur et le sentiment de contrôle. Elles sont moins un outil d\'évaluation qu\'une philosophie de conception proactive.

> **Rechercher la cohérence :** Cette règle, similaire à celle de Nielsen, insiste sur la cohérence des séquences d\'actions, de la terminologie et des mises en page. Des actions similaires devraient être représentées de manière similaire pour assurer la prévisibilité.
>
> **Permettre aux utilisateurs fréquents d\'utiliser des raccourcis :** Identique à l\'heuristique 7 de Nielsen, cette règle préconise de concevoir des interfaces qui permettent aux experts d\'augmenter leur vitesse d\'interaction via des raccourcis, des touches de fonction ou des macros.
>
> **Offrir un feedback informatif :** Pour chaque action de l\'utilisateur, le système doit fournir un retour. Shneiderman précise que la nature du feedback doit être proportionnelle à l\'importance de l\'action : un feedback discret pour les actions fréquentes et mineures, et un feedback plus substantiel pour les actions importantes et rares.
>
> **Concevoir des dialogues qui aboutissent à une clôture :** Les séquences d\'actions devraient être organisées en groupes avec un début, un milieu et une fin clairs. La fin d\'une transaction ou d\'une tâche doit être marquée par un feedback informatif (par exemple, un message de confirmation \"Votre commande a été passée\"), ce qui procure à l\'utilisateur un sentiment d\'accomplissement et libère sa mémoire de travail.
>
> **Offrir une gestion simple des erreurs :** Cette règle combine la prévention et la correction. L\'interface doit être conçue pour minimiser la possibilité d\'erreurs. Si une erreur se produit, le système doit offrir des mécanismes simples et compréhensibles pour permettre à l\'utilisateur de se remettre sur la bonne voie.
>
> **Permettre une réversibilité aisée des actions :** Comme l\'heuristique 3 de Nielsen, cette règle souligne l\'importance des fonctions \"Annuler\". Shneiderman insiste sur le fait que cette capacité réduit l\'anxiété de l\'utilisateur et encourage l\'exploration d\'options inconnues, car les actions ne sont pas perçues comme irréversibles.
>
> **Soutenir un locus de contrôle interne :** C\'est peut-être la contribution la plus distinctive de Shneiderman. Cette règle stipule que les utilisateurs expérimentés désirent ardemment sentir qu\'ils sont aux commandes du système et que le système répond à leurs actions. Ils doivent être les initiateurs des actions, pas simplement des répondants. Le système doit être prévisible et ne pas effectuer d\'actions inattendues. Un design qui respecte cette règle donne à l\'utilisateur un sentiment de compétence et de confiance.
>
> **Réduire la charge de la mémoire à court terme :** En lien direct avec les limites de la mémoire de travail, cette règle préconise de concevoir des interfaces qui ne nécessitent pas que l\'utilisateur se souvienne d\'informations d\'un écran à l\'autre. Shneiderman cite la nécessité d\'affichages simples, de multiples fenêtres pour la comparaison d\'informations et de formats de saisie de données qui réduisent la charge mémorielle.

Ensemble, les heuristiques de Nielsen et les règles de Shneiderman forment un corpus de principes de conception robustes et éprouvés. Un concepteur qui comprend les fondements cognitifs de la section 49.1 n\'a pas besoin de mémoriser ces 18 principes comme un dogme. Il peut plutôt les déduire et les appliquer de manière flexible en se posant continuellement la question fondamentale : \"Cette conception respecte-t-elle les limites de la mémoire, de l\'attention et de la perception de mon utilisateur?\".

## **49.3 Processus de Conception Centrée Utilisateur (UCD) et Évaluation**

La connaissance des principes cognitifs et des heuristiques de conception est nécessaire mais pas suffisante pour garantir la création d\'un produit réussi. Il faut une méthodologie structurée pour appliquer ces connaissances de manière systématique et, surtout, pour valider les décisions de conception auprès des véritables utilisateurs. Cette méthodologie est la Conception Centrée Utilisateur (UCD, pour *User-Centered Design*). Elle représente le passage d\'une conception basée sur l\'intuition du concepteur à une conception basée sur des données empiriques provenant des utilisateurs.

### **49.3.1 Le Processus de Conception Centrée Utilisateur (UCD)**

#### **Philosophie et Principes**

La Conception Centrée Utilisateur est avant tout une **philosophie de conception** qui place les besoins, les objectifs et les limites des utilisateurs finaux au centre de chaque étape du processus de développement. Son postulat fondamental est que les personnes les mieux placées pour guider la conception d\'un produit sont celles qui l\'utiliseront au final. L\'objectif est de créer des produits qui ne sont pas seulement techniquement réalisables et commercialement viables, mais qui sont surtout désirables et utilisables du point de vue de l\'utilisateur, ce qui conduit à une meilleure adoption, une plus grande satisfaction et une fidélité accrue.

La norme internationale ISO 9241-210 (qui remplace l\'ancienne ISO 13407) formalise les principes de la conception centrée sur l\'opérateur humain. Ces principes incluent :

> Une conception basée sur une compréhension explicite des utilisateurs, de leurs tâches et de leurs environnements.
>
> La participation active des utilisateurs tout au long du processus de conception et de développement.
>
> Une conception pilotée et affinée par des évaluations centrées sur l\'utilisateur.
>
> Un processus itératif où les solutions sont progressivement améliorées.
>
> Une conception qui prend en compte l\'ensemble de l\'expérience utilisateur.
>
> Une équipe de conception multidisciplinaire, intégrant des compétences en design, en psychologie, en ingénierie et en gestion de produit.

#### **Le Cycle Itératif de l\'UCD**

L\'UCD n\'est pas un processus linéaire avec un début et une fin définis, mais un **cycle itératif**. Chaque cycle est une boucle qui permet d\'affiner progressivement la solution de conception en se basant sur les retours d\'information. Ce processus de raffinement continu est fondamental, car il reconnaît qu\'il est presque impossible de concevoir la solution parfaite du premier coup. L\'itération permet de construire, de tester, d\'apprendre et d\'améliorer de manière cyclique.

Le cycle UCD, tel que défini par la norme ISO, se compose de quatre phases interdépendantes qui se répètent tout au long du projet :

1\. Comprendre et spécifier le contexte d\'utilisation

Cette première phase est une phase de recherche et d\'analyse. L\'objectif est de répondre à des questions fondamentales sur les utilisateurs et leur monde.52

> **Qui sont les utilisateurs?** On cherche à comprendre leurs caractéristiques démographiques, leurs compétences, leur expérience, leurs limitations et leurs motivations. Des outils comme les **personas** (représentations archétypales et semi-fictives des utilisateurs cibles) sont créés à cette étape pour donner un visage humain à la cible.
>
> **Quelles sont leurs tâches et leurs objectifs?** On analyse les buts que les utilisateurs cherchent à atteindre et les étapes concrètes (tâches) qu\'ils réalisent pour y parvenir.
>
> **Dans quel environnement opèrent-ils?** On étudie le contexte physique (bureau, mobilité), social (travail en équipe, pression sociale) et technique (appareils utilisés, connectivité) dans lequel l\'interaction aura lieu.\
> \
> Les méthodes utilisées à cette étape incluent les entretiens avec les utilisateurs, les sondages, l\'observation sur le terrain et l\'analyse de données existantes.51

2\. Spécifier les exigences de l\'utilisateur et de l\'organisation

Les informations collectées lors de la première phase sont ensuite traduites en exigences claires et mesurables.52 Ces exigences définissent ce que le système doit faire pour répondre aux besoins des utilisateurs tout en étant aligné avec les objectifs de l\'organisation (par exemple, augmenter les revenus, réduire les coûts de support).56

> **Exigences utilisateur :** Elles décrivent les besoins et les objectifs de l\'utilisateur (par exemple, \"L\'utilisateur doit pouvoir comparer deux produits côte à côte\").
>
> **Exigences fonctionnelles :** Elles découlent des exigences utilisateur et spécifient les fonctionnalités concrètes du système (par exemple, \"Le système doit fournir un bouton \'Comparer\' sur les pages produits\").
>
> **Exigences d\'utilisabilité :** Elles définissent des objectifs de performance mesurables (par exemple, \"Un nouvel utilisateur doit pouvoir finaliser un achat en moins de 3 minutes avec un taux de succès de 95%\").

3\. Produire des solutions de conception

C\'est la phase de création où les idées prennent forme. L\'équipe de conception génère des solutions pour répondre aux exigences définies.56 Ces solutions sont matérialisées à travers une série d\'artefacts de fidélité croissante :

> **Croquis et wireframes basse-fidélité :** Des dessins simples, souvent sur papier, qui se concentrent sur la structure, la mise en page et le flux d\'interaction, sans se soucier des détails visuels.
>
> **Maquettes (Mockups) moyenne-fidélité :** Des représentations visuelles plus détaillées de l\'interface, incluant les couleurs, la typographie et les icônes, mais généralement statiques.
>
> **Prototypes haute-fidélité :** Des versions interactives de l\'interface qui simulent de près le produit final. Ils permettent de tester non seulement l\'apparence mais aussi le comportement de l\'interface.

4\. Évaluer la conception

Cette phase est le moteur de l\'itération. Les solutions de conception produites sont testées par rapport aux exigences définies, en impliquant les utilisateurs.51 L\'objectif est d\'identifier ce qui fonctionne bien et, plus important encore, ce qui pose problème (points de friction, erreurs, incompréhensions).59 Les résultats de cette évaluation --- qu\'ils soient qualitatifs ou quantitatifs --- alimentent directement la phase suivante du cycle. Les problèmes identifiés mènent à une nouvelle phase de compréhension, de redéfinition des exigences ou de production de nouvelles solutions de conception. Le cycle se répète jusqu\'à ce que les objectifs d\'utilisabilité soient atteints et que la conception soit jugée satisfaisante.

Ce processus itératif est une forme de **réduction du risque**. Plutôt que de parier sur une conception unique développée en vase clos pendant des mois, l\'UCD valide les hypothèses à chaque étape. La recherche utilisateur réduit le risque de construire un produit dont personne n\'a besoin. Le prototypage réduit le risque de s\'engager dans un développement coûteux sur la base d\'une mauvaise idée. L\'évaluation continue réduit le risque de lancer un produit inutilisable. Ainsi, l\'UCD n\'est pas une dépense supplémentaire, mais un investissement stratégique qui augmente considérablement les chances de succès d\'un produit en assurant son adéquation avec les besoins du marché.

### **49.3.2 Méthodes d\'Évaluation de l\'Utilisabilité**

L\'évaluation est au cœur du processus UCD. Il existe une panoplie de méthodes pour évaluer l\'utilisabilité d\'une interface, chacune avec ses forces, ses faiblesses et son contexte d\'application idéal. On peut les classer en deux grandes familles : les méthodes d\'inspection, qui reposent sur l\'expertise de spécialistes sans impliquer directement les utilisateurs finaux, et les méthodes empiriques, qui consistent à observer des utilisateurs réels en interaction avec le système.

#### **Méthodes d\'Inspection (par des experts)**

Ces méthodes sont souvent qualifiées de \"discount usability\" car elles sont généralement plus rapides et moins coûteuses à mettre en œuvre que les tests avec des utilisateurs.

Évaluation Heuristique

L\'évaluation heuristique est l\'une des méthodes d\'inspection les plus populaires. Elle consiste à faire inspecter une interface par un petit groupe d\'évaluateurs experts (typiquement 3 à 5).39 Chaque expert examine l\'interface de manière indépendante et juge sa conformité par rapport à un ensemble de principes d\'utilisabilité reconnus, appelés

**heuristiques** (le plus souvent, les 10 heuristiques de Jakob Nielsen décrites dans la section précédente).

> **Processus :** Les évaluateurs parcourent l\'interface et notent chaque problème d\'utilisabilité qu\'ils rencontrent, en spécifiant quelle(s) heuristique(s) est (sont) violée(s). Ils attribuent également un score de sévérité à chaque problème (par exemple, de cosmétique à catastrophique) pour aider à prioriser les corrections.
>
> **Avantages :** C\'est une méthode rapide, peu coûteuse et facile à organiser. Elle peut être appliquée très tôt dans le processus de conception, même sur des maquettes statiques, et permet de détecter un grand nombre de problèmes évidents.
>
> **Limites :** La qualité des résultats dépend fortement de l\'expertise des évaluateurs. Il y a un risque de \"faux positifs\" (signaler des problèmes qui n\'en sont pas réellement pour les utilisateurs) et de manquer des problèmes spécifiques au contexte d\'usage des utilisateurs réels. La méthode reste subjective et ne remplace pas l\'observation directe des utilisateurs.

Inspection Cognitive (Cognitive Walkthrough)

L\'inspection cognitive est une méthode d\'inspection plus structurée, spécifiquement conçue pour évaluer la facilité d\'apprentissage d\'une interface, en particulier pour les nouveaux utilisateurs.62 L\'évaluateur se met dans la peau d\'un utilisateur novice qui tente d\'accomplir une tâche spécifique pour la première fois.

> **Processus :** Pour chaque étape de la tâche, l\'évaluateur essaie de raconter une \"histoire crédible\" de l\'interaction en répondant à quatre questions fondamentales :

**L\'utilisateur essaiera-t-il d\'atteindre le bon objectif?** (L\'utilisateur sait-il ce qu\'il doit faire à cette étape?)

**L\'utilisateur remarquera-t-il que l\'action correcte est disponible?** (Le contrôle nécessaire est-il visible et identifiable?)

**L\'utilisateur associera-t-il l\'action correcte à l\'objectif qu\'il poursuit?** (L\'étiquette ou l\'icône du contrôle est-elle compréhensible?)

**Si l\'action correcte est effectuée, l\'utilisateur verra-t-il que des progrès sont réalisés vers son objectif?** (Le feedback du système est-il clair et encourageant?).\
\
Si l\'évaluateur ne peut pas répondre \"oui\" de manière convaincante à l\'une de ces questions, il identifie un problème d\'utilisabilité potentiel.

> **Avantages :** Très efficace pour identifier les obstacles à l\'apprentissage et les ruptures dans le flux d\'une tâche. Elle fournit des diagnostics très précis sur les causes des problèmes.
>
> **Limites :** Elle est laborieuse et peut prendre beaucoup de temps pour des tâches complexes. Elle se concentre sur le parcours d\'un nouvel utilisateur et peut manquer des problèmes liés à une utilisation à long terme ou à l\'efficacité.

#### **Méthodes Empiriques (avec des utilisateurs)**

Ces méthodes sont considérées comme fournissant les données les plus fiables car elles proviennent de l\'observation directe du public cible.

Tests d\'Utilisabilité

Le test d\'utilisabilité est la méthode d\'évaluation la plus fondamentale et la plus efficace en IHM.67 Il consiste à observer des utilisateurs représentatifs de la population cible pendant qu\'ils tentent de réaliser des tâches réalistes à l\'aide du produit ou d\'un prototype.59 L\'objectif n\'est pas de tester l\'utilisateur, mais de

**tester le produit** pour voir où il échoue à répondre à ses besoins.

> **Protocole :** La préparation est essentielle. Elle inclut la définition d\'objectifs clairs pour le test, le recrutement de participants correspondant aux personas (souvent, 5 utilisateurs suffisent pour identifier environ 85% des problèmes d\'utilisabilité), la rédaction d\'un scénario de test avec des tâches concrètes et la préparation d\'une grille d\'observation pour recueillir les données.
>
> **Déroulement :** Les tests peuvent être **modérés**, avec un facilitateur qui guide la session, pose des questions et s\'assure que l\'utilisateur est à l\'aise, ou **non modérés**, où l\'utilisateur suit des instructions via un logiciel. Ils peuvent avoir lieu en laboratoire (environnement contrôlé) ou à distance (dans le contexte naturel de l\'utilisateur). Une technique courante est le protocole du \"penser à voix haute\" (\
> *think-aloud*), où l\'on demande à l\'utilisateur de verbaliser ses pensées, ses attentes et ses frustrations pendant qu\'il interagit avec l\'interface.
>
> **Analyse :** Les données recueillies sont à la fois **quantitatives** (taux de succès des tâches, temps de complétion, nombre d\'erreurs) et **qualitatives** (observations des comportements, citations des utilisateurs, réponses aux questionnaires de satisfaction comme le SUS - *System Usability Scale*). L\'analyse de ces données permet d\'identifier les problèmes d\'utilisabilité, de comprendre leurs causes profondes, de les prioriser en fonction de leur impact et de formuler des recommandations de conception concrètes.

Ces méthodes d\'évaluation ne sont pas mutuellement exclusives ; au contraire, elles sont plus puissantes lorsqu\'elles sont combinées de manière stratégique. Un processus d\'évaluation mature peut commencer par une évaluation heuristique en début de projet pour un \"nettoyage\" rapide et peu coûteux des défauts les plus évidents. Ensuite, une inspection cognitive peut être utilisée pour affiner le parcours d\'apprentissage sur un premier prototype. Enfin, des tests d\'utilisabilité sur un prototype plus avancé permettent de valider la conception et de découvrir des problèmes plus subtils et contextuels que seuls de vrais utilisateurs peuvent révéler. Cette approche en couches assure que les tests utilisateurs, plus coûteux, sont utilisés de manière plus efficace, en se concentrant sur les problèmes complexes plutôt que sur des erreurs de conception évidentes que les experts auraient pu corriger en amont.

#### **Tableau Comparatif des Méthodes d\'Évaluation**

Le tableau suivant synthétise et compare les trois principales méthodes d\'évaluation discutées, offrant un guide pour choisir l\'approche la plus appropriée en fonction des objectifs et des contraintes d\'un projet.

  ---------------------------- ------------ ---------------------- ------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------
  Méthode d\'Évaluation        Type         Participants           Phase du Projet                             Avantages                                                                                                                        Inconvénients

  **Test d\'utilisabilité**    Empirique    Utilisateurs finaux    Conception, Développement, Post-lancement   Données réelles et objectives , identifie problèmes concrets et inattendus, mesure la satisfaction.                      Coûteux en temps et en argent, logistique de recrutement complexe.

  **Évaluation Heuristique**   Inspection   Experts en ergonomie   Toutes phases, surtout en début             Rapide, peu coûteux, ne nécessite pas d\'utilisateurs, identifie les problèmes évidents.                                     Subjectif, dépend de l\'expertise de l\'évaluateur, risque de faux positifs, ne reflète pas l\'expérience utilisateur réelle.

  **Inspection Cognitive**     Inspection   Experts en ergonomie   Conception, Prototypage                     Efficace pour évaluer la facilité d\'apprentissage pour les novices , identifie les ruptures dans le parcours utilisateur.   Ne mesure pas la performance, centré sur une vision \"pas à pas\" qui peut manquer des problèmes globaux.
  ---------------------------- ------------ ---------------------- ------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------------------------------

## **49.4 Accessibilité et Conception Inclusive**

Une technologie véritablement centrée sur l\'humain doit être utilisable par tous, indépendamment des capacités physiques, sensorielles ou cognitives de chacun. L\'accessibilité et la conception inclusive sont des domaines de l\'IHM qui visent à garantir que les produits et services numériques n\'excluent personne. Loin d\'être une simple considération technique ou une obligation légale, cette approche est une question d\'équité, d\'éthique et, de plus en plus, un avantage commercial stratégique.

### **49.4.1 Définitions et Philosophie**

Bien que souvent utilisés de manière interchangeable, les termes \"accessibilité\" et \"conception inclusive\" représentent deux concepts liés mais distincts, reflétant une évolution dans la manière de penser la conception pour la diversité humaine.

#### **Accessibilité**

L\'accessibilité, dans son sens le plus strict, se réfère à la **conception de produits, d\'appareils, de services ou d\'environnements pour les personnes en situation de handicap**. L\'objectif est d\'éliminer les barrières qui empêcheraient une personne ayant une déficience visuelle, auditive, motrice ou cognitive d\'accéder à l\'information et aux fonctionnalités sur un pied d\'égalité avec les autres. Au Canada, environ 22% de la population âgée de 15 ans et plus vit avec au moins un handicap, soulignant l\'importance cruciale de cette démarche. L\'accessibilité est souvent une approche réactive ou adaptative, qui cherche à fournir des \"accommodements\" pour que les systèmes existants puissent être utilisés par des groupes spécifiques.

#### **Conception Inclusive (ou Conception Universelle)**

La conception inclusive, également connue sous le nom de conception universelle, est une **philosophie de conception plus large et proactive**. Son but n\'est pas de concevoir pour un groupe spécifique, mais de créer des produits et des environnements qui sont

**utilisables par le plus grand nombre de personnes possible, dès le départ**, sans nécessiter d\'adaptation ou de conception spécialisée. Elle reconnaît la diversité humaine comme une norme et non comme une exception.

L\'analogie la plus célèbre est celle de la **rampe d\'accès** (ou *curb cut*). Conçue à l\'origine pour permettre aux personnes en fauteuil roulant de franchir les trottoirs (une mesure d\'accessibilité), elle s\'est avérée bénéfique pour un éventail beaucoup plus large d\'utilisateurs : les parents avec des poussettes, les livreurs avec des chariots, les voyageurs avec des valises à roulettes, et même les cyclistes. C\'est l\'essence de la conception inclusive : une solution conçue pour un cas d\'usage \"extrême\" améliore l\'expérience pour tous.

La distinction clé réside donc dans l\'approche : l\'accessibilité se concentre sur la résolution des problèmes d\'un groupe d\'utilisateurs identifié, tandis que la conception inclusive intègre la diversité des besoins humains comme une contrainte de conception fondamentale dès le début du processus. L\'accessibilité est un résultat, la conception inclusive est le processus qui permet d\'y parvenir de la manière la plus élégante et la plus universelle possible.

### **49.4.2 Standards et Lignes Directrices : Les WCAG**

Pour rendre l\'objectif de l\'accessibilité web concret et mesurable, le World Wide Web Consortium (W3C) a développé un ensemble de lignes directrices qui font office de standard international : les **Web Content Accessibility Guidelines (WCAG)**. Ces directives fournissent un cadre détaillé pour les concepteurs et les développeurs afin de créer du contenu web accessible.

La structure des WCAG est hiérarchique, ce qui permet de les aborder à différents niveaux de détail  :

> **Principes :** Quatre principes fondamentaux qui forment la base de l\'accessibilité.
>
> **Lignes directrices (Guidelines) :** Treize lignes directrices qui fournissent les objectifs de base à atteindre sous chaque principe. Elles ne sont pas directement testables.
>
> **Critères de succès :** Pour chaque ligne directrice, il existe des critères de succès testables. Chaque critère est associé à un niveau de conformité : A (le plus bas), AA (le niveau cible pour la plupart des législations) et AAA (le plus élevé).
>
> **Techniques :** Des suggestions concrètes (suffisantes ou consultatives) pour satisfaire aux critères de succès.

#### **Les Quatre Principes Fondamentaux (POUR)**

Les WCAG sont organisés autour de quatre principes qui stipulent que pour être accessible, le contenu doit être **P**erceptible, **U**tilisable (*Operable*), **C**ompréhensible (*Understandable*) et **R**obuste (l\'acronyme anglais est POUR).

**1. Perceptible**

> **Principe :** L\'information et les composants de l\'interface utilisateur doivent être présentés aux utilisateurs de manière qu\'ils puissent les percevoir. Cela signifie que le contenu ne peut pas être invisible à tous leurs sens.
>
> **Exemples de critères de succès :**

**Texte alternatif (1.1.1) :** Fournir une description textuelle pour tout contenu non textuel (comme les images) afin que les lecteurs d\'écran puissent la lire à voix haute pour les utilisateurs aveugles.

**Alternatives pour les médias temporels (1.2) :** Proposer des sous-titres pour les vidéos afin de les rendre accessibles aux personnes sourdes ou malentendantes, et des audiodescriptions pour décrire les informations visuelles importantes aux personnes aveugles.

**Contraste (minimum) (1.4.3) :** Assurer un rapport de contraste suffisant entre le texte et son arrière-plan pour garantir la lisibilité pour les personnes malvoyantes.

**2. Utilisable (Operable)**

> **Principe :** Les composants de l\'interface utilisateur et la navigation doivent être utilisables. L\'interface ne peut pas exiger une interaction qu\'un utilisateur ne peut pas effectuer.
>
> **Exemples de critères de succès :**

**Accessible au clavier (2.1.1) :** Toutes les fonctionnalités du site doivent être accessibles en utilisant uniquement un clavier, sans nécessiter de souris. C\'est essentiel pour les utilisateurs ayant des handicaps moteurs.

**Assez de temps (2.2.1) :** Donner aux utilisateurs suffisamment de temps pour lire et utiliser le contenu. Si une session a une limite de temps, l\'utilisateur doit pouvoir la prolonger.

**Crises et réactions physiques (2.3.1) :** Ne pas concevoir de contenu qui clignote plus de trois fois par seconde, car cela peut déclencher des crises d\'épilepsie photosensible.

**Titres et étiquettes (2.4.6) :** Utiliser des titres et des étiquettes clairs et descriptifs pour aider les utilisateurs à comprendre le contenu et à naviguer.

**3. Compréhensible (Understandable)**

> **Principe :** L\'information et le fonctionnement de l\'interface utilisateur doivent être compréhensibles.
>
> **Exemples de critères de succès :**

**Lisible (3.1.1) :** La langue principale de chaque page doit être identifiable par la machine pour que les lecteurs d\'écran puissent utiliser la bonne prononciation.

**Prévisible (3.2.1) :** Les pages web doivent apparaître et fonctionner de manière prévisible. Par exemple, changer le réglage d\'un composant ne doit pas changer le contexte de la page de manière inattendue.

**Assistance à la saisie (3.3.1) :** Aider les utilisateurs à éviter et à corriger les erreurs. Si une erreur de saisie est détectée, elle doit être clairement identifiée et décrite à l\'utilisateur.

**4. Robuste**

> **Principe :** Le contenu doit être suffisamment robuste pour pouvoir être interprété de manière fiable par une grande variété d\'agents utilisateurs, y compris les technologies d\'assistance.
>
> **Exemples de critères de succès :**

**Analyse syntaxique (4.1.1) :** S\'assurer que le code (par exemple, HTML) est bien formé, avec des balises de début et de fin complètes et des éléments correctement imbriqués, afin d\'éviter que les technologies d\'assistance ne l\'interprètent mal.

**Nom, rôle, valeur (4.1.2) :** Pour tous les composants de l\'interface utilisateur, leur nom et leur rôle doivent pouvoir être déterminés par la machine, et les états et propriétés qui changent doivent pouvoir être notifiés aux technologies d\'assistance.

Adopter ces principes n\'est pas simplement une contrainte technique ou une case à cocher pour la conformité légale. C\'est une démarche qui pousse les concepteurs à créer des solutions plus claires, plus flexibles et plus résilientes. En résolvant les problèmes pour les utilisateurs ayant des besoins spécifiques, on découvre souvent des solutions qui améliorent l\'expérience pour l\'ensemble des utilisateurs. Le sous-titrage, initialement conçu pour les personnes sourdes, est maintenant massivement utilisé par tous dans les transports en commun. Les exigences de contraste élevé, vitales pour les malvoyants, améliorent la lisibilité pour quiconque utilise son téléphone en plein soleil. La navigation claire et prévisible, essentielle pour les utilisateurs de lecteurs d\'écran, bénéficie à toute personne pressée ou distraite. L\'accessibilité n\'est donc pas un jeu à somme nulle ; c\'est un puissant catalyseur d\'innovation et une pierre angulaire d\'une expérience utilisateur véritablement universelle.

## **49.5 Réalité Virtuelle (VR), Réalité Augmentée (AR) et Réalité Mixte (MR)**

Alors que les sections précédentes se sont concentrées sur les paradigmes d\'interaction largement établis des interfaces graphiques 2D (écrans d\'ordinateur, téléphones intelligents), cette dernière section explore les frontières de l\'IHM. Les technologies immersives, collectivement appelées Réalité Étendue (XR), remettent en question les conventions d\'interaction que nous tenons pour acquises. En plongeant l\'utilisateur dans des environnements 3D ou en fusionnant le monde numérique et le monde physique, la XR ouvre des possibilités extraordinaires mais présente également des défis d\'interaction et de conception entièrement nouveaux.

### **49.5.1 Définitions et le Continuum Virtuel-Réel**

Pour naviguer dans le paysage de la XR, il est essentiel de comprendre les distinctions entre ses principales composantes. Le concept du **continuum réalité-virtualité**, proposé par Paul Milgram, offre un cadre utile pour classer ces technologies. Ce continuum est un axe qui s\'étend d\'un environnement entièrement réel à une extrémité, à un environnement entièrement virtuel à l\'autre.

> **Réalité Virtuelle (VR) :** Située à l\'extrémité virtuelle du continuum, la VR vise à **immerger totalement** l\'utilisateur dans un environnement entièrement généré par ordinateur, le coupant de ses perceptions du monde réel. À l\'aide d\'un casque qui bloque la vision et l\'ouïe du monde extérieur, la VR cherche à tromper les sens pour créer un sentiment de\
> **présence**, c\'est-à-dire l\'illusion d\'être réellement \"là\", dans l\'espace virtuel. Les applications vont des jeux vidéo et du divertissement à des simulations de formation complexes (chirurgie, pilotage) et à la visualisation de données.
>
> **Réalité Augmentée (AR) :** L\'AR se situe plus près de l\'extrémité réelle du continuum. Elle ne remplace pas la vision du monde réel, mais la **superpose** avec des informations ou des objets virtuels. L\'utilisateur reste ancré dans son environnement physique, qui est \"augmenté\" par une couche de données numériques. Les applications les plus courantes se font via les écrans de téléphones intelligents (par exemple, les filtres Snapchat ou le jeu Pokémon GO) ou des lunettes transparentes. L\'AR est utilisée pour la navigation, la maintenance industrielle, la visualisation de produits dans son propre salon ou l\'affichage d\'informations contextuelles.
>
> **Réalité Mixte (MR) :** La MR est une forme plus avancée de l\'AR, qui se situe entre l\'AR et la VR sur le continuum. La distinction clé est que dans la MR, les objets virtuels ne sont pas simplement superposés au monde réel ; ils sont\
> **conscients de l\'environnement physique et peuvent interagir avec lui en temps réel**. Par exemple, une balle virtuelle pourrait rebondir sur une table réelle ou un personnage virtuel pourrait s\'asseoir sur un canapé réel. La MR nécessite une compréhension 3D sophistiquée de l\'environnement, ce qui permet une fusion beaucoup plus convaincante et interactive des mondes réel et virtuel.
>
> **Réalité Étendue (XR) :** C\'est un terme générique qui englobe l\'ensemble du continuum, de la VR à l\'AR en passant par la MR. Il est utilisé pour parler de ces technologies immersives de manière collective.

### **49.5.2 Défis d\'Interaction Spécifiques aux Technologies Immersives**

La transition d\'un écran 2D à un espace 3D immersif brise de nombreux paradigmes d\'interaction. Les actions simples comme \"cliquer\" ou \"faire défiler\" doivent être entièrement repensées. Cela crée un ensemble de défis uniques en matière d\'IHM.

#### **Navigation 3D (Locomotion)**

Le défi de la locomotion est l\'un des plus fondamentaux en VR : comment permettre à un utilisateur de se déplacer dans un vaste monde virtuel alors que son corps est confiné à un petit espace physique? 

> **Problématiques :** Une mauvaise conception de la locomotion peut entraîner une désorientation spatiale, une difficulté à atteindre précisément une destination, et surtout, la **cybercinétose** (voir ci-dessous).
>
> **Techniques courantes :**

**Déplacement à l\'échelle de la pièce (*Room-scale*) :** L\'utilisateur se déplace physiquement dans une zone de jeu définie. C\'est la méthode la plus naturelle et la moins susceptible de provoquer la cybercinétose, mais elle est limitée par la taille de l\'espace physique.

**Téléportation :** L\'utilisateur pointe un contrôleur vers une destination et s\'y \"téléporte\" instantanément. Cette méthode élimine le conflit sensoriel du mouvement et réduit considérablement la cybercinétose, mais elle peut briser le sentiment d\'immersion et la continuité spatiale.

**Déplacement continu (*Artificial locomotion*) :** L\'utilisateur se déplace à l\'aide du joystick d\'un contrôleur, de manière similaire à un jeu vidéo traditionnel. Cette méthode offre une grande liberté de mouvement et préserve la continuité spatiale, mais c\'est aussi celle qui est la plus susceptible de provoquer une cybercinétose intense.

#### **Manipulation d\'Objets Virtuels**

Comment saisir, déplacer, faire pivoter et redimensionner des objets dans un espace 3D sans la précision d\'une souris et d\'un clavier?

> **Problématiques :** La sélection d\'objets distants, la manipulation fine, et la gestion de l\'occlusion (lorsqu\'un objet en cache un autre) sont des défis complexes.
>
> **Techniques courantes :**

**Ray-casting :** L\'utilisateur émet un \"rayon\" virtuel depuis son contrôleur pour pointer et sélectionner des objets à distance.

**Manipulation directe :** L\'utilisateur \"saisit\" les objets virtuels avec ses contrôleurs suivis, permettant une interaction plus naturelle et directe, comme s\'il utilisait ses propres mains.

**Interfaces gestuelles :** Avec le suivi des mains (*hand tracking*), les utilisateurs peuvent manipuler des objets directement avec leurs doigts, sans contrôleurs, bien que cette méthode soit souvent moins précise.

#### **Cybercinétose (Motion Sickness)**

La cybercinétose, ou mal de la réalité virtuelle, est l\'un des plus grands obstacles à l\'adoption généralisée de la VR. Il s\'agit d\'un ensemble de symptômes désagréables qui peuvent survenir lors d\'une immersion virtuelle.

> **Symptômes :** Nausées, vertiges, maux de tête, sueurs froides, pâleur et désorientation. Ces symptômes peuvent persister plusieurs heures après la fin de l\'exposition.
>
> **Causes :** La cause principale est un **conflit sensoriel** entre le système visuel et le système vestibulaire (situé dans l\'oreille interne, il est responsable de notre sens de l\'équilibre et du mouvement). En VR, lorsque l\'utilisateur se déplace virtuellement (par exemple, avec un joystick), ses yeux perçoivent un mouvement que son corps et son oreille interne ne ressentent pas. Le cerveau reçoit des signaux contradictoires, une situation qu\'il peut interpréter comme une neurotoxine (similaire à une intoxication), déclenchant la nausée comme mécanisme de défense. Un autre facteur technique majeur est la\
> **latence** : tout décalage, même de quelques millisecondes, entre les mouvements de la tête de l\'utilisateur et la mise à jour de l\'image affichée dans le casque peut provoquer ou aggraver la cybercinétose.
>
> **Solutions de conception et d\'ingénierie :**

**Matérielles :** Assurer un taux de rafraîchissement de l\'affichage très élevé (90 Hz ou plus) et une latence \"mouvement-à-photon\" la plus faible possible.

**Logicielles (Locomotion) :** Privilégier les méthodes de déplacement qui minimisent le conflit sensoriel, comme la téléportation. Pour le déplacement continu, éviter les accélérations et décélérations brusques.

**Logicielles (Visuelles) :** Des techniques comme le **vignettage dynamique** (réduire le champ de vision périphérique pendant le mouvement) peuvent réduire l\'intensité du flux optique et atténuer les symptômes. Fournir un point de référence stable dans l\'environnement virtuel (comme un cockpit ou un tableau de bord) peut également aider.

**Utilisateur :** Il est crucial de limiter la durée des premières sessions pour permettre une accoutumance progressive. Faire des pauses régulières est également recommandé.

Le développement de la XR force la discipline de l\'IHM à un retour aux sources. Alors que les interfaces graphiques 2D se sont construites sur des couches successives de conventions et de métaphores (le \"bureau\", les \"fenêtres\", les \"fichiers\"), la XR n\'a pas encore de langage d\'interaction universellement accepté. Pour en créer un, les concepteurs doivent puiser non plus dans des métaphores abstraites, mais dans les fondements de la perception spatiale humaine, de la proprioception et du fonctionnement du système vestibulaire. La cybercinétose n\'est pas un simple \"bug\" d\'interface ; c\'est la manifestation d\'un conflit physiologique profond. Sa résolution dépend d\'une compréhension fine de la manière dont le cerveau intègre les signaux sensoriels. La conception de la navigation 3D ne peut se contenter de transposer les commandes 2D ; elle doit s\'inspirer de la façon dont les humains s\'orientent dans le monde physique. Ainsi, après s\'être éloignée du monde physique avec les interfaces graphiques, l\'IHM est maintenant contrainte de s\'y reconnecter à un niveau beaucoup plus fondamental.

Enfin, les défis de la XR ne sont pas seulement techniques, mais aussi sociaux et éthiques. L\'immersion totale et la fusion du réel et du virtuel soulèvent des questions qui dépassent le cadre de la simple utilisabilité. La puissance de la VR pour la formation est immense, mais elle porte aussi le risque d\'expériences traumatisantes si elle n\'est pas conçue de manière responsable. L\'AR, en superposant des informations sur notre réalité , soulève des questions de vie privée, de surcharge d\'information et d\'équité. La prochaine frontière de l\'IHM ne consistera pas seulement à résoudre les problèmes d\'interaction en 3D, mais aussi à établir les cadres éthiques pour concevoir ces expériences puissantes de manière à augmenter l\'humanité, et non à la diminuer.

