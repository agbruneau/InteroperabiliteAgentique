# Chapitre I.45 : Apprentissage par Renforcement (RL)

## Introduction

L\'apprentissage par renforcement (AR) constitue le troisième grand paradigme de l\'apprentissage automatique, se distinguant de l\'apprentissage supervisé et de l\'apprentissage non supervisé par son approche unique de l\'acquisition de connaissances. Alors que l\'apprentissage supervisé apprend à partir de données étiquetées et que l\'apprentissage non supervisé cherche à découvrir des structures latentes dans des données non étiquetées, l\'apprentissage par renforcement aborde le problème de la prise de décision séquentielle. Il se concentre sur la manière dont un agent intelligent doit agir dans un environnement afin de maximiser une notion de récompense cumulative. Le principe fondamental repose sur l\'idée d\'un apprentissage par essais et erreurs, où un agent, qu\'il soit un programme informatique, un robot ou un système autonome, apprend de les conséquences de ses actions plutôt que d\'être explicitement enseigné.

Au cœur de ce paradigme se trouve la boucle d\'interaction agent-environnement, un cycle continu qui définit le processus d\'apprentissage. À chaque instant, l\'agent observe l\'état actuel de son environnement. Sur la base de cette observation, il sélectionne une action parmi un ensemble d\'actions possibles. L\'environnement, en réponse à cette action, transite vers un nouvel état et fournit à l\'agent une récompense, un signal scalaire qui évalue la désirabilité de la transition qui vient de se produire. Ce cycle se répète, formant une trajectoire d\'états, d\'actions et de récompenses. L\'objectif ultime de l\'agent n\'est pas de maximiser la récompense immédiate, mais la somme cumulée des récompenses sur le long terme. Cette distinction est cruciale, car elle oblige l\'agent à équilibrer les gains à court terme avec les bénéfices potentiels à long terme, un défi connu sous le nom de compromis entre l\'exploration et l\'exploitation.

Pour illustrer les concepts qui seront développés tout au long de ce chapitre, nous nous appuierons sur des exemples pédagogiques récurrents. Le plus fondamental est celui du « Monde de la grille » (*Grid World*), un environnement simple où un agent doit naviguer sur une grille bidimensionnelle pour atteindre un état objectif tout en évitant les obstacles. Cet exemple, malgré sa simplicité, permet de visualiser concrètement des notions abstraites telles que les états, les actions, les politiques et les fonctions de valeur. Nous évoquerons également des problèmes classiques de la littérature, comme celui du pendule inversé, où l\'objectif est d\'apprendre à maintenir une perche en équilibre, ou des problèmes de gestion de stock, où une séquence de décisions de commande doit être prise pour maximiser les profits. Ces exemples serviront de fil conducteur pour démontrer comment les fondements théoriques se traduisent en solutions algorithmiques.

Ce chapitre est structuré de manière à guider le lecteur depuis les fondements mathématiques jusqu\'aux algorithmes les plus avancés. Nous commencerons, dans la section 45.1, par établir le cadre formel de l\'apprentissage par renforcement : le Processus Décisionnel de Markov (MDP). Cette section est la pierre angulaire de tout le chapitre, car elle fournit le langage mathématique nécessaire pour définir rigoureusement le problème de la décision séquentielle. Nous y dériverons les équations de Bellman, qui sont au cœur de la quasi-totalité des algorithmes d\'AR. Dans la section 45.2, nous explorerons les méthodes de résolution basées sur la programmation dynamique, qui permettent de trouver des solutions optimales lorsque le modèle de l\'environnement est parfaitement connu. Par la suite, la section 45.3 abordera le cas plus réaliste de l\'apprentissage sans modèle, où l\'agent doit apprendre les dynamiques de l\'environnement directement par l\'expérience. Nous y étudierons en détail les méthodes de Monte Carlo, d\'apprentissage par différence temporelle, et les algorithmes fondamentaux que sont le Q-Learning et SARSA. Enfin, la section 45.4 nous projettera dans l\'ère moderne de l\'apprentissage par renforcement profond (*Deep Reinforcement Learning*), où les réseaux de neurones profonds sont utilisés pour résoudre des problèmes d\'une complexité auparavant inaccessible, en approximant les fonctions de valeur ou en apprenant directement des politiques complexes. Cette progression logique vise à fournir une compréhension exhaustive et nuancée de ce domaine fascinant et en pleine expansion.

## 45.1 Le Cadre Formel : Processus Décisionnels de Markov (MDP)

Pour aborder de manière rigoureuse le problème de l\'apprentissage par l\'interaction, il est indispensable de disposer d\'un cadre mathématique formel. Ce cadre permet de transformer l\'idée intuitive d\'un agent apprenant par essais et erreurs en un problème d\'optimisation bien défini. Le Processus Décisionnel de Markov, ou MDP (*Markov Decision Process*), est ce cadre. Il offre un formalisme pour modéliser la prise de décision dans des situations où les résultats sont en partie aléatoires et en partie sous le contrôle d\'un décideur.

### 45.1.1 La Formalisation de la Décision Séquentielle

La puissance du formalisme des MDP repose sur une hypothèse fondamentale : la propriété de Markov. Cette propriété stipule que l\'état actuel d\'un système contient toute l\'information nécessaire pour prédire son futur. Autrement dit, le futur est conditionnellement indépendant du passé, étant donné le présent. Formellement, un état

St​ à l\'instant t est dit de Markov si et seulement si la probabilité de transition vers l\'état suivant St+1​ ne dépend que de l\'état actuel St​ et de l\'action prise At​, et non de la séquence complète des états et actions précédents. Mathématiquement, cela s\'exprime par :

P(St+1​∣St​,At​)=P(St+1​∣S1​,A1​,\...,St​,At​)

Cette hypothèse est une simplification puissante. Elle nous permet de nous affranchir de la nécessité de conserver un historique complet des interactions de l\'agent, ce qui serait souvent infaisable en pratique. L\'état devient un résumé suffisant du passé. Dans le contexte des problèmes de décision, un MDP étend le concept de chaîne de Markov, qui modélise les transitions stochastiques entre états, en y ajoutant deux composantes essentielles : le **choix**, représenté par un ensemble d\'actions possibles, et un **objectif**, formalisé par une fonction de récompense. L\'apprentissage par renforcement peut ainsi être perçu comme le problème du contrôle optimal de processus stochastiques satisfaisant la propriété de Markov.

### 45.1.2 Définition Formelle d\'un Processus Décisionnel de Markov

Un Processus Décisionnel de Markov est formellement défini par un 5-uplet ⟨S,A,P,R,γ⟩, où chaque composante a une signification précise. La compréhension détaillée de chacun de ces éléments est un prérequis indispensable à l\'étude des algorithmes de résolution.

#### L\'Espace d\'États (S)

S est l\'ensemble de tous les états possibles dans lesquels l\'agent et l\'environnement peuvent se trouver. Un état est une description complète de la configuration du système à un instant donné. L\'espace d\'états peut être discret et fini, comme dans le cas d\'un jeu d\'échecs ou d\'un Monde de la grille où chaque case représente un état distinct. Il peut également être continu et de grande dimension, comme l\'ensemble des angles et des vitesses angulaires des articulations d\'un bras robotique, ou l\'ensemble des pixels d\'une image représentant l\'environnement perçu par un véhicule autonome. Dans ce chapitre, sauf mention contraire, nous nous concentrerons principalement sur les MDP finis, où l\'ensemble

S est fini.

#### L\'Espace d\'Actions (A)

A est l\'ensemble de toutes les actions que l\'agent peut entreprendre. Similaire à l\'espace d\'états, l\'espace d\'actions peut être discret (par exemple, les quatre mouvements \'haut\', \'bas\', \'gauche\', \'droite\' dans un Monde de la grille) ou continu (par exemple, l\'angle de braquage du volant d\'une voiture). Il est important de noter que l\'ensemble des actions disponibles peut dépendre de l\'état actuel de l\'agent. On note alors A(s) l\'ensemble des actions possibles dans l\'état s∈S.

#### Le Modèle de Transition (P)

P est la fonction de probabilité de transition, qui définit la dynamique de l\'environnement. Elle spécifie la probabilité de passer à un état futur s′ en partant d\'un état s et en exécutant une action a. Formellement, P est une fonction définie par :

P(s′∣s,a)=Pr(St+1​=s′∣St​=s,At​=a)

Cette fonction capture la nature stochastique de l\'environnement. Par exemple, si un robot se déplace sur une surface glissante, l\'action \'avancer\' peut le faire avancer (probabilité élevée), mais aussi le faire glisser sur le côté (probabilité plus faible). La somme des probabilités de transition depuis un couple

(s,a) vers tous les états successeurs possibles s′ doit être égale à 1 : ∑s′∈S​P(s′∣s,a)=1. L\'ensemble des dynamiques P est souvent appelé le **modèle** de l\'environnement.

#### La Fonction de Récompense (R)

