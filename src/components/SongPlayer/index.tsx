import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PlayArrow as PlayArrowIcon, Favorite as FavoriteIcon, PauseCircleOutlineRounded } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { currentPlayingSongAtom } from "../../atom/CurrentSong";

const Player: React.FC<{ songUrl: string, isFavorite: boolean, onAddToFavorites: () => void; onRemoveFromFavorites: () => void; }> = ({ songUrl, isFavorite, onAddToFavorites, onRemoveFromFavorites }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef<HTMLAudioElement>();
  const [currentPlayingSong, setCurrentPlayingSong] = useRecoilState<string | null>(currentPlayingSongAtom);

  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      setCurrentPlayingSong(songUrl);
    } else {
      audioRef.current?.pause();
      setCurrentPlayingSong(null); 
    }
  }, [isPlaying, songUrl, setCurrentPlayingSong]);

  return (
    <div className="player" style={{ margin: "24px" }}>
      <audio ref={audioRef} src={songUrl}></audio>
      <IconButton onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <PauseCircleOutlineRounded /> : <PlayArrowIcon />}
      </IconButton>
      {isFavorite ? (
        <IconButton color="secondary" aria-label="favorite" onClick={onRemoveFromFavorites}>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton color="default" aria-label="favorite" onClick={onAddToFavorites}>
          <FavoriteIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Player;
