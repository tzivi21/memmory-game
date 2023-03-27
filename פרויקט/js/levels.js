
let flagFirstTime=localStorage.getItem("flagFirstTime");
if(flagFirstTime==="true"){//אם זה הפעם הראשונה שנכנס למשחק יציג הוראות
    document.getElementById("instructions").style.display="block";
     document.getElementById("body").style.opacity="0.2";
     localStorage.setItem("flagFirstTime","false");
}
let x=document.getElementById("x");//יציאה מההוראות
x.addEventListener("click",()=>{
    document.getElementById("instructions").style.display="none";  
    document.getElementById("body").style.opacity="1";
})
