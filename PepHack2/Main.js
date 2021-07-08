
let elementDiv = document.querySelector(".element-divs");
let ListDiv = document.querySelector(".list");
let array = [];
let len = 20;
let cSpeed=160;
let newArrayBtn = document.querySelector(".crt");
let speed = document.querySelector("#speed");

let arrayLen = document.querySelector("#arraylen");
arrayLen.addEventListener("change",function(){
    len=arrayLen.value;

    createArray();
})
speed.addEventListener("change",function(){
    cSpeed=speed.value;
})

function createArray() {
    elementDiv.innerHTML="";
    ListDiv.innerHTML="";
    array = [];
    for (let i = 0; i < len; i++) { array.push(Math.floor(Math.random() * 100) + 1); }
    for (let i = 0; i < len; i++) {
        let element = document.createElement("div");
        let listelement = document.createElement("div");

        element.classList.add("element");
        element.setAttribute("id", `e${i}`);
        element.style.height = `${array[i] * 4}px`;

        elementDiv.append(element);

        listelement.classList.add("list-element");
        listelement.innerHTML = array[i];

        ListDiv.append(listelement);
    }
}

createArray();

newArrayBtn.addEventListener("click", function () {
    console.log("click");
    document.querySelector(".element-divs").innerHTML = "";
    document.querySelector(".list").innerHTML = "";
    createArray();
})
function swapDiv(e1, e2) {
    return new Promise((resolve) => {

        // For exchanging styles of two elements
        let temp = e1.style.height;
        e1.style.height = e2.style.height;
        e2.style.height = temp;


        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                resolve();
            }, 25);
        });
    });
}
function swap(e1,e2){
    return new Promise((resolve) => {
    let temp = e1.innerHTML;
    e1.innerHTML=e2.innerHTML;
    e2.innerHTML=temp; 
    window.requestAnimationFrame(function () {

        // For waiting for .25 sec
        setTimeout(() => {
            resolve();
        }, cSpeed);
    });   
    }); 
}
