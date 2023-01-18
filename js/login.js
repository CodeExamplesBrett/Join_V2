function login(event){
    // function to prevent the default function of form being carried out
event.preventDefault();
let email =document.getElementById("email");
let password =document.getElementById("password");

let user = users.find( u => u.email == email.value && u.password == password.value);
console.log(user)
if(user) {
    console.log('user found')
    setTimeout(function () {
        window.location.href = "addtask.html";
    }, 1000)

} else {
    console.log('user name or password invalid')
}



//console.log(email);
//console.log(password)
//clear();
//window.location.href            
}

function loginSuccess(){
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

if(msg){
    msgBox.innerHTML= msg;
} else {
    msgBox.innerHTML= ''
}

}