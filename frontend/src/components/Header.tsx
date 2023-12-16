import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import AuthService from "../api/AuthService";

const Header = observer(() => {
  const logout = () => {
    AuthService.logout();

    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  return (
    <>
      <header>
        <div className="header__container">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__list__item">
                <Link to={"/dashboard/home"} className="item__link">
                  Главная
                </Link>
              </li>
              <li className="nav__list__item">
                <Link to={"/dashboard/channels"} className="item__link">
                  Телепрограмма
                </Link>
              </li>
              <li className="nav__list__item">
                <Link to={"/dashboard/profile"} className="item__link">
                  Профиль
                </Link>
              </li>
            </ul>
          </nav>
          <div className="search">
            <form
              className="search__box"
              onFocus={(e) => e.currentTarget.classList.add("focus")}
              onBlur={(e) => e.currentTarget.classList.remove("focus")}
            >
              <input
                className="search__box__input"
                type="text"
                placeholder="Найти канал или передачу"
              />
              <button className="search__box__submit" type="submit">
                <div className="search__box__icon">
                  <SearchOutlined className="search__box__icon_image" />
                </div>
              </button>
            </form>
          </div>
          <div className="logout header__logout">
            <Link onClick={logout} to="/login">
              <LogoutOutlined className="logout-icon" style={{}} />
            </Link>
          </div>
        </div>
      </header>
      <div className="header-thumb"></div>
    </>
  );
});

export default Header;
