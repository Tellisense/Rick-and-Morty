"use client";
import styles from "./dashboard.module.css";
import { Card } from "../components/Card/Card";
import { useState } from "react";
import { Character, MappedEpisode } from "./page";

interface DashboardProps {
  characters: Character[];
  episodes: MappedEpisode[];
}

async function getCharacters(characters: number[] | undefined) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${characters}`
  );
  return await res.json();
}

export default function Dashboard({
  characters: allCharacters,
  episodes,
}: DashboardProps) {
  const [currentCharacters, setCurrentCharacters] = useState(allCharacters);
  const [currentEpisode, setCurrentEpisode] = useState({ name: "", id: 0 });
  const [loading, setLoading] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const episodeId = parseInt((e.target as HTMLDivElement).id, 10);
    if (currentEpisode.id === episodeId) {
      setCurrentEpisode({ name: "", id: 0 });
      setCurrentCharacters(allCharacters);
      return;
    }
    const episodeTitle = (e.target as HTMLDivElement).innerText;

    const episode = episodes.find((ep: MappedEpisode) => ep.id === episodeId);
    setLoading(true);
    const characters = await getCharacters(episode?.characters);
    setLoading(false);
    setCurrentEpisode({ name: episodeTitle, id: episodeId });
    setCurrentCharacters(characters);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Rick and Morty Characters</p>
      </div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <p>Episodes: </p>
          {episodes.map((episode: MappedEpisode) => {
            return (
              <div
                onClick={handleClick}
                className={
                  episode.id === currentEpisode.id
                    ? styles.selected
                    : styles.episode
                }
                key={episode.id}
                id={episode.id.toString()}
              >
                {episode.name}
              </div>
            );
          })}
        </aside>
        <div>
          {currentEpisode.name && (
            <div className={styles.counter}>
              {`${currentCharacters.length} characters in "${currentEpisode.name}" episode.`}
            </div>
          )}
          <main className={styles.charContainer}>
            {currentCharacters.map((character: Character) => (
              <Card
                key={character.id}
                name={character.name}
                image={character.image}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
