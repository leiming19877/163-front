/**
 * 最热排行榜自动切换 模块
 * 
 * 
 */
(function(){

	
	function HotAutoPlay(){

		this.hotContent = document.getElementById('hot-content');
		this.hotContent.innerHTML += this.hotContent.innerHTML;
		//让内容看起来是循环的，即复制一分内容html
		this.hotList = this.hotContent.getElementsByClassName("item");
		
		this.timer ;
		this.interval = 5000;//5秒就切换一次
		this.index = 0;  //当前切换到那一个了
		//必改参数 
		this.count = this.hotList.length;  //图片数量 
		//可选参数
		this.height = this.hotList[0].offsetHeight;//单个元素的高度
		//要跳到的地方,用于设置hotContent.top;
		this.iTarget = 0;
		 
	  }
	
	
	/**
	 * 切换到下一张显示
	 */
	HotAutoPlay.prototype.next= function(){
		//一半的内容时就切换到
		if(this.index == (this.count/2)){
			this.index = 0;
		}else{
			this.index++;
		}
		//目标位置高度
		this.iTarget = -(this.index*this.height);
		this.go();
	};
	
	/**
	 * 切换到显示指定一张图片
	 */
	HotAutoPlay.prototype.go = function(){
		var self = this;
		var animationTimer;//动画定时器 
		//实际内容一半的高度，用于内容切换
		var contentHalfHeight = this.hotContent.offsetHeight/2;
		var step = function ()
		{
			//步长
			var iSpeed = (self.iTarget - self.hotContent.offsetTop) / self.count;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			contentHalfHeight == self.iTarget ? clearInterval(animationTimer) : (self.hotContent.style.top = self.hotContent.offsetTop + iSpeed + "px")
		}
		 animationTimer = setInterval(step, 30);
	};
	
	HotAutoPlay.prototype.play = function(){
		var self = this;
		this.timer = setInterval(function (){
			self.next()
		},this.interval);
	};
	//模块输出
	window.HotAutoPlay = HotAutoPlay;
	
})();