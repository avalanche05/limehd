import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

const MobileMenu = observer(() => {
  return (
    <>
      <MediaQuery maxWidth={738}>
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <ul className="mobile-nav__list">
              <li className="mobile-nav__list__item">
                <Link to={"/dashboard/home"} className="item__link">
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 20V11H3L12 5L21 11H17.5V20H14.5V16.5C14.5 15.6716 13.8284 15 13 15H11C10.1716 15 9.5 15.6716 9.5 16.5V20H6.5Z"
                      fill="#fff"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
              </li>
              <li className="mobile-nav__list__item">
                <Link to={"/dashboard/channels"} className="item__link">
                  <svg
                    width="26px"
                    height="26px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <path
                      fill="#fff"
                      d="M3 17V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    />
                    <path
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 7h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h7zm0 0L8 3m4 4 4-4"
                    />
                  </svg>
                </Link>
              </li>
              <li className="mobile-nav__list__item">
                <Link to={"/dashboard/profile"} className="item__link">
                  <svg
                    height="24px"
                    width="24px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 60.671 60.671"
                  >
                    <g>
                      <g>
                        <ellipse
                          fill="#fff"
                          cx="30.336"
                          cy="12.097"
                          rx="11.997"
                          ry="12.097"
                        />
                        <path
                          fill="#fff"
                          d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9
			C48.354,35.818,42.661,30.079,35.64,30.079z"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </MediaQuery>
    </>
  );
});

export default MobileMenu;
