class Loop {
    constructor(data) {
        this._loop_data = data;
        data = [
            {
                fn: toggle_light,
                times: 2, //сколько раз её вызывать (по умолчанию 1),
                wait: 50, //сколько ждать до следующего вызова (ms)
            },
            {
                fn: blue_light,
                times: 16,
                wait: 50,
                wait: 50
            },
            {
                fn: red_light,
                times: 16,
                wait: 50,
            },
            {
                fn: duoOddEven_light,
                times: 16,
                wait: 50,
            },
            {
                fn: leftToRight_light,
                times: 16,
                wait: 50,
            },
            {
                fn: rightToLeft_light,
                times: 16,
                wait: 50,
            }
            ,
            {
                fn: onlySides_light,
                times: 16,
                wait: 50,
            }
        ]

        this._curr = {
            obj: data,
            index: 0,
            called_times: 0,
        };

        this._timeout_id = null;
    }

    _next() {
        /*** Для текущего объекта из _loop_data считает количество вызовов.
        Если его отсюда уже получили .times раз - выдает следующий объект,
        иначе - возвращает текущий ***/

        let curr = this._curr;
        let data = this._loop_data;

        if (curr.called_times >= (curr.obj.times || 1)) {
            curr.called_times = 0;
            curr.index = (curr.index + 1) % data.length;
            curr.obj = data[curr.index];
        }

        curr.called_times++;

        return curr.obj;
    }

    _loop() {
        let obj = this._next();

        if (obj.fn) obj.fn(); // { wait: 10000 }
        // Объект, который должен просто ждать, не вызовет ошибку.

        this._timeout_id = setTimeout(() => this._loop(), obj.wait);
        // Использована стрелочная функция, чтобы не потерять контекст this._loop() 
    }


    start() {
        this.stop();
        this._loop();
    }

    stop() {
        if (this._curr.called_times % 2 !== 0) {
            this._curr.called_times++;
        }
        clearTimeout(this._timeout_id);
    }

    reset() {
        this._curr.obj = data[0];
        this._curr.index = 0;
        this._curr.called_times = 0;
    }
}
/***/
// Использование:

const lights = document.querySelectorAll(".lights");
const mode2 = document.querySelectorAll(".mode2");
let count = 0;


function toggle_light() {
    lights[(count++ % 12) / 6 | 0].classList.toggle("active"); // (*1)
}

function duoOddEven_light() {
    if (Math.floor(count % 24 / 6) == 0) {
        mode2[0].classList.toggle("even");
        mode2[1].classList.toggle("even");
    }
    if (Math.floor(count % 24 / 6) == 2) {
        mode2[0].classList.toggle("odd");
        mode2[1].classList.toggle("odd");
    }

    count++;
}

function singleOddEven_light() {

    if (Math.floor(count % 24 / 6) == 0) {
        mode2[0].classList.toggle("even");
    }
    if (Math.floor(count % 24 / 6) == 1) {
        mode2[1].classList.toggle("even");
    }
    if (Math.floor(count % 24 / 6) == 2) {
        mode2[0].classList.toggle("odd");
    }
    if (Math.floor(count % 24 / 6) == 3) {
        mode2[1].classList.toggle("odd");
    }
    count++;
}

function leftToRight_light() {
    if (Math.floor(count % 36 / 6) == 0) {
        odd[0].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 1) {
        even[0].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 2) {
        odd[1].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 3) {
        even[1].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 4) {
        odd[2].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 5) {
        even[2].classList.toggle("active");
    }

    count++;
}

function rightToLeft_light() {
    if (Math.floor(count % 36 / 6) == 0) {
        even[2].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 1) {
        odd[2].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 2) {
        even[1].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 3) {
        odd[1].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 4) {
        even[0].classList.toggle("active");
    }
    if (Math.floor(count % 36 / 6) == 5) {
        odd[0].classList.toggle("active");
    }

    count++;
}

function blue_light() {
    lights[1].classList.toggle("active"); // (*1)
}

function red_light() {
    lights[0].classList.toggle("active"); // (*1)
}

function onlySides_light() {
    if (Math.floor(count % 12 / 6) == 0) {
        odd[0].classList.toggle("active");
    }
    if (Math.floor(count % 12 / 6) == 1) {
        even[2].classList.toggle("active");
    }
    count++;
}

let police_lights = new Loop([
    { fn: toggle_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 1000 }, // поспать 100 мс
]);

let blue_lights = new Loop([
    { fn: blue_light, times: 16, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 1000 }, // поспать 100 мс
]);

let red_lights = new Loop([
    { fn: red_light, times: 16, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 1000 }, // поспать 100 мс
]);

let duoOddEven_lights = new Loop([
    { fn: duoOddEven_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 100 }, // поспать 100 мс
]);

let singleOddEven_lights = new Loop([
    { fn: singleOddEven_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 100 }, // поспать 100 мс
]);

let leftToRight_lights = new Loop([
    { fn: leftToRight_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 100 }, // поспать 100 мс
]);

let rightToLeft_lights = new Loop([
    { fn: rightToLeft_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 100 }, // поспать 100 мс
]);

let onlySides_lights = new Loop([
    { fn: onlySides_light, times: 6, wait: 50 }, // 6 вызовов с задержкой по 50 мс
    { wait: 100 }, // поспать 100 мс
]);

const stop = document.getElementById('stop');

let stopLights = () => {
    police_lights.stop();
    blue_lights.stop();
    red_lights.stop();
    duoOddEven_lights.stop()
    singleOddEven_lights.stop()
    leftToRight_lights.stop()
    rightToLeft_lights.stop()
    onlySides_lights.stop();
    lights[0].classList.remove("active");
    lights[0].classList.remove("odd");
    lights[0].classList.remove("even");
    lights[1].classList.remove("active");
    lights[1].classList.remove("odd");
    lights[1].classList.remove("even");
    odd[0].classList.remove("active");
    odd[1].classList.remove("active");
    odd[2].classList.remove("active");
    even[0].classList.remove("active");
    even[1].classList.remove("active");
    even[2].classList.remove("active");
    count = 0;
}

mode1.onclick = () => {
    stopLights();
    count = 0;
    police_lights.start();
}

blueLightsMode.onclick = () => {
    stopLights();
    blue_lights.start();
}

redLightsMode.onclick = () => {
    stopLights();
    red_lights.start();
}

duoOddEvenLightsMode.onclick = () => {
    stopLights();
    count = 0;
    duoOddEven_lights.start();
}

singleOddEvenLightsMode.onclick = () => {
    stopLights();
    count = 0;
    singleOddEven_lights.start();
}

leftToRight.onclick = () => {
    stopLights();
    count = 0;
    leftToRight_lights.start();
}

rightToLeft.onclick = () => {
    stopLights();
    count = 0;
    rightToLeft_lights.start();
}

onlySides.onclick = () => {
    stopLights();
    count = 0;
    onlySides_lights.start();
}

stop.onclick = () => {
    stopLights();
}