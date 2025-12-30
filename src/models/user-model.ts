export interface UserModel {
  id: number;
  name: string;
  credit: number;
  email: string;
  role: string;
  matrixId?:string;
  avatar: string
}


export interface UserTypeItem  {
    id: number;
    name: string;
    role: string;
    avatar:string;
    originalId:number;
    type: "USER" | "PLAYER" | "ORG" | "CUSTOMER";
};


export interface matrixData {
  matrixUserId: string;
  matrixAccessToken: string;
  deviceId: string;
}