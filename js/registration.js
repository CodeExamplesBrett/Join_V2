

function addUser(event){
        // function to prevent the default function of form being carried out
    event.preventDefault();
    let email =document.getElementById("email");
    let password =document.getElementById("password");
    let name =document.getElementById("name");
    //console.log(email);
    //console.log(password)

    users.push({email: email.value, password: password.value, name: name.value});
    setArray("user", users);
    console.log(tasks);

    clear();

    setTimeout(()=> {
        window .location.href = "login.html?msg=Thank you for registering";
    }, 1000)
    //window.location.href ="login.html";
                
}

function clear(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function setArray(key, array) {
    backend.setItem(key, JSON.stringify(array));
  }