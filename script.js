const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');

let draggedItem = null;

const task = document.querySelectorAll('.task');

// Drag Event for each task
task.forEach(task=>{
    task.addEventListener('drag',(e)=>{
        // console.log('dragging',e);
        draggedItem = task;
    })
})

function DragAndDrop(column){
    column.addEventListener('dragenter',(e)=>{
        e.preventDefault();
        column.classList.add('hover-over');
    })

    column.addEventListener('dragleave',(e)=>{
        e.preventDefault();
        column.classList.remove('hover-over');
    })

    column.addEventListener('dragover',(e)=>{
        e.preventDefault();
    })

    column.addEventListener('drop',(e)=>{
        e.preventDefault();
        console.log('dropped',draggedItem,column);
        column.appendChild(draggedItem);
        column.classList.remove('hover-over');
    })
}

DragAndDrop(todo);
DragAndDrop(progress);
DragAndDrop(done);