/*globl, document*/
var start = document.querySelector(".control span"),
    nice = document.querySelector(".control p"),
    text = document.querySelector(".name span"),
    point = document.querySelector(".point span"),
    triesElement = document.querySelector(".tries span");
start.onclick = function () {
    "use strict";
    var nameValue = prompt("ما هو اسمك");
    if (nameValue == "" || nameValue == null) {
        text.innerHTML = localStorage.getItem("namestor");
    } else {
        localStorage.setItem("namestor",nameValue);
        text.innerHTML = localStorage.getItem("namestor");
    }
    document.querySelector(".control").style.display= "none";
    playTime();
    point.innerHTML = 0;
    triesElement.innerHTML = 0;
    for (var i = 0 ; i <= 19 ; i++){
        document.getElementsByClassName("game")[i].classList.add("match");
    }
    
    function showCard(){
    setTimeout(()=> {
            for (var i = 0 ; i <= 19 ; i++){
                document.getElementsByClassName("game")[i].classList.remove("match");
                document.getElementById("page").play();
                document.getElementById("clock").play();
            }
        },4000);
    }
    showCard();
    timeBad();
}
function timeBad(){
        setTimeout(()=> {
            document.getElementById("clock").pause();
            document.querySelector(".control").style.display= "block";
            start.innerHTML= "النقاط: " + point.innerHTML+ "<br>" + " انتهت اللعبة .. حاول مره اخرى";
            document.getElementById("false").play();
            for (var i = 0 ; i <= 19 ; i++){
                document.getElementsByClassName("game")[i].classList.remove("match");
            }
        },64000);
};

//play time
function playTime() {
    setTimeout(function(){
        var timeDiv = document.querySelector(".time"),
            seconds = 59,
            secondBass,
            countDown = setInterval( function () {
                    "use strict"
                    secondBass();
                },1000);
        function secondBass() {
            var minutes = "0" + Math.floor(seconds / 60),
                remSeconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
                timeDiv.style.color = "rgb(159, 7, 7)";
            }

            timeDiv.innerHTML = minutes + ":" + remSeconds;

            if (seconds > 0 ) {
                seconds = seconds - 1;
            } else {
                clearInterval(countDown);
                timeDiv.innerHTML = "00:00"
            }
            if (point.innerHTML == 10) {
                clearInterval(countDown);
                timeDiv.innerHTML = "00:00"
            }
        }
    },4000)
}


let duration = 700;
let gameBox = document.querySelector(".game-box");
let box = Array.from(gameBox.children);
let orderRange = [...Array(box.length).keys()];
shuffle(orderRange);
box.forEach((box,index) => {
    box.style.order = orderRange[index];
    box.addEventListener("click", function() {
        flip(box);
        document.getElementById("click").play();
    })
})

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random()* current)
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

function flip(select){
    select.classList.add("flip");
    let allFlip = box.filter(flip => flip.classList.contains("flip"));
    if (allFlip.length === 2) {
        stopClicking();
        checked( allFlip[0], allFlip[1]);
    }
}

//stopClicking

function stopClicking() {
    gameBox.classList.add("noclick");
    setTimeout(() => {
        gameBox.classList.remove("noclick");
    }, duration)
}

//check
function checked(firstBlock, secondBlock) {
    if (firstBlock.dataset.person === secondBlock.dataset.person) {
        firstBlock.classList.remove("flip");
        secondBlock.classList.remove("flip");
        
        firstBlock.classList.add("match");
        secondBlock.classList.add("match");
        setTimeout(()=> {
            document.getElementById("true").play();
            point.innerHTML = parseInt(point.innerHTML)+ 1;
            if (point.innerHTML == 10) {
                document.querySelector(".control").style.display= "block";
                nice.innerHTML= "النقاط: " + point.innerHTML + "<br>" + " ممتاز " + "ابدأ مرة اخرى";
                nice.style.padding = "10px 100px";
                nice.style.display = "block";
                start.style.display = "none"
                document.getElementById("true").play();
                for (var i = 0 ; i <= 19 ; i++){
                document.getElementsByClassName("game")[i].classList.remove("match");
                }
            }
        },duration)
            
    } else {
        setTimeout(()=> {
            firstBlock.classList.remove("flip");
            secondBlock.classList.remove("flip");
            document.getElementById("false").play();
            triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        },duration);     
    }
}   
nice.onclick = function () {
    location.reload();
}  
var cont = document.getElementById("cont"),
    loading = document.getElementById("loading");

window.onload = function () {
    loading.style.display = "none";
    cont.style.overflow = "hidden";
}
let today = new Date();
document.getElementsByClassName("footer")[0].innerHTML= today.getFullYear();