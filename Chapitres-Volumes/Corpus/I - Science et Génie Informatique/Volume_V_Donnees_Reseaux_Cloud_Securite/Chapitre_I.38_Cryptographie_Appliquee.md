# Chapitre I.38 : Cryptographie Appliquée

## Introduction

La cryptographie, du grec *kryptos* (caché) et *graphein* (écrire), est la science qui se consacre à la protection de l\'information en la transformant en une forme inintelligible pour les entités non autorisées. Loin d\'être une simple curiosité mathématique, elle constitue aujourd\'hui le fondement de la sécurité de notre monde numérique, protégeant les transactions financières, les communications personnelles, les secrets d\'État et l\'intégrité des infrastructures critiques. Ce chapitre a pour vocation de fournir une exploration rigoureuse et mathématiquement fondée des primitives cryptographiques modernes qui orchestrent cette sécurité.

L\'objectif de tout système cryptographique est d\'atteindre un ou plusieurs des quatre objectifs cardinaux de la sécurité de l\'information. Premièrement, la

**confidentialité**, qui assure que seuls les destinataires légitimes peuvent accéder au contenu d\'un message. Deuxièmement, l\'**intégrité**, qui garantit que le message n\'a pas été altéré, accidentellement ou intentionnellement, durant sa transmission. Troisièmement, l\'**authenticité**, qui permet de vérifier de manière irréfutable l\'origine du message, c\'est-à-dire l\'identité de son expéditeur. Enfin, la **non-répudiation**, une propriété plus forte que l\'authenticité, qui empêche un expéditeur de nier ultérieurement avoir envoyé un message qu\'il a pourtant émis.

Au cœur de la cryptographie moderne repose un principe fondamental, formulé au XIXe siècle par Auguste Kerckhoffs. Le **principe de Kerckhoffs** stipule que la sécurité d\'un cryptosystème ne doit reposer que sur le secret de la clé, et non sur le secret de l\'algorithme lui-même. Cette maxime a une implication profonde : elle préconise l\'utilisation d\'algorithmes publics, standardisés et soumis à l\'examen minutieux de la communauté scientifique internationale. Un algorithme qui a résisté à des années d\'analyse par les meilleurs cryptanalystes du monde offre une assurance de robustesse bien supérieure à celle d\'un algorithme secret dont les faiblesses potentielles n\'ont pas été découvertes. C\'est pourquoi les standards comme l\'AES (Advanced Encryption Standard) et RSA sont publics et universellement adoptés.

Le paysage de la cryptographie appliquée se divise en deux continents conceptuels, une dichotomie fondamentale qui structure l\'ensemble du domaine : la cryptographie symétrique et la cryptographie asymétrique.

La **cryptographie symétrique**, également appelée cryptographie à clé secrète, est le paradigme historique. Dans ce modèle, une seule et même clé est utilisée pour les opérations de chiffrement et de déchiffrement. L\'analogie la plus simple est celle d\'un coffre-fort muni d\'une serrure unique. Pour partager un secret, l\'expéditeur place le message dans le coffre, le verrouille avec la clé, et l\'envoie au destinataire. Ce dernier, pour accéder au message, doit posséder une copie exacte de la même clé pour ouvrir le coffre. L\'avantage principal de cette approche réside dans sa rapidité d\'exécution. Les algorithmes symétriques sont des ordres de grandeur plus performants que leurs homologues asymétriques, ce qui les rend idéaux pour chiffrer de grands volumes de données. Cependant, leur talon d\'Achille est le problème de la distribution de la clé : comment les deux parties peuvent-elles s\'accorder sur une clé secrète de manière sécurisée, surtout si elles n\'ont jamais communiqué auparavant?.

C\'est pour résoudre ce dilemme qu\'a été inventée, dans les années 1970, la **cryptographie asymétrique**, ou cryptographie à clé publique. Cette approche constitue une véritable révolution conceptuelle. Elle repose sur l\'utilisation de paires de clés mathématiquement liées : une **clé publique** et une **clé privée**. Reprenons notre analogie : imaginez maintenant un cadenas ouvert. La clé publique est ce cadenas, que l\'on peut distribuer librement à quiconque souhaite nous envoyer un message sécurisé. N\'importe qui peut prendre ce cadenas (la clé publique) et l\'utiliser pour fermer une boîte contenant un message. Cependant, une fois le cadenas fermé, seule la personne détenant la clé unique correspondante -- la clé privée, qui n\'est jamais partagée -- peut l\'ouvrir. Ce mécanisme résout élégamment le problème de la distribution des clés. De plus, il permet une fonctionnalité entièrement nouvelle et essentielle : la signature numérique. En inversant le processus (en \"verrouillant\" avec la clé privée, une opération que seul le détenteur peut faire), on peut prouver l\'origine d\'un message. Le coût de cette flexibilité est une complexité calculatoire nettement plus élevée.

En pratique, les systèmes modernes n\'opposent pas ces deux approches mais les combinent de manière synergique dans ce que l\'on nomme la **cryptographie hybride**. Typiquement, un algorithme asymétrique, plus lent mais résolvant le problème de l\'échange de clés, est utilisé au début d\'une communication pour négocier et transmettre de manière sécurisée une clé de session à usage unique. Une fois cette clé partagée, les deux parties basculent vers un algorithme symétrique, beaucoup plus rapide, pour chiffrer le reste de leurs échanges. C\'est ce mariage pragmatique qui sous-tend la sécurité de protocoles omniprésents comme TLS/SSL (qui sécurise le web via HTTPS), SSH et PGP.

Ce chapitre explorera en détail chacune de ces briques fondamentales, en commençant par les rouages internes des algorithmes symétriques, puis en examinant les fonctions de hachage qui garantissent l\'intégrité, avant de plonger dans les fondements mathématiques des systèmes asymétriques. Nous conclurons en étudiant l\'infrastructure à clés publiques (PKI) qui orchestre la confiance dans ce monde de clés, et nous aborderons un sujet avancé qui repousse les frontières de la confidentialité.

## 38.1 Cryptographie Symétrique

La cryptographie symétrique représente la forme la plus ancienne et la plus intuitive du chiffrement. Son principe repose sur l\'existence d\'une information secrète unique, la clé, partagée entre les correspondants et utilisée à la fois pour transformer un message lisible (texte en clair) en un message inintelligible (texte chiffré) et pour inverser ce processus. La sécurité de l\'ensemble du système repose exclusivement sur la capacité des parties à maintenir cette clé secrète, conformément au principe de Kerckhoffs.

Historiquement, les chiffrements symétriques ont évolué depuis des méthodes simples de substitution (comme le chiffre de César) et de transposition vers des algorithmes d\'une complexité mathématique redoutable. Les approches modernes se classent principalement en deux catégories : les chiffrements par flot et les chiffrements par bloc.

Un **chiffrement par flot** (stream cipher) opère sur les données au niveau du bit ou de l\'octet. Il génère une séquence de bits pseudo-aléatoire, appelée flux de clés (*keystream*), à partir de la clé secrète. Ce flux de clés est ensuite combiné avec le flux de données du texte en clair, généralement via une opération OU exclusif (XOR), pour produire le texte chiffré. Le déchiffrement s\'effectue en générant le même flux de clés et en l\'appliquant de nouveau par XOR au texte chiffré. Le chiffre de Vernam, ou masque jetable (*one-time pad*), est l\'exemple théorique parfait d\'un chiffrement par flot, offrant une sécurité inconditionnelle à condition que la clé soit véritablement aléatoire, aussi longue que le message et utilisée une seule fois.

Un **chiffrement par bloc** (*block cipher*), quant à lui, opère sur des groupes de bits de taille fixe, appelés blocs. Un algorithme de chiffrement par bloc est une fonction mathématique qui prend en entrée un bloc de texte en clair de

n bits et une clé de k bits, et produit en sortie un bloc de texte chiffré de n bits. Pour chiffrer des messages plus longs qu\'un seul bloc, on a recours à des \"modes d\'opération\" qui définissent comment appliquer itérativement l\'algorithme sur des blocs successifs. C\'est cette seconde catégorie, et en particulier son représentant le plus illustre, l\'AES, que nous allons maintenant étudier en profondeur.

### 38.1.1 Chiffrement par flot et par bloc (AES)

#### Le Chiffrement par Bloc : Un paradigme fondamental

Un chiffrement par bloc peut être formalisé comme une famille de permutations paramétrée par une clé. Pour une taille de bloc fixe de n bits, l\'algorithme définit un ensemble de 2n! permutations possibles sur l\'espace des blocs de n bits. La clé, de taille k bits, sert à sélectionner une de ces permutations. L\'espace des clés contient 2k clés possibles, et donc l\'algorithme ne peut sélectionner qu\'un sous-ensemble infime de toutes les permutations possibles. L\'objectif d\'un bon chiffrement par bloc est que ce sous-ensemble de permutations se comporte, du point de vue d\'un cryptanalyste, comme un ensemble de permutations choisies aléatoirement.

La plupart des chiffrements par bloc modernes, y compris l\'AES, sont des chiffrements itératifs. Le processus de chiffrement consiste à appliquer répétitivement une fonction de ronde, plus simple, un certain nombre de fois. Chaque application de cette fonction de ronde transforme l\'état interne des données. La sécurité émerge de la complexité engendrée par la composition de ces multiples rondes.

#### L\'Advanced Encryption Standard (AES)

