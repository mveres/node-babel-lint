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
      <div>
        <span className="connection-label">host:</span>
        <input type="text"
               name="host"
               onChange={ event => this.setState({ host: event.target.value }) }
               value={ this.state.host } />
      </div>
      <div>
        <span className="connection-label">port:</span>
        <input type="text"
               name="port"
               onChange={ event => this.setState({ port: event.target.value }) }
               value={ this.state.port } />
      </div>
      <div>
        <span className="connection-label">status:</span>
        <span className={ this.state.connected ? 'connection-status-connected' : 'connection-status-disconnected' }>
          { this.state.connected ? 'connected' : 'not connected'}
        </span>
      </div>
      <button className="text-button"
              onClick={ () => connect({ host: this.state.host, port: this.state.port }) }
              disabled={ !!this.state.connected }>
        connect
      </button>
    </div>;
}
