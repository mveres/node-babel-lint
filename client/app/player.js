import React from 'react';

const tickSize = 100; // miliseconds

export default class Player extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 100000,
      paused: true,
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      if (this.state.currentTime >= this.state.duration) {
        this.setState({ paused: true });
        return;
      }

      if (!this.state.paused) this.setState({ currentTime: this.state.currentTime + tickSize });

    }, tickSize);
  };

  play = () => this.setState({ paused: false });

  pause = () => this.setState({ paused: true });

  stop = () => this.setState({ paused: true, currentTime: 0 });

  render = () => {
    const { musicApi } = this.props;
    const { paused, currentTime, duration } = this.state;
    const seekerPosition = currentTime * 100 / duration;
    console.log({ seekerPosition });
    return (
      <div>
        <button disabled={ !musicApi }
                onClick={ () => (musicApi.paused ? musicApi.play() : musicApi.pause()) }>
          <i className={ musicApi && !musicApi.paused ? 'fa fa-pause' : 'fa fa-play' } />
        </button>
        <button disabled={ !musicApi }
                onClick={ () => {
                  musicApi.pause();
                  musicApi.currentTime = 0;
                } }>
          <i className="fa fa-stop" />
        </button>
        <div>
          <progress disabled={ !musicApi }
                    value={ musicApi && musicApi.currentTime || 0 }
                    max={ musicApi && musicApi.duration || 1 } />
          { musicApi && <span>{ musicApi.currentTime }/{ musicApi.duration }</span> }
        </div>

        <div>
          <button onClick={ () => (paused ? this.play() : this.pause()) }>
            <i className={ paused ? 'fa fa-play' : 'fa fa-pause' } />
          </button>
          <button onClick={ this.stop }>
            <i className="fa fa-stop" />
          </button>
        </div>
        <div className="player-container">
          <div className="player-seeker" style={ { left: `${seekerPosition}%` } } />
        </div>

      </div>
    );
  };
}
