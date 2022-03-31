import { Region } from 'src/app/models/country';

export interface Search {
  searchTerm: string;
  region: Region | null;
  date: Date;
}
