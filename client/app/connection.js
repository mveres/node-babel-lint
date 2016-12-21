import React from 'react';
import { connect, onConnected } from './relayAdapter';

export default class Connection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      host: '192.168.1.185',
      port: '1109',
    };

    onConnected(connected => this.setState({ connected }));
  }

  render = () =>
    <div>
      <label htmlFor="host">
        Host:
        <input type="text"
               name="host"
               onChange={ event => this.setState({ host: event.target.value }) }
               value={ this.state.host } />
      </label>
      <label htmlFor="port">
        Port:
        <input type="text"
               name="port"
               onChange={ event => this.setState({ port: event.target.value }) }
               value={ this.state.port } />
      </label>
      <div> { this.state.connected ? 'Connected' : 'Not Connected'} </div>
      <button onClick={ () => connect({ host: this.state.host, port: this.state.port }) } disabled={ !!this.state.connected }>Connect</button>
    </div>;
}
