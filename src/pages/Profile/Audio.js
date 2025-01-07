import React from 'react';

const AudioPlayer = () => {
  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls>
        <source src="/audio/bad_piggies_drip.mp3" type="audio/mpeg" />
      </audio>
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/2CUSdI74D2yqrvEXRQq2Xl" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
};

export default AudioPlayer;