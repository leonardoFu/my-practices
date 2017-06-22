/**
 * 超市排队结算问题，求最短的结算时间
 * @param  {Array} customers 每个顾客需要的结算时间
 * @param  {Number} n         柜台数量
 * @return {Number}           最短结算时间
 */
function queueTime(customers, n) {
	var queue = new Array(n).fill(0);
	customers.forEach(function(v) {
		var idx = queue.indexOf(Math.min.apply(this, queue));
		queue[idx] += v;
	})
	return Math.max.apply(this, queue);
}
console.log(queueTime([1, 2, 3, 4, 5], 3))