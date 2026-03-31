# Chapitre I.27 : Conception et Architecture Logicielle

## Introduction : L\'Art de Bâtir le Logiciel

Dans le domaine du génie civil, nul ne songerait à ériger un gratte-ciel sans des plans détaillés, sans une compréhension profonde des matériaux et sans une vision claire de la structure globale. L\'architecte conçoit la forme, la fonction et la résilience de l\'édifice, tandis que les ingénieurs et les artisans se chargent de la réalisation de chaque composant, de la fondation à la toiture. Par analogie, le génie logiciel est l\'art de construire des édifices numériques. Un logiciel, au-delà d\'une complexité minimale, n\'est pas simplement une collection de lignes de code ; c\'est un système complexe dont la longévité, la robustesse et la capacité à évoluer dépendent de la qualité de sa structure fondamentale.

Ce chapitre se consacre à l\'étude de cette structure, en explorant les deux disciplines complémentaires qui la gouvernent : l\'architecture et la conception logicielle. Bien que les termes soient parfois utilisés de manière interchangeable, il est crucial d\'en saisir la distinction pour naviguer avec succès dans la création de systèmes complexes.

L\'**architecture logicielle** est la discipline de la macro-structure. Elle s\'intéresse à la vue d\'ensemble, aux décisions de haut niveau qui façonnent le système. L\'architecte logiciel, tel son homologue du bâtiment, définit les composants majeurs du système, leurs responsabilités et, surtout, leurs interactions. Il répond à des questions fondamentales : le système sera-t-il un bloc monolithique ou un ensemble de microservices indépendants? Comment les données circuleront-elles? Comment le système garantira-t-il la performance, la sécurité et la scalabilité face à une charge croissante? Ces choix architecturaux sont stratégiques, difficiles à changer une fois mis en place, et ont un impact profond sur les attributs de qualité non fonctionnels du logiciel. L\'architecture décrit le « comment le faire » à grande échelle.

La **conception logicielle**, quant à elle, est la discipline de la micro-structure. Elle intervient à un niveau de granularité plus fin, se concentrant sur la structure interne de chaque composant identifié par l\'architecte. Si l\'architecture décide de bâtir une application en couches, la conception définit comment les classes au sein de la couche métier sont organisées. Elle s\'appuie sur des principes directeurs, tels que les principes SOLID, et des solutions éprouvées, les patrons de conception (

*design patterns*), pour s\'assurer que le code est propre, lisible, maintenable et flexible. La conception est l\'art de l\'organisation interne, de la cohésion des modules et du couplage maîtrisé entre les classes.

Le rôle de l\'**architecte logiciel** est donc celui d\'un visionnaire technique et d\'un planificateur stratégique. Il fait le pont entre les exigences métier, souvent abstraites, et les contraintes techniques concrètes. Il doit posséder une vision holistique du système, anticiper les évolutions futures et prendre des décisions qui optimiseront le cycle de vie complet du logiciel, de son développement à sa maintenance, en passant par son déploiement. L\'architecte ne se contente pas de dessiner des diagrammes ; il établit la feuille de route technique qui guidera les équipes de développement et garantira la pérennité du système.

Ce chapitre a pour vocation de fournir aux étudiants avancés, aux ingénieurs et aux futurs architectes les fondements théoriques et pratiques nécessaires pour maîtriser cet art. Nous commencerons par les fondations : les principes de conception qui doivent guider chaque ligne de code. Nous explorerons ensuite les outils de modélisation, comme UML, qui permettent de visualiser et de communiquer ces structures. Puis, nous nous élèverons au niveau de l\'architecture pour examiner les grands styles qui organisent les systèmes complexes. Enfin, nous redescendrons au niveau de la conception avec un catalogue détaillé des patrons de conception essentiels, ces solutions élégantes à des problèmes récurrents. À l\'issue de ce parcours, le lecteur sera outillé pour non seulement comprendre, mais aussi concevoir et bâtir des systèmes logiciels robustes, évolutifs et maintenables.

## 27.1 Principes Fondamentaux de Conception

### 27.1.1 Introduction aux Principes : La Quête de la Qualité

Avant d\'assembler les briques d\'un système logiciel, il est impératif de comprendre les lois physiques qui gouvernent leur solidité et leur interaction. En génie logiciel, ces lois prennent la forme de principes de conception. Ces principes ne sont pas des règles dogmatiques, mais plutôt des heuristiques, des lignes directrices éprouvées qui, lorsqu\'elles sont appliquées judicieusement, mènent à la création d\'un code de haute qualité. Un code de qualité n\'est pas seulement un code qui fonctionne ; c\'est un code qui est lisible, compréhensible, flexible, maintenable et robuste face aux inévitables changements.

La vie d\'un programme est rarement un long fleuve tranquille. Elle commence souvent par une phase de \"naissance\" où le code est pur et bien pensé. Cependant, au fil du temps, sous la pression des délais et des nouvelles exigences, des \"rustines\" sont ajoutées, des raccourcis sont pris, et le code entre dans une \"adolescence\" rebelle où les bogues se multiplient et la maintenance devient un cauchemar. Ce phénomène, connu sous le nom de

**dette technique**, est l\'accumulation de décisions de conception sous-optimales qui finissent par coûter cher en temps et en ressources.

Les principes de conception sont le principal rempart contre l\'accumulation de cette dette. Ils nous guident dans la gestion de la complexité, qui est l\'ennemi numéro un du développeur. En promouvant des concepts comme la haute cohésion (regrouper ce qui va ensemble) et le faible couplage (minimiser les dépendances entre les parties), ces principes nous aident à construire des systèmes modulaires, où un changement dans une partie du système n\'entraîne pas d\'effets de bord imprévus dans d\'autres parties.

