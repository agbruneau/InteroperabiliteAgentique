# Chapitre I.46 : Traitement du Langage Naturel (TALN/NLP)

## Introduction : Du Langage Humain à la Représentation Computationnelle

Le langage naturel, dans sa richesse et sa complexité, représente à la fois le véhicule de la pensée humaine et l\'un des défis les plus profonds de l\'intelligence artificielle. Pour l\'humain, la communication verbale ou écrite est une seconde nature, une faculté acquise avec une aisance déconcertante. Pourtant, cette apparente simplicité masque une structure d\'une complexité computationnelle immense. L\'ambiguïté lexicale (le mot « avocat » désigne-t-il un fruit ou un juriste?), la dépendance au contexte (« Elle est terrible! » peut être un compliment ou une critique), et la nécessité d\'une vaste connaissance du monde pour interpréter correctement une phrase sont autant d\'obstacles qui ont longtemps rendu le langage humain quasi impénétrable pour les machines. Le traitement automatique du langage naturel (TALN), ou

*Natural Language Processing* (NLP) en anglais, est la discipline à l\'intersection de l\'informatique, de l\'intelligence artificielle et de la linguistique qui se consacre à doter les ordinateurs de la capacité de comprendre, d\'interpréter et de générer le langage humain.

Ce chapitre se propose de raconter l\'histoire de cette quête, une histoire marquée par une évolution spectaculaire des paradigmes. Nous suivrons un parcours chronologique et conceptuel, débutant avec les premières approches qui traitaient le langage comme une séquence de symboles discrets. Ces méthodes, bien que fondamentales, se heurtaient rapidement aux limites de leur propre représentation. Nous verrons comment la nécessité de capturer la *signification* des mots a conduit à une véritable révolution : le passage des représentations symboliques à des représentations vectorielles continues, ou *plongements lexicaux*. Ce changement a transformé le langage en un objet géométrique, où la sémantique devient mesurable et manipulable par des opérations algébriques.

Forts de cette nouvelle capacité à représenter le sens, nous explorerons ensuite comment le TALN a pu s\'attaquer à des applications complexes et à haute valeur ajoutée, telles que l\'analyse de sentiments, la traduction automatique et la conception de systèmes de dialogue. Chacune de ces applications n\'a pas seulement bénéficié des avancées théoriques, mais a également servi de catalyseur, poussant les architectures de modèles à leurs limites et inspirant de nouvelles innovations.

Enfin, nous aborderons la période contemporaine, dominée par l\'émergence des grands modèles de langage (LLMs). Nous verrons comment une architecture particulière, le *Transformer*, en abandonnant les contraintes séquentielles des modèles précédents au profit d\'un mécanisme d\'attention massivement parallèle, a permis une mise à l\'échelle sans précédent. Cette nouvelle échelle a fait émerger des capacités de compréhension et de génération de langage d\'une qualité stupéfiante, donnant naissance à un nouveau paradigme d\'interaction avec les machines : l\'ingénierie de prompt. Ce voyage, des compteurs de mots aux architectures neuronales profondes, illustre une tendance fondamentale en intelligence artificielle : une abstraction croissante, passant de la manipulation de règles explicites à l\'apprentissage de représentations latentes dans des espaces de très haute dimension.

## 46.1 Traitement du texte et Modèles de langage

Avant qu\'un algorithme puisse « comprendre » ou même simplement traiter du texte, celui-ci doit être transformé d\'une simple chaîne de caractères bruts en une structure de données organisée et normalisée. Cette section inaugurale se consacre à ces fondations indispensables. Nous commencerons par disséquer le pipeline de prétraitement, une série d\'étapes de nettoyage et de structuration sans lesquelles toute analyse ultérieure serait viciée. Ensuite, nous nous plongerons dans la première tentative formelle et mathématiquement rigoureuse de modéliser le langage : les modèles statistiques, et plus particulièrement les modèles n-grammes. Ces modèles, bien que conceptuellement simples, nous introduiront à des défis fondamentaux, comme le problème de la sparsité des données, dont la résolution a été un moteur d\'innovation majeur dans le domaine.

### 46.1.1 Le Pipeline Fondamental de Prétraitement Textuel

Le texte que l\'on trouve dans le monde réel -- qu\'il provienne de pages web, de courriels, de livres numérisés ou de messages sur les réseaux sociaux -- est intrinsèquement « bruyant ». Il est truffé de ponctuation, de variations de casse, de balises de formatage (comme le HTML), d\'erreurs de frappe et d\'autres artefacts qui, s\'ils sont conservés, peuvent gravement nuire à la performance des modèles de TALN. L\'objectif du prétraitement est de nettoyer et de standardiser ce texte brut pour le transformer en une représentation propre et cohérente, prête à être analysée par des algorithmes. Ce pipeline, bien que ses étapes puissent varier en fonction de la tâche, constitue la première étape cruciale de la quasi-totalité des projets de TALN.

#### Segmentation

La première opération consiste généralement à diviser un long document en unités de traitement plus petites et sémantiquement cohérentes. La plupart du temps, cette unité est la phrase. Cette étape, appelée segmentation de phrases (*sentence segmentation*), peut sembler triviale : il suffirait de découper le texte à chaque fois qu\'un point, un point d\'interrogation ou un point d\'exclamation est rencontré. Cependant, la réalité linguistique est plus complexe. Un point peut marquer la fin d\'une phrase, mais il peut aussi faire partie d\'une abréviation (ex: « M. Tremblay »), d\'une URL ou d\'un nombre décimal. Des bibliothèques de TALN modernes comme spaCy ou NLTK utilisent des modèles pré-entraînés et des heuristiques sophistiquées pour gérer ces ambiguïtés et identifier correctement les frontières des phrases.

#### Tokenisation

Une fois le texte segmenté en phrases, l\'étape suivante est la tokenisation, qui consiste à décomposer chaque phrase en ses unités fondamentales : les *tokens*. Ces tokens sont les briques de base sur lesquelles les modèles de langage sont construits.

> **Principes et Stratégies :** La tokenisation transforme une chaîne de caractères continue en une liste de tokens. L\'approche la plus simple est la tokenisation par espacement, qui divise la phrase à chaque espace blanc. Cependant, cette méthode est limitée. Par exemple, dans la phrase « J\'aime le TALN! », une tokenisation par espacement produirait , fusionnant le mot « aime » avec l\'apostrophe et le mot « TALN » avec la ponctuation. Des approches plus robustes utilisent des expressions régulières ou des règles linguistiques pour séparer correctement la ponctuation et gérer les contractions, produisant un résultat plus propre comme .
>
> **Tokenisation par sous-mots (Subword Tokenization) :** Pour les grands modèles de langage modernes, la tokenisation au niveau du mot pose un problème majeur : la taille du vocabulaire. Un vocabulaire qui inclut chaque mot unique d\'un grand corpus peut contenir des millions d\'entrées, ce qui est coûteux en mémoire et en calcul. De plus, cette approche ne peut pas gérer les mots rares ou inconnus (mots hors-vocabulaire ou *Out-Of-Vocabulary* - OOV) qui n\'ont pas été vus lors de l\'entraînement. La solution qui s\'est imposée est la tokenisation par sous-mots. Des algorithmes comme *Byte-Pair Encoding* (BPE), *WordPiece* ou *SentencePiece* apprennent à décomposer les mots en unités plus petites et récurrentes. Par exemple, le mot « déconstitutionnalisation » pourrait être tokenisé en \[\"dé\", \"constitution\", \"nal\", \"isation\"\]. Cette approche présente deux avantages majeurs : elle maintient un vocabulaire de taille raisonnable et peut représenter n\'importe quel mot, même inconnu, en le décomposant en sous-mots connus. Elle capture également des informations morphologiques, car des mots partageant un même morphème (comme \"-isation\") partageront un token de sous-mot.

#### Normalisation et Nettoyage

Cette étape vise à réduire le « bruit » et la variabilité non pertinente dans les données textuelles.

