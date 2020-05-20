const BASE_URL = "http://localhost:3000"
const CHAMPIONS_URL = `${BASE_URL}/champions`
const COMMENTS_URL = `${BASE_URL}/comments`

function fetchChampions() {
    fetch(CHAMPIONS_URL)
        .then((resp) => resp.json())
        .then(function(json) {
            json.forEach(createCards)
        });   
}

function fetchComments() {
    fetch(COMMENTS_URL)
        .then((resp) => resp.json())
        .then(function(json) {
            json.forEach(counterComments)
        });   
}


function createCards(champion) {
    let div = document.querySelector('div.champion-cards')
    let champ = new Champion(champion)
    let container = champ.renderChampion()
    let cont = new DOMParser().parseFromString(container, 'text/html')
    let card = cont.body.firstChild
    div.appendChild(card)
    clickableCards(card, champion)
    formSubmitEvent(card, champion)
}

function counterComments(comment) {
    let champion = document.getElementById(comment.champion_id)
    let list = champion.querySelector('ul')
    let com = new Comment(comment)
    let item = com.renderComment()
    let doc = new DOMParser().parseFromString(item, 'text/html')
    let li = doc.body.firstChild
    list.appendChild(li)
    addButtonEvents(li, com)
}

function championSearch() {
    let input = document.getElementById('searchInput')
    let filter = input.value.toUpperCase()
    let divs = document.getElementsByClassName('card')
    let cards = document.getElementsByClassName('championContainer')
    for (let x = 0; x < divs.length; x++) {
        a = divs[x].querySelector('h2')
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[x].removeAttribute('hidden');
        }
        else {
            cards[x].setAttribute('hidden', true)
        }
    }
}

function clickableCards(card, champion) {
    let div = document.querySelector('div.champion-cards')
    let searchBar = document.querySelector('div.search-bar')
    let list = card.querySelector('div.list')
    let h2 = card.querySelector('h2')
    let img = card.querySelector('img')
    img.addEventListener('click', function() {
        if(div.classList.contains('champion-cards') == true) {
            div.classList.remove('champion-cards')
            searchBar.setAttribute('hidden', true)
        }
        else {
            div.classList.add('champion-cards')
            searchBar.removeAttribute('hidden')
        }
        let cards = document.getElementsByClassName('card')
        for(let x = 0; x < cards.length; x++) {
            if(cards[x].getAttribute('name') != champion.name) {
                if(cards[x].hasAttribute('hidden') == false) {
                    cards[x].setAttribute('hidden', true)
                }
                else {
                    cards[x].removeAttribute('hidden')
                }
            }
            else {
                if(list.hasAttribute('hidden') == true) {
                    list.removeAttribute('hidden')
                    h2.innerText = `How to counter ${champion.name}:`
                    h2.classList.remove('middle')
                    img.classList.remove('image')
                }
                else {
                    location.reload();
                }
            }  
        }
    }) 
}

function formSubmitEvent(card, champion) {
    let form = card.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let content = document.querySelector(`input#${champion.name.split(' ').join('')}`)
        let formData = {
            content: content.value,
            champion_id: champion.id
        }; 
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        fetch(COMMENTS_URL, configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json)
                counterComments(json);
            })
            .catch(function(error) {
                alert('Bad Things!');
                console.log(error.messages);
            });
        content.value = ""
    })
}

function addButtonEvents(li, com) {
    let up = li.getElementsByClassName('up')[0]
    up.addEventListener('click', function() {
        let json = com.vote(1)
        up.innerText = '▲ ' + json.upvotes;
    })
    let down = li.getElementsByClassName('down')[0]
    down.addEventListener('click', function() {                                                  
        let json = com.vote(-1) 
        down.innerText = '▼ ' + json.downvotes;                                    
    })
}


document.addEventListener('DOMContentLoaded', function() {
    fetchChampions();
    fetchComments();
})
