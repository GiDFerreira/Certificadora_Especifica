import { Reaction } from "../enums/Reaction";

export const reactionImages: Record<Reaction, string> = {
  [Reaction.Frustrante]: '/bravo.svg',
  [Reaction.Triste]: '/triste.svg',
  [Reaction.Indiferente]: '/indiferente.svg',
  [Reaction.MaisOuMenos]: '/maisoumenos.svg',
  [Reaction.Feliz]: '/feliz.svg',
};

export const reactionDescriptions: Record<Reaction, string> = {
  [Reaction.Frustrante]: 'Frustrante',
  [Reaction.Triste]: 'Triste',
  [Reaction.Indiferente]: 'Indiferente',
  [Reaction.MaisOuMenos]: 'Mais ou menos',
  [Reaction.Feliz]: 'Feliz',
};
