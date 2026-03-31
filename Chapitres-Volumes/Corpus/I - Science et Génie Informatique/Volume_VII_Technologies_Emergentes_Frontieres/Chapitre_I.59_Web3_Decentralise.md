# Chapitre I.59 : Technologies Décentralisées, Web3 et Systèmes de Confiance

## 59.1 Fondements des Registres Distribués (DLT) et Blockchain

L\'avènement des technologies de registres distribués (DLT) marque une rupture paradigmatique dans la conception des systèmes d\'information, s\'éloignant des architectures centralisées qui ont défini l\'ère numérique jusqu\'à présent. Au cœur de cette révolution se trouve une question fondamentale : comment établir et maintenir la confiance entre des participants qui ne se connaissent pas et n\'ont aucune raison de se faire confiance, le tout sans recourir à une autorité centrale? La réponse apportée par les DLT ne réside pas dans une entité institutionnelle, mais dans un protocole cryptographique, un ensemble de règles mathématiques et d\'incitatifs économiques qui orchestrent l\'accord collectif.

Un registre distribué est, dans son essence, une base de données répliquée, partagée et synchronisée entre les membres d\'un réseau pair-à-pair. Chaque participant, ou nœud, conserve une copie identique du registre, ce qui confère au système une redondance et une résilience exceptionnelles. Contrairement à une base de données client-serveur traditionnelle, où un administrateur central a le pouvoir unilatéral de lire, écrire et modifier les données, un DLT est gouverné par un mécanisme de consensus. Lorsqu\'une nouvelle transaction est proposée, elle est diffusée à l\'ensemble du réseau, et les nœuds doivent collectivement s\'accorder sur sa validité avant qu\'elle ne soit ajoutée de manière permanente au registre. Cette approche décentralisée élimine les points de défaillance uniques et la censure, tout en créant un enregistrement partagé et auditable des événements.

La blockchain est l\'implémentation la plus connue et la plus influente des DLT, popularisée par le Bitcoin en 2008. Sa particularité réside dans sa structure de données éponyme : une chaîne de blocs. Les transactions validées sont regroupées dans des \"blocs\", et chaque nouveau bloc est lié de manière cryptographique au bloc qui le précède. Ce lien est créé en incluant dans l\'en-tête de chaque nouveau bloc une empreinte de hachage (un

*hash*) du bloc précédent. Une fonction de hachage cryptographique, telle que le SHA-256 utilisé par Bitcoin, produit une sortie de taille fixe (une empreinte) à partir d\'une entrée de taille variable. Cette fonction est déterministe (la même entrée produit toujours la même sortie) mais non réversible (il est impossible de retrouver l\'entrée à partir de la sortie). De plus, la moindre modification de l\'entrée change radicalement la sortie.

Cette structure de chaînage par hachage confère à la blockchain sa propriété la plus puissante : l\'immutabilité. Si un acteur malveillant tentait de modifier une transaction dans un bloc passé, le hachage de ce bloc changerait. Par conséquent, le lien avec le bloc suivant serait rompu, car le hachage stocké dans ce dernier ne correspondrait plus. Pour maintenir la cohérence de la chaîne, l\'attaquant devrait recalculer le hachage de ce bloc et de tous les blocs subséquents, une tâche qui devient exponentiellement difficile à mesure que la chaîne s\'allonge. C\'est cette \"solidification\" cryptographique de l\'histoire qui permet à des participants anonymes de s\'accorder sur un état partagé et inaltérable.

Les piliers de cette architecture sont la cryptographie asymétrique (ou à clé publique) et les signatures numériques. Chaque participant possède une paire de clés : une clé privée, qu\'il garde secrète, et une clé publique, qu\'il peut partager. Pour autoriser une transaction, un utilisateur signe le message de transaction avec sa clé privée, créant une signature numérique. N\'importe qui peut alors utiliser la clé publique correspondante pour vérifier que la signature est authentique et que le message n\'a pas été altéré, sans pour autant connaître la clé privée. Ce mécanisme assure l\'authenticité (seul le détenteur de la clé privée a pu signer) et l\'intégrité des transactions inscrites dans le registre.

### 59.1.1 Mécanismes de consensus et Défis de scalabilité

La tâche la plus ardue pour tout système distribué est de parvenir à un accord sur l\'état du système, surtout en présence d\'acteurs potentiellement malveillants ou de pannes. C\'est le problème fondamental du consensus distribué, brillamment illustré par une expérience de pensée qui est devenue une pierre angulaire de l\'informatique distribuée.

#### Le Problème du Consensus Distribué et la Tolérance aux Fautes Byzantines

En 1982, Leslie Lamport, Robert Shostak et Marshall Pease ont formalisé ce défi sous la forme du \"Problème des Généraux Byzantins\". La métaphore est la suivante : plusieurs divisions de l\'armée byzantine assiègent une ville ennemie. Chaque division est commandée par un général, et ils doivent tous se mettre d\'accord sur un plan d\'action commun : attaquer ou battre en retraite. S\'ils attaquent tous en même temps, ils gagnent. S\'ils battent tous en retraite, ils sauvent leurs troupes. Mais s\'ils agissent de manière désynchronisée, ils subiront une défaite catastrophique. Le défi réside dans le fait que les généraux ne peuvent communiquer que par messagers, et certains d\'entre eux peuvent être des traîtres qui enverront des messages contradictoires aux autres généraux pour semer la confusion et saboter le plan.

Ce problème est une analogie parfaite pour les systèmes informatiques distribués. Les généraux sont les nœuds du réseau, et le plan d\'action est l\'état du registre (par exemple, l\'ordre des transactions). Les traîtres représentent des nœuds malveillants ou défaillants qui peuvent envoyer des informations incorrectes ou contradictoires. Une \"panne byzantine\" est le type de panne le plus difficile à gérer, car le composant défaillant peut se comporter de manière arbitraire et malveillante, contrairement à une simple panne d\'arrêt.

La question est donc : comment un réseau de nœuds qui ne se font pas confiance peut-il s\'accorder sur une version unique de la vérité, malgré la présence de \"traîtres\"? La solution réside dans la conception de protocoles qui sont \"tolérants aux pannes byzantines\" (Byzantine Fault Tolerant - BFT). Lamport et ses collègues ont démontré mathématiquement qu\'un consensus peut être atteint si et seulement si le nombre de traîtres est strictement inférieur à un tiers du nombre total de participants (

n\>3f, où n est le nombre total de généraux et f le nombre de traîtres).

Les blockchains comme Bitcoin n\'offrent pas une solution BFT déterministe au sens classique, mais plutôt une solution probabiliste, rendue possible par l\'introduction d\'un coût économique à la participation. C\'est là qu\'interviennent les mécanismes de consensus comme la Preuve de Travail.

#### La Preuve de Travail (Proof of Work - PoW)

La Preuve de Travail, introduite par Satoshi Nakamoto avec Bitcoin, est la première solution pratique et à grande échelle au problème des généraux byzantins dans un environnement ouvert et sans permission. Elle transforme le problème de la confiance en un problème de coût computationnel.

Le mécanisme technique du PoW est un processus compétitif appelé \"minage\". Les participants du réseau, appelés mineurs, regroupent les transactions en attente dans un \"bloc candidat\". Pour que ce bloc soit accepté par le reste du réseau, le mineur doit fournir une \"preuve de travail\". Cette preuve consiste à trouver une valeur aléatoire, appelée

