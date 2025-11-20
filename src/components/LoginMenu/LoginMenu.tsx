import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
// import { useDatabase } from "../../hooks/database";
import { Avatar } from "../Avatar/Avatar";
import './loginMenu.scss';
import { type ICurrUser } from "../../types/globalTypes";

export const LoginMenu = () => {
  const dispatch = useAppDispatch();
  // const {readUserCountries, readUserPermissionVisited, readUserName, readUserPhoto, readUserUID} = useDatabase();
  const currUser: ICurrUser | null = useAppSelector(state => state.currUser.currUser);
  const userName = useAppSelector(state => state.currUser.userName);
  const currUserName = (currUser) ? (userName ? userName : currUser.displayName) : '';

  // useEffect(
  //   () => {
  //     if (currUser) {
  //       readUserCountries(dispatch);
  //       readUserPermissionVisited(dispatch);
  //       readUserName(dispatch);
  //       readUserPhoto(dispatch);
  //       readUserUID(dispatch);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [currUser]);

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
