const username = document.querySelector(".header__auth-username");
username.innerText = (localStorage.getItem("login") != null) ? localStorage.getItem("login") : "Гость";
const sendquery = {
    cityfrom: "Узбекистан, Ташкент",
    cityto: "Узбекистан, Ташкент",
    weight: 0,
    comments: ""
};
const dropdowns = document.querySelectorAll(".tocountry>p");

dropdowns.forEach(e => {
    e.addEventListener("click", () => {
        document.querySelectorAll(".dropbtn")[0].innerText = e.innerText;
        sendquery.cityto = e.innerText;
        console.log(sendquery);
    });
});
const dropdown2 = document.querySelectorAll(".fromcountry>p");

dropdown2.forEach(e => {
    e.addEventListener("click", () => {
        document.querySelectorAll(".dropbtn")[1].innerText = e.innerText;
        sendquery.cityfrom = e.innerText;
    });
});

const sendbutton = document.getElementById("send");
const mass = document.querySelector(".mass");
const comments = document.querySelector(".comment");

sendbutton.onclick = () => {
    if (mass.value != "") {
        sendquery.weight = mass.value;
        sendquery.comments = comments.value;
        fetch('order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    password: localStorage.getItem("pass"),
                    login: localStorage.getItem("login"),
                    cityfrom: sendquery.cityfrom,
                    cityto: sendquery.cityto,
                    weight: sendquery.weight,
                    comments: sendquery.comments
                })

            }).then(response => response.text())
            .then(data => {
                if(data == "1"){
                    alert("Успешно добавлено");
                }
                document.querySelector(".table").innerHTML = "";
                document.querySelector(".table").innerHTML = document.querySelector(".table").innerHTML + '<tr><td>№</td><td>Откуда</td><td>Куда</td><td>Масса</td><td>Время</td></tr>';
                fetch('orderlist.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        password: localStorage.getItem("pass"),
                        login: localStorage.getItem("login"),
                    })
                }).then((response1)=>response1.text()).then((data2)=>{
                    document.querySelector(".table").innerHTML = document.querySelector(".table").innerHTML+ data2;
                });          
            })
    } else {
        alert("Не указанна масса!");
    }
};
window.onload = ()=>{
    document.querySelector(".table").innerHTML = "";
                document.querySelector(".table").innerHTML = document.querySelector(".table").innerHTML + '<tr><td>№</td><td>Откуда</td><td>Куда</td><td>Масса</td><td>Время</td></tr>';
                fetch('orderlist.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        password: localStorage.getItem("pass"),
                        login: localStorage.getItem("login"),
                    })
                }).then((response1)=>response1.text()).then((data2)=>{
                    document.querySelector(".table").innerHTML = document.querySelector(".table").innerHTML+ data2;
                });    
}