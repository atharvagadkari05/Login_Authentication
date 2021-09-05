// REGISTER

async  function registerUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/register', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username,password
        })
    }).then(res=>res,json())

    console.log(result);

}


//LOGIN


async  function LoginUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/login', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username,password
        })
    }).then(res=>res,json())

    console.log(result);

}