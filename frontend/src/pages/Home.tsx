import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  return (
    <>
      <header>
        <div className="container header__container">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__list__item">
                <a className="item__link" href="">
                  Главная
                </a>
              </li>
              <li className="nav__list__item">
                <a className="item__link" href="">
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
      <section className="recs">
        <div className="container recs__container">
          <div className="main-rec">
            <div className="main-rec__info">
              <h1 className="info__name">Вести, 12+</h1>
              <p className="info__rate">
                Рейтинг: 8/10
                <StarOutlined className="rate-icon" />
              </p>
              <div className="info__classify">
                <span className="info__kategory">Категория</span>
                <span className="info__genre">Жанр</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Home;
