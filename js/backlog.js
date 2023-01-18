let colorsOfUrgency = {
  low: "./img/icons_google/low-icon.png",
  medium: "./img/icons_google/medium-icon.png",
  high: "./img/icons_google/high-icon.png",
};

async function showBacklogTask() {
  await init('backlog-link');
  renderBacklogTasks();
}

function renderBacklogTasks() {
  let backlogtable = document.getElementById("backlogTable");
  //clear table content
  backlogtable.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const backlogTask = tasks[i];
    //finds the path for the urgency class e.g. ./img/icons-google/high-icon.png
    const colorOfUrgency = colorsOfUrgency[backlogTask["urgency"]];
    //if status within Json in tasks array = backlog then display them in table
    if (backlogTask.status == "backlog") {
      backlogtable.innerHTML += backlogTableHTML(i, colorOfUrgency);
    }
  }
}



//Displays dialogbox with details and option to add to board with button

function addToBoard(i) {
  let dialogInfo = document.getElementById("dialog-info");
  let dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = "flex";
  dialogBox.classList.remove("d-none");

  dialogInfo.innerHTML = /*html*/ `
    <div class="dialog-title">${tasks[i].title}</div>
      <div class="user-box-dialog">
          <span class="gray-color">Added to</span>
          <span class="user-names-dialog" id="user-names${i}"></span>
      </div>
        <div class="table-con"> 
          <div class="info-table">
            <table class="dialog-table">
                  <tr>
                    <th>Category</th>
                    <td class="font-variant">${tasks[i].category}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>${tasks[i].status}</td>
                  </tr>

                  <tr></tr>
                    <th class="display-block">Details</th>
                    <td>${tasks[i].description}</td>
                  </tr>
              </table>
            
          </div>
    <div class="date-con">${tasks[i].date}</div>
    
    <div class="dialog-btn">
    <button class="close-btn" onclick="closeBox()">Close</button>
    <button class="add-btn" onclick="pushToBoard(${i})">Add to Board</button>
    
    </div>
  `;

  loadUser(i);
}


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

function closeBox() {
  let closeDialog = document.getElementById("dialog-box");
  closeDialog.classList.add("d-none");
}

function pushToBoard(i) {
// change the status of the task in the array to "todo"
  tasks[i].status = "todo";
  closeBox();
  setArray("tasks", tasks);
  renderBacklogTasks();
  openBoardWindow()
  
}


//open next page in process after 1 second
function openBoardWindow(){
  setTimeout(function () {
    window.location.href = "task.html";
}, 1000)
}


function setArray(key, array) {
  backend.setItem(key, JSON.stringify(array));
}
