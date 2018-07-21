/**
 * 对Element进行增强,支持ie8+
 */
(function(){
	
	
	/**
	 * 简单的对添加事件进行封闭，没有实现更复杂的，如用监听器实现
	 * @param type 事件类型
	 * @param fn  函数
	 */
	Element.prototype.addEvent = function(type,fn){
			if (document.addEventListener) {
				this.addEventListener(type,
						fn, false);
			} else if(document.attachEvent) {
				this.attachEvent("on"+type, fn);
			}
		}
	
	/**
	 * 
	 * @param type 事件类型
	 * @param fn  函数
	 */
	Element.prototype.removeEvent = function(type,fn){
			if (document.removeEventListener) {
				this.removeEventListener(type,
						fn, false);
			} else if(document.detachEvent) {
				this.detachEvent("on"+type, fn);
			}
	 }
	/**
	 * 对元素增加样式
	 * @param className {@String} 样式
	 */
	Element.prototype.addClass = function(className){
		var names = className.split(/\s+/);
		var eClassName = this.className;
		var tmp = [];
		for(var i = 0;i<names.length;i++){
			if(eClassName.indexOf(names[i]) == -1){
				tmp.push(names[i]);
			}
		}
		this.className +=" " + (tmp.join(" "));
	};
	/**
	 * 删除元素样式
	 * @param className {@String} 样式
	 */
	Element.prototype.removeClass = function(className){
		var classNames = className.split(/\s+/);
		var eClassNames = this.className.split(/\s+/);;
		var tmp = [];
		var isMatch = false;//是否有匹配
		for(var i = 0;i<eClassNames.length;i++){
			for(var j=0;j<classNames.length;j++){
				if (eClassNames[i] == classNames[j]) {
					isMatch = true;
					break;
				}
			}
			//如果不匹配，就添加到样式数组
			if(!isMatch){
				tmp.push(eClassNames[i]);
			}
			isMatch = false;
		}
		//重新设置样式
		this.className = tmp.join(" ");
	};
	/**
		检测样式是否匹配,闭包内部使用函数
	 **/
	function isMatch(queryNames, node) {
		var classNames = node.className.split(/\s+/);
		var isMatch = false;//是否有匹配
		//进行集合匹配
		for (var i = 0; i < queryNames.length; i++) {
			isMatch = false;
			for (var j = 0; j < classNames.length; j++) {
				if (queryNames[i] == classNames[j]) {
					isMatch = true;
					break;
				}
			}
			if (!isMatch) {//如果存在不匹配的元素，直接跳出
				break;
			}
		}
		return isMatch;
	}
	
	if(!Element.prototype.getElementsByClassName){
		Element.prototype.getElementsByClassName = function(names){
			//分割要查找的样式,这里采用正则表达式分割，而不是老师讲的split(" ")方式
			var queryNames = names.split(/\s+/);
			var nodes = this.getElementsByTagName('*');//遍历
			var rets = []; //存放匹配到的节点
			for (var i = 0; i < nodes.length; i++) {
				/**
				判断样式nodes[i] 样式是否跟queryNames匹配
				匹配的话就将其添加到匹配结果里
				由于匹配代码比较长，我将其放置在单独的方式里了
				**/
				if (isMatch(queryNames, nodes[i])) { 
					rets.push(nodes[i]);
				}
			}
			return rets;
		}
	}
	
	/**
	 * 获取元素到文档区域的坐标 
	 */
	Element.prototype.getPosition = function() { 
		var actualLeft = this.offsetLeft, 
		actualTop = this.offsetTop, 
		current = this.offsetParent; // 取得元素的offsetParent 
			// 一直循环直到根元素 
		while (current !== null) { 
				actualLeft += current.offsetLeft; 
				actualTop += current.offsetTop; 
				current = current.offsetParent; 
				} 
			// 返回包含left、top坐标的对象 
	return { 
		left: actualLeft, 
		top: actualTop 
		}; 
	}
})();