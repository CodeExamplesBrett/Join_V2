

async function getStats(){
    await init();
    boardCount();
    todoCount();
    progressCount();
    testingCount();
}

function boardCount(){
    let bCount = tasks.filter(x => x.status !== 'backlog').length;
    console.log('boardCount', bCount);
    addDetails(bCount);
}

function todoCount(){
    let todoCount = tasks.filter(x => x.status === 'todo').length;
    console.log('todoCount', todoCount);
}

function progressCount(){
    let progressCount = tasks.filter(x => x.status === 'inProgress').length;
    console.log('progressCount', progressCount);
}

function testingCount(){
    let testingCount = tasks.filter(x => x.status === 'testing').length;
    console.log('testingCount', testingCount);
}

function doneCount(){
    let doneCount = tasks.filter(x => x.status === 'done').length;
    console.log('doneCount', doneCount);
}


function addDetails(bCount){
    let total = document.getElementById('count');
    total.innerHTML = bCount;
}

