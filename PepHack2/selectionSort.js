

document.querySelector(".sel").addEventListener("click", function () {
    selectionSort();
})
async function selectionSort(delay = 100) {
    
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");
    // BubbleSort Algorithm
    for (let i = 0; i < elements.length; i++) {
        let min_idx = i;
        elements[i].style.backgroundColor = "#FF4949";
        let value1 = elements[i].style.height.slice(0, -2) / 4;
        let minvalue = value1;
        for (let j = i + 1; j < elements.length; j++) {
            
            elements[j].style.backgroundColor = "white";
            let value2 = elements[j].style.height.slice(0, -2) / 4;
            await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
            );
            if (value2 < minvalue) {
                min_idx = j;
                minvalue = value2;
            }
            elements[j].style.backgroundColor = "burlywood";
            
        }
        swapDiv(elements[i], elements[min_idx]);
        swap(listelements[i], listelements[min_idx]);
        // elements[i].style.backgroundColor = "burlywood";
        elements[i].style.backgroundColor = "#e67e22";
    }
}