> **Conversion en minuscules (Lowercasing) :** C\'est l\'une des étapes de normalisation les plus courantes et les plus simples. En convertissant tout le texte en minuscules, on s\'assure que des mots comme « Langage », « langage » et « LANGAGE » sont traités comme un seul et même token. Cela permet de réduire la taille effective du vocabulaire et d\'éviter que le modèle ne traite ces variations comme des mots distincts, ce qui aide à combattre la sparsité des données. Bien que généralement bénéfique, cette étape peut parfois être indésirable, par exemple lorsque la casse porte une information sémantique (comme la distinction entre la marque « Apple » et le fruit « apple » en anglais).
>
> **Suppression des éléments non pertinents :** Selon la source des données, le texte peut contenir des éléments qui n\'apportent aucune valeur sémantique pour la tâche visée. Il est courant d\'utiliser des expressions régulières pour supprimer les balises HTML, les URLs, les adresses électroniques, les nombres ou les caractères spéciaux qui ne sont pas pertinents pour l\'analyse.

#### Filtrage des Mots Vides (Stop Words)

Toutes les langues contiennent des mots extrêmement fréquents qui servent principalement de liants grammaticaux mais portent peu de contenu sémantique. En français, des mots comme « le », « la », « de », « un », « et », « à » en sont des exemples typiques. Ces mots sont appelés *mots vides* ou *stop words*.

> **Rôle et justification :** Dans de nombreuses tâches de TALN, comme la classification de documents ou la recherche d\'information, ces mots peuvent introduire du bruit et augmenter inutilement la dimensionnalité des données. En les supprimant, on permet au modèle de se concentrer sur les mots porteurs de sens, ce qui peut améliorer à la fois l\'efficacité et la performance.
>
> **Mise en œuvre :** Le filtrage des mots vides se fait généralement en comparant chaque token à une liste prédéfinie de mots à exclure. Des bibliothèques comme NLTK et spaCy fournissent des listes de mots vides pour de nombreuses langues. Il est cependant crucial de noter qu\'il n\'existe pas de liste universelle. Une liste de mots vides doit être adaptée au corpus et à la tâche. Par exemple, dans un contexte d\'analyse de sentiments sur des critiques de films, le mot « pas » dans « ce n\'est pas bon » est essentiel pour capturer la négation et ne devrait pas être considéré comme un mot vide.

#### Racinisation (Stemming) vs. Lemmatisation

L\'un des défis de la variabilité linguistique est la flexion morphologique : un même mot de base (ou lemme) peut apparaître sous de nombreuses formes différentes (ex: « marcher », « marche », « marchons », « marchaient »). Pour que les modèles puissent reconnaître que toutes ces formes se réfèrent au même concept, on utilise des techniques de normalisation morphologique. Les deux approches principales sont la racinisation et la lemmatisation.

> **Racinisation (Stemming) :** La racinisation est une approche heuristique et algorithmique qui vise à réduire un mot à sa racine (*stem*) en supprimant les affixes (principalement les suffixes). C\'est une méthode rapide et computationnellement peu coûteuse. L\'algorithme de Porter, par exemple, est un standard classique pour l\'anglais. Cependant, cette approche est \"brute\" et peut produire des racines qui ne sont pas des mots valides dans la langue. Par exemple, l\'algorithme de Lovins pourrait réduire « argue », « argued », « argues » et « arguing » à la racine « argu », qui n\'est pas un mot anglais. De même, en français, « marcher » et « marchons » pourraient être réduits à « march ». Le principal inconvénient est cette perte de validité linguistique et le risque de sur-racinisation (réduire des mots de sens différents à la même racine) ou de sous-racinisation (ne pas réduire des mots de même sens à la même racine).
>
> **Lemmatisation :** La lemmatisation est une approche plus sophistiquée et linguistiquement informée. Elle vise à ramener un mot à sa forme canonique ou de dictionnaire, appelée *lemme*. Pour ce faire, elle utilise des dictionnaires et une analyse morphologique, prenant souvent en compte le contexte grammatical du mot (sa partie du discours, ou *Part-of-Speech* - POS). Par exemple, pour lemmatiser correctement le mot anglais « saw », un lemmatiseur doit savoir s\'il est utilisé comme un nom (une scie) ou comme un verbe (le passé de *to see*). Le résultat de la lemmatisation est toujours un mot linguistiquement valide (ex: « marchaient » devient « marcher »). Cette précision a un coût : la lemmatisation est significativement plus lente et plus complexe à mettre en œuvre que la racinisation, car elle nécessite des ressources linguistiques considérables.

Le choix entre ces deux techniques est un compromis classique en ingénierie. Pour des tâches où la vitesse est primordiale et où une certaine imprécision est acceptable, comme la recherche d\'information à grande échelle, la racinisation peut être suffisante. Pour des applications qui exigent une haute précision sémantique, comme les systèmes de réponse aux questions ou les agents conversationnels, la lemmatisation est généralement préférée. Le tableau suivant synthétise les caractéristiques et les cas d\'usage de chaque approche.

