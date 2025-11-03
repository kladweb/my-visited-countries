import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCurrentData } from '../redux/countriesSlice';
import { CountriesBasis } from '../components/CountriesBasis/CountriesBasis';
import { LoadingStatus } from '../components/LoadingStatus/LoadingStatus';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useDatabase } from "../hooks/database";

export const PageCountries = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {readAllCountries} = useDatabase();
  const page = params.part;
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.countries);
  const favCountries = useAppSelector(state => state.favCountries);

  /**
   in this project, the "countries" page does not exist, so we immediately go to the "countries/all" page. It would be
   possible to make just "countries" instead of "countries/all", but in this case the "CountriesBasis" menu button
   ceases to be active when navigating inside this page to any other sub-page.
   */
  useEffect(
    () => {
      if (!page) {
        navigate('/countries/all');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

  useEffect(
    () => {
      // countriesLoad(dispatch);
      if (countries.dataLoadState !== 2) {
        readAllCountries(dispatch);
        // dispatch(countriesLoad);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  useEffect(() => {
    if (countries.data && countries.dataLoadState === 2) {
      dispatch(updateCurrentData({page: page, data: countries.data}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, countries.data, favCountries.data]);

  return (
    <div className='CountryList'>
      <div className='content'>
        {(countries.dataLoadState === 0) &&
          <LoadingStatus loadStatus='no data'/>
        }
        {(countries.dataLoadState === 1) &&
          <LoadingStatus loadStatus='loading...'/>
        }
        {(countries.dataLoadState === 2) &&
          <CountriesBasis/>
        }
        {(countries.dataLoadState === 3) &&
          <LoadingStatus loadStatus={'error ' + countries.dataLoadError}/>
        }
      </div>
    </div>
  );
}
