// import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { onAuthStateChanged } from "firebase/auth";
// import { LoginMenu } from "../LoginMenu/LoginMenu";
// import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { setCurrUser } from "../../redux/loginUsersSlice";
// import { auth } from "../../firebase/firebase";
import './PagesLinks.scss';

interface IClassObj {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean
}

export const PagesLinks = () => {
  // const dispatch = useAppDispatch();
  // const favCountries = useAppSelector(state => state.favCountries.data);
  // const countFav = (favCountries) ? favCountries.length : 0;

  // useEffect(
  //   () => {
  //     initUser();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  // function initUser() {
  //   onAuthStateChanged(auth, (getUser) => {
  //     if (getUser) {
  //       const user = {
  //         email: getUser.email,
  //         displayName: getUser.displayName,
  //         photoURL: getUser.photoURL,
  //         uid: getUser.uid,
  //         id: (getUser.email) ? getUser.email.replace(/[@.]/g, "") : getUser.uid,
  //       };
  //       dispatch(setCurrUser({currUser: user}));
  //     } else {
  //       dispatch(setCurrUser({currUser: null}));
  //     }
  //   });
  // }

  function getLinkClass(e: IClassObj, countries = '') {
    const pathname = window.location.pathname;
    let className = "PageLink";
    if (e.isActive) {
      if (countries === 'all' && pathname.includes('visited')) {
        return className;
      }
      className += " ActivePageLink";
    }
    return className;
  }

  return (
    <div>
      <NavLink to="/" className={getLinkClass}>Main</NavLink>
      <NavLink to="/countries" className={(obj) => getLinkClass(obj, 'all')}>Countries</NavLink>
      <NavLink to="/countries/visited" className={getLinkClass}>
        Visited
        {/*{(countFav > 0) && <span className='countFav'>{countFav}</span>}*/}
      </NavLink>
      <NavLink to="/travelers" className={getLinkClass}>Travelers</NavLink>
      <NavLink to="/login" className={getLinkClass}>
        {/*<LoginMenu/>*/}
      </NavLink>
    </div>
  );
};