L\'Advanced Encryption Standard (AES) est le standard de chiffrement symétrique le plus utilisé au monde. Son histoire commence à la fin des années 1990, lorsque le National Institute of Standards and Technology (NIST) américain a lancé un processus de standardisation pour remplacer le Data Encryption Standard (DES), dont la clé de 56 bits était devenue vulnérable aux attaques par force brute. Après un concours public de plusieurs années, l\'algorithme Rijndael, conçu par les cryptographes belges Joan Daemen et Vincent Rijmen, a été sélectionné en 2001 et standardisé sous le nom d\'AES (FIPS 197). L\'AES est approuvé par la NSA pour la protection d\'informations classifiées \"Top Secret\", ce qui témoigne de son niveau de sécurité exceptionnel.

L\'AES est un chiffrement par bloc avec une taille de bloc fixe de 128 bits (16 octets). Il prend en charge trois tailles de clés différentes : 128, 192 et 256 bits. Le nombre de rondes d\'opérations appliquées aux données dépend de la taille de la clé :

> **AES-128 :** Clé de 128 bits, 10 rondes.
>
> **AES-192 :** Clé de 192 bits, 12 rondes.
>
> **AES-256 :** Clé de 256 bits, 14 rondes.

Cette flexibilité permet un compromis ajustable entre performance et niveau de sécurité. AES-128 est le plus rapide et offre déjà une sécurité robuste pour la grande majorité des applications, tandis qu\'AES-256 offre une marge de sécurité encore plus grande au prix d\'une légère augmentation du temps de calcul.

##### Structure Générale : Réseau de Substitution-Permutation (SPN)

Contrairement à son prédécesseur DES, qui est basé sur un réseau de Feistel, l\'AES est un **réseau de substitution-permutation** (SPN, *Substitution-Permutation Network*). Cette structure applique, à chaque ronde, une série de transformations mathématiques à l\'ensemble du bloc de données.

Le bloc de 128 bits en cours de traitement est organisé en une matrice de 4×4 octets, appelée **matrice d\'état** (*state*). Les 16 octets du bloc d\'entrée remplissent cette matrice colonne par colonne. Si le bloc d\'entrée est

b0​,b1​,...,b15​, la matrice d\'état initiale S0​ est :

S0​=​b0​b1​b2​b3​​b4​b5​b6​b7​​b8​b9​b10​b11​​b12​b13​b14​b15​​​

Le processus de chiffrement complet se déroule comme suit :

> **Expansion de clé (KeyExpansion) :** La clé de chiffrement initiale (128, 192 ou 256 bits) est utilisée pour générer une séquence de clés de ronde (*round keys*). Chaque clé de ronde a une taille de 128 bits. Il y a Nr​+1 clés de ronde, où Nr​ est le nombre de rondes.
>
> **Ronde initiale :** Un OU exclusif (XOR) est effectué entre la matrice d\'état initiale et la première clé de ronde (AddRoundKey).
>
> **Rondes principales :** Pour les Nr​−1 rondes suivantes, quatre transformations sont appliquées séquentiellement à la matrice d\'état : SubBytes, ShiftRows, MixColumns, et AddRoundKey.
>
> **Ronde finale :** La dernière ronde est légèrement différente et n\'applique que trois transformations : SubBytes, ShiftRows, et AddRoundKey. L\'opération MixColumns est omise.

Le résultat de cette ronde finale est le bloc de texte chiffré de 128 bits.

##### Les Quatre Transformations de Ronde

Chaque transformation a un rôle mathématique précis et contribue aux propriétés de confusion et de diffusion, identifiées par Claude Shannon comme étant essentielles à la sécurité d\'un chiffrement. La **confusion** vise à rendre la relation entre la clé et le texte chiffré aussi complexe et obscure que possible. La **diffusion** vise à propager l\'influence statistique d\'un seul bit du texte en clair sur de nombreux bits du texte chiffré, dissimulant ainsi les régularités statistiques du message original.

La conception d\'AES est un modèle d\'élégance où chaque transformation remplit un rôle spécifique et complémentaire pour atteindre ces objectifs. SubBytes est la seule étape non linéaire, fournissant la confusion. ShiftRows et MixColumns travaillent de concert pour assurer une diffusion rapide et efficace à travers la matrice d\'état. AddRoundKey est la méthode simple mais cryptographiquement solide pour intégrer la clé secrète dans le processus. Cette architecture synergique est la clé de la robustesse et de l\'efficacité d\'AES, tant en implémentation logicielle que matérielle.

**1. SubBytes (Substitution)**

Cette transformation est une substitution non linéaire où chaque octet de la matrice d\'état est remplacé par un autre octet en utilisant une table de consultation fixe de 16×16 éléments, appelée **S-box** (Boîte de Substitution). L\'opération est appliquée indépendamment à chaque octet de l\'état.

si,j′​=S-box(si,j​)

La S-box est construite avec une grande rigueur mathématique pour résister aux attaques de cryptanalyse linéaire et différentielle. Sa construction se fait en deux étapes sur les octets, vus comme des éléments du corps fini GF(28) (le corps de Galois de 28=256 éléments).

