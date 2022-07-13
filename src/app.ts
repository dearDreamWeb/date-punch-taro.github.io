import { Component, ReactNode } from 'react'
import './app.less'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render(): ReactNode {
    return this.props.children
  }
}

export default App
