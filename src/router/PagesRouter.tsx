import { lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import { PageMain } from '../pages/PageMain';
import { PageCountries } from '../pages/PageCountries';
import { CountryInfoBar } from '../pages/CountryInfoBar';

const PageLoginLogout = lazy(() => import("../pages/PageLoginLogout")
  .then((module) => ({default: module.PageLoginLogout})));

const PageTravelers = lazy(() => import("../pages/PageTravelers")
  .then((module) => ({default: module.PageTravelers})));

const PageAbout = lazy(() => import("../pages/PageAbout")
  .then((module) => ({default: module.PageAbout})));

const CountriesList = lazy(() => import("../components/CountriesList/CountriesList")
  .then((module) => ({default: module.CountriesList})));

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain/>}/>
      <Route path="/countries" element={<PageCountries/>}>
        <Route path=":part" element={<CountriesList/>}>
          <Route path=":countid" element={<CountryInfoBar/>}/>
        </Route>
      </Route>
      <Route path="/about" element={<PageAbout/>}/>
      <Route path="/travelers" element={<PageTravelers/>}/>
      <Route path="/login" element={<PageLoginLogout/>}/>
    </Routes>
  );
};
