/**
 * 课程模块
 */
(function(){
	

	//课程内容模板
	var courseTemplate = document.getElementById('course-template').innerHTML
	//课程内容弹出提示模板
	var coursePopTemplate = document.getElementById('course-pop-template').innerHTML;
	
	//最热排行内容
	var courseContent = document.getElementById('course-content');
	//课程内容弹出提示内容
	var mCoursePop = document.getElementById('m-course-pop');
	
	//课程列表
	var courseItems = courseContent.getElementsByClassName("item");
	
	//课程弹出提示区列表
	var coursePopItems = mCoursePop.getElementsByClassName("pop-wrap");
	
	//通过数据重新渲染课程
	var renderChourseContent = function(data){
		var courseContentHtml = "";
		var coursePopContentHtml = "";
		//渲染模板内容
		for(var i=0;i<data.length;i++){
			//处理价格,因为模板只做了数据替换
			if(data[i].price == 0){
				data[i].price = "免费";
			}else{
				data[i].price = "￥"+ data[i].price;
			}
			var t = new Template(courseTemplate,data[i]);
			courseContentHtml+=t.render();
			
			t = new Template(coursePopTemplate,data[i]);
			coursePopContentHtml+=t.render();
		}
		courseContent.innerHTML = courseContentHtml;
		mCoursePop.innerHTML = coursePopContentHtml;
		//对内容增加 mouseover mouseout 事件，以显示浮动内容
		for(var i=0;i<courseItems.length;i++){
			courseItems[i].setAttribute("data-index",i);
			coursePopItems[i].style.display ="none";
			courseItems[i].addEvent("mouseover",function(event){
				var courseContentWidth = courseContent.offsetWidth;
				var index = parseInt(this.getAttribute("data-index"));
				var p = this.getPosition();
				//先将其置于不可见的位置，这样就可以直接获取coursePopItems[index]的宽度了
				coursePopItems[index].style.left = "-9999px";
				coursePopItems[index].style.display ="block";

				//大布局时，最右边的（也就是第4个）将其实浮动内容显示在左边
				if(courseContentWidth>=980 && (index+1)%4 == 0){
					coursePopItems[index].style.left = (p.left-coursePopItems[index].offsetWidth -10)+"px";
				//小布局时，最右边的（也就是第3个）将其实浮动内容显示在左边	
				}else if(courseContentWidth<980 && (index+1)%3 == 0){
					coursePopItems[index].style.left = (p.left-coursePopItems[index].offsetWidth -10)+"px";
				}else{
					coursePopItems[index].style.left = (p.left+this.offsetWidth -10)+"px";
				}
				
				coursePopItems[index].style.top  = (p.top -1)+"px";
				
			});
			courseItems[i].addEvent("mouseout",function(event){
				
				var index = parseInt(this.getAttribute("data-index"));
				coursePopItems[index].style.display ="none";
			});
		}
	}

	

	window.renderChourseContent = renderChourseContent;
})();