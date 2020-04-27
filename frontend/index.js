function makeChampionCard() {

    let div = document.querySelector('div.champion-cards')
    let img = document.createElement('img')
    img.src = 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt570145160dd39dca/5db05fa8347d1c6baa57be25/RiotX_ChampionList_aatrox.jpg?quality=90&width=250'
    
    div.appendChild(img)
}

makeChampionCard();
