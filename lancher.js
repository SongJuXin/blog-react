/**
 * Created by songsong on 2018/2/26.
 */
const https = require('https');
const querystring = require('querystring');
var str='count=200&secretBoxCode=552231930600&keepSecret=1&rankMode=0&userId=1017260352&field=value1&sign=D68708301C90F6277DAAEAA1A5B7390B&ts=1519966692963&tsy=983'
var data={}
    str.split('&').forEach(item=>{
    const arr=item.split('=')
    data[arr[0]]=arr[1]
})
console.log(data)
const postData = querystring.stringify(data);
var zlib = require('zlib');
var gunzip = zlib.createGunzip();
const iconv = require("iconv-lite");
const num = 0
const optionsGet = {
    hostname: 'vip3.fengchuanba.com',
    port: 443,
    //path需要编码
    path: `/service/explore2/startExplore`,
    method: 'POST',
    headers: {
        'Host': 'vip3.fengchuanba.com',
        'Connection': 'keep-alive',
        'Accept':'*/*',
        'Origin': 'https://vip3.fengchuanba.com',
        'X-Requested-With':'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G935L Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043906 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/WIFI Language/zh_CN',
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'https://vip3.fengchuanba.com/index.html',
        'Accept-Language': 'zh-CN,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Length': Buffer.byteLength('secretBoxCode=552231930600&uuid=oX-65sw7TnKvOR22Yuk9cMuH6gS0&userId=1017260352&preUserId=0&degree=0&isReged=1&sign=CA8A60B5B84C57243048D0004B3BAFED&ts=1519972304807&tsy=722'),
    }
}
const op1={
    hostname: 'vip3.fengchuanba.com',
    port: 443,
    //path需要编码
    path: `/service/explore2/getSecretBoxFromWeChat`,
    method: 'POST',
    headers: {
        'Host': 'vip3.fengchuanba.com',
        'Connection': 'keep-alive',
        'Accept':'*/*',
        'Origin': 'https://vip3.fengchuanba.com',
        'X-Requested-With':'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G935L Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/043906 Mobile Safari/537.36 MicroMessenger/6.6.1.1220(0x26060135) NetType/WIFI Language/zh_CN',
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'https://vip3.fengchuanba.com/index.html',
        'Accept-Language': 'zh-CN,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Length': Buffer.byteLength('secretBoxCode=552231930600&secretKey=8bkYlCU4cEPF7IjOVF74qiizCNcSIctJ&uuid=oX-65sw7TnKvOR22Yuk9cMuH6gS0&preUserId=0&degree=0'),
    }
}
const chunks = [];
const req = https.request(optionsGet, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        chunks.push(d);
    });
    res.on('end', () => {
        console.log('chunks',chunks)
        let buff = Buffer.concat(chunks)
        const data=iconv.decode(chunks,'utf8')
        console.log('data,',data)
        console.log(JSON.parse(data))

    })
});

//console.log('postData',  postData)
req.write('secretBoxCode=552231930600&uuid=oX-65sw7TnKvOR22Yuk9cMuH6gS0&userId=1017260352&preUserId=0&degree=0&isReged=1&sign=CA8A60B5B84C57243048D0004B3BAFED&ts=1519972304807&tsy=722');
//req.write('userId=1017260352&secretBoxCode=552231930600&passMode=1&checkPointSeq=1&questionId=1893873&answer=0&answerStatus=0&answerValue=0&exploreId=53264283&exploreDetailId=602186251&errorTime=0&sign=F1E7D302C049765F47EF2B79970BECF8&ts=1519971782301&tsy=703');

req.on('error', (e) => {
    console.error(e);
});
req.end();