> **Inverse dans GF(28) :** Chaque octet b est remplacé par son inverse multiplicatif dans GF(28) (l\'inverse de 0 est défini comme étant 0). Le polynôme irréductible utilisé pour définir le corps est m(x)=x8+x4+x3+x+1.
>
> **Transformation Affine :** Une transformation affine est ensuite appliquée à chaque bit de l\'octet résultant. Si b0​,...,b7​ sont les bits de l\'octet issu de l\'étape d\'inversion, les nouveaux bits b0′​,...,b7′​ sont calculés comme suit :

​b0′​b1′​b2′​b3′​b4′​b5′​b6′​b7′​​​=​11111000​01111100​00111110​00011111​10001111​11000111​11100011​11110001​​​b0​b1​b2​b3​b4​b5​b6​b7​​​+​11000110​​​

Cette opération est la principale source de non-linéarité dans AES et est donc cruciale pour sa sécurité. Elle assure la **confusion**. Pour le déchiffrement, une S-box inverse (

InvSubBytes) est utilisée, qui applique l\'inverse de la transformation affine puis l\'inverse de l\'inversion dans GF(28).

**2. ShiftRows (Permutation)**

Cette transformation opère sur les rangées de la matrice d\'état. Elle effectue un décalage cyclique vers la gauche sur les trois dernières rangées, avec un offset différent pour chacune.

> La rangée 0 (la première) n\'est pas modifiée.
>
> La rangée 1 est décalée d\'un octet vers la gauche.
>
> La rangée 2 est décalée de deux octets vers la gauche.
>
> La rangée 3 est décalée de trois octets vers la gauche.

Visuellement, si l\'état avant ShiftRows est :

\$\$S = \\begin{pmatrix} s\_{0,0} & s\_{0,1} & s\_{0,2} & s\_{0,3} \\\\ s\_{1,0} & s\_{1,1} & s\_{1,2} & s\_{1,3} \\\\ s\_{2,0} & s\_{2,1} & s\_{2,2} & s\_{2,3} \\\\ s\_{3,0} & s\_{3,1} & s\_{3,2} & s\_{3,3} \\end{pmatrix} \$\$L\'état après \`ShiftRows\` devient :\$\$ S\' = \\begin{pmatrix} s\_{0,0} & s\_{0,1} & s\_{0,2} & s\_{0,3} \\\\ s\_{1,1} & s\_{1,2} & s\_{1,3} & s\_{1,0} \\\\ s\_{2,2} & s\_{2,3} & s\_{2,0} & s\_{2,1} \\\\ s\_{3,3} & s\_{3,0} & s\_{3,1} & s\_{3,2} \\end{pmatrix}\$\$

Le rôle de ShiftRows est de fournir la **diffusion** au niveau des octets entre les colonnes. Après cette étape, chaque colonne de la nouvelle matrice d\'état est composée d\'octets provenant de chacune des quatre colonnes de l\'état précédent. Cela empêche les colonnes d\'être chiffrées indépendamment les unes des autres, ce qui, sans cette étape, réduirait AES à quatre chiffrements par bloc indépendants et beaucoup plus faibles. Pour le déchiffrement, l\'opération

InvShiftRows effectue des décalages cycliques vers la droite.

**3. MixColumns (Diffusion)**

Cette transformation opère indépendamment sur chaque colonne de la matrice d\'état, les traitant comme des polynômes de degré 3 sur le corps GF(28). Chaque colonne est multipliée par une matrice fixe dans ce corps. La multiplication est définie comme suit :

​s0,j′​s1,j′​s2,j′​s3,j′​​​=​02010103​03020101​01030201​01010302​​​s0,j​s1,j​s2,j​s3,j​​​

Où les multiplications et additions sont celles du corps fini GF(28). L\'addition correspond à l\'opération XOR. La multiplication par 01 est l\'identité. La multiplication par 02 correspond à un décalage à gauche d\'un bit, suivi d\'un XOR conditionnel avec 0x1B si le bit de poids fort était 1 (ceci correspond à la réduction par le polynôme m(x)). La multiplication par 03 est équivalente à une multiplication par 02 suivie d\'une addition (XOR) avec la valeur originale.

MixColumns est une étape de **diffusion** cruciale. Elle assure qu\'après quelques rondes, chaque bit du texte chiffré dépend de chaque bit du texte en clair et de chaque bit de la clé. Combinée à ShiftRows, elle garantit une propagation rapide des changements à travers toute la matrice d\'état. Comme mentionné, cette étape est omise dans la dernière ronde pour permettre une structure de déchiffrement plus symétrique et efficace, sans compromettre la sécurité. Le déchiffrement utilise

InvMixColumns, qui multiplie par la matrice inverse.

**4. AddRoundKey (Combinaison de clé)**

C\'est la seule étape qui utilise la clé de chiffrement. Une clé de ronde de 128 bits, dérivée de la clé principale par l\'algorithme KeyExpansion, est combinée avec la matrice d\'état via une simple opération XOR bit à bit. La clé de ronde de 128 bits est vue comme une matrice de

4×4 octets, et chaque octet de la matrice d\'état est XORé avec l\'octet correspondant de la matrice de clé de ronde.

si,j′​=si,j​⊕ki,j​

Cette opération est son propre inverse (puisque A⊕B⊕B=A), ce qui simplifie l\'algorithme de déchiffrement. AddRoundKey est effectuée au début (ronde initiale) et à la fin de chaque ronde principale et finale.

Le déchiffrement AES consiste à appliquer les inverses de ces transformations (InvSubBytes, InvShiftRows, InvMixColumns) dans l\'ordre inverse, en utilisant les clés de ronde dans l\'ordre inverse également.

### 38.1.2 Modes d\'opération

Un algorithme de chiffrement par bloc, tel que l\'AES, ne peut traiter qu\'un seul bloc de données de taille fixe (128 bits pour l\'AES). Pour chiffrer des messages de longueur arbitraire, il est nécessaire d\'utiliser un **mode d\'opération**. Un mode d\'opération définit une méthode pour appliquer de manière répétée un chiffrement par bloc afin de transformer de manière sécurisée des séquences de blocs. Le choix du mode d\'opération est aussi crucial pour la sécurité que le choix de l\'algorithme de chiffrement lui-même.

Un concept central dans de nombreux modes est le **vecteur d\'initialisation (IV)** ou le **nonce** (*number used once*). Il s\'agit d\'une donnée de taille fixe, qui n\'a pas besoin d\'être secrète mais qui doit être unique pour chaque message chiffré avec la même clé. Son rôle est d\'introduire du caractère aléatoire (probabilisme) dans le processus de chiffrement, garantissant que le chiffrement du même message produira des textes chiffrés différents à chaque fois, ce qui est une propriété de sécurité essentielle.

Nous allons analyser les propriétés de quatre modes d\'opération fondamentaux : ECB, CBC, CTR, et le mode moderne GCM. Les propriétés clés à examiner sont la sécurité (confidentialité, intégrité), la capacité de parallélisation (qui affecte la performance) et la gestion de la propagation des erreurs.

#### Electronic Codebook (ECB)

Le mode *Electronic Codebook* (ECB) est le plus simple des modes d\'opération. Le message est découpé en blocs de taille n (128 bits pour AES), et chaque bloc de texte en clair Pi​ est chiffré indépendamment des autres pour produire un bloc de texte chiffré Ci​.

> **Description formelle :**

Chiffrement : Ci​=EK​(Pi​)

Déchiffrement : Pi​=DK​(Ci​)

> **Analyse des propriétés :**

**Sécurité :** La principale faiblesse de l\'ECB est son caractère déterministe. Si deux blocs de texte en clair sont identiques (Pi​=Pj​), alors leurs blocs de texte chiffré correspondants seront également identiques (Ci​=Cj​). Cette propriété préserve les motifs statistiques du texte en clair dans le texte chiffré. L\'exemple classique est le chiffrement d\'une image bitmap : bien que les couleurs individuelles soient modifiées, la structure globale de l\'image (la silhouette d\'un personnage, par exemple) reste parfaitement visible dans l\'image chiffrée. Pour cette raison, le mode ECB est considéré comme fondamentalement non sécuritaire et\
**doit être proscrit** de toute application moderne.

**Parallélisation :** Le chiffrement et le déchiffrement de chaque bloc étant indépendants, les opérations peuvent être entièrement parallélisées, ce qui rend ce mode très rapide.

**Gestion des erreurs :** Une erreur de bit dans un bloc chiffré Ci​ n\'affecte que le déchiffrement du bloc de texte en clair correspondant Pi​. Il n\'y a pas de propagation d\'erreur.

**Remplissage :** Si le dernier bloc de texte en clair est plus court que la taille du bloc, une technique de remplissage (*padding*) est nécessaire.

#### Cipher Block Chaining (CBC)

Le mode *Cipher Block Chaining* (CBC) a été conçu pour surmonter la faiblesse majeure de l\'ECB. Il introduit une dépendance (un \"chaînage\") entre les blocs adjacents. Avant d\'être chiffré, chaque bloc de texte en clair Pi​ est combiné via une opération XOR avec le bloc de texte chiffré *précédent* Ci−1​. Pour le premier bloc, qui n\'a pas de prédécesseur, on utilise un vecteur d\'initialisation (IV) unique et imprévisible.

> **Description formelle :**

Chiffrement : Ci​=EK​(Pi​⊕Ci−1​), avec C0​=IV.

Déchiffrement : Pi​=DK​(Ci​)⊕Ci−1​, avec C0​=IV.

> **Analyse des propriétés :**

**Sécurité :** Le chaînage garantit que même si Pi​=Pj​, les textes chiffrés Ci​ et Cj​ seront différents (tant que leurs blocs chiffrés précédents sont différents). L\'utilisation d\'un IV aléatoire assure que le chiffrement du même message produit des résultats différents. Le CBC offre une bonne confidentialité s\'il est utilisé correctement. Cependant, il ne fournit aucune garantie d\'intégrité et est vulnérable à des attaques sophistiquées comme les attaques par oracle de remplissage (*padding oracle attacks*) si le système révèle des informations sur la validité du remplissage.

**Parallélisation :** Le processus de chiffrement est intrinsèquement séquentiel, car le calcul de Ci​ dépend de Ci−1​. Il ne peut donc pas être parallélisé. En revanche, le déchiffrement peut être parallélisé, car le calcul de Pi​ ne nécessite que Ci​ et Ci−1​, qui sont tous deux connus.

**Gestion des erreurs :** Une erreur de bit dans un bloc chiffré Ci​ a deux conséquences lors du déchiffrement : elle corrompt entièrement le bloc de texte en clair correspondant Pi​, et elle inverse le bit correspondant dans le bloc de texte en clair suivant Pi+1​ (car Pi+1​=DK​(Ci+1​)⊕Ci​). La propagation de l\'erreur est donc limitée.

**Remplissage :** Comme pour l\'ECB, un remplissage est nécessaire si la longueur du message n\'est pas un multiple de la taille du bloc.

#### Counter (CTR)

Le mode Compteur (*Counter*) adopte une approche radicalement différente. Il transforme un chiffrement par bloc en un chiffrement par flot. Au lieu de chiffrer directement les blocs de texte en clair, l\'algorithme de chiffrement par bloc est utilisé pour chiffrer une séquence de valeurs uniques, appelées \"compteurs\". Le résultat de ce chiffrement, un flux de clés pseudo-aléatoire, est ensuite combiné par XOR avec le texte en clair pour produire le texte chiffré. Chaque compteur est généralement formé en concaténant un nonce (unique pour chaque message) avec un numéro de bloc séquentiel.

> **Description formelle :**

Soit un nonce et un compteur ctri​ pour chaque bloc Pi​.

Chiffrement : \$C_i = P_i \\oplus E_K(\\text{nonce} \|

\| ctr_i)\$

\* Déchiffrement : \$P_i = C_i \\oplus E_K(\\text{nonce} \|

\| ctr_i)\$

> **Analyse des propriétés :**

**Sécurité :** La sécurité du mode CTR est excellente, à une condition impérative : la paire (clé, nonce) ne doit **jamais** être réutilisée. Si un nonce est réutilisé avec la même clé pour deux messages différents, un attaquant peut calculer le XOR des deux textes en clair (C1​⊕C2​=(P1​⊕K)⊕(P2​⊕K)=P1​⊕P2​), ce qui compromet gravement la confidentialité. Comme le CBC, le mode CTR n\'offre aucune protection de l\'intégrité.

**Parallélisation :** Le chiffrement de chaque bloc de compteur est indépendant des autres. Par conséquent, le chiffrement et le déchiffrement peuvent être entièrement parallélisés, ce qui rend le mode CTR très performant et adapté aux applications à haut débit.

**Gestion des erreurs :** Une erreur de bit dans un bloc chiffré Ci​ n\'affecte que le bit correspondant dans le bloc de texte en clair Pi​. Il n\'y a pas de propagation d\'erreur, une propriété partagée avec les chiffrements par flot.

**Remplissage :** Aucun remplissage n\'est nécessaire. Le flux de clés peut être tronqué à la longueur exacte du dernier bloc de texte en clair.

#### Galois/Counter Mode (GCM)

Le mode *Galois/Counter Mode* (GCM) est un mode d\'opération moderne qui fournit non seulement la confidentialité, mais aussi l\'intégrité et l\'authenticité des données. Il s\'agit d\'un mode de **chiffrement authentifié avec données associées (AEAD)**. Cela signifie qu\'il peut chiffrer une partie des données (le texte en clair) tout en protégeant l\'intégrité d\'une autre partie laissée en clair (les données associées, comme des en-têtes de paquets réseau).

GCM combine astucieusement le mode CTR pour le chiffrement avec un code d\'authentification de message universel basé sur le hachage dans un corps de Galois, appelé GHASH.

> **Description formelle (simplifiée) :**

**Chiffrement :** La partie chiffrement est identique au mode CTR. Un flux de clés est généré en chiffrant un nonce et un compteur, puis est XORé avec le texte en clair pour produire le texte chiffré.

**Authentification :** Une fonction de hachage (GHASH) est appliquée sur les données associées (s\'il y en a) et sur le texte chiffré produit. GHASH opère par multiplications dans le corps fini GF(2128). Le résultat de ce hachage est ensuite chiffré une dernière fois pour produire une **étiquette d\'authentification** (*authentication tag*).

Le texte chiffré et l\'étiquette d\'authentification sont transmis au destinataire.

**Déchiffrement et Vérification :** Le destinataire déchiffre d\'abord le texte chiffré en utilisant le mode CTR. Ensuite, il recalcule indépendamment l\'étiquette d\'authentification en appliquant GHASH sur les données associées et le texte chiffré qu\'il a reçus. Si l\'étiquette calculée correspond exactement à celle qui a été transmise, le message est considéré comme authentique et intègre, et le texte en clair déchiffré est accepté. Sinon, le déchiffrement échoue, indiquant une possible altération ou une origine non authentique.

> **Analyse des propriétés :**

**Sécurité :** GCM offre un haut niveau de sécurité pour la confidentialité et l\'intégrité, avec des preuves formelles de sécurité. Comme pour le mode CTR, la réutilisation d\'un nonce avec la même clé est catastrophique et détruit toutes les garanties de sécurité.

**Parallélisation :** GCM est conçu pour être très efficace et hautement parallélisable, tant pour le chiffrement que pour l\'authentification, ce qui le rend idéal pour les applications à très haut débit comme les communications réseau et le chiffrement de disques.

**Gestion des erreurs :** Une erreur dans le texte chiffré sera détectée par l\'échec de la vérification de l\'étiquette d\'authentification.

**Remplissage :** Aucun remplissage n\'est nécessaire.

L\'évolution des modes d\'opération, de l\'ECB à GCM, illustre une maturation significative de la compréhension de la sécurité en pratique. La communauté cryptographique a réalisé que la confidentialité seule est rarement suffisante. La plupart des applications nécessitent également une protection contre la manipulation des données. Historiquement, les développeurs devaient combiner manuellement un mode de chiffrement comme CBC avec un code d\'authentification de message (MAC) distinct, une approche connue sous le nom de \"Encrypt-then-MAC\". Ce processus, bien que sécuritaire si bien fait, est complexe et sujet à des erreurs d\'implémentation subtiles mais critiques. L\'avènement et la standardisation de modes AEAD comme GCM ont radicalement simplifié la tâche en offrant une primitive unique qui intègre les deux services de sécurité de manière prouvée. Cela représente une tendance plus large en cryptographie appliquée : s\'éloigner des primitives de bas niveau, difficiles à assembler correctement, pour aller vers des constructions de plus haut niveau, plus robustes et intrinsèquement plus sûres pour les développeurs non-spécialistes.

  ------------------------------------- ------------------------------ --------------------------------- ------------------------------- --------------------------------------
  Propriété                             Electronic Codebook (ECB)      Cipher Block Chaining (CBC)       Counter (CTR)                   Galois/Counter Mode (GCM)

  **Confidentialité**                   Faible (préserve les motifs)   Forte (avec IV aléatoire)         Forte (avec nonce unique)       Forte (avec nonce unique)

  **Authentification/Intégrité**        Aucune                         Aucune                            Aucune                          **Intégrée (AEAD)**

  **Parallélisation (Chiffrement)**     Oui                            Non                               Oui                             Oui

  **Parallélisation (Déchiffrement)**   Oui                            Oui                               Oui                             Oui

  **Propagation d\'Erreur**             Limitée au bloc                Limitée (1 bloc complet, 1 bit)   Limitée au bit                  Échec de la vérification

  **Nécessité de Remplissage**          Oui                            Oui                               Non                             Non

  **Cas d\'usage recommandé**           **À proscrire**                Systèmes hérités (avec MAC)       Chiffrement haute performance   **Standard moderne (TLS 1.3, etc.)**
  ------------------------------------- ------------------------------ --------------------------------- ------------------------------- --------------------------------------

**Tableau 38.1 : Comparaison des Modes d\'Opération de Chiffrement par Bloc**

## 38.2 Fonctions de Hachage Cryptographiques et MAC

Si les algorithmes de chiffrement symétrique et asymétrique sont les piliers de la **confidentialité**, les fonctions de hachage cryptographiques et les codes d\'authentification de message (MAC) sont les gardiens de l\'**intégrité** et de l\'**authenticité**. Ces outils ne sont pas conçus pour cacher l\'information, mais pour créer une empreinte numérique compacte et unique d\'un message, permettant de détecter toute modification ultérieure et, dans le cas des MAC, de vérifier l\'origine de cette empreinte.

### 38.2.1 Fonctions de Hachage Cryptographiques

Une fonction de hachage cryptographique est un algorithme mathématique qui prend en entrée une donnée de taille arbitraire (un message, un fichier, etc.) et produit en sortie une chaîne de bits de taille fixe, appelée condensat, empreinte ou *hash*. Par exemple, l\'algorithme SHA-256 produira toujours une sortie de 256 bits, que l\'entrée soit un seul caractère ou un fichier de plusieurs gigaoctets.

Une propriété fondamentale de ces fonctions est leur caractère **déterministe** : une même entrée produira toujours et immanquablement la même sortie. Elles sont également conçues pour être extrêmement rapides à calculer. Leurs applications sont omniprésentes en informatique et en sécurité :

> **Vérification de l\'intégrité :** En comparant le hachage d\'un fichier avant et après sa transmission, on peut s\'assurer qu\'il n\'a pas été corrompu ou modifié.
>
> **Stockage sécurisé de mots de passe :** Les systèmes ne stockent jamais les mots de passe en clair, mais plutôt leur hachage. Lors de la connexion, le système hache le mot de passe fourni par l\'utilisateur et compare le résultat avec la valeur stockée.
>
> **Briques de base :** Elles sont des composants essentiels pour des mécanismes plus complexes comme les signatures numériques et les codes d\'authentification de message.

Pour qu\'une fonction de hachage soit considérée comme cryptographiquement sûre, elle doit satisfaire trois propriétés fondamentales de résistance aux attaques.

#### Propriétés Fondamentales

Soit H une fonction de hachage cryptographique. Les trois propriétés suivantes doivent être calculatoirement infaisables, c\'est-à-dire qu\'aucun algorithme ne peut les réaliser en un temps polynomial.

> **Résistance à la pré-image (*Preimage Resistance*) :**

**Définition formelle :** Étant donné un condensat h, il est calculatoirement infaisable de trouver une entrée x telle que H(x)=h.

**Intuition :** La fonction est \"à sens unique\". Il est facile de calculer le hachage à partir du message, mais impossible de retrouver le message à partir du hachage. Cette propriété est essentielle pour la sécurité du stockage des mots de passe. Même si un attaquant obtient la base de données des hachages de mots de passe, il ne peut pas en déduire les mots de passe originaux.

> **Résistance à la seconde pré-image (*Second-Preimage Resistance*) :**

**Définition formelle :** Étant donné une entrée x1​, il est calculatoirement infaisable de trouver une seconde entrée distincte x2​=x1​ telle que H(x1​)=H(x2​).

**Intuition :** Il est impossible de trouver un autre message qui produise la même empreinte qu\'un message donné. Cette propriété est cruciale pour l\'intégrité des signatures numériques. Si un attaquant pouvait trouver une seconde pré-image, il pourrait prendre un document légitime signé, créer un document frauduleux avec la même empreinte, et y attacher la signature originale, qui serait alors valide pour le faux document.

> **Résistance aux collisions (*Collision Resistance*) :**

**Définition formelle :** Il est calculatoirement infaisable de trouver n\'importe quelle paire d\'entrées distinctes (x1​,x2​) telle que H(x1​)=H(x2​).

**Intuition :** Il est impossible de trouver deux messages distincts qui partagent la même empreinte. Cette propriété est plus forte que la résistance à la seconde pré-image. Dans le cas de la seconde pré-image, l\'attaquant est contraint par une entrée x1​ fixe. Ici, il a la liberté de choisir les deux messages x1​ et x2​.

**Le paradoxe des anniversaires :** La résistance aux collisions est la propriété la plus difficile à garantir en raison d\'un phénomène probabiliste connu sous le nom de paradoxe des anniversaires. Pour une fonction de hachage produisant une sortie de n bits, une attaque par force brute pour trouver une pré-image nécessite en moyenne 2n essais. Cependant, pour trouver une collision, il ne faut en moyenne que 2n/2 essais. C\'est pourquoi, pour atteindre un niveau de sécurité de 128 bits contre les collisions, il faut une fonction de hachage avec une sortie d\'au moins 256 bits.

#### Constructions : SHA-2 vs. SHA-3

Les standards de fonctions de hachage les plus répandus aujourd\'hui appartiennent aux familles SHA-2 et SHA-3, toutes deux standardisées par le NIST.

> SHA-2 (Secure Hash Algorithm 2) :\
> La famille SHA-2, publiée en 2001, comprend plusieurs variantes, dont les plus connues sont SHA-256 et SHA-512, qui produisent respectivement des condensats de 256 et 512 bits.24 SHA-2 est basé sur la\
> **construction Merkle-Damgård**.

**Structure Merkle-Damgård :** Cette construction est une méthode itérative. Le message d\'entrée est d\'abord complété (*padded*) pour que sa longueur soit un multiple d\'une taille de bloc fixe (par exemple, 512 bits pour SHA-256), et la longueur originale du message est ajoutée à la fin. Le message est ensuite divisé en blocs. Une fonction de compression interne f prend en entrée l\'état de chaînage précédent hi−1​ et le bloc de message courant mi​ pour produire le nouvel état de chaînage hi​=f(hi−1​,mi​). Le processus commence avec un vecteur d\'initialisation fixe h0​, et le condensat final est le dernier état de chaînage.

**Vulnérabilité :** Bien que robuste, la construction Merkle-Damgård présente une faiblesse structurelle : elle est vulnérable aux **attaques par extension de longueur** (*length extension attacks*). Si un attaquant connaît le hachage H(m) d\'un message secret m et la longueur de m, il peut calculer \$H(m \|

\| m\')\$, où m′ est une extension de son choix, sans connaître m. Cette propriété peut être problématique dans certains protocoles où la fonction de hachage est utilisée de manière naïve pour construire un MAC, par exemple

MAC=H(cleˊ∣∣message).

> SHA-3 (Secure Hash Algorithm 3) :\
> Face aux succès des attaques contre les fonctions plus anciennes comme MD5 et SHA-1, et par crainte que des faiblesses similaires puissent un jour être découvertes dans la structure Merkle-Damgård de SHA-2, le NIST a lancé en 2007 un concours public pour développer un nouveau standard de hachage.24 Le gagnant, annoncé en 2012 et standardisé en 2015, est l\'algorithme\
> **Keccak**, qui est devenu SHA-3.

**Structure en éponge (*Sponge Construction*) :** SHA-3 est radicalement différent de SHA-2. Il est basé sur une structure appelée **construction en éponge**. Une fonction éponge est une transformation qui prend une entrée de longueur variable et produit une sortie de longueur variable. Elle opère sur un état interne de\
b bits, où b=r+c. La partie r (le *rate*) est la taille des blocs de message traités, et la partie c (la *capacity*) est une partie de l\'état qui n\'est ni affectée directement par les blocs d\'entrée ni utilisée directement dans les blocs de sortie. La sécurité de la construction dépend de la taille de c.

Le processus se déroule en deux phases :

**Phase d\'absorption :** Le message d\'entrée, découpé en blocs de taille r, est combiné par XOR avec la partie r de l\'état interne, tour après tour. Entre chaque absorption de bloc, une fonction de permutation interne fixe et non-linéaire f est appliquée à l\'ensemble de l\'état de b bits pour le mélanger.

**Phase d\'essorage :** Une fois tous les blocs du message absorbés, la fonction de permutation f est appliquée de manière répétée. Après chaque application, les r premiers bits de l\'état sont extraits pour former les blocs successifs du condensat de sortie.

**Avantages :** La construction en éponge n\'est pas vulnérable aux attaques par extension de longueur, ce qui la rend intrinsèquement plus robuste pour de nombreuses applications. Elle offre également une grande flexibilité, permettant de générer des sorties de n\'importe quelle longueur.

La décision de standardiser SHA-3 alors que SHA-2 n\'était pas (et n\'est toujours pas) considéré comme cassé est une illustration d\'une stratégie de gestion des risques à long terme dans l\'écosystème cryptographique. Les failles découvertes dans MD5 et SHA-1 ont mis en évidence le danger de dépendre d\'une seule famille de constructions cryptographiques. En standardisant SHA-3, basé sur des principes mathématiques entièrement différents de SHA-2, la communauté de la sécurité s\'est dotée d\'une alternative robuste. Si une avancée cryptanalytique venait à menacer la construction Merkle-Damgård, les systèmes pourraient migrer vers SHA-3. Cette diversification est une leçon fondamentale de résilience : la sécurité d\'un écosystème ne dépend pas seulement de la force d\'un algorithme unique, mais aussi de la diversité et de la disponibilité d\'alternatives fiables.

### 38.2.2 Codes d\'Authentification de Message (MAC)

Une fonction de hachage seule peut garantir l\'intégrité d\'un message, mais pas son authenticité. N\'importe qui peut calculer le hachage d\'un message, y compris un attaquant qui pourrait modifier le message et simplement recalculer le nouveau hachage. Pour lier l\'intégrité à une origine spécifique, il faut introduire un secret. C\'est le rôle du **Code d\'Authentification de Message** (MAC, *Message Authentication Code*).

Un MAC est un petit bloc d\'information utilisé pour authentifier un message. Il est généré par un algorithme qui prend en entrée le message et une clé secrète partagée entre l\'expéditeur et le destinataire. Le MAC est ensuite joint au message. Le destinataire, qui possède la même clé secrète, peut recalculer le MAC à partir du message reçu et le comparer à celui qui a été transmis. Si les deux correspondent, le destinataire peut être assuré que le message n\'a pas été altéré (intégrité) et qu\'il provient bien de l\'expéditeur qui partage la clé secrète (authenticité).

#### Construction HMAC (Hash-based MAC)

Il existe de nombreuses façons de construire un MAC, mais la plus répandue et la plus standardisée est la construction **HMAC** (*Hash-based Message Authentication Code*), spécifiée dans la RFC 2104. HMAC a l\'avantage de pouvoir être utilisé avec n\'importe quelle fonction de hachage cryptographique itérative existante, comme SHA-256. Sa conception a été spécifiquement pensée pour être résistante aux attaques connues contre des constructions plus simples.

La formule mathématique de HMAC est la suivante :

HMAC(K,m)=H((K0​⊕opad)∣∣H((K0​⊕ipad)∣∣m))

où :

> H est la fonction de hachage cryptographique (ex: SHA-256).
>
> K est la clé secrète.
>
> m est le message.
>
> K0​ est la clé K traitée pour avoir la même taille que le bloc interne de la fonction de hachage.
>
> ipad (*inner padding*) est une constante de la taille d\'un bloc, constituée de l\'octet 0x36 répété.
>
> opad (*outer padding*) est une constante de la taille d\'un bloc, constituée de l\'octet 0x5C répété.
>
> ∣∣ dénote la concaténation.
>
> ⊕ dénote l\'opération OU exclusif (XOR) bit à bit.

L\'algorithme se déroule comme suit  :

> **Préparation de la clé (K0​) :** La taille de bloc interne de la fonction de hachage, notée B, est de 64 octets (512 bits) pour SHA-1 et SHA-256, et de 128 octets (1024 bits) pour SHA-512.

Si la clé K est plus longue que B, elle est d\'abord hachée avec H pour produire une clé de la taille de la sortie de H. Le résultat est K0​.

Si la clé K est plus courte que B, elle est complétée par des zéros à droite jusqu\'à atteindre la longueur B. Le résultat est K0​.

Si la clé K a exactement la longueur B, alors K0​=K.

> **Calcul du hachage interne :** La clé préparée K0​ est XORée avec ipad. Le message m est ensuite concaténé à ce résultat. La fonction de hachage H est appliquée à l\'ensemble.\
> hashinterne​=H((K0​⊕ipad)∣

\| m)

\$\$

> **Calcul du hachage externe :** La clé préparée K0​ est XORée avec opad. Le résultat du hachage interne est ensuite concaténé à ce résultat. La fonction de hachage H est appliquée une seconde fois à cet ensemble pour produire le HMAC final.\
> HMAC=H((K0​⊕opad)∣

\| \\text{hash}\_{\\text{interne}})

\$\$

Cette structure à double hachage imbriqué est la clé de la sécurité de HMAC. La première passe (interne) mélange la clé avec le message, mais le résultat intermédiaire n\'est pas exposé. La seconde passe (externe) mélange à nouveau la clé avec le résultat de la première passe. Cette conception protège efficacement contre les attaques par extension de longueur, car l\'attaquant ne connaît pas le résultat du hachage interne, qui est nécessaire pour étendre le calcul. La sécurité de HMAC a été formellement prouvée, montrant qu\'une attaque contre HMAC implique une attaque contre la fonction de hachage sous-jacente elle-même.

##### Exemple Numérique de HMAC

Illustrons le processus avec un exemple simple.

> Fonction de hachage H: SHA-1 (pour la simplicité, bien que SHA-256 soit recommandé en pratique). Taille de bloc B=64 octets, taille de sortie L=20 octets.
>
> Clé K: \"key\" (3 octets, en ASCII hex: 0x6b6579).
>
> Message m: \"The quick brown fox jumps over the lazy dog\"
>
> Préparation de la clé : La clé 0x6b6579 est plus courte que 64 octets. On la complète avec 61 octets nuls pour obtenir K0​.\
> K0​=0x6b65790000\...00 (64 octets).
>
> **Calcul du hachage interne :**

ipad est l\'octet 0x36 répété 64 fois.

K0​⊕ipad est calculé.

Le message m est concaténé à la suite.

On applique SHA-1 à cette concaténation.\
\$\\text{hash}\_{\\text{interne}} = \\text{SHA-1}((K_0 \\oplus \\text{ipad}) \|

\| m)\$

> **Calcul du hachage externe :**

opad est l\'octet 0x5C répété 64 fois.

K0​⊕opad est calculé.

Le hashinterne​ de 20 octets est concaténé à la suite.

On applique SHA-1 à cette nouvelle concaténation.\
\$\\text{HMAC} = \\text{SHA-1}((K_0 \\oplus \\text{opad}) \|

\| \\text{hash}\_{\\text{interne}})\$

Le résultat final est le HMAC-SHA1 de 20 octets (160 bits) : 0xde7c9b85b8b78aa6bc8a7a36f70a90701c9db4d9.

## 38.3 Cryptographie Asymétrique (Clé Publique)

La cryptographie asymétrique, introduite publiquement par Whitfield Diffie et Martin Hellman en 1976, a marqué une rupture paradigmatique dans l\'histoire de la protection de l\'information. En dissociant la clé de chiffrement de la clé de déchiffrement, elle a résolu le problème fondamental de la distribution sécurisée des clés qui avait limité la cryptographie symétrique pendant des siècles. De plus, elle a donné naissance à un concept entièrement nouveau : la signature numérique, qui est devenue la pierre angulaire de la confiance dans les transactions électroniques.

Le principe repose sur la génération de paires de clés : une **clé publique**, qui peut être diffusée largement sans compromettre la sécurité, et une **clé privée**, qui doit être gardée absolument secrète par son propriétaire. Ces deux clés sont mathématiquement liées de telle sorte qu\'un message chiffré avec la clé publique ne peut être déchiffré qu\'avec la clé privée correspondante, et vice-versa.

La sécurité de tous les systèmes à clé publique repose sur l\'existence de **fonctions à sens unique avec trappe** (*trapdoor one-way functions*). Une fonction à sens unique est une fonction facile à calculer dans un sens, mais calculatoirement très difficile à inverser. Par exemple, multiplier deux grands nombres premiers est facile, mais factoriser leur produit est très difficile. La \"trappe\" est une information secrète (la clé privée) qui, si elle est connue, rend l\'inversion de la fonction facile. C\'est sur la difficulté de ces problèmes mathématiques que repose la confiance que nous accordons à ces systèmes.

### 38.3.1 Algorithmes

Nous allons explorer trois familles d\'algorithmes asymétriques qui dominent le paysage cryptographique, chacune reposant sur un problème mathématique difficile différent.

#### RSA

L\'algorithme RSA, du nom de ses inventeurs Ron Rivest, Adi Shamir et Leonard Adleman (1977), est le système de chiffrement à clé publique le plus connu et le plus anciennement utilisé.

> Fondements Mathématiques : La difficulté de la factorisation\
> La sécurité de l\'algorithme RSA repose entièrement sur la difficulté calculatoire de la factorisation des grands nombres entiers.41 Plus précisément, étant donné un grand nombre\
> n qui est le produit de deux grands nombres premiers p et q, il est extrêmement difficile de retrouver p et q à partir de n. Alors que la multiplication p×q est triviale, l\'opération inverse, la factorisation, n\'admet aucun algorithme efficace (en temps polynomial) connu sur un ordinateur classique. Le meilleur algorithme connu, le crible général de corps de nombres (GNFS), a une complexité sous-exponentielle, ce qui signifie que le temps de calcul augmente de manière drastique avec la taille de n. C\'est cette asymétrie de complexité qui constitue la fonction à sens unique de RSA. La connaissance des facteurs p et q est la \"trappe\" qui permet de déchiffrer efficacement.
>
> Génération des Clés\
> Le processus de génération d\'une paire de clés RSA est le suivant 1 :

**Sélection des nombres premiers :** Choisir deux très grands nombres premiers distincts, p et q. Pour garantir la sécurité, ces nombres doivent être choisis de manière aléatoire et avoir une taille similaire (par exemple, 1024 bits chacun pour une clé de 2048 bits).

**Calcul du module :** Calculer le module de chiffrement n=p×q. La taille de la clé RSA est la taille en bits de n.

**Calcul de l\'indicatrice d\'Euler :** Calculer ϕ(n)=(p−1)(q−1). Cette valeur représente le nombre d\'entiers positifs inférieurs à n et premiers avec n. Elle est cruciale car, selon le théorème d\'Euler, pour tout entier m premier avec n, on a mϕ(n)≡1(modn).

**Choix de l\'exposant public :** Choisir un entier e tel que 1\<e\<ϕ(n) et pgcd(e,ϕ(n))=1. L\'exposant e doit être premier avec ϕ(n). Un choix commun pour e est 65537 (216+1), car il est premier et ne contient que deux bits à 1, ce qui rend l\'opération de chiffrement (exponentiation) plus rapide.

**Calcul de l\'exposant privé :** Calculer l\'entier d qui est l\'inverse multiplicatif modulaire de e modulo ϕ(n). C\'est-à-dire, trouver d tel que d⋅e≡1(modϕ(n)). Cet entier d existe et est unique (modulo ϕ(n)) car e est premier avec ϕ(n). Il peut être calculé efficacement à l\'aide de l\'algorithme d\'Euclide étendu.

> La **clé publique** est la paire (n,e). La **clé privée** est la paire (n,d). Les nombres p, q et ϕ(n) doivent être gardés secrets et peuvent être détruits après le calcul de d.
>
> Chiffrement et Déchiffrement\
> Pour chiffrer un message M (représenté comme un entier tel que 0≤M\<n), l\'expéditeur utilise la clé publique du destinataire (n,e) :

**Chiffrement :** C≡Me(modn)

> Le résultat C est le texte chiffré. Pour déchiffrer, le destinataire utilise sa clé privée (n,d) :

**Déchiffrement :** M≡Cd(modn)

La correction de l\'opération découle du théorème d\'Euler. Puisque d⋅e≡1(modϕ(n)), il existe un entier k tel que d⋅e=1+k⋅ϕ(n). Ainsi :Cd≡(Me)d≡Med≡M1+kϕ(n)≡M⋅(Mϕ(n))k(modn)Selon le théorème d\'Euler, Mϕ(n)≡1(modn). Donc :M⋅(1)k≡M(modn)Le message original M est bien retrouvé.

#### Échange de clés Diffie-Hellman

L\'algorithme de Diffie-Hellman (DH) n\'est pas un algorithme de chiffrement, mais un **protocole d\'accord de clé**. Il permet à deux parties qui n\'ont jamais communiqué auparavant d\'établir un secret partagé sur un canal de communication non sécurisé, sans jamais transmettre le secret lui-même.

> Fondements Mathématiques : Le problème du logarithme discret\
> La sécurité du protocole DH repose sur la difficulté du problème du logarithme discret (DLP) dans un groupe cyclique fini.46

**Définition du DLP :** Soit G un groupe cyclique fini, par exemple le groupe multiplicatif des entiers modulo un grand nombre premier p, noté (Z/pZ)∗. Soit g un générateur de ce groupe. Étant donné un élément y∈G, le problème du logarithme discret consiste à trouver l\'entier unique x (tel que 0≤x\<∣G∣) pour lequel y=gx(modp).

**Fonction à sens unique :** L\'opération d\'exponentiation modulaire, gx(modp), est facile à calculer, même pour de très grands nombres, grâce à des algorithmes comme l\'exponentiation par carré. En revanche, l\'opération inverse, le calcul du logarithme discret x=logg​y, est considérée comme calculatoirement infaisable pour des groupes bien choisis. C\'est cette asymétrie qui est exploitée.

> Le Protocole\
> Le déroulement du protocole est le suivant 50 :

**Accord public :** Alice et Bob s\'accordent publiquement sur les paramètres du groupe : un grand nombre premier p et un générateur g du groupe (Z/pZ)∗. Ces valeurs, p et g, peuvent être transmises en clair et interceptées par un attaquant.

**Génération des secrets privés :**

Alice choisit un entier secret aléatoire a, sa clé privée.

Bob choisit un entier secret aléatoire b, sa clé privée.

**Calcul et échange des clés publiques :**

Alice calcule sa clé publique A=ga(modp) et l\'envoie à Bob.

Bob calcule sa clé publique B=gb(modp) et l\'envoie à Alice.

**Calcul du secret partagé :**

Alice reçoit B de Bob et calcule le secret partagé S=Ba(modp).

Bob reçoit A d\'Alice et calcule le secret partagé S=Ab(modp).

Les deux parties arrivent au même secret, car :S=Ba=(gb)a=gba(modp)etS=Ab=(ga)b=gab(modp)Un attaquant, Ève, qui intercepte la communication, ne connaît que p,g,A et B. Pour calculer le secret S=gab(modp), elle devrait d\'abord trouver a à partir de A=ga ou b à partir de B=gb, ce qui revient à résoudre le problème du logarithme discret. Le problème de calculergab à partir de ga et gb est appelé le **problème calculatoire de Diffie-Hellman (CDH)**. Il est supposé être aussi difficile que le DLP.

#### Cryptographie sur les Courbes Elliptiques (ECC)

La cryptographie sur les courbes elliptiques (ECC, *Elliptic Curve Cryptography*) n\'est pas un algorithme en soi, mais une approche qui permet de transposer des protocoles existants comme Diffie-Hellman et les signatures numériques dans un cadre mathématique différent et plus efficace.

> Fondements Mathématiques : Le problème du logarithme discret sur courbe elliptique\
> Au lieu de travailler avec des nombres dans un groupe multiplicatif modulo p, l\'ECC opère sur les points d\'une courbe elliptique définie sur un corps fini. Une courbe elliptique peut être visualisée comme l\'ensemble des points (x,y) satisfaisant une équation de la forme :\
> y2=x3+ax+b(modp)\
> où a et b sont des constantes et p est un grand nombre premier, avec la contrainte 4a3+27b2=0(modp) pour éviter les singularités.\
> L\'aspect remarquable de ces courbes est qu\'on peut y définir une \"addition\" de points : étant donné deux points P et Q sur la courbe, il existe une règle géométrique (basée sur la droite passant par P et Q) pour définir un troisième point R=P+Q qui se trouve également sur la courbe. Cet ensemble de points, muni de l\'opération d\'addition et d\'un point spécial appelé \"point à l\'infini\" (l\'élément neutre), forme un groupe abélien.\
> On peut alors définir la multiplication scalaire : k⋅P=P+P+⋯+P (k fois). Cette opération est l\'analogue de l\'exponentiation modulaire. Elle est facile à calculer. L\'opération inverse est le **problème du logarithme discret sur courbe elliptique (ECDLP)** :

**Définition de l\'ECDLP :** Étant donné un point de base (générateur) P et un autre point Q sur la courbe, trouver l\'entier k tel que Q=k⋅P.

> L\'avantage de l\'ECC : Efficacité et taille des clés\
> Le principal avantage de l\'ECC est que l\'ECDLP est considéré comme un problème mathématique \"plus difficile\" que la factorisation ou le DLP classique pour une même taille de paramètres. Les meilleurs algorithmes connus pour résoudre l\'ECDLP (comme l\'algorithme rho de Pollard) ont une complexité entièrement exponentielle, alors que les algorithmes pour la factorisation (GNFS) sont sous-exponentiels.52\
> Cette différence de \"dureté\" a une conséquence pratique spectaculaire : pour atteindre un niveau de sécurité équivalent, l\'ECC nécessite des clés beaucoup plus petites que RSA ou DH. Par exemple, pour un niveau de sécurité équivalent à une clé symétrique de 128 bits, RSA nécessite une clé de 3072 bits, tandis que l\'ECC n\'a besoin que d\'une clé de 256 bits.

  --------------------------- ----------------------------- --------------------------
  Niveau de Sécurité (bits)   Taille de Clé RSA/DH (bits)   Taille de Clé ECC (bits)

  80                          1024                          160

  112                         2048                          224

  128                         3072                          256

  192                         7680                          384

  256                         15360                         512
  --------------------------- ----------------------------- --------------------------

**Tableau 38.2 : Comparaison des Niveaux de Sécurité (RSA vs. ECC)**

Cette réduction drastique de la taille des clés se traduit par des gains significatifs en termes de performance :

> Calculs plus rapides (moins de multiplications à effectuer).
>
> Consommation d\'énergie réduite.
>
> Besoins en stockage et en bande passante moindres.

Ces avantages ont fait de l\'ECC le choix privilégié pour les environnements aux ressources contraintes, tels que les appareils mobiles, les cartes à puce et les objets connectés (IoT), ainsi que pour les applications nécessitant une haute performance comme les cryptomonnaies. L\'évolution de RSA vers ECC n\'est donc pas une simple préférence technique, mais une conséquence directe des avancées en théorie des nombres et de leurs implications concrètes en ingénierie. La \"dureté\" relative des problèmes mathématiques sous-jacents dicte l\'efficacité et la faisabilité des systèmes sécurisés dans le monde réel.

### 38.3.2 Signatures numériques

La signature numérique est un mécanisme cryptographique qui permet de garantir l\'authenticité, l\'intégrité et la non-répudiation d\'un document ou d\'un message numérique. Elle est l\'analogue électronique de la signature manuscrite, mais avec des garanties de sécurité bien plus fortes. Elle repose sur la combinaison d\'une fonction de hachage et de la cryptographie asymétrique.

> Processus de Création (Signature)\
> Pour qu\'Alice signe un document, elle suit deux étapes 29 :

**Hachage du document :** Alice calcule d\'abord l\'empreinte numérique du document à l\'aide d\'une fonction de hachage cryptographique robuste (par exemple, SHA-256). Cela produit un condensat de taille fixe, h=H(document). Le hachage est essentiel car il est beaucoup plus efficace de signer une petite empreinte de taille fixe que de signer un document potentiellement très long. De plus, il lie la signature à l\'intégralité du contenu du document.

**Chiffrement du hachage avec la clé privée :** Alice utilise ensuite sa **clé privée** pour chiffrer le condensat h. Dans le cas de RSA, cela correspond au calcul σ=hd(modn). Le résultat, σ, est la signature numérique. Elle est ensuite jointe au document original.

> Processus de Vérification\
> Pour que Bob vérifie la signature d\'Alice, il a besoin du document, de la signature σ, et de la clé publique d\'Alice.

**Hachage du document reçu :** Bob calcule de son côté l\'empreinte du document qu\'il a reçu, en utilisant la même fonction de hachage qu\'Alice : h′=H(document).

**Déchiffrement de la signature avec la clé publique :** Bob utilise la clé publique d\'Alice pour déchiffrer la signature σ. Dans le cas de RSA, il calcule hverif​=σe(modn).

**Comparaison :** Bob compare les deux condensats, h′ et hverif​. Si h′=hverif​, la signature est valide. Sinon, elle est invalide.

> Propriétés Garanties\
> Ce processus simple mais puissant fournit les trois garanties de sécurité fondamentales 4 :

**Authenticité :** Puisque la signature ne peut être déchiffrée correctement qu\'avec la clé publique d\'Alice, cela prouve qu\'elle a bien été créée avec la clé privée correspondante, que seule Alice est censée posséder. L\'identité du signataire est donc authentifiée.

**Intégrité :** La signature est liée à l\'empreinte du document. Si le document a été modifié, même d\'un seul bit, après sa signature, le hachage h′ calculé par Bob sera différent du hachage original h (déchiffré de la signature). La comparaison échouera, révélant l\'altération.

**Non-répudiation :** Comme seule Alice possède sa clé privée, elle ne peut pas nier avoir signé le document. La signature constitue une preuve cryptographique de son consentement ou de son approbation du contenu du document.

## 38.4 Infrastructure à Clés Publiques (PKI) et Certificats Numériques

La cryptographie asymétrique résout le problème de l\'échange de clés, mais elle en introduit un nouveau, tout aussi fondamental : le **problème de la confiance**. Comment Alice peut-elle être certaine que la clé publique qu\'elle utilise pour communiquer avec Bob appartient bien à Bob, et non à un imposteur, Ève, qui aurait substitué sa propre clé?. Sans un mécanisme pour lier de manière fiable une clé publique à une identité, l\'ensemble de l\'édifice de la sécurité asymétrique est vulnérable à des attaques de type \"homme du milieu\" (

*man-in-the-middle*).

