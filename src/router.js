
var FileLoader = require("./FileLoader.js"); // Read the requires client files into memory




// Determines how to route users - only accept GET requests for now
var router = function(request, response) {
	// if they ask for the root, prepare and write the index page to the header
	if (request.url.match(/^\/game\//)) {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(FileLoader.game);
	}

	switch (request.url) {
		case '/':
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(FileLoader.login);
			break;

		case '/register':
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(FileLoader.register);
			break;

		case '/lobby':
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(FileLoader.lobby);
			break;

		case '/favicon.ico':
			break;
		case '/media/background.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(FileLoader.backgroundImg);
			break;
		case '/media/userPaddle.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(FileLoader.userPaddleImg);
			break;
		case '/media/enemyPaddle.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(FileLoader.enemyPaddleImg);
			break;
		case '/media/puck.png':
			response.writeHead(200, {"Content-Type": "image/gif"});
			response.write(FileLoader.puckImg);
			break;

		case '/static/js/game.js':
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(FileLoader.gamejs);
			break;

		case '/static/css/game.css':
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(FileLoader.gamecss);
			break;

		case '/static/css/game_controller.js':
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(FileLoader.game_controllerjs);
			break;

		case '/static/js/login.js':
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(FileLoader.loginjs);
			break;

		case '/static/js/register.js':
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(FileLoader.registerjs);
			break;
		
		case '/static/js/lobby.js':
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(FileLoader.lobbyjs);
			break;
	}

	// close the response stream
	response.end();
};

// Export the main router as a public function
module.exports = router;