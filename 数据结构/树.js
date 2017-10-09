function Node(data, left, right) {
  this.data = data;
  this.left = this.left;
  this.right = this.right;
  this.show = function () {
    return this.data;
  }
}

function BinarySearchTree() {
  this.root = null;
  this.insert = function(data) {
    var newNode = new Node(data, null, null);
    if(this.root === null) {
      this.root = newNode;
    } else {
      var current = this.root;
      var parent;
      while(true) {
        parent = current;
        if(data < current.data) {
          current = current.left;
          if(!current) {
            parent.left = newNode;
            break;
          }
        } else {
          current = current.right;
          if(!current) {
            parent.right = newNode;
            break;
          }
        }
      }
    }
  };
  this.inOrder = function(node, callback) {
    if(node) {
      this.inOrder(node.left, callback);
      callback(node);
      this.inOrder(node.right, callback);
    }
  }
  this.preOrder = function(node, callback) {
    if(node) {
      callback(node);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }
  this.postOrder = function(node, callback) {
    if(node) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node);
    }
  }
  /**
   * 寻找最小值
   * @return {[type]} [description]
   */
  this.findMin = function() {
    var current = this.root;
    while(current.left) {
      current = current.left;
    }
    return current;
  }
  /**
   * 寻找最大值
   * @return {[type]} [description]
   */
  this.findMax = function() {
    var current = this.root;
    while(current.right) {
      current = current.right;
    }
    return current;
  }
  this.find = function(data) {
    var current = this.root;
    while(true) {
      if(current.data === data) {
        return current;
      } else if(current.data > data) {
        if(current.left) {
          current = current.left;
        } else {
          return null;
        }
      } else {
        if(current.right) {
          current = current.right;
        } else {
          return null;
        }
      }
    }
  }
  this.numberOfNodes = function(node, condition) {
    var num = 0;
    condition = condition === undefined ? function() {
      return true;
    } : condition;
    if(!node) {
      return 0;
    } else if(condition(node)) {
      num =  1 + this.numberOfNodes(node.left, condition) + this.numberOfNodes(node.right, condition);
    } else {
      num =  0 + this.numberOfNodes(node.left, condition) + this.numberOfNodes(node.right, condition);
    }
    return num;
  }

  this.numberOfLeafNodes = function(node) {
    var condition = function(v) {
      return !v.left && !v.right;
    }
    return this.numberOfNodes(node, condition);
  }

  this.PrintFromTopToBottom = function (root) {
    if(!root) {
        return;
    }
    console.log(root);
    this.PrintFromTopToBottom(root.left);
    this.PrintFromTopToBottom(root.right);
  }
}

var tree = new BinarySearchTree();
tree.insert(3);
tree.insert(4);
tree.insert(1);
tree.insert(5);
tree.insert(2);
tree.insert(8);
tree.insert(0);
tree.insert(1);
tree.insert(9);
console.log('开始中序遍历：');
tree.inOrder(tree.root, function(node) {
  console.log('遍历节点:' + node.show());
})
console.log('开始前序遍历：');
tree.preOrder(tree.root, function(node) {
  console.log('遍历节点:' + node.show());
})
console.log('开始后序遍历：');
tree.postOrder(tree.root, function(node) {
  console.log('遍历节点:' + node.show());
})

console.log('寻找最小值：');
console.log(tree.findMin());
console.log('寻找最大值：');
console.log(tree.findMax());

console.log('树中共有节点：');
console.log(tree.numberOfNodes(tree.root));

console.log('树中共有叶节点：');
console.log(tree.numberOfLeafNodes(tree.root));