La solution à ce problème n\'est pas purement technique, mais repose sur la création d\'un système de confiance organisé. C\'est le rôle de l\'**Infrastructure à Clés Publiques** (PKI, *Public Key Infrastructure*).

### 38.4.1 Le Problème de la Confiance et les Certificats Numériques

La PKI est un ensemble de rôles, de politiques, de matériel, de logiciels et de procédures nécessaires pour créer, gérer, distribuer, utiliser, stocker et révoquer des certificats numériques. L\'élément central de cette infrastructure est le

**certificat numérique**.

Un certificat numérique est un document électronique qui agit comme un \"passeport\" ou une \"carte d\'identité\" numérique. Son but principal est de lier une clé publique à une identité spécifique (une personne, une organisation, un serveur web, un appareil, etc.). Pour ce faire, il est signé numériquement par une entité de confiance, une

**Autorité de Certification (AC)**.

#### Standard X.509

Le format le plus largement utilisé pour les certificats numériques est défini par la norme **X.509** de l\'Union Internationale des Télécommunications (UIT). Un certificat X.509 version 3, le standard actuel, contient un ensemble de champs structurés qui fournissent les informations nécessaires à l\'établissement de la confiance.

La structure d\'un certificat X.509 v3 inclut les champs suivants  :

> **Version :** Indique la version du format du certificat (généralement v3).
>
> **Numéro de Série :** Un numéro unique attribué au certificat par l\'AC émettrice pour le distinguer de tous les autres certificats qu\'elle a émis.
>
> **Algorithme de Signature :** L\'identifiant de l\'algorithme utilisé par l\'AC pour signer le certificat (par exemple, sha256WithRSAEncryption).
>
> **Émetteur (Issuer) :** Le Nom Distinctif (DN, *Distinguished Name*) de l\'Autorité de Certification qui a émis et signé le certificat.
>
> **Période de Validité :** Une paire de dates, \"Not Before\" et \"Not After\", qui définissent la période pendant laquelle le certificat est considéré comme valide.
>
> **Sujet (Subject) :** Le Nom Distinctif de l\'entité dont la clé publique est certifiée. Pour un certificat de serveur web, ce champ contient généralement le nom commun (CN, *Common Name*) du domaine (par exemple, www.exemple.com).
>
> **Informations sur la Clé Publique du Sujet :** Ce champ contient deux éléments : l\'algorithme de la clé publique (par exemple, RSA ou ECC) et la clé publique elle-même.
>
> **Extensions (v3) :** C\'est une partie cruciale des certificats modernes. Les extensions permettent d\'ajouter des informations supplémentaires et des contraintes. Les plus importantes incluent :

