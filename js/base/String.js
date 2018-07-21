/**
 * 字符串方法增强
 */
(function(){
	/**
	 * 去掉字符串空格
	 */
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			 return this.replace(/(^\s*)|(\s*$)/g,'');  
		}
	}
	/**
	 * 用于模板时获取表达式,并去掉表达式空格
	 */
	if(!String.prototype.getExpression){
		String.prototype.getExpression = function(){
			 return this.replace(/[\{\{\}\}]/g,'').trim(); 
		}
	}
	if(!String.prototype.escapeRegExp){
		String.prototype.escapeRegExp = function(){
			return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
		}
	}
	
})();