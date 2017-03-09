import React from 'react';
import _ from 'lodash';

export default class Relays extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  computeSegmentId = (relayNo, { on, off }) => `${relayNo}-${on}-${off}`;

  add = () => this.setState({ adding: true });

  remove = (relayNo, segmentId) => {
    const { relayTimeMap } = this.state;

    relayTimeMap[relayNo] =
      relayTimeMap[relayNo].filter(segment => this.computeSegmentId(relayNo, segment) !== segmentId);

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
    const newRelayTimeMap = {
      ...relayTimeMap,
      [relayNo]: [
        ...timeArray,
        {
          on: this.onTime.value,
          off: this.offTime.value,
        },
      ],
    };

    const csvHeader = 'relay,on,off';
    const csvContent = _.keys(newRelayTimeMap)
      .map(relay => newRelayTimeMap[relay].map(time => `${relay},${time.on},${time.off}`))
      .reduce((acc, val) => [...acc, val]);

    const csv = [csvHeader, ...csvContent].join('\n');
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const downloadUrl = URL.createObjectURL(csvBlob);

    this.setState(
      {
        relayTimeMap: newRelayTimeMap,
        adding: false,
        downloadUrl,
      },
      () => this.props.onRelayTimeMapChanged && this.props.onRelayTimeMapChanged(this.state.relayTimeMap || {}),
    );
  };

  parseCsv = csv => {
    const [, ...lines] = csv.split('\n');
    return lines.filter(l => !!l)
                .map(l => {
                  const a = l.split(',').map(i => i.trim());
                  return { relay: +a[0], on: +a[1], off: +a[2] };
                })
                .reduce(
                  (acc, val) => {
                    const { relay, ...time } = val;
                    acc[relay] = [...(acc[relay] || []), time];
                    return acc;
                  },
                  {},
                );
  };

  fileLoaded = () => {
    const file = this.fileLoader.files[0];
    if (!file) {
      console.error('no relay config file loaded');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      console.log('loaded config:', reader.result);

      this.setState(
        { relayTimeMap: this.parseCsv(reader.result) },
        () => this.props.onRelayTimeMapChanged && this.props.onRelayTimeMapChanged(this.state.relayTimeMap || {}),
      );
    };

    reader.readAsText(file);
  };

  renderRelayTimeMap = () => {
    const timeMap = this.state.relayTimeMap || {};
    return (
      <div>
        {
          Object.keys(this.state.relayTimeMap || {})
                .map(relayNo =>
                  timeMap[relayNo].map(segment =>
                    <div key={ this.computeSegmentId(relayNo, segment) }>
                      <span className="relay-label">{ `relay ${relayNo}:` }</span>
                      <span className="relay-label">start:</span>
                      <span className="relay-label">{ segment.on }</span>
                      <span className="relay-label">stop:</span>
                      <span className="relay-label">{ segment.off }</span>
                      <button className="relay-remove-button"
                              onClick={ () => this.remove(relayNo, this.computeSegmentId(relayNo, segment)) }>
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
        <div>
          <button className="text-button" onClick={ this.add }> add </button>
          {
            this.state.downloadUrl &&
            <a href={ this.state.downloadUrl } download="relay_time_config.csv">
              <button className="text-button"> save </button>
            </a>
          }

          <input type="file"
                 name="file"
                 id="file"
                 className="load-file-input"
                 accept=".csv"
                 multiple={ false }
                 ref={ e => (this.fileLoader = e) }
                 onChange={ this.fileLoaded } />
          <label htmlFor="file" className="load-relays-label"> load </label>
        </div> ||
        <noscript />
      }
    </div>;
  };
}
