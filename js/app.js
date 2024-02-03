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

        // Obtenir les données du sudoku
        const sudoku = await this.getSudoku();

        // Afficher uniquement la grille de sudoku 
        const setupGame = sudoku.newboard.grids[0].value;
        console.log(setupGame);

        this.setupGrid(setupGame);
    },

    handleCopyContent: function (event) {
        console.log("J'ai copié !");

        const sourceNumber = event.currentTarget.textContent;

        // Construisez la classe de source en fonction du numéro choisi
        var sourceClass = '.selector:nth-child(' + sourceNumber + ')';
        console.log(sourceClass);

        // Sélectionnez la source par sa classe
        var sourceDiv = document.querySelector(sourceClass);

        // Vérifiez si l'élément source est présent
        if (sourceDiv) {
            // Copiez le contenu de la source
            contentToCopy = sourceDiv.innerHTML;
            console.log(contentToCopy);
        }
    },

    handlePasteContent: function(event) {
        console.log("J'ai collé !");

        // On sélectionne la troisième classe de la cellule cliquée
        const destinationNumber = event.currentTarget.classList[2];

        // Construisez la classe de destination en fonction du numéro choisi
        var destinationClass = '.' + destinationNumber;
        console.log(destinationClass);

        // Sélectionnez la destination par sa classe
        var destinationDiv = document.querySelector(destinationClass);
        console.log(destinationDiv);

        // Vérifiez si l'élément destination est présent et s'il y a du contenu à coller
        if (destinationDiv && contentToCopy !== "") {
            // Collez le contenu dans la destination
            destinationDiv.innerHTML = contentToCopy;
        }
    },

    // Url de l'API permettant de générer une grille
    createUrl: "https://sudoku-api.vercel.app/api/dosuku",
    
    getSudoku: async function () {
        try {
            // fetch retourne une promesse (objet)
            const response = await fetch(this.createUrl);
           

            if (!response.ok) {
                throw new Error(`Failed to fetch : ${response.status}`);
            }
            // On attend la résolution de la promesse et on récupère les données
            const sudoku = await response.json();
        
            // On retourne tous les jeux vidéos
            return sudoku;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    setupGrid: async function (setupGame) {
        // Tableau à utiliser
        const tableau = setupGame;
        console.log(tableau);

        // Sélectionnez toutes les cellules par rangées
        const row1 = document.querySelectorAll('.row-1');
        const row2 = document.querySelectorAll('.row-2');
        const row3 = document.querySelectorAll('.row-3');
        const row4 = document.querySelectorAll('.row-4');
        const row5 = document.querySelectorAll('.row-5');
        const row6 = document.querySelectorAll('.row-6');
        const row7 = document.querySelectorAll('.row-7');
        const row8 = document.querySelectorAll('.row-8');
        const row9 = document.querySelectorAll('.row-9');
        
        // Utilisez forEach pour itérer à travers le tableau et affecter les valeurs à chasue rangée
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
    }
}

document.addEventListener('DOMContentLoaded', () => app.init());