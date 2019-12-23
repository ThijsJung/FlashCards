var deckData = [
    {
        "front": {
            "content": {
                "type": "text",
                "title": "The house"
            }
        },
        "back": {
            "content": {
                "type": "text",
                "title": "La casa"
            }
        }
    },
    {
        "front": {
            "content": {
                "type": "text",
                "title": "The cat (m)"
            }
        },
        "back": {
            "content": {
                "type": "text",
                "title": "El gato"
            }
        }
    }
];
var i = 0;
var viewerFacingSide = "front";
var deckLength = deckData.length;
var correctAnswers = [];
var incorrectAnswers = [];

function load_card(index, side){
    let cardData = deckData[index];
    let card_content_el = document.getElementById("card_box");
    card_content_el.innerHTML = "";
    let card_content = cardData.front.content.title;
    if(side === "back"){
        card_content = cardData.back.content.title;
    }
    card_content_el.innerHTML = card_content;
}

function turnCardOver(){
    if(viewerFacingSide === "front"){
        load_card(i, "back");
        viewerFacingSide = "back"
    }else{
        load_card(i, "front");
        viewerFacingSide = "front"
    }
}

function nextCard(){
    if(i < deckLength - 1){
        i += 1;
        load_card(i, "front");
    }else{
        alert("Correct cards: " + correctAnswers + "\n" + "Incorrect cards: " + incorrectAnswers);
    }
}

function correctAnswer(){
    correctAnswers.push(i);
    nextCard();
}

function incorrectAnswer(){
    incorrectAnswers.push(i);
    nextCard();

}

load_card(0, "front");