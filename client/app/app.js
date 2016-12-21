import React from 'react';
import ReactDOM from 'react-dom';
import Collapsible from 'react-collapsible';
import Header from './header';
import Connection from './connection';
import LoadMusic from './loadMusic';
import Relays from './relays';
import Player from './player';
import { switchRelay } from './relayAdapter';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onPlayerTick = (start, end) => {
    const { relayTimeMap } = this.state;
    if (!relayTimeMap) return;

    Object.keys(relayTimeMap)
          .map(relayNo =>
            relayTimeMap[relayNo].map(({ on, off }) => [
              ...(start <= on && on < end ? [{ no: relayNo, state: 'on' }] : []),
              ...(start <= off && off < end ? [{ no: relayNo, state: 'off' }] : []),
            ]).reduce((acc, current) => [...acc, ...current], []))
          .reduce((acc, current) => [...acc, ...current], [])
          .forEach(switchRelay);
  };

  render() {
    return (
      <div className="app-container">
        <Collapsible trigger={ <Header text="Connection" /> }
                     triggerWhenOpen={ <Header text="Connection" open={ true } /> }>
          <div className="collapsible-content">
            <Connection />
          </div>
        </Collapsible>
        <Collapsible trigger={ <Header text="Load Music" /> }
                     triggerWhenOpen={ <Header text="Load Music" open={ true } /> }>
          <div className="collapsible-content">
            <LoadMusic onMusicLoaded={ musicApi => this.setState({ musicApi }) } />
          </div>
        </Collapsible>
        <Collapsible trigger={ <Header text="Relay Config" /> }
                     triggerWhenOpen={ <Header text="Relay Config" open={ true } /> }>
          <div className="collapsible-content">
            <Relays onRelayTimeMapChanged={ relayTimeMap => this.setState({ relayTimeMap }) } />
          </div>
        </Collapsible>
        <Player musicApi={ this.state.musicApi }
                relayTimeMap={ this.state.relayTimeMap || {} }
                onTick={ this.onPlayerTick } />
      </div>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render(<App />, document.getElementById('app'));
