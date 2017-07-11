//对象字面量也可以实现，但不在讨论范围之内


/**
 * 方法1
 */
function Universe(){
	var instance;

	this.getInstance = function(){
		if(!instance){
			instance = new Universe();
		}
		return instance;
	}
}

/**
 * 方法2
 * 将实例作为方法对象的一个属性缓存起来
 */
function Universe2(){

	if(Universe2.instance){
		return Universe2.instance;
	}

	this.prop1 = 1;
	this.prop2 = 2;

	Universe2.instance = this;

	return this;
}

/**
 * 方法3
 * 重写构造方法，返回实例
 */
function Universe3(){

	var instance = this;

	this.prop1 = 1;
	this.prop2 = 2;

	Universe3 = function(){

		return instance;

	}
}

var Universe4

function(){
	var instance;

	Universe4 = function(){

		if(instance){
			return instance;
		}

		instance = this;

		this.prop1 = 1;
		this.prop2 = 2;

	}
}()