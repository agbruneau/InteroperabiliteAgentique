# Chapitre I.15 : Systèmes d\'Entrée/Sortie (I/O) et Calcul Accéléré

## Introduction

Le rôle des systèmes d\'Entrée/Sortie (I/O) et des architectures de calcul accéléré est fondamental dans la conception des systèmes informatiques modernes. Loin d\'être de simples interfaces pour périphériques, les systèmes d\'I/O constituent le système nerveux central de l\'informatique contemporaine, orchestrant le flux vital de données entre les unités de traitement, la mémoire et le monde extérieur. Parallèlement, le calcul accéléré est devenu la réponse incontournable aux limites intrinsèques des processeurs à usage général, confrontés à la croissance exponentielle des charges de travail intensives en données, telles que l\'intelligence artificielle (IA), l\'analyse de données à grande échelle et le calcul haute performance (HPC). Ces deux domaines, autrefois distincts, sont aujourd\'hui profondément imbriqués, car la performance des accélérateurs les plus puissants dépend directement de la capacité du sous-système d\'I/O à les alimenter en données à une vitesse suffisante.

Ce chapitre propose une exploration exhaustive de cette symbiose, en suivant une trajectoire logique qui part des fondements de la communication entre un processeur et un périphérique pour aboutir aux paradigmes de calcul hétérogènes et complexes qui définissent les supercalculateurs et les centres de données actuels. Nous commencerons par disséquer les mécanismes fondamentaux de gestion des événements, tels que les interruptions et l\'accès direct à la mémoire (DMA), qui ont permis de surmonter les premiers goulots d\'étranglement. Ensuite, nous examinerons les architectures d\'interconnexion modernes, notamment PCI Express (PCIe) et Universal Serial Bus (USB), qui ont évolué pour devenir de véritables tissus de communication à haute vitesse, s\'apparentant davantage à des réseaux sur carte mère qu\'à de simples bus. Enfin, nous plongerons au cœur de l\'ère du calcul accéléré, en analysant et en comparant les architectures dominantes --- les processeurs graphiques (GPU), les Tensor Processing Units (TPU) et les circuits logiques programmables (FPGA) --- qui effectuent aujourd\'hui la majorité des calculs intensifs. Le thème central de ce parcours est la transition d\'un modèle de calcul homogène et centré sur le processeur (CPU-centric) vers un modèle hétérogène et centré sur les données (data-centric).

Cette transformation architecturale n\'est pas le fruit du hasard, mais une réponse directe à une rupture fondamentale dans l\'évolution de la microélectronique. Pendant près de cinquante ans, l\'industrie a été portée par deux principes directeurs : la loi de Moore, qui prédisait le doublement régulier de la densité des transistors, et la mise à l\'échelle de Dennard, qui assurait que des transistors plus petits consommaient proportionnellement moins d\'énergie. Cette dernière loi, en particulier, permettait d\'augmenter la fréquence des processeurs à chaque génération sans risquer la surchauffe. Cependant, au milieu des années 2000, la mise à l\'échelle de Dennard a atteint ses limites physiques en raison des courants de fuite, créant un \"mur de la puissance\" infranchissable. Simultanément, la progression de la loi de Moore a commencé à ralentir et à devenir plus coûteuse. Incapables d\'augmenter davantage la vitesse d\'un seul cœur, les architectes ont été contraints de chercher la performance ailleurs : d\'abord dans le parallélisme multi-cœur, puis, de manière plus radicale, dans la spécialisation. C\'est ce contexte de crise et de réinvention qui a catalysé l\'essor fulgurant du calcul accéléré et des architectures spécifiques à un domaine (DSA), un paradigme qui redéfinit aujourd\'hui les fondements mêmes de la science et du génie informatiques.

## Partie I : Fondements des Systèmes d\'Entrées/Sorties

Avant d\'explorer les interconnexions à très haute vitesse et les accélérateurs complexes, il est impératif de comprendre les mécanismes fondamentaux qui régissent la communication entre un processeur central et les dispositifs qui l\'entourent. Cette première partie établit les principes de base de la gestion des événements et du transfert de données, des concepts qui, bien qu\'ayant évolué, demeurent la pierre angulaire de tous les systèmes d\'I/O modernes.

### Section 1 : La Problématique des Entrées/Sorties et la Gestion des Événements

Le défi central de la gestion des entrées/sorties réside dans la disparité fondamentale entre la vitesse du processeur et celle des périphériques. Le CPU opère à des fréquences de l\'ordre du gigahertz, exécutant des milliards d\'instructions par seconde, tandis que les périphériques, qu\'il s\'agisse d\'un clavier, d\'un disque dur ou d\'une carte réseau, réagissent à des événements externes dont le rythme est plusieurs ordres de grandeur plus lent et souvent imprévisible. La question cruciale est donc de savoir comment le système peut gérer ces événements asynchrones et lents de la manière la plus efficace possible, sans paralyser le processeur.

#### 1.1 Le Dilemme Fondamental : Le Polling vs. les Interruptions

Deux stratégies principales s\'opposent pour résoudre ce dilemme : la scrutation active (polling) et les interruptions.

Le **polling** est une approche synchrone et logicielle. Le processeur vérifie de manière active et continue l\'état d\'un périphérique dans une boucle pour savoir s\'il requiert une attention, par exemple si une nouvelle donnée est disponible. Cette méthode se distingue par sa simplicité de mise en œuvre et son comportement entièrement prédictible, car la détection de l\'événement est directement contrôlée par le logiciel. Cependant, son principal inconvénient est son inefficacité. Pendant qu\'il scrute le périphérique, le CPU consomme des cycles de calcul qui pourraient être utilisés pour d\'autres tâches. Si les événements sont rares, le processeur passe la grande majorité de son temps dans une boucle d\'attente stérile. De plus, la latence --- le temps écoulé entre l\'occurrence de l\'événement et sa détection --- dépend directement de la fréquence de la scrutation. Une scrutation trop fréquente gaspille les ressources, tandis qu\'une scrutation trop espacée augmente la latence, rendant cette approche mal adaptée aux systèmes temps réel critiques.

À l\'opposé, le mécanisme des **interruptions** est une approche asynchrone et matérielle. Au lieu que le CPU interroge le périphérique, c\'est le périphérique lui-même qui signale au CPU qu\'il a besoin d\'attention en activant une ligne électrique dédiée. Cette approche événementielle (event-driven) est fondamentalement plus efficace. Le CPU peut exécuter d\'autres tâches et ne sera dérangé que lorsqu\'un événement d\'I/O se produit réellement, ce qui préserve les ressources et garantit une faible latence de réponse, même pour des événements rares et imprévisibles. En contrepartie, la gestion des interruptions est plus complexe, car elle implique une sauvegarde et une restauration du contexte d\'exécution du programme en cours, ce qui engendre un certain surcoût (overhead).

Pendant des décennies, le dogme de l\'architecture des systèmes a été que les interruptions sont intrinsèquement supérieures au polling pour la quasi-totalité des cas d\'usage. Cependant, l\'émergence de périphériques de stockage à très faible latence, basés sur des mémoires non volatiles de nouvelle génération, a introduit une nuance paradoxale. Le coût fixe associé au traitement d\'une interruption (sauvegarde du contexte, exécution de la routine de service, restauration du contexte) n\'est pas nul. Pour des périphériques dont la latence de réponse est de l\'ordre de la microseconde, ce surcoût peut devenir supérieur au temps d\'attente de l\'événement lui-même. Dans de tels scénarios, il devient plus performant pour le pilote de \"gaspiller\" des cycles CPU dans une boucle de scrutation très courte que de payer le prix d\'un changement de contexte complet via une interruption. Ce retour en grâce du polling dans des niches de très haute performance illustre un principe clé : le choix de la stratégie d\'I/O optimale dépend toujours d\'un compromis entre les caractéristiques du matériel et les objectifs de performance du logiciel.

#### 1.2 Le Mécanisme des Interruptions Matérielles (IRQ)

L\'évolution de la gestion des interruptions matérielles est un miroir fidèle de la complexification croissante des architectures informatiques. Chaque nouvelle technologie a été une réponse directe aux limites de la précédente, dictée par l\'augmentation du nombre de périphériques, l\'avènement du multiprocesseur et la montée en puissance des interconnexions à haute vitesse.

Dans les premières architectures de PC, la gestion des interruptions était confiée à un composant appelé **Programmable Interrupt Controller (PIC)**, typiquement le circuit Intel 8259. Un unique PIC pouvait gérer jusqu\'à 8 lignes d\'interruption, ou **Interrupt ReQuest lines (IRQ)**. Pour dépasser cette limite, une architecture en cascade a été adoptée, où un second PIC (esclave) était connecté à une des entrées du premier (maître), portant le total à 15 IRQ utilisables (IRQ 0 à 15). Ce système, bien qu\'efficace pour les machines mono-processeur, souffrait de limitations majeures, notamment le partage d\'une même ligne d\'IRQ par plusieurs périphériques, une source fréquente de conflits matériels et de latence.

