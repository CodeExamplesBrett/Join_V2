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
    let name =document.getElementById("firstName");
    let lastName =document.getElementById("lastName");
    //console.log(email);
    //console.log(password)
    checkId()
    getInitials(name, lastName);
    makeUserJson(email, password, name, lastName);

    setArray("user", users);
    console.log(tasks);

    clear();               
}

function checkId(){
    let highestID = 0
    for (let i = 0; i < users.length; i++) {
        let id = users[i].id;

        if(id > highestID){
            highestID = id;
        }    
    }
    console.log('the hight', highestID);
    return setID = highestID + 1;
}

function getInitials(name, lastName){
    let fullName = name.value + ' ' + lastName.value
    const words = fullName.split(" "); // split the string into an array of words
    const firstLetters = words.map(word => word.charAt(0)); // extract the first letter of each word
    const capitalizedLetters = firstLetters.map(letter => letter.toUpperCase()); // capitalize each letter
    return initials = capitalizedLetters.join(""); // join the letters into a string
    //console.log(initials);
}

function makeUserJson(email, password, name, lastName){
    users.push({
        email: email.value, 
        password: password.value, 
        name: name.value, 
        lastName: lastName.value,
        initials: initials, 
        img: './img/avatar.png',
        id: setID});
}

function clear(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function setArray(key, array) {
    backend.setItem(key, JSON.stringify(array));
  }
    