Key Usage : Spécifie les usages cryptographiques autorisés pour la clé (par exemple, signature numérique, chiffrement de clé, etc.).

Subject Alternative Name (SAN) : Permet de lier le certificat à plusieurs identités, comme plusieurs noms de domaine ou adresses IP. C\'est aujourd\'hui le champ standard pour identifier les sites web.

Basic Constraints : Indique si le certificat appartient à une AC et peut donc être utilisé pour émettre d\'autres certificats.

> **Signature de l\'Émetteur :** Le cœur du certificat. Il s\'agit de la signature numérique de l\'ensemble des champs précédents, calculée en utilisant la clé privée de l\'AC émettrice. C\'est cette signature qui confère au certificat son authenticité et son intégrité.

### 38.4.2 Architecture de l\'Infrastructure à Clés Publiques (PKI)

Une PKI est organisée de manière hiérarchique, basée sur un modèle de confiance transitive.

#### Composants Clés

Les principaux acteurs d\'une PKI sont  :

> **Autorité de Certification (AC ou CA - *Certificate Authority*) :** C\'est l\'entité centrale qui est digne de confiance. Son rôle est de vérifier l\'identité des demandeurs de certificats et, si la vérification est réussie, d\'émettre et de signer numériquement leurs certificats. Elle est également responsable de la gestion du cycle de vie des certificats, y compris leur révocation.
>
> **Autorité d\'Enregistrement (AE ou RA - *Registration Authority*) :** Souvent un composant de l\'AC, l\'AE est responsable de l\'identification et de l\'authentification des demandeurs de certificats. Elle ne signe pas les certificats mais valide les demandes avant de les transmettre à l\'AC.
>
> **Listes de Révocation de Certificats (CRL) / Protocole OCSP :** Des mécanismes par lesquels une AC peut déclarer qu\'un certificat précédemment émis n\'est plus valide avant sa date d\'expiration (par exemple, si la clé privée a été compromise).
>
> **Référentiel de certificats :** Une base de données publique où les certificats et les CRL sont stockés et accessibles.

