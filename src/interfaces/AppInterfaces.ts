export enum UserType {
  Sitter = 'petSitter',
  Host = 'host'
}

export interface Post {
  status: string;
  applicantEmail: string;
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
}

export interface Qualification {
  score: number;
  rating: string;
}