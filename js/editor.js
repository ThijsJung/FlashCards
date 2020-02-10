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
        let frontSide = addEmptySide("front_side");
        let backSide = addEmptySide("back_side");
        let deleteCardButton = deleteCardButtonTemplate.content.cloneNode(true);
        deleteCardButton.querySelector("button").addEventListener("click", () => { deleteCard(cardId); }, false);

        // Add them to the DOM.
        cardRow.appendChild(frontSide);
        cardRow.appendChild(backSide);
        cardRow.appendChild(deleteCardButton);
        cards.appendChild(cardRow);

        return cardId;
    }

    function addEmptySide(sideClassName) {
        let side = cardSideTemplate.content.cloneNode(true);
        side.querySelectorAll("td").forEach(element => {
            element.className = sideClassName;
        });
        return side;
    }

    function deleteCard(cardId) {
        let card = document.getElementById(cardId);
        card.remove();
    }

    function populateCard(cardId, cardData) {
        let card = document.getElementById(cardId);
        populateSide(card, "front_side", cardData[0]);
        populateSide(card, "back_side", cardData[1]);
    }
    
    function populateSide(card, sideClassName, sideData) {
        let side = card.getElementsByClassName(sideClassName);
        side[1].querySelector("input").value = sideData.content.title;
        side[2].querySelector("input").value = sideData.content.description;
    }

    function loadDeck(deck) {
        console.log("Loading...");
        for (let cardData of previouslySavedDeck.cards) {
            let cardId = addEmptyCard();
            populateCard(cardId, cardData);
        }
    }

    function parseDataFromSide(cardRow, sideClassName) {
        const sideDetails = cardRow.getElementsByClassName(sideClassName);
        let side = {
            "type": sideDetails[0].firstElementChild.value,
            "content": {}
        };
        for (let i = 1; i < sideDetails.length; i++) {
            let sideDetail = sideDetails[i];
            let frontName = sideDetail.dataset.attributeName;
            side.content[frontName] = sideDetail.firstElementChild.value;
        }
        return side;
    }

    function saveDeck() {
        let deck = {};
        deck.name = "My sweet deck";
        deck.cards = [];
        for (let cardRow of cards.rows) {
            let card = [];
            card.push(parseDataFromSide(cardRow, "front_side"));
            card.push(parseDataFromSide(cardRow, "back_side"));
            deck.cards.push(card);
        }
        displaySavedDeck(deck);
    }
    
    function displaySavedDeck(deck) {
        savedDeck.innerHTML = "Saving your deck is not yet supported. Here's the JSON" + "<br>";
        savedDeck.innerHTML += JSON.stringify(deck) + "<br>";
    }

    addCardButton.addEventListener("click", addEmptyCard, false);
    saveDeckButton.addEventListener("click", saveDeck, false);
    loadDeckButton.addEventListener("click", loadDeck, false);
    // addEmptyCard();
});