L\'introduction des systèmes multiprocesseurs (SMP) a rendu le modèle du PIC obsolète. Il était en effet incapable de router une interruption vers un processeur spécifique, une fonctionnalité essentielle pour répartir la charge et optimiser les performances. La réponse fut l\'**Advanced Programmable Interrupt Controller (APIC)**. L\'architecture APIC est divisée en deux composants : le **Local APIC (LAPIC)**, intégré à chaque cœur de processeur, et le **I/O APIC**, situé sur la carte mère pour collecter les signaux d\'interruption des bus de périphériques. Le I/O APIC contient une table de redirection qui permet d\'acheminer chaque interruption externe vers un LAPIC spécifique (et donc un cœur de CPU spécifique), selon des politiques de distribution de charge (par exemple, au processeur le moins occupé). L\'APIC a également considérablement augmenté le nombre de vecteurs d\'interruption disponibles, passant de 16 à 256, éliminant ainsi la plupart des problèmes de partage d\'IRQ.

Toutefois, même l\'APIC reposait encore sur un nombre limité de lignes physiques. L\'avènement de bus à très haute vitesse comme le PCI Express, capable de connecter des périphériques extrêmement complexes (GPU, cartes réseau 100 Gbit/s) générant des milliers d\'événements par seconde, a nécessité une rupture plus radicale. C\'est ainsi que sont apparues les **Interruptions Signalées par Message (MSI et MSI-X)**. Ce mécanisme abandonne complètement les lignes d\'IRQ physiques (signalisation \"out-of-band\") au profit de messages transmis directement sur le bus de données (signalisation \"in-band\"). Pour déclencher une interruption, un périphérique n\'active plus une broche, mais effectue une écriture à une adresse mémoire spécifique qui lui a été assignée par le système d\'exploitation.

Les avantages de cette approche sont considérables. Premièrement, elle élimine définitivement les conflits liés au partage de lignes physiques. Deuxièmement, elle offre une granularité bien plus fine : un seul périphérique peut se voir allouer de multiples messages d\'interruption, chacun avec son propre vecteur et potentiellement sa propre routine de service. La spécification MSI permet jusqu\'à 32 messages par fonction de périphérique, tandis que son extension, MSI-X, en autorise jusqu\'à 2048. Cette capacité est cruciale pour les périphériques modernes qui gèrent de multiples files d\'attente ou sources d\'événements. Le support de MSI/MSI-X étant obligatoire dans la spécification PCIe, il est devenu le standard de fait pour la gestion des interruptions dans tous les systèmes contemporains.

#### 1.3 La Routine de Service d\'Interruption (ISR)

Lorsqu\'une interruption est validée par le processeur, celui-ci suspend son travail en cours pour exécuter une fonction logicielle spécifique appelée **Interrupt Service Routine (ISR)** ou gestionnaire d\'interruption. L\'ISR est le code qui effectue le travail nécessaire pour répondre à la requête du périphérique. Le processus d\'invocation d\'une ISR est une séquence d\'opérations critiques et précisément orchestrée :

1.  **Fin de l\'Instruction en Cours :** Le processeur termine l\'exécution de l\'instruction machine en cours pour garantir un état cohérent.

2.  **Sauvegarde du Contexte :** Le processeur sauvegarde automatiquement l\'état du programme interrompu. Cela inclut à minima le compteur de programme (l\'adresse de la prochaine instruction à exécuter) et le registre d\'état (les flags). Cette sauvegarde se fait généralement sur la pile système.

3.  **Identification et Lancement de l\'ISR :** Le processeur utilise le numéro de vecteur d\'interruption fourni par le contrôleur (PIC, APIC ou via un message MSI) comme index dans une table spéciale en mémoire, appelée **Table de Vecteurs d\'Interruption (IVT)**. Cette table contient les adresses de départ de toutes les ISR. Le processeur charge l\'adresse correspondante dans le compteur de programme et commence l\'exécution de l\'ISR.

4.  **Traitement de l\'Interruption :** L\'ISR exécute le code nécessaire pour servir le périphérique. Cela peut être, par exemple, la lecture d\'un octet depuis le port d\'un clavier, la copie d\'un paquet réseau depuis le tampon d\'une carte réseau, ou simplement l\'enregistrement qu\'un transfert de données est terminé.

5.  **Restauration du Contexte et Retour :** Une fois son travail terminé, l\'ISR exécute une instruction spéciale de retour d\'interruption (par exemple, IRET sur x86). Cette instruction provoque la restauration par le processeur du contexte qui avait été sauvegardé sur la pile. Le programme initial reprend alors son exécution exactement là où il avait été interrompu, de manière totalement transparente.

La conception d\'une ISR est soumise à des contraintes strictes. Pendant l\'exécution d\'une ISR, les interruptions de priorité inférieure (voire toutes les interruptions) sont souvent masquées. Une ISR trop longue augmenterait donc la **latence d\'interruption**, c\'est-à-dire le temps pendant lequel le système ne peut pas répondre à d\'autres événements. La règle d\'or est de rendre les ISR aussi courtes et rapides que possible. Idéalement, l\'ISR se contente d\'effectuer le minimum de travail critique (par exemple, lire les données du registre du périphérique et les placer dans un tampon en mémoire) et de différer le traitement plus lourd (l\'analyse des données, par exemple) à une tâche normale du système d\'exploitation qui sera planifiée ultérieurement.

### Section 2 : Transfert de Données à Haute Performance : L\'Accès Direct à la Mémoire (DMA)

Si les interruptions résolvent le problème de la gestion efficace des événements, elles ne règlent pas celui du transfert de grandes quantités de données. Pour des opérations impliquant des mégaoctets ou des gigaoctets de données, comme la lecture d\'un fichier depuis un SSD ou la réception d\'un flux vidéo, l\'implication du CPU dans le déplacement de chaque octet constituerait un goulot d\'étranglement majeur. L\'Accès Direct à la Mémoire (DMA) est le mécanisme matériel conçu pour résoudre ce problème en déchargeant le CPU de cette tâche répétitive.

#### 2.1 Le Principe du DMA : Libérer le Processeur

L\'**E/S programmée (Programmed I/O)** est la méthode de transfert de données la plus simple : le CPU exécute des instructions pour lire un mot de données depuis un périphérique et l\'écrire en mémoire, et répète ce processus jusqu\'à ce que tout le bloc soit transféré. Cette approche, bien que simple, est extrêmement inefficace car elle monopolise entièrement le processeur, l\'empêchant d\'effectuer tout autre travail utile pendant le transfert.

Le **DMA** propose une solution élégante à ce problème. Il s\'agit d\'une fonctionnalité matérielle qui permet à un périphérique de lire ou d\'écrire des données directement dans la mémoire principale du système, sans aucune intervention du CPU, excepté pour l\'initialisation et la finalisation du transfert. Le CPU se contente de programmer le contrôleur DMA avec les détails de l\'opération (source, destination, taille), puis peut se consacrer à d\'autres tâches. Une fois le transfert terminé, le contrôleur DMA notifie le CPU via une interruption, lui signalant que les données sont prêtes ou que le tampon est libre.

Cette délégation transforme fondamentalement la nature du goulot d\'étranglement des E/S. Sans DMA, la performance est limitée par la vitesse de calcul du CPU. Avec le DMA, la performance est limitée par la bande passante du bus mémoire et par l\'efficacité avec laquelle l\'accès à cette ressource partagée est géré. Le DMA ne fait pas que décharger le CPU ; il introduit une nouvelle couche de complexité dans le système, centrée sur la gestion de la concurrence pour l\'accès à la mémoire et, comme nous le verrons, sur le maintien de la cohérence des données.

#### 2.2 Le Contrôleur DMA (DMAC)

Le processus de transfert DMA est orchestré par un composant matériel spécialisé, le **contrôleur DMA (DMAC)**. Ce dernier peut être une puce distincte sur la carte mère ou, plus couramment aujourd\'hui, être intégré dans le chipset du système ou même directement dans le périphérique lui-même (on parle alors de \"bus mastering\" ou de DMA de première partie). Un DMAC typique contient un ensemble de registres internes qui sont programmés par le CPU  :

- Un **registre d\'adresse**, qui contient l\'adresse de départ en mémoire pour le transfert.

- Un **registre de comptage**, qui contient le nombre d\'octets ou de mots à transférer.

- Un **registre de contrôle**, qui spécifie la direction du transfert (lecture depuis le périphérique vers la mémoire, ou écriture de la mémoire vers le périphérique) et le mode de fonctionnement.

Le déroulement d\'un transfert DMA orchestré par un DMAC tiers est le suivant  :

1.  Le pilote de périphérique, s\'exécutant sur le CPU, écrit les informations nécessaires (adresse, taille, direction) dans les registres du DMAC.

2.  Le DMAC envoie une requête de prise de contrôle du bus système au CPU (signal HOLD ou DRQ).

3.  Le CPU, à la fin de son cycle d\'instruction courant, libère les bus d\'adresse, de données et de contrôle, et envoie un accusé de réception au DMAC (signal HLDA).

4.  Le DMAC devient le \"maître du bus\". Il génère les adresses mémoire et les signaux de contrôle (lecture/écriture) pour transférer les données directement entre le périphérique et la mémoire.

5.  Pour chaque mot transféré, le DMAC incrémente son registre d\'adresse et décrémente son registre de comptage.

6.  Lorsque le registre de comptage atteint zéro, le transfert est terminé. Le DMAC libère le bus système et envoie une interruption au CPU pour l\'informer de l\'achèvement de l\'opération.

