# Chapitre I.34 : Protocoles Réseau et Internetworking

L\'Internet, cette infrastructure planétaire qui sous-tend une part croissante de l\'activité humaine, peut sembler d\'une complexité insondable. Pourtant, sa robustesse et sa capacité à évoluer reposent sur un ensemble de principes architecturaux d\'une élégance remarquable, incarnés par la suite de protocoles TCP/IP. Ce chapitre se propose de disséquer le cœur de cette architecture, en se concentrant sur les deux couches qui en constituent la fondation logique : la couche Réseau et la couche Transport.

Le génie de la conception de l\'Internet réside dans sa philosophie de la séparation des préoccupations, matérialisée par un modèle en couches. Chaque couche fournit un service spécifique à la couche supérieure, tout en masquant les détails de sa propre implémentation. Ce principe d\'abstraction permet à des technologies radicalement différentes de coexister et d\'interopérer. Au cœur de ce modèle, la couche Réseau, incarnée par le protocole IP (Internet Protocol), assume une tâche unique mais fondamentale : fournir un service de livraison de paquets \"au mieux\" (*best-effort*) à travers une interconnexion de réseaux hétérogènes. Son rôle est celui d\'un service postal universel qui ne garantit ni le délai, ni l\'ordre, ni même la livraison des lettres, mais qui sait comment les acheminer d\'une adresse à une autre, n\'importe où dans le monde. C\'est cette simplicité qui lui confère sa puissance et sa capacité à passer à l\'échelle.

Cependant, les applications que nous utilisons quotidiennement --- navigation web, courriel, transfert de fichiers --- exigent bien plus qu\'un simple service postal. Elles nécessitent la certitude que les données arriveront intactes, dans le bon ordre et sans être submergées par un flot trop rapide. C\'est ici qu\'intervient la couche Transport. Agissant comme un pont entre le service réseau non fiable et les besoins des applications, elle construit, à partir du chaos potentiel d\'IP, des services de communication fiables et ordonnés. C\'est la couche qui, par les mécanismes ingénieux de protocoles comme TCP (Transmission Control Protocol), transforme le service postal de base en un service de courrier recommandé, avec accusé de réception, suivi et contrôle du flux.

Cette architecture est guidée par un principe fondateur connu sous le nom de \"principe de bout en bout\" (*end-to-end principle*). L\'idée centrale est de maintenir le cœur du réseau --- les routeurs IP --- aussi simple et rapide que possible, en déportant l\'intelligence et la complexité (gestion des erreurs, ordonnancement, contrôle de flux) vers les extrémités du réseau, c\'est-à-dire dans les machines des utilisateurs finaux via la couche Transport. Ce chapitre explorera en profondeur comment ce principe est à la fois la clé de la scalabilité phénoménale de l\'Internet et la source de défis constants, notamment face à l\'émergence de mécanismes comme la traduction d\'adresses réseau (NAT) qui, par nécessité, viennent le contrevenir. En disséquant les protocoles de ces deux couches, nous ne ferons pas que décrire des normes techniques ; nous analyserons une étude de cas monumentale sur la puissance et les tensions inhérentes à l\'un des principes de conception les plus influents de l\'histoire de l\'informatique.

## 34.1 Couche Réseau

La couche Réseau, ou couche 3 du modèle OSI, est le pivot de l\'internetworking. Sa mission est de permettre l\'interconnexion de réseaux multiples et hétérogènes pour former un réseau global unique et cohérent : l\'Internet. Pour ce faire, elle doit résoudre deux problèmes fondamentaux : comment identifier de manière unique chaque machine connectée (l\'adressage) et comment déterminer le meilleur chemin pour acheminer les données d\'une machine à une autre (le routage). Le protocole IP est la pierre angulaire de cette couche, fournissant un service de datagrammes sans connexion qui unifie des technologies de liaison de données aussi diverses que l\'Ethernet, le Wi-Fi ou la fibre optique.

### 34.1.1 Adressage IP (IPv4, IPv6) et Sous-réseaux

L\'adressage est le fondement de toute communication réseau. Sans un système permettant d\'identifier de manière unique et non ambiguë chaque expéditeur et chaque destinataire, aucun acheminement de données ne serait possible. Le protocole Internet a évolué à travers deux versions majeures de son système d\'adressage, IPv4 et IPv6, chacune reflétant les contraintes et les ambitions de son époque.

#### L\'adressage par classes (Classful Addressing) : Un système historique

Aux débuts de l\'Internet, l\'adressage IPv4, défini par des nombres de 32 bits, fut organisé selon un système de classes. Une adresse IPv4 est traditionnellement représentée par quatre nombres décimaux séparés par des points, chaque nombre représentant un octet (8 bits) de l\'adresse. Le système de classes divisait l\'espace d\'adressage en fonction de la valeur du premier octet, déterminant ainsi une frontière fixe entre la partie de l\'adresse identifiant le réseau (

*network ID*) et la partie identifiant la machine (*host ID*) au sein de ce réseau.

Il existait principalement trois classes d\'adresses unicast :

> **Classe A :** Le premier octet était compris entre 1 et 126. Le premier octet identifiait le réseau, et les trois derniers octets identifiaient les hôtes. Cela permettait d\'avoir un petit nombre de réseaux (126) mais un très grand nombre d\'hôtes par réseau (plus de 16 millions, soit 224−2). Le masque de sous-réseau par défaut était\
> 255.0.0.0, ou /8 en notation moderne.
>
> **Classe B :** Le premier octet était compris entre 128 et 191. Les deux premiers octets identifiaient le réseau, et les deux derniers les hôtes. Cela créait environ 16 000 réseaux, chacun pouvant accueillir jusqu\'à 65 534 hôtes (216−2). Le masque par défaut était\
> 255.255.0.0 (/16).
>
> **Classe C :** Le premier octet était compris entre 192 et 223. Les trois premiers octets identifiaient le réseau, et le dernier octet les hôtes. Cela permettait d\'avoir plus de 2 millions de réseaux, mais chacun était limité à 254 hôtes (28−2). Le masque par défaut était\
> 255.255.255.0 (/24).

Ce système rigide, bien que simple à comprendre, a rapidement montré ses limites face à la croissance exponentielle de l\'Internet. Il engendrait deux problèmes majeurs :

> **Le gaspillage d\'adresses :** L\'allocation était inefficace. Une organisation nécessitant 500 adresses se voyait contrainte de demander un bloc de classe B, gaspillant ainsi plus de 65 000 adresses. Attribuer un bloc de classe C était insuffisant. Ce manque de granularité a conduit à un épuisement rapide des blocs de classe B, les plus demandés.
>
> **L\'explosion des tables de routage :** Chaque réseau de classe alloué, où qu\'il soit dans le monde, nécessitait une entrée distincte dans les tables de routage des routeurs de la dorsale Internet. La croissance du nombre de réseaux menaçait de saturer la mémoire et la capacité de traitement de ces routeurs, mettant en péril la stabilité de l\'Internet tout entier.

#### Le CIDR (Classless Inter-Domain Routing) : La flexibilité pour survivre

Au début des années 1990, il est devenu évident que le système de classes n\'était pas viable à long terme. La solution fut l\'introduction du **Classless Inter-Domain Routing (CIDR)**, une innovation qui a sauvé IPv4 d\'un épuisement prématuré et qui régit l\'adressage IP encore aujourd\'hui. L\'idée fondamentale du CIDR est de rompre le lien rigide entre la valeur d\'une adresse et son masque de réseau.

Avec le CIDR, la frontière entre la partie réseau et la partie hôte n\'est plus déterminée par la classe, mais par un préfixe de longueur explicite, noté avec une barre oblique suivie du nombre de bits consacrés à la partie réseau (par exemple, /24). Une adresse IP est désormais un couple : l\'adresse elle-même et son préfixe de longueur. Par exemple,

192.0.2.0/24 indique que les 24 premiers bits (192.0.2) identifient le réseau, et les 8 bits restants identifient les hôtes.

Cette approche a transformé l\'adresse IP d\'un identifiant à structure fixe en un identifiant à structure flexible. La signification d\'une adresse ne peut plus être déduite de sa seule valeur ; elle dépend intrinsèquement de son masque. C\'est un changement de paradigme fondamental. Avant le CIDR, en voyant une adresse comme 140.25.x.x, un administrateur savait immédiatement qu\'il s\'agissait d\'un réseau de classe B avec un masque /16. Avec le CIDR, une adresse comme 200.50.10.1 ne révèle rien sur la taille de son réseau sans son préfixe. Elle pourrait appartenir au réseau 200.50.10.0/24 ou au réseau plus large 200.50.0.0/20.

Cette flexibilité a apporté deux avantages cruciaux :

> **Allocation efficace des adresses :** Les registres Internet (comme les RIR) pouvaient désormais allouer des blocs d\'adresses de taille appropriée aux besoins réels. Une organisation nécessitant 1000 adresses pouvait recevoir un bloc /22 (1024 adresses), au lieu d\'un bloc de classe B entier.
>
> **Agrégation de routes (Supernetting) :** Le CIDR a permis de résoudre le problème de l\'explosion des tables de routage. Un fournisseur d\'accès Internet (FAI) qui reçoit un grand bloc, par exemple 204.10.0.0/16, peut le subdiviser et l\'allouer à ses clients (par exemple, 204.10.1.0/24, 204.10.2.0/24, etc.). Cependant, vis-à-vis du reste de l\'Internet, le FAI n\'annonce qu\'une seule route : 204.10.0.0/16. Cette capacité à agréger des milliers de routes clients en une seule annonce a permis de maîtriser la croissance des tables de routage mondiales et d\'assurer la scalabilité de l\'Internet.

L\'introduction du CIDR peut être comprise non pas comme une évolution planifiée, mais comme une mesure de survie réactive et ingénieuse. Face à une croissance exponentielle imprévue, la communauté technique a modifié la *sémantique* de l\'adresse IP sans en changer la *syntaxe* de 32 bits, prolongeant ainsi sa durée de vie de plusieurs décennies.

