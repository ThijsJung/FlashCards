document.addEventListener('DOMContentLoaded', function () {
    const cards = document.getElementById("cards");
    const cardTemplate = document.getElementById("card_template");
    const addCardButton = document.getElementById("add_card_button");
    const saveDeckButton = document.getElementById("save_deck_button");
    const newDeck = document.getElementById("new_deck");

    function addCard(){
        let card = cardTemplate.content.cloneNode(true);
        // Add id to the card so it can be deleted.
        let cardId = "card_" + cards.rows.length;
        card.querySelector("tr").id = cardId;
        card.querySelector("button").addEventListener("click", () => { deleteCard(cardId); }, false);
        cards.appendChild(card);
    }

    function deleteCard(cardId){
        let card = document.getElementById(cardId);
        card.remove();
    }

    function saveDeck(){
        let deck = [];
        for (let cardRow of cards.rows){
            let card = {};
            const frontDetails = cardRow.getElementsByClassName("front_side");
            card.front = {};
            for (let i = 0; i < frontDetails.length; i ++){
                let frontDetail = frontDetails[i]
                let frontDetailChild = frontDetail.firstElementChild;
                let frontName = frontDetail.dataset.attributeName;
                card.front[frontName] = frontDetailChild.value;
            }

            const backDetails = cardRow.getElementsByClassName("back_side");
            card.back = {};
            for (let i = 0; i < backDetails.length; i ++){
                let backDetail = backDetails[i]
                let backDetailChild = backDetail.firstElementChild;
                let frontName = backDetail.dataset.attributeName;
                card.back[frontName] = backDetailChild.value;
            }

            deck.push(card);
        }
        
        newDeck.innerHTML = "Saving your deck is not yet supported. Here's the JSON" + "<br>";
        for (let card of deck){
            newDeck.innerHTML += JSON.stringify(card) + "<br>";
            // newDeck.innerHTML += '\n';
        }
    }
    addCardButton.addEventListener("click", addCard, false);
    saveDeckButton.addEventListener("click", saveDeck, false);
    addCard();
});