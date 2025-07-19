import { Component } from "react"

class CountClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    increment = function() {
        this.setState({
            count: this.state.count + 1
        })
    }

    decrement = function() {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.increment}>Increment</button>
                <div>{this.state.count}</div>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }
}

export default CountClass;