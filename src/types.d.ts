export interface CountriesProps {
  name: string;
  alpha3Code: string;
}

export  interface ApiCounties {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export  interface ApiCountry {
  name: string;
  capital: string;
  population: number,
  borders?: string [],
  flags: {
    svg: string,
    png: string,
  }
}