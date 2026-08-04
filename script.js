const inputField = document.getElementById("myText");
const actionBtn = document.getElementById("myBtn");
const contain = document.getElementById("tasks");
const clearBtn = document.getElementById("clearBtn");
const taskForm = document.getElementById("taskForm");
const addBtn = document.getElementById("add-btn");
const title = document.getElementById("taskTitle");
const dueDate = document.getElementById("dueDate");
const description = document.getElementById("description");
const taskPriority = document.getElementById("taskPriority");
const dateInput = document.getElementById("dueDate");
const dateIcon = document.querySelector(".date-icon");
const dateField = document.getElementById("dateField");
const picker = document.getElementById("picker");
const date = document.getElementById("date");
const daysGrid = document.getElementById("days");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const todayBtn = document.getElementById("today");
const clearDateBtn = document.getElementById("clear");
const stBtns = document.querySelectorAll(".btn-bar button[data-status]");
const filterP = document.getElementById("filter-p");
const overlay = document.getElementById("overlay");
const formTitle = document.querySelector("#taskForm h3");
const cancelBtn = document.querySelector("#taskForm .other");

let theTasks = [];
let editId = null;
let currentStatus = "all";
const STORAGE_KEY = "tasknet_tasks";



function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theTasks));
}


function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    theTasks = raw ? JSON.parse(raw) : [];
}


