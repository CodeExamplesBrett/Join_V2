setURL('https://brett-scott.developerakademie.net/Modul_10/smallest_backend_ever/');

async function init(currentLink) {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
  users = JSON.parse(backend.getItem('user')) || [];

  console.log('tasks', tasks);
  console.log('users', users);

  await includeHTML();
  //menuSelected(currentLink);
  sortUsers();
  displayCurrentDate();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


function menuSelected(currentLink) {
  document.getElementById(currentLink).classList.add("board-menu-highlight");
}


function sortUsers(){
  users.sort((a, b) => {
      // Compare first names
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        // If first names are the same, compare last names
        if (a.lastName < b.lastName) {
          return -1;
        } else if (a.lastName > b.lastName) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    console.log("Sorted users", users);
}


function displayCurrentDate(){
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  dateArea = document.getElementById("due-date");
  // only add current date to element "due-date" if it exists
  if(dateArea){
    dateArea.value = yyyy + '-' + mm + '-' + dd;
  }  
}

function logout(){
  localStorage.clear(); 
}

function setLocal(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}


