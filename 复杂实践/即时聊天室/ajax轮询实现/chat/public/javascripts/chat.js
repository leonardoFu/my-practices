var chat = {
	username: '',
	timer: null,
	msgList: [],
	userCount: 0,
	userList: [],
	currSeq: 0,
	elements: {
		messages: $('.messages')[0],
		msgInput: $('.inputMessage')[0],
		login: $('.login')[0],
		usernameInput: $('.usernameInput')[0]

	},

	login: function(name) {
		var _this = this;
		$.post('/login', {
			name: name
		}).then(function(res) {
			if (res.status_code === 200) {
				_this.username = name;
				_this.userCount = res.data.userCount;
				_this.userList = res.data.userList;

				$(_this.elements.login).css('display', 'none');
				$('.chat').css('display', 'block');

				_this.listen();
				_this.appendLog('欢迎来到付宇豪的群聊~');
				_this.appendLog('当前有'+res.data.userCount+'人在线');

			} else {
				alert(res.message);
			}

		})
	},
	sendMsg: function(message) {
		var _this = this;
		$.post('/message', {
			text: message,
			name: this.username
		}).then(function(res) {
			if (res.status_code === 200) {
				$(_this.elements.msgInput).val('');
			}
		})
	},
	appendMessages: function(messages){

		if(!messages.length){
			return;
		}

		var _this = this;
		var fragment = document.createDocumentFragment();

		messages.forEach(function(v){
			var newEl = $('<li class="message"></li>');
			var username = $('<span class="username">'+v.username+'</span>');
			var text = $('<span class="messageBody">'+v.text+'</span>');
			newEl.append(username).append(text);
			$(fragment).append(newEl);
		})

		$(_this.elements.messages).append($(fragment));
	},
	appendLog: function(text){
		var log = $('<li class="log" style="display: list-item;">'+text+'</li>');
		$(this.elements.messages).append(log);

	},


	listen: function() {
		var _this = this;

		setInterval(function() {
			$.get('/count').then(function(res) {
				if (res.status_code === 200) {
					var msgSeq = res.data.msgSeq || 0,
					 userCount = res.data.userCount;

					//检测当前服务器与客户端序列号是否一致，若非一致，客户端向服务器请求新消息
					if(res.data.msgSeq > _this.currSeq){
						$.get('/messages', {seq: _this.currSeq}).then(function(res){

							if(res.status_code === 200) {
								_this.currSeq = res.data.msgSeq;
								var messages = res.data.messages || [];
								_this.appendMessages(messages)
							}

						});
					}

					if(userCount !== _this.userCount){
						$.get('users').then(function(res){

					  		var userList = res.data.userList;
							if(res.status_code === 200){


								if(userCount > _this.userCount){
									//有新成员登录的情况
									var newUserList = userList.filter(function(name){
										return _this.userList.indexOf(name) < 0;
									}).join(',');

									_this.appendLog(newUserList+'加入了群聊');
									_this.userList = userList;
								} else {
									var leaveUserList = _this.userList.filter(function(name){
										return userList.indexOf(name) < 0;
									}).join(',')

									_this.appendLog(leaveUserList+'离开了群聊');
									_this.userList = userList;
								}
								
								_this.appendLog('当前有'+userCount+'人在线');
								_this.userCount = userCount;
							}

						})
					}

				}
			})
		}, 1000);

		window.onbeforeunload = function(){
			$.post('/logout', {name: chat.username});
			return "onbeforeunload is work";
		}
	},

	init: function() {
		var _this = this;
		$(this.elements.usernameInput).keydown(function(e) {
			if (e.keyCode === 13) {
				var username = $(this).val();
				_this.login(username);
			}
		});
		$(this.elements.msgInput).keydown(function(e) {
			if (e.keyCode === 13) {
				var message = $(this).val();
				_this.sendMsg(message);
			}
		})

	}
}
$(function() {
	chat.init();
})