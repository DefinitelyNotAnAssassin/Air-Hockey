const uuid = () => {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

const createLobby = document.getElementById("create_lobby")
createLobby.addEventListener("click", (e) => {
    e.preventDefault()
    const code = uuid()
    window.location.href = "/game/" + code

})

const lobby_code = document.getElementById("lobby_code")
const join_lobby = document.getElementById("join_lobby")

join_lobby.addEventListener("click", (e) => {
    e.preventDefault()
    const code = lobby_code.value
    window.location.href = "/game/" + code
})

const socket = io.connect(); 
socket.emit('getGames', {} )

socket.on('getGamesResult', function(data) {
    console.log(data)
    const availableGames = document.getElementById("availableGames") 
    // iterate through the available games and make it a href to /game/:code
    if (data.games.length == 0) {
        availableGames.innerHTML = "No available games"
    }
    else{
        availableGames.innerHTML = "Available Games: " 
    }
    for (let i = 0; i < data.games.length; i++) {
        const location = data.games[i].location
        const user = data.games[i].user
        const a = document.createElement("a")
        a.href = "/game/" + location
        a.innerHTML = user + ", "
        a.classList.add("text-blue-500", "hover:text-blue-700", "font-bold", "mr-2")
        availableGames.appendChild(a)
    }
})

