# Chapitre I.37 : Fondements de la Sécurité Informatique

La sécurité informatique, ou cybersécurité, est devenue une préoccupation centrale dans la conception et l\'exploitation des systèmes informatiques modernes. Loin d\'être une simple collection de technologies ou de produits à appliquer après coup, elle constitue une discipline d\'ingénierie à part entière, dont les principes doivent imprégner chaque phase du cycle de vie d\'un système, de sa conception initiale à son démantèlement. Traiter la sécurité comme une réflexion après coup est une invitation quasi certaine à l\'échec, entraînant des vulnérabilités coûteuses, des pertes de données catastrophiques et une érosion de la confiance des utilisateurs. L\'impératif est donc de l\'intégrer comme une exigence fondamentale, au même titre que la performance, la fiabilité ou la maintenabilité. Ce chapitre a pour vocation d\'établir les fondements de cette discipline, en présentant non pas un catalogue de solutions ponctuelles, mais un cadre de pensée rigoureux et systématique.

Pour ce faire, notre exploration s\'articulera autour d\'une progression logique. Nous commencerons par définir les objectifs ultimes de la sécurité, c\'est-à-dire les propriétés fondamentales que nous cherchons à préserver. Cette démarche nous mènera d\'abord au modèle classique et universellement reconnu de la triade Confidentialité, Intégrité et Disponibilité (CIA), avant de l\'étendre à d\'autres concepts essentiels tels que l\'authenticité et la non-répudiation, qui sont indispensables à la construction de la confiance dans les écosystèmes numériques complexes. Une fois ces objectifs établis, nous aborderons la méthodologie proactive permettant de les atteindre. Nous présenterons l\'analyse des risques comme un processus formel et la modélisation des menaces comme une technique d\'ingénierie préventive, permettant d\'anticiper et de neutraliser les vulnérabilités avant même qu\'elles ne soient exploitées. Enfin, nous nous plongerons dans l\'étude détaillée de deux piliers opérationnels de la sécurité : l\'authentification, qui consiste à vérifier l\'identité d\'une entité, et le contrôle d\'accès, qui détermine les actions que cette identité est autorisée à accomplir. À travers ce parcours, des principes premiers aux mécanismes concrets, ce chapitre vise à doter l\'ingénieur, l\'architecte et le futur professionnel de la sécurité des bases conceptuelles indispensables pour construire des systèmes non seulement fonctionnels, mais fondamentalement sûrs.

## 37.1 Les Objectifs Fondamentaux de la Sécurité

Avant de pouvoir construire des systèmes sécurisés, il est impératif de définir précisément ce que le terme « sécurité » signifie. En ingénierie, on ne peut protéger un système sans d\'abord établir les propriétés que cette protection vise à garantir. Au cœur de la sécurité de l\'information se trouve un ensemble d\'objectifs fondamentaux qui servent de boussole pour l\'analyse des menaces, la conception des contrôles et l\'évaluation de l\'efficacité des mesures mises en place. Le modèle le plus ancien et le plus influent pour conceptualiser ces objectifs est la triade CIA, qui se concentre sur la Confidentialité, l\'Intégrité et la Disponibilité des informations. Ce modèle, par sa simplicité et sa puissance, constitue le socle de la discipline. Toutefois, l\'évolution des systèmes vers des environnements transactionnels et juridiquement contraignants a mis en lumière la nécessité d\'étendre ce cadre pour y inclure des propriétés qui garantissent non seulement la protection des données, mais aussi la confiance dans les actions et les identités numériques.

### 37.1.1 La Triade CIA : Le Socle de la Sécurité de l\'Information

La triade CIA est un modèle fondamental qui constitue la base du développement des systèmes de sécurité. Composée des trois principes de Confidentialité, d\'Intégrité et de Disponibilité, elle offre un cadre simple mais complet pour identifier les vulnérabilités, classer les menaces et orienter la mise en œuvre de contre-mesures. Chaque pilier de la triade répond à une question essentielle sur la protection de l\'information : « Qui peut accéder à l\'information? » (Confidentialité), « L\'information est-elle fiable? » (Intégrité), et « Peut-on accéder à l\'information quand on en a besoin? » (Disponibilité). L\'universalité de ce modèle est telle qu\'il est explicitement référencé dans des normes et réglementations internationales majeures, telles que la norme ISO/IEC 27001 pour la gestion de la sécurité de l\'information et le Règlement Général sur la Protection des Données (RGPD) de l\'Union européenne, ce qui cimente son importance en tant que langage commun pour les professionnels de la sécurité.

#### La Confidentialité : Protéger le secret

La confidentialité est la propriété qui garantit que l\'information n\'est pas divulguée ou rendue accessible à des individus, entités ou processus non autorisés. Elle vise à prévenir l\'accès illicite à des données sensibles, qu\'il s\'agisse de secrets commerciaux, d\'informations personnelles, de dossiers médicaux ou de données gouvernementales classifiées. En somme, la confidentialité est synonyme de secret et de contrôle de l\'accès à l\'information.

**Menaces et Vecteurs d\'Attaque**

Les menaces visant la confidentialité sont nombreuses et variées. Elles peuvent être intentionnelles, comme dans le cas d\'une cyberattaque, ou accidentelles, résultant d\'une erreur humaine. Parmi les vecteurs d\'attaque les plus courants, on retrouve :

> **Les violations de données (Data Breaches)** : Il s\'agit de l\'accès non autorisé et de l\'exfiltration de données stockées dans des bases de données ou des systèmes de fichiers. Ces attaques peuvent résulter de l\'exploitation de vulnérabilités logicielles ou de configurations de sécurité inadéquates.
>
> **L\'ingénierie sociale** : Des techniques comme l\'hameçonnage (phishing) visent à tromper les utilisateurs pour qu\'ils divulguent volontairement leurs informations d\'identification (mots de passe, codes d\'accès), permettant ainsi à un attaquant d\'usurper leur identité et d\'accéder à des données confidentielles.
>
> **Les attaques de l\'homme du milieu (Man-in-the-Middle, MitM)** : Un attaquant intercepte secrètement les communications entre deux parties pour écouter, voire modifier, les données échangées. Si les communications ne sont pas chiffrées, les informations confidentielles sont exposées en clair.
>
> **Les logiciels malveillants** : Des logiciels espions (spyware) ou des enregistreurs de frappe (keyloggers) peuvent être installés sur le poste de travail d\'un utilisateur pour capturer des informations sensibles, telles que des mots de passe ou des numéros de carte de crédit, directement à la source.
>
> **Les menaces internes (Insider Threats)** : Un employé ou un partenaire disposant d\'un accès légitime peut, de manière malveillante ou par négligence, divulguer des informations confidentielles à des tiers non autorisés.

**Contre-mesures et Mécanismes de Protection**

Pour préserver la confidentialité, une approche de défense en profondeur est nécessaire, combinant plusieurs types de contrôles :

> **Le chiffrement (Encryption)** : C\'est le principal mécanisme technique pour garantir la confidentialité. Le chiffrement transforme les données lisibles (texte en clair) en un format inintelligible (texte chiffré) à l\'aide d\'un algorithme et d\'une clé. Seuls ceux qui possèdent la clé de déchiffrement peuvent accéder à l\'information originale. Le chiffrement est essentiel pour protéger les données au repos (stockées sur un disque) et en transit (transmises sur un réseau).
>
> **Les contrôles d\'accès (Access Controls)** : Ces mécanismes, qui seront détaillés dans la section 37.4, consistent à définir et à appliquer des politiques rigoureuses pour déterminer qui peut accéder à quelles ressources. Ils sont le fondement de la mise en œuvre de la confidentialité en s\'assurant que seuls les utilisateurs authentifiés et autorisés peuvent consulter des données spécifiques. Cette approche est directement liée au Contrôle CIS 6 (Gestion des contrôles d\'accès).
>
> **La classification des données (Data Classification)** : Il s\'agit d\'un processus organisationnel qui consiste à catégoriser les données en fonction de leur niveau de sensibilité (par exemple, Publique, Interne, Confidentielle, Secrète). Cette classification dicte ensuite le niveau de protection requis pour chaque catégorie de données, permettant d\'allouer les ressources de sécurité de manière proportionnée.
>
> **La prévention des pertes de données (Data Loss Prevention, DLP)** : Les systèmes DLP sont des outils technologiques conçus pour surveiller, détecter et bloquer les transferts non autorisés de données sensibles hors du périmètre de l\'organisation, que ce soit par courriel, sur des clés USB ou vers des services infonuagiques.

#### L\'Intégrité : Garantir la fidélité des données

L\'intégrité est la propriété qui assure le maintien de la cohérence, de l\'exactitude et de la fiabilité des données tout au long de leur cycle de vie. Elle garantit que les données n\'ont été ni modifiées, ni altérées, ni détruites de manière non autorisée. L\'intégrité est cruciale dans d\'innombrables contextes : un système bancaire doit garantir l\'intégrité des soldes de comptes, un système médical doit préserver l\'intégrité des dossiers des patients, et un système de déploiement de logiciels doit assurer l\'intégrité de son code source.

**Menaces et Vecteurs d\'Attaque**

Les menaces à l\'intégrité peuvent compromettre la confiance que l\'on accorde aux données et aux systèmes.

