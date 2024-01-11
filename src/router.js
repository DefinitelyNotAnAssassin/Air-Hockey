// REQUIRES
var fs = require("fs");					// file system

// Read the requires client files into memory
var login = fs.readFileSync(__dirname + "/../client/login.html");
var register = fs.readFileSync(__dirname + "/../client/register.html");
var game = fs.readFileSync(__dirname + "/../client/game.html");
var lobby = fs.readFileSync(__dirname + "/../client/lobby.html");
var backgroundImg = fs.readFileSync(__dirname + "/../media/light_background.jpg");
var userPaddleImg = fs.readFileSync(__dirname + "/../media/userPaddle.png");
var enemyPaddleImg = fs.readFileSync(__dirname + "/../media/enemyPaddle.png");
var puckImg = fs.readFileSync(__dirname + "/../media/puck.png");

// Determines how to route users - only accept GET requests for now
var router = function(request, response) {
	// if they ask for the root, prepare and write the index page to the header

	if (request.url.match(/^\/game\//)) {
        response.writeHead(200, {"Content-Type": "text/html"});	
        response.write(game);
    }


	switch (request.url) {
	
		case '/':
			response.writeHead(200, {"Content-Type": "text/html"});	
			response.write(login);
			break;


		case '/register':
			response.writeHead(200, {"Content-Type": "text/html"});	
			response.write(register);
			break;


		case '/lobby':
			response.writeHead(200, {"Content-Type": "text/html"});	
			response.write(lobby);
			break;

		case '/favicon.ico':
			break;
		case '/media/background.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(backgroundImg);
			break;
		case '/media/userPaddle.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(userPaddleImg);
			break;
		case '/media/enemyPaddle.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(enemyPaddleImg);
			break;
		case '/media/puck.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(puckImg);
			break;
	}
	
	// close the response stream
	response.end();
};

// Export the main router as a public function
module.exports = router;