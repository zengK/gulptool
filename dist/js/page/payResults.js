var url=window.location.href,UrlArr=GetUrl(url),ordernum=localStorage.getItem("ordernum"),id=localStorage.getItem("orderID"),ua=navigator.userAgent.toLowerCase(),isWeixin=-1!=ua.indexOf("micromessenger"),param={sessionid:sessionID,channel:channel,id:id,ordernum:ordernum,safepassword:"",source:source};function getDataConfirm(e){postAjax({server:e,param:{param:JSON.stringify(param),version:"weixin-1.1"},fun1:function(e){if(e.errorcode)886==e.errorcode?(window.alert(e.msg),localStorage.setItem("indexUrL",indexUrL),window.location.href="login.html"):window.alert(e.msg);else{if($(".payMoey").html("￥"+UrlArr.total_amount),$(".liR1").html(e.num),0==e.discount)var r=e.discount+".00";$(".liR2").html("￥"+r),$(".liR3").html(e.score);r=e.coupons;var i=parseInt(r.length);""==i?$(".mui-backdrop").css("display","none"):$(".mui-backdrop").css("display","block");for(var n=[],o=0;o<i;o++){var t=r[o];n.push({id:t.id,limit:t.limit,limits:t.limits,type:t.type,deadline:t.deadline,value:t.value,minpay:t.minpay,limitHour:t.limitHour})}var a=document.getElementById("YHList").innerHTML;laytpl(a).render(n,function(e){document.getElementById("ListUl").innerHTML=e})}},fun2:function(e){$(".login").hide(),window.alert(e.msg)}})}getDataConfirm(confirmPaymentPaymentPageAction),$(".btnFH").on("click",function(){var e=localStorage.getItem("indexUrL");alert(e),window.location.href=e});