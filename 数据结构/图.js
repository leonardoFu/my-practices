function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  this.edgeTo = [];
  this.marked = [];
  this.viewed = false;
  for(var i = 0; i < this.vertices; i++) {
    this.adj[i] = [];
    // this.adj[i].push('');
  }
  this.addEdge = function(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }
  this.dfs = function (v) {
    var _this = this;
    function dfs(v) {
      this.marked[v] = true;
        console.log('当前遍历节点：' + v);
        console.log(this.adj[v].toString());
        this.adj[v].forEach(function(w) {
          if(!_this.marked[w]) {
            dfs.call(_this, w);
          }
        })
    }
    dfs.call(_this, v);
  }
  this.bfs = function(node) {
    var queue = [];
    this.marked[node] = true;
    queue.push(node);
    var _this = this;
    while (queue.length > 0) {
      var v = queue.shift();//移出队列
      console.log('当前遍历节点：' + v);
      this.adj[v].forEach(function(w) {
        if (!_this.marked[w]) {
          _this.marked[w] = true;
          queue.push(w);
        }
      })
    }
  }
}

var g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);

// g.dfs(0)
g.bfs(0);
