# Chapitre I.55 : Modèles Fondateurs et Ingénierie de l\'IA à Grande Échelle

## Introduction

L\'intelligence artificielle (IA) a connu une transformation paradigmatique au cours de la dernière décennie, s\'éloignant progressivement des modèles spécialisés, entraînés pour une unique tâche, vers une nouvelle ère dominée par les **modèles fondateurs** (*foundation models*). Ces systèmes d\'apprentissage automatique, pré-entraînés sur des ensembles de données vastes et diversifiés, constituent une base robuste et généraliste sur laquelle une multitude d\'applications spécifiques peuvent être construites. Plutôt que de développer des pipelines de données et des architectures distinctes pour chaque problème, l\'approche des modèles fondateurs propose une plateforme unifiée qui consolide les flux de travail, favorise des synergies inédites entre les sources de données et offre une flexibilité et une capacité d\'adaptation sans précédent. Cette transition ne représente pas seulement une évolution technique, mais une restructuration fondamentale de la manière dont nous concevons, construisons et déployons les systèmes d\'IA.

Le moteur principal de cette révolution est un concept unique et omniprésent : l\'**échelle** (*scale*). Les capacités remarquables des modèles fondateurs ne sont pas de simples améliorations incrémentielles par rapport à leurs prédécesseurs ; elles sont qualitativement différentes, émergeant directement de leur taille monumentale, qui se compte en centaines de milliards, voire en billions, de paramètres. Cette croissance exponentielle n\'est pas le fruit du hasard, mais le résultat de découvertes empiriques rigoureuses encapsulées dans les **lois d\'échelle** (*scaling laws*). Ces lois décrivent comment la performance d\'un modèle s\'améliore de manière prévisible avec l\'augmentation de trois facteurs clés : la taille du modèle, la taille de l\'ensemble de données et le budget de calcul alloué. L\'échelle n\'est donc plus une simple variable, mais la dimension centrale autour de laquelle s\'articule toute la recherche et l\'ingénierie des systèmes d\'IA modernes.

Cette quête incessante de l\'échelle a engendré une symbiose indissociable entre l\'architecture des modèles d\'IA et l\'ingénierie des systèmes sous-jacents. L\'ambition de construire des modèles toujours plus grands a poussé les limites de l\'informatique distribuée, catalysant des innovations radicales dans la manière de paralléliser les calculs et d\'optimiser l\'utilisation de la mémoire sur des milliers de processeurs. En retour, ces avancées en ingénierie des systèmes ont permis de franchir de nouveaux seuils d\'échelle, débloquant des capacités de modèle nouvelles et souvent surprenantes, dans un cycle vertueux d\'co-évolution. La conception d\'un modèle fondateur ne peut plus être dissociée des contraintes et des opportunités du système sur lequel il sera entraîné ; l\'architecture logicielle et l\'infrastructure matérielle sont désormais les deux faces d\'une même médaille.

Ce chapitre se propose d\'explorer en profondeur cette nouvelle ère, en analysant l\'interaction constante entre les modèles et les systèmes qui leur donnent vie. Notre analyse s\'articulera en trois parties distinctes mais interconnectées. Premièrement, dans la section **55.1**, nous examinerons les fondements théoriques et architecturaux des modèles fondateurs, en explorant les principes d\'apprentissage qui les régissent, les lois d\'échelle qui guident leur développement, et les comportements émergents qui en résultent. Deuxièmement, la section **55.2** plongera au cœur de la complexité systémique, en détaillant les défis monumentaux de l\'ingénierie des systèmes pour l\'entraînement distribué et les techniques de parallélisme et d\'optimisation qui permettent de les surmonter. Enfin, la section **55.3** se concentrera sur l\'étape finale du cycle de vie de ces modèles : leur adaptation et leur utilisation pratique, en étudiant les méthodes modernes d\'ajustement fin et les nouveaux paradigmes d\'interaction qu\'ils ont rendus possibles, tels que l\'apprentissage en contexte et l\'ingénierie de prompt.

## 55.1 L\'Ère des Modèles Fondateurs (Foundation Models)

La montée en puissance des modèles fondateurs marque un point d\'inflexion dans l\'histoire de l\'intelligence artificielle. Cette section a pour objectif d\'établir les piliers théoriques et architecturaux qui soutiennent cette nouvelle ère. Nous nous concentrerons sur les principes qui non seulement permettent, mais aussi émergent de l\'échelle massive à laquelle ces modèles sont construits. En disséquant l\'architecture Transformer, les mécanismes d\'apprentissage auto-supervisé, les lois prédictives de mise à l\'échelle et l\'avènement de la multimodalité, nous chercherons à comprendre le \"quoi\" et le \"pourquoi\" de cette révolution, préparant ainsi le terrain pour l\'analyse des défis d\'ingénierie qui en découlent.

### 55.1.1 Architectures Transformer à grande échelle et Apprentissage auto-supervisé

Au cœur de la révolution des modèles fondateurs se trouve une synergie puissante entre une architecture neuronale exceptionnellement scalable, le Transformer, et un paradigme d\'apprentissage qui libère le potentiel des données non étiquetées à l\'échelle du web, l\'apprentissage auto-supervisé. Ensemble, ils forment le socle sur lequel reposent les capacités des modèles de langage et multimodaux les plus avancés d\'aujourd\'hui.

#### Le Transformer comme architecture scalable

L\'introduction de l\'architecture Transformer par Vaswani et al. en 2017 a constitué une rupture fondamentale avec les architectures séquentielles dominantes de l\'époque, telles que les réseaux de neurones récurrents (RNNs) et leurs variantes comme le Long Short-Term Memory (LSTM). L\'avantage principal du Transformer, et la clé de sa domination à grande échelle, réside dans son abandon de la récurrence. Contrairement aux RNNs qui traitent les données de manière séquentielle, un jeton à la fois, le Transformer traite tous les jetons d\'une séquence simultanément. Cette caractéristique intrinsèque élimine le goulot d\'étranglement séquentiel et permet une parallélisation massive des calculs au sein d\'une seule étape d\'entraînement, une propriété essentielle pour exploiter efficacement les accélérateurs matériels modernes comme les GPUs.

L\'architecture d\'un Transformer est composée d\'une pile de blocs identiques. Chaque bloc contient deux composants principaux : un mécanisme d\'**attention multi-têtes** (*Multi-Head Self-Attention*) et un **réseau de neurones à propagation avant** (*position-wise Feed-Forward Network*), souvent un perceptron multicouche (MLP). Le rôle de l\'attention est de permettre à chaque jeton de la séquence d\'interagir avec tous les autres jetons et de pondérer leur importance relative, capturant ainsi des dépendances contextuelles à longue portée. Le MLP, quant à lui, applique une transformation non linéaire à la représentation de chaque jeton indépendamment, affinant et enrichissant cette représentation contextualisée.

Le mécanisme d\'attention, pierre angulaire du Transformer, est mathématiquement formulé comme une attention à produit scalaire pondéré (*scaled dot-product attention*). Pour chaque jeton, le modèle apprend trois vecteurs distincts : une **Requête** (*Query*, Q), une **Clé** (*Key*, K) et une **Valeur** (*Value*, V), qui sont des projections linéaires de l\'embedding d\'entrée du jeton. La compatibilité entre la Requête d\'un jeton et la Clé d\'un autre est calculée via un produit scalaire. Ces scores de compatibilité sont ensuite normalisés et passés à travers une fonction softmax pour obtenir des poids d\'attention, qui sont finalement utilisés pour calculer une somme pondérée des vecteurs Valeur de tous les jetons de la séquence. L\'équation est la suivante  :

