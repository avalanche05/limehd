import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import ProgrammCard from '../components/ProgrammCard';

const Profile = observer(() => {
    const { rootStore } = useStores();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        rootStore.fetchUser().finally(() => {
            setLoading(false);
        });
    }, [rootStore]);

    return (
        <>
            <section className='profile'>
                <div className='container prfile__container'>
                    <Spin spinning={loading}>
                        <div className='privat-info'>
                            <h1>Личная информация</h1>
                            {rootStore.user?.name ? (
                                <>Email: {rootStore.user?.name}</>
                            ) : (
                                <>
                                    <Link to='/signup'>Зарегистрируйтесь</Link> или{' '}
                                    <Link to={'/login'}>авторизуйтесь</Link> для получения
                                    уведомлений о программах
                                </>
                            )}
                        </div>
                    </Spin>

                    <Spin spinning={loading}>
                        <div className='favourites-tvshow'>
                            <div className='title category-title'>Избранные программы</div>
                            <div className='row'>
                                {rootStore.user?.favorite_programs.map((program) => {
                                    return (
                                        <div key={program.id} className='card-place'>
                                            <ProgrammCard program={program} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Spin>

                    <Spin spinning={loading}>
                        <div className='favourites-channel'>
                            <div className='title category-title'>Избранные каналы</div>
                            <div className='row'>
                                {rootStore.user?.favorite_channels.map((channel) => {
                                    return (
                                        <Link to={`/dashboard/channel/${channel.id}`}>
                                            <div
                                                style={{
                                                    color: '#ffffff',
                                                    textDecoration: 'none',
                                                }}
                                                key={channel.id}
                                                className='card-place'
                                            >
                                                <div className='channel-simplify-card'>
                                                    <div className='channel-image'>
                                                        <img
                                                            src={channel.image}
                                                            alt='Channel logo'
                                                        />
                                                    </div>
                                                    <div className='channel-info'>
                                                        <span className='name'>{channel.name}</span>
                                                        <p className='desc'>
                                                            {channel.description.slice(100, 0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </Spin>
                </div>
            </section>
        </>
    );
});

export default Profile;
