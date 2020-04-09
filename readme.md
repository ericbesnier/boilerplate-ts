# Cahier des charges

Le client nous demande d’implémenter les choses suivantes :
- Une partie non authentifiée
- Une authentification sur leurs services
- Une gestion hors ligne des données

Nous attendons de vous des axes d’amélioration appuyés sur des remarques constructives.
Par exemple :
- Conventions
- Architecture
- Choix techniques
- Dépendances
- Implémentation de TypeScript

-------------------------------------------------------------------------------------------

# Introduction

- Partant du prototype fourni, j'ai choisi d'implémenter une application permettant de consulter (via une liste déroulante), d'ajouter, de créer et de supprimer des images. 
- L'écran d'accueil permet uniquement de consulter les vignettes et de se logger via un formulaire. Quelques images sont chargées à l'initialisation de l'application.
- Après le login, l'utilisateur est dirigé vers un écran lui permettant de consulter les vignettes, de les supprimer, d'en ajouter à partir du catalogue du mobile et d'en créer via l'appareil photo.

-------------------------------------------------------------------------------------------

# Conventions
## Améliorations

- Corriger les warnings ESLINT qui garantissent le respect des conventions de codage et la qualité du code : point-virgule, double guillemets, tabulations, etc.
- S’assurer que l’ensemble de la team utilise la même configuration.
- Respecter la règle suivante : un nom de dossier et de sous-dossier doit toujours commencer par des petites lettres et les fichiers appartiennent aux dossiers est toujours en Pascal case (exemple: modifier  le dossier ‘Homepage’ en ‘homepage’, le fichier ‘rootreduceur.ts’ en ‘RootReducer.ts’).
- S’assurer que composants, fichiers, noms de classes ⇒ Pascal case ( les mots sont liés sans espace. Chaque mot commence par une Majuscule).
- S’assurer que déclaration d'objet, variables ⇒ Camel case (les mots sont liés sans espace. Chaque mot commence par une majuscule à l’exception du premier.).
- Effectuer un refactoring quand c’est nécessaire ⇒  ES6 (ES2015).

-------------------------------------------------------------------------------------------

# Architecture
## Arborescence
L'arborescence de l'application est relativement plate, ce qui me semble plus simple à gérer.
- Sous ./src, j'ai créé :
    - un dossier pour chaque 'objet' applicatif géré : user & picture. Ils contiennent, par dossier, les écrans, les actions & le reduceur relatifs à l'objet géré. 
    - les autres dossiers sont des dossiers 'techniques'. Par exemple, redux gère l'implémentation du store.
    - le fichier RootContainer.tsx instancie le store et le persistor et lance Root
    - le fichier Root.tsx gère la navigation et initialise les images, depuis les assets au 1er lancement de l'application, puis de la base de données sqlite après.
    - un dossier api contient l'interface de stockage et l'interface du user qui permettrait la communication avec le serveur via axios par exemple. Elle contient les méthodes login/logout (simulées).
- Sous ./, on trouve classiquement, le lanceur le l'application App.tsx et un dossier pour les assets.

## Navigation
Pour la navigation, j'ai utilisé le pattern communément appelé «Protected routes». Ici, les écrans qui nécessitent que l'utilisateur soit connecté sont "protégés" et ne peuvent pas être consultés par d'autres moyens si l'utilisateur n'est pas connecté.
Ce pattern est recommandé dans la documentation de React Navigation §'Authentification Flow' (cf. https://reactnavigation.org/docs/auth-flow/)

Nous pouvons accéder aux différents écrans en fonction de certaines conditions. Par exemple, si l'utilisateur est connecté, nous pouvons accéder à Home, Profile, Settings, etc. Si l'utilisateur n'a pas signé, nous pouvons accéder aux écrans SignIn et SignUp.

Par exemple:

    isSignedIn ? (
        <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
    ) : (
        <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
    )


-------------------------------------------------------------------------------------------

# Choix techniques
- La principale divergence avec le prototype fourni est l'utilisation de sqlite, plus adapté aux stockage d'images que async-storage, notamment en terme de capacité de stockage.

-------------------------------------------------------------------------------------------

# Principales dépendances
- expo : framework très pratique pour le prototypage d'une application react-native avec son environnement de développement intégré et l'accès aux fonctionnalités de l'appareil :
    - expo-camera : accès à l'appareil photo
    - expo-image-picker : accès au catalogue du mobile
    - expo-sqlite : création de la base de données
- react / react-native / react-navigation : incontournable...
- react-native-elements : la boîte à outil pour les écrans.
- react-redux / redux : pour gérer la centralisation des données et des actions via le store.
- redux-persist : pour la persistance du store. Uniquement utilisé présentement pour gérer l'initialisation des images dans l'application, mais pourrait également gérer la persistance du login ou autre.
- redux-promise-middleware : pour réez des actions Redux avec type et payload standardisé. 
- redux-thunk : permet de gérer les actions redux de manière asynchrone.

-------------------------------------------------------------------------------------------

# Implémentation de TypeScript

J'ai choisi, dans un premier temps de développer l'application en javascript, puis de la porter en typescript dans un deuxième temps.
Pour le portage, j'ai :
- renommé les fichier en tsx
- créé un dossier interface contenant les structures user, picture, pictures, application
- créé un dossier type contenant la définition des types nécessaires à la navigation
- pour chaque composant, j'ai ajouté la définition des types nécessaires à redux

-------------------------------------------------------------------------------------------

# Documentation

La documentation de l'application est diponible sous docs/index.html