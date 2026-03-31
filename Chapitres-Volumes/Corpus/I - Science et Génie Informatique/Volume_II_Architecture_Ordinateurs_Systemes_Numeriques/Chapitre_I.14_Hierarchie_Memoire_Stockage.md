# Chapitre I.14 : Hiérarchie Mémoire et Stockage

## 14.1 Principes de Localité (Temporelle et Spatiale)

### Introduction : La Solution au « Mur de la Mémoire »

L\'architecture des ordinateurs modernes, telle que nous la connaissons, est le fruit d\'une longue évolution marquée par une course incessante à la performance. Au cœur de cette quête se trouve une tension fondamentale, un déséquilibre structurel entre la vitesse fulgurante des unités de traitement et la lenteur relative de l\'accès à la mémoire principale. Ce goulet d\'étranglement, baptisé le « mur de la mémoire » (*Memory Wall*), représente l\'un des défis les plus persistants et les plus critiques en génie informatique.

Le problème est de nature quantitative et historique. Depuis les années 1980, les performances des microprocesseurs, mesurées en termes de nombre d\'instructions exécutées par seconde, ont connu une croissance exponentielle, doublant environ tous les 18 à 24 mois, une tendance immortalisée par la loi de Moore. Pendant des décennies, cette progression a été de l\'ordre de 60 % par an. En revanche, la technologie de la mémoire vive dynamique (DRAM), qui constitue la mémoire principale de la quasi-totalité des systèmes informatiques, a évolué à un rythme beaucoup plus modeste. La latence d\'accès à la DRAM, c\'est-à-dire le temps écoulé entre une requête de donnée et sa réception, ne s\'est améliorée que d\'environ 7 % par an sur la même période. Bien que la bande passante (le débit de données) de la DRAM ait connu des améliorations plus significatives, la latence demeure le facteur limitant pour de nombreuses applications. Cet écart de performance, qui se creuse inexorablement d\'année en année, signifie que le processeur passe une part de plus en plus importante de son temps à attendre des données, les bras croisés, incapable d\'exploiter sa pleine puissance de calcul. Ce temps d\'attente, ces cycles d\'horloge perdus, constitue le mur de la mémoire.

Face à ce défi, les architectes de systèmes ne pouvaient rester passifs. Si la technologie fondamentale de la mémoire principale ne pouvait suivre le rythme, il fallait concevoir une solution architecturale pour contourner le problème. Cette solution est la **hiérarchie mémoire**. L\'idée, aussi élégante que puissante, est de ne pas considérer la mémoire comme une entité monolithique, mais comme une pyramide de plusieurs niveaux, chacun caractérisé par un compromis différent entre vitesse, capacité et coût.

Au sommet de cette pyramide, au plus près du processeur, se trouvent les **registres**. Intégrés directement dans l\'unité de calcul, ils sont en nombre très limité (quelques dizaines), mais leur temps d\'accès est quasi instantané, de l\'ordre d\'un cycle d\'horloge. Juste en dessous, on trouve un ou plusieurs niveaux de **mémoire cache**, construits à l\'aide de la technologie SRAM (Static RAM). Ces caches sont plus petits, plus rapides et significativement plus coûteux par octet que la mémoire principale. Le cache de premier niveau (L1) est le plus petit et le plus rapide, suivi par un cache de deuxième niveau (L2) plus grand et légèrement plus lent, et souvent un cache de troisième niveau (L3), encore plus volumineux et partagé entre les différents cœurs du processeur. La base de la pyramide est constituée par la

**mémoire principale** (DRAM), de grande capacité mais relativement lente. Enfin, au-delà de la mémoire volatile, la hiérarchie s\'étend aux **systèmes de stockage de masse** (disques SSD, disques durs HDD), qui offrent des capacités gigantesques à un coût par octet très faible, mais avec des temps d\'accès plusieurs ordres de grandeur plus lents.

L\'objectif de cette organisation hiérarchique est de créer l\'illusion d\'une mémoire qui est à la fois aussi vaste que le niveau le plus bas (stockage de masse), aussi rapide que le niveau le plus haut (registres et cache L1), et dont le coût par octet est proche de celui du niveau le plus économique (DRAM ou HDD). Cette illusion, presque magique, ne peut fonctionner que si la grande majorité des accès mémoire du processeur sont servis par les niveaux les plus rapides de la hiérarchie. Mais comment garantir que les données dont le processeur a besoin se trouvent, comme par hasard, dans le cache au moment précis où il les demande?

La réponse réside dans une propriété empirique fondamentale du comportement des programmes informatiques : le **principe de localité**. Ce principe, qui se décline en deux facettes complémentaires, la localité temporelle et la localité spatiale, est la pierre angulaire sur laquelle repose toute l\'efficacité de la hiérarchie mémoire. Il postule que les accès mémoire d\'un programme ne sont pas aléatoires, mais au contraire hautement prévisibles et structurés. Sans cette propriété comportementale, les caches seraient statistiquement inefficaces, et le mur de la mémoire resterait un obstacle infranchissable. C\'est l\'exploitation systématique de cette localité à chaque niveau de la hiérarchie qui permet de masquer la latence de la mémoire principale et de libérer la puissance des processeurs modernes.

### 14.1.1 La Localité Temporelle : La Réutilisation dans le Temps

La première facette du principe de localité est la **localité temporelle**. Sa définition formelle est la suivante : si un emplacement mémoire est accédé à un instant t, il existe une très forte probabilité que ce même emplacement mémoire soit à nouveau accédé dans un futur très proche, à un instant t+Δt où Δt est petit. En d\'autres termes, les données et les instructions récemment utilisées sont susceptibles d\'être réutilisées sous peu.

Cette tendance n\'est pas le fruit du hasard, mais une conséquence directe de la manière dont les programmes sont structurés. L\'un des exemples les plus manifestes de localité temporelle se trouve dans les boucles, qui constituent l\'une des structures de contrôle les plus fondamentales en programmation.

Considérons l\'exemple de code C suivant, qui calcule la somme des éléments d\'un tableau :

> C

int sum = 0;\
for (int i = 0; i \< 1000; i++) {\
sum = sum + array\[i\];\
}

Analysons les accès mémoire générés par ce fragment de code.

1.  **La variable sum :** Cette variable est lue et mise à jour à chaque itération de la boucle. Lors de la première itération, le processeur demande la valeur de sum. Si elle n\'est pas déjà dans un cache, un défaut de cache se produit, et sa valeur est chargée depuis la mémoire principale vers le cache (et probablement dans un registre). Pour les 999 itérations suivantes, chaque fois que le processeur aura besoin de lire ou d\'écrire sum, il la trouvera dans ce niveau de mémoire rapide. Il y aura donc 1 accès lent (défaut) suivi de 999 accès rapides (succès).

2.  **La variable i :** De même, la variable d\'itération i est lue et incrémentée à chaque passage dans la boucle. Elle présente donc une localité temporelle extrêmement forte et sera maintenue dans les niveaux les plus rapides de la hiérarchie.

3.  **Les instructions de la boucle :** Le code machine correspondant au corps de la boucle (sum = sum + array\[i\];) et aux instructions de contrôle (i++, i \< 1000, jump) est lui-même stocké en mémoire. Ces instructions sont lues par le processeur à chaque itération. Après la première itération, ce bloc d\'instructions sera présent dans le cache d\'instructions (I-Cache). Les 999 itérations suivantes bénéficieront de succès de cache pour chaque instruction, accélérant considérablement l\'exécution. L\'exemple de code de  illustre précisément ce phénomène : les instructions\
    I2 à I5 sont réutilisées à chaque tour de boucle, justifiant leur maintien dans le cache.

Au-delà des boucles, la réutilisation de variables est un autre exemple courant de localité temporelle. Dans une fonction complexe, des variables locales peuvent être utilisées pour stocker des résultats intermédiaires qui sont réutilisés plusieurs fois au cours du calcul. Le compilateur, conscient de cette forte localité, s\'efforcera de maintenir ces variables dans les registres du processeur, le niveau le plus rapide de la hiérarchie. Si le nombre de variables actives dépasse le nombre de registres disponibles, les variables les moins utilisées seront \"déversées\" (*spilled*) dans le cache L1, prêtes à être rechargées rapidement si nécessaire.

Le mécanisme matériel qui exploite la localité temporelle est simple : une fois qu\'une donnée ou une instruction est chargée dans un cache, elle y reste. Tant qu\'elle n\'est pas évincée pour faire de la place à une autre donnée, tout accès ultérieur à cette même donnée sera un succès. Les politiques de remplacement, telles que LRU (Least Recently Used), sont conçues pour renforcer cette exploitation en s\'assurant que les données qui restent dans le cache sont celles qui ont été utilisées le plus récemment, car ce sont elles qui ont la plus grande probabilité d\'être réutilisées.

### 14.1.2 La Localité Spatiale : La Proximité dans l\'Espace

La seconde facette du principe de localité est la **localité spatiale**. Sa définition formelle est la suivante : si un emplacement mémoire à l\'adresse A est accédé à un instant t, il existe une très forte probabilité que des emplacements mémoires voisins, aux adresses A+ΔA où ΔA est petit, soient accédés dans un futur très proche. Autrement dit, si un programme accède à une donnée, il est probable qu\'il accède bientôt à des données situées juste à côté en mémoire.

Cette propriété découle, elle aussi, de pratiques de programmation et de conventions de stockage de données bien établies. Les deux exemples les plus importants sont le parcours de structures de données contiguës et l\'exécution séquentielle des instructions.

Reprenons notre exemple de parcours de tableau :

> C

int sum = 0;\
for (int i = 0; i \< 1000; i++) {\
sum = sum + array\[i\];\
}

En langage C (et dans la plupart des langages de haut niveau), les éléments d\'un tableau sont garantis d\'être stockés de manière contiguë en mémoire. C\'est-à-dire que si l\'élément array est à l\'adresse A, alors array sera à l\'adresse A+sizeof(int), array à l\'adresse A+2×sizeof(int), et ainsi de suite. Le programme accède donc à une séquence d\'adresses mémoire adjacentes.

Le mécanisme matériel qui exploite la localité spatiale est le concept de **bloc** ou de **ligne de cache**. Lorsqu\'un défaut de cache se produit pour une adresse donnée, le système ne charge pas seulement l\'octet ou le mot demandé depuis la mémoire principale. Il charge un bloc contigu de données, de taille fixe (typiquement 64 ou 128 octets), qui contient la donnée demandée.

Appliquons ce mécanisme à notre exemple.

1.  **Itération i = 0 :** Le processeur demande array. C\'est un défaut de cache.

2.  **Transfert de bloc :** Le contrôleur de cache ne ramène pas seulement array. Il ramène un bloc entier de, disons, 64 octets. Si un int occupe 4 octets, ce bloc contiendra les 16 premiers éléments du tableau : array jusqu\'à array.

3.  **Itérations i = 1 à i = 15 :** Lorsque le processeur demande array, array,\..., array, il les trouvera déjà dans le cache. Ces 15 accès seront des succès de cache rapides.

