function gameStep() {
	if (isPaused) return false;

	step++;

	impCells = [];

	for (const cellID of aliveCells) {
		const i = parseInt(cellID);
		const score = cellLogic(i, true);
		if (score < 2 || score > 3) turnDead.push(i);
	}

	for (const cellID of impCells) {
		const i = parseInt(cellID);
		const score = cellLogic(i, false);
		if (score == 3) turnAlive.push(i);
	}

	turnAliveLogic();
	turnDeadLogic();
}

function turnAliveLogic() {
	for (cellID of turnAlive) {
		document.getElementById("c" + cellID).classList.add("alive");
		aliveCells.push(cellID);
	}
	turnAlive = [];
}

function turnDeadLogic() {
	for (cellID of turnDead) {
		document.getElementById("c" + cellID).classList.remove("alive");
		aliveCells = aliveCells.filter((cell) => parseInt(cell) != cellID);
	}
	turnDead = [];
}

function cellLogic(i, isAlive) {
	const north = isNorth(i);
	const west = isWest(i);
	const east = isEast(i);
	const south = isSouth(i);

	let score = 0;

	if (north) {
		var NN = i - cellsPerRow;
		if (checkIsAlive(NN)) score++;
		else if (isAlive && checkIsImp(NN)) impCells.push(NN);

		if (west) {
			var NW = i - cellsPerRow - 1;
			if (checkIsAlive(NW)) score++;
			else if (isAlive && checkIsImp(NW)) impCells.push(NW);
		}
		if (east) {
			var NE = i - cellsPerRow + 1;
			if (checkIsAlive(NE)) score++;
			else if (isAlive && checkIsImp(NE)) impCells.push(NE);
		}
	}

	if (west) {
		var W = i - 1;
		if (checkIsAlive(W)) score++;
		else if (isAlive && checkIsImp(W)) impCells.push(W);
	}
	if (east) {
		var E = i + 1;
		if (checkIsAlive(E)) score++;
		else if (isAlive && checkIsImp(E)) impCells.push(E);
	}

	if (south) {
		var SS = i + cellsPerRow;
		if (checkIsAlive(SS)) score++;
		else if (isAlive && checkIsImp(SS)) impCells.push(SS);

		if (west) {
			var SW = i + cellsPerRow - 1;
			if (checkIsAlive(SW)) score++;
			else if (isAlive && checkIsImp(SW)) impCells.push(SW);
		}
		if (east) {
			var SE = i + cellsPerRow + 1;
			if (checkIsAlive(SE)) score++;
			else if (isAlive && checkIsImp(SE)) impCells.push(SE);
		}
	}

	return score;
}

function checkIsAlive(i) {
	for (cellID of aliveCells) {
		if (cellID == i) return true;
	}
	return false;
}

function checkIsImp(i) {
	for (cellID of impCells) {
		if (cellID == i) return false;
	}
	return true;
}

function isNorth(i) {
	return i - cellsPerRow >= 0;
}

function isWest(i) {
	return i % cellsPerRow != 0;
}

function isEast(i) {
	return (i + 1) % cellsPerRow != 0;
}

function isSouth(i) {
	return i + cellsPerRow < cellsPerRow * cellsPerRow;
}