*nonce*, telle que l\'empreinte de hachage (en utilisant l\'algorithme SHA-256 deux fois) de l\'en-tête du bloc soit inférieure à une valeur cible définie par le protocole. L\'en-tête du bloc contient des informations cruciales, notamment le hachage du bloc précédent, un résumé des transactions du bloc actuel (sous la forme d\'une racine de Merkle) et le nonce.

Puisque la sortie d\'une fonction de hachage est imprévisible, le seul moyen de trouver un nonce valide est par essais et erreurs : le mineur modifie le nonce, calcule le hachage, et vérifie s\'il est inférieur à la cible. Ce processus est répété des milliards de fois par seconde par des milliers de mineurs à travers le monde, consommant une quantité considérable d\'énergie et de puissance de calcul. Le premier mineur qui trouve un hachage valide diffuse son bloc au réseau. Les autres nœuds vérifient facilement la validité de la preuve (il suffit de calculer un seul hachage) et, si elle est correcte, ajoutent le bloc à leur copie de la chaîne et commencent à travailler sur le bloc suivant. Le mineur gagnant est récompensé par de nouveaux bitcoins (la \"récompense de bloc\") et les frais de transaction des transactions incluses dans son bloc.

La sécurité du PoW repose sur des principes de théorie des jeux et d\'économie. Pour altérer l\'historique de la blockchain, un attaquant devrait non seulement recalculer la preuve de travail pour le bloc qu\'il souhaite modifier, mais aussi pour tous les blocs qui suivent, et ce, plus rapidement que le reste du réseau honnête qui continue d\'allonger la chaîne légitime. Cette entreprise, connue sous le nom d\'attaque des 51%, nécessite de contrôler plus de la moitié de la puissance de calcul totale du réseau (le *hashrate*). L\'acquisition et l\'alimentation d\'une telle quantité de matériel de minage spécialisé représentent un coût financier astronomique, rendant une telle attaque prohibitivement chère pour les grandes blockchains comme Bitcoin.

Ainsi, la sécurité n\'est pas une certitude cryptographique absolue, mais une propriété émergente économique. Le système est sécurisé non pas parce qu\'une attaque est impossible, mais parce qu\'elle est économiquement irrationnelle. Un acteur qui dépenserait des milliards pour acquérir 51% du hashrate aurait tout intérêt à utiliser cette puissance pour miner honnêtement et percevoir les récompenses, plutôt que de mener une attaque qui détruirait la confiance dans le réseau et, par conséquent, la valeur des actifs qu\'il a dû accumuler. Le protocole incite financièrement les participants à converger vers un comportement honnête.

La principale critique adressée au PoW est son impact environnemental. La compétition intense pour le minage entraîne une consommation d\'énergie massive, souvent comparée à celle de pays entiers. Bien que des efforts soient faits pour utiliser des sources d\'énergie renouvelables, cette dépense énergétique reste une préoccupation majeure et a motivé la recherche d\'alternatives plus efficaces.

#### La Preuve d\'Enjeu (Proof of Stake - PoS)

La Preuve d\'Enjeu a été proposée comme une alternative écoénergétique à la Preuve de Travail. L\'idée fondamentale est de remplacer la ressource physique rare (la puissance de calcul) par une ressource numérique rare au sein du réseau : la cryptomonnaie elle-même.

Dans un système PoS, il n\'y a pas de mineurs en compétition. À la place, il y a des \"validateurs\" (ou \"forgeurs\"). Pour participer au processus de création de blocs, un validateur doit bloquer une certaine quantité de la cryptomonnaie native du réseau en tant que \"caution\" ou \"enjeu\" (*stake*). Le protocole sélectionne ensuite un validateur pour proposer le prochain bloc. Le mécanisme de sélection est souvent pseudo-aléatoire, mais la probabilité d\'être choisi est généralement proportionnelle à la taille de l\'enjeu : plus un validateur a misé de jetons, plus il a de chances d\'être sélectionné. Si le validateur propose un bloc valide, il reçoit en récompense les frais de transaction du bloc.

Le principal avantage du PoS est une réduction drastique de la consommation d\'énergie, de l\'ordre de plus de 99% par rapport au PoW, car il n\'y a plus de compétition de calcul intensive. Cela rend également la participation plus accessible, car elle ne nécessite pas d\'investissement dans du matériel spécialisé coûteux, mais seulement dans la cryptomonnaie du réseau.

Cependant, le PoS introduit ses propres défis de sécurité. Le premier est le risque de centralisation. Comme la probabilité de valider des blocs (et donc de percevoir des récompenses) est liée à la quantité de jetons détenus, les participants les plus riches peuvent voir leur richesse augmenter plus rapidement, créant un effet \"les riches s\'enrichissent\" qui pourrait potentiellement conduire à une concentration du pouvoir de validation entre les mains de quelques grands détenteurs.

Un autre défi, plus subtil, est le problème du \"rien à perdre\" (*nothing-at-stake*). Imaginez qu\'une bifurcation (

*fork*) se produise dans la chaîne, créant deux versions concurrentes de l\'historique. Dans un système PoW, un mineur doit choisir sur quelle chaîne allouer sa puissance de calcul. S\'il divise sa puissance entre les deux, il réduit ses chances de trouver un bloc sur l\'une ou l\'autre. S\'il choisit la mauvaise chaîne (celle qui sera finalement abandonnée par le réseau), il aura gaspillé de l\'énergie et de l\'argent pour rien. Il a donc un fort incitatif économique à se concentrer sur la chaîne qu\'il pense être la plus susceptible de gagner.

En PoS, ce coût marginal n\'existe pas. Un validateur peut signer et proposer des blocs sur les deux chaînes simultanément sans coût supplémentaire significatif. Il est même rationnel pour lui de le faire, car cela maximise ses chances de percevoir des récompenses, quelle que soit la chaîne qui l\'emporte. Si tous les validateurs agissent de la sorte, le réseau ne parvient jamais à un consensus et la chaîne peut se fragmenter indéfiniment.

