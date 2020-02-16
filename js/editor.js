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
    const sideTemplate = document.getElementById("side_template");
    const textSideTemplate = document.getElementById("text_side_template");
    const imgSideTemplate = document.getElementById("img_side_template");
    const deleteCardButtonTemplate = document.getElementById("delete_card_button_template");
    const addCardButton = document.getElementById("add_card_button");
    const saveDeckButton = document.getElementById("save_deck_button");
    const loadDeckButton = document.getElementById("load_deck_button");
    const savedDeck = document.getElementById("saved_deck");

    function addEmptyCard() {
        const card = document.createElement("div");
        card.className = "card";
        // Add id to the card so it can be deleted.
        const cardCount = cards.childElementCount;
        const cardId = "card_" + cardCount;
        card.id = cardId;

        // Clone the front, back and delete button. Activate the button
        let front = textSideTemplate.content.cloneNode(true);
        const frontSideId = "side_" + cardCount * 2;
        front.querySelector("span").id = frontSideId;
        const frontSideTypeSelectButton = front.querySelector("select");
        frontSideTypeSelectButton.addEventListener("change", function () {
            updateSideDetails(this.value, frontSideId),
                false
        });

        const back = textSideTemplate.content.cloneNode(true);
        const backSideId = "side_" + (cardCount * 2 + 1);
        back.querySelector("span").id = backSideId;
        const backSideTypeSelectButton = back.querySelector("select");
        backSideTypeSelectButton.addEventListener("change", function () {
            updateSideDetails(this.value, backSideId),
                false
        });

        const deleteCardButton = deleteCardButtonTemplate.content.cloneNode(true);
        deleteCardButton.querySelector("button").addEventListener("click", () => { deleteCard(cardId); }, false);

        card.appendChild(front);
        card.appendChild(back);
        card.appendChild(deleteCardButton);
        cards.appendChild(card);

        return cardId;
    }

    function updateSideDetails(sideType, sideId) {
        let side = document.getElementById(sideId);
        let sideDetails = null;
        if (sideType == 'text') {
            sideDetails = textSideTemplate.content.cloneNode(true);
        } else if (sideType == 'img') {
            sideDetails = imgSideTemplate.content.cloneNode(true);
        }
        const frontSideTypeSelectButton = sideDetails.querySelector("select");
        frontSideTypeSelectButton.value = sideType;
        frontSideTypeSelectButton.addEventListener("change", function () {
            updateSideDetails(this.value, sideId),
                false
        });
        side.innerHTML = "";
        side.appendChild(sideDetails);
    }

    function deleteCard(cardId) {
        let card = document.getElementById(cardId);
        card.remove();
    }

    function populateCard(cardId, cardData) {
        let card = document.getElementById(cardId);
        populateSide(card.children[0], cardData[0]);
        populateSide(card.children[1], cardData[1]);
    }

    function populateSide(card, sideData) {
        let side = card.children;
        side[1].value = sideData.content.title;
        side[2].value = sideData.content.description;
    }

    function loadDeck(deck) {
        for (let cardData of previouslySavedDeck.cards) {
            let cardId = addEmptyCard();
            populateCard(cardId, cardData);
        }
    }

    function parseDataFromSide(side) {
        const sideChildren = side.children;
        let sideData = {
            "type": sideChildren[0].value,
            "content": {}
        };
        for (let i = 1; i < sideChildren.length; i++) {
            let sideDetail = sideChildren[i];
            let frontName = sideDetail.dataset.attributeName;
            sideData.content[frontName] = sideDetail.value;
        }
        return sideData;
    }

    function saveDeck() {
        let deck = {};
        deck.name = "My sweet deck";
        deck.cards = [];
        for (let card of cards.getElementsByClassName("card")) {
            const sides = card.getElementsByTagName("span");
            const cardData = [];
            cardData.push(parseDataFromSide(sides[0]));
            cardData.push(parseDataFromSide(sides[1]));
            deck.cards.push(cardData);
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
    addEmptyCard();
    // loadDeck();
});