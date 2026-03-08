console.log("Login Functionality comming")

document.getElementById('signin-btn').addEventListener('click', function(){
    // 1. get the mobile number input
    const userInput = document.getElementById('input-user');
    const userName = userInput.value;
    console.log(userName)
    // 2. get the pin input
    const inputPin = document.getElementById('input-pin');
    const pin = inputPin.value;
    console.log(pin)
    // 3. match pin & number
    if(userName=="admin" && pin=="admin123"){
        // 3-1 true:::>> alert> homepage
        alert('login Success');
        // window.location.replace("/home.html")
        window.location.assign("home.html")
    }
    else{
        // 3-1 false:::>> alert> retrun
        alert('login faild');
        return
    }    
});