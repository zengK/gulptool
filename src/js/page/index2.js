var sessionID=localStorage.getItem('sessionID');
var Telphone = localStorage.getItem('Telphone');
var openId = localStorage.getItem('openid');

var province,city

var indexUrL=decodeURI(window.location.href);

localStorage.setItem('indexUrL',indexUrL);
var paramCode = {
	"codeText":"",
	"source":source
}
is_weixn();
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
		if(!sessionID&&!Telphone){
			$('.chanegCover').css('display','none');
			$('.paytext').css('display','inline-block');
			window.alert('亲请先登录哦');
//			window.location.href='http://weixin.qiukwi.com/index.php?m=ServiceNo&c=GetOpenId&a=index';
			window.location.href=urlHistory;
			//window.location.href="login.html";
		}else{

			$('.chanegCover').css('display','inline-block');
			$('.paytext').css('display','none');
			var indexUrL= localStorage.getItem('indexUrL');
			unescape(indexUrL);
			param =decodeURI(window.location.href).split('?')[1]
			if(param.indexOf(":") > 0 ){
				var paramjy=JSON.parse(param);
				$('.name').html(paramjy.n);
				gascode=paramjy.s;
				employeeno=paramjy.e;
				gasno=paramjy.g;
			}else{
				//str = str.match(/aaa(\S*)fff/)[1];  
				param=param.match(/{(\S*)}/)[1];
				paramCode.codeText=param;
				getDataCode(getCodeText);
			}
		}
    } else {  

		$('.chanegCover').css('display','inline-block');
		$('.paytext').css('display','none');
		var indexUrL= localStorage.getItem('indexUrL');
//		getCookie('indexUrL');
		unescape(indexUrL);
		param =decodeURI(window.location.href).split('?')[1]
		if(param.indexOf(":") > 0 ){
			var paramjy=JSON.parse(param);
			$('.name').html(paramjy.n);
			gascode=paramjy.s;
			employeeno=paramjy.e;
			gasno=paramjy.g;
		}else{
			param=param.match(/{(\S*)}/)[1];
			paramCode.codeText=param;
			getDataCode(getCodeText);
			
		}
    }  
}  
var gascode,employeeno,param;
//获取二维码信息
function getDataCode(serverUrl) {
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramCode),
			version:'weixin-1.1'
		},
		fun1: function(res) {
			if(res.errorcode=='0'){
				//加油站名字
				$('.name').html(res.code.n);
				//加油员编号
				gascode=res.code.s;
				employeeno=res.code.e;
			}else{
				alert(res.msg)
			}
				
		},
		fun2: function(res){
			alert(JSON.stringify(res))
		}
	})
}



//选择油号
var yoNumS=$('.yoNum');
var yonum='';
var yoNumLi=$('.numLi');
var yonumli='';



$('.yoNum').on('click',function(){
	$('.numList').css("display","none");
	$('.yoMore').html('更多')
   var item = $(this).index();  //获取索引下标 也从0开始
     for (var i=0;i<yoNumS.length;i++) {
		yoNumS.removeClass('active');
	}
   	$(this).addClass('active');
   	yonum=$(this).html();
   	
   	if(yonum=='0#'){
   		yonum='0';
   		
   	}else if(yonum=='95#'){
   		yonum='95';
   	}else if(yonum=='92#'){
   		yonum='92';
   	}else if(yonum=='98#'){
   		yonum='98';
   	}else if(yonum=='-10#'){
   		yonum='-10';
   	}else if(yonum=='-20#'){
   		yonum='-20';
   	}else if(yonum=='-35#'){
   		yonum='-35';
   	}
   	$('.yoNumZF').html(yonum);
   	$('.btnZF').attr('disabled');
   	$('.paymoney').val('');
	$('.chanegCover').html('选择优惠券');
   	$('.btnZF').css('background','#f8c478');
	$('.btnZF').val('支    付');
   	
})

function tiemout(){
	$('.Pop-ups').css('display','block');
	var tiem = setTimeout(function(){
		$('.Pop-ups').css('display','none');
	},1500)
}

//输入金额计算实际金额

var set='';
$('.paymoney').on('keydown', function() {
	var yonum=$('.yoNumZF').html();
	if(yonum==''){
		$('.paymoney').val('');
		$('.Pop-ups').html('请选择油号');
		tiemout();
		return false;
	}
	clearTimeout(set);
	
});


