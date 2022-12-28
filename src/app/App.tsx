import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import videojs, { VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';

export const playerOptions = {
  preload: 'auto',
  controls: true,
  responsive: true,
  fluid: true,
  inactivityTimeout: 0, // always show controls, never fade away
  controlBar: {
    children: [
      'playToggle',
      'ProgressControl',
      'CurrentTimeDisplay',
      'VolumePanel',
    ],
  },
} as VideoJsPlayerOptions;

function App(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const videoRef = React.useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = React.useRef<any>(null);

  useEffect(() => {
    // Make sure videojs player is initialized once only
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const player = (playerRef.current! = videojs(
        videoElement,
        {
          ...playerOptions,
          autoplay: true,
          sources: [
            {
              src: 'https://storage.googleapis.com/90seconds-production-attachments/attachment/attachment/2cb5dcf7092dc999f1aceb1e136dbb0a/SG-Sports-Hub-v5.mp4',
              type: 'video/mp4',
            },
          ],
        },
        () => {
          playerRef.current = player;
        }
      ));
    } else {
      const player = playerRef.current;

      player.autoplay(playerOptions.autoplay);
      player.src(playerOptions.sources);
    }
  }, [playerOptions, videoRef]);

  return (
    <Router>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>{' '}
    </Router>
  );
}

export default App;
