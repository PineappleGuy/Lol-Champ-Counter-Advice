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
    let counterCard = document.createElement('div')
    card.classList.add('card')
    card.classList.add(`${champion.name.split(' ').join('')}`)
    counterCard.classList.add('card')
    counterCard.classList.add('counterCard')
    counterCard.setAttribute('hidden', true)
    counterCard.classList.add(`${champion.name.split(' ').join('')}`)
    card.addEventListener('click', function() {
        let cards = document.getElementsByClassName('card')
        for(let x = 0; x < cards.length; x++) {
            if(cards[x].classList.contains(champion.name.split(' ').join('')) == false && cards[x].classList.contains('counterCard')) {
                cards[x].setAttribute('hidden', true)
                cards[x-1].classList.remove('clicked')
            }
            else if(cards[x].classList.contains(champion.name.split(' ').join('')) == true && cards[x].classList.contains('counterCard') && cards[x].hasAttribute('hidden')) {
                cards[x].removeAttribute('hidden')
                counterh2.removeAttribute('hidden')
                cards[x-1].classList.add('clicked')
            }
            else if(cards[x].classList.contains('counterCard')) {
                cards[x].setAttribute('hidden', true) 
                counterh2.setAttribute('hidden', true)
                cards[x-1].classList.remove('clicked')
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
    let counterh2 = document.createElement('h2')
    counterh2.innerText = champion.name + ' Counter Advice'
    counterh2.setAttribute('hidden', true)
    card.appendChild(img)
    card.appendChild(h2)
    counterCard.appendChild(counterh2)
    let ul = document.createElement('ul')
    ul.classList.add(`${champion.name.split(' ').join('')}`)
    
    counterCard.appendChild(ul)

    div.appendChild(card)
    div.appendChild(counterCard)
}

