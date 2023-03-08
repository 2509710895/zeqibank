import { Component } from "react";

export default class ClassHook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "data"
        }
    }

    componentDidMount() {
        this.setState({
            data: 'did mount state'
        })

        console.log("did mount state ", this.state.data);
        // did mount state data

        setTimeout(() => {
            this.setState({
                data: 'setTimeout'
            })

            console.log("setTimeout ", this.state.data);
        })
    }



    render() {
        return (
            <><button id='btn'>点击data:{this.state.data}</button></>
        )
    }
}