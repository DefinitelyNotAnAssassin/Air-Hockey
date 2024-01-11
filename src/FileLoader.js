    
    var fs = require("fs");					// file system

    var login = fs.readFileSync(__dirname + "/../client/login.html");
    var register = fs.readFileSync(__dirname + "/../client/register.html");
    var game = fs.readFileSync(__dirname + "/../client/game.html");
    var lobby = fs.readFileSync(__dirname + "/../client/lobby.html");
    var backgroundImg = fs.readFileSync(__dirname + "/../media/light_background.jpg");
    var userPaddleImg = fs.readFileSync(__dirname + "/../media/userPaddle.png");
    var enemyPaddleImg = fs.readFileSync(__dirname + "/../media/enemyPaddle.png");
    var puckImg = fs.readFileSync(__dirname + "/../media/puck.png");
    var gamejs = fs.readFileSync(__dirname + "/../static/js/game.js");
    var gamecss = fs.readFileSync(__dirname + "/../static/css/game.css");
    var game_controllerjs = fs.readFileSync(__dirname + "/../static/js/game_controller.js");
    var loginjs = fs.readFileSync(__dirname + "/../static/js/login.js");
    var registerjs = fs.readFileSync(__dirname + "/../static/js/register.js");
    var lobbyjs = fs.readFileSync(__dirname + "/../static/js/lobby.js");
    module.exports = {
        login,
        register,
        game,
        lobby,
        backgroundImg,
        userPaddleImg,
        enemyPaddleImg,
        puckImg,
        gamejs,
        gamecss,
        game_controllerjs,
        loginjs,
        registerjs, 
        lobbyjs
    };
