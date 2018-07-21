/**
 * slide 模块
 * 
 * 
 */
(function(){

	
	var mSlide = document.getElementById('m-slide');
	//连接列表
	var linkList = mSlide.getElementsByTagName('a');
	//按钮列表
	var buttonList = mSlide.getElementsByTagName('i');

	//除第一张图片其它的图片都隐藏，即默认显示第一张图片，相当于初始化。
	for(var i=1;i<linkList.length;i++){
		linkList[i].style.display ="none";
		linkList[i].style.opacity = 0;
	}
	
	function Slide(){
		this.timer;//自动轮手定时器
		this.index = 1;  //当前图片下标
		this.animated = false;   //是否正在切换图片
		//必改参数 
		this.linkCount = linkList.length;  //图片数量 
		//可选参数
		this.autoInterval = 5000;    //自动播放图片的切换时间
		this.time = 500;     //渐变总时间
		this.interval = 100;  //每次渐变时间 
		
		this.play();
	}
	
	/**
	 * 获取透明度值
	 */
	function getOpacity(el){
		if(el.style.opacity != ""){
			return parseFloat(el.style.opacity);
		}
		return 1.0;
	}
	/**
	 * 切换到下一张显示
	 */
	Slide.prototype.next= function(){

		if(this.index ==this.linkCount){
			this.index = 1;
		}else{
			this.index++;
		}
		this.go();
	};
	
	Slide.prototype.play = function(){
		var self = this;
		this.timer = window.setInterval(function(){
			self.next();
		}, this.autoInterval);
	};
	
	Slide.prototype.pause = function(){
		window.clearInterval(this.timer);
	};
	
	
	Slide.prototype.setButtons = function(){
		for(var i=0;i<buttonList.length;i++){
			buttonList[i].className = "";
		}
		buttonList[this.index-1].className = "cur";
	}
	/**
	 * 切换到显示指定一张图片
	 */
	Slide.prototype.go = function(){
		 //index的上一张
		 var preIndex = 0;
		 var index = this.index-1;
		 if (index == 0) {
		        preIndex = this.linkCount-1;
		  }
		  else {
		        preIndex = index - 1;
		 }
		 //每次渐变量, 100/500
		 var offset = 0.2;
		 var self = this;
		 this.animated = false;
		 var step = function(){			 	
				//改变后的值
				var tmp = getOpacity(linkList[preIndex])-offset;
				//转换为整个数据进行判断
				if(Math.round(tmp*10)>0){
					linkList[preIndex].style.opacity = getOpacity(linkList[preIndex])-offset;
					linkList[index].style.opacity = getOpacity(linkList[index])+offset;
				}else{
					//清除动画定时器
					clearInterval(intervalId);
					linkList[index].style.opacity = "1";
					linkList[preIndex].style.opacity ="0";
					linkList[preIndex].style.zIndex = 1;
					linkList[index].style.zIndex = 2;
					self.animated = true;
					self.setButtons();
					
				}
		}
	
		//更改显示顺序
		linkList[preIndex].style.zIndex = 2;
		linkList[index].style.zIndex = 1;
		linkList[preIndex].style.opacity=1;
		linkList[index].style.opacity=0;
		linkList[index].style.display="";
		//进行10次透明度变化，时间间隔为100毫秒
		var intervalId = setInterval(step,100);

	}
	/**
	 * 对指定元素进行fadeOut
	 * @param el
	 */
	
	var slide = new  Slide();
	
	//设置序列
	for(var i=0;i<buttonList.length;i++){
		buttonList[i].setAttribute("data-index",(i+1));
		buttonList[i].addEvent("click",function(event){
			//切换到对应的图片上去
			var index = this.getAttribute("data-index");
			slide.index = index;
			slide.go();
		});
	}
	mSlide.addEvent("mouseover",function(event){
		 
		slide.pause();
	});
	mSlide.addEvent("mouseout",function(event){
		slide.play();
	});
})();