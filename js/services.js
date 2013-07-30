SPECIAL_KEYS = {
	SHIFT : 16,
	CTRL : 17,
	ALT : 18
}

/*
	EventDistributor - subscribe/publish event service
*/
EventDistributor = Wide.service("EventDistributor", function() {

	var eventCache = {};

	this.subscribe = function(topic, callback) {

		if (typeof eventCache[topic] === "undefined") {
			eventCache[topic] = [];
		}

		eventCache[topic].push(callback);
	}

	this.publish = function(topic, args) {
		console.log(topic);
		$.each(eventCache, function(i, e) {
			if (i === topic && typeof e !== 'undefined')
			{
				$.each(e, function(ii, ee) {
					if (typeof e !== 'undefined')
						ee();
				});
			}
				
		});
	}

	this.unsubscribe = function(topic) {
		// man I don't know dude what
		// fuck off mate
	}

	this.dumpEventCacheToConsole = function() {
		console.log(eventCache);
	}

});

/*
	Keyboard - service for easy bind and response to
	advanced keyboard shortcuts and events
*/
Keyboard = Wide.service("Keyboard", function(EventDistributor) {

	var s = {

		blockExceptions : [
			"shift=true,ctrl=true,alt=false,keyCode=74",
			"shift=false,ctrl=false,alt=false,keyCode=116",
			"shift=false,ctrl=true,alt=false,keyCode=116"
		],

		keyState : {
			shift : false,
			ctrl : false,
			alt : false,
			keyCode : -1
		},

		bind : function(bindData, callback) {
			bindData = $.extend({
				shift : false,
				ctrl : false,
				alt : false,
				keyCode : -1
			}, bindData);

			var ev = this.convertBindingToEventString(bindData);

			EventDistributor.subscribe(ev, callback);

			// EventDistributor.dumpEventCacheToConsole();
		},

		convertBindingToEventString : function(bindData) {
			var eventString = "";

			// compile this shit
			$.each(bindData, function(i, e) {
				eventString += i + "=" + e + ",";
			});

			// trim trailing comma because I'm
			// fastidious and otherwise it looks stupid
			// this is literally pointless though
			eventString = eventString.substring(0, eventString.length - 1);

			return eventString;
		},

		// converts an event string back to a bind object
		// this isn't completely useful but it's nice
		// just to have it
		convertEventStringToBinding : function(eventString) {
			var bindData = {};

			$.each(eventString.split(','), function(i, e) {
				var sides = e.split('=');
				bindData[sides[0]] = sides[1];
			});

			return bindData;
		},

		keydown : function(e) {
			this.keyState.keyCode = e.which;
			
			this.overrideBrowserShortcuts(e);
			this.handleSpecialKeys(e);

			if ( !this.isSpecial(e.which) ) {
				EventDistributor.publish( this.convertBindingToEventString(this.keyState) );
			}

		},

		keyup : function(e) {
			this.overrideBrowserShortcuts(e);
			this.handleSpecialKeys(e);
		},

		handleSpecialKeys : function(e) {
			this.keyState.ctrl = e.ctrlKey;
			this.keyState.alt = e.altKey;
			this.keyState.shift = e.shiftKey;
		},

		overrideBrowserShortcuts : function(e) {
			// Will not work on:
			// Ctrl + W
			// Ctrl + N
			// Ctrl + T
			// and frankly probably shouldn't so...
			// woo
			var evString = this.convertBindingToEventString(this.keyState);

			console.log(this.keyState);

			if ($.inArray(evString, this.blockExceptions) !== -1) {
				// it's in the exceptions list,
				// let it through
				return;
			}
			else {
				// kill it where it stands
				e.stopPropagation();
				e.preventDefault();				
			}
		},

		isSpecial : function(keyCode) {
			switch (keyCode) {
				case SPECIAL_KEYS.SHIFT:
					return true;
				case SPECIAL_KEYS.CTRL:
					return true;
				case SPECIAL_KEYS.ALT:
					return true;
			}

			// ain't no special key yo
			return false;
		}

	};

	// Register some events to call back
	// to this service
	$(document).keydown(function(e) {
		s.keydown.call(s, e);
	});

	$(document).keyup(function(e) {
		s.keyup.call(s, e);
	});

	// I will stab your glassy dead eyes
	return s;
});

/*
	Preferences - loads and manages anything
	that might be customizable - including but
	not limited to:
		- Syntax Coloring
		- Keyboard Shortcuts
*/
Preferences = Wide.service("Preferences", function($http) {

	var o = {

		colors : {
			background : "#272822"
		}

	};

	return o;
});