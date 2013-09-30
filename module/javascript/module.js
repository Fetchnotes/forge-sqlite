// Expose the native API to javascript
forge.sqlite = {
    showAlert: function (text, success, error) {
        forge.internal.call('sqlite.showAlert', {text: text}, success, error);
    }
};

// Register for our native event
forge.internal.addEventListener("sqlite.resume", function () {
	alert("Welcome back!");
});
