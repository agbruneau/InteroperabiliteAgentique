# Chapitre I.35 : Systèmes Distribués

## 35.1 Caractéristiques et Défis Fondamentaux

### Introduction : La Rupture du Modèle Centralisé

L\'informatique, dans ses premières décennies, a été largement dominée par le paradigme centralisé : un ordinateur unique, puissant et monolithique, agissant comme le cœur et le cerveau de tout traitement. Ce modèle, incarné par les mainframes, offrait une simplicité conceptuelle et une gestion unifiée des ressources. Cependant, l\'avènement des réseaux informatiques et la chute drastique du coût du matériel ont catalysé une révolution architecturale, menant à l\'émergence et à la prédominance des systèmes distribués.

#### Définition formelle d\'un système distribué

Un système distribué peut être défini formellement comme une collection de composantes de calcul autonomes, souvent appelées processus ou nœuds, qui sont situées sur des machines physiquement distinctes et interconnectées par un réseau. Ces composantes ne partagent ni mémoire ni horloge physique commune; elles communiquent et coordonnent leurs actions exclusivement par l\'échange de messages. La caractéristique essentielle et déterminante de cette architecture est que, malgré sa nature intrinsèquement répartie, le système doit apparaître à ses utilisateurs comme un système unique et cohérent. Cette illusion d\'unité, masquant la complexité de la distribution sous-jacente, est l\'objectif principal de la conception de tels systèmes.

Cette définition met en lumière les deux piliers du calcul distribué : l\'autonomie des composantes et la communication par messages comme seule primitive de coordination. L\'absence de mémoire partagée implique qu\'un processus ne peut pas accéder directement à l\'état d\'un autre; toute information doit être explicitement transmise. De même, l\'absence d\'une horloge globale signifie qu\'il n\'existe aucune référence temporelle absolue et universelle pour ordonner les événements à travers le système. Ces deux contraintes fondamentales sont à l\'origine de la quasi-totalité des défis théoriques et pratiques que nous explorerons dans ce chapitre.

#### Contraste fondamental avec les systèmes centralisés et parallèles

Pour saisir pleinement la nature des systèmes distribués, il est impératif de les distinguer de deux autres modèles architecturaux majeurs : les systèmes centralisés et les systèmes parallèles.

Les **systèmes centralisés** reposent sur un unique serveur ou nœud de calcul qui orchestre toutes les opérations et gère l\'ensemble des données. Les autres machines, agissant comme des clients ou des terminaux, ne font que soumettre des requêtes à cette autorité centrale. Cette architecture offre une administration et une maintenance simplifiées, car la logique et l\'état sont concentrés en un seul point. Cependant, cette simplicité a un coût élevé. Le nœud central constitue un point de défaillance unique (SPOF,

*Single Point of Failure*) : sa panne entraîne l\'indisponibilité totale du système. De plus, sa capacité de traitement est limitée par la puissance d\'une seule machine, un goulot d\'étranglement qui ne peut être surmonté que par une mise à l\'échelle verticale (augmentation de la puissance du serveur unique), une approche coûteuse et limitée.

Les **systèmes distribués**, en revanche, répartissent la charge de calcul et le stockage des données sur de multiples machines. Cette distribution élimine par conception le point de défaillance unique et permet une mise à l\'échelle horizontale : pour augmenter la capacité, il suffit d\'ajouter de nouveaux nœuds au système. Cette architecture est donc intrinsèquement plus résiliente et évolutive. La contrepartie est une augmentation spectaculaire de la complexité. La nécessité de synchroniser des nœuds autonomes, de gérer les pannes partielles et de maintenir la cohérence des données en l\'absence d\'un arbitre central introduit une nouvelle classe de problèmes algorithmiques.

Les **systèmes parallèles**, quant à eux, visent principalement à accélérer l\'exécution d\'un seul calcul en le divisant en tâches pouvant être exécutées simultanément par plusieurs processeurs. Ils sont souvent caractérisés par un couplage fort et, dans de nombreuses configurations (comme les architectures SMP,

*Symmetric Multiprocessing*), par une mémoire partagée. Les processeurs communiquent à très haute vitesse via un bus partagé et accèdent à un espace d\'adressage commun. À l\'inverse, les systèmes distribués sont typiquement faiblement couplés; chaque processeur dispose de sa propre mémoire privée, et la communication, qui s\'effectue via un réseau potentiellement lent et peu fiable, constitue le principal goulot d\'étranglement.

Le tableau suivant synthétise les différences fondamentales entre ces architectures.

  ---------------------------------------- ----------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------
  Critère                                  Système Centralisé                                                      Système Distribué

  **Point de Défaillance Unique (SPOF)**   Oui (le serveur central)                                                Non (par conception)

  **Évolutivité (Scalability)**            Verticale (limitée par la puissance d\'une seule machine)               Horizontale (quasi illimitée par l\'ajout de machines)

  **Latence**                              Potentiellement élevée en raison de la congestion sur le nœud central   Peut être faible en plaçant les données près des utilisateurs, mais la communication inter-nœuds introduit de la latence

  **Complexité**                           Faible (gestion et administration simplifiées)                          Élevée (synchronisation, consensus, détection de pannes)

  **Coût**                                 Coût initial élevé pour une machine puissante                           Coût initial plus faible (matériel de commodité), mais coût de gestion et d\'exploitation plus élevé
  ---------------------------------------- ----------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------

#### Illustration par des exemples concrets

L\'omniprésence des systèmes distribués dans le paysage technologique contemporain témoigne de leur capacité à répondre aux exigences d\'évolutivité et de disponibilité de l\'ère numérique. Les services d\'informatique en nuage (*cloud computing*) comme Amazon Web Services (AWS) ou Microsoft Azure sont des exemples paradigmatiques : ils fournissent une infrastructure de calcul et de stockage massivement distribuée, accessible comme un service unifié. Les bases de données distribuées, telles qu\'Apache Cassandra ou MongoDB, permettent de stocker et d\'interroger des pétaoctets de données sur des centaines de serveurs, garantissant à la fois performance et tolérance aux pannes.

Les réseaux de télécommunication, qui acheminent des milliards d\'appels et de sessions de données simultanément, sont des systèmes distribués complexes. Les systèmes financiers mondiaux s\'appuient sur des bases de données distribuées pour traiter des millions de transactions de manière sécurisée et fiable. Enfin, les technologies de registres distribués (

*Distributed Ledger Technologies*, DLT), dont la blockchain est l\'exemple le plus connu, utilisent des algorithmes de consensus distribué pour maintenir un registre partagé et immuable sans autorité centrale.

### Les Défis Inhérents au Calcul Distribué

La transition d\'un modèle centralisé à un modèle distribué n\'est pas sans coût. Elle introduit une série de défis fondamentaux qui n\'existent pas, ou existent sous une forme beaucoup plus simple, dans les systèmes centralisés. Ces défis ne sont pas des problèmes d\'implémentation que l\'on pourrait \"résoudre\" par une meilleure ingénierie logicielle; ce sont des contraintes inhérentes au modèle de calcul asynchrone sur un réseau non fiable. L\'art de l\'ingénierie des systèmes distribués consiste à concevoir des algorithmes et des architectures qui gèrent ces contraintes de manière robuste.

#### La Concurrence

Dans un système distribué, de multiples processus clients peuvent tenter d\'accéder et de modifier des ressources partagées simultanément. Dans un système centralisé, la concurrence est gérée par le système d\'exploitation ou le système de gestion de base de données via des mécanismes locaux comme les verrous (

*locks*) ou les sémaphores. L\'ordonnancement des accès est géré par un arbitre unique. Dans un système distribué, il n\'y a pas d\'arbitre central. La coordination des accès concurrentiels pour préserver la cohérence des données (par exemple, pour s\'assurer que deux utilisateurs ne réservent pas le même siège d\'avion en même temps) devient un problème algorithmique complexe qui doit être résolu par des protocoles de communication entre les nœuds.

#### L\'Absence d\'État et de Temps Global

Ce défi est sans doute le plus profond et le plus contre-intuitif. Il se décompose en deux aspects interconnectés :

> **Absence de temps global :** Il n\'existe pas d\'horloge globale unique et parfaitement synchronisée accessible à tous les nœuds. Chaque machine possède sa propre horloge physique, un oscillateur à quartz sujet à des dérives, ce qui signifie que les horloges de différentes machines s\'écartent inévitablement les unes des autres au fil du temps. Bien que des protocoles comme NTP (\
> *Network Time Protocol*) permettent une synchronisation approximative, ils ne peuvent garantir une précision parfaite.
>
> **Absence d\'état global instantané :** En raison de la latence imprévisible et non nulle des communications réseau, il est fondamentalement impossible pour un processus d\'obtenir une vision instantanée et précise de l\'état de tous les autres processus du système. L\'état global d\'un système distribué est défini comme l\'union des états locaux de tous les processus et de l\'état des messages en transit dans les canaux de communication. Au moment où un processus reçoit l\'état d\'un autre nœud, son propre état a déjà changé, et l\'état du nœud distant a peut-être changé à nouveau. Nous ne pouvons jamais connaître le \"maintenant\" global.

