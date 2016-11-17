var viewList = [
	//'chart',
	//'preload',
	'table',
	//'index',
	//'login',
	//'lockscreen',
	//'search',
	//'searchFeedback',
	//'PaperPara',
	//'demo',
	//'datainterface'
];

var taskList = {};

viewList.map(function(item) {
	taskList[item] = require('./view/' + item + '.js');
});

module.exports = taskList;