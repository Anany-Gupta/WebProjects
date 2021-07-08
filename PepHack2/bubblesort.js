document.querySelector(".bbl").addEventListener("click", function () {
    bubbleSort();
})
async function bubbleSort(delay=100) {
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");
    // BubbleSort Algorithm
    for (let i = 0; i < elements.length; i += 1) {
        for (let j = 0; j < elements.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            elements[j].style.backgroundColor = "#FF4949";
            elements[j + 1].style.backgroundColor = "#FF4949";

            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = elements[j].style.height.slice(0, -2) / 4;
            let value2 = elements[j + 1].style.height.slice(0, -2) / 4;
            


            // To compare value of two blocks
            if (value1 > value2) {
                await swapDiv(elements[j], elements[j + 1]);
                await swap(listelements[j], listelements[j + 1]);
                
                
            }

            // Changing the color to the previous one
            elements[j].style.backgroundColor = "burlywood";
            elements[j + 1].style.backgroundColor = "burlywood";

        }

        //changing the color of greatest element 
        //found in the above traversal
        elements[elements.length - i - 1].style.backgroundColor = "#e67e22";
    }
}