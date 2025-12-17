export interface Transaction {
  id: number;
  userId: number;
  articleId?: number;
  ownedGameId?: number;

  points: number;
  typeId: number;
  createdAt: string;
}