function validateForm(e) {
    e.preventDefault();
    var username = document.forms["form"]["username"].value;
    var password = document.forms["form"]["password"].value;
    if (username == "" || password == "") {
        alert("Please fill out all fields");
        return false;
    }
    else {
        var socket = io.connect();
        socket.emit('login', {username: username, password: password});
        e.preventDefault()

        socket.on('loginResult', function(data) {
            if (data.msg == "success") {
                localStorage.setItem('username', username)
                window.location.href = "/lobby";
                
            }
            else {
               alert(data.msg)
            }
        })
    }
}