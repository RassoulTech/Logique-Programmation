/*
    Étape 1 : L’application propose un mot. 

    Étape 2 : L’utilisateur tape ce mot au clavier. 

    Étape 3 : Si le mot de l’utilisateur est exactement le même que le mot de l’application, alors on ajoute un point au score.

    Étape 4 : On passe au mot suivant.  

    Étape 5 : On recommence à l’étape 1, jusqu’à ce que le temps soit écoulé. 
*/ 

// Étape 1 : L’application propose un mot. 
const mots = ["Cachalot", "Clavier", "Océan", "Vitesse", "Programmation"];
const phrases = ["Le chat saute haut", "Un clavier azerty est courant", "Tape plus vite !"];

let index = 0;
let score = 0;
let total = 0;
let tempsRestant = 30;
let timer;

const input = document.getElementById("champTexte");
const boutonValider = document.getElementById("valider");
const zoneMot = document.getElementById("mots");
const tempsAffichage = document.getElementById("temps");
const scoreText = document.getElementById("score");
const boutonMots = document.getElementById("lesMots");
const boutonPhrases = document.getElementById("lesPhrases");
const messageErreur = document.getElementById('erreur');
const boutonPartager = document.getElementById("partager");
const confirmationPartage = document.getElementById("confirmationPartage");


// Étape 2 : L’utilisateur tape ce mot au clavier. 
// Active/désactive le bouton en fonction du texte tapé
input.addEventListener("input", () => {
    boutonValider.disabled = input.value.trim() === "";
});

function getListeActuelle() {
    return boutonPhrases.checked ? phrases : mots;
}

function afficherMot() {
    const liste = getListeActuelle();
    if (index >= liste.length) index = 0;
    zoneMot.textContent = liste[index];
    input.value = "";
    input.focus();
}

//Étape 3 : Si le mot de l’utilisateur est exactement le même que le mot de l’application, alors on ajoute un point au score.
function validerMot() {
    const liste = getListeActuelle();
    const motUtilisateur = input.value.trim();
    if(motUtilisateur === ""){
        messageErreur.textContent ='Veillez tapez le mot indiqué dans le champs.';
        messageErreur.style.display = "block";
        return;
    }
    messageErreur.style.display = "none";


    //Étape 4 : On passe au mot suivant.  
    const motCorrect = liste[index];
    if (motUtilisateur === motCorrect) {
        score++;
    }
    

    total++;
    index++;
    afficherMot();
    mettreAJourScore();
}

function mettreAJourScore() {
    scoreText.textContent = `Votre Score : ${score}/${total}`;
}


//Étape 5 : On recommence à l’étape 1, jusqu’à ce que le temps soit écoulé. 
function demarrerJeu() {
    afficherMot();
    mettreAJourTemps(); // Affiche la valeur initiale

    timer = setInterval(() => {
        tempsRestant--;
        mettreAJourTemps();

        if (tempsRestant <= 0) {
            clearInterval(timer);
            input.disabled = true;
            boutonValider.disabled = true;
            zoneMot.textContent = "Temps écoulé !";
        }
    }, 1000);
}

function mettreAJourTemps() {
    tempsAffichage.textContent = `Temps restant : ${tempsRestant}s`;
}


boutonValider.addEventListener("click", function (event) {
    event.preventDefault(); // évite le rechargement de la page
    validerMot();
});

// Si l’utilisateur change entre "Mots" et "Phrases"
boutonMots.addEventListener("change", () => {
    index = 0;
    afficherMot();
});
boutonPhrases.addEventListener("change", () => {
    index = 0;
    afficherMot();
});

window.addEventListener("load", demarrerJeu);


// Bouton partager
boutonPartager.addEventListener("click", () => {
    const message = `J'ai obtenu un score de ${score}/${total} sur AzerType ! 💻⌨️`;

    navigator.clipboard.writeText(message)
        .then(() => {
            confirmationPartage.textContent = "Message copié dans le presse-papiers !";
            confirmationPartage.style.display = "block";

            // Cacher le message après 3 secondes
            setTimeout(() => {
                confirmationPartage.style.display = "none";
            }, 3000);
        })
        .catch(() => {
            confirmationPartage.textContent = "Erreur lors de la copie du message.";
            confirmationPartage.style.display = "block";
        });
});