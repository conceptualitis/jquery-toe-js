(function (w, $) {
	"use strict";

	var goodStyles = "color: #fff; background: #368A35;";
	var badStyles = "color: #fff; background: #730000;";

	if (undefined === w.toe) {
		console.log("%cgenerating toe global object", goodStyles);

		var toe = {
			mode: "success",
			init: function (settings) {
				console.log("%cinitializing toe in [" + settings.mode + "] mode with " + Object.keys(settings.stubs).length + " stub(s).", goodStyles);

				var that = this;
				that.mode = settings.mode;
				that.stubs = settings.stubs;

				$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
					if (undefined === that.stubs[options.url]) {
						return;
					}
					if (undefined === that.stubs[options.url].data) {
						console.log("%c!!! the toe stub of " + options.url + " has no data associated with it!", badStyles);

						return;
					}
					if (undefined === that.stubs[options.url].data[that.mode]) {
						console.log("%c!!! the toe data for the stub of " + options.url + " has nothing defined for the mode " + that.mode, badStyles);

						return;
					}

					console.log("%ctoe stubbing with:", goodStyles);
					console.log(that.stubs[options.url].data[that.mode]);

					options.success(that.stubs[options.url].data[that.mode]);
					jqXHR.abort();
				});
			},
			setMode: function (mode) {
				console.log("%csetting toe's mode to " + mode, goodStyles);

				this.mode = mode;
			}
		};

		w.toe = toe;
	} else {
		console.log("%c!!! the toe global object has already been generated, have you included the file twice?", badStyles);
	}
})(window, jQuery);