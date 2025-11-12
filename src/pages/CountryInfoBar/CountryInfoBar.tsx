import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/store.ts";
import { CountryInfo } from '../../components/CountryInfo/CountryInfo.tsx';

export const CountryInfoBar = () => {
  const appData = useAppSelector(state => state.countries.data);
  const params = useParams();
  const countryId = params.countid;
  const countryData = (appData) ? appData.find(c => c.code === countryId) : null;

  return (
    <>
      {
        (countryData) &&
        <CountryInfo
          code={countryData.code}
          name={countryData.name}
          capital={countryData.capital}
          population={countryData.population}
          area={countryData.area}
        />
      }
    </>
  );
}
