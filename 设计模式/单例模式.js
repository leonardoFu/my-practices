var mySingleton = (function(){
	var instance;
	function init(){
		function privateMethod(){
			console.log("this is a private method ");
		}
		var privateVar = "I am also private";
		var privateRandomNum = Math.random();
		return {
			publicMethod:function(){
				console.log("the public can see me");
			},
			publicProp:"I am also public",
			getRandomNum:function(){  
				return privateRandomNum;
			}
		};
	}
	return {
		getInstance:function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	}

})();

var single1 = mySingleton.getInstance();
var single2 = mySingleton.getInstance();
console.log(single1.getRandomNum ===single2.getRandomNum)
