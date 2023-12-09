//empty array for selected users, from all users dialog
let selectUser = [];
let UrgentUrlLink = ''

async function checkLogin(){
  await init();
  dispayLoggedUser('addTask')

}

// jsdoc: npm install -g jsdoc

/**
 * This function reads input data from addTasks form pushes input to JSON-array then saves this array on backend server
 * @param {string} event - on event here summit button click the default funtcion of the form is prevented so that processes in console can be seen and the page is not automatically reloaded.
 */
function addTask(event) {
  // function to prevent the default function of form being carried out
  event.preventDefault();
  //if statement to check if user has been assigned
  if (selectUser.length == 0) {
      warningAssignUser()
  } else {
    //otherwise push the data to json array
    handleCreateTask();
  }
}


function warningAssignUser() {
  document.getElementById("user-img").innerHTML = 
  //div with warning to assign a user
  /*html*/ `<div class="userWarning"><img class="Exclaim" src="./img/Exclaimation.png"><span>Assign user.</span></div>`
}


function handleCreateTask() {
  inputForTaskArray();
  resetFormObjects();
  showConfirmationText();
  // selected users array emptied
  selectUser = [];
  //Selected user/s displayed
  loadImages();
}

 
/**
 * This function provides the inputs for the JSON to be added
 */
 function inputForTaskArray() {
  // Variables saved as JSON , with .value the value of the form object is returned (writen this way so that the form can then be reset).

  // Variables for form objects to be saved in JSON
  let title = document.getElementById("title");
  let category = document.getElementById("category");
  let description = document.getElementById("description");
  let date = document.getElementById("due-date");
  let urgency = document.getElementById("urgency");

  setUrlForPriorityLabel()
  createTaskJSON(title, category, description, date, urgency); 
}


// creates url path for urgentcy images global variable "UrgentUrlLink" then added to task Json
function setUrlForPriorityLabel(){
  if(urgency.value == 'high'){
    console.log('high')
    UrgentUrlLink = './img/arrow_urgent.svg'
  } 
  if(urgency.value == 'medium'){
    console.log('medium')
    UrgentUrlLink = './img/medium.svg'
  } 
  if(urgency.value == 'low'){
    console.log('high')
    UrgentUrlLink = './img/arrow_low.svg'
  } 
}


// creates a JSON for the form inputs 
function createTaskJSON(title, category, description, date, urgency){
  let task = {
    title: title.value,
    category: category.value,
    description: description.value,
    date: date.value,
    urgency: urgency.value,
    status: "todo",
    PrioUrlLink: UrgentUrlLink,
    // selected users from array "selectUser"
    user: selectUser
  };
  pushTaskToServerJSON(task);
  openBacklogWindow();
}


// opens next paqe in process
function openBacklogWindow(){
 setTimeout(function () {
    window.location.href = "task.html";
}, 1000)
}

// Pushes this JSON into array "tasks"  then pushes this array to Json database on the server
function pushTaskToServerJSON(task){
  tasks.push(task);
  setArray("tasks", tasks);
  console.log(tasks);
}

/**
 * This function resets all inputs in addTask form
 */
 function resetFormObjects() {
  // Reset form objects
  selectUser = [];
  //selected user images removed
  document.getElementById("user-img").innerHTML = "";
  title = document.getElementById("title").value = "";
  category = document.getElementById("category").value = "";
  description = document.getElementById("description").value = "";
  date = document.getElementById("due-date").value = "";
  urgency = document.getElementById("urgency").value = "";

  plusButtonCenter();
}

function showConfirmationText() {
    // task sent confirmation text displayed then turned off after 2 seconds
    document.getElementById(
      "confirm-text"
    ).innerHTML = /*html*/ `Task assigned successfully`;

    setTimeout(function () {
      document.getElementById("confirm-text").innerHTML = "";
    }, 4000);
  }

  /**
 * This function brings up dialog box with users to assign to the task (From array users on Backend server )
 */
  async function showUser() {

  //clear previous content
  document.getElementById("user-container").innerHTML = "";
  // Remove hidden class for the grey background --- user container is within this div
  document.getElementById("bg-grey").classList.remove("d-none");
  // gets contact list from contacts.js .... same functions as used for contacts list on contacts page
  // await needed as long string of functions carried out in seperate js file contacts.js otherwise show checkups won't work
  await getContacts('user-container');
  showCheckUp();
  
}


