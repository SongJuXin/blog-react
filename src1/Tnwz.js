/**
 * Created by songsong on 2018/1/29.
 */
import React from 'react'
import {Input, message} from 'antd'
const Search = Input.Search;
const hash = ['a', 'b', 'c', 'd']
const $get = (keyword) => {
    const query = keyword ? '/questions/' + keyword : '/questions'
    return fetch(query, {
        method: 'get',
    })
        .then((data) => {
            return data.json()
        })

}
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.oldDate = new Date()
        const app = document.querySelector('#app')
        app.style.height = '100%'
        app.style.overflow = 'hidden'
        this.flag = true
    }

    state = {
        questions: []
    }

    componentDidMount() {
        $get().then((result) => {
            if (result.code == 0) {
                this.setState({questions: result.data})
            }
        }).catch(err => {
            message.error('出错了~')
        })
    }

    handleSearch = (keyword) => {
        $get(keyword).then((result) => {
            if (result.code == 0) {
                this.setState({questions: result.data})
            }
        }).catch(err => {
            message.error('出错了~')
        })
    }
    handleChange = (e) => {
        const keyword = e.target.value
        //输入时间间隔小于500不发请求
        console.log(new Date - this.oldDate, 'xxxxxxxx')
        const newDate = new Date
        if (newDate - this.oldDate < 500) {
            this.oldDate = newDate
            return
        }
        $get(keyword).then((result) => {
            if (result.code == 0) {
                this.setState({questions: result.data})
            }
        }).catch(err => {
            message.error('出错了~')
        })

        this.oldDate = newDate

    }

    render() {
        return (<div style={{width: '50%', margin: '0 auto', paddingTop: '30px', height: '90%', overflow: 'hidden'}}>
            <p style={{position: 'absolute', top: 0}}>共搜索到<span
                style={{color: 'red'}}>{this.state.questions.length}</span>条记录</p>
            <Search style={{}}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    enterButton/>
            <div style={{height: '100%', overflow: 'auto', background: '#fefefe'}}>
                {this.state.questions.map((question, idx) => {
                    //console.log(question.options,question.answer,question.options[question.answer-1])
                    return (<div key={question._id}>
                        <h3>{idx + 1}.{question.quiz} <span style={{
                            background: 'rgba(204, 0, 255,.2)',
                            padding: '2px'
                        }}>{question.options[question.answer - 1]}</span></h3>
                        <p>{question.options.map((option, idx) => <span
                            style={{background: question.answer - 1 == idx ? 'rgba(204, 0, 255,.2)' : ''}}
                            key={question._id + idx}>{hash[idx] + '.' + option}</span>)}</p>
                    </div>)
                })}


            </div>

        </div>)
    }
}
var data = {
    '公司': {id: 11,},
    '净含量': {id: 22},
    '酒精度': {id: 33},
}