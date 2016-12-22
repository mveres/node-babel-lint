import React from 'react';
import _ from 'lodash';

export default class Relays extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  add = () => this.setState({ adding: true });

  remove = (relayNo, segmentId) => {
    const { relayTimeMap } = this.state;
    relayTimeMap[relayNo] = relayTimeMap[relayNo].filter(segment => segment.id !== segmentId);
    if (!relayTimeMap[relayNo].length) delete relayTimeMap[relayNo];
    this.setState(
      { relayTimeMap },
      () => this.props.onRelayTimeMapChanged && this.props.onRelayTimeMapChanged(this.state.relayTimeMap || {}),
    );
  };

  done = () => {
    const relayNo = this.relayNo.options[this.relayNo.selectedIndex].value;
    const relayTimeMap = this.state.relayTimeMap || {};
    const timeArray = relayTimeMap[relayNo] || [];
    this.setState({
      relayTimeMap: {
        ...relayTimeMap,
        [relayNo]: [
          ...timeArray,
          {
            on: this.onTime.value,
            off: this.offTime.value,
            id: `${relayNo}_${this.onTime.value}_${this.offTime.value}`,
          },
        ],
      },
      adding: false,
    },
    () => this.props.onRelayTimeMapChanged && this.props.onRelayTimeMapChanged(this.state.relayTimeMap || {}));
  };

  renderRelayTimeMap = () => {
    const timeMap = this.state.relayTimeMap || {};
    return (
      <div>
        {
          Object.keys(this.state.relayTimeMap || {})
                .map(relayNo =>
                  timeMap[relayNo].map(segment =>
                    <div key={ segment.id }>
                      <span className="relay-label">{ `relay ${relayNo}:` }</span>
                      <span className="relay-label">start:</span>
                      <span className="relay-label">{ segment.on }</span>
                      <span className="relay-label">stop:</span>
                      <span className="relay-label">{ segment.off }</span>
                      <button className="relay-remove-button"
                              onClick={ () => this.remove(relayNo, segment.id) }>
                        <i className={ 'fa fa-trash' } />
                      </button>
                    </div>,
                  ),
                )
              }
      </div>
    );
  };

  renderAddInput = () =>
    <div>
      <span className="relay-label">relay #:</span>
      <select ref={ i => (this.relayNo = i) }>
        { _.range(1, 17).map(i => <option key={ i } value={ i }>{ i }</option>) }
      </select>
      <span className="relay-label">start:</span>
      <input ref={ i => (this.onTime = i) } type="number" step="0.1" />
      <span className="relay-label">stop:</span>
      <input  ref={ i => (this.offTime = i) } type="number" step="0.1" />
      <button className="relay-done-button"
              onClick={ this.done }>
        <i className={ 'fa fa-check' } />
      </button>
    </div>;

  render = () => { // eslint-disable-line
    return <div>
      { this.renderRelayTimeMap() }
      { this.state.adding ? this.renderAddInput() : <noscript /> }
      {
        !this.state.adding &&
        <button className="text-button"
                onClick={ this.add }>
          add
        </button> ||
        <noscript />
      }
    </div>;
  };
}
