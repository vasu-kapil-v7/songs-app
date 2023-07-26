declare interface Song {
    trackId: number;
    trackName: string;
    artistName: string;
    previewUrl: string;
  }
  
  declare interface SongsGridProps {
    favSongs?: boolean;
    searchTerm?: string;
  }
  