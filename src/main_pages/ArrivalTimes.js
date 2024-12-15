import React, { Component } from 'react';
import "./stylesheets/arrivaltimes.css";
import { link } from 'fs-extra';


class ArrivalTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggles: {
        busNo: false,
        busStop: false,
        stopNumber: false,
        nearMe: false,
      },
    };
  }

  handleToggle = (buttonName) => {
    this.setState((prevState) => ({
      toggles: {
        ...prevState.toggles,
        [buttonName]: !prevState.toggles[buttonName],
      },
    })); 
  };
  

  styles1() {
    return { link:'./'};
  }

  styles2() {
    return { fontWeight: "normal", textDecoration: "none" };
  }

  choose(buttonName) {
    return this.state.toggles[buttonName] ? this.styles1() : this.styles2();
  }

  render() {
    return (
      <>
 {/*---------------------------------------------------------------------------------*/}
        <ul className="at">
          <li>
            <button
              style={this.choose('busNo')}
              onClick={() => this.handleToggle('busNo')}
            >
            <p> Bus No.</p>
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li> <button
              style={this.choose('busStop')}
              onClick={() => this.handleToggle('busStop')}
              >
              <p> Bus Stop </p>
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li>
            <button
              style={this.choose('stopNumber')}
              onClick={() => this.handleToggle('stopNumber')}
            >
              Stop Number
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li>
            <button
              style={this.choose('nearMe')}
              onClick={() => this.handleToggle('nearMe')}
            >
              Near Me
            </button>
          </li>
        </ul>
 {/*---------------------------------------------------------------------------------*/}
        <input type="text" placeholder="Search bus/stop" className="at"/>
      </>
    );
  }
}

export default ArrivalTimes;
