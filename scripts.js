function clearCompleted() {
    document.querySelectorAll('.done').forEach(li => li.remove());
    saveTasks();
}

const input = document.getElementById('TaskInputs');
const addBtn = document.getElementById('AddButton');
const tasklist = document.getElementById('TaskList');

function addTask() {
    const text = input.value.trim();
    if (text === '') return;

    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = ' ❌';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);

    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTasks();
    });

    tasklist.appendChild(li);
    input.value = '';
    saveTasks();
}

addBtn.addEventListener('click', addTask);

function saveTasks() {
    const tasks = [...document.querySelectorAll('li')].map(li => {
        const text = li.firstChild.textContent; // текст без крестика
        const done = li.classList.contains('done');
        return { text, done };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

(function loadTasks() {
    const data = JSON.parse(localStorage.getItem('tasks') || '[]');
    data.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' ❌';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);

        if (task.done) li.classList.add('done');

        li.addEventListener('click', () => {
            li.classList.toggle('done');
            saveTasks();
        });

        tasklist.appendChild(li);
    });
})();

document.getElementById('themetoogle').onclick = () => {
    document.body.classList.toggle('dark');
}

document.getElementById('clearCompleted').addEventListener('click', clearCompleted);