Cette absence d\'un ordre total naturel sur les événements qui se produisent sur différentes machines est la source de nombreux problèmes complexes, notamment la difficulté de déterminer la causalité entre les événements, un sujet que nous explorerons en détail dans la section 35.3.

#### La Gestion des Pannes Partielles

Dans un système centralisé, les pannes sont généralement binaires et totales : soit le système fonctionne, soit il est en panne. Dans un système distribué, la réalité est beaucoup plus nuancée. Un ou plusieurs nœuds, ou un ou plusieurs liens réseau, peuvent tomber en panne tandis que le reste du système continue de fonctionner. Cette possibilité de

**panne partielle** est une nouvelle classe de défaillance qui complique extraordinairement la conception et le raisonnement sur les systèmes.

Le problème fondamental est l\'**incertitude**. Lorsqu\'un processus *P* envoie un message à un processus *Q* et ne reçoit pas de réponse dans un délai imparti, il est impossible pour *P* de distinguer avec certitude les scénarios suivants  :

> Le processus *Q* est tombé en panne (*crash*).
>
> Le processus *Q* est simplement très lent ou surchargé.
>
> Le lien réseau de *P* vers *Q* est en panne.
>
> Le lien réseau de *Q* vers *P* est en panne.
>
> Le message de *P* ou la réponse de *Q* est simplement retardé dans le réseau.

Cette ambiguïté fondamentale signifie qu\'un processus ne peut jamais être certain de l\'état des autres processus. Il ne peut que les \"suspecter\" d\'être en panne. La conception de protocoles qui fonctionnent correctement face à cette incertitude est l\'un des défis majeurs de l\'algorithmique distribuée.

### Objectifs de Conception : Le Prisme de la Transparence

Face à ces défis inhérents, l\'objectif principal de la conception d\'un système distribué est de maîtriser sa complexité. L\'outil conceptuel le plus puissant pour y parvenir est la **transparence**.

#### Définition

En informatique distribuée, la transparence est la propriété d\'un système qui masque aux utilisateurs et aux développeurs d\'applications sa nature répartie. L\'objectif est de faire en sorte que le système se comporte, du point de vue de l\'utilisateur, comme un système centralisé idéal : simple, cohérent et unifié. La transparence est une forme d\'abstraction qui vise à simplifier radicalement l\'interaction avec le système en cachant les mécanismes complexes de communication, de coordination, de réplication et de gestion des pannes.

#### Analyse détaillée des formes de transparence

La norme ISO RM-ODP (*Reference Model for Open Distributed Processing*) a formalisé plusieurs formes de transparence, chacune s\'attaquant à un aspect spécifique de la complexité de la distribution.

> **Transparence d\'accès :** Cette forme de transparence masque les différences de représentation des données et les mécanismes de communication sous-jacents. Elle permet aux applications d\'accéder à des ressources distantes en utilisant les mêmes opérations primitives que pour les ressources locales. L\'appel de procédure à distance (RPC), que nous étudierons dans la section 35.2, est un mécanisme clé pour atteindre la transparence d\'accès.
>
> **Transparence de localisation :** Les utilisateurs et les applications peuvent accéder aux ressources par leur nom logique, sans avoir besoin de connaître leur emplacement physique ou réseau (par exemple, leur adresse IP et leur numéro de port). Les services de nommage, comme le DNS (\
> *Domain Name System*), sont des exemples fondamentaux de mécanismes offrant une transparence de localisation.
>
> **Transparence à la réplication :** Pour des raisons de performance ou de tolérance aux pannes, les données et les services sont souvent dupliqués sur plusieurs nœuds. La transparence à la réplication garantit qu\'un ensemble de répliques est présenté à l\'utilisateur comme une seule et unique ressource. Le système gère en arrière-plan la redirection des requêtes vers une réplique appropriée et la synchronisation des données entre les répliques.
>
> **Transparence aux pannes :** C\'est l\'une des formes de transparence les plus difficiles à réaliser. Elle vise à permettre aux applications de poursuivre leur exécution et de terminer leurs tâches avec succès malgré la défaillance de certains composants du système. Cela implique des mécanismes de détection de pannes, de masquage (par exemple, en basculant sur une réplique) et de récupération.
>
> **Transparence à la concurrence :** Elle garantit que chaque utilisateur ou processus peut accéder aux ressources partagées comme s\'il était le seul à le faire, même si des centaines d\'autres processus y accèdent simultanément. Le système doit gérer en interne les conflits d\'accès et la synchronisation pour préserver la cohérence des données, sans que l\'application n\'ait à implémenter une logique de verrouillage complexe.
>
> **Transparence à la migration (ou mobilité) :** Cette transparence permet de déplacer des ressources (comme des objets de données) ou des processus d\'un nœud à un autre au sein du système sans que cela n\'affecte les applications qui les utilisent. C\'est une propriété essentielle pour l\'équilibrage de charge et la maintenance du système.
>
> **Transparence à l\'extensibilité (Évolutivité) :** Elle permet au système de croître en taille (nombre de nœuds) et en charge de travail sans nécessiter de modifications dans l\'architecture des applications ni de dégradation significative des performances.

Il est important de noter que la transparence, bien qu\'étant un idéal de conception, est souvent une \"abstraction qui fuit\" (*leaky abstraction*). Il est pratiquement impossible de masquer complètement tous les aspects de la distribution. Par exemple, un appel de procédure à distance ne peut pas masquer la possibilité d\'une panne réseau, une classe d\'erreur qui n\'existe tout simplement pas pour un appel de procédure local. La latence de la communication à travers un réseau est également un fait physique indéniable qui ne peut être totalement abstrait. Par conséquent, les concepteurs de systèmes distribués doivent souvent faire un compromis conscient entre le niveau de transparence offert et la nécessité d\'exposer certains aspects de la distribution aux couches applicatives supérieures pour leur permettre de gérer correctement les cas d\'erreur et les contraintes de performance. Des outils modernes comme le traçage distribué sont une reconnaissance de cette réalité : ils ne visent pas à rendre la distribution invisible, mais plutôt à la rendre

*observable* afin de pouvoir la déboguer et l\'optimiser.

## 35.2 Communication Distribuée

Au cœur de tout système distribué se trouve la communication. Comme nous l\'avons établi, en l\'absence de mémoire partagée, le passage de messages est la seule et unique primitive permettant aux processus autonomes d\'interagir, de coordonner leurs actions et de partager des informations. La manière dont cette communication est structurée et les abstractions qui sont offertes aux développeurs définissent les paradigmes de communication distribuée. Ces paradigmes influencent profondément l\'architecture, la complexité et la résilience des applications. Nous nous concentrerons ici sur deux modèles diamétralement opposés : le modèle synchrone et couplé de l\'appel de procédure à distance (RPC) et le modèle asynchrone et découplé des intergiciels orientés message (MOM).

### Le Modèle Synchrone Simulé : L\'Appel de Procédure à Distance (RPC) et l\'Invocation de Méthode à Distance (RMI)

Le paradigme de l\'appel de procédure à distance (RPC) est né d\'une ambition puissante : atteindre une transparence d\'accès quasi parfaite en permettant à un programme s\'exécutant sur une machine (le client) d\'invoquer une procédure ou une fonction sur une autre machine (le serveur) avec la même syntaxe et la même sémantique qu\'un appel de fonction local. L\'objectif est de masquer entièrement la complexité de la communication réseau sous-jacente, créant ainsi une abstraction de communication synchrone, de type requête-réponse.

#### Mécanisme Détaillé

L\'illusion d\'un appel local est maintenue par une série de composants et d\'étapes qui opèrent de manière transparente pour le développeur.

> **Interface Definition Language (IDL) :** Le point de départ est la définition d\'un contrat formel entre le client et le serveur. Cet IDL est un langage de spécification, indépendant de tout langage de programmation, qui décrit les procédures exportées par le serveur, y compris le nom de chaque procédure, ainsi que les types de données de ses paramètres d\'entrée et de sa valeur de retour. Ce contrat est la source de vérité à partir de laquelle les autres composants sont générés.
>
> **Stubs (Talons Client) :** À partir de la description IDL, un compilateur spécifique génère un module de code côté client appelé *stub* (ou talon). Ce stub a la même signature que la procédure distante. Lorsque le programme client appelle cette procédure, il appelle en réalité une fonction locale dans le stub. Le rôle du stub est double :

**Marshalling :** Il prend les arguments de l\'appel, qui résident dans la mémoire du client, et les sérialise en un flux d\'octets. Ce processus, appelé *marshalling* ou *parameter packing*, consiste à aplatir les structures de données, à les convertir dans un format réseau standardisé (pour gérer l\'hétérogénéité des architectures matérielles, comme l\'ordre des octets) et à les empaqueter dans un message.

**Communication :** Le stub invoque ensuite les primitives du système d\'exploitation pour envoyer ce message au serveur via le réseau, en utilisant un protocole de transport sous-jacent comme TCP ou UDP. Après l\'envoi, le stub bloque le fil d\'exécution du client en attendant la réponse du serveur.

