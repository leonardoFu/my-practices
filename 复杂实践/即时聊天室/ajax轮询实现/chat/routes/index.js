var express = require('express');
var router = express.Router();


var MAX_MSG_LENGTH = 100;
function Result(msg, code, data) {
	this.message = msg || '';
	this.status_code = code || 0;
	this.data = data || null;
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
	},
	setData: function(data){
		this.data = data;
		return this;
	}
}

function Message(username, text, seq){
	this.username = username;
	this.text = text;
	this.seq = seq;
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res) {
  res.render('chat');
});

var msgList = [];
var msgCount = 0;
var userList = [];
var userCount = 0;
var msgSeq = 0;

router.post('/login', function(req, res) {
	var name = req.body.name,
	  result = new Result();

	if (userList.indexOf(name) >= 0) {
		return res.json(result.failed().setMsg('该用户名已登录'));
	} else {
		userList.push(name);
		userCount++;
		return res.json(result.success().setData({userCount: userCount, userList: userList}));
	}
});

router.post('/message', function(req, res){
	var name = req.body.name,
	    text = req.body.text;
	msgList.push(new Message(name, text, msgSeq++));
	msgCount++;
	if(msgList.length > MAX_MSG_LENGTH){
		msgList.length.splice(0, 30);
		msgCount = msgList.length;
	}

	res.json(new Result().success());
});

router.get('/count', function(req, res){
	var result = new Result()
	return res.json(result.success().setData({msgSeq: msgSeq, userCount: userCount}));
});

router.get('/messages', function(req, res){
	var messages = [];
	if(req.query.seq){
		messages = msgList.filter(function(v){ return v.seq >= req.query.seq });
	}
	return res.json(new Result().success().setData({ messages: messages, msgSeq: msgSeq }));
})

router.get('/users', function(req, res){
	return res.json(new Result().success().setData({ userList: userList }));
})

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
