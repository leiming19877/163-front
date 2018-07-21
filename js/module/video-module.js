/**
 * 对顶部处理
 */
(function(){
	//打开播放视频窗口链接
	var videoOpen  = document.getElementById("video-open");
	//视频关闭按钮
	var videoColse = document.getElementById("video-colse");
	//视频
	var video = document.getElementById("video");
	//遮罩层dom
	var mask = document.getElementById("mask");
	//视频模块dom
	var mVideo = document.getElementById("m-video");

	//绑定各自事件
	//打开视频播放
	videoOpen.addEvent("click",function(event){
		mask.style.display="block";
		mVideo.style.display="block";
	});
	//关闭视频播放
	videoColse.addEvent("click",function(event){
		mask.style.display="none";
		mVideo.style.display="none";
		
		video.pause();
		video.currentTime = 0;
		
	});
})();