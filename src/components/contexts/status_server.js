import { Component } from "react"
import { createContext, useContext } from "react"

export const StatusServerContext = createContext(infoServer)
export const useStatusServer = () => useContext(StatusServerContext)

export class StatusServer extends Component {
  constructor() {
    super()
    this.state = infoServer
  }

  componentDidMount() {
    updateInfoServer()
      .then((data) => {
        this.setState(data)
      })
      .catch((err) => console.error(err.message))
  }

  render() {
    return (
      <StatusServerContext.Provider value={this.state}>
        {this.props.children}
      </StatusServerContext.Provider>
    )
  }
}
