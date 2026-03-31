# Chapitre I.30 : Systèmes de Gestion de Bases de Données (SGBD) - Fondements

## Introduction Générale au Chapitre

### Contexte et Motivation : La Problématique de la Gestion des Données

L\'avènement de l\'ère numérique a engendré une croissance exponentielle de la quantité de données générées, stockées et traitées par les organisations. Cette prolifération a rapidement mis en évidence les limites fondamentales des systèmes de gestion de données traditionnels, principalement basés sur des fichiers. Avant l\'émergence des bases de données modernes, les données d\'une application étaient typiquement stockées dans des fichiers plats ou des structures de fichiers propriétaires, gérés directement par le code de l\'application elle-même. Cette approche, bien que fonctionnelle pour des applications simples et isolées, présentait des inconvénients majeurs et insoutenables à grande échelle.

Le premier de ces problèmes est la **redondance des données**. Dans un environnement où chaque application gère ses propres fichiers, la même information (par exemple, les coordonnées d\'un client) était souvent dupliquée à travers de multiples fichiers, conduisant à un gaspillage d\'espace de stockage et, plus grave encore, à des incohérences. Une mise à jour effectuée dans un fichier pouvait ne pas être répercutée dans les autres, créant ainsi des états contradictoires des données.

Le deuxième écueil était la **difficulté d\'interrogation**. Extraire des informations complexes ou transversales nécessitait l\'écriture de programmes spécifiques et souvent complexes, capables de naviguer dans les structures de fichiers. Chaque nouvelle question posée aux données pouvait exiger un nouveau développement logiciel, rendant l\'accès à l\'information rigide, coûteux et lent.

Enfin, le problème le plus structurel était la forte **dépendance entre les programmes et les données**. La structure physique des fichiers était codée en dur dans la logique des applications qui les manipulaient. Toute modification de cette structure, même mineure comme l\'ajout d\'un champ, entraînait inévitablement la réécriture et la recompilation de tous les programmes accédant à ce fichier. Cette rigidité freinait considérablement l\'évolution et la maintenance des systèmes d\'information.

Face à ces défis, la communauté informatique a développé une solution logicielle d\'un niveau d\'abstraction supérieur : le **Système de Gestion de Bases de Données (SGBD)**. Un SGBD est une couche logicielle qui s\'interpose entre les données et les applications, offrant un ensemble de services centralisés pour gérer de grandes quantités de données de manière fiable, efficace et sécurisée. Les fonctionnalités fondamentales d\'un SGBD incluent : la

**persistance** (garantir que les données survivent à l\'exécution des programmes), la **gestion des accès concurrents** (permettre à plusieurs utilisateurs de manipuler les données simultanément sans corruption), la **sécurité** (contrôler les droits d\'accès), et la **garantie de l\'intégrité** (assurer que les données respectent un ensemble de règles prédéfinies).

### La Révolution du Modèle Relationnel

Au sein de l\'histoire des SGBD, plusieurs modèles de données ont été proposés pour structurer l\'information. Les premiers systèmes commerciaux s\'appuyaient sur des modèles **hiérarchiques** ou en **réseau**. Ces modèles, bien que représentant une avancée par rapport aux systèmes de fichiers, souffraient encore d\'une dépendance structurelle. Pour interroger les données, les programmeurs devaient connaître et naviguer à travers des chemins d\'accès prédéfinis, des pointeurs et des liens physiques entre les enregistrements.

La véritable rupture conceptuelle survint en 1970 avec la publication de l\'article séminal d\'Edgar F. Codd, \"A Relational Model of Data for Large Shared Data Banks\". Codd, alors chercheur chez IBM, proposa une approche radicalement nouvelle, fondée non pas sur l\'organisation physique des données, mais sur des principes mathématiques rigoureux issus de la théorie des ensembles et de la logique des prédicats du premier ordre. L\'innovation fondamentale du

**modèle relationnel** est le principe d\'**indépendance des données**. Ce principe stipule que les utilisateurs et les applications doivent être totalement isolés de la manière dont les données sont physiquement organisées sur les supports de stockage. L\'utilisateur interagit avec une vue simple et logique des données : un ensemble de tables, appelées \"relations\".

Le succès fulgurant et la domination durable du modèle relationnel, qui perdure encore aujourd\'hui, s\'expliquent par deux de ses caractéristiques principales. Premièrement, sa **simplicité conceptuelle** pour l\'utilisateur, qui n\'a besoin de manipuler qu\'un seul type de structure, la table, sans se soucier des pointeurs ou des chemins d\'accès. Deuxièmement, et c\'est là sa plus grande force, ses

**fondements théoriques solides**. En s\'appuyant sur l\'algèbre relationnelle et le calcul relationnel, le modèle de Codd a fourni un cadre formel pour définir, interroger et manipuler les données avec une précision mathématique, garantissant la cohérence et la prévisibilité des opérations.

### Structure du Chapitre

Ce chapitre a pour ambition de poser les fondations indispensables à la compréhension et à la maîtrise des systèmes de bases de données relationnelles. Notre parcours s\'articulera autour des trois piliers qui constituent l\'édifice du monde relationnel :

> **Le Modèle Relationnel (Section 30.1) :** Nous plongerons au cœur de la théorie de Codd. Nous définirons formellement les concepts de relation, d\'attribut et de clé, avant d\'explorer les deux langages formels qui en constituent le fondement : l\'algèbre relationnelle, une approche procédurale qui décrit *comment* obtenir un résultat, et le calcul relationnel, une approche déclarative qui décrit *quel* résultat est souhaité.
>
> **La Conception de Bases de Données (Section 30.2) :** Nous aborderons la conception d\'une base de données comme une discipline d\'ingénierie structurée. Nous étudierons d\'abord la modélisation conceptuelle à l\'aide du modèle Entité-Association (E-A), un outil graphique permettant de capturer la sémantique du monde réel. Puis, nous détaillerons le processus de normalisation, une technique formelle basée sur la théorie des dépendances fonctionnelles, qui permet de transformer un schéma conceptuel en un schéma relationnel logique, robuste et exempt d\'anomalies.
>
> **Le Langage SQL (Section 30.3) :** Enfin, nous étudierons le *Structured Query Language* (SQL), le langage standard de facto pour interagir avec les SGBD relationnels. Nous montrerons comment chaque commande et chaque clause de SQL est en réalité une matérialisation pratique des concepts théoriques vus précédemment, du Langage de Définition de Données (LDD) pour créer les structures, au Langage de Manipulation de Données (LMD) pour les peupler, jusqu\'au puissant Langage d\'Interrogation de Données (LID) pour en extraire l\'information.

À travers ce parcours, de la théorie mathématique la plus abstraite à l\'ingénierie de conception et à la pratique du langage standard, ce chapitre vise à fournir une compréhension profonde et nuancée des principes qui régissent la quasi-totalité des systèmes de gestion de données structurées aujourd\'hui.

## 30.1 Le Modèle Relationnel : Une Fondation Mathématique

L\'élégance et la puissance du modèle relationnel ne résident pas dans sa représentation familière sous forme de tableaux, mais dans l\'abstraction mathématique rigoureuse qui la sous-tend. Contrairement à ses prédécesseurs qui décrivaient les données en termes de structures de stockage physique (enregistrements, pointeurs), le modèle de Codd s\'ancre fermement dans la théorie des ensembles et la logique mathématique. Cette fondation formelle n\'est pas un simple exercice académique ; elle est la clé de la robustesse, de la flexibilité et du pouvoir expressif du modèle. En définissant les données comme des ensembles mathématiques, il devient possible d\'appliquer sur elles un ensemble d\'opérations formellement définies, dont le comportement est prédictible et dont les résultats sont garantis. Cette section a pour objectif de déconstruire l\'apparente simplicité du modèle pour en révéler le noyau théorique. Nous établirons que le concept de \"table\" n\'est qu\'une visualisation intuitive d\'une construction mathématique plus fondamentale : la relation.

### 30.1.1 Les Concepts Fondamentaux

Pour appréhender le modèle relationnel dans toute sa rigueur, il est impératif de définir précisément son vocabulaire. Chaque terme possède une signification mathématique formelle qui transcende son analogie avec les tableurs ou les fichiers.

#### Définitions Formelles

> **Domaine :** Le concept le plus fondamental est celui de domaine. Un domaine, noté D, est un ensemble de valeurs **atomiques**, c\'est-à-dire indivisibles du point de vue du modèle. Chaque domaine est associé à un nom et à un type de données (par exemple, entier, chaîne de caractères, date). Plus important encore, un domaine porte une sémantique : il définit l\'ensemble des valeurs possibles et licites pour un attribut donné. Par exemple, le domaine
> COULEURS_PRIMAIRES pourrait être défini en extension comme {\"Rouge\", \"Vert\", \"Bleu\"}, tandis que le domaine POURCENTAGE pourrait être défini en intention comme l\'ensemble des nombres réels p tels que 0≤p≤100. La notion de domaine est cruciale pour l\'intégrité des données : deux attributs ne peuvent être comparés de manière significative que s\'ils sont définis sur le même domaine.
>
> **Attribut :** Un attribut est un nom qui désigne le rôle joué par un domaine dans le contexte d\'une relation. Par exemple, dans une relation décrivant des personnes, le domaine des chaînes de caractères pourrait être utilisé pour les attributs
> NomDeFamille et Prénom. Bien qu\'ils partagent le même type de données, les noms des attributs spécifient leur rôle sémantique distinct. Dans la représentation tabulaire, les attributs correspondent aux en-têtes de colonnes.
>
> **Schéma de Relation :** Un schéma de relation est la structure ou le plan d\'une relation. Il est défini par un nom, disons R, et une liste d\'attributs {A1,A2,...,An}. On le note formellement
> R(A1,A2,...,An). Chaque attribut Ai est associé à un domaine, noté dom(Ai). Le schéma représente l\'**intention** de la relation, c\'est-à-dire la structure et la sémantique des données qu\'elle est destinée à contenir. Par exemple, un schéma
> ÉTUDIANT(Matricule, Nom, Prénom, DateNaissance) définit la structure des informations que nous souhaitons stocker sur les étudiants.
>
> **Tuple (n-uplet) :** Un tuple (ou n-uplet) est une liste ordonnée de n valeurs ⟨v1,v2,...,vn⟩, où chaque valeur vi est un élément du domaine de l\'attribut correspondant Ai, c\'est-à-dire vi∈dom(Ai). Un tuple est donc un élément du produit cartésien des domaines des attributs du schéma :
> dom(A1)×dom(A2)×⋯×dom(An). Dans la représentation tabulaire, un tuple correspond à une ligne ou un enregistrement. Par exemple,
> ⟨'12345','Tremblay','Jean','2002-05-10'⟩ est un tuple valide pour le schéma ÉTUDIANT défini précédemment.
>
> **Relation :** C\'est ici que réside le cœur de la définition formelle. Une relation r sur un schéma R(A1,...,An) est un **ensemble fini de tuples** conformes à ce schéma. La relation est une instance ou une
> **extension** du schéma à un moment donné. Le fait qu\'une relation soit un
> *ensemble* au sens mathématique a deux conséquences fondamentales et non négociables :

**Absence de tuples dupliqués :** Un ensemble ne peut contenir deux fois le même élément. Par conséquent, chaque tuple dans une relation doit être unique.

**Absence d\'ordre intrinsèque :** Les éléments d\'un ensemble ne sont pas ordonnés. Il n\'y a donc pas de \"premier\" ou de \"dernier\" tuple dans une relation. L\'ordre dans lequel les tuples sont affichés est purement une question de présentation et n\'a aucune signification sémantique dans le modèle lui-même.

> **Arity (Degré) et Cardinalité :** Deux métriques simples décrivent la taille d\'une relation. L\'**arité** (ou le degré) d\'une relation est le nombre de ses attributs (le nombre de colonnes). La
> **cardinalité** d\'une relation est le nombre de tuples qu\'elle contient (le nombre de lignes) à un instant donné. Une relation d\'arité 1 est dite unaire, d\'arité 2 binaire, etc.

#### L\'Arsenal des Clés : Le Gardien de l\'Intégrité

Si chaque tuple au sein d\'une relation doit être unique, le modèle doit fournir un mécanisme formel pour garantir cette unicité. Ce mécanisme repose sur le concept de clé. Les clés ne sont pas de simples \"identifiants\" ; elles sont des contraintes d\'intégrité fondamentales qui structurent la base de données et garantissent sa cohérence.

> **Superclé :** Une superclé est un sous-ensemble d\'attributs S d\'un schéma de relation R qui possède la propriété d\'unicité. Formellement, pour toute instance valide r de R, il n\'existe pas deux tuples distincts t1 et t2 dans r tels que la projection de t1 sur les attributs de S soit égale à la projection de t2 sur ces mêmes attributs, c\'est-à-dire t1=t2. Par exemple, dans notre relation
> ÉTUDIANT, l\'ensemble {Matricule} est une superclé. L\'ensemble {Matricule, Nom} est également une superclé, car si les matricules sont uniques, la combinaison du matricule et du nom le sera aussi. L\'ensemble de tous les attributs d\'une relation est toujours une superclé triviale.
>
> **Clé Candidate :** Une clé candidate est une superclé qui possède la propriété de **minimalité** (ou irréductibilité). Une superclé
> K est une clé candidate si aucun de ses sous-ensembles propres n\'est également une superclé. En d\'autres termes, on ne peut retirer aucun attribut de K sans perdre la propriété d\'unicité. Dans l\'exemple ÉTUDIANT, {Matricule} est une clé candidate. {Matricule, Nom} n\'est pas une clé candidate car on peut en retirer Nom et l\'ensemble restant, {Matricule}, est toujours une superclé. Une relation peut posséder plusieurs clés candidates. Si, par exemple, les étudiants avaient aussi un numéro d\'assurance sociale unique, alors
> {NumAssuranceSociale} serait une autre clé candidate.
>
> **Clé Primaire :** Une clé primaire est une clé candidate qui a été choisie par le concepteur de la base de données pour servir d\'identifiant principal et unique pour les tuples de la relation. Ce choix est une décision de conception. La clé primaire est soumise à une contrainte d\'intégrité fondamentale appelée
> **intégrité d\'entité** : aucun attribut participant à la clé primaire ne peut avoir une valeur nulle (NULL). Cela garantit que chaque tuple est identifiable sans ambiguïté. Dans une représentation de schéma, la clé primaire est conventionnellement soulignée. Par exemple : ÉTUDIANT(Matricule, Nom, Prénom).
>
> **Clé Alternative :** Une clé alternative est simplement une clé candidate qui n\'a pas été désignée comme clé primaire. Bien qu\'elle ne soit pas l\'identifiant principal, elle conserve ses propriétés d\'unicité et de minimalité, et peut être utilisée pour des recherches ou pour définir des contraintes d\'unicité (
> UNIQUE en SQL).
>
> **Clé Étrangère :** Si les clés primaires garantissent l\'unicité au sein d\'une relation, les clés étrangères sont le mécanisme fondamental qui permet de créer et de maintenir des liens logiques *entre* les relations. Un ensemble d\'attributs FK dans une relation R1 est une clé étrangère s\'il référence une clé candidate (généralement la clé primaire) PK d\'une relation R2 (où R1 et R2 peuvent être la même relation). Cette contrainte, appelée
> **intégrité référentielle**, impose que pour chaque tuple de R1, la valeur de FK doit soit correspondre à une valeur existante de PK dans un tuple de R2, soit être entièrement nulle. Elle garantit qu\'une relation ne peut pas faire référence à un tuple qui n\'existe pas, prévenant ainsi les \"références orphelines\" et assurant la cohérence globale de la base de données. Par exemple, si nous avons une relation INSCRIPTION(NumCours, MatriculeÉtudiant), l\'attribut MatriculeÉtudiant serait une clé étrangère référençant la clé primaire Matricule de la table ÉTUDIANT.

Ensemble, ces concepts forment le vocabulaire de base du modèle relationnel. Ils fournissent un cadre rigoureux pour décrire la structure des données et les contraintes qui les régissent, indépendamment de toute considération d\'implémentation physique. C\'est sur cette fondation solide que reposent les langages formels d\'interrogation.

### 30.1.2 Langages Formels d\'Interrogation

La véritable puissance du modèle relationnel se manifeste dans sa capacité à manipuler les données à travers des langages d\'interrogation formels. Ces langages ne sont pas de simples ensembles de commandes, mais des systèmes mathématiques complets qui permettent d\'exprimer des requêtes complexes avec une sémantique non ambiguë. Historiquement, deux approches parallèles, mais équivalentes, ont été développées : l\'algèbre relationnelle, qui est de nature procédurale, et le calcul relationnel, qui est de nature déclarative. La dualité entre ces deux approches n\'est pas une simple curiosité théorique ; elle constitue le fondement conceptuel sur lequel repose le fonctionnement des SGBD modernes et, en particulier, l\'optimisation des requêtes. Le célèbre théorème de Codd, que nous aborderons, établit un pont formel entre ces deux mondes, garantissant qu\'une requête exprimée de manière déclarative (ce qui est plus simple pour un humain) peut être traduite en une séquence d\'opérations procédurales (ce qui est exécutable et optimisable par une machine).

#### L\'Algèbre Relationnelle : Une Approche Procédurale

L\'algèbre relationnelle, proposée par Codd en même temps que le modèle lui-même, est un langage formel qui consiste en un ensemble d\'opérateurs agissant sur des relations pour produire de nouvelles relations. C\'est un langage

**procédural**, car une requête est exprimée comme une séquence d\'opérations à appliquer pour construire le résultat final. Une propriété essentielle de cette algèbre est qu\'elle est **close** : chaque opérateur prend une ou deux relations en entrée et produit toujours une relation en sortie. Cette propriété de clôture est fondamentale, car elle permet de composer les opérateurs pour former des expressions arbitrairement complexes, où le résultat d\'une opération peut servir d\'entrée à la suivante.

L\'algèbre relationnelle repose sur un ensemble d\'opérateurs fondamentaux, dont certains sont issus de la théorie des ensembles et d\'autres sont spécifiques au modèle relationnel.

##### Opérateurs Fondamentaux

> **Sélection (σ) :** La sélection est un opérateur unaire qui agit comme un filtre horizontal sur une relation. Il sélectionne les tuples qui satisfont un prédicat (une condition logique) donné.

**Notation formelle :** σP(R)

**Sémantique :** L\'expression σP(R) produit une nouvelle relation ayant le même schéma que la relation R, mais ne contenant que les tuples de R pour lesquels le prédicat P est vrai. Le prédicat P est une formule booléenne composée de termes de la forme attribut op valeur ou attribut1 op attribut2, où op est un opérateur de comparaison (tel que =,=,\<,≤,\>,≥), et ces termes peuvent être combinés par les connecteurs logiques ∧ (ET), ∨ (OU) et ¬ (NON).

**Exemple :** Pour trouver tous les étudiants inscrits en \'Informatique\' dans une relation ÉTUDIANT(Matricule, Nom, Programme), la requête serait : σProgramme='Informatique'(EˊTUDIANT).

> **Projection (π) :** La projection est un opérateur unaire qui agit comme un filtre vertical. Il sélectionne certaines colonnes (attributs) d\'une relation et élimine les autres.

**Notation formelle :** πA1,A2,...,Ak(R)

**Sémantique :** L\'expression πA1,...,Ak(R) produit une nouvelle relation dont le schéma ne contient que les attributs A1,...,Ak. Pour chaque tuple de la relation R en entrée, un nouveau tuple est construit en ne conservant que les valeurs des attributs spécifiés. Puisque le résultat est une relation (et donc un ensemble), tous les tuples dupliqués qui pourraient résulter de cette opération sont automatiquement éliminés.

**Exemple :** Pour obtenir la liste des noms et programmes de tous les étudiants, la requête serait : πNom, Programme(EˊTUDIANT). Si plusieurs étudiants nommés \'Dupont\' sont dans le programme \'Informatique\', une seule ligne (\'Dupont\', \'Informatique\') apparaîtra dans le résultat.

> **Union (∪) :** L\'union est un opérateur binaire directement issu de la théorie des ensembles. Il combine les tuples de deux relations.

**Notation formelle :** R∪S

**Sémantique :** L\'expression R∪S produit une relation contenant tous les tuples qui sont dans R, ou dans S, ou dans les deux. Comme pour toute opération ensembliste, les doublons sont éliminés. Pour que l\'opération d\'union soit valide, les deux relations R et S doivent être **compatibles en union**, ce qui signifie qu\'elles doivent avoir la même arité (même nombre d\'attributs) et que les domaines des attributs correspondants doivent être les mêmes.

**Exemple :** Soient deux relations ÉTUDIANTS_ACTIFS(Matricule, Nom) et ÉTUDIANTS_DIPLÔMÉS(Matricule, Nom). La requête ÉTUDIANTS_ACTIFS \\cup ÉTUDIANTS_DIPLÔMÉS produirait la liste de tous les individus qui sont ou ont été étudiants, sans doublons.

> **Différence (−) :** La différence est un autre opérateur binaire ensembliste.

**Notation formelle :** R−S

**Sémantique :** L\'expression R−S produit une relation contenant tous les tuples qui sont dans R mais qui ne sont **pas** dans S. Cet opérateur n\'est pas commutatif (R−S=S−R). Les relations R et S doivent également être compatibles en union.

**Exemple :** En utilisant les relations précédentes, la requête ÉTUDIANTS_ACTIFS - ÉTUDIANTS_DIPLÔMÉS donnerait la liste des étudiants qui sont actuellement actifs mais qui n\'ont pas encore obtenu leur diplôme.

> **Produit Cartésien (×) :** Le produit cartésien est un opérateur binaire qui combine chaque tuple d\'une relation avec chaque tuple d\'une autre relation, créant ainsi toutes les paires possibles.

**Notation formelle :** R×S

**Sémantique :** L\'expression R×S produit une nouvelle relation dont le schéma est la concaténation des schémas de R et S. Chaque tuple de la relation résultante est formé en concaténant un tuple de R avec un tuple de S. Si R a une cardinalité de cR et une arité de aR, et S a une cardinalité de cS et une arité de aS, alors R×S aura une cardinalité de cR×cS et une arité de aR+aS. Si des noms d\'attributs sont communs à
R et S, ils doivent être renommés pour éviter toute ambiguïté.

**Exemple :** Soit ÉTUDIANT(Matricule, Nom) et COURS(Code, Titre). La requête ÉTUDIANT \\times COURS produirait une grande relation où chaque étudiant est associé à chaque cours existant, qu\'il y soit inscrit ou non.

> **Renommage (ρ) :** Le renommage est un opérateur unaire qui ne modifie pas les données d\'une relation, mais seulement son schéma (le nom de la relation ou les noms de ses attributs).

**Notation formelle :** ρS(B1,...,Bn)(R)

**Sémantique :** Cette expression prend la relation R et produit une relation identique en contenu, mais dont le nom est désormais S et les attributs sont renommés B1,...,Bn dans l\'ordre. Le renommage est essentiel pour plusieurs raisons, notamment pour résoudre les conflits de noms dans les produits cartésiens ou pour effectuer des opérations sur une relation avec elle-même (auto-jointure).

**Exemple :** Pour comparer les salaires des employés avec ceux de leurs superviseurs dans une relation EMPLOYÉ(EmpID, Nom, Salaire, SupID), on pourrait effectuer un produit cartésien de la relation avec elle-même. Le renommage est alors indispensable : \$\\text{EMPLOYÉ} \\times \\rho\_{\\text{SUPERVISEUR}(\\text{EmpID_Sup}, \\text{Nom_Sup}, \\text{Salaire_Sup}, \\text{SupID_Sup})}(\\text{EMPLOYÉ})\$.

Ces six opérateurs forment un ensemble complet, c\'est-à-dire que toute requête exprimable dans le calcul relationnel (et donc en SQL) peut être exprimée par une combinaison de ces opérateurs.

##### Opérateurs Dérivés

Pour des raisons de commodité et d\'efficacité d\'expression, d\'autres opérateurs sont définis à partir des opérateurs de base.

> **Intersection (∩) :** L\'intersection est un opérateur binaire ensembliste qui produit les tuples présents à la fois dans R et dans S.

**Notation formelle :** R∩S

**Dérivation :** Il peut être exprimé à l\'aide de la différence : R∩S=R−(R−S). Les relations doivent être compatibles en union.

**Exemple :** ÉTUDIANTS_EN_PHYSIQUE \\cap ÉTUDIANTS_EN_MATHS donnerait la liste des étudiants inscrits dans les deux programmes.

> **Jointure (⋈) :** La jointure est sans doute l\'opération la plus importante et la plus utilisée en pratique. C\'est une variante du produit cartésien qui est sémantiquement plus significative. Elle combine les tuples de deux relations sur la base d\'une condition de jointure.

**Thêta-jointure (R⋈PS) :** C\'est la forme la plus générale. Elle est équivalente à un produit cartésien suivi d\'une sélection.

**Dérivation :** R⋈PS=σP(R×S). Le prédicat
P compare des attributs de R et de S.

**Équi-jointure :** C\'est une thêta-jointure où le prédicat P ne contient que des comparaisons d\'égalité (=). C\'est le type de jointure le plus courant.

**Jointure Naturelle (R⋈S) :** C\'est le cas le plus spécifique et le plus \"intelligent\". Elle effectue une équi-jointure sur tous les attributs qui ont le même nom dans les deux relations, puis projette le résultat pour éliminer les colonnes d\'attributs dupliquées.

**Exemple :** Soient les relations ÉTUDIANT(Matricule, Nom) et INSCRIPTION(NumCours, Matricule). La jointure naturelle ÉTUDIANT \\bowtie INSCRIPTION produira une relation (Matricule, Nom, NumCours) en associant chaque étudiant à ses inscriptions sur la base de l\'attribut commun Matricule. C\'est une manière beaucoup plus concise et efficace d\'exprimer ce qui nécessiterait un produit cartésien, une sélection et une projection : πMatricule, Nom, NumCours(σEˊTUDIANT.Matricule=INSCRIPTION.Matricule(EˊTUDIANT×INSCRIPTION)).

Le tableau suivant résume les opérateurs fondamentaux et dérivés de l\'algèbre relationnelle et établit un premier lien avec leur implémentation en SQL.

**Table 30.1 : Résumé des Opérateurs de l\'Algèbre Relationnelle**

---

  Opérateur            Notation LaTeX   Description Sémantique                                                         Équivalent SQL (Conceptuel)

  Sélection            σP(R)            Filtre les tuples d\'une relation R selon un prédicat P.                       WHERE

  Projection           πA1,...,Ak(R)    Sélectionne les colonnes A1,...,Ak de R et élimine les doublons.               SELECT DISTINCT

  Union                R∪S              Combine les tuples de deux relations compatibles, en éliminant les doublons.   UNION

  Différence           R−S              Retourne les tuples de R qui ne sont pas dans S.                               EXCEPT ou MINUS

  Produit Cartésien    R×S              Combine chaque tuple de R avec chaque tuple de S.                              FROM R, S ou CROSS JOIN

  Renommage            ρS(R)            Renomme une relation ou ses attributs.                                         AS (alias)

  Jointure Naturelle   R⋈S              Combine les tuples de R et S sur les attributs communs.                        NATURAL JOIN ou INNER JOIN\... USING

  Équi-jointure        R⋈R.A=S.BS       Combine les tuples de R et S si R.A=S.B.                                       INNER JOIN\... ON

---

#### Le Calcul Relationnel : Une Approche Déclarative

Parallèlement à l\'algèbre, Codd a également défini le calcul relationnel, un langage d\'interrogation formel basé sur la logique des prédicats du premier ordre. Contrairement à l\'algèbre, qui est procédurale, le calcul est

**déclaratif**. Une requête en calcul relationnel spécifie les propriétés que les tuples du résultat doivent satisfaire, sans décrire l\'algorithme ou la séquence d\'opérations pour les obtenir. C\'est une distinction cruciale : l\'utilisateur décrit

*ce que* le résultat doit être, laissant au système le soin de déterminer *comment* le calculer. Cette approche est généralement considérée comme plus proche de la pensée humaine et a fortement inspiré la conception du langage SQL.

Il existe deux variantes principales du calcul relationnel : le calcul relationnel de tuples et le calcul relationnel de domaines.

##### Calcul Relationnel de Tuples (CRT)

Dans le CRT, les variables représentent des tuples entiers d\'une relation.

> **Forme générale :** Une requête en CRT s\'écrit sous la forme {t∣Φ(t)}, qui se lit \"l\'ensemble de tous les tuples t tels que la formule Φ(t) est vraie\". La variable
> t est appelée une variable de tuple libre. La partie à gauche du \| spécifie les attributs à retourner, souvent des projections de la variable de tuple (ex: {t.Nom,t.Preˊnom∣...}).
>
> **Formules :** La formule Φ(t) est construite à partir d\'atomes, de connecteurs logiques et de quantificateurs.

**Atomes :** Les expressions atomiques peuvent être de trois types  :

R(s), où s est une variable de tuple et R est un nom de relation. Cet atome est vrai si le tuple s appartient à la relation R.

s.A op c, où s est une variable de tuple, A un attribut, c une constante et op un opérateur de comparaison.

s.A op u.B, où s et u sont des variables de tuples, A et B des attributs, et op un opérateur de comparaison.

**Construction de formules complexes :** Les atomes peuvent être combinés à l\'aide des connecteurs logiques ∧ (ET), ∨ (OU), et ¬ (NON). De plus, on peut utiliser les quantificateurs existentiel (∃) et universel (∀) pour lier des variables de tuple. Par exemple, (∃s)(R(s)∧...) signifie \"il existe un tuple s dans la relation R tel que\...\".

> Exemple : Pour trouver le nom de tous les étudiants inscrits au cours \'CS101\', la requête en CRT serait :
> {s.Nom∣EˊTUDIANT(s)∧(∃i)(INSCRIPTION(i)∧i.Matricule=s.Matricule∧i.CodeCours='CS101')}
> Cette requête se lit : \"Retourner l\'attribut Nom de tous les tuples s tels que s est un tuple de la relation ÉTUDIANT et il existe un tuple i dans la relation INSCRIPTION tel que le matricule de i est égal au matricule de s et le code de cours de i est \'CS101\'\".

##### Calcul Relationnel de Domaines (CRD)

Dans le CRD, les variables ne représentent pas des tuples entiers, mais des valeurs issues des domaines des attributs.

> **Forme générale :** Une requête en CRD s\'écrit sous la forme {⟨x1,x2,...,xn⟩∣Φ(x1,x2,...,xn)}, qui se lit \"l\'ensemble de tous les tuples ⟨x1,...,xn⟩ tels que la formule Φ est vraie pour les valeurs de domaine x1,...,xn\".
>
> **Formules :** La formule Φ est construite de manière similaire au CRT, mais avec des atomes différents.

**Atomes :** Les expressions atomiques peuvent être  :

R(v1,...,vk), où R est une relation d\'arité k et chaque vi est soit une variable de domaine, soit une constante. Cet atome est vrai si le tuple ⟨v1,...,vk⟩ est dans la relation R.

x op c, où x est une variable de domaine, c une constante et op un opérateur de comparaison.

x op y, où x et y sont des variables de domaine.

> Exemple : La même requête pour trouver le nom des étudiants inscrits au cours \'CS101\' s\'écrirait en CRD comme suit :
> {⟨n⟩∣(∃m,p,dn)(EˊTUDIANT(⟨m,n,p,dn⟩)∧(∃cc,me)(INSCRIPTION(⟨cc,me⟩)∧m=me∧cc='CS101'))}
> Cette requête se lit : \"Retourner les tuples à une seule valeur ⟨n⟩ (le nom) tels qu\'il existe un matricule m, un prénom p et une date de naissance dn pour lesquels le tuple ⟨m,n,p,dn⟩ est dans ÉTUDIANT, et il existe un code de cours cc et un matricule d\'étudiant me pour lesquels le tuple ⟨cc,me⟩ est dans INSCRIPTION, avec la condition que les matricules m et me sont égaux et que le code de cours cc est \'CS101\'\".

##### Le Théorème de Codd et son Importance

Bien que l\'algèbre et le calcul semblent très différents dans leur approche, Codd a démontré un résultat fondamental qui les unit. Avant d\'énoncer le théorème, il faut introduire la notion de requête \"sûre\". Une requête en calcul relationnel est dite **sûre** si elle garantit de produire un résultat fini, quelle que soit l\'instance de la base de données. Par exemple, la requête

{t∣¬EˊTUDIANT(t)} (\"tous les tuples qui ne sont pas des étudiants\") est non sûre car son résultat pourrait être infini. Les langages pratiques ne considèrent que les requêtes sûres.

**Théorème de Codd (1972) :** L\'algèbre relationnelle et le calcul relationnel de tuples sûr (et par extension, le calcul relationnel de domaines sûr) sont **équivalents en pouvoir d\'expression**.

Ce théorème signifie que pour toute expression de l\'algèbre relationnelle, il existe une requête équivalente en calcul relationnel qui produit le même résultat, et vice-versa.

L\'impact de ce théorème sur l\'architecture des SGBD est immense et ne peut être sous-estimé. Il constitue la justification théorique de l\'approche adoptée par la quasi-totalité des SGBD relationnels :

> **Interface Utilisateur Déclarative :** Ils offrent aux utilisateurs un langage de haut niveau, déclaratif, comme SQL, qui est fortement inspiré du calcul relationnel. L\'utilisateur peut ainsi formuler des requêtes complexes de manière relativement intuitive.
>
> **Exécution et Optimisation Procédurales :** En interne, le SGBD utilise le théorème de Codd pour traduire la requête déclarative de l\'utilisateur en une expression de l\'algèbre relationnelle. Cette expression algébrique représente un plan d\'exécution procédural.
>
> **Optimisation des Requêtes :** Le véritable avantage réside dans le fait qu\'il existe souvent de nombreuses expressions algébriques équivalentes (c\'est-à-dire produisant le même résultat) pour une même requête. Le composant du SGBD appelé \"optimiseur de requêtes\" peut alors explorer cet espace d\'expressions équivalentes, estimer le coût de chacune (en termes d\'accès disque, d\'utilisation du processeur, etc.) et choisir celle qui est la plus performante à exécuter.

En somme, le théorème de Codd est la pierre angulaire qui garantit que la simplicité d\'un langage déclaratif pour l\'utilisateur peut coexister avec l\'efficacité d\'une exécution procédurale et optimisée par la machine. Sans cette équivalence formelle, le développement de SGBD relationnels performants aurait été une tâche infiniment plus complexe, voire impossible.

## 30.2 La Conception de Bases de Données : Une Démarche d\'Ingénierie

Si la section précédente a établi les fondements mathématiques du modèle relationnel, cette section se consacre à la méthodologie permettant de construire des bases de données robustes et efficaces. La conception d\'une base de données n\'est pas un processus ad hoc ou un art, mais une discipline d\'ingénierie rigoureuse qui suit des étapes bien définies. L\'objectif est de traduire les besoins d\'une application du monde réel en un schéma de base de données qui non seulement stocke l\'information de manière correcte, mais le fait d\'une manière qui prévient les anomalies, minimise la redondance et garantit l\'intégrité des données à long terme.

Cette démarche d\'ingénierie procède par niveaux d\'abstraction décroissants. On part d\'une analyse des besoins pour aboutir à un **modèle conceptuel**, qui capture la sémantique et les règles de gestion du domaine d\'application de manière indépendante de la technologie. Le modèle Entité-Association (E-A) est l\'outil de prédilection à ce niveau. Ensuite, ce modèle conceptuel est systématiquement traduit en un **modèle logique**, qui se conforme aux structures d\'un type de SGBD particulier, dans notre cas, le modèle relationnel. C\'est à cette étape qu\'intervient la **normalisation**, un processus formel de raffinement du schéma logique. La normalisation n\'est pas une simple \"bonne pratique\", mais l\'application rigoureuse de la théorie des dépendances fonctionnelles pour décomposer les relations de manière à éliminer les défauts structurels. Ce processus en deux temps --- modélisation sémantique suivie d\'un raffinement logique --- est au cœur de toute conception de base de données professionnelle.

### 30.2.1 Modélisation Conceptuelle avec le Modèle Entité-Association (E-A)

Proposé par Peter Chen en 1976, le modèle Entité-Association (E-A) est un modèle de données de haut niveau utilisé pour la conception conceptuelle des bases de données. Son principal avantage est sa richesse sémantique et sa représentation graphique intuitive, qui facilitent la communication entre les concepteurs de bases de données et les experts du domaine (les futurs utilisateurs), qui ne sont pas nécessairement des informaticiens. Le modèle E-A permet de décrire les objets importants d\'un domaine, leurs propriétés et les liens qui les unissent, formant ainsi un plan directeur avant toute implémentation.

#### Les Composants du Modèle E-A

Le modèle E-A repose sur un petit nombre de concepts fondamentaux, représentés par des symboles graphiques distincts.

> **Entité et Type d\'Entité :** Une **entité** est un \"objet\" du monde réel, concret (un étudiant, une voiture) ou abstrait (un cours, une commande), qui peut être distingué de manière unique des autres objets. Un
> **type d\'entité** est un ensemble d\'entités qui partagent les mêmes propriétés. Par exemple, \'Jean Tremblay\' est une occurrence (une entité) du type d\'entité ÉTUDIANT. Dans un diagramme E-A, un type d\'entité est généralement représenté par un rectangle contenant son nom.
>
> **Attributs :** Les attributs sont les propriétés ou les caractéristiques qui décrivent un type d\'entité. Par exemple, les attributs du type d\'entité
> ÉTUDIANT pourraient être Matricule, Nom et DateDeNaissance. Les attributs sont souvent représentés par des ovales reliés au rectangle de leur entité. Le modèle E-A permet une classification fine des attributs :

**Attributs simples vs. composites :** Un attribut simple est atomique (ex: Âge). Un attribut composite peut être décomposé en sous-parties ayant leur propre signification (ex: l\'attribut Adresse peut être composé des attributs simples Numéro, Rue, Ville, CodePostal).

**Attributs monovalués vs. multivalués :** Un attribut monovalué ne peut prendre qu\'une seule valeur pour une entité donnée (ex: Matricule). Un attribut multivalué peut en prendre plusieurs (ex: un type d\'entité LIVRE pourrait avoir un attribut multivalué MotsClés). Dans les diagrammes, les attributs multivalués sont souvent représentés par un double ovale.

**Attributs dérivés :** Un attribut dérivé est un attribut dont la valeur peut être calculée ou déduite à partir d\'un autre attribut (ex: l\'attribut Âge peut être dérivé de l\'attribut DateDeNaissance). Il est souvent représenté par un ovale en pointillé.

> **Identifiant (Clé) :** Un identifiant (ou clé) est un ensemble d\'un ou plusieurs attributs dont les valeurs identifient de manière unique chaque occurrence d\'un type d\'entité. Par exemple,
> Matricule est un identifiant pour ÉTUDIANT. L\'attribut formant l\'identifiant est généralement souligné dans le diagramme.
>
> **Association et Type d\'Association :** Une **association** est un lien sémantique qui existe entre une ou plusieurs entités. Un **type d\'association** est une classification d\'associations similaires entre un ou plusieurs types d\'entités. Par exemple,
> INSCRIT_À est un type d\'association qui relie les types d\'entités ÉTUDIANT et COURS. Un type d\'association est représenté par un losange reliant les rectangles des entités participantes. Le **degré** d\'une association est le nombre de types d\'entités qui y participent. Les associations binaires (degré 2) sont les plus courantes, mais des associations ternaires (degré 3) ou plus sont possibles. Une **association récursive** est une association où un même type d\'entité participe plusieurs fois, dans des rôles différents (ex: un type d\'entité EMPLOYÉ peut être lié à lui-même par l\'association SUPERVISE, où un employé joue le rôle de \"superviseur\" et un autre celui de \"supervisé\").
>
> **Cardinalités :** Les cardinalités (ou multiplicités) sont des contraintes qui spécifient le nombre d\'occurrences d\'une association auxquelles une entité peut participer. C\'est l\'un des aspects les plus cruciaux de la modélisation E-A. Pour chaque participation d\'un type d\'entité E à une association A, on spécifie une paire de valeurs (min, max)  :

**Cardinalité minimale (min) :** Indique le nombre minimum de fois qu\'une occurrence de E *doit* participer à l\'association A. Une valeur de 0 signifie que la participation est **optionnelle**, tandis qu\'une valeur de 1 (ou plus) signifie qu\'elle est **obligatoire**.

**Cardinalité maximale (max) :** Indique le nombre maximum de fois qu\'une occurrence de E *peut* participer à l\'association A. Une valeur de 1 signifie qu\'elle ne peut participer qu\'une seule fois, tandis qu\'une valeur de N (ou \*) signifie qu\'elle peut participer plusieurs fois, sans limite prédéfinie.

La combinaison des cardinalités maximales de part et d\'autre d\'une association binaire définit son type global :

> **Un-à-un (1:1) :** Chaque entité d\'un côté est associée à au plus une entité de l\'autre côté. (Ex: PRÉSIDENT (1,1) \-\-- DIRIGE \-\-- (1,1) PAYS).
>
> **Un-à-plusieurs (1:N) :** Une entité du côté \"1\" peut être associée à plusieurs entités du côté \"N\", mais une entité du côté \"N\" ne peut être associée qu\'à une seule entité du côté \"1\". (Ex: PROFESSEUR (1,1) \-\-- ENSEIGNE \-\-- (0,N) COURS).
>
> **Plusieurs-à-plusieurs (N:M) :** Une entité d\'un côté peut être associée à plusieurs entités de l\'autre, et vice-versa. (Ex: ÉTUDIANT (1,N) \-\-- S\'INSCRIT_À \-\-- (0,N) COURS).

#### Algorithme de Traduction du Schéma E-A vers le Schéma Relationnel

Une fois le modèle conceptuel E-A validé, l\'étape suivante consiste à le traduire en un schéma logique relationnel, c\'est-à-dire en un ensemble de schémas de tables avec leurs clés primaires et étrangères. Ce processus peut être systématisé par un algorithme.

> **Étape 1 : Mapper les Types d\'Entités Fortes**

**Règle :** Pour chaque type d\'entité forte (c\'est-à-dire une entité qui possède son propre identifiant) dans le diagramme E-A, créer une nouvelle relation (table). Le nom de la relation sera celui du type d\'entité.

**Attributs :** Les attributs simples du type d\'entité deviennent les colonnes de la relation. Pour les attributs composites, on inclut uniquement leurs attributs simples constitutifs.

**Clé primaire :** L\'identifiant du type d\'entité devient la clé primaire de la nouvelle relation.

**Exemple :** Le type d\'entité PROFESSEUR(NumProf, Nom, Bureau) devient la relation PROFESSEUR(NumProf, Nom, Bureau).

> Étape 2 : Mapper les Associations Binaires
> Le traitement d\'une association binaire entre deux entités E1 et E2 dépend de sa cardinalité maximale.

**Cas 1 : Association Un-à-plusieurs (1:N)**

**Règle :** Ne pas créer de nouvelle table pour l\'association. Identifier la relation correspondant à l\'entité du côté \"N\" de l\'association. Ajouter à cette relation une nouvelle colonne qui sera une clé étrangère référençant la clé primaire de la relation du côté \"1\".

**Exemple :** Pour PROFESSEUR (1) \-\-- ENSEIGNE \-\-- (N) COURS, on ajoute l\'attribut NumProf (clé primaire de PROFESSEUR) comme clé étrangère dans la relation COURS. Le schéma de COURS devient COURS(CodeCours, Titre, NumProf).

**Cas 2 : Association Plusieurs-à-plusieurs (N:M)**

**Règle :** Créer une nouvelle relation (souvent appelée table de jonction ou table d\'association) pour représenter l\'association.

**Clé primaire :** La clé primaire de cette nouvelle relation est une clé composite formée par la combinaison des clés étrangères référençant les clés primaires des deux entités participantes.

**Attributs :** Si l\'association elle-même possède des attributs, ils deviennent des colonnes de cette nouvelle table.

**Exemple :** Pour ÉTUDIANT (N) \-\-- S\'INSCRIT_À \-\-- (M) COURS, avec un attribut Session sur l\'association, on crée une nouvelle relation INSCRIPTION. Son schéma sera INSCRIPTION(Matricule, CodeCours, Session), où {Matricule, CodeCours} forme la clé primaire composite, Matricule est une clé étrangère vers ÉTUDIANT et CodeCours est une clé étrangère vers COURS.

**Cas 3 : Association Un-à-un (1:1)**

**Règle :** Deux approches sont possibles. La plus courante est de suivre la même règle que pour les associations 1:N. On choisit l\'une des deux relations (souvent celle dont la participation est obligatoire, si c\'est le cas) et on y ajoute une clé étrangère vers l\'autre. Pour garantir la contrainte \"1\" de ce côté, cette colonne de clé étrangère doit être déclarée avec une contrainte d\'unicité (UNIQUE).

**Exemple :** Pour EMPLOYÉ (1,1) \-\-- DIRIGE \-\-- (0,1) DÉPARTEMENT, on peut ajouter l\'attribut NumDirecteur comme clé étrangère dans la table DÉPARTEMENT, référençant la clé primaire de EMPLOYÉ. On ajoutera une contrainte UNIQUE sur NumDirecteur dans DÉPARTEMENT.

> **Étape 3 : Mapper les Attributs Multivalués**

**Règle :** Pour chaque attribut multivalué A d\'un type d\'entité E, créer une nouvelle relation. Cette relation contiendra la clé primaire de la relation correspondant à E (qui agira comme clé étrangère) et une colonne pour l\'attribut A.

**Clé primaire :** La clé primaire de cette nouvelle relation sera la combinaison de la clé étrangère et de la colonne de l\'attribut A.

**Exemple :** Si l\'entité PROFESSEUR a un attribut multivalué Spécialité, on crée une nouvelle table PROF_SPECIALITE(NumProf, Spécialité), où {NumProf, Spécialité} est la clé primaire et NumProf est une clé étrangère vers PROFESSEUR.

> **Étape 4 : Mapper les Types d\'Entités Faibles**

**Règle :** Pour chaque type d\'entité faible F avec une entité propriétaire P, créer une nouvelle relation. Cette relation inclura tous les attributs de F. On y ajoute également la clé primaire de la relation de P comme clé étrangère.

**Clé primaire :** La clé primaire de la nouvelle relation pour F est la combinaison de la clé primaire de son propriétaire P et du discriminateur de F.

Le tableau suivant synthétise cet algorithme, fournissant un guide de référence pour cette étape cruciale de la conception.

**Table 30.2 : Algorithme de Mapping E-A vers Relationnel**

---

  Concept E-A               Règle de Traduction                                                                                            Exemple de Schéma Relationnel

  **Entité Forte**          Devient une table. L\'identifiant devient la clé primaire.                                                     Entité(ID_Entité, Attribut1,\...)

  **Association 1:N**       La clé de l\'entité côté \'1\' migre comme clé étrangère dans la table de l\'entité côté \'N\'.                Table_N(ID_N,\..., ID_1_FK)

  **Association N:M**       Création d\'une nouvelle table de jonction. La clé primaire est la composition des clés des entités liées.     Jonction(ID_1_FK, ID_2_FK, Attributs_Assoc)

  **Association 1:1**       Similaire à 1:N. La clé étrangère migre dans l\'une des tables et doit avoir une contrainte d\'unicité.        Table1(ID_1,\..., ID_2_FK UNIQUE)

  **Attribut Multivalué**   Création d\'une nouvelle table. La clé primaire est la composition de la clé de l\'entité et de l\'attribut.   Entité_Attribut(ID_Entité_FK, Attribut)

  **Entité Faible**         Devient une table. La clé primaire est la composition de la clé de l\'entité forte et du discriminateur.       Entité_Faible(ID_Forte_FK, Discriminateur,\...)

---

Ce processus de traduction, bien que systématique, peut produire un schéma relationnel qui, tout en étant une représentation fidèle du modèle conceptuel, n\'est pas encore optimal. Il peut contenir des redondances et être sujet à des anomalies. C\'est là qu\'intervient la normalisation.

### 30.2.2 Normalisation : Vers un Schéma Logique Robuste

La normalisation est un processus formel et systématique de décomposition des relations d\'une base de données afin de minimiser la redondance des données et d\'éliminer les anomalies indésirables de mise à jour, d\'insertion et de suppression. L\'objectif n\'est pas d\'éliminer toute redondance (la duplication des clés étrangères est, par exemple, nécessaire), mais de s\'assurer que le schéma est structuré de manière à ce que chaque fait ou information élémentaire ne soit stocké qu\'une seule fois. La théorie de la normalisation repose entièrement sur le concept de dépendance fonctionnelle.

#### Motivation : Les Anomalies et la Redondance

Considérons une relation \"naïve\" qui n\'a pas été normalisée, décrivant des inscriptions d\'étudiants à des cours, avec des informations sur le professeur qui donne le cours :

INSCRIPTION_BRUTE(Matricule, NomÉtudiant, CodeCours, TitreCours, NumProf, NomProf)

Supposons que la clé primaire soit {Matricule, CodeCours}. Cette structure, bien que fonctionnelle en apparence, est porteuse de graves problèmes structurels 42 :

> **Redondance des données :** Les informations sur un cours (son titre) et sur son professeur (son nom) sont répétées pour chaque étudiant inscrit à ce cours. Si 100 étudiants suivent le cours \'CS101\' donné par le professeur \'Codd\', le titre du cours et le nom du professeur seront répétés 100 fois.
>
> **Anomalie de Mise à Jour :** Si le professeur \'Codd\' change de nom, ou si le titre du cours \'CS101\' est modifié, cette mise à jour doit être effectuée sur toutes les lignes correspondant aux inscriptions de ce cours. Oublier une seule ligne créerait une incohérence dans la base de données, où le même cours ou le même professeur aurait plusieurs noms différents.
>
> **Anomalie d\'Insertion :** Il est impossible d\'ajouter un nouveau cours à la base de données tant qu\'aucun étudiant ne s\'y est encore inscrit. Pour insérer une ligne, nous avons besoin d\'une clé primaire, qui inclut un Matricule. On ne peut donc pas stocker le fait que \"le cours \'CS202\' est donné par le professeur \'Date\'\" s\'il n\'y a pas encore d\'étudiants.
>
> **Anomalie de Suppression :** Si le dernier étudiant inscrit au cours \'CS101\' se désinscrit, sa ligne dans INSCRIPTION_BRUTE sera supprimée. Si cette information n\'est stockée nulle part ailleurs, nous perdrons non seulement l\'information sur l\'inscription, mais aussi le fait même que le cours \'CS101\' existe et qu\'il est enseigné par le professeur \'Codd\'.

La normalisation vise précisément à décomposer cette \"grosse\" relation en plusieurs relations plus petites et mieux structurées pour que ces problèmes ne puissent pas se produire.

#### Les Dépendances Fonctionnelles (DF) : L\'Outil d\'Analyse

L\'outil formel pour analyser la structure d\'une relation et identifier ces problèmes est la **dépendance fonctionnelle (DF)**.

> **Définition Formelle :** Soit R un schéma de relation avec un ensemble d\'attributs U. Soient X et Y deux sous-ensembles de U. On dit qu\'il existe une dépendance fonctionnelle de X vers Y, notée X→Y, si et seulement si pour toute instance valide de R, chaque fois que deux tuples ont la même valeur pour l\'ensemble d\'attributs X, ils doivent nécessairement avoir la même valeur pour l\'ensemble d\'attributs Y. Autrement dit, la valeur de
> X détermine de manière unique la valeur de Y.

Dans notre exemple INSCRIPTION_BRUTE, nous avons les DFs suivantes :

{Matricule, CodeCours} \\to {NomÉtudiant, TitreCours, NumProf, NomProf} (par définition de la clé primaire).

Matricule \\to NomÉtudiant (un matricule identifie un seul nom d\'étudiant).

CodeCours \\to {TitreCours, NumProf} (un code de cours identifie un titre et un professeur unique).

NumProf \\to NomProf (un numéro de professeur identifie un seul nom).

> **Inférence Logique : Les Axiomes d\'Armstrong :** Un ensemble donné de DFs en implique logiquement d\'autres. En 1974, W.W. Armstrong a proposé un ensemble de règles d\'inférence, appelées axiomes d\'Armstrong, qui sont **saines** (ne génèrent que des DFs valides) et **complètes** (peuvent générer toutes les DFs valides).

**Axiome 1 (Réflexivité) :** Si Y⊆X, alors X→Y. C\'est une dépendance triviale. (Ex: {Matricule, Nom} \\to Matricule).

**Axiome 2 (Augmentation) :** Si X→Y, alors XZ→YZ pour tout ensemble d\'attributs Z. (Ex: Si Matricule \\to Nom, alors {Matricule, CodeCours} \\to {Nom, CodeCours}).

**Axiome 3 (Transitivité) :** Si X→Y et Y→Z, alors X→Z. (Ex: Si CodeCours \\to NumProf et NumProf \\to NomProf, alors CodeCours \\to NomProf).

À partir de ces trois axiomes, on peut dériver d\'autres règles utiles comme l\'**union** (si X→Y et X→Z, alors X→YZ) et la **décomposition** (si X→YZ, alors X→Y et X→Z).

> **Fermeture d\'un Ensemble d\'Attributs (X+) :** La fermeture d\'un ensemble d\'attributs X, notée X+, est l\'ensemble de tous les attributs qui sont fonctionnellement déterminés par X en utilisant les axiomes d\'Armstrong. On peut la calculer avec l\'algorithme suivant :

Initialiser X+ avec les attributs de X.

Répéter tant que X+ change : Pour chaque DF A→B dans l\'ensemble des DFs données, si A est un sous-ensemble de X+, alors ajouter les attributs de B à X+.
Cet algorithme est fondamental pour la conception. Il permet notamment de vérifier si un ensemble d\'attributs K est une superclé (en vérifiant si K+ contient tous les attributs de la relation) et de trouver toutes les clés candidates.

#### Le Processus de Décomposition à travers les Formes Normales

La normalisation est un processus itératif qui consiste à vérifier si une relation respecte une certaine **forme normale** et, si ce n\'est pas le cas, à la décomposer en plusieurs relations qui, elles, la respectent. Chaque forme normale est une condition de plus en plus stricte sur la structure des DFs au sein d\'une relation.

##### Première Forme Normale (1NF)

> **Définition :** Une relation est en première forme normale (1NF) si et seulement si le domaine de chaque attribut ne contient que des valeurs **atomiques** (indivisibles).
>
> **Problème résolu :** La 1NF est la condition de base du modèle relationnel. Elle interdit les \"attributs multivalués\" ou les \"groupes répétitifs\" dans une seule cellule. Par exemple, une colonne Téléphones contenant {\'514-123-4567\', \'438-987-6543\'} violerait la 1NF. Pour se conformer, il faudrait créer des lignes séparées pour chaque numéro de téléphone ou, mieux, une table TÉLÉPHONE distincte. Notre relation INSCRIPTION_BRUTE est déjà en 1NF, car toutes ses valeurs sont atomiques.

##### Deuxième Forme Normale (2NF)

> **Prérequis :** La relation doit être en 1NF.
>
> **Définition :** Une relation est en deuxième forme normale (2NF) si tout attribut n\'appartenant à aucune clé candidate (attribut non-clé) est **pleinement fonctionnellement dépendant** de chaque clé candidate. Une dépendance
> K→A est \"pleine\" si on ne peut retirer aucun attribut de K sans que la dépendance ne soit plus valide. Si un attribut non-clé ne dépend que d\'une *partie* d\'une clé candidate composite, on parle de **dépendance partielle**.
>
> **Problème résolu :** La 2NF élimine les dépendances partielles, qui sont une source majeure de redondance.
>
> **Décomposition :** Analysons INSCRIPTION_BRUTE(Matricule, NomÉtudiant, CodeCours, TitreCours, NumProf, NomProf) avec la clé {Matricule, CodeCours}.

La DF Matricule \\to NomÉtudiant est une dépendance partielle, car NomÉtudiant (attribut non-clé) dépend de Matricule, qui n\'est qu\'une partie de la clé primaire.

La DF CodeCours \\to {TitreCours, NumProf, NomProf} est aussi une dépendance partielle.
Pour passer en 2NF, on décompose la relation en extrayant les dépendances partielles dans de nouvelles relations :

ÉTUDIANT(Matricule, NomÉtudiant)

COURS_PROF(CodeCours, TitreCours, NumProf, NomProf)

INSCRIPTION(Matricule, CodeCours) (conserve le lien N:M)
Cette décomposition est dite \"sans perte d\'information\" car on peut reconstituer la relation originale en effectuant des jointures naturelles entre les nouvelles relations.

##### Troisième Forme Normale (3NF)

> **Prérequis :** La relation doit être en 2NF.
>
> **Définition :** Une relation est en troisième forme normale (3NF) si, pour toutes ses DFs non-triviales X→Y, soit X est une superclé, soit chaque attribut dans Y est un attribut premier (c\'est-à-dire qu\'il fait partie d\'au moins une clé candidate). Une manière plus simple de le dire est qu\'il ne doit exister aucune **dépendance transitive** : un attribut non-clé ne doit pas dépendre d\'un autre attribut non-clé.
>
> **Problème résolu :** La 3NF élimine les dépendances entre attributs non-clés.
>
> **Décomposition :** Regardons la relation COURS_PROF(CodeCours, TitreCours, NumProf, NomProf) issue de notre décomposition 2NF. La clé est CodeCours.

Nous avons les DFs CodeCours \\to NumProf et NumProf \\to NomProf.

Puisque CodeCours est la clé, NumProf est un attribut non-clé. Et NomProf est un attribut non-clé qui dépend de NumProf. C\'est une dépendance transitive : CodeCours \\to NumProf \\to NomProf.
Pour passer en 3NF, on décompose à nouveau :

COURS(CodeCours, TitreCours, NumProf)

PROFESSEUR(NumProf, NomProf)
Notre schéma final, entièrement en 3NF, est donc composé de quatre relations : ÉTUDIANT(Matricule, NomÉtudiant), PROFESSEUR(NumProf, NomProf), COURS(CodeCours, TitreCours, NumProf) et INSCRIPTION(Matricule, CodeCours). Toutes les anomalies initiales ont été résolues.

##### Forme Normale de Boyce-Codd (BCNF)

> **Prérequis :** La relation doit être en 3NF.
>
> **Définition :** Une relation est en Forme Normale de Boyce-Codd (BCNF) si et seulement si pour chaque dépendance fonctionnelle non-triviale X→Y, X est une superclé.
>
> **Problème résolu :** La BCNF est une version plus stricte de la 3NF. Toute relation en BCNF est aussi en 3NF. L\'inverse n\'est pas toujours vrai, bien que ce soit rare en pratique. La différence apparaît dans des cas où une relation a plusieurs clés candidates composites qui se chevauchent. La BCNF élimine des redondances subtiles que la 3NF peut laisser passer.
>
> **Décomposition :** Considérons une relation SESSION_ENSEIGNEMENT(Étudiant, Cours, Professeur) où :

Un étudiant peut suivre plusieurs cours.

Pour un cours donné, un étudiant n\'a qu\'un seul professeur.

Un professeur n\'enseigne qu\'un seul cours.

Nous avons donc les DFs : {Étudiant, Cours} \\to Professeur et Professeur \\to Cours.

Les clés candidates sont {Étudiant, Cours} et {Étudiant, Professeur}. La relation est en 3NF (tous les attributs sont premiers).

Cependant, la DF Professeur \\to Cours viole la BCNF, car Professeur n\'est pas une superclé.
Pour passer en BCNF, on décompose en :

PROF_COURS(Professeur, Cours)

ÉTUDIANT_PROF(Étudiant, Professeur)

Le tableau suivant résume la hiérarchie des formes normales.

**Table 30.3 : Synthèse des Formes Normales**

---

  Forme Normale        Condition Requise                                                                             Anomalie Éliminée

  **1NF**              Tous les attributs doivent être atomiques.                                                    Groupes répétitifs, attributs non-atomiques.

  **2NF**              Être en 1NF et aucun attribut non-clé ne doit dépendre partiellement d\'une clé candidate.    Dépendances partielles.

  **3NF**              Être en 2NF et aucun attribut non-clé ne doit dépendre transitivement d\'une clé candidate.   Dépendances transitives.

  **BCNF**             Pour toute DF non-triviale X→Y, X doit être une superclé.                                     Redondances restantes dues aux clés candidates qui se chevauchent.

---

En pratique, atteindre la 3NF est généralement considéré comme un objectif standard pour une bonne conception de base de données, offrant un excellent compromis entre l\'élimination de la redondance et la complexité du schéma. La BCNF est l\'idéal théorique, recherché lorsque la rigueur est primordiale.

## 30.3 Le Langage SQL : La Norme Industrielle

Après avoir exploré les fondements théoriques du modèle relationnel et la méthodologie d\'ingénierie pour la conception de schémas, il est temps de se tourner vers l\'outil qui met ces concepts en pratique : le **Structured Query Language (SQL)**. Développé à l\'origine par IBM dans les années 1970, en s\'inspirant des travaux de Codd, SQL est devenu la norme de facto, standardisée par l\'ANSI et l\'ISO, pour la définition, la manipulation et l\'interrogation des bases de données relationnelles.

Il est crucial de comprendre que SQL n\'est pas un simple ensemble de commandes arbitraires. C\'est la matérialisation extraordinairement réussie des principes de l\'algèbre et du calcul relationnel. Chaque composant majeur du langage SQL trouve un correspondant direct dans la théorie que nous avons étudiée. La clause SELECT implémente la projection, la clause WHERE implémente la sélection, la syntaxe JOIN implémente l\'opérateur de jointure, et ainsi de suite. Comprendre ce lien profond entre la pratique de SQL et la théorie relationnelle est ce qui distingue un simple utilisateur d\'un véritable ingénieur de données, capable de formuler des requêtes non seulement correctes, mais aussi élégantes, lisibles et performantes.

Le langage SQL est traditionnellement divisé en plusieurs sous-langages, chacun ayant un rôle spécifique. Nous nous concentrerons sur les trois principaux : le Langage de Définition de Données (LDD/DDL), le Langage de Manipulation de Données (LMD/DML) et le Langage d\'Interrogation de Données (LID/DQL).

### 30.3.1 Langage de Définition de Données (LDD/DDL)

Le LDD, ou DDL (Data Definition Language), est la partie de SQL utilisée pour créer, modifier et supprimer la structure des objets de la base de données, c\'est-à-dire le schéma. Il permet de traduire le schéma logique relationnel, obtenu après normalisation, en une structure concrète au sein du SGBD.

#### CREATE TABLE

La commande CREATE TABLE est l\'outil fondamental du LDD. Elle permet de créer une nouvelle relation (table) en spécifiant son nom, la liste de ses attributs (colonnes) et, pour chaque attribut, son domaine (type de données). Plus important encore, c\'est au sein de cette commande que l\'on définit les contraintes d\'intégrité qui sont le reflet direct des concepts de clés et de domaines vus précédemment.

> **Syntaxe de base et types de données :** La syntaxe de base consiste à lister les noms de colonnes et leurs types. Les types de données (INTEGER, VARCHAR(n), DATE, DECIMAL(p,s), etc.) sont l\'implémentation pratique des domaines.
>
> **Contraintes d\'intégrité :**

PRIMARY KEY : Désigne le ou les attributs formant la clé primaire. Cette contrainte garantit l\'unicité (pas de doublons) et la non-nullité (intégrité d\'entité).

FOREIGN KEY\... REFERENCES\... : Établit un lien d\'intégrité référentielle entre une colonne (ou un groupe de colonnes) de la table courante et la clé primaire (ou une clé candidate) d\'une autre table (ou de la même table).

UNIQUE : Assure que toutes les valeurs dans une colonne (ou un groupe de colonnes) sont uniques. C\'est le mécanisme utilisé pour implémenter les clés alternatives.

NOT NULL : Interdit l\'insertion d\'une valeur nulle dans une colonne.

CHECK : Permet de spécifier une contrainte de domaine personnalisée, c\'est-à-dire un prédicat que chaque valeur de la colonne doit satisfaire (ex: CHECK (Salaire \> 0)).

**Exemple :** Création des tables de notre schéma normalisé.

> SQL

CREATE TABLE PROFESSEUR (
NumProf INTEGER PRIMARY KEY,
NomProf VARCHAR(50) NOT NULL
);

CREATE TABLE ETUDIANT (
Matricule INTEGER PRIMARY KEY,
NomEtudiant VARCHAR(50) NOT NULL
);

CREATE TABLE COURS (
CodeCours VARCHAR(10) PRIMARY KEY,
TitreCours VARCHAR(100) NOT NULL,
NumProf INTEGER NOT NULL,
CONSTRAINT fk_cours_professeur
FOREIGN KEY (NumProf) REFERENCES PROFESSEUR(NumProf)
);

CREATE TABLE INSCRIPTION (
Matricule INTEGER,
CodeCours VARCHAR(10),
CONSTRAINT pk_inscription
PRIMARY KEY (Matricule, CodeCours),
CONSTRAINT fk_inscription_etudiant
FOREIGN KEY (Matricule) REFERENCES ETUDIANT(Matricule),
CONSTRAINT fk_inscription_cours
FOREIGN KEY (CodeCours) REFERENCES COURS(CodeCours)
);

#### ALTER TABLE et DROP TABLE

> **ALTER TABLE :** Cette commande est utilisée pour modifier la structure d\'une table existante. Elle permet d\'ajouter, de supprimer ou de modifier des colonnes, ainsi que d\'ajouter ou de supprimer des contraintes. C\'est l\'outil de l\'évolution du schéma.
> SQL
> \-- Ajouter une colonne \'Bureau\' à la table PROFESSEUR
> ALTER TABLE PROFESSEUR ADD Bureau VARCHAR(20);
>
> **DROP TABLE :** Cette commande supprime définitivement une table, sa structure et toutes les données qu\'elle contient. C\'est une opération irréversible qui doit être utilisée avec la plus grande prudence.
> SQL
> DROP TABLE INSCRIPTION;

### 30.3.2 Langage de Manipulation de Données (LMD/DML)

Le LMD, ou DML (Data Manipulation Language), est utilisé pour gérer les données elles-mêmes, c\'est-à-dire les tuples au sein des relations créées avec le LDD.

> **INSERT INTO :** Permet d\'ajouter un ou plusieurs nouveaux tuples (lignes) à une table.
> SQL
> INSERT INTO PROFESSEUR (NumProf, NomProf) VALUES (101, \'Codd\');
> INSERT INTO ETUDIANT (Matricule, NomEtudiant) VALUES (12345, \'Tremblay\');
>
> **UPDATE :** Modifie les valeurs des attributs dans des tuples existants. La clause WHERE est essentielle pour spécifier *quels* tuples doivent être modifiés. Omettre la clause WHERE mettrait à jour toutes les lignes de la table.
> SQL
> UPDATE PROFESSEUR
> SET NomProf = \'Date\'
> WHERE NumProf = 101;
>
> **DELETE FROM :** Supprime des tuples d\'une table. De même, la clause WHERE est cruciale pour cibler les tuples à supprimer. Sans clause WHERE, toutes les lignes de la table sont supprimées.
> SQL
> DELETE FROM ETUDIANT
> WHERE Matricule = 12345;

### 30.3.3 Langage d\'Interrogation de Données (LID/DQL) : L\'Art de la Requête SELECT

Le LID, ou DQL (Data Query Language), est sans doute la partie la plus riche et la plus utilisée de SQL. Son unique commande, SELECT, est un outil extraordinairement puissant pour extraire des informations de la base de données. La structure d\'une requête SELECT est une implémentation directe des opérateurs de l\'algèbre relationnelle.

#### Structure Fondamentale et Lien avec l\'Algèbre

Une requête SQL de base se compose de trois clauses principales qui correspondent directement aux trois opérateurs fondamentaux de l\'algèbre :

SELECT\... FROM\... WHERE\... est l\'équivalent syntaxique de l\'expression algébrique π(σ(R1×R2×...)).12

> SELECT A1,\..., An : Spécifie les colonnes à retourner. Cela correspond à l\'opérateur de **Projection** πA1,\...,An. L\'utilisation de SELECT \* sélectionne toutes les colonnes. À noter que, par défaut, SQL ne supprime pas les doublons, contrairement à la projection formelle. Pour obtenir le comportement ensembliste, il faut utiliser SELECT DISTINCT.
>
> FROM R1, R2,\... : Spécifie les tables sources. Si plusieurs tables sont listées, séparées par des virgules, SQL effectue un **Produit Cartésien** R1×R2×....
>
> WHERE prédicat : Filtre les lignes du résultat intermédiaire (le produit cartésien) en fonction d\'une condition. Cela correspond à l\'opérateur de **Sélection** σpreˊdicat.

**Exemple :** Pour trouver le nom des étudiants et le titre des cours auxquels ils sont inscrits, une approche \"algébrique directe\" serait :

> SQL

SELECT E.NomEtudiant, C.TitreCours
FROM ETUDIANT AS E, INSCRIPTION AS I, COURS AS C
WHERE E.Matricule = I.Matricule AND I.CodeCours = C.CodeCours;

Cette requête effectue d\'abord le produit cartésien des trois tables, puis sélectionne les lignes où les matricules et les codes de cours correspondent, et enfin projette les colonnes désirées.

#### Jointures : Le Cœur de l\'Interrogation Relationnelle

Bien que le produit cartésien explicite soit théoriquement correct, il est peu lisible et souvent inefficace. SQL fournit une syntaxe dédiée, la clause JOIN, qui est l\'implémentation directe et optimisée de l\'opérateur de jointure algébrique (⋈). Elle combine la spécification des tables et la condition de jointure en une seule expression sémantiquement plus claire.

> **INNER JOIN :** C\'est la jointure la plus commune. Elle retourne uniquement les lignes pour lesquelles la condition de jointure (spécifiée dans la clause ON) est satisfaite dans les deux tables. C\'est l\'équivalent d\'une équi-jointure.
> SQL
> \-- Même requête que précédemment, mais avec la syntaxe JOIN
> SELECT E.NomEtudiant, C.TitreCours
> FROM ETUDIANT AS E
> INNER JOIN INSCRIPTION AS I ON E.Matricule = I.Matricule
> INNER JOIN COURS AS C ON I.CodeCours = C.CodeCours;
>
> **LEFT OUTER JOIN (ou LEFT JOIN) :** Cette jointure externe retourne *toutes* les lignes de la table de gauche (celle mentionnée avant le JOIN), et les lignes correspondantes de la table de droite. S\'il n\'y a pas de correspondance dans la table de droite pour une ligne de la table de gauche, les colonnes de la table de droite seront remplies avec la valeur NULL.

**Usage :** Utile pour trouver des entités qui n\'ont pas de correspondance. Par exemple, pour lister tous les étudiants et les cours auxquels ils sont inscrits, y compris ceux qui ne sont inscrits à aucun cours :

> SQL
> SELECT E.NomEtudiant, I.CodeCours
> FROM ETUDIANT AS E
> LEFT JOIN INSCRIPTION AS I ON E.Matricule = I.Matricule;
>
> **RIGHT OUTER JOIN (ou RIGHT JOIN) :** C\'est le symétrique de LEFT JOIN. Elle retourne toutes les lignes de la table de droite et les correspondances de la table de gauche, avec des NULL si nécessaire. En pratique, elle est moins utilisée car toute
> RIGHT JOIN peut être réécrite en LEFT JOIN en inversant l\'ordre des tables.
>
> **FULL OUTER JOIN :** Cette jointure combine les comportements de LEFT et RIGHT JOIN. Elle retourne toutes les lignes des deux tables. Lorsqu\'une correspondance existe, les lignes sont combinées. Sinon, la ligne de chaque table est conservée, avec des NULL pour les colonnes de l\'autre table.

**Usage :** Utile pour obtenir une vue complète de deux ensembles, y compris les éléments sans correspondance dans l\'un ou l\'autre.

**Table 30.4 : Comparaison des Types de Jointures SQL**

---

  Type de Jointure   Syntaxe SQL (Exemple)             Description                                                                                                      Représentation (Diagramme de Venn)

  **INNER JOIN**     A INNER JOIN B ON A.key = B.key   Retourne uniquement les lignes où la clé de jointure correspond dans les deux tables A et B.                     Intersection de A et B.

  **LEFT JOIN**      A LEFT JOIN B ON A.key = B.key    Retourne toutes les lignes de la table de gauche (A), et les lignes correspondantes de la table de droite (B).   Ensemble A complet.

  **RIGHT JOIN**     A RIGHT JOIN B ON A.key = B.key   Retourne toutes les lignes de la table de droite (B), et les lignes correspondantes de la table de gauche (A).   Ensemble B complet.

  **FULL JOIN**      A FULL JOIN B ON A.key = B.key    Retourne toutes les lignes lorsqu\'il y a une correspondance dans l\'une ou l\'autre des tables.                 Union de A et B.

---

#### Agrégation et Groupement

SQL étend l\'algèbre relationnelle de base avec de puissantes capacités d\'agrégation, permettant de calculer des résumés sur les données.

> **Fonctions d\'Agrégation :** Ce sont des fonctions qui opèrent sur un ensemble de valeurs et retournent une seule valeur de résumé. Les plus courantes sont COUNT() (nombre de lignes), SUM() (somme des valeurs), AVG() (moyenne), MIN() (minimum) et MAX() (maximum).
>
> **GROUP BY :** La clause GROUP BY est utilisée pour partitionner les lignes d\'une table en groupes. Les lignes ayant la même valeur pour la ou les colonnes spécifiées dans GROUP BY sont placées dans le même groupe. Les fonctions d\'agrégation opèrent alors sur chaque groupe individuellement, plutôt que sur la table entière.
> SQL
> \-- Compter le nombre d\'étudiants inscrits dans chaque cours
> SELECT CodeCours, COUNT(Matricule) AS NombreInscrits
> FROM INSCRIPTION
> GROUP BY CodeCours;
>
> **HAVING :** La clause HAVING est au GROUP BY ce que la clause WHERE est au FROM. Elle permet de filtrer les *groupes* en fonction d\'une condition portant sur le résultat d\'une fonction d\'agrégation. La clause WHERE filtre les *lignes* avant le groupement, tandis que HAVING filtre les *groupes* après le groupement.
> SQL
> \-- Afficher uniquement les cours ayant plus de 30 inscrits
> SELECT CodeCours, COUNT(Matricule) AS NombreInscrits
> FROM INSCRIPTION
> GROUP BY CodeCours
> HAVING COUNT(Matricule) \> 30;

#### Tri des Résultats

> **ORDER BY :** La clause ORDER BY est utilisée pour trier l\'ensemble de résultats final. Elle doit être la dernière clause de la requête SELECT. On peut trier sur une ou plusieurs colonnes, en ordre ascendant (ASC, par défaut) ou descendant (DESC). Cette opération sort du cadre strict du modèle relationnel (qui ne définit pas d\'ordre), mais est essentielle pour la présentation des résultats.
> SQL
> \-- Lister les cours par nombre d\'inscrits, du plus populaire au moins populaire
> SELECT CodeCours, COUNT(Matricule) AS NombreInscrits
> FROM INSCRIPTION
> GROUP BY CodeCours
> ORDER BY NombreInscrits DESC;

#### Requêtes Complexes : Structurer la Logique

Pour des problèmes complexes, imbriquer des expressions algébriques les unes dans les autres peut devenir difficile à lire et à maintenir. SQL offre deux mécanismes principaux pour structurer ces requêtes : les sous-requêtes et les expressions de table communes.

> **Sous-requêtes (Subqueries) :** Une sous-requête est une instruction SELECT complète imbriquée à l\'intérieur d\'une autre instruction SQL (dans les clauses SELECT, FROM, WHERE ou HAVING).

**Sous-requête scalaire :** Retourne une seule valeur (une ligne, une colonne). Peut être utilisée partout où une valeur unique est attendue.
SQL
\-- Trouver les étudiants dont le nom est le premier par ordre alphabétique
SELECT NomEtudiant FROM ETUDIANT
WHERE NomEtudiant = (SELECT MIN(NomEtudiant) FROM ETUDIANT);

**Sous-requête multi-lignes :** Retourne une seule colonne avec plusieurs lignes. Elle est souvent utilisée avec des opérateurs comme IN, NOT IN, ANY, ALL.
SQL
\-- Trouver les professeurs qui n\'enseignent aucun cours
SELECT NomProf FROM PROFESSEUR
WHERE NumProf NOT IN (SELECT DISTINCT NumProf FROM COURS);

**Sous-requête corrélée :** C\'est une sous-requête qui dépend de la requête externe pour ses valeurs. Elle est évaluée une fois pour chaque ligne traitée par la requête externe, ce qui peut être coûteux en performance.SQL\-- Trouver les cours ayant plus d\'inscrits que la moyenne des inscriptions par coursSELECT C.TitreCoursFROM COURS CWHERE (SELECT COUNT(\*) FROM INSCRIPTION I WHERE I.CodeCours = C.CodeCours)\> (SELECT AVG(NombreInscrits) FROM (SELECT COUNT(\*) AS NombreInscrits FROM INSCRIPTION GROUP BY CodeCours) AS Compte);

> **Expressions de Table Communes (CTE - Common Table Expressions) :** Introduites par la clause WITH, les CTE permettent de définir un ensemble de résultats temporaire et nommé, qui peut être référencé dans la suite de la requête SELECT, INSERT, UPDATE ou DELETE. Elles améliorent considérablement la lisibilité et la modularité des requêtes complexes en décomposant le problème en étapes logiques, à la manière de l\'assignation de résultats intermédiaires en algèbre.
> SQL
> \-- Même requête que la précédente, mais avec une CTE
> WITH CompteInscriptions AS (
> SELECT CodeCours, COUNT(\*) AS NombreInscrits
> FROM INSCRIPTION
> GROUP BY CodeCours
> )
> SELECT C.TitreCours
> FROM COURS C
> JOIN CompteInscriptions CI ON C.CodeCours = CI.CodeCours
> WHERE CI.NombreInscrits \> (SELECT AVG(NombreInscrits) FROM CompteInscriptions);

**CTE récursives :** Une forme avancée de CTE peut se référencer elle-même, permettant de traiter des données hiérarchiques ou des graphes, comme un organigramme d\'entreprise ou une nomenclature de produit.

### 30.3.4 Vues : Des Requêtes Nommées et Réutilisables

Une vue est une table virtuelle dont le contenu est défini par une requête SELECT. Elle ne stocke pas de données elle-même, mais présente les données des tables sous-jacentes d\'une manière prédéfinie.

> **CREATE VIEW :** La commande pour créer une vue est simple. On donne un nom à la vue et on spécifie la requête SELECT qui la définit.
> SQL
> CREATE VIEW V_COURS_POPULAIRES AS
> SELECT CodeCours, COUNT(Matricule) AS NombreInscrits
> FROM INSCRIPTION
> GROUP BY CodeCours
> HAVING COUNT(Matricule) \> 30;
>
> Une fois la vue créée, on peut l\'interroger comme s\'il s\'agissait d\'une table normale : SELECT \* FROM V_COURS_POPULAIRES;.
>
> **Utilité des Vues :**

**Simplification :** Une vue peut masquer la complexité d\'une requête impliquant de multiples jointures, agrégations et calculs. Les utilisateurs peuvent alors interroger la vue simple au lieu de réécrire la requête complexe à chaque fois.

**Sécurité :** Les vues sont un mécanisme de contrôle d\'accès. On peut donner à un utilisateur la permission d\'accéder à une vue qui ne montre que certaines colonnes ou certaines lignes d\'une table, sans lui donner accès à la table de base elle-même.

**Indépendance logique des données :** Si la structure des tables de base change (par exemple, une table est décomposée en deux), on peut parfois redéfinir une vue pour qu\'elle présente les données de la même manière qu\'auparavant. Cela permet aux applications qui utilisent la vue de continuer à fonctionner sans modification, préservant ainsi l\'indépendance entre la logique applicative et le schéma physique des données.

En conclusion, le langage SQL, loin d\'être un simple outil technique, est l\'aboutissement de décennies de recherche en théorie des bases de données. Sa structure et ses commandes sont le reflet direct des concepts formels du modèle relationnel, offrant un pont robuste et éprouvé entre les besoins humains d\'interrogation de données et la capacité de la machine à les exécuter de manière efficace et optimisée. La maîtrise de SQL passe inévitablement par la compréhension de ces fondements théoriques.
