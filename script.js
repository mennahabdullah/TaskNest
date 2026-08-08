let theTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
const addBtn = document.getElementById("add");
const taskForm = document.getElementById("taskForm");
const overlay = document.getElementById("overlay");
let editId = null;


addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const hidden = !taskForm.classList.contains("show");
    if (hidden){
        taskForm.classList.add("show")
        overlay.classList.add("show")
    } else{
        taskForm.classList.remove("show")
        overlay.classList.remove("show")
    }
})

const days = document.getElementById("days");
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let theDate = new Date();
let selectedDate = null
let year = theDate.getFullYear()
let month = theDate.getMonth()
let day = theDate.getDate()

const dateInput = document.getElementById("dueDate")

function renderCalendar(month, year){
    days.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for(let i = 0; i < firstDay; i++){
        const empty = document.createElement("div");
        days.appendChild(empty);
    }

    for(let d = 1; d <= daysInMonth; d++){
        const btn = document.createElement("button");
        btn.classList.add("btn")
        btn.textContent = d;
        btn.classList.add("day");
        days.appendChild(btn);
        btn.addEventListener("click", (e)=>{
            e.preventDefault()
            selectedDate = new Date(year, month, d);
            dateInput.value =
            `${String(month + 1).padStart(2, "0")}/` + `${String(d).padStart(2, "0")}/` + `${year}`;
            picker.classList.remove("show");
        });
        btn.style.backgroundColor = "transparent"
        btn.style.border = "1px solid #EDE9FE"
        btn.style.borderRadius = "50%"
        btn.style.width = "2rem"
        btn.style.height = "2rem"
    }
}

const msg = document.getElementById("alert")
function sendMsg(){
    const hidden = !msg.classList.contains("show");
    if (hidden) {
        msg.classList.add("show")
        overlay.classList.add("show")
    } else {
        msg.classList.remove("show")
        overlay.classList.remove("show")
    }
}
function clsMsg(){
    const hidden = !msg.classList.contains("show");
    if (hidden) {
        msg.classList.add("show")
        overlay.classList.add("show")
    } else {
        msg.classList.remove("show")
        overlay.classList.remove("show")
    }
}

const dateBtn = document.getElementById("date-icon");
const picker = document.getElementById("picker");
const monthTxt = document.getElementById("date")

dateBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const hidden = !picker.classList.contains("show");
    if (hidden){
        picker.classList.add("show")
    } else{
        picker.classList.remove("show")
    }
    monthTxt.textContent = `${months[month]} - ${year}`
    renderCalendar(month, year);
})

const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

prevBtn.addEventListener("click", (e) => {
    e.preventDefault()
    month--
    if (month < 0) {
        month = 11;
        year--;
    }
    renderCalendar(month, year)
    monthTxt.textContent = `${months[month]} - ${year}`
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    month++
    if (month > 11) {
        month = 0;
        year++;
    }
    renderCalendar(month, year)
    monthTxt.textContent = `${months[month]} - ${year}`
})
const today = document.getElementById("today")
const clear = document.getElementById("clear")
today.addEventListener("click", (e) => {
    e.preventDefault()
    selectedDate = new Date().toLocaleDateString()
    dateInput.value = selectedDate
})
clear.addEventListener("click", (e) => {
    e.preventDefault()
    dateInput.value = ""
})

const task = document.getElementById("taskTitle")
const description = document.getElementById("description")
const priority = document.getElementById("taskPriority")
const newTask = document.getElementById("add-btn")
const tasks = document.getElementById("tasks")
const small = document.getElementById("small-div")
const tDiv = document.getElementById("title-div")
const dDiv = document.getElementById("des-div")
const dateDiv = document.getElementById("dateField")
const prDiv = document.getElementById("pr-div")

