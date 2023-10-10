class TodoItem
{
    constructor(text, completed = false, createdAt = new Date(), updatedAt = new Date())
    {
        this.text = text;
        this.completed = completed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    formattedCreatedAt()
    {
        return this.createdAt.toLocaleString();
    }
}

class TodoItemPremium extends TodoItem
{
    constructor(text, completed = false, createdAt = new Date(), updatedAt = new Date(), image = '')
    {
        super(text, completed, createdAt, updatedAt);
        this.image = image;
    }

    setimage(imageUrl)
    {
        this.image = imageUrl;
    }

    dispimage()
    {
        if (this.image)
        {
            return `<img src="${this.image}" alt="item img" />`;
        }
        else
        {
            return '';
        }
    }
}
document.addEventListener('DOMContentLoaded', function ()
{
    const tasksInp = document.getElementById('taskAdd');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTask');
    const remCompletedbtn = document.getElementById('remCompleted');
    const remAllbtn = document.getElementById('remAll');
    const ascsortbtn = document.getElementById('ascsorts');
    const descsortsbtn = document.getElementById('descsorts');
    const savelocalbtn = document.getElementById('savelocal');
    const clearlocalbtn = document.getElementById('clearlocal');
    const pickrandombtn = document.getElementById('pickrandom');
    const loadfromstoragebtn = document.getElementById('loadstorage');

    let tasks = [];

    function pickrandomtodo()
    {
        const rand = Math.floor(Math.random() * tasks.length);

        tasks.forEach((task) =>
        {
            task.completed = false;
        });

        tasks[rand].completed = true;

        rendtasks();
    }

    function addTask()
    {
        const tt = tasksInp.value.trim();
        if (tt === '') return;

        const currtime = new Date();
        const task = new TodoItem(tt, false, currtime, currtime);
        tasks.push(task);
        rendtasks();
        tasksInp.value = '';
    }

    function rendtasks()
    {
        taskList.innerHTML = '';

        tasks.forEach((task, ind) =>
        {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} id="task_${ind}">
            <label ${task.completed ? 'class="completed"' : ''} for="task_${ind}">${task.text} (Created: ${task.formattedCreatedAt()})</label>
            <button class="removeBtn" data-index="${ind}">Remove</button>
            `;

            taskList.appendChild(taskItem);

            const cbox = taskItem.querySelector('input');
            const rembtn = taskItem.querySelector('.removeBtn');

            cbox.addEventListener('change', () =>
            {
                tasks[ind].completed = cbox.checked;
                tasks[ind].updatedAt = new Date();
                rendtasks();
            });

            rembtn.addEventListener('click', () =>
            {
                tasks.splice(ind, 1);
                rendtasks();
            });
        });
    }

    function sortAsc()
    {
        tasks.sort((a, b) => a.updatedAt - b.updatedAt);
        rendtasks();
    }

    function sortDesc()
    {
        tasks.sort((a, b) => b.updatedAt - a.updatedAt);
        rendtasks();
    }

    function savelocalst()
    {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadlocalst()
    {
        const tasksfromlocal = JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasksfromlocal); debug
        if (tasksfromlocal)
        {
            tasks = tasksfromlocal.map(taskData =>
            {
                return new TodoItem(
                    taskData.text,
                    taskData.completed,
                    new Date(taskData.createdAt),
                    new Date(taskData.updatedAt)
                );
            });
            rendtasks();
        }
    }

    function clearlocalst()
    {
        localStorage.removeItem('tasks');
        tasks = [];
        rendtasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    tasksInp.addEventListener('keydown', function (event)
    {
        if (event.key === 'Enter')
        {
            addTask();
        }
    });

    remCompletedbtn.addEventListener('click', function ()
    {
        tasks = tasks.filter((task) => !task.completed);
        rendtasks();
    });

    remAllbtn.addEventListener('click', function ()
    {
        if (tasks.length > 0 && confirm('remove?'))
        {
            tasks = [];
            rendtasks();
        }
    });

    ascsortbtn.addEventListener('click', sortAsc);
    descsortsbtn.addEventListener('click', sortDesc);

    savelocalbtn.addEventListener('click', savelocalst);
    clearlocalbtn.addEventListener('click', clearlocalst);

    pickrandombtn.addEventListener('click', pickrandomtodo);
    loadfromstoragebtn.addEventListener('click', function ()
    {
        loadlocalst();
    });

    loadlocalst();

    rendtasks();
});