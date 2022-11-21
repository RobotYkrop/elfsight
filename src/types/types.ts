export interface typeStore {
  rickAndMorti: initState;
}

export interface initState {
  characters: object[];
  char: Char;
  error: SerializedError | any;
  isLoading: boolean;
  pages: number;
  isOpen: boolean;
  StatusArr: string[];
  GenderArr: string[];
  filters: queryFilter;
}

export interface queryFilter {
  text: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}

export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
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

export interface PageError {
  message: string;
  data: null | string | number;
  status: number;
  statusText: string;
}