Attention(Q,K,V)=softmax(dkQKT)V

où dk est la dimension des vecteurs Clé, utilisée comme facteur de normalisation pour stabiliser les gradients. Le mécanisme \"multi-têtes\" améliore ce processus en exécutant plusieurs calculs d\'attention en parallèle, chacun avec des projections Q, K, V différentes, permettant au modèle de se concentrer simultanément sur différents aspects de la relation entre les jetons.

La mise à l\'échelle de l\'architecture Transformer pour créer des modèles plus grands et plus puissants se fait principalement selon trois axes : l\'augmentation de la **profondeur** (le nombre de blocs Transformer empilés), l\'augmentation de la **largeur** (la dimension de l\'espace d\'embedding et des couches cachées, dmodel), et l\'augmentation du nombre de **têtes d\'attention**. Ces augmentations directes du nombre de paramètres accroissent la capacité du modèle à mémoriser et à généraliser à partir des motifs complexes présents dans les données d\'entraînement. C\'est cette capacité à s\'adapter à une augmentation massive du nombre de paramètres qui a directement conduit à la nécessité de disposer de plus de données et de plus de calcul, posant ainsi les bases des lois d\'échelle que nous aborderons plus loin.

#### L\'apprentissage auto-supervisé : Le moteur de l\'échelle

Si le Transformer fournit l\'architecture, l\'apprentissage auto-supervisé (SSL) fournit le carburant. Ce paradigme d\'apprentissage est ce qui a permis de tirer parti des vastes corpus de données textuelles non étiquetées disponibles sur Internet, comme le Common Crawl, qui contient des pétaoctets de texte. Le SSL contourne le besoin d\'une annotation humaine coûteuse et lente en créant des tâches de supervision, ou des \"pseudo-étiquettes\", directement à partir de la structure inhérente des données elles-mêmes. Dans le domaine du traitement du langage naturel, deux objectifs SSL principaux ont dominé le pré-entraînement des modèles fondateurs.

**Objectif d\'apprentissage autorégressif (Prédiction du prochain jeton)**

Popularisé par la série de modèles GPT (Generative Pre-trained Transformer) d\'OpenAI, l\'objectif autorégressif, ou prédiction du prochain jeton, est conceptuellement simple mais extrêmement puissant. Le modèle est entraîné à prédire le prochain jeton d\'une séquence, étant donné tous les jetons qui le précèdent. Formellement, il apprend à modéliser la probabilité conditionnelle

P(ti∣t1,\...,ti−1).

Pour ce faire, l\'architecture utilisée est un Transformer de type \"décodeur-seul\" (*decoder-only*). Dans cette configuration, le mécanisme d\'auto-attention est modifié par l\'application d\'un **masque causal**. Ce masque empêche chaque jeton de \"voir\" les jetons qui le suivent dans la séquence, garantissant que la prédiction pour une position donnée ne dépend que du contexte passé. Ce contexte unidirectionnel est intrinsèquement adapté aux tâches génératives, car il imite le processus de génération de texte de gauche à droite, un jeton à la fois. L\'entraînement de GPT-3 sur cet unique objectif à une échelle massive est ce qui lui a conféré ses capacités remarquables d\'apprentissage en quelques exemples (

*few-shot learning*), où le modèle peut effectuer de nouvelles tâches simplement en étant conditionné par quelques exemples dans son invite.

**Objectif d\'apprentissage auto-encodeur (Modélisation du langage masqué)**

Une approche alternative, introduite par le modèle BERT (Bidirectional Encoder Representations from Transformers) de Google, est la modélisation du langage masqué (MLM). Au lieu de prédire le jeton suivant, une fraction des jetons d\'entrée (typiquement 15%) est remplacée de manière aléatoire par un jeton spécial \`\`. L\'objectif du modèle est alors de prédire l\'identité originale de ces jetons masqués en se basant sur le contexte environnant.

Cette tâche nécessite une architecture de type \"encodeur-seul\" (*encoder-only*), où le mécanisme d\'auto-attention n\'est pas masqué. Chaque jeton peut donc assister à tous les autres jetons de la séquence, à la fois à gauche et à droite. Cette capacité à utiliser un **contexte bidirectionnel** profond permet au modèle de construire des représentations sémantiques beaucoup plus riches et nuancées. Les modèles pré-entraînés avec MLM excellent dans les tâches de compréhension du langage naturel (NLU), telles que la classification de texte, la reconnaissance d\'entités nommées ou l\'inférence en langage naturel, où une compréhension holistique de la phrase entière est cruciale. Le pré-entraînement original de BERT incluait également une tâche de prédiction de la phrase suivante (NSP) pour apprendre les relations entre les phrases, bien que des modèles ultérieurs comme RoBERTa aient démontré que cette tâche n\'était pas toujours nécessaire et pouvait même parfois nuire à la performance.

Le choix entre ces deux objectifs d\'apprentissage n\'est pas anodin ; il dicte fondamentalement l\'architecture du modèle, ses forces et ses faiblesses, et les types de tâches pour lesquelles il sera le plus performant. Le tableau suivant résume les distinctions clés entre ces deux paradigmes dominants.

**Tableau 55.1 : Comparaison des Objectifs d\'Apprentissage Auto-Supervisé**

---

  Caractéristique               Modèles Autoregressifs (type GPT)                      Modèles Auto-Encodeurs (type BERT)

  **Objectif Principal**        Prédiction du prochain jeton (Next-Token Prediction)   Prédiction de jetons masqués (Masked Language Modeling)

  **Directionnalité**           Unidirectionnel (causal)                               Bidirectionnel (non-causal)

  **Architecture Typique**      Décodeur-Transformer seulement                         Encodeur-Transformer seulement

  **Exemples**                  GPT-3, LLaMA, PaLM                                     BERT, RoBERTa, ALBERT

  **Forces Principales**        Tâches génératives, apprentissage \"few-shot\"         Tâches de compréhension (NLU), classification, extraction

  **Utilisation du Contexte**   Conditionné sur le passé uniquement                    Conditionné sur le contexte passé et futur

---

### 55.1.2 Lois d\'échelle (Scaling Laws) et Comportements Émergents

L\'investissement colossal en ressources de calcul et en données nécessaire pour entraîner les modèles fondateurs n\'est pas un pari aveugle. Il est guidé par un ensemble de principes empiriques remarquablement robustes connus sous le nom de lois d\'échelle. Ces lois ont transformé le développement de grands modèles d\'une discipline artisanale en une science plus prédictive. Parallèlement, l\'augmentation massive de l\'échelle a révélé un phénomène fascinant et encore mal compris : l\'émergence de capacités entièrement nouvelles, qui ne semblent pas être de simples extrapolations des performances des modèles plus petits.

#### Les lois d\'échelle : La physique des grands modèles

Les lois d\'échelle décrivent la relation quantitative et prévisible entre la performance d\'un modèle de langage et les ressources allouées à son entraînement. Plus précisément, elles établissent qu\'en augmentant la taille du modèle (le nombre de paramètres, N), la taille de l\'ensemble de données (le nombre de jetons, D), et le budget de calcul (le nombre d\'opérations en virgule flottante, C), la perte du modèle (généralement la perte de log-perplexité ou d\'entropie croisée) diminue de manière lisse et prévisible, suivant une loi de puissance.

**La perspective d\'OpenAI (Kaplan et al., 2020)**

Les premières formulations systématiques de ces lois proviennent d\'un article fondateur d\'OpenAI en 2020, \"Scaling Laws for Neural Language Models\". Les chercheurs y ont démontré que la performance d\'un modèle Transformer autorégressif s\'améliorait comme une loi de puissance en fonction de

