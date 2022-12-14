let select_on = false;
let select = document.getElementById("select");
let list = document.getElementById("list");
let items = document.getElementsByClassName("select");
let default_value = "Select Algorithm";
let bubble = "Bubble Sort";
let insert = "Insertion Sort";
let quick = "Quick Sort";
let merge = "Merge Sort";
let selectedValue = 0;
let array = document.getElementById("array-data");
let array_holder = document.getElementById("array");
let box = document.getElementById("box");
let data;
let data_size = 0;
let max_value;
let allow_run = true;
let delay = 1000;
let actions = document.getElementById("actions");
let swaps = document.getElementById("swaps");
let num = document.getElementById("num");
let order = document.getElementById('order');
let comparator = ASC;
let data_size_limit = 80;
if (screen.width < 1000) {
    data_size_limit = 50;
}
if (screen.width < 500) {
    data_size_limit = 20;
}
let random = document.getElementById('random');

function Select() {
    select_on = !select_on;
    if (select_on) {
        list.style.display = "block";
    } else {
        list.style.display = "none";
    }
}

function SelectItem(value) {
    if (value > 0 && value < 5) {
        selectedValue = value;
    }
    if (value === 1) {
        items[0].innerHTML = bubble;
        items[1].innerHTML = bubble;
    } else if (value == 2) {
        items[0].innerHTML = insert;
        items[1].innerHTML = insert;
    } else if (value == 3) {
        items[0].innerHTML = quick;
        items[1].innerHTML = quick;
    } else if (value == 4) {
        items[0].innerHTML = merge;
        items[1].innerHTML = merge;
    }
    Select();
}

function SetBox() {
    actions.innerHTML = "";
    swaps.innerHTML = "";
    num.innerHTML = "";
    if (array.value === "") {
        data = undefined;
        box.innerHTML = "";
        box.style.height = "0";
        array_holder.style.borderColor = "white";
        return;
    } 

    document.getElementById('reset').style.display = 'none';
    document.getElementById('start').style.display = 'block';

    box.style.height = "500px";
    data = array.value.split(" ");
    let min_value = Infinity;
    if (data.length > data_size_limit) {
        Alert("Array is too long (> " + data_size_limit +" elements).");
    }

    for (var i = 0; i < data.length; ++i) {
        if (isNaN(data[i]) || data[i] === '') {
            array_holder.style.borderColor = "red";
            let start = document.getElementById('start');
            start.onclick = EmergencyStart;
            return;
        } else {
            array_holder.style.borderColor = "white";
            let start = document.getElementById('start');
            start.onclick = Start;
            data[i] = Number(data[i]);
            if (data[i] < min_value) {
                min_value = data[i];
            }
        }
    }
    data_size = data.length;
    if (min_value <= 0) {
        for (var i = 0; i < data_size; ++i) {
            data[i] = data[i] + Math.abs(min_value) + 1;
        }
    }
    //console.log("user input: ", data);
    max_value = data[0];
    
    for (var i = 0; i < data_size; ++i) {
        if (max_value < data[i]) {
            max_value = data[i];
        }
    }
    box.innerHTML = "";
    for (var i = 0; i < data_size; ++i) {
        box.innerHTML += '<div class="bar" id="' + i + '" style="height: ' + String((data[i] / max_value) * 500) + 'px' + '"></div>';
    }

}

function SetHeight(index, height) {
    data_size = data.length;
    if (index < 0 || index >= data_size) {
        console.error("index out of bounds", index, data_size);
        return;
    }
    if (height <= 0 || height > max_value) {
        console.error("incorrect height", height, max_value);
        return;
    }
    let bar_i = document.getElementById(index);
    bar_i.style.height = String(height / max_value * 500) + 'px';
}

function SetColor(index_one, color) {
    data_size = data.length;
    if (index_one < 0 || index_one >= data_size) {
        console.error("index out of bounds", index_one);
        return;
    }
    let bar_1 = document.getElementById(index_one);
    bar_1.style.background = color;
}

function Lock() {
    console.log("lock");
    array.disabled = true;
    order.onclick = "";
    select.onclick = "";
    random.onclick = "";
}

function Unlock() {
    array.disabled = false;
    select.onclick = Select;
    order.onclick = ChangeOrder;
    console.log("unlock");
    random.onclick = Random;
}

function Reset() {
    box.innerHTML = "";
    box.style.height = "0";
    data = undefined;
    data_size = 0;
    actions.innerHTML = "";
    swaps.innerHTML = "";
    SetBox();
}

