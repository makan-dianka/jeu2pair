const containerCard = document.getElementById("container-card")
let nameImg = []

let card = [
    ['Dar1', 'Dar2', 'DrS1', 'DrS2'],
    ['Gho1', 'Gho2', 'Hul1', 'Hul2'],
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



function felicitation(){
    let fel = document.getElementById('felicitation')
    fel.style.backgroundColor = 'green'
    fel.style.color = 'white'
    fel.style.padding = '15px'
    fel.style.textAlign = 'center'
    fel.innerHTML = "Félicitation, vous avez gagné !"
}

function navrer(){
    let navr = document.querySelector('.navrer')
    navr.style.backgroundColor = 'red'
    navr.style.color = 'white'
    navr.style.padding = '15px'
    navr.style.textAlign = 'center'
    navr.innerHTML = "Oups, vous avez perdu !"
}

function retry(){
    let btn = document.getElementById('btn-retry')
    btn.innerHTML = '<button id="butt"><a href="/"><h2>Jouer encore</h2></a></button>'
    btn.style.color = 'white'
    btn.style.textAlign = 'center'
}