N, D, et C. Leur conclusion la plus influente à l\'époque était que, pour un budget de calcul donné, la taille du modèle (N) était le facteur le plus déterminant. Ils ont observé qu\'il était plus efficace d\'allouer les ressources à l\'augmentation du nombre de paramètres plutôt qu\'à l\'acquisition de données supplémentaires ou à un entraînement plus long. Cette découverte a directement motivé la tendance à construire des modèles de plus en plus grands, comme GPT-3, en partant du principe que la taille était le levier le plus puissant pour améliorer la performance. La perte

L(N,D,C) pouvait être prédite avec une précision surprenante, même pour des modèles plusieurs ordres de grandeur plus grands que ceux sur lesquels les lois avaient été initialement mesurées.

**La perspective de DeepMind (Chinchilla, 2022)**

En 2022, des chercheurs de DeepMind ont publié un article intitulé \"Training Compute-Optimal Large Language Models\", qui a introduit un raffinement crucial à ces lois d\'échelle, incarné par le modèle \"Chinchilla\". En réexaminant la relation entre la taille du modèle et la taille des données, ils sont arrivés à une conclusion différente de celle d\'OpenAI. Leur analyse a révélé que pour un budget de calcul optimal, la taille du modèle et la taille de l\'ensemble de données devraient être augmentées de manière proportionnelle. Plus précisément, ils ont établi qu\'un modèle entraîné de manière optimale nécessitait environ 20 jetons de données d\'entraînement pour chaque paramètre du modèle.

Cette découverte a eu des conséquences profondes. Elle suggérait que de nombreux grands modèles existants, y compris GPT-3, étaient en fait \"sous-entraînés\" : ils étaient trop grands pour la quantité de données sur laquelle ils avaient été entraînés. Le modèle Chinchilla de DeepMind, avec \"seulement\" 70 milliards de paramètres mais entraîné sur 1,4 trillion de jetons, a surpassé des modèles beaucoup plus grands comme GPT-3 (175B paramètres) sur une large gamme de tâches. Cette nouvelle perspective a réorienté l\'effort de la communauté non seulement vers la construction de modèles plus grands, mais aussi vers le défi monumental de la collecte, du nettoyage et du traitement de corpus de données à l\'échelle du pétaoctet.

**Implications pratiques**

L\'impact le plus significatif des lois d\'échelle est leur pouvoir prédictif. Elles agissent comme un \"outil de guidage\" ou un \"outil d\'investissement\" pour les laboratoires de recherche et les entreprises. Avant d\'engager des millions de dollars et des mois de calcul sur des milliers de GPUs, il est possible de mener des expériences à plus petite échelle, de mesurer la pente de la courbe de la loi de puissance, et d\'extrapoler avec une confiance raisonnable la performance qu\'atteindra le modèle final à grande échelle. Cette capacité à prédire le retour sur investissement en calcul a transformé le développement des grands modèles, le faisant passer d\'une exploration heuristique à une ingénierie plus systématique et justifiant les investissements massifs dans les infrastructures de calcul.

#### Les capacités émergentes : La magie de l\'échelle

Si les lois d\'échelle décrivent une amélioration quantitative et prévisible, l\'un des aspects les plus surprenants de la mise à l\'échelle est l\'apparition de **capacités émergentes**. Une capacité est dite émergente si elle n\'est pas observée dans les modèles de plus petite taille mais apparaît, souvent de manière abrupte, une fois que l\'échelle du modèle dépasse un certain seuil critique. Il ne s\'agit pas d\'une simple amélioration linéaire, mais d\'un changement qualitatif dans le comportement du système, où le modèle devient capable d\'accomplir des tâches pour lesquelles il n\'a pas été explicitement entraîné.

Plusieurs exemples frappants de capacités émergentes ont été documentés :

> **Raisonnement arithmétique** : Les modèles de petite taille sont incapables d\'effectuer des additions ou des multiplications à plusieurs chiffres. Cependant, à l\'échelle de modèles comme PaLM (540 milliards de paramètres), cette capacité apparaît et le modèle peut résoudre de tels problèmes avec une précision croissante.
>
> **Suivi d\'instructions complexes** : La capacité à comprendre et à exécuter des instructions complexes et nuancées en mode \"zéro-shot\" (sans aucun exemple) s\'améliore de façon spectaculaire avec l\'échelle. Les petits modèles peuvent suivre des instructions simples, mais les grands modèles peuvent interpréter des requêtes beaucoup plus abstraites et multi-facettes.
>
> **Raisonnement en chaîne de pensée (Chain-of-Thought)** : C\'est peut-être l\'exemple le plus célèbre. Les modèles de plus de 100 milliards de paramètres acquièrent la capacité d\'effectuer un raisonnement en plusieurs étapes s\'ils sont simplement incités à le faire avec une instruction comme \"Pensons étape par étape\". Cette capacité est pratiquement absente dans les modèles plus petits, mais elle émerge et permet de résoudre des problèmes de logique, de mathématiques et de bon sens qui étaient auparavant hors de portée.

La nature exacte de ces émergences fait l\'objet d\'un débat actif. Certains chercheurs suggèrent que l\'apparition soudaine de ces capacités pourrait être un \"mirage\" ou un artefact des métriques utilisées pour les évaluer. Une performance qui semble passer de zéro à une valeur significative pourrait en réalité être une augmentation continue et lisse qui ne devient détectable qu\'une fois qu\'elle franchit le seuil de la performance aléatoire sur une métrique non linéaire. D\'autres recherches explorent des lois d\'échelle plus complexes, dites \"brisées\" (

*broken neural scaling laws*), qui tentent de modéliser ces transitions de phase plus abruptes. Quoi qu\'il en soit, le phénomène est réel : l\'augmentation quantitative de l\'échelle conduit à des sauts qualitatifs dans les capacités, bien que le moment précis et la nature de ces sauts restent largement imprévisibles. C\'est l\'un des domaines de recherche les plus actifs et les plus fondamentaux dans la science des grands modèles de langage.

### 55.1.3 Modèles Multimodaux (Vision, Langage, Audio, Action)

Alors que les premiers modèles fondateurs se concentraient presque exclusivement sur le domaine du texte, la frontière de la recherche s\'est rapidement déplacée vers l\'intégration de multiples modalités de données. Cette transition des modèles unimodaux vers des modèles multimodaux, capables de traiter et de générer simultanément du texte, des images, du son et même des actions, représente une étape cruciale vers une IA plus holistique et plus proche de la perception humaine. L\'être humain perçoit le monde en intégrant les informations provenant de la vue, de l\'ouïe et du langage ; de même, les modèles multimodaux visent à construire une compréhension unifiée et cohérente en fusionnant ces divers flux de données.

Cette évolution ne se contente pas d\'ajouter de nouvelles fonctionnalités d\'entrée/sortie à des systèmes existants. Elle force les modèles à développer des représentations internes plus abstraites et robustes. Un modèle purement textuel apprend le concept de \"chat\" à travers ses cooccurrences statistiques avec des mots comme \"félin\", \"miauler\" ou \"ronronner\". Sa compréhension reste confinée au domaine symbolique du langage. En revanche, un modèle multimodal apprend ce même concept en corrélant le jeton \"chat\" avec des millions d\'images de chats, le son d\'un miaulement et des vidéos de chats en mouvement. Ce processus, connu sous le nom d\'**ancrage** (*grounding*), oblige le modèle à former une représentation latente du \"chat\" qui est plus générale et moins dépendante de la forme de surface d\'une seule modalité. En triangulant les concepts à travers différents types de données sensorielles, le modèle est contraint de construire un \"modèle du monde\" interne plus riche, ce qui améliore potentiellement son raisonnement de bon sens et réduit sa propension aux \"hallucinations\" en ancrant ses connaissances dans une réalité simulée.

