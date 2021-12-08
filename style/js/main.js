const containerCard = document.getElementById("container-card")
let nameImg = []

let card = [
    ['Dardevil1', 'Dardevil2', 'DrStrange1', 'DrStrange2'],
    ['Ghost-Rider1', 'Ghost-Rider2', 'Hulk1', 'Hulk2'],
]

jeuCard()

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

function img(){   
    for (let i = 0; i < card.length; i++){
        for (let j = 0; j < card[i].length; j++){
            nameImg.push(card[i][j] +'.jpg')
        }; 
    }
} 
  
img()

function getBtn(){
    let btns = document.getElementsByClassName('btn')
    for (let i = 0; i < btns.length; i++){ 
        let image = nameImg[i]
        let btn = btns[i]
        btn.addEventListener('click', () => {
        btn.innerHTML = "<img src="+"style/img/"+image+" height=300 width=250>"
        })
    } 
}

getBtn()


