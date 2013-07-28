MainController = Wide.controller("MainController", function($scope, Keyboard) {

	Keyboard.bind({
		keyCode : 13,
		ctrl : true
	}, function() {
		console.log("CONTROL ENTER NIGGA");
	});

});

PaneSetController = Wide.controller("PaneSetController", function($scope, Keyboard) {

	$scope.Panes = [{},{}];

});

PaneController = Wide.controller("PaneController", function($scope) {

	$scope.Tabs = [];

});