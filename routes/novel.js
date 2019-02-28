/**
 * Created by songsong on 2017/10/30.
 */
var express=require('express')
var router=express.Router()
var Article=require('../db').Article
var path=require('path')


router.get('/novel',function (req,res) {
    res.sendFile(path.resolve('./build/novel.html'))
})
module.exports=router