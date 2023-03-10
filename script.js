var romaji = document.getElementById("romaji")
const allSymbols = [
    "img/katakana_A.svg", 
    "img/katakana_GU.svg", 
    "img/katakana_KI.svg",
];
var identification = 0;
var elementScore = document.getElementById("score").innerHTML;
var score = 0;


romaji.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        allKata = document.getElementsByClassName("symbol");
        arrayTarget = [];
        for (i = 0; i < allKata.length;i++){
            console.log(allKata[i].getAttribute('src'))
            console.log(getSymbol(allKata[i].getAttribute("src")))
            console.log(romaji.value.toUpperCase())
            if (getSymbol(allKata[i].getAttribute("src")) == romaji.value.toUpperCase()){
                arrayTarget.push(allKata[i]);
                killTarget(arrayTarget).remove(); 
                score = score + 10;   
                document.getElementById("score").innerHTML = "Score : " + score;
                console.log(elementScore);
                romaji.style.background= "green";
                romajiReset();
            }
        }
        romaji.value = "";
    }
});

function Spawn(){
    const screen = document.getElementById("screen");
    const svg = document.createElement("img");
    svg.classList.add("symbol");
    svg.src = randomisedImage(allSymbols);
    svg.height = "100";
    svg.width = "100";
    svg.style.left = getInitialPosition() + "px";
    svg.id = identification;
    identification = identification + 1;
    screen.appendChild(svg);
}

function killTarget(array){
    return array.reduce((a,b) => a.id < b.id ? a : b);
}

function romajiReset(){
    setInterval(()=>{
        romaji.style.background= "white";
    }, 1000);
}

function Loop(){
    setInterval(Spawn,Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
}

function randomisedImage(array){
    const random = Math.floor(Math.random() * array.length);
    return allSymbols[random];
}

function getInitialPosition(){
    return Math.floor(Math.random() * (window.innerWidth - window.innerWidth*20/100 - 0 + 1) + 0);
}

function getSymbol(image){
    return image.replace(/(^i.*_|.svg$)/g,"");
}


for (i = 0; i < 10; i++){
    allKata = document.getElementsByClassName("symbol");
    const vspeed = 50;
    let elemRect = document.getElementById("romaji").getBoundingClientRect(),
    offset = elemRect.top;
    setInterval(() => {
        for (i = 0; i < allKata.length; i++){
            var top = allKata[i].offsetTop; 
            allKata[i].style.top = (top + 1 + "px");

            if (parseInt(allKata[i].style.top, 10) + 100  >= offset){
                allKata[i].remove();
            }
        }

    }, vspeed);
}

Loop();





