/**
 * @param  {[str]} v1 [版本号1，格式：patt1 or 2 or 3]
 * @param  {[str]} v2 [同上]
 * @return {[number]} result [v1-v2 最高级版本相差数]
 * @author [maddff]
 */
function versionCompare(v1, v2) {
	/*
	测试：   '1.12.345', '1.32.654', '3.22.7', '3.3.3.3.3'
			'2.3.3a', '2.4.3b', '2.3.3b'
			'1.1.1 beta', '2.2.2 beta'
			'v1.2.2.2', '1.v2.2.2', '1.1.1aa'
			versionCompare('1.12.345', '1.32.654');
			versionCompare('1.32.654', '3.22.7');
			versionCompare('3.22.7', '3.3.3.3.3');
			versionCompare('2.3.3a', '2.4.3b');
			versionCompare('2.4.3b', '2.3.3b');
			versionCompare('2.3.3a', '2.3.3b');
			versionCompare('1.1.1 beta', '2.2.2 beta');
			versionCompare('v1.2.2.2', '1.v2.2.2');
			versionCompare('1.v2.2.2', '1.1.1aa');
	 */
	if(v1 && v2) {
		var patt1 = /^(\d+)((\.(\d+))*)$/;	//1.1.1
		var patt2 = /^(\d+)((\.(\d+))*)([a-z]+)$/;  //(1,1,1a || 1.1.1b) && !1.1.1ab 
		var patt3 = /^(\d+)((\.(\d+))*)(\sbeta)$/	//1.1.1 beta

		var p1v1 = patt1.test(v1);
		var p2v1 = patt2.test(v1);
		var p3v1 = patt3.test(v1);
		var p1v2 = patt1.test(v2);
		var p2v2 = patt2.test(v2);
		var p3v2 = patt3.test(v2);

		if(p1v1 && p1v2){
			return compare(v1, v2);
		} else if((p1v1 || p2v1 || p3v1) && (p1v2 || p2v2 || p3v2)){
			if(p2v1 && p2v2){
				return compare(toNumStr(v1), toNumStr(v2));
			} else if(p3v1 && p3v2) {
				return compare(v1.replace(' beta', ''), v2.replace(' beta', ''));
			} else {
				console.log('版本号 1 为' + v1);
				console.log('版本号 2 为' + v2);
				return compare(v1.replace(/^[a-z]|(\sbeta)/, ''), v2.replace(/^[a-z]|(\sbeta)/, ''));
			}
		} else {
			console.log('版本号输入有误！');
			return false;
		}
	} else {
		console.log('版本号不能为空！');
		return false;
	}

	/**
	 * @param  {[str]} str1 [标准格式版本号 e.g.:'1.1.1']
	 * @param  {[str]} str2 [同上]
	 * @return {[number]}  [最高级相差结果数]
	 */
	function compare(str1,str2) {
		var arr1 = str1.split('.'),
		  arr2 = str2.split('.');
		var minLength = Math.min(arr1.length, arr2.length),
		  item = 0, result = 0;
		for (var i = 0; i < minLength; i++) {
			result = arr1[i] - arr2[i];
			if (!result) {
				continue;
			} else {
				return result;
			}
		}
		return 0;
	}

	/**
	 * @param  {[str]} str [带字母的版本号 e.g.: ‘1.1.1a’]
	 * @return {[type]}  [将最后一位字母转ASCii，并'加'上去]
	 */
	function toNumStr(str) {debugger
		var arr = str.split('.');
		var end = arr[arr.length-1];
		
		var endNums = Number(end.substr(0,end.length-1));
		var endCharASCii = end.charCodeAt(end.length-1);
		arr[arr.length-1] = (endNums + endCharASCii) + '';

		return arr.toString().replace(/,/g, '.');
	}
}

var test = versionCompare('1.12.345', '1.32.654');
console.log(test);
test = versionCompare('1.32.654', '3.22.7');
console.log(test);
test = versionCompare('3.22.7', '3.3.3.3.3');
console.log(test);
test = versionCompare('2.3.3a', '2.4.3b');
console.log(test);
test = versionCompare('2.4.3b', '2.3.3b');
console.log(test);
test = versionCompare('2.3.3a', '2.3.3b');
console.log(test);
test = versionCompare('1.1.1 beta', '2.2.2 beta');
console.log(test);
test = versionCompare('v1.2.2.2', '1.v2.2.2');
console.log(test);
test = versionCompare('1.v2.2.2', '1.1.1aa');
console.log(test);