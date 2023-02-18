

function addUser(event){
        // function to prevent the default function of form being carried out
    event.preventDefault();
    let email =document.getElementById("email");
    let password =document.getElementById("password");
    let name =document.getElementById("name");
    let lastName =document.getElementById("lastName");
    //console.log(email);
    //console.log(password)
    getInitials(name, lastName)
    createUserJson(email, password, name, lastName);
    setArray("user", users);
    console.log(tasks);

    clear();

    setTimeout(()=> {
        window .location.href = "login.html?msg=Thank you for registering";
    }, 1000);
    //window.location.href ="login.html";
                
}

function getInitials(name, lastName){
    let fullName = name.value + ' ' + lastName.value
    const words = fullName.split(" "); // split the string into an array of words
    const firstLetters = words.map(word => word.charAt(0)); // extract the first letter of each word
    const capitalizedLetters = firstLetters.map(letter => letter.toUpperCase()); // capitalize each letter
    return initials = capitalizedLetters.join(""); // join the letters into a string
    //console.log(initials);
}

function createUserJson(email, password, name, lastName){
    users.push({email: email.value, 
        password: password.value, 
        name: name.value, lastName: 
        lastName.value, 
        initials: initials,
        img: './img/avatar.png'});
}



function clear(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function setArray(key, array) {
    backend.setItem(key, JSON.stringify(array));
  }