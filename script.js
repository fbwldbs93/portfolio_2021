

/* ------------------------
    마우스 따라다니는 원
--------------------------*/
/*

const circle = document.querySelector(".mouse-circle");

console.log(circle);
circle.style.opacity=0;

let mouseX=0, mouseY=0; //mouse position
let xp =0, yp=0;
let x = 0;


const mouseEvents = (e) => {
    //mouse will be positioned on page location - 30
    mouseX= e.pageX - 30;
    mouseY = e.pageY - 30;
}

document.addEventListener("mousemove", mouseEvents);


setInterval(()=>{
    xp += ((mouseX - xp)/6); 
    yp += ((mouseY - yp)/6);

    /*
    -------------------총 정리 ----------------------
        1. xp 는 mouseX 의 값을 따라잡을 때 까지 += 로 값을 0.2초간 더한다.
        2. mouseX의 값에 도달하였을 때 멈춰야한다. (즉, 더하는 값이 0이 되어야 한다.)
        3. mouseX의 값이 106일때, (mouseX - xp)/6의 값이 0이 되려면, xp의 값이 106이 되어야 함.

        4. mouseX의 값에 도달하였을 때 멈출 수 있는 이유?
        -  mouseX 값을 기준으로 식을 만들었고, xp가 mouseX의 값과 동일해지면 0이 되는 식이므로 mouseX에 도달하면 멈추게 되는 것. 
     */

   

    /*
        += 는 xp,yp 같은 요소들이 상호작용시 계속 업데이트 되어야 할 때 주로 사용.
        xp += (mouseX - xp)는 결국 변화되는 mouseX 와 같은 값이 되지만.
        그냥 xp = (mouseX - xp)와는 큰 차이가 있음.

        ---------example-------------
        xp += (mouseX - xp)
        - 100 += (200 - 100) ::: 2006
        - 200 += (300 - 200) ::: 300
        - 계속 상태가 업데이트 됨.

        xp = (mouseX - xp)
        - 100 = (200 - 100) ::: 100
        - 여기서 끝.
        - mouseX 의 상태가 변하더라도 xp는 100에서 끝임.

    */
   /*
    circle.style.left = `${xp}px`;
    circle.style.top = `${yp}px`;

    const disAppearCircle = () =>{
        if(xp == mouseX){
            circle.style.opacity=0;
        }else{
            circle.style.opacity=1;
        }
    }

    disAppearCircle();

}, 20);

/* ------------------------
    클릭 시 마우스 주변에서 깜박
--------------------------*/
/*
const circle = document.querySelector(".mouse-circle");

let eventStat;
let mouseX=0;
let mouseY=0;

function eventSet(e){

    mouseX = e.pageX;
    mouseY = e.pageY;

    mouseSet(mouseX, mouseY)

    //alert(`${mouseX}, ${mouseY}`);

    setTimeout(function(){
        circle.style.opacity = 0; 
    }, 500);
}

document.addEventListener("mousedown", eventSet);



function mouseSet(x, y){
    circle.style.left = `${x - 28}px`;
    circle.style.top = `${y - 28}px`;
}

*/
/* ------------------------
    글자 자동 타이핑
--------------------------*/

const typedTxtSpan = document.querySelector(".head-txt__txt");
const cursorSpan = document.querySelector(".head-txt__cursor");

const txtArray = ["I am publisher", "I am designer", "I have sense of UX"];
const typingDelay = 200;
const erasingDelay = 100;
const newTxtDelay = 2000;

let txtArrayIndex = 0; //배열인덱스
let charIndex = 0; //?

function type(){
    if(charIndex < txtArray[txtArrayIndex].length){

        if(!cursorSpan.classList.contains("typing")){
            //class typing 추가
            cursorSpan.classList.add("typing");
        }

        typedTxtSpan.textContent += txtArray[txtArrayIndex].charAt(charIndex);
        charIndex ++;

        setTimeout(type, typingDelay);

    }else{
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTxtDelay);
    }
}


function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")){
            cursorSpan.classList.add("typing");
        } 
        typedTxtSpan.textContent = txtArray[txtArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        txtArrayIndex++;
        if(txtArrayIndex>=txtArray.length) txtArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(txtArray.length) setTimeout(type, newTxtDelay + 250);
});