#### Architectures pour la multimodalité

La conception d\'un modèle multimodal à grande échelle, en particulier un modèle vision-langage (VLM), repose généralement sur la combinaison et l\'alignement de deux composants principaux, chacun spécialisé dans le traitement d\'une modalité.

> **L\'encodeur de vision** : Ce module est responsable du traitement de l\'entrée visuelle (image ou vidéo). Les premières approches utilisaient des réseaux de neurones convolutifs (CNN) pour extraire des caractéristiques visuelles. Cependant, pour s\'aligner sur l\'architecture dominante et bénéficier de sa scalabilité, les modèles modernes utilisent massivement le
> **Vision Transformer (ViT)**. Un ViT divise une image en une grille de patchs de taille fixe, traite chaque patch comme un \"jeton\" et les alimente dans une architecture Transformer standard. Cette approche unifie le traitement des images et du texte sous le même paradigme architectural, facilitant grandement leur intégration.
>
> **L\'encodeur de langage** : Ce composant est typiquement un grand modèle de langage (LLM) pré-entraîné, basé sur une architecture Transformer (par exemple, de type GPT ou T5). Il est chargé de traiter l\'entrée textuelle et de générer la sortie textuelle.

Le défi central de l\'architecture multimodale réside dans la **fusion** et l\'**alignement** des représentations issues de ces deux encodeurs. Plusieurs techniques ont été développées pour créer un espace sémantique partagé où les concepts visuels et textuels peuvent interagir :

> **Projection et fusion par attention croisée** : Les vecteurs de caractéristiques (embeddings) issus de l\'encodeur de vision et de l\'encodeur de langage sont projetés dans un espace de même dimension. Une méthode de fusion sophistiquée consiste à utiliser des mécanismes d\'**attention croisée** (*cross-attention*). Par exemple, les embeddings des patchs d\'image peuvent servir de Clés et de Valeurs pour l\'encodeur de langage, dont les jetons de texte fournissent les Requêtes. Cela permet au modèle de \"regarder\" sélectivement les parties pertinentes de l\'image tout en traitant le texte, créant ainsi un lien direct entre les mots et les pixels.
>
> **Apprentissage contrastif** : Une avancée majeure dans ce domaine a été l\'introduction de méthodes comme CLIP (Contrastive Language-Image Pre-training) par OpenAI. CLIP est pré-entraîné sur un immense ensemble de données de paires (image, légende) collectées sur le web. L\'objectif est d\'apprendre un espace d\'embedding commun où le produit scalaire (similarité cosinus) entre l\'embedding d\'une image et l\'embedding de sa légende correcte est maximisé, tandis que celui entre des paires incorrectes est minimisé. Ce simple objectif d\'apprentissage contrastif permet au modèle d\'acquérir une capacité de compréhension visuelle \"zéro-shot\" extraordinairement puissante. On peut lui fournir une image et une série de descriptions textuelles, et il peut déterminer quelle description correspond le mieux à l\'image, sans jamais avoir été explicitement entraîné pour cette tâche de classification spécifique.

#### Capacités et applications

L\'intégration réussie de la vision et du langage a débloqué une nouvelle gamme de capacités et d\'applications qui étaient auparavant difficiles, voire impossibles, à réaliser avec des modèles unimodaux :

> **Réponse à des questions visuelles (Visual Question Answering - VQA)** : Le modèle répond à des questions posées en langage naturel à propos du contenu d\'une image.
>
> **Génération de légendes d\'images (Image Captioning)** : Le modèle génère une description textuelle détaillée et contextuellement pertinente d\'une image.
>
> **Génération d\'images à partir de texte (Text-to-Image)** : Des modèles comme DALL-E, Midjourney et Stable Diffusion peuvent synthétiser des images photoréalistes ou artistiques à partir d\'une simple description textuelle.
>
> **Raisonnement visuel en langage naturel** : Le modèle peut effectuer des tâches de raisonnement complexes qui nécessitent une compréhension conjointe de la sémantique textuelle et des relations spatiales ou logiques dans une image.
>
> **Applications inter-domaines** : Ces modèles sont au cœur des systèmes autonomes, comme les véhicules, où les données visuelles des caméras et des capteurs LiDAR sont fusionnées avec des informations textuelles et contextuelles pour la navigation et la prise de décision.

Les modèles les plus récents, tels que la série Gemini de Google, sont conçus pour être **nativement multimodaux**. Plutôt que de simplement connecter deux encodeurs pré-entraînés séparément, ces modèles sont entraînés dès le départ sur un mélange de données multimodales (texte, images, audio, vidéo), leur permettant de développer une compréhension plus profonde et plus intégrée des relations inter-modales. Cette approche représente la prochaine étape dans la construction de modèles fondateurs, se rapprochant encore plus d\'une intelligence artificielle générale et polyvalente.

## 55.2 Ingénierie des Systèmes pour l\'Entraînement Distribué (MLOps à grande échelle)

La transition des concepts théoriques des modèles fondateurs à leur réalisation pratique est un saut monumental qui nous fait passer du domaine de l\'apprentissage automatique à celui de l\'ingénierie des systèmes à très grande échelle. L\'échelle même qui confère à ces modèles leurs capacités extraordinaires impose des contraintes qui dépassent de loin les capacités d\'un seul ordinateur, aussi puissant soit-il. Cette section plonge au cœur du \"comment\" : les défis d\'ingénierie extrêmes posés par l\'entraînement de modèles de plusieurs milliards de paramètres et les solutions innovantes développées pour les surmonter.

### Introduction : Le mur de la mémoire

Le principal obstacle à l\'entraînement de modèles fondateurs est ce que l\'on peut appeler le \"mur de la mémoire\". Un modèle de la taille de GPT-3, avec ses 175 milliards de paramètres, illustre parfaitement ce défi. Si chaque paramètre est stocké en précision mixte 16 bits (FP16), ce qui est une pratique courante, le stockage des seuls poids du modèle nécessite 175×109×2 octets, soit 350 Go de mémoire. Cette taille dépasse déjà largement la mémoire vive (VRAM) des accélérateurs GPU les plus performants, comme le NVIDIA A100 qui dispose de 80 Go.

Cependant, l\'empreinte mémoire totale de l\'entraînement est bien plus importante. Elle inclut non seulement les **paramètres du modèle**, mais aussi :

> Les **gradients**, qui ont la même taille que les paramètres et sont nécessaires pour la rétropropagation.
>
> Les **états de l\'optimiseur**, qui peuvent être encore plus volumineux. L\'optimiseur Adam, couramment utilisé, stocke deux moments (la moyenne et la variance des gradients passés) pour chaque paramètre, ce qui double la mémoire requise par rapport aux paramètres seuls.
>
> Les **activations**, qui sont les sorties intermédiaires des couches du réseau, stockées pendant la passe avant pour être réutilisées pendant la passe arrière. Leur taille peut être considérable, surtout avec de grandes tailles de lot et de longues séquences.

Au total, l\'entraînement d\'un grand modèle peut facilement nécessiter plus de 16 octets de mémoire par paramètre. Pour un modèle de 175 milliards de paramètres, cela représente près de 3 téraoctets de VRAM. Il devient donc impératif de distribuer non seulement le calcul, mais aussi la charge de mémoire, sur un vaste cluster de centaines, voire de milliers de GPUs. C\'est là qu\'interviennent les différentes stratégies de parallélisme.

