function login(event){
    // function to prevent the default function of form being carried out
event.preventDefault();
let email =document.getElementById("email");
let password =document.getElementById("password");
verifyLogin(email, password);

//console.log(email);
//console.log(password)
//clear();
//window.location.href            
}

function guestLogin(){
    let email = 'guest@guestemail.com';
    let password = '0000'
    verifyLogin(email, password);
}

function verifyLogin(email, password){
    let user = users.find( u => u.email == email.value && u.password == password.value);
console.log(user)
if(user) {
    console.log('user found');
    clearForm();
    setTimeout(function () {
        window.location.href = "addtask.html";
    }, 1000)

} else {
    console.log('user name or password invalid')
}
}


function clearForm(){
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

/*function loginSuccess(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

if(msg){
    msgBox.innerHTML= msg;
} else {
    msgBox.innerHTML= ''
}

}  */