export interface Country {
  name: { common: string };
  cca3: string;
  region: string;
  population: number;
  area: number;
  languages?: { [key: string]: string };
  flags: { png: string };
}
