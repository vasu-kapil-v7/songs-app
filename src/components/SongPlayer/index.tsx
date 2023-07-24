import React, { useState, useEffect } from "react";

const Player: React.FC<{ songUrl: string }> = ({ songUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="player" style={{ margin: "24px" }}>
      <audio ref={audioRef} src={songUrl}></audio>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Player;
