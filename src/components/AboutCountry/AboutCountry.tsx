import React, {useCallback, useEffect, useState} from 'react';
import './AboutCountry.css';
import {ApiCountry} from "../../types";
import axios from "axios";

const countryUrl = 'https://restcountries.com/v2/alpha/'

interface CountryName {
  name: string;
}

const AboutCountry: React.FC<ApiCountry> = ({name, capital, population, borders, flags}) => {
  const [borderCountryNames, setBorderCountryNames] = useState<CountryName[]>([]);

  const fetchBorderCountries = useCallback(async () => {
    if (borders !== undefined) {
      const promises = borders.map (async border => {
        const borderNameResponse = await axios.get<CountryName>(countryUrl + border);
        return {
          name: borderNameResponse.data.name,
        }
      })
      const borderNames = await Promise.all(promises);
      setBorderCountryNames(borderNames)
    }
  }, [borders]);

  useEffect(() => {
    fetchBorderCountries().catch(console.error)
  }, [fetchBorderCountries]);

  let isBorders = null;

  if (borders !== undefined) {
    isBorders = (
      <>
    <h3>Border with:</h3>
    <ul>
      {borderCountryNames.map(border => (
        <li key={border.name}>{border.name}</li>
      ))}
    </ul>
      </>
  )
  }

  return (
    <div className="about-container">
      <div>
        <h1>{name}</h1>
        <h3>Capital:</h3><span>{capital}</span>
        <h3>Population:</h3><span>{population} M</span>
        {isBorders}
      </div>
      <div>
        <img src={flags.png} alt="flag"/>
      </div>
    </div>
  );
};

export default AboutCountry;