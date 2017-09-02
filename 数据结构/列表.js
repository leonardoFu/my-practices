function List(){
  this.listStore = [];
  this.size = 0;
  this.pos = 0;
  if (Array.isArray(arguments[0])) {
    this.listStore = arguments[0];
    this.size = arguments[0].length;
  } else if (arguments.length > 2) {
    this.listStore = [].slice.call(arguments, 0);
    this.size = arguments.length;
  }
}

List.prototype.toString = function () {
  return this.listStore.toString();
}

List.prototype.clear = (){
  this.listStore = [];
  this.size = 0;
  this.pos = 0;
}

List.prototype.append = function (el) {
  if(Array.isArray(newItem)){
    this.listStore.push.apply(this.listStore, newItem);
  }else if(arguments.length > 1){
    this.listStore.push.apply(this.listStore, [].slice.call(arguments, 0));
  } else {
    this.listStore.push(el);
  }
  this.size = this.listStore.length;
}

List.prototype.find = function (el) {
  for(val i = 0; i < this.listStore.length; i++){
    if(this.listStore[i] === el){
      return i;
    }
  }
  return -1;
}

List.prototype.remove = function (el) {
  let delPos = this.find(el);
  if(delPos >= 0){
    this.size--;
    this.pos = this.pos === delPos ? delPos - 1 : this.pos;
    return this.listStore.splice(delPos, 1);
  }
}

List.prototype.length = function () {
  return this.listSize;
}

List.prototype.contains = function (el) {
  return List.find(el) >= 0;
}

List.prototype.front = function () {
  this.pos = 0;
}

List.prototype.currPos = function () {
  return this.pos;
}

List.prototype.getElement = function () {
  return this.listStore[this.pos];
}

List.prototype.front = function () {
  this.pos = 0;
}

List.prototype.prev = function () {
  this.pos--;
}

List.prototype.next = function () {
  this.pos++;
}
