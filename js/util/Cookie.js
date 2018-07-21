/*
依赖 Util.js
依赖String.js

*/
(function(window){

	function Cookie(cookieName,options){
		var defaultOptions ={
				path: '/',
				domain: false,
				duration: false,
				secure: false,
				document: document,
				encode: true,
				httpOnly: false
		};
		this.cookieName = cookieName;
		this.options = Util.extend(defaultOptions,options);	
	}

	Cookie.prototype.write= function(value){
		if (this.options.encode) value = encodeURIComponent(value);
		if (this.options.domain) value += '; domain=' + this.options.domain;
		if (this.options.path) value += '; path=' + this.options.path;
		if (this.options.duration){
			var date = new Date();
			date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (this.options.secure) value += '; secure';
		if (this.options.httpOnly) value += '; HttpOnly';
		this.options.document.cookie = this.cookieName + '=' + value;
		return this;
	};

	Cookie.prototype.read =function(){
		var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.cookieName.escapeRegExp() + '=([^;]*)');
		return (value) ? decodeURIComponent(value[1]) : null;
	},

	Cookie.prototype.dispose=function(){
		new Cookie(this.cookieName, Util.extend(this.options, {duration: -1})).write('');
		return this;
	}

	Cookie.write = function(cookieName, value, options){
		return new Cookie(cookieName, options).write(value);
	};

	Cookie.read = function(cookieName){
		return new Cookie(cookieName).read();
	};

	Cookie.dispose = function(cookieName, options){
		return new Cookie(cookieName, options).dispose();
	};
	//注册成全局
	window.Cookie = Cookie;
})(window);

