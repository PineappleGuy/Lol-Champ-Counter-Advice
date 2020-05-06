const BASE_URL = "http://localhost:3000"
const CHAMPIONS_URL = `${BASE_URL}/champions`
const COMMENTS_URL = `${BASE_URL}/comments`

function fetchChampions() {
    fetch(CHAMPIONS_URL)
        .then((resp) => resp.json())
        .then(function(json) {
            json.forEach(championCard)
        });   
}

function fetchComments() {
    fetch(COMMENTS_URL)
        .then((resp) => resp.json())
        .then(function(json) {
            json.forEach(counterComments)
        });   
}


function championCard(champion) {
    let div = document.querySelector('div.champion-cards')
    let champContainer = document.createElement('div')
    champContainer.classList.add('championContainer')
    champContainer.classList.add(`${champion.name.split(' ').join('')}`)
    let counterList = document.createElement('div')
    counterList.classList.add('list')
    counterList.setAttribute('id', champion.id)
    counterList.setAttribute('hidden', true)
    let card = document.createElement('div') 
    card.classList.add('card')
    card.setAttribute('name', champion.name)
    let img = document.createElement('img')
    img.classList.add('image')
    img.setAttribute('src', champion.image_url)
    if(champion.name == 'Sett' || champion.name == 'Aphelios') {
        img.classList.add('clip')
    }
    let h2 = document.createElement('h2')
    h2.innerText = champion.name
    h2.classList.add('middle')
    card.appendChild(img)
    card.appendChild(h2)
    let ul = document.createElement('ul')
    counterList.appendChild(ul)
    div.appendChild(champContainer)
    champContainer.appendChild(card)
    champContainer.appendChild(counterList)

    let form = makeForms(champion)
    counterList.appendChild(form)
    let selector = document.querySelector('div.filter-options')
    img.addEventListener('click', function() {
        if(div.classList.contains('champion-cards') == true) {
            div.classList.remove('champion-cards')
            selector.setAttribute('hidden', true)
        }
        else {
            div.classList.add('champion-cards')
            selector.removeAttribute('hidden')
        }
        let cards = document.getElementsByClassName('card')/*classList.contains(champion.name.split(' ').join('')) */
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
                if(counterList.hasAttribute('hidden') == true) {
                    counterList.removeAttribute('hidden')
                    h2.innerText = `How to counter ${champion.name}:`
                    h2.classList.remove('middle')
                    img.classList.remove('image')
                }
                else {
                    location.reload();
                    /*counterList.setAttribute('hidden', true)
                    h2.innerText = champion.name
                    h2.classList.add('middle')
                    img.classList.add('image')
                    card.scrollIntoView()*/
                    
                }
            }  
        }
    })

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
    championSort(champion, champContainer)
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
    /*form.appendChild(label)*/
    form.appendChild(input1)
    form.appendChild(input2)
    return form
}

function championSort(champion, champContainer) {
    let letter = champion.name.charAt(0)
    let selector = document.getElementById('champion-dropdown')
    selector.addEventListener('change', function() {
        let L = this.value
        if(L == "") {
            champContainer.removeAttribute('hidden')
        }
        else if(letter != L) {
            champContainer.setAttribute('hidden', true)
        }
        else {
            champContainer.removeAttribute('hidden')
        }
    }, false)
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


document.addEventListener('DOMContentLoaded', function() {
    fetchChampions();
    fetchComments();
})