4.  **Itération i = 16 :** Le processeur demande array. Comme ce n\'est pas dans le premier bloc chargé, un nouveau défaut de cache se produit. Le système charge alors le deuxième bloc de 64 octets, contenant array jusqu\'à array.

Ce processus se répète. Au lieu de 1000 défauts de cache (un par élément), le programme ne subira que 1000/16≈63 défauts de cache. Les 937 autres accès seront des succès. L\'efficacité de ce mécanisme est donc directement proportionnelle à la taille du bloc et à la nature séquentielle de l\'accès. C\'est pourquoi la manière dont les données sont organisées en mémoire est cruciale. Par exemple, pour une matrice 2D, un parcours par ligne sera beaucoup plus efficace qu\'un parcours par colonne si la matrice est stockée ligne par ligne, car le premier maximise la localité spatiale.

L\'autre domaine où la localité spatiale est omniprésente est le **flux d\'instructions**. À l\'exception des sauts (branchements, appels de fonction), les instructions d\'un programme sont stockées séquentiellement en mémoire et sont extraites et exécutées dans cet ordre. Lorsque le processeur exécute une instruction à l\'adresse P, il est presque certain qu\'il exécutera ensuite l\'instruction à l\'adresse P+4 (pour des instructions de 32 bits). Le préchargement de blocs entiers d\'instructions dans le cache d\'instructions est donc une stratégie extrêmement payante.

### 14.1.3 Quantification et Exploitation de la Localité

La localité n\'est pas une loi binaire, mais une propriété quantitative qui peut être plus ou moins forte. Son exploitation efficace est la clé de la performance de la hiérarchie mémoire.

Le **bloc de cache** est l\'unité fondamentale de cette exploitation. Sa taille est un compromis de conception crucial. Un bloc plus grand exploite mieux la localité spatiale, car il précharge plus de données voisines pour chaque défaut. Cependant, si la localité spatiale est faible, un grand bloc peut entraîner une \"pollution\" du cache, en chargeant des données qui ne seront jamais utilisées et en occupant un espace précieux. De plus, un bloc plus grand signifie une pénalité de défaut plus longue, car il faut plus de temps pour transférer le bloc depuis la mémoire principale.

Le concept d\'**ensemble de travail** (*working set*) permet de quantifier la localité d\'un programme sur une période donnée. L\'ensemble de travail à un instant

t est l\'ensemble des pages de mémoire (ou des blocs de cache) qui ont été accédées par le programme au cours d\'un intervalle de temps récent. Un programme avec une bonne localité aura un ensemble de travail de taille relativement petite et qui évolue lentement. L\'objectif de la hiérarchie mémoire est de s\'assurer que l\'ensemble de travail courant du programme réside entièrement dans les niveaux les plus rapides de la hiérarchie. Si la taille de l\'ensemble de travail dépasse la capacité du cache, le système commence à \"thrashing\" : il passe son temps à évincer des données dont il aura besoin immédiatement, pour faire de la place à d\'autres données qu\'il vient d\'évincer, menant à une cascade de défauts de cache et à un effondrement des performances.

Il est essentiel de comprendre que la localité n\'est pas une propriété intrinsèque et immuable d\'un algorithme, mais une propriété émergente de son implémentation et de son interaction avec les données. C\'est une observation empirique du comportement des programmes *typiques*. Un algorithme qui accède à la mémoire de manière aléatoire, comme le parcours de certaines structures de données de type graphe ou de listes chaînées mal organisées, présentera une très faible localité. Pour de tels programmes, l\'efficacité du cache s\'effondre, car ni la réutilisation temporelle ni la proximité spatiale ne peuvent être exploitées. Le préchargement d\'un bloc de cache devient inutile si aucune des données voisines n\'est utilisée, et le maintien d\'une donnée dans le cache est vain si elle n\'est jamais réutilisée. C\'est pourquoi deux algorithmes ayant la même complexité asymptotique (par exemple, O(NlogN)) peuvent avoir des performances réelles radicalement différentes. L\'algorithme qui présente une meilleure localité sera souvent ordres de grandeur plus rapide en pratique.

Cette dépendance de la performance matérielle au comportement logiciel a des implications profondes qui transcendent l\'architecture matérielle. Elle influence directement la conception des compilateurs et des systèmes d\'exploitation. Les compilateurs modernes ne se contentent pas de traduire le code source en code machine ; ils effectuent des analyses et des transformations complexes pour améliorer la localité des références mémoire. Des techniques comme l\'inversion de boucles (*loop interchange*), le tuilage (*tiling* ou *blocking*), ou la fusion de boucles (*loop fusion*) réorganisent les calculs non pas pour changer leur résultat, mais pour transformer un schéma d\'accès mémoire inefficace en un schéma séquentiel et local, en sympathie avec le fonctionnement du cache. De même, le mécanisme de mémoire virtuelle géré par le système d\'exploitation est une application directe du principe de localité à une plus grande échelle. La mémoire physique est divisée en pages (des blocs de 4 Ko, par exemple), et seules les pages de l\'ensemble de travail courant d\'un processus sont maintenues en RAM. Lorsqu\'un processus accède à une page qui n\'est pas en RAM (un

*défaut de page*), le système d\'exploitation la charge depuis le disque, en évincant une page moins récemment utilisée. La hiérarchie mémoire n\'est donc pas un concept isolé, mais un principe organisateur fondamental qui se manifeste à travers toutes les couches d\'un système informatique, du matériel au logiciel.

## 14.2 Conception des Mémoires Cache

### 14.2.0 Introduction : Anatomie d\'un Cache et Métrique de Performance

Si le principe de localité est le *pourquoi* de l\'efficacité des caches, leur conception interne est le *comment*. Pour comprendre les compromis qui régissent la performance d\'un système mémoire, il est impératif de disséquer l\'anatomie d\'un cache et d\'introduire la métrique quantitative qui nous servira de guide : le Temps d\'Accès Moyen à la Mémoire (AMAT).

#### Concepts Fondamentaux

Un cache est une petite mémoire rapide qui stocke des copies de blocs de données provenant d\'une mémoire plus grande et plus lente. Chaque opération mémoire émise par le processeur est d\'abord dirigée vers le cache.

- **Bloc (ou Ligne de Cache)** : C\'est l\'unité atomique de transfert et de gestion des données entre le cache et la mémoire principale. Un bloc est une séquence contiguë d\'octets de taille fixe, typiquement une puissance de deux (par exemple, 64 octets). C\'est le mécanisme qui exploite la localité spatiale.

- **Succès (Hit) et Défaut (Miss)** : Lorsqu\'une requête mémoire du processeur concerne une donnée, deux cas peuvent se présenter. Si une copie de la donnée se trouve déjà dans le cache, on parle de **succès de cache** (*cache hit*). L\'accès est alors très rapide. Si la donnée n\'est pas dans le cache, on parle de **défaut de cache** (*cache miss*). L\'accès est alors beaucoup plus lent, car il faut aller chercher le bloc contenant la donnée dans le niveau de mémoire inférieur (par exemple, la mémoire principale), le charger dans le cache, puis enfin le fournir au processeur.

- **Décomposition de l\'Adresse Mémoire** : La clé du fonctionnement d\'un cache réside dans la manière dont il interprète une adresse mémoire. Une adresse mémoire physique, qui est une simple séquence de bits pour le processeur, est décomposée par le contrôleur de cache en trois champs distincts, dont la taille dépend des paramètres du cache.

  1.  **Le Décalage (Offset)** : Ce champ identifie l\'emplacement de l\'octet (ou du mot) désiré *à l\'intérieur* d\'un bloc de cache. Si la taille d\'un bloc est de 2b octets, les b bits de poids le plus faible de l\'adresse constituent le décalage. Par exemple, pour un bloc de 64 octets (26), les 6 bits de poids faible de l\'adresse servent de décalage.

  2.  **L\'Index** : Ce champ détermine dans quelle ligne (ou quel ensemble de lignes) du cache le bloc de données doit être recherché. Si le cache est organisé en 2i ensembles, les i bits suivants (après le décalage) forment l\'index. C\'est ce champ qui permet de localiser rapidement l\'emplacement potentiel du bloc dans le cache.

  3.  **L\'Étiquette (Tag)** : Ce sont tous les bits restants de l\'adresse, ceux de poids le plus fort. L\'étiquette est une sorte d\'identifiant unique pour le bloc de données. Comme plusieurs blocs différents de la mémoire principale peuvent être mappés au même index de cache, l\'étiquette est stockée dans le cache avec les données du bloc. Elle est utilisée pour vérifier si le bloc présent dans le cache à un index donné est bien celui que le processeur recherche.

La relation est donc :

Adresse Meˊmoire=

Chaque ligne d\'un cache contient, au minimum, un bloc de données, l\'étiquette correspondante, et un **bit de validité**. Ce dernier indique si la ligne de cache contient des données valides (1) ou si elle est vide (0).

#### La Formule du Temps d\'Accès Moyen à la Mémoire (AMAT)

Pour évaluer et comparer quantitativement différentes conceptions de cache, nous avons besoin d\'une métrique qui capture la performance globale de la hiérarchie mémoire, en tenant compte à la fois de la vitesse des succès et du coût des défauts. Cette métrique est le **Temps d\'Accès Moyen à la Mémoire** (AMAT, de l\'anglais *Average Memory Access Time*).

L\'AMAT représente le temps moyen pour un accès mémoire, tel que perçu par le processeur. Il est défini par la formule suivante  :

AMAT=Tsucceˋs​+Tauxdeˊfaut​×Pdeˊfaut​

Décomposons chaque terme :

- Tsucceˋs​ (*Hit Time*) : C\'est le temps nécessaire pour accéder au cache et y trouver la donnée. Il inclut le temps de décodage de l\'adresse, de comparaison des étiquettes et de transmission de la donnée au processeur. C\'est une valeur que l\'on souhaite la plus faible possible.

- Tauxdeˊfaut​ (*Miss Rate*) : C\'est la fraction des accès mémoire qui résultent en un défaut de cache. Il est calculé comme Tauxdeˊfaut​=Nombre total d'acceˋsNombre de deˊfauts​. C\'est l\'inverse du taux de succès (Tauxsucceˋs​=1−Tauxdeˊfaut​). Un taux de défaut faible est le signe d\'un cache efficace.

- Pdeˊfaut​ (*Miss Penalty*) : C\'est le coût en temps d\'un défaut de cache. Il représente le temps supplémentaire requis pour aller chercher le bloc de données dans le niveau de mémoire inférieur, le transférer dans le cache, et enfin le fournir au processeur. Cette pénalité est généralement très élevée par rapport au temps de succès.

L\'objectif de toute conception de cache est de minimiser l\'AMAT. Cette formule simple révèle la tension fondamentale du design de cache : les trois variables sont interdépendantes. Par exemple, un cache plus grand peut réduire le Tauxdeˊfaut​, mais il est souvent plus lent, ce qui augmente le Tsucceˋs​. Une associativité plus élevée peut également réduire le Tauxdeˊfaut​, mais au prix d\'une complexité matérielle accrue qui peut aussi augmenter le Tsucceˋs​. L\'AMAT nous servira de boussole pour naviguer dans l\'espace de ces compromis et pour analyser de manière rigoureuse l\'impact de chaque décision de conception.

