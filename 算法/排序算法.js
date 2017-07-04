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