### 55.2.1 Parallélisme de données, de modèles, de pipeline et tensoriel

Pour surmonter le mur de la mémoire et accélérer le temps d\'entraînement, qui peut se mesurer en mois, les ingénieurs ont développé un arsenal de techniques de parallélisme. Ces stratégies peuvent être considérées comme des moyens de découper le problème d\'entraînement selon différentes dimensions : les données, les couches du modèle ou même les opérations mathématiques individuelles.

#### Parallélisme de données (Data Parallelism - DP)

Le parallélisme de données est la stratégie de distribution la plus fondamentale et la plus intuitive. Son principe est simple :

> Une copie complète du modèle est chargée sur chaque GPU participant.
>
> Le lot de données global (*global batch*) est divisé en plusieurs micro-lots (*micro-batches*).
>
> Chaque GPU traite son propre micro-lot en parallèle, effectuant une passe avant et une passe arrière pour calculer les gradients locaux.
>
> Avant la mise à jour des poids, les gradients calculés sur chaque GPU doivent être synchronisés. Cette étape est cruciale et est généralement réalisée à l\'aide d\'une opération de communication collective appelée All-Reduce. Cette opération calcule la moyenne des gradients de tous les GPUs et distribue le résultat à chacun d\'eux, garantissant que toutes les copies du modèle restent parfaitement synchronisées.

Le principal avantage du DP est son efficacité pour accélérer le débit de l\'entraînement. Si vous avez N GPUs, vous pouvez théoriquement traiter N fois plus de données dans le même laps de temps. Cependant, le DP a une limitation fondamentale : il ne résout pas le problème de la mémoire du modèle. Chaque GPU doit encore être capable de contenir une copie complète du modèle, de ses gradients et des états de son optimiseur. Par conséquent, le parallélisme de données seul est insuffisant pour les modèles qui dépassent la mémoire d\'un seul GPU. C\'est la principale motivation pour le parallélisme de modèle.

#### Parallélisme de modèle (Model Parallelism - MP)

Le parallélisme de modèle est une approche générale qui consiste à partitionner le modèle lui-même sur plusieurs GPUs, de sorte que chaque GPU ne détient qu\'une partie du modèle. Cela permet d\'entraîner des modèles dont la taille totale dépasse de loin la mémoire d\'un seul dispositif. Il existe deux manières principales de partitionner un modèle : verticalement, à travers les couches (parallélisme de pipeline), et horizontalement, au sein même des couches (parallélisme tensoriel).

#### Parallélisme de pipeline (Pipeline Parallelism - PP)

Le parallélisme de pipeline découpe le modèle \"verticalement\", en assignant des groupes de couches consécutives à différents GPUs, qui forment les \"étages\" (*stages*) d\'un pipeline. Par exemple, dans un modèle de 48 couches réparti sur 4 GPUs, le GPU 0 pourrait contenir les couches 1 à 12, le GPU 1 les couches 13 à 24, et ainsi de suite.

Une implémentation naïve de cette approche serait très inefficace. Le GPU 1 devrait attendre que le GPU 0 ait terminé sa passe avant sur tout le lot de données avant de pouvoir commencer son propre travail, créant des périodes d\'inactivité importantes, connues sous le nom de \"bulles de pipeline\" (*pipeline bubbles*).

La solution pour minimiser ces bulles est le **micro-batching**. Le lot de données est divisé en plusieurs micro-lots plus petits. Dès que le GPU 0 a terminé la passe avant pour le premier micro-lot, il transmet les activations résultantes au GPU 1 et commence immédiatement à travailler sur le deuxième micro-lot. Le GPU 1 fait de même avec le GPU 2, et ainsi de suite. Cela crée un effet de \"chaîne de montage\" où, après une phase de démarrage (*ramp-up*), tous les GPUs travaillent en parallèle sur différents micro-lots. Pendant la phase de régime permanent, certains GPUs effectuent des passes avant tandis que d\'autres effectuent des passes arrière, maximisant ainsi l\'utilisation du matériel. Des ordonnancements sophistiqués, comme le \"1F1B\" (one forward, one backward), ont été développés pour optimiser ce flux. Des frameworks comme DeepSpeed et le package

pipelining de PyTorch fournissent des implémentations robustes qui gèrent automatiquement cette complexité d\'ordonnancement et de communication.

#### Parallélisme tensoriel (Tensor Parallelism - TP)

Le parallélisme tensoriel est une forme plus fine de parallélisme de modèle qui partitionne \"horizontalement\" les matrices de poids *à l\'intérieur même* d\'une couche sur plusieurs GPUs. Cette technique est indispensable lorsque même une seule couche du modèle, comme une grande couche MLP ou une couche d\'attention, est trop volumineuse pour tenir dans la mémoire d\'un seul GPU.

Le mécanisme de partitionnement des opérations matricielles est subtil et élégant, comme l\'a popularisé le framework Megatron-LM. Prenons l\'exemple d\'un bloc MLP de Transformer, dont l\'équation est

Y=GeLU(XA)B. Le calcul est parallélisé comme suit :

> La première matrice de poids A est partitionnée en **colonnes**. Chaque GPU détient une tranche de colonnes Ai. Le produit matriciel XAi est calculé en parallèle sur chaque GPU. L\'entrée X est dupliquée sur chaque GPU.
>
> La fonction d\'activation GeLU est appliquée localement sur chaque GPU au résultat partiel XAi. Aucune communication n\'est nécessaire à ce stade.
>
> La deuxième matrice de poids B est partitionnée en **lignes**. Chaque GPU détient une tranche de lignes Bi. Le produit matriciel (GeLU(XAi))Bi est calculé localement.
>
> Les résultats partiels de chaque GPU sont ensuite sommés à l\'aide d\'une opération All-Reduce pour obtenir le résultat final correct Y.

Cette stratégie astucieuse de partitionnement \"colonne puis ligne\" ne nécessite que deux opérations de communication collective par bloc Transformer (une pour la passe avant et une pour la passe arrière), ce qui la rend très efficace. Un principe similaire est appliqué aux couches d\'attention, où les différentes têtes d\'attention peuvent être naturellement réparties entre les GPUs. Le parallélisme tensoriel est très intensif en communication et dépend fortement d\'interconnexions à très haute vitesse et faible latence entre les GPUs, comme NVLink de NVIDIA, ce qui le rend idéal pour une utilisation au sein d\'un même nœud de calcul.

#### Parallélisme hybride (3D)

En pratique, l\'entraînement des plus grands modèles ne repose pas sur une seule de ces stratégies, mais sur une combinaison hybride, souvent appelée **parallélisme 3D**. La configuration typique d\'un grand cluster de calcul est la suivante :

> **Parallélisme tensoriel (TP)** est utilisé *à l\'intérieur* de chaque nœud de calcul pour répartir les couches massives sur les GPUs connectés par des liaisons très rapides (ex: NVLink).
>
> **Parallélisme de pipeline (PP)** est utilisé *entre* les nœuds de calcul pour répartir les couches du modèle sur le réseau, qui a une bande passante plus faible.
>
> **Parallélisme de données (DP)** est utilisé sur l\'ensemble du cluster. Chaque pipeline complet est une réplique pour le parallélisme de données, ce qui permet d\'augmenter la taille totale du lot et d\'accélérer la convergence.

Le nombre total de GPUs est alors le produit des degrés de chaque parallélisme : Ntotal=NTP×NPP×NDP. La gestion de cette complexité est l\'un des plus grands défis du MLOps à grande échelle.

Le tableau suivant offre une analyse comparative des différentes stratégies de parallélisme, mettant en évidence leurs mécanismes, leurs avantages et leurs contraintes.

