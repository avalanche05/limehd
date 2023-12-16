import { SearchOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const Header = observer(() => {
  return (
    <>
      <header>
        <div className="container header__container">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__list__item">
                <a className="item__link" href="/">
                  Главная
                </a>
              </li>
              <li className="nav__list__item">
                <a className="item__link" href="/channels">
                  Телепрограмма
                </a>
              </li>
              <li className="nav__list__item">
                <a className="item__link" href="">
                  Профиль
                </a>
              </li>
            </ul>
          </nav>
          <div className="search">
            <form className="search__box">
              <input
                className="search__box__input"
                type="text"
                placeholder="Найдите канал или передачу"
              />
              <button className="search__box__icon" type="submit">
                <SearchOutlined className="search__box__icon_image" />
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="header-thumb"></div>
    </>
  );
});

export default Header;
