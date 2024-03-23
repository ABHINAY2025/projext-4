
window.onload = function () {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (var i = 0; i < storedTasks.length; i++) {
        addTaskElement(storedTasks[i]);
    }
};

function addtask() {
    var text = document.getElementById('note').value;
    if (text !== '') {
        var task = { text: text };
        addTaskElement(task);
        saveTaskToLocalStorage(task);
        document.getElementById('note').value = '';
    }
}

function addTaskElement(task) {
    var taskdiv = document.createElement('div');
    let leftdiv=document.createElement('div');
    let checkbox=document.createElement('input');
    checkbox.setAttribute("type","checkbox");
    checkbox.id='abhinay'
    var taskp = document.createElement('h3');
    taskp.id='task-info'
    taskp.innerHTML = task.text;
    taskdiv.appendChild(leftdiv);
    leftdiv.prepend(checkbox);
    leftdiv.appendChild(taskp);
    leftdiv.className='leftdiv';
    var buttondiv=document.createElement('div');
    buttondiv.className='rightdiv'
    var editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    buttondiv.appendChild(editbtn);
    var deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    buttondiv.appendChild(deletebtn);
    taskdiv.append(buttondiv);
    document.getElementById('tasks').prepend(taskdiv);
    taskdiv.setAttribute('class', 'taskdiv');
    editbtn.setAttribute('class', 'editbtn');
    deletebtn.setAttribute('class', 'deletebtn');
    taskp.setAttribute('class', 'taskp');
    editbtn.onclick = function () { editTask(taskdiv, task); };
    deletebtn.onclick = function () { deleteTask(taskdiv, task); };
}
function editTask(taskElement, task) {
    var newText = prompt('Edit task:', task.text);
    if (newText !== null) {
        task.text = newText;
        taskElement.childNodes[0].textContent = newText;
        saveTaskToLocalStorage(task);
    }
}

function deleteTask(taskElement, task) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskElement.remove();
        removeTaskFromLocalStorage(task);
    }
}

function saveTaskToLocalStorage(task) {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function removeTaskFromLocalStorage(task) {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var index = storedTasks.findIndex(function (t) {
        return t.text === task.text;
    });
    if (index !== -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}