> **Squelette (Talon Serveur) :** De manière symétrique, le compilateur IDL génère un *squelette* (ou *skeleton*) côté serveur. Ce module est responsable de la réception des requêtes. Son rôle est l\'inverse de celui du stub :

**Unmarshalling :** Il reçoit le message du réseau, en extrait le flux d\'octets et le désérialise pour reconstruire les arguments originaux dans l\'espace mémoire du serveur. C\'est l\'étape d\'*unmarshalling*.

**Invocation :** Le squelette appelle ensuite la procédure serveur réelle avec les arguments reconstruits.

**Retour :** Une fois que la procédure serveur a terminé son exécution et retourné un résultat, le squelette prend cette valeur de retour, la *marshalise* en un message de réponse et l\'envoie au client.

> **Retour au Client :** Le stub client, qui était en attente, reçoit le message de réponse. Il effectue l\'*unmarshalling* de la valeur de retour et la transmet au programme client appelant, qui se débloque et continue son exécution comme s\'il revenait d\'un appel de fonction local.

Ce mécanisme complexe, illustré par des outils comme rpcgen de Sun RPC, parvient à créer une abstraction remarquablement simple et familière pour le programmeur.

#### RMI (Remote Method Invocation)

L\'invocation de méthode à distance (RMI) est l\'extension naturelle et orientée objet du paradigme RPC, popularisée et intégrée nativement dans l\'écosystème Java. Le principe reste le même : invoquer une méthode sur un objet distant comme s\'il s\'agissait d\'un objet local. Les stubs et squelettes jouent des rôles analogues. La principale différence réside dans la sémantique orientée objet. Avec RMI, il est possible de passer des objets en tant que paramètres ou valeurs de retour. Si un objet est sérialisable (implémente l\'interface

java.io.Serializable), il est passé par valeur : une copie complète de l\'objet est sérialisée, envoyée sur le réseau et reconstituée sur la machine distante. Si un objet est lui-même un objet distant (implémente l\'interface java.rmi.Remote), il est passé par référence : c\'est en fait son stub qui est envoyé, permettant au destinataire d\'invoquer à son tour des méthodes sur cet objet.

#### Sémantique en Cas de Panne

La simplicité apparente du RPC est une abstraction qui fuit, et nulle part cette fuite n\'est plus évidente que dans la gestion des pannes. Un appel de fonction local ne peut échouer que de manière limitée (par exemple, une erreur de segmentation). Un appel de procédure à distance, lui, peut échouer pour une myriade de raisons liées à la distribution : le serveur peut être en panne, le réseau peut être partitionné, les messages peuvent être perdus ou excessivement retardés.

Le problème fondamental est qu\'après avoir envoyé une requête, si le client n\'obtient pas de réponse, il est dans un état d\'incertitude totale. Il ne peut pas savoir si la procédure a été exécutée une fois, plusieurs fois, ou pas du tout. Cette incertitude conduit à la nécessité de définir des sémantiques de panne explicites  :

> **Sémantique *at-most-once* (au plus une fois) :** Le système garantit que la procédure distante ne sera jamais exécutée plus d\'une fois. C\'est la sémantique la plus sûre pour les opérations non idempotentes (par exemple, débiter un compte bancaire). Cependant, elle ne garantit pas que l\'opération sera exécutée; en cas de doute, le système préfère l\'échec à la répétition.
>
> **Sémantique *at-least-once* (au moins une fois) :** Le client réessaye l\'appel jusqu\'à ce qu\'il reçoive une confirmation du serveur. Cela garantit que l\'opération finira par être exécutée (si le serveur redevient disponible), mais cela peut entraîner des exécutions multiples si la réponse à un appel réussi est perdue. Cette sémantique n\'est acceptable que pour les opérations **idempotentes**, c\'est-à-dire les opérations qui peuvent être répétées plusieurs fois sans effet secondaire (par exemple, lire une valeur ou définir une valeur à une constante).
>
> **Sémantique *exactly-once* (exactement une fois) :** C\'est l\'idéal sémantique, qui imite parfaitement un appel local. L\'opération est garantie d\'être exécutée une et une seule fois. Cependant, la réalisation de cette sémantique dans un système asynchrone sujet aux pannes est extrêmement difficile et coûteuse, nécessitant généralement des protocoles transactionnels distribués complexes (comme la validation en deux phases).

Le choix entre RPC et d\'autres paradigmes est donc un choix architectural fondamental. Le RPC offre une abstraction de programmation simple et familière, mais ce faisant, il crée un couplage synchrone et fort entre le client et le serveur. Si le service distant est lent ou en panne, le client est bloqué. Cette fragilité inhérente a conduit au développement d\'un paradigme alternatif basé sur le découplage et l\'asynchronisme.

### Le Modèle Asynchrone et Découplé : Les Intergiciels Orientés Message (MOM)

Les intergiciels orientés message (*Message-Oriented Middleware*, MOM) adoptent une approche radicalement différente de la communication. Au lieu de masquer la communication, ils l\'exposent comme une primitive de première classe, mais en introduisant un intermédiaire -- typiquement un *broker* de messages ou une file d\'attente -- entre les entités communicantes. Cet intermédiaire a un effet profond : il découple les communicateurs dans l\'espace et dans le temps.

#### Composants et Avantages

Le paradigme MOM repose sur quelques concepts clés qui lui confèrent une robustesse et une flexibilité remarquables.

> **Communication Asynchrone :** L\'interaction est fondamentalement asynchrone. Lorsqu\'un processus (le *producteur*) envoie un message, il le dépose dans la file d\'attente et peut immédiatement continuer son travail sans attendre que le message soit traité. Le processus destinataire (le *consommateur*) récupérera le message de la file plus tard, à son propre rythme.
>
> **Découplage Temporel :** Le producteur et le consommateur n\'ont pas besoin d\'être actifs et connectés au réseau en même temps. Le MOM agit comme un tampon temporel. Si le consommateur est en panne ou indisponible, les messages s\'accumulent simplement dans la file d\'attente, prêts à être traités dès son redémarrage.
>
> **Découplage Spatial :** Le producteur n\'a pas besoin de connaître l\'identité ou l\'emplacement réseau du consommateur, et vice-versa. Les deux ne connaissent que l\'emplacement de la file de messages. Cela permet d\'ajouter, de supprimer ou de modifier des producteurs et des consommateurs de manière flexible sans impacter le reste du système.
>
> **Persistance et Fiabilité :** La plupart des MOM offrent une persistance des messages, ce qui signifie que les messages dans la file sont stockés sur un support durable (comme un disque dur). Couplé à des mécanismes d\'accusé de réception, cela garantit que les messages ne sont pas perdus, même en cas de panne du broker lui-même. Le MOM peut garantir la livraison du message, soulageant les applications de cette responsabilité.

#### Modèles de Communication

Les MOM supportent généralement deux modèles de communication principaux, qui répondent à des besoins différents.

> **Point à Point (Point-to-Point) :** Dans ce modèle, les messages sont envoyés à une **file d\'attente** (*queue*). Chaque message dans la file est destiné à être traité par un seul et unique consommateur. Même si plusieurs consommateurs écoutent sur la même file, le broker s\'assure qu\'un message donné n\'est livré qu\'à l\'un d\'entre eux. Une fois que le consommateur a traité le message et envoyé un accusé de réception, le message est définitivement retiré de la file. Ce modèle est idéal pour la distribution de tâches, où chaque tâche doit être exécutée exactement une fois.
>
> **Publication/Abonnement (Publish/Subscribe) :** Dans ce modèle, les messages sont envoyés à un **sujet** (*topic*). Les consommateurs, appelés *abonnés*, déclarent leur intérêt pour un ou plusieurs sujets. Lorsqu\'un producteur, ou *éditeur*, envoie un message à un sujet, le broker en distribue une copie à *tous* les abonnés actuellement actifs pour ce sujet. Le message n\'est pas retiré après avoir été lu par un abonné; il reste disponible pour les autres. Ce modèle est parfaitement adapté à la diffusion d\'événements, de notifications ou de mises à jour d\'état à un ensemble potentiellement large et dynamique de parties intéressées.

L\'architecture des systèmes modernes, en particulier les architectures de microservices, tire parti de ces deux modèles. Les RPC (souvent implémentés avec des technologies plus modernes comme gRPC) sont utilisés pour les interactions synchrones où une réponse immédiate est nécessaire, tandis que les MOM sont utilisés pour les communications asynchrones, les flux d\'événements et les tâches en arrière-plan, où la résilience et le découplage sont primordiaux. Le choix du paradigme de communication est donc l\'une des décisions architecturales les plus critiques dans la conception d\'un système distribué.

  ----------------------------- ---------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------
  Critère                       RPC/RMI                                                                            MOM

  **Modèle de communication**   Synchrone (bloquant)                                                               Asynchrone (non bloquant)

  **Couplage**                  Fort (spatial et temporel)                                                         Faible (découplage spatial et temporel)

  **Gestion des pannes**        Gérée par le client (complexe)                                                     Gérée par l\'intergiciel (persistance, nouvelle tentative)

  **Modèle de programmation**   Simple, similaire à un appel de fonction local                                     Plus complexe, basé sur les événements

  **Cas d\'usage**              Interactions directes client-serveur, requêtes nécessitant une réponse immédiate   Intégration d\'applications, traitement de flux de données, systèmes tolérants aux pannes
  ----------------------------- ---------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------

