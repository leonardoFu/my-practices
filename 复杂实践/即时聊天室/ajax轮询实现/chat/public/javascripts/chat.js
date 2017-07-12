

var chat = {
	username: '',
	elements: {
		messages: $('.messages')[0],
		msgInput: $('.inputMessage')[0],
		login: $('.login')[0],
		usernameInput: $('.usernameInput')[0]

	},

	login: function(name){
		var _this = this;
		$.post('/login', {name: name}).then(function(res){
			if(res.status_code === 200){
				$(_this.elements.login).css('display', 'none');
				$('.chat').css('display', 'block');
			}

		})
	},
	sendMsg: function(message){
		
	}
	init: function(){
		var _this = this;
		$(this.elements.usernameInput).keydown(function(e){
			if(e.keyCode === 13){
				var username = $(this).val();
				_this.login(username);
			}
		});
		$(this.elements.msgInput).keydown(function(e){
			if(e.keyCode === 13){
				var message = $(this).val();
				_this.
			}
		})

	}
}
$(function(){
	chat.init();
})
