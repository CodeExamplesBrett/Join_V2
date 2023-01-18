setURL('https://brett-scott.developerakademie.net/Modul_10/smallest_backend_ever/');

async function init(currentLink) {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
  users = JSON.parse(backend.getItem('user')) || [];

  console.log('tasks', tasks);
  console.log('users', users);

  await includeHTML();
  //menuSelected(currentLink);
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


function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function menuSelected(currentLink) {
  document.getElementById(currentLink).classList.add("board-menu-highlight");
}


