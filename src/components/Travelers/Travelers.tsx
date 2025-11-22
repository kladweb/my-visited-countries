import { useEffect } from "react";
import { Traveler } from "./Traveler/Traveler";
import { useAppDispatch, useAppSelector } from "../../store/store";
import type { IAllUserCountries } from "../../store/allUsersCountriesSlice";
import type { ICountries } from "../../types/globalTypes";
import './travelers.scss';
import { fetchCountries } from "../../store/countriesSlice.ts";

export interface ICountriesCodesNames {
  code: string,
  name: string
}

export const Travelers = () => {
  const dispatch = useAppDispatch();
  // const {readAllCountries} = useDatabase();
  const countries = useAppSelector(state => state.countries);
  const allUsersCountries = useAppSelector(state => state.allUsersCountries.allCountries);

  const getCountriesCodesNames = (countriesCodes: string[]) => {
    const countriesCodesNames: ICountriesCodesNames[] = [];
    if (countries.data) {
      countries.data.forEach((country: ICountries) => {
        countriesCodes.forEach((countryCode: string) => {
          if (country.code === countryCode) {
            countriesCodesNames.push({code: country.code, name: country.name});
          }
        })
      });
    }
    return countriesCodesNames;
  }

  useEffect(
    () => {
      if (countries.dataLoadState !== "succeeded") {
        dispatch(fetchCountries());
        // dispatch(countriesLoad);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <h2 className='travellers-title'>TRAVELERS</h2>
      <div className='travellers-content'>
        {
          (countries.dataLoadState === "succeeded") &&
          <>
            {
              allUsersCountries.map((traveler: IAllUserCountries) => (
                <Traveler
                  key={traveler.userId}
                  userName={traveler.userName}
                  userUrl={traveler.userPhoto}
                  countries={getCountriesCodesNames(traveler.countries)}
                />))
            }
          </>
        }
      </div>
    </>
  );
};
