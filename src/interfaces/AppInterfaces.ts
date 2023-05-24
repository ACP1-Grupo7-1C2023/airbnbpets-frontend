export enum UserType {
  Sitter = 'petSitter',
  Host = 'host'
}

export interface Post {
  id: number;
  title: string;
  description: string;
  location: string;
  startAt: string;
  finishAt: string;
  homeUrls: string[];
  petUrls: string[];
  hostEmail: string;
}

export interface Applications {
  name: string;
  lastname: string;
  email: string;
  status: string;
}

export interface Qualification {
  score: number;
  rating: string;
}