async function Start() {
    if (data === undefined || data === []) {
        console.error("no elements given");
        Alert("No elements given.");
        return;
    }
    if (selectedValue == 0) {
        console.error("no sort alg selected");
        Alert("No sorting alg selected.");
        return;
    }

    Lock();

    allow_run = true;

    let stop = document.getElementById('stop');
    let start = document.getElementById('start');
    let reset = document.getElementById('reset');
    stop.style.display = "block";

    if (selectedValue == 1) {
        console.log("call sort");
        let actions_cnt, swaps_cnt;
        [actions_cnt, swaps_cnt] = await BubbleSort(data, comparator);
        if (allow_run) {
            console.log("actions: ", actions_cnt, " swaps: ", swaps_cnt);
            if (lang_eng) {
                actions.innerHTML = "Bubble Sort has done <span style='color: var(--blue);'>" + actions_cnt + "</span> comparisons."
                swaps.innerHTML = "Bubble Sort has done <span style='color: var(--blue);'>" + swaps_cnt + "</span> element swaps.";
                num.innerHTML = "Array contains <span style='color: var(--blue);'>" + data.length + "</span> elements.";
            } else {
                actions.innerHTML = "Bubble Sort выполнил <span style='color: var(--blue);'>" + actions_cnt + "</span> сравнений."
                swaps.innerHTML = "Bubble Sort выполнил <span style='color: var(--blue);'>" + swaps_cnt + "</span> перестановок элементов.";
                num.innerHTML = "Массив содержит <span style='color: var(--blue);'>" + data.length + "</span> элементов.";
            }
        }
        stop.style.display = "none";
    }

    if (selectedValue == 2) {
        console.log("call sort");
        let actions_cnt, swaps_cnt;
        [actions_cnt, swaps_cnt] = await InsertionSort(data, comparator);
        if (allow_run) {
            console.log("actions: ", actions_cnt, " swaps: ", swaps_cnt);
            if (lang_eng) {
                actions.innerHTML = "Insertion Sort has done <span style='color: var(--blue);'>" + actions_cnt + "</span> comparisons."
                swaps.innerHTML = "Insertion Sort has done <span style='color: var(--blue);'>" + swaps_cnt + "</span> element swaps.";
                num.innerHTML = "Array contains <span style='color: var(--blue);'>" + data.length + "</span> elements.";
            } else {
                actions.innerHTML = "Insertion Sort выполнил <span style='color: var(--blue);'>" + actions_cnt + "</span> сравнений."
                swaps.innerHTML = "Insertion Sort выполнил <span style='color: var(--blue);'>" + swaps_cnt + "</span> перестановок элементов.";
                num.innerHTML = "Массив содержит <span style='color: var(--blue);'>" + data.length + "</span> элементов.";
            }
        }
        stop.style.display = "none";
    }

    if (selectedValue == 3) {
        console.log("call sort");
        let actions_cnt, swaps_cnt;
        [actions_cnt, swaps_cnt] = await QuickSort(data, comparator);
        if (allow_run) {
            console.log("actions: ", actions_cnt, " swaps: ", swaps_cnt);
            if (lang_eng) {
                actions.innerHTML = "Quick Sort has done <span style='color: var(--blue);'>" + actions_cnt + "</span> comparisons."
                swaps.innerHTML = "Quick Sort has done <span style='color: var(--blue);'>" + swaps_cnt + "</span> element swaps.";
                num.innerHTML = "Array contains <span style='color: var(--blue);'>" + data.length + "</span> elements.";
            } else {
                actions.innerHTML = "Quick Sort выполнил <span style='color: var(--blue);'>" + actions_cnt + "</span> сравнений."
                swaps.innerHTML = "Quick Sort выполнил <span style='color: var(--blue);'>" + swaps_cnt + "</span> перестановок элементов.";
                num.innerHTML = "Массив содержит <span style='color: var(--blue);'>" + data.length + "</span> элементов.";
            }
        }
        stop.style.display = "none";
    }

    if (selectedValue == 4) {
        console.log("call sort");
        let actions_cnt, swaps_cnt;
        [res, actions_cnt, swaps_cnt] = await MergeSort(data, comparator);
        console.log(res);
        if (allow_run) {
            console.log("actions: ", actions_cnt, " swaps: ", swaps_cnt);
            if (lang_eng) {
                actions.innerHTML = "Merge Sort has done <span style='color: var(--blue);'>" + actions_cnt + "</span> comparisons."
                swaps.innerHTML = "Merge Sort has done <span style='color: var(--blue);'>" + swaps_cnt + "</span> element swaps.";
                num.innerHTML = "Array contains <span style='color: var(--blue);'>" + data.length + "</span> elements.";
            } else {
                actions.innerHTML = "Merge Sort выполнил <span style='color: var(--blue);'>" + actions_cnt + "</span> сравнений."
                swaps.innerHTML = "Merge Sort выполнил <span style='color: var(--blue);'>" + swaps_cnt + "</span> перестановок элементов.";
                num.innerHTML = "Массив содержит <span style='color: var(--blue);'>" + data.length + "</span> элементов.";
            }
        }
        stop.style.display = "none";
    }

    start.style.display = "none";
    reset.style.display = "block";
    Unlock();
}