> **L\'altération non autorisée de données (Tampering)** : C\'est l\'acte de modifier délibérément des données pour un gain malveillant. Cela peut inclure la falsification de transactions financières, la modification de journaux d\'audit pour effacer des traces, ou la défiguration d\'un site web pour diffuser de la désinformation. L\'attaque contre la chaîne d\'approvisionnement de SolarWinds, où du code malveillant a été injecté dans des mises à jour logicielles légitimes, est un exemple emblématique de violation de l\'intégrité logicielle.
>
> **Les logiciels malveillants** : Les virus peuvent corrompre des fichiers, tandis que les rançongiciels (ransomware) chiffrent les données, modifiant leur état et les rendant inutilisables, ce qui constitue une attaque directe contre leur intégrité.
>
> **Les erreurs humaines** : Un utilisateur autorisé peut accidentellement supprimer ou modifier des données critiques, compromettant ainsi leur intégrité sans intention malveillante.
>
> **Les défaillances système** : Des événements non humains, comme une panne de serveur, une coupure de courant ou une impulsion électromagnétique, peuvent entraîner la corruption des données stockées.

**Contre-mesures et Mécanismes de Protection**

Plusieurs mécanismes cryptographiques et procéduraux sont utilisés pour garantir l\'intégrité :

> **Les fonctions de hachage (Hashing)** : Un algorithme de hachage génère une empreinte numérique de taille fixe (appelée *hash* ou somme de contrôle) à partir d\'un ensemble de données. La moindre modification des données d\'entrée produit une empreinte complètement différente. En stockant ou en transmettant l\'empreinte avec les données, un destinataire peut recalculer l\'empreinte et la comparer à celle fournie pour vérifier si les données ont été altérées. C\'est un principe fondamental du Contrôle CIS 3 (Protection des données).
>
> **Les signatures numériques (Digital Signatures)** : En utilisant la cryptographie asymétrique, une signature numérique lie l\'identité d\'un signataire à un document ou à un ensemble de données. Elle garantit non seulement l\'intégrité des données (car la signature est invalide si les données sont modifiées), mais aussi leur authenticité.
>
> **Les systèmes de contrôle de version** : Des outils comme Git permettent de suivre toutes les modifications apportées aux fichiers (en particulier le code source) et de revenir à une version antérieure et correcte en cas de modification erronée ou de suppression accidentelle.
>
> **Les sauvegardes (Backups)** : La création régulière de copies des données permet de restaurer un état intègre connu en cas de corruption ou de perte de données.

#### La Disponibilité : Assurer l\'accès aux services

La disponibilité est la propriété qui garantit qu\'un système, un service ou une donnée est accessible et utilisable sur demande par une entité autorisée. Une défaillance de la disponibilité peut paralyser les opérations d\'une organisation, entraîner des pertes financières et nuire à sa réputation. Pour de nombreux services en ligne, la disponibilité est la propriété de sécurité la plus visible et la plus critique du point de vue de l\'utilisateur.

**Menaces et Vecteurs d\'Attaque**

Les menaces à la disponibilité visent à perturber ou à empêcher l\'accès légitime aux ressources.

> **Les attaques par déni de service (DoS et DDoS)** : Une attaque par déni de service (DoS) ou par déni de service distribué (DDoS) a pour but de submerger un serveur, un service ou un réseau avec un volume massif de trafic ou de requêtes illégitimes, le rendant ainsi incapable de répondre aux utilisateurs légitimes. L\'attaque par rançongiciel contre Colonial Pipeline en 2021, qui a entraîné l\'arrêt d\'un important oléoduc, a mis en évidence l\'impact dévastateur des attaques sur la disponibilité des infrastructures critiques.
>
> **Les rançongiciels (Ransomware)** : En chiffrant les fichiers d\'un système et en exigeant une rançon pour leur déchiffrement, les rançongiciels rendent les données et les systèmes inaccessibles, constituant ainsi une attaque directe contre la disponibilité.
>
> **Les défaillances matérielles ou logicielles** : La panne d\'un composant matériel (disque dur, alimentation), un bogue logiciel critique ou une mauvaise configuration peuvent rendre un système indisponible.
>
> **Les catastrophes naturelles et les pannes d\'infrastructure** : Des événements comme les incendies, les inondations, les tremblements de terre ou les pannes de courant prolongées peuvent détruire les centres de données et interrompre les services.

**Contre-mesures et Mécanismes de Protection**

Assurer une haute disponibilité repose sur des principes d\'ingénierie de la résilience :

> **La redondance** : La mise en place de composants ou de systèmes de secours permet d\'éliminer les points de défaillance uniques. Cela peut inclure des serveurs redondants (clustering), des connexions réseau multiples, des alimentations sans interruption (ASI) et des génératrices de secours.
>
> **Les plans de reprise après sinistre (Disaster Recovery Plans)** : Il s\'agit de procédures formelles et testées pour restaurer les opérations critiques après une perturbation majeure. Ces plans définissent les étapes à suivre, les responsabilités et les ressources nécessaires pour minimiser les temps d\'arrêt. La planification de la récupération des données est au cœur du Contrôle CIS 11.
>
> **Les sauvegardes régulières (Regular Backups)** : Essentielles pour l\'intégrité, elles le sont tout autant pour la disponibilité, car elles permettent de restaurer des données qui auraient été perdues ou rendues inaccessibles.
>
> **La protection contre les attaques DDoS** : Des services spécialisés et des équipements réseau peuvent analyser le trafic entrant pour filtrer les requêtes malveillantes et ne laisser passer que le trafic légitime, protégeant ainsi les services en aval.

#### L\'équilibre délicat de la Triade

Il est essentiel de comprendre que les trois composantes de la triade CIA ne sont pas toujours mutuellement renforçantes ; elles existent souvent dans un état de tension. L\'amélioration d\'une propriété peut se faire au détriment d\'une autre, et la tâche de l\'ingénieur en sécurité est de trouver un équilibre optimal adapté au contexte spécifique du système à protéger.

Cette tension se manifeste de plusieurs manières. Par exemple, des mesures de confidentialité très strictes, comme le chiffrement complexe et des contrôles d\'accès multi-niveaux, peuvent introduire une latence et une complexité d\'utilisation qui dégradent la performance et, par conséquent, la disponibilité pour les utilisateurs légitimes. Un système parfaitement confidentiel mais inaccessible n\'a aucune valeur. De même, des vérifications d\'intégrité rigoureuses, telles que le calcul de sommes de contrôle à chaque lecture de données, peuvent consommer des ressources de calcul importantes et ralentir le système, affectant ainsi sa disponibilité dans des applications à haut débit.

La priorisation des composantes de la triade dépend entièrement de la mission du système. Pour un site web d\'information public, la disponibilité est primordiale ; une interruption de service est plus dommageable qu\'une violation de confidentialité des données publiques. À l\'inverse, pour un système de commandement et de contrôle militaire, la confidentialité et l\'intégrité des ordres sont absolues, même si cela signifie que le système est moins accessible ou plus lent. Pour une plateforme de transactions financières, l\'intégrité des transactions est non négociable. La sécurité n\'est donc pas une quête d\'absolus, mais un exercice d\'ingénierie consistant à équilibrer ces objectifs concurrents en fonction du profil de risque et des exigences métier de l\'organisation.

### 37.1.2 Au-delà de la Triade : Propriétés Essentielles pour la Confiance Numérique

Bien que la triade CIA soit un cadre nécessaire et puissant pour la protection des actifs informationnels, elle n\'est plus suffisante pour décrire l\'ensemble des exigences de sécurité des systèmes modernes. Les interactions numériques, en particulier celles qui ont des conséquences juridiques ou financières, exigent des garanties qui vont au-delà de la simple protection des données. Des propriétés comme l\'Authenticité, la Non-répudiation et la Redevabilité sont devenues essentielles pour construire et maintenir la confiance dans un monde où les transactions et les communications sont de plus en plus dématérialisées.

#### L\'Authenticité : La preuve de l\'origine

L\'authenticité est la propriété qui garantit qu\'une information, une communication ou une entité est bien ce qu\'elle prétend être. Elle assure que la source d\'une donnée est véritable et digne de confiance. Si l\'intégrité répond à la question « Les données ont-elles été modifiées? », l\'authenticité répond à la question « Ces données proviennent-elles bien de la source alléguée? ».

Ces deux concepts sont intimement liés mais distincts. Il est possible de recevoir un message dont l\'intégrité est parfaite (il n\'a pas été altéré en transit) mais qui provient d\'une source usurpée (son authenticité est nulle). Inversement, un message peut provenir d\'une source authentique mais avoir été corrompu en chemin, perdant ainsi son intégrité. Pour qu\'une communication soit fiable, les deux propriétés doivent être garanties. Le principal mécanisme cryptographique permettant d\'assurer à la fois l\'intégrité et l\'authenticité est la **signature numérique**. En liant cryptographiquement l\'identité du signataire au contenu du message, elle prouve que le message n\'a pas été modifié et qu\'il provient bien de l\'expéditeur attendu.

#### La Non-répudiation : L\'impossibilité de nier une action

La non-répudiation est une garantie encore plus forte que l\'authenticité. Elle assure qu\'une partie à une transaction ou une communication ne peut pas nier ultérieurement y avoir participé. Cette propriété est fondamentale pour la validité juridique des contrats électroniques, des transactions financières et de toute action numérique qui doit être prouvable. Elle fournit une preuve irréfutable de l\'origine et de l\'intégrité des données, rendant les enregistrements électroniques recevables devant un tribunal.

