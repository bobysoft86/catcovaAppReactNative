import { User } from "../api/auth"
import { MatchModel, MatchPlayer } from "./match-model";
export interface Player {
    id: number;
    ownerId: number;
    owner: User;
    name: string;
    mainPlayer: Boolean;
    createdAt: Date;
    updatedAt: Date;

    participations: MatchPlayer[]
    wins: MatchModel[]
}