#### La Chaîne de Confiance (**Chain of Trust**)

La confiance dans une PKI n\'est pas absolue mais est établie à travers une **chaîne de confiance** hiérarchique.

> **Autorité de Certification Racine (Root CA) :** Au sommet de la hiérarchie se trouve l\'AC Racine. C\'est l\'ancre de confiance de tout le système. Un certificat d\'AC Racine est **auto-signé**, ce qui signifie que l\'émetteur et le sujet sont les mêmes. La confiance dans une AC Racine n\'est pas établie cryptographiquement, mais par des moyens externes : des audits rigoureux, des politiques de sécurité strictes et une réputation établie. Les certificats des AC Racines publiques de confiance (comme DigiCert, Sectigo, Let\'s Encrypt) sont pré-installés dans les \"magasins de confiance\" (\
> *trust stores*) de nos navigateurs web et systèmes d\'exploitation. La sécurité de la clé privée d\'une AC Racine est primordiale ; elle est généralement conservée hors ligne dans des modules matériels de sécurité (HSM) hautement protégés.
>
> **Autorités de Certification Intermédiaires (Intermediate CAs) :** Pour des raisons de sécurité, les AC Racines n\'émettent que très rarement des certificats directement aux entités finales. Au lieu de cela, elles signent les certificats d\'**AC Intermédiaires**. Ces AC intermédiaires sont alors autorisées à émettre des certificats pour d\'autres AC intermédiaires ou pour les entités finales. Cela crée une chaîne : le certificat de l\'AC intermédiaire est signé par la racine, et le certificat de l\'entité finale est signé par l\'intermédiaire. Cette structure permet de limiter les conséquences d\'une compromission : si la clé d\'une AC intermédiaire est compromise, seule la partie de l\'arbre sous cette AC doit être révoquée, sans affecter la racine.
>
> **Certificat d\'Entité Finale (*End-Entity Certificate*) :** C\'est le certificat délivré à l\'utilisateur final, par exemple un serveur web. Il se trouve au bas de la chaîne de confiance.

