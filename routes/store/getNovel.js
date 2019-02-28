var request=require('request')
var conv=require('iconv-lite')//转码的
var fs=require('fs')
var cheerio=require('cheerio')
let arr=[]
var getNovel=function () {
    var domain='http://www.77ftv.cn'
    var parentUrl='/comic/11243/'
    var host='/comic/11243/155859.html?p=1'
    let url=domain+host
    request({url,encoding:null},function (err,response,body) {
        body=conv.decode(body,'gbk')
        let $=cheerio.load(body)
        //console.log(body)
        let scripts=$('script')
        let links=$('link')
        let link0=links[0]
        let script=link0.next.next
        let child=script.children[0].data

        let title=child.match(/var qTcms_S_m_playm="(.+)";/)[1]
        let qTcms_S_m_murl_e=child.match(/var qTcms_S_m_murl_e=(.+);/)[1]
        let nexUrl=child.match(/var qTcms_Pic_nextArr=(.+)/)[1]
        let strImgs=new Buffer(qTcms_S_m_murl_e, 'base64').toString()
        console.log(title,'xxxx')
        return {title,strImgs,nexUrl}
    })
}
module.exports =getNovel