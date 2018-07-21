/**
 * 依赖 String.js
 * 对模板替换进行简单的封闭
 * @param window
 */
(function(window){
	
	/**
	 * @param template 模板字符串
	 * @param data 数据
	 */
	function Template(template,data){
		this.template = template;
		this.data = data;
	}

	/**
	 * 对模板进行替换，返回替换后的字符串
	 * @returns {@String }
	 */
	Template.prototype.render = function(){
		if(!this.template){
			return "";
		}
		if(!this.data){
			this.template
		}
		var self  = this;
		return this.template.replace(/\{\{\w+\}\}/g,function(word){
			var property = word.getExpression();
			if(self.data.hasOwnProperty(property)){
				var val = self.data[property];
				if(val){
					return val;
				}
				return "";
			}
			return "";
		});
	};
	//注册成全局
	window.Template = Template;
})(window);