Il est crucial de distinguer la non-répudiation de l\'authentification. L\'authentification est le processus qui vérifie l\'identité d\'un utilisateur *au moment où il accède à un système* (par exemple, avec un mot de passe). Elle établit que la personne est bien celle qu\'elle prétend être à un instant T. La non-répudiation, quant à elle, fournit une preuve durable et vérifiable d\'une action spécifique *après qu\'elle a eu lieu*. Un utilisateur authentifié pourrait toujours tenter de nier avoir effectué une transaction ; la non-répudiation l\'en empêche.

Pour atteindre la non-répudiation, plusieurs mécanismes doivent être combinés :

> **Les signatures numériques** : Elles sont le pilier de la non-répudiation, car elles lient de manière unique une identité cryptographique à une action spécifique.
>
> **L\'horodatage (Timestamping)** : Pour éviter les litiges sur le moment où une action a eu lieu, un service d\'horodatage de confiance peut apposer un sceau temporel cryptographiquement sécurisé sur une transaction ou un document, prouvant son existence à une date et une heure précises.
>
> **Les journaux d\'audit sécurisés (Secure Audit Logs)** : La tenue de registres détaillés et immuables de toutes les actions effectuées dans un système fournit une piste d\'audit qui peut servir de preuve en cas de litige.

#### La Redevabilité (Accountability) : L\'imputabilité des actions

La redevabilité est la propriété de sécurité qui garantit que les actions d\'une entité peuvent être tracées de manière unique jusqu\'à cette entité. C\'est le principe général qui englobe les mécanismes précédents. Alors que l\'authentification identifie un acteur et que la non-répudiation prouve une de ses actions, la redevabilité est l\'objectif global qui vise à rendre chaque acteur responsable de ses faits et gestes au sein du système. Un système qui assure la redevabilité est un système où l\'impunité est impossible ; toute action, qu\'elle soit légitime ou malveillante, laisse une trace indélébile menant à son auteur. La redevabilité est donc la pierre angulaire de la gouvernance de la sécurité, de la réponse aux incidents et de la conformité réglementaire.

#### La Chaîne de Confiance : De l\'Authentification à la Redevabilité

Ces propriétés de sécurité étendues ne sont pas des concepts isolés. Elles forment une chaîne logique et hiérarchique qui, ensemble, permettent d\'établir la confiance dans les interactions numériques. Cette chaîne de confiance se construit par étapes successives, chaque maillon s\'appuyant sur la solidité du précédent.

Le point de départ de toute sécurité transactionnelle est une **authentification** robuste. Sans une méthode fiable pour vérifier l\'identité d\'un utilisateur, toutes les garanties ultérieures s\'effondrent. Une fois l\'identité établie, les mécanismes d\'**authenticité** et d\'**intégrité**, souvent combinés dans une **signature numérique**, entrent en jeu pour garantir qu\'une action spécifique (comme l\'envoi d\'un ordre de virement ou la signature d\'un contrat) émane bien de l\'utilisateur authentifié et que son contenu n\'a pas été altéré.

La combinaison d\'une identité prouvée (grâce à l\'authentification) et d\'une action prouvée et inaltérée (grâce à l\'authenticité et à l\'intégrité) donne naissance à la **non-répudiation**. L\'utilisateur ne peut plus nier de manière crédible avoir initié cette action. Enfin, un système qui applique systématiquement ces principes et qui enregistre chaque étape dans des journaux d\'audit sécurisés atteint la

**redevabilité**. Toute action peut être imputée à son auteur, créant une piste de preuves complète et vérifiable.

Ce modèle en couches illustre une distinction fondamentale : la triade CIA se concentre principalement sur la protection de l\'**actif informationnel** lui-même (le secret, la fidélité et l\'accès aux données). Les propriétés étendues, quant à elles, se concentrent sur la protection des **transactions et des interactions** impliquant ces données. Cette vision globale est indispensable pour concevoir des systèmes à haute assurance, où la preuve d\'une action est aussi critique que la protection de l\'information sous-jacente.

## 37.2 L\'Ingénierie Proactive de la Sécurité : Analyse des Risques et Modélisation des Menaces

Après avoir défini les objectifs de la sécurité, la question suivante est de savoir comment les atteindre de manière structurée et efficace. Une approche réactive, qui consiste à attendre qu\'un incident se produise pour y répondre, est non seulement coûteuse mais aussi souvent inefficace. La discipline de la sécurité informatique moderne prône une démarche proactive, ancrée dans des principes d\'ingénierie, qui vise à anticiper et à neutraliser les menaces avant qu\'elles ne puissent causer des dommages. Cette section se consacre à deux piliers de cette approche proactive : le processus formel d\'analyse des risques, qui permet d\'identifier et de prioriser les dangers auxquels une organisation est confrontée, et la modélisation des menaces, une technique de conception qui intègre la sécurité au cœur même du cycle de vie du développement logiciel.

### 37.2.1 Le Processus Formel d\'Analyse des Risques

L\'analyse des risques est une démarche systématique visant à identifier, évaluer et hiérarchiser les risques qui pèsent sur les actifs, les opérations et les individus d\'une organisation en raison de l\'utilisation de ses systèmes d\'information. Il ne s\'agit pas d\'un simple exercice technique, mais d\'une activité de gestion fondamentale qui aligne les investissements en sécurité sur les objectifs stratégiques de l\'entreprise. Des méthodologies reconnues, comme la norme internationale ISO/IEC 27005 ou le cadre de gestion des risques du NIST (National Institute of Standards and Technology), fournissent des structures éprouvées pour mener à bien ce processus de manière rigoureuse et reproductible. Le processus se décompose généralement en plusieurs étapes clés.

#### Étape 1 : Établissement du Contexte et Identification des Actifs

La première étape consiste à définir le périmètre de l\'analyse et à identifier les actifs critiques qui s\'y trouvent. Un actif est tout élément ayant de la valeur pour l\'organisation. Cela inclut non seulement les actifs tangibles comme les serveurs et les postes de travail, mais aussi les actifs intangibles tels que les données (bases de données clients, propriété intellectuelle), les logiciels, les services (plateforme de commerce électronique, messagerie interne) et même la réputation de l\'entreprise. Pour chaque actif, il est crucial d\'évaluer sa valeur ou sa criticité. Par exemple, la compromission de la base de données clients aura un impact beaucoup plus important que la panne d\'une imprimante de bureau. Cette hiérarchisation permet de concentrer les efforts de protection sur ce qui compte le plus.

#### Étape 2 : Identification des Menaces et des Vulnérabilités

Une fois les actifs identifiés, l\'étape suivante consiste à déterminer ce qui pourrait leur nuire. Pour ce faire, il faut distinguer deux concepts :

> Une **menace** est un événement ou une circonstance susceptible de causer un dommage à un actif. Les menaces peuvent être d\'origine humaine (attaquant externe, employé malveillant ou négligent) ou non humaine (catastrophe naturelle, panne matérielle).
>
> Une **vulnérabilité** est une faiblesse dans un actif ou un contrôle de sécurité qui peut être exploitée par une menace. Un logiciel non mis à jour, un mot de passe faible, une absence de plan de sauvegarde ou un manque de formation des employés sont autant d\'exemples de vulnérabilités.

Le risque n\'existe que lorsqu\'une menace peut exploiter une vulnérabilité pour porter atteinte à un actif. L\'identification de ces paires menace-vulnérabilité se fait par le biais d\'audits de sécurité, de scanners de vulnérabilités, de tests d\'intrusion et d\'une veille sur les nouvelles techniques d\'attaque.

#### Étape 3 : Évaluation de l\'Impact et de la Vraisemblance

Toutes les paires menace-vulnérabilité ne présentent pas le même niveau de danger. Pour les hiérarchiser, il faut évaluer deux dimensions pour chacune d\'entre elles :

> La **vraisemblance** (ou probabilité) d\'occurrence de la menace. Est-il très probable ou très improbable qu\'un attaquant tente d\'exploiter cette vulnérabilité?
>
> L\'**impact** (ou conséquence) potentiel si la menace se matérialise. Quels seraient les dommages pour l\'organisation en termes financiers, opérationnels, réputationnels ou réglementaires?

