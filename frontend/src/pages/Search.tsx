import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/useStores';
import ProgrammCard from '../components/ProgrammCard';
import { Link } from 'react-router-dom';

const ChannelsSimplifyLayout = observer(() => {
    const { rootStore } = useStores();

    return (
        <>
            <div className='row'>
                {rootStore.filteredChanneles.map((channel) => {
                    return (
                        <div className='card-place'>
                            <Link
                                style={{ color: '#ffffff' }}
                                to={`/dashboard/channel/${channel.id}`}
                            >
                                <div className='channel-simplify-card'>
                                    <div className='channel-image'>
                                        <img src={channel.image} alt='Channel logo' />
                                    </div>
                                    <div className='channel-info'>
                                        <span className='name'>{channel.name}</span>
                                        <p className='desc'>
                                            {channel.description.slice(100, 4)}...
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
});

const Search = observer(() => {
    const { rootStore } = useStores();

    return (
        <>
            <section className='search-response'>
                {rootStore.search ? (
                    <div className='container search__container'>
                        <span className='title'>
                            Вот что мы нашли по запросу: "{rootStore.search}"
                        </span>
                        <div className='tvshow-response'>
                            <div className='title category-title category-title-programms'>
                                Программы
                            </div>
                            <div className='row'>
                                {rootStore.filteredPrograms.map((program) => {
                                    return (
                                        <div className='card-place'>
                                            <ProgrammCard program={program} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='channel-response'>
                            <div className='title category-title'>Каналы</div>
                            <ChannelsSimplifyLayout />
                        </div>
                    </div>
                ) : (
                    <span className='title' style={{ padding: 20, position: 'relative', top: 20 }}>
                        Для поиска введите запрос
                    </span>
                )}
            </section>
        </>
    );
});

export default Search;
