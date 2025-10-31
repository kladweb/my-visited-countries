import { PagesLinks } from "../../../../country-guide/src/components/PagesLinks/PagesLinks";

export const Header = () => (
  <header className='main-header'>
    <div className='content'>
      <div className='main-header__brand'>
        <img className='main-header__logo' src='../../assets/img/shared/logo.webp' alt="COUNTRY GUIDE"/>
      </div>
      <span className='main-header__name'>COUNTRY GUIDE</span>
      <nav className='main-nav'>
        <PagesLinks/>
      </nav>
    </div>
  </header>
);
