function calcprimeNum(range){
	var result = [];
	while(result.length < range){
		result.push(result.length + 1);
	}
	for(var i = 2; i * i <= range; i++){
		result = result.filter(function(val){
			return (val % i !== 0 || val === i) && val !== 1;
		})
	}
	return result;
}
console.log(calcprimeNum(1000));
