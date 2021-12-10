// Le jeu comporte 10 motifs différents qui sont numérotés de 1 à 10.

// Le tableau est initialisé avec les numéros de motifs qui se suivent.

var motifsCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

//Le codage utilisé pour l'état des cartes est le suivant :

//    0 : face cachée

//    1 : face visible

//    -1 : enlevée 

// Au départ toutes les cartes sont présentées de dos.

var etatsCartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Tableau contenant les numéros des cartes retournées à un moment donné du jeu.

var cartesRetournees = [];

// Cette variable contient le nombre de paires de cartes qui ont déjà été trouvées.

var nbPairesTrouvees = 0;

// Le tableau imgCarte contient les objets des éléments img de l'interface utilisateur.

var imgCartes = document.getElementById("cartes").getElementsByTagName("img");
var td = document.getElementById("cartes").getElementsByTagName("td");

// On parcourt le tableau des objets des éléments img, chacun d'eux reçoit une fonction déclenchée par l'événement onclick.

// La fonction ainsi définie est exécutée à chaque fois que l'utilisateur clique sur l'image son rôle est d'appeller controleJeu avec le numéro de l'image cliquée.


for (var i = 0; i < imgCartes.length; i++) {
    imgCartes[i].noCarte = i; //Ajout de la propriété noCarte à l'objet img
    imgCartes[i].onclick = function() {
        controleJeu(this.noCarte);
    }
}

// Appel de la fonction initialiseJeu pour mélanger les cartes.

initialiseJeu();

// La fonction majAffichage met à jour l'affichage de la carte dont on passe le numéro en paramètre.

// L'affichage rendu dépend de l'état actuel de la carte (donné par le tableau etatsCartes) :

//    état 0 : carte face cachée, on affichage l'image de dos de carte : fondcarte.png,

//    état 1 : carte retournée, on affiche l'image du motif correspondant, on notera que les différentes images des motifs sont dans les fichiers nommés carte1.png, carte2.png, etc.,

//    état -1 : carte enlevée du jeu, on cache l'élément img.

function majAffichage(noCarte) {
    switch (etatsCartes[noCarte]) {
        case 0:
            imgCartes[noCarte].src = "style/img/Card.jpg";
            break;
        case 1:
            imgCartes[noCarte].src = "style/img/img/Card" + motifsCartes[noCarte] + ".jpg";
            break;
        case -1:
            imgCartes[noCarte].style.visibility = "hidden";
            break;
    }
}



// La fonction initialiseJeu mélange les numéros de motif des cartes.

// Pour cela un algorithme de mélange est utilisé :

function initialiseJeu() {
    for (var position = motifsCartes.length - 1; position >= 1; position--) {
        var hasard = Math.floor(Math.random() * (position + 1));
        var sauve = motifsCartes[position];
        motifsCartes[position] = motifsCartes[hasard];
        motifsCartes[hasard] = sauve;
    }
}


// On affiche la table et on rappelle le timer.

function afficherTable() {
    tapisTable = document.getElementById("cartes");
    tapisTable.style.visibility = "visible";

    demarre.style.visibility = "hidden";
}

// C'est la fonction controleJeu qui contient le coeur du programme : elle est appelée chaque fois que l'utilisateur clique sur une carte en passant en paramètre le numéro de la carte cliquée.

function controleJeu(noCarte) {

    //    Il est impossible d'avoir plus de deux cartes retournées en même temps, ce test évite que cela arrive, par exemple, si un utilisateur clique à toute vitesse sur plusieurs cartes.

    if (cartesRetournees.length < 2) {

        //    Si la carte cliquée est de dos (état 0) :

        //        on fait passer son état à 1,

        //        on ajoute son numéro au tableau des cartes retournées,

        //        on fait la mise à jour de son affichage. 

        //    On notera que rien n'est fait pour les états 1 et -1 : cliquer sur une carte déjà retournée ne change rien et cliquer sur une zone de carte enlevée non plus.

        if (etatsCartes[noCarte] == 0) {
            etatsCartes[noCarte] = 1;
            cartesRetournees.push(noCarte);
            majAffichage(noCarte);
        }

        // Si on se retrouve avec deux cartes retournées, il faut déterminer si elles ont le même motif :

        // si oui : les deux cartes prennent le nouvel état -1 (c'est à dire qu'il faut les enlever) et on incrémente la variable qui compte le nombre de paires trouvées (nbPairesTrouvees),

        // si non : les deux cartes prennent le nouvel état 0 (c'est à dire qu'on les remet de dos).

        if (cartesRetournees.length == 2) {
            var nouveauEtat = 0;
            if (motifsCartes[cartesRetournees[0]] == motifsCartes[cartesRetournees[1]]) {
                nouveauEtat = -1;
                nbPairesTrouvees++;
            }

            etatsCartes[cartesRetournees[0]] = nouveauEtat;
            etatsCartes[cartesRetournees[1]] = nouveauEtat;

            // Afin que le joueur ait le temps de voir ce qu'il se passe, on différe la mise à jour de l'affichage des cartes de 750 ms.

            // Enfin au cas où toutes les paires ont été trouvées, on appelle la fonction rejouer

            setTimeout(function() {
                majAffichage(cartesRetournees[0]);
                majAffichage(cartesRetournees[1]);
                cartesRetournees = [];
                if (nbPairesTrouvees == 9) {
                    clearInterval(timer);
    
                    alert("Vous avez gagné !")
                    alert('Re-jouer')
                    rejouer();
                }
            }, 750);
        }
    }
}


let demarrer = document.getElementById('demarrer')


demarrer.addEventListener('click', () => {
    setInterval('timer()', 1000)
})


const startMinute = 1
let time = startMinute * 60
let compteur = document.getElementById('seconds')

function timer(){
    let minutes = Math.floor(time / 60)
    let seconds = time % 60

    compteur.innerHTML = 'Temps restant ' + minutes + ':' + seconds
    compteur.style.color = 'green'
    time--

    if (minutes == -1 && seconds == -1){
        alert("Oups, temps ecoulé")
        alert('Re-jouer')
        rejouer()
    }

    if  (minutes == 0 && seconds <= 30){
        compteur.style.color = 'red'
    }
}

function rejouer(){
    window.location.reload();
}
/***************************************************************************************************/