# Chapitre I.40 : Sécurité des Systèmes et des Logiciels

## 40.1 Sécurité des Systèmes d\'Exploitation (Durcissement, Isolation)

### 40.1.1 Introduction : Le Système d\'Exploitation comme Socle de Confiance (Trusted Computing Base - TCB)

Au cœur de tout système informatique moderne se trouve le système d\'exploitation (OS), une couche logicielle complexe qui arbitre l\'accès aux ressources matérielles et fournit les services fondamentaux sur lesquels toutes les autres applications s\'appuient. Du point de vue de la sécurité, l\'OS et une partie du matériel sous-jacent constituent le fondement de la confiance pour l\'ensemble de la machine. Ce fondement est formellement désigné par le terme **Socle de Confiance** (en anglais, *Trusted Computing Base* ou TCB).

Le TCB est défini comme l\'ensemble de tous les composants matériels, micrologiciels et logiciels qui sont critiques pour la sécurité du système, en ce sens qu\'une faille ou une vulnérabilité au sein du TCB pourrait compromettre les propriétés de sécurité de l\'ensemble du système. Le TCB est responsable de la mise en application d\'une politique de sécurité informatique. Il est crucial de comprendre une nuance sémantique importante : le terme \"de confiance\" (

*trusted*) ne signifie pas que les composants du TCB sont intrinsèquement dignes de confiance ou exempts de défauts. Il signifie plutôt que ces composants *doivent* être dignes de confiance pour que le système puisse être considéré comme sécurisé. La sécurité de toutes les autres parties du système dépend de l\'intégrité et du bon fonctionnement du TCB.

Ce concept mène directement à un principe fondamental de la sécurité des systèmes : le **principe de minimisation**. La sécurité d\'un système est inversement proportionnelle à la taille et à la complexité de son TCB. Un TCB plus petit et plus simple est préférable pour plusieurs raisons  :

> **Surface d\'attaque réduite** : Moins de composants signifient moins de points d\'entrée potentiels pour un attaquant. Chaque ligne de code, chaque service, chaque pilote de périphérique ajouté au TCB augmente la probabilité de l\'existence de vulnérabilités exploitables.
>
> **Facilité d\'analyse et de vérification** : Un TCB minimaliste rend la tâche d\'audit de sécurité et de vérification formelle plus réalisable. Il est beaucoup plus aisé d\'examiner de manière exhaustive une base de code de quelques milliers de lignes qu\'un système d\'exploitation complet en comptant des millions.
>
> **Moins de points de défaillance** : La complexité est l\'ennemie de la sécurité. Un système plus simple est moins susceptible de contenir des interactions imprévues entre composants qui pourraient créer des failles de sécurité.

Ce principe théorique de minimisation du TCB n\'est pas une simple abstraction académique. Il constitue la justification philosophique et la ligne directrice de toutes les pratiques de sécurité au niveau de l\'hôte qui seront abordées dans ce chapitre. Les processus de **durcissement** (*hardening*) et d\'**isolation** sont les manifestations pratiques de cet effort constant pour réduire et contrôler le socle de confiance de nos systèmes.

### 40.1.2 Durcissement des Systèmes (Hardening) : Principes et Pratiques

Le durcissement d\'un système, ou *hardening*, est le processus méthodique visant à sécuriser un système en réduisant sa surface d\'attaque. Il s\'agit de la mise en œuvre concrète du principe de minimisation du TCB. L\'objectif est de configurer le système d\'exploitation et les logiciels qui y sont installés de la manière la plus sécuritaire possible, en éliminant tout ce qui n\'est pas absolument nécessaire au fonctionnement de ses services prévus, tout en renforçant les défenses des composants restants. Ce processus n\'est pas un événement ponctuel, mais une démarche continue qui doit être intégrée à toutes les phases du cycle de vie des technologies de l\'information, de l\'installation initiale à la maintenance continue et jusqu\'à la mise hors service.

#### 40.1.2.1 Principes Fondamentaux du Durcissement

Trois principes directeurs sous-tendent une stratégie de durcissement efficace :

> **Réduction de la surface d\'attaque** : C\'est le principe le plus direct. Chaque logiciel, service, port réseau ouvert ou compte utilisateur représente une porte d\'entrée potentielle pour un attaquant. La première étape de tout processus de durcissement consiste donc à réaliser un inventaire et à éliminer impitoyablement tout ce qui n\'est pas essentiel. Cela inclut la désinstallation de logiciels et de bibliothèques non utilisés, la désactivation des services système non requis (par exemple, un serveur d\'impression sur un serveur web) et le blocage de tous les ports réseau qui ne sont pas explicitement nécessaires pour les communications légitimes.
>
> **Principe du moindre privilège** : Ce principe stipule qu\'un utilisateur ou un processus ne doit disposer que de l\'ensemble minimal de permissions et de droits d\'accès nécessaires pour accomplir sa tâche, et ce, pour la durée la plus courte possible. L\'application de ce principe limite considérablement les dommages qu\'un attaquant peut causer s\'il parvient à compromettre un compte ou un processus. Par exemple, un serveur web ne devrait pas s\'exécuter avec les privilèges de l\'administrateur (\
> root ou Administrator). S\'il est compromis, l\'attaquant n\'obtiendra que les privilèges limités du compte de service web, l\'empêchant de modifier des fichiers système critiques.
>
> **Défense en profondeur** : Ce concept militaire, appliqué à la cybersécurité, consiste à mettre en place de multiples couches de défense indépendantes et complémentaires. L\'idée est que si une barrière de sécurité est franchie, d\'autres barrières successives peuvent encore arrêter ou ralentir l\'attaquant. Dans le contexte du durcissement d\'un OS, cela signifie combiner différentes mesures : un pare-feu au niveau de l\'hôte, un système de contrôle d\'accès obligatoire (voir section 40.1.3), une journalisation rigoureuse, et des configurations sécurisées pour chaque service. La défaillance d\'une seule de ces mesures ne devrait pas entraîner une compromission totale du système.

#### 40.1.2.2 Pratiques de Durcissement pour les Systèmes GNU/Linux

Les systèmes GNU/Linux, en raison de leur flexibilité et de leur omniprésence dans les serveurs, offrent de nombreuses opportunités de durcissement. Les recommandations suivantes, inspirées notamment des guides de l\'Agence Nationale de la Sécurité des Systèmes d\'Information (ANSSI), constituent une base solide.

> **Sécurisation du processus de démarrage** : Le contrôle du processus de démarrage est fondamental. Un attaquant avec un accès physique pourrait modifier les paramètres de démarrage pour contourner les contrôles de sécurité.

**Protection du BIOS/UEFI** : Configurer un mot de passe dans le BIOS ou l\'UEFI pour empêcher les modifications non autorisées des paramètres de démarrage.

**UEFI Secure Boot** : Activer le démarrage sécurisé UEFI pour s\'assurer que seuls un chargeur de démarrage et un noyau signés numériquement peuvent être chargés.

**Protection du chargeur de démarrage (GRUB)** : Configurer un mot de passe pour GRUB afin d\'empêcher un utilisateur de modifier les paramètres de la ligne de commande du noyau ou de démarrer en mode mono-utilisateur (*single user mode*) sans authentification.

> **Gestion des comptes et des privilèges** :

**Politiques de mots de passe robustes** : Mettre en œuvre des politiques strictes pour la complexité, la longueur et la durée de vie des mots de passe. Utiliser des algorithmes de hachage forts comme SHA-512 pour le stockage des mots de passe dans /etc/shadow.

**Contrôle de l\'escalade de privilèges** : Configurer sudo de manière restrictive pour accorder des privilèges d\'administrateur de façon granulaire et temporaire, plutôt que de donner un accès direct au compte root.

**Désactivation des comptes inutilisés** : Auditer et désactiver ou supprimer régulièrement les comptes utilisateurs qui ne sont plus nécessaires.

> **Configuration réseau et services** :

**Accès SSH sécurisé** : Le service SSH est une cible privilégiée. Il doit être configuré pour interdire la connexion directe de l\'utilisateur root (PermitRootLogin no), désactiver l\'authentification par mot de passe au profit de l\'authentification par clé cryptographique (PasswordAuthentication no), et utiliser des protocoles et algorithmes cryptographiques modernes.

**Pare-feu au niveau de l\'hôte** : Configurer iptables ou son successeur nftables pour appliquer une politique de \"refus par défaut\" (*default deny*), n\'autorisant que le trafic explicitement nécessaire pour les services de la machine.

**Désactivation des services inutiles** : Utiliser systemctl pour lister, arrêter et désactiver les services qui ne sont pas requis (par exemple, avahi-daemon sur un serveur).

> **Journalisation et surveillance** :

**Activation de l\'audit** : Configurer et activer le démon d\'audit (auditd) pour enregistrer les événements de sécurité critiques, tels que les appels système, les accès aux fichiers et les tentatives d\'authentification échouées.

