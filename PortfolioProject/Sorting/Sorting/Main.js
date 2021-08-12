
let elementDiv = document.querySelector(".element-divs");
let ListDiv = document.querySelector(".list");
let array = [];
let len = 30;
let cSpeed = 300;
let newArrayBtn = document.querySelector(".crt");
let speed = document.querySelector("#speed");
let allAlgoBtns = document.querySelectorAll('.panel-btns');
let stateArr = [];

//Adding event Listener to the Algorithm Btn
document.querySelector(".bbl").addEventListener("click",async function () {
    disableOtherBtn("bbl");
    await bubbleSort(array);
    enableAllBtns();
})

document.querySelector(".ins").addEventListener("click",async function () {
    disableOtherBtn("ins");
    await insertionSort(array);
    enableAllBtns();
})


document.querySelector(".sel").addEventListener("click", async function () {
    disableOtherBtn("sel");
    await selectionSort(array);
    enableAllBtns();
})
document.querySelector(".qck").addEventListener("click",async function () {
    disableOtherBtn("qck");
    await quickSort(array,0,array.length-1);
    enableAllBtns();
})

document.querySelector(".mrg").addEventListener("click", async function (e) {
    disableOtherBtn("mrg");
    await createStateArray();
    await mergeSort(array, 0, array.length - 1);
    displaySortedList(array);
    colorChange(0, array.length - 1);
    enableAllBtns();

})
   


let arrayLen = document.querySelector("#arraylen");
arrayLen.addEventListener("change", function () {
    len = arrayLen.value;

    createArray();
});
speed.addEventListener("change", function () {
    cSpeed = speed.value;
})

function createArray() {
    elementDiv.innerHTML = "";
    ListDiv.innerHTML = "";
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
    
    document.querySelector(".element-divs").innerHTML = "";
    document.querySelector(".list").innerHTML = "";
    createArray();
})
function swapDiv(e1, e2) {
    return new Promise(function (scb, fcb) {
        let temp = e1.style.height;
        e1.style.height = e2.style.height;
        e2.style.height = temp;
        window.requestAnimationFrame(function () {
            setTimeout(function () { }, cSpeed);
        });
        scb();
    });
}
function swap(e1, e2) {
    return new Promise(function (scb, fcb) {
        let temp = e1.innerHTML;
        e1.innerHTML = e2.innerHTML;
        e2.innerHTML = temp;
        window.requestAnimationFrame(function () {
            setTimeout(function () { }, cSpeed);
        });
        scb();
    });
}
function swapArr(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function disableOtherBtn(currentAlgo) {
    for (let i = 0; i < allAlgoBtns.length ; i++) {
        if (!allAlgoBtns[i].classList.contains(currentAlgo)) {
            allAlgoBtns[i].classList.add("disable");
        }
    }

}
function enableAllBtns() {
    console.log("enter  ")
    for (let i = 0; i < allAlgoBtns.length ; i++) {
        if (!allAlgoBtns[i].classList.contains("disable"));
            allAlgoBtns[i].classList.remove("disable");



    }
}


function createStateArray() {
    for (i = 0; i < array.length; i++) { stateArr.push("unsorted") };
}
function colorChange(l, r) {
    for (let i = l; i <= r; i++) {
        elements = document.querySelectorAll(".element");
        if (stateArr[i] == "sorted") {
            elements[i].style.backgroundColor = "#8e44ad";
        }
        else {

            elements[i].style.backgroundColor = "burlywood";
        }


    }
}
function displaySortedList(array) {
    elementDiv.innerHTML = "";
    ListDiv.innerHTML = "";
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
