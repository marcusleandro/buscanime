import dragonBall from "@/assets/dragon_ball.jpg";
import naruto from "@/assets/naruto.jpg";
import onePiece from "@/assets/one_piece.jpg";

/** Static featured titles with poster images and pre-filled search queries. */
export const FEATURED_ANIMES = [
  {
    title: "Dragon Ball",
    image: dragonBall,
    alt: "Poster de Dragon Ball Super",
    searchQuery: "Dragon Ball",
    rotate: -8,
  },
  {
    title: "Naruto",
    image: naruto,
    alt: "Poster de Naruto",
    searchQuery: "Naruto",
    rotate: 0,
  },
  {
    title: "One Piece",
    image: onePiece,
    alt: "Poster de One Piece",
    searchQuery: "One Piece",
    rotate: 8,
  },
] as const;

/** Featured classic anime shown on the home page poster stack. */
export type FeaturedAnime = (typeof FEATURED_ANIMES)[number];