#### Le Masque de Sous-Réseau à Longueur Variable (VLSM) et le calcul de sous-réseaux

Le CIDR est une technique de routage inter-domaine, mais le principe qui le sous-tend, le **Variable Length Subnet Masking (VLSM)**, est également utilisé au sein des réseaux d\'entreprise pour optimiser l\'allocation d\'adresses. Le VLSM permet de diviser un bloc d\'adresses en sous-réseaux de tailles différentes, adaptées aux besoins de chaque segment du réseau.

Le calcul de sous-réseaux est une compétence fondamentale pour tout ingénieur réseau. Il repose sur le principe d\'\"emprunter\" des bits de la partie hôte de l\'adresse pour créer des identifiants de sous-réseau. Chaque bit emprunté double le nombre de sous-réseaux possibles, tout en divisant par deux le nombre d\'hôtes par sous-réseau.

La formule générale est la suivante :

> Nombre de sous-réseaux créés = 2n, où n est le nombre de bits empruntés.
>
> Nombre d\'hôtes par sous-réseau = 2h−2, où h est le nombre de bits restants pour les hôtes. On soustrait 2 car chaque sous-réseau a une adresse de réseau (tous les bits hôte à 0) et une adresse de diffusion (tous les bits hôte à 1) qui ne peuvent être assignées à une machine.

**Exemple 1 : Découpage simple**

Considérons une entreprise qui dispose du réseau 192.168.10.0/24. Elle souhaite le diviser en 8 sous-réseaux pour ses différents départements.

> **Déterminer le nombre de bits à emprunter :** Pour créer 8 sous-réseaux, nous avons besoin de n bits tels que 2n≥8. La solution est n=3 (23=8).
>
> **Calculer le nouveau masque :** Le masque original est /24 (24 bits pour le réseau). Nous empruntons 3 bits à la partie hôte. Le nouveau masque sera donc /24+3=/27.

Masque original (/24) : 11111111.11111111.11111111.00000000 (255.255.255.0)

Nouveau masque (/27) : 11111111.11111111.11111111.11100000 (255.255.255.224)