## 35.3 Temps, États Globaux et Causalité

L\'un des sauts conceptuels les plus profonds et les plus nécessaires pour comprendre les systèmes distribués est l\'abandon de la notion intuitive et familière d\'un temps universel et absolu. Dans un système centralisé, tous les événements peuvent être placés sur une seule ligne de temps, créant un ordre total sans ambiguïté. Dans un système distribué, cette vision s\'effondre. L\'absence d\'horloge globale et la présence de latences de communication imprévisibles nous forcent à redéfinir la notion même d\'ordre. Ce n\'est plus le \"quand\" absolu qui importe, mais le \"quoi a causé quoi\". Cette section explore comment les systèmes distribués raisonnent sur le temps non pas comme une quantité physique, mais comme une relation de causalité logique.

### Le Problème du Temps : De la Causalité Physique à la Causalité Logique

En physique, le principe de causalité est une loi fondamentale : une cause doit précéder son effet. La théorie de la relativité restreinte affine ce principe en stipulant qu\'une information ne peut se propager plus vite que la vitesse de la lumière. Par conséquent, un événement A ne peut causer un événement B que si B se trouve dans le \"cône de lumière\" futur de A. Dans les systèmes distribués, la latence de transmission des messages sur le réseau, bien que beaucoup plus lente et variable, joue un rôle conceptuellement analogue.

Le problème pratique est double. Premièrement, les horloges physiques de chaque ordinateur, basées sur des oscillateurs à quartz, ne sont pas parfaites. Elles dérivent les unes par rapport aux autres à des rythmes différents. Même avec des protocoles de synchronisation comme NTP, il est impossible de garantir que deux horloges sur des machines distinctes indiquent exactement la même heure au même instant. Deuxièmement, même si les horloges étaient parfaites, la latence du réseau est variable et inconnue. Si le processus

P1​ envoie un message au processus P2​ à l\'instant t1​ (selon l\'horloge de P1​) et que P2​ le reçoit à l\'instant t2​ (selon l\'horloge de P2​), nous savons seulement que l\'envoi a eu lieu avant la réception, mais nous ne pouvons rien conclure de la comparaison de t1​ et t2​. Il est même possible que t2​\<t1​ si l\'horloge de P2​ est en retard par rapport à celle de P1​.

Face à cette impossibilité d\'établir un ordre total et fiable des événements basé sur le temps physique, Leslie Lamport a proposé un changement de perspective révolutionnaire : cesser d\'essayer de savoir *quand* un événement s\'est produit en temps absolu, et se concentrer plutôt sur la capture de l\'ordre partiel qui est véritablement important pour la correction des algorithmes, à savoir la **causalité**.

### La Relation \"Arrivé Avant\" (Happened-Before) de Lamport

Lamport a formalisé la notion de causalité potentielle à travers la relation \"arrivé avant\", notée par le symbole →. Cette relation n\'est pas un ordre total; elle définit un ordre partiel sur l\'ensemble des événements du système.

