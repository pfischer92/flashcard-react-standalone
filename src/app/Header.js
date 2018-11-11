import React from 'react';
import { Button } from 'react-bootstrap';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }

    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
  }

  tick(){
    this.setState({ counter: this.state.counter + 1 });
  }
  reset(){
  }
  componentDidMount(){
    setInterval(this.tick, 1000);
  }
  componentWillUnmount(){
    setInterval(null, 0);
  }
  render() {
    const nrStyle = {
      textAlign: 'center',
      fontSize: '320px',
      margin: '10px'
    };
    return (
      <div className="container-fluid">
        <p style={nrStyle}>{this.state.counter}</p>
          <Button bsStyle="warning" onClick={this.reset}>
          Refresh
        </Button>&nbsp;
          {this.props.message}
      </div>
    )
  }
}