function generateId() {
    return "task-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}



function renderTaskCard(task) {
    contain.insertAdjacentHTML("beforeend", `
    <div class="newTask" data-id="${task.id}" data-status="${task.status}" data-priority="${task.priority}">
        <div>
            <p>${task.title}</p>
            <small>Due Date: ${task.dueDate}</small><br>
            <small>${task.description}</small>

            <div class="priority">
                <div class="theColor"></div>
                <small>${task.priority}</small>
            </div>
        </div>

        <div class="state">
            <select>
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

    const card = contain.lastElementChild;
    card.querySelector(".state select").value = task.status;
    const priorityColors = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };
    const priorityBox = card.querySelector(".priority");
    const colorDot = card.querySelector(".theColor");
    priorityBox.style.display = "inline-flex";
    priorityBox.style.alignItems = "center";
    priorityBox.style.gap = "0.5rem";
    priorityBox.style.margin = "1rem";
    colorDot.style.display = "inline";
    colorDot.style.backgroundColor = priorityColors[task.priority] || priorityColors.low;
    colorDot.style.borderRadius = "50%";
    colorDot.style.width = "1rem";
    colorDot.style.height = "1rem";
    card.classList.add(task.priority);

    return card;
}

function renderAllTasks() {
    contain.querySelectorAll(".newTask").forEach(el => el.remove());
    theTasks.forEach(renderTaskCard);
    togglePlaceholder();
}

function togglePlaceholder() {
    const placeholder = document.getElementById("text");
    const wrapper = document.getElementsByClassName("small")[0];
    if (theTasks.length === 0) {
        placeholder.textContent = "Tasks appear here.";
        wrapper.style.display = "flex";
    } else {
        wrapper.style.display = "none";
    }
}

actionBtn.addEventListener("click", () => {
    const isHidden = !taskForm.classList.contains("show");
    if (isHidden) {
        taskForm.classList.add("show");
        overlay.classList.add("show");
    } else {
        taskForm.classList.remove("show");
        overlay.classList.remove("show");
    }
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!title.value.trim()) return;

    if (editId !== null) {
        const task = theTasks.find(t => t.id === editId);
        if (task) {
            task.title = title.value;
            task.dueDate = dueDate.value;
            task.description = description.value;
            task.priority = taskPriority.value.toLowerCase();
        }
        editId = null;
        formTitle.textContent = "Add Task";
    } else {
        theTasks.push({
            id: generateId(),
            title: title.value,
            dueDate: dueDate.value,
            description: description.value,
            priority: taskPriority.value.toLowerCase(),
            status: "pending"
        });
    }

    saveTasks();
    renderAllTasks();
    applyFilters();

    title.value = "";
    dueDate.value = "";
    description.value = "";
    taskForm.classList.remove("show");
    overlay.classList.remove("show");
});

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    editId = null;
    title.value = "";
    dueDate.value = "";
    description.value = "";
    formTitle.textContent = "Add Task";
    taskForm.classList.remove("show");
    overlay.classList.remove("show");
});


contain.addEventListener("click", (e) => {
    const removeButton = e.target.closest("button.toReset");
    if (removeButton) {
        const taskItem = removeButton.closest(".newTask");
        if (taskItem) {
            const id = taskItem.dataset.id;
            theTasks = theTasks.filter(t => t.id !== id);
            taskItem.remove();
            saveTasks();
            togglePlaceholder();
            applyFilters();
        }
    }
});


contain.addEventListener("click", (e) => {
    const editButton = e.target.closest("button.toEdit");
    if (editButton) {
        const taskItem = editButton.closest(".newTask");
        if (taskItem) {
            const task = theTasks.find(t => t.id === taskItem.dataset.id);
            if (task) {
                title.value = task.title;
                dueDate.value = task.dueDate;
                description.value = task.description;
                taskPriority.value = task.priority;
                editId = task.id;
                formTitle.textContent = "Edit Task";
                taskForm.classList.add("show");
                overlay.classList.add("show");
            }
        }
    }
});


contain.addEventListener("change", (e) => {
    const stSelect = e.target.closest(".state select");
    if (stSelect) {
        const taskItem = stSelect.closest(".newTask");
        if (taskItem) {
            const task = theTasks.find(t => t.id === taskItem.dataset.id);
            if (task) task.status = stSelect.value;
            taskItem.dataset.status = stSelect.value;
            saveTasks();
            applyFilters();
        }
    }
});


function applyFilters() {
    const searchT = inputField.value.trim().toLowerCase();
    const prValue = filterP ? filterP.value : "all";
    const taskCards = contain.querySelectorAll(".newTask");
    let count = 0;

    taskCards.forEach(task => {
        const smalls = task.querySelectorAll("small");
        const taskTitle = (task.querySelector("p")?.textContent || "").toLowerCase();
        const taskDesc = (smalls[1]?.textContent || "").toLowerCase();

        const taskS = task.dataset.status || "pending";
        const taskValue = task.dataset.priority || "low";

        const matches = searchT === "" || taskTitle.includes(searchT) || taskDesc.includes(searchT);
        const matchesSt = currentStatus === "all" || taskS === currentStatus;
        const matchesPr = prValue === "all" || taskValue === prValue;

        if (matches && matchesSt && matchesPr) {
            task.style.display = "flex";
            count++;
        } else {
            task.style.display = "none";
        }
    });

    const placeholder = document.getElementById("text");
    const wrapper = document.getElementsByClassName("small")[0];
    if (placeholder && wrapper) {
        if (taskCards.length === 0) {
            placeholder.textContent = "Tasks appear here.";
            wrapper.style.display = "flex";
        } else if (count === 0) {
            placeholder.textContent = "No tasks match your search/filter.";
            wrapper.style.display = "flex";
        } else {
            wrapper.style.display = "none";
        }
    }
}

inputField.addEventListener("input", applyFilters);

if (filterP) {
    filterP.addEventListener("change", applyFilters);
}

stBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentStatus = btn.dataset.status;
        stBtns.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        applyFilters();
    });
});

document.querySelector('.btn-bar button[data-status="all"]')?.classList.add("active-filter");


clearBtn.addEventListener("click", () => {
    theTasks = theTasks.filter(t => t.status !== "completed");
    contain.querySelectorAll('.newTask[data-status="completed"]').forEach(el => el.remove());
    saveTasks();
    togglePlaceholder();
    applyFilters();
});


(() => {
    const monthName = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let viewDate = new Date();
    let selectedDate = null;

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function goodD(date) {
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function sameDay(a, b) {
        return a && b &&
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }

    function openPicker() {
        if (dateInput.value) {
            const parsed = new Date(dateInput.value + "T00:00:00");
            if (!isNaN(parsed.getTime())) {
                viewDate = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
                selectedDate = parsed;
            }
        }
        renderCal();
        picker.classList.add("show");
    }

    function closePicker() {
        picker.classList.remove("show");
    }

    function togglePicker(e) {
        e.stopPropagation();
        picker.classList.contains("show") ? closePicker() : openPicker();
    }

    function renderCal() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        date.textContent = `${monthName[month]} ${year}`;

        const weekday = new Date(year, month, 1).getDay();
        const daysMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        let html = "";
        for (let i = 0; i < weekday; i++) {
            html += `<span class="dp-day dp-empty"></span>`;
        }

        for (let day = 1; day <= daysMonth; day++) {
            const cellDate = new Date(year, month, day);
            const classes = ["dp-day"];
            if (sameDay(cellDate, today)) classes.push("today-cell");
            if (sameDay(cellDate, selectedDate)) classes.push("dp-selected");
            html += `<span class="${classes.join(" ")}" data-date="${goodD(cellDate)}">${day}</span>`;
        }
        daysGrid.innerHTML = html;
    }

    daysGrid.addEventListener("click", (e) => {
        const cell = e.target.closest(".dp-day:not(.dp-empty)");
        if (!cell) return;
        const iso = cell.dataset.date;
        dateInput.value = iso;
        selectedDate = new Date(iso + "T00:00:00");
        renderCal();
        closePicker();
        dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
        renderCal();
    });

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
        renderCal();
    });

    todayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const today = new Date();
        viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
        selectedDate = today;
        dateInput.value = goodD(today);
        renderCal();
        dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    clearDateBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dateInput.value = "";
        selectedDate = null;
        renderCal();
        dateInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    dateInput.addEventListener("click", togglePicker);
    if (dateIcon) dateIcon.addEventListener("click", (e) => {
        e.preventDefault();
        togglePicker(e);
    });

    document.addEventListener("click", (e) => {
        if (dateField && !dateField.contains(e.target)) closePicker();
    });

    picker.addEventListener("click", (e) => e.stopPropagation());
})();


loadTasks();
renderAllTasks();
applyFilters();
