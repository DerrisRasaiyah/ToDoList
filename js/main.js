//Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.querySelector("input");

//list the class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "line-through";

//variables
let LIST, id;

//check the data in local storage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadData(LIST);
} else {
    LIST = [];
    id = 0;
}

//load the data from local storage and add to the list
function loadData(arrayList) {
    arrayList.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash)
    })
}

//clear the local storage data
clear.addEventListener("click", function () {
    localStorage.removeItem("TODO");
    location.reload();
})

//Display date 
let options = { weekday: "long", month: "short", day: "numeric" };
let today = new Date()
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

document.addEventListener("keyup", function (ev) {
    if (ev.keyCode == 13) {
        let toDo = input.value;
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            id++;
            localStorage.setItem("TODO", JSON.stringify(LIST))
        }
        input.value = "";
    }
})

list.addEventListener("click", function (ev) {
    let element = ev.target;
    let elementJob = ev.target.attributes.job.value;
    if (elementJob == "complete") {
        completeToDo(element)
    } else if (elementJob == "delete") {
        removeToDo(element)
    }
    localStorage.setItem("TODO", JSON.stringify(LIST))

})

function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : "";
    const position = "beforeend"

    let item = `
                <li class="item">
                    <i class="fa ${DONE}" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash" job="delete" id="${id}"></i>
                </li>
                `
    list.insertAdjacentHTML(position, item)
}

function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].trash = true;
}
