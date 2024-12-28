import React from 'react';

const AudioPlayer = () => {
  return (
    <div>
      <audio controls>
        <source src="/audio/bad_piggies_drip.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;