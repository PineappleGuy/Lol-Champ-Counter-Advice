class Champion {
    constructor(champion) {
        this.name = champion.name
        this.id = champion.id
        this.imageUrl = champion.image_url
    }

    renderChampion() {
        if(this.name != "Aphelios" && this.name != "Sett") {
            return `<div class="championContainer ${this.name.split(' ').join('')}">
                        <div class="card" name="${this.name}">
                            <img class="image" src="${this.imageUrl}">
                            <h2 class="middle">${this.name}</h2>
                        </div>
                        <div class="list" id="${this.id}"  hidden="true">
                            <ul></ul>
                            <form id="createAdviceForm" action="#" method="post">
                                <input type="text" id="${this.name.split(' ').join('')}" name="${this.name.split(' ').join('')}" placeholder="e.g. Play safe 'til lvl 3">
                                <input type="submit" value="Give Advice!">
                            </form>
                        </div>
                    </div>`
        }
        else {
            return `<div class="championContainer ${this.name.split(' ').join('')}">
                        <div class="card" name="${this.name}">
                            <img class="image clip" src="${this.imageUrl}">
                            <h2 class="middle">${this.name}</h2>
                        </div>
                        <div class="list" id="${this.id}"  hidden="true">
                            <ul></ul>
                            <form id="createAdviceForm" action="#" method="post">
                                <input type="text" id="${this.name.split(' ').join('')}" name="${this.name.split(' ').join('')}" placeholder="e.g. Play safe 'til lvl 3">
                                <input type="submit" value="Give Advice!">
                            </form>
                        </div>
                    </div>`
        }
    }
}