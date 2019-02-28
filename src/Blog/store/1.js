/**
 * Created by songsong on 2018/1/29.
 */
var pro=new Promise(function (req,res) {
    console.log(req,res)
    return req()
})
console.log(pro,'pros')
pro.then(function (res,rej) {
    console.log(res)
    console.log(rej)
},function (res1,rej1) {
    console.log('res1 rej1',res1,rej1)
})