### 14.2.1 Organisation du Cache et Stratégies de Placement

La question la plus fondamentale dans la conception d\'un cache est : où un bloc de données provenant de la mémoire principale peut-il être placé dans le cache? La réponse à cette question, la *stratégie de placement*, définit l\'organisation du cache et a des implications profondes sur sa performance, sa complexité et son coût. Il existe un spectre de stratégies, allant d\'une contrainte maximale à une flexibilité totale, avec un compromis optimal entre les deux.

#### Cache à Correspondance Directe (Direct-Mapped)

Le cache à correspondance directe est l\'organisation la plus simple et la plus contraignante.

**Mécanisme**

Dans un cache à correspondance directe, chaque bloc de la mémoire principale a une et une seule destination possible dans le cache. Il n\'y a pas de choix. Cette destination est déterminée par une simple fonction de mappage basée sur l\'adresse du bloc. Si le cache contient Nc​ lignes (ou blocs), un bloc mémoire d\'adresse (numéro de bloc) Bm​ ne peut être placé que dans la ligne de cache Lc​ donnée par la formule  :

Lc​=Bm​(modNc​)

En pratique, cette opération modulo est implémentée de manière triviale au niveau matériel. Si Nc​=2i, alors les i bits de l\'index de l\'adresse mémoire sont utilisés directement pour sélectionner la ligne de cache.

**Processus d\'Accès**

Lorsqu\'une adresse est présentée au cache, le processus de recherche est extrêmement rapide et direct :

1.  Le contrôleur de cache extrait les champs étiquette, index et décalage de l\'adresse.

2.  L\'index est utilisé pour sélectionner *directement* l\'unique ligne de cache candidate (par exemple, la ligne 5 si l\'index est 0101).

3.  Le contrôleur vérifie le bit de validité de cette ligne. S\'il est à 0, la ligne est vide, c\'est un défaut de cache.

4.  Si le bit de validité est à 1, le contrôleur compare l\'étiquette de l\'adresse avec l\'étiquette stockée dans cette ligne de cache.

5.  Si les étiquettes correspondent, c\'est un **succès de cache**. Le décalage est alors utilisé pour extraire l\'octet ou le mot désiré du bloc de données et le renvoyer au processeur.

6.  Si les étiquettes ne correspondent pas, cela signifie que la ligne de cache est occupée par un autre bloc mémoire qui se mappe au même index. C\'est un **défaut de cache**. Le bloc existant est évincé, le nouveau bloc est chargé depuis la mémoire principale, et l\'étiquette est mise à jour.

**Avantages et Inconvénients**

L\'avantage principal du cache à correspondance directe est sa **simplicité matérielle**. La recherche se résume à un accès par index et une seule comparaison, ce qui est très rapide et peu coûteux en termes de circuits. Le Tsucceˋs​ est donc potentiellement le plus faible de toutes les organisations. De plus, il n\'y a pas besoin de politique de remplacement complexe : s\'il y a un défaut, il n\'y a qu\'un seul endroit où placer le nouveau bloc, et donc un seul bloc à évincer.

L\'inconvénient majeur, et il est de taille, est le **problème des conflits** (*conflict misses*). Imaginez un programme qui accède de manière répétée et alternée à deux blocs de données différents, B1​ et B2​, qui, par malchance, se mappent sur la même ligne de cache (c\'est-à-dire que B1​(modNc​)=B2​(modNc​)). Le scénario suivant se produit :

- Le processeur demande une donnée dans B1​. C\'est un défaut. B1​ est chargé dans la ligne Lc​.

- Le processeur demande une donnée dans B2​. C\'est un défaut. B2​ est chargé dans la ligne Lc​, évinçant B1​.

- Le processeur redemande une donnée dans B1​. C\'est à nouveau un défaut. B1​ est rechargé, évinçant B2​.

Ce phénomène, appelé *thrashing*, génère un taux de défauts de 100 % pour ces accès, même si le reste du cache est complètement vide. Le cache est incapable d\'exploiter la localité temporelle pour ces deux blocs. Cette rigidité peut sévèrement dégrader les performances pour certains schémas d\'accès.

**Exemple Numérique Détaillé**

Pour illustrer concrètement le fonctionnement et le problème des conflits, considérons un système avec les caractéristiques suivantes :

- **Cache** : Correspondance directe, taille totale de 128 octets, taille de bloc de 16 octets.

- **Mémoire** : Adressable par octet, adresses sur 16 bits.

1.  **Calcul des paramètres du cache :**

    - Nombre de lignes (Nc​) : Taille du cache / Taille du bloc = 128 / 16 = 8 lignes.

    - Bits de décalage (b) : log2​(Taille du bloc)=log2​(16)=4 bits.

    - Bits d\'index (i) : log2​(Nombre de lignes)=log2​(8)=3 bits.

    - Bits d\'étiquette (t) : Taille d\'adresse - i - b = 16−3−4=9 bits.

> La décomposition d\'une adresse de 16 bits est donc :\[ttttttttt\|iii\|bbbb\] (9 bits d\'étiquette, 3 bits d\'index, 4 bits de décalage).

2.  Scénario d\'accès séquentiel (bonne localité) :\
    Le processeur lit séquentiellement les adresses 0x0000, 0x0004, 0x0008, 0x000C.

    - **Accès à 0x0000 (binaire 000000000\|000\|0000) :**

      - Étiquette = 000000000 (0x000), Index = 000 (0), Décalage = 0000 (0).

      - Le bloc 0 de la mémoire est recherché à la ligne d\'index 0 du cache.

      - **Défaut de cache**. Le bloc 0 (adresses 0x0000 à 0x000F) est chargé dans la ligne 0. L\'étiquette 0x000 est stockée. La donnée à l\'adresse 0x0000 est fournie.

    - **Accès à 0x0004 (binaire 000000000\|000\|0100) :**

      - Étiquette = 0x000, Index = 0, Décalage = 4.

      - Le contrôleur va à la ligne 0. Il compare l\'étiquette de l\'adresse (0x000) avec celle stockée (0x000).

      - **Succès de cache**. La donnée au décalage 4 du bloc est fournie.

    - Les accès à 0x0008 et 0x000C seront également des succès.

3.  Scénario de conflit :\
    Le processeur exécute une boucle qui accède alternativement aux adresses 0x0040 et 0x00C0.

    - **Analyse de l\'adresse 0x0040 (binaire 000000001\|000\|0000) :**

      - Numéro de bloc : 0x0040 / 16 = 4.

      - Index : 4(mod8)=4.

      - Étiquette : 000000001 (0x001).

    - **Analyse de l\'adresse 0x00C0 (binaire 000000011\|000\|0000) :**

      - Numéro de bloc : 0x00C0 / 16 = 12.

      - Index : 12(mod8)=4.

      - Étiquette : 000000011 (0x003).

> Les deux adresses se mappent à la **même ligne d\'index 4**.

- **Accès 1 (à 0x0040) :** Défaut. Le bloc 4 est chargé dans la ligne 4. Étiquette stockée : 0x001.

- **Accès 2 (à 0x00C0) :** Défaut. Le contrôleur va à la ligne 4. L\'étiquette de l\'adresse (0x003) ne correspond pas à l\'étiquette stockée (0x001). Le bloc 4 est évincé. Le bloc 12 est chargé dans la ligne 4. Étiquette stockée : 0x003.

- **Accès 3 (à 0x0040) :** Défaut. Le contrôleur va à la ligne 4. L\'étiquette de l\'adresse (0x001) ne correspond pas à l\'étiquette stockée (0x003). Le bloc 12 est évincé. Le bloc 4 est rechargé.

- Le système est en *thrashing*. Le taux de défauts est de 100 %, et la performance est catastrophique, illustrant la principale faiblesse de cette organisation.

#### Cache Entièrement Associatif (Fully Associative)

À l\'extrême opposé du spectre se trouve le cache entièrement associatif, qui offre une flexibilité de placement maximale.

**Mécanisme**

Dans un cache entièrement associatif, un bloc de la mémoire principale peut être placé dans **n\'importe quelle ligne** du cache. Il n\'y a aucune restriction de placement. Par conséquent, l\'adresse mémoire n\'est pas décomposée de la même manière. Il n\'y a plus de champ d\'index. L\'adresse est simplement divisée en deux parties : une étiquette et un décalage.

Adresse Meˊmoire=

**Processus d\'Accès**

La flexibilité a un coût en termes de complexité de recherche. Pour déterminer si un bloc est dans le cache, le contrôleur doit effectuer les opérations suivantes :

1.  Extraire l\'étiquette de l\'adresse demandée.

2.  Comparer cette étiquette avec les étiquettes stockées dans **toutes les lignes du cache simultanément**.

3.  Si une correspondance est trouvée dans une ligne valide, c\'est un **succès de cache**.

4.  Si aucune correspondance n\'est trouvée après avoir vérifié toutes les lignes, c\'est un **défaut de cache**.

En cas de défaut, si le cache est plein, une **politique de remplacement** (par exemple, LRU) doit être invoquée pour choisir quelle ligne existante évincer afin de faire de la place pour le nouveau bloc.

**Avantages et Inconvénients**

L\'avantage principal est la **performance en termes de taux de succès**. En éliminant complètement les défauts de conflit, un cache entièrement associatif offre le taux de défauts le plus bas possible pour une taille de cache donnée. Il exploite la capacité du cache de la manière la plus efficace.

L\'inconvénient majeur est le **coût et la complexité matérielle**. La nécessité de disposer d\'un comparateur pour chaque ligne de cache et de réaliser toutes les comparaisons en parallèle rend cette architecture extrêmement coûteuse en surface de silicium et en consommation d\'énergie. Pour un cache de 1024 lignes, il faudrait 1024 comparateurs fonctionnant en parallèle. Cette complexité tend également à augmenter le temps de succès (Tsucceˋs​), car la recherche parallèle et la logique de sélection sont plus lentes qu\'un simple accès par index. Pour ces raisons, les caches entièrement associatifs ne sont utilisés que pour des structures de très petite taille, comme les TLB (Translation Lookaside Buffers) ou de très petits caches spécialisés.

**Exemple Numérique**

Considérons le même système que précédemment, mais avec un cache entièrement associatif de 8 lignes et des blocs de 16 octets.

- **Décomposition de l\'adresse (16 bits) :**

  - Bits de décalage (b) : log2​(16)=4 bits.

  - Bits d\'étiquette (t) : 16−4=12 bits.

  - \[tttttttttttt\|bbbb\]

Reprenons le scénario de conflit avec les adresses 0x0040 et 0x00C0.

- **Adresse 0x0040 :** Étiquette = 0x004.

- **Adresse 0x00C0 :** Étiquette = 0x00C.

- **Accès 1 (à 0x0040) :** Défaut. Le contrôleur compare 0x004 avec les 8 étiquettes du cache. Aucune ne correspond. Le bloc 4 est chargé dans une ligne libre, disons la ligne 0. L\'étiquette 0x004 y est stockée.

- **Accès 2 (à 0x00C0) :** Défaut. Le contrôleur compare 0x00C avec les 8 étiquettes. Il trouve 0x004 à la ligne 0, mais pas 0x00C. Le bloc 12 est chargé dans une autre ligne libre, disons la ligne 1. L\'étiquette 0x00C y est stockée.

