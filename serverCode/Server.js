let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let auth = require('basic-auth');
var _ = require('lodash');
var fs = require("fs");
var https = require("https");

let websockets = require('ws');

const alt = express()
alt.use(express.static(__dirname + '/WebsiteCode/web-build'))
const server = https.createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    alt
  )
const wss = new websockets.WebSocketServer({ server });

const players = [];


wss.on('connection', function connection(ws) {
    ws.on('message', function(msg) {
        handleClientMessage(ws, msg);
    });

    ws.on('close', function(ws){
        console.log('closing socket')
        players.filter(player => player.websocket && player.websocket.readyState !== 3)
    })
});

server.listen(443);

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


function handleClientMessage(ws, msg){
    //console.log(msg)
    let json = JSON.parse(msg);
    switch (json.type) {
        case 'register':
            console.log('new player added ' + json.name);
            players.push({name : json.name, websocket : ws, image : json.image, points: 0})  
            
            sendDetailsToPlayers({type : 'newPlayer', players : players});
            break;

        case 'deletePlayer':
                players.filter(player => player.name !== json.name)
                sendDetailsToPlayers({type : 'deletePlayer', players : players} );
            break;

        default:
            console.log('Default')
            console.log(json)
    }
}

function sendDetailsToPlayers(msg){
    const activePlayers = players
                        .filter(player => player.websocket !== null 
                                && player.websocket.readyState !== 3 )
                        .map(player => player.websocket)
                            
    msg = JSON.stringify(msg);
    for(var player in activePlayers){
        if(activePlayers[player]){
            activePlayers[player].send(msg);
        }
    }
}