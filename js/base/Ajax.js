/**
 * 对ajax请求进行封装，
 * 依赖Function.js
 */
(function(){

	
	if (!window.XMLHttpRequest) {
		window.XMLHttpRequest = function() {
			var a = [ "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0",
					"MSXML2.XMLHTTP.2.6", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP",
					"MSXML.XMLHTTP" ];
			for (var c = 0; c < a.length; c++) {
				try {
					return new ActiveXObject(a[c])
				} catch (b) {
				}
			}
			return null
		}
	}
	
	
	
	/**
	 * @param template 模板字符串
	 * @param data 数据
	 */
	function Ajax(options, data, callback) {
		this.options = Util.extend({
			_xmlHttpRequest : new XMLHttpRequest(),
			url : "",
			body : "",
			callback : function() {
				return null
			},
			method : "post"
		}, options);
		if(data){
			this.options.body = data;
		}
		if (callback) {
			this.options.callback = callback;
		}
		
		this.send()
	};

	Ajax.prototype._completed = function() {
		if (this.options._xmlHttpRequest.readyState == 4) {
			var status = this.options._xmlHttpRequest.status
			if(status>=200 && status < 300
					|| status == 304){
				this.options.callback(this.options._xmlHttpRequest.responseText,
					this.options._xmlHttpRequest)
			}else{
				//window.alert("服务返回异常状态");
				window.console.log("服务返回异常状态");
			}
		}
	};
	/**
	 * 封装查询参数
	 */
	Ajax.prototype.formatBody = function() {
		var items = [];
		for ( var e in this.options.body) {
			items.push(encodeURIComponent(e) + "=" + encodeURIComponent(this.options.body[e]));
		}
		return items.join("&");
	};
	
	Ajax.prototype.send = function() {
		//查询参数
		var params = this.formatBody();
		//如果是get请求就将查询字符串放到url后
		if(this.options.method.toLowerCase() === 'get'){
			if(this.options.url.indexOf('?') != -1){
				this.options.url+="&"+params;
			}else{
				this.options.url+='?'+params;
			}
			//置为null让get请求send(null)
			params = null;
		}
		this.options._xmlHttpRequest.open(this.options.method,
				this.options.url, true);
		this.options._xmlHttpRequest.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded; charset=UTF-8");
		this.options._xmlHttpRequest.onreadystatechange = Function
				.createDelegate(this, this._completed);
		this.options._xmlHttpRequest.send(params);
	};

	 /**
	 * 
	 *@param url    {String}    请求资源的url
	 *@param data    {Object}    请求的查询参数
	 *@param callback    {Function}    请求的回调函数，接收XMLHttpRequest对象的responseText属性作为参
	 */
	Ajax.get = function(url,data,callback){
		//封装参数
		var options ={
				'url': url,
				method : "get"
		};
		if(typeof data ==="function"){
			callback = data;
			data = null;
		}
		new Ajax(options,data,callback);
	};
	/**
	 * 
	 *	@param url    {String}    请求资源的url
	 *	@param data    {Object}    请求的查询参数
	 *	@param callback    {Function}    请求的回调函数，接收XMLHttpRequest对象的responseText属性作为参
	 */
	Ajax.post = function(url, data, callback){
		//封装参数
		var options ={
				'url': url,
				method : "post"
		};
		new Ajax(options,data,callback);
	};
	//注册成全局
	window.Ajax = Ajax;
})();