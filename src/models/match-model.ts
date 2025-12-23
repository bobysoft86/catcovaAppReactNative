import { GameBdd } from "./game-model";
import { Player } from "./player-model";

export interface MatchModel {
 id : number

  gameBddId: number;
  gameBdd? :  GameBdd;

  matchDate :Date

  winnerId?  :number
  winner?    :Player

  players?:   MatchPlayer[] 

  matchesNumber: number 
  description : Text
}


export interface MatchCreatePayload{
  gameBddId: number;
  matchDate :Date
  winnerId :number | undefined;
  playerIds:  number[] 
  matchesNumber: number 
  description : string
}

export interface MatchUpdatePayload{
  gameBddId: number;
  matchDate :Date
  winnerId :number
  players:   MatchPlayer[] 
  matchesNumber: number 
  description : Text

}

export interface MatchPlayer{

}