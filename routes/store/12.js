/**
 * Created by songsong on 2017/10/30.
 */
function f(m,n) {
    var arr=[]
    function c(cur) {
        if(cur<m){
            arr.push(n)
            return c(++cur)
        }else{
            return arr
        }
    }
    return c(0)
}
console.log(f(0,4))