> **Calculer le nombre d\'hôtes :** Le masque /27 laisse 32−27=5 bits pour la partie hôte. Le nombre d\'hôtes par sous-réseau est donc 25−2=32−2=30.
>
> **Lister les sous-réseaux :** Les 3 bits empruntés dans le quatrième octet peuvent prendre 8 valeurs (de 000 à 111). La taille de chaque sous-réseau (le \"nombre magique\") est 25=32. On peut donc trouver les adresses de réseau en incrémentant de 32.

Sous-réseau 0 : 192.168.10.0/27 (plage hôtes : .1 à .30, diffusion : .31)

Sous-réseau 1 : 192.168.10.32/27 (plage hôtes : .33 à .62, diffusion : .63)

Sous-réseau 2 : 192.168.10.64/27 (plage hôtes : .65 à .94, diffusion : .95)

\...

Sous-réseau 7 : 192.168.10.224/27 (plage hôtes : .225 à .254, diffusion : .255)

**Exemple 2 : Découpage avancé avec VLSM**

Imaginons maintenant une entreprise qui a reçu le bloc 172.20.0.0/22 et a les besoins suivants :

> Réseau A : 400 hôtes
>
> Réseau B : 100 hôtes
>
> Réseau C : 50 hôtes
>
> Réseau D : 10 liaisons point à point (2 hôtes par liaison)

Le bloc /22 (255.255.252.0) nous donne 32−22=10 bits pour les hôtes, soit 210=1024 adresses, allant de 172.20.0.0 à 172.20.3.255.

> **Trier les besoins par ordre décroissant :** C\'est la meilleure pratique pour allouer les blocs de manière contiguë.

Réseau A (400 hôtes)

Réseau B (100 hôtes)

Réseau C (50 hôtes)

10 x Réseaux D (2 hôtes)

> **Allouer le Réseau A (400 hôtes) :**

Nous avons besoin de h bits tels que 2h−2≥400. 28=256 (insuffisant), 29=512 (suffisant). Il nous faut donc 9 bits pour les hôtes.

Le masque sera de 32−9=/23.

Allocation : 172.20.0.0/23. Ce bloc utilise les adresses de 172.20.0.0 à 172.20.1.255.

> **Allouer le Réseau B (100 hôtes) :**

Nous avons besoin de h bits tels que 2h−2≥100. 26=64 (insuffisant), 27=128 (suffisant). Il nous faut 7 bits pour les hôtes.

Le masque sera de 32−7=/25.

Le bloc précédent se termine à 172.20.1.255. Le prochain bloc disponible commence à 172.20.2.0.

Allocation : 172.20.2.0/25. Ce bloc utilise les adresses de 172.20.2.0 à 172.20.2.127.

> **Allouer le Réseau C (50 hôtes) :**

Nous avons besoin de h bits tels que 2h−2≥50. 25=32 (insuffisant), 26=64 (suffisant). Il nous faut 6 bits pour les hôtes.

Le masque sera de 32−6=/26.

Le prochain bloc disponible commence à 172.20.2.128.

Allocation : 172.20.2.128/26. Ce bloc utilise les adresses de 172.20.2.128 à 172.20.2.191.

> **Allouer les 10 Réseaux D (2 hôtes) :**

Pour une liaison point à point, nous avons besoin de 2 adresses hôtes. 2h−2≥2 donne h=2.

Le masque sera de 32−2=/30. Chaque sous-réseau /30 fournit 4 adresses au total (1 pour le réseau, 1 pour la diffusion, 2 pour les hôtes).

Le prochain bloc disponible commence à 172.20.2.192.

Allocation 1 : 172.20.2.192/30

Allocation 2 : 172.20.2.196/30

\... et ainsi de suite jusqu\'à la dixième liaison.

Cette approche VLSM permet une utilisation extrêmement efficace de l\'espace d\'adressage, en adaptant la taille de chaque sous-réseau aux besoins réels.

#### L\'Adressage IPv6 : Une conception pour le futur

Même avec les optimisations du CIDR et les palliatifs comme le NAT, l\'épuisement de l\'espace d\'adressage IPv4 était inéluctable. L\'Internet des Objets (IoT), connectant des milliards de nouveaux appareils, a rendu cette transition encore plus urgente. IPv6 n\'est pas une simple extension d\'IPv4 ; il s\'agit d\'une refonte conçue pour répondre aux besoins d\'un Internet à l\'échelle planétaire pour les décennies à venir.

Contrairement à l\'approche réactive qui a caractérisé l\'évolution d\'IPv4, IPv6 représente une tentative de conception proactive, anticipant les besoins futurs plutôt que de simplement corriger les défauts du passé. Son adoption, bien que progressive, témoigne de l\'inertie colossale d\'une infrastructure mondiale et de l\'efficacité, malgré leurs défauts, des solutions de contournement d\'IPv4.

**Structure de l\'adresse IPv6**

La caractéristique la plus frappante d\'IPv6 est la taille de son adresse : 128 bits, contre 32 pour IPv4. Cela offre un espace d\'adressage de 2128, soit environ 3.4×1038 adresses --- un nombre si astronomique qu\'il est souvent décrit comme suffisant pour assigner une adresse unique à chaque atome à la surface de la Terre.

Une adresse IPv6 est représentée par huit groupes de 16 bits, écrits en hexadécimal et séparés par des deux-points. Par exemple :

2001:0db8:85a3:0000:0000:8a2e:0370:7334.

Pour simplifier cette notation, deux règles de compression peuvent être appliquées :

> **Omission des zéros de tête :** Dans chaque groupe de 16 bits, les zéros non significatifs peuvent être omis. 0db8 devient db8, 0000 devient 0.
>
> **Compression des zéros consécutifs :** Une seule séquence continue de groupes de zéros peut être remplacée par un double deux-points (::).

En appliquant ces règles, l\'adresse précédente devient : 2001:db8:85a3::8a2e:370:7334.

**En-tête de paquet simplifié**

L\'une des améliorations les plus significatives d\'IPv6 est la simplification de son en-tête de paquet. Les concepteurs ont cherché à optimiser le traitement des paquets par les routeurs en réduisant le nombre de champs et en fixant la taille de l\'en-tête.

  ------------------------------------------------ -------------------------------------------- ----------------------------------------- ----------------------------------------------------------------------------------------------------
  Champ                                            Description (IPv4)                           Description (IPv6)                        Commentaire

  Version                                          4 bits, valeur 4                             4 bits, valeur 6                          Inchangé

  Longueur en-tête (IHL)                           4 bits, taille de l\'en-tête (variable)      (Supprimé)                                L\'en-tête IPv6 a une taille fixe de 40 octets

  Type de Service (ToS)                            8 bits, pour la qualité de service (QoS)     Classe de Trafic (8 bits)                 Renommé, mais fonctionnellement similaire (DiffServ)

  Longueur Totale                                  16 bits, taille totale du paquet             Longueur de la Charge Utile (16 bits)     Ne mesure que la charge utile, pas l\'en-tête

  Identification, Drapeaux, Décalage de Fragment   32 bits, pour la fragmentation               (Supprimé)                                La fragmentation est gérée par les hôtes via des en-têtes d\'extension, pas par les routeurs

  Durée de Vie (TTL)                               8 bits, décrémenté à chaque saut             Limite de Sauts (Hop Limit)               Renommé, même fonction

  Protocole                                        8 bits, identifie le protocole de couche 4   En-tête Suivant (Next Header)             Identifie le protocole de couche 4 ou le prochain en-tête d\'extension

  Somme de Contrôle de l\'En-tête                  16 bits, pour la vérification d\'erreur      (Supprimé)                                Accélère le traitement par les routeurs ; la vérification d\'erreur est laissée aux couches 2 et 4

  Adresse Source                                   32 bits                                      128 bits                                  Taille augmentée

  Adresse Destination                              32 bits                                      128 bits                                  Taille augmentée

  Options                                          Variable (jusqu\'à 40 octets)                En-têtes d\'Extension                     Standardisé et plus flexible

  (Nouveau)                                        N/A                                          Étiquette de Flux (Flow Label, 20 bits)   Permet d\'identifier des paquets appartenant à un même flux pour un traitement spécialisé

  ------------------------------------------------ -------------------------------------------- ----------------------------------------- ----------------------------------------------------------------------------------------------------

*Tableau 34.1 : Comparaison des en-têtes IPv4 et IPv6*

Ce tableau synthétise la philosophie de conception d\'IPv6 : simplifier l\'en-tête de base pour accélérer le traitement par les routeurs (suppression de la somme de contrôle, taille fixe, pas de fragmentation) et déplacer la complexité optionnelle dans des en-têtes d\'extension bien définis.

**Avantages et types d\'adresses**

Au-delà de l\'espace d\'adressage, IPv6 introduit plusieurs améliorations fondamentales :

> **Autoconfiguration sans état (SLAAC) :** Un appareil peut générer sa propre adresse IPv6 globale unique sans avoir besoin d\'un serveur DHCP. Il utilise le préfixe réseau annoncé par le routeur local (via un message *Router Advertisement*) et combine cela avec un identifiant d\'interface, souvent dérivé de son adresse MAC via le format EUI-64.
>
> **Suppression du Broadcast :** Les diffusions (*broadcasts*), qui inondent tous les hôtes d\'un segment réseau, sont remplacées par un usage plus intelligent du *multicast*, où les paquets ne sont envoyés qu\'à un groupe d\'hôtes intéressés.
>
> **Sécurité et Mobilité natives :** IPsec, la suite de protocoles pour la sécurité des communications IP, est une partie intégrante de la spécification IPv6. De même, la mobilité IP, qui permet à un appareil de conserver son adresse IP en se déplaçant entre les réseaux, est mieux prise en charge.

Les adresses IPv6 sont catégorisées par leur portée :

> **Global Unicast (GUA) :** L\'équivalent d\'une adresse IPv4 publique, globalement unique et routable sur Internet. Elles commencent généralement par le préfixe 2000::/3.
>
> **Link-Local (LLA) :** Adresses utilisées uniquement pour la communication sur un même lien physique (segment réseau). Elles sont automatiquement configurées sur chaque interface (préfixe fe80::/10) et sont essentielles pour le fonctionnement de protocoles comme le Neighbor Discovery.
>
> **Unique Local (ULA) :** L\'équivalent des adresses privées IPv4, destinées à un usage interne à un site ou une organisation. Elles ne sont pas routables sur l\'Internet public (préfixe fc00::/7).

### 34.1.2 Protocoles auxiliaires (ICMP, ARP, DHCP, NAT)

Le protocole IP, dans sa quête de simplicité et d\'efficacité pour le routage de paquets, a délibérément ignoré plusieurs problèmes pratiques. Comment une machine obtient-elle sa configuration réseau? Comment traduire une adresse IP en une adresse matérielle pour la livraison finale? Comment signaler qu\'une destination est injoignable? Pour résoudre ces questions, un écosystème de protocoles de soutien s\'est développé autour d\'IP. Ces protocoles \"auxiliaires\", bien que ne transportant pas directement les données des applications, sont indispensables au fonctionnement de la couche Réseau dans le monde réel. Ils forment une sorte de \"couche de support\" implicite, comblant les lacunes laissées par la conception minimaliste d\'IP.

#### ICMP (Internet Control Message Protocol)

> **Le problème :** Le protocole IP est un service de livraison \"au mieux\", ce qui signifie qu\'il ne fournit aucune garantie. Si un routeur ne peut pas acheminer un paquet ou si le paquet est détruit en raison d\'une durée de vie expirée, IP n\'a aucun mécanisme intégré pour en informer l\'expéditeur. Le paquet disparaît simplement dans le silence. Pour le diagnostic et la gestion des erreurs, ce silence est inacceptable.
>
> **La solution et son mécanisme :** L\'**ICMP** sert de mécanisme de signalisation et de rapport d\'erreurs pour la couche IP. Il est considéré comme un protocole de couche 3, car il traite des problèmes liés à IP, et ses messages sont encapsulés directement dans des datagrammes IP. Lorsqu\'un routeur ou un hôte de destination rencontre un problème avec un datagramme IP, il génère un message ICMP et l\'envoie à l\'adresse IP source du datagramme original.

ICMP n\'est pas un protocole de transport ; il ne rend pas IP fiable. Il s\'agit d\'un système de feedback. Les messages ICMP les plus importants incluent :

> **Destination Unreachable (Type 3) :** Ce message est généré lorsqu\'un routeur ne trouve pas de route vers la destination, ou lorsque l\'hôte de destination ne peut pas livrer le paquet au protocole de couche supérieure (par exemple, un port UDP est fermé). C\'est un signal d\'erreur fondamental.
>
> **Time Exceeded (Type 11) :** Chaque paquet IP a un champ *Time-To-Live* (TTL) qui est décrémenté par chaque routeur traversé. Si le TTL atteint zéro avant que le paquet n\'atteigne sa destination, le routeur le détruit et envoie un message ICMP *Time Exceeded* à la source. Ce mécanisme empêche les paquets de boucler indéfiniment dans le réseau et constitue la base de l\'outil de diagnostic traceroute.\
> traceroute envoie une série de paquets avec des TTL croissants (1, 2, 3,\...) et utilise les messages *Time Exceeded* reçus de chaque routeur successif pour cartographier le chemin vers la destination.
>
> **Echo Request (Type 8) et Echo Reply (Type 0) :** Ces deux messages sont le fondement de l\'utilitaire ping. Un hôte envoie un *Echo Request* à une destination, et si celle-ci est joignable, elle doit répondre avec un *Echo Reply*. Cela permet de tester la connectivité de base et de mesurer le temps d\'aller-retour (latence).

Bien qu\'essentiel, ICMP peut être détourné à des fins malveillantes. Les attaques par **inondation ICMP** (*ICMP Flood* ou *Ping Flood*) consistent à submerger une cible avec un grand nombre de requêtes *Echo Request*, forçant la victime à consommer ses ressources pour y répondre, ce qui peut conduire à un déni de service.

#### ARP (Address Resolution Protocol)

> **Le problème :** La couche Réseau (IP) raisonne en termes d\'adresses logiques (adresses IP) pour le routage de bout en bout. Cependant, pour la livraison finale d\'un paquet à une machine sur le même segment de réseau local (comme un réseau Ethernet), la couche Liaison de Données (couche 2) a besoin de connaître l\'adresse physique ou matérielle (adresse MAC) de la carte réseau de destination. Il faut un mécanisme pour faire le pont entre ces deux mondes d\'adressage.
>
> **La solution et son mécanisme :** L\'**ARP** est le protocole de \"colle\" qui traduit une adresse IP de couche 3 en une adresse MAC de couche 2. Son fonctionnement est un dialogue localisé sur un segment de réseau :

**Consultation du cache ARP :** Lorsqu\'un hôte A veut envoyer un paquet à un hôte B sur le même réseau, il consulte d\'abord sa table locale, le **cache ARP**, qui stocke les correspondances IP-MAC récemment découvertes.

**Requête ARP (Broadcast) :** Si l\'adresse MAC de B n\'est pas dans le cache, A construit une **requête ARP**. Ce message, diffusé à toutes les machines du réseau local (*broadcast* à l\'adresse MAC FF:FF:FF:FF:FF:FF), pose essentiellement la question : \"Quelle est l\'adresse MAC de l\'hôte ayant l\'adresse IP 192.168.1.50?\".

**Réponse ARP (Unicast) :** Toutes les machines sur le segment reçoivent la requête, mais seule la machine concernée (B) y répond. B envoie une **réponse ARP** directement à l\'adresse MAC de A (*unicast*). Cette réponse contient l\'information demandée : \"L\'adresse MAC pour 192.168.1.50 est 00:1A:2B:3C:4D:5E\".

**Mise à jour du cache et envoi :** En recevant la réponse, A met à jour son cache ARP avec la nouvelle correspondance et peut maintenant construire la trame Ethernet avec la bonne adresse MAC de destination pour envoyer son paquet IP.

ARP est également vulnérable. L\'attaque par **usurpation ARP** (*ARP Spoofing* ou *ARP Poisoning*) consiste pour un attaquant à envoyer de fausses réponses ARP pour associer l\'adresse IP d\'une victime (par exemple, la passerelle du réseau) à sa propre adresse MAC. Tout le trafic de la victime destiné à la passerelle sera alors envoyé à l\'attaquant, lui permettant de l\'intercepter (attaque de l\'homme du milieu).

#### DHCP (Dynamic Host Configuration Protocol)

> **Le problème :** Configurer manuellement chaque appareil d\'un réseau avec une adresse IP unique, un masque de sous-réseau, une passerelle par défaut et des adresses de serveurs DNS est une tâche laborieuse, sujette aux erreurs (conflits d\'adresses) et totalement impraticable dans les grands réseaux ou les réseaux avec des appareils mobiles.
>
> **La solution et son mécanisme :** Le **DHCP** est un protocole client-serveur qui automatise entièrement ce processus d\'attribution de configuration. Il permet à un appareil de rejoindre un réseau et de devenir opérationnel sans aucune intervention manuelle. Le processus se déroule en quatre étapes, connues sous l\'acronyme **DORA**  :

**Discover :** Un client qui se connecte au réseau, n\'ayant pas encore d\'adresse IP, envoie un message DHCPDISCOVER en *broadcast*. Ce message est une demande ouverte : \"Y a-t-il un serveur DHCP sur ce réseau?\"

**Offer :** Tout serveur DHCP qui reçoit la demande et qui peut fournir une configuration répond avec un message DHCPOFFER. Ce message contient une proposition de configuration : une adresse IP, un masque, la durée du bail, et d\'autres options.

**Request :** Le client reçoit une ou plusieurs offres. Il en choisit une (généralement la première reçue) et diffuse un message DHCPREQUEST. Ce message identifie le serveur et la configuration qu\'il a choisis. Le fait qu\'il soit diffusé permet d\'informer les autres serveurs DHCP que leurs offres ont été déclinées, leur permettant de libérer les adresses qu\'ils avaient proposées.

**Acknowledge (ACK) :** Le serveur DHCP choisi finalise la transaction en envoyant un message DHCPACK. Ce message confirme l\'attribution de l\'adresse et des paramètres pour une durée déterminée. Le client peut maintenant utiliser cette configuration pour communiquer sur le réseau.

Les concepts clés du DHCP incluent :

> **Le bail (*lease*) :** La configuration n\'est pas attribuée de manière permanente, mais pour une durée limitée, appelée bail. Avant l\'expiration du bail, le client doit demander son renouvellement, ce qui permet de récupérer les adresses des appareils qui ont quitté le réseau.
>
> **Les options :** En plus de l\'adresse IP, DHCP peut fournir une multitude d\'autres paramètres, comme l\'adresse de la passerelle par défaut (option 3), les adresses des serveurs DNS (option 6), ou le nom de domaine (option 15).
>
> **Les réservations :** Un administrateur peut configurer le serveur DHCP pour qu\'il attribue toujours la même adresse IP à un appareil spécifique, en se basant sur son adresse MAC.

#### NAT (Network Address Translation)

> **Le problème :** Le NAT a été développé pour répondre à deux problèmes principaux : la pénurie imminente d\'adresses IPv4 publiques et le désir des organisations de masquer la topologie de leur réseau interne pour des raisons de sécurité.
>
> **La solution et son mécanisme :** Le **NAT** est une technique implémentée sur un routeur ou un pare-feu à la frontière d\'un réseau. Ce dispositif réécrit les adresses IP et parfois les numéros de port dans les en-têtes des paquets qui le traversent. Il traduit les adresses IP privées (non routables sur l\'Internet public, comme celles des plages 10.0.0.0/8, 172.16.0.0/12 et 192.168.0.0/16) en une ou plusieurs adresses IP publiques.

Le NAT est une solution pragmatique mais controversée, car il brise le principe de communication de bout en bout. Un hôte sur Internet ne communique plus directement avec l\'hôte interne, mais avec le routeur NAT qui agit comme un intermédiaire.

Il existe plusieurs formes de NAT :

> **NAT Statique :** Il établit une correspondance permanente et biunivoque entre une adresse privée et une adresse publique. Par exemple, l\'adresse privée 192.168.1.10 est toujours traduite en 203.0.113.5. Cela est principalement utilisé pour rendre un serveur interne (comme un serveur web) accessible depuis l\'extérieur.
>
> **NAT Dynamique :** Le routeur NAT dispose d\'un pool d\'adresses publiques. Lorsqu\'un hôte interne initie une connexion vers l\'extérieur, le routeur lui attribue dynamiquement une adresse publique disponible du pool pour la durée de la session. Cela permet à un grand nombre d\'hôtes internes de partager un plus petit nombre d\'adresses publiques, mais pas simultanément.
>
> **PAT (Port Address Translation) :** Également connu sous le nom de *NAPT* ou *NAT Overload*, c\'est la forme la plus répandue de NAT. Elle permet à de multiples hôtes internes d\'utiliser une seule adresse IP publique simultanément. Le routeur NAT y parvient en utilisant non seulement l\'adresse IP mais aussi le numéro de port source pour distinguer les différentes connexions. Lorsqu\'un paquet sort, il remplace le couple (IP_privée_source, Port_source) par (IP_publique_NAT, Nouveau_port_source). Il maintient une table de traduction pour pouvoir inverser le processus pour les paquets de réponse. C\'est le mécanisme utilisé par la quasi-totalité des routeurs domestiques.

### 34.1.3 Routage (Vecteur de distance, État de liens : OSPF, BGP)

Une fois que chaque nœud du réseau possède une adresse unique, le défi suivant pour la couche Réseau est de déterminer le meilleur chemin pour acheminer un paquet de sa source à sa destination. Cette tâche est accomplie par les routeurs, qui s\'appuient sur des protocoles de routage pour construire et maintenir des tables de routage. Une table de routage est essentiellement une carte qui, pour chaque destination connue, indique le prochain \"saut\" (*next hop*) sur le chemin.

L\'Internet est une collection de réseaux gérés par différentes entités (entreprises, universités, fournisseurs d\'accès). Un tel réseau sous une administration commune est appelé un **Système Autonome (AS)**. Le routage est donc divisé en deux domaines :

> **Le routage intra-domaine (Interior Gateway Protocol - IGP) :** concerne la manière dont les routeurs échangent des informations de routage *à l\'intérieur* d\'un même AS. L\'objectif est de trouver le chemin le plus efficace (le plus rapide, le moins coûteux) au sein du réseau.
>
> **Le routage inter-domaine (Exterior Gateway Protocol - EGP) :** concerne la manière dont les différents AS échangent des informations de routage *entre eux*. L\'objectif n\'est pas seulement l\'efficacité, mais aussi l\'application de politiques commerciales et de sécurité.

#### Protocoles de routage intra-domaine (IGP)

Au sein d\'un AS, deux grandes familles d\'algorithmes de routage s\'affrontent, représentant un compromis fondamental en systèmes distribués : la simplicité et la frugalité des ressources contre la vitesse de convergence et la cohérence de l\'information.

##### Algorithmes à Vecteur de Distance (Distance-Vector)

La philosophie du routage à vecteur de distance peut être résumée par l\'expression \"routage par rumeur\". Chaque routeur n\'a qu\'une connaissance très locale de la topologie : il connaît ses voisins directs et les destinations que ces voisins affirment pouvoir atteindre, ainsi que la \"distance\" (la métrique) pour y parvenir. Il ne possède pas de carte globale du réseau.

> **Algorithme (Bellman-Ford) :** Le mécanisme est simple. Périodiquement (par exemple, toutes les 30 secondes pour le protocole RIP), chaque routeur envoie sa table de routage complète à tous ses voisins directement connectés. Lorsqu\'un routeur reçoit une table de routage d\'un voisin, il la compare à la sienne. Si le voisin lui annonce un chemin vers une destination qui est \"meilleur\" (métrique plus faible) que celui qu\'il connaît actuellement, il met à jour sa propre table en notant que pour atteindre cette destination, il doit passer par ce voisin. L\'information se propage ainsi de proche en proche, comme une rumeur.
>
> Le problème du \"Comptage à l\'infini\" : La simplicité de cette approche a un coût : une convergence lente et une vulnérabilité aux boucles de routage, en particulier lorsque de \"mauvaises nouvelles\" (comme la panne d\'un lien) doivent se propager. C\'est le problème du count-to-infinity.\
> Considérons une topologie simple : A \-- B \-- C. Le routeur A sait qu\'il peut atteindre C via B avec une métrique de 2. B sait qu\'il peut atteindre C directement avec une métrique de 1.\
> Supposons que le lien entre B et C tombe. B détecte la panne et marque C comme inaccessible (métrique infinie). Cependant, avant que B ait le temps d\'annoncer cette mauvaise nouvelle à A, il est possible que A envoie sa mise à jour périodique à B. Dans cette mise à jour, A annonce : \"Je peux atteindre C en 2 sauts\". B, voyant cette information, pense à tort qu\'il existe un chemin alternatif vers C via A. Il met donc sa table à jour : \"Pour atteindre C, je dois passer par A, avec une métrique de 3 (2 pour A + 1 pour aller à A)\".\
> Lors de la prochaine mise à jour, B annoncera à A qu\'il peut atteindre C en 3 sauts. A, voyant que son chemin passe par B, mettra à jour sa métrique à 4. Ce processus se poursuit, les métriques augmentant à chaque échange (\"comptage\") jusqu\'à ce qu\'elles atteignent la valeur définie comme l\'infini par le protocole (par exemple, 16 pour RIP), moment auquel la route est finalement considérée comme invalide. Pendant tout ce temps, une boucle de routage existe entre A et B pour la destination C.39

Le protocole **RIP (Routing Information Protocol)** est l\'exemple canonique de cette famille. Il utilise le nombre de sauts (routeurs traversés) comme unique métrique et a une limite de 15 sauts pour éviter les boucles infinies.

##### Algorithmes à État de Liens (Link-State)

En réponse aux limitations des algorithmes à vecteur de distance, une approche plus complexe mais plus robuste a été développée : le routage à état de liens. Sa philosophie est que \"chaque routeur possède la carte complète du réseau\". Chaque routeur calcule ses propres routes de manière indépendante en se basant sur une connaissance complète et cohérente de la topologie.

> **Mécanisme :** Le processus se déroule en quatre étapes distinctes :

**Découverte des voisins :** Chaque routeur utilise un protocole simple, comme l\'envoi de paquets Hello, pour découvrir les autres routeurs auxquels il est directement connecté et établir une relation de voisinage.

**Diffusion de l\'état des liens :** Une fois ses voisins connus, chaque routeur crée un petit paquet d\'information appelé **LSA (Link-State Advertisement)**. Ce paquet décrit le routeur lui-même, ses liens connectés, ses voisins sur ces liens et le \"coût\" (métrique) de chaque lien. Ce LSA est ensuite diffusé à tous les autres routeurs du réseau (un processus appelé *flooding*).

**Construction de la base de données topologique (LSDB) :** Chaque routeur collecte tous les LSA qu\'il reçoit de tous les autres routeurs et les stocke dans sa **Link-State Database (LSDB)**. À la fin du processus de flooding, tous les routeurs d\'une même zone ont une LSDB identique, qui est une réplique exacte de la topologie du réseau.

**Calcul de l\'arbre des plus courts chemins (SPF) :** Avec cette carte complète, chaque routeur exécute de manière indépendante l\'algorithme **SPF (Shortest Path First) de Dijkstra**. Cet algorithme calcule, à partir de la LSDB, l\'arbre des chemins les plus courts depuis le routeur lui-même vers toutes les autres destinations du réseau. Les résultats de ce calcul sont ensuite insérés dans la table de routage.

Cette approche garantit une information cohérente sur l\'ensemble du réseau, ce qui conduit à une convergence beaucoup plus rapide après un changement de topologie et élimine les problèmes de boucles de routage inhérents au vecteur de distance. Cependant, elle exige plus de ressources CPU (pour exécuter l\'algorithme de Dijkstra) et de mémoire (pour stocker la LSDB).

Le protocole **OSPF (Open Shortest Path First)** est le principal protocole à état de liens. Il utilise une métrique de \"coût\" généralement inversement proportionnelle à la bande passante du lien, favorisant ainsi les liaisons les plus rapides. Pour améliorer sa scalabilité dans les très grands réseaux, OSPF utilise un concept de

**zones (*areas*)**, qui permet de diviser un AS en domaines de routage plus petits, limitant ainsi la portée du flooding des LSA.

  ---------------------------------- ------------------------------------------------ -----------------------------------------------
  Caractéristique                    Algorithme à Vecteur de Distance (ex: RIP)       Algorithme à État de Liens (ex: OSPF)

  **Philosophie**                    Routage par rumeur                               Chaque routeur a la carte complète

  **Algorithme principal**           Bellman-Ford                                     Dijkstra (SPF)

  **Information partagée**           Tables de routage complètes (avec les voisins)   État des liens (LSA) (avec tous les routeurs)

  **Connaissance de la topologie**   Limitée aux voisins directs                      Complète, pour toute la zone

  **Métrique typique**               Nombre de sauts                                  Coût (basé sur la bande passante)

  **Vitesse de convergence**         Lente                                            Rapide

  **Scalabilité**                    Limitée                                          Élevée (surtout avec les zones)

  **Consommation CPU/Mémoire**       Faible                                           Élevée

  **Vulnérabilité aux boucles**      Élevée (comptage à l\'infini)                    Faible

  ---------------------------------- ------------------------------------------------ -----------------------------------------------

*Tableau 34.2 : Synthèse des algorithmes de routage IGP*

#### Protocole de routage inter-domaine (EGP) : BGP

Lorsque le trafic doit traverser les frontières entre les Systèmes Autonomes, les règles changent. L\'objectif n\'est plus simplement de trouver le chemin le plus court ou le plus rapide. Le routage inter-AS est régi par des considérations politiques, économiques et de sécurité. Le protocole qui orchestre cette danse complexe est le **Border Gateway Protocol (BGP)**, la véritable \"colle\" de l\'Internet mondial.

BGP n\'est pas un protocole purement technique ; il est fondamentalement politique. Sa conception vise à permettre aux AS de mettre en œuvre des décisions commerciales. Par exemple, un FAI peut préférer envoyer du trafic par une liaison plus longue mais gratuite (un accord de *peering*) plutôt que par une liaison plus courte mais payante (un lien de *transit*). BGP fournit les mécanismes pour exprimer et appliquer ces politiques.

> **Algorithme à \"Vecteur de Chemins\" (Path-Vector) :** BGP est une évolution sophistiquée du principe de vecteur de distance. Au lieu d\'annoncer simplement une destination et une métrique, un routeur BGP annonce une destination (un préfixe réseau) et le\
> **chemin complet des numéros d\'AS** qu\'il faut traverser pour l\'atteindre. Cet attribut, appelé AS_PATH, est la clé de voûte de BGP.
>
> **Prévention des boucles :** L\'attribut AS_PATH fournit un mécanisme de prévention des boucles simple et robuste. Lorsqu\'un routeur BGP reçoit une annonce de route, il examine la liste des AS dans l\'AS_PATH. S\'il voit son propre numéro d\'AS dans la liste, il sait que l\'annonce décrit un chemin qui a déjà traversé son réseau. Il rejette donc cette route, évitant ainsi une boucle de routage.
>
> **Fonctionnement :** Les routeurs BGP, appelés *speakers*, établissent des sessions de voisinage (*peering*) fiables entre eux en utilisant TCP sur le port 179. Une fois la session établie, ils échangent des messages :

**OPEN :** Pour initier une session.

**UPDATE :** Pour annoncer de nouveaux préfixes, retirer des préfixes devenus inaccessibles, ou modifier les attributs d\'une route.

**KEEPALIVE :** Envoyés périodiquement pour maintenir la session active.

**NOTIFICATION :** Pour signaler une erreur et fermer la session.

Le processus de décision de BGP pour sélectionner la meilleure route est complexe et hiérarchique, basé sur une longue liste d\'attributs associés à chaque route (tels que LOCAL_PREFERENCE, la longueur de l\'AS_PATH, MED, etc.), qui permettent à un administrateur d\'influencer finement les décisions de routage pour implémenter ses politiques.

Enfin, on distingue **eBGP** (External BGP), qui est utilisé pour les sessions de peering *entre* des AS différents, et **iBGP** (Internal BGP), qui est utilisé pour distribuer les routes apprises via eBGP *à l\'intérieur* de son propre AS, afin que tous les routeurs de sortie de l\'AS partagent une vision cohérente du routage externe.

## 34.2 Couche Transport

Si la couche Réseau assure l\'acheminement des paquets d\'une machine à une autre, elle le fait sans aucune garantie. La couche Transport s\'appuie sur ce service de base pour fournir des services de communication logiques directement aux applications. Son rôle principal est de passer d\'une communication d\'hôte à hôte à une communication de **processus à processus**. Un ordinateur peut exécuter simultanément un navigateur web, un client de messagerie et un logiciel de visioconférence. La couche Transport est responsable de s\'assurer que les données du site web sont livrées au navigateur, que les courriels sont livrés au client de messagerie, et que le flux vidéo est livré au bon logiciel.

#### Rôle et Multiplexage/Démultiplexage

Pour distinguer les différentes applications s\'exécutant sur une machine, la couche Transport utilise le concept de **numéro de port**. Un port est un identifiant numérique de 16 bits (allant de 0 à 65535) qui, combiné à une adresse IP, forme un point de terminaison de communication unique, souvent appelé *socket*.

Ce mécanisme de ports permet deux opérations cruciales :

> **Multiplexage (à l\'émission) :** Lorsqu\'un hôte doit envoyer des données provenant de plusieurs applications, son système d\'exploitation rassemble les données de chaque socket, leur attache un en-tête de transport contenant le port source et le port destination appropriés, et transmet les segments résultants à la couche Réseau. C\'est le multiplexage : plusieurs flux de communication sont combinés pour être envoyés via une seule interface réseau.
>
> **Démultiplexage (à la réception) :** Lorsqu\'un hôte reçoit des segments de la couche Réseau, il examine le numéro de port de destination dans l\'en-tête de transport de chaque segment. Ce numéro lui indique à quel socket, et donc à quelle application, le segment de données doit être livré. C\'est le démultiplexage : un flux de segments entrants est distribué aux bonnes applications.

La suite TCP/IP offre deux protocoles de transport principaux, chacun proposant un modèle de service radicalement différent pour répondre aux divers besoins des applications : UDP et TCP.

### 34.2.1 UDP (User Datagram Protocol)

L\'UDP est l\'incarnation de la simplicité. Il offre un service de transport minimaliste, souvent décrit comme une \"fine couche\" au-dessus d\'IP. Sa philosophie est de fournir aux applications un accès direct au service de datagrammes non fiable d\'IP, en y ajoutant simplement le multiplexage/démultiplexage via les numéros de port et une vérification d\'intégrité optionnelle des données.

L\'en-tête d\'un datagramme UDP est d\'une taille fixe et minimale de 8 octets, ce qui reflète sa simplicité. Il ne contient que quatre champs  :

> **Port Source (16 bits) :** Le numéro de port de l\'application émettrice.
>
> **Port Destination (16 bits) :** Le numéro de port de l\'application réceptrice.
>
> **Longueur (16 bits) :** La longueur totale du datagramme UDP (en-tête + données) en octets.
>
> **Somme de contrôle (16 bits) :** Un champ utilisé pour détecter les erreurs de transmission dans l\'en-tête et les données. Son utilisation est optionnelle en IPv4 mais recommandée.

Les caractéristiques d\'UDP découlent directement de cette conception minimaliste :

> **Sans connexion :** Il n\'y a pas de phase d\'établissement de connexion (pas de \"handshake\") avant l\'envoi des données. Un datagramme peut être envoyé dès qu\'une application le souhaite, ce qui réduit la latence initiale.
>
> **Non fiable :** UDP ne fournit aucune garantie de livraison. Les datagrammes peuvent être perdus, arriver dans le désordre ou être dupliqués, et UDP ne fera rien pour détecter ou corriger ces problèmes.
>
> **Pas de contrôle de flux ou de congestion :** UDP envoie les données au rythme où l\'application les lui fournit, sans se soucier de la capacité du récepteur à les traiter ou de l\'état de congestion du réseau.

En raison de ces caractéristiques, UDP est bien adapté aux applications où la vitesse et la faible latence sont plus importantes que la fiabilité absolue. La perte occasionnelle d\'un paquet est tolérable ou gérée par l\'application elle-même. Les cas d\'utilisation typiques incluent :

> **Le streaming multimédia (VoIP, vidéo en direct) :** La perte d\'un paquet peut causer une brève imperfection (une saccade dans la vidéo), ce qui est préférable à un long délai causé par une retransmission.
>
> **Les jeux en ligne :** La transmission rapide des mises à jour de position est cruciale ; une information légèrement obsolète est préférable à une information retardée.
>
> **Les protocoles de type requête-réponse simples comme le DNS :** Une requête DNS est petite, et si elle est perdue, le client peut simplement la renvoyer. La surcharge d\'une connexion TCP serait contre-productive.

### 34.2.2 TCP (Transmission Control Protocol)

À l\'opposé d\'UDP, TCP est un chef-d\'œuvre d\'ingénierie conçu pour fournir un service de communication de **flux d\'octets fiable et ordonné** sur le service de datagrammes fondamentalement non fiable d\'IP. Il accomplit cet exploit en implémentant une série de mécanismes sophistiqués qui sont gérés entièrement par les systèmes d\'extrémité, sans aide explicite du réseau. C\'est l\'incarnation parfaite du principe de bout en bout : créer l\'illusion d\'un canal de communication parfait à partir d\'une infrastructure de livraison chaotique, en plaçant toute l\'intelligence aux extrémités.

La complexité de TCP se reflète dans son en-tête, qui a une taille minimale de 20 octets et contient de nombreux champs absents de l\'en-tête UDP.

  ------------------------ ------------ ------------------- ------------------- -----------------------------------------------------------
  Champ                    Taille       Présent dans UDP?   Présent dans TCP?   Rôle principal

  Port Source              16 bits      Oui                 Oui                 Multiplexage/Démultiplexage

  Port Destination         16 bits      Oui                 Oui                 Multiplexage/Démultiplexage

  Numéro de Séquence       32 bits      Non                 Oui                 Ordonnancement et suivi des données

  Numéro d\'Acquittement   32 bits      Non                 Oui                 Acquittement cumulatif des données reçues

  Taille en-tête (HLEN)    4 bits       Non                 Oui                 Indique la taille de l\'en-tête TCP (à cause des options)

  Drapeaux (Flags)         6-9 bits     Non                 Oui                 Contrôle de la connexion (SYN, ACK, FIN, RST)

  Fenêtre de réception     16 bits      Non                 Oui                 Contrôle de flux

  Somme de contrôle        16 bits      Oui                 Oui                 Détection d\'erreurs (obligatoire en TCP)

  Pointeur urgent          16 bits      Non                 Oui                 Gestion des données urgentes (rarement utilisé)

  Options                  Variable     Non                 Oui                 Négociation de paramètres (MSS, SACK, etc.)

  ------------------------ ------------ ------------------- ------------------- -----------------------------------------------------------

*Tableau 34.3 : Comparaison des en-têtes TCP et UDP*

#### Connexion et Fiabilité

Contrairement à UDP, TCP est **orienté connexion**. Avant que toute donnée applicative puisse être échangée, une connexion doit être établie entre le client et le serveur.

> **Établissement de la connexion (Three-Way Handshake) :** Ce processus en trois étapes garantit que les deux parties sont prêtes à communiquer et synchronisent leurs numéros de séquence initiaux.

**SYN :** Le client initie la connexion en envoyant un segment TCP avec le drapeau SYN (Synchronize) activé. Ce segment contient un numéro de séquence initial (ISN) choisi de manière aléatoire, disons Seq=x. Le client passe à l\'état\
SYN-SENT.

**SYN-ACK :** Le serveur, en attente de connexions, reçoit le segment SYN. Il alloue des ressources pour la connexion et répond avec un segment qui a à la fois les drapeaux SYN et ACK activés. Il acquitte le SYN du client en fixant le numéro d\'acquittement à Ack=x+1. Il choisit également son propre ISN, disons Seq=y. Le serveur passe à l\'état\
SYN-RCVD.

**ACK :** Le client reçoit le SYN-ACK du serveur. Il passe à l\'état ESTABLISHED et finalise la poignée de main en envoyant un dernier segment avec le drapeau ACK activé. Ce segment acquitte le SYN du serveur avec Ack=y+1 et a pour numéro de séquence Seq=x+1. Lorsque le serveur reçoit cet ACK, il passe également à l\'état\
ESTABLISHED. La connexion est maintenant ouverte et bidirectionnelle.

> **Transfert de Données Fiable :** La fiabilité de TCP repose sur deux concepts clés : les numéros de séquence et les acquittements.

**Numéros de Séquence :** TCP ne voit pas les données comme une série de paquets, mais comme un **flux d\'octets** continu. Le numéro de séquence dans un segment TCP est le numéro du premier octet de données de ce segment dans le flux global. Cela permet au récepteur de réassembler les segments dans le bon ordre, même s\'ils arrivent dans le désordre, et de détecter les segments manquants.

**Acquittements (ACKs) et Retransmissions :** Le mécanisme d\'acquittement de TCP est **cumulatif**. Lorsque le récepteur envoie un ACK avec la valeur Ack=n, il signifie : \"J\'ai reçu correctement tous les octets jusqu\'à n-1, et le prochain octet que j\'attends est l\'octet numéro n\".\
\
L\'émetteur maintient un temporisateur de retransmission (RTO) pour les données envoyées mais non encore acquittées. Si cet RTO expire avant qu\'un ACK correspondant ne soit reçu, l\'émetteur considère le segment comme perdu et le retransmet.74 La valeur du RTO n\'est pas fixe ; elle est calculée dynamiquement pour chaque connexion en fonction du temps d\'aller-retour (RTT) mesuré, ce qui permet à TCP de s\'adapter à des conditions de réseau variables.71

#### Contrôle de Flux

Le contrôle de flux a pour but d\'empêcher un émetteur rapide de submerger un récepteur plus lent. Si l\'émetteur envoie des données plus vite que l\'application réceptrice ne peut les lire, le tampon de réception de l\'hôte destinataire finira par déborder, entraînant la perte de paquets.

> **Mécanisme de la Fenêtre Glissante :** La solution de TCP est un mécanisme de contrôle de flux de bout en bout appelé la **fenêtre glissante**. Le récepteur, dans chaque segment qu\'il envoie (même s\'il s\'agit d\'un simple ACK), inclut une valeur dans le champ \"Fenêtre de réception\" (rwnd). Cette valeur annonce la quantité d\'espace disponible dans son tampon de réception.\
> \
> L\'émetteur maintient une \"fenêtre d\'envoi\" et s\'assure que la quantité de données envoyées mais non encore acquittées (les données \"en vol\") ne dépasse jamais la dernière valeur de rwnd annoncée par le récepteur.77 Si le récepteur est lent et que son tampon se remplit, il annoncera une\
> rwnd plus petite, voire nulle, forçant l\'émetteur à ralentir ou à s\'arrêter complètement jusqu\'à ce que de l\'espace se libère.

#### Contrôle de Congestion

Le contrôle de flux protège le récepteur, mais il ne protège pas le réseau lui-même. Si de nombreuses connexions TCP traversent un même routeur et que celui-ci n\'a pas une capacité suffisante, ses propres tampons vont déborder et il commencera à jeter des paquets. C\'est la **congestion**. Le contrôle de congestion est l\'ensemble des mécanismes que TCP utilise pour éviter de provoquer cet effondrement du réseau.

TCP n\'a aucun signal explicite du réseau lui indiquant qu\'il y a de la congestion. Il doit donc l\'**inférer** en se basant sur les événements qu\'il observe, principalement la **perte de paquets** (détectée soit par l\'expiration d\'un RTO, soit par la réception d\'ACKs dupliqués).

> **Mécanisme :** Pour gérer la congestion, TCP introduit une variable d\'état interne à l\'émetteur : la **fenêtre de congestion (cwnd)**. Cette fenêtre représente une estimation de la capacité du réseau. À tout moment, la quantité de données que l\'émetteur est autorisé à avoir en vol est le **minimum de la fenêtre de congestion et de la fenêtre de réception annoncée** : Quantité_en_vol \<= min(cwnd, rwnd). Cette règle simple et élégante unifie les deux mécanismes de contrôle : l\'émetteur est limité à la fois par la capacité du récepteur et par sa propre estimation de la capacité du réseau.

L\'algorithme de contrôle de congestion de TCP (dans sa version classique, dite *Reno*) est un ballet dynamique entre quatre phases :

  -------------------------------------------------------- ----------------------------------------- --------------------------------------------------------- --------------------------- --------------------------------------------------------------------------
  Phase                                                    Déclencheur                               Comportement de cwnd                                      Valeur de ssthresh          Phase suivante

  **Démarrage Lent (Slow Start)**                          Début de connexion ou après un timeout.   Augmentation exponentielle (double à chaque RTT).         Initialement très élevée.   Prévention de la Congestion (quand cwnd \>= ssthresh)

  **Prévention de la Congestion (Congestion Avoidance)**   cwnd atteint ssthresh.                    Augmentation linéaire (augmente de 1 MSS par RTT).        Inchangée.                  Démarrage Lent (si timeout) ou Récupération Rapide (si 3 ACKs dupliqués)

  **Réaction à un Timeout**                                Expiration du RTO.                        Réinitialisée à 1 MSS.                                    Divisée par 2.              Démarrage Lent

  **Retransmission/Récupération Rapide**                   Réception de 3 ACKs dupliqués.            Divisée par 2 (devient la nouvelle valeur de ssthresh).   Divisée par 2.              Prévention de la Congestion

  -------------------------------------------------------- ----------------------------------------- --------------------------------------------------------- --------------------------- --------------------------------------------------------------------------

*Tableau 34.4 : Les phases du contrôle de congestion TCP (Reno)*

> **Démarrage Lent (Slow Start) :** Au début d\'une connexion, TCP ne connaît pas la bande passante disponible. Il commence donc prudemment avec une cwnd de 1 MSS (Maximum Segment Size). Pour chaque ACK reçu, il augmente cwnd de 1 MSS. Comme un segment envoyé génère un ACK, cela résulte en un doublement de la cwnd à chaque temps d\'aller-retour (RTT). Cette croissance exponentielle permet de sonder rapidement la capacité du réseau.
>
> **Prévention de la Congestion (Congestion Avoidance) :** La croissance exponentielle ne peut pas durer éternellement. Lorsqu\'elle atteint un seuil, le **Slow Start Threshold (ssthresh)**, TCP passe dans un mode plus conservateur. En mode de prévention de la congestion, cwnd n\'augmente plus que de manière linéaire, d\'environ 1 MSS par RTT. L\'objectif est de continuer à augmenter le débit, mais plus prudemment, pour s\'approcher de la capacité maximale du réseau sans la dépasser brutalement.
>
> **Retransmission Rapide (Fast Retransmit) :** Si un segment est perdu, le récepteur, qui continue de recevoir les segments suivants, va envoyer des ACKs dupliqués, demandant toujours le segment manquant. Lorsque l\'émetteur reçoit **trois ACKs dupliqués** pour le même numéro de séquence, il considère cela comme un signal fort que le segment a été perdu. Au lieu d\'attendre l\'expiration du RTO, il retransmet immédiatement le segment manquant. C\'est la *retransmission rapide*.
>
> **Récupération Rapide (Fast Recovery) :** La réception de trois ACKs dupliqués indique une perte, mais aussi que le réseau fonctionne encore (puisque des segments continuent d\'arriver). C\'est un signe de congestion légère. La réaction est donc moins sévère qu\'un timeout. L\'émetteur divise ssthresh par deux, puis fixe cwnd à cette nouvelle valeur de ssthresh. Il saute ainsi la phase de démarrage lent et passe directement en mode de prévention de la congestion. C\'est la *récupération rapide*. En cas de perte détectée par un\
> **timeout**, la congestion est jugée plus sévère : ssthresh est divisé par deux, mais cwnd est brutalement ramenée à 1 MSS, et le processus recommence par une phase de démarrage lent.

Cet ensemble de mécanismes, connu sous le nom d\'**AIMD (Additive Increase, Multiplicative Decrease)**, permet à TCP d\'adapter dynamiquement son débit, de partager équitablement la bande passante entre les connexions et d\'éviter l\'effondrement congestif du réseau.

## 34.3 Couche Application (DNS, HTTP/HTTPS, SMTP)

La couche Application est la couche la plus haute du modèle TCP/IP, celle avec laquelle les utilisateurs et leurs logiciels interagissent directement. Les protocoles de cette couche fournissent les services qui donnent un sens à l\'Internet : le web, le courrier électronique, la résolution de noms, etc. Ils s\'appuient sur les services de la couche Transport (TCP ou UDP) pour acheminer leurs données. Le choix du protocole de transport est une décision de conception cruciale, dictée par les besoins spécifiques de l\'application en termes de fiabilité, de latence et de complexité.

### DNS (Domain Name System)

> **Rôle :** L\'Internet fonctionne avec des adresses IP numériques, mais les humains préfèrent utiliser des noms de domaine mémorables (par exemple, www.google.com). Le **DNS** est le système qui fait office d\'annuaire mondial pour traduire ces noms de domaine en adresses IP correspondantes, et vice-versa.
>
> **Architecture :** Le DNS n\'est pas une base de données centralisée, ce qui serait un point de défaillance unique et un goulot d\'étranglement. C\'est un système de base de données **hiérarchique et distribué** à l\'échelle planétaire. La hiérarchie est structurée comme un arbre inversé :

**Les serveurs racine :** Au sommet de la hiérarchie, il existe un petit nombre de serveurs racine (13 clusters logiques) qui connaissent les adresses des serveurs pour les domaines de premier niveau.

**Les serveurs de domaine de premier niveau (TLD) :** Ces serveurs gèrent les domaines de premier niveau comme .com, .org, .fr, .ca, etc. Ils savent quels serveurs sont responsables des domaines de second niveau (par exemple, google.com).

**Les serveurs autoritaires :** Pour chaque domaine (comme google.com), il y a un ou plusieurs serveurs autoritaires qui détiennent les enregistrements DNS officiels pour ce domaine (par exemple, l\'adresse IP de www.google.com).

> **Fonctionnement :** Lorsqu\'un utilisateur tape une URL dans son navigateur, son ordinateur (le client DNS) interroge un serveur DNS local, appelé **résolveur DNS** (généralement fourni par le FAI). Le processus de résolution peut être :

**Récursif :** Le client demande au résolveur de trouver la réponse complète pour lui. Le résolveur prend alors en charge l\'ensemble du processus.

**Itératif :** Le résolveur effectue une série de requêtes itératives. Il demande au serveur racine, qui le renvoie vers le serveur TLD approprié. Il interroge ensuite le serveur TLD, qui le renvoie vers le serveur autoritaire du domaine. Finalement, il interroge le serveur autoritaire qui lui donne l\'adresse IP. Le résolveur renvoie alors la réponse au client et la met en cache pour accélérer les futures requêtes.

> **Protocole de transport :** Pour des transactions aussi courtes et fréquentes qu\'une requête DNS, la faible latence est primordiale. C\'est pourquoi le DNS utilise principalement **UDP** sur le port 53. La surcharge liée à l\'établissement d\'une connexion TCP pour chaque requête serait prohibitive. Cependant, si la réponse DNS est trop volumineuse pour tenir dans un seul datagramme UDP (ce qui est rare, mais possible, par exemple lors d\'un transfert de zone entre serveurs), le protocole peut basculer sur **TCP**.

### HTTP/HTTPS (Hypertext Transfer Protocol)

> **Rôle :** **HTTP** est le protocole fondamental du World Wide Web. C\'est un protocole de la couche application qui définit la manière dont les clients (navigateurs web) et les serveurs web communiquent pour demander et transmettre des ressources (pages HTML, images, feuilles de style, scripts, etc.).
>
> **Fonctionnement :** HTTP est un protocole textuel basé sur un modèle **requête-réponse**.

Le client établit une connexion TCP avec le serveur (généralement sur le port 80).

Le client envoie une **requête HTTP**, qui comprend une méthode (par exemple, GET pour demander une ressource, POST pour soumettre des données), l\'URL de la ressource, la version du protocole, et des en-têtes optionnels.

Le serveur traite la requête et renvoie une **réponse HTTP**, qui contient la version du protocole, un code de statut (par exemple, 200 OK, 404 Not Found), des en-têtes de réponse, et le corps de la réponse (le contenu de la ressource demandée).

> **Connexions persistantes :** Les premières versions de HTTP (1.0) utilisaient des connexions **non persistantes** : une nouvelle connexion TCP était établie pour chaque ressource à télécharger sur une page web. Cela était très inefficace à cause de la surcharge répétée du *three-way handshake* de TCP. HTTP/1.1 a introduit les connexions **persistantes** par défaut, où une seule connexion TCP est maintenue ouverte et réutilisée pour télécharger plusieurs ressources de la même page, ce qui améliore considérablement les performances.
>
> **HTTPS :** La sécurité est devenue une préoccupation majeure sur le web. **HTTPS** (HTTP Secure) n\'est pas un protocole distinct, mais plutôt l\'utilisation de HTTP sur une connexion sécurisée par le protocole **TLS (Transport Layer Security)**, ou son prédécesseur SSL. La communication se fait généralement sur le port 443. Avant que toute requête HTTP ne soit envoyée, le client et le serveur effectuent une \"poignée de main\" TLS pour négocier les algorithmes de chiffrement, échanger les clés de session et, de manière cruciale, pour que le serveur prouve son identité au client en présentant un certificat numérique. TLS garantit trois choses :

**Le chiffrement :** Les données échangées sont illisibles pour un intercepteur.

**L\'authentification :** Le client peut vérifier que le serveur est bien celui qu\'il prétend être.

**L\'intégrité :** Les données ne peuvent pas être modifiées en transit sans être détectées.

Le besoin de fiabilité est absolu pour le web ; la perte d\'un seul segment pourrait corrompre une page entière. C\'est pourquoi HTTP et HTTPS s\'appuient exclusivement sur le service de transport fiable de **TCP**.

### SMTP (Simple Mail Transfer Protocol)

> **Rôle :** **SMTP** est le protocole standard de l\'Internet pour l\'envoi de courrier électronique. C\'est un protocole de type \"push\" : il est utilisé pour pousser un message d\'un client de messagerie vers son serveur sortant, et surtout pour transférer le message d\'un serveur de messagerie à un autre jusqu\'à ce qu\'il atteigne le serveur de destination.
>
> **Fonctionnement :** Comme HTTP, SMTP est un protocole textuel basé sur des commandes et des réponses. Il utilise **TCP** sur le port 25 pour garantir une livraison fiable des messages. Une session SMTP typique implique les commandes suivantes :

Le client initie la connexion et se présente avec HELO ou EHLO.

Le client spécifie l\'adresse de l\'expéditeur avec MAIL FROM.

Le client spécifie l\'adresse du ou des destinataires avec RCPT TO.

Le client indique qu\'il est prêt à envoyer le corps du message avec la commande DATA.

Le client envoie le message (en-têtes et corps) et termine avec une ligne contenant un unique point (.).

Le client termine la session avec QUIT.

> **Écosystème du courriel :** Il est important de noter que SMTP est uniquement responsable de l\'**envoi** des messages. Une fois qu\'un courriel arrive sur le serveur de messagerie du destinataire, celui-ci doit utiliser un protocole de **récupération** pour le lire. Les protocoles les plus courants pour cela sont **POP3 (Post Office Protocol)** et **IMAP (Internet Message Access Protocol)**. SMTP gère le voyage du message entre les serveurs, tandis que POP3/IMAP gère l\'accès de l\'utilisateur final à sa boîte de réception.

## 34.4 Réseaux Modernes (SDN, NFV, Réseaux sans fil et cellulaires)

L\'architecture réseau traditionnelle, basée sur des équipements matériels propriétaires (routeurs, commutateurs, pare-feux) où le logiciel et le matériel sont étroitement intégrés, a montré ses limites en termes de flexibilité, de coût et de vitesse d\'innovation. Au cours de la dernière décennie, de nouveaux paradigmes, largement inspirés par les principes du *cloud computing*, ont émergé pour transformer les réseaux en infrastructures programmables, virtualisées et agiles. Cette tendance peut être qualifiée de \"cloudification\" du réseau, appliquant les principes de virtualisation, d\'automatisation et de gestion par API qui ont révolutionné le calcul et le stockage.

### SDN (Software-Defined Networking)

Le **SDN** représente une rupture architecturale fondamentale avec les réseaux traditionnels. Son principe central est la **séparation du plan de contrôle et du plan de données**.

> **Dans un réseau traditionnel,** chaque routeur ou commutateur est une entité autonome. Il possède son propre \"cerveau\" (le plan de contrôle), qui exécute des protocoles de routage pour prendre des décisions, et sa propre \"musculature\" (le plan de données), qui transfère les paquets en fonction de ces décisions. La gestion se fait appareil par appareil.
>
> **Dans une architecture SDN,** ces deux fonctions sont découplées :

**Le Plan de Données :** Il est constitué d\'équipements de commutation simples et rapides, dont la seule fonction est de traiter les paquets selon des règles de flux. Ils n\'ont plus d\'intelligence de routage propre.

**Le Plan de Contrôle :** L\'intelligence est externalisée et centralisée dans un composant logiciel appelé le **contrôleur SDN**. Ce contrôleur agit comme le \"cerveau\" centralisé du réseau. Il a une vue globale et en temps réel de la topologie du réseau et de son état.

**Les Interfaces :** Le contrôleur communique avec les équipements du plan de données via une **interface *Southbound***, en utilisant des protocoles comme OpenFlow pour programmer dynamiquement les tables de flux des commutateurs. Il expose également une **interface *Northbound*** via des API, permettant aux applications réseau (par exemple, un système de gestion de la qualité de service, un pare-feu) d\'exprimer leurs besoins au contrôleur, qui les traduit en règles de bas niveau.

Les avantages de cette approche sont considérables :

> **Gestion centralisée :** L\'ensemble du réseau peut être vu et géré comme un système unique et cohérent depuis le contrôleur.
>
> **Programmabilité et Automatisation :** Le comportement du réseau peut être programmé et automatisé via les API du contrôleur, permettant une adaptation rapide aux besoins changeants.
>
> **Agilité :** De nouveaux services et politiques peuvent être déployés rapidement par logiciel, sans avoir à reconfigurer manuellement des centaines d\'appareils.

### NFV (Network Function Virtualization)

La **NFV** est un concept complémentaire au SDN qui s\'attaque à un autre aspect de la rigidité des réseaux traditionnels : la dépendance au matériel propriétaire.

> **Le paradigme :** La NFV vise à **découpler les fonctions réseau du matériel spécialisé** sur lequel elles s\'exécutent traditionnellement. Des fonctions comme le routage, le pare-feu, l\'équilibrage de charge, la détection d\'intrusion, qui étaient auparavant implémentées dans des boîtiers matériels dédiés, sont transformées en logiciels.
>
> **Architecture :** Ces fonctions deviennent des **Fonctions Réseau Virtuelles (VNF)**. Une VNF est une instance logicielle qui s\'exécute sur du matériel informatique standard et banalisé (**COTS - Commercial Off-The-Shelf**), comme des serveurs x86, au sein d\'un environnement de virtualisation (utilisant des hyperviseurs comme KVM ou des conteneurs comme Docker).

Les bénéfices de la NFV sont alignés sur ceux du cloud computing :

> **Réduction des coûts :** Diminution des dépenses d\'investissement (CAPEX) en remplaçant le matériel coûteux et spécialisé par des serveurs standards, et des dépenses d\'exploitation (OPEX) grâce à l\'automatisation.
>
> **Flexibilité et Rapidité :** De nouveaux services réseau peuvent être déployés en quelques minutes en instanciant une nouvelle VNF, au lieu de semaines ou de mois nécessaires pour acheter et installer un nouvel équipement physique.
>
> **Élasticité :** La capacité d\'une fonction réseau peut être augmentée ou diminuée dynamiquement (*scaling*) en fonction de la demande, en allouant simplement plus ou moins de ressources virtuelles.

Le SDN et la NFV sont souvent déployés ensemble. La NFV fournit les briques de service virtuelles (les VNF), et le SDN fournit le \"ciment\" programmable pour les connecter et les orchestrer de manière dynamique, un concept connu sous le nom de **chaînage de fonctions de service (*Service Function Chaining*)**.

### Réseaux sans fil et cellulaires

Les paradigmes SDN et NFV ne sont pas limités aux réseaux filaires des centres de données ; ils sont au cœur de la révolution en cours dans les réseaux sans fil et cellulaires.

> **Wi-Fi (IEEE 802.11) :** L\'évolution des réseaux Wi-Fi a été principalement marquée par une augmentation constante du débit. Chaque nouvelle norme a apporté des améliorations significatives :

**802.11b/g/n :** Opérant principalement dans la bande des 2.4 GHz, ces normes ont fait passer les débits de 11 Mbit/s à plusieurs centaines de Mbit/s.

**802.11ac (Wi-Fi 5) :** A généralisé l\'utilisation de la bande des 5 GHz, moins encombrée, et a introduit des technologies comme le MU-MIMO (Multi-User, Multiple Input, Multiple Output) pour servir plusieurs clients simultanément, poussant les débits au-delà du gigabit par seconde.

**802.11ax (Wi-Fi 6/6E) :** Se concentre non seulement sur le débit de pointe, mais surtout sur l\'efficacité dans les environnements denses (stades, aéroports). Il introduit l\'OFDMA (Orthogonal Frequency-Division Multiple Access), une technologie empruntée aux réseaux cellulaires, pour diviser un canal sans fil en de nombreuses sous-porteuses plus petites, permettant de servir des dizaines de clients simultanément et de réduire la latence. Le Wi-Fi 6E étend ces capacités à la nouvelle bande de fréquences des 6 GHz.

> **Réseaux Cellulaires (4G/5G) :**

**La 4G (LTE - Long-Term Evolution)** a été une étape cruciale en faisant passer les réseaux mobiles à une architecture \"tout-IP\". Le cœur de réseau, appelé **EPC (Evolved Packet Core)**, a unifié la voix et les données sur IP, mais son architecture restait largement basée sur des équipements physiques spécialisés.

**La 5G** représente une refonte architecturale bien plus profonde. Elle est la première génération de technologie cellulaire conçue nativement sur les principes du SDN et de la NFV. Son cœur de réseau adopte une\
**Architecture Basée sur les Services (SBA - Service-Based Architecture)**, où les fonctions monolithiques de la 4G (comme le MME) sont décomposées en microservices virtualisés (VNF ou CNF - Cloud-native Network Functions) qui communiquent entre eux via des API web.

Cette architecture \"cloud-native\" permet une innovation majeure : le **Network Slicing** (découpage du réseau en tranches). Un opérateur peut créer, sur une seule et même infrastructure physique, de multiples réseaux virtuels de bout en bout, logiquement isolés les uns des autres. Chaque \"tranche\" peut être optimisée pour un cas d\'usage spécifique avec des caractéristiques de performance garanties  :

> Une tranche **eMBB (Enhanced Mobile Broadband)** pour le très haut débit (vidéo 4K, réalité virtuelle).
>
> Une tranche **URLLC (Ultra-Reliable Low-Latency Communications)** pour les applications critiques (véhicules autonomes, chirurgie à distance).
>
> Une tranche **mMTC (Massive Machine-Type Communications)** pour connecter un très grand nombre d\'appareils IoT à faible consommation.

La 5G transforme ainsi le réseau de l\'opérateur d\'un système monolithique en une plateforme de services flexible et programmable, capable de fournir du \"réseau en tant que service\" (*Network-as-a-Service*).

### Conclusion

L\'exploration des couches Réseau et Transport révèle l\'essence de l\'architecture de l\'Internet : un système bâti sur des abstractions puissantes et des compromis ingénieux. La couche IP, avec son service minimaliste, a fourni la base universelle et scalable nécessaire à l\'interconnexion mondiale. Sur cette fondation volontairement précaire, la couche Transport, et en particulier TCP, a construit un édifice de fiabilité, de contrôle et d\'ordre, permettant l\'émergence des applications complexes qui façonnent notre monde numérique.

Ce chapitre a mis en lumière plusieurs thèmes récurrents. D\'abord, la tension constante entre la simplicité du cœur du réseau et la complexité requise aux extrémités, une incarnation du principe de bout en bout qui a permis à l\'Internet de croître de manière organique. Ensuite, le cycle d\'évolution réactive, où des solutions pragmatiques comme le CIDR et le NAT ont été inventées pour repousser les limites d\'une conception initiale qui n\'avait pas anticipé une telle croissance, au prix de nouvelles complexités. Enfin, nous observons aujourd\'hui une transformation fondamentale, où les principes de virtualisation et de programmabilité du cloud computing, incarnés par le SDN et la NFV, refaçonnent le réseau lui-même, le faisant passer d\'une collection d\'équipements matériels statiques à une infrastructure logicielle, dynamique et programmable. La 5G est le premier témoin à grande échelle de cette nouvelle ère.

Les protocoles décrits ici ne sont pas de simples artefacts techniques ; ils sont le langage qui permet à des milliards d\'appareils de collaborer. Comprendre leur fonctionnement, leurs forces et leurs faiblesses, c\'est comprendre les fondements théoriques et pratiques sur lesquels reposent les systèmes complexes de notre ère de l\'information.

