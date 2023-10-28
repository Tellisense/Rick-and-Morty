import Dashboard from "./Dashboard";

export interface MappedEpisode {
  characters: number[];
  id: number;
  name: string;
}
export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }
  return res.json();
}

async function getEpisodes() {
  const res = await fetch("https://rickandmortyapi.com/api/episode", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch episodes");
  }
  return res.json();
}

function mapEpisodes(episodes: Episode[]) {
  return episodes.map((episode: Episode) => {
    return {
      id: episode.id,
      name: episode.name,
      characters: episode.characters.map((url: string) => {
        // Splitting the URL by '/' and taking the last segment as the ID
        return Number(url.split("/").pop());
      }),
    };
  });
}

export default async function Page() {
  const [characterData, episodeData] = await Promise.all([
    getCharacters(),
    getEpisodes(),
  ]);

  const characters = characterData.results;
  const episodes = episodeData.results; // You can now use the episodes data as needed

  return <Dashboard characters={characters} episodes={mapEpisodes(episodes)} />;
}
