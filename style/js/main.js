/*
    jeu de hazard, jeu de pair. jouer avec des carte, selectionner 2 cartes si les cartes séléctionné
    sont identique alors vous avez gagné sinon vous avez perdu. dans tous les cas vous pouvez rejouer.
    la position du cartes sont générer aléatoirement
*/


// Je recupere mon div dans la page html, avec container-card 
const containerCard = document.getElementById("container-card")

// les nom du fichier seront stocké ici
let nameImg = []

// la table card c'est le div principal et les 2 autres ce sont mes 2 lignes avec 4 cartes par lignes
let card = [
    ['Dar1', 'Dar2', 'DrS1', 'DrS2'],
    ['Gho1', 'Gho2', 'Hul1', 'Hul2'],
]

jeuCard()

// creation de mes cartes. cette fonction sert à créer 2 div et 4 button par ligne avec la face caché de la carte à defaut 
function jeuCard(){
    var grid = ""
    for (let i = 0; i < card.length; i++){
        grid += "<div class='gridCard' id='gridCard'>"

        for (let j = 0; j < card[i].length; j++){
            grid += "<button class='btn' id='btn'> <img src='style/img/Card.jpg' height=300 width=250> </button>"
        }

        grid += "</div>"
    }

    containerCard.innerHTML = grid
}

// recuperation des noms des images dans le table card et ajouter l'extention jpg puis push dans nameImg
function img(){   
    for (let i = 0; i < card.length; i++){
        for (let j = 0; j < card[i].length; j++){
            nameImg.push(card[i][j] +'.jpg')
        }; 
    }
} 
img()


// cette fonction recupere le button et faire les tâches principal du programme
function getBtn(){
    let btns = document.getElementsByClassName('btn')
    for (let i = 0; i < btns.length; i++){ 
        let randomImg = Math.floor(Math.random() * nameImg.length)
        //let image = nameImg[i]
        let image = nameImg[randomImg]
        let btn = btns[i]
        btn.addEventListener('click', () => {
        btn.innerHTML = "<img src="+"style/img/"+image+" class=img height=300 width=250>"
        let div = document.getElementsByClassName("img")
        if (div.length === 2){
            let compare = []
            for (element of div){
                let test = element.getAttribute("src")
                let spl = test.split('/')[2].slice(0, 3)
                compare.push(spl)
            }

            if (compare[0] === compare[1]){
                felicitation()
                retry()
                
            }else{
                navrer()
                retry()
                Location.reload()
            }
            

        }else{
            console.log('non')
        }
        })
    } 
}

getBtn()


// cette fonction sert à feliciter l'utilisateur qui gagne le jeu
function felicitation(){
    let fel = document.getElementById('felicitation')
    fel.style.backgroundColor = 'green'
    fel.style.color = 'white'
    fel.style.padding = '15px'
    fel.style.textAlign = 'center'
    fel.innerHTML = "Félicitation, vous avez gagné !"
}

// cette founction sert à afficher le desagrement si l'utilisateur échoue le jeu
function navrer(){
    let navr = document.querySelector('.navrer')
    navr.style.backgroundColor = 'red'
    navr.style.color = 'white'
    navr.style.padding = '15px'
    navr.style.textAlign = 'center'
    navr.innerHTML = "Oups, vous avez perdu !"
}

// cette fonction, est un button de rejouer en cas de echoue ou reussite de l'utilisateur
function retry(){
    let btn = document.getElementById('btn-retry')
    btn.innerHTML = '<button id="butt"><a href="/"><h2>Jouer encore</h2></a></button>'
    btn.style.color = 'white'
    btn.style.textAlign = 'center'
}