**Tableau 46.1 : Comparaison détaillée entre la Racinisation et la Lemmatisation**

  ---------------------------- -------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------
  Critère                      Racinisation (Stemming)                                                                Lemmatisation                                                                                                Cas d\'usage typiques

  **Principe**                 Heuristique : troncature de suffixes basée sur des règles.                             Linguistique : utilisation de dictionnaires et d\'analyses morphologiques pour trouver la forme canonique.   

  **Vitesse**                  Très rapide.                                                                           Plus lente.                                                                                                  Racinisation pour le traitement de masse (indexation de recherche).

  **Coût Computationnel**      Faible.                                                                                Élevé, nécessite des ressources linguistiques.                                                               Lemmatisation pour les applications interactives (chatbots).

  **Qualité du Résultat**      La racine n\'est pas garantie d\'être un mot valide (ex: \"studies\" -\> \"studi\").   Le lemme est toujours un mot valide (ex: \"studies\" -\> \"study\").                                         Lemmatisation pour la génération de texte ou l\'analyse sémantique fine.

  **Dépendance au Contexte**   Ne tient généralement pas compte du contexte grammatical (POS tag).                    Peut utiliser le contexte pour désambiguïser (ex: \"saw\" verbe vs. nom).                                    Racinisation quand le contexte est moins crucial.
  ---------------------------- -------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------

### 46.1.2 Les Modèles de Langage Statistiques : Prédire le Prochain Mot

Une fois le texte prétraité et transformé en une séquence de tokens, la question fondamentale devient : comment modéliser la structure et la plausibilité de ces séquences? Un modèle de langage est une tentative de répondre à cette question en utilisant les outils de la théorie des probabilités.

#### Définition Formelle d\'un Modèle de Langage

Formellement, un modèle de langage est une fonction qui assigne une probabilité à une séquence de mots w1​,w2​,...,wm​. Cette probabilité, notée P(w1​,w2​,...,wm​), quantifie la vraisemblance que cette séquence de mots apparaisse dans une langue donnée. Un bon modèle de langage devrait assigner une probabilité élevée à une phrase grammaticalement correcte et sémantiquement plausible comme « le chat dort sur le tapis », et une probabilité très faible, voire nulle, à une séquence de mots aléatoire comme « tapis le sur dort chat le ». Cette capacité à quantifier la plausibilité d\'une phrase est au cœur de nombreuses applications, de la correction orthographique à la traduction automatique.

Le défi est de calculer cette probabilité jointe. La **règle de la chaîne** (ou *chain rule*) de la théorie des probabilités nous permet de décomposer cette probabilité jointe en un produit de probabilités conditionnelles  :

P(w1​,w2​,...,wm​)=P(w1​)×P(w2​∣w1​)×P(w3​∣w1​,w2​)×⋯×P(wm​∣w1​,...,wm−1​)

P(w1​,...,wm​)=k=1∏m​P(wk​∣w1​,...,wk−1​)

Cependant, cette formulation exacte est intraitable en pratique. Calculer la probabilité d\'un mot étant donné toute l\'histoire des mots qui le précèdent nécessiterait une quantité de données astronomique pour estimer de manière fiable toutes les combinaisons possibles. C\'est ici qu\'intervient une simplification cruciale.

#### Le Modèle N-gramme et l\'Hypothèse de Markov

Pour rendre le problème tractable, les modèles n-grammes introduisent une simplification radicale : **l\'hypothèse de Markov**. Cette hypothèse postule que la probabilité d\'un mot ne dépend pas de toute l\'histoire qui le précède, mais seulement d\'une fenêtre fixe des

n−1 mots précédents.

P(wk​∣w1​,...,wk−1​)≈P(wk​∣wk−n+1​,...,wk−1​)

Cette approximation transforme un problème de dépendance à long terme en un problème de dépendance locale. La valeur de n définit l\'ordre du modèle  :

> **Unigramme (n=1) :** Le modèle le plus simple. Chaque mot est considéré comme indépendant des autres. P(wk​∣w1​,...,wk−1​)≈P(wk​). La probabilité d\'une phrase est simplement le produit des probabilités de ses mots.
>
> **Bigramme (n=2) :** La probabilité d\'un mot ne dépend que du mot qui le précède immédiatement. P(wk​∣w1​,...,wk−1​)≈P(wk​∣wk−1​). C\'est un modèle de chaîne de Markov de premier ordre.
>
> **Trigramme (n=3) :** La probabilité d\'un mot dépend des deux mots précédents. P(wk​∣w1​,...,wk−1​)≈P(wk​∣wk−2​,wk−1​).

Avec cette hypothèse, le calcul de la probabilité d\'une phrase devient une simple multiplication des probabilités des n-grammes qui la composent. Pour estimer ces probabilités conditionnelles, on utilise l\'**estimation par maximum de vraisemblance** (*Maximum Likelihood Estimation* - MLE), qui consiste simplement à compter les occurrences des n-grammes dans un grand corpus d\'entraînement. Par exemple, pour un modèle bigramme, la probabilité est calculée comme suit  :

P(wi​∣wi−1​)=C(wi−1​)C(wi−1​,wi​)​

où C(wi−1​,wi​) est le nombre de fois où le bigramme (wi−1​,wi​) apparaît dans le corpus, et C(wi−1​) est le nombre total d\'occurrences du mot wi−1​.

#### Le Problème Fondamental de la Sparsité des Données

Les modèles n-grammes, malgré leur élégance mathématique, se heurtent à un mur lorsqu\'ils sont confrontés à la réalité des données linguistiques : la **sparsité** (ou lacunarité). Le langage est incroyablement productif. Même avec un corpus de plusieurs milliards de mots, la grande majorité des séquences de mots grammaticalement valides n\'apparaîtront jamais.

Ce phénomène a une conséquence catastrophique pour le calcul des probabilités par MLE. Si un n-gramme valide (par exemple, le bigramme « réacteur nucléaire ») n\'est jamais apparu dans le corpus d\'entraînement, son compte C(reˊacteur,nucleˊaire) sera de zéro. Par conséquent, sa probabilité estimée sera de zéro. En raison de la nature multiplicative du modèle, toute phrase contenant ce bigramme se verra assigner une probabilité totale de zéro.

Le modèle devient ainsi incapable de généraliser. Il considère comme impossibles des phrases parfaitement plausibles, simplement parce qu\'il ne les a pas vues pendant son entraînement. C\'est un cas extrême de sur-apprentissage (*overfitting*). Pour qu\'un modèle n-gramme soit utilisable en pratique, il est impératif de résoudre ce « problème du zéro ».

#### Techniques de Lissage (Smoothing)

Le lissage est une famille de techniques statistiques conçues pour adresser le problème de la sparsité. L\'idée générale est de prendre une petite partie de la masse de probabilité des n-grammes qui ont été observés et de la redistribuer aux n-grammes qui n\'ont pas été observés, s\'assurant ainsi qu\'aucun n-gramme n\'ait une probabilité de zéro.

> **Lissage de Laplace (Add-one Smoothing) :** C\'est la méthode la plus simple et la plus intuitive. Elle consiste à prétendre que nous avons vu chaque n-gramme possible une fois de plus que ce que nous avons réellement compté. On ajoute donc 1 au numérateur de chaque calcul de probabilité. Pour maintenir une distribution de probabilité valide (dont la somme est 1), il faut ajuster le dénominateur en conséquence. Pour un modèle bigramme, la formule devient  :\
> PLaplace​(wi​∣wi−1​)=C(wi−1​)+VC(wi−1​,wi​)+1​\
> où V est la taille du vocabulaire (le nombre de mots uniques dans le corpus). Cette technique garantit que même les n-grammes non vus (C=0) auront une petite probabilité non nulle. Cependant, le lissage de Laplace est considéré comme une méthode trop agressive et grossière. En pratique, il déplace une part trop importante de la masse de probabilité vers les événements non vus, ce qui pénalise de manière excessive les probabilités des événements réellement observés. Pour cette raison, il est rarement utilisé dans les modèles de langage modernes.
>
> **Lissages Avancés : Good-Turing et Kneser-Ney :** Pour surmonter les défauts du lissage de Laplace, des techniques plus sophistiquées ont été développées. Bien qu\'une description mathématique exhaustive dépasse le cadre de cette introduction, il est essentiel d\'en comprendre l\'intuition.

**Lissage de Good-Turing :** Cette méthode, développée par Alan Turing et I. J. Good à Bletchley Park, repose sur une idée ingénieuse : utiliser la fréquence des choses que l\'on a vues une seule fois pour estimer la probabilité totale des choses que l\'on n\'a jamais vues. Il s\'appuie sur la notion de « fréquence des fréquences » :\
Nr​ est le nombre de n-grammes qui apparaissent exactement r fois dans le corpus. La probabilité totale des n-grammes non vus (r=0) peut être estimée par NN1​​, où N est le nombre total de n-grammes. Good-Turing utilise ensuite cette information pour ajuster les comptes de tous les n-grammes, réduisant légèrement les comptes des n-grammes vus pour libérer de la masse de probabilité.

**Lissage de Kneser-Ney :** Largement considéré comme l\'état de l\'art des techniques de lissage pour les modèles n-grammes, le lissage de Kneser-Ney introduit une intuition linguistique plus fine : la **probabilité de continuation**. L\'idée est qu\'un mot qui apparaît dans une grande variété de contextes différents est plus susceptible d\'apparaître dans un nouveau contexte qu\'un mot qui apparaît très fréquemment mais toujours dans le même contexte. L\'exemple classique oppose le mot « Francisco » au mot « the » en anglais. « Francisco » a une fréquence unigramme élevée, mais il apparaît presque exclusivement après « San ». En revanche, « the » apparaît après une multitude de mots différents. Kneser-Ney ne se base pas sur la probabilité brute d\'un mot, mais sur le nombre de types de mots différents qui le précèdent. Cette approche s\'est avérée extrêmement efficace pour modéliser la distribution des n-grammes.

### 46.1.3 Synthèse des Idées Clés et Implications de la Section

Cette première exploration des fondations du TALN met en lumière une tension fondamentale qui a façonné le développement du domaine. D\'un côté, le modèle n-gramme, avec son cadre mathématique élégant basé sur l\'hypothèse de Markov, offre une approche simple et interprétable pour modéliser la probabilité des séquences linguistiques. De l\'autre, cette abstraction se heurte violemment à la nature intrinsèquement lacunaire et à longue traîne du langage humain. La plupart des combinaisons de mots possibles n\'apparaîtront jamais, même dans les corpus les plus vastes, créant un paysage de données où les zéros sont la norme et les occurrences, l\'exception.

Ce conflit entre la propreté du modèle et le désordre des données donne naissance au « problème du zéro », qui rend l\'estimation directe par maximum de vraisemblance inutilisable pour toute tâche de généralisation. Dans ce contexte, les techniques de lissage ne doivent pas être vues comme de simples optimisations techniques. Elles représentent une reconnaissance profonde de cette tension. Le passage du lissage de Laplace, naïf et brutal, aux méthodes sophistiquées comme Good-Turing et Kneser-Ney, est une quête pour « réparer » le modèle probabiliste, pour le forcer à mieux s\'aligner avec la nature incomplète des données observables.

Cette lutte incessante contre la sparsité est un thème central qui traverse l\'histoire du TALN. Elle révèle les limites inhérentes à une approche qui traite les mots comme des symboles discrets et indépendants. Cette prise de conscience motivera directement la transition vers le paradigme suivant, exploré dans la section 46.2 : celui des représentations denses et continues, où l\'idée de similarité sémantique peut enfin être capturée explicitement.

## 46.2 Plongements lexicaux (Word Embeddings)

Les modèles n-grammes, même avec des techniques de lissage sophistiquées, souffrent d\'un défaut fondamental : ils ne possèdent aucune notion de similarité sémantique. Pour un tel modèle, les mots « roi » et « reine » sont aussi dissemblables que les mots « roi » et « tournevis ». Chaque mot est une entité atomique, un symbole discret sans relation intrinsèque avec les autres. Cette limitation a constitué un obstacle majeur au progrès du TALN. La solution est venue d\'un changement de paradigme radical : cesser de représenter les mots par des identifiants arbitraires et commencer à les représenter par des vecteurs denses dans un espace continu de haute dimension. Cette section explore cette révolution des plongements lexicaux, ou *word embeddings*, qui a permis de « géométriser » la sémantique.

### 46.2.1 La Révolution Sémantique : Des Mots aux Vecteurs

#### Limites des Représentations Discrètes : le Codage « One-Hot »

La manière la plus directe de représenter un mot pour un algorithme est le **codage « one-hot »** (ou codage disjonctif complet). Si notre vocabulaire contient V mots uniques, chaque mot est représenté par un vecteur de taille V. Ce vecteur est entièrement composé de zéros, à l\'exception d\'un unique \'1\' à l\'indice correspondant au mot dans le vocabulaire. Par exemple, si notre vocabulaire est

\[le, chat, sur, tapis\], le mot « chat » serait représenté par le vecteur \`\`.

Cette représentation, bien que simple, présente trois défauts majeurs qui la rendent impraticable pour des tâches sémantiques :

> **Très haute dimensionnalité :** La taille du vecteur est égale à la taille du vocabulaire, qui peut facilement atteindre des dizaines ou des centaines de milliers de mots. Cela mène au « fléau de la dimensionnalité », rendant les calculs inefficaces et les modèles difficiles à entraîner.
>
> **Sparsité extrême :** Chaque vecteur ne contient qu\'un seul \'1\' et des milliers de zéros, ce qui est une utilisation très inefficace de l\'espace de représentation.
>
> **Orthogonalité sémantique :** C\'est le défaut le plus critique. Dans un espace vectoriel, le produit scalaire entre deux vecteurs one-hot de mots différents est toujours nul. Cela signifie que tous les vecteurs de mots sont orthogonaux les uns aux autres. Géométriquement, le vecteur de « roi » est aussi distant du vecteur de « reine » que du vecteur de « chaussure ». Cette représentation est incapable de capturer la moindre notion de similarité ou de relation sémantique.

#### L\'Hypothèse Distributionnelle : le Fondement Théorique

La percée conceptuelle qui a permis de surmonter ces limites est **l\'hypothèse distributionnelle**. Formulée par le linguiste J.R. Firth en 1957, son adage le plus célèbre est : « *You shall know a word by the company it keeps* » (« On reconnaît un mot à la compagnie qu\'il fréquente »). L\'idée est que les mots qui apparaissent dans des contextes linguistiques similaires ont tendance à avoir des significations similaires. Par exemple, les mots « café » et « thé » apparaîtront souvent dans des phrases avec des mots comme « boire », « tasse », « sucre » ou « chaud ». En analysant statistiquement ces cooccurrences sur un vaste corpus, on peut en déduire que « café » et « thé » sont sémantiquement proches. C\'est ce principe qui est au cœur de tous les modèles de plongements lexicaux modernes. L\'objectif est d\'apprendre, pour chaque mot, un vecteur dense de faible dimension (typiquement entre 50 et 300 dimensions) tel que la position de ce vecteur dans l\'espace reflète son usage contextuel, et donc sa signification.

### 46.2.2 Word2Vec : Apprendre les Représentations par Prédiction

En 2013, une équipe de chercheurs de Google dirigée par Tomas Mikolov a présenté **Word2Vec**, une approche qui a popularisé et rendu extrêmement efficaces les plongements lexicaux. Plutôt que de simplement compter les cooccurrences, Word2Vec apprend les vecteurs de mots en entraînant un réseau de neurones peu profond (avec une seule couche cachée) à effectuer une tâche de prédiction auxiliaire sur un grand corpus de texte. Le modèle n\'est pas entraîné pour la tâche de prédiction elle-même, mais pour les poids de sa couche cachée : ces poids constituent les plongements lexicaux. Word2Vec se décline en deux architectures principales.

#### Architecture Continuous Bag-of-Words (CBOW)

Le modèle CBOW, ou « sac de mots continu », apprend à **prédire un mot cible à partir des mots de son contexte**. Étant donné une fenêtre de contexte (par exemple, les deux mots avant et les deux mots après), le modèle prend les vecteurs des mots de contexte, les combine (généralement en les moyennant), et tente de prédire le mot qui se trouve au centre.

Par exemple, dans la phrase « le chat gris dort sur le tapis », si le mot cible est « dort » et la fenêtre de contexte est de taille 2, les mots de contexte sont \[chat, gris, sur, le\]. Le modèle CBOW apprendra à prédire « dort » à partir de la représentation combinée de ces quatre mots. Cette approche est rapide à entraîner et donne de bons résultats, en particulier pour les mots fréquents.

#### Architecture Skip-gram

Le modèle Skip-gram fonctionne de manière inverse à CBOW : il apprend à **prédire les mots du contexte à partir d\'un mot central**. En reprenant l\'exemple précédent, le modèle prendrait le mot « dort » en entrée et serait entraîné à prédire les mots

\[chat, gris, sur, le\] en sortie. Pour chaque mot d\'entrée, le modèle génère donc plusieurs paires d\'entraînement (mot d\'entrée, mot de contexte).

Cette approche est computationnellement plus coûteuse que CBOW, car elle génère plus d\'exemples d\'entraînement. Cependant, elle est réputée pour mieux fonctionner sur des corpus plus petits et pour produire des représentations de meilleure qualité pour les mots rares.

#### Optimisations Computationnelles : le Défi du Softmax et l\'Échantillonnage Négatif

Un défi majeur pour ces deux architectures est le coût de la couche de sortie. Pour prédire un mot, le modèle doit calculer une probabilité pour chaque mot du vocabulaire via une fonction **softmax**. Si le vocabulaire contient 50 000 mots, cela signifie calculer 50 000 probabilités et normaliser sur l\'ensemble, pour chaque exemple d\'entraînement. Cette opération est extrêmement coûteuse et rendait l\'entraînement sur de grands corpus infaisable.

L\'innovation clé qui a rendu Word2Vec praticable est **l\'échantillonnage négatif** (*negative sampling*). Au lieu de transformer le problème en une classification multi-classes massive, l\'échantillonnage négatif le reformule en une série de problèmes de classification binaire. Pour chaque paire positive

(mot_cible, mot_contexte) issue du corpus, le modèle génère un certain nombre (k) d\'exemples négatifs en associant le mot_cible à des mots tirés aléatoirement du vocabulaire (qui ne sont pas dans son contexte). L\'objectif du modèle devient alors beaucoup plus simple : pour une paire donnée, prédire si elle est une vraie paire de contexte (étiquette 1) ou une paire négative générée aléatoirement (étiquette 0).

Cette astuce réduit considérablement la charge de calcul. À chaque étape, au lieu de mettre à jour des millions de poids dans la matrice de sortie, le modèle n\'a besoin de mettre à jour que les poids correspondant au mot de contexte positif et aux k mots de contexte négatifs (généralement k est petit, entre 5 et 20).

### 46.2.3 GloVe : Capturer les Statistiques Globales de Cooccurrence

Peu de temps après Word2Vec, des chercheurs de l\'Université de Stanford ont proposé une autre approche influente appelée **GloVe** (*Global Vectors for Word Representation*). GloVe cherche à combiner les avantages des deux grandes familles de méthodes pour l\'apprentissage de vecteurs : les méthodes basées sur le comptage (comme l\'Analyse Sémantique Latente, qui factorise de grandes matrices de cooccurrence) et les méthodes basées sur la prédiction locale (comme Word2Vec).

Le principe de GloVe est d\'entraîner un modèle directement sur les **statistiques de cooccurrence globales** du corpus. Il construit d\'abord une grande matrice X où chaque entrée Xij​ représente le nombre de fois que le mot j apparaît dans le contexte du mot i. Ensuite, le modèle apprend des vecteurs de mots wi​ et wj​ de telle sorte que leur produit scalaire soit directement lié au logarithme de leur probabilité de cooccurrence. La fonction de coût est une régression des moindres carrés pondérée pour donner moins d\'importance aux paires de mots très fréquentes (souvent des mots vides) ou très rares (potentiellement bruitées). En intégrant explicitement les statistiques globales dans son objectif d\'apprentissage, GloVe offre une alternative puissante à l\'approche locale de Word2Vec.

### 46.2.4 Comparaison et Propriétés des Plongements Statiques

Word2Vec et GloVe représentent deux philosophies différentes pour atteindre un objectif similaire. Le tableau ci-dessous met en évidence leurs distinctions clés.

**Tableau 46.2 : Comparaison des approches Word2Vec et GloVe**

  -------------------------------- ----------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------
  Critère                          Word2Vec                                                                                              GloVe (Global Vectors)

  **Principe fondamental**         Apprentissage prédictif basé sur le contexte local (fenêtre glissante).                               Apprentissage basé sur le comptage, en factorisant la matrice de cooccurrence globale.

  **Type de données utilisées**    Paires (mot, contexte) streamées à partir du corpus.                                                  Matrice de cooccurrence mot-mot pré-calculée sur l\'ensemble du corpus.

  **Nature de l\'apprentissage**   En ligne (*online*), le modèle voit les exemples un par un et met à jour ses poids.                   Par lots (*batch*), le modèle est entraîné sur la matrice globale.

  **Performance sur mots rares**   Le modèle Skip-gram est particulièrement performant pour capturer la sémantique des mots rares.       Peut être moins performant car les comptes rares sont moins fiables statistiquement.

  **Efficacité**                   Très efficace sur des corpus massifs car il ne nécessite pas de stocker la matrice de cooccurrence.   Peut être plus rapide sur des corpus de taille moyenne à grande, mais nécessite une mémoire importante pour la matrice.
  -------------------------------- ----------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------

Au-delà de leurs différences, la propriété la plus remarquable et la plus surprenante de ces espaces vectoriels est l\'émergence de **structures linéaires qui encodent des analogies**. L\'exemple le plus célèbre, qui a démontré la puissance de ces représentations, est la relation vectorielle :

vect(« roi »)−vect(« homme »)+vect(« femme »)≈vect(« reine »)

Cette équation montre que des concepts abstraits comme le genre ou la relation capitale-pays (vect(\"France\") - vect(\"Paris\") ≈ vect(\"Allemagne\") - vect(\"Berlin\")) sont capturés comme de simples translations dans l\'espace vectoriel. La sémantique, autrefois un concept purement linguistique, devenait ainsi un objet géométrique, manipulable par des opérations algébriques de base.

### 46.2.5 Vers la Contextualisation : Les Limites des Plongements Statiques

Malgré leur puissance, les modèles comme Word2Vec et GloVe partagent une limitation fondamentale : ils sont **statiques**. Chaque mot du vocabulaire se voit assigner un unique vecteur, qui est utilisé quel que soit le contexte dans lequel le mot apparaît.

Cette approche ignore un aspect fondamental du langage : la **polysémie**. Un mot peut avoir plusieurs significations très différentes. Par exemple, le mot « banque » aura le même vecteur dans les phrases « Je dépose de l\'argent à la banque » et « Nous nous sommes assis sur la banque de sable ». Cette incapacité à désambiguïser le sens en fonction du contexte est une contrainte majeure.

La première avancée significative pour surmonter cette limite a été **ELMo** (*Embeddings from Language Models*), introduit en 2018. ELMo a été le pionnier des

**plongements contextuels**. L\'idée n\'est plus de stocker un dictionnaire de vecteurs fixes, mais de générer un vecteur pour un mot à la volée, en fonction de la phrase entière dans laquelle il se trouve.

Pour ce faire, ELMo utilise un réseau de neurones récurrents bidirectionnel (un bi-LSTM) profond, pré-entraîné sur une tâche de modélisation de langage à grande échelle. Pour obtenir la représentation d\'un mot dans une phrase donnée, la phrase entière est passée à travers ce bi-LSTM. Le vecteur final du mot est alors une combinaison pondérée des états cachés du bi-LSTM à toutes ses couches pour ce mot. Les couches inférieures du modèle tendent à capturer des informations syntaxiques (comme la partie du discours), tandis que les couches supérieures capturent des informations sémantiques plus complexes et dépendantes du contexte.

Avec ELMo, le vecteur du mot « banque » sera donc différent dans les deux exemples ci-dessus, résolvant ainsi le problème de la polysémie. Cette transition d\'une représentation statique (un mot = un vecteur) à une représentation dynamique (un mot dans un contexte = un vecteur) a marqué un tournant décisif, pavant la voie à l\'ère des modèles contextuels profonds comme BERT et GPT.

### 46.2.6 Synthèse des Idées Clés et Implications de la Section

Le passage des modèles de comptage aux plongements lexicaux constitue bien plus qu\'une simple amélioration technique ; c\'est un changement de paradigme conceptuel que l\'on peut qualifier de **géométrisation de la sémantique**. Les mots cessent d\'être des identifiants discrets et isolés pour devenir des points dans un espace vectoriel continu. La structure de cet espace, apprise à partir de vastes corpus, est telle que la distance géométrique entre les vecteurs reflète leur proximité sémantique. Cette transformation a une conséquence inattendue et profonde : des relations sémantiques et syntaxiques complexes, comme les analogies, émergent sous forme d\'opérations algébriques simples. Le langage, un système symbolique et abstrait, devient un objet mathématique sur lequel il est possible de raisonner géométriquement. C\'est cette propriété fondamentale qui a permis aux réseaux de neurones, qui excellent dans l\'apprentissage de transformations dans des espaces vectoriels, de réaliser des progrès spectaculaires dans de nombreuses tâches de TALN.

Cependant, cette révolution portait en elle sa propre limite. Les modèles comme Word2Vec et GloVe, en assignant un unique vecteur à chaque mot, reposent sur l\'hypothèse implicite qu\'un mot possède un sens unique et statique. Cette simplification est contredite par la nature même du langage, riche en polysémie et en nuances contextuelles. L\'introduction d\'ELMo marque la prise de conscience systématique de ce problème. En proposant que la représentation d\'un mot ne soit plus une entrée de dictionnaire fixe mais une fonction de la phrase entière, ELMo établit un nouveau principe : le sens n\'est pas une propriété intrinsèque d\'un mot, mais une propriété émergente de son interaction avec son contexte. Ce passage d\'un vecteur statique à une représentation dynamique et contextualisée est une étape conceptuelle aussi importante que le passage initial du comptage aux vecteurs. Il sert de pont intellectuel entre l\'ère des plongements statiques et l\'ère des Transformers, où le calcul de ces interactions contextuelles deviendra le cœur même de l\'architecture.

## 46.3 Applications Fondamentales du TALN

Avec la capacité de représenter les mots et leurs relations sémantiques sous forme de vecteurs, le champ du TALN a pu s\'attaquer à des problèmes d\'une complexité bien plus grande. Cette section se penche sur trois applications fondamentales qui ont non seulement été transformées par ces nouvelles représentations, mais qui ont aussi, par leurs propres défis, poussé à l\'innovation architecturale. L\'analyse de sentiments, la traduction automatique et les systèmes de dialogue sont devenus des bancs d\'essai cruciaux, révélant les limites des modèles existants et catalysant le développement de nouvelles approches, notamment le mécanisme d\'attention.

### 46.3.1 Analyse de Sentiments : Comprendre l\'Opinion

L\'analyse de sentiments, également connue sous le nom d\'exploration d\'opinions (*opinion mining*), est la tâche qui consiste à identifier et à extraire des informations subjectives à partir de sources textuelles. Son objectif le plus courant est de déterminer la **polarité émotionnelle** d\'un texte, c\'est-à-dire de le classer comme positif, négatif ou neutre. Cette application est d\'une importance capitale dans le monde des affaires, où elle est utilisée pour analyser les avis sur les produits, surveiller la réputation d\'une marque sur les réseaux sociaux, évaluer le service client et comprendre les tendances du marché.

#### Formalisation et Approches

Fondamentalement, l\'analyse de sentiments est un problème de **classification de texte**. L\'entrée du modèle est un morceau de texte (un tweet, une critique de restaurant, un commentaire de client) et la sortie est une étiquette de classe discrète (positif, négatif, neutre). Les approches pour résoudre ce problème ont évolué parallèlement aux avancées du TALN :

> **Approches basées sur des lexiques :** Les premières méthodes reposaient sur des dictionnaires de mots (lexiques) où chaque mot est associé à un score de sentiment prédéfini (par exemple, « excellent » = +3, « mauvais » = -2). Pour analyser un texte, on additionne les scores des mots qu\'il contient. Ces méthodes sont simples à mettre en œuvre mais manquent de robustesse. Elles peinent à gérer la négation (« ce film n\'est *pas* bon »), l\'ironie, le sarcasme et les mots dont la polarité dépend du contexte (le mot « imprévisible » peut être positif pour un film à suspense mais négatif pour une voiture).
>
> **Approches d\'apprentissage supervisé classique :** Avec l\'avènement de l\'apprentissage automatique, l\'analyse de sentiments a été abordée comme une tâche de classification standard. On utilise un ensemble de données étiquetées (textes annotés comme positifs ou négatifs) pour entraîner un classifieur comme une machine à vecteurs de support (SVM) ou une régression logistique. Les caractéristiques (*features*) d\'entrée étaient initialement basées sur des sacs de mots ou des n-grammes. L\'introduction des plongements lexicaux a permis une amélioration significative : en moyennant les vecteurs des mots d\'un texte, on obtenait une représentation vectorielle unique pour ce texte, capturant sa sémantique globale de manière bien plus efficace qu\'un simple comptage de mots.
>
> **Approches neuronales profondes :** Les réseaux de neurones profonds ont permis de franchir une nouvelle étape. Des architectures comme les réseaux de neurones convolutifs (CNNs), initialement conçus pour la vision par ordinateur, se sont révélés efficaces pour détecter des n-grammes sémantiques pertinents dans un texte. Les réseaux de neurones récurrents (RNNs) et leurs variantes comme les LSTMs, en traitant le texte de manière séquentielle, sont capables de capturer l\'ordre des mots et les dépendances à plus longue distance, ce qui est crucial pour comprendre des structures complexes comme la négation. Ces modèles prennent en entrée la séquence complète des plongements de mots et apprennent à extraire automatiquement les caractéristiques les plus discriminantes pour la classification de sentiments.

### 46.3.2 Traduction Automatique : D\'une Langue à l\'Autre

La traduction automatique (TA) est l\'une des tâches les plus anciennes et les plus difficiles du TALN. Son évolution illustre parfaitement la transition des modèles statistiques complexes vers des architectures neuronales de bout en bout (*end-to-end*).

#### L\'Ère Statistique (SMT - Statistical Machine Translation)

Pendant près de deux décennies, la traduction automatique statistique a été le paradigme dominant. L\'approche SMT est fondée sur l\'apprentissage de modèles de probabilité à partir de vastes corpus parallèles, c\'est-à-dire des collections de textes alignés phrase par phrase dans deux langues. En utilisant le théorème de Bayes, le problème de la traduction de la phrase source

S en la phrase cible C est modélisé comme la recherche de la phrase C qui maximise la probabilité P(C∣S). Cette probabilité est décomposée en deux composantes :

> Un **modèle de traduction**, P(S∣C), qui estime la probabilité que la phrase source S soit la traduction de la phrase cible C. Ce modèle est appris à partir des alignements de mots et de segments de phrases dans le corpus parallèle.
>
> Un **modèle de langage**, P(C), qui estime la probabilité que la phrase C soit une phrase bien formée dans la langue cible. Il s\'agit typiquement d\'un modèle n-gramme entraîné sur un grand corpus monolingue.

Les systèmes SMT étaient des constructions complexes, composées de nombreux sous-modèles entraînés indépendamment, et nécessitaient une ingénierie de caractéristiques considérable. Bien qu\'ils aient représenté une avancée majeure par rapport aux systèmes à base de règles, ils peinaient à gérer les différences structurelles profondes entre les langues et les dépendances à longue portée.

#### La Révolution Neuronale (NMT - Neural Machine Translation)

Au milieu des années 2010, la traduction automatique neuronale a émergé et a rapidement supplanté la SMT, offrant des traductions plus fluides et plus précises. La NMT aborde la traduction comme un problème unique d\'apprentissage de bout en bout à l\'aide d\'un seul grand réseau de neurones.

> **L\'Architecture Encodeur-Décodeur :** Le cœur de la NMT est l\'architecture **encodeur-décodeur** (parfois appelée *Seq2Seq*).

**L\'Encodeur :** Un réseau de neurones (typiquement un RNN ou un LSTM) lit la phrase source mot par mot. À chaque étape, il met à jour son état interne (ou *état caché*). Après avoir lu le dernier mot, l\'état caché final de l\'encodeur est considéré comme un résumé numérique de toute la phrase source. Ce vecteur, souvent appelé **vecteur de contexte** ou **vecteur de pensée**, est une représentation de la phrase source dans un espace sémantique de taille fixe.

**Le Décodeur :** Un second réseau de neurones (également un RNN/LSTM) est initialisé avec le vecteur de contexte fourni par l\'encodeur. Son rôle est de générer la phrase cible mot par mot. À chaque étape, il produit un mot, et ce mot est ensuite utilisé comme entrée pour l\'étape suivante, jusqu\'à ce qu\'un token de fin de phrase soit généré.

> **Le Goulot d\'Étranglement de l\'Information et l\'Innovation de l\'Attention :** Cette architecture simple et élégante souffrait d\'un défaut majeur : toute l\'information de la phrase source, quelle que soit sa longueur ou sa complexité, devait être compressée dans ce seul vecteur de contexte de taille fixe. C\'était un **goulot d\'étranglement informationnel**. Pour les phrases longues, le modèle avait du mal à conserver les informations du début de la phrase.

La solution à ce problème a été l\'une des innovations les plus importantes de l\'histoire du TALN moderne : le **mécanisme d\'attention**. L\'intuition est la suivante : au lieu de forcer l\'encodeur à tout résumer en un seul vecteur, on lui permet de produire une séquence d\'états cachés, un pour chaque mot de la phrase source. Ensuite, à chaque étape de la génération, le décodeur a la capacité de « regarder en arrière » et de porter son attention sur les différentes parties de la phrase source.

Concrètement, avant de générer chaque mot cible, le décodeur calcule un **score d\'attention** entre son état caché actuel et chacun des états cachés de l\'encodeur. Ces scores sont passés à travers une fonction softmax pour créer une distribution de probabilité (les poids d\'attention) sur les mots sources. Ces poids sont ensuite utilisés pour calculer une somme pondérée des états cachés de l\'encodeur. Le résultat est un **vecteur de contexte dynamique** qui change à chaque étape de la traduction, permettant au décodeur de se concentrer sur les mots sources les plus pertinents pour prédire le prochain mot cible. Ce mécanisme a non seulement résolu le problème des longues dépendances et amélioré considérablement la qualité de la traduction, mais il a aussi jeté les bases de l\'architecture Transformer, qui allait suivre.

### 46.3.3 Systèmes de Dialogue : L\'Interaction Homme-Machine

Les systèmes de dialogue, ou agents conversationnels, visent à permettre une interaction naturelle entre les humains et les machines. On distingue généralement deux grandes catégories de systèmes.

#### Agents Conversationnels Orientés Tâche (Task-Oriented)

Ces systèmes sont conçus pour aider un utilisateur à atteindre un objectif spécifique dans un domaine bien défini, comme réserver un billet de train, vérifier la météo ou commander de la nourriture. Leur architecture est souvent modulaire et comprend typiquement quatre composants  :

> **Compréhension du Langage Naturel (NLU) :** Ce module analyse l\'énoncé de l\'utilisateur pour en extraire son *intention* (ce que l\'utilisateur veut faire, ex: reserver_vol) et les *entités* ou *slots* (les paramètres de l\'intention, ex: destination=Paris, date=demain).
>
> **Gestionnaire d\'État du Dialogue (DST - Dialogue State Tracker) :** Ce composant maintient une représentation de l\'état actuel de la conversation. Il accumule les informations fournies par l\'utilisateur au fil des tours de parole pour savoir ce qui a déjà été dit et ce qui manque pour accomplir la tâche.
>
> **Politique de Dialogue (DP - Dialogue Policy) :** En fonction de l\'état du dialogue, ce module décide de la prochaine action du système (par exemple, poser une question pour obtenir une information manquante, interroger une base de données, ou confirmer une réservation).
>
> **Génération de Langage Naturel (NLG) :** Une fois l\'action décidée, ce module la transforme en une réponse textuelle compréhensible pour l\'utilisateur.

#### Agents Conversationnels Ouverts (Open-Domain)

Contrairement aux systèmes orientés tâche, les agents à domaine ouvert (souvent appelés *chatbots*) ne sont pas conçus pour accomplir une tâche précise, mais pour mener une conversation engageante et cohérente sur une multitude de sujets. Leur objectif est de simuler une conversation humaine de manière plausible. Les défis sont immenses : ils doivent posséder une vaste connaissance du monde, maintenir la cohérence sur de longs échanges, et faire preuve de personnalité. Le développement de ces systèmes a été l\'un des principaux moteurs de la recherche sur les grands modèles de langage, qui, par leur nature générative et leur vaste connaissance pré-entraînée, sont particulièrement bien adaptés à cette tâche.

### 46.3.4 Synthèse des Idées Clés et Implications de la Section

L\'étude de ces applications révèle un principe fondamental du progrès en intelligence artificielle : les applications ne sont pas de simples débouchés pour la technologie, mais des moteurs d\'innovation architecturale. La traduction automatique neuronale en est l\'exemple parfait. Le modèle encodeur-décodeur basé sur les RNNs était une avancée conceptuelle majeure, mais c\'est son application pratique à des phrases de plus en plus longues qui a mis en évidence sa faiblesse structurelle : le goulot d\'étranglement du vecteur de contexte.

Le mécanisme d\'attention n\'a pas été conçu dans un vide théorique. Il a été développé spécifiquement pour résoudre ce problème pratique et pressant en NMT. En permettant au décodeur d\'accéder dynamiquement à l\'ensemble de la représentation de la source, l\'attention a non seulement fait exploser les performances de la traduction, mais a aussi introduit une idée beaucoup plus générale et puissante : celle d\'une interaction pondérée entre tous les éléments d\'une séquence. Cette idée, née des contraintes d\'une application, s\'est avérée si fondamentale qu\'elle est devenue la pierre angulaire de l\'architecture qui allait redéfinir non seulement le TALN, mais une grande partie de l\'apprentissage profond : le Transformer. Ce cycle vertueux, où un problème concret catalyse une solution abstraite et généralisable, est une illustration parfaite du dialogue constant entre la théorie et l\'ingénierie qui caractérise l\'avancement de la science.

## 46.4 Grands Modèles de Langage (LLMs) et Ingénierie de Prompt

Nous arrivons à la dernière étape de notre parcours, qui nous mène à l\'état de l\'art actuel du Traitement du Langage Naturel. Le mécanisme d\'attention, initialement un ajout astucieux à l\'architecture encodeur-décodeur pour la traduction, devient ici le composant central et unique. En se débarrassant complètement de la récurrence, l\'architecture *Transformer* a ouvert la voie à une mise à l\'échelle des modèles d\'une ampleur jusqu\'alors inimaginable. Cette nouvelle échelle a donné naissance aux Grands Modèles de Langage (LLMs), des systèmes qui non seulement excellent dans les tâches traditionnelles du TALN, mais qui ont également fait émerger de nouvelles capacités et un paradigme d\'interaction entièrement nouveau : l\'ingénierie de prompt.

### 46.4.1 L\'Architecture Transformer : « Attention is All You Need »

En 2017, un article de recherche de Google intitulé « Attention Is All You Need » a introduit une architecture qui allait révolutionner le domaine. Le

**Transformer** a proposé de se passer entièrement des réseaux de neurones récurrents (RNNs) et convolutifs (CNNs), qui étaient jusqu\'alors les piliers des modèles de traitement de séquences, pour ne reposer que sur des mécanismes d\'attention. L\'avantage principal de cette approche est l\'élimination du traitement séquentiel inhérent aux RNNs, qui empêchait une parallélisation efficace. Avec le Transformer, tous les éléments d\'une séquence peuvent être traités simultanément, ce qui a permis d\'entraîner des modèles beaucoup plus grands sur des quantités de données beaucoup plus importantes.

Bien que cette architecture soit détaillée dans le Chapitre 44, rappelons ici ses composants essentiels :

> **Auto-attention (Self-Attention) :** C\'est le cœur du Transformer. Ce mécanisme permet à chaque token d\'une séquence d\'interagir directement avec tous les autres tokens de la même séquence. Pour chaque token, le modèle calcule trois vecteurs : une **Requête** (*Query* - Q), une **Clé** (*Key* - K) et une **Valeur** (*Value* - V). La compatibilité entre la requête d\'un token et la clé de chaque autre token est calculée (généralement par un produit scalaire), produisant des scores d\'attention. Ces scores sont normalisés via une fonction softmax pour obtenir des poids, qui sont ensuite utilisés pour calculer une somme pondérée des vecteurs Valeur. Le résultat est une nouvelle représentation pour chaque token qui est enrichie par le contexte de la séquence entière, permettant de modéliser des dépendances à longue distance de manière très efficace.
>
> **Attention Multi-têtes (Multi-Head Attention) :** Plutôt que d\'effectuer une seule opération d\'attention, le Transformer l\'exécute en parallèle dans plusieurs « têtes ». Chaque tête d\'attention apprend à se concentrer sur différents types de relations entre les mots (par exemple, une tête pourrait se spécialiser dans les relations syntaxiques, une autre dans les relations sémantiques). Les sorties de toutes les têtes sont ensuite concaténées et transformées linéairement, produisant une représentation finale beaucoup plus riche et nuancée.
>
> **Structure Encodeur-Décodeur :** Le modèle Transformer original conserve une structure encodeur-décodeur. L\'encodeur traite la séquence d\'entrée (par exemple, une phrase en français) et produit une représentation contextuelle. Le décodeur prend cette représentation et génère la séquence de sortie (la phrase en anglais), en utilisant également l\'auto-attention sur les tokens qu\'il a déjà générés.
>
> **Encodage Positionnel (Positional Encoding) :** Puisque l\'auto-attention traite tous les tokens simultanément, l\'architecture n\'a aucune information inhérente sur l\'ordre des mots dans la séquence. Pour remédier à cela, des **encodages positionnels** sont ajoutés aux plongements lexicaux à l\'entrée du modèle. Ce sont des vecteurs de même dimension que les plongements, généralement calculés à l\'aide de fonctions sinusoïdales de différentes fréquences, qui donnent à chaque position dans la séquence une signature unique et permettent au modèle d\'apprendre les relations d\'ordre.

### 46.4.2 Le Paradigme Dominant : Pré-entraînement et Ajustement Fin

Le succès des LLMs ne repose pas seulement sur l\'architecture Transformer, mais aussi sur un paradigme d\'entraînement en deux étapes qui s\'est avéré extraordinairement efficace.

> **Phase de Pré-entraînement (Pre-training) :** La première étape consiste à entraîner un modèle Transformer de très grande taille sur une tâche **auto-supervisée** en utilisant un corpus de texte massif et non étiqueté. Ce corpus peut inclure des téraoctets de données provenant d\'Internet, de livres, d\'articles, etc.. Les tâches auto-supervisées les plus courantes sont :

**Modélisation du langage (Language Modeling) :** Prédire le prochain mot d\'une séquence.

**Modélisation du langage masqué (Masked Language Modeling) :** Prédire des mots qui ont été masqués (remplacés par un token spécial \`\`) dans une phrase.

> L\'objectif de cette phase n\'est pas de spécialiser le modèle pour une tâche particulière, mais de lui faire acquérir une compréhension profonde et générale du langage : sa syntaxe, sa sémantique, ses relations logiques, et même une quantité considérable de connaissances factuelles sur le monde, encodées implicitement dans ses poids. Le résultat de cette étape est un**modèle de fondation** ou **modèle de base**.
>
> **Phase d\'Ajustement Fin (Fine-tuning) :** Une fois le modèle pré-entraîné, il peut être adapté à des tâches spécifiques. Cette seconde étape, appelée ajustement fin, consiste à continuer l\'entraînement du modèle, mais cette fois-ci sur un jeu de données beaucoup plus petit, spécifique à la tâche et étiqueté par des humains (par exemple, des critiques de films avec des étiquettes de sentiment). Comme le modèle a déjà une compréhension riche du langage, il lui faut très peu d\'exemples pour s\'adapter à la nouvelle tâche. Ce paradigme est extrêmement puissant car il mutualise le coût computationnel énorme du pré-entraînement : un seul modèle de base peut être ajusté pour des centaines de tâches différentes avec un effort relativement faible.

### 46.4.3 Architectures Fondamentales des LLMs

Bien que basés sur le Transformer, les LLMs les plus influents ont adopté des variantes architecturales spécialisées, principalement en utilisant soit la partie encodeur, soit la partie décodeur du modèle original.

> **BERT (Bidirectional Encoder Representations from Transformers) :** Développé par Google, BERT est un modèle qui utilise exclusivement la pile d\'**encodeurs** du Transformer.

**Architecture et Pré-entraînement :** BERT est pré-entraîné sur l\'objectif de **Masked Language Modeling (MLM)**. On lui présente une phrase où certains mots ont été masqués, et sa tâche est de prédire ces mots masqués. Comme l\'encodeur traite toute la phrase en une seule fois, il peut utiliser le contexte à la fois à gauche et à droite du mot masqué pour faire sa prédiction. C\'est pourquoi BERT est qualifié de **bidirectionnel**.

**Cas d\'usage :** En raison de sa compréhension contextuelle profonde et bidirectionnelle, BERT excelle dans les tâches de **compréhension du langage naturel (NLU)**. Il est idéal pour la classification de texte, la reconnaissance d\'entités nommées (NER), l\'analyse de sentiments, et la réponse à des questions où il faut extraire une réponse d\'un passage. BERT est un modèle de\
*représentation* : sa sortie principale est un plongement de haute qualité pour chaque token d\'entrée.

> **GPT (Generative Pre-trained Transformer) :** Développé par OpenAI, GPT est un modèle qui utilise exclusivement la pile de **décodeurs** du Transformer.

**Architecture et Pré-entraînement :** GPT est pré-entraîné sur l\'objectif de **modélisation de langage causale (Causal Language Modeling)**, qui est la tâche classique de prédire le prochain mot d\'une séquence. Le mécanisme d\'attention dans le décodeur est masqué pour empêcher le modèle de voir les mots futurs. Il est donc **unidirectionnel** ou **autorégressif** : il ne peut utiliser que le contexte de gauche pour faire ses prédictions.

**Cas d\'usage :** Cette nature autorégressive rend GPT intrinsèquement apte à la **génération de langage naturel (NLG)**. Il excelle dans des tâches comme la rédaction de textes, le résumé, la traduction, la génération de code et la création d\'agents conversationnels fluides et cohérents. GPT est un modèle\
*génératif* : sa fonction principale est de produire de nouvelles séquences de tokens.

Le tableau suivant résume les différences fondamentales entre ces deux familles de modèles qui ont défini le paysage des LLMs.

**Tableau 46.3 : Comparaison architecturale et fonctionnelle de BERT et GPT**

  ------------------------------------- ------------------------------------------------------------------------------ ----------------------------------------------------------------
  Caractéristique                       BERT (Bidirectional Encoder Representations from Transformers)                 GPT (Generative Pre-trained Transformer)

  **Bloc de Transformer utilisé**       Encodeur seulement                                                             Décodeur seulement

  **Directionnalité de l\'attention**   Bidirectionnelle (contexte gauche et droit)                                    Unidirectionnelle / Autorégressive (contexte gauche seulement)

  **Objectif de pré-entraînement**      Modélisation de Langage Masqué (MLM)                                           Modélisation de Langage Causale (CLM)

  **Tâches de prédilection**            Compréhension du Langage (NLU) : classification, NER, analyse de sentiments.   Génération de Langage (NLG) : rédaction, résumé, dialogue.

  **Type de modèle**                    Modèle de représentation (produit des plongements riches).                     Modèle génératif (produit de nouvelles séquences de texte).
  ------------------------------------- ------------------------------------------------------------------------------ ----------------------------------------------------------------

### 46.4.4 L\'Ingénierie de Prompt : Dialoguer avec les LLMs

Une des conséquences les plus surprenantes de la mise à l\'échelle des LLMs est l\'émergence d\'une capacité appelée **apprentissage en contexte** (*in-context learning*). Les modèles deviennent si bons à reconnaître des motifs qu\'ils peuvent apprendre à effectuer une nouvelle tâche simplement à partir de quelques exemples fournis dans l\'instruction d\'entrée (le *prompt*), sans aucune mise à jour de leurs poids. Cette découverte a donné naissance à une nouvelle discipline : l\'

**ingénierie de prompt**.

> **Apprentissage par l\'Exemple en Contexte :**

**Requêtes *Zero-shot* :** On demande au modèle d\'effectuer une tâche directement, sans lui fournir d\'exemple. Par exemple : « Traduis la phrase suivante en anglais : Le chat est sur le tapis. ».

**Requêtes *One-shot* :** On fournit au modèle un unique exemple pour lui montrer le format de sortie attendu. Par exemple : « Français: pomme -\> Anglais: apple. Français: maison -\> ».

**Requêtes *Few-shot* :** On fournit plusieurs exemples (généralement de 2 à 5) pour guider le modèle plus précisément. Cette approche est souvent la plus efficace pour obtenir des résultats de haute qualité sur des tâches complexes.

> **Techniques de Raisonnement Avancées : la Chaîne de Pensée (Chain-of-Thought)**\
> Pour les tâches qui nécessitent un raisonnement en plusieurs étapes (comme résoudre un problème mathématique ou une énigme logique), demander directement la réponse finale au modèle mène souvent à l\'échec. La technique de la **chaîne de pensée** (*Chain-of-Thought* - CoT) consiste à inciter le modèle à décomposer son raisonnement et à l\'expliciter étape par étape avant de donner la réponse finale.\
> Cette approche améliore de manière spectaculaire les capacités de raisonnement des LLMs. En forçant le modèle à générer les étapes intermédiaires, on lui alloue plus de calculs pour le problème et on contraint sa sortie à suivre un chemin logique. De manière remarquable, il suffit souvent d\'ajouter la simple phrase « Réfléchissons étape par étape » (*Let\'s think step-by-step*) à la fin d\'un prompt pour déclencher ce comportement de raisonnement (approche *zero-shot CoT*).

### 46.4.5 Synthèse des Idées Clés et Implications de la Section

L\'avènement des LLMs marque le **triomphe de l\'échelle et de la généralisation**. L\'architecture Transformer, en brisant le goulot d\'étranglement séquentiel des RNNs grâce à la parallélisation de l\'attention, a rendu possible l\'entraînement de modèles sur des volumes de données et avec un nombre de paramètres qui étaient auparavant du domaine de la science-fiction. À une certaine échelle, un changement qualitatif se produit : les modèles ne se contentent plus d\'apprendre des statistiques de surface, ils développent des capacités de généralisation qui leur permettent d\'effectuer des tâches pour lesquelles ils n\'ont pas été explicitement entraînés, simplement en suivant des instructions en langage naturel. Le paradigme pré-entraînement/ajustement fin est la concrétisation de ce principe : un investissement massif est réalisé une fois pour créer un modèle de fondation universel, qui est ensuite spécialisé à faible coût pour une myriade d\'applications. Le TALN est ainsi passé d\'un champ où l\'on construisait des milliers de modèles experts spécialisés à un champ dominé par quelques modèles généralistes massifs.

Cette transformation a également fait émerger **l\'interaction comme une nouvelle forme de programmation**. Historiquement, l\'exécution d\'une tâche par un ordinateur nécessitait un code explicite. Avec l\'apprentissage supervisé, on programmait en fournissant des milliers d\'exemples étiquetés. Avec les LLMs et l\'apprentissage en contexte, la frontière s\'estompe davantage. On « programme » désormais le modèle en dialoguant avec lui en langage naturel, en lui montrant quelques exemples dans un prompt. L\'ingénierie de prompt devient une compétence essentielle, une nouvelle interface homme-machine où le langage humain agit comme un langage de programmation de très haut niveau. Des techniques comme la chaîne de pensée peuvent être vues comme de nouvelles « structures de contrôle » dans ce paradigme, guidant le flux de raisonnement du modèle. Cela ouvre la porte à une démocratisation de la création d\'applications d\'IA, mais soulève également de nouveaux défis en matière de fiabilité, de sécurité et de contrôle du comportement de ces systèmes complexes. Le développeur de demain pourrait bien être, en partie, un « psychologue de LLMs », cherchant les incitations les plus efficaces pour obtenir le comportement désiré.



---

### Références croisées

- **Ingenierie du contexte et RAG** : voir aussi [Chapitre II.7 -- Ingenierie du Contexte et RAG](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.7_Ingenierie_Contexte_RAG.md)
- **IA comme moteur d'interoperabilite** : voir aussi [Chapitre I.11 -- L'IA comme Moteur de l'Interoperabilite](../../III - Entreprise Agentique/Volume_I_Fondations_Entreprise_Agentique/Chapitre_I.11_IA_Moteur_Interoperabilite.md)
