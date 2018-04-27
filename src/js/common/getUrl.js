//用来获取get方法的值 并转换为json
function GetUrl() {
	var jsons = {},
		jsond = {}
	var url = window.location.href;
	//console.log(url)
	if(url.indexOf('?') > 0) {
		var url = url.split("?")[1];

		function countInstances(mainStr, subStr) {
			var count = 0;
			var offset = 0;
			do {
				offset = mainStr.indexOf(subStr, offset);
				if(offset != -1) {
					count++;
					offset += subStr.length;
				}
			} while (offset != -1)
			return count;
		}

		var num = countInstances(url, '&')

		if(num == 0) {
			var a = url.split('&')
			k = '', v = ''
			k = url.substr(0, url.indexOf('='))
			v = url.substr(url.indexOf('=') + 1)
			jsons[k] = v
		} else {
			var a = url.split('&')
			var jsons = {},
				jsond = {},
				k, v
			for(var i = 0; i < a.length; i++) {
				k = '', v = ''
				k = a[i].substr(0, a[i].indexOf('='))
				v = a[i].substr(a[i].indexOf('=') + 1)
				jsons[k] = v
			}
		}
		return jsons
	}
}
