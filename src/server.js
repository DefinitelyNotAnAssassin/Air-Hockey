// REQUIRES
// Load in web and file system requires, and socket.io
var http = require("http");				// web server
var socketio = require("socket.io");	// socket.io
var router = require("./router.js");
var GameManager = require("./GameManager.js"); // loads in GameManager class
var mysql = require('mysql');
// Attempt to use Node"s global port, otherwise use 3000
var PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// MySQL configuration
var dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'airhockey'
};



// session[name]  = name 


// request.user 

// ?


// Create a MySQL connection pool
var pool = mysql.createPool(dbConfig);

// The current room number to create - increments when a new match is created
var curRoomNum = 1;



// Start server
var app = http.createServer(router).listen(PORT);
console.log("HTTP server started, listening on port " + PORT);


// WEBSOCKETS
// Pass the http server into socketio and save the returned websocket server
var io = socketio(app);

// Object which stores all connected users
var users = {};

// Array which stores users currently waiting for a connection
// If it has >1 users in, a new game room is created
var userQueue = [];

// A list of all of our GameManagers - the games currently running
var currentGames = [];

var availableGames = [];

var usersByLocation = {};

/* createGame
	desc: creates a new game from the first two users in the queue
*/
function createGame(location, userQueue) {
    var roomName = "room" + curRoomNum;
    ++curRoomNum;

    var userQueue = usersByLocation[location];
    userQueue[0].roomName = roomName;
    userQueue[1].roomName = roomName;
    userQueue[0].join(roomName);
    userQueue[1].join(roomName);

    // delete from availableGames 
    if (availableGames.includes(location)) {
        availableGames.splice(availableGames.indexOf(location), 1);
    }

    var newGame = new GameManager(roomName, io, userQueue[0], userQueue[1]);
    currentGames.push(newGame);

    // Remove the users from the userQueue
    userQueue.splice(0, 2);
}

/* cleanGames
	desc: checks games to find finished ones and clear them out
*/
function cleanGames() {
	for (var i = 0; i < currentGames.length; ++i) {
		// grab current one
		var curr = currentGames[i];
		
		// delete the game from the list if its complete
		// just to save memory so old games don't linger in the list
		if (curr.gameComplete) {
			currentGames.splice(currentGames.indexOf(curr), 1);
		}
	}
}


// Handle the 'register' event from the client
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for the 'register' event
    socket.on('register', (data) => {
        const { username, password } = data;

        // Perform registration logic (e.g., insert user into the database)
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        pool.query(query, [username, password], (error, results) => {
            if (error) {
                console.error('Error registering user:', error);
                socket.emit('registrationResult', { msg: 'Registration failed. Please try again.' });
            } else {
                console.log('User registered successfully');
                socket.emit('registerResult', { msg: 'success' });
            }
        });
    });

	


socket.on('login', function(data) {
    authenticateUser(data.username, data.password, function(err, isValid) {
        if (err) {
            socket.emit('loginResult', { msg: 'Error while authenticating user.' });
            return;
        }

        if (!isValid) {
            socket.emit('loginResult', { msg: 'Invalid username or password. Please try again.' });
            return;
        }
        else { 
            socket.emit('loginResult', { msg: 'success' });
            return;
        }
    });
});

socket.on('getGames', function(data) {
    socket.emit('getGamesResult', { games: availableGames });
    
});

socket.on('join', function(data) {
    // Retrieve username and location from the client
    var username = data.username;
    var location = data.location;
    // push to availableGames 
    if (!availableGames.includes(location)) {
        availableGames.push({
            location: location,
            user: username
        });
        io.emit('getGamesResult', { games: availableGames });
    }
    

    // Continue with the rest of your code if authentication is successful
    socket.name = username;
    socket.location = location;
    users[username] = socket.name;

    // Add the user to the userQueue for their location
    if (!usersByLocation[location]) {
        usersByLocation[location] = [];
    }

    // Check if the user is already in the userQueue for this location
    if (!usersByLocation[location].some(user => user.username === username)) {
        usersByLocation[location].push(socket)

    } 
    console.log('User ' + username + ' joined location ' + location)
    socket.emit('msg', { msg: 'Waiting for oponent...' });
    socket.emit('joinSuccess');

    // If there are at least two users in the userQueue for this location, create a game
    if (usersByLocation[location].length >= 2) {
        createGame(location, usersByLocation[location]);
        io.emit('startgame')
    }
});





// listen for disconnect events
socket.on('disconnect', function() {
    // Retrieve the location associated with the disconnected user
    var location = socket.location;
    console.log('User ' + socket.name + ' disconnected from location ' + location);
    console.log(availableGames)
    // Remove the location from the availableGames array
    var index = availableGames.findIndex(game => game.location === location);
    if (index !== -1) {
        console.log('Removing location ' + location + ' from availableGames')
        availableGames.splice(index, 1);
    }
    usersByLocation[location] = []

    // Emit the updated availableGames array to all connected clients
    io.emit('getGamesResult', { games: availableGames });
});



    // Function to authenticate a user against the database
    function authenticateUser(username, password, callback) {
        pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, results) {
            if (err) {
                console.error('Error during authentication:', err);
                callback(err, false);
            } else {
                // Check if any rows were returned (authentication successful)
                callback(null, results.length > 0);
            }
        });
    }
});

//onJoined(socket);
//onDisconnect(socket);

// Pass any new connections to our handler delegates
//io.sockets.on("connection", function(socket) {
	
	
//});

console.log("Websocket server started");

// start a loop to clear empty games
setInterval(cleanGames, 1000);