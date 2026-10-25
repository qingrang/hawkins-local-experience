export interface Character {
  id: string;
  nameZh: string;
  nameEn: string;
  actor: string;
  firstSeason: number;
  seasonOneIdentity: string;
  bioZh: string;
  photo: string;
}

export interface Monster {
  id: string;
  nameZh: string;
  nameEn: string;
  dangerLevel: 1|2|3|4|5;
  firstAppearance: string;
  featuresZh: string;
  photo: string;
}

export interface Location {
  id: string;
  nameZh: string;
  nameEn: string;
  category: 'normal'|'upside-down'|'lab';
  bioZh: string;
  photo: string;
}

export interface Episode {
  season: number;
  episode: number;
  titleEn: string;
  airDate: string;
  runtime: number;
  still?: string;
}

export interface Season {
  season: number;
  year: number;
  poster: string;
  episodeCount: number;
  episodes: Episode[];
}
