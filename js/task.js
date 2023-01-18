async function showOverview() {
  await init('board-link');
  showCards();
}

function showCards() {
  clearOverview();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    // id is returned from funtcion "assignStatus" as -- "todo", "inProgress", "testing", "done"
    let id = assignStatus(task);

    if (task.status != "backlog") {
      // id from above used to populate the corresponding div with id -- either "todo" or "inProgress" or "testing" or "done"
      // id from function "assignStatus()" below.
      document.getElementById(id).innerHTML += cardHTML(task, i);
      //If there are more  than two users
      if (task.user.length > 2) {
        // adds the number of extra users that are not displayed (only first 2 are displayed) with length of users array minus 2
        document.getElementById(`number-of-member${i}`).innerHTML =
          // function (in template.js) memberNUmberHTML returns a span with the number of extra users
          memberNUmberHTML(task.user.length - 2);
      }
      if (task.user.length > 0) {
        loadImgOfMember(task, i);
      }
    }
  }
}

// for each task if the status in task array equal to the corresponding category 
// then return that id 
function assignStatus(element) {
  if (element.status == "todo") {
    let id = "todo";
    return id;
  }
  if (element.status == "inProgress") {
    let id = "inProgress";
    return id;
  }
  if (element.status == "testing") {
    let id = "testing";
    return id;
  }
  if (element.status == "done") {
    let id = "done";
    return id;
  }
}


function loadImgOfMember(task, j) {
  for (let i = 0; i <= 1; i++) {
    let user = task.user[i];
    if (user) {
      // goes through user with variable "i" --- variable "j" from the total tasks array
      // the pictures are assigned to the corresponding div with variable "j" 
      // function memberHTML (in template.js) used to add the pictures to div.
      document.getElementById(`task-member${j}`).innerHTML += memberHTML(
        user.img
      );
    }
  }
}


// on mouseover from user pictures... all users displayed in larger div
// function called within the HTML of fuction "cardHTML" which is called above in function "showCards"
function showMembers(i) {
  let task = tasks[i];
  document.getElementById(`member-overview${i}`).innerHTML = "";
  document.getElementById(`member-overview${i}`).classList.remove("d-none");
  for (let j = 0; j < task.user.length; j++) {
    const user = task.user[j];
    document.getElementById(`member-overview${i}`).innerHTML +=
      //calls function (in template.js) memberOverviewHTML added user image  to larger mouseover div.
      memberOverviewHTML(user.img);
  }
}


//on mouseout hide the enlarged user pictures again.
function hideMembers(i) {
  document.getElementById(`member-overview${i}`).classList.add("d-none");
}

// clear all containers at begining .. called in function "showCards()" above.
function clearOverview() {
  document.getElementById("inProgress").innerHTML = "";
  document.getElementById("testing").innerHTML = "";
  document.getElementById("todo").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}

//sets the id of the task equal to "i"
function startDragging(i) {
  currentId = i;
}

//allows task to be dropped in category (called --- ondragover="allowDrop(event) from category div )
function allowDrop(ev) {
  ev.preventDefault();
}

//ondrop function called from div category container with ondrop= . 
// Category parameter comes from div e.g. -- ondrop="moveTo('todo')
function moveTo(category) {
  tasks[currentId]["status"] = category;
  //new status updated, saved to server
  setArray("tasks", tasks);
  // render cards again
  showCards();
}

//These two functions add or remove the highlight class either on -- ondragover or  ondragleave
//  ondragover="allowDrop(event); highlight('todo-content')"
function highlight(id) {
  document.getElementById(id).classList.add("drag-erea-highlight");
}

// with  ondrop it's also removed -- semicolon  seperates the two functions that are called
//  ondrop & removeHighlight     :    ondragover & highlight
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-erea-highlight");
}

function setArray(key, array) {
  backend.setItem(key, JSON.stringify(array));
}

function getArray(key) {
  return JSON.parse(backend.getItem(key));
}


// click on task to show details dialogbox (onclick calls function addToBoard() in template.js -- HTML in function cardHTML())
function addToBoard(i) {
  let dialogInfo = document.getElementById("dialog-info");
  let dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = "flex";
  dialogBox.classList.remove("d-none");
  // function to render the data in template.js 
  dialogInfo.innerHTML = overlayTaskHTML(i);

  loadUser(i);
}


//function loads the user name and picture into the enlarged task details dialogbox
function loadUser(i) {
  let task = tasks[i];

  for (let j = 0; j < task.user.length; j++) {
    const user = task.user[j];
    document.getElementById(`user-names${i}`).innerHTML += /*html*/ `
    <div class="user-images-names">
         <img class="user-img" src="${user.img}" alt="">
         <span class="user-name">${user.name}</span>
    </div>
        `;
  }
}


//closes the enlarged task details dialogbox
function closeBox() {
  let closeDialog = document.getElementById("dialog-box");
  closeDialog.classList.add("d-none");
}


//deletes the current task 
function deletefromBoard(i) {
  tasks.splice(i, 1);
  setArray("tasks", tasks);
  closeBox();
  showCards();
}


// Moves the task from one category to another in mobile view...
function moveToCategoryButton(i, category) {
  tasks[i].status = category
  setArray("tasks", tasks);
  closeBox();
  showCards();
}