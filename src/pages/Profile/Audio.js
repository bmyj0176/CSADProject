import React from 'react';

const AudioPlayer = () => {
  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls>
        <source src="/audio/bad_piggies_drip.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;