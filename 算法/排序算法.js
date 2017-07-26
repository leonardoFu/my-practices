/**
 * 快速排序算法，
 * 使用了es6 提供的解构语法糖
 */
function quickSort(arr){
	if(!arr || arr.length <= 1){
		return arr;
	}

	let pivotIndex = Math.floor((arr.length-1)/2);
	let pivot = arr.splice(pivotIndex,1)[0];
	let left = [],
		right = [];

	arr.forEach((value)=>{
		if (value < pivot) {
			left.push(value);
		} else {
			right.push(value);
		}
	});

	return [...quickSort(left),pivot,...quickSort(right)];
}
/**
 * 冒泡排序
 */
function bubbleSort(arr){
	if(!arr||arr.length<1){
		return ;
	}

	for(let j = arr.length-1;j>0;j--){
		for(let i = 0;i<j;i++){
			if(arr[i]>arr[i+1]){
				let temp ;
				temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
			}
		}
	}

	return arr;
}

/**
 * 直接选择排序
 * 从第一个位置起，每次该位置往后的元素，选取最小值与该位置值交换
 * @param  {array} arr 需要排序的数组
 * @return {array}
 */
function selectSort(arr){
	if(!arr || !arr.length){
		return arr;
	}
	for(var i = 0, len = arr.length - 1; i < len; i++){
		var pos = i;
		for(var j = i + 1; j < len + 1; j++){
			if(arr[pos] > arr[j]){
				pos = j;
			}
		}
		var temp = arr[pos];
		arr[pos] = arr[i];
		arr[i] = temp;
	}

	return arr;
}

function isArray(arr){
	return Object.prototype.toString.call(arr) === '[object Array]';
}

function merge(left, right){
	var result = [];
	if(!isArray(left)){
		left = [left];
	}
	if(!isArray(right)){
		right = [right];
	}
	while(left.length > 0 && right.length > 0){

		if (left[0] < right[0]) {
			result.push(left.shift())
		} else {
			result.push(right.shift())
		}

	}
	return result.concat(left, right);
}

 /**
  * 归并排序
  * 采用分治法，将数组拆分为小的段，再比较合并
  * @param  {Array} arr 需要排序的数组
  * @return {[type]}
  */
function mergeSort(arr){
	var len = arr.length;
	var lim = 0, work = [],
		i,j;
	arr.forEach(function(v){
		work.push(v);
	})
	lim = len;
	work.push([])
	while(lim > 1){
		for(i = 0, j = 0; j < lim; i++, j = j + 2){
			work[i] = merge(work[j], work[j+1]);
		}
		work[i] = [];
		lim = Math.floor((lim + 1) / 2 );
	}
	return work[0]
}

console.log(mergeSort([23,0,32,45,56,75,43,0,34]))




/**
 * 二分法查找
 * @param  {number} obj 需要查询的数值
 * @return {[type]}     [description]
 */
Array.prototype.binarySearch = function(obj) {
	var value = 0;
	var left = 0;
	var right= this.length;

	while(left <= right) {
		var center = Math.floor((left+right)/2);
		if(this[center] == obj) {
			value = center;
			break;
		}
		if(obj < this[center]) {
			right = center - 1;
		}
		else {
			left = center + 1;
		}
	}
	alert(value);
}