function addTasks(data){
    small.style.display = "none"
    task.value = ""
    dateInput.value = ""
    description.value = ""
    taskForm.classList.remove('show');
    overlay.classList.remove('show');

    tasks.insertAdjacentHTML('beforeend', 
    `<div class="newTask addTask" id="Task">
        <div>
            <p class="font">${data.title}</p>
            <small class="font">Due Date: ${data.dueDate}</small><br>
            <small class="font">${data.description}</small>
        
            <div class="priority">
                <div class="theColor"></div>
                <small class="font">${data.priority}</small>
            </div>
        </div>

        <div class="state font">
            <select class="task-st">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </div>

        <div style="display: inline-flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
            <button class="toEdit">
            <img class="edit-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACsUlEQVR4nO1ZO28TQRDeAgrPnIN4RILQ8pAQHZRUVEjhh/CoQ0qKUEGFRGPlZpIgUSB+AjhSFEC8g0SFQHQQQAjFzgyY6tCcz5YTx+R8iddndJ+0ku+8N/d9O4/d23VuBNDg8nFhWFKCmjA8WJsdO+BGBY2F8glh/KyMUbsRrtQWygdd3lELyyeV8UuTNFRjMQTvExGv1+7t2+/yTF5aI09QjSoO7L6GpYmWCGG470aJfAvmiWY4wZr7F4TgohkQQtkQg74adZO3ayV4lAhY7EleGW8MhTSnI28e+j07dqz3yDc7NSSEKanAETfksIk2kbf+PY2Za+KOIUwNmviukzcIw3rceQ4OO491XhiWojvjQRd5hodJzH+tU3BqW6OtOHR5IE/thE1H3peADWHDsLjjsPEtwJYD2q468K5OwfiukPchYD3E00nC/jDynSJ2TN6HgI45pmKkO0W0K2BW8j4ECMMHs7/OeN6uN4roJi8My9ZyIUDD0tlkNbkaVdzeXxScE4bbVmV6VZu++QxUAOPN1igr4WrXOn+LsMmVAGH81ElaLJwIZyyxd43PYD0Ai0LwUQlv6TycGQgfXzNxWhQChg0tBPyPApTwqhL8VA6uZCZG6WwMRgDD92RB9q0PzplsaCFgC5jbY/dTcNllhKa0USRxWgjBE2F8uvnz0BDddSiEL4TgscurAE0+E4XxpczBBdtBrleCQ/ZbCV8ldt/kV0BYmlDGt71323AlyyaZ+syB6LrbY0kpjM9tTzVujM80LF2y/7LY1CKJhwwtBIyeAKjH5dDDtvp20PnS0WS5UUv/EEE1FkBwzQ0ZwjCdCKimfyiEyWRCapgIq+/OM9QO8ximhfBPzCWEyf4MEM70nJC8HzfhTKZRiD1hh3zJgYfPJvZOe3e/I1+gQAE3UvgLo5q1Rdw22lsAAAAASUVORK5CYII=" alt="create-new">
            </button>
            <button class="toReset">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAi0lEQVR4nGNgGBHgvbNzw3sXl//I+J2zcwdZhr1zcTmFbth7IvE7Z+cTxFhwklwL3js7H2cYGeA9mUHEMCgt+ODsbPrR1dUc3TBs4mRZwIDDV/jUjlrwf9QChlELCAKUHOvkZPbGxcUCIydjESfFgsckl0XOzo+ItuCtk5MnSAMphr91dvYg2oIhBQDZ7v+yHqqS4AAAAABJRU5ErkJggg==" alt="trash">
            </button>
        </div>
    </div>`);
    
    const addTask = tasks.lastElementChild;
    addTask.dataset.id = data.id;
    const reset = addTask.querySelector(".toReset");
    reset.addEventListener("click", () => {
        sendMsg()
        msg.innerHTML = 
        `<h3>Are you sure?</h3>
        <p class="font">Are you sure you want to delete this task?</p>
        <div style="display='flex'; width='90%'; justify-content='space-evenly'">
            <button id="confirm">Delete</button>
            <button id="cancel">Cancel</button>
        </div>`
        
        const confirmBtn = document.getElementById("confirm")
        const cancel = document.getElementById("cancel")
        confirmBtn.addEventListener("click", () => {
            const id = Number(addTask.dataset.id)
            theTasks = theTasks.filter(task => task.id !== id);
            localStorage.setItem("myTasks", JSON.stringify(theTasks));
            addTask.remove();
            clsMsg()
        })
        cancel.addEventListener("click", () => {
            msg.classList.remove("show")
            overlay.classList.remove("show")
        })
    });
    const statusSelect = addTask.querySelector(".task-st");
    statusSelect.value = data.status;
    statusSelect.addEventListener("change", () => {
        const id = Number(addTask.dataset.id);
        const curTask = theTasks.find(task => task.id === id);
        curTask.status = statusSelect.value;
        data.status = statusSelect.value;
        localStorage.setItem("myTasks", JSON.stringify(theTasks));
    });

    const edit = addTask.querySelector(".toEdit")
    edit.addEventListener("click", (e) => {
        e.preventDefault()
        overlay.classList.add("show")
        taskForm.classList.add("show")
        const id = Number(addTask.dataset.id)
        const curTask = theTasks.find(task => task.id === id);
        editId = id
        task.value = curTask.title;
        description.value = curTask.description;
        dateInput.value = curTask.dueDate;
        priority.value = curTask.priority;
    })


    const clearAll = document.getElementById("clearBtn")
    clearAll.addEventListener("click", () => {
        sendMsg()
        msg.innerHTML = 
        `<h3>Are you sure?</h3>
        <p>Are you sure you want to delete this task?</p>
        <div style="display='flex'; width='90%'; justify-content='space-evenly'">
            <button id="confirm">Delete</button>
            <button id="cancel">Cancel</button>
        </div>`
        const confirmBtn = document.getElementById("confirm")
        const cancel = document.getElementById("cancel")
        confirmBtn.addEventListener("click", () => {
            theTasks = theTasks.filter(task => task.status !== "completed");
            localStorage.setItem("myTasks", JSON.stringify(theTasks));
            showTasks(theTasks)
            clsMsg()
        })
        cancel.addEventListener("click", () => {
            msg.classList.remove("show")
            overlay.classList.remove("show")
        })
    })
    if (data.priority.toLowerCase() === "high") {
        const priority = addTask.querySelector(".priority");
        const theColor = addTask.querySelector(".theColor");
        priority.style.display = "inline-flex";
        priority.style.alignItems = "center";
        priority.style.gap = "0.5rem";
        priority.style.margin="1rem";
        theColor.style.display = "inline";
        theColor.style.backgroundColor = "#EF4444";
        theColor.style.borderRadius = "50%";
        theColor.style.width = "1rem";
        theColor.style.height = "1rem";
        addTask.classList.add("high");

    } else if (data.priority.toLowerCase() === "medium") {
        const priority = addTask.querySelector(".priority");
        const theColor = addTask.querySelector(".theColor");
        priority.style.display = "inline-flex";
        priority.style.alignItems = "center";
        priority.style.gap = "0.5rem";
        priority.style.margin="1rem";
        theColor.style.display = "inline";
        theColor.style.backgroundColor = "#F59E0B";
        theColor.style.borderRadius = "50%";
        theColor.style.width = "1rem";
        theColor.style.height = "1rem";
        addTask.classList.add("medium");

    } else if (data.priority.toLowerCase() === "low") {
        const priority = addTask.querySelector(".priority");
        const theColor = addTask.querySelector(".theColor");
        priority.style.display = "inline-flex";
        priority.style.alignItems = "center";
        priority.style.gap = "0.5rem";
        priority.style.margin="1rem";
        theColor.style.display = "inline";
        theColor.style.backgroundColor = "#10B981";
        theColor.style.borderRadius = "50%";
        theColor.style.width = "1rem";
        theColor.style.height = "1rem";
        addTask.classList.add("low");
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        addTask.classList.add("dark-bg");
        addTask.querySelectorAll(".font").forEach(txt => {
            txt.style.setProperty("color", "#DBEAFE", "important");
        });
    }
}


