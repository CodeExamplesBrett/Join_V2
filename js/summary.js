dueDates = [];
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Date format for most urgent Task
// outputMonth = ''
// outputDay = ''
// outputYear = ''
urgentTasksLength = ''


async function getStats(){
    await init();
    calcValues(); 
    dispayLoggedUser();
}


//calcuates the number of tasks in each category
function calcValues(){
    let bCount = tasks.filter(x => x.status !== 'backlog').length;
    let todoCount = tasks.filter(x => x.status === 'todo').length;
    let progressCount = tasks.filter(x => x.status === 'inProgress').length;
    let testingCount = tasks.filter(x => x.status === 'testing').length;
    let doneCount = tasks.filter(x => x.status === 'done').length;

    addDetails(bCount, todoCount, progressCount, testingCount, doneCount);
}


//Added calculated vaules in the respective div
function addDetails(bCount,todoCount, progressCount, testingCount, doneCount){
    document.getElementById('count').innerHTML = bCount;
    document.getElementById('progress').innerHTML = progressCount; 
    document.getElementById('feedback').innerHTML = testingCount; 
    document.getElementById('todo').innerHTML = todoCount; 
    document.getElementById('done').innerHTML = doneCount; 

    calcUrgent() 
}


//////////////////////////////// Urgent Date field funtions ////////////////////////////////

function calcUrgent(){
    let urgentTasks = tasks.filter(x => x.status !== 'backlog' && x.urgency == 'high');
    let urgentTasksLength = urgentTasks.length;
    

    console.log('Nr tasks', urgentTasksLength)
    console.log('urgent', urgentTasks)


    if(urgentTasksLength == 0){
    dueDate = 'No Urgent Tasks';
    console.log('None', dueDate);
    } else {
        for (let i = 0; i < urgentTasks.length; i++) {
            //let urgentTask = urgentTasks[i];
            let dueDate = urgentTasks[i]["date"];
            console.log('date', dueDate);
            dueDates.push(dueDate);
            console.log('Duedates Array',dueDates)
          }
        findNearestDate(dueDates);

    } 
    displayUrgentNumber(urgentTasksLength);
}

function displayUrgentNumber(urgentTasksLength){
    document.getElementById('Task-urgent').innerHTML = urgentTasksLength;
}

function findNearestDate(dueDates) {
    let nearestDate = null;
    // sets the value of the nearestDifference variable to the largest safe integer value representable in JavaScript, which is 2^53 - 1.
    let nearestDifference = Number.MAX_SAFE_INTEGER;
    let currentDate = new Date();
  
    for (let i = 0; i < dueDates.length; i++) {
      let date = new Date(dueDates[i]);
      let difference = Math.abs(currentDate - date);
  
      if (difference < nearestDifference) {
        nearestDate = date;
        nearestDifference = difference;
      }
      
    }
    console.log('near_Date', nearestDate);
    formatMonth(nearestDate);
    //return nearestDate;
    
  }

  function formatMonth(nearestDate) {
    let date = new Date(nearestDate);
    let monthIndex = date.getMonth();
    //months returned as int eg 05 then used as index for months array above January = 0!
    let outputMonth = months[monthIndex];
    let outputDay = date.getDate();
    let outputYear = date.getFullYear();
    console.log('full month', outputMonth);
    console.log('full day', outputDay);
    console.log('full year', outputYear);

    displayMostUrgentDate(outputMonth, outputDay, outputYear);
  }

  function displayMostUrgentDate(outputMonth, outputDay, outputYear){
    let fullDate = outputMonth + ' ' + outputDay + ', ' + outputYear
    //console.log('full --- all', fullDate)
    document.getElementById('urgentDate').innerHTML = fullDate;
  }

  
// opens next paqe in process
function openBoardWindow(){
  setTimeout(function () {
     window.location.href = "task.html";
 }, 500)
 }

 function dispayLoggedUser(){
    let localUserString = localStorage.getItem('loggedUser');
    let currentLoggedUser = JSON.parse(localUserString);
    
    console.log(currentLoggedUser )
    if(currentLoggedUser !== null){
      let colorId = currentLoggedUser[0].id % 10;
      let initials = currentLoggedUser[0].initials;
      document.getElementById('userName').innerHTML = currentLoggedUser[0].fullName
      document.getElementById('profil-picture').innerHTML = /*html*/ `
        <div style="background-color:var(--color-${colorId})" class="avatar-sidebar"><p class="initial-text">${initials}</p></div>
    `} else{
         document.getElementById('userName').innerHTML = ""
         document.getElementById('profil-picture').innerHTML = ""
    }
    
    
    
 }
