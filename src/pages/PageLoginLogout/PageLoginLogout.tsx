import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setCurrUser, setUserName, setUserPhoto } from "../redux/loginUsersSlice";
import { updateFavData } from "../redux/favCountriesSlice";
import { Login } from "../components/Login/Login";
import { UserPage } from "../components/UserPage/UserPage";
import { useDatabase } from "../hooks/database";
import firebase from "firebase/compat/app";
import User = firebase.User;
import type { ICurrUser } from "../types/globalTypes";
import '../components/Travelers/travelers.scss';

export const PageLoginLogout = () => {
  const dispatch = useAppDispatch();
  const {writeUserName, writeUserPhoto} = useDatabase();
  const currUser = useAppSelector(state => state.currUser.currUser);
  const userName = useAppSelector(state => state.currUser.userName);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (currUser && userName === '') {
      writeUserName(currUser.displayName);
      dispatch(setUserName(currUser.displayName));
    }
    if (currUser) {
      writeUserPhoto(currUser.photoURL);
      dispatch(setUserPhoto(currUser.photoURL));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const loginGoogle = function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const getUser = auth.currentUser as User;
        const user: ICurrUser = {
          email: (getUser.email) ? getUser.email : '',
          displayName: (getUser.displayName) ? getUser.displayName : '',
          photoURL: (getUser.photoURL) ? getUser.photoURL : '',
          id: (getUser.email) ? getUser.email.replace(/[@.]/g, "") : getUser.uid,
          uid: getUser.uid,
        };
        // user.email = getUser.email;
        // user.displayName = getUser.displayName;
        // user.photoUrl = getUser.photoUrl;
        // user.uid = getUser.uid;
        dispatch(setCurrUser({currUser: user}));
        return user.uid;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        dispatch(updateFavData([]));
      });
  }

  const logoutGoogle = function () {
    signOut(auth).then(() => {
      console.log('Sign-out successful', auth.currentUser);
      dispatch(setCurrUser({currUser: auth.currentUser}));
      dispatch(updateFavData([]));
    }).catch((error) => {
      console.log('Sign-out error', error);
    });
  }

  // const deleteUserFromApp = function () {
  //   const user = auth.currentUser;
  //   if (user) {
  //     deleteUser(user).then(() => {
  //       dispatch(setCurrUser({currUser: auth.currentUser}));
  //       dispatch(updateFavData([]));
  //       // User deleted.
  //     }).catch((error) => {
  //       // An error occurred
  //       // ...
  //     });
  //   }
  // }

  return (
    <div className='travelers'>
      <div className='content'>
        {(currUser) ?
          <UserPage
            logoutGoogle={logoutGoogle}
            userName={userName}
          />
          :
          <Login loginGoogle={loginGoogle}/>
        }
      </div>
    </div>
  );
}
