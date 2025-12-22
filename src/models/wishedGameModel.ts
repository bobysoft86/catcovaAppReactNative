import { GameBdd } from "./game-model";

export interface WishedGameModel{
    id: number,
    ownerId: 1,
    gameBddId: 2,
    isActive: true,
    gameBdd: GameBdd
      createdAt: string;
  updatedAt: string;
}