import { type ICountries } from "../types/globalTypes.ts";
import { type IAllUserCountries } from "../store/allUsersCountriesSlice.ts";

export function sortingCountries(e: any, dataListCountries: ICountries[]): ICountries[] {
  const newData: ICountries[] = [...dataListCountries];
  switch (e) {
    case 'name':
      newData.sort((a, b) => {
        if (a.code > b.code) {
          return 1;
        }
        if (a.code < b.code) {
          return -1;
        }
        return 0;
      });
      break;
    case 'population':
      newData.sort((a, b) => a.population - b.population);
      break;
    case 'population-des':
      newData.sort((a, b) => b.population - a.population);
      break;
    case 'area':
      newData.sort((a, b) => a.area - b.area);
      break;
    case 'area-des':
      newData.sort((a, b) => b.area - a.area);
      break;
  }
  return newData;
}

export function sortVisitedCountries(countries: IAllUserCountries[]): IAllUserCountries[] {
  const sortedCountries = [...countries];
  sortedCountries.sort((a, b) => {
    if (a.countries.length < b.countries.length) {
      return 1;
    } else if (a.countries.length > b.countries.length) {
      return -1;
    }
    return 0;
  });
  return sortedCountries;
}
