// provides a simple local abstraction of a file
// will eventually be able to write to the server
// or wherever
// I don't care
// die
File = Wide.factory("File", function() {

	var File = function(data) {
		angular.extend(this, {
			// everything goes here
			contents : "",
			name : "",

			setName : function(name) {
				this.name = name;
			},

			getName : function() {
				return this.name;
			},

			setContents : function(contents) {
				this.contents = contents;
			},

			getContents : function() {
				return this.contents;
			}

		});
		angular.extend(this, data);
	}

	return File;
});

Tab = Wide.factory("Tab", function(FileService) {

	var Tab = function(data) {
		angular.extend(this, {

			title : "Untitled",
			file_id : FileService.getFile()

		});
		angular.extend(this, data);
	}

	return Tab;
});