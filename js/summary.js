async function getStats(){
    await init();
    calcValues(); 
}

function calcUrgent(){
    let urgentTasks = tasks.filter(x => x.status !== 'backlog' && x.urgency == 'high');
    for (let i = 0; i < urgentTasks.length; i++) {
        let dueDate = urgentTasks[i]["date"];
        console.log('date', dueDate)
        
      }
    console.log('urgent', urgentTasks)
}


//calcuates the number of tasks in each category
function calcValues(){
    let bCount = tasks.filter(x => x.status !== 'backlog').length;
    let todoCount = tasks.filter(x => x.status === 'todo').length;
    let progressCount = tasks.filter(x => x.status === 'inProgress').length;
    let testingCount = tasks.filter(x => x.status === 'testing').length;
    let doneCount = tasks.filter(x => x.status === 'done').length;

    addDetails(bCount, todoCount, progressCount, testingCount, doneCount)
}


//Added calculated vaules in the respective div
function addDetails(bCount,todoCount, progressCount, testingCount, doneCount){
    document.getElementById('count').innerHTML = bCount;
    document.getElementById('progress').innerHTML = progressCount; 
    document.getElementById('feedback').innerHTML = testingCount; 
}