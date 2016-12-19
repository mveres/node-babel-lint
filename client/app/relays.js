import React from 'react';
import _ from 'lodash';

export default class Relays extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  add = () => this.setState({ adding: true });

  remove = () => {};

  done = () => {
    const relayNo = this.relayNo.options[this.relayNo.selectedIndex].value;
    const relayTimeMap = this.state.relayTimeMap || {};
    const timeArray = relayTimeMap[relayNo] || [];
    this.setState({
      relayTimeMap: {
        ...relayTimeMap,
        [relayNo]: [...timeArray, { on: this.onTime.value, off: this.offTime.value }],
      },
      adding: false,
    },
    () => this.props.onRelayTimeMapChanged && this.props.onRelayTimeMapChanged(this.state.relayTimeMap || {}));
  };

  renderRelayTimeMap = () => <div>{ JSON.stringify(this.state.relayTimeMap || {}) }</div>;

  renderAddInput = () =>
    <div>
      <label htmlFor="relayNo">
        relay #:
        <select ref={ i => (this.relayNo = i) }>
          { _.range(1, 16).map(i => <option key={ i } value={ i }>{ i }</option>) }
        </select>
      </label>
      <label htmlFor="on">
        on: <input ref={ i => (this.onTime = i) } type="text" name="on" />
      </label>
      <label htmlFor="off">
        off: <input  ref={ i => (this.offTime = i) } type="text" name="off" />
      </label>
      <button onClick={ this.done }>
        <i className={ 'fa fa-check' } />
      </button>
    </div>;

  render = () => {
    console.log(this.state);
    return <div>
      { this.renderRelayTimeMap() }
      { this.state.adding ? this.renderAddInput() : <noscript /> }
      <button onClick={ this.add }>
        <i className={ 'fa fa-plus' } />
      </button>
      <button onClick={ this.remove }>
        <i className={ 'fa fa-minus' } />
      </button>
    </div>;
  };
}
