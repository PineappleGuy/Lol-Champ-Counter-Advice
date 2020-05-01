const BASE_URL = "http://localhost:3000"
const CHAMPIONS_URL = `${BASE_URL}/champions`
const COMMENTS_URL = `${BASE_URL}/comments`

fetch(CHAMPIONS_URL)
    .then((resp) => resp.json())
    .then(function(json) {
        json.forEach(championCard)
    });   

fetch(COMMENTS_URL)
    .then((resp) => resp.json())
    .then(function(json) {
        json.forEach(counterComments)
    });

function championCard(champion) {
    let div = document.querySelector('div.champion-cards')
    let champContainer = document.createElement('div')
    champContainer.classList.add('championContainer')
    champContainer.classList.add(`${champion.name.split(' ').join('')}`)
    let counterList = document.createElement('div')
    counterList.classList.add('list')
    counterList.classList.add(`${champion.name.split(' ').join('')}`)
    counterList.setAttribute('id', champion.id)
    let card = document.createElement('div') 
   /*let counterCard = document.createElement('div')*/
    card.classList.add('card')
    card.classList.add(`${champion.name.split(' ').join('')}`)
    /*counterCard.classList.add('card')
    counterCard.classList.add('counterCard')
    counterCard.setAttribute('hidden', true)
    counterCard.setAttribute('id', champion.id)
    counterCard.classList.add(`${champion.name.split(' ').join('')}`)*/
    card.addEventListener('click', function() {
        let cards = document.getElementsByClassName('card')
        for(let x = 0; x < cards.length; x++) {
            if(cards[x].classList.contains(champion.name.split(' ').join('')) == false && cards[x].hasAttribute('hidden') == false) {
                cards[x].setAttribute('hidden', true)
                div.classList.remove('champion-cards')
            }
            else if(cards[x].classList.contains(champion.name.split(' ').join('')) == true) {
                ul.removeAttribute('hidden')
                form.removeAttribute('hidden')
                h2.innerText = `How to counter ${champion.name}:`
            }
            else {
                cards[x].removeAttribute('hidden')
                div.classList.add('champion-cards')
                ul.setAttribute('hidden', true)
                h2.innerText = champion.name
                card.scrollIntoView()
                form.setAttribute('hidden', true)
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
    /*let counterh2 = document.createElement('h2')
    counterh2.innerText = champion.name + ' Counter Advice'
    counterh2.setAttribute('hidden', true)*/
    card.appendChild(img)
    card.appendChild(h2)
    /*counterCard.appendChild(counterh2)*/
    let ul = document.createElement('ul')
    ul.classList.add(`${champion.name.split(' ').join('')}`)
    ul.setAttribute('hidden', true)

    counterList.appendChild(ul)
    div.appendChild(champContainer)
    champContainer.appendChild(card)
    champContainer.appendChild(counterList)
    /*div.appendChild(counterCard)*/
    let form = makeForms(champion);
    form.setAttribute('hidden', true)
    counterList.appendChild(form)
}

function counterComments(comment) {
    let champion = document.getElementById(comment.champion_id)
    let list = champion.querySelector('ul')
    let li = document.createElement('li')
    li.innerText = comment.content
    let br = document.createElement('br')
    let up = document.createElement('button')
    up.innerHTML = '▲ ' + comment.upvotes
    let down = document.createElement('button')
    down.innerHTML = '▼ ' + comment.downvotes
    up.addEventListener('click', function() {
        comment.upvotes = comment.upvotes + 1
        up.innerHTML = '▲ ' + comment.upvotes
    })
    down.addEventListener('click', function() {
        comment.downvotes = comment.downvotes + 1
        down.innerHTML = '▼ ' + comment.downvotes
    })
    li.appendChild(br)
    li.appendChild(up)
    li.appendChild(down)
    list.appendChild(li)
}

function makeForms(champion) {
    let form = document.createElement('form')
    form.setAttribute('id', 'createAdviceForm')
    form.setAttribute('action', '#')
    form.setAttribute('method', 'post')
    let label = document.createElement('label')
    label.setAttribute('for', `${champion.name.split(' ').join('')}`)
    label.innerText = 'Countering Advice: '
    let input1 = document.createElement('input')
    input1.setAttribute('type', 'text')
    input1.setAttribute('id', `${champion.name.split(' ').join('')}`)
    input1.setAttribute('name', `${champion.name.split(' ').join('')}`)
    input1.setAttribute('placeholder', "e.g. Play safe 'til Lvl. 3")
    let input2 = document.createElement('input')
    input2.setAttribute('type', 'submit')
    input2.setAttribute('value', 'Give Advice!')
    form.appendChild(label)
    form.appendChild(input1)
    form.appendChild(input2)
    return form
}

