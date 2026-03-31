# Chapitre I.33 : Fondements des Réseaux Informatiques

## Introduction

L\'omniprésence des réseaux informatiques dans la société contemporaine, des centres de données mondiaux aux objets connectés dans nos foyers, masque une complexité d\'ingénierie et une richesse théorique remarquables. La capacité de transmettre de manière fiable et efficace une information d\'un point A à un point B, à travers des médias hétérogènes et des infrastructures partagées, n\'est pas un acquis, mais le fruit de décennies de recherche, de normalisation et d\'innovation. Ce chapitre a pour objectif d\'établir les principes fondamentaux sur lesquels reposent toutes les communications de données modernes. Il s\'agit de déconstruire la magie apparente de la connectivité globale pour en révéler les mécanismes sous-jacents, les choix architecturaux fondamentaux et les abstractions théoriques qui permettent de maîtriser cette complexité.

Nous aborderons la communication comme un problème d\'ingénierie à plusieurs niveaux, nécessitant une approche structurée et modulaire. Notre parcours débutera au niveau le plus macroscopique, en explorant la décision architecturale la plus fondamentale dans la conception d\'un réseau : le choix entre la **commutation de circuits** et la **commutation de paquets**. Cette dichotomie, illustrée par l\'opposition entre le réseau téléphonique historique et l\'Internet moderne, dicte la manière dont les ressources du réseau sont allouées et partagées, avec des implications profondes sur l\'efficacité, la performance et les cas d\'usage.

Ensuite, nous nous tournerons vers les cadres conceptuels qui permettent d\'organiser cette complexité. Les **modèles de référence en couches**, notamment le modèle OSI théorique et le modèle TCP/IP pragmatique, fournissent un langage commun et une structure pour la conception et l\'analyse des protocoles réseau. Nous examinerons en détail le rôle de chaque couche et le processus crucial d\'**encapsulation**, qui permet à ces couches de collaborer de manière transparente.

Enfin, armés de ces modèles architecturaux et conceptuels, nous plongerons au cœur de la machine, en nous concentrant sur les deux couches qui constituent le socle de toute communication : la **couche Physique** et la **couche Liaison de Données**. La première s\'intéresse à la transmission brute des bits sur des médias physiques, qu\'ils soient de cuivre, de verre ou des ondes électromagnétiques. Nous y explorerons les limites théoriques imposées par les lois de la physique, à travers les théorèmes de Nyquist et Shannon, ainsi que les techniques de modulation et de codage qui permettent de convertir les données numériques en signaux transmissibles. La seconde couche s\'attache à transformer cette liaison brute en un canal de communication fiable pour les paquets, en gérant le tramage, la détection d\'erreurs, et le problème fondamental du partage d\'un média de communication entre plusieurs interlocuteurs. Nous conclurons par une étude approfondie du protocole Ethernet, la technologie de réseau local la plus répandue, et des mécanismes de commutation qui en décuplent l\'efficacité.

Ce chapitre ne se contente pas de décrire des protocoles ; il vise à forger une intuition profonde des principes, des compromis et des raisons d\'être des architectures qui façonnent notre monde connecté.

## 33.1 Architecture des Réseaux : Le Dilemme Fondamental de la Commutation

Au cœur de tout réseau de communication étendu se trouve la fonction de commutation. Un réseau n\'est pas une simple liaison point à point, mais un maillage de nœuds interconnectés (commutateurs, routeurs) dont le rôle est d\'acheminer l\'information de son point d\'origine à sa destination finale. La commutation est précisément ce mécanisme par lequel un nœud intermédiaire reçoit des données sur une liaison entrante et les redirige vers une liaison sortante appropriée. Le choix de l\'architecture de commutation est la décision la plus fondamentale et la plus structurante dans la conception d\'un réseau, car elle détermine intrinsèquement comment les ressources du réseau (principalement la bande passante des liaisons) sont allouées, partagées et gérées. Cette décision a des conséquences directes et profondes sur la performance, l\'efficacité, la robustesse, le coût et les types d\'applications que le réseau peut supporter. Historiquement et conceptuellement, deux paradigmes s\'opposent : la commutation de circuits et la commutation de paquets.

### 33.1.1 La Commutation de Circuits : Un Chemin Dédié et Garanti

La commutation de circuits est le paradigme historiquement premier, incarné par le réseau téléphonique. Son principe fondamental est d\'établir un chemin de communication physique ou logique, dédié et exclusif, entre deux terminaux pour toute la durée de leur session de communication. On peut se représenter ce chemin comme un \"tuyau\" ou un circuit électrique continu, réservé de bout en bout, garantissant une portion fixe des ressources du réseau aux communicants.

#### Les Trois Phases de la Communication

Toute communication par commutation de circuits se déroule immuablement en trois phases distinctes et séquentielles.

1\. Établissement de la connexion (Construction du circuit)

Avant que le moindre bit de donnée utile ne soit échangé, un circuit de bout en bout doit être construit. Ce processus est initié par la station émettrice, qui envoie un message de demande de connexion au premier commutateur auquel elle est rattachée. Ce commutateur analyse la demande, identifie la destination et, en consultant ses tables d\'acheminement, sélectionne une liaison sortante vers le prochain nœud sur le chemin. Surtout, il réserve une ressource spécifique sur cette liaison (par exemple, un canal de fréquence dans un système à multiplexage fréquentiel ou un intervalle de temps dans un système à multiplexage temporel). La demande de connexion est alors relayée au nœud suivant, qui répète le processus : analyse, sélection d\'une liaison sortante, réservation de ressource, et relais.6 Cette chaîne de réservations se poursuit de proche en proche à travers le réseau jusqu\'à atteindre le commutateur de rattachement du destinataire, puis le destinataire lui-même, qui doit signaler son acceptation de la communication. Une fois que le message d\'acceptation remonte le chemin ainsi tracé, le circuit est considéré comme établi.8 Cette phase d\'établissement introduit une latence initiale, non négligeable, pendant laquelle aucune donnée ne peut être transférée.

2\. Transfert des données

Une fois le circuit établi, la phase de transfert de données peut commencer. Les données transitent alors sur le chemin dédié comme si les deux terminaux étaient physiquement connectés par un fil direct.2 Le débit de transmission est constant et garanti, car les ressources ont été réservées en amont. Les nœuds de commutation intermédiaires agissent de manière transparente ; leur rôle se limite à maintenir la connexion physique ou logique entre les segments entrants et sortants du circuit. Il n\'y a aucun traitement complexe à effectuer sur les données en transit, pas d\'adressage à lire ni de décision de routage à prendre. Le transfert est généralement bidirectionnel (full-duplex).

3\. Libération de la connexion (Déconnexion)

Lorsque la communication est terminée, l\'une des deux parties initie une procédure de déconnexion. Un signal de libération est envoyé le long du circuit, indiquant à chaque commutateur intermédiaire de libérer les ressources (canaux, intervalles de temps) qui avaient été allouées à cette communication.6 Ces ressources redeviennent alors disponibles pour l\'établissement de nouveaux circuits pour d\'autres communications.7 Cette phase est essentielle pour l\'efficacité globale du réseau, car elle permet de mutualiser les infrastructures.

#### Analogie Fondamentale : Le Réseau Téléphonique Commuté (RTC)

L\'exemple canonique et le plus intuitif de la commutation de circuits est le Réseau Téléphonique Commuté (RTC) traditionnel, aussi connu sous le nom de PSTN (Public Switched Telephone Network). Lorsqu\'une personne décroche son téléphone et compose un numéro, elle initie la phase d\'établissement de connexion. Les signaux de numérotation sont interprétés par le central téléphonique local (un commutateur), qui commence à construire un circuit électrique à travers une hiérarchie de commutateurs locaux, de transit, et interurbains. La voix, convertie en un signal électrique analogique, ne sera transmise qu\'une fois que le circuit jusqu\'au téléphone du destinataire sera complet et que ce dernier aura décroché. Pendant toute la durée de l\'appel, une portion de la bande passante des câbles de cuivre est exclusivement dédiée à cette conversation.

Même avec l\'avènement du numérique, le principe est resté le même. Le Réseau Numérique à Intégration de Services (RNIS ou ISDN en anglais) a remplacé la transmission analogique par une transmission numérique, mais il reposait toujours sur la commutation de circuits, en allouant des canaux numériques dédiés de 64 kbit/s pour la voix ou les données. La transition technologique majeure que nous vivons actuellement, avec l\'arrêt programmé du RTC dans de nombreux pays, illustre le passage d\'un paradigme à l\'autre : la téléphonie traditionnelle est remplacée par la Voix sur IP (VoIP), qui, elle, repose entièrement sur la commutation de paquets.

#### Analyse des Avantages et Inconvénients

La conception de la commutation de circuits lui confère des caractéristiques très marquées.

**Avantages :**

> **Qualité de Service (QoS) Garantie :** C\'est l\'avantage principal et indéniable de cette architecture. Une fois la connexion établie, le débit est constant et la latence (délai de transmission) est minimale et fixe. Il n\'y a pas de gigue, c\'est-à-dire de variation de la latence, car les données ne subissent aucune attente dans les nœuds intermédiaires. Cette prévisibilité des performances est idéale pour les applications en temps réel et isochrones, comme la communication vocale ou la vidéoconférence traditionnelles, où un flux constant de données est essentiel.
>
> **Simplicité du transfert :** Pendant la phase de transfert de données, les commutateurs intermédiaires n\'ont aucune tâche complexe à accomplir. Les données circulent sans nécessiter d\'analyse d\'en-tête ou de décision d\'acheminement, ce qui rend ces commutateurs potentiellement plus simples et rapides pour cette phase spécifique.

**Inconvénients :**

> **Inefficacité et Gaspillage de Ressources :** C\'est le défaut rédhibitoire de la commutation de circuits pour la communication de données. Les ressources du réseau sont allouées et réservées pour toute la durée de la session, qu\'il y ait ou non des données à transmettre. Dans une conversation téléphonique, les moments de silence représentent une part non négligeable du temps, pendant laquelle la bande passante allouée est gaspillée. Pour le trafic de données informatiques, qui est par nature \"en rafales\" (\
> *bursty*) -- par exemple, le téléchargement d\'une page web suivi d\'une période de lecture inactive --, ce gaspillage devient extrême et inacceptable.
>
> **Coût et Évolutivité Limitée :** La nécessité de dédier des ressources rend l\'infrastructure coûteuse. Le nombre total de communications simultanées qu\'un commutateur peut gérer est physiquement borné par le nombre de circuits qu\'il peut établir. L\'ajout de capacité est donc linéaire et onéreux.
>
> **Manque de Robustesse :** Le circuit établi est un point de défaillance unique. Si un seul commutateur ou une seule liaison sur le chemin tombe en panne, la communication est entièrement et irrémédiablement coupée. Il n\'existe aucun mécanisme inhérent pour rerouter dynamiquement la communication.
>
> **Latence d\'établissement :** Le temps nécessaire pour établir le circuit avant que toute communication puisse commencer peut être significatif, ce qui est pénalisant pour les transactions de données courtes et fréquentes.

