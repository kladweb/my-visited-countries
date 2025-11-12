import React from "react";
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { type RootState, useAppDispatch, useAppSelector } from "../../store/store.ts";
import { updateData } from "../../store/countriesSlice.ts";
import { ScrollUp } from "../ScrollUp/ScrollUp";
import { sortingCountries } from "../../utilities/sortingCountries";
import './CountriesBasis.scss';

export const CountriesBasis = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const part = params.part;
  const countPages = useAppSelector((state: RootState) => state.countries.countPages);
  const dataCountries = useAppSelector((state: RootState) => state.countries.data);

  const navPagesCode = () => {
    const navPages = [];
    for (let i = 1; i <= countPages; i++) {
      navPages.push(
        <NavLink to={`/countries/${i}`} className='navPages-links' key={i}>
          <span className='navPages-items'>{i}</span>
        </NavLink>
      );
    }
    return navPages;
  }

  function sortCountries(e: React.ChangeEvent<HTMLSelectElement>) {
    if (dataCountries) {
      const newData = sortingCountries(e.target.value, dataCountries);
      dispatch(updateData(newData));
    }
  }

  function getLinkClass(obj: { isActive: boolean }) {
    let className = "navPages-links";
    if (obj.isActive) {
      className += " active";
    }
    return className;
  }

  return (
    <>
      <ScrollUp/>
      <div className='typeSorting'>
        <span className='typeSorting-name'>Sort by:</span>
        <select onChange={sortCountries}>
          <option value="name">country name (default)</option>
          <option value="population">population (ascending)</option>
          <option value="population-des">population (descending)</option>
          <option value="area">total area (ascending)</option>
          <option value="area-des">total area (descending)</option>
        </select>
      </div>
      {
        (part !== 'visited') &&
        <div className='navPages'>
          <span className='navPages-items navPages-name'>PAGES: </span>
          <NavLink to={`/countries/all`} className={getLinkClass} key={countPages + 1}>
            <span className='navPages-items'>ALL</span>
          </NavLink>
          {navPagesCode()}
        </div>
      }
      <Outlet/>
    </>
  );
}
