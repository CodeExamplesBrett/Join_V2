async function getContacts(){
    await init();
    //calcValues(); 
}

function showContacts(){
    for (let i = 0; i < users.length; i++) {
        let userName = users[i];
    }
}

function addContact() {
    let email =document.getElementById("email");
    let password =document.getElementById("password");
    let firstName =document.getElementById("firstName");
    let lastName =document.getElementById("lastName");
    //console.log(email);
    //console.log(password)

    users.push({
        email: email.value, 
        password: password.value, 
        firstName: firstName.value, 
        lastName: lastName.value, 
        img: './img/avatar.png'});

    setArray("user", users);
    console.log(tasks);

    clear();

    
                
}

function clear(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function setArray(key, array) {
    backend.setItem(key, JSON.stringify(array));
  }
    
