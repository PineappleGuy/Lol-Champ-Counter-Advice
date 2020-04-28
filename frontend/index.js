const BASE_URL = "http://localhost:3000"
const CHAMPIONS_URL = `${BASE_URL}/champions`
const COMMENTS_URL = `${BASE_URL}/comments`

fetch(CHAMPIONS_URL)
    .then((resp) => resp.json())
    .then(function(json) {
        json.forEach(championCard)
    });

function championCard(champion) {
    let div = document.querySelector('div.champion-cards')
    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add(`${champion.name.split(' ').join('')}`)
    card.addEventListener('click', function() {
        let cards = document.getElementsByClassName('card')
        for(let x = 0; x < cards.length; x++) {
            if(cards[x].classList.contains(champion.name.split(' ').join('')) == false) {
                cards[x].classList.remove('expand')
            }
            else if(cards[x].classList.contains(champion.name.split(' ').join('')) == true && cards[x].classList.contains('expand') == true) {
                cards[x].classList.remove('expand')
            }
            else {
                cards[x].classList.add('expand') 
            }
        }
    })
    let img = document.createElement('img')
    img.setAttribute('src', champion.image_url)
    if(champion.name == 'Sett' || champion.name == 'Aphelios') {
        img.classList.add('clip')
    }
    let h2 = document.createElement('h2')
    h2.innerText = champion.name
    card.appendChild(img)
    card.appendChild(h2)
    div.appendChild(card)
}

