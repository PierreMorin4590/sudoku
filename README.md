# raccoon-sudoku
Création d'un sudoku en JavaScript à partir de l'API [Dosuku](https://sudoku-api.vercel.app/).

## En résumé...
Ce projet a été réalisé de façon personnelle en parallèle de ma formation de Développeur Web Fullstack PHP au sein de l'école O'clock.  

Au moment de réaliser ce projet, nous venions de terminer la phase socle de la formation O'clock.  

• Saison 1 : HTML/CSS  
• Saison 2 : Découverte des bases de PHP  
• Saison 3 : Découverte des bases de JavaScript  
• Saison 4 : Découverte de la POO en PHP & introduction aux bases de données (SQL avec MariaDB)  
• Saison 5 : Découverte de l'architecture MVC en PHP  
• Saison 6 : Architecture MVC et mise en place d'un CRUD  
• Saison 7 : Découverte du fonctionnement d'un framework PHP avec Laravel, création d'une API & JavaScript avec l'API Fetch  
• Saison 8 : Accessibilité, éco-conception, AdminSys (installation et configuration d'un serveur, accès serveur via SSH & déploiement)  

## Objectifs personnels
Les objectifs que je me suis fixé pour ce projet sont les suivants :  

&rarr; Afficher une grille de sudoku grâce à l'API [Dosuku](https://sudoku-api.vercel.app/) et à la méthode fetch().  
&rarr; Bouton "Nouvelle partie" : générer une nouvelle grille de sudoku.  
&rarr; Bouton "Vérifier" : une fois la grille remplie, on peut vérifier si notre sudoku est correct.  
&rarr; Afficher la difficulté de la grille en haut à droite de la grille.  
&rarr; Il ne doit pas être possible d'ajouter un chiffre sur une des cases déjà remplie lors de l'initialisation de la grille.  
&rarr; Si on place mal un chiffre, le chiffre apparaît en rouge et le background de la cellule passe en bleu clair.  
&rarr; Il doit être possible de placer un nouveau chiffre  sur une cellule où nous avons fait une erreur.  
&rarr; Utilisation d'une librairie pour les messages d'alert : [SweetAlert2](https://sweetalert2.github.io/).  

## Comment ça fonctionne ?
On lance une nouvelle partie avec le bouton "Nouvelle partie" et on vérifie sa grille avec la bouton "Vérifier".  

## Next step  
Les autres fonctionnalités que je souhaite mettre en place sont les suivantes :  

&rarr; Utilisation de CSS Media Queries pour rendre le jeu mobile friendly  
&rarr; Compteur d'erreurs  
&rarr; Mettre fin à la partie au bout de "x" erreurs  
&rarr; Changer la couleur de la grille en fonction de la difficulté (Easy, Medium ou Hard)  

> [!NOTE]
> Oui, j'avoue, j'aime bien les ratons laveurs :smile:  
![Meeko and Flit from the Disney movie Pocahontas](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2F0Zm0zbWZyaGJndzc4amRqaHk2Nm41djByajZqeXppd2FoOGozaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RVwRcnpTHpND2/giphy.gif)
