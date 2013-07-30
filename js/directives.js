Wide.directive("canvas", function(Preferences) {
	return {

		restrict : "E",
		controller : function($scope, $element, $attrs) {

			var isActive = true;
			var FPS = 60;
			var lastTime = 0;

			var context = $element[0].getContext('2d');
			var width = height = 0;

			$scope.Update = function() {

				if (!isActive)
					return;

				var newTime = new Date().getTime();
				var dt = newTime - lastTime;

				// DO SOME REAL SHIT

				// console.log(dt);

				// STOP DOING REAL SHIT

				// RENDER IT ALL OUT
				$scope.Render();

				// FULL CIRCLE 420
				lastTime = newTime;
			}

			$scope.Render = function() {

				context.fillStyle = Preferences.colors.background;

				context.fillRect(0, 0, width, height);

			}

			$scope.Start = function() {
				$scope.Resize();

				lastTime = new Date().getTime();
				setInterval($scope.Update, 1000 / FPS);
			}

			$scope.Resize = function(e) {
				width = $element.width();
				height = $element.height();

				$element.attr("width", width);
				$element.attr("height", height);
			}

			$( window ).resize(function(e) {
				$scope.Resize.call($scope, e);
			});

			$( document ).ready(function() {
				$scope.Start();
			});
		}

	};
});