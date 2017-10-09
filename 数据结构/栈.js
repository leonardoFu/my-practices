function Stack () {
  this.stackStore = [];
  this.top = 0;
}

Stack.prototype.push = function (el) {
  this.stackStore[this.top++] = el;
}

Stack.prototype.pop = function () {
  return this.stackStore[--this.top];
}

Stack.prototype.peek = function () {
  return this.stackStore[this.top - 1];
}

Stack.prototype.clear = function () {
  this.stackStore = [];
  this.top = 0;
}

Stack.prototype.length = function () {
  return this.top;
}

//栈的应用

function convertBase(num, base) {
  var numStack = new Stack();
  do{
    numStack.push(num % base);
    num = ~~(num / base);
  }while(num > 0);

  let converted = '';
  while(numStack.length()) {
    converted += numStack.pop();
  }
  return converted;
}
convertBase(20, 2);
