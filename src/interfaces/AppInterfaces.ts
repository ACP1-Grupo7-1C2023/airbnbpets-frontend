export enum UserType {
  Sitter = 'petSitter',
  Host = 'host'
}

export interface Post {
  id: number;
  title: string;
  description: string;
  location: string;
  startat: string;
  finishat: string;
}
