import React from "react";
import './login.scss';

interface ILoginProps {
  loginGoogle: () => void;
}

export const Login: React.FC<ILoginProps> = ({loginGoogle}) => {
  return (
    <button className='loginButton' onClick={loginGoogle}>
      <img className='google-logo' src="/img/shared/google_icon.png" alt="google icon"/>
      <span className='google-span'>Login with Google</span>
    </button>
  )
}
