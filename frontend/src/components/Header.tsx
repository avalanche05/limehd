import { LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../api/AuthService';
import { Button, message } from 'antd';
import { useState } from 'react';
import { useStores } from '../hooks/useStores';

const Header = observer(() => {
    const { rootStore } = useStores();

    const logout = () => {
        AuthService.logout();

        setTimeout(() => {
            window.location.href = '/login';
        }, 100);
    };

    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const searchProcess = () => {
        const start = '2023-12-16T00:00:00.668Z';
        const finish = '2023-12-19T23:59:59.668Z';

        setLoading(true);
        Promise.all([
            rootStore.fetchChannels({
                search_name: search,
                start,
                finish,
            }),
            rootStore.fetchPrograms({
                search_name: search,
                start,
                finish,
            }),
        ])
            .catch(() => {
                messageApi.error('Ошибка загрузки каналов');
            })
            .then(() => {
                rootStore.setSearch(search);
                navigate('/dashboard/search');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {contextHolder}
            <header>
                <div className='header__container'>
                    <nav className='nav'>
                        <ul className='nav__list'>
                            <li className='nav__list__item'>
                                <Link to={'/dashboard/home'} className='item__link'>
                                    Главная
                                </Link>
                            </li>
                            <li className='nav__list__item'>
                                <Link to={'/dashboard/channels'} className='item__link'>
                                    Телепрограмма
                                </Link>
                            </li>
                            <li className='nav__list__item'>
                                <Link to={'/dashboard/profile'} className='item__link'>
                                    Профиль
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className='search'>
                        <form
                            className='search__box'
                            onFocus={(e) => e.currentTarget.classList.add('focus')}
                            onBlur={(e) => e.currentTarget.classList.remove('focus')}
                            onSubmit={(e) => {
                                e.preventDefault();
                                searchProcess();
                            }}
                        >
                            <input
                                className='search__box__input'
                                type='text'
                                placeholder='Найти канал или передачу'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={searchProcess}
                                className='search__box__submit'
                                loading={loading}
                            >
                                <div className='search__box__icon'>
                                    <SearchOutlined className='search__box__icon_image' />
                                </div>
                            </Button>
                        </form>
                    </div>
                    <div className='logout header__logout'>
                        <Link onClick={logout} to='/login'>
                            <LogoutOutlined className='logout-icon' style={{}} />
                        </Link>
                    </div>
                </div>
            </header>
            <div className='header-thumb'></div>
        </>
    );
});

export default Header;