**Tableau 55.2 : Analyse des Stratégies de Parallélisme pour l\'Entraînement Distribué**

---

  Stratégie                           Mécanisme Principal                                              Réduction Mémoire (Modèle)                          Goulot d\'Étranglement Principal               Idéal Pour

  **Parallélisme de Données (DP)**    Réplication du modèle, partitionnement des données               Nulle (chaque GPU a une copie complète)             Communication (All-Reduce des gradients)       Accélérer le débit quand le modèle tient sur un GPU

  **Parallélisme de Pipeline (PP)**   Partitionnement des couches du modèle                            Linéaire avec le nombre de stages                   Latence (\"bulles\" de pipeline)               Modèles très profonds, communication inter-nœuds

  **Parallélisme Tensoriel (TP)**     Partitionnement des tenseurs (poids) au sein des couches         Linéaire avec le nombre de GPUs                     Bande passante de l\'interconnexion (NVLink)   Modèles très larges (couches massives), communication intra-nœud

  **ZeRO-DP (Stade 3)**               Partitionnement des poids, gradients et états de l\'optimiseur   Linéaire avec le degré de parallélisme de données   Communication (All-Gather avant calcul)        Maximiser l\'efficacité mémoire du parallélisme de données

---

### 55.2.2 Optimisation de la mémoire et du calcul

Au-delà du parallélisme, un ensemble de techniques d\'optimisation plus fines est nécessaire pour repousser encore plus loin les limites de l\'échelle. Ces techniques visent à réduire l\'empreinte mémoire de chaque composant de l\'entraînement et à rendre les calculs eux-mêmes plus efficaces. Ces optimisations sont souvent orthogonales aux stratégies de parallélisme et peuvent être combinées avec elles pour un effet maximal. L\'évolution de ces techniques a transformé la nature même du goulot d\'étranglement des systèmes : nous sommes passés d\'un monde où la contrainte principale était la *capacité* de la mémoire (la taille totale disponible) à un monde où la *bande passante* de la mémoire et la communication deviennent les facteurs limitants.

#### Optimisation de la mémoire : ZeRO (Zero Redundancy Optimizer)

L\'Optimiseur à Redondance Nulle (ZeRO), développé par Microsoft, est une famille d\'optimisations révolutionnaires qui s\'attaquent directement à l\'inefficacité mémoire du parallélisme de données standard. L\'idée centrale de ZeRO est d\'éliminer la réplication redondante des états de l\'entraînement (paramètres, gradients, états de l\'optimiseur) sur les GPUs participant au parallélisme de données. ZeRO se décline en trois étapes progressives, chacune offrant des gains de mémoire supplémentaires  :

> **ZeRO - Stade 1** : Ce premier stade partitionne uniquement les **états de l\'optimiseur**. Chaque GPU ne conserve qu\'une fraction des états de l\'optimiseur (par exemple, les moments Adam). Les paramètres du modèle et les gradients sont toujours répliqués sur chaque GPU. Après la passe arrière, les gradients sont moyennés via un All-Reduce classique, mais chaque GPU ne met à jour que la partition des paramètres correspondant aux états de l\'optimiseur qu\'il détient. Cela permet une réduction de mémoire d\'environ 4 fois pour un entraînement avec l\'optimiseur Adam.
>
> **ZeRO - Stade 2** : Le deuxième stade va plus loin en partitionnant également les **gradients**. Après la passe arrière, au lieu d\'une opération All-Reduce qui laisse une copie complète des gradients moyennés sur chaque GPU, une opération Reduce-Scatter est utilisée. Cette opération calcule la moyenne et distribue immédiatement les partitions du gradient moyenné aux GPUs respectifs. Chaque GPU ne stocke donc qu\'une fraction des gradients. Cela permet d\'atteindre une réduction de mémoire d\'environ 8 fois par rapport au parallélisme de données standard.
>
> **ZeRO - Stade 3** : C\'est le stade le plus avancé et le plus puissant. Il partitionne **tous les états de l\'entraînement : les états de l\'optimiseur, les gradients, et même les paramètres du modèle eux-mêmes**. À tout moment, chaque GPU ne détient de manière persistante qu\'une tranche des paramètres du modèle. Juste avant l\'exécution d\'une passe avant (ou arrière) pour une couche donnée, les paramètres complets de cette couche sont reconstitués à la volée sur chaque GPU via une opération de communication All-Gather. Immédiatement après le calcul, les paramètres qui ne sont pas la propriété du GPU sont libérés de la mémoire. Cette approche offre une réduction de mémoire qui est linéaire avec le degré de parallélisme de données. Avec ZeRO-Stade 3, un groupe de N GPUs en parallélisme de données peut collectivement entraîner un modèle N fois plus grand que ce qui tiendrait sur un seul GPU, transformant ainsi la mémoire agrégée du cluster en une ressource unifiée. Cette technique a été fondamentale pour permettre l\'entraînement de modèles de plus de 100 milliards de paramètres sur des clusters de taille modérée.

#### Calcul efficace (Efficient Computation)

En parallèle de la réduction de l\'empreinte mémoire, des techniques sont employées pour rendre les opérations mathématiques elles-mêmes plus rapides et moins coûteuses.

**Quantification**

La quantification est le processus de réduction de la précision numérique utilisée pour représenter les poids et/ou les activations du modèle. La plupart des modèles sont entraînés en utilisant des nombres à virgule flottante de 32 bits (FP32) ou de 16 bits (FP16/BF16). La quantification les convertit en formats de plus faible précision, comme des entiers de 8 bits (INT8) ou même de 4 bits.

Les avantages sont multiples :

> **Réduction de la mémoire** : Les poids du modèle occupent 2 à 4 fois moins d\'espace.
>
> **Calcul plus rapide** : Les opérations sur des entiers sont beaucoup plus rapides sur le matériel qui les supporte nativement.
>
> **Efficacité énergétique** : Moins de bits à déplacer et à calculer signifie une consommation d\'énergie réduite, ce qui est crucial pour le déploiement sur des appareils à ressources limitées.

Il existe principalement deux approches de la quantification :

> **Quantification post-entraînement (PTQ)** : Une méthode simple où un modèle déjà entraîné est converti en une précision inférieure. C\'est rapide et ne nécessite pas de données d\'entraînement supplémentaires, mais peut entraîner une perte de précision notable.
>
> **Entraînement conscient de la quantification (QAT)** : Le modèle est ré-entraîné ou ajusté finement tout en simulant l\'effet de la quantification pendant le processus. Cela permet au modèle de s\'adapter à la perte de précision, ce qui se traduit généralement par une meilleure performance finale au détriment d\'une complexité de mise en œuvre accrue.

**Sparsité**

La sparsité fait référence à la propriété d\'un modèle d\'avoir une grande proportion de poids nuls ou proches de zéro. Les grands modèles de langage sont souvent massivement sur-paramétrés, ce qui signifie qu\'une grande partie de leurs poids sont redondants et peuvent être supprimés sans impacter significativement la performance. La technique pour introduire de la sparsité est appelée

**élagage** (*pruning*).

On distingue plusieurs types de sparsité :

> **Sparsité non structurée** : Des poids individuels sont mis à zéro en fonction d\'un critère, comme leur faible magnitude. Cette méthode peut atteindre des niveaux de sparsité très élevés (par exemple, 90% des poids supprimés), mais elle est difficile à accélérer sur les architectures matérielles actuelles (comme les GPUs), qui sont optimisées pour des opérations sur des matrices denses. Les accès mémoire deviennent irréguliers, ce qui annule les gains potentiels du calcul réduit.
>
> **Sparsité structurée** : Des groupes entiers de poids sont supprimés, comme des colonnes ou des lignes entières d\'une matrice, des têtes d\'attention complètes, ou même des couches entières. Cette approche est beaucoup plus \"amicale\" pour le matériel. La suppression d\'une colonne, par exemple, réduit simplement la dimension d\'une matrice, ce qui se traduit directement par moins de calculs et des gains de vitesse mesurables.
>
> **Sparsité semi-structurée (N:M)** : C\'est un compromis où, dans chaque bloc de M poids consécutifs, N poids sont mis à zéro. Par exemple, la sparsité 2:4 signifie que deux des quatre poids de chaque bloc sont nuls. Cette structure régulière peut être exploitée par du matériel spécialisé. L\'architecture Ampere de NVIDIA, par exemple, offre une accélération matérielle pour la sparsité 2:4, doublant théoriquement le débit de calcul.

Des techniques d\'élagage modernes comme SparseGPT ont démontré qu\'il est possible de rendre des modèles massifs comme GPT-3 fortement épars en une seule passe (*one-shot*), sans nécessiter un ré-entraînement coûteux, ouvrant la voie à des modèles à la fois très grands et très efficaces.

## 55.3 Adaptation et Utilisation des Modèles

Une fois le processus d\'entraînement colossal d\'un modèle fondateur terminé, le résultat est un artefact numérique d\'une puissance immense, mais d\'une utilité générale. Pour le rendre performant sur des tâches spécifiques, il doit être adapté. Cette dernière section du chapitre se penche sur les techniques modernes d\'adaptation et sur les nouveaux paradigmes d\'interaction qui ont émergé avec ces modèles. Nous verrons comment la communauté est passée de l\'ajustement fin coûteux de l\'ensemble du modèle à des méthodes efficaces en paramètres, et comment l\'apprentissage en contexte a redéfini notre manière d\'interagir avec l\'IA. Cette évolution a des implications profondes, non seulement techniques, mais aussi économiques, marquant la transition vers un écosystème où le modèle fondateur agit comme une plateforme centrale.

### 55.3.1 Ajustement fin (Fine-tuning) et méthodes efficaces (PEFT, LoRA)

L\'ajustement fin est le processus qui consiste à prendre un modèle pré-entraîné sur un corpus généraliste et à poursuivre son entraînement sur un ensemble de données plus petit et spécifique à une tâche, afin de spécialiser ses capacités.

#### Ajustement fin traditionnel (Full Fine-tuning)

La méthode traditionnelle, ou *full fine-tuning*, consiste à mettre à jour **tous les poids** du modèle pré-entraîné en utilisant le nouvel ensemble de données. Cette approche est efficace pour obtenir des performances de pointe, car elle permet au modèle d\'adapter l\'ensemble de ses connaissances à la nouvelle tâche.

Cependant, à l\'échelle des modèles fondateurs, cette méthode présente des inconvénients prohibitifs :

> **Coût de calcul et de mémoire** : Mettre à jour des milliards de paramètres, même sur un ensemble de données plus petit, reste une opération extrêmement coûteuse en termes de ressources GPU et de temps.
>
> **Coût de stockage et de déploiement** : Le principal problème est que chaque tâche ajustée de cette manière produit une nouvelle copie complète du modèle. Si l\'on souhaite spécialiser un modèle de 175 milliards de paramètres (soit 350 Go) pour 100 tâches différentes, il faudrait stocker et gérer 100 modèles distincts, ce qui représente 35 téraoctets. C\'est logistiquement et financièrement irréalisable pour la plupart des organisations.
>
> **Oubli catastrophique** : En mettant à jour tous les poids pour une nouvelle tâche, le modèle risque de \"désapprendre\" ou d\'oublier les connaissances générales acquises lors du pré-entraînement, ce qui peut nuire à sa capacité de généralisation.

#### Ajustement fin efficace en paramètres (Parameter-Efficient Fine-Tuning - PEFT)

Pour surmonter ces obstacles, une nouvelle famille de techniques a émergé : l\'ajustement fin efficace en paramètres (PEFT). Le principe fondamental du PEFT est de

**geler la grande majorité des paramètres du modèle pré-entraîné** (souvent plus de 99%) et de n\'entraîner qu\'un très petit nombre de paramètres, nouveaux ou existants.

Les avantages de cette approche sont considérables et répondent directement aux limites de l\'ajustement fin complet :

> **Efficacité en calcul et en mémoire** : L\'entraînement ne portant que sur une infime fraction des paramètres, il nécessite beaucoup moins de VRAM et de temps, rendant l\'ajustement fin accessible même sur du matériel grand public.
>
> **Efficacité en stockage** : Au lieu de sauvegarder une nouvelle copie de 350 Go du modèle, on ne sauvegarde que les quelques mégaoctets de poids de \"l\'adaptateur\" spécifique à la tâche. Le modèle de base, lourd, reste unique et partagé par toutes les tâches.
>
> **Portabilité et modularité** : Les adaptateurs spécifiques à chaque tâche sont petits et peuvent être facilement chargés, déchargés ou échangés à la volée au moment de l\'inférence, permettant à un seul modèle déployé de servir plusieurs objectifs.
>
> **Prévention de l\'oubli catastrophique** : Comme les poids originaux sont gelés, les connaissances générales du modèle sont préservées, et l\'adaptation se fait de manière non destructive.

Cette évolution technique a engendré une transformation économique et opérationnelle. Le modèle fondateur devient une plateforme centrale, une sorte de système d\'exploitation pour l\'IA, tandis que les adaptateurs PEFT agissent comme des applications légères et spécialisées. Cela crée un écosystème à plusieurs niveaux, avec des fournisseurs de plateformes qui assument les coûts massifs du pré-entraînement, et une communauté plus large de développeurs qui peuvent créer et distribuer des solutions spécialisées sous forme de petits adaptateurs.

#### LoRA (Low-Rank Adaptation) : Une plongée en profondeur

Parmi les nombreuses techniques de PEFT, LoRA (Low-Rank Adaptation) est devenue l\'une des plus populaires et des plus efficaces en raison de sa simplicité et de sa performance.

**Principe mathématique sous-jacent**

LoRA repose sur une hypothèse empirique clé : bien que les matrices de poids d\'un modèle pré-entraîné aient un rang complet (sont de \"haut rang\"), la **mise à jour** de ces poids pendant l\'adaptation à une nouvelle tâche, ΔW, a un \"rang intrinsèque faible\" (*low intrinsic rank*). Cela signifie que la transformation apprise pendant l\'ajustement fin peut être représentée de manière efficace par une matrice de bas rang.

Plutôt que d\'apprendre la grande matrice de mise à jour ΔW∈Rd×k, LoRA la décompose en produit de deux matrices beaucoup plus petites et de bas rang : ΔW=BA, où B∈Rd×r et A∈Rr×k. Le rang r est un hyperparamètre beaucoup plus petit que d et k (par exemple, r peut être 4, 8 ou 16 alors que d et k sont de l\'ordre de plusieurs milliers).

La passe avant d\'une couche modifiée par LoRA est alors calculée comme suit :

h=W0x+ΔWx=W0x+BAx

Pendant l\'entraînement, la matrice de poids originale W0 est gelée et seuls les poids des matrices A et B sont mis à jour par rétropropagation. Le nombre de paramètres entraînables est ainsi réduit de d×k à seulement r×(d+k), ce qui représente une réduction drastique, souvent supérieure à 99%.37

**Implémentation et avantages**

Dans l\'architecture Transformer, LoRA est généralement appliqué aux matrices de poids des couches d\'attention (Wq,Wk,Wv,Wo), car elles sont considérées comme les plus critiques pour l\'adaptation à de nouvelles tâches.

Un avantage crucial de LoRA par rapport à d\'autres méthodes PEFT (comme les adaptateurs qui ajoutent de nouvelles couches) est son **absence de latence à l\'inférence**. Une fois l\'entraînement de LoRA terminé, les matrices B et A peuvent être multipliées pour calculer ΔW, qui peut ensuite être simplement additionné à la matrice de poids originale W0 pour obtenir une nouvelle matrice de poids fusionnée W′=W0+BA. Cette nouvelle matrice W′ peut être utilisée directement dans le modèle original sans aucune modification de l\'architecture. Par conséquent, au moment de l\'inférence, le modèle ajusté avec LoRA est exactement aussi rapide que le modèle de base.

### 55.3.2 Apprentissage en contexte (In-context learning) et Ingénierie de prompt

Parallèlement aux méthodes d\'adaptation qui modifient les poids du modèle, une autre forme d\'adaptation, encore plus dynamique, a émergé des capacités des modèles à très grande échelle : l\'apprentissage en contexte. Ce phénomène a donné naissance à une nouvelle discipline, l\'ingénierie de prompt, qui est devenue le principal moyen d\'interagir avec et de guider ces puissants modèles.

#### Un nouveau paradigme : L\'apprentissage en contexte (In-Context Learning - ICL)

L\'apprentissage en contexte est l\'une des capacités émergentes les plus remarquables des grands modèles de langage. Il s\'agit de la capacité d\'un modèle à \"apprendre\" à effectuer une nouvelle tâche au moment de l\'inférence, simplement en lui fournissant quelques exemples dans l\'invite (

*prompt*), et ce, **sans aucune mise à jour des poids du modèle par descente de gradient**.

