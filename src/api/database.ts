import { useSelector } from 'react-redux';
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase";
import { updateFavData } from "../redux/favCountriesSlice";
import { setAllowShowVisited, setUserName, setUserPhoto, setUserUID } from "../redux/loginUsersSlice";
import { IAllUserCountries, updateAllUsersCountries } from "../redux/allUsersCountriesSlice";
import { AppDispatch, RootState } from "../redux/store";
import { updateCurrentData, updateData, updateLoadState } from "../redux/countriesSlice";


export const useDatabase = () => {
  const currUser = useSelector((state: RootState) => state.currUser.currUser);
  const userId = currUser ? currUser.id : null;
  const userUID = currUser ? currUser.uid : null;

  function writeUserCountries(countries: string | null) {
    if (userId) {
      set(ref(database, `users/${userId}/countries`), countries);
    } else {
      console.log('No auth !');
    }
  }

  function readAllCountries(dispatch: AppDispatch) {
    dispatch(updateLoadState({state: 1, error: null}));
    const dbRef = ref(database);
    get(child(dbRef, 'countries')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(updateLoadState({state: 2, error: null}));
        dispatch(updateData(data));
        dispatch(updateCurrentData({data: data}));
      } else {
        console.log("No data available");
        dispatch(updateLoadState({state: 3, error: 'No data available'}));
      }
    }).catch((error) => {
      dispatch(updateLoadState({state: 3, error: 'HTTP error ' + error}));
      console.error(error);
    });
  }

  function readUserCountries(dispatch: AppDispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/countries`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dataString = snapshot.val();
          let data = (dataString === null) ? [] : JSON.parse(dataString);
          dispatch(updateFavData(data));
        } else {
          console.log("No data available");
          dispatch(updateFavData([]));
        }
      }).catch((error) => {
        // console.error(error);
      });
    } else {
      console.log('No auth !');
    }
  }

  function writeUserPermissionVisited(isAllow: boolean | null) {
    if (userId) {
      set(ref(database, `users/${userId}/allowShowVisited/`), isAllow);
    } else {
      console.log('No auth !');
    }
  }

  function readUserPermissionVisited(dispatch: AppDispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/allowShowVisited/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const isAllow = snapshot.val();
          dispatch(setAllowShowVisited(isAllow));
        } else {
          console.log("No data available");
          dispatch(setAllowShowVisited(true));
          writeUserPermissionVisited(true);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  function writeUserName(userName: string) {
    if (userId) {
      set(ref(database, `users/${userId}/userName/`), userName);
    } else {
      console.log('No auth !');
    }
  }

  function readUserName(dispatch: AppDispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/userName`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userName = snapshot.val();
          dispatch(setUserName(userName));
        } else {
          dispatch(setUserName(''));
        }
      });
    }
  }

  function writeUserUID(userUID: string) {
    if (userId) {
      set(ref(database, `users/${userId}/userUID/`), userUID);
    } else {
      console.log('No auth !');
    }
  }

  function readUserUID(dispatch: AppDispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/userUID`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userUIDCurrent = snapshot.val();
          if (userUID && userUIDCurrent !== userUID) {
            dispatch(setUserUID(userUID));
            writeUserUID(userUID);
            console.log("ШЛЯПА")
          } else {
            dispatch(setUserUID(userUIDCurrent));
          }
        }
      });
    }
  }

  function writeUserPhoto(userPhoto: string) {
    if (userId) {
      set(ref(database, `users/${userId}/userPhoto/`), userPhoto);
    } else {
      console.log('No auth !');
    }
  }

  function readUserPhoto(dispatch: AppDispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/userPhoto`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userPhoto = snapshot.val();
          dispatch(setUserPhoto(userPhoto));
        }
      });
    }
  }

  function readAllUsers(dispatch: AppDispatch) {
    const dbRef = ref(database);
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // const data = (dataString === null) ? [] : JSON.stringify(dataString);
        // console.log(data);
        const usersCountries: IAllUserCountries[] = [];
        for (let key in data) {
          const countries = (data[key]["countries"]) ?
            JSON.parse(data[key]["countries"]) : [];
          if (data[key]["allowShowVisited"] && countries.length > 0) {
            usersCountries.push(
              {
                userName: data[key]["userName"],
                countries: countries,
                userPhoto: data[key]["userPhoto"],
                userId: key,
              }
            );
          }
        }
        dispatch(updateAllUsersCountries(usersCountries));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return {
    readAllCountries,
    writeUserCountries,
    readUserCountries,
    writeUserPermissionVisited,
    readUserPermissionVisited,
    writeUserName,
    readUserName,
    writeUserPhoto,
    readUserPhoto,
    readUserUID,
    readAllUsers
  };
}
