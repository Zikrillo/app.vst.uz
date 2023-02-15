const enter = document.getElementById("enter");
const login = document.querySelector(".login");
const password = document.querySelector(".password");
const login1 = document.querySelectorAll(".login")[1];
const password1 = document.querySelectorAll(".password")[1];
const auth = document.querySelector("#auth");
const reg = document.querySelector("#reg");
const authBlock = document.querySelectorAll(".auth");
const registrate = document.getElementById("registrate");
const password2 = document.querySelector(".passwordrepeat"); 
const url = "http://app.vst.uz";
auth.onclick = () => {
    authBlock[0].classList.toggle("dnone");
    authBlock[1].classList.toggle("dnone");
}
reg.onclick = () => {
    authBlock[0].classList.toggle("dnone");
    authBlock[1].classList.toggle("dnone");
}

enter.onclick = () => {
    fetch('auth.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password: password.value,
            login: login.value
        })
        
    }).then(response => response.text())
    .then(data => {
        if(data.split(" ")[0] === "1"){
            localStorage.setItem("login", login.value);
            localStorage.setItem("pass", password.value);
            window.location.replace(url);
        }else if(data.split(" ")[0] === "0"){
            alert("Данные не совпадают!")
        }
    });
}
registrate.onclick = () => {
    if(password1.value === password2.value)
    fetch('reg.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            password: password1.value,
            login: login1.value
        })
        
    }).then(response => response.text())
    .then(data => {
        if(data.split(" ")[0] === "1"){
            localStorage.setItem("login", login1.value);
            localStorage.setItem("pass", password1.value);
            window.location.replace(url);
        }
    });
    else{
        alert("Пароли не совподает!");
    }
}