R est la fonction de récompense, qui définit l\'objectif de l\'agent. C\'est un signal scalaire que l\'environnement envoie à l\'agent après chaque transition. La récompense immédiate rt​ dépend de l\'état de départ st−1​, de l\'action exécutée at−1​ et de l\'état d\'arrivée st​. La fonction de récompense peut être définie de plusieurs manières, mais une formulation courante est R(s,a,s′), qui représente la récompense attendue lors de la transition de l\'état s à l\'état s′ après avoir effectué l\'action a.

R(s,a,s′)=E

La conception de cette fonction est une partie cruciale de la modélisation d\'un problème en AR. Elle doit précisément traduire le but à atteindre. Par exemple, dans un jeu, une récompense de +1 pour une victoire, -1 pour une défaite, et 0 pour tous les autres mouvements est une structure de récompense courante. Dans un problème de navigation, on pourrait attribuer une grande récompense positive pour l\'atteinte de la cible et une petite récompense négative à chaque pas pour encourager l\'agent à trouver le chemin le plus court.

#### Le Facteur d\'Escompte (γ)

γ est le facteur d\'escompte (ou facteur d\'actualisation), un nombre réel compris dans l\'intervalle \$ D\'un point de vue conceptuel, γ modélise une préférence pour les récompenses immédiates par rapport aux récompenses futures. Une récompense reçue dans k pas de temps est escomptée d\'un facteur γk.

Un agent avec γ proche de 0 est dit \"myope\" : il se préoccupe principalement de la récompense immédiate et accorde peu d\'importance au futur lointain. À l\'inverse, un agent avec γ proche de 1 est dit \"prévoyant\" : il accorde une grande importance aux récompenses futures et planifie sur un horizon plus long. Le choix de

γ est donc un hyperparamètre qui dépend de la nature de la tâche.

### 45.1.3 Politiques et Fonctions de Valeur : Évaluer le Comportement

Une fois le cadre du MDP défini, l\'objectif est de trouver une manière d\'agir, une stratégie, qui maximise les récompenses sur le long terme. Cette stratégie est formalisée par le concept de politique, et son efficacité est mesurée par les fonctions de valeur.

#### Politique (π)

Une politique, notée π, est une prescription du comportement de l\'agent. Elle définit quelle action choisir dans un état donné. Formellement, une politique stochastique π(a∣s) est une distribution de probabilité sur l\'ensemble des actions A pour chaque état s∈S.

π(a∣s)=Pr(At​=a∣St​=s)

Cette fonction indique la probabilité que l\'agent choisisse l\'action a lorsqu\'il se trouve dans l\'état s. Une politique doit respecter les contraintes d\'une distribution de probabilité : ∑a∈A(s)​π(a∣s)=1 et π(a∣s)≥0 pour tout s,a. Un cas particulier important est celui de la politique déterministe, où pour chaque état, une seule action est choisie avec une probabilité de 1. Dans ce cas, la politique est une simple fonction π:S→A. La solution à un problème d\'AR est une politique optimale.

#### Retour (G_t)

L\'objectif de l\'agent est de maximiser la somme cumulée des récompenses. Cette somme est appelée le **retour**. Pour un horizon infini, le retour escompté à partir de l\'instant t, noté Gt​, est défini comme la somme des récompenses futures, pondérées par le facteur d\'escompte γ :

Gt​=Rt+1​+γRt+2​+γ2Rt+3​+⋯=k=0∑∞​γkRt+k+1​

Cette équation peut être écrite de manière récursive, ce qui sera fondamental pour la suite :

Gt​=Rt+1​+γGt+1​

Le retour est une variable aléatoire qui dépend des actions choisies par l\'agent et des transitions stochastiques de l\'environnement. L\'objectif de l\'agent est donc de maximiser l\'espérance de ce retour.

#### Fonction de Valeur d\'État (Vπ(s))

La fonction de valeur d\'état, notée Vπ(s), quantifie la \"qualité\" d\'un état s sous une politique π. Elle est définie comme l\'espérance du retour Gt​ lorsque l\'agent part de l\'état s et suit ensuite la politique π.

Vπ(s)=Eπ​

L\'indice π dans l\'espérance Eπ​ indique que cette valeur dépend de la politique suivie par l\'agent, car les actions futures sont choisies selon π(a∣s). Intuitivement, Vπ(s) répond à la question : \"En moyenne, quel retour cumulé puis-je espérer obtenir si je me trouve dans l\'état s et que je suis la stratégie π pour toujours?\"

#### Fonction de Valeur d\'Action (Qπ(s,a))

De manière similaire, la fonction de valeur d\'action, notée Qπ(s,a), quantifie la qualité non pas d\'un état, mais d\'une paire état-action (s,a) sous une politique π. Elle est définie comme l\'espérance du retour Gt​ lorsque l\'agent part de l\'état s, exécute l\'action a, et suit ensuite la politique π.

Qπ(s,a)=Eπ​

Intuitivement, Qπ(s,a) répond à la question : \"En moyenne, quel retour cumulé puis-je espérer obtenir si, dans l\'état s, je prends l\'action a une fois, puis que je suis la stratégie π pour toujours?\"

Ces deux fonctions de valeur sont intimement liées. La valeur d\'un état est l\'espérance des valeurs des actions possibles depuis cet état, pondérée par la politique :

Vπ(s)=a∈A(s)∑​π(a∣s)Qπ(s,a)

Cette dualité entre V et Q est fondamentale. Pour agir de manière optimale, un agent doit choisir la meilleure action. S\'il ne connaît que la fonction de valeur d\'état optimale V∗, il a besoin d\'un modèle de l\'environnement (P et R) pour simuler les conséquences de chaque action et choisir celle qui mène à l\'état de plus grande valeur. En revanche, si l\'agent connaît la fonction de valeur d\'action optimale Q∗, il peut simplement choisir l\'action a qui maximise Q∗(s,a) pour l\'état courant s, sans avoir besoin du modèle. Cette distinction explique pourquoi les algorithmes d\'apprentissage sans modèle, que nous verrons plus loin, se concentrent sur l\'apprentissage de la fonction

Q.

### 45.1.4 Les Équations Fondamentales de Bellman

Les équations de Bellman, nommées d\'après le mathématicien Richard Bellman, sont la pierre angulaire de la plupart des algorithmes d\'apprentissage par renforcement. Elles expriment une relation récursive entre la valeur d\'un état (ou d\'une paire état-action) et la valeur des états successeurs. Cette structure récursive est une manifestation directe de la propriété de sous-structure optimale : la solution optimale d\'un problème peut être construite à partir des solutions optimales de ses sous-problèmes. Dans le contexte des MDPs, la valeur d\'un état (le problème) est définie en fonction de la valeur des états futurs (les sous-problèmes), ce qui permet des solutions itératives.

#### Dérivation de l\'Équation d\'Espérance de Bellman pour Vπ

Partons de la définition de la fonction de valeur d\'état Vπ(s) et utilisons la forme récursive du retour Gt​=Rt+1​+γGt+1​.

Vπ(s)=Eπ​

Vπ(s)=Eπ​

Par la linéarité de l\'espérance, nous pouvons séparer les termes :

Vπ(s)=Eπ​+γEπ​

Maintenant, développons chaque terme en conditionnant sur les variables aléatoires qui déterminent leur valeur : l\'action At​ et l\'état suivant St+1​.

Vπ(s)=a∈A(s)∑​π(a∣s)s′∈S∑​P(s′∣s,a)E

En utilisant la définition de la fonction de récompense R(s,a,s′) et la définition de la fonction de valeur Vπ(s′), qui est Eπ​, nous obtenons :

\$\$V\^\\pi(s) = \\sum\_{a \\in A(s)} \\pi(a\|s) \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Ceci est l\'**équation d\'espérance de Bellman pour Vπ**. Elle établit que la valeur d\'un état s sous une politique π est la somme pondérée, sur toutes les actions possibles, de la récompense immédiate attendue plus la valeur escomptée de l\'état suivant.

#### Dérivation de l\'Équation d\'Espérance de Bellman pour Qπ

Une dérivation similaire peut être effectuée pour la fonction de valeur d\'action Qπ(s,a).

Qπ(s,a)=Eπ​

Qπ(s,a)=Eπ​

\$\$Q\^\\pi(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left \\right\]\$\$

En reconnaissant que Eπ​ est simplement Vπ(s′), nous avons :

