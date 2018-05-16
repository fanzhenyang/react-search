import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {

  static propTypes = {
    setSearchName: PropTypes.func.isRequired
  }

  state = {
    searchText: ''
  }

  handleSearch = (event) => {
    const searchText = event.target.value
    this.setState({searchText})
  }

  search = () => {
    const {searchText} = this.state
    const searchName = searchText.trim()
    if (searchText) {
      this.props.setSearchName(searchName)
    }
  }

  render () {
    const {searchText} = this.state
    return (
      <div>
        <input type="text" placeholder="enter the name you search" value={searchText} onChange={this.handleSearch}/>
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}