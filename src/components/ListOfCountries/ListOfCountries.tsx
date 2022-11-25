import React from 'react';
import './ListOfCountries.css';

interface ListOfCountriesProps {
  countryName: string;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

const ListOfCountries: React.FC<ListOfCountriesProps> = ({countryName, onClick}) => {
  return (
      <span onClick={onClick} className="country-name">{countryName}</span>
  );
};

export default ListOfCountries;