Le mécanisme est le suivant : le modèle est conditionné sur une invite qui contient une description de la tâche et quelques paires entrée-sortie. Par exemple, pour une tâche de traduction : \"Traduire l\'anglais vers le français. sea otter -\> loutre de mer, peppermint -\> menthe poivrée, cheese -\>?\". Le modèle, en traitant ce contexte, reconnaît le motif ou la tâche implicite et l\'applique à la nouvelle entrée (\"cheese\") pour générer la sortie attendue (\"fromage\").

Il est essentiel de distinguer l\'ICL de l\'ajustement fin :

> L\'**ajustement fin** est un processus d\'entraînement qui modifie de manière **permanente** les paramètres du modèle.
>
> L\'**ICL** est un processus d\'inférence qui utilise le contexte de l\'invite pour guider le comportement du modèle de manière **temporaire**, uniquement pour la génération en cours. L\'apprentissage est \"en contexte\" et disparaît dès que l\'invite est terminée.

Les mécanismes sous-jacents à l\'ICL sont encore un sujet de recherche intense. Les premières hypothèses suggéraient qu\'il s\'agissait d\'une forme sophistiquée de reconnaissance de motifs. Des théories plus récentes proposent que le mécanisme d\'attention du Transformer pourrait effectuer une forme d\'apprentissage implicite, certains chercheurs faisant l\'analogie avec l\'inférence bayésienne ou même avec une simulation interne de la descente de gradient au sein de la passe avant du modèle.

