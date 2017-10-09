var ajax = function(opt){
	opt = opt || {};
	opt.method = opt.method ? opt.method.toUpperCase() : 'GET';
	opt.url = opt.url || '';
	opt.async = opt.async !== false ? true : opt.async;
	opt.data = opt.data || null;
	opt.success = opt.success || function(){};
	opt.error = opt.error || function(){};
	opt.contentType = opt.contentType || opt.method === 'GET' ? 'application/json'
	: 'application/x-www-form-urlencoded';
	opt.beforeSend = opt.beforeSend || function(){}

  var xhr = getRequestObj();
  xhr.setRequestHeader('Content-Type', opt.contentType);
  if(opt.method === 'GET'){
    xhr.open(opt.method, opt.url + '?' + convertData(opt.data), opt.async);
    xhr.send(null);
  } else {
    xhr.open(opt.method, opt.url, opt.async);
    xhr.send(convertData(opt.data));
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200){
        opt.success(xhr.response)
      }else{
        opt.error()
      }
    }
  }
}

var getXHRObj = function(){
  if(window.ActiveXObject){
    return function(){
      return new ActiveXObject("Microsoft.XMLHTTP");
    }
  } else if(window.XMLHttpRequest){
    return function (){
      return new XMLHttpRequest();
    }
  }
}()

function convertData(obj){
  if(typeof obj === 'object'){
    var resultStr = '';
    for(var prop in obj){
      if(obj.hasOwnProperty(prop)){
        resultStr += prop + '=' + obj[prop] + '&'
      }
    }
    return resultStr;
  }
  return obj;
}





function ajax (options) {
	options = options || {};
	options.url = options.url || '';
	options.method = options.method || 'GET';
	option.async = option.async === false ? false : true;
	options.onSuccess = options.onSuccess || function(){};
	options.onError = options.onError || function(){};
	options.data = options.data || null;
	options.contentType = options.contentType
	|| options.method === 'GET'
			? 'application/json'
			: 'application/x-www-form-urlencoded';

	var xhr = getXHRObj();

}
