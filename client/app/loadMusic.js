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
      setTimeout(() =>
        this.props.onMusicLoaded && this.props.onMusicLoaded(this.audio, file.name),
        800,
      );
    };
    reader.readAsDataURL(file);
  };

  render = () =>
    <span>
      <input type="file"
             name="music"
             id="music"
             className="load-file-input"
             accept="audio/*"
             multiple={ false }
             ref={ e => (this.fileLoader = e) }
             onChange={ this.fileLoaded } />
           <label htmlFor="music" className="load-music-label">
             <i className="fa fa-eject" />
           </label>
      <audio ref={ e => (this.audio = e) } />
    </span>;
}
