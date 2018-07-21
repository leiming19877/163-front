/**
 * tab 模块
 * 依赖page-module.js模块、course-module.js模块
 * 
 */
(function(){

	var mTab = document.getElementById('m-tab');
	var links = document.querySelectorAll(".m-tab .tabs  a");
	for(var i=0;i<links.length;i++){
		links[i].addEvent("click",function(event){
			for(var i=0;i<links.length;i++){
				links[i].className="";
			}
			this.className = "zcur";
			var type = this.getAttribute("data-type");
			//调用分页模块的分页对象，重新加载数据
			coursePage.pageNo =1;
			coursePage.extraParams.type = type; 
			coursePage.loadData(renderChourseContent);
			
		});
	}
	
})();