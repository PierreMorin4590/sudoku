const app = {

    // URL de l'API permettant de générer une grille
    proxyUrl: "https://api.allorigins.win/get?url=",
    createUrl: "https://sudoku-game-and-api.netlify.app/api/sudoku",
    contentToCopy: "",
    sudoku: null,

    init: async function () {
        console.log('app.init()');

        // On sélectionne tous les sélécteurs
        const selectors = document.querySelectorAll(".selector");

        // On place un addEventListener sur chacun des sélecteurs
        selectors.forEach(selector => {
            selector.addEventListener("click", (event) => this.handleCopyContent(event));
        });

        // On sélectionne toutes les cellules
        const cells = document.querySelectorAll(".grid");

        // On place un addEventListener sur chacune des cellules
        cells.forEach(cell => {
            cell.addEventListener("click", (event) => this.handlePasteContent(event));
        });

        // On sélectionne le button "Nouvelle partie"
        const newGame = document.querySelector('#new-game');

        // On place un addEventListener sur le button "Nouvelle partie"
        newGame.addEventListener("click", (event) => this.handleStartNewGame(event));

        // On sélectionne le button "Vérifier"
        const verifyGame = document.querySelector('#solution');

        // On place un addEventListener sur le button "Vérifier
        verifyGame.addEventListener("click", (event) => this.handleVerifyGame(event));
    },

    /**
     * Fonction asynchrone qui permet de générer une grille aléatoire de sudoku quand on clique sur le bouton "Nouvelle partie".
     * La fonction fait appel à la fonction asynchrone getSudoku() et déclenche la fonction setupGrid() qui permet de placer 
     * les chiffres dans la grille.
     */
    handleStartNewGame: async function () {
        console.log("Youhou, tu as cliqué sur Nouvelle partie !");

        // On reboot la couleur la grille (class starting-number enlevée de toutes les cellules)
        this.rebootGrid();
        // On reboot la couleur des selecteurs
        this.rebootSelectors();

        // On récupère les données du sudoku
        this.sudoku = await this.getSudoku();

        // On affiche la grille de sudoku 
        const setupGame = this.sudoku.medium;
        console.log(setupGame);

        // TODO : Gérer l'affichage de la difficulté avec la nouvelle API
        // On affiche la difficulté
        // this.displayDifficulty();

        // On appelle la fonction qui dispatche les chiffres dans la grille
        this.setupGrid(setupGame);
    },

    // TODO : Gérer l'affichage de la difficulté avec la nouvelle API
    /**
     * Fonction permettant d'afficher la difficulté du sudoku en haut à droite de l'écran.
     */
    /*
    displayDifficulty: async function () {
        // On affiche la difficulté si les données de sudoku sont disponibles
        if (this.sudoku) {
            const difficulty = this.sudoku.newboard.grids[0].difficulty;

            const difficultyScreen = document.querySelector(".difficulty");
            difficultyScreen.innerHTML = difficulty;
        };
    },
    */

    /**
     * Fonction permettant de comparer la grille du joueur avec la solution fournie par l'API
     */
    handleVerifyGame: async function () {
        console.log("Youhou, tu as cliqué sur Vérifier !");
        // On affiche la grille de sudoku si les données de sudoku sont disponibles
        if (this.sudoku) {
            // On appelle la grille à l'instant T avec la fonction getGrid()
            console.log(this.sudoku);
            const playerGrid = this.getGrid();
            console.log("Player Grid :", playerGrid);

            // On appelle la grille de la solution
            const solution = this.sudoku.data;
            console.log("Solution :", solution);

            // On compare la grille du joueur à la grille de la solution
            const result = this.compareGridAndSolution(playerGrid, solution);
            console.log(result);
            if (result === true) {
                // On utilise la library SweetAlert2 pour pas avoir le pavé gris tout moche de base ;) 
                Swal.fire({
                    title: "Bravo !",
                    html: "La grille est correctement remplie !",
                    imageUrl: "images/Raccoon happy.png",
                    imageWidth: 300,
                    imageAlt: "Un raton laveur heureux",
                });
            } else {
                // On utilise la library SweetAlert2 pour pas avoir le pavé gris tout moche de base ;) 
                Swal.fire({
                    title: "Essaie encore !",
                    html: "La grille n'est pas correctement remplie !",
                    imageUrl: "images/Raccoon sad.png",
                    imageWidth: 300,
                    imageAlt: "Un raton laveur triste",
                });
            };
        // Si les données de sudoku ne sont pas disponibles, on affiche une erreur
        } else {
            // On utilise la library SweetAlert2 pour pas avoir le pavé gris tout moche de base ;) 
            Swal.fire({
                title: "Ooops !",
                html: "La grille de Sudoku n'est pas chargée.<br>Cliquez sur Nouvelle Partie !",
                imageUrl: "images/Raccoon error.png",
                imageWidth: 300,
                imageAlt: "Un raton laveur fait face à une erreur",
            });
        }
    },

    /**
     * Fonction qui va nous permettre de comparer deux tableaux multidimensionnels
     * @param {array} tableau1 : mettre ici la grille du joueur
     * @param {array} tableau2 : mettre ici la grille de la solution
     * @returns 
     */
    compareGridAndSolution: function (tableau1, tableau2) {
        // On vérifie si les deux tableaux ont la même longueur
        if (tableau1.length !== tableau2.length) {
            return false;
        }

        // On check les éléments des deux tableaux
        for (let index = 0; index < tableau1.length; index++) {
            // On vérifie si les sous-tableaux des deux tableaux ont la même longueur
            if (tableau1[index].length !== tableau2[index].length) {
                return false;
            }

            // On compare les éléments des sous-tableaux
            for (let subIndex = 0; subIndex < tableau1[index].length; subIndex++) {
                // Si il y a une différence, on retourne false
                if (tableau1[index][subIndex] !== tableau2[index][subIndex]) {
                    return false;
                }
            }
        }
        // Si les comparaisons des tableaux et sous-tableaux sont égaux, on retourne true
        return true;
    },

    compareCellAndSolution: function(event) {
        // On récupère la cellule dans laquelle le chiffre est placée
        const actualCell = event.currentTarget.classList[2];

        // On récupère la valeur de la cellule où le chiffre est placé
        const cellValue = event.currentTarget.innerHTML;
        const cell = parseInt(cellValue);
        console.log("Valeur cellule :", cell);

        // On extrait du nom de la classe, l'indicatif de la ligne et celui de la colonne
        // (ex: class "cell-4-5", on extrait "4" et "5")
        const row = actualCell.substr(5, 1);
        console.log(row);
        const col = actualCell.substr(7, 1);
        console.log(col);

        // Cela va nous permettre de naviguer dans le tableau de la solution
        // pour récupérer la valeur similaire au même endroit
        const similarCell = this.sudoku.data;
            console.log("Solution :", similarCell);
        const cellSolution = similarCell[row][col];
        console.log("Valeur case similaire :", cellSolution);

        // Si les deux valeurs sont différentes on passe la background en rougle clair pour indiquer une erreur
        if (cell !== cellSolution) {
            event.currentTarget.classList.add("error");
        } else {
            event.currentTarget.classList.remove("error");
        }

    },

    /**
     * Fonction permettant de supprimer la class seclected des sélecteurs de chiffre
     */
    rebootSelectors() {
        // On sélectionne les sélecteurs
        const selectors = document.querySelectorAll(".selector");

        // On reboot la class "selected"
        selectors.forEach(selector => {
            selector.classList.remove("selected");
        });
    },

    /**
     * Fonction permettant de supprimer les classes starting-number & error des cellules du tableau avant une nouvelle partie
     */
    rebootGrid() {
        // On sélectionne toutes les cases de la grille
        const grid = document.querySelectorAll(".grid");

        // On supprime les class starting-number & error
        grid.forEach(cell => {
            cell.classList.remove("starting-number");
            cell.classList.remove("error");
        });
    },

    /**
     * Fonction qui va permettre de copier le contenu d'une des cases du sélecteur de chiffre
     * @param {*} event 
     */
    handleCopyContent: function (event) {
        console.log("J'ai copié !");
        this.rebootSelectors();

        // On ajoute une classe "selected" au chiffre sélectionné pour le rendre plus visible
        const selectorClicked = event.currentTarget;
        console.log("Chiffre sélectionné :", selectorClicked);
        selectorClicked.classList.toggle("selected");

        // On récupère le contenu texte de la case
        const sourceNumber = event.currentTarget.textContent;

        // On construit la classe de source en fonction du numéro choisi
        const sourceClass = '.selector:nth-child(' + sourceNumber + ')';
        console.log(sourceClass);

        // On sélectionne la source par sa classe
        const sourceDiv = document.querySelector(sourceClass);

        // On vérifie si l'élément source est présent
        if (sourceDiv) {
            // Si oui, on colle le contenu de la source
            contentToCopy = parseInt(sourceDiv.innerHTML);
            console.log("Contenu à copier :", contentToCopy);
        }
    },

    /**
     * Fonction qui va permettre de coller le contenu d'une des cases du sélecteur de chiffre dans les cases de la grille
     * @param {*} event 
     */
    handlePasteContent: function (event) {
        console.log("J'ai collé !");

        // On sélectionne la troisième classe de la cellule cliquée
        const destinationNumber = event.currentTarget.classList[2];

        // On construit la classe de destination en fonction du numéro choisi
        const destinationClass = '.' + destinationNumber;
        console.log(destinationClass);

        // On sélectionne la destination par sa classe
        const destinationDiv = document.querySelector(destinationClass);
        console.log(destinationDiv);

        // On vérifie si la case est déjà occupée ou non par un chiffre de la grille générée aléatoirement, 
        // si c'est le cas, on return pour empêcher de coller un chiffre différent !
        if (destinationDiv.classList.contains("starting-number")) {
            return;
        };

        // Sinon, on vérifie si l'élément destination est présent et s'il y a du contenu à coller
        if (destinationDiv && contentToCopy !== "") {
            // Si oui, on colle le contenu dans la destination
            destinationDiv.innerHTML = contentToCopy;
            parseInt(destinationDiv.innerHTML);
            console.log(destinationDiv.innerHTML);
        };

        // On vérifie si le chiffre collé est correct par rapport à la solution
        this.compareCellAndSolution(event);
    },

    /**
     * Fonction asynchrone qui va nous permettre d'aller récupérer une grille aléatoire de sudoku grâce à l'API Fetch et à la méthode fetch()
     * @returns 
     */
    getSudoku: async function () {
        try {

            const urlToFetch = `${this.proxyUrl}${this.createUrl}`;
            // fetch retourne une promesse (objet)
            const response = await fetch(urlToFetch);

            if (!response.ok) {
                throw new Error(`Failed to fetch : ${response.status}`);
            }
            // On attend la résolution de la promesse et on récupère les données
            const data = await response.json();
            const sudoku = JSON.parse(data.contents);
            console.log(sudoku);

            // On retourne la grille de sudoku
            return sudoku;
        } catch (error) {
            console.error("Error fetching Sudoku:", error.message);
            throw new Error(error.message);
        }
    },

    /**
     * Fonction permettant de placer les chiffres dans la grille de sudoku une fois la grille générée
     * @param {*} setupGame 
     */
    setupGrid: async function (setupGame) {
        // Tableau à utiliser
        const grid = setupGame;

        // On sélectionne toutes les cellules par rangées
        const row1 = document.querySelectorAll('.row-1');
        const row2 = document.querySelectorAll('.row-2');
        const row3 = document.querySelectorAll('.row-3');
        const row4 = document.querySelectorAll('.row-4');
        const row5 = document.querySelectorAll('.row-5');
        const row6 = document.querySelectorAll('.row-6');
        const row7 = document.querySelectorAll('.row-7');
        const row8 = document.querySelectorAll('.row-8');
        const row9 = document.querySelectorAll('.row-9');

        // On utilise forEach pour itérer à travers le tableau et affecter les valeurs à chasue rangée
        grid[0].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[0][index] = '';
            } else {
                row1[index].classList.toggle("starting-number");
            }
            row1[index].textContent = grid[0][index];
        });
        grid[1].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[1][index] = '';
            } else {
                row2[index].classList.toggle("starting-number");
            }
            row2[index].textContent = grid[1][index];
        });
        grid[2].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[2][index] = '';
            } else {
                row3[index].classList.toggle("starting-number");
            }
            row3[index].textContent = grid[2][index];
        });
        grid[3].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[3][index] = '';
            } else {
                row4[index].classList.toggle("starting-number");
            }
            row4[index].textContent = grid[3][index];
        });
        grid[4].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[4][index] = '';
            } else {
                row5[index].classList.toggle("starting-number");
            }
            row5[index].textContent = grid[4][index];
        });
        grid[5].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[5][index] = '';
            } else {
                row6[index].classList.toggle("starting-number");
            }
            row6[index].textContent = grid[5][index];
        });
        grid[6].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[6][index] = '';
            } else {
                row7[index].classList.toggle("starting-number");
            }
            row7[index].textContent = grid[6][index];
        });
        grid[7].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[7][index] = '';
            } else {
                row8[index].classList.toggle("starting-number");
            }
            row8[index].textContent = grid[7][index];
        });
        grid[8].forEach((valeur, index) => {
            if (valeur === 0) {
                grid[8][index] = '';
            } else {
                row9[index].classList.toggle("starting-number");
            }
            row9[index].textContent = grid[8][index];
        });
    },

    /**
     * Fonction qui va nous permettre d'obtenir la grille à l'instant T
     */
    getGrid: function () {
        const gridData = [];

        // On fait une boucle for pour parcourir chaque ligne de la grille
        for (let i = 1; i <= 9; i++) {
            const rowClass = `.row-${i}`;
            const rowCells = document.querySelectorAll(rowClass);

            const rowData = [];

            // On fait une boucle forEach pour parcourir chaque cellule de la ligne
            rowCells.forEach(cell => {
                rowData.push(parseInt(cell.textContent.trim()) || 0); // Ajoute le contenu de la cellule ou 0 si vide
            });
            // On ajoute les données de chaque ligne au tableau gridData
            gridData.push(rowData);
        }
        return gridData;
    },
}

document.addEventListener('DOMContentLoaded', () => app.init());