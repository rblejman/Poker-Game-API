//Example fetch using Poker Cards
let deckId = "";
if (!localStorage.getItem("deckId")) {
  fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      localStorage.setItem("deckId", data.deck_id);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
} else {
  deckId = localStorage.getItem("deckId");
}

document.querySelector("button").addEventListener("click", drawTwo);
document.querySelector("#shuffle").addEventListener("click", shuffleDeck);

function drawTwo() {
  //const choice = document.querySelector("input").value;
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (data.remaining == 0) {
        shuffleDeck();
      }

      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;

      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      if (player1Val > player2Val) {
        document.querySelector("h3").innerText = "player 1 wins";
      } else if (player1Val < player2Val) {
        document.querySelector("h3").innerText = "player 2 wins";
      } else {
        document.querySelector("h3").innerText = "It's a draw";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

function shuffleDeck() {
  //const choice = document.querySelector("input").value;
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