newTask.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".warning").forEach(w => w.remove());
    task.style.border = "0.1em solid #D1FAE5";
    description.style.border = "0.1em solid #D1FAE5";
    dateInput.style.border = "0.1em solid #D1FAE5"
    if (task.value.trim() === "") {
        task.style.border = "1px solid #EF4444";
        const warning = document.createElement("small");
        warning.classList.add("warning");
        warning.textContent = "Write a title for your task";
        warning.style.color = "#EF4444";
        tDiv.appendChild(warning);
        return;
    }

    if (description.value.trim() === "") {
        description.style.border = "1px solid #EF4444";
        const warning = document.createElement("small");
        warning.classList.add("warning");
        warning.textContent = "Write a description for your task";
        warning.style.color = "#EF4444";
        dDiv.appendChild(warning);
        return;
    }

    if (dateInput.value.trim() === ""){
        dateInput.style.border = "1px solid #EF4444";
        const warning = document.createElement("small");
        warning.classList.add("warning");
        warning.textContent = "Choose a due date";
        warning.style.color = "#EF4444";
        dateDiv.appendChild(warning);
        return;
    }

    const taskData = {
        id: Date.now(),
        title: task.value,
        description: description.value,
        dueDate: dateInput.value,
        priority: priority.value,
        status: "pending"
    };
    
    if (editId !== null){
        const curTask = theTasks.find(task => task.id === editId);
        curTask.title = task.value;
        curTask.description = description.value;
        curTask.dueDate = dateInput.value;
        curTask.priority = priority.value;
        localStorage.setItem("myTasks", JSON.stringify(theTasks));
        tasks.innerHTML = "";
        theTasks.forEach(task => {
            addTasks(task);
        });
        editId = null;
    }else{
        const taskData = {
            id: Date.now(),
            title: task.value,
            description: description.value,
            dueDate: dateInput.value,
            priority: priority.value,
            status: "pending"
        };
        theTasks.push(taskData);
        localStorage.setItem("myTasks", JSON.stringify(theTasks));
        addTasks(taskData);
    }
})


