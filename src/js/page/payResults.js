//var param=decodeURI(window.location.search).slice(1);
var url=window.location.href;
var UrlArr = GetUrl(url);

var ordernum= localStorage.getItem('ordernum');
//getCookie('orderNUM')
var id=localStorage.getItem('orderID');
//getCookie('orderID')
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var param={
	"sessionid":sessionID,
	"channel":channel,
	"id":id,// "订单id，整型"
	"ordernum":ordernum,// "订单编号，String型
	"safepassword":"",
	"source": source//
}
getDataConfirm(confirmPaymentPaymentPageAction);
//确认订单
function getDataConfirm(serverUrl) {
	postAjax({
		server: serverUrl,
		param: {
			param: JSON.stringify(param),
			version:'weixin-1.1',
		},
		fun1: function(res) {
			if(!res.errorcode){
					$('.payMoey').html('￥'+UrlArr.total_amount);
					$('.liR1').html(res.num);
					if(res.discount==0){
						var discount=res.discount+'.00'
					}
					$('.liR2').html('￥'+discount);
					$('.liR3').html(res.score);
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
				  		minpay:data2.minpay,//最小限制额度
				  		limitHour:data2.limitHour
				  	})
				};
				var gettpl = document.getElementById('YHList').innerHTML;
				laytpl(gettpl).render(data, function(html){
				  document.getElementById('ListUl').innerHTML = html;
				});
			}else if(res.errorcode==886){
					window.alert(res.msg);
					localStorage.setItem('indexUrL',indexUrL)
//					setCookie('indexUrL',indexUrL,1000000);
					window.location.href='login.html';
			}else{
				window.alert(res.msg);
			}
				
		},
		fun2: function(res){
			$('.login').hide();
				window.alert(res.msg);
		}
	})
}
$('.btnFH').on('click',function(){
	var indexUrL= localStorage.getItem('indexUrL');
	alert(indexUrL);
	window.location.href=indexUrL;
})
