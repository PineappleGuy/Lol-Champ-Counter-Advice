class Champion {
    constructor(champion) {
        this.name = champion.name
        this.id = champion.id
        this.imageUrl = champion.image_url
    }

    renderChampion() {
        
            return `<div class="championContainer ${this.formatName()}">
                        <div class="card" name="${this.name}">
                            <img class="${this.classes()}" src="${this.imageUrl}">
                            <h2 class="middle">${this.name}</h2>
                        </div>
                        <div class="list" id="${this.id}"  hidden="true">
                            <ul></ul>
                            <form id="createAdviceForm" action="#" method="post">
                                <input type="text" id="${this.formatName()}" name="${this.formatName()}" placeholder="e.g. Play safe 'til lvl 3">
                                <input type="submit" value="Give Advice!">
                            </form>
                        </div>
                    </div>`
    }

    classes() {
        return `image ${(this.name == 'Aphelios' || this.name == 'Sett') ? 'clip' : null}`
    }

    formatName() {
        return `${this.name.split(' ').join('')}`
    }
}