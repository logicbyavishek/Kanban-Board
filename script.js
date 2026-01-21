let tasksData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];

let draggedItem = null; // create a variable to store the reference of the dragged item

// Modal functionality Logic------------->>>>
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const bg = document.querySelector('.bg');

toggleModalButton.addEventListener('click',()=>{
    modal.classList.toggle('active');
})

bg.addEventListener('click',()=>{
    modal.classList.toggle('active');
    // Clear the input fields
    document.querySelector('#task-titel-input').value='';
    document.querySelector('#task-desc-input').value='';
})
// <<<<<<<<<--------------- End of Modal functionality Logic

function addTask(titel,column,desc){
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable','true');
    div.innerHTML=`         <h2>${titel}</h2>
                            <p>${desc}</p>
                            <button>Delete</button>`;
    column.appendChild(div);
    // Add drag event to the newly created task
    div.addEventListener('drag',(e)=>{
        draggedItem = div;
    })

    document.querySelector('#task-titel-input').value='';
    document.querySelector('#task-desc-input').value='';

    modal.classList.remove('active');

    // Add delete functionality to the delete button
    const deleteButton = div.querySelector('button');
    deleteButton.addEventListener('click',()=>{
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount(){
    // Update task count in todo column
        columns.forEach(col=>{
            const task = col.querySelectorAll('.task');
            const count = col.querySelector('.right')

            // Update tasksData object 
            tasksData[col.id]=Array.from(task).map(t=>{
                return {
                    title: t.querySelector('h2').innerText,
                    desc: t.querySelector('p').innerText
                }
            });

            localStorage.setItem('tasksData',JSON.stringify(tasksData));

            count.textContent = task.length;
        })
}

if(localStorage.getItem('tasksData')){
    const data = JSON.parse(localStorage.getItem('tasksData'));
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(taskData=>{
            addTask(taskData.title,column,taskData.desc);
        })
    }
    updateTaskCount();
}


const task = document.querySelectorAll('.task');

// Drag Event for each task
task.forEach(task=>{
    task.addEventListener('drag',(e)=>{
        // console.log('dragging',e);
        draggedItem = task; // to store the reference of the dragged item
    })
})

function DragAndDrop(column){
    column.addEventListener('dragenter',(e)=>{
        e.preventDefault();
        column.classList.add('hover-over'); // to add hover effect when an item is dragged over a column
    })

    column.addEventListener('dragleave',(e)=>{
        e.preventDefault();
        column.classList.remove('hover-over'); // to remove hover effect when an item is dragged out of a column
    })

    column.addEventListener('dragover',(e)=>{
        e.preventDefault();
    }) // to allow drop and prevent default behaviour of not allowing drop in browser

    column.addEventListener('drop',(e)=>{
        e.preventDefault();
        column.appendChild(draggedItem); // append the dragged item to the column where it is dropped
        column.classList.remove('hover-over'); // remove the hover effect once dropped

    // Update task count in todo column
        updateTaskCount();

    })
}

DragAndDrop(todo);
DragAndDrop(progress);
DragAndDrop(done);


// Add Task Functionality Logic--------->>>>
const addTaskButton = document.querySelector('#add-new-task');

addTaskButton.addEventListener('click',()=>{
    const taskTitle=document.querySelector('#task-titel-input').value;
    const taskDesc=document.querySelector('#task-desc-input').value;

    addTask(taskTitle,todo,taskDesc);

    // Update task count in todo column
    updateTaskCount();

    // Clear the input fields
    document.querySelector('#task-titel-input').value='';
    document.querySelector('#task-desc-input').value='';
    // Close the modal
    modal.classList.remove('active');
})