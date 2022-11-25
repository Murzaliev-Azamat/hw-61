import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import ListOfCountries from "./components/ListOfCountries/ListOfCountries";
import AboutCountry from "./components/AboutCountry/AboutCountry";
import {ApiCounties, ApiCountry, CountriesProps} from "./types";

const allCountiesUrl = 'https://restcountries.com/v2/all?fields=alpha3Code,name';
const aboutCountry = 'https://restcountries.com/v2/alpha/';

function App() {
  const [countries, setCountries] = useState<CountriesProps[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [country, setCountry] = useState<ApiCountry | null>(null);

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<ApiCounties[]>(allCountiesUrl);
    const newCountries = countriesResponse.data.map((country) => {
      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
      }
    })
    setCountries(newCountries);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData]);

  const fetchCountry = useCallback(async (selectedId: string) => {
    const countryResponse = await axios.get<ApiCountry>(aboutCountry + selectedId);
    setCountry({name: countryResponse.data.name,
      capital: countryResponse.data.capital,
      population: countryResponse.data.population,
      borders: countryResponse.data.borders,
      flags: {
        svg: countryResponse.data.flags.svg,
        png: countryResponse.data.flags.png,
      }
      })
  }, []);

  useEffect(() => {
    if (selectedCountryId !== null) {
      fetchCountry(selectedCountryId).catch(console.error)
    }
  }, [selectedCountryId, fetchCountry]);

  let infoAbout = (<h2>Plz select a country!</h2>);

  if (country !== null) {
    infoAbout = (
      <AboutCountry capital={country.capital} name={country.name} population={country.population} borders={country.borders} flags={country.flags}/>
    )
  }

  return (
    <div className="App">
      <div className="List-container">
        {countries.map((country) => (
          <ListOfCountries key={country.alpha3Code} countryName={country.name} onClick={() => setSelectedCountryId(country.alpha3Code)}/>
        ))}
      </div>
      {infoAbout}
    </div>
  );
}

export default App;
