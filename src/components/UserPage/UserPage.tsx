import React, { useState } from "react";
import { ModalLogout } from "../ModalLogout/ModalLogout";
import { useDatabase } from "../../api/database";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAllowShowVisited } from "../../store/loginUsersSlice";
import { InputName } from "../InputName/InputName";
import { updateData } from "../../store/countriesSlice";
import './userPage.scss';

interface IUserPageProps {
  logoutGoogle: () => void;
  userName: string;
}

export const UserPage: React.FC<IUserPageProps> = ({logoutGoogle, userName}) => {
  const {readAllUsers} = useDatabase();
  const dispatch = useAppDispatch();
  const {writeUserPermissionVisited} = useDatabase();
  const isAllowed = useAppSelector(state => state.currUser.isAllowShowVisited);

  const [isShowMod, setShowMod] = useState(false);
  const [isClearData, setClearData] = useState(false);
  const [isInput, setInput] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userTarget = e.target as HTMLButtonElement;
    if (userTarget.name === 'clear') {
      setClearData(true);
    } else {
      setClearData(false);
    }
    setShowMod(true);
  }

  const setAllowVisited = () => {
    writeUserPermissionVisited(!isAllowed);
    dispatch(setAllowShowVisited(!isAllowed));
    readAllUsers(dispatch);
  }

  const deleteUserData = () => {
    dispatch(updateData(null));
    writeUserPermissionVisited(null);
    // deleteUserFromApp(); //TODO add this case in future
  }

  return (
    <div className="userPage">
      {
        (isShowMod) &&
        <ModalLogout
          setShowMod={setShowMod}
          logoutGoogle={logoutGoogle}
          isClearData={isClearData}
          deleteUserData={deleteUserData}
        />
      }
      <div className='userNameWrapper'>
        {
          (isInput) ?
            <InputName userName={userName} setInput={setInput}/> :
            <h2
              className='currentUserName'
              onDoubleClick={() => {
                setInput(true)
              }}
            >
              {userName}
            </h2>
        }
      </div>
      <div className="isAllowShowVisited">
        {
          (isAllowed !== null) &&
          <input className='shareInput' type='checkbox' defaultChecked={isAllowed} onChange={setAllowVisited}/>
        }
        <span className='shareDescription'>allow other users to see the countries I have visited.</span>
      </div>
      <button className='logoutButton' onClick={openModal}>Logout</button>
      <button className='logoutButton logoutClear' name="clear" onClick={openModal}>Logout and clear data</button>
    </div>
  )
}
