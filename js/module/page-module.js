
/**
 * 分页处理模块
 * 依赖course-module.js模块
 * 分布模块的核心就是处理分页，像分页查询后的渲染采用回调实现，以保持模块的独立性,
 * 在刚在开始从架构层面思考，只想做一个对外提供分页的功能，发现做着做着，离这个目标
 * 有所偏离，最大的问题就是分页对象初始化放置在了这里，我本想着放置到课程模块（course-module.js）
 * 里，因为我还需要绑定分页组件各按钮事件，放置到课程模块里的话会更加不好，
 * 这样就是说在架构层面优化的空间还是有很大的，我到时好好思索思索。
 */
(function(window){
	//分页dom	
	var mPage = document.getElementById("m-page");
	//上一页dom
	var mPagePrev = mPage.getElementsByClassName("zprev")[0];
	//上一页dom
	var mPageNext = mPage.getElementsByClassName("znext")[0];
	//分页数字按钮
	var mPageNum = mPage.getElementsByClassName("znum");
	
	function Page(options){
		this.pageCount = 0;//总页数
		this.pageNo = 1;//默认显示第一页
		this.pageSize  = 20;//分页大小，默认20
		this.pageParam = "pageNo";//分页查询参数
		this.pageSizeParam = "psize";//分页大小查询参数
		this.isMoveFront = false;//是否需要向前移动分页按钮数字
		this.isMoveBack = false;//是否需要向后移动分页按钮数字
		this.extraParams = {};//其它查询参数
		this.pageUrl = "";//分页查询url

		Util.extend(this,options);
	}
	/**
	 * 刷新dom结点信息
	 */
	Page.prototype.refreshDom = function(){

		//最果是最后一页就将下一页样式设置为禁用等式
		if(this.pageNo == this.pageCount){
			mPageNext.addClass("disabled");
		}else if(this.pageCount > 1){
			mPageNext.removeClass("disabled");
		}
		//如果是第一页
		if(this.pageNo == 1){
			mPagePrev.addClass("disabled");
		}else{//this.pageNo >1
			mPagePrev.removeClass("disabled");
		}
		//向前移动分页按钮数字
		if(this.isMoveFront){
			for(var i=0;i<mPageNum.length;i++){
				mPageNum[i].innerHTML = parseInt(mPageNum[i].innerHTML)+4;
			}
		}
		//向后移动分页按钮数字
		if(this.isMoveBack){
			for(var i=0;i<mPageNum.length;i++){
				mPageNum[i].innerHTML = parseInt(mPageNum[i].innerHTML)-4;
			}
		}
		//设置那个分页按钮被选中
		for(var i=0;i<mPageNum.length;i++){
			//先重置样式
			mPageNum[i].className ="znum";
			if(parseInt(mPageNum[i].innerHTML) == this.pageNo){
				mPageNum[i].className = "znum selected";
			}
		}
		//如果pageNo被重置到第一页，如tab模块重置了该属性
		if(this.pageNo == 1){
			//设置那个分页按钮被选中
			for(var i=0;i<mPageNum.length;i++){
				//先重置样式
				mPageNum[i].className = "znum";
				mPageNum[i].innerHTML = (i+1);
			}
			mPageNum[0].className = "znum selected";
		}
	}
	/**
	 * 上一页处理
	 *  @param callback(data) 回调函数，实现界面刷新
	 *  在这里callback 就是课程模块输出的函数
	 * data 数据就是查询后的数据
	 */
	Page.prototype.prev = function(callback){
		//已经是最后一页了，什么都不做，直接返回
		if(this.pageNo == 1){
			return ;
		}
		this.pageNo--;
		var numIndex = 0;//类似当前选择第几个按钮
		for(var i=0;i<mPageNum.length;i++){
			if(mPageNum[i].className == "znum selected"){
				numIndex = i;
				break;
			}
		}
		this.setMoveProperty(numIndex)
		this.loadData(callback);
	};
	/**
	 * 下一页处理
	 *  @param callback(data) 回调函数，实现界面刷新
	 *  在这里callback 就是课程模块输出的函数
	 * data 数据就是查询后的数据
	 */
	Page.prototype.next = function(callback){
		//已经是最后一页了，什么都不做，直接返回
		if(this.pageNo == this.pageCount && this.pageCount !=0){
			return ;
		}
		this.pageNo++;
		var numIndex = 0;//类似当前选择第几个按钮
		for(var i=0;i<mPageNum.length;i++){
			if(mPageNum[i].className == "znum selected"){
				numIndex = i+2;
				break;
			}
		}
		this.setMoveProperty(numIndex)
		this.loadData(callback);
	};
	
	/**
	 * 设置是否需要向前、向后移动分页 属性
	 * @param numIndex 当前切换到的是第几个按钮
	 */
	Page.prototype.setMoveProperty = function(numIndex){
		//重置需要移动属性
		this.isMoveFront = false;
		this.isMoveBack = false;
		
		//如果分页大于8页才会移动的可能
		if(this.pageCount > 8 ){		
			//向后移动
			if((numIndex == 1 || numIndex == 2) && parseInt(mPageNum[0].innerHTML) > 1){
					this.isMoveBack = true;
			}
			//向前移动
			if( (numIndex == 7 || numIndex == 8) && 
				 parseInt(mPageNum[7].innerHTML) < this.pageCount){
				this.isMoveFront = true;
			}
		}
	};
	/**
	 * 跳转到指定页
	 * @param pageNo {@Number int} 要跳转的页
	 * @param numIndex {@Number int} 是第几个按钮
	 * @param callback {@Function} 回调函数
	 */
	Page.prototype.goPage = function(pageNo,numIndex,callback){
		if(pageNo > this.pageNo){
			return ;
		}
		this.pageNo = pageNo;
		this.setMoveProperty(numIndex);
		this.loadData(callback);
	};
	/**
	 * 加载当前页数据，
	 * @param callback(data) 回调函数，实现界面刷新
	 * data 数据就是查询后的数据
	 */
	Page.prototype.loadData = function(callback){
		var param = {};
		var url = this.pageUrl;
		if(url.indexOf("?")  == -1){
			url+="?";
		}
		url+=this.pageParam+"="+this.pageNo;
		url+= ("&" + this.pageSizeParam+"="+this.pageSize);
		param  = Util.extend(param,this.extraParams);//合并查询参数
		//没办法，这个参数只能放到最后，不然调这接口调不通
		param["_t"] = (new Date().getTime());
		var self = this;
		Ajax.get(url,param,function(data,res){
			data = JSON.parse(data);
			callback(data.list);
			self.pageCount = data.totalPage;
			self.refreshDom();
		});
	};
	
	//课程分页
	var coursePage = new Page({
			pageUrl:"http://study.163.com/webDev/couresByCategory.htm",
			extraParams:{type:10}
	});
	coursePage.loadData(renderChourseContent);
	//注册事件
	mPagePrev.addEvent("click",function(event){
		coursePage.prev(renderChourseContent);
	});
	mPageNext.addEvent("click",function(event){
		coursePage.next(renderChourseContent);
	});
	

	for(var i=0;i<mPageNum.length;i++){
		//给分页按钮增加标识是第几个按钮属性
		mPageNum[i].setAttribute("data-index",i+1);
		mPageNum[i].addEvent("click",function(event){
			var numIndex = parseInt(this.getAttribute("data-index"));
			var page = parseInt(this.innerHTML);
			coursePage.goPage(page,numIndex,renderChourseContent);
		});
	}
	//向window 注册对象，以供其它模块使用，如tab 模块在做切换时使用
	window.coursePage  = coursePage;
})(window);