**Définition formelle :** La relation → est la plus petite relation (au sens de l\'inclusion d\'ensembles de paires) qui satisfait les trois règles suivantes  :

> **Ordre local :** Si les événements *a* et *b* se produisent au sein du même processus, et que l\'exécution de *a* précède celle de *b*, alors nous disons que *a* est arrivé avant *b*, noté a→b.
>
> **Communication :** Si *a* est l\'événement d\'envoi d\'un message par un processus et *b* est l\'événement de réception de ce même message par un autre processus, alors a→b. L\'envoi d\'un message doit nécessairement précéder sa réception.
>
> **Transitivité :** Si a→b et b→c, alors a→c. Cette règle permet de chaîner les dépendances causales à travers le système.

Si un événement *a* est arrivé avant un événement *b*, cela signifie qu\'il existe une chaîne causale potentielle de *a* à *b*. L\'événement *a* a pu influencer l\'événement *b*.

**Concurrence :** Deux événements distincts *a* et *b* sont dits **concurrents**, noté a∥b, si et seulement si nous n\'avons ni a→b ni b→a. Cela signifie qu\'il n\'existe aucune chaîne causale entre eux; ils se sont produits de manière indépendante. Il est important de noter que la concurrence logique ne signifie pas la simultanéité physique.

Les diagrammes espace-temps, ou chronogrammes, sont l\'outil visuel standard pour représenter ces relations. Chaque processus est une ligne verticale, et le temps s\'écoule de bas en haut. Un événement est un point sur une ligne de processus. Un message est une flèche allant d\'un événement d\'envoi sur une ligne à un événement de réception sur une autre. La relation a→b est vraie si l\'on peut tracer un chemin de *a* à *b* en suivant les lignes de processus vers le haut et en traversant les flèches de message dans leur direction.

### Les Horloges Logiques de Lamport : Un Horodatage Causalement Cohérent

Ayant défini la relation de causalité, l\'étape suivante consiste à trouver un moyen de la représenter numériquement. C\'est le rôle des horloges logiques. Une horloge logique est un mécanisme qui assigne un numéro (un horodatage) à chaque événement, d\'une manière qui soit cohérente avec la relation →.

L\'algorithme des horloges logiques de Lamport, ou horloges scalaires, est le mécanisme le plus simple pour y parvenir.

Algorithme :

Chaque processus Pi​ maintient un simple compteur entier Ci​, son horloge logique, initialisé à 0. Les règles de mise à jour sont les suivantes :

> **Règle 1 (Événement interne ou envoi) :** Avant qu\'un événement ne se produise sur le processus Pi​, celui-ci incrémente son horloge : Ci​←Ci​+1.
>
> **Règle 2 (Envoi de message) :** Lorsqu\'un processus Pi​ envoie un message *m*, il inclut la valeur actuelle de son horloge Ci​ dans le message. Cet horodatage est noté t(m).
>
> **Règle 3 (Réception de message) :** Lorsqu\'un processus Pj​ reçoit un message *m* avec l\'horodatage t(m), il met d\'abord à jour sa propre horloge en prenant le maximum de sa valeur actuelle et de l\'horodatage reçu, puis il l\'incrémente conformément à la Règle 1. Formellement : Cj​←max(Cj​,t(m))+1.

L\'horodatage d\'un événement *a* sur le processus Pi​, noté C(a), est la valeur de l\'horloge Ci​ immédiatement après l\'application de la règle correspondante.

Propriété de Consistance des Horloges :

Cet algorithme simple garantit une propriété fondamentale, connue sous le nom de condition de consistance des horloges 18 :

Si a→b, alors C(a)\<C(b).

Cette propriété signifie que l\'ordre numérique des horodatages respecte l\'ordre causal. Si un événement en a causé un autre, son horodatage sera strictement plus petit.

Limites :

Cependant, la réciproque est fausse. Si C(a)\<C(b), cela n\'implique pas que a→b.42 Les deux événements pourraient être concurrents. Les horloges de Lamport peuvent assigner un ordre numérique à des événements qui n\'ont aucun lien de causalité. Pour créer un ordre total sur tous les événements, on peut utiliser l\'identifiant du processus pour briser les égalités d\'horodatage, mais cet ordre total reste artificiel et ne capture pas la structure complète de la causalité et de la concurrence.

### Les Horloges Vectorielles : Capturer Précisément la Causalité

Pour surmonter la limitation des horloges scalaires, Fidge et Mattern ont indépendamment proposé une extension : les horloges vectorielles. L\'objectif des horloges vectorielles est de capturer la relation de causalité de manière exacte, c\'est-à-dire de fournir une caractérisation de la relation

→.

Algorithme :

Dans un système composé de N processus, {P1​,P2​,...,PN​}, chaque processus Pi​ maintient un vecteur d\'entiers Vi​ de taille N, initialisé à \[0,0,...,0\].18 L\'élément

Vi​\[k\] représente le nombre d\'événements survenus au processus Pk​ dont Pi​ a connaissance (directement ou indirectement).

Les règles de mise à jour sont les suivantes :

> **Règle 1 (Événement interne ou envoi) :** Avant qu\'un événement ne se produise sur le processus Pi​, celui-ci incrémente sa propre composante dans son vecteur : Vi​\[i\]←Vi​\[i\]+1.
>
> **Règle 2 (Envoi de message) :** Lorsqu\'un processus Pi​ envoie un message *m*, il attache son vecteur d\'horloge complet Vi​ au message, noté V(m).
>
> **Règle 3 (Réception de message) :** Lorsqu\'un processus Pj​ reçoit un message *m* avec l\'horodatage vectoriel V(m), il met d\'abord à jour son propre vecteur en prenant le maximum, composante par composante, de son vecteur actuel et du vecteur reçu. Ensuite, il incrémente sa propre composante conformément à la Règle 1. Formellement :

Pour tout k∈{1,...,N}, Vj​\[k\]←max(Vj​\[k\],V(m)\[k\]).

Vj​\[j\]←Vj​\[j\]+1.

L\'horodatage vectoriel d\'un événement *a* sur le processus Pi​, noté V(a), est la valeur du vecteur Vi​ après l\'application de ces règles.

Propriété Fondamentale :

Pour comparer deux horodatages vectoriels Va​ et Vb​, nous définissons :

> Va​≤Vb​ si et seulement si ∀k,Va​\[k\]≤Vb​\[k\].
>
> Va​\<Vb​ si et seulement si Va​≤Vb​ et Va​=Vb​.

Les horloges vectorielles satisfont alors la propriété suivante, qui caractérise précisément la causalité  :

Pour deux événements distincts a et b, a→b si et seulement si V(a)\<V(b).

De plus, les événements *a* et *b* sont concurrents (a∥b) si et seulement si leurs horodatages vectoriels ne sont pas ordonnés, c\'est-à-dire ¬(V(a)≤V(b)) et ¬(V(b)≤V(a)).

Exemple Détaillé :

Considérons un système de trois processus P1​,P2​,P3​.

> **Initialisation :**

\$V_1 = \$

\$V_2 = \$

\$V_3 = \$

> **Événement e1,1​ (local sur P1​) :**

P1​ incrémente V1​.

V1​ devient \$\$. \$V(e\_{1,1}) = \$.

> **Événement e1,2​ (P1​ envoie un message m1​ à P3​) :**

P1​ incrémente V1​.

V1​ devient \$\$. Le message m1​ est estampillé avec \$V(m_1) = \$. \$V(e\_{1,2}) = \$.

> **Événement e3,1​ (P3​ reçoit m1​) :**

P3​ met à jour son vecteur : \$V_3 \\leftarrow \\max(, ) = \$.

P3​ incrémente V3​.

V3​ devient \$\$. \$V(e\_{3,1}) = \$.

On vérifie que V(e1,2​)\<V(e3,1​), ce qui correspond à e1,2​→e3,1​.

> **Événement e2,1​ (local sur P2​) :**

P2​ incrémente V2​.

V2​ devient \$\$. \$V(e\_{2,1}) = \$.

Comparons \$V(e\_{1,2}) = \$ et \$V(e\_{2,1}) = \$. Ils ne sont pas ordonnés, donc les événements sont concurrents : e1,2​∥e2,1​.

Cette transition d\'une notion physique du temps à une formalisation logique de la causalité est l\'un des piliers de l\'informatique distribuée. Elle permet de raisonner rigoureusement sur le comportement des systèmes asynchrones et de construire des algorithmes corrects malgré l\'incertitude temporelle.

### La Capture d\'un État Global Cohérent : L\'Algorithme de Chandy-Lamport

Au-delà de l\'ordonnancement des événements, de nombreuses applications distribuées, comme la détection de l\'interblocage (*deadlock*), la collecte de déchets (*garbage collection*) ou la création de points de reprise (*checkpointing*), nécessitent de pouvoir capturer un \"instantané\" (*snapshot*) de l\'état global du système à un moment donné. Comme nous l\'avons vu, obtenir un état global véritablement instantané est impossible. L\'objectif est donc de capturer un

**état global cohérent**.

Définition d\'une Coupe Cohérente :

Une coupe (ou cut) est un ensemble contenant un état local pour chaque processus du système. Visuellement, sur un diagramme espace-temps, c\'est une ligne qui traverse toutes les lignes de processus. Une coupe est dite cohérente si, pour tout message m dont l\'événement de réception est inclus dans la coupe (c\'est-à-dire, se produit avant le point de coupe sur le processus récepteur), l\'événement d\'envoi de m est également inclus dans la coupe (se produit avant le point de coupe sur le processus émetteur).53 En d\'autres termes, une coupe cohérente ne contient aucun \"message orphelin\" qui semble provenir du futur.

L\'algorithme de Chandy-Lamport est un protocole distribué qui permet d\'enregistrer un état global cohérent sans interrompre l\'exécution de l\'application sous-jacente. L\'état global capturé n\'a peut-être jamais existé simultanément dans le temps physique, mais il représente un état par lequel le système

*aurait pu* passer, ce qui est suffisant pour vérifier de nombreuses propriétés importantes.

Algorithme :

L\'algorithme repose sur l\'utilisation de messages spéciaux, appelés marqueurs, qui sont distincts des messages de l\'application. Il suppose que les canaux de communication sont fiables et FIFO (premier entré, premier sorti).54

> **Initiation :** N\'importe quel processus *P* peut initier la prise d\'instantané.

*P* enregistre son propre état local (par exemple, les valeurs de ses variables).

*P* envoie immédiatement un message marqueur sur chacun de ses canaux de communication sortants.

> **Règle de Réception du Marqueur :** Lorsqu\'un processus *Q* reçoit un message marqueur sur un canal entrant *C* :

**Cas 1 : C\'est le premier marqueur que *Q* reçoit (pour cette prise d\'instantané).**

*Q* enregistre son propre état local.

*Q* enregistre l\'état du canal *C* (celui par lequel le marqueur est arrivé) comme étant vide.

*Q* envoie immédiatement un message marqueur sur tous ses canaux sortants.

*Q* commence à enregistrer tous les messages qui arrivent sur ses *autres* canaux entrants (tous sauf *C*).

**Cas 2 : *Q* a déjà enregistré son état.**

*Q* arrête l\'enregistrement des messages pour le canal *C*.

L\'état du canal *C* est défini comme la séquence de tous les messages d\'application reçus sur *C* entre le moment où *Q* a enregistré son état local et le moment où il a reçu le marqueur sur *C*.

Terminaison :

L\'algorithme se termine pour un processus donné lorsqu\'il a enregistré son état, envoyé ses marqueurs, et reçu un marqueur sur chacun de ses canaux entrants. L\'état global cohérent est alors la collection de tous les états locaux et de tous les états des canaux enregistrés par tous les processus. Ces états partiels peuvent être collectés par un processus centralisateur ou utilisés localement.

Cet algorithme élégant montre comment la coordination par passage de messages peut être utilisée pour résoudre des problèmes complexes comme la capture d\'un état global, en s\'appuyant uniquement sur des hypothèses minimales concernant les canaux de communication.

## 35.4 Coordination et Consensus : Le Cœur du Problème

Au sein des systèmes distribués, la capacité pour des processus indépendants de se mettre d\'accord sur une information ou de coordonner leurs actions est non seulement souhaitable, mais souvent indispensable à leur bon fonctionnement. Que ce soit pour décider qui accède à une ressource partagée, pour élire un processus qui jouera un rôle spécial, ou pour valider une transaction dans une base de données répliquée, l\'accord distribué est une primitive fondamentale. Cette section explore le problème de l\'accord sous ses différentes formes, depuis les tâches de coordination de base jusqu\'au problème le plus général et le plus difficile : le consensus.

### Introduction : Le Défi de l\'Accord Distribué

Le problème de l\'accord se pose dès que l\'état d\'un processus dépend de l\'état ou des actions d\'autres processus. En l\'absence d\'une autorité centrale ou d\'une source de vérité partagée, cet accord doit être forgé uniquement par l\'échange de messages, dans un environnement où ces messages peuvent être retardés et où les processus peuvent tomber en panne.

#### Définition formelle du Consensus

Le consensus est la forme la plus générale et la plus robuste du problème de l\'accord. Il est défini comme suit : un ensemble de *N* processus, où chaque processus *p* commence avec une valeur d\'entrée initiale vp​, doit collectivement se mettre d\'accord sur une seule valeur de décision *v*. Pour qu\'un algorithme de consensus soit considéré comme correct, il doit satisfaire les trois propriétés suivantes  :

> **Terminaison (Liveness) :** Chaque processus qui ne tombe pas en panne (processus correct) doit éventuellement décider d\'une valeur. L\'algorithme ne doit pas pouvoir rester bloqué indéfiniment.
>
> **Accord (Agreement/Safety) :** Deux processus corrects ne décident jamais de valeurs différentes. La décision, une fois prise, est irrévocable et identique pour tous.
>
> **Validité (Integrity) :** La valeur décidée *v* doit avoir été proposée par au moins un des processus. L\'algorithme ne peut pas \"inventer\" une valeur. Une forme plus forte de validité stipule que si tous les processus corrects proposent la même valeur *v*, alors *v* est la seule valeur qui peut être décidée.

Ces propriétés, en apparence simples, sont extraordinairement difficiles à garantir simultanément dans un environnement distribué asynchrone.

#### Le Théorème d\'Impossibilité FLP

En 1985, Michael J. Fischer, Nancy Lynch et Michael S. Paterson ont publié un résultat qui a profondément marqué le domaine de l\'informatique distribuée. Le **théorème d\'impossibilité FLP** énonce qu\'**il n\'existe aucun algorithme de consensus déterministe capable de garantir la propriété de terminaison dans un système asynchrone, même avec la possibilité d\'une seule panne par arrêt (crash fault)**.

L\'intuition de la preuve, qui est un argument par l\'absurde, est la suivante. On suppose qu\'un tel algorithme existe. On montre alors qu\'il doit exister une configuration initiale \"bivalente\", c\'est-à-dire un état du système à partir duquel l\'issue du consensus pourrait être aussi bien 0 que 1, en fonction de la séquence future d\'événements (l\'ordonnancement des messages et les pannes éventuelles). La preuve construit ensuite une séquence d\'exécution infinie où le système est soigneusement maintenu dans un état bivalent, en retardant stratégiquement la livraison d\'un message \"critique\" qui ferait basculer la décision. Dans cette exécution, aucun processus ne peut jamais décider de manière sûre, car la décision pourrait toujours être renversée. L\'algorithme ne termine donc jamais, ce qui contredit l\'hypothèse de départ.

Ce résultat ne signifie pas que le consensus est impossible en pratique. Il signifie plutôt que tout système pratique doit relâcher l\'une des hypothèses du modèle FLP. Les algorithmes de consensus réels, comme Paxos et Raft, garantissent toujours les propriétés de sécurité (Accord et Validité). Leur garantie de terminaison, cependant, repose sur des hypothèses de stabilité du réseau. Ils peuvent ne pas terminer dans des scénarios pathologiques de pannes et de délais de communication (bien que la probabilité de tels scénarios soit rendue très faible par l\'utilisation de délais d\'attente et de mécanismes aléatoires). Le théorème FLP nous enseigne que le consensus dans un monde asynchrone a un prix : on ne peut garantir la progression que de manière probabiliste ou en s\'appuyant sur des hypothèses de synchronicité partielle.

### 35.4.1 Problèmes de Coordination Fondamentaux

Avant d\'aborder les algorithmes de consensus généraux, il est instructif d\'étudier deux problèmes de coordination plus simples mais fondamentaux : l\'exclusion mutuelle et l\'élection de leader.

#### Exclusion Mutuelle Distribuée

Le problème de l\'exclusion mutuelle consiste à garantir qu\'au plus un processus à la fois peut accéder à une ressource partagée, appelée section critique (SC).

> **Algorithme Centralisé :** L\'approche la plus simple consiste à désigner un processus comme coordinateur. Tout processus souhaitant entrer en SC envoie une requête au coordinateur. Le coordinateur gère une file d\'attente et accorde la permission au premier de la file. Lorsqu\'un processus quitte la SC, il en informe le coordinateur, qui peut alors accorder la permission au processus suivant. Cet algorithme est simple à implémenter mais souffre de la fragilité inhérente à la centralisation : le coordinateur est un point de défaillance unique et un goulot d\'étranglement potentiel.
>
> **Algorithme à Jeton sur un Anneau :** Dans cette approche décentralisée, les processus sont organisés en un anneau logique. Un message spécial, le \"jeton\", circule en permanence sur l\'anneau. Seul le processus qui détient le jeton est autorisé à entrer dans sa section critique. S\'il n\'a pas besoin de la ressource, il passe immédiatement le jeton à son voisin. S\'il en a besoin, il garde le jeton, entre en SC, et ne le libère qu\'à sa sortie. Cet algorithme garantit l\'exclusion mutuelle (il n\'y a qu\'un seul jeton), mais il est vulnérable à la perte du jeton ou à la rupture de l\'anneau.
>
> **Algorithme de Ricart-Agrawala :** Cet algorithme, basé sur la diffusion et les horloges logiques de Lamport, est entièrement distribué.

Lorsqu\'un processus Pi​ veut entrer en SC, il incrémente son horloge logique et envoie un message de REQUÊTE estampillé à tous les autres processus.

Lorsqu\'un processus Pj​ reçoit une REQUÊTE de Pi​, il répond immédiatement par OK s\'il n\'est pas en SC et ne souhaite pas y entrer. S\'il est déjà en SC, il diffère sa réponse. S\'il souhaite également entrer en SC, il compare l\'estampille de sa propre requête avec celle de Pi​. Il répond OK uniquement si la requête de Pi​ a une estampille plus petite (est plus \"ancienne\"). Sinon, il diffère sa réponse.

Le processus Pi​ peut entrer en SC uniquement après avoir reçu une réponse OK de *tous* les autres processus.

À sa sortie de la SC, Pi​ envoie un OK à tous les processus dont il a différé la réponse.\
Cet algorithme garantit l\'exclusion mutuelle et l\'équité, mais nécessite 2(N−1) messages par entrée en SC et la panne d\'un seul processus peut bloquer tout le système.65

#### Élection de Leader

De nombreux algorithmes distribués reposent sur l\'existence d\'un coordinateur ou d\'un leader pour simplifier leur logique. Le problème de l\'élection de leader consiste, pour un groupe de processus, à s\'accorder sur l\'un d\'entre eux qui assumera ce rôle spécial. L\'élection est généralement déclenchée lorsqu\'un processus détecte la panne du leader actuel.

> **Algorithme du Tyran (*Bully Algorithm*) :** Cet algorithme suppose que chaque processus a un identifiant unique et totalement ordonné.

Lorsqu\'un processus *P* détecte la panne du leader, il lance une élection en envoyant un message ÉLECTION à tous les processus ayant un ID supérieur au sien.

Si *P* ne reçoit aucune réponse OK dans un certain délai, il se considère comme le processus actif avec l\'ID le plus élevé. Il gagne l\'élection, devient le nouveau leader et annonce son statut aux autres avec un message COORDINATEUR.

Si *P* reçoit un OK d\'un processus *Q* avec un ID plus élevé, cela signifie que *Q* (ou un autre processus \"plus fort\") prend le relais de l\'élection. Le rôle de *P* dans l\'élection est terminé; il attend simplement l\'annonce du nouveau leader.

> **Algorithme de l\'Anneau :** Cet algorithme ne nécessite pas la connaissance de tous les membres du groupe, mais seulement que les processus soient organisés en un anneau logique.

Un processus initiateur envoie un message ÉLECTION contenant son propre ID à son voisin dans le sens de l\'anneau.

Chaque processus qui reçoit un message ÉLECTION y ajoute son propre ID et le fait suivre à son voisin.

Lorsque le message revient à l\'initiateur, il a fait un tour complet et contient les ID de tous les processus actifs dans l\'anneau. L\'initiateur peut alors déterminer le processus avec l\'ID le plus élevé, qui est l\'élu.

L\'initiateur fait circuler un second message ÉLU pour informer tous les membres de l\'identité du nouveau leader.

### 35.4.2 Les Algorithmes de Consensus Tolérants aux Pannes

Les algorithmes de consensus sont la pierre angulaire des systèmes distribués fiables. Ils permettent de construire des machines à états répliquées, qui sont la base des bases de données distribuées, des systèmes de fichiers et des services de coordination modernes.

#### Le Problème des Généraux Byzantins

Avant de discuter des algorithmes pour les pannes par arrêt, il est utile de comprendre le défi posé par des pannes plus sévères. Le problème des généraux byzantins est une métaphore qui illustre la complexité du consensus en présence de pannes **malveillantes** ou **byzantines**, où un processus défaillant peut se comporter de manière arbitraire, y compris en envoyant des informations contradictoires à différents processus.

L\'énoncé est le suivant : plusieurs divisions de l\'armée byzantine, chacune commandée par un général, encerclent une cité ennemie. Les généraux doivent se mettre d\'accord sur un plan commun (attaquer ou battre en retraite) en communiquant uniquement par messagers. Cependant, certains généraux peuvent être des traîtres. Un général loyal doit décider du même plan d\'action que tous les autres généraux loyaux, et un petit nombre de traîtres ne doit pas pouvoir les faire adopter un mauvais plan.

Le résultat fondamental, démontré par Lamport, Shostak et Pease, est qu\'avec des messages oraux (non signés), une solution n\'est possible que si le nombre total de généraux *N* est strictement supérieur à trois fois le nombre de traîtres *f* (c\'est-à-dire, N\>3f). Si un tiers ou plus des généraux sont des traîtres, il n\'y a aucune garantie que les loyaux puissent parvenir à un accord. Ce résultat souligne le coût très élevé de la tolérance aux pannes byzantines et motive l\'étude des pannes plus simples, dites par arrêt (

*crash failures*).

