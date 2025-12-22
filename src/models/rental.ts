import { User } from "../api/auth";
import { OwnedGame } from "./game-model";

export interface RentalModel {

  id     : number;
  userId :number;
  user:User
  gameId: number
  game: OwnedGame 
  creditWasted: number;

  rentalStatusId: number;
  rentalStatus: RentalStatusModel

  rentDate :Date
  returnDate: Date
  status:    boolean
  createdAt: Date
}


export interface RentalStatusModel {
  id       : Number
  name: String
  createdAt: Date
  updatedAt : Date
}
