import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './CountryInfo.scss';
import { ICountries } from "../../types/globalTypes";
import { useAppSelector } from "../../redux/store";

export const CountryInfo: React.FC<ICountries> = ({code, name, capital, population, area}) => {
  const params = useParams();
  const page = params.part;
  const navigate = useNavigate();
  const isOpenInfoBar = useAppSelector(state => state.openInfoBar.isOpenInfoBar);
  //make indents between thousandths:
  const people = population.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  const square = area.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

  const [classInfo, changeClassInfo] = useState('country-info show');

  const closeInfo = () => {
    changeClassInfo('country-info hide');
    setTimeout(() => {
      navigate(`/countries/${page}`);
    }, 450);
  }

  useEffect(() => {
    if (isOpenInfoBar === 'close') {
      closeInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenInfoBar]);

  return (
    <div className={classInfo}>
      <div className='content country-info__content'>
        <div className='sectionInfo'>
          <div className='sectionName'>
            <h2 className='country-info__name'>{name}</h2>
            <h4>Capital: <span className='country-info__capital'>{capital}</span></h4>
          </div>
        </div>
        <img className='sectionInfo flag-preview-info' src={`/img/flags/${code}.png`} alt={name}/>
        <div className='sectionInfo'>
          <div className='country-info__properties'>
            <h3>Population: <span className='country-info__value'>{people}</span></h3>
            <h3>Total area: <span className='country-info__value'>{square}</span> km<sup>2</sup></h3>
          </div>
        </div>
      </div>
      <div className='material-icons button-close' onClick={closeInfo}>close</div>
    </div>
  );
};
