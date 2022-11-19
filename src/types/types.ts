export interface typeStore {
  rickAndMorti: initState;
}

export interface initState {
  characters: object[];
  char: Char;
  isError: boolean;
  isLoading: boolean;
  pages: number;
  StatusArr: string[];
  GenderArr: string[];
}

export interface getChars {
  info: PageInfo;
  results: [Char];
}

export interface PageInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Char {
  id?: number;
  text?: string;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: Location;
  location?: Location;
  image?: string;
  url?: string;
  created?: Date;
  episode?: string[];
}

export interface Location {
  name: string;
  url: string;
}

export interface PageError extends Error {
  message: string;
  data: null | string | number;
  status: number;
  statusText: string;
}