$('.paymoney').on('keyup', function() {
	var yonum=$('.yoNumZF').html();
	if(yonum==''){
		$('.paymoney').val('');
		return false;
	}
	
//	var yonum = $('.yoNumZF').html();
	var tex=$('.paymoney').val();
	var ret= /^[0-9|,|,]*\.?[0-9]{0,2}$/g;
	if(!ret.test(tex)){
   		$('.paymoney').val('');
//		$('.Pop-ups').html('请选择油号');
		$('.Pop-ups').html('金额格式错误');
		tiemout();
   		
   		clearTimeout(set);
   		$('.chanegCover').html('选择优惠券');
   		$('.btnZF').css('background','#f8c478');
		$('.btnZF').val('支    付');
		$('.paymoney').val('');
		$('.login').hide();
// 		tiemout();
   		return false;
	}
	 set=setTimeout(function(){
//	 	console.log(gascode,employeeno);
		if(tex==''){
	   		tex='0';
	   		$('.paymoney').val('');
	   		$('.btnZF').attr('disabled');
			$('.btnZF').css('background','#f8c478');
			$('.chanegCover').html('选择优惠券');
			$('.btnZF').val('支    付');
			return false;
			paramMoney.gasno=yonum;
			paramMoney.stationno = gascode;
			paramMoney.employeeno = employeeno;
			paramMoney.productmoney='0';
			paramMoney.couponid='0';
			getDataMoney(factMoneyPaymentPageAction);
	   	}else if(parseFloat(tex)<100){
		   	paramMoney.productmoney=tex;
		   	$('.couponid').html('0');
		   	paramMoney.employeeno = employeeno;
		   	paramMoney.gasno = yonum;
		   	
		   	paramMoney.stationno = gascode;
		   	paramMoney.couponid='0';
			getDataMoney(factMoneyPaymentPageAction);
	   	}else{
//	   		var couponid =$('.couponid').html();
//	   		console.log(couponid);
	   		paramMoney.couponid='0';

	   		paramMoney.stationno = gascode;
	   		paramMoney.employeeno = employeeno;
	   		paramMoney.gasno = yonum;
	   		paramMoney.productmoney=tex;
			getDataMoney(factMoneyPaymentPageAction);
	   	}
	
	},1500)
});


//没有登录的时候跳回登录页
$('.paytext').on('click',function(){
	//正式
//	window.location.href='http://weixin.qiukwi.com/index.php?m=ServiceNo&c=GetOpenId&a=index';
	//测试
	window.location.href=urlHistory;
})
var tex=$('.paymoney').val();
//点击时候拉去优惠券列表
var off=true;

	
$('.chanegCover').on('click',function(){
	var val=$('.chanegCover').html();
		if(val=='您今天已经使用过优惠券'){
			alert('您今天已经使用过优惠券');
			return false;
		}else{
			var tex=$('.paymoney').val();
			var yonum=$('.yoNumZF').html();
			if(yonum==''){
				$('.Pop-ups').html('请选择油号');
				tiemout();//弹窗
				$('.btnZF').val('支    付');
				return false;
			}else if(tex==''){
				tiemout();
				$('.btnZF').val('支    付');
				$('.Pop-ups').html('请输入金额');
				return false;
			}
			paramlist.gasno=yonum;
			paramlist.productmoney=tex;
			paramlist.stationno=gascode;
			getDatalist(getCouponsListCouponsAction);
			$('.Cover').show();
		}
})


