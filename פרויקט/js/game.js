
let emoji = ['😁', '😘', '😊', '😍', '😎', '🤩', '🤗', '😑', '🙄', '😥', '😮', '🥱', '😴', '😓',
    '🤑', '😖', '🤪', '😵', '🥴', '😡', '🥳', '🦁', '🐯', '🐱', '🐺', '🐶', '🙊', '🙉', '🥶', '🐼',
    '🐨', '🐹', '🐰', '🐸', '👮‍♂️', '🕵️', '💂‍♀️', '💕', '👨‍⚕️', '👷', '👩‍🏫', '👩‍🌾', '🐥', '🤡', '👩‍🎨', '👩‍🚀',
    '🧑', '🤾', '🏋️', '🚴‍♀️', '🤸‍♀️', '⛹️', '🤸', '🥼', '🧥', '🧤', '🧦', '🧣', '🩳', '👘', '🏂', '🎒',
    '🛍️', '🥾', '👠', '👟', '⚽', '⚾', '🏀', '🏐', '🎳', '🏉', '🏈', '🍕', '🍔', '🌭', '🥨', '🥯',
    '🥖', '🥐', '🥪', '🌮', '🥗', '🎂', '🍪', '🧁', '🍧', '🍩', '🍭', '🍬', '🍡', '🍯', '🍉', '🍊',
    '🥭', '🍍', '🍋', '🍐', '🍑', '🍒', '🫐', '🍓', '🍅', '🌶️', '🌽', '🍆', '🥑', '🥦', '🥕'];
let emojiSave = emoji;//שומר את המערך המקורי כדי להשוות אחר כך 
let size = emoji.length;
let board = document.getElementById("board-container");
let cardClassName1;//class של שני הכרטיסים שנלחצו כדי להשוות
let cardClassName2;
let cardId1;//id של שני הכרטיסים שנלחצו
let cardId2;
let userName = window.localStorage.getItem("currentUserName");//שם המשתמש הנוכחי
let interval;//הטיימר
let hintOn = document.getElementById("on");
let hintOff = document.getElementById("off");
let emojiHint = [];//מערך אימוגים שעדין לא גולו בשביל הרמז
let user = JSON.parse(window.localStorage.getItem(userName));//אובייקט של המשתמש
//פונקציה המסדרת את הכרטיסים על הלוח
function setBoard(dimention) {
    board.style.gridTemplateColumns = `repeat(${dimention},12vw`;
    if (dimention === 2) {//עיצוב ללוח לכל שלב
        board.style.width = "35%";
        board.style.height = "auto";
        board.style.marginRight = "33%";
        board.style.marginTop = "20px";
        document.getElementById("stats").style.marginTop = "2vw";
    }
    if (dimention === 4) {
        board.style.width = "47%";
        board.style.marginRight = "30%";
        board.style.fontSize = "5vw";
        board.style.gridTemplateColumns = `repeat(4,8vw)`;
        board.style.padding = "1vw";
        board.style.marginTop = "4vw";
        document.getElementById("stats").style.position = "fixed";
        hintOn.style.display = "block";
    }
    if (dimention === 6) {
        board.style.width = "90%";
        board.style.marginRight = "5%";
        board.style.fontSize = "4.3vw";
        board.style.gridTemplateColumns = `repeat(9,7vw)`;
        board.style.padding = "1vw";
        document.getElementById("stats").style.fontSize = "1.5vw";
        document.getElementById("stats").style.width = "12vw";
        document.getElementById("stats").style.marginBottom = "1vw";
        hintOn.style.display = "block";
    }

    let cards = [];//המערך של הכרטיסים שיהיו במשחק
    let tempSize = size;
    let id = 1;
    for (let i = 0; i < (dimention * dimention) / 2; i++) {
        let index = Math.round(Math.random() * (tempSize - 1));//הגרלת אימוגי מתוך מערך האימוגים
        emojiHint.push(`${emoji[index]}`);//מוסיף אותו למערך האימוגים שנמצאים במשחק בשביל הרמז
        cards.push(`<div class="${emoji[index]} card" id="${id}"><div class="card-front"><span>${emoji[index]}</span></div><div class="card-back"></div></div>`);
        id++;
        cards.push(`<div class="${emoji[index]} card" id="${id}"><div class="card-front"><span>${emoji[index]}</span></div><div class="card-back"></div></div>`);
        id++;
        emoji.splice(index, 1);//הסרת האימוג'י ששומש ממערך האימוגים כדי שלא יחזור על עצמו
        tempSize--;//מערך האימוגים קטן ב-1

    }
    emoji = emojiSave;//משלימה את האימוגים שירדו מהמערך של האימוגים
    let sizeCardsArray = cards.length;
    for (let i = 0; i < dimention * dimention; i++) {//מוציאה את הכרטיסים ללוח מעורבבים ובלי חזרה
        let index = Math.round(Math.random() * (sizeCardsArray - 1));
        board.innerHTML += cards[index];
        cards.splice(index, 1);
        sizeCardsArray--;
    }
    let cardsArray = document.getElementsByClassName("card");//מערך שמכיל את כל הכרטיסים
    if (dimention === 2) {//עיצוב הכרטיסים לפי השלב
        for (let i = 0; i < cardsArray.length; i++) {
            cardsArray[i].style.width = "12vw";
            cardsArray[i].style.height = "12vw";
        };
    }
    if (dimention === 4) {
        for (let i = 0; i < cardsArray.length; i++) {
            cardsArray[i].style.width = "8vw";
            cardsArray[i].style.height = "8vw";
        };
    }
    if (dimention === 6) {
        for (let i = 0; i < cardsArray.length; i++) {
            cardsArray[i].style.width = "7vw";
            cardsArray[i].style.height = "7vw";

        };
    }
}

