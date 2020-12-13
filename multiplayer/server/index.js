const express = require("express");
const socket = require("socket.io");

// App setup
const app = express();
const server = app.listen(4200, () => {
	console.log("Listening to requests on port 4200.");
});

// Static files
app.use(express.static("../client"));

// Socket setup
const io = socket(server, {
	cors: {
		origin: "*",
	},
});

let players = [];

io.on("connection", (socket) => {
	console.log("Client", socket.id, "has connected.");
	players.push({ uid: socket.id, x: 0, y: 0, dead: false });
	console.log("Total players:", players.length);

	socket.on("pos", (data) => {
		for (player of players) {
			if (player.uid == socket.id) {
				player.x = data.x;
				player.y = data.y;
				break;
			}
		}
		io.sockets.emit("pos", players);
	});

	socket.on("disconnect", () => {
		console.log("Client", socket.id, "has disconnected.");
		for (player of players) {
			if (player.uid == socket.id) {
				player.dead = true;
			}
		}
		console.log(players);
		console.log("Total players:", players.length);
		io.sockets.emit("pos", players);
	});
});
