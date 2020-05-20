class Comment {

    constructor(comment) {
        console.log(comment)
        this.championId = comment.champion_id
        this.content = comment.content
        this.upvotes = comment.upvotes
        this.downvotes = comment.downvotes
        this.difference = comment.difference
        this.id = comment.id
    }

    renderComment() {
        return `<li id="comment${this.id}">
                    ${this.content}
                    <br>
                    <button class="up">▲ ${this.upvotes}</button>
                    <button class="down">▼ ${this.downvotes}</button>
                </li>`
    }

    vote(num) {
        let upvotes;
        let downvotes;
        let difference;
        if(num == 1) {
            upvotes = this.upvotes + 1
            downvotes = this.downvotes
            difference = upvotes - downvotes
        }
        else {
            upvotes = this.upvotes
            downvotes = this.downvotes + 1
            difference = upvotes - downvotes
        }
        let formData = {
            comment_id: this.id,
            upvotes: upvotes,
            downvotes: downvotes,
            difference: difference
        }
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch(COMMENTS_URL + `/${this.id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            return json
        })
        .catch(function(error) {
            alert('Bad Things!');
            console.log(error);
        });

        this.upvotes = upvotes
        this.downvotes = downvotes
        this.difference= difference
        return this
    }
    
}