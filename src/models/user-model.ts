export interface UserModel {
  id: number;
  name: string;
  credit: number;
  email: string;
  role: string;
  matrixId?:string;
  createdAt:string
  avatar: string
}


export interface UserTypeItem  {
    id: number;
    name: string;
    role: string;
    avatar:string;
    originalId:number;
    matchesPlayed:number
    matchesPlayedlastMonth:number
    type: "USER" | "PLAYER" | "ORG" | "CUSTOMER";
};


export interface matrixData {
  matrixUserId: string;
  matrixAccessToken: string;
  deviceId: string;
}