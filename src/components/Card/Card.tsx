"use client";
import Image from "next/image";
import styles from "./card.module.css";
interface CardProps {
  name: string;
  image: string;
}

export const Card = ({ name, image }: CardProps) => {
  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={name}
        className={styles.image}
        width={300}
        height={300}
      />
      <p>{name}</p>
    </div>
  );
};
