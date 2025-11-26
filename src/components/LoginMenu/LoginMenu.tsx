import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useDatabase } from "../../api/database";
import { Avatar } from "../Avatar/Avatar";
import './loginMenu.scss';
import { type ICurrUser } from "../../types/globalTypes";
import { fetchUserCountries } from "../../store/favCountriesSlice.ts";

export const LoginMenu = () => {
  const dispatch = useAppDispatch();
  const {readUserPermissionVisited, readUserName, readUserPhoto, readUserUID} = useDatabase();
  const currUser: ICurrUser | null = useAppSelector(state => state.currUser.currUser);
  const userName = useAppSelector(state => state.currUser.userName);
  const currUserName = (currUser) ? (userName ? userName : currUser.displayName) : '';

  useEffect(
    () => {
      if (currUser) {
        dispatch(fetchUserCountries({userId: currUser.id}));
        readUserPermissionVisited(dispatch);
        readUserName(dispatch);
        readUserPhoto(dispatch);
        readUserUID(dispatch);
      }
    }, [currUser]);

  return (
    <>
      {(currUser) ?
        <Avatar
          userUrl={currUser.photoURL}
          userName={currUserName}
          size={1}
        /> :
        <div className='loginMenu'>Login</div>
      }
    </>
  );
}
