import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Search extends Component {

  static propTypes = {
    searchName: PropTypes.string.isRequired
  }

  state = {
    initView: true,
    loading: false,
    users: null,
    errorMsg: null
  }

  // 当组件接收到新的属性时回调
  componentWillReceiveProps (newProps) { // 制定了新的searchName, 需要请求
    const {searchName} = newProps
    //更新状态(请求中)
    this.setState({
      initView: false,
      loading: true
    })
    // 发送ajax请求
    const url = `https://api.github.com/search/users?q=${searchName}`
    axios.get(url)
      .then(res => {
        const result = res.data
        // 由于获取到的数据很多是我们所不需要的，直接用map进行映射
        const users = result.items.map(item => ({
          name: item.login,
          url: item.html_url,
          avatarUrl: item.avatar_url
        }))

        // 更新状态
        this.setState({
          loading: false,
          users         // 相当于users: users
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorMsg: error.message
        })
      })
  }

  render () {
    const {initView, loading, users, errorMsg} = this.state
    const {searchName} = this.props
  
    if (initView) {
      return <h2>请输入关键词搜索:{searchName}</h2>
    } else if (loading) {
      return <h2>正在请求中...</h2>
    } else if (errorMsg) {
      return <h2>{errorMsg}</h2>
    } else{
      return (
       <div>
         {
           users.map((litem, index) => (
            <div className="card" key={index}>
              <a href={litem.url}>
                <img src={litem.avatarUrl} style={{width: '100px'}} alt="" />
              </a>
              <p className="card-text">{litem.name}</p>
            </div>
           ))
         }
       </div>
      )
    }
  }
}