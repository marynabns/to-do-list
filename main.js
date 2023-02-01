let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let showAllButton = document.querySelector("#show-all-btn");
let showNotCompletedButton = document.querySelector("#show-not-completed-btn");
let taskList = document.querySelector(".task-list");
let taskError = document.querySelector(".task-error");

let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);
showAllButton.addEventListener("click", showAllHandler);
showNotCompletedButton.addEventListener("click", showNotCompletedHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})

function addTaskHandler() {
    if (taskNameInput.value) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task(taskNameInput.value);
        newTask.createIn(taskList);
        tasks.push(newTask);

        taskNameInput.value = "";

        taskError.style.display = 'none';
    } else {
        taskError.style.display = 'block';
    }
}

function showAllHandler() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        task.createIn(taskList);
    });
}

function showNotCompletedHandler() {
    taskList.innerHTML = "";
    tasks
        .filter(task => task.isDone == false)
        .forEach(task => {
            task.createIn(taskList);
        });
}

class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.div = null;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");

        this.div.addEventListener("click", this.changeState.bind(this));


        let input = document.createElement("input");
        input.type = "checkbox";

        let checkbox = document.createElement("span");
        checkbox.classList.add("checkbox");

        let p = document.createElement("p");
        p.innerText = this.text;

        this.div.append(input);
        this.div.append(checkbox);
        this.div.append(p);

        if (this.isDone) {
            this.div.classList.add("completed");
            input.checked = true;
        }
        element.append(this.div);
    }

    changeState(element) {
        this.isDone = !this.isDone;
        this.div.classList.toggle("completed");
    }
}


//цитаты
let quotes = [
    "Не совершай классическую ошибку всех умников: не думай, что нет людей умнее тебя.",
    "Жизнь состоит не в том, чтобы найти себя. Жизнь состоит в том, чтобы создать себя.",
    "Несчастным или счастливым человека делают только его мысли, а не внешние обстоятельства. Управляя своими мыслями, он управляет своим счастьем.",
    "Глуп тот человек, который никогда не меняет своего мнения.",
    "Мы должны двигаться только вперед, даже если мы можем только ползти!",
    "Тот, кто вас любит, способствует вашему развитию, кто не любит – тормозит.",
    "Если ты опустился на самое дно, у тебя есть только один путь — наверх.",
    "Развитие человеческого духа невозможно без нового опыта.",
    "Зависть — прекрасный стимул для развития творческого потенциала, которого не хватает на что-то дельное.",
    "Стремиться вперед — значит потерять покой, оставаться на месте — значит потерять себя.",
    "Чтобы сбежать от повседневной серости, нужно постоянно развиваться.",
    "Чем выше человек по умственному и нравственному развитию, тем больше удовольствия доставляет ему жизнь.",
];

let randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

document.getElementById("quote").innerHTML = randomQuote;
