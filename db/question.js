/**
 * Created by songsong on 2018/1/29.
 */
var mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/quiz')
mongoose.Promise=Promise
var ObjectId=mongoose.Schema.Types.ObjectId
const Question = new mongoose.Schema({
    quiz: { // 题目标题
        type: String,
        unique : true,
        dropDups : true
    },
    quizPY:String,
    optionsPY:[String],
    options: [String], // 题目选项
    school: String,
    type: String,
    contributor: String,
    endTime: String,
    curTime: String,
    answer: Number, // 答案
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        }
    }
},{collection:'quizzes'})

module.exports=mongoose.model('Question',Question)