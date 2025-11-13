import { PagesLinks } from "../PagesLinks/PagesLinks.tsx";
import "../../assets/img/shared/logo.webp";
import logoPic from "../../assets/img/shared/logo.avif";


export const Header = () => (
  <header className='main-header'>
    <div className='content'>
      <div className='main-header__brand'>
        <img className='main-header__logo' src={logoPic} alt="COUNTRY GUIDE"/>
      </div>
      <span className='main-header__name'>COUNTRY GUIDE</span>
      <nav className='main-nav'>
        <PagesLinks/>
      </nav>
    </div>
  </header>
);
