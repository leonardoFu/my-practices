/**
 * 通过自身对象管理装饰器
 */
var core = {};

core.decorator = function(){
	console.log('core function');
}

core.getDecorator = function(deco){
	this[deco].prototype = this;
	return new this[deco];
}

core.decorator1 = function(){
	this.decorator = function(){
		this.decorator1.prototype.decorator();

		console.log('decorator 1 is running');
	}
}

core.decorator2 = function(){
	this.decorator = function(){
		this.decorator2.prototype.decorator();

		console.log('decorator 2 is running');
	}
}

core.decorator3 = function(){
	this.decorator = function(){
		this.decorator3.prototype.decorator();

		console.log('decorator 3 is running');
	}
}

core = core.getDecorator('decorator1');

core = core.getDecorator('decorator2');

core = core.getDecorator('decorator3');

core.decorator();

/*基本装饰器功能*/

function BaseCls(){
	this.doSomething = function(){
		this.preTask();
		console.log('doSomething...');
		this.postTask();
	}	
}

function Decorator(decorated){
	this.doSomething = function(){
		decorated.doSomething();
	}

	decorated.preTask = function(){
		console.log('doing pretask...');
	}

	decorated.postTask = function(){
		console.log('doing postTask...');
	}

}

var base = new BaseCls();

var decorator1 = new Decorator(base);
var decorator2 = new Decorator(decorator1);

decorator2.doSomething();