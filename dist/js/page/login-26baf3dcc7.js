function getQueryString(){var e=window.location.search.slice(1);localStorage.setItem("openid",e)}function getData(e){postAjax({server:e,param:{param:JSON.stringify(paramyz)},fun1:function(e){if(e.errorcode)return window.alert(e.msg),!1},fun2:function(){}})}function getDataDL(e){postAjax({server:e,param:{param:JSON.stringify(paramDL),version:"weixin-1.1"},fun1:function(e){if("ok"==e.result){var n=$(".Tel").val(),o=e.sessionid;localStorage.setItem("sessionID",o),localStorage.setItem("Telphone",n),alert(o);var t=localStorage.getItem("indexUrL");alert(t),window.location.href=t}else window.alert(e.msg)},fun2:function(){}})}localStorage.removeItem("sessionID"),$(".Tel").on("propertychange input",function(){11==$(this).val().length?($(".btnColor1").removeAttr("disabled"),$(".btnColor1").addClass("btnColor")):($(".btnColor1").removeClass("btnColor"),$(".btnColor1").attr("disabled",!0))}),$(".YZcode").on("propertychange input",function(){5==$(this).val().length?($(".btn2").addClass("btnColor"),$(".btn2").removeAttr("disabled")):($(".btn2").removeClass("btnColor"),$(".btn2").attr("disabled",!0))}),$(".btnColor1").on("click",function(){var e=$(".Tel").val();return""==e?($(".btnColor1").removeClass("btnColor"),window.alert("手机号输入不能为空,请重试~"),!1):/^1[0-9]\d{9}$/.test(e)?(paramyz.username=e,paramyz.flag=0,void getData(shortMessageIdentifyLoginAction)):($(".btnColor1").removeClass("btnColor"),window.alert("手机号输入错误,请重试~"),!1)}),paramyz={username:"",flag:"",channel:"weixinH5"},getQueryString(),$(".btnDL").on("click",function(){var e=$(".Tel").val(),n=$(".YZcode").val(),o=$(".addcode").val();paramDL.username=e,paramDL.verification=n,paramDL.recommendman=o,getDataDL(loginResultLoginAction)}),paramDL={username:"",verification:"",channel:"weixinH5",gasno:"92",recommendman:""},$(".btndown").on("click",function(){var e=navigator.userAgent.toLowerCase();/iphone|ipad|ipod/.test(e)?window.location.href="https://itunes.apple.com/cn/app/%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%8A%A0%E6%B2%B9%E7%AB%99/id962272538?mt=8":/android/.test(e)&&(window.location.href="http://app.qq.com/#id=detail&appid=1104434805")});