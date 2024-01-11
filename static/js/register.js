function validateForm(e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || password == "") {
        alert("Please fill out all fields");
        return false;
    }
    else {
        var socket = io.connect();
        socket.emit('register', {username: username, password: password});
        e.preventDefault()

        socket.on('registerResult', function(data) {
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