# P6_13-05-2021
Repo pour projet OC N°6 - SoPekocko


//// INSTALLATION ////

1) Cloner le repo du Frontend fourni
    $cd frontend
    $git clone --recursive https://github.com/WebDevLyon/P6-SoPekocko-Openclassrooms-DW.git


2) Vérifier si Node et NPM sont déjà installés sur la machine :
    $node -v
    $npm -v

3) Dans le dossier frontend (attention il s'agit du dossier "dwj-projet6"), exécuter les commandes :
    $npm install
    $npm start

L'installation peut prendre plusieurs minutes.

Installer ensuite Node Sass (dans ce même dossier "dwj-projet6"): 
$ install node-sass 


4) Lancer le server :
    $ng serve

Ne pas tenir compte des éventuels avertissements de versions (différences entres version installées sur la machine et versions du projet) mais des problèmes de compatibilité peuvent survenir. Dans ce cas, regarder ci-dessous.


5) Dans le dossier backend : initialiser le projet
    $npm init



//// DEMARRER LE PROJET ////

Lancement application Frontend (port 4200):

Terminal:
- $ cd frontend/dwj-projet6/
- $ ng serve


Lancement api backend (port 3000):

Terminal:
- $ cd backend
- $ nodemon server (ou "node server" après chaque mise à jour du fichier)




//// DEPENDANCES ////
A installer pour ce projet :

- Node JS
- NodeSass (v4.0.0)
- Angular CLI (v7)
- Express
- Body Parser (pour formater le corps des requêtes de manière exploitable)
- Mongoose (pour faciliter les interactions avec la base de données MongoDB)
- Mongoose-unique-validator (pour s'assurer que deux utilisateurs ne peuvent pas utiliser la même adresse e-mail, et pour pré-valider les infos avant leur enregistrement dans la DB)
- bcrypt (pour hachage des mots de passes)
- jsonwebtoken (pour générer et vérifier un token utilisateur)
- Multer (pour uploader des fichiers sur l'api)







//// AVERTISSEMENT INSTALLATION NVM : ////

=> You currently have modules installed globally with `npm`. These will no
=> longer be linked to the active version of Node when you install a new node
=> with `nvm`; and they may (depending on how you construct your `$PATH`)
=> override the binaries of modules installed with `nvm`:

/usr/local/lib
├── @angular/cli@11.2.8
├── nodemon@2.0.7
=> If you wish to uninstall them at a later point (or re-install them under your
=> `nvm` Nodes), you can remove them from the system Node as follows:

     $ nvm use system
     $ npm uninstall -g a_module




//// AVERTISSEMENT INSTALLATION NODE-SASS : ////

Ce projet utilise encore de vieille dépendances (versions anciennes et parfois dépréciées, comme node-sass).
Pour installer une version de node-sass compatible :
$ npm uninstall node-sass
$ npm install node-sass@4.14.1