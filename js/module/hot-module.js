/**
 * 最热排行模块
 * 依赖hot-auto-play-module.js模块
 */
(function(){
	//内容模板
	var hotTemplate = document.getElementById('hot-template').innerHTML;
	//最热排行内容
	var hotContent = document.getElementById('hot-content');

	var url = "http://study.163.com/webDev/hotcouresByCategory.htm?_t="+new Date().getTime();
	Ajax.get(url,function(data,res){
		data = JSON.parse(data);
		var html = "";
		for(var i=0;i<data.length;i++){
			var t = new Template(hotTemplate,data[i]);
			html+=t.render();
		}
		hotContent.innerHTML = html;
		var hotAutoPlay = new HotAutoPlay();
		hotAutoPlay.play();
	});
})();