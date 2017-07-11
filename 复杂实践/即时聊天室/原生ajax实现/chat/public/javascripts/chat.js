var ajax = function(opt){
	opt = opt || {};
	opt.method = opt.method ? opt.method.toUpperCase() : 'GET';
	opt.url = opt.url || '';
	opt.async = opt.async;
	opt.data = opt.data || null;
	
}


var chat = {
	elements: {
		messages: document.getElementByClassName('messages')[0],
		msgInput: document.getElementByClassName('inputMessage')[0],
	},
	login: function (){

	}
}