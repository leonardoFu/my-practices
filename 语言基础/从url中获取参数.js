function getUrlParam(sUrl, sKey) {
    var result = {};
    if(sUrl.indexOf('?') < 0) {
        if(!sKey) {
            return result;
        } else {
            return '';
        }
    }
    var searchStr = sUrl.split('?')[1].split('#')[0];
	var searchArr = searchStr.split('&');
    searchArr.forEach(function(v) {
        var paramTemp = v.split('=');
        var paramKey = paramTemp[0];
        var paramVal = paramTemp[1];
        if(!result[paramKey]) {
            result[paramKey] = paramVal;
        } else if(!Array.isArray(result[paramKey])){
            var val = result[paramKey];
            result[paramKey] = [val];
            result[paramKey].push(paramVal);
        } else {
            result[paramKey].push(paramVal);
        }
    })
    return sKey ? result[sKey] || '' : result;
}