Les DMAC peuvent opérer selon plusieurs modes, offrant différents compromis entre la vitesse de transfert et l\'impact sur les performances du CPU  :

- **Mode Rafale (Burst Mode) :** Le DMAC garde le contrôle exclusif du bus jusqu\'à ce que l\'intégralité du bloc de données soit transférée. C\'est le mode le plus rapide, mais il rend le CPU inactif pendant une période potentiellement longue.

- **Mode Vol de Cycle (Cycle Stealing Mode) :** Le DMAC effectue des transferts d\'un seul mot à la fois. Entre chaque mot, il rend le contrôle du bus au CPU. Cela ralentit le transfert global mais permet au CPU de continuer à travailler, avec une performance légèrement dégradée.

- **Mode Transparent :** Le DMAC attend que le CPU exécute des instructions qui ne nécessitent pas l\'accès au bus mémoire pour effectuer ses transferts. Ce mode n\'a aucun impact sur les performances du CPU mais est le plus lent et nécessite une logique matérielle plus complexe pour détecter les cycles de bus inactifs.

#### 2.3 Le Défi de la Cohérence du Cache

L\'introduction des caches de CPU, conçue pour masquer la latence de la mémoire principale, a créé un effet secondaire majeur pour les opérations DMA. Le système de cache fournit au CPU l\'illusion d\'un espace mémoire unique et cohérent, mais en réalité, l\'état le plus récent de certaines données peut se trouver dans un cache plutôt que dans la RAM. Le DMAC, opérant traditionnellement directement sur la RAM, peut donc lire ou écrire des données obsolètes, brisant cette illusion et créant des problèmes de cohérence de cache.

Deux scénarios problématiques principaux existent :

1.  **DMA en lecture (depuis la mémoire vers un périphérique) :** Le CPU écrit des données dans un tampon en mémoire. Ces données sont placées dans le cache du CPU. Si un transfert DMA est initié pour envoyer ce tampon à un périphérique, le DMAC lira les anciennes données de la RAM, car la version la plus récente est toujours dans le cache et n\'a pas encore été écrite en mémoire (dans le cas d\'un cache \"write-back\").