Cette évaluation peut être qualitative (par exemple, en utilisant une échelle de type faible, moyenne, élevée) ou quantitative (en tentant d\'assigner une valeur monétaire à l\'impact et une probabilité numérique à la vraisemblance). Le niveau de risque est souvent exprimé comme le produit de ces deux facteurs :

Risque=Vraisemblance×Impact. Ce calcul permet de créer une cartographie des risques, mettant en évidence les risques les plus critiques qui nécessitent une attention prioritaire.

#### Étape 4 : Traitement du Risque

Une fois les risques identifiés et hiérarchisés, l\'organisation doit décider de la manière de les traiter. Quatre stratégies principales sont possibles  :

> **Réduction (ou Atténuation)** : C\'est la stratégie la plus courante. Elle consiste à mettre en œuvre des contrôles de sécurité (techniques, organisationnels ou procéduraux) pour réduire soit la vraisemblance d\'occurrence de la menace, soit son impact potentiel. L\'installation d\'un pare-feu, le renforcement des mots de passe ou la formation des employés sont des exemples de mesures de réduction.
>
> **Transfert** : Cette stratégie consiste à déplacer la charge financière du risque vers une autre entité. La souscription à une cyberassurance est l\'exemple le plus typique de transfert de risque. L\'externalisation d\'un service à un fournisseur spécialisé peut également être une forme de transfert, bien que l\'organisation reste ultimement responsable de la sécurité de ses données.
>
> **Évitement** : Parfois, le risque associé à une activité est si élevé que la meilleure solution est de cesser cette activité. Par exemple, une organisation pourrait décider de démanteler un vieux système informatique trop vulnérable plutôt que de tenter de le sécuriser, évitant ainsi tous les risques qui y sont associés.
>
> **Acceptation** : Il n\'est ni possible ni économiquement viable d\'éliminer tous les risques. L\'acceptation du risque est une décision consciente et documentée de ne pas prendre de mesure pour un risque donné, généralement parce que son niveau est jugé acceptable (inférieur au seuil de tolérance de l\'organisation) ou que le coût de son traitement dépasserait largement l\'impact potentiel.

#### Étape 5 : Surveillance et Réévaluation Continue

L\'analyse des risques n\'est pas un projet ponctuel, mais un cycle de vie continu. Le paysage des menaces, les vulnérabilités, la valeur des actifs et les objectifs de l\'organisation évoluent constamment. Il est donc impératif de surveiller en permanence l\'efficacité des contrôles mis en place et de réévaluer régulièrement l\'analyse des risques pour s\'assurer qu\'elle reste pertinente et à jour. Cette surveillance continue permet à l\'organisation de s\'adapter de manière agile aux nouvelles menaces et de maintenir une posture de sécurité résiliente.

### 37.2.2 La Modélisation des Menaces : Penser comme un Attaquant

Alors que l\'analyse des risques offre une vue d\'ensemble de la posture de sécurité d\'une organisation, la modélisation des menaces est une technique d\'ingénierie plus ciblée, appliquée spécifiquement au cycle de vie du développement logiciel (SDLC). Il s\'agit d\'un processus structuré pour identifier, évaluer et atténuer les menaces de sécurité et les vulnérabilités potentielles au niveau de la conception d\'une application ou d\'un système.

L\'avantage fondamental de la modélisation des menaces réside dans son approche \"shift-left\" : elle déplace la sécurité au début du processus de développement. Identifier et corriger une faille de conception avant qu\'une seule ligne de code ne soit écrite est exponentiellement moins coûteux et plus efficace que de découvrir et de réparer une vulnérabilité dans un système en production. Cette pratique incarne le principe de la \"sécurité dès la conception\" (

*security by design*).

#### Le Processus de Modélisation des Menaces

Bien qu\'il existe plusieurs méthodologies, le processus de modélisation des menaces suit généralement quatre grandes étapes, souvent résumées par le cadre des quatre questions de l\'OWASP  :

