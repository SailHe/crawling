
// '1234-01-02'.replace(/-/g,'');   /-/g 中 /- 是将 - 转义，/g 表示替换所有字符串。
// "1234\n01\n02".split('\n').join('');
String.prototype.replaceAll = function (FindText, RepText) {
    regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
}

//exports.IS_DEBUG = false;
exports.debugLevel = 0;

exports.debugLog = function (msg){
    console.debug(`FOR DEBUG-${exports.debugLevel} ${msg}`);
}

// 只有在指定的调试等级下才会显示指定消息
exports.debugLogLV = (msg, showLV) => {
    if(showLV < exports.debugLevel)
        exports.debugLog(msg);
}

exports.errcode = (err) => {
    return err == null ? "" : 
    err.code == "ECONNRESET" ? "链接被重置" : 
    err.code == "ENOTFOUND" ? "未找到" : 
    err.code == "ETIMEDOUT" ? "超时" : 
    err.code == "EAI_AGAIN" ? "DNS查找超时" : 
    err
}