import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';

const connect = options => ipcRenderer.send('connect', options);
const send = data => ipcRenderer.send('send', data);


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { host: '192.168.1.185', port: '1109' };

    ipcRenderer.on('connect-reply', (event, { connected }) => {
      this.setState({ connected });
    });
  }

  render() {
    return (
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
        <button onClick={ () => connect(this.state) } disabled={ !!this.state.connected }>Connect</button>
        <button onClick={ () => send('') } disabled={ !this.state.connected }>Send</button>
      </div>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render(<App />, document.getElementById('app'));