- **Accès 3 (à 0x0040) :** Succès. Le contrôleur compare 0x004 avec les 8 étiquettes. Il trouve une correspondance à la ligne 0. La donnée est extraite.

- **Accès 4 (à 0x00C0) :** Succès. Le contrôleur compare 0x00C avec les 8 étiquettes. Il trouve une correspondance à la ligne 1.

Le conflit est entièrement résolu. Les deux blocs peuvent coexister dans le cache, et la localité temporelle est pleinement exploitée. Le problème ne se posera que lorsque les 8 lignes du cache seront pleines, moment où une politique de remplacement devra choisir une victime.

#### Cache Associatif par Ensemble (Set-Associative)

L\'organisation associative par ensemble représente le compromis le plus courant et le plus efficace, combinant les avantages des deux approches précédentes.

**Mécanisme**

Un cache associatif par ensemble est un hybride. Le cache est divisé en Ns​ ensembles (sets). Chaque ensemble contient k lignes de cache. On parle alors d\'un cache associatif à k voies (k-way set-associative).

Le placement d\'un bloc se fait en deux étapes :

1.  Mappage direct vers un ensemble : Comme pour un cache à correspondance directe, un bloc mémoire Bm​ est mappé à un unique ensemble Sc​ en utilisant son index.\
    \
    Sc​=Bm​(modNs​)

2.  **Placement associatif au sein de l\'ensemble :** Une fois l\'ensemble identifié, le bloc peut être placé dans **n\'importe laquelle des k lignes** de cet ensemble.

L\'organisation à correspondance directe est un cas particulier d\'associativité par ensemble où k=1 (1 voie). L\'organisation entièrement associative est l\'autre cas particulier où il n\'y a qu\'un seul ensemble (Ns​=1) contenant toutes les lignes du cache.

**Processus d\'Accès**

Le processus de recherche combine également les deux approches :

1.  Le contrôleur extrait les champs étiquette, index et décalage de l\'adresse.

2.  L\'index est utilisé pour sélectionner *directement* un ensemble dans le cache.

3.  Le contrôleur compare alors en parallèle l\'étiquette de l\'adresse avec les étiquettes des **k lignes** de cet ensemble.

4.  Si une correspondance est trouvée dans une ligne valide de l\'ensemble, c\'est un **succès de cache**.

5.  Si aucune des k étiquettes ne correspond, c\'est un **défaut de cache**. Une des k lignes de l\'ensemble doit être choisie pour être évincée (via une politique de remplacement) afin d\'accueillir le nouveau bloc.

**Avantages et Inconvénients**

Cette organisation offre un excellent équilibre. En autorisant un bloc à résider dans l\'une des k positions possibles, elle réduit considérablement la probabilité de défauts de conflit par rapport à un cache à correspondance directe. Le *thrashing* ne se produit que si plus de k blocs actifs se mappent au même ensemble. En même temps, la complexité matérielle est maîtrisée. Au lieu de Nc​ comparateurs pour un cache entièrement associatif, il n\'en faut que k (typiquement 2, 4, 8 ou 16), ce qui est beaucoup plus réalisable.

Le degré d\'associativité (k) est un paramètre de conception clé. Augmenter k diminue le taux de défauts (jusqu\'à un certain point), mais augmente le coût, la consommation d\'énergie et potentiellement le temps de succès (Tsucceˋs​) en raison de la complexité accrue des comparateurs et des multiplexeurs de sortie.

**Exemple Numérique Détaillé (Associativité à 2 voies)**

Reprenons notre système de base avec un cache de 128 octets et des blocs de 16 octets. Nous l\'organisons maintenant en associativité à 2 voies.

1.  **Calcul des paramètres du cache :**

    - Nombre total de lignes : 128 / 16 = 8 lignes.

    - Nombre de voies (k) : 2.

    - Nombre d\'ensembles (Ns​) : Nombre de lignes / k = 8 / 2 = 4 ensembles.

    - Bits de décalage (b) : log2​(16)=4 bits.

    - Bits d\'index (i) : log2​(Nombre d'ensembles)=log2​(4)=2 bits.

    - Bits d\'étiquette (t) : 16−2−4=10 bits.

> La décomposition d\'une adresse de 16 bits est maintenant :\[tttttttttt\|ii\|bbbb\] (10 bits d\'étiquette, 2 bits d\'index, 4 bits de décalage).