function Stop() {
    Lock();
    allow_run = false;
    let stop = document.getElementById('stop');
    let start = document.getElementById('start');
    let reset = document.getElementById('reset');
    stop.style.display = "none";
    start.style.display = "block";
    reset.style.display = "none";
    box.innerHTML = "";
    box.style.height = "0";
    array.value = "";
    actions.innerHTML = "";
    swaps.innerHTML = "";
    Unlock();
}

function EmergencyStart() {
    Alert("Incorrect input format for array");
}

function ChangeOrder() {
    let order = document.getElementById('order');
    if (lang_eng) {
        if (comparator === ASC) {
            comparator = DESC;
            order.innerHTML = 'Order DESC <i class="fas fa-arrow-down"></i>';
        } else {
            comparator = ASC;
            order.innerHTML = 'Order ASC <i class="fas fa-arrow-up"></i>';
        }
    } else {
        if (comparator === ASC) {
            comparator = DESC;
            order.innerHTML = 'Убывание <i class="fas fa-arrow-down"></i>';
        } else {
            comparator = ASC;
            order.innerHTML = 'Возрастание <i class="fas fa-arrow-up"></i>';
        }
    }
}

async function BubbleSort(array, comparator, draw=true) {
    if (allow_run == false) {
        return;
    }
    let action_count = 0;
    let swap_count = 0;
    for (var k = 0; k < array.length; ++k) {
        if (allow_run == false) {
            return;
        }
        for (var i = 0; i < array.length - 1; ++i) {
            if (allow_run == false) {
                return;
            }
            action_count += 1;
            if (comparator(array[i], array[i + 1]) === true) {
                swap_count += 1;
                if (draw) {
                    SetHeight(i, array[i + 1]);
                    SetHeight(i + 1, array[i]);
                }
                if (i + 1 === array.length - k - 1) {
                    if (draw) {
                        SetColor(array.length - k - 1, "var(--blue)");
                    }
                }
                await sleep(delay);
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
            }
        }
        if (draw) {
            SetColor(array.length - k - 1, "var(--blue);");
        }
    }

    for (var i = 0; i < array.length; ++i) {
        SetColor(i, "var(--blue)");
    }

    return [action_count, swap_count];
}

function Paint(array, sorted) {
    for (var i = 0; i < array.length; ++i) {
        if (array[i] === sorted[i]) {
            SetColor(i, "var(--blue);");
        }
    }
}

async function InsertionSort(array, comparator, draw=true) {
    if (allow_run == false) {
        return;
    }
    let actions_count = 0;
    let swaps_count = 0;
    let array_copy = array.slice();
    if (comparator === ASC) {
        array_copy.sort((a, b) => {return a - b;});
    } else {
        array_copy.sort((a, b) => {return b - a;});
    }
    
    if (array.length <= 1) {
        if (draw) {
            SetColor(0, "var(--blue);");
        }
        return array;
    }
    let num = 0;
    for (var j = 0; j < array.length - 1; ++j) {
        if (allow_run == false) {
            return;
        }
        num += 1;
        let current = array[num];
        for (var i = 0; i < num; ++i) {
            if (allow_run == false) {
                return;
            }
            actions_count += 1;
            if (comparator(array[i], current)) {
                if (allow_run == false) {
                    return;
                }
                for (var k = 0; k < num - i; ++k) {
                    if (allow_run == false) {
                        return;
                    }
                    if (num - 1 - k >= 0) {
                        swaps_count += 1;
                        SetHeight(num - 1 - k, array[num - k]);
                        SetHeight(num - k, array[num - 1 - k]);
                        await sleep(delay);
                        temp = array[num - 1 - k];
                        array[num - 1 - k] = array[num - k];
                        array[num - k] = temp;
                    }
                }
                break;
            }
        }
    }
    if (draw) {
        for (var i = 0; i < array.length; ++i) {
            SetColor(i, "var(--blue)");
        }
    }
    return [actions_count, swaps_count];
}

async function Partition(array, low, high, comparator, draw=true) {
    let pivot = array[low];
    let i, j;
    i = low - 1;
    j = high + 1;
    let a = 0;
    let s = 0;
    while (true) {
        if (allow_run == false) {
            return;
        }
        i += 1
        while (comparator(pivot, array[i])) {
            if (allow_run == false) {
                return;
            }
            a += 1;
            i += 1;
        }

        j -= 1;
        while (comparator(array[j], pivot)) {
            if (allow_run == false) {
                return;
            }
            a += 1;
            j -= 1;
        }
        if (allow_run == false) {
            return;
        }
        if (i >= j) {
            return [j, a, s];
        }

        s += 1;
        if (draw) {
            SetHeight(i, array[j]);
            SetHeight(j, array[i]);
        }
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        await sleep(delay);
    }
}