//פונקציה שמוצאת מתוך השם של העמוד את המימד שבו המשחק יתבצא
function getDimention() {
    let searchParams = new URLSearchParams(window.location.search);
    let dimention;
    if (searchParams.has('dimention')) {
        dimention = searchParams.get('dimention');
        dimention = parseInt(dimention);
    }
    setBoard(dimention);
    return dimention;
}

let dimention = getDimention();
//קריאה לטיימר להתחלת המשחק
timerFunc();
//הפיכת הקלפים
let card = document.getElementsByClassName("card");//מערך הכרטיסים שבעמוד
let countCouple = 0;//סופר כמה זוגות המשתמש גילה
for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", flipCard);;
}
//הופכת את הקלפים
function flipCard(e) {
    e.currentTarget.classList.toggle('flip-card');//הופך את הכרטיס שנלחץ
    if (cardClassName1 == null) {
        cardClassName1 = e.currentTarget.classList;
        cardId1 = e.currentTarget.id;
    }
    else {
        cardClassName2 = e.currentTarget.classList;
        cardId2 = e.currentTarget.id;
        if (cardClassName2 && cardClassName1) {
            let card1 = document.getElementById(cardId1);//שני הכרטיסים שנלחצו
            let card2 = document.getElementById(cardId2);
            if (cardClassName2.value === cardClassName1.value) {//אם הכרטיסים שווים
                let emojiToDelete = cardClassName2[0];//האימוגי שצריך למחוק מהמערך של הרמז
                for (let indexEmoji = 0; indexEmoji < emojiHint.length; indexEmoji++) {//מחיקה של האימוגי שכבר גולה ממערך האימוגים של הרמז
                    if (emojiHint[indexEmoji] === emojiToDelete) {
                        emojiHint.splice(indexEmoji, 1)
                    }
                }
                console.log("couple");
                let audioEl2 = document.createElement("audio");//צליל של מציאת זוג
                audioEl2.src = "../audio/couple.mp3";
                audioEl2.autoplay = "true";
                countCouple++;
                card1.removeEventListener("click", flipCard);//הסרת האפשרות ללחוץ על הכרטיסים שנמצאו
                card2.removeEventListener("click", flipCard);
                if (countCouple === ((dimention * dimention) / 2)) {//בודק האם יש ניצחון
                    clearInterval(intervalId);//הפסקת הטיימר
                    window.setTimeout(() => {//מחכה שניה לפני שמציג הודעת ניצחון
                        document.getElementById("page").style.opacity = "0.1";
                        user.wins += 1;
                        window.localStorage.setItem(userName, JSON.stringify(user));
                        let win = document.getElementById("win");//הודעת הניצחון
                        document.getElementById("numberWins2").innerHTML += (JSON.parse(window.localStorage.getItem(userName)).wins);//מוסיף את מספר הניצחונות להודעה
                        win.style.display = "block";
                        let audioWin = document.createElement("audio");//סאונד ניצחון
                        audioWin.src = "../audio/ניצחון.mp3";
                        audioWin.autoplay = "true";
                    }, 1000)
                }
                document.getElementById("couples").innerHTML = countCouple;//עידכון הזוגות במסך
                window.setTimeout((cardId1, cardId2) => {//טשטוש הכרטיסים שנמצאו
                    card1.firstChild.classList.add("card-none");
                    card2.firstChild.classList.add("card-none");
                }, 700, cardId1, cardId2);

            }
            else {//אם זה לא זוג
                console.log("not a couple");
                window.setTimeout((cardId1, cardId2) => { //פונקציה שהופכת את הקלפים בחזרה
                    flipOver(cardId1);
                    flipOver(cardId2);
                }, 700, cardId1, cardId2);



            }
        }
        cardClassName2 = null;
        cardClassName1 = null;
        cardId1 = null;
        cardId2 = null;
    }

}
// פונקציה שהופכת את הכרטיס בחזרה
function flipOver(id) {
    document.getElementById(id).classList.toggle('flip-card');
}
//פונקציית טיימר
function timerFunc() {
    let timerDiv = document.getElementById("timer");
    let count;
    if (dimention === 2) {//הטיימר משתנה לפי השלב
        count = 10;
    }
    if (dimention === 4) {
        count = 50;
    }
    if (dimention === 6) {
        count = 120;
    }
    intervalId = setInterval(() => {
        timerDiv.innerHTML = count;
        let second = count % 60;
        let minet = Math.floor(count / 60);
        let zero = "";
        if (second < 10)
            zero = "0"
        timer.innerHTML = "0" + minet + ":" + zero + second;
        count--;

        if (count < 3) {
            timerDiv.style.color = "red";
        }
        if (count === 1 && countCouple !== ((dimention * dimention) / 2)) {//הפסד-נגמר הטיימר
            window.setTimeout(() => {
                clearInterval(intervalId);//עצירת הטיימר
                document.getElementById("page").style.opacity = "0.1";
                document.getElementById("numberWins1").innerHTML += (JSON.parse(window.localStorage.getItem(userName)).wins);
                let lose = document.getElementById("lose");//הודעת ההפסד
                lose.style.display = "block";
                let audioLose = document.createElement("audio");//סאונד הפסד
                audioLose.src = "../audio/losee.mp3";
                audioLose.autoplay = "true";

            }, 2000)

        }

    }, 1000);
}
//רמז
hintOn.addEventListener("click", hint);
function hint() {//הפעלת הרמז
    for (let i = 0; i < emojiHint.length; i++) {//הפיכת כל האימוגים שעדין לא גולו לשניה
        flipHint(emojiHint[i]);
    }
    window.setTimeout(() => {//יחכה שניה לפני שהופך בחזרה
        for (let i = 0; i < emojiHint.length; i++) {
            flipHint(emojiHint[i]);
        }
    }, 1000)
    hintOn.style.display = "none";
    hintOff.style.display = "block";

}
//פונקציה שהופכת את שתי הכרטיסים עם האימוגי שנשלח
function flipHint(classCard) {
    let twoCards = document.getElementsByClassName(classCard);
    for (let i = 0; i < twoCards.length; i++) {
        twoCards[i].classList.toggle('flip-card');
    }

}