> **Décomposer l\'application (Sur quoi travaillons-nous?)** : La première étape consiste à comprendre le système et à le représenter visuellement. L\'outil le plus courant pour cela est le Diagramme de Flux de Données (DFD). Un DFD identifie les composants clés du système (processus, magasins de données, entités externes) et les flux de données qui circulent entre eux. Un élément crucial de cette étape est la définition des **frontières de confiance** (*trust boundaries*). Une frontière de confiance est une ligne imaginaire sur le diagramme qui sépare des zones de niveaux de confiance différents (par exemple, entre un navigateur non authentifié et un serveur web, ou entre le serveur web et une base de données interne). Les flux de données qui traversent ces frontières sont des points de contrôle de sécurité critiques et souvent des cibles privilégiées pour les attaquants.
>
> **Identifier les menaces (Qu\'est-ce qui pourrait mal tourner?)** : Une fois le système décomposé, l\'étape suivante consiste à analyser systématiquement chaque composant et chaque flux de données du DFD pour identifier les menaces potentielles. C\'est là qu\'une taxonomie des menaces, comme la méthodologie STRIDE, devient un outil inestimable pour guider ce brainstorming de manière structurée et exhaustive.
>
> **Déterminer les contre-mesures (Que pouvons-nous faire?)** : Pour chaque menace identifiée, l\'équipe doit proposer et documenter des mesures d\'atténuation ou des contrôles de sécurité. L\'objectif est de réduire le risque associé à la menace à un niveau acceptable. Les contre-mesures peuvent être des modifications de la conception, l\'ajout de contrôles de sécurité spécifiques (comme le chiffrement ou la validation des entrées) ou des changements de configuration.
>
> **Valider (Avons-nous fait un bon travail?)** : La dernière étape consiste à s\'assurer que les contre-mesures ont été correctement mises en œuvre et qu\'elles sont efficaces pour atténuer les menaces identifiées. Cela peut impliquer des revues de code, des tests de sécurité et une mise à jour continue du modèle de menaces à mesure que l\'application évolue.

#### La Méthodologie STRIDE : Une Taxonomie des Menaces

Développée chez Microsoft, la méthodologie STRIDE est un mnémonique qui aide les ingénieurs à identifier les menaces de sécurité en les classant en six catégories distinctes. Sa force réside dans sa capacité à fournir un cadre complet qui garantit que tous les principaux types de menaces sont pris en compte lors de l\'analyse d\'un système.

##### S -- ***Spoofing*** (Usurpation d\'identité)

> **Définition** : L\'usurpation d\'identité est l\'acte pour un attaquant de se faire passer pour un autre utilisateur, un autre processus ou un autre système afin d\'obtenir un accès non autorisé.
>
> **Propriété de sécurité violée** : **Authenticité**.
>
> **Exemples** : Utiliser des identifiants de connexion volés pour accéder à un compte, falsifier l\'adresse IP source d\'un paquet réseau, ou envoyer un courriel d\'hameçonnage qui semble provenir d\'une banque légitime.
>
> **Contre-mesures** : Des mécanismes d\'authentification robustes (mots de passe forts, authentification multifacteur), des signatures numériques pour vérifier l\'origine des messages, et des protocoles réseau sécurisés qui valident l\'identité des participants.

##### T -- ***Tampering*** (Altération)

> **Définition** : L\'altération est la modification non autorisée de données, que ce soit au repos (dans un fichier, une base de données) ou en transit (sur un réseau).
>
> **Propriété de sécurité violée** : **Intégrité**.
>
> **Exemples** : Modifier le montant d\'une transaction financière interceptée, injecter du code SQL malveillant dans une requête de base de données, ou altérer un fichier de configuration sur un serveur pour désactiver des contrôles de sécurité.
>
> **Contre-mesures** : Les fonctions de hachage (sommes de contrôle) pour détecter les modifications, les signatures numériques, les listes de contrôle d\'accès (ACL) pour restreindre les permissions d\'écriture, et l\'utilisation de protocoles de communication chiffrés et authentifiés comme TLS.

##### R -- ***Repudiation*** (Répudiation)

> **Définition** : La répudiation se produit lorsqu\'un utilisateur nie avoir effectué une action, et que le système ne dispose d\'aucune preuve pour le contredire. Cela concerne la traçabilité et l\'imputabilité des actions.
>
> **Propriété de sécurité violée** : **Non-répudiation**.
>
> **Exemples** : Un utilisateur qui prétend ne jamais avoir approuvé un paiement en ligne, ou un administrateur système qui nie avoir supprimé des fichiers critiques, en l\'absence de journaux d\'audit fiables.
>
> **Contre-mesures** : La mise en place de journaux d\'audit sécurisés et immuables qui enregistrent toutes les actions critiques, l\'utilisation de signatures numériques pour lier une action à une identité, et l\'horodatage de confiance pour prouver le moment de l\'action.

##### I -- ***Information Disclosure*** (Divulgation d\'information)

> **Définition** : La divulgation d\'information est l\'exposition de données sensibles à des personnes qui ne devraient pas y avoir accès.
>
> **Propriété de sécurité violée** : **Confidentialité**.
>
> **Exemples** : Une application web qui affiche des informations de débogage détaillées, y compris des chaînes de connexion à la base de données, dans un message d\'erreur ; une fuite de données due à un compartiment de stockage en nuage mal configuré ; ou l\'interception de trafic réseau non chiffré.
>
> **Contre-mesures** : Le chiffrement des données au repos et en transit, des contrôles d\'accès stricts, une gestion rigoureuse des erreurs pour ne pas révéler d\'informations sensibles, et le principe de minimisation des données (ne collecter et ne stocker que les données absolument nécessaires).

##### D -- ***Denial of Service*** (Déni de service)

> **Définition** : Le déni de service vise à rendre un système ou une ressource indisponible pour ses utilisateurs légitimes, soit en le submergeant de requêtes, soit en exploitant une vulnérabilité qui le fait planter.
>
> **Propriété de sécurité violée** : **Disponibilité**.
>
> **Exemples** : Une attaque DDoS qui sature la bande passante d\'un serveur web, une \"bombe de décompression\" qui épuise la mémoire d\'un système en traitant un fichier compressé malveillant, ou une attaque par rançongiciel qui chiffre les données critiques.
>
> **Contre-mesures** : La mise en place de systèmes de détection et de mitigation des attaques DDoS, l\'équilibrage de charge et la redondance pour répartir la charge, la limitation du débit des requêtes (*rate limiting*), et une gestion prudente des ressources système.

##### E -- ***Elevation of Privilege*** (Élévation de privilèges)

> **Définition** : L\'élévation de privilèges se produit lorsqu\'un utilisateur ou un processus parvient à obtenir des droits d\'accès supérieurs à ceux qui lui ont été initialement accordés, lui permettant d\'effectuer des actions non autorisées.
>
> **Propriété de sécurité violée** : **Autorisation** (et le principe du moindre privilège).
>
> **Exemples** : Un utilisateur standard exploitant une vulnérabilité de type \"dépassement de tampon\" (*buffer overflow*) pour exécuter du code avec les privilèges de l\'administrateur ; un attaquant qui découvre une API interne non protégée lui donnant un accès direct à la base de données.
>
> **Contre-mesures** : L\'application stricte du principe du moindre privilège (chaque composant ne doit avoir que les permissions minimales nécessaires à son fonctionnement), la validation rigoureuse de toutes les entrées, la séparation des privilèges, et l\'exécution des processus avec des comptes à faibles droits.

#### STRIDE comme Pont entre les Principes et la Pratique

La véritable élégance de la méthodologie STRIDE réside dans le fait qu\'elle n\'est pas une simple liste de contrôle arbitraire. Elle constitue un pont conceptuel direct entre les objectifs de sécurité abstraits définis dans la section 37.1 et les menaces concrètes auxquelles les ingénieurs sont confrontés. Chaque catégorie de menace STRIDE correspond directement à la violation d\'une propriété de sécurité fondamentale.

Cette correspondance est explicite et puissante :

> L\'usurpation d\'identité (**S**poofing) est une attaque contre l\'**A**uthenticité.
>
> L\'altération (**T**ampering) est une attaque contre l\'**I**ntégrité.
>
> La répudiation (**R**epudiation) est une attaque contre la **N**on-répudiation.
>
> La divulgation d\'information (**I**nformation Disclosure) est une attaque contre la **C**onfidentialité.
>
> Le déni de service (**D**enial of Service) est une attaque contre la **A**vailability (Disponibilité).
>
> L\'élévation de privilèges (**E**levation of Privilege) est une attaque contre l\'**A**utorisation.

Cette cartographie transforme la modélisation des menaces d\'un exercice de sécurité potentiellement intimidant en une extension logique de l\'ingénierie de la qualité. Lorsqu\'un développeur identifie une menace potentielle d\'altération (*Tampering*) sur un flux de données, il ne fait pas que cocher une case ; il travaille consciemment à préserver le principe d\'intégrité du système. De même, en concevant un mécanisme de journalisation robuste pour contrer une menace de répudiation (*Repudiation*), il met en œuvre le principe de non-répudiation. STRIDE fournit ainsi un langage commun qui permet de traduire les politiques de sécurité de haut niveau en exigences d\'ingénierie concrètes et actionnables, intégrant la sécurité au cœur du processus de conception.

## 37.3 L\'Authentification : La Vérification de l\'Identité

L\'authentification est le processus par lequel un système vérifie la validité d\'une identité déclarée par une entité (un utilisateur, un processus ou un appareil). C\'est la première ligne de défense de tout système sécurisé. Avant de pouvoir décider des actions qu\'un utilisateur est autorisé à effectuer (le contrôle d\'accès), le système doit d\'abord répondre avec un haut degré de certitude à la question fondamentale : « Êtes-vous bien qui vous prétendez être? ». Une authentification faible ou compromise rend toutes les autres mesures de sécurité en aval inefficaces. Un attaquant qui parvient à se faire passer pour un utilisateur légitime hérite de tous les droits et privilèges de cet utilisateur, contournant ainsi les pare-feu, les contrôles d\'accès et autres protections. Cette section explore les principes fondamentaux de l\'authentification, des facteurs théoriques qui la sous-tendent à l\'analyse critique des mécanismes les plus répandus, en passant par l\'importance cruciale des approches multi-facteurs dans le paysage des menaces actuel.

### 37.3.1 Les Facteurs d\'Authentification : Savoir, Avoir, Être

Pour prouver son identité, un utilisateur doit fournir une ou plusieurs preuves, appelées facteurs d\'authentification. Ces facteurs sont traditionnellement classés en trois catégories distinctes, basées sur la nature de la preuve fournie.

> **Le facteur de connaissance (\"quelque chose que vous savez\")** : Ce facteur repose sur une information que seul l\'utilisateur est censé connaître. Le mot de passe est l\'exemple le plus universel de ce type de facteur. D\'autres exemples incluent les numéros d\'identification personnels (NIP), les phrases secrètes ou les réponses à des questions de sécurité (\"Quel est le nom de jeune fille de votre mère?\"). C\'est le facteur le plus couramment utilisé, mais aussi le plus vulnérable. Les secrets peuvent être oubliés, devinés, partagés, ou volés par le biais d\'attaques d\'hameçonnage, de logiciels malveillants ou d\'ingénierie sociale.
>
> **Le facteur de possession (\"quelque chose que vous avez\")** : Ce facteur repose sur la possession d\'un objet physique ou numérique unique. L\'utilisateur prouve son identité en démontrant qu\'il a cet objet en sa possession. Les exemples traditionnels incluent une clé physique ou une carte d\'identité. Dans le monde numérique, cela se traduit par des jetons de sécurité matériels (comme une clé YubiKey), une carte à puce, un téléphone intelligent (capable de recevoir un code par SMS ou de générer un code via une application), ou un certificat numérique stocké sur un appareil. La principale faiblesse de ce facteur est que l\'objet peut être perdu, volé ou dupliqué.
>
> **Le facteur d\'inhérence (\"quelque chose que vous êtes\")** : Ce facteur repose sur une caractéristique biologique ou comportementale unique de l\'individu. C\'est ce qu\'on appelle la biométrie. L\'utilisateur prouve son identité en fournissant une mesure de cette caractéristique. Les exemples incluent les empreintes digitales, la reconnaissance faciale, la géométrie de la main, le scan de l\'iris ou de la rétine, et la reconnaissance vocale. Les facteurs comportementaux, comme la dynamique de frappe au clavier ou la signature manuscrite, sont parfois considérés comme une quatrième catégorie (\"quelque chose que vous faites\"), mais sont souvent regroupés avec l\'inhérence.

La force d\'un système d\'authentification dépend non seulement de la robustesse de chaque facteur, mais aussi du nombre et de la diversité des facteurs requis. Une authentification qui ne repose que sur un seul facteur est appelée authentification à facteur simple (SFA). Une authentification qui en requiert au moins deux est une authentification multifacteur (MFA), dont le cas le plus courant est l\'authentification à deux facteurs (2FA).

### 37.3.2 Le Mot de Passe : Analyse d\'un Mécanisme Faillible mais Omniprésent

Malgré ses faiblesses bien connues, le mot de passe reste le mécanisme d\'authentification le plus répandu. Sa sécurité ne dépend pas seulement du choix d\'un mot de passe fort par l\'utilisateur, mais aussi, et de manière critique, de la manière dont le système le stocke et le protège.

#### Le Stockage Sécurisé : Hachage et Salage

La règle la plus fondamentale de la gestion des mots de passe est qu\'**un mot de passe ne doit jamais être stocké en clair** dans une base de données. Si un attaquant parvenait à accéder à cette base, il aurait immédiatement accès à tous les comptes des utilisateurs. De même, le chiffrement réversible n\'est pas une solution adéquate, car si l\'attaquant vole la base de données et la clé de chiffrement, il peut déchiffrer tous les mots de passe.

La méthode standard pour le stockage sécurisé des mots de passe est le **hachage cryptographique**. Un algorithme de hachage est une fonction mathématique à sens unique : il est facile de calculer le *hash* (une chaîne de caractères de taille fixe) d\'un mot de passe, mais il est calculatoirement impossible de retrouver le mot de passe original à partir de son *hash*. Lorsqu\'un utilisateur crée un compte, le système ne stocke pas son mot de passe, mais le

*hash* de son mot de passe. Lors d\'une tentative de connexion ultérieure, le système hache le mot de passe fourni et compare le résultat au *hash* stocké. S\'ils correspondent, l\'authentification réussit. En cas de vol de la base de données, l\'attaquant ne récupère qu\'une liste de

*hashes*, et non les mots de passe eux-mêmes.

Cependant, le hachage seul n\'est pas suffisant. Si deux utilisateurs choisissent le même mot de passe (par exemple, \"123456\"), ils auront le même *hash* dans la base de données. Les attaquants peuvent exploiter cette faiblesse en utilisant des **tables arc-en-ciel (rainbow tables)**, qui sont d\'immenses bases de données précalculées associant des millions de mots de passe courants à leurs *hashes* correspondants. En recherchant un

*hash* volé dans cette table, un attaquant peut instantanément retrouver le mot de passe original.

Pour contrer cette attaque, il est impératif d\'utiliser une technique appelée le **salage (salting)**. Un \"sel\" est une chaîne de caractères aléatoire et unique qui est générée pour chaque utilisateur lors de la création de son compte. Ce sel est ensuite ajouté au mot de passe de l\'utilisateur *avant* le hachage. Le sel lui-même est stocké en clair dans la base de données, à côté du *hash* final.

Le processus devient alors :

> Lors de la création du compte : hash_stockeˊ=hachage(mot_de_passe+sel_unique)
>
> Lors de la connexion : L\'utilisateur fournit son mot de passe. Le système récupère son sel unique dans la base de données, calcule hachage(mot_de_passe_fourni+sel_unique) et le compare au hash_stockeˊ.

Le salage garantit que même si deux utilisateurs ont le même mot de passe, leurs *hashes* stockés seront différents, car leurs sels sont différents. Cela rend les tables arc-en-ciel inefficaces, car un attaquant devrait générer une table spécifique pour chaque sel, ce qui est calculatoirement irréalisable.

Enfin, le choix de l\'algorithme de hachage est crucial. Les algorithmes rapides comme MD5 ou SHA-256 sont conçus pour la vérification d\'intégrité et sont vulnérables aux attaques par force brute sur les *hashes* volés. Pour les mots de passe, il faut utiliser des fonctions de dérivation de clé (KDF) intentionnellement lentes et gourmandes en ressources, comme **bcrypt**, **scrypt**, **Argon2** ou **PBKDF2**. Leur lenteur rend les tentatives de deviner des milliards de mots de passe par seconde beaucoup plus coûteuses pour un attaquant.

#### Les Attaques Courantes contre les Mots de Passe

Malgré un stockage sécurisé, les mots de passe restent vulnérables à plusieurs types d\'attaques qui ciblent le processus de connexion lui-même ou exploitent les mauvaises habitudes des utilisateurs.

> **L\'attaque par force brute** : C\'est la méthode la plus simple, qui consiste à essayer systématiquement toutes les combinaisons possibles de caractères jusqu\'à trouver le bon mot de passe. Bien que théoriquement toujours possible, sa faisabilité dépend de la longueur et de la complexité du mot de passe. Des contre-mesures comme le verrouillage de compte après un certain nombre d\'échecs ou l\'utilisation de CAPTCHAs peuvent la rendre impraticable.
>
> **L\'attaque par dictionnaire** : Une version plus intelligente de l\'attaque par force brute, où l\'attaquant n\'essaie pas toutes les combinaisons, mais se concentre sur une liste de mots de passe probables : mots du dictionnaire, mots de passe courants (\"123456\", \"password\"), variations communes (remplacement de \"e\" par \"3\"), et mots de passe divulgués lors de précédentes fuites de données.
>
> **Le bourrage d\'identifiants (*Credential Stuffing*)** : Cette attaque automatisée est l\'une des plus répandues et des plus efficaces aujourd\'hui. Elle exploite la tendance des utilisateurs à réutiliser le même mot de passe sur plusieurs sites web. L\'attaquant obtient une liste d\'identifiants (courriel/mot de passe) provenant d\'une fuite de données sur un site A, puis utilise des bots pour essayer systématiquement ces mêmes identifiants sur de nombreux autres sites (B, C, D, etc.). Le taux de succès est faible (souvent autour de 0.1% à 2%), mais étant donné le volume de milliards d\'identifiants disponibles sur le dark web, cela permet aux attaquants de compromettre des millions de comptes. La force du mot de passe lui-même n\'offre aucune protection si celui-ci est réutilisé.
>
> **La pulvérisation de mots de passe (*Password Spraying*)** : Cette attaque adopte une approche inverse du *credential stuffing*. Au lieu d\'essayer de nombreux mots de passe pour un seul compte, l\'attaquant essaie un seul mot de passe (ou une très petite liste de mots de passe très courants comme \"Hiver2024\" ou \"Bienvenue1\") contre un très grand nombre de noms d\'utilisateur. Cette technique \"lente et basse\" est conçue pour contourner les politiques de verrouillage de compte, car elle ne génère qu\'une ou deux tentatives de connexion infructueuses par compte sur une longue période. Elle est particulièrement efficace contre les organisations qui ont des politiques de mot de passe faibles ou prévisibles.

### 37.3.3 L\'Authentification Biométrique : Avantages et Périls

L\'authentification biométrique, qui utilise des caractéristiques physiologiques ou comportementales uniques, est souvent perçue comme une solution futuriste et hautement sécurisée aux problèmes des mots de passe. Elle offre des avantages indéniables, mais présente également des risques et des inconvénients significatifs qui doivent être soigneusement évalués.

**Avantages**

> **Commodité et rapidité** : L\'avantage le plus évident est la facilité d\'utilisation. Il n\'y a rien à mémoriser ou à transporter. Une simple pression du doigt ou un regard suffit pour s\'authentifier, ce qui rend le processus rapide et fluide.
>
> **Difficulté de falsification** : Les caractéristiques biométriques sont uniques à chaque individu et difficiles à copier ou à partager, ce qui offre un niveau de sécurité élevé contre les attaques simples.

**Inconvénients et Risques**

> **Préoccupations relatives à la vie privée** : Les données biométriques sont des informations personnelles extrêmement sensibles. Leur collecte et leur stockage centralisé créent des bases de données très attractives pour les attaquants et soulèvent des questions éthiques et réglementaires majeures.
>
> **Coût de mise en œuvre** : Le déploiement de capteurs biométriques et de l\'infrastructure logicielle associée peut être coûteux, en particulier à grande échelle.
>
> **Erreurs de mesure** : Aucun système biométrique n\'est parfait. Ils peuvent produire des **faux rejets** (un utilisateur légitime est refusé) et, plus gravement, des **faux positifs** (un imposteur est accepté). Le réglage du seuil de sensibilité est un compromis délicat entre sécurité et commodité.
>
> **Vulnérabilité à l\'usurpation (*Spoofing*)** : Malgré leur unicité, les caractéristiques biométriques peuvent être usurpées. Des attaquants ont démontré qu\'il était possible de tromper des capteurs d\'empreintes digitales avec des moules en gélatine, ou des systèmes de reconnaissance faciale avec des photos haute résolution ou des masques 3D.
>
> **Le risque de compromission irrévocable** : C\'est le principal et le plus grave inconvénient de la biométrie. Si un mot de passe est volé, on peut le changer. Si un jeton de sécurité est perdu, on peut le révoquer. Mais si une base de données contenant les empreintes de vos empreintes digitales est compromise, vous ne pouvez pas \"changer vos doigts\". La compromission d\'un identifiant biométrique est permanente et irréversible, créant un risque d\'usurpation d\'identité à vie.

### 37.3.4 L\'Authentification Multi-facteurs (MFA) : Une Défense en Profondeur Essentielle

Face aux faiblesses inhérentes à chaque facteur d\'authentification pris isolément, la norme de l\'industrie pour une sécurité robuste est l\'**authentification multifacteur (MFA)**. Le principe de la MFA est d\'exiger de l\'utilisateur qu\'il fournisse au moins deux preuves d\'identité provenant de **catégories de facteurs différentes**.

Par exemple, demander un mot de passe (savoir) et une réponse à une question de sécurité (savoir) n\'est pas une véritable MFA, mais une authentification en deux étapes, car les deux preuves proviennent de la même catégorie. Une véritable MFA combine des facteurs de types différents, par exemple :

> Un mot de passe (savoir) + un code à usage unique généré par une application sur un téléphone (avoir).
>
> Une empreinte digitale (être) + un NIP (savoir).

La MFA augmente considérablement la sécurité car un attaquant doit compromettre simultanément deux types de facteurs différents, ce qui est beaucoup plus difficile. Par exemple, même si un attaquant vole le mot de passe d\'un utilisateur par hameçonnage, il ne pourra pas se connecter sans avoir également volé physiquement le téléphone de l\'utilisateur.

Une des implémentations les plus courantes et sécurisées de la MFA est le **mot de passe à usage unique basé sur le temps (Time-based One-Time Password, TOTP)**. Le fonctionnement du TOTP repose sur deux éléments partagés entre le serveur et l\'appareil de l\'utilisateur (généralement une application d\'authentification comme Google Authenticator ou Authy) lors d\'une phase d\'enregistrement initiale  :

> Une **clé secrète partagée**, généralement représentée par un code QR.
>
> Un accord sur des paramètres, notamment la durée de validité d\'un code (généralement 30 secondes) et l\'algorithme cryptographique à utiliser (généralement HMAC-SHA1).

Ensuite, à chaque intervalle de temps, l\'application et le serveur calculent indépendamment un code numérique à 6 chiffres en utilisant la clé secrète et l\'heure actuelle comme entrées de l\'algorithme HMAC. Comme ils partagent la même clé et la même notion du temps, ils génèrent le même code. L\'utilisateur lit le code sur son application et le saisit lors de la connexion. Le serveur le vérifie, et comme le code change toutes les 30 secondes, il ne peut être utilisé qu\'une seule fois. Le TOTP est considéré comme plus sûr que les codes envoyés par SMS, car ces derniers peuvent être interceptés par des attaques de type \"SIM swapping\".

### L\'Asymétrie des Facteurs d\'Authentification

Il est fondamental de reconnaître que les trois facteurs d\'authentification ne sont pas équivalents en termes de propriétés de sécurité, notamment en ce qui concerne leur secret et leur révocabilité. Cette asymétrie a des implications profondes sur la manière de concevoir des systèmes d\'authentification robustes.

Le **facteur de connaissance**, comme un mot de passe, a pour force théorique son caractère secret. Sa faiblesse réside dans la difficulté pour les humains de mémoriser des secrets complexes et uniques, ce qui conduit à la création de mots de passe faibles ou réutilisés. Cependant, sa caractéristique de sécurité la plus importante est qu\'il est **révocable**. Si un mot de passe est compromis, l\'utilisateur peut le changer, invalidant ainsi l\'information volée.

Le **facteur de possession**, comme un jeton matériel ou un téléphone, tire sa force de son unicité physique. Sa faiblesse est qu\'il peut être perdu, volé ou, dans certains cas, cloné. Tout comme le mot de passe, il est également

**révocable**. Si un téléphone est perdu, il peut être désenregistré des services et un nouvel appareil peut être enregistré à sa place.

Le **facteur d\'inhérence**, ou biométrie, a pour force sa commodité et le fait qu\'il est intrinsèquement lié à l\'utilisateur. Cependant, sa faiblesse critique est double : il n\'est pas secret (nos visages et nos empreintes digitales sont constamment exposés publiquement) et, surtout, il est **irrévocable**. Comme mentionné précédemment, si une base de données de modèles biométriques est volée, les victimes ne peuvent pas obtenir de nouvelles empreintes digitales ou de nouveaux iris.

Cette analyse révèle la véritable raison pour laquelle l\'authentification multifacteur est si essentielle. Il ne s\'agit pas simplement d\'ajouter des obstacles, mais de combiner des facteurs ayant des **modes de défaillance différents et complémentaires**. Un attaquant peut réussir à voler un mot de passe par hameçonnage (compromettant le facteur de connaissance), mais cette attaque ne lui donne pas accès au téléphone de la victime (le facteur de possession). Cette asymétrie explique également pourquoi les bases de données biométriques centralisées représentent un risque si élevé. La compromission d\'un mot de passe est un inconvénient qui peut être corrigé ; la compromission d\'un identifiant biométrique est un risque d\'identité permanent. Par conséquent, la MFA devrait être la norme par défaut pour tout service sensible, et la biométrie devrait être mise en œuvre avec une extrême prudence, en privilégiant le stockage et le traitement sur l\'appareil de l\'utilisateur plutôt que dans des bases de données centralisées.

## 37.4 Le Contrôle d\'Accès : L\'Application des Politiques d\'Autorisation

Une fois qu\'un utilisateur a été authentifié avec succès, le système sait *qui* il est. La question suivante, tout aussi cruciale, est de déterminer *ce qu\'il est autorisé à faire*. C\'est le rôle du contrôle d\'accès, également appelé autorisation. Le contrôle d\'accès est le processus qui consiste à appliquer des politiques pour accorder ou refuser des permissions d\'accès à des ressources. Ces ressources peuvent être des fichiers, des bases de données, des fonctions d\'une application ou des systèmes entiers. L\'authentification ouvre la porte d\'entrée ; le contrôle d\'accès détermine dans quelles pièces de la maison l\'utilisateur peut entrer et ce qu\'il peut y faire. Cette section explore les modèles fondamentaux du contrôle d\'accès, en commençant par le concept théorique de la matrice d\'accès, puis en examinant l\'évolution des modèles pratiques, du plus simple et flexible au plus complexe et granulaire.

### 37.4.1 Le Modèle Théorique : La Matrice de Contrôle d\'Accès

Le fondement théorique de tous les modèles de contrôle d\'accès a été formalisé en 1971 par Butler Lampson sous la forme de la **matrice de contrôle d\'accès (Access Control Matrix, ACM)**. Ce modèle abstrait représente l\'état des permissions d\'un système à un instant donné sous la forme d\'un tableau à deux dimensions.

> Les **lignes** de la matrice représentent les **sujets** (ou principaux), c\'est-à-dire les entités actives qui demandent l\'accès. Il s\'agit généralement des utilisateurs, des groupes d\'utilisateurs ou des processus agissant en leur nom.
>
> Les **colonnes** représentent les **objets**, c\'est-à-dire les ressources passives auxquelles on accède. Il peut s\'agir de fichiers, de répertoires, de périphériques, de tables de base de données, etc.
>
> Chaque **cellule** de la matrice, à l\'intersection d\'un sujet et d\'un objet, contient l\'ensemble des **droits** (ou permissions) que le sujet possède sur l\'objet. Ces droits peuvent être des actions comme lecture, écriture, exécution, suppression ou propriétaire.

Par exemple, une matrice simple pourrait ressembler à ceci :

  --------------- ------------------- ------------------- ---------------
  Sujet/Objet     Fichier A           Fichier B           Programme C

  Alice           lecture, écriture   lecture             exécution

  Bob             lecture             \-                  exécution

  Carol           propriétaire        lecture, écriture   \-
  --------------- ------------------- ------------------- ---------------

Ce modèle est conceptuellement puissant car il décrit de manière exhaustive et non ambiguë l\'état de toutes les permissions dans le système. Cependant, une implémentation littérale d\'une telle matrice est impraticable dans les systèmes réels pour plusieurs raisons. La matrice serait extrêmement grande et principalement vide (creuse), car la plupart des utilisateurs n\'ont de droits que sur un petit sous-ensemble des objets. De plus, sa gestion deviendrait un cauchemar administratif.

Par conséquent, la matrice d\'accès est rarement implémentée directement. Elle est plutôt décomposée de deux manières principales pour une mise en œuvre pratique  :

> **Listes de Contrôle d\'Accès (Access Control Lists, ACL)** : En stockant la matrice par **colonne**, chaque objet se voit associer une liste (l\'ACL) qui énumère tous les sujets ayant des droits sur cet objet, ainsi que la nature de ces droits. C\'est l\'approche utilisée par de nombreux systèmes de fichiers.
>
> **Listes de Capacités (Capability Lists)** : En stockant la matrice par **ligne**, chaque sujet se voit attribuer une liste de \"capacités\" (ou jetons) qui spécifient les objets auxquels il peut accéder et les droits qu\'il possède sur eux.

### 37.4.2 Le Contrôle d\'Accès Discrétionnaire (DAC)

Le Contrôle d\'Accès Discrétionnaire (Discretionary Access Control, DAC) est un modèle dans lequel le propriétaire d\'une ressource a la **discrétion** de décider qui peut y accéder et de transférer ces droits à d\'autres utilisateurs. Dans un système DAC, chaque objet a un propriétaire, et c\'est ce propriétaire qui gère la liste de contrôle d\'accès (ACL) de l\'objet.

> **Principe fondamental** : Le contrôle est décentralisé et repose sur l\'identité de l\'utilisateur et la propriété des objets.
>
> **Analyse** : Le principal avantage du DAC est sa **flexibilité**. Il est très simple à comprendre et à utiliser dans des environnements collaboratifs où les utilisateurs ont besoin de partager facilement des informations. Cependant, cette flexibilité est aussi sa plus grande faiblesse en matière de sécurité. La gestion décentralisée rend difficile l\'application d\'une politique de sécurité globale et cohérente. Il est très difficile pour un administrateur central de savoir qui a accès à quoi. De plus, le DAC est vulnérable au problème de l\'\
> **escalade des privilèges** et aux attaques de type **cheval de Troie** : si un programme malveillant s\'exécute avec les droits d\'un utilisateur, il peut faire tout ce que l\'utilisateur est autorisé à faire, y compris accorder l\'accès à ses fichiers à un attaquant.
>
> **Exemple classique** : Le système de permissions de fichiers dans les systèmes d\'exploitation de type UNIX (Linux, macOS) est un exemple typique de DAC. Le propriétaire d\'un fichier peut définir les permissions de lecture, d\'écriture et d\'exécution pour lui-même, pour un groupe et pour tous les autres utilisateurs.

### 37.4.3 Le Contrôle d\'Accès Obligatoire (MAC)

Le Contrôle d\'Accès Obligatoire (Mandatory Access Control, MAC) est un modèle beaucoup plus strict et centralisé. Dans un système MAC, les décisions de contrôle d\'accès ne sont pas laissées à la discrétion des utilisateurs, mais sont **obligatoirement** appliquées par le système d\'exploitation sur la base d\'une politique de sécurité globale.

> **Principe fondamental** : Le système associe des **étiquettes de sécurité** (ou labels) à tous les sujets (utilisateurs, processus) et à tous les objets (fichiers, données). Une étiquette de sujet représente son niveau d\'habilitation (par exemple, \"Confidentiel\", \"Secret\", \"Très Secret\"), tandis qu\'une étiquette d\'objet représente son niveau de classification. Le système applique ensuite des règles fixes pour déterminer si un sujet peut accéder à un objet en comparant leurs étiquettes respectives. Les utilisateurs ne peuvent pas modifier ces règles.
>
> **Analyse** : Le MAC offre un niveau de sécurité très élevé et un contrôle centralisé, ce qui le rend idéal pour les environnements où la confidentialité des informations est primordiale, comme les agences gouvernementales, militaires ou de renseignement. Sa principale faiblesse est son\
> **manque de flexibilité** et sa **complexité** de gestion. La classification de toutes les données et l\'attribution des habilitations à tous les utilisateurs est une tâche administrative lourde et rigide.
>
> **Étude de cas : Le modèle Bell-LaPadula** : Le modèle de sécurité Bell-LaPadula est le modèle MAC le plus célèbre, conçu spécifiquement pour garantir la confidentialité. Il repose sur deux règles fondamentales :

**La Propriété de Sécurité Simple (No Read-Up)** : Un sujet ne peut lire un objet que si son niveau d\'habilitation est supérieur ou égal au niveau de classification de l\'objet. Un utilisateur habilité \"Secret\" ne peut pas lire un document \"Très Secret\".

**La Propriété Étoile (\*-Property, No Write-Down)** : Un sujet ne peut écrire dans un objet que si son niveau d\'habilitation est inférieur ou égal au niveau de classification de l\'objet. Un utilisateur habilité \"Secret\" ne peut pas écrire d\'informations dans un fichier \"Confidentiel\". Cette règle empêche la fuite d\'informations d\'un niveau de sécurité élevé vers un niveau inférieur.

### 37.4.4 Le Contrôle d\'Accès Basé sur les Rôles (RBAC)

Le Contrôle d\'Accès Basé sur les Rôles (Role-Based Access Control, RBAC) est devenu le modèle de facto pour la plupart des applications d\'entreprise. Il offre un compromis entre la flexibilité du DAC et la rigueur du MAC. L\'idée centrale du RBAC est d\'abstraire les permissions des utilisateurs individuels en les associant à des **rôles**.

> **Principe fondamental** : La gestion des accès se fait en trois étapes :

Des permissions (comme \"créer une facture\" ou \"lire le dossier client\") sont assignées à des rôles.

Des rôles (comme \"Comptable\", \"Vendeur\", \"Administrateur\") sont créés en fonction des fonctions métier de l\'organisation.

Les utilisateurs se voient attribuer un ou plusieurs rôles.\
Un utilisateur hérite alors de toutes les permissions associées aux rôles qui lui sont assignés.

> **Analyse** : Le RBAC simplifie considérablement l\'administration de la sécurité dans les grandes organisations. Au lieu de gérer des milliers de permissions individuelles, les administrateurs n\'ont qu\'à gérer une poignée de rôles. L\'arrivée, le départ ou le changement de fonction d\'un employé se résume à une simple modification de son attribution de rôle. Le RBAC facilite également l\'application du\
> **principe du moindre privilège**, en garantissant que les employés n\'ont accès qu\'aux informations strictement nécessaires à l\'exercice de leurs fonctions. Enfin, il simplifie les audits de conformité en offrant une vue claire de qui peut faire quoi. Par exemple, dans un hôpital, un rôle \"Infirmier\" peut être créé avec les permissions de consulter les dossiers des patients et d\'enregistrer des observations, mais sans la permission de prescrire des médicaments, qui serait réservée au rôle \"Médecin\".

### 37.4.5 Le Contrôle d\'Accès Basé sur les Attributs (ABAC)

Le Contrôle d\'Accès Basé sur les Attributs (Attribute-Based Access Control, ABAC), parfois appelé contrôle d\'accès basé sur des politiques (PBAC), est le modèle le plus dynamique, le plus flexible et le plus granulaire. Dans un système ABAC, les décisions d\'accès ne sont plus basées sur des rôles statiques, mais sur des **politiques** qui évaluent en temps réel une combinaison d\'**attributs**.

> **Principe fondamental** : Une décision d\'accès est prise en évaluant des règles qui prennent en compte plusieurs types d\'attributs :

**Attributs du sujet** : Le rôle de l\'utilisateur, son service, son niveau d\'habilitation, sa nationalité, etc.

**Attributs de l\'objet** : Le type de document, son niveau de sensibilité, son propriétaire, sa date de création, etc.

**Attributs de l\'action** : L\'action demandée (lire, écrire, supprimer).

**Attributs de l\'environnement** : L\'heure de la journée, la localisation géographique de l\'utilisateur, l\'adresse IP, le niveau de sécurité de l\'appareil utilisé, etc.

> **Analyse** : L\'ABAC offre une granularité et une flexibilité inégalées. Il permet de définir des politiques de sécurité extrêmement riches et contextuelles, comme \"Un médecin peut lire le dossier médical d\'un patient qui lui est assigné, mais uniquement pendant les heures de travail et depuis un appareil géré par l\'hôpital\". Il est particulièrement bien adapté aux environnements complexes et dynamiques comme le cloud computing et l\'Internet des objets. Cependant, cette puissance a un coût : la conception, la mise en œuvre et la gestion des politiques ABAC sont nettement plus complexes que pour les autres modèles.

### 37.4.6 Synthèse Comparative des Modèles de Contrôle d\'Accès

Chaque modèle de contrôle d\'accès présente un ensemble unique de compromis entre sécurité, flexibilité et complexité administrative. Le choix du modèle approprié dépend des exigences spécifiques de l\'environnement à protéger. Le tableau ci-dessous synthétise les caractéristiques clés de chaque modèle pour en faciliter la comparaison.

**Tableau 37.4.1: Tableau Comparatif des Modèles de Contrôle d\'Accès**

  ------------------------ ---------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------
  Caractéristique          Contrôle d\'Accès Discrétionnaire (DAC)                                                              Contrôle d\'Accès Obligatoire (MAC)                                                                                      Contrôle d\'Accès Basé sur les Rôles (RBAC)                                                                 Contrôle d\'Accès Basé sur les Attributs (ABAC)

  **Unité de Contrôle**    Le propriétaire de la ressource                                                                      L\'administrateur système via une politique centrale                                                                     L\'administrateur système via l\'assignation de rôles                                                       Moteur de politiques évaluant des règles complexes

  **Granularité**          Faible à moyenne (par utilisateur/groupe)                                                            Élevée (basée sur les niveaux de classification)                                                                         Moyenne (basée sur les fonctions métier)                                                                    Très élevée (basée sur une multitude d\'attributs contextuels)

  **Flexibilité**          Très élevée                                                                                          Très faible (rigide)                                                                                                     Moyenne (flexible au niveau des rôles)                                                                      Très élevée (dynamique et contextuelle)

  **Complexité Admin.**    Faible (pour les petits systèmes), élevée (pour les grands)                                          Très élevée                                                                                                              Moyenne (simplifie la gestion à grande échelle)                                                             Très élevée (nécessite une conception de politiques experte)

  **Cas d\'Usage Idéal**   Systèmes de fichiers personnels, petits groupes de collaboration, environnements de développement.   Agences gouvernementales, militaires, systèmes traitant des informations classifiées, environnements à haute sécurité.   La plupart des applications d\'entreprise, gestion des accès pour les employés, conformité réglementaire.   Cloud computing, Internet des Objets (IdO), environnements Zero Trust, partage de données inter-organisationnel.
  ------------------------ ---------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------ ----------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------

#### La Trajectoire Évolutive du Contrôle d\'Accès : de l\'Identité au Contexte

L\'histoire des modèles de contrôle d\'accès n\'est pas une simple succession de technologies, mais le reflet de l\'évolution des besoins en matière de sécurité, passant de règles simples et statiques à des décisions complexes et dynamiques. Cette trajectoire révèle une tendance claire : un déplacement du paradigme de contrôle de l\'**identité** vers le **contexte**.

Le **DAC** représente le modèle le plus élémentaire, entièrement centré sur l\'identité de l\'utilisateur et son statut de propriétaire. Il est décentralisé et convient à des interactions simples entre individus. Le **MAC** a introduit une notion de politique de sécurité à l\'échelle du système, mais la décision d\'accès reste principalement liée à un attribut statique du sujet : son niveau d\'habilitation. C\'est un modèle hiérarchique et rigide, conçu pour des structures organisationnelles très structurées.

Le **RBAC** a constitué une avancée majeure en alignant le contrôle d\'accès sur la réalité de l\'entreprise. L\'unité de contrôle n\'est plus l\'individu, mais son **rôle organisationnel**. Cela a permis de gérer la complexité administrative des grandes organisations, mais la décision reste fondamentalement statique : si vous avez le bon rôle, vous avez l\'accès, quel que soit le contexte.

Enfin, l\'**ABAC** marque la dernière évolution de ce paradigme. Il découple la décision d\'accès de tout attribut statique unique, que ce soit l\'identité ou le rôle. La décision devient une évaluation de risque en temps réel, basée sur une riche combinaison d\'attributs et de **contexte**. Un utilisateur peut être un \"Comptable\" (rôle) tentant d\'accéder à un rapport financier (objet), mais si la tentative a lieu à 3 heures du matin depuis un réseau inconnu dans un pays étranger (contexte), l\'accès sera refusé.

Cette évolution est au cœur des architectures de sécurité modernes, notamment le modèle **Zero Trust**, qui postule qu\'aucune confiance ne doit être accordée a priori, et que chaque demande d\'accès doit être vérifiée de manière dynamique. L\'ABAC est le modèle qui incarne le mieux cette philosophie. Cependant, sa complexité signifie que de nombreuses organisations adoptent une approche hybride, utilisant le RBAC pour définir des permissions de base et y superposant des politiques ABAC pour les accès les plus sensibles et les plus contextuels. Le choix d\'un modèle de contrôle d\'accès est donc un arbitrage d\'ingénierie fondamental entre le niveau de sécurité requis, la flexibilité opérationnelle et la complexité de gestion.



---

### Références croisées

- **Securite des systemes agentiques** : voir aussi [Chapitre II.13 -- Paysage des Menaces et Securite des Systemes Agentiques](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.13_Paysage_Menaces_Securite_Systemes_Agentiques.md)
- **Securisation de l'infrastructure agentique** : voir aussi [Chapitre II.14 -- Securisation de l'Infrastructure](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.14_Securisation_Infrastructure.md)
- **Securite et gouvernance du Lakehouse** : voir aussi [Chapitre IV.13 -- Securite, Gouvernance et Conformite](../../III - Entreprise Agentique/Volume_IV_Apache_Iceberg_Lakehouse/Chapitre_IV.13_Securite_Gouvernance_Conformite.md)
