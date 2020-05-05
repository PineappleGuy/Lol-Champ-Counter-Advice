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
    card.classList.add('card')
    card.classList.add(`${champion.name.split(' ').join('')}`)
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
    card.appendChild(img)
    card.appendChild(h2)
    let ul = document.createElement('ul')
    ul.classList.add(`${champion.name.split(' ').join('')}`)
    ul.setAttribute('hidden', true)

    counterList.appendChild(ul)
    div.appendChild(champContainer)
    champContainer.appendChild(card)
    champContainer.appendChild(counterList)
    let form = makeForms(champion)
    form.setAttribute('hidden', true)
    counterList.appendChild(form)
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
                counterComments(json);
            })
            .catch(function(error) {
                alert('Bad Things!');
                console.log(error.messages);
            });
        
            content.value = ""
    })
    
}

function counterComments(comment) {
    let champion = document.getElementById(comment.champion_id)
    let list = champion.querySelector('ul')
    let li = document.createElement('li')
    li.innerText = comment.content
    li.setAttribute('id', 'comment' + comment.id)
    let br = document.createElement('br')
    let up = document.createElement('button')
    up.innerHTML = '▲ ' + comment.upvotes
    up.classList.add('up')
    let down = document.createElement('button')
    down.innerHTML = '▼ ' + comment.downvotes
    down.classList.add('down')
    up.addEventListener('click', function() {
        let formData = {
            comment_id: comment.id,
            upvotes: comment.upvotes
        };
           
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        
        fetch(COMMENTS_URL + `/${comment.id}`, configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                up.innerHTML = '▲ ' + json.upvotes;
            })
            .catch(function(error) {
                alert('Bad Things!');
                console.log(error);
            });
    })
    down.addEventListener('click', function() {
        let formData = {
            comment_id: comment.id,
            downvotes: comment.downvotes
        };
           
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        
        fetch(COMMENTS_URL + `/${comment.id}`, configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                down.innerHTML = '▼ ' + json.downvotes;
            })
            .catch(function(error) {
                alert('Bad Things!');
                console.log(error);
            });
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