//设置变量存储优惠券id
paramlist = {
	"username":Telphone,
	"channel":channel,
	"sessionid":sessionID,//用户名，登录状态需要提供，字符串
    "pageindex": 0,	 //0,10 ,20,30  起始条数，int型
    "pagesize" : 100,  //返回条数，int型
    "inputflag" : 1,  //从哪个入口进入优惠券，int型
    "gasno":'',
    "stationno":'',		//加油站编号，字符串
	"productmoney":'100',
	"source":source
}
//获取优惠券列表
function getDatalist(serverUrl) {
	$('.login').show();
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramlist),
			version:'weixin-1.1'
		},
		fun1: function(res) {
			
			if(!res.errorcode){
				$('.login').hide();
				var discount = res.coupons;
				var len = parseInt(discount.length);
				var data=[];
				for(var i=0;i<len;i++){					
					var data2 = discount[i];
				  	data.push({
				  		id:data2.id, //加油券id
				  		limit:data2.limit,//限制金额度
                        limits:data2.limits,
				  		type:data2.type,	//优惠券类型：0通用券，1限额券，2限时券，3限加油站券，4限油号券
				  		deadline: data2.deadline,//日期
				  		value:data2.value,//优惠金额
				  		minpay:data2.minpay//最小限制额度
				  	})
				};
				var gettpl = document.getElementById('demo').innerHTML;
				laytpl(gettpl).render(data, function(html){
				  document.getElementById('List').innerHTML = html;
				});
				
				$('.login').hide();
				var couponS=$('.coupon');
				$('.coupon').on('click',function(){
				   	var item = $(this).index();  //获取索引下标 也从0开始
				    for (var i=0;i<couponS.length;i++) {
						couponS.removeClass('active');
					}
				   	$(this).addClass('active');
				// alert(text);
					
					var r=confirm("确认使用此优惠券吗");
					if (r==true)
					  {
					  	// $('.Cover').hide();
					  	var discountID=$(this).find('.typeid').html();
					  	
					   	var tex=$('.paymoney').val();
					   	var yonum = $('.yoNumZF').html();
					   	
					   	paramMoney.gasno=yonum;
						paramMoney.productmoney=tex;
						paramMoney.couponid=discountID;
//						$('.couponid').html(discountID);
						paramMoney.stationno = gascode;
	   					paramMoney.employeeno = employeeno;
//	   					$('.chanegCover').html($(this).find('.typeid').html());
						getDataMoney(factMoneyPaymentPageAction);
					  }
					else
					  {
					  	var tex=$('.paymoney').val();
					   	var yonum = $('.yoNumZF').html();
					  	paramMoney.gasno=yonum;
						paramMoney.productmoney=tex;
						paramMoney.couponid='-1';
//						$('.couponid').html(discountID);
						paramMoney.stationno = gascode;
	   					paramMoney.employeeno = employeeno;
						getDataMoney(factMoneyPaymentPageAction);
					 	$('.chanegCover').html('不使用优惠券');
					 	
					  	$('.Cover').hide();
					  }
				})
				
			}else if(res.errorcode==886){
//					window.location.href='login.html';
					//正式
//					window.location.href='http://weixin.qiukwi.com/index.php?m=ServiceNo&c=GetOpenId&a=index';
					//测试
					alert(res.msg);
					window.location.href=urlHistory;
			}
		},
		fun2: function(res){
			$('.login').hide();
		}
	})
}


$('.close').on('click',function(){
	$('.Cover').hide();
})

//计算实际输入金额
//getDataMoney(factMoneyPaymentPageAction);
paramMoney={
	"username":Telphone,
	"channel":channel,
	"sessionid":sessionID,//用户名，登录状态需要提供，字符串
	"stationno":'',//加油站编号，字符串
	"employeeno":'',//加油员编号
	"gasno": '',		//加油油号，字符串
	"productmoney":'',		//油品原始金额，浮点型，元",
	"couponid":'0' ,//优惠券id，整型，可无 // 微信传  “ -1 “
	"paytype":2, //支付方式 String类型 可无
	"source":source
}

var factmoney='';
function getDataMoney(serverUrl) {
	$('.login').show();
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramMoney),
			version:'weixin-1.1'
			
		},
		fun1: function(res) {
			if(!res.errorcode){
				$('.login').hide();
                $('.Cover').hide();
				factmoney=res.factmoney;
				$('.couponid').html(res.couponsid);
				$('.chanegCover').html(res.couponsname);
				$('.btnZF').removeAttr('disabled');
				$('.btnZF').css('background','#ff9900');
				$('.btnZF').val("待支付"+res.factmoney+"元");

			}else if(res.errorcode==886){
					//正式
//					window.location.href='http://weixin.qiukwi.com/index.php?m=ServiceNo&c=GetOpenId&a=index';
//					window.location.href='login.html';
					//测试
					window.location.href=urlHistory;
			}else {
				alert(res.msg);
                $('.login').hide();
                $('.chanegCover').html('选择优惠券');
                $('.couponid').html();
                $('.Cover').show();

			}
		},
		fun2: function(res){
			$('.login').hide();
		}
	})
}

