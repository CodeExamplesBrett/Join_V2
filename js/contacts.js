UserFirstIntitial = [];

//source refers to the place where the contact list will be displayed e.g the the id for innerHTML
// either for contacts page or select user in add task
async function getContacts(source){
    await init();
    //calcValues(); 
    showContacts(source);
}


function showContacts(source){
    clearContacts(source);
    //push first letter of first name into array "UserFirstIntitial"
    //push full name in array "allUsers"
    for (let i = 0; i < users.length; i++) {
        let userFirstLetter = users[i].name.charAt(0);
        UserFirstIntitial.push(userFirstLetter);
    }
    sortArray(source);  
}


function sortArray(source){
    //sort array + filter first letter array for unique first letters
    UserFirstIntitial.sort();
    let uniqueLetters = UserFirstIntitial.filter((letter, i) => UserFirstIntitial.indexOf(letter) === i);
    console.log(uniqueLetters);
    createAlphabetletters(uniqueLetters, source);
}


function createAlphabetletters(uniqueLetters, source){
       //Create divs for users with first letter as id -- add heading letter
    
       for (let i = 0; i < uniqueLetters.length; i++) {
        let displayLetter = uniqueLetters[i];
        //here source either 'contacts-container' or 'user-container'
        document.getElementById(source).innerHTML += /*html*/ `
        <div class="alphabet-Letter alphabet-letter-add-task">
            <div class="letter"><h2>${displayLetter}</h2></div>
            <div class="border-bottom"></div>
            <div class="displayLetter" id="${displayLetter}"></div> 
            
        </div>
            `;    
    }
    pushUserToLetter(uniqueLetters, source);
}



//If first letter of username is equal to the unique Letter put that user in the corresponding div
function pushUserToLetter(uniqueLetters, source){
    for (let i = 0; i < users.length; i++) {
        let fullName = users[i].name + ' ' + users[i].lastName;
        let initials = users[i].initials;
        let email = users[i].email;
        let phone = users[i].phone;
        let colorId = users[i].id % 10;
        let userLetter = users[i].name.charAt(0);
        for (let j = 0; j < uniqueLetters.length; j++) {
            const uniqueLetter = uniqueLetters[j];
            if(userLetter == uniqueLetter){
                if(source == "contacts-container"){
                    // user list content for contacts page ... (different functions to add Task page)
                    document.getElementById(`${uniqueLetter}`).innerHTML += /*html*/ `
                    <div id="name-index-${i}" class="contact-details" onclick="showFullDetails('${i}','${fullName}', '${initials}','${email}', '${phone}', '${colorId}' )">
                        <div style="background-color:var(--color-${colorId})" class="avatar"><p class="initial-text">${initials}</p></div>
                        <div class="full-name">${fullName}</div>
                    </div>
                    `} else if (source == "user-container"){
                        // user list content for add Task page ... (different functions to contacts page )
                        document.getElementById(`${uniqueLetter}`).innerHTML += /*html*/ `
                        <div id="name-index-${i}" class="contact-details"  onclick="addUser(${i})">
                            <div style="background-color:var(--color-${colorId})" class="avatar"><p class="initial-text">${initials}</p></div>
                            <div class="full-name">${fullName}</div>
                            <!-- div for check symbol -->
                        <div id="checked_${i}"></div>
                        </div>
                        `
                    }
                
            }
            
        }
        
    }
    
}

function showFullDetails(nameID, fullName, initials, email, phone, colorId){
    clearFullDetails();
    toggleSelectionBackground(nameID);
    
    document.getElementById("contact-full-details").innerHTML = /*html*/`
    <div class="name-title">
        <div style="background-color:var(--color-${colorId})" class="avatar avatar-large"><p class="initial-text initial-text-large">${initials}</p></div>
        <div class="full-name-detail">${fullName}</div>
    </div>
    <div class="info-heading">
        <span>Contact Information</span>
    </div>
    <div class="detail-div">
        <span class="detail-headings">Email</span>
        <span class="detail-email">${email}</span>
    </div>
    <div class="detail-div">
        <span class="detail-headings">Phone</span>
        <span class="detail-phone">${phone}</span>
    </div>
    `
}


function toggleSelectionBackground(nameID){
    for (let n = 0; n < users.length; n++) {
        document.getElementById("name-index-" + n).classList.remove("blue-background");
    }
    document.getElementById("name-index-" + nameID).classList.add("blue-background");
}


function clearFullDetails(){
    document.getElementById("contact-full-details").innerHTML = ""
}


function clearContacts(source){
    document.getElementById(source).innerHTML = ""
}
    

function addContact() {
    let email =document.getElementById("email");
    let password =document.getElementById("password");
    let name =document.getElementById("firstName");
    let lastName =document.getElementById("lastName");
    let phone =document.getElementById("phone");
    //console.log(email);
    //console.log(password)
    checkId();
    getInitials(name, lastName);
    makeUserJson(email, phone, password, name, lastName);

    setArray("user", users);
    console.log(tasks);

    clear(); 
    hideAddNewContactDialog();              
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

function showAddNewContactDialog(){
    document.getElementById("bg-grey").classList.remove("dnone")
}

function hideAddNewContactDialog(){
    clear();
    document.getElementById("bg-grey").classList.add("dnone")
}

function getInitials(name, lastName){
    let fullName = name.value + ' ' + lastName.value
    const words = fullName.split(" "); // split the string into an array of words
    const firstLetters = words.map(word => word.charAt(0)); // extract the first letter of each word
    const capitalizedLetters = firstLetters.map(letter => letter.toUpperCase()); // capitalize each letter
    return initials = capitalizedLetters.join(""); // join the letters into a string
    //console.log(initials);
}

function makeUserJson(email, phone, password, name, lastName){
    users.push({
        email: email.value, 
        phone: phone.value, 
        password: password.value, 
        name: name.value, 
        lastName: lastName.value,
        initials: initials, 
        img: './img/avatar.png',
        id: setID});
}

function clear(){
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("password").value = "";
}

function setArray(key, array) {
    backend.setItem(key, JSON.stringify(array));
  }
    