/**
 * This Function adds the selected user to the selected users array "selectUser" (from the select user dialog popup function "showUser")
 * 
 * @param {string} i - current selection
 * @returns 
 */
function addUser(i) {
  // All details of selected user i in new array "userInfo" (the selected users)
  let userInfo = users[i];
  console.log('userInfo', userInfo)
  //name of selected user in dialig box
  let userFullName = users[i].name + ' ' + users[i].lastName;

  // loop to remove users already in the selection when clicked again.
  for (let i = 0; i < selectUser.length; i++) {
    let selection = selectUser[i];
    // if statement compares the user in array all users "users" with user in the selected users array "selectUser" if 
    // user exists then the user will be spliced out of the array..
    if (userFullName == selection.name + ' ' + selection.lastName) {
      selectUser.splice(i, 1);
      console.log('removed', selectUser)
      //ticks shown next to selected users
      showCheckUp();

      console.log("User würde schon hinzugefügt");
      loadImages();
      
      //return used here ...when if statement is true then return exits the function 
      //otherwise the push to array section below will be carried out... could also use if, else
      return;
    }
  }
  //pushes all details (JSON) for the selected user to array "selectUser" --- 
  //this will be the user array to be added to the task in function "createTaskJSON"
  selectUser.push(userInfo);

  console.log('selectUser', selectUser);
  
  loadImages();
  showCheckUp();

}

/**
 * This function addes the avitar and name to the add task dialog under heading "Assign to" -- to show which uses have been selected
 */
function loadImages() {
  plusButtonCenter();

  // if the selected user array is not empty ---
  if (selectUser !== []) {
    //clear any images from the dic
    document.getElementById("user-img").innerHTML = "";
    //add the selected users to the form in div id= user-img
    for (let i = 0; i < selectUser.length; i++) {
      let userName = selectUser[i].name;
      let initials = selectUser[i].initials;
      let colorId = selectUser[i].id % 10;
      document.getElementById("user-img").innerHTML += `                                    
      <div class="added-user">
      <div style="background-color:var(--color-${colorId})" class="avatar"><p class="initial-text">${initials}</p></div>
      </div>
      `;
    }
  }
} 


/**
 * This function addes class to "plus-svg" to align it with avitar image once added
 */
function plusButtonCenter(){
  if(selectUser == 0){
    document.getElementById("plus-svg").classList.remove("plus-svg-middle");
  } else {
    document.getElementById("plus-svg").classList.add("plus-svg-middle");
  }
}

/**
 * This function compares the users in all users with the users in selected users if they are the in both then 
 * a tick will be placed next to the user in the select user dialog popup --- from function "show user"
 */
function showCheckUp() {
  for (let i = 0; i < users.length; i++) {
    //first for all divs 'checked_0, 1, 2 ... the ticks are removed if present...
    document.getElementById(`checked_${i}`).innerHTML = "";
    const userFullName = users[i].name + ' ' + users[i].lastName;
    for (let j = 0; j < selectUser.length; j++) {
      const selectedUserFullName = selectUser[j].name + ' ' + selectUser[j].lastName;
      if (userFullName == selectedUserFullName) {
        document.getElementById(`checked_${i}`).innerHTML = `<img class="checkmark" src="./img/checkmark.png"
           </img>`;
      } 
    }
  }
}

/**
 * This function closes the adduser popup dialog box
 */
function closeUserDialog() {
  document.getElementById("bg-grey").classList.add("d-none");
  

}

/**
 * This function pushes araray to server via main.js and minibackend.js
 *
 * @param {string} key
 * @param {array} array
 */
function setArray(key, array) {
  backend.setItem(key, JSON.stringify(array));
}






