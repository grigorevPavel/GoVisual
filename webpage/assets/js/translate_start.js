function TranslateButtons() {
    actions.innerHTML = "";
    swaps.innerHTML = "";
    num.innerHTML = "";
    if (lang_eng) {
        array.placeholder = "Input array elements, for expample: 1 8.7 -2 6 10";
        if (comparator === DESC) {
            order.innerHTML = 'Order DESC <i class="fas fa-arrow-down"></i>';
        } else {
            order.innerHTML = 'Order ASC <i class="fas fa-arrow-up"></i>';
        }
        random.innerHTML = "Random";
        let info = document.getElementById('delay-info');
        delay = Number(document.getElementById('delay').value);
        info.innerHTML = "Delay " + delay + "ms";
        let reset = document.getElementById("reset");
        let start = document.getElementById("start");
        let clear = document.getElementById("stop");
        reset.innerHTML = "Reset";
        start.innerHTML = "Start";
        clear.innerHTML = "Clear";
    } else {
        array.placeholder = "Введите элементы массива, например: 1 8.7 -2 6 10";
        if (comparator === DESC) {
            order.innerHTML = 'Убывание <i class="fas fa-arrow-down"></i>';
        } else {
            order.innerHTML = 'Возрастание <i class="fas fa-arrow-up"></i>';
        }
        random.innerHTML = "Случайные значения";
        let info = document.getElementById('delay-info');
        delay = Number(document.getElementById('delay').value);
        info.innerHTML = "Пауза " + delay + "мс";
        let reset = document.getElementById("reset");
        let start = document.getElementById("start");
        let clear = document.getElementById("stop");
        reset.innerHTML = "Заново";
        start.innerHTML = "Начать";
        clear.innerHTML = "Стоп";
    }
}

TranslateButtons();