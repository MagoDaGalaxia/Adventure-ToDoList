let tasks = [];
const categoryImages = {
    "Trabalho": "img/1.jpg",
    "Escola": "img/2.jpg",
    "Pessoal": "img/3.jpg",
    "Urgente": "img/4.jpg",
    "Futura": "img/5.jpeg",
    "Opcional": "img/6.jpg"
};
function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskCategory = document.getElementById('taskCategory').value;
    if (taskName && taskDescription) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            description: taskDescription,
            category: taskCategory,
            image: categoryImages[taskCategory],
            completed: false
        };

        tasks.push(newTask);
        renderTasks();
        clearForm();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
function renderTasks(filter = 'All') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter !== 'All') {
        filteredTasks = tasks.filter(task => task.category === filter);
    }
    filteredTasks.forEach((task) => {
        const taskCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${task.image}" class="card-img-top" alt="Imagem da Tarefa">
                    <div class="card-body">
                        <h5 class="card-title">${task.name}</h5>
                        <p class="card-text">${task.description}</p>
                        <p><strong>Categoria:</strong> ${task.category}</p>
                        <button class="btn ${task.completed ? 'btn-completed' : 'btn-success'}" onclick="toggleComplete(${task.id})">
                            ${task.completed ? 'Concluído' : 'Marcar como Concluído'}
                        </button>
                        <button class="btn btn-warning" onclick="editTask(${task.id})">Editar</button>
                    </div>
                </div>
            </div>
        `;
        taskList.insertAdjacentHTML('beforeend', taskCard);
    });
}
function clearForm() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = 'Trabalho';
}
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskCategory').value = task.category;

        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }
}
function filterTasks() {
    const filterCategory = document.getElementById('filterCategory').value;
    renderTasks(filterCategory);
}