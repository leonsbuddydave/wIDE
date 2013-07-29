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

	$scope.Tabs = [{
		name : "Butt"
	},{
		name : "Fish"
	}];

});

TabController = Wide.controller("TabController", function($scope) {



});

CanvasEditorController = Wide.controller("CanvasEditorController", function($scope) {

	var isActive = true;
	var FPS = 60;
	var lastTime = 0;

	$scope.Update = function() {

		if (!isActive)
			return;

		var newTime = new Date().getTime();
		var dt = newTime - lastTime;

		/* DO SOME REAL SHIT */

		// FULL CIRCLE
		lastTime = newTime;
	}

	$scope.Render = function() {

	}

	$scope.Start = function() {
		lastTime = new Date().getTime();
		setInterval($scope.Update, 1000 / FPS);
	}

	$scope.Start();
});