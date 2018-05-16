import React, {Component} from 'react'

import Search from './search'
import Main from './main'

export default class App extends Component {

  state = {
    searchName: ''
  }

  setSearchName = (searchName) => {
    this.searchName = searchName
    this.setState({searchName})
  }

  render () {
    const {searchName} = this.state
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search GitHub Users</h3>
          <Search setSearchName={this.setSearchName}/>
        </section>
        <div className="row">
          <Main searchName={searchName}/>
        </div>
      </div>
    )
  }
}