/**
 * 对顶部处理
 */
(function(){
	
	var loginSuc  = Cookie.read("loginSuc");
	//关注dom
	var attention = document.getElementById('attention');
	//已关注dom
	var haveAttention = document.getElementById('have-attention');
	
	var cancelAttention  = document.getElementById('cancel-attention');
	

	//遮罩层dom
	var mask = document.getElementById("mask");
	//登录模块dom
	var mLogin = document.getElementById("m-login");

	
	
	var show = function(){
		mask.style.display="block";
		mLogin.style.display="block";
	}
	var hide = function(){
		mask.style.display="none";
		mLogin.style.display="none";
	}
	//登录成功后回调函数
	var loginSucHide = function(){
		//隐藏登录模块
		hide();
		Cookie.write("loginSuc","true",{duration:30})
		attention.style.display="none";
		haveAttention.style.display="inline-block";
		//调用关注接口
		var url = "http://study.163.com/webDev/attention.htm";
		Ajax.get(url,function(data,res){
			if(data == "1"){
				//设置关注cookie
				Cookie.write("followSuc","1",{duration:30})
			}
		});
	}
	
	//弹出登录框
	attention.addEvent("click",function(event){
		show();
	});

	cancelAttention.addEvent("click",function(event){
			//删除loginSuc cookie
			Cookie.dispose("loginSuc");
			//删除followSuc cookie
			Cookie.dispose("followSuc");
			attention.style.display="inline-block";
			haveAttention.style.display="none";
	});

	//登录模块关闭按钮dom
	var mLoginColse = mLogin.getElementsByClassName("colse")[0];
	 mLoginColse.addEvent("click",function(event){
		hide();
	});
	//登录模块登录按钮dom
	var mLoginBtn = document.getElementById("login-btn");
	mLoginBtn.addEvent("click",function(event){
		//用户名
		var userName = document.getElementById("username");
		//密码
		var password = document.getElementById("password");
		if(userName.value.trim() === ""){
			window.alert("请输入账号。");
			userName.focus();
			return ;
		}
		
		if(password.value.trim() === ""){
			window.alert("请输入密码。");
			password.focus();
			return ;
		}
		
		//加密吧
		var userNameVal = hex_md5(userName.value);
		var passwordVal = hex_md5(password.value);

		var url = "http://study.163.com/webDev/login.htm?userName="+userNameVal
				+"&password="+passwordVal+"&_t="+new Date().getTime();
		Ajax.get(url,function(data,res){
			if(data ==="1"){
				//清空输入
				userName.value="";
				password.value="";
				loginSucHide();
			}else{//data ==0
				window.alert("账号或密码输入错误。");
				userName.focus();
			}
			
		});
	});
	
	
	//已经成功登录
	if(loginSuc){
		attention.style.display="none";
		haveAttention.style.display="inline-block";
	}
	
})();