### 33.1.2 La Commutation de Paquets : Flexibilité et Efficacité Partagée

Née dans les années 1960 en réponse aux limitations de la commutation de circuits pour la transmission de données, la commutation de paquets propose une philosophie radicalement différente. Plutôt que de réserver un chemin en amont, elle traite les données à la volée, en optimisant l\'utilisation des ressources du réseau grâce au partage. C\'est le paradigme qui sous-tend l\'Internet et la quasi-totalité des réseaux de données modernes.

#### Principe de Fonctionnement

Le principe fondamental est de ne plus considérer un message comme un flux continu, mais de le segmenter en unités discrètes de taille limitée, appelées **paquets**. Chaque paquet est une entité autonome qui contient deux éléments essentiels :

> **La charge utile (Payload) :** Un fragment des données originales à transmettre.
>
> **L\'en-tête (Header) :** Un ensemble d\'informations de contrôle, ou métadonnées, qui est vital pour l\'acheminement. L\'en-tête inclut, au minimum, l\'adresse de la destination finale et l\'adresse de la source.

Ces paquets sont ensuite injectés dans le réseau un par un. Chaque nœud intermédiaire (désormais appelé routeur ou commutateur de paquets) reçoit un paquet, le stocke temporairement en mémoire (d\'où le terme *store-and-forward*), examine son en-tête pour déterminer sa destination, et le réachemine vers le nœud suivant le plus approprié sur le chemin de cette destination.

Contrairement à la commutation de circuits, il n\'y a pas de chemin prédéfini. Les paquets d\'un même message peuvent emprunter des routes différentes à travers le réseau, en fonction de l\'état du réseau (congestion, pannes) au moment de leur traitement par chaque routeur. Une conséquence directe est que les paquets peuvent arriver à destination dans le désordre ou même ne pas arriver du tout. Le réassemblage et la gestion des erreurs sont laissés à la charge des équipements terminaux.

#### Comparaison des Modes de Fonctionnement

La commutation de paquets peut être implémentée selon deux modes principaux, qui représentent un compromis entre la flexibilité pure et une certaine forme de prévisibilité.

Mode Datagramme (sans connexion)

C\'est le mode le plus pur de la commutation de paquets et celui sur lequel repose le protocole IP (Internet Protocol), la pierre angulaire de l\'Internet. Dans ce mode, chaque paquet, appelé datagramme, est une entité complètement indépendante.3 Il contient l\'adresse complète et absolue de sa destination. Chaque routeur traversé prend une décision de routage individuelle pour chaque datagramme en consultant sa table de routage, sans avoir connaissance des paquets qui l\'ont précédé ou qui le suivront.22

Il n\'y a aucune phase d\'établissement de connexion. Un hôte peut envoyer un datagramme à tout moment. Le service est dit \"sans connexion\" et \"best-effort\" (au mieux), ce qui signifie que le réseau ne fournit aucune garantie quant à la livraison, l\'ordre d\'arrivée, l\'absence de duplications ou le délai de transmission des paquets. La fiabilité doit être assurée, si nécessaire, par des protocoles de couches supérieures (comme TCP).

Mode Circuit Virtuel (orienté connexion)

Ce mode, utilisé par des technologies comme X.25, Frame Relay, ou ATM, cherche à combiner l\'efficacité du partage de ressources de la commutation de paquets avec la notion de \"connexion\" de la commutation de circuits.3 Une communication en mode circuit virtuel se déroule en trois phases, rappelant celles de la commutation de circuits :

> **Établissement du circuit virtuel :** Une phase de signalisation établit un chemin *logique* à travers le réseau. Un paquet de demande de connexion est envoyé, et chaque commutateur sur le chemin crée une entrée dans sa table de commutation. Cette entrée associe un identifiant de circuit virtuel (VCI - Virtual Circuit Identifier) sur un port d\'entrée à un autre VCI sur un port de sortie.
>
> **Transfert de données :** Les paquets de données n\'ont plus besoin de porter l\'adresse complète de la destination, mais seulement le VCI, qui est un identifiant court et local à chaque liaison. Lorsqu\'un commutateur reçoit un paquet, il lit le VCI, consulte sa table, remplace le VCI entrant par le VCI sortant correspondant, et commute le paquet sur le bon port de sortie. Ce processus de consultation de table est beaucoup plus rapide qu\'une recherche complexe dans une table de routage IP.
>
> **Libération du circuit virtuel :** À la fin de la communication, un paquet de libération est envoyé pour effacer les entrées correspondantes dans les tables de tous les commutateurs le long du chemin.

Bien qu\'il y ait une phase de connexion, les ressources physiques (la bande passante de la liaison) ne sont pas dédiées. Elles sont toujours partagées entre plusieurs circuits virtuels via le multiplexage statistique des paquets.

#### Analyse des Avantages et Inconvénients

La philosophie de la commutation de paquets lui confère des atouts et des faiblesses qui sont presque l\'image inversée de ceux de la commutation de circuits.

**Avantages :**

> **Efficacité et Utilisation Optimale de la Bande Passante :** C\'est son avantage le plus significatif. Les liaisons de communication sont partagées dynamiquement. La bande passante n\'est consommée que lorsqu\'un paquet est effectivement en cours de transmission. Ce multiplexage statistique est parfaitement adapté à la nature sporadique et en rafales du trafic de données, permettant à de nombreux utilisateurs de partager efficacement une même infrastructure.
>
> **Robustesse et Flexibilité :** Le réseau est intrinsèquement résilient. En cas de panne d\'un routeur ou d\'une liaison, les protocoles de routage peuvent mettre à jour leurs tables et trouver dynamiquement des chemins alternatifs pour les paquets suivants. La communication n\'est pas interrompue, elle est simplement dégradée ou ralentie temporairement.
>
> **Évolutivité et Coût :** L\'infrastructure partagée est plus rentable. Le réseau peut facilement s\'adapter à une augmentation du nombre d\'utilisateurs et du volume de trafic sans nécessiter de modifications structurelles majeures.

**Inconvénients :**

> **Absence de Garantie de Qualité de Service (QoS) :** C\'est le revers de la médaille du partage de ressources. Les paquets peuvent être retardés dans les files d\'attente des routeurs si le trafic est dense. Cela entraîne une latence variable (gigue) et imprévisible, ce qui peut être très pénalisant pour les applications temps réel sensibles comme la voix ou la vidéo interactive de haute qualité.
>
> **Congestion :** Si le volume de trafic entrant dans un routeur dépasse durablement sa capacité à le traiter et à le retransmettre, ses mémoires tampons (files d\'attente) peuvent saturer et déborder. Les paquets excédentaires sont alors simplement jetés (perdus), nécessitant une retransmission par les couches supérieures.
>
> **Complexité de Traitement dans les Nœuds :** Chaque paquet doit être traité individuellement par chaque routeur sur son chemin. Ce traitement inclut la vérification de l\'en-tête, la consultation de la table de routage (qui peut être très grande), et la mise à jour de certains champs, ce qui impose une charge de calcul non négligeable sur les équipements du réseau.

### 33.1.3 Analyse Comparative Approfondie des Paradigmes de Commutation

La décision entre la commutation de circuits et la commutation de paquets n\'est pas simplement un choix technique, mais un reflet de la nature même de l\'information à transmettre. La commutation de circuits est conçue autour de l\'idée d\'une conversation continue et isochrone, comme la voix humaine. La commutation de paquets est conçue pour des échanges de données discrets et sporadiques, typiques des interactions informatiques.

La distinction fondamentale peut être résumée ainsi : la commutation de circuits réserve les ressources réseau *a priori*, avant le début de la communication, tandis que la commutation de paquets alloue ces mêmes ressources *à la demande*, paquet par paquet.

La raison pour laquelle la commutation de paquets a triomphé pour construire l\'Internet est une conséquence directe de cette distinction. Le trafic de données généré par les ordinateurs est fondamentalement différent du trafic vocal. Il est caractérisé par de courtes rafales d\'activité intense (par exemple, le téléchargement d\'un fichier ou d\'une page web) suivies de longues périodes d\'inactivité (par exemple, la lecture du contenu par l\'utilisateur). Appliquer un modèle de réservation de ressources continues, comme celui de la commutation de circuits, à un trafic aussi intermittent est d\'une inefficacité flagrante. La bande passante serait réservée et payée pendant de longues périodes d\'inactivité, ce qui serait économiquement et techniquement insoutenable à grande échelle. La commutation de paquets n\'est donc pas une simple alternative ; elle est la solution d\'ingénierie qui s\'aligne naturellement avec la nature du trafic de données. C\'est cette adéquation fondamentale qui a permis la croissance exponentielle et le succès économique de l\'Internet.

Cependant, l\'histoire des réseaux est une histoire de cycles et de synthèses. Le débat historique entre les partisans du circuit virtuel (comme le réseau français Transpac avec le protocole X.25) et ceux du datagramme (les pionniers d\'ARPANET avec le protocole IP)  n\'est pas entièrement clos. Alors que le modèle du datagramme a remporté la bataille de l\'Internet global pour sa simplicité et sa robustesse, les exigences croissantes en matière de Qualité de Service (QoS) pour des applications comme la VoIP, le streaming vidéo ou les jeux en ligne ont poussé les ingénieurs à réintroduire des concepts issus du monde des circuits virtuels au cœur même des réseaux à datagrammes. Des technologies modernes comme le MPLS (Multi-Protocol Label Switching) fonctionnent en créant des \"chemins à commutation par étiquettes\" (Label Switched Paths), qui sont en substance des circuits virtuels, au sein des réseaux des opérateurs. Ces chemins permettent d\'acheminer le trafic de manière plus prévisible et contrôlée, en contournant les décisions de routage IP traditionnelles à chaque saut, afin de garantir des niveaux de performance pour les trafics sensibles. Cela démontre que les architectures réseau contemporaines sont des systèmes hybrides et pragmatiques, cherchant à obtenir le meilleur des deux mondes : l\'efficacité et la robustesse de la commutation de paquets en mode datagramme pour le trafic général, et les garanties de performance inspirées des circuits virtuels pour les flux qui l\'exigent.

Le tableau suivant synthétise les caractéristiques distinctives des deux paradigmes.

**Tableau 33.1 : Comparaison Détaillée : Commutation de Circuits vs. Commutation de Paquets**

  -------------------------------------- ------------------------------------------------------------------------- ----------------------------------------------------------------------
  Critère                                Commutation de Circuits                                                   Commutation de Paquets

  **Établissement de la connexion**      Phase obligatoire avant tout transfert.                                   Optionnelle (mode circuit virtuel) ou absente (mode datagramme).

  **Allocation des ressources**          Dédiée et réservée pour toute la session.                                 Partagée et allouée dynamiquement à la demande.

  **Chemin de données**                  Fixe et unique pour toute la durée de la communication.                   Dynamique ; les paquets peuvent emprunter des chemins différents.

  **Adressage**                          Uniquement pendant la phase d\'établissement.                             Explicite dans l\'en-tête de chaque paquet.

  **Qualité de Service (QoS)**           Débit, latence et gigue garantis et constants.                            \"Best-effort\" ; débit, latence et gigue variables et non garantis.

  **Utilisation de la bande passante**   Inefficace pour le trafic en rafales (gaspillage pendant les silences).   Très efficace grâce au multiplexage statistique.

  **Robustesse aux pannes**              Faible ; la perte d\'un nœud sur le chemin coupe la communication.        Élevée ; le réseau peut rerouter dynamiquement les paquets.

  **Complexité des nœuds**               Complexe lors de l\'établissement, simple lors du transfert.              Traitement constant et complexe pour chaque paquet (routage).

  **Exemples de technologies**           RTC, RNIS.                                                                Internet (IP), Ethernet, X.25, ATM, Frame Relay, MPLS.

  **Cas d\'usage idéaux**                Voix et vidéo en temps réel (applications traditionnelles).               Tout type de trafic de données, en particulier le trafic en rafales.
  -------------------------------------- ------------------------------------------------------------------------- ----------------------------------------------------------------------

## 33.2 Modèles de Référence en Couches : Abstraction et Organisation

La conception et l\'implémentation d\'un système de communication réseau constituent un défi d\'une immense complexité. De la physique des signaux électriques sur un câble à la sémantique d\'une requête web, une multitude de problèmes doivent être résolus. Pour maîtriser cette complexité, les ingénieurs et les chercheurs ont adopté une approche fondamentale en informatique : la division et l\'abstraction. Plutôt que de concevoir un système monolithique, la fonctionnalité globale du réseau est décomposée en une série de **couches** hiérarchiques.

Ce principe de communication en couches stipule que chaque couche est responsable d\'un ensemble de tâches bien définies. Elle fournit des services spécifiques à la couche qui lui est immédiatement supérieure, tout en s\'appuyant sur les services offerts par la couche qui lui est immédiatement inférieure. L\'un des principes les plus importants de cette architecture est que chaque couche sur une machine source communique *logiquement* avec sa couche homologue (ou \"paire\") sur la machine de destination. Les règles et conventions qui gouvernent cette communication horizontale sont appelées **protocoles**. La communication physique, quant à elle, est verticale : les données descendent la pile de couches sur la machine source, sont transmises sur le média physique, puis remontent la pile sur la machine de destination.

Cette organisation en couches offre des avantages considérables :

> **Modularité :** Chaque couche peut être développée, optimisée ou remplacée indépendamment des autres, tant que les interfaces entre les couches adjacentes sont respectées.
>
> **Standardisation :** Elle facilite la création de normes pour chaque fonction réseau, garantissant l\'interopérabilité entre les équipements de différents fabricants.
>
> **Gestion de la complexité :** Elle permet de raisonner sur un sous-ensemble de problèmes à la fois, rendant la conception et le dépannage beaucoup plus abordables.

Deux modèles en couches ont marqué l\'histoire des réseaux : le modèle OSI, un cadre théorique complet, et le modèle TCP/IP, le modèle pragmatique qui a servi de base à l\'Internet.

### 33.2.1 Le Modèle OSI : Une Architecture Conceptuelle en Sept Couches

Le modèle d\'interconnexion des systèmes ouverts (OSI - Open Systems Interconnection) a été développé à partir de la fin des années 1970 par l\'Organisation internationale de normalisation (ISO). Il s\'agit d\'un modèle de référence, une norme *de jure*, dont l\'objectif était de fournir un cadre architectural universel pour la communication réseau, afin de permettre à des systèmes hétérogènes de communiquer sans difficulté. Bien que la suite de protocoles OSI n\'ait jamais atteint la popularité de TCP/IP, le modèle lui-même reste un outil pédagogique et conceptuel d\'une valeur inestimable pour comprendre l\'ensemble des fonctions nécessaires à une communication réseau complète. Le modèle OSI décompose la communication en sept couches distinctes.

Couche 1 - La Couche Physique (Physical Layer)

C\'est la couche la plus basse, celle qui est en contact direct avec le média de transmission. Son rôle est de gérer la transmission et la réception d\'un flux de bits bruts (des 0 et des 1) sur un canal de communication. Elle ne se préoccupe ni de la signification de ces bits, ni de leur structure. Ses responsabilités sont d\'ordre mécanique, électrique et fonctionnel :

> Définir les caractéristiques des connecteurs (par exemple, le nombre de broches et leur fonction).
>
> Spécifier les niveaux de tension ou d\'intensité lumineuse pour représenter un 0 ou un 1.
>
> Déterminer le débit binaire (nombre de bits transmis par seconde).
>
> Gérer la synchronisation des horloges entre l\'émetteur et le récepteur pour que les bits soient échantillonnés correctement.
>
> Définir le mode de transmission : simplex (unidirectionnel), half-duplex (bidirectionnel mais pas simultané) ou full-duplex (bidirectionnel et simultané).\
> Exemples de normes de la couche physique : Ethernet (spécifications des câbles à paires torsadées, fibre optique), USB, Bluetooth.26

Couche 2 - La Couche Liaison de Données (Data Link Layer)

La couche physique offre un service de transmission de bits qui peut être sujet à des erreurs. Le rôle principal de la couche de liaison de données est de transformer ce canal brut en une liaison qui apparaît comme fiable et exempte d\'erreurs pour la couche réseau supérieure. Elle assure une communication fiable entre deux nœuds directement connectés (par exemple, un ordinateur et un commutateur, ou deux routeurs reliés par une liaison). Ses fonctions incluent :

> **Tramage (Framing) :** Regrouper le flux de bits en unités de données appelées **trames**.
>
> **Adressage Physique :** Utiliser des adresses physiques (adresses MAC) gravées dans le matériel pour identifier de manière unique les équipements sur un réseau local.
>
> **Détection d\'erreurs :** Ajouter une somme de contrôle (comme un CRC) à chaque trame pour permettre au récepteur de détecter si des bits ont été altérés pendant la transmission.
>
> **Contrôle de flux :** Empêcher un émetteur rapide de submerger un récepteur plus lent.
>
> Contrôle d\'accès au média (MAC) : Coordonner l\'accès à un média de transmission partagé (par exemple, via CSMA/CD sur les anciens réseaux Ethernet).\
> Exemples de protocoles : Ethernet, Wi-Fi, PPP (Point-to-Point Protocol).26

Couche 3 - La Couche Réseau (Network Layer)

Alors que la couche liaison de données gère la livraison entre nœuds adjacents, la couche réseau est responsable de l\'acheminement des données de la machine source à la machine destination finale, potentiellement à travers de multiples réseaux interconnectés (un inter-réseau). C\'est la couche qui réalise le concept d\'Internet. Ses fonctions principales sont :

> **Adressage Logique :** Attribuer des adresses logiques uniques et hiérarchiques (comme les adresses IP) aux hôtes du réseau, indépendamment de leur adressage physique.
>
> **Routage :** Déterminer le meilleur chemin pour acheminer les paquets de la source à la destination à travers le maillage de routeurs.
>
> Fragmentation et Réassemblage : Si un paquet est trop grand pour être transmis sur un réseau intermédiaire, la couche réseau peut le fragmenter en paquets plus petits.\
> Exemples de protocoles : IP (Internet Protocol), ICMP (Internet Control Message Protocol), OSPF (un protocole de routage).26

Couche 4 - La Couche de Transport (Transport Layer)

La couche réseau assure la livraison des paquets d\'un hôte à un autre, mais de manière \"best-effort\". La couche de transport fournit une communication logique de bout en bout, non plus entre des machines, mais entre des processus applicatifs s\'exécutant sur ces machines. Elle offre deux types de services principaux :

> **Service orienté connexion et fiable (ex: TCP) :** Garantit que toutes les données arrivent à destination, sans erreur, dans le bon ordre et sans duplication. Pour ce faire, elle gère la segmentation des données en segments, l\'acquittement des segments reçus, la retransmission des segments perdus, et le contrôle de flux de bout en bout.
>
> Service sans connexion et non fiable (ex: UDP) : Fournit une transmission rapide et légère, sans les garanties (et la surcharge) d\'un service fiable. Utile pour les applications où la vitesse prime sur la fiabilité absolue (streaming vidéo, jeux en ligne, DNS).\
> Elle gère également le multiplexage en utilisant des numéros de port pour diriger les données vers le bon processus applicatif sur la machine de destination.26

Couche 5 - La Couche de Session (Session Layer)

Cette couche est responsable de l\'organisation et de la synchronisation du dialogue entre les applications. Elle établit, gère et termine les sessions de communication. Ses fonctions incluent :

> **Gestion du dialogue :** Contrôler qui peut transmettre et à quel moment (gestion du tour de parole).
>
> **Synchronisation :** Placer des points de contrôle dans le flux de données. En cas d\'erreur lors du transfert d\'un gros fichier, la transmission peut reprendre au dernier point de contrôle validé, plutôt que de devoir tout recommencer depuis le début.

Couche 6 - La Couche de Présentation (Presentation Layer)

La couche de présentation s\'occupe de la syntaxe et de la sémantique des informations transmises. Elle assure que les données envoyées par la couche application d\'un système puissent être lues et comprises par la couche application d\'un autre système, même si ces systèmes utilisent des représentations de données internes différentes. Ses trois fonctions principales sont :

> **Traduction/Conversion de format :** Par exemple, convertir les données entre différents codages de caractères (ASCII, EBCDIC) ou formats de données.
>
> **Chiffrement/Déchiffrement :** Assurer la confidentialité des données en les chiffrant avant la transmission et en les déchiffrant à la réception.
>
> **Compression/Décompression :** Réduire le nombre de bits à transmettre pour économiser de la bande passante.

Couche 7 - La Couche d\'Application (Application Layer)

C\'est la couche la plus élevée du modèle OSI, celle qui est la plus proche de l\'utilisateur. Elle ne fournit pas de services à d\'autres couches OSI, mais plutôt des services réseau directement aux applications de l\'utilisateur final (navigateurs web, clients de messagerie, etc.). Elle contient les protocoles qui permettent aux applications d\'effectuer des tâches spécifiques sur le réseau.

Exemples de protocoles : HTTP (HyperText Transfer Protocol) pour le web, SMTP (Simple Mail Transfer Protocol) pour l\'envoi d\'e-mails, FTP (File Transfer Protocol) pour le transfert de fichiers, DNS (Domain Name System) pour la résolution de noms.25

**Figure 33.1 -- Modèle OSI : les sept couches et l\'encapsulation des données**

```mermaid
flowchart TB
    subgraph OSI["Modèle OSI -- 7 couches"]
        direction TB
        L7["Couche 7 -- Application\n(HTTP, FTP, SMTP, DNS)"]
        L6["Couche 6 -- Présentation\n(Chiffrement, Compression, Traduction)"]
        L5["Couche 5 -- Session\n(Gestion du dialogue, Synchronisation)"]
        L4["Couche 4 -- Transport\n(TCP, UDP) — Segments"]
        L3["Couche 3 -- Réseau\n(IP, ICMP, Routage) — Paquets"]
        L2["Couche 2 -- Liaison de données\n(Ethernet, Wi-Fi, MAC) — Trames"]
        L1["Couche 1 -- Physique\n(Câbles, Signaux, Bits)"]
    end

    subgraph ENCAP["Encapsulation des données"]
        direction TB
        D7["Données"]
        D4["En-tête Transport + Données = Segment"]
        D3["En-tête Réseau + Segment = Paquet"]
        D2["En-tête Liaison + Paquet + Trailer = Trame"]
        D1["Flux de bits sur le média physique"]
    end

    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1
    D7 --> D4 --> D3 --> D2 --> D1
```

### 33.2.2 Le Modèle TCP/IP : L\'Architecture Pragmatique de l\'Internet

Contrairement au modèle OSI, qui est le fruit d\'un comité de normalisation international, le modèle TCP/IP (Transmission Control Protocol/Internet Protocol) est né de manière plus organique et pragmatique des recherches menées pour le réseau ARPANET du Département de la Défense américain (DoD). Il n\'a pas été conçu comme un modèle de référence rigide, mais plutôt comme une description de la suite de protocoles qui fonctionnait et qui a finalement donné naissance à l\'Internet. C\'est donc une norme *de facto*.

Le modèle TCP/IP est généralement décrit avec quatre couches, bien que certaines variantes en présentent cinq en séparant la couche d\'accès au réseau en deux.

Couche 1 - Accès Réseau (Network Access Layer)

Cette couche est la plus basse du modèle TCP/IP et est aussi la moins bien définie. Elle combine les fonctions des couches Physique (1) et Liaison de Données (2) du modèle OSI. Son rôle est de gérer tous les aspects matériels et protocolaires nécessaires pour transmettre des paquets IP sur une liaison physique spécifique. Le modèle TCP/IP ne spécifie délibérément aucun protocole pour cette couche, se contentant d\'exiger qu\'elle fournisse la capacité d\'envoyer et de recevoir des paquets IP. Cette flexibilité est l\'une de ses grandes forces : TCP/IP peut fonctionner sur n\'importe quelle technologie de réseau, qu\'il s\'agisse d\'Ethernet, de Wi-Fi, de liaisons satellites ou de technologies futures.22

Couche 2 - Internet (Internet Layer)

Cette couche est la clé de voûte de l\'architecture TCP/IP ; elle correspond à la couche Réseau (3) du modèle OSI. Sa mission fondamentale est de permettre l\'interconnexion de réseaux hétérogènes et d\'acheminer les paquets de leur source à leur destination finale à travers cet \"inter-réseau\". Elle fournit un service de datagramme sans connexion et non fiable. Le protocole central et unique de cette couche est le Protocole Internet (IP). C\'est IP qui définit le format des paquets et le schéma d\'adressage (adresses IPv4 et IPv6) qui permet d\'identifier de manière unique chaque hôte sur le réseau mondial.22

Couche 3 - Transport (Transport Layer)

Identique dans sa fonction à la couche Transport (4) du modèle OSI, cette couche assure la communication logique entre les processus applicatifs des hôtes source et destination. Elle s\'appuie sur le service non fiable de la couche Internet pour fournir deux services distincts :

> **TCP (Transmission Control Protocol) :** Un service fiable, orienté connexion, qui garantit la livraison ordonnée et sans erreur des données.
>
> **UDP (User Datagram Protocol) :** Un service simple, sans connexion et non fiable, qui offre une transmission rapide avec une faible surcharge.

Couche 4 - Application (Application Layer)

La couche Application du modèle TCP/IP est très large. Elle regroupe toutes les fonctions des couches Session (5), Présentation (6) et Application (7) du modèle OSI. Elle contient tous les protocoles de haut niveau que les applications utilisent pour communiquer sur le réseau. Les fonctions de gestion de session, de formatage des données, de chiffrement et de compression sont considérées comme faisant partie intégrante du protocole applicatif lui-même.22 Par exemple, le protocole HTTPS inclut en son sein le protocole TLS (Transport Layer Security), qui gère à la fois l\'établissement d\'une session sécurisée et le chiffrement des données.

#### Correspondance et Analyse Comparative

La comparaison des deux modèles révèle des philosophies de conception différentes. Le modèle OSI est prescriptif et a été conçu *avant* l\'implémentation des protocoles, cherchant à créer un cadre théorique parfait et complet. Le modèle TCP/IP est descriptif et a été formalisé *à partir* de protocoles qui avaient déjà fait leurs preuves. Cette approche pragmatique, axée sur la résolution de problèmes concrets, est l\'une des raisons de son succès retentissant.

La principale force du modèle TCP/IP réside dans la conception de sa couche Internet. Le protocole IP a été conçu comme une \"taille de guêpe\" (ou *thin waist*) dans l\'architecture en couches. Il fournit un service universel et minimaliste (l\'acheminement de datagrammes best-effort) sur lequel une immense variété de protocoles de transport et d\'application peuvent s\'appuyer, et qui peut lui-même être transporté par une tout aussi grande variété de technologies de liaison de données. Cette architecture a favorisé une innovation explosive et décentralisée, tant au niveau des applications qu\'au niveau des technologies physiques, sans nécessiter de changement au niveau de la couche centrale IP.

L\'absence de couches Session et Présentation dédiées dans TCP/IP est une autre différence majeure. Cela ne signifie pas que leurs fonctions sont inutiles ou absentes. Elles ont simplement été intégrées directement dans les protocoles de la couche Application. Cette décision a simplifié le modèle global et a peut-être rendu le développement d\'applications réseau plus direct. Cependant, elle a aussi conduit à une certaine redondance, chaque application devant potentiellement réimplémenter ses propres mécanismes de session ou de formatage de données, là où le modèle OSI prévoyait des services standardisés.

Le tableau suivant met en évidence la correspondance entre les couches des deux modèles.

**Tableau 33.2 : Correspondance des Couches entre les Modèles OSI et TCP/IP**

  ------------------------ ------------------------------------ ----------------------------------------------
  Couche OSI               Modèle TCP/IP (4 couches)            Exemples de Protocoles

  7\. Application          \\multirow{3}{\*}{4. Application}    \\multirow{3}{\*}{HTTP, SMTP, DNS, FTP, SSH}

  6\. Présentation

  5\. Session

  4\. Transport            3\. Transport                        TCP, UDP

  3\. Réseau               2\. Internet                         IP, ICMP, OSPF

  2\. Liaison de Données   \\multirow{2}{\*}{1. Accès Réseau}   \\multirow{2}{\*}{Ethernet, Wi-Fi, PPP, ARP}

  1\. Physique
  ------------------------ ------------------------------------ ----------------------------------------------

### 33.2.3 Le Processus d\'Encapsulation : Voyage des Données à Travers les Couches

L\'encapsulation est le mécanisme fondamental qui met en œuvre le principe de la communication en couches. Lorsqu\'une application sur un hôte émetteur souhaite envoyer des données, ces dernières ne sont pas directement transmises sur le câble. Elles entament un voyage vertical vers le bas à travers la pile de protocoles. À chaque couche traversée, les données de la couche supérieure sont \"enveloppées\" par la couche actuelle, qui ajoute ses propres informations de contrôle. Cet ajout prend généralement la forme d\'un **en-tête** (header) placé avant les données, et parfois d\'un **pied de page** (trailer) placé après.

#### Le Concept de PDU (Protocol Data Unit)

L\'unité de données manipulée par une couche donnée est appelée **Unité de Données de Protocole** (PDU - Protocol Data Unit). Un PDU de la couche N est constitué des données de la couche N+1 (appelées SDU - Service Data Unit pour la couche N) et de l\'en-tête (et/ou pied de page) ajouté par la couche N. Bien que PDU soit le terme générique, ces unités de données portent des noms spécifiques aux couches les plus importantes, une terminologie qu\'il est crucial de maîtriser :

> **Couche Transport (Couche 4) :** Le PDU est appelé un **Segment** lorsque le protocole TCP est utilisé, ou un **Datagramme** lorsque le protocole UDP est utilisé. L\'en-tête de transport contient des informations vitales comme les numéros de port source et destination, qui identifient les processus applicatifs communicants.
>
> **Couche Réseau/Internet (Couche 3) :** Le PDU est appelé un **Paquet**. La couche réseau prend le segment de la couche transport et lui ajoute un en-tête réseau (par exemple, un en-tête IP) contenant les adresses logiques source et destination (adresses IP).
>
> **Couche Liaison de Données (Couche 2) :** Le PDU est appelé une **Trame**. La couche de liaison de données prend le paquet de la couche réseau et l\'encapsule en ajoutant un en-tête de liaison (contenant les adresses physiques source et destination, ou adresses MAC) et un pied de page (contenant une somme de contrôle, comme le FCS, pour la détection d\'erreurs).
>
> **Couche Physique (Couche 1) :** À ce niveau, on ne parle plus de PDU structuré, mais d\'un flux de **bits** transmis sur le média.

#### Visualisation du Processus Complet

Imaginons l\'envoi d\'un courriel.

Chez l\'émetteur (Encapsulation) :

> **Couche Application :** L\'application de messagerie génère le message (les données).
>
> **Couche Transport :** Le protocole TCP prend les données, les segmente si nécessaire, et ajoute un en-tête TCP contenant les numéros de port (par exemple, port 25 pour SMTP) et des numéros de séquence. Le PDU est maintenant un **segment TCP**.
>
> **Couche Internet :** Le protocole IP prend le segment TCP et ajoute un en-tête IP contenant les adresses IP source et destination. Le PDU est maintenant un **paquet IP**.
>
> **Couche Accès Réseau :** Le pilote de la carte réseau (par exemple, Ethernet) prend le paquet IP et ajoute un en-tête Ethernet (avec les adresses MAC source et destination) et un pied de page Ethernet (le FCS). Le PDU est maintenant une **trame Ethernet**.
>
> **Couche Physique :** La carte réseau convertit la trame en une série de signaux électriques, optiques ou radio (des **bits**) et les envoie sur le média.

Chez le récepteur (Décapsulation) :

Le processus est exactement inverse.

> **Couche Physique :** La carte réseau reçoit les signaux et les reconvertit en une **trame** binaire.
>
> **Couche Accès Réseau :** Le pilote de la carte réseau vérifie l\'adresse MAC de destination et le FCS. Si tout est correct, il retire l\'en-tête et le pied de page Ethernet et passe le **paquet IP** à la couche supérieure.
>
> **Couche Internet :** Le protocole IP examine l\'en-tête IP. Si l\'adresse IP de destination correspond à la sienne, il retire l\'en-tête IP et passe le **segment TCP** à la couche supérieure.
>
> **Couche Transport :** Le protocole TCP traite l\'en-tête TCP, réassemble les segments dans le bon ordre, et passe les données brutes au processus applicatif identifié par le numéro de port.
>
> **Couche Application :** L\'application de messagerie reçoit les données du courriel et les présente à l\'utilisateur.

Ce processus d\'encapsulation et de décapsulation est le cœur du fonctionnement des réseaux en couches. Il assure que chaque couche ne traite que les informations qui la concernent, ignorant les en-têtes des autres couches. L\'en-tête de la couche N est un message destiné à la couche N de la machine distante. Cette séparation stricte des préoccupations est ce qui confère aux réseaux modernes leur modularité, leur flexibilité et leur capacité à évoluer. On peut, par exemple, remplacer une connexion Ethernet par une connexion Wi-Fi (changement aux couches 1 et 2) sans que les couches IP, TCP ou l\'application ne s\'en aperçoivent.

Le tableau suivant résume la terminologie des PDU et leurs fonctions d\'adressage.

**Tableau 33.3 : Unités de Données de Protocole (PDU) par Couche**

  --------------- -------------------- ---------------------------------- ---------------------------- --------------------------------------------------------------------------
  N° Couche OSI   Nom de la Couche     Nom du PDU                         Adresse Principale Ajoutée   Rôle de l\'Adresse

  4               Transport            Segment (TCP) / Datagramme (UDP)   Numéros de Port              Identifier le processus applicatif (service) sur l\'hôte de destination.

  3               Réseau               Paquet                             Adresses Logiques (IP)       Identifier l\'hôte de destination final sur l\'inter-réseau.

  2               Liaison de Données   Trame                              Adresses Physiques (MAC)     Identifier le prochain nœud (saut) sur la liaison locale.
  --------------- -------------------- ---------------------------------- ---------------------------- --------------------------------------------------------------------------

## 33.3 Couche Physique

La couche Physique, ou couche 1 du modèle OSI, constitue le fondement sur lequel repose toute communication réseau. Son domaine est celui de la physique et de l\'ingénierie électrique et optique. Elle est responsable de la tâche apparemment simple mais fondamentalement complexe de transmettre un flux de bits bruts d\'un point à un autre. Elle ne s\'intéresse pas à la signification de ces bits, mais aux moyens concrets de les faire voyager. Pour ce faire, elle doit définir la nature du support de transmission, les lois physiques qui en régissent les limites, et les techniques pour convertir les données numériques (une séquence abstraite de 0 et de 1) en signaux physiques (tensions, impulsions lumineuses, ondes radio) pouvant se propager sur ce support.

### 33.3.1 Médias de Transmission

Le média de transmission est le chemin physique sur lequel un signal se propage de l\'émetteur au récepteur. On distingue deux grandes catégories de médias : les médias guidés, où le signal est confiné dans un câble, et les médias non guidés, où le signal se propage librement dans l\'espace.

#### Médias Guidés

Dans les médias guidés, l\'énergie électromagnétique est canalisée le long d\'un conducteur physique, ce qui limite la dispersion du signal et le protège partiellement des interférences externes. Les trois principaux types de médias guidés sont la paire torsadée, le câble coaxial et la fibre optique.

La Paire Torsadée (Twisted Pair)

Ce type de câblage est le plus répandu dans les réseaux locaux (LAN) et la téléphonie. Il est constitué de deux fils de cuivre isolés, enroulés en hélice l\'un autour de l\'autre.40 Le but de cette torsion est crucial : les deux fils étant proches, ils sont soumis aux mêmes bruits et interférences électromagnétiques externes. En mesurant la différence de potentiel entre les deux fils au niveau du récepteur, le bruit, qui a affecté les deux fils de manière quasi identique, s\'annule en grande partie. C\'est un principe de réjection de mode commun. On distingue deux variantes principales :

> **Paire Torsadée Non Blindée (UTP - Unshielded Twisted Pair) :** C\'est le type de câble Ethernet le plus courant (par exemple, les câbles bleus connectés à nos ordinateurs). Il est composé de plusieurs paires (typiquement 4) regroupées dans une gaine en plastique. Il est peu coûteux et facile à installer, mais plus sensible aux interférences.
>
> **Paire Torsadée Blindée (STP - Shielded Twisted Pair) :** Chaque paire, ou l\'ensemble des paires, est enveloppée dans une feuille métallique (un blindage) qui offre une protection supplémentaire contre les interférences électromagnétiques. Ces câbles sont plus chers, plus rigides et sont utilisés dans des environnements électriquement bruyants (usines, proximité de moteurs, etc.).\
> \
> Les câbles à paires torsadées sont classés en catégories (Cat 5e, Cat 6, Cat 6a, etc.) qui définissent leurs performances en termes de bande passante et de débit de données maximal.

Le Câble Coaxial

Le câble coaxial est constitué d\'un conducteur central en cuivre, entouré d\'une couche d\'isolant, elle-même recouverte d\'un blindage métallique tressé, le tout protégé par une gaine extérieure.39 Cette structure \"co-axiale\" offre un excellent blindage contre les interférences, bien meilleur que celui de l\'UTP, ce qui lui permet de transporter des signaux de plus haute fréquence sur de plus longues distances.40 Historiquement, il fut le premier média utilisé pour Ethernet (normes 10BASE5 et 10BASE2). Aujourd\'hui, son usage principal est dans la distribution de la télévision par câble et pour fournir un accès Internet à haut débit via les réseaux câblés (technologie DOCSIS).40

La Fibre Optique

La fibre optique représente une rupture technologique par rapport aux câbles en cuivre. Au lieu de transmettre des signaux électriques, elle transmet des données sous forme d\'impulsions lumineuses.39 Une fibre optique est un fil de verre ou de plastique très fin, composé de deux parties principales :

> **Le cœur (Core) :** La partie centrale par laquelle la lumière se propage.
>
> La gaine (Cladding) : Une couche de matériau qui entoure le cœur et dont l\'indice de réfraction est légèrement inférieur à celui du cœur.\
> Cette différence d\'indice de réfraction permet le phénomène de réflexion totale interne. La lumière, injectée dans le cœur avec un certain angle, est constamment réfléchie par l\'interface cœur/gaine, ce qui la guide et la confine à l\'intérieur du cœur sur de très longues distances, même si la fibre est courbée.43\
> \
> Les avantages de la fibre optique sont immenses :
>
> **Bande passante et débit extrêmement élevés :** Capable de transporter des térabits de données par seconde.
>
> **Faible atténuation :** Le signal peut parcourir des dizaines, voire des centaines de kilomètres sans nécessiter de réamplification.
>
> **Immunité totale aux interférences électromagnétiques :** Étant donné qu\'elle transporte de la lumière et non un courant électrique, elle est insensible aux bruits électriques, ce qui la rend idéale pour les environnements industriels et garantit un signal très propre.
>
> **Sécurité :** Il est très difficile d\'intercepter un signal sur une fibre optique sans être détecté.

On distingue deux types de fibres :

> **Fibre multimode :** Avec un cœur plus large, elle permet à plusieurs modes (trajets) de lumière de se propager simultanément. Elle est moins chère mais la dispersion modale (les différents trajets n\'ont pas exactement la même longueur) limite sa portée et sa bande passante. Elle est utilisée pour les liaisons courtes (au sein d\'un bâtiment ou d\'un campus).
>
> **Fibre monomode :** Avec un cœur extrêmement fin, elle ne permet la propagation que d\'un seul mode de lumière. Cela élimine la dispersion modale, permettant des débits très élevés sur de très longues distances (liaisons sous-marines, dorsales Internet). Elle est plus coûteuse et nécessite des sources lumineuses de précision (lasers).

#### Médias Non Guidés

Les médias non guidés, ou communications sans fil (*wireless*), transmettent des signaux électromagnétiques à travers l\'air ou le vide, sans support physique pour les canaliser. La communication est assurée par des antennes qui convertissent les signaux électriques en ondes électromagnétiques (à l\'émission) et inversement (à la réception).

Ondes Radio

Les ondes radio couvrent une large partie du spectre électromagnétique (de 3 kHz à 1 GHz environ). Elles ont la capacité de traverser les obstacles (murs, bâtiments), ce qui les rend idéales pour les communications mobiles et intérieures. Elles sont omnidirectionnelles, ce qui signifie qu\'une antenne émet dans toutes les directions, facilitant la diffusion. C\'est la technologie utilisée pour la radio AM/FM, la télévision terrestre, et surtout pour les réseaux informatiques comme le Wi-Fi (normes IEEE 802.11) et le Bluetooth.40

Micro-ondes

Les micro-ondes (de 1 à 300 GHz) se propagent de manière plus directionnelle, en ligne de vue (line-of-sight). Les antennes d\'émission et de réception doivent être précisément alignées. Elles ne traversent pas bien les obstacles. Cette directivité permet de concentrer l\'énergie et d\'atteindre de plus longues distances avec moins de puissance. Elles sont utilisées pour :

> **Les liaisons terrestres point à point :** Pour relier des bâtiments ou des villes, en alternative à la fibre optique, notamment dans les zones où le déploiement de câbles est difficile.
>
> **Les communications par satellite :** Un satellite en orbite reçoit un signal d\'une station terrestre (liaison montante), l\'amplifie et le retransmet vers une autre zone géographique (liaison descendante).

Infrarouge

Les ondes infrarouges sont utilisées pour les communications à très courte distance et en ligne de vue, comme les télécommandes de télévision. Elles ne peuvent pas traverser les murs, ce qui est un avantage pour la sécurité (pas d\'interception depuis une pièce voisine) mais un inconvénient majeur pour la mise en réseau. Leur usage en réseaux informatiques est très limité.40

### 33.3.2 Limites Théoriques : Les Frontières de la Physique

La transmission de données n\'est pas infinie. Elle est contrainte par des lois physiques fondamentales qui définissent une capacité maximale pour tout canal de communication. Deux théorèmes, formulés par Harry Nyquist et Claude Shannon, sont au cœur de la théorie de l\'information et définissent ces limites.

#### Le Théorème de Nyquist pour un Canal sans Bruit

Le travail de Harry Nyquist, publié en 1928, a établi une relation fondamentale entre la **bande passante** d\'un canal et le **débit de signalisation** maximal possible. La bande passante, notée B et mesurée en Hertz (Hz), représente la plage de fréquences que le canal peut laisser passer sans atténuation excessive. Le débit de signalisation, ou rapidité de modulation (mesuré en bauds), correspond au nombre de fois par seconde que l\'état du signal peut changer pour représenter un symbole.

Le théorème de Nyquist stipule que pour un canal sans bruit avec une bande passante B, le débit de signalisation maximal est de 2B bauds. Tenter de changer le signal plus rapidement que cela entraînerait un phénomène appelé **interférence inter-symboles**, où les symboles se \"bavent\" les uns sur les autres, rendant leur décodage impossible par le récepteur.

Si chaque symbole peut représenter un parmi M niveaux de tension (ou de phase, etc.) distincts, alors chaque symbole transporte log2​M bits d\'information. En combinant ces deux idées, on obtient la formule de Nyquist pour le débit binaire maximal (C, pour Capacité) sur un canal sans bruit :

C=2Blog2​M

Cette équation nous apprend que pour augmenter le débit sur un canal sans bruit, on peut soit augmenter la bande passante (B), soit augmenter le nombre de niveaux de signalisation (M). Cependant, dans le monde réel, augmenter M indéfiniment est impossible, car les canaux ne sont jamais exempts de bruit.

#### Le Théorème de la Capacité de Shannon pour un Canal Bruité

Claude Shannon, dans son article fondateur de 1948, a révolutionné notre compréhension de la communication en introduisant le concept de bruit. Le bruit est un signal aléatoire et indésirable qui se superpose au signal utile, rendant plus difficile pour le récepteur de distinguer les différents niveaux de signalisation. Shannon a démontré qu\'il existe une limite théorique absolue au débit d\'information qui peut être transmis de manière fiable (c\'est-à-dire avec un taux d\'erreur arbitrairement faible) sur un canal bruité.

Cette limite, connue sous le nom de **capacité du canal de Shannon**, est donnée par la célèbre formule :

C=Blog2​(1+NS​)

Où :

> C est la capacité du canal en bits par seconde (bit/s).
>
> B est la bande passante du canal en Hertz (Hz).
>
> S est la puissance moyenne du signal.
>
> N est la puissance moyenne du bruit dans le canal.
>
> Le rapport S/N est le **rapport signal/bruit** (SNR - Signal-to-Noise Ratio), une mesure de la \"propreté\" du signal.

Le théorème de Shannon est d\'une portée considérable. Il affirme que si l\'on tente de transmettre des données à un débit R\>C, il est mathématiquement impossible de le faire sans un certain nombre d\'erreurs. En revanche, si l\'on transmet à un débit R\<C, il existe (théoriquement) un système de codage qui permet de réduire le taux d\'erreur à un niveau aussi bas que souhaité. Ce théorème ne dit pas

*comment* atteindre cette capacité, mais il fixe une limite infranchissable, un objectif pour tous les ingénieurs en communication.

La relation entre les théorèmes de Nyquist et de Shannon est profonde. La formule de Nyquist (C=2Blog2​M) semble suggérer qu\'on peut augmenter le débit à l\'infini en augmentant le nombre de niveaux M. La formule de Shannon (C=Blog2​(1+S/N)) nous montre la contrainte du monde réel : le bruit. Le rapport S/N limite le nombre de niveaux M que le récepteur peut distinguer de manière fiable. Un S/N élevé permet d\'utiliser un grand nombre de niveaux M distincts, tandis qu\'un S/N faible contraint à n\'utiliser que quelques niveaux très espacés pour éviter la confusion. Ainsi, le terme log2​(1+S/N) de Shannon peut être vu comme le \"plafond\" théorique du terme 2log2​M de Nyquist dans un environnement bruité. Pour augmenter la capacité d\'un canal, les ingénieurs disposent de trois leviers : augmenter la bande passante (B), augmenter la puissance du signal (S), ou réduire le bruit (N).

### 33.3.3 Modulation et Codage : Donner Forme aux Bits

Les données numériques dans un ordinateur existent sous forme de tensions continues représentant des 0 et des 1. Pour les transmettre sur un média physique, ces données doivent être converties en un signal adapté aux caractéristiques de ce média. Ce processus de conversion est au cœur de la couche physique et se divise en deux grandes techniques : le codage en ligne et la modulation.

#### Codage en Ligne (Line Coding)

Le codage en ligne est utilisé pour la transmission en **bande de base**, c\'est-à-dire lorsque le signal numérique est directement appliqué au média, sans être transposé sur une fréquence porteuse. C\'est le cas typique des liaisons filaires comme Ethernet. Le défi est de trouver un codage qui résout plusieurs problèmes :

> **Composante continue (DC Component) :** De longues suites de 0 ou de 1 peuvent créer un niveau de tension constant, ce que de nombreux systèmes de transmission gèrent mal.
>
> **Synchronisation :** Le récepteur doit savoir précisément à quel moment échantillonner le signal pour lire chaque bit. Si l\'horloge du récepteur dérive par rapport à celle de l\'émetteur, des erreurs se produiront.

Plusieurs schémas de codage existent :

> **NRZ (Non-Return-to-Zero) :** Le schéma le plus simple. Un niveau de tension (par exemple, +V) représente un 1, et un autre niveau (-V) représente un 0. Il est simple mais souffre des deux problèmes cités : une longue suite de bits identiques crée une composante continue et ne fournit aucune transition pour la synchronisation de l\'horloge.
>
> **Codage Manchester :** Ce codage, utilisé dans les premières versions d\'Ethernet (10 Mbit/s), résout les deux problèmes. Chaque bit est codé par une transition de tension au milieu de l\'intervalle de temps du bit. Par exemple, un 0 peut être codé par une transition de haut en bas, et un 1 par une transition de bas en haut. La présence d\'une transition à chaque bit garantit l\'absence de composante continue et fournit un signal d\'horloge robuste pour la synchronisation. Le coût de ces avantages est une occupation spectrale double : pour transmettre à un débit de\
> R bit/s, il faut une bande passante équivalente à un signal NRZ de 2R bit/s.

#### Modulation

La modulation est utilisée pour la transmission en **bande passante** (ou *passband*), typique des communications sans fil ou des modems sur ligne téléphonique. Le principe est d\'utiliser le signal numérique pour modifier (moduler) les caractéristiques d\'une onde sinusoïdale de haute fréquence, appelée **porteuse**. La porteuse, dont la fréquence est adaptée au canal de transmission, sert de véhicule pour les données. Les trois caractéristiques de base de la porteuse qui peuvent être modulées sont son amplitude, sa fréquence et sa phase.

> **Modulation par Déplacement d\'Amplitude (ASK - Amplitude-Shift Keying) :** L\'amplitude de la porteuse est modifiée pour représenter les bits. Par exemple, une amplitude A pour un 1, et une amplitude 0 pour un 0. C\'est une technique simple mais très sensible au bruit.
>
> **Modulation par Déplacement de Fréquence (FSK - Frequency-Shift Keying) :** La fréquence de la porteuse est modifiée. Par exemple, une fréquence f1​ pour un 1, et une fréquence f2​ pour un 0. Cette technique est plus robuste au bruit que l\'ASK.
>
> **Modulation par Déplacement de Phase (PSK - Phase-Shift Keying) :** La phase de la porteuse est modifiée. Dans sa forme la plus simple, la **BPSK** (Binary PSK), on utilise deux phases (par exemple, 0° pour un 1 et 180° pour un 0) pour coder 1 bit par symbole. En utilisant quatre phases (0°, 90°, 180°, 270°), la **QPSK** (Quadrature PSK) peut coder 2 bits par symbole, doublant ainsi le débit binaire pour une même rapidité de modulation.

Pour atteindre des débits encore plus élevés, les techniques modernes combinent la modulation d\'amplitude et de phase.

> **Modulation d\'Amplitude en Quadrature (QAM - Quadrature Amplitude Modulation) :** Cette technique puissante module simultanément l\'amplitude et la phase de la porteuse pour créer un grand nombre de symboles distincts. Une configuration **16-QAM**, par exemple, utilise 16 combinaisons distinctes d\'amplitude et de phase, permettant de coder 4 bits par symbole (log2​16=4). Les configurations 64-QAM, 256-QAM et même 1024-QAM sont couramment utilisées dans les normes Wi-Fi modernes (802.11ac, 802.11ax) et les modems câbles pour atteindre des débits de plusieurs centaines de Mbit/s, voire des Gbit/s.

On visualise ces schémas de modulation complexes à l\'aide de **diagrammes de constellation**, où chaque symbole est représenté par un point dans un plan à deux dimensions (phase et amplitude). Plus il y a de points dans la constellation (plus M est grand), plus le débit binaire est élevé, mais plus les points sont proches les uns des autres. Cela exige un rapport signal/bruit (S/N) plus élevé pour que le récepteur puisse les distinguer sans erreur, illustrant parfaitement le compromis entre le débit et la robustesse dicté par le théorème de Shannon.

## 33.4 Couche Liaison de Données

Si la couche Physique fournit les moyens de transmettre des bits, elle le fait sans aucune garantie. Le flux de bits qu\'elle délivre peut être corrompu par le bruit, et il n\'offre aucune structure pour délimiter les messages. Le rôle fondamental de la couche Liaison de Données, ou couche 2 du modèle OSI, est de prendre ce service brut et de le transformer en une liaison de communication qui apparaît comme fiable et bien structurée pour la couche Réseau. Son champ d\'action est local : elle s\'occupe de la transmission des données entre deux machines

*directement connectées* sur le même support physique, c\'est-à-dire sur un même \"saut\" ou \"lien\" réseau. Pour accomplir cette tâche, elle assume trois responsabilités majeures : le tramage des données, la détection (et parfois la correction) des erreurs, et le contrôle de l\'accès au média de transmission.

L\'IEEE a subdivisé la couche 2 en deux sous-couches distinctes pour mieux organiser ses fonctions :

> **LLC (Logical Link Control) :** La sous-couche supérieure, qui sert d\'interface avec la couche Réseau et est responsable du contrôle d\'erreur et du contrôle de flux.
>
> **MAC (Media Access Control) :** La sous-couche inférieure, qui gère l\'adressage physique et la discipline d\'accès au média partagé.

### 33.4.1 Tramage et Contrôle d\'Erreurs

#### Tramage (Framing)

La première tâche de la couche 2 est d\'imposer une structure au flux de bits brut en le segmentant en unités discrètes appelées **trames** (frames). Le récepteur doit être capable d\'identifier sans ambiguïté le début et la fin de chaque trame pour pouvoir les traiter correctement. Plusieurs méthodes de tramage ont été développées.

> **Comptage de Caractères :** Une méthode simple où l\'en-tête de la trame contient un champ indiquant le nombre de caractères (octets) dans la trame. Le récepteur lit ce compte et sait combien de caractères lire. Son principal défaut est sa fragilité : si une erreur de transmission altère le champ de comptage, le récepteur perd la synchronisation et ne peut plus délimiter correctement les trames suivantes.
>
> **Bourrage d\'Octets (Byte Stuffing) :** Cette méthode utilise des octets spéciaux, appelés fanions (*flags*), pour marquer le début (par exemple, DLE STX) et la fin (par exemple, DLE ETX) de la trame. Pour éviter que ces séquences de fanions n\'apparaissent accidentellement dans les données utiles, un mécanisme de \"bourrage\" est utilisé : si l\'octet DLE apparaît dans les données, l\'émetteur insère un octet DLE supplémentaire juste après. Le récepteur, lorsqu\'il voit deux DLE consécutifs, en supprime un et continue le traitement.
>
> **Bourrage de Bits (Bit Stuffing) :** C\'est la méthode la plus courante et la plus robuste, utilisée par de nombreux protocoles comme HDLC et PPP. Elle fonctionne de manière similaire au bourrage d\'octets, mais au niveau du bit. Un motif de bits unique, le **fanion** (par exemple, 01111110), est utilisé pour délimiter les trames. Pour garantir que ce motif n\'apparaisse jamais dans les données, l\'émetteur applique une règle simple : après chaque séquence de cinq bits 1 consécutifs dans les données, il insère (bourre) un bit 0. Le récepteur applique la règle inverse : s\'il voit cinq 1 suivis d\'un 0, il supprime le 0. S\'il voit cinq 1 suivis d\'un 1 (formant 0111111\...), il sait qu\'il s\'agit soit d\'un fanion (si le bit suivant est un 0), soit d\'une erreur. Cette méthode permet de créer des trames de longueur arbitraire et de les délimiter de manière fiable.

#### Contrôle d\'Erreurs : La Vérification par Redondance Cyclique (CRC)

Les médias de transmission ne sont pas parfaits ; des interférences peuvent inverser des bits pendant la transmission. La couche 2 doit donc implémenter des mécanismes pour

**détecter** ces erreurs. La stratégie la plus courante est d\'ajouter de l\'information redondante à la trame, une somme de contrôle calculée par l\'émetteur. Le récepteur effectue le même calcul sur la trame reçue et compare son résultat avec la somme de contrôle reçue. S\'ils diffèrent, une erreur est détectée et la trame est généralement jetée.

La méthode de détection d\'erreurs la plus puissante et la plus utilisée dans les réseaux modernes est la **Vérification par Redondance Cyclique** (CRC - Cyclic Redundancy Check). Elle est basée sur la théorie des corps finis et l\'arithmétique polynomiale.

Principe Mathématique

Le CRC traite une trame de m bits comme les coefficients d\'un polynôme de degré m−1. Par exemple, la séquence de bits 1101 correspond au polynôme 1⋅x3+1⋅x2+0⋅x1+1⋅x0=x3+x2+1.59

L\'émetteur et le récepteur se mettent d\'accord à l\'avance sur un **polynôme générateur**, G(x), de degré r. Ce polynôme n\'est pas choisi au hasard ; les polynômes standards (comme celui utilisé pour le CRC-32 dans Ethernet) sont sélectionnés pour leurs propriétés mathématiques qui maximisent la probabilité de détecter les types d\'erreurs les plus courants, comme les erreurs sur un seul bit ou les erreurs en rafale (plusieurs bits consécutifs erronés).

Calcul du CRC par l\'Émetteur

Le but est de calculer une séquence de contrôle de r bits, appelée CRC, à ajouter à la fin du message de m bits, de sorte que la trame résultante de m+r bits soit exactement divisible (sans reste) par le polynôme générateur G(x). L\'algorithme est le suivant :

> **Ajout de zéros :** On prend le message original M(x) et on lui ajoute r bits à zéro à la fin. Cela équivaut à multiplier le polynôme M(x) par xr. Soit ce nouveau polynôme P(x)=xrM(x).
>
> **Division Polynomiale :** On effectue la division de P(x) par G(x). Cette division se fait en utilisant l\'arithmétique modulo 2, où l\'addition et la soustraction sont équivalentes à une opération OU exclusif (XOR) et il n\'y a pas de retenue ou d\'emprunt.
>
> **Obtention du Reste :** Le reste de cette division, R(x), est un polynôme de degré inférieur à r, correspondant à une séquence de r bits. Ce reste est le CRC.
>
> **Formation de la Trame :** L\'émetteur transmet la trame T(x)=P(x)−R(x) (ce qui, en arithmétique modulo 2, est équivalent à P(x)+R(x)). Cette trame T(x) est, par construction, parfaitement divisible par G(x).

**Vérification par le Récepteur**

> Le récepteur reçoit une trame, potentiellement altérée, T′(x).
>
> Il effectue la division de T′(x) par le même polynôme générateur G(x).
>
> Si le reste de la division est zéro, le récepteur conclut que la trame est valide (avec une très haute probabilité) et l\'accepte.
>
> Si le reste est non nul, le récepteur conclut qu\'une erreur de transmission s\'est produite et rejette la trame.

Exemple de Calcul

Supposons que le message à envoyer soit 110101 (M(x)=x5+x4+x2+1) et que le polynôme générateur soit 1011 (G(x)=x3+x+1). Le degré de G(x) est r=3.

> On ajoute 3 zéros au message : 110101000.
>
> On effectue la division binaire (XOR) de 110101000 par 1011 :\
> 110101000 \| 1011\
> \^ 1011 \|\-\-\-\-\-\--\
> \-\-\-\-\-\-- \| 111110\
> 01100\
> \^1011\
> \-\-\-\--\
> 01111\
> \^1011\
> \-\-\-\--\
> 01000\
> \^1011\
> \-\-\-\--\
> 00110\
> \^0000\
> \-\-\-\--\
> 01100\
> \^1011\
> \-\-\-\--\
> 0111 \<\-- Reste (CRC)
>
> Le CRC est 111.
>
> La trame transmise est le message original suivi du CRC : 110101111.

Le récepteur divisera 110101111 par 1011. S\'il n\'y a pas eu d\'erreur, le reste sera 000.

### 33.4.2 Contrôle d\'Accès au Média (MAC)

#### Le Problème du Canal Partagé

Dans de nombreuses configurations de réseau local, plusieurs stations (ordinateurs, serveurs) sont connectées à un même support de transmission physique. C\'est le cas des anciens réseaux Ethernet sur câble coaxial, des réseaux utilisant des concentrateurs (hubs), et de tous les réseaux sans fil (Wi-Fi). Ce type de support est appelé un **canal à diffusion** ou **média partagé**. Le problème qui se pose alors est simple : si deux stations tentent d\'émettre en même temps, leurs signaux vont se superposer sur le média, interférer et se brouiller mutuellement. Ce phénomène est appelé une **collision**. La trame résultante sera corrompue et inutilisable par les récepteurs.

Il est donc indispensable de disposer d\'un protocole pour coordonner l\'accès au canal partagé, une sorte de \"code de la route\" pour la transmission de données. C\'est le rôle de la sous-couche **MAC (Media Access Control)**. Les protocoles MAC définissent les règles que chaque station doit suivre pour décider quand elle a le droit de transmettre. On distingue plusieurs familles de protocoles MAC, mais la plus importante pour les réseaux locaux est celle des protocoles à accès aléatoire.

#### Protocoles à Accès Aléatoire : CSMA/CD

Les protocoles à accès aléatoire ne reposent pas sur une coordination centralisée ou un tour de parole strict. Chaque station est autonome et décide d\'émettre en fonction de l\'état du canal qu\'elle observe. Le protocole le plus emblématique de cette famille est le **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**, qui a été le pilier des réseaux Ethernet pendant des décennies. Pour comprendre son fonctionnement, il suffit de décomposer son nom.

> **Multiple Access (MA) :** \"Accès Multiple\". Cela signifie que plusieurs stations partagent le même média de communication et y ont accès.
>
> **Carrier Sense (CS) :** \"Écoute de la porteuse\". C\'est le principe du \"écouter avant de parler\". Avant de tenter d\'émettre une trame, une station \"écoute\" le canal pour détecter la présence d\'un signal (une \"porteuse\"). Si le canal est occupé (une autre station est en train d\'émettre), la station s\'abstient et attend que le canal redevienne libre.
>
> **Collision Detection (CD) :** \"Détection de Collision\". C\'est le principe du \"écouter pendant qu\'on parle\". L\'écoute du canal ne suffit pas toujours à éviter les collisions. En raison du délai de propagation du signal sur le câble, il est possible que deux stations, situées à des extrémités opposées du réseau, écoutent le canal, le trouvent libre simultanément, et commencent à émettre presque au même moment. Leurs trames entreront en collision quelque part entre les deux. La détection de collision signifie qu\'une station, pendant qu\'elle émet, continue de surveiller le signal sur le média. Si le signal qu\'elle détecte est différent de celui qu\'elle est en train d\'envoyer (par exemple, un niveau de tension plus élevé), elle en déduit qu\'une collision s\'est produite.

L\'Algorithme CSMA/CD en détail

Le processus suivi par une station désirant émettre est le suivant 69 :

> La station prépare sa trame.
>
> Elle écoute le canal (CS). Si le canal est occupé, elle attend qu\'il se libère.
>
> Une fois le canal libre, elle attend un court instant (appelé *Inter-Frame Gap*) puis commence à transmettre sa trame, bit par bit.
>
> Pendant toute la durée de sa transmission, elle continue d\'écouter le canal (CD).
>
> **Cas 1 : Transmission réussie.** Si la station termine la transmission de sa trame sans détecter de collision, la transmission est considérée comme un succès.
>
> Cas 2 : Collision détectée. Si, pendant sa transmission, la station détecte une collision :\
> a. Elle arrête immédiatement la transmission de sa trame.\
> b. Elle envoie un court signal de \"brouillage\" (jam signal) pour s\'assurer que toutes les autres stations impliquées dans la collision la détectent également.\
> c. Elle applique l\'algorithme de retrait exponentiel binaire (Binary Exponential Backoff). Elle choisit un nombre entier aléatoire k dans un intervalle \[0,2n−1\], où n est le nombre de collisions consécutives pour cette trame. Elle attend alors k×τ secondes, où τ est le \"temps de slot\" (le temps aller-retour maximal sur le réseau), avant de retourner à l\'étape 2 pour tenter une nouvelle transmission. L\'intervalle de temps aléatoire double à chaque nouvelle collision, ce qui réduit de manière exponentielle la probabilité que les mêmes stations entrent à nouveau en collision lors de la prochaine tentative.66

Un point d\'ingénierie crucial du CSMA/CD est la relation entre la taille minimale de la trame et la longueur maximale du réseau. Pour qu\'une station soit certaine de détecter une collision, elle doit encore être en train d\'émettre lorsque le signal de la collision la plus lointaine possible lui parvient. Ce temps de détection est au maximum le double du temps de propagation de bout en bout du réseau (le \"temps de slot\" τ). Cela impose une taille minimale pour les trames. Pour Ethernet à 10 Mbit/s, ce calcul a abouti à une taille de trame minimale de 64 octets.

Bien que très efficace, le CSMA/CD n\'est plus utilisé dans les réseaux Ethernet modernes qui utilisent des commutateurs en mode full-duplex. Cependant, son principe reste pertinent et a inspiré le protocole CSMA/CA (Collision Avoidance) utilisé dans les réseaux sans fil Wi-Fi.

### 33.4.3 Ethernet et Commutation LAN

Ethernet est, de loin, la technologie de réseau local (LAN) la plus dominante au monde. Développée dans les années 1970, elle a évolué de manière spectaculaire, passant de 10 Mbit/s sur un câble coaxial partagé à plus de 100 Gbit/s sur fibre optique, tout en conservant une compatibilité ascendante remarquable.

#### La Trame Ethernet

La structure de la trame Ethernet est la pierre angulaire de son fonctionnement. La version la plus courante aujourd\'hui est le format Ethernet II (ou DIX), qui est très similaire au format standardisé IEEE 802.3. Une trame Ethernet est composée des champs suivants :

> **Préambule et SFD (Start Frame Delimiter) :** Une séquence de 8 octets qui permet au récepteur de se synchroniser sur l\'horloge de l\'émetteur et d\'identifier le début de la trame.
>
> **Adresse MAC de Destination (6 octets) :** L\'adresse physique de la carte réseau (NIC) destinataire.
>
> **Adresse MAC Source (6 octets) :** L\'adresse physique de la carte réseau émettrice.
>
> **EtherType / Longueur (2 octets) :** Ce champ a un double usage. Si sa valeur est supérieure à 1536 (0x0600), il indique le protocole de couche 3 encapsulé dans la trame (par exemple, 0x0800 pour IPv4). Si elle est inférieure, elle indique la longueur de la charge utile, comme défini par la norme IEEE 802.3.
>
> **Charge Utile (Données) (46 à 1500 octets) :** Contient le paquet de la couche supérieure (par exemple, un paquet IP). Le remplissage (*padding*) est ajouté si les données sont inférieures à 46 octets pour garantir la taille minimale de la trame.
>
> **Séquence de Contrôle de Trame (FCS - Frame Check Sequence) (4 octets) :** Contient une valeur CRC-32 calculée sur l\'ensemble de la trame (des adresses à la charge utile) pour la détection d\'erreurs.

Les **adresses MAC** sont des identifiants uniques de 48 bits, assignés par le fabricant à chaque interface réseau dans le monde. Elles sont généralement représentées en format hexadécimal (ex: 00:1A:2B:3C:4D:5E). Elles sont fondamentales pour la livraison des trames au sein d\'un même réseau local.

#### La Commutation de Niveau 2

L\'évolution la plus significative d\'Ethernet a été le passage des médias partagés (avec hubs) aux réseaux commutés (avec commutateurs ou *switches*). Un **commutateur** est un appareil de niveau 2 qui a radicalement amélioré les performances et l\'efficacité des LANs. Contrairement à un hub, qui est un simple répéteur électrique de couche 1 et propage chaque bit reçu à tous ses ports, créant un large domaine de collision, un commutateur est un appareil intelligent qui prend des décisions de transfert basées sur les adresses MAC.

Le fonctionnement d\'un commutateur repose sur trois actions clés :

> **Apprentissage (Learning) :** Le commutateur construit dynamiquement une **table d\'adresses MAC** (parfois appelée table CAM). Pour ce faire, il examine l\'**adresse MAC source** de chaque trame entrante. Il enregistre cette adresse MAC et le port sur lequel la trame est arrivée. De cette manière, le commutateur \"apprend\" quels appareils sont connectés à quels ports.
>
> **Filtrage/Retransmission (Filtering/Forwarding) :** Lorsqu\'une trame arrive sur un port, le commutateur examine l\'**adresse MAC de destination**. Il consulte alors sa table d\'adresses MAC :

Si l\'adresse de destination est trouvée dans la table et est associée à un port *différent* de celui d\'arrivée, le commutateur retransmet (commute) la trame *uniquement* sur ce port de destination. Tout le reste du réseau est épargné par ce trafic.

Si l\'adresse de destination est associée au *même* port que celui d\'arrivée, cela signifie que les deux appareils sont sur le même segment de réseau (par exemple, connectés au même hub en aval), et le commutateur n\'a pas besoin de retransmettre la trame. Il la filtre (la jette).

Si l\'adresse de destination est inconnue (pas encore dans la table) ou s\'il s\'agit d\'une adresse de diffusion (*broadcast*, FF:FF:FF:FF:FF:FF), le commutateur diffuse la trame sur *tous* ses ports, à l\'exception de celui d\'où elle provient. C\'est le mécanisme par lequel les appareils se découvrent initialement.

Ce comportement intelligent a deux conséquences majeures : il **segmente les domaines de collision** (chaque port d\'un commutateur est son propre domaine de collision, éliminant pratiquement les collisions dans les réseaux modernes) et il **réduit le trafic inutile**, améliorant considérablement la bande passante disponible pour chaque appareil.

#### Les VLANs : Segmentation Logique du Réseau Local

À mesure que les réseaux locaux grandissaient, un nouveau problème est apparu : le trafic de diffusion (*broadcast*). Une trame de diffusion, envoyée par un appareil, est retransmise par les commutateurs à tous les autres appareils du réseau. Dans un grand réseau, ce trafic peut devenir excessif et dégrader les performances. La solution traditionnelle était de segmenter le réseau physiquement avec des routeurs, mais cela est coûteux et rigide.

Les **Réseaux Locaux Virtuels (VLANs)** offrent une solution plus élégante. Un VLAN est un mécanisme qui permet de diviser un réseau local physique (par exemple, un ou plusieurs commutateurs interconnectés) en plusieurs réseaux locaux logiques, complètement isolés les uns des autres au niveau 2. Les appareils placés dans des VLANs différents ne peuvent pas communiquer directement, même s\'ils sont branchés sur le même commutateur physique. Ils se comportent comme s\'ils étaient sur des réseaux physiquement distincts. Chaque VLAN constitue son propre

**domaine de diffusion**.

Les avantages des VLANs sont multiples :

> **Sécurité :** Isoler des groupes d\'utilisateurs ou de serveurs (par exemple, un VLAN pour les finances, un pour les ingénieurs). Un utilisateur malveillant dans un VLAN ne peut pas facilement accéder aux ressources d\'un autre VLAN.
>
> **Performance :** En confinant le trafic de diffusion à l\'intérieur de chaque VLAN, on réduit la charge globale sur le réseau.
>
> **Flexibilité et Gestion :** On peut regrouper des utilisateurs par fonction ou par projet, indépendamment de leur emplacement physique. Déplacer un utilisateur d\'un groupe à un autre devient une simple modification de la configuration logicielle du commutateur, sans avoir à rebrancher de câbles.

Mécanisme : Le Tagging IEEE 802.1Q

Pour qu\'un VLAN puisse s\'étendre sur plusieurs commutateurs, il faut un moyen pour que les trames conservent leur identité de VLAN lorsqu\'elles voyagent entre les commutateurs. C\'est le rôle du protocole IEEE 802.1Q.

Ce protocole définit l\'ajout d\'une balise (tag) de 4 octets à l\'intérieur de la trame Ethernet, entre l\'adresse MAC source et le champ EtherType.77 Cette balise contient plusieurs informations, dont la plus importante est le

**VID (VLAN Identifier)**, un numéro de 12 bits qui identifie le VLAN auquel la trame appartient (permettant jusqu\'à 4094 VLANs).

On distingue deux types de ports sur un commutateur configuré avec des VLANs :

> **Port d\'Accès (Access Port) :** Un port configuré pour appartenir à un seul VLAN. Les appareils finaux (ordinateurs, imprimantes) y sont connectés. Les trames qui entrent et sortent de ce port sont des trames Ethernet standard, non balisées. C\'est le commutateur qui se charge d\'ajouter la balise 802.1Q lorsque la trame doit être envoyée sur un lien trunk.
>
> **Port d\'Agrégation (Trunk Port) :** Un port conçu pour transporter le trafic de *plusieurs* VLANs simultanément, typiquement sur une liaison entre deux commutateurs. Les trames qui circulent sur un lien trunk sont balisées avec leur VID, afin que le commutateur récepteur sache à quel VLAN la trame est destinée. Le concept de\
> **VLAN natif** désigne un VLAN spécifique dont le trafic est autorisé à traverser le lien trunk sans être balisé.

En résumé, les VLANs, rendus possibles par le standard 802.1Q, permettent une segmentation logique puissante des réseaux locaux, offrant des gains substantiels en matière de sécurité, de performance et de flexibilité administrative, et constituent un outil fondamental dans la conception des réseaux d\'entreprise modernes.