theTasks.forEach(task => {
    addTasks(task)
});

const search = document.getElementById("search")
const all = document.getElementById("all")
const pending = document. getElementById("pending")
const inProgress = document.getElementById("in-progress")
const completed = document.getElementById("completed")

function showTasks(arr){
    tasks.innerHTML = "";
    arr.forEach(task => {
        addTasks(task);
    });
}

all.addEventListener("click", () => {
    showTasks(theTasks);
});
pending.addEventListener("click", () => {
    const filtered = theTasks.filter(task => task.status === "pending");
    showTasks(filtered);
});
inProgress.addEventListener("click", () => {
    const filtered = theTasks.filter(task => task.status === "in-progress");
    showTasks(filtered);
});
completed.addEventListener("click", () => {
    const filtered = theTasks.filter(task => task.status === "completed");
    showTasks(filtered);
});

const dark = document.getElementById("dark")
const light = document.getElementById("light")
const body = document.body;
const fCard = document.getElementById("f-card")
const font = document.querySelectorAll(".font")
const inputs = document.querySelectorAll(".inputTask")
const theTask = document.querySelectorAll(".addTask")
const select = document.querySelectorAll("select")
const alertMsg = document.getElementById("alert")
const btn = document.querySelectorAll("button")

dark.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.setItem("theme", "dark");
    dark.style.backgroundColor = "#DBEAFE"
    light.style.backgroundColor = "transparent"
    body.classList.add("dark-bg")
    fCard.classList.add("dark-card")
    small.classList.add("dark-card")
    taskForm.classList.add("dark-card")
    taskForm.style.backgroundColor = "#1E293B"
    inputs.forEach(input => {
        input.classList.add("dark-bg")
    })
    tasks.classList.add("dark-card")
    theTask.forEach(task => {
        task.classList.add("dark-bg")
    })
    search.classList.add("dark-bg")
    font.forEach(txt => {
        txt.style.setProperty("color", "#DBEAFE", "important")
    })
    select.forEach(s => {
        s.classList.add("dark-bg")
    })
    alertMsg.style.color = "#DBEAFE"
    alertMsg.style.backgroundColor = "#1E293B"
    btn.style.color = "#DBEAFE"
})

light.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.setItem("theme", "light");
    light.style.backgroundColor = "#DBEAFE"
    dark.style.backgroundColor = "transparent"
    body.classList.remove("dark-bg")
    fCard.classList.remove("dark-card")
    small.classList.remove("dark-card")
    taskForm.classList.remove("dark-card")
    inputs.forEach(input => {
        input.classList.remove("dark-bg")
    })
    tasks.classList.remove("dark-card")
    theTask.forEach(task => {
        task.classList.remove("dark-bg")
    })
    search.classList.remove("dark-bg")
    font.forEach(txt => {
        txt.style.setProperty("color", "#1E293B", "important")
    })
    select.forEach(s => {
        s.classList.remove("dark-bg")
    })
    alertMsg.style.color = "#1E293B"
    alertMsg.style.backgroundColor = "#FFFFFF"
    btn.style.color = "#1E293B"
})

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    dark.click();
} else {
    light.click();
}

search.addEventListener("input", () => {
    let searchVal = search.value.toLowerCase().trim()
    let searchFil = theTasks.filter(task => task.title.toLowerCase().includes(searchVal))
    showTasks(searchFil)
})

const filPri = document.getElementById("filter-p")
filPri.addEventListener("change", () => {
    console.log("selected:", filPri.value);
    console.log("tasks:", theTasks);
    if (filPri.value === "all"){
        showTasks(theTasks)
    } else{
        let FilterPr = theTasks.filter(task => task.priority.trim() === filPri.value.toLowerCase())
        showTasks(FilterPr)
    }
})