2.  **DMA en écriture (depuis un périphérique vers la mémoire) :** Un périphérique écrit de nouvelles données via DMA dans un tampon en RAM. Si le CPU avait précédemment lu cette zone mémoire, il en possède une copie dans son cache. Toute lecture ultérieure par le CPU renverra les données obsolètes (\"stale data\") de son cache, ignorant les nouvelles données écrites par le DMA en RAM.

Pour résoudre ces problèmes, plusieurs stratégies de maintien de la cohérence ont été développées :

- **Gestion logicielle (DMA non cohérent) :** Dans les systèmes plus anciens ou plus simples, la responsabilité de la cohérence incombe au logiciel (le pilote de périphérique). Avant de lancer un transfert DMA en lecture, le pilote doit explicitement exécuter des instructions pour **vider (flush)** les lignes de cache pertinentes, forçant l\'écriture de toutes les données modifiées vers la RAM. Après un transfert DMA en écriture, le pilote doit **invalider** les lignes de cache correspondantes pour forcer le CPU à les relire depuis la RAM lors du prochain accès. Ces opérations sont coûteuses en termes de performance.

- **Gestion matérielle (DMA cohérent) :** Les architectures modernes implémentent la cohérence au niveau matériel. Une technique courante est le **bus snooping** (ou espionnage de bus). Les contrôleurs de cache de chaque CPU \"espionnent\" en permanence les transactions sur le bus mémoire. Si un DMAC tente de lire une adresse pour laquelle un cache détient une version modifiée (\"dirty\"), le contrôleur de cache intercepte la requête, suspend le DMAC, écrit la donnée à jour en RAM, puis laisse le DMAC continuer. Si un DMAC écrit à une adresse présente dans un cache, le contrôleur de ce cache détecte l\'écriture et invalide sa propre copie. Dans les systèmes les plus avancés, le DMAC peut être un participant à part entière du protocole de cohérence, capable de communiquer directement avec les caches pour obtenir les données les plus récentes, sans passer systématiquement par la RAM.

## Partie II : Les Interconnexions Modernes

Les mécanismes fondamentaux d\'interruption et de DMA posent les bases de la communication, mais la performance globale d\'un système moderne dépend de la vitesse et de l\'efficacité du \"tissu\" qui relie ses composants. Cette partie se penche sur les deux interconnexions les plus cruciales de l\'informatique contemporaine : PCI Express, l\'épine dorsale interne à haute performance, et USB, l\'interface externe qui a évolué vers une solution de connectivité universelle.

### Section 3 : PCI Express (PCIe) : L\'Épine Dorsale du Système

Le Peripheral Component Interconnect Express (PCIe) est la norme d\'interconnexion à haute vitesse qui a remplacé les anciens bus parallèles (PCI, PCI-X, AGP) pour connecter les composants les plus exigeants en bande passante, tels que les cartes graphiques, les SSD NVMe et les cartes réseau, à la carte mère.

#### 3.1 D\'une Architecture Parallèle à une Architecture Série

Le bus PCI traditionnel était une architecture parallèle partagée, où tous les périphériques se connectaient à un ensemble commun de lignes de données, d\'adresse et de contrôle. Cette conception, bien que révolutionnaire à son époque, a atteint ses limites physiques. Le principal obstacle était le **désalignement temporel (timing skew)** : sur un bus parallèle, les signaux électriques voyageant sur des conducteurs de longueurs légèrement différentes arrivent à destination à des instants distincts. À mesure que la fréquence d\'horloge augmentait, la période de l\'horloge devenait plus courte que ce désalignement, rendant impossible la reconstruction correcte des données. De plus, l\'architecture partagée créait une contention de bande passante, et le grand nombre de broches augmentait la complexité et le coût des cartes mères et des puces.

PCIe a résolu ces problèmes en adoptant une architecture série point-à-point, qui s\'apparente conceptuellement à un réseau plutôt qu\'à un bus. Au lieu d\'un bus partagé, PCIe utilise une topologie en étoile commutée. Chaque périphérique dispose d\'un lien dédié et direct vers un \"switch\", qui est généralement le **Root Complex** intégré au CPU ou au chipset. Un lien PCIe est composé d\'une ou plusieurs

**lignes (lanes)**. Chaque ligne est une paire de connexions différentielles full-duplex : une paire pour transmettre et une pour recevoir, permettant une communication bidirectionnelle simultanée. Cette approche point-à-point élimine la contention de bande passante. De plus, la communication série, où l\'horloge est intégrée au flux de données, supprime le problème du timing skew, ce qui permet d\'atteindre des fréquences de fonctionnement beaucoup plus élevées.

#### 3.2 L\'Architecture en Couches de PCIe

L\'architecture PCIe est structurée en trois couches logiques distinctes, une approche qui rappelle le modèle OSI des réseaux et qui permet de séparer les différentes fonctions du protocole. Cette conception est si fondamentale qu\'elle conduit à une conclusion importante : PCIe n\'est pas un \"bus\" au sens traditionnel, mais un véritable réseau sur carte mère. Il utilise une topologie commutée point-à-point, une communication par paquets, et une pile protocolaire en couches avec des mécanismes de fiabilité, tout comme un réseau local (LAN). Cette perspective permet de comprendre pourquoi des protocoles de plus haut niveau comme NVMe ou Ethernet peuvent être si facilement encapsulés et transportés sur PCIe.

Les trois couches sont :

- **La Couche de Transaction (Transaction Layer) :** C\'est la couche la plus élevée, en interface avec la couche logicielle (pilote de périphérique). Son rôle est de créer et d\'interpréter les paquets qui transportent la sémantique des opérations. Elle assemble les requêtes de lecture/écriture mémoire, d\'I/O ou de configuration, ainsi que les messages, dans des paquets appelés **Transaction Layer Packets (TLPs)**. Chaque TLP contient un en-tête détaillé spécifiant le type de transaction, l\'adresse, la taille des données, et un identifiant unique pour le demandeur, ce qui permet d\'associer les réponses (complétions) aux requêtes initiales. Cette couche est également responsable de la gestion d\'un mécanisme de contrôle de flux basé sur des crédits, qui garantit qu\'un émetteur n\'envoie un TLP que si le récepteur a suffisamment d\'espace dans son tampon pour le recevoir, évitant ainsi les pertes de paquets dues à la congestion.

- **La Couche de Liaison de Données (Data Link Layer) :** Cette couche intermédiaire a pour mission de garantir un transport fiable des TLPs sur un lien PCIe point-à-point, qui peut être sujet à des erreurs de transmission. Pour ce faire, elle ajoute deux éléments à chaque TLP reçu de la couche de transaction : un numéro de séquence sur 12 bits et un code de redondance cyclique de 32 bits (appelé LCRC - Link CRC). Le récepteur utilise le LCRC pour vérifier l\'intégrité du paquet et le numéro de séquence pour détecter les paquets perdus ou dupliqués. Un protocole d\'acquittement positif/négatif (ACK/NAK) est mis en œuvre : pour chaque TLP reçu correctement, le récepteur renvoie un paquet de liaison de données (\
  **Data Link Layer Packet - DLLP**) de type ACK. Si une erreur est détectée (LCRC invalide ou numéro de séquence incorrect), il renvoie un NAK. À la réception d\'un NAK ou en l\'absence d\'ACK après un certain délai, l\'émetteur retransmet automatiquement le TLP depuis un tampon de rejeu.

- **La Couche Physique (Physical Layer) :** C\'est la couche la plus basse, responsable de la transmission et de la réception effectives du flux de bits sur les lignes physiques. Elle est elle-même divisée en une sous-couche logique et une sous-couche électrique. La sous-couche logique prend les paquets de la couche de liaison, ajoute des symboles de début et de fin pour le cadrage, et applique un schéma de codage pour garantir une transmission fiable. Les premières générations de PCIe utilisaient un codage 8b/10b, qui assure des transitions de signal suffisantes pour la récupération de l\'horloge mais introduit un surcoût de 20%. À partir de PCIe 3.0, un codage 128b/130b beaucoup plus efficace a été adopté. Un \"scrambler\" est également utilisé pour éviter les longues séquences répétitives de bits. La sous-couche électrique contient les circuits analogiques, notamment le\
  **SerDes (Serializer/Deserializer)**, qui convertit les données parallèles en un flux série pour la transmission, et inversement à la réception. Une fonction essentielle de cette couche est l\'initialisation et l\'entraînement du lien (**Link Training**), un processus de négociation au démarrage où les deux dispositifs connectés s\'accordent sur la vitesse de fonctionnement (par exemple, 8.0 GT/s) et la largeur du lien (par exemple, x16).

#### 3.3 Flux de Paquets à travers la Pile Protocolaire

Le processus de transmission d\'une requête, par exemple une lecture mémoire, illustre l\'interaction entre les couches :

1.  **Côté Émetteur :** Le pilote de périphérique sur le CPU initie l\'opération. La couche de transaction de l\'émetteur (par exemple, le Root Complex) crée un TLP de requête de lecture mémoire, contenant l\'adresse et la taille des données à lire. Ce TLP est transmis à la couche de liaison de données, qui lui ajoute un numéro de séquence et un LCRC. Le paquet résultant est passé à la couche physique, qui ajoute des symboles de cadrage, le code, le brouille et le sérialise pour l\'envoyer sur les lignes physiques.

2.  **Côté Récepteur :** La couche physique du récepteur (par exemple, un Endpoint) reçoit le signal, le désérialise, le décode et supprime le cadrage pour reconstituer le paquet de la couche de liaison. Cette dernière vérifie le LCRC et le numéro de séquence. Si tout est correct, elle transmet le TLP à sa couche de transaction et envoie un DLLP de type ACK à l\'émetteur. La couche de transaction du récepteur interprète le TLP de requête, récupère les données demandées de sa mémoire locale et initie une transaction de retour. Elle crée un TLP de complétion contenant les données lues, qui suivra le même chemin en sens inverse pour atteindre le demandeur initial.

#### 3.4 Évolution des Générations PCIe : Une Course à la Bande Passante

La caractéristique la plus remarquable de PCIe est sa capacité à doubler sa bande passante environ tous les trois à quatre ans, répondant ainsi aux demandes toujours croissantes des GPU et autres accélérateurs. Cette évolution a été rendue possible par des avancées significatives dans les technologies de codage et de signalisation.

- **PCIe 1.0 (2003) et 2.0 (2007) :** Ces premières versions utilisaient une signalisation binaire simple **NRZ (Non-Return-to-Zero)** et un codage **8b/10b**. Pour chaque 8 bits de données, 10 bits étaient transmis sur la ligne, ce qui représente un surcoût de 20%. PCIe 1.0 offrait un taux de transfert de 2.5 GT/s (gigatransferts par seconde) par ligne, soit 250 Mo/s de débit utile. PCIe 2.0 a doublé ce taux à 5.0 GT/s, soit 500 Mo/s par ligne.

- **PCIe 3.0 (2010), 4.0 (2017) et 5.0 (2019) :** Pour dépasser les 5.0 GT/s, le surcoût du codage 8b/10b devenait prohibitif. PCIe 3.0 a introduit un codage beaucoup plus efficace, le **128b/130b**, où 128 bits de données sont transmis dans un paquet de 130 bits, réduisant le surcoût à moins de 2%. Ce changement a permis d\'atteindre 8.0 GT/s (soit environ 985 Mo/s de débit utile par ligne) sans avoir à augmenter radicalement la fréquence du signal. Les générations 4.0 et 5.0 ont conservé ce codage tout en doublant successivement le taux de transfert à 16.0 GT/s et 32.0 GT/s, respectivement.

- **PCIe 6.0 (2022) et 7.0 (prévu pour 2025) :** Pour continuer à doubler la bande passante, une autre rupture technologique était nécessaire. PCIe 6.0 a introduit la signalisation **PAM4 (Pulse Amplitude Modulation with 4 levels)**. Contrairement à la signalisation NRZ qui utilise deux niveaux de tension pour représenter 0 ou 1, PAM4 en utilise quatre, permettant de coder deux bits d\'information dans chaque symbole. Cela double le débit de données pour une même fréquence de signal. Cependant, les quatre niveaux de tension étant plus proches les uns des autres, le signal est plus sensible au bruit, ce qui augmente le taux d\'erreur binaire (BER). Pour compenser, PCIe 6.0 a introduit deux mécanismes supplémentaires : une\
  **Correction d\'Erreurs Anticipée (Forward Error Correction - FEC)** légère, qui peut corriger les erreurs à la volée, et un passage à des paquets de taille fixe appelés **FLITs (Flow Control Units)**, qui simplifie la gestion des erreurs et du protocole. PCIe 6.0 atteint ainsi 64 GT/s par ligne, et PCIe 7.0 est prévu pour doubler encore ce chiffre à 128 GT/s.

Le tableau suivant synthétise cette progression impressionnante, illustrant comment les innovations en matière de codage et de signalisation ont permis une croissance exponentielle de la bande passante disponible pour les composants internes.

#### Tableau 15.1 : Évolution des Spécifications PCI Express

  ---------- -------------- ------------------------ ------------------------------- -------------------------- ---------------------------
  Version    Année          Codage / Signalisation   Taux de Transfert (par ligne)   Bande Passante x1 (Go/s)   Bande Passante x16 (Go/s)

  1.0        2003           NRZ 8b/10b               2.5 GT/s                        0.25                       4

  2.0        2007           NRZ 8b/10b               5.0 GT/s                        0.5                        8

  3.0        2010           NRZ 128b/130b            8.0 GT/s                        ≈0.985                     ≈15.75

  4.0        2017           NRZ 128b/130b            16.0 GT/s                       ≈1.969                     ≈31.51

  5.0        2019           NRZ 128b/130b            32.0 GT/s                       ≈3.938                     ≈63.02

  6.0        2022           PAM4 + FEC (FLIT)        64.0 GT/s                       ≈7.563                     ≈121

  7.0        2025 (prévu)   PAM4 + FEC (FLIT)        128.0 GT/s                      ≈15.125                    ≈242
  ---------- -------------- ------------------------ ------------------------------- -------------------------- ---------------------------

Sources : 

### Section 4 : Universal Serial Bus (USB) et la Convergence des Interfaces

Si PCIe est le roi des interconnexions internes, l\'Universal Serial Bus (USB) est son équivalent pour le monde extérieur. Conçu à l\'origine pour unifier la myriade de ports lents (série, parallèle, PS/2) qui encombraient l\'arrière des PC, l\'USB a connu une évolution spectaculaire, le transformant d\'une simple interface pour périphériques en un tissu de communication externe polyvalent et à haute performance.

#### 4.1 Architecture et Topologie Fondamentales de l\'USB

L\'architecture de base de l\'USB est restée remarquablement stable depuis sa création. Elle repose sur une **topologie en étoile** stricte, avec un seul **hôte (host)**, généralement l\'ordinateur, qui agit comme le maître absolu du bus. Les périphériques (clavier, souris, imprimante) sont les esclaves et ne peuvent pas initier de communication. Ils se connectent à l\'hôte via des

**concentrateurs (hubs)**, qui étendent le nombre de ports disponibles. Le système peut supporter jusqu\'à 5 niveaux de hubs en cascade, pour un maximum de 127 périphériques par contrôleur hôte.

La communication est entièrement pilotée par l\'hôte (**host-driven**). L\'hôte interroge périodiquement chaque périphérique pour savoir s\'il a des données à envoyer ou s\'il est prêt à en recevoir. Le trafic sur le bus est organisé en **trames** (de 1 ms ou 125 µs), dans lesquelles l\'hôte alloue des tranches de temps pour les différentes transactions. Une transaction USB typique se compose de trois types de paquets : un

**paquet Jeton (Token Packet)** envoyé par l\'hôte pour initier la transaction (en spécifiant le type, la direction et l\'adresse du périphérique), un **paquet de Données (Data Packet)** contenant la charge utile, et un **paquet d\'Acquittement (Handshake Packet)** pour confirmer la bonne réception des données.

#### 4.2 Les Quatre Types de Transferts USB

L\'une des forces de l\'USB est sa capacité à offrir différentes \"qualités de service\" adaptées à des besoins très variés, grâce à quatre modes de transfert distincts.

- **Transfert de Contrôle :** Utilisé pour les opérations de configuration et de commande, comme l\'énumération d\'un périphérique lors de son branchement. Il garantit la livraison des données grâce à un mécanisme d\'acquittement et de retransmission, mais ne garantit ni la bande passante ni la latence.

- **Transfert par Interruption :** Conçu pour les périphériques qui transfèrent de petites quantités de données à intervalles réguliers et qui nécessitent une faible latence, comme les claviers et les souris. Le nom est trompeur : il ne s\'agit pas d\'interruptions matérielles au sens de l\'IRQ, mais d\'un polling que l\'hôte s\'engage à effectuer à une fréquence garantie, réservant ainsi une latence bornée.

- **Transfert en Bloc (Bulk) :** Optimisé pour le transfert de grandes quantités de données où la fiabilité est primordiale mais où la vitesse n\'est pas critique, comme pour une clé USB ou une imprimante. Ce mode utilise toute la bande passante disponible qui n\'est pas utilisée par les autres types de transfert. La livraison est garantie par des retransmissions en cas d\'erreur, mais il n\'y a aucune garantie sur la bande passante ou la latence.

- **Transfert Isochrone :** Destiné aux applications de streaming en temps réel, comme l\'audio ou la vidéo, qui nécessitent une bande passante constante et garantie. Pour maintenir une latence constante, ce mode ne dispose d\'aucun mécanisme de retransmission. Si un paquet est corrompu, il est simplement abandonné. Il garantit donc le débit au détriment de la fiabilité.

Le tableau suivant résume les caractéristiques et les compromis de ces quatre modes, qui permettent à l\'USB de s\'adapter à un éventail extraordinairement large de périphériques.

#### Tableau 15.2 : Comparaison des Modes de Transfert USB

  ------------------- ---------------------- ------------------- -------------------------------- ---------------------------------------
  Type de Transfert   Bande Passante         Latence             Garantie de Livraison            Cas d\'Usage Typique

  **Contrôle**        Faible, en rafales     Non garantie        Élevée (acquittement)            Énumération, configuration, commandes

  **Interruption**    Faible, garantie       Faible, garantie    Élevée (acquittement)            Clavier, souris, joystick

  **Bloc (Bulk)**     Élevée, non garantie   Élevée, variable    Élevée (retransmission)          Stockage de masse, imprimantes

  **Isochrone**       Garantie, constante    Faible, constante   Aucune (pas de retransmission)   Streaming audio/vidéo, webcams
  ------------------- ---------------------- ------------------- -------------------------------- ---------------------------------------

Sources : 

#### 4.3 L\'Ère de l\'USB-C et de l\'USB4 : Vers l\'Interface Universelle

L\'évolution la plus significative de l\'USB a été la transition d\'une simple interface pour périphériques vers un véritable tissu de communication externe. Cette transformation a été portée par l\'introduction du connecteur USB-C et du protocole USB4.

Le **connecteur USB-C** a marqué une première révolution en termes d\'ergonomie et de fonctionnalité. Petit, robuste et réversible, il a mis fin à la frustration des branchements. Plus important encore, il a été conçu pour être un support polyvalent pour de multiples protocoles. Il est crucial de distinguer le connecteur physique (USB-C) des protocoles qu\'il peut transporter (USB 3.2, USB4, Thunderbolt, DisplayPort, etc.). Parallèlement, la spécification

**USB Power Delivery (PD)** a permis de négocier des niveaux de puissance allant jusqu\'à 240W, transformant le câble USB-C en un standard pour l\'alimentation des ordinateurs portables et d\'une vaste gamme d\'appareils, unifiant ainsi la connectique de données et d\'alimentation.

La véritable convergence protocolaire est arrivée avec **USB4**. Basée sur la spécification **Thunderbolt 3**, qu\'Intel a contribuée à l\'USB Implementers Forum, la norme USB4 a fondamentalement changé la nature de l\'interface. Sa caractéristique la plus puissante est le

**partage dynamique de la bande passante**. Un lien USB4 (offrant jusqu\'à 40 Gbps, voire 80 Gbps pour la version 2.0) peut être partagé en temps réel entre plusieurs flux de données de protocoles différents. Ceci est réalisé par une technique appelée

**tunneling de protocoles** : les paquets USB 3.x, DisplayPort et même PCIe sont encapsulés dans des \"tunnels\" virtuels qui transitent simultanément sur le même câble physique USB-C. Cela permet, par exemple, de connecter une station d\'accueil à un ordinateur portable avec un seul câble USB4, et de faire fonctionner simultanément un écran 4K (via le tunnel DisplayPort), un SSD externe ultra-rapide (via le tunnel PCIe) et un clavier/souris (via le tunnel USB).

Il est important de noter la relation entre USB4 et **Thunderbolt 4**. Bien qu\'ils partagent la même technologie de base, Thunderbolt 4 est une implémentation certifiée par Intel qui impose des exigences minimales plus strictes. Par exemple, un port Thunderbolt 4 doit obligatoirement supporter une bande passante de 40 Gbps, la connexion de deux écrans 4K et une bande passante PCIe de 32 Gbps, alors que ces caractéristiques sont optionnelles pour un port USB4 standard. Thunderbolt 4 représente donc un sous-ensemble \"premium\" et garanti de l\'écosystème USB4, assurant une expérience utilisateur cohérente et de haute performance.

## Partie III : L\'Ère du Calcul Hétérogène et Accéléré

Nous entrons maintenant dans le cœur du sujet : la transformation radicale de l\'architecture informatique, forcée par les limites de la physique, qui a conduit à l\'abandon progressif du modèle de processeur universel au profit d\'un écosystème diversifié d\'accélérateurs spécialisés. Cette partie explique les raisons de cette transition et détaille les architectures qui dominent aujourd\'hui le paysage du calcul intensif.

### Section 5 : La Fin d\'une Ère : Limites des Architectures Universelles

Pendant plus de quatre décennies, l\'industrie informatique a bénéficié d\'une amélioration exponentielle et apparemment sans effort des performances, un phénomène si régulier qu\'il a été érigé en \"loi\". Cette période dorée a été gouvernée par deux principes fondamentaux dont la rupture simultanée a provoqué la plus grande réorientation architecturale depuis l\'invention du microprocesseur.

#### 5.1 La Loi de Moore : Un Moteur de Progrès et ses Limites

En 1965, Gordon Moore, co-fondateur d\'Intel, a observé que le nombre de composants sur un circuit intégré doublait environ chaque année. Il a plus tard révisé cette prédiction à un doublement tous les deux ans. Cette observation empirique, connue sous le nom de

**loi de Moore**, est devenue une prophétie auto-réalisatrice qui a rythmé les cycles d\'innovation de l\'industrie des semi-conducteurs pendant un demi-siècle. Elle a permis une augmentation exponentielle de la puissance de calcul, une densification de la mémoire et une réduction des coûts, alimentant la révolution numérique. Cependant, vers la fin des années 2010, bien que la densité de transistors ait continué de croître grâce à des innovations technologiques comme les transistors FinFET ou l\'empilement 3D de puces, le rythme de ce doublement a commencé à ralentir, et le coût par transistor a cessé de diminuer de manière significative. La loi de Moore, dans sa forme économique et temporelle classique, touchait à sa fin.

#### 5.2 La Mise à l\'Échelle de Dennard : Le Moteur Énergétique Silencieux

Si la loi de Moore expliquait pourquoi les puces devenaient plus denses, c\'est une autre loi, moins connue mais tout aussi importante, qui expliquait pourquoi elles devenaient plus rapides : la **mise à l\'échelle de Dennard**. Formulée en 1974 par Robert H. Dennard d\'IBM, cette loi stipulait qu\'en réduisant les dimensions d\'un transistor, sa consommation d\'énergie et le courant qui le traverse diminuaient proportionnellement, de sorte que la densité de puissance (la puissance consommée par unité de surface) restait constante.

Cette mise à l\'échelle était le moteur silencieux de l\'augmentation des performances. Parce que des transistors plus petits consommaient moins, les fabricants pouvaient en mettre deux fois plus sur une puce (loi de Moore) *et* augmenter leur fréquence de fonctionnement sans que la puce ne consomme plus d\'énergie ou ne surchauffe. C\'est cette synergie qui a permis aux fréquences d\'horloge des CPU de passer de quelques mégahertz à plusieurs gigahertz.

Cependant, vers 2005-2006, ce mécanisme vertueux s\'est brisé. À des finesses de gravure de l\'ordre de 90 nm puis 65 nm, les couches d\'isolant des transistors sont devenues si minces (quelques atomes d\'épaisseur) que les **courants de fuite** (leakage currents) ont commencé à augmenter de manière exponentielle. Les transistors consommaient une part significative d\'énergie même lorsqu\'ils ne commutaient pas. La densité de puissance n\'était plus constante mais augmentait à chaque nouvelle génération. La mise à l\'échelle de Dennard avait cessé de fonctionner. Ce phénomène, connu sous le nom de

**\"mur de la puissance\" (power wall)**, a mis un terme brutal à l\'escalade des fréquences d\'horloge des processeurs. C\'est cet événement, plus encore que le ralentissement de la loi de Moore, qui a constitué le point d\'inflexion majeur pour l\'architecture informatique. Il a rendu impossible de continuer à améliorer les performances en se contentant de rendre un seul cœur de plus en plus rapide.

#### 5.3 L\'Avènement du Calcul Hétérogène et des Architectures Spécifiques à un Domaine (DSA)

Face au mur de la puissance, l\'industrie a dû trouver de nouvelles voies pour continuer à améliorer les performances. La première réponse a été le parallélisme, avec l\'avènement des processeurs multi-cœurs. Mais cette approche a ses propres limites, notamment la difficulté de paralléliser efficacement des algorithmes séquentiels (loi d\'Amdahl).

La seconde réponse, plus profonde et structurante, a été la spécialisation. L\'idée est la suivante : si un processeur à usage général (CPU) ne peut plus devenir plus rapide de manière efficace, alors déchargeons les tâches les plus lourdes et les plus répétitives sur des circuits spécialisés conçus pour n\'exécuter que ces tâches, mais avec une efficacité énergétique et une performance ordres de grandeur supérieures. C\'est la naissance du **calcul hétérogène**, un paradigme où un système est composé de différents types d\'unités de calcul (CPU, accélérateurs) qui collaborent, chacune se chargeant des tâches pour lesquelles elle est la mieux adaptée.

Ces accélérateurs sont des exemples d\'**Architectures Spécifiques à un Domaine (Domain-Specific Architectures - DSA)**. Une DSA est une architecture matérielle optimisée pour un domaine d\'application étroit, comme le traitement d\'images, la simulation physique ou, plus notoirement, l\'intelligence artificielle. En sacrifiant la généralité, une DSA peut implémenter des structures de données et des chemins de calcul directement en matériel, éliminant le surcoût du cycle d\'instruction fetch-decode-execute d\'un CPU et en utilisant des types de données plus simples, ce qui conduit à des gains spectaculaires en performance par watt.

### Section 6 : Le Processeur Graphique (GPU) comme Accélérateur Universel (GPGPU)

Le premier et le plus influent des accélérateurs à avoir émergé dans l\'ère post-Dennard est le processeur graphique (GPU). Initialement conçu pour la tâche très spécifique du rendu graphique 3D, sa nature massivement parallèle s\'est avérée extraordinairement bien adaptée à un large éventail de problèmes de calcul scientifique. Ce détournement de sa fonction première est connu sous le nom de GPGPU (General-Purpose computing on Graphics Processing Units).

#### 6.1 Architecture CPU vs. GPU : Série vs. Parallèle

La différence fondamentale entre un CPU et un GPU réside dans leur philosophie de conception, qui découle des tâches pour lesquelles ils ont été optimisés.

- Le **CPU** est optimisé pour la **faible latence** sur des tâches séquentielles ou modérément parallèles. Il est composé d\'un petit nombre de cœurs (quelques dizaines au maximum) qui sont très puissants et complexes. Chaque cœur dispose d\'une grande quantité de mémoire cache et d\'une logique de contrôle sophistiquée (prédiction de branchement, exécution dans le désordre) conçue pour exécuter un seul thread d\'instructions le plus rapidement possible. Il agit comme un \"chef d\'orchestre\" ou le \"cerveau\" du système, gérant des tâches complexes et variées.

- Le **GPU** est optimisé pour le **haut débit (throughput)** sur des milliers de tâches parallèles. Il est composé de milliers de cœurs beaucoup plus simples, conçus principalement pour effectuer des opérations arithmétiques. Il sacrifie la performance d\'une seule tâche au profit de la capacité à en exécuter un très grand nombre simultanément. Il agit comme une \"armée d\'ouvriers\", effectuant des tâches simples et répétitives à une échelle massive.

#### 6.2 Hiérarchie Architecturale du GPU

Un GPU moderne est une puce d\'une immense complexité, organisée selon une hiérarchie stricte pour gérer son parallélisme.

Au plus haut niveau, le GPU est divisé en plusieurs **Graphics Processing Clusters (GPCs)**. Chaque GPC est une unité de traitement quasi-indépendante. Un GPC contient à son tour plusieurs **Texture Processing Clusters (TPCs)**, qui regroupent les unités de calcul avec les unités de texturing héritées du passé graphique du GPU.

Le véritable cœur de calcul du GPU est le **Streaming Multiprocessor (SM)**. Un TPC contient généralement un ou deux SMs. C\'est au niveau du SM que le code est exécuté. Un SM moderne (comme ceux des architectures NVIDIA) est lui-même un processeur parallèle sophistiqué contenant  :

- Des dizaines de cœurs de calcul de base (appelés **CUDA Cores** chez NVIDIA), qui sont des unités arithmétiques et logiques (ALU) pour les opérations sur les entiers et les nombres à virgule flottante.

- Des unités spécialisées pour des tâches spécifiques, comme les **Tensor Cores** pour accélérer les multiplications de matrices (cruciales en IA) et les **RT Cores** pour le calcul du lancer de rayons (ray tracing).

- Des **Special Function Units (SFUs)** pour calculer des fonctions mathématiques complexes (sinus, racine carrée, etc.).

- Des **Load/Store Units** pour gérer les accès à la mémoire.

- Un grand **fichier de registres** partagé par les threads s\'exécutant sur le SM.

- Une petite quantité de **mémoire partagée (Shared Memory)** à très faible latence, qui peut être gérée explicitement par le programmeur pour faciliter la communication entre les threads.

- Un ou plusieurs **planificateurs de warps (Warp Schedulers)** qui sélectionnent les groupes de threads à exécuter à chaque cycle d\'horloge.

#### 6.3 Le Modèle d\'Exécution SIMT (Single Instruction, Multiple Threads)

Pour gérer ses milliers de cœurs, le GPU utilise un modèle d\'exécution appelé **SIMT (Single Instruction, Multiple Threads)**. Le logiciel soumet au GPU un grand nombre de threads. Le matériel regroupe ces threads en blocs de 32, appelés

**warps** (chez NVIDIA) ou **wavefronts** (chez AMD).

Le principe du SIMT est que tous les 32 threads d\'un warp exécutent la même instruction au même cycle d\'horloge, mais chacun opère sur ses propres données. C\'est une extension du modèle SIMD (Single Instruction, Multiple Data) des CPU, mais avec une différence clé : alors que le SIMD est généralement exposé au programmeur via des instructions vectorielles, le modèle SIMT présente l\'illusion que chaque thread s\'exécute de manière indépendante avec son propre compteur de programme. Le matériel se charge de la gestion des warps.

Ce modèle est extrêmement efficace pour le parallélisme de données, mais il a un talon d\'Achille : la **divergence de warp**. Si, à l\'intérieur d\'un warp, les threads doivent prendre des chemins différents dans une structure conditionnelle (un if-else), le matériel ne peut plus exécuter une seule instruction pour tous. Il doit alors sérialiser l\'exécution : il exécute d\'abord le chemin du if pour les threads concernés (en masquant les autres), puis il exécute le chemin du else pour les threads restants. Cette sérialisation annule le bénéfice du parallélisme et peut dégrader considérablement les performances. Une part importante de l\'optimisation du code GPU consiste donc à structurer les données et les algorithmes pour minimiser cette divergence.

#### 6.4 Modèles de Programmation GPGPU : CUDA vs. OpenCL

L\'exploitation de la puissance des GPU nécessite des modèles de programmation spécifiques. Deux approches principales dominent le paysage du GPGPU.

- **CUDA (Compute Unified Device Architecture) :** Développé par NVIDIA, CUDA est une plateforme de calcul parallèle et un modèle de programmation propriétaire. Il s\'agit d\'un ensemble d\'extensions pour les langages C et C++, qui permettent aux développeurs d\'écrire des fonctions spéciales, appelées\
  **kernels**, qui sont exécutées par un grand nombre de threads sur le GPU. L\'atout majeur de CUDA est son écosystème extrêmement riche et mature. NVIDIA fournit un ensemble complet de bibliothèques scientifiques et de calcul intensif hautement optimisées (cuBLAS pour l\'algèbre linéaire, cuDNN pour les réseaux de neurones profonds, Thrust pour les algorithmes parallèles, etc.), ainsi que des outils de débogage et de profilage avancés. Cette intégration étroite entre le matériel, le modèle de programmation et les bibliothèques permet souvent d\'atteindre plus facilement des performances élevées. Son principal inconvénient est sa nature propriétaire : le code CUDA ne peut s\'exécuter que sur les GPU NVIDIA.

- **OpenCL (Open Computing Language) :** OpenCL est un standard ouvert, libre de droits, géré par le consortium industriel Khronos Group. Il vise à fournir un cadre de programmation unifié pour le calcul hétérogène, permettant d\'écrire du code portable qui peut s\'exécuter sur une grande variété de processeurs : GPU (NVIDIA, AMD, Intel), CPU, FPGA, et autres DSP. Le modèle de programmation OpenCL est plus verbeux et de plus bas niveau que CUDA. Il sépare clairement le code de l\'hôte (qui gère les plateformes, les périphériques, la mémoire) du code des kernels (écrit dans un dialecte de C, OpenCL C). Sa force est sa portabilité. Son inconvénient est un écosystème de bibliothèques moins développé et le fait que la portabilité peut se faire au détriment des performances, car un code générique peut ne pas exploiter pleinement les spécificités d\'une architecture matérielle donnée.

Le choix entre CUDA et OpenCL est souvent stratégique, opposant la performance et la maturité d\'un écosystème propriétaire à la portabilité et l\'ouverture d\'un standard industriel.

#### Tableau 15.3 : Comparaison des Modèles de Programmation GPGPU

  --------------------------------- ---------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------
  Critère                           CUDA (NVIDIA)                                                                      OpenCL (Khronos Group)

  **Modèle de Langage**             Extensions C/C++ intégrées (modèle \"single-source\")                              API de type C, avec un langage de kernel séparé (OpenCL C)

  **Portabilité Matérielle**        GPU NVIDIA uniquement                                                              Multi-vendeur (NVIDIA, AMD, Intel) et multi-type (GPU, CPU, FPGA)

  **Écosystème de Bibliothèques**   Très riche et mature (cuBLAS, cuDNN, Thrust, etc.)                                 Moins développé, bibliothèques tierces (ex: ViennaCL)

  **Performance**                   Souvent plus élevée et plus facile à atteindre grâce à l\'intégration matérielle   La portabilité peut nécessiter des optimisations spécifiques pour atteindre des performances de pointe

  **Gouvernance**                   Propriétaire, contrôlé par NVIDIA                                                  Standard ouvert, géré par un consortium industriel
  --------------------------------- ---------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------------------

Sources : 

### Section 7 : Accélérateurs Spécialisés pour l\'Intelligence Artificielle

Alors que les GPU se sont imposés comme des accélérateurs polyvalents pour le HPC, la croissance explosive des charges de travail de l\'intelligence artificielle, et en particulier des réseaux de neurones profonds (DNN), a poussé la spécialisation un cran plus loin. L\'analyse de ces charges de travail a révélé qu\'elles sont dominées par une opération mathématique fondamentale : la multiplication de matrices. Cette observation a conduit à la création d\'ASICs (Application-Specific Integrated Circuits) conçus pour exceller à cette unique tâche, sacrifiant toute généralité au profit d\'une efficacité maximale.

#### 7.1 Le Tensor Processing Unit (TPU) de Google : un ASIC pour le Deep Learning

Le **Tensor Processing Unit (TPU)** de Google est l\'exemple le plus emblématique de cette philosophie. Développé initialement en interne pour accélérer les requêtes d\'inférence de ses propres services (comme la recherche vocale et la traduction), le coût d\'exécution de ces modèles sur des CPU et GPU traditionnels devenait prohibitif à l\'échelle de Google. Le TPU a été conçu comme un co-processeur, se connectant à un serveur hôte via un lien PCIe, et optimisé pour une seule chose : calculer des produits matriciels et des convolutions (qui peuvent être ramenées à des produits matriciels) à une vitesse et une efficacité énergétique inégalées.

Pour atteindre cet objectif, les TPU s\'appuient sur deux innovations clés :

1.  **La Quantization :** Les réseaux de neurones sont étonnamment résilients à une précision numérique réduite. Au lieu d\'utiliser des nombres à virgule flottante de 32 bits (FP32) ou 64 bits (FP64) comme le font les CPU et les GPU scientifiques, les TPU opèrent principalement sur des entiers de 8 bits (INT8) ou un format à virgule flottante de 16 bits à faible précision appelé bfloat16. La réduction de la précision permet de construire des unités de calcul beaucoup plus petites et moins énergivores, ce qui signifie qu\'on peut en placer beaucoup plus sur une même surface de silicium, pour une perte de précision du modèle final souvent négligeable.

2.  **Une grande mémoire sur puce :** Les TPU intègrent une quantité importante de mémoire SRAM rapide sur la puce (appelée \"Unified Buffer\"), ce qui permet de stocker les poids du modèle et les activations intermédiaires directement sur l\'accélérateur. Cela réduit drastiquement les accès à la mémoire externe (DRAM), qui sont lents et coûteux en énergie, et qui constituent le principal goulot d\'étranglement dans de nombreuses applications de calcul intensif.

Le TPU n\'est donc pas un \"processeur\" au sens classique du terme. C\'est une machine matérielle dont l\'architecture est une incarnation directe de l\'algorithme qu\'elle accélère. C\'est l\'exemple le plus pur de la co-conception matériel/logiciel dans le domaine des DSA.

#### 7.2 Le Réseau Systolique (Systolic Array) : Le Cœur du TPU

L\'efficacité spectaculaire du TPU pour la multiplication de matrices repose sur une architecture matérielle particulière appelée **réseau systolique (systolic array)**. Un réseau systolique est une grille 2D de petites unités de traitement simples et identiques, appelées

**Processing Elements (PEs)**. Chaque PE est typiquement capable d\'effectuer une seule opération, comme une multiplication-accumulation (MAC).

Le fonctionnement est analogue au système circulatoire humain, d\'où le nom \"systolique\". Les données (par exemple, les éléments d\'une matrice d\'entrée et les poids du réseau de neurones) sont \"pompées\" dans la grille depuis les bords. À chaque cycle d\'horloge, chaque PE reçoit une donnée de son voisin, effectue son opération MAC, et passe le résultat à son autre voisin. Les données traversent ainsi la grille en \"vagues\" synchronisées.

L\'immense avantage de cette architecture est la **maximisation de la réutilisation des données**. Une valeur chargée depuis la mémoire est utilisée par toute une rangée ou une colonne de PEs au fur et à mesure de sa progression dans le réseau, sans nécessiter de multiples lectures depuis la mémoire ou des registres. Cela permet de contourner le goulot d\'étranglement de von Neumann, où la vitesse de calcul est limitée par la bande passante mémoire. Pour une multiplication de matrices de taille

N×N, un réseau systolique de N×N PEs peut atteindre un débit de calcul de l\'ordre de O(N2) opérations par cycle, tout en ne nécessitant qu\'un débit de données de l\'ordre de O(N) depuis la mémoire. Cette efficacité explique pourquoi les TPU peuvent atteindre des centaines de téra-opérations par seconde (TOPS) avec une consommation d\'énergie relativement faible.

#### 7.3 Architecture Système des TPU : Pods, Slices et Réseaux d\'Interconnexion

Les TPU ont été conçus dès le départ pour une mise à l\'échelle massive, bien au-delà d\'une seule puce, afin de pouvoir entraîner les modèles de langage et de vision les plus gigantesques. Cette scalabilité repose sur une hiérarchie de composants et de réseaux d\'interconnexion spécialisés.

- **Chip :** C\'est l\'unité de base, contenant un ou plusieurs **TensorCores**. Un TensorCore est le bloc de calcul principal, qui abrite les unités de multiplication matricielle (MXU), les unités vectorielles et scalaires.

- **TPU Slice :** Pour l\'entraînement de modèles à grande échelle, plusieurs puces TPU sont connectées entre elles via un réseau dédié à très haute vitesse et à faible latence appelé **Inter-Chip Interconnect (ICI)**. Un ensemble de puces ainsi connectées forme une \"tranche\" (slice). La topologie de cette tranche est souvent un tore 2D ou 3D, ce qui garantit une bande passante de communication élevée et uniforme entre toutes les puces de la tranche.

- **TPU Pod :** Un **Pod** est un ensemble de plusieurs centaines ou milliers de puces TPU (par exemple, 4096 puces pour un Pod v4) installées dans des racks de centre de données et connectées par le même réseau ICI. Un Pod entier peut être alloué comme une seule machine virtuelle massive pour entraîner un unique modèle géant.

- **Multislice / Multi-pod :** Pour les besoins les plus extrêmes, il est possible de connecter plusieurs Pods entre eux. Cependant, la communication entre les Pods ne se fait plus via le réseau ICI spécialisé, mais via le réseau standard du centre de données (**Data-Center Network - DCN**), qui a une bande passante plus faible et une latence plus élevée. La gestion de la communication à cette échelle devient un défi algorithmique majeur.

Cette architecture hiérarchique permet à Google de proposer des configurations de calcul allant de quelques puces pour l\'expérimentation à des milliers de puces pour l\'entraînement des modèles d\'IA de nouvelle génération.

### Section 8 : Le Calcul Reconfigurable : Les FPGA dans le Calcul Haute Performance (HPC)

Entre les processeurs programmables par logiciel (CPU, GPU) et les circuits à fonction fixe (ASIC comme les TPU), il existe une troisième voie pour l\'accélération : le matériel reconfigurable. Les **Field-Programmable Gate Arrays (FPGA)** incarnent cette approche, offrant un compromis unique entre la flexibilité du logiciel et la performance du matériel dédié.

#### 8.1 Principes des Field-Programmable Gate Arrays (FPGA)

Un FPGA est un circuit intégré qui n\'a pas de fonction prédéfinie. Il est composé d\'une vaste mer de blocs logiques génériques (appelés **Look-Up Tables - LUTs**, qui peuvent implémenter n\'importe quelle fonction booléenne simple), de registres (bascules), de blocs de mémoire (BRAMs) et de blocs de calcul spécialisés (DSPs pour les opérations arithmétiques), le tout interconnecté par un réseau de routage programmable.

La \"programmation\" d\'un FPGA consiste à définir la fonction de chaque bloc logique et à configurer les interconnexions pour créer un circuit numérique personnalisé, parfaitement adapté à un algorithme donné. Ce processus, appelé synthèse, transforme une description de haut niveau en un fichier de configuration binaire (\"bitstream\") qui est chargé sur la puce. La clé est que ce processus est réversible : on peut charger un nouveau bitstream à tout moment pour reconfigurer le FPGA afin qu\'il exécute une tâche complètement différente.

#### 8.2 Avantages des FPGA comme Accélérateurs

Cette capacité de créer du matériel sur mesure confère aux FPGA des avantages uniques dans le domaine du HPC.

- **Parallélisme de pipeline et spatial :** Alors que les GPU excellent dans le parallélisme de données (exécuter la même instruction sur de nombreuses données), les FPGA excellent dans le **parallélisme de pipeline**. Un algorithme complexe peut être décomposé en une série d\'étages, chaque étage étant implémenté comme un bloc matériel dédié sur le FPGA. Les données s\'écoulent à travers ce pipeline, chaque étage traitant une donnée différente à chaque cycle d\'horloge. Cela permet d\'atteindre un débit extrêmement élevé pour les applications de streaming (traitement vidéo, réseau).

- **Latence ultra-faible et déterministe :** En implémentant la logique directement en matériel, on élimine complètement le surcoût lié au cycle d\'instruction (fetch-decode-execute) d\'un processeur. Les opérations peuvent être effectuées avec une latence de quelques cycles d\'horloge seulement, et cette latence est prédictible et constante. C\'est un avantage décisif pour les applications temps réel strictes, comme le trading financier à haute fréquence, les systèmes de contrôle robotique ou les télécommunications, où une latence de l\'ordre de la microseconde ou même de la nanoseconde est requise.

- **Efficacité énergétique supérieure :** Un FPGA n\'active que les parties du circuit qui sont utilisées pour une application donnée. Contrairement à un CPU ou un GPU qui alimente de nombreuses unités fonctionnelles même si elles sont inactives, un FPGA peut être configuré pour n\'utiliser que le strict minimum de ressources. Cela se traduit par une efficacité énergétique (performance par watt) souvent bien supérieure à celle des GPU pour des tâches spécifiques.

#### 8.3 Défis de la Programmation FPGA

La flexibilité des FPGA a un coût : la complexité de leur programmation. Le choix d\'un accélérateur n\'est pas seulement une décision technique, mais une décision stratégique qui engage un écosystème de développement et un modèle de coût distincts.

- **Langages de description matérielle (HDL) :** La méthode traditionnelle pour programmer les FPGA utilise des langages comme **VHDL** ou **Verilog**. Ces langages ne décrivent pas une séquence d\'instructions logicielles, mais un circuit matériel. La conception en HDL requiert une expertise d\'ingénieur en électronique numérique. De plus, le cycle de développement est long : la compilation d\'un design, qui inclut les étapes de **synthèse**, de **placement** et de **routage**, peut prendre plusieurs heures, voire des jours, pour des puces complexes, ce qui contraste fortement avec les quelques secondes nécessaires pour compiler un programme logiciel.

- **Synthèse de haut niveau (HLS) :** Pour rendre les FPGA plus accessibles aux développeurs de logiciels, l\'industrie a développé des outils de **synthèse de haut niveau (High-Level Synthesis - HLS)**. Ces outils permettent de générer une configuration matérielle à partir de descriptions dans des langages de plus haut niveau comme C, C++ ou OpenCL. HLS réduit considérablement le temps de développement et la barrière à l\'entrée. Cependant, il est souvent difficile d\'atteindre le même niveau de performance et d\'optimisation qu\'avec une conception HDL manuelle, car le développeur a moins de contrôle sur la microarchitecture générée.

Le choix d\'un FPGA représente donc un investissement initial en temps et en expertise plus important que pour un GPU. Cependant, pour les applications où ses avantages en termes de latence et d\'efficacité énergétique sont critiques, cet investissement peut procurer un avantage compétitif décisif et durable.

#### 8.4 Analyse Comparative : Le Spectre Flexibilité-Performance

En conclusion de cette exploration des architectures de calcul, il est clair qu\'il n\'existe pas de solution unique. Le paysage du calcul hétérogène est un spectre de compromis entre la généralité et la spécialisation. Le choix de la bonne architecture dépend entièrement de la nature de la charge de travail, des contraintes de performance, de latence, de consommation énergétique et des coûts de développement.

- **CPU :** Le summum de la flexibilité. Il peut exécuter n\'importe quel programme, mais son efficacité pour le calcul parallèle est faible. Il reste indispensable pour les tâches de contrôle, les systèmes d\'exploitation et les parties séquentielles des algorithmes.

- **GPU :** Un excellent compromis entre la programmabilité et la performance parallèle. Relativement facile à programmer pour les développeurs logiciels via des modèles comme CUDA, il excelle dans le parallélisme de données massif et est devenu la plateforme de choix pour l\'entraînement des modèles d\'IA et de nombreuses applications HPC.

- **FPGA :** Offre une flexibilité au niveau matériel. Il permet de créer des architectures sur mesure qui offrent une latence imbattable et une efficacité énergétique maximale pour des algorithmes spécifiques, notamment ceux basés sur des pipelines de streaming.

- **ASIC (ex: TPU) :** Le point extrême de la spécialisation. Il offre la performance et l\'efficacité énergétique les plus élevées possibles, mais pour une seule et unique fonction. Son coût de conception de plusieurs millions de dollars n\'est justifiable que pour des déploiements à très grande échelle.

Le tableau suivant synthétise ces compromis et positionne chaque architecture dans le paysage du calcul moderne.

#### Tableau 15.4 : Synthèse Comparative des Architectures d\'Accélération

  -------------- --------------------------------------------- -------------------------------------------------- ----------------------------------- ------------------------------- ------------------------ --------------------------------------------------------------------
  Architecture   Type de Parallélisme Principal                Flexibilité / Programmabilité                      Performance de Pointe               Latence                         Efficacité Énergétique   Domaine d\'Application Idéal

  **CPU**        Tâches (multi-cœur), Instructions (ILP)       Très élevée (universel)                            Faible (pour le calcul parallèle)   La plus faible (tâche unique)   Faible                   Systèmes d\'exploitation, tâches séquentielles, contrôle

  **GPU**        Données (SIMT)                                Élevée (C++/CUDA/OpenCL)                           Très élevée (débit)                 Moyenne                         Moyenne                  Graphisme, HPC, entraînement de modèles IA, calcul scientifique

  **FPGA**       Pipeline, spatial, personnalisé               Moyenne (reconfigurable matériellement, HLS/HDL)   Élevée (spécifique à la tâche)      La plus faible (déterministe)   Très élevée              Traitement de signal, réseau, trading, inférence IA faible latence

  **ASIC/TPU**   Spécifique à l\'algorithme (ex: systolique)   Nulle (fonction fixe)                              Maximale (pour sa tâche)            Faible                          Maximale                 Inférence/entraînement IA à grande échelle, minage crypto
  -------------- --------------------------------------------- -------------------------------------------------- ----------------------------------- ------------------------------- ------------------------ --------------------------------------------------------------------

Sources : 

## Conclusion

Ce chapitre a parcouru le chemin qui mène des principes fondamentaux de la gestion des entrées/sorties aux architectures de calcul les plus avancées de notre époque. Nous avons vu comment la nécessité de gérer efficacement la communication avec des périphériques lents et asynchrones a donné naissance à des mécanismes sophistiqués comme les interruptions et l\'accès direct à la mémoire. L\'évolution de ces mécanismes --- du PIC à l\'APIC puis aux MSI, et du DMA simple au DMA cohérent avec le cache --- reflète la complexification constante des systèmes informatiques, passant du mono-processeur au multi-cœur et aux périphériques massivement parallèles.

Parallèlement, nous avons analysé comment les interconnexions physiques ont évolué pour répondre à une demande de bande passante toujours croissante. Le passage du bus parallèle partagé à l\'architecture série, point-à-point et commutée de PCI Express a transformé cette interface en un véritable réseau interne, tandis que l\'USB, grâce au connecteur Type-C et au protocole USB4 basé sur Thunderbolt, est devenu un tissu de communication externe universel capable d\'agréger de multiples flux de données à haute vitesse.

Enfin, nous avons établi que la fin de la mise à l\'échelle de Dennard a constitué un tournant historique, sonnant le glas de l\'amélioration \"gratuite\" des performances des processeurs universels et inaugurant l\'ère du calcul hétérogène. Cette nouvelle ère est dominée par une diversité d\'architectures d\'accélération, chacune offrant un compromis unique sur le spectre allant de la généralité à la spécialisation. Les GPU ont démocratisé le calcul parallèle à haut débit ; les ASIC comme les TPU ont poussé l\'efficacité à son paroxysme pour des tâches spécifiques comme l\'IA ; et les FPGA offrent une voie de reconfigurabilité matérielle pour des applications exigeant une latence minimale et une efficacité énergétique maximale.

La conclusion qui s\'impose est que l\'architecture des systèmes complexes n\'est plus monolithique et centrée sur le CPU. Elle est devenue un écosystème hétérogène, distribué et centré sur les données. La performance n\'est plus seulement une question de vitesse d\'horloge, mais le résultat d\'une co-conception minutieuse entre les algorithmes, les modèles de programmation, les architectures d\'accélération et les tissus d\'interconnexion qui les relient. Comprendre les principes, les forces et les faiblesses de chaque composant de cet écosystème est devenu une compétence essentielle pour les ingénieurs et les scientifiques informatiques qui conçoivent les systèmes de demain.
