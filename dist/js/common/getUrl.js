function GetUrl(){var r={};if(0<(n=window.location.href).indexOf("?")){var n;if(0==function(r,n){for(var i=0,t=0;-1!=(t=r.indexOf(n,t))&&(i++,t+=n.length),-1!=t;);return i}(n=n.split("?")[1],"&")){var i=n.split("&");e=t="",t=n.substr(0,n.indexOf("=")),e=n.substr(n.indexOf("=")+1),r[t]=e}else{i=n.split("&"),r={};for(var t,e,f=0;f<i.length;f++)e=t="",t=i[f].substr(0,i[f].indexOf("=")),e=i[f].substr(i[f].indexOf("=")+1),r[t]=e}return r}}