/* ------------------------
    원페이지 스크롤 구현
--------------------------*/
window.onload = function(){
const pages = document.querySelector(".pages");
const eachSec = document.querySelector(".sec");

let current = 0;

//init
let slides = pages.children;
let count = slides.length;

let animation_state = false;

function gotoNum(index){
    if( (index !== current) && !animation_state){
        animation_state = true;

        setTimeout(function(){
            animation_state = false;
        }, 500);

        current = index;

        for(let i = 0; i < count; i ++){
            slides[i].style.bottom = `${(current - i)* 100}%`;
        }

        if(index == 0){
            myCard.classList.remove("myCardAnis");
            myCard.classList.add("myCardAnis0");

            document.getElementById("sec-2").style.zIndex = "-1";

            progressReset();

        }else if(index == 1){
            myCard.classList.remove("myCardAnis0");
            myCard.classList.add("myCardAnis");

            document.getElementById("sec-2").style.zIndex = "-1";

            progress();
        }
    }

    
}


function gotoPrev(){
    if(current > 0){
        gotoNum(current - 1);
        //console.log("prev")
    }else{
        return false;
    }    
}

function gotoNext(){
    if(current < count -1){
        gotoNum(current + 1);
        //console.log("next")
    }else{
        return false;
    }
    
}


pages.addEventListener("mousewheel", function(e){

    if(e.deltaY < 0){
        gotoPrev();
    }else{
        gotoNext();
    }
});

/*---- 트랙패드로 슬라이드 실행 시 ----
트랙패드가 마우스 스크롤보다 더 민감하게 반응하기 때문에. 

deltaY 이벤트값 출력시, 기본값 0으로 돌아가지 않아, 슬라이드의 전체가 한번에 넘어가버림.

**** 트랙패드를 미묘하게 조작해줘야 함.

*/

function init(){

    // ------- 슬라이드 초기 설정 -------
    //slides = pages.children;
    //count = slides.length;

    for(let i =0; i < count; i ++){
        slides[i].style.bottom = `${-(i*100)}$`;
    }
}

init();




/*---------------------------
    카드 누르면 sec2로 이동
------------------------------*/

const myCard = document.querySelector(".cards__my-item");

//let slides2 = pages.children


function moveCardsAni(e){
    e.preventDefault();

    //myCard.classList.add("myCardAnis");

    //document.getElementById("sec-2").style.zIndex = "-1";

    /*myCard.animate([
        {top:0, transform:"rotate(30deg)"},
        {top:"500px", transform:"rotate(120deg)"}
    ], {
        duration:500,
        iterations: 1
    });*/

    //moveToSecond();
/*
    animation_state = true;

    setTimeout(function(){
        animation_state = false;
    }, 500);

    for(let i =0; i<count; i ++){
        slides[i].style.bottom = `${(1-i)*100}%`;
    }

*/  
}


myCard.addEventListener("click", moveCardsAni);

}



/* ------------------------
    skill progress circle
--------------------------*/

//const round = Array.from(document.querySelectorAll(".round"));
let round = document.getElementsByClassName("round");
let percentNum = Array.from(document.querySelectorAll(".skill__percent-num"));
let roundChild;
/*
for(let i = 0; i < round.length; i ++){
    round = round[i];
    roundChild = round.childNodes[1]; //circle 접근

    console.log(round);
    console.log(roundChild)
}
*/

/*
let i =0;

if(i < round.length){
    round = round[i];
    i++;

    roundChild = round.childNodes[1];

    console.log(round);
    console.log(roundChild)
    
}
*/


/*
//const roundChild = round.childNodes[1];
const roundRadius = roundChild.getAttribute("r"); 
const roundPercent = round.dataset.percent; //퍼센트 값
const roundCircle = 2 * roundRadius * Math.PI;
const roundDraw = roundPercent * roundCircle / 100;

const percentNum = Array.from(document.querySelectorAll(".skill__percent-num"));
*/

let num = 0;


function progress(){

    for(let i = 0; i < round.length; i ++){
        //round = round[i];
        roundChild = round[i].childNodes[1]; //circle 접근
    


        const roundRadius = roundChild.getAttribute("r"); 
        const roundPercent = round[i].dataset.percent; //퍼센트 값
        const roundCircle = 2 * roundRadius * Math.PI;
        const roundDraw = roundPercent * roundCircle / 100;
        

        /////


        round[i].style.strokeDasharray = `${roundDraw}  999`;

        if(num < roundPercent){
            
        // setInterval(function(){
                percentNum[i].textContent = `${num}%`;
                num++;
        // }, 20);


            setTimeout(progress, 10);
        }
    }
    
    
}

function progressReset(){
    for(let i = 0; i < round.length; i ++){
        round[i].style.strokeDasharray =`0 999`;

        const roundPercent = round[i].dataset.percent; //퍼센트 값

        if(num == roundPercent){
            num = 0;
            percentNum[i].textContent = num;
        }
    }
    
}

