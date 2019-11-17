var cheerio = require('cheerio');
var utility = require('./src/utility');

var request = require('request');
var iconv = require('iconv-lite');

const fs = require('fs');

var async = require('async');

// 抓取指定url列表中所有url的标题 若不可用(超时10s)则视为不能访问
exports.fetch_url_list = function fetch_url_list(urlList, proxy, callback_w) {
  async.concat(urlList, (url, callback) => {
    utility.debugLogLV(url, 4);
    request(
      {
        url: url,
        method: 'get',
        encoding: null,
        proxy: proxy,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
        }
      }, (err, res, body) => 
      {
        let ec = utility.errcode(err);
        try{
          if(body != null)
            body = iconv.decode(body, 'utf-8');
        }catch(e){
          console.log(e);
          body = null;
        }

        var $ = body == null ? null : cheerio.load(body);
        ec = ec == "" ? "" : ("-" + ec);
        // .replaceAll("\n", "").replaceAll(" ", "");
        let buffer = body == null ? ("invalid" + ec) : $('title').text().trim();
        callback(null, {
          title: buffer,
          // 回车符...
          url: url.replace(String.fromCharCode(13), ""),
        });
        // $('title').each((i, v) => {console.log($(v).text());}) //innerHTML
      });
      
    }, (err, values) => {
      if(err){
        console.err('ERR-1-1-1' + err);
      }else{
        utility.debugLogLV("values:" + values, 1);
        callback_w(values);
      }
    }
  );
}