**Centralisation des journaux** : Utiliser journald ou rsyslog pour collecter et, idéalement, centraliser les journaux sur un serveur de journaux distant et sécurisé. Cela empêche un attaquant d\'effacer ses traces après une compromission.

> **Gestion des correctifs** : Appliquer les mises à jour de sécurité de manière régulière et rapide est l\'une des mesures les plus efficaces pour se protéger contre les vulnérabilités connues. Utiliser les gestionnaires de paquets (apt, yum, dnf) et envisager des solutions de gestion automatisée des correctifs.

#### 40.1.2.3 Pratiques de Durcissement pour les Systèmes Windows Server

Le durcissement des serveurs Windows s\'appuie sur une combinaison de politiques de groupe (GPO), de configurations de registre et de gestion rigoureuse des rôles et fonctionnalités. Microsoft fournit des lignes directrices de sécurité (*Security Baselines*) qui constituent un excellent point de départ.

> **Installation et mise à jour** :

**Installation minimale (Server Core)** : Dans la mesure du possible, installer Windows Server en mode \"Server Core\", qui omet l\'interface graphique et de nombreux composants non essentiels, réduisant ainsi considérablement la surface d\'attaque.

**Gestion des correctifs** : Utiliser Windows Server Update Services (WSUS) ou Microsoft Endpoint Configuration Manager pour centraliser et automatiser le déploiement des mises à jour de sécurité.

> **Politiques de comptes et d\'accès** :

**Politiques de mots de passe et de verrouillage** : Configurer via les GPO des exigences strictes pour la complexité des mots de passe, l\'historique et l\'âge maximal. Mettre en place des politiques de verrouillage de compte pour contrecarrer les attaques par force brute.

**Gestion des comptes par défaut** : Renommer le compte Administrator par défaut et désactiver le compte Guest.

**Contrôle de compte d\'utilisateur (UAC)** : Maintenir l\'UAC activé pour exiger une élévation de privilèges pour les tâches administratives, même pour les utilisateurs du groupe Administrateurs.

> **Réduction de la surface d\'attaque** :

**Gestion des rôles et fonctionnalités** : Utiliser le Gestionnaire de serveur pour n\'installer que les rôles (ex: Serveur Web IIS, DNS) et les fonctionnalités (ex:.NET Framework) strictement nécessaires à la fonction du serveur.

**Désactivation des services inutiles** : Auditer la liste des services Windows et désactiver ceux qui ne sont pas requis.

> **Configuration réseau et pare-feu** :

**Pare-feu Windows avec sécurité avancée** : Configurer le pare-feu intégré pour bloquer tout le trafic entrant par défaut, à l\'exception des ports nécessaires aux services légitimes. Utiliser des profils de pare-feu distincts (Domaine, Privé, Public) pour appliquer des règles différentes selon le contexte réseau.

**Désactivation des protocoles non sécurisés** : Désactiver les protocoles anciens et non sécurisés comme SMBv1, qui a été exploité par des rançongiciels notoires comme WannaCry.

> **Sécurisation du système et des données** :

**Chiffrement des disques** : Utiliser BitLocker pour chiffrer l\'intégralité du volume système et des volumes de données, protégeant ainsi les données au repos en cas de vol physique du serveur ou de ses disques.

**Configuration du registre** : Appliquer des paramètres de registre sécurisés via les GPO pour renforcer le système, par exemple en empêchant le stockage des hachages de mots de passe LAN Manager (LM).

**Journaux d\'événements** : Augmenter la taille des journaux d\'événements (Sécurité, Système, Application) et configurer des politiques d\'audit pour enregistrer les événements pertinents, comme les tentatives de connexion réussies et échouées, les modifications de politiques et l\'accès aux objets.

### 40.1.3 Mécanismes d\'Isolation et de Confinement

Le durcissement vise à réduire la surface d\'attaque globale du système. L\'isolation, quant à elle, est une stratégie complémentaire qui vise à contenir les processus et les applications dans des environnements restreints, même s\'ils s\'exécutent sur un système durci. Si un processus isolé est compromis, les dommages sont confinés à son environnement restreint, empêchant l\'attaquant de pivoter pour compromettre l\'ensemble du système.

#### 40.1.3.1 Le Sandboxing (Bacs à Sable)

Le *sandboxing* est une technique de sécurité qui consiste à exécuter un programme ou un processus dans un environnement d\'exécution strictement contrôlé et isolé, appelé \"bac à sable\". Cet environnement limite fortement les ressources auxquelles le programme peut accéder : il peut se voir refuser l\'accès au réseau, au système de fichiers en dehors de son propre répertoire, ou à d\'autres processus exécutés par le même utilisateur.

Le sandboxing est une application directe du principe du moindre privilège au niveau d\'un processus individuel. Il est particulièrement utile pour exécuter du code non fiable ou pour traiter des données potentiellement malveillantes. Les cas d\'usage les plus courants incluent :

> **Navigateurs Web** : Les navigateurs modernes sont des exemples parfaits de l\'utilisation intensive du sandboxing. Des navigateurs comme Google Chrome exécutent chaque onglet et chaque extension dans un processus de rendu distinct et fortement \"sandboxé\". Si une page web malveillante exploite une vulnérabilité dans le moteur de rendu, le code malveillant est confiné au bac à sable et ne peut pas, en théorie, accéder aux fichiers de l\'utilisateur ou à d\'autres applications.
>
> **Analyse de logiciels malveillants** : Les analystes en sécurité utilisent des environnements de sandboxing pour exécuter des maliciels en toute sécurité et observer leur comportement sans risquer d\'infecter leur propre machine ou réseau (voir section 40.4.1).
>
> **Lecteurs de documents** : Des applications comme les lecteurs de PDF peuvent utiliser le sandboxing pour ouvrir des documents potentiellement malveillants, limitant ainsi les dommages si le document contient un code d\'exploitation.