#### Processus de Validation d\'un Certificat

Lorsqu\'un navigateur se connecte à un site web sécurisé (HTTPS), il reçoit le certificat du serveur. Pour le valider, il effectue le processus suivant  :

> Le navigateur vérifie la signature du certificat du serveur en utilisant la clé publique de l\'AC émettrice (qui est spécifiée dans le champ \"Émetteur\" du certificat).
>
> Pour obtenir cette clé publique, le navigateur examine le certificat de l\'AC intermédiaire, qui est généralement fourni par le serveur en même temps que son propre certificat.
>
> Le navigateur vérifie alors la signature du certificat de l\'AC intermédiaire en utilisant la clé publique de l\'AC qui l\'a signé (qui peut être une autre intermédiaire ou l\'AC Racine).
>
> Ce processus se répète, remontant la chaîne de certificats, jusqu\'à ce que le navigateur atteigne un certificat d\'AC Racine qui est présent dans son magasin de confiance.
>
> Si chaque signature dans la chaîne est valide, si aucun certificat n\'a expiré ou n\'a été révoqué, et si le nom de domaine dans le certificat correspond au site visité, alors le certificat est considéré comme valide, et une connexion sécurisée est établie.

La PKI est donc bien plus qu\'une simple application de la cryptographie. C\'est une infrastructure socio-technique complexe qui formalise et met à l\'échelle la confiance dans le monde numérique. Sa structure hiérarchique et les processus de vérification rigoureux, régis par des consortiums comme le CA/Browser Forum, traduisent des concepts humains de confiance, de responsabilité et de délégation en garanties cryptographiques vérifiables. La \"chaîne de confiance\" n\'est pas seulement une chaîne de signatures mathématiques, mais une chaîne de responsabilité et de gouvernance qui permet à un utilisateur de faire confiance à un serveur à l\'autre bout du monde, créant ainsi le tissu de confiance sur lequel repose l\'économie numérique mondiale.