//submitPaymentPaymentPageAction
//限制充值次数，及充值结果返回时的情况，进行封装回调
$('.btnZF').on('click', function() {
	$('.btnZF').removeAttr('disabled');
	$('.btnZF').css('background','#f8c478');
	
	var yoNumZF=$('.yoNumZF').html();
	paramZF.gasno=yoNumZF;
	var couponid=$('.couponid').html();
	paramZF.couponid=couponid;
	
	var tex=$('.paymoney').val();
	
	if(tex==''){
		$('.paymoney').val('');
		$('.Pop-ups').html('请输入金额');
		tiemout();
		return false
	}else{
		paramZF.productmoney=tex;
	}
	paramZF.factmoney=factmoney;
	paramZF.stationno=gascode;
	paramZF.employeeno=employeeno;
	$('.btnZF').attr('disabled','disabled');
	$('.btnZF').css('background','#f8c478');
	getDataZF(submitPaymentPaymentPageAction);
	
})

paramZF = {
	"username":Telphone,
	"channel":channel,
	"sessionid": sessionID,
	"stationno":'',		//加油站编号，字符串
	"employeeno":'',		//加油员编号，字符串
	"gasno": '',				//加油油号，字符串
	"openid":openId,
	"couponid": '0',//优惠券id，整型 // 微信传 -1
	"productmoney": '',		//油品原始金额，浮点型，元",
	"factmoney": '',		//实际需要支付金额，String型，元,
	"paytype": 2,	//支付方式，整型，1：支付宝；2：微信；3：银行卡，4：钱包支付，6：线上加油卡支付
	"source":source
}

var orderID='';
var orderNUM='';
//var version='';
//var source='';
function getDataZF(serverUrl) {
	//判断是微信还是支付宝打开的
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	if (isWeixin) {
		paramZF.paytype=2;
		postAjax({
			server: serverUrl,
			param: {
				param: JSON.stringify(paramZF),
				version:'weixin-1.1'
			},
			fun1: function(res) {
				if(res.errorcode == 0) {
					orderID=res.id;
					orderNUM=res.num;
					var depositId =res.depositid;
					localStorage.setItem('depositID',depositId);
					localStorage.setItem('orderID',orderID);
					localStorage.setItem('orderNUM',orderNUM);
					
//					setCookie('depositID',depositId,1000000);
//					setCookie('orderID',orderID,1000000);
//					setCookie('orderNUM',orderNUM,1000000);
					function onBridgeReady(){
					   	WeixinJSBridge.invoke(
					       	"getBrandWCPayRequest", {
				           	"appId": "wx1082c6b85beeb5dd",     //公众号名称，由商户传入     
				           	"timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数     
				           	"nonceStr" : res.nonceStr, //随机串     
				           	"package" : 'prepay_id='+res.prepayId,     
		           			"signType" : "MD5",         //微信签名方式：     
				           	"paySign" :res.sign //微信签名 
					       },
					       function(res){     
					           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					         
								window.location.href='payResults.html?orderID='+orderID+'&orderNUM='+orderNUM
//								getDataConfirm(confirmPaymentPaymentPageAction);
					           }else if(res.err_msg=='get_brand_wcpay_request:cancel'){
					           		$('#payMoney').val('');
					           		$('.btnZF').val("待支付0元");
					           		$('.btnZF').css('background-color','#f8c478');
					           }else if(res.err_msg=='get_brand_wcpay_request:fail'){
					           		alert('支付失败,请重新支付');
					           		$('#payMoney').val('');
					           		$('.btnZF').css('background-color','#f8c478');
					           		$('.btnZF').val('待支付0元');
					           }  // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
												       
					       }
					   ); 
					}
					if (typeof WeixinJSBridge == "undefined"){
					   if( document.addEventListener ){
					       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					   }else if (document.attachEvent){
					       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
					       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					   }
					}else{
					   onBridgeReady();
					}
				}
			},
			fun2: function() {}	
		})
	}else{
		paramZF.paytype=1;
		postAjax({
			server: serverUrl,
			param: {
				param: JSON.stringify(paramZF),
				version:'weixin-1.1'
			},
			fun1: function(res) {
				if(res.errorcode == 0) {
					orderID=res.id;
					orderNUM=res.num;
					localStorage.setItem('orderID',orderID);
					localStorage.setItem('orderNUM',orderNUM);
//					setCookie('orderID',orderID,1000000);
//					setCookie('orderNUM',orderNUM,1000000);
					console.log(res);
					var name=$('.name').html();
					aliPaySubmitH5Pay(res,Telphone,sessionID,1,name)
				}
			},
			fun2: function() {}	
		})
	}
	
}

