import React from 'react';
import _ from 'lodash';
import LoadMusic from './loadMusic';

const tickSize = 0.1;
const uiUnit = 20;

export default class Player extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 240,
      paused: true,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      const { currentTime, duration, paused } = this.state;
      if (currentTime >= duration) {
        this.stop();
        return;
      }

      if (!paused) {
        this.props.onTick && this.props.onTick(currentTime, currentTime + tickSize);
        this.setState({ currentTime: currentTime + tickSize });
      }

    }, tickSize * 1000);
  };

  play = () => {
    this.setState({ paused: false });
    if (this.state.musicApi) this.state.musicApi.play();
  };

  pause = () => {
    this.setState({ paused: true });
    if (this.state.musicApi) this.state.musicApi.pause();
  };

  stop = () => {
    this.setState({ paused: true, currentTime: 0 });
    if (this.state.musicApi) {
      this.state.musicApi.pause();
      this.state.musicApi.currentTime = 0;
    }
    this.props.onStop();
  };

  renderMusicSegment = () => {
    const { musicApi } = this.state;
    if (!musicApi) return <noscript />;

    const width = musicApi.duration * 100 / this.state.duration;
    return (
      <div>
        <div className="player-label" style={ { top: '0rem' } }>music</div>
        <div className="player-segment" style={ { width: `${width}%` } } />
      </div>
    );
  };

  renderRuler = () => {
    const unit = uiUnit * 100 / this.state.duration;
    const barsNo = this.state.duration / uiUnit;

    return _.range(1, barsNo)
            .map(i => <div key={ i }>
                    <div className="player-ruler-bar" style={ { left: `${i * unit}%` } } />
                    <div className="player-ruler-stamp" style={ { left: `${i * unit - 0.5}%` } }>
                      { `${uiUnit * i}s` }
                    </div>
                  </div>,
                );
  };

  renderRelaySegments = () =>
    Object.keys(this.props.relayTimeMap).map((relay, index) => {
      const top = (this.state.musicApi ? 1.5 : 0) + 1.5 * index;
      return <div key={ index }>
        <div className="player-label" style={ { top: `${top}rem` } }>{ `relay ${relay}` }</div>
        {
          this.props.relayTimeMap[relay].map(({ on, off }) => {
            const left = on * 100 / this.state.duration;
            const width = (off - on) * 100 / this.state.duration;
            return <div key={ `${relay}${on}${off}` }
                        className="player-segment"
                        style={ { left: `${left}%`, width: `${width}%`, top: `${top}rem` } } />;
          })
        }
      </div>;
    });

  render = () => {
    const { paused, currentTime, duration } = this.state;
    const seekerPosition = currentTime * 100 / duration;
    const height = Math.max(
      (this.state.musicApi ? 1.5 : 0) + (Object.keys(this.props.relayTimeMap).length * 1.5) + 0.5,
      3,
    );

    return (
      <div className="player-container">
        <div className="player-time-container" style={ { height: `${height}rem` } }>
          { this.renderMusicSegment() }
          { this.renderRelaySegments() }
          <div className="player-seeker-time" style={ { left: `${seekerPosition - 1}%` } }>
            { `${currentTime.toFixed(1)}s` }
          </div>
          <div className="player-seeker" style={ { left: `${seekerPosition}%` } } />
          { this.renderRuler() }
        </div>
        <div className="player-controls">
          <button onClick={ () => (paused ? this.play() : this.pause()) }>
            <i className={ paused ? 'fa fa-play' : 'fa fa-pause' } />
          </button>
          <button onClick={ this.stop }>
            <i className="fa fa-stop" />
          </button>
          <LoadMusic onMusicLoaded={ (musicApi, fileName) => this.setState({ musicApi, fileName }) } />
          <div>{ this.state.fileName || 'no music file loaded' }</div>
        </div>
      </div>
    );
  };
}
