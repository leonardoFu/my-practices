let cheerio = require('cheerio');
let request = require('request');
let http = require('http');
let fs = require('fs');

let initUrl = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391';
let seq = 0;

function saveContent(title, content, ext) {
  fs.appendFile('./data/' + title +'.'+ ext, content, 'utf-8', function(err) {
    if(err) {
      return console.log(err.message);
    }
  })
}

function saveImg(url,filename) {
  if(filename.length > 20){
    filename = filename.substring()
  }
  request(url).pipe(fs.createWriteStream('./img/' + filename));
}


function Crawler(url){
  let instance;
  if(instance) {
    return instance;
  } else {
    if(!(this instanceof Crawler)) {
      return new Crawler(url);
    }
    this.url = url;
    this.setUrl = function(url) {
      this.url = url;
      return this;
    }
  }
}
Crawler.prototype = {
  fetchPage: fetchPage,
  saveContent: saveContent,
  saveImg: saveImg
}
function fetchPage(url) {
  if(!url) {
    url = this.url;
  }
  return new Promise((resolve, reject) => {
    http.get(url, function(res) {
      let html = '';
      let titles = [];
      res.setEncoding('utf-8');
      res.on('data', function(chunk) {
        html += chunk;
      })
      res.on('end', function() {
        let $ = cheerio.load(html);

        resolve($);
      })
    })
  })

}
let crawler = new Crawler(initUrl);
let init = function(){

  crawler.fetchPage().then(($) => {
    let time = $('.article-info a:first-child').next().text().trim();
    let title = $('div.article-title a').text().trim();
    let link = 'http://www.ss.pku.edu.cn/' + $('div.article-title a').attr('href').trim();

    let newItem = {
      time: time,
      link: link,
      title: title,
      seq: ++seq
    };

    console.log('获取一篇新的文章：')
    console.log(newItem);
    $('.article-content p').each(function(){
      let text = $(this).text();
      let newBlock = text.substring(0, 2).trim() === '';
      if(newBlock) {
        text = text + '\n';
      }
      crawler.saveContent(title, text, 'txt');
    })

    $('.article-content img').each(function (){
      let imgTitle = $(this).parent().next().text().trim();
      let imgFilename = imgTitle + '.jpg';
      var imgSrc = 'http://www.ss.pku.edu.cn' + $(this).attr('src');
      crawler.saveImg(imgSrc, imgFilename);
    })
    return $;
  }).then(($) => {
    let nextLink = "http://www.ss.pku.edu.cn" + $("li.next a").attr('href'),
            str1 = nextLink.split('-'),  //去除掉url后面的中文
            str  = encodeURI(str1[0]);
    if(seq < 100) {
      crawler.setUrl(str);
      init();
    }

  });
};
init();
