import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { updateCurrentData } from '../../store/countriesSlice.ts';
// import { CountriesBasis } from '../../components/CountriesBasis/CountriesBasis.tsx';
// import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus.tsx';
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { fetchCountries } from "../../store/countriesSlice.ts";
import { CountriesBasis } from "../../components/CountriesBasis/CountriesBasis.tsx";
// import { useDatabase } from "../hooks/database";

export const PageCountries = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const {readAllCountries} = useDatabase();
  const page = params.part;
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.countries);
  // const favCountries = useAppSelector(state => state.favCountries);

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
    }, [page]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // useEffect(
  //   () => {
  //     // countriesLoad(dispatch);
  //     if (countries.dataLoadState !== 2) {
  //       readAllCountries(dispatch);
  //       // dispatch(countriesLoad);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  // useEffect(() => {
  //   if (countries.data && countries.dataLoadState === 2) {
  //     dispatch(updateCurrentData({page: page, data: countries.data}));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, countries.data, favCountries.data]);

  return (
    <div className='CountryList'>
      <div className='content'>
        {(countries.dataLoadState === "idle") &&
          "дадзеных няма, бо, бляць нiхто iх не загрузiу, курва"
          // <LoadingStatus loadStatus='no data'/>
        }
        {(countries.dataLoadState === "loading") &&
          "дадзеные яшчэ iдуць"
          // <LoadingStatus loadStatus='loading...'/>
        }
        {(countries.dataLoadState === "succeeded") &&
          <CountriesBasis/>
        }
        {(countries.dataLoadState === "failed") &&
          "тут бляць памылка"
          // <LoadingStatus loadStatus={'error ' + countries.dataLoadError}/>
        }
      </div>
    </div>
  );
}
