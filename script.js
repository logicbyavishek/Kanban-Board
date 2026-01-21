const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let draggedItem = null; // create a variable to store the reference of the dragged item

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
        console.log('dropped',draggedItem,column);
        column.appendChild(draggedItem); // append the dragged item to the column where it is dropped
        column.classList.remove('hover-over'); // remove the hover effect once dropped
    })
}

DragAndDrop(todo);
DragAndDrop(progress);
DragAndDrop(done);

// Modal functionality Logic------------->>>>
const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const bg = document.querySelector('.bg');

toggleModalButton.addEventListener('click',()=>{
    modal.classList.toggle('active');
})

bg.addEventListener('click',()=>{
    modal.classList.toggle('active');
})
// <<<<<<<<<--------------- End of Modal functionality Logic

// Add Task Functionality Logic--------->>>>
const addTaskButton = document.querySelector('#add-new-task');

addTaskButton.addEventListener('click',()=>{
    const taskTitle=document.querySelector('#task-titel-input').value;
    const taskDesc=document.querySelector('#task-desc-input').value;

    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable','true');
    div.innerHTML=`         <h2>${taskTitle}</h2>
                            <p>${taskDesc}</p>
                            <button>Delete</button>`;
    todo.appendChild(div);
    // Add drag event to the newly created task
    div.addEventListener('drag',(e)=>{
        draggedItem = div;
    })

    // Clear the input fields
    document.querySelector('#task-titel-input').value='';
    document.querySelector('#task-desc-input').value='';
    // Close the modal
    modal.classList.remove('active');
})