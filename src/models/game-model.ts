
// === ENUMS BACKEND ===


import { OrganizationModel } from "./organization-model";
import { RentalModel } from "./rental";
import { UserModel } from "./user-model";

export enum Lang {
  en = 'en',
  es = 'es',
  ca = 'ca',
}

export enum GameSource {
  BGG = 'BGG',
  CUSTOM = 'CUSTOM',
}

export enum MetaSource {
  BGG = 'BGG',
  CUSTOM = 'CUSTOM',
}

// === TRANSLATIONS ===

export interface GameBddTranslation {
  id: number;
  gameId: number;
  lang: Lang;
  name: string;
  description?: string | null;

  languageDependence?: string | null;
  suggestedNoPlayers?: string | null;

  createdAt: string;
  updatedAt: string;
}

// === CATEGORÍAS / MECÁNICAS / FAMILIAS ===

export interface GameCategoryTranslation {
  id: number;
  categoryId: number;
  lang: Lang;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameCategory {
  id: number;
  key: string;
  source: MetaSource;
  createdAt: string;
  updatedAt: string;
  translations?: GameCategoryTranslation[];
}

export interface BoardGameMechanicsTranslation {
  id: number;
  mechanicsId: number;
  lang: Lang;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardGameMechanics {
  id: number;
  key: string;
  source: MetaSource;
  createdAt: string;
  updatedAt: string;
  translations?: BoardGameMechanicsTranslation[];
}

export interface BoardGameFamilyTranslation {
  id: number;
  familyId: number;
  lang: Lang;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardGameFamily {
  id: number;
  key: string;
  source: MetaSource;
  createdAt: string;
  updatedAt: string;
  translations?: BoardGameFamilyTranslation[];
}

// === DISEÑADORES / EDITORIALES ===

export interface BoardGameDesigners {
  id: number;
  key?: string | null;
  source: MetaSource;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardGamePublisher {
  id: number;
  key?: string | null;
  source: MetaSource;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// === OWNED / WISHED (versión mínima para front) ===

export interface OwnedGame {
  id: number;
  ownerId: number;
  owner?: UserModel;
  gameBddId: number;
  gameBdd?: GameBdd
  statusId?: number;
  status?: GameStatus;
  code?: string;
  locationId?: number | null;
  location?:OrganizationModel;
  value?: number;

  rentals?: RentalModel[];
  isActiveToRent?: boolean;
  maxRentTime?: number;
  isActiveToChange?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payload para crear un OwnedGame (sin los campos generados por el backend)
export type OwnedGameCreatePayload = Omit<OwnedGame, "id" | "createdAt" | "updatedAt" | "gameBdd">;

export interface WishedGame {
  id: number;
  ownerId: number;
  gameBddId: number;
  isActive: boolean;
}


export interface GameStatus {
  id: number;
  name: string;
  description?: string;
}
// === GAMEBDD PRINCIPAL ===

export interface GameBdd {
  id: number;
  bggId?: number | null;
  source: GameSource;

  minPlayers: number;
  maxPlayers: number;
  playTime: number;
  minplaytime: number;
  maxplaytime: number;
  minAge: number;
  suggestedAge: number;
  yearPublished: number;
  rating?:number
  // si finalmente has movido thumbnail/image al GameBdd:
  thumbnail?: string | null;
  image?: string | null;

  createdAt: string;
  updatedAt: string;

  categories?: GameCategory[];
  mechanics?: BoardGameMechanics[];
  families?: BoardGameFamily[];
  designers?: BoardGameDesigners[];
  publishers?: BoardGamePublisher[];

  translations: GameBddTranslation[];

  // relaciones “de usuario”
  ownedGame?: OwnedGame[];
  wishedGame?: WishedGame[];

  // campo extra que devuelve tu endpoint getGameById
  bestTranslation: GameBddTranslation;
}

// === Variantes útiles para el front ===

// Lo que devuelve /gamesBdd/search (lista)
export interface GameBddSearchItem {
  id: number;
  bggId?: number | null;
  minPlayers: number;
  maxPlayers: number;
  yearPublished: number;
  thumbnail?: string | null;
  image?: string | null;
  translations: Pick<GameBddTranslation, 'id' | 'lang' | 'name'>[];
}

export interface GameBddDetail extends GameBdd {}
