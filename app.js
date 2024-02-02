const app = {

    contentToCopy: "",

    init: function() {
        console.log('app.init()');

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

        const destinationNumber = event.currentTarget.classList[1];

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
    }
}

document.addEventListener('DOMContentLoaded', () => app.init());