import React from 'react';

export default class LoadMusic extends React.Component {

  fileLoaded = () => {
    const file = this.fileLoader.files[0];
    if (!file) {
      console.error('no music file loaded');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.audio.src = reader.result;
      setTimeout(() => this.props.onMusicLoaded && this.props.onMusicLoaded(this.audio), 300);
    };
    reader.readAsDataURL(file);
  };

  render = () =>
    <div>
      <input type="file"
             accept="audio/*"
             multiple={ false }
             ref={ e => (this.fileLoader = e) }
             onChange={ this.fileLoaded } />
      <audio ref={ e => (this.audio = e) } />
    </div>;
}
