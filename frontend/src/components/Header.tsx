import { LogoutOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../api/AuthService';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
import { useStores } from '../hooks/useStores';

const categories = [
    'без поиска по категории',
    'детям',
    'познавательное',
    'сериалы',
    'другое',
    'фильмы',
    'спорт',
    'инфо',
    'досуг',
    'для взрослых',
];

const genres = [
    'без поиска по жанру',
    'фэнтези',
    'образовательное',
    'драма',
    'аниме',
    'здоровье',
    'разное',
    'комедия',
    'обучающее',
    'ток-шоу',
    'детектив',
    'кулинарное',
    'религия',
    'реалити',
    'новости',
    'документальное',
    'cпорт',
    'развлекательное',
    'мультфильм',
    'криминал',
    'музыкальное',
];

const Header = observer(() => {
    const { rootStore } = useStores();
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [selectedGenre, setSelectedGenre] = useState<number>(0);
    const [modalLoading, setModalLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const start = '2023-12-16T00:00:00.668Z';
    const finish = '2023-12-19T23:59:59.668Z';

    const handleOk = () => {
        setModalLoading(true);

        Promise.all([
            rootStore.fetchPrograms({
                genre: selectedGenre === 0 ? undefined : genres[selectedGenre],
                category: selectedCategory === 0 ? undefined : categories[selectedCategory],
                start,
                finish,
            }),
        ])
            .catch(() => {
                messageApi.error('Ошибка применения фильтров');
            })
            .then(() => {
                navigate('/dashboard/search');
            })
            .finally(() => {
                setLoading(false);
                setModalLoading(false);
                setIsModalOpen(false);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const searchProcess = () => {
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
            <header className='header'>
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
                            <Button
                                onClick={showModal}
                                className='search__box__submit'
                                type='primary'
                            >
                                <div className='search__box__icon'>
                                    <SettingOutlined className='search__box__icon_image' />
                                </div>
                            </Button>
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

            <Modal
                title='Фильтры для поисква'
                open={isModalOpen}
                onOk={handleOk}
                confirmLoading={modalLoading}
                onCancel={handleCancel}
            >
                <div className='filters-title' style={{ marginBottom: 7 }}>
                    Категории
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {categories.map((category, index) => {
                        return (
                            <Button
                                onClick={() => setSelectedCategory(index)}
                                key={index}
                                type={selectedCategory === index ? 'primary' : 'default'}
                            >
                                {category}
                            </Button>
                        );
                    })}
                </div>

                <div style={{ marginTop: 10, marginBottom: 7 }}>Жанры</div>

                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {genres.map((genre, index) => {
                        return (
                            <Button
                                onClick={() => setSelectedGenre(index)}
                                key={index}
                                type={selectedGenre === index ? 'primary' : 'default'}
                            >
                                {genre}
                            </Button>
                        );
                    })}
                </div>
            </Modal>
        </>
    );
});

export default Header;
