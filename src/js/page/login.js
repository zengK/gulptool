localStorage.removeItem("sessionID");
$('.Tel').on('propertychange input',function(){
    var _html = $(this).val(),
    counter = _html.length;
    if(counter==11){
    	$('.btnColor1').removeAttr("disabled");
      $('.btnColor1').addClass('btnColor'); 
    }else{
    	$('.btnColor1').removeClass('btnColor'); 
    	$('.btnColor1').attr("disabled", true);
    }
})
$('.YZcode').on('propertychange input',function(){
    var _html = $(this).val(),
    counter = _html.length;
    if(counter==5){
      $('.btn2').addClass('btnColor'); 
      $('.btn2').removeAttr("disabled");
    }else{
    	$('.btn2').removeClass('btnColor');
    	$('.btn2').attr("disabled", true);
    }
})

//短信验证
$('.btnColor1').on('click',function(){
	var Tel = $('.Tel').val();
	if(Tel==''){
		$('.btnColor1').removeClass('btnColor');
		window.alert("手机号输入不能为空,请重试~");
		return false;
	}else if(!(/^1[0-9]\d{9}$/.test(Tel))) {
		$('.btnColor1').removeClass('btnColor');
		window.alert("手机号输入错误,请重试~");
		return false;
	}else{
		//
		paramyz.username=Tel;
		paramyz.flag = 0;
		getData(shortMessageIdentifyLoginAction);
	}
})

paramyz={
	"username": "",	//用户名，登录状态需要提供，字符串
    "flag":"",		//  标示，0：短信 1：语音
    "channel":"weixinH5"
}

//获取openid
function getQueryString() {
//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	var openid =window.location.search.slice(1);
	localStorage.setItem('openid',openid);
//	setCookie('openid',openid,7);
}
getQueryString();
//验证码接口
function getData(serverUrl) {
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramyz),
		},
		fun1: function(res) {
				if(res.errorcode){
					window.alert(res.msg);
					return false;
				}else{
//					time('.btnColor1');
				}
	
		},
		fun2: function() {
		}
	})
}

//登录验证

$('.btnDL').on('click',function(){
	
	var Tel = $('.Tel').val();
	var YZcode = $('.YZcode').val();
	var recommendman = $('.addcode').val();
	paramDL.username=Tel;
	paramDL.verification=YZcode;
	paramDL.recommendman=recommendman;
//	alert(recommendman);
	getDataDL(loginResultLoginAction);
})

paramDL={
  	"username": "",		//用户名，登录状态需要提供，字符串
	"verification": "",	//动态验证码，字符串
	"channel":"weixinH5",
	"gasno": "92",	//默认油号，未登录状态需要提供，字符串
	"recommendman":''
	}

//var indexUrl=Url2+'wxpayweb/index.html';
function getDataDL(serverUrl) {
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramDL),
			version:'weixin-1.1'
		},
		fun1: function(res) {
				if(res.result=='ok'){
					var Tel = $('.Tel').val();
					var sessionId=res.sessionid;
					localStorage.setItem('sessionID',sessionId);
					localStorage.setItem('Telphone',Tel);
					alert(sessionId)
					var indexUrL= localStorage.getItem('indexUrL')
					alert(indexUrL)
					window.location.href =indexUrL;
				}else{
						window.alert(res.msg);
				}
		},
		fun2: function() {
		}
	})
}

//点击头部下载按钮，跳转各平台下载

//$('.btndown').on('click',function(){
//	var ua = navigator.userAgent.toLowerCase();    
//  if (/iphone|ipad|ipod/.test(ua)) {
////   alert("iphone");        
//	window.location.href="https://itunes.apple.com/cn/app/%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%8A%A0%E6%B2%B9%E7%AB%99/id962272538?mt=8";
//  } else if (/android/.test(ua)) {
// 	window.location.href="http://app.qq.com/#id=detail&appid=1104434805"; 
//  }
//})
$('.btndown').on('click',function(){
	var ua = navigator.userAgent.toLowerCase();    
    if (/iphone|ipad|ipod/.test(ua)) {
//   alert("iphone");        
	window.location.href="https://itunes.apple.com/cn/app/%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%8A%A0%E6%B2%B9%E7%AB%99/id962272538?mt=8";
    } else if (/android/.test(ua)) {
   	window.location.href="http://app.qq.com/#id=detail&appid=1104434805"; 
//getDown('http://phptest.qiukwi.com/qiukui/ybboa/index.php?m=Admin&c=Operation&a=downloadCount');
    }
})
//
//var paramDown={
//	"reward_id":100,
//	"station_id":5696,
//	"name":"weixin",
//	"count":1
//}
//
//function getDown(serverUrl) {
//	$('.login').show();
//	postAjax({
//		server: serverUrl,
//		param: {
//			param: JSON.stringify(paramDown)
//		},
//		fun1: function(res) {
//			if(res.error_code==200){
//				alert(2);
//				var ua = navigator.userAgent.toLowerCase();    
//			    if (/iphone|ipad|ipod/.test(ua)) {
//				window.location.href="https://itunes.apple.com/cn/app/%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%8A%A0%E6%B2%B9%E7%AB%99/id962272538?mt=8";
//			    } else if (/android/.test(ua)) {
//			 	window.location.href="http://app.qq.com/#id=detail&appid=1104434805"; 
//			    }
//			}else{
//				alert(res.msg);
//				return false;
//			}
//		},
//		fun2: function(res){
//			$('.login').hide();
//		}
//	})
//}