\$\$Q\^\\pi(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Nous pouvons substituer l\'expression de Vπ(s′) en termes de Qπ pour obtenir une récursion uniquement en termes de Q :

\$\$Q\^\\pi(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Ceci est l\'**équation d\'espérance de Bellman pour Qπ**.

#### Politiques et Fonctions de Valeur Optimales

L\'objectif de l\'apprentissage par renforcement est de trouver une politique qui est meilleure ou égale à toutes les autres politiques. Une telle politique est appelée une **politique optimale**, notée π∗​. Une politique π est considérée meilleure qu\'une politique π′ si et seulement si Vπ(s)≥Vπ′(s) pour tous les états s∈S. Les politiques optimales partagent la même fonction de valeur d\'état optimale, notée V∗, et la même fonction de valeur d\'action optimale, notée Q∗, définies comme suit  :

V∗(s)=πmax​Vπ(s)∀s∈S

Q∗(s,a)=πmax​Qπ(s,a)∀s∈S,a∈A(s)

#### Équations d\'Optimalité de Bellman

Les équations d\'optimalité de Bellman spécifient la relation récursive que les fonctions de valeur optimales doivent satisfaire. Elles sont similaires aux équations d\'espérance, mais intègrent un opérateur de maximisation sur les actions, ce qui les rend non linéaires.

Pour V∗, la valeur d\'un état sous une politique optimale doit être égale au retour attendu de la meilleure action depuis cet état :

V∗(s)=a∈A(s)max​Q∗(s,a)

\$\$V\^\*(s) = \\max\_{a \\in A(s)} \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Ceci est l\'**équation d\'optimalité de Bellman pour V∗**.

Pour Q∗, la relation est la suivante :

Q∗(s,a)=E

\$\$Q\^\*(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

En substituant V∗(s′) par maxa′​Q∗(s′,a′), nous obtenons l\'**équation d\'optimalité de Bellman pour Q∗** :

\$\$Q\^\*(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Ces équations d\'optimalité sont fondamentales car elles fournissent une spécification pour la solution que nous cherchons. Si nous pouvons trouver une fonction de valeur V ou Q qui satisfait ces équations, nous avons alors trouvé les fonctions de valeur optimales, à partir desquelles une politique optimale peut être directement extraite en choisissant l\'action qui maximise la valeur attendue à chaque état. Les algorithmes que nous allons étudier dans les sections suivantes sont essentiellement des méthodes pour résoudre ces équations.

## 45.2 Résolution par Programmation Dynamique (Modèle Connu)

La programmation dynamique (PD) est une famille de méthodes algorithmiques qui permettent de résoudre des problèmes complexes en les décomposant en sous-problèmes plus simples et en résolvant ces derniers de manière récursive. Dans le contexte de l\'apprentissage par renforcement, la PD est utilisée pour calculer des politiques optimales pour un Processus Décisionnel de Markov (MDP) lorsque son modèle --- c\'est-à-dire les probabilités de transition

P(s′∣s,a) et la fonction de récompense R(s,a,s′) --- est entièrement connu. Ce scénario est souvent désigné sous le terme de **planification**, par opposition à l\'apprentissage, car l\'agent ne découvre pas l\'environnement par l\'expérience mais planifie sa stratégie optimale en utilisant sa connaissance parfaite des dynamiques du monde.

Les algorithmes de PD exploitent la structure des fonctions de valeur et les équations de Bellman pour trouver itérativement la politique optimale π∗​. Ils fonctionnent par un processus d\'**amorçage** (*bootstrapping*), où les estimations de la valeur d\'un état sont mises à jour en se basant sur les estimations de la valeur des états successeurs. Cette idée de \"mettre à jour des estimations à partir d\'autres estimations\" est un concept central qui traverse tout le domaine de l\'AR. Bien que l\'hypothèse d\'un modèle connu soit restrictive et rarement satisfaite dans les problèmes du monde réel, l\'étude de la PD est essentielle. Elle fournit les fondations théoriques et algorithmiques sur lesquelles reposent les méthodes d\'apprentissage sans modèle plus complexes. Les deux principaux algorithmes de PD pour résoudre les MDPs sont l\'itération de politique et l\'itération de valeur.

### 45.2.1 Itération de Politique (Policy Iteration)

L\'itération de politique est un algorithme qui trouve la politique optimale en alternant itérativement entre deux phases distinctes : l\'évaluation de la politique et l\'amélioration de la politique. Le processus commence avec une politique arbitraire (souvent uniforme et aléatoire) et l\'améliore de manière répétée jusqu\'à ce qu\'elle ne puisse plus être améliorée, garantissant ainsi la convergence vers la politique optimale.

#### Étape 1 : Évaluation de la Politique (Policy Evaluation)

La première phase, l\'évaluation de la politique, a pour objectif de calculer la fonction de valeur d\'état, Vπ(s), pour une politique fixe π. Pour ce faire, nous utilisons l\'équation d\'espérance de Bellman pour Vπ que nous avons établie précédemment :

\$\$V\^\\pi(s) = \\sum\_{a \\in A(s)} \\pi(a\|s) \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Pour un MDP fini, cette équation représente un système de ∣S∣ équations linéaires avec ∣S∣ inconnues (les valeurs Vπ(s) pour chaque état s). Si le nombre d\'états n\'est pas trop grand, ce système peut être résolu analytiquement. Cependant, pour des problèmes de grande taille, une approche itérative est plus pratique.

L\'évaluation itérative de politique consiste à initialiser un vecteur de valeurs V0​ de manière arbitraire (par exemple, à zéro pour tous les états) et à appliquer de manière répétée la mise à jour de Bellman comme une règle d\'affectation. À chaque itération k, nous calculons une nouvelle estimation de la fonction de valeur Vk+1​ à partir de l\'estimation précédente Vk​ pour tous les états s∈S :

\$\$V\_{k+1}(s) \\leftarrow \\sum\_{a \\in A(s)} \\pi(a\|s) \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Cette opération, appelée un balayage complet (*full backup*), est répétée jusqu\'à ce que les changements dans le vecteur de valeurs deviennent négligeables, c\'est-à-dire jusqu\'à ce que maxs∈S​∣Vk+1​(s)−Vk​(s)∣ soit inférieur à un petit seuil θ\>0. La séquence {Vk​} est garantie de converger vers Vπ lorsque k→∞.

Voici le pseudo-code pour l\'évaluation itérative de politique :

Algorithme : Évaluation Itérative de Politique\
\
Entrées : une politique π, un MDP \<S, A, P, R, γ\>, un seuil de convergence θ\
\
1. Initialiser V(s) = 0 pour tout s dans S\
2. Répéter :\
3. Δ ← 0\
4. Pour chaque s dans S :\
5. v ← V(s)\
6. V(s) ← Σ_a π(a\|s) Σ\_{s\'} P(s\'\|s,a)\
7. Δ ← max(Δ, \|v - V(s)\|)\
8. Jusqu\'à ce que Δ \< θ\
9. Retourner V

#### Étape 2 : Amélioration de la Politique (Policy Improvement)

Une fois que nous avons une estimation convergée de la fonction de valeur Vπ pour la politique actuelle π, la deuxième phase consiste à améliorer cette politique. L\'idée est de se demander, pour chaque état s, s\'il serait préférable de choisir une action a=π(s) et de suivre ensuite la politique π. Pour évaluer une telle déviation, nous utilisons la fonction de valeur d\'action Qπ(s,a):

\$\$Q\^\\pi(s,a) = \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Si, pour un état s, nous trouvons une action a telle que Qπ(s,a)\>Vπ(s), cela signifie qu\'il est strictement meilleur de choisir l\'action a dans l\'état s puis de continuer avec la politique π, que de suivre π dès le départ.

Le principe d\'amélioration de la politique consiste à construire une nouvelle politique, π′, qui est \"gloutonne\" (*greedy*) par rapport à la fonction de valeur Vπ. Pour chaque état s, la nouvelle politique π′ choisit l\'action qui maximise Qπ(s,a)  :

π′(s)=arga∈A(s)max​Qπ(s,a)

\$\$\\pi\'(s) = \\arg\\max\_{a \\in A(s)} \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Le **théorème d\'amélioration de la politique** stipule que cette nouvelle politique gloutonne π′ est une amélioration garantie par rapport à π, ou au moins aussi bonne. C\'est-à-dire, Vπ′(s)≥Vπ(s) pour tous les états s∈S. Si l\'amélioration est stricte pour au moins un état, alors la nouvelle politique est strictement meilleure. Si Vπ′=Vπ, alors Vπ doit être la fonction de valeur optimale V∗, et π et π′ sont toutes deux des politiques optimales.

#### Algorithme Complet et Convergence

L\'algorithme d\'itération de politique combine ces deux étapes dans une boucle. On commence par une politique π0​ et on génère une séquence de politiques et de fonctions de valeur :

\$\$ \\pi_0 \\xrightarrow{\\text{Évaluation}} V\^{\\pi_0} \\xrightarrow{\\text{Amélioration}} \\pi_1 \\xrightarrow{\\text{Évaluation}} V\^{\\pi_1} \\xrightarrow{\\text{Amélioration}} \\pi_2 \\xrightarrow{\\text{\...}} \\pi\_\* \\xrightarrow{\\text{Évaluation}} V\^\* \$\$

Le processus s\'arrête lorsque la politique ne change plus entre deux itérations, c\'est-à-dire lorsque πk+1​=πk​. À ce stade, la politique est stable et la condition Vπk+1​=Vπk​ est satisfaite, ce qui implique que Vπk​ est la fonction de valeur optimale V∗. Étant donné qu\'un MDP fini n\'a qu\'un nombre fini de politiques déterministes possibles, cet algorithme est garanti de converger vers une politique optimale en un nombre fini d\'itérations.

Voici le pseudo-code de l\'algorithme complet d\'itération de politique  :

Algorithme : Itération de Politique\
\
1. Initialisation\
2. Initialiser une politique π de manière arbitraire (ex: aléatoire) pour tout s dans S\
3. Initialiser V(s) = 0 pour tout s dans S\
\
4. Répéter (Boucle d\'itération de politique) :\
5. // Étape 1: Évaluation de la politique\
6. Répéter (Boucle d\'évaluation) :\
7. Δ ← 0\
8. Pour chaque s dans S :\
9. v ← V(s)\
10. V(s) ← Σ_a π(a\|s) Σ\_{s\'} P(s\'\|s,a)\
11. Δ ← max(Δ, \|v - V(s)\|)\
12. Jusqu\'à ce que Δ \< θ\
\
13. // Étape 2: Amélioration de la politique\
14. politique_stable ← vrai\
15. Pour chaque s dans S :\
16. action_ancienne ← π(s)\
17. π(s) ← argmax_a Σ\_{s\'} P(s\'\|s,a)\
18. Si action_ancienne ≠ π(s), alors politique_stable ← faux\
\
19. Jusqu\'à ce que politique_stable soit vrai\
\
20. Retourner π et V

### 45.2.2 Itération de Valeur (Value Iteration)

L\'itération de politique présente un inconvénient potentiel : l\'étape d\'évaluation de la politique peut être coûteuse en calcul, car elle nécessite de multiples balayages de l\'espace d\'états pour faire converger la fonction de valeur. L\'itération de valeur est un algorithme de programmation dynamique qui contourne ce problème en combinant l\'étape d\'évaluation et l\'étape d\'amélioration en une seule mise à jour.

#### Principe et Règle de Mise à Jour

L\'itération de valeur peut être vue comme une version tronquée de l\'itération de politique, où l\'étape d\'évaluation est arrêtée après un seul balayage. Cette intuition est formalisée en utilisant directement l\'équation d\'optimalité de Bellman comme une règle de mise à jour itérative. Au lieu de calculer la valeur pour une politique spécifique, l\'itération de valeur met directement à jour les estimations pour se rapprocher de la fonction de valeur optimale V∗.

La règle de mise à jour fondamentale de l\'itération de valeur est la suivante, appliquée à chaque état s à chaque itération k  :

\$\$V\_{k+1}(s) \\leftarrow \\max\_{a \\in A(s)} \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

Cette mise à jour combine en une seule étape l\'équivalent d\'un balayage d\'évaluation de politique et d\'une étape d\'amélioration. L\'opérateur maxa​ correspond à l\'amélioration de la politique (choisir la meilleure action), et l\'utilisation de Vk​ dans le terme de droite pour calculer Vk+1​ correspond à un pas d\'évaluation.

L\'algorithme d\'itération de valeur consiste simplement à répéter cette mise à jour pour tous les états jusqu\'à ce que le vecteur de valeurs converge. La condition d\'arrêt est la même que pour l\'évaluation de politique : lorsque la plus grande modification apportée à une valeur d\'état au cours d\'un balayage est inférieure à un seuil θ.

Voici le pseudo-code de l\'algorithme d\'itération de valeur :

Algorithme : Itération de Valeur\
\
Entrées : un MDP \<S, A, P, R, γ\>, un seuil de convergence θ\
\
1. Initialiser V(s) = 0 pour tout s dans S\
2. Répéter :\
3. Δ ← 0\
4. Pour chaque s dans S :\
5. v ← V(s)\
6. V(s) ← max_a Σ\_{s\'} P(s\'\|s,a)\
7. Δ ← max(Δ, \|v - V(s)\|)\
8. Jusqu\'à ce que Δ \< θ\
9.\
10. // Extraire une politique déterministe optimale\
11. Initialiser une politique π\
12. Pour chaque s dans S :\
13. π(s) ← argmax_a Σ\_{s\'} P(s\'\|s,a)\
14. Retourner π et V

#### Preuve de Convergence

La convergence de l\'itération de valeur vers la fonction de valeur optimale V∗ est une propriété mathématique fondamentale qui peut être prouvée formellement. La preuve repose sur le concept des applications contractantes et le théorème du point fixe de Banach.

Définissons l\'opérateur d\'optimalité de Bellman, T, qui agit sur une fonction de valeur V pour en produire une nouvelle :

\$\$(TV)(s) = \\max\_{a \\in A(s)} \\sum\_{s\' \\in S} P(s\'\|s, a) \\left\$\$

L\'algorithme d\'itération de valeur peut alors être écrit de manière compacte comme Vk+1​=TVk​. La fonction de valeur optimale V∗ est un point fixe de cet opérateur, c\'est-à-dire V∗=TV∗.

Pour prouver la convergence, nous devons montrer que T est une **application contractante** dans la norme infinie (L∞​). La norme infinie d\'une fonction de valeur est définie comme ∣∣V∣∣∞​=maxs∈S​∣V(s)∣. Une application T est une contraction s\'il existe une constante \$c \\in - \\max_a \\sum\_{s\'} P(s\'\|s,a) \\right\| \$\$

En utilisant la propriété ∣maxx​f(x)−maxx​g(x)∣≤maxx​∣f(x)−g(x)∣, nous avons :

≤amax​​s′∑​P(s′∣s,a)−s′∑​P(s′∣s,a)​

=amax​​γs′∑​P(s′∣s,a)\[U(s′)−V(s′)\]​

Puisque ∑s′​P(s′∣s,a)=1 et P(s′∣s,a)≥0, la somme est une moyenne pondérée. Donc :

≤amax​γs′∑​P(s′∣s,a)∣U(s′)−V(s′)∣

≤γamax​s′∑​P(s′∣s,a)s′′max​∣U(s′′)−V(s′′)∣

=γ∣∣U−V∣∣∞​amax​s′∑​P(s′∣s,a)

=γ∣∣U−V∣∣∞​

Puisque cela est vrai pour tout s, nous pouvons prendre le maximum sur tous les états :

∣∣TU−TV∣∣∞​=smax​∣(TU)(s)−(TV)(s)∣≤γ∣∣U−V∣∣∞​

Comme \$\\gamma \\in

L\'itération de valeur, en revanche, a des itérations beaucoup moins coûteuses. Chaque itération ne consiste qu\'en un seul balayage de l\'espace d\'états, avec une complexité proportionnelle à ∣S∣2∣A∣. Cependant, elle peut nécessiter un grand nombre de ces itérations pour que la fonction de valeur converge, surtout pour des valeurs de γ proches de 1.

Le choix entre les deux dépend donc du problème. Pour les problèmes avec un grand nombre d\'actions mais un nombre modéré d\'états, l\'itération de politique peut être avantageuse car elle pourrait converger en peu d\'améliorations de politique. Pour les problèmes avec un très grand nombre d\'états, où la résolution complète du système d\'équations de l\'évaluation de politique est prohibitive, l\'itération de valeur est souvent préférée.

Le tableau suivant synthétise les principales différences entre ces deux algorithmes fondamentaux.

  ------------------------------ ------------------------------------------------------------------- -------------------------------------------------------------------
  Critère                        Itération de Politique                                              Itération de Valeur

  **Équation de mise à jour**    Équation d\'espérance de Bellman (pour Vπ)                          Équation d\'optimalité de Bellman (pour V∗)

  **Opération principale**       Évaluation complète de πk​, puis amélioration gloutonne              Un seul balayage combinant évaluation et amélioration

  **Complexité par itération**   Élevée (résolution d\'un système linéaire ou multiples balayages)   Faible (un seul balayage de l\'espace d\'états)

  **Nombre d\'itérations**       Généralement faible                                                 Potentiellement élevé

  **Convergence**                Converge lorsque la politique devient stable                        Converge lorsque la fonction de valeur devient stable

  **Politique intermédiaire**    Une politique valide et complète est maintenue à chaque itération   La politique n\'est extraite qu\'à la fin, après convergence de V
  ------------------------------ ------------------------------------------------------------------- -------------------------------------------------------------------

En pratique, des algorithmes hybrides existent, comme l\'itération de politique modifiée, qui exécute seulement un nombre fixe de balayages d\'évaluation de politique au lieu d\'attendre la convergence complète, offrant un compromis entre les deux approches.

La limitation fondamentale de toutes les méthodes de programmation dynamique reste cependant la même : elles exigent une connaissance complète du modèle de l\'environnement (P et R). Cette \"malédiction de la modélisation\" rend la PD inapplicable à la plupart des problèmes du monde réel, où les dynamiques sont soit inconnues, soit trop complexes pour être spécifiées explicitement. Cette contrainte est la principale motivation pour explorer les méthodes d\'apprentissage sans modèle, qui constituent le sujet de la section suivante. La PD est un outil de planification, pas un outil d\'apprentissage.

## 45.3 Apprentissage sans modèle (Modèle Inconnu)

Dans la section précédente, nous avons exploré comment trouver une politique optimale en utilisant la programmation dynamique, sous l\'hypothèse cruciale que nous possédons un modèle parfait de l\'environnement. Cependant, dans la grande majorité des applications pratiques, cette hypothèse n\'est pas tenable. Pour des problèmes complexes comme la conduite autonome, la robotique avancée ou les jeux stratégiques comme le Go, les dynamiques de l\'environnement (P et R) sont soit inconnues, soit si vastes et complexes qu\'il est impossible de les spécifier explicitement. C\'est ici qu\'intervient l\'apprentissage sans modèle (

*model-free learning*).

Les méthodes sans modèle apprennent une politique optimale non pas par la planification, mais directement par l\'expérience. L\'agent interagit avec l\'environnement, collecte des trajectoires d\'états, d\'actions et de récompenses, et utilise ces échantillons pour estimer les fonctions de valeur et améliorer sa politique. Cette approche est au cœur de ce que l\'on entend communément par \"apprentissage\" par renforcement.

Au sein de l\'apprentissage sans modèle, on distingue deux objectifs principaux :

> **La prédiction** : Étant donné une politique π, le but est d\'estimer sa fonction de valeur, Vπ ou Qπ. C\'est l\'équivalent sans modèle de l\'étape d\'évaluation de politique.
>
> **Le contrôle** : Le but est de trouver la politique optimale, π∗​. C\'est l\'équivalent sans modèle de l\'itération de politique ou de valeur.

Cette section explorera les trois grandes familles de méthodes d\'apprentissage sans modèle : les méthodes de Monte Carlo, l\'apprentissage par différence temporelle, et les algorithmes de contrôle qui en découlent, Q-Learning et SARSA. Ces algorithmes, dans leur forme tabulaire, sont les fondations de l\'AR classique et permettent de surmonter la \"malédiction de la modélisation\", bien qu\'ils soient eux-mêmes confrontés à la \"malédiction de la dimensionnalité\", qui motivera la transition vers l\'apprentissage profond.

### 45.3.1 Méthodes de Monte Carlo (MC)

Les méthodes de Monte Carlo (MC) représentent l\'approche la plus simple et la plus intuitive de l\'apprentissage à partir de l\'expérience. Elles estiment les fonctions de valeur en moyennant les retours empiriques obtenus à la fin d\'épisodes complets. Un épisode est une séquence d\'interactions qui se déroule d\'un état initial jusqu\'à un état terminal. L\'idée fondamentale de MC est que l\'espérance d\'une variable aléatoire peut être approximée par la moyenne d\'un grand nombre d\'échantillons de cette variable. Dans notre cas, la fonction de valeur

Vπ(s) est l\'espérance du retour Gt​ ; les méthodes MC l\'estiment donc en calculant la moyenne des retours observés après avoir visité l\'état s.

#### Prédiction par Monte Carlo

Pour estimer Vπ(s) pour une politique π donnée, l\'agent suit la politique π et génère un grand nombre d\'épisodes. Pour chaque épisode, une fois qu\'il est terminé, on parcourt la séquence d\'états visités. Pour chaque occurrence d\'un état s, on calcule le retour Gt​ qui a suivi cette occurrence. La valeur de l\'état s est alors mise à jour comme la moyenne de tous les retours observés.

Il existe deux variantes principales de la prédiction par MC  :

> **First-Visit MC (MC de la première visite)** : Pour chaque épisode, on ne considère que le retour suivant la *première* visite à l\'état s.
>
> **Every-Visit MC (MC de chaque visite)** : On considère les retours suivant *chaque* visite à l\'état s au sein d\'un même épisode.

La mise à jour de la valeur peut être implémentée de manière incrémentale pour éviter de stocker tous les retours. Pour un état St​ avec un retour observé Gt​, la mise à jour est :

V(St​)←V(St​)+α(Gt​−V(St​))

où α est un taux d\'apprentissage (qui peut être constant ou décroissant). Cette formule ajuste l\'estimation actuelle V(St​) dans la direction de l\'erreur entre le retour observé Gt​ et l\'estimation actuelle.

#### Contrôle par Monte Carlo

Pour le contrôle (trouver la politique optimale), nous devons estimer la fonction de valeur d\'action Qπ(s,a), car elle nous permet de choisir les meilleures actions sans connaître le modèle. Le principe est le même : on moyenne les retours pour chaque paire (s,a).

Cependant, un problème se pose. Si la politique π est déterministe, nous pourrions ne jamais explorer certaines actions pour certains états, et donc ne jamais pouvoir estimer leur valeur. Pour garantir que nous continuons à explorer toutes les actions, nous devons nous assurer que la politique que nous suivons est \"exploratoire\". Une solution théorique est l\'hypothèse des **départs exploratoires** (*exploring starts*), où chaque épisode commence à une paire (s,a) choisie aléatoirement, garantissant que toutes les paires sont éventuellement visitées.

En pratique, les départs exploratoires sont souvent irréalisables. Une approche plus courante consiste à utiliser des politiques \"douces\" (*soft policies*), qui ont une probabilité non nulle de sélectionner n\'importe quelle action. La politique **ϵ-greedy** est un exemple canonique : avec une probabilité 1−ϵ, l\'agent choisit l\'action gloutonne (celle avec la plus grande valeur Q estimée), et avec une probabilité ϵ, il choisit une action au hasard parmi toutes les actions possibles.

L\'algorithme de contrôle MC on-policy suit le même schéma que l\'itération de politique : il alterne entre l\'évaluation de la politique (en utilisant les épisodes générés pour mettre à jour Q) et l\'amélioration de la politique (en rendant la politique ϵ-greedy par rapport à la nouvelle table Q).

#### Avantages et Inconvénients

Le principal avantage des méthodes MC est qu\'elles fournissent une estimation **non biaisée** de la fonction de valeur, car elles se basent sur le retour réel et complet Gt​. Cependant, elles souffrent de plusieurs inconvénients majeurs :

> **Variance élevée** : Le retour Gt​ est la somme de nombreuses variables aléatoires (récompenses), ce qui peut entraîner une variance élevée dans les estimations, ralentissant la convergence.
>
> **Applicabilité limitée aux tâches épisodiques** : MC ne peut effectuer de mise à jour qu\'à la fin d\'un épisode. Il n\'est donc pas applicable aux tâches continues qui n\'ont pas d\'état terminal.
>
> **Lenteur d\'apprentissage** : L\'apprentissage peut être lent si les épisodes sont très longs, car il faut attendre leur conclusion pour mettre à jour les valeurs.

Ces limitations motivent l\'introduction de la famille d\'algorithmes suivante : l\'apprentissage par différence temporelle.

### 45.3.2 Apprentissage par Différence Temporelle (TD)

L\'apprentissage par différence temporelle (TD) est l\'une des idées les plus centrales de l\'apprentissage par renforcement. Il combine les avantages des méthodes de Monte Carlo et de la programmation dynamique. Comme MC, le TD learning apprend directement de l\'expérience brute sans modèle de l\'environnement. Comme la PD, il met à jour ses estimations de valeur en se basant en partie sur d\'autres estimations apprises, un processus connu sous le nom de *bootstrapping*.

#### Prédiction par TD(0)

L\'algorithme de prédiction TD le plus simple est le TD(0). Il vise à estimer la fonction de valeur Vπ pour une politique π. Après chaque pas de temps, l\'agent observe la transition (St​,At​,Rt+1​,St+1​). Au lieu d\'attendre la fin de l\'épisode pour obtenir le retour complet Gt​ comme le fait MC, TD(0) forme une cible pour sa mise à jour après un seul pas. La cible TD est Rt+1​+γV(St+1​). C\'est une estimation du retour Gt​, où la récompense immédiate Rt+1​ est réelle, mais le reste du retour, γGt+1​, est approximé par la valeur actuelle estimée de l\'état suivant, γV(St+1​).

La règle de mise à jour de TD(0) pour la valeur de l\'état St​ est la suivante :

\$\$V(S_t) \\leftarrow V(S_t) + \\alpha \\left\$\$

Le terme entre crochets est appelé l\'erreur de différence temporelle (erreur TD), notée δt​ :

δt​=Rt+1​+γV(St+1​)−V(St​)

Cette erreur mesure la différence entre l\'estimation actuelle V(St​) et une meilleure estimation, la cible TD. L\'algorithme ajuste l\'estimation actuelle dans la direction de cette erreur.42

#### Avantages du TD sur le MC

Les méthodes TD présentent plusieurs avantages significatifs par rapport aux méthodes MC :

> **Apprentissage en ligne et tâches continues** : Le TD met à jour les valeurs après chaque pas de temps, il n\'a pas besoin d\'attendre la fin d\'un épisode. Cela lui permet d\'apprendre plus rapidement et de s\'appliquer à des tâches continues sans état terminal.
>
> **Variance plus faible** : La cible TD dépend d\'une seule récompense réelle Rt+1​ et d\'une seule transition, tandis que la cible MC dépend de toutes les récompenses jusqu\'à la fin de l\'épisode. Par conséquent, la cible TD a généralement une variance beaucoup plus faible que le retour MC, ce qui conduit à un apprentissage plus rapide.
>
> **Biais** : En contrepartie, la cible TD est **biaisée** car elle utilise l\'estimation V(St+1​), qui peut être inexacte, surtout au début de l\'apprentissage. Les méthodes MC sont non biaisées. C\'est un exemple classique du compromis biais-variance en apprentissage automatique. En pratique, la réduction de la variance offerte par le TD est souvent plus bénéfique que l\'introduction du biais, ce qui en fait une méthode plus efficace dans de nombreux cas.

### 45.3.3 Q-Learning : Contrôle TD Hors-Politique (Off-Policy)

Le Q-Learning est sans doute l\'algorithme d\'apprentissage par renforcement le plus connu et l\'une des avancées les plus importantes du domaine. C\'est un algorithme de contrôle par différence temporelle qui apprend directement la fonction de valeur d\'action optimale, Q∗(s,a), indépendamment de la politique que l\'agent suit pour explorer l\'environnement. Cette propriété le classe comme un algorithme **hors-politique** (*off-policy*).

#### Principe et Règle de Mise à Jour

L\'idée centrale du Q-Learning est d\'utiliser l\'équation d\'optimalité de Bellman pour Q∗ comme base pour sa règle de mise à jour. Rappelons l\'équation :

Q∗(s,a)=E

Le Q-Learning approxime cette espérance en utilisant un seul échantillon de transition (St​,At​,Rt+1​,St+1​). La règle de mise à jour, appliquée après chaque transition, est la suivante 52 :

\$\$Q(S_t, A_t) \\leftarrow Q(S_t, A_t) + \\alpha \\left\$\$

Analysons cette mise à jour :

> Q(St​,At​) est la valeur actuelle estimée.
>
> Rt+1​+γmaxa′​Q(St+1​,a′) est la cible TD.
>
> La différence entre la cible et la valeur actuelle est l\'erreur TD.

La caractéristique distinctive du Q-Learning est l\'opérateur maxa′​. Lors du calcul de la cible, l\'algorithme estime la valeur de l\'état suivant St+1​ en supposant que l\'agent y choisira la meilleure action possible (celle qui maximise la valeur Q), conformément à une politique gloutonne. Cependant, l\'action At​ qui a conduit à cette mise à jour a pu être choisie par une politique différente, par exemple une politique ϵ-greedy qui inclut de l\'exploration. Le Q-Learning apprend donc la valeur de la politique optimale (la politique cible, gloutonne) tout en suivant une autre politique pour générer des données (la politique comportementale, exploratoire). Cette dissociation est la définition même de l\'apprentissage hors-politique. Elle rend le Q-Learning très puissant et flexible, car il peut apprendre la politique optimale même à partir de données d\'exploration sous-optimales ou d\'observations d\'un autre agent.

#### Pseudo-code de l\'algorithme

Voici le pseudo-code pour l\'algorithme de Q-Learning tabulaire.

Algorithme : Q-Learning (Contrôle TD Hors-Politique)\
\
Initialiser la table Q(s,a) arbitrairement (ex: à 0) pour tout s, a\
Paramètres : taux d\'apprentissage α, facteur d\'escompte γ, probabilité d\'exploration ε\
\
Pour chaque épisode :\
Initialiser l\'état S\
Tant que S n\'est pas un état terminal :\
Choisir l\'action A depuis S en utilisant une politique dérivée de Q (ex: ε-greedy)\
// Avec probabilité 1-ε, A = argmax_a\' Q(S, a\')\
// Avec probabilité ε, A = action aléatoire\
\
Exécuter l\'action A\
Observer la récompense R et le nouvel état S\'\
\
// Mise à jour de la valeur Q\
Q(S, A) ← Q(S, A) + α \*\
\
S ← S\'

Sous des conditions standards (chaque paire (s,a) est visitée une infinité de fois et le taux d\'apprentissage α respecte les conditions de Robbins-Monro), il a été prouvé que Q(s,a) converge avec une probabilité de 1 vers la fonction de valeur d\'action optimale Q∗(s,a).

### 45.3.4 SARSA : Contrôle TD Sur-Politique (On-Policy)

SARSA est une alternative à Q-Learning qui appartient à la catégorie des algorithmes **sur-politique** (*on-policy*). Son nom est un acronyme qui décrit la séquence d\'événements utilisée pour sa mise à jour : **S**tate, **A**ction, **R**eward, **S**tate (suivant), **A**ction (suivante).

#### Principe et Règle de Mise à Jour

Contrairement au Q-Learning, qui apprend la politique optimale indépendamment de la politique d\'exploration, SARSA apprend la valeur de la politique qu\'il est en train de suivre, y compris ses aspects exploratoires. La mise à jour de SARSA est très similaire à celle du Q-Learning, mais avec une différence cruciale dans la construction de la cible TD.

Après avoir exécuté l\'action At​ dans l\'état St​ et observé la récompense Rt+1​ et le nouvel état St+1​, l\'agent choisit sa *prochaine* action, At+1​, en utilisant la même politique (par exemple, ϵ-greedy) qu\'il utilise pour l\'exploration. C\'est cette action At+1​ qui est utilisée pour former la cible TD.

La règle de mise à jour de SARSA est la suivante  :

\$\$Q(S_t, A_t) \\leftarrow Q(S_t, A_t) + \\alpha \\left\$\$

La différence fondamentale réside dans le terme Q(St+1​,At+1​) qui remplace le maxa′​Q(St+1​,a′) du Q-Learning. SARSA met à jour sa connaissance en se basant sur la valeur de l\'action qu\'il va *effectivement* prendre ensuite, et non sur la meilleure action possible. Il évalue donc la politique comportementale, ce qui en fait un algorithme sur-politique.

#### Pseudo-code de l\'algorithme

Le pseudo-code de SARSA est très proche de celui du Q-Learning, la principale différence étant le moment où la prochaine action est choisie.

Algorithme : SARSA (Contrôle TD Sur-Politique)\
\
Initialiser la table Q(s,a) arbitrairement (ex: à 0) pour tout s, a\
Paramètres : taux d\'apprentissage α, facteur d\'escompte γ, probabilité d\'exploration ε\
\
Pour chaque épisode :\
Initialiser l\'état S\
Choisir l\'action A depuis S en utilisant une politique dérivée de Q (ex: ε-greedy)\
\
Tant que S n\'est pas un état terminal :\
Exécuter l\'action A\
Observer la récompense R et le nouvel état S\'\
\
Choisir la prochaine action A\' depuis S\' en utilisant la même politique dérivée de Q\
\
// Mise à jour de la valeur Q\
Q(S, A) ← Q(S, A) + α \*\
\
S ← S\'\
A ← A\'

### 45.3.5 Analyse Comparative : Q-Learning vs. SARSA

La distinction entre sur-politique (SARSA) et hors-politique (Q-Learning) n\'est pas seulement une subtilité mathématique ; elle a des implications profondes sur le comportement de l\'agent et la nature de la politique apprise.

L\'exemple classique du **dilemme de la falaise** (*Cliff Walking*) illustre parfaitement cette différence. Imaginez un agent dans un monde de grille qui doit aller d\'un point de départ à un point d\'arrivée. Entre les deux se trouve une falaise. Tomber de la falaise entraîne une très forte récompense négative. Le chemin le plus court vers le but longe le bord de la falaise. Un chemin plus long mais plus sûr s\'éloigne de la falaise. L\'agent suit une politique

ϵ-greedy.

> **Comportement du Q-Learning** : Le Q-Learning est \"optimiste\". Sa règle de mise à jour avec l\'opérateur max lui fait apprendre la valeur de la politique optimale (gloutonne), qui consiste à prendre le chemin le plus court le long de la falaise. Il ignore le fait que la politique d\'exploration (ϵ-greedy) qu\'il suit le fera parfois, avec une probabilité ϵ, choisir une action aléatoire qui le fera tomber de la falaise. Il apprend donc une politique optimale mais risquée.
>
> **Comportement de SARSA** : SARSA est \"réaliste\". Sa règle de mise à jour prend en compte l\'action At+1​ réellement choisie par la politique ϵ-greedy. Il apprend donc que s\'approcher de la falaise est dangereux, car même si l\'action gloutonne est sûre, l\'action d\'exploration occasionnelle peut être catastrophique. Par conséquent, SARSA apprendra une politique plus conservatrice et plus sûre, qui s\'éloigne de la falaise, même si ce chemin est plus long. Il apprend la meilleure politique *possible compte tenu du fait qu\'il doit explorer*.

Cette différence est cruciale dans les applications du monde réel. Pour un robot d\'entrepôt, une politique de type SARSA, plus sûre et évitant les collisions même si elle est légèrement moins efficace, pourrait être préférable à une politique de type Q-Learning qui, bien qu\'optimale en théorie, pourrait entraîner des accidents coûteux en pratique.

Le tableau suivant résume cette comparaison fondamentale.

  ----------------------------------- --------------------------------------------------------------------------- ---------------------------------------------------------------------
  Critère                             Q-Learning                                                                  SARSA

  **Type de politique**               Hors-politique (*Off-policy*)                                               Sur-politique (*On-policy*)

  **Règle de mise à jour**            Q(S,A)←Q(S,A)+α                                                             Q(S,A)←Q(S,A)+α

  **Politique apprise**               Apprend la valeur de la politique optimale (gloutonne)                      Apprend la valeur de la politique comportementale (ex: ϵ-greedy)

  **Comportement (ex: falaise)**      Optimiste : apprend le chemin le plus court et le plus risqué               Conservateur : apprend un chemin plus long mais plus sûr

  **Stabilité**                       Peut être moins stable en raison de l\'estimation optimiste                 Généralement plus stable, car il suit la politique actuelle

  **Efficacité d\'échantillonnage**   Plus efficace, peut réutiliser des données de n\'importe quelle politique   Moins efficace, doit générer des données avec la politique actuelle
  ----------------------------------- --------------------------------------------------------------------------- ---------------------------------------------------------------------

En conclusion de cette section, les méthodes d\'apprentissage sans modèle nous ont libérés de la contrainte de connaître le modèle de l\'environnement. Cependant, les algorithmes présentés (MC, Q-Learning, SARSA) reposent sur une représentation tabulaire des fonctions de valeur. Cette approche est limitée aux problèmes avec des espaces d\'états et d\'actions discrets et de petite taille. Lorsque les états sont continus (par exemple, des images) ou que le nombre d\'états discrets est astronomique (par exemple, au jeu de Go), il devient impossible de stocker et de remplir une table Q. C\'est la

**malédiction de la dimensionnalité**, et la surmonter est la principale motivation de la dernière section de ce chapitre, consacrée à l\'apprentissage par renforcement profond.

## 45.4 Apprentissage par Renforcement Profond (DRL)

Les méthodes d\'apprentissage sans modèle que nous avons étudiées jusqu\'à présent, telles que le Q-Learning et SARSA, reposent sur une représentation tabulaire des fonctions de valeur. Cette approche, bien que fondamentale, se heurte à un mur lorsque la complexité de l\'environnement augmente. Dans de nombreux problèmes du monde réel, l\'espace d\'états peut être extrêmement vaste, voire infini. Pensez à un jeu vidéo où l\'état est représenté par les pixels bruts de l\'écran, ou à un robot dont l\'état est un vecteur de mesures continues provenant de multiples capteurs. Dans de tels scénarios, il est matériellement impossible de stocker une table de valeurs pour chaque état ou chaque paire état-action. C\'est ce qu\'on appelle la **malédiction de la dimensionnalité**.

De plus, l\'approche tabulaire manque de capacité de **généralisation**. Chaque entrée de la table est apprise indépendamment. L\'agent n\'a aucun moyen de généraliser ce qu\'il a appris sur un état à des états similaires mais jamais rencontrés. Si un robot apprend à éviter un obstacle à une certaine position, il doit tout réapprendre s\'il rencontre le même obstacle à une position légèrement différente.

L\'apprentissage par renforcement profond (*Deep Reinforcement Learning*, DRL) est né de la nécessité de surmonter ces limitations. L\'idée centrale du DRL est de remplacer la table de valeurs par un **approximateur de fonction** puissant et flexible : un réseau de neurones profond. Au lieu d\'apprendre la valeur de chaque état individuellement, l\'agent apprend les paramètres (les poids, notés θ) d\'un réseau qui peut prendre un état s en entrée et produire une estimation de sa valeur, V(s;θ), ou des valeurs de ses actions, Q(s,a;θ). Cette approche permet non seulement de gérer des espaces d\'états de grande dimension, mais aussi de généraliser l\'apprentissage à des états non vus.

Cette section explore deux des familles d\'algorithmes les plus influentes du DRL : les Réseaux Q-Profonds (DQN), qui étendent les méthodes basées sur la valeur, et les méthodes de Gradient de Politique, qui apprennent directement une représentation paramétrée de la politique.

### 45.4.1 Les Réseaux Q-Profonds (Deep Q-Networks - DQN)

Le Deep Q-Network (DQN) est un algorithme qui a marqué un tournant dans l\'histoire de l\'IA en démontrant la capacité d\'un agent à apprendre à jouer à des jeux vidéo Atari 2600 à un niveau surhumain, directement à partir des pixels bruts de l\'écran. Il combine l\'algorithme de Q-Learning avec un réseau de neurones à convolution (CNN) pour approximer la fonction de valeur d\'action Q∗(s,a).

#### Principe

Dans l\'architecture DQN, le réseau de neurones prend en entrée une représentation de l\'état s (par exemple, une pile de quelques images consécutives du jeu pour capturer le mouvement) et produit en sortie un vecteur de valeurs Q, une pour chaque action possible dans l\'espace d\'actions discret. L\'agent peut alors choisir l\'action avec la plus grande valeur Q estimée.

L\'apprentissage se fait en minimisant une fonction de perte (loss function) qui mesure l\'écart entre la prédiction du réseau et une cible, de la même manière que dans l\'apprentissage supervisé. La cible est dérivée de l\'équation de Bellman. Pour une transition (s,a,r,s′), la perte est typiquement l\'erreur quadratique moyenne entre la valeur Q prédite Q(s,a;θ) et la cible TD y:

y=r+γa′max​Q(s′,a′;θ)

\$\$ L(\\theta) = \\mathbb{E}{(s,a,r,s\') \\sim D} \\left\[ \\left( r + \\gamma \\max{a\'} Q(s\', a\'; \\theta) - Q(s, a; \\theta) \\right)\^2 \\right\] \$\$

Les poids θ du réseau sont alors mis à jour par descente de gradient stochastique pour minimiser cette perte.

#### Le Problème de l\'Instabilité

Cependant, la combinaison naïve du Q-Learning avec des réseaux de neurones non linéaires est notoirement instable. Deux problèmes majeurs apparaissent  :

> **Corrélation des échantillons** : Les expériences sont générées séquentiellement. Les échantillons consécutifs (st​,at​,rt+1​,st+1​) et (st+1​,at+1​,rt+2​,st+2​) sont fortement corrélés. L\'entraînement d\'un réseau de neurones sur des données aussi corrélées viole l\'hypothèse d\'indépendance des échantillons et peut conduire à un apprentissage inefficace et à des oscillations.
>
> **Cible mouvante (*Moving Target*)** : Dans l\'équation de perte, la cible y dépend elle-même des poids du réseau θ. À chaque mise à jour des poids, la cible change également. C\'est comme essayer d\'atteindre une cible qui bouge constamment, ce qui peut empêcher l\'algorithme de converger.

Pour résoudre ces problèmes d\'instabilité, l\'algorithme DQN original a introduit deux innovations clés qui sont devenues des standards dans le domaine du DRL basé sur la valeur.

#### Innovation Clé 1 : La Mémoire de Rejeu (Experience Replay)

Pour briser les corrélations dans la séquence d\'expériences, la **mémoire de rejeu** (*experience replay buffer*) est utilisée. Au lieu d\'entraîner le réseau sur la transition la plus récente, l\'agent stocke ses expériences --- les tuples (s,a,r,s′) --- dans une grande mémoire tampon de taille fixe.

Pendant la phase d\'apprentissage, au lieu d\'utiliser la dernière transition, l\'algorithme échantillonne un mini-batch de transitions de manière aléatoire à partir de cette mémoire. Ce mécanisme a deux avantages majeurs :

> Il **décorrèle les échantillons** utilisés pour l\'entraînement, ce qui stabilise l\'apprentissage et le rapproche des conditions de l\'apprentissage supervisé.
>
> Il **augmente l\'efficacité des données**, car chaque expérience peut être réutilisée plusieurs fois pour différentes mises à jour des poids, ce qui est particulièrement important lorsque l\'interaction avec l\'environnement est coûteuse.

#### Innovation Clé 2 : Le Réseau Cible (Target Network)

Pour résoudre le problème de la cible mouvante, le DQN utilise une deuxième architecture de réseau de neurones : le **réseau cible** (*target network*). Ce réseau, noté Q(s,a;θ−), est une copie du réseau principal (ou en ligne) Q(s,a;θ). Le réseau cible est utilisé pour calculer la valeur de l\'état suivant dans la cible TD, la rendant ainsi stable.

La fonction de perte devient alors :

\$\$ L(\\theta) = \\mathbb{E}{(s,a,r,s\') \\sim D} \\left\[ \\left( r + \\gamma \\max{a\'} Q(s\', a\'; \\theta\^-) - Q(s, a; \\theta) \\right)\^2 \\right\] \$\$

Les poids θ du réseau principal sont mis à jour par descente de gradient à chaque étape d\'apprentissage. Les poids θ− du réseau cible, en revanche, sont maintenus fixes. Ils ne sont mis à jour que périodiquement (par exemple, tous les C pas d\'entraînement) en copiant les poids du réseau principal : θ−←θ. Cette mise à jour périodique et moins fréquente garantit que la cible reste stable sur de courtes périodes, ce qui empêche les oscillations et stabilise considérablement l\'apprentissage.

#### Algorithme et Extensions

L\'algorithme DQN complet intègre ces deux mécanismes. Il alterne entre la collecte d\'expériences dans la mémoire de rejeu et l\'entraînement du réseau principal sur des mini-batchs, en utilisant le réseau cible pour générer les cibles de mise à jour.

Depuis l\'introduction du DQN, de nombreuses améliorations ont été proposées pour affiner ses performances. Parmi les plus importantes, on peut citer :

> **Double DQN** : Il s\'attaque au problème de la surestimation des valeurs Q, qui est une tendance des algorithmes de Q-Learning. Il découple la sélection de la meilleure action de l\'évaluation de sa valeur, en utilisant le réseau principal pour la sélection et le réseau cible pour l\'évaluation.
>
> **Dueling DQN** : Cette architecture de réseau sépare l\'estimation de la fonction de valeur d\'état V(s) et de la fonction d\'avantage A(s,a), puis les combine pour obtenir les valeurs Q. Cela permet un apprentissage plus efficace de la valeur des états.
>
> **Prioritized Experience Replay** : Au lieu d\'échantillonner les expériences de manière uniforme, cette technique donne la priorité aux transitions pour lesquelles l\'erreur TD est la plus grande, car ce sont celles dont l\'agent a le plus à apprendre.

### 45.4.2 Les Méthodes de Gradient de Politique (Policy Gradients)

Les DQN et leurs variantes appartiennent à la famille des méthodes basées sur la valeur. Une approche alternative et tout aussi puissante en DRL est celle des **méthodes de gradient de politique** (*policy gradient methods*). Au lieu d\'apprendre une fonction de valeur et d\'en dériver une politique implicite (en choisissant l\'action gloutonne), ces méthodes apprennent directement une politique paramétrée, π(a∣s;θ).

#### Principe et Avantages

La politique est représentée par un réseau de neurones qui prend un état s en entrée et produit en sortie une distribution de probabilité sur les actions. L\'objectif est de trouver les paramètres θ du réseau qui maximisent une fonction de performance, généralement le retour attendu J(θ)=Eτ∼πθ​​\[G0​\].

L\'apprentissage se fait par **montée de gradient** sur cette fonction de performance. On ajuste les paramètres θ dans la direction du gradient ∇θ​J(θ), qui indique comment modifier les poids pour augmenter le retour attendu.

Cette approche directe présente plusieurs avantages par rapport aux méthodes basées sur la valeur  :

> **Gestion des actions continues** : Elles peuvent naturellement gérer des espaces d\'actions continus, où le réseau peut produire directement les paramètres d\'une distribution continue (par exemple, la moyenne et l\'écart-type d\'une gaussienne).
>
> **Apprentissage de politiques stochastiques** : Elles apprennent explicitement des politiques stochastiques, ce qui peut être optimal dans certains environnements et aide à l\'exploration.
>
> **Meilleures propriétés de convergence** : Elles ont tendance à avoir de meilleures propriétés de convergence en pratique, avec des mises à jour plus douces.

#### Le Théorème du Gradient de Politique

La question clé est de savoir comment calculer le gradient de la performance ∇θ​J(θ) alors que la performance dépend à la fois des actions choisies par la politique et des dynamiques de l\'environnement. Le **théorème du gradient de politique** fournit une expression analytique de ce gradient qui ne dépend pas de la dérivée des dynamiques de l\'environnement (qui sont inconnues) :

\$\$\\nabla\_\\theta J(\\theta) = \\mathbb{E}\_{\\pi\_\\theta} \\left\$\$

Ce théorème est fondamental. Il nous dit que le gradient est l\'espérance d\'un produit de deux termes :

> ∇θ​logπθ​(At​∣St​) : Le \"score\". C\'est un vecteur qui indique dans quelle direction ajuster les paramètres θ pour augmenter la probabilité de l\'action At​ qui a été prise dans l\'état St​.
>
> Qπθ​(St​,At​) : La fonction de valeur d\'action. Ce terme pondère le score. Si l\'action At​ a mené à un bon résultat (valeur Q élevée), nous voulons augmenter sa probabilité. Si elle a mené à un mauvais résultat (valeur Q faible), nous voulons diminuer sa probabilité.

### 45.4.3 L\'Algorithme REINFORCE

L\'algorithme REINFORCE, également connu sous le nom de Monte Carlo Policy Gradient, est l\'implémentation la plus directe du théorème du gradient de politique.

#### Principe et Déroulement

REINFORCE utilise le retour complet d\'un épisode, Gt​=∑k=tT​γk−tRk+1​, comme une estimation non biaisée de Qπθ​(St​,At​). L\'algorithme fonctionne de la manière suivante :

> **Génération d\'une trajectoire** : L\'agent utilise sa politique actuelle πθ​ pour générer un épisode complet, en stockant la séquence d\'états, d\'actions et de récompenses.
>
> **Calcul des retours** : Une fois l\'épisode terminé, pour chaque pas de temps t de l\'épisode, l\'algorithme calcule le retour escompté Gt​.
>
> Mise à jour des poids : Les paramètres de la politique sont mis à jour par montée de gradient, en utilisant les retours calculés pour pondérer les scores. La règle de mise à jour pour un seul pas de temps est :\
> \
> θ←θ+αγtGt​∇θ​logπθ​(At​∣St​)

L\'intuition est simple : pour chaque action prise, si le retour qui a suivi était élevé, on ajuste les poids pour rendre cette action plus probable à l\'avenir dans cet état. Si le retour était faible, on la rend moins probable.

#### Pseudo-code de l\'algorithme

Voici le pseudo-code de l\'algorithme REINFORCE.

Algorithme : REINFORCE\
\
Initialiser les paramètres de la politique θ de manière aléatoire\
Paramètres : taux d\'apprentissage α, facteur d\'escompte γ\
\
Pour chaque épisode :\
Générer un épisode complet en suivant la politique π_θ :\
S_0, A_0, R_1, S_1, A_1, R_2,\..., S\_{T-1}, A\_{T-1}, R_T\
\
Pour t de T-1 à 0 :\
// Calculer le retour à partir de l\'instant t\
G ← Σ\_{k=t+1}\^{T} γ\^{k-t-1} R_k\
\
// Mettre à jour les paramètres de la politique\
θ ← θ + α \* γ\^t \* G \* ∇\_θ log(π_θ(A_t\|S_t))

#### Limites et Améliorations

La principale faiblesse de REINFORCE est la **variance élevée** de l\'estimation du gradient. Le retour Gt​ peut varier considérablement d\'un épisode à l\'autre, même avec des changements mineurs dans les actions, ce qui rend l\'apprentissage lent et instable.

Une technique courante pour réduire cette variance est d\'introduire une ligne de base (baseline), b(St​), qui est soustraite du retour. Le gradient devient :

\$\$\\nabla\_\\theta J(\\theta) = \\mathbb{E}\_{\\pi\_\\theta} \\left\$\$

Tant que la ligne de base ne dépend pas de l\'action At​, cette modification ne change pas l\'espérance du gradient (elle reste non biaisée) mais peut considérablement réduire sa variance. Un choix naturel pour la ligne de base est une estimation de la fonction de valeur d\'état, V(St​). Le terme (Gt​−V(St​)) est alors une estimation de l\'avantage A(St​,At​)=Q(St​,At​)−V(St​). Cette idée est au cœur des méthodes Acteur-Critique, qui apprennent simultanément une politique (l\'acteur) et une fonction de valeur (le critique) pour réduire la variance, menant à des algorithmes plus avancés comme A2C et PPO.86

### 45.4.4 Synthèse et Perspectives

L\'avènement de l\'apprentissage par renforcement profond a unifié deux domaines puissants de l\'intelligence artificielle : la théorie de la décision séquentielle de l\'AR et la capacité de représentation de l\'apprentissage profond. Cette convergence a permis de résoudre des problèmes d\'une échelle et d\'une complexité sans précédent.

Les deux familles d\'algorithmes présentées, basées sur la valeur (DQN) et sur la politique (gradients de politique), représentent des approches distinctes avec des compromis différents.

  ---------------------------- ------------------------------------------------------------------------------------------ -------------------------------------------------------------------------
  Critère                      DQN (Basé sur la valeur)                                                                   REINFORCE (Basé sur la politique)

  **Entité apprise**           Fonction de valeur d\'action Q(s,a;θ)                                                      Politique \$\\pi(a

  **Type d\'actions**          Discret                                                                                    Discret et Continu

  **Type de politique**        Implicite, quasi-déterministe (gloutonne)                                                  Explicite, stochastique

  **Stabilité / Variance**     Moins de variance grâce au bootstrapping, mais instable sans techniques de stabilisation   Variance élevée (MC), mais mises à jour plus stables

  **Efficacité des données**   Élevée (hors-politique, mémoire de rejeu)                                                  Faible (sur-politique, les trajectoires ne sont utilisées qu\'une fois)
  ---------------------------- ------------------------------------------------------------------------------------------ -------------------------------------------------------------------------

Le choix entre ces approches dépend du problème. Le DQN est souvent très efficace en termes de données pour les problèmes à actions discrètes grâce à sa nature hors-politique. Les méthodes de gradient de politique sont plus générales, s\'appliquant aux actions continues, et peuvent être plus stables dans certains cas, bien que moins efficaces en termes d\'échantillons.

Le futur du DRL réside probablement dans la combinaison des forces de ces deux mondes. Les algorithmes Acteur-Critique, tels que A2C/A3C et PPO, font exactement cela : ils utilisent une fonction de valeur (le critique) pour réduire la variance des mises à jour de la politique (l\'acteur), offrant un compromis robuste qui est à la base de nombreuses réussites récentes en DRL. Alors que le domaine continue d\'évoluer, les fondements établis dans ce chapitre --- des MDP aux DQN et aux gradients de politique --- restent les piliers sur lesquels reposent toutes les innovations futures.

