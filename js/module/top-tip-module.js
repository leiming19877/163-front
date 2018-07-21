/**
 * 对顶部处理
 */
(function(){
	
	var noNotice  = Cookie.read("noNotice");
	var mTopTip = document.getElementById('m-top-tip');
	if(noNotice){
		mTopTip.style.display="none";
	}
	var noNotice = document.getElementById("no-notice");
	noNotice.addEvent("click",function(event){
		//设置cookie有效期为30天
		Cookie.write("noNotice","true",{duration:30});
		mTopTip.style.display="none";
	});
})();