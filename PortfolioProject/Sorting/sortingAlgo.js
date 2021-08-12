// All Sorting Functions

// Bubble Sort
async function bubbleSort(array) {
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j += 1) {

            elements[j].style.backgroundColor = "#8e44ad";
            elements[j + 1].style.backgroundColor = "#8e44ad";
            await new Promise(function (scb, fcb) {
                setTimeout(function () {
                    scb();
                }, cSpeed);

            });
            if (array[j] > array[j + 1]) {
                await swapDiv(elements[j], elements[j + 1]);
                await swap(listelements[j], listelements[j + 1]);
                swapArr(array, j, j + 1);
            }
            elements[j].style.backgroundColor = "burlywood";
            elements[j + 1].style.backgroundColor = "burlywood";

        }
        elements[elements.length - i - 1].style.backgroundColor = "#e67e22";

    }
    console.log(array);

}
// Insertion Sort
async function insertionSort(array) {
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");
    let n = array.length;
    for (let i = 1; i < n; ++i) {
        elements[i].style.backgroundColor = "#95a5a6";
        let key = array[i];
        let j = i - 1;

        await new Promise(function (scb, fcb) {
            setTimeout(function () {
                scb();
            }, cSpeed);

        });

        while (j >= 0 && array[j] > key) {
            await swap(listelements[j + 1], listelements[j]);
            await swapDiv(elements[j + 1], elements[j]);
            swapArr(array, j + 1, j);
            elements[j + 1].style.backgroundColor = "#e67e22";
            elements[j].style.backgroundColor = "#8e44ad";
            await new Promise(function (scb, fcb) {
                setTimeout(function () {
                    scb();
                }, cSpeed);

            });
            j = j - 1;
        }
        array[j + 1] = key;
        listelements[j + 1].innerHtml = listelements[i].innerHtml;
        elements[j + 1] = elements[i];

        elements[i].style.backgroundColor = "burlywood";
        for (let k = 0; k <= i; k++)
            elements[k].style.backgroundColor = "#e67e22";


    }
}
//Selection Sort
async function selectionSort(array) {
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");

    for (let i = 0; i < array.length; i++) {
        let min_idx = i;
        elements[i].style.backgroundColor = "#FF4949";
        for (j = i + 1; j < array.length; j++) {
            elements[j].style.backgroundColor = "#8e44ad";
            await new Promise(function (scb, fcb) {
                setTimeout(function () {
                    scb();
                }, cSpeed);

            });

            if (array[j] < array[min_idx])
                min_idx = j;
            elements[j].style.backgroundColor = "burlywood";

        }
        // Swap the found minimum element with the first element

        await swapDiv(elements[i], elements[min_idx]);
        await swap(listelements[i], listelements[min_idx]);
        swapArr(array, i, min_idx);
        elements[i].style.backgroundColor = "#e67e22";



    }
    console.log(array);
}
//Quick Sort
async function quickSort(arr, lo, hi) {
    elements = document.querySelectorAll(".element");
    listelements = document.querySelectorAll(".list-element");
    // console.log(elements);

    if (lo > hi) {
        return;
    }
    let pivot = arr[hi];
    let pidx = await quickSortpartition(arr, elements, listelements, pivot, lo, hi);

    await quickSort(arr, lo, pidx - 1);
    await quickSort(arr, pidx + 1, hi);
    // console.log(arr);
}

async function quickSortpartition(arr, elements, listelements, pivot, lo, hi) {
    let i = lo, j = lo;
    elements[hi].style.backgroundColor = "#FF4949";

    while (i <= hi) {
        if (arr[i] <= pivot) {
            if (i != hi)
                elements[i].style.backgroundColor = "#8e44ad";
            elements[j].style.backgroundColor = "#95a5a6";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, cSpeed)
            );
            swapArr(arr, i, j);
            await swapDiv(elements[i], elements[j]);
            await swap(listelements[i], listelements[j]);

            elements[i].style.backgroundColor = "burlywood";
            elements[j].style.backgroundColor = "burlywood";

            i++;
            j++;
        } else {
            i++;
        }
    }
    elements[j - 1].style.backgroundColor = "#e67e22";
    return (j - 1);
}





//MergeSort Algorithm
async function mergeSort(arr, l, r) {
    if (l >= r) {
        return;//returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
    await new Promise(function (scb, fcb) {
        setTimeout(function () {
            scb();
        }, cSpeed);

    });

    displaySortedList(array);


}
async function merge(arr, l, m, r) {
    for (let i = l; i <= r; i++) {
        stateArr[i] = "current";
        displaySortedList(arr);
        colorChange(l, r);
    }
    // console.log(stateArr);
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];


    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;

        }
        else {
            arr[k] = R[j];
            j++;
        }
        stateArr[k] = "sorted";
        k++;
        stateArr[k] = "sorted";
        // console.log(stateArr);  
        displaySortedList(arr);
        colorChange(l, r);
    }


    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        stateArr[k] = "sorted";
        displaySortedList(arr);
        colorChange(l, r);
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        stateArr[k] = "sorted";
        displaySortedList(arr);
        colorChange(l, r);
    }

    displaySortedList(array);
    colorChange(l, r);
}



