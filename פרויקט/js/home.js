let exitAccount = document.getElementById("exitAccount");//אם השם משתמש כבר קיים הודעה
let currentUserName = localStorage.getItem("currentUserName");//השם משתמש הנוכחי 
if (currentUserName === "null") { // אם אין חשבון מחובר
    document.getElementById('sigh-up').style.display = 'block';
}
else { //אם יש כבר חשבון מחובר לא מופיע ההרשמה
    document.getElementById('page').style.opacity = "1";//בהירות
    document.getElementById('hello').textContent += " שלום " + currentUserName;//שלום לשם משתמש
    exitAccount.style.display = "block";//כפתור יציאה
}
exitAccount.addEventListener("click", exit);
function exit() {//בלחיצה על כפתור היציאה
    localStorage.setItem("currentUserName", null);//השם משתמש הוא null
    document.getElementById('sigh-up').style.display = 'block';//מביא את טופס ההרשמה
    document.getElementById('page').style.opacity = "0.2";//כהה
    document.getElementById('hello').textContent = "";
    document.getElementById("page").scrollIntoView({ behavior: 'smooth' });//גורר לתחילת העמוד
}
let connectToLogIn = document.getElementById("connect");//מעבר להתחברות-כפתור
function switchToLogIn() {//העברה לטופס התחברות
    document.getElementById('sigh-up').style.display = 'none';
    document.getElementById('log-in').style.display = 'block';
}
connectToLogIn.addEventListener("click", switchToLogIn);
let connectToSighUp = document.getElementById("returnToForm1");//-כפתור מעבר להרשמה
let switchToSighUp = () => {//מעבר להרשמה
    document.getElementById('sigh-up').style.display = 'block';
    document.getElementById('log-in').style.display = 'none';
};
connectToSighUp.addEventListener("click", switchToSighUp);

let user = {//אובייקט של המשתמש
    name: "",
    mail: "",
    password: "",
    wins: 0
}

let flagFirstTime = false;//משתנה שבודק האם המשתמש נרשם אן התחבר
localStorage.setItem("flagFirstTime", flagFirstTime);//כדי שכל העמודים יכירו את המשתנה
let buttonSighUp = document.getElementById('signupbtn');//כפתור ההרשמה
function sighUp() {//פנקציית הרשמה
    user.name = document.getElementById("name1").value;
    user.mail = document.getElementById("email1").value;
    user.password = document.getElementById("password1").value;
    if((user.name === "" && user.password === "" && user.mail === "")) {//אם אחד השדות ריקים
    }
    else if (user.name !== "" && user.mail !== "" && user.password !== ""&& JSON.parse(window.localStorage.getItem(user.name)) === null) {//אם הכל תקין
        flagFirstTime = true;
        localStorage.setItem(user.name, JSON.stringify(user));
        document.getElementById('sigh-up').style.display = "none";
        document.getElementById('page').style.opacity = "1";
        document.getElementById('hello').textContent += " שלום " + user.name;
        window.localStorage.setItem("currentUserName", user.name);
        localStorage.setItem("flagFirstTime", flagFirstTime);
        exitAccount.style.display = "block";
        document.getElementById("exist").style.display = "none";

    }
    else if ((JSON.parse(window.localStorage.getItem(user.name))) !== null)//אם השם משתמש כבר קיים במערכת
    {
        document.getElementById("exist").style.display = "block";
    }
    
}

    buttonSighUp.addEventListener("click", sighUp);
    let buttonLogIn = document.getElementById('loginbtn');
    let logIn = () => {//פונקציית התחברות
        user.name = document.getElementById("name2").value;
        user.password = document.getElementById("password2").value;
        let compare = JSON.parse(window.localStorage.getItem(user.name));
        if (compare === null) {//אם השם משתמש והסיסמא אינם קיימים
            document.getElementById("wrongAccount").style.display = "block";
        }
        else if ((user.name === compare.name) && (user.password === compare.password) && (user.name !== "") && (user.password !== "")) {
            document.getElementById('log-in').style.display = "none";
            document.getElementById('page').style.opacity = "1";
            document.getElementById('hello').textContent += " שלום " + user.name;
            window.localStorage.setItem("currentUserName", user.name);
            exitAccount.style.display = "block";
        }

    }
    buttonLogIn.addEventListener("click", logIn);