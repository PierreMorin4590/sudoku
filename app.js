const app = {

    contentToCopy: "",

    init: function() {
        console.log('app.init()');
        this.selectors = document.querySelectorAll(".selector");
        this.selectors.addEventListener("click", (event) => handleCopyContent(event));
        
    },

    handleCopyContent: function(sourceNumber) {
        // Construisez la classe de source en fonction du numéro choisi
        const sourceClass = '.selector:nth-child(' + sourceNumber + ')';
        console.log(sourceClass);

        // Sélectionnez la source par sa classe
        var sourceDiv = document.querySelector(sourceClass);
        console.log(sourceDiv);

        // Vérifiez si l'élément source est présent
        if (sourceDiv) {
            // Copiez le contenu de la source
            contentToCopy = sourceDiv.innerHTML;
            console.log(contentToCopy);
        }
    },

    

    
}

document.addEventListener('DOMContentLoaded', () => app.init());