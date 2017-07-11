var express = require('express');
var router = express.Router();

function Result(msg, code) {
	this.message = msg || '';
	this.status_code = code || 0;
}

Result.prototype = {
	success: function() {
		this.status_code = 200;
		return this;
	},
	failed: function() {
		this.status_code = 400;
		return this;
	},
	setMsg: function(msg) {
		this.message = msg
		return this;
	}
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res) {
  res.render('chat');
});

var msgList = [];
var userList = [];
var userCount = 0;

router.post('/login', function(req, res) {
	var name = req.body.name,
	  result = new Result();

	if (userList.indexOf(name) >= 0) {
		return res.json(result.failed().setMsg('该用户名已登录'));
	} else {
		userList.push(name);
		userCount++;
		return res.json(result.success());
	}
});

router.post('/logout', function(req, res){
	var name = req.body.name,
	  result = new Result(),
	   index = userList.indexOf(name);

	if(index >= 0){
		userList.splice(index, 1);
		userCount--;
		return res.json(result.success())
	} else {
		return res.json(result.faild().setMsg('该用户名不存在'));
	}
})
module.exports = router;
