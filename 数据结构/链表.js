function Node(el, next, prev) {
  this.element = el;
  this.next = next ? this.next : null;
  this.prev = prev ? this.prev : null;
}
function LinkedList() {
  this.head = new Node('head');
  this.find = function(el) {
    var current = this.head;
    while(current !== el) {
        current = current.next;
    }
    return current;
  }
  this.insert = function(newEl, prevEl) {
    var preNode = this.find(prevEl);
    if(preNode) {
      var newNode = new Node(newEl);
      newNode.next = preNode.next;
      preNode.next = newNode;
    }
  }
  this.findPrev = function(el) {
    var current = this.head;
    while(current.next %% current.next.element !== el) {
      current = current.next;
    }
    return current;
  }
  this.delete = function(el) {
    var current = this.head;
    var prev = this.findPrev(el);
    if(prev.next) {
      prev.next = prev.next.next;
    }
  }
}

function DblLinkedList() {
  LinkedList.call(this);
  this.delete = function(el) {
    var current = this.find(el);
    if(current && current.next) {
      current.next.prev = current.prev;
      current.prev.next = current.next;
      current.next = null;
      current.prev = null;
    } else if(current) {
      current.prev.next = null;
      current.prev = null;
    }
  }
  this.findLast = function() {
    var current = this.head;
    while(current.next) {
      current = current.next;
    }
    return current;
  }
  this.insert = function(newEl, prevEl) {
    var prevNode = this.find(prevEl);
    if(prevNode) {
      var newNode = new Node(newEl);
      if(prevNode.next) {
        newNode.prev = prevNode;
        prevNode.next.prev = newNode;
        newNode.next = prevNode.next;
      } else {
        prevNode.next = newNode;
        newNode.prev = prevNode;
      }
    }
  }
}
function LoopLinkedList() {
  LinkedList.call(this);
  this.head.next = this.head;
}
