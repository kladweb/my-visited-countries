import { NavLink } from "react-router-dom";
import './CountryMain.scss';
import logoPic from "../../assets/img/shared/logo.avif";

export const CountryMain = () => {

  return (
    <>
      <h1>COUNTRY GUIDE</h1>
      <img className="main-logo" src={logoPic} alt="COUNTRY GUIDE"/>
      <p>
        On this site you can learn the flags of the countries of the world, as well as get information about
        the countries (e.g., total area, population).
      </p>
      <NavLink to={'/countries/all'} className='main-button'>
        <span className='main-button__name'>LIST OF COUNTRIES</span>
      </NavLink>
    </>
  );
};
