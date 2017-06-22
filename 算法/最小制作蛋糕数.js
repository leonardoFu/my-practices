/**
 * 根据传入的，制作一个蛋糕需要的食材，和已有的食材计算最多可以做几个蛋糕
 * @param  {Object} recipe    所需食材对象，{ food1: value1, food2: value2 }
 * @param  {Object} available 已有食材对象，格式同上
 * @return {Number}           最多能做出几个蛋糕
 */
function cakes(recipe, available) {
  let result = [];
  //我的解法，使用for in遍历属性
  for(var prop in recipe){
    if (!available[prop]){
      result.push(0)
    } else {
      result.push(Math.floor(available[prop]/recipe[prop]));
    }
  }
  return Math.min(...result);
}

/**
 * 最佳实践
 * 知识点：
 *   1.reduce遍历适合做整个数组的累计计算
 *   2.每次比较当前元素与之前的最小值
 *   3.Infinity是内置对象，表示无穷大
 *   4.NaN || 0 == 0
 * 
 */
function cakes(recipe, available) {
  return Object.keys(recipe).reduce(function(val, ingredient) {
    return Math.min(Math.floor(available[ingredient] / recipe[ingredient] || 0), val)
  }, Infinity);

}