#### Paxos : L\'Algorithme Fondateur

L\'algorithme Paxos, également formulé par Leslie Lamport, est conçu pour résoudre le problème du consensus dans un système asynchrone sujet à des pannes par arrêt. Il est devenu la référence théorique pour le consensus non byzantin, bien que sa description originale soit notoirement difficile à comprendre.

L\'algorithme décompose les participants en trois rôles logiques, qui peuvent être assumés par les mêmes processus physiques  :

> **Proposeur (*Proposer*) :** Un processus qui propose une valeur à décider.
>
> **Accepteur (*Acceptor*) :** Un processus qui vote sur les propositions. Les décisions sont prises par un **quorum**, c\'est-à-dire une majorité, d\'accepteurs.
>
> **Apprenant (*Learner*) :** Un processus qui apprend la valeur qui a été décidée par le quorum d\'accepteurs.

Le protocole Paxos de base (pour décider d\'une seule valeur) se déroule en deux phases  :

**Phase 1 : Préparation (*Prepare*)**

> **(a) prepare :** Un proposeur qui souhaite proposer une valeur choisit un numéro de proposition *n* qui doit être unique et supérieur à tous les numéros de proposition qu\'il a déjà utilisés. Il envoie un message prepare(n) à une majorité d\'accepteurs.
>
> **(b) promise :** Lorsqu\'un accepteur reçoit un message prepare(n), il le compare au plus haut numéro de proposition, max_n, qu\'il a déjà vu.

Si n\>maxn​, l\'accepteur met à jour max_n à *n* et répond au proposeur avec un message promise(n, v_a, n_a), où (va​,na​) est la valeur et le numéro de la dernière proposition qu\'il a *acceptée* (s\'il y en a une).

Si n≤maxn​, l\'accepteur ignore la requête ou envoie un rejet.

**Phase 2 : Acceptation (*Accept*)**

> **(a) accept :** Si le proposeur reçoit des messages promise d\'une majorité d\'accepteurs, il peut procéder. Il choisit une valeur *v* à proposer. La règle cruciale est la suivante : s\'il a reçu des valeurs précédemment acceptées de la part des accepteurs, il **doit** choisir la valeur va​ associée au plus haut numéro de proposition na​ parmi toutes les réponses. Sinon, il est libre de choisir sa propre valeur initiale. Il envoie ensuite un message accept(n, v) à une majorité d\'accepteurs.
>
> **(b) accepted :** Lorsqu\'un accepteur reçoit un message accept(n, v), il l\'accepte si et seulement si il n\'a pas déjà fait une promesse pour un numéro de proposition supérieur à *n*. S\'il accepte, il stocke la paire (v,n) et envoie un message accepted aux apprenants.

Une valeur est considérée comme **décidée** dès qu\'une majorité d\'accepteurs l\'a acceptée. La propriété d\'intersection des quorums garantit que deux valeurs différentes ne peuvent pas être décidées.

// Pseudo-code pour un Proposeur\
variables:\
n_prop: entier // numéro de proposition le plus élevé utilisé\
val_prop: valeur // valeur à proposer\
\
fonction proposer(valeur v):\
n_prop := n_prop + 1\
ensemble_promesses := {}\
diffuser(prepare(n_prop)) à une majorité d\'Accepteurs\
\
sur réception de promise(n, v_a, n_a) de A:\
si n == n_prop:\
ajouter (v_a, n_a) à ensemble_promesses\
si \|ensemble_promesses\| est une majorité:\
(v_max, n_max) := la paire avec le plus grand n_a dans ensemble_promesses\
si n_max \> 0:\
val_final := v_max\
sinon:\
val_final := v\
diffuser(accept(n_prop, val_final)) à une majorité d\'Accepteurs\
\
// Pseudo-code pour un Accepteur\
variables:\
n_promis: entier // plus haut numéro de proposition promis\
n_accept: entier // plus haut numéro de proposition accepté\
v_accept: valeur // valeur acceptée\
\
sur réception de prepare(n) de P:\
si n \> n_promis:\
n_promis := n\
envoyer promise(n, v_accept, n_accept) à P\
\
sur réception de accept(n, v) de P:\
si n \>= n_promis:\
n_promis := n\
n_accept := n\
v_accept := v\
diffuser(accepted(v)) aux Apprenants

#### Raft : Le Consensus pour la Compréhensibilité

Bien que Paxos soit correct et fondamental, il est notoirement difficile à comprendre et à implémenter correctement. En 2014, Diego Ongaro et John Ousterhout ont présenté Raft, un algorithme de consensus conçu explicitement pour être plus compréhensible que Paxos, tout en offrant des garanties de sécurité et des performances équivalentes.

La clé de la simplicité de Raft est sa décomposition du problème de consensus en trois sous-problèmes relativement indépendants : l\'élection de leader, la réplication du journal et la sécurité.

1\. Élection de Leader (Leader Election)

Raft impose un modèle de leadership beaucoup plus fort que Paxos. À tout moment, un cluster Raft a un seul et unique leader, et tous les autres serveurs sont des suiveurs (followers). Le leader est le seul responsable de la gestion du journal répliqué.

> **États et Termes :** Chaque serveur peut être dans l\'un des trois états : leader, suiveur ou candidat. Le temps est divisé en **termes** de durée arbitraire, identifiés par un entier croissant. Chaque terme commence par une élection.
>
> **Mécanisme d\'Élection :**

Un suiveur commence une élection s\'il ne reçoit pas de communication (un \"battement de cœur\" ou *heartbeat*) du leader pendant une période appelée *délai d\'attente d\'élection* (*election timeout*). Ce délai est randomisé pour éviter les votes partagés.

Le suiveur passe à l\'état de candidat, incrémente le numéro de terme actuel, vote pour lui-même et envoie des RPC RequestVote à tous les autres serveurs.

Un serveur ne peut voter qu\'une seule fois par terme. Il accorde son vote au premier candidat qui le demande, à condition que le journal du candidat soit au moins aussi à jour que le sien.

Si un candidat reçoit les votes d\'une majorité du cluster, il devient le leader pour ce terme.

Une fois élu, le leader commence à envoyer des AppendEntries (qui agissent comme des heartbeats) à tous les suiveurs pour affirmer son autorité et empêcher de nouvelles élections.

2\. Réplication du Journal (Log Replication)

Le leader est chargé de maintenir la cohérence des journaux à travers le cluster.

> Le leader reçoit une commande d\'un client.
>
> Il ajoute cette commande comme une nouvelle entrée dans son propre journal. Chaque entrée contient la commande ainsi que le numéro de terme du leader qui l\'a créée.
>
> Le leader envoie des RPC AppendEntries à chaque suiveur pour leur demander de répliquer cette nouvelle entrée.
>
> Lorsqu\'un suiveur reçoit une AppendEntries, il ajoute l\'entrée à son journal et renvoie un succès au leader.
>
> Une entrée de journal est considérée comme **validée** (*committed*) dès qu\'elle a été répliquée avec succès sur une **majorité** de serveurs.
>
> Une fois qu\'une entrée est validée, le leader l\'applique à sa propre machine d\'état et renvoie le résultat au client. Le leader informe également les suiveurs des entrées validées via les RPC AppendEntries suivants, afin qu\'ils puissent à leur tour les appliquer à leurs machines d\'état.

La propriété de sécurité de Raft garantit que si une entrée de journal est validée dans un terme donné, elle sera présente dans les journaux de tous les leaders des termes suivants. Cela assure que les machines d\'état exécutent la même séquence de commandes.

Le succès de Raft démontre que la décomposition d\'un problème complexe et une terminologie claire sont des atouts majeurs pour l\'ingénierie des systèmes distribués. En séparant l\'élection du leader de la réplication du journal, Raft fournit un cadre conceptuel beaucoup plus simple à appréhender et à implémenter que le protocole monolithique de Paxos, rendant ainsi le consensus robuste accessible à un plus grand nombre de développeurs.

  --------------------------- ------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------
  Critère                     Paxos                                                                                                        Raft

  **Concept de Leadership**   Implicite et éphémère. Plusieurs proposeurs peuvent être actifs.                                             Explicite et fort. Un seul leader à la fois, gère toutes les requêtes.

  **Flux de données**         Les données peuvent circuler du proposeur à l\'accepteur, puis d\'un autre accepteur à un autre proposeur.   Strictement du leader vers les suiveurs.

  **Élection**                Fait partie de la Phase 1, entrelacée avec les propositions de valeurs.                                      Mécanisme séparé et explicite, basé sur les termes et les délais d\'attente.

  **Compréhensibilité**       Notoriété difficile.                                                                                         Conçu pour être facile à comprendre.

  **Garantie principale**     Sécurité (Safety) toujours, Progression (Liveness) sous conditions de stabilité.                             Sécurité (Safety) toujours, Progression (Liveness) sous conditions de stabilité.
  --------------------------- ------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------

## 35.5 Consistance et Réplication des Données

Dans un système distribué, la gestion des données est une préoccupation centrale. Pour atteindre les objectifs de haute disponibilité et de performance, il est rare qu\'une donnée n\'existe qu\'en un seul exemplaire sur un seul nœud. La pratique courante est la **réplication** : maintenir des copies multiples (des répliques) d\'une même donnée sur différents nœuds du système. Cependant, la réplication introduit immédiatement un nouveau défi fondamental : comment maintenir la cohérence entre ces copies? Cette section explore les motivations de la réplication et le spectre des garanties de cohérence, ou modèles de consistance, qui régissent la manière dont les changements sont propagés et observés à travers le système.

### Motivation de la Réplication

La décision de répliquer des données est motivée par deux objectifs principaux, qui sont au cœur des promesses des systèmes distribués.

> **Tolérance aux pannes et Haute Disponibilité :** C\'est la motivation la plus évidente. Si un nœud qui héberge une donnée tombe en panne, le système peut continuer à fonctionner sans interruption en accédant à une autre réplique de cette donnée sur un nœud différent. La réplication transforme un système fragile, où la perte d\'un nœud peut signifier une perte de données ou une indisponibilité du service, en un système robuste qui peut survivre à des pannes partielles. Elle est la clé de la reprise après sinistre et de la continuité des activités.
>
> **Performance et Faible Latence :** La réplication peut considérablement améliorer les performances, en particulier pour les applications à forte charge de lecture.

**Localité des données :** Dans un système géographiquement distribué, on peut placer des répliques de données à proximité des utilisateurs. Un utilisateur à Montréal peut lire les données depuis un centre de données local, réduisant ainsi la latence par rapport à une requête qui devrait traverser l\'océan Atlantique.

**Équilibrage de charge :** Les requêtes de lecture peuvent être réparties sur l\'ensemble des répliques, ce qui évite qu\'un seul serveur ne devienne un goulot d\'étranglement et permet au système de supporter un plus grand nombre d\'utilisateurs simultanés.

### Le Théorème CAP : Un Compromis Incontournable

Bien que la réplication soit essentielle, elle introduit une tension fondamentale. En 2000, l\'informaticien Eric Brewer a postulé, lors d\'une conférence, un principe qui a ensuite été formellement prouvé par Seth Gilbert et Nancy Lynch : le **théorème CAP**. Ce théorème énonce qu\'il est impossible pour un système de stockage de données distribué de garantir simultanément plus de deux des trois propriétés suivantes  :

> **Consistance (*Consistency*) :** Tous les nœuds voient les mêmes données au même moment. Plus formellement, toute opération de lecture sur le système retourne la valeur de l\'écriture la plus récente ou une erreur.
>
> **Disponibilité (*Availability*) :** Chaque requête adressée au système reçoit une réponse (non erronée), sans garantie qu\'elle contienne la valeur de l\'écriture la plus récente. Le système est toujours disponible pour lire et écrire.
>
> **Tolérance au Partitionnement (*Partition Tolerance*) :** Le système continue de fonctionner même en cas de partitionnement du réseau, c\'est-à-dire une perte de messages entre des sous-ensembles de nœuds.

Dans un système distribué, les pannes réseau sont une fatalité. Un système doit donc être tolérant au partitionnement (P) pour être robuste. Par conséquent, le véritable compromis architectural se situe entre la consistance et la disponibilité. En cas de partition réseau, un concepteur de système doit choisir :

> **Choisir la Consistance (CP) :** Pour éviter que les répliques ne divergent de chaque côté de la partition, le système peut choisir de refuser les opérations d\'écriture (ou même de lecture) sur l\'un des côtés de la partition, sacrifiant ainsi la disponibilité.
>
> **Choisir la Disponibilité (AP) :** Pour que le système reste pleinement opérationnel, chaque partition peut continuer à accepter des lectures et des écritures. Cela sacrifie la consistance, car les données sur les différentes partitions vont diverger. Le système devra prévoir un mécanisme pour réconcilier ces divergences une fois la partition résolue.

Le théorème CAP fournit un cadre puissant pour classer et raisonner sur les systèmes de données distribués et les modèles de consistance qu\'ils offrent.

### Le Spectre des Modèles de Consistance

Un modèle de consistance est un contrat entre un système de stockage de données et les programmes qui l\'utilisent. Il spécifie les garanties que le système offre concernant l\'ordre et la visibilité des opérations de lecture et d\'écriture sur les données répliquées. Il existe un large spectre de modèles, allant des plus stricts (et coûteux) aux plus relâchés (et performants).

#### Consistance Forte (Strong Consistency)

Les modèles de consistance forte visent à préserver l\'illusion que le programmeur interagit avec un seul et unique emplacement de stockage, masquant complètement la réplication.

> **Linéarisabilité (ou Consistance Atomique) :** C\'est le modèle de consistance le plus strict et le plus intuitif. Il impose deux exigences  :

Toutes les opérations (lectures et écritures) doivent apparaître comme si elles avaient été exécutées dans un certain ordre séquentiel total.

Cet ordre total doit respecter l\'ordre en temps réel des opérations non-concurrentes. Si une opération A se termine avant qu\'une opération B ne commence, alors A doit apparaître avant B dans l\'ordre séquentiel global.\
Essentiellement, chaque opération semble s\'exécuter instantanément et atomiquement à un point unique dans le temps. Une lecture est garantie de voir la valeur de l\'écriture qui l\'a immédiatement précédée dans le temps. La linéarisabilité est la propriété qui rend un système distribué indiscernable (du point de vue de la correction) d\'un système non distribué. C\'est le modèle \"CP\" par excellence, et il est généralement implémenté à l\'aide d\'algorithmes de consensus comme Paxos ou Raft. Il est indispensable pour des applications comme les systèmes bancaires ou les verrous distribués.98

> **Consistance Séquentielle :** C\'est un modèle légèrement plus faible que la linéarisabilité. Il exige que le résultat de toute exécution soit le même que si les opérations de tous les processus étaient exécutées dans un certain ordre séquentiel, et que les opérations de chaque processus individuel apparaissent dans cet ordre dans la séquence globale. La différence cruciale est que l\'ordre séquentiel global n\'a pas besoin de respecter l\'ordre en temps réel. Un ordre qui \"inverse\" deux opérations non-concurrentes est permis, tant que tous les processus observent ce même ordre inversé.

#### Consistance Faible et Consistance à Terme (Eventual Consistency)

À l\'autre extrémité du spectre se trouvent les modèles de consistance faible, dont le plus populaire et le plus important en pratique est la consistance à terme.

> **Définition :** La consistance à terme garantit que, si aucune nouvelle mise à jour n\'est effectuée sur un objet de données, toutes les répliques de cet objet finiront par converger vers la même valeur. Le modèle ne donne aucune garantie sur la rapidité de cette convergence, ni sur les valeurs qui peuvent être lues pendant la période de divergence.
>
> **Avantages et Inconvénients :** Ce modèle est l\'incarnation du compromis \"AP\" du théorème CAP. Il offre une très haute disponibilité et d\'excellentes performances en lecture et en écriture, car les opérations peuvent souvent être effectuées sur une réplique locale sans attendre une coordination avec les autres. Le prix à payer est la possibilité pour un client de lire des données \"périmées\" (*stale data*). La gestion des conflits d\'écriture (lorsque la même donnée est modifiée simultanément sur deux partitions différentes) devient également une responsabilité de l\'application.
>
> **Cas d\'usage :** La consistance à terme est extrêmement répandue dans les systèmes web à grande échelle où la disponibilité et la faible latence sont plus critiques qu\'une consistance instantanée. Les exemples incluent les réseaux sociaux (un compteur de \"j\'aime\" peut être temporairement incohérent), les paniers d\'achat en ligne, le système DNS, et les réseaux de diffusion de contenu (CDN). La plupart des bases de données NoSQL, comme Cassandra et DynamoDB, sont conçues autour de ce modèle, offrant souvent une \"consistance réglable\" où l\'application peut choisir, par requête, un compromis différent entre consistance et performance.

Le choix d\'un modèle de consistance n\'est pas une décision purement technique; il s\'agit d\'un compromis architectural fondamental qui doit être aligné avec les exigences métier de l\'application. Un système financier ne peut tolérer la consistance à terme pour un solde de compte, car cela violerait un invariant fondamental (l\'argent ne peut être créé ou détruit). La consistance forte est ici une exigence métier. À l\'inverse, pour un réseau social, l\'affichage d\'un nombre de \"j\'aime\" légèrement périmé pendant quelques secondes est un inconvénient mineur comparé aux bénéfices d\'un système toujours disponible et rapide pour des millions d\'utilisateurs dans le monde. La compréhension de ce spectre de compromis est essentielle pour tout architecte de systèmes distribués.

  -------------------------------------- -------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------
  Modèle                                 Garantie                                                                         Performance                                                                                        Cas d\'usage

  **Linéarisabilité (Forte)**            Les opérations apparaissent instantanées et respectent l\'ordre en temps réel.   Latence plus élevée, débit plus faible (coordination synchrone requise).                           Systèmes financiers, verrous distribués, registres uniques.

  **Consistance Séquentielle (Forte)**   Tous les processus voient les opérations dans le même ordre global.              Potentiellement meilleure que la linéarisabilité (plus de flexibilité dans le réordonnancement).   Systèmes de cache, pipelines de données.

  **Consistance à Terme (Faible)**       Les répliques convergent éventuellement en l\'absence de nouvelles écritures.    Faible latence, haut débit (les écritures sont locales et rapides).                                Réseaux sociaux, DNS, systèmes de recommandation, la plupart des services web à grande échelle.
  -------------------------------------- -------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------



---

### Références croisées

- **Apache Kafka et ecosysteme Confluent** : voir aussi [Chapitre II.2 -- Fondamentaux Apache Kafka et Confluent](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.2_Fondamentaux_Apache_Kafka_Confluent.md)
- **Architecture de reference convergente** : voir aussi [Chapitre 2.9 -- Architecture de Reference Convergente](../../II - Interopérabilité/Chapitre_II.9_Architecture_Reference.md)
