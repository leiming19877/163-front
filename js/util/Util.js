
/**
 * 工具类方法
 * @param window
 */
(function(window){
	
     var Util;
     //注册，如果存在Util就复用同一对象
     if(!window.Util){
    	 Util = {};
    	 window.Util = Util;
     }else{
    	 Util = window.Util;
     };
	/**
	 * 简单继成,b覆盖a属性
	 * @param a
	 * @param b
	 */
	Util.extend = function(a,b){
		if(!b){
			return a;
		}
		for(var p in b){
			a[p] = b[p];
		}
		return a;
	};
	/**
	 * 简单写一个ready方法，在这里面不做过多的兼容性处理
	 */
	Util.ready = window.ready = function(fn){  
	    if(document.addEventListener){//兼容非IE  
	        document.addEventListener("DOMContentLoaded",function(){  
	            //注销事件，避免反复触发  
	            document.removeEventListener("DOMContentLoaded",arguments.callee,false);  
	            fn();//调用参数函数  
	        },false);  
	    }else if(document.attachEvent){//兼容IE  
	        document.attachEvent("onreadystatechange",function(){  
	            if(document.readyState==="complete"){  
	                document.detachEvent("onreadystatechange",arguments.callee);  
	                fn();  
	            }  
	        });  
	    }  
	};  
})(window);