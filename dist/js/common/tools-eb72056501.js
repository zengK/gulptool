var sessionID=localStorage.getItem("sessionID");unescape(sessionID);var Telphone=localStorage.getItem("Telphone");unescape(Telphone);var postAjax=function(o){$.ajax({type:"post",url:o.server,dataType:"json",data:o.param}).done(function(e){$.isFunction(o.fun1)&&o.fun1(e)}).fail(function(e,t,n){$.isFunction(o.fun2)&&o.fun2(e)})};function setCookie(e,t,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var i="expires="+o.toUTCString();document.cookie=e+"="+escape(t)+"; expires="+i}function getCookie(e){if(!e)return null;for(var t,n=document.cookie?document.cookie.split("; "):[],o=0,i=n.length;o<i;o++){var s=n[o].split("=");if(s&&e&&e==s[0])return(t=s[1])?unescape(t):null}return null}function delCookie(e){var t=new Date;t.setTime(t.getTime()-1);var n=this.getCookie(e);null!=n&&(document.cookie=e+"="+n+";expires="+t.toGMTString())}var setCookieDate=function(e,t,n){var o=this.getSec(n),i=new Date;i.setTime(i.getTime()+1*o),document.cookie=e+"="+escape(t)+";expires="+i.toGMTString()},getSec=function(e){var t=1*e.substring(1,e.length),n=e.substring(0,1);return"s"==n?1e3*t:"h"==n?60*t*60*1e3:"d"==n?24*t*60*60*1e3:null};