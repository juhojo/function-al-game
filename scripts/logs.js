const onLoadLog = () => {
	log('Hey!', 'To begin type help()');
}

const help = () => {
  const moveLog = (dir) => `moves item ${dir} if it is possible to move.`;
	log('%cAll available commands.', DESC_STYLE);
	log('%cList of available commands:', TITLE_STYLE);
	log('%cGeneral commands:', BOLD_STYLE);
	logMany(
		'- help() prints all available commands.',
		'- goal() prints the goal of the game.',
		'- examples() prints a few examples on how to use move commands.',
    '- list() prints the names of all levels to choose from.',
	);
	log('%cLevel commands:', BOLD_STYLE);
	logMany(
		'- restart() restarts level.',
    '- load(name) load a level. Name of a level can be for instance "example".',
	);
	log('%cMove commands:', BOLD_STYLE);
	logMany(
		`- moveRight(item) ${moveLog('right')}`,
		`- moveLeft(item) ${moveLog('left')}`,
		`- moveDown(item) ${moveLog('down')}`,
		`- moveUp(item) ${moveLog('up')}`,
    '- loop(fn, n, item (optional)) repeats a function, n times on Object item (optional). See examples() for more details.',
	);
	return END_COMMAND;
}

const goal = () => {
	log('%cGoal of the game:', DESC_STYLE);
	log(
		'Write a function call that turns all the grey blocks into green ones.',
	);
	return END_COMMAND;
};

const examples = () => {
	log('%cExamples:', BOLD_STYLE);
  logMany(
    '1. moveRight(item) move item right once.',
    '3. loop(moveRight, 3, item) move item right three times.',
    '4. loop(() => { loop(moveRight, 3, item); moveDown(item); }, 2) move item right three times then move down once and then repeat everything once more.',
  );
	return END_COMMAND;
};

const list = () => {
	log('%cList of levels:', BOLD_STYLE);
  logMany(...levels.map(level => level.name));
	return END_COMMAND;
}
