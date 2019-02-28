/**
 * Created by songsong on 2017/10/26.
 */
var getNovel=require('./getNovel')
var request=require('request')
var conv=require('iconv-lite')//转码的
var cheerio=require('cheerio')
var url='http://www.77ftv.cn/comic/11243/'

request({url,encoding:null},function (err,response,body) {
    body=conv.decode(body,'gbk')
    let $=cheerio.load(body)
    //console.log(body)
    let catalogs=$('.plist ul li').map(function (index,item) {
        return $(item).text()
    })
    return catalogs

})

//getNovel()