## 38.5 Sujets avancés : Preuves à Divulgation Nulle de Connaissance (Zero-Knowledge Proofs)

Au-delà des objectifs traditionnels de confidentialité, d\'intégrité et d\'authenticité, la cryptographie moderne explore des concepts plus subtils et puissants. Parmi les plus fascinants se trouvent les **preuves à divulgation nulle de connaissance** (*Zero-Knowledge Proofs* ou ZKP). Un ZKP est un protocole cryptographique qui permet à une partie, le **Prouveur**, de convaincre une autre partie, le **Vérificateur**, qu\'une affirmation est vraie, sans pour autant révéler la moindre information au-delà de la simple véracité de cette affirmation.

L\'idée contre-intuitive est de prouver la possession d\'un secret (par exemple, un mot de passe, la solution d\'un puzzle, ou une clé privée) sans jamais révéler ce secret. Cette capacité à dissocier la preuve de la connaissance de la connaissance elle-même ouvre des perspectives extraordinaires pour la protection de la vie privée, l\'authentification et les systèmes décentralisés.

### Analogie Intuitive : La Caverne d\'Ali Baba

Pour saisir l\'essence d\'un ZKP, l\'analogie de la \"Caverne d\'Ali Baba\", popularisée par Jean-Jacques Quisquater, est particulièrement éclairante.

> **Le Scénario :** Imaginez une caverne en forme d\'anneau avec une seule entrée. À l\'intérieur, le chemin se sépare en deux galeries, A et B, qui sont reliées au fond par une porte magique. Cette porte ne peut être ouverte qu\'en prononçant un mot de passe secret.
>
> **Les Acteurs :** Peggy (le Prouveur) affirme connaître le mot de passe secret de la porte. Victor (le Vérificateur) est sceptique et souhaite vérifier l\'affirmation de Peggy, mais Peggy ne veut pas lui révéler le mot de passe.
>
> **Le Protocole Interactif :**

**Engagement (*Commitment*) :** Peggy entre seule dans la caverne. Hors de la vue de Victor, elle choisit au hasard l\'une des deux galeries, A ou B, et s\'y engage jusqu\'au fond. À ce stade, Peggy s\'est \"engagée\" sur un chemin.

**Défi (*Challenge*) :** Victor se présente à l\'entrée de la caverne et crie au hasard le nom de la galerie par laquelle il veut que Peggy ressorte. Il peut demander \"Sors par la galerie A!\" ou \"Sors par la galerie B!\".

**Réponse (*Response*) :** Peggy entend l\'appel de Victor et doit obéir.

Si Victor a demandé la galerie par laquelle elle est entrée, elle n\'a qu\'à rebrousser chemin.

Si Victor a demandé l\'autre galerie, elle doit utiliser le mot de passe secret pour ouvrir la porte magique, traverser et ressortir par la galerie demandée.

> **Analyse de la Preuve :**

Si Peggy connaît réellement le mot de passe, elle pourra toujours satisfaire la demande de Victor, quelle qu\'elle soit.

Si Peggy ne connaît pas le mot de passe, elle est coincée dans la galerie qu\'elle a choisie au départ. Elle ne peut que prier pour que Victor demande la galerie où elle se trouve déjà. Elle a donc une chance sur deux de réussir à tromper Victor par pur hasard.

Une seule tentative ne prouve donc rien. Mais si Peggy et Victor répètent ce protocole, disons, 20 fois, la probabilité que Peggy réussisse à chaque fois par chance devient (1/2)20, soit moins d\'une chance sur un million. Après un nombre suffisant de répétitions, Victor sera statistiquement convaincu que Peggy connaît le mot de passe, même s\'il ne l\'a jamais entendu et n\'a acquis aucune information sur sa nature.

### Les Trois Propriétés Fondamentales des ZKP

Cette analogie illustre les trois propriétés mathématiques qui définissent formellement un protocole ZKP.

> **Complétude (*Completeness*) :** Si l\'affirmation du Prouveur est vraie (Peggy connaît le mot de passe), alors un Prouveur honnête convaincra toujours un Vérificateur honnête. La procédure est conçue pour que la vérité soit toujours acceptée.
>
> **Robustesse (*Soundness*) :** Si l\'affirmation du Prouveur est fausse (Peggy ne connaît pas le mot de passe), alors aucun Prouveur malhonnête ne peut convaincre un Vérificateur honnête de la validité de l\'affirmation, sauf avec une probabilité négligeable. La probabilité de tricher avec succès peut être rendue arbitrairement petite en augmentant le nombre de répétitions du protocole.
>
> **Divulgation Nulle (*Zero-Knowledge*) :** Si l\'affirmation du Prouveur est vraie, le Vérificateur n\'apprend rien d\'autre que le fait que l\'affirmation est vraie. Le \"transcript\" de l\'interaction (la séquence des défis de Victor et des réponses de Peggy) ne contient aucune information sur le secret lui-même. Un aspect plus formel de cette propriété est que le Vérificateur pourrait générer un transcript statistiquement indiscernable de l\'interaction réelle sans même parler au Prouveur. Cela signifie que l\'interaction ne lui a transféré aucune connaissance exploitable. Victor ne peut ni déduire le mot de passe, ni prouver à une tierce personne que Peggy le connaît.

Les ZKP, initialement une curiosité théorique, sont devenus une brique technologique essentielle dans de nombreux domaines, notamment les cryptomonnaies (pour permettre des transactions anonymes et confidentielles sur une blockchain publique), les systèmes d\'authentification (pour prouver la possession d\'un mot de passe sans le transmettre sur le réseau) et le vote électronique. Ils représentent une frontière avancée de la cryptographie, où la gestion de la connaissance elle-même devient l\'objet de la protection.



---

### Références croisées

- **Securisation de l'infrastructure agentique** : voir aussi [Chapitre II.14 -- Securisation de l'Infrastructure](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.14_Securisation_Infrastructure.md)
- **Fondements de la securite informatique** : voir aussi [Chapitre 1.37 -- Fondements de la Securite Informatique](Chapitre_I.37_Fondements_Securite.md)
