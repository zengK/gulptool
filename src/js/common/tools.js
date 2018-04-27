//封装公用的方法
var sessionID = localStorage.getItem('sessionID'); 
//getCookie('sessionID');

unescape(sessionID);

var Telphone = localStorage.getItem('Telphone');
//getCookie('Telphone');
unescape(Telphone);

//var payName = getCookie('payname');
//unescape(payName);

//var stationid = getCookie('stationid');
//unescape(stationid);

//var wlTitle = getCookie('wlTitle');
//unescape(wlTitle);

//var balancetype = getCookie('balancetype');
//unescape(balancetype);

//var paytype = getCookie('paytype');
//unescape(paytype);
//
//var vippay2 = getCookie('vippay2');
//unescape(vippay2);

var postAjax = function(option) {
    $.ajax({
        type: "post",
        url: option.server,
        dataType: 'json',
        data: option.param
    }).done(function(result) {
        if ($.isFunction(option.fun1)) {
            option.fun1(result);
        }
    }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
        if ($.isFunction(option.fun2)) {
            option.fun2(XMLHttpRequest);
        }
    })
}


// 设置Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + escape(cvalue) + "; expires=" + expires;
}

// 获取Cookie
function getCookie(name) {
    if (!name) {
        return null;
    }

    var cookies = document.cookie ? document.cookie.split('; ') : [];
    var value;

    for (var i = 0, len = cookies.length; i < len; i++) {
        var parts = cookies[i].split('=');
        if (parts) {
            if (name && (name == parts[0])) {
                value = parts[1];

                return (value ? unescape(value) : null);
            }
        }
    }

    return null;
}

/*删除Cookie*/
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/*可设置日期的Cookie*/
var setCookieDate = function(name, value, time) {
    var strSec = this.getSec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strSec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/*设置Cookie过期时间
 *数字+d：天
 *数字+h：时
 *数字+d：秒
 */
var getSec = function(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
    return null;
}
//alert(openId);
