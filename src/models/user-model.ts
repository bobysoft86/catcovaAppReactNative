export interface UserModel {
  id: number;
  name: string;
  credit: number;
  email: string;
  role: string;
}


export interface UserTypeItem  {
    id: number;
    name: string;
    role: string;
    originalId:number;
    type: "USER" | "PLAYER" | "ORG" | "CUSTOMER";
};
