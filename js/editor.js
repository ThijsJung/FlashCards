const previouslySavedDeck = {
    "deck_id": "hdfs923ndf",
    "name": "Navidad",
    "cards": [
        [
            {
                "type": "text",
                "content": {
                    "title": "The christmas tree",
                    "description": "It has a lot of lights!"
                }
            },
            {
                "type": "text",
                "content": {
                    "title": "El arbol de Navidad",
                    "description": "Cuantas luces tiene!"
                }
            }
        ],
        [
            {
                "type": "text",
                "content": {
                    "title": "Santa Claus",
                    "description": "Ho ho ho!"
                }
            },
            {
                "type": "text",
                "content": {
                    "title": "Papa Noel",
                    "description": "Feliz navidad!"
                }
            }
        ]
    ]
}

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.getElementById("cards");
    const cardSideTemplate = document.getElementById("card_side_template");
    const deleteCardButtonTemplate = document.getElementById("delete_card_button_template");
    const addCardButton = document.getElementById("add_card_button");
    const saveDeckButton = document.getElementById("save_deck_button");
    const loadDeckButton = document.getElementById("load_deck_button");
    const savedDeck = document.getElementById("saved_deck");

    function addEmptyCard() {
        let cardRow = document.createElement("tr");
        // Add id to the card so it can be deleted.
        let cardId = "card_" + cards.rows.length;
        cardRow.id = cardId;

        // Clone the front, back and delete button. Activate the button
        let frontSide = cardSideTemplate.content.cloneNode(true);
        let backSide = cardSideTemplate.content.cloneNode(true);
        let deleteCardButton = deleteCardButtonTemplate.content.cloneNode(true);
        deleteCardButton.querySelector("button").addEventListener("click", () => { deleteCard(cardId); }, false);

        // Add them to the DOM.
        cardRow.appendChild(frontSide);
        cardRow.appendChild(backSide);
        cardRow.appendChild(deleteCardButton);
        cards.appendChild(cardRow);

        return cardId;
    }

    function deleteCard(cardId) {
        let card = document.getElementById(cardId);
        card.remove();
    }

    function populateCard(cardId, cardData) {
        let card = document.getElementById(cardId);
        let titles = card.getElementsByClassName("front_title");
        titles[0].value = cardData[0].content.title;
        titles[1].value = cardData[1].content.title;
        let descriptions = card.getElementsByClassName("front_description");
        descriptions[0].value = cardData[0].content.description;
        descriptions[1].value = cardData[1].content.description;

    }

    function loadDeck(deck) {
        console.log("Loading...");
        for (let cardData of previouslySavedDeck.cards) {
            let cardId = addEmptyCard();
            populateCard(cardId, cardData);
        }
    }

    function saveDeck() {
        let deck = [];
        for (let cardRow of cards.rows) {
            let card = {};
            const frontDetails = cardRow.getElementsByClassName("front_side");
            card.front = {};
            for (let i = 0; i < frontDetails.length; i++) {
                let frontDetail = frontDetails[i]
                let frontDetailChild = frontDetail.firstElementChild;
                let frontName = frontDetail.dataset.attributeName;
                card.front[frontName] = frontDetailChild.value;
            }

            const backDetails = cardRow.getElementsByClassName("back_side");
            card.back = {};
            for (let i = 0; i < backDetails.length; i++) {
                let backDetail = backDetails[i]
                let backDetailChild = backDetail.firstElementChild;
                let frontName = backDetail.dataset.attributeName;
                card.back[frontName] = backDetailChild.value;
            }

            deck.push(card);
        }

        savedDeck.innerHTML = "Saving your deck is not yet supported. Here's the JSON" + "<br>";
        for (let card of deck) {
            savedDeck.innerHTML += JSON.stringify(card) + "<br>";
        }
    }
    addCardButton.addEventListener("click", addEmptyCard, false);
    saveDeckButton.addEventListener("click", saveDeck, false);
    loadDeckButton.addEventListener("click", loadDeck, false);
    addEmptyCard();
});