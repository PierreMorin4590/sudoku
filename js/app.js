const app = {

    contentToCopy: "",

    init: async function() {
        console.log('app.init()');
        console.log(this.createUrl);

        // On sélectionne tous les sélécteurs
        const selectors = document.querySelectorAll(".selector");

        // On place un addEventListener sur chacun des sélecteurs
        selectors.forEach(selector => {
            selector.addEventListener("click", this.handleCopyContent);
        });

        // On sélectionne toutes les cellules
        const cells = document.querySelectorAll(".grid");

        // On place un addEventListener sur chacune des cellules
        cells.forEach(cell => {
            cell.addEventListener("click", this.handlePasteContent);
        });

        // On sélectionne le button "Nouvelle partie"
        const newGame = document.querySelector('#new-game');

        // On place un addEventListener sur le button "Nouvelle partie"
        newGame.addEventListener("click", () => this.handleStartNewGame());
    },
    
    /**
     * Fonction asynchrone qui permet de générer une grille aléatoire de sudoku quand on clique sur le bouton "Nouvelle partie".
     * La fonction fait appel à la fonction asynchrone getSudoku() qui permet de récupérer une grille aléatoire de sudoku grâce
     * à l'API Fetch. 
     * La fonction déclenche la fonction setupGrid() qui permet de placer les chiffres dans la grille.
     */
    handleStartNewGame: async function() {
        console.log("Youhou, tu as cliqué sur Nouvelle partie !");
        // On récupère les données du sudoku
        const sudoku = await this.getSudoku();

        // On affiche uniquement la grille de sudoku 
        const setupGame = sudoku.newboard.grids[0].value;
        const difficulty = sudoku.newboard.grids[0].difficulty;
        console.log(difficulty);
        console.log(setupGame);

        this.setupGrid(setupGame);
    },

    /**
     * Fonction qui va permettre de copier le contenu d'une des cases du sélecteur de chiffre
     * @param {*} event 
     */
    handleCopyContent: function(event) {
        console.log("J'ai copié !");
        // On sélectionne les sélecteurs
        const selectors = document.querySelectorAll(".selector");

        // On reboot la class "selected"
        selectors.forEach(selector => {
            selector.classList.remove("selected");
        });

        // On ajoute une classe "selected" au chiffre sélectionné pour le rendre plus visible
        const selectorClicked = event.currentTarget;
        console.log(selectorClicked);
        selectorClicked.classList.toggle("selected");

        // On récupère le contenu texte de la case
        const sourceNumber = event.currentTarget.textContent;

        // On construit la classe de source en fonction du numéro choisi
        var sourceClass = '.selector:nth-child(' + sourceNumber + ')';
        console.log(sourceClass);

        // On sélectionne la source par sa classe
        var sourceDiv = document.querySelector(sourceClass);

        // On vérifie si l'élément source est présent
        if (sourceDiv) {
            // Si oui, on colle le contenu de la source
            contentToCopy = sourceDiv.innerHTML;
            console.log(contentToCopy);
        }
    },

    /**
     * Fonction qui va permettre de coller le contenu d'une des cases du sélecteur de chiffre dans les cases de la grille
     * @param {*} event 
     */
    handlePasteContent: function(event) {
        console.log("J'ai collé !");

        // On sélectionne la troisième classe de la cellule cliquée
        const destinationNumber = event.currentTarget.classList[2];

        // On construit la classe de destination en fonction du numéro choisi
        var destinationClass = '.' + destinationNumber;
        console.log(destinationClass);

        // On sélectionne la destination par sa classe
        var destinationDiv = document.querySelector(destinationClass);
        console.log(destinationDiv);

        // On vérifie si la case est déjà occupée ou non par un chiffre de la grille générée aléatoirement, 
        // si c'est le cas, on return pour empêcher de coller un chiffre différent !

        if (destinationDiv.textContent.length > 0) {
            return;
        };

        // Sinon, on vérifie si l'élément destination est présent et s'il y a du contenu à coller
        if (destinationDiv && contentToCopy !== "") {
            // Si oui, on colle le contenu dans la destination
            destinationDiv.innerHTML = contentToCopy;
        };
    },

    // URL de l'API permettant de générer une grille
    createUrl: "https://sudoku-api.vercel.app/api/dosuku",

    /**
     * Fonction asynchrone qui va nous permettre d'aller récupérer une grille aléatoire de sudoku grâce à l'API Fetch et à la méthode fetch()
     * @returns 
     */
    getSudoku: async function() {
        try {
            // fetch retourne une promesse (objet)
            const response = await fetch(this.createUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch : ${response.status}`);
            }
            // On attend la résolution de la promesse et on récupère les données
            const sudoku = await response.json();
            console.log(sudoku);

            // On retourne la grille de sudoku
            return sudoku;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * Fonction permettant de placer les chiffres dans la grille de sudoku une fois la grille générée
     * @param {*} setupGame 
     */
    setupGrid: async function (setupGame) {
        // Tableau à utiliser
        const tableau = setupGame;
        console.log(tableau);

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
        tableau[0].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[0][index] = '';
            }
            row1[index].textContent = tableau[0][index];
        });
        tableau[1].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[1][index] = '';
            }
            row2[index].textContent = tableau[1][index];
        });
        tableau[2].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[2][index] = '';
            }
            row3[index].textContent = tableau[2][index];
        });
        tableau[3].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[3][index] = '';
            }
            row4[index].textContent = tableau[3][index];
        });
        tableau[4].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[4][index] = '';
            }
            row5[index].textContent = tableau[4][index];
        });
        tableau[5].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[5][index] = '';
            }
            row6[index].textContent = tableau[5][index];
        });
        tableau[6].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[6][index] = '';
            }
            row7[index].textContent = tableau[6][index];
        });
        tableau[7].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[7][index] = '';
            }
            row8[index].textContent = tableau[7][index];
        });
        tableau[8].forEach((valeur, index) => {
            if (valeur === 0) {
                tableau[8][index] = '';
            }
            row9[index].textContent = tableau[8][index];
        });
    },

}

document.addEventListener('DOMContentLoaded', () => app.init());