import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './modalLogout.scss';

interface IModalLogoutProps {
  setShowMod: (show: boolean) => void;
  logoutGoogle: () => void;
  isClearData: boolean;
  deleteUserData: () => void;
}

export const ModalLogout: React.FC<IModalLogoutProps> = ({setShowMod, logoutGoogle, isClearData, deleteUserData}) => {
  const nodeRef = React.useRef(null);
  const [closeMod, setCloseMod] = useState(true);
  const [isNextLogout, setNextLogout] = useState(false);

  //closeMod и setCloseMod используем для анимации (плавного появления) модального окна;
  useEffect(() => {
    setCloseMod(false);
    setNextLogout(false);
  }, []);

  const onLogout = () => {
    setNextLogout(true);
    setCloseMod(true);
  }

  const onCloseMod = () => {
    setCloseMod(true);
  }

  return (
    <CSSTransition
      timeout={300}
      nodeRef={nodeRef}
      classNames='land'
      in={!closeMod}
      onExited={() => {
        setShowMod(false);
        if (isNextLogout) {
          if (isClearData) {
            deleteUserData();
          }
          logoutGoogle();
        }
      }}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className='modal' onClick={() => {
        setCloseMod(true)
      }}>
        <div className='modal-logout' onClick={e => e.stopPropagation()}>
          <span className='button-close material-icons-outlined' onClick={onCloseMod}>close</span>
          {
            (isClearData) ?
              <div className='modal-question'>Do yo want to logout<br/>and clear all data?</div> :
              <div className='modal-question'>Do yo want to logout?</div>
          }
          <button onClick={onLogout}>YES</button>
          <button onClick={onCloseMod}>NO</button>
        </div>
      </div>
    </CSSTransition>
  );
}
