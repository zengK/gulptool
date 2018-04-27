// window.alert = function(name){
//   var iframe = document.createElement("IFRAME");
//   iframe.style.display="none";
//   iframe.setAttribute("src", 'data:text/plain,');
//   document.documentElement.appendChild(iframe);
//   window.frames[0].window.alert(name);
//   iframe.parentNode.removeChild(iframe);
// };

// window.confirm = function (message) {
//    var iframe = document.createElement("IFRAME");
//    iframe.style.display = "none";
//    iframe.setAttribute("src", 'data:text/plain,');
//    document.documentElement.appendChild(iframe);
//    var alertFrame = window.frames[0];
//    var result = alertFrame.window.confirm(message);
//    iframe.parentNode.removeChild(iframe);
//    return result;
//  };
//金额验证
function amount(th){
    var regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
    ];
    for(i=0; i<regStrs.length; i++){
        var reg = new RegExp(regStrs[i][0]);
        th.value = th.value.replace(reg, regStrs[i][1]);
    }
}

var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var urlHistory,channel,source;
if (isWeixin) {
	channel='weixinH5';
	source='Weixin';
	urlHistory='http://phptest.qiukwi.com/public/index.php?m=ServiceNo&c=GetOpenId&a=index';
	
}else{
	channel='zhifubao';
	source='zhifubao';
	urlHistory='login.html'
}

//获取用户所在省市
var province,city;
//dz();
//function dz() {
//	$.getScript('https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
//		if(remote_ip_info.ret == '1') {
//			province=remote_ip_info.province+'省';
//			city=remote_ip_info.city+'市';
//			province=sessionStorage.setItem('province',province);
//			city=sessionStorage.setItem('city',city);
//			console.log(remote_ip_info.province);
//			console.log(remote_ip_info.city);
//		} else {
//			alert('没有找到匹配的IP地址信息！');
//		}
//	});
//}
