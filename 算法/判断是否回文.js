/**
 * 检查回文，我的方法
 * 我写出来的算法总是很“常规”思路
 * @param  {String} str 需要检测的字符串
 * @return {Boolean}     是或否
 */
function checkPalindrom(str){
	var flag,temp = str.split('');
	var len = temp.length;

	temp.forEach(function(v, i){
		flag = v === temp.slice((i * -1 - 1), len)[0];
	})

	return flag;
}
console.log(checkPalindrom('asdsa'))


/**
 * 看看人家的方法多好
 * @param  {String} str 需要检测的字符串
 * @return {Boolean}     是或否
 */
function checkPalindrom(str) {
	return str == str.split('').reverse().join('');
}