2.  Scénario de conflit (revisité) :\
    Le processeur accède alternativement aux adresses 0x0040 et 0x00C0.

    - **Analyse de l\'adresse 0x0040 (binaire 0000000100\|00\|0000) :**

      - Numéro de bloc : 4.

      - Index (numéro d\'ensemble) : 4(mod4)=0.

      - Étiquette : 0000000100 (0x010).

    - **Analyse de l\'adresse 0x00C0 (binaire 0000001100\|00\|0000) :**

      - Numéro de bloc : 12.

      - Index (numéro d\'ensemble) : 12(mod4)=0.

      - Étiquette : 0000001100 (0x030).

> Comme en correspondance directe, les deux blocs se mappent au même index, qui est ici l\'**ensemble 0**. Cependant, cet ensemble dispose de deux voies (deux emplacements).

- **Accès 1 (à 0x0040) :** Défaut. Le contrôleur sélectionne l\'ensemble 0. Il compare l\'étiquette 0x010 avec les deux étiquettes de l\'ensemble (qui sont invalides au début). Le bloc 4 est chargé dans la première voie de l\'ensemble 0. Étiquette stockée : 0x010.

- **Accès 2 (à 0x00C0) :** Défaut. Le contrôleur sélectionne l\'ensemble 0. Il compare l\'étiquette 0x030 avec les étiquettes de l\'ensemble. Il trouve 0x010 dans la première voie, mais la deuxième voie est libre. Le bloc 12 est chargé dans la deuxième voie de l\'ensemble 0. Étiquette stockée : 0x030.

- **Accès 3 (à 0x0040) :** Succès. Le contrôleur sélectionne l\'ensemble 0. Il compare 0x010 avec les deux étiquettes (0x010 et 0x030). Il trouve une correspondance dans la première voie.

- **Accès 4 (à 0x00C0) :** Succès. Le contrôleur sélectionne l\'ensemble 0. Il compare 0x030 avec les deux étiquettes. Il trouve une correspondance dans la deuxième voie.

Le conflit est résolu. L\'associativité, même limitée à 2 voies, a permis aux deux blocs en conflit de coexister dans le cache. Un défaut de conflit ne se produirait que si un troisième bloc se mappant à l\'ensemble 0 était demandé alors que les deux voies sont déjà occupées.

### 14.2.2 Politiques de Remplacement et d\'Écriture

Dans les caches associatifs (entièrement ou par ensemble), un défaut de cache sur un ensemble plein soulève une nouvelle question : quel bloc existant faut-il évincer pour faire de la place au nouveau? La règle utilisée pour faire ce choix est la **politique de remplacement**. Par ailleurs, lorsqu\'une instruction d\'écriture modifie une donnée dans le cache, une autre question se pose : quand cette modification doit-elle être propagée à la mémoire principale? C\'est le rôle de la **politique d\'écriture**. Ces deux ensembles de politiques sont cruciaux pour la performance et la cohérence du système mémoire.

#### Politiques de Remplacement

Une politique de remplacement est un algorithme qui s\'exécute en cas de défaut de cache sur un ensemble dont toutes les voies sont déjà occupées par des blocs valides. Son objectif est de choisir une \"victime\" à évincer, idéalement le bloc qui a le moins de chances d\'être utilisé dans le futur proche, afin de minimiser les défauts futurs.

**LRU (Least Recently Used - Le Moins Récemment Utilisé)**

La politique LRU est l\'une des plus efficaces et des plus étudiées. Elle repose sur une exploitation directe de la localité temporelle : le bloc qui n\'a pas été accédé depuis le plus longtemps est considéré comme le moins susceptible d\'être réutilisé prochainement, et est donc choisi comme victime.

- **Fonctionnement :** Pour chaque ensemble du cache, le matériel doit maintenir un historique des accès à ses k voies. Cela peut être implémenté avec des \"bits d\'âge\" ou un mécanisme de file d\'attente qui est réordonnée à chaque accès. Lorsqu\'un bloc est accédé (succès ou chargement après un défaut), il est marqué comme le \"plus récemment utilisé\". Le bloc qui se trouve à l\'autre extrémité de cet ordre est le \"moins récemment utilisé\".

- **Performance :** LRU offre d\'excellentes performances, se rapprochant souvent de la politique optimale théorique (qui consisterait à évincer le bloc qui sera utilisé le plus tard dans le futur, une information impossible à connaître à l\'avance). Elle s\'adapte bien aux changements de phase d\'un programme.

- **Complexité :** Son principal inconvénient est sa complexité d\'implémentation matérielle. Maintenir un ordre d\'utilisation précis pour chaque ensemble nécessite une logique non triviale, surtout lorsque le degré d\'associativité k augmente. Pour un cache à 8 voies, il faut une logique complexe pour suivre l\'ordre des 8 blocs. Ce coût en circuits et en vitesse peut devenir prohibitif, c\'est pourquoi de nombreuses implémentations matérielles utilisent des approximations de LRU (pseudo-LRU).

**FIFO (First-In, First-Out - Premier Entré, Premier Sorti)**

La politique FIFO est l\'une des plus simples à implémenter. Elle évince le bloc qui réside dans le cache depuis le plus longtemps, c\'est-à-dire celui qui a été chargé en premier, sans tenir compte de la fréquence ou de la récence de ses accès ultérieurs.

- **Fonctionnement :** Chaque ensemble du cache peut être vu comme une file d\'attente circulaire. Un simple pointeur par ensemble suffit. À chaque défaut, le bloc pointé est évincé, le nouveau bloc prend sa place, et le pointeur avance à la position suivante.

- **Performance :** FIFO est généralement moins performant que LRU. Son incapacité à reconnaître qu\'un bloc \"ancien\" est en fait très fréquemment utilisé peut conduire à l\'éviction de données importantes. Elle est également sujette à l\'**anomalie de Belady** : pour certaines séquences d\'accès spécifiques, augmenter la taille du cache (ou son associativité) peut paradoxalement augmenter le nombre de défauts de cache.

- **Complexité :** Son avantage est sa simplicité extrême, qui se traduit par un coût matériel très faible et une prise de décision très rapide.

**Aléatoire (Random)**

La politique de remplacement aléatoire choisit simplement une victime au hasard parmi les k blocs de l\'ensemble.

- **Fonctionnement :** Un générateur de nombres pseudo-aléatoires sélectionne un index de voie (entre 0 et k−1) à évincer.

- **Performance :** Étonnamment, ses performances sont souvent meilleures que celles de FIFO. En évitant les schémas d\'éviction systématiques et pathologiques qui peuvent affecter FIFO, elle offre une performance moyenne robuste. Elle reste cependant inférieure à LRU.

- **Complexité :** L\'implémentation est très simple, ne nécessitant qu\'un générateur de nombres pseudo-aléatoires simple (comme un registre à décalage à rétroaction linéaire), ce qui la rend attractive pour sa simplicité et sa robustesse.

Le choix d\'une politique de remplacement est donc un compromis entre la performance (taux de succès) et la complexité d\'implémentation (coût, surface, temps de succès). LRU est le meilleur en performance, Aléatoire est le plus simple et robuste, et FIFO est une alternative simple mais parfois problématique.

#### Politiques d\'Écriture

Lorsqu\'une instruction store ou write est exécutée, le processeur modifie une valeur en mémoire. Si cette valeur se trouve dans le cache, la copie en cache est mise à jour. Cependant, cela crée une incohérence : la valeur dans le cache est maintenant plus récente que la valeur correspondante en mémoire principale. La politique d\'écriture définit comment cette incohérence est résolue.

**Écriture Simultanée (Write-Through)**

Dans une politique d\'écriture simultanée, chaque opération d\'écriture est effectuée à deux endroits : dans le cache (si la donnée y est présente) et dans la mémoire principale.

- **Fonctionnement :** Une écriture du processeur met à jour la ligne de cache et déclenche immédiatement une opération d\'écriture sur le bus mémoire pour mettre à jour la mémoire principale.

- **Avantages :** La principale qualité de cette approche est sa simplicité et sa robustesse. La mémoire principale est toujours à jour et cohérente avec le cache. Cela simplifie grandement la gestion de la cohérence dans les systèmes multiprocesseurs et les interactions avec les périphériques d\'E/S.

- **Inconvénients :** La performance est le principal inconvénient. Chaque écriture est contrainte par la latence de la mémoire principale, qui est beaucoup plus lente. Le processeur pourrait se retrouver bloqué à attendre la fin de chaque écriture, annulant une grande partie des bénéfices du cache pour les opérations d\'écriture. De plus, cela génère un trafic important sur le bus mémoire.

Pour pallier ce problème de performance, les caches *write-through* sont presque toujours accompagnés d\'un **tampon d\'écriture** (*write buffer*). Il s\'agit d\'une petite file d\'attente matérielle (une FIFO) placée entre le cache et la mémoire principale. Lorsqu\'une écriture se produit, la donnée et son adresse sont placées dans le tampon d\'écriture, et le processeur peut immédiatement continuer son exécution. Le tampon se charge alors d\'écrire les données en mémoire en arrière-plan, à la vitesse du bus mémoire. Le processeur n\'est bloqué que si une nouvelle écriture survient alors que le tampon est plein.

**Écriture Différée (Write-Back)**

Dans une politique d\'écriture différée (aussi appelée *write-behind*), l\'opération d\'écriture ne met à jour que la ligne de cache. La mise à jour de la mémoire principale est reportée à plus tard.

- **Fonctionnement :** L\'écriture est effectuée uniquement dans le cache, à la vitesse du cache. La copie en mémoire principale devient temporairement obsolète (*stale*). La mise à jour de la mémoire n\'a lieu que lorsque la ligne de cache modifiée est sur le point d\'être évincée par la politique de remplacement.

- **Avantages :** Cette approche est très performante. Les écritures s\'effectuent à la vitesse du cache. Si plusieurs écritures sont effectuées sur le même bloc de cache, seule la version finale sera écrite en mémoire lors de l\'éviction, ce qui économise de nombreux accès au bus mémoire. Le trafic mémoire global est ainsi considérablement réduit.

- **Inconvénients :** La complexité est plus élevée. Le système doit garder une trace des blocs qui ont été modifiés dans le cache. De plus, la gestion de la cohérence est plus complexe, car la version la plus à jour d\'une donnée peut se trouver dans le cache d\'un processeur et non en mémoire principale. En cas de panne de courant, les modifications présentes uniquement dans le cache peuvent être perdues.

Pour gérer efficacement les écritures différées, chaque ligne de cache est dotée d\'un bit supplémentaire : le **bit de modification** (*dirty bit*).

- **Rôle du Bit de Modification :** Ce bit est initialement à 0 (propre, *clean*). Lorsqu\'une opération d\'écriture modifie le bloc de données dans une ligne de cache, le *dirty bit* de cette ligne est mis à 1 (*dirty*). Lorsque la politique de remplacement décide d\'évincer une ligne, le contrôleur de cache examine son *dirty bit*. Si le bit est à 1, cela signifie que le bloc en cache est plus récent que celui en mémoire ; il doit donc être réécrit en mémoire principale avant d\'être remplacé. Si le bit est à 0, le bloc en cache est une copie conforme de celui en mémoire ; il peut être simplement écrasé sans aucune écriture en mémoire, ce qui économise un accès mémoire coûteux.

**Gestion des Défauts d\'Écriture (Write Misses)**

Que se passe-t-il si le processeur tente d\'écrire à une adresse qui n\'est pas actuellement dans le cache?

- **Write-Allocate :** Sur un défaut d\'écriture, le bloc est d\'abord chargé de la mémoire vers le cache. Ensuite, l\'écriture est effectuée dans la ligne de cache nouvellement chargée. Cette approche est motivée par la localité : si on vient d\'écrire dans un bloc, il est probable qu\'on y accède à nouveau (lecture ou écriture) bientôt. C\'est la politique la plus courante en conjonction avec *write-back*.

- **No-Write-Allocate (ou Write-Around) :** Sur un défaut d\'écriture, la donnée est écrite directement en mémoire principale, en contournant le cache. Le contenu du cache n\'est pas modifié. Cette approche est souvent utilisée avec *write-through*. Elle est avantageuse si les données écrites ne sont pas susceptibles d\'être lues immédiatement après, car elle évite de \"polluer\" le cache avec des données qui ne seront pas réutilisées.

### 14.2.3 Caches Multiniveaux

L\'analyse de la formule de l\'AMAT révèle un dilemme fondamental dans la conception d\'un cache unique. Pour obtenir un temps de succès (Tsucceˋs​) très faible, nécessaire pour ne pas ralentir le processeur, le cache doit être petit et simple. Cependant, un petit cache aura inévitablement un taux de défauts (Tauxdeˊfaut​) plus élevé. La pénalité pour ces défauts est un accès à la mémoire principale, qui est très lente, rendant ainsi le terme Tauxdeˊfaut​×Pdeˊfaut​ très grand. Inversement, pour réduire le taux de défauts, on pourrait utiliser un cache très grand. Mais un grand cache est intrinsèquement plus lent (plus de portes logiques à traverser, des fils plus longs), ce qui augmente le Tsucceˋs​ pour *tous* les accès.

La solution à ce dilemme est de ne pas utiliser un seul cache, mais une **hiérarchie de caches**, généralement composée de deux ou trois niveaux : L1, L2 et L3.

**Justification et Fonctionnement**

Une hiérarchie de caches multiniveaux fonctionne comme un système de filtres successifs.

- Le **cache de premier niveau (L1)** est le plus proche du processeur. Il est très petit (typiquement 32 Ko ou 64 Ko par cœur) et extrêmement rapide (temps d\'accès de quelques cycles d\'horloge). Son objectif est de satisfaire la majorité des requêtes avec une latence minimale.

- Le **cache de deuxième niveau (L2)** est plus grand (typiquement 256 Ko à 2 Mo par cœur) et un peu plus lent que le L1. Il agit comme un cache de secours pour le L1.

- Le **cache de troisième niveau (L3)** est encore plus grand (typiquement 8 Mo à 64 Mo) et est souvent partagé entre tous les cœurs d\'un même processeur. Il est le dernier rempart avant un accès à la lente mémoire principale.

Le flux d\'une requête mémoire est le suivant :

1.  Le processeur demande une donnée. La requête est envoyée au cache L1.

2.  Si c\'est un succès en L1 (hit L1), la donnée est retournée au processeur. C\'est le cas le plus rapide.

3.  Si c\'est un défaut en L1 (miss L1), la requête est transmise au cache L2.

4.  Si c\'est un succès en L2 (hit L2), la donnée est retournée. La pénalité de défaut pour le L1 n\'est que le temps d\'accès au L2, ce qui est bien plus court qu\'un accès à la RAM. La donnée est également chargée dans le L1.

5.  Si c\'est un défaut en L2 (miss L2), la requête est transmise au cache L3 (s\'il existe).

6.  Si c\'est un défaut dans tous les niveaux de cache, alors seulement un accès à la mémoire principale est initié. Le bloc de données est alors chargé à travers toute la hiérarchie (d\'abord en L3, puis L2, puis L1).

**Conceptions Typiques**

Les différents niveaux de cache sont optimisés pour des objectifs différents, ce qui se reflète dans leurs paramètres de conception :

- **Cache L1 :** L\'optimisation principale est la **vitesse**. Pour cela, il est petit, utilise une associativité élevée (par exemple, 8 voies) pour minimiser les conflits, et est souvent scindé en un cache d\'instructions (L1i) et un cache de données (L1d). Cette séparation (architecture Harvard) permet au processeur de chercher une instruction et d\'accéder à une donnée simultanément, augmentant le parallélisme.

- **Cache L2 :** L\'optimisation principale est de **réduire le taux de défauts du L1**. Il est donc significativement plus grand. Il est généralement unifié (contient à la fois données et instructions) pour une utilisation plus flexible de l\'espace.

- **Cache L3 :** L\'optimisation principale est de **réduire la pénalité de défaut du L2** et de servir de point de communication et de cohérence entre les différents cœurs. Sa grande taille lui permet de capturer l\'ensemble de travail de plusieurs applications.

**Politiques d\'Inclusion**

Une question de conception importante est de savoir si le contenu d\'un cache de niveau inférieur doit également être présent dans le niveau supérieur.

- **Politique Inclusive :** Dans un cache inclusif, tout bloc présent en L1 doit aussi être présent en L2. Si un bloc est évincé de L2, il doit également être invalidé (retiré) de L1. Cela simplifie la maintenance de la cohérence de cache dans les systèmes multi-cœurs, car un autre cœur n\'a besoin de sonder que le cache de dernier niveau (L3) pour savoir si une donnée est cachée quelque part. L\'inconvénient est un gaspillage de capacité, car les mêmes données sont dupliquées.

- **Politique Exclusive :** Dans un cache exclusif, les contenus des caches L1 et L2 sont garantis d\'être mutuellement exclusifs. Un bloc n\'est jamais présent dans plus d\'un niveau de cache à la fois. Lorsqu\'un bloc est évincé de L1, il est placé dans L2. Cela maximise la capacité de cache effective (Capacité totale = Taille L1 + Taille L2). Cependant, la gestion de la cohérence est plus complexe, car une recherche peut nécessiter de sonder plusieurs niveaux de cache.

**Analyse Quantitative avec l\'AMAT**

La formule de l\'AMAT peut être étendue pour analyser les hiérarchies multiniveaux.

Pour un système à deux niveaux de cache (L1, L2), la pénalité de défaut du L1 (Pdeˊfaut,L1​) est le temps nécessaire pour obtenir la donnée du niveau suivant. Ce temps est lui-même un AMAT pour le cache L2.

Pdeˊfaut,L1​=AMATL2​=Tsucceˋs,L2​+Tauxdeˊfaut,L2​×Pdeˊfaut,L2​

Où Pdeˊfaut,L2​ est la pénalité d\'un accès à la mémoire principale.

En substituant cela dans la formule de base, on obtient l\'AMAT global :

\$\$ AMAT\_{global} = T\_{succès, L1} + Taux\_{défaut, L1} \\times (T\_{succès, L2} + Taux\_{défaut, L2} \\times P\_{défaut, L2}) \$\$

Pour un système à trois niveaux de cache (L1, L2, L3), la formule s\'étend de manière récursive :

\$\$ AMAT\_{global} = T\_{succès, L1} + Taux\_{défaut, L1} \\times (T\_{succès, L2} + Taux\_{défaut, L2} \\times (T\_{succès, L3} + Taux\_{défaut, L3} \\times P\_{défaut, L3})) \$\$

**Exemple Numérique d\'Analyse**

Considérons un processeur avec un temps de cycle de 1 ns. L\'accès à la mémoire principale prend 100 ns.

- **Système avec L1 seul :**

  - Tsucceˋs,L1​=1 ns

  - Tauxdeˊfaut,L1​=10% (un petit cache L1 a un taux de défauts relativement élevé)

  - Pdeˊfaut,L1​=100 ns (accès à la RAM)

  - AMAT=1 ns+0.10×100 ns=1+10=11 ns

- **Système avec L1 et L2 :**

  - Paramètres L1 : Tsucceˋs,L1​=1 ns, Tauxdeˊfaut,L1​=10%

  - Paramètres L2 : Tsucceˋs,L2​=10 ns, Tauxdeˊfaut,L2​=20% (taux de défauts *local* au L2, c\'est-à-dire la fraction des accès arrivant en L2 qui manquent)

  - Pdeˊfaut,L2​=100 ns

  - AMAT=1 ns+0.10×(10 ns+0.20×100 ns)

  - AMAT=1+0.10×(10+20)=1+0.10×30=1+3=4 ns

L\'ajout du cache L2 a réduit le temps d\'accès moyen de 11 ns à 4 ns, soit une amélioration de la performance de près de 3 fois. Cet exemple illustre de manière quantitative la puissance de l\'approche multiniveaux pour combattre le mur de la mémoire.

La conception d\'une hiérarchie de cache est un exercice d\'ingénierie complexe, un art du compromis dans un espace de conception multidimensionnel. Il n\'existe pas de \"meilleur\" cache universel. Chaque paramètre --- taille, taille de bloc, associativité, politiques de remplacement et d\'écriture, nombre de niveaux, politique d\'inclusion --- interagit avec les autres. Par exemple, augmenter la taille du bloc améliore l\'exploitation de la localité spatiale mais peut aussi augmenter la pénalité de défaut (plus de données à transférer) et le risque de \"pollution\" du cache si les données supplémentaires ne sont pas utilisées. De même, le choix d\'une politique d\'écriture différée (*write-back*), qui favorise les écritures locales, est d\'autant plus pertinent que la politique de remplacement (comme LRU) est efficace pour conserver les blocs \"chauds\" (fréquemment écrits) dans le cache. L\'ensemble du système doit être co-conçu pour atteindre un point optimal dans cet espace de compromis, en minimisant l\'AMAT pour les charges de travail cibles.

Il faut également noter que si l\'AMAT est un modèle analytique puissant, il reste une simplification. Il suppose des pénalités et des temps d\'accès constants. En réalité, la latence de la mémoire principale peut varier en fonction de nombreux facteurs. De plus, les processeurs modernes sont capables de \"masquer\" une partie de la latence des défauts. Grâce à des techniques comme l\'exécution dans le désordre et les caches \"non bloquants\" (*non-blocking* ou *hit-under-miss*), un processeur peut continuer à exécuter d\'autres instructions indépendantes pendant qu\'un défaut de cache est en cours de traitement par le système mémoire. L\'impact réel d\'un défaut sur le temps d\'exécution n\'est donc pas toujours égal à la pénalité de défaut complète. L\'AMAT reste néanmoins la métrique de premier ordre la plus importante pour raisonner sur l\'architecture de la hiérarchie mémoire.

## 14.3 Mémoire Principale (DRAM, SRAM)

Au cœur de la hiérarchie mémoire se trouvent deux technologies de semi-conducteurs fondamentales : la SRAM (Static Random-Access Memory) et la DRAM (Dynamic Random-Access Memory). Bien qu\'elles servent toutes deux à stocker des données de manière volatile, leurs caractéristiques internes, leurs performances et leurs coûts sont radicalement différents. C\'est précisément cette divergence qui justifie leur positionnement respectif dans la hiérarchie : la SRAM, rapide et coûteuse, pour les caches ; la DRAM, dense et économique, pour la mémoire principale.

### 14.3.1 SRAM (Static RAM) : La Mémoire de la Vitesse

La SRAM est la technologie de choix pour les mémoires caches en raison de sa très grande vitesse d\'accès. Cette vitesse découle directement de la structure de sa cellule mémoire de base.

**Structure de la Cellule 6T**

La cellule SRAM la plus courante est la cellule à six transistors (6T). Elle est constituée de deux inverseurs CMOS montés en tête-bêche, formant une bascule (*latch* ou *flip-flop*), et de deux transistors d\'accès supplémentaires.

- **Le cœur de stockage :** Les quatre transistors centraux (deux PMOS et deux NMOS) forment deux inverseurs logiques. La sortie du premier inverseur est connectée à l\'entrée du second, et vice-versa. Cette rétroaction positive crée une structure bistable : elle ne peut se trouver que dans l\'un des deux états stables, représentant un \'0\' ou un \'1\' logique. Par exemple, si le nœud interne Q est à \'1\' (haute tension), le premier inverseur force le nœud Q-barre à \'0\' (basse tension), ce qui, en retour, force le second inverseur à maintenir Q à \'1\'.

- **Les transistors d\'accès :** Deux transistors NMOS supplémentaires agissent comme des interrupteurs. Ils sont contrôlés par une ligne de commande appelée la **ligne de mot** (*Word Line* - WL). Lorsque la WL est désactivée (tension basse), ces transistors sont ouverts, isolant la bascule du monde extérieur. Lorsque la WL est activée (tension haute), les transistors se ferment, connectant les nœuds internes Q et Q-barre à deux lignes de données externes, les **lignes de bit** (*Bit Lines* - BL et BL-barre).

**Fonctionnement**

- **Rétention (Standby) :** Tant que la WL est basse et que l\'alimentation est maintenue, la bascule conserve son état indéfiniment. C\'est pourquoi la mémoire est dite \"statique\" ; elle ne nécessite pas de rafraîchissement.

- **Lecture :** Pour lire la cellule, les deux lignes de bit (BL et BL-barre) sont d\'abord préchargées à une tension intermédiaire. Ensuite, la WL est activée. Selon l\'état stocké dans la bascule, l\'un des nœuds (Q ou Q-barre) tirera sa ligne de bit respective vers le bas. Un amplificateur de détection (sense amplifier) détecte cette petite différence de tension entre BL et BL-barre pour déterminer la valeur stockée. Ce processus est très rapide et non destructif.

- **Écriture :** Pour écrire une nouvelle valeur, la valeur désirée (par exemple, \'0\') et son complément (\'1\') sont appliquées de force sur les lignes BL et BL-barre. Ensuite, la WL est activée. Les circuits externes, plus puissants que les transistors de la bascule, forcent les nœuds internes à basculer dans le nouvel état.

**Analyse Coût-Performance**

La cellule 6T offre des performances exceptionnelles. Son temps d\'accès est très faible, de l\'ordre de quelques nanosecondes, voire moins, et son temps de cycle (temps minimum entre deux accès consécutifs) est égal à son temps d\'accès. Cependant, cette performance a un prix. L\'utilisation de six transistors par bit rend la cellule SRAM relativement grande, ce qui limite sa densité de stockage. Elle est donc beaucoup plus coûteuse par bit que la DRAM et consomme plus d\'énergie en mode actif. Ces caractéristiques la rendent parfaitement adaptée aux mémoires caches : la vitesse est le critère primordial, et la capacité requise est relativement faible, ce qui rend son coût et sa consommation acceptables.

### 14.3.2 DRAM (Dynamic RAM) : La Mémoire de la Densité

La DRAM est la technologie qui sous-tend la mémoire principale de la quasi-totalité des ordinateurs, des serveurs aux téléphones intelligents. Son principal avantage est sa très grande densité, qui permet de stocker des gigaoctets de données sur une petite surface de silicium à un coût très faible.

**Structure de la Cellule 1T1C**

Cette densité est rendue possible par la simplicité extrême de sa cellule de base, la cellule à un transistor et un condensateur (1T1C).

- **Le condensateur :** C\'est l\'élément de stockage. Il stocke un bit d\'information sous la forme d\'une charge électrique. Un condensateur chargé peut représenter un \'1\', et un condensateur déchargé un \'0\'.

- **Le transistor :** Un unique transistor NMOS agit comme un interrupteur, contrôlé par la ligne de mot (WL). Il permet de connecter ou de déconnecter le condensateur de sa ligne de bit (BL).

**Fonctionnement et Rafraîchissement**

- **Écriture :** Pour écrire un \'1\', la ligne de bit est mise à une haute tension et la WL est activée, ce qui charge le condensateur. Pour écrire un \'0\', la BL est mise à une basse tension, ce qui décharge le condensateur.

- **Lecture :** La lecture est une opération plus délicate. La BL est d\'abord préchargée à une tension intermédiaire (VDD/2). Puis, la WL est activée. Le condensateur partage alors sa charge avec la ligne de bit. Si le condensateur était chargé (\'1\'), la tension de la BL augmente très légèrement. S\'il était déchargé (\'0\'), elle diminue très légèrement. Un amplificateur de détection très sensible est nécessaire pour détecter cette minuscule variation de tension et déterminer la valeur stockée.

- **Nature Destructive et Dynamique :** Ce processus de lecture est **destructif** : en partageant sa charge, le condensateur perd son état initial. Il est donc impératif que l\'amplificateur de détection réécrive immédiatement la valeur lue dans la cellule pour la restaurer. De plus, le condensateur n\'est pas parfait et perd sa charge avec le temps à cause des courants de fuite. C\'est pourquoi la mémoire est dite \"dynamique\". Pour éviter la perte de données, chaque cellule de la DRAM doit être lue et réécrite périodiquement, un processus appelé **rafraîchissement** (*refresh*), qui doit être effectué toutes les quelques millisecondes (typiquement, toutes les 64 ms).

**Analyse Coût-Performance**

La cellule 1T1C est beaucoup plus petite et plus simple à fabriquer que la cellule 6T de la SRAM. Cela se traduit par une **densité de stockage très élevée** et un **coût par bit très faible**, ce qui en fait la technologie idéale pour la mémoire principale, où de grandes capacités sont nécessaires. Cependant, elle est intrinsèquement plus lente que la SRAM. Le temps d\'accès est limité par le temps nécessaire pour charger/décharger le condensateur et pour que l\'amplificateur de détection fonctionne. De plus, les cycles de rafraîchissement consomment du temps et de la bande passante, rendant la mémoire indisponible pendant de courts instants.

Le tableau suivant résume les compromis fondamentaux entre ces deux technologies, qui justifient leur place respective dans la hiérarchie mémoire.

  ----------------------------------- ---------------------------------------- -------------------------------------
  Caractéristique                     SRAM (Static RAM)                        DRAM (Dynamic RAM)

  **Structure de la cellule**         6 transistors (6T)                       1 transistor, 1 condensateur (1T1C)

  **Vitesse d\'accès**                Très rapide (\~1-10 ns)                  Plus lente (\~50-70 ns)

  **Densité**                         Faible                                   Très élevée

  **Coût par bit**                    Élevé                                    Faible

  **Consommation statique**           Faible (mais fuites)                     Négligeable (mais rafraîchissement)

  **Nécessité de rafraîchissement**   Non                                      Oui (périodiquement)

  **Complexité**                      Élevée                                   Simple

  **Usage typique**                   Mémoires cache (L1, L2, L3), Registres   Mémoire principale
  ----------------------------------- ---------------------------------------- -------------------------------------

### 14.3.3 Organisation de la DRAM Moderne

L\'accès à la mémoire principale dans un système moderne est une opération complexe qui implique une organisation hiérarchique sophistiquée, bien au-delà de la simple cellule 1T1C. Comprendre cette structure est essentiel pour analyser la performance de la mémoire.

**Du Chip au Module DIMM**

Les cellules DRAM individuelles ne sont pas accessibles directement. Elles sont organisées en vastes matrices bidimensionnelles à l\'intérieur de puces de silicium. Plusieurs de ces puces sont ensuite assemblées sur un circuit imprimé standardisé appelé **DIMM (Dual In-line Memory Module)**, qui est ce que l\'on insère dans les fentes de la carte mère.

**Hiérarchie Interne de l\'Accès Mémoire**

L\'accès à une donnée spécifique en mémoire suit un chemin hiérarchique précis, orchestré par le contrôleur mémoire intégré au processeur.

- **Canaux (Channels) :** Un processeur moderne dispose de plusieurs contrôleurs mémoire, chacun gérant un ou plusieurs **canaux** de mémoire indépendants. Un canal est un bus de données distinct (généralement de 64 bits de large) qui relie le processeur à un ou plusieurs DIMM. L\'utilisation de multiples canaux (par exemple, *dual-channel*, *quad-channel*) permet de paralléliser les accès mémoire : le processeur peut lire ou écrire sur plusieurs canaux simultanément, ce qui multiplie la bande passante mémoire totale disponible.

- **Rangs (Ranks) :** Un DIMM peut être composé d\'un ou plusieurs ensembles de puces DRAM qui partagent les mêmes lignes d\'adresse et de commande. Chaque ensemble est appelé un **rang**. Du point de vue du contrôleur mémoire, un DIMM à deux rangs (*dual-rank*) se comporte comme deux modules de mémoire distincts partageant le même canal. Le contrôleur ne peut accéder qu\'à un seul rang à la fois sur un canal donné, en utilisant un signal de sélection de puce (*Chip Select*). L\'utilisation de plusieurs rangs permet d\'augmenter la densité de mémoire, et le contrôleur peut entrelacer les accès entre les rangs pour masquer une partie de la latence.

- **Puces et Bancs (Chips and Banks) :** Chaque rang est constitué d\'un groupe de puces DRAM (typiquement 8 puces pour une largeur de données de 64 bits, ou 9 pour inclure la correction d\'erreurs ECC). Chaque puce DRAM est elle-même subdivisée en plusieurs **bancs** (typiquement 8 ou 16). Un banc est une matrice indépendante de cellules mémoire avec ses propres circuits de lecture/écriture. L\'indépendance des bancs est cruciale pour la performance : pendant qu\'un banc effectue une opération lente (comme l\'activation d\'une nouvelle rangée), le contrôleur mémoire peut émettre des commandes vers un autre banc, permettant ainsi de paralléliser les opérations au sein d\'une même puce.

**Protocole d\'Accès à la DRAM**

L\'accès à une donnée dans ce labyrinthe hiérarchique suit un protocole précis :

1.  **Activation de Rangée :** Le contrôleur mémoire sélectionne un canal, un rang et un banc. Il envoie ensuite l\'adresse de la rangée souhaitée sur le bus d\'adresse et émet une commande d\'activation de rangée (**RAS - Row Address Strobe**). Cette opération, relativement lente, copie toute la rangée (plusieurs kilooctets de données) depuis la matrice de cellules vers un tampon interne au banc, appelé le **tampon de rangée** (*row buffer*).

2.  **Accès aux Colonnes :** Une fois la rangée \"ouverte\" et son contenu dans le tampon, le contrôleur peut envoyer une ou plusieurs adresses de colonne et des commandes de lecture ou d\'écriture (**CAS - Column Address Strobe**). Ces opérations sont très rapides, car elles n\'accèdent qu\'au tampon de rangée, qui est une SRAM.

3.  **Précharge :** Lorsque les accès à la rangée ouverte sont terminés, le contrôleur doit émettre une commande de **précharge** pour écrire le contenu du tampon de rangée dans la matrice (pour restaurer les données après la lecture destructive) et fermer la rangée. Le banc est alors prêt pour une nouvelle commande d\'activation sur une autre rangée.

Cette structure a une implication fondamentale sur la performance. Le tampon de rangée agit en réalité comme un petit cache interne à la puce DRAM. Si une série d\'accès mémoire ciblent des adresses différentes mais situées sur la même rangée dans le même banc (un *row buffer hit*), ils peuvent être servis très rapidement avec une seule activation RAS suivie de multiples commandes CAS. Si, au contraire, les accès sautent entre différentes rangées (un *row buffer miss* ou *conflict*), chaque accès nécessitera un cycle lent de précharge et d\'activation. Cela démontre que le principe de localité spatiale est exploité à un niveau très bas, à l\'intérieur même de la puce DRAM. Les contrôleurs mémoire modernes sont dotés d\'ordonnanceurs sophistiqués qui tentent de réorganiser les requêtes mémoire en attente pour maximiser les *row buffer hits* et ainsi améliorer l\'efficacité globale du sous-système mémoire.

Par ailleurs, la course à la densité de la DRAM a été un moteur majeur de l\'innovation en physique des semi-conducteurs. La nécessité de maintenir une capacité de condensateur suffisante (environ 30 fF ) pour une rétention de charge fiable, tout en réduisant continuellement la surface de la cellule 1T1C, a forcé l\'industrie à abandonner les conceptions planaires. Pour loger le condensateur, les fabricants ont dû exploiter la troisième dimension, soit en creusant de profondes tranchées dans le silicium (

*trench capacitors*), soit en construisant des structures cylindriques en hauteur (*stacked capacitors*). Cette pression économique pour des DRAM moins chères et plus denses a été un facteur causal majeur dans le développement de techniques de fabrication 3D avancées, bien avant qu\'elles ne soient appliquées aux processeurs logiques.

## 14.4 Systèmes de Stockage (HDD, SSD) et RAID

La base de la hiérarchie mémoire est constituée par les systèmes de stockage de masse, ou mémoire secondaire. Leur rôle est d\'assurer la persistance des données à long terme, même en l\'absence d\'alimentation électrique. Pendant des décennies, cette fonction a été dominée par les disques durs magnétiques (HDD). Plus récemment, les disques à état solide (SSD), basés sur la technologie de mémoire flash, ont révolutionné le stockage par leurs performances radicalement supérieures. Pour combiner les avantages de plusieurs disques, la technologie RAID offre des solutions pour améliorer la performance, la fiabilité, ou les deux.

### 14.4.1 Disques Durs Magnétiques (HDD - Hard Disk Drive)

Le disque dur magnétique est un dispositif électromécanique qui stocke les données en modifiant l\'orientation magnétique de minuscules domaines sur une surface ferromagnétique.

**Structure Mécanique**

Un HDD est composé de plusieurs éléments mécaniques en mouvement constant  :

- **Plateaux (Platters) :** Un ou plusieurs disques rigides, généralement en aluminium ou en verre, recouverts d\'une fine couche de matériau magnétique. Ils tournent à une vitesse constante et élevée, mesurée en révolutions par minute (RPM), typiquement de 5400 à 7200 RPM pour les disques grand public et jusqu\'à 15 000 RPM pour les disques d\'entreprise.

- **Têtes de Lecture/Écriture (Read/Write Heads) :** Chaque surface de plateau est associée à une tête de lecture/écriture qui flotte à une distance infime au-dessus du plateau grâce à un coussin d\'air généré par la rotation.

- **Bras Actuateur (Actuator Arm) :** Les têtes sont montées sur un bras mobile qui peut pivoter pour positionner les têtes sur n\'importe quelle piste du disque.

- **Moteur de Broche (Spindle Motor) :** Il assure la rotation des plateaux à une vitesse constante.

**Organisation des Données**

Les données sur un plateau sont organisées de manière concentrique :

- **Pistes (Tracks) :** Chaque plateau est divisé en des milliers de cercles concentriques appelés pistes.

- **Secteurs (Sectors) :** Chaque piste est divisée en un certain nombre de secteurs, qui sont les plus petites unités de stockage adressables (traditionnellement 512 octets, plus récemment 4 Ko).

- **Cylindres (Cylinders) :** Un cylindre est l\'ensemble de toutes les pistes situées à la même distance du centre, sur tous les plateaux.

**Analyse Quantitative du Temps d\'Accès**

La nature mécanique du HDD fait que le temps d\'accès à une donnée est dominé par des délais physiques. Le temps total pour lire ou écrire un bloc de données est la somme de trois composantes distinctes  :

Tacceˋs​=Trecherche​+Trotation​+Ttransfert​

1.  **Temps de Recherche (Seek Time) :** C\'est le temps nécessaire au bras actuateur pour déplacer la tête de lecture/écriture de sa position actuelle jusqu\'à la piste contenant la donnée désirée. C\'est la composante la plus lente et la plus variable du temps d\'accès. Le temps de recherche moyen pour un disque moderne se situe entre 4 et 10 millisecondes (ms).

2.  **Latence Rotationnelle (Rotational Latency) :** Une fois que la tête est sur la bonne piste, il faut attendre que la rotation du plateau amène le secteur désiré sous la tête. En moyenne, ce temps d\'attente est égal à la moitié du temps d\'une rotation complète. Pour un disque à 7200 RPM, une rotation prend (60 s/7200)=8.33 ms. La latence rotationnelle moyenne est donc d\'environ 4.17 ms.

3.  **Temps de Transfert (Transfer Time) :** C\'est le temps nécessaire pour que les données du secteur soient effectivement lues ou écrites. Il dépend de la quantité de données à transférer, de la vitesse de rotation et de la densité de stockage sur la piste. Cette composante est généralement beaucoup plus faible que les deux précédentes pour de petits transferts.

Pour un accès aléatoire à un petit bloc de données, le temps d\'accès total est donc de l\'ordre de 10 à 15 ms, un temps colossal comparé aux nanosecondes de la DRAM.

### 14.4.2 Disques à État Solide (SSD - Solid-State Drive)

Les SSD représentent un changement de paradigme dans le stockage. Ils éliminent complètement la mécanique au profit de l\'électronique à semi-conducteurs.

**Principe de la Mémoire Flash NAND**

Les SSD sont basés sur la technologie de **mémoire flash NAND**, une forme de mémoire non volatile. Les données sont stockées en piégeant des électrons dans une structure de transistor spécialisée appelée \"grille flottante\". La présence ou l\'absence de charge dans cette grille modifie la tension de seuil du transistor, ce qui permet de stocker un état \'0\' ou \'1\'. Différents types de NAND existent, se différenciant par le nombre de bits stockés par cellule (SLC pour 1 bit, MLC pour 2, TLC pour 3, QLC pour 4), avec un compromis entre coût, densité et endurance.

**Organisation**

La mémoire NAND est organisée hiérarchiquement en **pages** (l\'unité de lecture et d\'écriture, typiquement 4 Ko ou 16 Ko) et en **blocs** (un ensemble de pages, par exemple 128 ou 256 pages). Cette organisation présente une asymétrie fondamentale : on peut écrire sur des pages individuelles (tant qu\'elles sont vides), mais on ne peut effacer les données qu\'en effaçant un bloc entier. Cela signifie que pour modifier une seule page, le contrôleur du SSD doit souvent lire le bloc entier en mémoire, effacer le bloc, puis réécrire le bloc avec la page modifiée. Ce processus, appelé *read-modify-write*, a des implications importantes sur la performance et l\'endurance.

**Comparaison Exhaustive HDD vs. SSD**

La transition des HDD vers les SSD est motivée par des avantages de performance spectaculaires, comme le résume le tableau suivant.

  ----------------------------------- ---------------------------------- -------------------------------------- -----------------------------------
  Métrique                            HDD (Hard Disk Drive)              SSD (Solid-State Drive)                Facteur d\'Amélioration (Approx.)

  **Technologie**                     Plateaux magnétiques en rotation   Mémoire flash NAND non volatile        \-

  **Temps d\'accès (Aléatoire)**      5 - 10 ms (millisecondes)          30 - 100 µs (microsecondes)            \~100x

  **Débit (Séquentiel)**              100 - 200 Mo/s                     500 - 7000+ Mo/s                       5x à 35x

  **IOPS (Opérations/s Aléatoire)**   75 - 150                           50 000 - 1 000 000+                    \~1000x

  **Coût par Go**                     Faible (\~0.02€/Go)                Modéré (\~0.10€/Go)                    \~5x plus cher

  **Consommation Énergétique**        Plus élevée (6-10 W en charge)     Faible (2-5 W en charge)               \~2x-3x plus efficace

  **Fiabilité (Chocs)**               Fragile (pièces mobiles)           Très robuste (pas de pièces mobiles)   \-

  **Bruit**                           Audible (rotation, recherche)      Silencieux                             \-
  ----------------------------------- ---------------------------------- -------------------------------------- -----------------------------------

L\'écart de performance le plus significatif, et de loin, concerne les accès aléatoires. En éliminant les délais mécaniques de recherche et de rotation, les SSD sont des centaines, voire des milliers de fois plus rapides pour les petites opérations de lecture/écriture aléatoires (mesurées en IOPS - *Input/Output Operations Per Second*). Cette caractéristique a des conséquences profondes. Les systèmes d\'exploitation, les systèmes de fichiers et les bases de données, historiquement conçus pour optimiser les accès sur HDD en les rendant aussi séquentiels que possible, peuvent être repensés pour tirer parti de l\'accès aléatoire quasi instantané des SSD.

En termes de durabilité, bien que les cellules flash aient un nombre fini de cycles d\'écriture/effacement, les contrôleurs de SSD modernes implémentent des algorithmes sophistiqués de *wear leveling* (nivellement de l\'usure) qui répartissent les écritures sur l\'ensemble des blocs pour maximiser la durée de vie du disque, la rendant comparable, voire supérieure, à celle des HDD dans de nombreux cas d\'utilisation.

### 14.4.3 RAID (Redundant Array of Independent Disks)

Plutôt que d\'utiliser des disques individuellement, il est souvent avantageux de les regrouper. Le **RAID** est une technologie qui combine plusieurs disques physiques en une seule unité de stockage logique. Selon la configuration (le \"niveau\" RAID), l\'objectif peut être d\'augmenter la performance, d\'assurer la tolérance aux pannes (redondance), ou les deux.

#### Analyse des Niveaux RAID Majeurs

**RAID 0 (Entrelacement / Striping)**

- **Schéma :** Les données sont divisées en blocs (par exemple, de 64 Ko) et écrites de manière entrelacée sur tous les disques de la grappe. Le premier bloc va sur le disque 1, le deuxième sur le disque 2, et ainsi de suite.

- **Analyse :**

  - **Performance :** Très élevée. Pour les lectures et écritures séquentielles, la bande passante est théoriquement multipliée par le nombre de disques (N), car tous les disques travaillent en parallèle.

  - **Capacité :** La capacité totale est la somme des capacités de tous les disques (N×C).

  - **Tolérance aux pannes :** Nulle. La défaillance d\'un seul disque entraîne la perte de **toutes** les données de la grappe, car chaque fichier est réparti sur tous les disques. Le RAID 0 est donc utilisé lorsque la vitesse est la seule priorité et que les données ne sont pas critiques.

**RAID 1 (Mise en Miroir / Mirroring)**

- **Schéma :** Les données sont écrites de manière identique sur deux disques (ou plus). Chaque disque est une copie exacte (un miroir) de l\'autre.

- **Analyse :**

  - **Performance :** La performance en écriture est celle d\'un seul disque. La performance en lecture peut être améliorée, car les lectures peuvent être réparties entre les disques du miroir.

  - **Capacité :** La capacité utile est celle d\'un seul disque, ce qui représente une efficacité de 50% (pour deux disques).

  - **Tolérance aux pannes :** Très élevée. La grappe peut tolérer la défaillance de N−1 disques. Si un disque tombe en panne, le système continue de fonctionner de manière transparente sur son miroir. C\'est une solution simple et robuste pour les données critiques.

**RAID 5 (Entrelacement avec Parité Distribuée)**

- **Schéma :** Les données sont entrelacées sur N−1 disques, et un bloc de **parité** est calculé et écrit sur le N-ième disque. La parité est une information redondante (par exemple, un XOR des blocs de données) qui permet de reconstruire les données d\'un disque manquant. Pour éviter qu\'un seul disque de parité ne devienne un goulot d\'étranglement, les blocs de parité sont distribués (alternés) sur tous les disques de la grappe.

- **Analyse :**

  - **Performance :** Très bonne performance en lecture. La performance en écriture est dégradée en raison de la \"pénalité d\'écriture RAID 5\" : pour modifier un bloc de données, le contrôleur doit lire l\'ancien bloc de données, lire l\'ancien bloc de parité, calculer la nouvelle parité, écrire le nouveau bloc de données et écrire le nouveau bloc de parité.

  - **Capacité :** Efficace. La capacité utile est de (N−1)×C.

  - **Tolérance aux pannes :** La grappe peut tolérer la défaillance d\'un seul disque.

**RAID 6 (Entrelacement avec Double Parité Distribuée)**

- **Schéma :** Similaire au RAID 5, mais il calcule et stocke **deux** blocs de parité indépendants pour chaque bande de données, en utilisant des algorithmes différents.

- **Analyse :**

  - **Performance :** Similaire au RAID 5 en lecture, mais la pénalité d\'écriture est encore plus sévère en raison du double calcul de parité.

  - **Capacité :** La capacité utile est de (N−2)×C.

  - **Tolérance aux pannes :** Très élevée. La grappe peut tolérer la défaillance simultanée de **deux** disques. C\'est devenu une norme pour les grandes grappes de disques de haute capacité.

**RAID 10 (Combinaison de RAID 1 et 0)**

- **Schéma :** C\'est un RAID \"imbriqué\" ou \"hybride\". On commence par créer des paires de disques en miroir (RAID 1), puis on entrelace les données sur ces paires (RAID 0). Il faut un minimum de 4 disques.

- **Analyse :**

  - **Performance :** Excellente. Il combine la haute performance en lecture et en écriture du RAID 0 avec la redondance du RAID 1, sans la surcharge de calcul de parité.

  - **Capacité :** Comme le RAID 1, l\'efficacité est de 50%. La capacité utile est de (N/2)×C.

  - **Tolérance aux pannes :** Très bonne. La grappe peut survivre à la défaillance d\'au moins un disque dans chaque sous-groupe miroir. Dans le meilleur des cas (avec 4 disques), elle peut survivre à la perte de deux disques, tant qu\'ils ne font pas partie du même miroir. C\'est souvent le choix privilégié pour les applications exigeantes comme les bases de données transactionnelles.

Le choix d\'un niveau RAID est de plus en plus influencé par le temps de reconstruction de la grappe. Avec des disques atteignant des capacités de 16 To ou plus, la reconstruction d\'une grappe RAID 5 après une panne peut prendre plusieurs jours. Pendant cette longue période, la grappe est dans un état dégradé et est vulnérable à une seconde panne, qui serait catastrophique. Cette fenêtre de vulnérabilité est devenue inacceptable pour de nombreuses applications critiques. C\'est la raison principale de l\'abandon progressif du RAID 5 au profit du RAID 6, qui peut survivre à une panne de disque survenant *pendant* la reconstruction, et du RAID 10, dont la reconstruction est beaucoup plus rapide (une simple copie miroir au lieu d\'un recalcul de parité sur toute la grappe). C\'est un exemple frappant de la manière dont une tendance technologique (l\'augmentation de la capacité des disques) modifie les meilleures pratiques dans un domaine connexe (la fiabilité du stockage).

Le tableau suivant synthétise les caractéristiques de ces niveaux RAID.

  ------------- -------------------------- -------------- ---------------------------------------- ---------------------- ------------------------ -------------------------- ----------------------------------------------------------------------------
  Niveau RAID   Description                Disques Min.   Capacité Utile (N disques de taille C)   Tolérance aux Pannes   Performance en Lecture   Performance en Écriture    Cas d\'Usage Idéal

  **RAID 0**    Entrelacement              2              N \* C                                   0 disque               Très élevée              Très élevée                Performance maximale, données non critiques (ex: montage vidéo temporaire)

  **RAID 1**    Mise en miroir             2              C                                        N-1 disques            Élevée                   Normale                    Haute disponibilité, données critiques (ex: système d\'exploitation)

  **RAID 5**    Parité distribuée          3              (N-1) \* C                               1 disque               Très élevée              Moyenne (pénalité)         Serveurs de fichiers, bon équilibre coût/performance/redondance

  **RAID 6**    Double parité              4              (N-2) \* C                               2 disques              Très élevée              Faible (double pénalité)   Archivage, grandes grappes où le temps de reconstruction est long

  **RAID 10**   Miroir d\'entrelacements   4              (N/2) \* C                               ≥1 disque par miroir   Très élevée              Très élevée                Bases de données, applications transactionnelles à haute performance
  ------------- -------------------------- -------------- ---------------------------------------- ---------------------- ------------------------ -------------------------- ----------------------------------------------------------------------------

