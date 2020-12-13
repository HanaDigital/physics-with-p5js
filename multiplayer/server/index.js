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

io.on("connection", (socket) => {
	socket.on("pos", (data) => {
		console.log("Client", socket.id, "is at x:", data.x, "and y:", data.y);
		io.sockets.emit("pos", { ...data, uid: socket.id });
	});
});