#### L\'ingénierie de prompt : Guider le modèle

L\'ingénierie de prompt (ou ingénierie d\'invite) est l\'art et la science de concevoir des entrées textuelles efficaces pour obtenir les sorties souhaitées d\'un modèle de langage. C\'est l\'interface principale pour exploiter la puissance de l\'ICL.

**Techniques de base**

> **Prompting \"zéro-shot\"** : Le modèle reçoit une description de la tâche mais aucun exemple. Par exemple : \"Classez le sentiment du texte suivant comme positif, négatif ou neutre : \'J\'ai adoré ce film!\'\". Cette approche repose entièrement sur les connaissances et les capacités de généralisation acquises par le modèle lors de son pré-entraînement.
>
> **Prompting \"few-shot\"** : C\'est l\'application directe de l\'ICL. Le modèle reçoit quelques exemples (démonstrations) de la tâche dans l\'invite pour le guider. Par exemple : \"Texte: \'Ce repas était délicieux.\' Sentiment: Positif. Texte: \'Le service était terriblement lent.\' Sentiment: Négatif. Texte: \'Le film était correct.\' Sentiment:?\". Le modèle apprend du format et de la logique des exemples pour répondre à la nouvelle requête.

**Techniques avancées : Le raisonnement en chaîne de pensée (Chain-of-Thought - CoT)**

Le raisonnement en chaîne de pensée est une technique d\'ingénierie de prompt qui a considérablement amélioré les performances des grands modèles sur des tâches nécessitant un raisonnement complexe en plusieurs étapes, comme les problèmes de mathématiques, de logique ou de bon sens.

Le mécanisme de CoT consiste à ne pas seulement fournir la réponse finale dans les exemples, mais aussi les étapes de raisonnement intermédiaires qui y mènent. Au lieu de simplement montrer Q:\... A: 11., l\'invite montre le processus : Q: Roger a 5 balles de tennis. Il achète 2 boîtes de balles de tennis supplémentaires. Chaque boîte contient 3 balles. Combien de balles a-t-il maintenant? A: Roger a commencé avec 5 balles. 2 boîtes de 3 balles font 6 balles. 5 + 6 = 11. La réponse est 11.. En voyant ces exemples, le modèle apprend non seulement à donner la bonne réponse, mais aussi à générer son propre raisonnement étape par étape pour une nouvelle question.

Une découverte encore plus surprenante est le **CoT \"zéro-shot\"**. Il a été démontré que le simple fait d\'ajouter une phrase comme \"Pensons étape par étape\" ou \"Réfléchissons pas à pas\" à la fin d\'une question complexe peut inciter le modèle à décomposer le problème, à générer une chaîne de raisonnement et à arriver à une réponse plus précise, même sans aucun exemple.

Le succès du CoT suggère que cette technique agit comme une forme d\'**échafaudage cognitif en contexte**. Un prompt standard demande une réponse directe, forçant le modèle à effectuer tout le raisonnement en interne, de manière implicite. Un prompt CoT, en revanche, externalise le processus de pensée. Il fournit une structure, un modèle de raisonnement, que le modèle peut suivre. En générant sa propre chaîne de pensée, le modèle utilise sa sortie comme un \"brouillon\" ou un \"espace de travail\" intermédiaire pour guider ses propres étapes de génération suivantes. Cela transforme la fenêtre de contexte d\'un simple tampon de mémoire passive en un espace de calcul actif. L\'ingénierie de prompt avancée ne consiste donc pas tant à programmer le modèle qu\'à gérer sa charge cognitive, en concevant des processus qui décomposent des tâches complexes en une séquence d\'étapes plus simples que le modèle peut exécuter de manière fiable.

---

### Références croisées

- **Ere de l'IA agentique et travailleur numerique** : voir aussi [Chapitre I.13 -- L'Ere de l'IA Agentique](../../III - Entreprise Agentique/Volume_I_Fondations_Entreprise_Agentique/Chapitre_I.13_Ere_IA_Agentique_Modele_Travailleur_Numerique.md)
- **Ingenierie du contexte et RAG** : voir aussi [Chapitre II.7 -- Ingenierie du Contexte et RAG](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.7_Ingenierie_Contexte_RAG.md)
- **Apprentissage profond (Deep Learning)** : voir aussi [Chapitre 1.44 -- Apprentissage Profond (Deep Learning)](../Volume_VI_Intelligence_Artificielle_Systemes_Interactifs/Chapitre_I.44_DeepLearning.md)