async function qSortInternal(array, low, high, comparator, act, swp, draw=true) {
    if (low < high) {
        let t_act, t_swp;
        let partition_index
        if (allow_run == false) {
            return;
        }
        [partition_index, t_act, t_swp] = await Partition(array, low, high, comparator, draw);
        act = t_act;
        swp = t_swp;
        if (allow_run == false) {
            return;
        }
        [t_act, t_swp] = await qSortInternal(array, low, partition_index, comparator, 0, 0, draw);
        act += t_act;
        swp += t_swp;
        if (allow_run == false) {
            return;
        }
        [t_act, t_swp] = await qSortInternal(array, partition_index + 1, high, comparator, 0, 0, draw);
        act += t_act;
        swp += t_swp;
    }
    return [act, swp];
}

async function QuickSort(array, comparator, draw=true) {
    if (allow_run == false) {
        return;
    }
    let actions_count = 0;
    let swaps_count = 0;
    let array_copy = array.slice();
    if (comparator === ASC) {
        array_copy.sort((a, b) => {return a - b;});
    } else {
        array_copy.sort((a, b) => {return b - a;});
    }
    
    if (array.length <= 1) {
        if (draw) {
            SetColor(0, "var(--blue);");
        }
        return array;
    }

    [actions_count, swaps_count] = await qSortInternal(array, 0, array.length - 1, comparator, draw);
    if (draw) {
        for (var i = 0; i < array.length; ++i) {
            SetColor(i, "var(--blue)");
        }
    }
    return [actions_count, swaps_count];
}

async function Merge(A, B, comparator, low, high, draw=true) {
    let i = 0;
    let j = 0;
    let len_s = 0;
    let S = [];
    let comps = 0;
    let swps = 0;
    
    while (i < A.length && j < B.length) {
        if (allow_run == false) {
            return;
        }
        comps += 1;
        if (comparator(B[j], A[i])) {
            S[len_s++] = A[i];
            ++i;
        } else {
            swps += 1;
            S[len_s++] = B[j];
            ++j;
        }
    }

    while (i < A.length) {
        if (allow_run == false) {
            return;
        }
        S[len_s++] = A[i];
        ++i;
    }

    while (j < B.length) {
        if (allow_run == false) {
            return;
        }
        S[len_s++] = B[j];
        ++j;
    }

    
    for (var k = 0; k < S.length; ++k) {
        if (draw) {
            SetHeight(low + k, S[k]);
            SetColor(low + k, "var(--blue)");
        }
    }

    await sleep(delay);

    return [S, comps, swps];
}

async function MergeSortInternal(array, comparator, low, high, draw=true) {
    if (allow_run == false) {
        return;
    }
    
    if (array.length <= 1) {
        return [array, 0, 0];
    }
    let actions_count = 0;
    let swaps_count = 0;
   
    let middle = Math.round(array.length / 2);
    let left, right;
    let temp_cmp, temp_swp;
    [left, temp_cmp, temp_swp] = await MergeSortInternal(array.slice(0, middle), comparator, low, middle + low, draw);
    actions_count += temp_cmp;
    swaps_count += temp_swp;
    [right, temp_cmp, temp_swp] = await MergeSortInternal(array.slice(middle, array.length), comparator, low + middle, high, draw);
    actions_count += temp_cmp;
    swaps_count += temp_swp;
    let merge_res = await Merge(left, right, comparator, low, high, draw);

    return [merge_res[0], merge_res[1] + actions_count, merge_res[2] + swaps_count];
}

async function MergeSort(array, comparator, draw=true) {
    let array_copy = array.slice();
    if (comparator === ASC) {
        array_copy.sort((a, b) => {return a - b;});
    } else {
        array_copy.sort((a, b) => {return b - a;});
    }

    let res = await MergeSortInternal(array, comparator, 0, array.length, draw);

    return res;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Random() {
    Lock();
    array.value = "";
    let random_size = getRandomInt(2, data_size_limit);
    for (var i = 0; i < random_size; ++i) {
        array.value += String(getRandomInt(1, 100)) + " ";
    }
    array.value = array.value.slice(0, -1);
    SetBox();
    Unlock();
}

function Delay() {
    let info = document.getElementById('delay-info');
    delay = Number(document.getElementById('delay').value);
    if (lang_eng) {
        info.innerHTML = "Delay " + delay + "ms";
    } else {
        info.innerHTML = "Пауза " + delay + "мс";
    }
}