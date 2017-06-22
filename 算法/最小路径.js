/**
 * 精简路径问题,将相邻的 相反方向看作无效方向并清除
 * @param  {Array} arr 取值为"SOUTH"|"NORTH"|"EAST"|"WEST"
 * @return {[type]}     [description]
 */
function dirReduc(arr) {
	arr.reduce((pre, cur, idx, array) => {
		if (pre === pairs[cur]) {
			let pos = idx - 1;
			array.splice(pos， 2);
		}
	})
	return arr;
}
const pairs = {
	"NORTH": "SOUTH",
	"SOUTH": "NORTH",
	"EAST": "WEST",
	"WEST": "EAST"
}

