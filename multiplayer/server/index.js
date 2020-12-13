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
	players.push({ id: socket.id, x: 0, y: 0 });
	console.log("Total players:", players.length);

	socket.on("pos", (data) => {
		for (player of players) {
			if (player.id == socket.id) {
				player.x = data.x;
				player.y = data.y;
				break;
			}
		}
		io.sockets.emit("pos", players);
	});

	socket.on("disconnect", () => {
		console.log("Client", socket.id, "has disconnected.");
		players = players.filter((player) => player.id != socket.id);
		console.log("Remaining players:", players.length);
		io.sockets.emit("pos", players);
	});
});
