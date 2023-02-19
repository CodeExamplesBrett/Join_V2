UserFirstIntitial = [];
allUsers = [];

async function getContacts(){
    await init();
    //calcValues(); 
}


function showContacts(){
    //push first letter of first name into array "UserFirstIntitial"
    //push full name in array "allUsers"
    for (let i = 0; i < users.length; i++) {
        let userFirstLetter = users[i].name.charAt(0);
        UserFirstIntitial.push(userFirstLetter);
        allUsers.push(users[i].name + ' ' + users[i].lastName);
    }
    //sort arrays + filter first letter array for unique first letters
    UserFirstIntitial.sort();
    allUsers.sort();
    console.log(allUsers)
    let uniqueLetters = UserFirstIntitial.filter((letter, i) => UserFirstIntitial.indexOf(letter) === i);
    console.log(uniqueLetters);



    //Create divs for users with first letter as id -- add heading letter
    
    for (let i = 0; i < uniqueLetters.length; i++) {
        let displayLetter = uniqueLetters[i];
        document.getElementById("contacts-container").innerHTML += /*html*/ `
        <div class="alphabet-Letter">
            <div class="letter"><h2>${displayLetter}</h2></div>
            <div id="${displayLetter}"></div> 
        </div>
            `;    
    }

    //If first letter of username is equal to the unique Letter put that user in the corresponding div
    for (let i = 0; i < allUsers.length; i++) {
        let fullName = allUsers[i];
        let userLetter = allUsers[i].charAt(0);
        for (let j = 0; j < uniqueLetters.length; j++) {
            const uniqueLetter = uniqueLetters[j];
            if(userLetter == uniqueLetter){
                document.getElementById(`${uniqueLetter}`).innerHTML += /*html*/ `
                <div>${fullName}</div>`
            }
            
        }
        
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
    
