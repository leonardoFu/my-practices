function Queue() {
  this.dataStore = [];
  this.enqueue = function (el) {
    this.dataStore[this.dataStore.length] = el;
  }
  this.dequeue = function () {
    return this.dataStore.shift();
  }
  this.front = function() {
    return this.dataStore[0];
  }
  this.back = function() {
    return this.dataStore[this.dataStore.length - 1];
  }
  this.toString = function() {
    var retStr = '';
    this.dataStore.forEach(function(v) {
      retStr += v + '\n';
    })
  }
  this.empty = function() {
    return this.dataStore.length === 0;
  }
  this.clear = function() {
    while(!this.empty()) {
      this.dequeue();
    }
  }
}

//基数排序
function redixSort(arr) {
  var result = [];
  var max = 0;
  var index = 1;
  arr.forEach(function(v) {
    var len = v.toString().length
    if(v.toString().length > max) {
      max = len;
    }
  });
  while(index <= max) {
    arr = distribute(arr, index);
    index++;
  }
}

function distribute(arr, digit) {
  var result = [];
  var queues = [];
  while(queues.length < 10) {
    queues.push(new Queue());
  }
  arr.forEach(function(v) {
    if(digit === 1) {
      queues[v % 10].enqueue(v);
    } else {
      var indexNum = v.toString().split('')[v.toString().length - digit]
      ? v.toString().split('')[v.toString().length - digit];
      : 0;
      queues[indexNum].enqueue(v);
    }
  })
  queues.forEach(function(queue) {
    while(!queue.empty()) {
      result.push(queue.dequeue());
    }
  })
  return result;
}
