/**
 * 对Function 进行增强
 */
(function() {
	if (!Function.prototype.bind) {
		var slice = Array.prototype.slice,
		// To reduce overhead on call of the bound fn we have two flavors based on
		// whether we have args to prepend or not:
		bind = function(me) {
			var args = slice.call(arguments, 1), method = this;
			if (args.length) {
				return function() {
					//arguments 此时应该是Arguments[0]
					var t = arguments;
					// avoid the slice/concat if the caller does not supply args
					return method.apply(me, t.length ? args.concat(slice
							.call(t)) : args);
				};
			}
			// this is the majority use case - just fn.bind(this) and no args

			args = null;
			return function() {
				return method.apply(me, arguments);
			};
		};
		Function.prototype.bind = bind;
	}
	
	if(!Function.createDelegate){
		Function.createDelegate = function(a, b) {
			return function() {
				return b.apply(a, arguments)
			}
		};
	}
	
}());
