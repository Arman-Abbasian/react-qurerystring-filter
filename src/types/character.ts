type CharacterInfo = {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  
  type CharacterLocation = {
    name: string;
    url: string;
  };
  
  export type CharacterResult = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: CharacterLocation;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
  };
  
  export type RickAndMortyResponse = {
    info: CharacterInfo;
    results: CharacterResult[];
  };