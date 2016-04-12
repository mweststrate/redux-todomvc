import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    )
  }
}

export default App;