//调取支付宝支付
function aliPaySubmitH5Pay(data, shouji, sessionid,payUse,name) {
	var paramStr = '{"username":"' + shouji + '","sessionid":"' + sessionid + '","WIDout_trade_no":"' + data.num + '","WIDsubject":"' + name + '","WIDtotal_amount":"' + data.factmoney + '","body":"油帮帮加油支付","payUse":"' + payUse + '","quit_url":"https://dev.yobangbang.com/wxpayweb/payResults.html","return_url":"https://dev.yobangbang.com/wxpayweb/payResults.html"}';
	var dataStr='param='+paramStr+'&version=weixinh5';
	$.ajax({
		type: "POST",
		url: 'https://dev.yobangbang.com/ybb/aliPaySubmitH5PayServerAction',
		data: dataStr,
		async: true,
		success: function(data) {
			data = JSON.parse(data);
			console.log(data);
			$('.alipay').append(data.form)
		}
	})
}

getPosBaidu();
paramBackdrop={
	"province":"",
 	"city":"",
	"username":Telphone,
 	"channel":channel,
	"source":"Weixin",
 	"sessionid":sessionID,//用户名，登录状态需要提供，字符串
	"source": source
}

//是否展示优惠弹窗
function getDataList(serverUrl) {
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(paramBackdrop),
			version:'weixin-1.2'
		},
		fun1: function(res) {
			//处理优惠券展示
			if(res.errorcode==0){
				var discount = res.coupons;
				var len = parseInt(discount.length);
//				isdispaly
				if(len==''){
					$('.mui-backdrop').css('display','none')
				}else{
					$('.mui-backdrop').css('display','block')
				}
				
				var data=[];
				for(var i=0;i<len;i++){					
					var data2 = discount[i];
				  	data.push({
				  		id:data2.id, //加油券id
				  		limit:data2.limit,//限制金额度
				  		limits:data2.limits,
				  		type:data2.type,	//优惠券类型：0通用券，1限额券，2限时券，3限加油站券，4限油号券
				  		deadline: data2.deadline,//日期
				  		value:data2.value,//优惠金额
				  		minpay:data2.minpay//最小限制额度
				  	})
				};
				var gettpl = document.getElementById('YHList').innerHTML;
				laytpl(gettpl).render(data, function(html){
				  document.getElementById('ListUl').innerHTML = html;
				});
			}else if(res.errorcode==886){
					window.location.href=urlHistory;
			}else{
				alert(res.msg)
			}
				
			
			
		},
		fun2: function(res){
			alert(JSON.stringify(res))
		}
	})
}



function getPosBaidu() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function getinfo(position){
        city = position.address.city; //获取城市信息
        province = position.address.province;
        paramBackdrop.province=province;
     	paramBackdrop.city=city;
       	getDataList(gainCouponCouponsAction);
    }, function(e) {
        alert("获取百度定位位置信息失败");
    }, {provider: 'baidu'});
}




//跳转到APP下载
$('.btn').on('click',function(){
	var ua = navigator.userAgent.toLowerCase();    
    if (/iphone|ipad|ipod/.test(ua)) {
//   alert("iphone");        
	window.location.href="https://itunes.apple.com/cn/app/%E4%B8%AD%E5%9B%BD%E9%A2%86%E5%85%88%E7%9A%84%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%8A%A0%E6%B2%B9%E7%AB%99/id962272538?mt=8";
    } else if (/android/.test(ua)) {
   	window.location.href="http://app.qq.com/#id=detail&appid=1104434805"; 
	//getDown('http://phptest.qiukwi.com/qiukui/ybboa/index.php?m=Admin&c=Operation&a=downloadCount');
	}
})