Les protocoles PoS modernes résolvent ce problème en introduisant des pénalités économiques explicites, un mécanisme appelé *slashing*. Si un validateur est surpris en train de se comporter de manière malveillante, par exemple en signant des blocs sur deux chaînes concurrentes au même moment, une partie ou la totalité de son enjeu est confisquée et détruite (\"slashed\"). Cette menace de perte financière recrée un coût économique à la malversation et incite fortement les validateurs à suivre les règles du protocole et à ne soutenir qu\'une seule version de la chaîne.

Il existe de nombreuses variantes de PoS, comme la Preuve d\'Enjeu Déléguée (Delegated Proof of Stake - DPoS), où les détenteurs de jetons votent pour élire un petit nombre de délégués qui sont responsables de la validation des blocs, cherchant un compromis entre décentralisation et performance.

  ---------------------------------- ------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------
  Caractéristique                    Preuve de Travail (PoW)                                                        Preuve d\'Enjeu (PoS)

  **Principe de base**               Compétition computationnelle pour résoudre un puzzle cryptographique           Sélection de validateurs basée sur la quantité de cryptomonnaie mise en jeu

  **Ressource requise**              Puissance de calcul (Hashrate) et électricité                                  Capital (cryptomonnaie native)

  **Consommation énergétique**       Très élevée                                                                 Très faible (réduction de \>99%) 

  **Vecteur d\'attaque principal**   Attaque des 51% (contrôle de la majorité du hashrate)                      Attaque des 51% (contrôle de la majorité de l\'enjeu), Attaques à longue portée

  **Risque de centralisation**       Économies d\'échelle dans le minage (pools de minage, fermes de minage)    \"Les riches s\'enrichissent\", concentration du capital chez les grands détenteurs 

  **Avantages**                      Sécurité éprouvée et robuste, modèle simple à comprendre                       Efficacité énergétique, barrière à l\'entrée plus faible (pas de matériel spécialisé) 

  **Inconvénients**                  Impact environnemental, coût élevé du matériel, centralisation du minage       Problème du \"rien à perdre\" (résolu par le slashing), risque de centralisation du capital 

  **Exemples de protocoles**         Bitcoin, Ethereum (avant \"The Merge\"), Litecoin                              Ethereum (après \"The Merge\"), Cardano, Solana, Polkadot
  ---------------------------------- ------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------

#### Le Trilemme de la Blockchain et les Solutions de Scalabilité

Malgré leur robustesse, les blockchains monolithiques comme Bitcoin et Ethereum (dans sa version initiale) se heurtent à une limitation fondamentale connue sous le nom de \"trilemme de la blockchain\". Ce concept, popularisé par le co-fondateur d\'Ethereum, Vitalik Buterin, postule qu\'il est extrêmement difficile pour une architecture de blockchain de posséder simultanément trois propriétés essentielles à leur niveau optimal :

> **Décentralisation :** Le système doit pouvoir fonctionner sans dépendre d\'un petit groupe d\'acteurs centraux. Un grand nombre de participants devraient pouvoir valider le réseau.
>
> **Sécurité :** Le système doit être capable de résister aux attaques, notamment une attaque des 51%.
>
> **Scalabilité (Passage à l\'échelle) :** Le système doit être capable de traiter un grand nombre de transactions par seconde (TPS) pour répondre à une demande de masse, sans que les frais ne deviennent prohibitifs.

Le trilemme suggère qu\'en optimisant deux de ces propriétés, on en sacrifie inévitablement une troisième. Par exemple, Bitcoin et Ethereum sont hautement décentralisés et sécurisés, mais leur scalabilité est très limitée (environ 7 TPS pour Bitcoin, 15-20 TPS pour Ethereum pré-scalabilité). On pourrait augmenter la taille des blocs pour traiter plus de transactions, mais cela augmenterait les exigences matérielles pour faire fonctionner un nœud, ce qui réduirait le nombre de participants possibles et donc la décentralisation.

Cette contrainte a conduit à une prise de conscience : l\'avenir de la scalabilité ne réside peut-être pas dans une blockchain monolithique qui fait tout, mais dans une approche modulaire, où différentes fonctions (exécution, consensus, disponibilité des données) sont réparties sur plusieurs couches. Cette vision a donné naissance à un écosystème de solutions de scalabilité, principalement construites \"au-dessus\" des blockchains existantes.

**Solutions de Couche 2 (Layer-2) : Les Rollups**

Les solutions de Couche 2 (L2) sont des protocoles construits sur une blockchain de Couche 1 (L1) comme Ethereum. L\'idée est de déplacer la majeure partie du travail de calcul (l\'exécution des transactions) hors de la chaîne L1, tout en continuant à utiliser la L1 comme couche de sécurité et de disponibilité des données. Les

*Rollups* sont la forme la plus prometteuse de L2. Ils regroupent (to roll up) des centaines de transactions en un seul lot, les exécutent hors chaîne, puis publient un résumé compressé des données de ces transactions sur la L1. Cela permet d\'hériter de la sécurité de la L1 tout en augmentant massivement le débit. Il existe deux principaux types de rollups, qui diffèrent par leur méthode de validation.

> **Optimistic Rollups :** Ces rollups fonctionnent sur un principe de \"confiance, mais vérification\". Ils supposent que toutes les transactions du lot sont valides par défaut -- une approche \"optimiste\". L\'opérateur du rollup (le séquenceur) publie l\'état résultant sur la L1 sans fournir de preuve de validité immédiate. S\'ensuit une \"période de contestation\" (généralement une semaine) durant laquelle n\'importe quel observateur peut soumettre une \"preuve de fraude\" (\
> *fraud proof*) s\'il détecte une transaction invalide. Si la preuve de fraude est valide, la transaction malveillante est annulée, l\'état du rollup est corrigé, et l\'opérateur malhonnête est pénalisé. L\'avantage est leur simplicité relative et leur compatibilité avec la Machine Virtuelle Ethereum (EVM), ce qui facilite la migration des applications existantes. L\'inconvénient majeur est le long délai de retrait des fonds de la L2 vers la L1, qui est égal à la durée de la période de contestation.
>
> **ZK-Rollups (Zero-Knowledge Rollups) :** Ces rollups adoptent une approche \"zéro confiance\". Au lieu de supposer la validité, ils prouvent cryptographiquement la validité de chaque lot de transactions. L\'opérateur génère une \"preuve à divulgation nulle de connaissance\" (\
> *zero-knowledge proof*), typiquement un ZK-SNARK ou un ZK-STARK, qui atteste mathématiquement que toutes les transactions du lot sont valides et que le nouvel état est le résultat correct de leur exécution. Cette preuve, appelée \"preuve de validité\" (\
> *validity proof*), est publiée sur la L1 avec les données de transaction compressées. Une fois la preuve vérifiée par le contrat intelligent sur la L1 (ce qui est très rapide), les transactions sont considérées comme finales. L\'avantage est une sécurité cryptographique plus forte et des retraits quasi instantanés, car il n\'y a pas de période de contestation. L\'inconvénient est la complexité de la technologie et le coût de calcul plus élevé pour générer les preuves.

  ------------------------------- ----------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------
  Caractéristique                 Optimistic Rollups                                                                  ZK-Rollups (Zero-Knowledge Rollups)

  **Mécanisme de validation**     Preuve de fraude (présomption de validité)                                      Preuve de validité (preuve cryptographique) 

  **Temps de finalité/retrait**   Long (typiquement 7 jours, durée de la période de contestation)                 Rapide (quelques minutes, le temps de générer et vérifier la preuve) 

  **Complexité de calcul**        Faible pour les opérateurs, plus élevée pour les preuves de fraude                  Élevée pour la génération des preuves de validité 

  **Compatibilité EVM**           Élevée (EVM-équivalent ou compatible)                                           Plus complexe, mais en progression rapide (zkEVM) 

  **Confidentialité**             Aucune par défaut (les données de transaction sont publiques sur L1)            Potentiel de confidentialité élevé (les détails des transactions peuvent être masqués) 

  **Avantages**                   Simplicité de mise en œuvre, compatibilité EVM, faible coût de calcul par défaut    Sécurité cryptographique, finalité rapide, compression des données

  **Inconvénients**               Longue latence de retrait, modèle de sécurité basé sur au moins un acteur honnête   Complexité technologique, coût de calcul élevé pour la preuve, adoption plus lente
  ------------------------------- ----------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------

**Autres Solutions : Sharding et Sidechains**

Au-delà des L2, d\'autres approches visent à améliorer la scalabilité. Le **sharding** (ou partitionnement) est une technique qui divise la base de données et la charge de traitement d\'une blockchain en plusieurs segments plus petits, appelés *shards*. Chaque shard peut traiter des transactions en parallèle, augmentant ainsi le débit global du réseau. C\'est une approche de scalabilité de la Couche 1 elle-même, qui est au cœur de la feuille de route d\'Ethereum.

Les **sidechains** (ou chaînes latérales) sont des blockchains indépendantes, avec leurs propres mécanismes de consensus, qui sont connectées à une chaîne principale (comme Ethereum) via un \"pont\" (*bridge*) bidirectionnel. Les utilisateurs peuvent \"verrouiller\" des actifs sur la chaîne principale pour les \"émettre\" sur la sidechain, les utiliser là-bas (souvent avec des frais beaucoup plus bas), puis les \"brûler\" sur la sidechain pour les \"déverrouiller\" sur la chaîne principale. L\'inconvénient est que la sécurité de la sidechain est indépendante de celle de la chaîne principale et dépend de ses propres validateurs, ce qui introduit une nouvelle hypothèse de confiance.

## 59.2 Contrats Intelligents (Smart Contracts) et Vérification Formelle

Si la blockchain a fourni une solution pour un état partagé et immuable, c\'est l\'introduction des contrats intelligents qui l\'a transformée d\'une simple base de données de transactions en un ordinateur mondial programmable. Cette innovation, principalement portée par la plateforme Ethereum, a ouvert un espace de conception quasi infini pour des applications décentralisées.

Un contrat intelligent, ou *smart contract*, est un programme informatique dont le code est stocké et exécuté sur une blockchain. Il s\'exécute automatiquement et de manière déterministe lorsque des conditions prédéfinies sont remplies, sans nécessiter d\'intermédiaire ou d\'intervention humaine. Le concept a été initialement proposé par le cryptographe Nick Szabo en 1994, bien avant l\'existence des blockchains, en utilisant l\'analogie d\'un distributeur automatique : une fois que vous insérez la bonne quantité de monnaie (la condition), la machine exécute automatiquement le contrat en vous donnant le produit sélectionné.

Ethereum a été la première plateforme à réaliser cette vision à grande échelle en intégrant un environnement d\'exécution Turing-complet, la **Machine Virtuelle Ethereum (EVM)**. L\'EVM est le cœur computationnel d\'Ethereum; c\'est un environnement d\'exécution isolé (

*sandboxed*) qui est répliqué sur chaque nœud complet du réseau. Lorsqu\'une transaction invoque une fonction d\'un contrat intelligent, chaque nœud exécute le code correspondant dans son instance de l\'EVM. Cette exécution redondante garantit que tous les participants parviennent au même résultat, maintenant ainsi le consensus sur l\'état de la blockchain. L\'EVM est une machine à états : chaque transaction est une fonction de transition qui fait passer la blockchain d\'un état global valide à un autre.

Le processus de création d\'un contrat intelligent commence par l\'écriture du code dans un langage de haut niveau, le plus populaire étant **Solidity**. Solidity est un langage orienté objet, statiquement typé, dont la syntaxe s\'inspire de JavaScript et C++. Ce code source est ensuite compilé en

**bytecode**, une représentation de bas niveau composée d\'une série d\'instructions appelées *opcodes* que l\'EVM peut directement interpréter. Le déploiement du contrat consiste à envoyer une transaction spéciale sur la blockchain qui ne contient pas de destinataire mais inclut ce bytecode. Le réseau assigne alors une adresse unique au contrat, et son code est stocké de manière permanente sur la blockchain, prêt à être exécuté.

L\'architecture de l\'EVM est délibérément contrainte pour garantir la sécurité et le déterminisme. C\'est une machine à pile (*stack-based*) avec trois zones de stockage de données : la *mémoire* (volatile, effacée entre les appels de fonction), le *stockage* (*storage*, persistant et inscrit sur la blockchain) et la *pile* (*stack*, pour les opérations). Chaque opcode a un coût fixe, mesuré en une unité appelée

**gaz**. Pour exécuter une transaction, un utilisateur doit payer des frais (en Ether) pour couvrir le coût total du gaz consommé par toutes les opérations. Ce mécanisme a deux objectifs cruciaux : il rémunère les validateurs pour le travail de calcul qu\'ils effectuent et, surtout, il prévient les attaques par déni de service. Sans le gaz, un contrat contenant une boucle infinie pourrait paralyser l\'ensemble du réseau. Avec le gaz, l\'exécution s\'arrête simplement lorsque les frais alloués sont épuisés. C\'est pourquoi l\'EVM est qualifiée de \"quasi-Turing-complète\" : elle peut en théorie exécuter n\'importe quel algorithme, mais en pratique, chaque calcul est limité par le coût du gaz.

### 59.2.1 Risques et Vulnérabilités des Contrats Intelligents

Le pouvoir des contrats intelligents vient de leur autonomie et de leur immuabilité. Une fois déployé, le code est la loi (\"code is law\"). Cependant, cette caractéristique est une arme à double tranchant. Si le code contient un bogue ou une vulnérabilité, celui-ci est également immuable et inscrit de façon permanente sur la blockchain. Contrairement aux logiciels traditionnels qui peuvent être mis à jour et corrigés, un contrat intelligent défectueux ne peut pas être \"patché\" directement. Les conséquences peuvent être catastrophiques, entraînant des pertes financières irréversibles.

Le déploiement d\'un contrat intelligent s\'apparente moins au déploiement d\'une application web qu\'au lancement d\'une sonde spatiale : une fois lancée, il est extrêmement difficile, voire impossible, de la corriger. Cette réalité impose un changement de paradigme dans l\'ingénierie logicielle, où l\'accent doit être mis sur une assurance de correction quasi parfaite *avant* le déploiement, plutôt que sur une itération rapide post-déploiement.

**Étude de Cas : Le Piratage de \"The DAO\" (2016)**

L\'exemple le plus célèbre et le plus formateur des risques associés aux contrats intelligents est le piratage de \"The DAO\". The DAO était un fonds d\'investissement décentralisé et l\'un des premiers projets d\'envergure sur Ethereum, ayant levé l\'équivalent de plus de 150 millions de dollars. En juin 2016, un attaquant a exploité une vulnérabilité dans son code pour siphonner environ un tiers de ses fonds, soit plus de 50 millions de dollars à l\'époque.

La faille exploitée était une **attaque de réentrance**. La fonction de retrait de The DAO transférait d\'abord les fonds à l\'utilisateur, puis mettait à jour le solde interne. L\'attaquant a créé un contrat malveillant qui, lorsqu\'il recevait les fonds, rappelait récursivement la fonction de retrait avant que la mise à jour du solde n\'ait eu lieu. Le contrat victime, ne voyant pas son état interne modifié, a continué à envoyer des fonds jusqu\'à ce que le contrat de l\'attaquant ait drainé une part significative de la trésorerie.

Cet événement a été un choc pour la jeune communauté Ethereum et a conduit à une décision extrêmement controversée : effectuer un *hard fork* de la blockchain pour \"remonter le temps\" et annuler les transactions de l\'attaquant, récupérant ainsi les fonds volés. Cette intervention a divisé la communauté, une partie estimant qu\'elle violait le principe d\'immutabilité. Cette faction a continué à maintenir la chaîne originale, qui est aujourd\'hui connue sous le nom d\'Ethereum Classic. Cet épisode illustre non seulement les risques techniques, mais aussi les dilemmes socio-techniques complexes qui surgissent lorsqu\'un code immuable produit des résultats socialement inacceptables.

**Catégories Communes de Vulnérabilités**

L\'écosystème a beaucoup appris depuis The DAO, et une taxonomie des vulnérabilités courantes a émergé :

> **Attaques de Réentrance :** Comme décrit ci-dessus, cette vulnérabilité se produit lorsqu\'un contrat effectue un appel externe à un autre contrat (potentiellement malveillant) avant de finaliser ses propres changements d\'état. La bonne pratique, connue sous le nom de \"Checks-Effects-Interactions pattern\", consiste à effectuer toutes les vérifications et mises à jour d\'état internes\
> *avant* d\'interagir avec des contrats externes.
>
> **Débordements et Sous-débordements d\'Entiers (Integer Overflow/Underflow) :** Les variables entières dans l\'EVM ont une taille fixe (par exemple, uint256 pour un entier non signé de 256 bits). Si une opération arithmétique produit un résultat qui dépasse la valeur maximale (pour un débordement) ou descend en dessous de zéro (pour un sous-débordement), la valeur \"s\'enroule\" (par exemple, MAX_UINT + 1 devient 0). Les attaquants peuvent exploiter ce comportement pour manipuler la logique du contrat, par exemple pour réclamer une quantité infinie de jetons. Pour contrer cela, les développeurs utilisaient des bibliothèques comme \"SafeMath\". Depuis la version 0.8.0 de Solidity, le compilateur inclut par défaut des vérifications automatiques qui annulent la transaction en cas de débordement ou de sous-débordement.
>
> **Dépendance à des Oracles Non Fiables :** Les contrats intelligents sont des systèmes déterministes et isolés ; ils ne peuvent pas accéder à des informations du monde extérieur (comme les prix des actifs, les conditions météorologiques ou les résultats d\'un match) de manière native. Pour obtenir ces données, ils s\'appuient sur des services appelés \"oracles\" qui injectent des informations externes sur la chaîne. La sécurité du contrat dépend alors entièrement de la fiabilité de l\'oracle. Si l\'oracle est centralisé et compromis, ou s\'il fournit des données incorrectes, il peut déclencher une exécution erronée du contrat avec des conséquences désastreuses.
>
> **Vulnérabilités de Contrôle d\'Accès :** Des erreurs dans la logique de contrôle d\'accès peuvent permettre à des utilisateurs non autorisés d\'exécuter des fonctions privilégiées, comme changer le propriétaire du contrat ou retirer des fonds. Il est crucial d\'implémenter correctement des modificateurs de fonction (comme onlyOwner) pour restreindre l\'accès aux fonctions critiques.

### 59.2.2 La Vérification Formelle comme Bouclier Mathématique

Face à l\'enjeu financier et au caractère impitoyable des bogues dans les contrats intelligents, les méthodes de test traditionnelles, qui ne peuvent couvrir qu\'un sous-ensemble de cas d\'exécution, se révèlent souvent insuffisantes. C\'est pourquoi la communauté s\'est tournée vers la **vérification formelle**, une approche issue de l\'informatique théorique qui vise à prouver mathématiquement la correction d\'un programme.

Le principe de la vérification formelle est de modéliser le contrat intelligent et ses propriétés souhaitées sous forme d\'énoncés mathématiques, puis d\'utiliser des outils automatisés pour prouver que le code satisfait toujours ces propriétés, quel que soit le scénario d\'exécution. Plutôt que de se demander \"le contrat fonctionne-t-il pour cette entrée?\", la vérification formelle répond à la question \"le contrat fonctionne-t-il pour

*toutes* les entrées possibles?\".

Le processus se déroule généralement en deux étapes :

> **Spécification Formelle :** Les exigences de sécurité et de comportement du contrat sont exprimées dans un langage formel et non ambigu. Par exemple, une propriété pour un contrat de coffre-fort pourrait être : \"La somme totale des retraits d\'un utilisateur ne doit jamais dépasser la somme totale de ses dépôts\". Ces propriétés sont souvent exprimées sous forme d\'invariants qui doivent rester vrais à tout moment.
>
> **Vérification Automatisée :** Des outils spécialisés analysent ensuite le bytecode du contrat pour vérifier s\'il respecte la spécification. Deux techniques principales sont utilisées :

**Model Checking :** L\'outil explore systématiquement tous les états atteignables du contrat pour vérifier si l\'un d\'eux viole une propriété spécifiée.

**Théorèmes Automatisés (SMT Solvers) :** Le code du contrat et les propriétés sont traduits en formules logiques. Un solveur SMT (Satisfiability Modulo Theories) tente alors de trouver une \"solution\" à une formule qui représente une violation de la propriété. S\'il trouve une solution, il a trouvé un contre-exemple, c\'est-à-dire un scénario concret (une séquence de transactions) qui conduit à la faille. S\'il prouve qu\'aucune solution n\'existe, il a prouvé que la faille est impossible.

Le compilateur Solidity intègre un module de vérification formelle appelé **SMTChecker**. Cet outil peut vérifier automatiquement des propriétés de sécurité de base, comme l\'absence de débordements d\'entiers ou d\'accès à des tableaux hors limites. Il permet également aux développeurs d\'ajouter des assertions (

assert(condition)) dans leur code. Le SMTChecker tentera alors de prouver que ces assertions ne peuvent jamais être violées. S\'il trouve une violation, il peut fournir un contre-exemple pour aider à déboguer le problème.

La vérification formelle est un outil extrêmement puissant, mais elle n\'est pas une panacée. Elle ne peut prouver que ce qui est spécifié ; si la spécification elle-même est erronée ou incomplète, la preuve de correction sera sans valeur. De plus, pour des contrats très complexes, l\'analyse peut devenir infaisable en termes de calcul. C\'est pourquoi la vérification formelle est considérée comme un complément essentiel, et non un substitut, aux audits de sécurité manuels réalisés par des experts, ainsi qu\'à une suite de tests rigoureuse. La combinaison de ces trois approches -- tests, vérification formelle et audit humain -- constitue aujourd\'hui la meilleure pratique pour sécuriser les contrats intelligents.

## 59.3 Écosystème Web3 et Applications Décentralisées (DApps)

L\'émergence de la blockchain en tant qu\'ordinateur mondial programmable a jeté les bases d\'une vision plus large pour l\'avenir d\'Internet, communément appelée Web3. Cette nouvelle phase promet de remodeler fondamentalement la manière dont nous interagissons, transigeons et nous organisons en ligne, en déplaçant le centre de gravité du pouvoir des plateformes centralisées vers les utilisateurs individuels.

### La Vision du Web3

Pour comprendre le Web3, il est utile de le contextualiser par rapport à ses prédécesseurs.

> **Web1 (environ 1990-2004) : L\'Internet Statique.** C\'était l\'ère du \"lecture seule\". Les utilisateurs étaient principalement des consommateurs passifs de contenu hébergé sur des serveurs statiques. Les pages web étaient des documents hyperliés, et l\'interaction était minimale.
>
> **Web2 (environ 2004-2020) : L\'Internet Social et Centralisé.** C\'est l\'ère du \"lecture-écriture\". L\'émergence des réseaux sociaux, des blogues et des plateformes de partage de contenu a transformé les utilisateurs en créateurs. Cependant, cette interactivité s\'est construite sur des plateformes centralisées (Google, Facebook, Amazon, etc.) qui agissent comme des intermédiaires, contrôlant les données des utilisateurs, dictant les règles et capturant la majeure partie de la valeur économique.
>
> **Web3 : L\'Internet Décentralisé et Possédé (Read-Write-Own).** Le Web3 est une vision pour un Internet construit sur des protocoles décentralisés, où la blockchain sert de couche d\'état partagée et de système de propriété native. Dans ce modèle, les utilisateurs possèdent et contrôlent leurs données, leur identité et leurs actifs numériques via des portefeuilles cryptographiques. Les applications (DApps) fonctionnent sur des réseaux pair-à-pair plutôt que sur des serveurs appartenant à une seule entreprise, ce qui les rend intrinsèquement plus ouvertes, transparentes et résistantes à la censure. Le Web3 vise à démanteler les silos de données du Web2 et à créer un écosystème où la valeur circule plus librement entre les créateurs et les utilisateurs, sans intermédiaires extractifs.

  ----------------------------- -------------------------------------------- ---------------------------------------------------------- ---------------------------------------------------------
  Caractéristique               Web1 (L\'Internet Statique)                  Web2 (L\'Internet Social & Centralisé)                     Web3 (L\'Internet Décentralisé & Possédé)

  **Mot-clé principal**         Lecture seule                                Lecture-Écriture                                           Lecture-Écriture-Propriété 

  **Architecture**              Client-serveur, pages statiques              Client-serveur, plateformes centralisées                   Réseaux pair-à-pair, registres distribués 

  **Propriété des données**     Contenu possédé par les créateurs            Données possédées et contrôlées par les plateformes    Données possédées et contrôlées par l\'utilisateur 

  **Interaction utilisateur**   Consommation passive                         Création de contenu, interaction sociale                   Participation, propriété, gouvernance

  **Modèle économique**         Vente de logiciels, publicité contextuelle   Publicité ciblée, économie de l\'attention                 Économie de la propriété (tokens), micro-transactions

  **Technologies clés**         HTML, HTTP, URL                              AJAX, JavaScript, API de plateformes sociales              Blockchain, contrats intelligents, portefeuilles crypto

  **Exemples**                  Sites personnels, Netscape                   Facebook, Google, YouTube, Twitter                         Ethereum, Uniswap, OpenSea, Lens Protocol
  ----------------------------- -------------------------------------------- ---------------------------------------------------------- ---------------------------------------------------------

### 59.3.1 Nouvelles Formes d\'Organisation et de Finance

Le Web3 n\'est pas seulement une vision architecturale ; il a déjà donné naissance à un écosystème florissant d\'applications qui réinventent des domaines fondamentaux comme la finance et la gouvernance organisationnelle.

#### La Finance Décentralisée (DeFi)

La Finance Décentralisée (DeFi) est sans doute le cas d\'usage le plus développé et le plus percutant du Web3 à ce jour. Elle vise à construire un système financier alternatif qui est ouvert, mondial, transparent et accessible à tous, sans avoir besoin d\'intermédiaires financiers traditionnels comme les banques, les courtiers ou les bourses.

Les principes fondamentaux de la DeFi sont :

> **Désintermédiation :** Les services financiers sont fournis directement de pair à pair via des contrats intelligents, éliminant le besoin d\'institutions de confiance.
>
> **Transparence Radicale :** Toutes les transactions et la logique des protocoles sont enregistrées sur une blockchain publique, ce qui les rend entièrement auditables par n\'importe qui en temps réel.
>
> **Accessibilité Mondiale :** Toute personne disposant d\'une connexion Internet et d\'un portefeuille cryptographique peut accéder aux services DeFi, sans restriction géographique ou de statut social.
>
> **Composabilité :** Les protocoles DeFi sont comme des \"LEGOs monétaires\". Étant des contrats intelligents ouverts et interopérables sur la même blockchain, ils peuvent être combinés pour créer des produits et services financiers de plus en plus sophistiqués.

Cette composabilité est un moteur d\'innovation exponentiel. Dans la finance traditionnelle, la création de nouveaux produits financiers impliquant plusieurs institutions est un processus lent et coûteux, entravé par des systèmes cloisonnés et des barrières juridiques. En DeFi, un développeur peut, au sein d\'une seule transaction atomique, construire une stratégie complexe qui interagit avec plusieurs protocoles existants (par exemple, emprunter sur Aave, échanger sur Uniswap, et déposer dans un pool de liquidité sur Curve). Ce cycle d\'innovation combinatoire et sans permission accélère radicalement le développement de nouveaux services financiers.

Les applications clés de la DeFi incluent :

> **Échanges Décentralisés (DEX) :** Des plateformes comme Uniswap permettent aux utilisateurs d\'échanger des jetons directement depuis leur portefeuille. Au lieu d\'un carnet d\'ordres centralisé, ils utilisent des \"pools de liquidité\" où les utilisateurs déposent des paires d\'actifs, et un algorithme de \"teneur de marché automatisé\" (Automated Market Maker - AMM) détermine les prix en fonction du ratio des actifs dans le pool.
>
> **Prêts et Emprunts :** Des protocoles comme Aave et MakerDAO permettent aux utilisateurs de déposer des crypto-actifs en garantie pour emprunter d\'autres actifs, ou de prêter leurs actifs pour gagner des intérêts. Les taux d\'intérêt sont déterminés algorithmiquement en fonction de l\'offre et de la demande, et les liquidations en cas de sous-collatéralisation sont gérées automatiquement par les contrats intelligents.
>
> ***Stablecoins* (Cyberjetons stables) :** Ce sont des jetons conçus pour maintenir une parité de valeur avec un actif stable, généralement le dollar américain. Ils sont cruciaux pour la DeFi car ils offrent un moyen d\'échange et une unité de compte stables dans un écosystème autrement volatil. Le DAI de MakerDAO, par exemple, est un stablecoin décentralisé qui maintient sa parité en étant sur-collatéralisé par un panier d\'autres crypto-actifs déposés dans des coffres-forts (*vaults*).

#### Les Organisations Autonomes Décentralisées (DAO)

Les Organisations Autonomes Décentralisées (DAO) représentent une tentative de réinventer la structure et la gouvernance des organisations à l\'ère d\'Internet. Une DAO est une entité coordonnée par des contrats intelligents, où les règles de fonctionnement et les décisions sont prises collectivement par ses membres, généralement les détenteurs de jetons de gouvernance.

Contrairement à une entreprise traditionnelle avec sa hiérarchie (PDG, conseil d\'administration), une DAO a une structure plate et transparente. Les décisions, qu\'il s\'agisse de modifier le protocole, d\'allouer des fonds de la trésorerie ou de lancer de nouvelles initiatives, sont soumises sous forme de propositions et sont votées par la communauté. Le poids du vote de chaque membre est souvent proportionnel au nombre de jetons de gouvernance qu\'il détient.

Le cœur d\'une DAO est sa **trésorerie**, un pool de fonds contrôlé par les contrats intelligents de gouvernance. Aucune dépense ne peut être effectuée sans l\'approbation de la communauté via un vote, ce qui garantit une gestion transparente et collective des ressources. Des plateformes de vote

*off-chain* comme Snapshot sont souvent utilisées pour sonder le sentiment de la communauté sans encourir de frais de transaction, les décisions finales étant ensuite ratifiées et exécutées *on-chain*.

Les DAO explorent une nouvelle forme de contrat social organisationnel où \"le code est la loi\". Elles remplacent les statuts juridiques et la prise de décision humaine subjective par des règles transparentes, déterministes et auto-exécutables. Cette approche soulève des défis profonds : le code peut-il anticiper toutes les situations? Comment gérer les litiges et l\'interaction avec le système juridique traditionnel? Néanmoins, les DAO sont utilisées pour gouverner une vaste gamme de projets, des protocoles DeFi (comme Uniswap et MakerDAO) aux collectifs d\'artistes et aux fonds d\'investissement décentralisés.

### 59.3.2 Identité décentralisée (DID) et Souveraineté des données

L\'un des problèmes les plus criants du Web2 est la perte de contrôle des individus sur leur propre identité numérique. Nos données sont fragmentées, stockées dans les silos de centaines de services en ligne, et utilisées (voire vendues) sans notre consentement éclairé. Le mouvement de l\'**Identité Auto-Souveraine (Self-Sovereign Identity - SSI)**, propulsé par les technologies Web3, vise à inverser ce modèle en redonnant aux utilisateurs la pleine propriété et le contrôle de leur identité.

#### Les Identifiants Décentralisés (DID) du W3C

La pierre angulaire de l\'identité auto-souveraine est un nouveau standard ouvert développé par le World Wide Web Consortium (W3C) : l\'**Identifiant Décentralisé (DID)**. Un DID est un identifiant unique et globalement résolvable qui est généré et contrôlé par l\'individu, indépendamment de toute autorité centrale ou fournisseur d\'identité.

L\'architecture technique d\'un DID est conçue pour être à la fois simple et extensible. Un DID est une URI qui suit une syntaxe spécifique :

did:method:specific-id.

> did: est le préfixe standard.
>
> method: spécifie la \"méthode DID\", qui définit le système de registre décentralisé (souvent une blockchain) sur lequel le DID est ancré et comment les opérations (création, résolution, mise à jour, désactivation) sont effectuées. Il existe des méthodes pour de nombreuses blockchains, comme ethr pour Ethereum ou ion pour Bitcoin.
>
> specific-id: est un identifiant unique généré selon les règles de la méthode.

Un DID est essentiellement un pointeur. Le processus de \"résolution\" d\'un DID consiste à utiliser sa méthode pour interroger le registre sous-jacent et récupérer un document JSON associé, appelé le **DID Document**. Ce document est le cœur de l\'identité ; il contient des informations publiques cruciales, notamment :

> Des **méthodes de vérification**, qui sont typiquement des clés publiques cryptographiques que le contrôleur du DID peut utiliser pour s\'authentifier (par exemple, en signant un message).
>
> Des **points de terminaison de service** (*service endpoints*), qui indiquent comment interagir avec le sujet du DID (par exemple, l\'adresse d\'une boîte de réception décentralisée).

#### Justificatifs Vérifiables et Souveraineté des Données

Les DID fournissent l\'identifiant, mais la substance de l\'identité est constituée d\'attributs et de déclarations (diplômes, permis de conduire, âge, etc.). C\'est là qu\'intervient un autre standard du W3C : les **Justificatifs Vérifiables (Verifiable Credentials - VCs)**. Un VC est une déclaration numérique, inviolable et signée cryptographiquement par un émetteur, que le détenteur peut présenter à un vérificateur.

Le modèle fonctionne sur un \"triangle de confiance\" décentralisé :

> **L\'Émetteur (Issuer) :** Une entité de confiance (par exemple, une université, un gouvernement) crée un VC contenant des déclarations sur un sujet (par exemple, \"Jane Doe a obtenu un doctorat en informatique\") et le signe avec sa propre clé privée. Il remet ensuite ce VC au sujet.
>
> **Le Détenteur (Holder) :** Le sujet (Jane Doe) reçoit le VC et le stocke dans son portefeuille numérique personnel, un logiciel sous son contrôle exclusif.
>
> Le Vérificateur (Verifier) : Lorsque Jane a besoin de prouver son diplôme à un employeur potentiel (le vérificateur), elle lui présente le VC depuis son portefeuille. Le vérificateur peut alors :\
> a. Vérifier la signature cryptographique de l\'émetteur sur le VC.\
> b. Résoudre le DID de l\'émetteur pour récupérer sa clé publique depuis son DID Document et confirmer l\'authenticité de la signature.\
> c. S\'assurer que le VC n\'a pas été révoqué.

Ce processus se déroule sans que le vérificateur ait besoin de contacter directement l\'émetteur, ce qui préserve la confidentialité et l\'efficacité.

Ce modèle restaure la **souveraineté des données** pour l\'utilisateur. Le détenteur contrôle entièrement ses justificatifs et peut choisir de manière granulaire quelles informations il partage. Par exemple, en utilisant des techniques de

**divulgation sélective** (souvent basées sur des preuves à divulgation nulle de connaissance), Jane pourrait prouver qu\'elle a un diplôme d\'une certaine université sans révéler sa note, ou prouver qu\'elle a plus de 21 ans sans révéler sa date de naissance exacte. L\'utilisateur passe d\'un rôle passif, où ses données sont exploitées, à un rôle actif, où il est le gardien et le contrôleur de sa propre identité numérique.

## 59.4 Technologies de Préservation de la Confidentialité

Le fondement des blockchains publiques est une transparence radicale. Chaque transaction, chaque interaction avec un contrat intelligent, est enregistrée de manière permanente et est visible par quiconque souhaite inspecter le registre. Cette auditabilité publique est essentielle pour la vérification et la confiance dans un système décentralisé. Cependant, elle crée un paradoxe : pour de nombreuses applications du monde réel -- de la finance d\'entreprise au vote électronique, en passant par la gestion des données de santé -- la confidentialité n\'est pas une option, mais une nécessité absolue.

Comment concilier le besoin de vérification publique avec l\'exigence de confidentialité privée? La réponse se trouve dans des techniques cryptographiques avancées qui permettent de prouver la validité d\'une information sans révéler l\'information elle-même. Ces technologies ne cherchent pas à rendre la blockchain opaque, mais à superposer une couche de confidentialité sur sa base vérifiable. Elles permettent de séparer la *validation* d\'une règle de la *divulgation* des données sous-jacentes, offrant ainsi le meilleur des deux mondes : la sécurité d\'un consensus public et la confidentialité des interactions privées.

### 59.4.1 Preuves à Divulgation Nulle de Connaissance (Zero-Knowledge Proofs - ZKP)

Une preuve à divulgation nulle de connaissance (ZKP) est un protocole cryptographique permettant à une partie, le **Prouveur**, de convaincre une autre partie, le **Vérificateur**, qu\'une déclaration est vraie, sans révéler aucune information autre que le fait que la déclaration est vraie. Pour être considérée comme une ZKP, une construction doit satisfaire trois propriétés fondamentales  :

> **Complétude (Completeness) :** Si la déclaration est vraie et que le prouveur et le vérificateur sont honnêtes, le vérificateur sera toujours convaincu.
>
> **Robustesse (Soundness) :** Si la déclaration est fausse, aucun prouveur malhonnête ne peut convaincre un vérificateur honnête que la déclaration est vraie (sauf avec une probabilité négligeable).
>
> **Divulgation Nulle (Zero-Knowledge) :** Si la déclaration est vraie, le vérificateur n\'apprend rien d\'autre que le fait que la déclaration est vraie. Il n\'obtient aucune information sur le \"secret\" qui rend la déclaration vraie.

L\'analogie classique est celle de la grotte d\'Ali Baba : Peggy (le prouveur) veut prouver à Victor (le vérificateur) qu\'elle connaît le mot de passe secret d\'une porte magique au fond d\'une grotte en forme d\'anneau, sans révéler le mot de passe. Victor attend à l\'entrée pendant que Peggy entre et choisit l\'un des deux chemins. Victor crie ensuite au hasard le chemin par lequel il veut que Peggy ressorte. Si Peggy connaît le mot de passe, elle peut ouvrir la porte et ressortir par le chemin demandé, quel qu\'il soit. Après avoir répété l\'expérience de nombreuses fois, Victor devient convaincu que Peggy connaît le mot de passe, car la probabilité qu\'elle ait deviné le bon chemin à chaque fois par chance devient infinitésimale. Pourtant, Victor n\'a jamais vu le mot de passe ni appris quoi que ce soit à son sujet.

Dans le contexte de la blockchain, les ZKP permettent de construire des transactions confidentielles. Au lieu d\'enregistrer l\'expéditeur, le destinataire et le montant en clair, une transaction peut être chiffrée. Elle est accompagnée d\'une ZKP qui prouve au réseau que la transaction est valide (par exemple, que l\'expéditeur avait les fonds nécessaires, que la signature est correcte et qu\'aucune monnaie n\'a été créée à partir de rien), le tout sans révéler les détails chiffrés.

#### ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge)

Les ZK-SNARKs sont une forme particulièrement efficace de ZKP, très utilisée dans l\'écosystème blockchain. L\'acronyme se décompose comme suit :

> **Succinct :** La preuve est de très petite taille (quelques centaines d\'octets) et peut être vérifiée très rapidement (en quelques millisecondes), indépendamment de la complexité du calcul qu\'elle prouve. C\'est crucial pour une utilisation sur la chaîne, où le stockage et le calcul sont coûteux.
>
> **Non-Interactive :** Contrairement à l\'exemple de la grotte qui nécessite plusieurs allers-retours, un SNARK est une preuve unique que le prouveur envoie au vérificateur. Aucune autre communication n\'est nécessaire.
>
> **Argument of Knowledge :** La preuve démontre non seulement que la déclaration est vraie, mais aussi que le prouveur possède effectivement la connaissance (le \"secret\" ou *witness*) qui la rend vraie.

La cryptomonnaie Zcash est l\'une des premières et des plus célèbres applications des ZK-SNARKs, permettant des transactions entièrement privées sur une blockchain publique.

Un défi majeur de nombreuses constructions de ZK-SNARKs (comme le populaire Groth16) est la nécessité d\'une **cérémonie de \"configuration de confiance\" (*trusted setup*)**. Cette procédure, réalisée une seule fois, génère des paramètres cryptographiques publics (appelés

*Common Reference String* ou *Structured Reference String*) nécessaires pour créer et vérifier les preuves. Cependant, cette cérémonie génère également des données secrètes, souvent appelées \"déchets toxiques\" (

*toxic waste*). Si une seule personne ou entité conserve une copie de ces déchets, elle peut créer de fausses preuves qui seront acceptées comme valides, lui permettant potentiellement de contrefaire de la monnaie sans être détectée.

Pour atténuer ce risque systémique, des **cérémonies de configuration multi-parties (MPC)** sont organisées. Plusieurs participants, des dizaines voire des milliers, contribuent séquentiellement à la création des paramètres. Chacun ajoute son propre secret, utilise le résultat pour générer sa partie des paramètres, puis détruit son secret. La sécurité du système final repose sur l\'hypothèse qu\'**au moins un** des participants était honnête et a bien détruit son secret. Si c\'est le cas, les déchets toxiques globaux sont irrécupérables, et le système est sécurisé.

#### ZK-STARKs (Zero-Knowledge Scalable Transparent Argument of Knowledge)

Les ZK-STARKs sont une technologie de ZKP plus récente qui a été développée pour surmonter certaines des limitations des SNARKs, notamment la dépendance à une configuration de confiance.

> **Transparent :** C\'est leur principal avantage. Les STARKs ne nécessitent aucune configuration de confiance. Les paramètres sont générés à l\'aide d\'une source d\'aléa publique et vérifiable. Il n\'y a pas de \"déchets toxiques\", ce qui élimine le risque associé à la cérémonie de configuration.
>
> **Scalable :** Le temps de génération de la preuve pour les STARKs croît de manière quasi-logarithmique avec la complexité du calcul, ce qui les rend plus efficaces que les SNARKs pour des calculs très volumineux.
>
> **Résistance Quantique :** Les STARKs reposent sur des hypothèses de sécurité plus simples, comme la résistance aux collisions des fonctions de hachage, plutôt que sur la cryptographie sur les courbes elliptiques. Cela les rend théoriquement résistants aux attaques d\'ordinateurs quantiques, contrairement à la plupart des SNARKs actuels.

Le principal compromis des STARKs est la **taille de la preuve**. Une preuve STARK est significativement plus grande qu\'une preuve SNARK (de l\'ordre des kilooctets contre quelques centaines d\'octets). Dans un environnement comme Ethereum où chaque octet de données stocké sur la chaîne a un coût, cela peut rendre la vérification des STARKs plus onéreuse.

Le choix entre SNARKs et STARKs illustre bien le spectre des compromis en matière de confidentialité et de scalabilité. Il n\'y a pas de solution universellement supérieure ; le choix dépend des priorités du cas d\'usage : privilégie-t-on la taille minimale de la preuve (SNARKs) ou l\'absence d\'hypothèse de confiance et la résistance quantique (STARKs)?

### 59.4.2 Calcul Sécurisé Multi-Parties (Secure Multi-Party Computation - SMPC)

Le Calcul Sécurisé Multi-Parties (SMPC ou MPC) est un autre pilier de la cryptographie moderne axée sur la confidentialité. Son objectif est différent de celui des ZKP. Alors qu\'une ZKP permet à *une* partie de prouver une connaissance à une autre, le SMPC permet à *plusieurs* parties de calculer conjointement une fonction sur leurs données privées, de sorte que le résultat est révélé, mais les données d\'entrée individuelles restent secrètes pour tous les participants.

Le problème classique qui illustre le SMPC est le **problème des millionnaires de Yao** : deux millionnaires, Alice et Bob, veulent savoir qui est le plus riche sans révéler le montant de leur fortune respective. Un protocole SMPC leur permet d\'obtenir la réponse (\"Alice est plus riche\" ou \"Bob est plus riche\") sans qu\'aucun des deux n\'apprenne quoi que ce soit sur la fortune de l\'autre, à l\'exception de ce qui peut être déduit du résultat final.

Les protocoles SMPC doivent garantir deux propriétés essentielles  :

> **Confidentialité (Privacy) :** Aucune partie ne doit apprendre quoi que ce soit sur les entrées des autres parties, au-delà de ce qui peut être inféré du résultat public.
>
> **Correction (Correctness) :** Le résultat du calcul conjoint doit être correct. Les parties malveillantes ne doivent pas pouvoir forcer le protocole à produire un résultat incorrect.

Les protocoles SMPC reposent sur des primitives cryptographiques fondamentales, notamment le **partage de secrets** (comme le partage de secrets de Shamir) et le **chiffrement homomorphe**. Dans le partage de secrets, une donnée secrète est divisée en plusieurs \"parts\". Chaque participant reçoit une part, et un certain seuil de participants est nécessaire pour reconstituer le secret. Aucune part individuelle ne révèle d\'information sur le secret. Les calculs peuvent ensuite être effectués directement sur ces parts chiffrées.

Dans l\'écosystème de la blockchain et des actifs numériques, le SMPC a trouvé une application particulièrement pertinente dans la **gestion sécurisée des clés privées**. Une clé privée représente un point de défaillance unique : quiconque la possède contrôle les fonds associés. En utilisant le SMPC, une clé privée peut être générée de manière distribuée : elle n\'existe jamais en un seul morceau. Au lieu de cela, elle est divisée en plusieurs parts secrètes, chacune détenue par une partie différente (par exemple, l\'utilisateur, un serveur de l\'entreprise, un tiers de confiance).

Pour signer une transaction, un seuil prédéfini de détenteurs de parts doit collaborer. Ils exécutent un protocole SMPC qui leur permet de calculer conjointement la signature numérique sans jamais reconstituer la clé privée complète en un seul endroit. Cette approche, connue sous le nom de portefeuille MPC, élimine le risque de point de défaillance unique et augmente considérablement la sécurité, car un attaquant devrait compromettre plusieurs parties pour prendre le contrôle des fonds. C\'est une alternative plus flexible et souvent plus sécurisée aux portefeuilles multi-signatures traditionnels.

En conclusion, les technologies de préservation de la confidentialité ne sont plus une niche académique mais des composantes essentielles pour la maturité de l\'écosystème Web3. Elles permettent de résoudre le conflit apparent entre la transparence requise pour la sécurité décentralisée et la confidentialité nécessaire à une adoption généralisée, ouvrant la voie à une nouvelle génération d\'applications qui sont à la fois vérifiables et privées.

