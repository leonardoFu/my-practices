/**
 * 简单的散列
 * @constructor
 */
function HashTable() {
  this.table = new Array(137);
  this.simpleHash(data) {
    var total = 0;
    if(data instanceof String) {
      for(var i = 0; i < data.length; i++) {
        var code = data.charCodeAt(i);
        total += code;
      }
    } else if(data instantceof Number) {
      total = data;
    }
    return total % this.table.length;
  }
  this.put = functoin(data) {
    var pos = this.simpleHash(data);
    this.table[pos] = data;
  }
}
