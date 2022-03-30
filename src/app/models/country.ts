export interface Country {
  flag: string;
  name: string;
  capital: string;
  region: Region;
  languages: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
  Antarctic = 'Antarctic',
}
