import { observer } from 'mobx-react-lite';
import ChannelCard from './ChannelCard';
import { useStores } from '../hooks/useStores';
import { useEffect } from 'react';

const ChannelsLayout = observer(() => {
    const { rootStore } = useStores();

    useEffect(() => {
        rootStore.fetchChannels();
    }, [rootStore]);

    return (
        <section className='channels'>
            <div className='container channels-container'>
                {rootStore.channels.map((channel) => {
                    return (
                        <div key={channel.id} className='row'>
                            <div className='card-place'>
                                <ChannelCard channel={channel} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

export default ChannelsLayout;
