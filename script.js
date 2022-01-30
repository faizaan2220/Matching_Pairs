const cards = document.querySelectorAll(".card");
const countTime = document.querySelector(".sec");

let cardOne, cardTwo;
let dis = false;

let matchedCard = 0;
let timeVal = 50;
let counter;

function timeOver() {
    document.querySelector(".timer").style.display = "none"
    shuffleCard();
    startBtn.style.display = "block";
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        countTime.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            countTime.textContent = "00";
            setInterval(timeOver, 1000);
        }
    }
}




function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !dis) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        dis = true;
        let cardOneImg = cardOne.querySelector(".img_back").src;
        let cardTwoImg = cardTwo.querySelector(".img_back").src;
        return matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            clearInterval(counter);
            setTimeout(timeOver,4000);
            setTimeout(() => {
                return shuffleCard();
            }, 4000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return dis = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400)

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        dis = false;
    }, 1200)
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    dis = false;


    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".img_back");
        imgTag.src = `Images/img${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    })
}

shuffleCard();

cards.forEach(card => {
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
})


function enableCard() {
    startBtn.style.display = "none";
    document.querySelector(".timer").style.display = "block"
    startTimer(timeVal);
}
const startBtn = document.querySelector(".start");

startBtn.addEventListener("click", enableCard);