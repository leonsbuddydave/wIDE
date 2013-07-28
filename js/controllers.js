MainController = Wide.controller("MainController", function($scope, Keyboard) {

	Keyboard.bind({
		keyCode : 13,
		ctrl : true
	}, function() {
		console.log("CONTROL ENTER NIGGA");
	});

});