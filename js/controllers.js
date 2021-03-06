MainController = Wide.controller("MainController", function($scope, Keyboard) {

	Keyboard.bind({
		keyCode : 13,
		ctrl : true
	}, function() {
		console.log("CONTROL ENTER YO");
	});

});

PaneSetController = Wide.controller("PaneSetController", function($scope, Keyboard) {

	$scope.Panes = [{},{},{}];

	$scope.Focused = 0;

});

PaneController = Wide.controller("PaneController", function($scope, Tab, Keyboard, Preferences) {

	$scope.Tabs = [];

	// creates a new tab
	// takes an optional file id to open
	// an existing file
	$scope.NewTab = function(file_id) {
		if (typeof file_id !== 'string') {
			// no id, nope
			$scope.Tabs.push( new Tab() );			
		}
		else {
			// we'll have to load the file, fuck that for now
		}

		console.log($scope.Tabs);
	}

	Keyboard.bind(Preferences.keyboard_shortcuts.new_file, function() {
		$scope.$apply($scope.NewTab);
	});

});

TabController = Wide.controller("TabController", function($scope) {



});