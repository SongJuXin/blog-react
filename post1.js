/**
 * Created by songsong on 2018/2/26.
 */
const https = require('https');
const querystring = require('querystring');
const postData = querystring.stringify({
    'filelist': JSON.stringify([{
        "path": '/书---------/11.精读全球好书100本【第二季】（完结了）/song.61《天朝的崩溃6》.song.mp3',
        "newname": '61《天朝的崩溃6》'
    }])
});
var zlib = require('zlib');
var gunzip = zlib.createGunzip();
const iconv = require("iconv-lite");
const num = 0
const optionsGet = {
    hostname: 'pan.baidu.com',
    port: 443,
    //path需要编码
    path: `/api/list?dir=%2F%E4%B9%A6---------%2F11.%E7%B2%BE%E8%AF%BB%E5%85%A8%E7%90%83%E5%A5%BD%E4%B9%A6100%E6%9C%AC%E3%80%90%E7%AC%AC%E4%BA%8C%E5%AD%A3%E3%80%91%EF%BC%88%E5%AE%8C%E7%BB%93%E4%BA%86%EF%BC%89&bdstoken=fce9651078adcbf78fabdf613ae03f0c&logid=MTUxOTY5NDc2MTQ2MzAuODE4MzA2NTE0NzM0NTk2Nw==&num=${num}&order=time&desc=1&clienttype=0&showempty=0&web=1&page=1&channel=chunlei&web=1&app_id=250528`,
    num: 1,
    method: 'GET',
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        'Host': 'pan.baidu.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': 'BAIDUID=1936CC07BEEB227A90D97932203779F8:FG=1; BIDUPSID=6A5AA4595D085EA0788E350E8701A37E; PSTM=1516592146; MCITY=-131%3A; PANWEB=1; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1517485510,1519287592,1519611222,1519694739; BDCLND=UvBWCuF%2BNZyuQkuDhSZLVU7Ene%2B7wN%2FXhfDd%2Fwzv29o%3D; BDUSS=kdxSEFaMHBZQ0VsQUFrLWdyYWpxOGR3Y1F3fkJobk5EN2pDeHFrUmR2N1BiWkphQVFBQUFBJCQAAAAAAAAAAAEAAADl0GkNMTAxNjM0NjEwMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM~galrP4GpaV; Hm_lvt_f5f83a6d8b15775a02760dc5f490bc47=1517485569; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; STOKEN=1f28a3f503e8d0fcb51c539f0a8277b5c3734d322dfb8d5f59bc06cd39047fe2; SCRC=c0567d4bff8b94d424652da19e27c170; cflag=5%3A3; H_PS_PSSID=1433_21101_17001_20927; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=1; PANPSC=16089651300935053834%3A4jL3HSqVSCKpt%2FlRIHpvhJL0sWaEh1trHmLbiKK5rwHwdEvQxle8NXgXofrWESI4DvfEPeT2BZ%2FlNmuf9g0X79tRhTZfsH67p0pZEfUBInM%2F0we9031ImMyC1i1CBNeTj1NZMrTJV2J4%2B2HacCA3yTsuktMw6gulbVFcNkn0FT5VvmSKYmKRhKQRuwhxVv30; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1519694739',
        'Connection': 'keep-alive',
        'Referer': 'https://pan.baidu.com/disk/home?',
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
        let buff = Buffer.concat(chunks)
        zlib.gunzip(buff, (err, decoded) => {
            let body = iconv.decode(decoded, 'utf8');
            body = JSON.parse(body)
            if (body.errno !== 0) {
                throw err('出错了')
            }
            const lists = body.list
            const first = lists[0]
            const {server_filename, path} = first
            console.log('server_filename', server_filename, path)
            const filterLists = lists.filter((item) => !/song\./.test(item.server_filename))
            let postData = filterLists.map(item => {
                const {server_filename, path} = item
                const newname = 'song.' + server_filename
                return {newname, path}
            })
            const fir=lists[0]
            postData=[{
                newname:fir.server_filename,
                path:fir.path,
                md5:'7707752e220a31604cbcb5ca35f85e3a'
            }]
            console.log('\nkaishi',postData)
            const finalPostData = querystring.stringify({
                'filelist': JSON.stringify(postData)
            });
            const optionsPost = {
                hostname: 'pan.baidu.com',
                port: 443,
                path: '/api/filemanager?opera=rename&async=2&onnest=fail&channel=chunlei&web=1&app_id=250528&bdstoken=fce9651078adcbf78fabdf613ae03f0c&logid=MTUxOTYxMzkwOTI4MDAuMjM2MjEzNTY2MjIxNDgwNQ==&clienttype=0',
                method: 'POST',
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Host': 'pan.baidu.com',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cookie': 'BAIDUID=1936CC07BEEB227A90D97932203779F8:FG=1; BIDUPSID=6A5AA4595D085EA0788E350E8701A37E; PSTM=1516592146; MCITY=-131%3A; PANWEB=1; Hm_lvt_7a3960b6f067eb0085b7f96ff5e660b0=1517485479,1517485510,1519287592,1519611222; BDCLND=UvBWCuF%2BNZyuQkuDhSZLVU7Ene%2B7wN%2FXhfDd%2Fwzv29o%3D; BDUSS=kdxSEFaMHBZQ0VsQUFrLWdyYWpxOGR3Y1F3fkJobk5EN2pDeHFrUmR2N1BiWkphQVFBQUFBJCQAAAAAAAAAAAEAAADl0GkNMTAxNjM0NjEwMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM~galrP4GpaV; Hm_lvt_f5f83a6d8b15775a02760dc5f490bc47=1517485569; H_PS_PSSID=1433_21101; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; PSINO=2; BDRCVFR[eHt_ClL0b_s]=mk3SLVN4HKm; STOKEN=1f28a3f503e8d0fcb51c539f0a8277b5c3734d322dfb8d5f59bc06cd39047fe2; SCRC=c0567d4bff8b94d424652da19e27c170; Hm_lpvt_7a3960b6f067eb0085b7f96ff5e660b0=1519613879; PANPSC=6584225778531101289%3A4jL3HSqVSCKpt%2FlRIHpvhJL0sWaEh1trHmLbiKK5rwHwdEvQxle8NXgXofrWESI4Kpis9HCio%2Bc9xuoIZCdIf9tRhTZfsH67p0pZEfUBInM%2F0we9031ImMyC1i1CBNeTj1NZMrTJV2J4%2B2HacCA3yTsuktMw6gulbVFcNkn0FT5VvmSKYmKRhKQRuwhxVv30; cflag=15%3A3',
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Referer': 'https://pan.baidu.com/disk/home?',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Length': Buffer.byteLength(finalPostData)
                }
            }
            //post
            let chunks = []
            const req = https.request(optionsPost, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
                res.on('data', (d) => {
                    chunks.push(d);
                });
                res.on('end', () => {
                    let buff = Buffer.concat(chunks)
                    zlib.gunzip(buff, (err, decoded) => {
                        let body = iconv.decode(decoded, 'utf8');
                        body = JSON.parse(body)
                        console.log('post data', body)
                        if (body.errno !== 0) {
                            throw '出错了'
                        }
                    })
                })
            });
            req.write(finalPostData);
            req.on('error', (e) => {
                console.error(e);
            });
            req.end();

        })


    })
});

//console.log('postData',  postData)
//req.write(postData);

req.on('error', (e) => {
    console.error(e);
});
req.end();

