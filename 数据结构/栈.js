function Stack () {
  this.stackStore = [];
  this.top = 0;
}

this.prototype.push = function (el) {
  this.stackStore[this.top++] = el;
}

this.prototype.pop = function () {
  return this.stackStore[--this.top];
}

this.prototype.peek = function () {
  return this.stackStore[this.top - 1];
}

this.prototype.clear = function () {
  this.stackStore = [];
  this.top = 0;
}

this.prototype.length = function () {
  return this.top;
}
