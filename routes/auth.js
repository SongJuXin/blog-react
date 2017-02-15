//要求后续的路由只能登陆后才能访问，如果未登录，让他去登陆
function checkLogin(req,res,next) {
    console.log(1)
    if(req.session.user){
        next()
    }
    else{
        res.redirect('/user/signin')
    }
}
function checkNoLogin(req,res,next) {
    console.log(req.session.user,123)
    if(req.session.user){
        req.session.err='未登录才能范文'
        res.redirect('/')
    }
    else{
        next()
    }

}

exports.checkLogin=checkLogin
exports.checkNoLogin=checkNoLogin