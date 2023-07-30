declare interface Song {
    trackId: number;
    trackName: string;
    artistName: string;
    previewUrl: string;
    artworkUrl100: string;
  }
  
  declare interface SongsGridProps {
    favSongs?: boolean;
    searchTerm?: string;
  }
  