Les implémentations de sandboxing peuvent reposer sur diverses technologies, allant de la virtualisation complète (exécuter l\'application dans une machine virtuelle dédiée) à des mécanismes plus légers fournis par le noyau du système d\'exploitation, tels que les *namespaces* et seccomp sous Linux.

#### 40.1.3.2 Le Contrôle d\'Accès Obligatoire (Mandatory Access Control - MAC)

Le modèle de sécurité standard sur les systèmes de type UNIX est le **Contrôle d\'Accès Discrétionnaire** (DAC). Dans ce modèle, le propriétaire d\'un fichier a la discrétion de décider qui peut y accéder en modifiant ses permissions (lecture, écriture, exécution pour l\'utilisateur, le groupe et les autres). Ce modèle présente une faiblesse fondamentale : si un programme exécuté par un utilisateur est compromis, ce programme hérite de tous les droits de l\'utilisateur.

Le **Contrôle d\'Accès Obligatoire** (MAC) est un paradigme de sécurité plus strict qui résout ce problème. Dans un système MAC, les décisions d\'accès ne sont pas laissées à la discrétion des utilisateurs. Elles sont appliquées par le système d\'exploitation sur la base d\'une politique de sécurité globale, centralisée et non modifiable par les utilisateurs normaux. Le MAC ne se demande pas \"Qui demande l\'accès?\" (l\'identité de l\'utilisateur), mais plutôt \"Quel est le contexte de sécurité de ce qui demande l\'accès?\". Même si un processus s\'exécute en tant que

root, une politique MAC peut l\'empêcher d\'effectuer certaines actions si celles-ci ne sont pas conformes à son rôle défini. Les deux implémentations MAC les plus notables dans l\'écosystème GNU/Linux sont SELinux et AppArmor.

> **SELinux (Security-Enhanced Linux)**

Développé à l\'origine par la NSA, SELinux est un cadre MAC extrêmement puissant et granulaire, intégré par défaut dans les distributions basées sur Red Hat (Fedora, RHEL, CentOS).

\* Architecture et Fonctionnement : SELinux fonctionne sur un principe d\'étiquetage. Chaque sujet (processus) et chaque objet (fichier, socket, port réseau) du système se voit attribuer une étiquette de sécurité, appelée contexte de sécurité.33 Ce contexte est composé de quatre parties : utilisateur SELinux, rôle, type et niveau (pour la sécurité multi-niveaux). L\'élément le plus important est le

**type**. La politique SELinux, chargée dans le noyau, est un ensemble de règles qui définissent explicitement les interactions autorisées entre les types. Par exemple, une règle peut stipuler : \"autoriser les processus de type httpd_t (serveur web Apache) à lire les fichiers de type httpd_sys_content_t (contenu web)\". Toute tentative d\'accès non explicitement autorisée par une règle est refusée par défaut.

\* Modes de fonctionnement : SELinux peut opérer dans trois modes 33 :

1\. enforcing : Le mode par défaut et recommandé en production. La politique est appliquée, et les violations sont à la fois bloquées et journalisées.

2\. permissive : La politique n\'est pas appliquée (les violations ne sont pas bloquées), mais les actions qui auraient été refusées sont journalisées. Ce mode est inestimable pour le débogage et le développement de nouvelles politiques, car il permet de voir ce que SELinux aurait bloqué sans interrompre le fonctionnement du système.

3\. disabled : SELinux est complètement désactivé.

\* Gestion de la politique : La gestion de SELinux, bien que complexe, est facilitée par une suite d\'outils. sestatus affiche l\'état actuel, getenforce et setenforce permettent de basculer entre les modes enforcing et permissive.32

semanage est utilisé pour gérer les contextes de fichiers et les ports, tandis que les booléens (getsebool/setsebool) permettent d\'activer ou de désactiver certaines parties de la politique sans la réécrire. L\'outil

audit2allow peut analyser les journaux d\'audit pour suggérer de nouvelles règles de politique afin de corriger les refus d\'accès.

> **AppArmor (Application Armor)**

AppArmor est une autre implémentation MAC populaire, utilisée par défaut dans des distributions comme Ubuntu, SUSE et Debian. Il est souvent considéré comme plus simple à apprendre et à gérer que SELinux.

\* Architecture et Fonctionnement : Contrairement à l\'approche de SELinux basée sur l\'étiquetage de chaque objet, AppArmor adopte une approche basée sur les chemins d\'accès (path-based).38 La politique de sécurité est définie dans des fichiers texte appelés

**profils**, situés dans le répertoire /etc/apparmor.d/. Chaque profil est associé à un exécutable spécifique (par exemple, /usr/sbin/ntpd) et définit les permissions de ce programme sur les fichiers du système (par exemple, read /etc/ntp.conf) ainsi que les capacités du noyau qu\'il peut utiliser. Si un programme n\'a pas de profil associé, il s\'exécute sans confinement AppArmor.

\* Modes de fonctionnement : Similaire à SELinux, AppArmor a deux modes principaux pour ses profils 37 :

1\. enforce : La politique du profil est appliquée, et les violations sont bloquées et journalisées.

2\. complain (ou learning mode) : Les violations de la politique sont journalisées mais ne sont pas bloquées. Ce mode est utilisé pour développer et affiner de nouveaux profils.

\* Gestion des profils : La suite d\'outils apparmor-utils fournit les commandes nécessaires à la gestion. apparmor_status (ou aa-status) affiche l\'état de tous les profils chargés.37

aa-enforce et aa-complain permettent de basculer un profil entre les modes enforce et complain. L\'outil aa-genprof est particulièrement utile : il peut générer un nouveau profil pour une application en mode complain, en observant son comportement normal et en proposant des règles à l\'administrateur pour approbation.

Le choix entre SELinux et AppArmor dépend souvent des objectifs de sécurité, de l\'expertise de l\'administrateur et de la distribution utilisée. SELinux offre un contrôle plus granulaire et une sécurité potentiellement plus forte, mais au prix d\'une complexité de gestion nettement plus élevée. AppArmor offre une protection robuste avec une courbe d\'apprentissage beaucoup plus douce, ce qui peut conduire à une meilleure adoption et à une configuration correcte dans la pratique.

#### Tableau 40.1.A : Comparaison des Cadres de Contrôle d\'Accès Obligatoire

  ----------------------------- ----------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------
  Caractéristique               SELinux                                                                                                                       AppArmor

  **Philosophie**               Basé sur l\'étiquetage (labels) de chaque objet et sujet. La politique définit les interactions entre les types.              Basé sur les chemins (paths) des exécutables. La politique est définie par programme.

  **Granularité**               Très granulaire, contrôle au niveau du système de fichiers, des processus, des sockets, des capacités, etc.                   Moins granulaire, principalement axé sur les accès aux fichiers et les capacités.

  **Complexité**                Élevée, courbe d\'apprentissage abrupte. Nécessite une compréhension des contextes, des types, des rôles et des politiques.   Plus faible, plus intuitive pour les administrateurs familiers avec les permissions de fichiers standards.

  **Outils Principaux**         semanage, setsebool, audit2allow, chcon, restorecon                                                                           aa-genprof, aa-complain, aa-enforce, apparmor_parser

  **Distribution par défaut**   Fedora, Red Hat Enterprise Linux (RHEL), CentOS                                                                               Ubuntu, SUSE Linux Enterprise Server (SLES), Debian
  ----------------------------- ----------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------

## 40.2 Vulnérabilités Logicielles : La Corruption de Mémoire

Après avoir examiné les défenses au niveau du système d\'exploitation, nous plongeons maintenant au cœur des vulnérabilités qui affectent les logiciels eux-mêmes. Parmi les classes de failles les plus anciennes, les plus dangereuses et les plus étudiées figurent les **vulnérabilités de corruption de mémoire**. Ces failles, endémiques dans les langages de programmation qui permettent un accès direct à la mémoire comme le C et le C++, ont été la source de certaines des exploitations les plus notoires de l\'histoire de l\'informatique.

Pour comprendre ces vulnérabilités, il est impératif de commencer par une analyse détaillée de la manière dont la mémoire est organisée et gérée pour un processus en cours d\'exécution. C\'est dans cette organisation que se trouvent à la fois la puissance de ces langages et les germes de leur insécurité.

### 40.2.1 Anatomie de la Mémoire d\'un Processus et Débordement de Tampon

Lorsqu\'un système d\'exploitation charge un programme pour l\'exécuter, il lui alloue un espace d\'adressage virtuel. Cet espace mémoire n\'est pas un bloc monolithique ; il est structuré en plusieurs segments distincts, chacun ayant un rôle précis. Sur une architecture typique comme x86-64 sous Linux, cette disposition ressemble à ceci :

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+ \<\-- Adresses hautes\
\
\| Ligne de commande \|\
\| et variables \|\
\| d\'environnement \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| \|\
\| Pile \|\
\| (Stack) \|\
\| \| \|\
\| v \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| \|\
\| \... \|\
\| (Espace libre) \|\
\| \... \|\
\| \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| \^ \|\
\| \| \|\
\| Tas \|\
\| (Heap) \|\
\| \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| .bss \| (Variables globales/statiques non initialisées)\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| .data \| (Variables globales/statiques initialisées)\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| .text \| (Code du programme)\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+ \<\-- Adresses basses (proche de 0)

> **Segment .text** : Contient les instructions machine du programme. Ce segment est généralement marqué en lecture seule et exécutable pour empêcher le programme de modifier son propre code en cours d\'exécution.
>
> **Segments .data et .bss** : Utilisés pour stocker les variables globales et les variables statiques. .data contient celles qui sont initialisées avec une valeur dans le code source, tandis que .bss contient celles qui ne le sont pas (et qui sont initialisées à zéro par le système d\'exploitation).
>
> **Le Tas (*Heap*)** : C\'est une région de mémoire utilisée pour l\'allocation dynamique. Lorsque le programme a besoin de mémoire dont la taille n\'est pas connue à la compilation (par exemple, pour stocker des données lues depuis un fichier), il peut la demander via des fonctions comme malloc() en C. Le tas grandit généralement des adresses basses vers les adresses hautes.
>
> **La Pile (*Stack*)** : C\'est une région de mémoire cruciale pour la gestion des appels de fonction. Elle est utilisée pour stocker les variables locales, les paramètres de fonction et les informations de contrôle de flux. Contrairement au tas, la pile grandit des adresses hautes vers les adresses basses.

C\'est sur le fonctionnement de la pile que nous allons maintenant nous concentrer, car elle est au cœur de la vulnérabilité de débordement de tampon la plus classique et la plus fondamentale.

#### 40.2.1.1 La Pile d\'Exécution (The Call Stack)

La pile est une structure de données de type **LIFO (Last-In, First-Out)**, ou \"dernier entré, premier sorti\". On peut se la représenter comme une pile d\'assiettes : on ne peut ajouter une nouvelle assiette que sur le dessus, et on ne peut retirer que l\'assiette qui se trouve sur le dessus.

À chaque fois qu\'une fonction est appelée dans un programme, un nouveau bloc de données, appelé **cadre de pile** (*stack frame*), est \"poussé\" (empilé) sur le dessus de la pile. Ce cadre contient tout ce qui est nécessaire à l\'exécution de cette fonction. Lorsqu\'une fonction se termine, son cadre de pile est \"dépilé\", libérant l\'espace et ramenant le programme à l\'état où il était avant l\'appel.

Le processeur utilise deux registres principaux pour gérer le cadre de pile courant :

> **ESP (Extended Stack Pointer)** : Le pointeur de pile. Il pointe toujours vers le **sommet** actuel de la pile (l\'adresse la plus basse de la pile, car elle grandit vers le bas).
>
> **EBP (Extended Base Pointer)** : Le pointeur de base du cadre. Il pointe vers la **base** du cadre de pile *courant*, servant de point de référence stable pour accéder aux variables locales et aux paramètres de la fonction.

Examinons en détail ce qui se passe lors d\'un appel de fonction simple. Supposons qu\'une fonction main() appelle une fonction vulnerable_function(arg1, arg2). Le processus de création du cadre de pile pour vulnerable_function est le suivant  :

> **Préparation de l\'appel par main()** : La fonction main() pousse les arguments (arg2, puis arg1) sur la pile.
>
> **L\'instruction CALL** : L\'exécution de l\'instruction CALL vulnerable_function effectue une action cruciale : elle pousse l\'**adresse de retour** sur la pile. C\'est l\'adresse de l\'instruction suivante dans main() que le processeur devra exécuter une fois vulnerable_function terminée. C\'est le mécanisme qui permet au programme de \"revenir en arrière\".
>
> **Le prologue de vulnerable_function** : Les premières instructions de la fonction appelée constituent son prologue. Elles préparent son propre cadre de pile :

push ebp : L\'ancienne valeur de EBP (qui pointait sur la base du cadre de main()) est sauvegardée sur la pile. C\'est ce qui permet de chaîner les cadres de pile entre eux.

mov ebp, esp : La valeur actuelle de ESP est copiée dans EBP. EBP pointe maintenant sur la base du *nouveau* cadre de pile.

> **Allocation des variables locales** : La fonction alloue de l\'espace pour ses propres variables locales en décrémentant ESP de la taille nécessaire (par exemple, sub esp, 64 pour allouer 64 octets).

Après ces étapes, la pile a la structure suivante (adresses hautes en haut) :

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\|\... cadre de main()\... \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| arg2 \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| arg1 \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| Adresse de Retour \| \<\-- Instruction dans main()\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
EBP -\> \| EBP Sauvegardé \| \<\-- Ancien EBP de main()\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| \|\
\| Variables Locales \|\
\| \|\
ESP -\> +\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

Cette structure est fondamentale. Notez la position relative des éléments : les variables locales sont situées à des adresses plus basses que l\'EBP sauvegardé et, surtout, que l\'**adresse de retour**. C\'est cette contiguïté en mémoire qui est à l\'origine de la vulnérabilité.

#### 40.2.1.2 Le Débordement de Tampon sur la Pile (Stack Buffer Overflow)

La vulnérabilité de débordement de tampon sur la pile (*stack buffer overflow*) se produit lorsqu\'un programme tente d\'écrire plus de données dans un tampon (typiquement un tableau de caractères) alloué sur la pile que l\'espace qui lui a été réservé. Des langages comme le C et le C++ sont particulièrement sensibles à ce problème car de nombreuses fonctions de manipulation de chaînes de caractères standards, telles que

strcpy(), strcat(), sprintf() et gets(), n\'effectuent aucune vérification des bornes. Elles continueront à écrire des données en mémoire tant qu\'elles n\'auront pas rencontré un caractère nul de fin de chaîne, ignorant la taille réelle du tampon de destination.

Considérons l\'exemple de code C suivant, qui est un archétype de cette vulnérabilité  :

> C

\#**include** \<stdio.h\>\
\#**include** \<string.h\>\
\
void vulnerable_function(char \*user_input) {\
char buffer;\
strcpy(buffer, user_input); // Vulnérable! Pas de vérification de taille.\
printf(\"Entrée reçue : %s\\n\", buffer);\
}\
\
int main(int argc, char \*argv) {\
if (argc \> 1) {\
vulnerable_function(argv);\
}\
return 0;\
}

Dans vulnerable_function, un tampon de 100 octets est alloué sur la pile. La fonction strcpy copie ensuite l\'entrée fournie par l\'utilisateur (user_input) dans ce tampon.

> **Cas normal** : Si l\'utilisateur fournit une chaîne de moins de 100 caractères, par exemple \"Bonjour\", tout se passe bien. La chaîne est copiée dans buffer, et la structure de la pile reste intacte.
>
> **Cas de débordement** : Imaginons maintenant que l\'utilisateur fournisse une chaîne de 120 caractères, par exemple 120 fois la lettre \'A\'. La fonction strcpy va commencer à écrire au début de buffer. Après avoir rempli les 100 octets de buffer, elle ne s\'arrêtera pas. Elle continuera à écrire les 20 \'A\' restants dans les emplacements mémoire adjacents, à des adresses plus hautes.

Visualisons l\'impact sur la pile :

**État de la pile avant strcpy :**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| Adresse de Retour \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
EBP -\> \| EBP Sauvegardé \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| \|\
\| buffer \|\
\| \|\
ESP -\> +\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

**État de la pile après strcpy avec une entrée de 120 \'A\' :**

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| AAAAAAAAAAAAAAAA\... \| \<\-- Adresse de Retour ÉCRASÉE\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
EBP -\> \| AAAAAAAA\... \| \<\-- EBP Sauvegardé ÉCRASÉ\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| AAAAAAAAAAAAAAAAAAAAA.. \|\
\| AAAAAAAAAAAAAAAAAAAAA.. \| \<\-- buffer REMPLI et DÉBORDÉ\
\| AAAAAAAAAAAAAAAAAAAAA.. \|\
ESP -\> +\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

Le débordement a corrompu des données de contrôle critiques sur la pile. L\'EBP sauvegardé a été écrasé, mais le plus grave est que l\'**adresse de retour a été écrasée** par des données contrôlées par l\'attaquant.

La conséquence est catastrophique. À la fin de vulnerable_function, lorsque le processeur exécute l\'instruction ret (qui fait partie de l\'épilogue de la fonction), il va dépiler la valeur qui se trouve au sommet de la pile et l\'utiliser comme la nouvelle adresse d\'instruction vers laquelle sauter. Au lieu de sauter à l\'adresse légitime dans main(), le processeur va tenter de sauter à une adresse composée de \'A\' (par exemple, 0x41414141 en ASCII), ce qui provoquera très probablement un plantage du programme (*segmentation fault*).

Cependant, un attaquant habile ne se contente pas de faire planter le programme. Il va fabriquer une entrée malveillante qui non seulement déborde du tampon, mais qui écrase l\'adresse de retour avec une valeur soigneusement choisie. Cette valeur sera l\'adresse d\'un code que l\'attaquant souhaite exécuter. C\'est le principe de l\'exploitation par *stack smashing*.

### 40.2.2 Techniques d\'Exploitation et Contre-mesures

La découverte du débordement de tampon sur la pile a initié une véritable \"course aux armements\" entre les attaquants qui cherchent à l\'exploiter et les défenseurs (concepteurs de compilateurs, de systèmes d\'exploitation et de matériel) qui développent des contre-mesures. Cette dynamique dialectique a conduit à des techniques d\'attaque et de défense de plus en plus sophistiquées.

#### 40.2.2.1 L\'Attaque Classique : \"Stack Smashing\"

L\'attaque de *stack smashing* est la première et la plus fondamentale technique d\'exploitation des débordements de tampon sur la pile. L\'objectif n\'est pas seulement de corrompre l\'adresse de retour, mais de la remplacer par l\'adresse d\'un code malveillant que l\'attaquant a lui-même injecté en mémoire.

> **Le Shellcode** : Le code malveillant injecté est appelé **shellcode**. Il s\'agit d\'une séquence d\'octets qui constitue des instructions machine exécutables. Historiquement, le but de ce code était souvent d\'exécuter un interpréteur de commandes (\
> *shell*, par exemple /bin/sh), donnant ainsi à l\'attaquant un accès interactif au système compromis, d\'où le nom \"shellcode\". Aujourd\'hui, le terme désigne tout type de charge utile exécutable injectée, qu\'il s\'agisse de télécharger un maliciel plus complexe, d\'ajouter un utilisateur ou d\'exfiltrer des données.
>
> **Construction de la Charge Utile (Payload)** : Pour réussir une attaque de *stack smashing*, l\'attaquant doit fabriquer une chaîne d\'entrée (la charge utile) qui combine le shellcode et la nouvelle adresse de retour. La structure typique d\'une telle charge utile est la suivante  :\
> \`\`

**Shellcode** : Le code malveillant à exécuter. L\'attaquant place ce code directement dans la chaîne d\'entrée. Lors de l\'appel à strcpy, ce shellcode sera copié sur la pile, à l\'intérieur du tampon buffer.

**Nouvelle Adresse de Retour** : C\'est la partie cruciale. L\'attaquant doit écraser l\'adresse de retour originale avec l\'adresse\... du shellcode qu\'il vient de placer sur la pile. Ainsi, lorsque la fonction vulnérable se termine, elle \"retourne\" directement au début du shellcode et l\'exécute.

**NOP-sled** : Déterminer l\'adresse exacte du début du shellcode sur la pile peut être difficile. Pour augmenter ses chances de succès, l\'attaquant préfixe souvent son shellcode avec une longue série d\'instructions NOP (No-Operation, opcode 0x90 sur x86). Ces instructions ne font rien, si ce n\'est faire avancer le pointeur d\'instruction. Si la nouvelle adresse de retour pointe n\'importe où dans ce \"traîneau de NOP\", l\'exécution \"glissera\" jusqu\'au shellcode et le déclenchera.

**Remplissage** : Des octets de remplissage sont utilisés pour s\'assurer que la nouvelle adresse de retour s\'aligne parfaitement pour écraser l\'adresse de retour originale sur la pile.

L\'exécution de cette attaque permet à l\'attaquant de prendre le contrôle total du flux d\'exécution du programme et d\'exécuter du code arbitraire avec les mêmes privilèges que le programme vulnérable. Si ce dernier s\'exécute avec des privilèges élevés, l\'attaquant obtient un contrôle quasi total du système.

#### 40.2.2.2 Contre-mesure 1 : Les Canaris de Pile (Stack Canaries)

La première ligne de défense majeure développée au niveau du compilateur contre le *stack smashing* est le mécanisme des **canaris de pile** (ou *stack canaries*), également connu sous le nom de *Stack Smashing Protector* (SSP). L\'analogie vient des canaris utilisés par les mineurs pour détecter les gaz toxiques : si le canari meurt, c\'est un signe de danger imminent.

> **Mécanisme** : Lorsqu\'une option comme -fstack-protector est activée, le compilateur modifie le prologue et l\'épilogue des fonctions qu\'il juge à risque (celles contenant des tampons de caractères).

**Au prologue** : Juste après la sauvegarde de l\'EBP et avant l\'allocation des variables locales, une valeur secrète et aléatoire, le **canari**, est poussée sur la pile. Cette valeur est généralement générée au démarrage du programme et stockée dans une zone de mémoire protégée.

**À l\'épilogue** : Juste avant de restaurer l\'EBP et d\'exécuter l\'instruction ret, le code vérifie que la valeur du canari sur la pile est toujours identique à la valeur secrète originale.

La structure de la pile devient alors :

+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| Adresse de Retour \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| EBP Sauvegardé \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| CANARI \| \<\-- Placé ici par le prologue\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+\
\
\| buffer\[\...\] \|\
+\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\--+

> **Efficacité et Détection** : Le canari est placé stratégiquement entre les tampons locaux et les données de contrôle (EBP sauvegardé et adresse de retour). Pour qu\'un attaquant puisse écraser l\'adresse de retour via un débordement de tampon linéaire, il doit *nécessairement* écraser le canari en premier. Lorsque l\'épilogue de la fonction détecte que la valeur du canari a été modifiée, il en conclut qu\'une attaque de corruption de pile a eu lieu. Au lieu de poursuivre une exécution potentiellement compromise, le programme est immédiatement terminé (par exemple, en appelant\
> \_\_stack_chk_fail). L\'attaque est ainsi transformée d\'une exécution de code arbitraire en un simple déni de service.
>
> **Limitations** : Bien qu\'efficaces, les canaris de pile ne sont pas infaillibles. Les attaquants peuvent tenter de les contourner, par exemple en exploitant une autre vulnérabilité de type fuite d\'information (*info leak*) pour lire la valeur du canari en mémoire avant de lancer l\'attaque, ou en trouvant un moyen d\'écraser l\'adresse de retour sans toucher au canari (par exemple, en exploitant un débordement sur une autre structure de données).

#### 40.2.2.3 Contre-mesure 2 : La Randomisation de l\'Espace d\'Adressage (ASLR)

L\'Address Space Layout Randomization (ASLR) est une technique de protection implémentée par le système d\'exploitation qui vise à rendre l\'exploitation des vulnérabilités de corruption de mémoire plus difficile en introduisant de l\'aléa.

> **Mécanisme** : L\'attaque de *stack smashing* classique repose sur le fait que l\'attaquant connaît (ou peut prédire) l\'adresse de son shellcode sur la pile. L\'ASLR brise cette hypothèse. À chaque fois qu\'un programme est lancé, le système d\'exploitation charge ses différents segments de mémoire (pile, tas, bibliothèques partagées, et même le binaire principal) à des adresses de base aléatoires dans l\'espace d\'adressage virtuel.
>
> **Efficacité** : Avec l\'ASLR activé, l\'attaquant ne peut plus coder en dur une adresse de retour dans sa charge utile, car l\'adresse de la pile (et donc de son shellcode) change à chaque exécution. Tenter de deviner l\'adresse correcte est une question de probabilité. Sur un système 64-bits, l\'espace d\'adressage est si vaste que la probabilité de deviner la bonne adresse par force brute est extrêmement faible. Une tentative d\'exploitation avec une mauvaise adresse conduit quasi-systématiquement au plantage de l\'application, ce qui peut alerter les systèmes de surveillance.
>
> **Limitations** : L\'efficacité de l\'ASLR dépend de la quantité d\'entropie (le degré d\'aléa) qu\'il introduit. Sur les anciens systèmes 32-bits, l\'espace d\'adressage limité réduisait le nombre d\'adresses possibles, rendant les attaques par force brute envisageables. De plus, l\'ASLR peut être contourné si l\'attaquant dispose d\'une vulnérabilité de fuite d\'information qui lui permet de révéler une adresse valide en mémoire (par exemple, l\'adresse d\'une fonction dans une bibliothèque chargée). Une fois qu\'une seule adresse est connue, l\'attaquant peut souvent calculer les adresses d\'autres éléments par rapport à ce point de référence, car les décalages relatifs à l\'intérieur d\'un même module (par exemple, une bibliothèque) restent constants.

#### 40.2.2.4 Contre-mesure 3 : La Prévention de l\'Exécution des Données (DEP / NX Bit)

La Prévention de l\'Exécution des Données (DEP) est sans doute la contre-mesure la plus directe et la plus puissante contre les attaques par injection de shellcode. Elle est implémentée grâce à une collaboration entre le matériel et le système d\'exploitation.

> **Mécanisme** : Les processeurs modernes incluent une fonctionnalité appelée le **bit NX (No-eXecute)** sur les architectures AMD, ou le **bit XD (Execute Disable)** sur les architectures Intel. Ce bit, associé à chaque page de la mémoire virtuelle, permet au système d\'exploitation de marquer une page comme contenant soit des données, soit du code exécutable, mais pas les deux. Le système d\'exploitation utilise cette fonctionnalité pour marquer explicitement les régions de mémoire destinées à contenir uniquement des données, comme la pile et le tas, comme étant\
> **non-exécutables**.
>
> **Efficacité** : Le DEP frappe au cœur de l\'attaque de *stack smashing*. Même si un attaquant réussit à contourner les canaris de pile et l\'ASLR, à injecter son shellcode sur la pile et à détourner le pointeur d\'instruction pour qu\'il pointe vers ce shellcode, l\'attaque échouera. Au moment où le processeur tentera d\'exécuter la première instruction du shellcode, il constatera que la page mémoire correspondante est marquée comme non-exécutable. Il lèvera alors une exception matérielle (une violation d\'accès), et le système d\'exploitation terminera immédiatement le processus. Le DEP semble donc être une solution quasi-définitive au problème de l\'exécution de code injecté.

#### 40.2.2.5 Contournement Avancé : La Programmation Orientée Retour (ROP)

Face à l\'obstacle quasi-infranchissable que représente le DEP, la communauté des attaquants a dû innover de manière radicale. Le résultat est une technique d\'exploitation élégante et puissante appelée **Programmation Orientée Retour** (*Return-Oriented Programming* ou ROP).

La philosophie de la ROP est la suivante : \"Si je ne peux plus injecter et exécuter mon propre code dans les zones de données, alors je vais réutiliser des petits morceaux de code légitime qui se trouvent déjà dans les zones exécutables du programme pour accomplir ma tâche.\"

> **Les \"Gadgets\"** : Un attaquant analyse le code exécutable du programme vulnérable et de ses bibliothèques partagées (comme la libc) à la recherche de courtes séquences d\'instructions utiles qui se terminent par une instruction ret (retour de fonction). Ces petites pépites de code sont appelées des **gadgets**.

Exemple de gadget simple : pop eax; ret (charge une valeur de la pile dans le registre EAX, puis retourne).

Exemple de gadget plus complexe : add ecx, edx; ret (additionne deux registres, puis retourne).

> **La Chaîne ROP (ROP Chain)** : L\'attaquant exploite un débordement de tampon non pas pour injecter un shellcode, mais pour construire une **fausse pile d\'appels** sur la pile. Cette fausse pile est une séquence d\'adresses pointant vers les gadgets qu\'il a sélectionnés, entrelacées avec les données que ces gadgets doivent manipuler.

Le déroulement d\'une attaque ROP est le suivant :

> L\'attaquant écrase l\'adresse de retour de la fonction vulnérable avec l\'adresse du **premier gadget** de sa chaîne.
>
> Lorsque la fonction vulnérable exécute ret, le contrôle est transféré au premier gadget.
>
> Le premier gadget exécute sa ou ses instructions (par exemple, pop eax). L\'instruction pop charge une valeur que l\'attaquant a préalablement placée sur la pile juste après l\'adresse du gadget.
>
> Le gadget se termine par son propre ret. Cette instruction dépile la valeur suivante sur la pile, qui est\... l\'adresse du **deuxième gadget**, et saute dessus.
>
> Le deuxième gadget s\'exécute, puis son ret transfère le contrôle au troisième, et ainsi de suite.
>
> **Turing-Complétude** : En enchaînant astucieusement des dizaines, voire des centaines de ces petits gadgets, un attaquant peut construire l\'équivalent d\'un programme complet. Il peut charger des valeurs dans des registres, effectuer des opérations arithmétiques et logiques, écrire en mémoire, et finalement, orchestrer un appel système (par exemple, execve(\"/bin/sh\", NULL, NULL)) pour atteindre son objectif final.

La ROP est une technique de contournement de DEP extrêmement puissante car, du point de vue du processeur et du système d\'exploitation, le programme n\'exécute jamais de code provenant d\'une zone non-exécutable. Il ne fait que sauter d\'un emplacement de code légitime à un autre. C\'est l\'enchaînement de ces sauts, orchestré par la pile corrompue, qui est malveillant. La ROP illustre parfaitement la nature de la course aux armements en sécurité : chaque défense, aussi robuste soit-elle, incite les attaquants à développer des contre-techniques encore plus ingénieuses.

## 40.3 Développement Logiciel Sécurisé (Secure SDLC)

Les sections précédentes ont détaillé la nature des vulnérabilités de bas niveau et les mécanismes de défense réactifs. Cependant, une approche mature de la sécurité ne se contente pas de corriger les failles après leur découverte ; elle vise à les empêcher d\'apparaître en premier lieu. C\'est l\'objectif du **Cycle de Vie du Développement Logiciel Sécurisé** (Secure Software Development Life Cycle - Secure SDLC ou SSDLC). Il s\'agit d\'une approche méthodologique qui intègre les considérations et les activités de sécurité à chaque phase du processus de développement logiciel, de la conception initiale à la maintenance post-déploiement.

Cette approche représente une évolution fondamentale par rapport au modèle traditionnel où la sécurité était souvent une réflexion après coup, une simple étape de test de pénétration effectuée juste avant la mise en production. Une telle approche tardive est non seulement moins efficace, mais aussi beaucoup plus coûteuse.

### 40.3.1 Introduction : Le Principe du \"Shift Left\"

Le concept central qui sous-tend le Secure SDLC est le **\"Shift Left\"** (décalage vers la gauche). Si l\'on représente le cycle de vie du développement logiciel sur une ligne de temps allant de gauche (conception) à droite (déploiement et maintenance), le \"shift left\" consiste à déplacer les activités de sécurité le plus à gauche possible dans ce processus.

> **Le Problème du Modèle Traditionnel** : Dans un SDLC classique, les phases sont typiquement : Exigences -\> Conception -\> Développement -\> Test -\> Déploiement. La sécurité intervenait principalement lors de la phase de \"Test\", souvent sous la forme d\'un audit ou d\'un test de pénétration. Découvrir une faille de conception architecturale à ce stade est un désastre : la corriger peut nécessiter de réécrire des pans entiers de l\'application, entraînant des retards importants et des coûts exorbitants.
>
> **La Solution \"Shift Left\"** : L\'approche \"shift left\" préconise d\'intégrer la sécurité dès la phase des \"Exigences\" et de la \"Conception\". Au lieu d\'attendre que le code soit écrit pour chercher des vulnérabilités, on se demande en amont : \"Comment ce système pourrait-il être attaqué?\" et \"Comment pouvons-nous le concevoir pour qu\'il soit résilient dès le départ?\". Cette philosophie se poursuit à chaque étape, avec des revues de code sécurisé, des outils d\'analyse automatisés intégrés dans les pipelines de développement, et des tests de sécurité continus.
>
> **Avantages du \"Shift Left\"** :

**Réduction des Coûts** : Identifier et corriger une vulnérabilité au stade de la conception coûte une fraction de ce que coûterait sa correction une fois l\'application en production.

**Accélération de la Livraison** : En traitant les problèmes de sécurité au fur et à mesure, on évite les \"bouchons\" de sécurité de fin de cycle qui retardent les lancements.

**Amélioration de la Culture de Sécurité** : Le \"shift left\" est un pilier de la culture **DevSecOps**, qui vise à faire de la sécurité une responsabilité partagée par tous les membres de l\'équipe (développeurs, opérations, sécurité) plutôt que le domaine exclusif d\'une équipe spécialisée. Les développeurs sont formés et outillés pour écrire du code plus sûr dès le départ.

### 40.3.2 Intégration de la Sécurité dans les Phases du SDLC

Un Secure SDLC efficace déploie des activités de sécurité spécifiques et adaptées à chaque phase du cycle de développement.

#### 40.3.2.1 Phase 1 : Exigences et Conception - La Modélisation des Menaces (Threat Modeling)

C\'est l\'activité \"shift left\" par excellence. La modélisation des menaces est un processus structuré et systématique pour identifier les menaces de sécurité potentielles, les vulnérabilités architecturales et les mesures d\'atténuation nécessaires, et ce, avant même qu\'une seule ligne de code ne soit écrite.

Le processus se déroule généralement en quatre étapes :

> **Décomposer l\'application** : Comprendre ce que l\'on construit. Cela se fait souvent en créant des **diagrammes de flux de données (DFD)**, qui représentent visuellement les processus, les flux de données, les zones de stockage de données et les frontières de confiance (*trust boundaries*) du système.
>
> **Identifier les menaces** : Pour chaque élément du DFD, on identifie les menaces potentielles. Une méthodologie très répandue pour guider ce brainstorming est **STRIDE**, un acronyme développé par Microsoft.
>
> **Évaluer les menaces** : Chaque menace identifiée est évaluée en fonction de son risque, souvent en utilisant un système de notation comme DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability) ou le plus moderne CVSS (Common Vulnerability Scoring System).
>
> **Définir les contre-mesures** : Pour chaque menace jugée significative, l\'équipe définit des contrôles de sécurité ou des modifications de conception pour l\'atténuer.

La méthodologie **STRIDE** est un outil mnémonique puissant pour s\'assurer de couvrir les principales catégories de menaces  :

> **S**poofing (Usurpation d\'identité) : Un attaquant se fait passer pour un autre utilisateur ou un autre composant. *Contre-mesure typique* : Authentification robuste (mots de passe forts, authentification multifacteur).
>
> **T**ampering (Altération) : Un attaquant modifie des données en transit ou au repos. *Contre-mesure typique* : Mécanismes d\'intégrité (hachages, signatures numériques, MACs).
>
> **R**epudiation (Répudiation) : Un utilisateur nie avoir effectué une action. *Contre-mesure typique* : Non-répudiation (journaux d\'audit sécurisés, signatures numériques).
>
> **I**nformation Disclosure (Divulgation d\'informations) : Un attaquant accède à des données confidentielles. *Contre-mesure typique* : Confidentialité (chiffrement, contrôle d\'accès strict).
>
> **D**enial of Service (Déni de service) : Un attaquant rend un service indisponible pour les utilisateurs légitimes. *Contre-mesure typique* : Disponibilité (filtrage du trafic, limitation de débit, redondance).
>
> **E**levation of Privilege (Élévation de privilèges) : Un utilisateur non privilégié obtient des droits d\'administrateur. *Contre-mesure typique* : Autorisation (appliquer le principe du moindre privilège).

En effectuant une modélisation des menaces dès la conception, les équipes peuvent éviter des failles architecturales fondamentales qui seraient extrêmement difficiles et coûteuses à corriger plus tard.

#### 40.3.2.2 Phase 2 : Implémentation - Codage Sécurisé et Analyse Statique (SAST)

Pendant que les développeurs écrivent le code, la sécurité doit rester une préoccupation centrale.

> **Lignes directrices de codage sécurisé** : Les organisations doivent établir et maintenir des standards de codage sécurisé adaptés aux langages et aux cadres applicatifs qu\'elles utilisent. Ces guides fournissent des règles concrètes pour éviter les pièges courants, comme la gestion des entrées utilisateur, la manipulation de la mémoire, la cryptographie, etc. Des références comme l\'OWASP Top 10 ou le CWE (Common Weakness Enumeration) sont des bases excellentes pour ces standards.
>
> **Analyse Statique de la Sécurité des Applications (SAST)** : Les outils SAST (Static Application Security Testing) sont des outils \"boîte blanche\" qui analysent le code source de l\'application (ou sa forme compilée, comme le bytecode) sans l\'exécuter.

**Fonctionnement** : Un outil SAST analyse le code pour y trouver des motifs de programmation qui correspondent à des vulnérabilités connues. Par exemple, il peut suivre le flux de données depuis une entrée utilisateur non validée jusqu\'à son utilisation dans une requête de base de données, et ainsi détecter une vulnérabilité potentielle d\'injection SQL.

**Intégration et Avantages** : L\'un des plus grands avantages du SAST est qu\'il peut être intégré très tôt. Des plugins SAST pour les environnements de développement intégrés (IDE) peuvent alerter les développeurs d\'une vulnérabilité potentielle au moment même où ils l\'écrivent. Les outils SAST sont également intégrés dans les pipelines d\'intégration continue/déploiement continu (CI/CD) pour scanner automatiquement chaque modification de code. Ils peuvent identifier la ligne de code exacte où se trouve la faille, ce qui facilite grandement la correction.

**Limites** : Le principal inconvénient des outils SAST est leur tendance à générer un nombre élevé de **faux positifs**. Comme ils n\'exécutent pas le code, ils manquent de contexte sur l\'environnement d\'exécution et peuvent signaler des problèmes qui ne sont pas réellement exploitables. De plus, ils ne peuvent pas détecter les vulnérabilités qui n\'apparaissent qu\'à l\'exécution, comme les erreurs de configuration du serveur ou les failles de logique métier.

#### 40.3.2.3 Phase 3 : Test - Analyse Dynamique (DAST) et Fuzzing

Une fois qu\'une version fonctionnelle de l\'application est disponible, de nouvelles techniques de test de sécurité peuvent être appliquées.

> **Analyse Dynamique de la Sécurité des Applications (DAST)** : Les outils DAST (Dynamic Application Security Testing) adoptent une approche \"boîte noire\". Ils testent l\'application pendant qu\'elle s\'exécute, en interagissant avec elle de l\'extérieur, comme le ferait un attaquant.

**Fonctionnement** : Un scanner DAST explore une application web ou une API en cours d\'exécution et envoie une multitude de charges utiles malveillantes pour tenter d\'exploiter des vulnérabilités courantes comme les scripts intersites (XSS), l\'injection SQL, ou les erreurs de configuration de sécurité. Il observe les réponses de l\'application pour détecter des signes de vulnérabilité.

**Avantages** : Le DAST est efficace pour trouver des vulnérabilités liées à l\'environnement d\'exécution et à la configuration, que le SAST ne peut pas voir. Il génère généralement beaucoup moins de faux positifs que le SAST, car chaque vulnérabilité signalée a été, en principe, confirmée par une réponse anormale de l\'application.

**Limites** : Le DAST intervient plus tard dans le cycle de vie, ce qui rend les corrections plus coûteuses. Comme il s\'agit d\'une approche \"boîte noire\", il ne peut pas identifier la ligne de code exacte responsable de la vulnérabilité, ce qui complique la tâche du développeur. De plus, sa couverture du code peut être incomplète s\'il ne parvient pas à atteindre toutes les fonctionnalités de l\'application.

> **Tests de Fuzzing (Fuzz Testing)** : Le fuzzing est une forme spécialisée de test dynamique qui se concentre sur la robustesse des points d\'entrée d\'une application.

**Principe** : Un fuzzer est un programme qui injecte automatiquement des données invalides, inattendues ou semi-aléatoires dans les entrées d\'une application (champs de formulaire, téléversements de fichiers, paquets réseau, etc.) dans le but de la faire planter. Un plantage (crash) ou un comportement inattendu signale souvent une vulnérabilité potentiellement exploitable, comme un débordement de tampon ou un déni de service.

**Types de Fuzzing** : On distingue plusieurs approches. Le **fuzzing par mutation** (ou *dumb fuzzing*) prend des entrées valides et y introduit des modifications aléatoires. Le **fuzzing par génération** (ou *smart fuzzing*) a une connaissance du format de données attendu et génère des entrées malformées mais structurellement plausibles. Le\
**fuzzing guidé par la couverture** (*coverage-guided fuzzing*), une technique de \"boîte grise\", utilise l\'instrumentation du code pour voir quelles parties du programme sont exécutées par une entrée donnée et utilise cette information pour générer de nouvelles entrées qui explorent des chemins de code encore non testés.

**Efficacité** : Le fuzzing est extrêmement efficace pour découvrir des vulnérabilités de corruption de mémoire et des cas limites que les développeurs et les testeurs n\'auraient pas anticipés.

En combinant la modélisation des menaces, le SAST, le DAST et le fuzzing, une organisation peut construire une stratégie de sécurité en couches qui couvre le cycle de vie du développement de manière beaucoup plus complète qu\'une simple vérification en fin de parcours.

#### Tableau 40.3.A : Comparaison des Méthodologies de Test de Sécurité

  ---------------------------- ------------------------------------------------------------------------ --------------------------------------------------------------------- -----------------------------------------------------------------------
  Caractéristique              SAST (Analyse Statique)                                                  DAST (Analyse Dynamique)                                              Fuzzing

  **Perspective**              Boîte blanche (interne)                                                  Boîte noire (externe)                                                 Boîte noire / grise / blanche

  **Objet d\'analyse**         Code source, bytecode                                                    Application en cours d\'exécution                                     Application en cours d\'exécution

  **Phase SDLC**               Implémentation (très tôt)                                                Test, Staging, Production                                             Test, Staging

  **Exemples de failles**      Injection SQL, Buffer Overflow, mots de passe en clair                   XSS, erreurs de configuration de serveur, failles de logique métier   Crashs, dénis de service, corruption de mémoire

  **Avantage principal**       Détection précoce, localisation précise de la faille                     Détection des failles d\'exécution, moins de faux positifs            Découverte de vulnérabilités \"inconnues\" et de cas limites

  **Inconvénient principal**   Taux élevé de faux positifs, ne voit pas l\'environnement d\'exécution   Intervient tard, ne localise pas la ligne de code                     Peut être long, couverture de code non garantie (pour la boîte noire)
  ---------------------------- ------------------------------------------------------------------------ --------------------------------------------------------------------- -----------------------------------------------------------------------

## 40.4 Analyse de Logiciels Malveillants (Malware) et Informatique Légale (Forensics)

Les sections précédentes se sont concentrées sur les mesures proactives et préventives pour sécuriser les systèmes et les logiciels. Cette dernière section aborde les disciplines réactives : que faire lorsqu\'une compromission a eu lieu ou est suspectée? Nous allons explorer deux domaines connexes mais distincts : l\'**analyse de logiciels malveillants**, qui cherche à comprendre le fonctionnement d\'un code malveillant, et l\'**informatique légale**, qui vise à collecter et analyser des preuves numériques de manière rigoureuse après un incident.

### 40.4.1 Analyse de Logiciels Malveillants (Malware)

L\'analyse de logiciels malveillants (*malware*) est le processus qui consiste à disséquer un échantillon de code malveillant pour comprendre ses caractéristiques, son comportement, son origine et son impact potentiel. Les objectifs de cette analyse sont multiples : développer des signatures de détection, comprendre les tactiques de l\'attaquant, identifier des indicateurs de compromission (IOCs) pour la chasse aux menaces (*threat hunting*), et contribuer à l\'effort global de renseignement sur les menaces.

#### 40.4.1.1 Classification des Menaces

Les logiciels malveillants, ou maliciels, sont une catégorie large de logiciels conçus dans un but nuisible. Ils peuvent être classés en fonction de leur mode de propagation et de leur charge utile (*payload*).

> **Virus** : Un virus est un type de maliciel qui s\'attache à un programme ou à un fichier exécutable légitime. Pour se propager, il a besoin qu\'un utilisateur exécute le fichier infecté. Une fois exécuté, le virus peut se répliquer en infectant d\'autres fichiers sur le système ou sur des partages réseau.
>
> **Ver (Worm)** : Contrairement à un virus, un ver est un maliciel autonome qui peut se répliquer et se propager sur les réseaux sans intervention humaine. Il exploite généralement des vulnérabilités dans les services réseau pour infecter de nouvelles machines. Des vers comme Stuxnet ou Code Red ont causé des dommages considérables en se propageant rapidement à travers l\'Internet.
>
> **Cheval de Troie (Trojan)** : Un cheval de Troie est un maliciel qui se déguise en logiciel légitime et utile pour tromper l\'utilisateur et l\'inciter à l\'installer. Une fois installé, il exécute sa fonction malveillante en arrière-plan, qui consiste souvent à ouvrir une porte dérobée (\
> *backdoor*) sur le système, permettant à un attaquant d\'en prendre le contrôle à distance, de voler des informations ou d\'installer d\'autres maliciels.
>
> **Rançongiciel (Ransomware)** : C\'est l\'une des menaces les plus visibles et les plus dommageables de ces dernières années. Un rançongiciel chiffre les fichiers de la victime (documents, photos, bases de données) et les rend inaccessibles. Il affiche ensuite une demande de rançon, exigeant un paiement (généralement en cryptomonnaie) en échange de la clé de déchiffrement.
>
> **Logiciel Espion (Spyware)** : Ce type de maliciel est conçu pour collecter des informations sur un utilisateur ou une organisation à leur insu. Il peut enregistrer les frappes au clavier (\
> *keylogger*), capturer des captures d\'écran, intercepter des communications ou voler des identifiants de connexion.
>
> **Logiciel Publicitaire (Adware)** : Moins dangereux mais très intrusif, l\'adware affiche des publicités non désirées à l\'utilisateur, souvent sous forme de pop-ups ou en modifiant les résultats de recherche du navigateur.
>
> **Rootkit** : Un rootkit est un ensemble d\'outils malveillants conçus pour obtenir un accès de niveau administrateur (root) à un système et pour dissimuler sa présence et ses activités. Les rootkits peuvent modifier des composants fondamentaux du système d\'exploitation pour se cacher des outils de détection.

#### 40.4.1.2 Techniques d\'Analyse

Les analystes de maliciels emploient principalement deux approches complémentaires pour étudier un échantillon. Cette dualité méthodologique est un thème central en sécurité logicielle, que ce soit pour l\'analyse de code malveillant ou pour la recherche de vulnérabilités dans du code légitime.

> **Analyse Statique**

L\'analyse statique consiste à examiner le fichier malveillant sans jamais l\'exécuter. C\'est généralement la première étape, car elle est plus rapide et moins risquée.

\* Analyse des propriétés de base : Cela inclut l\'examen des métadonnées du fichier, comme son hachage (MD5, SHA-256) pour le comparer à des bases de données de menaces connues, l\'extraction de chaînes de caractères lisibles (qui peuvent révéler des URL, des noms de fichiers, des messages d\'erreur ou des commandes), et l\'analyse des en-têtes du fichier (par exemple, les en-têtes PE pour un exécutable Windows) pour identifier les bibliothèques importées et les fonctions d\'API appelées.118

\* Désassemblage et Décompilation : Pour une analyse plus approfondie, les analystes utilisent des outils spécialisés pour traduire le code machine binaire en une forme plus lisible par l\'homme.

\* Un désassembleur convertit le code machine en langage d\'assemblage, qui est une représentation textuelle des instructions du processeur.116 C\'est une analyse de bas niveau mais précise.

\* Un décompilateur tente d\'aller plus loin en reconstruisant un code source de plus haut niveau (comme du C ou du C++) à partir du code machine. Le résultat n\'est jamais parfait, mais il peut grandement accélérer la compréhension de la logique du programme.120

\* Outils : Les outils de rétro-ingénierie comme IDA Pro, Ghidra (développé par la NSA et rendu open-source) et Radare2 sont les standards de l\'industrie pour le désassemblage et la décompilation.120

> **Analyse Dynamique**

L\'analyse dynamique consiste à exécuter le maliciel dans un environnement sécurisé et isolé pour observer son comportement en temps réel. Cette approche révèle ce que le maliciel

fait réellement, contournant les techniques d\'obfuscation qui peuvent rendre l\'analyse statique difficile.

\* Le Bac à Sable (Sandbox) : L\'analyse dynamique est presque toujours effectuée dans un bac à sable, qui est typiquement une machine virtuelle (VM) isolée du réseau de production.118 Cette VM est équipée d\'outils de surveillance qui enregistrent toutes les actions du maliciel. Après l\'analyse, la VM est restaurée à un état propre (

*snapshot*) pour être prête pour l\'échantillon suivant.

\* Comportements observés : L\'analyste surveille plusieurs aspects du comportement du maliciel :

\* Interactions avec le système de fichiers : Quels fichiers sont créés, modifiés ou supprimés?

\* Modifications du registre (sous Windows) : Quelles clés de registre sont créées ou modifiées, notamment pour assurer la persistance (démarrage automatique)?

\* Création de processus : Le maliciel lance-t-il d\'autres processus ou s\'injecte-t-il dans des processus légitimes?

\* Activité réseau : Tente-t-il de contacter des adresses IP ou des domaines? S\'agit-il de serveurs de commande et de contrôle (C2)? Télécharge-t-il des charges utiles supplémentaires? Exfiltre-t-il des données? 125

\* Outils : Alors que l\'analyse manuelle avec des outils comme Process Monitor, Wireshark et un débogueur est possible, l\'analyse dynamique est souvent automatisée. Cuckoo Sandbox est le système d\'analyse de maliciels dynamique open-source le plus connu et le plus utilisé.126 Il automatise l\'exécution d\'un échantillon dans une VM, collecte tous les artefacts comportementaux et génère un rapport complet et détaillé.125

La combinaison des analyses statique et dynamique offre la vision la plus complète du fonctionnement d\'un logiciel malveillant.

### 40.4.2 Informatique Légale (Digital Forensics)

L\'informatique légale, ou *digital forensics*, est la discipline qui consiste à appliquer des méthodes d\'investigation scientifique à l\'identification, la collecte, la préservation, l\'analyse et la présentation de preuves numériques. Alors que l\'analyse de maliciels se concentre sur le code lui-même, l\'informatique légale se concentre sur les traces qu\'une activité (malveillante ou autre) a laissées sur un système numérique.

La discipline est définie par une double contrainte : elle exige une rigueur technique extrême pour découvrir les preuves, tout en opérant dans un cadre juridique strict pour garantir que ces preuves soient admissibles devant un tribunal.

#### 40.4.2.1 Principes Fondamentaux

> **Objectifs** : L\'objectif principal est de reconstituer une séquence d\'événements de manière factuelle et objective à partir des artefacts numériques. Cela peut servir à identifier l\'auteur d\'une cyberattaque, à déterminer l\'étendue d\'une violation de données, à enquêter sur une fraude interne ou à soutenir des poursuites pénales.
>
> **La Chaîne de Possession (Chain of Custody)** : C\'est le principe le plus important de l\'informatique légale. La chaîne de possession est un document chronologique qui enregistre méticuleusement chaque personne qui a manipulé une preuve numérique, quand et pourquoi elle l\'a fait, et comment elle l\'a protégée. De la saisie initiale d\'un disque dur à sa présentation au tribunal, chaque transfert et chaque action doivent être documentés. Une rupture dans cette chaîne de possession peut rendre la preuve irrecevable, car il devient impossible de prouver qu\'elle n\'a pas été altérée.

#### 40.4.2.2 Le Processus d\'Investigation Numérique

Le processus d\'investigation légale suit généralement une méthodologie rigoureuse en plusieurs étapes.

> **1. Acquisition (ou Préservation)**

C\'est l\'étape de collecte des preuves. La règle d\'or est de ne jamais travailler sur les preuves originales pour éviter de les altérer.

\* Imagerie Disque (Disk Imaging) : Pour les supports de stockage non volatils (disques durs, SSD, clés USB), le processus standard consiste à créer une image forensique. Il ne s\'agit pas d\'une simple copie de fichiers, mais d\'une copie bit à bit (bit-for-bit) de l\'intégralité du support, y compris l\'espace non alloué, l\'espace libre et les fichiers supprimés.135 Des outils spécialisés comme

dd ou FTK Imager sont utilisés. Une fois l\'image créée, des hachages cryptographiques (SHA-256) sont calculés pour l\'image et le support original afin de prouver que la copie est une réplique exacte. Toute l\'analyse ultérieure se fera sur cette copie.

\* Acquisition de la Mémoire Vive (Memory Forensics) : Les données contenues dans la mémoire vive (RAM) sont volatiles, c\'est-à-dire qu\'elles sont perdues lorsque l\'ordinateur est éteint.138 Or, la RAM contient des artefacts d\'une valeur inestimable pour une enquête : la liste des processus en cours d\'exécution, les connexions réseau actives, les commandes récemment tapées, les clés de chiffrement, etc..139 L\'acquisition de la RAM (ou

*memory dump*) doit donc être effectuée sur le système *en marche* (*live forensics*) avant toute autre action.

> **2. Analyse**

C\'est la phase d\'examen de l\'image disque et du dump mémoire pour trouver des artefacts pertinents. Les analystes utilisent une panoplie d\'outils et de techniques pour :

\* Reconstituer une chronologie (timeline) : En corrélant les horodatages (timestamps) de création, de modification et d\'accès des fichiers, des entrées de registre et des journaux d\'événements, l\'analyste peut reconstituer la séquence des actions de l\'attaquant.

\* Récupérer des données supprimées : Les fichiers supprimés ne sont souvent pas effacés physiquement du disque, mais simplement marqués comme tels dans le système de fichiers. Des outils peuvent les récupérer tant que l\'espace qu\'ils occupaient n\'a pas été réécrit.

\* Analyser les artefacts du système d\'exploitation : Chaque OS laisse des traces de l\'activité. Sous Windows, cela inclut le Registre, les fichiers de raccourcis (LNK), les Prefetch files, etc. Sous Linux, ce sont les historiques de commandes, les journaux système dans /var/log, etc.

\* Analyser la mémoire vive : Des outils comme le Volatility Framework sont spécialisés dans l\'analyse des dumps mémoire.139 Ils peuvent extraire la liste des processus qui s\'exécutaient au moment de la capture, retrouver des fragments de code malveillant injecté (fileless malware), lister les connexions réseau passées, et même extraire des mots de passe ou des clés de chiffrement qui se trouvaient en clair en mémoire.

> **3. Présentation (ou Rapport)**

La dernière étape consiste à documenter les conclusions de l\'analyse dans un rapport formel. Ce rapport doit être clair, concis, factuel et objectif. Il doit présenter les preuves trouvées, expliquer les méthodes utilisées pour les obtenir et les analyser, et exposer les conclusions de l\'analyste de manière compréhensible pour un public qui peut être non technique (avocats, juges, direction d\'entreprise). Chaque conclusion doit être étayée par des preuves vérifiables. C\'est ce rapport, soutenu par une chaîne de possession impeccable, qui pourra être utilisé dans un contexte juridique.

#
