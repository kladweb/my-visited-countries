import { lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import { PageMain } from '../pages/PageMain/PageMain.tsx';
import { PageCountries } from '../pages/PageCountries/PageCountries.tsx';
import { CountryInfoBar } from '../pages/CountryInfoBar/CountryInfoBar.tsx';

const PageLoginLogout = lazy(() => import("../pages/PageLoginLogout/PageLoginLogout.tsx")
  .then((module) => ({default: module.PageLoginLogout})));

const PageTravelers = lazy(() => import("../pages/PageTravelers/PageTravelers.tsx")
  .then((module) => ({default: module.PageTravelers})));

const PageAbout = lazy(() => import("../pages/PageAbout/PageAbout.tsx")
  .then((module) => ({default: module.PageAbout})));

const CountriesList = lazy(() => import("../pages/CountriesList/CountriesList")
  .then((module) => ({default: module.CountriesList})));

export const PagesRouter = () => {
  return (
    <main>
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
    </main>
  );
};