Dans cette section, nous explorerons les principes les plus fondamentaux du génie logiciel. Nous commencerons par un examen approfondi des cinq principes **SOLID**, qui constituent le socle de la conception orientée objet moderne. Puis, nous aborderons deux autres principes universellement reconnus : **DRY** (Don\'t Repeat Yourself) et **KISS** (Keep It Simple, Stupid). Pour chaque principe, nous ne nous contenterons pas de le décrire ; nous analyserons le problème qu\'il cherche à résoudre, la solution qu\'il propose, et nous illustrerons son application par des exemples de code concrets, montrant l\'état \"avant\" (une violation du principe) et \"après\" sa refactorisation.

### 27.1.2 Les Principes SOLID : Le Fondement de la Conception Orientée Objet

L\'acronyme **SOLID** a été popularisé par Robert C. Martin (affectueusement surnommé \"Uncle Bob\") et regroupe cinq principes de conception fondamentaux pour la programmation orientée objet. Ces principes, lorsqu\'ils sont appliqués de concert, visent à produire des architectures logicielles plus compréhensibles, flexibles et maintenables. Ils sont la pierre angulaire de ce que l\'on appelle le \"Clean Code\" et constituent une philosophie de base pour des méthodologies de développement agiles.

#### A. Principe de Responsabilité Unique (SRP - **Single Responsibility Principle**)

**Énoncé**

Le Principe de Responsabilité Unique, ou SRP, est sans doute le plus fondamental et le plus cité des principes SOLID. Sa formulation la plus célèbre, par Robert C. Martin, est la suivante : « Une classe ne doit avoir qu\'une seule raison de changer ».

Cette définition est plus subtile qu\'il n\'y paraît. Elle ne signifie pas qu\'une classe ne doit faire qu\'une seule \"chose\" au sens d\'une seule méthode. Une définition plus précise, affinée par Martin lui-même, lie la \"raison de changer\" à un acteur ou un groupe d\'utilisateurs. Ainsi, une classe respecte le SRP si elle n\'est responsable que de la satisfaction des besoins d\'un seul acteur. Si une classe sert les besoins de plusieurs acteurs (par exemple, le service de la comptabilité et celui des ressources humaines), elle a plusieurs responsabilités et donc plusieurs raisons de changer, ce qui viole le principe.

**Problème Résolu**

Le SRP s\'attaque directement au problème de la **faible cohésion** et à l\'émergence des classes \"couteau-suisse\" ou \"God Objects\". Ces classes tentaculaires accumulent au fil du temps des responsabilités hétérogènes. Par exemple, une classe

Employe pourrait être responsable du calcul du salaire (logique métier de la comptabilité), de la sauvegarde de l\'employé en base de données (logique de persistance) et de la génération d\'un rapport sur les heures travaillées (logique de reporting).

Une telle concentration de responsabilités rend la classe extrêmement fragile et difficile à maintenir.

> **Couplage élevé :** Les différentes responsabilités deviennent implicitement couplées. Un changement dans le schéma de la base de données pourrait nécessiter une modification de la classe Employe, ce qui pourrait involontairement introduire un bogue dans la logique de calcul de paie.
>
> **Difficulté de test :** Tester une seule responsabilité, comme le calcul de la paie, devient complexe car il faut potentiellement mettre en place un environnement de base de données ou de reporting, même s\'ils ne sont pas directement liés au test en question.
>
> **Lisibilité et compréhension réduites :** Une classe qui fait trop de choses est difficile à comprendre. Son intention n\'est pas claire, et les développeurs peinent à identifier où et comment apporter des modifications.
>
> **Réutilisabilité limitée :** Si une autre partie de l\'application a besoin uniquement de la logique de reporting, elle ne peut pas réutiliser ce comportement sans importer également les responsabilités non désirées de calcul de paie et de persistance.

**Solution et Refactorisation**

La solution préconisée par le SRP est la **séparation des responsabilités**. Il faut décomposer la classe monolithique en plusieurs classes plus petites et hautement cohésives, où chaque classe encapsule une unique responsabilité. Cette refactorisation conduit à un code plus modulaire, où chaque module est plus facile à comprendre, à tester, à maintenir et à réutiliser.

**Exemple de Code 1 : La classe Livre**

Considérons une classe Livre qui modélise les informations d\'un livre et gère également sa persistance en base de données.

> **Avant (Violation du SRP)**
>
> C#

// Cette classe a deux responsabilités :\
// 1. Modéliser les données d\'un livre (Auteur, Titre).\
// 2. Gérer la persistance de ces données.\
public class Livre\
{\
public string Titre { get; set; }\
public string Auteur { get; set; }\
\
public void EnregistrerEnBaseDeDonnees()\
{\
// Logique pour se connecter à la base de données\
// et insérer les données du livre.\
Console.WriteLine(\$\"Enregistrement du livre \'{Titre}\' dans la BD\...\");\
}\
}

Cette classe a deux raisons de changer :

> Si le modèle de données du livre change (par exemple, ajout d\'un attribut ISBN).
>
> Si la technologie de persistance change (par exemple, passage d\'une base de données SQL à un fichier JSON ou à une API externe).
>
> **Après (Respect du SRP)**

Nous séparons les deux responsabilités en deux classes distinctes : une classe qui modélise le livre et une autre, souvent appelée Repository ou PersistenceManager, qui gère la persistance.

> C#

// Classe responsable uniquement de la modélisation des données du livre.\
public class Livre\
{\
public string Titre { get; set; }\
public string Auteur { get; set; }\
}\
\
// Classe responsable uniquement de la persistance des objets Livre.\
public class LivreRepository\
{\
public void Enregistrer(Livre livre)\
{\
// Logique pour se connecter à la base de données\
// et insérer les données du livre.\
Console.WriteLine(\$\"Enregistrement du livre \'{livre.Titre}\' dans la BD\...\");\
}\
}

Avec cette nouvelle structure, la classe Livre ne changera que si le modèle de données du livre change. La classe LivreRepository ne changera que si la logique de persistance change. Les responsabilités sont clairement délimitées, le code est plus propre, plus testable et plus maintenable.

**Exemple de Code 2 : La classe Rapport**

Imaginons un module qui doit compiler des données pour un rapport et ensuite l\'imprimer.

> **Avant (Violation du SRP)**
>
> Java

// Cette classe a deux responsabilités :\
// 1. Compiler le contenu du rapport (logique métier).\
// 2. Formater et imprimer le rapport (logique de présentation).\
public class Rapport {\
public String compilerContenu() {\
// Logique complexe pour agréger les données\
String contenu = \"Données du rapport\...\";\
System.out.println(\"Contenu du rapport compilé.\");\
return contenu;\
}\
\
public void imprimerRapportPourConsole(String contenu) {\
// Logique pour formater et afficher le rapport\
System.out.println(\"\-\-- RAPPORT \-\--\");\
System.out.println(contenu);\
System.out.println(\"\-\-\-\-\-\-\-\-\-\-\-\-\-\--\");\
}\
}

Cette classe a deux raisons de changer : si le contenu du rapport change (une modification substantielle) ou si le format d\'impression change (une modification cosmétique).

> **Après (Respect du SRP)**

Nous séparons la compilation du contenu de l\'impression.

> Java

// Classe responsable uniquement de la logique métier de compilation du contenu.\
public class CompilateurRapport {\
public String compilerContenu() {\
String contenu = \"Données du rapport\...\";\
System.out.println(\"Contenu du rapport compilé.\");\
return contenu;\
}\
}\
\
// Classe responsable uniquement de l\'impression du rapport sur la console.\
public class ImprimeurRapportConsole {\
public void imprimer(String contenu) {\
System.out.println(\"\-\-- RAPPORT \-\--\");\
System.out.println(contenu);\
System.out.println(\"\-\-\-\-\-\-\-\-\-\-\-\-\-\--\");\
}\
}\
\
// On pourrait même créer une interface pour l\'impression afin de permettre\
// d\'autres formats (PDF, HTML, etc.)\
public interface IImprimeurRapport {\
void imprimer(String contenu);\
}

Désormais, la logique métier est isolée. Si nous devons ajouter une option d\'impression en PDF, nous créerons une nouvelle classe ImprimeurRapportPDF sans toucher à CompilateurRapport. La cohésion de chaque classe est élevée, et le couplage entre les responsabilités a été éliminé.

#### B. Principe Ouvert/Fermé (OCP - **Open/Closed Principle**)

**Énoncé**

Formulé par Bertrand Meyer en 1988, le Principe Ouvert/Fermé (OCP) est le \"O\" de SOLID. Il stipule que : « Les entités logicielles (classes, modules, fonctions, etc.) doivent être ouvertes à l\'extension, mais fermées à la modification ».

En d\'autres termes, nous devrions être capables d\'ajouter de nouvelles fonctionnalités ou de modifier le comportement d\'un système sans altérer le code source existant qui a déjà été testé et validé. L\'idée est d\'étendre le comportement d\'un module, pas de le réécrire.

**Problème Résolu**

L\'OCP s\'attaque à la **rigidité** et à la **fragilité** du code. Lorsqu\'un système n\'est pas conçu selon l\'OCP, chaque nouvelle exigence métier force les développeurs à modifier du code existant. Cette pratique est risquée pour plusieurs raisons :

> **Risque de régression :** Modifier un code qui fonctionne et qui a été testé peut introduire de nouveaux bogues dans des fonctionnalités existantes.
>
> **Effet domino :** Les changements peuvent se propager en cascade à travers les modules dépendants, rendant la maintenance complexe et coûteuse.
>
> **Code \"spaghetti\" :** Les violations de l\'OCP se manifestent souvent par de longues chaînes de conditions if-else ou de blocs switch qui grandissent à chaque nouvelle fonctionnalité. Ce type de code est difficile à lire, à comprendre et à maintenir.

Imaginons une machine à café. Si pour ajouter un nouveau type de café (par exemple, un macchiato), il faut démonter la machine et souder de nouveaux circuits, elle n\'est pas fermée à la modification. Une bonne machine permettrait d\'ajouter une nouvelle capsule ou un nouveau programme sans toucher à son mécanisme interne : elle serait ouverte à l\'extension.

**Solution et Refactorisation**

La clé pour respecter l\'OCP réside dans l\'**abstraction** et le **polymorphisme**. La solution consiste à identifier les points du système qui sont susceptibles de varier et à créer des abstractions (interfaces ou classes de base abstraites) autour d\'eux.

> **Fermé à la modification :** Le code qui utilise ces abstractions dépend d\'une interface stable qui ne change pas. Ce code est donc \"fermé\".
>
> **Ouvert à l\'extension :** De nouveaux comportements peuvent être ajoutés en créant de nouvelles classes concrètes qui implémentent ces interfaces. Le système est donc \"ouvert\".

L\'inversion de dépendance est souvent le mécanisme qui permet de mettre en œuvre l\'OCP.

**Exemple de Code 1 : Le calculateur de formes**

Reprenons un exemple classique. Nous avons besoin d\'une classe capable de calculer la somme des aires de différentes formes géométriques.

> **Avant (Violation de l\'OCP)**
>
> Java

public class Rectangle {\
public double longueur;\
public double largeur;\
}\
\
public class Cercle {\
public double rayon;\
}\
\
// Cette classe doit être modifiée chaque fois qu\'une nouvelle forme est ajoutée.\
public class CalculateurAire {\
public double sommeAires(Object formes) {\
double somme = 0;\
for (Object forme : formes) {\
if (forme instanceof Rectangle) {\
Rectangle rect = (Rectangle) forme;\
somme += rect.longueur \* rect.largeur;\
} else if (forme instanceof Cercle) {\
Cercle cercle = (Cercle) forme;\
somme += Math.PI \* cercle.rayon \* cercle.rayon;\
}\
// Si on ajoute un Triangle, il faut ajouter un nouveau \"else if\" ici.\
}\
return somme;\
}\
}

La classe CalculateurAire n\'est pas fermée à la modification. Pour ajouter le calcul de l\'aire d\'un triangle, nous devons ouvrir cette classe et y ajouter une nouvelle condition. C\'est une violation directe de l\'OCP.

> **Après (Respect de l\'OCP)**

Nous introduisons une abstraction Forme que toutes les formes concrètes devront implémenter.

> Java

// Interface \"fermée\" qui définit le contrat.\
public interface Forme {\
double aire();\
}\
\
// \"Extensions\" qui implémentent le contrat.\
public class Rectangle implements Forme {\
public double longueur;\
public double largeur;\
\
\@Override\
public double aire() {\
return longueur \* largeur;\
}\
}\
\
public class Cercle implements Forme {\
public double rayon;\
\
\@Override\
public double aire() {\
return Math.PI \* rayon \* rayon;\
}\
}\
\
// La classe CalculateurAire est maintenant fermée à la modification.\
// Elle ne dépend que de l\'abstraction Forme.\
public class CalculateurAire {\
public double sommeAires(Forme formes) {\
double somme = 0;\
for (Forme forme : formes) {\
somme += forme.aire(); // Appel polymorphique\
}\
return somme;\
}\
}

Désormais, CalculateurAire est stable. Pour ajouter une nouvelle forme, comme un Triangle, il suffit de créer une nouvelle classe public class Triangle implements Forme et d\'implémenter la méthode aire(). Aucune modification n\'est nécessaire dans CalculateurAire. Le système est ouvert à l\'extension (ajout de nouvelles formes) mais fermé à la modification (le code de calcul existant n\'est pas touché).

**Exemple de Code 2 : Le service de notification**

Imaginons un service qui doit notifier les utilisateurs, initialement par courriel.

> **Avant (Violation de l\'OCP)**
>
> Java

public class ServiceNotification {\
public void notifierUtilisateur(Utilisateur user, String message, String type) {\
if (type.equals(\"email\")) {\
// Logique pour envoyer un courriel\
System.out.println(\"Envoi d\'un courriel à \" + user.getEmail() + \" : \" + message);\
}\
// Si on veut ajouter les SMS, il faut ajouter un \"else if (type.equals(\"sms\"))\"\
}\
}

Cette approche est rigide. L\'ajout d\'une nouvelle méthode de notification (SMS, push, etc.) requiert de modifier la méthode notifierUtilisateur.

> **Après (Respect de l\'OCP)**

Nous utilisons une interface pour représenter le service de notification et créons des implémentations spécifiques pour chaque type de notification. C\'est une application du patron de conception *Strategy*.

> Java

// Interface \"fermée\"\
public interface INotificateur {\
void envoyer(Utilisateur user, String message);\
}\
\
// \"Extensions\"\
public class NotificateurEmail implements INotificateur {\
\@Override\
public void envoyer(Utilisateur user, String message) {\
System.out.println(\"Envoi d\'un courriel à \" + user.getEmail() + \" : \" + message);\
}\
}\
\
public class NotificateurSMS implements INotificateur {\
\@Override\
public void envoyer(Utilisateur user, String message) {\
System.out.println(\"Envoi d\'un SMS à \" + user.getTelephone() + \" : \" + message);\
}\
}\
\
// La classe de service utilise l\'abstraction et est fermée à la modification.\
public class ServiceNotification {\
private INotificateur notificateur;\
\
// Le type de notificateur peut être injecté\
public ServiceNotification(INotificateur notificateur) {\
this.notificateur = notificateur;\
}\
\
public void notifierUtilisateur(Utilisateur user, String message) {\
this.notificateur.envoyer(user, message);\
}\
}

Pour ajouter une notification push, il suffit de créer une nouvelle classe NotificateurPush implements INotificateur. Le ServiceNotification n\'a pas besoin d\'être modifié. On peut changer le comportement du service à l\'exécution en lui injectant une instance différente de INotificateur.

#### C. Principe de Substitution de Liskov (LSP - **Liskov Substitution Principle**)

**Énoncé**

Le Principe de Substitution de Liskov, nommé d\'après Barbara Liskov, est le \"L\" de SOLID. Il établit une condition essentielle pour la création de hiérarchies d\'héritage correctes. Sa définition formelle est : « Si S est un sous-type de T, alors les objets de type T dans un programme peuvent être remplacés par des objets de type S sans altérer les propriétés désirables de ce programme ».

Plus simplement, une classe enfant (sous-type) doit pouvoir remplacer sa classe parent (super-type) sans que le programme ne se comporte de manière inattendue. Le sous-type doit respecter le contrat de son super-type.

**Problème Résolu**

Le LSP s\'attaque aux hiérarchies d\'héritage trompeuses. Parfois, une relation qui semble logique dans le monde réel (\"un carré *est un* rectangle\") ne se traduit pas correctement en programmation orientée objet. Lorsque le LSP est violé, le code client qui s\'attend à interagir avec un type de base se retrouve avec un comportement surprenant ou erroné lorsqu\'on lui fournit un sous-type.

Les symptômes d\'une violation du LSP incluent souvent :

> La nécessité pour le code client de vérifier le type d\'un objet (if (objet instanceof Carre)) avant d\'appeler ses méthodes, ce qui contrevient à l\'OCP.
>
> Des méthodes dans la classe enfant qui ne font rien, ou qui lancent une UnsupportedOperationException, parce que l\'opération n\'a pas de sens pour ce sous-type.
>
> Des sous-classes qui modifient des invariants (des règles qui doivent toujours être vraies) de la classe de base.

**Solution et Refactorisation**

Pour respecter le LSP, une sous-classe doit adhérer au contrat de sa super-classe. Cela implique plusieurs règles comportementales :

> **Signatures des méthodes :** Les types des paramètres de la méthode surchargée dans la sous-classe doivent être identiques ou plus abstraits (contravariance), et le type de retour doit être identique ou plus spécifique (covariance).
>
> **Préconditions :** Une sous-classe ne peut pas renforcer les préconditions. Elle ne peut pas exiger plus de ses entrées que la classe de base.
>
> **Postconditions :** Une sous-classe ne peut pas affaiblir les postconditions. Elle doit garantir au moins autant que la classe de base à la fin de son exécution.
>
> **Invariants :** Les invariants de la super-classe doivent être préservés par la sous-classe.
>
> **Exceptions :** La sous-classe ne doit pas lancer de types d\'exceptions que la super-classe n\'a pas déclarés.

La solution consiste souvent à repenser la hiérarchie d\'héritage, en favorisant parfois la composition à l\'héritage ou en créant des abstractions plus fines.

**Exemple de Code 1 : Le Rectangle et le Carré**

C\'est l\'exemple canonique de violation du LSP.

> **Avant (Violation du LSP)**
>
> Java

public class Rectangle {\
protected int hauteur;\
protected int largeur;\
\
public void setHauteur(int hauteur) { this.hauteur = hauteur; }\
public void setLargeur(int largeur) { this.largeur = largeur; }\
\
public int getHauteur() { return hauteur; }\
public int getLargeur() { return largeur; }\
\
public int getAire() { return hauteur \* largeur; }\
}\
\
// Un carré est un rectangle, n\'est-ce pas?\
public class Carre extends Rectangle {\
\@Override\
public void setHauteur(int hauteur) {\
super.setHauteur(hauteur);\
super.setLargeur(hauteur); // Maintient l\'invariant du carré\
}\
\
\@Override\
public void setLargeur(int largeur) {\
super.setLargeur(largeur);\
super.setHauteur(largeur); // Maintient l\'invariant du carré\
}\
}\
\
// Code client\
public class TesteurForme {\
public void testerAire(Rectangle r) {\
r.setLargeur(5);\
r.setHauteur(4);\
// Le client s\'attend à ce que l\'aire soit 20.\
assert r.getAire() == 20 : \"Comportement inattendu!\";\
}\
}

Si on passe une instance de Rectangle à testerAire, le test réussit. Mais si on passe une instance de Carre, le test échoue. En effet, r.setHauteur(4) va aussi changer la largeur à 4. L\'aire sera 16, et non 20. Le Carre n\'est pas substituable au Rectangle car il viole les attentes du client. Le contrat implicite du Rectangle (hauteur et largeur sont indépendantes) est brisé.

> **Après (Respect du LSP)**

La solution est de reconnaître que Carre et Rectangle ne partagent pas le même contrat de comportement. L\'héritage n\'est pas approprié ici. On peut créer une abstraction commune qui ne fait aucune supposition sur l\'indépendance des dimensions.

> Java

public interface FormeQuadrilatere {\
int getAire();\
}\
\
public class Rectangle implements FormeQuadrilatere {\
private int hauteur;\
private int largeur;\
\
public Rectangle(int hauteur, int largeur) {\
this.hauteur = hauteur;\
this.largeur = largeur;\
}\
\
// Getters et setters\...\
\
\@Override\
public int getAire() {\
return hauteur \* largeur;\
}\
}\
\
public class Carre implements FormeQuadrilatere {\
private int cote;\
\
public Carre(int cote) {\
this.cote = cote;\
}\
\
// Getter et setter pour cote\...\
\
\@Override\
public int getAire() {\
return cote \* cote;\
}\
}

Dans ce cas, le code client ne peut plus faire de suppositions erronées. Il doit traiter Rectangle et Carre à travers leurs interfaces spécifiques ou l\'interface commune FormeQuadrilatere qui ne promet que le calcul de l\'aire.

**Exemple de Code 2 : Les Oiseaux**

> **Avant (Violation du LSP)**
>
> Java

public abstract class Oiseau {\
public abstract void manger();\
public abstract void voler(); // Problème ici\
}\
\
public class Moineau extends Oiseau {\
\@Override public void manger() { /\*\... \*/ }\
\@Override public void voler() { /\*\... \*/ }\
}\
\
public class Manchot extends Oiseau {\
\@Override public void manger() { /\*\... \*/ }\
\
\@Override\
public void voler() {\
// Un manchot ne vole pas.\
throw new UnsupportedOperationException(\"Les manchots ne peuvent pas voler!\");\
}\
}

Un code client qui reçoit une liste d\'objets Oiseau et appelle voler() sur chacun d\'eux plantera s\'il rencontre un Manchot. Le Manchot n\'est pas substituable à un Oiseau générique si ce dernier est supposé pouvoir voler.

> **Après (Respect du LSP)**

On sépare les capacités en différentes interfaces, en appliquant le Principe de Ségrégation des Interfaces (ISP), que nous verrons ensuite.

> Java

public abstract class Oiseau {\
public abstract void manger();\
}\
\
public interface OiseauVolant {\
void voler();\
}\
\
public class Moineau extends Oiseau implements OiseauVolant {\
\@Override public void manger() { /\*\... \*/ }\
\@Override public void voler() { /\*\... \*/ }\
}\
\
public class Manchot extends Oiseau {\
\@Override public void manger() { /\*\... \*/ }\
// La méthode voler() n\'est plus présente.\
}

Maintenant, le code client qui a besoin de faire voler des oiseaux travaillera avec une collection d\'objets OiseauVolant, garantissant que chaque objet dans cette collection peut effectivement voler. Le LSP est respecté.

#### D. Principe de Ségrégation des Interfaces (ISP - **Interface Segregation Principle**)

**Énoncé**

Le Principe de Ségrégation des Interfaces, ou ISP, est le \"I\" de SOLID. Il est formulé ainsi : « Aucun client ne devrait être forcé de dépendre de méthodes qu\'il n\'utilise pas ».

En substance, ce principe préconise de créer des interfaces petites et spécifiques à un client (ou à un rôle) plutôt que de grosses interfaces générales et monolithiques. Il vaut mieux avoir plusieurs petites interfaces qu\'une seule grande.

**Problème Résolu**

L\'ISP s\'attaque au problème des **\"interfaces fourre-tout\"** (*fat interfaces*). Une interface large qui regroupe de nombreuses méthodes pour différents types de clients force les classes qui l\'implémentent à fournir une implémentation pour des méthodes dont elles n\'ont pas besoin.

Cela conduit à plusieurs problèmes :

> **Implémentations vides ou inutiles :** Les classes doivent implémenter des méthodes qui sont hors de leur champ de responsabilité, souvent en laissant le corps de la méthode vide ou en lançant une exception. Cela alourdit le code et le rend moins lisible.
>
> **Couplage indésirable :** Un changement dans une partie de l\'interface (une méthode que la classe A n\'utilise pas) force tout de même la recompilation et potentiellement la modification de la classe A et de tous les autres implémenteurs.
>
> **Violation d\'autres principes :** Forcer une classe à implémenter des méthodes inutiles peut violer le SRP (la classe a maintenant des responsabilités qu\'elle ne devrait pas avoir) et le LSP (lancer une UnsupportedOperationException est un signe classique de violation du LSP).

**Solution et Refactorisation**

La solution consiste à **ségréguer** (diviser) la grosse interface en plusieurs interfaces plus petites, chacune étant cohésive et axée sur un rôle ou une capacité spécifique. Les classes peuvent alors implémenter uniquement les interfaces qui correspondent aux fonctionnalités qu\'elles fournissent réellement.

**Exemple de Code 1 : L\'interface Travailleur**

Imaginons une interface pour des travailleurs dans une usine automatisée.

> **Avant (Violation de l\'ISP)**
>
> Java

// Interface \"fourre-tout\"\
public interface ITravailleur {\
void travailler();\
void prendrePauseDejeuner();\
}\
\
public class Humain implements ITravailleur {\
\@Override public void travailler() { /\*\... \*/ }\
\@Override public void prendrePauseDejeuner() { /\*\... \*/ }\
}\
\
public class Robot implements ITravailleur {\
\@Override public void travailler() { /\*\... \*/ }\
\
\@Override\
public void prendrePauseDejeuner() {\
// Un robot n\'a pas besoin de pause déjeuner.\
// Cette méthode est inutile ici.\
}\
}

La classe Robot est forcée de dépendre de la méthode prendrePauseDejeuner qu\'elle n\'utilise pas. C\'est une violation de l\'ISP.

> **Après (Respect de l\'ISP)**

Nous scindons l\'interface en deux interfaces plus spécifiques basées sur les capacités.

> Java

public interface Travaillable {\
void travailler();\
}\
\
public interface Mangeable {\
void prendrePauseDejeuner();\
}\
\
public class Humain implements Travaillable, Mangeable {\
\@Override public void travailler() { /\*\... \*/ }\
\@Override public void prendrePauseDejeuner() { /\*\... \*/ }\
}\
\
public class Robot implements Travaillable {\
\@Override public void travailler() { /\*\... \*/ }\
// La classe Robot n\'implémente que ce dont elle a besoin.\
}

Le code est maintenant plus propre et plus précis. La classe Robot n\'est plus polluée par une méthode qui ne la concerne pas. Les clients qui ont besoin de gérer des pauses déjeuner peuvent maintenant travailler avec l\'interface Mangeable, et ceux qui gèrent le travail avec l\'interface Travaillable.

**Exemple de Code 2 : L\'imprimante multifonction**

> **Avant (Violation de l\'ISP)**
>
> Java

public interface IAppareilMultifonction {\
void imprimer(Document d);\
void scanner(Document d);\
void faxer(Document d);\
}\
\
public class ImprimanteSimple implements IAppareilMultifonction {\
\@Override\
public void imprimer(Document d) {\
// Logique d\'impression\
}\
\
\@Override\
public void scanner(Document d) {\
throw new UnsupportedOperationException(\"Cette imprimante ne scanne pas.\");\
}\
\
\@Override\
public void faxer(Document d) {\
throw new UnsupportedOperationException(\"Cette imprimante ne faxe pas.\");\
}\
}

La classe ImprimanteSimple est obligée d\'implémenter des fonctionnalités qu\'elle ne possède pas, ce qui est une violation claire de l\'ISP.

> **Après (Respect de l\'ISP)**

On décompose la grosse interface en interfaces de rôle.

> Java

public interface IImprimante {\
void imprimer(Document d);\
}\
\
public interface IScanner {\
void scanner(Document d);\
}\
\
public interface IFax {\
void faxer(Document d);\
}\
\
// Implémente uniquement l\'interface pertinente.\
public class ImprimanteSimple implements IImprimante {\
\@Override\
public void imprimer(Document d) {\
// Logique d\'impression\
}\
}\
\
// Une machine plus complexe peut implémenter plusieurs interfaces.\
public class AppareilMultifonctionComplet implements IImprimante, IScanner, IFax {\
\@Override public void imprimer(Document d) { /\*\... \*/ }\
\@Override public void scanner(Document d) { /\*\... \*/ }\
\@Override public void faxer(Document d) { /\*\... \*/ }\
}

Cette conception est beaucoup plus flexible et précise. Chaque classe implémente uniquement les contrats qui correspondent à ses capacités, ce qui rend le système plus modulaire et plus facile à comprendre et à faire évoluer.

#### E. Principe d\'Inversion des Dépendances (DIP - **Dependency Inversion Principle**)

**Énoncé**

Le Principe d\'Inversion des Dépendances, le \"D\" de SOLID, est souvent le plus mal compris, car son nom peut être trompeur. Il ne s\'agit pas simplement d\'utiliser l\'injection de dépendances. Le principe est composé de deux assertions clés  :

> Les modules de haut niveau ne devraient pas dépendre des modules de bas niveau. Les deux devraient dépendre d\'abstractions (par exemple, des interfaces).
>
> Les abstractions ne devraient pas dépendre des détails. Les détails (implémentations concrètes) devraient dépendre des abstractions.

En d\'autres termes, le code qui contient la logique métier importante (haut niveau) ne doit pas être directement lié aux détails d\'implémentation (bas niveau) comme une base de données spécifique, un système de fichiers ou une API tierce. La direction de la dépendance est \"inversée\" : au lieu que le haut niveau dépende du bas niveau, c\'est le bas niveau (l\'implémentation) qui dépend de l\'abstraction définie par le haut niveau.

**Problème Résolu**

Le DIP combat le **couplage fort** et la **rigidité** dans l\'architecture logicielle. Dans une conception traditionnelle, les modules de haut niveau appellent directement les fonctions des modules de bas niveau, créant une dépendance directe.

ModuleHautNiveau \-\--\> ModuleBasNiveau

Cette dépendance directe est problématique :

> **Difficulté de changement :** Si l\'on veut remplacer le module de bas niveau (par exemple, changer de fournisseur de base de données de MySQL à PostgreSQL), il faut modifier le module de haut niveau, qui contient pourtant la logique métier qui, elle, n\'a pas changé.
>
> **Difficulté de test :** Pour tester le module de haut niveau, on est obligé de mettre en place tout l\'environnement du module de bas niveau (par exemple, une base de données réelle). Il est difficile de le tester de manière isolée avec des bouchons (*mocks*) ou des simulateurs (*stubs*).
>
> **Faible réutilisabilité :** Le module de haut niveau ne peut pas être réutilisé dans un autre contexte où le module de bas niveau n\'est pas disponible.

**Solution et Refactorisation**

La solution consiste à introduire une **abstraction** (généralement une interface) qui est définie par le module de haut niveau et implémentée par le module de bas niveau.

ModuleHautNiveau \-\--\> Interface \<\-\-- ModuleBasNiveau

La flèche de dépendance entre le module de haut niveau et le module de bas niveau est inversée. Maintenant, le module de haut niveau ne dépend que de l\'interface, et le module de bas niveau (le détail) dépend également de cette même interface.

L\'**injection de dépendances** (*Dependency Injection* - DI) est un patron de conception couramment utilisé pour mettre en œuvre le DIP. Au lieu que le module de haut niveau crée lui-même ses dépendances (new ModuleBasNiveau()), celles-ci lui sont fournies (\"injectées\") de l\'extérieur, généralement via son constructeur.

**Exemple de Code 1 : Le service de notification**

Considérons une classe ProcesseurCommande (haut niveau) qui doit envoyer une notification (bas niveau).

> **Avant (Violation du DIP)**
>
> Java

// Module de bas niveau (détail)\
public class NotificateurEmail {\
public void envoyerEmail(String adresse, String message) {\
// Logique d\'envoi de courriel\
System.out.println(\"Email envoyé à \" + adresse);\
}\
}\
\
// Module de haut niveau\
public class ProcesseurCommande {\
private NotificateurEmail notificateur;\
\
public ProcesseurCommande() {\
// Dépendance directe à une implémentation concrète!\
this.notificateur = new NotificateurEmail();\
}\
\
public void traiterCommande(Commande commande) {\
//\... logique de traitement\...\
this.notificateur.envoyerEmail(commande.getClient().getEmail(), \"Votre commande est traitée.\");\
}\
}

ProcesseurCommande est fortement couplé à NotificateurEmail. Pour envoyer des SMS, il faudrait modifier cette classe de haut niveau.

> **Après (Respect du DIP)**

Nous introduisons une interface INotificateur définie au niveau de la logique métier.

> Java

// Abstraction définie par le haut niveau\
public interface INotificateur {\
void envoyer(String destination, String message);\
}\
\
// Module de bas niveau (détail) qui implémente l\'abstraction\
public class NotificateurEmail implements INotificateur {\
\@Override\
public void envoyer(String destination, String message) {\
// Logique d\'envoi de courriel\
System.out.println(\"Email envoyé à \" + destination);\
}\
}\
\
// Un autre module de bas niveau\
public class NotificateurSMS implements INotificateur {\
\@Override\
public void envoyer(String destination, String message) {\
System.out.println(\"SMS envoyé à \" + destination);\
}\
}\
\
// Module de haut niveau qui dépend de l\'abstraction\
public class ProcesseurCommande {\
private final INotificateur notificateur; // Dépend de l\'interface\
\
// La dépendance est injectée, pas créée en interne\
public ProcesseurCommande(INotificateur notificateur) {\
this.notificateur = notificateur;\
}\
\
public void traiterCommande(Commande commande) {\
//\... logique de traitement\...\
this.notificateur.envoyer(commande.getClient().getEmail(), \"Votre commande est traitée.\");\
}\
}

Maintenant, ProcesseurCommande est complètement découplé des détails d\'implémentation de la notification. On peut lui fournir un NotificateurEmail ou un NotificateurSMS sans changer une seule ligne de son code. Il est facile à tester en lui injectant un NotificateurMock. La dépendance a été inversée : NotificateurEmail dépend de l\'interface INotificateur qui est définie par le besoin du module de haut niveau.

### 27.1.3 Autres Principes Essentiels

Au-delà de l\'acronyme SOLID, deux autres principes, plus concis mais tout aussi puissants, guident la pratique quotidienne du développement logiciel. Ils agissent comme des mantras pour aider les développeurs à éviter les pièges courants de la duplication et de la complexité superflue.

#### A. DRY (Don\'t Repeat Yourself)

**Énoncé**

Le principe DRY, formulé par Andy Hunt et Dave Thomas dans leur livre \"The Pragmatic Programmer\", est l\'un des principes les plus connus du génie logiciel. Sa définition formelle est : « Chaque élément de connaissance doit avoir une représentation unique, non ambiguë et faisant autorité au sein d\'un système ».

**Analyse**

Bien que souvent résumé par \"ne pas copier-coller du code\", la portée de DRY est bien plus large. Le principe ne concerne pas tant la duplication du texte (le code) que la duplication de la **connaissance** ou de l\'**intention**. Si une règle métier, un algorithme ou une constante est défini à plusieurs endroits dans une application, il existe plusieurs \"sources de vérité\". Lorsqu\'un changement est nécessaire, le développeur doit se souvenir de modifier toutes les occurrences. L\'oubli d\'une seule modification conduit à des incohérences et à des bogues difficiles à tracer.

La duplication peut se manifester à de nombreux niveaux : logique métier, requêtes de base de données, règles de validation, structures HTML/CSS, configuration, documentation, etc.. L\'objectif de DRY est de centraliser chaque élément de connaissance en un seul endroit.

**Application**

La mise en œuvre de DRY implique la **factorisation**. La logique commune doit être extraite et placée dans une entité réutilisable :

> **Fonctions ou méthodes :** Pour des blocs de code algorithmiques.
>
> **Classes ou services :** Pour des ensembles de fonctionnalités métier.
>
> **Fichiers de configuration :** Pour des paramètres comme les chaînes de connexion ou les clés d\'API.
>
> **Modèles (*templates*) :** Pour des structures d\'interface utilisateur répétitives.

Cependant, l\'application de DRY doit être faite avec discernement. Une abstraction prématurée, où du code qui se ressemble mais qui représente des connaissances métier différentes est factorisé, peut être pire que la duplication. C\'est ce que l\'on appelle \"la mauvaise abstraction\". Une heuristique courante est la \"Règle de Trois\" : attendez de voir une duplication pour la troisième fois avant de créer une abstraction. À ce stade, le véritable patron commun est généralement plus clair.

#### B. KISS (Keep It Simple, Stupid)

**Énoncé**

Le principe KISS est un précepte de conception qui préconise de privilégier la **simplicité** et d\'éviter toute complexité inutile. Bien que son origine soit attribuée à l\'ingénieur aéronautique Kelly Johnson, il est universellement applicable en génie logiciel.

**Analyse**

La plupart des systèmes fonctionnent mieux lorsqu\'ils sont simples plutôt que compliqués. Une solution simple est plus facile à :

> **Comprendre :** Le code est plus lisible et les nouveaux développeurs peuvent monter en compétence plus rapidement.
>
> **Maintenir :** Les bogues sont plus faciles à trouver et à corriger.
>
> **Faire évoluer :** Il est plus simple d\'ajouter des fonctionnalités à une base de code simple.

Le principe KISS met en garde contre la **sur-ingénierie** (*over-engineering*), qui est la tendance à concevoir des solutions plus complexes, plus robustes ou avec plus de fonctionnalités que ce qui est réellement nécessaire. Cela se produit souvent lorsque les développeurs tentent d\'anticiper des besoins futurs hypothétiques (\"au cas où\") ou pensent qu\'un problème complexe nécessite forcément une solution complexe. Le résultat est un code alourdi par des couches d\'abstraction inutiles, des patrons de conception appliqués sans discernement et une complexité accidentelle qui freine le développement.

**Application**

Appliquer KISS ne signifie pas être simpliste ou ignorer les problèmes complexes. Au contraire, trouver une solution simple à un problème complexe demande souvent une analyse plus approfondie et une meilleure compréhension du domaine.

Les stratégies pour appliquer KISS incluent :

> **Clarifier les objectifs :** Se concentrer sur ce qui est strictement nécessaire pour répondre à l\'exigence actuelle.
>
> **Décomposer les problèmes :** Diviser un problème complexe en sous-problèmes plus petits et plus simples à résoudre.
>
> **Éviter les optimisations prématurées :** Ne pas optimiser le code avant d\'avoir une version simple qui fonctionne et d\'avoir identifié de réels goulots d\'étranglement.
>
> **Choisir la solution la plus simple :** Face à plusieurs options, privilégier celle qui introduit le moins de complexité.

Le Zen de Python capture parfaitement l\'esprit de KISS : « Le simple est préférable au complexe. Le complexe est préférable au compliqué ».

### 27.1.4 Synthèse des Principes

Les principes de conception ne sont pas des entités isolées à appliquer mécaniquement. Ils forment un système de pensée cohérent, une philosophie de développement visant à maîtriser la complexité et à construire des logiciels durables. Leur véritable puissance se révèle lorsqu\'on comprend leurs interconnexions et qu\'on les utilise comme des guides plutôt que comme des dogmes.

Les principes SOLID, en particulier, sont profondément interconnectés. Une violation d\'un principe entraîne souvent, par effet domino, la violation d\'autres principes. Par exemple, une interface \"fourre-tout\" qui viole l\'**ISP** force une classe à implémenter des méthodes dont elle n\'a pas besoin. Cela l\'oblige à prendre en charge plusieurs responsabilités, violant ainsi le **SRP**. Si, pour contourner ce problème, une méthode non pertinente lance une exception, elle brise le contrat de l\'interface, violant alors le **LSP**. De même, le

**DIP** est le mécanisme qui permet de réaliser l\'**OCP** : c\'est en dépendant d\'abstractions (DIP) que l\'on peut étendre le comportement d\'un module sans le modifier (OCP). Comprendre cette synergie est essentiel : SOLID n\'est pas une simple liste de contrôle, mais un ensemble de forces qui s\'équilibrent pour produire une conception stable.

Cependant, l\'expertise ne réside pas dans la connaissance des règles, mais dans la sagesse de savoir quand et comment les appliquer. L\'application aveugle des principes peut être contre-productive. Une chasse obsessionnelle à la duplication (DRY) peut mener à des abstractions prématurées et incorrectes, qui créent plus de complexité qu\'elles n\'en résolvent. De même, une interprétation trop littérale de KISS peut conduire à des solutions simplistes qui ne répondent pas à la complexité inhérente du problème. L\'art de la conception logicielle réside dans cet équilibre délicat : utiliser les principes pour guider la réflexion, pour structurer le code de manière logique, tout en conservant le pragmatisme nécessaire pour livrer une solution efficace qui répond aux besoins réels du projet.

## 27.2 Modélisation Logicielle avec UML

### 27.2.1 Introduction à UML (Unified Modeling Language)

Si les principes de conception sont les lois de la physique qui régissent la construction de logiciels, le **Langage de Modélisation Unifié (UML)** est le langage des plans et des schémas. C\'est le langage graphique standardisé, maintenu par l\'Object Management Group (OMG), qui permet aux architectes et aux développeurs de visualiser, spécifier, construire et documenter les artefacts d\'un système logiciel.

Il est crucial de comprendre qu\'UML n\'est pas une méthodologie de développement ; il ne prescrit pas de processus spécifique. C\'est un **langage**. À l\'instar d\'une langue naturelle, il possède un vocabulaire (les éléments de modélisation comme les classes, les acteurs) et une grammaire (les règles pour combiner ces éléments). Son objectif est de fournir une notation commune et sans ambiguïté pour communiquer des idées de conception complexes.

L\'utilisation d\'UML n\'est pas une simple activité de documentation a posteriori. C\'est un puissant **outil de réflexion et de communication** tout au long du cycle de vie du projet. En phase d\'analyse, il aide à clarifier les exigences avec les parties prenantes. En phase de conception, il permet d\'explorer différentes solutions architecturales et d\'identifier les problèmes potentiels avant d\'écrire la moindre ligne de code. Durant le développement, il sert de guide pour les programmeurs.

UML propose une panoplie de diagrammes, classés en deux grandes catégories : les diagrammes structurels et les diagrammes comportementaux. Dans cette section, nous nous concentrerons sur trois des diagrammes les plus fondamentaux et les plus utilisés en pratique, qui offrent une vue complète et complémentaire d\'un système :

> **Le Diagramme de Classes**, pour la vue statique et structurelle.
>
> **Le Diagramme de Cas d\'Utilisation**, pour la vue fonctionnelle du point de vue de l\'utilisateur.
>
> **Le Diagramme de Séquence**, pour la vue dynamique des interactions entre objets.

### 27.2.2 Diagramme de Classes : La Vue Statique

**Objectif**

Le diagramme de classes est sans doute le diagramme le plus important de la modélisation orientée objet. Il constitue l\'épine dorsale de la modélisation statique d\'un système. Son objectif est de décrire la structure du système en montrant ses classes, leurs attributs (données) et leurs opérations (comportements), ainsi que les relations statiques qui les lient les unes aux autres. Il est l\'équivalent du plan d\'architecte qui montre les pièces, leurs dimensions et comment elles sont connectées, mais sans montrer les gens qui s\'y déplacent.

**Notation d\'une Classe**

Une classe est représentée par un rectangle divisé en trois compartiments superposés  :

> **Compartiment supérieur :** Contient le **nom de la classe**. Par convention, le nom d\'une classe abstraite est écrit en italique.
>
> Compartiment du milieu : Liste les attributs (ou propriétés) de la classe. La syntaxe standard est :\
> visibilité nomAttribut : type \[multiplicité\] = valeurInitiale
>
> Compartiment inférieur : Liste les opérations (ou méthodes) de la classe. La syntaxe standard est :\
> visibilité nomOpération(paramètres) : typeDeRetour

La **visibilité** d\'un attribut ou d\'une opération spécifie son niveau d\'encapsulation et est représentée par un symbole  :

> \+ : **Public** (accessible par n\'importe quelle autre classe)
>
> \- : **Privé** (accessible uniquement depuis l\'intérieur de la classe elle-même)
>
> \# : **Protégé** (accessible par la classe elle-même et ses sous-classes)
>
> \~ : **Package** (visible uniquement par les classes du même paquetage, spécifique à certains langages comme Java)

**Relations Structurelles**

Les relations entre les classes sont l\'essence même du diagramme de classes. Elles montrent comment les objets s\'associent et dépendent les uns des autres.

> Association\
> L\'association représente une relation sémantique durable entre deux ou plusieurs classes. Elle indique que les instances de ces classes sont connectées d\'une manière ou d\'une autre. Graphiquement, elle est représentée par un trait plein entre les classes.54 Une association peut être enrichie de plusieurs informations :

**Nom de l\'association :** Un verbe ou une phrase qui décrit la relation (ex: \"Travaille pour\").

**Rôles :** Le nom du rôle que joue une classe à une extrémité de l\'association (ex: \"employé\", \"employeur\").

**Multiplicité (ou cardinalité) :** Indique combien d\'instances d\'une classe peuvent être liées à une instance de l\'autre classe. Les notations courantes sont  :

1 : Exactement un.

0..1 : Zéro ou un.

\* ou 0..\* : Zéro ou plusieurs.

1..\* : Un ou plusieurs.

n : Exactement n.

**Navigabilité :** Une flèche à une extrémité indique que la navigation (la connaissance de la relation) est possible dans cette direction. L\'absence de flèches implique une navigabilité bidirectionnelle par défaut.

> Agrégation\
> L\'agrégation est une forme spécialisée d\'association qui représente une relation de type \"tout/partie\" ou \"a-un\" (has-a). Elle décrit une relation où une classe (le \"tout\", ou l\'agrégat) est composée d\'autres classes (les \"parties\"). Cependant, dans une agrégation, les parties peuvent exister indépendamment du tout. Leur cycle de vie n\'est pas lié.62\
> \
> Graphiquement, elle est représentée par un trait d\'association avec un losange vide du côté de la classe agrégat.65

**Exemple :** Une Équipe est composée de Joueurs. Si l\'équipe est dissoute, les joueurs continuent d\'exister et peuvent rejoindre d\'autres équipes.

> Composition\
> La composition est une forme forte d\'agrégation. Elle représente également une relation \"tout/partie\", mais avec une contrainte de cycle de vie forte : la partie ne peut pas exister sans le tout. Si l\'objet composite est détruit, tous ses composants le sont également.62 De plus, une partie ne peut appartenir qu\'à un seul composite à la fois.\
> \
> Graphiquement, elle est représentée par un trait d\'association avec un losange plein du côté de la classe composite.65

**Exemple :** Une Voiture est composée de Roues. Si la voiture est envoyée à la casse, ses roues le sont aussi. Une roue ne peut pas appartenir à deux voitures en même temps.

> Héritage (Généralisation/Spécialisation)\
> L\'héritage représente une relation de type \"est-un\" (is-a). Une classe (la sous-classe ou classe enfant) hérite des attributs et des opérations d\'une autre classe (la super-classe ou classe parent), et peut y ajouter ou redéfinir ses propres comportements. C\'est le mécanisme de base du polymorphisme.62\
> \
> Graphiquement, la généralisation est représentée par un trait plein avec une flèche triangulaire vide pointant de la sous-classe vers la super-classe.54

**Exemple :** Chien et Chat sont des spécialisations de la classe plus générale Animal.

### 27.2.3 Diagramme de Cas d\'Utilisation : La Vue Fonctionnelle

**Objectif**

Le diagramme de cas d\'utilisation se situe à un niveau d\'abstraction plus élevé que le diagramme de classes. Son but est de capturer et de décrire les **exigences fonctionnelles** d\'un système du point de vue de ses utilisateurs. Il modélise les interactions entre des entités externes (les acteurs) et le système lui-même. Il répond à la question : « Que fait le système? » plutôt qu\'à « Comment le fait-il? ». C\'est un excellent outil de communication avec les parties prenantes non techniques, car il est intuitif et centré sur les objectifs des utilisateurs.

**Composants**

> **Acteur :** Un acteur représente un rôle joué par une entité externe qui interagit avec le système. Il peut s\'agir d\'un utilisateur humain, d\'un autre système informatique, ou même d\'un dispositif matériel. Il est crucial de noter qu\'un acteur représente un rôle, pas une personne spécifique (par exemple, \"Caissier\" plutôt que \"Jean Dupont\"). Graphiquement, il est représenté par une **icône de bonhomme allumette**.
>
> **Cas d\'Utilisation (*Use Case*) :** Un cas d\'utilisation représente une fonctionnalité ou un service spécifique que le système fournit à un acteur pour atteindre un objectif. Il décrit une séquence d\'actions qui produit un résultat observable et de valeur pour l\'acteur. Par convention, son nom est un verbe à l\'infinitif (ex: \"Retirer de l\'argent\", \"Consulter le solde\"). Graphiquement, il est représenté par une **ellipse**.
>
> **Frontière du Système :** C\'est un **rectangle** qui délimite le système modélisé. Les cas d\'utilisation sont placés à l\'intérieur de la frontière, tandis que les acteurs sont à l\'extérieur, soulignant ainsi qu\'ils ne font pas partie du système.

**Relations**

> **Association :** C\'est la relation la plus simple, représentée par un **trait plein** entre un acteur et un cas d\'utilisation. Elle indique que l\'acteur participe à ce cas d\'utilisation.
>
> **Inclusion (\<\<include\>\>) :** Cette relation indique qu\'un cas d\'utilisation (le cas de base) inclut **obligatoirement** le comportement d\'un autre cas d\'utilisation (le cas inclus). C\'est un mécanisme pour factoriser un comportement commun à plusieurs cas d\'utilisation (par exemple, \"Vérifier l\'identité de l\'utilisateur\" peut être inclus par \"Effectuer un virement\" et \"Modifier le profil\"). Elle est représentée par une **flèche en pointillé** partant du cas de base vers le cas inclus, avec le stéréotype \<\<include\>\>.
>
> **Extension (\<\<extend\>\>) :** Cette relation modélise un comportement **optionnel** ou conditionnel. Un cas d\'utilisation (le cas d\'extension) peut étendre le comportement d\'un autre (le cas étendu) à un point précis appelé \"point d\'extension\". Par exemple, le cas \"Calculer une prime\" peut étendre le cas \"Clôturer les ventes mensuelles\" uniquement si certaines conditions de performance sont remplies. Elle est représentée par une **flèche en pointillé** partant du cas d\'extension vers le cas étendu, avec le stéréotype \<\<extend\>\>.
>
> **Généralisation :** Tout comme pour les classes, un acteur peut hériter d\'un autre acteur, et un cas d\'utilisation peut être une spécialisation d\'un autre. Par exemple, l\'acteur \"Administrateur\" peut être une généralisation des acteurs \"Gestionnaire des utilisateurs\" et \"Gestionnaire de la facturation\". La notation est la même que pour les classes : un **trait plein avec une flèche triangulaire vide** pointant vers l\'élément plus général.

### 27.2.4 Diagramme de Séquence : La Vue Dynamique

**Objectif**

Alors que le diagramme de classes montre la structure statique et que le diagramme de cas d\'utilisation montre les fonctionnalités, le diagramme de séquence se concentre sur le **comportement dynamique**. Il modélise les interactions entre un ensemble d\'objets dans un ordre chronologique, montrant la séquence des messages échangés au fil du temps pour réaliser une tâche ou un scénario spécifique. C\'est l\'outil idéal pour détailler le \"comment\" d\'un cas d\'utilisation.

**Composants**

> **Ligne de vie (*Lifeline*) :** Chaque participant (objet ou instance de classe) à l\'interaction est représenté par un rectangle avec son nom (nomObjet:NomClasse) en haut d\'une **ligne verticale en pointillé**. Cette ligne représente la durée de vie de l\'objet pendant l\'interaction.
>
> **Barre d\'activation (ou Foyer de contrôle) :** Un rectangle fin dessiné sur la ligne de vie d\'un objet indique la période pendant laquelle cet objet est actif, c\'est-à-dire qu\'il exécute une méthode.
>
> **Message :** Un message représente une communication entre deux objets. Il est dessiné comme une flèche horizontale entre les lignes de vie. Le temps s\'écoule de haut en bas.

**Message Synchrone :** L\'émetteur envoie le message et attend une réponse avant de continuer. Il est représenté par une **flèche avec une pointe pleine**.

**Message Asynchrone :** L\'émetteur envoie le message et continue son exécution sans attendre de réponse. Il est représenté par une **flèche avec une pointe ouverte**.

**Message de Retour :** Représente la valeur de retour d\'un message synchrone. Il est dessiné comme une **flèche en pointillé**.

**Message de Création/Destruction :** Des messages spécifiques peuvent montrer la création d\'un objet (flèche pointant vers le rectangle de l\'objet) ou sa destruction (flèche se terminant par un \'X\' sur la ligne de vie).

> **Fragments d\'Interaction :** Pour modéliser des logiques complexes, UML fournit des \"fragments\" qui sont des boîtes dessinées autour d\'une partie de l\'interaction. Les plus courants sont :

alt (Alternative) : Représente des choix conditionnels (équivalent à un if-then-else). La boîte est divisée en opérandes, chacun avec une condition de garde.

opt (Optionnel) : Représente un fragment qui ne s\'exécute que si une condition est vraie (équivalent à un if).

loop (Boucle) : Représente un fragment qui s\'exécute plusieurs fois, tant qu\'une condition est vraie.

### 27.2.5 Synthèse de la Modélisation

La maîtrise de la conception logicielle ne réside pas dans la connaissance isolée de chaque diagramme UML, mais dans la compréhension de leur synergie. Ces trois diagrammes --- Classes, Cas d\'Utilisation, et Séquence --- forment une **triade de modélisation** qui offre une vue complète et cohérente d\'un système, en abordant ses aspects statiques, fonctionnels et dynamiques.

Le processus de modélisation suit souvent une progression logique qui va du général au particulier, du \"quoi\" au \"comment\".

> **Le \"Quoi\" (Fonctionnel) :** Tout commence par les exigences. Le **diagramme de cas d\'utilisation** est l\'outil de choix pour capturer ce que le système doit faire du point de vue de ses utilisateurs. Il établit le périmètre fonctionnel du projet.
>
> **Le \"Qui\" (Statique) :** Une fois les fonctionnalités définies, la question suivante est : \"Quelles sont les entités ou les concepts nécessaires pour réaliser ces fonctionnalités?\". Le **diagramme de classes** répond à cette question en identifiant les \"briques\" logicielles (les classes et leurs relations) qui formeront la structure du système.
>
> **Le \"Comment\" (Dynamique) :** Enfin, pour chaque cas d\'utilisation, on doit spécifier comment les classes identifiées vont collaborer pour accomplir la tâche. Le **diagramme de séquence** est parfait pour cela, en illustrant la chorégraphie des messages échangés entre les objets au fil du temps.

Cette progression n\'est pas strictement linéaire mais itérative. La création d\'un diagramme de séquence peut révéler la nécessité d\'une nouvelle méthode dans une classe, ce qui entraîne une mise à jour du diagramme de classes. De même, la difficulté à modéliser une interaction peut indiquer qu\'un cas d\'utilisation était mal défini. C\'est cette interaction entre les différentes vues qui fait d\'UML un puissant outil de conception, permettant de valider la cohérence du modèle et de déceler les problèmes bien avant la phase de codage.

## 27.3 Architecture Logicielle

### Introduction : Au-delà du Code, la Structure

Si la conception logicielle se concentre sur la structure interne des modules, l\'**architecture logicielle** s\'élève à un niveau d\'abstraction supérieur. Elle concerne l\'organisation fondamentale d\'un système, incarnée par ses composants, leurs relations les uns avec les autres et avec l\'environnement, et les principes qui guident sa conception et son évolution. L\'architecture est l\'ensemble des décisions structurelles significatives, celles qui sont coûteuses à changer une fois mises en place.

Le rôle premier de l\'architecture n\'est pas seulement de satisfaire les exigences fonctionnelles (ce que le système fait), mais surtout de répondre aux **attributs de qualité non fonctionnels** (comment le système le fait). Ces attributs, parfois appelés les \"-ilités\" du système, incluent :

> **Performance :** La capacité du système à répondre rapidement aux requêtes.
>
> **Scalabilité :** La capacité du système à gérer une charge croissante en ajoutant des ressources.
>
> **Fiabilité / Résilience :** La capacité du système à continuer de fonctionner malgré des pannes partielles.
>
> **Maintenabilité :** La facilité avec laquelle le système peut être modifié pour corriger des défauts, ajouter des fonctionnalités ou s\'adapter à de nouveaux environnements.
>
> **Sécurité :** La capacité du système à se protéger contre les accès non autorisés et les menaces.
>
> **Déployabilité :** La facilité et la rapidité avec lesquelles de nouvelles versions du système peuvent être mises en production.

Le choix d\'une architecture est un exercice de **compromis**. Il n\'existe pas d\'architecture universellement \"meilleure\". Une architecture optimisée pour la performance peut être plus complexe à maintenir. Une architecture conçue pour une scalabilité maximale peut introduire une latence plus élevée pour les requêtes individuelles. Le rôle de l\'architecte est de comprendre les besoins prioritaires du métier et de sélectionner ou de concevoir une architecture qui réalise le meilleur équilibre entre ces attributs de qualité souvent contradictoires.

Dans cette section, nous allons explorer les principaux **styles architecturaux**, qui sont des solutions générales et réutilisables pour organiser des systèmes logiciels. Chaque style offre un vocabulaire de composants et de connecteurs, ainsi qu\'un ensemble de contraintes sur la manière de les combiner, produisant ainsi des propriétés de qualité spécifiques.

### 27.3.1 Styles Architecturaux Classiques

Les styles architecturaux classiques constituent le fondement de la conception de systèmes. Ils ont émergé au fil des décennies pour résoudre des problèmes récurrents dans l\'organisation des applications.

#### A. Architecture en Couches (N-Tiers)

**Description**

L\'architecture en couches est l\'un des styles les plus répandus et les plus intuitifs. Elle organise le système en une pile de **couches horizontales**, où chaque couche a une responsabilité technique bien définie. La règle fondamentale est qu\'une couche ne peut communiquer qu\'avec la couche immédiatement inférieure. Cette contrainte impose une séparation stricte des préoccupations.

Bien que le nombre de couches puisse varier, une architecture à quatre couches est très courante  :

> **Couche de Présentation (Interface Utilisateur) :** Responsable de l\'affichage des informations à l\'utilisateur et de la capture de ses entrées. C\'est la seule couche avec laquelle l\'utilisateur interagit directement.
>
> **Couche Métier (ou Logique Applicative) :** Contient la logique métier et les règles de l\'application. Elle orchestre les opérations en réponse aux actions de l\'utilisateur.
>
> **Couche de Persistance (ou d\'Accès aux Données) :** Fournit une abstraction pour la communication avec la source de données. Elle gère les opérations de lecture et d\'écriture.
>
> **Couche de Données (Base de Données) :** Le système de stockage physique des données (par exemple, une base de données SQL).

**Avantages**

> **Séparation des préoccupations :** C\'est le principal avantage. Chaque couche se concentre sur un aspect technique spécifique, ce qui rend le système plus facile à comprendre et à développer.
>
> **Maintenabilité et Flexibilité :** Les couches étant isolées, il est possible de modifier ou de remplacer l\'implémentation d\'une couche (par exemple, changer la base de données ou moderniser l\'interface utilisateur) sans impacter les autres couches, à condition que l\'interface de communication reste la même.
>
> **Réutilisabilité :** Les couches, en particulier les couches métier et de persistance, peuvent être réutilisées par différentes applications de présentation.

**Inconvénients**

> **Performance :** Chaque requête peut devoir traverser plusieurs couches, ce qui peut introduire une latence et une surcharge de performance.
>
> **Anti-patron du \"Sinkhole\" :** Dans certains cas, les couches intermédiaires peuvent ne faire que transmettre les requêtes à la couche inférieure sans ajouter de logique significative, ce qui ajoute une complexité inutile.
>
> **Développement non centré sur le métier :** L\'organisation par couches techniques peut parfois occulter la structure du domaine métier. Les fonctionnalités métier se retrouvent alors dispersées à travers toutes les couches, ce qui peut compliquer leur évolution.

#### B. Architecture Client-Serveur

**Description**

Ce style architectural fondamental partitionne le système en deux types de composants : les **clients** et les **serveurs**.

> **Le Serveur :** C\'est un fournisseur de ressources ou de services. Il attend passivement les requêtes des clients, les traite et renvoie les résultats. Il gère généralement les données, la logique métier et la sécurité de manière centralisée.
>
> **Le Client :** C\'est un demandeur de services. Il initie la communication en envoyant une requête au serveur. Il est responsable de l\'interface utilisateur et interagit directement avec l\'utilisateur.

Ce modèle est la base de la quasi-totalité des applications en réseau, y compris le World Wide Web (où le navigateur est le client et le serveur web est le serveur).

**Avantages**

> **Centralisation :** La gestion des données, de la sécurité et des services est centralisée sur le serveur, ce qui simplifie l\'administration, la maintenance et les mises à jour.
>
> **Évolutivité (Scalabilité) :** Il est facile d\'ajouter de nouveaux clients au système sans affecter le serveur. Le serveur lui-même peut être mis à l\'échelle (en augmentant sa puissance ou en en ajoutant d\'autres) pour répondre à une charge croissante.
>
> **Séparation claire des rôles :** La distinction entre le client (présentation) et le serveur (logique/données) est une forme de séparation des préoccupations.

**Inconvénients**

> **Point unique de défaillance (*Single Point of Failure*) :** Si le serveur tombe en panne, l\'ensemble du système devient indisponible pour tous les clients.
>
> **Goulot d\'étranglement :** Le serveur peut devenir un goulot d\'étranglement si un grand nombre de clients envoient des requêtes simultanément, ce qui peut entraîner une congestion du réseau et des temps de réponse lents.
>
> **Dépendance au réseau :** Le fonctionnement du système dépend entièrement de la fiabilité et de la performance du réseau qui relie les clients et le serveur.

#### C. Architecture Modèle-Vue-Contrôleur (MVC)

**Description**

L\'architecture MVC est un patron architectural très influent, initialement conçu pour les interfaces graphiques de bureau, mais qui est devenu extrêmement populaire pour les applications web. Il divise une application interactive en trois composants interconnectés, chacun avec des responsabilités distinctes.

> **Le Modèle (*Model*) :** C\'est le cœur de l\'application. Il gère les données, la logique métier et les règles de l\'application. Il est complètement indépendant de l\'interface utilisateur. Lorsque son état change, il notifie les vues intéressées.
>
> **La Vue (*View*) :** C\'est la représentation visuelle du modèle. Elle est responsable de l\'affichage des données à l\'utilisateur. Une vue ne contient aucune logique métier ; son seul rôle est de présenter les informations qu\'elle reçoit du modèle. Il peut y avoir plusieurs vues différentes pour un même modèle.
>
> **Le Contrôleur (*Controller*) :** Il agit comme un intermédiaire entre le modèle et la vue. Il reçoit les entrées de l\'utilisateur (clics, saisies de formulaire) via la vue, interprète ces actions, et invoque les modifications appropriées sur le modèle. Une fois le modèle mis à jour, le contrôleur peut sélectionner une vue à rafraîchir pour refléter les changements.

Le flux d\'interaction est typiquement le suivant : l\'utilisateur interagit avec la Vue, qui transmet l\'action au Contrôleur. Le Contrôleur met à jour le Modèle. Le Modèle notifie la Vue (directement ou via le contrôleur) que son état a changé, et la Vue se met à jour pour afficher les nouvelles données.

**Avantages**

> **Séparation des préoccupations :** MVC offre une séparation très claire entre la logique métier (Modèle) et la présentation (Vue), ce qui est son principal atout.
>
> **Développement parallèle :** Les développeurs d\'interface (front-end) peuvent travailler sur les Vues en même temps que les développeurs de logique (back-end) travaillent sur le Modèle et les Contrôleurs.
>
> **Réutilisabilité du code :** Un même Modèle peut être réutilisé avec plusieurs Vues différentes (par exemple, une vue web, une vue mobile, une API), ce qui favorise la réutilisation de la logique métier.
>
> **Testabilité améliorée :** La logique métier dans le Modèle peut être testée unitairement sans avoir besoin d\'une interface utilisateur, ce qui renforce la fiabilité du code.

**Inconvénients**

> **Complexité :** Pour des applications très simples, la mise en place de la structure MVC peut sembler excessive et alourdir le développement.
>
> **Prolifération de fichiers :** Une application MVC peut rapidement contenir un grand nombre de fichiers répartis dans différents dossiers (modèles, vues, contrôleurs), ce qui peut rendre la navigation dans le code complexe pour les nouveaux venus.
>
> **Couplage potentiel :** Dans les grandes applications, la communication entre les trois composants peut devenir complexe, et si elle n\'est pas gérée avec soin, un couplage excessif peut s\'installer, notamment dans le Contrôleur qui peut devenir un \"God Object\".

#### D. Architecture \"Pipes and Filters\" (Tubes et Filtres)

**Description**

Ce style architectural est particulièrement adapté au traitement de flux de données. Il décompose une tâche complexe en une séquence de composants de traitement indépendants et réutilisables appelés **filtres**, connectés par des canaux de communication unidirectionnels appelés **tubes** (*pipes*).

> **Filtre (*Filter*) :** Un filtre est un composant de traitement qui reçoit des données en entrée, effectue une transformation ou un filtrage spécifique, et produit des données en sortie. Les filtres sont indépendants les uns des autres et ne partagent pas d\'état.
>
> **Tube (*Pipe*) :** Un tube est un connecteur qui transmet le flux de données de la sortie d\'un filtre à l\'entrée du suivant. Il agit souvent comme un tampon (*buffer*), permettant aux filtres de travailler à des rythmes différents.
>
> **Source (*Pump*) :** Le point de départ du flux de données.
>
> **Puits (*Sink*) :** La destination finale du flux de données.

L\'exemple le plus célèbre de cette architecture est le shell Unix, où la sortie d\'une commande peut être \"tubée\" vers l\'entrée d\'une autre (par exemple, cat fichier.log \| grep \"erreur\" \| wc -l). Les compilateurs utilisent également ce style, avec des filtres pour l\'analyse lexicale, l\'analyse syntaxique, l\'analyse sémantique et la génération de code.

**Avantages**

> **Simplicité et Modularité :** Chaque filtre a une tâche unique et bien définie, ce qui le rend simple à comprendre, à développer et à tester.
>
> **Réutilisabilité et Composabilité :** Les filtres sont des composants autonomes qui peuvent être réutilisés et réarrangés dans différentes pipelines pour accomplir de nouvelles tâches.
>
> **Traitement parallèle :** Comme les filtres sont indépendants, ils peuvent être exécutés en parallèle sur différents threads ou même différentes machines, ce qui peut considérablement améliorer les performances.

**Inconvénients**

> **Non adapté aux systèmes interactifs :** Ce style est moins efficace pour les applications qui nécessitent des interactions complexes avec l\'utilisateur ou un état partagé entre les composants.
>
> **Surcharge de transformation de données :** Si les filtres utilisent des formats de données différents, une surcharge de performance peut être induite par la nécessité de convertir les données à chaque étape.
>
> **Gestion des erreurs :** La propagation et la gestion des erreurs à travers une longue pipeline peuvent être complexes. Une erreur dans un filtre peut affecter tous les filtres en aval.

### 27.3.2 Du Monolithe aux Microservices : L\'Évolution de la Distribution

Le débat entre les architectures monolithiques et les architectures de microservices est au cœur des discussions sur l\'architecture logicielle moderne. Il ne s\'agit pas d\'une simple préférence technique, mais d\'un choix fondamental qui impacte la manière dont les logiciels sont développés, déployés, mis à l\'échelle et maintenus, ainsi que la manière dont les équipes de développement sont organisées.

#### A. L\'Architecture Monolithique

**Description**

L\'architecture monolithique est l\'approche traditionnelle de la construction d\'applications. Le terme \"monolithe\" ne signifie pas nécessairement \"désorganisé\", mais plutôt que l\'application est conçue, développée et déployée comme une **seule unité cohésive**. Tous les composants fonctionnels --- l\'interface utilisateur, la logique métier, l\'accès aux données --- sont regroupés dans une unique base de code et déployés comme un seul fichier exécutable ou un seul répertoire.

Même si un monolithe peut être structuré en interne (par exemple, en utilisant une architecture en couches), tous ses composants partagent les mêmes ressources (CPU, mémoire) et sont inséparablement liés au moment du déploiement.

**Avantages**

> **Simplicité de développement initial :** Avec une seule base de code, le développement est simple et direct. Il n\'y a pas de complexité liée à la communication en réseau entre les composants.
>
> **Déploiement simple :** Le déploiement consiste à copier une seule unité sur un serveur, ce qui est un processus simple et bien maîtrisé.
>
> **Tests et débogage simplifiés :** Les tests de bout en bout sont plus faciles à réaliser sur une application unique. Le débogage est également plus simple, car on peut suivre une exécution complète au sein d\'un seul processus.
>
> **Performance :** La communication entre les composants se fait par des appels de fonction en mémoire, ce qui est extrêmement rapide et ne souffre pas de la latence du réseau.

**Inconvénients**

> **Difficulté de maintenance à grande échelle :** À mesure que l\'application grandit, la base de code devient énorme et complexe. Comprendre l\'impact d\'un changement devient difficile, et la vitesse de développement ralentit considérablement.
>
> **Scalabilité inefficace :** Si une seule partie de l\'application nécessite plus de ressources (par exemple, le service de traitement vidéo), il faut mettre à l\'échelle l\'ensemble de l\'application en déployant de nouvelles instances complètes du monolithe. C\'est un gaspillage de ressources.
>
> **Manque de résilience :** Une erreur ou une défaillance dans un seul composant (par exemple, une fuite de mémoire) peut faire tomber l\'ensemble de l\'application.
>
> **Barrière technologique :** Un monolithe est construit avec une seule pile technologique. Adopter un nouveau langage ou un nouveau framework est une entreprise massive et risquée qui nécessite de réécrire une grande partie de l\'application.
>
> **Déploiement lent et risqué :** Le moindre changement, même mineur, nécessite de reconstruire et de redéployer l\'ensemble de l\'application, ce qui rend les cycles de déploiement longs et risqués.

#### B. L\'Architecture Orientée Services (SOA)

L\'Architecture Orientée Services (SOA) peut être vue comme un précurseur et une philosophie plus large dont les microservices sont une implémentation spécifique. Dans une SOA, les capacités métier sont exposées sous forme de **services** réutilisables par différentes applications au sein d\'une entreprise. Ces services communiquent souvent via des protocoles standards et sont généralement orchestrés par un composant central appelé

**Enterprise Service Bus (ESB)**. La SOA visait à briser les silos d\'applications en favorisant l\'interopérabilité et la réutilisation. Cependant, les services SOA étaient souvent plus grands et plus grossièrement délimités que les microservices, et l\'ESB pouvait devenir un goulot d\'étranglement complexe.

#### C. L\'Architecture de Microservices

**Description**

L\'architecture de microservices pousse la décomposition plus loin. Elle structure une application comme une collection de **petits services autonomes**, chacun étant  :

> **Hautement maintenable et testable :** Chaque service est petit et se concentre sur une seule capacité métier.
>
> **Faiblement couplé :** Les services sont indépendants les uns des autres.
>
> **Déployable indépendamment :** Un changement dans un service peut être déployé sans affecter les autres.
>
> **Organisé autour des capacités métier :** Chaque service est responsable d\'une fonction métier de bout en bout (par exemple, \"gestion des utilisateurs\", \"panier d\'achat\", \"paiement\").
>
> **Propriétaire de ses propres données :** Pour garantir l\'autonomie, chaque microservice gère sa propre base de données. Il n\'y a pas de base de données partagée entre les services.

La communication entre les services se fait via des mécanismes légers, le plus souvent des **API HTTP/REST** pour la communication synchrone, ou des files de messages pour la communication asynchrone. Un composant appelé

**API Gateway** est souvent placé en façade pour servir de point d\'entrée unique pour les clients, en routant les requêtes vers les services appropriés.

**Avantages**

> **Scalabilité granulaire :** Chaque service peut être mis à l\'échelle indépendamment en fonction de ses besoins spécifiques, ce qui permet une utilisation optimale des ressources.
>
> **Résilience améliorée :** La défaillance d\'un service n\'entraîne pas la panne de toute l\'application. Le reste du système peut continuer à fonctionner de manière dégradée.
>
> **Flexibilité technologique :** Chaque service peut être développé avec la pile technologique (langage, base de données) la plus adaptée à sa fonction. Cela facilite l\'adoption de nouvelles technologies.
>
> **Déploiement rapide et indépendant :** Les équipes peuvent déployer leurs services de manière indépendante et fréquente, ce qui accélère la mise sur le marché de nouvelles fonctionnalités.
>
> **Autonomie des équipes :** Les microservices s\'alignent bien avec des équipes de développement petites et autonomes, chacune étant responsable du cycle de vie complet de son service (loi de Conway). Cela peut améliorer la satisfaction et la productivité des équipes.

**Inconvénients**

> **Complexité opérationnelle :** Gérer, déployer, surveiller et sécuriser des dizaines, voire des centaines de services distribués est beaucoup plus complexe que de gérer un seul monolithe. Cela nécessite des outils avancés (conteneurisation, orchestration, etc.) et une culture DevOps mature.
>
> **Complexité de la communication :** Les développeurs doivent gérer la latence du réseau, la découverte de services, la tolérance aux pannes et la cohérence des données entre les services, ce qui est intrinsèquement complexe dans un système distribué.
>
> **Débogage distribué :** Suivre une requête qui traverse plusieurs services pour diagnostiquer un problème est très difficile. Une journalisation et une surveillance centralisées sont indispensables.
>
> **Gestion des données :** Assurer la cohérence des données entre plusieurs bases de données est un défi majeur. Des patrons comme la \"Saga\" sont souvent nécessaires pour gérer les transactions distribuées.

**Tableau Comparatif : Monolithe vs. Microservices**

  --------------------------------- ---------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------
  Critère                           Architecture Monolithique                                                                                  Architecture de Microservices

  **Complexité de développement**   Faible au début, mais augmente de façon exponentielle avec la taille.                                      Élevée au début (infrastructure, communication), mais gérable à grande échelle.

  **Vitesse de déploiement**        Lente et risquée. Toute l\'application doit être redéployée pour un seul changement.                       Rapide et indépendante. Seul le service modifié est redéployé.

  **Scalabilité**                   Grossière. L\'ensemble de l\'application est mis à l\'échelle, même si une seule partie est sous charge.   Granulaire. Chaque service peut être mis à l\'échelle indépendamment.

  **Résilience**                    Faible. Une défaillance dans un module peut faire tomber toute l\'application.                             Élevée. La défaillance d\'un service n\'impacte généralement pas les autres.

  **Cohérence des données**         Forte et simple (transactions ACID au sein d\'une seule base de données).                                  Complexe. Nécessite de gérer la cohérence à terme (*eventual consistency*) et les transactions distribuées.

  **Flexibilité technologique**     Faible. Liée à une seule pile technologique.                                                               Élevée. Chaque service peut utiliser la technologie la plus appropriée.

  **Complexité opérationnelle**     Simple. Une seule application à déployer et à surveiller.                                                  Très élevée. Nécessite une automatisation et des outils avancés pour gérer un parc de services.

  **Organisation des équipes**      Favorise les équipes spécialisées par couche technique (front-end, back-end, DBA).                         Favorise des équipes pluridisciplinaires et autonomes, organisées par capacité métier.
  --------------------------------- ---------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------

### 27.3.3 Architecture Événementielle (EDA - ***Event-Driven Architecture***)

**Description**

L\'architecture événementielle (EDA) est un style architectural qui promeut la production, la détection, la consommation et la réaction à des **événements**. Un événement est un changement d\'état significatif dans le système (par exemple, \"une commande a été passée\", \"un nouvel utilisateur s\'est inscrit\"). Ce style est fondamentalement **asynchrone** et **faiblement couplé**.

Dans une EDA, les composants ne s\'appellent pas directement. Ils communiquent via un intermédiaire, souvent appelé **bus d\'événements** ou **message broker**. Le modèle se compose de trois rôles principaux :

> **Producteur d\'événements (*Producer*) :** Un composant qui détecte un changement d\'état et publie un événement sur le bus d\'événements. Le producteur ne sait pas qui consommera l\'événement, ni même s\'il sera consommé.
>
> **Consommateur d\'événements (*Consumer*) :** Un composant qui s\'abonne à certains types d\'événements sur le bus. Lorsque le bus reçoit un événement auquel il est abonné, le consommateur est notifié et exécute une logique en réaction.
>
> **Bus d\'événements (*Event Bus/Broker*) :** L\'infrastructure qui reçoit les événements des producteurs et les achemine vers les consommateurs intéressés.

Ce modèle est une implémentation à grande échelle du patron de conception **Observateur** et du patron **Producteur-Consommateur**.

**Avantages**

> **Découplage extrême :** Les producteurs et les consommateurs sont complètement découplés. Ils n\'ont pas besoin de se connaître, ce qui permet de les faire évoluer, de les déployer et de les mettre à l\'échelle de manière totalement indépendante.
>
> **Scalabilité et Élasticité :** Il est facile d\'ajouter de nouveaux consommateurs pour traiter les événements en parallèle, ce qui rend le système très scalable. Le bus d\'événements peut également absorber les pics de charge en mettant les événements en file d\'attente, ce qui améliore la résilience.
>
> **Réactivité en temps réel :** Les systèmes peuvent réagir instantanément aux événements au fur et à mesure qu\'ils se produisent, ce qui est idéal pour les applications interactives, l\'IoT ou l\'analyse de flux de données.
>
> **Extensibilité :** Pour ajouter une nouvelle fonctionnalité en réaction à un événement existant (par exemple, envoyer un SMS de bienvenue lors de l\'inscription d\'un utilisateur), il suffit d\'ajouter un nouveau consommateur qui s\'abonne à l\'événement \"UtilisateurInscrit\", sans modifier aucun des composants existants.

**Inconvénients**

> **Complexité du flux de contrôle :** Le flux d\'une transaction est distribué et asynchrone, ce qui le rend difficile à suivre, à déboguer et à raisonner. Il n\'y a pas de pile d\'appels claire.
>
> **Cohérence à terme (*Eventual Consistency*) :** Comme les mises à jour se propagent de manière asynchrone, le système n\'est pas toujours dans un état immédiatement cohérent. Il faut concevoir les applications pour tolérer cette latence, ce qui peut être complexe.
>
> **Gestion des erreurs et des garanties de livraison :** Il faut mettre en place des mécanismes robustes pour gérer les échecs de traitement d\'un événement (rejeux, files de lettres mortes) et pour garantir que les événements ne sont ni perdus ni traités plusieurs fois.
>
> **Infrastructure complexe :** La mise en place et la maintenance d\'un bus d\'événements robuste (comme Kafka, RabbitMQ ou Pulsar) ajoutent une complexité opérationnelle significative.

### 27.3.4 Synthèse Architecturale

Le choix d\'une architecture logicielle est l\'une des décisions les plus critiques dans la vie d\'un projet. Il n\'y a pas de solution miracle, pas de \"meilleure\" architecture dans l\'absolu. Chaque style architectural représente un ensemble de **compromis** qui favorise certains attributs de qualité au détriment d\'autres.

Un **monolithe** optimise la simplicité et la vitesse de développement initiales, ce qui en fait un excellent choix pour les jeunes entreprises, les prototypes ou les applications à petite échelle où le besoin d\'évoluer est incertain. Il sacrifie cependant la scalabilité granulaire et la flexibilité technologique à long terme.

Les **microservices** optimisent la scalabilité, la résilience et l\'indépendance des équipes, ce qui est crucial pour les grandes applications complexes développées par de nombreuses équipes. Ce choix se fait au prix d\'une complexité opérationnelle et distribuée considérable. La décision de migrer d\'un monolithe vers les microservices est souvent une réponse à la douleur causée par la croissance, lorsque les inconvénients du monolithe l\'emportent sur ses avantages.

L\'**architecture événementielle** pousse le découplage à son paroxysme, offrant une flexibilité et une scalabilité extraordinaires. C\'est un choix puissant pour les systèmes qui doivent être réactifs et extensibles. Cependant, cette flexibilité se paie par une complexité accrue dans la gestion du flux de contrôle et de la cohérence des données.

Le rôle de l\'architecte n\'est donc pas de connaître la \"bonne\" réponse, mais de poser les bonnes questions : Quels sont les attributs de qualité les plus critiques pour ce système? Quelle est la taille et la compétence de l\'équipe de développement? Quel est le cycle de vie attendu de l\'application? C\'est en naviguant habilement entre ces contraintes et ces compromis que l\'architecte peut choisir et adapter le style architectural qui mènera le projet au succès.

## 27.4 Patrons de Conception (Design Patterns)

### 27.4.0 Introduction aux Patrons de Conception

Si l\'architecture logicielle dessine les plans de la ville, les patrons de conception sont les plans des bâtiments types qui la composent : la maison unifamiliale, l\'immeuble de bureaux, la bibliothèque. Ce ne sont pas des plans finis, mais des schémas, des solutions éprouvées à des problèmes récurrents que l\'on rencontre dans la construction de ces bâtiments.

En génie logiciel, un **patron de conception** (*design pattern*) est une solution générale et réutilisable à un problème de conception courant dans un contexte donné. Ces patrons ne sont pas des algorithmes ou des morceaux de code à copier-coller. Ce sont des descriptions ou des modèles sur la manière d\'organiser des classes et des objets pour résoudre un problème de conception, tout en améliorant la flexibilité, l\'extensibilité et la maintenabilité du code.

Le concept a été popularisé en 1994 par le livre fondateur *Design Patterns: Elements of Reusable Object-Oriented Software*, rédigé par Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides, collectivement connus sous le nom de **\"Gang of Four\" (GoF)**. Leur ouvrage a catalogué 23 patrons fondamentaux qui sont depuis devenus une partie essentielle du vocabulaire de tout développeur orienté objet.

L\'un des plus grands avantages des patrons de conception est qu\'ils fournissent un **vocabulaire commun**. Lorsqu\'un développeur dit \"utilisons un

*Singleton* pour le gestionnaire de configuration\" ou \"implémentons une *Strategy* pour les algorithmes de tri\", l\'intention est immédiatement comprise par les autres membres de l\'équipe qui connaissent ces patrons. Cela facilite la communication et la conception collaborative.

Les patrons du GoF sont classiquement organisés en trois catégories, en fonction de leur intention  :

> **Patrons de Création (*Creational Patterns*) :** Ils concernent le processus de création d\'objets. Ils permettent de rendre un système indépendant de la manière dont ses objets sont créés, composés et représentés.
>
> **Patrons Structurels (*Structural Patterns*) :** Ils expliquent comment assembler des objets et des classes en de plus grandes structures, tout en gardant ces structures flexibles et efficaces.
>
> **Patrons Comportementaux (*Behavioral Patterns*) :** Ils se concentrent sur les algorithmes et l\'assignation des responsabilités entre les objets. Ils décrivent non seulement des patrons d\'objets ou de classes, mais aussi des patrons de communication entre eux.

Dans cette section, nous allons explorer un catalogue sélectif mais essentiel de neuf de ces patrons, trois pour chaque catégorie. Pour chaque patron, nous suivrons une structure de présentation rigoureuse pour en faciliter la compréhension et la comparaison :

> **Nom :** Le nom standard du patron.
>
> **Intention :** Un résumé concis de l\'objectif du patron.
>
> **Problème Résolu :** Une description du problème de conception spécifique que le patron adresse.
>
> **Structure :** Une description des participants (classes et/ou objets) et de leurs collaborations, souvent illustrée par une description textuelle d\'un diagramme de classes UML.
>
> **Exemple de Code :** Un exemple simple en pseudo-code ou dans un langage courant pour illustrer l\'implémentation du patron.

### 27.4.1 Patrons de Création

Les patrons de création fournissent des mécanismes d\'instanciation qui augmentent la flexibilité et la réutilisation du code en découplant le client de la création des objets qu\'il utilise.

#### A. Méthode de Fabrique (Factory Method)

> Intention\
> Définir une interface pour créer un objet, mais laisser les sous-classes décider de la classe concrète à instancier.108
>
> Problème Résolu\
> Une classe a besoin de créer des objets, mais elle ne peut pas anticiper la classe exacte de ces objets à l\'avance. Par exemple, une application de logistique peut avoir besoin de créer des objets Transport, mais le type de transport concret (Camion, Bateau, Avion) peut dépendre de la configuration ou des paramètres de l\'utilisateur. Coder directement new Camion() dans la classe de logistique la couplerait fortement à la classe Camion, violant ainsi le principe Ouvert/Fermé. Si un nouveau type de transport, comme Train, est ajouté, la classe de logistique devrait être modifiée.
>
> **Structure**

**Product (Produit) :** Définit l\'interface des objets que la méthode de fabrique crée.

**ConcreteProduct (Produit Concret) :** Implémente l\'interface Product. Ce sont les objets que nous voulons créer.

**Creator (Créateur) :** Déclare la méthode de fabrique factoryMethod(), qui retourne un objet de type Product. Le créateur peut également définir une implémentation par défaut de cette méthode.

**ConcreteCreator (Créateur Concret) :** Surcharge la méthode de fabrique pour retourner une instance d\'un ConcreteProduct spécifique.

> **Exemple de Code**
>
> Java

// Product Interface\
interface Transport {\
void livrer();\
}\
\
// ConcreteProducts\
class Camion implements Transport {\
public void livrer() {\
System.out.println(\"Livraison par camion.\");\
}\
}\
\
class Bateau implements Transport {\
public void livrer() {\
System.out.println(\"Livraison par bateau.\");\
}\
}\
\
// Creator\
abstract class Logistique {\
// La méthode de fabrique. Les sous-classes doivent l\'implémenter.\
public abstract Transport creerTransport();\
\
public void planifierLivraison() {\
// Le code du créateur ne dépend que de l\'interface Product.\
Transport t = creerTransport();\
t.livrer();\
}\
}\
\
// ConcreteCreators\
class LogistiqueRoutiere extends Logistique {\
\@Override\
public Transport creerTransport() {\
return new Camion();\
}\
}\
\
class LogistiqueMaritime extends Logistique {\
\@Override\
public Transport creerTransport() {\
return new Bateau();\
}\
}\
\
// Utilisation\
public class Application {\
public static void main(String args) {\
Logistique logistique = new LogistiqueRoutiere();\
logistique.planifierLivraison(); // Affiche \"Livraison par camion.\"\
\
logistique = new LogistiqueMaritime();\
logistique.planifierLivraison(); // Affiche \"Livraison par bateau.\"\
}\
}

#### B. Singleton

> Intention\
> S\'assurer qu\'une classe n\'a qu\'une seule et unique instance, et fournir un point d\'accès global à cette instance.111
>
> Problème Résolu\
> Certains objets, de par leur nature, doivent être uniques dans un système. Par exemple, un objet gérant la configuration de l\'application, un service de journalisation (logging), ou un objet représentant une connexion à une base de données. Il faut un moyen de garantir qu\'aucune autre instance ne peut être créée accidentellement, tout en offrant un accès facile à cette instance unique depuis n\'importe quelle partie du code. L\'utilisation d\'une variable globale est une mauvaise solution car elle ne protège pas l\'instance contre une réinitialisation accidentelle et pollue l\'espace de noms global.114
>
> Structure\
> La classe Singleton elle-même est responsable de la gestion de son instance unique.

Elle possède un **constructeur privé** pour empêcher l\'instanciation directe avec l\'opérateur new depuis l\'extérieur de la classe.

Elle contient un **champ statique privé** pour stocker son unique instance.

Elle expose une **méthode statique publique** (souvent nommée getInstance()) qui agit comme un constructeur global. Lors du premier appel, cette méthode crée l\'instance et la stocke dans le champ statique. Lors des appels suivants, elle retourne simplement l\'instance déjà créée.

> **Exemple de Code (Implémentation avec initialisation paresseuse et thread-safe)**
>
> Java

public final class GestionnaireConfiguration {\
// L\'unique instance, déclarée volatile pour garantir la visibilité entre les threads.\
private static volatile GestionnaireConfiguration instance;\
\
private String urlBaseDeDonnees;\
\
// Le constructeur est privé.\
private GestionnaireConfiguration() {\
// Charger la configuration depuis un fichier, par exemple.\
this.urlBaseDeDonnees = \"jdbc:mysql://localhost/production\";\
}\
\
// Le point d\'accès global à l\'instance.\
public static GestionnaireConfiguration getInstance() {\
// Le \"double-checked locking\" pour l\'efficacité en environnement multi-thread.\
if (instance == null) {\
synchronized (GestionnaireConfiguration.class) {\
if (instance == null) {\
instance = new GestionnaireConfiguration();\
}\
}\
}\
return instance;\
}\
\
public String getUrlBaseDeDonnees() {\
return urlBaseDeDonnees;\
}\
}\
\
// Utilisation\
public class AutreClasse {\
public void connecter() {\
String url = GestionnaireConfiguration.getInstance().getUrlBaseDeDonnees();\
System.out.println(\"Connexion à : \" + url);\
}\
}

#### C. Monteur (Builder)

> Intention\
> Séparer la construction d\'un objet complexe de sa représentation, de sorte que le même processus de construction puisse créer différentes représentations.108
>
> Problème Résolu\
> La création d\'un objet complexe nécessite l\'initialisation de nombreux champs, certains étant obligatoires et d\'autres optionnels. Cela peut conduire à deux situations problématiques :

**Constructeurs télescopiques :** On crée une multitude de constructeurs avec différentes combinaisons de paramètres, ce qui est difficile à lire et à maintenir.

Objet mutable : On utilise un constructeur simple suivi d\'une série d\'appels à des setters. Le problème est que l\'objet peut se retrouver dans un état incohérent entre le moment de sa création et la fin de sa configuration.\
Le patron Monteur résout ce problème en externalisant la construction de l\'objet dans une classe dédiée.

> **Structure**

**Builder (Monteur) :** Spécifie une interface abstraite pour créer les parties de l\'objet Product.

**ConcreteBuilder (Monteur Concret) :** Implémente l\'interface Builder et construit et assemble les parties du produit. Il fournit une méthode pour récupérer le produit final.

**Product (Produit) :** Représente l\'objet complexe en cours de construction.

**Director (Directeur) :** (Optionnel) Construit un objet en utilisant l\'interface Builder. Il définit l\'ordre des étapes de construction.

> **Exemple de Code (Implémentation fluide avec des classes internes statiques)**
>
> Java

// Product\
public class Ordinateur {\
// Paramètres obligatoires\
private final String cpu;\
private final int ram;\
// Paramètres optionnels\
private final int stockage;\
private final String carteGraphique;\
\
private Ordinateur(OrdinateurBuilder builder) {\
this.cpu = builder.cpu;\
this.ram = builder.ram;\
this.stockage = builder.stockage;\
this.carteGraphique = builder.carteGraphique;\
}\
\
\@Override\
public String toString() {\
return \"Ordinateur\";\
}\
\
// Builder (ConcreteBuilder)\
public static class OrdinateurBuilder {\
// Mêmes champs que le produit\
private final String cpu;\
private final int ram;\
private int stockage = 0;\
private String carteGraphique = \"Intégrée\";\
\
public OrdinateurBuilder(String cpu, int ram) {\
this.cpu = cpu;\
this.ram = ram;\
}\
\
public OrdinateurBuilder avecStockage(int stockage) {\
this.stockage = stockage;\
return this; // Permet le chaînage des appels\
}\
\
public OrdinateurBuilder avecCarteGraphique(String carteGraphique) {\
this.carteGraphique = carteGraphique;\
return this;\
}\
\
public Ordinateur build() {\
return new Ordinateur(this);\
}\
}\
}\
\
// Utilisation\
public class MagasinInformatique {\
public static void main(String args) {\
Ordinateur pcGamer = new Ordinateur.OrdinateurBuilder(\"Intel i9\", 32)\
.avecStockage(2000)\
.avecCarteGraphique(\"NVIDIA RTX 4090\")\
.build();\
\
Ordinateur pcBureautique = new Ordinateur.OrdinateurBuilder(\"Intel i5\", 16)\
.avecStockage(512)\
.build(); // Utilise la valeur par défaut pour la carte graphique\
\
System.out.println(pcGamer);\
System.out.println(pcBureautique);\
}\
}

### 27.4.2 Patrons Structurels

Les patrons structurels se concentrent sur la manière de composer des classes et des objets pour former de plus grandes structures, en améliorant la flexibilité et l\'efficacité de ces dernières.

#### A. Adaptateur (Adapter)

> Intention\
> Convertir l\'interface d\'une classe en une autre interface attendue par le client. L\'Adaptateur permet à des classes de collaborer alors qu\'elles ne le pourraient pas en raison d\'interfaces incompatibles.119 On l\'appelle aussi parfois\
> *Wrapper*.
>
> Problème Résolu\
> On souhaite intégrer une classe existante (par exemple, une bibliothèque tierce ou un système hérité) dans notre application, mais son interface ne correspond pas à celle requise par le reste de notre code. On ne peut pas (ou ne veut pas) modifier le code de la classe existante. Comment faire communiquer ces deux mondes incompatibles? C\'est le même problème qu\'un voyageur européen essayant de brancher son appareil sur une prise nord-américaine : il a besoin d\'un adaptateur.
>
> **Structure**

**Target (Cible) :** Définit l\'interface spécifique au domaine que le Client utilise.

**Client :** Collabore avec des objets conformes à l\'interface Target.

**Adaptee (Adapté) :** Définit une interface existante qui a besoin d\'être adaptée. C\'est la classe que l\'on veut utiliser.

**Adapter (Adaptateur) :** Adapte l\'interface de l\' Adaptee à l\'interface Target. Il contient une référence à un objet Adaptee et traduit les appels du Client en appels correspondants sur l\' Adaptee.

> **Exemple de Code**

Imaginons un lecteur de musique qui ne peut lire que des fichiers audio via une interface LecteurAudio. Nous voulons lui faire lire un nouveau format, FichierMp4, qui a une interface différente.

> Java

// Target Interface\
interface LecteurAudio {\
void jouer(String typeAudio, String nomFichier);\
}\
\
// Concrete Target\
class LecteurAudioSimple implements LecteurAudio {\
public void jouer(String typeAudio, String nomFichier) {\
if (typeAudio.equalsIgnoreCase(\"mp3\")) {\
System.out.println(\"Lecture du fichier mp3 : \" + nomFichier);\
} else {\
System.out.println(\"Format audio \" + typeAudio + \" non supporté.\");\
}\
}\
}\
\
// Adaptee Interface\
interface LecteurVideoAvance {\
void jouerMp4(String nomFichier);\
void jouerVlc(String nomFichier);\
}\
\
// Concrete Adaptee\
class LecteurMp4 implements LecteurVideoAvance {\
public void jouerMp4(String nomFichier) {\
System.out.println(\"Lecture du fichier mp4 : \" + nomFichier);\
}\
public void jouerVlc(String nomFichier) { /\* Ne fait rien \*/ }\
}\
\
// Adapter\
class AdaptateurLecteurMedia implements LecteurAudio {\
LecteurVideoAvance lecteurAvance;\
\
public AdaptateurLecteurMedia(String typeAudio) {\
if (typeAudio.equalsIgnoreCase(\"mp4\")) {\
lecteurAvance = new LecteurMp4();\
}\
// On pourrait ajouter d\'autres types ici\
}\
\
\@Override\
public void jouer(String typeAudio, String nomFichier) {\
if (typeAudio.equalsIgnoreCase(\"mp4\")) {\
lecteurAvance.jouerMp4(nomFichier);\
}\
}\
}\
\
// Client\
public class ApplicationLecteur {\
public static void main(String args) {\
LecteurAudio lecteur = new LecteurAudioSimple();\
lecteur.jouer(\"mp3\", \"beyond_the_horizon.mp3\");\
\
// Utilisation de l\'adaptateur pour lire un mp4\
LecteurAudio adaptateur = new AdaptateurLecteurMedia(\"mp4\");\
adaptateur.jouer(\"mp4\", \"alone.mp4\");\
}\
}

#### B. Décorateur (Decorator)

> Intention\
> Attacher dynamiquement des responsabilités ou des comportements supplémentaires à un objet, sans affecter les autres objets de la même classe.103
>
> Problème Résolu\
> On a besoin d\'étendre les fonctionnalités d\'un objet. L\'héritage est une solution statique : on pourrait créer une sous-classe pour chaque nouvelle fonctionnalité. Cependant, si l\'on veut combiner plusieurs fonctionnalités (par exemple, une fenêtre avec une bordure ET une barre de défilement), le nombre de sous-classes explose (FenêtreAvecBordure, FenêtreAvecBarre, FenêtreAvecBordureEtBarre\...). Le Décorateur offre une alternative flexible à l\'héritage pour étendre les fonctionnalités, en respectant le principe Ouvert/Fermé.
>
> **Structure**

**Component (Composant) :** Définit l\'interface pour les objets qui peuvent avoir des responsabilités ajoutées dynamiquement.

**ConcreteComponent (Composant Concret) :** Est un objet auquel des responsabilités supplémentaires peuvent être attachées.

**Decorator (Décorateur) :** Maintient une référence à un objet Component et définit une interface qui se conforme à celle du Component.

**ConcreteDecorator (Décorateur Concret) :** Ajoute des responsabilités à l\'objet Component. Il enveloppe le composant original et ajoute son propre comportement avant ou après avoir délégué l\'appel à l\'objet enveloppé.

> **Exemple de Code**

Imaginons que nous vendons du café et que les clients peuvent y ajouter divers suppléments (lait, sucre, chocolat\...).

> Java

// Component\
interface Cafe {\
double getCout();\
String getDescription();\
}\
\
// ConcreteComponent\
class CafeSimple implements Cafe {\
public double getCout() { return 2.0; }\
public String getDescription() { return \"Café simple\"; }\
}\
\
// Decorator\
abstract class SupplementDecorateur implements Cafe {\
protected Cafe cafeDecore;\
\
public SupplementDecorateur(Cafe cafe) {\
this.cafeDecore = cafe;\
}\
\
public double getCout() {\
return cafeDecore.getCout();\
}\
\
public String getDescription() {\
return cafeDecore.getDescription();\
}\
}\
\
// ConcreteDecorators\
class Lait extends SupplementDecorateur {\
public Lait(Cafe cafe) { super(cafe); }\
\
public double getCout() {\
return super.getCout() + 0.5;\
}\
\
public String getDescription() {\
return super.getDescription() + \", Lait\";\
}\
}\
\
class Chocolat extends SupplementDecorateur {\
public Chocolat(Cafe cafe) { super(cafe); }\
\
public double getCout() {\
return super.getCout() + 0.7;\
}\
\
public String getDescription() {\
return super.getDescription() + \", Chocolat\";\
}\
}\
\
// Utilisation\
public class CafeShop {\
public static void main(String args) {\
Cafe monCafe = new CafeSimple();\
System.out.println(monCafe.getDescription() + \" \$\" + monCafe.getCout());\
\
// On décore le café avec du lait\
monCafe = new Lait(monCafe);\
System.out.println(monCafe.getDescription() + \" \$\" + monCafe.getCout());\
\
// On décore ensuite avec du chocolat\
monCafe = new Chocolat(monCafe);\
System.out.println(monCafe.getDescription() + \" \$\" + monCafe.getCout());\
}\
}

#### C. Façade (Facade)

> Intention\
> Fournir une interface unifiée et simplifiée à un ensemble d\'interfaces dans un sous-système complexe. La Façade définit une interface de plus haut niveau qui rend le sous-système plus facile à utiliser.121
>
> Problème Résolu\
> Une application peut dépendre d\'un sous-système complexe composé de nombreuses classes et d\'interactions complexes. Le code client doit alors connaître et manipuler de nombreux objets de ce sous-système pour accomplir une tâche simple, ce qui crée un couplage fort et rend le code client difficile à écrire et à maintenir. La Façade vise à découpler le client de cette complexité.
>
> **Structure**

**Facade (Façade) :** Connaît les classes du sous-système qui sont responsables d\'une requête. Elle délègue les requêtes du client aux objets appropriés du sous-système.

**Subsystem Classes (Classes du sous-système) :** Implémentent la fonctionnalité du sous-système. Elles gèrent le travail assigné par l\'objet Facade. Elles n\'ont aucune connaissance de la façade.

> **Exemple de Code**

Imaginons un système de cinéma maison complexe avec un lecteur DVD, un projecteur, un système de son, etc. Pour regarder un film, il faut effectuer une série d\'opérations sur ces différents appareils.

> Java

// Subsystem Classes\
class Projecteur {\
public void allumer() { System.out.println(\"Projecteur allumé\"); }\
public void eteindre() { System.out.println(\"Projecteur éteint\"); }\
}\
\
class LecteurDVD {\
public void allumer() { System.out.println(\"Lecteur DVD allumé\"); }\
public void jouer(String film) { System.out.println(\"Lecture du film : \" + film); }\
public void eteindre() { System.out.println(\"Lecteur DVD éteint\"); }\
}\
\
class SystemeSon {\
public void allumer() { System.out.println(\"Système de son allumé\"); }\
public void setVolume(int niveau) { System.out.println(\"Volume réglé à \" + niveau); }\
public void eteindre() { System.out.println(\"Système de son éteint\"); }\
}\
\
// Facade\
class FacadeCinemaMaison {\
private Projecteur projecteur;\
private LecteurDVD lecteurDVD;\
private SystemeSon systemeSon;\
\
public FacadeCinemaMaison(Projecteur p, LecteurDVD l, SystemeSon s) {\
this.projecteur = p;\
this.lecteurDVD = l;\
this.systemeSon = s;\
}\
\
// Méthode simplifiée qui orchestre le sous-système\
public void regarderFilm(String film) {\
System.out.println(\"Préparation de la séance de cinéma\...\");\
projecteur.allumer();\
systemeSon.allumer();\
systemeSon.setVolume(11);\
lecteurDVD.allumer();\
lecteurDVD.jouer(film);\
}\
\
public void arreterFilm() {\
System.out.println(\"Fin de la séance de cinéma\...\");\
lecteurDVD.eteindre();\
systemeSon.eteindre();\
projecteur.eteindre();\
}\
}\
\
// Client\
public class UtilisateurCinema {\
public static void main(String args) {\
// Initialisation du sous-système\
Projecteur p = new Projecteur();\
LecteurDVD l = new LecteurDVD();\
SystemeSon s = new SystemeSon();\
\
// Création de la façade\
FacadeCinemaMaison cinema = new FacadeCinemaMaison(p, l, s);\
\
// Utilisation de l\'interface simple\
cinema.regarderFilm(\"Les Aventuriers de l\'Arche Perdue\");\
System.out.println(\"\\n\-\-- Le film est terminé \-\--\\n\");\
cinema.arreterFilm();\
}\
}

### 27.4.3 Patrons Comportementaux

Les patrons comportementaux se concentrent sur les algorithmes, la communication et l\'assignation des responsabilités entre les objets.

#### A. Observateur (Observer)

> Intention\
> Définir une dépendance un-à-plusieurs (one-to-many) entre des objets, de sorte que lorsqu\'un objet (le Sujet) change d\'état, tous ses dépendants (les Observateurs) sont notifiés et mis à jour automatiquement.125
>
> Problème Résolu\
> Plusieurs objets dans un système ont besoin de rester synchronisés avec l\'état d\'un autre objet. Un couplage fort, où le sujet connaît et met à jour directement chaque observateur, rendrait le système rigide et difficile à étendre. On a besoin d\'un mécanisme où de nouveaux observateurs peuvent s\'abonner (et se désabonner) pour recevoir des notifications sans que le sujet ait à connaître leurs classes concrètes. C\'est le principe du \"publish-subscribe\".125
>
> **Structure**

**Subject (Sujet) :** Connaît ses observateurs. Fournit une interface pour attacher et détacher des objets Observer.

**Observer (Observateur) :** Définit une interface de mise à jour pour les objets qui doivent être notifiés des changements dans un sujet.

**ConcreteSubject (Sujet Concret) :** Stocke l\'état qui intéresse les ConcreteObserver. Il envoie une notification à ses observateurs lorsque son état change.

**ConcreteObserver (Observateur Concret) :** Maintient une référence à un objet ConcreteSubject. Implémente l\'interface Observer pour garder son état cohérent avec celui du sujet.

> **Exemple de Code**

Imaginons une station météo (Sujet) qui doit notifier différents afficheurs (Observateurs) lorsque la température change.

> Java

import java.util.ArrayList;\
import java.util.List;\
\
// Observer Interface\
interface Observateur {\
void mettreAJour(float temperature);\
}\
\
// Subject Interface\
interface Sujet {\
void enregistrerObservateur(Observateur o);\
void supprimerObservateur(Observateur o);\
void notifierObservateurs();\
}\
\
// ConcreteSubject\
class StationMeteo implements Sujet {\
private List\<Observateur\> observateurs = new ArrayList\<\>();\
private float temperature;\
\
public void setTemperature(float temp) {\
this.temperature = temp;\
System.out.println(\"\\nNouvelle température : \" + temp + \"°C\");\
notifierObservateurs();\
}\
\
\@Override\
public void enregistrerObservateur(Observateur o) {\
observateurs.add(o);\
}\
\
\@Override\
public void supprimerObservateur(Observateur o) {\
observateurs.remove(o);\
}\
\
\@Override\
public void notifierObservateurs() {\
for (Observateur o : observateurs) {\
o.mettreAJour(temperature);\
}\
}\
}\
\
// ConcreteObservers\
class AfficheurTelephone implements Observateur {\
\@Override\
public void mettreAJour(float temperature) {\
System.out.println(\"Afficheur Téléphone : Température actuelle est de \" + temperature + \"°C\");\
}\
}\
\
class AfficheurWeb implements Observateur {\
\@Override\
public void mettreAJour(float temperature) {\
System.out.println(\"Afficheur Web : La météo indique \" + temperature + \"°C\");\
}\
}\
\
// Utilisation\
public class AppMeteo {\
public static void main(String args) {\
StationMeteo station = new StationMeteo();\
\
AfficheurTelephone tel = new AfficheurTelephone();\
AfficheurWeb web = new AfficheurWeb();\
\
station.enregistrerObservateur(tel);\
station.enregistrerObservateur(web);\
\
station.setTemperature(25.5f);\
station.setTemperature(27.0f);\
\
station.supprimerObservateur(web);\
station.setTemperature(26.2f);\
}\
}

#### B. Stratégie (Strategy)

> Intention\
> Définir une famille d\'algorithmes, encapsuler chacun d\'eux, et les rendre interchangeables. La Stratégie permet à l\'algorithme de varier indépendamment des clients qui l\'utilisent.108
>
> Problème Résolu\
> Une classe a besoin d\'exécuter une tâche qui peut être réalisée de plusieurs manières différentes (par exemple, trier une liste avec différents algorithmes, valider des données avec différentes règles, compresser un fichier avec différents formats). Utiliser des instructions conditionnelles (if-else ou switch) pour sélectionner l\'algorithme à l\'intérieur de la classe la rendrait complexe, difficile à maintenir et violerait le principe Ouvert/Fermé. Le patron Stratégie propose d\'extraire ces algorithmes dans des classes séparées.
>
> **Structure**

**Strategy (Stratégie) :** Déclare une interface commune à tous les algorithmes supportés.

**ConcreteStrategy (Stratégie Concrète) :** Implémente un algorithme spécifique en utilisant l\'interface Strategy.

**Context (Contexte) :** Est configuré avec un objet ConcreteStrategy. Il maintient une référence à un objet Strategy et délègue le travail à cet objet via l\'interface Strategy. Le Context ne connaît pas la classe concrète de la stratégie.

> **Exemple de Code**

Imaginons un service de paiement en ligne qui doit supporter plusieurs méthodes de paiement (carte de crédit, PayPal).

> Java

// Strategy Interface\
interface StrategiePaiement {\
void payer(int montant);\
}\
\
// ConcreteStrategies\
class PaiementCarteCredit implements StrategiePaiement {\
private String nom;\
private String numeroCarte;\
\
public PaiementCarteCredit(String nom, String num) { this.nom = nom; this.numeroCarte = num; }\
\
\@Override\
public void payer(int montant) {\
System.out.println(montant + \"€ payés avec la carte de crédit.\");\
}\
}\
\
class PaiementPayPal implements StrategiePaiement {\
private String email;\
\
public PaiementPayPal(String email) { this.email = email; }\
\
\@Override\
public void payer(int montant) {



---

### Références croisées

- **Architecture de reference convergente** : voir aussi [Chapitre 2.9 -- Architecture de Reference Convergente](../../II - Interopérabilité/Chapitre_II.9_Architecture_Reference.md)
- **Principes d'architecture reactive** : voir aussi [Chapitre I.4 -- Principes d'Architecture Reactive](../../III - Entreprise Agentique/Volume_I_Fondations_Entreprise_Agentique/Chapitre_I.4_Principes_Architecture_Reactive.md)
- **Patrons architecturaux avances (AEM)** : voir aussi [Chapitre II.9 -- Patrons Architecturaux Avances AEM](../../III - Entreprise Agentique/Volume_II_Infrastructure_Agentique/Chapitre_II.9_Patrons_Architecturaux_Avances_AEM.md)
