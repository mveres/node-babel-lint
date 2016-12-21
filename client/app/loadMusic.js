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
      setTimeout(() => {
        this.props.onMusicLoaded && this.props.onMusicLoaded(this.audio);
        this.setState({ fileName: file.name });
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  render = () =>
    <div>
      <input type="file"
             name="file"
             id="file"
             className="load-music-input"
             accept="audio/*"
             multiple={ false }
             ref={ e => (this.fileLoader = e) }
             onChange={ this.fileLoaded } />
           <label htmlFor="file" className="fa fa-eject" />
           <span>
             { this.state && this.state.fileName || 'Choose a music file' }
           </span>
      <audio ref={ e => (this.audio = e) } />
    </div>;
}
